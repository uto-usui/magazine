---
title: "CSSひとつで印象が変わる！　スクロールでふわっと出るアニメーション"
source: "https://ics.media/entry/250221/"
publishedDate: "2025-02-21"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2025年2月21日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブサイトの中にはスクロールするとフワッと文字が出てくる表現があります。シンプルに見えますが、少し工夫を凝らすだけで表現力を大きく高めることが可能です。今回は、フワッと出るアニメーションをより魅力的にするためのテクニックとその応用例をいくつか紹介します。本記事の完成形は次のとおりです。

### 比較

まず、2つのフワッと出てくるアニメーションを比較してみましょう。下記の2つのアニメーションは、どちらもスクロールするとフワッと文字が出てくる表現です。エレガントなカフェのサイトを想定してアニメーションを作りました。

▼実際にスクロールして比較してみてください。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250221_huwatto/compare/)
-   [コードを確認する（ちょっと微妙な方）](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/basic.css)
-   [コードを確認する（改良したもの）](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/advanced.css)

どちらも同じフワッと出てくるアニメーションですが、速度やイージング、タイミングなどが異なります。左側の「ちょっと微妙なもの」は全体的に間延びしてのんびりしているように感じちょっと微妙です。右側の「改良したもの」は似たような動きですが、ふんわりとした中にメリハリがあります。右側の方がより洗練された動きに感じないでしょうか？

この2つのアニメーションの違いを細かく見ていきましょう。

### 出現タイミング

まず、出現タイミングがどのように違うのか検証します。左側の例は画面中央付近へ来たときにアニメーションがトリガーされます。右側の例は画面下寄りでアニメーションがトリガーされます。

ユーザーは画面の中央部分に注視していることが多いので、このタイミングならたしかにアニメーションをユーザーに見せられます。しかし、本当に見せたいのはアニメーションではなく文字のはずです。文字が出現するまでにおよそ1秒ほどあるので、ユーザーを待たせることになります。また、スクロールが速いと文字が出る前に通りすぎてしまうかもしれません。

右側の例は画面下部でアニメーションが開始されるので画面中央にきたときには**アニメーションが完了し、文字が読める状態**になっています。

