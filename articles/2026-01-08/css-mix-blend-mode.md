---
title: "CSSのブレンドモードが素敵！ mix-blend-modeを使いこなそう"
source: "https://ics.media/entry/7258/"
publishedDate: "2015-07-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

**[mix-blend-mode](https://developer.mozilla.org/ja/docs/Web/CSS/mix-blend-mode)というCSSのプロパティ**。これはDOM要素を重ねた時の見え方を指定するCSSプロパティです。**デザイナー視点だとブレンドモードはごく当たり前に使う機能のひとつ。`mix-blend-mode`はウェブの表現手法が広がり、デザインの自由度が広がる注目すべきCSSプロパティです**。本記事は`mix-blend-mode`の魅力と使い方をデモを交えて紹介します。

### そもそもブレンドモードとは？

ブレンドモードはクリエイティブな表現を作る上での基本機能のひとつです。Adobe PhotoshopやIllustrator、After Effects、XDや、Figmaで搭載されていて、**レイヤーを重ねたときにどのように重ねて表示するかの設定**になります。ソフトによっては「ブレンドモード」や「描画モード」「モード」と異なる名称が使われていますが、機能としては同じものになります。本記事ではCSSの名称にあわせて**ブレンドモード**と記載しています。

![Adobeのデザインツールにはブレンドモードが標準搭載されている](https://ics.media/entry/7258/images/150706_blendmode_creativecloud_220914_ps.png)

![](https://ics.media/entry/7258/images/150706_blendmode_creativecloud_220914_xd.png)

### CSSブレンドモードを試してみよう

CSSブレンドモードを試すことのできるデモを作成しました。左のドロップダウンメニューから`mix-blend-mode`の値を変化できるので、表示の違いを確かめてみてください。

![](https://ics.media/entry/7258/images/150705_mixblendmode_thumb.jpg)

-   [別ウインドウでデモを開く](https://ics-creative.github.io/150705_mixblendmode/demo_complex/)
-   [ソースコードを開く](https://github.com/ics-creative/150705_mixblendmode/tree/master/docs/demo_complex)

※このデモは[Vue 3](https://ja.vuejs.org/)を使って作成しており、オープンソースとして公開しています。もともとは2015年にAngularJS + TypeScriptで作成していましたが、2022年に作り直しています。

### mix-blend-modeの使い方

簡単なHTMLとCSSで使い方を説明します。

このプロパティは2つの要素が重なったときの見え方の指定となるので、事前準備として2つ以上のDOM要素を用意して、それぞれを絶対座標を利用して重ねて配置しましょう。`z-index`的に上位の要素に`mix-blend-mode`を指定します。コードで書くと次の指定となります。

```
.text {
  position: absolute;
  mix-blend-mode: overlay; /* オーバーレイを指定 */
  color: white;
  font-size: 150px;
  font-weight: bold;
  top: 200px;
  left: 30px;
}
```

```
<div class="box">
  <img src="https://farm8.staticflickr.com/7712/16969858599_908ef27aec_k_d.jpg" width="960"/>
</div>

<div class="text">Cherry Blossoms</div>
```

このコードを試すと、次のような表示結果となります。テキストが写真とかさなり、美しいタイポグラフィーとして表示されています。

![CSS MixBlendModeのサンプル](https://ics.media/entry/7258/images/150706_blendmode_sample.jpg)

-   [サンプルを別窓で開く](https://ics-creative.github.io/150705_mixblendmode/demo_simple/)
-   [ソースコードを開く](https://github.com/ics-creative/150705_mixblendmode/blob/master/docs/demo_simple/index.html)

### ブレンドモードのチートシート

ブレンドモードに指定できる効果にはたくさんの種類があるので、それぞれを紹介します。CSSブレンドモードのチートシートとしてお役立てください。重ねているのは次の2枚の画像で、下位レイヤーに写真が、上位レイヤーにアンビエントのグラフィックを配置しています。上位レイヤーにのみCSSブレンドモードを適用しています。

![](https://ics.media/entry/7258/images/150706_blend.png)

#### 暗い効果が得られるCSSブレンドモード

![](https://ics.media/entry/7258/images/blendmode-dark.jpg)

効果

プロパティー名

説明

比較(暗)

`darken`

上下の画像を比較して暗いピクセルが表示される

乗算

`multiply`

暗い表現を作るときに使う描画モード

焼きこみ

`color-burn`

乗算よりもより暗くなる描画モード

#### 明るい効果が得られるCSSブレンドモード

![](https://ics.media/entry/7258/images/blendmode-light.jpg)

効果

プロパティー名

説明

比較(明)

`lighten`

上下の画像を比較して明るいピクセルが表示される

スクリーン

`screen`

明るい表現を作るときに使う。かなり使える

覆い焼き

`color-dodge`

スクリーンよりもより明るくなる。インパクトが得られるのでエフェクト作成時などこれもかなりよく使う

#### 明暗両方の効果が得られるCSSブレンドモード

![](https://ics.media/entry/7258/images/blendmode-over.jpg)

効果

プロパティー名

説明

オーバーレイ

`overlay`

乗算とスクリーンの両方に近い効果が得られる。コントラストがあがるため見栄えの印象が上がる

ソフトライト

`soft-light`

明るい部分はさらに明るく、暗い部分はされに暗くする

ハードライト

`hard-light`

ソフトライトよりも強い効果が得られる

#### 差分が得られるCSSブレンドモード

![](https://ics.media/entry/7258/images/blendmode-diff.jpg)

効果

プロパティー名

説明

差の絶対値

`difference`

二枚の画像の違いを可視化するのに役立つ

除外

`exclusion`

差の絶対値よりも弱い効果が得られる

#### 色をベースにしたCSSブレンドモード

![](https://ics.media/entry/7258/images/blendmode-color.jpg)

効果

プロパティー名

説明

色相

`hue`

HSL色空間で合成。下位レイヤーの輝度(L)と彩度(S)、上位レイヤーの色相(H)を持つカラーが得られる

彩度

`saturation`

HSL色空間で合成。下位レイヤーの輝度(L)と色相(H)、上位レイヤーの彩度(S)を持つカラーが得られる

カラー

`color`

HSL色空間で合成。下位レイヤーの輝度(L)、上位レイヤーの彩度(S)と色相(H)を持つカラーが得られる

輝度

`luminosity`

HSL色空間で合成。下位レイヤーの彩度(S)と色相(H)、上位レイヤーの輝度(L)を持つカラーが得られる

#### クロスフェードに役立つCSSブレンドモード

プロパティー名

説明

`plus-lighter`

共通のピクセルを含む2つの要素間でクロスフェードする場合に有用な指定。

`plus-lighter`は他のブレンドモードとは用途が異なり、クロスフェード効果で役立つ指定です。このプロパティーが必要になる場面について、前提から紹介します。

ブレンドモード`normal`だと、2要素の透明度を0→1と1→0へ同時にトランジションさせると、途中で2要素がともに`0.5`の透明度になります。そのとき、両方が透けた状態になるので、表示結果として違和感が生まれることがあります。

![](https://ics.media/entry/7258/images/220330_mix-blend-mode_plus-lighter.png)

`plus-lighter`は2要素がクロスフェードする場合に不透明度が考慮された状態で合成されるので、結果的にクロスフェードが綺麗に表示されます。

デモを用意しているので確認ください。

![](https://ics.media/entry/7258/images/images/220329_plus_lighter.jpg)

▲左側がnormalで、右側がplus-lighterの結果。

-   [別ウインドウでデモを開く](https://ics-creative.github.io/150705_mixblendmode/plus-lighter/)
-   [ソースコードを開く](https://github.com/ics-creative/150705_mixblendmode/tree/master/docs/plus-lighter)

※`plus-lighter`はSafari 15.4やChrome 100、Firefox 99で利用できることを確認しています（2022年4月現在）。

※背景によっては[重ね合わせコンテキスト（スタッキングコンテキスト）](https://ics.media/entry/200609/)の考慮が必要になります。CSSの`isolation: isolate;`などで重ね合わせコンテキストを作成するといいでしょう。

### ブラウザのサポート状況

サイト『[Can I use](https://caniuse.com/mdn-css_properties_mix-blend-mode)』によると、Chrome/Safari/Edge/Firefoxでサポートされています。IEはサポートされていませんが、2022年6月にIEはサポート切れになるので、無視していいでしょう。

![](https://ics.media/entry/7258/images/220329_mix_blendmode_caniuse.png)

▲Firefox 32（2014年9月）以上、Chrome 41（2015年3月）以上、Safari 8（2014年10月）以上、Edge 79（2020年1月）以上でサポートされています。

Microsoft Edgeは2020年からChromiumエンジンになったことで、`mix-blend-mode`を利用できるようになりました。それまでのEdge LegacyやIEでは利用できませんでした。

![](https://ics.media/entry/7258/images/190409_mixblendmode_edge_chromium.jpg)

### まとめ：デザイナーとHTMLコーダーが協力しあえる

2010年代のウェブ制作においては、ブレンドモードとHTMLは相性が悪いものでした。**マークアップエンジニアの中には、デザイナーが作成したPhotoshop等のデザインデータに描画モードがこっそり使われているのを見つけて、ため息をついた方も多いでしょう**。Photoshopの描画モードの見栄えを損なわないためにも、レイヤーの結合やスライスの切り方を工夫し、苦労していたのではないでしょうか？

でも今はほとんどのブラウザで`mix-blend-mode`が使えるので、ブレンドモードをデザインソフトで利用したり、ウェブページにコーディングするのも容易になりました。

続編記事「[CSSのmix-blend-modeで実現するドローイング表現](https://ics.media/entry/8376/)」では、`mix-blend-mode`を使ったウェブのインタラクションデザインの表現手法を紹介します。HTMLの`canvas`要素や`video`要素を組み合わせると表現方法が広がるという事例を紹介しています。

#### 補足：background-blend-mode との違いは

`mix-blend-mode`に似た`background-blend-mode`プロパティというのがあります。これは`background`属性内でブレンドモードを実現するCSSプロパティです。`mix-blend-mode`のほうが応用の幅が広いので、今回はこちらを紹介しました。