---
title: "Vite入門 - HTMLからTypeScript・React・Tailwind CSSまで"
source: "https://ics.media/entry/210708/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2021-07-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

Viteヴィート（フランス語で「速い」の意味）はフロントエンドのビルドツールです。 シンプルなウェブページの作成からReactやVue.jsなどのフレームワークを使ったアプリケーションの開発まで、さまざまな環境で利用できる汎用的で強力なツールです。2026年にリリースされたバージョン8では、パフォーマンスや開発体験がさらに向上しています。

ViteはNext.js・Nuxt・Astroのようなフレームワーク（メタフレームワーク）を使わずに静的サイトやReact・Vue.js等のSPAを開発するために使われます。位置付けとしては`webpack`のようなバンドラーと呼ばれるものに近い存在ですが、それだけではありません。

この記事では、Viteを導入して静的ウェブサイトからTypeScript・React・Tailwind CSS等を組み合わせたアプリケーションまで、快適な開発環境を手に入れる方法を紹介します。

### Viteの特徴と基本の仕組み

現代のウェブ開発では、HTMLやJavaScriptをすべて手書きしてページやアプリを作ることはほぼありません。 最終的に生成するJavaScriptやCSSファイルを統合・圧縮するバンドル機能はもちろん、開発中のリアルタイムプレビューやエラー検出など、品質と開発効率を向上させる機能の整備が欠かせません。

Viteはこのような開発とビルドの生産性を向上させるツールです。簡単に特徴を紹介しましょう。

#### ①開発時の最適化

Viteはモダンブラウザーが標準で備える`ES Modules`の仕組みを利用して高速に動作します。大きなプロジェクトでもおおむね数百ミリ秒で起動し、必要になったファイルだけをその都度変換することで、編集時もほぼリアルタイムでプレビューを更新できます。`node_modules`内のライブラリを自動的にバンドル・キャッシュする`Pre-bundling`の仕組みにより、2度目以降はさらに高速になります。

#### ②ビルドの最適化

ビルド時は本番環境に最適化されたファイル群が`dist/`ディレクトリーに生成されます。この処理を担うのがVite 8で正式に組み込まれた2つのRust製ツールです。

OxcオーエックスシーはTypeScriptやJSXをブラウザーが解釈できるJavaScriptへの変換（トランスパイル）を行います。Rolldownロールダウンは複数のファイルをまとめたり圧縮したりしてバンドルを生成します。Vite 7以前（`esbuild`と`rollup`）に比べて最大10〜30倍高速とされており、実際にICSの関わるプロジェクトでもビルド時間が70%以上短縮されました。

これ以外にもサポートブラウザーに合わせた構文変換や、CSSの変換、画像の最適化など、さまざまな機能がViteに組み込まれており、プラグインを使うことでプロジェクトや使用するライブラリに合わせた設定が可能です。

### 基本の使い方：HTML+JS のページを GitHub Pages に公開する

Viteの使い方はとても簡単です。まずはフレームワークを使わないプレーンなHTML + JavaScriptのウェブページをViteで作ってGitHub Pagesに公開してみましょう。

※ この記事では2026年4月時点の最新版であるバージョン8.0をベースに解説します。

#### プロジェクトの初期化

プロジェクトを作成するため、ターミナル（コマンドプロンプト）で、以下のコマンドを実行します。Viteを事前にインストールする必要はありません。

▼`npm`の場合

```
npm create vite@latest
```

▼`pnpm`の場合

```
pnpm create vite
```

▼`yarn`の場合

```
yarn create vite
```

実行するといくつか質問が表示されます。ここでは次の要領で一番シンプルなバニラJSを指定します。

```

◆  Project name: 
│  hello-vite  # ①プロジェクト名を入力
◆  Select a framework:
│  ● Vanilla  # ②フレームワークを選択（vanilla = フレームワークを使わない）
│  ○ Vue
│  ○ React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Ember
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others
◆  Select a variant:
│  ○ TypeScript
│  ● JavaScript # ③バリエーションを選択（TypeScriptは使わない）
◆  Install with npm and start now?
│  ● Yes / ○ No  # ④インストールと開発サーバー起動を行うかどうかを選択（どちらでもOK）
└
```

最後の質問で「Yes」を選択すると、モジュールのインストールと開発サーバーの起動が自動で行われます。

