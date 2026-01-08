---
title: "デザイナーにもお勧め！ CSSもThree.jsもタイムライン編集を可能にするTheatre.jsが凄い"
source: "https://ics.media/entry/240827/"
publishedDate: "2024-08-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブサイトの演出を作る上でアニメーションの実装は欠かせません。一般的には、CSSアニメーションやJavaScriptのライブラリ（GSAPジーサップなど）を用いてコードベースで動きをつけることが多いと思います。ですが、完全にコードだけでアニメーションを調整するのは大変だと思ったことはないでしょうか？

一度実装したことがある方は共感いただけるかもしれませんが、少し直そうにもコードに戻って調整し、反映されたブラウザ画面を確認して、もう一度コードを直して…と往復していると結構大変です。また、アニメーションさせるプロパティや要素が複数ある場合には、コードを解読する難易度も上がります。

本記事ではそんな悩みを解決できる、GUIからアニメーションを調整できるライブラリ「[Theatre.jsシアタージェイエス](https://www.theatrejs.com/)」を紹介します。

Theatre.jsを導入すれば、以下のような複数の要素を使用し、タイミングもバラバラで複雑なアニメーションがGUIから簡単に作ることができます。導入して快適なアニメーション制作体験を手に入れてみませんか？

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240827_theatrejs/multiple-animation/)

### Theatre.jsとは

Theatre.jsは、DOMだけでなくCanvasに描画されるような要素に対してもアニメーションの追加や編集が行えるアニメーションライブラリです。コードベースではなく、**動画編集アプリのようにGUIからアニメーションの作成と調整を行えることが特徴**です。

たとえばUIをドラッグして視覚的にキーフレームやイージングのベジェ曲線を調整できたり、スペースキーで再生/停止してアニメーションを確認できます。

▼作業画面の例

