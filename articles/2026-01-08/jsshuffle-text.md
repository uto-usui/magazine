---
title: "手軽にテキストシャッフル演出ができるJSライブラリ「shuffle-text」を公開"
source: "https://ics.media/entry/15498/"
publishedDate: "2017-05-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

JavaScriptライブラリ「[shuffle-text](https://github.com/ics-ikeda/shuffle-text)」を公開しました。shuffle-textはテキストシャッフル（文字列がランダムで切り替わる演出）の表現を行うためのライブラリです。SPA（シングル・ページ・アプリケーション）やゲーム・スペシャルコンテンツの演出に役立ちます。

たとえば、ウェブサイトでマウスカーソルが触れたときに次のような演出ができます。

![](https://ics.media/entry/15498/images/shuffle-text-example-2.gif)

JavaScriptライブラリはMITライセンスで公開していますので、商用利用問わずどなたでも自由に利用が可能です。ソースコードやドキュメントはすべてGitHubにて公開していますので参照ください。

-   [shuffle-text: JavaScript Text Effect library.](https://github.com/ics-ikeda/shuffle-text)

### shuffle-text を使ってみよう

本記事では、JavaScriptライブラリを組み込み利用するまでの手順を解説します。以下のデモが今回作成するもののサンプルとなります。

![](https://ics.media/entry/15498/images/170518_shuffletext_simple.gif)

GitHubからダウンロードして、`build`フォルダー内の「shuffle-text.js」を次のようにファイルを配置します。プレーンなJavaScriptで作成しているので、ライブラリの依存関係はありません。

![](https://ics.media/entry/15498/images/170518_shuffletext_folder.png)

shuffle-text.jsの使い方は至ってシンプルで、HTML要素の中のテキストに対してエフェクトを適用するだけです。HTMLの適用したい要素に対して、`document.querySelector()`メソッドなどで参照をとり、`ShuffleText`クラス（`shuffle-text.js`の中身）のコンストラクターの引数として渡します。エフェクトを開始したいタイミングで `start()` メソッドを呼び出します。

```
<!DOCTYPE html>
<html>
<body>
<h1 id="myText">This is a shuffle-text.js example.</h1>
<script src="shuffle-text.js"></script>
<script>
  const text = new ShuffleText(document.querySelector('#myText'));
  text.start();
</script>
</body>
</html>
```

以上です。ブラウザでエフェクトが再生されるのを確認ください。

詳しい仕様は、APIドキュメントとして公開しています。カスタマイズできるようになっているので参考ください。

-   [APIドキュメント](https://ics-ikeda.github.io/shuffle-text/docs/classes/default.html)

![](https://ics.media/entry/15498/images/170518_shuffletext_docs.png)

### こだわったポイント

たとえば、文字がシャカシャカ切り替わりながら揃うだけという設計だと、前方から文字が出現する演出になります。これはこれでいいのですが、機械的な単調な雰囲気です。

![](https://ics.media/entry/15498/images/170518_shuffletext_test_a.gif)

shuffle-textでは文字の出現やエフェクトの終了タイミングが不揃いになるように設計しています。乱数のコクと言いますか、あえて不完全なほうがノスタルジックな雰囲気を醸し出せます。

![](https://ics.media/entry/15498/images/170518_shuffletext_test_b.gif)

乱数にコクを出す話は記事「[JavaScript開発に役立つ重要なランダムの数式まとめ](https://ics.media/entry/11292/)」や「[乱数にコクを出す方法について - Togetterまとめ](https://togetter.com/li/1044668)」が参考になります。

### shuffle-textの事例を紹介

shuffle-textは私が制作に携わったプロジェクトで利用しています。

[![](https://ics.media/entry/15498/images/170518_showcase_clockmaker.jpg)](http://clockmaker.jp/labs/)

▲ [ClockMaker Labs - Interaction Design × Web Technology](http://clockmaker.jp/labs/)

筆者の個人サイト。2008年頃から制作してきた実験的なインタラクションコンテンツを掲載しています。サイトは[Angular](https://angular.io/)で構築し、演出にshuffle-textを利用しています。サイトのソースコードは[GitHub](https://github.com/ics-ikeda/clocmaker.jp-labs)で公開しています。

[![](https://ics.media/entry/15498/images/170518_showcase_beautifl.jpg)](https://beautifl.net/)

▲ [Beautifl - Flash Gallery of wonderfl](https://beautifl.net/)

Beautiflはかつて面白法人カヤックが運営していた『[wonderfl](https://www.kayac.com/service/other/94)』に投稿されたFlash作品をピックアップしたギャラリーサイト。画面左側のナビゲーションにshuffle-textを利用しています。このサイトに関することは記事「[Flash作品を残すために取り組んだこと](https://ics.media/entry/210215/)」や「[脱jQueryのためにしたこと](https://ics.media/entry/17451/)」、「[CSS Grid Layoutをガッツリ使った所感](https://ics.media/entry/17403/)」にまとめていますので、あわせてご覧ください。

[![](https://ics.media/entry/15498/images/170518_showcase_pollenmap.jpg)](https://ics-web.jp/projects/pollenmap/)

▲ [日本全国花粉飛散マップ Pollen Map in Japan | ICS](https://ics-web.jp/projects/pollenmap/)

日本全国花粉飛散マップは花粉の飛散量をデータビジュアライゼーションとして表現したサイト。数値の部分にshuffle-text（CreateJS版）を利用しています。

### NPMでの利用方法

shuffle-textは[npm](https://www.npmjs.com/package/shuffle-text)でも公開しています。フロントエンドエンジニアはこちらから利用するのがいいでしょう。

[![](https://ics.media/entry/15498/images/170518_shuffletext_npm.png)](https://www.npmjs.com/package/shuffle-text)

Node.jsをマシンに導入していれば、`npm`コマンドを使ってJSライブラリをインストールできます。コマンドラインで、次のコマンドを入力してインストールください。

```
npm install shuffle-text
```

#### モジュールのバンドル方法

モジュールとしてバンドルすれば、ひとつのJavaScriptファイルとしてまとまるので、サーバーリクエストの回数が減り読み込み時間を短縮できます。

一般的な方法として、ESモジュールの`import`文でモジュールを読み込みます。モジュールバンドラーにはいろんな種類が存在しますので、下記の構成を参考ください。

-   [webpack版サンプル](https://github.com/ics-ikeda/shuffle-text/tree/main/examples/webpack)
-   [Rollup版サンプル](https://github.com/ics-ikeda/shuffle-text/tree/main/examples/rollup)

```
import ShuffleText from "shuffle-text";

// 要素を取得
const element = document.querySelector("#my-element");
// インスタンスを生成
const shuffleText = new ShuffleText(element);
// エフェクトを再生
shuffleText.start();
```

[TypeScript](https://www.typescriptlang.org/)で利用する場合は、定義ファイルも自動的にインストールされます。

### 最後に

実はこのライブラリは2012年に公開していたものを新しくしたものです（参照「[HTML5でテキストのシャッフル演出ができるJSライブラリ「ShuffleText.js」 | ClockMaker Blog](https://clockmaker.jp/blog/2012/02/html5_shuffletext/)」）。TypeScript化したことや、npmで公開した点など、時代の流れに即して更新してあります。ぜひ気軽に利用ください！

※この記事が公開されたのは**8年前**ですが、**1年前の2024年7月**に内容をメンテナンスしています。