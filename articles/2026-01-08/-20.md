---
title: "連載企画：メルカリ初の世界共通アプリ「メルカリ グローバルアプリ」の開発舞台裏"
source: "https://engineering.mercari.com/blog/entry/20251003-mercari-crossborder/"
publishedDate: "2025-10-06"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。Cross Border (XB) Engineeringの [@deeeeet](https://x.com/deeeet) です。

先日、2025年9月30日に越境取引事業の新戦略を発表し、メルカリ初の世界共通アプリ「メルカリ グローバルアプリ」（以下、グローバルアプリ）の提供を開始しました。  
そこで今回は、グローバルアプリの開発プロジェクトの開発舞台裏をご紹介する連載企画をスタートいたします。  
トピックはバックエンド開発のみではなく、モバイル開発、Web開発、SRE & Enablingなどなど多岐にわたるのでお楽しみに。

## 「メルカリ グローバルアプリ」の概要　

メルカリ初となる世界共通アプリで、 海外の購入者は「グローバルアプリ」を通じて日本の「メルカリ」と「メルカリShops」の商品を閲覧・購入することができます。言語や決済、複雑な手続きなどの課題が解消され、海外の購入者は日本の「メルカリ」と同様、かんたんかつ安心・安全にお買い物を楽しめます。2025年9月30日より台湾・香港で提供を開始し、今後、展開する国や地域を順次拡大する予定です。

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/d14b0526--1024x373.png)

## 公開予定表

こちらは、後日、各記事へのリンク集になります。

Title

Author

[グローバル展開にむけたアプリと基盤の再構築](https://engineering.mercari.com/blog/entry/20251007-a09afcd49b/ "グローバル展開にむけたアプリと基盤の再構築")

@deeeet

[グローバル展開を支える基盤の裏側](https://engineering.mercari.com/blog/entry/20251007-behind-the-infrastructure-powering-global-expansion/ "グローバル展開を支える基盤の裏側")

@yanolab

[From Local to Global: Building Seamless B2C Product Integration at Mercari](https://engineering.mercari.com/en/blog/entry/20251009-from-local-to-global-building-seamless-b2c-product-integration-at-mercari/ "From Local to Global: Building Seamless B2C Product Integration at Mercari")

@ahsun

[Order management in Mercari Global Marketplace](https://engineering.mercari.com/en/blog/entry/20251010-order-management-in-mercari-global-marketplace/)

@takady

[The Journey of User-Generated Content Translation](https://engineering.mercari.com/en/blog/entry/20251012-the-journey-of-user-generated-content-translation/)

@aymeric

[グローバルWebを支えるSREの裏側 — 開発を加速させるための改善アプローチ](https://engineering.mercari.com/blog/entry/20251013-behind-the-scenes-of-sre-supporting-the-global-web/)

@hatappi

[Toward a Global Identity Platform](https://engineering.mercari.com/en/blog/entry/20251014-toward-a-global-identity-platform/)

@gia

[開発者全員が書けるE2Eテスト ─ 普通のgo testで実現するテスト基盤](https://engineering.mercari.com/blog/entry/20251016-e2e-tests/)

@ryotarai

[グローバルなメルカリの検索バックエンド設計と検索基盤拡充](https://engineering.mercari.com/blog/entry/20251016-50fb7b8c1a/)

@shinpei

[Building a region‑aware, SEO‑friendly global web app](https://engineering.mercari.com/en/blog/entry/20251018-global-web-app/)

@gary

[モジュラモノリスの品質を支えるリーダビリティチーム ― AI時代のスケーラブルなコード管理](https://engineering.mercari.com/blog/entry/20251021-scaling-code-quality-modular-monolith-readability-team-ai-era/)

@osari.k

[How We Deliver Mobile App Updates Faster](https://engineering.mercari.com/en/blog/entry/20251022-how-we-deliver-mobile-app-updates-faster/)

@manoj

[Evolving Mercari’s iOS codebase into a multi-product monorepo](https://engineering.mercari.com/en/blog/entry/20251024-evolving-mercaris-ios-codebase-into-a-multi-product-monorepo/ "Evolving Mercari’s iOS codebase into a multi-product monorepo")

@shingt

[Enabling internationalization in our web Turbo monorepo](https://engineering.mercari.com/en/blog/entry/20251025-internationalization-in-web-monorepo/)

@gary

[The AI Lied to Me — And That’s When I Learned How to Use It](https://engineering.mercari.com/en/blog/entry/20251028-the-ai-lied-to-me-and-thats-when-i-learned-how-to-use-it/)

@andrei

[Taming Agents in the Mercari Web Monorepo](https://engineering.mercari.com/en/blog/entry/20251030-taming-agents-in-the-mercari-web-monorepo/)

@maxi

[BenchMarking Databases For Global APP](https://engineering.mercari.com/en/blog/entry/20251117-benchmarking-databases-for-global-app/)

@amit

[Behind the Global Launch: Decoding the Android Engineering Strategy for Our New App](https://engineering.mercari.com/en/blog/entry/20251120-behind-the-global-launch-decoding-the-android-engineering-strategy-for-our-new-app/)

@Karthi

[Data-fetching strategy for Mercari Global Marketplace Web App](https://engineering.mercari.com/en/blog/entry/20251120-data-fetching-strategy-for-mercari-global-marketplace-web-app/)

@vb

TBD: How we overcome Project management challenges (How to plan a product launch in 6 months)

@g-bansal

Guest post from FT payment platform — Engineering for Multi-Currency and Multi-Provider Payments

@ryuyama

TBD

@manas

TBD: distributed transactions on checkout flow, specially error handling, retry

@ahsun

Something about global payment and checkout

@huhu

TBD: Ops development with AI

@waiting.lau

Sync Saga

@Shishir

TBD: High output teams

@Atif

TBD: Ordering Features

@Shreyasi

TBD

@Chong (チョン)

TBD

@chris

ひとつでも気になる記事がある方は、この記事をブックマークしておくか、 [エンジニア向け公式X](https://x.com/mercaridevjp "エンジニア向け公式X") をフォロー＆チェックしてくださいね！