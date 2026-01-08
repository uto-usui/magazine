---
title: "facebook flowでHTML5 Canvasデモを作ってみた"
source: "https://ics.media/entry/3611/"
publishedDate: "2014-11-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2014年11月21日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

2014年11月にFacebookから発表された「[flow](http://flowtype.org/)」(以下「facebook flow」と記述します）ですが、皆さんは試されましたでしょうか？　facebook flowは**JavaScriptの静的型付けチェックツール**です。本記事では、facebook flowの採用によってWebコンテンツ制作にどのようなメリットがあるのか調べるために、インタラクションデモを作って検証しました。

[![](https://ics.media/entry/3611/images/flow_web.gif)](http://flowtype.org/)

▲facebook flowの公式サイト

### flowで作成したコンテンツ

HTML5 Canvasタグを使ったグラフィック表現で、約500行程度のJavaScript (flow code)で作成しました。タップやマウスしながら動かすと大量のパーティクルが拡散するような表現になっていますので、次をクリックしてブラウザで再生してみてください。

![](https://ics.media/entry/3611/images/flow_demo_5.jpg)

-   [別ウインドウでデモを開く](http://clockmaker.jp/labs/141120_facebook_flow/)

![HTML5 Canvasで作成しているので、Flash風のコンテンツもiPhoneで動きます](https://ics.media/entry/3611/images/flow_iphone.jpg) ▲ HTML5 Canvasで作成しているので、Flash風のコンテンツもiPhoneで動きます

### コンパイルの仕組み

[公式サイトの手順](http://flowtype.org/docs/getting-started.html#_)にしたがってfacebook flowと、[自動コンパイラのJSX](http://flowtype.org/docs/running.html#_)の両方をインストールします。**flowコマンドはチェックツールであり、jsxコマンドのほうでflow codeのコンパイルを行う**仕組みです。今回作成したコンテンツは次のようなフォルダー構造になっています。facebook flowではオリジナルのコードflow codeを拡張子`.js`で書き、同じ拡張子`.js`のファイルが別フォルダーに出力される仕組みとなっています。

![](https://ics.media/entry/3611/images/flow_workflow.gif)

これを次のコマンドを用意してチェックやコンパイルを行います。

```
jsx --strip-types --harmony --watch src/ build/
```

### facebook flowのプログラム言語

facebook flowの言語flow codeは**TypeScriptのようなJavaScriptとなっています**。ほとんどがTypeScriptと同様の記述方法であり、**具体的には静的型付け・クラス・アロー関数などが用意されています**。現行のJavaScriptのライブラリとして今回のデモではCreateJSを利用しましたが、[公式サイトで紹介されている](http://flowtype.org/docs/third-party.html#_)ように「declare」キーワードを使うことで名前空間の解決ができました。今回作成したflow codeは[こちらのリンク](http://clockmaker.jp/labs/141120_facebook_flow/src/main.js)をご覧ください。

[![](https://ics.media/entry/3611/images/5c08332d300d31b6643f46c54224cb2b.png)](http://clockmaker.jp/labs/141120_facebook_flow/src/main.js)

チェックツール（flowコマンド）でコードの間違いがカラフルに指摘されます。試しにわざと型違いのコードをflowにかけてみたら、関数に引数を与えるところでstring型とnumber型とが違うことを指摘しています。

![](https://ics.media/entry/3611/images/flow_console.jpg)

コンパイラはHaxe言語（altJSの1つ）のコンパイラと同様にOCaml言語で開発されているのですが、**Haxe同様にコンパイル処理が早いことが期待できます**。

### 類似のTypeScriptとの比較

ほぼTypeScriptと同じ要領でコードを書くことができましたが、TypeScriptにはあってfacebook flowには用意されていない機能があったので、違いを次の表にまとめてました。現時点ではTypeScriptのほうが高機能ですが、[ロードマップ](http://flowtype.org/docs/coming-soon.html#_)で示されているfacebook flowの今後に期待したいところです。

-   **出力されたJavaScriptコードが汚い** [(これが出力された)](http://clockmaker.jp/labs/141120_facebook_flow/build/main.js)
-   現時点ではコードエディターの恩恵や、Gruntやgulpのようなタスクランナーが利用できない。(高機能で無料のエディター[Brackets](http://brackets.io/)が比較的書きやすかったです）

TypeScript

flow code

アクセス修飾子

`public`, `protected`, `private` が利用可

存在しない

メンバー変数の宣言

初期値を代入可能

初期値設定不可 （コンストラクターで記述して回避する）

nullチェック

ない

厳しくチェックする

配列の型指定

`Array<string> string[]` ※注釈1

`Array<string> string[]`

コンパイラの開発言語

TypeScript（tscはNode.jsで実行される）

OCaml

### 最後に

facebook flowは**既存のJavaScriptコードの資産の再利用しやすいのが利点**だと感じました。既存のJSに対してもチェックツールとして働かせることもできるので、素のJavaScriptとaltJSとしてのflowコードを混在して開発したい場合にも役立つ可能性があります。

今後の進化に注目していきたいところです。