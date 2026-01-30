---
title: "自作 Markdown プロセッサベースの blog.jxck.io v2 リリース"
source: "https://blog.jxck.io/entries/2021-11-30/blog-v2-release.html"
publishedDate: "2021-11-30"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [要件](#要件)

メモとして実装上の要件を記しておく。

### [Heading / Sectioning](#heading--sectioning)

大抵の Markdown 実装は `#`, `##` は `<h1>`, `<h2>` にそのままシリアライズされる。

```
# h1

## h2

### h3

### h3
```

```
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h3>h3</h3>
```

これを `<section>` で階層化し、`<h1>` だけは `<article>` にする。

```
<article>
  <h1>h1</h1>
  <section>
    <h2>h2</h2>
    <section>
      <h3>h3</h3>
    </section>
    <section>
      <h3>h3</h3>
    </section>
  </section>
</article>
```

さらに、見出しジャンプを入れる。その際、ID を振るが、もし被った場合は後ろに連番を振る。

```
<article>
  <h1 id="h1"><a href="#h1">h1</a></h1>
  <section>
    <h2 id="h2"><a href="#h2">h2</a></h2>
    <section>
      <h3 id="h3"><a href="#h3">h3</a></h3>
    </section>
    <section>
      <h3 id="h3_1"><a href="#h3_1">h3</a></h3>
    </section>
  </section>
</article>
```

もともと Kramdown をカスタマイズしはじめたのも、これを行いたかったからだった。

### [閉じタグとクオートの省略](#閉じタグとクオートの省略)

HTML の仕様には、閉じタグやクオートの省略条件が書かれている。

条件を満たすものについては、仕様に準拠しながら省略している。

-   条件を満たした閉じタグは省略
    -   [https://html.spec.whatwg.org/multipage/syntax.html#optional-tags](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags)
-   条件を満たしたクオートは省略
    -   [https://html.spec.whatwg.org/#unquoted](https://html.spec.whatwg.org/#unquoted)

### [インデント](#インデント)

インデントはキレイに

### [blockquote の cite](#blockquote-の-cite)

blockquote 記法の最後に書いた URL を `cite` として埋め込む。

例えばこれは

```
> example page
> --- https://example.com
```

以下のようになる。

```
<blockquote cite="https://example.com">
  <p>example page</p>
  <p>
    &mdash; <cite><a href="https://example.com">example.com</a></cite>
  </p>
</blockquote>
```

本来は `cite` 属性の方だけで良いが、以前は `<cite>` だったため今は互換を保つよう両方に入れている。

### [外部 script の読み込み](#外部-script-の読み込み)

ブログを書く上で、コードブロックにサンプルコードを書くことは多く、その中身が多いと外部ファイルに出し、ビルド時に読み込めると便利だ。

そこで、本サイトは初期から以下の記法をサポートしていた。

````
```js:script.js
```
````

このようにすると、HTML ビルド時にカレントディレクトリの script.js を読み込んで HTML の `<code>` 内に展開してくれる。

### [img のカスタマイズ](#img-のカスタマイズ)

画像の埋め込みは .png / .jpeg / .gif を一次ソースとしているが、必ず webp を提供している。

これを出し分けるために、画像記法は `<picture>` になるようにカスタマイズしている。(SVG は単に `<img>` になる)

また width/height を明示できるよう、URL の最後に fragment を `#300x300` のように指定すると width, height として解釈する。

さらに、画像を読み込んで `mtime` から最終更新時を算出し、それをクエリに付与して Cache Busting する。

```
![alt text](image.png#300x300 "title test")
```

これは以下のように展開される。

```
<picture>
  <source type=image/webp srcset=image.webp?211010_101010>
  <img
    loading="lazy"
    decoding="async"
    src="image.png?211010_101010"
    alt="jxck"
    title="jxck logo"
    width="256"
    height="256"
  />
</picture>
```

そして、動画を埋め込む記法が Markdown にはないが、これまで gif アニメにしていたものは mp4 に移行しつつあるので、拡張子が mp4 だった場合は `<video>` になるようにしている。こちらは、webm のフォールバックを入れている。

```
![dummy video](dummy_video.mp4#1000x2000)
```

```
<video title="dummy video" width="1000" height="2000" controls playsinline>
  <source type=video/mp4 src=dummy_video.mp4?211010_101010> <source
  type=video/webm src=dummy_video.webm?211010_101010>
</video>
```

そろそろ avif 対応も入れたい。

### [adoptive CSS](#adoptive-css)

`<table>` 用の CSS と `<pre>` のシンタックスハイライトは、他の要素に比べて CSS の量が多いのにかかわらず、出現頻度が低い。

そこで、`<table>` と `<pre>` の CSS はファイルを分け、HTML に出現する直前に CSS を一度だけ差し込むようにしている。

そのメリットは以下で解説している。

[HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | blog.jxck.io](https://blog.jxck.io/entries/2016-02-15/loading-css-over-http2.html)

### [`<table>`](#table)

Kramdown は、文の途中で `|` が来ると `<table>` が始まったと解釈する。

しかし、以下のようなリンクのタイトルは `|` を含むことが多く、エスケープが必要だった。

```
- [HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | blog.jxck.io](https://blog.jxck.io/entries/2016-02-15/loading-css-over-http2.html)
```

mozaic.fm の Monthly Web では、Show Note に大量のリンクを貼るため、そこに出てくる `|` を全てエスケープするのは面倒だった。

一方、文の途中で `<table>` を始めることなどないため、`|` は行頭にきた場合のみ `<table>` と解釈することに限定し、エスケープしないで良いようにした。

また、`<table>` の align は `align` 属性で指定も可能だが、もう deprecate されているため、CSS で align するために `class` をつけるようにしている。

### [TOC の生成](#toc-の生成)

前述で生成した heading とその ID を用いて、ページ内リンクの Table of Contents を生成して吐くようにした。

TOC の生成は、後述する Traverser で欲しい人が自分でやるスタイルにしようかとも思ったが、前述の ID の重複検出をするには、どちらにせよパース時に Heading のリストを保持することになるので、それをそのまま ToC として AST と一緒に返すようにした。

この TOC は、blog のタイトル上に埋め込んでいる。

### [h1](#h1)

h1 には以下のようにタグが書けるようにしている。

```
# [tag] hello world
```

これも、blog のタイトル上に埋め込んでいる。

### [Front Matter](#front-matter)

特に mozaic.fm のエピソードページでは、mp3 ファイルの場所や guest 一覧など、いくつかのメタデータを Markdown 内に独自ルールで書いて、それを雑に正規表現で処理していた。

しかし、Markdown の先頭に YAML でメタデータを記述する Front Matter のサポートを入れることで、そうしたメタデータをそちらに移した。

```
---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep89.mp3
published_at: 2021-10-26
guest: [@myakura](https://twitter.com/myakura)
---

# ep89 Monthly Web 202110

## Theme

第 89 回のテーマは 2021 年 10 月の Monthly Web です。
```

YAML は YAML パーサを入れるほど複雑なものを書いてないので、YAML パーサを自作するのをぐっとこらえて雑に処理している。

### [`<dl>`](#dl)

定義リスト記法もサポートしている。

さらに `<dl>` の下の `<dt>` `<dd>` は `<div>` で囲むことが許されており、これがあるとスタイルがちょっと楽になる。

```
key1
: val1
key2
: val2
: val3
```

```
<dl>
  <div>
    <dt>key1</dt>
    <dd>val1</dd>
  </div>

  <div>
    <dt>key2</dt>
    <dd>val2</dd>
    <dd>val3</dd>
  </div>
</dl>
```

個人的には Markdown のこの定義リスト記法はあまり気に入ってない。

特に、dd が来ないとその手前が dt だったことがわからないというパースのしにくさもある。

いっそ以下のような独自記法を入れてしまってもよいかと考えている。

```
:key1
  :val1
:key2
  :val2
  :val3
```

### [余計な空白はエラー](#余計な空白はエラー)

以前はビルドとは別に linter のようなものを雑に作ってフォーマットを確認していた。

しかし、せっかくパーサを書いたので、パースの際に気に食わないところは、すべてエラーにすることにした。

```
以下全部エラー

a **b** c
a **b** c
a ** b** c
a **b ** c

- aaa
- bbb
```

これを formatter にしてもよいかもしれないが、ビルド時エラーで間に合っているのでしてない。

### [URL link](#url-link)

Kramdown ではサポートされてなかった URL Like String を含めて、リンク記法は以下の 3 つを全てサポートしている。

```
[title](https://example.com)
<https://example.com>
https://example.com
```

最後の何も記法がないものは、とりあえず `http://` と `https://` で始まるものだけに絞ることで誤発動を防いでいる。

`about:`, `chrome:`, `file:` をサポートするかは考え中。

### [使わない記法は実装しない](#使わない記法は実装しない)

-   `<del>` や `<i>` は使わないので実装してない
-   `<ul>` は `-` しか使わないので `*` は実装しない
-   `<ol>` は `n.` しか使わないので `+` は実装しない
-   Math も使わないので実装しない

### [traverser plugin](#traverser-plugin)

ここまでに上げたような本サイトに必要な機能は、1 つに盛り込んでも良かったが、最終的にはブラウザでの挙動も想定して作っておきたかった。

ブラウザで挙動させると問題になるのは、Cache Busting のためのファイル更新時間確認や、`<pre>` への外部ファイル埋め込みなどが動かないことだ。

やはり、Markdown ファイルだけを見て生成できる HTML と、そこに対するカスタマイズを分離することで、ブラウザ上でもプレビューなどが動くように保つ方が後々良いだろう。

そこで、AST を生成した後に、そこを Traverse する機能を用意し、Node をたどりながら好きな変更を入れられるようにすることで、そこを Plugin のフックポイントとすることにした。

特に Node の `fs` を使わないと実現できないものは Plugin 側に寄せ、責務を分離できるようにしている。