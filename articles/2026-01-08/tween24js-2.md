---
title: "「Tween24.js」の新機能！ループやテキストアニメーションなど、ウェブサイトの演出に役立つ機能を追加"
source: "https://ics.media/entry/210622/"
publishedDate: "2021-06-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

「[Tween24.js](https://github.com/a24/tween24js)」はメソッドチェーンで記述するのが特徴で、たった1行でアニメーションが実装可能なJavaScriptライブラリです。このライブラリを筆者が開発しているのですが、今年4月に公開したところ大変好評いただきました。

たくさんの要望もいただき、新しい機能を追加したのでアップデート内容を紹介します。今回はアニメーション制作において**必要度の高い機能追加**をメインに、**各機能のブラッシュアップ**を行っています。

基本的な使い方や導入方法は、前回の記事「[新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)」をご覧ください。

**今回のアップデート内容**

-   新機能：トゥイーンを繰り返す`loop()`
-   新機能：トゥイーンを連続で遅延させる`lag()`
    -   遅延させる順番を操作する
    -   遅延具合にイージングをかける
-   新機能：時間の代わりに速度（変化量）を指定する`tweenVelocity()`
-   新機能：テキストを一文字ずつ操作する`tweenText()`
-   新機能：アニメーションを最適化する`willChange()`プロパティ
-   その他の変更点
-   下位バージョンと互換性のない変更点

### 新機能：トゥイーンを繰り返すloop()

`loop()`は、指定した回数トゥイーンを繰り返し再生します。`0`を指定した場合は、無制限に繰り返します。

```
// Tween24.loop(ループ回数, ループさせるトゥイーン）

// 無制限のループを設定
Tween24.loop(0,
  Tween24.serial(
    // 1秒かけてX座標860にトゥイーン
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860).rotation(90),
    // 1秒かけてX座標0にトゥイーン
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(0).rotation(0)
  )
).play();
```

![ループトゥイーン](https://ics.media/entry/210622/images/210622_tween24-loop.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#loop)

### 新機能：トゥイーンを連続で遅延させるlag()

1つのトゥーンに複数の対象を指定した場合に、少しずつ遅延をかけて再生するメソッドです。lag系のメソッドはいくつかありますが、大きく`lag()` `lagTotal()` の2種類に分けられます。`lag()`は遅延時間を対象毎に加算設定し、`lagTotal()`は遅延時間内に収まるように等分設定します。

文章では分かりづらいですが、サンプルを見れば理解は簡単です。以下は`lag()`のサンプルで、指定した遅延時間（0.05秒）毎にトゥイーンが再生されます。

```
<div class="box"></div>
<div class="box"></div>
<!-- 省略 -->
<div class="box"></div>

<script>
// Tween24.lag(遅延時間, ...遅延させるトゥイーン)

// 0.05秒毎の遅延を設定
Tween24.lag(0.05,
  // .boxクラスを持った複数のエレメントをトゥイーン
  Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
</script>
```

![遅延トゥイーン](https://ics.media/entry/210622/images/210622_tween24-lag.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#lag)

以下は`lagTotal()`のサンプルです。全体の遅延が設定した遅延時間（2秒）になるよう自動的に遅延時間が設定されます。このサンプルでは対象が10個あるので、それぞれ0.2秒ずつ遅延して再生されます。

```
<div class="box"></div>
<div class="box"></div>
<!-- 省略 -->
<div class="box"></div>

<script>
// Tween24.lagTotal(トータル遅延時間, ...遅延させるトゥイーン)

// 合計で2秒の遅延になるように設定
Tween24.lagTotal(2,
  Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
</script>
```

![遅延時間を一定にするトゥイーン](https://ics.media/entry/210622/images/210622_tween24-lagTotal.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#lagTotal)

前述の`lag()`で対象の数が増えるとトゥイーン全体の尺も変わってしまいますが、`lagTotal()`は**トゥイーン全体の尺を一定にできるのが特徴**です。次は、発展型のlagメソッドを紹介します。

#### 遅延させる順番を操作する

`lagSort()`と`lagTotalSort()`は、遅延をかける順番を調整できます。順番は`Sort24`で指定します。

```
// Tween24.lagSort(遅延時間, ソート関数, ...遅延させるトゥイーン)

// 遅延順を山型に指定
Tween24.lagSort(0.05, Sort24._Mountain,
    Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();

// 遅延順を谷型に指定
Tween24.lagSort(0.05, Sort24._Valley,
    Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();

// 遅延順をシャッフル
Tween24.lagSort(0.05, Sort24._Shuffle,
    Tween24.tween(".box", 1, Ease24._6_ExpoInOut).x(930)
).play();
```

![遅延順を調整したトゥイーン](https://ics.media/entry/210622/images/210622_tween24-lagSort.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#lagSort)

`Sort24._XXX`の中身はただの関数なので、配列を受け取って配列を返すものであれば**自作の関数も指定できます**。

```
function customSort(array) {
    /* 省略 */
    return array;
}

Tween24.lagSort(0.05, customSort, /* 省略 */ ).play();
```

#### lagTotal()の遅延具合にイージングをかける

`lagTotal()`は遅延時間を等分にしますが、`lagTotalEase()`は遅延時間にイージングをかけられます。たとえば、始めの遅延は長く、後の遅延を短くするといった指定も可能です。

```
// Tween24.lagTotalEase(トータル遅延時間, イージング, ...遅延させるトゥイーン)

// 始めの遅延は長く、後の遅延を短くする
Tween24.lagTotalEase(2, Ease24._6_ExpoOut,
    Tween24.tween(".box", 1, Ease24._2_QuadOut).x(930)
).play();
```

![遅延が徐々に短くなるトゥイーン](https://ics.media/entry/210622/images/210622_tween24-lagTotalEase.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#lagTotalEase)

さらに遅延順を変更したい場合は、`lagTotalSortEase()`を使用します。

```
// Tween24.lagTotalSortEase(トータル遅延時間, ソート関数, イージング, ...遅延させるトゥイーン)

// 対象を逆順にし、始めの遅延は長く、後の遅延を短くする
Tween24.lagTotalSortEase(2, Sort24._Reverse, Ease24._6_ExpoOut,
    Tween24.tween(".box", 1, Ease24._2_QuadOut).x(930)
).play();
```

![逆順に遅延が徐々に短くなるトゥイーン](https://ics.media/entry/210622/images/210622_tween24-lagTotalSortEase.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#lagTotalSortEase)

### 新機能：時間の代わりに速度（変化量）を指定するtweenVelocity()

`tweenVelocity()`は、1秒間で移動する距離（変化量）を指定します。移動距離が短ければトゥイーン時間も短くなります。とくにページ内スクロールなど、**距離が一定でないアニメーションに有効**です。

座標以外のプロパティでも利用でき、複数のプロパティを指定した場合は一番変化量の大きいものが基準になります。

```
// Tween24.tweenVelocity(対象, 1秒間の変化量、イージング)...

// 毎秒500pxの速度で430px移動し、90度回転する
Tween24.tweenVelocity("#box1", 500).x(430).rotation(90).play();

// 毎秒500pxの速度で860px移動し、180度回転する
Tween24.tweenVelocity("#box2", 500).x(860).rotation(180).play();
```

![変化量トゥイーン](https://ics.media/entry/210622/images/210622_tween24-tweenVelocity.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#tweenVelocity)

### 新機能：テキストを一文字ずつ操作するtweenText()

`tweenText()`は、指定した要素内の文字を1文字ずつトゥイーンさせます。`lag()`と組み合わせると効果的です。

トゥイーンさせずにプロパティを設定したい場合は`propText()`を、速度指定したい場合は`tweenTextVelocity()`を使用します。

```
<p id="text">TEXT TWEEN</p>

<script>
  Tween24.serial(
    // Tween24.propText(対象)...
    // Tween24.tweenText(対象, 時間, イージング)...

    // 字間を10px、100px上へ、透明度を0に、横幅を0.5倍、縦幅を3倍に
    Tween24.propText("#text").y(-100).opacity(0).scaleXY(0.5, 3).letterSpacing(10),

    Tween24.lagSort(0.06, Sort24._Shuffle,
      // 1文字ずつ位置、透明度、大きさを1秒かけて元に戻す
      Tween24.tweenText("#text", 1, Ease24._6_ExpoOut).y(0).opacity(1).scale(1)
    )
  ).play();
</script>
```

![テキストトゥイーン](https://ics.media/entry/210622/images/210622_tween24-tweenText.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#tweenText)

内部的には`<span>`で1文字ずつ区切って操作しているため、DOMが変更されます。元のDOMに戻したい場合は、`resetText()`を使用します。

```
// 1文字ずつに分解した文字を、元に戻します
Tween24.resetText("#text").play();
```

### 新機能：アニメーションを最適化するwillChange()プロパティ

`willChange()`を設定すると、トゥイーンさせるCSSプロパティに対して「[will-change](https://developer.mozilla.org/ja/docs/Web/CSS/will-change)」プロパティが適用されます。アニメーションが最適化され、動きが滑らかになります。

とくに小数点座標で動きがカタつくような場合に有効です。親トゥイーンに設定した場合は、**すべての子トゥイーンに反映**されます。

```
// serial()内のトゥイーンに、will-changeを適用
Tween24.serial(
  /* 省略 */
).willChange().play();
```

※ `will-change`は、むやみに設定し過ぎると逆にパフォーマンスを低下させる場合があります。Tween24では、負荷軽減のためにトゥイーン中のみ適用される仕様としていますが、**大量に設定する場合は注意**してください。

### その他の変更点

-   擬似要素の指定に対応しました。

```
Tween24.tween(".box::after", /* 省略 */)
```

-   DOMの座標の`%`指定に対応しました。これは、`transform:translate`の挙動に合わせたものです。たとえば、`x("100%")`では対象の横幅1つ分の位置を目標とします。

```
Tween24.tween(/* 省略 */).x("0%").y("100%")
```

-   `top()` `left()` `right()` `bottom()` `width()` `height()` `borderRadius()` `borderWidth()`の、`%`や`em`などの指定に対応しました。

```
Tween24.tween(/* 省略 */).top("50%").width("2em")
```

-   `style()` のプロパティ指定を、ケバブケースとキャメルケースどちらの記述にも対応しました。

```
// どちらの指定方法もOK
Tween24.tween(/* 省略 */).style("margin-top", "50%")
Tween24.tween(/* 省略 */).style("marginTop", "50%")
```

-   プロパティメソッド`letterSpacing()`を追加しました。対象がHTMLElementの場合は、CSSプロパティの`letter-spacing`が設定されます。

```
// 字間を30pxに設定
Tween24.tween(/* 省略 */).letterSpacing("30px")
```

-   プロパティメソッド`angle()`を追加しました。PixiJSなどの、angleプロパティを多用するライブラリでの使い勝手を向上しました。対象がHTMLElementの場合は、`rotation()`と同じ動作になります。

```
// 180度回転させる
Tween24.tween(/* 省略 */).angle(180)
```

-   `rgb()`フォーマットのカラー値に対応しました。

```
// 背景色を赤に変える
Tween24.tween(/* 省略 */).backgroundColor("rgb(255,0,0)")
```

### 下位バージョンと互換性のない変更点

-   `func()`とコールバック関数から、第一引数のscopeの指定を削除しました。

```
// version 0.7.6 
Tween24.func(スコープ, 関数, 引数)
  .onComplate(スコープ, 関数, 引数)

// version 0.9.3
Tween24.func(関数, 引数)
  .onComplate(関数, 引数)
```

`this`が含まれる関数を渡したい場合は、アロー関数を使用したり、JavaScript標準関数の`bind()`でスコープを指定ください。

```
// アロー関数の場合
const moja = () => {
    this /* 省略 */
};

Tween24.func(moja).play();

// bind() の場合
function moja {
    this /* 省略 */
}

Tween24.func(moja.bind(this)).play();
```

### まとめ

前回リリースしてからフロントエンドエンジニアとして活躍されている方々をはじめ、Flash全盛期にAS版を使っていた方々、Tween24の思想に共感された方々、アニメーション制作に不慣れなサーバーサイドエンジニアの方まで、**想像以上の反響をいただき大変嬉しく思っています**。

調子に乗って機能開発した結果、勢い余って0.7.6から0.9.3まで一気にバージョンが上がってしまいました。前回のリリースはα版として公開していましたが、今回のアップデートでβ版になったと言っていいでしょう。

引き続きTween24は「[MITライセンス](https://github.com/a24/tween24js/blob/master/LICENSE)」で公開していますので、**個人・商用問わず自由に使用してください**。

その他のTween24関連の記事は、以下からご覧ください。

-   [アニメーションライブラリ「Tween24.js」正式リリース！相対値や曲線移動などバージョン1.0の新機能](https://ics.media/entry/220304/)
-   [新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)
-   [単なるアニメーションにとどまらない！条件分岐やイベント待機など「Tween24.js」の新機能](https://ics.media/entry/210818/)
-   [マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現](https://ics.media/entry/211209/)