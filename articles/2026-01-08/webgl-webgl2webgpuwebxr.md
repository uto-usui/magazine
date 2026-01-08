---
title: "最新WebGL通信 〜いまキャッチアップしたいWebGL2・WebGPU・WebXRとは〜"
source: "https://ics.media/entry/19657/"
publishedDate: "2019-01-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2019年1月10日 公開 / [株式会社ICS 川勝 研太郎](https://ics.media/entry/staff/kawakatsu/)

2011年に仕様が正式リリースされて以来、**WebGLは多くのブラウザベンダー、コンテンツ開発コミュニティの手によって普及してきました**。本記事では、2019年1月現在のWebGLの現状と周辺技術、そして未来について紹介します。

### 環境が完全に普及したWebGL 1.0

WebGLの最初のバージョンであるWebGL 1.0は、**現在ではデスクトップ、モバイルともにすべての主要なブラウザで対応**しています。対応環境という観点ではもはや**案件での採用も問題ない状況**といえるでしょう。実際のユーザーのWebGLサポート環境を集計する「WebGL Stats」によると、**デスクトップ、スマートフォンともに98%もの環境で動作**していることがわかります。

![WebGL 1.0を利用可能なブラウザ](https://ics.media/entry/19657/images/181227_webgl2018_webgl1-browser.png)▲WebGL 1.0を利用可能なブラウザについて。「[Can I use…](https://caniuse.com/webgl)」より

![WebGL 1.0のサポート環境](https://ics.media/entry/19657/images/181227_webgl2018_webgl1-support.png)▲WebGL 1.0のサポート環境について。「WebGL Stats」より

国内でも本格的な3Dグラフィックス表示の採用事例は増えており、弊社でも次のようなWebGLを採用したプロジェクトに携わっています。

[![CEDEC2018発表資料 「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説 Babylon.jsとBISHAMON WebGL版の合成](https://ics.media/entry/19657/images/180906_cedec_main-1.png)](https://ics.media/entry/18881/)

-   [CEDEC2018発表資料 「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説 Babylon.jsとBISHAMON WebGL版の合成](https://ics.media/entry/18881/)

### さらに広まるWebGL 2.0

#### WebGL 2.0とは

2017年にはWebGLの次のバージョンであるWebGL 2.0の仕様が正式リリースされました。WebGL 2.0は下記の図の通り、OpenGL ES 3.0を元にした、ブラウザ向けのコンピューターグラフィックスAPI仕様です。WebGL 1.0の機能に加えて、**表現力や処理速度の向上につながる機能が数多く含まれています**。

![WebGL 2.0の位置付け](https://ics.media/entry/19657/images/170706_webgl2_overview.png)▲WebGL 2.0の位置付け

ICS MEDIAでもWebGL 2.0の新しい機能についていくつか紹介しています。

[![サンプルで理解するWebGL 2.0 – ChromeとFirefoxが対応したWebGL 2.0の利点とは](https://ics.media/entry/19657/images/170706_webgl2_eyecatch.png)](https://ics.media/entry/16060/)

-   [サンプルで理解するWebGL 2.0 – ChromeとFirefoxが対応したWebGL 2.0の利点とは](https://ics.media/entry/16060/)

[![サンプルで理解するWebGL 2.0 – Multiple Render Targetsによる動的なライティング表現](https://ics.media/entry/19657/images/180202_webgl2_2_eyecatch-1.png)](https://ics.media/entry/17120/)

-   [サンプルで理解するWebGL 2.0 – Multiple Render Targetsによる動的なライティング表現](https://ics.media/entry/17120/)

[![サンプルで理解するWebGL 2.0 – Transform Feedbackによるパーティクル表現](https://ics.media/entry/19657/images/180202_webgl2_3_eyecatch-1.png)](https://ics.media/entry/17505/)

-   [サンプルで理解するWebGL 2.0 – Transform Feedbackによるパーティクル表現](https://ics.media/entry/17505/)

#### WebGL 2.0のサポート環境

WebGL 2.0は現在、デスクトップのChromeおよびFirefox、そしてモバイルではAndroidのChromeが対応しています。一見、サポート環境は全体の半分ほどですが、下記の通りEdgeとSafariを加えると、**ほとんどのプラットフォームで対応、あるいは対応が期待できる状況**になっています。

##### Edge

2018年12月にEdgeがChromiumをベースに採用することが発表されました。WindowsのデフォルトブラウザであるEdgeがWebGL 2.0に対応すれば、一般ユーザー層へもリーチできます。

##### Safari（macOS/iOS）

**Safariのベータ版である[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)（2018年8月の[Release 63](https://webkit.org/blog/8403/release-notes-for-safari-technology-preview-63/)より）でも、WebGL 2.0が使用できるようになりました**。2019年1月現在最新の[Release 73](https://webkit.org/blog/8555/release-notes-for-safari-technology-preview-73/)では、上記の記事で紹介しているGeometry Instancing（ジオメトリ・インスタンシング）とMultiple Render Targets（マルチプル・レンダー・ターゲッツ）が動作します。ベータ版では現在もWebGL 2.0の開発が進められているため、Safariのリリース版やiOS Safariに展開される日もそう遠い話ではないでしょう。

![WebGL 2.0を利用可能なブラウザ](https://ics.media/entry/19657/images/181227_webgl2018_webgl2-browser.png)▲WebGL 2.0を利用可能なブラウザについて。「[Can I use…](https://caniuse.com/webgl2)」より

実際のユーザーのWebGL 2.0のサポート環境はデスクトップで69%、スマートフォンでは48%、全体では52%の環境で動作しています。2018年1月には全体のサポート環境が39%だったので、順調に増えていることがわかります。

![WebGL 2.0のサポート環境](https://ics.media/entry/19657/images/181227_webgl2018_webgl2-support.png)▲WebGL 2.0のサポート環境について。「WebGL Stats」より

[Babylon.js](https://www.babylonjs.com/)、[PlayCanvas](https://playcanvas.com/)といったWebGLフレームワークではすでにWebGL 2.0をサポートしています。その機能を積極的に使っていきましょう。

▲WebGL 2.0の機能を使用したデモ「[After the Flood](https://playcanv.as/p/44MRmJRU/)」。PlayCanvasで作られている

※ [Three.js](https://threejs.org/)ではr100現在、WebGL 2.0の一部機能のみがサポートされており、上記で紹介しているような規模の大きな新機能については対応中のようです

### WebGLの関連技術

WebGLを使用したウェブの関連技術について紹介します。

#### WebXR

スマートフォン、VR HMD（ヘッドマウントディスプレイ）といったVR環境の普及に伴い、ウェブコンテンツにおいてもVR対応へのニーズが増えています。ウェブブラウザ向けには[WebVR API](https://immersive-web.github.io/webvr/spec/1.1/)が策定されており、これを使用することでブラウザでもVR体験が可能です。下記の記事ではThree.jsでブラウザ向けVR機能を簡単に実装する方法を紹介しています。

[![たった4行でできる！ ブラウザ向けVRをThree.jsで実装する方法](https://ics.media/entry/19657/images/180801_three_webvr_eyecatch.png)](https://ics.media/entry/18793/)

-   [たった4行でできる！ ブラウザ向けVRをThree.jsで実装する方法](https://ics.media/entry/18793/)

一方、Pokémon GOやAppleのiOS12で搭載された「計測」アプリ、[AR Quick Look](https://developer.apple.com/jp/arkit/gallery/)など、AR技術の進化についても話題になっています。ウェブにおけるAR機能は[WebXR Device API](https://immersive-web.github.io/webxr/)で策定が進められています。WebXR Device APIはVR、AR、MRを統合的に扱うAPIで、前述のWebVRもこのWebXR Device APIに統合されています。

WebVRもWebXRもデバイスの状態や入力、まわりの環境などを取得するためのAPIであり、描画機能そのものを司るわけではありません。**VR/AR空間に3Dオブジェクトを表示するためにはWebGLと組み合わせて使う必要があります**。

#### OffscreenCanvas

オフスクリーンキャンバスは、JavaScriptをマルチスレッドで実行できるWeb Workersを、Canvas要素に対しても使用できる機能です。**負荷の高い処理を別スレッドで実行することにより、メインスレッドの動作を阻害することなく実行できます**。Canvas要素を使用するWebGLでもこの機能の恩恵を受け、処理負荷の分散が可能になります。

オフスクリーンキャンバスは2018年9月にリリースされたChrome 69から標準で使用できます。詳しくは下記の記事で解説しています。

[![オフスクリーンキャンバスを使ったJSのマルチスレッド描画 – スムーズなユーザー操作実現の切り札](https://ics.media/entry/19657/images/180905_offscreencanvas_eyecatch.png)](https://ics.media/entry/19043/)

-   [オフスクリーンキャンバスを使ったJSのマルチスレッド描画 – スムーズなユーザー操作実現の切り札](https://ics.media/entry/19043/)

#### WebGPU

WebGPUは[W3C GPU for the Web Community Group](https://www.w3.org/community/gpu/)によって提案されている、**WebGLの次世代のウェブブラウザ用3DグラフィックスAPI**です。MicrosoftのDirect3D 12、AppleのMetal、Khronos GroupのVulkanといったモダンな3DグラフィックスAPIの設計をベースにし、より効率的にGPUハードウェアにアクセスできることを目的として現在策定が進められています。

まだ提案段階のため実用できるようになるまでは時間がかかりそうですが、この先の未来を見据えて、同じくウェブの3DグラフィックスAPIとして開発者はチェックしておくべき技術でしょう。

WebGPUのプロトタイプ提案（WebMetal）について、下記の記事で解説しています。

![次世代仕様のWebGPUとは？　次期macOSでのOpenGL非推奨化はWebGLに影響をもたらすのか](https://ics.media/entry/19657/images/180613_webgpu_eyecatch.jpg)

-   [次世代仕様のWebGPUとは？　次期macOSでのOpenGL非推奨化はWebGLに影響をもたらすのか](https://ics.media/entry/18412/)

![次世代のWebGPUの可能性 – コンピュートシェーダーで高速並列計算](https://ics.media/entry/19657/images/180619_WebGPU_ComputeShader_eyecatch.png)

-   [次世代のWebGPUの可能性 – コンピュートシェーダーで高速並列計算](https://ics.media/entry/18467/)

![次世代のWebGPUの可能性 – WebGLと比較して理解する描画機能の違い](https://ics.media/entry/19657/images/180626_WebGPU_Demo_eyecatch.png)

-   [次世代のWebGPUの可能性 – WebGLと比較して理解する描画機能の違い](https://ics.media/entry/18507/)

追記： 2023年4月にWebGPUがChrome 113で搭載されました。詳細は記事『[WebGPUがついに利用可能に - WebGL以上の高速な描画と、計算処理への可能性](https://ics.media/entry/230426/)』をご覧ください。

### WebGLの未来の機能

WebGLの新しい機能の提案、開発は現在も続いています。予定されている機能の中から筆者が楽しみにしているものを紹介します。

#### Compute shader

2018年6月にChromiumのフォーラムで、WebGLでコンピュートシェーダーを実現する拡張機能、「WebGL 2.0 Compute」の開発がアナウンスされました。

-   [Intent to Implement: WebGL 2.0 Compute - Google グループ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bPD47wqY-r8/5DzgvEwFBAAJ)

コンピュートシェーダーは従来WebGLにあった描画用のシェーダー（頂点シェーダーとフラグメントシェーダー）とは異なる、第三のシェーダーです。もともと画面の描画用に作られたGPUを、描画以外の計算に使用することを「GPGPU（ジーピージーピーユー）」と呼び、現在、物理シミュレーションや機械学習、暗号通貨の発掘などさまざまな計算用途に使用されています。この**GPGPUをWebGLでも実現できるのがコンピュートシェーダー**です。コンピュートシェーダーについて、詳しくは下記の記事で解説しています。

-   [次世代のWebGPUの可能性 – コンピュートシェーダーで高速並列計算](https://ics.media/entry/18467/)

上記の記事にもありますが、macOSとiOSのOpenGL/ESはコンピュートシェーダーに対応していません。そのため、内部でOpenGL/ESを使用しているWebGLでもコンピュートシェーダーは使用できず、残念ながら対応予定外となっています。macOS/iOSでのコンピュートシェーダーの使用はWebGPUを待つことになります。

WebGLのコンピュートシェーダーは2019年1月現在も開発中で、Chromeのデベロッパー向けビルド版である[Chrome Canary](https://www.google.com/intl/ja_ALL/chrome/canary/)で、Windowsの一部の環境でのみ動作します。詳しくは下記の記事を参照ください。

[![WebGLのCompute shaderを試してみた – Qiita](https://ics.media/entry/19657/images/181227_webgl2018_compute.gif)](https://qiita.com/9ballsyndrome/items/7bae4f4cec8d26692d29)

-   [WebGLのCompute shaderを試してみた – Qiita](https://qiita.com/9ballsyndrome/items/7bae4f4cec8d26692d29)

#### WEBGL\_multiview Extension

WEBGL\_multiview拡張は、**複数のビューに対する描画を1度の描画命令（ドローコール）で実行できる機能**です。頂点シェーダーで、描画するビューによって処理を分岐し、パラメーターを変えることでビューごとに異なる描画を実現します。GPUの負荷は変わりませんが、CPUのドローコールの負荷を軽減できます。

VRでは左目用と右目用、2つの視点から見たシーンを並べてディスプレイに描画します。このとき、左右で微妙に違う見た目のために単純に2倍の描画を行うため、普通の3Dグラフィックス表示より負荷がかかります。さらにVRでは60FPSよりも高いフレームレートを求められることが多いため、パフォーマンスの制約はさらにシビアになります。**WEBGL\_multiviewを使えば、左目用と右目用の描画を1度のドローコールで実行できるため、CPUのドローコールの負荷を半減できます**。

![VRのディスプレイへの描画](https://ics.media/entry/19657/images/181227_webgl2018_webvr.png)▲VRのディスプレイへの描画

### おわりに

2019年1月現在、WebGLをとりまく状況についてまとめました。**対応環境が増え、機能が増え、VRなどの新しい体験が加わり、WebGLによるウェブ表現は目覚ましく発展しています**。ぜひ積極的に取り入れて、リッチなウェブ体験を提供しましょう。

今年もICS MEDIAではWebGLに関する最新機能や活用方法について紹介します。