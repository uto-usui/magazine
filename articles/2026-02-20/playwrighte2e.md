---
title: "PlaywrightではじめるE2Eテスト入門（後編）"
source: "https://ics.media/entry/260219/"
publishedDate: "2026-02-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

フロントエンド開発では、UIの挙動を含めてアプリ全体を検証するE2E（End-to-End）テストが重要になっています。しかし、導入や運用の難しさから、実践に踏み出せていない方もいるのではないでしょうか。

本記事では、前後編に分けて、シンプルなウェブアプリを題材に、[Playwrightプレイライト](https://playwright.dev/)を用いたE2Eテストの導入から活用までの流れを解説します。

[前編](https://ics.media/entry/251226/)では、Playwrightの導入方法やテストコードの基本的な書き方、テスト実行の流れについて紹介しました。後編となる今回は、失敗したテストの原因を特定するのに役立つトレース機能について解説します。さらに、CI環境でテストを自動実行する方法も紹介します。

本記事の対象読者

-   Playwrightの基本的な使い方を理解し、次のステップに進みたい方
-   Playwrightをチーム開発やCI環境に組み込みたいと考えている方

本記事のゴール

-   トレース機能を使って、失敗したテストの原因を分析できるようになる
-   GitHub Actionsと連携し、E2EテストをCI環境で自動実行できるようになる

この記事で紹介するテストコードのプロジェクトは以下から確認できます。実際に手元で動かせるので試してみてください。

-   [コードを確認する](https://github.com/ics-creative/251226_playwright-tutorial)

まずは、テスト失敗時の原因特定に役立つトレースビューアーを紹介します。

### Trace Viewer（トレースビューアー）

トレースビューアーは、テスト失敗時のデバッグに役立つ機能です。実行された操作やネットワークリクエスト、スクリーンショットがトレースとして記録されており、**「テストが何をして、どこで失敗したか」を後から再現できます**。

`playwright.config.ts`ファイルにトレースの設定を追加しましょう。さらにレポーターの設定も追加するとHTML形式のレポートが生成されるので、各テストのトレースビューアーへかんたんにアクセスできます。

▼`playwright.config.ts`

```
import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  // ...（省略）

  // HTMLのレポートを生成（テスト完了時に失敗があれば自動で開く）
  reporter: [['html', { open: 'on-failure' }]],
  use: {
    // ...（省略）
    
    // 本記事では動作確認のためトレースを常に有効化（'on'）
    // 実運用では'retain-on-failure'（失敗時のみ保存）や
    // CI環境では'on-first-retry'（再実行時のみ保存）の利用を推奨
    trace: 'on',
  },
  // ...（省略）
});
```

テストを実行すると、レポートとトレースが作成されるようになりました。動作の確認のため、わざとテストを失敗するように書き換えて実行してみましょう。

▼`tests/app.spec.ts`

```
import {expect, test} from '@playwright/test';

test('カウンターボタンをクリックすると値が増える', async ({page}) => {
  await page.goto('/');
  // ボタンのLocatorを取得
  const counter = page.getByRole('button', {name: 'count is'});
  // Locatorのテキストを評価
  await expect(counter).toHaveText('count is 0');
  // Locatorの操作
  await counter.click();
  // Locatorのテキストを評価
  await expect(counter).toHaveText('count is 2'); // この行を書き換えて期待値を1から2に変更（わざと失敗させる）
});
```

▼npm scriptsに追加したコマンド（`"e2eTest": "playwright test"`）を実行

```
npm run e2eTest
```

テストが失敗すると、自動でレポートが開きます。失敗したテストが一覧で表示され、対象のテストを選択するとエラー内容やトレースビューアーへのリンクを確認できます。

［View Trace］を選択すると、トレースビューアーが起動し、テストの操作履歴を再現できます。どの操作で失敗したのか、ネットワークリクエストの結果やスクリーンショットなどを確認できます。

▼レポーターでHTMLのレポートを生成。テスト結果の一覧を俯瞰できる

![レポートの起動](https://ics.media/entry/260219/images/images/260219_report.png)

▼レポートで失敗したテストを選択し、エラー箇所を確認できる

![レポートでテストエラーを確認](https://ics.media/entry/260219/images/images/260219_report_error.png)

▼トレースビューアーで詳細な操作履歴を確認。操作の再生やスクリーンショット、ネットワークリクエストも確認可能

![トレースビューアーの起動](https://ics.media/entry/260219/images/images/260219_tracer.png)

後から手動でレポートを起動したい場合は、以下のコマンドを実行します。

▼コンソールから実行

```
npx playwright show-report
```

トレースは`test-results`配下に保存されています。テストごとにディレクトリが作成され、その中に`trace.zip`が生成されます。レポート経由でなくとも、以下のコマンドでトレースビューアーを直接表示できます。

▼コンソールから実行。「…」は実際に生成されたディレクトリ名に書き換える

```
npx playwright show-trace test-results/.../trace.zip
```

`show-trace`コマンドは、CIで失敗したテスト（後述）の`trace.zip`をローカルで再現する際にも役立ちます。

**テストが失敗しても、「なぜ失敗したのか」を可視化できる**点はPlaywrightの大きな強みのひとつです。

### CI（GitHub Actionsへの組み込み）

PlaywrightはCIと組み合わせることで、変更のたびにE2Eテストを自動実行できます。プルリクエストごとにテストを走らせることで、次のようなメリットが得られます。

-   手動確認の手間を減らせるため、レビューや実装により多くの時間を使える
-   不具合を早期に検出し、手戻りが小さいうちに対処できる
-   既存機能への影響をすぐに把握でき、安心して変更を加えられる

今回は、GitHub Actionsを使った例を紹介します。GitHubリポジトリの`.github/workflows`ディレクトリにYAMLファイルを追加すると、GitHub Actionsを実行できます。

▼`.github/workflows/playwright.yml`：最小構成のworkflow例

```
name: Playwright E2Eテスト

on: pull_request

jobs:
  e2e:
    name: Playwright ブラウザE2Eテスト
    runs-on: ubuntu-latest

    steps:
      - name: リポジトリをチェックアウト
        uses: actions/checkout@v6

      - name: Node.js をセットアップ
        uses: actions/setup-node@v6
        with:
          node-version: lts/*

      - name: 依存関係をインストール
        run: npm ci

      - name: Playwrightブラウザをインストール
        run: npx playwright install --with-deps

      - name: E2Eテストを実行
        run: npx playwright test

      - name: テストレポートを保存
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: Playwright_test_report
          path: playwright-report/

      - name: テストトレースを保存
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: Playwright_test_traces
          path: test-results/
```

`on: pull_request`の指定により、プルリクエストが作成された場合にこのworkflowが実行されるようになります。`steps`に記載の通り、以下の処理を順番に実行します。

1.  リポジトリをチェックアウト
2.  Node.jsをセットアップ
3.  依存関係をインストール
4.  Playwrightブラウザをインストール
5.  E2Eテストを実行
6.  テストレポートが作成されていれば保存
7.  テストトレースが作成されていれば保存

実際に行いたいのは処理5のテスト実行です。その前に、処理1〜4の準備が必要になります。GitHub Actionsはクリーンな環境で実行されるため、Node.jsや依存関係、ブラウザを都度インストールする必要があります。

処理6と7では、テストレポートやトレースをGitHub Actionsに保存します。保存されたファイルをダウンロードすれば、テスト結果の詳細を後から確認できます。

テストレポートやトレースの生成は、`playwright.config.ts`の設定に依存します。事前に適切な値を設定しておきましょう。CI実行時にのみ有効化したい場合は、環境変数`CI`を利用するとよいでしょう。

▼CIで実行される場合に`playwright.config.ts`の設定を分岐する

```
import {defineConfig, devices} from '@playwright/test';

// GitHub Actionsで実行される場合はCI=trueが設定される
const isCI = !!process.env.CI;

export default defineConfig({
  // ...（省略）
  
  use: {
    // ...（省略）
    
    // CIの場合はテスト失敗時にのみトレースを保存。ローカルでは常に有効化。
    trace: isCI ? 'retain-on-failure' : 'on',
  },
  // ...（省略）
});
```

実際にGitHub Actionsが動作し、E2Eテストに失敗したプルリクエストを以下から確認できます。

-   [テストに失敗したプルリクエスト](https://github.com/ics-creative/251226_playwright-tutorial/pull/3)

▼テストが失敗するコードに書き換えてプルリクエストを作成。GitHub Actionsが失敗していることを確認できる

![プルリクエストでGitHub Actionsが失敗](https://ics.media/entry/260219/images/images/260219_pr_fail.png)

▼失敗したGitHub Actionsの詳細を確認

![失敗したGitHub Actionsの詳細](https://ics.media/entry/260219/images/images/260219_actions_fail.png)

▼trace.zipをGitHub Actionsのファイルに保存しているため、ダウンロードしてローカルのトレースビューアーで確認できる

![テストで生成された、ダウンロード可能なtrace.zip](https://ics.media/entry/260219/images/images/260219_artifacts.png)

※GitHub ActionsからダウンロードしたZIPファイルは、事前に展開してから使用します。

-   テストレポート（`Playwright_test_report.zip`）は、展開してできたディレクトリを`npx playwright show-report レポートのディレクトリパス`コマンドで指定します
-   テストトレース（`Playwright_test_traces.zip`）は、展開したディレクトリ内にある`trace.zip`を`npx playwright show-trace trace.zipのファイルパス`コマンドで指定します

CIに組み込むことで、**変更のたびに自動でテストを実行し、既存機能への影響を確認できるため、開発の効率化や不具合の早期発見につながります**。ぜひCI環境への組み込みも検討してみてください。

#### コラム：AI時代のPlaywright

PlaywrightはAIエージェントとの連携も進んでいます。CLIやMCPに対応した実装が公開されており、ブラウザ操作やテスト実行をAIから制御できるようになっています。

今後、AIとの組み合わせもテスト運用の選択肢のひとつになるでしょう。AIと連携したPlaywrightの活用に興味のある方は、関連リポジトリもチェックしてみてください。

-   [Playwright CLI](https://github.com/microsoft/playwright-cli)：コマンドラインからPlaywrightを実行し、ブラウザ操作やテストを制御できるツール（AIエージェントなどからも利用可能）
-   [Playwright MCP](https://github.com/microsoft/playwright-mcp)：AIツールと外部ツールを接続するための標準規格（MCP）に対応した実装

### まとめ

後編では、Playwrightのトレース機能を使ったデバッグ方法と、GitHub Actionsを活用したCI連携について解説しました。

テストは「書いて終わり」ではなく、**「失敗を分析できること」「継続的に実行できること」が重要**です。トレースで失敗の原因を追い、CIで毎回実行する。この流れがあるだけで、E2Eテストは日々の開発を自然に支える仕組みになります。

前編とあわせて、Playwrightを使ったE2Eテストの基礎から運用までの流れをひととおり押さえられたのではないでしょうか。ぜひご自身のプロジェクトにも取り入れてみてください。