---
title: " Microsoft Foundry Hosted Agent と Claude Agent SDK を使ったサンドボックス検証"
source: "https://tech.layerx.co.jp/entry/hosted-agent-claude-agent-sandbox"
publishedDate: "2026-05-27"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "osuketh"
---

こんにちは、LayerX Ai Workforce事業部でSWEをしているosukeです。

Webサービスの裏側など不特定多数のユーザーが操作する環境でAIエージェントを動作させるためにまず必要になるのがサンドボックス技術です。エージェントは自律的に柔軟な挙動をする反面、それらをセキュリティ的に閉じ込める必要が出てきます。

本記事では、Azure内で閉じる構成として、Claude CodeをSubprocessとして動かせるClaude Agent SDKと[Microsoft Foundry Hosted Agent](https://learn.microsoft.com/ja-jp/azure/foundry/agents/concepts/hosted-agents)というエージェントサンドボックス基盤を軸に構成の検討をしていきます。

* * *

## AI エージェントにおけるサンドボックスの重要性

不特定多数のユーザーが触る環境で AI エージェントをサンドボックスで守るために、具体的には次のような要件が同時に求められます。

-   各ユーザーのチャット内容や添付ファイル・実行結果が、別のユーザーから見えないこと
-   LLM が意図せず (あるいはプロンプトインジェクション的に悪意ある形で) 触ったコマンドが、ホストや他テナントのリソースに到達しないこと
-   ファイル書き込み・ネットワーク通信・サブプロセス起動の副作用を、用途に応じて制限できること

これらの個別の攻撃パターンを一つひとつ deny ルールで塞いでいくアプローチは、新しい variation が出てくるたびに穴が開きます。アドホックな個別対応は、時間とともに漏れが生じることを前提にすべきです。セキュリティは「包括的に、構造的に、多層に」組まないと持たない、というのが AI Agent の sandbox を設計するうえでの基本的な発想となります。

## Hosted Agent の sandboxing

Hosted Agent は、session 単位で microVM を立て、Azure VM 同士と同じ強度の境界で隔離する仕組みです。これを実機で確認するため、2 つの session で `/proc/sys/kernel/random/boot_id` を比較してみると、boot\_id が完全に異なる、つまり **session ごとに別の microVM を立てている**ことが実機で確認できます。

$ cat /proc/sys/kernel/random/boot\_id


8b86efce-0bb0-43af-b96b-72d78dfcad60

bd14205a-5eb2-4145-8d0a-ac9ed6fa932d

同じ session で 2 回呼ぶと同じ boot\_id が返るので、microVM の寿命が session 単位であることも確認できます。

### Built-in ツール (Read / Write / Glob 等) はこの境界で防御

Claude Agent SDK の `Read` / `Write` / `Edit` / `Glob` / `Grep` は Agent プロセス内で完結する処理なので、microVM の filesystem に閉じています。`cwd` をプロジェクトディレクトリに制限し、Agent SDK の `add_dirs=[]` で `cwd` の外側を既定で読めないように制限すれば、別 session のファイルが見えてしまうことは構造的に発生しません。

問題は Bash です。`Bash` を allow にした瞬間、microVM 境界だけでは塞げない経路が多く出てきます。エージェントが Bash を手にすることで本来の自律的な動きが備わる一方でセキュリティ的な考慮点が大幅に広がります。 例えば、外部サービス（Model など）にアクセスするための Token など機微情報がファイルシステム上に存在しているとそれを守る必要があります。あるいは、あらゆる手段で外に抜けようとする内部通信や外部通信を防ぐ必要があります。

Hosted Agent においては Bash 実行における脅威を保護するためにもう一つレイヤを入れる必要があります。

## Bash 経由の脅威を個別対応で塞ぐことはできる、しかし

同一 microVM 内で Bash が起こせる脅威に対しては、**それぞれにアドホックな対応を積み重ねていけば、原理的には個別に塞ぐことができます**。具体的なイメージは以下の通りです。

-   **機微情報抽出** (Bash から token 等を読まれて外部クラウドの権限を奪取される) → 読み出しコマンドを deny rule で塞ぐ + OS の uid 分離で file permission を活用して読み取り権限自体を落とす
-   **sibling process の env 漏洩** (`/proc/<別 pid>/environ` 経由で同 container 内の他プロセスの secret を吸われる) → Bash subprocess の uid を分離する + container に渡す env を最小化する。同一 micro VM 内なので脅威は限定的ではある。
-   **persistence pivot** (`.bashrc` / `CLAUDE.md` を書き換えて次回起動時の hook に悪意あるコードを仕込まれる) → 設定ファイル群を read-only マウントにする + 起動時に読み込まれる設定ファイルの読み込み自体を無効化する。同一 micro VM 内なので脅威は限定的ではある。
-   **TLS Inspection 回避経由の exfil** (allowlist 許可ドメインへの SNI 偽装や DNS exfil で secret を外に持ち出される) → Firewall allowlist を最小化 + DNS 経由で wildcard 的に到達先を広げられないよう制御する

### アドホック対応は漏れやすい

冒頭の通り、これを「アドホックな個別対応の積み重ね」として運用しようとすると、いくつもの構造的問題が出てきます。

1: 個々の対応の境界がそもそも狭い。たとえば前述の `permissions.deny` の Read rule は cat / head / tail / sed のような「読み出し専用ツール」には適用されますが、**ファイルを間接的に開ける任意のサブプロセス**（スクリプト言語の標準ライブラリ、テキスト処理ツール、bash builtin のリダイレクト等）には適用されません。例えば Python が同梱されていれば、

python3 \-c "print(open('/run/secrets/example-token').read())"

のような形で deny rule を構造的に素通りできます。回避経路はこのカテゴリ全体にわたるため、コマンド単位の deny を積み上げても閉じません。

2: 新しい脅威カテゴリが見つかるたびに穴が開く。Python 経由の file read が回避経路だと分かった時に Python 対策を足す、というイタチごっこになる。

3: 監査説明性が低い。お客様のセキュリティレビューや社内監査で「どんな攻撃から守られているか」を説明するときに、個別ルールの組み合わせよりも、「OS 層の namespace で構造的に切ってあります」と言える方が説明性も再現性も高い。

要するに、AI Agent の sandbox を本気で組むなら、個別 deny rule の積み上げではなく、**構造的・包括的・多層的な防御を OS / VM 境界で組むのが筋** です。

## Bash sandbox のパターン比較

それを踏まえて、LLM に Bash を渡すための実装パターンを 4 つ並べました。ここでは、Hosted Agent を基盤として、Azure 内に閉じた構成にできる技術選定に絞っています。Hosted Agent は microVM 境界を提供する基盤として有用ですが、その上で Bash を sandbox 化するレイヤがもう一つ必要になります。

パターン

隔離レイヤ

実行体

(1) Hosted Agent 上で素の Bash + 個別アドホック対応

なし (個別 deny の積み上げ)

container 内の実 bash

(2) [just-bash (Vercel)](https://github.com/vercel-labs/just-bash)

JS interpreter 層 (Node.js プロセス内)

TS 製の bash 互換 interpreter

(3) [Azure Container Apps Dynamic Sessions](https://learn.microsoft.com/en-us/azure/container-apps/sessions-code-interpreter) で safe-bash MCP tool

別 microVM 層 (Cloud Hypervisor)

別 microVM 内の実 bash

(4) [Claude Code 公式 sandbox](https://code.claude.com/docs/ja/sandboxing)

OS 層 (Linux: bubblewrap / macOS: Seatbelt)

同 container 内の実 bash を namespace で jail

(1) については前節で議論した通り「アドホック対応の積み上げは漏れる前提」なので本命からは外しています。(2) と (3) も検討候補にはなりましたが、いずれも本検証では本命から外したので、まず先に短く触れます。

### (2) just-bash

Vercel の [just-bash](https://github.com/vercel-labs/just-bash) は TypeScript で書かれた bash 互換 interpreter + in-memory virtual filesystem で、`child_process` を import すらせず実 process を spawn しないというユニークな設計です。「実 bash を渡さないことで攻撃面そのものを狭める」という思想自体は綺麗ですが、ただ 2026 年 5 月時点では README にも明記の通り Beta Software で、リリース履歴もまだ若く、信頼境界に持ち込むには実績が十分とは言えない段階と考えます。

### (3) Azure Container Apps Dynamic Sessions: 強い分離・重いコスト

外部の 隔離環境 ([Azure Container Apps Dynamic Sessions](https://learn.microsoft.com/ja-jp/azure/container-apps/sessions)) に bash 実行を外注する設計で、Microsoft 公式に "designed to run untrusted code" と明言されているだけあって sandbox 強度的には適した基盤として扱えます。ただ設計を進めてみると、軽い実行でもオーバーヘッドが重い、cold start考慮、並列実行のための特殊な考慮など構造的なコストが重く、Agent 体験を最優先するワークロードには合いませんでした。

### (4) Claude Code Bash Sandbox: Hosted Agent と組み合わせて構造的二層防御に

Claude Code (= Claude Agent SDK の CLI 部分) の [Bash sandbox 機能](https://code.claude.com/docs/ja/sandboxing) は、CLI binary 内に bubblewrap (Linux) を呼び出す実装が組み込まれていて、Bash tool subprocess を OS 層で jail できます。`ClaudeAgentOptions.settings` 経由で設定を渡すと、

-   mount namespace で `cwd` 外を ro,bind に
-   net namespace で外向き通信を構造的に遮断
-   pid namespace で sibling process 不可視
-   user namespace で uid 分離
-   filesystem deny/allow rule で JWT 等の secret を物理マスク

これらを OS の namespace 機構で一括して構造的に切ってくれます。

ただ、Bash sandbox を使うためには、上記のように非特権プロセスが syscall で namespace を作れる環境である必要があります。実は、Hosted Agent はマネージドサービスでありながらこの点で相性が良く、VM 境界に信頼をおいているゆえ、namespace を切ることができるようです。

実機で sandbox 有効状態にして、各種検証したログがこちらです。

$ cat "$EXAMPLE\_TOKEN\_FILE"   
cat: /run/secrets/example-token: No such file or directory


$ python3 \-c "open('/run/secrets/example-token').read()"
Traceback (most recent call last):
  File "<string>", line 1, in <module\>
FileNotFoundError: \[Errno 2\] No such file or directory: '/run/secrets/example-token'

$ ls /proc | grep \-E '^\[0-9\]+$'
1
2
4
$ cat /proc/123/environ
cat: /proc/123/environ: No such file or directory


$ curl \-sS \--resolve attacker.example:443:1.2.3.4 https://attacker.example/
curl: (7) Failed to connect to attacker.example port 443: Network is unreachable


$ touch /etc/foo
touch: cannot touch '/etc/foo': Read-only file system


$ echo 'pwned' \>> ./CLAUDE.md
bash: ./CLAUDE.md: Permission denied

ネットワーク系は net namespace ごと切られて TCP socket すら作れないので、SNI 偽装も SNI smuggling も DNS exfil も「allowlist 内のドメインに到達できるか」以前の段階で詰みます。OSレイヤでの防御となりますが効果的に作用していることが分かります。

## まとめ

AI Agent に Bash を渡すときの sandbox は、**個別 deny rule の積み上げではなく、構造的な境界を多層で重ねる** のが筋だと考えています。今回の検証で次の二層構成が効果的と確認できました。

-   Hosted Agent の per-session microVM — セッション横断を VM 境界で隔離(= 別ユーザーの会話・ファイル・state は構造的に見えない)
-   Claude Code Bash sandbox — 同一 session 内の Bash subprocess を namespace で jail

マネージドの Agent runtime と Bash sandbox の組み合わせを評価する一つの参考になれば幸いです。