---
title: "JSでLottieを配置する方法 - パフォーマンスの最適化方法も紹介！"
source: "https://ics.media/entry/240625/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2024-06-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://lottiefiles.com/jp/)ロッティー」はベクター画像のアニメーションを実現できる技術・ファイルフォーマットです。

Lottieアニメーションの作り方編の記事（[Figma編](https://ics.media/entry/230913/)、[After Effects編](https://ics.media/entry/230928/)）では、Lottieの概要から作り方、ファイルの書き出し方を紹介しました。そして、実装編の[前編となる記事](https://ics.media/entry/240403/)では、HTMLメインで実装できるお手軽な実装方法を紹介しました。

実装編の後編となる本記事では、**JavaScriptメインに実装する方法の基本事項、およびパフォーマンス考慮についてのポイントを紹介**します。

「Lottie=軽い」と思っていませんか？　一般的にウェブサイトの「軽い」「重い」には、読み込みデータ量の大小を指す場合と、動作負荷でのもたつきを指す場合の2つの意味があります。確かに**データ量的にはLottieは軽いといえますが、実はLottieのアニメーションは表示や動作の負荷的に重くなりがち**です。本記事では、**動作負荷のもたつきとしての「重さ」を深掘り**してみます。ぜひ最後までご覧ください。

### dotLottie-webを使用した実装

今回は、LottieをUIに組み込んだデモを作成しました。Lottieの使用箇所に絞って解説します。

▼虫眼鏡をクリックしてアニメーションを確認（キーワードは未入力でも試せます）。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/simple-search/index.html)
-   ソースコードを確認する（[HTML](https://github.com/ics-creative/240603_lottie_part3/blob/main/src/simple-search/index.html), [JavaScript](https://github.com/ics-creative/240603_lottie_part3/blob/main/src/simple-search/index.js)）

#### ①ライブラリのインポート

[ドキュメント](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/getting-started/installation)にしたがってライブラリをインポートします。

CDNで読み込みたい場合は、JSの冒頭でCDNから`DotLottie`をimportします。

```
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";
```

パッケージマネージャーの場合は、dotLottieをインストールし、JSの冒頭で`DotLottie`をimportします。

```
npm install @lottiefiles/dotlottie-web
```

```
import { DotLottie } from "@lottiefiles/dotlottie-web";
```

#### ② 空のDOM要素を用意してid属性を追加

dotLottie-webは`canvas`要素に描画します。JavaScriptから参照するための`id`属性を`canvas`要素に追加しておきます。作例ではアイコンボタンとして表示するため、`button`要素内に用意しました。

```
<button>
  <canvas id="lottie" class="lottie"></canvas>
</button>
```

#### ③ `new DotLottie`で初期化

アニメーションのインスタンスを`new DotLottie()`で作成します。

-   canvas: 用意した`canvas`要素を渡します。
-   src: lottieデータのファイルパスを記載します。
    -   デモではビルドツールであるViteヴィートを使用してファイルをimportしています。
-   autoplay: 再生処理は手動で行うため、`false`にしています。

```
import search from "@/assets/search.lottie";

const lottieContainer = document.querySelector("#lottie");

const anim = new DotLottie({
  canvas: lottieContainer,
  src: search,
  autoplay: false, // 自動再生はしない（デフォルトはfalse。省略可）
});
```

初期化時に指定できる主要なオプションは次の通りです。全文は公式ドキュメントの『[dotLottie Web Player API Reference](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference)』をご覧ください。

オプション名

説明

canvas（必須）

lottieを差し込むcanvas要素

src または data

path: ファイルのパス  
data: jsonオブジェクト

loop（デフォルトは`false`）

true: 無限ループ再生  
false: 1回だけ再生

autoplay（デフォルトは`false`）

true: ロードされたら自動再生  
false: 自動再生はしない

segment

再生するフレームの範囲指定。最初の値に開始フレーム、2番目の値に最終フレームを指定する。

#### ④アニメーションの操作

アニメーションインスタンスの[操作メソッド一覧](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference#methods)を参考にアニメーションを調整します。

作例では、元のLottieがゆったりとしたスピード感のアニメーションデータだったため、`setSpeed()`メソッドで再生速度を調整しました。

```
anim.setSpeed(1.7); // 速めの再生速度に調整
```

また、ボタン押下時に呼び出す関数に、アニメーションの再生を管理する処理を追加しています。

`play()`メソッドでアニメーション再生を開始し、ランダムな秒数の待機後、`loop`プロパティを`false`に変更します。これで再生中だったアニメーションが完了したら自動で停止します。

```
const onSearch = async (anim) => {
  // アニメーション再生
  anim.setLoop(true); // ループ再生
  anim.play();

  // ローディング風にランダムな時間待機
  await wait(Math.random() * 5000);

  // アニメーションがループしないよう設定を変更（再生中のアニメーションが完了したら自動で停止）
  anim.setLoop(false);
};
```

#### ⑤Lottieのイベントに応じて処理を追加

[イベントリスナー](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference#event-listeners)もいくつか用意されているので追加してみましょう。アニメーションインスタンスに対して、`complete`イベントリスナーを追加すれば、アニメーション完了後に何かの処理を行うことができます。作例では、ローディング画面を非表示にする処理を記述しました。

```
anim.addEventListener("complete", () => {
  statusText.innerText = "検索完了";
});
```

### Lottieのパフォーマンス最適化について

前述の作例のようにUIの一部として小さなパーツに組み込む分には、さほど問題はないように見えますが、演出としてウェブサイトに組み込む場合には、パフォーマンスの問題は切り離せません。

記事の冒頭でも触れたとおり、Lottieはファイル容量自体が数KBと軽量のため、ページ読み込み時のデータ容量的な軽さとしては優れているといえます。ですが、**アニメーションの再生・レンダリングは負荷がかかる**ため、ウェブサイトの動作的には重くなりがちです。

CPUやGPUに負荷がかかった状態だと、チラつきやフレームレートの遅延を招きます。ブラウザーによって見え方は異なりますが、Chromeの場合はフレームレートは保つものの一部が表示されず画面がバグっているように見える、Safariの場合はフレームレートが大幅に下がってカクついて見えるなどさまざまです。モバイル端末だとブラウザーが落ちることもあります。

ユーザー体験を損ねないためにも、最適化を行っておくことを推奨します。

具体的にいうと、描画が重くなる場合は以下の項目を検討するとよいでしょう。

-   画面内に表示されないLottieはアニメーションを破棄する
-   ウェブワーカーを使用しバックグラウンドのスレッドで実行する
-   WebGPUを使用し描画の負荷を下げる

それでは詳しくポイントを見ていきます。

記事『[クリエイティブ表現のレベルアップに使える最新ブラウザーの開発者機能（パフォーマンス編）](https://ics.media/entry/201203/)』を参考に検証ツールの「Rendering」から、「Frame Rendering Stats（フレーム レンダリング統計情報）」と「Paint flashing（ペイント点滅）」のチェックを有効にしておきます。また、「Performance monitor」から「CPU usage（CPU使用状況）」等のチェックを有効にしておくと、さまざまな情報が確認できるのでオススメです。

### 検証１: Lottieアニメーション管理の最適化について

ひとつ目の検証に、メインビジュアルエリアを`position: sticky;`で固定させ、スクロールすると次のセクションが迫り上がってメインビジュアルが隠れるという構造のデモを用意しました。結果は次の通りでした。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/optimization/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/src/optimization)

何もしない場合

アニメーションを破棄した場合

GPUメモリ

約16.2MB

約16.2MB

CPU使用率

約60%~99%

約27.5%~90%

検証環境：Chrome 148.0.7778.216 / macOS 26.5.1 / MacBook Air M1, 2020 / ブラウザーサイズ1920\*1080px（外付けモニター）

※アニメーションの再生フレームに応じてメモリ使用量が変動するため、目安程度にご覧ください。

#### 前提: 再生に関して何も最適化していない場合

スクロールするとメインビジュアルエリアのLottieアニメーションは本文セクションの**背景に隠れて表示されていないにもかかわらず、アニメーションの再生が止められていないため、CPUをムダに使用している**ことがわかりました。「Paint flashing」で有効にした緑の矩形では、背景側のアニメーションがペイントされているのがわかります。

![何もケアしないと描画負荷がかかっている](https://ics.media/entry/240625/images/240625_lottie-paint.png)

#### アニメーションを破棄した場合

スクロールしメインビジュアルのLottieが隠れたあたりで、`destroy()`メソッドでアニメーションを破棄しました。CPU使用率が減少し、負荷が下がったことが確認できます。

[公式ドキュメントのdestroyの説明](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference#lifecycle)では、`destroy()`メソッドはレンダラーのインスタンスを破棄し、登録されているすべてのイベントリスナーを解除するとあります。

また、[公式ドキュメントのMemory Managementの章](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/performance#memory-management)でも、複数アニメーションを破棄する方法が紹介されています。

### 検証２： Lottieデータが複雑な場合

Lottieのデータ自体が複雑な場合はどうでしょう。検証用に、After Effects内で適当にオブジェクトを複製し、総シェイプレイヤー数800枚程度のLottieデータを用意しました。ファイルは`.lottie`形式のためわずか18KBと軽量です。

```
import { DotLottie } from "@lottiefiles/dotlottie-web";
import animation from "@/assets/complex-anim.lottie";

// 省略

const canvas = document.createElement("canvas");
const anim = new DotLottie({
  canvas: canvas,
  src: animation,
  autoplay: true,
  loop: true,
  renderConfig: {
    devicePixelRatio: window.devicePixelRatio * 0.75,
  },
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/complex-default/index.html) ※デモページはある程度描画負荷がかかります。閲覧の際はご注意ください。
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/src/complex-default)

大きめのモニターで見るとアニメーションがカクついて表示されました。フレームレートは10fps前後、CPU使用率は常時ほぼ100%まで上がっています。このように**複雑なLottieは再生するだけ高い負荷がかかる**こともあります。

![複雑なデータ](https://ics.media/entry/240625/images/240625_default.png)

#### ウェブワーカーを使用する

[LottieFilesのパフォーマンス最適化のドキュメント](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/performance#web-worker-usage)では、ウェブワーカーを使用した`DotLottieWorker`が紹介されています。

負荷の重いアニメーションの描画をメインスレッドから分けることで、パフォーマンスの向上が期待できます。`DotLottie`を`DotLottieWorker`で置き換えるだけで簡単に実装できます。

```
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

// 省略

const anim = new DotLottieWorker({
  // 省略
  renderConfig: {
    freezeOnOffscreen: false, // offscreenで描画がstopするのを防ぐために設定。これがないと描画されない
  },
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/complex-webworker/index.html) ※デモページはある程度描画負荷がかかります。閲覧の際はご注意ください。
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/src/complex-webworker)

フレームレートは20fps前後に向上。CPU使用率が0.1%に減少しました。アニメーションのカクつきが多少改善されたことがわかります。

![複雑なデータ(ウェブワーカー)](https://ics.media/entry/240625/images/240625_webworker.png)

#### WebGLを使用する

`DotLottie`はデフォルトではcanvas 2Dを使用して描画していますが、WebGLに対応したものもあります。canvas 2DはCPUを使用して描画するのに対し、WebGLはGPUを活用し、ブラウザのレンダリングを高速に実行できます。

```
import { DotLottie } from "@lottiefiles/dotlottie-web/webgl";

// 省略

const anim = new DotLottie({
  // 省略
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/complex-webgl/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/src/complex-webgl)

フレームレートは60fpsに向上し、アニメーションが滑らかに表示できました。

![複雑なデータ(WebGL)](https://ics.media/entry/240625/images/240625_webgl.png)

#### WebGPUを使用する

WebGLよりさらにGPUを効率的に使うのがWebGPUです。WebGLよりもさらにパフォーマンスをあげたい時に検討しましょう。WebGPUについて詳しく知りたい方は記事『[次世代のWebGPUの可能性 WebGLと比較して理解する描画機能の違い](https://ics.media/entry/18507/)』をご確認ください。

```
import { DotLottie } from "@lottiefiles/dotlottie-web/webgpu";

// 省略

const anim = new DotLottie({
  // 省略
});
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/complex-webgpu/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/src/complex-webgpu)

フレームレートは60fpsで安定しています。アニメーションも滑らかです。

![複雑なデータ(WebGPU)](https://ics.media/entry/240625/images/240625_webgpu.png)

### まとめ

JavaScriptメインで実装する方法からパフォーマンスを考慮した最適化の方法までを紹介しました。

アニメーションの作り方編では、FigmaやAfter Effectsを使用した作成方法を紹介し、実装編では、HTMLで配置できるWeb PlayerとJSで配置するdotLottie-webを使用したウェブ向けの実装方法を紹介しました。

今回Lottieのデータの作成から実装まで調査を行ってみて、デザインツールから手軽に組み込む方法が充実し、実装においても敷居が低く、リッチな体験を作ることができる素晴らしい技術だと感じました。それと同時に、パフォーマンスが悪くなってしまうとユーザー体験を損ないかねないので、Lottieを最大限活かすために、実装時のケアを行う重要性がわかりました。

デザインと実装を分担できるようになったとはいえ、相互に知っておくことは重要といえるのではないでしょうか。よりよいコンテンツを作る足掛かりになれば幸いです。

#### 参考サイト

-   [LottieFiles](https://docs.lottiefiles.com/en)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)
    -   [After Effects編](https://ics.media/entry/230928/)
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)（本記事）