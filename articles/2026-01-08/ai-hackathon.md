---
title: "メルカリモバイル開発チームでAI Hackathonをした話"
source: "https://engineering.mercari.com/blog/entry/20250613-64e628404a/"
publishedDate: "2025-06-17"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリモバイル Backend チームでエンジニアリングマネージャーをしている [@k\_kinukawa](https://x.com/k_kinukawa)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の12日目の記事です。

2025年4月21日にメルカリモバイル開発チームでオフサイトミーティングを実施し、その中でAI Hackathonを開催しました。チーム内でのAI活用を促進することを目的とし、約20名のソフトウェアエンジニア・PM・QAエンジニアが参加しました。

## なぜAI Hackathonを実施したのか

メルカリモバイル開発チームでは、2025年3月に社内の生成AI開発ツールのPoCに参加する形でCursor、Devin、Gemini Code Assistのアカウントをソフトウェアエンジニアに付与し、積極的な活用を推奨していました。しかし、4月中旬の時点で実際の活用は十分に進んでいませんでした。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/be442f95-mobile-ogp-1024x538.png)

[メルカリモバイルは3月4日にローンチしたばかりの新サービス](https://about.mercari.com/press/news/articles/20250304_mercarimobile/ "メルカリモバイルは3月4日にローンチしたばかりの新サービス")で、やりたいこともやるべきことも山積している状況でした。一方で、生成AI開発ツールを取り巻く状況は日々ものすごいスピードで変化しており、忙しい中で最新の情報をキャッチアップして業務で活用するのはなかなかハードルが高い状況でした。

そんな中、エンジニアリングマネージャーの週次定例ミーティング内でAI Labs TeamのマネージャーからCursor bootcampを実施したという共有がありました。Cursor bootcampでは以下のような取り組みが行われたとのことです。

-   Cursorのリファレンスを読み合わせる（1時間）
-   各々、取り組むことを決めて個別に作業する（2時間）

結果として参加者間での知識レベルとCursorに対する期待値が揃い、Cursor活用や議論が活発になったとのことでした。

また、[PCP LLM Week](https://engineering.mercari.com/blog/entry/20250604-pcp-llm-week/)のような大規模な取り組みの話も耳にしていました。1週間という期間をかけて組織全体でAI活用に取り組むという非常に興味深い試みでしたが、メルカリモバイルの現状では同規模の時間を確保することは難しい状況でした。

これらの事例を参考に、現実的に実行可能な形でチームのAI活用を推進するために**1日という限られた時間で集中的にAI活用を体験する**オフサイトイベントを企画しました。  
普段の忙しい業務の中では断片的にしか触れないAIツールについて、まとまった時間を確保して一気にキャッチアップし、Hackathon形式で実際に楽しく手を動かして理解を深めることを目的としました。また、全員が同じタイミングで同じ体験をすることで、その後のチーム内での情報共有や議論の土台を作ることも狙いでした。

## オフサイトの実施内容

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/96ace9ec--2025-06-11-14.07.04-1024x766.jpg)

オフサイトミーティングは社外の貸し会議室を利用しました。  
参加対象者はソフトウェアエンジニアだけでなく、PM、QAエンジニアも含めました。  
当日までに参加者全員に対してCursorのアカウント発行とダウンロードを実施しました。

時間割は以下の通りです。

-   **午前**: アイスブレイク、相互理解セッション（偏愛マップ、ドラッカー風エクササイズ）
-   **午後前半**: AIキャッチアップセッション（0.5時間）
-   **午後後半**: AI Hackathon（2.5時間 + 発表1時間）

余談ですが、このオフサイトではAI Hackathonだけでなく、相互理解のためのセッションとして偏愛マップ、ドラッカー風エクササイズも実施しました。  
このセッションを通じて、チームメンバーのパーソナルな一面を知ることができたり、お互いの期待値のズレを認識することができたりと非常に有意義でした。

## AIキャッチアップセッション

Hackathonに入る前に、全員の認識を揃えるためのキャッチアップセッションを実施しました。  
事前に私が社内外の情報を取りまとめて、スライドで発表しました。  
内容は以下の通りです。

-   **組織目標の共有**: エンジニアリング組織として設定された重要な指標「全てのエンジニア100%が何らかのAIコーディングアシスタントツールを活用し生産性を高める」を改めて確認
-   **AIツール利用ガイドライン**: 社内におけるAIツールの基本的な利用方法が記載されたガイドラインの紹介、AIツールにどんな情報を入力してよいかの確認
-   **社内のCursor利用ガイドライン**: コードのindexingについての理解、.cursorindexingignoreファイルの理解
-   **MCP Serverとセキュリティ**: MCP Serverの説明、使用可能なMCP Serverの紹介、MCP Server利用時のセキュリティに関する注意点
-   **社内のAIに関する取り組み、活用事例紹介**: 社内で利用可能なAIツールとその活用事例の紹介、AI活用をしているプロジェクトの紹介
-   **社外の事例紹介**: 社外のAI開発ツール活用事例紹介

このセッションを通じて、メルカリ社員として社内業務でAI開発ツールを利用するために必要な基礎知識のキャッチアップと、AI開発ツールを使ってできることの認識を合わせることができました。

## AI Hackathon

2.5時間の時間を使って、各々が事前に準備したアイデアの実現に取り組みました。  
Hackathonを開催した4月末は、世の中的にMCP Serverが非常に注目されていたタイミングだったため、多くのメンバーがMCP Serverのセットアップとそれを活用したアイデアの検証にチャレンジしていました。  
私は以下のようなことに取り組みました。

1.  **MCP Serverセットアップ支援**
    
    -   PMとQAエンジニアに対して、CursorとMCP Server（Confluence、Jira、Figma）のセットアップをサポート
2.  **Terraform編集タスクをAIに任せる実験**
    
    -   あるメンバーへの権限付与タスクをCursorのAgentに依頼
    -   Terraformコードの変更からプルリクエスト作成まで、一切手動でコードを書かずに実施
3.  **自作MCP Server開発チャレンジ**
    
    -   Cursor Agentを使って、自作のMCP Server作成に挑戦（時間切れで未完成）

チームメンバーがチャレンジしたAIを使ったアイデアも一部紹介します。

-   MCP Server開発・活用
    -   Cursor と Jira、Figma、Confluence、Spanner、BQとのMCP Server 連携そその活用方法の模索
    -   Proto MCP Server 開発
    -   GitHub mermaid sequence diagram 生成
-   AI開発支援ツール活用
    -   AI Reviewer 作成
    -   Cursorでのリファクタリングとテスト 生成
    -   GitHub MCP Server 連携
-   デザイン・プランニング領域
    -   FigmaAI調査
    -   新機能のプランニング（1時間で設計からリソース計画まで作成）
    -   テキストからワイヤーフレーム作成
-   業務改善
    -   便利ツールの開発
    -   Test Case自動生成
    -   アンケート分析

私が今回のHackathonで最も印象的だったのは、PMがCursorとMCP Serverを活用して、メルカリモバイルの新機能プランニングに取り組んでいたことでした。  
Hackathonの最初、Cursorにメルカリモバイルの最新のソースコードを読ませMCP ServerでConfluenceに接続できる状態までサポートしたのですが、そこからたった1時間程度で新機能開発に関する仕様作成、主要開発項目の洗い出し、既存機能を踏襲した設計、開発・QA工数とスケジュール算出を行いました。もちろんこれを使っていきなり開発に入れるわけではないのですが、叩き台としては十分使えるものが作れてしまったことに本人含めて皆驚いていました。

## AI Hackathonを終えて

事後アンケートでは「CursorなどのAIツールをしっかり触る時間を取れて新しい技術をキャッチアップすることができてよかった」「業務から離れる時間を取ってAI活用にフォーカスする時間を取ることができて良かった」といった回答を頂きました。  
![](https://storage.googleapis.com/prd-engineering-asset/2025/06/654d7fac--2025-06-11-10.21.17-1024x409.png)  
↑は[DX](https://getdx.com/ "DX")というツールを使ってメルカリモバイルBackendチーム内のCursorによるline changesを集計したグラフです。4月21日以降、Cursorが日常的に活用されるようになったことが数字からも読み取れます。

また、チームのエンジニアによる[メルカリ内製MCP Server リポジトリ](https://speakerdeck.com/fumiyakume/cursorwo-dao-ru-dakeziyanaku-huo-yong-made-merukari2000ren-zhan-kai-noriaru?slide=8)へのコントリビュート（いくつかのサービスの追加）も行われました。

興味ある方は是非こちらも御覧ください。

-   [Sourcegraph × 自作MCP Serverによる社内コード検索連携の取り組み](https://engineering.mercari.com/blog/entry/20250609-4660151b47/)
-   [Cursorを"導入"だけじゃなく"活用"まで メルカリ2000人展開のリアル](https://speakerdeck.com/fumiyakume/cursorwo-dao-ru-dakeziyanaku-huo-yong-made-merukari2000ren-zhan-kai-noriaru)

現在ではCursorだけでなく、DevinやClaude Code Agentの利用も徐々に増えています。

## まとめ

今回のHackathonを通じて、以下のような学びがありました。

**1\. まとまった時間確保の重要性**

-   環境は整っていても、忙しい日常では新しいツールを試す時間が取れない
-   目的のために強制的に時間を確保することで、全員が「最初のハードル」を超え同じスタートラインに立てる

**2\. 全員参加による学習効果**

-   皆で一緒に作業することで、その場で疑問を解消できる
-   情報共有により全員の理解を一致させることができる
-   ソフトウェアエンジニア以外のメンバーも効果的にAI開発ツールを活用できる可能性を確認することができた

個人の自発的な学習だけでなく、組織として意図的に学習機会を創出することの有用性を実感することができました。これからも組織としてAI-Nativeになるための機会や仕組みを継続的に作っていきたいと思います。

一方で、日々のミーティングや業務の量を見直していくことで余裕が生まれ、日常的に新しいことにチャレンジできる状態も作り出せるのではないかと考えています。これは今後の大きな課題だと考えています。

明日の記事は@David, @anzaiで「[Building a Flexible Checkout Solution: Frontend Architecture for Multi-Service Integration](https://engineering.mercari.com/en/blog/entry/20250617-building-a-flexible-checkout-solution-frontend-architecture-for-multi-service-integration/ "Building a Flexible Checkout Solution: Frontend Architecture for Multi-Service Integration")」です。引き続きお楽しみください。