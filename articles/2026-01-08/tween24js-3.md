---
title: "新感覚！メソッドチェーンでアニメーションがスラスラ書ける「Tween24.js」を作りました"
source: "https://ics.media/entry/210409/"
publishedDate: "2021-04-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

アニメーションを作る時に、「思いついた演出をすぐに実装したい」「頭の中ではできているのに、コーディングするのが面倒」と思ったことはありませんか？アニメーション作成にはライブラリを使用することが多いと思いますが、使い方を調べて覚えて、ドキュメントからコピペしたり、ひたすらタイピングをして…

私はこれらの問題を解決するために、「Tween24」というライブラリを作りました。Tween24は**メソッドチェーンで記述するのが特徴**で、**たった1行でアニメーションが実装**できます。**依存ライブラリもなく、単体で動作**します。アニメーションライブラリの多くはオブジェクト型でプロパティを指定するためタイピングが多くなりがちですが、メソッドチェーンであれば**エディターのコード補完機能でスラスラと記述**できます。

![Tween24のコーディングデモ](https://ics.media/entry/210409/images/210409_tween24-demo.gif)

その他にも、メソッドチェーンには以下のようなメリットがあります。

-   コード補完により**プロパティ名などを覚える必要がない**。
-   補完リストから選ぶだけで記述でき、**タイピングミスもなくなり**ます。
-   ドキュメントを読まなくても補完機能でJSDocが確認でき、**学習コストが下がります**。

Tween24はもともと[ActionScript 3.0で開発したFlash向けのライブラリ](https://github.com/a24/Tween24)で、とくに日本国内ではさまざまなFlashサイトやゲームで利用されていました。JavaScript（TypeScript）でも同じコーディング体験を提供するために、「[Tween24.js](https://github.com/a24/tween24js)」を作りました。

今回は、Tween24.jsの基本的な使い方を紹介します。

※ Tween（トゥイーン）とは、Between（中間）に由来する言葉で、始点から終点へ変化しながら繋がるアニメーションのことを「トゥイーンアニメーション」といいます。

### 単体のトゥイーン

トゥイーンをさせる時は、`Tween24.tween()`を使います。

```
<div id="box1"></div>

<script>
  // トゥイーンの対象を取得
  const target = document.getElementById("box1");

  // box1を、1秒かけてX座標860にトゥイーンします
  Tween24.tween(target, 1).x(860).play();
</script>
```

![普通のトゥイーン](https://ics.media/entry/210409/images/210409_tween24-single.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#single)

トゥイーンは、以下のように設定します。

```
Tween24.tween(対象, 秒数, イージング).プロパティ...
```

対象は変数で指定しますが、複数対象を一度に設定したい場合は**配列での指定も可能**です。また、DOMを操作したい場合は、**文字列でセレクターを指定**することもできます。

```
Tween24.tween([target1, target2], ... // 配列を使った複数指定
Tween24.tween("#box1", ... // id="box1" をもつ要素
Tween24.tween("#box1, .box", ... // id="box1" か class="box" をもつ要素
Tween24.tween(".box p", ... // class="box" 内のp要素
```

### イージングの種類

イージングは、`Ease24`クラスを使って指定します。イージングのカーブの強さによって**連番が割り振られている**ので、**直感的に選択**できます。

```
// 設定可能なイージングの系統
Ease24._Linear
Ease24._1_Sine...
Ease24._2_Quad...
Ease24._3_Cubic...
Ease24._4_Quart...
Ease24._5_Quint...
Ease24._6_Expo...
Ease24._7_Circ...
Ease24._Bounce...
Ease24._Back...
Ease24._Back...With
Ease24._Elastic...
Ease24._Elastic...With
Ease24._Blend
```

特殊なイージングの系統として、`Ease24._BackWith`と`Ease24._ElasticWith`があります。オーバー具合や、振幅の大きさや周期をカスタマイズできます。

![イージング一覧](https://ics.media/entry/210409/images/210409_tween24-ease.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/easing.html)

さらに`Ease24._Blend`は、2種類のイージングをかけ合わせることができます。たとえば、`_6_ExpoIn`でゆっくり立ち上がり終盤は`_BounceOut`でバウンドさせたい時は、以下のように指定できます。

```
// Ease24._Blend(イージングA, イージングB, AからBへの変化量)
const blendEasing = Ease24._Blend(Ease24._6_ExpoIn, Ease24._BounceOut, Ease24._6_ExpoInOut);
Tween24.tween("#box1", 1, blendEasing)...
```

![ブレンドイージング](https://ics.media/entry/210409/images/210409_tween24-blend.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#blend)

イージングを何も設定しない場合はデフォルトで`Ease24._Linear`が設定されますが、デフォルトのイージングの変更もできます。

```
// デフォルトのイージングを Ease24._6_ExpoOut に設定する
Tween24.setDefaultEasing(Ease24._6_ExpoOut);
```

### トゥイーンの操作・コールバック

トゥイーンインスタンスを変数に格納しておくと、停止や一時停止などの操作ができます。

```
const tween = Tween24.tween(box1, 1).x(400);

// トゥイーンの操作
tween.play(); // 再生 / 再開
tween.pause(); // 一時停止
tween.stop(); // 停止
```

またトゥイーンの状態に合わせた、コールバック関数の設定も可能です。

```
// 設定可能なコールバック
tween.onPlay(...); // 再生開始時に呼び出される
tween.onInit(...); // トゥイーンの初期化時に呼び出される
tween.onUpdate(...); // トゥイーン中に呼び出される
tween.onPause(...); // 一時停止時に呼び出される
tween.onResume(...); // 一時停止時に呼び出される
tween.onStop(...); // 停止時に呼び出される
tween.onComplete(...); // トゥイーン完了時に呼び出される
```

```
// コールバック設定例 ： (スコープ, 関数, 引数)
Tween24.tween("#box1", 1).x(400).onComplete(this, finish, "完了").play();

function finish(message) {
  window.alert(message);
}
```

### プロパティ設定

トゥイーンさせずにプロパティを設定したい場合は、`Tween24.prop()`を使います。次項で説明する、直列・並列トゥイーンと組み合わせると効果的です。

```
// box1をX座標を220に、45度に回転します
Tween24.prop("#box1").x(220).rotation(45).play();
```

### 直列・並列トゥイーン

複数のトゥイーンを連続再生させる場合は、`Tween24.serial()`を使います。

```
<div id="box1" class="box"></div>
<div id="box2" class="box"></div>
<div id="box3" class="box"></div>

<script>
  // まとめて透明度を0に設定し、順番にフェードインしながらX座標を860に
  Tween24.serial(
    Tween24.prop(".box").opacity(0),
    Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
    Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
    Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
  ).play();
</script>
```

![直列のトゥイーン](https://ics.media/entry/210409/images/210409_tween24-seri.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#serial)

複数のトゥイーンを同時再生させる場合は、`Tween24.parallel()`を使います。

```
// まとめて透明度を0に設定し、同時にフェードインしながらX座標を860に
Tween24.parallel(
  Tween24.prop(".box").opacity(0),
  Tween24.tween("#box1", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box2", 1, Ease24._6_ExpoInOut).x(860).opacity(1),
  Tween24.tween("#box3", 1, Ease24._6_ExpoInOut).x(860).opacity(1)
).play();
```

![並列のトゥイーン](https://ics.media/entry/210409/images/210409_tween24-para.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#parallel)

また、それぞれのトゥイーンを組み合わせることも可能です。

```
Tween24.serial(
  Tween24.parallel(
    Tween24.tween(".box", 2, Ease24._6_ExpoInOut).x(860), // 右に移動しながら
    Tween24.serial(
      Tween24.tween(".box", 1, Ease24._3_CubicIn).scaleX(1.3).skewX(70), // 前半で傾斜とスケールを変更し
      Tween24.tween(".box", 1, Ease24._3_CubicOut).scaleX(1).skewX(0) // 後半で戻す
    )
  ),
  // その後、角丸＆回転しつつ座標を戻す
  Tween24.tween(".box", 1.5, Ease24._6_ExpoOut).x(0).rotation(180).borderRadius(50),
).play();
```

![直列と並列のトゥイーン](https://ics.media/entry/210409/images/210409_tween24-seri-para.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/index.html#seri-para)

### その他のアクション・機能

トゥイーン以外にも、以下の便利なアクションやメソッドが使えます。

```
// 関数を実行します
Tween24.func(スコープ, 関数, 引数)...

// コンソールにログを出力します
Tween24.log(出力内容)...

// 指定した時間だけ待機します
Tween24.wait(秒数)...
```

```
// デフォルトのイージングを設定します
Tween24.setDefaultEasing(イージング);

// トゥイーン全体のFPS（1秒間の更新回数）を設定します
Tween24.setFPS(更新回数);
```

### 対応プロパティ

Tween24では、メソッドで目標値を設定します。対象がDOMの場合、以下のプロパティは`Transform:matrix`を操作します。

```
x(...) // 目標のX座標を設定します
y(...) // 目標のY座標を設定します
xy(...) // 目標のX,Y座標をそれぞれ設定します

scaleX(...) // 目標の水平スケールを設定します
scaleY(...) // 目標の垂直スケールを設定します
scaleXY(...) // 目標の垂直、水平スケールをそれぞれ設定します
scale(...) // 目標のスケールを設定します

skewX(...) // 目標の水平傾斜を設定します
skewY(...) // 目標の垂直傾斜を設定します
skewXY(...) // 目標の垂直、水平傾斜をそれぞれ設定します
skew(...) // 目標の傾斜を設定します

rotation(...) // 目標の回転角度を設定します
```

その他にも、以下のメソッドがあります。CSSプロパティの値は数字や、単位を付けたい場合は文字列でも指定できます。 ※ 始点と終点の単位が異なる場合、正しくトゥイーンされない場合があります。

```
width(...) // CSS:width を設定します
height(...) // CSS:height を設定します
top(...) // CSS:top を設定します
right(...) // CSS:right を設定します
bottom(...) // CSS:bottom を設定します
left(...) // CSS:left を設定します
color(...) // CSS:color を設定します
backgroundColor(...) // CSS:background-color を設定します 
borderWidth() // CSS:border-width を設定します
borderColor() // CSS:border-color を設定します
borderRadius() // CSS:border-radius を設定します
opacity(...) // 目標とする透明度を設定します
alpha(...) // 目標とする透明度を設定します。対象が HTMLElement の場合は、CSS:opacity が適用されます

delay(...) // トゥイーン開始までの遅延を設定します
fps(...) // トゥイーン毎の1秒間の更新回数を設定します
debug() // デバッグ用のログ出力を設定します
id(...) // トゥイーン毎の識別子を設定します（ログ出力用）
```

メソッドにないCSSを設定したい時は、`style()`を使用します。

```
Tween24.tween("#box1", 1).style("margin-top", "50%").play();
```

自作の変数など、補完に対応していないプロパティの場合は、以下のように記述します。

```
// 例 カスタムクラスのプロパティをトゥイーンさせる
const moja = { percent: 0 };
Tween24.tween(moja, 1, Ease24._Linear, { percent:100 }).play();
```

### 応用編

基本的にアニメーションを作成するためのライブラリですが、たとえば簡易的なタイマーを10行程度で作ることもできます。

```
<script>
  const timer = {};
  timer.count = 5; // カウントする秒数

  // トゥイーン更新時に実行される
  timer.update = function() {
    document.getElementById("time").textContent = "Time: " + timer.count.toFixed(1);
  }
  // トゥイーン完了時に実行される
  timer.finish = function() {
    document.getElementById("time").textContent = "finish.";
  }
  // カウントダウンするトゥイーン
  timer.tween = Tween24.serial(
    Tween24.prop(timer, { count: timer.count }), // タイムをリセット
    Tween24.tween(timer, timer.count, Ease24._Linear, { count: 0 }) // 変数countをトゥイーン
      .onUpdate(timer, timer.update) // 更新時に実行する関数を設定
      .onComplete(timer, timer.finish) // 完了時に実行する関数を設定
  );
</script>

<p id="time">Sample timer</p>
<div>
  <button onclick="timer.tween.play();">Play</button>
  <button onclick="timer.tween.pause();">Pause</button>
</div>
```

![トゥイーンを使ったタイマー](https://ics.media/entry/210409/images/210409_tween24-timer.gif)

-   [デモを別ウインドウで再生する](https://a24.github.io/tween24js/sample/timer.html)

### Tween24.jsの導入方法

ソースコードはGitHubで公開していますので、こちらからご利用ください。

-   [Tween24.js (GitHub)](https://github.com/a24/tween24js)
-   [Download](https://github.com/a24/tween24js/releases)

また、GitHubだけでなくnpmでも公開しています。Node.jsをマシンに導入していれば、npmコマンドを使ってJSライブラリをインストールできます。npmでモジュールを管理したいフロントエンドエンジニアは、コマンドライン（Windowsではコマンドプロンプト、macOSではターミナル）で、次のコマンドを入力してインストールください。

```
npm install tween24
```

※ TypeScriptの型定義ファイルも、同梱しています

-   [tween24 - npm](https://www.npmjs.com/package/tween24)

### まとめ

Tween24.jsは高速なコーディング体験を提供し、**複雑なアニメーションをCSSトランジションより簡潔に素早く記述**できます。HTMLやCSS向けの機能が多いですが、**CanvasやWebGLでも問題なく使用できる**よう開発しています。

有名なアニメーションライブラリのひとつとして[GSAP](https://gsap.com/)がありますが、特定の用途では[Businessライセンスが必要](https://gsap.com/licensing/)になります。Tween24は「[MITライセンス](https://github.com/a24/tween24js/blob/master/LICENSE)」で公開していますので、**個人・商用問わず自由に使用**してください。

現在はα版として公開していますが、アップデートを続けていきますのでぜひ今後もチェックしてください。

その他のTween24関連の記事は、以下からご覧ください。

-   [アニメーションライブラリ「Tween24.js」正式リリース！相対値や曲線移動などバージョン1.0の新機能](https://ics.media/entry/220304/)
-   [「Tween24.js」の新機能！ループやテキストアニメーションなど、ウェブサイトの演出に役立つ機能を追加](https://ics.media/entry/210622/)
-   [単なるアニメーションにとどまらない！条件分岐やイベント待機など「Tween24.js」の新機能](https://ics.media/entry/210818/)
-   [マイクロインタラクションからクリエイティブ表現まで！Tween24.jsを使った演出表現](https://ics.media/entry/211209/)