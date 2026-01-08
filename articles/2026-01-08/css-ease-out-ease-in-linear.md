---
title: "CSSイージングのお手本 - ease-out, ease-in, linearの使い分け"
source: "https://ics.media/entry/18730/"
publishedDate: "2018-07-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

イージングとは「**動きの加減速**」を示す用語で、アニメーションにおいては動きの「**性格**」を表すものです。適切なイージングを設定することで、演出としての印象がかわります。**UI体験をデザインするうえでイージングは欠かせない要素**です。

しかし、イージングは多くの種類があり、それぞれを把握し的確に使い分けるのは少し難易度が高いかもしれません。本記事はイージングの選定に役立つ、お手本的な使い分け方を紹介します。

**この記事の要約**

-   「イーズイン」は徐々に加速、「イーズアウト」は徐々に減速。
-   「イーズアウト」は多くの場面で「変化の余韻が残りやすい印象」でオススメ。
-   CSSの`ease-out`と`ease-in`と`ease-in-out`は緩急が弱いので、`ease`を使うか、こだわる場合は`cubic-bezier()`を使うのがよい。

### イージングの性格

イージングは「最初はゆっくりで、徐々に早く変化させる」といった動きの「性格」を指定するものです。たくさんの種類がありますが、大まかに以下の4つに分けられます。

-   リニア（`linear`）： 等速で変化する。のっぺりとした安定した印象。
-   イーズイン（`ease-in`）： 徐々に加速する。加速するような勢いのある印象。
-   イーズアウト（`ease-out`）： 徐々に減速する。変化の余韻が残りやすい印象。
-   イーズインアウト（`ease-in-out`）： 加速してから減速。

![](https://ics.media/entry/18730/images/180614_erasing_01.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/demo00_01.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/demo00_01.html)

CSSでイージング関数を指定するには、以下のように記載します。

▼CSSトランジション

```
/* CSSトランジションの場合 */
.example {
  transition-property: all;
  transition-duration: 1s;
  /* 🌟イージングを指定 */
  transition-timing-function: ease;
}

.example-2 { 
  /* まとめて書けます */
  transition: all 1s ease;
}
```

▼CSSアニメーション

```
/* CSS アニメーションの場合 */
.example {
  animation-name: motion-x;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  /* 🌟イージングを指定 */
  animation-timing-function: ease;
}

.example-2 {
  /* まとめて書けます */
  animation: motion-x 2s infinite forwards ease;
}
```

### CSSでのイージングの使い分け

イージングとして指定できる主な値は次の通りです。

-   `ease`：適度な加減速
-   `linear`： 等速
-   `ease-in` : 弱い加速
-   `ease-out` : 弱い減速
-   `ease-in-out` : 弱い加減速

`transition-timing-function`プロパティが未指定の場合は、デフォルトの`ease`が適用されます。

`ease`は加速と余韻のある汎用的な指定で、多くの場面で違和感なく利用できます。イージング関数の指定に迷ったら`ease`を使うのが安全牌です。

それに対して「`ease-in`」「`ease-out`」「`ease-in-out`」は緩急が弱く、**動きにメリハリを付けたい場合には不向き**です。

比較として、次のサンプルをご覧ください。チェックボックスの「✓」の出現演出について、それぞれのイージングを比べられます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/5_css_ease_checkbox.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/5_css_ease_checkbox.html)

`linear`は動きが硬く、`ease-in`・`ease-out`・`ease-in-out`は差はあるものの印象の違いは小さいです。`ease`は比較的、機敏な応答性があります。`cubic-bezier()`はもっとも応答性がよいですが、後述します。

またホバー演出についても同様の傾向が見られます。`ease`はインタラクションとして適度な反応の良さがあります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/5_css_ease_hover.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/5_css_ease_hover.html)

ここでお伝えしたいのは、CSSの`ease-in`・`ease-out`・`ease-in-out`は緩急が弱く、コード量が増えるわりに体験に寄与するような結果が得られにくいということです。筆者の経験として`ease-out`等で指定されたコードを見かけたとき、「コンテンツの性質を考えぬいて指定したベストな値なのか」と妥当性に疑いをもつことが多いです。こだわりがないならデフォルトのまま（`ease`）のほうが良い場面も少なくはありません。

### 中・上級者向けのイージング指定方法

