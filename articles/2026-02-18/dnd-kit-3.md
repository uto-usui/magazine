---
title: "dnd-kit を使う際に意識したい、アクセシビリティの 3 つの注意点"
source: "https://tech.smarthr.jp/entry/2026/02/17/183648"
publishedDate: "2026-02-17"
category: "design"
feedName: "SmartHR Tech Blog"
author: "tjmschk"
---

## はじめに

こんにちは。アクセシビリティエンジニアの [tajiman](https://x.com/schktjm) です。

先日、プロダクトエンジニアの morisy さんが「[React Hook Form と dnd-kit を使った並び替え可能なフォームの開発](https://tech.smarthr.jp/entry/2026/01/27/190742)」という実践的な記事を公開しました。

dnd-kit は高機能で自由度が高いライブラリですが、さらにアクセシビリティの観点を取り入れることで、より「誰もが使いやすい」状態へと進化させることができます。

本記事では、先日の記事で紹介された実装をベースに、アクセシビリティの品質を向上させるための 3 つのポイントを紹介します。

また、今回紹介する dnd-kit は以下のバージョンで動作確認をしました。

  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",

## 1\. スクリーンリーダー用読み上げ文章の日本語対応ができているか？

dnd-kit には、スクリーンリーダーユーザー向けに DnD の操作方法や状態の変化を音声で伝える機能が標準で備わっています。

-   **ドラッグ可能なアイテムにフォーカスした時**: キーボード操作方法の説明（[Instructions](https://dndkit.com/legacy/guides/accessibility#instructions)）
-   **操作を実行した時**: 「アイテムを持ち上げた」「〇番目に移動した」などの状況説明（[Screen reader announcements using live regions](https://dndkit.com/legacy/guides/accessibility#screen-reader-announcements-using-live-regions)）

しかし、**デフォルトのメッセージはすべて英語**です。日本語のスクリーンリーダー環境で突然英語が読み上げられると、ユーザーが混乱するだけでなく、せっかくの操作支援が十分に機能しません。

### 対策: `<DndContext>` でメッセージをカスタマイズする

`DndContext` の `accessibility` props を使用し、アプリケーションの言語（`lang="ja"`）に合わせた日本語メッセージを設定しましょう。

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: \`
    ドラッグ可能なアイテムを操作するにはスペースキーを押します。
    ドラッグ中は矢印キーで位置を移動し、もう一度スペースキーを押すとドロップします。
    Escキーを押すと操作をキャンセルできます。
  \`,
};

const announcements: Announcements = {
  onDragStart({ active }: DragStartEvent) {
    return \`アイテム ${active.id} を持ち上げました。\`;
  },
  onDragOver({ active, over }: DragOverEvent) {
    if (over) {
      return \`アイテム ${active.id} が ${over.id} の位置に移動しました。\`;
    }
    return \`アイテム ${active.id} がリスト外に移動しました。\`;
  },
  
};

DndContext accessibility\={{ announcements, screenReaderInstructions }}
  {}
DndContext

## 2\. ドラッグ操作以外の代替手段を提供できているか？

WCAG（Web Content Accessibility Guidelines）では、ドラッグのような「複雑なポインタジェスチャ」を要求する場合、**シングルポインタ（クリックやタップのみ）による代替操作**を提供することが求められます ([解説書 達成基準 2.5.7: ドラッグ動作 | WAI | W3C](https://waic.jp/translations/WCAG22/Understanding/dragging-movements))。

dnd-kit は標準でキーボード操作（Space + 矢印キー）をサポートしていますが、マウスやスイッチコントロールを利用しており、かつ「ドラッグ（押しながら動かす）」という操作が困難なユーザーにとっては、依然として高いハードルが残ります。

### 対策: メニュー形式やボタンによる操作 UI の提供

DnD 以外の操作方法として、以下のような UI を検討してください。

-   各アイテムに「上に移動」「下に移動」ボタンを設置する
-   三点リーダー（ケバブメニュー）の中に「移動」アクションを含める

ドラッグ機能はあくまで「直感的なショートカット」と位置づけ、**ボタン操作だけでもすべての機能を完結できる設計**が理想的です。

![上下ボタンをつけたドラッグ可能なアイテムリストのキャプチャ](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260217/20260217183648.png)

上下ボタンの例

dnd-kit では、`useSortable` や `useDraggable` から取得した `attributes` や `listeners` を要素に展開（`{...attributes}`）して使用します。

ここで注意が必要なのが、`attributes` には `role="button"` や `tabIndex={0}` が含まれている点です。 これらを展開した要素の中に、さらに「削除ボタン」や「移動ボタン」などのインタラクティブ要素を配置すると、`role="button"` の内部に `<button>` が存在しているなどインタラクティブ要素のネストになります。

ブラウザなどのユーザーエージェントでは `button` ロールの子孫要素すべてを表示用とみなすため、内部にインタラクティブ要素が存在すると動作が意図しないものとなる可能性があります。

[このブログを書くきっかけとなった記事](https://tech.smarthr.jp/entry/2026/01/27/190742)でも、ドラッグ対象の要素内に `<input>` が含まれていたため、暗黙的にインタラクティブ要素のネストが発生していました。

### 対策: 「ドラッグハンドル」パターンを利用する

アイテム全体をドラッグ対象にするのではなく、特定の「ハンドル（つまみ）」部分にのみ `attributes` と `listeners` を適用することで、構造の破綻を防げます。

import { useSortable } from '@dnd-kit/sortable';

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id: props.id });

  return (
    li ref\={setNodeRef}
      {}
      button type\="button" {...attributes} {...listeners} aria-label\="ドラッグして並び替え"
        ::
      button

      span{props.name}span

      {}
      button type\="button" onClick\={props.onMoveUp}上へbutton
      button type\="button" onClick\={props.onDelete}削除button
    li
  );
}

どうしても「アイテムのどこを掴んでもドラッグできるようにしたい」という場合は、イベントの委譲（Delegation）などの工夫が必要ですが、ここでは説明を省略します。

後に紹介するサンプルにて、ドラッグ対象をアイテム全体に設定した実装を用意したのでご覧ください。

## 実際にスクリーンリーダーで触ってみる

今回紹介した「日本語によるアナウンス」や「ハンドルを利用した実装」を実際に体験できるサンプルを用意しました。

[dnd-kit-sample.vercel.app](https://dnd-kit-sample.vercel.app/)

※ ソースコードは [schktjm/dnd-kit-sample](https://github.com/schktjm/dnd-kit-sample) から確認できます。

### チェックしてほしいポイント

ぜひ、 **VoiceOver** 等スクリーンリーダーにて、以下の操作を試してみてください。

-   **キーボード操作**: `VO` キーでアイテムの「ハンドル」にフォーカスし、`Space` キーで持ち上げ、矢印キー（`↑` `↓`）で移動した際の読み上げを聞いてみてください。
-   **日本語の案内**: デフォルトの英語ではなく、設定した日本語のインストラクションが流れることを確認してください。
-   **代替手段の利用**: ドラッグ操作を行わず、各アイテムの「上へ」「下へ」ボタンだけで並び替えが完結することを確認してください。

## まとめ

dnd-kit は非常に強力なライブラリですが、「そのまま使えば完璧」というわけではありません。アクセシビリティを確保するためには、開発者の意識的な制御が不可欠です。

1.  **読み上げメッセージを日本語化する**
2.  **ドラッグ以外の代替操作（ボタン等）を用意する**
3.  **HTML 構造と role の整合性を確認する**

SmartHR では dnd-kit の利用が増えているため、そのまま使うだけでアクセシブルな状態に近づけるよう、社内ライブラリでの設定ファイル提供なども検討中です。続報をお待ちください！

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

-   [アクセシビリティ関連募集職種](https://recruit.smarthr.co.jp/career/?category=accessibility)
-   [エンジニア採用ページ](https://hello-world.smarthr.co.jp/)

## 関連リンク

-   [dnd kit – a modern drag and drop toolkit for React](https://dndkit.com/)
-   [開発方針 | SmartHR ACCESSIBILITY（スマートHR アクセシビリティ）｜仕組みで解決できることを、やさしさで解決しない。](https://accessibility.smarthr.co.jp/development/)
-   [アクセシビリティ | SmartHR Design System](https://smarthr.design/accessibility/)