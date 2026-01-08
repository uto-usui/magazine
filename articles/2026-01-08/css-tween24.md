---
title: "CSSフィルターやクリッピング、タイムスケールなど！ 表現の幅を広げる「Tween24」の新機能"
source: "https://ics.media/entry/220518/"
publishedDate: "2022-05-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

「[Tween24.js](https://github.com/a24/tween24js)」はメソッドチェーンで記述するのが特徴で、たった1行でアニメーションが実装可能なJavaScriptライブラリです。筆者が開発を続けており、2022年3月に正式リリースをしてからも機能追加のアップデートを重ねて、**バージョン1.4**となりました。

この記事ではバージョン1.1〜1.4で追加された機能について紹介します。バージョン1.0のリリースから**下位バージョンとの互換性がある**ため、すでにお使いの方もそのまま利用いただけます。

基本的な使い方や導入方法を知りたい方は、記事『[新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)』をご覧ください。

**バージョン1.1〜1.4の主なアップデート内容**

-   新機能：トゥイーンを繰り返す`repeat()`
-   新機能：時間のスケールを変化させる`timeScale()`
-   新機能（クリップ）：短形のクリッピングを設定する`clip()`
-   新機能（クリップ）：円形のクリッピングを設定する`clipCircle()`
-   新機能（クリップ）：楕円形のクリッピングを設定する`clipEllipse()`
-   新機能（フィルター）：ぼかしを設定する`blur()`
-   新機能（フィルター）：明るさを設定する`brightness()`
-   新機能（フィルター）：コントラストを設定する`contrast()`
-   新機能（フィルター）：グレースケールを設定する`grayscale()`
-   新機能（フィルター）：色相を設定する`hue()`
-   新機能（フィルター）：色反転を設定する`invert()`
-   新機能（フィルター）：透明度を設定する`opacityFilter()`
-   新機能（フィルター）：彩度を設定する`saturate()`
-   新機能（フィルター）：セピア調の度合を設定する`sepia()`
-   新機能（フィルター）：ドロップシャドウを設定する`shadow()`

### 新機能：トゥイーンを繰り返すrepeat()

`repeat()`は、指定した回数だけトゥイーンを繰り返します。`Tween24.tween()`や`Tween24.prop()`などの子のトゥイーンに指定するメソッドで、`Tween24.serial()`のような親トゥイーンには指定できません。

`Tween24.loop()`と似ていますが、`Tween24.loop()`は配下の子トゥイーンを繰り返し`play()`します（トゥイーンの始点も更新される）が、`repeat()`は一度の`play()`で同じ動きを繰り返します。

```
Tween24.tween(...).repeat(繰り返し回数)
```

```
// トゥイーンを3回繰り返す
Tween24.tween(".box", 1).x(860).repeat(3).play();
```

![デモ](https://ics.media/entry/220518/images/repeat.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#repeat)

### 新機能：時間のスケールを変化させるtimeScale()

`timeScale()`は、トゥイーンのタイムスケールを設定します。たとえば`timeScale(2)`と指定すると`time`が2倍になり、`timeScale(0.5)`とすると半分になります。同様に`delayScale()`を指定すると、`delay`のタイムスケールも設定できます。親トゥイーンに設定した場合は、すべての子トゥイーンにも反映されます。

また`Tween24.setGlobalTimeScale()`を設定すると、すべてのトゥイーンのタイムスケールをまとめて変更できます。たとえば、サイト全体のテンポ感を調整したり、デバッグに不要なアニメーションを早送りするなどできます。

```
Tween24.tween(...).timeScale(時間のスケール).delayScale(遅延時間のスケール)

Tween24.setGlobalTimeScale(すべてのトゥイーンの時間のスケール)
```

```
// タイムスケールをまとめて半分にします
Tween24.serial(
    Tween24.tween(".box", 1).x(860),
    Tween24.tween(".box", 1).x(0)
).timeScale(0.5).play();
```

![デモ](https://ics.media/entry/220518/images/timeScale.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#timeScale)

### 新機能：短形のクリッピングを設定するclip()

`clip()`はCSSの`clip-path:inset`で短形の表示領域を設定し、上下左右の4辺をまとめて指定します。`%`や`px`単位で指定でき、`clip("100%")`で見えなくなります。

辺毎に指定したい場合は、`clipTop()` `clipRight()` `clipBottom()` `clipLeft()`を使用し、上下・左右をまとめて指定したい場合は、`clipVertical()` `clipHorizontal()`を使用します。

矩形を角丸にしたい場合は、`clipRound()`でまとめて指定し、`clipRound1()`〜`clipRound4()`で個別に指定できます。

```
Tween24.tween(...).clip(4辺のクリッピング幅)
Tween24.tween(...).clipTop(上の幅)
Tween24.tween(...).clipRight(右の幅)
Tween24.tween(...).clipBottom(下の幅)
Tween24.tween(...).clipLeft(左の幅)

Tween24.tween(...).clipVertical(上下の幅)
Tween24.tween(...).clipHorizontal(左右の幅)

Tween24.tween(...).clipRound(4つ角の角丸)
Tween24.tween(...).clipRound1(左上の角丸)
Tween24.tween(...).clipRound2(右上の角丸)
Tween24.tween(...).clipRound3(右下の角丸)
Tween24.tween(...).clipRound4(左下の角丸)
```

```
Tween24.serial(
    // 矩形クリップの上下を99%、左右を100%、角丸を600pxに設定
    Tween24.prop("img").clipVertical("99%").clipHorizontal("100%").clipRound("600px"),
    // 左右のクリップを0%にし、進捗50%で次の処理へ移る
    Tween24.tween("img", 0.8, Ease24._6_ExpoInOut).clipHorizontal("0%").jump(0.5),
    // 上下のクリップを0%に、角丸を0pxにする
    Tween24.tween("img", 0.8, Ease24._6_ExpoInOut).clipVertical("0%").clipRound("0px")
).play();
```

![デモ](https://ics.media/entry/220518/images/clip.gif) ※ 本記事中のデモで使用している写真は、筆者が撮影したものです。

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#clip)

### 新機能：円形のクリッピングを設定するclipCircle()

`clipCircle()`はCSSの`clip-path:circle`で円形の表示領域を設定し、直径を`%`や`px`単位で指定します。中心座標を変更したい場合は、`clipCircleX` `clipCircleY` `clipCircleXY` で指定します。

```
Tween24.tween(...).clipCircle(円形のサイズ)

Tween24.tween(...).clipCircleX(中心のX座標)
Tween24.tween(...).clipCircleY(中心のY座標)
Tween24.tween(...).clipCircleXY(中心のX座標, 中心のY座標)
```

```
Tween24.serial(
    // 円クリップのサイズを0%に、位置を左下に設定
    Tween24.prop("img").clipCircle("0%").clipCircleXY("20%", "60%"),
    // クリップのサイズを20%にする
    Tween24.tween("img", 0.8, Ease24._6_ExpoInOut).clipCircle("20%"),
    // クリップの位置を右上に移動する
    Tween24.tween("img", 1, Ease24._6_ExpoInOut).clipCircle("10%").clipCircleXY("90%", "20%"),
    Tween24.parallel(
        // クリップのX座標を中央に、イージングなしで移動する
        Tween24.tween("img", 0.8).clipCircleX("50%"),
        // クリップのY座標を移動する
        Tween24.tween("img", 0.8, Ease24._BackOut).clipCircleY("50%"),
        // 0.2秒遅延して、クリップのサイズを100%にする
        Tween24.tween("img", 1, Ease24._6_ExpoInOut).clipCircle("100%").delay(0.2)
    )
).play();
```

![デモ](https://ics.media/entry/220518/images/clipCircle.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#clipCircle)

### 新機能：楕円形のクリッピングを設定するclipEllipse()

`clipEllipse()`はCSSの`clip-path:ellipse`で楕円形の表示領域を設定し、幅と高さを`%`や`px`単位で指定します。中心座標を変更したい場合は、`clipEllipseX` `clipEllipseY` `clipEllipseXY` で指定します。

```
Tween24.tween(...).clipEllipse(楕円の幅, 楕円の高さ)
Tween24.tween(...).clipEllipseWidth(楕円の幅)
Tween24.tween(...).clipEllipseHeight(楕円の高さ)

Tween24.tween(...).clipEllipseX(中心のX座標)
Tween24.tween(...).clipEllipseY(中心のY座標)
Tween24.tween(...).clipEllipseXY(中心のX座標, 中心のY座標)
```

```
Tween24.serial(
    // 楕円クリップの横サイズを0px、縦30pxに設定
    Tween24.prop("img").clipEllipse("0px", "30px"),
    // クリップの横サイズを200pxにし、進捗30%で次の処理に移行する
    Tween24.tween("img", 0.4, Ease24._BackOutWith(3)).clipEllipseWidth("200px").jump(0.3),
    // クリップの縦サイズを200pxにする
    Tween24.tween("img", 0.4, Ease24._BackOutWith(2)).clipEllipseHeight("200px")
).play();
```

![デモ](https://ics.media/entry/220518/images/clipEllipse.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#clipEllipse)

### 新機能：ぼかしを設定するblur()

`blur()`は、CSSフィルターでぼかしを設定します。ぼかしの半径は、数値（px）で指定します。

※ CSSフィルターはDOM要素に適用されるため、PixiJSやThree.js等の任意のオブジェクトには適用されません。

```
Tween24.tween(...).blur(ぼかしの半径)
```

```
Tween24.serial(
    // ぼかしを8pxにする
    Tween24.tween("img", 1).blur(8),
    // ぼかしをなしにする
    Tween24.tween("img", 1).blur(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/blur.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#blur)

### 新機能：明るさを設定するbrightness()

`brightness()`は、CSSフィルターで明るさを設定します。明るさの値は`1`が標準、`0`で真っ暗になり、`1`以上で明るくなります。

```
Tween24.tween(...).brightness(明るさ)
```

```
Tween24.serial(
    // 明るさを1.5にする
    Tween24.tween("img", 1).brightness(1.5),
    // 明るさを元に戻す
    Tween24.tween("img", 1).brightness(1),
    // 暗くする
    Tween24.tween("img", 1).brightness(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/brightness.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#brightness)

### 新機能：コントラストを設定するcontrast()

`contrast()`は、CSSフィルターで明るさを設定します。コントラストの値は`1`が標準、`0`で低くなり、`1`以上で高くなります。

```
Tween24.tween(...).contrast(コントラスト)
```

```
Tween24.serial(
    // コントラストを2にする
    Tween24.tween("img", 1).contrast(2),
    // コントラストを元に戻す
    Tween24.tween("img", 1).contrast(1),
    // コントラストを0にする
    Tween24.tween("img", 1).contrast(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/contrast.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#contrast)

### 新機能：グレースケールを設定するgrayscale()

`grayscale()`は、CSSフィルターでグレースケールを設定します。グレースケールの値は`0`が標準で、`1`でグレーになります。

```
Tween24.tween(...).grayscale(グレースケール値)
```

```
Tween24.serial(
    // 画像をグレーにする
    Tween24.tween("img", 1).grayscale(1),
    // 元に戻す
    Tween24.tween("img", 1).grayscale(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/grayscale.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#grayscale)

### 新機能：色相を設定するhue()

`hue()`は、CSSフィルターで色相を設定します。色相は`0`から`360`の回転角度を度数法で指定します（ラジアンでの指定はできません）。

```
Tween24.tween(...).hue(色相の回転角度)
```

```
Tween24.serial(
    // 色相を一周(360度)させる
    Tween24.tween("img", 5).hue(360),
    // 色相を元に戻す
    Tween24.tween("img", 5).hue(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/hue.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#hue)

### 新機能：色反転を設定するinvert()

`invert()`は、CSSフィルターで色反転の割合を設定します。色反転は`0`が通常で、`1`で完全に反転します。

```
Tween24.tween(...).invert(色の反転割合)
```

```
Tween24.serial(
    // 色を反転させる
    Tween24.tween("img", 2).invert(1),
    // 反転を元に戻す
    Tween24.tween("img", 2).invert(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/invert.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#invert)

### 新機能：透明度を設定するopacityFilter()

`opacityFilter()`は、CSSフィルターで透明度を設定します。透明度は`1`で透過なし、`0`で完全に透過します。一般的な`opacity`と同じものに思えますが、ブラウザーによってはハードウェアアクセラレーションが有効になり性能が上がります（[MDN | opacity()](https://developer.mozilla.org/ja/docs/Web/CSS/filter-function/opacity) 参照）。

```
Tween24.tween(...).opacityFilter(透明度)
```

```
Tween24.serial(
    // 透明度を0にする
    Tween24.tween("img", 1).opacityFilter(0),
    // 透明度を元に戻す
    Tween24.tween("img", 1).opacityFilter(1)
).play();
```

![デモ](https://ics.media/entry/220518/images/opacity.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#opacity)

### 新機能：彩度を設定するsaturate()

`saturate()`は、CSSフィルターで彩度を設定します。彩度は`1`で標準、`0`で低くなり、`1`以上で高くなります。

```
Tween24.tween(...).saturate(彩度)
```

```
Tween24.serial(
    // 彩度を2にする
    Tween24.tween("img", 1).saturate(2),
    // 彩度を元に戻す
    Tween24.tween("img", 1).saturate(1),
    // 彩度を0にする
    Tween24.tween("img", 1).saturate(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/saturate.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#saturate)

### 新機能：セピア調を設定するsepia()

`sepia()`は、CSSフィルターでセピア調の割合を設定します。セピア調は`0`で標準、`1`でセピアになります。

```
Tween24.tween(...).sepia(セピア調の割合)
```

```
Tween24.serial(
    // 色をセピア調にする
    Tween24.tween("img", 1).sepia(1),
    // 色を元に戻す
    Tween24.tween("img", 1).sepia(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/sepia.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#sepia)

### 新機能：ドロップシャドウを設定するshadow()

`shadow()`はCSSフィルターでドロップシャドウを設定し、シャドウのオフセット値（距離）・ぼかし具合・色をまとめて指定します。個別に指定したい場合は、`shadowX` `shadowY` `shadowBlur` `shadowColor`を使用します。

```
Tween24.tween(...).shadow(X軸のオフセット値, Y軸のオフセット値, ぼかしの半径, シャドウの色)
```

```
Tween24.serial(
    // ドロップシャドウの初期値を設定
    Tween24.prop("img").shadow(8, 8, 0, "#777"),
    // 距離を16pxに、ぼかしを32pxにする
    Tween24.tween("img", 1).shadowXY(16, 16).shadowBlur(32),
    // 距離を8pxに、ぼかしを0pxにする
    Tween24.tween("img", 1).shadowXY(8, 8).shadowBlur(0)
).play();
```

![デモ](https://ics.media/entry/220518/images/shadow.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/filters.html#shadow)

### その他、不具合の修正

-   コードを最適化し、パフォーマンスが大きく向上しました。
-   トゥイーンのステータスを確認できる`isPlaying` `isPausing`プロパティを追加しました。
-   コンソールのバージョン表示をスキップする`Tween24.skipHello()`を追加しました。
-   `delay`中に一時停止した場合、再開時に`delay`が正しく反映されない問題を修正しました。

### まとめ

今後のアップデートとしては、**イベントに連動したトゥイーン**や、**ボタンアニメーションを簡単に制作できるテンプレート機能**なども実装予定です。

引き続き「[MITライセンス](https://github.com/a24/tween24js/blob/master/LICENSE)」で公開していますので、**個人・商用問わず自由に使用してください**。

その他のTween24関連の記事は、以下からご覧ください。

-   [新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)
-   [「Tween24.js」の新機能！ループやテキストアニメーションなど、ウェブサイトの演出に役立つ機能を追加](https://ics.media/entry/210622/)
-   [単なるアニメーションにとどまらない！条件分岐やイベント待機など「Tween24.js」の新機能](https://ics.media/entry/210818/)
-   [マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現](https://ics.media/entry/211209/)
-   [アニメーションライブラリ「Tween24.js」正式リリース！相対値や曲線移動などバージョン1.0の新機能](https://ics.media/entry/220304/)