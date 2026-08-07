---
title: "Storybookとは？ UIコンポーネントを効率よく開発・確認するウェブのツール"
source: "https://ics.media/entry/260806/"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

Reactなどで作るコンポーネントは、渡すデータによって見た目が変わります。たとえば次のようなパターンは、普段の開発用データでは確認できないことがあります。

-   一覧が0件のとき
-   スクロールが必要なほど件数が多いとき
-   カードなどで文言が極端に長いとき

画面遷移やデータの準備をしてから各パターンを見に行く手間もかかります。

こうした状態を、アプリ全体を動かさずに確認するために使うのが[Storybookストーリーブック](https://storybook.js.org/)です。コンポーネントだけをブラウザー上に並べ、状態ごとの見た目を切り替えながら確認できます。**表示した画面のURLを共有すれば、デザイナーやディレクターにも見てもらいやすく**、コーディングエージェントに実装を頼むときにも期待する見た目を伝えやすくなります。

Storybookがあると、**プロジェクト内にどんな共通コンポーネントがあるか、どう使うかをいち早く把握できます**。また、コンポーネント単位のテストや見た目の差分検出にも使えます。個人的には規模の大きなアプリの開発では、Storybookなしで進めることはもう考えられないと感じています。

StorybookはReactやVue.jsなど、複数のフレームワークで使えます。本稿ではReactとTypeScriptで解説します。

▼ Storybookの画面例

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260806_storybook/storybook/)
-   [コードを確認する](https://github.com/ics-creative/260806_storybook/tree/main/demos/notice-list)

### 題材：お知らせ一覧

日付とタイトルが並ぶお知らせ一覧を例に進めます。まずはアプリとして動かしたときの見た目です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260806_storybook/app/)
-   [コードを確認する](https://github.com/ics-creative/260806_storybook/tree/main/demos/notice-list)

### Storybookを導入する

Storybookは、既存のフロントエンドプロジェクトに追加して使います。導入手順の紹介のため、Viteヴィート + React + TypeScriptのプロジェクトを作ります。

※本稿は2026年8月時点のStorybook 10.5、Vite 8.1、Node.js 24をもとに解説します。

```
npm create vite@latest
```

プロジェクト名のあと、フレームワークとプロジェクトの構成を聞かれます。今回は`React`と`TypeScript`を選びました。作成後はプロジェクトのフォルダーへ移動し、依存パッケージをインストールします。

```
cd プロジェクト名
npm install
```

Viteの環境構築の詳細は記事『[Vite入門](https://ics.media/entry/210708/)』を参照してください。

作成したプロジェクトにStorybookを追加します。次のコマンドを実行するとプロジェクト構成を自動で検出し、設定が入ります。

```
npm create storybook@latest
```

実行すると質問が表示されます。

-   **New to Storybook?**：「Yes」を選ぶと、画面上の案内ツアーが始まり、学習用のサンプルファイルも追加されます
-   **What configuration should we install?**：「Recommended」ならドキュメント、アクセシビリティー、テストの機能が入ります。「Minimal」ならコンポーネント開発に必要なもののみが入ります
-   **Would you like to install AI features (MCP addon and prompt suggestions)?**：コーディングエージェント向けのMCPアドオンと、プロンプトの提案を入れるかどうかです

※導入時の質問内容は、バージョンによって変わることがあります。

質問への回答が終わると、`package.json`に次の2つのコマンドが追加されます。`storybook dev`が開発用の起動、`storybook build`が静的ファイルの書き出しです。

▼ package.json

```
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

あわせて、Storybook本体とアドオンが`devDependencies`に追加されます。

Storybookでは、コンポーネントの状態ごとの見た目を**Story**と呼び、`.stories.tsx`などのファイルにまとめます。設定ファイルの`.storybook/main.ts`には、こうしたStoryファイルの探索場所と、有効にしたアドオンが書き込まれます。

▼ .storybook/main.ts

```
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
};

export default config;
```

さらに`src/stories`には、ボタンやヘッダーなどのサンプルが書き出されます。サンプルで画面の見方を確かめたあとは、削除して問題ありません。

追加されたコマンドでStorybookを起動します。ブラウザーが開き、サンプルのStoryが一覧できます。

```
npm run storybook
```

▼ Storybook起動直後の画面 ![](https://ics.media/entry/260806/images/260806_storybook_launch.png)

1.  サイドバー：サンプルのコンポーネントとStoryが一覧できます
2.  キャンバス：選んだStoryのプレビューが表示されます
3.  下部のパネル：Controlsなどのアドオンが表示されます

他にもStorybookには、ユーザー操作をテストするための「Interactions」タブや、VRT（見た目の差分確認）のための「Visual tests」タブがあります。

### お知らせ一覧をStoryにする

お知らせ一覧を表示する`NoticeList`コンポーネントを用意します。Reactコンポーネント用の`components`フォルダーを作り、次のように配置します。

```
src/components/NoticeList/
  NoticeList.tsx
  NoticeList.css
```

受け取るPropsは次のとおりです。実装の全体は、リポジトリのコードを参照してください。

▼ [NoticeList.tsx](https://github.com/ics-creative/260806_storybook/blob/main/demos/notice-list/src/components/NoticeList/NoticeList.tsx)

```
export type Notice = {
  /** 管理用のID */
  id: string;
  /** 公開日 */
  publishedAt: string;
  /** タイトル */
  title: string;
};

export type NoticeListProps = {
  /** お知らせの一覧 */
  notices: Notice[];
  /** 読み込み中の表示に切り替える */
  isLoading?: boolean;
};

export function NoticeList({ notices, isLoading = false }: NoticeListProps) {
  // 日付とタイトルを並べて表示する（省略）
}
```

コンポーネントの状態は`Story`として登録します。たとえば、通常、非活性の2とおりの見た目があるボタンなら、2つのStoryを作成します。各Storyでは、コンポーネントへ渡すPropsの値を`args`に書きます。

ファイル名は`NoticeList.stories.tsx`のように`.stories.tsx`で終わる名前にします。`.storybook/main.ts`の`stories`に書かれたパターンと一致させると、Storyとして表示されます。`NoticeList.tsx`と同じフォルダーに、Storyファイルを置きます。

```
src/components/NoticeList/
  NoticeList.tsx
  NoticeList.css
  NoticeList.stories.tsx
```

▼ [NoticeList.stories.tsx](https://github.com/ics-creative/260806_storybook/blob/main/demos/notice-list/src/components/NoticeList/NoticeList.stories.tsx)

```
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NoticeList } from "./NoticeList";
import "./NoticeList.css";

