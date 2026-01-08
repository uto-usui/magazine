---
title: "Prettierの導入方法 - フロントエンド開発で必須のコード整形ツール"
source: "https://ics.media/entry/17030/"
publishedDate: "2018-01-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

[Prettier](https://prettier.io/)とは、Node.js上で動作するコードフォーマッターです。本記事ではPrettierの利点と使い方を紹介します。

### コードフォーマッターの必要性

複数人で開発を行っている場合、各々が自由にコードを書いてしまうと、さまざまな書き方が混在し統一性のない読みづらいコードとなってしまいます。統一されていないコードは、可読性が低くメンテナンス性が悪くなり、ミスが発生する原因となることもあります。

コードフォーマッターを利用すると、自動的に決められたコードスタイルに整形してくれるため、**開発者はコードスタイルを意識することなくコーディングに集中でき、可読性の高いコードを作成できます。**

### Prettierを導入する利点

コードフォーマッターは、WebStormやVisual Studio Codeなどのウェブ制作のエディターにも付属していますが、これらはユーザー環境に依存します。つまり、開発者によりエディターが違うとコードフォーマットを統一することは難しい場合があります。PrettierはNode.js上で動作するため、**ユーザー環境に依存することなく、プロジェクト単位でコードフォーマットを統一できます。**

Prettierは、JavaScriptだけでなくウェブのさまざまな言語にも対応しています。

-   [TypeScript](https://www.typescriptlang.org/), [JSX](https://facebook.github.io/jsx/)
-   CSS, [Less](https://lesscss.org/), [SCSS](https://sass-lang.com/)
-   [JSON](https://www.json.org/json-en.html), [GraphQL](https://graphql.org/), [Markdown](https://commonmark.org/)

#### Column: 新興のコードフォーマッター

コードフォーマッターのその他の選択肢として、「[Biome](https://biomejs.dev/)」や「[oxc](https://oxc.rs/)」があります。これらはフォーマッターとlint機能を一体化しており、Rust製のためJavaScript製のPrettierと比べて高速に動作します。特にBiomeは[公式ベンチマーク](https://github.com/biomejs/biome/tree/main/benchmark#formatting)によるとPrettierに比べ約25倍高速です。フォーマット結果やチェックルールに微妙な差異があるため、チーム内ではいずれかのツールに統一して使うことをおすすめします。

### コードフォーマッターの役割

コーディングスタイルを統一させるための手法として、以下の3つ方法があります。

-   [EditorConfig](https://editorconfig.org/)
-   リントツール（[ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/) など）
-   コードフォーマッター（Prettierなど）

EditorConfigは、エディターのインデントや文字コード、改行コードなどの基本的な設定を定義し、異なるエディター間でも共有できる手法です。

リントツールは、指定したルールに従ってコードが書かれているかチェックできるツールのひとつです。ルールから違反している場合に、警告やエラーを出します。たとえばESLintでは、潜在的なバグを生みやすいコードの検出ができるため、使用することでコード品質の向上につながります。`--fix`オプションを指定することで、自動的に修正可能なルールもあります。

コードフォーマッターは、定義したフォーマットに従い自動的にコードを整形してくれます。たとえば、Prettierではコード1行の長さを考慮して可読性が高くなるように変換してくれます。このように、使用することでコードの書き方に関する一貫性を担保することにつながります。

次のようなコードが記述されていた場合、Prettierでは可読性が高くなるようにそれぞれ改行をいれた形で整形します。

▼ 整形前

```
let   hoge  = func (
  parameter1,   parameter2, parameter3,    parameter4,
 parameter6,  parameter7,
       parameter8,
            );
```

▼ 整形後

```
let hoge = func(
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter6,
  parameter7,
  parameter8
);
```

リントツールとコードフォーマッターは、それぞれ役割を明確に分けて使用するとよいでしょう。詳しくは、Prettierの公式ドキュメントでも見解が述べられていますので、参考ください（ [Prettier vs. Linters](https://prettier.io/docs/en/comparison) ）。

### Prettierの導入手順

次の通り、Node.jsをインストールし、コマンドラインを使う準備をします。

1.  公式サイトから[Node.js](https://nodejs.org/en/download)をインストールします。
2.  コマンドラインを起動します  
    (macOSだと「ターミナル」、Windowsだと「コマンドプロンプト」)

次に、コンテンツのファイル一式が保存されるフォルダー（以下、プロジェクトフォルダーと呼びます）を任意の場所に作成し、コマンドラインでその場所に移動します。cdコマンドで任意のフォルダーまで移動しましょう。

▼ Windowsでの移動

```
cd C:¥Users¥MyName¥myproject
```

▼ macOSでの移動

```
cd /Users/MyName/myproject
```

Prettierを実行するために、次のコマンドでPrettier本体をインストールします。

```
npm i -D prettier
```

※`npm i`（省略せずに記述すると`npm install`）はインストールの命令、`-D`はインストール先を`devDependencies`にするための指定、`prettier`はインストールする対象です。

package.jsonファイルの`scripts`フィールドには、Prettierの実行コマンドを追加します。`--write`オプションを指定することで、整形した内容で上書き保存をしてくれます。

▼`package.json`ファイル

```
{
  "scripts": {
    "format": "prettier --write src"
  },
  "devDependencies": {
    "prettier": "^3.5.3"
  }
}
```

拡張子を制限したければ以下のように、`src`フォルダー配下の拡張子が`.js`のファイルが対象となるように指定します。Windowsでは対象のパスをシングルクオテーションで囲うとエラーになるので気をつけましょう。もし必要な場合はエスケープを行ったダブルクオーテーション（`/"`）で囲みます。

```
{
  "scripts": {
    "format": "prettier --write src/**/*.js"
  },
  "devDependencies": {
   "prettier": "^3.5.3"
  }
}
```

以上で準備は完了です。コマンドラインから次のコマンドを実行してみましょう。フォーマットが自動的に適用されることが確認できます。

```
npm run format
```

![](https://ics.media/entry/17030/images/180116_prettier_demo01.gif)

ここまでの手順をサンプルファイルとしてGitHubに公開していますので、参考ください。

-   [サンプルのソースファイル（sample-prettier）](https://github.com/ics-creative/180117_prettier/tree/master/sample-prettier)

#### 複数の拡張子を指定する方法

もし異なる拡張子を適用したければ以下のように記載します。HTMLやCSS、JavaScriptに対して指定するには以下のように記載するといいでしょう。

```
{
  "scripts": {
    "format": "prettier --write src/**/*.{html,css,js}"
  },
  "devDependencies": {
   "prettier": "^3.5.3"
  }
}
```

拡張子にこだわりがなければ、以下のようにフォルダー名の指定だけでも利用できます。以下の指定だと`src`フォルダー内のすべてのファイルが深い階層まで整形されます。

```
{
  "scripts": {
    "format": "prettier --write ./src"
  },
  "devDependencies": {
   "prettier": "^3.5.3"
  }
}
```

### ESLintと連携してフォーマットを適用する

前述の通り、Prettierはリントツールと組み合わせて使用できるため、すでにESLintを使用しているプロジェクトでもコンフリクトを起こすことなく使用できます。

ESLintとPrettierには異なるルールがあります（参照記事『[Prettier vs. Linters · Prettier](https://prettier.io/docs/en/comparison.html)』）。そのため、設定ファイル上でeslintのスタイルをオフにします。

今回はESLintの一例として、[neostandard](https://github.com/neostandard/neostandard)をベースにリントチェックを行ってみましょう。

コマンドラインより次のコマンドを実行しインストールを行います。

```
npm i -D eslint neostandard prettier
```

次に、ESLintの設定ファイルを作成します。プロジェクトのルートに、次の内容で`eslint.config.mjs`というファイルを作成してください。

▼`eslint.config.mjs`ファイル

```
import neostandard from "neostandard";

export default neostandard({
  noStyle: true,
  env: ["browser"],
});
```

ここでは、`neostandard`パッケージを使ってESLintの基本設定を生成しています。`noStyle: true`を指定することでESLint側のコードフォーマット機能を無効化し、`prettier`とのフォーマット競合を防いでいます。

package.jsonファイルに定義した`scripts`を、次の通りeslintとprettierを両方を使用したコマンドに変更します。eslint実行後に、prettierが実行するようにします。

▼package.jsonファイル

```
{
  "scripts": {
    "format": "eslint src --fix && prettier --write src"
  },
  "devDependencies": {
    "eslint": "^9.25.1",
    "neostandard": "^0.12.1",
    "prettier": "^3.2.5"
  }
}
```

以上で準備は完了です。コマンドラインから次のコマンドを実行してみましょう。Prettierで整形したコードがESLintに渡され、ESLint側の整形も適用されることが確認できます。

```
npm run format
```

ここまでの手順をサンプルファイルとしてGitHubに公開していますので、参考ください。

-   [サンプルのソースファイル（sample-prettier-eslint）](https://github.com/ics-creative/180117_prettier/tree/master/sample-prettier-eslint)

![](https://ics.media/entry/17030/images/180118_prettier_format.gif)

▲サンプルの実行例。ぐちゃぐちゃのJSをコード規約にあわせ整形している。

### おわりに

整形したコードが好みでない、コードフォーマッターのカスタマイズに時間をかけたくない、自分でコードを整形しているから必要ないといった意見も考えられます。しかし、コード整形ツールを使うとルールに基づいて自動的に整形されるため、**人が見落としがちなところも漏れなく整形できる**利点があります。

PrettierはNode.jsで動作するため、エディターに依存せず容易に導入できます。また、[公式ドキュメント](https://prettier.io/docs/en/precommit.html)にも記載されている通り、Gitへのコミット前に自動的に処理を走らせることもできるため、現行の開発フローへの影響もなく導入可能です。是非この機会にお試しください。

※本記事は2025年4月現在のPrettier 3.5.3、Eslint 9.25.1で検証しています