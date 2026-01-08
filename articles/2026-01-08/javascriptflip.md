---
title: "JavaScriptで実現するFLIPアニメーションの原理と基礎"
source: "https://ics.media/entry/240902/"
publishedDate: "2024-09-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

アニメーション実装のテクニックのひとつに**FLIP**と呼ばれるものがあります。FLIPアニメーションは2つの状態をなめらかにつなげるテクニックで、とくに移動や拡大といった動きに有効です。FLIPアニメーションを用いると、次のようなアニメーションを実装できます。

![FLIPアニメーションのデモ](https://ics.media/entry/240902/images/240902_flip_demo.gif)

本記事では、ライブラリに依存しないFLIPアニメーションの原理を理解し、実装する方法を紹介します。

### FLIPアニメーションとは

FLIPとは、First, Last, Invert, Playをまとめた造語です。これらはFLIPアニメーションの手順を説明したものになります。

-   First：アニメーションを開始するときの状態
-   Last：アニメーション終了時の状態
-   Invert：変化量を計算し、Lastの状態に適用してFirstの状態を復元します
-   Play：Invert量を徐々に減らしてLastの状態に近づけていきます

FLIPのおもしろい点は、アニメーション後の状態を先に作ってしまうことにあります。次の図がそれぞれの手順を図示したものです。

![FLIPアニメーションの説明](https://ics.media/entry/240902/images/240902_flip_description.png)

アニメーションははじめと終わりの状態をなめらかにつなげる作業のため、はじめと終わりの状態（位置、大きさ、etc…）がわかっていなければなりません。

FLIPではこの前後の状態をJavaScriptで取得します。終わりの状態を取得するために終わりの状態を作るという大胆な工程を挟みます。

FLIPの便利な点としてはどのCSSプロパティの変更によってレイアウトが変化したか知らなくてもよいという点が挙げられます。たとえば縦に並んだリストを横並びにするためにどのCSSプロパティを変更したか、などは考えなくてもよく、あくまで必要なのは位置と大きさの情報です。

▼縦並びのリストを横並びにする例

![FLIPアニメーションの例](https://ics.media/entry/240902/images/240902_flip_direction.gif)

### 基本的なFLIPアニメーションの実装

実例を元にFLIPアニメーションの実装手順を確認しましょう。

1.  アニメーション前のスタイルを取得
2.  スタイルを変更
3.  アニメーション後のスタイルを取得
4.  1から3に遷移するアニメーションを適用

上記の手順を次のアニメーションの実装例と対応させます。

![シンプルなFLIPアニメーションのgif](https://ics.media/entry/240902/images/240902_flip_simple.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240731_flip_animations/page1#section1)
-   [ソースコードを確認する](https://github.com/ics-creative/240731_flip_animations/tree/main/page1)

```
<div class="box"></div>
```

```
.box {
  width: 100px;
  height: 100px;
  background: #7C71F6;
}

.box.active {
  margin-left: auto;
}
```

```
const el = document.querySelector(".box");

// 1. 変更前のスタイルを取得
const prev = el.getBoundingClientRect();
// 2. スタイルを変更
el.classList.toggle("active");
// 3. 変更後のスタイルを取得
const next = el.getBoundingClientRect();
// 4. アニメーションを適用
el.animate(
  [
    {
      // 開始位置に移動
      translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
    },
    {
      // 終了位置までアニメーション
      translate: "0 0",
    },
  ],
  {
    duration: 400,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
);
```

ここでは、要素の位置と大きさを取得するため`getBoundingClientRect()`メソッドを使用します。また、アニメーションには[ウェブアニメーションAPI](https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API)を使用しています。ここはアニメーションライブラリなどを用いてもよいでしょう。

このようにして、前後の状態をなめらかにつなげるアニメーションが実装できます。

#### 複数の要素のアニメーション

複数の要素の整列方向を変えるデモについて解説します。このデモではそれぞれの要素に対してFLIPアニメーションを適用する必要があります。

![複数の要素のFLIPアニメーションのgif](https://ics.media/entry/240902/images/240902_flip_direction.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240731_flip_animations/page1#section2)
-   [ソースコードを確認する](https://github.com/ics-creative/240731_flip_animations/tree/main/page1)

```
<div class="container">
  <div class="box" data-id="1"></div>
  <div class="box" data-id="2"></div>
  <div class="box" data-id="3"></div>
</div>
```

```
.container {
  display: flex;
  flex-direction: row;
}

.container.active {
  flex-direction: column;
}
```

```
const container = document.querySelector(".container");
const boxes = container.querySelectorAll(".box");

// 1. 各boxのスタイルを取得
const prevMap = new Map(); // 🌟idと紐づいたMapを作成
boxes.forEach((box) => {
  const id = box.dataset.id;
  prevMap.set(id, box.getBoundingClientRect());
});

// 2. スタイルを変更
container.classList.toggle("active");

// すべてのboxに対してアニメーションを適用する
boxes.forEach((box) => {
  // 3. スタイルを取得
  const next = box.getBoundingClientRect();
  const id = box.dataset.id;
  // Mapから前のスタイルを取得
  const prev = prevMap.get(id);

  // 4. アニメーションを適用
  box.animate([
      {
        translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
      },
      {
        translate: "0 0",
      },
    ], {
      duration: 400,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    }
  );
});
```

取得したスタイルと要素を紐づける手段はいくつかありますが、ここでは`data-id`属性を使用しています。それぞれの要素のスタイルをidと紐づけて`Map`オブジェクトに保持し、idが一致する要素にアニメーションを適用します。

#### ネストした要素のアニメーション

入れ子になった要素のアニメーションを考えてみます。例として、次のようにクリックされると詳細が表示されるカードを作成します。 この例ではカードの外枠だけでなく、それぞれの要素の変化の前後のスタイルを取得して、アニメーションを適用します。

![ネストした要素のアニメーションのgif](https://ics.media/entry/240902/images/240902_flip_nest.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240731_flip_animations/page1#section3)
-   [ソースコードを確認する](https://github.com/ics-creative/240731_flip_animations/tree/main/page1)

```
<div class="card">
  <img src="sample.png" />
  <p class="name">Taro Yamada</p>
  <p class="text">サンプルテキスト</p>
</div>
```

```
const card = document.querySelector(".card");
const image = card.querySelector(".img");
const name = card.querySelector(".name");
const text = card.querySelector(".text");

// 1. スタイルを取得
const prevCard = card.getBoundingClientRect();
const prevImage = image.getBoundingClientRect();
const prevName = name.getBoundingClientRect();

// 2. スタイルを変更
card.classList.toggle("active");

// 3. スタイルを取得
const nextCard = card.getBoundingClientRect();
const nextImage = image.getBoundingClientRect();
const nextName = name.getBoundingClientRect();

// 4. アニメーションを適用
flip(card, prevCard, nextCard);
flip(image, prevImage, nextImage);
flip(name, prevName, nextName);
// 非表示だった要素は透明度を変更
text.animate([{opacity: 0}, {opacity: 1}], {duration: 200});

// FLIPアニメーションを適用する関数
const flip = (el, prev, next) => {
  el.animate([
      {
        translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
        width: `${prev.width}px`,
        height: `${prev.height}px`,
      },
      {
        translate: "0 0",
        width: `${next.width}px`,
        height: `${next.height}px`,
      },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.33, 1, 0.68, 1)",
    }
  );
};
```

`card`クラスを持つ要素の子要素について、FLIPアニメーションの対象それぞれで前述の処理を実施しています。FLIPアニメーションを適用しない要素については別途アニメーションを適用しています。アニメーションの適用には共通で使用する`flip()`関数を作成し、適用しています。

### FLIPアニメーションの応用

応用的な例として、**絞り込み表示**と**モーダルダイアログの表示**のアニメーションをFLIPで実装する方法を紹介します。

#### 並び替えのアニメーション

次のような絞り込みUIを考えてみます。チェックに合わせてカードが表示されるような画面です。

![並び替えアニメーションのgif](https://ics.media/entry/240902/images/240902_flip_sort.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240731_flip_animations/page2)
-   [ソースコードを確認する](https://github.com/ics-creative/240731_flip_animations/tree/main/page2)

チェックを切り替えたときにそれぞれのカードの位置が変わります。このときパッと移動するのでは味気ないので、新しい位置になめらかに移動するアニメーションをFLIPを使用して実現します。

実装例を示します。

```
<div class="toolbar">
  <label>
    <input type="checkbox" checked name="color" value="red">
    red
  </label>
  <label>
    <input type="checkbox" checked name="color" value="blue">
    blue
  </label>
  <label>
    <input type="checkbox" checked name="color" value="green">
    green
  </label>
</div>

<div class="container">
  <div class="box" data-color="red" data-id="1"></div>
  <div class="box" data-color="blue" data-id="2"></div>
  <!--省略-->
  <div class="box" data-color="blue" data-id="24"></div>
</div>
```

```
const colorCheckBoxes = document.querySelectorAll("input[name=color]");
const boxes = document.querySelectorAll(".box");

colorCheckBoxes.forEach(input => {
  input.addEventListener("change", () => {
    flip();
  });
});

const flip = () => {
  // 選択中の色を取得
  // 例：["red", "blue"]
  const colors  = [...colorCheckBoxes]
    .filter(checkbox => checkbox.checked)
    .map(input => input.value);

  // 1. すべてのboxのスタイルを取得
  const prevMap = new Map();
  boxes.forEach((box) => {
      const id = box.dataset.id;
      const style = box.getBoundingClientRect();
      prevMap.set(id, style);
    }
  );
  // 2. boxのスタイルを変更
  boxes.forEach(box => {
    box.classList.toggle("hidden", !colors.includes(box.dataset.color));
  });

  // それぞれのboxにアニメーションを適用
  boxes.forEach(box => {
    // 3. 変更後のスタイルを取得
    const next = box.getBoundingClientRect();
    const prev = prevMap.get(box.dataset.id);
    // display: noneとなっているboxはwidthが0かどうかで判別する
    // 出現するboxはFLIPさせずにふわっと表示
    if(prev.width === 0){
      box.animate([{opacity: 0}, {opacity: 1}], {duration: 200});
      return;
    }
    // 4. 移動のアニメーションを適用
    box.animate([{
      translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
    },
      {
        translate: "0 0",
      },
    ], {
      duration: 400,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  });
};
```

絞り込みのロジックとしては、チェックを切り替えたときにチェック状態に応じてすべての要素の`class`属性を付け替え表示を切り替えます。この操作の前後で位置が変わるので、`getBoundingClientRect()`メソッドを用いて位置を取得しFLIPアニメーションを適用します。

「複数の要素のアニメーション」と同様、`data-id`属性でスタイルと要素を紐づけます。ここでの注意点としては、`display: none`の要素は`getBoundingClientRect()`メソッドですべてのプロパティの値が0になってしまう点です。消えていた要素が出現するときに`flip()`関数のアニメーションを適用すると左上から出現してしまい違和感があるので、そうならないよう`width`が0のboxはその場で出現するようなアニメーションを適用します。

なめらかに移動することでユーザーに「絞り込んだ」というフィードバックをより与えられる演出になります。

#### モーダルダイアログのアニメーション

次のように画像をクリックすると画像が拡大されモーダルダイアログが表示されるUIを考えます。

この例ではリストの画像とダイアログ内の画像は別のDOM要素です。しかし、まったく同じ位置と大きさにすることでひとつの要素がトランジションしたような演出を与えることができます。

![ダイアログのFLIPアニメーション](https://ics.media/entry/240902/images/240902_flip_dialog.png)

![ダイアログのデモのgif](https://ics.media/entry/240902/images/240902_flip_dialog.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240731_flip_animations/page3)
-   [ソースコードを確認する](https://github.com/ics-creative/240731_flip_animations/tree/main/page3)

```
<div class="container">
  <img data-id="1" src="https://picsum.photos/id/10/200/300" alt="">
  <img data-id="2" src="https://picsum.photos/id/11/200/300" alt="">
  <!--省略-->
  <img data-id="8" src="https://picsum.photos/id/17/200/300" alt="">
</div>

<!--ダイアログ要素-->
<div class="dialog hidden">
  <img src="" alt="" width="200" height="300">
  <div class="dialog-text">
    <p>画像の説明文</p>
    <button class="dialog-close">閉じる</button>
  </div>
</div>
```

```
const images = container.querySelectorAll("img");
const dialog = document.querySelector(".dialog");
const dialogImg = card.querySelector("img");

// 選択中の画像ID
let currentId = null;

// 画像をクリックしたらダイアログを表示
images.forEach(image => {
  image.addEventListener("click", () => {
    dialog.classList.remove("hidden");
    currentId = image.dataset.id;
    // 1. スタイルを取得
    const prev = image.getBoundingClientRect();
    // 2. スタイルを変更
    dialogImg.src = image.src;
    // 3. スタイルを取得
    const next = dialogImg.getBoundingClientRect();
    // 4. アニメーションを適用
    dialogImg.animate([
      {
        translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
        scale: `${prev.width / next.width} ${prev.height / next.height}`,
      },
      {
        translate: `0 0`,
        scale: `1 1`,
      }
    ], {
      duration: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  });
});
```

ここでは簡略化のため、モーダルダイアログを開く処理の一部を記述しています。コードの全体を知りたい方はサンプルコードを見てください。

この例ではモーダルダイアログ内の`img`要素の`src`属性を動的に書き換えることでダイアログ内のコンテンツを書き換えています。アニメーションさせるのはダイアログ内の要素ですが、変化前のサイズはクリックされた要素から取得する必要があるためアニメーションの前後で`getBoundingClientRect()`メソッドの対象要素が異なることに注意してください。

### 周辺ライブラリ

ここまでは自前でFLIPアニメーションを実現する方法を紹介してきましたが、FLIPアニメーションの実装に役立つブラウザのAPIやライブラリを用いた手法も数多くあるので紹介します。

[View Transitions API](https://developer.mozilla.org/ja/docs/Web/API/View_Transitions_API)は画面遷移をなめらかにつなげる技術です。まだすべてのブラウザで対応しているAPIではありませんが、ゆくゆくは標準的な技術になることが期待されます。下記の記事で詳細に解説されているので、ぜひ読んでください。

-   [View Transitions API入門 - 連続性のある画面遷移アニメーションを実現するウェブの新技術](https://ics.media/entry/230510/)

汎用的なアニメーションライブラリとしてはGSAPの[『FLIPプラグイン』](https://gsap.com/docs/v3/Plugins/Flip/)がとても役に立ちます。ネストしたアニメーションなど考えることが多い表現もうまくラップされており簡単に記述できます。今回の記事でFLIPアニメーションに興味を持った人にはぜひ触ってほしいライブラリです。

React向けのFLIPアニメーションライブラリとしては[react-flip-toolkit](https://github.com/aholachek/react-flip-toolkit)がシンプルで使いやすいです。

Vue.jsやSvelteはFLIPアニメーションを実現する仕組みが標準で組み込まれています。ライブラリの機能で実現できる演出の場合は積極的に使ってみましょう。

-   [Vue.js - トランジショングループ](https://ja.vuejs.org/api/built-in-components.html#transitiongroup)
-   [Svelte - svelte/animate](https://svelte.jp/docs/svelte-animate)

### まとめ

今回は2つの状態をなめらかにつなげるアニメーション技術、FLIPについて紹介しました。インタラクティブなウェブコンテンツではほぼ必ず「状態の変化」が起こります。この差分をなめらかにつなげられるFLIPアニメーションはあらゆる場面で使える汎用的な技術と言えます。

FLIPアニメーションは単なる演出としての効果だけでなく、ユーザーへのフィードバックとしても効果的です。視覚的に変化が追えることで自分がどのような操作をしたかを明確に伝えることにも繋がります。

View Transitions APIをはじめとしてFLIPアニメーションを実現する技術も発展しています。原理を理解し、いろいろな技術を駆使してFLIPアニメーションを取り入れていきましょう。