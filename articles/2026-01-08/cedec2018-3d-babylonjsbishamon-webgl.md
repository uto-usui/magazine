---
title: "CEDEC2018発表資料 「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説 Babylon.jsとBISHAMON WebGL版の合成"
source: "https://ics.media/entry/18881/"
publishedDate: "2018-09-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

2018年8月22（水）～24（金）にパシフィコ横浜で開催された[CEDEC](https://2018.cedec.cesa.or.jp/2018/)にて、ICSが開発に携わっているブラウザゲームの技術について発表しました。この記事では、アイオウプラスよりリリースしているブラウザゲーム「[編隊少女 -フォーメーションガールズ-](http://henjo.jp/)」で採用したWebGL関係の技術を紹介します。

> CEDEC（Computer Entertainment Developers Conference）はゲームを中心とするコンピュータエンターテインメントの開発、ビジネス、関連する技術、機器の研究開発などに携わる人々の技術力向上と知識や情報の交流を促進するためのカンファレンスです([公式サイト](https://cedec.cesa.or.jp/2018/koubo/index.html)より)

当日の発表資料は下記リンクからご覧いただけます。

[![](https://ics.media/entry/18881/images/180906_cedec_slideshare.png)](https://www.slideshare.net/KatsushiSuzuki/javascriptwebgl3d-3d-babylonjsbishamon-webgl)

-   [スライド資料：JavaScriptとWebGLで圧倒的な3D空戦バトルを再現。「編隊少女 -フォーメーションガールズ-」における3Dレンダリング技術解説 ～Babylon.jsとBISHAMON WebGL版の合成～](https://www.slideshare.net/KatsushiSuzuki/javascriptwebgl3d-3d-babylonjsbishamon-webgl)

※発表は株式会社アイオウプラス伊藤弘樹氏との共同発表

![](https://ics.media/entry/18881/images/180906_cedec_3.jpg)

はじめに、「[編隊少女 -フォーメーションガールズ-](http://henjo.jp/)」のゲーム紹介。続いて、米国マイクロソフトが主導するOSSであるWebGLフレームワーク「[Babylon.js](https://www.babylonjs.com/)」と株式会社マッチロック社製エフェクトミドルウェア「[BISHAMON](https://www.matchlock.co.jp/) WebGL版」についての解説。最後に、2つのWebGLフレームワークを合成する手法について解説しました。

![](https://ics.media/entry/18881/images/180906_cedec_4.jpg)

「**WebGLによる3D表現手法の習得**」を目標にかかげ、[Babylon.js](https://www.babylonjs.com/)と[BISHAMON](https://www.matchlock.co.jp/) WebGL版の合成手法を解説しています。

「[BISHAMON](https://www.matchlock.co.jp/)」は10年以上にわたり、ビデオゲームの分野で実績がある汎用的なリアルタイム3Dによるパーティクル・エフェクトツール＆ミドルウェアです。**元々Web用ではないため、そのままではJavaScriptからは利用できません。**

そこで今回のプロジェクトでは、**[Emscripten](https://emscripten.org/)という技術により、Web用にコンパイルしたエフェクトSDKを利用**し、WebGLプロジェクトにBISHAMONを搭載しました。**[Babylon.js](https://www.babylonjs.com/)と[BISHAMON](https://www.matchlock.co.jp/)の組み合わせは日本初の事例**です。ブラウザゲームへの採用事例として、技術と仕組みについて解説しました。

> Emscriptenとは、LLVMのバイトコードのJavaScriptへのコンパイラです。LLVMバイトコードは、たとえばC/C++をClangでコンパイルすることで出力できます。バイトコードをJavaScriptに変換することで、それらをWebブラウザ上で動作させられます。

### Babylon.jsとWebGLフレームワーク比較

![](https://ics.media/entry/18881/images/180906_cedec_5.jpg)

今回のゲーム開発に、[Babylon.js](https://www.babylonjs.com/)を採用した理由は主に3つ。

#### 開発元が米国マイクロソフトである

**米国マイクロソフトが主導**していることもあり、ドキュメントがしっかりと整備されています。

#### フレームワーク自身がTypeScriptで開発されている

ゲーム開発を進めるなかで、フレームワークに対して修正が必要な場面にしばしば遭遇します。とくにオープンソースプロジェクトでは、機能の修正やプルリクエストを送ることもあるでしょう。その際、**フレームワークの言語がTypeScriptである**ことは、大きなメリットだと考えます。

#### Unityを使ったシーン書き出しツールがある

**Unityでアセットを管理**しておけば、今後**ブラウザではないプラットフォームにも展開しやすい**でしょう。そのため、**Unityのエクスポーターを備える**[Babylon.js](https://www.babylonjs.com/)は、アセットの観点から見てもメリットがあると言えます。

### Unity WebGL

![](https://ics.media/entry/18881/images/180906_cedec_7.jpg)

当初（2017年8月時点）はUnity WebGLでの開発を第1候補として検討していました。デモを作成したところ、iOS Safariでの動作が不安定でした。

### WebGLフレームワークとの比較

![](https://ics.media/entry/18881/images/180906_cedec_8.jpg)

[three.js](https://threejs.org/)やその他のフレームワークとの比較です。フレームワーク言語、表現力、モバイル対応、アセット管理、価格の面で比較検討しています。

### BISHAMON WebGL版の紹介

![](https://ics.media/entry/18881/images/180906_cedec_9.jpg)

![](https://ics.media/entry/18881/images/180906_cedec_10.jpg)

[BISHAMON](https://www.matchlock.co.jp/)を採用した理由は下記のとおり。[Babylon.js](https://www.babylonjs.com/)と同様に、アセットが今後活かせるというのは大きなメリットでしょう。

1.  **10年以上の実績**があり、ゲームエフェクトを作る上での要素が揃っている
2.  今後、**他プラットフォームへ展開**する際にアセットを活かせる （※要ライセンス）
3.  習得した**エフェクト作成スキル**が他のゲーム、プラットフォームで活かせる

### WebGLフレームワークの合成

![](https://ics.media/entry/18881/images/180906_cedec_11.jpg)

セッションではムービーによる例とともに、合成フローと具体的なコードを紹介しました。WebGLフレームワークを合成する方法は大きく2つの方法が考えられます。

#### 2つの異なるCanvasを単純に重ねる方法

2Dゲームのように、**メインとなる描画とエフェクトが完全にわかれている場合**には有効な手段でしょう。この場合、メインのグラフィックスとエフェクトは**異なる座標空間上に存在する**ことになります。

#### 1つのCanvasのコンテストを共有してレンダリングする方法

3Dゲームの場合は、**3Dモデルの奥と手前にレンダリングしたい**ため、**コンテキストを共有**し、**同一の座標空間上に配置をする**必要があります。今回はこの手法を解説しています。

![](https://ics.media/entry/18881/images/180906_cedec_13.jpg)

1つのコンテキストを共有し、2つの異なるWebGLフレームワークを合成する全体のフローです。

#### STEP1 コンテキストの共有

![](https://ics.media/entry/18881/images/180906_cedec_14.jpg)

コンテキストとは、**WebGLRenderingContext**のことを指します。**WebGL命令を実行するブラウザのインターフェイス**であり、このコンテキストを通して描画命令をすることで、画面に3Dポリゴンをレンダリングします。

![](https://ics.media/entry/18881/images/180906_cedec_15.jpg)

2つのWebGLフレームワークでこのコンテキストを共有すると、同じ座標空間上へポリゴンをレンダリングできます。

#### STEP2 座標空間を合わせる

![](https://ics.media/entry/18881/images/180906_cedec_16.jpg)

3DCGでの座標空間の解説です。3Dポリゴンを画面に描画する際には、メッシュ（上記の例では立方体）の頂点座標をプロジェクション座標空間に変換します。

![](https://ics.media/entry/18881/images/180906_cedec_17.jpg)

このようなコードにより[Babylon.js](https://www.babylonjs.com/)側の座標空間と、[BISHAMON](https://www.matchlock.co.jp/)側の座標空間を合わせます。

#### STEP3 エフェクトの位置・スケール・回転を合わせる

![](https://ics.media/entry/18881/images/180906_cedec_18.jpg)

[Babylon.js](https://www.babylonjs.com/)側の3Dポリゴン（上記例では戦闘機の位置）とエフェクトの位置・スケール・回転を合わせます。

#### STEP4. レンダリングとポストエフェクト

![](https://ics.media/entry/18881/images/180906_cedec_19.jpg)

レンダリングは下記の3ステップとなります。**[BISHAMON](https://www.matchlock.co.jp/)エフェクトのレンダリング後にポストエフェクトをかける**ところがポイントです。

1.  シーンのレンダリング ([Babylon.js](https://www.babylonjs.com/)の3Dポリゴン）
2.  エフェクトのレンダリング ([BISHAMON](https://www.matchlock.co.jp/))
3.  ポストエフェクト（[Babylon.js](https://www.babylonjs.com/)によるポストエフェクト）

![](https://ics.media/entry/18881/images/180906_cedec_20.jpg)

3ステップの具体的なコードです。ここで重要なポイントは下記のコードにより、**WebGLステートをリセットできる**ところです。**異なるWebGLフレームワークを合成するためのメソッド**として、[Babylon.js](https://www.babylonjs.com/)に機能が用意されています。

```
engine.wipeCaches(true);
```

![](https://ics.media/entry/18881/images/180906_cedec_21.jpg)

[BISHAMON](https://www.matchlock.co.jp/)エフェクトは**[Babylon.js](https://www.babylonjs.com/)側で準備したレンダーターゲットに描画する**点がポイントとなります。

```
context.bindFramebuffer(
  gl.FRAMEBUFFER,
  renderTarget.getInternalTexture()._framebuffer
);
```

![](https://ics.media/entry/18881/images/180906_cedec_22.jpg)

[Babylon.js](https://www.babylonjs.com/)を使うことで、**ゲーム開発に必要な機能**が効率よくそろいました。(物理ベースレンダリング、レンダリングのカスタマイズなど）

また、[BISHAMON](https://www.matchlock.co.jp/)の導入により**エフェクトの表現力が向上され、**ワークフロー面では**デザイナーとエンジニアの分業の促進**につながったため、導入メリットは大きいといえるでしょう。

### おわりに

![](https://ics.media/entry/18881/images/180906_cedec_23.jpg)

CEDEC当日まで空席があるかなと思っていたのですが、大変ありがたいことにセッション開始前から並んでくださる方が多く、正直なところ驚きました。ブラウザゲームでのWebGL導入の熱量が高まってきていると言えるでしょう。

本プロジェクトでWebGL開発をスタートしてから、レンダリング合成をはじめさまざまな問題を解決し、その結果得られた知見をCEDECという場で共有できたことは、とても貴重な経験となりました。今後も新しいことに挑戦していきたいと思います。今回の技術について興味がある方、ご意見・ご質問などありましたら、お気軽にお寄せください。

### 補足

#### WebGLの基本的な描画フロー

フレームワークを使えば、WebGL命令を知らなくても簡単に3D空間にポリゴンをレンダリングできるでしょう。ただし、WebGLフレームワークを合成したい場合、WebGL命令をコーディングする場面に遭遇します。WebGLによるシンプルなライブラリを作成してみると、その後の開発がスムーズに進みます。またライブラリの設計意図を汲んで、修正するための知識も身に付きますのでオススメです。

#### WebGL命令の分析・最適化

WebGLの開発では、WebGL命令を分析する必要がでてきます。本プロジェクトでは、[Babylon.js](https://www.babylonjs.com/)が提供している[Spector.js](https://spector.babylonjs.com/)を使ってWebGL命令のチェックと最適化を行っています。