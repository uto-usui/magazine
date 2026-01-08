---
title: "HTML CanvasとWebGLの使い分け―CreateJS勉強会/池田発表資料 （前編）"
source: "https://ics.media/entry/5140/"
publishedDate: "2015-02-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2015年2月10日（火）、アドビシステムズ株式会社で[CreateJS勉強会 (第5回)](https://www.facebook.com/icswebjp/posts/1569177426660602/)が開催され30名を超える方々が来場されました。勉強会のフォローアップとして、発表資料「CreateJSで制作するスペシャルコンテンツ」のスライドをブログ記事という形で公開します。本記事では口頭で発表した内容もできる限り記載しました。

なお、前編（CanvasとWebGLの比較）と[後編(WebGLの最適化)](https://ics.media/entry/5221/)の二部構成にしています。前編となる本記事では**スペシャルコンテンツ制作にあたり調査したHTML CanvasとWebGLの双方の利点・欠点をまとめています**。

### HTML CanvasとWebGL

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.003.jpg)

今回のテーマは「HTML CanvasとWebGLの使い分け」です。皆さんもご存知の通り、HTML5のCanvas要素 (JavaScript では[CanvasRenderingContext2D](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D)オブジェクト）は従来Flashで制作してきたようなコンテンツの作成を可能にしました。

一方でWebGLはGPUを利用するWebの標準技術でリッチなグラフィカル表現を可能とします。**よく勘違いされているのはWebGL=3D表現という認識**です。WebGLが一番効果的に使える場面は3D表現であることは間違いはありませんが、必ずしもWebGLは3D表現だけに利用されているとは限ず、**WebGLは2D表現にも利用できます**。本記事ではWebGLの2D表現について言及しています。

WebGLは2014年にブラウザシェアが今後拡大するであろうInternet Explorer 11やiOS 8 Safariで公式にサポートされたことや、スマートフォンでも非常に高いパフォーマンスで実行できることから、今後のWebGL採用の拡大が予想できます（参照：[iOS8向けにWebGLのHTML5デモを作ってみた - ICS MEDIA](https://ics.media/entry/2328/))。次の図板はブラウザのサポート状況を示す[Can I use…](https://caniuse.com/webgl)というサイトのものですが、2015年2月現在WebGLは幅広く使える状態が整ったと言えるでしょう。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.004.jpg)

### HTML CanvasとWebGLのハイブリッドコンテンツ

さて、今回はこれらの技術を使ったスペシャルコンテンツのモックを用意してきました。「Shared Drawing(Beta)」と名付けられた次のコンテンツの動画をご覧ください（勉強会ではURLを公開し来場者の方々に参加してもらいました）。複数のユーザーが同時接続することができ、1つのキャンバスを共有しあうことができます。カラフルな背景に滑らかなラインを描きます。

このコンテンツの制作にあたっては次の技術を利用しました。図板の左側はクライアントサイドの、右側はサーバーサイドのテクノロジーとなります。複数人の同時アクセスの処理に関しては興味を持たれる方も多いかと思いますが、これに関しては当サイトの記事「[Node.jsとSocket.IOによるPCとスマホブラウザのペアリングデモ](https://ics.media/entry/4320/)」で詳しく実装方法を説明していますので、そちらを参照ください。今回の本題としては**クライアントサイドにおけるHTML Canvas(Context2D)とWebGLの部分**となります。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.006.jpg)

**HTML Canvasの開発では、生産効率を考慮するとJSライブラリを利用するのが一般的**です。このサイトではHTML Canvas(Context2D)については「[CreateJS](https://createjs.com/Home?utm_source=html5weekly&utm_medium=email)(EaselJS)」を、WebGLについては「[Pixi.js](https://pixijs.com/)」を採用しています。

※EaselJSライブラリはCreateJSライブラリスイートの1つです。本記事では以降EaselJSをCreateJSを記載します。

### 開発の経緯と技術検証

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.008.jpg)

そもそもの開発の経緯を話します。コンテンツ制作にあたり当初、私はすべてCreateJSで制作するつもりでいました。記事「[CreateJSがWebGLを公式にサポート！爆速になったHTML5での描画パフォーマンスを検証してみた](https://ics.media/entry/1291/)」で紹介したこともありますが、CreateJSでもWebGLを利用することができ、従来方式（Context2D）よりも遥かに高いパフォーマンスが得られることがわかっていました。CreateJS公式サイトのブログによれば**WebGLを使うことで6〜51倍のパフォーマンスが得られると紹介されています**し、弊社での検証においてもそれを裏付ける結果が得られています。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.010.jpg)

CreateJSでWebGLを利用するには、専用のSpriteStageクラスを使う必要があります（参照「[WebGL & EaselJS: a Technical Intro](https://blog.createjs.com/webgl-easeljs-a-technical-intro/)」)。従来存在するStageクラスと新しく用意されたSpriteStageクラスの2つがあり、どちらを使うかは開発時に選択できます。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.012.jpg)

**高いパフォーマンスが得られるというSpriteStageクラスですが、機能面の不足が目立ちました**。「グラフィック描画」「ブレンドモード」「マスク」の機能がなく、目指していた表現を作るための必要条件を満たしていなかったのです。とくにブレンドモードが使えないことは致命的で、WebGL利用によって私の大好きで得意とする「加算合成」がもっともパフォーマンス向上の恩恵が得られると期待していただけに残念に思いました。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.013.jpg)

そこで[Pixi.js](https://pixijs.com/)という別のJSライブラリを検討することにしました。**Pixi.jsはWebGLでの2D表現を作りやすくするJSライブラリ**です。以前に記事「[最速の描画JavaScriptライブラリは!? パフォーマンスの検証](https://ics.media/entry/201/)」で検証したときにCreateJS以上のスコアを得られていたことから、CreateJSに次ぐ有力な選択肢として考えていたのです。CreateJSと同様に**Pixi.jsはFlashライクなAPIを持ちあわせており学習コストが低いことも魅力**でした。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.015.jpg)

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.016.jpg)

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.017.jpg)

機能面でも検証してみました。上図は「Pixi.js(WebGL)」「CreateJSのSpriteStage(WebGL)」「CreateJSのStage(HTML Canvas)」の3つの機能を比較しまとめたものです。HTML Canvasを使うCreateJSのStageクラスがもっとも機能を有していますが、Pixi.js(WebGL)も比較的APIが充実していることが分かりました。図版で「△」としているのには理由がありますが、それは後述で説明します。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.018.jpg)

いくつか比較検討のデモを制作してみました。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.019.jpg)

-   [CreateJS(HTML Canvas)版パーティクルデモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/1_particles_createjs/index.html)
-   [Pixi.js(WebGL)版パーティクルデモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/2_particles_pixijs/index.html)

次にパーティクル表現について試してみました。マウスの位置から無数のパーティクルが発生するシンプルな検証デモとなっていて、画面左上に現在発生しているパーティクルの個数が表示されます。CreateJS製（HTML Canvas版）は2000個ほどで動作がもっさりしているのに対して、Pixi.js製（WebGL版）は3000個以上のパーティクルを表示しても滑らかに動作しています。この検証まではPixi.js（WebGL版）のほうがパフォーマンスが高い結果となり想定通りでした。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.020.jpg)