具体的なコードを見てみます。次のコードはIntersection Observer APIを使った、要素が画面の特定位置へきたときにイベントを行うコードです。Intersection Observer APIについては記事[『JSでのスクロール連動エフェクトには Intersection Observerが便利』](https://ics.media/entry/190902/)にて解説されています。

-   [コードを確認する](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/script/scrollTrigger.js)

```
/**
 * IntersectionObserverを初期化する
 * @param target {HTMLElement} 監視対象の要素
 * @param options {IntersectionObserverInit} IntersectionObserverオプション
 */
const setupIntersectionObserver = (target, options) => {
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // トリガーされた要素にisActiveクラスを追加
        entry.target.classList.add("isActive");
        // アニメーションは1度だけなので、トリガーしたら監視を解除する
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);
};

/**
 * 画面中央で発火するスクロールトリガー
 * @param target {HTMLElement} トリガーしたい要素
 */
export const setupBasic = (target) => {
  const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
  };
  setupIntersectionObserver(target, options);
};

/**
 * 画面下部で発火するスクロールトリガー
 * @param target {HTMLElement} トリガーしたい要素
 */
export const setupAdvanced = (target) => {
  const options = {
    root: null,
    rootMargin: "-80% 0px -20%",
    threshold: 0,
  };
  setupIntersectionObserver(target, options);
};
```

それぞれ、`setupBasic`は左側の、`setupAdvanced`が右側のトリガー設定です。`rootMargin`の値がトリガー位置の設定となりますが、右側のは画面下から20%の位置をトリガーにしています。

このようにアニメーションのトリガーのタイミングを早めに行うことで、ユーザーにアニメーションを感じさせつつも、必要な情報はしっかり伝えられます。

### アニメーションのイージング・デュレーション・変化量

つづいて、トリガーのタイミングをそろえた比較を見てみましょう。

▼実際にスクロールして比較してみてください。

似たような動きですが右側の例と比べると左側の例はややぼやっとした感じがします。これはアニメーションの速度やイージング（動きの加減速）、デュレーション（再生時間）が影響しています。実際のコードを見ながら説明します。

```
/* 左側のアニメーション */
.basic {
  opacity: 0;
  translate: 0 15%;

  &.isActive {
    opacity: 1;
    translate: 0;
    transition-duration: 1.4s;
    transition-timing-function: linear;
  }
}

/* 右側のアニメーション */
.advanced {
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);

  opacity: 0;
  translate: 0 13%;

  &.isActive {
    opacity: 1;
    translate: 0;
    transition-duration: 1.8s;
    transition-timing-function: opacity var(--ease-out-cubic), translate var(--ease-out-quint);
  }
}
```

大きく違うのはデュレーションである`transition-duration`プロパティの値とイージング設定である`transition-timing-function`プロパティの値が`opacity`と`translate`と個別に設定していることです。

次にイージングの違いです。左側の例には`linear`が利用されています。右側の例は`--ease-out-quint`というイージング関数を指定しています。`linear`は等速で変化するイージング、`--ease-out-quint`は、最初は速く、最後はゆっくりになるイージングです。`linear`と比べるとアニメーションの**変化と余韻にメリハリ**がつくようになります。とくに今回のような長めアニメーションではイージングの違いが表れやすくなります。

イージングの付け方については記事『[CSSイージングのお手本 - ease-out, ease-in, linearの使い分け](https://ics.media/entry/18730/)』にて詳しく紹介しています。

早めに透過度を上げて動きを見えるようにし、アニメーション終盤は余韻を残すようにするのが`transition`を分けた狙いです。

強いイージングに変更したことでアニメーション途中の移動速度は上がっています。速い動きになるとエレガントよりも元気さが出てくるのでデュレーションを長くし、移動量も`15%`から`13%`に小さくしています。速度が速くなりすぎないようにしました。

アニメーションの速度は印象に大きく影響を与えます。イージング・デュレーション・変化量は速度を決めるパラメーターです。この3つのバランスがアニメーション調整のポイントです。

▼最終的に調整したもの

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250221_huwatto/advanced/)
-   [コードを確認する](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/advanced.css)

このように細やかな調整を行うことで、フワッと出るアニメーションをより魅力的にできます。感覚的なところも大きいですが挑戦してみてください。

### 応用編

アニメーションのパラメーターの調整や使うプロパティを変えるとさまざまな出現の仕方を表現できます。ここではいくつか紹介します。

#### 1文字ずつ出現

フワッと出てくる演出を1文字ずつに適用したものです。1文字ずつアニメーションさせる仕組みは『[HTMLとCSSでつくる!　1文字ずつ変化するテキストのアニメーション](https://ics.media/entry/250131/#%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF)』にて詳しい解説があります。この例も`--index`というCSS変数を使って1文字ずつのCSSアニメーションを実現しています。なお、`transition`プロパティは簡略化のためにショートハンド記法（`transition: プロパティ名 時間 イージング 遅延時間`）を使っています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250221_huwatto/split/)
-   [コードを確認する](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/split.css)

```
.split {
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-quad: cubic-bezier(0.11, 0, 0.5, 0);

  .splitText .char {
    opacity: 0;
    translate: 0 100%;
  }

  &.isActive {
    .headline .char {
      --delay: 0.05s;

      opacity: 1;
      translate: 0;
      transition:
        opacity 0.7s var(--ease-in-quad) calc(var(--delay) * var(--index)),
        translate 1.4s var(--ease-out-quart) calc(var(--delay) * var(--index));
    }

    .description .char {
      --delay: 0.003s;

      opacity: 1;
      translate: 0;
      transition:
        opacity 0.5s var(--ease-in-quad) calc(var(--delay) * var(--index) + 0.23s),
        translate 1.3s var(--ease-out-quart) calc(var(--delay) * var(--index) + 0.23s);
    }
  }
}
```

こちらは文字ごとの連続性を出すために`opacity`のイージングに `--ease-in-quad: cubic-bezier(0.11, 0, 0.5, 0);`というイーズイン系の指定をしています。

#### 下から見切れながら出てくる

こちらは`opacity`の変化ではなく、切り取られた領域の下部から出てくるアニメーションです。この例では1文字ずつ出てくるディレイ時間にイージングをかけて、徐々に文字が出てくる時間が遅くなります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250221_huwatto/showBottom/)
-   [コードを確認する](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/showBottom.css)

```
 .showBottom {
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  .char {
    transform-origin: 50% 100%;
    translate: 0 100%;
  }

  .headline,
  .description > span {
    overflow: hidden;
    line-height: 1;
  }

  &.isActive {
    .headline .char {
      --delay: 0.02s;

      translate: 0;
      /* indexの2乗の遅延時間とすることで段々と出現が遅くなる */
      transition: translate 1s var(--ease-out-quart)
        calc((var(--delay) * var(--index) * var(--index)));
    }

    .description .char {
      --delay: 0.004s;

      translate: 0;
      transition: translate 1s var(--ease-out-quart)
        calc(var(--delay) * var(--index) * var(--index) * 0.01);
    }
  }
}
```

`transition` のディレイの値を`--index`の2乗とすることで文字が後ろほど遅く出てくるようになります。このようにディレイ時間を変えることで、1文字ずつの出現という一連のアニメーションにイージングを生み出しています。

#### ぼかしの利用

出現にぼかしを利用しても良いでしょう。ぼかしをつけるにはCSSの`filter: blur()`を使います。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/250221_huwatto/blur/)
-   [コードを確認する](https://github.com/ics-creative/250221_huwatto/blob/main/src/assets/style/blur.css)

```
.blur {
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  opacity: 0;
  filter: blur(1em);
  scale: 1.1;

  &.isActive {
    opacity: 1;
    filter: blur(0);
    scale: 1;
    transition:
      scale 1s var(--ease-out-quart),
      opacity 1s var(--ease-out-quart),
      filter 1.4s var(--ease-out-quart);
  }
}
```

透過度にぼかしを加えることでポワっと出てくる雰囲気を出せます。そのほか少しスケールの変化を加えることで、収束するような動きになっています。

### まとめ

シンプルな移動+透過度の演出でもパラメーターの調整やタイミング次第では印象をより良くできます。演出に使うCSSを変えることでバリエーションを増やすこともできます。フワッと出てくる演出はよく見かけるものですが奥が深いアニメーションでもあります。いろいろ試してウェブサイトに合うアニメーションを見つけてみてください。