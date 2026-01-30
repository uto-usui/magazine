---
title: "Node v7 で入った WHATWG URL 実装について"
source: "https://blog.jxck.io/entries/2016-10-27/whatwg-url.html"
publishedDate: "2016-10-27"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

Node v7.0.0 が公開され、今回のリリースで WHATWG URL の実装が Experimental として入った。

既に標準で含まれていた url module との違いや、URL API などについて解説する。

## [WHATWG URL](#whatwg-url)

URL は非常によく使われる、Web において重要なフォーマットの一つだ。

ものによっては一見シンプルに見えるかもしれないが、その仕様はそれなりに大きい。

しかし、これまで DOM/JS はこれをパースする専用の API を持っていなかったため、例えば `<input type=text>` に入力された URL 文字列のパースは、片手間な正規表現で行われることも少なくなかった。

同様に、動的生成されるクエリやハッシュなどを URL に含める場面でも、やはり文字列操作による構築が行われてきた。

片手間な正規表現や文字列処理が、URL が本来持つ仕様(username/password, escape, punycode etc)を正しく満たせるとは限らず、それ自体が様々な問題(セキュリティ etc)を引き起こす要因になることも少なくなかった。

ところが近年、`fetch()` や `<input type=url>` など、URL を扱う仕様も増えてきたため、URL のフォーマット及び処理方法を整備する目的で URL Standard の仕様が策定された。

それが以下である。