-   [CreateJS(HTML Canvas)版ドローイングデモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/3_lines_createjs/index.html)
-   [Pixi.js(WebGL)版ドローイングデモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/4_lines_pixijs/index.html)

グラフィック描画について試してみたところ異なる結果がでました。これは描画パフォーマンスよりもどれだけ綺麗な曲線が描けるか機能面で比較したものです。CreateJS製（HTML Canvas版）は滑らかな曲線を描けていますが、Pixi.js（WebGL版）はカクカクな線が表示されています。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.021.jpg)

**CreateJSではAPIとして曲線を描くことができ、またマウスの軌跡から滑らかな曲線にコンバートするための方法が確立されています**。このCreateJS勉強会で登壇された野中さんの記事（「[EaselJSで連続した座標の軌跡を描く - HTML5 : テクニカルノート](http://www.fumiononaka.com/Business/html5/FN1307003.html)」)でも紹介されています。対して**WebGLでは基本的には直線のワイヤーフレームしか描くことができない**ため、曲線の描画については機能としてWebGLはHTML Canvasに比べて難しいと言えます。

ただ難しいと言っても実装する方法は他にもあります。たとえば頂点を再分割して滑らかにする方法が考えられますが、試したところ頂点数増加に伴い描くべき直線の数が増加しパフォーマンスが低下しました。CreateJS（HTML Canvas版）で十分な精度の曲線を描けたので、Pixi.js（WebGL版）での代替手段の検討はこれ以上深追いしないことにしました。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.022.jpg)