規定のイージングだけでは物足りない場合、オリジナルのイージングを設定できる`cubic-bezier()`関数を使います。`cubic-bezier()`関数は3次ベジェ曲線のコントロールポイントの座標を指定します。

▼記載方法

```
/* CSSトランジションの場合 */
.example {
  transition-property: all;
  transition-duration: 1s;
  /* 🌟イージングを指定 */
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); /* easeOutExpo */
}
```

ただ、コントロールポイントの数値だけでは実際の動きは想像しづらいものです。解決方法として、[イージング関数チートシート](https://easings.net/ja)や[Ceaser](https://matthewlein.com/tools/ceaser)といった視覚的にイージングの曲線を描けるツールを利用します。必要なパラメーターをコピー&ペーストで使えます。

利用頻度の高いパラメーターをピックアップしました。`cubic-bezier()`の指定は数値だけだとわかりづらいので、強度を命名にしてCSS変数として定義しておくといいでしょう。

```
:root {
  /* Quint（Quartより強く、Expoより弱い） */
  --ease-quint-in: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-quint-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-quint-inout: cubic-bezier(0.86, 0, 0.07, 1);

  /* Expo（もっとも強い） */
  --ease-expo-in: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-expo-out: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-expo-inout: cubic-bezier(1, 0, 0, 1);
}

/* CSSトランジションの場合 */
.example {
  transition-property: all;
  transition-duration: 1s;
  /* 🌟CSS変数でイージングを指定 */
  transition-timing-function: var(--ease-expo-out);
}
```

他のイージングの強さを参照したい方は、記事末尾を参考ください。

### イージングのさまざまな強さ

`cubic-bezier()`は引数の組み合わせによって無数の種類のイージングを指定できます。そのなかでも慣習的に、イージングには性格の「強さ」が6種類（Sine・Quad・Cubic・Quart・Quint・Expo）あります。

![](https://ics.media/entry/18730/images/180614_erasing_02.png)

▲ Sine < Quad < Cubic < Quart < Quint < Expoの順で性格が強くなる

※ SineやExpo等の定義はイージングの第一人者である[Robert Penner](https://x.com/robpenner)氏が公開されている『[Robert Penner’s Easing Functions](http://robertpenner.com/easing/)』がもとになっています。

その他にも、以下のように特殊な動きをするイージングもあります。

-   Circ： Expoのような強さを持つが、加速や減速の時間がよりゆるやか。
-   Back： 少し行き過ぎてから戻ってくるような動き。
-   Elastic： バネを離した時の往復するような動き。
-   Bounce： ボールが跳ねるような跳ね返りの動き。

![](https://ics.media/entry/18730/images/180614_erasing_03.png)

`cubic-bezier()`でイージングを指定する場合、むやみに引数を与えるのではなく、上記のような慣習的な強さを意識して指定すると、関係者とのコミュニケーションがスムーズになります。

### イーズアウト・イーズインの使い分け

ここからはそれぞれのイージングの使い分けを紹介します。

#### 出現時の演出

たとえば何かを登場させたい、移動させたいといったアニメーションには「イーズアウト」を基本的に使用します。**動きに余韻を残すことで、ユーザーの意識を次の動作へスムーズに移行させます**。

次のデモは、同じアニメーションを「イーズアウト（強め）」と「イーズアウト（規定）」と「リニア＝等速」で比較したものです。「イーズアウト（強め）」からご覧ください。応答性がよく、また十分な余韻があるため心地よさがあります。

▲ 「イーズアウト（強め）」で表示

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/1_shown_easeOutExpo.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/1_shown_easeOutExpo.html)

つづいて「イーズアウト（規定）」で見てみます。CSSの`ease-out`です。イージングが弱いため、余韻はあまりなく、野暮ったい印象です。

▲ 「イーズアウト（規定）」で表示

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/1_shown_ease-out.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/1_shown_ease-out.html)

たいして、「リニア＝等速」も見てみましょう。余韻がいっさいなく、台本的な動きになります。

▲ 「リニア＝等速」で表示

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/1_shown_linear.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/1_shown_linear.html)

#### ユーザーへの応答性の向上

ユーザーの操作によってアニメーションが発生する場合は、動き出しの早いイージングを設定する、アニメーションの時間を短くするといった**ユーザーへのフィードバックがすぐに返せるアニメーションを意識する**ことも重要です。

次のデモは、同じアニメーションを「イーズアウト」と「イーズイン」で比較したものです。イーズアウトからご覧ください。クリックしてすぐに反応します。

▲ 背景を「イーズアウト」でアニメーション

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/2_interaction_easeOut.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/2_interaction_easeOut.html)

