---
title: "3PCA 27 日目: FedCM"
source: "https://blog.jxck.io/entries/2023-12-29/fedcm.html"
publishedDate: "2023-12-29"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Federated Credential Management](#federated-credential-management)

### [認証連携](#認証連携)

あるサイト(RP)の認証を別のサイト(IDP)の認証で行いたい場合、両者の連携は 3rd Party Cookie で行われてきた。

例えば、RP に IDP を `<iframe>` で埋め込み、IDP に対するログイン済みの Cookie があれば、その情報を JS で RP に渡して認証済みにするといった構成だ。

これは、`<iframe>` の中が Partition されているため、SAA などを使わない限りアクセスできなくなった。SAA が入る前の ITP 対策としてよく行われていたのは、一旦 IDP のページに遷移し、そこでジェスチャを発生させ、認証結果をクエリに付けて RP にリダイレクトバックする方法だった。詳細は過去の記事で解説している。

これは SSO などでも使われており、3rd Party Cookie を用いたユースケースとしてはかなりポジティブなものとして捉えられている。

### [FedCM API](#fedcm-api)

このユースケースと、関連する認証周りをそのままブラウザ API に落とし込んだ提案として WebID があった。今は名前が変わって FedCM になっている。

-   fedidcg/FedCM: A privacy preserving identity exchange Web API
    -   [https://github.com/fedidcg/FedCM](https://github.com/fedidcg/FedCM)

簡単に言えば、ブラウザに対して IDP に対するログインの処理を委譲できる。もしログイン済みでなければ、IDP のログイン画面を表示し、そこからログインができる。(画像は Google のドキュメントから引用)

  ![fedcm-login-popup](https://blog.jxck.io/entries/2023-12-29/fedcm-login-popup.png?240212_235833)

ブラウザが IDP に送信するリクエストには Cookie が付与されるため、セッションの有無で認証を連携することができるのだ。もしログイン済みなら、そのアカウントをブラウザの UI で表示し、選択することができる。ブラウザのネイティブ UI だが、多少のカスタマイズも可能だ。

  ![FedCM Account Chooser](https://blog.jxck.io/entries/2023-12-29/fedcm-account-chooser.png?240212_235833)

これを RP 側で呼び出すには、基本的には JS を多少呼び出せば対応できるため、RP 側のコストはそこまで高くはないだろう。API は Credential Management API の拡張として定義されている。

```
const credential = await navigator.credentials.get({
  identity: {
    providers: [
      {
        configURL: "https://idp.example/config",
        clientId: "https://rp.example",
        nonce
      }
    ]
  },
  mediation: "optional"
})
const { token } = credential
console.log({ token })
```

この API を呼び出すと、ブラウザは裏で IDP にリクエストを送信し、必要な情報を収集する。そのため、IDP 側は FedCM のための `/.well-known` エンドポイントなどを追加する必要がある。

既存の実装の上に FedCM とのダンスのための口を追加するような対応が必要になるだろう。

まだ `chrome://fedcm-internals` が無いため、ブラウザが裏側で行っている処理が見えにくく、エラーでハマるとデバッグが面倒だ。

### [iframe からの呼び出し](#iframe-からの呼び出し)

FedCM は `<iframe>` の中からも呼び出すことができる。

```
<iframe src="https://embedded.example" allow="identity-credentials-get"></iframe>
```

これは、例えば YouTube を埋め込んでいるがログイン済みにならず、課金しているのに広告が出てしまうといったケースをカバーできる可能性がある。

つまり、認証を繋ぐだけであれば、SAA や CHIPS に頼らずともユースケースを実現できる可能性がありそうだ。

ただ、これがどこまでどういった制限を持っているのかは、正直まだ筆者にもあまりわかっておらず、実際に使っているケースもまだ見ていないため、今後検証したい。