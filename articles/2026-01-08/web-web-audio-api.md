---
title: "音を操るWeb技術 - Web Audio API入門"
source: "https://ics.media/entry/200427/"
publishedDate: "2020-04-27"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Webにおける表現はどんどん進化しています。Webサイトには当然のように動画が埋め込まれるようになり、CSSやSVG、canvasでのさまざまな表現が頻繁に見られるようになりました。さらにAR、VRといった表現も台頭し筆者も毎日ワクワクしながらインターネットの海を泳いでいます。

その中であまりメジャーではないと感じるのは「音」による表現です。もちろん音を用いた素晴らしいWebサイトはたくさんありますが、環境の制約が視覚表現以上に大きいため多くは見られないのでしょう。

とはいえ、音と視覚表現を組み合わせることによって表現できる世界観、インタラクション、その他諸々は計り知れないと筆者は思っています。今後オーディオなどの技術の進歩によって上記で述べた制約も乗り越えられるようになるかもしれません。時代を先どりしたい読者に向けて、今回の記事ではWebで音を扱う技術**Web Audio API**についてお届けしたいと思います。

**※本記事では音声を扱います。周りの環境に注意し、イヤホンやヘッドホンで聞く方は音量に気を付けて視聴してください。普段より小さめの音量に設定することを推奨します。**

### Web Audio APIとは

Web上のオーディオ再生と聞いて、まず思い浮かべるのはHTMLの`<audio>`タグによる音の再生かと思われます。 単に音を鳴らすだけならばこれで事足りるでしょう。しかし以下の高度な操作は`<audio>`タグでは不可能です。

-   正確なリズムで複数の音を連続的に再生する
-   ブラウザゲームでインタラクティブに音を再生する
-   ブラウザ上での音のフィルタリング処理を行う

これらを可能にするのがWeb Audio APIになります。Web Audio APIの基本的な使い方としては以下のようになります。

