---
title: "HTML・CSSで実装するかわいいフキダシのアイデア"
source: "https://ics.media/entry/240425/"
publishedDate: "2024-04-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "iwama"
---

見出しなどのテキストを目立たせたいときに便利な**フキダシ（吹き出し）**。 この記事では、HTMLとCSSだけで簡単に実装できる、シンプルなデザインのフキダシをご紹介します。

雑誌やポスターなどで見かける可愛いあしらいをウェブサイトにも取り入れたいと思ったことが、今回のテーマを選んだきっかけです。 とくにフキダシは、少ないコードで表現でき、見出しなどのテキストに華やかな印象を与えられます。 ウェブサイトを制作する際に、ぜひ取り入れてみてください。

また、この記事のほとんどの作例で、CSSの疑似要素『`::before`』と『`::after`』を利用しています。 疑似要素を使うと、不要なHTMLタグを増やさずにCSSで装飾できます。

-   `::before` ＝ 選択した要素の最初の子要素として疑似要素を生成
-   `::after` ＝ 選択した要素の最後の子要素として疑似要素を生成

これらは、要素に装飾的な内容を追加するために用いられることがよくあります。

### 1\. 線と余白を活用したフキダシ

#### 1-1 線半分のフキダシ

下半分のみに枠のあるフキダシ。 `border`を`top`のみ削除し、左下と右下に角丸（`border-radius`）を指定することで実装しています。

ナナメの線は`::after`疑似要素で描いています。ここでは、`box-shadow`に背景色と同じ色を指定することで、線が途切れたような表現をしています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-01/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-01/index.html)

▼ HTML

```
<div class="fukidashi-01-01">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-01 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
}
.fukidashi-01-01::before {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  border: 2px solid #333333;
  border-top: none;
  border-bottom-right-radius: 50px; /* 左下の角丸 */
  border-bottom-left-radius: 50px; /* 右下の角丸 */
  translate: -50%;
}
.fukidashi-01-01::after {
  content: "";
  position: absolute;
  top: calc(100% + 8px); /* フキダシのサイズに応じて調整してください */
  left: 50%;
  width: 30px;
  height: 2px;
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff;
  rotate: 50deg;
  translate: -50%;
}
```

#### 1-2 下線 + 線のフキダシ

下線のみのフキダシ。 `::after`疑似要素でナナメの線を描画し、フキダシの枠部分に重ねています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-02/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-02/index.html)

▼ HTML

```
<div class="fukidashi-01-02">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-02 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border-bottom: 2px solid #333333;
}
.fukidashi-01-02::after {
  content: "";
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  width: 30px;
  height: 2px;
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff;
  rotate: 50deg;
  translate: -25%;
}
```

#### 1-3 下線 + 三角つまみのフキダシ

下線の中央に三角のつまみをつけたフキダシ。 `::after`疑似要素でつまみ部分を描画しています。 さらにその上に背景と同じ色の`::before`疑似要素を重ねることで、不要な線を隠しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-03/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-03/index.html)

▼ HTML

```
<div class="fukidashi-01-03">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-03 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border-bottom: 2px solid #333333;
  background-color: #ffffff;
}
.fukidashi-01-03::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  background-color: #ffffff; /* 背景色と同じ色を指定 */
  rotate: 135deg;
  translate: -50%;
}
.fukidashi-01-03::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  z-index: -1;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #333333 #333333 transparent transparent;
  background-color: #ffffff;
  rotate: 135deg;
  translate: -50%;
}
```

#### 1-4 下線 + 線（隙間あり）のフキダシ

下線のみのフキダシ。 背景と同じ色の`::before`疑似要素を下線に重ねることで、隙間が空いているようなデザインを表現しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-04/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-04/index.html)

▼ HTML

```
<div class="fukidashi-01-04">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-04 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border-bottom: 2px solid #333333;
  background-color: #ffffff;
}
.fukidashi-01-04::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  background-color: #ffffff; /* 背景色と同じ色を指定 */
  rotate: 135deg;
  translate: -50%;
}
.fukidashi-01-04::after {
  content: "";
  position: absolute;
  top: calc(100% + 5px);
  left: calc(50% - 4px);
  z-index: -1;
  width: 30px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
}
```