-   [CreateJS(HTML Canvas)版 残像効果デモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/5_createjs_fadeout/index.html)
-   [CreateJS(HTML Canvas)版 描画結果のキープデモ](https://ics-creative.github.io/data-demos/150210_createjs_seminer/6_createjs_noautoclear/index.html)

またHTML Canvas(Context2D)には描画結果の再利用に長けているという利点があります。上図のデモは毎フレーム、直前の画面を少しずつ薄くすることで残像効果を創りだしたものです。FlashのBitmapDataクラスを利用した手法に似ていますので懐かしく思う方もいるでしょう（参照：[Category : Particle - Beautifl](https://beautifl.net/category/particle/))。WebGLでこれを実現しようとすると、1つの方法として描画結果のフィードバックを有効にする必要があるのですが、それをしてしまうと著しくパフォーマンスが低下します。それであれば、HTML Canvas(Context2D)を利用するほうが残像効果として有効だと判断しました。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.023.jpg)

これらの検証から、**パーティクル表現にはPixi.js(WebGL)が向いており、グラフィック描画にはCreateJS(HTML Canvas)が向いている**とわかり、これらをハイブリッドで制作することを決めました。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.024.jpg)

CreateJSとPixi.jsのハイブリッドを実現するためのコードを簡単に紹介します。どちらのJSライブラリも開発者側からすると似たAPIを有しているため、同じようなコードを使って初期化しています。

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.025.jpg)

![CreateJS勉強会(第5回)発表資料](https://ics.media/entry/5140/images/150207_createjs.026.jpg)

CreateJS(Context2D)とPixi.js(WebGL)もどちらもcanvasタグを使います。ハイブリッドを実現するためにはcanvas要素をCSSのプロパティ「position:absolute;」を使って絶対座標として同一の座標に重ねて設置します。canvas要素は背景を設定しない限り透過するので、複数のcanvasをレイヤーに見たせて重ねあわせることができます。

![](https://ics.media/entry/5140/images/150213_createjs_02.jpg)

前半のHTML5とWebGLの使い分けは以上です。**それぞれのAPIには得意・不得意があるので、その違いを検証を通して見極めていいとこ取りをした**ということが要点となります。ここまでの説明が皆さんの技術選択の参考になれば幸いです。

記事は[後編(WebGLの最適化)](https://ics.media/entry/5221/)に続きます。CreateJSの基礎を学びたい方は[当サイト内のチュートリアル](https://ics.media/tutorial-createjs/)をご覧ください。

### CreateJS勉強会（第5回）の関連記事

-   HTML CanvasとWebGLの使い分け : 池田発表資料 （前編）
-   [WebGLのドローコール最適化手法 : 池田発表資料(後編)](https://ics.media/entry/5221/)
-   [PreloadJSで「悩ませないローディング」の作り方](https://ics.media/entry/5239/)
-   [新CreateJSをコンテンツ制作に活かす | 新しいCreateJSで書くコードはどう変わるのか : 野中氏発表資料](http://fumiononaka.com/samples/CreateJS/CreateJS_150210.html)