-   [サンプルを別ウインドウで開く（GUIの操作感を試す）](https://ics-creative.github.io/240827_theatrejs/sample/)

#### 作業時の仕組み

Theatre.jsでは、**ブラウザのローカルストレージを使用してアニメーションが保存されます**。気に入ったアニメーションになるまで調整したら、JSONファイルをエクスポートし、プロジェクトに読み込んで使用するというフローです。

ネイティブアプリのようにアニメーション保存用のファイルを用意して都度セーブする必要はないので、ストレスなく作業できます。

### 導入方法

今回は[Three.js](https://threejs.org/)でメッシュオブジェクトを用意し、Theatre.jsでアニメーションを作成します。

レンダラーの準備やメッシュやライティングの配置等、Three.jsのセットアップ方法の紹介は省略いたします。サンプルを用意していますので、以下のリンクのプロジェクトをクローン等してお試しください。また、『[Three.js入門サイト](https://ics.media/tutorial-three/)』にてThree.jsを一から学習できますので、ぜひ合わせてご覧ください。

-   [ソースコードを確認する](https://github.com/ics-creative/240827_theatrejs/tree/main)

#### ①ライブラリの導入

まずはライブラリをインストールします。インストールにはパッケージマネージャーを使用します。

```
npm install @theatre/core @theatre/studio
```

CDNで読み込みたい場合は[公式ドキュメント](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#add-theatre.js-studio)を参考にしてください。

#### ②作業用GUIの用意

使用するモジュールをインポートしておきます。

```
import studio from "@theatre/studio";
import { getProject, types } from "@theatre/core";
```

続いて、Theatre.jsのスタジオ（作業用GUIのこと）およびプロジェクトの初期化を行い、アニメーションを保存するシートを作成します。

```
// Theatre.jsのスタジオを初期化（作業用GUIを表示）
studio.initialize();

// プロジェクトを初期化
const project = getProject("SampleProject"); // 任意の文字列をidとして設定できる

// アニメーションを保存するシートを作成
const sheet = project.sheet("Cube animation");
```

読み込み後に自動でアニメーションを再生させるため、次の1行を追加しておきます。

```
// Theatre.jsのロード後に自動で再生
project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity })); // ループ再生
```

#### ③ アニメーションさせる要素を用意し、プロパティを登録

今回はThree.jsで用意したメッシュを回転させるようなアニメーションをつけたいので、次のように記述します。

```
// Three.jsのメッシュを用意（一部省略）
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Three.jsのシーンに追加

/**
 *　シート "Cube animation" の定義
 */
const cubeObj = sheet.object("Cube", {
  // GUIから入力できるよう、変更させたいプロパティを定義
  // 回転を定義
  rotation: types.compound({ // types.compound() でグループ化
    x: types.number(0, { range: [-1, 1] }), // types.number(初期値, { range: [最小値, 最大値] })
    y: types.number(0, { range: [-1, 1] }), // −1回転 〜 １回転 の想定
    z: types.number(0, { range: [-1, 1] }),
  }),
  
  // （中略）
  
  // 色を定義
  color: types.rgba({ r: 255, g: 0, b: 0, a: 1 }),
});
```

`sheet.object(任意の文字列ID, アニメーションさせるプロパティの定義)`の第二引数にアニメーションさせるプロパティの定義を追加します。`types.number()`の場合は、`range[最小値, 最大値]`でGUIの入力範囲を指定できます。

`number`のほかに、`boolean`、`string`、`rgba`などを指定できます。詳細は[Prop types – Theatre.js](https://www.theatrejs.com/docs/latest/manual/prop-types)を参照ください。

続いて、ブラウザのGUIから変更された値がオブジェクトに反映されるよう、アニメーションを定義したオブジェクトの`onValuesChange()`メソッドに関数を渡します。

```
// GUIからの入力をメッシュやマテリアルに反映
cubeObj.onValuesChange((values) => {
  // 回転を反映
  const { x, y, z } = values.rotation;
  mesh.rotation.set(x * 2 * Math.PI, y * 2 * Math.PI, z * 2 * Math.PI); // 回転度合いが反映されるよう変換（Three.jsは度数法ではなくラジアン）

  // （中略）
  
  // マテリアルの色を反映
  material.color = values.color;
});
```

これでGUIを表示させる準備が整いました。

#### ④ ブラウザでアニメーションを作成

ブラウザを確認しアニメーションをつけてみましょう。まずは、次のいずれかの手順でアニメーションさせるプロパティをシーケンスに追加します。

-   プロパティ名を右クリックし［Sequence］ボタンか［Sequence all］ボタン（`types.compound`でグループ化しているプロパティの場合）を押下する
-   プロパティ名の左横にある菱形のボタンをクリックする

これでキーフレームが登録できるようになりますので、菱形の［キーフレームの追加/削除］ボタンをクリックするか、シークバーを移動させて値を変えることでキーフレームを打っていくことができます。

![Theatre.jsのUI - キーフレーム](https://ics.media/entry/240827/images/240827_theatrejs_keyframe.webp)

シークバーはバーをドラッグしたり、タイムライン上をクリックすることで直感的に移動させられます。また、シークバーをクリックすると入力欄が出るので、数値を細かく指定し移動させられます。ほかにはキーフレームの左右の矢印ボタンを押下するとキーフレームを打った秒数に直接ジャンプすることもできるので、秒数を揃えてキーフレームを打ちたい場合には便利です。

![Theatre.jsのUI - シークバー](https://ics.media/entry/240827/images/240827_theatrejs_seaqbar.webp)

細かい操作感は文字で説明するより、実際に操作を体験していただくのが一番だと思いましたのでサンプルを用意しました。キーフレームを追加・削除したり、値を変えてみたり、イージングを調整することもできますので自由にお試しください。

-   [サンプルを別ウインドウで開く（GUIの操作感を試す）](https://ics-creative.github.io/240827_theatrejs/sample/)

※画面左上のUIの［SampleProject］→［Cube animation: default］→［Cube］タブを押下するとタイムラインが表示されます。

※初回再生時は筆者の方で用意したアニメーションが再生されますが、変更したアニメーションはブラウザのローカルストレージに保存されます。

![作業時の画面](https://ics.media/entry/240827/images/240827_theatrejs_ui_sample.png)

お試しいただくと、アニメーションの再生/停止が`space`キーで行えたり、取り消しや取り消しのやり直しも行えたりと、一般的な動画編集アプリのように簡単に操作できることがお分かりいただけたのではないでしょうか。

▼操作方法の一例 ![Theatre.jsのUI](https://ics.media/entry/240827/images/240827_theatrejs_workscreen_ui.png)

-   アニメーションの再生/停止：`space`
    
-   操作UIの表示切り替え：`alt`（Windows）/ `option`（Mac）+ `\`（JIS配列キーボードは`alt`/`option`+`¥`）
    
-   取り消し：`ctrl`（Windows）/ `command`（Mac）+ `Z`
    
-   取り消しのやり直し`ctrl`（Windows）/ `command`（Mac）+ `shift` + `Z`
    

今回紹介しきれなかった操作方法もたくさんあります。操作方法一覧は、[Keyboard & Mouse Controls](https://www.theatrejs.com/docs/latest/manual/keyboard-shortcuts)や、[Working with Sequences](https://www.theatrejs.com/docs/latest/manual/sequences)をご確認ください。

#### ⑤ デプロイ

このままでは、ローカルストレージに保存されている作業中のブラウザでしかアニメーションが再生されないので、デプロイ時にはアニメーションの情報をもったJSONファイルをエクスポートし参照させる必要があります。

作業しているブラウザからプロジェクト名を選択し、［Export プロジェクト名 to JSON］ボタンを押下するとJSONファイルが出力されます。

![Theatre.jsからエクスポート](https://ics.media/entry/240827/images/240827_theatrejs_export.png)

ダウンロードされたJSONファイルをソースコードの任意のディレクトリに追加したら、JSにインポートします。`getProject()`関数の第二引数に、以下のように`state`を指定したオブジェクトを渡します。

これで、ローカルストレージに保存されたアニメーションではなく、書き出されたJSONファイルを元にアニメーションが初期化されるようになります。

```
import projectState from "../assets/SampleProject.theatre-project-state.json"; // パスは環境に合わせて変更ください

// プロジェクトを初期化
// const project = getProject("SampleProject"); // 初回でJSONファイルがない場合はこちら
const project = getProject("SampleProject", { state: projectState }); // 🌟書き出したJSONファイルを参照しアニメーションを初期化
```

続いて、作業用のUIを非表示にします。非表示にするには、以下の1行を削除かコメントアウトするだけでOKです。

```
// Theatre.jsのスタジオを初期化（作業用GUIを表示）
// studio.initialize();
```

[Vite](https://ja.vitejs.dev/)などの開発環境を使用している場合は、開発環境でのみUIが表示されるようにしておきます。

```
// （Viteの場合）開発環境でのみ作業用GUIを表示
if (import.meta.env.DEV) {
  studio.initialize();
}
```

### 作例紹介

冒頭でも少し触れましたが、Theatre.jsを使用して複数の要素とアニメーションを組み合わせたデモを作成しました。

導入方法で紹介した際に使用したThree.jsの立方体メッシュに加え、新たに3DテキストやDOM要素のボタンを追加しています。画面表示時にテキストやボタンが出現するようなアニメーションを作成したり、ボタン押下やスクロールのイベントに応じて再生するアニメーションを設定して演出をつけています。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240827_theatrejs/multiple-animation/)
-   [ソースコードを確認する](https://github.com/ics-creative/240827_theatrejs/blob/main/src/multiple-animation)

#### 再生トリガー

次の3種類のアニメーションを用意しています。

1.  ロード後に自動で再生されるキービジュアルアニメーション
2.  キービジュアルアニメーションの再生完了後に開始するループアニメーション
3.  ボタン押下等で再生するアニメーション

Theatre.jsは`sheet.sequence.play()`メソッドでアニメーションを再生できますが、単純な再生・停止の操作はもちろん、再生速度や回数、逆再生の指定等も行えます。詳しくは[公式ドキュメント](https://www.theatrejs.com/docs/latest/api/core#sequence)をご確認ください。

▼さまざまなトリガーでアニメーションを再生する例

```
// アニメーションを保存するシートを作成
const kvSheet = project.sheet("KV Animation"); // ロード後自動で再生するキービジュアルアニメーション用のシート
const scrollAnimSheet = project.sheet("Scroll Animation"); // スクロールボタン押下時に再生するアニメーション用のシート
const textLoopSheet = project.sheet("Text Loop Animation"); // テキストのループアニメーション用のシート

(async () => {
  // Theatre.jsのロードを待つ
  await project.ready;

  // 🌟 ロード後、1度だけ再生
  await kvSheet.sequence.play();

  // 🌟 キービジュアルアニメーション後、ループアニメーションを開始
  textLoopSheet.sequence.play({
    iterationCount: Infinity, // 無限ループ
    direction: "alternate", // 通常再生-逆再生を往復
    rate: 0.8, // 0.8倍速
  });
})();

// 🌟 スクロールボタン押下で再生
const scrollButton = document.querySelector("#scroll-button");
scrollButton.addEventListener("click", () => {
  scrollAnimSheet.sequence.play();
});
```

#### DOM要素

作例内のスクロールボタンは、DOM要素で用意しています。アニメーションの作成方法は、導入方法で紹介したThree.jsを用いた実装方法とほぼ変わりません。アニメーションさせたいプロパティを`sheet.object()`で定義し、`onValueChange`でGUIからの入力をDOM要素の`style`プロパティに反映することで、アニメーションをつけられます。

```
<a href="#" id="scroll-button">Scroll▼</a>
```

```
// スクロールボタン
const scrollButton = document.querySelector("#scroll-button");

// GUIから入力するためのプロパティを定義
const scrollButtonObj = scrollButtonSheet.object("ScrollButton", {
  // 不透明度
  opacity: types.number(1, { range: [0, 1] }),
  // 透明度0のときに押下不可にするため、visibilityも定義
  visibility: types.stringLiteral("visible", {
    visible: "visible",
    hidden: "hidden",
  }),
});

// GUIからの入力を反映
scrollButtonObj.onValuesChange((values) => {
  scrollButton.style.opacity = values.opacity;
  scrollButton.style.visibility = values.visibility;
});
```

### まとめ

GUIでアニメーションを作成できるライブラリ、Theatre.jsを紹介しました。使用してみて以下のような印象をもちました。

よいと思った点

-   GUIで完結するので、複雑なアニメーションも簡単に作れて調整がしやすい。
-   複数のオブジェクトのアニメーションを一括で管理できて楽。
-   アニメーションがJSONファイルにまとめられるので、コードがスッキリする。

惜しい点

-   キーフレームアニメーションは開始点と終着点の2点が必要なので、終点だけを指定するようなアニメーションなどは不向きな場合もある。
-   動画編集のネイティブアプリと比較すると、UIの操作感が少し物足りなく感じる部分がある。

不向きなこともあるとはいえ、アニメーションの調整がGUIで簡単にできて革新的なライブラリだと思いました。とくに複雑なアニメーションを作成する際には真価を発揮するといえそうです。より良いコンテンツ作りに取り入れてみてはいかがでしょうか。