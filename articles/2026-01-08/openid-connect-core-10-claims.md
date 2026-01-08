---
title: "OpenID Connect Core 1.0 の Claims パラメーターの利用"
source: "https://engineering.mercari.com/blog/entry/20251211-c73c2b1747/"
publishedDate: "2025-12-11"
category: "engineering"
feedName: "Mercari Engineering"
---

## はじめに

こんにちは。メルカリのバックエンドエンジニアの[@kg0r0](https://x.com/kg0r0)です。  
この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/) の11日目の記事です。  
本記事では OpenID Connect Core 1.0 で定義されている Claims パラメーターについて説明し、最後にメルカリでの利用例について紹介します。  
認証認可の領域を担当されているエンジニアの方であれば OpenID Connect Core 1.0 仕様に目を通したことがあるかもしれません。一方で、Claims パラメーターは比較的マイナーなパラメーターであり、利用を実際に検討したケースは多くないのではないかと想定しています。もしここで紹介する内容が OpenID Connect (OIDC) で属性情報を扱ううえでの何かしらの気づきになれば幸いです。

## Claims パラメーターについて

[Claims パラメーター](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)は OpenID Connect Core 1.0 に定義されており、Authentication Request で指定可能なパラメーターの一つです。なお、[OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#section-5.3) などの一部の拡張仕様内でも利用されています。  
Claims パラメーターは JSON オブジェクトとして表現され、以下の例のように `userinfo` や `id_token` といったメンバーによって UserInfo Endpoint や ID Token に含めて返却して欲しい属性情報を指定することができます。

```
 {
   "userinfo":
    {
     "given_name": {"essential": true},
     "nickname": null,
     "email": {"essential": true},
     "email_verified": {"essential": true},
     "picture": null,
     "http://example.info/claims/groups": null
    },
   "id_token":
    {
     "auth_time": {"essential": true},
     "acr": {"values": ["urn:mace:incommon:iap:silver"] }
    }
  }
```

Claims パラメーターは OPTIONAL であり、通常、Relying Party が取得したい属性情報を指定する場合は `scope` パラメーターが使われます。一方で、`claims` パラメーターでは `scope` パラメーターでは指定することができない特定の組み合わせを要求することができます。また、`essential` や `value`、`values` などのメンバーによってより詳細な条件を追加することもできます。  
例えば、[5.5.1. Individual Claims Requests](https://openid-foundation-japan.github.io/openid-connect-core-1_0.ja.html#IndividualClaimsRequests) に記載されている以下の例では `essential` を true にすることで auth\_time が必要であることを示すことができます。

```
 "auth_time": {"essential": true}
```

また、`value` を以下のように利用し sub として特定の値を指定することによって、 login\_hint よりも強制力のある処理をしたいユースケースなどに利用することもできそうです。

```
 "sub": {"value": "248289761001"}
```

一部の [Identity Provider (IdP) 実装](https://www.keycloak.org/docs/latest/server_admin/index.html#_mapping-acr-to-loa-realm)では Authentication Context Class Reference (ACR) を指定する方法として `acr_values` だけでなく `claims` がサポートされており、Level of Assurance (LoA) に基づいた処理に利用することも検討できます。

```
 "acr": {"essential": true,
          "values": ["urn:mace:incommon:iap:silver",
                     "urn:mace:incommon:iap:bronze"]}
```

前述のように Claims パラメーターは、要求する属性情報に追加の条件を付与することを可能とし、Relying Party などが属性情報に基づいた特殊なユースケースを実現する際に利用できる可能性があります。  
一方で、OpenID Connect Core 1.0 中では、Claims パラメーターの扱いに関する要件が複数記載されており、IdP 側の実装には少し複雑な箇所があります。  
例えば、Claims パラメーターの定義において JSON オブジェクトの他に明示的に null を指定することができます。この場合、given\_name はデフォルトの形式で要求されていることを示します。このため、IdP 側の実装によっては、Claims パラメーターをパースする際に明示的に null が指定されたのか値が存在しないため null になっているのか判断が必要な場合が考えられます。

```
 "given_name": null
```

また、各メンバーのデフォルトの動作を正しく適用する必要があり、例えば、`essential` は OPTIONAL であるため明示的に true または false が指定される以外にも、デフォルトの動作として false が指定された通りに Voluntary Claim として扱う必要があります。

上記の通り、 Claims パラメーターは JSON オブジェクトで表現され、良くも悪くも自由度が高い構造になっています。また、OP 側の各メンバーの処理に関する要件が仕様中に複数記載されています。このため、実装が複雑になることを避けるためには、一度 Claims パラメーター以外のシンプルな方法がないか検討した方が良いかもしれません。

## メルカリでの利用例

現在、メルカリでは [RFC 9470 OAuth 2.0 Step Up Authentication Challenge Protocol](https://www.rfc-editor.org/rfc/rfc9470.html) で定義されているような LoA に基づく Step Up Authentication のメカニズムが導入されています。  
例えば、Client が Protected Resource にリクエストする際に Protected Resource が要求する LoA を満たしていなければ、Client はその LoA を満たすことができるように acr\_values を指定して Authorization Request をおこなうといった流れになります。  
ここで、Protected Resource が要求する ACR が mf (multi factor) だとします。このとき、Password のみで認証されていた場合は、MFA を実施するように誘導され、必要に応じて電話番号などの登録をおこないます。なお、Password + SMS などで認証済みであれば要求を満たすことができ、FIDO といった phishing resistant な MFA で認証済みであっても同様に要求が満たすことができます。  
しかし、もし Protected Resource が電話番号を必要とするサービスであった場合、FIDO によって認証されたユーザーは要求された LoA は満たしますが必要な属性情報は登録済みでない可能性があります。ここで、Claims パラメーターを利用して以下のように検証済みの電話番号が必要であることを伝えます。これにより、IdP に対して一度の Authorization Request の中で電話番号の登録が必要であることも伝達して誘導することができます。

```
 "phone_number_verified": {"value": true}
```

## おわりに

本記事では OpenID Connect Core 1.0 で定義されている Claims パラメーターについて説明し、メルカリでの利用例についても紹介しました。Claims パラメーターは OpenID Connect Core 中に記載されている仕様ですが、あまり触れられていることが少ないと感じたためこの度記事にしてみました。実現したい処理をまずは標準仕様の中で行うことができないか検討することは、独自仕様の追加を避けて処理の透明性などを担保することに繋がると考えています。また、OpenID Connect Core など何度も読んだ仕様だとしても改めて読むと新しい気づきがあったりするのでオススメです。  
明日の記事は @tokkuさんです。引き続きお楽しみください。