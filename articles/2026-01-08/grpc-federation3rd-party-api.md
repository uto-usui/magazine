---
title: "gRPC Federationを使った3rd party API開発事例：マネーフォワード連携から学ぶ実装ノウハウ"
source: "https://engineering.mercari.com/blog/entry/20250618-27069c49cc/"
publishedDate: "2025-06-20"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルペイ Credit & Payment Service / Engineering Headの[@fivestar](https://x.com/fivestr)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/)の20日目の記事です。

今回はメルペイで主にBFF向けに採用しているgRPC Federationという仕組みを使って、3rd party向けのAPIを実装する取り組みの事例紹介になります。

## BFF(Backends For Frontends)開発に導入されているgRPC Federation

[gRPC Federation](https://github.com/mercari/grpc-federation)は、Protocol Buffers上にDSL(Domain-Specific Language)を記述することでコードを書かずにBFF(Backends for Frontends)を作成できるフレームワークです。現在[OSS](https://github.com/mercari/grpc-federation)として公開しています。

gRPC FederationはBFFに限らずあらゆるマイクロサービス開発において、サービス間の依存関係をProtocol Buffers上で表現することを目指して社内で開発が進められていました。

この仕組みはメルペイのBFFのリアーキテクチャに先行導入されていましたが、IDP(ID Platform)チームが用意しているメルカリID連携の仕組みやAPI Gatewayと組み合わせることで3rd party向けのAPI開発もスムーズに実現することができました。

-   [gRPC Federation: gRPC サービスのための Protocol Buffers を進化させるDSL](https://engineering.mercari.com/blog/entry/20240401-4f426bd460/)
-   [【書き起こし】gRPC Federation を利用した巨大なBFFに対するリアーキテクチャの試み – goccy【Merpay & Mercoin Tech Fest 2023】](https://engineering.mercari.com/blog/entry/20231023-mmtf2023-day3-9/)
-   [【書き起こし】メルカリグループの認証基盤における理想と現状、今後の取り組み – kokukuma 【Merpay Tech Fest 2022】](https://engineering.mercari.com/blog/entry/20221018-mtf2022-day2-5/)

## メルペイのアーキテクチャ

メルペイではマイクロサービスアーキテクチャを前提とした4レイヤーアーキテクチャを採用しています。API Gatewayを経由してAPI = BFFレイヤーが、Backendのマイクロサービスを束ねるという構成です(図1)。

API GatewayはAPIサーバーをexposeするための処理を行います。メルペイではAPIサーバーはgRPCのエンドポイントを提供しており、API GatewayがgRPCのAPIをJSONのHTTP APIに変換します。他にもアクセストークンの検証等も行います。

APIレイヤーにはMerpay APIという集約的なBFFが提供されていました。しかしサービス拡大に伴って保守コストの増加とオーナーシップの問題が出てきたことを受け、BFFをドメインごとに分割するMerpay APIリアーキテクチャプロジェクトが立ち上がります。このプロジェクトでgRPC Federationが採用されました。

図1 メルペイの4レイヤーアーキテクチャ  
![メルペイの4レイヤーアーキテクチャ](https://storage.googleapis.com/prd-engineering-asset/2025/06/a485883c-screenshot-2025-06-16-at-11.40.54-copy.png)

### gRPC Federationの導入

gRPC Federationの利用者として感じる利点は、Protobuf上のDSLの記述のみで完結するため運用時の認知負荷が低いこととパフォーマンス最適化、品質安定性です。

BFFの主な役割は大雑把に言えば「Frontendのために必要なデータをBackendのサービス群から取得して返す」ことです。gRPC Federationは **DSLの記述順序に関わらずAPIコールの順序・並列化を最適化** してくれるため、特に複雑なデータ取得が要求される画面で力を発揮します。

複雑な実装が求められる場合は個別にGoのコードを直接記述することもできるのですが、これまでgRPC Federationを用いた開発上はDSLのみで完結しています。そのため自動生成されたGoのコードのみで運用することになり、バグが埋め込まれにくく品質が安定します。

## メルペイにおける3rd party向けAPI

現在メルペイでは主に次のような3rd party向けのAPIを提供しています。

-   ネット決済加盟店向けAPI
-   PFMサービス連携向けAPI
-   メルカリポイント交換API

このうちPFM(Personal Financial Management)サービス連携向けAPIとメルカリポイント交換APIについてはgRPC Federationで実装されており、メルカリID連携を用いた認証・認可を採用しています。社内のアセットを最大限に活用して短期間・低コストでAPIを提供する手段が確立でき、外部システムとの連携において非常に前向きな意思決定ができるようになりました。

## メルカリID連携

APIを外部に公開するうえで最も重要な要素が認証・認可です。メルカリにはIDPチームがあり、既にメルカリIDを用いたOAuth / Open ID Connect(OIDC)を実現する基本的な仕組みが整っていたので、この点は既存の資産を活用することで実現できました。

これまでAuthentication Code FlowだけでなくClient Credentials Flowを採用したケースもあり、このあたりOAuth 2.0の基本的な機能はおおよそカバーされているため、ユースケースに応じた柔軟な対応が可能となっています。

またメルカリ内部ではお客さまのIDはPII(個人識別用情報)として扱うため慎重に取り扱う必要があるのですが、OIDCを用いたときにPPID(Pairwise Pseudonymous Identifier)として変換されるため、安全かつシームレスに扱える仕組みが整っています。

実際にこれまで3rd party向けのAPIを用意するときは都度IDPチームに相談して適切な選択肢を一緒に考えてもらっているのですが、プラットフォームとして確かな機能が提供されており、またそれらが正しく使えるように毎回丁寧に相談にのってくれるため、大変心強いです。

-   [Applying OAuth 2.0 and OIDC to first-party services](https://engineering.mercari.com/en/blog/entry/20230130-applying-oauth-2-0-and-oidc-to-first-party-services/)

## gRPC Federationを用いた3rd party向けAPI提供

最初に3rd party向けAPIに導入したのがPFMサービスである[マネーフォワードとのシステム連携プロジェクト](https://jp.merpay.com/news/2024/08/20240805moneyforward/)でした。gRPC Federationが導入されてまもなくの頃で、まだ実際にプロダクション環境での実績がない状況でしたが、前述のような利点があることからSolutionsチーム・Architectチームと相談の上で採用を決定しました。

実はメルカリ全体としてオープンなPublic APIを提供するアイディアもありましたが、意思決定のコストや要求されるスピード感を考えたときに今それを目指すのはToo muchでした。 **gRPC Federationを使うことでBFFの立ち上げコストが劇的に下がった** ことからも、一旦はドメインごとにAPIを用意していく方が合理性があると判断しています。

このあとに実装したポイント交換APIはgRPC Federationへの習熟度が上がってきたこともあり、おおよそ1-2週間程度で基本的なAPIの用意ができています。gRPC FederationのDSLを記述するのに多少の学習コストが必要でしたが、[Language Server](https://github.com/mercari/grpc-federation/blob/main/cmd/grpc-federation-language-server/README.md)の他、執筆時点では[MCPサーバーの実装](https://github.com/mercari/grpc-federation/pull/303)も進められており、効率的な開発が行える様々な支援が提供されています。

### 新規開発の流れ

3rd party向けのAPIをgRPC Federationで実装する場合、次のような手順で進めています。

1.  要件定義
2.  Design Doc作成
3.  API仕様書作成
4.  API仕様に合わせてProtocol Buffers上でスキーマ定義
5.  Protocol Buffers上でDSLを書いてAPI実装

メルペイの場合、要件定義はプロダクトマネージャーが中心となって進めるケースが多いですが、3rd party向けAPIの場合は画面仕様が明確でないケースもあるため、エンジニアがオーナーシップを発揮する必要があります。マネーフォワード連携の場合、私自身がマネーフォワードの利用者で連携を待ちわびていたこともあったので喜々としてやった覚えがあります。

### Design Doc作成

Design Docはステークホルダとの合意形成のためにさまざまな観点から情報を整理するために記述します。特にメルカリ・メルペイにおいてはドメインに関係があるチームはもちろん、Architect、SRE、IDP、SecurityといったEnabling方面との合意を早期に得ることが最終的な成果物を早く提供することにつながるため、迅速にまとめることを意識しています。

-   API提供の背景、目的、スコープ、ゴール
-   APIの名称、ドメイン名
-   アーキテクチャ図、依存関係
-   外部システムを含めたシーケンス図
-   どのチームにどのような作業を要求するか
-   エンドポイント
-   メルカリID連携のクライアントの単位
-   認可スコープ
-   提供環境、特に外部向けの開発環境をどうするか

こういった情報は要件定義以前から関係チームを巻き込みながら進めておくことで、そこまでにおおよそ決まった方針をDesign Docとして清書し、不確実な要素をつぶしていく作業になります。自分は1度やって勘所を掴んだこともあり要件次第ですがおおよそ1日程度で最低限はまとめられるため、とにかく1度やってしまえば意外と難しいことはなかったりします。

### API仕様書作成

3rd partyにAPI仕様を伝える上で当然API仕様書を用意する必要があります。リクエストやレスポンスのヘッダーやパラメーター情報はもちろん、エラーの種別や実際のレスポンスのパターンも用意する必要があります。ただし、特にAPIを新規で開発するタイミングでは、実際にAPIクライアント側が想定するAPI構成になっているかを早めに揃えることが手戻りを抑えるために重要なため、基本的なAPIの単位と主要なパラメーターを整理して早期にすり合わせるように心がけています。

またこの時メルカリID連携のフローも含めたシーケンス図を用意しておくことで、想定されるAPIの呼び出し方法や、お客さまがどこで操作を行うのかといったUX面でもよりイメージを揃えることができたため、シーケンス図もあわせて用意するようにしています。

## gRPC Federationを用いたAPI定義の例

gRPC Federationを用いてProtocol Buffers上でAPIを作成するサンプルコードを用意しました。リスト1で3つのエンドポイントを内包する `APIService` サービスを、リスト2はそのうちの `CreateCharge` メソッドをそれぞれ定義したものです。(なおコードは実際のものを模したダミーです)

### gRPCサービス定義

リスト1にはAPIのアウトラインとなる定義が記載されています。 `APIService` にはまず `mercari.api.gateway.spec` オプションで、API Gateway向けの設定を行っています。exposeするドメインや、内部的なAPI区分などを指定します。

`APIService` には `CreateCharge` `GetCharge` `CaptureCharge` という3つのgRPCメソッドが定義されています。各エンドポイントにはAPI GatewayでHTTPのエンドポイントで変換するために `google.api.http` オプションを設定しています。今回の例ではREST形式のパスを採用しているため、クライアントからするとREST APIとして操作しているように見えるでしょう。

gRPC Federationでは **`option`** キーワードを使って `.proto` ファイル上にannotateします。gRPCサービスに対しては `.grpc.federation.service` をマッピングするだけで基本的には十分です。もしgRPC FederationのDSL内で環境変数にアクセスしたい場合 `env` キーで設定することができます。

`mercari.api.jp.authority.scopes` は必要なスコープを定義するメルカリ独自のオプションです。これはAPI Gatewayによって必要な権限のないリクエストを弾く処理が行われているため、どのようなスコープ単位の定義と、メソッドごとの必要スコープの設定にのみフォーカスできます。

なお、 `mercari.` で始まっているオプションは基本的にメルカリ社内用のアノテーションで、あくまでメルカリ・メルペイ内部において、API GatewayやIDPとの連携についてアノテーションベースで設定できる仕組みがある、程度の理解で大丈夫です。

リスト1: gRPC サービス定義

```
service APIService {
  option (mercari.api.gateway.spec) = {
    domain : "example-api.merpay.com"
    endpoint_prefix : ""
    api_type : API_TYPE_OPEN
  };

  option (.grpc.federation.service) = {};

  rpc CreateCharge(CreateChargeRequest) returns (CreateChargeResponse) {
    option (google.api.http) = {
      post : "/v1/charges"
      body : "*"
    };
    option (mercari.api.jp.authority.scopes) = SCOPE_MERPAY_EXAMPLE_API_CHARGE_READWRITE;
  }

  rpc GetCharge(GetChargeRequest) returns (GetChargeResponse) {
    option (google.api.http) = {
      get : "/v1/charges/{charge_id}"
    };
    option (mercari.api.jp.authority.scopes) = SCOPE_MERPAY_EXAMPLE_API_CHARGE_READWRITE;
  }

  rpc CaptureCharge(CaptureChargeRequest) returns (CaptureChargeResponse) {
    option (google.api.http) = {
      post : "/v1/charges/{charge_id}:capture"
      body : "*"
    };
    option (mercari.api.jp.authority.scopes) = SCOPE_MERPAY_EXAMPLE_API_CHARGE_READWRITE;
  }
}
```

### gRPCメソッド定義

実際にgRPC FederationでDSLを記載するのは主に各メソッドの戻り値に設定したメッセージになります。リスト2では `CreateCharge` メソッドの戻り値である `CreateChargeResponse` に、Backendサービスの `merpay.payment.v1.PaymentService/CreateCharge` を呼び出して、そのレスポンスから `res.charge` を取り出して `CreateChargeResponse.charge` に詰めて返す、という記述をしています。

gRPC Federationでは `def` キーワードを用いて変数を定義しながら、その中で `call` キーワードを用いることでBackendサービスのAPIコールを行い、レスポンスに必要なデータを形成していくというフローです。 `$.amount` のように `$` を用いてリクエストパラメータに直接アクセスできます。

今回は省略しましたが `validation` キーワードを用いてバリデーションしたり、 `error` キーワードを用いてエラーを返したりといった操作も可能です。

`(.grpc.federation.message).alias` を用いて、パッケージが異なるがスキーマが同じ場合に自動的にプロパティを詰め替えてくれる機能もあります。レイヤードアーキテクチャを採用しているとこういったレイヤーをまたいだ際のペイロードの詰め替えが発生しがちですが、名前を見て適切にマッピングしてくれるためとても簡潔に扱えます。

`customer_id` 変数に `mercari.grpc.federation.authority.pat().customerId()` という値を設定していますが、これはgRPC FederationのDSL(CEL API)を[プラグインによって拡張](https://github.com/mercari/grpc-federation/blob/main/docs/cel_plugin.md) したもので、IDPが発行した内部用のアクセストークンからカスタマーIDを取得するメルカリ固有のデータアクセスをDSLに組み込んでいます。

なお、このサンプルコードではAPI設計でよく使われる冪等性の担保についても実装例を示しています。昨今ではHTTPリクエストに `Idempotency-Key` ヘッダーで「冪等キー」を指定する手法が一般的で、サンプルコードでもこの指定に則っています。 `grpc.federation.metadata.incoming()['idempotency-key'][0]` のようにHTTPヘッダーの値が取得できます。従来メルペイでも[決済や残高のデータ整合性担保](https://engineering.mercari.com/blog/entry/2019-06-07-155849/)のために冪等キーを導入していましたが、gRPCのリクエストパラメータに指定する手法を採用しているため、BFFレイヤーで詰め替えを行っています。

リスト2: CreateCharge RPCの定義

```
option (grpc.federation.file) = {
  import : [
    "proto/merpay/payment/v1/payment.proto"
  ]
};

message CreateChargeRequest {
  uint64 amount = 1;
}

message CreateChargeResponse {
  option (.grpc.federation.message) = {
    def[
      {
        name : "customer_id"
        by : "mercari.grpc.federation.authority.pat().customerId()"
      },
      {
        name : "idempotency_key"
        by : "grpc.federation.metadata.incoming()['idempotency-key'][0]"
      },
      {
        name : "res"
        call {
          method : "merpay.payment.v1.PaymentService/CreateCharge"
          request : [
            {field : "customer_id", by : "customer_id"},
            {field : "amount", by : "$.amount"},
            {field : "idempotency_key", by : "idempotency_key"}
          ]
        }
      }
    ]
  };

  Charge charge = 1 [(grpc.federation.field).by = "res.charge"];
}

message Charge {
  option (.grpc.federation.message).alias = "merpay.payment.v1.Charge";

  string id = 1;
  uint64 amount = 2;
}
```

### gRPC FederationでAPIサーバーが動くまで

実際にはこのProtobufの変更をマージした上で、gRPC Federationを用いてビルドされたGoのコードにテストコードを書いていきます。またAPI Gatewayに対してこのAPIをexposeするための設定も必要です。とはいえおおよそはgRPC Federationによってレールが敷かれるため、1からサービスを作成することに比べると非常にシンプルな工数で実現が可能となっています。

### 複雑なエンドポイントの実装

先ほど示したサンプルコードはスキーマ自体もかなり簡略化していますが、実際にマネーフォワードとの連携においてはお客さまの残高やメルカードの利用状況など複雑なスキーマやパターンを持つエンドポイントを複数実装しています。

gRPC FederationでDSLを記述する際、次のような操作が基本機能として提供されています。

-   ネストしたメッセージの中でもAPI call含めた定義が可能
-   四則演算や型変換が可能
-   `if`キーワード、あるいは`by` キーワード内で三項演算子を用いた条件分岐が可能
-   `call` キーワードの中で `timeout` を用いたタイムアウト時間の設定、及び `retry` を用いたリトライの指定が可能

複雑なスキーマにおいてはDSLもそれなりの記述量となりますが、基本的には処理結果を変数に詰めるということを繰り返していくため、処理がネストするような書き方にはならず複雑さは比較的抑えられるかと思います。

またスキーマ自体が適切に正規化されていることでメッセージのまとまり単位でDSLの記述も整理できるため、特に新規にスキーマ定義する際は **正規化を意識する** ことで全体の見通しがよくなると思います。

## まとめ

現時点におけるベストプラクティスの1つとして、gRPC Federationを採用して3rd party向けAPIを提供する流れをざっくりと紹介してきました。

gRPC FederationはBFFのような仕組みを簡単に作成でき、運用負荷も少ないため、低コストでAPIを立ち上げることができます。もちろん複雑なスキーマにも対応できますし、サーバーを分割したい場合にも適しており、プロダクトの規模に応じて様々な状況に対応できる非常に実用的なソリューションです。

もちろんこれはgRPC Federationを導入しただけで作れるものではなく、API GatewayやBackendサービスといったアーキテクチャのレイヤー化や、IDPのようなプラットフォームがあるからこそ、BFFレイヤーの拡張だけで新しいAPIの導入が実現できています。ですのでアーキテクチャの全体像を踏まえて参考にしていただければ幸いです。

今回の記事用に書いたサンプルコードの作成にあたってClaude Codeを用いてDSLを生成しましたが、多少のやり取りでおおよそ期待通りのアウトプットが出来上がりました。今回の[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/)でもAI関連の記事が非常に多く出ていますが、本当に目まぐるしい速度で環境が変わっていっていますよね。ぜひ他の記事も目を通してみてください！

明日の記事はtakeshiさんによる「[「自分ができる領域が増えた」-Cursorを使って未経験のKotlinコードレビューに挑戦](https://engineering.mercari.com/blog/entry/20250620-018cdf7e2b/ "「自分ができる領域が増えた」-Cursorを使って未経験のKotlinコードレビューに挑戦")」とShuntaさんによる「[初めてのWWDC25に現地参加！Apple Parkで体験した特別な数日感](https://engineering.mercari.com/blog/entry/20250622-1c1848f606/ "初めてのWWDC25に現地参加！Apple Parkで体験した特別な数日感")」の2本です。引き続きお楽しみください。