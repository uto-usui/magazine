---
title: "Reactの状態管理ライブラリ「Recoil」とは？ Reduxとの違いを解説"
source: "https://ics.media/entry/210224/"
publishedDate: "2021-02-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

[React](https://ja.reactjs.org/)の開発において、状態管理の方法は注意深く検討する必要があります。状態管理ライブラリ「[Redux](https://redux.js.org/)」が大きい勢力ではありますが（参照：[npm trends](https://npmtrends.com/jotai-vs-mobx-vs-recoil-vs-redux)）、記事『[ベストな手法は？ Reactのステート管理方法まとめ](https://ics.media/entry/200409/)』でも紹介した通りさまざまな状態管理の手法が現在でも編み出されています。本記事では状態管理ライブラリ「[Recoil](https://recoiljs.org/)」についての概要と簡単な使い方、Reduxとの思想の違いについて解説します。

注意：Recoilは2025年1月にプロジェクトがアーカイブされました（参照：『[Recoil 終了のお知らせ](https://zenn.dev/mk668a/articles/88685dfa915474)』）。本記事は2025年1月時点のRecoil 0.7.7で動作するように更新していますが、今後のメンテナンスはされない可能性があります。

### Reduxによる状態管理の懸念点

Reduxでは状態管理を一か所にまとめられるというメリットがあります。これはメリットのように思えますが、小さな単位の状態管理もReduxに委ねるのか迷いどころです。

また、Reduxは状態更新の作法的な書き方が複雑でした。[Redux Toolkit](https://redux-toolkit.js.org/)というReduxのアドオンとしてのJSライブラリもありますが、基本的には作法的な書き方はあまり軽減しません。

![Reduxの懸念点](https://ics.media/entry/210224/images/20210224_recoil_redux.png)

### Recoilとは？

Recoilは、Meta（当時はFacebook）によって提唱された状態管理ライブラリです。「**Atom**」「**Selector**」と呼ばれる単位を使用してアプリケーションデータを管理します。Hooks APIで使うことを前提に作られています。

-   Atomとは：データの保存場所。
-   Selectorとは：Atomをもとにデータの派生状態を取得する関数。

![Recoilトップページ](https://ics.media/entry/210224/images/20210224_recoil_top.png)

### Recoilの使用方法

Recoilを利用するには、npmもしくはyarnで`recoil`をプロジェクトに導入します。

```
npm install recoil
```

※TypeScriptの型定義ファイルも[recoilモジュール](https://www.npmjs.com/package/recoil)に同梱されています。

### Recoilでメモ帳アプリケーションを作ってみる

サンプルとして、Recoil＋TypeScriptでメモ帳のアプリケーションを作成しました。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210224_recoil_notepad_demo)
-   [コードを確認する](https://github.com/ics-creative/210224_recoil_notepad_demo)

公式の[Todoリストのチュートリアル](https://recoiljs.org/docs/basic-tutorial/intro)をTypeScriptとして改良したものとなっています。

以下の説明は、上記のデモを抜粋して解説し8ます。

#### RecoilRootの作成

Recoilによる状態管理をアプリケーションで使用するには、RecoilRootというコンポーネントで囲む必要があります。

▼App.tsx

```
import React from "react";
import { RecoilRoot } from "recoil";
import { NoteApp } from "./components/NoteApp";

export const App = () => {
  return (
    <div className="App">
      <h1>NotePad App</h1>
      {/* Recoilのコンポーネントで囲う */}
      <RecoilRoot>
        <NoteApp />
      </RecoilRoot>
    </div>
  );
};

```

※`<NoteApp />`は任意のコンポーネントです。詳しくはサンプルのコードを確認ください。

このコンポーネントは、ReactのContext APIのようにルート直下のコンポーネントの状態管理を担当します。

#### Atomsの作成

Atomsは、Reduxでいうところのストアに相当します。明確な違いとしては、Reduxはアプリケーション単位での状態管理であるのに対し、Atomsは一つひとつが状態を保持しているという点です。

▼notesAtom.ts

```
import { atom } from "recoil";

/**
 * ノートのデータ管理場所です。
 */
export const notesAtom = atom({
  key: "Notepad", // 任意のユニークな名前
  // 初期値
  default: [
    {
      id: "1",
      value: "",
      isComplete: false,
    },
    {
      id: "2",
      value: "",
      isComplete: false,
    },
  ],
});

```

▼NoteApp.tsx

```
import React, { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notesAtom } from "../atoms/notesAtom";
import { NoteStats } from "./NoteStats";
import { NoteItem } from "./NoteItem";

/**
 * メモ帳のアプリケーションです。
 */
export const NoteApp: React.FC = () => {
  // Recoilの Atoms を呼び出して定義
  const setNotepad = useSetRecoilState(notesAtom);
  // ステートとして利用する
  const [notes] = useRecoilState(notesAtom);

  /**
   * メモ帳を新しく作成するコールバックです。
   */
  const handleCreate = useCallback(() => {
    setNotepad((state) =>
      [
        ...state,
        { id: String(state.length + 1), value: "", isComplete: false },
      ].sort((a, b) => a.id.localeCompare(b.id))
    );
  }, [setNotepad]);

  return (
    <div>
      <NoteStats />
      <div className="noteList">
        {notes.map((note) => (
          <NoteItem key={note.id} item={note} />
        ))}
      </div>
      <div className="button_area">
        <button onClick={handleCreate}>追加</button>
      </div>
    </div>
  );
};
```

Atomsは一意のキーを持っており、Hooks APIの`useRecoilState()`で状態を共有できます。

#### Selectorsの作成

セレクターはAtomからデータを加工する関数として定義します。`get()`メソッドにAtomのデータをもとに加工計算を行っています。

以下の例では、Todoリスト的な完了状態の数値を計算して、「完了した数」「未完了の数」「割合」等を計算しています。

▼notesSelector.ts

```
import { selector } from "recoil";
import { notesAtom } from "./notesAtom";

/**
 * このセレクターは、メモ帳リストの統計を計算するために使用されます。
 */
export const notesSelector = selector({
  key: "notepadStats",
  get: ({ get }) => {
    const notepadList = get(notesAtom);
    const totalNum = notepadList.length;
    const totalCompletedNum = notepadList.filter(
      (item) => item.isComplete
    ).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
```

コンポーネント側では`useRecoilValue()`メソッドを使って、セレクターからの値を連動しています。

▼NoteStats.tsx

```
import { useRecoilValue } from "recoil";
import { notesSelector } from "../atoms/notesSelector";
import React from "react";

/**
 * メモ帳の統計情報を表示するコンポーネントです。
 */
export const NoteStats: React.FC = () => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(notesSelector);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>すべての個数: {totalNum}</li>
      <li>完了したアイテム: {totalCompletedNum}</li>
      <li>未完了のアイテム: {totalUncompletedNum}</li>
      <li>完了した割合: {formattedPercentCompleted}%</li>
    </ul>
  );
};

```

#### Recoilで非同期アクションを取り扱う

Reduxなどで非同期の状態変更アクションを呼び出す際には、Redux-thunkやRedux-sagaなどといった別のミドルウェアを通して管理する必要があります。

Recoilには非同期通信用のAPIが提供されているため、Reactのバージョン16.6から提供されたPromiseをキャッチできる`Suspense`コンポーネントを使って実現できます。これにより、スマートな実装が可能です。

`Suspense`コンポーネントについては、『[React今昔物語](https://ics.media/entry/200310/)』で詳しく解説していますのでこちらも合わせてお読みください。

```
// ユーザーIDをDBから非同期で取得する Selector 関数
const currentUserNameQuery = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {no
    // 架空の非同期取得の処理です。 
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

const CurrentUserInfo = () => {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
};

// Suspenseを使って、
// Promiseが返却されるまでフォールバックを表示する
export const User = () => {
  <RecoilRoot>
    <Suspense fallback="読み込み中">
      <CurrentUserInfo />
    </Suspense>
  </RecoilRoot>;
};
```

### まとめ

Reactの状態管理はさまざまな手法が存在しており、設計時に頭を悩ませる要因のひとつです。Reduxは定番の状態管理ライブラリとして根強い人気がありますが、スコープがグローバルになってしまうことが難点です。

Recoilは2025年1月にアーカイブ化となりましたが、Recoilの類似のライブラリとしては「[Jotai](https://jotai.org/)」があります。JotaiはICSでも積極的に利用しています。あわせて検討するといいでしょう。

※この記事が公開されたのは**4年前**ですが、**1年前の2025年1月**に内容をメンテナンスしています。