---
title: "プログラミングの幅を広げよう！一段上のPromise活用テクニック"
source: "https://ics.media/entry/211203/"
publishedDate: "2021-12-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2021年12月3日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

ES2015で登場した`Promise`とES2017で追加された`async/await`によってJavaScriptのコーディングスタイルは大きく変わりました。Promiseの基本的な使い方を理解していることは「脱初心者」のひとつの指標にもなっているようで、網羅的で優れた解説も数多く存在します。

では、基本をおさえた後の活用方法はどうでしょうか？　実際のところ実務ではライブラリやフレームワークから返却されたPromiseをそのまま`await`するだけ…という使い方がほとんどかもしれません。しかし、これらのライブラリやフレームワークの中で利用されているような**高度なPromiseの活用法をマスターすれば、もっと自由なプログラミングができる**ようになります。

この記事ではPromiseを活用した実践的な例を3つ紹介します。いずれもライブラリやフレームワークに類似の機能を持つものはありますが、仕組みを理解することでさまざまな応用が可能です。ぜひ使いこなして自分のプログラミングの自由度を上げてみてください。

※ この記事のサンプルコードには引数等の型を示してコードを読みやすくするためにTypeScriptを使用しています。Promiseの機能自体はJavaScript/TypeScriptどちらで書いても違いはありません。

### 実践例1. Promiseでモーダル（alertやconfirm）を作る

最初の例はPromiseで実装するモーダルです。ご存知の通り、ブラウザーでは`alert`・`confirm`・`prompt`といった組み込みの関数を使って簡単にモーダルを表示できます。

▼ 昔ながらの`alert`・`confirm`の例。制約は多いがとても簡単に使える

```
const isLikeDog = confirm('Q. 犬と猫では犬の方が好きだ');
alert(`あなたは${isLikeDog ? '犬派' : '猫派'}ですね！`);
```

しかし、現実のプロダクトで`alert`や`confirm`をそのまま使えるケースは少ないでしょう。多くの場合、HTML/CSSで作り込まれたモーダルの要素をJavaScriptで表示制御することになります。このような制御には以前はコールバック関数を使用するのが一般的でしたが、複雑でネストが深くなりがちでした（Callback Hellなどと呼ばれ、避けられるパターンです）。

こうした制御もPromiseを使うとスマートに実装できます。

