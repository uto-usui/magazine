---
title: "FlashでStage3Dコンテンツを作るならおさえておきたい、各種3Dライブラリ徹底比較"
source: "https://ics.media/entry/310/"
publishedDate: "2013-05-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

この記事は今はメンテナンスをしていません。  
情報が古い可能性があるため、ご注意ください。

2013年5月26日、[Stage3Dオンラインカンファレンス](http://gonchar.me/stage3d/)が開催されましたが、各種3Dライブラリについてまとまった情報が欲しいなと思ったのでブログ記事にしてみました。Flashを用いた3Dコンテンツを導入するにあたり、3dsMax, Maya、Cinema4Dなどの**3Dモデル作成ツールとの親和性**、**GUIで直感的に作成できるシーン構築ツール**などに重点を置いて解説します。

### Away3D

[![](https://ics.media/entry/310/images/away3d.jpg)](http://away3d.com/)

-   [http://away3d.com/](http://away3d.com/)

Adobeと非営利な活動として提携している。3dsMaxとの親和性が高くユーザー数が多い。シーン編集ツールAwayBuilderが登場し、日々進化を続けています。

#### 3Dツールとの親和性

公式では3dsMaxを推奨。[3dsMaxのエクスポータープラグイン](https://code.google.com/p/awd/downloads/list)を備えています。（後述のSEA3Dと組み合わせると強力） Blender, Maya, Cinema4D用の[スクリプトが提供](https://github.com/awaytools)されています。 その他、非公式のCinema4D用プラグイン（[C4D-AWD-Bridge](https://github.com/80prozent/C4D-AWD-Bridge))でアニメーション対応したファイルの出力が可能。

#### GUI でのシーン編集

[AwayBuilder](http://away3d.com/awaybuilder/) （2013.5に登場） ライティング、マテリアル等をGUIで確認しながら構築できます。さらに、コンテンツファイル（AWD）としてまとめることが可能。現時点ではアニメーションには対応していないものの、今後の発展が大いに期待できるでしょう。

#### 物理演算

AwayPhysicsを備える。業界標準のBulletエンジンを Alchemy (アルケミー)で固めており、APIはJibLibに似たものになっているため今まで3Dで物理演算をやっていた方にとっては比較的とっつきやすいライブラリといえます。 引用：[Flash Player 11 対応の 3D 物理演算ライブラリ「AwayPhysics」 | ClockMaker Blog](http://clockmaker.jp/blog/2011/12/away_physics/)

#### シェーダー

フィルタークラスを継承したカスタムクラスを作ることで独自のフィルターが作成可能。AGALで記述。

#### ライセンス

オープンソース・ApacheLicense v2.0

#### 実績

-   [Nissan JUKE](http://www.nissan-stagejuk3d.com/)
-   [Perfume global website](http://www.perfume-global.com/)
-   [ビックロベーダー](http://www.uniqlo.com/bicqlo-vader/)
-   [どこでもイタメくん（スマートフォンアプリ）](http://www.nichireifoods.co.jp/character/itamekun/app/docodemo.html)
-   [その他](http://away3d.com/showcase/)

#### リンク

-   [最新のFlash3Dを使ってコンテンツを作ってみよう Away3D入門講座](http://www.slideshare.net/KatsushiSuzuki/flashup-12)
-   [Away3Dと3dsMaxを使った3Dモデルの表示 基本的なマテリアル設定](http://www.slideshare.net/KatsushiSuzuki/flashup14-away3d-basic-material-setting)
-   [Away3Dと3dsMaxでキャラクターアニメーション](http://www.slideshare.net/KatsushiSuzuki/3dsmaxaway3d)
-   [Away Studios](http://awaystudios.com/): Away3D公式3Dコンテンツ制作サービス。制作、コンサルタント、トレーニング等
-   [Flash Stage3D対応のAway3D 4.0がついに正式版に！ | ClockMaker Blog](http://clockmaker.jp/blog/2012/07/away3d-4-gold/)
-   [APIドキュメント](http://away3d.com/documentation/)

#### その他

[Away3D.js](https://github.com/away3d/away3d-core-js) 大々的に告知されていないようですが、基本的な機能をWebGL用に書きなおされたプロジェクトもあるようです。OpenGL ES2.0準拠のシェーダーを使用可能（FlashのStage3Dと同等に使えるといっていいでしょう）

### Flare3D

[![](https://ics.media/entry/310/images/flare3d-2.5.jpg)](http://www.flare3d.com/)

-   [http://www.flare3d.com/](http://www.flare3d.com/)

独自のスタジオツールを備え、GUI操作で3Dシーンの作成でき、シンプルなコードで高度なゲーム、アプリケーションの作成が可能。ゲーム用にさまざまな便利な関数が備わっていることが特徴です。

#### 3Dツールとの親和性

公式では3dsMaxを推奨。3dsMaxのエクスポータープラグインを備えています。Blender, Maya, Cinema4DへはColladaファイルで対応可。ライトマップの書き出し、頂点カラーの書き出しを備え、本格的な開発に耐えうる設計となっています。

#### GUI でのシーン編集

数あるライブラリの中では、早くからスタジオツールを備え、高機能な編集が可能。アニメーションにも対応。独自のシェーダー言語、FLSLと合組み合わせることで強力なエフェクト、モーフ、アニメーション等が作成できます。[先日のカンファレンス](http://togetter.com/li/508585)でも頂点カラーを用いたGI （グローバルイルミネーション）によるライティングが披露されました。

#### 物理演算

ひととおりの物理演算の機能を備え、アクションゲームの作成が可能。

#### シェーダー

独自言語、FLSL(Flare3D Shader Language)を備える。GLSLと似た構文でGPUプログラミングが可能。あらかじめFlare3Dの独自アプリケーションでコンパイルし、バイナリファイルとして取り込んで使用します。上記スタジオツールと組み合わせてエフェクトを用いたマテリアル、頂点データの変形を伴うエフェクトなどが比較的容易に実現できます。FLSLオススメです。

#### ライセンス

非オープンソース。 教育用・非商用の場合はフリー。 商用の場合は購入ライセンス（U$D 496　一人あたり年間, 2013年5月末現在）

#### 実績

-   [CityVille2](http://www.flare3d.com/blog/2012/11/02/zyngas-cityville-2-powered-by-flare3d-adobe-flash/)
-   [Lego Heroica Fortaan](http://www.flare3d.com/blog/2012/06/21/space-time-foams-new-games-using-flare3d/)
-   [その他](http://www.flare3d.com/blog/)

#### リンク

-   [Flare3D入門　簡単なゲームを作ってみよう](http://www.slideshare.net/KatsushiSuzuki/flashup13-basic-training-of-flare3d)
-   [FLSL Wiki](http://wiki.flare3d.com/index.php?title=FLSL_\(Flare3D_Shader_Language\))
-   [Swirl Effect (うずまきエフェクト)](http://orange-suzuki.com/labs/flsl/swirl/)
-   [Fifty shaders of grey](http://iq12.com/2013/04/fifty-shaders-of-grey/)
-   [APIドキュメント](http://www.flare3d.com/docs/)

#### その他

[HTML5-WebGL書き出し](http://www.flare3d.com/blog/2013/01/07/announcing-flare3d-for-html5/ "Flare3D HTML5") - Away3Dと同様、Flare3DもWebGLエクスポートにも注力しているようです。Flash用のコンテンツを作る際と同様のワークフローでWebGL用ファイルの作成ができるとのこと。([サンプルコンテンツ](http://www.flare3d.com/demos/webgl.php?ID=html5#.UaRBKECjF8F "Flare3D HTML5 Sample")) [Mixamoとの連携](http://orange-suzuki.com/blog/2012/03/flare3d_chracter_animation/) - オンラインでキャラクターアニメーションを作成できるサービスと連携することができ、作成済のアニメーションを選択するだけで簡単にキャラクターアニメーションを作成できます。

### Minko

[![](https://ics.media/entry/310/images/minko3d.jpg)](http://minko.io/)

-   [http://minko.io/](http://minko.io/)

PC, モバイルに最適化されたファイルを同時に作成できることが特徴です。

#### 3Dツールとの親和性

公式には3ds Max, Maya, Blenderに対応しているとのこと。フォーマットは、現在Collada、OBJに対応しています。

#### GUI でのシーン編集

独自のシーンエディターを備えています。PC, モバイルに最適化された独自のフォーマット、MKファイルフォーマットを使用できます。

#### 物理演算

ひととおりの機能を備えています。 (衝突判定、ボックス、球、シリンダー、凸面、リジッドボディ、ジョイント等）

#### シェーダー

ノードベースの編集ツールを備えています。 さらに独自のシェーダー言語がありAS3でGPUプログラミングが可能。ランタイム時にAGALに変換されます。

#### ライセンス

オープンソース MITライセンス

#### 実績

-   [SoccerPunch](http://soccerpun.ch/)
-   [その他](http://minko.io/showcase/)

#### リンク

-   [APIドキュメント](http://doc.minko.io/reference/v1/index.html)

### Alternativa3D

[![AlternativaPlatform](https://ics.media/entry/310/images/Alternativa3D.jpg)](http://alternativaplatform.com/en/)

-   [http://alternativaplatform.com/en/](http://alternativaplatform.com/en/)

いち早くStage3Dに対応したロシア製のFlash3Dライブラリ引用： [丸林商店](http://marubayashi.net/) （@narutohyper さんのサイト）

#### 3Dツールとの親和性

[3ds Maxのプラグイン](http://alternativaplatform.com/en/technologies/alternativa3d/)が提供されています。

#### ライセンス

MPL2.0ライセンス

#### 実績

-   [スクエニ レジェンドワールド | SQUARE ENIX MEMBERS](http://avatar.member.jp.square-enix.com/avatar/sqex_lw/)
-   [Live with the Wind.](https://itunes.apple.com/jp/app/live-with-the-wind./id550034643?l=ja&ls=1&mt=8)
-   [その他](http://alternativaplatform.com/en/showcase/)

#### リンク

-   [AlternativaPlayer](http://a3dplayer.com/) - an online 3D-models viewer
-   [日本語フォーラム](http://forum.alternativaplatform.com/index.php?showforum=5)

### SEA3D

[![SEA3D](https://ics.media/entry/310/images/SEA3D-Top-Black.jpg)](http://developers.poonya.com/forum/viewtopic.php?f=11&t=36)

-   [http://developers.poonya.com/forum/viewtopic.php?f=11&t=36](http://developers.poonya.com/forum/viewtopic.php?f=11&t=36)

Away3Dのパーサーとして機能。3dsMaxと組み合わせると最強です。拡張子。sea として3dsMaxから出力でき、アニメーション、モーフ、カメラ、その他多くの要素を出力できます。

-   [3DゲームのためのファイルフォーマットSEA3Dまとめ](http://togetter.com/li/505195)
-   [SEA3D and Away3D demo “Morph Effect”](http://orange-suzuki.com/labs/sea3d/morph/)

### OimoPhysics

[![OimoPhysics](https://ics.media/entry/310/images/OimoPhysics.jpg)](http://el-ement.com/blog/2012/10/08/as3-physics-engine/)

-   [githubページ](https://github.com/saharan/OimoPhysics)

今回紹介した中では唯一の純国産ライブラリ。物理エンジンに特化しています。 [紹介記事](http://el-ement.com/blog/2012/10/08/as3-physics-engine/)

#### 実績

-   [RAGE GIRAFFE](http://devmgames.com/?game=ragegiraffe#ragegiraffe) [Android Physics](http://perso.numericable.fr/chamaslot/android/)

### まとめ

以上、FlashのStage3Dに対応した3Dライブラリの簡単な紹介でした。3Dコンテンツ導入にあたり参考にしていただければ嬉しく思います。

では結局どれがいいの？という話ですが、やはりコンテンツの内容により選択すべきといえます。

たとえばこんな感じ、 **Web上の多くのサンプルを参考にしながら作成したい → Away3D** **少ないコード量でGUIを使ってより直感的に作成したい、FLSLでサクッとエフェクトを作ってみたい** → **Flare3D** **モバイルでの最適化に期待して新しいものを触ってみたい** → **Minko3D** **ロシア製の歴史あるライブラリに挑戦してみたい** → **Alternativa3D** 次回は各機能のより詳しい解説をしたいと考えています。