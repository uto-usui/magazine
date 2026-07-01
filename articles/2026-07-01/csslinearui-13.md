---
title: "CSSのlinear()でUIが軽快になる! スプリングアニメーション活用術13選"
source: "https://ics.media/entry/260402/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-04-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

CSSの`linear()`関数を使うと動きの自由度が高まります。バネのような動きをする**スプリングアニメーション**も`linear()`で実現できることのひとつ。これを使うと、UIにイキイキとした躍動感を加えられ、ユーザーに軽快な印象や心地よいフィードバックを与えることができます。

`linear()`で作った動きはCSSトランジションやCSSアニメーションに利用します。ウェブページのどの部品にも使いやすく、ボタンやタブ、トグルスイッチのような**小さなUIを心地よく見せたいときに便利**です。

この記事では次の内容を紹介します。

-   スプリングアニメーションを適用したUI演出
-   `linear()`の値を調整する方法
-   スプリングアニメーションのニーズの高まり

### 汎用的なUI

スプリングアニメーションを使ったオリジナルのデモを紹介していきます。まずは小さな部品に役立つ例をみていきましょう。

#### セグメントボタン

セグメントボタンの選択状態が切り替わるデモです。背景が少し行きすぎて、ポヨンっと収束するような動きがスプリングアニメーションです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/00_segmented.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/00_segmented.html)

背景の移動に使っているのは、CSSのアンカーポジショニングです（[参考記事](https://ics.media/entry/251215/)）。

#### トグルスイッチ

丸いノブが横へ移動する部分にスプリングアニメーションを使ったデモです。スイッチを切り替えたとき、壁に当たってわずかにポヨンと止まるように動き、柔らかい印象を与えられます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/01_switch.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/01_switch.html)

### 出現や退場を見せるUI

通知、ダイアログ、サイドメニューのようなUIでも、スプリングアニメーションは効果を発揮します。

#### トースト通知

画面上端から通知が現れるデモです。視線誘導に役立ちます。出現するときにバネのように動いています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/10_toast.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/10_toast.html)

#### モーダルUI

押したボタンの近くから`dialog`要素が現れるデモです。ダイアログは表示の割り込みとなるため、モーションを入れると唐突さをやわらげられます。どの操作から開いたのかも伝わりやすくなります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/11_dialog.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/11_dialog.html)

このデモは記事『[HTMLのdialog要素](https://ics.media/entry/250904/)』とあわせて読むと理解しやすいでしょう。

#### ポップオーバーのメニュー

ボタンの近くにメニューが現れるデモです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/13_popover.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/13_popover.html)

ポップオーバーとは、HTMLの属性で利用できる機能です（[参考記事](https://ics.media/entry/230530/)）。

#### フローティングボタン

丸いアクションボタンからサブメニューが広がるデモです。項目が順に出てくることで、開閉の雰囲気が変わります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/12_fab.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/12_fab.html)

配置にはCSSの三角関数をつかっています（[参考記事](https://ics.media/entry/230126/)）。

#### アコーディオン

開閉にスプリングアニメーションを適用しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/20_accordion.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/20_accordion.html)

アコーディオンにはCSSの`interpolate-size`を使うと、コードがシンプルになります（[参考記事](https://ics.media/entry/250627/)）。

#### サイドメニュー

サイドメニューが画面外から現れるデモです。スプリングアニメーションによって、柔らかい印象に仕上げています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/15_drawer.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/15_drawer.html)

#### アクションシート

画面下からシートが現れるデモです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/14_sheet.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/14_sheet.html)

#### 退場モーション

アイテムが消えたことを、周りのアイテムを動かすことで表現してみます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/21_chip.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/21_chip.html)

このデモはJavaScriptを多用していますが、FLIPアニメーションで実現しています（[参考記事](https://ics.media/entry/240902/)）。

### 形や文字が変わるUI

形状そのものが変わるUIや、タイポグラフィーでも、スプリングアニメーションを活用できます。

#### 検索フォームのモーフィング

検索フォームが広がるときに形状が変わるデモです。モーフィングとは形状が変化するモーションのことを指します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/22_search.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/22_search.html)

#### 送信ボタンのモーフィング

送信ボタンの形状が切り替わるデモです。押下後の変化を見せるUIでは、スプリングアニメーションで連続した流れを作れます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/23_submit.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/23_submit.html)

