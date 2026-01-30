---
title: "3PCA 3 日目: 自動で送られる Cookie"
source: "https://blog.jxck.io/entries/2023-12-03/3pca-cookie.html"
publishedDate: "2023-12-03"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

このエントリは、3rd Party Cookie Advent Calendar の 3 日目である。

-   3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
    -   [https://qiita.com/advent-calendar/2023/3rd-party-cookie](https://qiita.com/advent-calendar/2023/3rd-party-cookie)

前回は「Cookie は _区別_ と _識別_ の用途があり、_区別_ だけのユースケースもある」という解説をした。

今回も、もう少し Cookie の性質を振り返っていく。

## [保存したドメインに自動で送り返す](#保存したドメインに自動で送り返す)

ブラウザは `Set-Cookie` してきたサイトを覚えておき、そのサイトにアクセスするたびに `Cookie` ヘッダで自動で送り返すという話だった。

例として、EC サイトにログインし Cookie が振られた場面を考える。

```
POST /login HTTP/1.1
Host: shop.example

username=jxck&password=******
```

ここで認証した結果、Jxck に対して ID を振る。

```
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: id=31d4d96e407aad42

<!doctype html>
```

一度 shop.example でログインしたら、あとでまた shop.example にアクセスしたときに、この Cookie を送り返す。

```
GET / HTTP/1.1
Host: shop.example
Cookie: id=31d4d96e407aad42
```

これを毎回自動で行うため、しばらくアクセスしていなくても、またアクセスすればログイン済み状態になっている。

これは、サービス側が付与した Cookie を削除するか、ブラウザから Cookie が消えるまで、基本的には続く。

## [直接アクセスしていなくても送る](#直接アクセスしていなくても送る)

さて、先ほど shop.example で Cookie を取得したブラウザが、EC サイトとはまったく関係ない筆者のブログにアクセスした場合を考えてみよう。

URL は [https://blog.jxck.io](https://blog.jxck.io/) とする。

このサイトは、まず blog.jxck.io に HTML を問い合わせる。

```
GET / HTTP/1.1
Host: blog.jxck.io
Accept: text/html
...
<!doctype html>
...
<title>index | blog.jxck.io</title>
...
<script src=https://shop.example/js/script.js></script>
...
```

ブラウザは取得した HTML をパースしながら、途中で出てきた `<script>` を shop.example に取得しに行く。

```
GET /js/script.js HTTP/1.1
Host: shop.example
Accept: text/javascript
Cookie: id=31d4d96e407aad42 # NOTICE!
```

ここで shop.example に送信されている Cookie に注目したい。

「一度取得した Cookie は、そのサイトにアクセスするたびに自動で毎回送る」というルールだったが、これはいわゆる画面に表示される URL だけではなく、そのサブリソースにも適用される点が重要だ。

したがって、全く関係ない blog.jxck.io にアクセスしても、そこに埋め込まれた JS を EC サイトに取得しに行くリクエストには shop.example で付与された Cookie が送られる。

この場合は JS だが、JS 以外にも例えば CSS, Image, iframe などでも同じように送られる。

```
<script src=https://shop.example/js/script.js></script>
<link rel=stylesheet href=https://shop.example/css/style.css>
<img src=https://shop.example/img/image.png>
<iframe src=https://shop.example/iframe/frame.html></iframe>
```

これに何のメリットがあるのか。これを何に使えるのか。

次回はいよいよ 3rd Party Cookie の実態について解説する。