---
title: "HTMLでLottieを配置する方法"
source: "https://ics.media/entry/240403/"
publishedDate: "2024-04-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://airbnb.io/lottie/#/)ロッティー」はベクター画像のアニメーションを実現できる技術・ファイルフォーマットです。

Lottieアニメーションの作り方編の記事（[Figma編](https://ics.media/entry/230913/)、[After Effects編](https://ics.media/entry/230928/)）では、Lottieの概要から作り方、ファイルの書き出し方までを紹介しました。本記事では、Lottieアニメーションの実装方法について紹介します。

Lottieの組み込みはプラットフォームに応じたさまざまな実装方法が用意されていますが、一般的なウェブの方法を例に紹介します。実装編の前編となる本記事では、**手軽に組み込むことができる[Web Player](https://lottiefiles.com/web-player)（lottie-player、dotlottie-player）を使用**して実装します。

iOS、Androidアプリケーション等のそのほかの実装方法は[公式ドキュメント](https://airbnb.io/lottie/#/README)を参照ください。

### アニメーションの実装

ウェブ向けの実装方法は大きく2パターンあります。HTMLメインの方法と、JavaScriptメインで実装する方法です。

-   HTMLメインで実装：Web Player（LottieFilesの提供）
    
    -   lottie-player: `.json`拡張子Lottieの表示に使用します。再生方法の調整など簡単な制御を行えます。
    -   dotlottie-player: dotLottie（`.lottie`拡張子Lottie）および`.json`拡張子Lottieの表示に使用します。再生方法の調整など簡単な制御を行えます。
    -   [Lottie Interactivity](https://lottiefiles.com/interactivity): よりインタラクティブなアニメーションを行う場合にlottie-playerと一緒に使用します。スクロールやカーソルの位置と組み合わせたアニメーションの制御などが行えます。
    -   特長: HTMLメインで手軽に導入できます。
-   JavaScriptで実装：[lottie-web](https://github.com/airbnb/lottie-web)（Airbnbの提供）
    
    -   lottie-web: `lottie.loadAnimation()`でアニメーションを実装します。
    -   特長: JavaScriptメインで再生タイミングやパフォーマンスなど細かく制御できます。

### Web Playerを使用した実装

まずはコピペでできる、組み込み方法を紹介します。もっとも簡単なのが[LottieFiles Web Player](https://lottiefiles.com/web-player)のツールからスニペットをコピーしHTMLに貼り付ける方法です。

アニメーションのパラメーターを調整し、プレーヤーの形式を選択してから［Copy Code］ボタンでコードをコピーします。HTMLのbodyタグにスニペットを貼り付ければLottieが再生されます。

このツールを使用する場合はファイル形式（※）に紐づいたプレーヤーの種類でコードが生成されるので、dotLottie形式でもJSON形式のLottieでも、どちらでも問題ありません。後述のLottie Interactivityを併せて使用したい場合は、「Lottie JSON」を選択しましょう。

※Lottieのファイル形式の違いについては、記事『[最新版！ Lottieアニメーションの作り方 - Figma編](https://ics.media/entry/230913/)』にて紹介していますので参照ください。

![Web Player](https://ics.media/entry/240403/images/240403_lottie_web_player.png)

```
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/6bed0136-e3d6-42be-ab92-fcb3f29e3cf4/a8u7RGCyP6.json" background="transparent" 
speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop controls autoplay></dotlottie-player>
```

続いて、より詳しく内容を理解したい方、アニメーションを細かく調整したいといった方向けに、一からコードベースで実装する手順を紹介します。

#### ①ライブラリのインポート

[ドキュメント](https://github.com/LottieFiles/lottie-player)にしたがってlottie-playerのライブラリをインポートします。

-   CDNで読み込みたい場合

```
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
```

-   パッケージマネージャーの場合

```
npm install --save @lottiefiles/lottie-player
```

#### ②`lottie-player`タグを記述し、`src`にLottieのパスを指定

```
<lottie-player
  src="../assets/present-anim.json"
></lottie-player>
```

LottieFilesで公開されているLottieファイルを使用する場合は、URLを指定します。導入方法は、[LottieFiles Japan公式noteの記事](https://note.com/lottiefiles_jp/n/ne4f18f4246f8)にも掲載されていますので必要に応じて参照ください。

```
<lottie-player 
  src="https://lottie.host/6bed0136-e3d6-42be-ab92-fcb3f29e3cf4/a8u7RGCyP6.json"
></lottie-player>
```

#### ③目的に応じたプロパティを追加

準備ができたところで、アニメーションの再生を調整してみましょう。読み込み後にループ再生を自動で開始し、再生速度を0.5倍速に変更するアニメーションの場合は、以下のようにプロパティを追加します。

```
<lottie-player
  src="../assets/present-anim.json"
  autoplay loop speed="0.5"
></lottie-player>
```

参照：[主要なプロパティ一覧](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/properties/)

たった数行でLottieアニメーションを組み込めました。LottieFilesのツールでは設定できないパラメーターも調整できるのが実装の利点です。そのほかに指定できるプロパティは、作例にもまとめていますのでぜひご活用ください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240403_lottie_part2/lottie-player/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-player/index.html)

### コラム：dotLottie形式

`.lottie`拡張子の組み込み方法も紹介します。`.lottie`拡張子は、通常の`.json`拡張子Lottieの再生に使用するlottie-playerでは再生できません。代わりに[dotlottie-player](https://github.com/dotlottie/player-component)もしくは、[dotlottie-wc](https://github.com/LottieFiles/dotlottie-web/blob/main/packages/wc/README.html)を使用する必要があります。

2024年6月現在、dotlottie-playerパッケージはメンテナンスされておらず、[dotlottie-web](https://github.com/LottieFiles/dotlottie-web)パッケージに切り替えていくようです。dotlottie-playerの代替のウェブコンポーネントは、dotlottie-wcとして提供されています。

▼dotlottie-playerのインポート（CDN）

```
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
```

▼使用例

```
<dotlottie-player autoplay loop src="../assets/present-anim.lottie"></dotlottie-player>
```

### Lottie Interactivityでインタラクティブなアニメーションを

よりインタラクティブにアニメーションを制御したい場合は、[lottie-interactivity](https://github.com/LottieFiles/lottie-interactivity)を導入しましょう。

どのようなことができるかは、[Interactivity Guide](https://lottiefiles.com/interactivity)をご覧ください。アニメーションとコードの例が丁寧に記載されています。

#### ①ライブラリのインポート

lottie-interactivityのライブラリをインポートします。実装には前述のlottie-playerも使用しますので、ライブラリをインポートしておいてください。

-   CDNで読み込みたい場合

```
<script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script
```

-   パッケージマネージャーの場合

```
npm install --save @lottiefiles/lottie-interactivity
```

#### ②lottie-playerにid属性を追加

JavaScriptから参照するための`id`属性を追加します。

```
<lottie-player
  id="lottie"
  src="https://lottie.host/2dc80a15-d7f9-49d4-9be0-3d3450b826e6/0JAw6NYf0o.json"
></lottie-player>
```

#### ③LottieInteractivityを使用してアニメーションを制御

`LottieInteractivity.create()`を用意し、引数にオブジェクトを渡します。オブジェクトに指定できるメソッドは以下のとおりです。

-   `mode`: イベントの種類。`cursor`、`scroll`、`chain`が指定可能。
    -   `cursor`：カーソルに応じてアニメーション。
    -   `scroll`：スクロールに応じてアニメーション。
    -   `chain`：複数のフレームを繋げるアニメーション。トランジション方法や再生方法が各セグメントごとに指定可能。
-   `actions`: インタラクションを定義したアニメーションのオブジェクト配列。`mode`メソッドに指定した値に応じて各オブジェクトには複数のプロパティが指定できます。
-   `player`: 参照するDOM要素・アニメーション。
-   `container`：スクロールアニメーションのコンテナー要素。`mode`が`scroll`の場合に使用されます。

```
LottieInteractivity.create({
  player: "#lottie", // lottie-playerに追加したid
  mode: "chain", // セグメントを加工し繋げるアニメーション
  actions: [
    // ここにアニメーションを追加
  ]
});
```

今回作成するアニメーションです。元のデータは一定のスピードでループするアニメーションですが、`mode: "chain"`を使用して、クリックするたびに繋ぎのアニメーションとループアニメーションを挟みながら、アニメーションスピードが速くなるような加工をしてみます。

▼クリックでアニメーションが変化します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240403_lottie_part2/lottie-interactivity-chain/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-interactivity-chain)

#### ④actionsにインタラクションを指定したアニメーションを追加

`actions`にセグメントの配列を追加します。`state`や`transition`等のパラメーターを指定し、インタラクティブなアニメーションを作ります。

1.  ループ再生アニメーションのセグメントでは、`state: "loop"`でループ再生指定し、`frames: [0, 61]`で再生するフレームを指定します。また、`transition`を`click`にすることで、次のセグメントへ移ります。
2.  繋ぎのアニメーションセグメントでは、`state: "autoplay"`で自動再生にし、`transition: "onComplete"`でアニメーション完了後、次のセグメントへ移動するようにしておきます。
3.  おおよそ手順1と同じパラメーターを指定し、`speed: 2`を追加することで倍速再生に加工します。
4.  これを繰り返し記述します。省略部分は[サンプルコード](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-interactivity-chain/index.js)をご確認ください。

```
LottieInteractivity.create({
  player: "#lottie", // lottie-playerに追加したid
  mode: "chain", // セグメントを加工し繋げるアニメーション
  actions: [
    // ループ再生
    {
      state: "loop",
      transition: "click", // クリックした時に次のセグメントへ
      frames: [0, 61],
    },
    // 繋ぎのアニメーション
    {
      state: "autoplay",
      transition: "onComplete", // 指定フレームまでの再生終了後、次のセグメントへ
      forceFlag: false,
      frames: [61, 113],
    },
    // ループ再生
    {
      state: "loop",
      transition: "click", // クリックした時に次のセグメントへ
      forceFlag: false,
      frames: [113, 174],
      speed: 2, // 倍速に変更してみる
    },
    // …省略
  ]
});
```

#### おまけ

今回紹介は省略しますが、スクロールやマウスの位置に応じたアニメーションも、複雑なイベントリスナーなどを登録せずほんの数行で実装できます。ぜひお試しください。

-   サンプルを別ウインドウで開く（[スクロール](https://ics-creative.github.io/240403_lottie_part2/lottie-interactivity-scroll/index.html)、[カーソル](https://ics-creative.github.io/240403_lottie_part2/lottie-interactivity-cursor/index.html)）
-   ソースコードを確認する（[スクロール](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-interactivity-scroll/index.html)、[カーソル](https://github.com/ics-creative/240403_lottie_part2/blob/main/docs/lottie-interactivity-cursor/index.html)）

### まとめ

lottie-playerを使用したLottieアニメーションの実装方法を紹介しました。HTMLだけでも実装が行えたりと、手軽に組み込みやすくなりましたね！

一方で、細かい制御・パフォーマンスを考慮する場合は、実装時のケアも重要です。実装編の後編となる次回の記事『[JSでLottieを配置する方法](https://ics.media/entry/240625/)』では、アニメーションの制御やパフォーマンスを考慮した、JavaScriptメインで実装する方法を紹介予定です。

#### 参考サイト

-   [Docs - LottieFiles](https://developers.lottiefiles.com/docs/)
-   [Players | dotLottie](https://dotlottie.io/players/)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)
    -   [After Effects編](https://ics.media/entry/230928/)
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)（本記事）
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)