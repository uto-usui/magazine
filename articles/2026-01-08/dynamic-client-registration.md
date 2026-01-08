---
title: "メルカリ内部の Dynamic Client Registration 活用事例"
source: "https://engineering.mercari.com/blog/entry/20251218-26bcec59ba/"
publishedDate: "2025-12-19"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリ IDP チームの [@task(mima)](https://x.com/task4233 "@task(mima)") です。本記事は[メルカリアドベントカレンダー 2025](https://engineering.mercari.com/en/blog/entry/20251126-mercari-advent-calendar-2025/ "メルカリアドベントカレンダー 2025") の 19 日目の記事です。

## はじめに

株式会社メルカリには、グループ全体のシステムの認証と認可を統括する IdP が存在します。本記事では、この IdP における Dynamic Client Registration (以下 DCR とする) の活用事例をご紹介します。活用事例は大きく分けて以下の2つです。

1.  Terraform を用いた OAuth / OIDC クライアントの宣言的な管理
2.  MCP 認可フローにおける動的なクライアント生成

これらの紹介のために、本記事では DCR と関連仕様について触れた後、それぞれの事例について背景とメルカリでの利用例を紹介します。

いずれも認証認可の領域に携わっているエンジニア向けの題材ですが、調査した限りでは DCR 自体の利活用をしたケースは少なかったため、少しでも参考になれば幸いです。なお、認証認可における基本的な概念や用語については説明を割愛します。ご承知おきください。

## 従来の OAuth / OIDC クライアント管理の課題

メルカリの IdP は、メルカリグループの各サービスや、[メルカリと公式連携した越境EC事業者様](https://help.jp.mercari.com/guide/articles/1476/ "メルカリと公式連携した越境EC事業者")に応じて OAuth / OIDC クライアントを登録・管理する必要があります。これらの登録・管理に際して、従来以下のような手作業が必要でした。

-   クライアント情報を登録・編集を目的とした IdP のデータベースに対する SQL 実行
-   作成されたクライアント ID / シークレットの Vault での管理

そのため、変更時の人的ミスやオペレーションコストが従来の課題でした。これらの課題を解決するために、OAuth / OIDC クライアントを機械的に登録・管理する仕組みが必要でした。

そこで白羽の矢が立ったのが DCR でした。

## Dynamic Client Registration (DCR) とは

DCR は、OAuth / OIDC クライアントを動的に登録するための標準仕様です。これにより、API 経由での登録・参照・更新・削除が可能になります。

DCR に関連する仕様は以下の通りです。必要に応じて一次情報を参照してください。

**クライアント登録**

-   OAuth 2.0: [RFC 7591 – OAuth 2.0 Dynamic Client Registration Protocol](https://datatracker.ietf.org/doc/html/rfc7591 "RFC 7591 - OAuth 2.0 Dynamic Client Registration Protocol")
-   OIDC: [OpenID Connect Dynamic Client Registration 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-registration-1_0.html "OpenID Connect Dynamic Client Registration 1.0 incorporating errata set 2")

**クライアント管理**

-   OAuth 2.0: [RFC 7592 – OAuth 2.0 Dynamic Client Registration Management Protocol](https://datatracker.ietf.org/doc/html/rfc7592 "RFC 7592 - OAuth 2.0 Dynamic Client Registration Management Protocol")

続いて、クライアント登録およびクライアント管理のための概要を紹介します。

## クライアント登録フロー

[RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591 "RFC 7591") で定義されている 抽象的な DCR のフローは以下の図 1 の通りです。

```
    +--------(A)- Initial Access Token (OPTIONAL)
    |
    |   +----(B)- Software Statement (OPTIONAL)
    |   |
    v   v
+-----------+                                      +---------------+
|           |--(C)- Client Registration Request -->|    Client     |
| Client or |                                      | Registration  |
| Developer |<-(D)- Client Information ------------|   Endpoint    |
|           |                                      +---------------+
+-----------+
```

**図1: Abstract Dynamic Client Registration Flow(出典: [RFC 7591 Section 1.3](https://datatracker.ietf.org/doc/html/rfc7591#section-1.3))**

この図の「Client Registration Endpoint」は、クライアントを認可サーバーに登録できるように設計された OAuth 2.0 のエンドポイントです。そして、このエンドポイントとの **(C) のリクエストと (D) のレスポンスがDCR のメイン処理**です。(C) で「Client or Developer」が 「Client Registration Endpoint」 に対して、希望する登録メタデータを含むリクエストを送信します。認可サーバは、OAuth クライアントを登録し、(D) でクライアント ID、クライアントシークレット、登録メタデータなどを返却します。

上記フロー図の **(A) と (B) はオプショナルなセキュリティ機構**です。

**(A) Initial Access Token**

-   「Client Registration Endpoint」 へのアクセスを制御するためのトークン
-   誰でも自由にクライアントを登録できる状態を防ぐアクセス制御機構

**(B) Software Statement**

-   クライアントのメタデータを含む署名付き JWT
-   事前承認されたソフトウェアであることを証明
-   詳細は [RFC 7591 Section 3.1.1](https://datatracker.ietf.org/doc/html/rfc7591#section-3.1.1 "RFC 7591 Section 3.1.1") を参照

これらは (C) のリクエストに含めて送信できます。

具体的には、(C) と (D) の基本的なリクエストとレスポンスは以下のようになります。

**リクエスト例:**

```
POST /register HTTP/1.1
Content-Type: application/json
Accept: application/json
Host: server.example.com

{
 "redirect_uris": [
   "https://client.example.org/callback",
   "https://client.example.org/callback2"],
 "client_name": "My Example Client",
 "client_name#ja-Jpan-JP": "クライアント名",
 "token_endpoint_auth_method": "client_secret_basic",
 "logo_uri": "https://client.example.org/logo.png",
 "jwks_uri": "https://client.example.org/my_public_keys.jwks",
 "example_extension_parameter": "example_value"
}
```

**レスポンス例**:

```
HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
 "client_id": "s6BhdRkqt3",
 "client_secret": "cf136dc3c1fc93f31185e5885805d",
 "client_id_issued_at": 2893256800,
 "client_secret_expires_at": 2893276800,
 "redirect_uris": [
   "https://client.example.org/callback",
   "https://client.example.org/callback2"],
 "grant_types": ["authorization_code", "refresh_token"],
 "client_name": "My Example Client",
 "client_name#ja-Jpan-JP": "クライアント名",
 "token_endpoint_auth_method": "client_secret_basic",
 "logo_uri": "https://client.example.org/logo.png",
 "jwks_uri": "https://client.example.org/my_public_keys.jwks",
 "example_extension_parameter": "example_value"
}
```

## クライアント管理

[RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592 "RFC 7592") は、登録されたクライアント情報（Client Metadata）を管理（参照 / 更新 / 削除）する仕組みを定義しています。表1に示す通り、クライアント ID をパスに含む REST API として構成することができます。

表1: Client Metadata を管理する用途とリクエスト例

用途

リクエスト例

参照

GET /register/${clientID}

更新

PUT /register/${clientID}

削除

DELETE /register/${clientID}

これらの仕様を踏まえた上で、活用事例の紹介に移りましょう。

## 活用事例1: Terraform を用いた OAuth / OIDC クライアントの宣言的な管理

### 背景

前述の通り、従来はメルカリグループの OAuth / OIDC クライアントを作成・運用するために、データベースに直接 SQL を実行してクライアント情報を登録していましたが、以下のような課題がありました。

-   変更履歴の追跡が困難
-   レビュープロセスの欠如
-   人的ミスによるセキュリティリスク
-   複数環境（開発・ステージング・本番）での一貫性の維持が困難

これらの課題に対処すべく、OAuth / OIDC クライアントを宣言的に管理する仕組みとして、Terraform と DCR を組み合わせた仕組みを導入しました。

### 実装概要

前提として、[Mercari Microservices Platform における Terraform 0.12 対応](https://engineering.mercari.com/blog/entry/mercari-microservices-platform-terraform-0-12/ "Mercari Microservices Platform における Terraform 0.12 対応 ") で紹介されているように、メルカリでは社内のインフラストラクチャを microservices-terraform と呼ばれる1つのリポジトリで管理しています。この仕組みと DCR を組み合わせることで、Terraform の HCL (HashiCorp Configuration Language) で OAuth / OIDC クライアントを定義し、PR をマージすると自動的にクライアントが生成・更新・削除されます。

![](https://storage.googleapis.com/prd-engineering-asset/2025/12/24c0e16b-untitled-diagram.drawio.png)

**図2. Terraform を用いた OAuth / OIDC クライアントの宣言的な管理の概要図**

例えば、以下の図 3 に示す通り、Terraform の HCL で宣言すると Plan 結果が GitHub 上にコメントとして表示されます。後はマージするだけで自動的に OAuth / OIDC クライアントが作成される仕組みです。

![](https://storage.googleapis.com/prd-engineering-asset/2025/12/0a5665cd-thoughts.png)

**図3: 新しい OAuth / OIDC クライアント登録のための Terraform の HCL 表現とGitHub 上に表示される Terraform の Plan 結果**

この仕組みにより、以下のメリットが得られました。

-   **変更履歴の可視化**: Git によるバージョン管理
-   **レビュープロセスの確立**: PR ベースのワークフロー
-   **自動化**: マージ後の自動適用
-   **IaC**: 宣言的な管理による一貫性の確保

### 技術詳細

Terraform Custom Provider の実装などの技術詳細については、昨年の技術書典16で「OAuth 2.0 Client を Terraform Custom Provider で宣言的に管理してみた」と題して、[Unleash Mercari Tech! vol.3](https://techbookfest.org/product/4JE8riJdXX5y1vBEYq7v8L "Unleash Mercari Tech! vol.3") に寄稿しておりますので、興味のある方はそちらをご覧ください。Terraform の Custom Provider 開発については、[公式ドキュメント](https://developer.hashicorp.com/terraform/plugin "公式ドキュメント") も参考になります。

## 活用事例2: MCP 認可フローにおける動的なクライアント生成

### 背景

メルカリでは、AI-Native な会社への変貌のため、様々な取り組みを実施しています。その取り組みの一環として Mercari MCP サーバを立ち上げました。この MCP サーバは、2025年11月13日に開催された [mercari GEARS 2025](https://gears.mercari.com/ "mercari GEARS 2025") にて、 ChatGPT からメルカリの機能を利用するデモが発表されました。

このデモでは、MCP サーバの認可のために DCR が利用されています。

### メルカリでDCR を採用するに至った経緯

MCP の最新仕様である [Authorization – Model Context Protocol – Version 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization "Authorization - Model Context Protocol - Version 2025-11-25") を追っている方は、「DCR は [Client ID Metadata Document (CIMD)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-00 "Client ID Metadata Document (CIMD)") のフォールバックという位置付けなのでは？」と思われたかもしれません。その通りです。

実際に、 [Authorization – Model Context Protocol – Version 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization "Authorization - Model Context Protocol - Version 2025-11-25") では、クライアント登録のアプローチは次の優先度に従うべき（SHOULD）とされています。

1.  クライアント側で利用可能なサーバの事前登録済情報がある場合、それを利用
2.  認可サーバがサポートしている場合、[Client ID Metadata Document (CIMD)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-00 "Client ID Metadata Document (CIMD)") を利用
3.  認可サーバがサポートしている場合、フォールバックとして DCR を利用
4.  他に手段がない場合は、ユーザにクライアント情報の入力を催促

DCR がこのような位置付けになっている理由として、以下の理由などが挙げられます。

-   登録されるクライアントが無制限に増えるため
-   登録エンドポイント自体が攻撃に利用されるリスクがあるため
-   クライアントの有効性検証ができないため

詳しくは、[Evolving OAuth Client Registration in the Model Context Protocol | Model Context Protocol Blog](https://blog.modelcontextprotocol.io/posts/client_registration/ "Evolving OAuth Client Registration in the Model Context Protocol | Model Context Protocol Blog") をご参照ください。

この優先順位にもかかわらず、メルカリで DCR を選択した理由は以下の通りです。

1.  **実装時期の問題**: MCP サーバの実装を開始した時点では、CIMD の仕様がまだ確定していなかったため([Authorization – Model Context Protocol – Version 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization "Authorization - Model Context Protocol - Version 2025-06-18") では DCR は SHOULD 扱いでした)
2.  **既存実装の活用**: メルカリの IdP では、Terraform による管理のために既に DCR を実装済みであり、新規実装コストが低かったため

これらの理由で当時は DCR を採用しましたが、複数選択肢のある今、それぞれの長所短所を考慮して選定することが好ましいでしょう。

### 実装フロー

MCP サーバでの DCR 利用フローは以下の図 4 の通りです。

![](https://storage.googleapis.com/prd-engineering-asset/2025/12/0ddb0524-mermaid-diagram-2025-12-18-182151.png)

**図4: DCR を利用する場合の認可フローを表すシーケンス図**

図 4 のフローは以下の通り実行されます。

-   1.MCP クライアント（例: ChatGPT）がメルカリの MCP サーバへの接続を開始する
-   2.MCP サーバは、WWW-Authenticate ヘッダとともにステータスコード 401 を返却する
-   3-4. MCP クライアントは、MCP サーバから Protected Resource Metadata を取得し、認可サーバの情報を取得する
-   5-6. MCP クライアントが 認可サーバのメタデータエンドポイントを呼び出して、DCR エンドポイントの情報を取得する
-   7-8. MCP クライアントが、DCR エンドポイント経由で OAuth / OIDC クライアントを作成して、Client Metadata を取得する
-   9-14-. MCP クライアントは、生成された Client Metadata を使用して認可サーバとの間で認可コードフローを実行し、アクセストークンを取得する
-   15-16. MCP クライアントは、取得したアクセストークンでMCP サーバの機能にアクセスしてレスポンスを受け取る

この仕組みにより、各 MCP クライアントに対して動的にクライアントを作成し、適切なスコープで認可を行うことが可能になりました。

## おわりに

本記事では、DCR の活用事例として

1.  Terraform を用いた OAuth / OIDC クライアントの宣言的な管理
2.  MCP 認可フローにおける動的なクライアント生成

の2点を紹介しました。

DCR は IdP を内製化している組織だけでなく、外部 IdP を利用する場合でも有用な仕様です。一方で、MCP 認可フローにおいては先述した優先順位を鑑みて選定すると良いと思います。

本記事が皆様の OAuth / OIDC クライアント管理の参考になれば幸いです。ここまでお読みいただきありがとうございました。

明日の記事は @yuさんです。引き続きお楽しみください。