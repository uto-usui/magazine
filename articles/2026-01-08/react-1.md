---
title: "React今昔物語"
source: "https://ics.media/entry/200310/"
publishedDate: "2020-03-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

[React](https://ja.react.dev/)が2013年にオープンソースとして公開されてから、多くの時間が流れました。 今ではシングルページアプリケーション（SPA）のプロダクト開発にReactを採用しているケースも多いと思います。

Reactのコミュニティも非常に活発で、Next.jsやReact Nativeなど、基盤技術にReactを使用したライブラリも多く世に出てきています。

歴史が長いフレームワークなこともあり、ちまたには新旧入り混じった色々な手法を紹介した記事があふれています。「**この記事の内容は今でも通用するやり方なのか？**」「**今のベストプラクティスは？**」など、悩んでしまう方も多いのではないでしょうか。

そんな方々のために、2015年頃から現在にかけてのReactの変遷を振り返りながら、現在でも使える知識をまとめました。

### Reactの歴史を振り返る

この記事に記載されているReactの変更について、2015年頃から簡単にまとめてみました。

時期

主なアップデート内容

2015年10月

Reactのパッケージが`react`と`react-dom`に分割される。  
Stateless functional component(SFC)の追加

2016年4月

Reactバージョン15.0.0の発表

2016年7月

`PureComponent`の追加

2017年4月

`React.propTypes`が非推奨になる

2017年6月

`React.createClass`が非推奨になる

2017年9月

ライセンスがBBD + PatentsからMITライセンスに変更。  
Reactバージョン16.0.0の発表。  
`render`関数の返却値変更、`Error Boundary`、  
非推奨のパッケージの削除など

2017年11月

`React.Fragment`の追加

2018年3月

`CompoentWill~`系のライフサイクルメソッドが非推奨になる

2018年10月

`React.memo`、`React.lazy`、`React.Suspense`の追加

2019年2月

Hooksの追加

2019年8月

非推奨のライフサイクルメソッドの削除

2020年2月

`React.createFactory`が非推奨になる

2020年10月

[Reactバージョン17.0](https://ja.legacy.reactjs.org/blog/2020/10/20/react-v17.html)のリリース  
（新機能の追加はない）

2022年3月

[Reactバージョン18.0](https://ja.react.dev/blog/2022/03/29/react-v18)のリリース  
並行レンダリング、レンダリングのバッチ化、トランジションの導入、StrictModeの導入

2024年12月

[Reactバージョン19.0](https://ja.react.dev/blog/2024/12/05/react-19)のリリース  
非同期処理に関連する機能の追加、サーバーコンポーネントの追加、`ref`をpropsで渡せるように

機能改善だけでなく、非推奨になった機能も多いですね。

### 2015年〜　ES2015の正式リリース前

2015年6月まではES2015が正式リリースされていなかったため、Reactのコンポーネントの作成には`React.createClass`が使われていました。 React独自のクラスコンポーネントを生成する機能です。

```
var Component = React.createClass({
  render: function() {
    return ReactDOM.tagName({options, "Hello"})
  }
});

React.renderComponent(
  Component(null),
  document.getElementById("root")
)
```

### 2016年〜　クラスコンポーネントの時代

Reactバージョン15.0.0からは`React.createClass`はほとんど使われず、ES2015のクラス構文を使ってクラスコンポーネントを作成することが主流になりました。 効率のために型チェックをしたい場合は、Reactに組み込まれていた`React.propTypes`を使えば、型が合わない時にコンソールへ警告を出してくれました。

```
class Component extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Component.propTypes = {
  name: React.PropTypes.string.isRequired
};
```

クラスコンポーネントは、今でもいろいろな記事でよく見かける構文ですね。

### 2017年〜　Reactバージョン16.0.0の登場

2017年にReactバージョン16.0.0が発表されました。 内部アルゴリズムの変更、エラー処理やレンダー関数の返却値の改善など、大きな機能改善が入りました。 変更された内容をあらためて振り返ってみましょう。

#### Apacheとの衝突があった？　ライセンス問題

Reactのライセンスに関して問題になったことがありました。 実はFacebookのいくつかのOSSには、もともと特許条項付きBSDライセンスという独自のライセンスが付加されていました。

これは簡単に言うと、「**FacebookおよびFacebookの関連会社に対して特許で訴訟した場合、Facebook関連のコードの利用権利を失う**」というものです。

[Apache Software Foundation（ASF）](https://www.apache.org/)という非営利団体がポリシーに反するとして、Facebook製の特許条項付きBSDライセンスをASFで使用禁止にすることを発表しました。[ASFのサードパーティライセンス規定](https://www.apache.org/legal/resolved.html#category-x)を見ると、「Category X（使用禁止相当）」にFacebookのBSDライセンスが入っていることがわかります。

当初Facebook側はライセンスを変更する方針はないという姿勢をとっていましたが、 コミュニティの反応を受け、Reactバージョン16.0.0のリリースと同時期にMITライセンスとなりました。[Facebook Engineering Blog](https://engineering.fb.com/2017/09/22/web/relicensing-react-jest-flow-and-immutable-js/)にもその経緯が記載されています。

#### Reactに紐づいていたいくつかのパッケージを外部化

Reactバージョン16.0.0以降からは、コードサイズの最適化の目的のために非推奨だった下記の機能がReactパッケージから廃止され、外部パッケージに切り離されました。

-   `React.createClass`（コンポーネントクラスを作成する機能）
-   `React.propTypes`（React独自の、propsの型チェックを行う機能）

両機能ともに現行のバージョンではすでに廃止済みのため、特別な理由がない限りは下記のように対応するのがよいでしょう。

-   コンポーネント作成は`React.Component`、もしくは関数コンポーネントで書く
-   型チェックを行いたい時はTypeScriptを採用する

React + TypeScriptでの新規開発の際は、記事『[最新版TypeScript+webpack 4の環境構築まとめ(React, Vue.js, Three.jsのサンプル付き)](https://ics.media/entry/16329/)』を参照ください。

#### 仮想DOMの更新アルゴリズムがFiber方式に変更

Reactバージョン16.0.0以降から、仮想DOMの更新アルゴリズムが従来の**Stack方式**から**Fiber方式**というアーキテクチャーに変わりました。

仮想DOMを取り扱うフレームワークは、更新検知時に古い仮想DOMツリーとの比較を行い、変更箇所だけを再構築します。この差分検知のアルゴリズムを**リコンシエーション**といいます。

Stack方式ではコンポーネントが再レンダリングされた場合、すべての子階層のツリーに再レンダリング・リコンシエーション・Viewへの反映などを**同期的に**行なっていました。 そのため、複雑な構造のコンポーネントだと更新処理の間アプリケーションビューの動作が止まってしまい、ラグが発生してしまいました。

Fiber方式では、処理実行のスケジューリングに優先度をつけます。仮想DOMの更新処理をFiberと呼ばれる**独立した連結リスト**の単位にすることで、リコンシエーションを実行します。 レンダリングは、一連の更新処理がすべて終わった後に実行されます。

![StackとFiberのアルゴリズム比較](https://ics.media/entry/200310/images/200304_reactLookingBack_algorithm_comparison.png)

アニメーションやテキスト入力といった「即時に反映する必要のある処理」に優先度が高く設定されます。そのことで、ユーザーのインタラクション阻害の軽減化が可能になりました。

JavaScriptは基本的にシングルスレッドで動作しているため、内部的には`requestAnimationFrame`や`requestIdleCallback`を駆使して疑似的にスケジューリングの優先度を調整しています。

#### Fragment構文の追加

Reactでは、複数の要素をコンポーネントとして出力するのが困難でした。

```
render() {
  return (
    {/* トップレベルの要素が複数ある場合はエラーが発生する */}    
    <ChildA />
    <ChildB />
    <ChildC />
  );
}
```

こういったケースの時はトップレベルの要素を`div`などで囲み、単一のJSX要素にして返却する必要がありました。 Reactバージョン16.2.0に追加された`React.Fragment`を使用すると、余分なDOM要素を追加することなくHTMLをレンダリングできます。

```
render() {
  return (
    <Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </Fragment>
  );
}
```

また、`React.Fragment`は省略記法で記述することも可能です。

```
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

#### Error Boundary

Reactバージョン16.0.0以降では、コンポーネントツリーで発生したエラーハンドリングを行うための機能が追加されました。 特定のコンポーネントを親コンポーネントとして仕込むことで、子階層のコンポーネントでエラーが発生した時に検知してくれるようになります。 この仕組みを**Error Boundary**と呼びます。

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // レンダリングの前にエラーをキャッチする
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    // エラーが発生していたらフォールバックの文を表示
    if (this.state.hasError) {
      return <h1>エラーが発生しました。</h1>;
    }
    // そうでなければ子コンポーネントを表示
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

Error Boundaryを利用することにより、UIのフォールバック表示や、エラー箇所の特定が楽になりました。

### いくつかのライフサイクルメソッドの非推奨化

Reactバージョン16.3.0以降から以下のライフサイクルメソッドが非推奨となり、`UNSAFE_`というプレフィックスが付与されました。

-   `componentWillMount`
-   `componentWillReceiveProps`
-   `componentWillUpdate`

Reactが将来的に非同期レンダリングに対応した時、不具合発生の可能性が高いため廃止となりました。 Reactバージョン16.9.0以降からは、これらのライフサイクルメソッドは完全に廃止されます。

#### React.lazy

Reactバージョン16.6.0以降では、`React.lazy`というDynamic importのような機能が実装されています。 動的にロードされるコンポーネントを遅延して読み込ませ、バンドルサイズを小さくできます。

```
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

#### React.Suspense

Reactバージョン16.6.0以降から、**Suspense**という機能が追加されました。 Error Boundaryと似ていますが、SuspenseはエラーではなくPromiseをキャッチします。 前述の`React.lazy()`と組み合わせることで、非同期処理を取り扱うコンポーネントの作成が楽になります。

```
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const Component = () => {
  return (
    <div>
      {/* ローディング中はフォールバックとして「Loading...」と表示される */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

-   Promiseが解決していないときはレンダリングを待機
-   Promiseが完了した時、レンダリングを再実行する

Promiseの状況に応じて、表示する結果を切り替えられます。

たとえばReactでの非同期処理は次の処理を管理しなければなりません。

-   ロード中を判断するステートの用意
-   ローディング用のUIを表示
-   非同期処理の終了時にステートを切り替えて結果を表示

これらを実現しようとするとコードが冗長になりがちでしたが、`React.Suspense`と`React.lazy`の登場によって、ステートを使わずにこの機構を作成できるようになりました。

`Suspense`の詳細はReact公式ドキュメントの『[<Suspense> – React](https://ja.react.dev/reference/react/Suspense)』をご確認ください。

#### React.memo

Reactには、パフォーマンスを向上に役立つ`PureComponent`が提供されていました。 stateやpropsに変更がなければ再レンダリングを行わない仕組みであり、レンダリングの回数を抑えられます。 しかし、`PureComponent`はクラスコンポーネントでしか使用できませんでした。

Reactバージョン16.6.0からは`React.memo`を使用することで、関数コンポーネントの`PureComponent`化が可能になりました。

```
const Component = ({ props }) => <div>{props.name}</div>;

const MemoComponent = React.memo(Component);
```

#### Context API

Reactの基本として、データはpropsからトップダウン（親 => 子）で渡されます。 そのため、必要なコンポーネントまでデータを共有するいわゆる「propsのバケツリレー」を行う必要があります。 たとえばUIテーマの切り替え情報や言語設定など、アプリケーションの中で多くのコンポーネントから必要とされているプロパティを渡すのはとても手間になります。

```
// 親コンポーネント
class ParentCompoennt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: "dark" };
  }
  render() {
    return (
      <>
        <h1 className={`title_${this.state.theme}`}>テーマ</h1>
        <ChildComponent theme={this.state.theme} />
      </>
    );
  }
}

// 子コンポーネント
class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`block_${this.props.theme}`}>
        <GrandChildComponent theme={this.props.theme} />
      </div>
    );
  }
}


// 孫コンポーネント
class GrandChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>現在のカラーテーマは ${this.props.theme} です</p>
  }
}
```

ReactではContext APIという便利な機能が提供されています。 これは、ひとつのコンポーネントに対してグローバルに共有できるデータを取り扱えるようにするAPIです。

```
// コンテキストを作成
const Context = React.createContext();

