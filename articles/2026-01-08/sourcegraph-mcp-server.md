---
title: "Sourcegraph × 自作MCP Serverによる社内コード検索連携の取り組み"
source: "https://engineering.mercari.com/blog/entry/20250609-4660151b47/"
publishedDate: "2025-06-10"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリモバイル Tech Leadの[@\_seitau](https://x.com/_seitau)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の7日目の記事です。

今回は、CursorをはじめとするAIコーディング支援ツールに、社内コードの検索能力を持たせるための取り組みをご紹介します。

## はじめに

メルカリでは、社内向けのマイクロサービス開発フレームワークや、ScenarigoというE2Eシナリオテストツールなど、独自の技術基盤が整備されており、これらが開発速度を大きく向上させています。

一方で、社内に類似した実装が豊富にあるにもかかわらず、Cursorがそれを認識できず、実装内部を自律的に把握できないという新たな課題も生まれていました。

## 社内基盤の充実がCursorの制約になっていた背景

メルカリでは、メルカリモバイルチームを含む複数のチームで共通のマイクロサービス開発フレームワークが使われており、構成や実装パターンが似ているため、他チームの実装を参考にすることは日常的です。ScenarigoによるE2Eテストのシナリオ記述も同様に、既存のパターンを参照する場面が多くあります。

しかし、これらの実装は複数のプライベートリポジトリに分散しており、通常のGitHub検索では、求めるコードを効率的に見つけることが難しい状況でした。単一リポジトリに閉じた実装や、広く知られた著名なライブラリを使用した実装であれば、Cursorは十分にその能力を発揮できていましたが、社内独自のライブラリやツールを参照している箇所では、Cursorが期待通りに機能していない状態でした。

## 解決策：Sourcegraph MCP Server

既存のGitHubのMCP Serverも存在しますが、GitHubのAPIは社内のコードを横断的に検索するには限界がありました。特にメルカリのように複数のマイクロサービスが多層的に構成され、リポジトリが分割管理されている場合、単一リポジトリ検索に依存するGitHub APIでは、Cursorにとって十分な参照性を持たせることが困難です。

そこで、Sourcegraphのクロスリポジトリ検索機能と、構造化された検索性を活かす形で、SourcegraphのMCP Serverを社内向けに実装しました。

このMCP Serverにより、Cursorにプロンプトの中でSourcegraphを使用するように指示することで、必要な社内コードを自発的に検索し、その結果を回答やコード生成に反映することが可能になります。

## 自作Sourcegraph MCP Serverのインターフェース

今回私が開発したSourcegraph MCP Serverは、Cursorが社内コードにアクセスするための非常にシンプルなAPIインターフェースを提供しています。主に以下の2つのメソッドで構成されています。

### 1\. コード検索ツール (`mcp_sourcegraph_search_code`)

このツールはSourcegraphの強力な検索機能を利用し、メルカリの全社内リポジトリを横断してコードを検索できます。

#### パラメータ

-   `q` (required): Sourcegraphのクエリ構文に従った検索クエリテキスト

#### リクエストサンプル

基本的な検索:

```
{
  "q": "PubSubLogWithFieldsInterceptor"
}
```

言語を指定した検索:

```
{
  "q": "import React language:typescript"
}
```

関数名での検索:

```
{
  "q": "func main language:go"
}
```

ファイル名を含む検索:

```
{
  "q": "handleUserLogin file:*.go"
}
```

#### レスポンスサンプル

```
{
  "results": [
    {
      "repository": "github.com/mercari/service-a-repo",
      "file": "internal/interceptor/logging.go",
      "lineNumber": 45,
      "content": "func PubSubLogWithFieldsInterceptor() {...}",
      "url": "https://sourcegraph.com/github.com/mercari/service-a-repo/-/blob/internal/interceptor/logging.go#L45"
    },
    {
      "repository": "github.com/mercari/shared-lib",
      "file": "pkg/logging/interceptor.go",
      "lineNumber": 23,
      "content": "type PubSubLogWithFieldsInterceptor struct {...}",
      "url": "https://sourcegraph.com/github.com/mercari/shared-lib/-/blob/pkg/logging/interceptor.go#L23"
    }
  ],
  "totalCount": 12,
  "hasNextPage": true
}
```

### 2\. ファイル内容取得ツール (`mcp_sourcegraph_get_file_content`)

このツールは、指定したリポジトリの特定のファイル内容を直接取得します。

#### パラメータ

-   `repository` (required): github.com/を含む完全なリポジトリパス
-   `filePath` (required): リポジトリ内のファイルパス
-   `commitID` (optional): 特定のコミットIDまたはブランチ名

#### リクエストサンプル

基本的なファイル取得:

```
{
  "repository": "github.com/mercari/service-a-repo",
  "filePath": "src/main.go"
}
```

特定ブランチのファイル取得:

```
{
  "repository": "github.com/mercari/service-a-repo",
  "filePath": "config/app.yaml",
  "commitID": "develop"
}
```

特定コミットのファイル取得:

```
{
  "repository": "github.com/mercari/service-a-repo",
  "filePath": "README.md",
  "commitID": "a1b2c3d4e5f6789"
}
```

深いパスのファイル取得:

```
{
  "repository": "github.com/mercari/service-a-repo",
  "filePath": "internal/services/user/handler.go"
}
```

#### レスポンスサンプル

```
{
  "content": "package main\n\nimport (\n    \"fmt\"\n    \"log\"\n    \"os\"\n)\n\nfunc main() {\n    if len(os.Args) < 2 {\n        log.Fatal(\"Usage: program <arg>\")\n    }\n    \n    fmt.Printf(\"Hello, %s!\\n\", os.Args[1])\n}",
  "repository": "github.com/mercari/service-a-repo",
  "filePath": "src/main.go",
  "commitID": "main",
}
```

### 主要メリット

これらのツールが提供する主なメリットは以下の通りです。

#### 1\. リポジトリの横断検索

メルカリ組織の全リポジトリを検索対象にできるため、広範囲なコード探索が可能です。  
共有ライブラリの実装詳細を効率的に見つけるのに役立ちます。

#### 2\. 高度なクエリ構文

Sourcegraphの強力なクエリ構文をサポートしており、柔軟な検索が可能です。  
言語、ファイル名、パスなどで検索を絞り込むことができます。

#### 3\. 直接的なファイルアクセス

リポジトリをクローンすることなく、ファイル内容を直接取得できます。  
特定のコミットやブランチのファイルにアクセスできるため、過去の履歴や開発中のブランチのコードも確認できます。

### Cursor Ruleによる自発的な検索を実現

Sourcegraph MCP Serverを利用すると、Cursorに明示的に「Sourcegraphを利用して」と指示するだけで必要な時にコードベースを検索してくれます。  
さらに、以下のようにCursor用のルールを設定することによって、明示的に指示を与えずとも、Cursorが自発的にMCPを利用して検索を行うようになります。

```
# 社内コード検索のためのルール
メルカリ組織内のリポジトリでコードを検索する際は、search_code MCPツールを使用してください。これにより、すべての社内リポジトリを横断的に検索できます。

使用例
mcp_sourcegraph_search_code(q="PubSubLogWithFieldsInterceptor")

利点
- 社内すべてのリポジトリを横断的に検索可能
- 共有ライブラリの実装詳細を特定できる
- 通常のリポジトリ閲覧では見つけにくいコードにもアクセス可能
- 社内フレームワークの実装やパターンをより深く理解できる
```

一例として、以下のようにCursorに「〜のリポジトリの実装を参考にして」と伝えるだけで、Sourcegraphを通じて社内のコードベースを検索し、実装を進められるようになっていることがわかります。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/7da69f24-cursor_sourcegraph_mcp_chat-1024x1018.png)

## まとめ

Cursorに対して必要な情報を与えるだけでなく、自ら必要な実装を探しにいける環境を整えることが重要でした。GitHub APIよりも社内実装の検索に適したSourcegraph APIを採用し、それをMCP Server経由でCursorから能動的に利用できるようにしたことで、より実用的なコード生成パートナーとして活用できるようになりました。

今回の取り組みが、Cursorを活用した開発体験の向上や、社内における生産性のさらなる向上につながれば幸いです。  
明日の記事は メルペイ VPoE @Jorakuさんによる「[One Person, One Release – AI Nativeの夜明け](https://engineering.mercari.com/blog/entry/20250611-one-person-one-release/ "One Person, One Release – AI Nativeの夜明け")」です。引き続きお楽しみください。