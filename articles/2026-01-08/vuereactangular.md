---
title: "Vue・React・Angularのパフォーマンス比較検証"
source: "https://ics.media/entry/190731/"
publishedDate: "2019-07-31"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2019年7月31日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

ウェブのフロントエンド開発に役立つライブラリとして、VueとReact、Angularがよく取り上げられます。これらのライブラリは、SPA（シングルページアプリケーション）の開発に役立つ多くの機能を持っています。

フレームワークを選定するには、「**人気だから使う**」という短絡的な理由で選択をするのは望ましくありません。設計思想や機能の種類、学習コストなどの観点で、プロダクト・プロジェクトチームへの適性を検討するのがセオリーです。幸いにも、それぞれを比較した記事がウェブに数多くあり、選定のヒントを簡単に得ることができます。

一方、機能面の比較ばかりが取り上げられ、性能面で紹介されている記事が少ないように見受けられます。記事『[サービスにおいて速さこそが神である｜深津 貴之](https://note.mu/fladdict/n/n6a96cd4abeeb)』でも紹介されているように、**昨今のウェブはスピードが求められる時代**でもあり、ライブラリの性能評価の記事があってもよいのではないでしょうか。

本記事では、**VueとReact、Angularの性能評価を実施し記事にまとめました**。ライブラリを使わない実装方法（Vanilla JS）も用意することで、ライブラリを使うことのオーバーヘッドも考慮できるように配慮しています。

### 検証デモの紹介

ウェブページ内のSVG要素に大量のオブジェクトを配置することで、負荷テストを行うことにしました。起動までの時間と、3000個の要素を配置したときの負荷を調べています。デモの右上のスライダーによってSVG要素の個数を変化させることで、負荷を増大できます。

-   [Angular](https://ics-creative.github.io/160916_performance_js_framework/angular-svg/dist/angular-performance-svg/index.html)
-   [React](https://ics-creative.github.io/160916_performance_js_framework/react-svg/build/index.html)
-   [Vue](https://ics-creative.github.io/160916_performance_js_framework/vue-svg/dist/index.html)
-   [Vanilla JS](https://ics-creative.github.io/160916_performance_js_framework/vanillajs-svg)

ソースコードはGitHubにてMITライセンスとして公開しています。結果に異論のある方はお手元で試してください。

-   [ソースコード](https://github.com/ics-creative/160916_performance_js_framework)

パーティクルの表現を試しているように見えますが、この検証は仮想DOMの計算と実DOMへの反映性能を意図したものとなります（`svg`要素ではなく`table>tr`要素と置き換えても検証は成立します）。記事「[スマホブラウザのWebGL描画性能検証](https://ics.media/entry/2372/)」で実施したような、WebGL等の性能評価とは異なることはご了承ください。

### フレームレートの比較（滑らかに表示できるか）

3000個のSVG要素を表示したときの、フレームレートを比較しました。フレームレートの上限は60fpsで、数値は高いほどパフォーマンスが良好であることを示します。

![](https://ics.media/entry/190731/images/190731_js_fps.png)

![](https://ics.media/entry/190731/images/190731_jsgraff_fps.png)

AngularとReactがほぼ同等の結果ですが、**Vueは明らかにフレームレートの値が劣っています**。目視で観察しても他のライブラリに比べて動作がもっさりしていました。

Vanilla JSとAngularの差は少ないので、ライブラリによるオーバーヘッドは少ないとみて良いでしょう。AngularとReactとVanilla JSの負荷になっているのはSVGの描画処理であると言えそうです。

詳細はTwitterで考察したので参考ください。

### メモリ使用量（実行時の安定性）

3000個のSVGを動かしたときの性能を比較しました。ウェブページを開き、3000個に設定したあと開始一分後のメモリ使用量をGoogle ChromeのタスクマネージャでJavaScriptメモリを観察しています。

![](https://ics.media/entry/190731/images/190731_js_memory.png)

![](https://ics.media/entry/190731/images/190731_jsgraff_memory.png)

Vanilla JSがメモリ使用量では有利でした。ReactとAngularに比べると、**Vueが3倍ほどのメモリ使用量**となっています。なお、タスクマネージャーにはCPU使用率がレポートされていますが、**それぞれのCPU使用率には大きな差はありません**。

### ライブラリの容量（素早く読み込めるか）

ライブラリの容量を比較しました。転送容量が大きいと、スマートフォンなど通信帯域の狭い環境でページの読み込み時間に影響します。

![](https://ics.media/entry/190731/images/190731_js_transfer.png)

![](https://ics.media/entry/190731/images/190731_jsgraff_transfer.png)

結果としては、Angularが他のライブラリよりも重たいことがわかりました。Angular 8のIvyとAoTでビルドしているのですが、それでもVueやReactに比べると容量が膨らむようです。

ただし、**gzip配信が効くと30〜35KB程度しか容量の違いはありません**。よほど最適化したい場面を除いて、ライブラリの容量は過度に心配しなくて良いでしょう。

Angularはビルトインで多くの機能を持っているため、どうしてもライブラリの基盤部分で容量が膨らみます。VueやReactは基本機能が少なめで、**ライブラリを足しながら使う場面が多いので、プロダクトレベルだと容量の差は縮まることでしょう**。

### ライブラリの起動時間（素早く起動できるか）

JavaScriptファイルは大きくなると、Evaluate Scriptなど初回実行に時間を要します。

CPUの貧弱な環境をシミュレーションするために、Chrome DevToolsの機能を用いてCPUの性能を6分の1に下げて検証しました。計測方法として、HTMLページの解析完了時から、2度目のループ発生後（Animation Frame Fired）までの時間をとりました。

![](https://ics.media/entry/190731/images/190731_js_launch.png)

![](https://ics.media/entry/190731/images/190731_jsgraff_launch.png)

※3回試行の平均値

結果としてはVanilla JSがもっとも高速ではあるものの、Reactがライブラリの中では最速で、Angularが時間を要しています。性能が低い端末での実行においてはVanilla JSがもっとも効果的ではあるものの、JSライブラリとしてはReactが有利だと言えそうです。

より素早くウェブページを表示する、FMP（ファースト・ミーニングフル・ペイント）まで高速化する必要性がフロントエンドエンジニアの界隈では高まっています。次世代の[Angular Ivy](https://logmi.jp/tech/articles/302246)や[Vue.js 3](https://www.infoq.com/jp/news/2019/03/vue-3-preview/)では**ライブラリのサイズ縮小（Tree Shakingが効くようにする）や実行性能向上へ開発の方向性が向いており**、ライブラリの性能を示す指標として、起動時間は無視すべきものではありません。

### まとめ

以上の検証結果をまとめると次のことが言えます。

-   Reactが性能面で総合的に有利
-   Angularは起動に不利だが、実行性能（フレームレート）は良好
-   Vueは大量にコンポーネントを配置するような場面においては不利

今回の検証のように大量のオブジェクトをリアルタイムで描画更新するようなケースは、ReactやAngularではほとんどありません。フレームレートとメモリ使用量については、極限の状態においての負荷を検証したので、**小規模なプロダクトにおいて負荷が問題になる場面が少ないことは補足しておきます**。

**ライブラリの特性を知ったうえで技術選定をすることはリスクの早期発見につながるはずです**。本記事が技術選定の一助になれば幸いです。

ICS MEDIAでは以前よりパフォーマンスの性能比較は繰り返しおこなってきました。次の記事もウェブ技術の評価をしていますので、あわせてご覧ください。

-   [2D描画JavaScriptライブラリの描画性能比較](https://ics.media/entry/201/)
-   [HTML5 CanvasとCSS3の描画性能比較](https://ics.media/entry/306/)
-   [JSアニメーションライブラリの性能比較](https://ics.media/entry/14993/)
-   [スマホでのWebGL描画性能検証](https://ics.media/entry/2372/)
-   [次世代のWebGPUとWebGLの描画性能比較](https://ics.media/entry/18507/)
-   [iOSにおけるSwift/Unity/PhoneGap/Adobe AIRの描画性能比較](https://ics.media/entry/6137/)
-   [ECMAScript 2015+の構文でのJSの実行性能検証](https://ics.media/entry/17247/)

### 付録：検証環境の詳細

検証に用いたライブラリのバージョンは以下の通りです。

-   Angular 8.1.2 (Ivyを有効化、AoTコンパイルを利用)
-   React 16.8.6
-   Vue: 2.6.10

測定に用いた検証マシンとブラウザは以下の通りです。

-   MacBook Pro (13-inch, 2017)
-   CPU: 3.5 GHz Intel Core i7
-   メモリ: 16 GB 2133 MHz LPDDR3
-   グラフィックス: Intel Iris Plus Graphics 650 1536 MB
-   Google Chrome 75.0.3770.142（拡張機能をすべてオフにして、シークレットウインドウで検証）
-   電源コードに接続し、他のアプリケーションの起動がない状態で検証