// 親コンポーネント
class ParentCompoennt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: "dark" };
  }
  render() {
    return (
      {/* Providerコンポーネントに管理したい値を渡す */}
      <Context.Provider value={this.state}>
        <h1 className={`title_${this.state.theme}`}>テーマ</h1>
        <ChildComponent />
      </Context.Provider>
    );
  }
}

// 子コンポーネント
export default class ChildComponent extends React.Component {
  render() {
    return (
      {/* コンテキストを参照 */}
      <div className={`block_${this.context.theme}`}>
        <GrandChildComponent theme={this.context.theme} />
      </div>
    )
  }
}

// 参照したいコンテキストオブジェクトを指定
ChildComponent.contextType = Context;
```

Contextはグローバルレベルにデータを共有してしまうため、コンポーネントの再利用の難易度が上がってしまいます。 使用する際はアプリケーションが共通で保持している状態のみを管理するように心がけましょう。

### 2018年〜　関数コンポーネントの時代へ

2018年頃になると、コード量の削減・可読性の向上・テストしやすさなどの理由から、Reactのコンポーネントの主流はクラスコンポーネントから関数コンポーネントへと移り変わっていきました。

コンポーネントは基本的になるべく状態をコンポーネント自身に持たせないStateless Functional Component(SFC)と呼ばれる方法でUIを作成していました。 状態管理や更新処理については、後述する高階コンポーネントなどの手法が人気でした。

#### 高階コンポーネント / Render-Props

Hooks APIが公開される前、**高階コンポーネント（Higher-Order Component）** と呼ばれる設計パターンが応用テクニックとして流行しました。 コンポーネントのロジック分離を着目点として、振る舞いを抽象化するために編み出された手法です。

高階コンポーネントとは、既存のコンポーネントを受け取り、新しく変換したコンポーネントを返却するような関数のことを指しています。 元のコンポーネントをコンテナコンポーネント内にラップする形で変換します。

```
// コンポーネントを引数に受け取る
function enhance(WrappedComponent) {
  return class extends React.Component {
    // 追加したい機能のロジックを記述
    onClick(event) {
      console.log(event);
    }
    render() {
      // 機能を追加した新しいコンポーネントを返す
      return <WrappedComponent {...this.props} onClick={this.onClick} />;
    }
  }
}
```

```
// ステートレスなコンポーネント
const BaseComponent = (props) => {
  return <div>{props.title}</div>
};

