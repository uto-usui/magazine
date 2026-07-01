---
title: "HTMLでLottieを配置する方法"
source: "https://ics.media/entry/240403/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2024-04-04"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://lottiefiles.com/jp/)ロッティー」はベクター画像のアニメーションを実現できる技術・ファイルフォーマットです。

Lottieアニメーションの作り方編の記事（[Figma編](https://ics.media/entry/230913/)、[After Effects編](https://ics.media/entry/230928/)）では、Lottieの概要から作り方、ファイルの書き出し方までを紹介しました。本記事では、Lottieアニメーションの実装方法について紹介します。

Lottieの組み込みはプラットフォームに応じたさまざまな実装方法が用意されていますが、一般的なウェブの方法を例に紹介します。実装編の前編となる本記事では、**手軽に組み込むことができる[Web Player](https://lottiefiles.com/web-player)ツールを使用**して実装します。

### アニメーションの実装

ウェブ向けの実装方法は大きく2パターンあります。HTMLメインの方法と、JavaScriptメインで実装する方法です。

-   HTMLメインで実装：[dotLottie-wc](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-wc/)
    
    -   後述する「dotLottie-web」をウェブコンポーネントにしたライブラリー。再生方法の調整など簡単な制御を行えます。
    -   特長: HTMLメインで手軽に導入できます。
-   JavaScriptで実装：[dotLottie-web](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/)
    
    -   `new DotLottie()`でインスタンスを作成して使用します。
    -   特長: JavaScriptメインで再生タイミングやパフォーマンスなど細かく制御できます。

### Web Playerツールを使用した実装

まずはコピペでできる、組み込み方法を紹介します。もっとも簡単なのが[Web Player](https://lottiefiles.com/web-player)のツールからスニペットをコピーしHTMLに貼り付ける方法です。

アニメーションのパラメーターを調整し、プレーヤーの形式を選択してから［Copy Code］ボタンでコードをコピーします。HTMLのbodyタグにスニペットを貼り付ければLottieが再生されます。

※Lottieのファイル形式の違いについては、記事『[最新版！ Lottieアニメーションの作り方 - Figma編](https://ics.media/entry/230913/)』にて紹介していますので参照ください。

![Web Player](https://ics.media/entry/240403/images/240403_web-player.png)

```
<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc src="https://lottie.host/06c37f83-9f5d-46fb-abf9-55ea333c65ac/psTxfqLKed.lottie" speed="1" style="width: 300px; height: 300px" mode="forward" loop autoplay></dotlottie-wc>
```

### コードベースで実装する

続いて、より詳しく内容を理解したい方、アニメーションを細かく調整したいといった方向けに、一からコードベースで実装する手順を紹介します。

#### ①ライブラリのインポート

[ドキュメント](https://www.npmjs.com/package/@lottiefiles/dotlottie-wc)にしたがってdotLottie-wcのライブラリをインポートします。

-   CDNで読み込みたい場合

```
<script type="module" src="https://unpkg.com/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js"></script>
```

-   パッケージマネージャーの場合

```
npm install @lottiefiles/dotlottie-wc
```

#### ②`dotlottie-wc`タグを記述し、`src`にLottieのパスを指定

```
<dotlottie-wc
  src="../assets/present-anim.lottie"
></dotlottie-wc>
```

LottieFilesで公開されているLottieファイルを使用する場合は、URLを指定します。[Preview Lottie animation](https://lottiefiles.com/preview)ページからアップロードし、作成したURLを使用します。

```
<dotlottie-wc
  src="https://lottie.host/06c37f83-9f5d-46fb-abf9-55ea333c65ac/psTxfqLKed.lottie"
></dotlottie-wc>
```

#### ③目的に応じたプロパティを追加

準備ができたところで、アニメーションの再生を調整してみましょう。読み込み後にループ再生を自動で開始し、再生速度を0.5倍速に変更するアニメーションの場合は、以下のようにプロパティを追加します。

```
<dotlottie-wc
  src="../assets/present-anim.lottie"
  autoplay
  loop
  speed="0.5"
></dotlottie-wc>
```

参照：[主要な属性一覧](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-wc/attributes/)

たった数行でLottieアニメーションを組み込めました。LottieFilesのツールでは設定できないパラメーターも調整できるのが実装の利点です。そのほかに指定できるプロパティは、作例にもまとめていますのでぜひご活用ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240403_lottie_part2/lottie-player/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-player/index.html)

### コラム：JSON形式とdotLottie形式

Lottieのファイルには、`.json`形式と`.lottie`形式の2種類があります。

dotLottie-wcでは`.json`形式も`.lottie`形式も同じように使えますが、以下のようなメリットがあるため`.lottie`形式を使用することをオススメします。

1.  複数のアニメーションを1つのファイルにまとめられる
2.  JSON形式より1/10程度軽量
3.  Web、iOS、Androidなどクロスプラットフォームで使える
4.  インタラクティブなアニメーションを作成できる[State Machines](https://lottiefiles.com/state-machines)が使える

### コラム: インタラクティブなアニメーションも作れる

Lottieには[State Machines](https://lottiefiles.com/state-machines?via=top_nav)という機能があります。State Machinesを使うと、クリックやマウスのホバーなどをきっかけにアニメーションを再生できます。

[Lottie Creator](https://creator.lottiefiles.com/)などでState Machines機能を含んだ`.lottie`ファイルを作成し、前述した`dotLottie-wc`で読み込むとインタラクティブなアニメーションをウェブに表示できます。

または、[dotLottie JS](https://developers.lottiefiles.com/docs/tools/dotlottie-js/)というライブラリを使うとコードでState Machinesを記述できます。コードを記述した後は、`.lottie`形式でファイルを書き出し、`dotLottie-wc`で読み込みます。

以下は、クリックをきっかけにアニメーションするボタンです。`dotlottie-wc`で簡単に表示できます。

※Lottie Simple Licenseのもと、LottieFilesで配布されているアニメーションを利用しました。

```
<dotlottie-wc
  src="https://lottie.host/8bee191a-c073-478b-b621-16d7190e5ff6/LKz8kewfOD.lottie"
  stateMachineId="StateMachine1"
  style="width: 300px; height: 300px"
></dotlottie-wc>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240403_lottie_part2/interaction/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/interaction/index.html)

### まとめ

dotLottie-wcを使用したLottieアニメーションの実装方法を紹介しました。HTMLに組み込むだけで手軽に実装できますね！

一方で、細かい制御・パフォーマンスを考慮する場合は、実装時のケアも重要です。実装編の後編となる次回の記事『[JSでLottieを配置する方法](https://ics.media/entry/240625/)』では、アニメーションの制御やパフォーマンスを考慮した、JavaScriptメインで実装する方法を紹介予定です。

#### 参考サイト

-   [dotLottie Players](https://docs.lottiefiles.com/en/runtimes)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)
    -   [After Effects編](https://ics.media/entry/230928/)
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)（本記事）
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)