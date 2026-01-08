---
title: "JavaScript製アニメーションライブラリの原理を理解しよう"
source: "https://ics.media/entry/17183/"
publishedDate: "2018-02-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

**アニメーションは画面の遷移やボタンの演出など、あらゆるウェブコンテンツやアプリケーションで利用されています**。CSSなら`animation`や`transition`、JavaScriptであればCreateJSやTweenMaxなどのJavaScriptライブラリを利用して制作している人がおおいでしょう。

私はFlashの全盛期に「[Tween24](https://github.com/a24/Tween24)」というアニメーションライブラリを自作していたこともあり、アニメーションには人一倍の思い入れがあります。しかし、その仕組みを理解している方は意外にも少ないのではないでしょうか。

ライブラリやフレームワークといったテクノロジーは、**仕組みや原理を理解しておくことで備わっている機能をより活用でき、また応用の幅も広がります**。今回はアニメーションライブラリの基礎部分の実装を交えながら、アニメーションの仕組みを紹介します。

※この記事はアニメーションの原理の説明に焦点を当てているので、ウェブのアニメーションを実装したいだけであれば記事「[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)」のほうが役立ちます。

### アニメーションの基本的な仕組みと考え方

アニメーションの仕組みは、時間経過とともに**「ある値を0（0%）〜1（100%）の間で連続して変化をさせる」**といったものです。具体的には**「始点」「時間」「変化量」の3つの概念**で考えます。

たとえば「画像をX座標100pxから500pxまで2秒で移動させたい」といった場合、**「X座標を100（始点）から、2秒かけて（時間）、+400する（変化量）」**と考えます。

![アニメーションの仕組みのイメージ図](https://ics.media/entry/17183/images/image01.png)

### 値を変化させるための計算式

アニメーションさせる値は、時間経過に合わせた計算が必要となります。まず**「変化にかける時間」と「経過した時間」から「進捗率」を算出**します。次に**「変化量」に「進捗率」をかけ、「始点」に加える**ことでアニメーション中の値が計算できます。これが**アニメーションさせるための心臓部**ともいえる計算式となります。

```
アニメーションの進捗率 = 経過した時間 / 変化にかける時間;
アニメーション中の値 =
  始点 + 変化量 * アニメーションの進捗率;
```

あとはこの計算を連続で実行するための機構があれば、アニメーションライブラリの原型ができ上がります。では、JavaScriptを使って具体的な実装方法を紹介します。

### JavaScriptでの実装方法

今回は、CSSの`transform:translate`を使って**画像（X座標50px、Y座標50pxに配置されている**みたらしくん）を**「1秒かけてX座標500px、Y座標150px」まで移動させるアニメーション**を作成する想定で紹介します。

まずは、各値の初期設定を行います。

```
const target = document.getElementById("mitarashi"); // アニメーションの対象
const startX = 50; // X座標の始点
const startY = 50; // Y座標の始点
const endX = 500; // X座標の目標点
const endY = 150; // Y座標の目標点
const diffX = endX - startX; // X座標の変化量
const diffY = endY - startY; // Y座標の変化量
const time = 1000; // 変化にかける時間 (ミリ秒)
```

次に変化させるための計算式を実装します。この計算は時間経過とともに何度も実行させる必要があるため、今回その機構を`requestAnimationFrame()`を使って実現します。

`requestAnimationFrame()`は引数で渡したコールバック関数を、**ブラウザの次の再描画が実行される前に呼び出してくれます**。そのため、アニメーションが完了するまで`requestAnimationFrame()`を呼び続けることで毎フレーム計算が行われ、結果としてアニメーションとなります。

またコールバック関数には引数として、`requestAnimationFrame()`が**最初に発火したタイミングからコールバック関数が呼ばれるまでの経過時間が渡されます**。この引数の値をアニメーションの進捗率の算出に利用します。

```
// アップデートを実行する
requestAnimationFrame(update);

function update(timestamp) {
  // 進捗率を算出
  progress = timestamp / time;

  // 進捗率が100%を超えないよう丸める
  progress = Math.min(progress, 1);

  // 値を算出し反映する
  const resultX = startX + diffX * progress; // X座標
  const resultY = startY + diffY * progress; // Y座標
  target.style.transform = `translate( ${resultX}px, ${resultY}px )`;

  // 進捗が1未満の場合はアップデートを再実行する
  if (progress < 1) {
    requestAnimationFrame(update);
  }
}
```

ここまで十数行ほどのコードを記載しましたが、たったこれだけのコードでアニメーションさせることができます。試しに実行してみましょう。

![](https://ics.media/entry/17183/images/image02.png)

-   [ソースコードを確認する](https://github.com/ics-creative/180203_tween/blob/master/docs/succees.html)
-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180203_tween/succees.html)

これで目的通りのアニメーションができました。しかしライブラリとして使うには、座標や時間を指定するだけで動作するくらい手軽に使いたいものです。ここからは、より汎用的に使用できるよう手を加えていきます。

### 汎用的に利用するための関数化

汎用的に使えるようにするため、「アニメーションの対象」「目標となる座標」「アニメーションの時間」を引数として渡すだけで動作する関数にまとめていきます。イメージとしては、以下のコードで実行できる形を目指します。

```
// 例：みたらしくんを1秒後に1秒かけて座標(500, 150)へアニメーションさせる
animateTranslate("mitarashi", 1000, 500, 150);
```

まずは前ページで作成したコードを関数で包みます。合わせて、引数で渡される変数の宣言は不要になるため削除します。

```
function animateTranslate(targetID, time, endX, endY) {
  const target = document.getElementById(targetID); // アニメーションの対象
  const startX = 50; // X座標の始点
  const startY = 50; // Y座標の始点
  const diffX = endX - startX; // X座標の変化量
  const diffY = endY - startY; // Y座標の変化量
  let progress = 0;

  // アップデートを実行する
  requestAnimationFrame(update);

  function update(timestamp) {
    // 進捗率を算出
    progress = timestamp / time;

    // 進捗率が100%を超えないよう丸める
    progress = Math.min(progress, 1);

    // 値を算出し反映する
    if (progress >= 0) {
      const resultX = startX + diffX * progress; // X座標
      const resultY = startY + diffY * progress; // Y座標
      target.style.transform = `translate( ${resultX}px, ${resultY}px )`;
    }

    // 進捗が1未満の場合はアップデートを再実行する
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
}
```

次に、直接指定していた「座標の始点」を動的に取得するよう改修します。ここでアニメーション対象の`transform:translate`を参照する必要があるのですが、**`transform`をJavaScriptで取得するとMatrixの文字列として返ってきてしまいます**。

```
const style = getComputedStyle(target); // 対象のスタイルを取得
const transform = style.transform; // transform を取得

// transform を出力すると以下の文字列となっている
// matrix(1, 0, 0, 1, 50, 50)
```

Matrixの詳しい説明はここでは割愛しますが、**5・6番目の値が座標を示しています**。これを扱いやすい形にするために、正規表現を使って不要な文字列を削除し配列に変換します。配列に変換しても中身は文字列のままとなっているため、変数に代入する際に**`parseFloat()`を使って数値に変換**しておきます。

```
const style = getComputedStyle(target); // 対象のスタイルを取得
const reg = /matrix\((.*)\)/; // 不要な文字列を取り除くための正規表現
const transform = style.transform.match(reg)[1].split(","); // transform を配列として取得
const startX = parseFloat(transform[4]); // X座標の始点
const startY = parseFloat(transform[5]); // Y座標の始点
```

これで汎用的に使う準備は整いました。しかし機能的に少しさみしいので、再生タイミングを遅らせる遅延機能を追加してみましょう。

#### 再生を遅延させる機能の実装

実行する際の引数を1つ追加し、`delay`という値で受け取ります。これを進捗率の計算の際に経過時間から減算します。こうすると**遅延中は進捗率がマイナス値になる**ため、進捗率がプラスの場合のみ値が更新されるよう分岐させます。

```
// 遅延時間を含めた進捗率を算出
progress = (timestamp - delay) / time;

// 進捗率がプラスの場合のみ値を算出し反映する
if (progress > 0) {
  const resultX = startX + diffX * progress; // X座標
  const resultY = startY + diffY * progress; // Y座標
  target.style.transform = `translate( ${resultX}px, ${resultY}px )`;
}
```

これで遅延再生の機能も実装され、アニメーションライブラリの原型となるものが作成できました。試しに、1秒遅延されるよう指定し実行してみるとこのような動作になります。

```
// みたらしくんを1秒後に1秒かけて座標(500, 150)へアニメーションさせる
animateTranslate("mitarashi", 1000, 500, 150, 1000);
```

![](https://ics.media/entry/17183/images/image02.png)

-   [ソースコードを確認する](https://github.com/ics-creative/180203_tween/blob/master/docs/complete.html)
-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180203_tween/complete.html)

### まとめ

アニメーションライブラリと聞くと複雑な実装を行っている印象を受けるかもしれませんが、蓋を開けてしまえば仕組みはとてもシンプルなものです。

アニメーションに限らずライブラリやフレームワークといったテクノロジーはとても便利なものですが、無闇に使うだけでは機能の持ち腐れとなってしまうこともあります。**仕組みや原理、また作者の意図や方針を理解することでテクノロジーとよりよい関係が築け、あなたのプログラミングを一層サポートしてくれる**ものになるでしょう。

ICS MEDIAではトゥイーンライブラリについて、記事「[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)」や「[最速のアニメーションライブラリはこれだ！ JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)」にまとめています。今回の記事は原理の紹介でしたが、実際にウェブサイトの制作で利用するのはJSライブラリが多いでしょう。参考してみてください。

次回の記事「[イージングとCSSフィルターを組み込む方法](https://ics.media/entry/17470/)」ではイージングなど、より実用的にアニメーションを作成できる機能の実装方法を紹介します。