// 関数を使って機能を合成
const EnhancedComponent = enhance(BaseComponent);

// クリックするとコンソールが出力されるdiv要素が表示される
<EnhancedComponent />
```

共通で使用できるロジック部分を抽出し、ビューコンポーネントと合成する関数を用意することで、コンポーネントの責任分担を分けられるようになりました。

#### Render-Props

高階コンポーネントと同時期ごろ、話題になったテクニックが**Render-Props**です。

ロジックの分離という基本的な理念は高階コンポーネントと同じです。違いとしてはコンポーネントを引数にとるのではなく、プロパティに関数としてレンダリングするコンポーネントを渡すようにします。 下記の例では、`ContainerComponent`がロジックを担当し、`ViewComponent`が描画を担当しています。 `ContainerComponent`のプロパティから引数としてデータを渡し、それを`ViewComponent`が受け取る形になります。

```
const ParentComponent = () => {
  // renderプロパティに関数としてレンダリングするコンポーネントを渡す
  return <ContainerComponent render={
    data => <ViewComponent data={data} />}
  />;
};

// データを受け取り、描画を担当するコンポーネント
const ViewComponent = ({ data }) => {
  return data.map((item, index) => (
    <p key={item}>
      {item}
    </p>
  ));
};

// ロジックを記載したコンテナコンポーネント
class ContainerComponent extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      lists: ["hoge", "fuga", "piyo"],
      clickId: null
    };
  }
  // クリックした要素の「selected」CSSクラスを切り替える
  handleClick(event) {
    event.target.classList.toggle("selected");
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        {/* レンダリングしたい値を渡す */}
        {this.props.render(...this.state)}
      </div>
    );
  }
}
```

#### Recompose

高階コンポーネントや関数コンポーネントには弱点がありました。 それは、Reactが提供しているライフサイクルメソッドやステートなど、Reactの目玉とも言える機能が利用できなかったことです。

後述するHooks APIが登場するまでは、これらの機能はクラスコンポーネントに付与されている機能であり、関数コンポーネントでは利用できませんでした。

この問題を解決するため、[Recompose](https://github.com/acdlite/recompose)というライブラリが生まれました。

このライブラリは前述の関数コンポーネントに対してローカルステートやライフサイクルメソッドを追加します。 これにより、クラスコンポーネントで定義しなくても状態の制御ができました。一時期は高階コンポーネントとRecomposeを組み合わせた構成が、Reactプロジェクトのベストプラクティス的な立ち位置となっていました。

しかし、Recompose開発者のAndrew ClarkさんがReactチームにジョインし、Hooksを開発・発表して間もなく、**Recomposeの開発は停止**してしまいました。

GitHubのissueを見ると、Recomposeの機能を切り出してライブラリ化しようとしている有志もいるようです。 Recomposeの開発は停止して久しく、[開発者本人もHooksを利用することを推奨](https://github.com/acdlite/recompose#a-note-from-the-author-acdlite-oct-25-2018)しています。 そのため、今後のReact開発にはHooksを使用する方がよいでしょう。

### 2019年〜　Hooks APIの登場

Hooksが登場してからは高階コンポーネントで設計することのメリットはあまりなくなってしまい、関数コンポーネントのみの記述が多くなりました。

Reactバージョン16.8.0以降から導入されたHooksを使用することにより、 stateやpropsといったReactの機能をクラス構文を宣言することなく使用できます。

```
import React, { useState, useCallback } from 'react';

