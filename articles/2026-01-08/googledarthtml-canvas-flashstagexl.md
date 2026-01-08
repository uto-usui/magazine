---
title: "GoogleのDart言語を使ってHTML Canvasでリッチコンテンツを作ろう！ Flashライクで効率的な開発を実現するフレームワークStageXLとは"
source: "https://ics.media/entry/286/"
publishedDate: "2013-05-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2013年5月20日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

今回はHTMLでリッチコンテンツを作るための新しい手法としてDartという言語と、StageXLというフレームワークを紹介したいと思います。Dart言語を使うことでJavaやActionScriptライクにコードを書くことができ、StageXLフレームワークを使うことでFlashのようなリッチコンテンツをHTMLで作ることができます。

### 意外だったGoogle I/Oでの発表

先週のGoogle I/O 2013にてアドビからFlash Pro CCの拡張機能Toolkit for Dartのアナウンスがありました。Flash Proで作ったシンボルやアニメーションがDartで出力されHTML canvasで動作するようです。そのFlash Pro Toolkit for Dartはオープンソースのプロジェクトとなる予定とのこと。

詳しくは上条さんのブログで詳しいことが紹介されていますので、Toolkit for Dartについては次の記事を参照ください。

-   [Flash Pro CC の機能拡張 Toolkit for Dart の発表 - akihiro kamijo](http://cuaoar.jp/2013/05/flash-pro-cc-toolkit-for.html)

今後、FlashのようなコンテンツがDartで作れるようになるかもしれないので、先行してDart言語とフレームワークのStageXLを調べてみました。

### Dart言語とは

[![](https://ics.media/entry/286/images/130520_dart.png)](https://dart.dev/)

Dartはグーグルによって開発されたウェブ向けプログラミング言語です。コードはJavaのような書き方であり、型指定やクラスを始めとする言語仕様。JavaScriptに出力できます。

### フレームワークStageXL for Dartとは

[![](https://ics.media/entry/286/images/130520_stagexl.png)](http://www.stagexl.org/index.html)

StageXL for Dartとは**FlashライクなAPIを搭載した描画フレームワーク**です。HTML canvas上でコンテンツが動作します。類似のフレームワークとしてCreateJS(EaselJS)やStarling.jsなどが挙られます。

一般的にDartはDart用に記述されたライブラリしかコンパイルできないので、Dart言語ではCreateJSなどJSライブラリを描画フレームワークとして利用することはできません。

※StageXLはDart言語のみの提供のようです

フレームワークとしては、かなりFlashのAPIに似せて用意されているようです。類似のCreateJSよりもFlashライクなAPIとなっています。（JugglerクラスやpivotXプロパティなど、どちらかというとCreateJSよりはStarlingに似せたのではないかと思うような設計部分も見受けられます）

▼クラス構造

![](https://ics.media/entry/286/images/130520_displayObject.png)

▼フィルター

![](https://ics.media/entry/286/images/130520_filter.png)

▼テキストフィールド

![](https://ics.media/entry/286/images/130520_tf.png)

### Flash Pro Toolkit for Dartとは

Flash ProからDart言語用にシンボルやアニメーションを書き出すためのFlash Proの拡張機能です。まだリリースされていませんが、[Google Dartチーム](https://news.dartlang.org/2013/05/adobes-flash-pro-cc-exports-to-dart-and.html)の発表記事によると次の機能をサポートするようです。

bitmaps, shapes, movie clips, graphic symbols, classic tweens and motion guides, simple buttons, text fields, drop-shadow and glow filters, additive blend mode, single-shape masks, visible and cacheAsBitmap display options, and embedded audio. The Toolkit generates Dart code that represents items on the stage, symbols, images, and sounds in the library.

ほぼ**最新のToolkit for CreateJSと同等の出力機能を備えている**ように思えます。※シングルシェイプしかマスクに使えない点も同等

![](https://ics.media/entry/286/images/0002_Select-the-Toolkit-for-Dart.jpg)

### StageXLの公式サンプル

StageXLを使うことでどういうコンテンツが実現できるのか、公式サイトに掲載されているゲームやデモをいくつかまとめてみました。

![](https://ics.media/entry/286/images/130520_game1.png)

▲Escapeというゲーム（実際にツールキットを使って制作されたデモ）

![](https://ics.media/entry/286/images/130520_game2.png) ▲Supersonicというゲーム

[![](https://ics.media/entry/286/images/130520_demo1.png)](http://www.stagexl.org/demos/filter.html)

▲ぼかしやカラー変化、光彩効果のフィルターデモ

[![](https://ics.media/entry/286/images/130520_demo2.png)](http://www.stagexl.org/demos/masking.html)

▲マスクもサポート

### パフォーマンステスト

![](https://ics.media/entry/286/images/130520_performance.png)

Dart言語のフレームワークStageXLを使ってHTML描画パフォーマンステストを作ってみました。以前、[各種描画系JavaScriptフレームワークの検証](https://ics.media/entry/201/)に使ったものと同じ実装です。

-   [デモを再生する](https://ics-creative.github.io/data-demos/130520_dart_stagexl/piyomark.html)
-   [Dartコードを見る](https://ics-creative.github.io/data-demos/130520_dart_stagexl/piyomark.dart)
-   [プロジェクトファイル一式(zip)](https://ics-creative.github.io/data-demos/130520_dart_stagexl/DartSample.zip)

Dart（JS出力）+StageXLはCreateJSとほぼ同じパフォーマンスだと思います。CreateJSとほぼ同等の機能を備えているので、内部的な設計も似ているのかもしれません。

### 考察

当当サイトではCreateJSやTypeScript/Haxeを紹介してきました。CreateJSはAdobe Flash Professionalで作成したFlash用のアセットをToolkitを使って出力できるためFlash開発で培われたワークフローをそのまま活かすことができるうえに、TypeScript （Microsoftが開発）やHaxeなどの言語を併用すればActionScriptライクにコードを書いていくことができ、開発効率が高いからです。

今回登場したToolkit for Dartは意外だったのですが、Toolkit for CreateJSと同様にエクスポートしたコードはどちらもHTML canvas上で動作するため棲み分けが微妙な気もしています。CreateJSとDart(StageXL)が異なる機能を持っていれば適材適所で選択できたのですが、どちらも似たような機能が提供されているので今後の選択肢が正直なところムダに増えてしまった印象があります。

**GoogleはSwiffyなどFlashコンテンツをHTMLとして動作させることには意欲的な印象**がありましたが、今回の発表があったことでGoogleはその姿勢を強調したのではないかと思いました。

ともあれ、Flashライクに開発できるフレームワークやワークフローがCreateJS以外に増えたということで、リッチコンテンツにおいて**ますますHTMLがFlasherの範疇になったのではないでしょうか**。今後の動向に注目したいところです。