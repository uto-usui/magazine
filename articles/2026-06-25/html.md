---
title: "HTMLのセマンティクスを意識して、壊れにくいテストコードを書こう"
source: "https://ics.media/entry/260624/"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

AIがアプリケーションコードもテストコードも書く時代、UIを操作するE2Eテストは「通るか」だけでなく、「何を操作しているかが読み取れるか」という視点も重要です。

AIが生成したUIのテストコードは一見それらしく動いても、順番や見た目のテキストに依存していて、あとから読むと意図がわからないことがあります。

```
// 0番目の「削除する」をクリックする
await page.getByText('削除する').nth(0).click();
```

たとえば、上のテストコードは、`nth(0)`で0番目の「削除する」を順番で決め打ちしています。今は通っていても、ボタンが増えたり順番が変わったりすると意図しない要素を操作する可能性があります。

本記事では、Playwrightで要素を取得する方法（ロケーター）を、「順番」や「文字列だけ」ではなく、ユーザーが認識する役割・名前・領域に沿って指定する方法を紹介します。ロール、ラベル、見出しで区切られたエリアを使うと、**テストコードから「どの要素を操作しているか」が読み取りやすくなり、UI変更にも強くなります**。

コード例はPlaywrightですが、JestやVitestなどの環境でTesting Libraryを使ってUIをテストするときも、ロールやラベルで要素を指定する考え方は同じです。お使いのツールに合わせて読み替えながら読み進めてください。

