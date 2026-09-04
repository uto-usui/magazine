---
title: "useStateとuseEffectだけじゃもったいない！ ユーザー体験を改善するReactの便利機能"
source: "https://ics.media/entry/260903/"
publishedDate: "2026-09-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ウェブ開発で圧倒的なシェアを誇るReact。バージョンが上がるごとにいろいろな便利機能・コンポーネントが追加されていますが、正直`useState`や`useEffect`ばかり使っている、他の機能はあまり詳しくない、という方もいるのではないでしょうか？

この記事では、ユーザー体験を改善できる便利なフックやコンポーネントを紹介します。アプリケーションにおいてユーザー体験がよいことは意外と重要です。なんだか遅いという印象を与えてしまい、アプリが使われなくなったり、ウェブサイトの画面が閉じられてしまったらもったいないですよね。

Reactの機能にあまり詳しくない方や、なかなかアップデートにキャッチアップできていない方は、この機会に一気に知識を底上げしましょう！

※この記事に登場する機能は、主にReact 18、19以降で追加されたものです。

### ユーザーを待たせない

データの取得や更新には待ち時間が発生します。待っている間はローディング画面を表示するのが一般的ですが、**処理が遅くて待たされたり、一瞬ローディングがチラつくなど、ユーザーの体験を損なうこともあります。**

#### `<Suspense>`で準備できた部分から見せる

`<Suspense>`コンポーネントは、子要素の読み込みが完了するまで`fallback`を表示します。複数のコンポーネントを別々の`<Suspense>`で管理すると、**準備ができたところから表示でき、待たされている感を軽減します。**

次の例ではユーザー一覧、ユーザーのプロフィール、関連記事の3つを別々の`<Suspense>`で管理しています。読み込み中は`fallback`に指定したスピナーを表示し、準備ができた部分から表示されます。

```
import { Suspense } from "react";

export const UserPage = () => {
  // ----- 関連箇所だけ抜粋しています -----
  return (
    <div className="loading-suspense">
      <Suspense fallback={<Spinner />}>
        <UserList onClick={onClick} resource={users} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <UserProfile resource={currentUser} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <RelatedArticles resource={articles} />
      </Suspense>
    </div>
  );
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260901_latest-react/#/suspense)
-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Suspense/LoadingSuspense.jsx#L90)

Reactを実務で使う際はJotai、TanStack Queryといった状態管理・データ取得ライブラリや、Next.jsのようなフレームワークとセットで導入することが多いでしょう。これらはサスペンスに対応しているため、意外と簡単に`<Suspense>`を導入できます。

サスペンス対応ライブラリを使っていない場合も、Reactの`use`や`lazy`と一緒に使う方法もあります。詳細を知りたい方は公式ドキュメント「[Suspense – React](https://ja.react.dev/reference/react/Suspense)」をご確認ください。

#### `useTransition`で`state`更新の優先度を下げる

商品の料金を表示するUIを考えてみましょう。画面操作をすると料金計算が行われ、その都度表示が変化します。料金計算に少し時間がかかる場合、画面操作を頻繁に行うと表示が何度も切り替わり操作感がよくありません。

そこで使えるのが`useTransition`フックです。**戻り値である`startTransition()`関数のなかで実行される状態更新は、優先度が低い更新とみなされます。優先度が低い`state`更新は、ユーザー入力などのより優先度が高い更新により中断されます。**更新中かどうかは同じく`useTransition`の戻り値である`isPending`フラグで管理できます。

以下のデモでは、計算処理と合計金額の状態更新を`startTransition()`のなかで行います。計算処理が何度も行われた場合、合計金額の更新は中断され最後の計算処理が終わってから更新されます（計算処理がスキップされるのではなく`state`の更新処理が中断されます）。

```
export const Transition = () => {
  // ----- 関連箇所だけ抜粋しています -----
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(2700);

  // useTransitionフック
  const [isPending, startTransition] = useTransition();

  const handleQuantityChange = (event) => {
    const nextQuantity = Number(event.target.value);
    setQuantity(nextQuantity);
    startTransition(async () => {
      // 時間がかかる計算処理はstartTransitionを使う
      const calculated = await calculateTotal(color, size, nextQuantity);
      startTransition(() => {
        // 再度startTransitionでstateを更新
        setTotal(calculated);
      });
    });
  };

  return (
    <div className="transition">
      <div className="transition__controls">
        {/** 数量を変更 */}
        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <dl className="transition__results">
        <dt>Total:</dt>
        {/** pending中は「calculating...」表示を出す */}
        <dd>{isPending ? "calculating..." : `¥${total.toLocaleString()}`}</dd>
      </dl>
    </div>
  );
};
```

色・サイズ・数量を素早く変えてみてください。`useTransition`を使わない方は何度も数値が変更されるのに対し、使っている方は計算中に「calculating…」が表示され、計算が完了してから1度だけ表示します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260901_latest-react/#/transition)
-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Transition/Transition.jsx#L43)

#### `useDeferredValue`で処理中も古い表示を残しておく

`useTransition`と似たユースケースに活用できるのが`useDeferredValue`フックです。

次のデモは、名前や役割で人物を検索する画面です。検索処理に時間がかかるため、入力のたびスピナー表示へ切り替わり画面がチラついて見えます。

`useDeferredValue`は、受け取った値を使う画面描画を遅らせます。画面描画は中断可能です。デモでは、検索結果を`useDeferredValue`に渡しています。 素早く入力を繰り返すとその度に検索は実行されますが、検索結果を使った画面描画は中断されます。**最終的に結果を表示するまでは古い検索結果を残すため、スピナーがチラつくことはありません。**

```
export const Deferred = () => {
  // ----- 関連箇所だけ抜粋しています -----
  const [query, setQuery] = useState("");
  const [searchResource, setSearchResource] = useState(() => searchPeople(""));

  // useDeferredValueを使い検索が完了するまでは古い検索結果を表示する
  const deferredResource = useDeferredValue(searchResource);
  const isSearching = searchResource !== deferredResource;

  const handleSearchChange = (nextQuery) => {
    setQuery(nextQuery);
    setSearchResource(searchPeople(nextQuery));
  };

  return (
    <div className="deferred">
      <SearchBox onChange={handleSearchChange} value={query} />
      <div className="deferred__list">
        <Suspense fallback={<Spinner />}>
          <SearchResults
            {/** deferredResourceを渡す */}
            resource={deferredResource}
            isSearching={isSearching}
          />
        </Suspense>
      </div>
    </div>
  );
};
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260901_latest-react/#/deferred)
-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Deferred/Deferred.jsx#L34)

