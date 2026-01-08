---
title: "Bootstrap 5入門 - タブUIの作り方"
source: "https://ics.media/entry/190826/"
publishedDate: "2019-08-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

X（旧Twitter）社製のCSSフレームワーク[Bootstrap](https://getbootstrap.com/)を用いると、レスポンシブでモバイルファーストなユーザーインターフェイス（UI）を素早く作成できます。本記事では、Bootstrapの入門編として、HTMLコーディングのみでタブを作る方法を紹介します。

※本記事は2024年4月現在のBootstrap 5.3で解説しています。

▼ Bootstrapを使ったタブの作例。上部のタブにより猫の写真が切り替わる

▼ 操作の様子を動画で確認する

完成系のコードは次の通りです。

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/190826_bootstrap/example.html)
-   [ソースコードを確認する](https://github.com/ics-creative/190826_bootstrap/blob/master/example.html)

本記事では初級者向けに、手軽にタブUIを作る方法に焦点をあてて説明します。また、中・上級者向けに、Bootstrapを使用することで向上できるウェブアクセシビリティーについて説明しています。

### Bootstrapの基本単位はコンポーネント

**Bootstrapの各要素の基本単位は「コンポーネント」** と呼ばれます。今回は[タブ用コンポーネント](https://getbootstrap.com/docs/5.3/components/navs-tabs/)を用います。

### Bootstrapを使うための準備

BootstrapによるUI構築のために、CSSを読み込みます。HTMLコードの`<head>`タグ内に次のコードを記述します。

▼ Bootstrap用CSSの読み込み

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <!-- Bootstrap用CSSの読み込み -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />

  <!-- 以降省略 -->
```

タブの切り替え、モーダルの表示などの「動き」の制御をするには、JavaScriptが必要です。BootstrapのJavaScriptも読み込みます。各JavaScriptを次のように読み込みましょう。

▼ Bootstrapに必要なJavaScriptの読み込み

```
<!-- 中略 -->
  <head>
  <!-- 中略 -->
    <!-- Bootstrap用JavaScriptの読み込み -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
  </head>
```

#### CDN経由以外でBootstrapを読み込む方法

CDN経由以外にもBootstrapを読み込む方法はあります。たとえばソースファイルで読み込む方法や、パッケージマネージャー（`npm`や`yarn`）を使う方法などです。プロジェクトの性質にあわせて読み込み方法を選択するとよいでしょう。詳しくは[公式ドキュメントのDownloadページ](https://getbootstrap.com/docs/5.3/getting-started/download/)を参照ください。

### タブ部分の実装

Bootstrapの使用準備が終わったので、タブの部分を実装しましょう。

▼ タブの部分

![タブの部分](https://ics.media/entry/190826/images/images/190826_bootstrap_tab_list.jpg)

タブを囲う親要素に`nav`クラスと`nav-tabs`クラスを設定します。

▼ タブの親要素のためのHTMLコード

```
<ul class="nav nav-tabs">
  <!-- ここに要素を追加していきます -->
</ul>
```

1つのタブは`nav-item`クラスで設定します。`<button>`タグと`nav-link`クラスを使ってタブの中のボタンを設定します。

▼ タブ1つのHTMLコード

```
<ul class="nav nav-tabs">
  <li class="nav-item">
    <button class="nav-link" type="button">
      タブ1
    </button>
  </li>
</ul>
```

4つのタブ用のHTMLコードを記述します。また、最初のタブを選択状態にするため1つ目のタブに`active`クラスを設定します。タブの全体コードは次のとおりになります。

▼ 4つのタブ用HTMLコード

```
<ul class="nav nav-tabs">
  <li class="nav-item">
    <button class="nav-link active" type="button">
      タブ1
    </button>
  </li>
  <li class="nav-item">
    <button class="nav-link" type="button">タブ2</button>
  </li>
  <li class="nav-item">
    <button class="nav-link" type="button">タブ3</button>
  </li>
  <li class="nav-item">
    <button class="nav-link" type="button">タブ4</button>
  </li>
</ul>
```

ここまでのコードの実行結果はスクリーンショットのとおりです。

▼ 4つのタブを作成した状態

![4つのタブを作成した状態](https://ics.media/entry/190826/images/images/190826_bootstrap_list_complete.jpg)

### 4枚の写真部分の実装

続いて、タブを押したときに切り替わる4枚の写真部分を実装しましょう。

▼ 4枚の写真部分

![写真部分](https://ics.media/entry/190826/images/images/190826_bootstrap_contents.jpg)

4枚の写真部分のHTML要素に`tab-content`クラスを設定します。`tab-content`というクラス名は、「タブで表示が切り替わるコンテンツ」というようなニュアンスです。

▼ 4枚の写真部分のHTML要素

```
<div class="tab-content">
</div>
```

今回は4つのタブがあり、それに応じて写真が4枚表示されます。各写真要素に`tab-pane`クラスを設定することで、表示の切り替わる要素として機能させます。具体的には次のようにHTMLコードを記述します。

▼ 4つの写真のうちの1つの写真

```
<div class="tab-pane">
  <img src="images/photo1.jpg" class="img-fluid" alt="写真：猫が寝そべりながらカメラを見つめている" />
</div>
```

※ [`img-fluid`クラス](https://getbootstrap.com/docs/5.3/content/images/)は必須でないですが、画像のレスポンシブ対応ができる便利なクラスなので覚えておくとよいでしょう

写真を4枚表示するためにHTMLコードを記述します。注意点として、`tab-content`で指定される要素はデフォルトで非表示になっています。1枚目の写真は最初から表示させたいので、`active`クラスを設定します。次のコードを参照ください。

▼ 4つの写真部分HTMLコード

```
<div class="tab-content">
  <div class="tab-pane active" id="photo1-pane">
    <img src="images/photo1.jpg" class="img-fluid" alt="写真：猫が寝そべりながらカメラを見つめている" />
  </div>
  <div class="tab-pane" id="photo2-pane">
    <img src="images/photo2.jpg" class="img-fluid" alt="写真：猫がソファの隅で寝ている" />
  </div>
  <div class="tab-pane" id="photo3-pane">
    <img src="images/photo3.jpg" class="img-fluid" alt="写真：カメラの方向を向く猫の顔" />
  </div>
  <div class="tab-pane" id="photo4-pane">
    <img src="images/photo4.jpg" class="img-fluid" alt="写真：カゴに入っている猫" />
  </div>
</div>
```

ここまでのコードの実行結果は、次のスクリーンショットのようになります。

▼ ここまでのコードの実行結果

![ここまでのコードの実行結果](https://ics.media/entry/190826/images/images/190826_bootstrap_contents_complete.jpg)

### 要素の周りに余白を設ける

ここまでのコードの実行結果を見ると、要素が画面左上に寄ってしまっています。要素の周りに適切な余白を設けましょう。Bootstrapではクラス1つで余白が設定できます（参考「[Spacing · Bootstrap](https://getbootstrap.com/docs/5.3/utilities/spacing/)」）。今回は上下左右に規定の余白を設定する`p-3`クラスを用います。

```
<main class="p-3">
  <ul class="nav nav-tabs">
    <!-- 中略 -->
  </ul>

  <!--写真部分-->
  <div class="tab-content">
    <!-- 中略 -->
  </div>
</main>
```

余白が設定された状態のスクリーンショットは次のとおりです。

▼ 要素の余白が設定された

![要素の余白が設定された](https://ics.media/entry/190826/images/images/190826_bootstrap_space.jpg)

### タブ切り替え機能の実装

さて、見た目は実装できましたが、タブを押しても何の反応もありません。「タブを押した時に、対応した写真を表示する」という処理を実装していないためです。本来ならJavaScriptコードを書いて実装するところですが、**BootstrapではHTMLの属性の設定だけで切り替え機能を実装できます**。

まずはタブ側の設定です。それぞれのボタンに`data-bs-target`属性を使って「どのIDのコンテンツを表示するか」という設定をします。そして、**タブ切り替え機能を有効にするため`data-bs-toggle="tab"`を指定**します。

▼ タブの切り替えのためのコード

```
<ul class="nav nav-tabs">
  <li class="nav-item">
    <button class="nav-link active"  data-bs-toggle="tab" data-bs-target="#photo1" type="button">
      タブ1
    </button>
  </li>
  <!--(省略)-->
```

続いて写真側の設定を行います。`id`属性を使って各写真に固有のIDを設定し、タブを押した時に切り替える仕組みを作ります。タブと写真を紐づけるため、`id`属性はそれぞれ`button`タグに指定した`data-bs-target`属性の値と一致させましょう。

▼ 写真のためのコード

```
<div class="tab-content">
  <div id="photo1" class="tab-pane active">
    <!--(省略)-->
  </div>
</div>
```

各設定を、タブ・写真4つそれぞれに設定することで、切り替え機能は完成します。

実行結果は次のとおりです。

▼ タブの切り替えが有効化された

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/190826_bootstrap/example.html)
-   [ソースコードを確認する](https://github.com/ics-creative/190826_bootstrap/blob/master/example.html)

### 完成コード

本記事で作成したコードを確認しましょう。CSS・JavaScriptのコードを記述することなく、タブ機能が実装できました。一部抜粋しているので、完全版はGitHubのコードをご覧ください。

▼ 全体コード

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Bootstrap タブUIのデモ（シンプル版）</title>
    <!-- Bootstrap用CSSの読み込み -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <!-- Bootstrap用JavaScriptの読み込み -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <main class="p-3">
      <!-- 4個分のタブUI -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button class="nav-link active"  data-bs-toggle="tab" data-bs-target="#photo1" type="button">
            タブ1
          </button>
        </li>
        <!-- 中略 -->
      </ul>

      <!-- 写真部分 -->
      <div class="tab-content">
        <div id="photo1" class="tab-pane active">
          <img src="images/photo1.jpg" class="img-fluid" alt="写真：猫が寝そべりながらカメラを見つめている" />
        </div>
        <!-- 中略 -->
      </div>
    </main>
  </body>
</html>
```

-   [ソースコード全体を確認する](https://github.com/ics-creative/190826_bootstrap/blob/master/example.html)

### ウェブアクセシビリティーの対応について

ここで、完成したHTMLと実際に出力されたHTMLを比較してみましょう。実際に出力されたHTMLはブラウザの開発者ツールから確認できます。

すると以下のように、`role`属性や`aria-selected`属性が追加された状態でHTMLが出力されていることがわかります。

▼ここまでで完成したHTML

```
<main class="p-3">
  <!-- 4個分のタブUI -->
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <button 
        class="nav-link active" 
        data-bs-toggle="tab" 
        data-bs-target="#photo1" 
        type="button"
      >
        タブ1
      </button>
    </li>
    <!-- 中略 -->
  </ul>

  <!-- 写真部分 -->
  <div class="tab-content">
    <div id="photo1" class="tab-pane active">
      <img
        src="images/photo1.jpg"
        class="img-fluid"
        alt="写真：猫が寝そべりながらカメラを見つめている"
      />
    </div>
    <!-- 中略 -->
  </div>
</main>
```

▼実際に出力されたHTML（`role`属性や`aria-selected`属性が追加されている）

```
<main class="p-3">
  <!-- 4個分のタブUI -->
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        data-bs-toggle="tab"
        data-bs-target="#photo1"
        type="button"
        aria-selected="false"
        role="tab"
        tabindex="-1"
      >
        タブ1
      </button>
    </li>
    <!-- 中略 -->
  </ul>

  <!-- 写真部分 -->
  <div class="tab-content">
    <div id="photo1" class="tab-pane" role="tabpanel">
      <img
        src="images/photo1.jpg"
        class="img-fluid"
        alt="写真：猫が寝そべりながらカメラを見つめている"
      />
    </div>
    <!-- 中略 -->
  </div>
</main>
```

追加されているこれらの属性は、タブUIのアクセシビリティーを向上させるためにBootstrap側で自動的につけられています。つまり、Bootstrapの基本的なタブの記述方法に沿って作成すれば、アクセシビリティーを高められます。

続いて、具体的にどのような点でアクセシビリティーが向上するのか説明します。

`role`属性や`aria-selected`属性を適切に指定することで、スクリーンリーダーでの音声読み上げの精度が向上します。

次の図版は、アクセシビリティー対応をしなかった場合と、対応した場合の比較です。右側のほうが、スクリーンリーダーで読み上げられている情報が多くなっています。音声情報の手がかりが増えるので、視覚障害者にとってウェブページを操作しやすくなります。

本記事のようにBootstrapを使用して作成したタブUIでは、右側のように読み上げられます。

![図版：アクセシビリティー対応の有り無しの比較](https://ics.media/entry/190826/images/images/220420_bootstrap_tabui.png)

今回Bootstrap側で自動的に追加された属性については、要所として以下にまとめました。

-   タブUIの親には`role="tablist"`属性
-   タブUIの子には`role="tab"`属性
-   タブUIの子には`aria-selected="true"`属性
    -   タブのどれが選択された状態であるかを示すことができる
-   タブパネル側には`role="tabpanel"`属性
-   タブパネルには`aria-labelledby`属性
    -   タブUIとの紐付けを行う

### まとめ

本記事ではBootstrapの入門編として、HTMLコードのみでタブUIを実装しました。タブUIはウェブページ内の情報を整理するのに活用できるUIです。Bootstrapを利用してウェブページの情報整理に役立てましょう。

### 関連記事の紹介

実際の案件でタブ機能を使用する場合は、デザインのカスタマイズが必要になります。関連記事『[webpack入門 - Bootstrapをバンドルする方法](https://ics.media/entry/17749/)』では、webpackやSassなどのフロントエンド技術と連携してBootstrapのデザインをカスタマイズする方法を紹介します。あわせて参照くださいませ。

また、ReactやVue、Angular等のJavaScriptライブラリでのタブUIの解説記事もあります。こちらはBootstrapを利用していませんが、`aria-selected`属性等の指定が手軽になるという観点で説明しています。JavaScriptを得意とするフロントエンドエンジニアは以下の記事を参考ください。

-   [WAI-ARIA対応のタブ型UIの作り方（基本編）](https://ics.media/entry/17107/)
-   [WAI-ARIA対応のタブ型UIの作り方（React編）](https://ics.media/entry/17109/)
-   [WAI-ARIA対応のタブ型UIの作り方（Vue.js編）](https://ics.media/entry/17110/)
-   [WAI-ARIA対応のタブ型UIの作り方（Angular編）](https://ics.media/entry/17108/)