#### 1-5 下線 + 線 + ポイントのフキダシ

下線のみのフキダシ。 `::after`疑似要素で、線の伸びた先に黒丸を配置しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-05/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-05/index.html)

▼ HTML

```
<div class="fukidashi-01-05">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-05 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border-bottom: 2px solid #333333;
}
.fukidashi-01-05::before {
  content: "";
  position: absolute;
  right: -24px;
  bottom: -13px;
  width: 30px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-01-05::after {
  content: "";
  position: absolute;
  right: -23px;
  bottom: -28px;
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  border: 1px solid #ffffff; /* 背景色と同じ色を指定 */
  border-radius: 50%;
  background-color: #333333;
}
```

#### 1-6 枠 + 三角つまみのフキダシ

下線の中央に三角のつまみをつけた四角いフキダシ。 1-3と同様に、`::after`疑似要素でつまみ部分を描画しています。 さらにその上に背景と同じ色の`::before`疑似要素を重ねることで、不要な線を隠しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-06/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-06/index.html)

▼ HTML

```
<div class="fukidashi-01-06">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-06 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border: 2px solid #333333;
  border-radius: 4px;
}
.fukidashi-01-06::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  background-color: #ffffff; /* 背景色と同じ色を指定 */
  rotate: 135deg;
  translate: -50%;
}
.fukidashi-01-06::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #333333 #333333 transparent transparent;
  rotate: 135deg;
  translate: -50%;
}
```

#### 1-7 枠 + 線のフキダシ

下線のナナメの線を重ねた四角いフキダシ。 1-2と同じ方法で、ナナメの線を実装しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-07/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-07/index.html)

▼ HTML

```
<div class="fukidashi-01-07">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-07 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border: 2px solid #333333;
}
.fukidashi-01-07::after {
  content: "";
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  width: 30px;
  height: 2px;
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
  rotate: 50deg;
}
```

#### 1-8 立体感のあるフキダシ

下線のナナメの線を重ねた四角いフキダシ。 こちらは背景に`::before`疑似要素で同じサイズの図形を作成し、ズラして配置することで、立体感のあるデザインになっています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-08/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-08/index.html)

▼ HTML

```
<div class="fukidashi-01-08">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-08 {
  position: relative;
  width: fit-content;
  padding: 12px 16px;
  border: 2px solid #333333;
  background-color: #ffffff;
}
.fukidashi-01-08::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: -2;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid #333333;
  background-color: #ffffff;
}
.fukidashi-01-08::after {
  content: "";
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  z-index: -1;
  width: 20px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
}
```

#### 1-9 円 + 線のフキダシ

下線のナナメの線を重ねた丸いフキダシ。 こちらも`::after`疑似要素でナナメの線を描画し、フキダシの枠部分に重ねています。

※テキストの量に応じて、widthやheightを調整してお使いください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-09/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-09/index.html)

▼ HTML

```
<div class="fukidashi-01-09">
  <div>かわいい<br>フキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-09 {
  position: relative;
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border: 2px solid #333333;
  border-radius: 50%;
}
.fukidashi-01-09::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 26px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
}
```

#### 1-10 円 + 線（隙間あり）のフキダシ

下線のナナメの線を重ねた丸いフキダシ。 こちらも背景と同じ色の`::before`疑似要素を下線に重ねることで、隙間が空いているようなデザインを表現しています。

※テキストの量に応じて、widthやheightを調整してお使いください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-10/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-10/index.html)

▼ HTML

```
<div class="fukidashi-01-10">
  <div>かわいい<br>フキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-10 {
  position: relative;
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border: 2px solid #333333;
  border-radius: 50%;
}
.fukidashi-01-10::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 58%;
  width: 15px;
  height: 15px;
  transform: rotate(135deg);
  box-sizing: border-box;
  background-color: #ffffff; /* 背景色と同じ色を指定 */
}
.fukidashi-01-10::after {
  content: "";
  position: absolute;
  top: calc(100% + 5px);
  left: 54%;
  width: 20px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
}
```

#### 1-11 ふたつの円 + 線のフキダシ

