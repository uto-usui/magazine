---
title: "正しく使えていますか？ ReactのHooks APIおさらい（応用編）"
source: "https://ics.media/entry/201224/"
publishedDate: "2020-12-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ReactのHooks APIには`useState`や`useEffect`などの基本系のAPIのほか、パフォーマンス改善や状態のスコープ管理など、特定のケースで使うと便利なHooksが用意されています。今回は基本形から一歩進んだ応用系のHooksのほか、コンポーネント内部のHooksを切り出す手法について紹介します。本記事は前後編の内容なので、React Hooksの入門向けの内容は[前回の記事](https://ics.media/entry/201106/)を参照ください。

### useContextを使ってContextを管理する

`useContext`を利用すると、スコープ単位でステートを共有できる**Context**という機能を使用できます。 `useContext`は現在のContextの値を読み取り、変化していた場合はそれを伝える役割をもちます。Contextを設定するためには上位のコンポーネントで`Provider`を決定する必要があることに注意しましょう。

#### Contextを使うべきタイミング

Reactの変遷を紹介した記事『[React今昔物語](https://ics.media/entry/200310/)』でも触れていますが、Contextの濫用はコンポーネントの再利用を難しくするため、利用する際は慎重な設計が必要です。 ですが、正しく使いこなせばコードがより簡潔になり、データの流れもシンプルにできます。Contextがどんなデータを取り扱うのに適しているかを振り返り、より洗練された開発を行いましょう。

#### Contextはどんなデータを取り扱う？

Contextでは、親コンポーネントのツリー以下で使用できる、スコープが限定されたデータを格納します。たとえばサービスの言語設定やカラーテーマなど、コンポーネントで共通して使用するデータを取り扱う際は有効的に活用できるでしょう。

![Contextデータの流れ](https://ics.media/entry/201224/images/201214_context.png)

以下のコードでは、カラーテーマの状態をContextに設定しています。

```
// サイトカラーテーマのContextを定義。初期化のためnullに設定
const ColorThemeContext = React.createContext(null);

const App = () => {
  // カラーテーマの状態。初期値はlight
  const [themeColor, updateThemeColor] = useState("light");
  // ボタンクリック時のイベントハンドラー
  const handleClickThemeButton = useCallback(() => {
    // テーマカラーを更新する
    updateThemeColor(themeColor === "light" ? "dark" : "light");
  }, [updateThemeColor]);

  // Contextの初期値を設定
  const colorThemeContextValue = {
    color: themeColor,
    onClickHandler: handleClickThemeButton
  }

  return (
    <ColorThemeContext.Provider value={colorThemeContextValue}>
      <ContentComponent />
    </ColorThemeContext.Provider>
  )
};

const ContentComponent = () => (
  <div>
    <ThemedButton />
    <p>コンテンツ</p>
  </div>
);

const ThemedButton = () => {
  const { themeColor, onClickHandler } = useContext(ColorThemeContext);
  return (
    <button className={`button_${themeColor}`} onClick={onClickHandler}>
      テーマを変更
    </button>
  )
};
```

Reduxを使っている場合これらの情報はストアで管理してもよいでしょう。ですが、Reduxでデータを管理すると**状態がひとつのオブジェクトに集約**されます。これがReduxを使うメリットでもありますが、コンポーネント側でも独自のスコープで状態管理をもつことで、扱いやすくなるケースも存在します。Contextは取り扱いには気をつける必要がありますが、使いこなせばとても便利です。ていねいに使うようにしましょう。

### useReducerを上手に使いこなす

複雑なステートのロジックがある場合は、えてして管理が難しいものです。とくに前回の値を使ってステートを更新するケースでは、レンダリングの最適化を行わないとパフォーマンスの劣化を招きかねません。

`useReducer`は`useState`の代替系で、現在のステートと更新後のステートを比較してレンダリングを行うかどうかを判別してくれます。更新条件が複数あるなど、複雑なステートを取り扱う場合は効率的に使用できます。

#### 有効なケース①：不要なレンダリングを避ける

`useReducer`はコールバックの代わりに`dispatch`イベントを子コンポーネント渡すことで更新を抑えます。これによりムダなレンダリングの発生を防ぎ、パフォーマンスを保てます。以下のコードは入力した内容のバリデーションチェックを行っています。

▼親コンポーネント（悪い例）

```
/**
 * 入力された文字列のバリデーションを検知し、問題ないかどうかを返します。
 * @param str
 */
const isValidStr = (str) => {
  // ハイフン、アスタリスクなど特定の記号が入っていた場合は false を返却する。
  const regex = new RegExp(/[!"#$%&'()\*\+\-\,\/:;<=>?\[\\\]^`{|}~]/g);
  return !regex.test(str);
};

