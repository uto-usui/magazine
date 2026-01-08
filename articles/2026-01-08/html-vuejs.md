---
title: "HTMLにちょい足しでできる！ Vue.jsでサクッと動きをつける方法"
source: "https://ics.media/entry/210908/"
publishedDate: "2021-09-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

Vue.jsは昨今よく使われるモダンなJavaScriptフレームワークの1つです。Node.jsで環境構築し、サイト全体をVue.jsベースで開発することもあります。しかし、フロントエンド開発に慣れていない方やデザイナーにはNode.jsでの環境は少し参入障壁が高いです。

実は、Vue.jsは`<script>`タグから読み込こめばNode.jsを用いずとも使えます。この方法ならばLP（ランディング・ページ）やWordPressサイトといったHTMLベースのサイトでもVue.jsを活用できるでしょう。本記事ではそのような**ちょい足し**Vue.jsの活用例を、最新のVue Composition APIとESモジュールを使って紹介します。

### Vue.jsをちょい足す

HTMLに下記のようなコードを足すことで、Vue.jsを`<div id="app">`の要素内に導入できます。Vue.jsの読み込みにはインポートマップを使っています。

```
<div id="app">
  <!-- Vue.jsを使いたい部分 -->
</div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
    }
  }
</script>
<script type="module">
  import { createApp } from "vue";
  const app = createApp({
    /* Vue.jsの各種処理 */
  });
  app.mount("#app");
</script>
```

上記はHTML内に直接JavaScriptを記述していますが、下記のように外部ファイルとしても利用できます。

```
<div id="app">
  <!-- Vue.jsを導入したい部分 -->
</div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
    }
  }
</script>
<script type="module" src="./script.js"></script>
```

▼script.js

```
import { createApp } from "vue";
const app = createApp({
  /* Vue.jsの各種処理 */
});
app.mount("#app");
```

いずれもESモジュールを用いて読み込んでいます。使用する場合は`<script type="module">`のように`type`属性を付与する必要があります。

ESモジュールは馴染みが薄いかもしれませんが、JavaScriptをモジュール単位で管理できるようになるなどの利点があります。Vue.jsの各種関数はモジュール管理されているので、このESモジュールを利用するとモジュール毎に呼べるので便利です。今後ESモジュールを用いた開発は増えていくことでしょう。インポートマップやESモジュールについては下記の記事にて詳しく解説しています。

