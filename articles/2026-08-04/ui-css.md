---
title: "メニューUIの誤操作を減らせ！ CSSで作るヒットエリア「セーフ・トライアングル」"
source: "https://ics.media/entry/260803/"
publishedDate: "2026-08-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

ウェブサイトのメニューUIには、「**セーフ・トライアングル**」と呼ばれる手法があります。フロントエンドエンジニアがメニューを実装するときに意識すれば、階層メニューの**マウス操作でのユーザビリティーを高められます**。

ウェブでのメニューUIでは、目的のサブメニューへ斜めに進むと、途中の別項目に反応してサブメニューが切り替わることが多々あります。ユーザーが誤反応を避けるには、**いったん右へ進んでから垂直に動かすしかありません**。

![](https://ics.media/entry/260803/images/images/260803_safe_triangle_problem.png)

▲対策していない階層メニュー。左側の例では、斜め移動で途中の項目が反応。誤反応を避けるには、右側の例のように、格子上の道のり（マンハッタン距離）で動かすしかない。

### セーフ・トライアングルとは

この問題を実装で解決するには、マウスポインターと、サブメニューの左上・左下を結んで三角形を作ります。ヒットエリアを拡張することで、斜め方向にマウスを動かしても、誤反応を避けられます。

![](https://ics.media/entry/260803/images/images/260803_safe_triangle_area.png)

▲セーフ・トライアングルによって、①で別のメニュー項目が誤反応しない

この手法は「セーフ・トライアングル」のほか、「セーフ・エリア」「セーフ・ポリゴン」「menu-aim」「Prediction cone」などとさまざまな名称で呼ばれています。

### CSSのclip-pathで三角形を作る

CSSの`clip-path: polygon()`とCSS変数を組み合わせると、セーフ・トライアングルをシンプルに実装できます。次のデモで、マウスを斜め方向に動かして試してみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/01_basic.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/01_basic.html)

デモ上の`Enable`でセーフ・トライアングルの有効・無効を、`Show`で表示・非表示を切り替えられます。

※モバイルではセーフ・トライアングルは無効にしています（理由は後述）。デモはデスクトップでご覧ください。

デモでは、サブメニューの配置に[CSSアンカーポジショニング](https://ics.media/entry/251215/)を使っています。ある要素を基準に別の要素を配置できる仕組みで、階層メニューの配置に便利です。

#### clip-path: polygon()で三角形を指定

疑似要素は`position: fixed`で配置します。長方形の位置と大きさはCSS変数で受け取り、`clip-path`で三角形に切り抜きます。

```
.action-item {
  /* ポインターとサブメニューの上下端を結ぶ三角形。 */
  &::before {
    content: "";
    position: fixed;
    /* トリガーやサブメニューより背面に重ねる。 */
    z-index: 2;
    top: var(--safe-top);
    left: var(--safe-left);
    width: var(--safe-width);
    height: var(--safe-height);
    /* ホバー中だけ有効にするため、初期状態では非表示。 */
    display: none;
    clip-path: polygon(
      0 var(--safe-y), /* ① */
      100% 0,  /* ② */
      100% 100% /* ③ */
    );
  }
}
```

![](https://ics.media/entry/260803/images/images/260803_safe_triangle_layers.png)

▲三角形の疑似要素

`::before`疑似要素は長方形ですが、`clip-path`によって切り抜かれた三角形の内側だけがマウスに反応します（[W3Cの仕様](https://www.w3.org/TR/css-masking-1/#clipping-paths)）。

#### マウスの位置をCSS変数へ

JavaScriptでは`mousemove`イベントのたびに、疑似要素を囲む長方形の位置・幅・高さと、マウス側の頂点をCSS変数へ渡します。

![](https://ics.media/entry/260803/images/images/260803_safe_triangle_coordinates.png)

▲始点はトリガー上のマウス付近。終点はサブメニュー左上と左下

```
trigger.addEventListener("mousemove", (event) => {
  // 配置済みのサブメニューの矩形から三角形を計算する。
  // （省略）

  // 始点を少し重ね、ポインターが三角形の境界から抜けるのを防ぐ。
  item.style.setProperty("--safe-top", `${menuRect.top}px`);
  item.style.setProperty("--safe-left", `${safeLeft}px`);
  item.style.setProperty("--safe-width", `${Math.max(menuRect.left - safeLeft, 0)}px`);
  item.style.setProperty("--safe-height", `${menuRect.height}px`);
  item.style.setProperty("--safe-y", `${safeY}px`);
});
```

#### マウスデバイスだけで有効にする

セーフ・トライアングルはホバー操作にだけ役立ちます。モバイル環境では三角形を配置しないように、CSSのメディアクエリー内で制御します。

```
.action-item {
  @media (hover: hover) and (pointer: fine) {
    &:hover::before {
      /* 透明な三角形のヒットエリアを有効にする。 */
      display: block;
    }
  }
}
```

それぞれの意味は次の通りです。

-   `(hover: hover)`
    -   主な入力機器でホバー操作ができる
-   `(pointer: fine)`
    -   主な入力機器が、細かい位置を指せるポインターである

### コラム：Popover APIとinterestforを使う

ここまでは`:hover`をCSSで監視し、サブメニューの表示を切り替えました。2026年現在のHTMLとCSSを使えば、もう少しシンプルに実装できそうです。

クリックから開く処理は`popovertarget`属性、ホバーから開く処理は`interestfor`属性で代用できます。両方の属性から同じ`popover="hint"`要素を参照すれば、サブメニューを開閉できます。

次のデモをご覧ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/11_popover.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/11_popover.html)

```
<!-- クリック／タップとホバー／フォーカスから同じidを参照する -->
<button
  popovertarget="share-submenu"
  interestfor="share-submenu"
>Share</button>
<ul id="share-submenu" popover="hint">
  <!-- サブメニュー項目 -->
</ul>
```

`interestfor`属性の詳細は記事『[HTMLのcommandとinterestfor属性を使って、JSを減らすスマートなUI開発](https://ics.media/entry/260209/)』も参照してください。

### 作例

#### メガメニュー

左側にカテゴリーがあり、右側に一覧があるようなUIにもセーフ・トライアングルが利用できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/03_mega_menu.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/03_mega_menu.html)

#### 下側へ開く場合

下方向に配置することも可能です。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/04_down.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/04_down.html)

### ライブラリだと実装が楽に

自前で実装するのが手間だと思った方も多いでしょう。便利なことに、**UIライブラリのなかには、セーフ・トライアングルに対応しているものがあります**。

#### React Aria

Adobeが開発する[React Aria](https://react-aria.adobe.com/)は、アクセシブルなUIを組み立てるためのヘッドレスUIライブラリです。ヘッドレスUIのライブラリとしては一番成功を収めているのではないでしょうか（Adobeが開発するウェブのライブラリとしては珍しく成功したもののひとつでしょう）。これもセーフ・トライアングルに似た仕組みが提供されています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/21_react_aria.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/src/react-aria.tsx)

▼実装コード（抜粋）

```
<SubmenuTrigger delay={0}>
  {/* 第1子が親項目、第2子がサブメニューになる。 */}
  <MenuItem id="share">Share</MenuItem>
  <Popover>
    <Menu>
      <MenuItem id="email">Email</MenuItem>
      <MenuItem id="sms">SMS</MenuItem>
    </Menu>
  </Popover>
</SubmenuTrigger>
```

React Ariaでは、DOMで三角形を作らないのが特徴です。JavaScriptでポインターの移動方向とタイムアウトを判定し、サブメニューへ向かっている間は親項目を開いたままにします。

-   [Menu - React Aria](https://react-aria.adobe.com/Menu)
-   [Creating a pointer-friendly submenu experience - React Aria](https://react-aria.adobe.com/blog/creating-a-pointer-friendly-submenu-experience)

本記事では疑似要素で透明なヒットエリアを設ける手法を紹介しましたが、それでも誤判定があるため、JavaScriptでより高い精度を求める方法が検討されたようです。

つまり、セーフ・トライアングルの実装方法はひとつではなく、**さまざまな検討がなされている奥深い手法**というわけです。

#### Floating UI

ライブラリ「[Floating UI](https://floating-ui.com/)」のReact向けパッケージには、`safePolygon()`関数と`useHover()`関数が用意されています。関数名のとおり、ホバー時にセーフ・トライアングル（このライブラリではセーフ・ポリゴンという名前）としての動的な多角形を使ってくれます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260731_ui_menu_safe_triangle/22_floating_ui.html)
-   [コードを確認する](https://github.com/ics-creative/260731_ui_menu_safe_triangle/blob/main/src/floating-ui.tsx)

▼実装コード（抜粋）

```
// contextはuseFloating()から受け取る。
const hover = useHover(context, {
  mouseOnly: true,
  // 移動経路の背後にある別項目のhoverも防ぐ。
  handleClose: safePolygon({ blockPointerEvents: true }),
});
const { getReferenceProps, getFloatingProps } =
  useInteractions([hover]);
```

`safePolygon()`はポインターの移動方向も考慮し、必要なときだけ多角形を作ります。

-   [safePolygon - Floating UI](https://floating-ui.com/docs/usehover#safepolygon)

他にも[MUI](https://mui.com/)や[shadcn/ui](https://ui.shadcn.com/)なども、セーフ・トライアングルの対応がなされています（内部で組み込まれているサブメニューを扱うライブラリが対応しているため）。

### セーフ・トライアングルは昔からある手法

セーフ・トライアングルの考え方は古く、1980年代半ばのMacの階層メニューに採用されていました。当時のMacのインターフェイス設計を振り返った記事に、「a buffer zone shaped like a <」といった記載があります。

-   [A Quiz Designed to Give You Fitts - AskTog](https://www.asktog.com/columns/022DesignedToGiveFitts.html)（1999年）

ウェブでは2013年にAmazonのメガメニューを分析した記事が話題を呼びました。階層メニューにおける誤反応の対策のひとつが遅延表示だったのにたいして、セーフ・トライアングルを使えば即座に反応できるため、即応性が良いと説明されています。同時に公開されたjQueryプラグイン「[jQuery-menu-aim](https://github.com/kamens/jQuery-menu-aim)」も注目を集めました。

-   [Breaking down Amazon’s mega dropdown](https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown)（2013年）

### まとめ

HTMLとCSSで実装すると、**矩形でレイアウトを考えがち**です。斜め方向にヒットエリアを確保するのは、思い至らないことが多いことでしょう。モバイルファーストと言われて久しいですが、タブレット端末もマウス操作できるなど、マウス操作は依然として役立つ場面が多いです。

小さな改善かもしれませんが、**ユーザーの使いやすさのために**、ウェブでもセーフ・トライアングルはぜひ検討してみてください！