![Promiseベースのモーダルの動作例](https://ics.media/entry/211203/images/211203_demo1.gif)

▼ Promiseベースのモーダルの例（呼び出し側）

```
// 質問1
const isLikeDog = await modalConfirm("犬と猫はどっちが好き？", "犬", "猫");
const animal = isLikeDog ? "犬" : "猫";
// 質問2
const isLikeJs = await modalConfirm(
  `${animal}とJavaScriptはどっちが好き？`,
  "JavaScript",
  animal
);
// 確認
const mostLove = isLikeJs ? "JavaScript" : animal;
await modalAlert(`あなたが一番好きなのは${mostLove}です！`);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211203_promise/demo1/index.html)
-   [サンプルのソースコードを別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo1/demo1.ts)

`async/await`がついているだけで、ほとんど標準の`alert`・`confirm`と変わりませんね。モーダル自体はHTML/CSSなので、ボタンのキャプションやデザインも自由に調整できます。

#### 実装のポイント

では、この`modalAlert`関数や`modalConfirm`関数はどのように実現されているのでしょうか？　モーダル本体のコードも見てみましょう。

▼ Promiseベースのモーダル機能の実装（`modalAlert`関数部分の抜粋）

```
/**
 * （内部用）モーダルのHTMLを生成して画面に表示します
 * @param message モーダルのテキスト
 * @param onClose 閉じた時のコールバック
 * @param caption ボタンキャプション
 */
const createAlert = (
  message: string,
  onClose: () => void,
  caption = 'OK'
) => {
  // 要素を作成
  const modal = document.createElement("div");
  const text = document.createElement("p");
  const buttonOk = document.createElement("button");

  // クラス名やテキスト等を設定（スタイリングはCSSで行います）
  modal.className = "ModalAlert";
  text.textContent = message;
  buttonOk.textContent = caption;

  // ボタンクリック時の挙動
  buttonOk.addEventListener("click", () => {
    document.body.removeChild(modal);
    onClose();
  });

  modal.appendChild(text);
  modal.appendChild(buttonOk);
  document.body.appendChild(modal);
};

/**
 * モーダルを表示し、ボタンが押されるまで待機します。
 * @param message モーダルのテキスト
 * @param caption ボタンキャプション
 */
export const modalAlert = async (message: string, caption?: string) => {
  return new Promise<void>((resolve) => {
    createAlert(message, resolve, caption);
  });
};
```

-   [ソースコード全体を別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo1/modal.ts)

`createAlert`関数は少し長いですが、この部分にはPromiseは登場しません。HTMLでモーダルの要素を組み立てて画面に表示し、ボタンが押されたら指定されたコールバック関数を呼んでいます。`export`をつけて公開している`modalAlert`関数でこれをPromiseでラップしています。

#### もっと活用するためのアイデア：すべてのコールバックはPromiseにできる

Promiseにあまり慣れていないと「PromiseはAPI呼び出しやファイルの読み書きといった時間のかかる処理のためのもの」というイメージを持っているかもしれません。このイメージも間違いではありませんが、実際には**従来コールバックやイベントハンドラーとして実装されていたものは**（使いやすいかどうかは別として）**なんでもPromiseでラップできます**。

ステップバイステップで進行するチュートリアル画面や登録フォームなどをPromiseベースで作ってみるのもおもしろいかもしれません。

#### 注意！　モーダル表示中も他のプログラムは動作している

従来の`alert`や`confirm`とほとんど同じ感覚で使えるPromiseベースのモーダルですが、ひとつ注意事項があります。次のコードは確認メッセージ表示して「追加」または「削除」の処理を呼び出す例ですが、**本質的に安全とは言えません**。

▼ 安全でないPromiseモーダルの利用例

```
let mode = 'add'; // 'add'または'delete'で処理を指定

// ボタンクリック等で呼び出される処理
// 確認メッセージを表示して「追加」か「削除」を実行
const confirmAndExec = async () => {
  if (mode !== 'add' && mode !== 'delete') return;
  const isOk = await modalConfirm(`${mode === 'add' ? '追加' : '削除'}します。よろしいですか？`);
  if (!isOk) return;
  // 確認OKならサーバーの処理を呼び出す
  callServerAPI(mode);
}
```

このコードを実行すると、確認メッセージは「追加します。よろしいですか？」と表示したにもかかわらず、サーバーの処理は「削除」を呼び出してしまう可能性があります。`await`で待っている間も他のJavaScriptは動作しているため、何かの処理が`mode`変数を書き換えることができてしまうのです。

基本的には`await`より後の処理ではローカル変数以外の可変な値（`let`で宣言された変数や`const`であっても中身が変わりうるオブジェクトや配列など）は参照しないほうが安全です。今回の例であれば、`mode`を`confirmAndExec`の引数にしてしまうのが簡単でしょう。

### 実践例2. PromiseでAPIを確実にキャッシュする

2つめの例はPromiseを使ったAPIのキャッシュです。APIの呼び出しやJSONデータの取得といった操作は`fetch`関数を使えば簡単に実装できます。しかし、単純に書いてしまうと、同じURLに何度もムダにアクセスしてしまうことにもなりかねません。Promiseを使うことで、必要な場所から自由にAPIをコールしつつ裏側で重複の排除とキャッシュを行い、ムダな呼び出しをなくす仕組みを作れます。

次の例ではPromiseを使って作られたAPIを呼び出して今日の東京の天気を表示します。`getTokyoWeather`・`getTokyoWind`・`getTokyoWave`の各関数はそれぞれ東京の今日の天気・風・波の情報を返すもので、データは気象庁のウェブサイトで公開されているものを利用します（[利用規約など](https://www.jma.go.jp/jma/kishou/info/coment.html)）。

▼ 気象データを取得して東京の天気を表示する例（呼び出し側）

```
const showWeather = async () => {
  const el = document.querySelector("#api .weather");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWeather()) ?? "取得失敗";
};

