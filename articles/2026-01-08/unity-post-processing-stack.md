---
title: "Unity Post Processing Stackで作る光芒エフェクト"
source: "https://ics.media/entry/19728/"
publishedDate: "2019-01-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Unityでコンテンツを開発されている方は、[**Post Processing Stack**](https://docs.unity3d.com/2018.3/Documentation/Manual/PostProcessing-Stack.html)というアセットを一度は耳にしたことがあるでしょう。Unity Technologiesが公式にリリースしているアセットで、ブルームエフェクトや、被写界深度エフェクト、カラーグレーディングなどさまざまなポストエフェクトが備わっています。本記事では**Post Processing Stackで光芒エフェクトを作る方法**について解説します。

### 今回作成するエフェクト

![画像タイトル](https://ics.media/entry/19728/images/190116_unity_postprocess_0.png)

![画像タイトル](https://ics.media/entry/19728/images/190116_unity_postprocess_1.png)

### サンプルファイル

GitHubにて本記事のサンプルファイルを公開しています。記事の内容と合わせてご確認ください。

-   [Unityプロジェクトのサンプルファイルを確認する](https://github.com/ics-creative/190116_unity_postprocess)

### Post Processing Stackでエフェクトを作成するメリットとは？

Unity 2018から**Scriptable Render Pipeline**というプロジェクトテンプレートが追加されました（以下SRP）。**高画質レンダーパイプライン（High Definition Render Pipeline）**、**軽量レンダーパイプライン（Lightweight Render Pipeline）**、**VR軽量レンダーパイプライン（VR Lightweight Render Pipeline）**  
が選択可能です。

-   **高画質レンダーパイプライン**：Shader Model 5.0（DX11以上）をサポートするプラットフォーム向け開発
-   **軽量レンダーパイプライン**：コンピュートシェーダー機能を持たないモバイルプラットフォーム向け開発
-   **VR軽量レンダーパイプライン**：VRプラットフォーム向け開発

**ポストエフェクト処理をPost Processing Stackの拡張として作成するメリット**はどこにあるでしょうか？　それはずばり、**SRPのUnityプロジェクトでも動作が可能**な点です。**SRPのプロジェクトでは、カメラオブジェクトのレンダリングをオーバーライドしたカスタムエフェクトが作成できない**ため、ポストエフェクトには一工夫必要です。Post Processing Stackとしてエフェクトを作成しておくことで、異なるプロジェクトでも使用しやすい、**汎用的なエフェクトを構築**できます。今後はSRPを用いたプロジェクトが増えると考えられるため、Post Processing Stackのカスタマイズ方法を覚えておいて損はないでしょう。

### Post Processing Stackによるカスタムエフェクトの作り方

![画像タイトル](https://ics.media/entry/19728/images/190116_unity_postprocess_2.jpg)

本記事ではカスタムエフェクトを作成する概要にしぼって解説します。Unity-Technologiesの公式Wikiページ「[Writing Custom Effects](https://github.com/Unity-Technologies/PostProcessing/wiki/Writing-Custom-Effects)」と合わせてご覧ください。独自にカスタマイズしたポストエフェクトを作成するには、**C#スクリプトとHLSLによるシェーダーが必要**となります。この2つが1セットとなり、1つのカスタムポストエフェクトになります。

#### C#スクリプトの作成

1.  **設定クラスの作成**：PostProcessEffectSettingsクラスを継承したクラスを作成し、ポストエフェクトの各パラメーターを設定します。（例：Starクラス）
2.  **レンダラークラスの作成**：PostProcessEffectRendererクラスを継承したクラスを作成し、Renderメソッドをオーバーライドしレンダリングします。（例：StarRendererクラス）

#### シェーダー（HLSL）の作成

1.  頂点シェーダーとフラグメントシェーダーを作成します。

#### Tips：ポストエフェクトの適用順

**設定クラスのPostProcess属性**を定義すると、ビルトインで備わっているポストエフェクト（たとえばBlurなど）との適用順を変更できます。ここは大事なポイントでしょう。

1.  **BeforeTransparent**：不透明オブジェクトのレンダリング直後にエフェクトをかけたいときに利用。半透明オブジェクトがレンダリングされる前に適用されます。
2.  **BeforeStack**：アンチエイリアスや被写界深度エフェクトなどのビルトインエフェクトの前に適用されます。
3.  **AfterStack**：ビルトインのエフェクト後、かつFXAAなどのアンチエイリアス処理の前に適用されます。

### 光芒エフェクトの原理

![画像タイトル](https://ics.media/entry/19728/images/190116_unity_postprocess_3.jpg)

光芒エフェクトの原理をかいつまんで解説します。レンダリングされたシーンを「入力ソース」、最終的に出力するテクスチャーを「出力ソース」と呼びます。

#### ステップ1：輝度抽出

入力ソースから輝度を抽出してテクスチャー（RT1）にドローします。解像度を指定してテクスチャーサイズを落としておきます。テクスチャー解像度を落とすのは、一時的なメモリ量の削減効果と、ブラー効果を得るためです。（※解像度を段階的に落としながらレンダリングする手法もありますが、今回はその手法を採用していません）

#### 輝度抽出のアルゴリズム

入力ソースから輝度を抽出するシェーダーコードはこちら。入力ソースのRGB成分と、あるベクトル（float3(0.2126729, 0.7151522, 0.0721750)）との内積から明るさを算出します。緑、赤、青の順に明るくなるロジックとなります。

```
float luminance = dot(color.rgb, float3(0.2126729, 0.7151522, 0.0721750));
```

#### ステップ2：光芒の描画

このステップがメインとなる処理です。

1.  テクスチャー（RT1）を元に、UV座標をずらしながらテクスチャー（RT2）にドロー
2.  テクスチャー（RT2）を元に、UV座標をずらしながらテクスチャー（RT1）にドロー
3.  1～2を複数回繰り返す。これで1本の光の筋が描画されます。

ずらす位置が大きいほど、色を薄くすることでブラー効果も追加します。

#### ステップ3：加算合成

テクスチャー（RT1）を出力ソースに加算合成します。ステップ2～3の処理を、角度をかえて光芒の筋の数だけ繰り返すと、光芒のできあがりです。（筋の数が偶数であれば、一度のドローで両側に描くことで最適化できます）

### まとめ

![画像タイトル](https://ics.media/entry/19728/images/190116_unity_postprocess_4.jpg)

Post Processing Stackのカスタマイズ方法と光芒エフェクトの原理についてご紹介しました。ポストエフェクトはシーンを演出する上で欠かせない存在です。カメラワークを施すUnityの機能、タイムライン（Timeline）やシネマシーン（Cinemachine）とも相性がいいため、Post Processing Stackの利用頻度は高いでしょう。今後ますます目が離せません。