---
title: "ウェブにHDRがやってきた 〜 白より明るい世界へ、写真が“本物の輝き”に近づく新技術"
source: "https://ics.media/entry/251024/"
publishedDate: "2025-10-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2025年10月27日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

従来のウェブの画面は黒（`#000000`）から白（`#FFFFFF`）の間で色を表現してきました。この範囲で文字色・背景色などのCSSや画像を扱ってきましたが、最近のウェブではこの範囲を超えた明るさを扱えるようになってきています。

従来の輝度の範囲はSDR（スタンダード・ダイナミック・レンジ）と呼ぶのに対し、この範囲を超えるものをHDR（ハイ・ダイナミック・レンジ）といいます。HDRでは白のさらに上、**より明るい光が肉眼に近い印象**で再現されます。

今年はブラウザの対応状況が進み、HDRをウェブで扱えるようになりました。本記事ではHDRの使い方と魅力を紹介します。

**この記事で説明すること**

-   HDRでリアリティーのある表示ができ、写真・映像の魅力が増す
-   静止画、動画、WebGPUでHDRが可能
-   HDR表示が可能なスマートフォンは普及している
-   ウェブ制作者はHDRを意識する必要がある

### 実装例

HDRの表示がどのようなものか、体験を得られるオリジナルの写真ギャラリーのデモを用意しました。Chrome・Edge・Safariの最新版で、HDR対応ディスプレイ（例：iPhone Pro等）でアクセスして試してみてください。写真を詳細表示したときに、HDR対応ディスプレイではHDRで表示されます。

