---
title: "p5.jsの表現力を活かしたクリエイティブなWebサイト事例集"
source: "https://ics.media/entry/250815/"
publishedDate: "2025-08-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "oka"
---

2025年8月15日 公開 / [株式会社ICS 岡 大貴](https://ics.media/entry/staff/oka/)

ウェブサイトにおけるダイナミックなクリエイティブ表現の裏側には、多くの場合JavaScriptライブラリの力があります。有名なものに[Three.js](https://threejs.org/)がありますが、HTML Canvasを利用したライブラリである[p5.js](https://p5js.org/)の表現力も決して劣りません。本記事では、まだあまり知られていない**p5.jsを使ったウェブサイトを通して、p5.jsのウェブ制作への活用方法を紹介**します。

### p5.jsの表現力を活かしたウェブサイト/アプリケーション紹介

p5.jsは、[Processing](https://processing.org/)をベースにしたJavaScriptライブラリで、ビジュアル表現やインタラクションの実装を得意とします。描画はHTMLの`<canvas>`タグに出力されるため、既存のコンポーネントやフレームワークとも統合できます。

本記事では、p5.jsの活用事例のうち、**[Awwwards](https://awwwards.com/)で評価されたもの**を紹介します。

※Awwwardsとは、優れたウェブコンテンツを表彰する海外のサイトです。

#### 1\. Aurora

![Aurora](https://ics.media/entry/250815/images/aurora.png)

-   [『Aurora』を別ウィンドウで開く](https://www.drawaurora.com/)

列車の車窓からの景色を描いたようなウェブアプリケーションで、時間経過に応じて天候の変化や太陽・月の動きなど、さまざまな要素が変化します。またマウスでオーロラを描いたり花火を打ち上げたりとインタラクティブな演出が実装されています。素朴ながらも画面全体を使った大胆な表現で、p5.jsの表現力を活かしています。時間の経過速度や四季などのパラメーターをUIから調整できるなど細かな工夫や、エフェクトに対応した効果音もポイントです。([Aurora - Awwwards Nominee](https://www.awwwards.com/sites/aurora-1))

-   [『サイト紹介 - Aurora』をYouTubeで見る](https://youtu.be/JKwUedjuRUA)

#### 2\. Anand Upender Portfolio

![Anand Upender Portfolio](https://ics.media/entry/250815/images/anand-upender.png)

-   [『Anand Upender Portfolio』を別ウィンドウで開く](https://www.anandupender.com/)

ウェブデザイナーのAnand Upenderさんのポートフォリオサイトです。トップページのヒーローエリアから「Design」「Sandbox」ページまでp5.jsを使った演出が多く盛り込まれています。ページを目にした時に初めに目がいくであろうヒーローエリアにインタラクティブな演出が含まれていると、他のページにもおもしろい演出があるのではないかとワクワクしますね。([Anand - Portfolio - Awwwards Honorable Mention](https://www.awwwards.com/sites/anand-portfolio))

-   [「サイト紹介 - Anand Upender Portfolio」をYouTubeで見る](https://youtu.be/FLy8GH_CDtk)

#### 3\. Infinite Tragedy

![Infinite Tragedy](https://ics.media/entry/250815/images/infinite-tragedy.png)

-   [『Infinite Tragedy』を別ウィンドウで開く](https://www.infinite-tragedy.com/)

フォント「NaN Tragedy」のデモサイトです。無限スクロールできるようになっており、スクロール操作に合わせてさまざまなサイズやウェイトの書体を楽しめます。このサイトではp5.jsにより出力された`<canvas>`タグが画面全体に重ねてあり、画面の随所に手書きのアートワークが描画されます。([Infinite Tragedy - Awwwards Honorable Mention](https://www.awwwards.com/sites/infinite-tragedy))

-   [「サイト紹介 - Infinite Tragedy」をYouTubeで見る](https://youtu.be/Nv1MUb5k9gM)

#### 4\. FVSE

![FVSE](https://ics.media/entry/250815/images/fvse.png)

-   [『 FVSE』を別ウィンドウで開く](https://www.fvse.fyi/)

音楽制作などを手掛けるスタジオFVSEの公式サイトです。「LOADING」後のビジュアルにp5.jsを使用しており、マウスの位置によってビジュアルの動きが変化します。文字情報を多く表示するメインページとは別で画面全体にビジュアルを描画し、大胆な演出を実現しています。([FVSE - Awwwards Honorable Mention](https://www.awwwards.com/sites/fvse))

-   [『サイト紹介 - FVSE』をYouTubeで見る](https://youtu.be/7YXRuDCp3fg)

#### 5\. Plus X Virtual Showroom

![Plus X Virtual Showroom](https://ics.media/entry/250815/images/plusX.png)

-   [『Plus X Virtual Showroom』を別ウィンドウで開く](https://virtual.plus-ex.com/)

デザインスタジオのPlus Xが自社の理念・過去の取り組みを3D空間に展示しているショールームです。ゲームのような3D空間は主にThree.jsで、画面左下のマップUIはp5.jsで実装されています。3D表現にはThree.jsを使い、2D表現にはp5.jsを使うという、それぞれのライブラリで得意な部分を分担させている興味深い例です。([Plus X digital showroom - Awwwards SOTD](https://www.awwwards.com/sites/plus-x-digital-showroom))

-   [『サイト紹介 - Plus X Digital Showroom』をYouTubeで見る](https://youtu.be/Jev3DLeQDa0)

#### 6\. Finiam

![Finiam](https://ics.media/entry/250815/images/finiam.png)

-   [『Finiam』を別ウィンドウで開く](https://www.finiam.com/)

ポルトガルのプロダクトスタジオFiniamのウェブサイトです。ヒーローエリアにp5.jsを使っており、16個の円が描かれています。クリックによってランダムな位置に円が移動したり戻ったりを繰り返します。視覚的なインパクトは小さいですが、部分的にインタラクティブな要素を加えることで、他の要素を邪魔せずに演出ができますね。([Finiam - Awwwards Honorable Mention](https://www.awwwards.com/sites/finiam))

-   [『サイト紹介 - Finiam』をYouTubeで見る](https://youtu.be/iBTsEwkxVNI)

#### 7\. Dash

![dash](https://ics.media/entry/250815/images/dash.png)

-   [『Dash』を別ウィンドウで開く](https://thisisdash.com/)

テック企業DASHのブランドサイトです。大きく目をひく演出をとりいれている訳ではないですが、背景全面にp5.jsで生成したグリッド状のセルを配置し、マウスカーソルが移動した付近のセルに色がつくという演出がなされています。このように`<canvas>`タグを画面全体に重ねつつ、コンテンツの閲覧は妨げないようにさりげなくインタラクティブな演出を加える手法も素敵ですね。([DASH - Awwwards SOTD](https://www.awwwards.com/sites/dash))

-   [『サイト紹介 - DASH』をYouTubeで見る](https://youtu.be/Db9LEl6wnFY)

#### 8\. Hypnotica

![Hypnotica](https://ics.media/entry/250815/images/hypnotica.png)

-   [『Hypnotica』を別ウィンドウで開く](https://www.hypnotica.xyz/)

ジェネラティブアートプロジェクトHypnoticaのウェブサイトです。p5.jsで描画したアートそのものがサイト内に埋め込まれています。このようにクリエイティブコーディングやジェネラティブアートなどの作品をそのまま埋め込む手法はp5.js作品のポートフォリオサイトにも使えそうですね。([Hypnotica - Awwwards Honorable Mention](https://www.awwwards.com/sites/hypnotica))

-   [『サイト紹介 - Hypnotica』をYouTubeで見る](https://youtu.be/4s14bosROb8)

### まとめ

本記事では、p5.jsの表現力を活かしたインタラクティブなウェブサイトを紹介し、p5.jsのウェブ制作への活用ポイントを分析しました。p5.jsを使ったことはあるがウェブサイトには導入したことのない方、ウェブサイト制作は行っているがp5.jsを扱ったことのない方はぜひp5.jsを使ったウェブ制作を試してみてください。

p5.jsによるコーディングがはじめての方は記事『[p5.jsによるクリエイティブコーディング入門](https://ics.media/entry/250611/)』『[VS Code & TypeScriptとp5.jsで始めるモダンなクリエイティブコーディング入門](https://ics.media/entry/210129/)』もあわせてご覧ください。また、ウェブサイトでどのようにp5.jsコードによる演出がなされているかは開発者ツール内で「p5」というキーワードの使用箇所を調べたり、`<canvas>`タグを探したりすることで見つけられる場合があります。開発者ツールにおけるクリエイティブ表現の分析については記事『[クリエイティブ表現のレベルアップに使える最新ブラウザーの開発者機能（前編）](https://ics.media/entry/201119/)』を参照ください。

なお、ICS MEDIAではp5.jsに限らず、JavaScriptでのさまざまなクリエイティブ演出についても解説しています。他のライブラリやクリエイティブ演出の原理について知りたい方は下記の記事もオススメです。

-   [記事：GSAP入門 - アニメーション制作のための高機能なJSライブラリ（前編）](https://ics.media/entry/220822/)
-   [記事：JavaScript製アニメーションライブラリの原理を理解しよう](https://ics.media/entry/17183/)
-   [記事：JavaScriptで実現するFLIPアニメーションの原理と基礎](https://ics.media/entry/240902/)
-   [記事：現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)
-   [トレンドウェブサイトから学べ！JavaScriptで作る本格スクロール演出](https://ics.media/entry/210426/)

次回の記事では、p5.jsを活用したウェブサイト制作のためのテクニックを紹介します。