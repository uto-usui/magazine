---
title: "React Hooks入門"
source: "https://ics.media/entry/201106/"
publishedDate: "2020-11-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ReactでHooks APIが登場したのは2019年2月。現在では当たり前のように使われているHooksですが、みなさんは正しく使いこなせているでしょうか？　本記事ではHooks APIの基本的な使い方から、注意点まで説明します。

### useStateとは

HooksはReactバージョン16.8で追加された新機能です。次のコードは、ボタンをクリックすると数値が増えるカウンターを作成するコンポーネントです。数値はReactの`state`変数を使って管理されています。

```
import React, { useState } from "react";

export const CounterComponent = () => {
  // state を追加
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      {/* クリックすると count が増える関数 */}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        クリック
      </button>
    </div>
  );
};
```

上記コードの`useState()`という関数がHooksです。この関数でReactの`state`変数を宣言します。

`useState()`の返り値ではステートと、ステートを更新するための関数を配列にして得られます。変数の名前は任意ですが、更新するための関数は「`set○○`」といった形式にする場合が多いです。ステートには数値や文字列、オブジェクトなど、任意の値を初期値として渡せます。

#### key属性を使ったstateのリセット

Reactではコンポーネントに`key`属性を付与できます。この`key`属性を使うことで、コンポーネントの中の`state`をリセットできます。

以下の例では親のコンポーネントが`version`という`state`を持っています。この`version`を子どものコンポーネントの`key`属性に渡すと`version`が更新されたタイミングで子どものコンポーネント内の`state`をリセットできます。

```
// 親のコンポーネント
export const ParentComponent = () => {
  // versionを保持する
  const [version, setVersion] = useState(0);

  return (
    <>
      {/* ChildComponentのkey属性にversionを渡す。versionが更新されるとChildComponentのstateがリセットされる */}
      <ChildComponent key={version} />
      <button onClick={() => setVersion(version + 1)}>Versionをリセット</button>
    </>
  );
};

// 子どものコンポーネント
const ChildComponent = () => {
  // このstateがリセットされる
  const [name, setName] = useState("Hana");
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hi, {name}!</p>
    </div>
  );
};
```

［Versionをリセット］ボタンをクリックすると、`input`に入力した値がリセットされるのがわかります。

