---
title: "JavaScript製アニメーションライブラリの原理！ イージングとCSSフィルターを組み込む方法"
source: "https://ics.media/entry/17470/"
publishedDate: "2018-03-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は、記事「[JavaScript製アニメーションライブラリの原理を理解しよう](https://ics.media/entry/17183/)」の続編となります。前回の記事ではアニメーションの基本的な仕組みと、基礎部分の実装について解説しました。

今回はより実践的に活用できる機能として、**動きに深みを出す「イージング」**と、**演出にエフェクトを加える「CSSフィルター」のアニメーション**を実装します。CSSコーダーの方であれば、イージングは`CSS Transition`で、CSSフィルターもボタンなどの演出で馴染みがあると思います。

### イージングとは

前回アニメーションとは、時間経過とともに「ある値を0（0%）〜1（100%）の間で連続して変化をさせる」と解説しましたが、たとえば**「最初はゆっくりで、徐々に早く変化させる」**といった具合に**時間経過に応じて変化の速度を調整するのが「イージング」**です。

イージングには色々な種類がありますが、一般的には**「easeIn~」（徐々に加速）**、**「easeOut~」（徐々に減速）**、**「easeInOut~」（加速してから減速）**という名前となっています。こちらの「[Easing Function 早見表](http://easings.net/ja)」では、グラフでさまざまなイージングが視覚的に紹介されているのでぜひご参考ください。

![](https://ics.media/entry/17470/images/image02.png)

今回はこのグラフの中から、**非常に使い勝手のよい「easeInExpo」「easeOutExpo」「easeInOutExpo」**の3つを自力で実装します。難しい印象を持つかもしれませんが、イージングの第一人者の[Robert Penner氏](https://x.com/robpenner)が「[Robert Penner’s Easing Functions](http://robertpenner.com/easing/)」にて文献やコードを公開されているので、ここからJavaScriptの数式を流用させてもらいます（\*）。このイージングはFlashやJavaScriptのトゥイーンエンジンで広く採用され、いまやデファクトスタンダードとなっています。

※「[Open Source under BSD License](http://robertpenner.com/easing_terms_of_use.html)」のライセンスで公開されているため、著作権の表示と免責条項を明記すれば再利用・再配布が可能です。

### イージングの実装方法

イージングの使用イメージとしては、イージング名を文字列で渡して実行できる形を目指します。

```
// みたらしくんを1秒後に1秒かけて座標(500, 150)へ、加速〜減速しながらアニメーションさせる
animateTranslate(
  "mitarashi",
  1000,
  "easeInOutExpo",
  500,
  150,
  1000
);
```

次は、イージング名から「イージング関数」を返す関数を作成します。`switch`文の中で`ease`に代入される「イージング関数」は、**公開さているコードからそのまま移植**しています。ただ第1引数に元々あった「`x`」の値については、使用しないため削除しています。

```
const ease = getEasing(easing); // 使用するイージング関数

function getEasing(easingName) {
  let ease;
  switch (easingName) {
    case "easeInExpo":
      ease = function(t, b, c, d) {
        return t == 0
          ? b
          : c * Math.pow(2, 10 * (t / d - 1)) + b;
      };
      break;
    case "easeOutExpo":
      ease = function(t, b, c, d) {
        return t == d
          ? b + c
          : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
      };
      break;
    case "easeInOutExpo":
      ease = function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1)
          return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
      };
      break;
  }
  return ease;
}
```

今回移植するイージング関数には、4つの引数を渡します。それぞれ、**「t：アニメーションの経過時間」「b：始点」「c：変化量」「d：変化にかける時間」**となっているので、必要な値を渡せばイージングを反映した結果を返してくれます。ただし、今回は変化割合（0〜1）という形で扱いたいため、進捗率の`progress`を経過時間として渡し、「始点：0」「変化量：1」「変化時間：1」とそれぞれ指定し、算出された値を`progress`の代わりに使用します。

```
easeProgress = ease(progress, 0, 1, 1); // 進捗率からイージング関数を通した変化割合を算出
```

これでイージングの実装ができました。試しに「easeInOutExpo」でアニメーションさせると、等速でのっぺりした印象から、**緩急のついたいい感じの動き**に変わります。

![](https://ics.media/entry/17470/images/image02.png)

-   [ソースコードを確認する](https://github.com/ics-creative/180203_tween/blob/master/docs/easing.html)
-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180203_tween/easing.html)

### CSSフィルターアニメーションの実装

CSSフィルターのアニメーションの実装といっても、基本的には座標アニメーションの時と変わりません。ただし、オプション的に任意で指定ができる形を想定して実装します。CSSフィルターもさまざまな効果がありますが、今回は**「ぼかし」「明るさ」**の2つを実装します。

![](https://ics.media/entry/17470/images/image01.png)

```
// みたらしくんを1秒後に1秒かけて座標(500, 150)へ、加速〜減速&ぼかし&光ながらアニメーションさせる
animateTranslate(
  "mitarashi",
  1000,
  "easeInOutExpo",
  500,
  150,
  1000,
  { blur: 10, brightness: 2.0 }
);
```

まず、各変数の初期値を設定します。**`brightness`は通常時の値が「0」ではなく「1.0」**なので注意してください。

```
// フィルター関連の変数の宣言
let startBlur = 0; // ぼかしの始点
let startBrightness = 1.0; // 明るさの始点
let diffBlur = 0; // ぼかしの変化量
let diffBrightness = 0; // 明るさの変化量
```

次に、「始点」と「変化量」を設定します。フィルターの値は「`blur(10px) brightness(2)`」といった文字列で取得されるので、座標の時と同様に**正規表現を使って必要な値を抽出**します。ただし、フィルターが設定されていない場合「`none`」という文字列が返されるため、その場合は正規表現を行わず初期値のまま扱います。

```
const styleFilter = style.filter; // 対象の設定されているフィルターを取得
const regBlur = /blur\((.*px)\)/; // 不要な文字列を取り除くための正規表現
const regBrightness = /brightness\((.*)\)/; // 不要な文字列を取り除くための正規表現

// フィルターアニメーションを使用する場合
if (filters != null) {
  // 対象にフィルターが設定されている場合
  if (styleFilter != "none") {
    // フィルターの始点の設定
    if (styleFilter.includes("blur")) {
      startBlur = parseFloat(styleFilter.match(regBlur)[1]);
    }
    if (styleFilter.includes("brightness")) {
      startBrightness = parseFloat(
        styleFilter.match(regBrightness)[1]
      );
    }
  }

  // フィルターの変化量の算出
  if (filters.hasOwnProperty("blur")) {
    diffBlur = filters.blur - startBlur;
  }
  if (filters.hasOwnProperty("brightness")) {
    diffBrightness = filters.brightness - startBrightness;
  }
}
```

進捗率に応じて値を反映させる部分は、以下のようになります。空の文字列に各フィルターの値を追加して、最期にフィルターの値として設定します。

```
let resultFilter = "";

// 各フィルターの値を算出
resultFilter += `blur( ${startBlur +
  diffBlur * easeProgress}px ) `;
resultFilter += `brightness( ${startBrightness +
  diffBrightness * easeProgress} )`;

// フィルターの値を反映
target.style.filter = resultFilter;
```

ここで注意すべきは、たとえば「ぼかし」フィルターだけアニメーションさせたい場合でも「明るさ」フィルターも更新する点です。フィルターはまとめて1つの文字列で適応されるため、「ぼかし」だけ反映してしまうと元から設定されていた他のフィルターを上書きしてしまうためです。

これでフィルターアニメーションもでき上がりました。実行すると、みたらしくんが太陽のように光り輝くようになります。

![](https://ics.media/entry/17470/images/image02.png)

-   [ソースコードを確認する](https://github.com/ics-creative/180203_tween/blob/master/docs/filter.html)
-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180203_tween/filter.html)

### まとめ

2回に渡ってアニメーションの仕組みと実装について解説しました。今回作成した100行程度のコードで、ちょっとしたアニメーションであれば十分に作れます。

これをきっかけにアニメーションライブラリを作成する、といった方は恐らくいないと思いますが、普段意識せず使っているライブラリやフレームワークの仕組みや原理に興味を持ってもらえればと思います。

また前回の記事「[JavaScript製アニメーションライブラリの原理を理解しよう](https://ics.media/entry/17183/)」を読んでいない方は、ぜひこちらもご覧ください。

ICS MEDIAではこの他にもアニメーションライブラリ（Flash時代はトゥイーンライブラリと呼ばれてました）について、記事「[ウェブのアニメーション制作に役立つ！ 流行りのJSライブラリのまとめ](https://ics.media/entry/14973/)」や「[最速のアニメーションライブラリはこれだ！ JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)」にまとめています。今回の記事は原理の紹介でしたが、実際にウェブサイトの制作で利用するのはJSライブラリが多いと思いますので、参考してみてください。