#### `useOptimistic`でAPIの完了を待たず画面を更新する

「いいね」や「お気に入りに追加」などシンプルな更新処理にローディング画面が出るとユーザーは「遅いアプリだなぁ」と感じる可能性があります。`useOptimistic`フックは、APIの結果を待たずに先に画面を更新してしまう「楽観的更新」を実現するための機能です。

次の例では「いいね」ボタンを押すとすぐ画面が更新されます。APIの処理は意図的に1秒遅らせていて、実際にAPIが応答するのは更新後です。

```
export const Optimistic = () => {
  // ----- 関連箇所だけ抜粋しています -----

  // 確定した「いいね」を管理する
  const [liked, setLiked] = useState(false);
  // 楽観的更新の「いいね」を管理する
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    const nextLiked = !optimisticLiked;
    startTransition(async () => {
      // 実際に「いいね」を保存する前に楽観的更新する
      setOptimisticLiked(nextLiked);
      const saved = await saveLike(nextLiked);
      // 保存が完了したら確定させる
      setLiked(saved);
    });
  };

  return (
    <>
      <div className="optimistic__controls">
        <button
          disabled={isPending}
          onClick={handleLike}
          type="button"
        >
          <img alt="" src={heart} width="28" height="28" />
        </button>
      </div>
      <div className="optimistic-labels">
        {/** optimisticLikedはすぐ更新される。likedはsaveLike()を待ってから更新される */}
        <p>{isPending ? "保存中" : "保存完了"}</p>
        <p>optimisticLiked: <span>{`${optimisticLiked}`}</span></p>
        <p>liked: <span>{`${liked}`}</span></p>
      </div>
    </>
  );
};
```

画面下側に「保存中」が表示されている間、`optimisticLiked`はすぐに更新されます。保存が完了したら`liked`が変更されます。もし`useOptimistic`フックを使わなければ、ボタンを押してもなかなか画面が更新されず「なんだか遅い」と感じるアプリになってしまいます。万が一`saveLiked()`が失敗した場合は値は元に戻ります。

`useOptimistic`フックは`startTransition()`に渡す関数や、フォームの更新などと一緒に使います。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260901_latest-react/#/optimistic)
-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Optimistic/Optimistic.jsx#L12)

### ユーザーの入力を消さない

入力フォームを途中まで入力して閉じたあと、もう一度開いて入力が消えているとガッカリしますよね。複数ステップの入力フォームなどでは、画面に表示されていないフォームの入力値は保持しておくと親切です。

