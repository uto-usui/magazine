---
title: "JavaScriptで取り組むクリエイティブコーディング – パーティクル表現入門"
source: "https://ics.media/entry/18835/"
publishedDate: "2018-08-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

HTML Canvas要素とJavaScriptを使うと、手軽にクリエイティブコーディングをはじめられます。

前回の記事『[パーリンノイズを使いこなせ](https://ics.media/entry/18812/)』に引き続き、2018年7月25日に開催されたイベント「[Frontend de KANPAI! #4](https://frokan.connpass.com/event/92028/)」の登壇内容を記事にしました。

![](https://ics.media/entry/18835/images/180808_perlin_noise_happyo_01.jpg)

本記事ではHTML CanvasとJavaScriptの理解につながることを目標に、パーティクル表現の作成テクニックを解説します。サンプルのソースコードはすべて[GitHub](https://github.com/ics-creative/180725_two_waves/)にて公開していますので、あわせて参照ください。

▲ 完成版サンプル

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_random.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_random.html)

※本記事はライブラリを利用せず、HTML CanvasとJavaScriptのみで説明しています。

### ステップ① パーティクル表現

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_0.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_0.html)

シンプルなグラフィックから手順を理解していきましょう。パーティクルの定義として、座標と速度、寿命を用意します。オブジェクトにプロパティを定義するだけです。

```
const MAX_LIFE = 80; // 寿命の最大値
const particles = []; // 配列でパーティクルを管理

// パーティクルを発生させます
function emit() {
  // オブジェクトの作成
  const particle = {
    // stageW, stageH は画面の幅と高さ
    x: stageW * 0.5, // パーティクルの発生場所(X)
    y: (stageH * 4) / 5, // パーティクルの発生場所(Y)
    vy: 0, // 速度
    life: MAX_LIFE, // 寿命
  };

  // 配列に保存
  particles.push(particle);
}
```

関数`setTimeout()`によって、時間経過で`update()`関数を呼び出します。関数のなかでは、パーティクルに対して重力を加えたり、摩擦を計算します。いつか消えるように寿命も減らしておくことも必要です。

```
// パーティクルを更新します
function update() {
  // パーティクルの計算を行う
  for (let i = 0; i < particles.length; i++) {
    // オブジェクトの作成
    const particle = particles[i];
    // 重力
    particle.vy -= 1;
    // 摩擦
    particle.vy *= 0.92;
    // 速度を位置に適用
    particle.y += particle.vy;

    // 寿命を減らす
    particle.life -= 1;
    // 寿命の判定
    if (particle.life <= 0) {
      // 配列からも削除
      particles.splice(i, 1);
      i -= 1;
    }
  }
}
```

描画は次のようにHTML Canvasに描きます。配列`particles`に格納したパーティクルの情報を使います。

```
// 描画します
function draw() {
  // 画面をリセット
  context.clearRect(0, 0, stageW, stageH);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    context.beginPath();
    // 白い色を設定
    context.fillStyle = "white";
    // 円を描く
    context.arc(particle.x, particle.y, 100, 0, Math.PI * 2, false);
    // 形状に沿って塗る
    context.fill();
    context.closePath();
  }
}
```

### ステップ② 寿命でスケール変化

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_1.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_1.html)

パーティクルの寿命を使って変化を持たせます。発生時のパーティクルは大きいサイズとし、寿命を迎えて死滅するときには小さいサイズにします。

寿命に対する生存期間の割合は計算によって求まるので、その値をスケールに割り当てます。

```
// パーティクルのサイズを寿命に比例にする
const scale = particle.life / MAX_LIFE;
particle.scale = scale;

particle.life -= 1; // 寿命を減らす
if (particle.life <= 0) {
  // 寿命の判定
  // 削除
}
```

### ステップ③ 数を増やす

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_2.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_2.html)

時間経過でパーティクルの発生頻度をあげます。1秒間に60回呼び出す`tick()`関数において、パーティクル発生の`emit()`関数を呼び出すようにします。発生位置に乱数を持たせて、横幅いっぱいにパーティクルを発生するようにしておきましょう。

```
tick();

/** フレーム更新のタイミングです。 */
function tick() {
  setTimeout(tick, 16); 

  // パーティクルを発生
  emit();
  // パーティクルを更新
  update();
  // 画面を更新する
  draw();
}

// パーティクルを発生させます
function emit() {
  // オブジェクトの作成
  const particle = {
    x: stageW * Math.random(), // パーティクルの発生場所(X)
    y: (stageH * 3) / 4, // パーティクルの発生場所(Y)
    vy: 30 * (Math.random() - 0.5), // 速度
    life: MAX_LIFE, // 寿命
  };

  particles.push(particle);
}
```

### ステップ④ 形状を増やし点滅させる

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_3.html)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_3.html)

形状を増やすために、パーティクル発生時に形状の種類を示す`type`プロパティを設定します。

```
// オブジェクトの作成
const particle = {
  // 種類を定義
  type = Math.floor(Math.random() * 2).toString();
  // 他いろいろ・・・
};
```

`type`プロパティに値によって描画の形状を切り替えます。このとき、透明度は80%〜100%の値になるように乱数を使って設定します。時間経過で乱数によって透明度が変化するため、点滅しているような表現になります。

