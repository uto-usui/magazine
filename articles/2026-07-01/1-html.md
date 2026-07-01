---
title: "1ミリ秒でも早く届けたい! HTMLで画像読込を高速化するために取り組んでいること"
source: "https://ics.media/entry/221223/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2022-12-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

表示スピードは重要です。Googleが提唱するCore Web Vitalsコア・ウェブ・バイタルズにも表示スピードに関する項目があります。**ページが表示されるまでの時間は、ユーザー体験だけでなくSEOにも影響します。** 画像読み込みを改善するテクニックを紹介します。

-   [改善前サンプルを別ウインドウで開く](https://ics-creative.github.io/221223_image_load_speed/before/)
-   [改善後サンプルを別ウインドウで開く](https://ics-creative.github.io/221223_image_load_speed/after/)
-   [コードを確認する](https://github.com/ics-creative/221223_image_load_speed)

### 画像読み込みBefore / After

![改善前後のLighthouseのスコア結果。FCP、Speed Index、LCPの値が改善されている](https://ics.media/entry/221223/images/221223_before_after.png)

Lighthouseによるチェック結果です。[Lighthouse](https://developer.chrome.com/docs/lighthouse/)はChromeのデベロッパーツールで使える計測ツールです。実態は、[PageSpeed Insights](https://pagespeed.web.dev/)や[Chrome UX Report（CrUX）](https://developer.chrome.com/docs/crux/)も確認します。

改善後は、First Contentful Paint（FCP）が0.5秒、Largest Contentful Paint（LCP）が0.6秒、Speed Indexが1.1秒改善しました。

![改善前後のリソースのロード結果。改善前はLoad 2.47秒。改善後は766ミリ秒になっている](https://ics.media/entry/221223/images/221223_loadtime.png)

**4G回線速度（10Mbps）で比べても、初期読み込み完了までの時間は約2.4秒から約0.4秒まで短縮しました。** 転送量も2.5MBから307kBまで減っています。

### loading="lazy"による遅延読み込み

`<img>`要素に`loading="lazy"`属性を付けると、遅延読み込みを実装できます。ただし、ファーストビューに近い範囲の画像（ページ上部からおよそ2000px〜3000px）までは初期読み込みに含まれます。**ページ下部の画像に使うと、初期転送量を減らせます。**

**ファーストビュー内の画像、とくにLCPの対象になりやすい画像には`loading="lazy"`を付けないほうが安全です。** 初期表示の画像を遅らせると、LCPが悪化します。

`width`属性と`height`属性は必須ではありませんが、**付けておくべきです。** 属性がないと領域サイズを確定できず、**レイアウトシフトの原因**になります。**CSSでサイズ指定していても、省略しないほうが良いです。**

#### 読み込み優先度

`fetchpriority`属性を使うと、画像の読み込み優先順位をブラウザーに伝えられます。値は`high`と`low`です。優先度はネットワークタブで確認できます。

![Chrome DevToolsのNetworkタブでPriority列を有効化する画面](https://ics.media/entry/221223/images/221223_priority_tab.png)

改善後のサンプルでは、メインビジュアルとロゴに`fetchpriority="high"`、モバイル用のハンバーガーボタンに`fetchpriority="low"`を付けています。

指定しない場合はブラウザーが自動で決めます。`fetchpriority="high"`を付けると、その画像を優先して読み込ませやすくなります。**ただし、`high`の付けすぎは逆効果です。初期表示で重要な1〜2枚に絞りましょう。**

![優先度を高めた結果、メインビジュアルの読み込み順が7番目から4番目になった。※比較用にmv_desktop.jpgのみにつけたので実際の最適化後のサンプルと順位は違います](https://ics.media/entry/221223/images/221223_priority.png)

図の例では、mv\_desktop.jpgだけに`fetchpriority="high"`を付けています。内部優先度が上がるため、読み込み順が前に出ます。

改善後のサンプルでは、メイン画像とロゴを先に読み込ませています。現在は`fetchpriority`属性を全ブラウザーで利用できます。

### <picture>要素を使ったデスクトップとモバイル用の画像の出し分け

ファーストビューでは、デスクトップとモバイルで別画像を使っています。**CSSの`display: none`で出し分けると、非表示側の画像も読み込まれます。**

![デバイスに関わらず、モバイル用・デスクトップ用両方の画像が読み込まれてしまっている](https://ics.media/entry/221223/images/221223_picture.png)

**`<picture>`要素を使うと、不要な読み込みを防げます。** 画像形式の切り替えやアートディレクションにも向いています。

```
<picture>
  <source
    media="(width >= 768px)"
    srcset="
      assets/mv_desktop_optimized_1x.jpg 1x,
      assets/mv_desktop_optimized_2x.jpg 2x
    "
  />
  <source
    media="(width < 768px)"
    srcset="assets/mv_mobile_optimized.jpg"
  />
  <img
    src="assets/mv_desktop_optimized_1x.jpg"
    alt="猫たち"
    width="1024"
    height="512"
  />
</picture>
```

`<source>`要素と`media`属性を使うと、デスクトップ用とモバイル用の画像を指定できます。条件に合う画像が選ばれるので、不要なダウンロードを避けられます。

### 解像度に応じた出し分け

今では高解像度のディスプレイも一般的です。改善前は2048px × 1024pxの大きい画像を使っていたため、通常解像度でも重い画像を読み込んでいました。そこで、解像度に応じて画像を出し分けます。

`srcset`属性では、複数候補をカンマ区切りで指定できます。`1x`や`2x`を付けると、解像度に応じて切り替えられます。

```
<source
    media="(width >= 768px)"
    srcset="
      assets/mv_desktop_optimized_1x.jpg 1x,
      assets/mv_desktop_optimized_2x.jpg 2x
    "
  />
```

上の例では、通常解像度には`_1x.jpg`を、2倍密度のディスプレイには`_2x.jpg`を読み込みます。

### 画像を最適化する

改善前のJPEG画像は、Adobe Photoshopで画質80にして書き出したものです。ただ、[Squoosh](https://squoosh.app/)や[imagemin](https://github.com/imagemin/imagemin)を使うと、**少しの劣化で大きく容量を減らせます**。

![最適化処理前後で画像に目立った遜色はない](https://ics.media/entry/221223/images/221223_optimize.webp)

図はSquooshでMozJPEGを使った例です。277KBだった画像が86KBになり、約69%減りました。

**画像は、JPEG書き出し後ではなく元データから圧縮するほうが良いです。** 書き出し済みのJPEGをさらに圧縮すると、劣化が重なりやすくなります。

Squooshは、結果を見比べながら調整できるので便利です。ただ、多数の画像を手作業で変換するのは大変です。大量の画像をまとめて圧縮するなら、CLIツールやNode.jsのライブラリが向いています。Node.js版については記事[『グーグルが開発した画像圧縮ツールSquoosh。フロント開発向けにNode.jsで扱う方法まとめ』](https://ics.media/entry/220204/)にて詳しく解説しています。

### 最適な画像ファイル形式

画像形式を選ぶだけでも、ファイルサイズは減らせます。色数が少ないロゴや図表はPNG、色数が多い写真はJPEGが向いています。ここではAVIFとSVGを紹介します。

#### AVIF形式

AVIF形式は、JPEGやPNGより高い圧縮率を期待できる次世代画像形式です。透過にも対応します。**写真やヒーロー画像では、まずAVIFを試すと良いでしょう。**

本サンプルではAVIFを使っています。AVIFは全ブラウザーで利用できます。

![PNGの透過画像も最適化処理前後で画像に目立った遜色はなく、大幅なファイルサイズ削減ができている](https://ics.media/entry/221223/images/221223_optimize_webp.png)

サンプルで使っているAVIF画像も、PNGに比べて大きく圧縮できています。見た目の差もほとんどありません。

詳しくは記事[『次世代画像形式のWebP、そしてAVIFへ –変わり続ける技術に対応するweb制作の黄金解–』](https://ics.media/entry/201001/)も参照してください。

#### コラム：全部AVIFでいい？

写真やヒーロー画像はAVIFが有力です。ただ、すべての画像をAVIFにする必要はありません。ロゴやアイコンはSVG、図版によってはPNGやJPEGのほうが向いています。

**WebP（ウェッピー）画像形式はオススメしません。** たいして画質と容量のバランスが優れておらず、JPEGよりは多少マシかな、程度です。**明らかにAVIFのほうが効果的です。** このことは記事[『画像圧縮するベストな方法（2025） #OpenCV - Qiita』](https://qiita.com/fukushima1981/items/deaf8e97df2d1b9d6865)が参考になります。

#### SVG形式

SVGは拡大しても粗くなりません。ロゴやアイコンに向いています。

サンプルではファーストビュー中央のロゴにSVGを使っています。10KBだった画像は4KBまで減りました。ページ中盤の「Service」の肉球マークも、PNGでは6KB、SVGでは521バイトです。**単純な図形ほど、表示サイズが大きいほど、SVGは効果を出しやすい**です。

文字が多い画像ではPNGのほうが軽い場合もあります。ロゴやアイコンはSVG、説明図はPNGと考えると選びやすいでしょう。

### background-imageと<img>要素

CSSの`background-image`でも画像を表示できます。ただ、`<img>`要素とは性質が違います。

-   CSSの取得・解析後に見つかるため、ヒーロー画像やLCPの対象になりやすい画像では不利
-   `loading="lazy"`や`alt`属性のような仕組みをそのまま使えない

**ヒーロー画像を`background-image`で指定すると、ブラウザーが画像を見つけるのはCSSの読み込みと解析のあとです。** LCPの対象になりやすい画像では、その遅れが表示の遅れになります。

ファーストビューの背景画像に`background-image`を使うなら、`<link rel="preload" as="image" fetchpriority="high">`で先に取得を始める方法があります。解像度違いにはCSSの`image-set()`も使えます。

```
<link
  rel="preload"
  as="image"
  href="assets/hero@1x.avif"
  fetchpriority="high"
/>
```

```
.hero {
  background-image: image-set(
    url("assets/hero@1x.avif") 1x,
    url("assets/hero@2x.avif") 2x
  );
}
```

`background-image`には`alt`属性にあたる仕組みがありません。意味を持つ画像に使うと、スクリーンリーダー利用者に内容を伝えられません。画像の意味やアクセシビリティー、LCPへの影響も考えて使い分けましょう。

### まとめ

画像の読み込みは効果が大きい改善項目です。表示が遅いと感じたら、画像の読み込みを見直してみてください。