-   [『ES Modules入門 JavaScriptのモジュールを使う方法』](https://ics.media/entry/16511/)

サンプルおよび記事中ではCDNから読み込んでいますが、実際の本番環境では、耐障害性の観点から自前で用意した方がよいでしょう。

これでVue.jsの記法や機能が使えるようになりました。

### 実際にちょい足しVue.jsを実装してみる

ここからは実際のサンプルを元にちょい足しVue.jsを解説します。

#### ハンバーガーボタン

ハンバーガーボタンとナビゲーションの表示をVue.jsで実装しました。

![クリックでハンバーガーボタンとメニューが切り替わる](https://ics.media/entry/210908/images/210908_hamburger.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210908_add_a_little_vue/hamburger/)
-   [コードを確認する](https://github.com/ics-creative/210908_add_a_little_vue/blob/main/hamburger/index.html)

ハンバーガーボタンを押すと、ボタンのデザインが変わり、ナビゲーションがフェードインする動作です。これを実現するVue.jsのJavaScriptコードは非常に簡素です。

```
import {
  ref,
  createApp,
} from "vue";

const app = createApp({
  setup() {
    // ハンバーガーボタンの状態です
    const isActive = ref(false);
    return { isActive };
  },
});
app.mount("#app");
```

ハンバーガーボタン、ナビゲーションの表示に関する記述は`setup()`関数内の実質2行だけです。ハンバーガーボタンがアクティブかそうでないかの真偽値を管理しています。

▼ハンバーガーボタンのHTML

```
<button @click="isActive = !isActive">
  <transition name="fade">
    <img src="../assets/images/open.svg" v-show="!isActive" />
  </transition>
  <transition name="fade">
    <img src="../assets/images/close.svg" v-show="isActive" />
  </transition>
  <span>{{ isActive ? "Close" : "Menu"}}</span>
</button>
```

※直接的に関係ない属性・クラス名は省略しています

`<button>`タグにクリックのイベントハンドラーを設置し、クリックすると`isActive`の状態を反転させます。`isActive`の状態と`v-show`を組み合わせることで、3本線の画像と✕印の画像、「Menu」と「Close」の文字の切り替えを行っています。

Vue.jsのトランジション機能も当然使えるので、`<transition>`コンポーネントを用いてフェードイン・フェードアウト表現を実現しています。

▼トランジションのCSS

```
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

ボタンを押すと出てくるナビゲーションについても仕組みは同じです。

```
<transition name="fade">
  <div class="navigationWrapper" v-show="isActive" style="display: none">
    <div class="bg"></div>
    <nav class="navigation">
      <ul class="navigation_list">
        <!-- 省略 -->
      </ul>
    </nav>
  </div>
</transition>
```

ここで注目したいのが`<div class="navigationWrapper">`要素にインラインで`display:none`を記述している部分です。Vue.jsが読み込まれるまではこれらの表示制御は行われず、一瞬表示されてしまいます。それを防ぐため、インラインCSSで初期表示に出ないようにしています。

Vue.jsを使うとハンバーガーボタン自体の制御と、ボタンの状態にまつわる各要素の表示を1箇所で集中管理できるのでシンプルになります。

#### チェックボックスの状態を監視するフォーム

フォームにもVue.jsをちょい足ししてみましょう。ここでは3つ以上チェックしないと送信ボタンが押せないサンプルを用意しました。

![チェックボックスに3つ以上チェックをいれないと送信ボタンが押せない](https://ics.media/entry/210908/images/210908_form.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210908_add_a_little_vue/check/)
-   [コードを確認する](https://github.com/ics-creative/210908_add_a_little_vue/blob/main/check/index.html)

```
<div class="checkBoxList">
  <label
    ><input
      type="checkbox"
      value="react"
      v-model="checkBoxState"
    />React</label
  >
  <label
    ><input
      type="checkbox"
      value="angular"
      v-model="checkBoxState"
    />Angular</label
  >
  ...
  <!-- 省略 -->
</div>
<button type="button" :disabled="!isButtonEnabled">
  送信
</button>
```

フォームの状態管理には`v-model`が便利です。`v-model`を使うとVue.jsのリアクティブな値とフォームの値を同期できます。

```
import {
  computed,
  createApp,
  reactive,
} from "vue";

const app = createApp({
  setup() {
    // チェックボックスの状態です
    const checkBoxState = ref([]);

    // ボタンが押せるかどうか
    const isButtonEnabled = computed(() => checkBoxState.value.length >= 3);
    return { checkBoxState, isButtonEnabled };
  },
});
```

※mountの処理は省略しています。

複数のチェックボックスの状態管理も`ref()`を使って簡単に実装できます。`v-model`を用いることで、チェックボックスの状態は`value`属性の値が`ref()`に格納されます。`checkBoxState`に自動的に格納されます。たとえば、「React」と「Angular」のチェックボックスにチェックを入れると、`checkBoxState`の値は`["react", "angular"]`となります。

`computed()`関数を使ってチェックが3つ以上あるかどうかの真偽値を返します。これは`<button type="button" :disabled="!isButtonEnabled">`の部分でボタンの有効・無効を制御しています。`isButtonEnabled`は`checkBoxState`の状態に応じて真偽値を返してくれるので、チェックのたびにチェックボックスの状態を取得して調べる処理、といったものを自分で用意する必要はありません。

Vue.jsを使えば、状態変更に伴うこのような煩わしい処理も`computed()`で簡単に実装できます。入力の有無のチェックのほか、下記のような料金の自動計算もできます。

![入場料を自動計算するフォーム](https://ics.media/entry/210908/images/210908_fee.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210908_add_a_little_vue/entryFee/)
-   [コードを確認する](https://github.com/ics-creative/210908_add_a_little_vue/blob/main/entryFee/index.html)

#### ページネーションのある一覧

さいごにAPIから取得してきたデータをページネーションで表示する、少し複雑な例を紹介します。

![ページネーションつきの一覧。進むボタン、戻るボタンで切り替わる](https://ics.media/entry/210908/images/210908_pagination.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210908_add_a_little_vue/pagination/)
-   [コードを確認する](https://github.com/ics-creative/210908_add_a_little_vue/blob/main/pagination/index.html)

```
<div id="app">
  <div v-if="books">
    <transition-group name="list" tag="ul">
      <li v-for="book in currentBooks" :key="book">
        <div>
          <img
            :src="book.thumbnail"
            :alt="book.name"
            width="300"
            height="200"
          />
        </div>
        <h2>{{ book.name }}</h2>
        <p>{{ book.author }}</p>
      </li>
    </transition-group>
    <div>
      {{pagination}} / {{Math.ceil(books.length / PER_PAGE)}}
    </div>
    <p>
      <transition name="fade">
        <button
          @click="incrementPagination"
          v-if="pagination+1 <= Math.ceil(books.length / PER_PAGE)"
        >
          進む
        </button>
      </transition>
      <transition name="fade">
        <button @click="decrementPagination" v-if="pagination > 1">戻る</button>
      </transition>
    </p>
  </div>
</div>
```

※直接的に関係ない属性・クラス名は省略しています

```
import {
  ref,
  computed,
  createApp,
  onMounted,
} from "vue";

const app = createApp({
  setup() {
    // 1ページあたりの表示数です
    const PER_PAGE = 4;

    // 書籍のデータです
    const books = ref(null);

    // 現在のページネーションです
    const pagination = ref(1);

    // ページネーションに基づく、表示する書籍のリストです
    const currentBooks = computed(() => {
      return books.value.slice(
        (pagination.value - 1) * PER_PAGE,
        pagination.value * PER_PAGE
      );
    });

    /**
     * ページを進めます
     */
    const incrementPagination = () => {
      if (pagination.value >= Math.ceil(books.value.length / PER_PAGE)) {
        return;
      }
      pagination.value++;
    };

    /**
     * ページを戻ります
     */
    const decrementPagination = () => {
      if (pagination.value === 1) {
        return;
      }
      pagination.value--;
    };

    /**
     * マウント時に書籍データを取得します
     */
    onMounted(async () => {
      const result = await fetch("../assets/json/data.json");
      const jsonData = await result.json();
      books.value = jsonData;
    });

    return {
      PER_PAGE,
      books,
      pagination,
      currentBooks,
      incrementPagination,
      decrementPagination,
    };
  },
});
```

※mountの処理は省略しています。

大まかな構成は以下のようになっています。

-   マウント時APIからデータを取得しリアクティブな値としてデータを格納する。
-   現在のページネーションを元に格納したデータから`computed()`メソッドで表示したいデータを切り出す。
-   `v-for`を用いて表示する。

個別に詳しく見ていきます。

```
const books = ref(null);

onMounted(async () => {
  const result = await fetch("../assets/json/data.json");
  const jsonData = await result.json();
  books.value = jsonData;
});
```

`onMounted()`メソッドはマウント時に行われる処理です。ここで非同期に外部API（今回は用意したJSONファイル）を取得します。取得したデータをリアクティブな値として`books`に格納します。

```
const pagination = ref(1);

const currentBooks = computed(() => {
  return books.value.slice(
    (pagination.value - 1) * PER_PAGE,
    pagination.value * PER_PAGE
  );
});
```

`currentBooks`は、表示する本をデータから加工して返します。現在のページを表す`pagination`と`PER_PAGE`からデータの表示したい部分を配列から切り出します。

```
<transition-group name="list" tag="ul">
  <li v-for="book in currentBooks" :key="book.id">
    <div>
      <img :src="book.thumbnail" :alt="book.name" width="300" height="200" />
    </div>
    <h2>{{ book.name }}</h2>
    <p>{{ book.author }}</p>
  </li>
</transition-group>
```

`pagination`の値が変わると自動的に`getCurrentBooks`はその値に応じたデータを返すので、表示側はこの値を参照するだけです。`v-for`を用いてリストレンダリングします。また`<transition-group>`コンポーネントでラップすることで切替時のアニメーションをCSSだけで付与できます。

```
<div>
  {{pagination}} / {{Math.ceil(books.length / PER_PAGE)}}
</div>
<p>
  <transition name="fade">
    <button
      @click="incrementPagination"
      v-if="pagination+1 <= Math.ceil(books.length / PER_PAGE)"
    >
      進む
    </button>
  </transition>
  <transition name="fade">
    <button @click="decrementPagination" v-if="pagination > 1">戻る</button>
  </transition>
</p>
```

```
/**
 * ページを進めます
 */
const incrementPagination = () => {
  if (pagination.value >= Math.ceil(books.value.length / PER_PAGE)) {
    return;
  }
  pagination.value++;
};

/**
 * ページを戻ります
 */
const decrementPagination = () => {
  if (pagination.value === 1) {
    return;
  }
  pagination.value--;
};
```

`Math.ceil(books.length / PER_PAGE)`は全ページ数で、`pagination`は現在のページ数を表します。現在ページ / 全ページでユーザーに分かりやすいよう現在位置を示しています。

進むボタン、戻るボタンに`pagination`の値を変更する関数を設置します。`pagination`の値にもとづいて、不要な場合は`v-if`で表示を制御しています。また、トランジション中はまだクリックが有効です。連打対策として、`if()`文で存在しないページネーションへ移動しないようにしています。

ページネーションによる切り替え機能をもった一覧表示は、素のJavaScriptで作ろうとすると、ページの状態管理、内容の書き換えなど大変です。それら面倒なことはVue.jsを活用すれば低コストで実装可能です。

### Vue.jsをちょい足すメリット

ここまでHTMLベースのサイトにVue.jsをちょい足す実例を紹介してきました。ちょい足しVue.jsには以下のようなメリットがあります。

-   状態を持たせることができるので、状態に応じた表示の切り替え・処理の切り替えが低コストで実装できる
-   表示に関する処理をVue.js側に任せられるので、開発者はロジックに集中できる
-   PHPやプレーンなHTMLで作られたページにも追加できる

JavaScriptを用いて操作する部分が少ない小規模なサイトやLP、WordPressサイトなどでちょい足しVue.jsを活用できる場面があるでしょう。

#### jQueryとの比較

ウェブサイトに導入してJavaScript開発を容易にするものとして、jQueryがあります。Vue.jsと設計思想などが違うので単純な比較はできませんが、以下のような差があります。

**Vue.jsに対するjQueryのメリット**

-   豊富なプラグインが存在し、それを利用した開発ができる
-   `slideDown()`、`fadeIn()`などのアニメーションメソッドがあらかじめ用意されているので、アニメーションの実装が楽
-   平易に書け、学習コストも低く、普及度も高い

**jQueryに対するVue.jsのメリット**

-   状態管理が容易にできるので、状態の違いによる処理の実装が楽
-   表示の制御をテンプレート構文を使って実現できるので、ロジックの分離ができる
-   `v-model`のような強力なイベントハンドラーを備えているのでインタラクティブな処理が得意

Vue.jsに慣れた人であれば、jQueryの代わりにVue.jsを使うメリットも高いはずです。

### ちょい足しVue.jsの注意点

ハンバーガーボタンの実例部分で少し触れましたが、Vue.jsが読み込まれて実行されるまで、Vue.jsによる制御は効きません。Vue.jsで非表示の制御をしていても、読み込み完了までは見えています。読み込み完了後にパッと消える、というユーザー体験上良くない現象が起きてしまいます。また、マスタッシュ記法などのVue.js独自の書き方がプレーンテキストとして出力されてしまいます。

![読み込み前にマスタッシュ記法が見えてしまっている様子](https://ics.media/entry/210908/images/210908_before_loaded.gif)

※動画では分かりやすくするため、読み込み速度を落として実行しています

それらを防ぐためには`v-cloak`というVue.jsの組み込みの属性を使って非表示にしておく方法があります。

```
<div id="app" v-cloak>
  ...
</div>
```

```
[v-cloak] {
  visibility: hidden;
}
```

![読み込み前にマスタッシュ記法が見えないように対応](https://ics.media/entry/210908/images/210908_before_hidden.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210908_add_a_little_vue/hide_before_loaded/)
-   [コードを確認する](https://github.com/ics-creative/210908_add_a_little_vue/blob/main/hide_before_loaded/index.html)

Vue.jsが実行されるまでは`v-cloak`属性が存在し、CSSにより非表示になっているのでマスタッシュ記法などが見えるのを防いでくれます。Vue.jsが実行されると`v-cloak`は自動的に外れるので、非表示が解除されます。一方でVue.jsが実行されるまでコンテンツが見えないため、コアウェブバイタルのFirst Contentful Paint（FCP）などに悪影響を与える可能性があります。非表示する部分を工夫するなど細かいチューニングは必要です。

Vue.jsの転送量はGZipによる圧縮を含めて約59KB程度（圧縮前のファイルサイズは約162KB）です。そこまで大きなサイズではないのでVue.jsの読み込みがネックになることはないでしょう。jQuery（転送量約31KB）よりやや大きい程度です。

### まとめ

Vue.jsというとSPA（シングル・ページ・アプリケーション）のためのツールというイメージがあるかもしれませんが、このようにウェブサイトに動的要素をサクッと導入する使い方も可能です。jQueryでは難しい、状態の管理などもVue.jsでは比較的容易に実装できます。目的によってはjQueryの代替の選択肢にもなりえるでしょう。

ちなみにVue.jsの機能を削りより軽量化した[petite-vue](https://github.com/vuejs/petite-vue)もあります。機能・記法などは少し違いますが、よりミニマルを目指すならこちらも検討してみてください。

Vue.jsは簡単に追加できるので、これを機会に**ちょい足し**してみてはいかがでしょうか？