---
title: "定番のコード規約とライブラリから学ぶJavaScriptの命名テクニック（上級編）"
source: "https://ics.media/entry/220929/"
publishedDate: "2022-09-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2022年9月29日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

一般にプログラマーはコードを書いている時間より読んでいる時間の方が長いと言われており、わかりやすい命名は可読性や保守性の観点から非常に重要です。

この記事ではGoogleやAirbnbといった企業が採用しているスタイルガイドや、世界中で使われているJavaScriptライブラリであるReactとVue.jsのコードを調査する中で見つけた、わかりやすい命名をするためのテクニックを初級編と上級編の2回に分けて紹介します。

[前回の初級編](https://ics.media/entry/220915/)では、わかりにくい命名をした場合の問題点や、JavaScriptで共通認識となっているルール、すぐに使える命名テクニックを紹介しました。

上級編の今回は初級編で紹介したものでは表現しきれない、より複雑な処理を行いたいときに役立つ表現を集めました。

### 命名テクニック上級編

#### 1\. 有効 / 無効 の状態の表現

オブジェクトやステータスが有効か無効かを表現する単語です。

説明

例

valid

有効

isValidName: 有効な名前であるか（真偽値）

invalid

無効

invalidMessage: 無効なメッセージ（文字列型）

```
const response = await fetchData();

// レスポンスが無効だった場合にisInvalid = trueとなる
if (response.isInvalid) {
  // 無効になった理由の詳細を表示する
  window.alert(`無効なリクエストです。詳細:${response.invalidMessage}`);
}
```

#### 2\. 値が正しいか検証する

`validate`は入力値のチェックや、対象が正しい状態かどうか検証する場面などでよく使われる表現です。

説明

例

validate

検証する

validateProps: プロパティが正しいかどうかを検証する（関数）

```
/** 対象者の最低年齢 */
const TARGET_MIN_AGE = 7;
/** 保護者の最低年齢 */
const GUARDIAN_MIN_AGE = 18;

/**
 * 対象者と保護者の年齢を検証します。
 * 
 * @param targetAge {number} 対象者の年齢
 * @param guardianAge {number} 保護者の年齢
 */
const validateAge = (targetAge, guardianAge) => {
  if (targetAge < TARGET_MIN_AGE　&& guardianAge < GUARDIAN_MIN_AGE) {
    // 対象者と保護者がどちらも最低年齢未満の場合は警告を表示する
    window.alert(
      `対象者が${TARGET_MIN_AGE}歳未満の場合、保護者は${GUARDIAN_MIN_AGE}歳以上である必要があります。`
    );
  }
};
```

#### 3\. 有効 / 無効を変化させる

オブジェクトなどの有効、無効の状態を変化させる時は以下のような表現が使えます。

説明

例

activate

〜を有効にする

activateChildComponent: 子どものコンポーネントを有効にする（関数）

deactivate

〜を無効にする

deactivateComponent: コンポーネントを無効にする（関数）

enable

〜を制御 / 操作可能にする

enableSound: 音を流せるようにする（関数）

disable

〜を制御 / 操作不可能にする

disablePicture: 画像を表示できないようにする（関数）

```
/**
 * 音を有効にします。
 */
const enableSound = () => {
  // 音を流せるようにする処理
};

/**
 * 画像の表示を有効にします。
 */
const enablePicture = () => {
  // 画像を表示できるようにする処理
};

if (window.confirm("音楽は好きですか？")) {
  enableSound();
}
if (window.confirm("写真や絵は好きですか？")) {
  enablePicture();
}
```

#### 4\. 処理の条件や結果を表したいとき

処理の実行に条件があったり、実行した結果を明確にしたい場合に使える表現です。

説明

例

if

〜だった場合に処理を行う

warnIfUnsupported: サポートされていない場合に警告する（関数）  
warnIfFailed: 失敗した場合に警告する（関数）

with

〜に基づいて / 〜と一緒に処理を行う

closeWithError: エラーを表示して閉じる（関数）  
runWithPriority: 優先度に基づいて実行する（関数）

without

特定の条件"以外"のもの  
特定の条件を用いずに処理を行う

nameWithoutWhitespace: 空白が含まれない名前（文字列型）

as

処理の結果を表す

getAsString: 文字列として取得する（関数）  
storeAsGlobal: グローバルオブジェクトとして格納する（関数）

```
const animals = [
  {name: "ネコ", type: "felidae"},
  {name: "トラ", type: "felidae"},
  {name: "パンダ", type: "ursidae"},
  {name: "チーター", type: "felidae"},
];

/**
 * ネコ科ではない場合に警告します。
 * 
 * @param animal {{name: string, type: string}} 動物
 */
const warnIfNotFelidae = (animal) => {
  if (animal.type !==  "felidae") {
    console.warn(`${animal.name}はネコ科ではありません！`);
  } 
};

warnIfNotFelidae(animals[0]); // ネコはネコ科
warnIfNotFelidae(animals[2]); // パンダはクマ科
```

#### 5\. 一度しか行わない処理であることを強調したいとき

注意を促す処理などで2回目以降は表示しないといった要件はよくあります。"一度だけ"を表現したいときは`once`を使いましょう。

説明

例

once

一度だけ

warnOnce: 一度だけ警告する（関数）

```
const suggestion = {
  isSuggested: false,
  message: "いい天気です。外に出かけませんか？",
};

/**
 * 一度だけ提案します。
 */
const suggestOnce = () => {
  if (!suggestion.isSuggested) {
    window.alert(suggestion.message);
    suggestion.isSuggested = true;
  }
};

for(let i = 0; i < 5; i++) {
  // 5回繰り返しても提案は1回だけしか行われない
  suggestOnce();
}
```

#### 6\. 注意が必要な処理を表したいとき

実行時に注意が必要な処理の場合、関数名に情報を入れることで呼び出す側に注意を促すことができます。

また、4つめの例のように関数名を意図的に長く命名することで注意を引きつけたり、具体的にどのような危険があるのかを示すことも使い方によっては有効だと思います。

説明

例

dangerous

危険な

dangerouslySetInnerHTML: inner HTMLを設定する（関数）  
（この処理は危険を伴う）

force

強制的な

forceUpdate: 強制的なアップデート（関数）

urgent

緊急の、優先度が高い

urgentCall: 緊急の呼び出し

\-

具体的な危険性を表したパターン

autofixThisMayCauseInfiniteLoops:  
自動的に修正する（関数）  
（無限ループが起こるかもしれない）

```
const tasks = [
  {title: "夜ご飯の買い物をする", done: false},
  {title: "銀行に行く", done: true},
  {title: "部屋を掃除する", done: false},
  {title: "洗濯をする", done: true},
];

/**
 * 完了したタスクだけを削除します。
 * 
 * @param index {number} 削除するタスクのインデックス
 */
const deleteTaskAt = (index) => {
  if (!tasks[index].done) {
    console.warn("完了していないタスクは削除できません。");
  } else {
    forceDeleteTaskAt(index);
  }
};

/**
 * 状態に関わらずタスクを強制的に削除します。
 * 
 * @param index {number} 削除するタスクのインデックス
 */
const forceDeleteTaskAt = (index) => {
  tasks.splice(index, 1);
};

deleteTaskAt(0); // タスクが完了していないのでエラーになる
forceDeleteTaskAt(0); // 強制的に削除される
```

#### 7\. 何かを抜き出す、抽出する

あるオブジェクトや配列から必要な情報だけを抜き出す処理に使えるのが`extract`です。抽出する行為にも抽出された結果の値にも使用できます。

説明

例

extract

抽出する

extractId: IDを抽出する（関数）  
extracted: 抽出されたもの

```
/**
 * 退職していない社員を抽出します。
 * 
 * @param employees {{name: string, department: string, isRetired: boolean}[]} 社員のリスト
 */
const extractCurrentEmployees = (employees) => {
  return employees.filter((employee) => !employee.isRetired);
};

const allEmployees = [
  {name: "高橋", department: "marketing", isRetired: true},
  {name: "田中", department: "sales", isRetired: false},
  {name: "松本", department: "accounting", isRetired: false},
];

// 抽出された社員
const extracted = extractCurrentEmployees(allEmployees);
```

#### 8\. 更新されたり追加される前提の一時的な値

一時的な値を格納する変数名のアンチパターンとしてよく知られるのは`tmp`や`temp`です。これらの変数名は、一時的であることはわかっても実態が何なのかがわかりません。

`so far`は「今のところ」「これまでの」といったニュアンスがある表現です。`tmp`などと同様に`so far`単体で使うと一時的である以外の意味を持たなくなってしまうので、具体的な名詞と組み合わせて「後で更新されるけれど今のところはこの値」という場面で使いましょう。

また、一時的な値は見通しの良い限られたスコープ内（forループの中など）だけで使うことをオススメします。更新される可能性のある変数だらけのコードは読みにくいだけでなく、バグを生む可能性も高くなります。

説明

例

so far

今のところ、これまでの

pathSoFar: 現状のパス  
nameSoFar: 今のところの名前（文字列型）

```
const names = ["Neo", "Trinity", "Morpheus", "Oracle", "Agent Smith"];

/**
 *  一番長い名前を探します。
 * 
 * @param names {string[]} 名前のリスト
 */
const detectLongestName = (names) => {
  let nameSoFar = "";
  for (const name of names) {
    nameSoFar = nameSoFar.length >= name.length ? nameSoFar : name;
  }
  // ループを抜けた時点でnameSoFarに入っているのが一番長い名前
  const longestName = nameSoFar;
  return longestName;
};

console.log(`一番文字数が多い名前は${detectLongestName(names)}です。`);
```

#### 9\. 追加のもの、必須ではないもの

必須ではないけれど追加で何かの処理を行いたいときや、なくても問題はないけれど設定できる値などを表現したいときは`extra`が使えます。

説明

例

extra

追加の（必須ではない）

extraWarning: 追加の警告  
extraConfig: 追加の設定値

```
const isRaining = true;
const message = "安全運転に気をつけましょう。";
let extraWarning = null;

if (isRaining) {
  // 雨の日だけ警告します。
  extraWarning = "雨の日はスリップに気をつけましょう";
}

console.warn(message);
if (extraWarning) {
  console.warn(extraWarning);
}
```

#### 10\. 残りのもの

`extra`と似たような表現で、`remaining`は残りものを表します。

`extra`が単純にプラスされたようなニュアンスがあるのに対して、`remaining`は引き算した残りのようなイメージです。

説明

例

remaining

残りの、あまりの

remainingWidth: 残りの横幅（数値型）  
remainingText: 残りのテキスト（文字列型）

```
const maxWidth = 600;

const innerWidth = window.innerWidth;

// ウィンドウの画面幅から最大幅(600px)を引いた残りの幅
const remainingWidth = innerWidth - maxWidth;
```

#### 11\. ◯◯が可能な◯◯

[初級編](https://ics.media/entry/220915/)で「〜できるか」は`can`と紹介しましたが、それだけで表現しきれない場合は`able`が使えるかもしれません。

`can`は後に続く動詞が「いま実行できるかどうか」を表すので、`true`や`false`を返すメソッドや真偽値を格納する変数の名前に適しています。

一方`able`は、「その能力があるかどうか」といったニュアンスです。後に続く名詞を修飾することもできるので、以下の例のように「読み込めるサイズ」など能力＋ものを表したい時に使える表現です。

説明

例

able

〜できる

readableSize: 読み込めるサイズ（数値型）  
draggableComponent: ドラッグできるコンポーネント

```
const clickableIcon = document.querySelector(".clickable");

clickableIcon.addEventListener("click", () => {
  // アイコンをクリックした時の処理
});
```

#### 12\. 期待値と違うものが入り込む可能性があるもの

サーバーから取得してくる値やAPIの返却値など、おそらくこの値が入るけれど場合によっては違うかもしれない、といった状況で使える表現です。

この表現が使われている変数や関数の後には値が正しいかどうかの検証が必要です。

説明

例

maybe

かもしれない

maybeId: IDかもしれない（違うかもしれない）  
maybeMessage: メッセージかもしれない

```
const maybeId = prompt('IDを入力してください');

if (isValidId(maybeId)) {
  const id = maybeId;
  const user = await fetchUser(id);
} else {
  window.alert('無効なIDです');
}
```

#### 13\. 何かが足りない、ない状態のとき

必須項目がない、期待値に対して何かが足りない状態を表したいときには`missing`を使って命名できます。

説明

例

missing

足りない〜  
〜がない

missingDependencies: 足りない依存関係  
detectMissingProps: ないプロパティを見つけ出す

```
const missingProps = ["name", "height"];

if (missingProps.length > 0) {
  // 足りないプロパティに関する処理
}
```

#### 14\. 〜する予定のもの

これから特定の処理を行う予定のものは、`名詞 + to + 動詞`の形で表現できます。

説明

例

to

〜する予定の〜

dataToMerge: マージする予定のデータ  
entryToSave: 保存する予定のエントリー

```
const diaryToSave = {
  title: "今日の日記",
  date: "2022/09/29",
  content: "今日の昼食はチャーハンでした。",
};

save(diaryToSave);
```

#### 15\. かたまりを分けるもの

電話番号や郵便番号を分けるハイフンなど、何かと何かを分ける役割のあるものは`separator`と表現できます。

```
const SEPARATOR = "-";

/**
 * ハイフンで区切られた電話番号をハイフンなしの形にします。
 * @param phone {string} ハイフンで区切られた電話番号の文字列
 */
const unhyphenate = (phone) => {
  return phone.split(SEPARATOR).join("");
};

const phone = "012-345-678";
const unhyphenated = unhyphenate(phone);
```

### まとめ

日々コードを書いていると、この変数には何という名前をつけよう？　この関数を表す最適な名前はなんだろう？　と悩むことが多々あります。そのような時にふと、有名なライブラリを調べてみたらヒントが見つかるかもしれないと思ったのがこの記事を書くきっかけでした。

この記事で紹介したのはReactとVue.jsを調査して見つけたほんの一部であり、そもそも命名には（コードと同じように）正解はありません。しかし、共通のルールやよく使われている表現などを意識することで、よりわかりやすい命名ができるのではないかと思います。

ここで紹介したテクニックが命名をするときに少しでも役に立つと嬉しいです。

### 参考サイト

-   [React - GitHub](https://github.com/facebook/react)
-   [Vue.js - GitHub](https://github.com/vuejs/vue)
-   [メソッドの命名 ableとcan - おれろぐ #z\_a\_ki3](https://zaki3.hateblo.jp/entry/2015/03/16/204750)