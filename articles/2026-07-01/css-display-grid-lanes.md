---
title: "CSSだけでメイソンリーレイアウト - display: grid-lanesの使い方"
source: "https://ics.media/entry/260611/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-06-10"
category: "frontend"
feedName: "ICS MEDIA"
author: "narayama"
---

[Pinterest](https://jp.pinterest.com/)のフィードのように、高さの違うカードを等幅の列へ隙間なく積む「メイソンリー」レイアウト。これをウェブページ内に実現しようとすると、考慮すべき点が多く、見た目以上に難しいものです。作ったことがある方なら、その難しさに心当たりがあるでしょう。作ったことがない方はどう難しいか記事を読みながら想像してみてください。

そんな難易度の高いレイアウトが、Safari 26.4から新しいレイアウトモードである`display: grid-lanes`を使うことで、CSSだけで実現できるようになりました。

▼ メイソンリーレイアウトの例

![画像共有サイトを模したモック。高さの異なるカードが等幅の列に隙間なく積み上がった、メイソンリーレイアウトの例](https://ics.media/entry/260611/images/masonry-site-mock.png)

本記事は、2026年6月6日に開催された[フロントエンド・PHPカンファレンス北海道2026](https://frontend-php-con.hokkaido.jp/)にて、「CSS Grid Level 3 グリッドレーンのデモと、Web標準の行方」と題して発表した内容をベースにしています。 ![Safari 26.4での表示。全幅のheader、2列ぶんのカード、右寄せ2列のカードが混ざったメイソンリー](https://ics.media/entry/260611/images/fr-php-conf.avif)

### なぜ「メイソンリー」はCSSで難しかったのか

本記事では、**高さの違うカードを等幅の列に隙間なく積むレイアウト**を「メイソンリー」と呼び、それを実現するCSSの新機能を`display: grid-lanes`と表記します。

メイソンリーでやりたいことは、突き詰めると3つの条件に絞られます。

-   カードの高さは**可変**（画像やテキスト量でバラバラ）
-   列は**等幅**で、画面幅に応じて列数が変わる
-   HTMLに書いた順番を保ったまま、**空いている列へ隙間なく**詰めていく

従来のCSSには、この「**最短の列を探して積む**」という処理を担うレイアウトモードがありませんでした。CSS GridもFlexboxも、行や列のグリッドにきれいに揃えることは得意ですが、列ごとに高さがズレていく非対称な詰め込みには対応していません。

下の図で言えば、①〜⑥のカードをHTMLに書いた順に取り出し、そのつど**積み上がりがいちばん低い列**へ置いていく、という詰め方です。

![①から⑥のカードをHTMLに書いた順に取り出し、そのつど積み上がりがいちばん低い列へ詰めていく、というメイソンリーの目標を示した模式図](https://ics.media/entry/260611/images/goal.png)

#### これまでの回避策と、その限界

これまでは大きく3つの回避策が使われてきました。

回避策

代表例

限界

**JSメイソンリー**

[masonry.js](https://masonry.desandro.com/)、[Isotope](https://isotope.metafizzy.co/)など

リサイズや追加のたびにJSの再計算が走りカクつく。SSRとの相性の悪さ、保守の負荷も

**CSS Columns**（マルチカラムレイアウト）

`column-*`プロパティ

タブ順序が列単位で縦に走り、スクリーンリーダー体験が悪い

**Flexboxでの列分割**

flexと列コンテナー

列間の高さバランスを自前で調整する必要がある

### display: grid-lanes

`display: grid-lanes`を使えば、専用のレイアウトモードとしてメイソンリーを実装できます。

```
.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
  gap: 10px;
}
```

メイソンリーに必要なのは、**最初の2行**です。`display: grid-lanes`でレイアウトモードを切り替え、`grid-template-columns`で列（レーン）を定義すれば、メディアクエリー不要のレスポンシブなメイソンリーになります。3行目の`gap`はカード間の余白指定で、ここまでがよく使う形です。

-   `grid-template-columns`が**縦方向の定義**になり、縦積み（後述のwaterfall）が選択される
-   `minmax(144px, 1fr)`で列幅の下限（144px）と伸縮範囲（1fr）を指定する
-   `auto-fill`で、入る限り列を増やす

下のデモはスライダーでコンテナーの幅を変えられます。狭めていくと、メディアクエリーなしで列数が自動で減っていきます。

**本記事のデモはSafari 26.4以上でご覧ください。**

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/waterfall.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/waterfall.html)

### 充填アルゴリズム — レーンが「独立に伸びる」とは

`grid-lanes`の挙動は以下になります。

> 次のカードを**いちばん背の低い列**に置く。これを最後まで繰り返す。

通常のCSS Gridは、行と列のグリッド線で区切られたマス目に沿ってアイテムを配置します。これに対して`grid-lanes`では、各列が**レーン**として独立し、それぞれが「いまどこまで埋まっているか」という**現在の実行位置**を持ちます。配置のたびに、実行位置がもっとも手前にあるレーン＝いちばん背の低い列が選ばれます。

順を追うと、こうなります。

1.  各列（レーン）の**いまの高さ**を見る
2.  **いちばん低い列**に次のカードを置く
3.  最後のカードまで繰り返す

たとえば3列に①〜⑥を流すと、次のように決まります。

-   ①②③ … まず各列の先頭に順に置かれる
-   ④ … 2列目と3列目が同じ高さでいちばん低い。高さが並んだときは**先（左）のレーン**が選ばれるので**2列目**へ
-   ⑤ … 今度は3列目だけがいちばん低いので**3列目**へ
-   ⑥ … 残った1列目（背は高いが他が埋まった）へ

![充填アルゴリズムのステップ図。①②③を順に置き、④は2列目、⑤は3列目、⑥は1列目と、毎回いちばん低い列へ配置していく過程](https://ics.media/entry/260611/images/fill-steps.png)

見た目は通常のGridと似ていますが、行をそろえずレーンごとに伸びていく点が決定的に違います。

### 方向の切り替え — waterfallとbrick

`grid-lanes`の積み上げ方向は、`grid-template-columns`と`grid-template-rows`のどちらを指定したかで自動的に決まります。

```
/* waterfall = 縦方向のメイソンリー（列を定義） */
.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

/* brick = 横方向のメイソンリー（行を定義） */
.lanes {
  display: grid-lanes;
  grid-template-rows: repeat(3, 96px);
  gap: 8px;
}
```

-   **waterfall（縦積み）** … `grid-template-columns`を指定。一般的な縦方向のメイソンリーレイアウト
-   **brick（横積み）** … `grid-template-rows`を指定。レンガを横に積むように、左から右へ流れる（行の高さは行トラックで決まり、各カードは自分の幅を持つ。デモでは幅をばらつかせている）

brickは、RTL（右から左に読む言語）のテキストや、横スクロールするカルーセルとの相性が良い方向です。列定義か行定義かを切り替えるだけで方向が変わるため、メディアクエリーで縦横を出し分けるといった応用もできます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/brick.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/brick.html)

### アイテムのスパンと明示的配置

`grid-lanes`では、アイテムの幅をCSS Gridと**同じ構文**で拡張できます。特定のアイテムだけ横幅を広げる、といった使い方もできます。

```
.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
header {
  grid-column: 1 / -1;
} /* 全幅 */
.hero {
  grid-column: span 2;
} /* 2列ぶん */
.sidebar {
  grid-column: -3 / -1;
} /* 右寄せ2列 */
```

`header`は横幅いっぱいに表示したいので、`grid-column: 1 / -1`を指定しています。`.hero`は`grid-column: span 2`で2列ぶんの幅に広げています。`.sidebar`の`-3 / -1`のような**マイナスインデックス**を使うと、右端を基準にした**右寄せ配置**もできます。

幅の広いアイテムを複数レーンにまたがらせると、そのアイテムは**またがったレーンすべての実行位置を同時に進めます**。先ほどの例では`header`が1〜3のすべてのレーンにまたがっているため、ほかのアイテムはどれも`header`より下に配置されます。これが次に説明する`flow-tolerance`の挙動に影響します。

▼ デモのスクリーンショット（Safari 26.4）

![Safari 26.4での表示。全幅のheader、2列ぶんのカード、右寄せ2列のカードが混ざったメイソンリー](https://ics.media/entry/260611/images/demo-span.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/span.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/span.html)

### flow-tolerance — レーン吸着の強さ

`grid-lanes`にあわせて新しく登場したプロパティが`flow-tolerance`です。これは「**同じ高さのレーン**」とみなす許容幅を指定します。

```
.lanes {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(min(144px, 30%), 1fr));
  flow-tolerance: 1em; /* 初期値のnormalは1em相当 */
}
```

とれる値は3種類あります。

値

挙動

`normal`（初期値）

約`1em`を許容幅とする標準の吸着

`<length-percentage>`

許容幅を明示的に指定（例: `0`、`2em`、`10%`）

`infinite`

**ソース順を厳守**する（最短レーン優先をやめ、DOM順のまま積む）

充填アルゴリズムは「いちばん低いレーン」へ次のカードを置きますが、`flow-tolerance`は**最短レーンをどこまで厳密に優先するか**を左右します。許容幅の範囲内に複数のレーンが収まっていれば、それらを「同じ高さ」とみなし、ソース順を優先して自然な並びを保てます。

-   `flow-tolerance`を**小さく**すると、わずかな高さの違いでも最短レーンを厳密に選ぶため、視覚的に詰まりますが、DOM順と視覚順がずれやすくなります
-   `flow-tolerance: infinite`にすると完全にソース順になり、見た目は崩れやすくなりますが順序は厳密です

下のデモはスライダーで値を変えられます。カードの高さはわざと近づけてあるので、吸着のかかり方の違いが見えやすいはずです。0に近づけてからカードをTabキーでたどると、フォーカスが画面を飛び回るのがわかります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/tolerance.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/tolerance.html)

この値はアクセシビリティにも影響します。タブ順序やスクリーンリーダーの読み上げ順はDOM順のままなので、`flow-tolerance`を小さくしすぎると視覚順とのズレが広がります。先ほどのTabキーの挙動がそれで、カードが密集する画面ほど値を大きめにしておくと安心です。

### JSとの連携 — anime.js / GSAP Flip

#### モーションの付与について

ここまでのレイアウトはCSSだけで完結しています。ただ、メイソンリーのカードは追加や並び替えのたびに位置が変わり、そのままでは一瞬で切り替わります。JavaScriptと連携すると、この位置の変化に滑らかなモーションを付けることができます。

カードの位置はレイアウト計算の結果なので、CSSのトランジションでは補間できません。滑らかに動かすには、`document.startViewTransition()`でブラウザに任せるか、JSライブラリで補間するかの2択です。本記事では、手軽なアニメーションライブラリを利用した方式を紹介します。

どこにカードを置くかは引き続き`grid-lanes`が決めますので、移動の前後を**なめらかにつなぐ補間**をライブラリに任せます。デモを、[anime.js](https://animejs.com/)版と[GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/)版の2パターンで用意したので、順に紹介します。

#### anime.js版

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/animejs.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/animejs.html)

たとえばカードの追加時にふわっと出す演出は、次のように書けます。

```
import { animate } from "animejs";

// 追加したカードをふわっと表示する
animate(newCards, {
  opacity: [0, 1],
  scale: [0.5, 1],
  duration: 600,
  ease: "outQuart",
});
```

デモではこれをベースに、バネのイージング（`spring()`）や時間差（`stagger()`）も加えて、カードが弾みながら現れる演出にしています。

#### GSAP Flip版

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260611_grid-lanes/gsap-flip.html)
-   [コードを確認する](https://github.com/ics-creative/260611_grid-lanes/blob/main/gsap-flip.html)

**FLIP**（First・Last・Invert・Play）は「位置を測定 → DOMを更新 → 差分を補間」というアニメーション手法で、GSAPのFlipプラグインなら`Flip.from()`一発で書けます。FLIPの仕組み自体は『[JavaScriptで実現するFLIPアニメーションの原理と基礎](https://ics.media/entry/240902/)』で詳しく解説しています。

```
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

function reorder(container) {
  const state = Flip.getState(".card"); // 位置を記録
  // カード要素は作り直さず、同じ要素を新しい順序へ移動させる
  // （shuffled()は配列を混ぜて返す自前の関数とします）
  shuffled([...container.children]).forEach((el) => container.append(el));
  Flip.from(state, {
    // 記録位置 → 新位置へ補間
    duration: 0.6,
    ease: "power2.inOut",
    absolute: true,
  });
}
```

追加・並び替え・削除のどれも、要素の前後の位置を測って差分を補間するだけなので、`grid-lanes`が決めた配置をそのまま活かせます。

#### GSAP Flipの注意点

1つハマりやすいポイントがあります。Flipは`getState()`で記録した要素そのものを追跡するため、並び替えのたびにDOM要素を作り直すと補間が行われず、カードが瞬間移動してしまいます。筆者もデモの制作中にここで少し悩みました。要素は使い回して、`append()`で並び順だけを入れ替えるのがコツになります。

### 対応ブラウザ

CSSの`display: grid-lanes`は、Safari 26.4（2026年3月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/mdn-css_properties_display_grid-lanes)

### まとめ

これまでJavaScriptのライブラリに任せていたメイソンリーをCSSが引き受けてくれるようになりました。Safari 26.4が手元にあれば、まずはデモを触ってみてください。

こういう複雑なレイアウトがCSSのみで実現できるようになったことで選択肢の引き出しが増えますし、このレイアウトをベースにした表現の幅を考えることができたり、より使いやすいUIの構築に頭を回したりできるようになると思いますので素直にうれしいです。

スクロールのインタラクションやWebGPU/WebGLの表現と組み合わせてもおもしろいかもしれませんね。

Grid Layoutの基礎から知りたい方は『[CSSグリッド入門 - 図解でわかりやすく解説](https://ics.media/entry/15649/)』をご覧ください。要素の幅を基準にしたレスポンシブ対応は『[要素の幅でレスポンシブ対応を行える！ コンテナークエリーの使い方](https://ics.media/entry/240617/)』で紹介しています。