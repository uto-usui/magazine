---
title: "3分で3Dコンテンツが作れる！ 「cables」で始めるビジュアルプログラミング"
source: "https://ics.media/entry/190820/"
publishedDate: "2019-08-20"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

今日ではwebサイトでも積極的に3Dおよびインタラクティブな手法が用いられています。これによって画面に入りこむような、より没入感のある体験が可能となりました。商品を3D化して360度から見られるwebサイトなど見たことはないでしょうか。

一方で、インタラクティブな3Dコンテンツを作るには導入の敷居が高く感じられ、尻込みしてしまう方も多いでしょう。その敷居を下げてくれるのが『[cablesケーブルス](https://cables.gl/)』です。

cablesは開発はundevというベルリン/ケルンが拠点のデザインスタジオが行っており、ブラウザ上で視覚的にプログラミングが行えるツールです。インタラクティブな3Dコンテンツの作成を簡単に行うことができ、デザイナーにもエンジニアにも使いやすいツールとなっています。面倒なセットアップも必要ありません。

▼ 編集画面の例 ![](https://ics.media/entry/190820/images/190820_cables_sample.webp)

本記事ではcablesを極めればどんなコンテンツが作れるかを紹介し、簡単かつ魅力的なコンテンツの作り方を紹介します。

### cablesでどんなものが作れるか

[cables公式サイト](https://cables.gl/)を見てみましょう。うねうね動く3Dのオブジェクトが表示されており、マウスで視点を操作できます。

![デモ動画](https://ics.media/entry/190820/images/190820_cables_top.webp)

cablesは実際のwebサイトにも使われており多くのブラウザで利用可能です。cablesで制作されたサイトの事例としてwebサイト『[Website Of The Year](https://www.cssdesignawards.com/woty2016/)』をご覧ください。中心にある球体がマウス操作とともに動いています。このような動きのあるコンテンツがcablesなら比較的簡単に作ることができます。

![](https://ics.media/entry/190820/images/190820_cables_woty.webp)

以降では、実際に手を動かしながら作ってみましょう。

### 作品を作ってみよう

今回は下の動画のような作品を作ります。

![](https://ics.media/entry/190820/images/190820_cables_boxes.webp)

トップページから会員登録をするとマイページが表示されます。上部の「Create」メニューから空のプロジェクトを生成してください。

![](https://ics.media/entry/190820/images/190820_cables_5.png)

#### オブジェクトを設置してみよう

左の「add op」から「MainLoop」を検索しaddします。エディターに`MainLoop`という名前の要素が設置されました。これをオペレーターと呼びます。cablesではこのオペレーターをケーブルのようにつなげて画面を作成していきます。

![](https://ics.media/entry/190820/images/190820_cables_home.png) ![](https://ics.media/entry/190820/images/190820_cables_mainloop.png)

エディター内の移動はなにもないところで右クリック+ドラッグにより可能です。オペレーターを見失ったらCキーをクリックすることで最後に選択したオペレーターがエディター中心に移動します。

オペレーターのパラメーターをドラッグ+ドロップすることでオペレーターを追加できます。下の動画を参考にしながらcubeを作成してみましょう。

![](https://ics.media/entry/190820/images/190820_cables_cube.gif)

右上のビューに箱が表示されましたね！

#### オブジェクトに角度や色を与えよう

次は大きさや長さ、角度を変えたいので`Transform`オペレーターを追加してみましょう。

![](https://ics.media/entry/190820/images/190820_cables_transform.gif)

`MatCapMaterialNew`オペレーターは箱に質感を与えてくれます。画面右下のパラメーターウィンドウで好きな色に変更してみましょう。マテリアルはいくつか種類があるので色々試してみるとおもしろいかもしれません。

![](https://ics.media/entry/190820/images/190820_cables_material.png)

さらに、`OrbitControls`オペレーターを追加するとマウスで回転できるようになりました！

![](https://ics.media/entry/190820/images/190820_cables_orbit.gif)

次はcubeを増やしてみましょう。

#### オブジェクトを増やしてアニメーションさせよう

たった一つのオペレーターを追加することで箱を増やすことができます。`MatCapMaterial`の直前に、`RandomCluster`を設置してください。

![](https://ics.media/entry/190820/images/190820_cables_random.webp)

いい感じに増えてくれました！　パラメーターから箱の数や配置パターンを変えられるのでお好みで変えましょう。

![](https://ics.media/entry/190820/images/190820_cables_random_detail.png)

次に、箱に回転と動きを加えます。`RandomCluster`にあるRotate ZとScroll Xに`Timer`オペレーターを追加しましょう。

![](https://ics.media/entry/190820/images/190820_cables_move.webp)

いい感じですね！

ところで`Timer`オペレーターは何をしているのでしょう？　これは経過時間をプロパティに持つオペレーターです。`RandomCluster`のRotate ZとScroll Xがその値を受け取っています。

![](https://ics.media/entry/190820/images/190820_cables_timer.webp)

それでは最後に、この画面を書き出してwebサイトに埋め込んでみましょう。

### 書き出してwebサイトに組み込む

書き出しについては[こちらのチュートリアル動画](https://www.youtube.com/watch?v=YUAyS_NcwTA)を参考に行います。サンプルとして、こちらのアイキャッチに埋め込んでみたいと思います。

[サンプルを別ウィンドウで開く](https://ics-creative.github.io/190820_cables/)

完成したプロジェクトを保存し、Exportします。ここではSingle JavaScript Fileとして書き出します。

![](https://ics.media/entry/190820/images/190820_cables_export.png)

書き出されたフォルダーのindex.htmlを開き、canvas要素とscriptを埋め込みたいhtmlファイルに貼り付けましょう。 また、書き出されたフォルダ内のjsフォルダをhtmlファイルが入ったプロジェクトフォルダにコピーしましょう。

![](https://ics.media/entry/190820/images/190820_cables_paste.png)

ここで気をつけるのはcanvasのサイズをウィンドウに合わせるか親要素に合わせるかscript内で指定することです。この設定は上記画像の「画面サイズ等の設定」の部分で行えます。前者は`glCanvasResizeToWindow`をtrueに、後者は`glCanvasResizeToParent`をtrueにしましょう。

▼ windowいっぱいに表示したい時

```
document.addEventListener('DOMContentLoaded', function(event) {
  CABLES.patch = new CABLES.Patch({
    patch: CABLES.exportedPatch,
    prefixAssetPath: '',
    glCanvasId: 'glcanvas',
    glCanvasResizeToWindow: true,  //windowに合わせる
    onError: showError,
    onPatchLoaded: patchInitialized,
    onFinishedLoading: patchFinishedLoading,
  });
});
```

▼ 親要素に合わせたい時

```
document.addEventListener('DOMContentLoaded', function(event) {
  CABLES.patch = new CABLES.Patch({
    patch: CABLES.exportedPatch,
    prefixAssetPath: '',
    glCanvasId: 'glcanvas',
    glCanvasResizeToParent: true,  //親要素に合わせる
    onError: showError,
    onPatchLoaded: patchInitialized,
    onFinishedLoading: patchFinishedLoading,
  });
});
```

デフォルトではウィンドウに合わせるようになっているようなので、`glCanvasResizeToWindow`を`glCanvasResizeToParent`に書き換えましょう。

![](https://ics.media/entry/190820/images/190820_cables_html_finish.gif)

うまくいきましたね！

### 応用例の紹介

今回示したのはほんの一例です。トップページからはcablesを用いた実例を見ることができ、さらにマイページでは投稿された作品に触れたり用いられているオペレーターを見ることができます。ぜひ活用していきましょう。

cablesでは3Dモデルを読み込むことも可能です。『[Assimpアシンプ](http://www.assimp.org/)』と呼ばれるライブラリによって3DモデルをJSON形式に変換し`Json3dMesh`というオペレーターで読み込みます。

▼ 3Dモデルをcablesで読み込んでいる例 ![車のモデル](https://ics.media/entry/190820/images/190820_cables_car.webp)

ロサンゼルスの人々のツイート数を集計し視覚化するwebサイト『[ConvergenceLA](https://convergencela.com/)』ではデータビジュアライゼーションと3Dモデルの組み合わせにより直感的な表現を可能にしています。さらに、VRコンテンツの作成やオーディオデータを読み込むことなども可能です。

cablesはYouTubeチャンネルでたくさんの手法を紹介しています。特に3分間にまとまっている『[Byte Size tutorials](https://www.youtube.com/playlist?list=PLYimpE2xWgBt8kR3H3Pk_U0PYqLrHNWf5)』はおすすめです。筆者もコツコツ定石を身につける日々です。

cablesによってインタラクティブなコンテンツを手軽に制作できるようになりました。ぜひ皆さんも作品を投稿しcablesコミュニティを活発にしていきましょう。