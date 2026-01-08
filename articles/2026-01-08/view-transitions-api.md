---
title: "View Transitions API入門 - 連続性のある画面遷移アニメーションを実現するウェブの新技術"
source: "https://ics.media/entry/230510/"
publishedDate: "2023-05-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

View Transitions APIを使うと、シンプルでスムーズな**連続性のある**アニメーションを実装できます。

ウェブ技術でのアニメーションはさまざまな手段が存在します。CSSの`transition`や`animation`、JavaScriptでのWeb Animations APIなど利用されている方も多いでしょう。View Transitions APIは、これらのアニメーション手段だけでは実現が困難だった**新しい遷移アニメーションを実現できます**。

本記事では「どのようなことができるか」「使い方」「使用上の注意点」を紹介します。

**本記事で紹介すること**

-   View Transitions APIで実現できるのは新しい遷移アニメーション
-   JavaScriptとCSSの指定で容易に利用できる（SPA向け）
-   JSフレームワークでの対応も進んでいる
-   JavaScriptなしでも利用可能である（MPA向け）

### View Transitions APIで何ができるか？

View Transitions APIの作例を用意したのでオリジナルのデモを紹介します。

#### 複数ページの遷移

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-thumbs/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/tree/main/vta-thumbs)

一覧画面と詳細画面を遷移するデモコンテンツを紹介します。一覧画面のサムネイル画像が、詳細画面のメイン画像へ移動します。選択したコンテンツが画面の中心に移動するので、ユーザーは視線が迷子にならずに操作できます。

また、ブラウザの「戻る」「進む」の履歴操作を行っても、アニメーションが動作されます。「戻る」を行った場合はアニメーションが**左へ動き**、「進む」操作を行った場合はアニメーションが逆の**右へ動きます**。画面の関係性をアニメーションとして表現できます。

#### モーダル表示

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-modal/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/tree/main/vta-modal)

一覧画面と詳細画面（モーダルダイアログ）を連続的に遷移するデモコンテンツです。実装はVue.jsを使って作成しています。Vue.jsやReactなどのライブラリを使っていても、View Transitions APIを利用できることを示しています。

#### スライドショー

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-transition/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/tree/main/vta-transition)

3Dのスライドショーとして用意したシンプルなデモコンテンツです。View Transitions APIの演出にはオリジナルのCSSアニメーションを組み込めます。

#### UI表示の演出

画像ビューアーとしてのUI演出に、View Transions APIを利用しました。ライトボックス風のUI演出は他の手段でも実現できますが、View Transions APIによってコンパクトなコードで実現できます。大がかりな画面遷移演出だけでなく、マイクロインタラクションとしてのUI演出に役立つことも期待できます。

#### オウンドメディアのUI演出

本サイトのUI演出にもView Transitions APIを利用しています。運用をはじめて1か月ほど経過しています。運用での問題はなく、動作は安定しています。

### なにがすごいのか？

View Transitions APIの新しい点について。

ウェブサイトでのページ遷移前後では、同じようにみえる表示要素でも、HTMLの場所がDOMツリー上で異なることが多いです。そのため、画面遷移で、特定の要素が**別画面の別DOMに接続するようなアニメーションは実装が難しい**ものでした。

