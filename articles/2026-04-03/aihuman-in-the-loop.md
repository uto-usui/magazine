---
title: "AIエージェントのHuman-in-the-Loop評価を深化させる"
source: "https://tech.layerx.co.jp/entry/2026/04/01/150000"
publishedDate: "2026-04-01"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "shibuiyusuke"
---

## 宣伝

LayerXでは2026/04/11~26開催の技術書典20でLayerX TeckBook 2を発売します。そちらにも記事を寄稿していますので、もし良ければご一読いただけると幸いです。

[techbookfest.org](https://techbookfest.org/)

## はじめに

LayerX Ai Workforce事業部R&Dチームマネージャーの澁井（しぶい）と申します。

本記事はAIエージェントのHuman-in-the-Loopを定量評価するための手法やビジネス価値を検討します。

AIエージェントによる業務効率化やソフトウェア開発自動化が進むに従って、AIエージェントのアウトプットを人間が確認してアクションすることが増えていると思います。こうしたAIエージェントに対する人間の確認や行動、承認をHuman-in-the-Loopと言います。

Human-in-the-Loop（以下HITL）はAIエージェントを安定稼働させるために人間が介在してAIエージェントにフィードバックを送る仕組みです。HITLは安全性や説明責任を担保する重要な仕組みである一方、人間の確認コストも伴います。したがって「減らすこと」自体を目的にするのではなく、**リスクに応じて介入の強さとタイミングを設計すること**が重要です。その評価指標として以下のようなものが考えられます。

-   HITL回数：AIエージェントの1セッションで発生したHITLの回数。
-   HITL必要率：HITLを実施した回数のうち、本当にHITLが必要だった率。
-   HITLの待機時間：人間がHITLにレスポンスするまでの時間。
-   HITLの承認後エラー率：人間が承認したにもかかわらず、エラーになった処理の率。
-   HITL見逃し修復コスト：AIエージェントがHITLを起動すべきだったのにしなかった場合の修復コスト。
-   その他・・・

これらメトリクスについては先日、[筆者個人でテックブログ](https://qiita.com/cvusk/items/fe61b526babf45429ba1)で整理して公開しました。

[AIエージェントのHuman-in-the-Loopを定量評価する](https://qiita.com/cvusk/items/fe61b526babf45429ba1)

しかし、こうしたメトリクスを正確に計測できるようになっても、それだけでは答えられない問いがあります。

-   HITLが1件少なかった場合と1件多かった場合、どちらがより深刻な問題か？
-   個々のHITLは適切でも、全体として人間の判断品質を劣化させていないか？
-   本当にこのHITLは必要か？

これらの問いに答えるには、メトリクスの「計測」を超えた「分析フレームワーク」が必要です。本記事では、**評価の非対称性**と**評価の総体性**という2つの分析軸を導入し、HITLメトリクスを実践的な意思決定ツールに昇華させる方法を解説します。

この記事を読むと、以下のことが得られます。

-   「見逃し」と「過検出」を非対称に評価する損失関数の設計方法
-   「理想のHITL回数」をどうラベリングするかの実務手順
-   HITL発生パターンの類型化とHITL間の相互作用の分析手法

**前提知識**: HITLを運用し評価方法を理解していることを想定しています。

* * *

## 1\. 評価の非対称性：「1件足りない」と「1件多い」は同じ重さではない

### 1-1. RMSEが見落とすもの

HITLの回数を評価するとき、最も素朴なアプローチは「理想のHITL回数」と「実際のHITL回数」の誤差を測ることです。RMSE（二乗平均平方根誤差）やMAE（平均絶対誤差）がその候補になるでしょう。または2値分類と捉えて、Precision/Recallで評価するかもしれません。

しかし、これらの指標には本質的な盲点があります。理想から「1件少ない」ことと「1件多い」ことを、同じ大きさの誤差として扱ってしまう点です。

RMSEの式を見ればこれは明らかです。

![ \displaystyle
\text{RMSE} = \sqrt{ \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2 }
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5Ctext%7BRMSE%7D%20%3D%20%5Csqrt%7B%20%5Cfrac%7B1%7D%7Bn%7D%20%5Csum_%7Bi%3D1%7D%5E%7Bn%7D%20%28%5Chat%7By%7D_i%20-%20y_i%29%5E2%20%7D%0A)

二乗によって誤差の「方向」が失われるため、+1の誤差と−1の誤差は同じ重みになります。

実際にはこの2つは質的にまったく異なる問題を引き起こします。

**HITLが少なすぎる場合（下振れ）** は、人間が確認すべきだったリスクの見逃しです。見逃されたリスクは、障害、データ損失、セキュリティインシデント、法的問題など、損害が非線形に拡大する可能性を持ちます。本番DBへの破壊的マイグレーションが人間のレビューなしに実行されれば、その1件の見逃しの損害は計り知れません。

**HITLが多すぎる場合（上振れ）** は、人間の工数浪費とエージェントの待機時間増大です。これは確かにコストですが、その損害は比較的線形で予測可能です。不要なHITLが10件あれば、おおよそ10件分の人件費と待機コストが失われます。

つまりHITLの誤差は、方向によって損害のスケールが根本的に異なるのです。下振れは「爆発的なリスク」、上振れは「じわじわとしたコスト」。この非対称性を無視した評価指標は、最も重要な情報を捨てています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shibuiyusuke/20260331/20260331064041.png)

### 1-2. 非対称な損失関数で評価する

誤差の方向に応じて異なるペナルティを与える「非対称損失関数」を導入します。

まず誤差 ![ \Delta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20) を以下のように定義します。

![ \displaystyle
\Delta = \text{実際のHITL回数} - \text{理想のHITL回数}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5CDelta%20%3D%20%5Ctext%7B%E5%AE%9F%E9%9A%9B%E3%81%AEHITL%E5%9B%9E%E6%95%B0%7D%20-%20%5Ctext%7B%E7%90%86%E6%83%B3%E3%81%AEHITL%E5%9B%9E%E6%95%B0%7D%0A)

![ \Delta \lt 0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20%5Clt%200%20) なら下振れ（HITLが足りない）、![ \Delta \gt 0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20%5Cgt%200%20) なら上振れ（HITLが多すぎる）です。この ![ \Delta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20) に対して、方向別にペナルティを変える損失関数を設計します。

![ \displaystyle
L(\Delta) = \begin{cases} \alpha \cdot |\Delta|^{\gamma} & (\Delta \lt 0 : \text{下振れ}) \\\\ \beta \cdot |\Delta| & (\Delta \gt 0 : \text{上振れ}) \end{cases}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AL%28%5CDelta%29%20%3D%20%5Cbegin%7Bcases%7D%20%5Calpha%20%5Ccdot%20%7C%5CDelta%7C%5E%7B%5Cgamma%7D%20%26%20%28%5CDelta%20%5Clt%200%20%3A%20%5Ctext%7B%E4%B8%8B%E6%8C%AF%E3%82%8C%7D%29%20%5C%5C%5C%5C%20%5Cbeta%20%5Ccdot%20%7C%5CDelta%7C%20%26%20%28%5CDelta%20%5Cgt%200%20%3A%20%5Ctext%7B%E4%B8%8A%E6%8C%AF%E3%82%8C%7D%29%20%5Cend%7Bcases%7D%0A)

ここで3つのパラメータが登場します。

-   ![ \alpha ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20)：下振れペナルティ係数（リスク見逃しの重み）
-   ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20)：上振れペナルティ係数（工数浪費の重み）
-   ![ \gamma ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cgamma%20)：下振れの非線形指数

設計の要点は以下の3つです。

**第一に、![ \alpha \gt \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20%5Cgt%20%5Cbeta%20) とする。** リスク見逃し（下振れ）の損害は、工数浪費（上振れ）の損害よりも一般に大きいためです。本番環境での障害1件の損害は、不要なHITL10件分の人件費を容易に超えます。

**第二に、![ \gamma \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cgamma%20%5Cgt%201%20) とする。** 下振れが連続すると、リスクが単純に積み上がるのではなく複合的に拡大するためです。見逃しが1件なら軽微な修正で済むかもしれませんが、5件連続で見逃すとシステム全体が不整合な状態に陥り、修復コストが加速度的に増大します。

![ \gamma = 2 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cgamma%20%3D%202%20) であれば、見逃し5件の損害は見逃し1件の25倍として評価されます（ ![ 5*5 / 1 = 25 ](https://chart.apis.google.com/chart?cht=tx&chl=%205%2A5%20%2F%201%20%3D%2025%20) ）。一方、上振れ側は指数が1（線形）です。不要なHITLが3件でも5件でも、損害は件数に比例した工数浪費であり、相互に増幅し合うことは少ないからです。ただし、Fatigue効果による判断品質の劣化という間接的な増幅はありえます。これについては第2章で後述します。

**第三に、パラメータはHITLカテゴリごとに変える。** セキュリティ関連のHITLであれば ![ \alpha = 10, \gamma = 2 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20%3D%2010%2C%20%5Cgamma%20%3D%202%20) として見逃しを極端に厳しく評価し、ドキュメントの体裁確認であれば ![ \alpha = 1.5, \gamma = 1.0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20%3D%201.5%2C%20%5Cgamma%20%3D%201.0%20) として上振れとの差を小さくする、という具合です。

なお、これらの数値はあくまで**初期値**です。実際の運用では、過去のインシデントデータや事後レビューの結果をもとに校正していく必要があります。たとえば「セキュリティHITLの見逃し1件あたりの平均インシデントコストが500万円、不要なHITL1件あたりの人件費が5,000円」というデータがあれば、 ![ \alpha / \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20%2F%20%5Cbeta%20) の比率に現実的な根拠を与えられます。

この非対称損失関数の形を視覚的にイメージすると、原点（![ \Delta = 0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20%3D%200%20)、理想通り）の左側（下振れ）は急峻な曲線が立ち上がり、右側（上振れ）は緩やかな直線が伸びる、左右非対称なV字型のグラフになります。

### 1-3. 見逃しと過検出の非対称な二値分類

HITLの回数だけでなく、HITLのトリガー判定そのものにも非対称性があります。

エージェントがHITLを起動するかどうかの判定は、本質的に二値分類問題です。そしてこの分類には4つの結果があります。

実際にHITLが必要だった

実際にHITLは不要だった

**エージェントがHITLを起動した**

適切な介入（True Positive）

人間の工数浪費（False Positive）

**エージェントがHITLを起動しなかった**

リスク見逃し（False Negative）

効率的な自律実行（True Negative）

機械学習の評価でおなじみのF1スコアは、PrecisionとRecallを等しく重み付けします。しかしHITLの文脈では、False Negative（必要なHITLを起動しなかった＝リスク見逃し）の損害が、False Positive（不要なHITLを起動した＝工数浪費）の損害を上回ることが多いと言えます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shibuiyusuke/20260331/20260331072304.png)

ここでは[Fβスコア](https://ai-compass.weeybrid.co.jp/algorizm/f%CE%B2-score-a-key-metric-in-machine-learning/)が有効でしょう。![ F_{\beta} ](https://chart.apis.google.com/chart?cht=tx&chl=%20F_%7B%5Cbeta%7D%20) スコアは以下の式で定義されます。ここでの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) は前節の損失関数の上振れ係数とは別の変数で、Fβスコアにおける**Recallの重み付けパラメータ**です（混同を避けるため以降は「Fβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) 」と明記します）。

![ \displaystyle
F_{\beta} = (1 + \beta^2) \cdot \frac{\text{Precision} \cdot \text{Recall}}{\beta^2 \cdot \text{Precision} + \text{Recall}}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AF_%7B%5Cbeta%7D%20%3D%20%281%20%2B%20%5Cbeta%5E2%29%20%5Ccdot%20%5Cfrac%7B%5Ctext%7BPrecision%7D%20%5Ccdot%20%5Ctext%7BRecall%7D%7D%7B%5Cbeta%5E2%20%5Ccdot%20%5Ctext%7BPrecision%7D%20%2B%20%5Ctext%7BRecall%7D%7D%0A)

ここで Precision と Recall はそれぞれ以下です。

![ \displaystyle
\text{Precision} = \frac{TP}{TP + FP} \quad,\quad \text{Recall} = \frac{TP}{TP + FN}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5Ctext%7BPrecision%7D%20%3D%20%5Cfrac%7BTP%7D%7BTP%20%2B%20FP%7D%20%5Cquad%2C%5Cquad%20%5Ctext%7BRecall%7D%20%3D%20%5Cfrac%7BTP%7D%7BTP%20%2B%20FN%7D%0A)

Fβの ![ \beta = 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%3D%201%20) のとき標準的なF1スコア（PrecisionとRecallを等しく重視）となり、Fβの ![ \beta \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%5Cgt%201%20) ではRecallの重みが増します。具体的には、Fβの ![ \beta = 2 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%3D%202%20) であればRecallをPrecisionの **4倍** 重視する評価になります（ ![ \beta * \beta = 4 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%2A%20%5Cbeta%20%3D%204%20) が Precision の項にかかるため）。

厄介なのは、ここでの「1件」が同じ重さではないことです。本番デプロイ承認の見逃し1件と、ドキュメント確認の無駄打ち1件では、現場が受ける痛みがまるで違います。一律のF1スコアにまとめると、その差がきれいに均されてしまいます。

したがって、Fβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) もHITLカテゴリごとに使い分けるべきです。本番デプロイの承認のような高リスクHITLではFβの ![ \beta \geq 3 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%5Cgeq%203%20) として見逃しを極端に厳しく評価し、ドキュメントの体裁確認のような低リスクHITLではFβの ![ \beta = 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20%3D%201%20) （標準的なF1スコア）で十分です。

ここでも閾値は初期値であり、実際の運用データをもとに校正します。たとえば、高リスクHITLでFalse Negativeが1件でも発生した場合はFβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) を引き上げ、逆にFalse Positiveが業務を圧迫しているならFβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) を下げる、という調整サイクルを回します。