```
context.beginPath();
context.arc(particle.x, particle.y, /* 省略 */);

// 点滅ロジック 0.8〜1.0の間で乱数を得る
const alpha = Math.random() * 0.2 + 0.8;

switch (particle.type) {
  case "0": // 塗りつぶした円「●」を描画
    context.fillStyle = `hsla(0, 0%, 50%, ${alpha})`;
    context.fill();
    break;

  case "1": // 線で円「○」を描画
    context.strokeStyle = `hsla(0, 0%, 50%, ${alpha})`;
    context.lineWidth = 5;
    context.stroke();
    break;
}
context.closePath();
```

### ステップ⑤ 乱数を使いこなせ

乱数の制御テクニックを紹介します。乱数を使ってパーティクルの発生位置を調整すると、表現にバリエーションを増やせます。JavaScriptには`Math.random()`という一様分布の乱数生成命令があります。この乱数を加減乗除するとさまざまなバリエーションが得られます。

#### 中央に偏らせる

```
const x = (Math.random() + Math.random()) / 2;
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_random.html#1)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_random.html)

#### 中央に強く偏らせる

```
const valueA = (Math.random() + Math.random()) / 2;
const valueB = (Math.random() + Math.random()) / 2;
const x = (valueA + valueB) / 2;
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_random.html#2)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_random.html)

#### 端に偏らせる

```
const base = Math.random() * Math.random() * Math.random();
const inverse = 1.0 - base;
const x = Math.random() < 0.5 ? base : inverse;
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/180725_two_waves/particle_random.html#3)
-   [コードを確認する](https://github.com/ics-creative/180725_two_waves/blob/master/docs/particle_random.html)

ここで紹介したランダムの計算方法は一部です。詳しくは記事『[JavaScript開発に役立つ重要なランダムの数式まとめ](https://ics.media/entry/11292/)』にまとめているので、参照ください。

### ステップ⑥ 最適化手法としてのオブジェクトプール

パーティクル表現は、大量のオブジェクトの生成・破棄を繰り返します。**JavaScriptにはメモリ管理の機構としてガベージコレクション（略してGCといいます）が存在**します。どこからも参照されておらず不要になったオブジェクト（ゴミ＝ガベージ）を自動的に回収することで、メモリ使用量を抑えます。

一見便利そうな**ガベージコレクションは、実は重たい処理**です。ガベージコレクションが発生すると、数ミリ秒の負荷が発生します。数ミリ秒というのは、表現の世界ではシビアな時間です。ウェブコンテンツは多くの端末で60fps（1秒間に60回の画面更新）で動作しますが、その場合は1フレームあたり16ミリ秒しか時間がありません。16ミリ秒で1フレームの描画更新処理を終わらせなければならないのに、数ミリ秒もガベージコレクションに時間が取られてしまいます。

![](https://ics.media/entry/18835/images/180824_random_zuban_01.png)

もし描画更新処理が16ミリ秒をこえてしまえば、一瞬止まったようなプチフリーズが発生します。そこで対策となるのがオブジェクトプールです。

JavaScriptで参照が外れると、ガベージコレクションの対象となります。メモリ使用量が多いと、強烈なガベージコレクションを引き起こす可能性があります。

![](https://ics.media/entry/18835/images/180824_random_zuban_02.png)

オブジェクトプールはガベージコレクションの対象にならないように、**あえて参照を保持する方法**です。インスタンスはプールと呼ばれる配列に保持されるので（参照を保ち続けるので）、ガベージコレクションの対象にはなりません。

![](https://ics.media/entry/18835/images/180824_random_zuban_03.png)

次のコードはオブジェクトプールの簡易的な実装例です。

```
const objectPool = []; // オブジェクトプール

function toPool(particle) {
  // 使用済み粒子はプールに移動
  objectPool.unshift(particle);
}

function fromPool() {
  if (objectPool.length === 0) {
    // プールが空なら新規生成
    return new Particle();
  } else {
    // プールにストックがあれば取り出す
    return objectPool.pop();
  }
}
```

詳しくは次の記事『[ゲームにおけるガベージコレクションとの付き合い方 - Qiita](https://qiita.com/bkzen/items/d84312246061778ee870)』が参考になるでしょう。内容はかつてのFlashの話題ですが、JavaScriptでも同じことがいえます。

### まとめ

今回の記事はパーティクル作り方を説明しました。簡単な物理演算とJavaScriptの配列管理がキモです。記事「[CreateJS でパーティクルシステムの開発に挑戦しよう](https://ics.media/tutorial-createjs/particle/)」では初級的な内容から解説しているので、あわせて参照ください。

#### 補足

時間経過の処理には`requestAnimationFrame()`を使うのが一般的ですが、本記事では`setTimeout()`で説明しています。当初は`requestAnimationFrame()`を利用していましたが、昨今、フレームレートの異なるデバイス環境が増えてきたことをうけ、デバイス依存の少ない`setTimeout()`に変更しました。

次の記事『[Canvasだけじゃない！requestAnimationFrameを使ったアニメーション表現](https://ics.media/entry/210414/)』では対策として「リフレッシュレートに依存しない処理」を紹介しています。