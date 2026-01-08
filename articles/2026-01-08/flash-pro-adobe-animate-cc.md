---
title: "Flash Proが改名し大幅機能強化！ ユーザー視点で新生Adobe Animate CCを徹底レポート"
source: "https://ics.media/entry/10897/"
publishedDate: "2016-02-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2016年2月9日（火）、アドビシステムズより「Flash Professional CC (通称：Flash Pro CC)」が名称を変更し「[Animate CC](https://www.adobe.com/jp/products/animate.html)」としてリリースされました。2ヶ月前の記事「[Flashが終わったと勘違いをする前に知っておきたい8つのこと](https://ics.media/entry/10181/)」で紹介したとおり、ソフトの改名は業界が震撼した大ニュースだったわけですが、今回のアップデートはどのようなものだったのでしょうか？

新生Animate CCでは名前が変わっただけではなく、**数多くの機能の充実が図られています**。アニメーション制作ツールとして完成度の向上、Creative Cloudアプリケーションとしての連携、HTML5への対応強化が主軸となっています。ソフトがどのように進化したのか確認していきましょう。

### そもそも、Adobe Animate CCとはどんなソフトか？

**Webのアニメーションやインタラクションを実装できる制作ソフト**です。ベクターデータであるため小さなデータ量でWebに公開できたり、スクリプトも使えるためインタラクションも実装できます。用途に応じた柔軟な使い方が可能で、10数年間、数多くのサイトで利用されてきました。

**現在はFlashだけではなく、HTML5の複数のテクノロジーにも対応**。Webのさまざまなアニメーションフォーマットに書き出せる総合的なツールとして利用されています。

### グラフィック/アニメーション機能が強化

#### 新しいベクターアートブラシを搭載

「ブラシライブラリ」パネルが搭載され、ベクターブラシの選択肢が格段に増えました。プリセットだけでなく、線のパスや太さなどが再編集可能です。イラストの制作とアニメーション実装を同一のソフトウェアでできるのがAnimate CCの利点ですが、ベクターブラシの充実によりイラスト制作がさらに効率化するでしょう。

