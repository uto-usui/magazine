---
title: "最速のアニメーションライブラリはこれだ！ JSライブラリの性能をDOMとWebGPUで比較検証"
source: "https://ics.media/entry/14993/"
publishedDate: "2017-02-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

HTMLのアニメーション実装に役立つさまざまなJavaScriptライブラリがあります。前回の記事「[現場で使えるアニメーション系JSライブラリまとめ](https://ics.media/entry/14973/)」ではJSライブラリの特徴を紹介しましたが、本記事ではそれらのパフォーマンスを比較します。

**JSライブラリのパフォーマンスが良いほど、たくさんのアニメーションがあっても滑らかに動きます**。また、パフォーマンスがよければCPUへの負荷が低くなるため、**サイト訪問者の端末のバッテリー消費の抑制にもつながります**。ウェブ制作者はJSライブラリのパフォーマンスにも気を配りたいものです。

### 今回検証したJSライブラリ

アニメーション（トゥイーン）用のJSライブラリやテクノロジーとして次の7種類で比較しました。バージョンは2025年8月現在の最新版を利用。ウェブページ用途の①DOM版と、ハイパフォーマンス用途の②WebGPU版の2通りの方法で検証しています。

-   [GSAP 3.13.0](https://gsap.com/)
-   [Anime.js 4.1.3](https://animejs.com/)
-   [Motion 12.23.12](https://motion.dev/)
-   [Popmotion 11.0.5](https://popmotion.io/)
-   [Tween.js 25.0.0](https://github.com/tweenjs/tween.js/)
-   Web Animations API
-   CSS Animation

### ①DOMでの同時実行性能の比較

検証用デモはGitHubに公開しており、次のリンクから試せます。ページの上部でライブラリを切り替え、画面下部の入力フォームで画面に表示するドット（`div`要素）の数を変更します。ドット（`div`要素）の数が増えれば負荷が高まります。

![](https://ics.media/entry/14993/images/220524_14993_tweenlib-test-dom.png)

-   [DOMデモを別ウインドウで再生する](https://ics-creative.github.io/170216_tween_performance/dom/)
-   [ソースコードを確認する](https://github.com/ics-creative/170216_tween_performance/tree/main/dom)

検証の結果は次のグラフのとおりです。グラフの数値が高いほど同時実行性能（多数のオブジェクトを同時に動かしたときのパフォーマンス）が良いことを示します。4,000個の`div`要素を同時に動かしたときの実行フレームレートの値をスコアとしました。

![](https://ics.media/entry/14993/images/250827_14993_tweenlib-performance-dom.png)

GSAPはもっとも性能がよく、Tween.jsとAnime.jsが次点として続きました。Reactで採用が大きいMotion（旧Framer Motion）は結果が優れませんでした。なお、jQueryはブラウザがフリーズする結果となりました。DOM要素を同時に大量に動かす機会は少ないと思いますが、4,000個のDOM要素で結果に差がでる程度です。動かすDOMが数点程度のUI実装には大きなインパクトはないでしょう。

※GSAPの公式サイトでも[性能比較の検証ページ](https://gsap.com/js/speed.html)があります。本記事と比べてみるといいでしょう。

### ②WebGPUでの同時実行性能の比較

続いて、WebGPUで検証してみます。WebGPUとはWebGLの後継技術であり、**描画負荷が極めて低く、DOMよりもはるかに多くのオブジェクトを表示できます**。描画負荷が少なくなるため、アニメーションライブラリの計算負荷がDOM版の検証より顕著にあらわれるはずです。

![](https://ics.media/entry/14993/images/220524_14993_tweenlib-test-webgl.png)

-   [WebGPUデモを別ウインドウで再生する](https://ics-creative.github.io/170216_tween_performance/webgpu/)
-   [ソースコードを確認する](https://github.com/ics-creative/170216_tween_performance/tree/main/webgpu)

WebGPUでは次の結果となりました。この検証では、40,000ドットを同時に動かしたときの、実行フレームレートの値をスコアとしてます。

![](https://ics.media/entry/14993/images/250827_14993_tweenlib-performance-webgpu.png)

GSAPとAnime.jsのスコアが優れており、逆にMotionはWebGPU用途では性能的に厳しいことがわかりました。WebGPUは表現によっては大量のオブジェクトを扱う場面があるので、JavaScriptライブラリの実効性能は意識したほうがいいでしょう。

※WebGPUに対応していない技術（Web Animations API、CSS Animations、jQuery）は検証から除外してます。  
※WebGPUの制御には[PIXI.js v8](https://pixijs.com/)を利用しています。

### まとめ

今回は性能比較を中心として紹介しました。パフォーマンス観点ではGSAPやAnime.jsが優れていることが確認できました。しかし、ゲーム・プログラミングアート・ウェブサイトのインタラクションなど、用途によって適したアニメーションライブラリは異なるので、長所短所を見極めて利用するのがいいでしょう。

ICS MEDIAでは、今までもHTML関連の検証データとして「[描画系JSライブラリの性能比較](https://ics.media/entry/201/)」や「[スマホブラウザでのWebGL描画性能の検証](https://ics.media/entry/2372/)」を公開していました。今後も技術検証を続けていきますので、ICS MEDIAを引き続きチェックくださいませ。

※検証は[MacBook Pro M3 Max (2023)](https://support.apple.com/ja-jp/117737)で、macOS 15.6.1、Chrome 139を利用して検証しています。MacのディスプレイはProMotionテクノロジーによってChromeで最大120fpsがでます。  
※本記事は2017年に公開していましたが、2022年と2025年に再検証を実施し、内容を更新しています。2017年と2022年の検証結果はリポジトリのTagで確認できます。

※この記事が公開されたのは**8年前**ですが、**5か月前の2025年8月**に内容をメンテナンスしています。