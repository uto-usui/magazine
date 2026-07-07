---
title: "Snowflake から Google Cloud へ Workload Identity Federation （OIDC）で接続する"
source: "https://tech.layerx.co.jp/entry/snowflake-outbound-wif-to-google-cloud"
publishedDate: "2026-07-06"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://twitter.com/Civitaspo)です。2026年7月1日、Snowflake の新機能 [Workload identity federation for Snowflake workloads that access external services](https://docs.snowflake.com/en/release-notes/2026/other/2026-07-01-wif-snowflake-workloads-external-services) が GA になりました。一言でいうと「Snowflake 自身が OIDC Providerとなり、Snowflake 内のワークロードが外部サービスに対して、静的キー不要で認証できる」機能です。機能名が長いので、本記事では「Snowflake Outbound WIF」と表記します。 [docs.snowflake.com](https://docs.snowflake.com/en/release-notes/2026/other/2026-07-01-wif-snowflake-workloads-external-services)

本記事では、実際に Snowflake アカウントと Google Cloud プロジェクトを使って動作検証した内容をもとに、この機能の仕組みと使い方を解説します。なお、本記事に記載している SQL・gcloud・curl のコマンドはすべて実際に動作確認したものですが、アカウント名や Google Cloud プロジェクト ID などの識別子はダミーに置き換えているため、お手元で試す際はご自身の保有するアカウント等の識別子に変更してください。