const showWind = async () => {
  const el = document.querySelector("#api .wind");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWind()) ?? "取得失敗";
};

const showWave = async () => {
  const el = document.querySelector("#api .wave");
  if (!el) return;
  el.textContent = "取得中...";
  el.textContent = (await getTokyoWave()) ?? "取得失敗";
};

// ロード時に天気・風・波の3つをまとめて表示
showWeather();
showWind();
showWave();
```

![PromiseでAPIをキャッシュして無駄なく天気を表示する例](https://ics.media/entry/211203/images/211203_demo2.png)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211203_promise/demo2/index.html)
-   [サンプルのソースコードを別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo2/demo2.ts)

#### 実装のポイント

気象庁のAPI（正確には単純なJSONファイル）では、天気・風・波の3つは同じ1ファイルに格納されています。ムダな呼び出しを避けるためには、たとえば`getTokyoWeather()`と`getTokyoWind()`をつづけて呼ばれても、気象庁へのリクエストは1回だけにしたいところです。これを実現するコードを見てみましょう。

▼ API部分の実装（1/2）：天気・風・波の情報を取得して返す関数

```
/** 気象情報のJSONデータを取得し、そこから「東京の今日の天気」 を抜き出して返します */
export const getTokyoWeather = async () => {
  const data = await loadWeatherData();
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.weathers?.[0] ?? "";
};

/** 気象情報のJSONデータを取得し、そこから「東京の今日の風の強さ」 を抜き出して返します */
export const getTokyoWind = async () => {
  const data = await loadWeatherData();
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.winds?.[0] ?? "";
};

/** 気象情報のJSONデータを取得し、そこから「東京の今日の波の強さ」 を抜き出して返します */
export const getTokyoWave = async () => {
  const data = await loadWeatherData();
  return data?.[0]?.timeSeries?.[0]?.areas?.[0]?.waves?.[0] ?? "";
};
```

-   [ソースコード全体を別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo2/api.ts)

天気・風・波の3つは同じ1ファイルに含まれているため、`getTokyoWeather`・`getTokyoWind`・`getTokyoWave`の各関数はすべて同じ`loadWeatherData`関数を呼び出しています。このままでは同じJSONファイルを何度もリクエストしてしまうので、`loadWeatherData`関数で対策します。

`loadWeatherData`関数も見てみましょう。

▼ API部分の実装（2/2）：Promiseを使ってAPIを呼び出してキャッシュする関数

```
/** 
 * 気象庁の公開データのURL
 * 利用規約: https://www.jma.go.jp/jma/kishou/info/coment.html
 */
const API_ENDPOINT =
  "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";
/** キャッシュの生存期間設定（秒）： 天気予報は頻繁には更新されないため長めに設定 */
const CACHE_LIFETIME_SEC = 3600;

/** 取得中or取得結果を保持（キャッシュ）するPromise */
let dataPromise: Promise<any> | undefined;
/** 有効期限が切れる時間 */
let expired = Date.now();

/**
 * 気象情報のJSONデータを取得して返します。
 * 取得結果は一定時間キャッシュされます。
 */