// Storyの対象コンポーネントを指定する
const meta = {
  component: NoticeList,
} satisfies Meta<typeof NoticeList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 長さの違うタイトルを混ぜたサンプルデータ
const sampleNotices = [
  {
    id: "1",
    publishedAt: "2026-08-01",
    title: "夏季休業のお知らせ",
  },
  {
    id: "2",
    publishedAt: "2026-07-28",
    title: "ウェブサイトメンテナンスのお知らせ",
  },
  {
    id: "3",
    publishedAt: "2026-07-15",
    title:
      "システムメンテナンスに伴うサービス一時停止と再開予定時刻、および影響範囲とお客様へのお願いについてのお知らせ",
  },
];

// 基準となる表示
export const Default: Story = {
  args: {
    notices: sampleNotices,
  },
};

// 読み込み中の表示
export const Loading: Story = {
  args: {
    notices: [],
    isLoading: true,
  },
};

// 0件の表示
export const Empty: Story = {
  args: {
    notices: [],
  },
};

// 件数が多く、スクロールが発生する表示
export const Scroll: Story = {
  args: {
    notices: Array.from({ length: 40 }, (_, index) => ({
      id: String(index + 1),
      publishedAt: "2026-07-01",
      title: `お知らせ ${index + 1}`,
    })),
  },
};
```

登録したStoryは次の4つです。

-   ［Default］：標準的な見た目
-   ［Loading］：読み込み中
-   ［Empty］：0件
-   ［Scroll］：件数が多くスクロールが必要

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260806_storybook/storybook/?path=/story/components-noticelist--default)
-   [コードを確認する](https://github.com/ics-creative/260806_storybook/tree/main/demos/notice-list)

行を別コンポーネントに切り出してStoryを登録すると、パーツごとの見た目を確認できます。今回は小さなお知らせ一覧のため切り出さず、［Default］にタイトルの長短をわけて登録しました。複雑なパターンの場合は、コンポーネントをわけたほうが登録も楽になります。

### コラム：Storybookに載せるならプレゼンテーショナルコンポーネント

Storybookに載せるコンポーネントには、API通信や画面遷移といった業務ロジックを書かないほうが扱いやすいです。今回の`NoticeList`も、お知らせの配列と読み込み中かどうかをPropsで受け取り、渡された値を描画するだけにしています。

Propsで見た目に必要な値だけを受け取り、業務ロジックは持たないコンポーネントを、**プレゼンテーショナルコンポーネント**と呼ぶことがあります。

### どんなパターンを登録するか

今回用意したデモに限らず、ICSでStoryを作るときは以下に挙げた観点を重視してルール化しています。

-   **最小と最大**：文字の長短、件数の少〜多（スクロールが出る件数、上限表示など）。長いときは三点リーダーにするか折り返すかで、行の高さと隣の要素への影響が変わります
-   **空や0件**：空文字、空白、`null`や`undefined`、一覧が0件のとき
-   **読み込みなどの状態**：データ量ではなくフラグで見た目が変わるとき
-   **並び順**：コンポーネント内で日付や閲覧数などにもとづいて並び替えるとき。先頭、末尾、同値の並びが意図どおりかを、固定データで確認できるようにします
-   **文字種の違い**：半角英字、全角英数、和文では、同じ文字数でもラベルの幅が変わります

最小と最大、空や0件、並び順は、ユニットテストで境界値や空値を確かめるときと同じ観点です（記事『[JavaScriptのユニットテストを始めよう](https://ics.media/entry/240820/)』を参照してください）。ここに、読み込み中の見た目や文字種の違いのように、描画してはじめて確認できる観点が加わります。

**これらの観点を意識しておくと、デザインで想定していない表示パターンに早めに気づけます**。すべてを一度に揃える必要はなく、共通ボタンのようにバリエーションの多いものや、エラー表示のように普段の操作では確認しにくいものから、Storyを足していくとよいでしょう。

次のStorybookは、上記の観点をStoryにした例です。サイドバーから他のコンポーネントのStoryも見られます。

#### 記事ランキング

閲覧数順に記事を並べるランキングです。各行に順位、タイトル、閲覧数を出し、上位3件は順位をメダル色で強調します。

タイトルは1行に収めて三点リーダーで省略します。［Japanese］と［English］を切り替えると、省略の始まる位置が変わります。［Japanese］では、メダル色が付く3位と付かない4位も見られます。閲覧数が同じときの順位は［TiedRanks］、タイトルが空文字の行は［EmptyTitle］、0件は［Empty］です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260806_storybook/storybook-patterns/?path=/story/components-articleranking--japanese)
-   [コードを確認する](https://github.com/ics-creative/260806_storybook/tree/main/demos/patterns/src/components/ArticleRanking)

#### サイドメニュー

メニューや表の見出しのように幅の余裕がない場所では、日本語で1行に収まっていた項目が英語にすると2行になり、高さがずれます。このデモも、日本語のラベルなら5項目とも1行に収まりますが、英語にすると2項目が2行になります。［Japanese］と［English］を切り替えて見比べてみてください。

件数バッジが付く［JapaneseWithBadge］と［EnglishWithBadge］では、バッジがラベル側の幅を奪います。バッジ側には上限を設け、100件以上では`99+`と表示します。

折り返しの指定そのものは、記事『[文章の折り返し指定のCSS最新版](https://ics.media/entry/240411/)』と『[CSSで文節の折り返しを！ br・wbrとauto-phraseの活用術](https://ics.media/entry/241105/)』を参照してください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260806_storybook/storybook-patterns/?path=/story/components-sidemenu--japanese)
-   [コードを確認する](https://github.com/ics-creative/260806_storybook/tree/main/demos/patterns/src/components/SideMenu)

### Controlsで一時的に確認する

Storybookの画面下部（またはサイド）にあるControlsパネルでは、`args`の値をその場で変えて見た目を確認できます。

たとえば記事ランキングの［Japanese］を開いた状態で、Controlsから`articles`の件数を増やしたり、タイトル文字列を書き換えたりできます。空文字にしたときの表示や、閲覧数を変えたときの並びを、ファイルを直接編集せずに確認できます。

Controlsには各Propsの入力欄が並ぶので、コードを触る前の調整に向いています。数値をスライダーで動かしたいときなど、入力欄の種類を変えたい場合は、Storyのmetaの`argTypes`で指定できます。

使い分けの目安は次のとおりです。

-   **Story**：あとから見返したい状態。名前を付けて作成しておくと、デザインを変更したときの確認にも使えます
-   **Controls**：その場かぎりの確認。試した値を残したくなったら、Storyにします

▼ Controlsのイメージ ![](https://ics.media/entry/260806/images/260806_storybook_controls.png)

1.  ［Controls］タブ
2.  Controlsの編集エリア：`args`の値をその場で書き換えられます
3.  ［Update story］ボタン：編集した値を、開いているStoryへ上書きします
4.  ［Create new story］ボタン：Storyの名前を入力して、編集した値を同じStoryファイルへ別のStoryとして追加します
5.  ［Reset］ボタン：編集した値を元に戻します
6.  ［Edit ○○ as JSON］：Propsの表示を、フォーム表示とJSON編集で切り替えます（○○にはProps名が入ります）

［Update story］［Create new story］［Reset］ボタンは、`npm run storybook`でローカル起動したときのみ、Controlsで値を変えたあとに表示されます。`build-storybook`で書き出した静的なStorybookの場合は表示されません。

静的なStorybookをControlsで書き換えた場合は、Controls右側の［Edit ○○ as JSON］でJSON編集に切り替えて値をコピーし、Storyファイルへ貼り付けます。

### コラム：Storybookを広げるアドオン

Storybookの使い道は見た目の確認だけではありません。アドオンを追加すると、登録したStoryをテストに使ったり、コーディングエージェントから参照したりできます。

※テスト関連のアドオンは、導入時に「Recommended」を選んでいれば入っています。MCPアドオンは、導入時のAI機能の質問で入れられます。

-   **コンポーネントテスト**（`@storybook/addon-vitest`）：各Storyがエラーなく描画できるかを、Vitestのテストとしてまとめて実行できます
-   **見た目の差分確認**（`@chromatic-com/storybook`）：Storyのスクリーンショットを変更の前後で比較し、意図しない見た目の変化を検出できます（見た目の差分をクラウドで比較するChromaticとのアカウント連携が必要です）
-   **アクセシビリティーチェック**（`@storybook/addon-a11y`）：表示中のStoryを検査し、コントラスト不足などの問題を画面下のパネルに一覧できます
-   **コーディングエージェント連携**（`@storybook/addon-mcp`）：StoryやコンポーネントのAPIを参照したり、Storyの作成やテストの実行を進めたりできます。本稿執筆時点ではReact向けです。くわしくは公式ブログの[Storybook MCP for React](https://storybook.js.org/blog/storybook-mcp-for-react/)を参照してください

アドオンが入っていない場合は、次のコマンドでパッケージのインストールと`.storybook/main.ts`への登録まで自動で行われます。プロジェクトに合ったアドオンを追加してみてください。

```
npx storybook add @storybook/addon-a11y
npx storybook add @storybook/addon-vitest
npx storybook add @chromatic-com/storybook
npx storybook add @storybook/addon-mcp
```

### まとめ

Storybookを導入してStoryを作成しておくと、スタイルを調整するときに、Storyを切り替えながら見た目を確かめられます。0件や読み込み中、極端な文言など、普段のデータでは見落としやすい状態をStoryにしておけば、あとからデザインが変わっても確認漏れを減らせます。

まずはカードやバッジなど、表示パターンの多いコンポーネントからStoryを作成してみてください。環境構築の復習は記事『[Vite入門](https://ics.media/entry/210708/)』、境界値の考え方は記事『[JavaScriptのユニットテストを始めよう](https://ics.media/entry/240820/)』も参考になります。