-   [Snowflake Outbound WIF によって何が解決されるのか](#Snowflake-Outbound-WIF-によって何が解決されるのか)
-   [Snowflake Outbound WIF 機能 #とは](#Snowflake-Outbound-WIF-機能-とは)
    -   [Snowflake Inbound WIF との違い](#Snowflake-Inbound-WIF-との違い)
    -   [Snowflake Outbound WIF で ID Token を発行するまでの3ステップ](#Snowflake-Outbound-WIF-で-ID-Token-を発行するまでの3ステップ)
-   [Snowflake Outbound WIF Deep Dive](#Snowflake-Outbound-WIF-Deep-Dive)
    -   [トークンフローの全体像](#トークンフローの全体像)
    -   [DESC SECRET で得られる identifer と issuer URL の構造](#DESC-SECRET-で得られる-identifer-と-issuer-URL-の構造)
    -   [発行される JWT の Claim](#発行される-JWT-の-Claim)
    -   [aud claim は外部サービス側の token 検証で使われる](#audclaim-は外部サービス側の-token-検証で使われる)
        -   [外部サービス側での検証](#外部サービス側での検証)
        -   [Snowflake 側で制御できること](#Snowflake-側で制御できること)
-   [Snowflake から Google Cloud へ Workload Identity Federation を使って接続する（CLI編）](#Snowflake-から-Google-Cloud-へ-Workload-Identity-Federation-を使って接続するCLI編)
    -   [① Workload Identity プールとプロバイダの作成](#-Workload-Identity-プールとプロバイダの作成)
    -   [② サービスアカウントへのImpersonation権限付与](#-サービスアカウントへのImpersonation権限付与)
    -   [③ Snowflake で ID トークンを発行](#-Snowflake-で-ID-トークンを発行)
    -   [④ STS で Token exchange](#-STS-で-Token-exchange)
    -   [⑤ サービスアカウントのアクセストークンを取得](#-サービスアカウントのアクセストークンを取得)
-   [Snowflake から Google Cloud へ Workload Identity Federation を使って接続する（Snowpark編）](#Snowflake-から-Google-Cloud-へ-Workload-Identity-Federation-を使って接続するSnowpark編)
    -   [get\_generic\_secret\_string では読めない](#get_generic_secret_string-では読めない)
    -   [google-auth のカスタム SubjectTokenSupplier](#google-auth-のカスタム-SubjectTokenSupplier)
    -   [External Access Integration の要件](#External-Access-Integration-の要件)
-   [運用上の注意](#運用上の注意)
    -   [ID Tokenの有効期限は15分固定](#ID-Tokenの有効期限は15分固定)
    -   [トークン発行はプライマリアカウントのみ](#トークン発行はプライマリアカウントのみ)
    -   [issuer / subject は Trust Relationship 設定用の識別情報](#issuer--subject-は-Trust-Relationship-設定用の識別情報)
    -   [sf\_rnm claim で外部サービス側の認証条件を最小化できる](#sf_rnm-claim-で外部サービス側の認証条件を最小化できる)
    -   [トークン発行はクエリ履歴と監査ログで追える](#トークン発行はクエリ履歴と監査ログで追える)
-   [まとめ](#まとめ)

## Snowflake Outbound WIF によって何が解決されるのか

Snowflake から外部サービス（BigQuery、GCS、各種 API など）にアクセスするワークロードを組むとき、これまで利用可能だった認証方法は「サービスアカウントキーなどの静的なクレデンシャルを Snowflake のシークレットに保存して使用する」方法でした。たとえば Google Cloud のサービスアカウントキー JSON を `GENERIC_STRING` 型のシークレットに入れ、ストアドプロシージャや外部関数から読み出す構成です。

この構成には以下のような問題があります。

-   ローテーションの運用負荷: キーの有効期限管理と定期ローテーションを人間（または別の仕組み）が回し続ける必要がある
-   漏洩リスク: 静的キーはコピーできてしまう。Snowflake の外に持ち出されても本人性の検証ができない
-   監査の難しさ: キーがどこで使われたのかをキー自体からは追えない

クラウド間の認証ではこの問題を解決する手法として Workload Identity Federation（WIF）が普及してきました。GitHub Actions から Google Cloud に OIDC で認証する構成や AWS/Google Cloud 間で OIDC 認証する構成などで使用される方法です。昨今では、静的な Credentials を Cloud Provider の認証で使用するケースの方が少ないのではないでしょうか。

今回の新機能は、このOIDC プロバイダ（トークン発行側）の役割を Snowflake 自身が担えるようにするものです。静的キーを一切保存せず、有効期限15分の短命トークンだけで外部サービスに認証できるようになります。

## Snowflake Outbound WIF 機能 #とは

## Snowflake Inbound WIF との違い

Snowflake には2025年に GA した「Workload identity federation（Inbound）」がすでにあります。これは AWS や Google Cloud 上の外部ワークロードから Snowflake に対して認証するための機能で、Snowflake はトークンの検証側でした。

今回紹介する Snowflake Outbound WIF は逆方向です。Snowflake 内のワークロードが外部サービスに認証する、「Workload identity federation（Outbound）」 であり、Snowflake がトークンの発行側（OIDC プロバイダ）になります。

Snowflake Inbound WIF (2025 GA)

Snowflake Outbound WIF (2026-07-01 GA)

方向

外部 → Snowflake

Snowflake → 外部

Snowflake の役割

トークン検証側 (Relying Party)

トークン発行側 (OIDC Provider)

置き換わるもの

Snowflake ユーザーのパスワード/キーペア

外部サービスの静的クレデンシャル

## Snowflake Outbound WIF で ID Token を発行するまでの3ステップ

Snowflake Outbound WIF では、Snowflake が OIDC Provider として Snowflake 上の workload に ID Token（JWT） を発行し、外部サービスがその token を検証してアクセスを許可します。

セットアップから実行時の Token 発行まで、流れは次の3ステップに分かれます。

1.  Snowflake 側で workload を登録する（Secret の作成）
    -   `WORKLOAD_IDENTITY_FEDERATION` 型の Secret を作成します。Secret を作ると、Snowflake が ID token の発行元（OIDC Provider）になり、その workload が token を受け取る主体（OIDC client）として登録されます。1 つの workload に対して Secret は 1 つ（1:1）ですが、同じ Secret から複数の外部サービス向けに token を発行できます。
2.  外部サービス側と Trust Relationship を結ぶ（issuer URL と subject の共有）
    -   `DESC SECRET` で issuer URL（`workload_identity_federation_issuer`）と subject（`workload_identity_federation_subject`）を取得し、認証先の外部サービス側に渡します。外部サービスは、受け取った ID token の `iss` / `sub` claim がこの値と一致するかで、「Snowflake が発行した token か」を判断します。
3.  認証時に ID token を発行する（システム関数の呼び出し）
    -   workload が外部サービスへアクセスするたびに、`SYSTEM$ISSUE_WORKLOAD_IDENTITY_FEDERATION_TOKEN` を呼び出して短命の ID token を取得します。送信先の外部サービスは、token 発行時の `aud` claim で指定します。

Secret の作成は型指定だけです。

CREATE SECRET my\_db.auth.my\_workload
  TYPE = WORKLOAD\_IDENTITY\_FEDERATION;

この Secret には API キーのような「保存された認証情報」は入りません。issuer URL と subject など、Snowflake Outbound WIF に必要な登録情報が Secret の属性として記録され、以降の token 発行と外部サービス側の検証に使われます。

## Snowflake Outbound WIF Deep Dive

## トークンフローの全体像

Google Cloud を外部サービスとした場合のフローは次のようになります。

sequenceDiagram
    participant W as Snowflakeワークロード<br>(プロシージャ等)
    participant SF as Snowflake<br>(OIDCプロバイダ)
    participant STS as Google Cloud STS<br>(sts.googleapis.com)
    participant IAM as Google Cloud IAM Credentials<br>(iamcredentials.googleapis.com)
    participant API as Google Cloud API<br>(BigQuery / GCSなど)

    W->>SF: SYSTEM$ISSUE\_WORKLOAD\_IDENTITY\_FEDERATION\_TOKEN(secret, aud)
    SF-->>W: ID Token (RS256 JWT, 有効期限15分)
    W->>STS: token-exchange (subjectToken = ID Token)
    Note over STS: issuer の jwks\_uri から公開鍵を取得し<br>署名・iss・sub・aud を検証
    STS-->>W: federated access token
    W->>IAM: generateAccessToken (Service Account Impersonation)
    IAM-->>W: Service Account Access Token (1時間)
    W->>API: Authorization: Bearer <Service Account Access Token>

## DESC SECRET で得られる identifer と issuer URL の構造

シークレットを作成したら `DESC SECRET` を実行します。

DESC SECRET my\_db.auth.my\_workload;

出力（16カラム）のうち重要なのは次の2つです。

-   `workload_identity_federation_issuer`
    -   例: `https://identity.snowflake.com/oauth2/31303030/39393939/58593132333435`
    -   ID Token の `iss` Claim になる。認証先の外部サービス側との Trust Relationship 設定で使う。
-   `workload_identity_federation_subject`
    -   例: `identity_0123abcd...`（`identity_` + 64桁の16進数）
    -   ID Token の `sub` Claim になる。認証先の外部サービス側との Trust Relationship 設定で使う。

issuer URL をよく見ると、パスセグメントが 16 進エンコードされた ASCII 文字列になっていることに気づきます。試しにデコードしてみると…

$ echo 31303030 | xxd -r -p
1000
$ echo 58593132333435 | xxd -r -p
XY12345

最後のセグメントはアカウントロケータ（この例では `XY12345`）のエンコードでした。そのため、issuer URL はアカウントごとに一意になっています。また、この issuer URL は標準的な OIDC Discovery に対応しており、`<issuer>/.well-known/openid-configuration` を GET すると `jwks_uri` を含むメタデータが返ってきます。外部サービス（Google Cloud STS など）はこの `jwks_uri` から公開鍵を取得して JWT の署名を検証します。特別なプロトコルは何もなく、素直な OIDC 実装です。

## 発行される JWT の Claim

トークン発行はシステム関数を呼ぶだけです。`aud` は JSON 形式で指定します。

SELECT SYSTEM$ISSUE\_WORKLOAD\_IDENTITY\_FEDERATION\_TOKEN(
  'my\_db.auth.my\_workload',
  '{"aud": "https://iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/providers/snowflake-provider"}'
);

返ってくるのは RS256 署名の JWT です。デコードすると次の Claim が確認できました。

Claim

内容

`iss`

シークレットの issuer URL

`sub`

シークレットの subject (`identity_...`)

`aud`

関数呼び出し時に指定した値がそのまま入る

`iat` / `nbf` / `exp`

発行時刻・有効開始・有効期限。`exp - iat` は900秒（15分）

`jti`

トークン毎に一意な ID

`sf_onm`

Snowflake の組織名（例: `MYORG`）

`sf_anm`

アカウント名（例: `MYACCOUNT`）

`sf_rnm`

この関数を呼び出したロール名

`sf_aid` / `sf_oid`

アカウント/組織の不透明な内部 ID

注目すべきは Snowflake 独自の `sf_*` Claim、特に `sf_rnm` です。トークンを発行した Snowflake ロールの名前が Claim として埋め込まれるため、受け取り側（Google Cloud など）で「特定のロールから発行されたトークンだけを Trust する」という属性条件を組めます。そのため、subject 単位より細かいアクセス制御が可能となります。

## `aud` claim は外部サービス側の token 検証で使われる

`SYSTEM$ISSUE_WORKLOAD_IDENTITY_FEDERATION_TOKEN` の第2引数で指定する `aud` は、発行される ID token の audience claim になります。1 つの Secret から複数の外部サービス向けに token を発行する場合、送信先ごとに `aud` を変えます。

SELECT SYSTEM$ISSUE\_WORKLOAD\_IDENTITY\_FEDERATION\_TOKEN(
  'my\_db.auth.my\_workload',
  '{"aud": "example-cloud-service.com"}');

[docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/functions/system_issue_workload_identity_federation_token)

Snowflake は、指定された `aud` を token に埋め込むだけです。値が外部サービス側で登録済みかどうかは確認しません。

##### 外部サービス側での検証

外部サービスは token を受け取ったとき、`iss` や `sub` とあわせて `aud` も検証します。Google Cloud Workload Identity プールプロバイダでは、登録した audience と一致しない `aud` の token を Security Token Service（STS）に送ると、次のエラーで拒否されました。

invalid\_grant: The audience in ID Token \[...\] does not match the expected audience

`aud` の検証は外部サービス側の設定次第です。プロバイダに audience を登録しておけば、想定外の `aud` の token はここで弾かれます。

##### Snowflake 側で制御できること

Snowflake 側で制御できるのは、token を発行できる主体の限定です。Secret の `OWNERSHIP` 権限 もしくは `USAGE` 権限によって、誰が `SYSTEM$ISSUE_WORKLOAD_IDENTITY_FEDERATION_TOKEN` を呼び出せるかを決定します。

`iss` / `sub` / `aud` が正しいかどうかの判断は、外部サービス側の token 検証に委ねられています。`aud` はその検証で使われる claim の一つで、Snowflake 側で audience を絞り込む仕組みはありません。audience の制限が必要な場合は、外部サービス側のプロバイダ設定（issuer・subject・audience・属性条件など）で行います。

ここからは CLI を使って「Snowflake が発行した ID Token を使用して、Google Cloud の Service Account へ Impersonation し、アクセストークンを取得する」方法を理解します。

前提として、Google Cloud プロジェクト `my-google-cloud-project`（プロジェクト番号 `000000000000`）、Snowflake 側は前述のシークレット `my_db.auth.my_workload` が作成済みで、`DESC SECRET` の issuer / subject を取得できている、とします。

## ① Workload Identity プールとプロバイダの作成

gcloud iam workload-identity-pools create snowflake-pool \\
  --project=my-google-cloud-project \\
  --location=global

gcloud iam workload-identity-pools providers create-oidc snowflake-provider \\
  --project=my-google-cloud-project \\
  --location=global \\
  --workload-identity-pool=snowflake-pool \\
  --issuer-uri="https://identity.snowflake.com/oauth2/31303030/39393939/58593132333435" \\
  --attribute-mapping="google.subject=assertion.sub" \\
  --attribute-condition="assertion.sub == 'identity\_0123abcd...'"

`--issuer-uri` と `--attribute-condition` の subject には、`DESC SECRET` で得た値をそのまま使います。 `—-attribute-condition` で subject を固定しておくことで、同じ Snowflake アカウントの別シークレット（別ワークロード）からのトークンを弾けます。また `sf_rnm` を使用することで、別のロールからのアクセスも弾くことができます。

## ② サービスアカウントへのImpersonation権限付与

gcloud iam service-accounts add-iam-policy-binding \\
  my-sa@my-google-cloud-project.iam.gserviceaccount.com \\
  --project=my-google-cloud-project \\
  --role="roles/iam.workloadIdentityUser" \\
  --member="principal://iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/subject/identity\_0123abcd..."

`DESC SECRET` で取得した subject を使用して、サービスアカウント `my-sa@my-google-cloud-project.iam.gserviceaccount.com` に対する Impersonation を許可します。

## ③ Snowflake で ID トークンを発行

SELECT SYSTEM$ISSUE\_WORKLOAD\_IDENTITY\_FEDERATION\_TOKEN(
  'my\_db.auth.my\_workload',
  '{"aud": "https://iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/providers/snowflake-provider"}'
);

先ほど説明したとおり、ここで指定する `aud` claim はアクセス先の外部サービスによって検証されます。Google Cloud の Workload Identity Pool Provider の場合は `allowedAudiences` というパラメータに指定された値に応じて検証します。 [cloud.google.com](https://cloud.google.com/iam/docs/reference/rest/v1/projects.locations.workloadIdentityPools.providers#oidc)

本記事の構成では `allowedAudiences` を未設定にしているため、JWT の `aud` は provider の canonical resource name と一致させる必要があります。以下のどちらでも構いません。

-   `https://iam.googleapis.com/projects/.../providers/...`
-   `//iam.googleapis.com/projects/.../providers/...`

慣習的には、手順④の STS リクエストで使う provider 名と同じ文字列を `aud` に入れることが多いですが、JWT の `aud` と STS の `audience` は別フィールドです。手順4の `audience` は「どの provider に token exchange するか」を指定するもので、JWT の `aud` の検証条件とは無関係です。値が似ているため混同しやすいので、手順③ではあくまで Google Cloud の OIDC provider 設定に従って `aud` を決めてください。

## ④ STS で Token exchange

curl -s https://sts.googleapis.com/v1/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "grantType": "urn:ietf:params:oauth:grant-type:token-exchange",
    "audience": "//iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/providers/snowflake-provider",
    "scope": "https://www.googleapis.com/auth/cloud-platform",
    "requestedTokenType": "urn:ietf:params:oauth:token-type:access\_token",
    "subjectTokenType": "urn:ietf:params:oauth:token-type:jwt",
    "subjectToken": "<手順3で得たIDトークン>"
  }'

`audience` には、token exchange の宛先となる Workload Identity Pool Provider の full resource name を指定します。 [docs.cloud.google.com](https://docs.cloud.google.com/iam/docs/reference/sts/rest/v1/TopLevel/token)

形式は `//iam.googleapis.com/projects/.../providers/...` です。これは手順③で JWT に入れた `aud` とは別のフィールドで、値を揃える必要はありません。`subjectToken` に含まれる JWT の `aud` は、手順2で設定した provider の `allowedAudiences` に従って別途検証されます。

成功すると federated access token が返ります。レスポンスの `expires_in` は、発行された access token の有効秒数です。Token exchange では、出力トークンの有効期限が入力トークンの期限の影響を受ける場合があります[1](#fn:1)。今回の検証では、JWT 発行から STS 交換まで数十秒経過した時点で、約831秒が返りました。

## ⑤ サービスアカウントのアクセストークンを取得

curl -s -X POST \\
  "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/my-sa@my-google-cloud-project.iam.gserviceaccount.com:generateAccessToken" \\
  -H "Authorization: Bearer <手順4で得たfederated token>" \\
  -H "Content-Type: application/json" \\
  -d '{"scope": \["https://www.googleapis.com/auth/cloud-platform"\]}'

これで通常の1時間有効なサービスアカウントのアクセストークンが得られ、サービスアカウントに付与された権限の範囲内で Google Cloud のサービスにアクセスできるようになります。

## Snowflake から Google Cloud へ Workload Identity Federation を使って接続する（Snowpark編）

より実践的な内容として Snowpark で Google Cloud へ Workload Identity Federation を使って接続する方法も紹介します。

実装にあたって、Snowflake の Snowpark 特有の制約がいくつかあります。

## `get_generic_secret_string` では読めない

通常のシークレットはプロシージャ内から `_snowflake.get_generic_secret_string()` で読み出しますが、`WORKLOAD_IDENTITY_FEDERATION` 型のシークレットはこの API では読めません。そもそも「保存された文字列」が存在しないためです。代わりに、プロシージャに渡ってくる Snowpark セッションを通じてシステム関数を SQL として実行します。

## google-auth のカスタム SubjectTokenSupplier

google-auth ライブラリの `identity_pool.Credentials` は、外部からトークンを供給する `SubjectTokenSupplier` インターフェースを持っています。ここに「Snowpark セッション経由でシステム関数を呼ぶ」実装を差し込むと、STS 交換と SA インパーソネーションはライブラリに丸投げできます。骨格はこれだけです。

import json
from google.auth import identity\_pool

class SnowflakeSubjectTokenSupplier(identity\_pool.SubjectTokenSupplier):
    def \_\_init\_\_(self, session, secret\_name, jwt\_audience):
        self.\_session = session
        self.\_secret\_name = secret\_name
        self.\_jwt\_audience = jwt\_audience

    def get\_subject\_token(self, context, request):
        row = self.\_session.sql(
            "SELECT SYSTEM$ISSUE\_WORKLOAD\_IDENTITY\_FEDERATION\_TOKEN(?, ?)",
            params=\[self.\_secret\_name, json.dumps({"aud": self.\_jwt\_audience})\],
        ).collect()
        return row\[0\]\[0\]

credentials = identity\_pool.Credentials(
    audience="//iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/providers/snowflake-provider",
    subject\_token\_type="urn:ietf:params:oauth:token-type:jwt",
    subject\_token\_supplier=SnowflakeSubjectTokenSupplier(
        session,
        "my\_db.auth.my\_workload",
        "https://iam.googleapis.com/projects/000000000000/locations/global/workloadIdentityPools/snowflake-pool/providers/snowflake-provider",
    ),
    service\_account\_impersonation\_url=(
        "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/"
        "my-sa@my-google-cloud-project.iam.gserviceaccount.com:generateAccessToken"
    ),
    scopes=\["https://www.googleapis.com/auth/cloud-platform"\],
)

トークンは短命ですが、google-auth が有効期限を見て自動的に再発行・再交換してくれるため、長時間のジョブでも呼び出し側は何も意識する必要がありません。

実装例として、拙作の dbt パッケージ [dbt-snowflake-iceberg-sync](https://github.com/civitaspo/dbt-snowflake-iceberg-sync) を公開実装として紹介しておきます。 [speakerdeck.com](https://speakerdeck.com/civitaspo/using-iceberg-for-cost-effective-bigquery-data-access-from-snowflake) [github.com](https://github.com/civitaspo/dbt-snowflake-iceberg-sync/blob/b03f5b382fd3c5b745d18f8b691681deb89ee063/procedure/google_cloud_auth.py#L50-L106)

この dbt パッケージは Snowflake 内で Python ストアドプロシージャとして Snowpark を実行し、BigQuery / GCS のデータを Snowflake 管理の Iceberg テーブルに同期するパッケージです。従来は Google Cloud 認証に静的なサービスアカウントキー（`GENERIC_STRING` シークレット）が必要でしたが、Snowflake Outbound WIF に対応したことで、サービスアカウントに紐づく静的なキーが不要の運用が可能になりました。

## External Access Integration の要件

プロシージャから Google Cloud のエンドポイントへ出ていくため、外部アクセス統合には STS と IAM Credentials への egress 許可が必要です。また、WIF シークレットを `ALLOWED_AUTHENTICATION_SECRETS` に含めておく必要があります。

CREATE OR REPLACE NETWORK RULE my\_db.auth.Google Cloud\_auth\_rule
  MODE = EGRESS
  TYPE = HOST\_PORT
  VALUE\_LIST = ('sts.googleapis.com', 'iamcredentials.googleapis.com');

CREATE OR REPLACE EXTERNAL ACCESS INTEGRATION Google Cloud\_auth\_eai
  ALLOWED\_NETWORK\_RULES = (my\_db.auth.Google Cloud\_auth\_rule)
  ALLOWED\_AUTHENTICATION\_SECRETS = (my\_db.auth.my\_workload)
  ENABLED = TRUE;

上記は Snowflake Outbound WIF 認証に関して必要な設定のみを記載していますが、実際にはアクセス先の Google Cloud サービスのエンドポイントへの egress も併せて必要です。

## 運用上の注意

最後に、設計・運用時に押さえておきたいポイントをまとめます。

## ID Tokenの有効期限は15分固定

発行された JWT は900秒で失効し、STS で得られる federated token もその残り時間に切り詰められます。長時間処理では都度再発行する設計にしてください。google-auth のような成熟したライブラリを使えば自動処理されます。

## トークン発行はプライマリアカウントのみ

レプリケーション構成では、issuer URL と subject はフェイルオーバー後もそのまま維持され、issuer URL は自動的に新しいプライマリを指すため外部サービス側の設定変更は不要です。ただし `SYSTEM$ISSUE_WORKLOAD_IDENTITY_FEDERATION_TOKEN` はリードオンリーのセカンダリでは失敗するため、トークン発行を伴うジョブは常にプライマリで実行する必要があります。

## issuer / subject は Trust Relationship 設定用の識別情報

`DESC SECRET` で得られる `workload_identity_federation_issuer` と `workload_identity_federation_subject` は、受け取り側が `iss` / `sub` を照合するための値です。これらだけで Google Cloud の権限が得られるわけではなく、サービスアカウントキーやアクセストークンそのものとは性質が異なります。一方で、当然ですが公開する理由もありません。実運用では private repository や環境別 Terraform 設定に置くくらいが妥当で、本当に厳密に守るべきなのは トークンを発行できる Snowflake 側の権限 と 実際に発行された短命トークン です。

## `sf_rnm` claim で外部サービス側の認証条件を最小化できる

Google Cloud のプロバイダ設定では `assertion.sub` だけでなく Snowflake 独自 Claim も条件に使えます。たとえば「`ETL_ROLE` が発行したトークンのみ許可」という条件は次のように書けます。

\--attribute-condition="assertion.sub == 'identity\_0123abcd...' && assertion.sf\_rnm == 'ETL\_ROLE'"

シークレットへの GRANT が広めになってしまう環境でも、受け取り側で発行ロールを絞れるので、実運用では設定を必須とすべきでしょう。

## トークン発行はクエリ履歴と監査ログで追える

静的キーと比べて見通しがよくなる点も、Snowflake Outbound WIF の利点のひとつです。Snowflake 側では `SYSTEM$ISSUE_WORKLOAD_IDENTITY_FEDERATION_TOKEN` の呼び出しがクエリ履歴に残り、誰が（どのロールが）いつ発行したかを後からたどれます。発行された JWT には `jti`（トークンごとの一意 ID）と `sf_rnm`（発行時の Snowflake ロール名）が含まれるため、外部サービス側のログと突き合わせる手がかりになります。Google Cloud では Security Token Service への token exchange やサービスアカウントの impersonation が [Cloud Audit Logs](https://cloud.google.com/iam/docs/audit-logging) に記録されます。

[Identity and Access Management audit logging  |  Identity and Access Management (IAM)  |  Google Cloud Documentation](https://docs.cloud.google.com/iam/docs/audit-logging)

`sf_rnm` を attribute condition に使っている場合、Google Cloud 側の Reject ログから「許可されていないロールが発行したトークン」も判別できます。インシデント調査や定期レビューでは、Snowflake のシークレット GRANT 一覧・クエリ履歴と、Google Cloud の監査ログをあわせて確認する運用が現実的です。

## まとめ

Snowflake が OIDC Provider として振る舞える Outbound WIF 機能が一般提供開始となりました。これにより、Snowflake 内のワークロードが外部サービスに静的キーなしで認証できるようになりました。サービスアカウントキーの保管やローテーションという運用負荷を減らしつつ、短命トークンと監査ログで追跡できる認証に移行できます。 本記事では、その仕組みと Google Cloud 向けの検証手順を紹介しました。Snowflake から Google Cloud への認証において、静的なキーを不要にできるため、よりセキュアな運用が可能となります。同様の構成をお持ちの方はぜひ手元で試してみてください。 なお、AWS に対する Workload Identity Federation についても近々検証し、記事として公開する予定です。乞うご期待！！

LayerXでは一緒にデータ基盤を作ってくれる仲間を募集しています。ちょっとでも興味のある方は一度ぜひお話しましょう！ [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)

* * *

1.  [https://www.rfc-editor.org/rfc/rfc8693.html](https://www.rfc-editor.org/rfc/rfc8693.html)[↩](#fnref:1)