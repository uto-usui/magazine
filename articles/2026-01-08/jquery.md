---
title: "脱jQueryのためにしたこと"
source: "https://ics.media/entry/17451/"
publishedDate: "2017-04-18"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

脱[jQuery](https://jquery.com/)という主張をよく耳にします。

私の個人プロジェクト「[Beautifl - Flash Gallery](https://beautifl.net/)」のリニューアルでも、依存しまくっていたjQueryの採用をやめました。

サイトを立ち上げたのは8年前の2009年。最盛期のjQueryをふんだんに使って、インタラクションの充実したRIAの開発に挑戦していました（参照「[wonderflのギャラリーサイトBeautiflを作りました](http://clockmaker.jp/blog/2009/08/beautifl/)」）。

この記事では、**なぜjQueryをやめようと思ったのか、別の技術で得たものは何なのかを紹介します**。

![Beautifl - Flash Gallery](https://ics.media/entry/17451/images/170418_beautifl_website.jpg)

▲リニューアルした[Beautifl](https://beautifl.net/)は、jQueryをすべて抜きました

※この記事は「[CSS Grid Layoutをガッツリ使った所感 - ICS MEDIA](https://ics.media/entry/17403/)」に対する後編（JavaScript編）となります。

### リニューアルにあたってJavaScriptで改善したかったこと

リニューアルにあたって改善したいことがありました。

-   昔のブラウザのためだけの、古いコードが残っている
-   モデルとビューの混在を整理したい
-   jQueryのままだとWAI-ARIAなどの対応が面倒

**「jQueryは時代遅れ…」という思いは個人的にはまったくないものの、実現したいイマドキの機能要件を満たすには物足りなくなってきていました**。

新規プロジェクトであれば初めからAngularやReact、Polymer、Vue、RiotなどのJSライブラリを検討できるでしょう。今回は**jQueryで完成した土台がある状態で、いかにして脱jQueryとするかが鍵でした**。

### 使いみちのない古いコードとは

[はてなブックマークのコメント一覧](http://b.hatena.ne.jp/entry/beautifl.net/)によると[Beautifl](https://beautifl.net/)は「**Flashギャラリーなのに、なぜかHTML5でできてる**」とコメントももらっているなど、当時としては先進的にHTML5の導入に挑戦していました。過渡期の時代は華やかに見えて、実は裏側は混沌としたもの。

例として「透過」を紹介します。

#### 当時は満足に使えなかった透過処理

当時のIE7やIE8では透過PNGをまともに使えなかったり、CSSの不透明度プロパティが使えませんでした（参照「[Can I use… - Opacity](https://caniuse.com/#search=opacity)」）。モダンブラウザでは透過を適用し、IEでは透過処理をスキップするには分岐が必要です。

具体的に実装していたコードは次のようなもの。

```
if ($.support.opacity === true) {
  $("#searchResultContainer").css("opacity", 0);
}
```

jQueryには、ブラウザに特定の機能を持ち合わせているかを調べるヘルパー機能がありました。過渡期においても新旧さまざまなブラウザに幅広く対応できる手助けになったことは間違いありません。

ただ、透過が扱えないブラウザのための分岐コード`$.support.opacity === true`はまったく今のブラウザ環境では意味をなさないですよね。こういった古いコードは根こそぎ削除していきました。

### 標準APIへの移行

JavaScriptでは8年前と比べるとかなり多くのAPIが充実しています。たとえば、`document.querySelectorAll()`メソッドなどが代表的なものでしょう。参照したい要素に簡単にたどり着けます。

jQueryはブラウザの違いを吸収でき恩恵が大きかったのですが、今は標準のAPIだけで十分実現できるようになりました。

#### ロールオーバーの処理

ロールオーバーとロールアウトを実装するコードを例に紹介します。

![](https://ics.media/entry/17451/images/170418_beautifl_jquery_menu.gif)

✏ 昔のコード

```
var cnt = 0;
$("aside ul.category li a").each(function() {
  $(this)
    .attr("data-index", cnt)
    .hover(
      function() {
        // ロールオーバー処理（文字がシャカシャカ動く演出とか）
      },
      function() {
        // ロールアウト処理
      }
    );
  cnt++;
});
```

こういったコードは次のように改善しました。

✏新しいコード

```
const listItems = document.querySelectorAll(
  "aside ul.category li a"
);

for (let i = 0; i < listItems.length; i++) {
  const item = listItems.item(i);
  item.dataset.index = String(i);
  item.addEventListener(
    "mouseenter",
    event => {
      // ロールオーバー処理（文字がシャカシャカ動く演出とか）
    },
    false
  );
  item.addEventListener(
    "mouseleave",
    event => {
      // ロールアウト処理
    },
    false
  );
}
```

もしかしたらjQueryのほうがコードが短く読みやすいかもしれませんがｗ

余談ですが、マウスオーバー時に文字がシャカシャカ動く演出は自作JSライブラリー「[ShuffleText](https://github.com/ics-ikeda/shuffle-text)」を使っています。無料で使えるのでぜひ試してみてくださいませ。

#### JSONファイル読み込みの処理

AJAXのコードも標準の仕様に置き換えました。

✏ 昔のコード

```
$.ajax({
  url : 'search.php',
  data : {
    key : query.join(",")
  },
  dataType : 'json',
  success: /* ハンドラーを指定 */
});
```

✏新しいコード

```
fetch(
  `search.php?key=${encodeURIComponent(query.join(","))}`
)
  .then(response => response.json())
  .then(json => {
    /* ハンドラーを指定 */
  });
```

標準のAPIとして`fetch()`で処理できるのはシンプルでいいですね。非同期処理には`await/async`を使うともっとシンプルに記述できます。

#### アニメーションの指定はJS側ではなくCSS側に

当時はCSS Transition対応のブラウザが限られていたため（参照「[Can I use…](https://caniuse.com/#feat=css-transitions)」）、CSSではなくJSでアニメーションをつけていました。そういった事情もあり、JavaScriptのコードにはモデルとコントロール、ビューが入り混じっています。

たとえば、検索バーのフォーカス時のアニメーションの実装をみてみましょう。

![](https://ics.media/entry/17451/images/170418_beautifl_jquery_search-width.gif)

✏昔のコード

```
$("#incrementalSearch").focus(focusHandler);

function focusHandler() {
  // 状態を保存
  this.isFocused = true;
  // レイアウトの調整
  $("#searchBody")
    .stop()
    .animate({ width: 150 }, 500, "easeInOutExpo");
}
```

✏新しいコード

新しい設計では、JSでは`class`属性の追加／削除のみを扱い、動きはCSSで実装することに。JS側に記載していたアニメーションの処理はCSSに分離でき、コードの見通しがよくなりました。

```
template : `
  <div class="searchBody" v-bind:class="{focus: isFocused}">
    <input v-on:focus="focusHandler" />
  </div>`,
methods : {
  focusHandler: function (event) {
    // 状態を保存
    this.$data.isFocused = true;
  },
}
```

```
.searchBody {
  width: 100px;
  transition: all 0.3s ease;
}
.searchBody.focus {
  width: 150px;
}
```

### モデルとビューの分離のためのフレームワークの選定

ゼロスクラッチなSPA（シングルページアプリケーション）だったらAngularやReactも有力な検討候補でしょう。Angularは2016年のカンファレンス[ng-japan](http://qiita.com/nyamogera/items/b83833d1e15a55d0bb66)で発表したように、強力で生産性の高いフレームワークです（参照「[クリエイティブの視点から探るAngular 2の可能性](https://www.slideshare.net/clockmaker_jp/angular-2-59811274)」）。手前味噌ですが、[Chrome Experimentsに選出された](https://www.chromeexperiments.com/experiment/particle-develop)「[Particle Develop](https://ics-creative.github.io/project-particle-develop/)」は、Angular 2を使って実質1週間で制作。高機能なSPAをものすごいスピードで開発できます。

また、フレームワークを選定するときは、比較のためにモックを作って試したり、定量的に検証し比較するのがセオリーです。私は普段からさまざまなフレームワークを検証するのが好きなのですが、AngularやReact、Vueの性能比較を行ったりもしています。

![](https://ics.media/entry/17451/images/170418_beautifl_jquery_performance.png)

※[JSフレームワークのパフォーマンス測定](https://github.com/ics-creative/160916_performance_js_framework)では、1800個のSVG要素を表示して、Angular（約40fps）＞React（約38fps）＞＞＞＞Vue.js（約20fps）という結果になりました

ところが、今回のBeautifl.netのリニューアルでは、上記の測定でパフォーマンスが比較的優れなかった[Vue.js](https://ja.vuejs.org/) 2.2を採用することになりました。その理由は・・・

#### ゼロスクラッチでないプロジェクトにVue.jsが向いていた

このサイトはPHPでHTMLを出力する構成です。なので、厳密にいうとSPA=シングルページアプリケーションではなく、マルチページアプリケーション（そんな表現あるのかな？）です。サーバー側で出力したHTMLに対して、JS側で処理を乗っけるイメージ。

**「すでにHTMLがある状態で何かをする」という目的ではVue.jsが適しています**。Angular（2以上）やReactだとDOMを一から組み立てていく方法になるため、今回のケースでは適しないと判断しました。

※Angular 1.xもVue.jsと同じように静的なHTMLがある状態から制御できますが、「（Angular 2のスキルがある状態で）イマサラAngular 1.xを学ぶのもなぁ」という気持ちもあり、Vue.jsを選択しました。

#### Vue.jsによってシンプルになったJavaScriptのコード

Vue.jsの導入によってシンプルになった制御コードをみていきましょう。サイトのヘッダーにある、インクリメンタルサーチの実装コードです。

![](https://ics.media/entry/17451/images/170418_beautifl_jquery_search.gif)

✏ 昔のコード

```
/** 検索結果を受け取ったら */
search_successHandler: function (data, status) {
  for (var i = 0; i < data.length; i++) {
    str += '<a id="searchItem_' + i + '" href="https://beautifl.net/run/' + data[i].id + '">';
    str += '  <div class="searchItem clearfix">';
    str += '    <div class="thumb">';
    str += '      <img src="archives_s/' + data[i].wid + '.jpg" />';
    str += '    </div>';
    str += '    <div class="meta">';
    str += '      <span class="searchTitle">' + data[i].title + '</span><br />';
    str += '      <span class="searchUser">' + data[i].user + '</span>';
    str += '    </div>';
    str += '  </div>';
    str += '</a>';
  }
  $('#searchResultContainer').html(str);
}
```

✏新しいコード

```
<ul v-if="items.length >= 0">
  <li v-for="(item, index) in items">
    <a v-bind:href="'https://beautifl.net/run/' + item.id"
       v-bind:class="{selected : searchItemSelectedIndex === index}"
       aria-selected="searchItemSelectedIndex === index ? 'true' : 'false'">
      <div class="searchItem">
        <div cass="thumb">
          <img v-bind:src="'archives_s/' + item.wid + '.jpg'" />
        </div>
        <div class="meta">
          <span class="searchTitle">{{ item.title }}</span><br/>
          <span class="searchUser">{{ item.user }}</span>
        </div>
      </div>
    </a>
  </li>
</ul>
```

```
/** 検索結果を受け取ったら */
search_successHandler: function (items, status) {
  // データをセットする
  this.$data.items = items;
}
```

昔のコードはHTMLを組み立てるのに文字列を結合するというストイックなやり方でした。新しいコードでは、HTMLテンプレート側にビューの制御を書き、JS側にロジックを書いてます。ビューとモデルを分離できたという点で、見通しやすくなりました。

全体的にVue.js 2.2を導入したことで、JavaScriptにはロジックのみを記述することができ（表示制御のコードを分離でき）、可読性が向上しました。恩恵として、キーボードの↑キーや↓キーの制御も、Vue.js側でプロパティの数値を変えるだけで簡単に実装できてます。

### アクセシビリティの向上に

[WAI-ARIA](https://www.w3.org/TR/wai-aria/)はRIAのアクセシビリティのためのAPIです。HTMLのDOM要素に`aria-selected`や`aria-checked`などの属性を付けることで、ブラウザに要素がどのような状態であるか伝えます。そのことによって、音声リーダーなどで認識させることができるというものです。

参照

-   [WAI-ARIAを活用したフロントエンド実装 - role属性、aria属性の基礎知識 | CodeGrid](https://app.codegrid.net/entry/wai-aria-1)

WAI-ARIAはHTML要素の属性を動的に書き換えなければならないため、**生JSやjQueryで制御しようとすると、正直、骨が折れます**。

Vue.jsだとHTMLの属性に記載すれば動的に値を書き換えられるので、最小限のコードでWAI-ARIAを設定できます。JS側にあるのは状態を示すプロパティのみで、JSのロジックにはWAI-ARIAの一切の処理が入っていません。

```
<button v-bind:aria-checked="isSelected === true ? 'true' : 'false'" v-on:click="イベントハンドラー" aria-label="読み上げ用の文言">
  <!-- ROLL OVERのアイコン画像 -->
</button>
```

![](https://ics.media/entry/17451/images/170418_beautifl_jquery_wai-aria.gif)

モデルとビューを管理する系のJSライブラリはWAI-ARIAの`aria-*`属性の制御に適しています。Vue.jsに限らずAngularやReactユーザーの方は積極的にWAI-ARIAを採用したらいいのになぁと思います。

導入方法は次の記事にまとめてますので、参照ください。

-   [WAI-ARIA対応のタブ型UIを実装する方法(React版)](https://ics.media/entry/17109/)
-   [WAI-ARIA対応のタブ型UIを実装する方法(Angular版) - Qiita](https://qiita.com/clockmaker/items/2ccf50429a5465ea5a69)

#### 余談

余談ですがTwitterでアンケートをとったことがあるのですが、WAI-ARIAはあまり採用されていないようですね…。昔から業界的にアクセシビリティの向上への関心が低いような気がします、自戒の念を込めて。

引用：「[Web業界は何時まで働くのか？ HTMLコーダーへのアンケート結果(業務時間やコードの書き方、Web技術について) - ICS MEDIA](https://ics.media/entry/13597/)」

### まとめ

今回の記事は**jQueryで対応しにくくなった課題に対処するために、Vue.jsを導入した**という話でした。メリットとデメリットをまとめると・・・

#### 得られたメリット

-   JSを中心に、見落としの悪いコードを整理できた
-   WAI-ARIAを積極的に導入したくなる土台ができた
-   jQueryの容量を削減できた

#### デメリット

-   jQueryから標準API/Vue.jsに移行する工数が結構かかった。。
-   標準APIとはいえ、IE11に対応するために`Promise`や`fetch()`のPolyfillを入れている
-   8年前のjQueryのコードは2017年現在も実行でき異なる技術へ移行可能だったが、同じ年月がこれから過ぎたとしてVue.js 2.2のコードをメンテナンスできるか不安。フロントエンドエンジニアの技術の移り変わり的な意味で。（[Beautifl](https://beautifl.net/)のサイト自体は私が生きている限り、半永久的に残すつもり）

CSS編の記事「[CSS Grid Layoutをガッツリ使った所感](https://ics.media/entry/17403/)」もあわせてご覧ください。

#### 補足

-   もし商用案件だったら「置き換える工数」と「運用開発コストがどれだけ減るか、エンジニアの調達がしやすい技術か、将来性はどうか、テストやデプロイの自動化に適しているか、・・・エンドユーザーにも恩恵があるか、利益はでるか」などを比較して検討。今回は個人プロジェクトなので好き勝手やりました。
-   完全なSPAとしなかったのはSEOに関する理由からです。[サーバサイドレンダリング](https://ja.vuejs.org/v2/guide/ssr.html)を自分ができればよかったのですが、すでに作り上げたサーバーサイドを大幅に変更する体力がなく…。
    -   ちなみにReactなどでサーバーサイドレンダリングを活用し、SPAでSEOを成功させている国内事例に興味があります。そういう記事はあったりしないかしら？