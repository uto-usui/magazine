---
title: "Reactはここまで変わった！ メモ化・Effect・アニメーションの最新事情"
source: "https://ics.media/entry/261119/"
publishedDate: "2026-11-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ウェブ開発で圧倒的なシェアを誇るReact。[前回の記事](https://ics.media/entry/260903/)ではユーザー体験の改善に使える便利機能を紹介しました。

続編となるこの記事では開発時に便利な機能を紹介します。パフォーマンスの改善に役立つ機能や、複雑なアニメーションを簡単に実装するコンポーネントなど、魅力的な機能があります。ぜひこの機会にキャッチアップしましょう！

### コンポーネント間のアニメーションが簡単に

画面遷移やコンポーネントを切り替えたときに、いい感じにアニメーションさせたいと思ったことはないでしょうか？　2023年3月にChrome 111で利用できるようになったView Transitions APIでは、連続性のあるアニメーションの実装が格段に楽になりました（参考：『[View Transitions API入門 - 連続性のある画面遷移アニメーションを実現するウェブの新技術](https://ics.media/entry/230510/)』）。

**React 19.3（2026年9月リリース）ではView Transitions APIをベースにした`<ViewTransition>`コンポーネントが安定版になりました！**

#### `<ViewTransition>`でコンポーネントの切り替えをアニメーション

`<ViewTransition>`コンポーネントを使うと要素の表示・非表示、並び替え、移動などを簡単にアニメーションできます。次の例ではユーザーリストの並び替えをアニメーションしています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261119_latest-react-2/#/view-transition)
-   [コードを確認する](https://github.com/ics-creative/261119_latest-react-2/blob/main/src/pages/ViewTransition/ViewTransitionPage.jsx)

ポイントは以下です。

-   並び順（`sortKey`）を`state`として保持しておく
-   並び順の切り替えを`startTransition`関数でラップする
-   アニメーションさせたいコンポーネントを`<ViewTransition>`で囲む

```
import { startTransition, useState, ViewTransition } from "react";

export const ViewTransitionPage = () => {
  // 並び順
  const [sortKey, setSortKey] = useState("name");
  // 並び替え後のユーザーの配列
  const sortedUsers = [];

  const changeSort = (nextSortKey) => {
    // 並び順の切り替え
    startTransition(() => setSortKey(nextSortKey));
  };

  return (
    <div className="view-transition">
      {/** 省略 */}
      <UserList users={sortedUsers} />
    </div>
  );
};

const UserList = ({users}) => (
  <ul>
    {users.map((user) => (
      <ViewTransition key={user.id}>
        {/** 子要素が入ります */}
      </ViewTransition>
    ))}
  </ul>
);
```

たったこれだけで連続性のあるアニメーションが実装できました。

#### なぜ`startTransition`が必要？

`state`の更新をトリガーにして`<ViewTransition>`でアニメーションさせる際、`state`更新を`startTransition`でラップしないとアニメーションが動きません。

[前回の記事](https://ics.media/entry/260903/)で紹介した`useTransition`フックや今回の`startTransition`関数は「トランジション」というReactの概念をあつかうためのものです。トランジションは`state`の更新の優先度を下げる仕組みです。`<ViewTransition>`ではトランジションを利用した実装のほか、前回紹介した`<Suspense>`コンポーネントや`useDeferredValue`関数と組み合わせることもできます。

### 再レンダリングの最適化は自動で

`useMemo`、`useCallback`などのフックや`memo`関数は不要な再計算や再レンダリングを減らすために使われてきました（参考：『[React Hooks入門](https://ics.media/entry/201106)』）。この処理は「メモ化」と呼ばれ、便利な反面アプリ全体で適切に使わないとあまり意味がなかったりします。

▼メモ化の例

```
import { memo, useCallback, useMemo } from "react";

const SomeComponent = ({ id, text, onClickButton }) => {
  // 重い処理をuseMemoでキャッシュする
  const formatted = useMemo(() => expensiveFunc(text), [text]);
  // メモ化されたコンポーネント（SomeButton）の再レンダリングを抑制するためuseCallbackを使う
  const handleClick = useCallback(() => onClickButton(id), [onClickButton, id]);

  return (
    <>
      <p>{formatted}</p>
      <SomeButton onClick={handleClick} />
    </>
  );
};

// memo()でコンポーネントをメモ化する
const SomeButton = memo(({ onClick }) => (
  <button type="button" onClick={onClick}>
    Some Button
  </button>
));
```

#### `React Compiler`を使えば手動のメモ化はほぼ不要に

[React Compiler](https://ja.react.dev/learn/react-compiler)はReactのアプリを自動的に最適化してくれるビルドツールです。Viteをはじめ複数の環境で使えます。

ほとんどの場合で独自のメモ化は不要になるため、先ほどのコードはここまでスッキリします。積極的に使っていきましょう！

```
export const SomeComponent = ({ id, text, onClickButton }) => (
  <>
    <p>{expensiveFunc(text)}</p>
    <NoMemoButton onClick={() => onClickButton(id)} />
  </>
);

const SomeButton = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Some Button
  </button>
);
```

※React Compilerのインストールについて詳細は[公式ドキュメント](https://ja.react.dev/learn/react-compiler/installation)をご確認ください。ViteやNext.js、React Router等お使いの環境によって別途プラグインのインストールや設定が必要です。

### Effectの不要な再実行を防ぐ

`useEffect`フックは、依存配列に含まれる値が変化すると処理を実行します。また、処理で使う`state`などのリアクティブな値は必ず依存配列に含めるルールです。**`useEffect`フック内で`state`を読む処理を行う場合、依存配列に加えたことで思わぬタイミングで処理が実行される場合があります。**

例を見てみましょう。以下は5秒ごとに入力内容を自動的に保存して表示する簡単なメモアプリです。しかし、左側の「Only useEffect」は**入力するごとにタイマーが元に戻ってしまい保存されません。**

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261119_latest-react-2/#/effect-event)
-   [コードを確認する](https://github.com/ics-creative/261119_latest-react-2/blob/main/src/pages/EffectEvent/NoEffectEvent.jsx)

原因は`useEffect`の依存配列に含まれる`content`ステートです。

`content`は`useEffect`内で利用されるので必ず依存配列に含めます。ユーザーが入力すると`content`が変更され`useEffect`内の処理が実行されます。入力ごとに以下の1〜5が繰り返され、いつまでたっても保存されません。

1.  ユーザーが画面で入力する
2.  `content`が変更される
3.  `useEffect`の処理が実行される
4.  自動保存を開始する（5秒後に保存を予約するだけ。この時点では保存されない）
5.  タイマーを起動する（5秒からスタートし直す）

```
// 入力値
const [content, setContent] = useState("");
// 保存された値
const [saved, setSaved] = useState("");
// 保存までのカウントダウン
const [secondsRemaining, setSecondsRemaining] = useState(5);

useEffect(() => {
  // 自動保存を開始する
  const stopAutoSave = autoSave(() => setSaved(content));
  // カウントダウンを開始する
  const stopCountdown = countdown(setSecondsRemaining);
}, [content]); // useEffectで使われるstateは必ず依存配列に入れる
```

#### `useEffectEvent`で処理の責務を分ける

`useEffectEvent`はEffectから呼ばれる処理のなかで、**最新の`state`を読みたいけれど、`state`の変更には追従したくないとき**に使います。

今回の例では、画面から入力した値（`content`）の中身は読みたいけど、入力のたびに`useEffect`が実行されては困るため`useEffectEvent`を使いました。

```
const [content, setContent] = useState("");
const [saved, setSaved] = useState("");
const [secondsRemaining, setSecondsRemaining] = useState(5);

// useEffectEventの中で保存する
const saveDraft = useEffectEvent(() => {
  setSaved(content);
});

useEffect(() => {
  const stopAutoSave = autoSave(() => saveDraft());
  const stopCountdown = countdown(setSecondsRemaining);
}, []); // 依存配列からcontentを排除できる
```

`useEffect`を使った保存の開始と、最新の`content`を実際に保存する処理を分けることができました。デモの右側「With useEffectEvent」の方は意図どおり5秒ごとに保存・表示が実行されます。

#### `useEffectEvent`は回避策として使わない

`useEffectEvent`は便利ですが、むやみに使うのは避けましょう。そもそも`useEffect`自体が取扱注意なフックです。**`useEffect`を多用すると思ってもいない副作用があったり、ムダな処理が走りがちです。**

`useEffect`の再実行を避けるためだけに`useEffectEvent`を使うと、どの値の変化によって処理が実行されるのかコードから読み取りにくくなります。

Reactの公式ドキュメントでも「[そのエフェクトは不要かも](https://ja.react.dev/learn/you-might-not-need-an-effect)」という記載があります。**`useEffect`や`useEffectEvent`はどうしても必要なとき以外は使わないようにしましょう。**

### パフォーマンスを可視化

Reactは便利なライブラリーですが、前述の通り画面更新のフックや再レンダリング、アニメーションなどを組み合わせると処理がどんどん複雑化します。

#### パフォーマンストラックで処理の順番を確認できる

React 19.2（2025年10月リリース）ではChrome DevToolsの「パフォーマンス」タブに「パフォーマンストラック」が追加されました。どの処理がどのタイミングで実行されているのか、いつレンダリングされるのかを可視化できます。

#### 使い方

`pnpm dev`などの開発用コマンドでアプリを立ち上げた場合はデフォルトで表示されます。

1.  画面を右クリックし、メニューから「検証」を選択してChrome DevToolsを開く
2.  「Performance」タブを選択
3.  左上の「Record」ボタンを押下する
4.  画面から操作などを行い、録画を止める

![パフォーマンストラック](https://ics.media/entry/261119/images/261119_performance-tracks.jpg)

前回の記事のデモのうち`useTransition`を使って`state`更新の優先度をさげた実装を、パフォーマンストラックで確認してみましょう。

※本番用のビルドではパフォーマンストラックはOFFになっているため確認できません。このデモではパフォーマンストラックが確認できるよう「プロファイリングビルド」を使用しています。詳細は[公式ドキュメント](https://ja.react.dev/reference/dev-tools/react-performance-tracks#using-profiling-builds)を確認してください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/261119_latest-react-2/#/transition)
-   [コードを確認する](https://github.com/ics-creative/261119_latest-react-2/blob/main/src/pages/Transition/Transition.jsx)

`useTransition`フックを使った方（`<Transition>`コンポーネント）と使っていない方（`<NoTransition>`コンポーネント）を比べてみると、フックを使った方は「Suspended」や「Action」という表示があることがわかります。

![スケジューラー](https://ics.media/entry/261119/images/261119_scheduler.jpg)

**「Scheduler」トラック**

「Suspended」や「Action」の表示があった「Scheduler」トラックは、React内部での処理を表します。それぞれ以下のような処理を可視化します。

-   Blocking: ユーザー操作に伴う更新など
-   Transition: `useTransition`や`<ViewTransition>`に使用した`startTransition`で開始される処理
-   Suspense: `<Suspense>`でのフォールバックの表示など
-   Idle: 一番優先度の低い処理

**「Components」トラック**

「Components」トラックは、コンポーネントがレンダリングされる順番とその処理時間を見られます。この例では`<NoTransition>`や`<ToggleGroup>`といったデモ内のカスタムコンポーネントが表示されています。

![コンポーネンツトラック](https://ics.media/entry/261119/images/261119_components.jpg)

### コラム:ルール違反を事前に検知する

意図しない挙動やパフォーマンスの低下を避けるため、アンチパターンの実装は静的に検証するのが効果的です。

コードのルールをチェックするのに広く使われているESLintイーエスリントやOxlintオーエックスリントを使うと、ルール違反を事前に検証できます。

ESLintには環境に合わせてルールを追加できるプラグインがあり、Reactを使うときに便利なのが`eslint-plugin-react-hooks`プラグインです。以下のようなよくある間違いをしていないか確認するのに役立ちます。

-   `useEffect`などのフックの依存配列に必要なものが揃っているか
-   `useEffect`で不要な同期的`state`更新をしていないか
-   レンダー中に`state`を更新していないか
-   返り値のない`useMemo`がないか

Reactを使うならチェックツールも一緒に導入することをオススメします。

### まとめ

開発時に役立つReactの便利な機能を紹介しました。今まで大量のコードを書かないと実現できなかったアニメーションが簡単になったり、メモ化が自動になったりと、Reactや周辺技術はどんどん進化しています。

ぜひ新しい機能をチェックして開発体験を向上していきましょう！