---
title: "開発ツールをひとつにまとめる！ Vite+入門"
source: "https://ics.media/entry/261111/"
publishedDate: "2026-11-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "kako"
---

新しくフロントエンドのプロジェクトを作成するとき、開発ツールの選定や設定に手間がかかったことはありませんか。筆者も、ツールの導入に加え、バージョンの組み合わせを管理する作業に負担を感じていました。

[Vite+ヴィートプラス](https://viteplus.dev/)は、開発に使うツール一式（ツールチェーン）をまとめて提供します。**開発ツールを個別に導入・更新する負担を減らせる点**に注目し、この記事では従来の構成との違いと、新しいプロジェクトでの基本的な使い方を紹介します。

※この記事ではVite+ 1.3を前提にしています。

### VoidZeroが解決したいこと

Vite+は、[Vite](https://vite.dev/)の開発を主導する[VoidZero](https://voidzero.dev/)（[Cloudflareに2026年6月に参加](https://voidzero.dev/posts/voidzero-cloudflare)）のチームが開発しています。

VoidZeroの[Evan You](https://evanyou.me/)氏は、[Vue Fes Japan 2025](https://vuefes.jp/2025/)で開発環境の構築や維持にかかる負担について語っています。

> 最新のツールスタックを構築するには、多くの異なるツールを組み合わせる必要がある。また、1〜2年ごとに新しいツールに移行する必要があり、開発者は疲弊している。

-   引用元：[Vue Fes Japan 2025レポート ～Evan Youが描く、JavaScript開発ツールの理想郷 | gihyo.jp](https://gihyo.jp/article/2025/12/vuefes-japan-2025-report)

この状況を解決するために、Vite+は開発されました。

### Vite+とは

Viteが開発サーバーやビルドを担うのに対し、Vite+はテストやコードのチェックも含めて扱えます。

Vite+は次の2つを組み合わせて使います。

-   `vp`コマンド：グローバルにインストールし、Node.jsやパッケージマネージャーの管理、開発用コマンドの実行を担う
-   `vite-plus`パッケージ：プロジェクトごとにインストールし、開発用のツール一式を提供する

`vite-plus`には次のツールが含まれています。

-   開発サーバー・ビルド：Vite、[Rolldownロールダウン](https://rolldown.rs/)
-   テスト：[Vitestヴィーテスト](https://vitest.dev/)
-   リント・フォーマット：[Oxlintオーエックスリント](https://oxc.rs/docs/guide/usage/linter.html)、[Oxfmtオーエックスフォーマット](https://oxc.rs/docs/guide/usage/formatter.html)
-   ライブラリーのビルド・タスク実行：[tsdownティーエスダウン](https://tsdown.dev/)、Vite Taskヴィートタスク

ViteやRolldown、Oxlint、Oxfmtについては記事『[Vite入門](https://ics.media/entry/210708/)』で解説しています。

### 従来の構成との比較

Vite・Vitest・Oxlint・Oxfmtを個別に導入する構成を例に比較します。表のパッケージは、`package.json`に直接指定して管理する開発用ツールを指します。

項目

個別に導入する構成

Vite+

直接管理するパッケージ

`vite`、`vitest`、`oxlint`、`oxfmt`など

`vite-plus`、`vite`

リントとフォーマットの設定

`.oxlintrc.json`、`.oxfmtrc.json`

`vite.config.ts`の`lint`と`fmt`

**Vite+に含まれるツールのバージョンは、`vite-plus`のバージョンに応じて決まります。** 各ツールの組み合わせを個別に選ぶ手間を減らせます。TypeScriptやアプリケーションで使うライブラリーは別途管理します。

### 基本の使い方

新しいプロジェクトを作成し、開発サーバーの起動からビルドまでの流れを紹介します。チェックとテストでは、2つの数値を足す小さな関数を例に実行結果を見ていきます。手元で試す場合は、以下の順にファイルを追加してコマンドを実行してください。

操作には`vp`コマンドを使います。npmやpnpmなど、使用するパッケージマネージャーが異なっていても同じコマンドを使えます。

コマンド

内容

`vp create`

プロジェクトを作成する

`vp dev`

開発サーバーを起動する

`vp check`

フォーマット・リント・型チェックをまとめて実行する

`vp test`

テストを実行する

`vp build`

ビルドする

`vp run <スクリプト名>`

`package.json`のスクリプトを実行する

コマンドの詳細は公式ドキュメント『[Getting Started | Vite+](https://viteplus.dev/guide/)』を参照ください。

-   [コードを確認する](https://github.com/ics-creative/261111_vite-plus)

#### 1\. `vp`コマンドのインストール

マシンに一度`vp`コマンドをインストールします。macOSやLinuxではターミナルで次のコマンドを実行します。

```
curl -fsSL https://vite.plus | bash
```

WindowsではPowerShellで実行します。

```
irm https://vite.plus/ps1 | iex
```

新しいターミナルを開き、`vp help`でコマンドの一覧が表示されれば準備完了です。

#### 2\. プロジェクトの作成

`vp create`で新しいプロジェクトを作ります。今回はVite+が推奨するパッケージマネージャーのpnpmを指定します。

```
vp create --package-manager pnpm
```

質問には次のように回答し、フレームワークを使わないTypeScriptの構成を選びます。

-   テンプレート：［Vite+ Application］
-   プロジェクト名：`my-app`
-   フレームワーク：［Vanilla］
-   言語：［TypeScript］

エディターやGitなどの設定は、利用環境に合わせて選択してください。

`vite-plus`パッケージを含む依存パッケージのインストールまで自動で行われます。pnpmが未導入でも`vp`がダウンロードするため、先に入れておく必要はありません。

#### 3\. 開発サーバーの起動

作成したディレクトリーに移動し、開発サーバーを起動します。

```
cd my-app
vp dev
```

ターミナルに表示されたURL（通常は`http://localhost:5173/`）をブラウザーで開くと、初期画面が表示されます。

![Vite+のテンプレートで作成したアプリケーションの初期画面](https://ics.media/entry/261111/images/261111_vite-plus_dev-server.png)

以降のコマンドは、開発サーバーを終了するか、別のターミナルで`my-app`ディレクトリーを開いて実行してください。

#### 4\. フォーマット・リント・型チェック

`vp check`はOxfmtによる整形の確認と、Oxlintによるリント・型チェックをまとめて実行します。作成された[`vite.config.ts`](https://github.com/ics-creative/261111_vite-plus/blob/main/vite.config.ts)では、`lint.options`の`typeAware`と`typeCheck`が有効なため型チェックも実行されます。

どのように問題を見つけるか確認するため、意図的に誤りを含む`src/sum.ts`ファイルを追加します。

▼ src/sum.ts（エラーを確認する例）

```
export function sum(a: number, b: number): number {
  const unused = 1;
  return a + b + "1";
}
```

```
vp check
```

未使用の変数`unused`はリントの警告とTypeScriptのエラーになります。また、戻り値に文字列が含まれるため`number`型と一致しません。次のように報告されます。

```
! eslint(no-unused-vars): Variable 'unused' is declared but never used. Unused variables should start with a '_'.
（中略）
x typescript(TS2322): Type 'string' is not assignable to type 'number'.
```

※出力の一部を抜粋しています。`eslint(...)`はOxlintが表示するESLint互換のルール名です。

未使用の変数と余分な文字列を削除して修正します。

▼ [src/sum.ts](https://github.com/ics-creative/261111_vite-plus/blob/main/src/sum.ts)（修正後）

```
export function sum(a: number, b: number): number {
  return a + b;
}
```

再度`vp check`を実行すると、警告とエラーが解消されます。ファイル末尾の改行不足など、整形の問題でチェックが止まった場合は`vp check --fix`で修正できます。リントだけなら`vp lint`、整形だけなら`vp fmt`も使えます。

#### 5\. テスト

修正した`sum`関数の計算結果を、Vite+に含まれるVitestで確認します。今回の初期構成にはテストがないため、`src/sum.test.ts`ファイルを追加します。

▼ [src/sum.test.ts](https://github.com/ics-creative/261111_vite-plus/blob/main/src/sum.test.ts)

```
import { expect, test } from "vite-plus/test";
import { sum } from "./sum.ts";

test("1 + 2 は 3 になる", () => {
  expect(sum(1, 2)).toBe(3);
});
```

`vite-plus/test`からテスト用の関数をインポートしています。`expect(sum(1, 2)).toBe(3)`は計算結果が`3`になることを確認します。

```
vp test
```

ターミナルに以下のログが表示されればテストは成功です。

```
 Test Files  1 passed (1)
      Tests  1 passed (1)
```

詳しい書き方は記事『[JavaScriptのユニットテストを始めよう](https://ics.media/entry/240820/)』を参照ください。

#### 6\. ビルド

公開用のファイルを生成するには、`package.json`の`build`スクリプトを実行します。

```
vpr build
```

`vpr build`は`vp run build`の短縮形です。今回の[`package.json`](https://github.com/ics-creative/261111_vite-plus/blob/main/package.json)には`tsc && vp build`が定義されているため、TypeScriptの型チェック後にビルドします。ビルド結果は、デフォルトでは`dist`ディレクトリーに出力されます。

`vp build`を直接実行すると、スクリプトを経由せず組み込みのビルドだけを行います。この記事では型チェックも含む`vpr build`を使います。

### まとめ

実際に試してみると、チェックやテストのためのツールを個別に導入・設定する手間が少なく、開発環境を整える手軽さを感じました。

新しいプロジェクトの開発環境を整える際に、Vite+を選択肢のひとつとして検討してみてはいかがでしょうか。