![](https://ics.media/entry/251024/images/images/251024_demo.jpg)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251022_hdr_photo_gallery/)
-   [コードを確認する](https://github.com/ics-creative/251022_hdr_photo_gallery)

もうひとつ、SDRとHDRを比較可能なデモも用意しました。写真の間の境界線をドラッグして、SDRとHDRの表示を比較してみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/251027_hdr_image/)
-   [コードを確認する](https://github.com/ics-creative/251027_hdr_image)

写真の明るい光の部分が飛び抜けて、白より明るく表示されていることを確認できます。これがHDRの効果です。

### HDRが普及した背景

HDRを表示するには対応するディスプレイやソフトウェアが必要になります。

ここ数年で、端末とOS／ブラウザのHDR対応が進みました。HDRディスプレイはゲーム業界などでは2010年代に登場していましたが、モバイルでは2017年のiPhone XやXperia XZ Premiumなどから採用されています。

モバイルアプリでは、Meta社のSNS（InstagramやThreads、Facebook）が積極的にHDRに対応しています。Instagramのストーリーで、ときおり画面が明るくなるような投稿を見たことがある人がいるかもしれません。それがHDRです。

現代はHDR撮影が可能なスマートフォンが普及しており、ユーザーは知らず知らずのうちにHDRの静止画・動画を投稿していることでしょう。

### HDRの効果

HDRの主な効用は**ハイライト側の表現**にあります。たとえば夜景での光や反射など、輝度差をより豊かに表現できるため、実際にその景色を眺めているような、自然界の輝度を体験できます。

次の写真は、HDRとSDRの写真を並べて比較したものです。高層ビルの夜景で、窓の光の明るさに注目ください。

![](https://ics.media/entry/251024/images/images/251024_hdr_vs_sdr_1.jpg)

SDRでは明るく白い状態で表示されていますが、HDRだと輝きとして表示されています。

![](https://ics.media/entry/251024/images/images/251024_hdr_vs_sdr_2.jpg)

HDRの効果は写真だとわかりづらいのがネックです（SDRで表現できないHDRの輝度を、SDRの図版で解説するのは無理があります……）、少しでも効果を伝えたいと考え動画を用意しました。次の動画でご覧ください。

[https://youtu.be/t2kPQXRATkw](https://youtu.be/t2kPQXRATkw)

EIZOのサイトでは、「高画質をかなえる5つの要素」が説明されています。ウェブでは“色域”は以前からCSSで扱えましたが、2025年に“輝度（HDR）”も扱えるようになったかたちです。

[よくわかる、HDR徹底解説！　HDRとは | EIZO株式会社](https://www.eizo.co.jp/eizolibrary/color_management/hdr/index.html)

![](https://ics.media/entry/251024/images/images/251024_eizo.png)

## HDRの実装方法

ウェブでHDRを扱うハードルは、高くありません。以下の3つの手順で準備します。

1.  HDRの写真素材を用意する
2.  HTMLで`<img>`タグで通常どおり配置
3.  CSSの`dynamic-range-limit`で明るさの上限を制御

### HDRコンテンツの作成

実装の前提になるのは“正しいHDRファイル”を用意することです。

一般的なデジタルカメラでRAW撮影しておけば、現像ソフトでHDRに書き出せます。

[Adobe Lightroom Classic](https://www.adobe.com/jp/products/photoshop-lightroom-classic.html)では、現像モジュールの［基本補正］にある［HDR］を有効にすると、ヒストグラムや各パラメーターがHDR編集向けに切り替わります。書き出し時は［ファイル設定］でAVIFやJPEGなどの形式を選び、［HDR出力］をオンにして保存します。

![](https://ics.media/entry/251024/images/images/251024_lightroom.jpg)

書き出し方法は以下のウェブページが参考になります。

-   [Lightroom で HDR 写真を扱うワークフロー 【HDR合成ではない真のHDR】｜りーしゃん](https://note.com/lisha0808/n/n4d383309b6df)

［互換性を優先］を選択すると、写真をSDR・HDRの両方に対応させられます。ファイルに[ゲインマップ](https://helpx.adobe.com/jp/camera-raw/using/gain-map.html)が含まれるためです。

ここで説明した手順をとらずとも、最近のスマートフォンではデフォルトでHDR記録ができるようになっています。また[SIGMA BF](https://www.sigma-global.com/jp/cameras/bf/)、[Panasonic LUMIX S1RⅡ](https://panasonic.jp/dc/products/DC-S1RM2.html)など、HDR記録が可能なデジタルカメラが存在します。

#### 各画像形式のHDR対応状況

AVIFエーブイアイエフがオススメです。

HDRを扱える画像形式には、HEIFヒーフやJPEG XLもありますが、ブラウザの対応状況はイマイチです。また従来、JPEGはHDRに対応していませんが、JPEGにゲインマップを埋め込む方式としてUltra HDR（JPEG + ゲインマップ）という形式が登場しました。SDR・HDRの両対応ができるゲインマップはファイル容量が増加します。

ウェブではLighthouseなどのスコアツールで、次世代画像形式が推奨されることが多いです。そのため、HDRを使うなら、ファイル容量的にも高効率なAVIFが一番シンプルだと筆者は考えます。

なお、WebPウェッピーはHDRに対応していません。

形式名

HDR対応

備考

**AVIF**

✅

高効率で全ブラウザ対応。

**HEIF**

✅

高効率だが、Safariのみ対応。

**JPEG XL**

✅

高効率だが、Safariのみ対応。

**JPEG**

⚠ 部分対応

SDR・HDR両対応は可能だが容量が大きくなりがち。

**WebP**

❌ 非対応

HDRには未対応。

参考記事：『[次世代画像形式のWebP、そしてAVIFへ。変わり続ける技術に対応するweb制作の黄金解](https://ics.media/entry/201001/)』

### HTMLでの実装方法

HTMLページでは、`img`タグでHDR画像を配置するだけです。

```
<img src="photo_HDR.avif" alt="" />
```

先ほどの写真の書き出し時に［互換性を優先］を選択しましたが、ファイルがSDR・HDRの両方のデータをもつので、ブラウザが自動的に対応した写真を表示してくれます。

### CSSでの制限方法

HDR画像は輝度が強く、ページ内で浮きやすい存在です。一覧画面では控え、詳細表示するときだけHDR表示するのが無難です。CSSで**明るさの上限**を切り替えられます。

CSSの`dynamic-range-limit`プロパティはHDRの“伸び”をどこまで許容するかを要素ごとに指示できます。次のように画面によって、HDR可否を制御するのがいいでしょう。

```
/* 一覧画面では周辺UIとなじませる */
.thumb img {
  /* HDRをSDR相当に抑える */
  dynamic-range-limit: standard;
}

/* 詳細画面 */
.detail img {
  /* ディスプレイの能力をそのまま使う */
  dynamic-range-limit: no-limit;
}
```

`dynamic-range-limit`プロパティのキーワードは以下の指定ができます。

-   `standard`：SDR相当で抑制
-   `no-limit`：抑制なし（HDRで表示）
-   `constrained`：適度に表示（HDRで表示）※Chrome系のみ

詳細はMDN『[dynamic-range - CSS](https://developer.mozilla.org/ja/docs/Web/CSS/@media/dynamic-range)』をご覧ください。

### ユーザーが投稿する写真がHDRかもしれない

ユーザー投稿があるウェブサービスでは、**HDR写真がそのままアップロードできる**ことを意識すべきです。最新スマートフォンは標準カメラでHDR写真を得られるものが多いです。ウェブ開発者が意識していなくても、ユーザーがHDR写真を投稿すれば、ウェブサイトでHDR写真がそのまま表示され、画面のUIから浮いてしまうといったことが考えられます。

また、その逆で、せっかくHDRで撮影して投稿しても、ウェブサービスに投稿すると写真の輝きが失われてしまった、ということも起こりえるでしょう。ウェブサービスでは写真のアップロード時に、画像最適化のサーバーモジュールを使うことが多いです。自動変換で写真のメタデータを除去され、写真の見え方が変わってしまうことも考えられます。

いずれにせよ、ユーザーが写真を投稿できるようなウェブサイトを開発する場合は、**SDRとHDRのディスプレイを用意して、それぞれ動作検証する必要があります**。ウェブ制作者がSDRのディスプレイで作業をしていると、HDRコンテンツが含まれていたときに気付かない、といったトラブルもあり得ます。

※iPhoneやiPadでは、省電力モードにすると、ディスプレイはSDR固定になります。

### 対応端末とスペックの見方

身近な端末でもHDR表示は当たり前になっています。仕様では「HDR10／Dolby Visionの記載」「ピーク輝度のニト値」「DisplayHDR認証」などを手掛かりに、HDR対応かどうかを判断できます。

Apple製品は仕様書に「**ピーク輝度**」という記載があり、これがHDR対応していることを指します。

![](https://ics.media/entry/251024/images/images/251024_iphone.jpg)

以下に2025年現在の代表的なサポート端末を紹介します。

-   iPhone 17 Pro / iPhone Air / iPhone 17（無印）
    -   最大輝度1,000ニト（標準）、ピーク輝度1,600ニト（HDR）、ピーク輝度3,000ニト（屋外）
-   MacBook Pro
    -   XDR輝度：1,000ニトの持続輝度（フルスクリーン）、1,600ニトのピーク輝度（HDRコンテンツのみ）
    -   SDR輝度：最大1,000ニト（屋外）
-   Android
    -   Pixel 9 Pro
        -   最大輝度2,000ニト（HDR輝度）、3,000ニト（ピーク輝度）
-   Windows
    -   Surface Laptop Studio 2
        -   VESA DisplayHDR 400認定

▼iPadでHDR対応有無でこれだけ輝度に差が生まれる。

![](https://ics.media/entry/251024/images/images/251024_hdr_vs_sdr_3.jpg)

### 対応ブラウザ

HDR対応について、ここではCSSの`dynamic-range-limit`プロパティを利用可否の下限として紹介します。

CSSの`dynamic-range-limit`プロパティはChrome 136（2025年4月）・Edge 136（2025年5月）、Safari 26.0（2025年9月）以上で利用可能です。

参照：[Can I use...](https://caniuse.com/mdn-css_properties_dynamic-range-limit)

![](https://ics.media/entry/251024/images/images/251024_caniuse.png)

※CSSとしては2025年からサポートされましたが、ブラウザによっては、画像・動画としては以前からもHDRに対応していました。

### HDR動画

本記事はHDR画像を中心に紹介しましたが、HDR動画も同様に`video`タグとしてブラウザがサポートしており、CSSによって制限できます。

静止画だけではなく、動画も、**YouTubeなど主要サービスがHDR配信に対応しています**。制作者がHDRに対応した動画ファイルを用意すれば、対応端末では“4K HDR”などの表示で再生されます。

![](https://ics.media/entry/251024/images/images/251024_youtube.jpg)

手前味噌ですが、筆者はHDR対応の動画を投稿していますので、ご覧ください。

-   [目黒川の桜 2025年3月30日, 4K HLG - YouTube](https://www.youtube.com/watch?v=5QIm7xQ_Xv0)

iOSでの動画撮影では、HDRのON/OFFが選べます。やはり、**ユーザーは技術としてのHDRを知らずとも、HDRでコンテンツを作っている可能性が高い**といえるでしょう。

![](https://ics.media/entry/251024/images/images/251024_ios_hdr_video.jpg)

### WebGPUでもHDRが可能

`canvas`タグではWebGPUを使う場合に限りHDRの表示が可能です。

『[WebGPU の新機能（Chrome 129）  |  Blog  |  Chrome for Developers](https://developer.chrome.com/blog/new-in-webgpu-129?hl=ja)』にデモが掲載されており、試すことができます。

![](https://ics.media/entry/251024/images/images/251024_webgpu_hdr.jpg)

従来のWebGLにはHDR表示はありませんので、**HDR表示がWebGLにたいするWebGPUの利点のひとつ**と言えます。

### まとめ

HDRが実は一般ユーザーにとって普及していること、そして、ウェブで利用可能な時代が来たことを紹介しました。

一方で、HDRの明るさは制作者側にとって新しい概念です。ユーザー体験を損なわない配慮（輝度の調整や使い所の見極め）は新たな課題として意識することも増えるでしょう。

高輝度で見た目に近い表現は見る人の印象に残りやすく、写真やビジュアルコンテンツの魅力を高めてくれるでしょう。環境が整った今、HDR写真のポテンシャルをウェブで活かしてみてください。

カメラ・レンズや映像機器などのウェブサイトや、写真家のポートフォリオサイトでは、HDR対応する価値は高いように思います。

### 補足：フォトレタッチのHDR合成とは別物

なお、本記事で扱ったHDRは「複数枚の露出を合成してダイナミックレンジを広げる**撮影手法**」のことではありません（参照『[ハイダイナミックレンジ合成 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%82%A4%E3%83%80%E3%82%A4%E3%83%8A%E3%83%9F%E3%83%83%E3%82%AF%E3%83%AC%E3%83%B3%E3%82%B8%E5%90%88%E6%88%90)』）。本記事は撮影工程での合成の有無にかかわらず、最終的にHDR画像として書き出し、それをHDR対応ディスプレイで表示する、という話題です。