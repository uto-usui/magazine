---
title: "メルペイにおけるAI活用の取り組み"
source: "https://engineering.mercari.com/blog/entry/20250602-merpay-ai-utilization/"
publishedDate: "2025-06-02"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルペイVPoEの[@keigow](https://x.com/keigow)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の初日の記事です。

これまでもメルペイ及びメルカリグループでは、社内向けChatGPTとも言える[Ellie](https://careers.mercari.com/mercan/articles/49488/)の取り組みや、LLMをプロダクトや業務効率化に活かすためのハッカソンイベント[ぐげん会議](https://careers.mercari.com/mercan/articles/39144/)の開催、プロダクトへのLLM利用も含め、AI/LLMの活用を推進してきました。

AI/LLMの進化のスピードは想像以上に早く、毎日のように新しいアップデートがあります。最近ではこれまで以上にAI Nativeな組織、プロダクトに生まれ変わっていくべくさまざまな取り組みを進めており、その一部をご紹介できればと思います。

## AI Coding Assistant Toolの活用

元々2023年の6月に[GitHub Copilot](https://github.com/features/copilot)の利用を開始し、社内での利用も徐々に増えていましたが、[Cursor](https://www.cursor.com/)の利用開始に伴い、社内での活用が大きく進みました。現在CopilotとCursorだけでも、Engineering組織全体の約8割のメンバーが利用しています。またCoding Agentとして[Devin](https://devin.ai/)の利用も広がっています。

![Cursor Active User](https://storage.googleapis.com/prd-engineering-asset/2025/05/ba681d76-cursor-active-user.png)

Engineering組織としても今QのOKRの中で一番重要なKR1として、全てのエンジニアが100%何らかのAI Coding Assistant Toolを活用し、生産性を高めることを目標に設定しました。生産性を計測する仕組みとしてこれまで社内では独自で[Four Keys](https://cloud.google.com/blog/ja/products/gcp/using-the-four-keys-to-measure-your-devops-performance?hl=ja)などを取得していましたが、新たに[DX](https://getdx.com/)を全社で導入しました。こちらの詳細については17日目のntkさんの記事で紹介予定です。

目標の設定と全社員向けにツールを提供する予算の確保、世の中の盛り上がりも相まって急速に導入が進み、各チーム単位でAI活用のオフサイトを実施したり、一週間Vibe Codingのみの期間を設定するなど社内でも盛り上がりを見せています。それぞれのイベントについての取り組みの様子も今後の記事で紹介予定なので、ぜひ御覧ください。

## MCPサーバによる社内ツール連携

[Model Context Protocol](https://modelcontextprotocol.io/introduction)(MCP)を活用した社内ツールの連携も急速に進んでいます。MCPサーバについてはセキュリティの観点から安全性が確認されているものを活用するため、社内でMCPサーバの実装をまとめたRepositoryが作られています。JIRA、Confuluence、Slack、Google Driveを始めとした3rd Party製のツールや、内製のMicroservicesの管理ツール、Google SpannerやBigQueryなどのMCPサーバが作られ、Cursorなどを利用して主にLocal環境で活用されています。これらのツールの利用者はエンジニアに限らないため、さまざまな職種のメンバーが自身の業務に合わせてツールの活用方法を検討するようになりました。

並行して各ツール自体にもEmbedされたAI Chat機能が導入されてくるようになっているため、今後もベストプラクティスの検討をしていきます。MCPサーバの活用については7日目のseitauさんの記事でも触れられる予定です。

## Merpay AI Labsの取り組み

業務フローの改善におけるAI/LLMの活用を推進するため、メルペイにはAI Labsという専門のチームがあります。

日毎にアップデートされるモデルやツールの進化に合わせて、各チームでのAI活用ニーズが増すなか、AI活用による業務フローの改善を進めたいが、どのように進めればよいのかわからないといった声を聞く機会が増えてきました。

実際に部署内で行われている業務のフローは複雑かつ、ステークホルダーも多く、さまざまな課題があったとしても、それが業務フローを改善すべき問題なのか、単にシステム化をすればいいだけなのか、あるいはAIを活用することで大きなアウトカムを埋める領域なのかの判断自体も難しいという問題がありました。

Engineeringの部署としてもそれをサポートし、AI活用を推進することが組織としてのインパクトが大きいと考え、今年の1月に改めてチームのMissionやVisionを設定しました。以下は抜粋になりますが、会社全体のAI推進を行うことをMissionとして定義しています。

> **Mission**
> 
> -   AI LabsはFintechのAI活用と開発をEnable/Driveします。AI Labsはそのための、実践者であり、伝道者であり、触媒になります。
> -   FintechにおけるAI Nativeなアプリケーション開発/業務設計のCenter of Excellence（中核となる組織）としての能力を確立し、AI Nativeな事業推進に貢献します。

このチームで取り組んだプロジェクト例としては以下のようなものがあります。成果が出たもの出なかったものなど含め、結果はさまざまですが、着実に知見を貯めることができていると思います。

-   コンセプトからのアプリのデザインの自動生成
-   仕様からのQAのテストケースの自動生成
-   画像生成AIを用いたキャンペーンのキービジュアル生成
-   お客さま問い合わせの要因分析
-   専門チームの問い合わせ工数削減のための対応効率化Botの作成

画像生成の例  
![メルカード画像](https://storage.googleapis.com/prd-engineering-asset/2025/05/e5884c17-image38.png)

特にアプリのデザインの自動生成については、現在進行系で面白い取り組みになってきています。こちらは18日目のhiroさんの記事で詳細をご紹介予定です。

## おわりに

これまで取り組みの一部をご紹介してきましたが、世の中の盛り上がりと勢い同様に、社内でも各チーム、各メンバーが次々と新しくAI活用に取り組み、さまざまなツールが作られるという状況が続いており、その全てを把握することも困難な状態になっています。キャッチアップだけでも大変な時代になってきましたが、この熱狂の中で仕事に取り組めていることは幸せな状況だなと感じており、この目まぐるしい変化を楽しんでいければと思います。

明日の記事はbenさんによる「[Rethink Tool’s UI/UX – Human-Centric to AI-Driven](https://engineering.mercari.com/en/blog/entry/20250527-rethink-tools-ui-ux-human-centric-to-ai-driven/ "Rethink Tool's UI/UX - Human-Centric to AI-Driven")」とutaさんによる「[メルペイインターン体験記：実務の中での学びと気付き](https://engineering.mercari.com/blog/entry/20250529-f73ce3fe90/ "メルペイインターン体験記：実務の中での学びと気付き")」の2本です。引き続きお楽しみください。