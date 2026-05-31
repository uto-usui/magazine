---
title: "Google Sheets から Snowflake を参照するアドオンの実行基盤を Snowflake Tasks に移行した"
source: "https://tech.layerx.co.jp/entry/gas-to-snowflake-tasks"
publishedDate: "2026-05-29"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "TrsNium"
---

## はじめに

こんにちは、LayerX バクラク事業部 BizOps 部データグループの平田 (@TrsNium) です。

以前、[Google Apps ScriptでSnowflakeとGoogle Sheetsを連携するアドオンを開発した話](https://tech.layerx.co.jp/entry/2024/12/19/110340)という記事で、Google Apps Scriptを使ってSnowflakeとGoogle Sheetsを連携するアドオンを開発した話をしました。このアドオンは、BigQueryのConnected Sheetsのような体験をSnowflakeでも実現するために作られたもので、UIからのオンデマンド実行やスケジュール実行、パラメータ設定など、データ分析に必要な機能を一通り実装していました。

このアドオンは、ビジネス職のメンバーを中心に社内で幅広く使われています。予実管理やKPIトラッキングはもちろん、SQLを書けないビジネス職のメンバーも、設定済みのクエリを選ぶだけで最新データを取得できます。手軽で共有しやすく、スケジュール機能で自動更新もできるため、データ分析と業務効率化に役立っていました。

しかし利用が広がるにつれ、GAS のタイムアウトや実行枠の制限が壁になり、ユーザー体験を損なう場面が増えました。そこで、GAS から脱却し Snowflake ネイティブな実行基盤に作り直すことにしました。本記事では、その設計・実装・成果を紹介します。

## GAS制限とユーザー体験について

### GAS の制限について

GASには利用形態ごとに異なるタイムアウトと実行枠の制限があります([Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas))。

-   **UI実行（`google.script.run` 経由）**: 30秒でタイムアウト。ユーザーがボタンをクリックして実行するケースがこれに該当し、少しでも重いクエリは完了前に打ち切られる
-   **スケジュール実行（時間主導型トリガー）**: 30分でタイムアウト。重いクエリでも実行できるが、即時性がない
-   **1日の総実行時間**: ユーザーあたり6時間/日（Google Workspaceアカウントの場合）。ユーザーあたりのスケジュール数にも上限があり、KPIトラッキングなどで頻繁に利用するユーザーはすぐに上限に達してしまう。その回避策としてマシンアカウント1つにスケジュール実行を集約していたが、今度はそのアカウントの6時間枠を全ジョブで共有することになり、重いジョブが枠を消費すると他のスケジュールが実行できなくなる
-   **同時実行数**: スクリプトあたり30実行まで。利用者が増えるとピーク時にジョブが詰まる

最大の問題は、UI 実行の 30 秒制限です。ユーザーがクエリ実行ボタンを押すと、裏側では `google.script.run` 経由で GAS が呼ばれますが、この経路に 30 秒のタイムアウトがあります。少し重いクエリや集計テーブルを使う分析では、Snowflake 側で結果の準備が終わる前に処理が打ち切られ、Google Sheets には何も書き込まれません。利用者から「動かない」「同期できない」という問い合わせが多く寄せられました。

回避策としてスケジュール実行を案内していました。スケジュール経由なら重いクエリも完了しますが、これでは Google Sheets 本来の価値が損なわれます。データを見て疑問を持ち、条件を変えてすぐ再実行する — この高速なフィードバックループこそが、Google Sheets でデータ分析を行う中心的な価値だからです。スケジュール登録して次回実行を待つ運用ではサイクルが遅くなり、「ちょっと見てみよう」の気軽さが失われます。

この問題を解決するために、GASの制限から脱却した新しい実行基盤の検討を始めました。

## アーキテクチャ選定の思考プロセス

### Option A: AWS構成

社内の既存インフラが AWS ベースのため、最初に AWS を使った基盤構築を検討しました。API Gateway、ECS、SQS、Step Functions、DynamoDB など、AWS のマネージドサービスを組み合わせてスケーラブルなジョブ実行基盤を作るというアプローチでした。

graph TB
    subgraph Client\["クライアント層"\]
        UI\["Google Sheets Add-on UI"\]
        GAS\["Apps Script (Minimal Shim)"\]
    end

    subgraph AWS\["AWS Backend (8+ サービス)"\]
        APIGW\["API Gateway"\]
        ECS1\["ECS: Job API"\]
        SQS\["SQS (ジョブキュー)"\]
        SFN\["Step Functions"\]
        ECS2\["ECS Task (Runner + Writer)"\]
        DDB\["DynamoDB (状態管理)"\]
        EVB\["EventBridge (スケジューラ)"\]
    end

    subgraph External\["外部サービス"\]
        SF\["Snowflake"\]
        SHEETS\["Google Sheets API"\]
    end

    style Client fill:#e3f2fd
    style AWS fill:#fff3e0
    style External fill:#f3e5f5

    UI --> GAS
    GAS -->|"POST /jobs"| APIGW
    APIGW --> ECS1
    ECS1 -->|"enqueue"| SQS
    ECS1 -.->|"state"| DDB
    SQS --> SFN
    SFN -->|"RunTask"| ECS2
    ECS2 --> SF
    ECS2 --> SHEETS
    ECS2 -.-> DDB
    EVB -.-> ECS1

Step Functions でワークフローを可視化でき、SQS で柔軟なキューイングを実現でき、ECS でスケーラブルな実行環境を構築できます。事業が成長し、コネクタの利用が増えても対応できる基盤です。しかし、実装期間、運用コスト、そしてアーキテクチャ上の課題があります。

まず、ユーザーが日常的に GAS の制限に直面している状況で、基盤構築に時間をかける余裕はありませんでした。AWS 構成ではインフラ構築、認証実装、ジョブ管理システムなど、実装に相応の時間がかかる見込みでした。

### Option B: Snowflakeネイティブ構成

アーキテクチャの複雑さを減らすため、AWS を使わない構成を検討しました。データはすべて Snowflake 上にあり、処理も同じ基盤で完結できる可能性があります。調査を進めると、Snowflake には Tasks によるジョブ管理、Python Stored Procedure による外部 API 呼び出し、External Access Integration による外部連携といった機能が備わっていることが分かりました。これらを組み合わせれば、AWS を介さず Snowflake 単体で完結する構成を実現できます。

以下の図は、Snowflake ネイティブ構成の全体像を示したものです（実際の Task などの詳細は後述します）。

graph TB
    UI\["Google Sheets"\]

    subgraph Snowflake\["Snowflake (単一プラットフォーム)"\]
        Tasks\["Tasks 層<br/>スケジューリング"\]
        Catalog\["Catalog 層<br/>メタデータ管理"\]
        Orchestration\["Orchestration 層<br/>ジョブ制御"\]
        Core\["Core 層<br/>実行エンジン"\]
    end

    SHEETS\["Google Sheets API"\]

    style Snowflake fill:#e0f7ff

    UI -->|"手動実行"| Orchestration
    Tasks -->|"参照"| Catalog
    Tasks -->|"ジョブ投入"| Orchestration
    Orchestration --> Core
    Core -->|"パラメータ取得"| Catalog
    Core --> SHEETS

Snowflake ネイティブ構成では、AWS 構成で必要だった 8 つ以上のサービスを Snowflake 内部の機能だけで実現します。レイヤー構成の詳細は後述します。

### 共通の懸念: Google Sheets API Quota

どちらの構成を選ぶにしても、Google Sheets API の Quota 制限という問題がありました。

GAS 以外の基盤に移行する場合、Google Sheets API の write requests のデフォルト quota がボトルネックになる可能性があります。AWS 構成でも Snowflake 構成でも同じです。この制限が緩和されなければ、GAS のタイムアウト問題を解決しても、結局別の制約に引っかかってしまいます。

そこで事前に Google Cloud へ Quota 増加リクエストを提出したところ、承認されて Quota 制限が大幅に緩和されました。

### 意思決定のポイント

最終的に、以下の 2 つの観点で Snowflake 構成を選択しました。

#### 1\. 実装速度

Snowflake の組み込み機能で要件 (定期実行・パラメータ設定・オンデマンド実行) を満たせるため、AWS 構成のようにインフラやミドルウェアを個別構築する工数が不要になります。基盤構築に時間をかけず、ユーザー課題に集中できる点が決め手でした。

#### 2\. 運用・スキルセットとの相性

データチームのコアスキルセットは SQL、dbt、Snowflake です。SQL と Python で完結する Snowflake 構成なら、新メンバーのキャッチアップも容易です。また、QUERY\_HISTORY と TASK\_HISTORY でログを一元管理でき、デバッグも単一クエリログで完結します。

### レイヤー構成

全体は4つのレイヤーで構成されています。

レイヤー

役割

主なコンポーネント

Tasks

スケジューリング

scheduler\_tick, ingest\_job\_requests\_task, run\_pending\_jobs\_task, check\_failed\_schedules\_task

Catalog

メタデータ管理

QUERY\_CATALOG, QUERY\_SCHEDULES, SPREADSHEET\_PARAMETERS

Orchestration

ジョブ制御

JOB\_REQUESTS, JOB\_STATE, JOB\_REQUESTS\_STREAM

Core

実行エンジン

EXECUTE\_JOB, WRITE\_QUERY\_TO\_SHEET

**Tasks層**: scheduler\_tick が5分間隔でスケジュール対象を取り込み、check\_failed\_schedules\_task が1日1回連続失敗を検知してスケジュールを自動停止します。オンデマンド実行は専用の Task を持たず、UI から JOB\_REQUESTS に直接 INSERT します。

**Catalog層**: QUERY\_CATALOG にクエリ定義、QUERY\_SCHEDULES にスケジュール設定、SPREADSHEET\_PARAMETERS にパラメータ設定を格納します。

**Orchestration層**: JOB\_REQUESTS にリクエストが投入されると JOB\_REQUESTS\_STREAM (CDC) が変更を検知し、JOB\_STATE へジョブをエンキューします。

**Core層**: EXECUTE\_JOB がジョブを受け取り、WRITE\_QUERY\_TO\_SHEET (Python Stored Procedure) を介して Snowflake クエリの実行と Google Sheets への書き込みを行います。

### ジョブ実行フロー

実際のジョブ実行フローは以下の通りです。スケジュール実行とオンデマンド実行のどちらも、同じ仕組みで動作します。

%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#29b5e8'}}}%%
sequenceDiagram
    autonumber
    participant User as 👤 ユーザー
    participant Tasks as ⏰ Snowflake Tasks
    participant Catalog as 📚 Catalog
    participant Queue as 📥 Job Queue
    participant Executor as ⚙️ Python Stored Procedure
    participant Sheets as 📊 Google Sheets

    alt スケジュール実行
        Tasks->>Queue: 定期的にジョブを投入
    else オンデマンド実行
        User->>Queue: ボタンクリックでジョブを投入
    end

    Queue->>Executor: ジョブを取得して実行開始
    Executor->>Catalog: クエリ定義・パラメータを取得
    Catalog-->>Executor: メタデータ返却
    Executor->>Executor: Snowflakeクエリを実行
    Executor->>Sheets: 結果を書き込み
    Sheets-->>User: ✅ データ更新完了

    Note over Tasks,Sheets: GASが担っていた役割をすべてSnowflake内で実現

スケジュール実行もオンデマンド実行も、同じ Job Queue に投入される仕組みです。Executor がジョブを取り出すと、Snowflake でクエリを実行し、その結果を Google Sheets に書き込みます。

変化として大きかったのは、時間制限がなくなったことです。GAS では 30 秒でタイムアウトしていたクエリも、Snowflake 基盤なら数十分かかるクエリでも最後まで完了します。エラー時は自動リトライされ、複数ジョブの並列実行でスループットも向上しました。

リトライは exponential backoff で行われます。

詳細な図はこちら

  %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#29b5e8'}}}%%
  sequenceDiagram
      autonumber
      participant Scheduler as ⏰ Scheduler Task<br/>(5分間隔)
      participant Catalog as 📚 Query Catalog
      participant Queue as 📥 Job Queue
      participant Stream as 🌊 CDC Stream
      participant Ingest as 📨 Ingest Task
      participant Executor as ⚙️ Executor Task
      participant Snowflake as ❄️ Snowflake
      participant Sheets as 📊 Google Sheets
  
      Scheduler->>Catalog: 実行すべきスケジュールを検索
      Catalog-->>Scheduler: スケジュール一覧を返却
      Scheduler->>Queue: JOB\_REQUESTSにジョブを投入
      Queue->>Stream: CDC検知
      Stream->>Ingest: SYSTEM$STREAM\_HAS\_DATA() = TRUE
      Ingest->>Queue: JOB\_REQUESTSを読み取り
      Ingest->>Queue: JOB\_STATEにエンキュー (status=PENDING)
      Ingest->>Executor: AFTER句で次Taskをトリガー
      Executor->>Queue: PENDING状態のジョブを取得
      Note over Executor: 状態: PENDING → RUNNING<br/>リース時間: 15分
      Executor->>Catalog: クエリ定義とパラメータを取得
      Catalog-->>Executor: メタデータ返却
      Executor->>Snowflake: クエリ実行 ⏱️ 時間制限なし
      Note over Snowflake: 重いクエリでも確実に完了<br/>(GASなら30秒でタイムアウト)
      Snowflake-->>Executor: 結果セット (例: 5万行)
      Executor->>Sheets: データを書き込み
      Note over Executor: 指数バックオフでリトライ
      Sheets-->>Executor: ✅ 完了
      Note over Executor: 状態: RUNNING → SUCCEEDED

### Snowflake Tasksによるワークフロー制御

Snowflake ネイティブなアーキテクチャの中心となっているのが、Tasks によるワークフロー制御です。GAS のトリガー機能に代わり、Snowflake Tasks でスケジューリングとジョブの依存関係を管理しています。なお、Python Stored Procedure の実装の詳細については、[前回のブログ記事](https://tech.layerx.co.jp/entry/2024/12/19/110340)を参照してください。前回は GAS で実装していましたが、今回は Python Stored Procedure に置き換えています。基本的なロジック（Snowflake クエリの実行、Google Sheets API への書き込み、エラーハンドリング）は変わっていません。

私たちのシステムでは、以下の 4 つの主要な Task を定義しています。

CREATE OR REPLACE TASK scheduler\_tick
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  SCHEDULE = 'USING CRON \*/5 \* \* \* \* Asia/Tokyo'
AS
  CALL schedule\_dispatcher(max\_jobs => 100);

CREATE OR REPLACE TASK ingest\_job\_requests\_task
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  WHEN SYSTEM$STREAM\_HAS\_DATA('job\_requests\_stream')
AS
  CALL ingest\_job\_requests(max\_rows => 1000);

CREATE OR REPLACE TASK run\_pending\_jobs\_task
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  AFTER ingest\_job\_requests\_task
AS
  CALL run\_pending\_jobs(max\_jobs => 50, lease\_sec => 900);
  

CREATE OR REPLACE TASK check\_failed\_schedules\_task
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  SCHEDULE = 'USING CRON 0 9 \* \* \* Asia/Tokyo'  
AS
  CALL check\_and\_disable\_failed\_schedules(consecutive\_failure\_threshold => 5);

### 依存関係と CDC トリガー

中心となっているのは、`AFTER` 句を使った依存関係の設定です。

CREATE OR REPLACE TASK run\_pending\_jobs\_task
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  AFTER ingest\_job\_requests\_task  
AS
  CALL run\_pending\_jobs(max\_jobs => 50, lease\_sec => 900);

`AFTER ingest_job_requests_task` と指定することで、`run_pending_jobs_task` は `ingest_job_requests_task` が実行された後に自動的に実行されます。これにより、ジョブリクエストの取り込みが完了してから、実際のジョブ実行に進む順序になります。

CDC（Change Data Capture）でデータ変更を起点に処理を起動する仕組みが、このアーキテクチャの中心になっています。

CREATE OR REPLACE STREAM job\_requests\_stream
  ON TABLE job\_requests;

CREATE OR REPLACE TASK ingest\_job\_requests\_task
  USER\_TASK\_MANAGED\_INITIAL\_WAREHOUSE\_SIZE = 'XSMALL'
  WHEN SYSTEM$STREAM\_HAS\_DATA('job\_requests\_stream')  
AS
  CALL ingest\_job\_requests(max\_rows => 1000);

`WHEN SYSTEM$STREAM_HAS_DATA()` を使うことで、JOB\_REQUESTS テーブルに新しいレコードが挿入されたときだけ Task が実行されます。これにより、無駄な処理を省き、効率的なジョブ管理が可能になります。

**フローの説明**

1.  スケジュール実行またはオンデマンド実行で `JOB_REQUESTS` テーブルにレコードが INSERT される
2.  Stream が変更を検知し、`ingest_job_requests_task` が自動的に起動する
3.  `ingest_job_requests_task` が完了すると、`run_pending_jobs_task` が実行される

この仕組みにより、Stream に変更がないときは Compute が起動しないため、コスト効率が高くなっています。

これらのTaskは、以下のような依存関係を形成しています。

graph LR
    SCHEDULER\["scheduler\_tick<br/>(5 分)"\]
    UI\["Google Sheets UI"\]
    JOB\_REQ\["JOB\_REQUESTS"\]
    STREAM\["job\_requests\_stream<br/>(CDC)"\]
    INGEST\["ingest\_job\_requests\_task<br/>(WHEN)"\]
    RUN\["run\_pending\_jobs\_task<br/>(AFTER)"\]
    PROC\["WRITE\_QUERY\_TO\_SHEET"\]
    CHECK\["check\_failed\_schedules\_task<br/>(1 日 1 回)"\]

    SCHEDULER -->|"INSERT"| JOB\_REQ
    UI -->|"INSERT"| JOB\_REQ
    JOB\_REQ --> STREAM
    STREAM -.-> INGEST
    INGEST -->|"AFTER"| RUN
    RUN --> PROC
    CHECK -.-> JOB\_REQ

この構成のポイントは、`scheduler_tick` と実際のジョブ実行 Task が**直接依存していない**ことです。代わりに、Stream を介して起動することで、スケジュール実行とオンデマンド実行を統一的に扱えます。

### Taskの有効化

Taskは定義しただけでは実行されません。明示的に有効化する必要があります。

ALTER TASK run\_pending\_jobs\_task RESUME;
ALTER TASK ingest\_job\_requests\_task RESUME;  

ALTER TASK scheduler\_tick RESUME;
ALTER TASK check\_failed\_schedules\_task RESUME;

**注意**: 依存関係がある場合、子Task → ルートTask の順序で有効化する必要があります。ルートTask を先に有効化すると、子Task がまだ無効な状態でルートTask が実行され、エラーになる可能性があります。

この例では、`ingest_job_requests_task` がルートTask、`run_pending_jobs_task` が子Task です。子Task → ルートTask の順で有効化します。

### 自動障害検知

壊れたスケジュールを放置しないよう、連続して失敗するスケジュールを自動で検知し、停止する仕組みを実装しました。

%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#d32f2f'}}}%%
sequenceDiagram
    autonumber
    participant T as 🚨 check\_failed\_schedules\_task<br/>(Task: 1日1回 9時JST)
    participant QS as 📅 QUERY\_SCHEDULES
    participant JS as 📊 JOB\_STATE
    participant ALERT as 🔔 Slack通知

    rect rgb(255, 245, 230)
    Note over T,JS: 1️⃣ 連続失敗の検知
    T->>QS: enabled=true のクエリ一覧取得
    loop 各 query\_id
        T->>JS: 直近5実行の status 取得
        JS-->>T: \[FAILED, FAILED, FAILED, FAILED, FAILED\]
        Note over T: ⚠️ 5連続失敗を検知!
    end
    end

    rect rgb(255, 235, 238)
    Note over T,QS: 2️⃣ 自動スケジュール停止
    T->>QS: UPDATE enabled=false<br/>WHERE query\_id=...
    Note over QS: 🛑 スケジュール自動停止<br/>(これ以上失敗が続かないように)
    end

    rect rgb(255, 235, 238)
    Note over T,ALERT: 3️⃣ アラート通知
    T->>ALERT: Slack通知
    Note over ALERT: 📧 "query\_id=XXX が<br/>5連続失敗により停止"
    end

これにより、クエリが壊れていても無限にリトライし続けることがなくなり、運用負荷が軽減されました。無限リトライによる不要な問い合わせもなくなりました。

## 移行の成果

### ユーザー体験の改善

30 秒タイムアウトに阻まれることがなくなり、UI からの実行で重いクエリも完了するようになりました。これにより「データを見る → 疑問を持つ → 条件を変えて再実行する → 気づきを得る」という試行錯誤のサイクルが、Google Sheets 上で回るようになりました。

### 運用面の改善

運用面で大きく変わったのは、ログの一元化とデバッグの容易さです。

従来の GAS 構成では、実行ログが GAS と Snowflake の両方に分散していました。GAS の実行ログは Apps Script UI で確認し、Snowflake のクエリ実行ログは QUERY\_HISTORY で確認する必要がありました。障害が発生したとき、どちらのコンポーネントで問題が起きているのか特定するだけでも手間がかかります。ログを行き来しながら、タイムスタンプを突き合わせて原因を追跡する作業は、非常に煩雑でした。

Snowflake 基盤では、すべてのログが Snowflake 内で完結します。QUERY\_HISTORY でクエリの実行履歴を、TASK\_HISTORY で Task の実行履歴を、そして JOB\_STATE テーブルでジョブの詳細な状態を、すべて SQL で追跡できます。障害が発生しても、単一のクエリログを見れば原因を特定できるため、デバッグが単一クエリで完結するようになりました。

### スケーラビリティの確保

GAS 構成では、30 秒のタイムアウト、1 日 6 時間の実行時間制限、同時実行 30 件という制約があり、ユーザー数が増えるほど制限にぶつかる頻度が高くなり、スケールできませんでした。

Snowflake 基盤では、これらの制限がなくなりました。発生するのは実行分の Snowflake クレジットのみで、コストはクエリの最適化や Warehouse サイズ調整でコントロール可能です。「実行できない」という制約から、「実行コストをどう管理するか」というエンジニアリングで解ける問題に変わりました。

## まとめ

Google Apps Script の制限にぶつかり、Snowflake で完結するアーキテクチャに作り直しました。AWS を使う構成も考えましたが、実装の早さ、運用のシンプルさ、データの置き場所を考えて、Snowflake 単体で完結する構成にしました。

主な成果は以下の通りです。

-   **30 秒タイムアウトの解消**: 重いクエリも問題なく実行できるように
-   **試行錯誤のサイクルが回るように**: 「気軽にデータを見る」体験が戻ってきた
-   **スケジュール制限の解消**: ユーザー数の上限にぶつかりにくくなった
-   **運用の一元化**: Snowflake 上で完結するモニタリング・デバッグ
-   **スケーラビリティ**: GAS の制限がなくなり、利用者増加にも対応しやすく

移行を経て感じたのは、外部サービスを組み合わせる前に、足元のプラットフォームで何ができるか確認する価値です。AWS のような構成も検討しましたが、Snowflake のエコシステムで成立しました。データチームが既に Snowflake に慣れていたこともあり、機能提供までの時間と運用負荷の両面でメリットがありました。

同じような課題に直面している方がいれば、Snowflake ネイティブなアプローチも選択肢として検討してみてください。

最後にLayerXでは、こうした基盤を一緒に作っていく仲間を募集しています。Snowflake や dbtを活用してビジネス課題を解決することに興味のある方、ぜひ覗いてみてください。

[【バクラク】データエンジニア / 株式会社LayerX](https://open.talentio.com/r/1/c/layerx/pages/61470)