const Example = () => {
  // state変数を作成する
  const [count, setCount] = useState(0);

  const handlSetCount = useCallback(() => {
    // ステートを更新する
    setCount(count + 1)
    // 第二引数には、依存している値を配列で渡す。
    // この値が変化するときのみ、第一引数の関数は実行される
  }, [count])

  return (
    <div>
      <p>{count}</p>
      <button onClick={handlSetCount}>
        Click
      </button>
    </div>
  )
};
```

現行のバージョンのReactでは以前にクラスコンポーネントで利用できていたライフサイクルメソッドも、ほぼ互換性があります。

ただし、前述のError Boudaryに利用するライフサイクルメソッドである、`componentDidCatch`および`getDerivedStateFromError`に関しては現状のバージョンのHooks APIで実装されていません。

Hooks APIの主なメリットとして、以下が挙げられます。

-   コンポーネントがシンプルになり、可読性が向上
-   動作が厄介なJavaScriptの`this`に悩まされることがない
-   Hooks自体が関数なので、コンポーネントから再利用したいロジック部分を抽出できる

ライブラリの方針として、クラスコンポーネントをReactから削除する予定はないようです。 ただ、**今後の最新機能の提供がHooksベースになる**ことを考えると、クラスコンポーネントは今後レガシーな書き方になる可能性があります。 Reactで新規開発する際は、クラスではなく関数型でコンポーネントを作成するほうが望ましいでしょう。

#### 用法用量を守って、正しくHooksを使いこなそう

Hooksはとても便利ですが、第二引数（`deps`）に正しい参照対象を渡さないと、処理が無限ループしてしまったりする危険性もあります。 解決策としてESLintのプラグイン「[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)」を活用するのもよいでしょう。Hooksの参照対象の誤りを警告してくれます。

Hooksをはじめて使う場合は、`useState`や`useEffect`などネイティブに提供されているHooksのみを使用してみて感覚をつかみましょう。 Hooksについては[公式サイトのリファレンス](https://ja.react.dev/reference/react/hooks)に豊富な情報があるのでぜひご覧ください。

#### React.createFactoryの非推奨化

Reactバージョン16.13.0から、JSXの構文なしでReact要素を生成する`React.createFactory`が非推奨になりました。 JSXなしでReactを使うときは`React.createElement`を呼び出すようにしましょう。

```
class Component extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.name}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {name: 'Taro'}, null),
  document.getElementById('root')
);
```

### 2021年〜　React 17は新機能なし

React 17はReact 18への踏み台としてリリースされました。[公式ブログ](https://ja.legacy.reactjs.org/blog/2020/10/20/react-v17.html)でも「No New Features」と紹介されているように、新機能の追加はありません。

このバージョンが、Internet Explorer 11をサポートするReactの最後のバージョンとなりました。

### 2022年〜　React 18で並行レンダリング

React 18の目玉は並行レンダリングが可能になったことです。HooksとしてのReactの書き方の変化はあまりありませんが、内部的な最適化や挙動の変化があります。

React 18からは初期化の方法が変わっています。従来は`ReactDOM.render()`で初期化していましたが、React 18では`createRoot().render()`を利用します。

```
import React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`React.StrictMode`も導入されました。安全でないライフサイクルを検知するため、開発モードで起動するとマウントを意図した`useEffect()`が二度実行されるという挙動となります。

