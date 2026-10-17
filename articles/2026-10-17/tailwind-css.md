---
title: "Tailwind CSS入門"
source: "https://ics.media/entry/261016/"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "oka"
---

ウェブでのUIスタイリングには、素のCSSや[CSS Modules](https://github.com/css-modules/css-modules)、[CSS-in-JS](https://ics.media/entry/250710/)、UIライブラリを使うなど、さまざまな選択肢があります。その中でも、[Tailwind CSS](https://www.npmjs.com/package/tailwindcss)は2010年代後半から徐々に普及してきたCSSフレームワークです。

2026年にはnpmの週間ダウンロード数が1億回を超えるなど、近年さらに利用が拡大しています。Tailwind CSSを使うと、コード上からデザイントークンを意識でき、デザインシステムの基盤としても活用できます。

本記事では、ギャラリーUIのデモを通して、Tailwind CSSの基本的な使い方を紹介します。レイアウト方法やバリアント機能、テーマ定義によってデザインの一貫性を保つ方法や、開発時に注意すべきポイントも解説します。

※この記事ではTailwind CSS v4系を前提にしています。

### Tailwind CSSとは

Tailwind CSSは、**ユーティリティファースト**を特徴とするCSSフレームワークです。独自のクラスを定義する代わりに、小さな役割をもつユーティリティクラスを組み合わせてUIをスタイリングします。

ユーティリティクラスとは、余白や色、文字サイズ、配置の指定など、小さなスタイルです。1つのクラスに1つ以上のCSSプロパティが対応しており、`class`属性に記載することで対応したスタイルが付与されます。

たとえば、以下のコードはボタンのスタイルの実装例です。

```
<button
  class="rounded-lg bg-blue-900 px-4 py-2 font-bold text-white"
  type="button"
>
  Button
</button>
```

![](https://ics.media/entry/261016/images/261016_tailwind_button.png)

同じスタイルをCSSで書くと、次のようになります。

```
.button {
  border-radius: 0.5rem; /* rounded-lg */
  background-color: oklch(37.9% 0.146 265.522); /* bg-blue-900 */
  padding-inline: 1rem; /* px-4 */
  padding-block: 0.5rem; /* py-2 */
  font-weight: 700; /* font-bold */
  color: #fff; /* text-white */
}
```

この例では、1つのユーティリティクラスが1つのCSSプロパティに対応していますが、複数まとめて指定するクラスもあります。たとえば、`transition`クラスを指定すると以下の3つのCSSプロパティにデフォルト値がまとめて設定されます。

-   `transition-property`：color、opacity、transform、displayなど多数
-   `transition-timing-function`：cubic-bezier(0.4, 0, 0.2, 1)
-   `transition-duration`：150ms

### Tailwind CSSの特徴

Tailwind CSSの利点は、**スタイル上の制約を設け、コンポーネント実装に集中できること**です。

ユーティリティクラスを使うと、余白や色、文字サイズなどTailwind CSSのもつデザイントークンでスタイリングでき、UIに一貫性をもたせやすいです。また、テーマ定義を活用するとプロジェクト独自のスタイルが管理しやすくなります。加えて、UIをスタイリングするたびに`.basic-button`や`.button-wrapper`といったクラス名を考える手間も減りますし、クラス名が重複して意図しないスタイルになる心配もありません。

スタイルを`class`属性に記述するため、CSSファイルを行き来せずにスタイルを確認できる点も利点です。各コンポーネントに適用されているスタイルを追いやすく、共通化すべき箇所にも気づきやすいです。これらはAIを活用した開発でも大きな利点となるでしょう。

一方で、運用には**CSSとTailwind CSS両方の理解が必要**になります。開発者に求められる前提知識は多くなってしまう点には注意が必要です。また、テーマ定義などスタイルを縛るルールを決めなければ、**どんなスタイルでも使用可能になってしまう**ため、煩雑なスタイリングを減らす工夫も必要です。

### ギャラリーUIの実装デモ

ここからは、Tailwind CSSと[React](https://react.dev/)で実装したギャラリーUIを題材に、スタイリングの重要なポイントを取り上げます。近年のアワード系サイトでよく見られるギャラリーUIを実装しました。画像タイトルにポインターを重ねると、表示画像が追従して切り替わります。デモはデスクトップでご覧ください。

Reactと[Vite](https://vite.dev/)を使用していますが、導入方法は記事『[Vite入門](https://ics.media/entry/210708/)』で解説していますので、あわせてご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261016_tailwindcss_intro/)
-   [コードを確認する](https://github.com/ics-creative/261016_tailwindcss_intro/tree/main/src)

#### レイアウト

デモUIはギャラリータイトル（`GalleryTitle`）と画像プレビュー（`GalleryPreview`）で構成されます。`flex`を使い、`GalleryTitle`を縦に並べたエリアと、`GalleryPreview`を横並びにします。`flex`はCSSの`display: flex`に相当します。

![](https://ics.media/entry/261016/images/261016_tailwind_gallery.png)

Tailwind CSSの余白に関するクラスはデフォルトで`0.25rem`を基準に計算されます。たとえば`py-10`では、上下それぞれに`0.25rem × 10 = 2.5rem`のパディングが指定されます。このようなクラス名を眺めると、対応しているCSSプロパティのイメージがついてくるのではないでしょうか。

```
/* src/components/Gallery.tsx */
  <div className="... flex ...">
    <ol className="... py-10 ...">
     {galleryItems.map((item, index) => (
        <GalleryTitle ... />
      ))}
    </ol>
    ...
    <GalleryPreview ... />
    ...
  </div>
```

#### レスポンシブ対応

Tailwind CSSには、ブレークポイントや疑似クラスなどの条件に応じてスタイルを指定する機能があります。この機能を**バリアント**といい、ユーティリティクラスの前に条件と`:`をつけて使います。`sm:`は画面幅が40rem（640px）以上の場合にスタイルを適用するブレークポイント用のバリアントです。

デスクトップ表示では、`sm:w-3/5`でタイトル幅を60%に設定し、`sm:block`で画像プレビューを表示します。一方、モバイル表示では、`w-full`でタイトル幅を100%に広げ、`hidden`で画像プレビューを非表示にしています。

```
/* src/components/Gallery.tsx */
...
  <ol className="w-full ... sm:w-3/5">
    ...
    <GalleryTitle ... />
    ...
  </ol>
  ...
  <div className="hidden sm:block">
    <GalleryPreview ... />
  </div>
...
```

#### 疑似クラス

バリアントを使うと疑似クラスも利用できます。画像タイトル色はグレーですが、`hover:`バリアントを使い、ホバー時のみ`hover:text-foreground`で黒くしています。`text-muted`と`text-foreground`は、後述するテーマ定義で用意した、グレーと黒の文字色を指定する独自のクラスです。

```
/* src/components/GalleryTitle.tsx */
<div className="... text-muted ... hover:text-foreground ...">
  ...
</div>
```

#### 画像位置の表示

画像の表示位置をタイトルに追従させる処理は、CSSアンカーポジショニングを使っています。デモで使用しているTailwind CSS v4.3.3には、対応するユーティリティクラスが用意されていないため、`@utility`ディレクティブを使って独自に定義しています。詳しくは記事『[CSSアンカーポジショニング入門](https://ics.media/entry/251215/)』をご覧ください。

デモでは、タイトルホバー時に`gallery-anchor`を付け替えて、アンカー対象のタイトルを切り替えています。画像プレビューの`gallery-preview-position`クラスで、画像中心にアンカーがくるようにしつつ、プレビューエリアからはみ出ないように`clamp()`で位置を制限しています。

```
/* src/index.css */
/* 独自に定義したユーティリティ */
@utility gallery-anchor {
  anchor-name: --gallery-active;
}

@utility gallery-preview-position {
  --gallery-preview-width: clamp(12rem, 25vw, 23rem);
  --gallery-preview-height: calc(var(--gallery-preview-width) * 5 / 4);
  position-anchor: --gallery-active;
  /*
    画像の中心をanchor位置に揃える。
    プレビューエリアの上端/下端からはみ出ない位置にclampで制限
  */
  top: clamp(
    calc(var(--spacing) * 10),
    calc(anchor(center) - var(--gallery-preview-height) / 2),
    calc(100% - var(--gallery-preview-height) - var(--spacing) * 10)
  );
}
```

任意のCSSプロパティをクラス上で指定する機能もありますが、イレギュラーな値を一箇所に切り出せるため、`@utility`を使って独自のクラスを定義する方法がオススメです。

Tailwind CSSのバージョンアップでユーティリティクラスが追加されることもあるため、定義したユーティリティを見直し、移行を検討するとよいでしょう。 実際に、Tailwind CSS v4では`starting:`バリアントが追加され、`@starting-style`を利用できるようになりました。

#### テーマ定義とArbitrary Values

Tailwind CSSには、`[]`を使って任意の値を指定できる **Arbitrary Valuesアービトラリー・バリューズ** という機能があります。デモでは`GalleryPreview`で`h-[var(--gallery-preview-height)]`というクラスを指定し、画像高さにCSS変数を指定しています。柔軟なスタイリングができる便利な機能ですが、多用するとデザインルールから外れた値が増え、UIの一貫性を保ちにくくなります。

スタイルのばらつきを防ぐには、**テーマを定義し、プロジェクトで使用する値を共通化する**ことが重要です。Tailwind CSSでは、`@theme`ディレクティブを使ってプロジェクト独自の色や文字サイズなどをテーマ変数として定義できます。テーマ変数の名前は、色なら`--color-`、文字サイズなら`--text-`ではじめます。たとえば、`--color-foreground`は`text-foreground`や`bg-foreground`で使え、`--text-gallery-title`は`text-gallery-title`で文字サイズを指定できます。

デモでは、背景色や文字色、罫線色、ギャラリーのタイトルサイズを次のように定義しています。

```
/* src/index.css */
/* プロジェクト用のテーマ定義 */
@theme {
  --color-canvas: #fff;
  --color-foreground: #0a0a0a;
  --color-muted: #a3a3a3;
  --color-border-subtle: rgb(10 10 10 / 15%);
  --text-gallery-title: clamp(1.25rem, 4vw, 3rem);
}
```

これにより、テーマに定義した変数から`bg-canvas`や`text-foreground`、`border-border-subtle`、`text-gallery-title`といったクラスを生成しています。

▼ テーマ定義をUIに反映する流れ ![](https://ics.media/entry/261016/images/261016_tailwind_theme.png)

テーマ変数をデザイントークンとして活用することで、色や文字サイズなどを一元管理でき、UI全体の統一感を保ちやすくなります。また、AIが生成したスタイルに対し、デザイントークンから逸脱した値に気づきやすくなります。

とはいえ、デザインを忠実に再現する場合など、Arbitrary Valuesを使ってイレギュラーな値を使用せざるをえないケースもあります。基本はテーマで定義した値を使い、例外的なスタイルは必要に応じてクラス化するなど、運用ルールを決めておくとよいでしょう。

### Tailwind CSSを使った実装での注意点

Tailwind CSSは便利ですが、注意すべき点もあります。

#### 動的なクラス名は検出されない

Tailwind CSSは、ソースコードを文字列として走査し、検出したクラス名に対応するCSSを生成します。そのため、**クラス名にJavaScript変数を含む場合、正しいクラス名として解釈されません**。

```
/* ❌ クラス名の一部にJS変数を使っている */
function Badge({ type, children }) {
  return <span className={`bg-${type}-500 text-white`}>{children}</span>;
}
```

このようなケースでは、用途ごとのクラス名をあらかじめ用意し、値に応じて切り替える運用がオススメです。

```
/* ⭕ クラス名をあらかじめ用意して切り替える */
const badgeClasses = {
  info: "bg-cyan-500",
  warning: "bg-rose-500",
};

function Badge({ type, children }) {
  return <span className={`${badgeClasses[type]} text-white`}>{children}</span>;
}
```

#### クラス名の誤字は実行時にエラーとして検出されない

Tailwind CSSのクラス名は文字列のため、**誤字があってもJavaScriptの実行時エラーにはなりません**。たとえば、`flex`で配置した子要素を縦並びにしたい場合、`flex-col`とすべきところを`flex-column`と誤って記述しても、存在しないクラス名なので対応するCSSは生成されません。

対策として、リンターで存在しないクラス名を検出する方法があります。たとえば[ESLint](https://eslint.org/)用のプラグインである[`eslint-plugin-tailwindcss`](https://www.npmjs.com/package/eslint-plugin-tailwindcss)の`tailwindcss/no-custom-classname`ルールを使うと検出できます。ESLintについては記事『[ESLintのルールの選び方と実行タイミング](https://ics.media/entry/260410/)』で詳しく解説しています。

#### ユーティリティクラスが競合するとスタイルが崩れる

同じCSSプロパティを指定するクラスが重なると、意図しない見た目になることがあります。どちらが適用されるかは`className`内の記述順ではなく、**生成されたCSS内での定義順によって決まります**。そのため、後から適用したいクラスを`className`の末尾へ移動するだけでは、意図した結果にならないことがあります。

ユーティリティクラスの競合を整理するには、[`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge)などのライブラリを利用できます。競合するクラスを判定し、クラス名の一覧から不要なものを取り除きます。

### まとめ

本記事では、ギャラリーUIを題材に、Tailwind CSSを使ったレイアウトやバリアント、テーマ定義について紹介しました。注意点はいくつかありますが、テーマを定義して色や文字サイズなどを共通化することで、UIの一貫性を保ちやすくなります。

私見ですがユーティリティクラスを使ってスタイリングすると、このコンポーネントのもつスタイルはこれでよいのか？　と実装を見直し、コンポーネント設計について改めて考えるきっかけになります。ぜひTailwind CSSに触れて、ユーティリティファーストなスタイリングを体感してみましょう！