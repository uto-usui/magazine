---
title: "Snowflake World Tour Tokyo 2026 で登壇してきました"
source: "https://tech.layerx.co.jp/entry/snowflake-world-tour-tokyo-2026"
publishedDate: "2026-09-18"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://x.com/civitaspo)です。

2026年9月10~11日に開催された Snowflake World Tour Tokyo 2026 で、2つのセッションに登壇してきました。今回は、会場の様子と登壇した内容を紹介しようと思います。

Snowflake World Tour Tokyo は、Snowflake の最新技術や、企業によるデータ基盤の構築・AI 活用の事例を紹介する、Snowflake 主催のカンファレンスです。今年はグランドプリンスホテル新高輪 国際館パミールで2日間にわたって開催されました。 [www.snowflake.com](https://www.snowflake.com/ja/news/press-releases/snowflake-world-tour-tokyo-2026/)

登録人数は1万2000人超、144のセッションという、Snowflake 主催のカンファレンスでは国内最大規模のイベントです。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919083857.png)

Keynote は2日間ともクマ太郎のドラム披露から始まりました。

> 世界に一体しかいないらしい（という設定の）クマ太郎  
> MCが何もない状態のセットアップでシュールw[#SWTTokyo26](https://x.com/hashtag/SWTTokyo26?src=hash&ref_src=twsrc%5Etfw) [#Snowflake](https://x.com/hashtag/Snowflake?src=hash&ref_src=twsrc%5Etfw) [#DataSuperhero](https://x.com/hashtag/DataSuperhero?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/M0nB2PzD6a](https://t.co/M0nB2PzD6a)
> 
> — ｷｳﾞｨﾀｽﾎﾟ(人工知能) (@civitaspo) [2026年9月10日](https://x.com/civitaspo/status/2097852288249549190?ref_src=twsrc%5Etfw)

Keynote のメッセージは、AI Agent が業務を担う「Agentic Enterprise」の実現に向けて、分断されたデータやシステムを AI が活用できる状態にしていこう、というものでした。AI モデルを導入しても、社内のデータや業務のコンテクスト、仕事に使うアプリケーションがつながっていなければ、AI Agent は業務を進められません。これらを連携させ、適切な権限のもとで判断から実行まで行える環境を整えることが、AI を実際の業務成果につなげるために必要だと語られていました。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084204.png)

[Google Cloud 東京リージョンでの Snowflake の提供予定](https://www.snowflake.com/ja/news/press-releases/snowflake-google-cloud-tokyo-region-japan/)の発表もありました。開始時期は、2026年度第4四半期（2026年11月〜2027年1月）です。Google Cloud 上で Snowflake を使い、日本国内でデータを管理したい場合の選択肢が増えることになります。

[www.snowflake.com](https://www.snowflake.com/ja/news/press-releases/snowflake-google-cloud-tokyo-region-japan/)

Expo エリアには企業の展示ブースに加えて、Snowflake Community Hub という、ユーザー同士が交流し、コミュニティの活動を知るためのエリアもありました。Snowflake のユーザーコミュニティ「[SnowVillage](https://snowvillage.cloud/)」の紹介や、初心者向けの「Rookies Camp」によるデモなど、ユーザーが参加する企画が行われていました。 [snowvillage.cloud](https://snowvillage.cloud/)

Snowflake Data Superheroes のイラストが並ぶパネルもありました。その中に自分の姿もあるのは、やっぱり嬉しいものですね。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084311.png)

Snowflake Data Superheroes のパネルと一緒に記念撮影

また、[Snowflake Community Awards](https://www.snowflake.com/en/community-awards/) の「Open Source Impact」部門でファイナリストに選ばれていたこともあり、Community Hub では、ファイナリストとしての意気込みを語った私の動画が繰り返し流れていました。 [www.snowflake.com](https://www.snowflake.com/en/community-awards/)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084409.png)

Snowflake Community Hub で上映されていたファイナリストの紹介動画

Snowflake Community Hub で上映されていたファイナリストの紹介動画

## 2つのセッションで登壇しました

私は Snowflake World Tour Tokyo 2026 で、2つの登壇機会をいただきました。

### dbt Core と Snowflake で実現する多層的なデータガバナンス

1日目は、Snowflake Data Superhero として、DATA HERO THEATER で登壇しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084445.png)

DATA HERO THEATER での登壇の様子

データ基盤が成熟し、利用する部門や用途が増えるにつれて、統制の要求も多様化してきます。昨今は、人間に加えて AI Agent によるデータ利用も考える必要があります。このセッションでは、こうした要求に対して、dbt と Snowflake を使って多層的にデータを統制する取り組みを紹介しました。

Snowflake の機能だけでは、モデル間の参照関係や、加工後のデータへのポリシー適用まで統制するのが難しいため、dbt と GitHub を組み合わせて補完しています。Snowflake のデータ保護機能と、dbt 上で動く OSS などを使い、モデル依存関係、行レベル、列レベル、公開経路の4層の統制手段を、データ基盤の共通機能として提供しています。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084511.png)

これらの仕組みを通じて、データオーナーが、自分のデータを誰がどのように利用するのかをレビューできるようにしています。データの性質やリスクを理解しているデータオーナーが、利用の可否を判断し、統制責任を持てる状態を目指した設計です。

シアターセッションのため、アーカイブが公開されるかはわかりませんが、資料はすでに公開しています。ご興味のある方は、ぜひご覧ください。

[speakerdeck.com](https://speakerdeck.com/civitaspo/multi-layered-data-governance-powered-by-dbt-core-and-snowflake)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084602.png)

シアターセッションにも関わらず、多くの方が聴きに来てくださいました。ありがとうございました。

### Snowflakeを起点に、AI Agentが自律稼働し続ける未来へ

2日目は、AI Agent のためにデータ基盤をどう整えているかをお話ししました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084640.png)

当日予約制でしたが、満席のご予約を頂きました。当日お越しいただいた皆様、ありがとうございました。

伝えたかったのは、AI Agent の力を最大限発揮するために、データ基盤の基礎力を高めている、ということです。AI Agent が自律稼働し続ける未来に向けて、次の3点に取り組んでいます。

1.  **リアルタイムデータ収集とタイムトラベル**：最新のデータを取り込み、AI Agent が状況の変化に即応できるようにしています。また、過去のデータを再現してバックテストできる状態を整え、新しいモデルやプロンプトを評価できるようにしています。
2.  **非構造化データを含むコンテクスト集約**：AI Agent の意思決定には、数値や結果だけでなく、その背景や理由も必要です。構造化データに加えて、文書や会話などの非構造化データも集め、AI Agent が参照できる形で格納しています。
3.  **データ保護機能を用いた安全なデータ提供**：AI Agent に必要な情報をできるだけ広く提供するには、参照や操作を制御する環境（ハーネス）が必要です。そのために、多層的な統制手段を使い、データや利用目的に応じた、きめ細かなアクセス制御を提供しています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260919/20260919084714.png)

資料はすでに公開しており、セッションのアーカイブも Snowflake World Tour Tokyo 2026 のマイページにて公開されています。ぜひ資料とあわせてチェックしてみてください。 [speakerdeck.com](https://speakerdeck.com/civitaspo/driving-ai-agents-with-snowflake)

## We are hiring!

セッションを聞いてくださった皆さま、ありがとうございました！

バクラク事業部では、データエンジニアを募集しています。今回紹介したデータガバナンスや、AI Agent のためのデータ基盤づくりに興味がある方は、ぜひお話ししましょう。

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470)

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/2c0258fa624f4a25975bc59767a81225/)