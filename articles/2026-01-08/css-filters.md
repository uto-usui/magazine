---
title: "CSS Filtersはトランジションで使うのがお勧め！手軽に実装するいい感じのマウスオーバー演出"
source: "https://ics.media/entry/15393/"
publishedDate: "2017-04-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

CSS Filtersとはボカシや色調整などグラフィカルな効果が得られるCSSの機能です。この記事では「**マウスオーバーなどの表現を作るのにCSS Filtersが便利**」ということを紹介します。

CSS Filtersの使い方は簡単。CSSの`filter`プロパティに適用したい種類の指定を行うだけです。たとえば、次のような指定をすると、HTML要素にエフェクトがかかった状態で表示されます。

![](https://ics.media/entry/15393/images/170419_css_filter_general.png)

CSS Filtersは実はアニメーションにも利用可能。多彩な表現が簡単に実現できます。今回紹介するサンプルは、マウスオーバーでエフェクトを適用するシンプルなもの。まずは[次のビデオ](https://www.youtube.com/watch?v=gTc1GUlt31E)をご覧ください。

### 明るさを使った表現

明るさ調整の`brightness()`メソッドを利用してみましょう。マウスオーバー時に写真を明るく表示させるには、通常時と`:hover`時に異なるフィルターの値を設定し、CSS Transitionでアニメーションを付与するだけ。簡単ですね。

```
.effect-brightness {
  transition: filter 0.3s ease;
  filter: brightness(
    1
  ); /* デフォルト値なのでこの一行は省略してもOK */
}

.effect-brightness:hover {
  filter: brightness(1.75); /* 明るくする */
}
```

写真にマウスを重ねましょう。ホバー時の演出を確認できます。

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/web/sample-brightness-transition.html)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/blob/master/web/sample-brightness-transition.html#L13-L20)

### 明るさを使った表現 （点滅）

CSS Transitionを工夫するだけで、さまざまなバリエーションを作れます。マウスオーバーしたときに一瞬ピカッと光る表現を入れることで、キビキビ動作する雰囲気の印象を与えることができます。境界線の演出を加えることでキリッとした印象にできます。

通常時とホバー時で異なる`transition`プロパティを指定するのが演出のコツです。

```
/* 通常時 */
.effect-flash {
  border: 1px solid rgba(255, 255, 255, 0%);  /* 境界線 */

  filter: brightness(1.0);
  transition: filter 1s, border-color 1s ; /* イージングをおとなしくかける */
}

/* ホバー時 */
.effect-flash:hover {
  border: 1px solid rgba(255, 255, 255, 100%);  /* 境界線 */
  transition: border-color 0.2s;

  animation: bright-flash 0.2s linear forwards;  /* CSS Animationで演出。最後の状態を維持 */
}

@keyframes bright-flash {
  0% {
    /* いきなり明るい状態から始めることでユーザー操作の反応の良さを示す */
    filter: brightness(2.5);
  }

  100% {
    filter: brightness(1.25);
  }
}
```

写真にマウスを重ねましょう。ホバー時の演出を確認できます。

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/web/sample-brightness-flash.html)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/blob/master/web/sample-brightness-flash.html)

これに似た効果を実装した事例としては、ウェブサイト「[ClockMaker Labs](http://clockmaker.jp/labs/)」や「[Beautifl - Flash Gallery](https://beautifl.net/)」があります。

### 彩度を使った表現

通常状態をモノクロにしておき、マウスオーバーしたときにモノクロを解除するテクニック。モノクロにすることで全体的に上品なデザインの表現に使えます。化粧品や服飾などブランド広告のウェブサイトとかに役立ちそうな表現です。

```
/* 通常時 */
.effect-mono {
  filter: grayscale(100); /* モノクロにする */
  transition: filter 0.2s;
}

/* ホバー時 */
.effect-mono:hover {
  filter: grayscale(0); /* モノクロを解除する */
}
```

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/web/sample-monochrome.html)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/blob/master/web/sample-monochrome.html)

### 明るさを使った表現（ボタンに最適）

