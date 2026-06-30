---
title: "ESLintを「入れただけ」で終わらせない — 適切なルールの選び方と実行タイミング"
source: "https://ics.media/entry/260410/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-04-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

[ESLint](https://eslint.org/)イーエスリントは、JavaScriptやTypeScriptのコードの問題点を自動でチェックするツールです。**フォーマットの統一だけでなく、バグの兆候や実行時エラーにつながる記述も検知できる点が特徴**です。

ViteやNext.jsなどのフレームワークを使うと、ESLintが自動でインストールされることがあります。せっかく導入されているのに「**どのルールが何のためにあるのか**」「**いつ実行すればよいのか**」がわからず、うまく活用できていないことはありませんか？　この記事では、どんなルールがあるのか、いつ実行するとよいのかをあわせて整理します。

### ESLintを使うメリット

ESLintを活用すると、たとえば次のようなメリットがあります。

#### バグの兆候を早期に発見できる

未使用変数や到達不能コードなどの実行時エラーにつながりやすい記述を、コーディングの段階で検知できます。

#### コードレビューで本質的な議論に集中できる

コードスタイルの指摘やケアレスミスの検知をESLintに任せることで、レビューではロジックや設計の議論に時間を使えるようになります。

#### チーム内のコードスタイルが統一され、コンフリクトが減る

書き方の違いによる不要な差分が減り、マージ時のコンフリクトやレビューのノイズを抑えられます。

### ESLintで検知できること

ESLintのルールが検知できることを、代表的なものからいくつか紹介します。

#### バグにつながる可能性のあるコード

未使用変数、未定義変数、到達不能コード、`==`と`===`の比較ミスなどは代表例です。**早い段階で検知することで、不具合を未然に防ぎやすくなります**。

ルール名

できること

`no-unused-vars`

未使用の変数を検知します。不要なコードや実装漏れに気づきやすくなります

`no-undef`

未定義の変数への参照を検知します。実行時エラーを事前に防げます

`no-unreachable`

`return`後など実行されないコードを検知します。意図しない記述を見つけやすくなります

`eqeqeq`

`==`の使用を禁止します。型変換による意図しない比較を防げます

※TypeScriptファイルでは、`no-undef`はTypeScriptコンパイラーのチェックと重複しやすいため、`off`にします。また、未使用変数のチェックについても、`typescript-eslint`はESLint標準の`no-unused-vars`を`off`にして、TypeScript構文に対応した[`@typescript-eslint/no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars/)を使うよう推奨しています。

#### 可読性・保守性の問題

複雑すぎる構造、深いネスト、一貫性のないコードスタイル、マジックナンバー、`import`順序の乱れなどをルール化できます。**長期運用のしやすさにつながり、チーム開発で起きがちなコードスタイルの違いによるコンフリクトも抑えられます**。

ルール名

できること

`complexity`

関数の複雑さに上限を設けます。複雑すぎる実装を抑えられます

`max-depth`

ネストの深さを制限します。読みにくい入れ子構造を抑えられます

`sort-imports`

`import { b, a }`のような`{}`内のメンバーをアルファベット順に揃えます

`max-lines-per-function`

関数の行数に上限を設けます。1つの関数が大きくなりすぎるのを防げます

各ルールには`off`（無効）・`warn`（警告のみ・処理は続行）・`error`（CIやコミットを止める）の3段階の重大度を設定できます。バグ系は`error`、コードスタイル系は`warn`、不要なルールは`off`と使い分けることで、止めるべき問題と通知に留める問題を分けやすくなります。

#### フレームワーク・言語特有のルール

TypeScript向けのチェックやフレームワーク固有のルールを活用すると、標準ルールだけでは気づきにくい問題もカバーできます。

-   TypeScript：[typescript-eslint](https://typescript-eslint.io/)（TypeScript向けの構文解析とルール群）
-   React：[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)・[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)（JSXの構文とHooksのルールを提供する）
-   Vue.js：[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)（Vue SFC構文のルールとベストプラクティス。Nuxtでは[@nuxt/eslint](https://eslint.nuxt.com/packages/module)が公式推奨）
-   Next.js：[ESLint Plugin - Next.js](https://nextjs.org/docs/app/api-reference/config/eslint)（Next.js向けのベストプラクティスを提供する）
-   Astro：[ESLint - astro DOCS](https://docs.astro.build/ja/editor-setup/#eslint)（Astroコンポーネントファイル向けのルールを提供する）

また、[eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)（import宣言の並び順を自動整列するプラグイン）のように、標準ルールでは対応しきれない機能をコミュニティプラグインで補うことも可能です。ESLintはプロジェクトの成長に合わせてルールを追加・調整しながら育てていくツールです。

### ESLintをインストールしてみよう

Next.jsやNuxt、Astroなどのフレームワークでは、`create-next-app`などのプロジェクト作成コマンド実行時にESLintを含めるか選択でき、ESLintを選ぶと設定ファイルが自動で生成されます。その場合は追加インストール不要で、すでに`eslint.config.*`ファイルなどが用意された状態になります。

一方、それ以外のプロジェクトや、セットアップ時にESLintを含めなかった場合は、次のコマンドでインストールできます。詳細はESLint公式ドキュメントの『[Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)』をあわせて参照してください。

```
npm init @eslint/config@latest
```

コマンドを実行すると、プロジェクトの設定に関する質問がいくつか表示されるので、適切な値を選びます。

▼ 実行例

```
Need to install the following packages:
@eslint/create-config@1.11.0
Ok to proceed? (y) y

> 260410_eslint@1.0.0 npx
> "create-config"

@eslint/create-config: v1.11.0

✔ What do you want to lint? · javascript
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ Which language do you want your configuration file be written in? · js
ℹ The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
```

▼ インストールすると`eslint.config.*`ファイルが追加され、ESLintが使えるようになります。

```
.
├── eslint.config.mjs
├── package.json
└── package-lock.json
```

▼ `package.json`にlintコマンドを追加して、実行できるようにしましょう。

```
{
  ...省略...
  "scripts": {
    "lint": "eslint ."
  },
  ...省略...
}
```

### Lintの対象ファイルを正しく設定しよう

手動でESLintを追加した際に`eslint.config.*`の`files`や`ignores`を設定せずにいたり、モノレポへ移行して対象範囲が変わったりすると、意図しないファイルまでLintが実行されることがあります。ビルド成果物や運用対象外のディレクトリまで検査すると、実行時間の増加や不要な警告につながります。

`eslint.config.*`で対象（`files`）と除外（`ignores`）を先に定義しておくと、意図しないファイルへのLint実行を防げます。ブラウザー向けのコードをLintする場合は、`window`や`document`などのグローバル変数を正しく扱うために、`globals.browser`もあわせて設定しておくと安心です。

```
// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.next/**",
      "**/*.generated.*",
    ],
  },
  {
    files: [
      "apps/web/**/*.{js,jsx,ts,tsx}",
      "packages/ui/**/*.{js,jsx,ts,tsx}",
    ],
    // ブラウザー環境のグローバル変数を定義して、誤検知を防ぎます
    languageOptions: {
      globals: globals.browser,
    },
    ...js.configs.recommended,
  },
];
```

### いつLintを動かすのか？

Lintをいつ動かすかは、あらかじめ決めておくことをおすすめします。個人の判断に委ねていると、チームでの開発では意図しない実行漏れが発生し、想定しないタイミングで大きな差分が生まれ、レビュー負荷が高まることがあります。

![Lintの実行タイミングのフロー（エディター → pre-commit → CI）](https://ics.media/entry/260410/images/lint-timing-flow.png)

#### エディター上で実行する方法

エディターの拡張機能でリアルタイムに問題を検知したり（設定によって保存時の自動修正も可能）、`npm run lint`コマンドなどで手動実行する方法です。**フィードバックが速い一方で、個人の判断に任せると実行漏れが起こる可能性がある**ため、コミット時やCI（継続的インテグレーション）時の自動実行と組み合わせるのが安全です。

VS Codeの場合は、[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)拡張機能をインストールすると、リントエラーをリアルタイムに表示できます。保存時に自動修正するには、`settings.json`に以下を追加します。

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

#### コミット時に実行する方法

[husky](https://www.npmjs.com/package/husky)（Gitフックを簡単に設定できるツール）と[lint-staged](https://www.npmjs.com/package/lint-staged)（コミット対象ファイルだけにLintを実行するツール）を組み合わせる方法があります。この組み合わせでは、**Gitの`pre-commit`フック（コミット直前に実行される処理）でLintを自動実行**し、問題が残っている場合はコミットを止められます。

huskyはGitリポジトリーのルートで動作するため、以下のコマンドはすべてリポジトリーのルートディレクトリで実行してください。

▼ インストール

```
npm install -D husky lint-staged
```

▼ huskyの初期化

以下のコマンドを実行すると、`.husky/`ディレクトリと`pre-commit`ファイルが自動生成され、`package.json`の`scripts`に`"prepare": "husky"`が追加されます。

```
npx husky init
```

▼ `pre-commit`の設定

生成された`.husky/pre-commit`はデフォルトで`npm test`になっているため、`npx lint-staged`に書き換えます。

```
npx lint-staged
```

▼ `package.json`にlint-stagedの設定を追加

`*.{js,ts}`の部分は`eslint.config.*`の`files`に指定した対象ファイルのパターンに合わせて設定してください。

```
{
  "lint-staged": {
    "*.{js,ts}": "eslint"
  }
}
```

#### CI（継続的インテグレーション）で自動実行する方法

Pull Request作成時やpush時にCIでLintを実行し、エラーがある場合はPull Requestを通させないことが可能です。 **個人環境に依存せず同じ条件でチェックできる**ため、エディターやコミット時のチェックをすり抜けた問題もここで拾えます。

GitHub Actionsを使う場合は、以下のようなワークフローファイルをプロジェクトルートの`.github/workflows/`に追加します。ローカル開発と同じ`npm run lint`を指定するといいでしょう。

```
# .github/workflows/lint.yml
name: Lint
on:
  push:
    branches: [main]
  pull_request:
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - run: npm ci
      - run: npm run lint
