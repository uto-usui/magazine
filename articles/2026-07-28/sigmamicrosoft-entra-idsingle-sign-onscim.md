---
title: "SigmaでMicrosoft Entra IDによるSingle Sign-On及びSCIMプロビジョニングを有効化する"
source: "https://tech.layerx.co.jp/entry/sigma-sso-scim"
publishedDate: "2026-07-27"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065828.png) こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://twitter.com/Civitaspo)です。5月に第3子が生まれたのですが、7年ぶりの子育てで、過去の自分との体力差を痛感する日々を過ごしています。無限に抱っこをすると腰と膝が壊れることを学びました。

さて、弊社ではBIツールとして[Sigma](https://www.sigmacomputing.com/)の導入を進めています。データウェアハウスをSnowflakeへ移行する取り組みや進捗は昨年末の総括で紹介しました。その次の段階として、Snowflake上のデータを組織全体で活用するためのBIツールを検討し、Sigmaを選定しています。 [tech.layerx.co.jp](https://tech.layerx.co.jp/entry/bakuraku-data-platform-2025)

Sigma選定の経緯や他ツールとの比較については、導入プロジェクトが完了に近づいたら別途ブログに書こうと思います。

今回はSigma導入の第一歩として、弊社がIdentity Provider（以下、IdP）として利用しているMicrosoft Entra IDによるSingle Sign-On（以下、SSO）、及びSCIMプロビジョニング[1](#fn:1)の有効化を行ったので、その手順をブログに残しておこうと思います。SigmaのSSOおよびSCIMの設定に関する手順は、Sigma Communityにドキュメントが存在するのですが、手順の背景にある仕様の説明が不十分なため、調査した内容も含めて書き残しています。 [community.sigmacomputing.com](https://community.sigmacomputing.com/t/saml-with-scim-integration-using-microsoft-entra-azure-idp/5425)

なお、本記事ではMicrosoft Entra IDに関する基礎的な説明は行いません。また、SigmaからSnowflakeへの接続認証（External OAuth for partner applications）は本記事のスコープ外とし、別の記事で扱う予定です。本記事はあくまでSigmaという組織へのログイン（SSO）とユーザー・チーム管理（SCIM）の話です。

まず「Sigmaとは何か」を簡潔に説明した上で、SSO/SCIMの設定手順について説明していきます。弊社の事例として共有することを目的としているため、IdPはMicrosoft Entra IDを使用していること、Sigmaが参照するデータはSnowflakeに存在することを前提として読んでいただければと思います。

## もくじ

-   [もくじ](#もくじ)
-   [Sigmaとは？](#Sigmaとは)
-   [Galleryに登録されている公式のアプリケーションを使用してはいけない](#Galleryに登録されている公式のアプリケーションを使用してはいけない)
-   [Single Sign-Onの有効化](#Single-Sign-Onの有効化)
    -   [Microsoft Entra ID側での作業](#Microsoft-Entra-ID側での作業)
    -   [Sigma側での作業](#Sigma側での作業)
    -   [テスト](#テスト)
-   [SCIMプロビジョニングの有効化](#SCIMプロビジョニングの有効化)
    -   [Sigma側での作業: SCIMトークンの払い出し](#Sigma側での作業-SCIMトークンの払い出し)
    -   [Microsoft Entra ID側での作業: App rolesの作成](#Microsoft-Entra-ID側での作業-App-rolesの作成)
    -   [Provisioning設定と aadOptscim062020 フラグ](#Provisioning設定と-aadOptscim062020-フラグ)
    -   [Attribute mappingの設定](#Attribute-mappingの設定)
    -   [プロビジョニングの実行](#プロビジョニングの実行)
-   [グループ設計: Account typeとTeamを別のグループで管理する](#グループ設計-Account-typeとTeamを別のグループで管理する)
-   [おわりに](#おわりに)

Sigmaは日本ではまだ知名度が高くないため、簡潔に特徴を説明します。 [www.sigmacomputing.com](https://www.sigmacomputing.com/)

Sigmaはクラウドデータウェアハウス上で動作するBI / アナリティクスプラットフォームです。クエリはSnowflakeなどのデータウェアハウスに直接発行され、Sigma側にデータの複製を持ちません。ユーザーインターフェースはスプレッドシートであり、ピボットや数式による列追加といった操作がそのままSQLに変換されてデータウェアハウス上で実行されます。SQLを書けないユーザーでも、データウェアハウス上のデータをスプレッドシートの操作感で探索できます。

そして、最大の特徴はwrite-back（[Input Tables](https://help.sigmacomputing.com/docs/intro-to-input-tables)）です。ユーザーがSigma上で入力した値をデータウェアハウスのテーブルとして書き戻すことができます。これにより、参照系のBIツールとしての用途だけでなく、マスタメンテナンスやCRMのような更新系の業務アプリケーション用途にも使えます。分析結果を見る場所と業務データを入力する場所が同じデータウェアハウス上で完結する、という点が既存のBIツールとの大きな違いです。 [help.sigmacomputing.com](https://help.sigmacomputing.com/docs/intro-to-input-tables)

イメージを理解していただくために語弊を恐れずに言えば、「高速に動作するGoogle Data Studio + DWHをバックエンドに持つGoogle Sheets」という表現がマッチすると思います。

## Galleryに登録されている公式のアプリケーションを使用してはいけない

次に、本構成において一番重要なポイントを書きます。Microsoft Entra IDのEnterprise application galleryには、Sigma公式のアプリケーションが登録されています。しかし、**SCIMプロビジョニングを行う場合、このgallery applicationを使ってはいけません**。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728061707.png)

Sigma Communityの[SAML Only Integration using Microsoft Entra (Azure) IdP](https://community.sigmacomputing.com/t/saml-only-integration-using-microsoft-entra-azure-idp/5426)に明記されているとおり、gallery applicationはSAMLのみの構成向けであり、SCIMプロビジョニングには完全対応していません。SCIMを使う場合は[SAML With SCIM Integration using Microsoft Entra (Azure) IdP](https://community.sigmacomputing.com/t/saml-with-scim-integration-using-microsoft-entra-azure-idp/5425)に従い、カスタム（Non-gallery）のEnterprise applicationを自分で作成する必要があります。

[community.sigmacomputing.com](https://community.sigmacomputing.com/t/saml-only-integration-using-microsoft-entra-azure-idp/5426) [community.sigmacomputing.com](https://community.sigmacomputing.com/t/saml-with-scim-integration-using-microsoft-entra-azure-idp/5425)

gallery applicationでSCIMプロビジョニングができない理由は、Sigmaが要求する以下の設定・動作をgallery applicationでは実現できないためです。

gallery applicationの制約

発生する問題

App rolesの再定義に制限がある（デフォルトは旧ライセンスモデルの `admin` / `viewer` / `author`）

現行ライセンスモデル（`admin` / `analyze` / `build` / `act` / `view`）やカスタムAccount typeをIdPから割り当てられない

属性一覧を編集して `roles` マルチバリュー属性を追加できない

複数のApp Roleを連携できず、Account type用グループとTeam用グループを分ける後述の設計が組めない。ユーザーが複数グループに所属すると `MultipleGrantsNotSupported` エラーでプロビジョニングが失敗する

Tenant URLへの `aadOptscim062020` フラグの適用ができない、または想定外の挙動になる

ユーザーの無効化やグループメンバーの削除がSCIM 2.0準拠の形式で送信されず、Sigma側に正しく反映されない

なお、Microsoftは現在、galleryへのSSO / SCIM統合の新規受付と更新を停止しており、SCIMプロビジョニングにはcustom applicationの使用を案内しています。そのため、gallery application が SCIM 対応することは今後もないと考えていいと思います。 [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/v2-howto-app-gallery-listing)

将来SCIMを使う可能性が少しでもあるなら、最初からcustom applicationで構築することをオススメします。gallery applicationからcustom applicationへの移行はSSOの再設定が必要になるため、手戻りが大きくなります。というわけで、「Create your own application」からNon-galleryのアプリケーションを作成します。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728062725.png)

Enterprise applicationのロゴはSigma公式サイトで [icon](https://www.sigmacomputing.com/sigma-apple-touch-icon.png) を取得して設定しています。ロゴを設定しておくと、Microsoft MyAppsポータルや管理画面での視認性が上がるので、オススメです。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728062800.png)

## Single Sign-Onの有効化

Single Sign-On（以下、SSO）の有効化について説明します。[Sigma公式のSAMLドキュメント](https://help.sigmacomputing.com/docs/single-sign-on-with-saml)と、先述のSigma Community記事に沿って作業します。 [help.sigmacomputing.com](https://help.sigmacomputing.com/docs/single-sign-on-with-saml)

### Microsoft Entra ID側での作業

作成したEnterprise applicationの「Single sign-on」メニューから「SAML」を選択し、Basic SAML Configurationを設定します。

設定値に含まれる `{{baseUrl}}` はSigma組織が動作しているクラウドプロバイダとリージョンによって異なります。[Sigmaのリージョン一覧ドキュメント](https://help.sigmacomputing.com/docs/region-warehouse-and-feature-support#supported-cloud-platforms-and-regions)で確認できます。

Entra ID側の設定名

Sigma SAMLドキュメント上の名称

テンプレート

Identifier (Entity ID)

Audience URI

`https://{{baseUrl}}/api/v2/saml2/2/metadata.xml`

Reply URL

Assertion consumer service (ACS) URL

`https://{{baseUrl}}/api/v2/saml2/assert`

Sign on URL (Optional)

N/A

`https://app.sigmacomputing.com/{{organization-slug}}`

Relay State

RelayState

`https://app.sigmacomputing.com/{{organization-slug}}/finish-login`

[help.sigmacomputing.com](https://help.sigmacomputing.com/docs/region-warehouse-and-feature-support#supported-cloud-platforms-and-regions)

なお、複数のIdPを1つのSigma組織に接続する場合は[Unique SAML Entity IDの有効化](https://help.sigmacomputing.com/docs/single-sign-on-with-saml#optional-enable-unique-saml-entity-ids)が必要になりますが、本記事では扱いません。 [help.sigmacomputing.com](https://help.sigmacomputing.com/docs/single-sign-on-with-saml#optional-enable-unique-saml-entity-ids)

設定後は以下のようになります。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728063648.png)

なお、上記の値は自分で組み立てなくても、Sigmaの管理画面（ `Administration > Authentication` ）でSAMLを有効化すると、「Service provider entity ID」「Assertion consumer service URL」「Relay state」がそのまま表示されます。手で組み立てるよりも管理画面の表示値を使うことをオススメします。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728063812.png)

### Sigma側での作業

次に、Entra ID側のSAML設定画面に表示される「Login URL」と「Certificate (Base64)」を取得し、Sigma側に転記します。Sigmaの設定画面（`Administration > Authentication`） でAuthentication methodを「SAML or password」に変更すると、「Identity provider login URL」と「Identity provider X.509 certificate」の入力欄が表示されるため、Entra IDで取得した値を入力します。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064142.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064220.png)

このとき、Authentication methodはまず「SAML or password」にしておくことをオススメします。最初から「SAML only」にすると、SAML設定に誤りがあった場合に管理者自身がSigmaにログインできなくなる可能性があります。SSOの動作確認が完了してから「SAML only」に切り替えます（後述しますが、SCIMプロビジョニングの設定には「SAML only」であることが必須です）。

### テスト

Entra ID側でEnterprise applicationの「Users and groups」にテストユーザーを割り当ててから、SAML設定画面のTestを実行します。成功すると以下のような表示になります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064302.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064321.png)

## SCIMプロビジョニングの有効化

次にSCIMプロビジョニングの有効化を進めます。

### Sigma側での作業: SCIMトークンの払い出し

SigmaのAuthentication methodを「SAML only」に変更すると、「Account type and team provisioning」という設定項目が表示されます。SCIMプロビジョニングの設定はこの項目から行います。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064351.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064447.png)

セットアップを開始すると、SCIM有効化後の挙動について説明が表示されます。SCIM有効化後はAccount type（ライセンス種別）の割り当てがIdP経由になり、TeamもIdP側のグループから作成・管理することになります。SCIM有効化前にSigma上で作成したTeamは残りますが編集不可となり、対応するIdPグループを作成することで管理をIdPに移管できます。

セットアップを進めるとトークン名の入力を求められるので「Microsoft Entra ID」等の名称を入力し、払い出されたBearer tokenとDirectory base URLを控えておきます。トークンは再表示できないため、安全な場所に保管してください。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064512.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064523.png)

なお、このSCIMトークンは払い出しを実行したAdminユーザーに紐づきます。そのユーザーが無効化されるとトークンも無効になるため、担当者の退職時にはトークンの再生成が必要になることを覚えておきましょう。

### Microsoft Entra ID側での作業: App rolesの作成

Enterprise applicationを作成すると、同名のApp registrationも作成されています。App registrationの「App roles」を開くと、デフォルトで `User` / `msiam_access` というロールが定義されています（gallery applicationと異なり、custom applicationのデフォルトはSigmaのライセンスモデルと無関係です）。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064543.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064615.png)

このApp roleのvalueが、SCIM経由でSigmaのAccount typeとして連携されます。現行の新ライセンスモデルでは `admin` / `analyze` / `build` / `act` / `view` が正しい名称です。自組織のライセンスモデルに合わせてApp rolesを再定義する必要があります。gallery applicationではこの再定義ができないことも、custom applicationが必須である理由の1つです。

App roleのvalueはすべて小文字である必要があります。Sigma側のAccount type名との照合は大文字小文字を区別するため、カスタムAccount typeを使っている場合はSigma上の名称と完全一致させてください。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064646.png)

弊社では新ライセンスモデルの5種類を定義しました。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064707.png)

### Provisioning設定と `aadOptscim062020` フラグ

Enterprise applicationの「Provisioning」を開き、Admin Credentialsに以下を設定します。

設定名

設定値

Provisioning Mode

Automatic

Tenant URL

`{Sigmaが払い出したDirectory base URL}?aadOptscim062020`

Secret Token

Sigmaが払い出したBearer token

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064728.png)

Sigma Communityのドキュメントには「Tenant URLの末尾に `?aadOptscim062020` を付与せよ」と書かれているのですが、これが何なのかの説明はありません。調べたところ、これはSigma固有のものではなく、**Microsoft Entra IDのSCIMクライアントの挙動を変更するfeature flag**でした。[Microsoftのドキュメント](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility)に記載があります。 [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility)

Entra IDのプロビジョニングエンジンが送信するSCIM PATCHリクエストは、歴史的経緯によりSCIM 2.0（RFC 7644）に準拠していない箇所があります。`aadOptscim062020` フラグをTenant URLに付与すると、PATCHリクエストが以下のように準拠した形式に変わります。

変更点

フラグなし（旧挙動）

`aadOptscim062020` あり

ユーザー無効化（`active` 属性）

`"False"`（文字列）

`false`（boolean）

グループメンバー削除

非準拠の `Remove` 操作 + `members` 配列

`remove` 操作と `members[value eq "..."]` パスフィルタ

複数属性のreplace

属性ごとに個別のreplace操作

単一のreplace + valueオブジェクト

`roles` 属性のPATCH形式

POSTと形式が不一致になる場合がある

POSTと同じオブジェクト配列に揃う

SigmaのSCIMエンドポイントはSCIM 2.0準拠のリクエストを期待しているため、このフラグがないとユーザーの無効化やグループメンバーの削除が正しく反映されません。

なお、このフラグを付与しなくてもProvisioning設定の「Test Connection」は成功します。フラグが変更するのはPATCHリクエストの形式のみであり、接続テストではPATCHが発行されないためです。接続テストが通ることとプロビジョニングが正しく動作することは別である点に注意してください。

その他、このフラグには以下の注意点があります。

-   On-demand provisioning（単一ユーザーの手動即時プロビジョニング）では機能しません
-   Tenant URLを変更した場合、Secret Tokenの再入力を求められることがあります
-   Microsoftは将来この挙動をデフォルト化する予定です。デフォルト化後に旧挙動へ戻すためのフラグとして `AzureAdScimPatch2017` が用意されています

### Attribute mappingの設定

次に、複数のApp RoleをSigmaに連携するためのマッピングを設定します。「Mappings」の「Provision Azure Active Directory Users」を開きます。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064818.png)

デフォルトの属性一覧には `roles` が存在しないため、まず属性定義を追加します。「Show advanced options」にチェックを入れ、「Edit attribute list for customappsso」から属性一覧の編集画面に入り、`roles` という名前の属性を Multi-Value?にチェックを入れて追加します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064836.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064858.png)

続いて、この `roles` 属性へのマッピングを追加します。

項目

値

Mapping Type

Expression

Expression

`AppRoleAssignmentsComplex([appRoleAssignments])`

Target attribute

roles

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728064917.png)

`AppRoleAssignmentsComplex` は、ユーザーに割り当てられたすべてのApp Roleをオブジェクト配列として送信する関数です。ユーザーは複数のグループに所属し、グループごとに異なるApp Roleが割り当てられるため、複数のロールが連携されることになります。Sigma側で複数ロールがどう解決されるかは後述のグループ設計で説明します。 [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/functions-for-customizing-application-data#approleassignmentscomplex)

残りの属性マッピングは、Sigmaが受け取る属性が限られているため最小限に絞りました。`userName` と `emails[type eq "work"].value` にはUser Principal Nameを使用します。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065000.png)

### プロビジョニングの実行

試しに1ユーザーをプロビジョニングしてみると、Sigma側にユーザーが作成されます。Entra ID側の `displayName` がSigmaのNameに対応します。 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065023.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065033.png)

動作確認ができたら、Provisioning Statusを「On」にして定期プロビジョニングを有効化します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065050.png)

なお、Entra IDのプロビジョニングサイクルは20~40分程度間隔です。急ぎの場合は、オンデマンドプロビジョニングを実行しましょう。 [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/check-status-user-account-provisioning)

## グループ設計: Account typeとTeamを別のグループで管理する

セットアップの最後に、Entra ID側のグループ設計について説明します。SigmaとEntra IDにはそれぞれ以下の制約があります。

制約元

内容

Sigma

1ユーザーに割り当てられるAccount typeは1つ。Teamは複数所属可

Entra ID

1グループに割り当てられるApp roleは1つ

この制約の組み合わせから、Sigma Communityのドキュメントでは2種類のグループを作成することが推奨されています。

-   **Account typeグループ**: SigmaのAccount type（ライセンス）を決定するグループ。各ユーザーは必ず1つだけ所属する。App roleには対応するAccount type（`admin` / `analyze` 等）を割り当てる
-   **Functionalグループ**: SigmaのTeamに対応するグループ。ユーザーは複数所属できる。Account typeの異なるユーザーが混在する
    
    ![](https://cdn-ak.f.st-hatena.com/images/fotolife/c/civitaspo/20260728/20260728065210.png)
    
    ref. [https://community.sigmacomputing.com/t/saml-with-scim-integration-using-microsoft-entra-azure-idp/5425](https://community.sigmacomputing.com/t/saml-with-scim-integration-using-microsoft-entra-azure-idp/5425)
    

このとき、1ユーザーに対して複数のApp Role（Account typeグループ由来のロールと、Functionalグループ由来のロール）がSCIMで連携されることになります。Sigma側は複数ロールを受け取った場合、`view` などの低権限ロールを無視し、残ったロールをAccount typeとして採用します。

たとえば `analyze` と `view` の2つが連携された場合、`view` は無視され、そのユーザーのAccount typeは `analyze` になります。この仕様があるため、FunctionalグループのApp roleには `view` を割り当てておけば、Team所属の連携がAccount typeの決定に干渉しません。逆に言うと、`build` と `analyze` のような低権限ロール以外の組み合わせが連携された場合の優先順位はドキュメント上明確でないため、Account typeグループへの所属は必ず1ユーザー1グループになるよう運用で担保する必要があります。

弊社では、このグループ群を以下の方針でTerraform管理しています。

-   Account typeグループ: `sigma-account-type-{admin,analyze,build,act,view}` という命名で作成し、メンバーは手動管理
-   Functionalグループ: `sigma-team-snowflake-{account}-{role}` という命名で、既存のSnowflake用Entraグループ（弊社ではSnowflakeのロール体系に対応するグループをすでに運用しています）からDynamic Membershipで自動構成。App roleは `view` を割り当て

Functionalグループを既存のSnowflake用グループから導出しているのは、SigmaのTeamとSnowflakeのロールを1:1に対応させるためです。この対応関係を含むSigma側の権限設計については、別の記事で書く予定です。

## おわりに

本記事ではSigmaにおけるMicrosoft Entra IDを使用したSingle Sign-On、およびSCIMプロビジョニングの有効化について説明しました。手順自体はSigma Communityのドキュメントに沿ったものですが、gallery applicationが使えない理由や `aadOptscim062020` フラグの意味など、ドキュメントに書かれていない背景情報を補足できたと思っています。本記事が同様の作業を行う方々の助けになることを願っています。

LayerXでは一緒にデータ基盤を作ってくれる仲間を募集しています。ちょっとでも興味のある方は一度ぜひお話しましょう！ [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)

* * *

1.  SCIMはSystem for Cross-domain Identity Managementの略称ですが、正式名称よりも略称のほうが伝わると考え、この記事では一貫してSCIMプロビジョニングと表記しています。[↩](#fnref:1)