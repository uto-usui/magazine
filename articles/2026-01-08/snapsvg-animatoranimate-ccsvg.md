---
title: "拡張機能Snap.svg Animatorを使ってAnimate CCからSVGを書き出そう"
source: "https://ics.media/entry/8439/"
publishedDate: "2015-08-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

（注記）この記事で紹介の「Snap.svg Animator」はすでに公開が終了しています。この記事の内容はアーカイブとして残していますが、動作しないためご注意ください。

SVGエス・ブイ・ジーとはHTMLでベクターグラフィックスを扱えるテクノロジーです。JPEGやPNGなどのラスターデータに対し、SVGはベクターデータのため拡大縮小に強いことが利点です。本記事ではこのSVGを使ってHTMLでアニメーションを実現する方法を紹介します。

まず前提としておさえておきたいのは、**SVGでアニメーションやインタラクションを実装するには比較的低レベルのAPIの理解が必要となる**ということです。[SVG 1.1 仕様](http://www.hcn.zaq.ne.jp/___/SVG11-2nd/)の学習コストが高かったり、コンテンツ開発時の生産効率が上がらないといった課題が考えられます。そのためアニメーションやインタラクション用途のSVGコンテンツの開発にはJavaScriptライブラリを使う方が効率的です。

### SVGを手軽に扱えるJSライブラリ「Snap.svg」とは

「[Snap.svg](http://snapsvg.io/)」(スナップ・エスブイジー)とはJavaScriptでHTML内の[SVG](https://e-words.jp/w/SVG.html)要素を制御するJSライブラリです。Snap.svgはAdobeが開発していることや（参照記事「[アドビ、Snap.svgオープンソース プロジェクトをGitHubに公開](https://thinkit.co.jp/news_event/2013/10/25/4651)」)、一世代前の人気SVG用JSライブラリ「[Raphaël](http://raphaeljs.com/)」の開発者も参加していることから、SVGを扱うJSライブラリの中ではもっとも有力であると言えます。

[![Snap.svg 公式サイト](https://ics.media/entry/8439/images/150814_snapsvg_official_site.png)](http://snapsvg.io/)

Snap.svgを学びたい方はPixelGridさんの記事「[Snap.svgで快適SVGアニメーション - Snap.svgとは | CodeGrid](https://www.codegrid.net/articles/2015-snapsvg-1)」で利点や使い方をわかりやすく解説されているので、参考にするといいでしょう。

### アニメーションソフトからSVGを書き出す

前置きが長くなりましたが、ここからが本題です。今まではSnap.svgの開発にはコードを書くしか制作方法がありませんでしたが、2015年8月に[Adobe Animate CC](https://www.adobe.com/jp/products/animate.html)(当時の名称はAdobe Flash Professional CC)の拡張機能（アドオン）「[Snap.svg Animator](https://creative.adobe.com/addons/products/12329#.Vc1PjVPtlBd)」が公開されました。このアドオンを使うことでAnimate CCで作成したタイムラインアニメーションをSnap.svgのアニメーション素材として書き出すことができます。

次のサンプルはAnimate CCで作成したFlashアニメーションをSnap.svg Animatorを使って出力したものです。ブラウザで再生できるので、ぜひ試してください。

![](https://ics.media/entry/8439/images/150814_snapsvg_sample_motion.jpg)

-   [別ウインドウで再生する](https://ics-creative.github.io/150814_snapsvg_animator/2_motion_flash/motion_flash.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150814_snapsvg_animator/tree/master/2_motion_flash)

▲ 光の筋が交差するシンプルなモーション。Snap.svg Animatorではブレンドモードが利用できないようだが、イージングなどの再現には問題がない。

![](https://ics.media/entry/8439/images/150814_snapsvg_sample_particles.jpg)

-   [別ウインドウで再生する](https://ics-creative.github.io/150814_snapsvg_animator/3_particles/particles.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150814_snapsvg_animator/tree/master/3_particles)

▲ パーティクルのシンプルなモーション。ビットマップベースのモーションでも支障なく表現されている。

### SVGコンテンツの制作ワークフロー

この拡張機能を使えば、プログラマだけでなく、アニメーターもSnap.svg(HTML5のSVG)コンテンツの制作に参加できるようになります。本記事では「Snap.svg Animator」のインストールの手順から使い方と活用方法を紹介します。

![](https://ics.media/entry/8439/images/150814_snapsvg_workflow.png)

次は、拡張機能のインストール方法を解説します。

### インストールはAdobe Creative Cloudから

Animate CCにアドオンをインストールするには「[Snap.svg Animator : Adobe Add-ons](https://creative.adobe.com/addons/products/12329#.Vc1PjVPtlBd)」ページの\[無料\]ボタンをクリックします。すると、Adobe Creative Cloud経由で自動的に手元のマシンのAnimate CCにインストールされます。

[![Snap.svg Animatorのインストール手順](https://ics.media/entry/8439/images/150814_snapsvg_install_addon.png)](https://creative.adobe.com/addons/products/12329#.Vc1PjVPtlBd)

インストールが完了したら、Animate CCを起動します。スタートアップ画面のカスタムプラットフォームの箇所に「SnapSVGAniamtor （カスタム）」が追加されます。この項目を選択することでSnap.svg用のドキュメントが作成できます。

![](https://ics.media/entry/8439/images/160609_snapsvg_create_document.png)

インストールの手順は以上ですが、詳しい手順が知りたい方は次の動画を参考にするといいでしょう。

### タイムラインアニメーションを作成する

メニューから\[ファイル\]→\[新規\]→\[テンプレート\]タブ→\[HTML5 Canvas\]→\[サンプルアニメーション\]を選択して象のアニメーションを使いましょう。このタイムラインアニメーションをコピーして、Snap.svg用のドキュメントに貼り付けパブリッシュします。次のデモはSnap.svgで書きだしたものです。

![](https://ics.media/entry/8439/images/150814_snapsvg_sample_elephant.png)

-   [別タブで再生する](https://ics-creative.github.io/150814_snapsvg_animator/1_elephant/elephant.html)

このコンテンツは次のようなHTMLコードとなっています。再生時に自動的にHTMLの`body`要素内に`svg`要素が生成されます。出力した全コードは[GitHub](https://github.com/ics-creative/150814_snapsvg_animator/tree/master/1_elephant)にアップしています。

```
<!DOCTYPE html>
        <html>
        <head>


<style>
        svg{
            background-color: #FFFFFF;
        }
        </style>


        </head> 
        
        <body> 
    <script src="./SnapSVGAnimator/js/vendor/snap.svg/snap.svg-min.js"></script>
    <script src="./SnapSVGAnimator/js/SnapSVGAnimator.min.js"></script>

    <script type="text/javascript"> 
        var jsonfile = "elephant.json",
            fps = 24,
            width = 960,
            height = 540,
            AJAX_req;

    AJAX_JSON_Req(jsonfile);

    function handle_AJAX_Complete() {
        if( AJAX_req.readyState == 4 && AJAX_req.status == 200 )
        {
            json = JSON.parse(AJAX_req.responseText);
            comp = new SVGAnim(
                           json,
                           width,
                           height,
                           fps
                           );
            
        }
    }

    function AJAX_JSON_Req( url )
    {
        AJAX_req = new XMLHttpRequest();
        AJAX_req.open("GET", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/json");
        
        AJAX_req.onreadystatechange = handle_AJAX_Complete;
        AJAX_req.send();
    }

            </script>
        </body>
        </html>
```

![](https://ics.media/entry/8439/images/150814_snapsvg_element.gif)

▲Google ChromeのDeveloper Toolで確認すると、SVG要素がアニメーションの変化とともに変動していることがわかる

次は、SVGの使いどころを解説します。

### 次々と増えるAnimate CCから書き出せるフォーマット

アドビへの寄稿記事「[知ってる？　HTML5、WebGL、Unity、Cocos2d-x、ほか色々。Flash Professionalを活かせる技術 | Adobe Creative Station](https://blogs.adobe.com/japan/web-flashpro-publish-to-various)」で紹介したとおり、Animate CCではさまざまなプラットフォームに対してコンテンツを書き出せます。

従来のSWF出力を使えば旧式のデスクトップブラウザをサポートできますし、HTML5 Canvasドキュメントを使えばスマートフォンのすべてのブラウザをサポートできます。**つまりデスクトップとスマホ問わず、Animate CC製のコンテンツはすべてのブラウザ環境で再生することが可能なのです。**

しかし、ここでおさえておきたいのは単に「HTML5」と言っても実はさまざまなテクノロジーが存在することです。たとえば、Canvas、WebGL、SVG、DOM・・・と**複数のテクノロジーがHTML5周辺技術として存在し、それぞれには一長一短があります。**どれがベストであるかは制作するコンテンツにあわせて変わってくるので、**フロントエンドエンジニアはそれぞれのテクノロジーの得手不得手は理解しておくべきでしょう。**

テクノロジーそれぞれの得手不得手を理解する一助として、次表にAnimate CCがサポートする各テクノロジーの用途と対象動作環境をまとめました。Animate CCでは公式機能としてCanvasとWebGLがサポートされていますが、ときにはSVGを利用することが最適なケースもあるでしょう。そういった時に今回紹介した拡張機能Snap.svg Animatorが役立つはずです。

技術名

内部ライブラリ

用途

成熟度

対象ブラウザ

ランタイム

SWF

\-

リッチコンテンツやバナー制作

★★★★★

旧式ブラウザも含むデスクトップブラウザ全般

Flash Player

HTML5 Canvas

CreateJS

リッチコンテンツやバナー制作

★★★★☆

旧式ブラウザを除くデスクトップ・スマホブラウザ

Context2D

WebGL

flWebGL

バナー制作

★★☆☆☆

WebGLが動作する比較的最新のモダンブラウザのみ

WebGL

Snap.svg Animator

Snap.svg

塗りや線で構築されるアニメーションやグラフ向け

★★☆☆☆

旧式ブラウザを除くデスクトップ・スマホブラウザ

SVG

Toolkit for Dart

StageXL

ゲーム開発

★★★☆☆

旧式ブラウザを除くデスクトップ・スマホブラウザ

Context2D

今回紹介した内容だけでもAnimate CCがクロスプラットフォームに対応できているかわかってもらえたかと思いますが、さらにこの他にも[OpenFL](https://github.com/openfl/openfl-animate-plugin)や[AwayJS](https://github.com/awaytools/AwayExtensions-FlashPro)というAnimate CCの拡張機能が存在し、さらに幅広い環境向けにコンテンツを書き出すことができます。記事「[アニメ制作機能がさらに充実！ Flash Professional CC 2015の新機能紹介](https://ics.media/entry/7061/)」で紹介したように、「ユニバーサルドキュメントタイプコンバーター」という機能が備わっているためFLAファイルのドキュメントタイプを相互に変換できます。

### 類似のSVG出力用の拡張機能「Flash2Svg」

余談ですが、今回紹介した方法以外にもAnimate CCからアニメーションSVGを出力する方法があります。GitHubに公開されている「[Flash2Svg](https://github.com/TomByrne/Flash2Svg)」というオープンソースの拡張機能です。Adobe Add-onsにも「[Animated SVG Exporter](https://creative.adobe.com/addons/products/7232#.Vd1IJNPtlBe)」という拡張機能も公開されていますが、中身は同じもののようです。次のユーザーがこの拡張機能を試していますので参考にしてください。

-   [AmazingFlash: FLAからSVGアニメ](https://www.ae-suck.com/amazing/archives/000663.html)

本記事で紹介したSnap.svg Animatorはタイムラインアニメーションを制御可能なベクター情報としてJavaScriptとして出力するのに対して、Flash2Svgは単一のSVGファイルとして出力されます。根底部分で同じテクノロジーが使われているとはいえ用途が違うと言えるでしょう。やはり使い勝手に応じて選択するのがいいと思います。

### 今後も広がるAdobe Animate CCのフィールド

アニメーション/モーションを制作するワークフローとして、Animate CCの役割が広がり必要性が高くなってきたのではないでしょうか。今後もICSではAnimate CCの進化を紹介します。

SVGのアニメーションについては、Snap.SVGを使う以外にも実装方法があります。記事「[UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ](https://ics.media/entry/15970/)」でまとめて紹介しています。