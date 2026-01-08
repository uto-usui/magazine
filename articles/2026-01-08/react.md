---
title: "ベストな手法は？ Reactのステート管理方法まとめ"
source: "https://ics.media/entry/200409/"
publishedDate: "2020-04-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Reactでのシングルページアプリケーションを作成していると、必ず意識しなくてはいけないのが**状態管理**です。Hooks APIの登場により、アプリケーションの状態管理方法にも選択肢が増えてきました。2023年のReactアプリケーションの状態管理方法はどのような選択肢が考えられるでしょうか？

### 状態管理の選択肢

Reactの状態管理として本記事でには紹介している手法は下記の4通りになります。

-   ローカルステート（`useState`、`useReducer`）での管理
-   Hooks APIの`useReducer`、`useContext`を使った管理
-   Reduxによる管理
-   Recoilによる管理

状態管理フレームワークは他にも選択肢がありますが、Reduxを紹介します。理由は、候補として挙がるライブラリの中でもっともシェア数が多く、知名度が高いためです。

下図は、主要なReact状態管理フレームワークのダウンロード数を[npm trends](https://npmtrends.com/jotai-vs-mobx-vs-recoil-vs-redux)で比較したものです（2023年5月時点）。

![](https://ics.media/entry/200409/images/images/200409_reactStateManagement_npm_trends_230516.png)

加えてReduxはストアをひとつしか持たない設計のため、Reactのみの状態管理と比較がしやすいからというのもあります。

### 状態管理はどう変わったか

昨今のReactコンポーネントの主流はクラスコンポーネントから関数コンポーネントに移り変わってきています。 理由としては、やはりHooks APIの登場がとても大きいでしょう。コンポーネントの責任分担をシンプルに行えるため、テストのしやすさも向上しています。

そんなHooks APIのなかには、`useReducer`というAPIも登場しています。 `useReducer`はReduxにおけるReducerのような振る舞いをします。 以下は、`useReducer`の[React公式のサンプルコード](https://ja.react.dev/reference/react/useReducer)を少しだけ改変したものです。

```
const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const Counter => () {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

アクションタイプでのswitch文やdispatch関数など、Reduxを触ったことがある方なら馴染みの深い構文があります。 公式ドキュメントにもある通り、やり方によってはReduxの振る舞いをほぼそのまま再現することもできます。

### Reduxは不要になった？

そんなこともあり、`useReducer`と`useContext`の登場でReduxが不要になった、という記事をときおり見かけます。 たしかにReduxの基本的な機能と同じようなことがミドルウェアなしで使えるという点で、大きなメリットではあります。

では、ReduxはReactアプリケーション開発において不要なライブラリになったのでしょうか？ それは違います。Reduxを導入することで、複雑になってきたWebアプリケーションの管理に役立つことには変わりありません。

もちろん初期段階から導入する必要はありません。ある程度アプリケーションの規模がスケールし、親子関係ではないコンポーネント同士での横のやりとりが必要になったときにReduxは力を発揮します。

`useReducer`は、複数階層で状態を更新するようなコンポーネントのパフォーマンスを最適化する用途で使用します。

-   [useReducer | React](https://ja.react.dev/reference/react/useReducer)

単純なステート切り替えであれば`useState`、複雑なロジックが入ってくるようなステート操作には`useReducer`を使用するのがよいでしょう。

-   [useReducerの本質：良いパフォーマンスのためのロジックとコンポーネント設計 | Qiita](https://qiita.com/uhyo/items/cea1bd157453a85feebf)

### ReduxとuseReducerはどう違うのか？

Reduxと`useReducer`での状態管理の大きな違いは、グローバルステートとして管理するか、コンポーネントのスコープ内（ローカル）でステートを管理するかという点が挙げられます。

![ReduxとuseReducerの違い](https://ics.media/entry/200409/images/200409_reactStateManagement_redux-useReducer-diff.png)

小規模なアプリケーションであれば状態管理のライブラリを入れずに`useReducer`、および`useContext`だけで管理すると品質が向上するでしょう。コンポーネント内部だけでステートが完結するため、単一責任の原則を守りやすくなります。Reduxを導入すると管理が楽になるのは、規模が大きくなり、複数のコンポーネントで共通の値を横断して使いたくなった場合です。

### ローカルステートでの管理

個人プロジェクトやプロトタイプなど、規模が小さなアプリケーションの場合はストア設計自体をしないこともひとつの手です。 以下は、`useState`と`useReducer`だけを使っているTODOアプリケーションのサンプルコードになります。

```
// 初期Stateを設定
const initialState = { todos: [] };
// アクション用のReducerを作成する
const reducer = (state, action) => {
  switch (action.type) {
    case "add_todo":
      const newTodos = [...state.todos];
      newTodos.push({ id: state.todos.length + 1, task: action.payload });
      return {
        ...state,
        todos: newTodos
      };
    case "complete_task":
      const filteredTodos = [...state.todos];
      filteredTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: filteredTodos
      };
    default:
      throw new Error();
  }
};

```

Reduxと同じように、発行されたアクションに応じて状態を変化させる関数であるReducerを作成します。

コンポーネント側での利用方法もReduxとほぼ変わりません。

```
import React, { useState, useCallback, useReducer } from "react";

const Todo = () => {
  // テキストインプット用のローカルステート
  const [input, updateInput] = useState("");
  // Reducerを呼び出す
  const [state, dispatch] = useReducer(reducer, initialState);

  // テキストインプットを監視するHooks
  const onChangeInput = useCallback(
    event => {
      updateInput(event.target.value);
    },
    [updateInput]
  );

  // チェックボックスのイベント更新を監視するHooks
  const onCheckListItem = useCallback(
    event => {
      dispatch({ type: "complete_task", payload: event.target.name });
    },
    [dispatch]
  );

  // ローカルステートとDispatch関数を監視するHooks
  const addTodo = useCallback(() => {
    dispatch({ type: "add_todo", payload: input });
    updateInput("");
  }, [input, dispatch]);

  return (
    <>
      <input type="text" onChange={onChangeInput} value={input} />
      <button onClick={addTodo}>追加</button>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={todo.id}>
            <input type="checkbox" onChange={onCheckListItem} name={index} />
            {todo.task}
          </li>
        ))}
      </ul>
    </>
  );
};
```

ステートはコンポーネント単位のスコープで区切られ、ローカルなステートになっています。 また`useReducer`とは直接の関係はありませんが、`useCallback`を使用してDispatch関数やステートの監視を行い、不要な更新を行わないようにメモ化（PureComponent化）しています。

`useState`や`useReducer`だけで管理できる規模のプロジェクトであれば、無理にアーキテクチャを増やしてしまうとアプリケーションの複雑さがあがってしまいます。 とくにReactの状態管理ライブラリは非同期の取り扱いにミドルウェアを用いなければならないケースが多いです。

コードが複雑化するだけでなく、ライブラリに密結合した設計となってしまうので、バージョンアップの運用も大変になります。

### Hooks APIの`useReducer`、`useContext`を使った管理

Hooks APIで追加された`useReducer`と、`useContext`などでコンテキストAPIと組み合わせ、スコープ単位でステートを共有する方法です。 コンポーネント単位でのローカルなステート管理になるので、見通しやすく不要な肥大化を防ぎます。

```
import React, { useState, useCallback, createContext } from "react";

