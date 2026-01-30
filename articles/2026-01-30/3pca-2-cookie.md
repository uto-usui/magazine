---
title: "3PCA 2 日目: Cookie による区別と識別"
source: "https://blog.jxck.io/entries/2023-12-02/3pca-cookie.html"
publishedDate: "2023-12-02"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

このエントリは、3rd Party Cookie Advent Calendar の 2 日目である。

-   3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
    -   [https://qiita.com/advent-calendar/2023/3rd-party-cookie](https://qiita.com/advent-calendar/2023/3rd-party-cookie)

## [Cookie とは](#cookie-とは)

例として、[https://example.com](https://example.com/) が以下のようなレスポンスを返すとする。

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Set-Cookie: deadbeef

<!doctype html>

...
```

ブラウザは次に [https://example.com](https://example.com/) にアクセスするとき、必ずこの `Set-Cookie` の値を `Cookie` に載せて送信する。

```
GET / HTTP/1.1
Host: example.com
Accept: text/html
Cookie: deadbeef
```

なお、この値は任意の文字列を指定可能だ。

## [Cookie による区別](#cookie-による区別)

さて、このように「送ったら次から送り返してくる」というシンプルな仕組みで、いったい何ができるのだろうか?そもそも何が嬉しいのか? これが重要だ。

例えば、ユーザが最初にアクセスしてくるときは `Cookie` を送ってこないため、「`Cookie` のないユーザは新しくアクセスしてきたユーザだ」ということがわかる。

```
GET / HTTP/1.1
Host: example.com
Accept: text/html

# Cookie が無いので新規訪問
```

このレスポンスで、そのユーザに一意な ID を `Set-Cookie` する。

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Set-Cookie: 31d4d96e407aad42 # 一意な ID を付与
```

以降、このユーザは Cookie の期限が切れるまで、これを返し続ける。

```
GET / HTTP/1.1
Host: example.com
Accept: text/html
Cookie: 31d4d96e407aad42 # 付与された ID を送ってくる
```

これをアクセスしてくるユーザそれぞれに行えば、それぞれを ID で _区別_ することが可能だ。

本来 HTTP とは、こうした識別子のようなものを持っておらず、デフォルトでは全員がまったく _区別_ のつかないリクエストを送ってくるような作りになっている。もちろん、誰がアクセスしてきても同じコンテンツを返せばよい "ブログ" や "Wiki" のようなサービスなら良いが、これだけでは実現できないユースケースがある。

例えばショッピングカートだ。「商品をカゴに追加する」というリクエストが来ても、それをどのカゴに追加したらよいかわからなければ、実装ができない。

## [区別と識別](#区別と識別)

一意な値を Cookie として付与すれば、ユーザが _区別_ できるが、この時点では _識別_ はしていない。

つまり、誰だかはわからないが ID として `31d4d96e407aad42` をとりあえず振っている状態だ。そして「`31d4d96e407aad42` は何者なのか?」を知るために行うのが「認証」、つまり「ログイン」となる。

例えば `31d4d96e407aad42` を付与された筆者がログインすることで、`31d4d96e407aad42` は Jxck だとわかる。このことから、「ログイン」とは「区別していた ID に対してアカウントを紐づける行為」と言える。

もちろん、ログインするまで Cookie を付与せず、認証と同時に Cookie を付与することもできるが、それではログインするまでショッピングカートが使えない。最近の EC サービスは、ログインしていなくてもショッピングカートに追加でき、決済直前で認証を挟む実装が多いが、これは先にカートのための _区別_ を行い、あとから _識別_ していることになる。

このように、Cookie とは必ずしも認証結果というわけではなく、ユーザ同士が _区別_ できれば良いだけのユースケースもあるというのが、Cookie の使い方を考える上で非常に大事なことだ。