```
  VITE v8.0.3  ready in 359 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

「No」を選択した場合は以下の手順で開発サーバーを起動します。

```
cd hello-vite # ①作成したプロジェクトのフォルダーに移動
npm install   # ②モジュールインストールを実行（初回のみ）
 # ... インストール（出力は省略）
npm run dev   # ③開発サーバーを起動
```

表示されたURL（デフォルトは`http://localhost:5173/`）をブラウザーで開くとセットアップされたサンプルページが表示されるはずです。

#### コードの編集とプレビュー

作成したプロジェクトを`VS Code`等のIDE（エディター）で開いてみましょう。次のような構成になっているはずです。

-   `.html`、`.js`、`.css`
    -   ウェブページのコンテンツ
-   `package.json`、`package-lock.json`
    -   Vite等の利用モジュールの情報や、dev/build等のコマンドを設定しているファイル
-   `node_modules`
    -   Vite等のモジュールの本体を格納しているフォルダー
-   `dist`（ビルドを実行すると作成される）
    -   ビルド結果を確認するフォルダー
    -   このフォルダーをサーバーにデプロイ（アップロードする）

![ファイル構成](https://ics.media/entry/210708/images/210708_editor-vanilla.jpg)

開発サーバーを起動した状態で、HTMLやJavaScriptを編集・保存してブラウザーを見てみましょう。ここでは`index.html`に「Hello, Vite!」と表示し、`counter.js`の増分を1から2に変更してみます。

▼ `index.html`

```
  <body>
    <!-- ↓ htmlを追加 -->
    <h1>Hello, Vite!</h1>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
```

▼ `src/counter.js`

```
  // ↓ 増分を1から2に変更
  element.addEventListener("click", () => setCounter(counter + 2));
```

変更を保存するとブラウザーが自動で更新されます。「Hello, Vite!」と表示され、ボタンをクリックすると2ずつカウントアップされるはずです。

#### ビルドとプレビュー

ビルドするには`build`コマンドを実行します。ビルド結果は`dist`ディレクトリーに出力されます。

```
npm run build

# ↓ 出力例
> hello-vite@0.0.0 build
> vite build

vite v8.0.3 building client environment for production...
✓ 9 modules transformed.
computing gzip size...
dist/index.html                  0.48 kB │ gzip: 0.31 kB
dist/assets/vite-BF8QNONU.svg    8.70 kB │ gzip: 1.60 kB
dist/assets/hero-5sT3BiRD.png   44.91 kB
dist/assets/index-CsUDhMuy.css   4.10 kB │ gzip: 1.46 kB
dist/assets/index-DCs2knzP.js    4.07 kB │ gzip: 1.78 kB

✓ built in 49ms
```

ビルド結果は`preview`コマンドで確認できます。

```
npm run preview

# ↓ 出力例
> hello-vite@0.0.0 preview
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

表示されたURL（デフォルトは`http://localhost:4173/`）をブラウザーで開くとビルド結果が確認できます。`dev`コマンドで起動した開発サーバーと同じ内容が表示されれば成功です。

![プレビュー時の画面](https://ics.media/entry/210708/images/210708_vanilla-preview.jpg)

#### GitHub Pagesに公開する

ビルド結果をGitHub Pagesに公開するには少し設定が必要です。ビルド結果のHTMLを見ると、CSSやJavaScriptの読み込みが`/`から始まる絶対パス表記になっていることがわかります。

▼ ビルド結果 = `dist/index.html`

```
    <title>hello-vite</title>
    <script type="module" crossorigin src="/assets/index-DCs2knzP.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CsUDhMuy.css">
```

GitHub Pagesで公開できるページのURLは`https://<ユーザー名>.github.io/<リポジトリ名>`の形式なので、このままアップロードしてもCSSやJavaScriptが読み込めません。この問題を解決するために設定ファイル`vite.config.js`を作成します。また、GitHub Pagesの仕様に合わせてビルドの出力先を`docs`ディレクトリーに変更する設定も追加します。

**相対パスを`base`に指定する方法**

-   リポジトリ名に左右されない汎用的な指定です。
-   複数のHTMLファイルがある場合など、Viteのマルチページアプリの設定が必要になる場合があります。詳細は[マルチページ対応](#%E3%83%9E%E3%83%AB%E3%83%81%E3%83%9A%E3%83%BC%E3%82%B8%E5%AF%BE%E5%BF%9C)をご確認ください。

▼ `vite.config.js`

```
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // ✨ここを相対パスにする
  build: {
    outDir: "docs",
  },
});
```

**リポジトリ名を`base`に指定する方法**

-   公式サイトではこの方法が紹介されています。

▼ `vite.config.js`

```
import { defineConfig } from "vite";

export default defineConfig({
  base: "/<リポジトリ名>/", // ✨ここにリポジトリ名を指定
  build: {
    outDir: "docs",
  },
});
```

リポジトリ名を`base`に設定し、再度`npm run build`を実行します。`docs/index.html`を確認して`"/<リポジトリ名>/"`が追加されていれば成功です。

▼ ビルド結果 = `docs/index.html`

```
    <title>hello-vite</title>
    <script type="module" crossorigin src="/hello-vite/assets/index-DEMHKKq_.js"></script>
    <link rel="stylesheet" crossorigin href="/hello-vite/assets/index-CsUDhMuy.css">
```

最後に`docs/`を含むフォルダーをGitHubにプッシュします。 GitHub上でリポジトリの設定ページ（`https://github.com/<ユーザー名>/<リポジトリ名>/settings/pages`）にアクセスし、［Build and deployment］を以下のように設定します。

-   Source: `Deploy from a branch`
-   Branch: `main` `/docs`

［Save］をクリックして設定を保存します。これで`https://<ユーザー名>.github.io/<リポジトリ名>`で公開されたページが表示されるようになります。

![GitHub Pagesの設定](https://ics.media/entry/210708/images/210708_pages.jpg)

#### 発展：GitHub Actionsで自動的にビルドと公開を行う

変更を都度ビルドしてGitHub Pagesに公開するのは面倒です。通常はGitHub Actionsを使って自動的にビルドと公開を行うことが多いでしょう。 GitHub Actions自体はViteとは関係しませんが、[Viteのドキュメント](https://ja.vite.dev/guide/static-deploy#github-pages)に丁寧な解説があります。基本的にはコピペで動作しますので、何度も更新を行うサイトであれば設定しておくとよいでしょう。

※ GitHub Actionsでデプロイする場合は`vite.config.js`の`outDir`は変更不要です。削除またはデフォルト値の`"dist"`に戻しておいてください。

### アセット（画像やフォント等）の扱い

Viteで画像やフォントといった静的アセットを扱う方法は大きく次の2つです。

-   ① `public`ディレクトリーのアセットをHTMLから参照する
-   ② JavaScriptで`public`以外のディレクトリーから`import`する

#### `public`ディレクトリーのアセットをHTMLから参照する

`public`はViteの特別なディレクトリーで、ここに置かれたファイルは無条件でビルド先（`dist`ディレクトリーの直下）にコピーされます。 HTMLやCSSから利用する場合は`/`から始まる絶対パスとして指定します（`public/`は含めません）。

```
<!-- /public/img/に配置したimage.pngを表示 -->
<img src="/img/image.png">
```

この方法はシンプルですが、パスが間違っていてもエラーとして検知できず、キャッシュによる問題も発生しがちです（画像を更新したのに古い画像が表示される、等）。基本的には次の`public`以外のディレクトリーを使う方法を推奨します。

#### JavaScriptで`public`以外のディレクトリーから`import`する

`public`以外に入れたアセットはViteが自動的にチェックを行い、ビルド時に取りまとめを行います。アセットを置く場所は`public`以外ならどこでも構いませんが、慣例的には`src/assets/`ディレクトリーを使うことが多いでしょう。

```
<!-- /src/assets/に配置したimage.pngを表示 -->
<img src="./src/assets/image.png">
```

この方法で参照した画像はビルド時に1カ所（`dist/assets/`ディレクトリー）にまとめられてファイル名も変更されます。パスを間違ってファイルが存在しない場合はエラーになりますし、ファイルの内容が変わった場合はファイル名末尾の文字列（ハッシュ）も変更されるので、古いファイルを参照してしまうこともありません。

JavaScriptからアセットを参照する場合は、`import`文を使ってパスを指定します。

```
import imgOk from "./assets/img/ok.png";
import imgNg from "./assets/img/ng.png";

// 合格点ならok.pngを表示し、不合格ならng.pngを表示
const BORDER_SCORE = 80;
const showResult = (score) => {
  const img = new Image();
  img.src = score >= BORDER_SCORE ? imgOk : imgNg;
  document.body.appendChild(img);
}
```

HTMLやCSSの場合と異なり、パスを直接書いてもアセットとは認識されない点に注意しましょう。

```
img.src = "./assets/img/ok.png"; // これはNG
```

### マルチページ対応

ViteはSPA（Single Page Application）の開発に使うイメージが強いツールですが、もちろん複数ページのウェブサイトも作成できます。 トップページの他に`about.html`と`works/index.html`というページがある場合を考えてみましょう。

```
.
├── index.html
├── about.html
└── works
    └── index.html
```

実装は簡単です。複数のHTMLファイルを作成し、通常通りリンクを張るだけです（`href`は`/`から始まる絶対パスとして指定します）。

ただし、この状態だとdevサーバー（`npm run dev`）では動作しますが、ビルド後（`npm run preview`）は動作しません。正しくビルドするには以下のように`vite.config.js`を修正します。

```
import { resolve } from 'node:path';
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about.html"),
        works: resolve(import.meta.dirname, "works/index.html"),
      },
    },
  },
});
```

すべてのHTMLファイルを記載する必要がある点に注意しましょう。

### CSS

ViteではCSSも簡単に扱えます。HTMLから`<link>`タグを使って読み込むことはもちろん、JavaScriptから`import`文を使って読み込むこともできます。どちらの方法でもアセットとして読み込まれたCSSはビルド時に1カ所（`dist/assets/`ディレクトリー）にまとめられ、自動的にminify（圧縮）されます。

```
<!-- index.html -->
<link rel="stylesheet" href="./style.css">
```

```
import "./style.css";
```

この方法はシンプルですが、ページやアプリが大きくなるとCSSの管理が難しくなります。よく使われる解決策をいくつか紹介します。

#### CSS Modules

CSS ModuleはCSSをファイル単位に分割し、セレクターが重複しないよう命名を自動的に管理し、JavaScriptやReact等で利用できるようにする仕組みです。Viteは標準でCSS Moduleをサポートしています。

CSSファイルをCSS Moduleとして利用するには、ファイル名を`*.module.css`とするだけです。

▼ `style.module.css`

```
.ok {
  color: green;
}
.ng {
  color: red;
}
```

▼ `main.js`

```
import styles from "./style.module.css";

// 合格 or 不合格をスタイル付きで表示
const BORDER_SCORE = 80;
const showResult = (score) => {
  const result = document.createElement("p");
  const passed = score >= BORDER_SCORE;
  result.textContent = passed ? "合格" : "不合格";
  result.className = passed ? styles.ok : styles.ng;
  document.body.appendChild(result);
}
```

ビルドされたCSSを見ると、以下のようにクラス名が自動的に調整されていることがわかります。この仕組みにより、複数のモジュールで同じクラス名を使ってもスタイルがかぶることはありません。

▼ ビルドされたCSS

```
._ok_135r0_1{color:green}
._ng_135r0_4{color:red}
```

#### Sass

ViteではSassも簡単に扱えます。CSS本体の機能向上により登場シーンは減ってきていますが、既存プロジェクトの資産やノウハウを活用したい場合には依然として便利なツールです。Sassを使用する場合は`sass`または`sass-embedded`をインストールし、CSSファイルの拡張子を`.scss`とするだけです。

```
npm install -D sass
```

▼ style.scss

```
// p-1〜p-5のクラスを生成
@for $i from 1 through 5 {
  .p-#{$i} {
    padding: #{$i * 4}px;
  }
}
```

#### Tailwind CSS

近年のウェブ制作・アプリ開発ではTailwind CSSを使うことも多いでしょう。もちろんViteでもTailwind CSSを使えます。

Tailwind CSSを使用するには、`tailwindcss`と`@tailwindcss/vite`をインストールし、`vite.config.js`を修正します。

```
npm install tailwindcss @tailwindcss/vite
```

▼ vite.config.js

```
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

次にCSSファイルを作成してTailwind CSSを読み込みます。ファイルの場所や名前は自由です。

▼ src/style.css

```
@import "tailwindcss";

/* テーマ等のカスタマイズを行う場合はここに記述 */
```

※ Tailwind CSSは2025年1月にリリースされたv4から、原則として`tailwind.config.js`は不要になりました。テーマのカスタマイズ等の設定はCSSに直接記述できます。

最後にHTMLファイルからCSSファイルを読み込めば、Tailwindのユーティリティクラスが利用できるようになります。

▼ index.html

```
<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/src/style.css">
</head>
<body>
  <div class="bg-red-200">
    <h1 class="text-3xl">Hello, Tailwind CSS!</h1>
  </div>
</body>
</html>
```

### TypeScript

ここまでの例はすべてJavaScriptで説明してきましたが、実務においては、TypeScriptを使うことが多いでしょう。ViteでTypeScriptを使うには、`npm create vite@latest`でプロジェクトを作成する際に、TypeScriptを選択するだけです。

```
◆  Select a variant:
│  ● TypeScript # ②バリエーションを選択（TypeScriptを使用する）
│  ○ JavaScript
```

できあがる初期プロジェクトの構成はJavaScriptのプロジェクトとほぼ変わりません。TypeScriptの設定ファイルである`tsconfig.json`が作成され、スクリプトの拡張子が`.ts`に変更されています。設定ファイルも`vite.config.ts`にすることでTypeScriptで記述できます。

TypeScriptのプロジェクトでは`build`コマンドの実行時にエラーのチェックを実行します。VS CodeなどのTypeScriptに対応しているIDEやエディターであれば、編集画面のコードにもエラーが表示されます。

`tsconfig.json`にはデフォルトで一般的な設定が入っているので、特段の必要がなければそのまま利用できます。`target`や`lib`等でESのバージョンを調整したい場合は、注意事項がありますので[古いブラウザー・最新ブラウザーへの対応](#%E5%8F%A4%E3%81%84%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC%E6%9C%80%E6%96%B0%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC%E3%81%B8%E3%81%AE%E5%AF%BE%E5%BF%9C)を参照してください。

### React

Reactを使用する場合は、`npm create vite@latest`でプロジェクトを作成する際に、Reactを選択します。JavaScriptも選択可能ですが、特段の理由がなければTypeScriptを使うのがよいでしょう。

```
> npm create vite@latest
◇  Project name:
│  vite-react
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  ● TypeScript
│  ○ TypeScript + React Compiler
│  ...下略
```

Reactテンプレートでプロジェクトを作成すると、`vite.config.ts`にReactを使うためのプラグインを設定してくれます。

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

また、デフォルトで`lint`コマンド（`npm run lint`）が追加され、ESLintを使ったコードのチェックができるようになります。Lintについては後段の[Lint と Format](#lint-%E3%81%A8-format)も参照してください。

#### 補足：React Compilerを利用する

React Compilerは2025年10月にリリースされたReactの新機能で、従来手動で制御していたメモ化（`useCallback`や`useMemo`）を自動で行ってくれるものです。React Compilerを利用するには、`npm create vite@latest`でプロジェクトを作成する際に、React Compilerを選択します。

```
> npm create vite@latest
◇  Project name:
│  vite-react-compiler
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + React Compiler
```

既存のプロジェクトにReact Compilerを追加する場合は、以下のコマンドで関連パッケージをインストールし、`vite.config.ts`に設定を追加します。

```
npm install -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler
```

```
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
});
```

### Vue.js

Vue.jsを使用する場合は、`npm create vite@latest`でプロジェクトを作成する際に、Vueを選択します。

```
◇  Project name:
│  vite-vue
│
◇  Select a framework:
│  Vue
│
◆  Select a variant:
│  ● TypeScript
│  ○ JavaScript
│  ○ Official Vue Starter ↗
│  ○ Nuxt ↗ https://nuxt.com
│  ○ Vike ↗ https://vike.dev
```

基本的なセットアップだけであれば、TypeScriptを選択すれば十分ですが、複雑なアプリケーションを作る場合には他の選択肢でセットアップするのもよいでしょう。Vue.jsの場合はReactと比較して周辺ライブラリの選択肢もある程度固まっているので、ライブラリ選択で迷うケースも少ないはずです。

たとえば、`Official Vue Starter`を選択すると、Vue.js公式の`create-vue`を使用してルーターやストア等の周辺ライブラリを選択できます。`Replace Prettier with Oxfmt`を選択すると、次節で紹介するOxfmtも使用できます。

```
◆  Select features to include in your project: (↑/↓ to navigate, space to 
│  select, a to toggle all, enter to confirm)
│  ◻ JSX Support 
│  ◻ Router (SPA development) 
│  ◻ Pinia (state management) 
│  ◻ Vitest (unit testing) 
│  ◻ End-to-End Testing
│  ◻ Linter (error prevention)
│  ◻ Prettier (code formatting)
◆  Select experimental features to include in your project: (↑/↓ to navigate, 
│  space to select, a to toggle all, enter to confirm)
│  ◻ Replace Prettier with Oxfmt
│  ◻ Vue 3.6 (beta)
```

作成したプロジェクトをVS Code系のIDEで編集する場合、[Vue - Official（旧名：Volar）](https://marketplace.visualstudio.com/items?itemName=Vue.volar)拡張機能のインストールが必要です。

### Lint と Format

現代のウェブ開発ではコードの品質や統一性を保つためのLintやFormatは欠かせない存在です。Viteでは一部のテンプレートでESLintがセットアップされる他は、自分で設定を行う必要があります。AIによる大量のコード生成が当たり前になってきた今、高速で高品質なLintとFormatは生産性に直結します。ここでは従来のESLintとPrettierに代わる新しいツールとして[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)と[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)の導入方法を紹介します。

OxlintオーエックスリントとOxfmtオーエックスフォーマットは、Oxcのツールセットに含まれるリンターとフォーマッターです。どちらもRustを採用した高速なツールで、ESLint/Prettier互換を意識して作られています。

ここでは新しいプロジェクトにOxlintとOxfmtを導入する手順を紹介します。既存のプロジェクトで、すでに運用されているESLintとPrettierの設定がある場合はマイグレーションガイドを参照してください。

-   [Migrate from ESLint](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html)
-   [Migrate from Prettier](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier.html)

Reactのテンプレート等ですでにESLintが導入されている場合は、以下の手順で削除します。

```
# 注. インストール時の選択内容やテンプレートによって変わる可能性があります。
#     実際のプロジェクトの内容を確認して調整してください。

# プロジェクトルートのESLint設定ファイルを削除
rm eslint.config.js

# package.jsonからESLintの依存パッケージを削除
npm uninstall @eslint/js eslint eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint
```

OxlintとOxfmtをインストールします。

```
npm install -D oxlint oxfmt
```

package.jsonに`oxlint`と`oxfmt`のコマンドを追加します。以下のように`fix`コマンドで`oxlint --fix`と`oxfmt`をまとめて実行できるようにしておくと便利です。

```
"scripts": {
  "lint": "oxlint",
  "fix": "oxlint --fix && oxfmt"
}
```

VS Codeの場合は、[oxc.oxc-vscode](https://open-vsx.org/extension/oxc/oxc-vscode)拡張機能をインストールすると、リントエラーをリアルタイムに表示してくれます。

### 古いブラウザー・最新ブラウザーへの対応

Viteはデフォルトで主要なブラウザーで十分に動作するコードを生成しますが、時にはより古いブラウザーをサポートしたり、新しい言語機能を積極的に取り入れたりしたいケースもあるでしょう。ここでは利用できる言語機能や対応ブラウザーを自由に調整する方法を紹介します。

設定を変える前にViteのデフォルト設定を説明します。TypeScriptのプロジェクトの場合、`tsconfig.json`と`vite.config.ts`の2つのファイルが挙動に影響します。

▼ `tsconfig.json`のデフォルト設定

```
{
  "compilerOptions": {
    "target": "ES2023",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,

// ...下略
```

`tsconfig.json`では`lib`で型チェックするESのバージョンを調整できます。たとえば、ES2024で登場した`Object.groupBy`を使用する場合は、`lib`を`ES2024`に変更する必要があります。

もうひとつの`target`に関しては、通常の利用で設定を変える必要はありません。もともと`target`は`tsc`コマンドでTypeScriptをJavaScriptに変換する際に変換・出力するJavaScript(ECMAScript)のバージョンを指定するものですが、Viteの場合はビルドに`Oxc`を使うため、`tsconfig`の`target`は無視されます。

注意すべきは、`tsconfig.json`はあくまで型エラーのチェックにのみ影響し、ビルド結果には影響しない点です。ビルド結果に影響するのは`vite.config.ts`の`build.target`です。

▼ `vite.config.ts`のビルドターゲットのデフォルト設定

```
export default defineConfig({
  build: {
    target: "baseline-widely-available",
  },
});
```

`build.target`はビルド結果のJavaScriptのバージョンを指定するものです。デフォルトでは`baseline-widely-available`が設定されています。`baseline`は[ウェブの新機能はいつまで待てば実践投入できるか](https://ics.media/entry/250422/)でも紹介した互換性の指標で、`widely-available`は「すべての主要ブラウザーでサポートされてから30か月が経過した」ことを意味するものです。この値は（2026年4月時点では）2026年1月基準で`['chrome111', 'edge111', 'firefox114', 'safari16.4']`を指定するのと同じになります（今後Viteのバージョンが上がるとこの具体値も新しくなる可能性があります）。

通常はデフォルト設定の`baseline-widely-available`で十分なケースが多いですが、もしデフォルトよりも古いブラウザーをサポートしたい場合や、品質保証上動作下限のブラウザーを明示したい場合などは、この設定を変更することもできます。

たとえば`??=`（null合体代入演算子）を使用する以下のコードは、デフォルトではそのまま出力されますが、`??=`をサポートしていない`Safari 13`をtargetに指定すると、同等の挙動になる古いコードに変換されます。

▼ ビルド前のコード

```
let num: number | null = null;
num ??= 42;
console.log(num);
```

▼ ビルド後のコード

```
// デフォルト設定での出力。古いブラウザーではエラー
// （変数名が"e"に変わっているのはミニファイの影響）
var e=null;e??=42,console.log(e);

// Safari 13をtargetに指定した場合の出力
// 長さや性能はわずかに劣る可能性があるが、挙動は等価で古いブラウザーでも動作する
var e=null;e!=null||(e=42),console.log(e);
```

#### 注意：構文以外の新機能はpolyfillが必要

`??=`のような変換可能な構文については`build.target`を変更するだけで対応できますが、構文以外の新機能についてはpolyfillが必要です。たとえば、`Object.groupBy`は構文変換の範囲ではないのでPolyfillを読み込む必要があります。Polyfillを導入するには大きく`@vitejs/plugin-legacy`と`core-js`の2つの方法があります。

① `@vitejs/plugin-legacy`を使う方法

公式のプラグインを使用する方法です。`@vitejs/plugin-legacy`をインストールし、`vite.config.ts`に設定を追加します。もともとこのプラグインはESMに対応しないかなり古いブラウザーをサポートするためのものですが、以下のように設定することでモダンブラウザー向けの不足機能のみを提供するPolyfillを生成できます。

```
npm i -D @vitejs/plugin-legacy
```

```
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      modernTargets: ["safari >= 13", "chrome >= 80", "firefox >= 78"],
      modernPolyfills: true,
      renderLegacyChunks: false,
    }),
  ],
  // `build.target`はプラグインの設定をもとに自動設定されるため削除 
});
```

この設定でビルドすると`index-xxx.js`の他に`polyfills-xxx.js`というファイルが出力され、HTMLから自動的に読み込まれるようになります。

② `core-js`を使う方法

プラグインによる対応は簡単ですが、実際には必要のないPolyfillまで読み込んでしまう場合があります。先ほどの例の場合、実際に使っているのは`Object.groupBy`だけですが、内部的な依存関係でその他のコードも巻き込んだ結果、20KB近いファイルになってしまいます。

利用したい機能を自分で選定できる場合、`core-js`を使う方法が便利です。`npm install`で`core-js`を追加し、`main.ts`で必要なPolyfillを読み込みます。

```
npm install core-js
```

```
// 必要なものだけを読み込む
import "core-js/features/object/group-by";

// 以下のようにまとめて読み込むこともできるが、無駄が多くなるため注意
// import "core-js/stable";
```

`build.target`の設定やPolyfillの追加でサポート対象のブラウザーを広げることができますが、いずれの方法でもすべての新機能に対応できるわけではない点には注意しましょう。対応できない機能の誤使用を防ぎたい場合は`eslint-plugin-compat`を使ってチェックする方法も検討してください（2026年4月時点ではOxlintに同等の機能はありません）。

### まとめ

この記事ではViteの基本的な機能を紹介し、シンプルな静的ウェブページからReactやVue.jsのアプリケーションまで、さまざまなケースでの基本的な利用方法を紹介しました。

ICSでは2021年に初導入してから多くのプロジェクトでViteを日々利用しています。とくに最新のVite 8ではパフォーマンスの向上により開発がさらに効率的になりました。

Viteの公式ドキュメントは丁寧な日本語訳もあります。この記事を足がかりに公式ドキュメントも参照し、開発に役立てていただければ幸いです。

-   [Vite公式ドキュメント（日本語）](https://ja.vite.dev/guide/)