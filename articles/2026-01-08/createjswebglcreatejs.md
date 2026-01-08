---
title: "意地でもCreateJSでWebGLを使ってみよう―CreateJS勉強会/川勝発表資料"
source: "https://ics.media/entry/9060/"
publishedDate: "2015-09-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

2015年9月15日 公開 / [株式会社ICS 川勝 研太郎](https://ics.media/entry/staff/kawakatsu/)

[CreateJS勉強会 (第6回)](https://atnd.org/events/68363)でのライトニングトーク「意地でもCreateJSでWebGLを使ってみよう」（発表者：川勝）の発表内容を記事としてまとめました。[CreateJS](http://www.createjs.com/)のWebGL機能は高いパフォーマンスが得られるものの、表現の制約があります。本記事では**CreateJSのWebGL機能を拡張することで、その制約を超えて望みの表現を実現する**方法を紹介します。

### CreateJSではWebGLレンダリングに対応

CreateJSの中で、描画機能を提供しているEaselJSはWebGLでのレンダリングに対応しています。**WebGLではレンダリングにGPUを使用できるため、高速に描画が可能**です。CreateJSではWebGLを使用すると、従来のContext2D形式に比べて環境によっては最大51倍もの高速化が見込めます（参照「[WebGL Support in EaselJS - CreateJS Blog](http://blog.createjs.com/webgl-support-easeljs/)」)。

![CreateJSのContext2DレンダラーとWebGLレンダラーのBunnymarkベンチ結果比較](https://ics.media/entry/9060/images/150909_createjs_webgl_spec.png)

### CreateJSのステージクラス

従来のCreateJSはStageクラスを使用して画面のレンダリングを管理していました。これは内部でcanvas要素のContext2D APIを使用してレンダリングをしています。ここにSpriteStageというWebGLレンダリング向けのステージクラスが追加されました。こちらは内部でcanvas要素のWebGL APIを使用しています。CreateJSでWebGLの恩恵を受けるためにはこのSpriteStageクラスを使用する必要があります。

![CreateJSのステージクラス](https://ics.media/entry/9060/images/150909_createjs_webgl_stageclass.png)

SpriteStageクラスを使用したデモを作成しました。大量のオブジェクトを描画していますが、高いフレームレートを維持できています。

-   [デモを再生する](https://ics-creative.github.io/data-demos/150904_createjs_webgl/demo1/)

![](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_spriestage.png)

### Stageクラスと比較したSpriteStageクラスの制約

しかし、このSpriteStageクラスを使用すると、従来のStageクラスと比べていくつか制約があります。たとえば、CreateJSのShapeクラスやTextクラスをStageに追加することができません。また、マスクやブレンドモード、フィルター効果の適用など従来のStageクラスで表現できていた機能のいくつかが使えなくなっています。

![Stageクラスと比較したSpriteStageクラスの制約](https://ics.media/entry/9060/images/150909_createjs_webgl_restriction.png)

では制約された機能を実現するためにはどうすればよいでしょうか。SpriteStageクラスは従来のStageクラスとの共存が可能です（参考記事「[WEBGL & EASELJS: A TECHNICAL INTRO - CreateJS Blog](http://blog.createjs.com/webgl-easeljs-a-technical-intro/)」)。描画負荷が高いものはSpriteStageクラスで、Shapeの使用のようにSpriteStageクラスの制約で表現が難しいものはStageクラスで…という使い方も可能です。もちろん、Stageクラスで描画する部分はContext2Dレンダリングになるので、WebGLほど高速に描画できるわけではありませんが。

また、CreateJSのほかにもレンダリングにWebGLを使用できる2D描画ライブラリもあります。たとえばJSライブラリの「[Pixi.js](https://pixijs.com/)」ならブレンドモードなど、先ほど挙げたCreateJSのSpriteStageクラスでは実現できない機能が使用できます。

### 意地でもCreateJSを使いたい

しかし、みなさんご存知のようにCreateJSは優れたライブラリです。HTML5のcanvas要素をJavaScriptの低レベルなAPIを気にせず直感的なコードで実装できます。とくにFlashデベロッパーにとってはActionScriptに似たAPIとして実装されているため、馴染みやすい方法でコードを記述できます。実際私もFlashを経験していたため、CreateJSにはすんなりと馴染むことができました。やはりここは他のライブラリは使わずに、CreateJSだけで実装をしたいところです。

WebGLの高速描画は魅力ですが、SpriteStageクラスでは現状機能が足りないため、そのままでは表現の幅が狭まってしまいます。そこで今回は足りない機能をWebGLを使用して自分で実装することにしました。拡張したSpriteStageクラスのソースコードはGitHub上で公開しています。CreateJSの既存のSpriteStageクラスと差し替えて使用してください。

-   [CreateJS SpriteStage Extension(GitHub)](https://github.com/ics-creative/150913_createjs_spritestage_extension)

![意地でもCreateJSを使いたい](https://ics.media/entry/9060/images/150909_createjs_webgl_extend.png)

### WebGLを使用してなにをしたいか？

ここで、WebGLを使用してなにをしたいかを考えてみましょう。WebGLの利点はGPUを使用した高速レンダリングが可能なことです。GPUは大量のオブジェクトを表示することが得意なので、たとえば**大量のオブジェクトを描画するパーティクル表現はWebGLの恩恵を受けやすい**と言えるでしょう。ではパーティクル表現にあたって現状のSpriteStageクラスに足りない機能は何でしょうか。

-   動的に色を変えたい  
    StageクラスではColorFilterという機能が使えたため、動的にオブジェクトを着色できたのですが、SpriteStageクラスにその機能はなく、着色したいのであればその色ごとのテクスチャ素材を用意しなくてはなりません。これでは柔軟ではないですし、素材の用意も大変です。
-   加算合成をしたい  
    ブレンドモードの加算合成は重なった色を明るく見せるためキラキラ輝いたような表現が可能で、これはなんといってもパーティクル表現にとっては欠かせない要素と言えるでしょう。
-   マスクをかけたい  
    パーティクルは場合によっては描画させたくない領域が出てきます。これを実現するために、マスク機能が必要です。

これらの機能をWebGLを使用して実装したいと思います。実装にあたってはWebGLの低レベルなAPIを使わなければならないため、これらの機能についてWebGLでの実装方法を説明します。

### カラーフィルター

まずはじめに、カラーフィルターの実装について説明します。

#### 概念

GPU上で実行されるプログラムのことをシェーダーと呼びます。3Dの分野ではこのシェーダーを通して3Dモデルの頂点の処理や影の計算をGPUに命令します。フラグメントシェーダーはこのシェーダーの種類の1つで、描画する領域のピクセルごとのカラーを計算するシェーダーです。フラグメントシェーダーではオブジェクトを描画する際、描画先のスクリーンの各ピクセルに対して「このピクセルはこの色で塗る」という処理を行います。

![フラグメントシェーダーとは](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_fragmentshader.png)

#### 実現方法

WebGLにおいてカラーフィルターの実装はフラグメントシェーダーの命令で描画オブジェクトに対して色を変更する命令を実行させます。たとえば、下記の図のように「赤い色を青い色に変更する」というフラグメントシェーダーを実装すると、実行時に描画オブジェクトのすべてのピクセルに対して「このピクセルは描画オブジェクトの色が赤なので、青に変更する」という処理を行ってスクリーンに描画します。

![カラーフィルターの仕組み](https://ics.media/entry/9060/images/150909_createjs_webgl_colorfilter.png)

#### 実装コード

WebGLではGLSL（ジーエルエスエル）というシェーダー言語を使用してGPUプログラミングを行います。SpriteStageクラスのフラグメントシェーダーはテクスチャのカラーを描画するだけのGLSLコードでしたが、今回下記のようにテクスチャのカラーに対して設定したパラメーターで補正する処理を追加することでカラーフィルターを実現しました。

```
// GLSLコード
uniform sampler2D uSampler0;
uniform vec4 colorMultiplier;
uniform vec4 colorOffset;
varying vec3 vTextureCoord;

void main(void) {
	// テクスチャからカラーを取得する
	vec4 color = texture2D(uSampler0, vTextureCoord.st);

	if(color.a == 0.0){
		// アルファ0の場合、このピクセルの描画を破棄する
		discard;
	}else{
		color = vec4(color.rgb, color.a * vTextureCoord.z);

		// カラーをあらかじめ設定したパラメーターで補正する(カラーフィルター)
		color = vec4(color * colorMultiplier + colorOffset);
		gl_FragColor = color;
	}
}
```

#### デモ

先ほどのデモに拡張したカラーフィルター機能を適用しました。フレームごとにパーティクルの色相が変化します。描画するフレームごとに「この色に塗り替える」という命令をGPUに処理させることができるので、画像素材を複数用意しなくても柔軟に着色する表現が可能です。

-   [デモを再生する](https://ics-creative.github.io/data-demos/150904_createjs_webgl/demo2/)

![](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_colorfilter.png)

#### 使用方法

拡張したカラーフィルター機能を使用する記述方法は下記のコードになります。CreateJSのColorFilterインスタンスを作り、カラーフィルターを適用したいSpriteContainerインスタンスのfiltersプロパティに指定します。従来のStageクラスでColorFilterを使用するコードと同じ記述で使用できます。注意点として、カラーフィルターはSpriteContainerごとにのみ適用できます。

```
// JavaScriptコード

// カラーフィルターを適用する
var colorFilter = new createjs.ColorFilter(
  1.0,
  0.0,
  0.0,
  1.0,
  0,
  0,
  0,
  0
);
mySpriteContainer.filters = [colorFilter];
```

### ブレンドモード

次に、ブレンドモードの実装について説明します。

#### 概念

WebGLでは、複数のオブジェクトを順番に描画します。その際、フラグメントシェーダーで描画しようとしているピクセルにすでに前回の描画によってカラーが書き込まれている場合、最終的なカラーをどのように計算するかをブレンド設定として指定できます。

通常はブレンド設定は新しい描画オブジェクトで上書きされるようになっています。新しく描画しようとしているピクセルにすでにカラーが描画されていても、フラグメントシェーダーは元のカラーを無視して新しいカラーを書き込みます。たとえば、すでに青い四角形が描画されているスクリーンに対してさらに赤い三角形を描画すると、2つのオブジェクトの重なった部分は後から描画した赤い色で塗りつぶされます。

![WebGLのブレンド処理(通常)の仕組み](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_blendmode_normal.png)

#### 実現方法

それでは、加算合成はどのように実現すれば良いでしょうか。これは単純で、元の色と新しい色をミックスするようなブレンド設定をします。先ほどの例で言うと、2つのオブジェクトの重なった部分は赤 + 青でブレンドされ、マゼンタが描画されます。

![WebGLのブレンド処理(加算合成)の仕組み](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_blendmode_add.png)

#### 実装コード

WebGLにおいてブレンドモードはWebGLRenderingContextインスタンスのメソッドで設定します。blendEquationSeparate()メソッドで描画元と描画先の色をどのように演算するかを設定し、blendFuncSeparate()メソッドで描画先と描画元のどの要素（ファクター）を演算に使用するかを設定します。SpriteStageクラスのブレンド設定は「アルファブレンディング」になっているため、今回下記のようにブレンド設定を行うことで加算ブレンドモードを実現しました。

```
// JavaScriptコード

// WebGLRenderingContextインスタンスのブレンド演算方法を加算に設定する
ctx.blendEquationSeparate(ctx.FUNC_ADD, ctx.FUNC_ADD);
// WebGLRenderingContextインスタンスのブレンドファクターを設定する
ctx.blendFuncSeparate(
  ctx.SRC_ALPHA,
  ctx.ONE,
  ctx.ONE,
  ctx.ONE
);
```

#### デモ

デモに拡張した加算ブレンドモード機能を適用しました。ぐっとパーティクルの表現力が増しています。

-   [デモを再生する](https://ics-creative.github.io/data-demos/150904_createjs_webgl/demo3/)

![](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_blendmode.png)

#### 使用方法

拡張したブレンドモード機能を使用する記述方法は下記のコードになります。SpriteContainerインスタンスのcompositeOperationプロパティに文字列"lighter"を指定します。従来のStageクラスで加算ブレンドモードを使用するコードと同じ記述で使用できます。

```
// JavaScriptコード

// 加算ブレンドモードを適用する
mySpriteContainer.compositeOperation = "lighter";
```

### マスク

最後に、マスクの実装について説明します。こちらはLTでは時間の都合で割愛した内容です。

#### 概念

WebGLではステンシルバッファーという領域が描画スクリーンと同じサイズで存在します。オブジェクトが描画される際にこのステンシルバッファーに設定した値をピクセルごとに書き込むことができますが、これは実際には描画されません。それでは何に使用されるのかと言うと、フラグメントシェーダーがカラーを書き込む時にこのステンシルバッファーの値を参照します。

ピクセルごとにステンシルの値を参照して、あらかじめ設定した条件に合致するかどうかでフラグメントシェーダーが描画する際のピクセルの挙動を決めることができます。たとえば「ステンシル値がこの条件の時にはフラグメントシェーダーは描画を行わない」というような命令が可能です。

#### 実現方法

WebGLではこのステンシルバッファーを利用してマスク機能を実現します。たとえば、ステンシルバッファーに四角形の形に値"1"を書き込んでおきます。そしてオブジェクトを描画する時に「ステンシルバッファーに値"1"が書き込まれていたら描画する、書き込まれていなかったら描画しない」という設定をします。すると、次に三角形のオブジェクトを描画しようとした時にステンシルバッファーが参照されるため、ステンシルバッファーの値が書き込まれているピクセルのみ描画をさせることができます。

![ステンシルバッファーの仕組み](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_stencilbffer.png)

#### 実装コード

WebGLにおいてステンシルバッファーの書き込みはWebGLRenderingContextインスタンスのメソッドで設定します。stencilFunc()メソッドでステンシル値の評価方法を設定し、stencilOp()メソッドでステンシル値の書き込み方法を設定します。今回下記のようにSpriteStageクラスでステンシル設定を行うことでマスクを実現しました。

```
// JavaScriptコード

// オブジェクトを描画するピクセルはステンシルバッファーに値"1"が書き込まれるよう
// WebGLRenderingContextインスタンスに設定する
ctx.stencilFunc(ctx.ALWAYS, 1, 0xff);
ctx.stencilOp(ctx.KEEP, ctx.REPLACE, ctx.REPLACE);

// マスクしたい形のオブジェクトを描画する(省略)
// ここでステンシルバッファーのマスクしたい形のピクセルに値"1"が書き込まれる

// オブジェクトを描画するピクセルのステンシルバッファーの値が"1"のときのみカラーが書き込まれるよう
// WebGLRenderingContextインスタンスに設定する
ctx.stencilFunc(ctx.EQUAL, 1, 0xff);
ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);

// マスク対象のオブジェクトを描画する(省略)
// ここでマスク対象のオブジェクトはステンシルバッファーに書き込まれた、マスクしたい形のピクセルのみ描画される
```

#### デモ

今までのデモにさらに拡張したマスク機能を適用しました。星型のShapeをパーティクルのマスクとして設定しています。

-   [デモを再生する](https://ics-creative.github.io/data-demos/150904_createjs_webgl/demo4/)

![](https://ics.media/entry/9060/images/150909_createjs_webgl_demo_mask.png)

#### 使用方法

拡張したマスク機能を使用する記述方法は下記のコードになります。CreateJSのShapeインスタンスを作り、SpriteContainerインスタンスのmaskプロパティに指定します。従来のStageクラスでマスクを使用するコードと同じ記述で使用できます。

```
// JavaScriptコード

// マスク用Shapeを作る
var maskShape = new createjs.Shape();
maskShape.graphics.beginFill("#000000");
maskShape.graphics.drawPolyStar(0, 0, 200, 5, 0.5, 0);
maskShape.graphics.endFill();
maskShape.setBounds(-200, -200, 400, 400);

// マスクを適用する
mySpriteContainer.mask = maskShape;
```

### まとめ

今回、SpriteStageクラスを拡張することで従来のStageクラスのような表現が可能になりました。**WebGLは低レベルのAPIのため一見学ぶのが難しいですが、習得することでブラウザ上でさまざまな表現が可能**になります。皆さんも是非勉強してWebGLをもっと世に広めていきましょう。

また、今回拡張したSpriteStageクラスのソースコードをデモのソースコードと一緒にGitHub上で公開しています。この記事にあるとおり**拡張した機能は既存のStageクラスの同機能の記述方法と同じ記述で実現できる**ように実装してあるので、すぐに使えるかと思います。是非使用してみてください。

-   [CreateJS SpriteStage Extension(GitHub)](https://github.com/ics-creative/150913_createjs_spritestage_extension)

![CreateJS勉強会 (第6回)の川勝の発表の様子](https://ics.media/entry/9060/images/150909_createjs_webgl_LT.jpg)