```

#### コラム：`--fix`による自動修正

エディター・コミット・CIでLintを実行する際、一部のルールは`--fix`オプションで自動修正できます。手作業で直す手間を減らせるため、積極的に活用するのがおすすめです。

ただし、フォーマット系ルールは[2023年にESLint本体から非推奨](https://eslint.org/blog/2023/10/deprecating-formatting-rules/)となっており、[Prettier](https://prettier.io/)や[dprint](https://dprint.dev/)などの専用フォーマッター、または[ESLint Stylistic](https://eslint.style/)（`@stylistic/*`）を使う構成が推奨されています。 Prettierの導入については記事『[Prettierの導入方法](https://ics.media/entry/17030/)』も参考にしてください。

ルール名

できること

`@stylistic/semi`

セミコロンの有無を統一します

`@stylistic/quotes`

クォートの種類を統一します。差分のばらつきを減らせます

`@stylistic/comma-dangle`

末尾カンマのルールを統一します。行の追加・削除時の差分を小さくできます

`@stylistic/object-curly-spacing`

オブジェクトの`{ }`内のスペースを統一します

### Lint実行を高速化する選択肢

ここまではESLintを中心に運用を整理しました。さらに実行速度を高めたい場合の選択肢として、[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)オーエックスリントを紹介します。

OxlintはESLintと互換性があり、ESLintより最大50〜100倍高速に動作するとされている高性能なLinterです。デフォルトでは、エラー箇所のコードスニペットと修正ヒントをあわせて表示する見やすい診断が返ってきます。また、JSON形式での出力にも対応しており、AIツールによる自動修正とも相性がよい設計です。

![Oxlintの診断出力の例（コードスニペットと修正ヒントが表示される）](https://ics.media/entry/260410/images/oxlint-output.png)

すでにESLintを運用しているリポジトリーでは、OxlintとESLintとを両立する手段もあります。段階的にESLintのルールをOxlintに移行するのもいいでしょう。[eslint-plugin-oxlint](https://www.npmjs.com/package/eslint-plugin-oxlint)はOxlintと重複するESLintのルールを自動で無効化するプラグインで、併用時の設定をすっきり整理できます。[公式の移行ガイド](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html)に沿えば、ほとんどのプロジェクトではスムーズに進められます。

### まとめ

ESLintは、導入して終わりではなく、「何を防ぐためのルールか」を明確にして運用してこそ力を発揮するツールです。 エディター・コミット時・CIの役割を分けて実行タイミングを設計すると、レビュー依存や手戻りを減らしやすくなります。

チームで判断基準を共有し、ルールとして管理していくことが、コード品質を保ち続けるコツです。

なお、PrettierやESLintに代わる選択肢として、フォーマットとリントを統合したBiomeや、Oxcが提供するOxfmt（フォーマッター）とOxlintの組み合わせも注目されています。詳しくは記事『[手軽で高速なフォーマッターBiomeの導入手順](https://ics.media/entry/260126/)』や、OxlintとOxfmtを紹介している記事『[Vite入門](https://ics.media/entry/210708/)』も参考にしてください。