後述のCreative Cloudライブラリとの連携により、モバイルアプリの[Adobe Capture CC](https://www.adobe.com/jp/products/capture.html)で撮影したブラシを取り込めます。

![](https://ics.media/entry/10897/images/160209-vector-art-brush.png)

出典「[ベクターアートを作成 | Adobe Animate CC tutorials](https://helpx.adobe.com/jp/animate/how-to/vector-pattern-brush-animation.html)」より。シェイプトゥイーンと連携させるとおもしろい表現ができます。

#### 4K動画書き出しのサポート

Animate CCのタイムラインはベクターデータなので、拡大に最適。**4K動画へアップスケールしても画質が劣化することはありません**。従来はステージサイズでのみ動画ファイルを書き出せましたが、今回のバージョンから書き出しサイズが設定可能になっています。

![](https://ics.media/entry/10897/images/160209-timeline-video.png)

#### オニオンスキンがカラーリングされるように

タイムラインの機能強化として、オニオンスキンのカラー表示が可能に。未来のフレームは緑、過去のフレームは青で表示されます。時間軸の前後関係がわかりやすくなり、アニメーション制作に役立ちます。

![オニオンスキンがカラーリングされるように](https://ics.media/entry/10897/images/160209-timeline-onion-skin.png)

#### ステージの回転機能

ステージを回転させ、作業しやすい角度に変更可能に。アニメーション制作のときに好きな角度で絵を描いたり、アニメーション実装するときに役立つでしょう。機種によっては2本指での回転操作にも対応しています。

![ステージの回転機能](https://ics.media/entry/10897/images/160209-timeline-rotate.png)

### HTML5の機能強化

Animate CCで制作したアニメーションは、さまざまなテクノロジーに出力できます。HTML5 CanvasやWebGL、SWFはデフォルトで書き出せ、無料のアドオンをインストールすることでSVGやUnityやCocos2d-xにも書き出せます。その中でもとくにユーザーから注目されているのがHTML5の書き出し。アドビの発表によると、従来のFlash Pro CCで作られるコンテンツの3割はHTML5 Canvasドキュメントが選択されているとのこと。

![](https://ics.media/entry/10897/images/160209-multi-platform.png)

#### HTML5 Canvasドキュメントでのテキストのレンダリング

HTML5 Canvasドキュメントのテキストがシェイプとして出力可能に。どの環境でも確実に見え方を保持できるようになります。

従来のHTML5 Canvasドキュメントではテキストはデバイスフォントとして書き出されていました。デバイスフォントの場合は再生環境にインストールされているフォントに依存するため、再生環境によってはフォントを表示できません。今回の機能改善により、フォントはベクターグラフィックに変換され出力されるため、いずれの環境でも同一のテキスト表示が可能になります。

#### TypekitのHTML5 Canvasドキュメントとの統合

HTML5 Canvasドキュメントでダイナミックテキストを選択した際、TypekitのWebフォントが利用可能に。Webフォントなのでどの環境でも同じような見栄えを保証できます。

![TypekitのHTML5 Canvasドキュメントとの統合](https://ics.media/entry/10897/images/160209-createjs-3.png)

#### HTML5 Canvas出力時のスプライトシート書き出しの強化

HTML5 Canvasのアニメーションの画像はスプライトシート（CSSスプライトのようなもの）として管理されています。今回のアップデートではスプライトシート書き出しの設定が従来も細かく設定可能に。

![HTML5 Canvas出力時のスプライトシート書き出しの強化](https://ics.media/entry/10897/images/160209-createjs-2.png)

#### HTML5 Canvasテンプレート

テンプレート用のHTMLファイルを自分で設定可能に。広告フォーマットの配布などを想定しているそうです。

![](https://ics.media/entry/10897/images/160209-createjs-1.png)

#### CreateJSライブラリを統合

HTML5 CanvasドキュメントのエンジンにはJavaScriptフレームワークの「[CreateJS](https://createjs.com/)」が使われています。今まではJSファイルが複数に別れて出力されていましたが、まとまって1つのJSファイルとして出力されるようになりました。1ファイルにまとまっていたほうが、サーバーへのリクエストが少なくなりページ表示までの時間がわずかに短くなります。

![HTML5 Canvasテンプレート](https://ics.media/entry/10897/images/160209-createjs-code.png)

### ソフトウェアとしての進化

#### Creative Cloudライブラリ

モバイルアプリやストックフォト、デスクトップツールの連携が可能なCreativeSyncを活用したワークフローを採用。すでにPhotoshop CCやIllustrator CCでは搭載されていましたが、Aniamte CCにも同等の「CC Libraries」パネルが搭載されました。Adobe Capture CCで作成したカラーテーマやブラシなど、モバイルアプリで用意した素材が活用できるでしょう。

![Creative Cloudライブラリ](https://ics.media/entry/10897/images/160209-creative-sync.png)

出典「[Creative Cloud ヘルプ | Creative Cloud Libraries](https://helpx.adobe.com/jp/creative-cloud/help/libraries.html)」

#### 色見本にタグが追加

\[色見本\]パネルというのはコンテンツのキーカラーを保存できるパネルのことです。\[色見本\]パネルに登録したカラーにタグをつけることことで、カラーの使われている部分が構造的にわかりやすくなります。登録したスウォッチカラーは色を編集すると、ドキュメント内でその色が使われている箇所が一斉に変更可能に。

![色見本(スウォッチ)にタグが追加](https://ics.media/entry/10897/images/160209-color-swatch.png)

### Flash機能の強化

-   **Flash Player 20 / Adobe AIR 20の対応**  
    Animate CCへの改名によって、勘違いされがちなのがFlashランタイムのこと。**アドビは「SWF」や「Adobe AIR」のサポート打ち切りを意味しないと明言**しています。今回のAnimate CCでは、Flash関連の機能として最新バージョンの書き出しに対応。
-   **プロジェクターの出力**  
    プロジェクターとは、インストール不要のスタンドアロンのFlashコンテンツ・アプリケーションのこと。インスタレーションなどの分野では、手軽に起動できるため一部の用途で役立っていました。2013年のFlash Pro CCの大改修のときにドロップした機能でしたが、復活。

### その他の改善点

-   **SVGの読み込みサポート**  
    SVGファイルの読み込みもサポートされました。Animate CCはベクターデータでアニメーションを作るソフトなので、これは当然欲しかった機能です。
-   **JSFLのAPIの変更**  
    従来は`fl`もしくは`flash`オブジェクトにあったAPIが`an`や`animate`オブジェクトに展開されました。従来の`fl`もしくは`flash`オブジェクトは引き続き利用できます。
-   **OAM パブリッシュのサポート**  
    AS3、WebGLおよびHTML5 CanvasドキュメントでのOAMパブリッシュのサポートされました。Animate CCで作ったコンテンツをInDesignやMuse、Dreamweaverへ取り込むのに役立ちます。

### まとめ

Flash Professional CCの進化を追ってきた筆者としては、今回のアップデートは名前が変わったわりにマイナーアップデートが多いという印象を持ちました。はじめのスプラッシュ画面やアイコンを除けば**従来のFlash Pro CCと見た目はまったく変わりません**。Animate CCはあくまでもFlash Professional CCの名前を変えただけ・・・、普段からFlash Proを使っているユーザーはそんな印象をもつのではないでしょうか。

ツイートを観測していると「HTML5出力に対応したんだ」「ボーンツール復活が嬉しい」という感想がちらほら。「それ、以前から搭載されてるよ」と思いつつも、**ソフト名の改名によって業界の興味関心が集まっている**と実感します。

![Adobe Animate CCのFLAファイルの新しいアイコン](https://ics.media/entry/10897/images/160209-adobe-animate-cc-icon.png)

▲Adobe Animate CCのFLAファイルの新しいアイコン

前回の2015年6月のアップデート（参考記事「[アニメ制作機能がさらに充実！ Flash Pro CC 2015の新機能紹介](https://ics.media/entry/7061/)」)でも紹介したとおり、目立った新機能開発よりも使い勝手面での強化に力を注いでいる印象を持ちます。昔から、Flash Professionalのユーザーは「起動時間の短縮」「使いやすさ」への要望が多かったので、最近のアップデートは既存ユーザーが望む改善を進めているように思います。使うのか使わないのかわからない機能を付け足していたFlash Pro CSシリーズのときとは違う姿勢を感じました。

ICS MEDIAでは今後も引き続きAdobe Animate CCの最新情報を紹介します。