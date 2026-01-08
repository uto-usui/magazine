---
title: "【mercari GEARS 2025】MECHANISM Stageのセッションをご紹介"
source: "https://engineering.mercari.com/blog/entry/20251010-mercarigears2025-mechanism-stage/"
publishedDate: "2025-10-10"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは！メルカリ Engineering Office の [@mikichin](https://x.com/chida_miki "@mikichin") です。  
来る11月13日、メルカリグループのテックカンファレンス「mercari GEARS 2025」が開催されます！

2018年に実施した「Mercari Tech Conf 2018」から7年の時を経て、久しぶりのオフラインでの開催となります。  
テーマは「メルカリエンジニアリングの今」。  
今年の全社的なテーマでもある「AI-Native」についてはもちろん、2018年以降メルカリグループのエンジニアリングがどのように変化してきたかを、技術・組織・カルチャーの観点からご紹介します。  
オンライン配信はありませんので、ぜひ会場でご自身の目と耳で確かめてください！！

会場は、メルカリのエンジニアリング組織における信念や行動の基盤となる共通認識を明文化した「Mercari Engineering Principles」をモチーフにした「PASSION Stage」「GROW Stage」「MECHANISM Stage」の3つのステージがあります。

本記事では、「MECHANISM Stage」のセッションをご紹介！  
まだ申し込みをされていない方も、興味のあるセッションがあるはずです。お申し込みは[こちらから](https://www.eventbrite.com/e/mercari-gears-2025-tickets-1637585555479 "こちらから")お願いします。

### 13:00 – 13:20　メルカリハロでのLLM活用

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/df42ca46-ogp_mechanism-1_ja-1024x538.png)

メルカリハロはスキマバイト領域におけるメルカリの新規事業です。2024年の3月にサービスがローンチされて以来、成長を続けており、先日登録者数1200万人を突破しました。

メルカリハロのMLチームはサービスローンチから約半年が経過した2024年10月のタイミングで始動し、以来、AI/MLを用いた多くのプロダクト改善に取り組んできました。

本セッションではその中でも特にメルカリハロのLLMを用いた機能やそれらを支えるLLMOps基盤について紹介を行います。具体的にはLLMを用いた求人の自動作成機能である「かんたん求人作成」やLLMを用いた求人の掲載前リスク予測等についてです。メルカリハロでは既に多くのLLMを用いた機能をリリースしており、用途の異なる50種類以上のプロンプトを本番で運用しています。そのためプロンプトの品質を管理するためのLLMOps基盤も非常に重要です。

本セッションを通して、メルカリハロでLLM実装を進める中で得られたLLMのプロダクト実装のための勘所や、プロンプト管理・自動評価基盤などの実践的なLLMOpsのためのTipsといった知見を共有できればと思います。

### 13:30 – 13:50　FastlyからCloudflareへ 100%移行を達成したMercariのアプローチ

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/2f89dc7c-ogp_mechanism-2_ja-1024x538.png)

メルカリでは、2023年よりCDNプロバイダーをFastlyからCloudflareへ段階的に移行を開始し、2025年現在、移行が完全に完了しました。  
このセッションでは、安全かつスムーズに移行を進めるために実施したアプローチと、その過程で得た学びを共有します。  
CDN プロバイダーの比較ではなく、移行プロセスを主に話すため、CDNプロバイダーの変更を考えていない方にも、移行に関する考え方やプロセスのヒントを持ち帰っていただけると考えています。

### 14:15 – 14:35　The Invisible Backbone: AI-Native Observability for Modern Platforms

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/9d241e46-ogp_mechanism-3_en-1024x538.png)

もし、自動で設定され、変化にもシームレスに適応し、多すぎるアラートのノイズを一掃してくれるオブザーバビリティがあったら？本セッションでは、メルカリがどのようにAI-Nativeなプラットフォームを構築し、設定不要のモニタリング、一貫した可視性、そしてAI活用型のアラートを標準機能として実現したのかをご紹介します。

信頼性が高く開発者にやさしいクラウドプラットフォームの未来を、自律型オブザーバビリティがどのように形作るのか。ぜひご参加のうえ、その目でご覧ください。

### 14:35 – 15:05　Running 1000 End-To-End Web Tests Daily

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/68f5950d-ogp_mechanism-4_en-1024x538.png)

