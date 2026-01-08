---
title: "SVGで始めるマイクロインタラクション入門"
source: "https://ics.media/entry/15834/"
publishedDate: "2017-07-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ボタンのタップ、ページのスクロールで開始される「マイクロインタラクション」は、ウェブサイトやアプリを印象的に魅せる効果があります。画像の拡大縮小に強いSVGは、さまざまなデバイス向けのマイクロインタラクションの実装に効果的です。今回は、**はじめてマイクロインタラクションやSVGに触れるウェブクリエイターを対象に基礎知識を紹介します**。

### マイクロインタラクションとは

「マイクロインタラクション」とは、ある目的を果たすために1つの作業を行うインタラクションのことで、Dan Saffer氏が著書「[マイクロインタラクション](https://www.oreilly.co.jp/books/9784873116594/)」の中で定義したものです。「部屋のライトをつける」「SNSでいいねボタンを押す」「ウェブサイトでスクロール時にグラフを表示する」といったことが、マイクロインタラクションの例として挙げられています。

![](https://ics.media/entry/15834/images/170707_svg_oreilly.png)

#### マイクロインタラクションの構造

マイクロインタラクションは、次の4つの構造に分解できます。

1.  トリガー : マイクロインタラクションの開始
2.  ルール : マイクロインタラクションで何が起こるのかの定義
3.  フィードバック : 何が起こっているのか？を視覚的、聴覚的に示す
4.  ループとモード : 終了したらどうするか、条件が変わったらどうするかの定義

たとえば、[YouTube](https://www.youtube.com/)の再生ボタンは、ボタンをクリックしたら動画の再生が開始されるものですが、マイクロインタラクションの観点から次のように分解できます。

![](https://ics.media/entry/15834/images/170707_svg_youtube_ex.png)

#### マイクロインタラクションの効果

高品質なマイクロインタラクションは、次のような効果を発揮します。

> -   一見取るに足りない瞬間『喜びの瞬間』に変える
> -   全体にも細部にも配慮することで、素晴らしいユーザーエクスペリエンスを実現する製品が作り出せる
> -   細部は単なる細部にとどまらない。細部こそが製品を作り上げる
> 
> 書籍「[マイクロインタラクション](https://www.oreilly.co.jp/books/9784873116594/)」より引用

マイクロインタラクションはアニメーションが必須ではありません。しかし、**アニメーションを効果的に使うと、操作感の向上や印象的なフィードバックに役立ちます**。

Appleの[iOSヒューマンインターフェイスガイドライン](https://developer.apple.com/ios/human-interface-guidelines/visual-design/animation/)やGoogleの[マテリアルデザイン](https://material.io/guidelines/motion/material-motion.html)においては、アニメーションに次のような効果があると述べています。

![](https://ics.media/entry/15834/images/170707_svg_guildeline.png)

それでは、我々ウェブクリエイターがアニメーションを用いたマイクロインタラクションを作成するには、どうすればよいのでしょうか？

### ウェブのアニメーションで考えるラスター・ベクター画像

ウェブのアニメーションで使用する画像は、大きく分けてラスター画像とベクター画像に分けることができます。ラスター画像はドットの集合体で構成される画像で、代表的なフォーマットとしてJPG、PNG、GIFがあります。**画像の横幅・縦幅を元のサイズ以上に拡大すると画像がボケます**。一方、ベクター画像は頂点・塗り・線の集まりのことで、代表的なフォーマットとしてSVGがあります。**画像を横幅・縦幅を元のサイズ以上に拡大してもくっきり表示されます**。

![](https://ics.media/entry/15834/images/170707_raster_vector.png)

#### 高解像度化するディスプレイとベクター画像

ラスター画像とベクター画像の使い分けをする際に考慮に入れるべきは、高解像度ディスプレイです。次の図に示すように、デスクトップ、スマートフォン共に、デバイスピクセル比（※）が1.0より大きいディスプレイを持つ端末が増えています。

![](https://ics.media/entry/15834/images/170707_svg_retina.png)

※ デバイスピクセル比とは、画像の1pxをデバイスの何ピクセルを使って表示するかを表した数値。デバイスピクセルが2のRetinaディスプレイでは、「1ピクセル × 1ピクセル」の画像をディスプレイでは「2ドット × 2ドット」の4ドットで表示されます。

ラスター画像で高解像度ディスプレイでも画像をくっきり表示させる場合、縦幅・横幅が大きいサイズの画像を用意せざるをえません。

![](https://ics.media/entry/15834/images/170707_svg_raster_demerit.png)

**ベクター画像の場合は拡大しても画像は荒れないので、1つのベクター画像を用意するだけです**。また、拡大しても劣化しないという特性を活かし、ウェブ媒体のみならず印刷物としても使用できます。

![](https://ics.media/entry/15834/images/170707_svg_svg_merit.png)

写真のような高精細な画像の表現には向きませんが、**ディスプレイが高解像度化する時代の流れにおいては、ベクター画像は有効な手段の1つと言えるでしょう**。

#### ウェブコンテンツでベクター画像を取り扱えるのがSVG

[SVG （Scalable Vector Graphics）](https://www.w3.org/TR/SVG11/)は、2次元のグラフィックをXMLで記述するための言語です。

![](https://ics.media/entry/15834/images/170707_svg_about_svg.png)

SVGでは、次のような表現が可能です。

![](https://ics.media/entry/15834/images/170707_svg_ability.png)

SVGはフラットデザインとも相性がよく、多くのウェブサイトで採用されています。たとえば、[Starbucks（英語版）](https://www.starbucks.com/)のロゴや、[Googleトレンド](https://trends.google.co.jp/trends/explore?q=google)の世界地図で使われています。

![](https://ics.media/entry/15834/images/170707_svg_example.png)

SVGは、IE 11を含む主要ブラウザーで基本機能が対応しています（参考「[Can I Use （SVG）](http://caniuse.com/#feat=svg)」)。

![](https://ics.media/entry/15834/images/170707_svg_caniuse.png)

### SVGの作成方法

SVGファイルを作成するには、大きく3つの手段があります。

1.  SVGのコードを手動で記述する方法
2.  ベクター画像作成ソフトからSVGを書き出す方法
3.  素材サイトから手に入れる方法

#### SVG作成方法1 : コードを記述してSVGファイルを作成する

コードを直接記述して、SVGを表現する方法です。テキストエディターで`画像名.svg`というファイルを生成します。コードはHTMLやXMLと同じようにタグを用います。

```
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 200 200">
  （ここに図形のためのコードを書く）
</svg>
```

`viewBox`属性は、SVGの描画領域の定義に使います。最小のX座標、最小のY座標、幅、高さの4つの値によって矩形の描画領域が定義されます。たとえば、`viewBox="0 0 200 200"`と定義し、半径`50`の円を描くと、次のような見た目になります。

![](https://ics.media/entry/15834/images/170707_svg_viewbox.png)

##### 図形の描画コード

シンプルな図形を描くためのタグとして、円（`<circle>`）、四角（`<rect>`）、多角形（`<polygon>`）など、シンプルな図形を作成するためのコードがあります。

![](https://ics.media/entry/15834/images/170707_svg_basic_shape.png)

円を描くための`<circle>`タグを用いて円を描く様子は次のとおりです。`r`属性で円の半径、`fill`属性で塗りの色、`stroke属性`で線の色を変更しながら、図形の見た目を更新しています。

#### 自由な曲線の描画コード

自由な図形を描くためのコードとして、`<path>`タグがあります。これは、頂点毎の情報を`d`属性によって定義することで、自由な曲線を描けるコードです。PhotoshopやIllustratorのペンツールを用いて図形を描画するのと似ています。

![](https://ics.media/entry/15834/images/170707_svg_path.png)

`<path>`を用いて、上記の曲線を描くコードは下記です。

```
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 540 540">
  <path
    fill-opacity="0"
    stroke="#999999"
    d="M25,349
       c57,-84,138,-176,228,-166
       c111,11,120,200,260,81"
  />
</svg>
```

一般的には、多くの`<path>`を組み合わせてSVGを作成しますが、手動で記述するのは非効率です。

#### SVG作成方法2 : ベクター画像作成ソフトから書き出す

SVG作成方法の2番目は、ベクター画像作成ソフトから書き出す方法です。次に**示すベクター画像作成ソフトでは、コードを使わずに直感的にベクター画像を作成できる上、SVG書き出し機能も備えています**。対応OS、値段、操作性の違いがありますので、自分の用途に合うものを選ぶとよいでしょう。

![](https://ics.media/entry/15834/images/170707_svg_tools.png)

-   [Illustrator](https://www.adobe.com/jp/products/illustrator.html)
-   [Affinity Designer](https://affinity.serif.com/ja-jp/designer/)
-   [Inkscape](https://inkscape.org/ja/)
-   [Adobe XD](http://www.adobe.com/jp/products/experience-design.html)
-   [Figma](https://www.figma.com/)
-   [Sketch](https://www.sketchapp.com/)

Illustratorで作成したベクターデータを、SVGで書き出す様子は次のとおりです。

#### SVG作成方法3: 素材サイトから手に入れる

SVG作成方法の3番目は、素材サイトからSVGデータを手に入れる方法です。ただし、著作権と使用条件には気をつけましょう。

-   [Adobe Stock](https://stock.adobe.com/jp/)
-   [Pixabay](https://pixabay.com/ja/)
-   [ICOOON MONO](http://icooon-mono.com/)
-   [FLAT ICON DESIGN](http://flat-icon-design.com/)

### SVGをHTMLで表示する

SVGファイルが作成できたら、SVGファイルをHTMLで表示します。SVGファイルを表示する簡単な方法は、`img`タグ（または`object`タグ）を用いて外部ファイルとして表示する方法です。次に示すのは、`img`タグを使ってSVG画像を表示する例です。

```
<img src="myImage.svg">
```

SVGを表示するもう1つの方法は、SVGコードを直接HTMLコードに貼り付けるインラインSVGという方法です。

```
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>タイトル</title>
</head>
<body>
<!-- SVGコードを記述する -->
<svg width="540" height="540" viewBox="0 0 540 540">
  <path fill="red" d="M250,94.6C166.7-30.4,0,42.8,0,179c0,92.1,83.2,157.8,145.8,207.3c65.1,51.5,83.3,62.5,104.2,83.3 c20.8-20.8,38.2-33,104.2-83.3C417.7,337.8,500,270.1,500,178C500,42.8,333.3-30.3,250,94.6z"/>
</svg>
</body>
```

インラインSVGを使うと、各属性やCSSプロパティよりSVGのグラフィックの形状を変更できます。動画では、`fill`（塗りの色）、`stroke-width`（線の太さ）、`stroke`（線の色）等を変更しています。

#### SVGを表示する横幅と高さを設定する

`img`タグ、インラインSVG共に、**SVGを表示する横幅と高さを`width`属性と`height`属性で設定します**。前述の**`viewBox`属性は、SVG内のグラフィックの座標を定めるもの**でした。図に示すのは、`viewBox="0 0 200 200"`のSVGで半径50（直径100）の円を描き、`width`と`height`を変更した場合の例です。

![](https://ics.media/entry/15834/images/170707_svg_width_height.png)

左側が半径50px（直径100px）の円になっているのに対して、右側は半径25px（直径50px）となっています。**SVGで画像の大きさを考える場合には、`width`・`height`属性と`viewBox`属性の関係に注意しましょう**。

### マイクロインタラクションのためにはインラインSVGで表示する

**SVGのコードをHTMLコード内で直接記述することで、属性（塗り、線、形状等）の書き換えをCSSやJavaScriptで行うことができます**。一定時間毎に属性を変化させればアニメーションとなります。よって、マイクロインタラクションをSVGで実現する場合は、インラインSVGで表示するのがオススメです。

![](https://ics.media/entry/15834/images/170707_svg_inlinesvg.png)

#### Tips : コードの肥大化を防ぎたいなら外部SVGをダウンロードしてインラインSVG展開

インラインSVGはSVGアニメーションに相性がよいですが、HTMLコードが肥大化しがちです。これを防ぐテクニックとして、JavaScriptの[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)、[XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)等を用いて外部SVGをダウンロードしてインラインSVGとして展開する手法があります。Fetch APIを使ったコード例は次の通りです。

```
<div id="container">
</div>
```

▲ HTML

```
async function main() {
  const response = await fetch(
    "http://jsrun.it/assets/E/6/v/r/E6vr9"
  );
  const svgCode = await response.text();
  document.getElementById("container").innerHTML = svgCode;
}

main();
```

▲ JavaScript

初めの内はインラインSVGを記述し、慣れてきたらSVGの外部化手法を検討するとよいでしょう。

### 次回はSVGアニメーションについて学びます

今回はマイクロインタラクションにはアニメーションが重要な役割を持つこと、多種多様なディスプレイでアニメーションの対応をするには、SVGが適していることを学びました。SVGの概要、作成方法、表示方法は、アニメーションのみならず、画像としてSVGを使用する場合にも役に立つ知識です。

次の記事「[UI改善にキラリと役立つ！ 今こそ導入したいSVGアニメーションの作り方まとめ - ICS MEDIA](https://ics.media/entry/15970/)」では、コーダー・フロントエンドエンジニア・デザイナー別に、SVGアニメーションを用いたマイクロインタラクションの実現方法について紹介します。

※ 本記事は、2017年6月15日（木）の勉強会ヒカラボでの発表「[SVGアニメーションで始めるマイクロインタラクション](https://atnd.org/events/88031)」を記事としてまとめたものです。