// コンテキストを定義
const UserContext = createContext({
  // 文字列
  username: "guest",
  // 数値
  completedTask: 0,
  // 関数
  handleUpdateCompletedTask: () => {}
});

// 最上層コンポーネント
const App = () => {
  // ユーザー名のローカルステート
  const [username, updateUsername] = useState("guest");
  // タスク完了数のローカルステート
  const [completedTask, updateCompletedTask] = useState(0);
  // ユーザー名を監視するHooks
  const handleUpdateUsername = useCallback((event) => {
    updateUsername(event.target.value);
  }, [updateUsername])

  // ユーザー名を監視するHooks
  const handleUpdateCompletedTask = useCallback(() => {
    updateCompletedTask(completedTask + 1);
  }, [completedTask, updateCompletedTask])

  return (
    <UserContext.Provider value={{username, completedTask, handleUpdateCompletedTask}}>
      {/* Provider プロパティに共有したいステートを定義して、下層コンポーネント間で共用できるようにする */}
      <div>
        <span>ユーザーネーム：</span>
        <input type="text" onChange={handleUpdateUsername}/>
      </div>
      <Counter/>
      <CompleteTaskView/>
    </UserContext.Provider>
  );
}
```

コンテキストAPIを使用するために`createContext`関数を呼び出しています。 この関数にはデフォルト値を引数として設定できます。 Providerコンポーネントでラップすると、その配下のコンポーネントに状態を共有できます。

```
import React, { useContext } from "react";