原文: [https://url.spec.whatwg.org](https://url.spec.whatwg.org/)

翻訳: [https://triple-underscore.github.io/URL-ja.html](https://triple-underscore.github.io/URL-ja.html)

これによって、既存/新規 DOM API は、URL を扱う際に、基本的にはこの仕様を参照することができるようになった。

## [IETF URL](#ietf-url)

そもそも URL は IETF の管理する RFC によって定義されている。

つまり、インターネットを行き交うネットワークプロトコルの用いるフォーマットとしての URL の定義だ。

にも関わらず、これを WHATWG が DOM のコンテキストで定義し直した理由についてはドラフトに書かれている。

> Align RFC 3986 and RFC 3987 with contemporary implementations and obsolete them in the process. (E.g., spaces, other "illegal" code points, query encoding, equality, canonicalization, are all concepts not entirely shared, or defined.) URL parsing needs to become as solid as HTML parsing. \[RFC3986\] \[RFC3987\]
> 
> — [原文](https://url.spec.whatwg.org/#goals)

> RFC 3986 と RFC 3987 を現今の実装に揃わせて、その過程の中でそれらを過去のものにする。(例えば、空白類, 他の "合法でない" 符号位置, クエリの符号化方式, 同等性, 正準化, などの概念は、どれも完全には共有もしくは定義されていない。) URL の構文解析法は HTML の構文解析法と同程度に確定的になる必要がある。\[RFC3986\] \[RFC3987\]
> 
> — [翻訳](https://triple-underscore.github.io/URL-ja.html#goals)

平たく言えば、不完全だったところを補完したという感じだろうか。

ともあれ、これによって、広く言えば Web のコンテキスト、狭く言えば DOM のコンテキスト、中間で言うとブラウザのコンテキストでの _正しい URL とは何か_ および _その正しい処理方法は何か_ が定義されたと言うことができる。

## [URL API](#url-api)

DOM や JS の API として Export されていなかっただけで、ブラウザ自体はもちろん URL を正しくパースすることがこれまでもできた。

しかし、片手間な正規表現や、パーサを実装したライブラリを使わず、ブラウザに URL の解析を依頼するためには、従来以下のような方法しかなかった。

-   [https://gist.github.com/jlong/2428561](https://gist.github.com/jlong/2428561)

ところが、WHATWG のドラフトでは、前述した仕様が定義されたと同時に、それを提供する API が定義された。

それが URL オブジェクトであり、メジャーなブラウザは既に実装が進んでいる。

## [Node の url module 実装](#node-の-url-module-実装)

Node は既に URL をパースするための `url` モジュールを標準でもっている。

しかし、これが実装されたのは URL Standard が定義される前なので、`url` モジュールが準拠するのはもちろん RFC である。(それ自体が問題になること自体はほとんどない。)

しかし API についてみれば、先ほどの URLSearchParams も含めて WHATWG の定義とはかなり差異がある。

同じ JS であるにも関わらず、ブラウザと Node で API が違うというのは、isomorphic/universal 化が進む昨今では決して嬉しいことではない。

そこで筆者はこの URL オブジェクトを実装していた時期があった。だいぶ実装は進んだが後述する punycode と unicode 周りの対応が面倒で途中で止まっていた。

-   [URL](https://github.com/jxck/url)
-   [URLSearchParams](https://github.com/jxck/urlsearchparams)

ところが今年に入ってやっと、Node の本体の url module に、この WHATWG の URL オブジェクトを追加するという形で実装が始まったのが以下の issue である。

[url: adding WHATWG URL support #7448](https://github.com/nodejs/node/pull/7448)

それが v7.0.0 で Experimental という形で [ship](https://nodejs.org/en/blog/release/v7.0.0/) された。

## [URL オブジェクト](#url-オブジェクト)

Node v7.0.0 で実装された API は以下のように使うことができる。

```
const URL = require('url').URL;

const u = new URL('https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main');
console.log(u);
// URL {
//   href: https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main
//   protocol: https:
//   username: jxck
//   password: --------
//   hostname: blog.jxck.io
//   pathname: /path/to/entry
//   search: ?log=true&lang=ja
//   hash: #main
// }
```

この API を経由すれば、日本語ドメインの Punycode 化、IPv6 アドレスの対応、escape などもやってくれる。

(ここら辺が、正規表現での処理時に問題になりやすいあたりだ。)

```
const URL = require('url').URL;

// 日本語ドメイン
const jp = new URL('https://じゃっく.jp');
console.log(jp);
// URL {
//   href: https://xn--y8jr7a5i.jp/
//   protocol: https:
//   hostname: xn--y8jr7a5i.jp
//   pathname: /
// }

// IPv6
const ipv6 = new URL('https://[::1]/');
console.log(ipv6);
// URL {
//   href: https://[::1]/
//   protocol: https:
//   hostname: [::1]
//   pathname: /
// }

// 日本語
const ja = new URL('https://example.com/ぱす?きー=ばりゅー');
console.log(ja);
// URL {
//   href: https://example.com/%E3%81%B1%E3%81%99?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
//   protocol: https:
//   hostname: example.com
//   pathname: /%E3%81%B1%E3%81%99
//   search: ?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
// }
```

なお、ブラウザの実装状況は caniuse に項目がまだ無い ([issue](https://github.com/Fyrd/caniuse/issues/1312)) ので MDN を貼っておく。

-   [https://developer.mozilla.org/en/docs/Web/API/URL/URL](https://developer.mozilla.org/en/docs/Web/API/URL/URL)

## [URLSearchParams オブジェクト](#urlsearchparams-オブジェクト)

また、query parameter を表現する URLSearchParams は別オブジェクトであるため、query parameter の取得や生成もこのオブジェクトを利用できる。

一応 Node v7.0.0 にもコードはあるようだが、正しく動いてないようなので、完成予定の Chrome の結果を代わりに貼っておく。

```
const URL = require('url').URL;

const u = new URL('https://jxck.io?log=warn&lang=ja');
const searchParams = u.searchParams;
searchParams.get('log') // "warn"
searchParams.getAll('log') // ["warn"]
searchParams.delete('log') // undefined
searchParams.has('log') // false
searchParams.append('debug', true) // undefined
searchParams.toString() // "lang=ja&debug=true"

for ([k, v] of searchParams) {
  console.log(k, v);
  // lang ja
  // debug true
}
```

ブラウザ上でも、おそらくこれまで `?` と `&` と `=` で `split()` したり、`join()` してきたであろう query だが、URLSearchParams 経由で解析/組み立てを行えば、おろそかにされがちだったエスケープなども正しく行われるため、積極的に使っていきたい。

こちらは caniuse があるので、貼っておく。

-   [https://caniuse.com/#feat=urlsearchparams](https://caniuse.com/#feat=urlsearchparams)

## [Outro](#outro)

WHATWG URL を用いることで、ブラウザ上での URL の正しい処理が、標準 API のみで行えるようになった。

さらにそれが Node にも実装されたことにより、URL に対する処理が共通するコードで行えるようになった。

まだ Experimental ではあるが、おおよその実装自体は完了している。

Node では、すぐに従来の API がなくなるということは無いので、移行を焦る必要があるわけではない。

しかし、今後 URL を操作する場面ではこちらの API を使っておいた方が、様々な場面でメリットがあるだろう。

今後も、これまで開発者がビルドで乗り切っていた isomorphic/universal な処理に、Node の標準モジュールが歩み寄る流れが進むことを期待してる。