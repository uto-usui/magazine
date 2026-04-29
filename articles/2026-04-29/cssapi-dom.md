---
title: "CSSカスタムハイライトAPI - DOM操作なしでテキストをハイライト"
source: "https://ics.media/entry/260427/"
publishedDate: "2026-04-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

ウェブサイトやウェブアプリで特定の文字や文章をハイライトしたいとき、今までは`<span>`タグなどで囲んでCSSのスタイルを当てるのが一般的でした。

この方法では、文章の構造には関係のないタグが必要になり、HTMLの階層構造が深くなりがちです。また、動的にハイライトする場合はJavaScriptでDOMを書きかえてタグを挿入する必要があり、構造と見た目の分離が難しいという課題がありました。

**CSSカスタムハイライトAPI**は、DOMを書きかえずにテキストの一部をハイライトできるブラウザAPIです。この記事では使い方の解説と、APIを活用したデモを紹介します。

### 基本的な使い方

まずは基本の使い方をおさえておきましょう。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260427_css_custom_highlight/01_basic/)
-   [コードを確認する](https://github.com/ics-creative/260427_css_custom_highlight/blob/main/docs/01_basic/index.html)

#### 1\. JavaScriptで`Range`オブジェクトを作成する

ハイライトしたいDOMを取得します。`Range`オブジェクトを作成し、`setStart()`メソッドと`setEnd()`メソッドでハイライトの範囲を指定します。

```
<p class="description">CSS Custom Highlight API is for highlighting texts!</p>
```

```
const description = document.querySelector(".description");
const range = new Range();
// firstChildを渡すことで、descriptionの中のテキストノード（文字列）の範囲を登録する
range.setStart(description.firstChild, 0);
range.setEnd(description.firstChild, 24);
```

**ポイントは`setStart()`と`setEnd()`メソッドの第1引数に`firstChild`（テキストノード）を渡していることです。**

`setStart()`と`setEnd()`メソッドの第1引数にテキストノードを渡した場合、第2引数には文字のオフセット（位置）を指定します。上記の例では0文字目から24文字目までの範囲を設定しています。

もし`description`オブジェクトをそのまま渡した場合、第2引数は子要素のインデックスと解釈されます。`description`には子ノードは1つ（テキストノード）しかないため、インデックスが範囲外になるためエラーになります。

```
// ❌これはNG。IndexSizeErrorになります。
range.setStart(description, 0);
range.setEnd(description, 24);
```

#### 2\. `Highlight`オブジェクトを作成して登録する

`Highlight`オブジェクトを作成します。引数にはハイライトしたい範囲を渡します。

作成したオブジェクトを、CSSインターフェイスの`highlights`に登録します。引数の1つ目には、CSSで使用するキーワードを設定します。ここでは`"basic-highlight"`としておきます。

```
// Highlightオブジェクトを作成
const basicHighlight = new Highlight(range);
// 第1引数にはCSSで使用するキーワードを設定する
CSS.highlights.set("basic-highlight", basicHighlight);
```

#### 3\. スタイルを設定

CSSでは`::highlight()`疑似要素を利用してスタイルをあてます。先ほどのキーワード`"basic-highlight"`はここで使用します。

```
/* JSで登録したキーワード"basic-highlight"を()内に指定する */
::highlight(basic-highlight) {
  background: yellow;
}
```

これで完了です。ブラウザを確認すると、「CSS Custom Highlight API」の部分が黄色くハイライトされています。

### CSSカスタムハイライトAPIのメリット

基本的な使い方がわかったところで、改めてメリットを整理しましょう。

#### マークアップしなくてもハイライトできる

冒頭でもお伝えした通り、`<span>`タグなどを使わずにスタイルを設定できるのが一番のメリットです。

-   ユーザーの操作に連動して動的にハイライトする
-   サーバーから取得した文字列をそのまま表示しつつ、レンダリング後に任意の文字をハイライトする

といったことが可能になります。

#### 複数のハイライトを同時に表示できる

基本の使い方で、`CSS.highlights.set()`メソッドに任意のキーワードを設定しました。キーワードによって色を変えたり、下線をつけたり、文字色を変えたりなど柔軟なスタイルを複数設定できます。

```
::highlight(highlight) {
  background: yellow;
}
::highlight(underline) {
  text-decoration: underline;
  color: red;
}
```

### デモの紹介

ここからはCSSカスタムハイライトAPIを活用したデモを紹介します。

#### デモ① 検索語のハイライト

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260427_css_custom_highlight/02_search/)
-   [コードを確認する](https://github.com/ics-creative/260427_css_custom_highlight/blob/main/docs/02_search/main.js#L16)

画面上部の入力欄と一致する部分をリアルタイムにハイライトしたデモです。以下のステップで実装しています。

1.  読み込み時にテキストノードを取得
2.  入力欄の`input`イベントにハイライトする関数を登録
3.  検索語に一致する範囲を作成
4.  ハイライトする

```
// ①読み込み時にテキストノードを取得しておく
const textNodes = [];
const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
let currentNode = walker.nextNode();
while (currentNode !== null) {
  textNodes.push(currentNode);
  currentNode = walker.nextNode();
}

/**
 * ハイライトを更新する
 */
const updateHighlight = () => {
  const keyword = searchInput.value;

  // 省略

  const ranges = [];
  const regex = new RegExp(RegExp.escape(keyword), "gi");
  // テキストノードをループ
  for (const textNode of textNodes) {
    for (const match of textNode.textContent.matchAll(regex)) {
      //③ キーワードに一致する範囲を作成
      const range = new Range();
      range.setStart(textNode, match.index);
      range.setEnd(textNode, match.index + match[0].length);
      ranges.push(range);
    }
  }

  // ④キーワードに一致する部分をハイライト
  CSS.highlights.set("search", new Highlight(...ranges));
}

// ②inputイベントにハイライトする関数を登録
searchInput.addEventListener("input", updateHighlight);
```

#### デモ② 入力を即座に校正する

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260427_css_custom_highlight/03_correction/)
-   [コードを確認する](https://github.com/ics-creative/260427_css_custom_highlight/blob/main/docs/03_correction/main.js#L16)

ユーザーが入力した文章に対して、校正ルール違反をハイライトするデモです。入力エリアを変更すると、画面下部のプレビューエリアに違反した箇所がハイライトされます。

やっていることはデモ①とほぼ同じです。

1.  入力欄の`input`イベントに関数を登録
2.  ルールに一致する範囲を作成
3.  ハイライトする

```
/**
 * プレビューを更新する
 */
const render = () => {

  // 省略

  const ranges = [];
  for (const rule of rules) {
    for (const matchResult of targetText.matchAll(rule.pattern)) {
      const matchedText = matchResult[0];
      if (matchedText.length === 0) continue;
      // ②ルールに一致した範囲を作成
      const range = new Range();
      range.setStart(previewTextNode, matchResult.index);
      range.setEnd(previewTextNode, matchResult.index + matchedText.length);
      ranges.push(range);
    }
  }

  // 省略

  // ③ルールに一致した部分をハイライト
  CSS.highlights.set("correction", new Highlight(...ranges));
}

// ①入力イベントを監視してプレビューを更新
editor.addEventListener("input", render);
```

#### デモ③ AIを使ったSNS投稿の感情ヒートマップハイライト

-   [サンプルを別ウインドウで開く](https://260427-css-custom-highlight-04-heat-rust.vercel.app/)
-   [コードを確認する](https://github.com/ics-creative/260427_css_custom_highlight/blob/main/04_heatmap/src/logics/highlightText.ts#L75)

架空の映画のレビュー内容に対し、AIが感情（ネガティブ/ポジティブ）を判断し、その部分をハイライトします。

AI部分はMastraというライブラリを使用しています。この記事では詳しく解説しませんが、興味のある方は『[Mastra入門 - TypeScriptで作るAIエージェント](https://ics.media/entry/260312/)』をぜひ読んでみてください。

AIを使っているとはいえ、処理はデモ①、デモ②と同じです。ハイライトする範囲を設定し、ネガティブ度/ポジティブ度によって該当する色でハイライトします。

### コラム: Range.setStart()とsetEnd()にリストを渡すとどうなる？

デモでは`querySelector`などで取得したDOMの`firstChild`（テキストノード）を`setStart()`と`setEnd()`メソッドに渡しました。これらのメソッドには`Node`を渡せるので、以下のように`<ul>`要素をそのまま渡すこともできます。この場合ハイライトはどうなるでしょうか？

```
<ul class="list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>
```

```
const list = document.querySelector(".list");
const listRange = new Range();
// listをそのまま渡して0から2を設定すると…？
listRange.setStart(list, 0);
listRange.setEnd(list, 2);
```

上記の例の`list`は次のような構造になっています。`<ul>`要素をそのまま渡した場合、**0番目から2番目までのノードの範囲が登録されるので「Apple」がハイライトされます。**

-   index0: 改行+スペース（`ul`と`li`タグの間）
-   index1: `<li>`要素ノード（`<li>Apple</li>`）
-   index2: 改行+スペース（`li`と`li`タグの間）
-   index3: `<li>`要素ノード（`<li>Banana</li>`）
-   index4: 改行+スペース（`li`と`li`タグの間）
-   index5: `<li>`要素ノード（`<li>Cherry</li>`）
-   index6: 改行（`li`と`ul`タグの間）

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260427_css_custom_highlight/05_list/)
-   [コードを確認する](https://github.com/ics-creative/260427_css_custom_highlight/blob/main/docs/05_list/index.html#L36)

**注意したいのは、改行とスペースが1ノードとしてカウントされていることです。DOM構造としては同じでも、以下のように改行やスペースがなくなった場合はハイライトの範囲が変わってしまいます。**

```
<ul class="list"><li>Apple</li><li>Banana</li><li>Cherry</li></ul>
```

実際、`<ul>`要素と`<li>`要素の間のスペースや改行を削除したパターンでは「Apple」と「Banana」がハイライトされています。

ViteなどのビルドツールでビルドしたHTMLファイルは、ミニファイされ改行やスペースがなくなる場合があります。このように**テキストノードではないものを`Range`に設定すると意図しない結果になる可能性があります。**

とはいえ、実際の活用シーンではテキストノードを使うことがほとんどだと思うので、この挙動の違いはあまり問題にならないはずです。

### 対応ブラウザ

CSSカスタムハイライトAPIは、Chrome・Edge 105（2022年8月）、Safari 17.2（2023年12月）、Firefox 149（2026年3月）以上で利用可能です。

参照：[Can I use…](https://caniuse.com/wf-highlight)

### まとめ

CSSカスタムハイライトAPIを紹介しました。シンプルですがさまざまな用途と組み合わせることができ、使い勝手が良いAPIだと思います。ぜひ試してみてください！