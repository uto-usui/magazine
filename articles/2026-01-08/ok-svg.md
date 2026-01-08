---
title: "コピペOK！ SVGフィルターを使った画像加工の作例集"
source: "https://ics.media/entry/241122/"
publishedDate: "2024-11-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブサイトに欠かせない画像コンテンツ。Adobe Photoshopなどで加工し書き出すことも多いですが、SVGフィルターを使用すると同じように複雑な効果を表現できます。

本記事では、SVGフィルターを使っていろいろな雰囲気の画像加工の作例を紹介します。数値を変えると雰囲気もガラリと変わりますのでコピペして色々とお試しいただき、ぜひ取り入れてみてください。

![SVGフィルター作例まとめ](https://ics.media/entry/241122/images/241122_svg_filter_all.png)

### SVGフィルター実装方法の概要

作例紹介の前に、今回の実装方法について概説したいと思います。SVGフィルターの適用にはCSSの`filter: url()`を使用します。

コードで画像加工を行う簡易的な方法として、CSSの`filter`プロパティを使う方法が挙げられます。`filter`プロパティに指定できるCSS関数はいくつか用意されており、`blur()`関数でぼかしたり、`contrast()`でコントラストを強めたりと簡単な加工が行えます。

この`filter`プロパティに指定できるCSS関数の1つに`url()`関数があります。`url()`には、SVGのフィルターを指定できるため、この方法を使用し実装しています。基本以下のように`img`要素に適用する形でデモを作成していますが、描画が重いフィルターなど一部作例ではSVGの`image`要素に適用しています。

```
<img src="sample.jpg" alt="" class="image">
```

```
.image {
  filter: url(#filter);
}
```

「SVG」と聞くと、`<path>`タグによって、アイコンなどのベクター形式の画像が描画されるといった場合に使用されるイメージが強いかもしれませんが、実はフィルター機能だけを使用することも可能です。

以下のように`<filter>`タグの中に、`<fe〇〇>`といった名称のSVGフィルター用のタグを追加することで、フィルター機能だけを持ったSVG要素が作成できます。各タグの詳しい説明は省略しますので、今回は大まかな構造や雰囲気だけ理解いただければ幸いです。

```
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter"><!-- CSSで参照できるようidを振る -->
    <!-- ここに <fe〇〇> タグを追加していく（上から順に処理されていきます） -->
  </filter>
</svg>
```

#### SVGフィルターでよく使用される属性について

大半の`<fe〇〇>`タグに指定できる属性に、`in`属性と`result`属性というものがあります。

`in`属性で効果を適用する際の入力要素を指定します。`result`属性は処理結果を一時的に保存しておき、後続のタグの`in`属性として参照できます。

▼例1

```
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <feTurbulence baseFrequency="0.1" result="noise"/>
    <!-- resultで保存した「noise」と元画像が合成される -->
    <feBlend in="noise" in2="SourceGraphic" mode="multiply"/>
  </filter>
</svg>
```

`in`属性を省略するか、`in`属性に空文字を指定すると直前のタグが参照されます。次の2つのコードは例1と同じ結果が得られます。

▼例2（`in`属性の省略）

```
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <feTurbulence baseFrequency="0.1"/>
    <!-- 直前のタグまでの処理結果（feTurbulence）と元画像が合成される -->
    <feBlend in2="SourceGraphic" mode="multiply"/>
  </filter>
</svg>
```

▼例3（`in`属性に空文字を指定）

```
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <feTurbulence baseFrequency="0.1"/>
    <!-- 直前のタグまでの処理結果（feTurbulence）と元画像が合成される -->
    <feBlend in="" in2="SourceGraphic" mode="multiply"/>
  </filter>
</svg>
```

作例中に頻出する`SourceGraphic`は`in`属性や`in2`属性に指定できるビルトインのキーワードで、フィルター適用元のグラフィック要素を参照します。

そのほか詳しくはMDNのドキュメントを参照ください。

-   [result](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/result)
-   [in](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in)
-   [in2](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in2)（合成効果のあるタグでのみ使用される）

なお、合成効果のあるタグで使用される`in2`属性は省略することも可能ですが、エディターで警告が出るので、作例中では`in2=""`のように空文字で指定しています。

### 作例紹介

SVGフィルターを用いた画像加工の作例を紹介します。

今回の作例は、Google Chrome、Microsoft Edge、Safari、Firefoxで表示されることを確認済みです。SVGフィルターはブラウザーによって出力結果の差が出やすい一面もあるので、取り入れる際には一度手元でご確認いただくことを推奨します。

#### ざらざらノイズフィルター

ウェブサイトでもよく見かける、ざらざらノイズフィルターです。パッと見控えめですが、手触り感や暖かみを出すためによく使われる表現です。

![ざらざらノイズフィルター](https://ics.media/entry/241122/images/241122_svg_filter_rough.jpg)

SVGフィルターにはノイズ生成用の`feTurbulence`タグが組み込まれているので、ノイズ用の画像を用意せずともSVGフィルターだけで完結できます。

```
<img src="images/image-1.jpg" width="512" height="384" alt="" class="image">

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- ざらざらノイズ -->
    <feTurbulence type="turbulence" baseFrequency="0.5" numOctaves="5"/>
    <!-- アルファチャンネルのコントラストを下げる（少し透明にする） -->
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.5"/>
    </feComponentTransfer>
    <!-- オーバーレイで合成 -->
    <feBlend in2="SourceGraphic" mode="multiply"/>

    <!-- はみ出したフィルターを元の画像サイズでクリッピング -->
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>
</svg>
```

```
.image {
  display: block;
  filter: url(#filter);
}
```

▼やや効果がわかりづらいので元画像と比較 ![ざらざらノイズフィルター比較](https://ics.media/entry/241122/images/241122_svg_filter_compare.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/rough-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/rough-filter.html)

#### ガラス風フィルター

細かく画像をゆがめたガラス風のフィルターです。数値を変えると絵っぽく見えるかもしれません。

前の作例と同様、`feTurbulence`でノイズを生成した後、`feDisplacementMap`で歪ませて、元の画像と合成しています。

![ガラス風フィルター](https://ics.media/entry/241122/images/241122_svg_filter_glass.jpg)

```
<img src="images/image-1.jpg" width="512" height="384" alt="" class="image">

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="2"/>
    <feDisplacementMap in="SourceGraphic" in2="" scale="10" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

```
.image {
  display: block;
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/glass-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/glass-filter.html)

#### ゆれフィルター

水平方向にゆれる表現のフィルターです。

色収差を表現するため、`feColorMatrix`でRGBそれぞれの色チャンネルを抽出し、Rチャンネルだけ`feOffset`で水平方向にずらしています。また、ガラス風フィルターと同様、`feTurbulence`でノイズを生成し`feDisplacementMap`で歪ませています。ノイズ生成の際、`baseFrequency`の値を2つ指定することで、X軸Y軸それぞれ別の値が指定できるのでこれを利用し、水平方向に大きく広がるようなノイズを生成しています。

![ゆれフィルター](https://ics.media/entry/241122/images/241122_svg_filter_distortion.jpg)

```
<img src="images/image-1.jpg" width="512" height="384" alt="" class="image">

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 色チャンネルを分解 -->
    <!-- 元の画像から G チャンネルだけ抽出し「g」として登録 -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g"/>
    <!-- 元の画像から B チャンネルだけ抽出し「b」として登録 -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="b"/>
    <!-- 元の画像から R チャンネルだけ抽出し、少しずらしてぼかす -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feOffset dx="3" dy="1"/>
    <feGaussianBlur stdDeviation="2"/>
    <!-- G/B チャンネルを比較(明)モードで重ねる -->
    <feComposite in="g" in2="" operator="lighter"/>
    <feComposite in="b" in2="" operator="lighter" result="rgb-layers"/>

    <!-- ゆれの表現 -->
    <feTurbulence type="fractalNoise" baseFrequency="0 0.1" numOctaves="2"/>
    <feDisplacementMap in="rgb-layers" in2="" scale="40"/>
  </filter>
</svg>
```

```
.image {
  display: block;
  filter: url(#filter);
  clip-path: inset(0 10px); /* ズレの部分を隠すため内側にクリッピング */
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/distortion-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/distortion-filter.html)

#### 和紙っぽいフィルター

和紙に印刷されたようなフィルターです。

`feTurbulence`でノイズ画像を生成し、`feDistantLight`で光を当て凹凸を際立たせて紙のように加工しています。そのまま元の画像と合成するとのっぺりとした印象になるので、元画像を紙の明暗に合わせて`feDisplacementMap`でゆがませつつ乗算で合成しています。

![紙っぽいフィルター](https://ics.media/entry/241122/images/241122_svg_filter_paper.jpg)

```
<img src="images/image-1.jpg" width="512" height="384" alt="" class="image">

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 紙 -->
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
    <feDiffuseLighting lighting-color="white" surfaceScale="2" >
      <feDistantLight azimuth="45" elevation="60" />
    </feDiffuseLighting>
    <feGaussianBlur stdDeviation="0.25" result="paper"/>

    <!-- 元画像を紙にマッピングしてゆがませる -->
    <feDisplacementMap in="SourceGraphic" in2="paper" scale="15" xChannelSelector="R" yChannelSelector="R" result="photo"/>

    <!-- 元画像と合成 -->
    <feBlend in2="paper" mode="multiply"/>
    <!-- はみ出したフィルターをクリッピング -->
    <feComposite in2="photo" operator="in" />
  </filter>
</svg>
```

```
.image {
  display: block;
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/paper-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/paper-filter.html)

#### ポスタリゼーション

ポスタリゼーションなフィルターです。ポップな印象にできます。

![ポスタリゼーション](https://ics.media/entry/241122/images/241122_svg_filter_posterization.jpg)

`feComponentTransfer`タグを用いると、RGBAチャンネル別個に色の加工を行うことが可能です。ガンマ補正で画像を明るめに調整しつつ、色の階調数を減らし、最後に任意の色をつける工程を行っています。

色の階調を減らす処理（`type="discrete"`の箇所）で、階調数が5となるよう数を刻んでいますが、色数を減らしたい場合`tableValues`の値を`0 0.33 0.66 1`（階調数4）などに変更すると、違った結果が得られます。

最終的な色味については、`type="table"`の`tableValues`を変更すると反映されます。SVGは0〜255ではなく、0〜1の数字を扱う必要があるので変換して指定しています。色確認と数値変換ができる簡易的なツールを作成しましたので色味の調整にお役立てください。

-   [色確認用ツールを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/color.html)

```
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 少しぼかす -->
    <feGaussianBlur stdDeviation="1.2"/>
    <!-- 白黒化 -->
    <feColormatrix type="saturate" values="0"/>

    <!-- ガンマ補正（山型：明るくする） -->
    <feComponentTransfer>
      <feFuncR type="gamma" exponent="0.5"/>
      <feFuncG type="gamma" exponent="0.5"/>
      <feFuncB type="gamma" exponent="0.5"/>
    </feComponentTransfer>

    <!-- 階調数5 -->
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
      <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
      <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
    </feComponentTransfer>

    <!-- 有彩色に変換 -->
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0.19,0.80,0.27,0.98,0.78"/>
      <feFuncG type="table" tableValues="0.21,0.24,0.46,0.86,0.96"/>
      <feFuncB type="table" tableValues="0.37,0.46,0.76,0.86,1.00"/>
    </feComponentTransfer>

    <!-- はみ出したフィルターを元の画像サイズでクリッピング -->
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>
</svg>
```

```
.image {
  display: block;
  filter: url(#filter);
}
```

また、ガンマ補正の工程は、元の画像の明度差が最適で補正が不要であれば削除したり、元々の画像が明るめの場合は以下のように`exponent`の値を増やすと暗めに調整できます。

```
<!-- ガンマ補正（谷型：暗くする） -->
<feComponentTransfer>
  <feFuncR type="gamma" exponent="1.5"/>
  <feFuncG type="gamma" exponent="1.5"/>
  <feFuncB type="gamma" exponent="1.5"/>
</feComponentTransfer>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/posterization-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/posterization-filter.html)

#### グリッチノイズフィルター

グリッチノイズ（画面の乱れのような）フィルターです。エッジの効いた雰囲気を作るのに役立ちます。

![グリッチノイズフィルター](https://ics.media/entry/241122/images/241122_svg_filter_glitch.jpg)

ブロック状の乱れは、`feTurbulence`でランダムな高さのストライプ状のノイズを生成し、`feComposite`で元となる画像と合成しつつ`feOffset`でずらすといった工程を、数値を変えつつ数回行うことで実装しています。

```
<div class="imageWrapper">
  <img src="images/image-1.jpg" width="512" height="384" alt="" class="image">
</div>

<!-- グリッチノイズフィルター -->
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 色チャンネルを分解 -->
    <!-- G チャンネル -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g"/>
    <!-- B チャンネル -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="b"/>
    <!-- R チャンネルを少しずらす -->
    <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
    <feOffset dx="8" dy="0"/>
    <!-- G/B を比較(明)モードで重ね、「rgb-layers」として登録しておく -->
    <feComposite in="g" in2="" operator="lighter"/>
    <feComposite in="b" in2="" operator="lighter" result="rgb-layers"/>

    <!-- ずらし1回目 -->
    <!-- 水平方向に伸びたフラクタルノイズを追加 -->
    <feTurbulence type="fractalNoise" baseFrequency="0 0.02" numOctaves="3"/>
    <!-- 輝度をアルファに（輝度が低い領域はより透明になり、輝度が高い領域はより不透明になる） -->
    <feColorMatrix type="luminanceToAlpha"/>
    <feComponentTransfer>
      <!-- 透明と黒で2値化 -->
      <feFuncA type="discrete" tableValues="0,1"/>
    </feComponentTransfer>
    <!-- 黒い部分だけ合体し、水平方向にずらす -->
    <feComposite in2="rgb-layers" operator="xor"/>
    <feOffset dx="8" dy="0" />
    <!-- Rレイヤーだけずらしておいた画像と合体 -->
    <feComposite in2="rgb-layers" operator="over" result="wip1"/>

    <!-- ずらし2回目（値を変えて同じ工程を繰り返す） -->
    <feTurbulence type="fractalNoise" baseFrequency="0 0.01" numOctaves="4" seed="5"/>
    <feColorMatrix type="luminanceToAlpha"/>
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0,1"/>
    </feComponentTransfer>
    <feComposite in2="rgb-layers" operator="xor"/>
    <feOffset dx="2" dy="0"/>
    <feComposite in2="wip1" operator="over" result="wip2"/>

    <!-- ずらし3回目 -->
    <feTurbulence type="fractalNoise" baseFrequency="0 0.01" numOctaves="3" seed="8"/>
    <feColorMatrix type="luminanceToAlpha"/>
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0,1"/>
    </feComponentTransfer>
    <feComposite in2="rgb-layers" operator="xor"/>
    <feOffset dx="-15" dy="0"/>
    <feComposite in2="wip2" operator="over"/>
  </filter>
</svg>
```

アナログテレビのように見せるための走査線（薄いストライプ模様）については、CSSを用いた実装が簡単だったので、`repeating-linear-gradient()`でパターンを作成し、`mix-blend-mode`で合成しています（なくてもOKです）。

```
.imageWrapper {
  position: relative;
  clip-path: inset(15px); /* ズレの部分を隠すため内側にクリッピング */
}
/* 走査線 */
.imageWrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(transparent, transparent 6px, #0006 6px, #0006 8px);
  filter: blur(2px);
  mix-blend-mode: overlay;
}

.image {
  display: block;
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/glitch-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/glitch-filter.html)

#### ドット絵風フィルター

レトロゲームのようなドット絵風のフィルターです。

![ドット絵風フィルター](https://ics.media/entry/241122/images/241122_svg_filter_pixel_art.jpg)

ポップな印象になるよう、`feComponentTransfer`でRGBチャンネルそれぞれの色の階調を減らしています。`tableValues`の値を変えて階調を増減したり、ピクセルのサイズを変えるとまた違った雰囲気にできます。

ドット化は`feFlood`で小さな矩形を用意し、`feTile`タグで矩形を敷き詰め、`feMorphology`タグで色のついたピクセル（タイルのサイズ）を膨張させることで表現しています。

`feTile`タグについてですが、一部ブラウザーで描画が不安定な場合があります。ここまで紹介してきた作例のように`img`要素へ適用すると、Safariで描画が不安定になったので、SVGの`image`要素で画像を読み込み、適用することで描画を安定させています。

```
<svg width="512" height="384" xmlns="http://www.w3.org/2000/svg">
  <image href="images/image-1.jpg" width="100%" height="100%" class="image"/>
</svg>

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 色の階調を減らす -->
    <feComponentTransfer result="color">
      <feFuncR type="discrete" tableValues="0,0.5,1"/>
      <feFuncG type="discrete" tableValues="0,0.5,1"/>
      <feFuncB type="discrete" tableValues="0,0.5,1"/>
    </feComponentTransfer>

    <!-- タイル -->
    <feFlood x="2" y="2" width="1" height="1"/>
    <feComposite in2="" width="4" height="4"/>
    <feTile />
    
    <!-- 画像とタイルの重なり部分を合成 -->
    <feComposite in="color" in2="" operator="in"/>
    
    <!-- タイルのサイズを膨張 -->
    <feMorphology operator="dilate" radius="2"/>
  </filter>
</svg>
```

```
.image {
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/pixel-art-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/pixel-art-filter.html)

#### 新聞の写真風フィルター

白黒のドットで画像の濃淡を表現した、新聞の写真のようなフィルターです。残念ながらブラウザーによって少し雰囲気が変わってしまいますが、いずれもレトロ感は表現できていると思います。

![新聞の写真風フィルター](https://ics.media/entry/241122/images/241122_svg_filter_dotgain.jpg)

ドット絵の実装方法と同じように`feTile`で矩形をタイリングしつつ、元画像の輝度に応じてドットのサイズが変わるハーフトーンのように加工しています。`feTile`タグでタイルを用意する工程について、Firefoxでの描画を安定させるため、2つ用意したそれぞれの矩形でタイル化を行い、最後に合成する方法にしています。

```
<svg width="512" height="384" xmlns="http://www.w3.org/2000/svg">
  <image href="images/image-1.jpg" width="100%" height="100%" class="image"/>
</svg>

<svg width="0" height="0"  xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 4px四方のタイルの作成 -->
    <!-- ■□ -->
    <!-- □□ -->
    <feFlood x="0" y="0" width="2" height="2"/>
    <feComposite in2="" width="4" height="4"/>
    <feTile result="tile1"/>

    <!-- □□ -->
    <!-- □■ -->
    <feFlood x="2" y="2" width="2" height="2"/>
    <feComposite in2="" width="4" height="4"/>
    <feTile result="tile2"/>

    <!-- タイル同士を合成 -->
    <!-- ■□ -->
    <!-- □■ -->
    <feComposite in="tile1" in2="tile2" operator="over" result="tile"/>

    <!-- 元画像の輝度をアルファにして、反転 -->
    <fecolormatrix type="luminanceToAlpha" in="SourceGraphic"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="-1" intercept="1"/>
    </feComponentTransfer>
    <!-- タイルと画像の重なり合った部分を合成 -->
    <feComposite in2="tile" operator="in"/>

    <!-- ぼかして、アルファチャンネルのコントラストを上げる -->
    <feGaussianBlur stdDeviation="1"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="16" intercept="-5"/>
    </feComponentTransfer>

    <!-- はみ出したフィルターを元の画像サイズでクリッピング -->
    <feComposite operator="in" in2="SourceGraphic" />
  </filter>
</svg>
```

```
.image {
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/dotgain-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/dotgain-filter.html)

#### グラデーションマップとストライプなフィルター

グラデーションマップと横線を組み合わせたフィルターです。

![グラデーションマップとストライプなフィルター](https://ics.media/entry/241122/images/241122_svg_filter_stripe_gradationmap.jpg)

前述した作例でも使用した方法を以下のように組み合わせています。

-   ドット絵の実装方法と同じように、`feTile`で矩形のタイリングを行う。
-   ポスタリゼーションの作例の後半の工程と同様に、`feFuncX`タグに`type="table"`を設定し、`tableValues`の値を調整しグラデーションを作成してマップ。

```
<svg width="512" height="384" xmlns="http://www.w3.org/2000/svg">
  <image href="images/image-1.jpg" width="100%" height="100%" class="image"/>
</svg>

<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="filter">
    <!-- 横線（画像の暗い部分を描画） -->
    <fecolormatrix type="luminanceToAlpha"/>
    <feComponentTransfer result="mono">
      <feFuncA type="linear" slope="-1" intercept="1"/>
    </feComponentTransfer>
    <feFlood x="0" y="0" width="600" height="2"/>
    <feComposite in2="" width="600" height="5"/>
    <feTile/>
    <feComposite in="mono" in2="" operator="in"/>
    <feGaussianBlur stdDeviation="1"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="15" intercept="-5"/>
    </feComponentTransfer>

    <feComponentTransfer result="stripe">
      <!-- 線を青めにする -->
      <feFuncG type="linear" slope="-1" intercept="0.3"/>
      <feFuncB type="linear" slope="-1" intercept="1"/>
      <!-- アルファチャンネルのコントラストを下げる（少し透明にする） -->
      <feFuncA type="linear" slope="0.8"/>
    </feComponentTransfer>

    <!-- グラデーションマップ -->
    <feGaussianBlur stdDeviation="1" in="SourceGraphic"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0.34,0.53,0.33,1.00,0.82"/>
      <feFuncG type="table" tableValues="0.00,0.27,0.72,0.78,0.98"/>
      <feFuncB type="table" tableValues="0.14,0.41,0.75,0.89,1.00"/>
    </feComponentTransfer>

    <!-- 画像と横線を合成 -->
    <feBlend in2="stripe" mode="multiply" result="color"/>

    <!-- はみ出したフィルターを元の画像サイズでクリッピング -->
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>
</svg>
```

```
.image {
  filter: url(#filter);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/stripe-filter.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/stripe-filter.html)

### おまけ検証

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241122_svg_filter/src/filter-test.html)
-   [ソースコードを確認する](https://github.com/ics-creative/241122_svg_filter/blob/main/src/filter-test.html)

#### 外部SVGリソースについて

ChromeやEdge、Firefox等の一部ブラウザーではSVGフィルターを外部リソース化しておき参照することが可能です。

```
.image {
  filter: url(sample-filter.svg#filter);
}
```

執筆時点（2024年11月）ではSafariが未対応ですので、htmlにSVGタグをベタ書きするのが良いでしょう。

#### videoタグへのフィルター適用について

一部のブラウザーでは`video`タグにSVGフィルターをかけられます。

ChromeとEdgeは問題なく再生でき、Firefoxはフィルターの描画の重さによって動いたり止まったりするようです。また、残念なことにSafariではまったく動かないようでした。SVGの描画はブラウザー間の差がよくあるので、必ず確認を行うようにしましょう。

#### そのほかフィルター適用について

文字など画像以外のDOM要素にも適用できます。複雑な見た目でありながらただのフィルターなので、DOMへの影響はもちろんありません。**スクリーンリーダーの読み上げや、コピペもできるのはコードならではの利点**です。

複雑なフィルターの場合は、ユーザー体験を損なわないよう使い所にご注意ください。

![フィルター適用の検証](https://ics.media/entry/241122/images/241122_svg_filter_test.jpg)

### まとめ

SVGフィルターと一部CSSを用いた、画像加工の作例を紹介しました。CSSのみの実装と比較すると、SVGフィルターはかなり自由度が高い実装方法だと感じました。とくにノイズを使える点などは大きな利点です。

本記事では解説していませんが、他の実装方法として挙げられるCSSやWebGLと比較すると以下のようにメリット・デメリットがまとめられます。

**できることの多さ＝ハードル：CSS < SVG < WebGL（Canvas）**

-   CSS
    -   メリット：手軽に試せてぼかしや色味の変更等オーソドックスな加工が可能。
    -   デメリット：複雑な加工はできない。
-   SVG
    -   メリット：ライブラリを導入する必要がなく気軽に試せる。ノイズが便利。自由度が高い。
    -   デメリット：ブラウザーによって異なる出力結果になることがあるので確認やチューニングが必要。
-   WebGL（Canvas）
    -   メリット：自由度が高く、ダイナミックでかっこいい演出などがたくさん。描画が軽い。
    -   デメリット：数学やシェーダー言語（GLSL）の知識が必要になるなど敷居が高め。

これらの実装方法の違いについては、記事『[君は使い分けられるか？ CSS/SVG/Canvasのビジュアル表現でできること・できないこと](https://ics.media/entry/200520/)』にて詳しく比較していますので、ぜひご覧ください。

コードとして画像の加工を行うことで、ホバー時だけ加工された画像を使ってみたり、フィルターをアニメーションさせてみるなどといった表現の拡張性もあります。今回の記事がSVGフィルターへ興味を持つきっかけになれば幸いです。

作例集として完成済みのコードを紹介しましたが、フィルタータグの一部をコメントアウトしてみたり順番を入れ替えてみると、おもしろいフィルターができるかもしれません、色々と組み合わせて取り入れてみてはいかがでしょうか？

#### 参考サイト

-   [filter - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/filter)
-   [SVGのフィルター効果 - SVGでやることのまとめ。](https://lopan.jp/about-svg/filter/)
-   [SVG、feCompositeで要素を切り抜き。](https://fuuno.net/ani/filter/feCompsite/feComposite.html)
-   [Filter Effects in SVG: Dailey](https://srufaculty.sru.edu/david.dailey/svg/SVGOpen2010/filters2.htm)
-   [SVG Filter Effects: Duotone Images with | Codrops](https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/)
-   [svg要素の基本的な使い方まとめ](http://defghi1977.html.xdomain.jp/tech/svgMemo/svgMemo_11.htm)