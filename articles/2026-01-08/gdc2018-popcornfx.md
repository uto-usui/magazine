---
title: "［GDC2018］ リアルタイムパーティクルエフェクトミドルウェア「PopcornFX」は次期バージョンでどう進化するか？"
source: "https://ics.media/entry/17557/"
publishedDate: "2018-04-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

3月19日～23日、カリフォルニア州サンフランシスコでゲーム開発者向けイベント「[Game Developers Conference 2018](http://www.gdconf.com/)」が開催されました。筆者も現地に赴き、初日から5日間さまざまなセッションを受講してきました。

![](https://ics.media/entry/17557/images/180327_gdc_popcornfx_0.jpg)

3月21日のセッション「[Realtime VFX: Designing Practical and Efficient Simulation Node Graphs](http://schedule.gdconf.com/session/realtime-vfx-designing-practical-and-efficient-simulation-node-graphs-presented-by-popcornfx-persistant-studios/855646)」で、Persistant Studios社によって[PopcornFX](https://www.popcornfx.com/)の次期バージョン最新情報が紹介されました。その内容をダイジェストで紹介します。このセッションではノード編集型の新しいエフェクトエディターや、内部エンジン最適化のこだわりが披露されました。

![](https://ics.media/entry/17557/images/180327_gdc_popcornfx_1.jpg)

### PopcornFxとは

[PopcornFX](https://www.popcornfx.com/)とはパリとモントリオールに拠点を置くPersistant Studios社が提供するリアルタイム3Dグラフィックスのソフトウェアです。スクリプトで制御可能なパーティクルエディターなどがあり、数十万規模のパーティクルエフェクトでも性能を落とすことなく作成できます。ゲーム開発、映像制作、AR/VR/MR、ライブショーなどで幅広く利用されています。  
※ICS MEDIAでも「[ヴィジュアルプログラマー必見。PopcornFxによる花火エフェクトの作成](https://ics.media/entry/10921/)」にて取り上げています。

### 次期バージョンのアイデア

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_2.jpg)

[Substance Designer](https://www.allegorithmic.com/products/substance-designer)、[Houdini](http://sidefx.jp/)、[Unreal EngineのBlueprint](http://api.unrealengine.com/JPN/Engine/Blueprints/index.html)など、他社ノード製エディターの編集画面。これらツールからインスピレーションを受けて、PopcornFXでも新しいノード編集型のエフェクトエディターを開発中です。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_3.jpg)

PopcornFXを単純にノード編集型に置き換えると左図の概念図となります。PopcornFXでは、パーティクルのライフサイクル毎に、下記のフェーズにわけて振る舞いを定義していく必要があり、左図のままだと直感的に制作しづらい。

-   Spawn：生成時の処理
-   Evolve：毎フレームの処理
-   Render：描画の処理

右図のように1つのノードに統合し、より直感的に扱えるように工夫しました。

### エフェクト実装例と内部処理

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_4.jpg)

簡単なパーティクルエフェクトの実装例。青が生成時の処理、赤は毎フレーム時の処理。オレンジは描画処理です。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_5.jpg)

ノードを実行リスト順に縦に並べ、さらにフレーム毎の様子を横軸に置いたイメージ図。2フレーム目以降では、Spawn（初期化処理）が不要のため、Evolve（毎フレームの処理）とRender（描画処理）のみの処理となります。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_6.jpg)

データをメモリに保持するタイミングを工夫し最適化を施しました。ここでのデータとは、頂点位置や移動速度など、毎フレーム変化するパーティクルの情報を指します。PopcornFXではGPUを利用した演算の高速化をはかっているため、メモリへのアクセスがパフォーマンス最適化の鍵となります。※後に詳しく解説あり

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_7.jpg)

フレーム毎の処理イメージ図。描画処理に移る前に必要な値をメモリに保持します（Store）。

### Layer Graph

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_8.jpg)

「Layer Graph」機能により、エフェクトを構成するパーティクルの種別毎にノードをわけて制作できます。ノードの内部実装を意識せずに、高レベルでのエフェクトの構造を可視化する機能です。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_9.jpg)

少し複雑なエフェクトの実装例。「Layer Graph」を使うと、エフェクトの構造をシンプルに捉えて試行錯誤しやすい。

### 直線補間と曲線補間

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_10.jpg)

低フレームレート時でも滑らかなパーティクル曲線を描く機能。曲線補間（cubic）、直線補間（linear）を備えます。原理は、毎フレーム時のパーティクル移動開始点、終了点での移動ベクトル（接線）を計算し、低フレームレートでも描画は1回としながら、高フレームレート時と同様の計算処理を行います。エフェクトの品質を大きく向上させる工夫と言えます。

### 最適化

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_11.jpg)

このようなノードエフェクトをコンパイルしたところ、

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_12.jpg)

330回もの命令処理となりましたが（写真左）、以後解説する最適化処理により、69回に圧縮することができました（写真右）。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_14.jpg)

コンパイルパイプラインの全体図。以下4つのステージがあります。本稿では詳細な解説を割愛しますが、概要としては下記の処理となります。

1.  **Event frontend**：エフェクトの全体構造（Eventgraph）をチェックするステージ
2.  **Data frontend**：エフェクトの詳細ノード（Datagraph）とスクリプト（Scripts）から、AST(Abstract Syntax Tree)を生成するステージ
3.  **IR**：ASTからIR（中間言語）を生成するステージ。この段階でコンパイラーによりさまざまな最適化が行われます。
4.  **Backend**：IRからネイティブ言語（機械語）に変換するステージ

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_15.jpg)

中間言語の最適化一例。重複したコードを削除しています。「load storage\_123」という処理が重複しているため、削除されました。

### 最適化の結果

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_16.jpg)

4つのエフェクトで最適化前後の**命令数の変化**を表した図（グラフが小さい方が命令数が少なくパフォーマンスが高い）。オレンジ色のバーが最適化前、緑は**命令数最適化**、青は**メモリ読み書き最適化**を表します。いずれも3倍以上の性能向上となっています。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_17.jpg)

最適化前後での**シミュレーション時間の変化**を表した図（グラフが小さい方が高速）。いずれのエフェクトでも**命令数最適化**によりシミュレーション時間が変化していることがわかります。**メモリ読み書き最適化**の影響は少ない。

![画像タイトル](https://ics.media/entry/17557/images/180327_gdc_popcornfx_18.jpg)

最適化前後での**メモリサイズの変化**を表した図（グラフが小さい方がメモリ量が少ない）。**メモリ読み書き最適化**によりメモリサイズを縮小できることがわかります。

### おわりに

リードプログラマーのJulien Bilalte氏とプログラマーのRomeo Incardona氏にお話を伺いました。Persistant Studiosでは10数名のプログラマーがツール開発に従事されています。今回使われているコンパイル最適化の多くは、一般的なC++コンパイラーで使われている手法とのこと。次期バージョンは2018年中には公開予定だそうです。