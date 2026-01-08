---
title: "今どきのJavaScriptで使われているインデント規約まとめ"
source: "https://ics.media/entry/10234/"
publishedDate: "2015-12-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

みなさんは普段JavaScriptを使って開発する場合、**インデントはどのようにしていますか？** タブ、スペース2個、スペース4個・・・などいくつかの選択肢があります。

個人で開発している方は問題ありませんが、チームで開発している場合は**意見が分かれ議論になることもあるでしょう**。プロジェクト開始早々インデント論争でチーム内の雰囲気を悪くしたくはありません。

本記事はそんなインデント論争の1つの解決策となるべく、**ブラウザベンダーやプロダクトで定めているJavaScriptコーディングのインデントルールを調べてみました**。

**この記事のポイント**\*

-   海外のJS界隈ではスペース2個のインデントが多数派
-   ESLINTなどの設定ファイルからコーディングルールを調べられる

### なぜインデント論争が起こるのか？

そもそもなぜインデント論争が起こってしまうのでしょうか？　それは**それぞれ一長一短のため好みが分かれてしまうから**です。ここではインデントの種類毎のメリット・デメリットをご紹介します。

#### タブ

![](https://ics.media/entry/10234/images/1512_js_indent_tab.png)

メリット

-   開発者が自分好みにインデント幅が変えられる
-   インデント移動時のキータイプが少ない
-   アクセシビリティー上の観点で望ましい

デメリット

-   位置揃えとして使用すると環境によって崩れる

記事『[インデントにタブを使うアクセシビリティ上の利点](https://sosukesuzuki.dev/posts/tabs-for-a11y/)』で紹介されているように、「視覚に障害がある人たちにとって重要」とし、タブのインデントにはアクセシビリティー上のメリットがあると紹介されています。

#### スペース

![](https://ics.media/entry/10234/images/1512_js_indent_space.png)

メリット

-   環境に左右されず同じ見た目でソースが表示される

デメリット

-   同じスペース派内でもスペースの数で派閥が生まれる
-   インデント移動時のキータイプが多い

#### スペース派内の派閥

スペースのデメリットに挙げたように同じスペース派の中でもスペースをいくつ使うかで派閥が生じます。主に2個派、4個派、8個派のいずれかです。**スペースが少ない場合は冗長にならずコードの折り返しが起こりにくく、スペースが多い場合は入れ子構造が把握しやすく可読性が高い**といったそれぞれの長所があります。

### JSコーディング規約のインデントルールを調べてみた

それでは世の中でどういった形のインデントが使用されているのか見ていくことにしましょう。

#### 企業や組織のJSコーディング規約内のインデントルール

まずは大手のベンダーを中心に、公開されているコーディング規約からインデントルールを抜粋し次の表にまとめました。

組織名

インデントルール

コーディング規約ページ

[Google](https://www.google.com/intl/ja/about/)

スペース2個

[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#formatting-block-indentation)

[WebKit](https://www.webkit.org/)

スペース4個

[WebKit Coding Style Guidelines](https://www.webkit.org/code-style-guidelines/)

[TypeScript](https://www.typescriptlang.org/)

スペース4個

[.editorconfig](https://github.com/microsoft/TypeScript/blob/main/.editorconfig#LL10C9-L10C9)

#### JSライブラリ/JSフレームワークのインデントルール

続いてJavaScriptのライブラリやフレームワークで採用されているインデントルールを次の表にまとめました。尚、インデントルールは[ESLint](http://ehttps//eslint.org/)などの構文チェックツールの設定ファイルから抜粋しています。

プロダクト名

インデントルール

設定ファイル

[Node.js](https://nodejs.org/en/)

スペース2個

[.eslintrc.js](https://github.com/nodejs/node/blob/main/.eslintrc.js#L149-L157)

[React](https://reactjs.org/)

スペース2個

[.editorconfig](https://github.com/facebook/react/blob/main/.editorconfig#L7)

[Vue.js](https://ja.vuejs.org/)

スペース2個

[.editorconfig](https://github.com/vuejs/vue/blob/dev/.editorconfig#L8)

[Angular](https://angular.io/)

スペース2個

[.editorconfig](https://github.com/angular/angular/blob/main/.editorconfig#L8)

[SVELTE](https://svelte.dev/)

スペース2個

[.editorconfig](https://github.com/sveltejs/svelte/blob/master/.editorconfig#L7)

[lodash](https://lodash.com/)

スペース2個

[.editorconfig](https://github.com/lodash/lodash/blob/master/.editorconfig#L9)

[gulp](https://gulpjs.com/)

スペース2個

[.editorconfig](https://github.com/gulpjs/gulp/blob/master/.editorconfig#L6)

[Three.js](https://threejs.org/)

タブ

[.editorconfig](https://github.com/mrdoob/three.js/blob/dev/.editorconfig#L11)

[Pixi.js](https://pixijs.com/)

スペース2個

[.editorconfig](https://github.com/pixijs/pixijs/blob/dev/.editorconfig#L14)

[Moment.js](https://momentjs.com/)

スペース4個

[.editorconfig](https://github.com/moment/moment/blob/develop/.editorconfig#L11)

[jQuery](https://jquery.com/)

スペース2個

[.editorconfig](https://github.com/jquery/jquery/blob/main/.editorconfig#L15)

※ `.eslintrc`は構文チェックの設定ファイルです。  
※ `.editorconfig`は[EditorConfig](https://editorconfig.org/)という開発者間でエディターの設定を共有できるツールの設定ファイルです。  
※執筆当時（2015年12月）はjQueryはタブ、Pixi.jsはスペース4個でしたが、現在（2023年3月現在）はスペース2個になっています

調査によると**インデントはスペース2個**と定めている場合が多いようですね。

### 国内のインデント事情はタブが多数

インデント数について弊社[池田](https://x.com/clockmaker)がTwitterでアンケートを実施。JavaScriptだと、41%が「タブ」、47%が「スペース2つ」、11%が「スペース4つ」という結果になりました。

HTMLだと、46%が「タブ」、44%が「スペース2つ」、11%が「スペース4つ」という結果になりました。

アンケートについて、詳しくは記事「[HTMLコーダーへのアンケート結果(コードの書き方)](https://ics.media/entry/13597/)」で紹介してますので、あわせて参考ください。本記事はJavaScript界隈のインデントルールをほんの一部まとめたものに過ぎませんが、みなさんのプロジェクトの規約作成の際に参考にしていただけたら幸いです。