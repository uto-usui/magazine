---
title: "デザインとHTMLのズレを検出！ Node.jsとPuppeteer活用のビジュアル校正テストで実装時のケアレスミスを防ぐ"
source: "https://ics.media/entry/220331/"
publishedDate: "2022-03-31"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2022年3月31日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブ制作において、デザインとHTML実装の一致はエンジニアとして当然求められるものです。とはいえ、デザインツールとブラウザ画面をにらめっこしながら確認するのも大変です。本記事ではNode.jsで動くヘッドレスブラウザのPuppeteerパペティアーを使ってデザインとのズレを検知する**ビジュアル校正テスト**の方法を紹介します。

![実行している様子](https://ics.media/entry/220331/images/220331_proofreading.gif)

ウェブ業界ではデザイン制作とHTML制作が分業である場合がほとんどです。ビジュアル校正テストを導入することで、HTML制作の品質向上に役立てられます。デザインとHTML実装が別の会社のようなプロジェクトでは、HTML実装時の品質保証の担保になりますし、デザイナーとフロントエンドエンジニアが近い組織でもコミュニケーション円滑化に役立つでしょう。ICSではビジュアル校正テストを以前から導入しており、効率的で正確なHTML制作に役立てています。

![デザイン画像と実装の差分](https://ics.media/entry/220331/images/220331_design_and_diff.png)

### ビジュアルリグレッションテストとの違い

UIのテストといえば、ビジュアルリグレッションテスト（VRT）があります。ビジュアルリグレッションテストは、作業の前後での画面表示をスクリーンショットに撮り、差分を検出します。意図しない差分や先祖返りを発生させてしまっていないかを差分から発見できます。とくにCI（Continuous Integration、継続的インテグレーション）と組み合わせて、開発の要所要所で自動実行し、堅実で安全な開発を築けるでしょう。

今回紹介するビジュアル校正テストはビジュアルリグレッションテストとの少し趣向の違うものです。ビジュアルリグレッションテストがリグレッション（回帰・後退）というように、開発中の無用な見た目の変更を防ぐことを主眼にしています。

さまざまなビジュアルリグレッションテストのツールがありますが、画面上の差分がないかをチェックします。比較するのは**前の実装された画面と新規の実装された画面**です。

対して、ビジュアル校正テストが比較するのは**デザイン画**と**実装された画面**です。デザインの画像データと実装された画面を比較してきちんとデザインと合致しているか確認します。デザインと実装された画面がきちんと一致していることを確認し、ビジュアルリグレッションテストでデグレが発生しないことをチェックするとより堅い開発が行えるのではないでしょうか。

![ビジュアルリグレッションテストとの違い。デザインデータとの差分を見るのがデザイン校正](https://ics.media/entry/220331/images/220331_vrt.png)

### ビジュアル校正ツール

それでは実際のビジュアル校正ツールのコードを紹介します。[Puppeteer](https://pptr.dev/)はコマンドラインで操作できるChromiumベースのブラウザです。通常のブラウザとは異なり、ウインドウUIがない状態でも動作するので、ヘッドレスブラウザと呼ばれています。PuppeteerはNode.jsとJavaScriptで操作でき、ウェブページにアクセスし疑似的なユーザー操作をシミュレーションしたり、スクリーンショットを撮影することができます。

仕組みとしては、Puppeteerでページをスクリーンショットを撮り、それを画像編集ライブラリのsharpを用いてデザイン画像と比較・差分を検出します。

-   [デモ全体のコードを確認する](https://github.com/ics-creative/220331_visual_proofreading_tool)

このデモは`localhost:8080`でローカルサーバーを起動してサイトを閲覧できる環境を想定していますが、ウェブサーバー上にあるサイトや`file://`でアクセスできるローカルファイルでも実行可能です。

デモを試す場合は、リポジトリからクローンし各種ライブラリをインストールし、あらかじめ`html`フォルダーで`npm run build`コマンドでビルドしてください。

デモを試す手順は以下の通りです。

1.  Node.jsをインストールされたマシンで、リポジトリからダウンロードします。
2.  `html`フォルダーと`visual-proofreading-test`フォルダーのそれぞれで、コマンドラインで`npm install`を実行します。
3.  `html`フォルダーで`npm run build`コマンドでビルドします。
4.  `html`フォルダーで`npm run serve`コマンドでウェブサーバーを立ち上げます。
5.  `visual-proofreading-test`フォルダーで`npm run visual-proofreading-test`コマンドを実行します。

こちらがコード全体です。

-   [コードを確認する](https://github.com/ics-creative/220331_visual_proofreading_tool/blob/main/visual-proofreading-test/test-config.mjs)

▼test-config.mjs（設定ファイル）

```
// デザイン画像が格納しているディレクトリ
export const DESIGN_DIR = "./design";

// スクリーンショットを格納するディレクトリ
export const SCREENSHOT_DIR = "./screenshot";

// 差分ファイルを出力する格納するディレクトリ
export const DIFF_DIR = "./diff";

// 実装したもののURL
export const CAPTURE_URL = "http://localhost:8080";

// ブラウザのビューポートサイズ。デザイン画像の横幅と、デザインで想定されている画面高さを入力するとよいです
export const VIEW_PORT = { width: 1280, height: 720 };

// テスト設定。デザイン画像とスクリーンショットを撮るパスを記述する
export const testSettings = [
  {
    design: "top.png",
    capturePath: "/",
  },
  {
    design: "about.png",
    capturePath: "/about/",
  },
  {
    design: "works.png",
    capturePath: "/works/",
  },
];
```

-   [コードを確認する](https://github.com/ics-creative/220331_visual_proofreading_tool/blob/main/visual-proofreading-test/visual-proofreading-test.mjs)

▼visual-proofreading-test.mjs（テスト本体）

```
import puppeteer from "puppeteer";
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import {
  CAPTURE_URL,
  DESIGN_DIR,
  DIFF_DIR,
  SCREENSHOT_DIR,
  testSettings,
  VIEW_PORT,
} from "./test-config.mjs";

(async () => {
  // 出力先フォルダーがなければ作成
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR);
  }
  if (!existsSync(DIFF_DIR)) {
    mkdirSync(DIFF_DIR);
  }

  // Puppeteer起動
  const browser = await puppeteer.launch();

  // 設定ごとに実行
  for (const { design, capturePath } of testSettings) {
    // デザイン画像へのパス
    const designFilePath = `${DESIGN_DIR}/${design}`;

    // デザイン画像のファイル名取得
    const designFileName = path.parse(designFilePath).name;

    // スクリーンショットの格納先とファイル名
    const screenshotFilePath = `${SCREENSHOT_DIR}/screenshot_${designFileName}.png`;

    // Puppeteerの設定
    const page = await browser.newPage();
    await page.setViewport(VIEW_PORT);
    await page.goto(`${CAPTURE_URL}${capturePath}`);

    // ページ全体のスクリーンショット撮影
    await page.screenshot({
      path: screenshotFilePath,
      fullPage: true,
    });

    const designImage = sharp(designFilePath);
    const designImageMetaData = await designImage.metadata();

    const screenshotImage = sharp(screenshotFilePath);

    // デザイン画像のサイズ取得
    const designImageSize = {
      width: designImageMetaData.width,
      height: designImageMetaData.height,
    };

    // スクリーンショット画像をデザイン画像のサイズにリサイズ
    const resizedScreenshot = await screenshotImage
      .resize({
        width: designImageSize.width,
        height: designImageSize.height,
        fit: null,
        position: "left top",
        withoutEnlargement: true,
      })
      .toBuffer();

    // デザイン画像とスクリーンショットを重ねて差の絶対値で差分を検出
    const difference = await designImage
      .composite([
        {
          input: resizedScreenshot,
          blend: "difference",
          gravity: "northwest",
        },
      ])
      .toBuffer();

    // わかりやすいよう白黒反転し、ファイル出力
    await sharp(difference)
      .negate({ alpha: false })
      .toFile(`${DIFF_DIR}/diff_${design}.png`);
  }

  await browser.close();
})();
```

基本的には設定ファイルを自身の環境に合わせて書き換えれば実行できます。

簡単に上記コードのポイントを解説していきます。

```
// Puppeteer起動
const browser = await puppeteer.launch();
```

まず、ヘッドレスブラウザのPuppeteerを起動します。以後は変数`browser`から各種Puppeteerのメソッドを使って操作します。

```
// Puppeteerで該当URLまで移動
const page = await browser.newPage();
await page.setViewport(VIEW_PORT);
await page.goto(`${CAPTURE_URL}/${capturePath}`);

// ページ全体のスクリーンショット撮影
await page.screenshot({
  path: screenshotFilePath,
  fullPage: true,
});
```

`newPage()`メソッドを使っていわゆるタブを開き、`setViewport()`メソッドでビューポートの設定をします。ビューポートサイズは横幅はデザイン画像と同じ横幅、高さはデザインが想定している高さ（たとえば画面全体表示を意図している部分の高さ）を設定するといでしょう。`goto()`メソッドを使って当該URLへ移動します。

移動したら`screenshot()`メソッドでスクリーンショットを撮影します。引数の`fullPage`プロパティ`true`を渡すことで、ページ全体を撮影してくれます。`false`にすれば設定したビューポート内だけを撮ります。`path`プロパティにはスクリーンショットを保存したいパスを渡します。

```
// デザイン画像のサイズ取得
const designImageSize = {
  width: designImageMetaData.width,
  height: designImageMetaData.height,
};
```

つづいて、比較元のデザイン画像から、`sharp`ライブラリを用いて画像サイズを取得します。これは次のリサイズ処理のためです。

```
// スクリーンショット画像をデザイン画像のサイズにリサイズ
const resizedScreenshot = await screenshotImage
  .resize({
    width: designImageSize.width,
    height: designImageSize.height,
    fit: null,
    position: "left top",
    withoutEnlargement: true,
  })
  .toBuffer();
```

スクリーンショット画像をデザイン画像のサイズに合わせます。リサイズ処理を行うのは、重ね合わせ処理の際、比較元よりスクリーンショット画像が大きいとエラーになってしまうためです。デザイン画像より大きい場合は、その分切り取られる設定です。

```
// デザイン画像とスクリーンショット画像を重ねて差の絶対値で差分を検出
const difference = await designImage
  .composite([
    {
      input: resizedScreenshot,
      blend: "difference",
      gravity: "northwest",
    },
  ])
  .toBuffer();
```

デザイン画像、スクリーンショット画像を`sharp`ライブラリの`composite()`関数で重ね合わせます。ブレンドの指定を差の絶対値にすることで、**合致している部分は黒く、合致していない部分はその差だけ色づき**ます。

```
// わかりやすいよう白黒反転し、ファイル出力
await sharp(difference)
  .negate({ alpha: false })
  .toFile(`${DIFF_DIR}/diff_${design}.png`);
```

重ね合わせたことで差分を可視化できますが、黒ベースの画像になるのでわかりにくいです。そこでさきほどの差分画像の色相を反転させて白ベースの画像に変換します。この反転処理をすると合致している部分は白くなるので、差分だけが色がつきより直感的になります。これを設定ファイルで指定した出力フォルダーにPNGデータとして出力して終わりです。

出力フォルダーには下記のような差分がわかる画像があります。

![各ページの差分。画像の縦位置のズレが可視化されている](https://ics.media/entry/220331/images/220331_diff.png)

#### 高度な使い方

シンプルな設定を紹介しましたが、サイトによってはアニメーションやスクロールによって発火する表現もあります。たとえば、[弊社のコーポレートサイト](https://ics-web.jp/)はスクロール演出を実装しています。このサイトでビジュアル校正テストを行うと下記画像のような真っ黒なスクリーンショットが撮影されてしまいます。これは、上記の設定ではアクセス時のスクリーンショットを撮影しているので、アニメーションが開始する前であったり、スクロールによって発火前の状態であったりするためです。

![アニメーションのあるページのスクリーンショット。アクセス時にはアニメーションが開始されていないので、真っ暗な画像になっている](https://ics.media/entry/220331/images/220331_animation.png)

それらへ対応するため、Puppeteerの設定を少し追加します。

-   [コードを確認する](https://github.com/ics-creative/220331_visual_proofreading_tool/blob/main/visual-proofreading-test/advanced-visual-proofreading-test.mjs)

```
await page.goto(`${CAPTURE_URL}${capturePath}`);

// 5000ミリ秒（＝5秒）待機
await page.waitForTimeout(5000);

// ページ全体のスクリーンショット撮影
await page.screenshot({
  path: screenshotFilePath,
  fullPage: true,
});
```

`waitForTimeout()`メソッドを使うと指定した時間（ミリ秒）待機します。ページアクセス時に文字が現れる表現などがある場合、待機することでアニメーション終了後の状態を撮影できます。

```
await page.goto(`${CAPTURE_URL}${capturePath}`);

// 下に99999px移動する
await page.evaluate(() => {
  scroll(0, 99999);
});

await page.waitForTimeout(2000);

// ページ全体のスクリーンショット撮影
await page.screenshot({
  path: screenshotFilePath,
  fullPage: true,
});
```

`evaluate()`メソッドを使うとページ内でJavaScriptを実行できます。今回はスクロールさせる`scroll`メソッドを実行しています。一番下まで移動させてスクロールアニメーションを発火させます。そのアニメーションの完了を2秒ほど待ってから撮影します。

なお固定ヘッダーなどの場合、ビューポートが一番下にきた状態で撮影するのでヘッダー位置がスクリーンショット画像の下部にきています。それを直すために一番上へ戻しておくのもよいでしょう。

```
scroll(0, 99999);
setTimeout(() => {
  scroll(0, 0);
}, 200);
```

※下部に移動後、少し時間を持たせないとスクロール判定の発火しないことがあるので、`setTimeout()`関数で200ミリ秒の時間をもたせてから戻す処理を実行しています。

Puppeteerの各種メソッドを利用してページの状態を変更させることでデザインの意図した状態を再現できます。

### ビジュアル校正テストでの弱点

高度な使い方でも紹介したように、スクロールで発火のようなインタラクティブな要素は苦手としています。パララックスはスクリーンショット撮影時に意図しない位置にある可能性があります。

クリックで表示される要素なども、Puppeteerの`evaluate()`メソッド内でイベント発火などで再現できるとは思いますが、テスト設定自体に工数が多くかかる可能性があります。デザインやサイトの性質に合わせて採用を吟味する必要があるでしょう。

また、このテストは実行時間が一瞬とは言えません。ページ数が増えたり、前述のアニメーションのための待機時間などがあるとそれなりの時間がかかります。高い頻度での実行は開発体験を損なわせたり、（CIに組み込んで実行した場合）実行時間増加による請求額が増えたりといったことも考えられます。区切りのついたタイミングで行うのがよいです。

### ビジュアル校正テストの目指したいところ

ビジュアル校正テストはデザインとの差分を検出しますが、一方でHTML・ブラウザの仕様などさまざまな制約でデザインと完全一致できない部分も生じるのも事実です。ピクセル単位で一致している必要があるかはSNSの議論（※）に任せますが、明らかな余白の間違い・色の指定ミスなどはHTML実装時に気づいておきたい点です。

そうしたケアレスミスを気づけるようにするのがこのテストの目的です。逆にどうしても一致できない部分はその説明を補足することで、デザイナーにも単なるミスではなく実装上の制約であることを伝えやすいでしょう。

HTMLコーダーの方には、Google Chromeの拡張機能「[Perfect Pixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=ja)」を利用している方も多いでしょう。拡張機能も便利ですが、ビジュアル校正テストの強みは自動化と、大量のページでもワンクリックで実行できることです。ビジュアルリグレッションテスト同様、CIと連携することで要所でデザインとの差分を確認できます。また、差分画像として出力されるのでどこがズレているか視覚的に具体化でき、ズレている画像は開発者の修正の手助けに、ズレのない画像は品質保証として使えるでしょう。

ビジュアル校正テストを使ってムダな指摘や修正作業を防ぎ、より円滑なコミュニケーションと開発につながれば幸いです。

※[ピクセルパーフェクトは必要なのか？ HTMLコーダーの考え方まとめ - Togetter](https://togetter.com/li/1595233)