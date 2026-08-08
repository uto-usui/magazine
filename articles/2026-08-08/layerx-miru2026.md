---
title: "LayerX MIRU2026参加レポート"
source: "https://tech.layerx.co.jp/entry/miru2026-report"
publishedDate: "2026-08-07"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "monoke_layerx"
---

機械学習エンジニアの川畑([@monokemonoke](https://x.com/monokemonoke))です。この記事は2026年8月3日〜8月6日に出島メッセ長崎にて開催された[MIRU2026](https://miru-committee.github.io/miru2026/)（第29回 画像の認識・理解シンポジウム）に参加した際のレポートです。LayerX としては昨年に引き続きシルバースポンサーとして協賛させていただき、企業ブースへの出展を行いました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/monoke_layerx/20260807/20260807163507.png)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/monoke_layerx/20260807/20260807101632.jpg)

会場入口の看板

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/monoke_layerx/20260807/20260807105114.jpg)

ロゴも投影されました

## 企業ブース

企業ブースには、学生や企業の方など多くの方にお立ち寄りいただきました。ありがとうございます。 LayerX からはバクラク事業部に所属するエンジニアが参加し、LayerX が目指す Ambient Agent、業務の完全自動運転について、またそこに向けた具体的な取り組みについて幅広くお話ししました。また9月3日に行われる自社カンファレンスの [Bet AI Day 2026](https://layerx.co.jp/events/2026/bet-ai-day/) についてもご紹介しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/monoke_layerx/20260807/20260807102047.png)

企業ブースの様子

## 懇親会

会期中は、現地参加された学生限定のランチ懇親会も開催しました。ランチ懇親会では現役の LayerX メンバーと以下のようなトピックについてカジュアルに話せる場を設け、多くの学生の方にご参加いただきました。

-   普段の業務内容は？
-   何をやっている会社ですか？
-   LayerX に転職した理由は？
-   AI エージェント開発について

学生の方々の研究の話もお聞きでき、非常に楽しかったです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/monoke_layerx/20260807/20260807105551.jpg)

美味しいお刺身をいただきながらさまざまなお話を伺いました。

## 印象に残った発表

僭越ながら、学会内で筆者が聴講したセッションから面白かったものをピックアップして紹介します。

## 招待講演

### IT3B-03: ZINA: Multimodal Fine-grained Hallucination Detection and Editing (CVPR2026)

**Yuiga Wada (Keio Univ., Keio AI Research Center, Carnegie Mellon Univ.), Kazuki Matsuda (Keio Univ.), Komei Sugiura (Keio Univ., Keio AI Research Center), Graham Neubig (Carnegie Mellon Univ.)**

MLLM 出力全般のハルシネーション検出・編集に関する研究です。従来の自動評価手法は全体品質を定量化することでモデル間の性能比較を可能にしたものの、誤りの場所と種類の特定やハルシネーション分析などの詳細評価が苦手でした。そこで提案手法はハルシネーション抽出および編集を行うモデルをグラフ構造に基づくデータ合成を用いて開発し、VLM そのものより高い品質で詳細評価を可能にしています。編集後のテキストを丸ごと生成させるのではなく置換すべきスパンと置換内容だけを出力させる設計、グラフ構造を用いて多様性を確保した合成データ生成などのアイデアが特に勉強になりました。

### IT3B-07 LayerD: Decomposing Raster Graphic Designs into Layers (ICCV2025)

**Tomoyuki Suzuki (CyberAgent), Kang-Jun Liu (Tohoku Univ.), Naoto Inoue, Kota Yamaguchi (CyberAgent)**

バナーなどのグラフィックデザインにおける、ラスタ画像を再編集可能なレイヤーへと分割するタスクに関する研究です。提案手法は一度に全レイヤーを推定するのではなく、遮蔽されていない最前面のレイヤーを一枚ずつ抜き出しては背景を補完するという操作を繰り返しレイヤー分割を行っています。またレイヤー分割の品質評価は正解のレイヤー構造自体が一意に定まらないという課題があります。本研究では正解との一致ではなく、分解そのものの品質を測る指標を新たに設計している点も特徴です。AI の性能向上に伴って評価を行うこと自体が難しくなり、信頼度の高い定量評価をつくる難しさを日々感じています。普段の評価設計と重なる部分が多く勉強になりました。

## オーラルセッション

### OS3B-05: 編集者の意図に基づくナラティブ生成能力評価のための動画編集データセット

**緒方克哉, Zongshang Pang（阪大）, 大谷まゆ（サイバーエージェント）, 中島悠太（阪大）**

単純な動画要約ではなく、メッセージを元にしたストーリーを表現する動画編集タスクについてデータセットを構築した研究です。1つの素材動画に3つのメッセージが紐づき、さらにそれぞれのメッセージを元にプロの動画編集者が動画編集を行いデータを用意しています。 定性評価では、フロンティアモデルでもストーリー性を考慮した構成や自然なカット間の接続には課題が残ることが示されました。メッセージを元にしたストーリー性のある動画編集タスクのように、成果物に求められる品質・条件を意識してデータセットを構築する重要性を感じました。

## インタラクティブセッション

### IS1-045ManuDraw-Bench：製造業の図面読解プロセスに基づくVLM評価ベンチマーク

**由川拳都, 北村博俊, 井上貴晴, 稲葉正樹, 福原吉博（キャディ）**

製造業の現場における2D図面や3D CADデータの読解能力に関するベンチマークを構築した研究です。熟練した技術者が図面を理解するプロセスから4つのカテゴリを定義し、各カテゴリの中にタスクを構成しています。これにより、タスクやドメインに応じてどのVLMを選択すればよいか定量的指針を与えることを実現しています。選定はドメインエキスパートが行うことで質と多様性を担保していることや、記号検出などの個別タスクではVLMの性能が実用レベルには届いていないことなど、評価方法についてとても参考になりました。

### IS3-247: PUDDING: Prompting with User-Directed Capture Instructions for Document Understanding

**Yamato Okamoto, Yamamoto Takuto (CyberAgent)**

レシートなどの書類から項目を抽出する Key Information Extraction のタスクにおいて、指差しなどのマーカーを人間につけてもらうことで項目抽出の曖昧性を排除する研究です。項目抽出の曖昧性には日々の業務でも悩まされており、間違ったマーカーがあった場合の挙動やユーザーの意図の渡し方などさまざまな議論ができました。

## さいごに

筆者は MIRU に今回初めて参加しましたが、発表・参加者ともにレベルが高くとても刺激を受けました。会期中は多くの方と議論を交わすことができ非常に有意義な時間となりました。お話しいただいた皆さま、そして学会の運営に携わってくださった方々に感謝申し上げます。産学ともに盛り上がりを見せる AI 業界のますますの発展に、LayerX も引き続き貢献できればと思います。

なお LayerX では積極的に採用を行っております。ご興味ある方はぜひ以下のリンクからご応募ください！

-   [【バクラク】AI・LLMエンジニア（新卒採用） / 株式会社LayerX](https://open.talentio.com/r/1/c/layerx/pages/90035)
-   [【バクラク】シニアLLM/MLOpsエンジニア / 株式会社LayerX](https://open.talentio.com/r/1/c/layerx/pages/71190)
-   [【バクラク】シニアAI・LLMエンジニア / 株式会社LayerX](https://open.talentio.com/r/1/c/layerx/pages/123882)

EVENT

### AIカンファレンス「Bet AI Day 2026」開催概要

開催日時

2026年9月3日（木）12:00 開演

開催方法

オンライン配信

参加費用

無料（事前申込制）

[connpass でお申し込み](https://layerx.connpass.com/event/399169/)