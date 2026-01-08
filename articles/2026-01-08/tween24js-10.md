---
title: "アニメーションライブラリ「Tween24.js」正式リリース！ 相対値や曲線移動などバージョン1.0の新機能"
source: "https://ics.media/entry/220304/"
publishedDate: "2022-03-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

「[Tween24.js](https://github.com/a24/tween24js)」はメソッドチェーンで記述するのが特徴で、たった1行でアニメーションが実装可能なJavaScriptライブラリです。筆者が開発を続けており、今回の2022年3月のアップデートでは6つの新しい機能を追加し、**バージョン1.0として正式リリース**となります。

正式リリースでメジャーバージョンが変わりますが、仕組みの変更はなく**下位バージョンとの互換性がある**ため、すでにお使いの方もそのまま利用いただけます。

基本的な使い方や導入方法を知りたい方は、記事『[新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)』をご覧ください。

**今回のアップデート内容**

-   新機能：曲線的に座標移動させる`bezier()`
-   新機能：設定時からの相対値でトゥイーンさせる`...$()`
-   新機能：直前の値からの相対値にトゥイーンさせる`...$$()`
-   新機能：座標・変形の基準点を変更する`transformOrigin()`
-   新機能：背景の座標をトゥイーンさせる`backgroundPosition()`
-   新機能：ポインターイベントのON/OFFを切り替える`pointerEvents()`

### 新機能：曲線的に座標移動させるbezier()

`bezier()`は、ベジェ曲線を描きながら座標移動するトゥイーンを設定できます。指定したXY座標をアンカーポイントとして、2次元平面上を始点から終点へ曲線的にトゥイーンします。

![ベジェ曲線の図解](https://ics.media/entry/220304/images/bezier-illustration.png)

```
Tween24.tween(...).bezier(アンカーポイントのX座標, アンカーポイントのY座標)
```

```
Tween24.serial(
    // ベジェ曲線のアンカーポイントに (430, -300) を設定
    Tween24.tween("#box", 1).x(860).bezier(430, -300),
    // ベジェ曲線のアンカーポイントに (645, -400) (215, 400) を設定
    Tween24.tween("#box", 1.5).x(0).bezier(645, 400).bezier(215, -400)
).play();
```

![ベジェ曲線を描きながら座標移動するデモ](https://ics.media/entry/220304/images/bezier.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#bezier)

### 新機能：設定時からの相対値にトゥイーンさせる…$()

`...$()`は、トゥイーンを設定した時の値からの相対値にトゥイーンします。`x$()`や`y$()`、`rotation$`、`scale$`などさまざまなプロパティに対応しています。

```
Tween24.tween(...).x$(トゥイーン設定時からの相対値)
```

```
Tween24.serial(
    // 設定時のX座標から+860にトゥイーンします
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x$(860),
    // 元の座標にトゥイーンします
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x$(0)
).play();
```

![設定時からの相対値にトゥイーンするデモ](https://ics.media/entry/220304/images/relative-setting.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#relative-setting)

### 新機能：直前の値からの相対値にトゥイーンさせる…$$()

`...$$()`は、トゥイーン再生時の直前の値からの相対値にトゥイーンします。`...$()`と同様に、`x$$()`、`y$$()`、`rotation$$`、`scale$$`などさまざまなプロパティに対応しています。

```
Tween24.tween(...).x$$(トゥイーン再生時からの相対値)
```

```
Tween24.serial(
    // トゥイーン実行時のX座標から+215にトゥイーンします
    Tween24.tween("#box", 0.6, Ease24._6_ExpoOut).x$$(215),
    Tween24.tween("#box", 0.6, Ease24._6_ExpoOut).x$$(215),
    Tween24.tween("#box", 0.6, Ease24._6_ExpoOut).x$$(215),
    Tween24.tween("#box", 0.6, Ease24._6_ExpoOut).x$$(215)
).play();
```

![設定時からの相対値にトゥイーンするデモ](https://ics.media/entry/220304/images/relative-current.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#current-setting)

### 新機能：座標・変形の基準点を変更するtransformOrigin()

`transformOrigin()`は、対象のHTMLElementの座標・変形の基準点を変更します。基準点は`50`などの数値、`100%`などの単位付きの値、`bottom`などの文字列で指定できます。

```
Tween24.tween(...).transformOrigin(基準点のX座標, 基準点のY座標)
```

```
Tween24.serial(
    // 基準点を右下に変更する
    Tween24.prop("#box").transformOrigin("bottom", "right"),
    // 90度回転させる
    Tween24.tween("#box", 0.4).rotation$$(90),
    // 基準点を右上に変更し、ズレた座標を調整する
    Tween24.prop("#box").transformOrigin("top", "right").xy$$(100, 100),
    // 90度回転させる
    Tween24.tween("#box", 0.4).rotation$$(90),
    // 基準点を左上に変更し、ズレた座標を調整する
    Tween24.prop("#box").transformOrigin("top", "left").xy$$(200, 100),
    // 90度回転させる
    Tween24.tween("#box", 0.4).rotation$$(90),
    // 基準点を左下に変更し、ズレた座標を調整する
    Tween24.prop("#box").transformOrigin("bottom", "left").xy$$(100, 0),
    // 90度回転させる
    Tween24.tween("#box", 0.4).rotation$$(90)
).play();
```

![トゥイーンの座標・変形の基準点を変更するデモ](https://ics.media/entry/220304/images/change-transform-origin.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#transformOrigin)

### 新機能：背景の座標をトゥイーンさせるbackgroundPosition()

`backgroundPosition()`は、対象のHTMLElementの背景座標をトゥイーンします。座標は`50`などの数値、`100%`などの単位付きの値で指定できます。

```
Tween24.tween(...).backgroundPosition(背景のX座標, 背景のY座標)
```

```
Tween24.serial(
    // 背景のX座標を100%までトゥイーンします
    Tween24.tween("#box", 3).backgroundPosition("100%", "0%")
).play();
```

![背景座標をトゥイーンさせるデモ](https://ics.media/entry/220304/images/background-position.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#backgroundPosition)

### 新機能：ポインターイベントのON/OFFを切り替えるpointerEvents()

`pointerEvents()`は対象のHTMLElementのポインターイベントの有効・無効をboolean値で設定します。たとえば、アニメーション中はイベントを無効化して、アニメーション後にイベントを受け付けるよう有効化するといった使い方が可能です。

```
Tween24.prop(...).pointerEvents(ポインターイベントの有効/無効)
```

```
Tween24.serial(
    // ポイントイベントを無効化
    Tween24.prop("#box").pointerEvents(false),
    Tween24.tween("#box", 1).x(860),
    // ポイントイベントを有効化
    Tween24.prop("#box").pointerEvents(true)
).play();
```

### その他、不具合の修正

-   `loop()`を入れ子にした場合、子loop()が正常にループしない問題を修正しました。
-   `lag()`の子トゥイーンに`%`値が指定されていた場合に、正常に反映されない問題を修正しました。

### まとめ

今回のアップデートで最低限の機能が揃ってきたのと、動作も安定しているためバージョン1.0として正式リリースしました。正式リリース後も「[MITライセンス](https://github.com/a24/tween24js/blob/master/LICENSE)」で公開していますので、**個人・商用問わず自由に使用してください**。

公開以降、利用いただいている方も段々と増えてきていると感じています。引き続きTween24の機能追加は続けていく予定ですが、さらに便利になる仕組みも考えているので今後のアップデートも楽しみにお待ちください。

その他のTween24関連の記事は、以下からご覧ください。

-   [新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)
-   [「Tween24.js」の新機能！ループやテキストアニメーションなど、ウェブサイトの演出に役立つ機能を追加](https://ics.media/entry/210622/)
-   [単なるアニメーションにとどまらない！条件分岐やイベント待機など「Tween24.js」の新機能](https://ics.media/entry/210818/)
-   [マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現](https://ics.media/entry/211209/)