---
title: "これって同じじゃないんですか？ —— Redux で踏んだ shallowEqual と配列の落とし穴"
source: "https://tech.smarthr.jp/entry/2026/05/20/190738"
publishedDate: "2026-05-20"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。2025年に新卒 0 期生として SmartHR に入社したプロダクトエンジニアのかずえもんです。SmartHR の様々なプロダクトの中で、私は届出書類機能の開発チームに所属しています。

届出書類機能は SmartHR の中でも歴の長いプロダクトで、状態管理ライブラリには当時主流であった Redux が採用されています。入社するまで Redux を触ったことがなかった私が、Redux を通じて JavaScript の比較にまつわる落とし穴に遭遇した話をします。

## Redux とセレクター: state の基礎

Redux はアプリケーション全体の状態（state）を管理するためのライブラリです。state は唯一のグローバルなオブジェクトとして管理され、コンポーネント側から必要な値を取り出して利用します。

state から値を取り出す関数をセレクターと呼びます。React Redux が提供する `useSelector` フックにセレクターを渡すことで、コンポーネントは state の変化に応じて自動的に再レンダリングされます。

const selectUsername = (state: RootState) \=> state.user.name

const username = useSelector(selectUsername)

`useSelector` は、セレクターの返り値が前回と変化したときだけ再レンダリングを実行します。返り値の変化はデフォルトでは `===` で比較されます。ここで注意が必要なのは、セレクター関数の中で配列やオブジェクトを新規に作成して返す場合です。

例えば以下のようなセレクターの場合、state が変わっていなくても呼び出すたびに新しいオブジェクトが生成されるため、`===` で比較すると常に「変化あり」と判断されてしまい、`name` と `age` が変わっていなくても再レンダリングが発生してしまいます。

const selectUser = (state: RootState) \=> ({ name: state.user.name, age: state.user.age })

const { name, age } = useSelector(selectUser)

そこで利用できるのが、React Redux が提供する比較関数 `shallowEqual` です。`useSelector` の第2引数に `shallowEqual` を渡すことで、オブジェクト全体の参照ではなく各プロパティの値を個別に `===` で比較するようになります。すなわち `name` か `age` の値が変わっていなければ再レンダリングは実行されません。

const selectUser = (state: RootState) \=> ({ name: state.user.name, age: state.user.age })

const { name, age } = useSelector(selectUser, shallowEqual)

常に `shallowEqual` を使いたい場合は、React Redux の[公式ドキュメント](https://react-redux.js.org/api/hooks#recipe-useshallowequalselector)でも紹介されている `useShallowEqualSelector` というカスタムフックを作成しておくと便利です。

import { useSelector, shallowEqual } from 'react-redux'

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}

プロダクト内でもこのカスタムフックを利用しており、次のような書き方で複数の値をまとめて取り出していました。

const { docIds, status } = useShallowEqualSelector((state: RootState) \=> ({
  docIds: getActiveDocIds(state.docGroup, state.doc.currentDoc?.docMasterRevisionId),
  status: getDocGroupStatus(state.docGroup),
}))

## Redux の warning が教えてくれた

書類の詳細画面に関するレビューをしていたある日、ブラウザの開発者コンソールを眺めていたら warning が出ていることに気がつきました。

Selector unknown returned a different result when called with the same parameters.
This can lead to unnecessary re-renders.

「同じインプットに対して、セレクターが異なる結果を返している」という内容です。「`shallowEqual` を使っているのになぜ？」と疑問に思い、調査を開始しました。

鍵は `shallowEqual` 関数の比較ロジックにありました。 `shallowEqual` が渡された配列やオブジェクトを比較するとき、それぞれのプロパティの値は `===` で比較されます。次の表は、 `shallowEqual` に対して空の配列、同じ値の入った配列、配列が入ったオブジェクトを渡したときの比較結果をまとめたものです。

式

`shallowEqual` の結果

`shallowEqual([], [])`

`true`

`shallowEqual([1], [1])`

`true`

`shallowEqual({ ary: [] }, { ary: [] })`

`false`

`[]` や `[1]` 同士を `shallowEqual` で比較すると `true` になります。前述の通り `shallowEqual` は渡された配列・オブジェクトをプロパティごとに見て `===` で比較するためです。つまり `shallowEqual([1], [1])` では `1 === 1` が比較されていることになります。

しかし `{ ary: [] }` のようにオブジェクトのプロパティが配列の場合は `false` になります。プロパティ `ary` の値を `===` で比較するとき、それぞれの `[]` は別のインスタンスであるため参照が異なると判断されるためです。

`useShallowEqualSelector` でオブジェクトにまとめて複数の値を取り出す手法ではまさにこれが落とし穴になります。問題になっていた `getActiveDocIds` の実装を見てみましょう。

export const getActiveDocIds = (state: DocGroupState, docMasterRevisionId: string | undefined) \=> {
  const docsPerdoc = state.current.docGroup?.docsPerDoc.find((doc) \=> doc.docMasterRevisionId === docMasterRevisionId)
  return docsPerdoc?.docIds || \[\]
}

`find` の結果が存在しない場合に `[]` を返しています。このリテラル `[]` は呼び出すたびに新しい配列インスタンスを生成します。つまり、各値を取り出すセレクター関数の中にこのような呼び出すたびに新しい配列を生成するものが含まれていると、そのプロパティは常に `===` で `false` と判断されてしまい、`shallowEqual` を使っていても `docIds` プロパティは常に「変化あり」と判断されて再レンダリングが走り続けていたのです。