![概略図](https://ics.media/entry/200427/images/images/200427_webaudioapi_outline.png)

入力の部分で音源を読み込む、または生成します。「まずは音を出してみよう」の項で解説します。

効果の部分でさまざまなエフェクトをかけます。ここがWeb Audio APIの醍醐味と言っても過言ではありません。「音を加工してみよう」の項で解説します。

ここで記載したことは[MDNのWeb Audio API項](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API)で詳しく記載されているので興味のある方はご覧ください。

入力や効果は複数組み合わせることが可能です。いわゆるエコーやビブラート、さらにはボイスチェンジャーなども元々Web Audio APIに組み込まれているfilterやそれらを組み合わせることで再現できます。

Web Audio APIはIE以外のほぼすべてのブラウザで使用可能ですが、Safariなど一部prefixが必要なブラウザもあります。本記事のサンプルはChromeまたはFirefoxでの動作を想定しておりますので、あらかじめご了承ください。

![Can I use](https://ics.media/entry/200427/images/images/200427_webaudioapi_can-i-use.png) 参考：[Web Audio API | Can I Use](https://caniuse.com/#feat=audio-api)

それでは実際にWeb Audio APIを触っていきましょう。

### まずは音を出してみよう

これからいくつかのサンプルが出てきますが、コードを読むときはそのコードが以下の3つの処理のどれを担当しているかを意識しながら読んでみてください。

1.  音源を作成する（本章で紹介）
2.  効果をかける（「音を加工してみよう」の章で紹介）
3.  出力に接続する(基本的にはaudioContext.destination)

本章では主に 1. 音源を作成する を扱います。

Web Audio API内で利用できる音源の作り方はいくつかあります。

-   `MediaElementAudioSource`でHTML内の`<audio>`や`<video>`要素を取得
-   `AudioBuffer`で短い音声ファイルを変換、またはbufferの値を直接指定して作成
-   オシレーターを作成する

#### 既存のオーディオファイルを読み込む方法

一つ目のサンプルは`<audio>`から読み込んだ音源をAudioContextに接続する方法です。 比較的長い音源を扱うにはこの方法がよいでしょう。

▼HTML

```
<button class="play">play</button>
<button id="pause">pause</button>
<audio src="../sample.mp3"></audio>
```

▼JavaScript

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const audioElement = document.querySelector("audio");
// Web Audio API内で使える形に変換
const track = ctx.createMediaElementSource(audioElement);

document.querySelector("#play").addEventListener("click", () => {
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  // 出力につなげる
  track.connect(ctx.destination);
  audioElement.play();
});

// audioElementを一時停止する
document.querySelector("#pause").addEventListener("click", () => {
  audioElement.pause();
});
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200424_webaudioapi/part1-audio/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/200424_webaudioapi/tree/master/part1-audio)

Web Audio APIは`audioElement`で再生された音に対して効果を適用できます。 canvasが`Image`要素に効果を加えられるようなイメージですね。

先ほど`<audio>`で読みこんだ音声は正確なスケジューリングは苦手と紹介しました。 したがって、正確なスケジューリングを行うには生のデータを`AudioBuffer`インターフェースとして扱う方法が適しています。こちらは比較的短い（～45秒）音声に用いられています。

▼HTML

```
<button class="play">play</button>
<button id="stop">stop</button>
```

▼JavaScript

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

let sampleSource;
// 再生中のときはtrue
let isPlaying = false;

// 音源を取得しAudioBuffer形式に変換して返す関数
async function setupSample() {
  const response = await fetch("../sample.mp3");
  const arrayBuffer = await response.arrayBuffer();
  // Web Audio APIで使える形式に変換
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// AudioBufferをctxに接続し再生する関数
function playSample(ctx, audioBuffer) {
  sampleSource = ctx.createBufferSource();
  // 変換されたバッファーを音源として設定
  sampleSource.buffer = audioBuffer;
  // 出力につなげる
  sampleSource.connect(ctx.destination);
  sampleSource.start();
  isPlaying = true;
}

document.querySelector("#play").addEventListener("click", async () => {
  // 再生中なら二重に再生されないようにする
  if (isPlaying) return;
  const sample = await setupSample();
  playSample(ctx, sample);
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", async () => {
  sampleSource?.stop();
  isPlaying = false;
});

```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200424_webaudioapi/part1-buffer/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/200424_webaudioapi/tree/master/part1-buffer)

`AudioBuffer`のもつ`buffer`は-1~+1で正規化された数字の配列で定義されています。そのため上に挙げたように音源をbuffer化する以外にも、自分で作成することも可能です。[MDNのcreateBuffer項](https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createBuffer)ではお手製のノイズを作成する方法が載っているので、興味のある方はぜひご覧ください。

`createMediaElementSource`による音源の取得と`createBufferSource`による音源の取得については以下のサイトでわかりやすく解説されていますので、適宜参照してください。

-   [オーディオデータの再生 ｜ WEB SOUNDER](http://curtaincall.weblike.jp/portfolio-web-sounder/webaudioapi-basic/audio)

#### 音を作る方法

高校の物理の時間、音は「波」だと習ったことを覚えているでしょうか。Web Audio APIでは音を生成するインターフェースとして`OscillatorNode`が用意されています。YAMAHAさんの記事 『 [02/発振回路（発振器）＝オシレーター | シンセサイザー入門](https://jp.yamaha.com/products/contents/music_production/guide_to_synth/002/index.html) 』では電気的に音を生成する回路としてのオシレーターについて図解を用いてわかりやすく説明されています。オシレーター以外にもシンセサイザーについての理解が深まるおすすめのコンテンツです。

ではWeb Audio APIで`OscillatorNode`を作成するサンプルコードをご覧ください。

▼JavaScript

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
let oscillator;
// 再生中のときtrue
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if (isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // 440HzはA4(4番目のラ)
  oscillator.connect(ctx.destination);
  oscillator.start();
  isPlaying = true;
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});

```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200424_webaudioapi/part1-oscillator/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/200424_webaudioapi/tree/master/part1-oscillator)

`oscillator.type`は波の種類を表しています。波の形は下の図のようになり、それぞれ音が異なります。実際に聴いてみてください。（サイン波、矩形波、ノコギリ波、三角波の順で流れます）

![波の種類の図](https://ics.media/entry/200427/images/images/200427_webaudioapi_wave-type.png)

`oscillator.frequency`は波の周波数、すなわち音の高さを表しています。

試しに880を設定すると440のときより1オクターブ高いラの音が聞こえます。また、`setValueAtTime`の第二引数には`ctx.currentTime`を与えていますが、これは`ctx.start`を呼び出した時刻に440Hzのfrequencyを与えることを意味しています。試しにこのコードの下に`oscillator.frequency.setValueAtTime(880, ctx.currentTime + 2);`という一行を足すと、再生して2秒後に1オクターブ高い「ラ」の音に切り替わります。

![setAtValue説明](https://ics.media/entry/200427/images/images/200427_webaudioapi_setatvalue.png)

ところで、なぜ`oscillator`をイベントリスナーの中で生成しているのでしょう？`OscillatorNode`は`start`で再生、`stop`で停止しますが一度停止した`oscillator`について、再度`oscillator.start`を実行しても再生されない仕様となっているからです。`OscillatorNode`は再生のたびに生成する必要があります。

### 音を加工してみよう

音の加工にはオーディオエフェクトフィルターが用いられます。冒頭で紹介したWeb Audio APIの「効果」にあたる部分です。

最もよく用いられるのは音量を調節する`GainNode`インターフェースでしょう。先ほど作成した`OscillatorNode`に`GainNode`をつなげてみます。

▼HTML

```
<button class="play">play</button>
<button id="stop">stop</button>
<button id="minus">-</button>
<button id="plus">+</button>
```

▼JavaScript

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

let oscillator;
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if (isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  // frequencyのvalueは直接代入も可能
  oscillator.frequency.value = 440;
  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  isPlaying = true;
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});

document.querySelector("#plus").addEventListener("click", () => {
  if (gainNode.gain.value < 1) {
    gainNode.gain.value += 0.05;
  }
});

document.querySelector("#minus").addEventListener("click", () => {
  if (gainNode.gain.value > 0.05) {
    gainNode.gain.value -= 0.05;
  }
});
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200424_webaudioapi/part2-gain/)
-   [ソースコードを確認する](https://github.com/ics-creative/200424_webaudioapi/tree/master/part2-gain)

`gainNode`というエフェクターを作成し、音源と出力の間に繋げました。`gainNode`の`gain`プロパティの値の大きさに応じて音量が変化します。

`GainNode`をはじめとするオーディオエフェクトフィルターは、実は`AudioContext.destination`以外にもつなげられます。 `connect`メソッドでは`GainNode`や`OscillatorNode`といった`AudioNode`以外にそれぞれのパラメータである`AudioParam`も引数にとります。これを用いて次は「ビブラート」を発生させてみましょう。

みなさんも知っているとは思いますが、ビブラートとは音を揺らすテクニックです。ビブラートを作成するには音の何かを振動させる必要があります。いったい何を振動させればよいのでしょう？

正解は、オシレーターの振動数（frequency）です。

オシレーターの振動数を揺らすために、新たにオシレーターを作成します。このような補助的なオシレーターを「LFO（Low Frequency Oscillator）」と呼びます。LFOの特徴としては耳に聞こえないくらい低い周波数であることがあげられます。

では実際にコードを見ていきましょう。

▼HTML

```
<button id="play">play</button>
<button id="stop">stop</button>
<p>ビブラートの速さ</p>
<button id="hz-minus">-</button>
<button id="hz-plus">+</button>
<p>ビブラートの深さ</p>
<button id="depth-minus">-</button>
<button id="depth-plus">+</button>
```

▼JavaScript

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

let oscillator;
// LFOの作成
const lfo = ctx.createOscillator();
const depth = ctx.createGain();
depth.gain.value = 50;
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if (isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  // frequencyのvalueは直接代入も可能
  oscillator.frequency.value = 440;

  // lfoの波形をサイン派に
  lfo.type = "sine";
  // lfoの周波数を10Hzに設定
  lfo.frequency.value = 10

  // ここで出力にgainNodeをつなげる
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();

  // lfoを、depthを経由してオシレーターの周波数パラメータにつなげる
  lfo.connect(depth).connect(oscillator.frequency);
  lfo.start();

  isPlaying = true;
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});

// ビブラートの速さを調節
document.querySelector("#hz-plus").addEventListener("click", () => {
  lfo.frequency.value += 3
});

document.querySelector("#hz-minus").addEventListener("click", () => {
  if (lfo.frequency.value > 3) {
  lfo.frequency.value -= 3
  }
});

//ビブラートの深さを調節
document.querySelector("#depth-plus").addEventListener("click", () => {
  depth.gain.value += 5;
});

document.querySelector("#depth-minus").addEventListener("click", () => {
  if (depth.gain.value > 5) {
    depth.gain.value -= 5;
  }
});
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200424_webaudioapi/part2-vibrato/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/200424_webaudioapi/tree/master/part2-vibrato)

