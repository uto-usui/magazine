---
title: "HTML5モーション制作のテクニックとデータ最適化の必要性―CreateJS勉強会/池田発表資料"
source: "https://ics.media/entry/8896/"
publishedDate: "2015-09-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2015年9月8日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

2015年9月4日（金）、[CreateJS勉強会 (第6回）](https://atnd.org/events/68363) が[ICTCO](http://ictco.jp/access.html)で95人の定員規模で開催されました。勉強会のフォローアップとして、発表資料「HTML5モーション制作のテクニックとデータ最適化の必要性」（発表者：池田）のスライドを一部抜粋して記事という形で公開します。

### バナー広告にみるFlash(SWF)の衰退とHTML5の隆盛

HTML5モーションコンテンツの代表的な活用分野として「ウェブページ」「ゲームコンテンツ」、そして「広告」があります。今回は「広告」をテーマとして最近の話題から紹介します。2015年9月1日にリリースされたGoogle Chrome 45からウェブページ内の主要でないFlash(SWF)コンテンツがブロックされるようになりました（参考記事「[In June, we announced (https://goo.gl/TF7dmD) that Chrome will begin pausing…](https://plus.google.com/+GoogleAds/posts/2PmwKinJ7nj)」)。ブロックが発動する技術的な基準は明確になっていませんが（iframeの内蔵個数や領域という説がありますが）、ウェブページ内の主要情報でないとChromeが判断したときにSWFの再生がブロックされます。わかりやすい例でいうと、広告バナーの再生表示に影響があるでしょう。

![Google Chromeブラウザでの広告表示](https://ics.media/entry/8896/images/150907_createjs_slideshow_7.png)

それに続いて米アマゾンも媒体広告規定からSWF形式の受け入れを中止することを表明しました（参考記事「[米アマゾン、「Flash」広告の受付を停止へ–9月1日より - ZDNet Japan](http://japan.zdnet.com/article/35069357/)」)。筆者はテクノロジー/ワークフローの両面で広告バナーにSWFファイルフォーマットが適していると考えていますが（参考「[バナー広告にFlashではなくHTML5を用いることの技術的課題まとめ](http://togetter.com/li/870900)」)、今後はSWFファイルフォーマットの非採用が進んでいくのではないでしょうか。

![いよいよHTML5の隆盛にともなうFlashの終焉ですね？ ktkrワクテカ！](https://ics.media/entry/8896/images/150907_createjs_slideshow_9.png)

※参考資料「[HTML5は本当にFlashの代替になり得るのか？～Webテクノロジー進化論](http://www.slideshare.net/otachan/html5flashweb)」（2012年）をリスペクトして。

ところが各種メディアのHTML5広告規定を調べるとおもしろいことがわかります。[Yahoo! US/Canadaの広告規定](https://adspecs.yahoo.com/pages/html5guidelines/)では推奨ツールとして「Adobe Edge CC」と「Adobe Flash CC JS Canvas」（いずれも広告規定の表記）を挙られています。[Adobe Flash Professional CC](http://www.adobe.com/jp/products/flash.html)にはHTML5 Canvas (CreateJS)コンテンツ出力機能がありますが、それが推奨されています。

※Flash Professional CCのHTML5 Canvasコンテンツ出力は内部的にCreateJSが使われています。

[![Yahoo! US / Canadaの広告規定。Adobe Flash Pro (JS Canvas)とAdobe Edgeが推奨されている。](https://ics.media/entry/8896/images/150907_createjs_slideshow_10.png)](https://adspecs.yahoo.com/pages/html5guidelines/)

またGoogle AdWordsでもSWFでの入稿は受け付けており、配信側でHTML5へ変換できます（参考記事「[Flash 広告を HTML5 広告に変換する - AdWords ヘルプ](https://support.google.com/adwords/answer/6249073?hl=ja)」)。つまり、**配信フォーマットがHTML5に変わっても実はFlash Professionalを使い続けられるのです**。

※GoogleはSWFファイルフォーマットをHTML5として変換する[Swiffy](https://developers.google.com/swiffy/)という技術を数年前よりサービスで展開していましたが、現在はSWF広告バナーの変換エンジンとして活用されています。

[![SWFは自動的にHTML5に変換される (Swiffy)](https://ics.media/entry/8896/images/150907_createjs_slideshow_11.png)](https://support.google.com/adwords/answer/6249073?hl=ja)

HTML5モーションコンテンツの制作ツールは他に「[Adobe Edge Animate CC](https://creative.adobe.com/ja/products/animate)」や「[Google Web Designer](https://www.google.com/webdesigner/)」「[Tumult Hype 3](http://tumult.com/hype/)」「[Unity 5](https://unity3d.com/jp/5)」などさまざまな選択肢があります。Google Web DesignerとHypeは筆者が試したところ、作り込みには向かないものの簡単な操作で作れることが利点でした。大企業のプロモーションに適した十分な訴求力を作り込めるかは疑問が残りますが、シンプルな広告バナーであればことが足りると思います。Unity 5のWebGL書き出しは3D表現としては強力ですが、ランタイムJSの容量が極めて大きく広告の分野としては適していないでしょう。**少ないデータ容量での配信が可能で、品質を伴ったコンテンツ制作ができるツールとして筆者はFlash Professionalが最適だと考えています。**また国内の主要メディアはSWFファイルフォーマットでの入稿規定のままです。媒体バナーは複数のメディアに出稿することが多いので、HTML5もSWFもデプロイできるFlash Professionalで作成するのは現時点での最適解でしょう。

![Flash Pro CCを使って制作する理由はツールが成熟している点、設計の自由度が高い点、データの最適化に適している点](https://ics.media/entry/8896/images/150907_createjs_slideshow_16.png)

### モーション制作にFlash Proが便利な理由

作品「Tiny Dream」はFlash Professional CCのHTML5 Canvasドキュメントで作成したオリジナルのタイムラインアニメーションです。幾何学的な模様など複雑なモーショングラフィックスを組み合わせた抽象的なコンテンツになっています（この作品は後日[Facebookで公開予定の中継録画](https://www.facebook.com/icswebjp/app_566926136738876)を参考ください）。この作品制作で使った表現手法の一部を解説することで、Flash ProfessionalでHTML5モーションコンテンツを作るメリットを紹介します。

![HTML5 Canvas作品「Tiny Dream」のフィルムストリップ](https://ics.media/entry/8896/images/150907_createjs_demo.jpg)

![ブレンドモードは光の表現に適している](https://ics.media/entry/8896/images/150907_createjs_slideshow_21.png)

▲ 加算表現。画像をレイヤーとして重ねると下位のレイヤーと輝度情報が加算され明るく表現されます。とくにレンズフレア/ゴーストなどの光の表現に適しています。レンズフレア/ゴースト表現の作り方は[Web Designing: 2015年2月号](http://book.mynavi.jp/wd/2015/02.html)の連載で詳しく解説しているので参考にしてください。

![ボーンツールで骨格を設定することで手足や髪の動きの作成に役立てることができる](https://ics.media/entry/8896/images/150907_createjs_slideshow_28.png)

▲ シェイプトゥイーンとボーンツールを使うと人物の有機的な動きの作成に役立てることができます。骨格に連動して髪の毛や腕や足が自動的にアニメーションするようになるので、複雑なシェイプ形状のアニメーション作成に役立てることができました。

![パーティクルの作成にはJavaScriptが便利である](https://ics.media/entry/8896/images/150907_createjs_slideshow_29.png)

▲ パーティクルの表現作成。ランダム性の高い表現は、タイムラインアニメーションに頼らずJavaScriptと併用すると作成が用意です。JavaScriptのfor文で発生個数やランダム性を簡単に変更できるからです。[Web Designing: 2014年4月号](http://book.mynavi.jp/wd/2014/04.html)の連載で解説しているので参考にしてください。手作業によるアニメーション制作とスクリプトの開発を組み合わせられるのがFlash Professionalを使うメリットの1つです。

### データ容量の最適化手法を抑えよう

データ容量やレンダリング負荷を抑えることがHTML5モーションコンテンツの課題の1つです。Flash Professional CCでHTML5 Canvasドキュメントを作成するにあたり最適化する手段の一部をまとめました。HTML5 Canvasドキュメントは万能ではないので何も知らずに作るとデータ容量が膨らむ危険がありますが、これらのテクニックを意識して作ればデータ容量をコンパクトに抑えつつ負荷を抑えることができます。

#### モーショントゥイーンよりクラシックトゥイーンのほうが容量が軽量

[![モーショントゥイーンとクラシックトゥイーンのデータ容量の比較](https://ics.media/entry/8896/images/150907_createjs_slideshow_31.png)](https://ics.media/entry/8896/images/150907_createjs_slideshow_31.png)

[![モーショントゥイーンとクラシックトゥイーンのデータ容量の比較](https://ics.media/entry/8896/images/150907_createjs_slideshow_34.png)](https://ics.media/entry/8896/images/150907_createjs_slideshow_34.png)

クラシックトゥイーンはその名の通り古いバージョンから存在する伝統的な機能で、2つのキーフレーム間の異なるプロパティを変化させるシンプルなモーションの仕組みです。モーショントゥイーンはプロパティごとに独立したトゥイーンを設定できる機能で複雑なトゥイーン制作に役立ちます。データ容量を比較すると、**クラシックトゥイーンはキーフレーム間の差分情報だけが出力され軽量である**のに対し、モーショントゥイーンは全フレームの座標情報がハードコーディングされるため容量が膨らみます。

#### 曲線に沿った動きはガイドレイヤーとクラシックトゥイーンが軽量

[![ガイドレイヤーとクラシックトゥイーンのデータ容量](https://ics.media/entry/8896/images/150907_createjs_slideshow_38.png)](https://ics.media/entry/8896/images/150907_createjs_slideshow_38.png)

[![ガイドレイヤーとクラシックトゥイーンのデータ容量](https://ics.media/entry/8896/images/150907_createjs_slideshow_39.png)](https://ics.media/entry/8896/images/150907_createjs_slideshow_39.png)

ガイドレイヤーとクラシックトゥイーンを組み合わせることで曲線に沿った移動モーションを作成できます。新方式のモーショントゥイーンでも曲線上の移動モーションを作れます。さきほどの例と同様に、**ガイドレイヤーとクラシックトゥイーンはキーフレーム間の差分情報だけが出力され容量が軽量である**のに対し、モーショントゥイーンは全フレームの座標情報がハードコーディングされるため容量が膨らみます。

#### 加減速の設定にはカスタムイージングを使わないほうが容量が軽量

[![イージングの種類によるデータ容量の比較](https://ics.media/entry/8896/images/150907_createjs_slideshow_37.png)](https://ics.media/entry/8896/images/150907_createjs_slideshow_37.png)

イージング（加減速）を設定する方法は二種類あります。-100（加速）〜+100（減速）の範囲で設定できるイージングと、自由な加減速を設定できるカスタムイージングです。**シンプルなイージングはキーフレーム間の差分情報だけが出力され容量が軽量である**のに対し、カスタムイージングは全フレームの座標情報がハードコーディングされるため容量が膨らみます。

#### 軽量化のためにはランタイムビットマップキャッシュを使おう

[![ビットマップとしてキャッシュすることで、表示負荷の軽減ができる](https://ics.media/entry/8896/images/150907_createjs_path.png)](https://ics.media/entry/8896/images/150907_createjs_path.png)

HTML5 Canvasで負荷の高いのは線や塗りのグラフィックの描画です。複雑なグラフィックが存在する場合は、ビットマップキャッシュを有効にすることで再描画の負荷を軽減できフレームレートの維持に役立ちます。とくにスマートフォンではバッテリーの消費量が下がりエンドユーザーへの配慮にもなります。

Flash Professional CCのHTML5 Canvas書き出しではモーション情報はJavaScriptに出力されます。**JavaScriptの内容はテキストエディターで開くことができるので、作成したモーションにムダがないかどうかは簡単に調べることができます。皆さんが制作したコンテンツでもJSファイルを見てムダがないか確認すると効果的でしょう。**なお、本セッションで紹介したのはタイムラインアニメーションの作り方の話ですが、開発サイド（エンジニア向け）の最適化手法と両方組み合わせるのがもっとも効果的です。記事「[CreateJS勉強会(第4回)発表資料『CreateJSとToolkitで納品レベルまで最適化・高速化する方法』](https://ics.media/entry/505/)」もあわせて参考にしてください。

### HTML5モーションコンテンツ拡大に向け最適化方法をシェアしよう

広告バナーはSWFファイルが根強く浸透した業界の1つでした。**Google Chromeの仕様変更のインパクトは大きく、今後は広告バナーに限らずHTML5モーションコンテンツの需要は否応無しに拡大していくでしょう。**しかし、HTML5モーションコンテンツは作り方を誤ればデータ容量が肥大化しバッテリー消費量も急激に上がります。HTML5のバナー広告仕様はSWFほどではないにしろ、容量制限が厳しい世界です。**作り手はエモーショナルな完成度だけではなく、データの最適化も考慮する必要性が増していくでしょう。**筆者は2011年からSWFからHTML5への移行方法を検証してきましたが、少し前まではHTML5にするとデータ容量が肥大化しやすい、パフォーマンスがまったくでない、表現の精度が低いなどさまざまな課題を感じていました（関連記事「[HTML5出力可能なFlash CS5拡張機能を作ってみた](http://clockmaker.jp/blog/2011/02/create-html5-with-flashcs5/)」「[FlashのアニメーションをHTML5に変換するツール「Wallaby」をAdobeが公開](http://clockmaker.jp/blog/2011/03/wallaby/)」)。ここ数年のうちにツールが進化し、これらの課題もクリアされてきているように思います。

今回はHTML5モーションコンテンツ制作におけるFlash Professionalの利便性を中心に紹介しましたが、いずれのツールを使ってもデータの最適化は意識すべきです。ぜひみなさんでHTML5時代のモーション制作テクニックを開拓しシェアしていきましょう。

![CreateJS勉強会(第6回)の池田発表の様子](https://ics.media/entry/8896/images/150907_createjs_seminer.jpg)

![CreateJS勉強会の発表の様子](https://ics.media/entry/8896/images/150907_createjs_author.jpg)