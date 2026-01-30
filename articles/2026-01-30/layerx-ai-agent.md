---
title: "LayerX AI Agentブログリレー最終回！全体振り返りと俺の推し記事を紹介するぜ！"
source: "https://tech.layerx.co.jp/entry/2025/11/28/124908"
publishedDate: "2025-11-28"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "abctail30"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251128/20251128125210.png)

こちらは[LayerX AI Agentブログリレー](https://layerx.notion.site/6975c0901ea54ca9b609fafc3e8a35c3?v=268cdd370bae80cc8dfb000c55400a25)55日目の記事です。

LayerX バクラク事業部で AI/MLOpsエンジニアをしている中村([@po3rin](https://x.com/po3rin))です。AI Agentブログリレーが55日を迎えました！！12月はアドベントカレンダーが始まるためAI Agentブログリレーは終了します。区切りとして、ここまでブログリレーを運用してきた所感をまとめ、私の独断と偏見で選んだAI Agentブログリレーの名作を振り返ります。

## AI Agentブログリレーとは

LayerXが始めたAI Agent開発縛りで記事を書くというイカれたブログリレーです。AI Agentブログリレーの全アーカイブはこちらにあるので是非読んでみてください！

[layerx.notion.site](https://layerx.notion.site/6975c0901ea54ca9b609fafc3e8a35c3?v=268cdd370bae80cc8dfb000c55400a25)

なぜ始めたのかの思いの丈は次のブログに書いてあります。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/aiagentblogrelay)

簡単にまとめると「日本にAI Agent開発ノウハウが少ない！」「全ての経済活動をデジタル化するためにもAI Agent開発の加速に繋げたい！」という思いから始めました。

## LayerX AI Agent ブログリレーの中間振り返り

### 統計値

書く人がいなくなるまで続けますと宣言したら現在なんと55日まで伸びました。2025年9月8日から続いたので、ほぼ3ヶ月ほど続いた計算になります。合計33人のエンジニアが参加しているので、LayerXのエンジニアの半分程度が参加したことになります。

一番多く書いたのは AI/MLOpsエンジニアの[pon](https://x.com/po3rin)とバクラクPdMの[k6nta](https://x.com/k6nta)さん、Enablingチームスタッフエンジニアの[izumin5210](https://x.com/izumin5210)が4記事。フロントエンドをリードする[yuya\_presto](https://x.com/yuya_presto)さんとAI-BPOに取り組む[tapioca\_pudd](https://x.com/tapioca_pudd)が3記事でした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125230136.png)

執筆数集計

### 書かれたテーマ

内容は多岐にわたりました。

-   コンテキストエンジニアリング
-   プロンプト自動最適化
-   Agentic Workflow自動生成
-   AI Agentの評価
-   AI Agentの認証認可
-   Agentic Search
-   ブラウザ操作自動化エージェント
-   RAG
-   Temporal で実現するDurable な AI Agent開発
-   etc...

### 社内社外の反応

AI Agentブログリレーの開催によって、社内と社外で明確な変化がありました。

社内ではAI Agent開発に関する試行が加速しました。55日ブログを繋ぐためには日頃の「時間があったら試したい」をエンジニア全員で消費していかないと間に合わないため、各エンジニアが個人でAI Agent開発を学び、実際に手を動かすサイクルができました。実際に私も、ブログリレーによって[LLM推論スケーリングを試して記事にしたり](https://tech.layerx.co.jp/entry/mahjong-repeated-sampling)と「時間があったら試したい」を行動に移すキッカケになりました。

社外の変化としては、「LayerXはAI Agent開発を頑張っている」と言っていただく機会が増えました。実際にイベントやカジュアル面談でお話しした人に「ブログリレー見てます！LayerXのAgent開発の勢いすごいですね」という言葉をたくさん貰い非常にありがたいです。最初に想定してたよりも社外の反応を頂けています。

## AI Agentブログリレー名作紹介

### 申請作成 AI Agent の PoC での試行錯誤と学び

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/09/19/191318)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125212449.png)

[バクラクCTO](https://x.com/yyoshiki41)に「我々の血肉がだいぶ露出してる」と言わせしめた渾身の記事です。こちらは申請作成 AI AgentのPoCを通して得た学びが詰まっています。本では学べないリアルな課題に対して、LLMをどう扱うかを取り扱っています。特にどのようなToolを設計するかの議論は必見です。既存サービスにAI Agent機能を載せたいエンジニアは必見です。

### CopilotKitでアプリをAI化しないか？

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/10/01/165440)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125212953.png)

実際にAIエージェントを組み込もうとすると以下のような作業が必要です。

LLM API接続の実装（認証、鍵管理、エラーハンドリング、ストリーミング対応） プロンプト設計と入出力スキーマ管理（テンプレ管理、JSON検証、リトライ処理） フロントエンド統合（ストリーミングUI、再実行UI、根拠表示UI）

この一連の複雑な作業を大幅に省き、わずか数行のコードを追加するだけで既存の React アプリに AIエージェントを組み込むことができるウルトラCの紹介です。私はこの記事を読んだ時に「すげ...」と感動しました。[CopilotKit](https://www.copilotkit.ai/)を使い直接アプリケーションを操作できます。これによって上の組み込みのステップを省略できます。是非読んでみてください！

### Temporal Workflow で実現する Durable な AI Agent

[zenn.dev](https://zenn.dev/layerx/articles/b5f6cf6e47221e)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125223951.png)

Workflow Engine Design Principles with Temporal | Temporal より引用

プロダクトに AI Agent 機能を組み込むにあたっていずれは避けて通れなくなる、 Durable Exectuion に対応した Workflow Engine の Temporal Workflow について紹介し、これによって AI Agent 開発にどのようなメリットがあるかを解説している記事です。AI Agent開発においてはユーザの操作の待ち受けなど、今までと同じインフラにそのまま乗せるだけでは対応できないものがあります。LayerXではこの Temporal をフル活用してAI Agent を動かすための基盤を整備しています。

### LLMで業務ワークフローを自動生成・最適化する!

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/11/19/133143)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125213359.png)

R&Dチームが本腰を入れて取り組んでいるAgentic Workflow自動生成に関する記事です！！具体的なタスクに対してAgentic Workflow自動生成をあてることで、チャンキング戦略の自動発見やLLM、Pythonコード生成の切り分けなどを行いAgentic Workflowを最適化するさまは壮観です！n8nやDifyでWorkflowを組むことに工数をさいている人も必見です！

### ビジネス出身PMが、『AIのことはエンジニアにお任せ派』から『PMもAIエージェントを自作しよう派』になるまで

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/11/06/080000)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125213647.png)