`brightness()`を使った表現は、ポリモーフィズムなデザインのボタンに最適。光沢感のあるデザインは明度の変化は相性がよく、一枚のボタン画像だけでいい感じに仕上がります。デザイナーが通常状態のボタン画像しか用意してくれなかったとしても、簡単に設定できるので重宝します。

```
.btn {
  /* 通常時の明るさ(デフォルト値) */
  filter: brightness(1);
  transition: filter 0.3s;
}

.btn:hover {
  /* マウスオーバー時に明るくする */
  filter: brightness(1.15);
}

.btn:active {
  /* マウスダウン時に暗くする */
  filter: brightness(0.85);
}
```

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/web/sample-button.html)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/blob/master/web/sample-button.html)

この方法は、14年前の筆者の記事「[Flashで一枚の画像を超シンプルにボタンにする方法](http://clockmaker.jp/blog/2009/01/simple_button/)」で紹介していた方法と同じ原理。「**手を抜いて作ってる割にはそれっぽい**」かつ「**使いまわしがきく**」演出です。

### ボカシを使った表現

マウスオーバーしたときに追加の情報を表示するテクニック。サンプルとして、マウスオーバーしたときにSNSのシェアカウントを表示するというサンプルを用意しました。オウンドメディアなどのサイトで「記事がどれだけバズったか」を表現するのにひと味効かせたテクニックになります。

少しコードが複雑になるので、ここではポイントとなる箇所に焦点を絞って紹介します。詳しくはソースコードをご覧ください。

```
.effect-blur-thumb {
  transition: all 0.3s ease;
  width: 100%;
}

.effect-blur:hover .effect-blur-thumb {
  /* ホバー時にボカシと明るさを調整する */
  filter: blur(8px) brightness(1.5);
  /* 境界線の見栄えを改善するために拡大も入れておく */
  transform: scale(1.1);
}
```

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/web/sample-blur.html)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/blob/master/web/sample-blur.html)

### CSS Filtersの動作環境

最後にCSS Filtersの動作環境について紹介します。モバイルを含む最近のモダンブラウザー（MS Edge、Chrome、Firefox、Safari）は標準対応しています。

![](https://ics.media/entry/15393/images/images/170419-css-filter-caniuse_230310.png)

参照：「[Can I use…](https://caniuse.com/css-filters)」

唯一使えないのは、昔のブラウザInternet Explorer 11以下のみですが、現在のウェブ制作ではIE11を気にする必要はありません。

### CSS Filterのパフォーマンスは高い

「CSS Filterは実行速度的に重たい？」、という意見もよく耳にします。そこで負荷を計測できるデモを作って試しました。比較的重たいと言われる`blur`効果も含めて適用したところ、2014年モデルのiPhoneやiPadで60fpsで表示することができました。とても滑らかにアニメーションしています。

![](https://ics.media/entry/15393/images/170421_cssfilter_performance.jpg)

ブラウザーやOSによってフィルターのレンダリングが異なるので、気になる方は次のデモを試してください。

-   [デモを別ウインドウで開く](https://ics-creative.github.io/170404_micro_interaction_cssfilter/performance/)
-   [ソースコードを開く](https://github.com/ics-creative/170404_micro_interaction_cssfilter/tree/master/performance)

[ASCII.jp](http://ascii.jp/)（元WPJ）の記事「[CSS3 filterプロパティ使い方まとめ！彩度・明度の調整からぼかし、グレースケール化まで](https://ascii.jp/elem/000/001/207/1207968/)」によると「**説明してきたフィルターはどれもすごいパフォーマンスを発揮します（ハードウェアアクセラレーションを使用しないブラウザでぼかしフィルターが遅くなる場合があることを除けば）**」と説明されています。

### まとめ

お手軽にエフェクトを適用できるので、ウェブサイトのユーザーインタフェースにアクセントを入れるのに最適です。

記事「[CSSのブレンドモードmix-blend-modeを使いこなそう](https://ics.media/entry/7258/)」でも紹介したように、最近のブラウザではCSSの機能が増え、グラフィカルな表現が手軽にできるようになってきました。選択肢の1つとして演出の引き出しに入れてみてはいかがでしょうか。