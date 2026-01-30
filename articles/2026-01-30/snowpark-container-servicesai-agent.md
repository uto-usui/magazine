---
title: "Snowpark Container Servicesを用いたAI Agentのプロトタイプ開発"
source: "https://tech.layerx.co.jp/entry/2025/12/22/204104"
publishedDate: "2025-12-22"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "shimacos"
---

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shimacos/20251222/20251222194910.png)

## はじめに

こんにちは。LayerX のバクラク事業部で機械学習エンジニアをしております島越([@nt\_4o54](https://x.com/nt_4o54))です。 この記事は [LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025)の 22 日目の記事です！ 今回の記事では、AI Agent のプロトタイプ開発において、Snowpark Container Service（SPCS）を活用したアプローチについてご紹介します。

-   [はじめに](#はじめに)
    -   [AI Agent 開発における「データアクセス」という壁](#AI-Agent-開発におけるデータアクセスという壁)
    -   [開発環境と本番環境のギャップ](#開発環境と本番環境のギャップ)
    -   [LayerX における AI Agent 開発の背景](#LayerX-における-AI-Agent-開発の背景)
    -   [LayerX のデータ基盤と Snowflake](#LayerX-のデータ基盤と-Snowflake)
-   [Snowpark Container Service（SPCS）とは](#Snowpark-Container-ServiceSPCSとは)
    -   [概要](#概要)
    -   [SPCS の基本的な仕組み](#SPCS-の基本的な仕組み)
        -   [1\. Image Registry](#1-Image-Registry)
        -   [2\. Compute Pool](#2-Compute-Pool)
        -   [3\. Service Specification](#3-Service-Specification)
        -   [4\. Service](#4-Service)
        -   [コンポーネント間の連携フロー](#コンポーネント間の連携フロー)
        -   [補足：Jobs と Service Functions](#補足Jobs-と-Service-Functions)
    -   [なぜ SPCS が AI Agent 開発に適しているのか](#なぜ-SPCS-が-AI-Agent-開発に適しているのか)
-   [実際の AI Agent デモ開発の流れ](#実際の-AI-Agent-デモ開発の流れ)
    -   [Step 1: ローカルでのコア開発](#Step-1-ローカルでのコア開発)
    -   [Step 2: Claude Code によるフロントエンド開発](#Step-2-Claude-Code-によるフロントエンド開発)
    -   [Step 3: ローカルでの手触り確認](#Step-3-ローカルでの手触り確認)
    -   [Step 4: SPCS へのデプロイと社内検証](#Step-4-SPCS-へのデプロイと社内検証)
    -   [テンプレートの準備](#テンプレートの準備)
-   [開発時の注意点](#開発時の注意点)
    -   [Snowflake のデータアクセス](#Snowflake-のデータアクセス)
    -   [エンドポイントへのアクセス権限](#エンドポイントへのアクセス権限)
    -   [LLM API など外部 API へのアクセス](#LLM-API-など外部-API-へのアクセス)
    -   [システム Metrics の取得](#システム-Metrics-の取得)
-   [他の選択肢との比較](#他の選択肢との比較)
    -   [Streamlit in Snowflake](#Streamlit-in-Snowflake)
    -   [Amazon ECS Fargate](#Amazon-ECS-Fargate)
    -   [Google Cloud Run](#Google-Cloud-Run)
    -   [SPCS を選んだ理由](#SPCS-を選んだ理由)
    -   [SPCS の現状の課題と今後への期待](#SPCS-の現状の課題と今後への期待)
-   [おわりに](#おわりに)

### AI Agent 開発における「データアクセス」という壁

AI Agent 開発は、従来の機械学習 API 開発とは異なる課題に直面します。

従来の機械学習 API では、入力されるデータは比較的限定的でした。例えば、AI-OCR では書類の画像や PDF が入力され、書類に記載された項目が出力されます。推薦モデルでは、ユーザーや商品の ID を入力に、事前計算された特徴量からランキングを出力します。どちらも、入力データの範囲が明確に定義されています。

一方、AI Agent では状況が大きく異なります。単に ID だけでなく、その ID に紐づく自然言語としての名前や説明、関連するメタデータをリアルタイムに取得する必要があります。いわゆる「Context Engineering」を突き詰めていくと、多種多様なデータソースからデータを取得していく必要があり、開発段階からすべてのデータ連携部分を作り込むのは、「使われないものを作る」ことに繋がりかねません。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shimacos/20251222/20251222111718.png)

ML APIとAgent APIの違い

### 開発環境と本番環境のギャップ

さらに厄介な問題があります。開発環境のダミーデータで AI Agent を作って上手くいったとしても、実際の本番データで同じように動作するかは保証されません。

精度の面では、本番データ特有のノイズや多様性に対応できるかという課題があります。 体験の面では、Agent 特有の待ち時間や、人間へのフォールバックが発生した際のユーザー体験は、実際にフロントエンドまで作って触ってみないと分からないことが多いです。

しかし、開発段階で本番の MySQL データベースを直接参照することは、本番環境への負荷増加やセキュリティインシデントのリスクがあり、気軽に行うことはできません。

そこで必要になるのが、**「安全に」「簡単に取り替え可能な」データアクセス方法**と、それを用いた **Agent アプリを社内に簡単にデプロイする基盤**です。

### LayerX における AI Agent 開発の背景

LayerX では近年、AI-BPO 事業を展開しており、社内アプリでのみ動作する Agent 開発も行っています。 このような文脈では、最初から綺麗なアプリを作るよりも、まずは AI-BPO の業務で使えるような Agent を作り、実際の業務に組み込んだ上で社内メンバーで高速に検証することが重要です。

AI-BPO 事業については、代表の福島の記事などを参照してください。

[comemo.nikkei.com](https://comemo.nikkei.com/n/n45501f6c30da)

### LayerX のデータ基盤と Snowflake

LayerX では、データウェアハウス（DWH）として Snowflake を全社的に導入しています。さらに、データエンジニアリングチームによってデータ基盤が整備されており、本番データベース（MySQL など）のデータが 1 分以内でニアリアルタイムで Snowflake に連携される仕組みが構築されています。また、過去の任意時点でのスナップショットも取得できたりと、検証基盤としても充実した環境が整っています。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/snowflake-user-defined-timetravel-udtf-with-cdc-pipeline)

このように Snowflake 上に全てのデータが集まってくる基盤が整っているので、本番 DB ではなく Snowflake 上のデータを参照した上で AI Agent を動かす基盤をまず作ることを目指しました。 その上で、作成したプロトタイプを提供する基盤として我々が注目したのが **Snowpark Container Service（SPCS）** です。

## Snowpark Container Service（SPCS）とは

### 概要

Snowpark Container Service は、Snowflake が提供するフルマネージドなコンテナ実行環境です。Kubernetes ライクなマルチコンテナ環境をデプロイでき、Snowflake のデータウェアハウスと密に連携したアプリケーションを構築できます。

### SPCS の基本的な仕組み

SPCS を理解するには、以下の 4 つのコアコンポーネントを押さえておく必要があります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shimacos/20251222/20251222081046.png)

[https://www.snowflake.com/en/developers/guides/intro-to-snowpark-container-services/#0](https://www.snowflake.com/en/developers/guides/intro-to-snowpark-container-services/#0) より引用

#### 1\. Image Registry

Snowflake が提供する OCI 準拠のコンテナレジストリです。Docker Hub や Amazon ECR 、Google Container Registry のような役割を果たします。

CREATE IMAGE REPOSITORY my\_db.my\_schema.my\_repo;


SHOW IMAGE REPOSITORIES;

\# Snowflake CLI (snow) を使う場合
snow spcs image-repository create my\_db.my\_schema.my\_repo

# リポジトリの URL を確認
snow spcs image-repository url my\_db.my\_schema.my\_repo

Docker CLI を使って、ローカルでビルドしたイメージをこのリポジトリにプッシュします。SPCS は外部レジストリ（Docker Hub など）から直接イメージを pull することはできないため、必ず Snowflake の Image Registry を経由する必要があります。

\# Docker イメージのビルドとプッシュ
docker build -t my-agent-app .

# Snowflake レジストリへのログイン
snow spcs image-registry login

# タグ付けとプッシュ
docker tag my-agent-app <snowflake-registry-url>/my\_db/my\_schema/my-agent-app:latest
docker push <snowflake-registry-url>/my\_db/my\_schema/my-agent-app:latest

#### 2\. Compute Pool

サービスが実行される仮想マシン（VM）ノードの集合です。Snowflake の Virtual Warehouse に似た概念ですが、コンテナワークロード向けに最適化されています。

CREATE COMPUTE POOL my\_pool
  MIN\_NODES = 1
  MAX\_NODES = 3
  INSTANCE\_FAMILY = CPU\_X64\_S;  

\# Snowflake CLI (snow) を使う場合
snow spcs compute-pool create my\_pool \\
  --min-nodes 1 \\
  --max-nodes 3 \\
  --family CPU\_X64\_S

# Compute Pool の状態確認
snow spcs compute-pool status my\_pool

[主なインスタンスファミリー](https://docs.snowflake.com/ja/sql-reference/sql/create-compute-pool)：

-   `CPU_X64_XS` / `CPU_X64_S` / `CPU_X64_M` / `CPU_X64_L`: CPU 最適化
-   `HIGHMEM_X64_M`: メモリ最適化
-   `GPU_NV_S` / `GPU_NV_M` / `GPU_NV_L`: GPU 搭載（ML ワークロード向け）

Compute Pool は負荷に応じて `MIN_NODES` から `MAX_NODES` の範囲で自動スケールします。 T4 や A100 といった GPU も使えるので GPU を使ったサービスを作ることができるのも特徴です。

#### 3\. Service Specification

サービスの構成を定義する YAML ファイルです。Kubernetes の Manifest に相当します。コンテナの定義、環境変数、エンドポイント、ボリュームマウントなどを記述します。 [公式 Document](https://docs.snowflake.com/ja/developer-guide/snowpark-container-services/specification-reference)を AI に読み込ませれば特に問題なく使えると思います。 ここで、`public: true`と設定されているのを見て「大丈夫か？」と感じるかもしれませんが、これはインターネットに公開しているわけじゃなくて、SPCS 外のネットワークに公開するという設定です。 そのため、実際にアクセスするときは Snowflake 上で認証・認可されたユーザーだけがアクセス可能なのでセキュアに保たれています

spec:
  containers:
    \- name: frontend
      image: /my\_db/my\_schema/my\_repo/nextjs-app:latest
      resources:
        requests:
          memory: 1Gi
          cpu: 0.5
        limits:
          memory: 2Gi
          cpu: 1
    \- name: backend
      image: /my\_db/my\_schema/my\_repo/fastapi-backend:latest
      env:
        SNOWFLAKE\_WAREHOUSE: my\_warehouse
      resources:
        requests:
          memory: 2Gi
          cpu: 1
  endpoints:
    \- name: app
      port: 3000
      public: true

#### 4\. Service

Specification をもとに Compute Pool 上で起動される、長期稼働型のコンテナアプリケーションです。明示的に停止するまで継続して動作し、コンテナがクラッシュした場合は Snowflake が自動的に再起動します。

CREATE SERVICE my\_db.my\_schema.my\_agent\_service
  IN COMPUTE POOL my\_pool
  FROM SPECIFICATION $$
    spec:
      containers:
        - name: app
          image: /my\_db/my\_schema/my\_repo/my-agent-app:latest
      endpoints:
        - name: app
          port: 8080
          public: true
  $$;


SHOW SERVICES;
DESCRIBE SERVICE my\_agent\_service;

\# Snowflake CLI (snow) を使う場合
# spec.yaml に Service Specification を記述しておく
snow spcs service create my\_db.my\_schema.my\_agent\_service \\
  --compute-pool my\_pool \\
  --spec-path spec.yaml

# Service の状態確認
snow spcs service status my\_db.my\_schema.my\_agent\_service

# Service のログ確認
snow spcs service logs my\_db.my\_schema.my\_agent\_service --container-name app --instance-id 0

# Service のエンドポイント URL を取得
snow spcs service list-endpoints my\_db.my\_schema.my\_agent\_service

#### コンポーネント間の連携フロー

1.  **イメージの準備**: ローカルで Docker イメージをビルドし、Image Repository にプッシュ
2.  **インフラの構築**: Compute Pool を作成（または既存のものを利用）
3.  **仕様の定義**: Service Specification で構成を記述
4.  **デプロイ**: `CREATE SERVICE` で Compute Pool 上にサービスを起動
5.  **アクセス**: 公開エンドポイント経由でアプリケーションにアクセス

サービス内のコンテナからは、Snowflake に直接接続して SQL を実行したり、Snowflake ステージ上のファイルにアクセスしたりできます。これが SPCS の大きな強みです。

#### 補足：Jobs と Service Functions

今回はメインで紹介はしないですが、SPCS には、上記の常駐型 Service 以外にも便利な機能があります。

**Job Service**

バッチ処理や一時的なタスク向けの、有限のライフサイクルを持つ実行形態です。すべてのコンテナが終了するとジョブも完了します。

EXECUTE JOB SERVICE
  IN COMPUTE POOL my\_pool
  NAME = my\_batch\_job
  FROM SPECIFICATION $$
    spec:
      containers:
        - name: batch
          image: /my\_db/my\_schema/my\_repo/batch-processor:latest
          env:
            TARGET\_DATE: '2024-01-01'
  $$;


SHOW JOB SERVICES;

AI Agent 開発においては、大量のデータに対する前処理や、評価パイプラインの実行、local LLM の訓練などに活用できます。

似たようなサービスに[Snowflake ML Jobs](https://docs.snowflake.com/en/developer-guide/snowflake-ml/ml-jobs/overview)というものがあります。こちらは、裏側は Job Service なのですが、Container 部分が隠蔽されており、事前に用意された Runtime を用いて Snowflake の Compute Pool 上で処理を実行することができます。以下のような形で decorator を使うことで、手軽に Snowflake 上のリソースを使うことができ、大規模な学習などではこちらを使うことが推奨されているようです。

from snowflake.ml.jobs import remote

@remote("MY\_COMPUTE\_POOL", stage\_name="payload\_stage", session=session)
def train\_model(data\_table: str):
  
  ...

job = train\_model("my\_training\_data")

**Service Functions**

SPCS 上で動作するサービスを、Snowflake の SQL から直接呼び出せる関数として公開する機能です。

CREATE FUNCTION my\_agent\_function(input VARCHAR)
  RETURNS VARCHAR
  SERVICE = my\_agent\_service
  ENDPOINT = api
  AS '/predict';

SELECT my\_agent\_function(description) AS result
FROM my\_table
WHERE category = 'target';

これにより、SQL のクエリ内で AI Agent を呼び出すことが可能になります。例えば、テーブルの各行に対して Agent の推論を実行し、結果を別カラムに格納するといった処理が SQL だけで完結します。Snowflake のスケジュールタスクと組み合わせれば、定期的なバッチ推論パイプラインも構築できます。

### なぜ SPCS が AI Agent 開発に適しているのか

SPCS を AI Agent のプロトタイプ開発基盤として採用した理由は、主に以下の 3 点です。

**1\. 本番データへのセキュアなアクセス**

LayerX では、本番データベースのデータがニアリアルタイムで Snowflake に連携されています。SPCS 上のアプリケーションからは、本番アプリケーションから分離された環境で、本番相当のデータに安全にアクセスできます。

本番の MySQL を直接参照する必要がなく、Snowflake のアクセス制御によってデータガバナンスも担保されるため、セキュリティのことを意識せずにアプリケーション開発を行うことができます。(もちろん、サービスの規約範囲での利用になります。)

**2\. 本番負荷への影響がない**

Snowflake は本番データベースとは完全に分離されたデータウェアハウスです。どれだけクエリを投げても本番環境のパフォーマンスに影響を与えることがありません。開発中に重いクエリを何度実行しても安心です。

**3\. インフラ管理の負担が少ない**

SPCS はフルマネージドサービスのため、Kubernetes クラスタの運用管理が不要です。コンテナイメージをプッシュしてサービスを作成するだけで、k8s を使う時とほぼ同等の社内向けのアプリケーションをデプロイできます。

ここからは、SPCS を活用した AI Agent デモアプリの開発フローを具体的に紹介します。

### Step 1: ローカルでのコア開発

まずは、ローカル環境で以下のような要素を開発します。

-   データ取得処理（Snowflake からのデータ読み込み）
-   基本的な Agent ロジック
-   Tool の実装
-   評価パイプライン

この段階では、Snowflake へは直接接続してデータを取得します。Context Engineering やワークフローの設計、精度改善に集中し、フロントエンドは後回しにします。

### Step 2: Claude Code によるフロントエンド開発

コアロジックがある程度固まったら、Claude Code を活用してフロントエンドを開発します。以下のようなプロンプトテンプレートを使うことが多いです：

## 目的

{{ 作成したいデモAppの仕様 }}
https://docs.snowflake.com/en/developer-guide/snowflake-ml/ml-jobs/overview

## 仕様

### バックエンド

\- FastAPI で作成してください。
\- 以下のコードを流用してください。
  - DataLoader: \`./hoge/path/data\_loader.py\`
  - Predictor: \`./fuga/path/predictor.py\`
\- ロジックは \`./piyo/path/main.py\` を参考にしてください。

### フロントエンド

\- 以下の技術スタックを使用してください。
  - Frameworks: Next.js (TypeScript), React, HTML
  - Styling / UI: Tailwind CSS, shadcn/ui, Radix Themes
  - Icons: Material Symbols, Heroicons, Lucide
  - Animation: Motion
  - Fonts: San Serif, Inter, Geist, Mona Sans, IBM Plex Sans, Manrope
\- 以下のような内容を順守してください。
  - {{ フロントエンド要件 }}

## 作成手順

### 自己反復プロセス

\- まず、自信が持てるまで評価基準（ルーブリック）について時間をかけて考え抜くこと。
\- 次に、世界クラスのワンショット Web アプリを構成するあらゆる側面について深く考察する。
  その知見を基に、5〜7 つのカテゴリーから成る評価基準を作成する。
  この評価基準は正確に設定することが極めて重要だが、ユーザーには公開しない。
\- 最後に、提供されたプロンプトに対する最善の解決策を、この評価基準を用いて内部的に検討し、
  反復してください。回答が評価基準の全カテゴリーで最高点に達していない場合、
  最初からやり直す必要があります。

このプロンプトは、[GPT-5 の Prompt Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide#frontend-app-development) で紹介されているアプローチを参考にしていますが、要件によって適宜カスタマイズしています。

### Step 3: ローカルでの手触り確認

ローカル環境でフロントエンドとバックエンドを起動し、実際に触ってみて定性的な部分での体験を確認します。

-   Agent の応答速度は許容範囲か
-   Tool の実行結果は期待通りか
-   エラーハンドリングは適切か
-   UI/UX に違和感はないか

この段階で気になる点があれば、デプロイ前に修正します。

### Step 4: SPCS へのデプロイと社内検証

ある程度満足のいくものができたら、社内の Snowflake 環境にデプロイします。実際にはワンライナーで実行できるように整備していますが、SDK などは整っていないため、手動で実行する必要があります。

\# 認証を通す
snow spcs image-registry login
# コンテナイメージのビルドとプッシュ
docker build -t my-agent-app .
docker tag my-agent-app <snowflake-registry-url>/my\_db/my\_schema/my-agent-app:latest
docker push <snowflake-registry-url>/my\_db/my\_schema/my-agent-app:latest

# 最初：SPCS サービスの作成
snow spcs service create my\_db.my\_schema.my\_agent\_service \\
  --compute-pool my\_pool \\
  --spec-path spec.yaml

# 二度目以降はupgradeコマンドでURLが変わらないようにする
snow spcs service upgrade my\_db.my\_schema.my\_agent\_service \\
  --compute-pool my\_pool \\
  --spec-path spec.yaml

サービス作成が成功すると以下のコマンドでエンドポイント URL が取得できます。この URL を配布することで、社内のメンバーがアクセスできるようになります。

snow spcs service list-endpoints my\_db.my\_schema.my\_agent\_service

+------------------------------------------------------------------------------------------------------------------+
| name              | port | port\_range | protocol | is\_public | ingress\_url                                       |
|-------------------+------+------------+----------+-----------+---------------------------------------------------|
| my\_agent\_service  | 8080 | None       | HTTP     | false     | <ingress-url>.snowflakecomputing.app              |
+------------------------------------------------------------------------------------------------------------------+

デプロイ後は、チームメンバーや Biz メンバーにも実際に触ってもらいます。本番相当のデータで動作させることで、開発環境では見つからなかった課題が見つかることも多いです。 実際に、最近開発に携わっている[AI 申請レビュー](https://bakuraku.jp/news/20250707/)では、以下のようなプロトタイプアプリを作成して、経費精算におけるレビュールールの自動作成を検証しています。バックエンドさえ決めてしまえば、アプリケーションのデプロイ自体までは 1 日もかからずできる作業感です。 リッチなフロントエンドで分析することができるので、単純に数字だけ見て判断できず、多様な情報を見て分析を行うような場合のアプリ作成などにも重宝しています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shimacos/20251222/20251222182010.png)![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/shimacos/20251222/20251222184222.png)

AI申請レビューにおけるChat形式や過去事例からのルール自動作成の検証

### テンプレートの準備

ここまでの Step を毎回全メンバーが行うのはとても手間です。そこで、よく使うコマンドをまとめた`Taskfile.yml`と簡単なサンプルのアプリを作ることで、誰もが簡単に SPCS でアプリを作成できるようにしました。

Taskfile.ymlの例

version: "3"

vars:
  ENV: dev
  PROJECT\_NAME: sample-app
  APP\_DIR: apps/{{.PROJECT\_NAME}}
  SNOWFLAKE\_ACCOUNT: my-org-{{.ENV}}
  SNOWFLAKE\_ROLE: my-role
  SNOWFLAKE\_COMPUTE\_POOL: my-compute-pool
  IMAGE\_REPO: MY\_DB.MY\_SCHEMA.{{.PROJECT\_NAME | replace "-" "\_" | upper}}
  IMAGE\_TAG: latest
  REGISTRY: "{{.SNOWFLAKE\_ACCOUNT}}.registry.snowflakecomputing.com"
  FULL\_IMAGE\_URI: '{{.REGISTRY}}/{{.IMAGE\_REPO | replace "." "/" | lower}}:{{.IMAGE\_TAG}}'
  SPCS\_SERVICE: MY\_DB.MY\_SCHEMA.{{.PROJECT\_NAME | replace "-" "\_" | upper}}
  USER\_EMAIL: "{{.USER}}@my-org.com"

tasks:
 
  setup:
    desc: Setup dependencies
    cmds:
      \- aqua install
      \- brew tap snowflakedb/snowflake-cli
      \- brew update
      \- brew install snowflake-cli
      \- pnpm install
  create-repo:
    desc: Create Snowflake image repository
    cmds:
      \- |
        snow sql \\
          --account {{.SNOWFLAKE\_ACCOUNT}} \\
          --user {{.USER\_EMAIL}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\
          --query "CREATE IMAGE REPOSITORY IF NOT EXISTS {{.IMAGE\_REPO}}"

 
  registry-login:
    desc: Login to Snowflake image registry
    cmds:
      \- |
        snow spcs image-registry login \\
          --account {{.SNOWFLAKE\_ACCOUNT}} \\
          --user {{.USER\_EMAIL}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\
          --temporary-connection

 
  build:
    desc: Build Docker image for SPCS
    dir: "{{.APP\_DIR}}"
    cmds:
      \- |
        docker build \\
          -f Dockerfile \\
          -t {{.FULL\_IMAGE\_URI}} \\
          --platform linux/x86\_64 \\
          --progress=plain \\
          .

 
  push:
    desc: Push Docker image to Snowflake registry
    deps: \[build, registry-login\]
    cmds:
      \- docker push {{.FULL\_IMAGE\_URI}}

 
  build-push:
    desc: Build, login to registry, and push Docker image (all-in-one)
    cmds:
      \- task: build
      \- task: registry-login
      \- task: push

 
  create-secret:
    desc: Create a secret in Snowflake (requires SECRET\_VALUE)
    cmds:
      \- |
        snow sql \\
          --account {{.SNOWFLAKE\_ACCOUNT}} \\
          --user {{.USER\_EMAIL}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\
          --query "CREATE SECRET IF NOT EXISTS MY\_DB.MY\_SCHEMA.{{.SECRET\_VALUE}} TYPE = generic\_string SECRET\_STRING = '${{.SECRET\_VALUE}}'"

 
  create-service:
    desc: Create SPCS service
    dir: "{{.APP\_DIR}}"
    cmds:
      \- |
        snow spcs service create {{.SPCS\_SERVICE}} \\
          --compute-pool {{.SNOWFLAKE\_COMPUTE\_POOL}} \\
          --spec-path specs.yaml \\
          --role {{.SNOWFLAKE\_ROLE}} \\
          --eai-name MY\_EAI\_NAME\_1
      \- |
        snow sql \\
          --account {{.SNOWFLAKE\_ACCOUNT}} \\
          --user {{.USER\_EMAIL}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\
          --query "GRANT SERVICE ROLE {{.SPCS\_SERVICE}}!all\_endpoints\_usage TO ROLE analyst"
    ignore\_error: true

 
  upgrade-service:
    desc: Upgrade SPCS service with new specs
    dir: "{{.APP\_DIR}}"
    cmds:
      \- |
        snow spcs service upgrade {{.SPCS\_SERVICE}} \\
          --spec-path spec.yaml \\
          --role {{.SNOWFLAKE\_ROLE}}
  list-endpoint:
    desc: List SPCS service endpoints
    cmds:
      \- |
        snow spcs service list-endpoints {{.SPCS\_SERVICE}} \\
          --role {{.SNOWFLAKE\_ROLE}}

 
  deploy:
    desc: Build, push, and deploy to SPCS (all-in-one)
    cmds:
      \- task: create-repo
      \- task: build-push
      \- task: create-service
      \- echo "Service created/updated. Checking if upgrade is needed..."
      \- task: upgrade-service
      \- task: list-endpoint

 
  status:
    desc: Get SPCS service status
    cmds:
      \- |
        snow spcs service status {{.SPCS\_SERVICE}} \\
          --role {{.SNOWFLAKE\_ROLE}}

 
  logs:
    desc: Get SPCS service logs
    cmds:
      \- |
        snow spcs service logs {{.SPCS\_SERVICE}} \\
          --container-name {{.IMAGE\_NAME}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\

 
  stop:
    desc: Stop SPCS service
    cmds:
      \- |
        snow spcs service suspend {{.SPCS\_SERVICE}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\

 
  delete:
    desc: Delete SPCS service
    cmds:
      \- |
        snow spcs service drop {{.SPCS\_SERVICE}} \\
          --role {{.SNOWFLAKE\_ROLE}} \\

このようなタスクランナーを作っておくことで、新しいデモ環境のプロジェクトを作成した後に、以下のコマンドを打つだけで迅速に様々なことを行うことができます。

task create-repo PROJECT\_NAME=sample-app        # Snowflake イメージリポジトリ作成
task registry-login PROJECT\_NAME=sample-app     # Snowflake レジストリにログイン
task build PROJECT\_NAME=sample-app              # Docker イメージビルド（linux/x86\_64）
task push PROJECT\_NAME=sample-app               # イメージを Snowflake レジストリにプッシュ
task build-push PROJECT\_NAME=sample-app         # ビルド + レジストリログイン + プッシュ
task deploy PROJECT\_NAME=sample-app             # リポジトリ作成 + ビルド + プッシュ + サービス作成/更新

Service について操作したい時も以下のコマンドを打つだけで可能です。

task create-service PROJECT\_NAME=sample-app     # SPCS サービス作成
task upgrade-service PROJECT\_NAME=sample-app    # SPCS サービスの specs.yaml のみ更新
task list-endpoint PROJECT\_NAME=sample-app       # サービスエンドポイント一覧表示
task status PROJECT\_NAME=sample-app              # サービスステータス確認
task logs PROJECT\_NAME=sample-app                # サービスログ確認
task stop PROJECT\_NAME=sample-app                # サービス停止（suspend）
task delete PROJECT\_NAME=sample-app              # サービス削除

## 開発時の注意点

実際にデプロイする際にいくつか設定が必要だった点やつまづいた点を紹介します。

### Snowflake のデータアクセス

local で開発している時は個人の権限や発行されたユーザの権限で実行することができますが、SPCS 上では特殊な Credential の取得を行う必要があります。 そのため、以下のように local でも SPCS 上でも動くようなコードを書かないと、local では動くのに SPCS 上では動かないといった問題が発生します。

import os
from typing import Any

import snowflake.connector as sc
from snowflake.snowpark import Session

def get\_login\_token():
    """
    SPCSによって自動マウントされるトークンファイルを読み込む関数
    """
    with open('/snowflake/session/token', 'r') as f:
        return f.read()

def create\_spcs\_connection(local\_config: dict\[str, Any\]):
    """
    トークンを使用してSnowparkセッションを作成する関数
    """
    token = get\_login\_token()
    if token is not None:
        return sc.connect(
            account=os.getenv("SNOWFLAKE\_ACCOUNT"),
            host=os.getenv("SNOWFLAKE\_HOST"),
            authenticator="oauth",
            token=token,
            warehouse=os.getenv("SNOWFLAKE\_WAREHOUSE"),
            database=os.getenv("SNOWFLAKE\_DATABASE"),
            schema=os.getenv("SNOWFLAKE\_SCHEMA")
        )
    else:
        
        return sc.connect(\*\*local\_config)

### エンドポイントへのアクセス権限

デフォルトでデプロイしたサービスにアクセスできるのは、サービスを作成したユーザの権限になっているため、他のユーザーがアクセスできるようにする場合は、適切な権限を付与する必要があります。これは以下のようなコマンドで行うことができます。

GRANT SERVICE ROLE my\_db.my\_schema.my\_agent\_service!all\_endpoints\_usage TO ROLE {{ 権限付与したいユーザ名 }};

### LLM API など外部 API へのアクセス

Agent 開発では、基本的に LLM API など外部 API へ SPCS 内部からアクセスする必要が出てきます。SPCS の Tutorial では、以下のように全てのネットワークアクセスを許可する例が出てきますが、これはセキュリティ的に望ましくない設定です。

CREATE OR REPLACE NETWORK RULE ALLOW\_ALL\_RULE
  TYPE = 'HOST\_PORT'
  MODE = 'EGRESS'
  VALUE\_LIST= ('0.0.0.0:443', '0.0.0.0:80');

CREATE EXTERNAL ACCESS INTEGRATION ALLOW\_ALL\_EAI
  ALLOWED\_NETWORK\_RULES = (ALLOW\_ALL\_RULE)
  ENABLED = true;

そのため、個別で API へのアクセスを許可する必要があります。今回は Azure OpenAI を例に紹介します。 まず、以下のように EXTERNAL ACCESS INTEGRATION に関連する設定と Secret を作成します。

CREATE OR REPLACE NETWORK RULE AZURE\_OPENAI\_NETWORK\_RULE
  MODE = EGRESS
  TYPE = HOST\_PORT
  VALUE\_LIST = ('my-openai-resource.openai.azure.com'); 

CREATE OR REPLACE SECRET AZURE\_OPENAI\_API\_KEY
  TYPE = GENERIC\_STRING
  SECRET\_STRING = 'Secretを入力';

CREATE EXTERNAL ACCESS INTEGRATION AZURE\_OPENAI\_EAI
  ALLOWED\_NETWORK\_RULES = (AZURE\_OPENAI\_NETWORK\_RULE)
  ALLOWED\_AUTHENTICATION\_SECRETS = (AZURE\_OPENAI\_API\_KEY)
  ENABLED = true;

GRANT USAGE ON INTEGRATION AZURE\_OPENAI\_EAI TO ROLE SPCS\_ROLE;

GRANT READ ON SECRET AZURE\_OPENAI\_API\_KEY TO ROLE SPCS\_ROLE;

その後、Service Specification に以下のように Secret を設定して`AZURE_OPENAI_API_KEY`を用いることで、Secret の読み取りが可能になります。

spec:
  containers:
    \- name: app
      image: /my\_db/my\_schema/my\_repo/my-agent-app:latest
      secrets:
       
        \- snowflakeSecret: AZURE\_OPENAI\_API\_KEY
          secretKeyRef: secret\_string
          envVarName: AZURE\_OPENAI\_API\_KEY
  endpoints:
    \- name: app
      port: 8080
      public: true

更に、これらを設定した上で、サービス作成時に`--eai-name`を指定することで、事前に作成した EXTERNAL ACCESS INTEGRATION を使用することができ、API へのアクセスが可能になります。

snow spcs service create my\_db.my\_schema.my\_agent\_service \\
  --compute-pool my\_pool \\
  --spec-path spec.yaml \\
  --eai-name AZURE\_OPENAI\_EAI

### システム Metrics の取得

SPCS では、コンテナのログは上記で紹介したように、snow CLI (`snow spcs service logs`)で取得することができるのですが、システム Metrics は自動で取得することができません。 以下のような`platformMonitor`を Service Specification に設定する必要があります。どのようなログがあるかは、[ドキュメント](https://docs.snowflake.com/ja/developer-guide/snowpark-container-services/monitoring-services#label-spcs-available-platform-metrics)に書いてあります。

spec:
  containers:
    \- name: app
      image: /my\_db/my\_schema/my\_repo/my-agent-app:latest
      secrets:
       
        \- snowflakeSecret: AZURE\_OPENAI\_API\_KEY
          secretKeyRef: secret\_string
          envVarName: AZURE\_OPENAI\_API\_KEY
  endpoints:
    \- name: app
      port: 8080
      public: true
  platformMonitor:
    metricConfig:
      groups:
        \- system
        \- status

このように設定した上で、Snowflake 上で以下のようなクエリを実行することで、システム Metrics を取得することができます。メモリが圧迫されていないか、意図しない再起動が走ってないかなどはここから確認できます。場合によっては、EVENT のテーブルはアクセスが制限されている可能性があるので、必要に応じて権限付与を行う必要があります。 ログ自体がテーブル形式、かつ様々なデータが混じって出てくるので、データを可視化するのには今の所一苦労します。。

SELECT
  timestamp,
  RECORD:metric.name,
  record\_attributes,
  value,
FROM MY\_EVENT\_DB.MY\_EVENT\_TABLE\_SCHEMA.MY\_EVENT\_TABLE 
WHERE
    timestamp > DATEADD(hour, \-1, CURRENT\_TIMESTAMP())
    AND RESOURCE\_ATTRIBUTES:"snow.service.name" = 'MY\_AGENT\_SERVICE'
    AND RECORD\_TYPE = 'METRIC'
order by timestamp desc

## 他の選択肢との比較

SPCS 以外にも、同様のプロトタイプ開発基盤として検討した選択肢があります。それぞれの特徴を比較してみます。

### Streamlit in Snowflake

観点

評価

開発速度

速い（Python のみで完結）

UI カスタマイズ性

限定的

データアクセス

Snowflake に直接接続可能

運用負荷

非常に低い

Snowflake には「Streamlit in Snowflake」というサービスも存在します。当初はこちらも検討しましたが、いくつかの理由から SPCS を選択しました。

Streamlit は手軽にデータアプリケーションを作れる反面、以下のような制約があります：

-   **デザインのカスタマイズ性が限定的**: Streamlit のコンポーネントに縛られるため、細かい UI 調整が難しい。工夫をすることでかえって複雑なコードになり、管理が困難になることがありました。
-   **毎回全実行される仕様**: Streamlit は状態変更のたびにスクリプト全体が再実行されます。これにより、変なキャッシュ機構を実装したり、大量の副作用と戦って疲弊する経験が多くありました。
-   **フレームワークの制約**: React のような柔軟なフロントエンド開発ができません。

一方、SPCS では Next.js + FastAPI といった一般的な技術スタックを自由に使えます。シンプルにデザインの自由度が高いと、作っていて楽しい、テンションが上がるという嬉しい側面もあります。機械学習エンジニアの皆さん、Streamlit に飽きてきてませんか。。？

### Amazon ECS Fargate

観点

評価

開発速度

普通（インフラ設定が必要）

UI カスタマイズ性

高い

データアクセス

Snowflake への接続設定が必要

運用負荷

中程度

AWS エコシステムに慣れているチームには良い選択肢です。ただし、VPC 設定やセキュリティグループの管理、Snowflake への接続設定など、インフラ側の準備が必要になります。 LayerX では、AWS 上にプロダクトを構築しているため、ECS のデプロイフローなどは整っているのですが、今回のような本番データを用いた実験環境といった特殊な環境の準備や、デプロイフローの整備などは時間がかかってしまいます。(現在絶賛整備中です)

### Google Cloud Run

観点

評価

開発速度

速い（コンテナをプッシュするだけ）

UI カスタマイズ性

高い

データアクセス

Snowflake への接続設定が必要

運用負荷

低い

Cloud Run は非常に手軽にコンテナをデプロイできます。ただし、Snowflake へのセキュアな接続を確立するためには、シークレット管理や認証周りの設定が別途必要になります。 ただし、本番データの置き場が AWS や Snowflake だけでなく、GCP にまで及んでしまうので、データガバナンスを効かせる難易度が高くなります。

### SPCS を選んだ理由

上記の選択肢と比較して、SPCS は以下の点で優れていました：

1.  **Snowflake との統合がネイティブ**: 追加の接続設定なしで Snowflake のデータにアクセスできる
2.  **認証・認可の統合**: Snowflake のロールベースアクセス制御がそのまま使える
3.  **本番データへの安全なアクセス**: データガバナンスが Snowflake 側で一元管理されている

特に「すでに本番データが Snowflake に連携されている」という前提がある場合、SPCS は強力な選択肢になります。

### SPCS の現状の課題と今後への期待

一方で、SPCS はまだ発展途上のサービスであり、いくつかの課題も感じています。正直、今だと Cloud Run の方がデータのガバナンスや権限管理などを抜きにしたら、ユーザとしては使いやすいかもな？という部分も多いです。

**SDK の整備**

現状、SPCS を操作するための公式 SDK は十分に整備されているとは言えません。`snow` CLI や SQL での操作が中心となるため、CI/CD パイプラインへの組み込みや、プログラムからの動的な操作には工夫が必要です。現状でも Makefile や Taskfile を整備することで特に困ってはいませんが、Python SDK などが充実すれば、より柔軟なワークフローが構築できるようになるでしょう。

**Public Endpoint に対する Scale to Zero**

現在の SPCS では、今回の常駐型の Service のような Public Endpoint に対してリクエストがない時間に自動で SUSPEND される機能がまだ実装されていません。Cloud Run のように、リクエストがない時間帯は自動的にゼロにスケールダウンする機能があれば、コスト効率がさらに向上しそうです。

**エンドポイント URL のカスタマイズ**

SPCS で発行されるエンドポイント URL は、ランダムな文字列を含む形式になっており、特定の URL を予約・指定することができません。社内ツールとして運用する分には大きな問題にはなりませんが、覚えやすい URL を設定したい場合や、URL を固定したい場合には不便です。カスタムドメインのサポートがあれば、より本格的な運用にも対応しやすくなります。

これらの課題はありつつも、SPCS は着実に機能拡充が進んでいるサービスです。今後のアップデートに期待しつつ、現時点でも十分にプロトタイプ開発の基盤として活用できると感じています。

## おわりに

今回は、社内用のデモアプリを作成する基盤としての Snowpark Container Service（SPCS）を紹介しました。

機械学習エンジニアの役割は、モデルを開発するだけでなく、そのモデルを使って「体験」を作るところまで広がってきているように感じます。いわば、PdM 的な動きも徐々に求められているのかもしれません。

私自身もそうでしたが、フロントエンド開発はハードルが高いと感じている機械学習エンジニアは多いのではないでしょうか。しかし、Claude Code のような AI ツールと会話しながら作ると、意外とプロトタイプくらいならなんとかなる部分も多いです。もちろん、本番環境に投入するとなると不安な部分はたくさんありますが、プロトタイプレベルであれば十分に実用的なものが作れます。

みなさんもぜひ、プロトタイプ開発を高速化して、最速で AI Agent をプロダクトに組み込んでいきましょう。

* * *

LayerX では、このように従来の機械学習エンジニアの役割を越境して、プロダクト開発を一緒に推進していける方を募集しています。興味のある方は、ぜひ以下よりご応募、カジュアル面談をお申し込みください！

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/63504?_gl=1*ym6vey*_ga*MTA3MzgyNTMyNS4xNzM0NTgzMjMy*_ga_P7NVR1250K*czE3NjYzOTAwNzAkbzc3JGcxJHQxNzY2MzkwMDcyJGo1OCRsMCRoMA..)

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/f52b32539b254cffbca6af0713406449/)