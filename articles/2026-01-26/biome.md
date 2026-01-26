---
title: "手軽で高速なフォーマッターBiomeの導入手順"
source: "https://ics.media/entry/260126/"
publishedDate: "2026-01-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "oka"
---

ウェブのフロントエンド開発では、PrettierやESLint、Stylelintなどのツールチェーンが長らくデファクトスタンダードとして採用されてきました。

一方で、大規模なプロジェクトでは**実行速度の遅さ**がボトルネックとなることがあります。また、設定ファイルの肥大化によって**ツール間でルールの不整合が発生する**点も課題です。

こうした課題に対し、近年ではBiomeバイオームやOxcオーエックスシーといった高速化と統合を掲げる新しいツールチェーンが登場し、注目を集めています。

本記事ではBiomeの導入手順を紹介し、Prettier/ESLint/StylelintやOxcと比較しながら特徴と注意点を整理します。

### Biomeとは

[Biome](https://biomejs.dev/ja/)は、Rustで実装された高速なフォーマッター兼リンターの統合ツールチェーンです。Prettierとの互換性を意識して実装されており、HTML/CSS、JavaScript/TypeScript、JSONなどさまざまなファイル形式をターゲットにできます。[公式ベンチマーク](https://github.com/biomejs/biome/tree/main/benchmark#formatting)の条件下では、**Prettierより約25倍高速**だとされています。

また、Biomeはリンターの機能も兼ねているため、フォーマットとリントの設定を簡単に行えます。PrettierとESLintを併用するプロジェクトでは、設定を`.prettierrc`や`eslint.config.js`などの別ファイルに記述する必要がありました。Biomeでは `biome.json`という1つのJSONファイルにまとめて記述できます。

### Biomeの導入方法

早速Biomeをプロジェクトに導入してみましょう。今回はNode.jsとnpmを使った導入について解説します。

#### 1\. インストールと初期化

プロジェクトのディレクトリで下記のコマンドを実行し、biomeをインストールします。プロジェクト内のメンバー間でバージョンのずれが起こるのを防ぐためにも`-E`オプションをつけてバージョンを固定するのがオススメです。

```
npm install -D -E @biomejs/biome
```

次に設定ファイルの初期化を行いましょう。下記のコマンドを実行すると、設定ファイルの`biome.json`が作成されます。

```
npx biome init
```

▼ biome.json

```
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

いくつかフィールドがありますが、トップレベルのフィールドを大まかに説明すると以下のようになります。

-   `vcs`：Gitなどのバージョン管理システムに関する設定。`.gitignore`で無視されているファイルを、Biomeの対象から外すかどうかなどを決める。
-   `files`：Biomeが対象とするディレクトリやファイル、巨大なサイズのファイルを無視するかどうかなどを設定。
-   `formatter`：`biome format`によるフォーマットルールの設定。
-   `linter`：`biome lint`によるリントルールの設定。
-   `javascript`：JavaScript/TypeScriptファイルに関する固有の設定。
-   `assist`：import文の並び替えや整理に関する設定。

フォーマットとリントに関するフィールドをみていきましょう。

▼ biome.json（抜粋）

```
  /* 省略 */
 "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  /* 省略 */
```

`formatter`フィールドには初期状態で、`enabled`（フォーマットを有効にするかどうか）、`indentStyle`（インデントはタブかスペースか）の2つが指定されています。このフィールド内に`indentWidth`（インデントのサイズ）、`lineWidth`（コードを折り返す列幅）などのフィールドを追加し、設定をカスタマイズできます。なお、デフォルトの`indentStyle`は`tab`ですので、スペースを使う場合は`space`に変更してください。

リントに関する設定を行う`linter`フィールドには、フォーマット同様の`enabled`に加え、`rules`フィールドがあります。`rules`フィールド内にカスタムした設定を記述できますが、初期状態では`recommended`のみ指定されており、デフォルトの推奨ルールが指定されています。この推奨ルールはESLintのものとは異なるので、ESLintに慣れている方はご注意ください。

また、`javascript`というフィールド以外にも`css`、`json`フィールドで、CSSやJSONファイル固有の設定も記述できます。

#### 2\. npmスクリプトの設定

次に`package.json`内のnpmスクリプトに、フォーマットとリント用のコマンドを登録しましょう。

▼ package.json（抜粋）

```
  /* 省略 */
  "scripts": {
    "format": "biome format --write src",
    "lint": "biome lint --write src",
    "check": "biome check --write src"
  },
  /* 省略 */
```

**format**

フォーマットの際には `biome format <files>`コマンドを実行することで対象ファイル`<files>`をフォーマットできます。`--write`オプションをつけて実行することで、対象ファイルを自動で修正できます。

▼ フォーマット

```
npm run format
```

**lint**

リントは`npm run lint`に登録された`biome lint <files>`を実行します。こちらも`format`と同様に、`--write`オプションを指定することで、コードのセマンティクスに影響しない範囲でリントエラーを自動修正できます。ESLintでいう`--fix`オプションと同様です。

▼ リント

```
npm run lint
```

**check**

Biomeには`check`コマンドがあり、フォーマットとリントの同時実行に加えて、Organize Imports（importの整理）も同時に実行できます。

▼ フォーマット&リント

```
npm run check
```

以下は比較用に用意したtsxファイルを対象とした、checkコマンド実行前後のコード比較です。注目点は「import文の集約」「JSX内のコードスタイル」の2点です。

`check`コマンドによる修正後は、バラバラだった`useState`と`useEffect`の`import`文が1つにまとめられています。また、JSX内にあった不揃いなインデントや、誤って挿入された余分なセミコロンも一括で整理されていることがわかります。

▼ `biome check`によるコード整形比較

![biome checkによるコード整形比較](https://ics.media/entry/260126/images/biome-comparison.png)

以下のリポジトリにPrettier/Biomeによるコード整形を比較するReactのサンプルコードを用意していますので、手元で動作を確認したい方はご利用ください。

-   [コードを確認する](https://github.com/ics-creative/260126_biome-intro)

また、Prettierなどと同様に、VS CodeやWebStormといったエディターに拡張機能としても導入できます。

-   [VS Code拡張機能](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
-   [IntelliJプラグイン](https://plugins.jetbrains.com/plugin/22761-biome)

### 他ツールとの比較

#### Prettier/ESLint/Stylelint

もっとも広く普及しているフォーマッターやリンター、CSSリンターの組み合わせとしては、Prettier/ESLint/Stylelintが挙げられます。これらはデファクトスタンダードとして多くのプロジェクトで利用されており、柔軟なルール拡張や豊富なプラグインでさまざまな状況に対応できます。たとえばStylelintでは、BEMなどのCSS設計を採用した際に、命名規則チェックができます。これはBiomeや、後述するOxlintにはない利点です。

Prettier/ESLintの導入に関しては、記事『[Prettierの導入方法 フロントエンド開発で必須のコード整形ツール](https://ics.media/entry/17030/)』をご参照ください。

また、StylelintについてもICS MEDIAで取り扱っていますので、興味のある方は記事『[CSSのコード品質向上のためのStylelint入門](https://ics.media/entry/230525/)』をご覧ください。

一方で独立したツールを組み合わせているため、Prettier/ESLintでルールが競合したり、大規模なプロジェクトで実行速度がボトルネックになってしまったり、といった課題も抱えています。

Biomeでは設定ファイルが1つに統合され、フォーマットとリントで競合が起こらない設計になっています。また、実行速度が向上しているため、これらの課題を大きく改善できます。

#### Oxc(Oxfmt/Oxlint)

Biomeと同様に、Rustを採用した統合ツールチェーンとして注目されているのが[Oxc](https://oxc.rs/)です。Oxcにはリンターの[Oxlintオーエックスリント](https://oxc.rs/docs/guide/usage/linter.html)や、フォーマッターの[Oxfmtオーエックスフォーマット](https://oxc.rs/docs/guide/usage/formatter)などが含まれており、Prettier/ESLint互換を意識して作られています。設定はそれぞれ`.oxfmtrc.json`、`.oxlintrc.json`という別のJSONファイルに記述します。

特徴はその実行速度で、[公式ベンチマーク](https://oxc.rs/docs/guide/benchmarks)によると、Oxc公式の条件下ではJavaScript/TypeScriptファイルを対象としたフォーマットでBiomeに比べて3倍速く、Prettierに比べて35倍速く動作すると述べられています。

BiomeとOxcの思想的な違いとして、BiomeはPrettierやESLintの代替となる新しいツールチェーンを目指しており、Prettierの挙動であってもバグや問題がある場合は再現しないというスタンスをとっています。対してOxcは、PrettierやESLintとの完全な互換性を目指しています。

開発状況に関しては2026年1月現在で、Oxlintはv1.39.0に達しており、[Preact](https://preactjs.com/?lang=ja)や[date-fns](https://date-fns.org/)などの著名プロジェクトでも活用されています。一方でOxfmtに関してはまだアルファ版であり、実用時には注意が必要です。

### Biomeの注意点

高速に動作し、設定ファイルを1つのJSONにまとめられることが魅力のBiomeですが、いくつか注意点もあります。

1つ目に、Vue.jsやSvelte、Astroなどの**著名なライブラリ/フレームワークへの対応が限定的**である点です。[公式の言語サポート](https://biomejs.dev/internals/language-support/)を見てみると、Vue.js等への対応状況がExperimental（試験的）であり、YAMLやMarkdownなどのファイル形式への対応もまだ途中です。今後対応が進んでいくことと思いますが、これらのライブラリ/フレームワークやファイル形式を含むプロジェクトにBiomeを導入する際には注意が必要です。

2つ目に、**ESLintやStylelintを完全に互換してはいない点** です。ESLintはプラグインが充実し、豊富なルールを適用できますが、BiomeやOxlintは対応していないルールがあります。また、同じ内容のルールでもルール名がESLintとBiomeで違う場合もあります。対応ルールについては[公式のRules Resources](https://biomejs.dev/ja/linter/rules-sources/)をご覧ください。なお、StylelintのようなCSS設計のクラス名チェックには対応していない点も注意する必要があります。

また、`biome check`を使用した場合、デフォルトで`import`をまとめるので、こういった挙動を把握しておく必要もあります。

### まとめ

本記事では、PrettierやESLintを置き換えるツールチェーンの候補として注目されているBiomeを紹介しました。まだ既存ツールの機能を完全に代替するには至らない点もありますが、着実に実装は進んでおり、新規プロジェクトの有力な選択肢となりつつあります。

本記事では深く触れていませんが、Oxfmt/Oxlintも併せて今後の動向にも期待したいですね。