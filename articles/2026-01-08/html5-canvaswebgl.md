---
title: "HTML5 CanvasとWebGLの高解像度対応はどこまで行うべきか"
source: "https://ics.media/entry/11020/"
publishedDate: "2016-02-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

2016年2月3日（水）、[ICTCO](http://ictco.jp/access.html)にて100人の定員規模で開催されたセミナー「[DIST.10 デザインとJavaScript](http://dist.connpass.com/event/24320/)」。その中で「HTML5 Canvasコンテンツの高解像度対応はどこまで行うべきか」というタイトルで登壇しました。今回はその発表資料を記事として公開します。

### FWAでピックアップされているサイトでは70%がcanvas要素を使っている

モーショングラフィックや3D表現等のリッチな表現をWebコンテンツで行う場合、`canvas`要素は不可欠です。[FWA](http://www.thefwa.com/)のSITE OF THE DAY(※)で調査したところ、2015年11月から3ヶ月間の**91件中61件（約70%）のサイトで`canvas`要素（Context2D、WebGL）が使われていました**。

![canvas要素を使用しているのは91件中61件(約70%)。](https://ics.media/entry/11020/images/160219_desktop_retina_utilization_ratio.png)

※ FWAは世界的権威のWebデザインアワードで、優れたデザインのWebサイトを毎日1つずつ「SITE OF THE DAY」として取り上げています。

### Webコンテンツの高解像度対応

さて、皆さんはデスクトップコンテンツで`canvas`要素を表示する時、高解像度ディスプレイ用の対応をしていますか？　本記事において「高解像度ディスプレイ」とは、iPhoneのRetinaディスプレイのように[ピクセル密度(ppi)](https://ja.wikipedia.org/wiki/Ppi)が高いディスプレイ（HiDPIディスプレイ）のことを指します。**高解像度対応とはこれらのディスプレイでWebコンテンツを見ても画像をボケさせずに見せる為の対応のこと**です。この対応をデスクトップの`canvas`要素について対応する必要はあるのでしょうか？

![](https://ics.media/entry/11020/images/160219_desktop_retina_about.png)

### 増加する高解像度のデスクトップ

高解像度のデスクトップの背景を見てみましょう。近年では、高解像度ディスプレイを搭載したデスクトップが増えています。下図は「[価格.com](http://kakaku.com/)」で調査した、200ppi以上の高解像度ディスプレイWindows用ノートPCの発売台数です。右肩上がりに増加しています。

![](https://ics.media/entry/11020/images/160219_desktop_retina_hidpi_windows.png)

Apple社が2015年に発売したMacBookは、3種類中2種類がRetinaディスプレイとなっています。

![](https://ics.media/entry/11020/images/160219_desktop_retina_macbook.png)

増加する高解像度ディスプレイに対応するため、デスクトップ向けのWebコンテンツでも高解像度対応が必要であり、`canvas`要素も高解像度対応が必要だと言えます。

では、冒頭で紹介した`canvas`要素を使った61コンテンツのうち、どれくらいが高解像度対応をしているのでしょうか？

### canvas要素の高解像度対応状況を調査

`canvas`要素の高解像度対応状況を調べるめに、冒頭で紹介した61コンテンツの全ソースコードを解析し、高解像度ディスプレイを搭載したMacBook Pro RetinaDisplayモデルで目視確認をしました。

![](https://ics.media/entry/11020/images/160219_desktop_retina_investigation.png)

すると、`canvas`要素を使っている61件コンテンツの中で20件、**33%のサイトが高解像度の対応をしている**ことがわかりました。FWAでピックアップされているサイトでは、`canvas`要素の高解像度対応をしつつあることがわかります。

![](https://ics.media/entry/11020/images/160219_desktop_retina_canvas_ratio.png)

また、WebGLを使ったコンテンツの方が高解像度対応率がやや高い結果となりました。

![](https://ics.media/entry/11020/images/160219_desktop_retina_vs_webgl.png)

### 高解像度対応の手法は同じだった

興味深いことに、20件のコンテンツの高解像度対応手法はすべて同じでした。

1.  `canvas`要素の`width`属性と`height`属性をデバイスピクセル比`devicePixelRatio`（※）分だけ拡大する。
2.  `canvas`要素の`style`属性の`width`と`height`をデバイスピクセル比分だけ縮小する。

**`canvas`要素の高解像度対応の方法がすべて同じだったので、これが標準的な手法と言える**でしょう。ちなみにこれは高画質の画像を作成し、`img`要素を半分の大きさに縮小するという画像の高解像度対応と似た考え方です。

※ デバイスピクセル比とは、1ピクセルをデバイスの何ピクセルで表示するかを示した数値です。たとえばMacBook Pro Retinaディスプレイの場合は「2」です。詳しくは記事「[いまさら聞けないRetina対応のための「ピクセル」の話 – Rriver](http://parashuto.com/rriver/development/pixel-related-info-for-coping-with-retina-displays)」を参照してください。

![](https://ics.media/entry/11020/images/160219_desktop_retina_howto.png)

▲ デバイスピクセル比が「2」だった場合の高解像度対応の様子。

#### 高解像度対応のデモ

高解像度対応の手法をテストするためのデモを作成しました。`canvas`要素を2つ並べています。左側の`canvas`要素に対して前述の高解像度対応を行っています。

-   [デモを別タブで再生する](https://ics-creative.github.io/160219_desktop_retina/index.html)
-   [ソースコード](https://github.com/ics-creative/160219_desktop_retina) (TypeScript 1.7.3)

MacBook Pro Retinaディスプレイで閲覧したキャプチャー画像が以下です。高解像度対応をした左側の`canvas`要素の方だけがボケずに表示されます。なお、高解像度でないディスプレイで閲覧した場合は見え方の違いはほぼありません。

![](https://ics.media/entry/11020/images/160219_desktop_retina_capture.png)

高解像度対応のJavaScriptのコードは下記です。

```
var myCanvas = document.getElementById("myCanvas");

// 1. canvas要素のwidth属性とheight属性をdevicePixelRatio分だけ拡大する。
myCanvas.width *= devicePixelRatio;
myCanvas.height *= devicePixelRatio;

// 2. canvas要素のstyle属性のwidthとheightをdevicePixelRatio分だけ縮小する。
myCanvas.style.width =
  String(myCanvas.width / devicePixelRatio) + "px";
myCanvas.style.height =
  String(myCanvas.height / devicePixelRatio) + "px";
```

### デスクトップのcanvas要素の高解像度対応をするべき時代に

本記事で伝えたかったことは3つです。

1.  高解像度ディスプレイのデスクトップが増えているため、デスクトップの`canvas`要素の高解像度対応が必要となってきた。
2.  FWAでピックアップされているサイトでは3割ほどが対応済み。
3.  `canvas`要素を高解像度対応する標準的な方法は、2倍サイズのコンテンツを作って半分に縮小すること。

デスクトップで`canvas`要素を使用する際の参考になれば幸いです。