たいして、「イーズイン」ではクリックしてからアニメーションが始まるまでの間があります。ワンテンポ遅れている印象です。

▲「イーズイン」でアニメーション

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/2_interaction_easeIn.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/2_interaction_easeIn.html)

「イーズアウト」はもっとも汎用的に使えるイージングです。適切なものがわからない、作り込んでいる時間がないといった場合でも、とりあえず「イーズアウト」を指定すれば表現のレベルを上げられます（ただしCSS規定の`ease-out`は弱いのでオススメしません）。とくにイーズアウトは「Quint」「Expo」の**強いイージングがオススメ**です。

#### あえて加速を使う演出

「イーズアウト」の有用性を主張しましたが、「イーズイン」は勢いのある演出を表現したい場合に使用できます。移動に合わせてスケール値を変化させるとより効果的です。他にもゆっくりとフェードアウトさせたい場合に、スポットライトの明かりが徐々に絞られていくような表現ができます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/3_easeIn.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/3_easeIn.html)

#### リニア（等速）の使い所

「リニア」を使うと野暮ったい印象になるケースが多いのですが、短いフェードの演出、とくに連続したアニメーションをさせたい場合に利用できます。

フェードの場合、**透明度が0%や100%に近いときは変化がないように見えます**。そのため、「イーズアウト」などを設定すると最後の余韻の部分が変化のない「意図しない間」に見えてしまうためです。

次の作例では、見出しが表示されたときに、止まって見える間が存在します。

▲ 文章を「イーズアウト」でフェードイン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/4_fadeIn_easeOut.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/4_fadeIn_easeOut.html)

![](https://ics.media/entry/18730/images/180614_erasing_04.png)

これを解消するために「リニア」を用います。「リニア」に変えてアニメーションの秒数を短くすると同じような動きに見え、**間がなくなるためアニメーションのテンポがよくなります**。

▲ 文章を「リニア」でフェードイン

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/4_fadeIn_linear.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/4_fadeIn_linear.html)

### CSSのlinear()関数で自由な動きを作る

CSSの`transition-timing-function` には、`linear`値のほかに`linear()`という関数も指定できます。`linear()`関数を使うと、複数の点を線形補間できます。引数には`0`（開始値）から`1`（終了値）の値を複数指定します。

バウンスのようなイージングは`cubic-bezier()`関数では指定できませんでしたが、`linear()`関数を使えば自由にイージングを作れます。