![key属性を使ったstateのリセット](https://ics.media/entry/201106/images/images/hooks_useEffect_key.gif)

この機能はReact公式ページで、`state`が残ってしまうよくある問題を解決する手段として紹介されてます。『[props が変更されたときにすべての state をリセットする](https://ja.react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)』に解説があるので、ご確認ください。

### useEffectとは

`useEffect`は、コンポーネントを外部システムと同期させるために使います。たとえば`setInterval()`等のタイマー、`window.addEventListener()`等のイベントを指します。

`useEffect` には引数を2つ指定する必要があります。第1引数には実行したい関数を指定します。第2引数の配列に渡した値が変更されるたびに第1引数の関数を実行します。ここで指定した関数はコンポーネントのレンダリング時・更新時に実行されます。

#### 実行タイミングを第2引数で制御する

`useEffect`の第2引数に空配列を渡すと、コンポーネントのマウント時およびアンマウント時にのみ実行されます。

▼ コンポーネントのマウント時およびアンマウント時に`console.log()`を実行する

```
import React, { useEffect } from "react";
export const AlwaysMountComponent = () => {
  // コンポーネントのマウント時およびアンマウント時にconsole.log() を呼び出します。
  useEffect(() => {
    console.log("useEffect: コンポーネントが更新されました");
  }, []);

  return <div>useEffectの第2引数は空配列を渡せます</div>;
};
```

※React 18以降のStrict Modeでは、マウント時とアンマウント時の`useEffect`は二度実行されます。学びはじめで不安な方は、ReactのStrict Modeを無効にすると学びやすいでしょう。

#### `useEffect`のクリーンアップ

`useEffect`には戻り値に関数を指定できます。ここで指定した処理を「クリーンアップ関数」と呼び、コンポーネントのアンマウント時に実行されます。次のコードは、`setInterval()`を使った1秒おきに数値が増えるコンポーネントです。コンポーネントの破棄時に`clearInterval()`を実行し、タイマーを解除しています。

```
import React, { useState, useEffect } from "react";

export const UseEffectComponent = () => {
  const [isView, setIsView] = useState(true);
  const handleToggleView = () => {
    setIsView(!isView);
  };
  return (
    <div>
      <div className="box">{isView && <CountComponent />}</div>
      <button className="button" onClick={handleToggleView}>
        数値の表示を切り替える
      </button>
    </div>
  );
};

const CountComponent = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const countUp = setInterval(() => {
      setCount((count) => count + 1);
      console.log("カウントが1アップしました");
    }, 1000);
    // 戻り値の指定。
    // ここでは、コンポーネントがアンマウントされたときにタイマーを解除しています
    return () => {
      console.log("コンポーネントがアンマウントされました");
      clearInterval(countUp);
    };
  }, []);
  return <p className="num">{count}</p>;
};

```

「数値の表示を切り替える」ボタンを押して`CountComponent`を非表示にすると、タイマーが解除されていることがわかります。

![](https://ics.media/entry/201106/images/images/hooks_useEffect_02.gif)

クリーンアップ関数で`clearInterval()`を実行しないと、要素が非表示になっても内部的に`setInterval()`の処理が実行されてしまうため、パフォーマンスに影響を与えてしまいます。

#### `useEffect`内でstateを更新しないようにする

以下は一見問題ないように見えますが、`useEffect`内で`state`を更新するのはアンチパターンです。

```
import React, { useEffect, useState } from 'react';

export const Counter => {
  const [count, setCount] = useState(0);
  // countが変更されるたびにuseEffectが呼び出される
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  return <div>{count}</div>;
}
```

このとき、コンソールには以下のような警告が発生しています。

> Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn’t have a dependency array, or one of the dependencies changes on every render.

`useEffect`の依存配列には、コード内で参照されるすべてのリアクティブな値を指定します。この場合`count`はリアクティブで`useEffect()`内で参照されているので、依存配列に入れる必要があります。

依存関係にある値（`count`）が更新されると`useEffect`が呼び出されます。そして`count`は`useEffect`の関数が実行されるたびに更新されます。そのため、

1.  `useEffect`の処理を実行
2.  `count`の数値を更新
3.  `count`が更新されたので`useEffect`が再度実行

…という無限ループに陥ってしまうのです。

今回のように`useEffect`内で以前の`state`の値を使用したい場合は、更新用関数を使います。`setCount((count) => count + 1)`のように、更新用関数で以前の値を受け取り、それを元に更新すれば`count`自体を依存配列から削除できます。

```
import React, { useEffect, useState } from 'react';

export const Counter => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 更新用関数をsetCountに渡す
    setCount((count) => count + 1);
  }, []); // 依存配列からcountが削除できるので無限ループがなくなる
  return <div>{count}</div>;
}
```

### `useCallback`とは

Reactには、**メモ化**という仕組みが存在します。これは関数の実行時に前回実行された関数と入力された引数を比較し、変更がなければ**前回の実行によって得られた値をそのまま返す**というものです。Reactはこれにより、関数の実行の効率化を行っています。

`useCallback`はメモ化したコールバック関数を返すHooksです。Reactでコールバック関数を利用する際に、通常通り書いてしまうとコンポーネントが更新されるたびに新しい関数インスタンスが発行されてしまい、パフォーマンスに悪影響となります。正しい用途で使用すれば、コンポーネントの不要な再レンダリングを防げます。

また、再レンダリングを避けるには、子コンポーネントもメモ化してあげる必要があります。Reactのメモ化は、コールバック関数だけでなくコンポーネントにも適用可能です。コンポーネント全体を`memo()`関数で囲ってあげると、そのコンポーネントをメモ化できます。次のコードは、`ChildComponent.js`を`memo()`で囲ったものです。

```
import React, { memo, useState, useCallback } from "react";

// memoでラップ
const ChildComponent = memo(({ name, handleClick }) => {
  console.log(`子コンポーネント「${name}」が再レンダリングされました`);
  return <button onClick={handleClick}>{name}を+1</button>;
});

/**
 * 数値を表示するコンポーネントです。
 * 子コンポーネントに、クリックすると
 * 数値が増えるボタンを持っています。
 */
// Counterコンポーネント（親）
export const UseCallbackComponent = () => {
  // ふたつの state を用意
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // count1 のセット用関数
  // useCallbackで関数をラップし、依存配列には関数内で利用している count1 を入れます。
  const handleClick1 = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);

  // count2 のセット用関数
  // useCallbackで関数をラップし、依存配列には関数内で利用している count2 を入れます。
  const handleClick2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  //子コンポーネントを呼び出す
  return (
    <div>
      <div>
        {count1} , {count2}
      </div>
      <div className="buttonGroup">
        <ChildComponent name="カウンタ1" handleClick={handleClick1} />
        <ChildComponent name="カウンタ2" handleClick={handleClick2} />
      </div>
    </div>
  );
};
```

上記のコードを実行すると、それぞれのボタンを押すと、対応したコンポーネントの`console.log()`のみが実行されることがわかります。

![](https://ics.media/entry/201106/images/images/hooks_useCallback_02.gif)

### useRefでDOMを参照する

`useRef` はReactコンポーネントの要素に対して参照（reference）を作成できます。JavaScriptのDOM操作でいうところの`document.querySelector`のような使い方ができます。おもにReact側でDOMに対する参照を持つために使われることが多いです。`useRef`をDOM要素への参照として使う場合、マウントされた時に参照が割り当てられ、マウントが解除されると`null`となります。そのため、`useRef`の初期値にはマウントされていない時の値として`null`を定義します。

```
import React, { useRef } from "react";
export const StateComponent = () => {
  // 🔽 h1要素への参照を作成。
  // 初期値として、マウントされていない時の値としてnullを定義
  const refContainer = useRef(null);
  return <h1 ref={refContainer}>参照を確認</h1>;
};
```

参照したいReactコンポーネントの要素には、`ref`属性を付与する必要があります。参照した値は`current`プロパティーで確認できます。以下は、ボタンをクリックするとインプット要素にフォーカスが当たるコードです。

▼インプット要素にフォーカスさせるコード

```
import React, { useRef } from "react";

export const UseRefComponent = () => {
  const inputEl = useRef(null);
  const handleClick = () => {
    // current の要素を参照
    inputEl.current.focus();
  };
  return (
    <div>
      <input className="input" ref={inputEl} type="text" />
      <button className="button" onClick={handleClick}>
        input要素にフォーカスする
      </button>
    </div>
  );
};
```

![](https://ics.media/entry/201106/images/images/hooks_useRef_01.gif)

### useRefで任意の値を保持する

`useRef`にはJSX要素の参照だけでなく、任意の値を保持できます。 `useRef`で作成される`current`プロパティは汎用的なコンテナーとして用意されているもので、書き換え可能かつどのような値でも保持できます。

`useState`との違いとして、`useRef`で保持している値は、**変更されてもコンポーネントが再レンダリングされない**という特徴があります。「コンポーネントの値を変えたいけど、再レンダリングは行いたくない」というケースで活用すると良いでしょう。次のコードを実行すると、内部の値は変更されていても`<p>`要素の表示は変わっていないことがわかります。

```
import React, { useEffect, useRef } from "react";

const UseRefValueComponent = () => {
  // 🔽 useRefに任意の値を保持させる
  const count = useRef(0);
  useEffect(() => {
    // 🔽 レンダリングされたときにuseEffectでconsole.log()を実行
    console.log("レンダリングが実行されました");
  });
  // 🔽 useRefで定義した数値を増やすイベント
  const handleAddCount = () => {
    count.current += 1;
    console.log(`count.currentの値は現在${count.current}です。`);
  };
  return (
    <>
      <button onClick={handleAddCount}>数値を1増やす</button>
      {/* 🔽 useRefの現在値を表示する */}
      <p>{count.current}</p>
    </>
  );
};
```

![](https://ics.media/entry/201106/images/hooks_useRef_02.gif)

### useStateで更新したのにレンダリングされない？

ここからはHooksの注意点を説明します。

Reactコンポーネントの状態管理を行うのにほぼ必須といえるState。`useState`はそんなステートを関数型で使える便利なHooksです。実は、`useState`は注意しなくてはいけない点があります。たとえば以下のようなTODOリストを実装したとします。

```
import React, { useCallback, useState } from "react";

/**
 * TODOリストを作成するコンポーネントです。
 */
export const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  // ボタンをクリックしたとき、TODOリストの配列をひとつ増やすイベントハンドラー
  const handleClick = useCallback(() => {
    const id = lists.length;
    // pushメソッドで破壊的に配列を変更
    lists.push({ id, text: value });
    setValue("");
  }, [lists, value]);

  // inputの値をvalueにセットするイベントハンドラー
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return (
    <div>
      <h1>TODO LIST</h1>
      <button onClick={handleClick}>タスクを追加</button>
      <input value={value} onChange={handleChange} />
      {lists.map((list) => (
        <div key={list.id}>
          list.text
        </div>
      ))}
    </div>
  );
};
```

`useState`は既存のStateと状態更新関数で渡ってきた新しい値を比較し、違いがあれば更新を行います。ですが、現在のstateの配列に`splice()`や`push()`等の破壊的なメソッドで変更を加えてから渡し直しても画面の再描画が起こりません。

現在の状態を表す配列を直接変更するのではなく、別の配列を新たに生成して`useState`の更新関数に渡すようにすれば正しく更新されます。

```
  // ボタンをクリックしたとき、TODOリストの配列をひとつ増やすイベントハンドラー
  const handleClick = useCallback(() => {
    const id = lists.length;
    // 新しく配列を作成して、更新関数に渡す
    const newList = [...lists, { id, text: value, isComplete: false }];
    setLists(newList);
    setValue("");
  }, [lists, value]);
```

### useLayoutEffectは使った方がいい？

現在提供されているHooksには、`useEffect`と`useLayoutEffect`という似たようなものがあります。どのようなときに使い分ければよいのでしょうか？

`useLayoutEffect`は`useEffect`とほぼ同じ動作を行いますが、`useLayoutEffect`はコールバック関数内の処理と`state`の更新が**ブラウザが画面を再描画する前に処理されることを保証する**ところにおおきな違いがあります。`useEffect`はDOMの変更を待たずに非同期で呼び出されるために、コールバック関数の処理が完了する前のDOMがユーザーに一瞬見えてしまうことがあります。それに対し`useLayoutEffect`はDOMの変更を待ってから同期的に処理が行われるため、画面に不整合が生じません。

しかし残念ながらデメリットもあります。同期的に実行されるということは、画面描画完了までの時間が長くなってしまうということです。結果的にどうしてもユーザーへのページ表示が遅くなってしまい、ユーザーの体験を損なってしまいます。どうしても都合が悪い時など以外は `useEffect`の方を使ったほうが無難でしょう。

公式ドキュメントでも、基本的に`useEffect`の方を使うことが[推奨されています](https://ja.react.dev/reference/react/useLayoutEffect)。

また、プロジェクトでサーバーサイドレンダリングを使用している場合は、`useEffect`および`useLayoutEffect`のどちらもJavaScriptのダウンロードが完了するまで動作しないため、注意しましょう。

`useLayoutEffect`はJavaScriptの処理にユーザーによるクリック操作が実行に必要なケースなどに役立ちます。

-   例：[javascript - useEffect triggered by recoil state doesn’t work as expected in safari - Stack Overflow](https://stackoverflow.com/questions/66844834/useeffect-triggered-by-recoil-state-doesnt-work-as-expected-in-safari)

### useMemoとuseCallbackの違い

`useMemo`と`useCallback`は両方とも実行する処理を第一引数に、監視対象となる値の配列を第二引数に持ちます。

`useMemo`は一度計算した結果を変数に保持してくれる「メモ化」を行います。最初のレンダリングで一度作業を行い、第二引数に渡した依存する値が変化しない限りはキャッシュされたものを返します。それに対して`useCallback`は、第一引数に渡している**コールバック関数**をメモ化し、不要な再レンダリングを防いでくれます。

`useMemo`は大きなデータ処理に、`useCallback`は関数に依存関係を追加して不要なレンダリングを抑制したいときに使用するとよいでしょう。また、`useCallback`でメモ化しているコールバック関数は、メモ化しているコンポーネントに渡して利用することで正しく機能します。作成したコンポーネント自身で利用しても意味がないので気をつけましょう。

```
// NG: メモ化したコンポーネントに渡さず、そのまま利用
const Component = () => {
  const handleClick = useCallback(() => { ... }, []);
  return (
    <button onClick={handleClick}>Click!</button>
  );
};

// OK: メモ化したコンポーネントに渡して利用
const Component = () => {
  const handleClick = useCallback(() => { ... }, []);
  return (
    <ChildButtonComponent handleClick={handleClick} />
  );
};

const ChildButtonComponent = React.memo(({ handleClick }) => {
  return (
    <button onClick={handleClick}>Click!</button>
  );
});

```

### Hooksのお約束

Reactは、コンポーネントで呼び出されるHooksは必ず同じ順番・同じ回数で呼び出されることをルールとしており、場合によってHooksの順番や実行回数が変わることを禁止しています。そのため、「このケースのときはHooksを実行したくない」といった書き方はできません。

▼ 以下のような書き方はできない

```
import React, { useState } from "react";

export const StateComponent = () => {
  const [value, setValue] = useState("");
  setValue("hoge");
  if (value === "hoge") {
    const [value2, setValue2] = useState("huga");
  } else {
    const [value2, setValue2] = useState("foo");
  }
  // ...省略...
};
```

状況によって処理を分岐させたいときは、Hooks関数の内部で行うようにしましょう。

### 意外と便利、useDebugValue

その名の通り、`useDebugValue`はデバッグに使えるフックです。Reactの開発を進めていくと、基本のHooksを組み合わせた独自のカスタムフックを作成することも多いです。`useDebugValue`は、カスタムフックのデバッグ情報をReactの開発者ツール用拡張機能（React Dev Tools）に表示させることができます。`useDebugValue`はどのカスタムフックから呼び出されたのか検知し、対応するカスタムフックの横に指定したデバッグ情報を表示します。

React用拡張機能で見ると下の画像のように表示されています。

▼開発者ツールで確認した図 ![図版2：開発者ツールでuseDebugValueの値を取得](https://ics.media/entry/201106/images/hooks_useDebugValue.gif)

`useDebugValue`フックで指定した値がカスタムフックのデバッグ情報として表示されていることがわかります。

### まとめ

HooksはReactでのアプリケーション開発において、頻繁に使用するようになりました。ですが、正しく使用しないとパフォーマンスが落ちてしまったり無限ループバグの温床となってしまう可能性もあります。

公式で[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)という、Hooksをルールどおり正しく使えているかどうかをチェックするプラグインを提供してくれていますので、これを活用するとよいでしょう。