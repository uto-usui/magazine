---
title: "HTML5で複雑なアニメーションを実現する最適な方法とは？ CreateJSを使って容量もパフォーマンスも最適化しよう"
source: "https://ics.media/entry/265/"
publishedDate: "2013-05-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2013年5月16日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

HTML5で複雑なアニメーションを実現する方法にはいつか方法がありますが、それぞれの手法について容量とパフォーマンスのメリット・デメリットを検証してみたいと思います。

-   スプライトシートを使う方法
-   ベクターアニメーションを使う方法
-   スプライトシートビルダーを使う方法
-   おまけ：GIFアニメーションを使う方法
-   おまけ：Flashアニメーションを使う方法

### スプライトシートを使う

スプライトシートとは映画のコマのようにアニメーションの全コマを画像として用意しておいて、順番に高速に切り替えることでアニメーションを実現する方法です。enchant.jsやCreateJSなど多くのJavaScriptのフレームワークで採用されており、もっともスタンダードな方法です。

![](https://ics.media/entry/265/images/130516_about_spritesheet.gif)

表現の再現性が高いうえに実行時の再生負荷が低くパフォーマンスに優れるという利点があります。たとえばキャラクターが歩くアニメーションを再生するとこんなに多くのオブジェクト（20体）を配置しても60fpsをキープしています。

[![](https://ics.media/entry/265/images/130516_use_spritesheet.gif)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheet.html)

-   [デモを再生する(1体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheet_one.html)
-   [デモを再生する(20体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheet.html)

デモの**容量は2.1MB**で再生時のフレームレートは60fpsです。

しかし**スプライトシートには「容量がでかい」という大きな課題**があります。HTML5コンテンツは（Flashに比べて）ただでさえ容量が膨らみがちなのですが、スプライトシートはほぼ無圧縮なPNGデータを使うことが多いため容量が肥大化しがちです。とくにスマートフォンなど通信帯域の限られる環境では、**HTML5コンテンツがエンドユーザーに長いロード時間を強いることになります。**

### ベクター情報としてToolkit for CreateJSを使う

CreateJSは最近注目を集めているJavaScriptでリッチコンテンツを実現するフレームワークです。次のデモはToolkit for CreateJSを使ったベクターアニメーションです。ベクター情報のためファイルとしての容量は少なく読み込み時間をかなりコンパクトにできます。  
※ベクター図形は頂点情報として、移動・回転・スケールのアニメーションは変化量だけ記録されているだけ容量が抑えられています。

![](https://ics.media/entry/265/images/130516_about_vector.gif)

しかし**ベクター情報だとレンダリング負荷が高いのがデメリット**です。表示するオブジェクトの数が少ないうちはいいのですが、大量のオブジェクトを配置するとフレームレートが著しく下がります。それを試してみたのが次のデモです。

[![](https://ics.media/entry/265/images/130516_use_vector.gif)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_movieclip.html)

-   [デモを再生する(1体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_movieclip_one.html)
-   [デモを再生する(20体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_movieclip.html)

デモの**容量は67KB**で再生時の**フレームレートは約14fps**です。

ベクターアニメーションとして再生するとレンダリングをする度にベクターグラフィックスをゼロから計算するため負荷が高くなります。結果として計算量が増えるとフレームレートを落とす要因となってしまいます。

ちなみに類似の方法としてGoogle Swiffyを使う方法もあります。

### CreateJSのスプライトシートビルダーを使う

CreateJSのスプライトシートビルダーを使う方法を紹介します。データをベクター情報として読み込み、初期化時にベクターアニメーションをビットマップとしてレンダリングし内部的にスプライトシートを生成。その後は内部的に生成されたスプライトシートからアニメーションを再生するという方法になります。

![](https://ics.media/entry/265/images/130516_about_spritesheetbuilder.jpg)

※[Adobe MAX 2013 - CreateJS: Building Rich Interactive Experiences in HTML5 - Togetter](http://togetter.com/li/499513)より抜粋

この方法は上記のどちらのデメリットを解決しており、**容量の軽いベクターとパフォーマンスに優れるビットマップのいいとこどり**をできます。

[![](https://ics.media/entry/265/images/130516_use_builder.gif)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheetbuilder.html)

-   [デモを再生する(1体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheetbuilder_one.html)
-   [デモを再生する(20体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_spritesheetbuilder.html)

デモの**容量は67KB**で再生時の**フレームレートは60fps**です。コンパクトな容量で、高いパフォーマンスを実現できています。いいところだらけのスプライトシートビルダーですが、初期化時にアニメーション全コマをプレレンダリングするため、コンテンツ再生前に少し待ち時間が増えてしまうのが注意点です。

### おまけ：GIFアニメーションを使う

おまけですがGIFアニメーションは従来HTMLでアニメーションをする簡易的な方法として用いられていました。しかし、次の点で複雑な制御には向きません。

-   使える色数が256色と制限がある
-   透過部分の境界が汚い
-   GIFアニメーションの停止や再開の方法がない（フレームラベル手法が使えない）
-   使う色数とコマ数が増えると容量が肥大化する

**GIFアニメーションは容量もでかく**なり、キャラクター1体の表示で1MBもかかっています。

[![](https://ics.media/entry/265/images/130516_use_gif.gif)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_gif.html)

-   [デモを再生する(1体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_gif.html)

### おまけ：Flashアニメーションを使う

アニメーションを**Flash（SWFファイル）で使うとたった23KB**です。Flashなので**アンチエイリアスも美しく再生負荷も低く**、なによりも容量がコンパクトです。

[![](https://ics.media/entry/265/images/130516_use_flash.gif)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_flash.html)

-   [デモを再生する(1体)](https://ics-creative.github.io/data-demos/130516_html5_animation/use_flash.html)

### まとめ

以上の結果をわかりやすいように表にまとめたのがこちら。

[![](https://ics.media/entry/265/images/130516_STATS.png)](https://ics.media/entry/265/images/130516_STATS.png)

Flashを除いて言うと、今のところベストの方法はスプライトシートビルダーを使う方法ではないでしょうか。

エンドユーザーに長い読み込み時間やフレームレート低下による高ストレスな体験をさせないためにもCreateJSでスプライトシートビルダーを積極的に使うのがいいのではないかと思います。

では良いCreateJS開発を！　HTML5開発にもFlash Proは有用ですね。

※ちなみにアニメーションのイラストはMITライセンスとして提供されている[DragonBones](http://dragonbones.github.io/ "DragonBones")のイラストをつかいました。[DragonBones](http://dragonbones.github.io/)自体は後日紹介したいと思います。

### もっと知りたい方はCreateJS勉強会へ

ちなみにこの記事はCreateJS勉強会（第3回）で発表した「CreateJS最新情報〜Adobe MAX 2013より〜」から一部抜粋して記事にしました。こちらの発表資料は次のURLにて公開しています。

-   [スライド資料](https://ics-creative.github.io/data-demos/130516_html5_animation/130509_CreateJS.pdf)