---
title: "n8nの静的解析CLIツールをOSS化 – JSON解析とDAGで実現するセキュリティチェックの自動化"
source: "https://engineering.mercari.com/blog/entry/20251211-580dc508a7/"
publishedDate: "2025-12-13"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルペイのPayment & Customer PlatformのAccountingチームでBackend Engineerをしている [@mewuto](https://x.com/mewuto)（みゅーと）です。  
この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の13日目の記事です。

## 要旨

メルカリでは、業務自動化プラットフォームとして[n8n](https://n8n.io/)を導入していますが、ワークフローの自由度が高い反面、セキュリティリスクも懸念されます。特に「権限混同（Confused Deputy Problem）」は重大な脅威であり、個人の権限を不適切に共有することで、意図しないデータアクセスや操作が可能になってしまいます。

本記事では、n8nワークフローのセキュリティレビューを自動化するCLIツールの開発と、GitHub Actionsを活用した実際の運用例について解説します。このツールは[GitHub](https://github.com/mewuto/n8ncheck)でOSS公開しており、[npm](https://www.npmjs.com/package/@mewuto/n8ncheck)からインストール可能です。

![npm-@mewuto/n8ncheck](https://storage.googleapis.com/prd-engineering-asset/2025/12/e3dc703b-screenshot-2025-12-08-at-4.08.35-1024x314.png)

**対象読者**:

-   ワークフロー自動化ツール(n8n、Zapier等)を使用している開発者・セキュリティ担当者
-   JSONベースの静的解析やDAGを用いたフロー解析に興味のある方
-   業務自動化基盤のセキュリティ強化に取り組んでいる方

## 目次

1.  背景：n8n導入とセキュリティ課題
2.  セキュリティポリシーの定義
3.  アーキテクチャ概要
4.  ノードレベル検出の実装例：BigQuery本番環境アクセス検知
5.  シナリオレベル検出の実装例
6.  検出の例および社内での活用事例
7.  成果と今後の展望
8.  まとめ

## 1\. 背景：n8n導入とセキュリティ課題

### n8nとは

[n8n](https://n8n.io/)は、ノーコード/ローコードで業務自動化ワークフローを構築できるオープンソースのプラットフォームです。ZapierやMakeと同様に、異なるサービス間のデータ連携や処理の自動化が可能ですが、n8nはより自由度が高く、柔軟なカスタマイズや複雑なフローの構築ができる点が特徴です。

メルカリでは、開発者やビジネスチームの業務効率化のため、n8n Enterpriseを導入しました（参考：[理想の Workflow Platform という“聖杯”に、n8n でついに手が届くかもしれない](https://engineering.mercari.com/blog/entry/20251211-cf3b67a5a7/)）。しかし、その自由度の高さゆえに、以下のセキュリティ課題が浮上しました。

### Confused Deputy Problem（権限混同）の脅威

「Confused Deputy Problem」とはあるシステムにおいて、ユーザーが本来持つ権限よりも大きな権限が設定されているときに、アクセスできないはずのリソースにアクセスできたり変更できてしまう問題です。n8nワークフローでは、権限を持つメンバーのcredentialが組み込まれているため、以下のようなリスクが発生します。

-   **データベースへの意図しないアクセス**: 本来DBアクセス権を持たないメンバーが、Slackボットを実行することで、権限を持つメンバーのcredentialを通じて本番データベースにアクセスできてしまう
-   **機密情報の意図しない漏洩**: ワークフローが出力した機密情報（スプレッドシート、Slack Publicチャンネルへの投稿等）を、本来アクセス権を持たないメンバーが閲覧できてしまう
-   **チーム間での権限境界の破綻**: 別チームのメンバーが作成したワークフローを実行することで、本来アクセスできない他チームのリソース（社内ドキュメント、ストレージなど）にアクセスできてしまう

これらの問題を防ぐため、ワークフロー有効化前の手動レビューを実施していましたが、以下の課題がありました。

1.  **レビュー工数の増大と品質の不安定性**: 1ワークフローあたり、修正依頼や修正後の再レビューを含めて30分〜1時間のレビュー時間が必要。また、セキュリティガイドラインは整備されているものの、詳細な技術ドキュメントを参照しながらワークフローを作成することは容易ではなく、ユーザー自身での自己改善が難しい。加えて、人間によるレビューである以上、見落としのリスクも存在する
2.  **継続的監視の欠如**: 承認後もワークフローは自由に変更可能であり、変更後の安全性を保証できない

これらの課題を解決するため、静的セキュリティ解析ツールの開発に至りました。

## 2\. セキュリティポリシーの定義

ツール開発にあたり、セキュリティガイドラインを策定しました。主要な要件は以下の通りです。

### 2.1 権限混同の防止

-   **入力ソースの制限**: ワークフローをトリガーできるユーザーを明示的に制限
-   **出力先の制限**: 結果の出力先を閲覧権限を持つユーザー内に限定

### 2.2 Slack Bot特有の要件

-   **実行可能メンバーのホワイトリスト化**: Slackトリガーには必ずユーザー検証を実装
-   **エフェメラルメッセージの使用**: 機密情報は一時的なメッセージで返す
-   **Private Channel推奨**: Public Channelへの出力を制限

### 2.3 データの入出力制御

-   **本番環境アクセスの明示**: 本番データへのアクセスは明示的に警告
-   **動的クエリの検証**: 外部入力による動的クエリを検出。動的にSQLクエリを構築すると、本来意図していないテーブルやデータセットにアクセスできてしまうリスクがあるため、最小権限の原則に基づき使用範囲を制限
-   **入力値のフィルタリング**: 外部入力を使用する箇所での検証実装
-   **出力先のアクセス権限制御**: Google Sheetsなどへの出力時は、適切なアクセス権限スコープ（閲覧可能ユーザーの制限）が設定されていることを確認

これらのポリシーを自動検証することで、手動レビューの負担を大幅に軽減できます。

## 3\. アーキテクチャ概要

### 3.1 全体構成と処理の流れ

ツールは以下の処理フローで動作します。

1.  **n8nワークフローJSON読み込み**
    
2.  **静的解析による検証**:  
    2.1. **ノードレベルチェック**: 個別ノード（BigQuery、HTTP Request、JavaScript Code、Google Sheets/Drive等）の設定を検証  
    2.2 **シナリオレベルチェック**: 複数ノード間の関係性（Slackトリガー後の呼び出しユーザーのバリデーション実装、スプレッドシート出力先の権限範囲等）をDAG（有向非巡環グラフ）を用いて解析。  
    ※ **なぜDAGが必要か**: LLMによるチェックは再現性が保証されず、論理的なグラフ解析もまだ未発達です。DAGによる静的解析は、ノード間の実行順序や依存関係を確実に追跡でき、「バリデーション → 外部アクセス」といったセキュリティ上重要な順序関係を100%の精度で検証可能です。
    
3.  **検出結果の出力**: Console、JSON、PR Comment形式で結果を出力
    

### 3.2 ワークフローJSONの構造

n8nのワークフローは、以下のようなJSON形式で保存されます。

```
{
  "name": "My workflow",
  "nodes": [
    {
      "id": "node-id-1",
      "type": "n8n-nodes-base.googleBigQuery",
      "parameters": {
        "projectId": "merpay-prod",
        "sqlQuery": "{{ $json.query }}",
        "operation": "executeQuery"
      }
    },
    {
      "id": "node-id-2",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const data = $input.item.json;\nreturn { result: data.rows.length };"
      }
    },
    {
      "id": "node-id-3",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "resource": "message",
        "operation": "post",
        "channel": "#general",
        "text": "{{ $json.result }}"
      }
    }
  ],
  "connections": {
    "node-id-1": {
      "main": [[{"node": "node-id-2", "type": "main", "index": 0}]]
    },
    "node-id-2": {
      "main": [[{"node": "node-id-3", "type": "main", "index": 0}]]
    }
  }
}
```

このJSONから以下の情報を抽出できます。

-   **ノード設定**: 各ノードのtype、parameters、credentials
-   **フロー構造**: connectionsによるノード間の依存関係

各ノードのparametersには、ノードタイプに応じた詳細情報が含まれます。

-   JavaScript Codeノードの実装内容
-   BigQueryのデータセット名やSQLクエリ
-   HTTPリクエストのエンドポイント、メソッド、リクエストボディ

この構造化された豊富な情報により、実行前の詳細な静的解析が可能になります。

### 3.3 2層検出アーキテクチャ

セキュリティリスクは、個別ノードの設定だけでなく、ノード間の関係性によっても発生します。そのため、本ツールでは以下の2層アーキテクチャを採用しています。

**ノードレベル検出**:

-   個別ノードの設定を検証
-   例：BigQueryの本番プロジェクトアクセス、Slackの投稿先チャンネル
-   各ノードが独立して安全な設定になっているかを確認

**シナリオレベル検出**:

-   複数ノード間の関係性を検証
-   DAGを用いたフロー解析
-   例:  
    (i) Slack Trigger → ユーザーバリデーション → 外部アクセスの順序検証  
    (ii) Google Sheets Create → Google Drive Share/HTTP Request Permissionsのスコープ設定検証
-   ワークフロー全体としてセキュリティ要件を満たしているかを確認

この2層アプローチにより、個別の設定ミスだけでなく、ワークフロー全体の設計上の問題も検出できます。

## 4\. ノードレベル検出の実装例：BigQuery本番環境アクセス検知

ノードレベル検出の具体例として、BigQueryの本番環境アクセス検知を解説します。

### 4.1 検出対象

以下のようなワークフローを検出します。

```
{
  "parameters": {
    "projectId": "merpay-prod",
    "operation": "executeQuery"
  },
  "type": "n8n-nodes-base.googleBigQuery"
}
```

この設定では、`projectId`に`prod`文字列を含む本番環境プロジェクトへのアクセスを検出します。

### 4.2 実装

検出ロジックは [BigQueryChecker](https://github.com/mewuto/n8ncheck/blob/main/src/nodes/bigquery/checker.ts) に実装されています。

```
// Typescript
// パラメータからプロジェクトIDを取得
const projectId = node.parameters.projectId;

// 本番環境へのアクセスを検出
if (projectId.includes('prod')) {
  // 警告を追加
  addWarning('本番環境へのアクセスが検出されました');
}
```

詳細な実装は[GitHubリポジトリ](https://github.com/mewuto/n8ncheck)を参照してください。

### 4.3 検出結果

検出された問題は以下のような形式で報告されます。

```
### ⚠️ 警告 (Warnings) (1)

- **[Execute a SQL query]** (n8n-nodes-base.googleBigQuery) 本番環境プロジェクト `merpay-prod` へのアクセスが検出されました。本当にアクセスして良いか確認してください。
```

* * *

## 5\. シナリオレベル検出の実装例

シナリオレベル検出では、複数ノード間の関係性を解析します。代表的な実装例として、Slack User Validationシナリオを解説します。

### 5.1 検出対象のリスク

Slack Triggerを使用したワークフローでは、以下のリスクがあります。

**想定されるリスクシナリオ**:

-   本来アクセス権を持たないメンバーがSlackボットにコマンドを送信し、アクセス権を持つメンバーのcredentialを使用して本番データベース等の機密リソースにアクセス

**必要な対策**:

-   Slackトリガーの直後にユーザーバリデーションを実装
-   外部アクセス（BigQuery、HTTP Request等）の前にバリデーションを完了
-   バリデーションに失敗した場合はワークフローを停止

### 5.2 検出の流れ

Slack User Validationの検出は、以下の3ステップで実施されます。

1.  **DAG解析でバリデーションノードを探索** (5.3節): Slack Triggerから下流のノードを辿り、Code/Ifノードを探索
2.  **バリデーション実装を検証** (5.4節): 見つかったノードの内容を解析し、適切なユーザー検証が実装されているか確認
3.  **フロー整合性をチェック**: バリデーション前に外部アクセス(BigQuery等)が存在しないか検証

### 5.3 DAGによるフロー解析

> **n8nのループ対応**:  
> n8nではワークフロー内でループ（循環参照）を作成できます。しかし、フロー解析にはDAG（有向非巡環グラフ）が必要です。そのため、SCC（強連結成分分解）を用いてループを検出し、各SCCを1つのノードとして扱うことでDAGに変換します。

**実装** ([workflow-graph.ts](https://github.com/mewuto/n8ncheck/blob/main/src/graph/workflow-graph.ts)):

```
// Typescript
// 1. 強連結成分（SCC）を検出
const sccs = stronglyConnectedComponents(this.graph);

// 2. 各SCCを1つのノードとして扱い、Condensed DAGを構築
const condensedDAG = this.createCondensedDAG(sccs);

// 3. トポロジカルソートで実行順序を決定
const executionOrder = topologicalSort(condensedDAG);
```

この変換により、ループを含むワークフローでも確実にフロー解析が可能になります。

e.g. **Slack Triggerからのパス解析** ([slack-user-validation/checker.ts](https://github.com/mewuto/n8ncheck/blob/main/src/scenarios/slack-user-validation/checker.ts)):

```
// Typescript
// 1. Slack Triggerからの全ての下流ノードを取得
const allDownstreamNodes = this.getAllDownstreamNodes(slackTriggerId);

// 2. バリデーションノード候補を抽出（Code, If nodes）
const codeNodes = allDownstreamNodes.filter(
  node => node.type === NODE_TYPES.CODE
);
const ifNodes = allDownstreamNodes.filter(
  node => node.type === NODE_TYPES.IF
);

// 3. Slack Triggerからバリデーションノードまでのパスを取得
const pathToNode = this.graph.getPathFromNodeToNode(
  slackTriggerId,
  codeNode.id
);

// 4. パス上に外部アクセスノードがないか検証
const pathValid = this.isPathValid(pathToNode);
```

### 5.4 バリデーションノードの検証

バリデーションノード候補が見つかったら、ノードタイプに応じて内容を解析します。

#### **Codeノードによるバリデーション** ([jscode-validator.ts](https://github.com/mewuto/n8ncheck/blob/main/src/scenarios/slack-user-validation/validators/jscode-validator.ts))

BabelのAST解析で以下の4要素を検出:

1.  **User ID抽出**: `$input.item.json.user`または`$json.user`
2.  **許可ユーザーのホワイトリスト定義**: `const users = { 'U123': 'user1', 'U456': 'user2' }`
3.  **検証ロジック**: `!users.hasOwnProperty(userId)`等
4.  **エラーハンドリング**: 検証失敗時の`return`または`throw`

4要素すべて揃っている場合は完全な実装と判定します。

#### **Ifノードによるバリデーション** ([if-node-validator.ts](https://github.com/mewuto/n8ncheck/blob/main/src/scenarios/slack-user-validation/validators/if-node-validator.ts))

Ifノードの条件式で以下をチェック:

1.  **メールアドレスパターン**: 右辺値が会社ドメイン（例: `@example.com`）のパターンと一致
2.  **ユーザーコンテキスト抽出**: 左辺値にユーザー情報の抽出が含まれる
3.  **等価演算子**: `equals`演算子による厳密なチェック

If nodeで「`{{ $json.user }}` が `@example.com` メールと一致するか」をチェックするパターンを検出可能です。

### 5.5 検出結果の例

#### **Codeノード（javascript）**

**完全なユーザーバリデーション実装**

```
// Javascript
// Slack Triggerの直後のCode node
const userId = $input.item.json.user;
const users = {
  'U0123ABCD': 'authorized_user1',
  'U4567EFGH': 'authorized_user2'
};

if (!users.hasOwnProperty(userId)) {
  return; // バリデーション失敗時に停止
}

// 以降の処理
```

検出結果:

```
### ✅ OK (1)

Slack TriggerのCodeノードで適切なユーザー検証が実装されています。承認済みユーザー数: 2
```

**不完全なユーザーバリデーション実装**

```
// Javascript
// User ID抽出のみ実装（ホワイトリストなし）
const userId = $input.item.json.user;
// 検証ロジックなし
```

検出結果:

```
### 🚨 重大な問題 (Critical Issues) (1)

- **[Slack Trigger]** (n8n-nodes-base.slackTrigger) Slack Triggerに対するユーザー検証が不完全です。以下の「不足している要素と修正方法」を参考にCodeノード "User Validation" を設定してください：
  - 不足している要素と修正方法:
  - 1. 認証リスト: オブジェクトとして定義（変数名は "users" である必要があります）: `const users = { "userId1": "userName1", "userId2": "userName2" }`
  - 2. 検証ロジック: `if (!users.hasOwnProperty(userId))`, `if (!(userId in users))` などのチェックを追加
  - 3. エラーハンドリング: 検証のif文内に `return` または `throw` ステートメントを追加
```

#### **Ifノード**

Ifノードで以下のような条件を設定:

-   左辺値: `{{ $json.user }}` （Slackユーザー情報の抽出）
-   演算子: `equals` （等価演算子）
-   右辺値: `@example.com` （会社ドメインパターン）

検出結果:

```
### ✅ OK (1)

Slack TriggerのIfノードで適切なユーザー検証が実装されています。
```

## 6\. 検出の例および社内での活用事例

メルカリでは、このツールをGitHub Actionsに組み込み、ワークフロー追加時のPRで自動的にセキュリティチェックを実行しています。

### 6.1 問題のあるワークフローの検出例

以下のワークフローには複数のセキュリティ上の問題および懸念があります。

![error-pattern-workflow](https://storage.googleapis.com/prd-engineering-asset/2025/12/2538f821-error-workflow.png)

**検出された問題**:

-   Slack Trigger直後のユーザーバリデーションが未実装
-   BigQueryで本番環境（prod）プロジェクトへのアクセスを実行
-   Google Sheets作成後のアクセス権限スコープ設定が未実装

これらの問題は、PRコメントとして以下のように報告されます：  
Slack TriggerとGoogle Sheetsでは重大な問題として、BigQueryの本番環境アクセスについては警告として検出されます。

![error-pattern-pr-sample](https://storage.googleapis.com/prd-engineering-asset/2025/12/45c2b175-error-pattern.png)

### 6.2 修正後のワークフローの検証例

上記の問題を修正したワークフローでは、以下の対策が実装されています。

![success-workflow](https://storage.googleapis.com/prd-engineering-asset/2025/12/de03b561-success-workflow.png)

**実装された対策**:

-   Ifノードによるユーザーバリデーション（メールドメインチェック）
-   Google Driveノードによる適切なアクセス権限スコープ制御

そして、修正後のPRコメントでは、問題が解消されたことが確認できます。

![success-pattern-pr-sample](https://storage.googleapis.com/prd-engineering-asset/2025/12/a2c20638-success-pattern.png)

ユーザーバリデーションが正しく実装されていることを検出し、スコープ制御の設定内容も詳細に表示されます。これにより、レビュアーはセキュリティ観点を即座に確認できるようになっています。

## 7\. 成果と今後の展望

ツール導入によって得られた定量的な成果に加え、開発を通じて得られた技術的な知見、そして今後の展望について整理します。

### 7.1 定量的成果

**レビュー工数の削減**:

-   手動レビュー時間: 30-60分/ワークフロー → 5-10分/ワークフロー
-   削減率: **約80-85%**

**検出精度**:

-   重大セキュリティリスク（🚨 Error）の検出率: **100%**
-   偽陽性率: 約15%（⚠️ Warningレベル）

### 7.2 技術的知見

**JSONからの情報抽出**:

-   n8nのワークフローJSONには、ノード設定、接続情報、コード内容など、豊富な情報が含まれる
-   この構造化データにより、他のワークフローツール（Zapier、Make等）よりも詳細な静的解析が可能

**DAGによるフロー解析**:

-   [graphology](https://graphology.github.io/)をベースとしたグラフ構造で、ノード間の依存関係をDAGとしてモデル化
-   `graphology-components`でSCC（強連結成分分解）を実行し、ループをDAGに変換
-   `graphology-dag`のトポロジカルソートで実行順序を決定し、複雑なワークフローパターンを検出可能
-   特に「ユーザーバリデーション → 外部アクセス」の順序検証など、セキュリティ上重要な関係性を自動検証できる

**AST解析の有用性**:

-   正規表現では検出が難しい複雑なJavaScriptパターンを、ASTによる構造的な解析で実現
-   Babelのtraverseを使うことで、コードの意味を理解した検証が可能

**n8n公式との型定義同期**:

-   n8nは個別ノードの型定義を公式に提供していないため、このツールでは独自に型定義を作成
-   公式パッケージには**TypeScript型定義**ではなく、**ランタイムスキーマ定義**(`versionDescription.properties`)が含まれており、各パラメータの名前、型、必須/任意などの情報を持つ
-   このスキーマ定義を活用し、Schema Validator ([bigquery/schema-validator.ts](https://github.com/mewuto/n8ncheck/blob/main/src/nodes/bigquery/schema-validator.ts)) で自作型定義のキーと公式スキーマのプロパティ名を照合
-   不一致が検出された場合は警告を出力することで、公式の破壊的変更（パラメータ名変更、削除等）にも迅速に対応可能

### 7.3 今後の展望

**検出ノードの拡充**:

-   現在対応しているノードタイプの拡大

**LLMとの連携**:

-   検出結果に対する修正提案の自動生成
-   ワークフローの意図を理解した高度なセキュリティ分析

**動的情報を活用した検出の強化**:

-   Slack APIを用いたチャンネル属性の検証：チャンネルIDからPrivate/Publicを判定し、Public Channelへの投稿を警告
-   Credential情報から取得可能な権限スコープの検証：設定されたCredentialの実際の権限を確認し、過剰な権限付与を検出

## 8\. まとめ

本記事では、n8nワークフローの静的セキュリティ解析ツールの開発について解説しました。

**技術的ポイント**:

1.  **ワークフローJSONの豊富な情報活用**: ノード設定、接続情報、コード内容を完全に抽出可能
2.  **DAGによるフロー解析**: 複数ノード間の関係性を解析し、セキュリティ上重要なパターンを検出
3.  **AST解析**: JavaScriptコードを構造的に理解し、ユーザーバリデーションロジックの完全性を検証

**ビジネスインパクト**:

-   手動レビュー工数を80%削減
-   継続的な自動監視により、変更後のワークフローも安全性を保証
-   セキュリティポリシーの標準化と一貫性のある適用

ワークフロー自動化ツールの導入が進む中、本ツールのような静的解析アプローチは、他のプラットフォームにも応用可能です。業務効率化とセキュリティ確保の両立を目指す組織の参考になれば幸いです。

明日の記事は abcdefujiさんです。引き続きお楽しみください。

_n8n.io logo source: [https://n8n.io/brandguidelines/](https://n8n.io/brandguidelines/)_