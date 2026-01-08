---
title: "チェックアウトソリューションのバックエンドアーキテクチャ"
source: "https://engineering.mercari.com/blog/entry/20250606-7afd82e718/"
publishedDate: "2025-06-09"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルペイ Payment Coreチームの [@susho](https://x.com/susho0220) です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/ "Merpay & Mercoin Tech Openness Month 2025") の6日目の記事です。

我々のチームでは、メルペイにおける各決済手段に応じた決済処理を提供しています。今回、新しくチェックアウトソリューションという、決済処理の実装と画面を一括で提供するソリューションを提供することにしました。 ( [Stripe Checkout](https://stripe.com/jp/payments/checkout) の内製版のようなものをイメージしてもらえると良いと思います。)  
詳細は [決済基盤の新たな挑戦: 決済チェックアウトソリューションの開発](https://engineering.mercari.com/blog/entry/20250605-bf42ce60cf/) をご参照ください。

この記事では、そのソリューションのバックエンドに着目し、アーキテクチャを紹介したいと思います。

## これまでの課題

これまでメルカリグループでは、決済処理が必要な新規サービスを立ち上げる際、提供する決済手段に応じて各サービス提供者で決済処理を実装する必要がありました。単純な同期処理だけの場合であればそこまで難易度は高くないですが、3DSを利用したクレジットカード決済など、リダイレクトが必要になる非同期処理が含まれる場合、実装コストは格段に高くなります。  
また、決済処理における画面も実装する必要がありますが、基本的にはどのサービスも必要な画面の部品は共通のものが多くなります。  
車輪の再発明のように、新規でサービスを立ち上げる際これらの実装をしなければならず、爆速にサービスを立ち上げることが難しくなっていました。  
そこで、これらの機能を備えてソリューションを提供することで、これらの課題を解決できるのではないかと考えました。

## アーキテクチャ概要

まずはアーキテクチャの概要を紹介します。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/26f31c39--2025-06-03-12.35.38-e1749182519538.png)

-   Checkout Solution Service  
    決済処理の一連のフローを管理するリソースを管理し、決済処理を実行するマイクロサービスです。  
    技術スタックとして、主にSpannerやPub/Subを利用しています。また、安全に分散トランザクションを管理するために、内製のWorkflow Engineを利用しています。Workflow Engineに関しては [こちら](https://engineering.mercari.com/blog/entry/20231023-mmtf2023-day3-7/) を参照してください。
    
-   Checkout Frontend  
    決済画面を提供し、BFFを経由してCheckout Solutionの決済処理を呼び出します。
    
-   Checkout BFF  
    Frontendで決済画面を提供するために必要なAPIを提供します。[grpc-federation](https://github.com/mercari/grpc-federation) を利用してBFFを構築しています。
    
-   Processing Tracer  
    データの整合性が担保されているかどうかをチェックをするためのリコンサイル処理をキックし、その成否を管理するマイクロサービスです。詳細は [こちら](https://engineering.mercari.com/blog/entry/20231023-mmtf2023-day3-7/) を参照してください。
    
-   Payment Service  
    さまざまな決済手段を提供するための各種APIを提供しているマイクロサービスです。Checkout SolutionはこれらのAPIを組み合わせて決済処理を提供します。
    

利用者であるClient Servicesはお客さまへ決済画面を提供するために、Checkout SolutionへAPIを呼び出し、そのレスポンスに含まれるURLへ遷移させることで決済機能を提供することができます。

## アーキテクチャ詳細

Checkout Solution Serviceの詳細を説明します。  
ベースとなる部分は [Stripe Checkout](https://stripe.com/jp/payments/checkout) を参考にしています。

## API

まず、Checkout Solution Serviceで提供するAPIの機能について説明します。

### CreateCheckoutSession API

-   決済処理のフローを開始するためにCheckoutSessionを作成するAPIです。決済画面の一意なURLが払い出され、Client ServicesはそのURLへ遷移することで、お客さまへ決済機能を提供することができます。
-   IdempotencyKeyを受け取り、冪等性を担保します。

### ConfirmCheckoutSession API

-   決済処理を実行するためのAPIです。お客さまが決済ボタンを押下することでFrontendから呼び出されます。ある決済手段で決済が失敗した場合でも別の決済手段で決済できるように、このAPIは決済が成功するまで有効期限が切れるまで呼び出すことができます。
-   IdempotencyKeyを受け取り、冪等性を担保します。

## リソース

次に、Checkout Solution Serviceで管理する主なリソースについて説明します。

### CheckoutSession

決済処理の一連のフローを管理するリソースです。

-   状態遷移
    -   open  
        初期状態。CreateCheckoutSession APIが呼び出されることでこの状態になります。
    -   complete  
        後述するPaymentIntentがrequires\_captureになるとこの状態になります。
    -   expired  
        有効期限が切れるとexpiredになります。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/cb9f6acc-checkoutsession_status.jpeg)

### PaymentIntent

実際の決済処理を管理するためのリソースです。

-   状態遷移
    -   requires\_payment\_method  
        初期状態。決済処理を実行するまで待っている状態です。
    -   processing  
        決済処理の実行中に必ず遷移する状態です。この状態にある場合、他のリクエストによってこのリソースを操作することはできず、ロックされます。
    -   requires\_capture  
        決済処理のオーソリが完了したら遷移する状態です。
    -   requires\_action  
        決済処理のオーソリを実行するために追加のアクションが必要になる場合に遷移する状態です。例えば、3DSの認証などが必要な場合はこの状態に遷移します。
    -   succeeded  
        オーソリが確定したら遷移する状態です。
    -   canceled  
        オーソリがキャンセルされたり、追加のアクションを待っている場合に有効期限が切れてキャンセルされた場合に遷移する状態です。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/0cbf6683-paymentintent_status.jpeg)

### Charge

単一の決済処理を管理するリソースです。PaymentIntentから作成されます。各決済手段の機能を提供しているPaymentのリソースと対応する形で状態を管理します。

### CheckoutConfig

Clientでカスタマイズしたい設定を管理するリソースです。例として、レイアウトの設定などを管理しています。

## シーケンス

次に、実際にこれらのリソースがどのように関連して処理を実行するかのシーケンスを紹介します。

### CreateCheckoutSession API

リソースを作成するためにDBへINSERTし、Clientへリソースを返します。ここに決済画面へのURLが含まれます。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/420b1c72-createcheckoutsession_sequence.jpeg)

### ConfirmCheckoutSession API

-   PaymentIntentを作成し、決済処理を実行します。冪等かどうかをチェックし、冪等であれば処理を進め、そうでない場合にすでにロックされていたらリクエストをエラーで終了させます。また、決済処理が失敗した場合、その失敗理由をDBに保存します。
-   オーソリが失敗した場合、状態をprocessingからrequires\_payment\_methodへ戻すようにすることで、再度APIが呼ばれてもまた別のオーソリを実行できるようにしています。
-   APIの処理全体をWorkflow Engine経由で実行するため、途中でタイムアウトエラーになった場合、非同期でリトライされます。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/741bbddc--2025-06-03-17.08.24.png)

## 冪等性の担保

ここで、APIの共通機能である、冪等性の担保についてどのように実装しているかについて紹介します。

1.  APIでIdempotencyKeyを受け取ります。
2.  同じIdempotencyKeyでDBに保存されているレコードがあるかどうかをチェックします。  
    存在していない場合は、DBに保存し処理を進めます。
3.  存在している場合は、リクエストフィールドのハッシュ値から計算されたFingerprintと、保存されていたFingerprintが一致しているかどうかをチェックします。
4.  一致している場合は、レスポンスを返すか、処理を進めます。
5.  一致していない場合は、エラーを返します。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/1a80239d-idempotency_flowchart.jpeg)

このようにすることで、同じIdempotencyKey、リクエストフィールドであれば処理を続行、または即座にレスポンスを返せるようにでき、そうでない場合はエラーにすることが可能になります。

## おわりに

この記事では、チェックアウトソリューションのアーキテクチャを紹介させていただきました。

3DS認証が必要な場合など、リダイレクト処理が必要になるためまた複雑になるのですが、今回は1番シンプルなケースを書きました。内部の状態遷移や冪等性の担保など、少しでも参考になれば幸いです。

明日の記事は seitauさんの「[Sourcegraph × 自作MCP Serverによる社内コード検索連携の取り組み](https://engineering.mercari.com/blog/entry/20250609-4660151b47/ "Sourcegraph × 自作MCP Serverによる社内コード検索連携の取り組み")」です。引き続きお楽しみください。