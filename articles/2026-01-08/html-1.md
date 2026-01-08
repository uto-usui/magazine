---
title: "HTMLの標準機能で作るフォームバリデーション"
source: "https://ics.media/entry/240418/"
publishedDate: "2024-04-19"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

フォームの実装はフロントエンドエンジニアの必須スキルのひとつです。しかし、意外と実装が難しく、とくにユーザーの入力した値が正しい値かチェックする**フォームバリデーション**は中〜上級者でもつまずきやすいポイントです。

データベースの仕様、サーバーの実装、アクセシビリティーやユーザビリティーなど考慮することが増えるほどバリデーションの実装も複雑になります。複雑なバリデーションですが、HTMLの機能とJavaScriptの機能を組み合わせたり、さらにはHTMLの機能のみで実装することも可能になってきました。

今回の記事では最新のHTMLでフォームバリデーションを実装する方法について解説します。また、CSSやJavaScriptとの組み合わせについても解説します。本記事を読んで、一歩進んだフォームの実装方法を身につけましょう。

### フォームバリデーションとは？

フォームバリデーションとは、ユーザーがフォームに入力した値が正しい値かどうかをチェックすることです。たとえば、入力文字数に上限を決めたり、入力値を正の整数のみに限定する、もしくはメールアドレスの入力では「@」を含む形式かなどがチェックされます。

正規表現を駆使すると、「106-0031」のように郵便番号の形式（3桁、ハイフン、4桁）に限定した厳格なバリデーションも実装できます。

今回の記事では、これらのバリデーションをHTMLの標準機能を使用して行います。

#### なぜバリデーションが必要か？

フォーム入力におけるバリデーションの大きな目的は、仕様に沿った入力をユーザーに促すことです。誤った形式で入力されていることをユーザーに素早くフィードバックするため、クライアントサイドでのバリデーションが行われます。

ただし、クライアントでのバリデーションはあくまでもユーザーへのフィードバックにのみ用いるようにしましょう。悪意のあるユーザーは送信値を改ざんしサーバーに送信することもあります。正しいセキュリティー対策として、サーバーでもバリデーションを行う必要があります。

### フォームの構成要素に応じたバリデーション

HTMLのフォームは複数のUIから構成されます。それぞれの要素に特徴があり、要素に応じたバリデーション方法があります。ここでは代表的な要素とともに、それぞれのバリデーション方法を紹介します。

ブラウザではそれぞれのバリデーションに応じたエラーメッセージがあらかじめ用意されています。どのようにルールに違反しているか、わかりやすく表現してくれます。

![様々なバリデーション](https://ics.media/entry/240418/images/240418_validation.png)

それぞれのバリデーションのデモのリンクはこちらです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-1.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-1.html)

#### 文字数

文字数の制限は主にテキストボックス、テキストエリアに適用されます。HTMLでは以下の属性を使用して、入力可能な文字数を制限できます。

-   `minlength`属性：最小文字数
-   `maxlength`属性：最大文字数

```
<!-- 2文字以上の入力が必須 -->
<input type="text" minlength="2">
<!-- 10文字まで入力可能 -->
<input type="text" maxlength="10" />
```

`maxlength`属性を利用すると、指定した桁数しか入力できなくなります。ペーストした際に、桁数を超える文字列が途切れてしまう挙動になります。`maxlength`属性はユーザーにとって必ずしも使いやすいとも限らないので、慎重に検討したほうがいいでしょう。

#### 特殊な入力型

`input`タグには、目的に合わせてさまざまな`type`属性が用意されています。それぞれの`type`属性には、特定のバリデーションが用意されています。たとえば、`email`型はメールアドレスの形式に合致していない文字列でバリデーションエラーを返します。

テキストボックスで用いられる`type`属性の代表例を以下に示します。

```
<input type="email" />
<input type="url" />
```

