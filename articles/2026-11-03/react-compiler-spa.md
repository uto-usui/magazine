---
title: "React Compiler 導入で画面が更新されなくなった話 〜既存SPAでの主要ライブラリとの衝突と解決の記録〜"
source: "https://developers.cyberagent.co.jp/blog/archives/67298/"
publishedDate: "2026-11-02"
category: "frontend"
feedName: "CyberAgent Developers Blog"
author: "技術 / クリエイティブ広報"
---

## はじめに

こんにちは☀️  
株式会社AI Shiftでフロントエンドエンジニアをしているさっちゃんです！（X：[おさわ / 吉岡 爽](https://x.com/sawa__yoshioka)）  
今回は、プロダクトに [React Compiler](https://ja.react.dev/learn/react-compiler) を導入した際に UI に発生した不具合と、その対処について書きます。

私達のプロダクトでは React を採用し、Vite と TanStack Router を用いて、SPA を構築しています。フォームには React Hook Form、一覧には TanStack Table を使っています。  
React Compilerの導入にあたり、導入前の実装をCompilerのON/OFFで比較しました。その中で、React Compiler を有効にしてテストを実行したところ、いくつかの箇所で異常が検知されました。これをきっかけに実際の画面上で動作確認を行った結果、サイドバーが画面遷移に追従しないなど、ユーザーの操作が意図通りにUIへ反映されない不具合が発覚しました。 この記事では、実際の画面の操作へ影響していたこのサイドバーの問題を中心に、設定・切り分け・原因・対処を紹介します。

## この記事について

**想定読者**：React Compiler の導入を検討している方

**書くこと**

-   既存の SPA に React Compiler を導入したときの設定
-   導入前の実装に Compiler を適用し、ON/OFFで挙動を比較した方法
-   TanStack Routerの不具合と、React Hook Form の挙動変化、その原因・対処
-   テストの失敗と、実際の画面への影響を分けて確認したこと

**書かないこと**

-   React Compiler 導入による性能改善の計測結果
-   React Compiler の内部実装の詳細
-   SSR / React Server Components 環境での挙動

## 導入設定

まずは、今回の Vite 8 + Babel プラグイン環境で React Compiler を導入した際の設定を紹介します。

## パッケージの追加

React Compiler を導入するため、以下のパッケージをインストールします。

```
pnpm add -D -E babel-plugin-react-compiler@1.0.0 @rolldown/plugin-babel@0.2.4 @babel/core@8.0.7
```

Vite Ver.8 ではバンドラに [Rolldown](https://rolldown.rs/)、JS/TS や JSX の変換に [Oxc](https://oxc.rs/) が使われています。  
また、 `@vitejs/plugin-react v6` では内部の Babel 依存が排除されました。そのため、今回使用した v6.0.4 で、Babelプラグインとして提供される React Compiler を適用するために、`@rolldown/plugin-babel` を組み合わせました。

また、React Compiler はバージョンアップによってメモ化の挙動が変わる可能性があるため、予期せぬ不具合を防ぐ目的で -E フラグを使い、exact バージョンでインストールしています。

## `vite.config.ts` の実装

Compilerに関係する部分を抜き出すと、次のようになります。

```
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

const compilerPreset = reactCompilerPreset();
compilerPreset.rolldown.filter = {
  ...compilerPreset.rolldown.filter,
  id: { exclude: [/node_modules/, /\.(test|spec)\.[jt]sx?$/] },
};

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.REACT_COMPILER === "false" ? [] : [babel({ presets: [compilerPreset] })]),
  ],
});
```

`@vitejs/plugin-react` が提供する [`reactCompilerPreset()`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#react-compiler) をベースに、この設定に加えてLintも導入しました。

### 1\. `node_modules` とテストファイルを変換対象から外す

まず、`node_modules` 配下のライブラリは自分たちが管理しているコードではないため、変換対象から除外しました。  
また、`.test.*` や `.spec.*` などのテストファイルも外しています。テストコード内で定義したモックやラッパーコンポーネントまで Compiler の対象になってしまうと、テストが失敗したときに、本体の変換による影響なのか、テスト側の変換による影響なのかを切り分けることが難しくなるためです。

### 2\. 環境変数で無効化できるようにする

なにか不具合が起きたとき、それが元のコードの問題か、Compiler による変換の影響かを切り分けやすくするために、`REACT_COMPILER=false` という環境変数を渡すことで、Compiler を無効化した状態で起動・ビルド・テストができるようにしました。

#### Vitest でも Compiler が適用されているか確認する

先ほどテストファイル（`.test.ts` など）自体は変換対象から除外しましたが、テストを実行できても、テスト対象のコードにCompilerが適用されていなければ、導入後の挙動を検証したことにはなりません。

`reactCompilerPreset()` は、Vite の [Environment API](https://ja.vite.dev/guide/api-environment-plugins) において「クライアント向けのビルド・変換時」にのみ Babel（Compiler）を適用するように初期設定されています。  
Vitest 4 では、`jsdom` 環境は実際には Node.js 上で実行されるため、モジュールの読み込み自体は SSR（サーバー）側の仕組みを使います。しかし、Vitest 4 が Vite のプラグインパイプライン（Environment API）を呼び出す際、`jsdom` のようなブラウザの動きを再現する環境では **「コンポーネントの変換（Transform）処理においては Client 環境向けのプラグイン設定を適用する」** という設計になっています ([Vitest のソースコード](https://github.com/vitest-dev/vitest/blob/db616d227b6e0cb07a94f5d1bba262ee95db7e46/packages/vitest/src/integrations/env/jsdom.ts#L45)）。

そのため、開発者が `vite.config.ts` で `applyToEnvironment` などのフックを上書きして「常に全環境でBabelを動かす」といった設定をしなくても、自動的にテスト用のコンポーネントに Compiler が適用されます。

念のため、コンポーネントの関数を文字列化して、Compiler が挿入するキャッシュ（`const $ = ...c(10)` のような記述）が含まれているかを直接確認してみました。

```
import { CommandPalette } from "@/components/ui/CommandPalette";

test("Compiler が適用されている", () => {
  expect(CommandPalette.toString()).toMatch(/const \$ = .*\.c\)\(\d+\)/);
});
```

設定

結果

初期設定のまま

適用される

`REACT_COMPILER=false`

適用されない

初めは、jsdom 環境には自動適用されないのではと疑い、`applyToEnvironmentHook` が常に true を返すように設定を上書きしていました。  
しかし検証の結果、上書きしなくても正しく適用されることがわかりました。

### 3\. Lint で Rules of React を守る

React Compiler が正しく動くには、コードが [Rules of React](https://ja.react.dev/reference/rules) に沿って書かれていることが前提です。

> あなたのアプリケーションでコンパイラを導入できるかどうかは、コードベースの健全性と React のルールをどの程度遵守しているかに依存します。  
> 出典：[React Compiler：安全に使用できるか？](https://ja.react.dev/learn/react-compiler/introduction#is-it-safe-to-use)

Compiler は、最適化を安全に適用できないと判断したコードについて、対象の最適化をスキップすることがあります。

> ルールに違反している可能性のあるコードに遭遇した場合、アプリケーションの動作を変更するリスクを冒すのではなく、最適化を安全にスキップします。  
> 出典：[React Compiler：コンパイラの動作を理解する](https://ja.react.dev/learn/react-compiler/debugging#understanding-compiler-behavior)

これを防ぐため、Oxlint の `react/react-compiler` ルールを `error` レベルで有効にして CI 等で検知できるようにしました。

```
{
  "plugins": ["react"],
  "rules": {
    "react/react-compiler": "error"
  }
}
```

これで Rules of React への違反をある程度未然に防げます。ただし、Lint が通ったからといって Compiler 由来の不具合が完全にゼロになるわけではありません。この記事で紹介する不具合も、Lint では検出できずテストで発覚したものでした。

## 検証方法

テストが失敗した際、それが本当にReact Compiler の変換による影響なのかを正確に切り分ける必要がありました。  
そこで、Compiler 導入前のコードベースに、設定・依存・比較用のテストを持ち込み、Compiler の ON/OFF 以外の条件を完全にそろえた状態を作って検証を行いました。

以下の手順は、Vitest に unit プロジェクトが定義され、jsdom 環境と、先ほどの Vite プラグイン設定を利用する構成を前提にしています。今回の設定では、`extends: true` で親の Vite 設定を引き継いでいます。関係する部分を抜き出すと、次のようになります。

```
// vite.config.ts
// pluginsなどは、前述のCompiler設定と同じ
export default defineConfig({
  plugins: [
    // 前述のViteプラグイン設定
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
        },
      },
    ],
  },
});
```

## 手順

```
# 導入直前のコミットを別ディレクトリに展開する
git worktree add ../before <導入直前のコミット>
cd ../before

# Compiler の設定・依存と、比較に使うテストを、導入後のコミットから持ってくる
git checkout <導入後のコミット> -- package.json pnpm-lock.yaml vite.config.ts <対象のテストファイル>
pnpm install

# Compiler 無効
REACT_COMPILER=false pnpm vitest run --project unit <対象のテストファイル>

# Compiler 有効
pnpm vitest run --project unit <対象のテストファイル>
```

Compiler の切り替えには、前の章で用意した環境変数 `REACT_COMPILER` を使いました。

## 結果

フォーム・ナビゲーション・共通 UI に関わる77件のテストで比べた結果です（導入時点の計測）。

実装

Compiler

結果

導入前

無効

77件成功

導入前

有効

71件成功・**6件失敗**

対応後

有効

77件成功

失敗した6件は、次の2種類に分かれました。

種類

件数

症状

TanStack Router を使ったサイドバー

2件

SPA内の遷移後、子ページを含むグループが開かない

React Hook Form を使ったダイアログ

4件

キャンセル直後、終了アニメーション中の入力欄に編集値が残る

これらの失敗がテスト環境特有のエラーなのか、実際のUIに影響するものなのかを確かめるため、ブラウザ上で実際に操作して挙動を確認しました。  
結果として、どちらも Compiler によって実際に画面の挙動が変わってしまった状態でした。ただし、ユーザーへの影響は異なります。サイドバーは現在地のリンクが見えなくなる一方、ダイアログは終了アニメーション中だけ値が残り、再表示時には初期化されていました。

## 対応の概要

見つかった2つの問題には、それぞれ次のように対処しました。

問題

今回の対処

次のステップ

サイドバーのグループが開かない（TanStack Router）

`useMatchRoute` を、毎回新しい関数を返すラッパーフック経由で使う

修正済みの TanStack Router v1.170.27 以降へ上げ、ラッパーを外す

キャンセル直後に入力値が残る（React Hook Form）

対象のダイアログに `"use no memo"` を付け、Compiler の変換対象から外す

`reset()` に `keepFieldsRef: true` を指定し、`"use no memo"` を外す

どちらも、導入時点では既存の挙動を確実に保つことを優先した一時的な対応です。  
特にダイアログの `"use no memo"` は、Compiler の最適化をあきらめることで不具合を避けている状態です。本来は、Compiler の最適化を受けたまま直せる `keepFieldsRef` に移行を検討しています。  
なお、サイドバー側の `"use no memo"` は数行のラッパーフックにだけ付けており、サイドバーのコンポーネント自体は引き続き Compiler で最適化されています。

## 壊れたもの：サイドバーの外から移るとグループが開かない

## 症状

サイドバーでは、関連する子ページのリンクを、開閉できる見出しの下にまとめています（以下、グループと呼びます）。  
現在のページがグループ内の子ページであれば、そのグループを自動で開き、現在地がわかるようにしています。

しかし、サイドバー以外の導線から、ページ全体を再読み込みせずに子ページへ遷移すると、ページ本体は切り替わるのに、サイドバーのグループが開きませんでした。  
例えば、アプリ概要から設定グループ内の子ページへ遷移すると、ページ本体は切り替わるのに、サイドバーの設定グループは閉じたままになっていました。

👇 再現用の簡易アプリで、ダッシュボードのカードから「通知」へ移動したときの動き

**Before（修正前）**：ページは切り替わるが、サイドバーの「設定」は閉じたまま  
![](https://static.zenn.studio/user-upload/a1463161c30c-20261027.webp)

**After（修正後）**：「設定」が開き、パンくずも「通知」に更新される  
![](https://static.zenn.studio/user-upload/8ba2d0f9ba56-20261027.webp)

サイドバーは、以下のように `useMatchRoute()` でリンクがアクティブかどうかを判定し、その判定関数をグループのコンポーネントに渡していました。

```
function NavEntryItem({ entry, params }: Props) {
  const matchRoute = useMatchRoute();
  const isActive = (link: NavLink) => matchRoute({ to: link.to, params }) !== false;

  return <NavGroupItem entry={entry} isActive={isActive} />;
}

function NavGroupItem({ entry, isActive }: GroupProps) {
  const hasActiveChild = entry.children.some(isActive);
  // hasActiveChild が true になったらグループを開く
  // ...
}
```

## 原因

### `useMatchRoute` が返す関数は、URL が変わっても同じ参照のままだった

今回使用していた TanStack Router v1.170.18 では、`useMatchRoute()` の実装は次のようになっていました。型やオプションの処理を省略しています。

**実際のソースコード**[Matches.tsx の実装](https://github.com/TanStack/router/blob/58c005fcb1a0618ec8c5b96b2b5fe3ccab5736c5/packages/react-router/src/Matches.tsx#L141-L171)

```
export function useMatchRoute() {
  const router = useRouter()
  useStore(router.stores.matchRouteDeps, (d) => d)

  // 👇 router インスタンスだけを依存配列にしている
  return React.useCallback((opts) => router.matchRoute(/* options を渡す */), [router])
}
```

ブラウザ側ではルーターの状態を購読しているので、URLが変わると、このフックを使うコンポーネントは再レンダーされます。  
一方、返す関数の依存配列は `[router]` なので、同じ router インスタンスを使っている間、URLが変わっても関数の参照は変わりません。

しかし `matchRoute` は、引数だけで結果が決まるわけではなく、「現在の URL」を読み取って判定を行っています。  
ソースコードを確認してみると、`router.matchRoute()` は、呼び出された時点の現在地をルーターの内部状態から読み取っていました。

**実際のソースコード** [router.ts の実装](https://github.com/TanStack/router/blob/58c005fcb1a0618ec8c5b96b2b5fe3ccab5736c5/packages/router-core/src/router.ts#L2977-L2987)

```
// 👇 呼ばれた瞬間に、ルーターから現在地を取得している
const baseLocation = this.stores.resolvedLocation.get() || this.stores.location.get()
const match = findSingleMatch(next.pathname, /* ... */ baseLocation.pathname, /* ... */)
```

同じ `matchRoute({ to: "/settings" })` という呼び出しでも、現在の URL によって戻り値が変わります。一致した場合はルートパラメータのオブジェクト、不一致なら `false` です。そのため、次の式は、アプリ概要ページでは `false`、設定ページでは `true` になります。

```
matchRoute({ to: "/settings" }) !== false;
```

この「参照は同じでも、内部状態によって結果が変わる」という性質が、今回のメモ化と衝突しました。

### Compilerによって何がキャッシュされたのかを確認する

実際のコンポーネントを `babel-plugin-react-compiler@1.0.0` で変換すると、`isActive` の生成に次のようなキャッシュが入っていました。

```
// 【1】matchRoute や params の参照が変わったかチェック
if ($[0] !== matchRoute || $[1] !== params) {
  t1 = (link) => matchRoute({ to: link.to, params }) !== false; // 新しく関数を作る
  $[0] = matchRoute;
  $[1] = params;
  $[2] = t1; // 作った関数をキャッシュに保存
} else {
  // どちらも変わっていなければ、前回の関数（キャッシュ）を使い回す！
  t1 = $[2];
}
const isActive = t1;

// 【2】NavGroupItem に渡す props（entry や isActive）が変わったかチェック
if ($[3] !== entry || $[4] !== isActive) {
  t2 = <NavGroupItem entry={entry} isActive={isActive} />; // 新しいJSX要素を作る
  // ...
}
```

ここで登場する変数は、それぞれ次のものを表しています。

-   `matchRoute`：`useMatchRoute()` が返す、指定した遷移先が現在の URL に一致するか判定する関数です。一致するとルートパラメータのオブジェクト、不一致なら `false` を返します。
-   `params`：遷移先の URL を組み立てるためのルートパラメータです。IDやslug、環境などが入ります。同じID・環境内で概要ページから設定ページへ移る場合、これらの値は変わりません。
-   `entry`：サイドバーに表示する項目の定義です。グループの場合は、「設定」のような見出しや、配下に表示する子リンクの情報を持っています。現在のページが変わっても、グループの定義自体は変わりません。
-   `$`：Compiler がコンポーネントのインスタンスごとに用意するキャッシュ用の配列です。`$[0]` には前回の `matchRoute`、`$[1]` には前回の `params`、`$[2]` には生成した判定関数を保存しています。
-   `t1`・`t2`：Compiler が生成した一時変数です。`t1` には `isActive` として使う判定関数、`t2` には `<NavGroupItem ... />` という JSX 要素が入ります。

今回の実装では、`entry` はコンポーネントの外に定義した固定の項目一覧から渡しています。また、Compiler によって、親が作る項目一覧の JSX もキャッシュされていました。今回のページ遷移ではそのキャッシュが再利用されたため、JSX に含まれる `params` オブジェクトも作り直されませんでした。このため、子が URL の変更を受けて再レンダーされても、`entry` と `params` は前回と同じ参照のままでした。

この結果を読み解くと、以下のようになります。

1.  URL が変わり、`useMatchRoute()` の購読によって親が再レンダーされる
2.  `matchRoute` と `params` の参照が変わらないため、Compiler によって `isActive` が再利用される
3.  `entry` と `isActive` の参照も変わらないため、子へ渡す JSX が再利用される
4.  この経路では `NavGroupItem` の再レンダーが省略され、`hasActiveChild` が再計算されない
5.  子ページへ移っても、グループが閉じたままになる

Compiler なしなら、毎回のレンダーで `matchRoute(...)` が呼び直されるため、この問題は表に出ていませんでした。

## 対処

### 毎回新しい関数を返すラッパーを作る

`useMatchRoute` を直接使わず、次のラッパーフックを経由するようにしました。

```
import { useMatchRoute } from "@tanstack/react-router";

export function useReactiveMatchRoute() {
  "use no memo";
  const matchRoute = useMatchRoute();
  const reactiveMatchRoute: typeof matchRoute = (options) => matchRoute(options);
  return reactiveMatchRoute;
}
```

やっていることは、`matchRoute` を実行するだけの関数をレンダーのたびに新しく作って返すことだけです。

`"use no memo"` ディレクティブをつけることで、このラッパーフック自体が Compiler に最適化されるのを防いでいます。  
`"use no memo"` は、関数単位で Compiler の変換を止めるディレクティブです。  
これにより、URL が変わって useMatchRoute の購読によって再レンダーが走るたびに、呼び出し元には必ず前回と違う参照を持った新しい関数が返るようになります。

呼び出しは以下のように変更しました。

```
function NavEntryItem({ entry, params }: Props) {
  const matchRoute = useReactiveMatchRoute();

  const isActive = (link: NavLink) =>
    matchRoute({ to: link.to, params }) !== false;

  return <NavGroupItem entry={entry} isActive={isActive} />;
}
```

URLが変わると、元の `useMatchRoute()` の購読によって再レンダーが発生します。その際、ラッパーからは新しい関数が返ります。

その結果、呼び出し側のコンポーネントでは Compiler のキャッシュ判定 `（$[0] !== matchRoute）` が正しく外れるようになり、`isActive` の再計算も、`<NavGroupItem>` の再描画も正常に行われるようになりました。

## 挙動が変わったもの：終了アニメーション中の入力リセット

## 症状

各種フォームのダイアログにおいて、値を入力してからキャンセルでダイアログを閉じるアニメーションの中で、入力値が残ってしまっていてテストが落ちていました。  
再度ダイアログを開くと残っていなかったため、ユーザーへの影響は少ないと判断しましたが、こちらも原因を調査して対処しました。

```
function AccountCreateDialog({ isOpen, onClose }: Props) {
  const { register, reset } = useForm({ defaultValues: { name: "" } });

  const close = () => {
    onClose();
    reset({ name: "" }); // ← ここでリセットしている
  };

  return (
    <Dialog isOpen={isOpen}>
      <input {...register("name")} />
      <button onClick={close}>キャンセル</button>
    </Dialog>
  );
}
```

## 原因

原因は、**React Compiler のキャッシュ**、**React Hook Form の `reset()` の仕組み**、**React の ref コールバックの仕組み**の3つが組み合わさったことでした

実際のダイアログコンポーネントを React Compiler で変換すると、`register("name")` の呼び出しは次のようにキャッシュされていました（出力コードの抜粋）。

```
if ($[25] !== register) {
  // register の参照が前回と違う場合（初回レンダーなど）
  t12 = register("name"); // 関数を実際に呼び出して結果を取得
  $[25] = register;       // 今回の register の参照をキャッシュに保存
  $[26] = t12;            // 呼び出した結果をキャッシュに保存
} else {
  // register の参照が変わっていない場合
  t12 = $[26];            // 関数を呼び出さず、前回の結果を使い回す
}
```

-   `$`: 今回はインデックス 25 の枠に register 関数の参照を、26 の枠にその実行結果が保存されていました。
-   `t12`: register("name") の実行結果（onChange や ref などが含まれたオブジェクト）が代入され、最終的に JSX 側で `<input {...t12} />` のように展開されます。

Compiler は **`register` 関数の参照が前回と同じなら、関数を呼び出さずに前回の結果を使い回す** という最適化を行ってくれます。  
この最適化が、React Hook Form の2つの仕様とぶつかりました。

### React Hook Form が持つ2つの仕様

1.  **`register` 関数は常に同じ参照だが、呼んだ結果は毎回新しい**  
    `useForm` が返す `register` 関数は、最初のレンダーで一度だけ作られ、その後は再レンダーされても同じ参照のままです。  
    一方、`register("name")` を呼んだ結果（戻り値）は、呼ぶたびに新しく作られます。戻り値に含まれる ref コールバック（`ref` に渡す関数）が、毎回新しい関数になるためです。
    
2.  **今回の `reset()` は登録済みフィールドの参照を破棄する**  
    今回は保持オプションを指定していないため、フォームの値をリセットするとともに、React Hook Form が内部で保持するフィールドの参照も破棄されます。
    
    > Reset the entire form state, **fields reference**, and subscriptions.  
    > （出典：[React Hook Form 公式ドキュメント - reset](https://react-hook-form.com/docs/useform/reset)）
    
    React Hook Form は、**「直後の再レンダーで再び `register("name")` が呼ばれ、入力欄が登録し直されること」** を前提に動いています。  
    `keepFieldsRef: true` を指定すると、今回のリセットでフィールド参照を保持できます。後ほど、この方法も紹介します。
    

### なぜ画面に古い値が残るのか

1.  **Compiler が `register("name")` の呼び出しをスキップする**  
    `register("name")` の引数 `"name"` は固定値であり、`register` 関数の参照も再レンダー間で変わりません。  
    Compiler は「同じ関数を同じ引数で呼ぶなら結果も同じはず」と判断し、2回目以降のレンダーで **`register("name")` の実行をスキップして前回の戻り値（ref コールバック等を含むオブジェクト）をそのまま使い回します**。
2.  **React が ref コールバックを呼び直さない**  
    同じ入力 DOM が維持されている再レンダーでは、ref コールバックの参照も同じなら、React は ref コールバックを呼び直しません。今回、終了アニメーション中はこの条件に当てはまり、入力欄の再登録と値の書き込みが行われませんでした。
3.  **React Hook Form が画面を更新できない**  
    React Hook Form は、この ref コールバックが実行されるタイミングで入力欄を内部に再登録し、`reset()` 後の値を DOM へ書き込んでいます。ref が呼ばれないため、**DOM への書き込みも再登録も行われません**。

その結果、終了アニメーション中の入力欄には編集した値が残りました。一方、閉じ切った後は入力 DOM がアンマウントされます。再表示時には同じ ref コールバックでも呼び出されるため、初期値が反映されました。

## 対処

今回のPRでは、従来の「キャンセル直後に入力をリセットする」挙動を維持するため、対象ダイアログを Compiler の変換対象から外しました。  
`register()` と `reset()` を組み合わせて使うダイアログは、コンポーネントの関数本体の先頭に `"use no memo"` を書くように対処しました。

```
function AccountCreateDialog({ isOpen, onClose }: Props) {
  "use no memo";

  const { register, reset } = useForm({ defaultValues: { name: "" } });
  // ...
}
```

`"use no memo"` を指定したコンポーネントは、その内部で生成される JSX や関数（子コンポーネントへ渡す props など）も Compiler のキャッシュ対象外となります。 局所的に最適化の恩恵は受けられなくなりますが、これ以外の独立したコンポーネントは引き続き Compiler で最適化されます。

あわせて、「閉じてもう一度開いたあとも、入力と検証が正しく動く」ことを確かめるテストを追加し、キャンセル直後に入力欄が空になっているかだけでなく、フィールドが登録し直されているかまで確認するようにしました。

今回はダイアログがアンマウントされるため再表示時には正常に戻っていましたが、仮にページに残り続けるフォームだった場合、`reset()` 以降は React Hook Form と DOM の紐付けが完全に切れてしまい、送信（submit）や値の取得ができなくなるという、より深刻な不具合に発展していた可能性があります。

### 本来望ましい対処：`keepFieldsRef`

「対応の概要」で触れたとおり、今回の `"use no memo"` は一時的な対応です。  
今回の挙動変化は、次の流れで起きていました。

1.  `reset()` がフィールドの参照を破棄する
2.  そのため、次のレンダーで `register("name")` を呼んで登録し直す必要がある
3.  ところが Compiler が `register("name")` の呼び出しをスキップするため、登録し直されない

`"use no memo"` は、3. の Compiler の変換を止めて、**登録し直しが起きるようにする** 対処です。  
一方、1. の破棄そのものをやめて、**登録し直しを不要にする** 方法もあります。それが `reset()` の `keepFieldsRef` オプションです（v7.60.0 以降）。

```
reset(defaultValues, { keepFieldsRef: true });
```

このオプションを付けると、`reset()` は入力欄の登録を残したまま、登録済みの入力欄に直接値を書き込みます。  
今回失敗した4つのダイアログでは、対応する `reset()` に `keepFieldsRef: true` を指定すると、`"use no memo"` を外してもキャンセル直後の入力値がリセットされました。

対処

よい点

気になる点

`"use no memo"`

コンポーネントの先頭に1行足すだけ。React Hook Form の挙動を変えない

そのコンポーネントは Compiler の最適化を受けられない

`keepFieldsRef: true`

Compiler の最適化を受けたまま直せる

対象フォームでフィールド参照を保持する設定が必要。条件によって表示・非表示が切り替わる入力欄がある場合は、影響の確認が必要

## 壊れなかったけど先に手を打ったもの

テストが落ちたり実際に画面が壊れたりしたわけではありませんが、React Compiler 導入にあたって、事前に手を打った（コードを変更した）箇所もあります。

特に、React Compiler の[互換性のないライブラリ](https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library)として、互換性が現在確認されていないライブラリについては、先行事例（[React Compilerについて調べてみた](https://techblog.raksul.com/entry/2025/12/21/155521)、[React Compiler導入で得られた効果と気をつけたいポイント](https://kakehashi-dev.hatenablog.com/entry/2026/03/24/090000)）も参考にしながら、バグを踏む前に対策を入れています。

## TanStack Table には `"use no memo"` を指定

TanStack Table（`@tanstack/react-table`）は、Compiler との互換性に問題があるライブラリとして名前が挙がっています。  
そのため、DataTable コンポーネントには `"use no memo"` ディレクティブを指定し、安全のために Compiler の変換対象から外しました。これにより、このコンポーネント内で定義するカラム定義や配下の子コンポーネントへの props も Compiler の最適化対象外となりますが、 予期せぬバグを防ぐため現時点では互換性を優先しています。  
なお、検証時点の TanStack Table は v8 です。公開時点では v9 がリリースされていますが、v9 と Compiler の組み合わせは今回検証していません。

## RHF の `watch()` を `useWatch()` に変更

React Hook Form の `watch()` メソッドも、Compiler との組み合わせで問題が起きやすいことが公式から指摘されています。  
そのため、フォームの値を購読してUIを切り替えるような箇所は、フックである `useWatch()` を使用する形へすべて書き換えました。

## 手動の `useMemo` の削除

CommandPalette などのコンポーネントで過去に手動で書いていた `useMemo` は削除しました。  
これはバグ対策というより、「今後のメモ化は Compiler に任せる」という方針に基づいたコードの整理です。

## まとめ

React Compiler を導入し、一部の手動メモ化を Compiler に任せる形へ整理しました。しかし今回の検証で見えてきたように、外部ライブラリとの組み合わせでは、過剰なキャッシュが原因でバグを引き起こすことがあります。

今回は、Compiler の ON/OFF で挙動を比較し、変換結果とライブラリの実装を確認することで、必要な互換性対応を判断できました。  
また、テストが失敗した場合も、どのタイミングで挙動が変わり、ユーザーの操作にどう影響するのかまで確かめることが大切だと感じました。

この記事での調査の過程や回避策のアイデアが、これから React Compiler をプロダクトに導入しようとしている方の参考になれば幸いです！

## 最後に

AI Shiftではエンジニアの採用に力を入れています！  
少しでも興味を持っていただけましたら、カジュアル面談でお話しませんか？  
（オンライン・19時以降の面談も可能です！）  
[【面談フォームはこちら】](https://hrmos.co/pages/cyberagent-group/jobs/1826557091831955459)