```
.motion-x {
  animation: motion-x 1s infinite forwards;
  /* 真ん中をゆっくり */
  animation-timing-function: linear(0, 0.45, 0.48, 0.52, 0.55, 1);
}
@keyframes motion-x {
  from {
    translate: 0%;
  }
  to {
    translate: 100px;
  }
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/demo00_linear.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/demo00_linear.html)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/linear/elastic.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/linear/elastic.html)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180614_easing/linear/bounce.html)
-   [コードを確認する](https://github.com/ics-creative/180614_easing/blob/master/docs/linear/bounce.html)

`linear()`関数はChrome 113（2023年4月）やSafari 17.2（2023年12月）、Firefox 112（2023年4月）以上で利用できます（参照『[Can I Use…](https://caniuse.com/mdn-css_types_easing-function_linear-function)』）。

### まとめ

イージングを変えるだけで、アニメーションの表情は大きくかわります。制作するものの雰囲気や目的に沿って使用できればベストですが、難しい場合はデフォルトの`ease`、もしくは強い性格の`cubic-bezier()`（easeOutQuintやeaseOutExpo）を設定しておくだけでも見栄えがよくなるので、ぜひお試しください。

また、[feb19.jp](https://feb19.jp/)さんの記事『[アニメーションの調味料「イージング」の使い分けレシピ (透明度、UI、音量)](https://feb19.jp/blog/20161201_animation)』も参考になりますので、あわせてご覧ください。

ICS MEDIAではこの他にもアニメーションについて、記事「[あえてズレを入れるのがミソ！ ウェブのアニメーションを「いい感じ」に魅せるズルいテクニック](https://ics.media/entry/14346/)」や「[CSSだけで表現！ コピペで使えるマイクロインタラクション作りました](https://ics.media/entry/15130/)」にまとめているのでご参考ください。

### 余談：イージングの加速減速は映像ソフトと定義が逆

本記事ではイーズアウトは**減速**、イーズインは**加速**と紹介しました。CSSの仕様書『[CSS イージング関数](https://www.w3.org/TR/css-easing-1/)』でも`ease-in`と`ease-out`の数値が定義されていることや、歴史的に『[Robert Penner’s Easing Functions](http://robertpenner.com/easing/)』の定義から、ウェブではこの解釈は間違っていません。

しかし、映像編集のソフトで有名なAdobe After Effectsでは、イージーイーズアウトは**加速**、イージーイーズインは**減速**となっています。映像の世界とウェブの世界で用語の定義が逆になっているので、注意が必要です。

### 付録：イージングの強さ一覧

`animation-timing-function`と`transition-timing-function`で利用可能な`cubic-bezier()`関数でCSS変数として指定可能な値をまとめたので参照ください。「Elastic」と「Bounce」については、`linear()`関数で指定しています。

```
:root {
  /* Sine（もっとも弱い） */
  --ease-sine-in: cubic-bezier(0.47, 0, 0.745, 0.715);
  --ease-sine-out: cubic-bezier(0.39, 0.575, 0.565, 1);
  --ease-sine-inout: cubic-bezier(0.445, 0.05, 0.55, 0.95);

  /* Quad（弱め。Sineより強く、Cubicより弱い） */
  --ease-quad-in: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-quad-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-quad-inout: cubic-bezier(0.455, 0.03, 0.515, 0.955);

  /* Cubic（Quadより強く、Quartより弱い） */
  --ease-cubic-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-cubic-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-cubic-inout: cubic-bezier(0.645, 0.045, 0.355, 1);

  /* Quart（Cubicより強く、Quintより弱い） */
  --ease-quart-in: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-quart-out: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-quart-inout: cubic-bezier(0.77, 0, 0.175, 1);

  /* Quint（Quartより強く、Expoより弱い） */
  --ease-quint-in: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-quint-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-quint-inout: cubic-bezier(0.86, 0, 0.07, 1);

  /* Expo（もっとも強い） */
  --ease-expo-in: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-expo-out: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-expo-inout: cubic-bezier(1, 0, 0, 1);

  /* Circ（Expoのような強さを持つが、加速や減速の時間がよりゆるやか。） */
  --ease-circ-in: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  --ease-circ-out: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-circ-inout: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  /* Back（少し行き過ぎてから戻ってくるような動き） */
  --ease-back-in: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  --ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-back-inout: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* ぼよんぼよんする動き */
  --ease-elastic-out: linear(0, 0.2178 2.1%, 1.1144 8.49%, 1.2959 10.7%, 1.3463 11.81%, 1.3705 12.94%, 1.3726, 1.3643 14.48%, 1.3151 16.2%, 1.0317 21.81%, 0.941 24.01%, 0.8912 25.91%, 0.8694 27.84%, 0.8698 29.21%, 0.8824 30.71%, 1.0122 38.33%, 1.0357, 1.046 42.71%, 1.0416 45.7%, 0.9961 53.26%, 0.9839 57.54%, 0.9853 60.71%, 1.0012 68.14%, 1.0056 72.24%, 0.9981 86.66%, 1);

  /* バウンス */
  --ease-bounce-out: linear(0, 0.004, 0.016, 0.035, 0.063 9.1%, 0.141, 0.25, 0.391, 0.563, 0.765, 1, 0.891, 0.813 45.5%, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813 63.6%, 0.891, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1, 0.988, 0.984, 0.988, 1);
}
```

※ 各値は[Ceaser](https://matthewlein.com/tools/ceaser)から引用しています。

利用方法

```
/* 上記のコードを貼り付けたうえで */

.example { 
  /* ⭐️タイミングファンクションに指定 */
  transition: all 1s var(--ease-elastic-out);
}
```

※この記事が公開されたのは**7年前**ですが、**4か月前の2025年9月**に内容をメンテナンスしています。