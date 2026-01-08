---
title: "新ブラウザMicrosoft Edgeの実力はいかに？  ウェブ制作者がおさえておきたい各ブラウザを上回るHTML5描画性能"
source: "https://ics.media/entry/8091/"
publishedDate: "2015-08-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Microsoft Windowsの最新OS「[Windows 10](http://www.microsoft.com/ja-jp/windows/features)」では、従来の標準ブラウザ「[Internet Explorer](http://windows.microsoft.com/ja-jp/internet-explorer/download-ie)」に代わって新ブラウザ「[Microsoft Edge](https://www.microsoft.com/ja-jp/windows/microsoft-edge)」が標準ブラウザとなりました。ウェブ制作者としては、Microsoft Edgeのパフォーマンスはどれくらいなのかが気になりませんか？　今回はDOM + CSS3、HTML5 Canvas、WebGLについて、**Microsoft Edgeと他Windowsブラウザのパフォーマンスを比較してみました**。

### 検証に用いたデモについて

今回の検証は[BunnyMark](http://blog.iainlobb.com/2010/11/display-list-vs-blitting-results.html)で検証しています。Bunnyの表示は「移動スピード・方向」「回転」「拡縮」「透明度」をランダムで適用し、毎フレーム移動をさせています。時間経過とともにオブジェクト数を増やし、直前3回のフレームレートの平均が30fpsを下回った段階での表示されているオブジェクトの個数をスコアにしています。

![](https://ics.media/entry/8091/images/20150420_demo_image.png)HTML5 Canvas版のデモ

#### 使用した2D表現

今回は、ウェブページの2D表現であるDOM + CSS3、HTML5 Canvas、WebGLについて検証しました。

-   DOM + CSS3：HTMLのimgタグとCSSを使ったモーション（デモ：[DOM](https://ics-creative.github.io/data-demos/150804_frontend_bunnymark/domanimation/domanimation.html)）
-   HTML5のCanvas：JavaScriptの[CanvasRenderingContext2D](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D)オブジェクトによるモーション（デモ：[HTML5 Canvas](https://ics-creative.github.io/data-demos/150804_frontend_bunnymark/html5canvas/html5canvas.html)）
-   WebGL：GPUを使ったモーション（デモ：[WebGL](https://ics-creative.github.io/data-demos/150804_frontend_bunnymark/webgl/webgl.html)）

HTML5 CanvasとWebGLのデモについては、JavaScriptのライブラリ群「[CreateJS](http://www.createjs.com/)」を使って作成しました。

#### 検証環境について

マシンはメモリ16GB・CPU3.4GHz Core i7のiMacを用い、仮想環境「[Parallels Desktop for Mac](http://www.parallels.com/jp/products/desktop/)」にWindows 10をインストールして以下の各モダンブラウザについて検証を行いました。

-   [Microsoft Edge](https://www.microsoft.com/ja-jp/windows/microsoft-edge)：バージョン20
-   [Internet Explorer](http://windows.microsoft.com/ja-jp/internet-explorer/download-ie)：バージョン11
-   [Google Chrome](https://www.google.co.jp/chrome/browser/desktop/)：バージョン44
-   [Firefox](https://www.mozilla.org/ja/firefox/new/)：バージョン39
-   [Opera](http://www.opera.com/ja)：バージョン30

### パフォーマンスはどれくらいなのか？

前述のデモを他のプログラムが起動していない状態で3回ずつ実行し、その平均値をとりました。結果は次のグラフの通りになっています（スコアが高いほどパフォーマンスが高いことを示します）。

#### DOMの比較結果

**DOMではMicrosoft Edge、Internet Explorerのスコアが良好でした**。とは言え、Firefox以外のスコアは大きくは変わりませんでした。DOMによる表現を行う場合は、Firefoxのパフォーマンスに注意しながら作っていくとよいでしょう。

![](https://ics.media/entry/8091/images/DomAnimation.png)

#### HTML5 Canvasの比較結果

**HTML5 CanvasではMicrosoft Edgeのスコアが一番高い結果となりました**。また、Internet Explorer 11のスコアも高く、Google ChromeやFirefoxのスコアの4倍でした。Google Chrome、Firefox、Operaについては大差はありません。HTML5 CanvasのスコアはDOMの3〜10倍ほどとなっていることも見てとれます。

![](https://ics.media/entry/8091/images/HTML5Canvas.png)

#### WebGLの比較結果

**WebGLではMicrosoft Edgeは2番目に高いスコアでした**。一番結果が良かったのはGoogle Chromeで、他ブラウザの2〜3倍以上のスコアを出しているのがわかります。Internet Explorer、Firefox、Operaは大差のない結果となりました。また、WebGLのスコアはHTML5 Canvasのスコアの4〜10倍以上となっていて、非常に高いパフォーマンスであることがわかります。

![](https://ics.media/entry/8091/images/WebGL.png) 各2D表現を比較したグラフが以下です。DOM＜HTML5 Canvas＜WebGLの順にスコアが高くなっていますが、**いずれの表現においてもMicrosoft Edgeが高いパフォーマンスである**ことがわかります。

![](https://ics.media/entry/8091/images/all.png)

### Microsoft Edgeは高いパフォーマンスだった

[Microsoftの公式ブログ](http://blogs.windows.com/msedgedev/2015/02/26/a-break-from-the-past-the-birth-of-microsofts-new-web-rendering-engine/)によると、**Microsoft Edgeは新型エンジン「EdgeHTML」となり、JavaScriptの処理能力が向上した**とのことです。普段ウェブページで使うDOMやHTML5 Canvas、WebGLのパフォーマンスが向上しているかが気になっての今回の検証でした。結果的に**Microsoft Edgeは高いパフォーマンスを発揮することがわかりました**。今後の進化が非常に楽しみです。今回はパフォーマンスについて見てきましたが、Microsoft Edgeには魅力的な機能もたくさんあります。LIGさんのブログ記事「[Windows10＆Microsoft Edge登場！新ブラウザを迎えるために知っておきたい要件まとめ](http://liginc.co.jp/web/tool/browser/164918)」などが参考になるでしょう。