Mercari USでは非常に多くの E2E Webテスト を実行していますが、それらを素早く、かつ本当に役立つテストにすることが大きな課題となっています。本セッションでは、プルリクエストごとにテストを実行する、新しいテストを追加する、各機能領域を対象にしたテストを実行するなど、私たちが行っている工夫をご紹介します。毎日何千件ものE2Eテストをどのように回しているのかを知りたい方には、まさにぴったりのセッションです。

### 15:15 – 15:35　Mercari’s Internationalization Journey

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/8bb9742c-ogp_mechanism-5_en-1024x538.png)

この2年間、私たちは海外のお客さまがメルカリのマーケットプレイスで商品を購入することを可能にしてきました。  
本セッションでは、プロダクトを海外展開していくための道のりを、とくにユーザー生成コンテンツ（UGC）の翻訳に焦点を当ててご紹介し、翻訳コストを100分の1に削減するうえでLLM（大規模言語モデル）がどのように役立ったかについてもお話しします。

### 16:00 – 16:20　EGP – Mercari’s CRM Platform: Built Once, Powering Many

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/276f4570-ogp_mechanism-6_en-1024x538.png)

もともとシンプルなハードコードのCRMとして生まれたEGPは、マーケター向けのスケーラブルでUI主導のプラットフォームへと進化してきました。システムが拡大するにつれ、とりわけEGPの利用規模が大きくなると、その複雑さが使いやすさや運用面での課題を引き起こすようになりました。本セッションでは、私たちがシステム設計やAI活用によるUI改善を通じてこれらの課題にどのように取り組んできたのか、そしてその過程でどのような学びを得たのかを共有します。

### 16:30 – 16:50　Securing the Future of Workflow Automation and AI Agents

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/d89e574e-ogp_mechanism-7_en-1024x538.png)

企業がワークフローの自動化やAIエージェントを積極的に活用するにつれ、孤立したシステム、過剰な権限を持つエージェント、複雑に絡み合った権限モデルといった新たなリスクが生じています。本セッションでは、これらの課題をどう解決し、自動化とAIが持つ潜在能力を安全かつ最大限に引き出す方法を探ります。さらに、セキュアでスケーラブルな導入を実現しつつ、ユーザーが安心してイノベーションに取り組めるようにするための実践的なアプローチをご紹介します。

### 17:00 – 17:20　AI/LLMが拓くデータ活用の新時代：人間とデータ分析AI エージェントが協業する分析基盤へ

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/49b455af-ogp_mechanism-8_ja-1024x538.png)

私たちは、自然言語での対話を通じてデータ分析を行えるAIエージェント「Socrates」を開発・提供しています。Socratesの登場は、SQLクエリの生成から実行、結果の可視化や解釈までを誰でも簡単に実行できるような変革をもたらし、データ活用のハードルを大きく下げました。本セッションでは、Socratesが誕生した背景やSocratesを支える技術、そしてAIとの協業によってもたらされるデータ活用体験の未来像についてお話しします。

「mercari GEARS 2025」のお申し込みは[こちらから](https://www.eventbrite.com/e/mercari-gears-2025-tickets-1637585555479 "こちらから")。  
また、その他のセッション紹介は下記をご確認ください。  
PASSION Stageのセッション紹介は[こちら](https://engineering.mercari.com/blog/entry/20251008-mercarigears2025-passion-stage "こちら")。  
GROW Stageのセッション紹介は[こちら](https://engineering.mercari.com/blog/entry/20251009-mercarigears2025-grow-stage "こちら")。

## イベント詳細

開催日時：  
2025年11月13日（木） 11:00-18:00

概要：  
mercari GEARS 2025は、メルカリグループのエンジニアリング組織の技術への挑戦と、カルチャーを体感する技術イベントです。  
本イベントは、単なる情報伝達の場ではなく、エンジニアたちが出会い、経験を共有し、交流を通じて新たな機会が生み出されることを目的としています。

参加費：無料  
会場：TODA HALL & CONFERENCE TOKYO  
参加方法：こちらの[ページ](https://www.eventbrite.com/e/mercari-gears-2025-tickets-1637585555479 "ページ")にてお申し込みください。  
【[公式サイト](https://gears.mercari.com/ "公式サイト")】

本イベントに関する追加情報があれば、随時 [@MercariGears](https://x.com/MercariGears "@MercariGears") でお知らせしますので、気になる方はぜひフォローをお願いします。