また、React 18では`Suspense`が正式導入されています（先述のとおりバージョン16.6から限定的な機能の状態で搭載されていました）。

### 2024年〜　React 19では非同期処理をあつかう機能が充実、サーバーコンポーネントの登場

React 19でもさまざまな機能が追加されています。主要な機能を紹介しますが、詳しく知りたい方はReactの公式ブログ[React v19 – React](https://ja.react.dev/blog/2024/12/05/react-19)をご確認ください。

#### 非同期処理が便利に

Reactアプリではユーザーの操作で非同期処理を行い、その結果を表示するといったユースケースがよくあります。この非同期処理やフォームの処理に便利な機能が追加されました。

たとえば`useActionState`hooksではアクション進行中の状態やアクションの結果などを管理できます。以下のように`useActionState`にアクションの関数を渡し、非同期処理の結果、ラップされたアクション、進行中状態を受け取ります。

```
const Form = () => {
  const submit = async (newName) => {
    const error = await updateName(newName);
    return error;
  };
  const [error, submitAction, isPending] = useActionState(submit);

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>更新する</button>
      <span>{error}</span>
    </form>
  );
};
```

新しく追加された`use`APIでは非同期処理でのデータの取得がシンプルに記述できるようになります。

以下の例では非同期処理である`fetchUsers()`関数を`use`APIに渡しています。従来は`useEffect`や`useState`などを使っていたところ、`use`を使うととてもシンプルなコードになります。この場合、`fetchUsers`の取得中は`Suspense`のフォールバックが表示され、取得が完了するとユーザー名が表示されます。

```
const Users = () => {
  const users = use(fetchUsers);
  return users.map((user) => <p>{user.name}</p>);
};

const UserList = () => (
  <Suspense fallback={<p>読み込み中...</p>}>
    <Users />
  </Suspense>
);
```

その他にも楽観的な更新を行うための`useOptimistic`、フォームの状態を取得する`useFormStatus`なども追加されています。

#### サーバーコンポーネント

サーバーコンポーネントとは、ビルド時またはリクエスト時にサーバー上で事前に描画され、その結果をクライアントに返すコンポーネントです。JavaScriptのバンドルサイズを小さくしたり、初期の読み込み時間を削減できます。

詳細はReactの公式ドキュメントをご確認ください。[サーバコンポーネント – React](https://ja.react.dev/reference/rsc/server-components)

#### `ref`をpropsで渡せるように

React 19以前では、子コンポーネントから親に`ref`を渡す場合`forwardRef`を使用していました。React 19からはpropsとして`ref`を渡せるようになりました。

```
const Parent = () => {
  const ref = useRef();
  return (
    <div>
      親コンポーネント
      <Child ref={ref} />
    </div>
  );
};

const Child = ({ ref }) => <span ref={ref}>子ども</span>;
```

### まとめ

React FiberやHooks APIなど、Reactには定期的に大きなアップデートが入ってくることが多く、歴史も長いため情報の取捨選択が大変です。

しかし、パフォーマンスを最適化させる機能や非同期処理のキャッチが追加されるなど、開発者にとって確実に便利になっています。

ICS MEDIAでは他にも、『[React Hooks入門](https://ics.media/entry/201106/)』や『[WAI-ARIA対応のタブ型UIの作り方（React編）](https://ics.media/entry/17109/)』で前述のHooks APIの使い方をソースコード付きで紹介しています。こちらも合わせてご覧ください。