## createSelector でセレクターをメモ化する

呼び出すたびに新しい配列を生成してしまう場合、Reselect が提供する `createSelector` の出番です。`createSelector` は計算をメモ化するための関数で、インプットが変わっていなければ再計算をスキップし、前回と同じ参照を返し続けます。`createSelector` は Redux Toolkit 経由でも利用できます。

基本は `useSelector` に渡す関数そのものに使われることが多いですが、今回のようにオブジェクトにまとめて複数の値を取り出す手法における個別の関数に対しても適用できます。`getActiveDocIds` をメモ化することで、インプットが変わらない限り同じ配列の参照を返し続けるようになり、再レンダリングを防げます。

import { createSelector } from '@reduxjs/toolkit'

export const getActiveDocIds = createSelector(
  \[
    (state: DocGroupState) \=> state.current.docGroup?.docsPerDoc,
    (\_: DocGroupState, docMasterRevisionId: string | undefined) \=> docMasterRevisionId,
  \],
  (docsPerDoc, docMasterRevisionId) \=> {
    if (!docsPerDoc || !docMasterRevisionId) return \[\]
    const docsPerdoc = docsPerDoc.find((doc) \=> doc.docMasterRevisionId === docMasterRevisionId)
    return docsPerdoc?.docIds || \[\]
  },
)

第1引数の配列に渡した入力セレクター（`state.current.docGroup?.docsPerDoc` と `docMasterRevisionId`）の返り値をそれぞれ `===` で比較し、どちらも変化していなければ2番目の引数に渡した計算関数がスキップされ、前回と同じ配列の参照が返ります。

これにより、複数の値をオブジェクトで取得する構成のまま不要な再レンダリングを抑制し、初回の画面表示に必要なレンダリング回数を半減させることができました。

なお、Redux 公式スタイルガイドでは、複数の値を一度にまとめて取得する形式は再レンダリングを生み出しやすいため [`useSelector` を複数回呼び出すことを推奨](https://redux.js.org/style-guide/#call-useselector-multiple-times-in-function-components) しています。今回修正した `getActiveDocIds` は、オブジェクトにまとめずに直接 `useShallowEqualSelector` から呼ばれているだけであれば、再レンダリングは発生しません。

const docIds = useShallowEqualSelector((state: RootState) \=> getActiveDocIds(state.docGroup, state.doc.currentDoc?.docMasterRevisionId))

一方で、利用する値が何十個にも及ぶ場合に一つ一つ `useSelector` を使うのは冗長であることも Redux 公式スタイルガイドでは触れられています。複数の `useSelector` を使うときと1つにまとめるときのバランスを意識することが大切です。

## 再レンダリングが減ったことで顕在化したバグ

これにてめでたしめでたし……と思ったら、新たな問題が表面化しました。

書類の詳細画面において、画面の高さいっぱいに要素を広げるために、`ref` を使ってコンテナの高さを JavaScript で計算するロジックがあったのですが、それが動かなくなったのです。このロジックはレンダリングのたびに高さを再計算することを前提にしていましたが、再レンダリングが減ったことで計算が実行されなくなり、高さが正しく反映されなくなってしまいました。この処理自体がそもそもベストな実装ではなさそうなので、発掘できてよかったです。

早速 CSS を使ってページの `<body>` と `<div id="root">` の高さを `100vh` にしようとしたのですが、なにも要素がはみ出していないのにスクロールバーが表示されてしまう現象に遭遇しました。

調査したところ、ツールチップやアクセシビリティのための要素が React の Portal を利用して `body` 直下に生成されるようになっており、それにより開発者ツール上の表示は `0px` となっていても `100vh` から少しだけはみ出している判定になって、スクロールバーが生じてしまう、というものでした。

少しハッキーではありますが `<div id="root">` に対しては高さを `calc(100vh - 1px)` とすることでスクロールバーが消え、意図どおりのレイアウトにすることができました。もしもっと良い解決方法をご存じの方がいらっしゃいましたらご教示願いたいです。

プロジェクトでは Tailwind CSS を使っているため、この値をカスタムプロパティとして定義して使うようにしました。

@theme {
  
  --spacing-a11y-full: calc(100vh - 1px);
}

@layer base {
  #root {
    @apply shr:min-h-a11y-full shr:flex shr:flex-col;
  }
  
  #root:has(.no-scroll) {
    @apply shr:h-a11y-full shr:overflow-hidden;
  }
}

JavaScript による動的な計算から CSS による宣言的なスタイル定義に移行できたことで、`ref` に依存していた不安定な動作も解消できました。めでたしめでたし。

## まとめ

Redux のセレクターで複数の値をまとめて取り出すときは、プロパティの値に配列が含まれていないか注意が必要です。配列が含まれていると `shallowEqual` による比較が `false` になり続け、再レンダリングが止まらなくなることがあります。そのようなセレクターは `createSelector` でメモ化することで解消できます。

また今回の経験から、再レンダリングに依存した処理は潜在的なバグを抱えやすいと学びました。JavaScript による動的な計算ではなく、CSS など宣言的な方法で実現できないか、意識してみてください。

## We Are Hiring!

SmartHRでは、一緒にSmartHRを作りあげていく仲間を募集中です！

フロントエンドをより良くすることに興味がある方、ぜひ一緒に取り組みませんか？

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)