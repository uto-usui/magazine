---
title: "次世代仕様のWebGPUとは？　次期macOSでのOpenGL非推奨化はWebGLに影響をもたらすのか"
source: "https://ics.media/entry/18412/"
publishedDate: "2018-06-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブの3Dグラフィックスを扱う新しい仕様として、WebGPUが提案されています。広く普及したWebGLがある中で、WebGPUとはどういった目的で生まれようとしているのでしょうか？　本記事ではWebGLとWebGPUの違いと、近況を紹介します。

### 業界を震撼させたAppleのOpenGL非推奨化

今月6月上旬に開催された[WWDC 18](https://developer.apple.com/wwdc/)で発表されたmacOS 10.14 MojaveとiOS 12のウェブページでは、OpenGL/OpenCLおよびOpenGL ESを非推奨化する旨が記載されています。macOS 10.14とiOS 12で**OpenGL等は引き続き動作するものの**、Metalへの置き換えを呼びかけています。

![](https://ics.media/entry/18412/images/180613_webgpu_mojave.png)

▲[What’s New in macOS](https://developer.apple.com/macos/whats-new/)にはOpenGLとOpenCL非推奨化について言及されている

![](https://ics.media/entry/18412/images/180613_webgpu_ios12.png)

▲[What’s New in iOS](https://developer.apple.com/macos/whats-new/)でもOpenGL ESの非推奨化について言及されている

Appleのサイトでは「OpenGLを使用するゲームやグラフィックスを多く使用するアプリケーションでは、今ではMetalを採用するはずです」と記載されていますが、実際のところ**OpenGLはスマホゲームや3D表現、映像ソフトなど幅広い範囲で現在も利用されています**。

ウェブの世界でも関係のない話題ではありません。**WebGLやFlash（Stage3D）はOpenGLがベースになっているため、影響を受ける可能性もあります**。

![だいたい](https://ics.media/entry/18412/images/170706_webgl2_overview.png)

▲記事「[サンプルで理解するWebGL 2.0](https://ics.media/entry/16060/)」より引用

そもそも、広く普及したOpenGLをなぜ非推奨化したのでしょうか。

### 台頭する新世代のグラフィックスAPI

OpenGLは1990年代前半に登場し、**オープンな標準仕様としてさまざまなプラットフォームで搭載されていきました**。iOSやAndroidの端末にもOpenGL ESが搭載されています。OpenGLはプラットフォーム間の移植性がしやすく、豊富な技術的ノウハウがあるため、アプリケーション開発者にとって採用しやすい選択肢の1つでもありました。ゲームエンジンや映像編集ソフトなど、エンジニアが意識していなくても下層でOpenGLが使われているといったこともよくあります。

10年前のAppleはmacOSの新機能にOpenGL対応であることを宣伝文句にしていた時期もありました。

そんなOpenGLですが、時代が進むにつれ次のようなデメリットも発生してきました。[Wikipedia](https://ja.wikipedia.org/wiki/Vulkan_\(API\))には次のようにデメリットが紹介されています。

-   OpenGLは高度にハードウェアが抽象化されていることから**性能上のオーバーヘッドが大きい**
-   OpenGL黎明期のハードウェア設計に由来する**互換性重視のAPI設計は徐々に陳腐化**
-   OpenGL 4に至る頃にはすでに最新のハードウェアとの乖離が発生
-   オーバーヘッドの増加による描画効率の低下はまた**電力効率の低下にも直結する**ため、モバイル機器など電力供給の限られるデバイスにおいても効率面での影響は無視できない

こういったデメリットの解消のため新しい世代のグラフィックスAPIが求められ、Appleの[Metal](https://developer.apple.com/metal/)（2014年〜）や、クロノスグループの[Vulkan](https://jp.khronos.org/vulkan/)（2015年〜）、マイクロソフトの[Direct3D 12](https://msdn.microsoft.com/ja-jp/library/windows/desktop/dn899228\(v=vs.85\))（2016年〜）が登場しています。

![](https://ics.media/entry/18412/images/180613_webgpu_vender.png)

ハードウェアに近い低レベルな制御を可能にしたり、新世代のアーキテクチャの採用など、似たようなコンセプトで設計されており、**オーバーヘッドの削減により一般にOpenGLよりも優れたパフォーマンスを提供できる**と言われています。

### 新グラフィックスAPIに対応するウェブ向けの仕様

WebGLはその名の通り、OpenGLをウェブで利用できるようにしたものです。WebGLを使ってMetalやVulkan、Direct3D 12を利用することはできません。そこで、Appleが提案してきたのがWebGPUです。2017年に立ち上がった[W3C Web Community Groupの憲章](https://gpuweb.github.io/admin/cg-charter.html)によるとWebGPUのAPIは次のようにあるべきだと記載されています。

-   現代のウェブプラットフォーム設計パターンにうまく対応するAPI
-   アプリケーションのパフォーマンスを向上させる低レベルのAPI
-   より現代的なAPIによって提供され、多くのデバイスで利用可能なGPUの計算機能を提供するAPI
-   最新の低レベルのグラフィックスAPIを持つすべてのプラットフォームで合理的に実装できるテクノロジ
-   JavaScriptとWebAssemblyの両方に効率的なバインディングを提供するために設計されたAPI

パフォーマンス向上と機械学習等で利用できる計算機能の提供が目新しい利点と言えそうです。

### WebGPUを試そう

WebGPUのコードはWebKitの実験ページにアクセスして試すことができます。

![](https://ics.media/entry/18412/images/180613_webgpu_website.png)

-   [WebGPU demos](https://webkit.org/demos/webgpu/)を開く

2018年現在最新の通常版Safari（macOSとiOSともに）にはすでにプロトタイプが実装されており、開発者メニューより有効にすることでWebGPUを試せます。

![](https://ics.media/entry/18412/images/180613_webgpu_safari_macos.png)

▲macOS SafariでWebGPUを設定にする方法。メニューバーより［開発］→［実験的な機能］→［WebGPU］を選択

![](https://ics.media/entry/18412/images/180613_webgpu_safari_ios.png)

▲iOS SafariでWebGPUを設定にする方法。設定アプリより［Safari］→［詳細］→［Experimental Features］→［WebGPU］を選択

Safariを有効にしたら、[WebGPU demos](https://webkit.org/demos/webgpu/)を試してください。このサイトでは次の4つのデモが公開されています。

![](https://ics.media/entry/18412/images/180613_webgpu_demo1.png)

▲定番の三角形の描画。3DでのHello Worldみたいなもの

▲2次元のシェーダー表現。CPU側からシェーダー側に時間経過の媒介変数を送っている

▲立方体の回転

![](https://ics.media/entry/18412/images/180611_webgpu_cubes.gif)

▲複数の立方体の回転

### 提案段階のWebGPUはMetalをマッピングしたもの

WebGPUとMetalのコードを比べてみましょう。次のコードは私が両環境で同じ実行結果が得られるように作成したものです。

![](https://ics.media/entry/18412/images/180613_webgpu_cocoa.png)

掲載しているのは一部分ですが、オリジナルのソースコードはGitHubに公開しています。**WebGPUのコードはJavaScriptとSwiftの言語的特徴を除けば、まったく同じであることに気づきます**。

![](https://ics.media/entry/18412/images/180613_webgpu_lang.png)

-   [JavaScript + WebGPUのコード](https://github.com/ics-creative/180611_WebGPU/tree/master/docs)
-   [Swift + Metalのコード](https://github.com/ics-creative/180611_WebGPU/tree/master/macos/HeavyMetalMac/HeavyMetalMac)

ともに両コードはMetalファイルを頂点・断片シェーダーとして使っています。これはまったく同じファイルを使ってます。

![](https://ics.media/entry/18412/images/180613_webgpu_shader.png)

WebGPUを提案したAppleが、自社の技術をプロトタイプとして提案したからだと思います。[WebKitチームのDeak Jacksonのツイート](https://x.com/grorgwork/status/829098943237615616)によると、「WebGPUは出発点のための私達の提案です。他のブラウザエンジンはそれぞれの提案があるでしょう」と述べています。

### WebGPUの今後の動向

今後の仕様策定がどのように進んでいくか気になるところです。W3C GPU for the Web Community Groupの状況はこちらで確認できます。

-   [gpuweb/gpuweb: Where the GPU on the Web work happens!](https://github.com/gpuweb/gpuweb)

### SafariのWebGLは継続して利用できる見込み

WebKitの開発チームのDean Jackson氏はTwitterでWebGLは継続して利用できるようにツイートしています。

日本語訳：  
OpenGLを非推奨にするというAppleの発表は、Safariを使ったWebGL開発には何の影響も与えません。下層は変わるかもしれませんが、WebGLは変わりません。

この主張が正しければ**WebGLは今後も安心して使い続けることができそうです**。一度標準になったものは、何年後も使い続けられるのが理想ですよね。そうでないと、我々の作っているウェブコンテンツは将来のブラウザで見ることができなくなってしまいます。記事「[あの日見たFlashの輝きは後世に伝わらない | ClockMaker Blog](http://clockmaker.jp/blog/2016/12/swf-forever/)」で紹介したように、WebGLを利用したコンテンツが再生されなくなると、それは失われた文明となるでしょう。

ただし、かつて標準仕様であったアプリケーションキャッシュAPIやECMAScript for XML（E4X）は今のブラウザでは使えなくなりました（人気がなく廃れた機能）。Web Workerの共有メモリは、[CPUのメルトダウン・スペクラー問題](https://cloud.watch.impress.co.jp/docs/special/1108439.html)の影響で利用できなくなりました（セキュリティーの問題）。かつて実質的標準だったFlash Playerも2020年には使えなくなります（Appleの強権と大衆煽動による市場奪取）。さまざまな事情と前例がある以上、テクノロジーはいずれ世代交代を強要させられる日がくるかもしれません。

### まとめ

OpenGLやWebGLの勉強を考えていたのにAppleの影響で将来が心配…。そんな心配はいりません。

WebGPUは各ブラウザにすぐには来ないですし、今後仕様が大きく変わる可能性もあります。根本的にはGPUの特性を理解するほうが大事で、WebGLを学ぶことがGPUの理解に繋がります。**OpenGL/WebGLのシェーダーを理解していれば、Metalのシェーダーもすぐに書けるようになるでしょう**。

WebGPUに関する記事は3部連載になっています。ぜひ続編もご覧ください。

1.  次世代仕様のWebGPUとは（いまココ）
2.  [WebGPUのコンピュートシェーダーで高速並列計算](https://ics.media/entry/18467/)
3.  [WebGPUの描画機能はWebGLと何が違うのか](https://ics.media/entry/18507/)

追記：2023年5月にはWebGPUが利用できるようになりました。

[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性 - ICS MEDIA](https://ics.media/entry/230426/)