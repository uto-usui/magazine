---
title: "SRE2.0: LLMサービスの信頼性を測る新しい評価指標の紹介"
source: "https://engineering.mercari.com/blog/entry/20250612-d2c354901d/"
publishedDate: "2025-06-16"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。Fintech SREの佐藤隆広(@T)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の11日目の記事です。

Google社が提唱し、[Site Reliability Engineering Book](https://sre.google/books/)によって広く知られるようになったSREの信頼性マネジメントは、開発と運用の関係性を再定義し、SLI/SLOとエラーバジェットに始まり、Availability・Latency・エラーレート・トラフィック・リソース飽和度・耐久性といったような指標で補強されてきました。 ところが近年、大規模言語モデル（LLM）の進歩が著しく、サービスにLLMを利用する機会が増えることによって、

-   プロンプトを数行変えただけで回答品質が変動する
-   Latencyやエラーレートが良好でも幻覚（ハルシネーション）が急増する
-   モデルの軽微なアップデートで回答スタイルが激変する

といった、従来指標では見落としがちな事象に遭遇することが多くなりました。 つまり **「LLMサービスの信頼性」** を守るには、クラシックなインフラ指標の他に**LLMサービス固有の品質指標** を重ね合わせてモニタリングする必要性が迫られています。

本記事では、LLMサービスの信頼性評価に不可欠な指標の選定から、具体的な測定・評価方法までを、DeepEvalライブラリを用いたデモを交えて紹介します。

## 1\. LLMサービスの一般的評価指標

LLMサービスの信頼性を測る上で、どのような指標に着目すべきでしょうか？ [LLM Evaluation Metrics: The Ultimate LLM Evaluation Guide](https://www.confident-ai.com/blog/llm-evaluation-metrics-everything-you-need-for-llm-evaluation)では、下記の評価観点の代表例が挙げられていました。

指標名

説明

回答の関連性 (Answer Relevancy)

質問に対して、どれだけ適切に答えているかを測る指標

タスク完遂度 (Task Completion)

与えられたタスクをどれだけ正確にやり遂げられたかを測る指標

正確さ (Correctness)

事前に用意された正解とどれだけ一致しているかを測る指標

幻覚の有無 (Hallucination)

事実に基づかない内容や、デタラメな情報が含まれていないかを測る指標

ツール使用の正確さ (Tool Correctness)

タスクを達成するために正しいツールを選び、実行できたかを測る指標

文脈適合性 (Contextual Relevancy)

検索された情報が質問に対してどれだけ適切かを測る指標

責任あるAI指標 (Responsible Metrics)

差別的な表現や攻撃的な内容を含んでいないか、特定の属性に対して偏見を持っていないかなどを測る指標

タスク固有指標 (Task-Specific Metrics)

要約や翻訳など、「特定のタスク」においてLLMの性能を測るための指標

従来のサービスの代表的な指標として、AvailabilityやLatencyなどといったインフラ系SLIを監視すれば、ユーザージャーニーと関連付けてお客さま満足度を把握することができました。 しかしLLMサービスでは、「応答が意図に沿い、事実に基づいているか」「タスクを正しく完遂できたか」といった生成品質そのものがお客さま満足度に直結します。 そのため、従来のAvailabilityやLatencyに加え、LLMサービス特有の生成品質を捉えるSLIを設計し、お客さまが「意図どおりの正しい回答を迅速に得られるか」を定量的に示せる指標体系を整える必要があります。 では、具体的にLLMサービスの指標を設計する上で、どの指標を選定するべきでしょうか。

### 1.1. 一般的評価指標の落とし穴

上記の表にある、回答の関連性、正確さ、幻覚の有無といった一般的な評価観点は骨格ですが、すべてのLLMサービスのユースケース固有の成功条件をキャッチアップできるとは限りません。 たとえば要約サービスなら「網羅性」や「矛盾の有無」、RAGなら「検索文脈の適合度」といった独自指標がなければ、お客さまが得る価値を測り切れないことが多いです。 [The Accuracy Trap: Why Your Model’s 90 % Might Mean Nothing](https://medium.com/%40edgar_muyale/the-accuracy-trap-why-your-models-90-might-mean-nothing-f3243fce6fe8)という記事では、顧客離反（churn）予測モデルがテスト精度92%を達成したにもかかわらず、実運用では解約防止どころか誤警告と取りこぼしが発生し、結果として離反率が増えたことを解説しています。

教訓としては、お客さま視点のエンドツーエンド評価を最優先にする、ということだと思われます。 LLMサービスはRAGやエージェント機構など複雑な内部構造を持ちますが、中間コンポーネントをいくら改善しても、お客さまが受け取る回答が向上しなければROIは上がりません。 ブラックボックスとしての最終出力を計測し、エンドツーエンドで測った結果が、サポート工数削減や売上向上と相関することが、そのLLMサービスの選定すべき評価指標でしょう。

### 1.2. 優れた評価指標とは?

[The Complete LLM Evaluation Playbook: How To Run LLM Evals That Matter](https://www.confident-ai.com/blog/the-ultimate-llm-evaluation-playbook) では、優れた評価指標の条件として、下記3点が挙げられていました。

-   **定量的であること（Quantitative）**
    -   評価結果として数値スコアを算出できること。数値で評価できれば「合格ラインとなるしきい値」を設定したり、スコアの時系列変化を追ってモデル改善の効果を測定したりできることが望ましいです
-   **信頼性が高いこと（Reliable）**
    -   常に安定した評価結果が得られること。LLMの出力に予測不能な揺らぎがある以上、評価指標まで不安定では困ります。例えばLLMを用いた評価手法（後述のLLM-as-a-judgeなど）は従来手法より高精度な反面、評価結果にばらつきが出やすい傾向があるため注意が必要です
-   **正確であること（Accurate）**
    -   LLMモデルの性能を実際の人間の評価と近い基準で的確に反映できること。評価スコアが高い出力=人間にとって良好と感じられる出力、となるのが理想であり、そのためには人間の期待と整合した基準で評価する必要があります

また、評価指標値がいくら高いスコアを叩き出しても、売上やお客さま満足度などのビジネス成果につながらなければ意味がありません。 同記事では、これを **Metric Outcome Fit（指標と成果のつながり）** と呼んでおり、「現場で行われるLLMの指標評価の95%は、このつながりがなく価値を生まない」とまで言及されていました。ビジネス上「良い結果」とみなされるケースを指標が確実に“良い”と判定できるか、上記を確認・調整し続けることが、指標を外さない唯一の方法、と紹介されています。

## 2\. 指標の評価方法の全体像

次に、指標を実際に評価する手法の種類について紹介します。大別すると、下記の4つが存在し、それぞれに長所・短所があります。

-   統計的手法 (string-based / n-gram based / surface base)
-   LLM以外のモデルを用いる手法 (classifier / learned metrics / small-LM metrics)
-   統計的手法、LLM以外のモデルを同時に用いるハイブリッドな手法 (embedding-based metric)
-   LLMそのものを用いる手法 (LLM based / generative evaluator)

### 2.1 統計的手法

人手で作成した正解データと出力テキストを文字列レベルで比較し、類似度を測って評価する手法です。

-   BLEU
    -   モデル出力と期待される正解文との1〜4-gram 精度を平均し、brevity penalty を乗法して精度ベースで算出し、長さの過不足に対するペナルティも加味したスコアを与えます
-   ROUGE
    -   要約評価によく用いられ、ROUGE-Lは LCS(最長共通部分列)ベースで再現率と精度の F1を取り、ROUGE-1/2 が n-gram再現率に基づき要約が元文書をどれだけカバーしているかを測ります
-   METEOR
    -   精度と再現率の両面から評価し、語順の違いや同義語のマッチングも考慮する指標です。(最終スコアは精度・再現率の調和平均に語順ペナルティを乗法して算出）
-   編集距離（[レーベンシュタイン距離](https://note.com/noa813/n/nb7ffd5a8f5e9)）
    -   出力と正解の文字列差分そのものを測定する指標。実務では複数文長の比較にそのまま使うことは稀で、キャッチアップコストの割には使用されていないケースが多いようです

ref: [LLM evaluation metrics — BLEU, ROGUE and METEOR explained](https://avinashselvam.medium.com/llm-evaluation-metrics-bleu-rogue-and-meteor-explained-a5d2b129e87f)

これら統計的指標は計算が単純で再現性（一貫性）は高いですが、テキストの意味や文脈を考慮しないためLLMが生成するような長文回答や高度な推論を要する出力の評価には不向きです。事実、純粋な統計手法では出力の論理的整合性や文意の正しさまでは評価できず、複雑な出力に対しては精度が不十分だとされています。

### 2.2. LLM以外のモデルを用いる手法

評価専用の機械学習モデルを用いて、分類モデルや埋め込みモデルなど、比較的軽量な自然言語処理モデルを使って評価する手法です。

-   NLI（自然言語推論）モデル
    -   LLMの出力が与えられた参照テキスト(事実情報など)に対して、整合しているか（Entailment）/ 矛盾しているか（Contradiction）/ 無関係か（Neutral）を分類できます。この場合、モデルの出力スコアは「論理的にどれだけ一貫しているか」を表す0.0~1.0の確率値になります
-   Transformer型の言語モデル（NLI, BLEURTなど）をベースに学習した専用モデル
    -   LLMの出力と期待される正解との類似度をスコアリングして計測する手法で、モデルベース手法では、テキストの意味をある程度考慮した評価が可能になりますが、評価モデル自体に不確実性があるため、スコアの一貫性（安定性）に欠ける場合があります。例えば、NLIモデルは入力文が長大になるとうまく判断できなかったり、BLEURTは学習データの偏りに影響を受け評価が偏る可能性が指摘されています

### 2.3. 統計的手法、LLM以外のモデルを同時に用いるハイブリッドな手法

上記の中間に位置する手法で、事前学習済み言語モデルの埋め込んでベクトル化した値と、統計的な距離計算を組み合わせて評価する手法です。

-   [BERTScore](https://openreview.net/pdf?id=SkeHuCVFDr)
    -   [BERT](https://en.wikipedia.org/wiki/BERT_/\(language_model/\))などで求めた各単語の文脈ベクトル同士の[コサイン類似度](https://atmarkit.itmedia.co.jp/ait/articles/2112/08/news020.html)を計算し、出力文と参照文の意味的な重なり度合いを測定します
-   [MoverScore](https://arxiv.org/abs/1909.02622)
    -   出力文と参照文それぞれについて単語埋め込みを用いた分布を作成し、そこから[Earth Mover’s Distance（最適輸送距離）](https://zenn.dev/derwind/articles/dwd-optimal-transport01#%E6%9C%80%E9%81%A9%E8%BC%B8%E9%80%81%E8%B7%9D%E9%9B%A2)を計算して両者の差異を測定します

これらの手法は単語レベル・表面レベルを超えて意味的な近さを捉えられる点で統計的手法で挙げたBLEUなどより優れていますが、結局は元となる埋め込みモデル（BERT等）の性能やバイアスに影響されるという弱点があります。例えば専門領域の文脈や最新の知識について、事前学習モデルが適切なベクトル表現を持っていなければ正確な評価はできません。また評価モデルが内包する社会的バイアスがスコアに現れるリスクもあります。

### 2.4. LLMを用いた手法（LLM-as-a-judge）

評価手法の中でも近年注目されているのが、LLM自体に計測させて出力品質を評価させる手法、LLM-as-a-judgeです。 高度なLLMに「与えられた回答が基準を満たすか評価してください」と指示を与え、モデルから評価スコアや判定を引き出すアプローチになります。 LLMは文章の意味理解や複雑な判断ができるため、人間の主観に近い評価を自動化できる点が大きな長所です。 実際、GPT-4を評価者に用いる[G-Eval](https://arxiv.org/abs/2303.16634)という手法では、評価スコアと人間評価との相関が従来の自動評価よりも大幅に向上することが、[G-Eval Simply Explained: LLM-as-a-Judge for LLM Evaluation](https://www.confident-ai.com/blog/g-eval-the-definitive-guide)という記事でも紹介されています。 一方で、LLMベースの評価はそのモデルの応答次第で結果が変動しうるため、スコアの安定性（信頼性）に課題があります。 LLMに同じ回答を再評価させても毎回まったく同じスコアが得られる保証はなく、モデルのランダム要素や出力の揺らぎが評価結果にも影響を及ぼすためです。

下記に、代表的なLLM-as-a-judgeの手法をピックアップしてみます。

-   [G-Eval](https://arxiv.org/abs/2303.16634)
    -   評価基準を1～5段階スケールで採点し、LLMが評価スコアと評価結果の理由(Chain of Thoughtの結果)を返す仕組み
-   [QAG Score](https://arxiv.org/abs/2210.04320)
    -   出力からQA(Yes/No/Unknown)を自動生成し、原文で同じQAを解き、両者の一致率をスコアにする
-   [SelfCheckGPT](https://arxiv.org/abs/2303.08896)
    -   同じプロンプトでN回サンプリングし、生成文同士の一貫性(例：N-gram・QA・BERTScoreなど複数の比較モード)を測って事実性を推定する。ばらつきが大きいほど幻覚の可能性が高くなる
-   [DAG(deep acyclic graph)](https://deepeval.com/docs/metrics-dag)
    -   DeepEval が提供する決定木型メトリック。各ノードはLLM判定(Yes/No)で、経路によって固定スコアを返すため LLM-as-a-judgeなのにブール判定ノードを決定木で束ね、部分点を決定論化する
-   [Prometheus2 Model](https://arxiv.org/abs/2405.01535)
    -   GPT-4を含む高品質ジャッジのフィードバックと多数の評価トレースで蒸留した7B/8×7Bの評価モデル。人間/GPT-4との一致率0.6〜0.7(直接採点), 72–85%(ペアワイズ比較)で立証済み

最後に、ここまで挙げた指標の計測評価方法をまとめてみたのが下記の表になります。

種類

具体的な手法

長所

短所

**統計的手法**

BLEU / ROUGE / METEOR / 編集距離（レーベンシュタイン距離）

・計算が単純で高速・再現性が高い  
・追加学習が不要で実装が容易

・意味・文脈を考慮せず表層一致のみを評価  
・論理整合性や高度な推論が必要な出力には不向き

**LLM 以外のモデルを用いる手法**

NLI（自然言語推論）モデル / BLEURT / Transformer ベースの専用評価モデル

・意味理解や論理的一貫性をある程度評価できる  
・LLM より計算コストが低く、自前で fine-tune 可能

・評価モデル自体の不確実性  
・バイアスに依存 ・長文・専門領域で精度が低下しやすい

**ハイブリッド手法**

BERTScore / MoverScore

・埋め込みで語義的近さを捉え、統計指標より高精度  
・決定論的で再現性を保ちやすい

・埋め込み元モデルの学習範囲・バイアスに左右される  
・最新知識や狭い専門領域では適合しにくい

**LLM を用いる手法（LLM-as-a-judge）**

G-Eval / QAG Score / SelfCheckGPT / DAG (Deep Acyclic Graph) / Prometheus2 Model

・人間評価に近い複雑な判断を自動化できる  
・回答の多面的品質を一括で評価可能

・出力が確率的でスコアに揺らぎが出やすい  
・モデル利用コストが高く、プロンプトに敏感

これら評価手法を実際に計測するには、効率的に測定するためのツールが必要です。 そこで、今回はLLM評価ライブラリの中から参考記事で垣間見ていたDeepEvalについて紹介したいと思います。

## 3\. DeepEval

[DeepEval](https://github.com/confident-ai/deepeval) は、LLMサービスを評価するためのPythonライブラリです。 テストケースの作成、評価指標の定義、評価の実行を行うためのフレームワークを提供します。 DeepEvalは、応答の関連性、忠実性、文脈の精度など、さまざまな側面を評価する指標をサポートしており、カスタム指標や評価データセットの自動生成、Pytestのようなテストフレームワークとの統合もサポートしています。 [公式ドキュメント](https://deepeval.com/docs/getting-started)には、詳細なインストール手順、基本的な使用方法、各種評価指標の設定方法、カスタム指標の作成方法などが詳しく解説されています。

それでは、簡単な要約サービスを元に、評価手順を実践してみようと思います。

### 3.1 実践例： 要約サービスでの指標決定と測定方法

ここで想定する要約サービスは、記事やドキュメントなどの長文を入力として受け取り、その内容を短くまとめた要約文を生成するサービスです。 LLMの仕組み的に得意分野として真っ先に思いつくサービスだと思います。 今回は、グリム童話を要約して、子供でもわかるような文章で要約してくれるサービスを考えてみたいと思います。

### 3.2 指標の選定

要約という観点から、一般的な評価指標として思いつく指標は、**回答の関連性 (Answer Relevancy)**, **正確さ (Correctness)**, **幻覚の有無 (Hallucination)** です。 Deepevalの[G-Eval](https://deepeval.com/docs/metrics-llm-evals)を利用して、上記3つの指標に対応することができますが、今回のケースでの **1.2. 優れた評価指標とは?** に該当するか調査する必要があります。

-   定量的であること(Quantitative)
    -   G-Evalは0〜1の連続スコアを返すので、評価結果として数値スコアを算出できると言えます
-   信頼性が高いこと(Reliable)
    -   G-Evalは本来確率的ですが、LLMモデルに渡す`temperatureのオプションを0で呼び出し`、`evaluation_stepsを固定しCoT生成処理をスキップ`、`Rubricを指定して評価スコアを一定にする`という3点を実行すれば、同じ入力で同じスコアがほぼ再現させることができるので、常に安定した評価結果が得られそうです(厳密には、OpenAI側の sampling noise、 system randomness が残っており完全再現には至りません。top\_p=0, seed 固定可能な API/backend を使うか，最終的には majority vote/ensemble 評価が推奨されます)
-   正確であること(Accurate)
    -   G-Evalは参照(expected\_output、今回のケースの場合、グリム童話の原文や正解データです)付きの評価であり、事実照合を中心とするタスクではG-Evalは人間判定との相関が高いことが論文・実運用の両方で示されています。

よって、今回のケースでは、**回答の関連性 (Answer Relevancy)**, **正確さ (Correctness)**, **幻覚の有無 (Hallucination)** の指標について、DeepEvalのG-Evalでの指標評価を使用することは妥当だと言えそうです。

### 3.3 評価観点の分解

次に、ピックアップした指標をどのような手順で評価させるのか、評価するために必要な観点やステップを列挙していきます。 幸いなことに、評価観点を分解する上で、参考になりそうな文献が、Google Cloudの[Vertex AIのドキュメント – モデルベース評価の指標プロンプト テンプレート](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates)にありましたので、今回はそちらを参考に評価観点を分解していきたいと思います。

-   回答の関連性 (Answer Relevancy)
    -   STEP1. Identify user intent – List the explicit and implicit requirements in the prompt.
    -   STEP2. Extract answer points – Summarize the key claims or pieces of information in the response.
    -   STEP3. Check coverage – Map answer points to each requirement; note any gaps.
    -   STEP4. Detect off-topic content – Flag irrelevant or distracting segments.
    -   STEP5. Assign score – Choose 1-5 from the rubric and briefly justify the choice.
-   正確さ (Correctness)
    -   STEP1. Review reference answer (ground truth).
    -   STEP2. Isolate factual claims in the model response.
    -   STEP3. Cross-check each claim against the reference or authoritative sources.
    -   STEP4. Record discrepancies – classify as omissions, factual errors, or contradictions.
    -   STEP5. Assign score using the rubric, citing the most significant discrepancies.
-   幻覚の有無 (Hallucination)
    -   STEP1. Highlight factual statements – names, dates, statistics, citations, etc.
    -   STEP2. Compare with provided context and known reliable data.
    -   STEP3. Label claims as verified, unverifiable, or false.
    -   STEP4. Estimate hallucination impact – proportion and importance of unsupported content.
    -   STEP5. Assign score following the rubric and list specific hallucinated elements.

### 3.4 評価スコアの算出

では、実際に評価測定をして評価スコアを算出してみます。 まず、要約させる題材とプロンプトを用意します。 今回、グリム童話の原文は[赤ずきん](https://ja.wikipedia.org/wiki/%E8%B5%A4%E3%81%9A%E3%81%8D%E3%82%93)を使用し、プロンプトは下記を用意してみました。

```
以下のグリム童話の内容の要約を作成してください。

要件：
1. 主要な登場人物や重要な要素を特定して含める
2. 内容の流れを論理的に整理する
3. 重要な出来事や転換点を含める
4. 原文の内容に忠実であること
5. 要約の長さは500文字以内に収める

グリム童話の内容： {赤ずきんの原文}

要約："""
```

使用した評価スクリプトは下記になります。

```
import asyncio
import openai
from deepeval.metrics.g_eval.g_eval import GEval
from deepeval.metrics.g_eval.utils import Rubric
from deepeval.test_case.llm_test_case import LLMTestCase, LLMTestCaseParams

async def evaluate_comprehensive_metrics(client: openai.AsyncOpenAI, test_case: LLMTestCase, prompt_name: str, original_text: str) -> dict:
    """G-Evalメトリクス評価を実行"""

    # 回答の関連性評価 (Answer Relevancy)
    geval_answer_relevancy = GEval(
        name="Answer Relevancy",
        evaluation_steps=[
            "STEP1. **Identify user intent** – List the explicit and implicit requirements in the prompt.",
            "STEP2. **Extract answer points** – Summarize the key claims or pieces of information in the response.",
            "STEP3. **Check coverage** – Map answer points to each requirement; note any gaps.",
            "STEP4. **Detect off-topic content** – Flag irrelevant or distracting segments.",
            "STEP5. **Assign score** – Choose 1-5 from the rubric and briefly justify the choice.",
        ],
        rubric=[
            Rubric(score_range=(0, 2), expected_outcome="Largely unrelated or fails to answer the question at all."),
            Rubric(score_range=(3, 4), expected_outcome="Misunderstands the main intent or covers it only marginally; most content is off-topic."),
            Rubric(score_range=(5, 6), expected_outcome="Answers the question only partially or dilutes focus with surrounding details; relevance is acceptable but not strong."),
            Rubric(score_range=(7, 8), expected_outcome="Covers all major points; minor omissions or slight digressions that don’t harm overall relevance."),
            Rubric(score_range=(9, 10), expected_outcome="Fully addresses every aspect of the user question; no missing or extraneous information and a clear, logical focus."),
        ],
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.RETRIEVAL_CONTEXT],
        model="gpt-4o"
    )

    # 正確さ評価 (Correctness)
    geval_correctness = GEval(
        name="Correctness",
        evaluation_steps=[
            "STEP1. **Review reference answer** (ground truth).",
            "STEP2. **Isolate factual claims** in the model response.",
            "STEP3. **Cross-check** each claim against the reference or authoritative sources.",
            "STEP4. **Record discrepancies** – classify as omissions, factual errors, or contradictions.",
            "STEP5. **Assign score** using the rubric, citing the most significant discrepancies.",
        ],
        rubric=[
            Rubric(score_range=(0, 2), expected_outcome="Nearly everything is incorrect or contradictory to the reference."),
            Rubric(score_range=(3, 4), expected_outcome="Substantial divergence from the reference; multiple errors but some truths remain."),
            Rubric(score_range=(5, 6), expected_outcome="Partially correct; at least one important element is wrong or missing."),
            Rubric(score_range=(7, 8), expected_outcome="Main facts are correct; only minor inaccuracies or ambiguities."),
            Rubric(score_range=(9, 10), expected_outcome="All statements align perfectly with the provided ground-truth reference or verifiable facts; zero errors.")
        ],
        evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.RETRIEVAL_CONTEXT],
        model="gpt-4o"
    )

    # 幻覚の有無評価 (Hallucination)
    geval_hallucination = GEval(
        name="Hallucination",
        evaluation_steps=[
            "STEP1. **Highlight factual statements** – names, dates, statistics, citations, etc.",
            "STEP2. **Compare with provided context** and known reliable data.",
            "STEP3. **Label claims** as verified, unverifiable, or false.",
            "STEP4. **Estimate hallucination impact** – proportion and importance of unsupported content.",
            "STEP5. **Assign score** following the rubric and list specific hallucinated elements.",
        ],
        rubric=[
            Rubric(score_range=(0, 2), expected_outcome="Response is dominated by fabricated or clearly false content."),
            Rubric(score_range=(3, 4), expected_outcome="Key parts rely on invented or unverifiable information."),
            Rubric(score_range=(5, 6), expected_outcome="Some unverified or source-less details appear, but core content is factual."),
            Rubric(score_range=(7, 8), expected_outcome="Contains minor speculative language that remains verifiable or harmless."),
            Rubric(score_range=(9, 10), expected_outcome="All content is grounded in the given context or universally accepted facts; no unsupported claims.")
        ],
        evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.RETRIEVAL_CONTEXT],
        model="gpt-4o"
    )

    await asyncio.to_thread(geval_answer_relevancy.measure, test_case)
    await asyncio.to_thread(geval_correctness.measure, test_case)
    await asyncio.to_thread(geval_hallucination.measure, test_case)

    # Rubricスコアを推定する関数(表示用)
    def extract_rubric_score_from_normalized(normalized_score, rubric_list):
        """正規化されたスコア(0.0-1.0)からRubricの範囲を特定"""
        scaled_score = normalized_score * 10

        for rubric_item in rubric_list:
            score_range = rubric_item.score_range
            if score_range[0] <= scaled_score <= score_range[1]:
                return {
                    'scaled_score': scaled_score,
                    'rubric_range': score_range,
                    'expected_outcome': rubric_item.expected_outcome
                }
        return None

    answer_relevancy_rubric_info = extract_rubric_score_from_normalized(
        geval_answer_relevancy.score, geval_answer_relevancy.rubric
    )
    correctness_rubric_info = extract_rubric_score_from_normalized(
        geval_correctness.score, geval_correctness.rubric
    )
    hallucination_rubric_info = extract_rubric_score_from_normalized(
        geval_hallucination.score, geval_hallucination.rubric
    )

    return {
        "answer_relevancy_score": geval_answer_relevancy.score,
        "answer_relevancy_rubric_info": answer_relevancy_rubric_info,
        "answer_relevancy_reason": geval_answer_relevancy.reason,
        "correctness_score": geval_correctness.score,
        "correctness_rubric_info": correctness_rubric_info,
        "correctness_reason": geval_correctness.reason,
        "hallucination_score": geval_hallucination.score,
        "hallucination_rubric_info": hallucination_rubric_info,
        "hallucination_reason": geval_hallucination.reason,
    }

async def generate_summary(client: openai.AsyncOpenAI, prompt_template: str, full_story: str, model: str = "gpt-4o") -> str:
    """LLMを使って要約を生成"""
    prompt = prompt_template.format(context=full_story)

    try:
        response = await client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.0, top_p=0, logit_bias={}
        )
        content = response.choices[0].message.content
        return content.strip() if content else ""
    except Exception as e:
        return f"Error: {str(e)}"

async def process_prompt(client: openai.AsyncOpenAI, prompt_info: dict, full_story: str, context: list) -> dict:
    model = prompt_info.get("model", "gpt-4o")

    # 要約生成
    summary = await generate_summary(client, prompt_info["template"], full_story, model)

    # テストケース作成
    test_case = LLMTestCase(
        input=prompt_info["template"], # プロンプト
        actual_output=summary, # 要約結果
        retrieval_context=context # 要約対象(童話)の原文
    )

    # 評価実行
    metrics_result = await evaluate_comprehensive_metrics(client, test_case, prompt_info['name'], full_story)

    return {
        "prompt_name": prompt_info['name'],
        "model": model,
        "summary": summary,
        **metrics_result
    }

async def main():
    # 童話の原文を読み込み
    with open('little_red_riding_hood.txt', 'r', encoding='utf-8') as f:
        full_story = f.read().strip()

    context = [full_story]

    prompts = [
        {
            "name": "prompt-01",
            "template": """以下のテキストを読んで、内容の要約を作成してください。

要件：
1. 主要な登場人物や重要な要素を特定して含める
2. 内容の流れを論理的に整理する
3. 重要な出来事や転換点を含める
4. 原文の内容に忠実であること
5. 要約の長さは250文字以内に収める

テキスト：
{context}

要約：""",
            "model": "gpt-4o"
        },
    ]

    async with openai.AsyncOpenAI() as client:
        tasks = [
            process_prompt(client, prompt_info, full_story, context)
            for prompt_info in prompts
        ]

        all_results = await asyncio.gather(*tasks)

    # 結果表示処理
    ...

if __name__ == "__main__":
    asyncio.run(main())
```

実行した要約結果は下記になりました。

```
 昔、赤ずきんちゃんという愛らしい女の子がいました。彼女はおばあさんから赤いずきんをもらい、それをいつもかぶっていました。
 ある日、病気のおばあさんにお菓子とぶどう酒を届けるため、森を通っておばあさんの家に向かいます。
 途中で狼に出会い、行き先を教えてしまいます。狼は先回りしておばあさんを飲み込み、赤ずきんちゃんも騙して飲み込みます。
 しかし、通りかかった狩人が狼のお腹を切り開き、赤ずきんちゃんとおばあさんを救出します。赤ずきんちゃんは教訓を得て、二度と森で道を外れないと心に誓いました。
```

G-Evalが評価した結果は下記になります。(1回目を抜粋)

```
- 回答の関連性 (Answer Relevancy): 0.912
  - Expected Outcome: Fully addresses every aspect of the user question; no missing or extraneous information and a clear, logical focus.
  - Reason: The summary includes key characters like Little Red Riding Hood, her grandmother, the wolf, and the hunter. It logically organizes the flow of events, such as the journey through the forest, the encounter with the wolf, and the rescue. Important events like the wolf's deception and the rescue by the hunter are covered. The summary is faithful to the original text and concise, with no extraneous information.
- 正確さ (Correctness): 0.901
  - Expected Outcome: All statements align perfectly with the provided ground-truth reference or verifiable facts; zero errors.
  - Reason: The main facts in the Actual Output align well with the Retrieval Context, including the characters, events, and moral of the story. Minor details like the specific dialogue and actions are slightly condensed but do not affect the overall accuracy.
- 幻覚の有無 (Hallucination): 0.903
  - Expected Outcome: All content is grounded in the given context or universally accepted facts; no unsupported claims.
  - Reason:  The output closely follows the context with accurate details about Little Red Riding Hood, her grandmother, the wolf, and the hunter. The sequence of events and character actions are consistent with the context, with no unsupported claims.
```

スコアを決定した評価理由を見ますと、各指標に対して的確に評価しているようにみえます。 **3.2. 指標の選定**で、G-Evalは評価に揺らぎがあることを紹介しました。よって、上記のスクリプトを50回実行して、計測した評価数値の散布図は下記になります。  
![スクリプトを50回実行して、計測した評価数値の散布図](https://storage.googleapis.com/prd-engineering-asset/2025/06/a918ef06-newplot.png)

結果的には、すべての指標でスコア値が概ね**0.9以上**になりましたが、これで各指標のSLI値を概ね0.9としてSLOを0.9以上として目標値に掲げることはできるでしょうか？

### 3.5. 評価指標のレビュー

上記で紹介したとおり、このサービスは、**グリム童話を要約して、子供でもわかるような文章で要約してくれるサービス** です。 上記の要約結果を **子供でもわかるように** するには、下記の指標も考慮しないといけないでしょう。

-   **可読性 (Readability):** 子供が読めない難しい漢字、表現が使われていないか？
    -   騙して?、教訓?、ぶどう酒?
-   **安全性・有害性 (Toxicity / Safety):** 現代のコンプライアンスと照らし合わせて、子供には過激な表現が使われていないか?
    -   お腹を切り開き?

評価指標はお客さま価値とビジネスKPIと密接に関連付けることを意識して評価指標を選定する必要があります。 今回の要約サービスの場合、一般的評価指標より、対象者を考慮して上記の指標をタスク固有指標(Task-Specific Metrics)として最優先に考える指標にするべきです。 また、それに伴い、プロンプトも修正しなければならないでしょう。

とはいえ、初回から完璧な指標セットを作るのは困難です。 [The Complete LLM Evaluation Playbook: How To Run LLM Evals That Matter](https://www.confident-ai.com/blog/the-ultimate-llm-evaluation-playbook) では、**評価指標はまず1つから始め、最終的には5つに絞る指標設計が望ましい**とありました。 評価指標のスコアが、**Metric Outcome Fit – 指標と成果のつながり** (子どもたちに頻繁に利用されること)と、どれだけ一致しているか、意識しながら指標を選定、計測、評価する必要があります。

![Summary of Red Riding Hood](https://storage.googleapis.com/prd-engineering-asset/2025/06/87da3515-image2.png)

(実サービスだった場合、ビジネスKPIとしては、文章より画像で提供した方が、良い成果が得られるかもしれません)

### 3.6. 自動化の可能性を探る

今回の例では、人間が指標の選定、評価スコアの算出、評価スコアの算出、指標評価のレビューを実施しました。 G-EvalはGPT-4クラスのモデルに「評価手順を自分で分解して考えさせ、最終スコアだけを返させる」仕組みをとるため、人間の代わりに 評価基準の適用・スコアリング・集計までをワンショットで自動化できます。 以下はその手順例です。

1.  評価タスクの提示: 評価に使うLLMに対し、「これから提示する生成文をある評価基準に従って1〜5点で採点して下さい」といったタスク説明を与える。その際に、その評価基準の定義も明示してLLMに文脈を教える(例えば、LLMサービスの一般的評価指標にあった指標一覧を提示する)
2.  評価観点の分解: 1.でLLMが選定した指標に対して、必要な観点やステップを自ら列挙させる
3.  スコア算出: 続いてモデルに、先ほど生成した評価ステップに従い、実際の入力・出力を評価させる

注意点として、LLMが評価者だと“LLMらしい”出力を過大評価し、数語仕込むだけでスコアを操作される脆弱性があります。そのため、別系列のLLMモデルで評価してみることや、2つの回答を並べてどちらが良いか比べるペアワイズ比較、異常検知などで緩和を試みても、完全な中立性は保証できません。 また、**3.2. 指標の選定**でも紹介しましたが、G-Evalは確率的評価手法が故に、同じ回答でも評価が揺らぐという再現性に問題があり、評価プロンプトやシードを固定するなどの工夫が必要です。 これらの理由から、最終判断は必ず人間のレビューを併用して補正・検証する二段構えを取ることが不可欠です。

![Automated metric evaluation cycle](https://storage.googleapis.com/prd-engineering-asset/2025/06/810c3274-image1.png)

## 4\. まとめ

LLMサービスの信頼性評価に不可欠な指標の選定から、具体的な測定・評価方法までを、DeepEvalライブラリを用いたデモを交えてご紹介しました。 従来のAvailabilityやLatencyといった指標だけでは測りきれない『LLMサービスの信頼性評価』の指標をSLIとしてどう定義するかは、SREにとっても新しい分野だと思います。 本記事で試したDeepEvalなどの評価ツールのアプローチも、数ある選択肢の一つに過ぎません。LLMの評価指標は現在も絶賛研究中の分野であり、LLMサービスの信頼性をどう測るか、という問いに、まだ唯一の正解はなさそうです。ただ、この先、新しい評価指標や新しい測定手法が発見されたとしても、**『この指標は本当にお客さま満足度を表しているのか？』**という問いは、変わることのない本質的な問いかけだと思います。 技術の進歩とともに、この問いかけを忘れず、日々のSRE業務に取り組んでいければ幸いです。

明日の記事は @k\_kinukawaさんの「[メルカリモバイル開発チームでAI Hackathonをした話](https://engineering.mercari.com/blog/entry/20250613-64e628404a/ "メルカリモバイル開発チームでAI Hackathonをした話")」です。引き続きお楽しみください。

#### References

-   Site Reliability Engineering Book: [https://sre.google/books/](https://sre.google/books/)
-   LLM Evaluation Metrics: The Ultimate LLM Evaluation Guide: [https://www.confident-ai.com/blog/llm-evaluation-metrics-everything-you-need-for-llm-evaluation](https://www.confident-ai.com/blog/llm-evaluation-metrics-everything-you-need-for-llm-evaluation)
-   The Accuracy Trap: Why Your Model’s 90 % Might Mean Nothing: [https://medium.com/%40edgar\_muyale/the-accuracy-trap-why-your-models-90-might-mean-nothing-f3243fce6fe8](https://medium.com/%40edgar_muyale/the-accuracy-trap-why-your-models-90-might-mean-nothing-f3243fce6fe8)
-   The Complete LLM Evaluation Playbook: How To Run LLM Evals That Matter: [https://www.confident-ai.com/blog/the-ultimate-llm-evaluation-playbook](https://www.confident-ai.com/blog/the-ultimate-llm-evaluation-playbook)
-   レーベンシュタイン距離: [https://note.com/noa813/n/nb7ffd5a8f5e9](https://note.com/noa813/n/nb7ffd5a8f5e9)
-   LLM evaluation metrics — BLEU, ROUGE and METEOR explained: [https://avinashselvam.medium.com/llm-evaluation-metrics-bleu-rogue-and-meteor-explained-a5d2b129e87f](https://avinashselvam.medium.com/llm-evaluation-metrics-bleu-rogue-and-meteor-explained-a5d2b129e87f)
-   BERTScore: [https://openreview.net/pdf?id=SkeHuCVFDr](https://openreview.net/pdf?id=SkeHuCVFDr)
-   BERT: [https://en.wikipedia.org/wiki/BERT\_(language\_model)](https://en.wikipedia.org/wiki/BERT_/\(language_model/\))
-   コサイン類似度: [https://atmarkit.itmedia.co.jp/ait/articles/2112/08/news020.html](https://atmarkit.itmedia.co.jp/ait/articles/2112/08/news020.html)
-   MoverScore: [https://arxiv.org/abs/1909.02622](https://arxiv.org/abs/1909.02622)
-   Earth Mover’s Distance（最適輸送距離）: [https://zenn.dev/derwind/articles/dwd-optimal-transport01#%E6%9C%80%E9%81%A9%E8%BC%B8%E9%80%81%E8%B7%9D%E9%9B%A2](https://zenn.dev/derwind/articles/dwd-optimal-transport01#%E6%9C%80%E9%81%A9%E8%BC%B8%E9%80%81%E8%B7%9D%E9%9B%A2)
-   G-Eval (Paper): [https://arxiv.org/abs/2303.16634](https://arxiv.org/abs/2303.16634)
-   G-Eval Simply Explained: LLM-as-a-Judge for LLM Evaluation: [https://www.confident-ai.com/blog/g-eval-the-definitive-guide](https://www.confident-ai.com/blog/g-eval-the-definitive-guide)
-   QAG Score: [https://arxiv.org/abs/2210.04320](https://arxiv.org/abs/2210.04320)
-   SelfCheckGPT: [https://arxiv.org/abs/2303.08896](https://arxiv.org/abs/2303.08896)
-   DAG(deep acyclic graph): [https://deepeval.com/docs/metrics-dag](https://deepeval.com/docs/metrics-dag)
-   Prometheus2 Model: [https://arxiv.org/abs/2405.01535](https://arxiv.org/abs/2405.01535)
-   DeepEval: [https://deepeval.com/docs/getting-started](https://deepeval.com/docs/getting-started)
-   Vertex AI – モデルベース評価の指標プロンプト テンプレート: [https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates)
-   赤ずきん: [https://ja.wikipedia.org/wiki/%E8%B5%A4%E3%81%9A%E3%81%8D%E3%82%93](https://ja.wikipedia.org/wiki/%E8%B5%A4%E3%81%9A%E3%81%8D%E3%82%93)