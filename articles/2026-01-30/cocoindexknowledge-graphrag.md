---
title: "CocoIndexでKnowledge Graphを更新しながらRAGをする"
source: "https://tech.layerx.co.jp/entry/2025/12/22/151018"
publishedDate: "2025-12-22"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "takatorix"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20251222/20251222110322.png)

LayerXのAi Workforce事業部で検索エンジニアをしている鷹取([@takatorisatoshi](https://x.com/takatorisatoshi))です。この記事は [LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)の22日目の記事です。

## はじめに

通常、RAGといえば、ドキュメントをチャンク化し、Embedding（埋め込みベクトル）の類似度で検索を行う**Native RAG**（Retrieval-Augmented Generation）を指すことが一般的です。 Native RAGは手軽に導入できる一方で、いくつかの構造的な弱点があります。例えば、ベクトル化の過程で主語・述語・目的語といった論理構造が圧縮（Flatten）されてしまうことによる「関係性」の欠落です。また**、**「Multi-hop推論」への弱さも挙げられます。「AはBであり、BはCである。ならばAはCか？」といった複数の情報をまたぐ推論が苦手なため、情報は取得できても質問に対する「正しい答え」を構成できないケースが生じます。

こうした課題を解決する手法として注目されているのが、**GraphRAG**（Knowledge Graph-based RAG）です。GraphRAGでは、テキストデータからエンティティ（実体）とリレーション（関係性）を抽出してナレッジグラフ（KG）を構築します。これにより、データ間の「繋がり」を明示的に保存した**構造化された知識**を扱えるようになるだけでなく、ドキュメント全体を俯瞰した要約や複雑な推論といった**グローバルな推論**までもが可能になります。このように、GraphRAGはNative RAGでは困難だった高度な質問にも回答できますが、その構築難易度は決して低くありません。

本記事では、**CocoIndex**と**Neo4j**を活用し、自動更新が可能なナレッジグラフ構築パイプラインを作成してGraphRAGを実践してみます。

[cocoindex.io](https://cocoindex.io/)

**CocoIndex**は、指定されたデータソースから効率的にインデックスを構築するための**ETLフレームワーク**です。コアエンジンがRustで実装されているため、高いパフォーマンスを発揮します。また、Pythonを利用して「データの取得 → 変換（チャンク分割・埋め込みなど） → 出力」という一連のフローを、まるで**レゴブロックを組み合わせるように直感的**に構築できるのが特徴です。

さらに、CocoIndexの大きな強みは、一度設定したインデックスフローによって**データソースとターゲット間の関係を長期的に追跡できる点**にあります。

従来のRAG開発では、元のドキュメントが更新されるたびにインデックス全体を作り直したり、複雑な同期処理を自前で実装したりする必要があるといった課題がありました。CocoIndexは、こうした**「データの同期と管理」を自動化・簡素化**することで、常に最新の状態を保つパイプラインの構築を容易にしてくれます。

## 実装：ローカル環境でのGraphRAG構築

* * *

ここからは、CocoIndexを使ってローカル環境でGraphRAGを実装する方法を解説します。全体のアーキテクチャは以下の図の通りです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20251222/20251222091707.jpg)

図の左側がインデクシング側、右側がクエリ（検索）側のプロセスを示しています。

-   インデクシング時： CocoIndexを使用してドキュメントを処理します。エンティティとリレーションの抽出にはOllama（ローカルLLM）を使用し、グラフデータベースにはNeo4jを採用しています。
-   クエリ時： 入力されたクエリをベクトル化（Embedding）し、意味的に近いエンティティとリレーションを抽出します。あわせて、それらに紐づくドキュメントの内容も取得し、両方の情報をLLMに渡すことで精度の高い回答を生成します。

それでは、実際の実装内容を見ていきましょう。 本記事では主にインデクシング（Indexing）の実装について解説します。なお、コードの全体像はGitHubで公開しています。

[github.com](https://github.com/takatori/coco-index-sample)

CocoIndexを使ってインデックス・パイプラインを構築します。まず `main.py`というファイルを作成し、以下の内容を記載していきます。

### データソースの定義

最初にデータソースを定義します。今回は、NewsAPIを使って取得したニュースデータをローカルに保存したMarkdownファイルを対象とします。

CocoIndexは複数のソースタイプに対応しており、S3やAzure Blob Storageなど、ソース側がPushによる変更通知に対応していれば、変更を検知して自動的に処理を開始することも可能です。今回はローカルファイルから読み込むため、定期的にスキャンを行い、ファイルの変更や追加があるかを確認する設定にしています。

@cocoindex.flow\_def(name="NewsToKG")
def news\_to\_kg\_flow(
    flow\_builder: cocoindex.FlowBuilder, data\_scope: cocoindex.DataScope
):

    
    data\_scope\["news"\] = flow\_builder.add\_source(
        cocoindex.sources.LocalFile(
            path="data/news\_storage", included\_patterns=\["\*.md"\]
        ),
        
        refresh\_interval=datetime.timedelta(seconds=5), 
    )

### Collectorの定義

次に、**Collector**を定義します。Collectorは、変換結果を「行（レコード）」として蓄積し、最終的にNeo4jなどのターゲットへエクスポートするための「入れ物」の役割を果たします。

news\_node = data\_scope.add\_collector()
entity\_node = data\_scope.add\_collector()
entity\_relationship = data\_scope.add\_collector()
entity\_mention = data\_scope.add\_collector()

with data\_scope\["news"\].row() as news:
    
    news\_node.collect(
        filename=news\["filename"\],
        content=news\["content"\],
    )

### LLMによるエンティティとリレーションの抽出

続いて、LLMを活用してテキストからエンティティとリレーションを抽出します。 変換処理には `cocoindex.functions.ExtractByLlm` を使用します。これは、指定されたLLMを用いてテキストから構造化情報を抽出する機能です。

今回はローカルで動作する**Ollama**（モデル：`qwen3:14b-q8_0`）を使用しますが、OpenAIなどのAPIを利用することも可能です。

llm\_spec = cocoindex.LlmSpec(api\_type=cocoindex.LlmApiType.OLLAMA, model="qwen3:14b-q8\_0")


news\["relationships"\] = news\["content"\].transform(
    cocoindex.functions.ExtractByLlm(
        llm\_spec=llm\_spec,
        output\_type=list\[Relationship\],
        instruction=(
            "Extract all relationships from the news content as a JSON array. "
            "Each relationship must have 'subject', 'predicate', and 'object' fields. "
            "Subject and object should be nouns (entities, concepts, people, technologies, companies). "
            "Predicate should be a verb or verb phrase describing the relationship. "
            'Example output: \[{"subject": "GitHub", "predicate": "releases", "object": "Copilot agents"}\]'
        ),
    )
)

ここで、`output_type` にデータクラスを指定することで、LLMの出力を特定の型に制限できます。今回は以下のデータ構造を定義して抽出を行っています。

@dataclasses.dataclass
class Relationship:
    subject: str
    predicate: str
    object: str

### 埋め込み（Embedding）の付与とCollectorへの追加

抽出したエンティティに対し、検索時に利用するための**埋め込みベクトル（Embedding）**を付与します。その後、エンティティとリレーションの情報をそれぞれのCollectorに追加していきます。

with news\["relationships"\].row() as relationship:
    
    relationship\["subject\_embedding"\] = relationship\["subject"\].transform(
        cocoindex.functions.SentenceTransformerEmbed(
            model="sentence-transformers/all-MiniLM-L6-v2"
        )
    )
    entity\_node.collect(
        value=relationship\["subject"\],
        embedding=relationship\["subject\_embedding"\],
    )
        entity\_relationship.collect(
            id\=cocoindex.GeneratedField.UUID,
            subject=relationship\["subject"\],
            object\=relationship\["object"\],
            predicate=relationship\["predicate"\],
        )

### Neo4jへのエクスポートとグラフ構築

最後に、蓄積したデータを**Neo4j**へエクスポートしてナレッジグラフを構築します。 組み込みの `cocoindex.storages.Neo4j` を使い、Collector内のデータをNeo4jのノードやリレーションシップにマッピングします。

この際、`primary_key_fields` を指定することで、同一のノードが重複して作成されるのを防ぎ、既存のデータとマージ（統合）することができます。

entity\_node.export(
    "entity\_node",
    cocoindex.storages.Neo4j(
        connection=conn\_spec, 
        mapping=cocoindex.storages.Nodes(label="Entity")
    ),
    primary\_key\_fields=\["value"\],
)


entity\_relationship.export(
    "entity\_relationship",
    cocoindex.storages.Neo4j(
        connection=conn\_spec,
        mapping=cocoindex.storages.Relationships(
            rel\_type="RELATIONSHIP",
            source=cocoindex.storages.NodeFromFields(
                label="Entity",
                fields=\[
                    cocoindex.storages.TargetFieldMapping(
                        source="subject", target="value"
                    ),
                \],
            ),
            target=cocoindex.storages.NodeFromFields(
                label="Entity",
                fields=\[
                    cocoindex.storages.TargetFieldMapping(
                        source="object", target="value"
                    ),
                \],
            ),
        ),
    ),
    primary\_key\_fields=\["id"\],
)

### グラフ構築の実行

以上で、ナレッジグラフ作成のためのパイプライン定義が完了しました。 実際に動かしてグラフが構築されるか確認してみましょう。データソースとなるMarkdownファイルは、`data/news_storage` ディレクトリに保存されています。

以下のコマンドを実行すると、CocoIndexが自動的にドキュメントを読み込み、インデックス構築を開始します。

cocoindex update main.py -L

ここで `-L` パラメータを付与することで、CocoIndexは常にデータの変更を監視するようになります。ファイルの追加や更新を検知して自動でグラフが更新されるため、非常に効率的な運用が可能です（一度だけ実行したい場合は、このパラメータを外して実行してください）。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20251222/20251222091819.png)

### Knowledge Graphの自動更新を確認

続いて、以下の内容を含む新しいドキュメントをディレクトリに追加してみます。

\# 更新可能なKnowledge GraphをCocoIndexで作りGraphRAGをする

- \*\*Author\*\*: takatori
- \*\*Published\*\*: 2025-12-20T16:59:00Z

---

Neo4jとCocoIndexを使ってローカル環境でGraphRAGをやってみます。

インデクシング時にはCocoIndexを使ってドキュメントを処理します。EntityとRelationの抽出にはOllamaを使ってローカルLLMで行います。GraphDBとしてはNeo4jを使います。クエリ時には入力されたクエリをembeddingし意味的に近いentityとrelationを抽出。また、それらに紐づくドキュメントの中身も取得し両方をLLMに渡すことで回答を生成します。

ドキュメントを追加すると、CocoIndexが自動的に変更を検知し、差分インデックスを作成します。これにより、以下の図のように、新しいノードが自動で追加されたことが確認できます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20251222/20251222091821.png) ![](https://cdn-ak.f.st-hatena.com/images/fotolife/t/takatorix/20251222/20251222091823.png)

ドキュメントが削除された場合は、同様にノードが削除されます。

### RAGの動作確認

最後に、追加したドキュメントの内容について質問を投げ、適切な回答が得られるかを確認します。

ここでは以下のクエリを実行し、意味的に近いエンティティとその周辺のリレーションを抽出しています。まず、入力されたベクトルに対して意味が近いノードをベクトル検索で特定します。次に、そのノードから直接つながる関係（0ホップ）だけでなく、さらにその先の隣接する関係（1ホップ）までを網羅的に探索します。

これにより、検索されたエンティティ本体と、それを取り巻く2階層分の文脈情報を関連度順に整理して取得することができます。

CALL db.index.vector.queryNodes('entity\_embedding', $top\_k, $queryVector)
YIELD node, score
// Direct relationships (0-hop)
OPTIONAL MATCH (node)-\[r1:RELATIONSHIP\]-(related1)
// 1-hop neighbors
OPTIONAL MATCH (related1)-\[r2:RELATIONSHIP\]-(related2)
WHERE related2 <> node
WITH node, score,
        collect(DISTINCT {predicate: r1.predicate, related: related1.value, hop: 0}) AS direct,
        collect(DISTINCT {from: related1.value, predicate: r2.predicate, related: related2.value, hop: 1}) AS one\_hop
RETURN node.value AS entity, score, direct, one\_hop
ORDER BY score DESC

以下が、実際にLLMから得られたレスポンスです。新たに追加したドキュメントの情報に基づき、正しい回答が生成されていることが確認できました。

\=== GraphRAG Query: 'Neo4jとCocoIndexの関係は？日本語で答えて' ===

## Generated Answer:
\--------------------------------------------------
Neo4jとCocoIndexの関係は、\*\*GraphRAG（Graph Retrieval-Augmented Generation）の実装において協力関係にある\*\*ものです。
具体的には、CocoIndexはドキュメントのインデクシング処理に使用され、
EntityとRelationの抽出にはローカルLLM（Ollama）が利用される一方、
GraphDBとしてNeo4jがデータを保存・管理する役割を果たしています\[Source 4\]。  

また、知識グラフの関係性によると、\*\*GraphRAGはCocoIndexを実行する\*\*ことが明記されており\[Source N\]、
Neo4jはGraphRAGの一部として機能しています。このように、Neo4jはCocoIndexと連携して
、ドキュメントの意味的検索や関連情報の抽出を支えるインフラとして位置付けられています。
\--------------------------------------------------

## Sources:
\[Source 1\] 2025-11-27\_source-atlas\_0.1.2.md
\[Source 2\] 2025-11-27\_source-atlas\_0.1.1.md
\[Source 3\] 2025-11-27\_source-atlas\_0.1.4.md
\[Source 4\] 2025-12-20\_neo4j-takatori.md
\[Source 5\] 2025-12-05\_neo4j-viz\_1.0.0.md

## まとめ

本記事では、**CocoIndexとNeo4j**を活用し、リアルタイムに変更を反映可能なナレッジグラフを用いた**GraphRAG**の構築手法を紹介しました。

今回の検証を通して、CocoIndexがディレクトリ内のドキュメント追加を即座に検知し、手動で再インデックスを行う手間なく、常に最新の情報に基づいた回答を生成できることが確認できました。このような自動化された仕組みは、情報の更新頻度が高いRAGシステムの運用負荷を軽減し、より実用的なシステムの構築を可能にします。

今回はナレッジグラフを用いた「ローカル検索」に焦点を当てましたが、今後はデータ全体を俯瞰する**グローバル検索**や、多角的な推論を行う**DRIFT検索**といった高度な検索手法についても、その有用性をさらに深掘りして検証していきたいと考えています。

* * *

ここまでお読みいただきありがとうございました。LayerXではAI時代の検索・データ基盤を一緒に作ってくれる方を絶賛募集中です。興味を持っていただけた方がいたら、ぜひ一度お話しましょう！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/2a8cdd370bae80bd9e08d98cd48ced64/)