---
title: "imgタグのsrcset・sizes属性とpictureタグの使い方 - レスポンシブイメージで画像表示を最適化"
source: "https://ics.media/entry/13324/"
publishedDate: "2016-09-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

日本のウェブサイトにおけるスマートフォン・タブレットユーザーのシェアは約47%であり、ウェブデザインはレスポンシブ対応しモバイルを意識した設計が必須です（参照「[StatCounter](https://gs.statcounter.com/platform-market-share/all/japan/2024)」)。

HTMLの「レスポンシブイメージ」を使えば、HTMLのタグだけで表示端末にあわせた画像を配信できます。

本記事では、サンプルを通してレスポンシブイメージの特徴と使い方について解説します。

**この記事で学べること**

-   `img`要素の`srcset`属性と`sizes`属性の使い方
-   `picture`要素の使い方

### レスポンシブイメージとは一体何か？

**レスポンシブイメージとは、レスポンシブなウェブサイトにおける画像の取り扱い方を定めたHTMLの技術**。2016年勧告のHTML 5.1に追加された仕様です（[現在のHTMLの仕様書](https://html.spec.whatwg.org/multipage/)）。主な特徴は次の通りです。

1.  CSSやJavaScriptを使わず、HTMLのみでレスポンシブな画像を取り扱える
2.  デバイスに応じた**最適な「大きさ」**の画像を表示できる
3.  デバイスに応じた**最適な「見た目」**の画像を出し分けできる

### 今回作成するサンプルについて

まずは完成形のページをご覧ください。うさぎの画像がレスポンシブイメージで表示されています。520px以上の画面幅のときは、大きさの違う`medium.jpg`、`large.jpg`のうち最適な画像が、520px未満の画面幅のときは、四角にクロップ（切り抜き）された画像がそれぞれ表示されます。

-   [完成版サンプル](https://ics-creative.github.io/160920_responsive_image/demo4_polyfill.html)

![](https://ics.media/entry/13324/images/160926_responsive_image_demo.jpg)

### 異なる大きさの画像表示の問題点

レスポンシブなウェブサイトで画像を表示する場合、スマートフォン、タブレット、ノートパソコン、デスクトップパソコン等、あらゆるデバイス幅・解像度に適した画像を準備する必要があります。異なる大きさの`small.jpg`、`medium.jpg`、`large.jpg`を作成し、画像を出し分けるにはどうすればよいのでしょうか？

![](https://ics.media/entry/13324/images/160926_responsive_image_imagesize.jpg)

### レスポンシブイメージにおける画像出し分け

レスポンシブイメージにおいて前述の画像出し分け処理を行うには、HTMLの`img`タグに3つの情報を記述します。

1.  画像ファイルのパス
2.  画像ファイルの横幅
3.  画像をウェブページ上で表示する際の横幅

HTMLコードは下記となります。注目すべきは`img`タグに指定された`srcset`属性と`sizes`属性です。

```
<img srcset="images/small.jpg 320w,
          images/medium.jpg 640w,
          images/large.jpg 1280w"
     src="images/large.jpg"
     sizes="(max-width:1280px) 100vw, 1280px">
```

#### 画像ファイルのパスと横幅は`srcset`属性

画像ファイルのパスと横幅は、`img`タグの`srcset`属性に記述します。**「画像ファイルの横幅」は、「画像をウェブページ上で表示する際の横幅」ではない**ことに注意してください。

```
srcset="images/small.jpg 320w,
      images/medium.jpg 640w,
      images/large.jpg 1280w"
```

パスと横幅の間には半角スペースを挿入します。横幅の単位は`px`でなく`w`（幅記述子）を用います。`small.jpg`は320pxの画像、`medium.jpg`は640pxの画像、`large.jpg`は1280pxの画像である、という情報をブラウザに伝えています。

![](https://ics.media/entry/13324/images/160926_responsive_image_photoshop_srcset.png)

#### 画像を表示する際の横幅は`sizes`属性

表示する画像の横幅は`sizes`属性に記述します。メディアクエリーと組み合わせて複数の横幅を指定可能です。ディスプレイ1280px以下の時は画面幅、それ以外では1280pxで画像を表示したい場合は次のように記述します。

```
sizes="(max-width:1280px) 100vw, 1280px"
```

![](https://ics.media/entry/13324/images/160926_responsive_image_photoshop_sizes.png)

※ `vw`とはビューポートの幅に対する割合を示します。`100vw`は、ビューポート幅に対して100%の割合という意味です。  
※ `sizes`属性に`100vw`を指定した場合、普通はウインドウ幅の変更に応じて画像サイズが変わります。しかし、Safariだけ`100vw`を指定しても、ウインドウ幅に連動して変化しません。Safariを含む全ブラウザ共通でウインドウ幅に応じて画像サイズを変えたい場合は、CSSで`width`プロパティに`%`を指定するとよいでしょう。

-   [ソースコードを確認する](https://github.com/ics-creative/160920_responsive_image/blob/master/docs/demo2_srcset_sizes.html#L13-L19)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/160920_responsive_image/demo2_srcset_sizes.html)

#### ブラウザが最適な画像を選定してくれる

従来の画像のレスポンシブ対応では、画面幅1280px以上のときは`large.jpg`、画面幅1280px未満でデバイスピクセル比2の時は`medium.jpg`というように、環境に応じてどの画像を表示するのかを開発者が決定する必要がありました。**レスポンシブイメージでは、表示すべき画像を判断するのはブラウザです**。

「画像ファイルのパス・横幅、表示したい画像幅」の情報を元に、クライアントの環境に応じて最適な画像が表示されます。**開発者はどの画面幅でどの画像を表示するべきか、について思い悩む必要はありません**。

注意しなければならないのは、**「環境に応じた最適な画像決定」の仕組みはブラウザによって異なる**ことです。たとえば次のような挙動があります。

-   Chrome : 大きなサイズの画像ファイルをキャッシュした場合、画面幅を狭めても小さい画像は読み込まれない
-   Firefox : 画面幅を変える度に、画面幅に適したサイズの画像を読み込む
-   Safari : 最初に開いた画面幅に応じた画像ファイルがキャッシュされ、画面幅を変えても画像は再読み込みされない

この手法では、単にサイズの異なる画像を場合はとくに問題ありませんが、たとえば**スマートフォン向けにはトリミングをした異なる画像を出し分けたいといった場合に対応ができません**。

### 画像の見せ方をコントロールするアートディレクション

ここまで作成したコンテンツを再確認してみましょう。ディスプレイに充分な広さがある場合には最適な見え方と言えますが、狭いディスプレイの場合はそうは言えません。

![](https://ics.media/entry/13324/images/160926_responsive_image_photoshop_no_artdirection.jpg)

今回のようなメインビジュアルでは、主題はうさぎの顔です。**狭いディスプレイの場合は顔の部分だけがクロップされた画像を表示するのが理想的です**。

![](https://ics.media/entry/13324/images/160926_responsive_image_photoshop_dist_artdirection.jpg)

デバイス毎に見た目の異なる画像を出し分け、**最適な画像の見せ方を選択する手法を「アートディレクション」といいます**。前述の通り、`srcset`属性と`sizes`属性だけでは、デバイス幅毎に強制的に画像を出し分けられません。特定の条件で画像を強制的に切り替え、アートディレクションを実現するための方法として、`picture`要素が利用できます。

#### アートディレクションを実現する`picture`要素

`picture`要素を使うと、画面解像度や画面幅、画像形式等に基づいて、開発者が任意の画像を出し分けることが可能です。

`picture`要素の書き方を紹介します。

```
<picture>
  <source media="(max-width:400px)" srcset="sp.jpg 400w" sizes="100vw">
  <source media="(max-width:600px)" srcset="tab.jpg 600w" sizes="100vw">
  <img src="pc.jpg">
</picture>
```

`picture`タグは複数の`source`タグと1つの`img`タグで構成されます。`source`タグには3つの属性を指定します。

-   `media`属性（メディアクエリ）
-   `srcset`属性
-   `sizes`属性

ブラウザは各`source`タグの`media`属性を評価し、マッチするものがあれば`srcset`属性で指定された画像を表示します。マッチするものがなかったり、ブラウザが`picture`要素に対応していない場合は、`img`タグの画像が表示されます。`img`タグの指定は必須です。

#### `picture`要素のサンプル

ここまで作成したサンプルをアートディレクションに対応させます。画面幅`520px`以下の時にクロップされた画像（`cropped.jpg`）を表示します。画面幅`520px`より大のときは、これまでの処理を流用しつつ`source`タグに書き換えます。

```
<picture>
  <source media="(max-width:520px)"
          srcset="images/cropped.jpg 640w"
          sizes="100vw">
  <source srcset="images/medium.jpg 640w,
                  images/large.jpg 1280w"
          sizes="(max-width:1280px) 100vw,
                    1280px">
  <img src="images/large.jpg"
       alt="">
</picture>
```

-   [ソースコードを確認する](https://github.com/ics-creative/160920_responsive_image/blob/master/docs/demo3_picture.html#L13-L23)
-   [サンプルを別ウインドウで再生する](https://ics-creative.github.io/160920_responsive_image/demo3_picture.html)

### コラム：picture要素でHDR写真等を表示する方法

最新のブラウザーは **`color-gamut`**（色域）と **`dynamic-range`**（表示可能なダイナミックレンジ）というメディア特性を実装しています。写真等の画像をより美しく配信する際に、HDR画像やDisplay-P3（iPhone等で対応）の写真を配信することも検討できるでしょう。その場合でも本記事で説明した`<picture>`要素と`<source>`が役立ちます。

例：HDRの写真を配信する場合

```
<picture>
  <!-- HDR 環境（HDR PQ）向け -->
  <source
    type="image/avif"
    srcset="hero-hdr.avif"
    media="(dynamic-range: high)" />

  <!-- フォールバック：sRGB／SDR 環境 -->
  <img src="hero-srgb.jpg" alt="メインビジュアル" />
</picture>
```

例：Display-P3の写真を配信する場合

```
<picture>

  <!-- 広色域環境（Display-P3）向け -->
  <source
    srcset="hero-p3.jpg"
    media="(color-gamut: p3)" />

  <!-- フォールバック：sRGB／SDR 環境 -->
  <img src="hero-srgb.jpg" alt="メインビジュアル" />
</picture>
```

HDRやDisplay-P3はウェブで普及しているとは言いづらいですが、もし使う場合は、未対応環境のためにimgタグでSDR・sRGB画像にフォールバックできるようにしておきましょう。ここでお伝えしたいのは、`picture`タグは画面幅のレスポンシブイメージのみならず、**メディア特性に応じてさまざまな使い方ができる**ということです。

### レスポンシブイメージのクロスブラウザ対応

レスポンシブイメージは便利な機能ですが、対応ブラウザが気になるところです。`srcset`属性と`sizes`属性、`picture`要素は、**すべてのブラウザで利用可能です**。

![srcset属性とsizes属性のブラウザ対応状況](https://ics.media/entry/13324/images/images/160926_responsive_image_cauiuse_srcset_2022.png)

▲ `srcset`属性と`sizes`属性のブラウザ対応状況 (参照「[Can I use](https://caniuse.com/srcset)」)

![picture要素のブラウザ対応状況](https://ics.media/entry/13324/images/images/160926_responsive_image_cauiuse_picture_2022.png)

▲ `picture`要素のブラウザ対応状況 (参照「[Can I use](https://caniuse.com/picture))」

※Inetnet Explorer 11ではpicture要素やsizes属性はサポートされていませんでしたが、IE11は2022年6月に終了しています。

### これからはレスポンシブイメージを積極的に使おう

HTMLのみでレスポンシブなレイアウトの画像表示を扱うレスポンシブイメージ。

`srcset`属性と`sizes`属性の特徴は、画像サイズの異なる複数の画像情報を示しておけば、ブラウザが環境に応じて自動で最適な画像をユーザーに表示することです。`picture`要素の特徴は、特定の条件のときに異なる見た目の画像を出し分け、アートディレクションを実現できることです。

**レスポンシブイメージの用途・メリットを理解し、必要に応じて使い分け、今後のレスポンシブウェブデザイン制作に役立てましょう**。