### 1-4. タイミングにおける非対称性

非対称性は「回数」だけでなく「タイミング」にも存在します。「早すぎるHITL」と「遅すぎるHITL」は、異なる種類の損害をもたらします。

**早すぎるHITL** は、エージェントがまだ十分な作業を進めていない段階で人間に確認を求めるケースです。このとき人間は、判断に必要な情報が揃っていない状態で判断を強いられます。結果として判断品質が下がるか、「もう少し進めてから聞いてくれ」と差し戻す余分なやり取りが発生します。損害の性質は「人間の時間浪費と判断品質の低下」であり、比較的線形です。

**遅すぎるHITL** は、エージェントが大きく進行した後に人間に確認を求めるケースです。もし修正が必要なら、手戻りのコストは進行量に比例して増大します。1時間分の作業をやり直すのと1週間分の作業をやり直すのでは、まったく話が違います。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shibuiyusuke/20260331/20260331073355.png)

さらに厄介なのは、進行中に他のタスクやコンポーネントとの依存関係が形成されるため、手戻りの影響範囲が超線形的に拡大することです。

これを損失関数として表すと、回数の非対称性と同じ構造が見えてきます。

![ \displaystyle
L_{\text{timing}}(\Delta t) = \begin{cases} c_{\text{early}} \cdot |\Delta t| & (\Delta t \lt 0 : \text{早すぎる}) \\\\ c_{\text{late}} \cdot |\Delta t|^{\delta} & (\Delta t \gt 0 : \text{遅すぎる},\ \delta \gt 1) \end{cases}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AL_%7B%5Ctext%7Btiming%7D%7D%28%5CDelta%20t%29%20%3D%20%5Cbegin%7Bcases%7D%20c_%7B%5Ctext%7Bearly%7D%7D%20%5Ccdot%20%7C%5CDelta%20t%7C%20%26%20%28%5CDelta%20t%20%5Clt%200%20%3A%20%5Ctext%7B%E6%97%A9%E3%81%99%E3%81%8E%E3%82%8B%7D%29%20%5C%5C%5C%5C%20c_%7B%5Ctext%7Blate%7D%7D%20%5Ccdot%20%7C%5CDelta%20t%7C%5E%7B%5Cdelta%7D%20%26%20%28%5CDelta%20t%20%5Cgt%200%20%3A%20%5Ctext%7B%E9%81%85%E3%81%99%E3%81%8E%E3%82%8B%7D%2C%5C%20%5Cdelta%20%5Cgt%201%29%20%5Cend%7Bcases%7D%0A)

