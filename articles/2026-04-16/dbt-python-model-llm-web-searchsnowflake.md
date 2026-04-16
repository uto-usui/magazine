---
title: "人手のリサーチをデータパイプラインに。dbt Python model × LLM Web Searchで公開情報をSnowflakeに載せるまで"
source: "https://tech.layerx.co.jp/entry/dbt-python-model-llm-web-search-to-snowflake"
publishedDate: "2026-04-14"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "saeeeeru"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/saeeeeru/20260414/20260414102009.png)

LayerX BizOps 部データグループのさえない ([@saeeeeru](https://x.com/saeeeeru)) です。最近は娘と『名探偵プリキュア！』にハマっています。「自分で見て、感じて、考えて、"本当"の答えを出す」。AI 時代だからこそ刺さるメッセージです（推理パートをちゃんと解けるようになりたい）。

[前回の記事](https://tech.layerx.co.jp/entry/dbt-python-external-integration-patterns)では、dbt Python model から外部 API を呼び出す実装パターンを紹介しました。今回はその応用として、LLM の Web Search 機能を使って公開情報を取得し、それをデータパイプラインに組み込む実践例を書きます。

この記事では、まず **LLM の Web Search 機能をどう使うとデータパイプラインに載せやすい形になるのか** を説明し、そのうえで **Snowflake / dbt にどう載せたのか**、そして本番運用の中で**どんな品質課題が見えてきたのか**、という順に整理します。

* * *

この記事の技術が必要になった背景には、分析基盤である Snowflake にない外部の公開情報を継続的に取り込みたい、というモチベーションがありました。たとえば、既存の属性情報だけでは判断材料が不足し、企業サイトやニュースリリースのような一次情報を補助的に参照したくなるケースがあります。

こうした情報を毎回人手で見に行く運用は継続しづらい一方で、自然言語のまま取得しても構造化データではないためデータ処理対象として扱いづらいです。この章では、**外部 Web 上の公開情報をどう取得し、どうすれば Snowflake / dbt のパイプラインで扱える形にできるか** を説明します。

### 外部 Web Search の実装パターン

外部の公開情報を取得する手段として、まず古典的なスクレイピングがあります。しかし、企業サイト・ニュースリリース・メディア記事など多様なソースの Web ページを対象にする場合、サイトごとにパーサーを書いて構造化するのは現実的ではありません。取得したい情報が「資金調達をしたか」「事業内容は何か」といった、自然言語の意味を解釈したうえでの抽出である以上、LLM を介する必要がありました。

LLM を使って外部の公開情報を取得・構造化する場合、実装パターンは大きく 2 つあります。

-   **検索 API と LLM API を分けるパターン** : 検索と要約・抽出を別々の API で組み合わせる
-   **Web Search を内包した LLM API を使うパターン** : 検索と応答生成を 1 つの API でまとめて扱う

今回の設計では、検索から構造化までを LLM に任せて実装と運用をシンプルに保ちたかったため、後者の Web Search を内包した LLM API を採用しました。具体的には Azure OpenAI の Responses API + `web_search_preview` を使っています。

ただ、LLM の応答を自然文のまま返させるだけでは後続のデータ処理につなぎにくいため、Responses API の応答は JSON として返させるよう設計しました。Snowflake 上ではまず半構造化データとして保持し、必要な情報を後段で扱いやすい形に整えていきます。次の節では、「何を抽出し、どの粒度で持つか」という出力スキーマの設計を説明します。

### スキーマ設計の重要性

スキーマの具体的な定義はユースケースによって異なりますが、重要なのは以下の 2 つの補助情報を含めることです。 Web Search を使っても誤りは残るため、重要なのは「誤りをなくすこと」よりも、「**後から確認ができる情報を残すこと」**だと考えています。

-   `confidence`: `high` / `medium` / `low` の 3 段階で、モデル自身の確信度を自己申告させる
-   `evidence`: 出典 URL と該当箇所のスニペットを配列で返させる

これにより、利用者が情報を鵜呑みにせず、「根拠を確認してから判断する」運用を組み込みやすくなります。`confidence` はあくまで自己申告であり、`evidence` も正しさそのものを保証するわけではありませんが、少なくとも確認を始める手がかりは残せます。

ここまでが、「Web Search をどう実装し、データパイプラインに載せるにはどんな出力スキーマが必要か」という話です。続いて、その処理を Snowflake / dbt の中でどう実装・運用したかを見ていきます。

* * *

### なぜ dbt Python model で LLM API を呼び出す構成にしたのか

今回の本番構成では、dbt Python model から LLM API を呼び出す形を採用しました。

正直なところ、一番大きかったのは、**Snowflake / dbt の既存パターンの延長として、データエンジニアが実装・運用しやすかったこと**があります。

LayerX のデータ基盤では、各種 SaaS API を呼び出す dbt Python model の実装がすでに多数あります（[前回の記事](https://tech.layerx.co.jp/entry/dbt-python-external-integration-patterns)で紹介したパターン）。そのため、LLM API の呼び出しも同じパターンに載せるのが自然でした。

全体像は次の通りです。

graph TD
    subgraph Snowflake
        MASTER\["マスターデータ"\]
        subgraph dbt\["dbt レイヤー構成"\]
            PY\["dbt Python model<br/>対象レコードの抽出 / API 呼び出し / JSON 格納"\]
            LND\["landing<br/>取得直後の RAW\_JSON"\]
            SRC\["src<br/>不正データ除外 / 取得手段の隠蔽"\]
            DWH\["dwh<br/>再利用を意識した再構成"\]
            MART\["mart<br/>用途特化の利用データ"\]
        end
    end

    subgraph RESP\["Responses API"\]
        API\["Web Search<br/>+ JSON 応答"\]
    end

    MASTER --> PY
    PY -- "Snowflake から<br/>外部 API へ接続" --> API
    API -- "JSON 応答" --> PY
    PY --> LND
    LND --> SRC --> DWH --> MART
    MASTER -.-> DWH
    MASTER -.-> MART

ここでいうデータのレイヤーは、社内では大きく `landing`、`src`、`dwh`、`mart` に分かれています。役割としては、`landing` は取得直後のデータを保持する層、`src` は取得手段を隠蔽しつつほぼ生データとして扱いやすくする層、`dwh` は再利用を意識して再構成する層、`mart` は用途特化で利用する層です。今回の記事で主に扱うのは、`landing -> src` までです。

このように、dbt に載せておくと、Snowflake 上の既存データを参照しながら、Responses API の呼び出し対象を絞り込めます。これはコストを抑えるのに効くため、後述する Incremental 戦略の前提になります。それに加えて、 Snowflake 上の他のユースケースにも展開しやすいという見通しもありました。

* * *

## 実装: dbt Python model × LLM API　（Web Search）

### dbt Python model の実装

この節では dbt Python model 側の実装を紹介しますが、Snowflake に寄った実装詳細になっています。

コードのポイントを先に整理しておきます。

-   並列実行: Responses API は 1 リクエストあたり 10〜30 秒かかるため、`ThreadPoolExecutor(max_workers=10)` で並列化しています。`10` は Snowflake 上での実行負荷と API 側の待ち時間を見ながら調整した値です
-   Incremental: `dbt.is_incremental` + `leftanti` join で、直近 N 日以内に処理済みのレコードをスキップします。N の値は取得対象の情報の更新頻度を意識して設計します
-   リトライ: JSON パースエラーと API エラー（429 等）を Exponential backoff で共通処理しています

> **Note**: 認証情報は Snowflake の Generic Secret + External Access Integration で管理しています。また、 `dbt.ref()` と `dbt.is_incremental` は、どちらも dbt が組み込みで用意している参照・条件分岐のための機能です

import json
import logging
import time
from concurrent.futures import ThreadPoolExecutor, as\_completed
from datetime import datetime, timezone

import \_snowflake
import pandas as pd
import requests
from snowflake.snowpark import Session
from snowflake.snowpark.functions import col



OUTPUT\_SCHEMA = {
    "type": "json\_schema",
    "json\_schema": {
        "name": "web\_search\_result",
        "strict": True,
        "schema": {
            
        },
    },
}

SYSTEM\_PROMPT = "ここにプロンプトを入れる"

MAX\_WORKERS = 10
MAX\_RETRIES = 3
BACKOFF\_BASE\_SECONDS = 1
SKIP\_DAYS = 30

def build\_payload(input\_text: str) -> dict:
    return {
        "input": input\_text,
        "instructions": SYSTEM\_PROMPT,
        "tools": \[{"type": "web\_search\_preview"}\],
        "text": {"format": OUTPUT\_SCHEMA},
    }

def extract\_output\_text(response\_json: dict):
    """
    Responses API のレスポンスから JSON 文字列を取り出す。
    実際のレスポンス構造は SDK / API バージョンに合わせて実装する。
    """
    for item in response\_json.get("output", \[\]):
        if item.get("type") != "message":
            continue
        for content in item.get("content", \[\]):
            if content.get("text"):
                return content\["text"\]
    return None

def call\_llm\_api(input\_text: str, api\_key: str, endpoint: str, deployment: str) -> dict:
    """1 件分の Web 検索 + 構造化出力を取得する。"""
    
    url = f"{endpoint}/openai/deployments/{deployment}/responses"
    headers = {"api-key": api\_key, "Content-Type": "application/json"}
    payload = build\_payload(input\_text)

    for attempt in range(MAX\_RETRIES):
        try:
            resp = requests.post(url, headers=headers, json=payload, timeout=60)
            resp.raise\_for\_status()
            output\_text = extract\_output\_text(resp.json())
            if not output\_text:
                logging.warning(
                    json.dumps(
                        {
                            "event\_name": "web\_search\_no\_message",
                            "input\_text": input\_text,
                            "attempt": attempt,
                        }
                    )
                )
                if attempt < MAX\_RETRIES - 1:
                    time.sleep(BACKOFF\_BASE\_SECONDS \* (2\*\*attempt))
                    continue
                return {"error": "no\_message\_in\_response", "\_input": input\_text}
            parsed = json.loads(output\_text)
            parsed\["\_input"\] = input\_text
            return parsed

        except json.JSONDecodeError as e:
            logging.warning(
                json.dumps(
                    {
                        "event\_name": "web\_search\_json\_parse\_error",
                        "input\_text": input\_text,
                        "attempt": attempt,
                        "error": str(e)\[:500\],
                    }
                )
            )
            if attempt < MAX\_RETRIES - 1:
                time.sleep(BACKOFF\_BASE\_SECONDS \* (2\*\*attempt))
                continue
            return {"error": f"json\_parse\_error: {str(e)\[:500\]}", "\_input": input\_text}
        except Exception as e:
            logging.warning(
                json.dumps(
                    {
                        "event\_name": "web\_search\_call\_failed",
                        "input\_text": input\_text,
                        "attempt": attempt,
                        "error": str(e)\[:500\],
                    }
                )
            )
            if attempt < MAX\_RETRIES - 1:
                time.sleep(BACKOFF\_BASE\_SECONDS \* (2\*\*attempt))
                continue
            return {"error": str(e)\[:500\], "\_input": input\_text}

    return {"error": "max retries exceeded", "\_input": input\_text}

def model(dbt, session: Session):
    dbt.config(
        materialized="incremental",
        incremental\_strategy="append",
        packages=\["requests"\],
        external\_access\_integrations=\["your\_access\_integration"\],
        secrets={"api\_key": "your\_api\_key\_secret\_name"},
    )

    
    source\_df = (
        dbt.ref("input\_list")
        .select(col("key").alias("input\_key"))
        .distinct()
    )

    if dbt.is\_incremental:
        existing\_df = session.table(f"{dbt.this}").select("input\_key", "enriched\_at")
        recent\_existing\_df = existing\_df.filter(
            f"enriched\_at >= dateadd('day', -{SKIP\_DAYS}, current\_timestamp())"
        )
        source\_df = source\_df.join(
            recent\_existing\_df.select("input\_key"),
            on="input\_key",
            how="left\_anti",
        )

    targets = source\_df.to\_pandas()

    if targets.empty:
        return session.create\_dataframe(
            \[\],
            schema=\["input\_key", "raw\_json", "enriched\_at"\],
        )

    
    api\_key = \_snowflake.get\_generic\_secret\_string("api\_key")
    endpoint = "https://your-llm-endpoint.example.com"
    deployment = "your-deployment"

    results = \[\]
    with ThreadPoolExecutor(max\_workers=MAX\_WORKERS) as executor:
        futures = {
            executor.submit(call\_llm\_api, row\["INPUT\_KEY"\], api\_key, endpoint, deployment): row\["INPUT\_KEY"\]
            for \_, row in targets.iterrows()
        }
        for future in as\_completed(futures):
            input\_key = futures\[future\]
            try:
                results.append(future.result())
            except Exception as e:
                results.append({"error": str(e), "\_input": input\_key})

    
    enriched\_at = datetime.now(timezone.utc)
    rows = pd.DataFrame(
        \[
            {
                "input\_key": r.get("\_input", ""),
                "raw\_json": json.dumps(r, ensure\_ascii=False),
                "enriched\_at": enriched\_at,
            }
            for r in results
        \]
    )

    return session.create\_dataframe(rows)

### landing → src: RAW\_JSON の構造化

dbt Python model の出力は、`landing` レイヤーに RAW\_JSON として Incremental append されます。ここではまず取得直後の半構造化データを保持し、下流で扱いやすくするために `src` レイヤーで `PARSE_JSON` を使って必要なキーを抽出します。つまり、`landing` で取得結果そのものを残し、`src` で不正データの除外や取得手段の隠蔽を行いながら、ほぼ生データとして扱える形に寄せる、という分担になっています。

with

import\_landing as (
    select input\_key, raw\_json, enriched\_at
    from {{ ref('landing\_\_azure\_openai\_\_web\_search') }}
),

logic\_parse\_json as (
    select input\_key, parse\_json(raw\_json) as raw\_json, enriched\_at
    from import\_landing
),

logic\_parsed as (
    select
        input\_key,
        raw\_json:confidence::varchar as confidence,
        raw\_json:evidence::variant   as evidence,
        
        
        enriched\_at
    from logic\_parse\_json
    where raw\_json:error is null
)

select \* from logic\_parsed

こうすることで、下流の `dwh` レイヤーでは、通常の dbt SQL model として既存のテーブルと JOIN しながら、再利用を意識した形に再構成できます。用途特化の加工が必要であれば、その先の `mart` で受けることもできます。LLM パイプラインの出力を、他の外部ソース由来データと同じようにデータ基盤の標準レイヤーの中で扱いやすくする、というのがこの構成の狙いです。

* * *

### PoC から本番運用で見えてきたこと

### PoC の進め方と Go/No-Go 判断

LLM API の Web Search を組み込んだパイプラインは、プロンプトを書いただけでは品質が読めません。本番投入の前に、少数サンプルで「このユースケースに対して実用になるか」を判断する PoC フェーズを設けました。

**検証プロセス**

1.  少数サンプルで実行: まず数件分だけ Snowflake 上で実行し、出力を目視確認します。JSON のパースが通るか、期待したキーにそれらしい値が入っているかを手で見るフェーズです
2.  品質指標の設計: 目視確認で「いけそうだ」となったら、Go/No-Go を判断するための定量指標を定義します。今回は以下の 3 つを設定しました
    -   情報取得成功率: API エラーや JSON パースエラーなく情報を返せるか
    -   出典確認成功率: 出典 URL を実際に開いて、参照先が有効であり、出力内容と整合しているかを人手で確認
    -   コスト: 1 リクエストあたりの API コストが許容範囲に収まるか
3.  Go/No-Go 判断: 各指標に閾値を設け、全指標が閾値を満たせば本番移行。満たさなければプロンプト改善 or 設計見直し

PoC の結果はいずれの指標も良好で、本番運用に移行しました。

### 本番運用で顕在化した課題

PoC では良好だった品質も、本番運用で数百件を処理すると想定していなかったパターンが顕在化してきました。代表的だったのは、`confidence=high` かつ `evidence` 付きでも、実際には無効な URL を根拠として返すケースです。

これは、引用した根拠自体が有効でないという引用根拠の妥当性の問題で、プロンプトの改善（「推測で補完しないこと」「根拠が取れない場合は unknown を返すこと」等）である程度は抑制できますが、**プロンプトだけでゼロにはできない**というのが現時点の実感です。次のステップとして、Snowflake AI Observability（[SnowflakeでAI Observabilityを実現する](https://tech.layerx.co.jp/entry/snowflake-ai-observability)）を使った出力品質の定量評価や、Human-in-the-Loop によるフィードバック収集の仕組みを検討しています。

* * *

### まとめ

dbt の中心的な役割は変換処理ですが、dbt Python model を使うと、外部データの取得から下流の整形までを同じデータパイプラインの中で扱いやすくなります。今回のパターンは、LLM API の Web Search で取得したデータを Snowflake に蓄積し、後続のモデルで使える形に整えていく用途に向いています。こうして公開情報が継続的にデータ基盤へ載るようになると、後続ユースケースでも毎回個別に外部情報を取りに行かずに済むようになり、判断材料のばらつきを減らすことにつながります。

今後は、本番運用で見えてきた品質課題に対して Snowflake AI Observability による定量評価の仕組みを整備し、出力品質が担保されたデータパイプラインへ進化させていく予定です。

AI-Ready なデータ基盤を、事業成果に直結する形で作る挑戦に興味を持った方は、Data Enablingチームとお話ししましょう。アナリティクスエンジニア、データエンジニアのカジュアル面談はこちらから 👇

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/2cccdd370bae80068a1ec3cc8bae5fb0/)