Playwrightの基本は記事『[PlaywrightではじめるE2Eテスト入門（前編）](https://ics.media/entry/251226/)』を参照してください。

### 題材となるTODOリスト

「今日」「明日」の2エリアがあり、どちらにも「牛乳を買う」が入っています。TODOを削除すると確認ダイアログが開き、そこで削除を確定します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260624_semantics-ui-test/)
-   [コードを確認する](https://github.com/ics-creative/260624_semantics-ui-test)

このデモでもクリック自体は成功しますが、`nth(0)`のままではどのTODOかはテストコードから読み取れません。

### ボタンはロールと名前で取得しよう

ロールは「ボタン」「見出し」「入力欄」など、画面上の要素が持つ役割です。`name`には、ユーザーやスクリーンリーダーがその要素を識別するときの名前（アクセシブルネーム）を指定します。たとえば`<button>削除する</button>`は、ロールが`button`、名前が「削除する」の要素として扱えます。

Playwrightでボタンを操作するときは、`getByRole()`メソッドでロールを指定し、`name`にアクセシブルネームを渡します。テキストだけで探す`getByText()`メソッドだと、次のようにボタン以外の「削除する」も候補に入ってしまいます。

```
<p>※ 削除する前に内容を確認してください</p>
<button type="button">削除する</button>
```

```
// NG: 注意書きの「削除する」にもマッチ
await page.getByText('削除する').click();
// OK: ボタンに限定（nameはアクセシブルネーム）
await page.getByRole('button', {name: '削除する'}).click();
```

![getByTextのnth(0)は注意書きの追加で指す対象がずれ、getByRoleはボタンに限定できる比較図](https://ics.media/entry/260624/images/260624_getByText-vs-getByRole.png)

### 入力欄はラベルで取得しよう

ボタンだけではなく、入力欄も同様に取得できます。

![spanタグではラベルと入力欄が紐づかず、labelタグでは矢印で関連付きを示す比較図](https://ics.media/entry/260624/images/260624_add-form.png)

見た目はラベルでも`<span>`タグのままだと、ラベルと`<input>`タグが紐づきません。そのため、クラス名や、テストコード用の目印としてよく使われる`data-testid`属性に頼る書き方になりがちです。

```
<!-- NG: 見た目だけラベル。input と紐づかない -->
<span class="todo-label">やること</span>
<input class="todo-input" type="text" />
```

`<span>`を`<label>`タグに差し替え、`for`と`id`で関連付けると、ユーザーが見ている「やること」という名前で入力欄を取得できます。`getByLabel('やること')`で取れます。これはテストコードのためだけの変更ではなく、スクリーンリーダーなどの支援技術にも入力欄の意味を伝えるためのHTMLです。

`data-testid`が悪いわけではありません。ただし、ユーザーが認識できるラベルやロールで取得できるなら、まずはそちらを優先します。テストコードのためだけの目印よりも、画面の意味に沿った手がかりを使うほうが、HTMLの改善にもつながります。

```
<!-- OK: label と input が関連付いている -->
<label for="todo-input" class="todo-label">やること</label>
<input id="todo-input" class="todo-input" type="text" />
```

セマンティクスが正しければ、ロールやラベルを手がかりに取得し、そのまま操作や検証まで書けます。追加入力欄は`fill()`メソッドで入力し、入力済みかは`toHaveValue()`メソッドで確認できます。

※ `<label>`タグの`for`属性の書き方は記事『[リンク/ボタン/フォームをより良くするHTML・CSS 17選](https://ics.media/entry/221208/)』も参照してください。

```
await page.getByLabel('やること').fill('メールを返す');
await expect(page.getByLabel('やること')).toHaveValue('メールを返す');
await page.getByRole('button', {name: '追加'}).click();
await expect(
  page.getByRole('listitem').filter({hasText: 'メールを返す'}),
).toBeVisible();
```

パターンを整理すると次のとおりです。

手がかり

Playwrightでの取得例

ポイント

CSSクラス

`page.locator('.todo-input')`

見た目用の名前に依存し、ラベルと入力欄が紐づかない

`data-testid`

`getByTestId('todo-input')`

ユーザーから見える手がかりで取れないときの選択肢。HTMLがテストコード都合のマークアップになりやすい

ラベル + `id`

`getByLabel('やること')`

ユーザーが認識する文言から取れ、セマンティクスも正しい（推奨）

### ダイアログは`<dialog>`タグで作ろう

確認ダイアログを`<div>`タグとCSSだけで作ると、スクリーンリーダーからダイアログと認識されず、テストコードでも`getByRole('dialog')`メソッドが使えません。

```
<!-- NG: div だけでは dialog ロールにならない -->
<div class="modal-box">
  <h2>削除の確認</h2>
  <button type="button">削除する</button>
</div>
```

```
// NG: 一覧側の削除ボタンを拾う可能性あり
await page.getByText('削除する').first().click();
```

`<dialog>`タグはダイアログの役割をブラウザへ伝えられるため、`getByRole('dialog')`メソッドで取得できます。さらに`aria-labelledby`で見出しと紐づけると、ダイアログに「削除の確認」という名前が付くため、`getByRole('dialog', {name: '削除の確認'})`のように対象を絞れます。実際に表示するときは、`showModal()`で開くとモーダルダイアログとして扱えます。

※ `<dialog>`タグの詳細は記事『[モーダルUIをシンプルにできる！ 進化を続けるHTMLのdialog要素](https://ics.media/entry/250904/)』も参照してください。

```
<!-- OK: dialog ロールで取得できる -->
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">削除の確認</h2>
  <button type="button">削除する</button>
</dialog>
```

```
// OK: ダイアログ内にスコープを絞れる
const dialog = page.getByRole('dialog', {name: '削除の確認'});
await dialog.getByRole('button', {name: '削除する'}).click();
```

### 同じ文言の要素はエリアで絞り込もう

同じ名前のボタンが並ぶと、ページ全体から探すだけではどのTODOか伝わりません。冒頭の`nth(0)`と同様、順番の決め打ちです。

```
await page.getByText('削除する').nth(2).click();
```

`<section>`に`aria-labelledby`を指定すると、その見出しを名前に持つ領域として扱えます。たとえば「明日」という見出しと`<section>`が紐づくため、テストコードからは`getByRole('region', {name: '明日'})`のように、意味のあるエリアとして取得できます。

![TODOリストの今日・明日エリアがregionロールで区切られ、スコープを絞り込める図](https://ics.media/entry/260624/images/260624_region.png)

```
<section aria-labelledby="tomorrow-heading">
  <h2 id="tomorrow-heading">明日</h2>
  <ul>
    <li>
      <label>
        <input type="checkbox" />
        <span>牛乳を買う</span>
      </label>
      <button type="button">削除する</button>
    </li>
  </ul>
</section>
```

```
const milk = page
  .getByRole('region', {name: '明日'})
  .getByRole('listitem')
  .filter({hasText: '牛乳を買う'});
await milk.getByRole('checkbox').check();
await expect(milk.getByRole('checkbox')).toBeChecked();
```

### 同じ表示のボタンは`aria-label`で名前を分けよう

まずは`region`や`listitem`で操作対象を絞り込みます。そのうえで、同じ「削除する」ボタンが複数あり、支援技術にも区別できる名前を伝えたい場合は、`aria-label`で「何を削除するボタンなのか」を補います。

```
<button type="button">削除する</button>
<button type="button" aria-label="削除する: 牛乳を買う">削除する</button>
```

```
const milk = page
  .getByRole('region', {name: '明日'})
  .getByRole('listitem')
  .filter({hasText: '牛乳を買う'});
// aria-label があると name は表示テキストよりそちらが優先
await milk
  .getByRole('button', {name: '削除する: 牛乳を買う'})
  .click();
```

※ 区別できるなら不要です。アイコンのみのボタンは記事『[リンク/ボタン/フォームをより良くするHTML・CSS 17選](https://ics.media/entry/221208/)』も参照してください。

### 修正を組み合わせると

ここまでは、ボタン・入力欄・ダイアログ・エリアを、それぞれ画面の意味に沿って取得する方法を見てきました。実際のテストコードでは、これらを組み合わせて「どのエリアの、どのTODOの、どの操作なのか」まで絞り込みます。

追加はラベル・場所はエリア・ボタン名は`aria-label`・確定はダイアログで表せます。記事冒頭のTODOリストで「追加 → 削除」をE2Eテストとして通しで確認します。

このE2Eテストでは、単に削除ボタンを押すだけではなく、次の3点を確認します。

-   追加したTODOが「今日」エリアに表示される
-   「明日」エリアの「牛乳を買う」だけが削除される
-   同じ名前でも「今日」エリアの「牛乳を買う」は残る

ロールやラベルで範囲を絞ると、こうした意図をテストコードから読み取れるようになります。これをコードにすると次のとおりです。

```
// 1. TODOを追加 … getByLabel('やること') + getByRole('button', {name: '追加'})
await page.getByLabel('やること').fill('メールを返す');
await page.getByRole('button', {name: '追加'}).click();
await expect(
  page
    .getByRole('region', {name: '今日'})
    .getByRole('listitem')
    .filter({hasText: 'メールを返す'}),
).toBeVisible();

// 2. 明日の「牛乳を買う」を削除 … region → listitem → button
const tomorrow = page.getByRole('region', {name: '明日'});
const milk = tomorrow
  .getByRole('listitem')
  .filter({hasText: '牛乳を買う'});
await milk
  .getByRole('button', {name: '削除する: 牛乳を買う'})
  .click();

// 3. ダイアログで確定 … dialog → button('削除する')
const dialog = page.getByRole('dialog', {name: '削除の確認'});
await dialog.getByRole('button', {name: '削除する'}).click();

// 削除結果の検証
// （ダイアログが閉じたこと・隣の TODO を巻き込んでいないこと・今日の同名 TODO は残ること）
await expect(dialog).toBeHidden();
await expect(
  tomorrow.getByRole('listitem').filter({hasText: '会議の準備'}),
).toBeVisible();
await expect(milk).toHaveCount(0);
await expect(
  page
    .getByRole('region', {name: '今日'})
    .getByRole('listitem')
    .filter({hasText: '牛乳を買う'}),
).toBeVisible();
```

### まとめ

**アクセシビリティーのために整えたHTMLのセマンティクスは、テストコードを書くときの手がかりにもなります**。

E2Eに限らず、テストコードをレビューするときは、`nth()`やCSSクラスで対象を決め打ちしていないか、ロール・ラベル・見出しなどユーザーが認識できる手がかりで取得できているかを確認してみてください。