#### テキストアニメーション（番外編）

操作系UIとは少し別ですが、文字が順に現れるデモです。要素がスクロールで表示領域に入ったタイミングで動くようにしています。

スクロールトリガーアニメーション（[参考記事](https://ics.media/entry/230718/)）で作っているので、スクロールして確認してみてください（Chrome・Edge 146以降対応）。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/24_scroll_reveal.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/24_scroll_reveal.html)

文字がバラバラ〜っと出現する動きはCSSの`sibling-index()`を使っています（[参考記事](https://ics.media/entry/260116/)）。

### スプリングアニメーションとは

ここで改めてスプリングアニメーションとはどのような動きなのかを説明します。

スプリングアニメーションは、名前の通り、バネが伸び縮みしながら落ち着く様子に近い見た目になります。物理的な動きを模した動きで、自然な反応やフィードバックを表現するのに適しています。

これをウェブで実現するのが、CSSの`linear()`関数です。`linear()`関数はスプリングアニメーション専用の機能ではありませんが、複数の点を指定することで、さまざまな動きを近似できます。従来の`cubic-bezier()`関数では難しかった、スプリングやバウンスのようなカーブも作れます（複数の点を線形補間するため、力技ですね！）。

![](https://ics.media/entry/260402/images/images/260402_css_linear.png)

```
:root {
  --ease-spring: linear(0, 0.18, 0.42, 0.72, 0.95, 1.06, 1.04, 1.01, 0.99, 1);
}

.button {
  transition: all 1s var(--ease-spring);
}
```

詳しくは記事『[CSSのlinear()関数で自由な動きを作る](https://ics.media/entry/18730/)』を参照ください。

### linear()の値はウェブサービスで作ろう

`linear()`関数の値づくりには、Anime.jsアニメ・ジェイエスのウェブツール「[Easing Functions Editor](https://animejs.com/easing-editor/spring/default)」が便利です。スプリング曲線を可視化し、調整し、CSSとして書き出せます。

![](https://ics.media/entry/260402/images/images/260402_animejs.png)

画面右下の［Export］→［CSS］を選択し、「`linear(0, ･･･`」となっているコードをコピーして使います。

スプリングアニメーションには4種類のパラメーターがあります。

-   `mass`: バネの質量。大きいほど動きが重くなります。
-   `stiffness`: バネの硬さ。大きいほど速く収束します。
-   `damping`: バネの減衰。大きいほど行き過ぎが抑えられます。
-   `velocity`: 初速。大きいほど最初の動きが大きくなります。

以下のようにCSSにペーストして、CSS変数として使うといいでしょう。

```
:root {
  /* 
  デフォルトのSpringの動き
  https://animejs.com/easing-editor/spring/default
  */
  --ease-spring: linear(0, 0.0107, 0.0398, 0.0834, 0.138, 0.2003, 0.2677, 0.3379, 0.4089, 0.4791, 0.5471, 0.612, 0.6731, 0.7297, 0.7815, 0.8283, 0.87, 0.9068, 0.9388, 0.9662, 0.9892, 1.0083, 1.0237, 1.0357, 1.0449, 1.0514, 1.0556, 1.058, 1.0587, 1.0581, 1.0563, 1.0538, 1.0506, 1.0469, 1.043, 1.0388, 1.0347, 1.0306, 1.0266, 1.0228, 1.0192, 1.0159, 1.0128, 1.0101, 1.0076, 1.0055, 1.0036, 1.002, 1.0006, 0.9995, 0.9986, 0.9979, 0.9974, 0.997, 0.9967, 0.9966, 0.9966, 0.9966, 0.9967, 0.9968, 0.997, 0.9972, 0.9975, 0.9977, 0.998, 0.9982, 0.9984, 0.9987, 0.9989, 0.9991, 0.9992, 0.9994, 0.9996, 0.9997, 0.9998, 0.9999, 1, 1, 1.0001, 1.0001, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0002, 1.0001, 1.0001, 1.0001, 1.0001, 1.0001, 1.0001, 1.0001, 1.0001, 1, 1, 1);
}

.toggle__thumb {
  transition: all 1s var(--ease-spring);
}
```

### 普通のeaseとの違い

CSSトランジションには`linear`・`ease-out`・`ease`など用意されています。UIに利用したときの違いを体感してみましょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/15_drawer_compare.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/15_drawer_compare.html)

`linear`・`ease-out`は機械的・台本的な印象を受けます。たいして`ease`はちょうどいい塩梅です。スプリングアニメーションは跳ねる動きがあるので軽快な印象です。`ease`を使うかスプリングアニメーションを使うかはサイトの雰囲気に合わせるといいでしょう。

### 注目されている背景

スプリングアニメーションが求められるようになった背景を整理しておきましょう。スプリングアニメーション自体は昔から存在しますが、2015〜2018年頃からモバイルのOSなどで採用が増えてきました。

Appleの『[Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/)』（2018年）では、画面上の動きをバネでつながれた物体として考え、要素が目標位置へ引き寄せられるモデルが解説されています。『[Springsでアニメーション生成](https://www.youtube.com/watch?v=HaZ2jw9rx9M)』（2023年）では、「**止まった状態と、初速のある場合の両方で連続性を維持する唯一のアニメーション**」と説明されています。どのような初速度からも利用できるため、ジェスチャーの途中からアニメーションさせるのに適している、ということです。

Material Design 3の『[Motion physics system](https://m3.material.io/styles/motion/overview/how-it-works)』でも、スプリングの考え方が整理されています。そこでは、「**1つのバネで、画面遷移、ボタン効果、ジェスチャーなど、さまざまな状況に対応できる**」と説明されています。さらに、プロダクト全体を通して**動きや表現に一貫性をもたせられることも利点**として挙げられています。

このような背景からスプリングアニメーションが広がっており、ツール側にも普及が進んでいます。Figmaのプロトタイプ機能でもスプリングアニメーションを扱えます。

![](https://ics.media/entry/260402/images/images/260402_figma_spring.png)

### JavaScriptライブラリでのスプリングアニメーション

スプリングアニメーションはJavaScriptライブラリでも提供されています。本記事で紹介したのはバネのように見える時間ベースの動きですが、物理演算ベースのスプリングアニメーションはJavaScriptライブラリで利用できます。Motionの『[spring](https://motion.dev/docs/spring)』やAnime.jsの『[Spring](https://animejs.com/documentation/easings/spring/)』があります。記事『[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)』で各ライブラリの搭載状況をまとめています。

#### コラム：Elasticとの違い

モーションライブラリには、古くからElastic（イラスティック）という種類があります。昔からモーションを作ってきた方にはスプリングよりElasticのほうが馴染みのある方もいるでしょう。「ボヨヨーン」といった動きの印象は似ていますが、Elasticはゴールを少し通り過ぎてから何回か揺れ戻る「ゴムっぽい」「派手な」動きになりやすいです。

一方、スプリングは、軽い・重い、硬い・柔らかい、減衰が強い・弱いなど調整の幅が広いのが特徴です。停止のしかたも、スプリングは必ずしも「ぴょんぴょん」するわけではありません。

Elasticとスプリングの違いを見比べるためのデモです。動きの性格の差を確認してみてください。次のデモはAnime.jsで実装したものです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/90_elastic_spring.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/90_elastic_spring.html)

こちらはElasticを使ったテキスト出現演出のデモです。スプリングよりも揺れが強いことがわかりやすいでしょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260402_spring_animation/examples/25_reveal_compare.html)
-   [コードを確認する](https://github.com/ics-creative/260402_spring_animation/blob/main/examples/25_reveal_compare.html)

### まとめ

スプリングアニメーションは、新鮮さを出すためだけの表現ではありません。押した結果や位置関係を伝えやすくし、操作した感を向上させ、UIとしての安心感を与えるための手段です。

ユーザーにとっての使いやすさを意識して、スプリングアニメーションを適切な場面で活用してみましょう。

イージング自体を体系的に整理したい場合は記事『[CSSイージングのお手本](https://ics.media/entry/18730/)』と『[あえてズレを！ ウェブのアニメーションを「いい感じ」に魅せる手法](https://ics.media/entry/14346/)』を参考にしてください。『[マイクロインタラクションを作るためのズルいCC活用テクニック（Adobe MAX JAPAN 2018発表資料）](https://ics.media/entry/19498/)』でマイクロインタラクションの重要性を解説しています。