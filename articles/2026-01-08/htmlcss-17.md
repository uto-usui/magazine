---
title: "リンク/ボタン/フォームをより良くするHTML・CSS 17選"
source: "https://ics.media/entry/221208/"
publishedDate: "2022-12-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2022年12月9日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブサイト制作において見た目がきちんと実装されているのは大事なことですが、コードのちょっとした違いでユーザーの不便につながることもあります。本記事では見た目だけでなくユーザーの使い勝手にも気をつけたコーディングテクニックについて解説してます。今回はユーザーが特に使い心地を感じやすいインタラクション部分で、シンプルなHTML・CSSだけでより良くできる17個に絞って紹介します。

下記サンプルでNG例とよい例の両方を紹介しています。実際に違いに触れながら本記事を読むと分かりやすいです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/221208_coding_details_interactive/)
-   [コードを確認する](https://github.com/ics-creative/221208_coding_details_interactive/blob/main/src/index.html)

### 1\. divタグをボタンにするのは避けよう

見た目はボタンのようでも、`<div>`要素で実装したボタンはアクセシビリティの観点からもよくありません。ボタンとしての機能を持つなら`<button>`要素を用いるのが多くの場面でも有効です。もし、諸事情で`<div>`要素を用いないといけない場合は、キーボード操作でのフォーカスや、WAI-ARIA等でスクリーンリーダーのケアをする必要があります。

![見た目は同じだが、divタグで作ったボタンとbuttonタグで作ったボタン](https://ics.media/entry/221208/images/221208_1.png)

```
<!-- NG -->
<div>Click</div>

<!-- Good -->
<button>Click</button>
```

### 2\. 適切なクリッカブルエリアの確保

小さいアイコンをボタンにする場合に気をつけたいことがあります。アイコンの見た目どおりの境界ではなく、周りに余白を設けてアイコン周辺でも反応するようクリッカブルエリア（クリックできる範囲）を設定するのがよいでしょう。`padding`で余白を付けて領域を広げたり、背景色やレイアウトの関係で`padding`が難しい場合は疑似要素を使ってクリッカブルエリアを拡大できます。

![NG例はアイコンぴったりにしか反応しないが、Good例は余白でも反応している](https://ics.media/entry/221208/images/221208_2.gif)

```
/* NG 32px四方しかないアイコン */
.icon {
  position: relative;
  width: 32px;
  height: 32px;
}

/* Good 疑似要素を使って50px四方にクリッカブルエリアを拡大 */
.icon::before {
  position: absolute;
  top: -9px;
  left: -9px;
  display: block;
  width: 50px;
  height: 50px;
  content: "";
}
```

またデザインの段階でも小さいアイコンを用いるのは避けた方が良いでしょう。[Web Content Accessibility Guidelines](https://waic.jp/docs/WCAG21/#target-size)によればインタラクションの大きさは44×44 ピクセル以上であることを推奨しています。

### 3\. 途切れないリンクエリア

外部リンクなどを表す際にテキストリンクの後ろに別タブで開くことを示すアイコンを設置することもあるでしょう。その際、前述のクリッカブルエリアと同様に余白設定をしないと途切れることがあります。

![NG例は別タブアイコンとテキストの間でリンクエリアが切れているが、Good例は切れていない](https://ics.media/entry/221208/images/221208_3.gif)

```
/* NG */
.externalLink {
  position: relative;
  color: #000;
}

.externalLink::after {
  position: absolute;
  top: 6px;
  right: -20px; /* アイコンが領域外に飛び出ている */
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  background-image: url("/assets/images/icon_tab.svg");
  background-repeat: no-repeat;
  background-size: 12px;
}

/* Good */
.externalLink {
  position: relative;
  color: #000;
}

.externalLink::after {
  position: absolute;
  top: 6px;
  right: 0; /* 余白内右端に配置 */
  display: block;
  width: 12px;
  height: 12px;
  padding-right: 20px; /* アイコンの分余白を確保 */
  content: "";
  background-image: url("/assets/images/icon_tab.svg");
  background-repeat: no-repeat;
  background-size: 12px;
}
```

### 4\. ハンバーガーメニューの領域

モバイル版のナビゲーションとしてよく利用されるハンバーガーメニューですが、このようなデザインの時は罫線の枠内全域がクリッカブルエリアのほうが良いでしょう。文字部分のみにしかリンクエリアがない場合は、右側の余白部分をタップ・クリックしても反応しません。ボタンのデザインと同じく項目の領域全体が反応するほうが使いやすいです。

![NG例はテキスト部分しかリンクエリアになっていないが、Good例は枠内全域がリンクエリアになっている](https://ics.media/entry/221208/images/221208_4.gif)

```
<ul class="menu">
  <li>
    <a href="#">About</a>
  </li>
</ul>
```

```
/* NG */
li {
  padding: 16px; /* リストタグが余白を確保している */
}

/* Good */
a {
  display: block;
  padding: 16px; /* aタグが余白を確保している */
}
```

### 5\. <input>要素をlabel要素で紐付ける

`<input>`要素に適切なラベルを紐付けるとアクセシビリティ・ユーザビリティ両面からメリットがあります。アクセシビリティ観点としては`<input>`要素にフォーカスした時に支援技術がラベルを読み上げるので、ユーザーの理解を助けます。ユーザビリティ観点としてはラベルをクリックした時にも要素にチェックが入ったり、フォーカスできたりするなど入力しやすくします。

`<input>`要素と`<label>`要素を紐付ける方法ですが、`<label>`要素で囲ってしまう方法が手軽です。囲う方法が選択できない場合は`<label>`要素の`for`属性と`<input>`要素の`id`属性を一致させることでも紐付けできます。

![NG例はテキスト部分をクリックしてもチェックが入らないが、Good例はテキスト部分をクリックしたらチェックが入る](https://ics.media/entry/221208/images/221208_5.gif)

```
<!-- NG -->
<input type="checkbox" />個人情報保護方針に同意する

<!-- Good label要素で囲う -->
<label><input type="checkbox" />個人情報保護方針に同意する</label>

<!-- Good id属性とfor属性で紐付ける -->
<input type="checkbox" id="agreePrivacy" />
<label for="agreePrivacy">個人情報保護方針に同意する</label>
```

### 6\. placeholderをラベル代わりにしない

前述と関連しますが、テキスト入力の`<input>`要素に`placeholder`属性を用いてラベルの代わりとするのは避けたほうがよいでしょう。`<label>`要素を用いないと要素とラベルの紐付けは不十分であり、[HTML Living Standard](https://html.spec.whatwg.org/multipage/input.html#the-placeholder-attribute)によれば`placeholder`属性は**ユーザの入力を助ける短いヒント**なので用法として不適切です。

![NG例はプレースホルダーをラベル代わりにしており、ラベルがない状態、Good例はプレースホルダーとは別にラベルが用意されている](https://ics.media/entry/221208/images/221208_6.png)

```
<!-- NG -->
<input type="text" placeholder="お名前" />

<!-- Good -->
<label>お名前 <input type="text" placeholder="山田太郎" /></label>
```

### 7\. インタラクションを重ねない、近づかせすぎない

インタラクティブな要素の中に別のインタラクティブな要素を重ねるとユーザーに精密な操作を要求することになります。下記の例では個人情報保護方針の同意UIで見かける形ですが、チェックのクリッカブルエリアとリンクのクリッカブルエリアが重なっているので誤操作（チェックを入れようとしたらリンクをクリックしてしまう）の原因になります。

![NG例はテキストリンクがチェックボックスのインタラクションエリアと重なっている、Good例はテキストリンクとチェックボックスが別々になっている](https://ics.media/entry/221208/images/221208_7.png)

```
<!-- NG -->
<label>
  <input type="checkbox" />
  <a href="#" target="_blank">個人情報保護方針</a>に同意する
</label>

<!-- Good -->
<a href="#" target="_blank">個人情報保護方針について</a><br />
<label> <input type="checkbox" />個人情報保護方針に同意する </label>
```

またインタラクティブな要素同士が近すぎるのも誤操作を誘発するので、十分距離を空けておいたほうがよいでしょう。

### 8\. アイコンのみのボタンには適切なラベルを付与する

アイコンのみのボタンに適切なラベルを与えないと、スクリーンリーダーなどに読み上げらないという問題があります。アイコンとともにテキストも添えてあげるデザインが親切ですが、アイコンのみとする場合は`aria-label`属性や不可視テキストでラベル情報を補ってあげるのが良いです。

![NG例はラベルがないので読み上げられないが、Good例は適切なラベルが付与されているので読み上げ可能になっている](https://ics.media/entry/221208/images/221208_8.png)

```
<!-- NG -->
<button></button>

<!-- Good aria-labelで実装 -->
<button aria-label="検索する"></button>

<!-- Good 不可視テキストで実装 -->
<button>
  <span class="sr-only">検索する</span>
</button>
```

```
/* 要素を不可視にするスタイル */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  border: 0;
}
```

なお、2つ目の不可視テキストはボタンのラベルだけでなく、スクリーンリーダーなどの支援技術へテキストを伝える手段としてさまざまな場面で汎用性のある方法です。

### 9\. ボタンにはcursor:pointerをつけよう

意外かもしれませんが、デフォルトでは`<button>`要素にホバーしてもカーソルの見た目は変わらず矢印のままです。インタラクティブな要素であることを示すためにもCSSの`cursor`プロパティの値を`pointer`で指差しアイコンにしてあげると親切です。

![NG例はホバーすると矢印カーソルのままだが、Good例はホバーすると矢印カーソルに変化する](https://ics.media/entry/221208/images/221208_9.gif)

```
button {
  cursor: pointer;
}
```

### 10\. タッチデバイスでのホバーアニメーションの回避

ホバーアニメーションはマウス操作のデスクトップデバイスでは有用ですが、タッチデバイスにはホバーというのがありません。しかしながら`:hover`疑似クラスで実装されたアニメーションはタッチ時に発火してしまい、微妙な表現になることがあります。そこで`any-hover`メディア特性をメディアクエリで用いてタッチデバイスにおけるホバーアニメーションを回避します。

![NG例はタッチで色が変わってしまうが、Good例はタッチでも色が変わらない](https://ics.media/entry/221208/images/221208_10.gif)

```
/* ホバー可能なデバイスでのみ適用される */
@media (any-hover: hover) {
  .hoverLinkGood:hover {
    color: orangered;
  }
}
```

### 11\. インタラクション要素へのフォーカス時にoutline:noneをつけるのは避けよう

キーボード操作などでインタラクション要素にフォーカスがあたった時は枠線が表示されます。このフォーカス時の枠線は`outline`プロパティによってブラウザーのデフォルトスタイルとして提供されています。`outline`プロパティを上書きすると枠線を消せますが、アクセシビリティ観点から避けたほうが良いでしょう。

![NG例はフォーカスが可視化されていないが、Good例はフォーカスが可視化されている](https://ics.media/entry/221208/images/221208_11.png)

```
/* NG */
button {
  outline: none;
}
```

特別な事情がなければ上書きしないほうがベターです。このデモのように色が濃いボタンの場合は`outline-offset`で少し離してあげるのも良いかもしれません。

### 12\. アコーディオンを作るときはsummary・detailsタグが便利

ウェブサイトのUIとして、大量の情報を整理するためにアコーディオン表現を使うこともあります。このUIを`<summary>`要素と`<details>`要素を使って実装すると便利です。これらを使うと、開閉状態なども特別な追加実装なく支援技術に伝えられます。詳しくは記事[『detailsとsummaryタグで作るアコーディオンUI - アニメーションのより良い実装方法』](https://ics.media/entry/220901/)にて解説しています。

![見た目は同じだがNG例はdivタグで作られていて、Good例はsummaryとdetailsタグで作られている。Good例ではフォーカスでき、スペースキーで開閉できます。](https://ics.media/entry/221208/images/221208_12.gif)

```
<!-- NG -->
<div>
  <div>概要</div>
  <div>折りたたまれている部分です。</div>
</div>

<!-- Good -->
<details>
  <summary>概要</summary>
  <div>折りたたまれている部分です。</div>
</details>
```

### 13\. 大きくしたり、移動したりする場合はtransformを使おう

大きくしたり、移動したりするアニメーション表現のときは`width`プロパティや`left`プロパティを動かすより、`transform`プロパティのほうが便利です。`width`プロパティを変更すると要素の大きさそのものを変更するのでレイアウトへ影響があります。`transform`プロパティの`scale()`値を使えば見た目は大きくしつつも、レイアウトへの影響がありません。

![NG例はホバーすると周りのレイアウトへ影響を与えるが、Good例は周りのレイアウトへは影響を与えていない](https://ics.media/entry/221208/images/221208_13.gif)

```
/* NG */
button {
  width: 148px;
  height: 42px;
  transition: width 0.4s, height 0.4s;
}

button:hover {
  width: 178px;
  height: 50px;
}

/* Good */
button {
  width: 148px;
  height: 42px;
  transition: transform 0.4s;
}

button:hover {
  transform: scale(1.2);
}
```

また、`left`プロパティや`width`プロパティをアニメーションするとややカクついたような動きになります（とくに低速時に顕著）。これは、`left`プロパティや`width`が1px単位でしかアニメーションできないためです。一方で`transform`プロパティは小数点単位でアニメーションできるため、`transform`プロパティの方が滑らかになります。アニメーションの観点からも大きさを変えたり移動させたりする場合は`transform`プロパティを使うと良いでしょう。

### 14\. 境界でのホバーに注意

ホバーで要素の大きさを変えたり、移動させたりするアニメーションはその境界付近での挙動に注意が必要です。アニメーション開始と終了が高速に繰り返されて荒ぶることがあります。

![NG例は境界付近にホバーすると拡縮を高速で繰り返しているが、Good例は高速の拡縮が起こらない](https://ics.media/entry/221208/images/221208_14.gif)

ホバーの前後でインタラクティブな領域が変わるため、ホバー → 小さくなる → ホバー外れる → 戻る → ホバー → …と繰り返されてしまうのが原因です。アニメーションの挙動だけでなくインタラクティブな領域が変わるのはユーザビリティとしてもあまり良くありません。ホバーの前後で変わらないようにしてあげるとよいでしょう。

```
<!-- NG -->
<button>Hover</button>

<!-- Good -->
<button>
  <span class="inner">Hover</span>
</button>
```

```
/* NG */
button {
  transition: transform 0.2s;
}

button:hover {
  transform: scale(0.5);
}

/* Good */
button .inner {
  transition: transform 0.2s;
}

button:hover .inner {
  transform: scale(0.5);
}
```

この実装例では、ボタンの見た目は内部の`<span>`要素にて行っています。インタラクティブな要素である`<button>`要素ではなく、内部の`<span>`要素をアニメーションさせることで領域の変化を防いでいます。

### 15\. input要素をカスタムするときにdisplay:noneにしない

`<input>`要素をブラウザデフォルトのUIではなく独自のデザインで作ることもあります。その際に`<input>`要素に`display: none`のスタイルをあててしまうとフォーカスできなくなります。`<label>`タグと不可視テキストのテクニックを組みあわせると、フォーカス制御を活かしつつ入力フォームを独自デザインにできます。

![NG例はチェックボックスにフォーカスできないが、Good例はフォーカスできる](https://ics.media/entry/221208/images/221208_15.png)

```
<!-- NG -->
<label class="customCheckbox">
  <input type="checkbox" />個人情報保護方針に同意する
</label>

<!-- Good -->
<label class="customCheckbox">
  <input type="checkbox" class="sr-only" />個人情報保護方針に同意する
</label>
```

```
.customCheckbox {
  /* カスタマイズしたスタイル */
}

/* NG */
.customCheckbox input {
  display: none
}

/* Good */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  border: 0;
}
```

### 16\. input要素にautocomplete属性を設置してあげると便利

`<input>`要素には`autocomplete`属性というユーザー入力を補助する機能があります。ブラウザーによって細かい挙動（\*1）は違うのですが`autocomplete`属性と適切な値を設定することで有効になります。Safariは`<form>`要素で囲わないと有効にならないので、`<form>`要素も合わせて設置するのがよいです。詳細については記事[『今どきの入力フォームはこう書く！ HTMLコーダーがおさえるべきinputタグの書き方まとめ』](https://ics.media/entry/11221/)にて解説しています。

![Good例はブラウザによる自動入力が有効になってサジェッションが表示されている](https://ics.media/entry/221208/images/221208_16.png)

```
<!-- NG -->
<div>
  <label>お名前<input type="text" name="name" /> </label>
  <label>郵便番号<input type="text" name="postal-code" /></label>
  <label>メールアドレス<input type="email" name="email" /></label>
</div>

<!-- Good -->
<form>
  <label>お名前<input type="text" name="name" autocomplete="name" /> </label>
  <label
    >郵便番号<input type="text" name="postal-code" autocomplete="postal-code"
  /></label>
  <label
    >メールアドレス<input type="email" name="email" autocomplete="email"
  /></label>
</form>
```

### 17\. input要素の文字サイズを16px未満に指定しない

iOS Safariでの挙動ですが、`<input>`要素の`font-size`を`16px`未満に指定するとフォーム部分へズームしています。入力後もズームしたままなので、拡大率を戻すにはユーザーがピンチアウトしなくてはいけません。あまり小さい文字のフォームをデザインしないほうが良いでしょう。

![NG例は入力欄へ入力しようとするとiOSでズームしてしまうが、Good例はズームしない](https://ics.media/entry/221208/images/221208_17.png)

```
/* NG */
input {
  font-size: 14px;
}

/* Good */
input {
  font-size: 16px;
}
```

### 18\. 装飾系Videoタグのコントロール非表示

モダンブラウザーなら透過動画も実装可能になりました（詳しくは記事[『ウェブサイトに透過動画を埋め込む方法』](https://ics.media/entry/221007/)にて解説）。見せるための動画ではなく、装飾的な動画の使い方も今後増えてきそうです。装飾的な動画も`<video>`タグにて実装されますが、あくまで装飾なので動画コントロールUIは不要です。各種コントロールを非表示にする設定をつけておくとよいでしょう。

![NG例はピクチャインピクチャが可能だが、Good例はピクチャインピクチャがデフォルトでは不可になっている](https://ics.media/entry/221208/images/221208_18.png)

```
<!-- NG -->
<video
  muted
  playsinline
  autoplay
  loop
  src="ikura.mp4"
  width="256"
  height="256"
></video>

<!-- Good -->
<video
  muted
  playsinline
  autoplay
  loop
  controlslist="nodownload nofullscreen noremoteplayback"
  x-webkit-airplay="deny"
  disablepictureinpicture
  src="ikura.mp4"
  width="256"
  height="256"
></video>
```

ただ、あくまで不用意にコントールUIが出てしまうのを防ぐためのものなので、完全にダウンロード不可などにはできません。

### まとめ

ちょっとしたコード上の工夫でサイトの使い心地の向上を図れ、こうした小さな積み重ねがサイト全体のUXなどにつながります。今回紹介したテクニックがよりよいサイトづくりの手助けになれば幸いです。

### 注釈

-   \*1 2022年12月現在のGoogle Chrome 108やMicrosoft Edge 108ではNG例のような`autocomplete`属性がなくても付近に適切なテキストがあれば自動的に有効になります。Safari 16についても1つでも`autocomplete`属性があれば他の要素も有効になるなど、`autocomplete`属性がなくても有効になる場面が存在します。

### 参考

-   [<input>: 入力欄（フォーム入力）要素 - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input)
-   [<label>: 入力欄ラベル要素 - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/label)
-   [F78: 達成基準 2.4.7 の失敗例 － 視覚的なフォーカスインジケータを除去する又は不可視にするような方法で、要素のアウトライン及びボーダーをスタイル指定する](https://waic.jp/docs/WCAG21/Techniques/failures/F78)