左上にさらに円形の要素を重ねた丸いフキダシ。 こちらは`span`タグを追加することで実装しています。雪だるまのように配置しても可愛いかもしれません。

※テキストの量に応じて、widthやheightを調整してお使いください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-11/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-11/index.html)

▼ HTML

```
<div class="fukidashi-01-11">
  <div class="text">かわいい<br>フキダシ</div>
  <span class="ornament">Cute!</span>
</div>
```

▼ CSS

```
.fukidashi-01-11 {
  position: relative;
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border: 2px solid #333333;
  border-radius: 50%;
}
.fukidashi-01-11::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 58%;
  width: 26px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
  box-shadow: 0 2px 0 #ffffff, 0 -2px 0 #ffffff; /* 背景色と同じ色を指定 */
}
.fukidashi-01-11 > .text {
  position: absolute;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
}
.fukidashi-01-11 > .ornament {
  position: absolute;
  top: -30%;
  left: -25%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 60%;
  height: 60%;
  font-size: 16px;
  border: 2px solid #333333;
  border-radius: 50%;
  background-color: #ffffff;
}
.fukidashi-01-11 > .ornament::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 70px;
  width: 15px;
  height: 15px;
  transform: rotate(135deg);
  box-sizing: border-box;
  background-color: #ffffff;
}
```

#### 1-12 下から呼びかけるフキダシ

2本の線でテキストを挟んだようなフキダシ。セリフのような表現に便利です。 `::before`&`::after`疑似要素を`display: flex`で左右に並べるだけで簡単に実装できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-12/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-12/index.html)

▼ HTML

```
<div class="fukidashi-01-12">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-01-12 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
}
.fukidashi-01-12::before {
  content: "";
  width: 30px;
  height: 2px;
  transform: rotate(60deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-01-12::after {
  content: "";
  width: 30px;
  height: 2px;
  transform: rotate(-60deg);
  box-sizing: border-box;
  background-color: #333333;
}
```

#### 1-13 横から呼びかけるフキダシ

4本の線で飛び出すようなデザインのフキダシ。こちらもセリフのような表現に便利です。 空の`span`タグを追加し、外側の2本の線を実装しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/01-13/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/01-13/index.html)

▼ HTML

```
<div class="fukidashi-01-13">
  <div>かわいいフキダシ</div>
  <span class="ornament"></span>
</div>
```

▼ CSS

```
.fukidashi-01-13 {
  position: relative;
  padding: 12px 16px 12px 30px;
}
.fukidashi-01-13::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 0;
  width: 100px;
  height: 1px;
  transform: rotate(-14deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-01-13::after {
  content: "";
  position: absolute;
  bottom: -14px;
  left: 0;
  width: 120px;
  height: 1px;
  transform: rotate(14deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-01-13 > .ornament {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.fukidashi-01-13 > .ornament::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 160px;
  height: 1px;
  transform: rotate(-12deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-01-13 > .ornament::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 160px;
  height: 1px;
  transform: rotate(12deg);
  box-sizing: border-box;
  background-color: #333333;
}
```

### 2\. 塗りアリのフキダシ

#### 2-1 塗り + 三角つまみのフキダシ

下線の中央に三角のつまみをつけた、塗りアリの四角いフキダシ。 1-3と同様に、`::after`疑似要素でつまみ部分を描画していますが、こちらでは`clip-path`プロパティを使用しています。

`clip-path`プロパティは、「要素のどの部分を表示するか」を設定し、クリッピング領域を作るCSSプロパティです。 このCSSプロパティは、以下の記事で詳しく紹介しています。

-   [変幻自在なグラフィック表現！CSS, SVG, Canvasでマスクを使いこなせ](https://ics.media/entry/210701/#clip-path)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/02-01/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/02-01/index.html)

▼ HTML

```
<div class="fukidashi-02-01">
  <div>かわいいフキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-02-01 {
  position: relative;
  width: fit-content;
  padding: 12px 20px;
  color: #ffffff;
  border-radius: 10px;
  background-color: #333333;
}
.fukidashi-02-01::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: -1;
  width: 20px;
  height: 12px;
  transform: translateX(-50%);
  box-sizing: border-box;
  background-color: #333333;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
```

#### 2-2 しずく形のフキダシ

右下から話しかけているようなフキダシ。 `border-radius`を右下以外に指定することで実装しています。

※テキストの量に応じて、widthやheightを調整してお使いください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/02-02/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/02-02/index.html)