// CompletedTaskView コンポーネント
const CompleteTaskView = () => {
  // useContext Hooksで共用ステートを取得
  const { username, completedTask } = useContext(UserContext)
  return (<div>{username}さんは{completedTask}個タスクを完了しました。</div>)
}
```

この構成もローカルなステートで管理することになりますが、コンテキストAPIが加わったことによりステートの横断的な共有が可能になります。 今後もアプリケーションを頻繁に拡張していく可能性が高い場合は、この構成で開発を始めてもよいでしょう。

値だけでなく関数などもコンテキストで管理することができるので、柔軟な対応が可能です。 たとえば、さきほどの`Todo`コンポーネントにコンテキストで管理している関数を渡したい場合は以下のようにします。

```
import React, { useState, useCallback, useReducer, useContext } from "react";

const Todo = () => {
  // コンテキストから関数を取り出す
  const { handleUpdateCompletedTask } = useContext(UserContext)
  ...
  // チェックボックスのイベント更新を監視するHooks
  const onCheckListItem = useCallback((event) => {
    dispatch({ type: "complete_task", payload: event.target.name })
    // コンテキストから取り出した関数を実行
    handleUpdateCompletedTask();
  }, [handleUpdateCompletedTask, dispatch])
  ...
```

### Reduxを使う場合

一定規模以上の複雑なアプリケーションを作成する場合は責任分担を明確にするためコンポーネントを切り分けたり、コンポーネントの子階層が深くなってしまったりすることがあります。 管理するコンポーネントが多くなってくると、やはり横断してステート管理できるシステムが欲しくなってきます。 このタイミングではじめて、Reduxを導入することを検討してもいいでしょう。

ただし、Reactの基本はあくまで単方向データフローであり、それによってコードの可読性や堅牢性を保っていることを忘れないようにしましょう。グローバルのストアだけでまかなってしまうと、設計思想に反して秩序のないコードとなってしまいます。

-   [state とライフサイクル データは下方向に伝わる | React](https://ja.legacy.reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)

下記はこれまでのTODOアプリケーションの状態管理を、Reduxに置き換えたものです。

```
// アクションタイプの定数
const add_todo = "add_todo";
const completed_task = "completed_task";

// アクション関数
export const addTodo = payload => ({
  type: add_todo,
  payload
});

export const completedTask = payload => ({
  type: completed_task,
  payload
});

// Reducer
// 初期Stateを設定
const initialState = { todos: [] };
// アクション用のReducerを作成する
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_todo":
      const newTodos = [...state.todos];
      newTodos.push({ id: state.todos.length + 1, task: action.payload });
      return {
        ...state,
        todos: newTodos
      };
    case "complete_task":
      const filteredTodos = [...state.todos];
      filteredTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: filteredTodos
      };
    default:
      return state;
  }
};
```

Reducerを作成し、コンポーネントと繋ぎ込みを行います。

※Reduxのファイル群は役割ごとに分割するのが慣習ですが、本記事では読みやすさを考慮し1箇所にまとめています

```
import { useDispatch, useSelector } from "react-redux";

