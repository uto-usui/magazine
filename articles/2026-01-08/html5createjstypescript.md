---
title: "HTML5デモ「日本全国花粉飛散マップ」を作って分かったCreateJSとTypeScriptでの効率的な開発手法"
source: "https://ics.media/entry/132/"
publishedDate: "2013-03-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

2013年3月15日に開催された[CreateJS勉強会（第2回）](https://togetter.com/li/472172)で発表したWebサイト「[日本全国花粉飛散マップ](https://ics-web.jp/projects/pollenmap/)」ですが、[CreateJS](https://createjs.com/)と[TypeScript](https://www.typescriptlang.org/)を使って制作しました。

![](https://ics.media/entry/132/images/130318_pollen08.jpg)

今回の作品のポイントとしては、次の3点があげられます。本記事では次を具体的に説明します。

-   HTML5で制作、デスクトップだけでなくスマートフォンやタブレットでも再生可能
-   CreateJSで、DOMではできないHTML5 Canvasならではの表現
-   TypeScriptを用いて低学習コストで効率的な制作の実現

![日本全国花粉飛散マップ](https://ics.media/entry/132/images/pollenmap_01.jpg)

![日本全国花粉飛散マップ](https://ics.media/entry/132/images/pollenmap_03.jpg)

### スマートフォンやタブレットでも閲覧可能

このWebサイトは[環境省が提供している資料](http://kafun.taiki.go.jp/Library.html)を元に、過去9年分の花粉の飛散量をパーティクルを用いてビジュアライズしたものです。花粉の量に比例して、パーティクルの量や色、大きさが変化します。2013年の関東地方は2012年の6倍もの花粉が飛散するとの予測でしたが、年代別の飛散量を視覚的に比較できるようにしました。

制作にはHTML5の技術を使っているので、**デスクトップだけでなくスマートフォンやタブレットなどのモバイル端末でも再生できます**。フルFlashサイトのような表現ですが、モバイル端末でも動作しています。モバイル端末では平均して18fps、場所によっては60fpsと滑らかに再生できていて、パフォーマンスは良好だと感じました（※パーティクルなど負荷の高い表現のためモバイルでは難しいと思いましたが）。一昔前のiOS/AndroidのブラウザだとHTML5 Canvasの性能は悲惨なものだったので、ようやく実用できるレベルになってきたという印象です。

![](https://ics.media/entry/132/images/pollenmap_05.jpg)

### CreateJSでCanvasならではの多彩な表現

今回ソーシャルボタン以外のすべてをCreateJSを用いてHTML5 Canvasで描画してます。花粉のパーティクルの表現や、加算のブレンドモード、地図を移動する際のライン描画の表現など、DOMではできないHTML5 Canvasならではの表現を組み込んでいます。

また地図などのアセットはAdobe Flash Professional CS6から[Toolkit for CreateJS](https://helpx.adobe.com/jp/animate/using/creating-publishing-html5-canvas-document.html)を使って出力してます（※）。とくに地図などはベクターデータをそのまま書き出しているので、拡大した際にもキレイに表示できています。

※2016年追記：最新版のウェブサイトでは後継機能であるAdobe Animate CCのHTML5 Canvasドキュメントに切り替えてます

![地図を移動する際のライン描画](https://ics.media/entry/132/images/pollenmap_02.jpg)

▲地図を移動する際のライン描画

![花粉のパーティクルの表現や、加算のブレンドモード](https://ics.media/entry/132/images/pollenmap_04.jpg)

▲花粉のパーティクルの表現や、加算のブレンドモード

ちなみにToolkit for CreateJSは、Flash ProからSWCファイルを書き出してActionScript 3.0で使用するのと同じ感覚でアセットを書き出せるので、こういったコンテンツの制作には必須だと思います。

### TypeScriptでスマートでストレスのない開発

今回コーディングには[TypeScript](https://www.typescriptlang.org/)を使用しました。TypeScriptはMicrosoft社がオープンソースで提供している言語です。JavaScript開発で悩みがちなクラスの作成や名前空間の扱いを容易にし、また静的型付けがあることが特徴です。TypeScriptはコンパイルするとJavaScriptに変換されますが、美しいJavaScriptが出力されます。静的型付けの恩恵でコード補完を利用でき、アロー関数式でthisのスコープにも悩まされず、快適に開発をすすめることができました。今回はじめてTypeScriptを使ってみましたが、1日も触わっていれば十分把握できたので、クラスベースの構築に慣れている方であればすぐに導入できると思います。

このサイトは弊社池田と2人で制作したのですが、バージョン管理システム（GitやSVN）と合わせることでスムーズに開発を進めることができたので、TypeScriptの開発はとくに複数人で効率的になると思います。

![日本全国花粉飛散マップ](https://ics.media/entry/132/images/130318_pollen07.jpg)

### 最後に

TypeScriptとCreateJSの開発については、CreateJS勉強会（第2回）で発表したスライド資料があります。こちらもあわせてご参考ください。

-   [CreateJS勉強会(第2回)発表資料](https://ics.media/entry/163/)[「効率的なCreateJSコンテンツ開発 〜TypeScript/Haxeを使ったActionScriptライクな開発環境〜」](https://ics.media/entry/163/)