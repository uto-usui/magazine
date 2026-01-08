---
title: "センスだけに頼らない！ CSSとJSで作るパーティクル表現のテクニック"
source: "https://ics.media/entry/220420/"
publishedDate: "2022-04-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2022年4月20日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

パーティクルやラインアニメーションなど、ウェブページにちょっと見栄えのする表現を加えてみたくなることはありませんか？　ICS MEDIAのトップページや[弊社採用サイト](https://ics-web.jp/recruit/)でもこうした表現を実装していますが、思った通りの演出をコードで表現するのはなかなか難しいものです。**技術は分かっても「自分にはセンスがないから……」と諦めてしまっている人も**いるかもしれません。

この記事では、簡単なパーティクル表現を題材に、効果的なアニメーション表現のためのテクニックを紹介します。サンプルコードはブラウザー標準の`Web Animations API`を使用して実装していますが、CSSアニメーションやGSAP等のライブラリを用いても同様の実装は可能です。

### 基本のパーティクル

例題とする基本のパーティクルを見てみましょう。クリックすると中央の星からパーティクルが放射状に広がるアニメーションが再生されます。

![基本のパーティクル：デモ画像](https://ics.media/entry/220420/images/220420_demo1.gif)

-   [デモを別画面で再生](https://ics-creative.github.io/220420_effective_animation/index.html#demo1)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/stage1.ts)

シンプルで可愛いアニメーションではありますが、ちょっと寂しい感じがしますね。 いくつかのテクニックを使って、このパーティクルをもっと見栄えのするものにしていきましょう。

本記事のアニメーションはすべて、下記のパターンのバリエーションです。今回Web Animations APIの具体的な解説は行いませんが、基本的なJavaScriptとCSSアニメーションを実装したことのある方なら、はじめてでもなんとなく処理を読み解けるかと思います。CSSの`transform`プロパティに不安のある方は以前の記事[『もう誤魔化さない！CSS Transform完全入門(2D編)』](https://ics.media/entry/210311/)も参考にしてください。

```
const COUNT = 10;
const dots = ... // 10個のdivからなる配列を作成
// dotひとつずつに対して、Web Animations APIでアニメーションを実行
const animations = dots.map((dot, index) => {
  const angle = (360 / COUNT) * index;
  return dot.animate(
    // キーフレームの配列
    [
      {
        transform: `rotate(${angle}deg) translateX(0px)`,
        opacity: 1
      },
      {
        transform: `rotate(${angle}deg) translateX(100px)`,
        opacity: 1,
        offset: 0.8 // キーフレームの位置を80%の位置に設定
      },
      {
        transform: `rotate(${angle}deg) translateX(100px)`,
        opacity: 0
      }
    ],
    // アニメーションの設定
    {
      duration: 500
    }
  );
});
```

### 基本のテク1：数を増やす＆ランダムにする

まずは簡単にできることから試してみましょう。アニメーションに「映え」が足りないとき、まずは要素の数を増やすのが簡単です。安直ではありますが効果的な方法です。

![数を増やす＆ランダムにする：デモ画像](https://ics.media/entry/220420/images/220420_demo2.gif)

-   [デモを別画面で再生](https://ics-creative.github.io/220420_effective_animation/index.html#demo2)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/stage2.ts)

単純に数だけ増やすとパーティクル同士がくっついてしまうので、今回は以下のコードで飛距離や色をランダムに変更しています。

```
const angle = 360 * Math.random(); // 角度
const dist = 100 + Math.random() * 50; // 飛距離 ... 100〜150
const size = 0.5 + Math.random() * 2; // サイズ ... 0.5〜2.5
const hue = 30 + Math.random() * 25; // 色相 ... 30〜55
```

この方法は誰でも簡単にできるのがメリットですが、数を増やせばそれだけ見栄えがするかといえば、必ずしもそうとは限りません。全体のバランスを見ながら、やり過ぎないように調整しましょう。

### 基本のテク2：透明度やブラー、合成モードで派手さを足す

CSSの`mix-blend-mode`や`filter`プロパティは手軽に使えて見栄えもする便利な機能です。どちらもInternet Explorer(IE)以外のほぼすべてのブラウザーで使用できます。

![透明度やブラー、合成モードで派手さを足す：デモ画像](https://ics.media/entry/220420/images/220420_demo3.gif)

-   [デモを別画面で再生](https://ics-creative.github.io/220420_effective_animation/index.html#demo3)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/stage3.ts)

```
const animations = dots.map((dot) => {
  // ブレンドモードを変更するか？
  const hasBlendmode = Math.random() > 0.5;
  // ブラーをかけるか
  const hasBlur = Math.random() > 0.5;

  if (hasBlendmode) {
    dot.style.mixBlendMode = "add"; // 「加算」モード
  }
  if (hasBlur) {
    dot.style.filter = `blur(${Math.random() * 20}px)`;
  }

  ... // 下略
});
```

これらの表現は、激しさよりも上品さを演出したい時に使うと効果的です。ややゆったりと動かしてゆとりのある演出にしたり、最後のフェードアウトを長めに取って余韻を残したりするとよいでしょう。

ただし、**`mix-blend-mode`や`filter`プロパティは比較的負荷の高い処理**であることを忘れないようにしましょう。やりすぎるとパフォーマンスに影響することもあります。

### 応用テク1：少ない要素で動きにメリハリをつける

ここまでは、誰でも簡単に導入できる基本のテクニックを紹介しました。後半はもうちょっと応用的なテクニックで表現の幅を広げていきましょう。

次のサンプルは基本に立ち返り、パーティクルの数をぐっと減らしてみました。動かしているのはたった8個の要素ですが、メリハリがあって楽しい演出になっているのではないでしょうか？

![少ない要素で動きにメリハリをつける：デモ画像](https://ics.media/entry/220420/images/220420_demo4.gif)

-   [デモを別画面で再生](https://ics-creative.github.io/220420_effective_animation/index.html#demo4)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/stage4.ts)

**単純なドットひとつでも、予備動作（動き始める前の「溜め」や動いた後の余韻）を効果的に使うことで勢いや質量感を強く表現できます。**

```
const dots = /* パーティクルのドットの要素 */;
const wrappers = /* ドットのラッパー要素 */;

// 1. バラバラのタイミングで放射状に広がるアニメーション
const wrapperAnimations = wrappers.map((wrapper, index) => {
  const angle = (360 / COUNT) * index;
  const dist = 80;
  const len = 2 + Math.random() * 4; // 横に引き伸ばす量

  return wrapper.animate(
    [
      {
        transform: `
          rotate(${angle}deg)
          translateX(0px)
          scaleX(1)`,
        opacity: 1,
        easing: 'ease-out'
      },
      // 放射状に広がりながらドットを引き伸ばす
      {
        transform: `
          rotate(${angle}deg)
          translateX(${dist * 0.9}px)
          scaleX(${len})`,
        opacity: 1,
        offset: 0.6,
        easing: 'ease-in'
      },
      // 目標地点にゆっくり向かいながら引き伸ばしたドットを元の丸に戻す
      {
        transform: `
          rotate(${angle}deg)
          translateX(${dist}px)
          scaleX(1)`,
        opacity: 1,
      },
    ],
    {
      duration: 500,
      delay: Math.random() * 600,
      fill: "forwards"
    }
  );
});

// 2. 全てのアニメーションが終わるまで待つ
await Promise.all(wrapperAnimations.map((anim) => anim.finished));

// 3. 一斉に弾けてフェードアウトするアニメーション
const dotsAnimations = dots.map((dot) => {/* 省略 */});
```

メリハリのある動きのテクニックと実例は[『コピペで使える！　CSS Animationだけで実現するキャラクターアニメーション』](https://ics.media/entry/11336/)や[アニメーションをデザインしよう！　知っておきたいCSSイージングのお手本](https://ics.media/entry/18730/)多数紹介しています。ぜひ試してみてください。

また、「ランダムにするところ」と「全部をぴったり揃えるところ」を明確に区別するのも効果的です。今回の例では、中央から放射状に広がる際のタイミングや引き伸ばし度合いはランダムですが、ドットの角度や最後にフェードする際のタイミングはぴったり揃えています。

![バラすところと揃えるところを決める](https://ics.media/entry/220420/images/220420_timeline.png)

### 応用テク2：「ちょうどいい」ランダムさを意識的に作る

ここまでのテクニックでは、いずれも`Math.random`関数を使って表現にランダムな要素を加えてきました。位置やタイミングをランダムにするのは手軽で効果的な手法ですが、要素の数が多くない時にはちょっと、注意が必要です。

#### 「完全なランダム」は意外に偏りがある

下の例は完全にランダムにドットを配置した例です。きれいに並んでいるものもあれば、偏りが目立つものもありますね。試行回数を増やして平均化すれば偏りは無くなっていきますが、**1回1回で見るときれいに散らばっているものはそれほど多くありません。**

![偏って見えるランダム](https://ics.media/entry/220420/images/220420_random.png)

-   [デモを別画面で実行](https://ics-creative.github.io/220420_effective_animation/index.html#random)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/randomStage.ts)

最後に紹介するテクニックは、ランダムな表現を「ちょうどいい感じ」に意識してコントロールする例です。

![「ちょうどいい」ランダムさを意識的に作る：デモ画像](https://ics.media/entry/220420/images/220420_demo5.gif)

-   [デモを別画面で再生](https://ics-creative.github.io/220420_effective_animation/index.html#demo5)
-   [デモのソースコードを見る](https://github.com/ics-creative/220420_effective_animation/blob/master/src/stage5.ts)

この例では「ちょうどいいランダムさ」を実現するために以下の3つの手法を使っています。

1.  出現率表:「レア」なものほど出現率が下がるよう、出現率のテーブルを使って制御します
2.  基準値の周辺に偏った乱数: 基準値の周辺に多くの要素を集め、外れ値が少しだけになるように補正します
3.  確率ではなく個数を決める: 先に個数を決めてしまい、どの要素を選ぶかだけをランダムにします

#### 出現率表

色や形をランダムに決める際、すべてが同じ出現率というのは面白くありません。目立つものや「レア」なものほど確率を下げることで見た目のメリハリを強くできます。今回はこの手法でドットの色を決めています。

![色の出現率](https://ics.media/entry/220420/images/220420_deftable.png)

#### 基準値の周辺に偏った乱数

単純な`Math.random`では0〜1の間のどの数値もほぼ均等に出現します。一方で、メリハリのある表現のためには「**ほとんどの要素は同じ位置で、少しだけ外れた場所にいる**」といったランダムさが有効です。今回は放射状に飛び出すパーティクルの飛距離を下記のように補正した乱数を使って決めています。この乱数はほとんどが0付近に固まり、1に近い大きな値はごくまれにしか発生しません。

```
// ほとんどが0で、まれに1に近い数になるよう、乱数を補正する
// （デモでは-1〜+1の範囲になるよう調整していますが、ここでは簡単にするため+側だけとしています）
const distRandom = (Math.random() * Math.random()) ** 1.5;
// 補正した乱数で実際の飛距離を設定する
// ほとんどが100付近で、稀に最大値の160に近い値が出る
const dist = 100 + distRandom * 60;
```

![乱数を補正する](https://ics.media/entry/220420/images/220420_fixedrandom.png)

乱数を補正するテクニックは[『JavaScript開発に役立つ　重要なランダムの数式まとめ』](https://ics.media/entry/11292/)で多数紹介しています。コピペで使える数式を紹介していますので、ぜひ参考にしてください。

#### 確率ではなく個数を決める

乱数を使うのが得策でないケースもあります。次の例は10個のドットのそれぞれについて、10%の確率で色を赤に変えるものです。

```
const dots = ... // 10個のドットのdivを作成
dots.forEach(dot => {
  if (Math.random() < 0.1) {
    dot.style.backgroundColor = 'red';
  }
})
```

1個か2個くらい赤くなって欲しいところですが、ドットの数が10個の場合、**約35%の確率でひとつも赤にならない**ケースが発生します。もう少し割合を上げて、赤にする確率を20%に変えても、やはり10回に1回は赤がひとつも含まれません。だからと言って、赤にする確率を上げすぎると今度は3つも4つも赤くなるケースが出てきます。

このような場合は、赤にする個数は決めてしまい、**どの要素を赤くするかだけをランダムに決める**方が意図した表現を作りやすいでしょう。

以下のような関数を使えば、配列から任意の数の要素をランダムに取り出すことができます。

```
// source配列からランダムにcount個選んで返す
const pickRandom = (sources, count) => {
  const shuffled = [...sources]
    .map((item) => ({ order: Math.random(), item }))
    .sort((a, b) => a.order - b.order)
    .map((wrapper) => wrapper.item);
  shuffled.length = count;
  return shuffled;
};
```

今回の例では、「大きなドット」や「白抜きにするドット」をこの方法で決定しています。すべてをランダムにするのではなく、決めるところはキッチリ決めてしまう方が、意図した表現に近づけることができるでしょう。

```
// 「大きなドット」を全体の2割選ぶ
const bigDots = pickRandom(dots, Math.round(COUNT * 0.2));
// 「白抜きのドット」を全体の2割選ぶ
const borderDots = pickRandom(dots, Math.round(COUNT * 0.2));
// 「残像を残すドット」を全体の3割選ぶ
const afterImageDots = pickRandom(dots, Math.round(COUNT * 0.3));
```

### まとめ：テクニックを組み合わせて楽しいアニメーション表現を生み出そう

アニメーション表現はどうしてもセンスや経験が必要になってしまう世界です。モーションデザイナーと呼ばれる専門職があるほどその世界は深いものですが、だからといって専門外のエンジニアやデザイナーがアニメーションを作れないわけではありません。

この記事で紹介したさまざまなテクニックを組み合わせて、ぜひオリジナルのアニメーション表現にチャレンジしてみてください。