export const Todo = () => {
  // テキストインプット用のローカルステート
  const [input, updateInput] = useState("");

  // useDispatch Hookaで、ReduxストアからDispatch関数の参照を行う
  const dispatch = useDispatch();
  // ステートをグローバルストアから取り出す
  const { todos } = useSelector(state => state.todo);

  // テキストインプットを監視するHooks
  const onChangeInput = useCallback(
    event => {
      updateInput(event.target.value);
    },
    [updateInput]
  );

  // チェックボックスのイベント更新を監視するHooks
  const onCheckListItem = useCallback(
    event => {
      dispatch({ type: "complete_task", payload: event.target.name });
    },
    [dispatch]
  );

  // ローカルステートとDispatch関数を監視するHooks
  const addTodo = useCallback(() => {
    dispatch({ type: "add_todo", payload: input });
    updateInput("");
  }, [input, dispatch]);
  return (
    <>
      <input type="text" onChange={onChangeInput} value={input} />
      <button onClick={addTodo}>追加</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input type="checkbox" onChange={onCheckListItem} name={index} />
            {todo.task}
          </li>
        ))}
      </ul>
    </>
  );
};
```

Reduxを使う場合は、react-reduxから高階関数の`connect`を呼び出し`mapDispatchToProps`関数でReactコンポーネントと接続する必要がありましたが、 2019年6月にreact-reduxが[Hooksに対応したAPIを提供するようになった](https://react-redux.js.org/api/hooks)ため、`connect`関数を利用する必要はありません。

`useSelector()`は引数にグローバルストアを指定し、必要なステートをプロパティとして取り出します。アクションがディスパッチされるとステートが更新されていた場合のみ、コンポーネントを再レン​​ダリングします。

`useDispatch`はReduxへのアクションをディスパッチする際に利用し、ストアから関数への参照を返します。子コンポーネントにディスパッチを使用してコールバックを渡すときは、参照の変更により子コンポーネントが不必要にレンダリングされる可能性があるため、`useCallback`でメモ化したほうがよいでしょう。

### Recoilを使う場合

Recoilは、Metaによって提唱された状態管理ライブラリです。「Atom」「Selector」と呼ばれる単位を使用してアプリケーションデータを管理します。Hooks APIで使うことを前提に作られています。

詳しくは以下の記事を参照ください。

-   [Reactの新しい状態管理ライブラリ「Recoil」とは](https://ics.media/entry/210224/)

### 他の状態管理ライブラリ

状態管理ライブラリとして以下の種類もあります。

-   [Jotai](https://jotai.org/)
-   [Zustand](https://zustand-demo.pmnd.rs/)

JotailとZustandはともに同じ[Poimandres](https://docs.pmnd.rs/)が開発しています。JotailはRecoilに似ているのに対して、ZustandはReduxに似ています。

-   参照記事：[Comparison — Jotai, primitive and flexible state management for React](https://jotai.org/docs/basics/comparison#how-is-jotai-different-from-zustand)

### アプリケーションの規模に応じて使い分ける

アプリケーションの状態を横断して管理できるReduxは、ある程度の規模以上のWebアプリケーションの管理には非常に有効なアプローチです。 大規模かつ複雑なWebアプリケーションの場合は、パフォーマンス最適化やビジネスロジックの切り出しのために、`useReducer`とReduxを同時に使うことを検討するケースもあるでしょう。

これはReact以外のソフトウェア設計でも言えることですが、下記の3点を最低限担保できるようにアプリケーションレベル全体で慎重に設計を検討しましょう。

-   **Single Responsibility Principle（単一責任の原則）**・・・モジュールや関数に複数の役割を持たせない
-   **Loose coupling（疎結合）**・・・コンポーネント同士の依存関係が弱く、独立性が強い
-   **Testable（テストしやすい）**・・・参照透過性の高いコンポーネントであり、テストが容易

また、Reduxを使用するときは[re-ducks](https://github.com/alexnm/re-ducks)のようなデザインパターンを採用すると、密結合なファイル群をまとめることができるので複雑さが軽減されるので、オススメです。

### まとめ

Reactの状態管理に関してはベストプラクティスというものがあまりなく、Reduxも最終的に消去法で残った選択肢のライブラリです。

Hooksの登場で責任分担をある程度分散できるようにはなりました。しかし、ある程度の規模以上のアプリケーションになった場合は、Reduxの採用を視野に入れた方がいいでしょう。 逆にシンプルなWebアプリケーションの場合、Reduxを採用するのはオーバースペックです。 アプリケーションの規模や特徴によって適した設計パターンが異なってくるため、 規模に応じて、Reduxを導入するかどうかを考えましょう。

Reactでの開発には他にも、非同期処理やパフォーマンスの最適化といった観点での設計も必要になってきます。 どの方法で状態管理を行うとしても、複雑な構造にしすぎないことを意識しましょう。

Hooks APIやコンテキストAPIについてもう少し詳しく知りたい方は、記事「[React今昔物語](https://ics.media/entry/200310/)」もあわせてお読みください。