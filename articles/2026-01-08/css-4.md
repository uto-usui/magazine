---
title: "CSS疑似クラスを活用した、モダンでインタラクティブなフォームの作り方"
source: "https://ics.media/entry/200413/"
publishedDate: "2020-04-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2020年4月14日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

モダンブラウザでサポートされているCSSの疑似クラスを使えば、JavaScriptでフォーム状態を監視することなく、CSSで状態を検知できるようになりました。また、HTMLのpattern属性を使えば入力バリデーション機能（※）もつけられます。これらを活用することで以前よりも手軽にインタラクティブなフォームを実現できます。

![インタラクティブなフォームのデモ](https://ics.media/entry/200413/images/200413_pseudo_class_form_demo.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/pseudo-class-form/)
-   [ソースコードを確認する](https://github.com/ics-creative/pseudo-class-form/blob/master/index.html)

※あくまで`form`要素への入力バリデーションなので、送信される値に対して保証はありません。送信される値をチェックするにはサーバー側のバリデーションが別途必要になります。

### さまざまな状態を選択できる疑似クラス

疑似クラス（Pseudo-classes）はCSSで使えるセレクターの一種で特定の状態の要素を指定できます。`:hover`も疑似クラスの1つです。`::after`は「疑似要素」と呼ばれ、表記は似ていますが呼び名が違うのでご注意ください。

`:hover`はホバーした状態の要素を選択できますが、フォームの状態に関する疑似クラスもあります。ここでは今回使用する疑似クラス・疑似要素を紹介します。

#### :valid, :invalid疑似クラス

`:valid` `:invalid` 疑似クラスはフォームに入力された値が妥当か、あるいは妥当ではない状態を選択できます。たとえば、

```
<input type="email">
```

という要素に対して次のようなCSSを設定した場合

```
input:valid {
  border: 1px solid green;
}

input:invalid {
  border: 1px solid red;
}
```

メールアドレスの形式にそったもの入力すると緑色の枠線が、そうでない場合は赤色の枠線で表示されます。

![validな状態だと緑の枠線、とinvalidな状態だと赤の枠線がつく](https://ics.media/entry/200413/images/200413_pseudo_class_form_valid.png)

#### ::placeholder疑似要素

`::placeholder`を使うとDOM要素ではないプレースホルダーへCSSを適用できます。こちらの分類は**疑似要素**です。あまり違いを意識しなくても実装上は問題ありませんが、呼称するときは注意してください。

```
<input type="email" placeholder="Your Email Address">
```

```
input::placeholder {
  color: green;
}
```

`input::placeholder`とすることで入力の文字色ではなく、プレースホルダーの文字色のみを変更できます。

![プレースホルダーの色のみが変わっている様子](https://ics.media/entry/200413/images/200413_pseudo_class_form_placeholder.png)

`::placeholder`疑似要素はDOM要素ではないので`display: block`や`width: 300px`のようなスタイルは適用されません。適用できるのはフォントに関するプロパティや背景に関するプロパティが基本です。実際に利用可能なプロパティは下記に詳しく書かれています。

[::first-line (:first-line) - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/::first-line#Allowable_properties)

#### :placeholder-shown疑似クラス

`:placeholder-shown`はプレースホルダーが表示されている状態の要素を選択できます。たとえば次のようなコードの時、

```
<input type="email" placeholder="Your Email Address">
```

```
input {
  background-color: lightblue;
}

input:placeholder-shown {
  background-color: pink;
}
```

プレースホルダーが表示されている時はピンク色に、入力してプレースホルダーが表示されなくなると水色に背景色が変化します。

![プレースホルダーが表示されている時はフォームが赤く、そうでない時は青くなっている](https://ics.media/entry/200413/images/200413_pseudo_class_form_placeholder-shown.png)

#### :focus-within疑似クラス

`:focus-within`疑似クラスは昔からある`:focus`疑似クラスと似ていますがちょっと違います。`:focus`は自身にフォーカスがあたっている時にしか有効になりません。対して`:focus-within`は子要素にフォーカスがあたっている時に有効になります。

```
<p>
  <input type="text">
</p>
```

```
p:focus-within {
  background-color: pink;
}
```

`<input>`タグを持っている`<p>`タグの背景がピンク色に変わります。

![子要素にフォーカスが当たっているpタグに背景色がついている](https://ics.media/entry/200413/images/200413_pseudo_class_form_focus-within.png)

#### :not()疑似クラス

`:not()`は引数に指定したものではない、要素を選択します。

```
<p class="abc">あいうえお</p>
<p class="def">かきくけこ</p>
<p class="abc">さしすせそ</p>
```

```
P {
  color: blue;
}

p:not(.abc) {
  color: red;
}
```

これは`abc`というクラスを持たない`<p>`タグという意味のセレクターになります。上記のHTMLの場合、まんなかの「かきくけこ」だけ赤色に変化します。状態をクラス名で管理するときも使えます。

![abcというクラスを持たない文字だけが赤色にかわる](https://ics.media/entry/200413/images/200413_pseudo_class_form_not.png)

#### :disabled疑似クラス

`disabled`属性のついている要素を選択できます。

```
<input type="text" disabled>
```

```
input:disabled {
  border-color: red;
}
```

`disabled`属性がついているときはボーダーの色が赤になります。

![disabled属性をもったinputタグが赤色のボーダーになる](https://ics.media/entry/200413/images/200413_pseudo_class_form_disabled.png)

### インタラクティブなフォームを作る

これらの疑似要素を活用してデモのインタラクティブなフォームを作っていきます。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/pseudo-class-form/)
-   [ソースコードを確認する](https://github.com/ics-creative/pseudo-class-form/blob/master/index.html)

#### フォーカスすると小さくなるラベル

要素にフォーカスすると、ラベルが小さくなる部分について解説します。CSSは解説に必要な部分のみを抜き出しています。

▼HTML

```
<p>
  <input type="text" id="name" class="input" placeholder="お名前" required />
  <label for="name" class="labelName">お名前 *</label>
  <span class="errorMessage messageBox">必須項目です</span>
  <span class="OKMessage messageBox">OKです！</span>
</p>

```

▼CSS

```
p {
  display: flex;
  flex-direction: column;
}

p:focus-within .labelName {
  transform: translateY(0) scale(0.8);
}

input {
  order: 2;
}

input::placeholder {
  color: transparent;
}

.labelName {
  display: block;
  order: 1;
  transition: transform 0.2s;
  transform: translateY(2rem) scale(1);
  transform-origin: 0 100%;
}
```

見た目ではフォームのラベルが前にありますが、HTML上では`input`要素の後に記述しています。これは後述のCSSセレクターの都合でこのような構成になっています。並び順を`display: flex`の`order`プロパティで変更しています。

`placeholder`属性を用いてプレースホルダーを設置していますが、見た目上は使用しないので`color: transparent`で透明にしています。

プレースホルダーの代わりにラベルを`transform`プロパティを使って移動させています。ここで`:focus-within`疑似クラスを使って`p:focus-within .labelName`というセレクターを作ります。これは**子要素にフォーカスが当たっている`<p>`タグの`.labelName`という要素**です。このセレクターでフォーカス時に`.labelName`要素を`transform: translateY(0) scale(0.8);`という値に変化させて、左上に小さくなるようにします。

しかし、このままだと入力を終えてフォーカスが外れた時に元に戻ってしまいます。つまり入力内容とラベルが重なってしまう状況です。入力後は戻ってほしくないので、その設定を追加します。

入力後の状態を考えると、プレースホルダーの表示有無で判別できます。これをコードにすると下記のようになります。

```
input:not(:placeholder-shown) ~ .labelName {
  transform: translateY(0) scale(0.8);
}
```

`:not()`疑似クラスと`:placeholder-shown`疑似クラスの組み合わせ技です。`:placeholder-shown`を`:not()`することで入力後の状態を選択できます。

`~`を使ったセレクターはあまり見かけないかもしれませんが、**一般兄弟結合子**とよばれる結合子です。同じ親要素内で、その要素の後にある要素を選択できます。**上記例は`<inputタグ>`のプレースホルダーが出ていない時、その後ろにある.labelNameという意味**のセレクターになります。

![一般兄弟結合子で選択される要素](https://ics.media/entry/200413/images/200413_pseudo_class_form_combinator.png)

これが`<label>`タグを`<input>`タグの後に配置した理由になります。こうすることで`<input>`タグの状態に応じて後ろの`.labelName`のスタイルを変更できます。

#### バリデーションメッセージ

`pattern`属性や`type`属性のバリデーションは送信ボタンを押した時に間違っていることをお知らせします。裏を返せば送信するまでユーザーは間違っていることに気づきません。これはあまり良いユーザー体験にならないでしょう。

`:invalid`疑似クラスを用いて、インタラクティブにバリデーションメッセージを通知するようにしてみます。

▼HTML

```
<input
  type="Password"
  id="password"
  class="input"
  required
  placeholder="パスワード"
  pattern="^[0-9A-Za-z]+$"
  minlength="6"
  maxlength="18"
/>
<label for="password" class="labelName"
  >パスワード（半角英数6文字以上18文字以下）*</label
>
<span class="errorMessage messageBox">正しい形式で入力してください</span>
<span class="OKMessage messageBox">OKです！</span>

```

▼CSS

```
input:invalid ~ .errorMessage {
  display: block;
}

input:invalid ~ .OKMessage {
  display: none;
}

input:valid ~ .errorMessage {
  display: none;
}

input:valid ~ .OKMessage {
  display: block;
}

input:placeholder-shown ~ .messageBox {
  display: none;
}

```

ラベルのときと同じように一般兄弟結合子を用いて`input`タグの状態に応じて`.errorMessage` `.OKMessage`の表示を切り替えています。未入力時にはメッセージそのものを非表示にしています。

#### フォーム全体の妥当性を検知する

フォームのどれかに入力内容に不備があると、デフォルトでも送信ボタンを押した時に送信を止めてくれます。しかし、不備がある場合にはそもそも押せないようにした方がユーザー体験は良いでしょう。ボタンを非活性にするには`disabled`属性を利用します。

`disabled`属性の切り替えもCSSだけでできれば良かったのですが、さすがに属性の動的な切り替えはCSSではできません。切り替えはJavaScriptで行います。

フォーム全体の妥当性をチェックするのに、1つ1つのフォームをチェックしていくのも良いですが、実は`form:valid`で全体の妥当性を検知できます！

#### ボタンの活性・非活性

送信ボタンの活性・非活性を`form:valid`の取得有無で切り替えます。

```
const validForm = document.querySelector("form:valid");
```

`validForm`はきちんとフォームに入力されている時に要素を取得できますが、`invalid`な状態の時には`null`になります。

```
const submitButton = document.querySelector("#submit");
submitButton.disabled = validForm === null;
```

`validForm == null`の時は`submitButton.disabled`が有効に、そうでないときは無効になります。これを関数としてまとめると、

```
const validate = () => {
  const validForm = document.querySelector("form:valid");
  const submitButton = document.querySelector("#submit");
  submitButton.disabled = validForm === null;
};
```

となります。この関数を、初回読み込み時とフォームへの入力時に呼び出します。

```
// 初期読み込み時に実行
validate();

// フォームに入力されたら、validate関数を実行
document.querySelectorAll("input,textarea").forEach((input) => {
  input.addEventListener("input", validate);
});
```

入力時にバリデーション関数を呼び出せばインタラクティブにボタンの活性・非活性を切り替えられます。

これでインタラクティブなフォームの完成です！

### ブラウザサポート状況

今回使った疑似クラスの中でブラウザ対応状況が一番狭いのは`:focus-within`です。こちらはChromium化以降のEdgeのみのサポートになります。

![:focus-within疑似クラスのサポート状況](https://ics.media/entry/200413/images/200413_pseudo_class_form_support.png)

また`:valid`疑似クラスの`<form>`タグへの適用もChromium化以降のEdgeが必要になります。

![:valid疑似クラスのformタグへの適用のサポート状況](https://ics.media/entry/200413/images/200413_pseudo_class_form_support2.png)

**ブラウザサポート状況**

-   `<form>`タグへの`:valid`  
    [Can I Use | :valid: Applies to <form> elements](https://caniuse.com/#feat=mdn-css_selectors_valid_form)
-   `::placeholder`  
    [Can I Use | ::placeholder CSS pseudo-element](https://caniuse.com/#feat=css-placeholder)
-   `:placeholder-shown`  
    [Can I Use | :placeholder-shown CSS pseudo-element](https://caniuse.com/#search=placeholder-shown)
-   `:focus-within`  
    [Can I Use | :focus-within CSS pseudo-class](https://caniuse.com/#feat=css-focus-within)

### まとめ

ここで挙げたのはその一例ですが、活用の仕方は無数にあります。今回はフォームのインタラクション部分に注目しましたが、より細かい`<input>`タグの使い方はこちらの記事[『今どきの入力フォームはこう書く！ HTMLコーダーが抑えるべきinputタグの書き方まとめ』](https://ics.media/entry/11221/)に詳しく書かれています。

疑似クラスを活用して、より質の高いフォームを、より手軽に作ってユーザー体験を高めていきましょう。