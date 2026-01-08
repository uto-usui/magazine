---
title: "独立したCSS translate・rotate・scaleプロパティだからできる、豊かなアニメーションテクニック！"
source: "https://ics.media/entry/230309/"
publishedDate: "2023-03-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2023年3月9日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

CSSの`transform`プロパティは`translate()`や`rotate()`を1つの値として受け取るプロパティでした。そのため、同時にそれらを動かしたい場合、1つのプロパティに両方の記述が必要でした。これは記述の複雑化を生みます。

最新のCSSでは`translate`、`rotate`、`scale`をプロパティとして独立して指定できるようになりました。これにより複雑な記述をせずとも別々のタイムラインの指定やイージングの指定など柔軟なアニメーション表現が可能になりました。本記事では独立した特長とそれらを活かしたアニメーション表現を紹介します。

![さまざまな動くアニメーション](https://ics.media/entry/230309/images/230309_thumb.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/tree/main/src)

### 独立したtranslate、rotate、scaleプロパティ

独立した各プロパティについて簡単に説明します。独立したプロパティはGoogle Chrome 104（2022年）、Safari 14.1（2021年）、Safari for iOS 14.8（2021年）、Firefox 72（2020年）以降のブラウザで利用できます。

-   [『CSS property: translate | Can I use…』](https://caniuse.com/mdn-css_properties_translate)
-   [『CSS property: rotate | Can I use…』](https://caniuse.com/mdn-css_properties_scale)
-   [『CSS property: scale | Can I use…』](https://caniuse.com/mdn-css_properties_rotate)

プロパティ化したので値のとり方が少し変わっています。`translate`プロパティはスペース区切りで3つの値（X軸、Y軸、Z軸）をとります。**カンマ区切りでない**ので注意です。

```
translate: 10px 20% 1.5rem;
```

上記はX軸方向に`10px`、Y軸方向に`20%`、Z軸方向に`1.5rem`移動します。指定の方法は従来の`translate3d()`関数と似ています。値を1つしか指定しない場合はX軸、2値だけならXとY軸の移動という解釈をされます。

```
translate: 10px; /* X軸に10px */
translate: 10px 20%; /* X軸に10px Y軸に20% */
```

`scale`プロパティも同様に3値をとりますが、渡す数によって以下のようになります。

-   1つ：X軸Y軸に同じ拡大率
-   2つ：X軸とY軸の拡大率
-   3つ：X軸とY軸とZ軸の拡大率

```
scale: 1.2; /* X軸Y軸ともに1.2倍に拡大（比率を保ったまま1.2倍） */
scale: 1.2 2; /* X軸に1.2倍、Y軸に2倍 */
scale: 1.2 2 0.5; /* X軸に1.2倍、Y軸に2倍、Z軸に0.5倍 */
```

`rotate`は実は少し複雑で`rotate3d()`関数と同様の指定になります。3次元の回転をさせない場合は1つのみを指定するか、特定の軸を添える記法が良いでしょう。

```
rotate: 10deg; /* 時計回りに10度回転 */
rotate: y 45deg; /* Y軸周りに45度回転 */
```

移動と拡大を加えたいときは次のように記述できます。

```
translate: 10px;
scale: 1.2;
```

なお、`skew()`については従来どおり`transform`プロパティの値として使い、独立した指定はできません。

これにより従来ではHTMLを入れ子にしないと不可能だった、別々のタイムラインやイージングを持ったアニメーションが可能になります。

### 別々のタイムライン・イージングを持ったアニメーション

まずは簡単な具体例を紹介します。このような横に等速移動しながら伸びたり縮んだりする絵文字は`translate`プロパティと`scale`プロパティを組み合わせています。

![はねながら左から右へ移動するプリン](https://ics.media/entry/230309/images/230309_pudding.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#pudding)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L49)

※ソースコードはSCSS記法で書かれています。

それぞれの動きのCSSアニメーションのキーフレームで記述すると次のようになります。

```
@keyframes puddingScale {
  0% {
    scale: 1 0.8;
  }

  100% {
    scale: 0.8 1.2;
  }
}

@keyframes puddingMove {
  0% {
    translate: -70% 0;
  }

  100% {
    translate: 70% 0;
  }
}
```

それぞれの動きを別々のキーフレームとして記述したのには2つの理由があります。1つ目は、左から右への動きの1周期と伸び縮みの動きの1周期が違うためです。1回通り過ぎる間に伸び縮みは約5回行います。2つ目はイージングが違うためです。横移動は等速ですが、伸び縮みは徐々に早くなりながら縮みつつ、縮みきる直前はまた減速するような動きです。

この周期の違いやイージングの違いをCSSアニメーションの各プロパティを使って書きます。

```
.pudding {
  --easeInOutExpo: cubic-bezier(0.87, 0, 0.13, 1);
  animation-name: puddingScale, puddingMove;
  animation-duration: 0.25s, 3s;
  animation-timing-function: var(--easeInOutExpo), linear;
  animation-iteration-count: infinite, infinite;
  animation-direction: alternate, normal;
}
```

CSSアニメーションの`animation-name`プロパティは複数の値を持てます。さきほどの`puddingScale`キーフレームと`puddingMove`キーフレームを指定し、キーフレームの動きを合成します。`animation-duration`で伸び縮みの1周期が`0.25`秒、横移動が`3`秒と別々に指定し、`animation-timing-function`プロパティで[easeInOutExpoなイージング](https://easings.net/ja#easeInOutExpo)とlinearなイージングを指定しています。

また伸び縮みのアニメーションは`animation-direction`プロパティで`alternate`を指定しています。`alternate`値はアニメーションを終えると逆方向の始まる指定となります。そのため`puddingScale`キーフレームでは縮む方しか記述していませんが、縮み→伸びる→縮む…を繰り返します。

なお、イージング関数はCSS変数にしておくと再利用が楽になり可読性もあがるのでオススメです。

独立したプロパティをもったことでこのように別々の継続時間、別のイージングを記述し合成しやすくなりました。次はより複雑な動きを紹介します。

#### ポップアップする文字

ここからはより実践的な例を紹介します。さきほどの伸び縮みするプリンのアニメーションを応用して、ふわっと出てくる文字も作成できます。こちらは移動と拡大を使っています。このアニメーションは次のようなHTMLとCSSでできています。

![下からふわっと現れるPOPUPの文字](https://ics.media/entry/230309/images/230309_popup.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#popup)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L205)

▼HTML

```
<span class="popup" style="--index: 0">p</span>
<span class="popup" style="--index: 1">o</span>
<span class="popup" style="--index: 2">p</span>
<span class="popup" style="--index: 3">u</span>
<span class="popup" style="--index: 4">p</span>

```

▼CSS

```
/* 装飾に関するCSSは省略しています */
.popup {
  --easeOutCubic: cubic-bezier(0.33, 1, 0.68, 1);
  display: inline-block;
  transform-origin: 50% 100%;
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.3, 3, 0.64, 1), var(--easeOutCubic);
  animation-delay: calc(0.15s + 0.05s * var(--index)),
    calc(0.05s * var(--index));
  animation-iteration-count: 1;
  animation-fill-mode: backwards;
}

@keyframes popupScale {
  0% {
    scale: 0.7 0.7;
  }

  100% {
    scale: 1 1;
  }
}

@keyframes popupMove {
  0% {
    translate: 0 100%;
  }

  100% {
    translate: 0 0;
  }
}
```

さきほどのプリンと同様、`scale`プロパティと`translate`プロパティのタイムラインを別々に記述しています。いずれのキーフレームは初期値からゴールまで全区間で変化するようなシンプルな指定です。この動きのポイントはアニメーションのイージングを拡大と移動別々のものを指定している点です。

`animation-timing-function`プロパティでアニメーションの区間のイージングを指定できます。拡大は少しオーバーしてから戻るような関数、移動は`easeOutCubic`関数です。イージング関数を工夫することで質感のある動きができます。

また、ここで活用しているのがCSS変数です。これを用いることで1つのCSSの設定で個別のアニメーションの遅延時間を指定できます。HTMLタグにインデックス番号をふり、その値に基づいて遅延時間を指定しています。移動は`calc(0.05s * var(--index))`で0.05秒ずつずらし、拡大は`calc(0.15s + 0.05s * var(--index))`を指定し、移動よりも0.15秒だけ少しおそく発生しています。ズラすことでオーバーな動きをより印象づけています。

### ホバーで大きくなるインタラクション

CSSアニメーションのメリットはインタラクティブな要素にアニメーションをつけられる点です。次の例はホバーすると「Contact Us」の文字が回転するアニメーションしながら大きくなります。

![Contact Usの文字が回転するお問い合わせボタン](https://ics.media/entry/230309/images/230309_contact.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#contact)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L157)

```
<a href="#!" class="contactUs">
  <img
    src="/assets/images/contact_us_text.svg"
    alt="contact us"
    width="256"
    height="256"
    class="contactUs_text"
  />
  <img
    src="/assets/images/contact_us_icon.svg"
    alt=""
    width="256"
    height="256"
    class="contactUs_icon"
  />
</a>
```

```
/* レイアウトに関するCSSは省略しています */
.contactUs_text {
  --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
  transition: scale 0.6s var(--easeOutExpo);
  animation-name: contactRotate;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.contactUs:hover .contactUs_text {
  scale: 1.2;
}

@keyframes contactRotate {
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
}
```

「回転」と「拡大」は従来であればテキスト要素を入れ子構造にしないと難しかったですが、入れ子なしで済むようになります。CSSアニメーションとトランジションアニメーションと組み合わせられるのも独立したプロパティならではのポイントです。

### ぴょんぴょんはねるローディング文字

少し複雑なアニメーションになりますが、ぴょんぴょんと飛び跳ねる文字もできます。

![はねる「NowLoading」の文字](https://ics.media/entry/230309/images/230309_loading.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#loading)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L89)

▼HTML

```
<span class="text" style="--index: 0">N</span>
<span class="text" style="--index: 1">O</span>
<span class="text" style="--index: 2">W</span>
<span class="text" style="--index: 3">L</span>
<span class="text" style="--index: 4">O</span>
<span class="text" style="--index: 5">A</span>
<span class="text" style="--index: 6">D</span>
<span class="text" style="--index: 7">I</span>
<span class="text" style="--index: 8">N</span>
<span class="text" style="--index: 9">G</span>
```

▼CSS

```
/* 装飾に関するCSSは省略しています */
.text {
  display: inline-block;
  transform-origin: 50% 85%;
  animation-name: loadingScale, loadingMove;
  animation-duration: 4s;
  animation-timing-function: var(--easeInOutQuint), var(--easeOutCubic);
  animation-delay: calc(0.4s * var(--index));
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}

@keyframes loadingMove {
  0% {
    translate: 0 0;
  }

  5% {
    translate: 0 0;
  }

  10% {
    translate: 0 -60%;
  }

  15% {
    translate: 0 0;
  }

  100% {
    translate: 0 0;
  }
}

@keyframes loadingScale {
  0% {
    scale: 1 1;
  }

  5% {
    scale: 1.15 0.85;
  }

  10% {
    scale: 0.9 1.2;
  }

  17% {
    scale: 1.15 0.85;
  }

  25% {
    scale: 1 1;
  }

  100% {
    scale: 1 1;
  }
}
```

「NowLoading」の10文字で一連のアニメーションですが、実装としてはジャンプするアニメーションを1文字ずつ少し遅延させてスタートさせたものです。10文字でちょうど1周になるよう`animation-duration`と`animation-delay`のタイミングを調整します。`animation-duration`が4秒で1周なので、`animation-delay`の遅延時間は4秒の10分の1、0.4秒に指定しています。

`loadingMove`キーフレームを見てみると、ジャンプの動きは5〜10％の区間で上に`60%`移動し、10〜15％の区間で着地します。一方変形の`loadingScale`キーフレームの動きはまず0〜5％の区間で縦に縮み、横に少し膨れます。ジャンプする5％〜10％区間では逆に縦は伸び、横は細くなります。10〜17％の区間でまた縮みますが、着地より少し長いことで**着地後に**一番縮みます。17~25％の区間でもとの大きさに戻りますが、戻るまで長めにとっているので少し余韻のある表現になっています。

このような複雑なアニメーションも独立したことでスマートに記述できるように進化しました。

### 作例紹介

これまでの説明を応用した作例とコードを紹介します。表現のアイデアの参考になれば幸いです。

#### 飛んでくるリスト

右から左に飛んでくるリストです。拡縮を繰り返し減衰しながら元の大きさに戻ることでやわらかい物体のような動きになっています。

![右から左へ飛んでくるリスト](https://ics.media/entry/230309/images/230309_list.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#list)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L252)

▼HTML

```
<li style="--index: 1">List1</li>
<li style="--index: 2">List2</li>
<li style="--index: 3">List3</li>
<li style="--index: 4">List4</li>
```

▼CSS

```
/* 装飾に関するCSSは省略しています */
li {
  --easeInOutQuint: cubic-bezier(0.83, 0, 0.17, 1);
  --easeOutCubic: cubic-bezier(0.33, 1, 0.68, 1);
  transform-origin: 0 100%;
  animation-duration: 1s, 0.25s;
  animation-timing-function: var(--easeInOutQuint), var(--easeOutCubic);
  animation-delay: calc(var(--index) * 0.1s);
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

@keyframes listScale {
  0% {
    scale: 0.85 1;
  }

  10% {
    scale: 0.85 1;
  }

  15% {
    scale: 0.5 1;
  }

  35% {
    scale: 1.1 1;
  }

  45% {
    scale: 0.8 1;
  }

  55% {
    scale: 1.05 1;
  }

  70% {
    scale: 0.95 1;
  }

  90% {
    scale: 1 1;
  }
}

@keyframes listMove {
  0% {
    translate: 100% 0;
    opacity: 0;
  }

  100% {
    translate: 0 0;
    opacity: 1;
  }
}
```

リストである必然性はありませんが、さまざまな要素の登場方法として応用できそうな気がしています。

#### マウスストーカー

サンプルページではマウスストーカーが実装されていますが、これも作例の1つです。JavaScriptと組み合わせて、JavaScriptで算出する座標位置の`translate`プロパティとインタラクションで大きくなる`scale`プロパティがそれぞれ干渉せず独立して記述できます。

![マウスストーカーの動作の様子。インタラクション要素で丸が大きくなる](https://ics.media/entry/230309/images/230309_mouse_stalker.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#mouse_stalker)
-   [コードを確認する（CSS）](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L329)
-   [コードを確認する（JavaScript）](https://github.com/ics-creative/230309_individual_transform/blob/main/src/public/mouseStalker.js)

▼HTML

```
<div class="mouseStalker_cursor"></div>
```

▼CSS

```
.mouseStalker_cursor {
  --easeInOutQuint: cubic-bezier(0.83, 0, 0.17, 1);
  position: fixed;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #333;
  border: 1px solid #333;
  translate: -100% -100%;
  transition: translate 0.6s var(--easeOutQuint), scale 0.4s var(--easeOutQuint),
    background-color 0.2s var(--easeOutQuint);
}

.mouseStalker_cursor.active {
  scale: 2.4;
  background-color: transparent;
}
```

▼JavaScript

```
// マウスストーカーの要素
const stalkerElement = document.querySelector(".mouseStalker_cursor");
// マウス右下になるよう24pxのオフセット
const OFFSET = 24;
document.addEventListener("mousemove", (e) => {
  // 位置をセット
  stalkerElement.style.translate = `${e.clientX + OFFSET}px ${
    e.clientY + OFFSET
  }px`;
});
const interactiveElements = document.querySelectorAll("a,button");
interactiveElements.forEach((element) => {
  // インタラクティブなコンテンツにホバーしたときにアクティブクラスを付与する
  element.addEventListener("mouseenter", () => {
    stalkerElement.classList.add("active");
  });
  // インタラクティブなコンテンツから出たときにアクティブクラスを削除する
  element.addEventListener("mouseleave", () => {
    stalkerElement.classList.remove("active");
  });
});
```

従来では`transform`プロパティの値をJavaScriptがインラインで動的に挿入するので、CSSの記述は上書きされてしまいました。独立したプロパティを用いるとJavaScriptは座標位置の算出とインタラクション要素とのホバーだけに注目すればよくなります。とくにホバー時の拡大アニメーションはクラスの付け替えだけで、具体的なアニメーションはCSSに移譲しています。独立していないと現在地と拡大を合成した値をJavaScriptで挿入しなければならず、処理が面倒です。プロパティの独立はCSSに留まらずJavaScriptにおいても処理を減らせるメリットがあります。

#### 3Dの表現

`transform`プロパティ同様3Dの表現も可能です。ホバーすると手前に出てくる例です。

![3次元的に格納された5枚の画像。ホバーで手前に出てくる](https://ics.media/entry/230309/images/230309_cats.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230309_individual_transform/#cats)
-   [コードを確認する](https://github.com/ics-creative/230309_individual_transform/blob/main/src/assets/style/style.scss#L369)

```
<div class="catImages">
  <img
    src="/assets/images/cat1.jpg"
    alt="猫"
    width="240"
    height="240"
    style="--index: 1"
  />
  <img
    src="/assets/images/cat2.jpg"
    alt="猫"
    width="240"
    height="240"
    style="--index: 2"
  />
  <img
    src="/assets/images/cat3.jpg"
    alt="猫"
    width="240"
    height="240"
    style="--index: 3"
  />
  <img
    src="/assets/images/cat4.jpg"
    alt="猫"
    width="240"
    height="240"
    style="--index: 4"
  />
  <img
    src="/assets/images/cat5.jpg"
    alt="猫"
    width="240"
    height="240"
    style="--index: 5"
  />
</div>
```

```
.catImages {
  --easeOutQuint: cubic-bezier(0.83, 0, 0.17, 1);
  position: relative;
  perspective: 600px;
  transform-style: preserve-3d;
  perspective-origin: 0 50%;
}

.catImages img {
  position: absolute;
  left: calc(-55px + 200px * var(--index));
  display: block;
  transition: rotate 0.8s var(--easeOutQuint),
    translate 1.7s var(--easeOutQuint);
  rotate: 0 1 0 45deg;
  translate: calc(-150px * var(--index)) 0 0;
}

.catImages img:hover {
  rotate: 0 1 0 0deg;
  translate: calc(-150px * var(--index)) 60px 150px;
  transition: rotate 1s var(--easeOutQuint), translate 1.5s var(--easeOutQuint);
}

.catImages img:hover ~ img {
  translate: calc(-150px * var(--index) + 220px) 0 0;
}
```

3Dの場合`rotate`プロパティの指定が難しくなるので注意です。

### まとめ

`transform`プロパティの独立は単に記法が変わっただけでなく、柔軟なアニメーションをより分かりやすく記述できるようになりました。アニメーションをブラッシュアップするときも拡縮・移動・回転をそれぞれ指定でき、前よりも調整しやすくなったと感じています。このようなアニメーション表現のコツは記事[『ウェブのアニメーションを「いい感じ」に魅せるズルいテクニック』](https://ics.media/entry/14346/)にて紹介しています。CSSアニメーションのタイムラインを活用して「活きた」演出は[『コピペで使える！ CSS Animationだけで実現するキャラクターアニメーション』](https://ics.media/entry/11336/) にもさまざまな作例があるので参考にしてください。

`transform`プロパティそのものについては[『もう誤魔化さない！　CSS Transform完全入門(2D編) 』](https://ics.media/entry/210311/)および[『もう誤魔化さない！　CSS Transform完全入門(3D編) 』](https://ics.media/entry/210519/)で解説されています。こちらを読めば`transform`プロパティへの理解もより深まるはずです。

`transform`プロパティの独立を機に、マイクロインタラクションやアニメーションに挑戦してみてはどうでしょうか？