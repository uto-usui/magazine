---
title: "OCR技術の変遷と日本語対応モデルの性能検証"
source: "https://tech.layerx.co.jp/entry/2025/12/01/161913"
publishedDate: "2025-12-01"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "taku-buntu"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251201/20251201120216.png)

こんにちは、バクラク事業部AI・機械学習部の飯田 ([@frkake](https://x.com/frkake)) です。 こちらは[LayerXアドベントカレンダー](https://layerx.notion.site/6975c0901ea54ca9b609fafc3e8a35c3?v=2bccdd370bae80579556000cc2afc504)1日目の記事です。初日は [@izumin5210](https://x.com/izumin5210) さんの[記事](https://zenn.dev/layerx/articles/8c29b0367238b8)との二本立てです。

最近、DeepSeek-OCRの登場など、OCR界隈がにわかに活気づいていますね。LLMやVLMの進化に伴い、OCRも単なる「文字起こし」から「構造の読み取り」、さらには「内容の理解」へと進化しているのを感じます。

そこで本記事では、改めてOCR技術の変遷を振り返りつつ、各モデルを自作のサンプルデータを使って検証してみたいと思います。

本記事での用語の整理をあらかじめしておきます。

-   テキスト認識：それがなんの文字であるのかを特定すること。文字起こしを行うこと
-   テキスト検出：文字の位置を検出すること
-   レイアウト認識：画像中の要素の位置や配置を認識すること
-   OCR：画像から文字を書き起こすこと
-   ドキュメント解析：文書全体の構造を抽出すること。図表を含めた要素の識別やMarkdown等への構造化出力も含む

ドキュメント解析の一つの出力形式として、Markdownがあります。 画像中の情報をMarkdownのような構造化されたテキストに変換することで、LLMやRAGとの親和性が高まります。 LayerXのバクラクやAi Workforceでは、AIエージェントを活用した業務の自動化に取り組んでいます。そのAIエージェントが判断材料として利用する文書情報を正確に構造化・理解するために、こうした技術の活用を進めています。

バクラクではこれまで、領収書や請求書などの文書を処理してきました。 請求書には罫線の複雑な表が含まれていることも多く、「項目と金額の対応」などの構造的な情報を、単なるテキストの羅列や座標情報から正確に読み取るのは困難です。 そういうときにMarkdown形式として出力することで、視覚的なレイアウト情報を論理的な構造へと変換できそうです。これにより、画像とAIエージェントとの接続もなめらかになり、より多くの情報をオンボーディングできそうです。

さらに、VQAを活用すれば「合計金額はいくらか」「支払い期日はいつか」といった質問に直接回答させることも可能になってきており、構造の抽出だけでなく内容の理解まで踏み込めるようになってきました。

## 導入

バクラクではお客様に合わせたAI-OCRソリューションを提供しています。そのソリューションの中の一つの要素技術としてOCRを利用しています。周辺機能の実装に力を入れて、トータルでお客様に価値を届けることに取り組んできました。 一方で、昨今のOCR技術の進化は目覚ましく、新たなモデルが次々と登場しています。これを機に最新モデルの実力を検証し、さらなる価値提供の可能性を探ることが本記事の目的です。 ただ検証するだけでなく、モデルの位置付けを把握にすることで、各モデルの特性をより深く理解できます。そのため、関連研究にも触れつつ、各モデルの紹介も行っています。

なお、ドメイン適応のためのファインチューニングを行うと記事が長くなるので、検証するのは日本語に対応済のモデルのみとしています。

本記事では、OCR技術の変遷を3つのアプローチに分類し、各タイプを代表するモデルの性能を比較検証していきます。 単なるテキスト認識から視覚情報と言語知識を融合させた高度なドキュメント解析へと至る技術の流れを追います。

ここでは、全体感の把握を行うため、主だったOCRモデルについて紹介しますが、性能検証では日本語に対応したモデルを対象とします。日本語対応がされているものには🇯🇵マークをつけています。

**先に結果を知りたい方**  
各モデルの技術的な解説が続きます。結果だけを知りたい方は[実験](#%E5%AE%9F%E9%A8%93)セクションまで読み飛ばしていただいても大丈夫です。また、最終的な比較結果は[まとめ](#%E3%81%BE%E3%81%A8%E3%82%81)の表にまとめています。

### テキスト認識特化型

画像からテキストを抽出するアプローチです。文書の構造は考慮せず、文字起こしを行う系統です。 画像からテキスト検出を行って、その領域内のテキスト認識する系統のモデルが多いように感じます。

このセクションで紹介するモデル

-   Tesseract 🇯🇵：歴史ある定番OCRエンジン。LSTMベースのv4以降で精度向上
-   CRNN：CNN+RNN+CTCの組み合わせで可変長文字列を出力
-   TrOCR：Transformerベースで事前学習を活用したE2Eモデル
-   PP-OCRv5 🇯🇵：Baiduのツールキット。多言語対応で実用的

#### Tesseract 🇯🇵

[公式ページ](https://github.com/tesseract-ocr/tesseract) (Accessed: 2025-11-24)

おそらく一番歴史があり、有名なOCRエンジンだと思います。 日本語を含む多言語に対応しており、縦書き用と横書き用のモデルが用意されています。

v3まではテンプレートマッチングや特徴抽出を用いた古典的な画像処理が使われていましたが、それ以降はCNNを用いたモデルが利用できるようになりました。

さらに、2018年に公開されたv4からLSTMを用いたモデルが正式に利用可能になりました \[[リリースノート](https://tesseract-ocr.github.io/tessdoc/ReleaseNotes#v400)\]。これは、次に解説するCRNNと同様のアーキテクチャになっています。v3に比べて精度が大幅に向上しているため、実験ではLSTMを用いたモデルを利用します。

#### CRNN

-   [論文](https://arxiv.org/abs/1507.05717)[1](#fn:1)
-   [公式](https://github.com/bgshih/crnn)
-   [PyTorch版](https://github.com/meijieru/crnn.pytorch)

CRNN (Convolutional Recurrent Neural Network) は、CNNとRNNを組み合わせたアーキテクチャで、可変長の文字列を直接出力できるようにしたモデルです。

下図（左）のように画像に対して畳み込み処理を行った後にbi-LSTMに通して可変長の文字列を出力します。出てきた出力をさらに[CTC (Connectionist Temporal Classification)](https://www.cs.toronto.edu/~graves/icml_2006.pdf)[2](#fn:2)と呼ばれる文字列をデコードするレイヤに通すことで、最終的な文字列を出力します。 まとめるとCNN→RNN→CTC→文字列という流れです。

CNN→RNNと入力を渡すところでは、下図（右）のように空間方向にウィンドウをスライドさせて時系列として扱えるようにしています。横書き言語であれば左から右方向に、縦書き言語であれば上から下にスライドさせていくことになるので、Tesseractでは同じ日本語版でも横書きモデルと縦書きモデルがあります。 このようにウィンドウをスライドさせると、同じ文字のところで複数個のシーケンス特徴が取れてきます。すると、実際には1文字なのに複数文字出力されてくることになります。そのため、CTCレイヤでは空白文字や重複文字の削除処理などが行われます。このCTCのおかげで1文字1文字の正確な位置合わせが不要になり、画像と文字列の対応付けで学習ができるようになっています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143202.png)

（左）CRNNのアーキテクチャ（右）RNNへの受け渡し

#### TrOCR

[論文](https://arxiv.org/abs/2109.10282)[3](#fn:3)

TrOCRはTransformerを用いた大規模事前学習を行った後に、下流タスクに適応（ファインチューニング）させるモデルです。

CNN+RNNを用いた手法では、画像入力にはCNN、テキスト生成にはRNNを用いていましたが、さらに後段に言語モデルを使って性能向上をすることが一般的でした。

TrOCRでは、下図のように事前学習した画像エンコーダとテキスト生成のデコーダの両方にTransformerを使うことで、E2E (End-to-End) に学習できるシンプルなアーキテクチャを提案しています。

画像エンコーダではViT系のDeiTやBEiT、言語デコーダではRoBERTaやMiniLMを使っています。最終的にはサブワードレベル出力が出力されます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143427.png)

TrOCRのアーキテクチャ

また、TrOCRでは二段階の事前学習を行っています。

一段階目では、5,427個の手書きフォントを使って合成した17.9M行のテキスト行と、53K枚の領収書画像を使用しています。 二段階目では、[MJSynth](https://www.robots.ox.ac.uk/~vgg/data/text/)と[SynthText](https://www.robots.ox.ac.uk/~vgg/data/scenetext/)から成る16Mのテキスト画像を利用しています。

こうして事前学習した後は、SROIEデータセット（スキャン領収書画像）やIAM（手書き文字）などの下流タスクでファインチューニングして評価しています。

#### PaddleOCR-v5 (PP-OCRv5) 🇯🇵

[技術レポート](https://arxiv.org/abs/2507.05595)[4](#fn:4)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125152106.png)

PP-OCRv5

PaddleOCRはBaiduが開発するOCRツールキットです。少しややこしいのですが、PP-OCRv5はPaddleOCRのv3系がリリースされたときに発表されたテキスト認識モデルです。

上図のように、テキスト検出モデルとテキスト認識モデルとを差し替えて使用するようになっています。それぞれデフォルトでは、[PP-OCRv5\_server\_det](https://huggingface.co/PaddlePaddle/PP-OCRv5_server_det)と[PP-OCRv5\_server\_rec](https://huggingface.co/PaddlePaddle/PP-OCRv5_server_rec)が使われています。モデルカードに日本語での性能も記載してありますが、中国語や英語に比べると性能は及ばない結果となっています。 これらのモジュールの間にはテキスト行の回転を分類するところがあり、これにより回転があった場合でも対応できるようになっています。

PP-OCRv5は手書き文字や印刷文字などの様々なテキストに対して対応可能になっており、PaddleOCR 3.1.0で多言語モデルが追加されています。

これはテキスト認識のモデルであって、後述するVLMベースのPaddleOCR-VLとは別物である点に注意してください。

### ドキュメント解析（パイプラインベース）

これまでのOCRは画像にかかれている文字列を抽出するのみでした。 ドキュメント解析を行うモデルは、視覚情報と言語情報を統合して、文書全体の構造を抽出するモデルです。

-   YomiToku 🇯🇵：日本語特化のAI文書解析エンジン。テキスト検出・認識・レイアウト認識を統合
-   Donut：OCRなしで画像から直接構造抽出するE2Eモデル

#### YomiToku 🇯🇵

[YomiTokuの公式ページ](https://kotaro-kinoshita.github.io/yomitoku/) (Accessed: 2025-11-24)

YomiTokuは日本語に特化したAI文章画像解析エンジンです。商用利用になると有償になりますが、今回は性能検証用途のみで利用します。

YomiTokuにはテキストの検出とテキスト認識、レイアウト認識を行うモジュールがあり、それらを統合した文書解析を行えます。 テキスト検出にはDBNet、レイアウト認識にはRT-DETR[5](#fn:5) が利用されているようです。レイアウト認識で有名なものにはLayoutLMがありますが、現時点では一般物体検出に用いられるRT-DETRを利用されています。 LayoutLMについては、弊社の[別記事](https://tech.layerx.co.jp/entry/2022/11/24/130000)でも解説しているので、そちらもご覧いただけると嬉しいです。LayoutLMはテキスト認識結果を利用してレイアウト認識を行うモデルなため、本記事のスコープからは外しています。

以下は大まかな文書解析フローの流れです。

graph LR
    classDef data fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef module fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef control fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    
    Image --> TextDet\["TextDetector<br/>(DBNet)"\]:::module
    Image --> LayoutAna\["LayoutAnalyzer<br/>(RT-DETR)"\]:::module
    
    TextDet --> DetResult\["テキスト領域座標"\]:::data
    LayoutAna --> LayoutResult\["レイアウト要素<br/>表・図・段落"\]:::data
    
    DetResult --> Split{セルを跨いだ<br/>テキストを分割する？}:::control
    LayoutResult --> Split
    
    Split -->|Yes| SplitFunc\["セル境界で分割"\]:::module
    Split -->|No| TextRec\["TextRecognizer<br/>(PARSeq)"\]:::module
    SplitFunc --> TextRec
    
    TextRec --> RecResult\["テキスト認識結果"\]:::data
    
    RecResult --> Aggregate\["空間的マッチング"\]:::module
    LayoutResult --> Aggregate
    
    Aggregate --> ReadOrder\["読み順推定"\]:::module
    ReadOrder --> Output\["表・図・パラグラフ<br/>セクションヘッダ<br/>ページヘッダ<br/>ページフッタ"\]:::data

画像に対してテキスト検出とレイアウト認識モジュールを同時に走らせた後に、テキスト分割判定を行います（オプション）。テキスト検出では表の認識はしていないため、セルを跨いだ矩形が出てきます。ここでは、それをレイアウト認識モジュールから得られた情報を使って分割しています。縦分割と横分割があり、横分割の場合を下に図解しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143559.png)

テキスト分割

空間的マッチングでは、認識された文字をレイアウト情報基づいて段落などに割り当てています。そこから各パラグラフなどからページの方向を決定し、読み順を推定しています。

#### Donut 🇯🇵 (事前学習時のテキスト認識のみ)

-   [論文](https://arxiv.org/abs/2111.15664)[6](#fn:6)
-   [コード](https://github.com/clovaai/donut)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143640.png)

（左）既存手法とのパイプラインの比較（右）Donutのアーキテクチャ

DonutはNAVER社が2021年に開発したドキュメント解析モデルです。

YomiTokuでもあったように、従来のドキュメント解析モデルはテキスト検出＋テキスト認識＋レイアウト認識のように別々に行うアプローチが主流でした。これは各モジュールの計算コストが累積したり、エラーが伝搬することで性能低下の要因となっていました。また、実用上では対応言語で各モジュールの選択を迫られる難しさもあります。

そこで、Donutでは画像入力からレイアウトを意識した項目抽出までを一気通貫で行うE2Eモデルを採用しています。 ビジョンエンコーダのSwinTransformerとテキストデコーダのBARTから構成されるアーキテクチャです。それを事前学習と下流タスクにファインチューニングしていきます。

事前学習では、画像中の文字を書き起こすテキスト認識タスクを行います。 ファインチューニングでは、実施するタスクに合わせたプロンプトを与えて学習していきます。 事前学習では、SynthDoGという合成データセット（下図）を作成して、他言語への対応を行っています。 ただし、事前学習タスクのテキスト認識は日本語対応ができているのですが、下流タスクでは日本語対応されたモデルはありませんでした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143800.png)

SynthDoG

### ドキュメント解析（VLMベース）

近年では視覚言語モデル (VLM) を用いて直接ドキュメント解析を行うアプローチも発表されています。レイアウトの解析だけでなく、図表なども含めた構造の抽出が可能になっており、文書画像やPDFをマークダウン化できるようになってきています。

-   PaddleOCR-VL 🇯🇵：レイアウト認識+VLMの組み合わせ。109言語対応
-   DeepSeek-OCR 🇯🇵：高解像度画像を効率的に処理。Gundamモードが特徴
-   Chandra 🇯🇵：40言語以上対応。olmOCRベンチマークでSoTA達成
-   HunyuanOCR 🇯🇵：1Bパラメータの軽量VLM。多機能かつ高精度

#### PaddleOCR-VL 🇯🇵

-   [論文](https://arxiv.org/abs/2510.14528)[7](#fn:7)
-   [コード](https://github.com/PaddlePaddle/PaddleOCR)

PaddleOCR-VLはPaddleOCRのVLMベースのモデルです。PP-OCRv5と同じリポジトリに実装されています。109言語に対応しています。

PaddleOCR-VLの全体アーキテクチャは下図のようなレイアウト認識モデルとVLMから構成されています。 レイアウト認識とVLMを別々に行うことで、VLMの計算コストや読み順誤りなどの影響を小さくしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143900.png)

PaddleOCR-VLの全体像

レイアウト認識を行う[PP-DocLayoutV2](https://huggingface.co/PaddlePaddle/PP-DocLayoutV2)は RT-DETR をベースにしたモデルで、レイアウト要素の検出と分類を行っています。それをRelation DETRに渡して読み順を推定しています（下図左）。 そのレイアウト認識モデルの出力をVLMに渡して最終的にMarkdownやLaTeX、JSON形式で出力します（下図右）。テキスト認識用のプロンプトや表認識用プロンプト、数式認識用プロンプトなどが用意されており、レイアウト認識モデルの結果に応じてそれらを使い分けています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125143940.png)

PaddleOCR-VLのコンポーネント

#### DeepSeek-OCR 🇯🇵

-   [論文](https://arxiv.org/abs/2510.18234)[8](#fn:8)
-   [コード](https://github.com/deepseek-ai/DeepSeek-OCR)

DeepSeek-OCRはDeepSeekが2025年10月に公開したモデルです。 弊社の[機械学習勉強会](https://pages.layerx.co.jp/291cdd370bae80468124e94b5730e998#block-291cdd370bae80f68dadf6e820e90c09)でも紹介したので、こちらもご覧いただけると嬉しいです。

DeepSeek-OCRの発想は、文書中の長いコンテキストを光学的に圧縮すれば少ないトークン数で処理できるはず、というところから来ています。 従来のVLMでは下図のような構成になっており、高解像度画像での処理に課題がありました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144015.png)

既存手法との比較

DeepSeek-OCRでは、少ないビジョントークンかつメモリに優しいエンコーダ (DeepEncoder) を提案し、高解像度入力への対応を行っています。 主なアーキテクチャは下図のようになっており、SAMから得られるビジョントークンをCLIPに通すことで言語空間へマッピングしています。それをプロンプトとともにデコーダ (DeepSeek-3B-MoE) に渡すことで、ドキュメント解析タスクを行っています。SAM部分のViTDetはパッチ内の局所的なアテンションが主なので、メモリ的には優しい設計になっています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144046.png)

DeepSeek-OCRの全体像

推論時の入力では、そのまま入力するモードとGundamモードがあります。Gundamモードはタイル＋全体画像を組み合わせた入力方法で、よりVRAMに優しく超高解像度画像に長けています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144114.png)

入力方式

これに加えてDeepSeek-OCRでは、インターネットから収集したPDFデータ (OCR1.0) と図表や科学に強いデータ (OCR2.0)＋α を用いて学習しています。 これにより、多言語対応や図表のパースにも対応しています。

#### Chandra 🇯🇵

-   [リリース](https://www.datalab.to/blog/introducing-chandra)
-   [コード](https://github.com/datalab-to/chandra)

Chandraは2025年10月にDataLabから公開されたOCRモデルです。 詳細は公開されていませんが、40言語以上をサポートしており、手書き文字や図表の理解ができるモデルです。 一つ上のDeepSeek-OCRとの比較も行っており、olmOCRベンチマークでSoTAを達成しています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144154.png)

olmOCRベンチマーク

DataLabは[Surya](https://github.com/datalab-to/surya/)と[Marker](https://github.com/datalab-to/marker)というパイプラインベースのOCRリポジトリを昨年に公開しているのですが、以下のドメインでの性能向上に課題があり、今回Chandraを開発したとのことです。

-   手書き
-   多言語
-   カスタマイズ性
-   フォームとテーブルの抽出
-   画像のキャプションと抽出
-   数式

そのため、特徴としては上記の課題感を解消した特徴があるとのことです。

ChandraはコードはApache 2.0ライセンスですが、モデルの重みは[別ライセンス](https://github.com/datalab-to/chandra/blob/master/MODEL_LICENSE)になっているので、注意が必要です。

### HunyuanOCR 🇯🇵

-   [公式ページ](https://hunyuanocr.org/)
-   [技術レポート](https://arxiv.org/abs/2511.19575)[9](#fn:9)
-   [コード](https://github.com/Tencent-Hunyuan/HunyuanOCR)
-   [HuggingFace](https://huggingface.co/tencent/HunyuanOCR)

HunyuanOCRはテンセント（騰訊）が2025年11月に公開したOCRモデルです。 主な特徴として、以下に挙げられるような多くのOCR機能や多言語サポートを持っています。1BパラメータというVLMとしては軽量なモデルであることも特徴です。

-   テキスト検出＆テキスト認識
-   ドキュメント解析：Markdown変換や数式のLaTeX変換、図表のHTML変換
-   情報抽出＆VQA (Visual Question Answering)：特定の情報（金額、日付など）の抽出
-   画像内のテキスト翻訳

HunyuanOCRのアーキテクチャは以下のようになっています。 大まかには画像エンコーダ(`Hunyuan-ViT`)とテキストデコーダ(`Hunyuan-0.5B`)から構成され、中間にそれらをつなぐコネクタ（`Adaptive MLP Connector`）があります。

-   画像エンコーダ： Hunyuan-ViTはSigLIP-v2-400Mをベースとしており、オリジナル解像度のまま処理できます。アスペクト比が変わることなく処理できるため、長大な文書の処理に強みがあります。
-   コネクタ： 画像とテキストの橋渡しをする役割があります。具体的には、空間方向で適応的に画像の圧縮を行います。これにより、トークン数を削減する狙いがあります。端的に言えば、学習可能なプーリング処理を行っています。
-   テキストデコーダ： Hunyuan-0.5BはXD-RoPEというRoPEをテキスト・高さ・幅・時間の4つのサブスペースに分解して扱うことで、複雑なレイアウトの理解を可能にしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251129/20251129205245.png)

HunyuanOCRの全体像

HunyuanOCRでは、データセットや学習方法にも工夫を入れています。 データセットでは、[SynthDog](#donut--%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%E6%99%82%E3%81%AE%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E8%AA%8D%E8%AD%98%E3%81%AE%E3%81%BF)を拡張させて、130以上の言語で認識能力を強化しています。右から左に書くアラビア語などもカバーしています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251129/20251129205317.png)

HunyuanOCRの学習データ

学習方法は結構手間がかかっており、事前学習だけで4段階になっています（下表）。 これらの事前学習の後は、GRPO (Group Relative Policy Optimization)[10](#fn:10)を使って学習をしています。 以下のようにタスクごとに報酬を設定しています。

-   テキスト検出＆テキスト認識：正解バウンディングボックスとの重なり（IoU）と正解テキストとの編集距離
-   ドキュメント解析：正解データとの編集距離
-   VQA：答えが正解と意味的に一致しているかどうか（Yes/No）
-   翻訳：LLM-as-a-Judgeで、翻訳の質を0~5段階で評価

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251129/20251129205402.png)

HunyuanOCRの事前学習

## 実験

### 検証用サンプルデータ

性能検証に使用するサンプルデータは、比較したい要素をもつデータを都度持ってきても良いのですが、サンプルが複数になると記事が長くなるため、多様な要素を一つのデータに詰め込み、これを検証に用いることにしました。 既存手法との比較のしやすさを考慮しながら、以下のことを考慮してできるだけ難しいデータを作成しました。実際にバクラクで処理をする領収書がこんなにも汚れていることはないのですが、OCRの性能評価のためにあえて難しくしています。 オリジナルはPDFですが、それを1654x2339サイズのJPEG画像に変換しました。

-   テキスト自体の読み取りにくさ
    -   汚れ
    -   印影のにじみ
-   複雑なレイアウト
    -   縦書き・横書き・アーチ状などの混合
    -   セル結合などを含む複雑な表
    -   図表
-   中盤でのテキストの多さ

表の一部ではあえて統一感をなくして左寄せにしたり、右寄せにしたりしています。説明のために各領域に名前をつけました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144326.png)

検証用サンプルデータ

このサンプルデータは以下の手順で作成しました。

-   PDFの作成：`reportlab` でPDFの大枠を決定
-   画像要素：`Nano Banana`
    -   印影
    -   手書き文字
    -   画像の汚れ
-   グラフ: `Matplotlib` でグラフを作成

`Nano Banana Pro` が出て日本語の生成は向上していると思うのですが、複雑な請求書画像の生成は苦労しました。 例えば、文字が多くなってくると特定の文字が崩れてしまったり、汚れのみを生成してほしいのに勝手に編集してしまうことがありました。 そのため、文字やグラフなどはコードとして決定的に生成して保護し、その後に画像要素を生成してくっつけることで、より複雑な請求書画像の生成を行っています。 印影のにじみなどはブラーなどの画像処理をしています。

### 検証結果

前節で準備したサンプルデータを使って、日本語に対応したモデルの性能を眺めていきます。

### 1\. Tesseract

LSTMを用いた日本語対応モデルを動かしてみました。 以下は主に左上（`シンプル`）のエリアの結果です。あまり読み取れていないことがわかります。 モデル (CRNN) の仕組み上、基本的に左から右にしか読み取れないため、「桜川ビル6F」の後に、右側の「支払い期限」を読み取っている様子などが確認できます。印影との重なりがあるところも読み取れていないですね。

や
用 |
靖 ※ 発行 年 月 20
株 式 会 社 サ ンプ ル に
東京 都 中 央 区 桜川 二 丁 目 15-8 桜川 ビル 6F 支払 い 期 限 20
出 田 部 槍 諸 求 元 。 株 式 会 社 請求
03=-1234-5678 ィ
yamada@example.com ーー
な の て
0 5 元
振込 先 / 。 総
みらい 総合 銀行 ア に 合
桜町 支店 商
普通 1284503 支払 い 条 件 事
お 支払 い は 請求 日 より 30 日 以内 に 、 こ 上 記 振 込 先 へ 銀行 振
カテ ゴリ 別売 上 分 布 込 に て お 願い いた し ます 。
コリ オフィス ケア クセ ッ リ 振込 手数 料 は 貴社 に て ご 負担 “だ さい 。
振込 元 名 義 は 識別 の た め 失 頭 に 「 13」 を 付与 し た 名 義 を
ご 使用 く だ さい 。
カテ ゴブ 基軸 村 導 支払 い 期 限 を 過ぎ た 場合 、 年 14 6% の 延滞 利息 を 日 害

### 2\. PP-OCRv5

PP-OCRv5のテキスト認識結果は以下です。Tesseractと比較すると、より多くの文字が読み取れていることがわかります。

横書きだけでなく、縦書きも縦書きとして読み取れていることがわかります。また、図表中の文字も読み取れています。

一方で、表の中国語になってしまっていたり、特に文字が詰まっているところでは文字が一部欠落していたりしていることも確認できます。 また、アーチ上の文字列は一文字ずつ別の要素として検出されたり、誤認識していることがわかりました。これは、PP-OCRv5がテキスト行の回転に対応できるように設計されているためで、単純な矩形の回転でフィットできない形式には対応できないからだと考えられます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144447.jpg)

PP-OCRv5の結果

### 3\. YomiToku

YomiTokuの認識結果が下図です。YomiTokuはレイアウト認識モジュールを持つため、段落や図表の識別を行って、読み順を推定しています。 左図がテキスト認識結果、右図がレイアウト認識結果と読み順を可視化したものです。下には検出結果とレイアウト認識結果を統合して、HTML形式で出力した表の一部を表示しています。

汚れを文字として誤検知してしまっているので、読み順が左下に飛んでいますが、全体的には良さそうな印象です。 また、PP-OCRv5では文字の抜けや不意に中国語になることがあったのですが、YomiTokuではシンプルに日本語のテキスト認識の性能が高いように感じます。

右側の縦書き横書き混在（`縦書き2`）のエリアを一つの大きなテキスト領域として認識しています。 隣接する横書き文字列と縦書き文字列の領域のマージエラーが発生しているか紙面の汚れに反応していそうです。 アーチ状の文字列に弱いのは、PP-OCRv5と同様だと思います。

表部分では、列名のセル結合を誤っていますが、小計部分の結合部分を正しく認識できており、概ね良さそうです。罫線がある場合には正しく動作しそうな感触です。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144526.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144604.png)

### 4\. PaddleOCR-VL

PaddleOCR-VLでも推論してみました。NVIDIA T4を利用して推論しているのですが、オリジナル解像度ではVRAMから溢れてしまったので、縦横を0.8倍にした1323x1871サイズで推論しました。使用VRAMは14GB程度でした。

結果を確認してみると、グラフや縦書きの認識ができていなかったり、日本語が一部誤認識していることが確認できます。 一方で、PP-OCRv5と比べると中国語は抑制されているように感じました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144627.png)

PaddleOCR-VLの結果

### 5\. DeepSeek-OCR

DeepSeek-OCRはテキスト認識だけでなく、ドキュメント解析タスクも行えるのですが、まずはDeepSeek-OCRでテキスト認識を行ってみました。PaddleOCR-VLとは違いオリジナル解像度の1654x2339で推論できました。おおよそ14GB程度のVRAMで動作しました。 以下は、1024x1024のネイティブ解像度でサンプルデータの表部分の結果です。ハルシネーションを起こしており、存在しない単語や反復している単語があります。反復が止まらなくなったため、出力を途中で打ち切りました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144703.png)

ネイティブ解像度入力のOCR結果

次にGundamモードで推論してみました。Gundamモードでは高解像度画像を効率的に行えるようです。 結果を見てみると、ハルシネーションが抑制されていることがわかります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144753.png)

GundamモードのOCR結果

Gundamモードでハルシネーションが抑制できることがわかったので、次にMarkdownに変換してみます。 左側の検出された図をみてもわかる通り、右上の要素やアーチ部分がまるっと無視されてしまっています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144838.png)

GundamモードでMarkdown化

DeepSeek-OCRではキャプション生成や表のパース、検出タスクも行えます。試しに、合計金額の検出を走らせてみたのですが、上図左と同様のただのテキスト検出になってしまいました。

### 6\. Chandra

以下がChandraの結果です。[ChandraのPlayground](https://www.datalab.to/playground)で推論しました。 縦書き横書きも正しく検出できているのに加えて、グラフや表もほぼ正しく認識できました。 詳細がわからず、解説が雑になってしまい申し訳ありません。検証したモデルの中では、一番キレイに認識できたと思います。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251125/20251125144925.png)

Chandraの結果

### 7\. HunyuanOCR

HunyuanOCRでも推論してみました。HunyuanOCRはVLLMを用いて推論しました。 まずは、テキスト認識の結果です。ヘッダ付近での誤検知もありますが、多くの日本語が正確に読み取れています。 縦書きの箇所だけでなく、これまで全く検出できなかった中央にあるアーチ状の文字列もほぼ正しく読み取れています。 日本語が中国語になることもありませんでした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251129/20251129205044.png)

HunyuanOCRのテキスト認識結果

Markdownにも変換してみました。上のテキスト認識と文字が異なっている箇所が1文字ありますが、ほぼ正確に書き出されています。表に関しては、文字のセルの位置は正しいのですが、セル結合の認識が失敗していました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/taku-buntu/20251129/20251129205112.png)

HunyuanOCRのMarkdown変換結果

また、「金額」「合計金額」「支払い期日」「発行日」をそれぞれプロンプトを使って抽出してみました。 バウンディングボックス付きで本来は出力したかったのですが、位置がデタラメだったり、指定したフォーマットで出力されなかったので、テキストのみを抽出しました。 複数の候補が返ってきており唯一の正解を特定するには至りませんでしたが、金額や日付などの情報は概ね抽出できているように見えます。「合計金額」は小計や消費税も抽出されてしまっていますが、品目ごとの金額は含まれていません。これらの候補から絞ることで「合計金額」は特定できそうです。 DeepSeek-OCRでは検出できませんでしたが、HunyuanOCRでは検出できました。

金額: \["¥8,000", "¥11,000", "¥19,000", "¥14,400", "¥2,200", "¥1,100", "¥13,000", "¥14,400"\]
合計金額: \["¥172,500", "¥17,250", "¥189,750"\]
支払い期日: \["2024年4月24日", "2025年5月31日"\]
発行日: \["2024年4月24日", "2025年5月31日"\]

## まとめ

本記事では、OCR技術の進化を追いながら、代表的なモデルや最新モデルを用いて、複雑なレイアウトを持つ日本語文書の認識性能を検証しました。 あくまで今回のサンプルにおける結果ですが、まとめると以下のようになります。

モデル

タイプ

日本語認識

縦書き

グラフ

表構造

特記事項

**Tesseract**

テキスト認識

△

\-

\-

\-

単純な横書き以外は苦手で、印影や汚れにも弱い。

**PP-OCRv5**

テキスト認識

◯

◎

△

△

縦書きも文字としては認識可能。図表内の文字も拾えるが、中国語が混じることがある。

**YomiToku**

ドキュメント解析 (パイプライン)

◎

△

◯

◯

日本語認識は高精度。縦書き混在箇所で認識ミスが見られた。

**PaddleOCR-VL**

ドキュメント解析 (VLM)

◯

△

△

◯

今回の検証ではグラフや一部の縦書きの認識に失敗。

**DeepSeek-OCR**

ドキュメント解析 (VLM)

△

△

◯

△

今回の検証ではGundamモードでも一部要素（縦書き・グラフ等）が無視される傾向があった。図表のパースは未実施。

**Chandra**

ドキュメント解析 (VLM)

◎

◎

◎

◯

今回の検証サンプルにおいて、縦書き・グラフ・表を含め、最も高精度に認識できた。セルの結合をミスしているところがあった。

**HunyuanOCR**

ドキュメント解析 (VLM)

◎

◎

◯

◯

アーチ状の文字も含め日本語認識精度は高い。表のセル結合の認識に失敗。VQAによる情報抽出も可能。

本記事では、従来のOCR手法からVLMベースの最新手法まで幅広く検証しました。シンプルなテキスト認識ではPP-OCRv5やYomiTokuが実用的な選択肢となる一方、レイアウト解析を含む複雑な構造理解が求められる場面ではHunyuanOCRやChandraが高い性能を発揮しました。特にHunyuanOCRは、請求書などからの項目抽出にも応用できる可能性を感じさせる結果となりました。

## さいごに

LayerXでは今回紹介したようなAI-OCRの開発やAI Agentを用いた開発を全力で行っています。

もし本記事を読んで興味を持っていただいた方は、ぜひ以下の採用ページをご覧ください。 AI技術を使って社会の課題を解決していく仲間を全方面で募集しています！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/)

* * *

1.  [Shi et al., "An End-to-End Trainable Neural Network for Image-based Sequence Recognition and Its Application to Scene Text Recognition", arXiv preprint arXiv:1507.05717, 2015.](https://arxiv.org/abs/1507.05717)[↩](#fnref:1)
2.  [Graves et al., "Connectionist Temporal Classification: Labelling Unsegmented Sequence Data with Recurrent Neural Networks", In Proceedings of the 23rd International Conference on Machine Learning (ICML), 2006.](https://www.cs.toronto.edu/~graves/icml_2006.pdf)[↩](#fnref:2)
3.  [Li et al., "TrOCR: Transformer-based Optical Character Recognition with Pre-trained Models", arXiv preprint arXiv:2109.10282, 2021.](https://arxiv.org/abs/2109.10282)[↩](#fnref:3)
4.  [PaddlePaddle Authors. "PP-OCRv5: An Efficient and High-Accuracy Multilingual OCR System", arXiv preprint arXiv:2507.05595, 2025.](https://arxiv.org/abs/2507.05595)[↩](#fnref:4)
5.  [Zhao et al., "DETRs Beat YOLOs on Real-time Object Detection", arXiv preprint arXiv:2304.08069, 2023.](https://arxiv.org/abs/2304.08069)[↩](#fnref:5)
6.  [Kim et al., "OCR-free Document Understanding Transformer", arXiv preprint arXiv:2111.15664, 2021.](https://arxiv.org/abs/2111.15664)[↩](#fnref:6)
7.  [PaddlePaddle Authors. "PaddleOCR-VL: A Versatile Multi-modal Framework for Multilingual Document Processing", arXiv preprint arXiv:2510.14528, 2025.](https://arxiv.org/abs/2510.14528)[↩](#fnref:7)
8.  [DeepSeek AI Authors. "DeepSeek-OCR: Efficient Optical Character Recognition with Vision-Language Models", arXiv preprint arXiv:2510.18234, 2025.](https://arxiv.org/abs/2510.18234)[↩](#fnref:8)
9.  [Tencent Hunyuan Authors. "HunyuanOCR: A Unified Multimodal Optical Character Recognition System", arXiv preprint arXiv:2511.19575, 2025.](https://arxiv.org/abs/2511.19575)[↩](#fnref:9)
10.  [Shao et al., "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models", arXiv preprint arXiv:2402.03300, 2024.](https://arxiv.org/abs/2402.03300)[↩](#fnref:10)