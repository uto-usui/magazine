---
title: "お問い合わせフォームのウェブアクセシビリティー対応の方法"
source: "https://ics.media/entry/201016/"
publishedDate: "2020-10-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

フォームはウェブサイトの中でもインタラクションの多い箇所です。ユーザー側にきちんと情報を伝え、そして正しく入力してもらう必要があるのでアクセシビリティーには気をつけたいです。アクセシビリティー対応といえばWAI-ARIAによる支援がありますが、この記事ではWAI-ARIAに限らずどう対応するべきなのか、デモを用いて紹介します。

バリデーションに関してシンプルに実現できるものと、ちょっと凝ったリアルタイムバリデーションのものと2例用意しています。後者は動的に変化するコンテンツへのアクセシビリティー対応について解説しています。

-   [サンプルを別ウィンドウで開く（シンプル版）](https://ics-creative.github.io/201016_form_accessibility/simple/)
-   [サンプルを別ウィンドウで開く（リアルタイム版）](https://ics-creative.github.io/201016_form_accessibility/liveValidation/)
-   [コードを確認する](https://github.com/ics-creative/201016_form_accessibility/tree/master/docs)

▼シンプルなバリデーション

![HTML5バリデーションの様子](https://ics.media/entry/201016/images/201012_form_gif_simple.gif)

▼ちょっと凝ったバリデーション

![リアルタイムフォームバリデーションの様子](https://ics.media/entry/201016/images/201012_form_gif_live_validation.gif)

### まずはセマンティックなマークアップを

WAI-ARIAを使ったコーディングというと、とにかく`role`属性や`aria-label`属性でマークアップすればよいかと思うかもしれませんが、必ずしもそうとは限りません。WAI-ARIAはあくまでセマンティックの支援なので、HTMLとして用意されているタグがあれば、それを用いるべきです。具体的にはボタンには`<a>`タグや`<button>`タグを**原則的には**使用しましょう。

### 静的なマークアップの限界

ただ、できる限りネイティブのタグを用いても現代のウェブですべてのアクセシビリティーを賄うのは難しいです。とくに**状態の変化について知らせるのは、静的なマークアップだけで対応するのが困難**なポイントです。そのような状態の変化についてはWAI-ARIAとJavaScriptを使って支援技術（スクリーンリーダーなどの、障害のあるユーザーへのインタラクションを容易にする技術）へ通知します。

### フォームのアクセシビリティー

それでは具体的なフォームのアクセシビリティー対応をコードも含めてみていきます。

#### ラベル付け

入力要素に適切にラベル付けすることで視覚的にもアクセシビリティー的にも関連付けできます。

まずはフォーム自体のラベルです。デモの見た目では「お問い合わせフォーム」という見出しがついているので、このフォームがお問い合わせフォームであることは**見れば**分かります。その一方でHTML上では「見出し」と「フォーム」という要素が並んでいるだけであり、HTMLのセクショニング・コンテンツ以上の関連付けはされていません。

そこで`aria-labelledby`属性を使ってラベル付けをします。labeled byとあるようにラベル付けする方にラベルを示す要素を`id`属性で指定します。

```
<h1 id="formTitle" class="formTitle">お問い合わせフォーム</h1>
<form aria-labelledby="formTitle"></form>
```

これで`<form>`は`id=formTitle`という要素（`<h1>`タグ）でラベルしています、という意味になります。

続いてフォームの各入力要素のラベリングです。`<label>`タグと`for`属性を用いればネイティブなHTMLだけでラベリングします。`for`属性にラベルしたい要素の`id`属性をいれます。

```
<label for="name" class="labelName">お名前 （必須）</label>
<input 
  type="text"
  id="name"
  class="input"
  required 
/>
```

これで`<input>`と`お名前 *`を関連付けできます。

あるいは`<label>`タグで囲ってしまうのも有効です。この場合はラベル対象が明確なので`for`属性はいりません。

```
<label class="labelName">お名前 （必須）
  <input 
    type="text"
    id="name"
    class="input"
    required 
  />
</label>
```

事情により`<label>`タグを使えない場合は`<form>`と同じように`aria-labelledby`属性を使用します。`<label>`タグとは付ける方と付けられる方の**関係が逆**になるので注意です。

```
<span id="nameLabel" class="labelName">お名前 （必須）</span>
<input
  type="text"
  id="name"
  class="input"
  required
  aria-labelledby="nameLabel"
/>

```

#### フォームの説明

ラベルとは別にフォームの説明と関連付けたい場合は`aria-describedby`属性を使用します。今回のデモではパスワード入力欄に使っています。

```
<input
  type="Password"
  id="password"
  class="input"
  required
  pattern="^[0-9A-Za-z]+$"
  minlength="6"
  maxlength="18"
  aria-describedby="passwordType"
/>

<span id="passwordType" class="describe">（半角英数6文字以上18文字以下）</span>
```

`aria-describedby="passwordType"`で`id="passwordType"`の要素とひもづけることで、パスワード入力欄は「半角英数6文字以上18文字以下」であることを説明しています。

#### 必須要素

今回のフォームではすべての入力項目が必須になっています。`required`属性を使えば入力項目が必須であることをブラウザに伝えられます。NVDAなどのスクリーンリーダーはこれだけでも必須である旨を読み上げてくれます。

```
<input 
  type="text"
  id="name"
  class="input"
  required 
/>
```

### バリデーションのアクセシビリティー

ここまでは静的な部分についてアクセシビリティー対応を説明しました。次に、動的な要素である入力バリデーションについて説明します。

手軽なのはHTML5からネイティブで用意されているバリデーションを使うことです。

![HTML5バリデーションの様子](https://ics.media/entry/201016/images/201012_form_gif_simple.gif)

これは`<input>`タグの`required`属性や`type`属性、`pattern`属性をもとに入力された内容を**送信ボタン押下時に判定**します。エラーがある場合はその項目にエラーメッセージが表示されます。特別なアクセシビリティー対応をせずとも、それらのエラーメッセージをスクリーンリーダーは読み上げるのでエラーへのアクセシビリティー対応はシンプルに実現できます。

とはいえ、デザインの都合や送信ボタンを押さずともバリデーションをしたい場合などは自前で実装する必要があります。

![リアルタイムフォームバリデーションの様子](https://ics.media/entry/201016/images/201012_form_gif_live_validation.gif)

こうした動的に内容が変わる部分についてはWAI-ARIAで補強する必要があります。

#### エラーステータス

メッセージの表示・非表示は以下のスクリプトで行っています。

```
/**
 * aria-hidden属性を変更します
 * @param event
 */
const changeAriaHidden = event => {
  const inputElement = event.target;
  const liveRegionElement = inputElement.parentNode.querySelector(
    "span[role='status']"
  );

  if (liveRegionElement == null) {
    return;
  }
  if (inputElement.validity.valid) {
    // inputタグのバリデーションがvalidならばOKメッセージを表示
    liveRegionElement.querySelector(".OKMessage").setAttribute("aria-hidden", "false");
  } else {
    // inputタグのバリデーションがinvalidならばエラーメッセージを表示
    liveRegionElement
      .querySelector(".errorMessage")
      .setAttribute("aria-hidden", "false");
  }
};
```

スクリプト自体は`aria-hidden`属性の切り替えを行っています。`aria-hidden`属性はコンテンツが表示されているか否かを知らせる属性です。`aria-hidden="true"`であれば、そのコンテンツは表示されていない状態です。

変更イベントを受け取ると、変更された要素`inputElement`とメッセージのラッパー要素`liveRegionElement`を取得します。入力要素のバリデーションは`inputElement.validity.valid`で判定できるので、妥当な場合`.OKMessage`要素の`aria-hidden`属性を`false`、つまり表示に変更します。そうでない場合は`.errorMessage`を`aria-hidden="false"`にしてエラーの方を表示させています。

なお、`setAriaHidden`関数で入力中には両方のメッセージが非表示となるようにしています。

メッセージ部分のHTMLを見てみます。ラッパー要素には`aria-live="polite"`と`role="status"`という属性がついてます。

```
<span aria-live="polite" role="status">
  <span class="errorMessage messageBox" aria-hidden="true"
    >正しい形式で入力してください</span
  >
  <span class="OKMessage messageBox" aria-hidden="true">OKです！</span>
</span>
```

`aria-live`は**ライブリージョン**とも呼ばれ動的なコンテンツであることを支援技術へ知らせます。`polite`という値は更新されたことをどの優先度で通知するかを設定します。`polite`は区切りの良いタイミングで通知します。読み上げで例を挙げれば、進行中の読み上げが終わった後に、変更が読み上げられるような感じです。それに対して`assertive`は`polite`よりも優先度が高く、すぐに通知します。

もう1つの属性`role="status"`はここがステータスを表す部分であることを示しています。似たようなロールとして`role="alert"`もありますが、今回はOKとエラー両方を表示するので`role="status"`としました。エラーのみ表示の場合は`role="alert"`が良いでしょう。

ライブリージョンがあることで子要素の変更を検知します。このデモで動的に変わるのは`.messageBox`要素です。この要素の表示・非表示の変更を検知し、変化があったことを支援技術へ伝えられます。

つづいてCSSを見てみます。

```
.messageBox[aria-hidden=true] {
  display: none;
}
```

CSSの属性セレクターとしてWAI-ARIAを利用しています。WAI-ARIA自体はHTMLの属性なのでこのような使い方ができます。今回は表示・非表示の状態を`aria-hidden`属性を使ってJavaScriptで制御しています。そのため新たにCSS切り替え用のクラス名などを用意しなくても属性セレクターで切り替えできます。

上記のとおり、メッセージは`aria-hidden="true"`がついている時は非表示に`aria-hidden="false"`の時は効かないので表示される仕組みです。

#### ボタンの活性・非活性

ボタンの活性・非活性というと`disalbed`属性がありますが、これには問題点があります（※1）。`disabled`になっているとタブキーによってフォーカスせず、ボタンに到達できません。このままではスクリーンリーダーで読み上げてもらえず、ないものになってしまいます。

そこで使うのが`aria-disabled`属性です。ネイティブの`disabled`属性と違い、ボタンのフォーカスは効くうえ、スクリーンリーダーでは「無効なボタン」である旨を読み上げてくれます。

ボタンの活性・非活性はフォーム全体のバリデーションに紐付いていますが、これは`<form>`タグへの疑似クラス`:valid`を使って、その要素の有無で判定できます。

```
const validForm = document.querySelector("form:valid");
```

`validForm`が`null`ならバリデーションエラーのある状態、そうでない場合はOKな状態で判定できます。これを使ってボタンの活性・非活性とメッセージの表示の切り替えを行っています。

```
const submitButton = document.querySelector("#submit");
const formValidateMessage = document.querySelector("#formValidate");
// フォーム全体が妥当なら送信ボタンのaria-disabledをfalse、そうでない場合はtrue
submitButton.setAttribute("aria-disabled", String(validForm === null));
// ボタンのステータスメッセージの表示・非表示
if (validForm !== null) {
  formValidateMessage
    .querySelector(".OKMessage")
    .setAttribute("aria-hidden", "false");
  formValidateMessage
    .querySelector(".errorMessage")
    .setAttribute("aria-hidden", "true");
} else {
  formValidateMessage
    .querySelector(".OKMessage")
    .setAttribute("aria-hidden", "true");
  formValidateMessage
    .querySelector(".errorMessage")
    .setAttribute("aria-hidden", "false");
}
```

余談にはなりますが、スクリーンリーダーを利用しない人にはボタンの活性・非活性だけでもフォームのバリデーションを確認できるので、フォーム全体のステータスメッセージに関しては`opacity: 0`で見えなくするのも可能です。`visibility: hidden`や`display: none`だと読み上げされなくなってしまうので、`opacity`を使って隠す必要があります。高さを消す場合には別途`height: 0`や`position: absolute`などを使って打ち消してください。

逆にデザイン上どうしても入れたくないが、アクセシビリティーを確保するための手法としても使えるでしょう。とはいえ、**視覚的要素の配慮だけがアクセシビリティーではない**ので、すべての人が等しく使えるようなデザインにすることも大切です。

### アクセシビリティー対応にはいろいろなやり方がある

ここで挙げたのはアクセシビリティー対応への一例です。今回はWAI-ARIAを使ったアクセシビリティーについて主に解説していきましたが、文字の大きさ・コントラストといった観点もアクセシビリティーの中にはあります。

必ずしもこれが正解というわけではありませんが、誰でも扱えるようにするのがアクセシビリティー対応の第一義です。やり方がいろいろあって迷うかもしれませんが、何もやらないよりはやった方がアクセシビリティーに寄与できます。まずは、わかるところから始めるのも良いでしょう。

ICS MEDIAでは、他にもアクセシビリティーに関する記事が公開されています。あわせてご覧ください。

-   [ウェブ制作に関わる人に役立つウェブアクセシビリティーの基本](https://ics.media/entry/15428/)
-   [アクセシビリティーに考慮するHTMLコーディング - WAI-ARIAでスクリーンリーダーの読み上げがこう変わる](https://ics.media/entry/230821/)
-   [今どきの入力フォームはこう書く！ HTMLコーダーがおさえるべきinputタグの書き方まとめ](https://ics.media/entry/11221/)

### 補足

本記事の読み上げソフトには「[NVDA（日本語版）](https://www.nvda.jp/)」とmacOSの「[VoiceOver](https://www.apple.com/jp/accessibility/mac/vision/)」を使用して検証しました。

参照記事

-   [※1 Aria-disabled | Introduction to Accessibility](https://a11y-101.com/development/aria-disabled)

### 更新履歴

-   2020年10月 初版
-   2025年3月 必須要素の`required`属性と`aria-required`属性について過去の閲覧環境では併用しないと読み上げられないことがあったが、現代ではその問題はないため削除。