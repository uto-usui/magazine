---
title: "グローバル展開を支える基盤の裏側"
source: "https://engineering.mercari.com/blog/entry/20251007-behind-the-infrastructure-powering-global-expansion/"
publishedDate: "2025-10-08"
category: "engineering"
feedName: "Mercari Engineering"
---

Cross Border(XB) EngineeringでArchitect兼SREをしている [yanolab](https://x.com/yanolab) です。

ブログシリーズ初日では、[グローバル展開にむけた基盤の再構築](https://engineering.mercari.com/blog/entry/20251007-a09afcd49b/ "グローバル展開にむけた基盤の再構築")としてメルカリにおける取り組みの遷移の紹介がありましたが、本記事ではグローバル展開を支える基盤の裏側と題して、バックエンドシステムのアーキテクチャーやフレームワーク、取り組みなどを少し掘り下げて紹介したいと思います。

## Background

メルカリにおいては長らくMicroserviceアーキテクチャを採用して運用し、そのエコシステムにも投資をしてきました。echoサービスと呼ばれるMicroserviceのテンプレートや、GoでMicroserviceの開発を行うためのSDK、基本的なインフラ関係の設定をまとめたスターターキットと呼ばれるTerraformのモジュール、Kubernetesの設定を抽象化し、少ない記述でDeploymentを管理できるSDKなどがあります。また、Microserviceのリリースに際してはProduction Readiness Check(PRC)と呼ばれるプロセスがあり、新しく開発されたプロダクトやMicroserviceはこのチェックリストに合格する必要があります。これらのエコシステムやプロセスは成熟してきたものの、複雑化したエコシステムは学習コストを高め、肥大化したPRCによって、１つのMicroserviceを立ち上げるのには最低でも3ヶ月かかるようになってしまっていました。また、新しくビジネスを立ち上げる際は構築初期の人数は少ないにもかかわらず、数十のMicroserviceを立ち上げなければならない場合が多く、そのような場合においてMicroservice数×3ヶ月という工数は現実的ではなく、直近のメルカリの新規ビジネスはMonolith的なアプローチを採用することが多くなってきています。(ref: [メルカリ ハロの技術スタックとその選定理由](https://engineering.mercari.com/blog/entry/20240529-mercari-hallo-tech-stacks/ "メルカリ ハロの技術スタックとその選定理由"))  
グローバル展開にむけた基盤の再構築においては将来的に現在のメルカリMarketplaceと同じような規模になることが想定されるため、単純なMonolithではなく、既存のエコシステムを最大限活用しつつ、Microservice的な運用ができるような特殊なModular Monolithを設計し、運用しています。

## 分割して運用が可能なModular Monolith

メルカリのMicroservicesを想定したエコシステムは１レポジトリ、１サービスが基本となっており、大規模かつ複雑な構成のシステムは想定されていません。例えばCI/CDでは１バイナリ、１コンテナ、１Deploymentを想定しています。このような環境から逸脱する場合、システムの実装側で独自にワークフローを作成しメンテナンスを行う必要があります。Cross Borderチームでは独自でメンテナンスし続けるコストを回避するため、この方針に従いつつ、将来のビジネスの成長に伴う運用負荷の分散のため、Microservice的な運用ができるようにシステムを一つのバイナリにコンパイルするが、設定ファイルでモジュールの有効・無効を切り替えられるようにしています。また、モジュール間のインタフェースはProtocol Bufferで定義し、その通信はgRPCを利用するようにすることで、同じインスタンス内の通信にとらわれず、運用の自由度を高めています。これによって、１バイナリ、１コンテナとして既存のCIビルドシステムを利用しつつ、設定ファイルでモジュールをオン・オフしたり、モジュール間の通信相手を任意に設定したMicroservices的な運用を可能にしています。また、モジュール間のインターフェースをProtocol Bufferにしたことで、モジュールの独立性を高めつつモジュールのインタフェースの設計からチームで連携しながらモジュールの開発を行えるようになっています。(Fig. 1)

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/1e5201e8-modular-monolith-with-flexible-deployment-1024x399.png)

Fig.1 Modular Monolith with Flexible Deployments

新基盤のデータベースにはAlloyDBを用いています。過去のメルカリのMonolithにおいては、システム全体で共有のデータベースを用いており、ドメインごとのテーブルの連結や権限に制限はありませんでした。そのため、サービスが成長するにつれてドメイン間の依存度は高まり、運用コストは増大していきました。それに対してMicroserviceへ移行した際には多くのサービスやチームで、SpannerやCloudSQLが採用されてきました。サービス毎に独自にデータベースを持ってチームで運用することは、ドメインやサービスの独立性が高く、オーナーシップやメンテナンスの面でとても優れている選択でした。しかし、それぞれのチームで独自にデータベースを持ち、少ないリクエストでも安定運用のためにHA構成としなければならないということはコストの面から見ると非効率で、リクエストの少ないサービスでは特にコスト的に無駄が多い状態となっていました。そこで、Cross Borderチームでは、コスト節約のためなるべく同じクラスタを利用するが、モジュールごとにサービスアカウントを分けアクセスできるデータベースを制限し、データベースもモジュール単位で分割することとしました。これによって、コストを抑えつつ将来の分割やスケールに備えています。(Fig. 2)

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/b71fa8d2-db-isolation-1024x479.png)

Fig.2 DB Isolation

従来、メルカリではMicroserviceの設定を環境変数にて行ってきましたが、Monolithになった場合は設定が非常に多くなり、環境ごとの設定の管理なども煩雑になってしまうことが予想されました。そこで、設定ファイルには[CUE lang](https://cuelang.org/)を採用し、デフォルトの設定をシングルソースで管理できるようにし、開発環境や本番環境など、環境ごとに違う値のみを差分管理できるようにしています。これらの設定ファイルはコンテナのビルド時にコンテナに同梱され、環境に応じて、ローカル環境であればローカル用の設定、開発環境・本番環境であればそれに応じた設定が自動的に使われるようになっています。また、実行時にCUE/YAMLで標準の設定を上書きをできるようにすることで、Deploymentごとに違う設定を行うことも可能にしています。(Fig. 3)

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/3ec88abb-difference-managemnt-of-config-1024x480.png)

Fig. 3 Difference management of config

例えば開発環境と本番環境の標準の設定を標準のコンフィグとして下記（Fig. 4）のように定義します。この場合、ProductモジュールのProductInventoryアプリケーションはSearchモジュ ールのアドレスとしてlocalhostを利用します。

```

#GRPCClientConfigSpec: {
    address: string | *"localhost:\(#HTTPPort)"
    timeout: =~"^([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))+$" | int | *"3s"
    retry:   int & >=0 | *3
}

components:
    "layers/tire2/product/applications/productinventory":
        enabled: bool | *false
        search_module: #GRPCClientConfigSpec
    "layers/tire3/search/applications/productsearch":
        enabled: bool | *false
    ...
```

Fig. 4 Common part of development and production

開発環境の共通の設定を下記（Fig. 5）のように定義したとします。この場合、開発環境の一部であるGKEの環境でも、ローカル環境でも全ての機能が有効となり、すべてのモジュールはローカルホストのモジュールを利用します。

```

components:
    "layers/tire2/product/application/productinventory":
        enable: true
    "layers/tire3/search/applications/productsearch":
        enabled: true
    ...
```

Fig. 5 Development specific configuration（Enabled all of modules）

本番環境でGKEのDeploymentを分ける場合は、コンテナに同梱しているものとは別にConfigMapをYAMLとしてマウントし、これを読み込ませます。例えばDeploymentAのProductモジュールのInventoryアプリケーションの接続先をDeploymentBとし（Fig. 6）、DeploymentBではSearchモジュールのProductSearchアプリケーションのみを有効にする（Fig. 7）ことでSearchモジュールのみを独立して運用することが可能となっています。

```

components:
    "layers/tire2/product/applications/productinventory":
        enable: true
        search_module:
            address: deploymentB.xxxx.svc.local
    "layers/tire3/search/applications/productsearch":
        enable: false
    ...
```

Fig. 6 The Search module used by the Product module can be switched to a different Deployment

```

components:
    "layers/tire2/product/applications/productinventory":
        enable: false
    "layers/tire3/search/applications/productsearch":
        enable: true
    ...
```

Fig. 7 Deployment with only the Search module enabled

これらの柔軟なアーキテクチャはローカル開発、開発環境ではシングルバイナリで運用し、本番環境においては適切な単位でモジュールを切り分け運用を行うことを可能にしています。これは特にローカル開発において非常に強力で、Microserviceの開発時の課題である、依存するMicroserviceを含めた実行環境を用意する必要がなくなり、開発環境の構築とメンテナンス効率を劇的に向上することができます。ただし、今回の基盤再構築においては、すべてのMicroservicesを置き換えるわけではなく、現存するメルカリのMicroservicesへの依存も存在しています。これらの依存関係に対応するために[mirrord](https://metalbear.com/mirrord/)というプロダクトを用いて、ローカル環境からリモートのKubernetes環境に繋いで開発を行っています。また、[air](https://github.com/air-verse/air)というプロダクトも利用しており、変更の動的リロードができるようになっており、Webアプリを開発するようなモダンな開発環境を実現しています。

## モノレポによる変化への対応

メルカリのMicroserviceではサービス毎にレポジトリを作成し、Protocol Bufferの定義、Terraformを用いたインフラストラクチャの管理やKubernetesへのデプロイ環境のレポジトリのみ、それぞれ全員が共有するモノレポとして運用しています。このアプローチは有効ですが、メインで利用するレポジトリと異なっていることで、レポジトリ間を移動する必要があります。このコンテキストスイッチが頻繁に発生することは開発者にとって非常にストレスとなります。また、レポジトリをまたいだ自動化は、個別に動作するCIによって処理時間が長くなるだけでなく、問題が発生した場合にどこで何が起きているかを把握することが難しく、開発者の体験を悪くする要因となっています。今回基盤再構築にあたり、これら開発者の体験を見直すため、この構成も見直し、Backendプロジェクト、Frontendプロジェクト、Protobufの定義やTerraformを一箇所に集めて、極力モノレポで開発が完結するような試みを行っています。（Kubernetesへのデプロイのみエコシステムの都合上既存のモノレポを利用しています。）

Modular Monolithで境界を明確にしつつ、モノレポでBackendプロジェクトのみならずFrontendプロジェクトも管理することで、アプリケーションやアーキテクチャやフレームワークを揃えつつ、言語や役割を超えた貢献をしやすくしています。また、メンテナンスの面においても、スクリプト、Workflow、CIなど一箇所をメンテナンスすれば良く、メンテナンス効率が高いと考えています。メルカリでは長らく組織やチームの生産性を可視化できておらず、開発者の生産性を正確に測定する方法が課題となっていました。2024年より、開発者の生産性を可視化し、改善することを目的に[DX](https://getdx.com/)を導入しています。DXではサーベイを用いた定性的データとGitHubなどの生産性に関わるメトリクスなどの定量データを合わせて、効率、スピード、品質、新規性の４点を可視化しています。モノレポを用いたアプローチはこれらの値でメルカリ全体のスコアよりも良い結果が出ていることがわかりました。

今回構築したモノレポにおいて少しユニークな点としては、インフラストラクチャの管理にTerraformとCUE langを用いているところです（従来通りtfフォーマットも利用可能です）。CIにてCUEからjsonに変換して適用しています。インフラストラクチャの定義をCUEにすることで、上で紹介したModular Monolithの設定管理のように差分を意識した環境構築が可能になります。CUEはYAMLやJSONとマージして利用することが可能なので、自動化の面で非常に有効だと感じています。今後、モノレポのすべてのデータが同じレポジトリにあるというメリットを活かして、Modular Monolithの設定やフレームワークから自動的にインフラストラクチャの構成ファイルを生成するFramework defined Infrastructureに取り組みたいという野望もあります。(Fig. 8)

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/3a21ceeb-framework-defined-infrastructure-1024x845.png)

Fig. 8 Framework Defined Infrastructure

## 複雑化するドメインや依存関係に対するアプローチ

現在、メルカリではMarketplace事業のほか、Merpayも含めて数百規模のMicroserviceが稼働しています。これらのサービスは必要以上に細かく分割されていたり、相互に依存し合っていたりしてメンテナンスを困難にするだけでなく、新規に機能を作成しようと思ったときに、どのMicroserviceに機能を追加するべきか、またどのMicroserviceの機能を利用できるのか、そもそも新規にMicroserviceを作成するべきなのかなどの判断を非常に困難にしています。そこで、Cross Borderでは新規にMarketplaceの基盤を再構築するに当たって、Tierという概念と依存関係マップを導入しつつ、Likeサービスのように特定の機能にフォーカスし、小さく分けすぎたサービスをSocialモジュールにまとめるなど、ある程度まとまった大きめのドメインに再集約するなど、ドメインや役割を整理しながら進めてきました。

このTierコンセプトでは、BFF(Backend for Frontend)/Gateway、Tier 1、Tier 2、…Tier 4の5つの層に役割を分割し、それぞれの層の役割と制限を追加しました。

### BFF/Gateway層

BFFはよく知られていますが、この層ではMobileやWeb画面に最適化したAPIを定義しすべてのリクエストはBFFを通してから下位の層へ送られます。お客さまに応じた言語の変換や通貨の変換もこちらの層で担当します。Mobileエンジニア、Webエンジニア、バックエンドエンジニアで共同で所有しメンテナンスを行っています。

### Tier 1

主にリクエストオーケストレーションやビジネスフローを担当します。Tier 1の責任は、Tier 2以下のモジュールを使用してビジネスプロセスを構築することです。イメージとしてはMarketplaceの様々な機能を利用してプロセスを構築するので、水平方向の処理を担当する領域です。

### Tier 2

主にMarketplaceのコアの機能を実現するドメイン特化の層になります。ProductモジュールやOrderモジュールなどが該当します。イメージとしては該当のドメインに特化した垂直方向の処理を担当する領域です。

### Tier 3

基本的にMarketplaceに依存しないより汎用的な機能を提供する層になります。SearchやNotificationなどが該当します。

### Tier 4

この層は少し特殊で、特定の特殊な要件を満たさなければならないモジュールや、Tier 1 〜 Tier 3に属することが難しい機能を提供する層になります。他のモジュールとは適用されるセキュリティーや運用要件などが異なる個人情報を専門で取り扱うモジュールをこの層に配置しています。

リクエストは常に上から下へと流れ、同じTier同士の通信は禁止するという制約を設けています。ただし、上位Tierから下位Tierにアクセスする場合、中間Tierは飛ばして良いというルールを設けており、BFFからNotificationへのアクセスは許容しています。（Fig. 9）データベースもモジュール単位で分かれており、モジュールをまたいでトランザクションを張るということもできません。これらのルールにより、モジュールの独立性が非常に高まるとともに小さなモジュールが乱立するといったことを防いでいます。もし、同じTier同士のモジュールの通信が必要になった場合、そのモジュール同士のドメインが非常に近しいことを意味し、ドメインの境界の見直しの良いシグナルとして捉えています。

![](https://storage.googleapis.com/prd-engineering-asset/2025/10/5243b7bd-tier-concept-1024x468.png)

Fig. 9 Tier Concept

基盤の再構築はまだまだ始まったばかりですが、PaymentやIdPといったまとまったドメインかつ、環境が安定しているサービス群を活用しつつ、このデザイン手法を用いてMarketplaceのドメインを再整理し実装することで、2025年10月の現時点で18モジュールに留めることができています。

## 現在の課題

現状ではモジュール単位でのデプロイを可能にするために、モジュールごとにバージョンをファイルで管理し、リリース時にはそのバージョンをインクリメントすることで、モジュールごとのバージョンアップを検知しています。しかし、この方法はmainブランチをリリース用とするGitHub Flowとは相性が悪く、意図しない変更がリリースに含まれてしまうおそれがあります。現在この問題を解決するために試行錯誤をしています。

## 今後の展開

AIによる開発が主流になってきている昨今、競争力確保のためには新規にビジネスを素早く立ち上げる必要があります。今回紹介したCross BorderチームのMonorepo、Modular Monolithアプローチは初期の構築コストがそれなりに高いため、メルカリの今後の新規ビジネスに適用できるようにPlatformチームと連携して、もっと簡単に素早く構築できるように挑戦中です。今後何処かで機会があれば、これらの結果をまた記事にしたいと思います。

## 最後に

2025年11月13日に、メルカリグループのテックカンファレンス「mercari GEARS 2025」が開催されます。こちらにもぜひお越しください！

参加登録はこちら 👉 [https://gears.mercari.com/](https://gears.mercari.com/)

明日の記事は @Garyさんです。引き続き「[連載企画：メルカリ初の世界共通アプリ『メルカリ グローバルアプリ』の開発舞台裏](https://engineering.mercari.com/blog/entry/20251003-mercari-crossborder/ "連載企画：メルカリ初の世界共通アプリ『メルカリ グローバルアプリ』の開発舞台裏")」をお楽しみください。