/**
 * テキストインプットコンポーネントをもつ親コンポーネントです。
 */
export const ParentComponent = () => {
  const [items, setItems] = useState([
    { name: "お名前", value: "" },
    { name: "メールアドレス", value: "" },
  ]);
  const [error, setError] = useState("");
  const onCheckValidate = (value) => {
    // バリデーションをチェック
    const isValidate = isValidStr(value);
    if (!isValidate) {
      setError("使用できない文字が入っています");
    } else {
      setError("");
    }
  };
  return (
    <div>
      {items.map(({ name, value }, index) => {
        return (
          <TextInput
            key={`${value}_${index}`}
            name={name}
            value={value}
            onChange={(v) => {
              // バリデーションチェック
              onCheckValidate(v);
              setItems((current) => {
                const result = [...current];
                result[index].value = v;
                return result;
              });
            }}
          />
        );
      })}
      {/* バリデーションエラーが発生した場合はメッセージを出す */}
      <p style={{ color: red }}>{message}</p>
    </div>
  );
}
```

▼子コンポーネント

```
/**
 * 入力のためのインプット要素をもつコンポーネントです。
 * @param value 入力の値
 * @param onChange 入力時のコールバック関数
 */
const TextInput = ({ value, onChange }) => {
  return (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
  );
};
```

上記のコードでは、`TextInput`に値が渡されるたびにバリデーションの処理が走り、値の変更を検知することでコンポーネントを再レンダリングします。しかし、この設計ではテキストをひとつ変えただけでもすべての`TextInput`コンポーネントに再レンダリングが発生してしまいます。

▼上記のコンポーネントを動かした例（React DevToolsの機能を使って、再レンダリングされた箇所をハイライトしています） ![](https://ics.media/entry/201224/images/201224_rendering_bad.gif)

変更がないコンポーネントへの不要なレンダリングを控えたいものです。

こういったケースでは`useReducer`と`React.memo`によるメモ化を組み合わせて使いましょう。`useReducer`は現在の値と変更後の値を比較し、変更があった場合のみコールバック関数を再生成します。メモ化したコンポーネントは親コンポーネントから渡ってきた値が変化しない限り、そのデータを保持し続けます。以下のように実装すると、再レンダリングされる箇所を減らしてくれます。

▼親コンポーネント（よい例）

```
/**
 * 入力された文字列のバリデーションを検知し、問題ないかどうかを返します。
 * @param str
 * @return boolean
 */