const loadWeatherData = () => {
  const now = Date.now();
  // キャッシュの生存期間を過ぎていたらクリアする
  if (now > expired) dataPromise = undefined;
  // キャッシュがあればそのまま返却
  if (dataPromise) return dataPromise;
  // ここから(再)取得処理
  // キャッシュの生存期間を更新
  expired = now + CACHE_LIFETIME_SEC * 1000;
  // APIを呼び出して、Promiseをキャッシュとして保持する
  // awaitでPromiseを解決せず、そのまま返していることに注意
  dataPromise = fetch(API_ENDPOINT).then((res) => res.json());
  return dataPromise;
};
```

-   [ソースコード全体を別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo2/api.ts)

一度取得したデータを変数に保持し、2回目以降は有効期限が切れるまで保持したデータを返します。ポイントはデータを保持する`dataPromise`変数に**APIの結果（レスポンスやJSONオブジェクト）ではなく`fetch()`関数から返ってきたPromiseをそのままセットしている**ことです。

`loadWeatherData`関数自体には非同期処理が一切含まれないため、ほぼ同時に複数回呼び出されても必ず最初の処理でキャッシュにPromiseがセットされます。2度目以降は単純にこのPromiseを返すだけです。

2度目以降の呼び出しの際には、このPromiseはすでに解決（`resolved`）されているかもされませんが、これは問題になりません。Promiseは解決済みであるかどうかにかかわらず何度でも`await`でき、常に同じ結果が返ります。

![データではなく「データを返すPromise」を返す](https://ics.media/entry/211203/images/211203_share_promise.png)

APIのキャッシュはレスポンスの内容ではなくPromise自体をキャッシュする、と覚えておくと良いでしょう。

### 実践例3. Promiseで同時処理数をコントロールする

最後はもう少し応用的な例として、Promiseで同時処理数（多重数）を制御する方法を紹介します。Promiseによる同時処理は100でも200でも動かすことができますが、現実的にはもっと少ない数に抑えたいと思うこともあるでしょう。たとえば「**APIの同時呼び出し数は3以内にしたい**」であるとか、「**同時に表示するモーダルは1つだけにしたい**」といったケースです。

次の例はタイル状に並んだ36枚の画像を最大3多重で順次読み込むサンプルです。ひとつひとつの画像の読み込み時間には差がありますが、読み込み中（ローディングが表示されている枠）は常に3個になっていることがわかります。

![大量の画像を最大3多重で表示する例](https://ics.media/entry/211203/images/211203_demo3.gif)

▼ 大量の画像を最大3多重で読み込む

```
/** 画像を並べる親要素 */
const parent = document.getElementById("imageWall")!;

/**
 * 画像を読み込んで表示します。
 * 大量に呼び出された場合、同時処理数が上限を超えないように順次処理されます。
 * @param id 読み込む画像のid（任意の整数に対応する画像が表示されます）
 */
const loadImage = async (id: number) => {
  // 画像の外枠を作成・表示
  const el = document.createElement("div");
  parent.appendChild(el);

  // 🌟 ロック獲得 -- 処理数が上限を超えていればここで待たされる
  const release = await enter();

  // ローディング表示を開始
  el.classList.add("loading");

  // 読み込み完了・失敗時のイベントハンドラ
  const onload = () => {
    el.classList.remove("loading");
    // 🌟 ロックを解放する
    release();
  };

  // img要素を作成して読み込み開始
  const img = new Image();
  img.onload = img.onabort = onload;
  img.src = `https://picsum.photos/seed/${id}/300/300`;
  el.appendChild(img);
};

// 36枚すべての画像の読み込みを実行
for (let index = 0; index < 36; index++) {
  loadImage(index + 1);
}
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/211203_promise/demo3/index.html)
-   [サンプルのソースコードを別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo3/demo3.ts)

画像1枚を読み込んで表示する`loadImage`関数を定義し、最後の`for`文で36回一気に呼び出しています。

このコードで目新しいのは🌟をつけた2行のみです。ためしにこの2行をコメントアウトすると、「最大3多重」という制限がなくなり、すべてのローディングが一斉に表示されます。Promiseを使用した多重制御の仕組みを使うことで、`enter()`から`release()`の間は同時処理数が3を超えないよう制御され、上限に達している場合は誰かが`relese()`するまで`await enter()`の位置で待たされるようになります。

