---
title: "単なるアニメーションにとどまらない！条件分岐やイベント待機など「Tween24.js」の新機能"
source: "https://ics.media/entry/210818/"
publishedDate: "2021-08-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

「[Tween24.js](https://github.com/a24/tween24js)」はメソッドチェーンで記述するのが特徴で、たった1行でアニメーションが実装可能なJavaScriptライブラリです。筆者が開発を続けており、今回の2021年8月アップデートでは条件分岐やイベント待機など、**アニメーション作成をより柔軟にするための機能追加**がメインとなっています。

基本的な使い方や導入方法は、記事「[新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)」をご覧ください。

**今回のアップデート内容**

-   新機能：トゥイーンを条件分岐させる`ifCase()`
-   新機能：イベントを受け取るまで待機する`waitEvent(), waitEventAndFunc()`
-   新機能：途中で次のトゥイーンへ移行する`jump()`
-   新機能：親トゥイーンを進めるトリガーに設定する`trigger()`
-   新機能：トゥイーンを完了状態にする`skip()`
-   新機能：手動でトゥイーンを更新する`manualPlay(), manualUpdate()`
-   新機能：トゥイーンをID指定で操作する

### 新機能：トゥイーンを条件分岐させるifCase()

`ifCase()`は、フラグによって条件分岐するトゥイーンを設定できます。フラグにboolean値を指定した場合は**トゥイーン作成時に判定**し、boolean値を返す関数を指定した場合は**トゥイーン実行毎に判定**します。

```
Tween24.ifCase(boolean値 or booleanを返す関数, true時に再生されるトゥイーン, false時に再生されるトゥイーン)
```

```
// 繰り返しトゥイーン
Tween24.loop(0,
    Tween24.serial(
        // チェックボックスの状態で分岐させる
        Tween24.ifCase(() => { return document.getElementById("rotation").checked; },
            // チェックされている場合、回転を加えたトゥイーンを再生する
            Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860).rotation(360),
            // チェックがない場合、右へ移動させるトゥイーンを再生する
            Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860)
        ),
        // 座標をリセット
        Tween24.prop("#box").x(0)
    )
).play();
```

![トゥイーンを関数で条件分岐させるデモ](https://ics.media/entry/210818/images/210818_tween24-ifCase.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#ifCase)

### 新機能：イベントを受け取るまで待機するwaitEvent()、waitEventAndFunc()

`waitEvent()`は、イベントを受け取るまでトゥイーンを待機します。

```
Tween24.waitEvent(イベントを受け取る対象, イベントタイプ)
```

```
Tween24.serial(
    // 画面中央にフェードイン
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(430).opacity(1),
    // クリックされるまで待機
    Tween24.waitEvent("#box", Event24.CLICK),
    // 画面右にフェードアウト
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860).opacity(0)
).play();
```

![イベントを受け取るまでトゥイーンを待機させるデモ](https://ics.media/entry/210818/images/210818_tween24-waitEvent.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#waitEvent)

イベント待機状態にした上で関数を実行したい場合は、`waitEventAndFunc()`を使用します。

`Tween24.func()`の後に`Tween24.waitEvent()`を実行しても同じように思えますが、`func()`を実行したフレーム内でイベントが発火してしまうと、`waitEvent()`実行前のためイベントが受け取れません。そういった可能性のあるケースでは、`waitEventAndFunc()`が効果的です。

```
Tween24.waitEventAndFunc(イベントを受け取る対象, イベントタイプ, 実行する関数, 関数に渡す引数)
```

### 新機能：途中で次のトゥイーンへ移行するjump()

`jump()`は、次のトゥイーンへ移行するタイミングを設定します。タイミングはトゥイーンの進捗率`0 ~ 1`を引数に指定します。

使い所としては、直列トゥイーンで順番に再生させる時、次のトゥイーンをかぶせて再生したいといった場合に有効です。たとえば以下の例では、緩急の強いイージングを設定すると始点や終点の移動量がほぼなく、それぞれの**トゥイーンが途切れて見えてしまいます**。

```
Tween24.serial(
    // 右、下、左、上へ順番にトゥイーンします
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(810),
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).y(330),
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(50),
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).y(50)
).play();
```

![次のトゥイーンへ移行するタイミングを設定するデモ](https://ics.media/entry/210818/images/210818_tween24-not-jump.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#not-jump)

そこで、`jump()`を設定します。トゥイーンがかぶせて再生されるので、**スムーズに繋がります**。

```
Tween24.jump(移行するタイミング（進捗率）)
```

```
Tween24.serial(
    // 進捗率0.5のタイミングで次へ
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(810).jump(0.5),
    // 進捗率0.5のタイミングで次へ
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).y(330).jump(0.5),
    // 進捗率0.5のタイミングで次へ
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(50).jump(0.5),
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).y(50)
).play();
```

![次のトゥイーンへ移行するタイミングを設定するデモ](https://ics.media/entry/210818/images/210818_tween24-jump.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#jump)

### 親トゥイーンを進めるトリガーに設定するtrigger()

`trigger()`は、親子構造のトゥイーンの子に設定します。

直列トゥイーン（`Tween24.serial()`）の場合は最後の子トゥイーンが、並列トゥイーン（`Tween24.parallel()`）の場合はすべての子トゥイーンが完了になると親トゥイーンは次の処理へ進みます。`trigger()`を子トゥイーンに設定すると、**そのトゥイーンが完了したタイミング**で**親トゥイーンは次の処理へ進みます**。

```
Tween24.serial(
    // 1つずつ順番に右端へトゥイーンします
    Tween24.serial(
        Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860),
        // このトゥイーンが完了したら、親トゥイーンを次に進めます
        Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).trigger(),
        Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860)
    ),
    // 1つずつ順番に左端へトゥイーンします
    Tween24.serial(
        Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(0),
        Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(0),
        Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(0)
    )
).play();
```

![親トゥイーンを進めるトリガーに設定するデモ](https://ics.media/entry/210818/images/210818_tween24-trigger.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#trigger)

### 新機能：トゥイーンを完了状態にするskip()

`skip()`は`play()`や`stop()`と同様にトゥイーンを操作するメソッドで、トゥイーンを**瞬時に完了時の状態**にします。

```
// 0.1秒の遅延をかけながら、X座標930にトゥイーンします
const tween = Tween24.lag(0.1,
    Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(930)
);
tween.play();

// 1秒後に、トゥイーンをスキップさせます
Tween24.func(tween.skip).delay(1).play();
```

![トゥイーンを完了状態にするデモ](https://ics.media/entry/210818/images/210818_tween24-skip.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#skip)

### 新機能：手動でトゥイーンを更新するmanualPlay()、manualUpdate()

`manualPlay()`は`play()`の代わりに使用します。`manualPlay()`で再生されたトゥイーンは自動的には更新されず、`manualUpdate()`を呼び出すと更新されます。

使い所としては、たとえば[three.js](https://threejs.org/)のような3Dライブラリと組み合わせる時にレンダリングの処理をまとめたり、処理のタイミングを調整したい場合に有用です。

`manualPlay()`したトゥイーンをまとめて更新したい場合は、`Tween24.manualAllUpdate()`を使用します。

```
Tween24.loop(0,
    Tween24.serial(
        // 1秒かけてX座標860にトゥイーンします
        Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(860),
        // 1秒かけてX座標0にトゥイーンします
        Tween24.tween("#box", 1, Ease24._6_ExpoInOut).x(0)
    )
).manualPlay(); // マニュアルモードで再生します

// 0.1秒毎に手動アップデートを実行します
setInterval(Tween24.manualAllUpdate, 100);
```

![手動でトゥイーンを更新するデモ](https://ics.media/entry/210818/images/210818_tween24-manualPlay.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#manualPlay)

### 新機能：トゥイーンをID指定で操作する

トゥイーンに`id()`や`groupId()`を設定すると、そのIDを指定して操作できます。`id()`は単一のトゥイーン、`groupId()`は複数のトゥイーンをグルーピングします。

トゥイーンをIDで操作するには、以下のメソッドを使用します。

```
// 単一のトゥイーンを操作
Tween24.playById(...)
Tween24.pauseById(...)
Tween24.skipById(...)
Tween24.stopById(...)
Tween24.manualPlayById(...)

// グルーピングされたトゥイーンを操作
Tween24.playByGroupId(...)
Tween24.pauseByGroupId(...)
Tween24.skipByGroupId(...)
Tween24.stopByGroupId(...)
Tween24.manualPlayByGroupId(...)
```

```
// トゥイーンに ID:tw01 を設定します
Tween24.tween(".box", 1).x(860).id("tw01");

// ID:tw01 のトゥイーンを再生します
Tween24.playById("tw01");
```

![トゥイーンをID指定で操作するデモ](https://ics.media/entry/210818/images/210818_tween24-id.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#id)

トゥイーンをグルーピングしたい場合は、以下のように使用します。

```
// トゥイーンを ID:group01 でグルーピングします
Tween24.tween("#box1", 1).x(860).groupId("group01");
Tween24.tween("#box2", 1).rotation(360).groupId("group01");
Tween24.tween("#box3", 1).opacity(0).groupId("group01");
Tween24.tween("#box4", 1).xy(400, 400).groupId("group01");

// ID:group01 グループのトゥイーンを再生します
Tween24.playByGroupId("group01");
```

### まとめ

今回のアップデートで、バージョンは0.9.11となりました。すでに実際の案件で使用されている方もいるようで、ライブラリとしての手応えも感じています。もう少し機能追加できたら、バージョン1.0として正式公開してもよいかなと考えています。

引き続きTween24は「[MITライセンス](https://github.com/a24/tween24js/blob/master/LICENSE)」で公開していますので、**個人・商用問わず自由に使用してください**。

その他のTween24関連の記事は、以下からご覧ください。

-   [アニメーションライブラリ「Tween24.js」正式リリース！相対値や曲線移動などバージョン1.0の新機能](https://ics.media/entry/220304/)
-   [新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました](https://ics.media/entry/210409/)
-   [「Tween24.js」の新機能！ループやテキストアニメーションなど、ウェブサイトの演出に役立つ機能を追加](https://ics.media/entry/210622/)
-   [マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現](https://ics.media/entry/211209/)