なぜ`lfo`を直接`oscillator.frequency`に接続せず`depth`をはさんでいるか、という理由については下記の画像を参照してください。`OscillatorNode`は-1~+1の値しか取れないため、増幅が必要になります。

![depthの役割の画像](https://ics.media/entry/200427/images/images/200427_webaudioapi_vibrato-description.png)

また、`lfo`も`OscillatorNode`であるため、明示的な`start`が必要な点についても注意しましょう。`lfo`を`start`のたびに生成していないのは可聴領域外なので流しっぱなしでも問題はないからです。（この辺りは好みですね）

### おわりに

本記事で紹介した音の操作はほんの一例です。Web Audio APIでできることはまだまだたくさんあります。たとえば音の波形を可視化したり、音声を立体音響にしたりとさまざまです。

『 [CHROME MUSIC LAB](https://musiclab.chromeexperiments.com/Experiments) 』というWebサイトではWeb Audio APIなどを用いた多くのコンテンツがあります。ぜひ遊んでみてください。個人的には声のピッチが変えられるVOICE SPINNERが面白くて好きです。

音をプログラミングしたい、音と視覚表現を組み合わせたい、音とデジタルへの理解をより深めたいなど興味の方向はさまざまと思います。 ある人はWeb Audio APIのさらに深いところに触れ好奇心を満たし、ある人は[tone.js](https://tonejs.github.io/) などのライブラリを用いコンテンツ作りに役立てることができるでしょう。この記事がその道を開くきっかけの一端になれば幸いです。

本記事では最小限の説明となりましたが、詳細に知りたい方へオススメの記事を紹介します。筆者自身も大変お世話になりました。興味を持った方はぜひ読んでみてください。

-   [MDN Web Audio API](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API) ：MDNによるWeb Audio APIの解説。チュートリアルもあり。
-   [g200kg Music&Software](https://www.g200kg.com/jp/docs/webaudio/) ：それぞれのインターフェースに関する実用的な解説があります。
-   [WEB SOUNDER](https://weblike-curtaincall.ssl-lolipop.jp/portfolio-web-sounder/) ：上記と類似していますが、より現実に即したフィルターの実装の解説が多いです。ミュージシャン向け？