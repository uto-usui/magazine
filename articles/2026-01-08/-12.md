---
title: "みんなの人気者になれる！？ 機械学習を使ったおもしろカメラ"
source: "https://ics.media/entry/191227/"
publishedDate: "2019-12-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

世間では人工知能や機械学習を用いたあっと驚くプロダクトがどんどん生まれ、人類の技術はここまで進化したかと感動するばかりです。筆者もSiriと会話していたら一日が終わっていた、ということがよくあります。

機械学習を用いて作られたコンテンツの例として、日本マイクロソフトが開発した元女子高生AIの[りんな](https://www.rinna.jp/)、カメラの映像から植物や動物、商品の名前を推定してくれる[Googleレンズ](https://lens.google.com/intl/ja/)などが挙げられるでしょう。AdobeのPhotoshopのような製品にも[Adobe Sensei](https://www.adobe.com/jp/sensei.html)と呼ばれる機械学習技術が用いられています。

画像認識や音声認識、果ては会話まで可能にしてしまう機械学習を用いたコンテンツ。今回の記事ではそれらを自分で作ってみよう、という内容になっています！　下の動画は作成するサンプルです。リアルタイムで映像から目を認識しパーティクルを発生させています。

新年会の予定もたくさんあると思います。あなたが作ったおもしろコンテンツで遊んでもらえば、アイデア次第で会の主役になれるかもしれませんよ！？

### 1\. そもそも機械学習って？

機械学習の特徴の一例として以下が挙げられます。

1.  機械にデータを与え法則性を見つけさせる
2.  その法則性をもとに、新しいデータの分類などを行う

![](https://ics.media/entry/191227/images/191227_ml5_description.png)

犬の画像に「犬」というラベル、猫の画像に「猫」とラベルをつけコンピューターに学習させます。次に犬を見たときにコンピューターは「犬」のラベルがついた画像と似た特徴をもっている！　と判断できます。

法則なんて人間が見つければいいじゃないか！　とお思いの方もいるかもしれませんが、機械学習の優れたところは人間が見つけられない複雑な法則性も見つけられるところにあります。その例として、画像認識や自動翻訳が挙げられます。

### 2\. TensorFlowはハードルが高い！　そんなあなたへ

では、自分でも画像認識や音声認識するプロダクトが作りたい！　と思ったときどうすればよいでしょうか？

機械学習ライブラリとして有名なものとしてGoogleのPython用ライブラリ **「TensorFlow」** が挙げられます。これをJavaScript向けにした「TensorFlow.js」もあります。これを使ってコンテンツを作って行きましょう！

……と言いたいところですが、TensorFlow.jsを用いるためには機械学習の正式な手順を踏まなければなりません。トレーニングデータを準備してモデルを定義して……テンソル？　オプティマイザー？　もうわからん！

作りたいコンテンツによっては厳密な機械学習が必要ない場合も多くあると思われます。そのような場合TensorFlow.jsは学習コストが高く感じられるでしょう。そんな人々に対しても、TensorFlow.jsは優しく手を差し伸べてくれます。チュートリアルのはじめにはこう書かれています。

> TensorやOptimizerのような低レベルな詳細については考えずに機械学習を始めたい？  
> TensorFlow.jsを土台として作成されたml5.jsライブラリを利用すると、簡潔でわかりやすいAPIを通じてブラウザ上で機械学習のアルゴリズムとモデルを使用できます。

いきなり他のライブラリを紹介され面食らいましたが、この**ml5.js**、機械学習の面倒くさいところをすっ飛ばして使える悪魔のライブラリです。それでいてできることも多く、まさに機械学習を用いたコンテンツ制作の導入にはぴったりのライブラリとなっています。

### 3\. ml5.jsの紹介

ではさっそく、ml5.jsを触ってみましょう！　[公式サイト](https://ml5js.org/)をご覧いただいてもよいですが、各APIのサンプルをまとめたml5.js examples searchがml5.jsの魅力を知るには最適です。

ml5.js examples search：[https://ml5js.github.io/ml5-examples/public/](https://ml5js.github.io/ml5-examples/public/)

![](https://ics.media/entry/191227/images/191227_ml5_examples.png)

たくさんのデモが出てきましたね！　個人的に気になった**FaceAPI**の**FaceAPI\_Video\_Landmarks**を開いてみます。

起動して少し待つと……映像から顔のパーツを認識されました！

みなさんもぜひ、この記事を読み終わったらFaceApiやほかのサンプルを開いてお試しください。

ところで、内部ではどのような処理が行われているのでしょうか？　公式サイトにあるFaceAPIのリファレンスを見てみます。

```
// オプションの設定
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false
};

// faceAPIの利用
const faceAPI = ml5.faceAPI(detectionOptions, modelLoaded);

// モデルが読み込まれたとき
function modelLoaded() {
  console.log("Model Loaded!");

  // detect関数の実行
  faceAPI.detect(myImage, (err, results) => {
    console.log(results);
  });
}
```

ざっくりとした説明になりますが、faceAPIの`detect`関数が画像や映像を引数にとり結果を返します。

![detect関数の結果](https://ics.media/entry/191227/images/191227_ml5_results_console.png)

partsオブジェクトに注目すると、mouse, nose, leftEye, lertEyeBrow, rightEye, rightEyeBrow(口、鼻、左目、左眉、右目、右眉)の座標情報が返されています。

このAPIを使ってなにか作りたくてたまらなくなってきましたね？　そんな私たちのためにml5.jsのGitHubページにサンプルファイルの盛り合わせがあります。

-   サンプルファイルの盛り合わせ：[https://github.com/ml5js/ml5-examples](https://github.com/ml5js/ml5-examples)

公式サイトではweb editorを用いる方法が紹介されていますが、カスタマイズしやすいようGitでクローンして用いる方法をおすすめします。

### 4\. デモを作ってみよう

ml5.jsの使い方がざっくりとわかったところで、冒頭に出てきた目から星を出すデモを作成してみましょう。まずはクローンした盛り合わせセットをお手持ちのエディターで開きます。

主にサンプルが入っているのはjavascriptフォルダーとp5jsフォルダーになりますが、今回はp5jsを使っていきます。

**「p5.js」** はクリエイティブコーディングのためのライブラリです。ml5.jsはp5.jsに強く影響を受けて作られておりとても相性が良いとされています。今回の記事ではカメラの映像を機械学習で認識しクリエイティブコーディングで脚色するため、そのような場合p5.jsはml5.jsを活かす最高の相棒とも言えるでしょう。

p5js内のFaceAPI\_Video\_Landmarksフォルダーにあるsketch.jsファイルを開きます。

```
// 初期設定
function setup() {
  createCanvas(360, 270);
  // load up your video
  video = createCapture(VIDEO);
  faceAPI = ml5.faceAPI(video, detection_options, modelReady);
}

// モデル読み込み終了時の処理
function modelReady() {
  faceAPI.detect(gotResults);
}

// detect関数内のコールバック処理
function gotResults(err, result) {
  if (err) {
    return;
  }
  detections = result;

  // パーツを描画
  drawBox(detections);
  drawLandmarks(detections);

  // 毎フレーム繰り返す
  faceAPI.detect(gotResults);
}
```

※一部の処理は省略して記述しています。

`setup`関数内でfaceAPIに映像と処理関数を渡し、`result`として処理結果を受け取っています。顔パーツの座標情報をもつ`detections`は`drawBox`と`drawLandmarks`関数に渡されています。これらがグラフィックの描画を行っています。gotResultはコールバック関数として毎フレーム呼び出されリアルタイムで描画が行われます。

ここに星のパーティクルを描画する処理を書き足します。ソースコードは以下にありますので、一緒に作りたい方は適宜ご参照ください。

-   [ソースコード](https://github.com/ics-creative/191227_ml5js/blob/master/FaceApi_Star_Demo/sketch.js)

今回はml5.jsがメインの記事ということでp5.jsについての詳細は省きますが、クリエイティブコーディングの入門に最適なのでぜひ学習してみてください。

ソースコードの一部を抜粋しました。星の図形はクラス構文で作成しています。

```
// 星を作成するクラスです
// 参考：p5.js example https://p5js.org/examples/form-star.html
class Star {
  constructor(x, y, radius1, radius2, npoints, LR) {
    this.x = x;
    this.y = y;
    // 星を打ち上げる速度をランダムに決定
    this.vy = (Math.random() + 1) * -10;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.npoints = npoints;
    // 星の色をランダムに決定
    this.color = color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    );
    // 逆の目の方向に星が飛ばないように
    if (LR === "L") {
      this.vx = Math.random() * -10;
    } else {
      this.vx = Math.random() * 10;
    }
  }
  draw() {
    let angle = TWO_PI / this.npoints;
    let halfAngle = angle / 2.0;
    fill(this.color);
    noStroke();
    // 星のシェイプを描画
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.x + cos(a) * this.radius2;
      let sy = this.y + sin(a) * this.radius2;
      vertex(sx, sy);
      sx = this.x + cos(a + halfAngle) * this.radius1;
      sy = this.y + sin(a + halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);

    // 星を落とす
    this.vy += 3;
    this.y += this.vy;
    this.x += this.vx;
  }
}

```

こちらはp5.js公式サイトの[example](https://p5js.org/examples/form-star.html)を参考に作成しました。p5.jsはサンプルがたくさんあるので、これらを真似て組み合わせるだけで大抵のものが作れてしまいます。

顔の各パーツの座標はすべて`detections`内にあるので、これらを利用すれば顔の大きさ、目の位置など簡単に取得できます。以下のコードでは星を目の中心から発生させています。

```
// 受け取った座標情報を描画関数に渡す
function drawLandmarks(detections) {
  for (let i = 0; i < detections.length; i++) {
    // setStarSizeで星の大きさを決定します
    setStarSize(detections[i]);
    // detectionの情報から星の位置を決定する
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    drawStar(leftEye, "L");
    drawStar(rightEye, "R");
  }
}

// Starインスタンスを描画する
function drawStar(eye, LR) {
  const center = getCenter(eye);
  const star = new Star(
    center.avgX,
    center.avgY,
    starSize / 3,
    starSize,
    5,
    LR
  );
  stars.push(star);
  stars.forEach(star => {
    star.draw();
  });
  if (stars.length > 100) {
    stars.shift();
  }
}

// 星の大きさはお好みで。今回は顔の高さの1/10にしておきます
function setStarSize(detection) {
  const alignedRect = detection.alignedRect;
  const boxHeight = alignedRect._box._height;
  starSize = boxHeight / 10;
}

// 複数の座標の中心を取得する関数
function getCenter(arr) {
  const sumX = arr.reduce((sum, item) => sum + item._x, 0);
  const sumY = arr.reduce((sum, item) => sum + item._y, 0);
  const avgX = sumX / arr.length;
  const avgY = sumY / arr.length;
  return { avgX, avgY };
}
```

結局の所、機械学習についてなにも考えることなくコンテンツが作れてしまいました。

完成したものがこちらになります！　スマートフォンでもお楽しみいただけます。

-   [デモを試す](https://ics-creative.github.io/191227_ml5js/FaceApi_Star_Demo/)
-   [ソースコードを確認する](https://github.com/ics-creative/191227_ml5js/blob/master/FaceApi_Star_Demo/sketch.js)

### 5\. ほかにもこんなものが作れます

ml5.jsにはほかにもおもしろいAPIが数多くあります。

たとえば関節を同定してくれる**PoseNet**。これを用いると手をカニクリームコロッケにできます。

みなさんの手もカニクリームコロッケにしてみてください。

-   [デモを試す](https://ics-creative.github.io/191227_ml5js/posenet_Demo_Kanikoro)
-   [ソースコードを確認する](https://github.com/ics-creative/191227_ml5js/blob/master/posenet_Demo_Kanikoro/sketch.js)

またml5.jsで簡単な学習を行うこともできます。**FeatureExtractor**というAPIのサンプルでは画像をラベルごとに学習させ、画像を見せると学習から一番関連のあるラベルの名前を返してくれます。

アイデア次第でいろいろなものが簡単に作れることがおわかりいただけたでしょうか？　一見手を出しにくい機械学習ですが、ml5.jsを使えばこんな風に開発のハードルがグンと下がります。これを機に機械学習に興味が出てさらに高度なものが作りたくなったらTensorFlowに手を出すのもまた一興。

発想力を活かして、新年会の主役の座をゲットしましょう！