![](https://ics.media/entry/230510/images/images/230510_vta_dom.png)

View Transitions APIを使えば、DOMツリーの構造の違いを突破して連続的に変化するようにCSSとJavaScriptで演出できます。このことは画期的であり、**ページ間のDOM構造上の違いの制約を受けることなく**アニメーションを構築できます。

### 画面遷移のアニメーション

接続するようなアニメーションはウェブでは新しい表現ですが、モバイルアプリでは目にしたことがある方が多いと思います。ユーザー体験を向上する手段として、さまざまなデザインシステムで言及されています。Material Designの『[Transitions – Material Design 3](https://m3.material.io/styles/motion/transitions/transition-patterns)』に紹介があります。

> トランジションは、ユーザーがアプリの動作を理解するのに役立つため、優れたユーザーエクスペリエンスの基本です。トランジションがうまくデザインされていると、体験が高品質で表現豊かなものに感じられます。

![](https://ics.media/entry/230510/images/images/230510_vta_material_design.webp)

また、Microsoftのドキュメントには、画面遷移時のアニメーションを「[接続型アニメーション](https://learn.microsoft.com/ja-jp/windows/apps/design/motion/connected-animation)」と定義されています。次のようにメリットが紹介されています。

> 接続型アニメーションを利用すると、2つのビューで共有されているコンテンツにユーザーを注目させることによって、2つのビューの間の関係を強調する強力な視覚的メタファが実現されます。また、接続型アニメーションによって、ページを移動するときに、視覚的に注目を引く効果や洗練された視覚効果を発生させることができます。

### View Transitions APIの使い方（MPA編）

前置きはここまでとし、View Transitions APIの使い方を説明します。View Transitions APIではMPAとSPAでそれぞれ利用できます。MPAのほうが簡単に利用できるので、まずはMPAでの使い方を説明します。

MPAとはマルチ・ページ・アプリケーションのことを指します。複数のHTMLファイルが存在する設計のことを指します。

次のデモをChrome 126、Edge 126、Safari 18.2以上でアクセスして確認ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-mpa-example/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/blob/main/vta-mpa-example/)

次の3つのHTMLファイルが存在し、それぞれが`<a>`タグでリンクしています。

-   index.html
-   page-1.html
-   page-2.html

それぞれのHTMLには以下のスタイルシートを適用しています。`@view-transition`を指定することで、マルチ・ページ・アプリケーションにおける画面遷移アニメーションが適用可能になります。

```
@view-transition {
  navigation: auto;
}
```

一覧画面の接続したい要素にはCSSで`view-transition-name`を指定します。この名前は、遷移前と遷移後のページにも同じ名前を指定します。同じ名前を指定していることで接続対象となります。

接続前のページ（`index.html`） ※一部抜粋

```
<style>
  @view-transition {
    navigation: auto;
  }

  /* 写真1 */
  .photo-1 {
    view-transition-name: photo-example-1;
    contain: paint;
  }
</style>
<!-- 一覧画面 -->
<div id="view-index">
  <!-- 画像 -->
  <img class="photo-1" 
        src="images/photo_1.webp" />
</div>
```

接続後のページ（`page-1.html`） ※一部抜粋

```
<style>
  @view-transition {
    navigation: auto;
  }

  /* 写真1 */
  .photo-1 {
    view-transition-name: photo-example-1;
    contain: paint;
  }
</style>

<!-- 詳細画面 -->
<div class="view-detail">
  <img class="photo-1" 
      src="images/photo_1.webp" />
</div>
```

たったこれだけで、画面遷移時にアニメーションが適用されます。簡単ですね。

### View Transitions APIの使い方（SPA編）

ここからはシングル・ページ・アプリケーション（SPA）での使い方を説明します。ここまで説明したマルチ・ページ・アプリケーションの使い方とは異なるので注意してください。

View Transitions APIのSPAでの利用はJavaScriptを前提として、さまざまな技術の組み合わせで機能します。いきなり仕組みを説明すると難しいので、小さなデモから動かしていき、仕組みを理解していきましょう。

#### ステップ1. 画面全体のクロスフェード

はじめに説明するのは次の作例です。［詳細をひらく］ボタンと［一覧へもどる］ボタンをクリックすると、画面転換が行われます。

![](https://ics.media/entry/230510/images/images/230510_vta_example_1.webp)

View Transitions APIは、JavaScriptで`document.startViewTransition()`メソッドを呼び出します。

```
// View Transitions APIを呼び出す
document.startViewTransition(() => {
  // 遷移後のDOM構造を指定
  // ･･･
});
```

HTMLでは一覧画面と詳細画面を用意し、それぞれボタンを押すと切り替わるようにします。詳細画面は`hidden`属性を使って非表示にしておきます。

```
<!-- 一覧画面 -->
<div id="view-index">
  <!-- 省略 -->
  <ul class="photo-list">
    <li>
      <div class="photo-link">
        <img class="photo-thumb" src="images/photo_1.webp" />
        <div class="photo-meta">
          <!-- 省略 -->
          <div>
            <button class="btn button-open">詳細をひらく</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>

<!-- 詳細画面 -->
<div id="view-detail" hidden><!-- 🌟hiddenで隠す -->
  <div class="detail-action">
    <button class="btn button-close">一覧へもどる</button>
  </div>
  <div class="detail-layout">
    <div>
      <img class="photo-detail" src="images/photo_1.webp" />
    </div>
    <!-- 省略 -->
  </div>
</div>
```

※`img`タグの`width`・`height`属性・`alt`属性は解説のための省略していますが、本サンプルでは記載しています。

JavaScriptではボタンを押したときに`document.startViewTransition()`メソッドを呼び出します。`startViewTransition()`メソッドの引数には、遷移後のDOMに書き換える関数を渡します。同期的な関数だけでなく、`async`宣言した非同期な関数も対応しています。

要素の出現・非表示を切り替えるのは`hidden`属性の切り替えで実現します。

![](https://ics.media/entry/230510/images/images/230510_vta_example_hidden.png)

```
// ---------------------------
// 一覧画面から詳細画面へ
// ---------------------------
const buttonOpen = document.querySelector(".button-open");

buttonOpen.addEventListener("click", () => {
  // View Transitions APIを呼び出す
  document.startViewTransition(() => {
    // 遷移後のDOM構造を指定
    document.querySelector("#view-index").hidden = true;
    document.querySelector("#view-detail").hidden = false;
  });
});

// ---------------------------
// 詳細画面から一覧画面へ
// ---------------------------
const buttonClose = document.querySelector(".button-close");

buttonClose.addEventListener("click", () => {
  // View Transitions APIを呼び出す
  document.startViewTransition(() => {
    // 遷移後のDOM構造を指定
    document.querySelector("#view-index").hidden = false;
    document.querySelector("#view-detail").hidden = true;
  });
});
```

この実装により、画面遷移時にクロスフェードで画面が変化するようになります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-example/1_start.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/blob/main/vta-example/1_start.html)

`document.startViewTransition()`メソッドでのデフォルトの演出は1秒程度のクロスフェードとして用意されています。

#### 仕組みの理解

この演出がどうやって実現されているのか仕組みを見ていきましょう。`document.startViewTransition()`メソッドを呼び出すと以下の流れで処理が進みます。

![](https://ics.media/entry/230510/images/images/230510_vta_example_1_dev.webp)

1.  `document.startViewTransition()`メソッドを呼び出す
2.  DOM変化前後のスナップショットが撮られる
3.  HTMLの最前面にスナップショットが配置される
4.  クロスフェードで変化する

※`document.startViewTransition(関数)`メソッドで渡した関数は(2)の処理時に呼び出されているようです。

(2)〜(3)の挙動は暗黙的な挙動ですが、デベロッパーツールの［要素］パネルで、HTMLのルート直下に特別な要素が配置されることを確認できます。

```
<html>
  ::view-transition
  └─ ::view-transition-group(root)
    └─ ::view-transition-image-pair(root)
        ├─ ::view-transition-old(root)
        └─ ::view-transition-new(root)
```

疑似要素となっているので`::`と表現されています。この`::view-transition`疑似要素が次の挙動をすることで演出がなされています。

-   `::view-transition`はページコンテンツの上に配置されます。
-   `::view-transition-old`は古いページビューのスクリーンショットで、`::view-transition-new`は新しいページビューのライブ表示です。

古い表示`::view-transition-old`は不透明度が`1.0`から`0.0`へ、新しい表示`::view-transition-new`は不透明度`0.0`から`1.0`へアニメーションし、これがデフォルトのクロスフェードを生み出しています。

余談ですが、中間レイヤーの`::view-transition-image-pair`はブレンドモードが`mix-blend-mode: plus-lighter;`となっており、自然なクロスフェードが実現されています（参照記事『[mix-blend-modeを使いこなそう](https://ics.media/entry/7258/)』）。

#### ステップ2. 2画面の要素を接続する実装

次に連続して遷移するように組んでみましょう。

![](https://ics.media/entry/230510/images/images/230510_vta_example_2.webp)

特定の要素に独立したアニメーションを適用したい場合は、スタイルで`view-transition-name`を割り当てます。

```
/* 一覧画面 */
.photo-thumb {
  view-transition-name: photo-example;
  contain: paint;
}

/* 詳細画面 */
.photo-detail {
  view-transition-name: photo-example;
  contain: paint;
}
```

HTML構造上、別の箇所に記載している`img`要素と同じ`view-transition-name`を割り当てています。以下はHTMLのコードの一部をわかりやすいように切り出したものです。片方のDOMは`hidden`属性で非表示にしていることも注目ください。

```
<!-- 一覧画面 -->
<div id="view-index">
  <!-- 省略 -->
  <ul class="photo-list">
    <li>
      <div class="photo-link">
        <!-- 🌟この画像から接続 -->
        <img class="photo-thumb" src="images/photo_1.webp" width="640" height="360" alt="" />
        <!-- 省略 -->
      </div>
    </li>
  </ul>
</div>

<!-- 詳細画面 -->
<div id="view-detail" hidden><!-- 🌟hiddenで隠す -->
  <!-- 省略 -->
  <div class="detail-layout">
    <div>
      <!-- 🌟この画像へ接続 -->
      <img class="photo-detail" src="images/photo_1.webp" width="640" height="360" alt="" />
    </div>
    <!-- 省略 -->
  </div>
</div>
```

この実装を行うことで写真が画面転換時に連続的に切り替わります。位置や大きさが連続的につながるようにアニメーションします。一覧画面と詳細画面の画像はまったく異なる構造なのに、画像がジャンプするように切り替わっています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-example/2_1_hidden.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/blob/main/vta-example/2_1_hidden.html)

開発者ツールの［要素］タブでDOMの構造を確認しましょう。`::view-transition`疑似要素内に、デフォルトの`::view-transition-group(root)`と、`view-transition-name`で用意した`::view-transition-group(photo-example)`（任意の名称）の2種類の組が発生しています。

![](https://ics.media/entry/230510/images/images/230510_vta_example_2_hidden.png)

-   `::view-transition-group(root)`はデフォルトのアニメーションで**画面全体が**クロスフェードとして働きます。
-   `::view-transition-group(photo-example)`は**対象物だけが**位置とサイズが連続的につながるようにアニメーションします。

疑似要素にマウスホバーすると、それぞれの疑似要素がハイライトされるので、構造を理解するのに役立つでしょう。

![](https://ics.media/entry/230510/images/images/230510_vta_example_2_dev.webp)

#### 補足：画面要素の切り替え方法

ここまで`hidden`属性で切り替える方法で説明しました。`hidden`属性でなくても`display: none`のスタイルで制御しても構いません。

```
const buttonOpen = document.querySelector(".button-open");
buttonOpen.addEventListener("click", () => {
  // View Transitions APIを呼び出す
  document.startViewTransition(() => {
    // 遷移後のDOM構造を指定
    document.querySelector("#view-index").style.display = "none";
    document.querySelector("#view-detail").style.display = "block";
  });
});
```

DOMツリー上の要素の有無で制御してもいいので、`appendChild()`や`removeChild()`メソッドで制御しても構いません。

```
const buttonOpen = document.querySelector(".button-open");

const elContainer = document.querySelector("#container");
const elIndex = document.querySelector("#view-index");
const elDetail = document.querySelector("#view-detail");

// 詳細画面をDOMツリーから外す
elContainer.removeChild(elDetail);

buttonOpen.addEventListener("click", () => {
  // View Transitions APIを呼び出す
  document.startViewTransition(() => {
    elContainer.appendChild(elDetail); // DOMツリーに追加
    elContainer.removeChild(elIndex); // DOMツリーから外す
  });
});
```

#### ステップ3. 複数の要素を連続して遷移させる

ここまでは1つの要素だけでアニメーションさせてきたので、複数の要素にも設定してみましょう。

![](https://ics.media/entry/230510/images/images/230510_vta_example_3.webp)

次の作例では、一覧画面に2つのアイテムを配置し、それぞれが詳細画面へ遷移するように演出しています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-example/3_multi.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/blob/main/vta-example/3_multi.html)

接続させたい要素に独立した`view-transition-name`の文字列を割り当てます。1枚目の写真には`photo-example-1`を、2枚目の写真には別名の`photo-example-2`を指定します。

```
/* 写真1 */
.photo-1 {
  view-transition-name: photo-example-1;
  contain: paint;
}
/* * 写真2 */
.photo-2 {
  view-transition-name: photo-example-2;
  contain: paint;
}
```

```
<!-- 一覧画面 -->
<div id="view-index">
  <ul class="photo-list">
    <li>
      <!-- 省略 -->
      <img class="photo-thumb photo-1" data-content="1" src="images/photo_1.webp"  />
    </li>

    <li>
      <!-- 省略 -->
      <img class="photo-thumb photo-2" data-content="2" src="images/photo_2.webp"  />
    </li>
  </ul>
</div>

<!-- 詳細画面 -->
<div class="view-detail" data-content="1" hidden>
  <!-- 省略 -->
  <img class="photo-detail photo-1" src="images/photo_1.webp" />
</div>

<div class="view-detail" data-content="2" hidden>
  <!-- 省略 -->
  <img class="photo-detail photo-2" src="images/photo_2.webp"  />
</div>
```

JavaScriptでは、カスタムデータ属性の`data-content`属性の値を参照して、対象の要素の`hidden`属性を切り替えています。

#### Vue.jsでの利用

View Transitions APIはJavaScriptのフレームワークでも利用できます。DOMの変化時に`document.startViewTransition()`メソッドを挟み込む形で利用します。

一例として、Vue.jsでの実装方法を紹介します。ステートの変化時に`document.startViewTransition()`メソッドを呼び出します。

```
import { createApp, ref, nextTick } from "vue";

// ･･･省略･･･

const app = createApp({
  setup() {
    // 現在表示している画面を示す状態
    const currentContent = ref(null);

    // 画面遷移の関数
    const goPage = (content) => {
      // View Transitions APIを使って、遷移を行う
      document.startViewTransition(async () => {
        currentContent.value = content;
        await nextTick();
      });
    };
    return { currentContent, goPage };
  },
  // ･･･省略
});
app.mount("#app");
```

ちょい足しVue.jsとして作例を用意したので、参考にしてください。短いコードで実現できています。Vue.jsはプレーンなHTMLに後付けでJSを載せられるので便利です。詳しくは『[HTMLにちょい足しでできる！ Vue.jsでサクッと動きをつける方法](https://ics.media/entry/210908/)』を参照ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230510_view_transitions_api/vta-example/5_vue.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230510_view_transitions_api/blob/main/vta-example/5_vue.html)

ここまでが、View Transitions APIをシンプルに利用するための解説でした。

### 冒頭のデモを振り返り

さて、冒頭のデモで利用している技術を振り返ってみます。ウェブサイトにView Transitions APIを組み込むために、どのような実装が必要なのかを紹介します。

#### ルーター遷移

複数のHTMLをSPA（シングル・ページ・アプリケーション）として切り替えており、HTML PushStateによりアドレスバーのURLを変化させています。生のJavaScriptで制御しています。

![](https://ics.media/entry/230510/images/images/230510_vta_thumbs_history.png)

#### パーツの構造

`view-transition-name`は、3つの要素グループとしてわけています。これらのパーツは、それぞれ異なるアニメーションとして動かすために指定しています。

![](https://ics.media/entry/230510/images/images/230510_vta_structure.png)

#### 演出の切り替え

ページ遷移の方向にしたがって、View Transitions APIの演出を切り替えています。ルートの`html`要素に対してCSSクラスを追加し、CSS Animationsの発火を制御しています。ページの遷移方向を考慮してさまざまなパターンのCSSクラスを定義しています。

-   一覧画面から詳細画面へ / 詳細画面から一覧画面へ / 詳細画面から詳細画面へ
-   ブラウザ履歴で戻るか / ブラウザ履歴で進むか

![](https://ics.media/entry/230510/images/images/230510_vta_thumbs_class.webp)

意外と複雑な実装になっています。実のところView Transitions APIを有効に活用するには、さまざまな技術の組み合わせが必要になります。DOMの書き換えなどのJavaScriptはもちろんのこと、CSSの知識やノウハウ、UIアニメーションのセンスも欠かせません。

### 対応ブラウザ

対応ブラウザは次の通りです。

-   SPA
    -   Chrome 111・Edge 111（2023年3月リリース）以上
    -   Safari 18.0（2024年9月リリース）以上
    -   Firefox 144（2025年10月リリース）以上
-   MPA
    -   Chrome 126・Edge 126（2024年6月リリース）以上
    -   Safari 18.2（2024年12月リリース）以上
    -   Firefoxは未対応
-   参照：[Can I use...](https://caniuse.com/mdn-api_viewtransition)

### フレームワークの対応

#### Next.js

Reactのフレームワークの「Next.js」でもView Transitions APIを利用できます。

-   [next.config.js: viewTransition | Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)

#### Nuxt

Nuxt 3.4（2023年4月リリース）には実験的機能としてView Transitions APIが搭載されています。設定ファイル`nuxt.config.ts`で`experimental.viewTransition`オプションを指定するだけで、すべてのページ遷移で有効にできます。

▼`nuxt.config.ts`ファイル

```
export default defineNuxtConfig({
  // 実験的機能
  experimental: {
    // View Transitions APIの有効フラグ
    viewTransition: true
  }
})
```

シンプルなデモで実装例が紹介されているので、Vue.jsやNuxtの開発経験のある方は、ぜひ試してみましょう。オンライン上でソースコードを編集しながら、動作を確認できます。

-   [Nuxt ❤️ View Transitions - StackBlitz](https://stackblitz.com/edit/nuxt-view-transitions?file=components%2FImageGallery.vue)

![](https://ics.media/entry/230510/images/images/230510_vta_nuxt.png)

本サイトICS MEDIAはNuxtを利用しているため、View Transitions APIを有効にしています。ぜひ[トップページ](https://ics.media/)からの画面遷移を試してみてください。

※本サイトはアニメーションが苦手な方のために、アニメーションを無効にするオプションを用意しています。View Transitions APIのアニメーションは、OSの設定に依存しているので、OSの設定を確認のうえ試してください。詳しくは『[ウェブサイトに演出は不要!? ユーザー設定にレスポンシブ対応できる新しいCSS](https://ics.media/entry/210604/)』を参照ください。

### 実装は難しく、設計が重要

最後に、View Transitions APIの注意点を紹介します。

#### ①アニメーションの対象ページの判定が必要

View Transitions APIで画面遷移を作る場合、ウェブサイトのどのページ間でアニメーションを利用するか検討する必要があります。

「特定の画面ではアニメーションさせたい」、「別の画面ではアニメーションさせたくない」といったケースがあるでしょう。画面設計の段階で、どの画面間でアニメーションが必要であるか検討する必要があります。

![](https://ics.media/entry/230510/images/images/230510_vta_note_category.png)

フレームワークによっては、すべての画面遷移でView Transitions APIを簡単に有効にできます。その場合には、あえて特定の画面遷移だけ無効化するような実装が必要となります。

#### ②view-transition-nameの重複を避ける

`view-transition-name`は表示DOMツリー上に同時に2つ以上存在できません。`view-transition-name`を重複した状態があると、すべてのView Transitions APIのアニメーションが、一切発火しなくなります。

画面設計で解決するか、実装時の工夫が必要となります。

![](https://ics.media/entry/230510/images/images/230510_vta_note_duplicate.png)

※対策として`view-transition-name`を動的に切り替えることが考えられます。ただ、View Transitions APIの演出の最中にHTML要素の`view-transition-name`の名前が変化すると、ブラウザ自体が強制終了するので注意が必要です。

#### ③ビューポートの検知が必要

一般的なウェブページでは垂直方向にスクロールできます。遷移前後においてスクロールの領域外（ビューポートの外側）に要素があっても、View Transitions APIのアニメーションが発火します。

ビューポートの外側の座標からアニメーションが動作すると、不自然な表現となる場合があります。

![](https://ics.media/entry/230510/images/images/230510_vta_note_viewport.png)

対策としてビューポートに含まれるかIntersection Observer APIで検知して、ビューポート内の表示時のみ演出を発火させたいところです。この点については本サイトは技術的障壁が存在し、対応しきれていません。

### まとめ

View Transitions APIの使い方を紹介しました。

画面遷移に接続するようなアニメーションの将来性について、2018年のAdobe MAXの講演で紹介しました。『[Adobe MAX JAPAN 2018発表資料](https://ics.media/entry/19498/)』で当時の発表資料を確認できます。当時、ウェブでは技術的な課題があると話しましたが、**View Transitions APIの登場によって実現可能なフェーズになったと**言えます。

View Transitions APIは、ウェブの可能性を広げる魅力的な機能です。ユーザーに適切な視線誘導をもたらし、コンテンツへの没入感を高め、操作を助ける演出とすることが重要なポイントと筆者は考えています。UXを向上させる手段として、**ユーザーにとって有益な演出**が増えることを期待しています。