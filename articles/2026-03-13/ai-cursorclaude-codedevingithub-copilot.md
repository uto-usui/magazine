---
title: "マルチAIエージェント時代のルールの一元管理 —— Cursor・Claude Code・Devin・GitHub Copilot での実践例"
source: "https://tech.smarthr.jp/entry/2026/03/12/134348"
publishedDate: "2026-03-12"
category: "design"
feedName: "SmartHR Tech Blog"
author: "mmurano"
---

こんにちは、少しずつ春の気配を感じる季節になりましたね。新規事業開発チームでプロダクトエンジニアをしている [murano](https://twitter.com/samemuramura) です。

私たちのチームでは、Cursor、Claude Code、Devin、GitHub Copilot と複数のAIエージェントを開発に活用しています。便利な一方で、AIエージェントごとに異なるルールファイルを管理する手間が課題になっていました。そのため、メインで使っている Cursor に合わせて `.cursor/rules` を細かくメンテ・拡充し、他のAIエージェントは `.cursor/rules` を参照するようにそれぞれ簡単なルールを設定していました。しかし、これだとルールを正確に認識できず、AIの生成精度が Cursor よりも悪い状態が続いていました。

今回は、これらのルールを `AGENTS.md` に集約し、ルールファイル群として4つのAIエージェントを統一管理できるようにした取り組みを紹介します。「AIエージェントごとにルール設定が散らばって管理しきれない」「AIエージェントを乗り換えるたびに設定をやり直している」といった悩みを持つ方の参考になれば幸いです。

## この記事で分かること

-   複数のAIエージェントのルールを `AGENTS.md` で統一管理する方法
-   `.cursor/rules` から `AGENTS.md` への移行手順
-   移行後の実際の効果と注意点

## なぜルールの統一管理が必要だったの？

各AIエージェントは、ルールファイルの読み込み方法がそれぞれ異なります。統一前の、AIエージェントごとの設定ファイルは以下のとおりでした。

\---
title: 統一前のAIエージェントとルールファイルの関係
---
flowchart LR
    subgraph リポジトリ\[GitHubリポジトリ\]
      CR\[".cursor/rules/\*\*/\*.mdc"\]
      CM\["CLAUDE.md"\]
      CI\[".github/copilot-instructions.md"\]
    end
    DK\["Devin knowledge"\]

    Cursor --> CR
    ClaudeCode\["Claude Code"\] --> CM
    Devin --> DK
    Copilot\["GitHub Copilot"\] --> CI

私たちのチームでは Cursor をメインで使用しているため、`.cursor/rules` を丁寧にメンテしていました。しかし、他のAIエージェントには「`.cursor/rules` 配下の `.mdc` ファイルを参照してください」という簡単な指示を追加するだけでした。これでは十分にルールが反映されず、Cursor 以外のAIエージェントではAIの生成精度が下がる状態が続いていました。

また、ルールのメンテナンスコストも気になっていました。Cursor のルールを更新するたびに、他のAIエージェントの設定も更新しなければならない。それがわかっていると、ルールの改善に踏み切りにくくなります。ルールの一元管理ができれば、どのAIエージェントを使っても同じ品質のAI支援が受けられる状態になるはずだと考え、解決策を探し始めました。

## なぜ AGENTS.md を選んだの？

調査の結果、以下のことが分かりました。

-   Cursor、Devin、GitHub Copilot はネストしたディレクトリ内の `AGENTS.md` を読み込める
    -   [Cursor Docs](https://cursor.com/ja/docs/context/rules#-14)
    -   [Devin Docs](https://docs.devin.ai/onboard-devin/agents-md)
    -   [GitHub Enterprise Cloud Docs](https://docs.github.com/ja/enterprise-cloud@latest/copilot/tutorials/coding-agent/get-the-best-results#adding-custom-instructions-to-your-repository)
-   Claude Code はネストしたディレクトリ内の `CLAUDE.md` を読み込める（[Claude Code Docs](https://code.claude.com/docs/en/memory#how-claude-looks-up-memories)）

`AGENTS.md` を使えば Cursor・Devin・GitHub Copilot の3つのAIエージェントを共通のルールで動かせます。残る Claude Code は `CLAUDE.md` を読むので、`AGENTS.md` へのシンボリックリンクとして `CLAUDE.md` を作成することで、4つのAIエージェントすべてを1つのルールファイルで統一管理できることが分かりました。 シンボリックリンクの運用については、「[AGENTS.mdベストプラクティス完全ガイド - AIエージェントを最大限活用する設定術 - Qiita](https://qiita.com/dai_chi/items/61019c602c2c40dade07)」を参考にさせて頂きました。

なお、調査の過程で「AIエージェントを判定してルールを出し分ける」アプローチも検討しました。しかし「あなたが Claude Code なら〜」「あなたが Cursor なら〜」といった条件分岐は、AIエージェントが自身の名称を正確に認識していないためうまく機能しないことが分かりました。ルール自体を共通化する方が確実だと思いました。

統一後のAIエージェントとルールファイルの関係は以下のようになります。

\---
title: 移行後のAIエージェントとルールファイルの関係
---
flowchart LR
    subgraph リポジトリ\[GitHubリポジトリ\]
        AGENTSMD\["\*\*/AGENTS.md"\] 
        CLAUDEMD\["\*\*/CLAUDE.md"\]
    end

    Cursor ---> AGENTSMD
    Devin ---> AGENTSMD
    Copilot\["GitHub Copilot"\] ---> AGENTSMD
    ClaudeCode\["Claude Code"\] --> CLAUDEMD
    CLAUDEMD -- シンボリックリンク --> AGENTSMD

## 移行作の手順

AIエージェントのルール運用を統一するために、実際に行った移行作業を説明していきます。

### .cursor/rules から AGENTS.md に再配置

変更前は `.cursor/rules/` 配下にルールをまとめ、frontmatter で `globs` を指定して適用範囲を制御していました。ここでいう frontmatter は Markdown 先頭のメタデータ、`globs` は適用対象のファイルパターンです。以下は、簡略化したディレクトリ構造です。

root/
└─── .cursor/rules/
      ├── backend/
      │   ├── controllers.mdc
      │   ├── general.mdc
      │   ├── models.mdc
      │   └── testing/
      │       ├── model.mdc
      │       └── request.mdc
      ├── frontend/
      │   ├── components.mdc
      │   └── general.mdc
      └── global.mdc

変更後は、コードのディレクトリ構造に合わせて `AGENTS.md` として配置します。ファイル構成ついてのベストプラクティスは後述します。

root/
├── AGENTS.md
├── backend/
│   ├── app/
│   │   ├── AGENTS.md
│   │   ├── controllers/AGENTS.md
│   │   └── models/AGENTS.md
│   └── spec/
│       ├── AGENTS.md
│       ├── models/AGENTS.md
│       └── requests/AGENTS.md
└── frontend/
    ├── AGENTS.md
    └── src/components/AGENTS.md

このアプローチでは、frontmatter による `globs` 指定が不要になります。ディレクトリ構造そのものが適用範囲を表現するため、作業しているディレクトリに関連するルールが自然に読み込まれます。ファイル拡張子でルールを絞り込みたい場合は、ルール本文に明記します。例えば以下のように記述します。

# AGENTS.md (backend/app/AGENTS.md の例)

## Rails ルーティング関連のルール

\*\*適用対象\*\*: このルールは \`routes.rb\` のみに適用する

\- RESTful なルーティングを優先する

しかし、再配置の作業自体は思ったより素直ではありませんでした。

AIを使って `.cursor/rules` の内容を `AGENTS.md` に移しましたが、`.cursor/rules` で扱いやすい粒度と `AGENTS.md` で自然に管理しやすい粒度が微妙に異なり、そのまま機械的に移すとうまく収まらない箇所がありました。結果として、どのディレクトリに何を書くと読みやすく保守しやすいかを見直しながら調整する必要があり、ここには少し時間がかかりました。

### シンボリックリンクの作成

Claude Code のために、`CLAUDE.md` を `AGENTS.md` へのシンボリックリンクとして作成しました。こちらは、一意に決まる作業ですので数分で完了しました。

## 移行してみてどうだったか

実際のプロジェクトで `AGENTS.md` へ移行してみると、想像していた以上に手応えがありました。正直、最初は「本当に Cursor 以外のAIエージェントでも同じように効くのか」と半信半疑でしたが、使い始めてみると期待以上に運用が安定しました。

まず、Cursor 以外のAIエージェントでも、ルールへの追従が安定したと感じました。ここは定量検証していませんが、チームメンバーからは「意図したルールに沿った出力が増えた」「レビュー時の手戻りが減った」といった声があり、人間がコードを手直しする頻度が2, 3割は減ったと感じます。Devin Review や Copilot Review でも同様の変化を感じています。

また、ルールの読み忘れも減りました。たとえば `frontend/src/components` を触るときは `frontend/AGENTS.md` と `frontend/src/components/AGENTS.md`、`backend/spec/requests` を触るときは `backend/spec/AGENTS.md` と `backend/spec/requests/AGENTS.md` のように、作業場所に近いルールがそのまま適用対象になります。以前の `.cursor/rules` では `globs` の指定を頭の中で対応付ける必要がありましたが、移行後はディレクトリ構造そのものが適用範囲になるため、どのルールが効くのかを把握しやすくなりました。感覚としては、フロア案内図を見ながら目的の注意書きを探す運用から、各部屋の入口に必要な注意書きが貼ってある運用に変わったイメージです。

この2つの変化がそろってからは、開発中にルールのことを意識しすぎなくてよくなり、かなり快適になりました。少なくとも私自身は、もう移行前の運用には戻れないと感じています。

## 注意点とベストプラクティス

移行を進めるときは、まず「何を改善したいのか」と「どこまで厳密にルールを効かせたいのか」を分けて考えると整理しやすくなります。

### 目的を明確にする

この移行事例では、`.cursor/rules` との定量的な比較までは行っておらず、チームでの利用感にもとづく定性的な評価が中心です。そのため、「どのAIエージェントでも同じルールを使いたい」「ルール管理の分散を減らしたい」という課題には有効でしたが、生成精度が必ず向上するとまでは言い切れません。

### 集中管理が向くケースもある

`AGENTS.md` への移行は、複数AIエージェントの統一管理と、コードの近くにルールを置けることが大きなメリットです。一方で、プロジェクトのディレクトリ構造が複雑ではなく、少数の共通ルールを一括で管理したい場合は、従来の `.cursor/rules` のような集中管理の方が運用しやすいと思います。

### ルールの粒度はディレクトリ構造に合わせる

`AGENTS.md` はディレクトリ単位で配置できるため、各領域に特化したルールを書きやすいのが利点です。ただし、細かく分けすぎると、どこに何を書くべきかが分かりにくくなります。例えば引き出しを増やしすぎると、整理したはずなのに目的の物を探しにくくなるのと似ています。実際には、プロジェクトのディレクトリ構造をそのまま基準にして、「この単位なら担当領域として意味がある」と思える粒度で配置するのが現実的でした。

### `globs` の代わりに本文で適用範囲を補う

`.cursor/rules` で使っていた `globs` は不要になりますが、その分だけ適用範囲の厳密さは下がります。たとえばファイル拡張子で特定ファイルだけにルールを限定したい場合は、本文に「このルールは `routes.rb` のみに適用する」のように明記する方法が有効です。ただし、複雑な条件を本文で表現しすぎると、かえって解釈がぶれやすくなります。そうしたケースでは、ルール文を増やすより、ディレクトリ構造を分けて適用範囲そのものを整理する方が安定します。

## おまけ: AGENTS.md に移行するプロンプト

`.cursor/rules` から `AGENTS.md` への移行をAIに依頼するプロンプトを作成しました。 このプロンプトを使う際には、ご自身の環境に合わせて適宜カスタマイズしてご利用ください。利用するAIによって生成結果は変わるため、出力結果は必ずご自身で確認してください。

移行プロンプト

# .cursor/rules から AGENTS.md への移行プロンプト

## 目的

\`.cursor/rules\` 配下に配置されているルールファイルを、プロジェクトのディレクトリ構造に合わせて \`AGENTS.md\` として再配置します。

## 移行手順

### 1. 既存のルールファイルを確認

\`.cursor/rules/\` 配下のすべてのルールファイル（\`.mdc\` ファイル）を確認してください。

### 2. ディレクトリ構造に基づいた配置先を決定

各ルールファイルの \`globs\` パターンやファイル名から、適切な配置先ディレクトリを判断します。

例:

\- \`backend/controllers.mdc\` → \`backend/app/controllers/AGENTS.md\`
\- \`backend/testing/model.mdc\` → \`backend/spec/models/AGENTS.md\`
\- \`frontend/components.mdc\` → \`frontend/src/components/AGENTS.md\`

### 3. AGENTS.md ファイルの作成

各ディレクトリに \`AGENTS.md\` ファイルを作成し、対応するルールの内容を記述します。

重要な変更点:

\- frontmatter（\`globs\` など）は削除する
\- ファイル拡張子による適用範囲の指定が必要な場合は、ルール本文に明記する
  - 例: 「このルールは "routes.rb" のみに適用する」

### 4. CLAUDE.md シンボリックリンクの作成

各 \`AGENTS.md\` と同じディレクトリに、\`CLAUDE.md\` へのシンボリックリンクを作成します。

シンボリックリンクの作成コマンド： \`ln -s AGENTS.md CLAUDE.md\`

### 5. 動作確認

\- Cursor で各ディレクトリを開き、ルールが適切に読み込まれることを確認
\- Claude Code、GitHub Copilot、Devin でも同様に確認

### 6. 旧ルールファイルの削除

すべてのルールが正常に移行されたことを確認後、\`.cursor/rules/\` ディレクトリを削除します。

## チェックリスト

\- \[ \] すべてのルールファイルを確認した
\- \[ \] 適切なディレクトリに AGENTS.md を配置した
\- \[ \] frontmatter を削除し、必要に応じてルール本文に適用範囲を明記した
\- \[ \] CLAUDE.md シンボリックリンクを作成した
\- \[ \] 各AIエージェントでルールが読み込まれることを確認した
\- \[ \] \`.cursor/rules/\` ディレクトリを削除した

## まとめ

`AGENTS.md` を活用することで、Cursor・Claude Code・Devin・GitHub Copilot の4つのAIエージェントを1つのルールファイル群で統一管理できるようになりました。特に大きかったのは、ルールをコードのディレクトリ構造に合わせて配置するアプローチへの変化です。`.cursor/rules` では `globs` による適用範囲の管理が必要でしたが、`AGENTS.md` ではディレクトリ構造そのものが適用範囲を表現します。コードと関連するルールが近くに配置されることで、管理・メンテナンスがしやすくなりました。

「複数のAIエージェントを使っているが、ルール設定が散らばってきた」と感じている方は、ぜひ `AGENTS.md` への統一を検討していただければ幸いです。移行した感想などもお待ちしております。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

AIを活用していきたい人もそうでない方もお待ちしています。 少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)