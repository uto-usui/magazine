---
title: "ReactとZodで作る堅牢なフォームバリデーション"
source: "https://ics.media/entry/240611/"
publishedDate: "2024-06-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

前回の記事[『2024年版 HTMLで作るフォームバリデーション』](https://ics.media/entry/240418/)ではHTMLの機能を駆使したフォームバリデーションの実装について解説しました。HTMLのみでも高機能なフォームを作成できるのは解説したとおりですが、HTMLに加えてJavaScriptを組み合わせることでより高機能なフォームを作成できます。それに加えて、**開発者体験の向上**も期待できます。

本記事では3つのライブラリを使用して実践的なフォームを作成する方法を解説します。

-   UIライブラリ「React」
-   フォーム向けライブラリ「React Hook Form」
-   型システムと相性の良いスキーマバリデーションライブラリ「Zod」

また、静的型付け言語であるTypeScriptもこれらのライブラリと同時に使用し、堅牢なフォームの実装を目指します。

本記事を読むことで以下の知識が身につきます。

-   フォーム画面のユーザー体験（UX）と、フォーム実装の開発者体験（DX）が良いフォームが作成できるようになる
-   プログラムでフォームの値を管理できるため、複雑な仕様に対応可能かつ、バグの発見が容易なフォームが作成できるようになる
-   スキーマを定義して入力値をバリデーションできるようになる
-   複雑なバリデーションの実装ができるようになる

フロントエンドの世界で築き上げられてきたフォーム実装の技術に触れることのできる内容になっています。前回の記事よりは少し難しい内容になりますが、みなさんのスキルアップにつながれば幸いです。

※本記事のサンプルコードではTypeScript 5.4、 React 18を使用します。

### Reactで作るフォーム

フロントエンドの現場では、UIフレームワーク（ライブラリ）を使用した開発が盛んに行われています。React、Vue.js、Svelteを代表とするさまざまなフレームワークがありますが、今回は最大のシェアを占めるReactで解説します。

本記事ではReact自体の解説は行いませんので、必要があれば[公式ドキュメント](https://ja.react.dev/)を参照ください。 Reactでフォームを実装したサンプルコードを示します。

▼onBlurイベントでバリデーションを実行する例

```
export const ReactSimpleFormSample = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // 文字入力時
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // フォーカスアウトしたときのイベント
  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    // バリデーション結果を受け取る
    const result = validate(e.target.value);
    setError(result);
  };
  // 提出時
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション結果を受け取る
    const result = validate(value);
    // バリデーションエラーの場合はエラーメッセージを表示
    if (result !== "") {
      setError(result);
      return;
    }
    // フォームの送信処理（この処理は仮です。用途に応じてカスタマイズしてください）
    window.alert(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="nickname"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error !== "" && <p>{error}</p>}
      <button type="submit">submit</button>
    </form>
  );
};

```

▼バリデーション関数

```
// バリデーション関数
const validate = (value: string) => {
  if (value.length === 0) {
    return "テキストを入力してください";
  }
  return "";
};
```

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/240605_react_form_validation/#section-1)
-   [ソースコードを確認する](https://github.com/ics-creative/240605_react_form_validation/blob/main/src/sections/ReactSimpleFormSample.tsx)

`onBlur`イベントでバリデーション関数が実行され、条件を通過していなければエラーメッセージを返すようになっています。今回はバリデーションの例として、「文字が入力されていなければバリデーションエラー」という条件にしました。エラーを受け取ると、エラーメッセージがフォームに表示されます。 処理の流れを図にしてみましょう。

![処理の流れ](https://ics.media/entry/240611/images/240606_validation_flow.png)

JavaScriptを使用する大きなメリットのひとつは、**バリデーションの対象と発火タイミングを自由に設定できること**です。たとえば`onBlur`イベントでバリデーションを行っているのを`onChange`イベントで行った場合はユーザーの入力イベントごとにバリデーションが実行されます。

![onChangeにした例](https://ics.media/entry/240611/images/240606_validation_timing.gif)

### React Hook Formを使用したフォーム作成

Reactコミュニティではフォーム実装を効率化するライブラリがたくさん作られています。今回はその中の代表的なひとつ、[「React Hook Form」](https://react-hook-form.com/)を紹介します。

▼React Hook Formのトップページ ![React Hook Form](https://ics.media/entry/240611/images/240606_rhf.png)

React Hook Formのトップページを開くと、30秒の紹介動画が表示されます。こちらの動画と「Get Started > React Web Video Tutorial」にある動画による解説がライブラリの機能を掴むにはうってつけなので、本記事と合わせて確認してみてください。本記事では代表的な使用例を紹介します。

#### React Hook Formの使い方

React Hook Formで簡単なフォームを実装してみましょう。今回は名前と年齢を入力するフォームを実装してみます。

```
// フォームの型定義
type FormData = {
  nickname: string;
  age: number;
};

export const ReactHookFormSample = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = handleSubmit((data) => {
    // フォームの送信処理
  });
  return (
    <form onSubmit={onSubmit}>
      {/*名前入力欄*/}
      <div>
        <label>
          名前
          <input
            type="text"
            {...register("nickname", { required: "テキストを入力してください" })}
          />
        </label>
        {/*バリデーションエラーがあったらメッセージを表示*/}
        {errors.nickname && (<p>{errors.nickname.message}</p>)}
      </div>
      {/*年齢入力欄*/}
      <div>
        <label>
          年齢
          <input
            className="input"
            type="number"
            {...register("age", {
              required: "年齢を入力してください",
              min: {
                value: 12,
                message: "12歳以上で入力してください",
              },
              valueAsNumber: true,
            })}
          />
        </label>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
```

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/240605_react_form_validation/#section-2)
-   [ソースコードを確認する](https://github.com/ics-creative/240605_react_form_validation/blob/main/src/sections/ReactHookFormSample.tsx)

React Hook Formでもっとも重要な関数が、`useForm()`フックです。必要に応じてたくさんの返り値が使用できますが、今回は代表的なものを紹介します。

`register()`関数は`useForm()`内でフォームの入力値を扱う大切な関数です。以下の実装では`"nickname"`という`name`属性をもつフォームをReact Hook Formに組み込む処理を行っています。

さらに、`register()`関数の第二引数にはバリデーション条件などの引数も与えられます。HTML属性としても用意されている`min`や`pattern`属性がバリデーション条件として指定できるほか、エラーメッセージも設定できます。

`register()`関数は`input`要素のpropsをオブジェクト形式で返すので、スプレッド演算子で展開してpropsとして渡せます。

```
<input
  {...register("nickname", { required: "テキストを入力してください" })}
/>
```

こちらもわかりやすい解説動画が公式から提供されています。

-   [React Hook Form - useForm: register](https://www.youtube.com/watch?v=JFIpCoajYkA&t=45s)

`register()`関数によって紐づけられたフォームの値は、`useForm()`フックの返り値の中で使用されます。たとえば`formState`オブジェクトの`errors`フィールドでは、バリデーションエラーを起こしているフォームのプロパティを取得できます。

サンプルコードを例に挙げると、`required`属性をもつ`"nickname"`フィールドの値を空にすると「どのエラーを起こしたか」と「エラーメッセージ」の情報にアクセスできます。

-   `errors.nickname.type`：“required”
-   `errors.nickname.message`：“テキストを入力してください”

これらの情報を使用して、適切なバリデーションエラーメッセージを表示できます。

`handleSubmit()`関数はフォームのもつ値を扱いやすくした、`onSubmit`イベントのラッパー関数です。引数にはフォームの入力値をもち、フォームがバリデーションエラーを起こしているときには実行されません。

このように、フォームがシンプルに記述でき、フォームの入力値を扱いやすくしたライブラリがReact Hook Formです。

#### バリデーションのタイミング

`useForm()`フックの引数オブジェクトに`mode`フィールドがあります。これは「どのタイミングでバリデーションを実行するか」を指定するフィールドで`onSubmit`、`onBlur`など見慣れたイベント名が用意されています。ここでは先ほどの例でも使用した`onTouched`という値が使用できます。

`onTouched`が指定されたフォームは、最初のブラーイベント（onBlur）でバリデーションが実行され、その後は変更イベント（onChange）のたびにバリデーションが発火されます。ユーザー体験を向上させるプロパティのひとつなので、覚えておくとよいでしょう。

#### 型との連携

ここでReact Hook FormとTypeScriptとの連携について紹介します。例ではフォームの入力値を`FormData`という型で定義し、`useForm()`関数のジェネリクスとして定義しました。ここで型定義しておくことで嬉しいことがいくつかあります。

まず、`register()`関数の引数に与える名前に型チェックが入ります。型定義されていない名前を引数にするとエラーになるのでタイプミスが防げます。

また、`errors`オブジェクトや`handleSubmit()`の引数でも型補完が効くようになるため開発の効率が上がり、開発者体験が向上します。

![TypeScriptで嬉しいこと](https://ics.media/entry/240611/images/240606_typescript_point.png)

TypeScriptは難しい、というイメージをもっている開発者も多いと思いますが、バグの抑制や開発の効率化といったさまざまなメリットが存在します。

### スキーマバリデーション

ここまでバリデーションの記述にはJavaScriptの関数を使用してきました。複雑な条件分岐を駆使して柔軟なバリデーションを実装できますが、その反面可読性の低さや修正の難しさにもつながってきます。ひとつのオブジェクトのような形式でバリデーション定義を行いたいとき、**スキーマ**が役に立ちます。

次に示すのはTypeScriptのスキーマバリデーションライブラリ[「Zod」](https://zod.dev/)を使用したスキーマの例です。

```
const schema = z.object({
  /** 名前 */
  nickname: z.string().min(1, { message: "名前を入力してください" }),
  /** 年齢 */
  age: z
    .number({ message: "年齢を半角数字で入力してください" })
    .int({ message: "年齢を整数で入力してください" })
    .gte(12, { message: "年齢を12歳以上で入力してください" }),
  /** メールアドレス */
  email: z.union([
    z
      .string()
      .email({ message: "メールアドレスの形式で入力してください" })
      .nullish(),
    z.literal(""),
  ]),
});
```

それぞれのフィールドに対応したスキーマを定義し、`z.object()`メソッドでひとつのオブジェクトとして定義します。それぞれのフィールドの具体的なバリデーション定義については後述します。

このスキーマをReact Hook Formと連携するには、`useForm()`フックの引数として`resolver`を与えます。今回はZodと連携するので、`zodResolver`の引数に先ほど定義したスキーマを与えたものを設定します。Zod以外にも、YupやJoiといったスキーマライブラリのresolverも用意されています。

Zodの便利機能として、スキーマから型を抽出する`z.infer`というユーティリティ型も用意されています。この型は`useForm()`のジェネリクスに指定できます。

```
// スキーマから型を生成
type Inputs = z.infer<typeof schema>;

export const SchemaFormSample = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver: zodResolver(schema), // 🌟resolverを追加
  });
  const onSubmit = handleSubmit((data) => {
    // フォームの送信処理
  });
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          名前
          <input type="text" {...register("name")} />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>
          年齢
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
          />
        </label>
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>
          メールアドレス
          <input type="email" {...register("email")} />
        </label>
        {errors.email && (<p>{errors.email.message}</p>)}
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
```

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/240605_react_form_validation/#section-3)
-   [ソースコードを確認する](https://github.com/ics-creative/240605_react_form_validation/blob/main/src/sections/SchemaFormSample.tsx)

たったこれだけで堅牢な型システムとバリデーション機能をもったフォームが完成してしまいました！　バリデーション関数を自前で用意するのに比べ、オブジェクト形式で記述できるので可読性が高く型システムとの相性も良いです。

#### いろいろなZodスキーマ

上で紹介できなかった、各フィールドのZodスキーマの具体的なバリデーション内容について見ていきましょう。

`z.string()`や`z.number()`はプリミティブな型をバリデーションするスキーマです。その後にそれぞれの型に対するスキーマをつなげられます。

`.min(1)`とつなげると1文字以上の入力が必須、つまり入力必須のバリデーションをかけられます。さらに、バリデーションメッセージも`message`フィールドで独自に定義できます。

```
/** 名前 */
z.string().min(1, { message: "名前を入力してください" });
```

数値型に対するスキーマでは、整数型や最小値、最大値のバリデーションが用意されています。`.gte()`は最小の数値を定義するスキーマです（grater than equalの略）。

次の例では、「12.4」のように小数値を入力すると「年齢を整数で入力してください」というエラーメッセージが表示され、12未満の整数値を入力すると「年齢を12歳以上で入力してください」というエラーメッセージが表示されます。

```
/** 年齢 */
z
  .number({ message: "年齢を半角数字で入力してください" })
  .int({ message: "年齢を整数で入力してください" })
  .gte(12, { message: "年齢を12歳以上で入力してください" });
```

「2つのスキーマのうちどちらかを満たせばよい」場合もあるでしょう。その場合は`z.union()`スキーマが便利です。次の例は、「空文字もしくはメールアドレス形式の文字列型」のスキーマ定義です。

```
/** メールアドレス */
z.union([
  z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" })
    .nullish(),
  z.literal(""),
]);
```

文字列型には`.email()`や`.url()`、`.startsWith()`といった幅広いスキーマが用意されているほか、正規表現などで独自にスキーマ定義もできます。

スキーマを用いるメリットはやはり仕様が明確であること、わかりやすいことが挙げられるでしょう。個人開発でも、大規模、複数人での開発でも開発を支えてくれる技術です。

### 複雑なフォームバリデーション

これまで紹介してきたバリデーションは、それぞれの入力フォームに対するバリデーションでした。しかし、実際のアプリケーションでは複数の入力フォームにまたがったバリデーションを実装したいこともあります。

次のように、開始日と終了日を比較してバリデーションを行う日付入力の例を考えてみましょう。

![日付入力フォームの例](https://ics.media/entry/240611/images/240606_correlation_validation.png)

#### スキーマの作成

このフォームでは「開始日」が「終了日」より前の日付という条件を定義します。このように複数の入力値を比較するバリデーションを**相関チェック**と呼びます。Zodでも相関チェックを行うスキーマを作成できるので見てみましょう。

```
const dateSchema = z
  .object({
    startDate: z.string().date("日付を入力してください"),
    endDate: z.string().date("日付を入力してください"),
  })
  .refine((arg) => new Date(arg.startDate) < new Date(arg.endDate), {
    message: "終了日は開始日より後の日付を入力してください",
    path: ["endDate"],
  });
```

日付形式で入力してほしいので、`z.string().date()`スキーマを使用します。そのあとに続く`.refine()`スキーマはオブジェクトスキーマ全体のバリデーションを行う処理です。第一引数にはバリデーション関数を記述しますが、引数からそれぞれのフィールドにアクセスできます。今回は`startDate`が`endDate`よりも小さければよいので、比較の処理を記述します。

第二引数にはバリデーションエラーメッセージと、「どのフィールドに対してバリデーションを実行するか」を記述します。言い換えると、このバリデーションでエラーが起こった場合は、「`endDate`フィールドでバリデーションエラーが起こっている」という扱いになります。

#### フォームとの連携

相関チェックのスキーマをReact Hook Formと組み合わせる方法を見てみましょう。日付入力以外のフォームと組み合わせる場合は全体のスキーマの中でネストさせます。

```
const schema = z.object({
  // タイトルのスキーマ
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  // 日付のスキーマ
  date: dateSchema,
});

type Inputs = z.infer<typeof schema>;
```

ネストしたスキーマにアクセスする場合は`date.starDate`のように子階層のプロパティにアクセスします。ここでも型補完が効きます。

これで相関チェックが完成しました。実際の挙動とコードです。

![相関チェックの様子](https://ics.media/entry/240611/images/240606_correlation_check.gif)

```
export const CorrelationCheckSample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // フォームの送信処理
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          タイトル
          <input type="text" {...register("title")} />
        </label>
        {errors.title && (<p>{errors.title.message}</p>)}
      </div>
      <div>
        <label>
          開始日
          <input
            type="date"
            {...register("date.startDate")}
          />
        </label>
        {errors.date?.startDate && (
          <p>{errors.date.startDate.message}</p>
        )}
      </div>
      <div>
        <label>
          終了日
          <input
            type="date"
            {...register("date.endDate")}
          />
        </label>
        {errors.date?.endDate && (
          <p>{errors.date.endDate.message}</p>
        )}
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
```

#### より丁寧な入力チェック

相関チェックは実装できましたが、次のような場合はバリデーションを通過していてもエラーメッセージが消えません。

1.  開始日を入力する
2.  終了日を開始日より前の日付で入力し、エラーメッセージを表示
3.  開始日を終了日より前の日付に変更する

これはバリデーション対象が`endDate`に設定されているため、開始日の変更時にはバリデーションが走らないためです。`startDate`の入力時にもバリデーションを走らせたい場合は、`useForm()`フックの返り値の`trigger()`関数を使用します。

`trigger()`関数は指定したフィールドのバリデーションを実行してくれる関数です。これを開始日のフォームの入力イベントで実行します。

```
export const CorrelationCheckSample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // 🌟バリデーションを実行する
    getValues, // 🌟入力値を取得する
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // フォームの送信処理
  };
  return (
    // 一部省略
    <div>
      <label>
        開始日
        <input
          type="date"
          {...register("date.startDate")}
          // 🌟開始日の入力時にも相関チェックを行う
          onBlur={() => {
            if (getValues("date.endDate") !== "") {
              trigger("date.endDate");
            }
          }}
        />
      </label>
      {/*終了日*/}
      {/*...*/}
    </div>
  );
};
```

-   [サンプルを別ウィンドウで開く](https://ics-creative.github.io/240605_react_form_validation/#section-4)
-   [ソースコードを確認する](https://github.com/ics-creative/240605_react_form_validation/blob/main/src/sections/CorrelationCheckSample.tsx)

`onBlur`のタイミングで終了日（`endDate`）が入力済みの場合バリデーションを実行します。バリデーションを通過していればエラーメッセージが消えます。

よりよいユーザー体験の構築には細やかなチューニングが必要になることもあります。このようなチューニングができるのもJavaScriptの強みです。

### React 19のフォームハンドリング

ここからは、少し未来の話をします。React 19のリリースに先立って、React 19 Betaのリリースが発表されました。React 19では**フォームアクション**周りの機能が充実します。

フォームは入力して終わりではなく、値をサーバーに送信し正しいレスポンスをもらって処理を終えます。また、非同期な処理になるので送信中を示すようなUIの表示、送信失敗時のケアなどの仕組みも必要です。React 19ではこれらの実装を容易にする機能が予告されています。

-   送信中状態：リクエスト中かどうかを示す状態を提供します
-   楽観的更新：リクエストが完了するまで「成功したと仮定した」値を表示できます
-   エラー処理：リクエスト失敗時のフォールバック表示と、楽観的更新を元に戻せます
-   フォームアクション：formの`action`属性にURLだけでなく、関数を渡せます

これまで開発者が自前でケアしてきたような実装がライブラリの機能でできるということで、筆者もテンションが上っています。

具体的な機能に興味のある方は、ベータ版のリリースが告知されたReact公式ブログの記事を参照ください。

-   [React 19 RC](https://ja.react.dev/blog/2024/04/25/react-19)

### まとめ

今回はReactとそのエコシステムを使用したフォームバリデーションの実装について解説しました。近年Reactは進化が進み、単なるUIライブラリとしての役割だけでなくサーバー領域も巻き込んだひとつのパッケージのようになっています。React 19のフォームはサーバーとの相互作用を意識した新しい仕組みとなりフォーム実装の常識も変わっていくでしょう。

Reactの魅力はReact自体の機能はもちろん、巨大なコミュニティによる充実したエコシステムも重要な要素のひとつです。React自体の進化に追従して周辺ライブラリも進化しどんどん質の高いものが生まれています。

また、React以外の技術としてスキーマバリデーションを紹介しました。スキーマバリデーションの技術はフォームだけでなくAPI通信のようなデータのやり取りの際に非常に重要で幅広く役に立つものです。これを機にぜひ使ってみてください。

さて、前回と今回の記事でそれぞれHTMLによるバリデーションとJavaScriptによるバリデーションを紹介しました。JavaScriptによるバリデーションはテストの書きやすさ、作業領域の分担などがしやすい点が魅力です。たとえば「CSSで見た目を作る人」、「フォームのロジックを作成する人」のような作業分担を並行して進められます。

しかし、プロジェクトの規模、開発メンバーの得意分野によっても採用する技術は異なってきます。HTMLの簡単な書き味は幅広いエンジニアに好まれやすく、バリデーションもどんどん高機能になっています。その場に応じた適切な技術選定が大切です。

最新の技術をキャッチアップして、より良いユーザー体験・開発者体験を作っていきましょう。

### 参考

-   [React](https://ja.react.dev/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Zod](https://zod.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [React 19 RC](https://ja.react.dev/blog/2024/04/25/react-19)