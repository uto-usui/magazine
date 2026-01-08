---
title: "メルペイ インターンでの挑戦と学び：EGP Cardsと向き合った3ヶ月間"
source: "https://engineering.mercari.com/blog/entry/20251225-building-egp-cards-at-merpay/"
publishedDate: "2025-12-25"
category: "engineering"
feedName: "Mercari Engineering"
---

## メルペイ インターンでの挑戦と学び：EGP Cardsと向き合った3ヶ月間

こんにちは。メルペイのGrowth Platformでフロントエンド・エンジニアとしてインターンをしている[@Yusaku](https://x.com/pkmiya__)（宮田 優作）です。  
この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の25日目の記事です。  
私は2025年10月からインターンを開始し、今月で3ヶ月目になりました（図1）。  
この記事では、インターン期間中に取り組んだタスクと得た学びについて紹介します。  
![図１：オフィスで撮影した私の写真](https://storage.googleapis.com/prd-engineering-asset/2025/12/cf971c51-img_selfie-mercari-landscape.png)  
図１：オフィスで撮影した私の写真

## チームについて

私が所属する Growth Platform Frontend チームは、Engagement Platform（通称EGP）という社内向けマーケティングツールを開発しています。  
このツールを使うことで、マーケターや プロジェクトマネージャーは、ポイントやクーポンなどのインセンティブ配布、ランディングページ（LP）の作成・公開、キャンペーン作成といった CRM業務をコーディング不要で簡単に行うことができます（図2）。

![図2：EGPのノーコードエディタ（EGP Content）](https://storage.googleapis.com/prd-engineering-asset/2025/12/20251225-building-egp-cards-at-merpay_fig-2.jpg)  
図2：EGPのノーコードエディタ（EGP Content）

今回のインターンではEGP Cardsという機能の向上に取り組みました。EGP Cardsは、Web・iOS・Androidのクロスプラットフォームで利用できるカード型のコンポーネントを作成・公開する機能です。  
EGP Cardsは、いわゆるWebページのエディタ機能（EGP Pages）とは異なり、サーバがUIの構造を返却するというServer Driven UIアーキテクチャを採用しています。エディタ上で作成されたコンポーネントのコンテンツはJSONファイルとして保存され、各プラットフォームで共通のUIとして描画されます（図3）。  
Server Driven UIとEGP Cardsのアーキテクチャについては、同じくGrowth Platformチームの@togamiさん、@Stefanさんの記事をそれぞれご覧ください。

-   [WYSIWYGウェブページビルダーを支える技術とServer Driven UIへの拡張](https://engineering.mercari.com/blog/entry/20241210-f7c478382a/)
-   [Supercharging User Engagement: How Mercari is Using Server-Driven UI to Reduce Time-to-Market](https://engineering.mercari.com/en/blog/entry/20251214-supercharging-user-engagement-how-mercari-is-using-server-driven-ui-to-reduce-time-to-market/)

![図3：EGP Cardsの編集画面](https://storage.googleapis.com/prd-engineering-asset/2025/12/20251225-building-egp-cards-at-merpay_fig-3.jpg)  
図3：EGP Cardsの編集画面

## タスク1 – Dry Run for EGP Cards

### タスク概要：Dry Runとは？

Dry Runとは、変数を設定し、そこにデータを挿入することで、状態をエミュレートできる機能のことです。これにより、API呼び出しを記述したり実機で動作確認を行ったりする前に、コンテンツの挙動を確認することができます。  
このタスクでは、EGP CardsでDry Run機能を利用できるようにする実装を行いました（図4）。

![図4：今回実装した、EGP CardsのDry Run機能](https://storage.googleapis.com/prd-engineering-asset/2025/12/20251225-building-egp-cards-at-merpay_fig-4.jpg)  
図4：今回実装した、EGP CardsのDry Run機能

### 動作の仕組み

Dry Run機能は、以下の流れで動作します。

1.  利用者がDry Runを有効化し、フィールドにモックデータを入力する
2.  エディタが構造ツリーを再帰的に走査し、動的にJavaScriptのコードを評価して変数を値に置換する
3.  置換された値がキャンバス上に表示される

### 実装の流れ

以下の流れで実装を進めました。

1.  EGP Pagesに既に実装されていたDry Run機能について、コードリーディングやロギングを行い、実装ロジックを理解する
2.  EGP Cards特有の仕様を理解した上で、同様に利用できるDry Run機能を実装する

コーディングの際には、EGP PagesとEGP Cardsで共通利用できそうな処理を探し、適度にファイルを切り出すことで、可読性・保守性を意識した実装を心がけました。

## タスク2 – Content Agent Improvement for EGP Card

### 背景：Content Agentの課題

EGPのノーコードエディタ（EGP Content）は、CardsのほかにもPagesやE-mailsなど、複数の種類のコンテンツを扱うことができます。  
また、EGP ContentにはAIエージェント（通称 Content Agent）が導入されており、対話を通じてコンテンツの要約や書き換えを行うことができます（図5）。  
一方で、当時のContent Agentは、コンテンツ種別ごとのエディタ仕様を十分に理解していないという課題がありました。その結果、UIが崩れたコンテンツを生成してしまい、利用者の期待通りのアウトプットを提供できない可能性がありました。

![図5：Content Agentの会話処理パイプライン](https://storage.googleapis.com/prd-engineering-asset/2025/12/20251225-building-egp-cards-at-merpay_fig-5.jpg)  
図5：Content Agentの会話処理パイプライン

### 実装の流れ

この課題を解決するため、以下の流れで実装を進めました。

1.  EGP Cardsの仕様やデータ構造を記述したプロンプトを作成する
2.  作成したプロンプトを、Content AgentのAgent Layerで条件付きで注入する

EGP Cardsには、メディアクエリに対応していないことや、すべての要素がFlexで構成されていることなど、いくつかの制約があります。これらの制約や期待される出力をプロンプトに明示することで、Content AgentがCardsに適したコンテンツを生成できるようにしました（図6）。

![図6：EGP CardsでContent Agentを利用する様子](https://storage.googleapis.com/prd-engineering-asset/2025/12/20251225-building-egp-cards-at-merpay_fig-6.jpg)  
図6：EGP CardsでContent Agentを利用する様子

## 学んだこと

### チーム開発におけるアウトプットの出し方を学んだこと

Dry Run 機能の実装を通じて、チーム開発におけるアウトプットの出し方について多くの学びがありました。実装の正しさや機能の完成度だけでなく、Pull Request（PR）の切り方やレビューの受け方が、チーム全体の開発効率や生産性に大きく影響することを実感しました。  
具体的には、バグ修正やリファクタリングであっても、PRのサイズが大きくなりすぎる場合やタスクのスコープ外に及ぶ場合には、別のPRとして切り出すことでレビューコストを抑えられることを学びました。また、コードやPRコメントには、なぜその実装にしたのか、どのような選択肢があり、何をしない判断をしたのかといった実装意図を明示することが重要です。これにより、レビュワーとの認識齟齬を防ぎ、建設的なレビューにつながると感じました。  
レビューを受けた際にも、指摘内容をすぐに修正として反映するのではなく、まずはレビュワーの意図を正しく理解することが重要です。場合によっては背景や前提条件をすり合わせた上で議論することで、より良い設計や実装にたどり着けることを学びました。これらの経験を通じて、個人としてコードを書く力だけでなく、チームで価値を届けるためのコミュニケーションや姿勢の重要性を強く認識しました。

### メルカリカルチャーを実体験として理解できたこと

メルカリでは、情報の透明性やフラットな意思疎通によって、個人に大きな裁量が与えられていると言われることが多いです。実際にインターンを通じて、その点を強く実感しました。一方で、個人的に特に印象に残ったのは、英語を前提としたグローバルな開発環境です。  
これまで参加してきたインターンはすべて日本語環境だったため、ドキュメントやコミュニケーション、議論の場がすべて英語になる経験は非常に新鮮でした。グローバルなチームである以上、英語でのスムーズな意思疎通が求められることは理解していましたが、実際に業務の中でそれを実践し、議論や開発を進められたことに大きなやりがいを感じました。  
実際の業務では、英語で書かれたREADMEや仕様書を読み込んだ上でPull Requestを作成し、設計意図や懸念点を英語で説明・議論しました。認識の齟齬を防ぐため、必要に応じて日本語での補足も行いながら、主体的にコミュニケーションを取ることを意識しました。この経験を通じて、メルカリのカルチャーは単なるスローガンではなく、日々の業務に根付いたものだと感じました。

### 技術的挑戦を通じて、学びの広がりを再認識できたこと

これまで私は、フロントエンドを主な技術領域として、インターンや個人開発に取り組んできました。そのため、フロントエンド領域における学びは、徐々に頭打ちになりつつあるのではないかと感じていました。  
しかし、EGPというツールに触れたことで、その考えは大きく変わりました。EGPは非常にインタラクティブでリッチなUIを持つだけでなく、その裏側では、ノーコードによるコンテンツの作成・配信の仕組みや、安全かつ効率的にAI Agentとやりとりを行うための設計など、複雑で奥深いロジックが支えられていることを知りました。  
タスクでは、ある程度抽象度のある状態で要件を受け取り、自分で具体的な実装タスクへ分解した上で設計・実装を進めました。また、EGPの使い方をキャッチアップしている最中に、イメージのプレビュー機能があることで利用者体験が向上するのではないかといった改善提案も行いました。  
さらに、Content Agentの改善では、今回のCards向け実装に閉じることなく、将来的にPagesやE-mailsなど他のContent typeにも展開しやすいよう、Typeごとにプロンプトを切り出す設計とし、可読性や拡張性を意識しました。エンジニアがプロダクトの将来を見据えて設計・実装することが、利用者体験の向上や業務効率化につながり、結果として事業価値に直結する点は、メルカリならではの魅力だと感じています。

## おわりに

今回のインターンでは、EGP Cardsという機能の向上に取り組みました。インターンを通じて、技術的なスキルだけでなく、プロダクトの価値やチームとの関わり方を含めてエンジニアリングに向き合う姿勢を学ぶことができました。  
実務を通して得たこれらの学びを、今後の開発や自身の成長につなげていきたいと考えています。最後までお読みいただきありがとうございました。