---
title: "VS Code & TypeScriptとp5.jsで始めるモダンなクリエイティブコーディング入門"
source: "https://ics.media/entry/210129/"
publishedDate: "2021-01-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

ページの背景で動くダイナミックなパーティクルやラインアニメーション、あるいはちょっとした遊びごころの溢れるキャラクターアニメーションなど、webページにクリエイティブな表現を組み込めるようになりたいと考える方はエンジニアにも多いでしょう。

この記事では、基本的なJavaScriptの知識があれば誰でも始められるp5.jsというライブラリを使用して、クリエイティブな作品作りの入門を解説します。 環境面では、フロントエンド開発のデファクト・スタンダードとも言えるVisual Studio Code（以下VS Code）とTypeScriptを使用して、モダンで快適な開発環境を作ります。

環境構築といっても、とくに難しい作業はありません。記事を読みながらぜひ、オリジナルの作品作りにチャレンジしてみてください。

▼ VS Codeでp5.jsを使って制作している環境の例

![VS Codeでp5.jsを使って作品を作っている様子](https://ics.media/entry/210129/images/210129_p5_vscode.png)

### クリエイティブ・コーディングの入門に最適なライブラリp5.jsとは？

この記事で使用するp5.jsはProcessingというクリエイティブ表現のためのプログラミング言語（と開発環境）をJavaScriptに移植したライブラリーです。 オリジナルのProcessingは専用の開発環境（IDE）を使用し、スケッチと呼ばれるコードを記述していくことで簡単に作品作りができるプログラムです。

![ProcessingのIDE](https://ics.media/entry/210129/images/210129_processing.png)

JavaScriptに移植されたp5.jsでは、専用のIDEを使わずに[OpenProcessing](https://www.openprocessing.org/)というwebサイト上でコーディングして作品を共有することもできます。[公開されている作品のリスト](https://openprocessing.org/browse/#)を見るだけでもインスピレーションが湧いてきますね。

![OpenProcessingのギャラリーページ](https://ics.media/entry/210129/images/210129_openprocessing.png)

また、近年ではTwitterの[「#つぶやきProcessing」](https://x.com/hashtag/%E3%81%A4%E3%81%B6%E3%82%84%E3%81%8DProcessing)タグなど、簡潔なコードでさまざまな表現にチャレンジする、一種のデモやコードゴルフに似た文化も生まれています。

### モダンなフロントエンド開発環境でp5.jsを始めよう

Processingとp5.jsはプログラミングでクリエイティブな表現を作りたい人にとって最適な選択肢のひとつであることは間違いありません。 その一方で独自のwebエディターによる開発は、日頃エディター上でコード補完や型チェックの恩恵を受けているフロントエンドエンジニアにとっては少々窮屈で不便に感じるかもしれません。 また、単にコミュニティーで作品を共有するだけでなく、自分のwebサイトやwebアプリにp5.jsで作った表現を組み込みたいと思うこともあるでしょう。

次節からのいくつかのステップで、快適な環境でp5.jsを満喫するための環境を用意しましょう。 この記事ではエディターとしてVS Codeを使用しますが、他のエディターでも構いません。また、[Node.js（npmコマンド）](https://nodejs.org/en/download)を使用しますので、はじめての方は先にインストールしておきましょう。

先に、以下のステップで準備するプロジェクトの全体像を示します。

![ベースのファイル構造と内容](https://ics.media/entry/210129/images/210129_project_base.png)

#### STEP1: プロジェクトのフォルダーを作る

まずは好きな場所に好きな名前で空のフォルダーを作り、このフォルダーをVS Codeにドロップして開きます。

#### STEP2: プロジェクトの初期化（package.jsonの作成）

続けて、開いたフォルダーの直下にプロジェクトを管理する`package.json`ファイルを作成します。 通常の開発では`npm init`等のコマンドを使用してプロジェクトの説明やライセンス等を設定しますが、今回は面倒な設定をスキップするために直接ファイルを作成します。

`package.json`という名前で新しいファイルを作成し、以下の内容を記載して保存します。

```
{
  "private": true
}
```

#### STEP3: Parcelとp5.jsのインストール

VS Codeのターミナルを表示し（mac: control + shift + @ / Windows: control + @でウインドウ右下に開きます）、以下のコマンドで必要なモジュールのインストールをおこないます。

▼ モジュールのインストール

```
npm i parcel -D
npm i p5
npm i @types/p5 -D
```

最初にインストールしている[Parcel](https://parceljs.org/)はバンドラーと呼ばれるツールで、今回はTypeScriptをJavaScriptに変換したり、ファイルの変更時にプレビューを自動更新したりするために利用します。今回はバンドラーについて深くは触れませんが、興味のある方は以前の記事[『TypeScriptのビルドにオススメ！　Parcel入門』](https://ics.media/entry/190325/)で解説していますので参照してみてください。

2つめ・3つめにインストールしているのがp5.js本体とTypeScriptの型定義です。TypeScriptというと難しい印象を持たれるかもしれませんが、今回は単純にコードの補完や誤りの検出を簡単にする目的で利用します。

![TypeScriptのメリット](https://ics.media/entry/210129/images/210129_typescript_pros.png)

#### STEP4: HTMLとTSファイルを作る

次にコードを書くための雛形となるHTMLとTS（TypeScript）ファイルを作成します。`src`という名前でフォルダーを作り、その中に`index.html`と`main.ts`の2つのファイルを作ります。

▼ `src/index.html`の内容

```
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello p5</title>
  <!-- スクリプト(main.ts)の読み込み -->
  <!-- Parcelのv2系ではスクリプトの読み込みにtype="module"の指定が必要です -->
  <script src="main.ts" type="module"></script>
</head>
<body>
  <h1>はじめてのp5.js</h1>
</body>
</html>
```

▼ `src/main.ts`の内容

```
console.log("Hello p5!");
```

#### STEP5: ParcelをつかってHTMLとTSを表示する設定を追加する

最後に再び`package.json`を開き、以下のように`scripts`のブロックを追加します。それ以外の部分は自動生成されたもののままで構いません。

▼ `package.json`の内容（例＝バージョンの数字は異なる可能性があります）

```
{
  "private": true,
  "scripts": {
    "dev": "parcel src/index.html --open",
    "build": "parcel build src/index.html"
  },
  "devDependencies": {
    "@types/p5": "^1.4.2",
    "parcel": "^2.5.0",
  },
  "dependencies": {
    "p5": "^1.4.1"
  }
}
```

`package.json`を編集して保存したら、ターミナルから下記のコマンドを実行します。

```
npm run dev
```

設定が正しければ、ブラウザーに「はじめてのp5.js」と表示され、開発者ツールのコンソールに「Hello p5!」とログが出力されます。 また、この状態でHTMLやTSファイルの内容を編集して保存すると、ブラウザーの表示も自動で更新されます。

#### 公式のサンプルを動かそう

環境ができたので、早速[公式サイトのGet Started](https://p5js.org/get-started/)のコードを動かしてみましょう。 公式のコードのままでも良いのですが、今回はモダンなJavaScript・TypeScriptの恩恵を受けるため、少し修正を加えます。

▼ 修正前：公式のGet Started

```
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(50, 50, 80, 80);
}
```

▼ 修正後：importとp5のインスタンスモードを使用するように書き換えたコード

```
import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};

new p5(sketch);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210129_p5ts/00_getStarted.html)
-   [コードを確認する](https://github.com/ics-creative/210129_p5ts/blob/master/src/00_getStarted.ts)

「修正後」のコードを`main.ts`に貼り付けて保存すると、ブラウザーの画面にグレーのキャンバスと白い丸が表示されます。

#### 補足：p5.jsのインスタンスモードをマスターしよう

上記の修正で登場したp5の「インスタンスモード」について少し補足しておきましょう。

冒頭で紹介したように、p5.jsはProcessingという独自の言語をJavaScriptに移植したものです。 できるだけオリジナルのProcessingとの互換を維持するため、デフォルトではp5.jsの読み込み時にProcessingの標準関数がグローバルに追加され、特別な手続きなしで利用できるようになっています。 サンプルの`createCanvas`や`background`といった関数はすべて、p5.jsがグローバルに追加したものです。

これはProcessingという言語の移植としては簡潔で正しいアプローチですが、フロントエンドの一般的な開発作法としては少々困り物です。 とくに作品が大きくなって他のライブラリーや既存のwebページと組み合わせるようになってくると、p5.jsがグローバルに展開した名前は容易に衝突して予期せぬエラーを引き起こします。

この問題に対する解決策が上記したインスタンスモードです。 インスタンスモードではすべての関数や定数が`p5`のインスタンスの中に用意され、グローバルを汚染しません。少々キータイプは増えますが、こちらの方が安全な方法と言えるでしょう。

また、副次的な効果として`p.`とタイプするだけで候補を表示できるメリットもあります。

### 作例1: frameCountを使って加筆していくアニメーション

ここからはOpenProcessingのギャラリーを見ながら自由にコーディングを楽しんで頂いても良いのですが、せっかくなのでいくつか基礎的な作例を紹介・解説してみましょう。

最初の作例は画面中央からグラデーションの花が開くようにアニメーションが描かれるサンプルです。

メインの描画処理である`p.draw`の中身はたったの5行ですが、複雑な絵を作れることがわかるでしょう。

![作例1](https://ics.media/entry/210129/images/210129_demo1.gif)

```
import p5 from "p5";

const sketch = (p: p5) => {

  // 描画色1・2
  const color1 = p.color("#fffbe3");
  const color2 = p.color("#24495c");
  // 描画色1の強さ
  let color1amount = 1;
  
  /** 初期化処理 */
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES); // 回転の単位を弧度から角度に変更
    p.noStroke(); // 線なし（塗りつぶしのみ）に設定
    p.background("#131821"); // 背景色を設定
    p.blendMode(p.LIGHTEST); // 合成モードを「LIGHTEST=明るく」に設定
  };

  /** フレームごとの描画処理 */
  p.draw = () => {
    // 塗り色を設定
    p.fill(p.lerpColor(color2, color1, color1amount));
    // 画面中央を原点に
    p.translate(p.width / 2, p.height / 2);
    // フレーム数分（1フレームあたり13度）回転させる
    p.rotate(p.frameCount * 13);
    // 楕円を描く
    p.ellipse(p.frameCount / 2, 0, p.frameCount, p.frameCount / 3);
    // 「描画色1の強さ」を少し弱くする
    color1amount *= 0.995;
  }
}

new p5(sketch);
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210129_p5ts/01_lineart.html)
-   [コードを確認する](https://github.com/ics-creative/210129_p5ts/blob/master/src/01_lineart.ts)

p5.jsでは基本的に1秒間に60回`draw`関数が呼び出されます。その際前回の画面は消去されないので、フレームごとに少しずつ大きさや角度をずらして重ね書きすることで、段々花が開いていくようなアニメーションも簡単に作ることができるのです。

また、`p.rotate(p.frameCount * 13)`でキャンバスを回転させながら描画している部分もp5.jsのおもしろいところです。この回転は描画したイメージを実際に回転しているわけではなく座標系（図形を描画するペンの位置や角度）を回転させているだけなので、処理の負荷や画像の劣化はありません。積極的に利用していきたい考え方です。

### 作例2: バブルやパーティクルの表現

2つ目の作成は浮き上がるバブルのアニメーションです。マウスカーソルを動かしている間はカーソルの位置から、そうでなければ画面下からランダムにバブルが現れ、細かく揺れながら浮き上がります。

![作例2](https://ics.media/entry/210129/images/210129_demo2.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210129_p5ts/02_bubble.html)
-   [コードを確認する](https://github.com/ics-creative/210129_p5ts/blob/master/src/02_bubble.ts)

全体のソースは少々長いので、上記リンクから参照してください。

このサンプルではバブルの位置やスピードといった各種のパラメーターをTypeScriptの型を使って整理しています。

▼「バブルの情報を定義する型」を作ってパラメーターをわかりやすくまとめる

```
/** バブルの情報を定義する型 */
type Bubble = {
  /** 位置（画面サイズに対する0〜1の相対位置） */
  pos: {
    x: number;
    y: number;
  };
  /** サイズ(px) */
  size: number;
  /** 上昇スピード（画面高さに対する0〜1の相対値） */
  speed: number;
  /** 塗りつぶすか？ */
  isFill: boolean;
};
```

クリエイティブコーディングのプログラムは作り込むほどにさまざまなパラメーターや定数がうまれ、コードの見通しが悪くなりがちです。短いコードで簡潔に書く美学もありますが、とくに試行錯誤している間は長くてもわかりやすいコードを心がける方が良いでしょう。

もうひとつ、この作例で利用している`noise`関数も押さえておきましょう。

```
bubbles.forEach(b => {
  // ノイズを使って左右の揺れの値を作る
  const noise = p.noise(b.pos.x * 20, b.pos.y * 20);
  const xShift = p.map(noise, 0, 1, -15, 15);
  // ...下略
}
```

p5.jsではメジャーなノイズ関数のひとつであるパーリンノイズが標準で組み込まれており、`p.noise(x, y, z)`（yとzは省略可）で1〜3次元のノイズを簡単に生成できます。今回の作例ではバブルの位置（x, y）を使ってノイズを生成し、その値の分だけ左右に揺らすことで不規則かつ滑らかな揺らぎを表現しています。

パーリンノイズを使った表現については、過去の記事[『JavaScriptで取り組むクリエイティブコーディング　パーリンノイズを使いこなせ』](https://ics.media/entry/18812/)でも詳細に解説しています。

ノイズ以外にも、座標の計算や色の扱いなどp5.jsにはクリエイティブ表現で頻繁に使われる機能がたくさん用意されています。[関数の一覧](https://p5js.org/reference/)自体は1ページで簡単にみられる量なので、一度軽く目を通しておくと良いでしょう。

### 作例3: 画像を使ったキャラクターアニメーションやゲーム

最後にもう少し違った作例として、キャラクターの画像を使ったアニメーションの例を紹介します。この例では、画面をクリックするとキャラクターがジャンプし、バウンドしながら着地します。

![作例3](https://ics.media/entry/210129/images/210129_demo3.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210129_p5ts/03_charactor.html)
-   [コードを確認する](https://github.com/ics-creative/210129_p5ts/blob/master/src/03_charactor.ts)

このキャラクターのジャンプのように、A地点からB地点へ滑らかに位置や角度を変えてゆくアニメーションは、一般に「Tweenアニメーション」と呼ばれます。p5.js自体はこうしたアニメーションやゲームの表現にはあまり向きませんが、原理を学ぶのには良い課題です。また、工夫次第で一般的なTweenアニメーションのライブラリとは違う独自の表現が生み出せるかもしれません。

この作例ではTweenのイージングを計算するために[eases](https://www.npmjs.com/package/eases)という簡単なライブラリーを利用しています。

▼ イージング関数を使って、現在のフレーム数からジャンプ中のY座標（jumpY）を求める

```
// ジャンプが始まってからのフレーム数
const jumpingFrameCount = p.frameCount - charaState.jumpStartFrame;
// 進捗度（ジャンプ開始=0 ... 終了=1）
const progress = p.constrain((jumpingFrameCount) / JUMP_DUR, 0, 1);
// 進捗度をイージング関数でジャンプの高さに変換
const easedProgress = progress < 0.5 
    ? Eases.expoOut(progress * 2)
    : (1 - Eases.bounceOut((progress - 0.5) * 2));
jumpY = easedProgress * JUMP_HEIGHT;
```

`eases`は0〜1の数値を渡すとイージングを適用した値を返してくれるだけのごくシンプルな関数を提供してくれるライブラリーです。これを使って、ジャンプの前半は`ExpoOut`で上昇し、後半は`BounceOut`で降下するようy座標を計算しています。

![イージング関数を使ってTweenアニメーションをつくる](https://ics.media/entry/210129/images/210129_tween_easing.png)

なお、p5.jsそのものとは関係ありませんが、この記事で紹介しているParcelを使った開発では、画像を読み込むためには以下のようにしてパスを`import`する必要があります。

▼ Parcel環境下で画像ファイルを読み込む

```
// 画像ファイル（SVG）のパスをまとめて取得
//@ts-ignore
import charaImg from './imgs/chara.svg'

const sketch = (p: p5) => {
  // Parcelがバンドルした画像をp5でロードする
  const chara = p.loadImage(charaImg);

  p.setup = () => {
    p.createCanvas(400, 400);
  };
  p.draw = () => {
    p.image(chara, 200, 200);
  };
};
```

※ この方法は簡易的にエラーを回避しつつ画像を読み込むためのもので、TypeScriptとしてベストな方法ではありません。より実践的なケースとしては、以前の記事[『最新版TypeScript+webpack 5の環境構築まとめ』内の「webpack+TypeScript+画像バンドルの最小構成」](https://ics.media/entry/16329/#webpack-ts-urlloader)に具体的な解説がありますので、興味のある方はご参照ください。

少し面倒な部分はありますが、画像を使うことで表現の幅が広がります。必要に応じて活用すると良いでしょう。

### まとめ：快適な環境でクリエイティブな開発を楽しもう

この記事ではクリエイティブコーディングの入門に適したライブラリーのひとつであるp5.jsを紹介し、好きなエディターとTypeScriptで快適にコーディングする方法を紹介しました。

ぜひご自身に合わせた最適な環境を作り、クリエイティブな作品作りを満喫してください。

#### 次のステップのための参考記事

クリエイティブコーディングの手法や技術を学びたい方へ：

-   [Adobe Flash作品から学ぶクリエイティブコーディングのテクニック](https://ics.media/entry/201113/)
-   [JavaScript開発に役立つ　重要なランダムの数式まとめ](https://ics.media/entry/11292/)
-   [君は使い分けられるか？　CSS/SVG/Canvasのビジュアル表現でできること・できないこと](https://ics.media/entry/200520/)

p5.js以外のアニメーションライブラリーを知りたい方へ：

-   [現場で使えるアニメーション系JSライブラリまとめ（2020年版）](https://ics.media/entry/14973/)
-   [最速のアニメーションライブラリはこれだ！　JSライブラリの性能をDOMとWebGLで比較検証](https://ics.media/entry/14993/)
-   [フロントエンドから始めるアニメーション　最強のライブラリGSAP3を手に入れよう](https://ics.media/entry/200805/)

VS Codeやバンドラーなど、環境構築を本格的に知りたい方へ：

-   [最新版TypeScript+webpack 5の環境構築まとめ](https://ics.media/entry/16329/)
-   [最新版で学ぶwebpack 5入門　JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
-   [VS Codeを使いこなせ!　フロントエンジニア必須の拡張機能7選](https://ics.media/entry/18544/)