今まではグローバルな`state`などに保持しておき、コンポーネントがアンマウントされても消さない工夫が必要でした。

#### `<Activity>`で状態を保つ

`<Activity>`コンポーネントを使うと、子要素を非表示にしてもその`state`の状態は保持されます。

次のように`<Activity>`で囲われたフォームは、`mode`が`"hidden"`になると非表示になります。しかし、子要素である`<ProfileForm>`や`<QuestionnaireForm>`の`state`はそのまま保持されるため、もう一度開くと入力値が保存されています。

```
import { Activity, useState } from "react";

const Preservation = () => {
  // ----- 関連箇所だけ抜粋しています -----
  const [tab, setTab] = useState("profile");

  return (
    <section className="preservation">
      <Activity mode={tab === "profile" ? "visible" : "hidden"}>
        <ProfileForm />
      </Activity>
      <Activity mode={tab === "questionnaire" ? "visible" : "hidden"}>
        <QuestionnaireForm resource={countries} />
      </Activity>
    </section>
  );
};

const ProfileForm = () => {
  // ----- 関連箇所だけ抜粋しています -----
  // Activityで囲むとこのstateの値は保持される
  const [name, setName] = useState("");

  return (
    <div className="form">
      <TextInput
        onChange={(e) => setName(e.target.value)}
        label="Name"
        value={name}
      />
    </div>
  );
}
```

フォームに入力した後「Prev」や「Next」ボタンを押下して移動してみてください。`<Activity>`を使用した方は、入力値が保存されていることがわかります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260901_latest-react/#/activity)
-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Activity/WithActivity.jsx#L13)

### 重い処理は裏側で実行してユーザーに見せない

`<Suspense>`では、重い処理を段階的に表示する方法を紹介しました。ですが、ユーザーの知らないうちに裏側で重い処理を実行できれば、そもそもスピナーの表示は不要です。

#### プリレンダリングで素早くコンポーネントを表示する

`<Activity>`コンポーネントでもうひとつ便利な使い方はプリレンダリングです。

通常のコンポーネントでは、コンポーネント内に書かれた処理は**表示されたときに行われます。**時間がかかるAPI呼び出しを含むコンポーネントは、マウントされ処理が完了してから表示されます（処理中はスピナーやローディングを表示）。**`<Activity>`を使うと、コンポーネントが非表示でも優先度を下げた上でレンダリングされます。結果的にuse()を利用したデータ取得などが表示前に実行できます。**

さきほどの入力フォームでは、2つ目の画面の「Country」を取得するのに1秒ほどかかります。`<Activity>`を使っている方は素早く表示されるのに対し、使っていない方は「Next」をクリックしてから読み込むため、待ち時間が発生しています。

```
const Preservation = () => {
  // ----- 関連箇所だけ抜粋しています -----

  // fetchCountriesでcountriesを取得し、<Activity>で囲っている<QuestionnaireForm />に渡す
  const [countries] = useState(() => fetchCountries());

  return (
    <section className="preservation">
      <Activity mode={tab === "questionnaire" ? "visible" : "hidden"}>
        <QuestionnaireForm resource={countries} />
      </Activity>
    </section>
  );
};

const QuestionnaireForm = ({ resource }) => {
  // use()を使ってcountriesを解決する
  // <Activity />で囲われたコンポーネントは画面描画を邪魔しないよう優先度は低くレンダリングされる
  // 画面上見えていなくてもこのコンポーネントはレンダリングされ、countriesの処理は行われる
  // 結果的に<QuestionnaireForm />が表示されるときにすでにcountriesは取得済みのため、ユーザーを待たせない
  const countries = use(resource);
  const [country, setCountry] = useState("");

  return (
    <div className="form">
      <SelectBox
        label="Favorite Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        list={countries}
      />
    </div>
  );
};
```

-   [コードを確認する](https://github.com/ics-creative/260901_latest-react/blob/main/src/pages/Activity/WithActivity.jsx#L9)

注意点として、プリレンダリングは**表示される可能性が高いコンポーネントに限る方がよいでしょう。**ほとんど表示されないコンポーネントをプリレンダリングしても、1度も表示することがなければムダな処理が走るだけになってしまいます。

### まとめ

ユーザー体験を改善できるReactの便利なコンポーネントやフックを紹介しました。上手に組み合わせると、ユーザーの動作や入力にすぐ反応するサクサクしたアプリケーションを作れます。

次回の記事では開発体験を改善する便利機能を紹介します。お楽しみに！