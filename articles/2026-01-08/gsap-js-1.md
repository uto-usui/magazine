---
title: "GSAP入門 - アニメーション制作のための高機能なJSライブラリ（前編）"
source: "https://ics.media/entry/220822/"
publishedDate: "2022-08-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

JavaScriptライブラリの「[GSAPジーサップ](https://gsap.com/)」はウェブサイトのモーション制作に役立ちます。GSAPは高機能であり、実行性能が良好で、互換性も高い利点があります。

始点と終点の間を補間することでモーションを実現することは「トゥイーン」と呼ばれます（Betweenが語源）。トゥイーンの機能を提供するJSライブラリは多くの種類が存在しますが、その中でもGSAPは評判が高く、機能の多さでは群を抜いています。当サイトの記事『[トゥイーンライブラリの比較検証](https://ics.media/entry/14973/)』でも、類似のライブラリに比べて性能が高いことを確認しています。

旧TweenMax時代から数えてGSAP利用歴18年の筆者が、**GSAPのおさえておくべき最低限の使い方**から、**現場で役立つテクニック**を紹介します。

▼GSAP公式サイト

![](https://ics.media/entry/220822/images/images/220822_gsap_website_250414.png)

GSAP入門は前後編の2回にわたり解説します。前編では基本的なGSAPの使い方を中心に説明します。

### GSAPの使いどころ

CSS Transitionsなどウェブ標準にも選択肢があるなかで、GSAPのメリットはどのようなところにあるのでしょうか？　筆者は以下のように考えています。

-   CSS Transitions/AnimationsやWeb Animations APIより、**GSAPのほうが制御の自由度が大きい**。
-   **連続したモーションの管理**に、GSAPが役立つ。
-   HTMLのDOMだけではなく、**WebGL/Canvasの実装でもGSAP**が利用できる（※）

※WebGL/CanvasではプレーンなJSのオブジェクトを使うので、CSS Transitions等を利用できません。

逆にいえば、CSS Transitionsだけで実現できるようなウェブサイトではGSAPを使う必要はありません。また、[Bootstrap](https://getbootstrap.jp/)や[Material Design](https://m3.material.io/develop/web)等などのCSSフレームワーク・デザインシステムにモーションが組み込まれているケースでは、GSAPは不要でしょう。

「**演出にこだわりたい**」「触って**気持ちのいいウェブサイト**を目指したい」「**型にはまらない動きを作りたい**」といったケースでGSAPが役立ちます。

### GSAPのインストール方法

GSAPの導入は簡単です。`script`タグを貼り付ける方法と、パッケージマネージャーを使う方法を紹介します。

#### scriptタグを貼り付ける方法

CDNでサクッと使いたい方はこちら。CDNから`script`タグで取り込みます。

```
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```

導入すると、グローバルである`window`に`gsap`オブジェクトが生えるので、JavaScript内で`gsap`と記述すればどこでも利用できるようになります。CDNからだとGZipで50KBなので、容量もコンパクトです。

#### CDNからESMでと導入

CDNでES Modulesとして取りこみたい場合は以下のように記載します（参照：[ES Modules入門](https://ics.media/entry/16511/)）。

```
<script type="importmap">
  {
    "imports": {
      "gsap": "https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js"
    }
  }
</script>

<script type="module">
import { gsap } from "gsap";

// …実装コードを記載
</script>
```

#### NPMで導入

Node.jsの開発環境で利用するには、`npm install`コマンドで[gsap](https://www.npmjs.com/package/gsap)パッケージをインストールします。

```
npm install gsap
```

TypeScriptの型定義ファイルも`gsap`パッケージに同梱されているので、`@types`の導入は不要です。ES Modulesで利用する場合は、以下のようにコードを書きます。

```
import {gsap} from "gsap";

gsap.to(someElement, { x:100 }); // 仮コード
```

webpackでのgsap導入方法のサンプルを用意してあるので、以下を参考くださいませ。気をつけるべきポイントはないと思います。

-   [Babel + webpackの構成](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-babel-gsap)
-   [TypeScript + webpackの構成](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-typescript-gsap)

公式サイト『[GreenSock | Docs | Installation](https://gsap.com/docs/v3/Installation?checked=core,requireSyntax#esModules)』ではインストールヘルパーや動画で詳しく解説されています。

### GSAPの基本的な使い方

最低限必要な記述は以下の通りです。

```
// 第1引数に対象、第2引数に変化させたいプロパティーと設定値を指定
gsap.to(".rect", { x: 200, duration: 2 });
```

第1引数に対象のセレクターやオブジェクト（配列も可）を指定します。第2引数にオブジェクト型で変化させたいプロパティーと、設定値を指定します。時間は`duration`（単位は秒）を指定します。

たとえば、背景色を1秒で変えたい場合は以下のように指定します。

```
// 青色に1秒かけて変化
gsap.to(".target", { backgroundColor: "#0000FF", duration: 1 });
```

CSSのように文字列で数値を指定可能です。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_color.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_color.html)

### 設定値

第2引数に設定値を含めることで、トゥイーンの挙動をカスタマイズできます。次のコードは遅延実行の`delay`や、繰り返し指定の`repeat`を含めています。

```
// 2秒だけ遅らせて再生
gsap.to(".target", { color: "#0000FF", duration: 1, delay: 2 });

// 2回繰り返し
gsap.to(".target", { color: "#0000FF", duration: 1, repeat: 2 });

// 繰り返し時に遅延を含める
gsap.to(".target", {
  color: "#0000FF",
  duration: 1,
  repeat: 2,
  repeatDelay: 1,
});
```

代表的なプロパティーは以下の表にまとめました。利用頻度列の「★」のプロパティーを覚えておけば最低限利用できます。本記事では代表的なものを後述で解説します。

プロパティー

説明

単位

デフォルト値  
（括弧内はデフォルト値）

利用頻度

`duration`

時間

数値（秒）

省略化  
（`1.0`）

★

`ease`

加減速

文字列か関数

省略化  
（`power2.inOut`）

★

`delay`

遅延秒数

数値（秒）

省略化  
（`0`）

\-

`repeat`

リピート回数

数値

省略化  
（`0`）

\-

`repeatDelay`

リピートするまでの遅延

数値（秒）

省略化  
（`0`）

\-

`yoyo`

リピート時に反復挙動にするか

真偽値

省略化  
（`false`）

\-

`paused`

一時停止した状態にするか

真偽値

省略化  
（`false`）

\-

`overwrite`

上書きするか

真偽値か`"auto"`

省略化  
（`false`）

\-

### リピートの制御

繰り返し再生したい場合は、`repeat`プロパティーを使います。自然数を指定すると、その回数だけ繰り返します。

無限に繰り返したい場合は、`repeat: -1`を指定します。繰り返し時に待機時間を設けたい場合は、`repeatDelay`を指定します。

```
gsap.to(".target", {
  x: 200,
  duration: 2,
  repeat: -1, // 無限に繰り返し
  repeatDelay: 0.5, // 繰り返し時に0.5秒の待機,
});
```

`yoyo`を指定すると、オモチャのヨーヨーのように「行って戻って」のリピートができます。

```
gsap.to(".target", {
  x: 200,
  duration: 2,
  repeat: -1, // 無限に繰り返し
  repeatDelay: 0.5, // 繰り返し時に0.5秒の待機,
  yoyo: true, // 反転
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_repeat.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_repeat.html)

### transformの指定

GSAPではCSSの`transform`を直感的に記述できます。水平方向には`x`で指定できます。これは`transform: translateX(任意)`のショートカットです。同様に`y`も`transform: translateY(任意)`のショートカットして利用可能です。

```
gsap.to(".target", {
  x: 100, // 水平方向
  y: 100, // 垂直方向
  duration: 1,
});
```

CSSでは回転させるには`transform: rotate(180deg)`のように指定しますが、gsapでは直接`rorate`プロパティーで指定できます。 単位未指定だと角度（0〜360度で1回転）となります。弧度法を使いたいときは文字列で`rad`単位を指定します。

```
// 一回転（度数法）
gsap.to(".target", { rotate: 360, duration: 1 });

// 一回転（弧度法）
gsap.to(".target", { rotate: "2rad", duration: 1 });
```

他にも`transform`は以下のように記述できます。

GSAP

CSS

説明

`x: 10`

`transform: translateX(10px)`

水平方向への移動（px）

`y: 10`

`transform: translateY(10px)`

垂直方向への移動（px）

`rotate: 360`

`transform: rotate(360deg)`

回転角度（角度）

`scale: 2`

`transform: scale(2, 2)`

拡大・縮小（1.0が等倍）

`scaleX: 2`

`transform: scaleX(2)`

水平方向だけ拡大・縮小

`scaleY: 2`

`transform: scaleY(2)`

垂直方向だけ拡大・縮小

`xPercent: -50`

`transform: translateX(-50%)`

水平方向への移動（要素の幅に対する割合）

`yPercent: -50`

`transform: translateY(-50%)`

水平方向への移動（要素の幅に対する割合）

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_transform.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_transform.html)

2022年頃のブラウザーでは、CSSでも`scale`や`rotate`など個別変形プロパティーで別々に指定できるようになりましたが（[参考記事](https://ics.media/entry/210311/#:~:text=%E5%BF%9C%E7%94%A8%EF%BC%9A%E3%82%82%E3%81%86%E3%81%99%E3%81%90%E4%BD%BF%E3%81%88%E3%82%8B%EF%BC%9F-,%E5%80%8B%E5%88%A5%E5%A4%89%E5%BD%A2%E3%83%95%E3%82%9A%E3%83%AD%E3%83%8F%E3%82%9A%E3%83%86%E3%82%A3,-%E3%81%A7%E3%82%82%E3%81%A3%E3%81%A8%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB)）、GSAPでは古いブラウザーでもサポートしているので安心して利用できます。

#### コラム： left・topで指定するよりtransformのほうがなめらか

水平・垂直方向に要素を動かしたい場合は、`left`や`top`で指定するよりも、`x`や`y`で移動させる方が滑らかに表示できます。CSSの`transform`は小数点を考慮するからです。用途にもよりますが、演出のために位置を変化させたい場合は、`left`や`top`よりも`x`と`y`で検討するといいでしょう。

### トゥイーンさせる対象

`gsap.to()`の第1引数には、セレクターだけではなくさまざまなオブジェクトを指定できます。セレクターは、`document.querySelectorAll()`メソッドとほぼ同じ挙動です。セレクターにCSSクラスを指定すれば、条件に一致する要素がすべてトゥイーンします。

`HTMLElement`のインスタンスも、配列も、任意のオブジェクトでも指定可能です。

```
// セレクターに一致するものをすべて動かします。
gsap.to(".item", { x: 100, duration: 1 });

// 配列を指定すると、配列の中の対象物をまとめて動かせます。
gsap.to(["#item1", "#item2"], { x: 100, duration: 1 });

// HTMLElementを直接指定すると、それを対象に動かせます。
const element = document.createElement("div");
element.textContent = "Hello";
document.body.append(element);
gsap.to(element, { x: 100, duration: 1 });

// 任意のオブジェクトも指定できます。
const param = { value: 0 };
gsap.to(param, { value: 100, duration: 1 });
```

### 透明度の変化

CSSの透明度を変化させたい場合は、`opacity`を使います。`alpha`も透明度のショートハンドとして利用できます。

```
gsap.to(".rect", {
  opacity: 0
})
```

`autoAlpha`プロパティーを使うと、透明度が`0`のときは自動的にCSSで`visibility: hidden`にしてくれます。透明度の`0`の状態だとテキスト選択ができたり、スクリーンリーダーの読み上げの対象となるので、登場しない状態にしたいときは`autoAlpha`を指定すると便利です。

```
gsap.to(".rect", {
  autoAlpha: 0
})
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_opacity.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_opacity.html)

▼`opacity`の変化に応じて`visibility`も連動。

![](https://ics.media/entry/220822/images/images/220822_gsap_autoAlpha.gif)

### イージング指定

イージングの指定は`ease`プロパティーを使います。イージングは文字列と関数のどちらかで指摘できます。

```
gsap.to(".target", {x :100, duration: 1, ease : "power4.out"});
```

関数で指定する場合は以下の通り。ES Modulesの場合は`import`文でイージング関数の取り込みが必要です。

```
import {gsap, Power4} from "gsap";
gsap.to(".target", {x :100, duration: 1, ease: Power4.out});
```

イージングの強度は、`"power1.out"`・`"power2.out"`・`"power3.out"`・`"power4.out"`と、レベルで定義されています。イージングの種類`quad`・`cubic`・`quart`・`quint`等の違いに詳しくない方は`power1`〜`power4`を使い分けるといいでしょう。

イージングの強度

別名

`linear`

`none`

`sine`

\-

`quad`

`power1`

`cubic`

`power2`

`quart`

`power3`

`quint`

`power4`, `strong`

`expo`

\-

![](https://ics.media/entry/220822/images/images/180614_erasing_02.png)

▲ Sine < Quad < Cubic < Quart < Quint < Expoの順で性格が強くなります。詳しくはイージングの違いは記事『[知っておきたいCSSイージングのお手本](https://ics.media/entry/18730/)』を参考。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_ease.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_ease.html)

加速・減速の指定は以下の3種類から指定できます。

-   `in` : はじめが最低速で、加速する
-   `out` : はじめが最高速で、減速する
-   `inOut` : はじめはゆっくりで加速し、最後は減速する

公式サイト『[GreenSock | Docs | Eases](https://gsap.com/docs/v3/Eases)』に強弱を試せるツールがあるので、試してみるといいでしょう。

![](https://ics.media/entry/220822/images/images/220822_gsap_ease.png)

### イージングのカスタマイズ

`back`と`elastic`は強度をカスタマイズ可能です。文字列内で丸括弧を使って指定します（関数としても記述できます）。

```
// 戻ってくる動き
gsap.to(graph, { duration: 2.5, ease: "back.out(1.7)", y: -500 });

// ボヨンボヨンという動き
gsap.to(graph, { duration: 2.5, ease: "elastic.out(1, 0.5)", y: -500 });
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_ease_back.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_ease_back.html)

#### イージングのオススメ

筆者としては、イージングは`"power4.out"`がオススメです。その理由として、初心者にありがちな事例を紹介します。

-   強いイージングを怖れて、弱いイージングを指定。結果的にメリハリのない演出にしあがる。
-   こちらは`power1.out`、あちらは`power4.out`と強弱がバラバラの指定になり統一感がなくなる。
-   `expo`や`circ`の違いを認識できておらず、適当な指定となり、統一感がなくなる。

下手に不揃いなイージングになるよりは、強めのイージングを指定すれば、演出にメリハリがつき、制作時の迷いの時間を減らせるので制作効率がいいです。もちろん、トゥイーンさせたい対象物の面積や距離・時間によってイージングの種類をチューニングすることはあります。

### トゥイーンのさまざまな呼び出し方

いままで`gsap.to()`を中心に説明してきました。`to()`はトゥイーン終了後の状態を指定するメソッドですが、他にもさまざまなメソッドがあります。

#### from()

```
gsap.from(".target", { x: 100, duration: 1 });
```

`gsap.from()`メソッドは**始点だけを再生するメソッド**です。HTMLの静的ウェブサイトだと、デザインカンプどおりにコーディングすることが多いですが、静的に完成したウェブサイトに対して「どれだけずらして演出するか」を指定するときに`gsap.from()`が役立ちます。

#### fromTo()

```
gsap.fromTo(".target", { x: 100 }, { x: 200, duration: 1 });
```

`gsap.fromTo()`メソッドは**始点と終点を設定します**。引数が増えるので手間ですが、始点と終点を明示的に指定することで、安定した挙動になります。後述のタイムライン機能やScrollTriggerで作成するときに利用することが多いです。

#### set()

```
gsap.set(".target", { x:100 });
```

`gsap.set()`メソッドは値を設定できます。トゥイーンさせる必要がなく、CSSやプロパティーの値を**即座に適用するとき**に使います。

### バラツキのある動き

staggerスタッガープロパティーを使うと、複数の対象物に遅延を持たせて、パラパラっと表示できます。staggerは「ずらして配置する」といった意味です。

```
// stagger で出現
gsap.from(".rect", {
  y: 10,
  autoAlpha: 0,
  duration: 1,
  ease: "power4.out",
  stagger: 0.02, // 0.02秒ごとに出現
});
```

位置と透明度に対して`stagger`を使うと、以下の作例のように視線誘導を目的とした演出に利用できます。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/stagger.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/stagger.html)

大量のオブジェクトを移動させるときにも便利です。`stagger`プロパティーはオブジェクト型で指定すると、細かい指定ができます。

```
gsap.to(".rect", {
  y: "100vh",
  duration: 2,
  ease: "bounce.out",
  stagger: {
    each: 0.01, // ばらす間隔（秒）
    from: "random" // ランダムに開始
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/falling.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/falling.html)

### staggerで格子状に制御

`stagger`プロパティーで`stagger: { grid: "auto" }`を指定すると、要素の配置座標を考慮したうえで起点を設定できます。

```
// 格子状に適用
gsap.from(".rect", {
  scale: 0,
  duration: 1,
  ease: "power4.out",
  stagger: {
    each: 0.05,
    from: "center", // 中央から
    grid: "auto", // 格子状に開始
    ease: "power4.out", // 間隔に対するイージング
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/stagger_grid.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/stagger_grid.html)

### オーバーライト

新しくトゥイーンを開始させるとき、すでにそのオブジェクトがトゥイーン中だったら、トゥイーンを上書きするオーバーライトという機能があります。

たとえばボタンのホバー挙動を考えてみましょう。`mouseover`のトゥイーンが再生中に、`mouseout`となり新しいトゥイーンを再生させたとします。すると、前者のトゥイーンは後者のトゥイーンによって優先されるので、違和感なく再生されるように思えます。しかし、トゥイーンの作り方によっては、不自然な表示になる可能性があります。

次のデモを確認しましょう。`overwrite`の指定有無でどのような違いがあるか確認できます。ボタンのホバーを高速に繰り返すと、画面上部のボタンの表示がおかしくなります。マウスオーバーのトゥイーンより、マウスアウトのトゥイーンが先に終わると、もともと実行されていたマウスオーバーのトゥイーンの残りが適用されてしまうのです。

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/overwrite.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/overwrite.html)

解決するにはオーバーライトの指定を有効にします。

```
gsap.to(element, {
  scale: 1.2,
  duration: 0.5,
  overwrite: true, // オーバーライトの指定
});
```

-   `true`の場合、同じターゲットのすべてのトゥイーンが、どのプロパティに影響を与えるかに関係なく、即座に停止します。
-   `auto`の場合、トゥイーンがはじめてレンダリングする際に、アクティブなモーション（同じターゲットの同じプロパティ）の競合を突き止め、他のトゥイーンの競合部分のみを停止します。重複していない部分はそのまま残ります。
-   `false`の場合、上書きは行われません。

デフォルトは`false`なので、動きがバッティングすると思ったら`"auto"`か`true`に指定します。

オーバーライトは多くのトゥイーンライブラリに実装されており、重要な機能のひとつと言えます。

-   参考ドキュメント：[Handling conflicting tweens - Learning Center - GreenSock](https://gsap.com/conflict/)

### 相対値の指定

`gsap.to()`で変化させたい値に対して、`"+=数値"`や`"-=数値"`等の文字列で指定できます。

```
// 現在の値から+30加算する指定
gsap.to(".example-scale .rect", {
  rotate: "+=30",
  duration: 1,
});

// 現在の値から色相を45度減らす指定
gsap.to(".example-color .rect", {
  backgroundColor: "hsl(-=45, 50%, 50%)",
  duration: 0.3,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/to_relative.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/to_relative.html)

相対的な指定は挙動が不安定になりがちなので、筆者はほとんど使わないのですが、GSAPの機能として頭の片隅に入れておくといいでしょう。

### トゥイーンのコールバック

トゥイーンのタイミングはコールバック関数で監視可能です。開始したとき、更新が走ったとき、完了したときは以下のように指定します。

```
// コールバックの指定
gsap.to(".rect", {
  x: 200,
  duration: 2,
  onStart: () => {
    console.log("start");
  },
  onUpdate: () => {
    console.log("update");
  },
  onComplete: () => {
    console.log("complete");
  },
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/callback.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/callback.html)

※デモはコンソールを出力しているため、開発者ツールのコンソールパネルで出力を確認ください。

他にも中断したとき（`onInterrupt`）、繰り返したとき（`onRepeat`）等のイベントもあります。詳しくは[ドキュメント](https://gsap.com/docs/v3/GSAP/gsap.to\(\))を参考ください。

### オブジェクトをトゥイーン

GSAPでトゥイーンできるのはDOM要素だけではありません。**任意のオブジェクトもトゥイーンの対象にできます**。たとえば、円周を移動するようなモーションを考えてみましょう。管理したいのは回転の値だとすれば、`radian`を含むオブジェクトを作成します。

```
const params = { radian: 0 };
```

`params`オブジェクトをトゥイーンするとして、先述の`onUpdate`コールバックを使います。`onUpdate`コールバックの中で`radian`の値からXY座標を計算します。XY座標は別のHTML要素に適用することで、円周の座標を適用できました。

```
const params = { radian: 0 };

gsap.to(params, {
  radian: Math.PI * 2,
  duration: 2,
  ease: "power4.inOut",
  onUpdate: () => {
    const { radian } = params;
    // 直交座標を計算
    const x = Math.cos(radian) * 100;
    const y = Math.sin(radian) * 100;
    gsap.set(".circle", { x, y }); // 座標を適用
  },
  repeat: -1,
});
```

-   [別タブで再生する](https://ics-creative.github.io/220822_gsap_examples/onUpdate.html)
-   [ソースコードを確認する](https://github.com/ics-creative/220822_gsap_examples/blob/main/docs/onUpdate.html)

筆者としては、Three.jsやPixiJSで制御するときに中間オブジェクトをトゥイーンさせる作り方をすることが多いです。とくに3Dのカメラ座標の管理に役立ちます。

### GSAPのランセンス（100%無料）

GSAPは商用利用も含め100%無料です。以前は、特定の用途では有料ライセンスが必要でしたが、2025年4月30日よりボーナスプラグインも含めて無料利用できます。詳しくは公式サイトの次のページをご覧ください。

-   [Pricing | GSAP](https://gsap.com/pricing/)
-   [Standard “No Charge” GSAP License](https://gsap.com/community/standard-license/)
-   [3.13 release](https://gsap.com/blog/3-13/)

### まとめ

前半となる本記事では、GSAPの基本的な機能を中心に説明しました。

[後半記事](https://ics.media/entry/220825/)では、GSAPの目玉機能である「タイムライン」を中心に以下の内容を紹介します。

-   タイムライン機能
-   スクロールトリガープラグイン
-   モーションパスプラグイン
-   quickSettter
-   ユーティリティー関数