▼ HTML

```
<div class="fukidashi-02-02">
  <div>かわいい<br>フキダシ</div>
</div>
```

▼ CSS

```
.fukidashi-02-02 {
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  color: #ffffff;
  border-radius: 100% 100% 0 100%; /* 右下以外に角丸を指定 */
  background-color: #333333;
}
```

#### 2-3 背景色のある円のフキダシ

下線のナナメの線を重ねた、背景色のある丸いフキダシ。 こちらは1-10の応用です。

ここで使われている`mix-blend-mode`は、DOM要素を重ねた時の見え方を指定するCSSプロパティです。 このCSSプロパティは、以下の記事で詳しく紹介しています。

-   [CSSのブレンドモードが素敵！mix-blend-modeを使いこなそう](https://ics.media/entry/7258/)

※テキストの量に応じて、widthやheightを調整してお使いください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/02-03/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/02-03/index.html)

▼ HTML

```
<div class="fukidashi-02-03">
  <div>かわいい<br>フキダシ</div>
  <span class="ornament"></span>
</div>
```

▼ CSS

```
.fukidashi-02-03 {
  position: relative;
  display: grid;
  place-items: center;
  width: 120px;
  height: 120px;
  border: 2px solid #333333;
  border-radius: 50%;
}
.fukidashi-02-03::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 70px;
  width: 15px;
  height: 15px;
  transform: rotate(135deg);
  box-sizing: border-box;
  background-color: #ffffff;
}
.fukidashi-02-03::after {
  content: "";
  position: absolute;
  top: 108%;
  left: 68px;
  width: 20px;
  height: 2px;
  transform: rotate(50deg);
  box-sizing: border-box;
  background-color: #333333;
}
.fukidashi-02-03 > .ornament {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(3px) translateY(3px); /* 位置をややズラす */
  border-radius: 50%;
  background-color: hotpink;
  pointer-events: none; /* クリック不可にする（下のテキストに触れるように） */
  mix-blend-mode: multiply; /* 乗算 */
}
```

#### 2-4 マスキングテープの貼られたフキダシ

左上、右下にマスキングテープ風のあしらいがついたフキダシ。 こちらのあしらいでも`mix-blend-mode`の`multiply`（乗算）を利用することで、透け感を表現しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240425_fukidashi/02-04/)
-   [ソースコードを確認する](https://github.com/ics-creative/240425_fukidashi/tree/main/02-04/index.html)

▼ HTML

```
<div class="fukidashi-02-04">
  <div class="text">かわいいフキダシ</div>
  <span class="ornament"></span>
</div>
```

▼ CSS

```
.fukidashi-02-04 {
  position: relative;
  width: fit-content;
}
.fukidashi-02-04 > .text {
  position: relative;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: #fff3d1;
}
.fukidashi-02-04 > .text::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 15px;
  height: 15px;
  transform: rotate(135deg);
  box-sizing: border-box;
  background-color: #fff3d1;
}
.fukidashi-02-04 > .ornament {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.fukidashi-02-04 > .ornament::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  width: 36px;
  height: 16px;
  transform: rotate(-45deg);
  box-sizing: border-box;
  background-color: #ff57b1;
  mix-blend-mode: multiply; /* 乗算 */
}
.fukidashi-02-04 > .ornament::after {
  content: "";
  position: absolute;
  top: calc(100% - 15px);
  right: -10px;
  width: 36px;
  height: 16px;
  transform: rotate(-45deg);
  box-sizing: border-box;
  background-color: #64d1ff;
  mix-blend-mode: multiply; /* 乗算 */
}
```

### まとめ

HTMLとCSSで作成する、シンプルなデザインのフキダシを紹介しました。 CSSで実装することには、以下のようなメリットがあります。

-   文字数の変化に対応しやすい
-   レスポンシブウェブデザインに対応しやすい
-   アニメーションがつけられる

当記事のコードは、コピー＆ペーストで自由にご活用いただけます。 お好みの色やサイズに調整して使ってみてください。