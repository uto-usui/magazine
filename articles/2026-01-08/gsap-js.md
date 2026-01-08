---
title: "GSAP入門（後編） - タイムライン制御やスクロール演出などの魅力的なJSライブラリ"
source: "https://ics.media/entry/220825/"
publishedDate: "2022-08-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

JavaScriptライブラリの「[GSAPジーサップ](https://gsap.com/)」（ジーサップ）はウェブサイトのモーションの制作に役立ちます。[前回の記事](https://ics.media/entry/220822/)では、GSAPの基本的な使い方を解説しました。後半となる本記事では、中上級者向けに以下の内容を説明します。

**本記事で学べること**

-   タイムライン機能
-   スクロールトリガープラグイン
-   モーションパスプラグイン
-   quickSetter
-   ユーティリティー関数 z

### タイムライン

[タイムライン](https://gsap.com/docs/v3/GSAP/Timeline)はGSAPで高度な演出をつくるうえで必ず利用する重要な機能です。

複雑なモーションを時系列で作成できるので、多くのトゥイーンを作成したり、管理するのに便利です。

▼公式サイトのチュートリアル動画。たった5行のコードで出現アニメーションを構築。

![](https://ics.media/entry/220825/images/images/220825_gsap_timeline.gif)

使い方として、`gsap.timeline()`で作成したインスタンスに対して、`add()`メソッドでタイムラインに`gsap.to()`のトゥイーンを追加します。

```
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }); // はじめに初期化
// 続けて動かしたい要素を追加
tl.add(gsap.to(".rect", { x: 100, duration: 1 })); // 水平方向に移動
tl.add(gsap.to(".rect", { y: 100, duration: 1 })); // 垂直方向に移動
tl.add(gsap.to(".rect", { rotation: 360, duration: 1 })); // 回転
tl.add(gsap.to(".rect", { x: 0, duration: 1 })); // 水平方向に移動
tl.add(gsap.to(".rect", { y: 0, duration: 1 })); // 垂直方向に移動
```

タイムラインの`to()`メソッドは`add(gsap.to())`のショートカットであるため、以下の記述でも利用できます。

```
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }); // はじめに初期化
// 続けて動かしたい要素を追加
tl.to(".rect", { x: 100, duration: 1 }); // 水平方向に移動
tl.to(".rect", { y: 100, duration: 1 }); // 垂直方向に移動
tl.to(".rect", { rotation: 360, duration: 1 }); // 回転
tl.to(".rect", { x: 0, duration: 1 }); // 水平方向に移動
tl.to(".rect", { y: 0, duration: 1 }); // 垂直方向に移動
```

チェーンメソッドとして記述してもいいでしょう。いずれの記述も書き方が異なるだけで、実行結果に違いはありません。

```
gsap
  .timeline({ repeat: -1, repeatDelay: 0.5 }) // はじめに初期化
  // 続けて動かしたい要素を追加
  .to(".rect", { x: 100, duration: 1 }) // 水平方向に移動
  .to(".rect", { y: 100, duration: 1 }) // 垂直方向に移動
  .to(".rect", { rotation: 360, duration: 1 }) // 回転
  .to(".rect", { x: 0, duration: 1 }) // 水平方向に移動
  .to(".rect", { y: 0, duration: 1 }); // 垂直方向に移動
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline.html)

#### タイムラインのメソッド

タイムラインの作成で主に利用にするのは以下のメソッドです。

関数名

説明

[add()](https://gsap.com/docs/v3/GSAP/Timeline/add\(\))

トゥイーン、タイムライン、コールバック、ラベルをタイムラインに追加します。

[to()](https://gsap.com/docs/v3/GSAP/Timeline/to\(\))

`gsap.to()`トゥイーンをタイムラインの最後に追加します。

[from()](https://gsap.com/docs/v3/GSAP/Timeline/from\(\))

`gsap.from()` トゥイーンをタイムラインの最後に追加します。

[fromTo()](https://gsap.com/docs/v3/GSAP/Timeline/fromTo\(\))

`gsap.fromTo()` トゥイーンをタイムラインの最後に追加します。

[set()](https://gsap.com/docs/v3/GSAP/Timeline/set\(\))

タイミングで値をセットします。

[call()](https://gsap.com/docs/v3/GSAP/Timeline/call\(\))

タイミングで関数を呼び出します。

### タイムラインの時間の指定

モーションは直列でつないでいくと**台本的な動きになりがち**です。滑らかに演出を見せるためには、モーションを重ねることが多いです。次の作例では、前半は台本的な動きとし、後半は重ねつつモーションさせています。

```
gsap
  .timeline({ repeat: -1, repeatDelay: 0.5 })
  // 🌟段取り的なうごき
  .set("h1", { textContent: "show" })
  .from(".rect1", { y: -32, opacity: 0, duration: 0.5 })
  .from(".rect2", { y: 32, opacity: 0, duration: 0.5 })
  .from(".rect3", { y: -32, opacity: 0, duration: 0.5 })
  .from(".rect4", { y: 32, opacity: 0, duration: 0.5 })
  .from(".rect5", { y: -32, opacity: 0, duration: 0.5 })
  .from(".rect6", { y: 32, opacity: 0, duration: 0.5 })
  // 🌟ここから重ねつつ動かしている
  .set("h1", { textContent: "hide" }, "+=1") // 1秒待機
  .to(".rect1", { y: -32, opacity: 0, duration: 0.5 })
  .to(".rect2", { y: 32, opacity: 0, duration: 0.5 }, "-=0.4") // 0.4秒開始を早める
  .to(".rect3", { y: -32, opacity: 0, duration: 0.5 }, "-=0.4")
  .to(".rect4", { y: 32, opacity: 0, duration: 0.5 }, "-=0.4")
  .to(".rect5", { y: -32, opacity: 0, duration: 0.5 }, "-=0.4")
  .to(".rect6", { y: 32, opacity: 0, duration: 0.5 }, "-=0.4");
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline_timing.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline_timing.html)

タイムラインのタイミングは`to()`や`from()`メソッドの第3引数`position`で指定可能です。

第3引数の指定方法は、数値を指定すればタイムラインのどのタイミングで発動するか絶対時間で指定でき、文字列で`"-=2"`とすれば直前の指定での本来開始するはずだった時間の2秒前に発動となります。`"-=50%"`とパーセンテージで指定すると、直前の指定の50%経過時に発動します。

時間指定で数値以外に指定できるもの

値

具体値

説明

頻出度

`数値`

`1`

タイムラインの先頭からの時間（秒）で開始

★

`+=数値`

`+=1`

直前のトゥイーンの終了後に何秒だけ離すか

★

`-=数値`

`-=1`

直前のトゥイーンの終了に何秒だけ重ねるか

★

`<`

`<`

直前のトゥイーンの開始時

★

`<数値`

`<1`

直前のトゥイーンの開始時の何秒後か

`>`

`>`

直前のトゥイーンの終了時

`>数値`

`>1`

直前のトゥイーンの終了後に何秒だけ離すか

筆者としては「★」の習得をオススメします（それ以外は個人的にあまり使わないです）。

他にもさまざまな指定方法があるので、公式解説の『[Timeline Tip: Understanding the Position Parameter - Learning Center - GreenSock](https://gsap.com/position-parameter)』を参照ください。

### タイムラインのネスト

タイムラインはネスト（入れ子）も可能です。GSAPのタイムラインを作るとコードが長くなってしまいがちです。ネストを上手に使ってコードを整理するといいでしょう。

タイムラインを`gsap.timeline.add()`メソッドで、別のタイムラインインスタンスを追加します。

```
// タイムラインを作成する関数
function createChildTimeline(target) {
  const tl = gsap.timeline();
  tl.to(target, { x: 100, duration: 1 });
  return tl; // タイムラインを戻り値にする
}

// ルートのタイムラインを作成
const rootTl = gsap
  .timeline()
  .add(createChildTimeline(".a")) // 子どもを追加
  .add(createChildTimeline(".b")); // 子どもを追加

```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline_nest.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline_nest.html)

### タイムラインの時間制御

GSAPのタイムラインは`timeline.seek()`メソッドでシークできます。一般的な用語として「シーク」とは、再生中の動画の好きな場所に再生位置を動かす操作のことです。

次のサンプルでは、シークバーを`input`タグで用意しています。シークバーを動かして、GSAPのタイムラインの時間を自由に行き来できることを確認ください。再生速度も変更できます。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline_nest_seek.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline_nest_seek.html)

※デモはVue.jsを使ってインタラクティブに作成しています。

時間に関するタイムラインのメソッドを紹介します。`time()`・`duration()`・`progress()`はいずれもゲッター（取得）・セッター（設定）の役割として用意されています。

関数名

説明

[time()](https://gsap.com/docs/v3/GSAP/Timeline/time\(\))

再生ヘッドのローカル位置（基本的には現在時刻）を取得または設定します（リピートやrepeatDelayは含まれません）。

[duration()](https://gsap.com/docs/v3/GSAP/Timeline/duration\(\))

タイムラインの時間（秒）を取得します。セッターとして使用された場合、指定されたデュレーション内に収まるようにタイムラインの`timeScale`を調整します。

[progress()](https://gsap.com/docs/v3/GSAP/Timeline/progress\(\))

タイムラインの進行状況を取得・設定します。`0`から`1`までの値で、仮想再生ヘッドの位置を表します（`0`が最初、`0.5`が半分、`1`が完了）。

[seek()](https://gsap.com/docs/v3/GSAP/Timeline/seek\(\))

特定の時間にジャンプします。

### タイムラインの時間をトゥイーン

タイムラインの時間軸に対してトゥイーンを適用できます。`tweenTo()`メソッドを利用します。複数のオブジェクトを制御するようなタイムラインにおいて、演出の工夫として使ってもいいでしょう。

```
// 格子状に適用
const tl = gsap
  .timeline()
  .from(".rect", {
    scale: 0,
    rotation: -360,
    duration: 0.5,
    stagger: {
      each: 0.1,
      grid: "auto", // 格子状に開始
    },
  })
  .addLabel("complete"); // ラベルを追加

// 時間軸に対してトゥイーン
tl.tweenTo("complete", {
  duration: 4,
  // 時間軸に対してイージングを指定
  ease: "slow(0.4, 0.9, false)",
  // 注意：slow は EasePack プラグインの導入が必要
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline_tweenTo.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline_tweenTo.html)

関数名

説明

[addLabel()](https://gsap.com/docs/v3/GSAP/Timeline/addLabel\(\))

タイムラインにラベルを追加。重要な位置/時間を簡単にマークできます。

[tweenTo()](https://gsap.com/docs/v3/GSAP/Timeline/tweenTo\(\))

再生ヘッドを特定の時間までスクラブし、その後停止するリニアトゥイーンを作成します。

### タイムラインのタイムスケール

タイムラインの`timeScale()`メソッドを使うとタイムラインの再生時間を伸縮できます。タイムラインの伸縮を使えば、タイムラインの一部分だけスローモーションにできます。この演出の呼び方はいろいろあるのですが、私は「タイムリマップ」と呼んでいます。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/timeline_timescale.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/timeline_timescale.html)

タイムリマップ演出は当サイトの記事『[GSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)』で詳しく解説しています。

![](https://ics.media/entry/220825/images/images/150629_timescale_gsap.png)

先ほど紹介した`tweenTo()`メソッドと演出が少し似ていますが、制御のアプローチが異なります。コードの書き方や演出のフレーバーが異なるので、好みで使い分けていいでしょう。

### スクロール制御

スクロールと連動して制御するにはGSAPのプラグイン「[ScrollTriggerスクロール・トリガー](https://gsap.com/docs/v3/Plugins/ScrollTrigger)」を利用します。ScrollTriggerはGSAPの目玉機能でもあり、クリエイティブ系のウェブサイトで頻繁に利用されています。

どういったことができるかを紹介します。次のサンプルで、下部方向にスクロールしてみてください。ビューポートにはいってきたときに、段落が流れるように出現します。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/scrollTrigger/example_2.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/scrollTrigger/example_2.html)

ScrollTriggerを使えば、要素がビューポートに入ってきたら再生する、といった演出を手軽に作れます。ビューポートに入ってきたら何か処理をするなら『[Intersectionインターセクション Observerオブザーバー](https://ics.media/entry/190902/)』を想像されると思いますが、ScrollTriggerだともっと複雑なことも制御できます。

ScrollTriggerでできること

-   発火タイミングの指定
-   再発火のルールの指定（再生後にもう一度再生するか等）
-   スクロール中に要素を固定するかの指定
-   スクロールのスムーズ化（スクラブ）

#### スクロールトリガーの使い方

シンプルな実装例は以下の通りです。

`script`タグで取り込む場合はCDNからプラグインを読み込みます。

```
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```

npmの場合は『[GreenSock | Docs | Installation](https://gsap.com/docs/v3/Installation?checked=core,requireSyntax#esModules)』を参考ください。

![](https://ics.media/entry/220825/images/images/220822_gsap_install_scrollTrigger.png)

JavaScriptでは`gsap.registerPlugin()`メソッドでプラグインを登録します。プラグイン登録はJavaScriptの実行時に1回だけでよいので、何度も`gsap.registerPlugin()`を呼び出さないようにしましょう。

```
// プラグインを登録
gsap.registerPlugin(ScrollTrigger);
```

使いたい箇所で、`scrollTrigger`プロパティーを指定します。

```
// 演出対象となる要素を取得
gsap.utils.toArray("section").forEach((el) => {
  gsap.from(el, {
    x: 128,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    // スクロールトリガーの設定
    scrollTrigger: {
      trigger: el, // 対象物
    },
  });
});
```

実行結果は以下の通りです（先述のデモよりも演出をシンプルにして、コードを短くしています）。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/scrollTrigger/example_1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/scrollTrigger/example_1.html)

ScrollTriggerの詳しい解説は当サイトの記事『[トレンドウェブサイトから学べ！　JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)』を参照ください。

#### コラム： CSSのScroll-driven Animationsとは何が違うか

Chrome・Edgeには「Scroll-driven Animations」という機能があります。

\-　[CSSだけでスクロールアニメーションが作れる！？ 新技術Scroll-driven Animationsとは - ICS MEDIA](https://ics.media/entry/230718/)

GSAPのScrollTriggerのほうが高機能ですが、Scroll-driven AnimationsはJavaScriptライブラリを使わずに、CSSだけでスクロールアニメーションが作れるのが特徴です。

### 曲線上に動かす

曲線を扱うようなトゥイーンにはGSAPのプラグイン「[MotionPathPluginモーション・パス・プラグイン](https://gsap.com/docs/v3/Plugins/MotionPathPlugin)」を利用します。

SVGのパスにそって移動させられます。パスにそって回転している点が見どころです。

```
// プラグインを登録
gsap.registerPlugin(MotionPathPlugin);

gsap.to("#rect", {
  duration: 3,
  ease: "power4.inOut",
  // パスを指定
  motionPath: {
    // SVGのパスに沿って移動
    path: "#path",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/motionpath.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/motionpath.html)

任意のパラメーターに対してもカーブのきいたトゥイーンを作成できます。個人的には先述のSVGのパスより、この目的でMotionPathPluginをよく使います。XY座標だけでなく、さまざまなプロパティーに対してカーブをつけられることがポイントです。

```
// プラグインを登録
gsap.registerPlugin(MotionPathPlugin);
// （抜粋）
// 一緒くたに移動
const list = gsap.utils.toArray(".rect");
list.forEach((rect, index) => {
  gsap.fromTo(
    rect,
    {
      x: "-40vw",
      scale: 0.0,
    },
    {
      duration: 2 + Math.random() * 3,
      repeat: -1,
      ease: "power1.inOut",
      x: "40vw",
      motionPath: [
        { y: (Math.random() - 0.5) * 20 + "vh", scale: 1 },
        { y: (Math.random() - 0.5) * 50 + "vh", scale: 0 },
      ],
      delay: Math.random(),
    },
  );
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/motionpath_bezier.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/motionpath_bezier.html)

### モーションパスプラグインの導入方法

MotionPathはプラグインの登録が必要です。CDNの場合は次のように記述します。

```
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js"></script>
```

npmの場合は、gsap本体に含まれていますが、ES Modulesの`import`文に注意ください。[Install Helper](https://gsap.com/docs/v3/Installation?checked=core,motionPath,requireSyntax#modules)を参考にするといいでしょう。

![](https://ics.media/entry/220825/images/images/220822_gsap_install_motionpath.png)

### quickSetter

マウスストーカーの実装にもGSAPが役立ちます。頻繁に更新するようなケースでは`gsap.quickSetter()`メソッドを利用します。これの最小限の実装コードは以下の通りです。

```
const xSet = gsap.quickSetter(circle, "x", "px");
const ySet = gsap.quickSetter(circle, "y", "px");

window.addEventListener("mousemove", (event) => {
  xSet(event.x);
  ySet(event.y);
});
```

次のサンプルでは、ボタンに触れるときだけマウスストーカーが大きくなる演出を加えています。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/mouse_stalker.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/mouse_stalker.html)

### 便利なユーティリティー関数

GSAPにはさまざまな[ユーティリティー関数](https://gsap.com/docs/v3/GSAP/UtilityMethods)が提供されています。

関数名

説明

例

[clamp()](https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp\(\))

範囲に収まるように値をまるめます。

`clamp(0, 100, -12)`  
→ `0`

[getUnit()](https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit\(\))

文字列の単位を取得します。

`getUnit("30px")`  
→ `"px"`

[interpolate()](https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate\(\))

2つの値の間を補間します（色の補間も可能）

`interpolate("red", "blue", 0.5)`  
→ `"rgba(128,0,128,1)"`

[mapRange()](https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange\(\))

ある範囲を別の範囲にマッピング。

`mapRange(-10, 10, 0, 100, 5)`  
→ `75`

[normalize()](https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize\(\))

正規化。範囲内の数値を0〜1の割合にします。

`normalize(100, 200, 150)`  
→ `0.5`

[pipe()](https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe\(\))

関数呼び出しを連続させ、それぞれの結果を次の関数に渡します。

`pipe(clamp(0, 100), snap(5))(8)`  
→ `10`

[random()](https://gsap.com/docs/v3/GSAP/UtilityMethods/random\(\))

パラメーターを指定して乱数を生成したり、配列からランダムに要素を選びます。

`random(["red", "green", "blue"])`  
→ `"red"`

[shuffle()](https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle\(\))

配列の中身をシャッフルします（破壊的変更）。

`shuffle([1, 2, 3, 4, 5])`  
→ `[4, 2, 1, 5, 3]`

[snap()](https://gsap.com/docs/v3/GSAP/UtilityMethods/snap\(\))

値を増やしながら配列の中での近似値へスナップします。

`snap(5,13)`  
→ `15`

[splitColor()](https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor\(\))

任意の色を赤、緑、青（オプションでアルファ）の各成分に分割します。第2引数にtrueを指定するとHSLへ変換できます。

`splitColor("red")`  
→ `[255, 0, 0]`

[toArray()](https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray\(\))

いろんなものを配列に変換します。`Array.from()`のような関数。

`toArray(".class")`  
→ `[element1, element2]`

[wrap()](https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap\(\))

範囲を超えた値を先頭から数値に変えます。`%`で折り返し計算するのと似た処理です。

`wrap(5, 10, 12)`  
→ `7`

[wrapYoyo()](https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo\(\))

`wrap()`の類似版。範囲を超えたときにyoyo的に折り返します。

`wrap(5, 10, 12)`  
→ `8`

自前でコードを書ける方にとっては、数値計算のユーティリティー関数は目新しくないでしょう。しかし、色に関するユーティリティー関数は強力だと思います。たとえば、`interpolate()`は中間色を算出できます。

```
const value4 = gsap.utils.interpolate(
  "red", // 色の名前
  "rgb(0, 0, 255)", // rgb記法
  0.5, // 50%の数値を算出
); // rgba(128,0,128,1)
```

### ユーティリティー関数のselector()

`gsap.utils.selector()`メソッドは`querySelectorAll()`のユーティリティー関数です。生のJavaScriptだと`document.querySelectorAll()`を使えばいいのでわざわざ使う必要はなさそうですが、Reactの`useRef()`と組み合わせて使えます。

```
import React, { useEffect, useRef } from "react";

const Box = ({ children }) => <div className="box">{children}</div>;
const Container = () => <div><Box>Nested Box</Box></div>;

const App =() => {
  const el = useRef();
  const q = gsap.utils.selector(el);
  
  // マウント時の処理
  useEffect(() => {
    gsap.to(q(".box"), {
      x: 100,
      stagger: 0.33,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true
    });
  }, []); // <React.StrictMode>だと開発中は注意してね
  
  return (
    <div className="app" ref={el}>
      <Box>Box</Box>
      <Container/>
      <Box>Box</Box>
    </div>
  );
}
```

参考記事：[Getting Started with GSAP + React. - Learning Center - GreenSock](https://gsap.com/react/)

### 他ライブラリとの連携

gsapはCanvas・WebGL関連の表現系ライブラリとの相性がよく、柔軟に制御できます。自作のデモを最後に紹介します。

[PixiJS](https://pixijs.com/)とgsapの連携デモ。

![](https://ics.media/entry/220825/images/images/220825_gsap_pixijs.gif)

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/pixi_particle.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/pixi_particle.html)

[Three.js](https://threejs.org/)とgsapの連携デモ。

-   [別タブで再生する](https://ics-creative.github.io/150810_threejs_mosaic/DemoCubes.html)
-   [ソースコードを確認する](https://github.com/ics-creative/150810_threejs_mosaic/blob/master/src/DemoCubes.ts)

### まとめ

GSAPは**クリエイティブ系のウェブサイトを作るときに重宝**します。本記事で紹介した機能は、たくさん存在する機能の一部です。ぜひともGSAPを使いこなして、よりよいコンテンツの制作に役立てましょう。

ICS MEDIAではGSAPについての解説記事を公開しています。以下の記事もあわせて参考くださいませ。

-   [現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)
-   [JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)
-   [GSAPを使ったタイムリマップ表現](https://ics.media/entry/7162/)
-   [フロントエンドから始めるアニメーション 最強のライブラリGSAP3を手に入れよう](https://ics.media/entry/200805/)
-   [JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)

### 余談

GSAPはFlashのTweenMax時代から数えると15年の歴史があります。動かしたい対象と設定値を同じオブジェクトで指定するAPIはユニークだと今も思うのですが、トゥイーンライブラリの始祖である「[Tweener](https://code.google.com/archive/p/tweener/)」の由来だからでしょう。技術評論社のサイトにTweenerを紹介した記事があるので、読み返すと懐かしさを感じます。

-   [第6回　動きのある Flash を作る（後編） | gihyo.jp](https://gihyo.jp/dev/feature/01/flash-sdk/0006)（2008年）

プラットフォームとしての技術は変われど、時代を超えてDNAが受け継がれているように思いました。

※この記事が公開されたのは**3年前**ですが、**9か月前の2025年4月**に内容をメンテナンスしています。