const isValidStr = (str) => {
  // ハイフン、アスタリスクなど特定の記号が入っていた場合は false を返却する。
  const regex = new RegExp(/[!"#$%&'()\*\+\-\,\/:;<=>?\[\\\]^`{|}~]/g);
  return !regex.test(str);
};

/**
 * アクションを検知するReducerです。
 * @param state useReducerの現在の値
 * @param action 引数で渡ってきた更新された値
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "input": {
      const newValues = [...state.values];
      // 対応するインデックスの値を更新する。
      newValues[action.index].value = action.value;
      const isValidate = isValidStr(value);
      return {
        ...state,
        values: newValues,
        error:  !isValidate ? "使用できない文字が入っています" : ""
      };
    }
  }
};
/**
 * テキストインプットコンポーネントをもつ親コンポーネントです。
 */
export const ParentComponent = () => {
  // 初期Stateを決定
  const [{ values, message }, dispatch] = useReducer(reducer, {
    items: [
      { name: "お名前", value: "" },
      { name: "メールアドレス", value: "" },
    ],
    error: ""
  });
  return (
    <div>
      {values.map((value, index) => {
        {/* TextInputコンポーネントにはonChangeを直接渡さず、dispatch関数を渡すようにする */}
        return (
          <TextInput
              key={`${value}_${index}`}
              value={value}
              index={index}
              dispatch={dispatch}
           />
        );
      })}
      {/* バリデーションエラーが発生した場合はメッセージを出す */}
      <p style={{ color: red }}>{message}</p>
    </div>
  );
}
```

▼子コンポーネント

```
/**
 * 入力のためのインプット要素をもつコンポーネントです。
 * 不要なレンダリングを避けるため、Propsをメモ化しています。
 * @param value 入力の値
 * @param index 入力インプットのインデックス
 * @param dispatch 実行するアクション関数。引数に更新したい値、アクション名を入れます
 */
const TextInput = memo(({ value, index, dispatch }) => {
  return (
      <input
        type="text"
        value={value}
        onChange={e =>
          dispatch({
            type: "input",
            index,
            value: e.currentTarget.value
          })
        }
      />
  );
};
```

▼上記のコンポーネントを動かした例。再レンダリングされている箇所が減りました。 ![](https://ics.media/entry/201224/images/201224_rendering_good.gif)

#### 有効なケース②： ストアに入れたくない複雑な計算ロジックの状態管理を任せる

Reduxはグローバルなストアを提供するため、アプリケーションのデータは一箇所に集中管理されます。これは単一責任の原則的にも有効ですが、入力内容によって変化する状態などをもつと、巨大なデータから逐一ピンポイントでデータを購読しなくてはいけません。`useReducer`はコンポーネント単位でデータを管理できるため、データアクセスの流れを一部コンポーネントに任せられます。

#### 有効なケース③：Dispatchを使って更新の回避

`useReducer`で返却するステートを現在のものと同じものにした場合、Reactは子コンポーネントのレンダリングや副作用の実行をキャンセルします。注意点として、更新キャンセルが起きる前にReact側でのコンポーネントレンダリング自体は行われてしまう可能性はあります。もしレンダリング中にコストの高い計算処理を行っているコンポーネントの場合は`useMemo`を使って計算処理をメモ化し、レンダリングのタイミングを最適化するとよいでしょう。

### 独自フック（Custom Hook）を使いこなす

ある程度Reactに慣れてくると、コンポーネントのロジックとして記述しているHooksを切り出したくなったり、処理内容が似通っているロジックを共通化したくなります。このようなときは、Hooksを抽出してコンポーネント側から呼び出すようにしましょう。これを **独自フック（Custom Hook）** と呼びます。

#### 独自フックを作成する

独自フックを作成するときは慣習として、命名プレフィックスにuseを付与します（公式でも[推奨](https://ja.reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook)されています）。

独自フックを上手に使いこなすとロジックの共有が柔軟になり、さまざまなユースケースへの対応が簡単になります。以下は、スクロール時の処理を独自フックとして切り出したものです。

```
const useScroll = (ref) => {
  // 座標初期位置を記録。
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      // スクロールイベントが発生するたびにスクロールの座標を記録
      ref.current.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      // スクロールイベントのイベントリスナーをクリーンアップする。
      if (ref.current) {
        ref.current.removeEventListener("scroll", handler);
      }
    };
  }, [ref]);

  return state;
};
```

#### react-useを使う

Reactのヘルパーとして、さまざまなコントリビューターが作った独自フックを使える[react-use](https://github.com/streamich/react-use)というライブラリがあります。

`react-use`に入っている独自フックはReactアプリケーション開発において、おおよそのユースケースに対応しています。自前で独自フックを作成する前にリポジトリーを確認し、必要に応じて使用すると開発のスピードが上がります。また、ライブラリーを見ながらあえて車輪の再発明をすることで独自フックの作成に慣れるのもありでしょう。`react-use`では、たとえば以下のようなHooksが提供されています。

-   Promise関数を解決して返却してくれる`useAsync`
-   `<audio>`要素を作成できる`useAudio`
-   ユーザーがキーボードの特定のキーを押していることを検出する`useKeyPress`

### テストを意識したHooksを書こう

独自フックでロジックをコンポーネントから切り離すと、単体テストも書きやすくなります。ひとつのHooksに機能をもたせすぎていないか、副作用のないHooksを作っていないかなどを意識しながら独自フックを作成していくと、より洗練されたHooks設計ができるでしょう。Hooksの単体テストを行う場合は、React Hooksのテスティングライブラリーである`react-hooks-testing-library`などを使うと効率がよいです。

▼`react-hooks-testing-library`を使った単体テストの一例

```
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

test('useCounterを実行した時、カウンターはひとつ増えるべき', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})
```

### 番外編：Hooksのルール

Hooksを記述するときにはルールがあります。前回記事のまとめで紹介した`eslint-plugin-react-hooks`では、これらのルールを強制できます。

#### Hooksのルール①：Hooksを呼び出す際は、トップレベルでなければいけない

たとえばHooksをfor文の中で呼び出したり、if文で分岐させて呼び出したりすることはできません。これは、コンポーネントのレンダリングの順番を毎回同じにすることを保証する目的です。

#### Hooksのルール②：通常のJavaScript関数から呼び出さない

コンポーネントに紐づくステートは、そのコンポーネント自身が責任を持ちます。そのため、Reactコンポーネント外部のJavaScript関数から呼び出すことはできません。ReactコンポーネントからHooksを切り出したいときは、カスタムフックを作って呼び出しましょう。

### まとめ

Reactは強力なフレームワークですが、やれることが多いぶん学習コストも決して低いとは言えません。昨今では周辺ライブラリもHooks対応し便利になっている分、Reactでの開発により幅広い知識が必要になりました。HooksやReactの正しい動きをしっかりと学び、よりよい開発をしましょう。