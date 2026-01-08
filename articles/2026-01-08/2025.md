---
title: "2025年のメルペイの取り組みを振り返って"
source: "https://engineering.mercari.com/blog/entry/20251201-looking-back-merpay-initiatives-in-2025/"
publishedDate: "2025-12-01"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルペイVPoEの[@keigow](https://x.com/keigow)です。  
この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の1日目の記事です。

2025年も色々なことがありました。年末ということで、2025年にメルペイとして、或いはメルカリグループとして取り組んだことをこの機会に振り返られればと思います。

## mercari GEARS 2025

11月13日に「メルカリエンジニアリングの今」をテーマにテックカンファレンスを開催しました。リアルな場でのイベントは実に7年ぶりの開催となりましたが、社内外含め沢山の方にご来場いただき、盛り上がることができました。キーノートを始めとして各発表の[スライド](https://speakerdeck.com/mercari)や[動画](https://www.youtube.com/playlist?list=PLgznQFGqsAWD4Amf_scEA8XwIfg25aLu7)も公開されておりますので、ぜひ御覧ください。

![mercari GEARS 2025](https://storage.googleapis.com/prd-engineering-asset/2025/11/d0cf5413-gears-scaled.jpg)

## AIによって進化する開発

ちょうど半年前に同じくブログの連載企画で[メルペイにおけるAI活用の取り組み](https://engineering.mercari.com/blog/entry/20250602-merpay-ai-utilization/)についてご紹介しました。当時は[Claude Code](https://www.claude.com/product/claude-code)が流行り始めたぐらいだったことを考えると、凄い速度の変化が起きていると改めて感じます。当時はエンジニアのAI Coding Toolの利用率を追いかけていましたが、今ではほぼ全てのエンジニアが何らかのAI Coding Toolを利用するようになりました。

グループ全体として大きな取り組みとなったのは、[こちらの記事](https://careers.mercari.com/mercan/articles/53708/)でも取り上げているAI Task Forceです。目標としてAI Nativeな会社を目指し、エンジニアの部署に限らず、カスタマーサービスやマーケティングなど全社33の部署を対象に、専任のエンジニアを含めた100名規模の組織を組成し、業務の棚卸しと、AI Nativeなワークフローとはそもそもどうあるべきかを考え、見直しを行っています。まだ道半ばではあるものの、各部署でロードマップを作成し、着実に成果が出てきています。

![AI Task Force](https://storage.googleapis.com/prd-engineering-asset/2025/11/99f9724d-ai_task_force.png)

## Project Double

AI Task Forceの活動と並行して、メルペイにVPoE Officeという新しい箱を作り、AIによる生産性向上の取り組みとしてProject Doubleをスタートしました。その名の通り生産性を2倍にしようという取り組みで、当時一部のエンジニアたちが行っていたAgenticなCoding手法を、Agent Spec Driven Development（ASDD）として標準化することで誰もがそれを利用可能にしようとする試みです。

![Overview of ASDD](https://storage.googleapis.com/prd-engineering-asset/2025/11/6e5dae32-asdd.png)

初期はBackendのみを対象としたProjectでしたが、7-9月の四半期で一定の成果を出すことができたため、その範囲をClientの開発、Backend/ClientそれぞれのQA領域、仕様書や設計などのPlanning領域へと広げることを決めました。また対象となるCompanyもFinTechの一部のPilot Projectから、グループ全体へと広がり、現在はEngineeringの中でも最優先の取り組みとして進行しています。

内容の詳細や得られた学びについてはこのProjectをリードしているnakai-sanの記事をご確認ください。

[pj-double: メルカリの開発生産性向上に向けた挑戦 — AI-Native化が辿り着いたASDDとプロセス変革の全貌](https://engineering.mercari.com/blog/entry/20251201-pj-double-towards-ai-native-development/ "pj-double: メルカリの開発生産性向上に向けた挑戦 — AI-Native化が辿り着いたASDDとプロセス変革の全貌")

## Project Doubleが実現した世界で

Agentic Codingの推進において、乗り越えるべき課題は精度やイテレーションにかかる時間などたくさんありますが、日々起きるモデルの進化やツール、環境の整備によっていずれ問題としては解決されていくと思っています。

一方で、1人のエンジニアが企画から設計、開発、テスト、リリースまでを一貫して行える世界が来たときに備えて、いくつか解決しなければいけない部分もあります。オンコール体制の整備、問い合わせ対応などの運用業務の最適化など、Agentic Codingが中心となった時代に最適な組織設計です。こちらについては一定の仮説はあるものの、まだ明確な応えが見えていない領域であり、Project Doubleの推進と合わせてトライアルをしていきたいと思っています。

## しゃべるおさいふ

AIの活用はEngineeringだけでなく、プロダクトへの活用もPoCという形でトライしています。メルペイで現在取り組んでいるのがこちらの「しゃべるおさいふ」という機能で一部のお客さまを対象に試験的に導入しています。

![Osaifu](https://storage.googleapis.com/prd-engineering-asset/2025/11/889504b5-osaifu.jpg)

内容は非常にシンプルで、利用データを元にAIがコメントをしてくれるという機能です。ちょっとした日常の利用に対してコメントを貰えるというのは思ったよりも嬉しい体験で社内テストは想定していたよりも好評でした。そこまで複雑な機能では無いものの、コストの観点や安全性、倫理的な観点も含め、AIをプロダクトで活用するとはどういうことなのか、という学びを得ることができました。12/20のkobaryo-sanの記事ではこちらの機能のバックエンドの設計について紹介する予定なのでお楽しみに。

[LLMを用いたおしゃべり機能「しゃべるおさいふ」のバックエンド設計](https://engineering.mercari.com/blog/entry/20251219-f15f686553/ "LLMを用いたおしゃべり機能「しゃべるおさいふ」のバックエンド設計")

## 開発合宿

1月の事になりますが、数年ぶりにメルペイで一泊二日の開発合宿を行いました。普段業務に追われて取り組めないような新しい技術へのチャレンジ、OSSの開発、やりたいと思っていた新機能の開発などに取り組みました。この開発合宿をきっかけとして、[有志による開発プロジェクト](https://careers.mercari.com/mercan/articles/54652/)がスタートし、実際にリリースまでつながることもありました。コロナ禍で普段直接顔を合わせることが少なくなっていたエンジニア同士のコミュニケーションの機会にもなり、参加してくださった皆様の満足度もかなり高かったので、また来年もトライできればと思っています。

![Development Camp](https://storage.googleapis.com/prd-engineering-asset/2025/11/80898002-development_camp-scaled.jpg)

開発合宿の様子はMercari GearsのYouTubeに動画も上がっているので、気になった方はぜひご覧いただければと思います。

## おわりに

今年は全社のテーマとしてAI Nativeを掲げ、Engineering組織としてもAI中心の一年となりました。半年前も同じようなことを書いた気がしますが、目まぐるしい変化の中で働けることを楽しんでいます。

明日の記事はその中でも中心的な取り組みとなる、nakaiさんによる「pj-double: メルカリの開発生産性向上に向けた挑戦 — AI-Native化が辿り着いたASDDとプロセス変革の全貌」です。引き続きMerpay & Mercoin Advent Calendarをお楽しみください。