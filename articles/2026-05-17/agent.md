---
title: "検索エンジン上に作るAgent向け仮想ファイルシステム"
source: "https://tech.layerx.co.jp/entry/2026/05/15/112547"
publishedDate: "2026-05-15"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "takatorix"
---

こんにちは、Ai Workforce事業部でAI検索エンジニアをしている[鷹取](https://x.com/takatorisatoshi)です。

AIエージェントにドキュメントを探させる方法として、最近は検索ツールを使わせるアプローチに関心があります。検索APIを直接呼ばせる方法もありますが、ディレクトリを見たり、候補文書を読んだり、検索語を変えたりできる探索的なインターフェースも相性が良さそうです。

その方法として面白いのが、Agent向けの仮想ファイルシステムです。Agentには `ls`, `cat`, `grep` のようなファイル操作を見せつつ、実体は検索エンジン上のデータにします。これなら、Agentはファイルを探索しているように振る舞えますが、システム側では検索エンジンのindexingや権限制御を使えます。

今回は、この仮想ファイルシステムをOpenSearch上に作り、さらに自然文で探せる `semantic_search` も同じ探索面に追加してみました。ファイルシステム風の使いやすさを保ちながら、Document Level Securityによる権限制御を `cat`, `grep`, `semantic_search` に同じように適用できるかを試します。

今回の実験で作成したコードは以下で公開しております。

[github.com](https://github.com/takatori/agentic-search-vfs)

[Ai Workforce](https://getaiworkforce.com/)は、エンタープライズ向けのAIプラットフォームです。多種多様なドキュメントワークをAIエージェントを使って自動化できます。

AIエージェントが効率的に動作するには、社内に存在するさまざまなドキュメントを適切に検索できる必要があります。そのため検索エンジニアとしては、人間のユーザーだけではなく、AIエージェントにとっても使いやすい検索とは何かを日々考えています。

こうした背景から、最近 **Agentic Search** という考え方に注目しています。

Agentic Searchとは、LLMエージェントが検索ツールを使い、検索方針の立案、クエリの変更、結果の読解、再検索を自律的に繰り返す検索アプローチです。エージェントは人間よりも粘り強く、同じタスクに対して何度も検索語や探索対象を変えられます。そのため、単発の検索クエリで完結しない調査タスクとの相性が良いと考えられます。

Agentic Searchの一形態として、LLMエージェントにファイルシステムを `ls` や `grep` のようなツールで探索させる方法があります。 たとえば、エージェントがまず `ls /docs` で全体構造を見て、関係しそうなディレクトリに移動し、`grep` で候補を探し、`cat` で根拠文書を読む、という流れです。

この方向性は、最近よく見かけるようになっています。たとえばAmazon Scienceの [Keyword search is all you need: Achieving RAG-Level Performance without vector databases using agentic tool use](https://assets.amazon.science/df/78/e81873f9478d80b642d113acd05e/keyword-search-is-all-you-need-2.pdf) では、ベクトルDBに頼らず、エージェントがキーワード検索ツールを使うことでRAG相当の性能を目指す方向が示されています。

また、AnthropicのClaude Codeも、コードベースを理解するためにエージェントがファイルを読み、検索し、コマンドを実行する体験を前面に出しています。[Claude Codeのドキュメント](https://docs.anthropic.com/en/docs/claude-code/settings) でも、利用可能なツールとして `Bash`, `Grep`, `LS`, `Read` などが説明されています。これはコード検索の文脈ですが、LLMに「検索API」ではなく「探索できる環境」を渡すという意味で、今回の話と近いものがあります。

これらに共通しているのは、LLMに大きなコンテキストを丸ごと渡すのではなく、ファイル、検索、読み取りといった操作を通じて必要な情報へ到達させるという考え方です。

一方で、エンタープライズ検索にそのまま適用しようとすると難しい点があります。

-   権限管理が難しい
-   大規模な文書集合をローカルファイルとして扱うのは現実的ではない
-   Agentが読める結果量には限界があり、候補の順位付けが重要になる

特に権限管理は重要です。エンタープライズ検索では、ドキュメントごとに閲覧権限が異なります。単にローカルディレクトリをマウントしてLLMに読ませるような構成では、プロファイルごとに見える文書を厳密に制御するのが難しくなります。

## 仮想ファイルシステム

上記の課題を解決するアイデアとして、Agent向けの**仮想ファイルシステム**という方法があります。

ここでいう仮想ファイルシステムとは、Agentからは `ls`, `cat`, `grep` のようなファイル操作に見える一方で、実体はdatabaseや検索エンジン上のデータである、という仕組みです。Agentには探索しやすいファイルシステム風のインターフェースを渡し、裏側では検索エンジンがindexing、検索、権限制御を担当します。

この方法であれば、ローカルファイルを直接Agentに読ませる必要がありません。path treeを事前に作っておき、`ls` や `cd` はそのtreeを見て返し、`cat` や `grep` は検索エンジン上の文書を読みに行きます。さらに、ユーザーの権限に応じてpath treeや検索対象を制限すれば、Agentからは権限外のpath自体が見えなくなります。

このアイデアは、Mintlifyの [How we built a virtual filesystem for our Assistant](https://www.mintlify.com/blog/how-we-built-a-virtual-filesystem-for-our-assistant) と、Leonie Monigatti氏の [Implementing a virtual filesystem over Elasticsearch](https://leoniemonigatti.com/blog/virtual-filesystem-elasticsearch.html) で紹介されています。Mintlifyの記事では既存のdatabase上に仮想ファイルシステムを作る考え方が紹介されており、Leonie Monigatti 氏の記事ではそれをElasticsearch上で実装し、Document Level Securityによる権限制御まで含めた構成が紹介されています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20260514/20260514173027.png)

図は Leonie Monigatti 氏の “Implementing a virtual filesystem over Elasticsearch” より引用

Agentから見るとファイルを読んでいるだけですが、裏側では検索エンジンに対するリクエストが走ります。これにより、検索エンジン側のインデックス、スケーラビリティ、権限制御を利用できます。

## 今回試したこと

この記事では、OpenSearch上に仮想ファイルシステムを作り、通常の `grep` に加えて、ベクトル検索を使った `semantic_search` コマンドも同じ探索面で使えるようにしました。

この発想の背景には、階層的な探索インターフェースをAgentに渡す研究もあります。たとえば [A-RAG: Scaling Agentic Retrieval-Augmented Generation via Hierarchical Retrieval Interfaces](https://arxiv.org/abs/2602.03442) では、複数の検索方法や階層的なインターフェースをエージェントループと組み合わせることで、検索精度を高める方向が示されています。

検索エンジンを仮想ファイルシステムの裏側に置くなら、全文検索だけでなくベクトル検索も同じ場所に置けます。そこで今回は、ファイルシステム風の探索、`grep` によるキーワード検索、`semantic_search` による意味検索を、同じOpenSearch indexと同じ権限境界の中に入れることにしました。

実装上は、文書の読み取り、`grep`、`semantic_search` のすべてをOpenSearch経由にしました。runtimeでローカルファイルを直接読むのではなく、OpenSearchのDocument Level Securityを通した結果だけを返します。indexing側では文書本文とembeddingをOpenSearchに登録し、query側ではAgentからの操作をOpenSearchへの検索・取得に変換します。

Agentから見えるMCP toolは `docs_bash` だけです。`docs_bash` の中で使えるコマンドとして、以下を用意しました。

-   `ls`
-   `cat`
-   `grep`
-   `semantic_search`

ここで使っているのが [just-bash](https://github.com/vercel-labs/just-bash) です。just-bashは、AI Agent向けの仮想bash環境を提供するTypeScriptライブラリです。`IFileSystem` を実装したfilesystemを `new Bash({ fs })` に渡すことで、実ファイルシステム以外のbackendも `ls`, `cat` などのコマンドで操作できます。また、`defineCommand` で独自コマンドを追加したり、`grep` のような既存コマンドの挙動を差し替えたりできます。Leonie Monigatti 氏の記事では、この仕組みでElasticsearchをbackendとして接続しています。

イメージとしては、以下のような形です。Agentには `docs_bash` という1つのtoolだけを渡し、その内側でOpenSearchをバックエンドにした仮想ファイルシステムと検索コマンドを実行します。

import { Bash, defineCommand } from "just-bash";

const fs = new OpenSearchFs({ client, files, dirs });

const bash = new Bash({
  fs,
  cwd: "/",
  customCommands: \[
    defineCommand("grep", (args, ctx) \=>
      runOpenSearchGrep(args, ctx, fs),
    ),
    defineCommand("semantic\_search", (args, ctx) \=>
      runSemanticSearch(args, ctx, fs),
    ),
  \],
});

const server = createSdkMcpServer({
  tools: \[
    tool("docs\_bash", "Run read-only bash commands on docs", schema, async ({ command }) \=> {
      const { stdout, stderr } = await bash.exec(command);
      return { content: \[{ type: "text", text: stdout + stderr }\] };
    }),
  \],
});

`semantic_search` は次のように使えます。

semantic\_search "自然文の検索クエリ" \[path\]

`path` を指定した場合は、そのsubtreeに検索範囲を限定します。指定しない場合は現在のディレクトリ配下を検索します。出力は `path:snippet` 形式にしておき、Agentがそのまま `cat <path>` で根拠文書を読めるようにしました。

なお、今回OpenSearchを使っているのは、性能や機能比較の結果として最適だと主張したいからではなく、私自身がOpenSearchを学ぶ目的があったためです。

## 実験

実験では、2つの観点を確認しました。

1つ目は、小さな日本語の社内ドキュメント風データを使った定性的な確認です。ここでは、Agentが仮想ファイルシステムを自然に探索できるか、`grep` で見つからない文書に `semantic_search` で到達できるか、そして権限外の文書が検索結果に出ないかを確認しました。

2つ目は、EnterpriseRAG-Benchを使った定量評価です。ただし、ここでの目的は公式ベンチマークスコアを出すことではありません。同じ20,000文書のサブセット上で、`grep` だけを使えるAgentと、`grep` に加えて `semantic_search` も使えるAgentを比較し、探索インターフェースの違いがQA性能にどう影響するかを見ました。

## 実験1：小さな日本語データで挙動を確認する

まず、`example_data` に小さな社内ドキュメント風のデータを用意しました。たとえば以下のような構成です。

/
├── api-reference/                    # PUBLIC
│   └── users.mdx
├── auth/                             # PUBLIC
│   ├── oauth.mdx
│   └── api-keys.mdx
├── handbook/                         # PUBLIC
│   ├── field-note-042.mdx
│   ├── travel-expense.mdx
│   └── security/
│       └── api-key-incident.mdx
├── billing/                          # BILLING
│   └── invoice-policy.mdx
└── internal/                         # INTERNAL
    ├── audit-log.mdx
    ├── billing.mdx                   # BILLING
    ├── hr/
    │   └── salary.mdx
    └── security/
        └── api-key-incident-report.mdx

権限は3種類用意しました。

profile

見える文書

`PUBLIC`

公開ドキュメントのみ

`BILLING`

公開ドキュメント + 請求系ドキュメント

`INTERNAL`

公開ドキュメント + 内部ドキュメント

Agentから見えるツールは、Claude CodeのAgent SDKに渡した `docs_bash` だけです。`docs_bash` の中では `ls`, `cat`, `grep`, `semantic_search` が使えますが、Agentから見るとあくまで仮想ファイルシステムを探索しているように見えます。

### 権限制御の確認

まず、権限制御の確認として請求書の例を使いました。同じ質問でも、`PUBLIC` profileでは請求グループ向け文書が検索結果に出ません。

npm run bootstrap
npm run agent-demo -- PUBLIC "請求書の支払期限と督促ルールを教えて。根拠ファイルも示して"

このときAgentは `grep` で見つからなかったあと、自然に `semantic_search "請求書の支払期限と督促ルール" /` を実行しました。しかし、`PUBLIC` から見える範囲には `/billing/invoice-policy.mdx` がないため、正しい根拠には到達しません。

agent-demo 実行ログ（PUBLIC / 請求書）

\[profile=PUBLIC\] user: 請求書の支払期限と督促ルールを教えて。根拠ファイルも示して

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls /"}
tool\_result:
exitCode: 0
api-reference
auth
handbook

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"grep -ril \\"請求書\\\\|支払期限\\\\|督促\\" /"}
tool\_result:
exitCode: 1
(empty stdout)

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls -R / | head -100"}
tool\_result:
exitCode: 0
/:
api-reference
auth
handbook

//api-reference:
users.mdx

//auth:
api-keys.mdx
oauth.mdx

//handbook:
field-note-042.mdx
security
travel-expense.mdx

//handbook/security:
api-key-incident.mdx

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"semantic\_search \\"請求書の支払期限と督促ルール\\" /"}
tool\_result:
exitCode: 0
/handbook/travel-expense.mdx:# 旅費精算ハンドブック
/auth/api-keys.mdx:# API keys
/handbook/security/api-key-incident.mdx:# APIキー漏洩時の初動
/api-reference/users.mdx:# Users
/auth/oauth.mdx:# OAuth

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"cat /handbook/travel-expense.mdx"}
tool\_result:
exitCode: 0
---
title: 旅費精算ハンドブック
---

# 旅費精算ハンドブック

出張後の交通費、宿泊費、日当は経費精算システムから申請します。申請時には領収書、訪問先、目的、参加者、利用日を添付してください。

assistant:
ご質問の「請求書の支払期限」と「督促ルール」に関するドキュメントは、現在アクセス可能な内部ドキュメント内には見つかりませんでした。

確認した内容:
1. キーワード検索: \`grep -ri "請求書|支払期限|督促"\` を実行 -> ヒットなし
2. セマンティック検索: \`請求書の支払期限と督促ルール\` で検索 -> 関連性のある文書なし
3. ディレクトリ全体の確認: \`/api-reference\`, \`/auth\`, \`/handbook\` のみ存在

考えられる理由:
- 当該ハンドブックがこの文書コレクションに登録されていない
- OpenSearch のドキュメントレベルセキュリティにより、現在の profile では閲覧権限がなく、検索結果に含まれていない

同じ質問を `BILLING` profileで実行すると、請求グループ向け文書が見えるようになります。

npm run agent-demo -- BILLING "請求書の支払期限と督促ルールを教えて。根拠ファイルも示して"

agent-demo 実行ログ（BILLING / 請求書）

\[profile=BILLING\] user: 請求書の支払期限と督促ルールを教えて。根拠ファイルも示して

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls /"}
tool\_result:
exitCode: 0
api-reference
auth
billing
handbook
internal

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls /billing /handbook /internal 2>&1"}
tool\_result:
exitCode: 0
/billing:
invoice-policy.mdx

/handbook:
field-note-042.mdx
security
travel-expense.mdx

/internal:
billing.mdx

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"cat /billing/invoice-policy.mdx /internal/billing.mdx"}
tool\_result:
exitCode: 0
---
title: 請求書と支払期限
---

# 請求書と支払期限

請求書は毎月 1 営業日に発行されます。標準の支払期限は発行日から 30 日後です。契約で個別条件が定められている場合は、契約条件を優先します。

## 支払い遅延

期限を 7 日過ぎても入金が確認できない場合は、一次督促メールを送付します。14 日を超える場合は担当営業へ通知し、利用制限の要否を確認します。強制停止は顧客影響が大きいため、法務と営業の承認が必要です。

assistant:
# 請求書の支払期限と督促ルール

## 支払期限
- 請求書は毎月1営業日に発行
- 標準の支払期限は発行日から30日後
- 契約で個別条件が定められている場合は、契約条件が優先

## 督促ルール
- 期限後7日経過: 一次督促メールを送付
- 期限後14日超過: 担当営業へ通知し、利用制限の要否を確認
- 強制停止: 顧客影響が大きいため、法務と営業の承認が必要

根拠ファイル:
- /billing/invoice-policy.mdx
- /internal/billing.mdx

この挙動は、アプリケーション側で検索結果を後処理して隠しているのではありません。OpenSearchのDocument Level Securityで検索対象そのものを制限しています。つまり、`cat` だけでなく、`grep` や `semantic_search` でも同じ権限境界が効きます。

エンタープライズ検索では、この性質が重要です。Agentに強力な探索手段を渡すほど、権限外の文書が検索結果やスニペットに混ざらないことが重要になります。検索エンジン側のDLSに寄せることで、通常の全文検索とベクトル検索を同じ権限制御の下に置けます。

### semantic\_searchの確認

次に、`semantic_search` が権限内の文書を見つける例を確認しました。ここでもユーザー側から `semantic_search` というツール名は指定しません。あくまで自然な質問を投げ、Agentが必要に応じて探索方法を選ぶようにしました。

npm run agent-demo -- PUBLIC "解約しそうな顧客を立て直す手順を教えて。根拠ファイルも示して"

実際のログは以下のようになりました。Agentはまず階層を見てから `grep` を試し、`解約`, `チャーン`, `churn`, `顧客` ではヒットしないことを確認しました。その後、`semantic_search` に切り替えて目的の文書へ到達しています。

agent-demo 実行ログ（PUBLIC / semantic\_search）

\[profile=PUBLIC\] user: 解約しそうな顧客を立て直す手順を教えて。根拠ファイルも示して

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls /"}
tool\_result:
exitCode: 0
api-reference
auth
handbook

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"ls /handbook"}
tool\_result:
exitCode: 0
field-note-042.mdx
security
travel-expense.mdx

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"grep -ril \\"解約\\\\|チャーン\\\\|churn\\\\|顧客\\" /"}
tool\_result:
exitCode: 1
(empty stdout)

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"semantic\_search \\"解約しそうな顧客を立て直す手順\\" /"}
tool\_result:
exitCode: 0
/handbook/field-note-042.mdx:# アカウントヘルス回復プレイブック
/handbook/security/api-key-incident.mdx:# APIキー漏洩時の初動
/auth/api-keys.mdx:# API keys
/api-reference/users.mdx:# Users
/handbook/travel-expense.mdx:# 旅費精算ハンドブック

tool\_use: mcp\_\_osfs\_\_docs\_bash {"command":"cat /handbook/field-note-042.mdx"}
tool\_result:
exitCode: 0
---
title: アカウントヘルス回復プレイブック
---

# アカウントヘルス回復プレイブック

契約済みアカウントの利用シグナルが弱まり、継続価値が伝わっていないと判断したときの回復手順です。目的は、担当者の温度感を戻すことではなく、相手の業務成果に結びつく成功条件を再定義し、次の具体的な実行予定を合意することです。

assistant:
解約しそうな顧客を立て直す際は、社内ドキュメント「アカウントヘルス回復プレイブック」に沿って進めます。

1. 直近30日の利用ログ、問い合わせ履歴、未完了タスク、定例会の議事録を確認する
2. CSMと営業で3営業日以内に短い回復プランを作る
3. 次回ミーティングでは顧客が今月達成したい業務指標を1つ選び、プロダクトの使い方を合意する
4. 意思決定者との接点が2週間以上ない場合はスポンサー確認を行う
5. 次回実行日、担当者、成功条件、確認日が合意されたら完了とする

根拠ファイル: /handbook/field-note-042.mdx

この例では、ユーザーは `semantic_search` というツール名を指定していません。それでもAgentは、まず `grep -ril "解約\|チャーン\|churn\|顧客" /` を試し、ヒットしなかったあとで `semantic_search "解約しそうな顧客を立て直す手順" /` を実行し、`/handbook/field-note-042.mdx` を見つけています。

ここで重要なのは、ファイル名が `field-note-042.mdx` であり、ユーザーの質問語とはほとんど対応していない点です。階層を `ls` で見ても中身までは分かりませんが、`semantic_search` によって「活用が進まない顧客を立て直す」という意図に近い文書を候補にできています。

コマンド単体で見ると以下のようになります。

grep -ril "解約\\|チャーン\\|churn\\|顧客" /
# empty

semantic\_search "解約しそうな顧客を立て直す手順" /

/handbook/field-note-042.mdx:# アカウントヘルス回復プレイブック

2件目以降にはノイズも混ざりますが、先頭候補として目的の `/handbook/field-note-042.mdx` が返っています。

この定性的な実験から、次の3点は確認できました。

-   Agentは `ls`, `cat`, `grep` で通常のファイルシステムのように探索できる
-   完全一致のキーワードが分からない場合は `semantic_search` で候補を拾える
-   `grep` と `semantic_search` の両方にOpenSearchの権限制御が効く

## 実験2：EnterpriseRAG-Benchで定量評価する

次に、[EnterpriseRAG-Bench: a RAG Benchmark for Company Internal Knowledge](https://arxiv.org/abs/2605.05253)を使って定量評価を行いました。

EnterpriseRAG-Benchは、企業内ナレッジを対象にしたRAG評価用ベンチマークです。一般的なWeb QAではなく、社内ドキュメントに近い文書集合と質問を使い、正しい根拠文書を見つけられるか、その根拠に基づいて回答できるかを評価するためのデータセットです。質問には期待される文書IDやanswer factsが付いているため、検索だけでなくAgent QAの評価にも使いやすいです。

ただし、ここでの目的はベンチマークの公式スコアを出すことではありません。今回見たいのは、同じ仮想ファイルシステム上で `grep` だけを使う場合と、`semantic_search` も使える場合にどの程度差が出るかです。

実験は以下の設定にしました。

項目

設定

corpus

EnterpriseRAG-Benchから20,000 docsを抽出

Agent QA eval

50 questions

embedding

`nomic-embed-text-v1.5`

Agent model

`gemma4:e4b` on Ollama

judge model

`gemma4:e4b` on Ollama

比較したのは以下の2条件です。

-   `grep-only`: `ls`, `cat`, `grep` のみ
-   `grep+semantic_search`: `ls`, `cat`, `grep`, `semantic_search`

Agentから見えるMCP toolはどちらも `docs_bash` のみです。違いは、bash内で `semantic_search` コマンドを使えるかどうかだけです。

評価は、最終回答の文字列一致だけではなく、EnterpriseRAG-Benchの思想に寄せて以下を見ました。

-   正しい文書IDを引用できたか
-   expected documentに対するdocument recall
-   LLM judgeによるanswer correctness
-   answer facts単位のcompleteness

結果は以下の通りです。

arm

cases

overall score

answer correctness

answer completeness

document recall

avg tools

avg semantic

avg ms

grep-only

50

11.6%

12.0%

15.3%

15.3%

4.0

0.0

24,893

grep+semantic\_search

50

29.8%

32.0%

37.9%

41.5%

4.1

0.7

33,561

`semantic_search` を追加すると、overall scoreは11.6%から29.8%に上がりました。Document Recallも15.3%から41.5%に上がっており、まず正しい文書に辿り着く部分で差が出ています。

興味深かったのは、`grep+semantic_search` でも平均のtool call数はほとんど増えていない点です。`avg tools` は4.0から4.1で、単純にたくさん探索したから良くなったというより、必要なときに意味検索を1回弱使うことで候補文書が改善したと見られます。

## まとめ

検索エンジン上に仮想ファイルシステムを作ると、Agentにとって扱いやすい探索インターフェースと、検索エンジンのスケーラビリティ・権限制御を両立できます。`ls` で全体構造を見る、`grep` で候補を探す、`cat` で根拠を読む、という流れはLLMにとって自然で、検索APIを呼ばせるよりも探索の途中経過を使いやすくなります。

また、`grep` と `semantic_search` は競合ではなく補完関係にあります。固有名詞や識別子にはgrepが強く、語彙がずれる質問にはsemantic searchが効きます。EnterpriseRAG-Benchのサブセット実験でも、`grep-only` に比べて `grep+semantic_search` はdocument recallとanswer correctnessが改善しました。

エンタープライズ検索では、権限管理を検索エンジン側に寄せることも重要です。Agentに強力な探索手段を渡すほど、権限外の文書が検索結果やスニペットに混ざらない保証が必要になります。OpenSearchのDLSを使うことで、`cat`, `grep`, `semantic_search` に同じ権限境界を適用できました。

もちろん、ベクトル検索を足せばすべて解けるわけではありません。むしろ今回の結果から見えたのは、階層探索、キーワード検索、意味検索、権限制御を同じインターフェースに統合することの価値です。

ただし、今回はあくまでPoCです。本番で運用できるかは、性能、運用負荷、権限設計、評価方法などを含めてまだ検討が必要です。また、検索エンジンに文書をindexする構成である以上、文書の変更とindexの同期ずれの問題も残ります。そもそもファイル探索とベクトル検索を1つの探索インターフェースに統合する必要があるのか、別々のtoolとして扱う方がよいのかも、ユースケースごとに見極める必要がありそうです。

AIエージェント向けの検索では、検索精度だけでなく、Agentが探索しやすい形で検索機能をどう見せるかが重要になりそうです。今後も、検索エンジンとAgentic Searchの接続方法を試していきたいと思います。

* * *

ここまでお読みいただきありがとうございました。LayerXではAI時代の検索・データ基盤を一緒に作ってくれる方を絶賛募集中です。興味を持っていただけた方がいたら、ぜひ一度お話しましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/107758)