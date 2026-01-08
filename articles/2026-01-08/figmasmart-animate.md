---
title: "FigmaのSmart Animateを活用したプロトタイプ入門"
source: "https://ics.media/entry/210526/"
publishedDate: "2021-05-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

新進気鋭のデザインツール「Figma」。オンラインの共同編集やデザインシステムの構築機能などで人気を集めていますが、実は強力なアニメーション機能も搭載されています。

前回の記事『[最新版で比較するAdobe XDとFigmaの違い - プロトタイプ機能編](https://ics.media/entry/210401/)』でAdobe XDとFigmaの機能の違いを紹介しましたが、本記事では改めてFigmaの「Smart Animate」について詳しく紹介します。

「Smart Animate」を使うことで、簡単にアニメーションを実現でき、インタラクションのイメージの共有が可能です。これからFigmaを触り始めようと思っている方や、どのデザインツールを使うべきか具体的な機能を知ってから判断したいという方は是非ご覧ください。

### Smart Animateとは

「Smart Animate」とは、アートボード間の差分をアニメーションでつないでくれる機能です。2つのアートボードに同名かつ同じ種類のレイヤーが存在する場合、それぞれを始点と終点として、その間の変化を自動補完されアニメーションが作成されます。

![Smart Animateの基本知識](https://ics.media/entry/210526/images/210526_smart_animate.gif)

アニメーションが適用されるプロパティは限定されており、詳しくは「サポートされているプロパティ」の項で解説します。

「Smart Animate」を使うことで、以下のようなアニメーションがFigma上で再現できます。

### Smart Animateの使い方

Smart Animateを使うには、まず2つのアートボードに同名かつ同じ種類のレイヤーを作成します。アニメーションさせたいレイヤーがグループやフレーム、マスクの中にある場合は、階層構造も同じにします。

アニメーションの始点と終点を設定したら、右側のパネルの「Prototype」をクリックします。始点となるアートボードから終点となるアートボードへリンクをつなげ、Interaction DetailsパネルにあるTransition項目を「Smart animate」に設定します。

右上の再生ボタンからプレビューを確認すると、アニメーション付きのプロトタイプが実現できます。

![Smart Animateの設定方法](https://ics.media/entry/210526/images/210526_smart_animate_step.gif)

-   [Smart Animateの使い方のデモ](https://www.figma.com/proto/irJsek3t4iyoqcDmlvBNSx/demo?page-id=193%3A0&node-id=193%3A1&viewport=516%2C385%2C0.8497536778450012&scaling=contain)

### サポートされているプロパティ

便利な「Smart Animate」ですが、前述の通りアニメーションが適用されるプロパティは以下の5つに限定されています。

-   Scale（大きさ）
-   Position（位置）
-   Opacity（不透明度）
-   Rotation（回転）
-   Fill（塗り）

![Smart Animateでサポートされているプロパティ一覧](https://ics.media/entry/210526/images/210526_smart_animate_property.gif)

-   [サポートされているプロパティのデモ](https://www.figma.com/proto/irJsek3t4iyoqcDmlvBNSx/demo?page-id=197%3A0&node-id=197%3A30&viewport=516%2C385%2C0.24199287593364716&scaling=contain)

シャドウやぼかしのようなエフェクトや、パスをアニメーションすることはできません。このようなサポートされていないプロパティを設定した場合「Smart animate」ではなく、フェードアウトとフェードインで遷移を行う「Dissolve」が適用されます。

### Smart Animate matching layers

「Smart Animate matching layers」とは、プロトタイプの一部のレイヤーのみを「Smart Animate」化する機能です。たとえば、画面遷移を「Push」で行うと以下のようにメニュー部分も横に流れてしまいます。

![Smart Animate matching layers無しのアニメーション](https://ics.media/entry/210526/images/210526_smart_animate_push.gif)

-   [matching layersを使わない場合のデモ](https://www.figma.com/proto/uCp8uIAD1ebxjA0O2hnETA/demo2?page-id=3%3A0&node-id=3%3A3&viewport=516%2C385%2C0.43371298909187317&scaling=contain)

「Smart Animate matching layers」を使うことで、メイントランジションであるページ遷移は「Push」で行いながら、メニュー部分は「Smart Animate」によるアニメーションが実現しています。「Smart Animate」化されるのは、今までのように同名かつ同じ種類のレイヤーです。

![Smart Animate matching layers有りのアニメーション](https://ics.media/entry/210526/images/210526_smart_animate_matching_layers.gif)

-   [matching layersを使った場合のデモ](https://www.figma.com/proto/irJsek3t4iyoqcDmlvBNSx/demo?page-id=0%3A1&node-id=120%3A77&viewport=-285%2C-17%2C0.29540935158729553&scaling=contain)

リンクをつないだ際に「Animation」を「Move in」、「Move out」、「Push」、「Slide in」、「Slide out」のいずれかに設定すると、「Smart Animate matching layers」というチェックボックスが現れます。このチェックボックスをオンにすることで、プロトタイプの一部のレイヤーを「Smart Animate」化できます。

![Smart Animate matching layersの設定方法](https://ics.media/entry/210526/images/210526_smart_animate_matching_layers_setting.gif)

### GIFアニメーションとの組み合わせ

Figmaでは、GIFアニメーションの読み込みが可能なので、サポートされているプロパティだけで実現できないようなアニメーションや、複雑なアニメーションでも表示できます。次の例では、ローディングといいねボタンのアニメーションに、GIFアニメーションを利用しています。

![GIFアニメーションを利用した例](https://ics.media/entry/210526/images/210526_smart_animate_gif.gif)

-   [GIFアニメーションを利用したデモ](https://www.figma.com/proto/uCp8uIAD1ebxjA0O2hnETA/demo2?page-id=0%3A1&node-id=1%3A240&viewport=465%2C116%2C0.4324454367160797&scaling=contain)

GIFアニメーションの利用方法はとても簡単で、通常画像のように配置するだけです。アートボード上では静止画として表示されますが、プロトタイプのプレビューを行うとアニメーションを始めます。

![GIFアニメーションを利用方法](https://ics.media/entry/210526/images/210526_smart_animate_gif_setting.gif)

### Smart Animateを設定する際のTips

Figmaでは、右側のパネルで「Prototype」を選択した状態でオブジェクトをホバーすると、別アートボードの同名かつ同じ種類のレイヤー、つまり「Smart Animate」の対象となるレイヤーが強調表示されます。

![prototypeで同名かつ同じ種類のレイヤーが強調される](https://ics.media/entry/210526/images/210526_smart_animate_hover.gif)

### まとめ

「Smart Animate」によって、より精度の高いプロトタイプがお手軽に作成可能です。サポートされているプロパティが5つと少ない印象を受けますが、作例を見ていただいた通りアニメーションのイメージを共有するには十分かと思います。どうしても実現できない時にはGIFアニメーションを使うなど、上手く使いこなしていきましょう。

また、Adobe XDの「自動アニメーション」機能と比べて、違いを確認したいという方には、以下の記事がオススメです。

-   [Adobe XDの自動アニメーションとドラッグジェスチャーを使いこなそう](https://ics.media/entry/19551/)