![ \Delta t ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5CDelta%20t%20) はHITLの理想タイミングからのずれであり、![ c_{\text{late}} \gt c_{\text{early}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20c_%7B%5Ctext%7Blate%7D%7D%20%5Cgt%20c_%7B%5Ctext%7Bearly%7D%7D%20) かつ ![ \delta \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdelta%20%5Cgt%201%20) です。遅すぎるHITLは進行量に対して超線形（ ![ \delta \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdelta%20%5Cgt%201%20) ）にペナルティが増大する一方、早すぎるHITLのペナルティは線形にとどまります。回数における非対称性（下振れ＝非線形、上振れ＝線形）と構造的に同じパターンです。

### 1-5. 非対称性を前提とした設計思想

ここまでの議論から浮かび上がる設計思想は、**HITLの評価体系は、「見逃し側を厳しく評価する」というバイアスを意図的に組み込むことを最初に検討する**ということです。

回数の評価では、下振れペナルティを上振れペナルティよりも大きく、かつ非線形に設定する（ ![ \alpha \gt \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Calpha%20%5Cgt%20%5Cbeta%20)、![ \gamma \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cgamma%20%5Cgt%201%20) ）。トリガー判定の評価では、![ F_{\beta} ](https://chart.apis.google.com/chart?cht=tx&chl=%20F_%7B%5Cbeta%7D%20) スコアのFβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) を1より大きくしてRecall寄りにする。タイミングの評価では、遅すぎるHITLのペナルティを早すぎるHITLよりも大きく、かつ非線形に設定する（ ![ c_{\text{late}} \gt c_{\text{early}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20c_%7B%5Ctext%7Blate%7D%7D%20%5Cgt%20c_%7B%5Ctext%7Bearly%7D%7D%20)、![ \delta \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdelta%20%5Cgt%201%20) ）。

これは「安全寄りのバイアス」であり、短期的には不要なHITLが残存するコストを許容することを意味します。しかし、そのコストは見逃しによるインシデントのコストと比較すれば桁違いに小さい。この非対称性を数値化して明示することが、HITLの設計と運用を合理的に改善するための出発点になります。

ただし、ここで強調しておきたいのは、**P/L的な効率化はHITL評価の一視点にすぎない**ということです。法務コンプライアンスや安全性の担保は、コスト削減と天秤にかけるものではなく、非代替の制約条件として扱うべきです。たとえば規制上必須のHITLは、Override Rateがゼロでも廃止の対象にはなりません。

各パラメータはHITLカテゴリのリスクレベルに応じて動的に調整することで、「高リスクHITLでは安全寄り、低リスクHITLでは効率寄り」というメリハリをつけることが可能です。一律の厳しさは不要なコストを生み、一律の緩さはリスクを見逃します。非対称性の認識は、この「メリハリ」を合理的に設計するための土台です。

さらに言うと、本番システムでは初期のうちに見逃さないようにセンシティブに評価することで、AIエージェントシステムで発生するHITLやリスクを網羅的に把握することができるようになります。最初から緩くHITLを実践していると、そうしたリスクを見逃し、未知の損失を生んでしまう可能性があります。いずれ甘受するリスクでも、知っておくことが重要なのです。

* * *

## 2\. 評価の総体性と多面性：個別最適の罠を超える

### 2-1. 個々のHITLを独立に評価しても見えないもの

前章ではHITLの非対称性を分析しましたが、ここでもう一つの根本的な問題があります。それは、**個々のHITLを独立に評価するだけでは、システム全体のダイナミクスを捉えられない**ということです。

たとえば、以下のようなケースを考えてみてください。

あるHITLが単体で見ると不要に思える（ほとんど確認せずに承認している）場合でも、そのHITLの存在が後続のHITLの品質を支えていることがあります。「この確認があるから、次のもっと重要な確認の時点でコンテキストが揃っている」という暗黙の依存関係です。このHITLを廃止すると、後続のエージェント処理やHITLが崩壊するかもしれません。

逆に、個々には適切に見えるHITLの集合が、全体として人間の判断疲労を引き起こし、後半のHITLの品質を劣化させていることもあります。各HITLは良好でも、1日の後半になると未確認承認率が急上昇している。これは個別のメトリクスだけでは検出できません。

HITLの評価は、エージェント利用の全体的な文脈の中で初めて意味を持ちます。

### 2-2. HITL発生パターンの類型化

HITLの全体像を捉えるために有効なのが、HITL発生の時間分布パターンを類型化するアプローチです。X軸にエージェントの稼働時間、Y軸にHITLの累積発生回数をプロットした散布図を基本として、4つの典型的なパターンに分類します。

以下に4パターンの概要をまとめます。

パターン

特徴

利点

リスク

A: 集中型

特定タイミングにHITLが固まる

人間がまとめて対応しやすい

集中期間の「間」の見逃し

B: 分散型

稼働期間全体に均等分布

各フェーズで人間が関与

常時割り込み、判断疲労

C: フロントローディング型

初期に集中、後半減少

初期確認後は自律進行

後半のリスク見逃し

D: ランダムバースト型

予測不能にバースト

なし

最も問題が大きい

それぞれの検出方法を見ていきます。

#### パターンA：集中型（Clustered）

HITLがエージェント稼働期間中の特定のタイミングに集中して発生するパターンです。タスクのフェーズ切り替わりや、外部APIとの連携処理の前後にHITLが固まるケースが該当します。

人間側が確認タイミングを予測しやすくコンテキストスイッチのコストが低い一方、集中期間の「間」に本来確認すべき判断がスルーされるリスクがあります。

検出には、時間ビンごとのHITL発生数にGini係数を適用します。稼働時間を ![ n ](https://chart.apis.google.com/chart?cht=tx&chl=%20n%20) 個のビンに分割し、各ビンのHITL発生数を昇順に並べた値を ![ x_1 \leq x_2 \leq \cdots \leq x_n ](https://chart.apis.google.com/chart?cht=tx&chl=%20x_1%20%5Cleq%20x_2%20%5Cleq%20%5Ccdots%20%5Cleq%20x_n%20) とすると、

![ \displaystyle
G = \frac{\sum_{i=1}^{n} (2i - n - 1) \cdot x_i}{n \cdot \sum_{i=1}^{n} x_i}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AG%20%3D%20%5Cfrac%7B%5Csum_%7Bi%3D1%7D%5E%7Bn%7D%20%282i%20-%20n%20-%201%29%20%5Ccdot%20x_i%7D%7Bn%20%5Ccdot%20%5Csum_%7Bi%3D1%7D%5E%7Bn%7D%20x_i%7D%0A)

![ G \approx 0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20G%20%5Capprox%200%20) なら均等分散、![ G \approx 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20G%20%5Capprox%201%20) なら極端に集中しています。初期値として ![ G \gt 0.6 ](https://chart.apis.google.com/chart?cht=tx&chl=%20G%20%5Cgt%200.6%20) を集中型の判定目安としますが、ビン幅やセッション長によって適切な閾値は変わるため、自チームのデータで校正してください。

#### パターンB：分散型（Distributed）

HITLが稼働期間全体にわたって均等に発生するパターンです。各フェーズで人間が関与できるためリスク見逃しは少ないですが、人間側は常に割り込みに備える必要があり、集中力の悪化や本来業務への悪影響が懸念されます。

検出には、HITL間の到着間隔の変動係数（CV）が使えます。到着間隔を ![ d_1, d_2, \ldots, d_m ](https://chart.apis.google.com/chart?cht=tx&chl=%20d_1%2C%20d_2%2C%20%5Cldots%2C%20d_m%20) とすると、

![ \displaystyle
CV = \frac{\sigma(d)}{\mu(d)}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0ACV%20%3D%20%5Cfrac%7B%5Csigma%28d%29%7D%7B%5Cmu%28d%29%7D%0A)

![ CV \lt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20CV%20%5Clt%201%20) なら規則的な分散、![ CV \approx 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20CV%20%5Capprox%201%20) ならポアソン的なランダム到着、![ CV \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20CV%20%5Cgt%201%20) ならバースト的な集中を示します。

#### パターンC：フロントローディング型（Front-Loaded）

初期にHITLが集中し後半に減少するパターンです。初期に方向性を確認した後エージェントが自律的に進行する、多くの場合理想的なパターンです。ただし外部環境の変化やエージェントのドリフトが起きた場合、後半にもHITLが必要になることがあります。

検出には前半50%の稼働時間におけるHITL発生比率を見ます。

![ \displaystyle
FLI = \frac{\text{前半50\%の稼働時間で発生したHITL数}}{\text{総HITL数}}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AFLI%20%3D%20%5Cfrac%7B%5Ctext%7B%E5%89%8D%E5%8D%8A50%5C%25%E3%81%AE%E7%A8%BC%E5%83%8D%E6%99%82%E9%96%93%E3%81%A7%E7%99%BA%E7%94%9F%E3%81%97%E3%81%9FHITL%E6%95%B0%7D%7D%7B%5Ctext%7B%E7%B7%8FHITL%E6%95%B0%7D%7D%0A)

![ FLI = 0.5 ](https://chart.apis.google.com/chart?cht=tx&chl=%20FLI%20%3D%200.5%20) なら完全均等、![ FLI \to 1.0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20FLI%20%5Cto%201.0%20) ほど前半に集中しています。初期値として ![ FLI \gt 0.7 ](https://chart.apis.google.com/chart?cht=tx&chl=%20FLI%20%5Cgt%200.7%20) をフロントローディング型の判定目安としますが、Gini係数と同様にデータで校正が必要です。

#### パターンD：ランダムバースト型（Random Burst）

予測不可能なタイミングでHITLが突発的に固まって発生するパターンです。これは最も問題が大きいと考えます。人間がタイミングを予測できず、バースト的に大量のHITLが来ると判断疲労が一気に進行します。

原因としては、エージェントの状態遷移の不安定さ、HITLトリガー設計の非一貫性、外部依存（APIの応答タイミング等）へのHITLの連動などが考えられます。

検出にはBurstiness指標 ![ B ](https://chart.apis.google.com/chart?cht=tx&chl=%20B%20) が使えます。

![ \displaystyle
B = \frac{\sigma(d) - \mu(d)}{\sigma(d) + \mu(d)}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0AB%20%3D%20%5Cfrac%7B%5Csigma%28d%29%20-%20%5Cmu%28d%29%7D%7B%5Csigma%28d%29%20%2B%20%5Cmu%28d%29%7D%0A)

![ B = -1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20B%20%3D%20-1%20) は完全に規則的、![ B = 0 ](https://chart.apis.google.com/chart?cht=tx&chl=%20B%20%3D%200%20) はポアソン的なランダム、![ B = +1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20B%20%3D%20%2B1%20) は極度のバースト性を示します。CVと組み合わせ、![ CV \gt 1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20CV%20%5Cgt%201%20) かつ ![ B \gt 0.3 ](https://chart.apis.google.com/chart?cht=tx&chl=%20B%20%5Cgt%200.3%20) のようなケースをランダムバースト型として検出します。

#### パターン類型化の実用的な意味

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shibuiyusuke/20260331/20260331074032.png)

これら4パターンの分類は単なる技術的な整理ではありません。パターンごとに適した対策が異なります。

集中型であれば、集中期間の「間」にスポットチェック的なHITLの追加を検討します。分散型であれば、HITLをまとめる仕組みを導入して人間の割り込みを低減します。フロントローディング型であれば、後半の自律実行の安全性をモニタリングで補完します。ランダムバースト型であれば、まずトリガー設計を見直してバースト性の原因を解消することが最優先です。

エージェントの改善サイクルの中で、このパターンが週次・月次でどう変化しているかを追跡することが重要です。理想的には、成熟に伴ってランダムバースト型からフロントローディング型に遷移していくよう改善サイクルを回していくと良いでしょう。

### 2-3. HITL間の相互作用：イベントは独立ではない

総体的な評価でもう一つ見逃せないのが、HITL同士の相互作用です。HITLは独立したイベントではなく、互いに影響し合います。大きく3つのパターンに分類できるでしょう。

#### 依存型カスケード

あるHITLの判断結果が、後続のHITLの内容や必要性を変えるパターンです。

典型的なのは上流の設計判断のHITLです。「マイクロサービスで行くか、モノリスで行くか」というアーキテクチャ選択のHITLの判断が、「ライブラリの選定」「インフラ構成」「テスト戦略」に関するHITLを連鎖的に発生させます。

上流のHITLの品質が下流の全HITLに波及するため、カスケードの起点には特に高い情報品質の確保が必要です。

![ \displaystyle
\text{Cascade Impact} = \sum_{j \in \text{downstream}} \text{Cost}_j \times P(\text{error at upstream})
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5Ctext%7BCascade%20Impact%7D%20%3D%20%5Csum_%7Bj%20%5Cin%20%5Ctext%7Bdownstream%7D%7D%20%5Ctext%7BCost%7D_j%20%5Ctimes%20P%28%5Ctext%7Berror%20at%20upstream%7D%29%0A)

#### 競合型干渉

短時間に複数のHITLが発生し、人間の注意力を奪い合うパターンです。

10件のHITLがそれぞれ個別に見れば2分で処理可能だとしても、20分間連続で対応すると人間の疲労が上昇し、後半の数件は無意識に判断してしまうかもしれません。個々のHITLのメトリクスは良好でも、全体の判断品質は劣化しているのです。

![ \displaystyle
\text{Interference Cost} = N_{\text{window}} \times r_{\text{fatigue}} \times \bar{V}_{\text{decision}}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5Ctext%7BInterference%20Cost%7D%20%3D%20N_%7B%5Ctext%7Bwindow%7D%7D%20%5Ctimes%20r_%7B%5Ctext%7Bfatigue%7D%7D%20%5Ctimes%20%5Cbar%7BV%7D_%7B%5Ctext%7Bdecision%7D%7D%0A)

![ N_{\text{window}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20N_%7B%5Ctext%7Bwindow%7D%7D%20) はウィンドウ内のHITL件数、![ r_{\text{fatigue}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20r_%7B%5Ctext%7Bfatigue%7D%7D%20) は品質劣化率、![ \bar{V}_{\text{decision}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbar%7BV%7D_%7B%5Ctext%7Bdecision%7D%7D%20) は判断1件あたりの平均価値です。「1時間に5件を超えると、5件目以降のOverride Rateが顕著に低下する」のような閾値が見えてくれば、タイミング設計やローテーションの根拠になります。

#### 補完型シナジー

あるHITLでの文脈理解が、後続のHITLの対応を効率化するパターンです。

同一プロジェクトに関する最初のHITLで背景を把握した人間は、2回目以降の応答時間が短くなり判断品質も高くなります。これは「同一人物が同一プロジェクトのHITLを一貫して担当する」ことの定量的な価値を示します。

![ \displaystyle
\text{Synergy Gain} = (T_1 - T_k) \times C_{\text{hourly}}
](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cdisplaystyle%0A%5Ctext%7BSynergy%20Gain%7D%20%3D%20%28T_1%20-%20T_k%29%20%5Ctimes%20C_%7B%5Ctext%7Bhourly%7D%7D%0A)

![ T_1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20T_1%20) は初回HITLの応答時間、![ T_k ](https://chart.apis.google.com/chart?cht=tx&chl=%20T_k%20) は ![ k ](https://chart.apis.google.com/chart?cht=tx&chl=%20k%20) 回目の応答時間、![ C_{\text{hourly}} ](https://chart.apis.google.com/chart?cht=tx&chl=%20C_%7B%5Ctext%7Bhourly%7D%7D%20) は担当者の時間単価です。担当者が頻繁に交代するプロジェクトでは、毎回のHITLが ![ T_1 ](https://chart.apis.google.com/chart?cht=tx&chl=%20T_1%20) と同じコストになり、シナジーが失われていることが可視化できます。

### 2-4. 総体評価のためのプラクティス

以上を踏まえた、総体的なHITL評価のための3つのプラクティスをまとめます。

**1\. 散布図を基本とし、集計値は補助**

平均値や合計値は分布を隠します。HITL回数×稼働時間の散布図、応答時間×品質スコアの散布図を基本とし、平均値はその上に重ねるアノテーション程度の扱いにとどめます。異常値や外れ値こそが改善のヒントであり、集計値だけでは重要なシグナルを見逃しかねません。

**2\. 時間軸を常に持つ**

HITLの価値は時間的文脈に依存します。すべてのメトリクスは時系列として表示可能であることを前提とし、トレンドとパターンの変化を追跡します。先月まで分散型だったパターンが今月ランダムバースト型に変わっていれば、何かが壊れている兆候です。

**3\. ドリルダウン構造を持つ**

全体の概要 → カテゴリ別の内訳 → 個別のHITLイベント、という階層で掘り下げられる構造にします。経営者は全体概要を、開発者は個別イベントを起点に分析できるようにします。

* * *

## まとめ

本記事では、HITLメトリクスの「計測」を超えた「分析フレームワーク」を検討し、提案しました。

-   **評価の非対称性**。HITLが少なすぎる（見逃し）ことと多すぎる（過検出）ことは等価ではなく、見逃し側を非線形に厳しく評価する損失関数が必要となるケースが多々あります。この非対称性は、回数だけでなくトリガー判定やタイミングにも存在します。![ F_{\beta} ](https://chart.apis.google.com/chart?cht=tx&chl=%20F_%7B%5Cbeta%7D%20) スコアのFβの ![ \beta ](https://chart.apis.google.com/chart?cht=tx&chl=%20%5Cbeta%20) 値をカテゴリ別に設定することで、高リスクHITLと低リスクHITLにメリハリをつけられます。
    
-   **評価の総体性**。個々のHITLを独立に評価するだけでは、時間分布パターン（集中型/分散型/フロントローディング型/バースト型）やHITL間の相互作用（カスケード/干渉/シナジー）が見えません。パターンの類型化と相互作用の分析により、総体的な評価が可能になります。
    

AIエージェントが実業務に組み込まれるに従って、HITLを実践するケースは増えていくでしょう。そしてHITLは人間の時間を使うからこそ、定量的にその価値と最適化を評価し、改善していくことが求められます。本記事がHITLを改善し、AIエージェントをより効率的に活用する一助になると幸いです。