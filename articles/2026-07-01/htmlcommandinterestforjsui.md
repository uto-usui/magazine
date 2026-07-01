---
title: "モーダルやツールチップで役立つ! HTMLのcommandとinterestfor属性を使って、JSを減らすスマートなUI開発"
source: "https://ics.media/entry/260209/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-02-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

HTMLとCSSは進歩していますが、以前はJavaScriptが必須だった機能も、今ではHTMLとCSSだけで実現できることも増えています。HTMLの新属性`command`属性と`commandfor`属性、そして`interestfor`属性を使うとダイアログやポップオーバーをHTMLのみで操作できます。本記事では**HTMLからコマンドを宣言してUIを操作する**という新しいアプローチも紹介します。

### command / commandfor属性とinterestfor属性を使ってJavaScriptなしで操作する

まずは`command`属性および`commandfor`属性、そして`interestfor`属性を使ってJavaScriptなしで実装できるようになった、ダイアログとポップオーバーの例を紹介します。新しい属性を使うと、ダイアログとポップオーバーの実装に役立ちます。

#### command属性

`command`属性はクリックなどのユーザー操作をトリガーに実行します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250901_dialog/plain-command/)
-   [コードを確認する](https://github.com/ics-creative/250901_dialog/blob/main/plain-command/index.html)

`command`属性と`commandfor`属性は`<button>`タグの属性です。`command`属性と`commandfor`属性を使ってダイアログの開閉状態をHTMLのみで宣言できます。`command`属性には実行するコマンド（例：show-modal）を指定し、`commandfor`属性には対象要素の`id`値を指定します。この両方が必要になります。

```
<button command="show-modal" commandfor="my-dialog">モーダルダイアログをひらく</button>

<dialog id="my-dialog">
  <p>モーダルダイアログの説明文が入ります。</p>
  <button command="close" commandfor="my-dialog">とじる</button>
</dialog>
```

同様にポップオーバーも`command`属性と`commandfor`属性を使って開閉できます。`<button>`タグの属性として指定します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260209_invoker/popover-command/)
-   [コードを確認する](https://github.com/ics-creative/260209_invoker/blob/main/src/popover-command/index.html)

```
<button command="show-popover" commandfor="popoverElement">commandで開くポップオーバー</button>

<div id="popoverElement" popover>
  <p>ポップオーバーのコンテンツ</p>
</div>
```

従来は`<dialog>`タグの開閉を制御するにはJavaScriptを用いる必要がありました。ポップオーバーは`popovertarget`属性でHTMLのみでも実現可能でしたが、`command`属性と`commandfor`属性を使うことで、同じような書き味で扱えるようになります。今回はシンプルなダイアログとポップオーバーを紹介しましたが、より実用的な使い方やカスタマイズは次の記事で紹介しているので、合わせてご覧ください。

-   [モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素](https://ics.media/entry/250904/)
-   [階層メニューやトーストUIが簡単に作れる新技術！　JavaScriptで利用するポップオーバーAPI](https://ics.media/entry/230530/)

ダイアログやポップオーバーの状態をHTMLから宣言できる`command`属性の組み込みコマンドは次のとおりです。

-   `show-modal`：モーダルダイアログを開く
-   `close`：モーダルダイアログを閉じる
-   `request-close`：モーダルダイアログを閉じる要求を行う（エスケープキーを押したときと同等の挙動）
-   `show-popover`：ポップオーバーを開く
-   `hide-popover`：ポップオーバーを閉じる
-   `toggle-popover`：ポップオーバーを開閉する

`request-close`は`close`と似ていますが、少し挙動が異なります。詳しくは別記事『[コラム：close()とrequestClose()メソッドの違い](https://ics.media/entry/250904/#%E3%82%B3%E3%83%A9%E3%83%A0%EF%BC%9Aclose\(\)%E3%81%A8requestclose\(\)%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%AE%E9%81%95%E3%81%84)』で解説しています。ほかにも独自のコマンドが発行できるカスタムコマンドもありますが、それは後ほど解説します。

なお、`<button>`タグが`<form>`タグ内で使用するときのように`type="submit"`の挙動をする場合には無効になります。この場合は`<button>`タグを`type="button"`にする必要があります。

#### interestfor属性

`interestfor`属性は一定時間ホバーしたときやフォーカスしたときなどに実行します。従来は「関心を示す」というイベントはありませんでした。動作としてのホバーやフォーカスとは別に関心をトリガーとする処理をHTMLで宣言できるようになりました。HTMLの機能として実装されたことにより、さまざまな閲覧環境やユーザーがその恩恵を受けられるようになるのもメリットです。

`interestfor`属性も表示したい要素の`id`の値を指定します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260209_invoker/popover-interest/)
-   [コードを確認する](https://github.com/ics-creative/260209_invoker/blob/main/src/popover-interest/index.html)

```
<button interestfor="popoverElement">しばらくホバー・フォーカス時にポップオーバーをひらく</button>
<div id="popoverElement" popover>
  <p>ポップオーバーのコンテンツ</p>
</div>
```

ツールチップの実装で役立つでしょう。

### command属性とinterestfor属性をJavaScriptで活用する

ここまではJavaScript不要でHTMLだけで利用可能であることを紹介しました。しかし、実はJavaScriptにとっても便利な機能です。

#### command属性のJavaScriptでの活用

`commandfor`で指定した要素は`command`属性で実行したコマンドを`addEventListener`で検知できます。また、実行するコマンドも独自の**カスタムコマンド**として定義できます。カスタムコマンドはCSS変数のように`--`を接頭辞として付けた名前で定義できます。この接頭辞はカスタムコマンドの名称として必須になります。

```
<button command="--custom-command" commandfor="commandTarget">カスタムコマンドを実行する</button>

<div id="commandTarget">
  <p>カスタムコマンドを実行する要素です。</p>
</div>
```

```
const commandTarget = document.getElementById("commandTarget");
commandTarget.addEventListener("command", (event) => {
  // カスタムコマンドの値はevent.commandで取得できます。
  console.log(event.command); // 出力：--custom-command
});
```

`command`イベントの利点は**ボタン側にクリックのイベントハンドラーを設定しなくてよい**ことです。従来はボタン側にもクリックイベントのハンドラーが必要でした。しかし、`command`イベントを使うことでボタン側には`click`イベントのハンドラーを設定せずにコマンドを実行できます。これはつまり、イベント発行側起点で処理を書くのではなく、行いたいコマンドを宣言するだけでよくなります。

それぞれ異なるカスタムコマンドを送信することで、場合分けも可能です。次はボタンを押すと色が変わるサンプルです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260209_invoker/change-color/)
-   [コードを確認する](https://github.com/ics-creative/260209_invoker/blob/main/src/change-color/index.html)

```
<div id="colorBox" class="colorBox"></div>

<button command="--color-red" commandfor="colorBox">Red</button>
<button command="--color-green" commandfor="colorBox">Green</button>
<button command="--color-blue" commandfor="colorBox">Blue</button>
<button command="--color-reset" commandfor="colorBox">Reset</button>
```

```
const colorBox = document.getElementById("colorBox");

colorBox.addEventListener("command", (event) => {
  const command = event.command;
  switch (command) {
    case "--color-red":
      colorBox.style.backgroundColor = "red";
      break;
    case "--color-green":
      colorBox.style.backgroundColor = "green";
      break;
    case "--color-blue":
      colorBox.style.backgroundColor = "blue";
      break;
    case "--color-reset":
      colorBox.style.backgroundColor = "transparent";
      break;
  }
});
```

`command`属性はReactでも活用の場面があります。Reactにおいて遠くのコンポーネント間の処理をやりとりするにはグローバルステートであったり、Context APIを使ったり、あるいはpropsをバケツリレーしていく必要がありました。しかし、`command`属性を使うことで、遠く離れたコンポーネント間でも簡単に処理をやりとりできます。

次の例は「カートへ追加」ボタンを押すと右上のカートアイコン内に追加されるサンプルです。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260209_invoker/cart/)
-   [コードを確認する（Product.tsx）](https://github.com/ics-creative/260209_invoker/blob/main/src/cart/Product.tsx)
-   [コードを確認する（Cart.tsx）](https://github.com/ics-creative/260209_invoker/blob/main/src/cart/Cart.tsx)

▼Product.tsx（一部抜粋）

```
import { CART_ID } from "./Cart";

const Product: React.FC<ProductType> = ({ productId, productName, price }) => {
  return (
    <div className="productCard">
      {/* 商品の画像など */}
      <button
        className="basicButton addToCartButton"
        command="--add-to-cart"
        commandfor={CART_ID}
        data-product-id={productId}
        data-product-name={productName}
      >
        カートへ追加
      </button>
    </div>
  )
}
```

▼Cart.tsx（一部抜粋）

```
export const CART_ID = "cart";
const Cart = () => {

  /* カートの状態や追加するロジックなど */

  /**
   * コマンドイベントのハンドラー
   */
  const handleCommand = useCallback(
    (event: CommandEvent) => {
      // 自前で用意したtypes.d.tsでevent型を拡張済み
      const source = event.source;
      const productId = source.dataset.productId;
      const productName = source.dataset.productName;

      if (!productId || !productName) {
        return;
      }
      handleAddToCart(productId, productName);
    },
    [handleAddToCart],
  );

  useEffect(() => {
    const cartElement = cartRef.current;
    if (!cartElement) {
      return;
    }

    cartElement.addEventListener("command", handleCommand);

    return () => {
      cartElement.removeEventListener("command", handleCommand);
    };
  }, []);

  return (
    <div>
      {/* カートの中身を表示 */}
    </div>
  )
}
```

ヘッダー内にあるカートと商品を表示するコンポーネントは遠くになりがちです。`command`属性と`commandfor`属性を使えば、最奥にあるボタンコンポーネントからカートへ追加することを宣言できます。カート側は`event.source`で送信元の要素を取得できるので、`data`属性経由で商品の情報を得られます。

注意点として、`commandfor`属性の値と対象の要素の`id`属性の値を一致させる必要があります。動的に付与するようなパターンでは難しくなるので、上記コードのように定数として同じ値となるようにするとよいでしょう。

また、TypeScriptを使う場合、`CommandEvent`や`InterestEvent`は最新の仕様のため、型定義に含まれていないこともあります。その場合は`declare`を使って型定義を追加する必要があります。

いくつものpropsのバケツリレーやグローバルステートを使うことなく、遠く離れたコンポーネント間でも簡単にやりとりできます。Reactとしては一風変わったアプローチですが、`command`属性の性質を活用した新しい手法とも言えます。

#### interestfor属性のJavaScriptでの活用

`interestfor`属性で指定した要素も`addEventListener`で検知できます。次のサンプルは、リンクに関心を示したときにプレビューが表示される例です。JavaScriptを使って、リンク先のOGP情報を取得しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260209_invoker/fetch/)
-   [コードを確認する](https://github.com/ics-creative/260209_invoker/blob/main/src/fetch/fetchOgp.js)

```
<a href="page1.html" interestfor="preview">ページ1へ</a>
<a href="page2.html" interestfor="preview">ページ2へ</a>
<a href="page3.html" interestfor="preview">ページ3へ</a>

<div class="preview" id="preview" popover="auto">
  <img src="" alt="OGP画像" class="ogpImage" width="240" height="180" />
  <div class="ogpContent">
    <h2 class="ogpTitle"></h2>
    <p class="ogpDescription"></p>
  </div>
</div>
```

▼主要なロジック部分のみ抜粋

```
const previewElement = document.querySelector(".preview");
previewElement?.addEventListener("interest", async (event) => {
  
  const sourceElement = event.source;
  const url = sourceElement.href;

  const response = await fetch(url);
  const html = await response.text();

  // DOMParserでHTMLをパース
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // タイトルを取得（og:title）
  const title =
    doc.querySelector(`meta[property="og:title"]`)?.getAttribute("content") ??
    "";

  // 説明を取得（og:description）
  const description =
    doc
      .querySelector(`meta[property="og:description"]`)
      ?.getAttribute("content") ?? "";

  // 画像を取得（og:image）
  const image =
    doc.querySelector(`meta[property="og:image"]`)?.getAttribute("content") ??
    "";

  previewImageElement.src = image;
  previewTitleElement.textContent = title;
  previewDescriptionElement.textContent = description;
});
```

ホバーイベントと違い、ホバーした瞬間に実行されるのではなくしばらくホバーが継続してユーザーが関心を示していると実行されます。また、フォーカスでも同様に実行されます。

### 対応ブラウザ

`command`属性と`commandfor`属性は、Chrome・Edge 135（2025年4月）、Safari 26.2（2025年12月）、Firefox 144（2025年10月）以降で利用可能です。

参照：[Can I use…](https://caniuse.com/wf-invoker-commands)

`interestfor`属性は、Chrome・Edge 142（2025年10月）以降で利用可能です。

参照：[Can I use…](https://caniuse.com/wf-interest-invokers)

### まとめ

今回はHTMLの新属性`command`/`commandfor`属性と`interestfor`属性を紹介しました。これらの新しい属性はJavaScriptを不要にしたり、JavaScriptでの処理をシンプルにしたり、これまでとは一風変わったアプローチをとれます。

`command`/`commandfor`属性と`interestfor`属性はInvokerインボーカー Commands APIとInterest Invokers APIと呼ばれるものです。Invoker（呼び出す者）というように、宣言的なHTMLを書く新時代の機能と言えるでしょう。