AIエージェントはエンジニアだけの専門職ではありません。この記事はコーディング未経験の営業上がりのプロダクトマネージャーがAIエージェントを作成した学びを共有しています。特に「手を動かしたからこそ得られた学び」はエンジニアの方以外でもAIエージェントを作ってみようと思える、勇気の出る内容になっています！

### AI Agentフレームワークを使うべきなのか？

[zenn.dev](https://zenn.dev/layerx/articles/91321c52241600)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125214059.png)

Agentフレームワークって何を使えば良いのか？という疑問を吹き飛ばす良記事です。どんな観点で選ぶのかを語りつつ、フレームワーク採用で困ったこととともに、そもそもフレームワークを使わないという判断があるという現場の学びを感じます。Agentフレームワークを触ったことのあるエンジニアは必見です！

### AI Agent時代における『使えば使うほど賢くなるAI機能』の開発

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2025/10/23/222742)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125214336.png)

AFlowの概要図(AFlow: Automating Agentic Workflow Generation, [https://arxiv.org/abs/2410.10762](https://arxiv.org/abs/2410.10762) からの引用)

「使えば使うほど賢くなる AI 機能」の開発というテーマで、LLM 以前、そして LLM 以後どのようにパーソナライゼーションを実現していくのかを論文や実際のサービスを引用しながら広く紹介しています。 更に、その中の一要素として重要な Prompt 最適化という技術について [DSPy](https://dspy.ai/) を用いた検証を行っており、実践的な内容にもなっています。「使えば使うほど賢くなる AI 機能」を考えることはAI Agent開発を行う全てのエンジニアが考えるべき観点です。

### Temporal Knowledge Graphで作る！時間変化するナレッジを扱うAI Agentの世界

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/tkg-agent)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/abctail30/20251125/20251125214545.png)

AIにより改めて脚光を浴びている Knowledge Graph について調査と技術の紹介を行い、その中でも時間変化を取り扱うことができるTemporal Knowledge Graphについて紹介している記事です。実装のポイント、課題だけでなく、PoCのデモ動画でTemporal Knowledge Graphがどのような世界を実現できるかも学ぶことができます。

## まとめ

AI Agentブログリレーが55日に到達し、区切りとして、私の独断と偏見で選んだAI Agentブログリレーの名作を振り返り、ここまでブログリレーを運用してきた所感をまとめました。想定以上に社内にも社外にも反響があり驚いています。12月からアドベントカレンダーも始まるのでみなさん楽しみにお待ちください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)

AI Agentブログリレーのアーカイブはこちらにあるので是非読んでみてください！

[layerx.notion.site](https://layerx.notion.site/6975c0901ea54ca9b609fafc3e8a35c3?v=268cdd370bae80cc8dfb000c55400a25)

また、LayerXで私と一緒にAI Agent開発を爆速にする基盤を構築する仲間も募集しています！！是非気軽に連絡ください！！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/234cdd370bae806dbe98e448605c8c7f)