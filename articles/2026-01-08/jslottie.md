---
title: "JSでLottieを配置する方法 - パフォーマンスの最適化方法も紹介！"
source: "https://ics.media/entry/240625/"
publishedDate: "2024-06-25"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://airbnb.io/lottie/#/)ロッティー」はベクター画像のアニメーションを実現できる技術・ファイルフォーマットです。

Lottieアニメーションの作り方編の記事（[Figma編](https://ics.media/entry/230913/)、[After Effects編](https://ics.media/entry/230928/)）では、Lottieの概要から作り方、ファイルの書き出し方を紹介しました。そして、実装編の[前編となる記事](https://ics.media/entry/240403/)では、HTMLメインで実装できるお手軽な実装方法を紹介しました。

実装編の後編となる本記事では、**JavaScriptメインに実装する方法の基本事項、およびパフォーマンス考慮についてのポイントを紹介**します。

「Lottie=軽い」と思っていませんか？　一般的にウェブサイトの「軽い」「重い」には、読み込みデータ量の大小を指す場合と、動作負荷でのもたつきを指す場合の2つの意味があります。確かに**データ量的にはLottieは軽いといえますが、実はLottieのアニメーションは表示や動作の負荷的に重くなりがち**です。本記事では、**動作負荷のもたつきとしての「重さ」を深掘り**してみます。ぜひ最後までご覧ください。

### lottie-webを使用した実装

今回は、LottieをUIに組み込んだデモを作成しました。Lottieの使用箇所に絞って解説します。

▼虫眼鏡をクリックしてアニメーションを確認（キーワードは未入力でも試せます）。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/)
-   ソースコードを確認する（[HTML](https://github.com/ics-creative/240603_lottie_part3/blob/main/docs/index.html), [JavaScript](https://github.com/ics-creative/240603_lottie_part3/blob/main/docs/index.js)）

#### ①ライブラリのインポート

[ドキュメント](https://github.com/airbnb/lottie-web?tab=readme-ov-file#html-player-installation)にしたがってライブラリをインポートします。

• CDNで読み込みたい場合

```
<script
  type="module"
  src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"
></script>
```

• パッケージマネージャーの場合

```
npm install lottie-web
```

#### ② 空のDOM要素を用意してid属性を追加

空のDOM要素を用意し、JavaScriptから参照するための`id`属性を追加しておきます。作例ではアイコンボタンとして表示するため、`button`要素内に空の`span`要素を用意しました。

```
<button>
  <span id="lottie"></span>
</button>
```

#### ③ `lottie.loadAnimation()`で初期化

用意したDOM要素の`id`を`container`フィールドに指定し、`path`にlottieデータのファイルパスを記載します。再生処理は手動で行うため、`autoplay: false`を追加しています。

```
const lottieContainer = document.querySelector("#lottie");

const anim = lottie.loadAnimation({
  container: lottieContainer,
  path: "./assets/search.json",
  autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
});
```

`lottie.loadAnimation()`に指定できる主要なオプションは次の通りです。全文は公式ドキュメントの『[loadAnimation-options](https://github.com/airbnb/lottie-web/wiki/loadAnimation-options)』をご覧ください。

オプション名

説明

container（必須）

lottieを差し込むDOM要素

path または animationData（どちらか必須）

path: ファイルのパス  
animationData: jsonオブジェクト

renderer（デフォルトは`svg`）

`svg` / `canvas` / `html` のいずれか

loop（デフォルトは`true`）

true: 無限ループ再生  
false: 1回だけ再生  
数値: 指定回数ループ再生

autoplay（デフォルトは`true`）

true: ロードされたら自動再生  
false: 自動再生はしない

initialSegment

再生するフレームの範囲指定。最初の値に開始フレーム、2番目の値に最終フレームを指定する。

#### ④アニメーションの操作

アニメーションインスタンスの[操作メソッド一覧](https://github.com/airbnb/lottie-web/wiki/Usage#animation-object)を参考にアニメーションを調整します。

※Lottieの再生に関連したメソッドは、アニメーションインスタンスに対して行うか、Lottieインスタンス（プロジェクト内のLottie全体）に対して行うかで、指定できるメソッドが少し異なりますのでご注意ください。

参考: [グローバルメソッド](https://github.com/airbnb/lottie-web/wiki/Usage#global-methods)

作例では、元のLottieがゆったりとしたスピード感のアニメーションデータだったため、`setSpeed()`メソッドで再生速度を調整しました。

```
anim.setSpeed(1.7); // 速めの再生速度に調整
```

また、ボタン押下時に呼び出す関数に、アニメーションの再生を管理する処理を追加しています。

`play()`メソッドでアニメーション再生を開始し、ランダムな秒数の待機後、`loop`プロパティを`false`に変更します。これで再生中だったアニメーションが完了したら自動で停止します。

```
const onSearch = async (anim) => {
  // アニメーション再生
  anim.loop = true; // ループ再生
  anim.play();

  // ローディング風にランダムな時間待機
  await wait(Math.random() * 5000);

  // アニメーションがループしないよう設定を変更（再生中のアニメーションが完了したら自動で停止）
  anim.loop = false;
};
```

#### ⑤Lottieのイベントに応じて処理を追加

[イベントリスナー](https://github.com/airbnb/lottie-web/wiki/Usage#events)もいくつか用意されているので追加してみましょう。アニメーションインスタンスに対して、`complete`イベントリスナーを追加すれば、アニメーション完了後に何かの処理を行うことができます。作例では、ローディング画面を非表示にする処理を記述しました。

```
anim.addEventListener("complete", () => {
  // アニメーション完了後に行う処理（一部省略）
  result.classList.remove("isLoading");
});
```

### Lottieのパフォーマンス最適化について

前述の作例のようにUIの一部として小さなパーツに組み込む分には、さほど問題はないように見えますが、演出としてウェブサイトに組み込む場合には、パフォーマンスの問題は切り離せません。

記事の冒頭でも触れたとおり、Lottieはファイル容量自体が数KBと軽量のため、ページ読み込み時のデータ容量的な軽さとしては優れているといえます。ですが、**アニメーションの再生・レンダリングは負荷がかかる**ため、ウェブサイトの動作的には重くなりがちです。

CPUの使用率が高く負荷がかかった状態だと、チラつきやフレームレートの遅延を招きます。ブラウザーによって見え方は異なりますが、Chromeの場合はフレームレートは保つものの一部が表示されず画面がバグっているように見える、Safariの場合はフレームレートが大幅に下がってカクついて見えるなどさまざまです。モバイル端末だとブラウザーが落ちることもあります。

ユーザー体験を損ねないためにも、最適化を行っておくことを推奨します。

具体的にいうと、描画が重くなる場合は以下の項目を検討するとよいでしょう。

-   **画面内に表示されないLottieは、アニメーションの再生を停止する**、もしくは**DOM要素を解放する**
-   マスクなどで表示されない部分に不要なパスデータは置かない
-   複雑なLottieデータの場合、**データに背景を含めておく**
-   **canvasレンダリングを検討する**

それでは詳しくポイントを見ていきます。

記事『[クリエイティブ表現のレベルアップに使える最新ブラウザーの開発者機能（パフォーマンス編）](https://ics.media/entry/201203/)』を参考に検証ツールの「Rendering」から、「Frame Rendering Stats（フレーム レンダリング統計情報）」と「Paint flashing（ペイント点滅）」のチェックを有効にしておきます。また、「Performance monitor」から「CPU usage（CPU使用状況）」等のチェックを有効にしておくと、さまざまな情報が確認できるのでオススメです。

### 検証１: Lottieアニメーション再生管理の最適化について

ひとつ目の検証に、メインビジュアルエリアを`position: sticky;`で固定させ、スクロールすると次のセクションが迫り上がってメインビジュアルが隠れるという構造のデモを用意しました。Lottieのレンダラーはデフォルトの`svg`です。結果は次の通りでした。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/test1-lottie-playing/)
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/docs/test1-lottie-playing)

何もしない場合

再生停止した場合

DOMを解放した場合

GPUメモリ

約100MB~111MB

約65MB~66MB

約22MB~24MB

CPU使用率

約15%~26%

約8%~15%

約9%~13%

検証環境：Chrome 126.0.6478.57 / macOS Sonoma 14.5 / MacBook Pro M1, 2020 / ブラウザーサイズ1920\*1080px（外付けモニター）

※アニメーションの再生フレームに応じてメモリ使用量が変動するため、目安程度にご覧ください。

#### 前提: 再生に関して何も最適化していない場合

スクロールするとメインビジュアルエリアのLottieアニメーションは本文セクションの**背景に隠れて表示されていないにもかかわらず、アニメーションの再生が止められていないため、CPUやGPUメモリをムダに使用している**ことがわかりました。「Paint flashing」で有効にした緑の矩形が絶え間なく動いていることから、リペイントが行われてしまっていることがわかります。

![何もケアしないと描画負荷がかかっている](https://ics.media/entry/240625/images/240625_lottie_web_default.png)

#### 再生を停止した場合

スクロールしメインビジュアルのLottieが隠れたあたりで、Lottieの再生を停止（`stop()`メソッドを実行）したところ、GPUメモリの使用量は50MB程度下がり、CPU使用率もやや下がり負荷が軽減されました。

一方でDOMを解放した場合と比較すると、DOM要素自体は存在しレンダリングが行われているため、ある程度はGPUメモリが使用されたままの状態であると推測できます。

#### DOMを解放した場合

`destroy()`メソッドでDOMを解放した場合も、GPUメモリの使用量とCPUの使用率共に負荷が下がる結果となりました。とくに、GPUメモリの使用量は、再生を停止した場合と比較しても格段に下がったといえそうです。

![再生停止かDOMの解放で描画負荷が改善される](https://ics.media/entry/240625/images/240625_lottie_web_stop.png)

頻繁に表示状態を切り替える必要がある場合は再生の停止を行い、頻繁に切り替える必要がない場合はDOMを解放する、など使い分けて調整を行うのがよいでしょう。

### 検証２： Lottieデータが複雑な場合

まず[ドキュメント](https://github.com/airbnb/lottie-web?tab=readme-ov-file#performance)にも記載されていますが、巨大なシェイプを使用して、その**一部だけをマスクして表示したり、完全に表示されないシェイプを残しておくのは避けた方がよい**でしょう。

AfterEffectsの拡張機能であるBodymovinからLottieを書き出す際、領域外の要素が見えないよう、`clip-path`が生成されます。クリップされることで見た目上はスッキリして見えますが、実際には要素は配置されたままの状態です。不必要に負荷がかからないよう、**アニメーションデータに必要なシェイプやパス以外が含まれないようにしておくことが重要**です。

#### 前提: Lottieのデータ自体が複雑な場合

表示するシェイプを整理した上で、Lottieのデータ自体が複雑な場合はどうでしょう。検証用に、After Effects内で適当にオブジェクトを複製し、背景が透過された総シェイプレイヤー数800枚程度のLottieデータをひとつ用意しました。ファイル容量は156KBです。

![複雑なデータのLottieは再生するだけで描画負荷がかかる](https://ics.media/entry/240625/images/240625_lottie_web_complex_data.webp)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240603_lottie_part3/test2-complex-lottie/) ※デモページはある程度描画負荷がかかります。閲覧の際はご注意ください。
-   [ソースコードを確認する](https://github.com/ics-creative/240603_lottie_part3/tree/main/docs/test2-complex-lottie)

目視での確認ですが、大きめのモニターで見るとアニメーションのフレーム内でパスが増える時（音符が出るあたり）に、GPUメモリが限界まで使用されるフレームがあり、画面がチラついて見えることがありました。リペイントについても広範囲で大量に行われていることがわかります。

このように**複雑なLottieは再生するだけ高い負荷がかかる**こともあります。

#### Lottieのデータに背景を含める

アニメーションデータに背景を入れてみるとどうでしょう。一番下のレイヤーに単色のシェイプを作成し確認したところ、背景要素のサイズのリペイントのみ行われるようになり、GPUメモリの使用量が下がって安定するようになりました。

背景なし

背景あり

GPUメモリ

約176MB~572.5MB

約101MB~168MB

CPU使用率

約48%~80%

約40%~70%

検証環境：Chrome 126.0.6478.57 / macOS Sonoma 14.5 / MacBook Pro M1, 2020 / ブラウザーサイズ1920\*1080px（外付けモニター）

![背景を含めて書き出した場合、描画負荷が改善される](https://ics.media/entry/240625/images/240625_lottie_web_bg_comparison.png)

アニメーションやLottieの使用箇所との相談になるかもしれませんが、背景を含めてしまった方が軽くなる場合もあるようです。ファイル容量的には、背景を含めた場合のデータは1KBだけ重くなりましたが、そもそものLottieファイルの容量が軽量なので問題ないといえるでしょう。

#### レンダラーをcanvasにする

実装としてはレンダリング方式をcanvasに変更することも有効です。GPUメモリの使用量を見てみると格段に改善されたことがわかります。

SVG

canvas

GPUメモリ

約176MB~572.5MB

1.3MB

CPU使用率

約48%~80%

約39%~60%

検証環境：Chrome 126.0.6478.57 / macOS Sonoma 14.5 / MacBook Pro M1, 2020 / ブラウザーサイズ1920\*1080px（外付けモニター）

![canvasレンダリングにした場合、描画負荷が改善される](https://ics.media/entry/240625/images/240625_lottie_web_renderer_comparison.png)

Canvasで描画する場合はラスター形式に変換されるため、拡大してもくっきり見えるというベクター形式の利点はありませんが、普通に見る分には問題なさそうな感触です。

#### 補足: グラデーションについて

複雑なLottieのデータにアニメーションするグラデーションの背景を合わせたデータで確認を行いました。前述の通り、Lottieのデータに背景の矩形を含めているため、リペイント領域である緑の矩形自体は少ないですが、フレームレートが目に見えて落ちてしまっています。こういった場合はcanvasレンダリングにすると良いと判断できそうです。

SVG

canvas

GPUメモリ

201.8MB

1.3MB

FPS

約33.6fps~34.8fps

60fps

検証環境：Chrome 126.0.6478.57 / macOS Sonoma 14.5 / MacBook Pro M1, 2020 / ブラウザーサイズ1920\*1080px（外付けモニター）

注意点としては、描画形式が変わるためグラデーションがうまく変換されず、意図した通りに描画できないこともあるようでした。円形グラデーションなどはアニメーションデータの調整が必要です。

![グラデーションを含んだデータのレンダリング比較](https://ics.media/entry/240625/images/240625_lottie_web_gradient_comparison.png)

※キャプチャの際にも負荷がかかるため、検証時より若干数値がずれています。

### まとめ

JavaScriptメインで実装する方法からパフォーマンスを考慮した最適化の方法までを紹介しました。

アニメーションの作り方編では、FigmaやAfter Effectsを使用した作成方法を紹介し、実装編では、HTMLで配置できるWeb PlayerとJSで配置するlottie-webを使用したウェブ向けの実装方法を紹介しました。

今回Lottieのデータの作成から実装まで調査を行ってみて、デザインツールから手軽に組み込む方法が充実し、実装においても敷居が低く、リッチな体験を作ることができる素晴らしい技術だと感じました。それと同時に、パフォーマンスが悪くなってしまうとユーザー体験を損ないかねないので、Lottieを最大限活かすために、アニメーションデータ作成時や実装時のケアを行う重要性がわかりました。

デザインと実装を分担できるようになったとはいえ、相互に知っておくことは重要といえるのではないでしょうか。よりよいコンテンツを作る足掛かりになれば幸いです。

#### 参考サイト

-   [airbnb/lottie-web](https://github.com/airbnb/lottie-web)
-   [What are the differences between the web HTML, SVG, and Canvas rendered? – LottieFiles Support](https://help.lottiefiles.com/hc/en-us/articles/14942437475481-What-are-the-differences-between-the-web-HTML-SVG-and-Canvas-rendered)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)
    -   [After Effects編](https://ics.media/entry/230928/)
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)（本記事）