※`tel`や`password`といった型はバリデーションは持たず、入力補助を目的としています。間違えやすい箇所なので注意しましょう。

#### パターン属性

テキスト入力は自由度が高いため、より厳密なバリデーションを適用する方法が用意されています。それが`pattern`属性です。`pattern`属性を用いたバリデーションでは**正規表現**を使用します。

下に示すのは、郵便番号の入力を想定したバリデーションの例です。3桁の数字、ハイフン、4桁の数字の形式で入力されているかをチェックします。

```
<input pattern="\d{3}-\d{4}" />
```

正規表現はとっつきにくく敬遠されがちですが、柔軟性が高く表現力に富んだ技術で身につける価値は大いにあります。次の記事では正規表現のテクニックを詳しく紹介しています。ぜひ参照ください。

-   [『覚えれば一生もの！ウェブエンジニアのための正規表現活用入門』](https://ics.media/entry/221020/)

#### 数値

数値入力フォームは、`input`タグに`type="number"`を指定することで作成できます。

```
<input type="number" />
```

数値入力フォームには、以下のようなバリデーションが用意されています。

-   `max`（最大値）、`min`（最小値）
-   `step`（入力値の間隔）

#### 日付入力

日付入力のような複雑な入力フォームもHTMLで用意されています。`input`タグに`type="date"`を指定することで、日付入力の入力フォームを作成できます。

```
<input type="date" min="2025-01-01" max="2025-12-31" />
```

日付入力フォームには、以下のようなバリデーションが用意されています。

-   `max`（最大の日付）、`min`（最小の日付）
-   `step`（入力値の間隔。型によって単位は異なる）

日付入力や、`<input type="color" />`で作成するカラーパレットの入力フォームなどは、複雑なフォームである分CSSで独自のスタイルを当てるのが難しい要素です。

HTML標準のフォームが使用できるウェブサイトや本開発前のデモ作成などで活躍する要素でしょう。独自のデザインで作成する日付入力フォームなどは、標準のinputタグではなく独自の実装が必要になります。

### フォーム共通のバリデーション属性

ここまでは、フォーム要素ごとにバリデーションの方法を紹介してきました。次に紹介するのは、フォーム要素に共通して使用できるバリデーション属性です。一部はすでに紹介したものもありますが、改めてまとめて紹介します。

#### required属性

必須の項目には、`required`属性を指定します。`required`属性が指定されているフィールドが空のまま送信しようとすると、バリデーションエラーが起きます。

#### 長さ、大きさを表す属性

先ほども何度か出ている属性ですが、改めてまとめます。

-   min、max：数値の最小値、最大値を指定します。
-   minlength、maxlength：文字列の最小長、最大長を指定します。

上記の条件を満たさない場合、バリデーションエラーが起きます。

### フォーム例〜採用応募フォーム〜

ここまで学習したバリデーションを使用したフォームの一例を紹介します。採用応募フォームのデモです。

![採用応募フォームの画像](https://ics.media/entry/240418/images/240418_form_example.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-2)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-2.html)

それぞれの項目の要件を表にしました。

項目

バリデーション

氏名

必須、文字数制限

メールアドレス

必須、メールアドレス形式

電話番号

必須、電話番号形式

性別（男性、女性、回答なし）

必須

生年月日

必須、日付形式

志望動機

必須、文字数制限

ポートフォリオURL

URL形式

その他

なし

すべてのフォームが要件を満たしている場合のみ、送信できます。

### フォームバリデーションのデザイン

上記の例では最低限のHTMLのみ実装されています。しかし、実際のサイトではバリデーションエラーをユーザーにフィードバックする必要があります。よりユーザビリティの高いフォームでは、以下の点を検討する必要があります。

-   エラー時のスタイル
-   エラーメッセージの出し方
-   バリデーションエラーの表示タイミング

以下では、それぞれについて深堀りします。

#### エラー時のスタイル

エラーを検知する方法として、CSSには`:valid`疑似クラスと`:invalid`疑似クラスがあります。これらの疑似クラスは[『CSS疑似クラスを活用した、モダンでインタラクティブなフォームの作り方』](https://ics.media/entry/200413/)でも紹介されている、バリデーションエラーが起きている要素にのみ適用されるクラスです。

![valid疑似クラスの説明](https://ics.media/entry/240418/images/240418_pseudo_class_form_valid.png)

しかし、この疑似クラスには欠点があります。`required`属性をもつフォームを例にあげます。このフォームは未入力の場合疑似クラスが適用されますが、ページを開いた直後はもちろん未入力なので最初からエラーメッセージが表示されてしまう現象が起きます。何も入力していないのにエラーになっていると、ユーザーはびっくりしてしまいますね。

この欠点を補うための疑似クラスが`:user-valid`、`:user-invalid`疑似クラスです。これらの疑似クラスは**ユーザーの入力後**にバリデーション結果に応じて付与されます。

次に示すのは、ユーザーの入力後にバリデーションの結果をフィードバックする例です。

```
<label>
  名前（必須、3文字以上）：
  <input type="text" required minlength="3" />
  <span></span>
</label>
```

```
input {
  span::after {
    display: inline-block;
    width: 8px;
    height: 8px;
  }

  &:user-valid ~ span::after {
    content: "✓入力済み";
    color: green;
  }

  &:user-invalid ~ span::after {
    content: "※バリデーションエラー";
    color: red;
  }
}
```

![user-invalid疑似クラスの動画](https://ics.media/entry/240418/images/240418_user_invalid.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-3)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-3.html)

ユーザーの操作に対するフィードバックという観点でとても便利な疑似クラスです。

#### エラーを表示する前に必要なこと

バリデーションエラーが起きていることをユーザーに知らせるのはもちろん大切ですが、それ以上に大切なのは**入力ルールをあらかじめユーザーに伝えること**です。以下のフォーム例ではユーザーが入力後にはじめて文字数の制限があったことを知ります。これはユーザーのストレスになります。

![バリデーションルール](https://ics.media/entry/240418/images/240418_input_rule.png)

ユーザーの目線に立ち、使いやすいフォームの実装を心がけましょう。

### バリデーションエラーメッセージの表示

ここまでは、HTMLの基本機能を使用したバリデーションについて解説しました。次に解説するのはJavaScriptも駆使した、一歩進んだバリデーション表現です。まずはエラーメッセージの表示について考えてみます。

#### バリデーションエラーメッセージを常に表示する

HTMLの標準機能では、送信時にバリデーションエラーがあるとポップアップで表示されるような挙動でした。実際のフォームでは、バリデーションメッセージはテキストとして表示する場合が多くあります。

ただし、複数のバリデーションが設定されている場合、バリデーションエラーメッセージはエラーごとに異なります。バリデーション条件が複数設定されている例を考えてみましょう。

```
<input required minlength="5" maxlength="10" />
```

「必須」、「最小文字数」、「最大文字数」のバリデーションが設定されています。これらのバリデーションでエラーが起きたとき、HTMLのテキストとして表示する実装を行います。

次のコードは、ブラウザが返すバリデーションエラーメッセージを**制約検証API**（Constraint Validation API）を使用して取得し、HTMLのテキストとして表示する例です。

```
<input required minlength="5" maxlength="10" />
<p class="message"></p>
```

```

const input = document.querySelector("input");
const message = document.querySelector(".message");

// フォームからフォーカスを外したら発火
input.addEventListener("blur", (e) => {
  // バリデーションを通過しているか？
  const isValid = input.checkValidity();
  if(isValid){
    // エラーメッセージを空にする
    message.textContent = ""
  } else {
    // エラーメッセージを取得
    const errorMessage = input.validationMessage;
    message.textContent = errorMessage;
  }
})
```

実際の動きは次のようになります。

![エラーメッセージの表示例](https://ics.media/entry/240418/images/240418_error_message.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-4)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-4.html)

制約検証APIの概要と具体例は次の記事を参照ください。

-   [MDN - 制約検証](https://developer.mozilla.org/ja/docs/Web/HTML/Constraint_validation)
-   [MDN - クライアント側のフォーム検証](https://developer.mozilla.org/ja/docs/Learn/Forms/Form_validation#%E5%88%B6%E7%B4%84%E6%A4%9C%E8%A8%BC_api)

#### 独自のバリデーションエラーメッセージの表示

先ほどの例に「半角英数字のみ」というバリデーションを加えます。pattern属性を加えてみましょう。

```
<!--半角英数字で入力-->
<input required minlength="5" maxlength="10" pattern="^[0-9A-Za-z]+$" />
```

この場合、正規表現にマッチしないときのエラーメッセージは「指定されている形式で入力してください。」と表示されます（環境によって異なります）。

ユーザーはメッセージから修正内容がわからないので、「半角英数字で入力してください。」と表示してあげたいです。このような場合、バリデーションエラーメッセージを書き換えることができます。パターンミスマッチが起きているかは`input.validity.patternMismatch`で取得できます。サンプルコードを次に示します。

```
const input = document.querySelector("input");
const message = document.querySelector(".message");

// フォームからフォーカスを外したら発火
input.addEventListener("blur", (e) => {
  // バリデーションを通過しているか？
  const isValud = input.checkValidity();
  if (isValud) {
    // エラーメッセージを空にする
    message.textContent = "";
  } else {
    // パターンミスマッチの場合はバリデーションメッセージを書き換え
    if (input.validity.patternMismatch) {
        input.setCustomValidity("半角英数字で入力してください。");
    }
    // エラーメッセージを取得
    const errorMessage = input.validationMessage;
    message.textContent = errorMessage;
  }
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-5)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-5.html)

これにより、パターンミスマッチの場合は定義したエラーメッセージが、それ以外のエラーの場合はブラウザから提供されるエラーメッセージが表示されるようになりました。

制約検証APIではバリデーション条件に対するAPIが用意されています。必要に応じて使用してください。

### 送信ボタンの非活性化

実際のフォームでは、バリデーションを通過しているときに限りボタンが活性状態になるデザインがよく用いられます。

![送信ボタンが非活性の画像](https://ics.media/entry/240418/images/240418_buttom_disabled.png)

ただし、この実装には注意点があります。HTML標準機能では送信時にバリデーションエラーが表示されていたのが、送信ボタンが押せなくなったことによってバリデーションエラーの内容がユーザーにわからなくなることがあります。ボタンの活性状態を制御する際は、**必ずバリデーションエラーメッセージを表示する**ようにしましょう。

#### CSSを用いた方法

まずはJavaScriptを使わない方法を考えます。

CSSに`:has()`関係セレクターが登場したことで、フォーム内に`:invalid`疑似クラスをもつ要素があるかをCSSでチェックできるようになりました。次の例では、バリデーションエラーが起きている要素があるときは送信ボタンを非活性にする処理をHTMLとCSSのみで実装しています。

先述の通り、バリデーションエラーが起きているフォームにはエラーメッセージを表示しています。

```
<form>
  <label>
      名前：
      <input type="text" required />
  </label>
  <span>名前を入力してください</span>
  <button class="submit">送信</button>
</form>
```

```
label ~ span {
  visibility: hidden;
}
label:has(input:user-invalid) ~ span {
  visibility: visible;
  color: red;
}
form:has(input:invalid) .submit{
  opacity: 0.5;
  pointer-events: none;
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-6)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-6.html)

以前はJavaScriptを使用しないと難しかった実装が、HTMLとCSSの進化によって実現可能になった素晴らしい例です！

#### JavaScriptを用いた方法

JavaScriptを用いた例では、すべてのinput要素に対して入力時にチェックを行い、バリデーションエラーが無くなったら送信ボタンを活性にします。

```
const inputs = document.getElementsByTagName("input");
const button = document.querySelector("button");
// すべての要素がバリデーションを通過しているかチェックする関数
const checkValidate = () => {
  const valid = [];
  for (const input of inputs) {
    valid.push(input.checkValidity());
  }
  return valid.every((v) => !!v);
};

let isValid = false;
// すべてのinput要素の入力中にバリデーションをチェックする
for (const input of inputs) {
  input.addEventListener("input", () => {
    isValid = checkValidate();
    // バリデーション状態に応じてボタンの活性状態を切り替え
    button.disabled = !isValid
  });
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-7)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-7.html)

どちらの手法も長所と短所があるので、状況に応じて使い分けていきましょう。

### デモの改良

ここまでの知識を使って、採用応募フォームのデモを改良しました。以下の機能を追加しています。

-   バリデーションエラーメッセージの追加
-   バリデーション状態に応じた入力フォームのスタイル設定
-   ボタンの活性/非活性

次のリンクからご確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240418_html_form/pages/form-8)
-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/blob/main/pages/form-8.html)

### フォームの送信

最後はフォームの送信について扱います。とはいえHTMLフォームは入力値をそのまま送信するので特別な対応は必要ありません。

必要なプロパティは2つです。

-   action：送信値をどこに送るかを定義します。同一ドメインの場合は`/submit`のように相対パスも可能です。
-   method：HTTP通信に用いるのは`"get"`と`"post"`のどちらかです。送信値をURLに含めるか否かの違いがあります。

また、`<form>`タグ内の`<button>`要素は、自動的に`type="submit"`が付与されます。次に示すのは入力値をサーバーに送信するミニマルな例です。

```
<form action="http://localhost:3000/submit" method="post">
  <input type="text" />
  <button>送信</button>
</form>
```

送信値をそのまま返すサーバー実装のサンプルコードをレポジトリに用意しました。以下のリンクからソースコードをクローンして、アプリケーションを動かしてみてください。

-   [ソースコードを確認する](https://github.com/ics-creative/240418_html_form/tree/main)

#### JavaScriptを使用したフォーム送信

アプリケーションの仕様によってはフォームの入力値をそのまま送信せず、JavaScriptで加工して`FormData`オブジェクトを介して送信する場合もあります。JavaScriptを用いた入力値のハンドリングについては次回の記事で解説します。

### まとめ

今回はHTMLのバリデーション機能をメインにフォームのバリデーションについて解説しました。フォームの使い勝手は、バリデーションの扱いにかかっていると言っても過言ではありません。適切なバリデーションメッセージを適切なタイミングで出すことで、ユーザーは迷わずに入力できます。

質の高いバリデーションの実装はHTML、CSS、JavaScriptの幅広い知識が要求されますが、本記事の内容が学習の足がかりになれば幸いです。

後続記事『[ReactとZodで作る堅牢なフォームバリデーション](https://ics.media/entry/240611/)』は、今回の記事から踏み込んだ高度なバリデーションの実装テクニックを紹介します。

-   JavaScriptを使った相関チェック
-   TypeScriptとzodを使用した堅牢なバリデーション
-   Reactと周辺ライブラリを用いたフォームの構築
-   React 19で追加されるフォーム周りの機能の紹介

また関連記事でも入力フォームのベストプラクティスを紹介しています。あわせてご覧ください。

-   [今どきの入力フォームはこう書く！ HTMLコーダーがおさえるべきinputタグの書き方まとめ](https://ics.media/entry/11221/)
-   [お問い合わせフォームのウェブアクセシビリティー対応の方法](https://ics.media/entry/201016/)
-   [リンク/ボタン/フォームをより良くするHTML・CSS 17選](https://ics.media/entry/221208/)