#### 実装のポイント

では、仕組みのコードも見てみましょう。このコードでは理解しやすいよう、「最大3多重」を「最大3つの作業部屋があり、`enter()`で入室し、`release()`で退室する」というイメージで解説します。部屋を識別する鍵には`Symbol`を使用していますが、馴染みがなければただの連番などでも構いません。

```
// 部屋の数 = 最大同時処理数
const MAX_ROOMS = 3;

type Releaser = () => void;
type Resolve = (releaser: Releaser) => void;

// 使用中の部屋（処理枠）のリスト： 所有者以外がリリースできないよう、Symbolで識別します
let rooms: Symbol[] = [];
// 処理待ちのリスト： 待っているPromiseのresolve関数を保持します
const waitingList: Resolve[] = [];

/**
 * ロックを取得します。他の処理でいっぱいの場合、空きが出るまで待ちます。
 * @return ロック開放関数。処理が終わったら必ず呼び出してください。
 */
export const enter = () => {
  const promise = new Promise<Releaser>((resolve) => {
    // Promiseのresolve関数を待ちリストに追加する
    waitingList.push(resolve);
  });
  // 現時点で空きがあるかもしれないので、処理開始を試行
  tryNext();
  // 開始できたか待たされているかにかかわらず、Promiseを返す
  return promise;
};

/**
 * ロックを開放します
 * @param room 割り当てられた部屋のキー
 */
const release = (room: Symbol) => {
  rooms = rooms.filter((r) => r !== room);
  tryNext(); // 待っている処理があれば開始
};

/**
 * 部屋の空きがあり、待ちリストに待機している処理があれば、部屋を割り当てて処理を開始
 */
const tryNext = () => {
  // 上限オーバーなら終了
  if (rooms.length >= MAX_ROOMS) return;
  // 待っているPromiseがなければ終了
  const next = waitingList.shift();
  if (!next) return;
  // 新しい部屋を作成
  const room = Symbol();
  rooms.push(room);
  // ロックを解放する関数を渡してPromiseをresolve
  next(() => {
    release(room);
  });
};
```

-   [サンプルのソースコードを別ウインドウで開く](https://github.com/ics-creative/211203_promise/blob/main/src/demo3/lock.ts)

このコードのポイントは**入室できずに待っている待機リスト（`waitingList`配列）にPromiseの`resolve`関数をセットしている**点です。`waitingList`に注目しながら処理の流れを見ていくとわかりやすいでしょう。

1.  `enter`関数が呼び出される。
2.  新しいPromiseが作成され、`resolve`関数が待機リストに追加される。  
    （空室の有無にかかわらず、まずは待機リストに入る）
3.  `tryNext`関数が呼び出される
4.  空室があれば待機リスト先頭の`resolve`関数が実行され入室。  
    （`await enter()`の次の行に進む）
5.  2のPromiseを返す。4で入室できなかった場合は、先行処理の`release`実行を待つ。
6.  処理完了後、`release`関数が呼ばれる。
7.  部屋を空けて、次の人のために`tryNext`関数を実行。

このようなロジックは一般的にSemaphore（セマフォ）やMutex（ミューテックス）と呼ばれ、標準機能として提供されている言語も多くあります。汎用的に利用できるアルゴリズムなので理解しておくと武器になるでしょう。

### まとめ：Promiseを活用してプログラミングの自由度を上げよう

Promiseはライブラリやフレームワークが返してくれたものを`await`するだけでも十分に便利ですが、自分で自在に扱えるようになるともっとプログラミングの幅が広がります。

最初はちょっと難しく感じるかもしれませんが、まずは簡単なものから自力で書いてみることが近道です。この記事の内容が難しいと思ったら「`setTimeout`関数をPromise化する」といった簡単なお題からはじめてみても良いでしょう（→[回答例を見る](https://github.com/ics-creative/211203_promise/blob/main/src/demo3/sleep.ts)）。