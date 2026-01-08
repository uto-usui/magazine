---
title: "次世代画像形式のWebP、そしてAVIFへ。変わり続ける技術に対応するweb制作の黄金解"
source: "https://ics.media/entry/201001/"
publishedDate: "2020-10-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

WebP（ウェッピー）という画像形式をご存知でしょうか？　長い間、webの静止画は大部分がJPEG/GIF/PNGのいずれかでした。WebPはこのすべてを置き換えることができる次世代のフォーマットです。2020年9月リリースのiOS 14がWebPをサポートしたことで、主要なモダンブラウザーの足並みがようやく揃いました。

この記事では、新しい技術の恩恵を最大限に受けつつ、変わり続ける画像形式に対応していくための最適解を探ります。

※ この記事の初版は2020年10月の公開ですが、各ブラウザーの対応状況等は2025年2月に最新の内容に更新しています。

### SafariがWebPをサポート。フォーマット戦争ついに終結か？

2020年現在、webで主流の画像形式はJPEG/GIF/PNGの3つでしょう。

2006年リリースのIE7で透過PNGがサポートされたことで、静止画に関しては「**写真のJPEG、ロゴやイラストのGIF、透過画像のPNG**」という明確な使い分けが確立されました。アニメーション画像についてはやや遅れましたが、2020年のChromium版Edgeの登場により、「基本はAPNGを使い、未対応環境ではGIFアニメにフォールバック」という対応が現実的な選択肢となってきました。

※主要な画像形式にはもうひとつSVGがあります。SVG画像はその他のラスター画像（JPEGやPNG）とは仕組みも利用範囲も大きく異なるので、この記事では扱いません

しかし、一見安定した状況の背後で、ブラウザベンダー間では次世代の標準画像形式の座をめぐって熾烈な争いが繰り広げられていました。 ![画像フォーマット戦争の歴史](https://ics.media/entry/201001/images/images/201001_browser_support_history.png)

10年近い競争の中で、JPEG XRはEdgeがChromium版になったことで消滅しました。JPEG 2000は依然としてSafariでサポートされていますが、web用の画像としてはほとんど利用されていません。 そして2020年9月にiOS 14がWebPをサポートしたことで、この競争は実質的にWebPの勝利という形で決着しました。

#### WebPはJPEG/GIF/PNG(APNG)をカバーする魅力的なフォーマット

WebPを使うことで、これまでは用途や画像の特徴ごとに使い分けが必要だったフォーマットの一本化が可能になります。主な特徴を簡単に紹介しましょう

-   高い圧縮率：同等画質のJPEGと比較して20-30%のサイズ削減（JPEGの置き換え）
-   不可逆圧縮と透過アニメーションの併用（透過アニメーションでも画質を犠牲にしてサイズを削減できる）（GIF/PNGの置き換え）
-   画質劣化のない可逆圧縮もサポート（GIF/PNGの置き換え）

![WebPの特徴](https://ics.media/entry/201001/images/images/201001_webp_features.png)

WebPの圧縮設定や実際の画質比較は、以前の記事[『WebP画像を作成できるアプリ「WebP画像を作る君」を公開』](https://ics.media/entry/11711/)で解説しています。ぜひ確認して手元でも試してみてください。

#### さらに次世代のフォーマット、AVIFも

これであとはWebP対応ブラウザの普及を待つだけ……と言いたいところですが、実は次の種はもう播かれています。 Chromeは2020年8月リリースのChrome85で**さらに次世代の画像フォーマットAVIF（AV1 Image File Format）をサポート**しました。AVIFは次のような特徴をもった画像形式です。

-   多様な色空間やサンプリング方式をサポート
-   WebPよりもさらに高画質でコンパクト（同じサイズでも画質が高く、JPEGに特有のブロックノイズも発生しない）
-   Amazon・Netflix・Google・Microsoft・Mozilla等の幅広い企業によるコンソーシアムが共同で開発（FacebookやAppleも後から参画）

![PNG/JPEG/WebP/AVIFの比較サンプル](https://ics.media/entry/201001/images/images/201001_img_example.png)

-   [デモを別画面で表示](https://ics-creative.github.io/201001_webp_avif/picture_sample/index.html#sample1)

2021年5月にFirefoxが、2022年10月にSafariがサポートしたことで、AVIFも徐々に実用的な選択肢になりつつあります。Edgeの対応が遅れていましたが、2024年1月のEdge 121でサポートされたことで主要ブラウザーの足並みが揃いました。AVIF(AV1)を開発するコンソーシアムはNetflixやAmazonといった映像配信プラットフォームが主導しています。近い将来に次の標準フォーマットになる可能性は十分にあるでしょう。

とはいえ、AVIFはまだ手軽にエンコードできる環境が整っておらず、制作環境としては発展途上の形式です。すぐにWebPを置き換えるものではなく、高度な圧縮が要求される場面から徐々に普及していくものと思われます。後述する`ffmpeg`のようなコマンドラインツールや、[Squoosh](https://squoosh.app/)のようなオンラインサービスを使って変換することはできるので、興味のある方は試してみてください。

### WebP、そしてその次に対応するためのアプローチ

では、当面はWebPがベストな画像形式だとして、いますぐすべてをWebPに変換できるでしょうか？　webサイトやアプリの性質にもよりますが、まだしばらくは難しいケースが多いでしょう。最新OSがWebPに対応しても、ユーザーのバージョンアップにはある程度の期間が必要です（iOSの場合、9割がバージョンアップするのに1年程度必要。デスクトップOSの場合はさらに長くなる傾向があります）。さらに、IEの対応を切れない場合、WebPへの切り替えは永遠にできません。

古いOSやブラウザが無くなるのを待っていたら、その間にAVIFのような次のフォーマットが普及してしまうかもしれません。 そこで、現実的な対応としては複数画像形式の並行サポートが必要になります。

複数の画像形式を同時にサポートすることで、モダンなブラウザにはWebPを使いつつ、未対応のブラウザでは従来通りJPEGやPNGを表示します。また、将来AVIFを使いたくなった時にも同じ方法でサポートブラウザのみでAVIFを利用することができるはずです。

![画像形式の並行サポートのイメージ](https://ics.media/entry/201001/images/images/201001_multi_format_support.png)

### 複数形式の対応は「1.いつ作るか」×「2.いつ出し分けるか」で決める

複数の画像形式をサポートして出し分ける、というと少々難解に聞こえるかもしれません。しかし、実際に考えるべきことは次の2つ　だけです。

1.  WebPやその他のフォーマットの画像を**いつどうやって作るか**
2.  WebPとその他のフォーマットの画像を**いつどうやって出し分けるか**

それぞれについて、webサイトの性質や開発運用環境を踏まえた選択・組み合わせを見つける必要があります。 具体的な選択肢とメリット・デメリットを見ていきましょう。

### 1\. いつ作るか：WebP画像を作るタイミング

WebPのデータを作るタイミングは大きくわけて3つあります。 作るタイミングによって、作業する人やツール、メリットデメリットが変わってきます。順番にみていきましょう。

#### A. デザイン作業の一環としてデザイナーが作成

一番シンプルなのが素材データの一部としてWebP画像を出力してしまうことです。

WebPを標準で扱えるグラフィックソフトはまだまだ少数派ですが、Adobe Photoshopでは2022年5月リリースのバージョン23.2からWebPの保存に対応しています。画像をWebPで保存するには、ファイルメニューの「コピーを保存」を使用します。残念ながら「アセットの書き出し」や「Web用に保存」ではWebPを使用できず、プレビューを見ながら画質を調整することもできませんが、「ひとまずWebPを試してみたい」という場合にはお手軽な方法です。

もう少し細かな調整を行いたい場合、[Googleが提供するPhotoshop用のプラグイン](https://developers.google.com/speed/webp/docs/webpshop)をインストールするのがオススメです。

![PhotoshopプラグインでWebP保存する様子](https://ics.media/entry/201001/images/images/201001_phtoshop_webp_plugin.png)

（※上記の英語ページ内にも解説がありますが、macOS Catalina以降ではダウンロードしたプラグインを利用する前にターミナルを使って`xattr -r`コマンドを実行する必要があります。これを実行しないと「開発元が不明のため開けません」とエラーが表示され、WebP保存に失敗します。）

こちらもPhotoshop標準の場合と同様に「保存/コピーを保存」でしか利用できませんが、プレビューを見ながら画質とファイルサイズの調整ができるので、より実用的と言えるでしょう。

なお、一度PNG等で出力してから別なツールでWebPに一括変換することもできますが、あまりオススメはしません。 Photoshopを使うメリットは、デザイナーが画質とサイズを確認しながら最適なWebPファイルを作れることです。一括変換するのであれば作業はエンジニアにまかせて、後述の方法で開発フローに組み込んでもらう方が効率的です。

一点一点画像を「別名で保存」していく作業は時間もかかり、間違いも起こりがちです。この方法はトップページのメインビジュアルのような、サイズと画質をきっちりこだわりたい場所で利用するのが良いでしょう。

#### B. エンジニアがビルド時に生成

大量の画像を機械的に変換するのであれば、エンジニアがビルド等のタイミングで一括変換するのが良いでしょう。

コマンドラインで変換する場合、ffmpegを使うのが汎用的です。拡張子を`webp`にするだけで変換できます。

```
ffmpeg  -i  元ファイル.png  出力ファイル.webp
```

圧縮率等の設定を変えることもできます。オプションの意味と設定できる値の範囲は[ffmpeg公式ドキュメントの9.10 libwebpの項](https://www.ffmpeg.org/ffmpeg-codecs.html#Options-28)を参照してください。

```
ffmpeg  -i  元ファイル.png  -qscale 70  -preset photo  出力ファイル.webp
```

また、最近のweb開発ではwebpackを使ってビルドプロセスを構成しているケースも多いでしょう。 画像の変換圧縮を行うライブラリはnpmから多数提供されているため、それらを使うと簡単にビルド時にWebPを生成できるようになります。次の例はJPEG/PNGをWebPに変換するwebpack.config.jsの例です。

▼ webpack.config.js

```
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'img/'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
          from: 'src/img/',
          to: 'img/' // dist/img に出力
      }]
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)$/i,
        options: {
          quality: 50
        },
      }],
      detailedLogs: true,
      overrideExtension: true
    })    
  ]
};
```

-   [サンプルのソースを表示](https://github.com/ics-creative/201001_webp_avif/tree/master/webpack_sample)

この方法は簡単で大量の画像を一括処理できますが、出力されるWebP画像の画質を細かく調整することはできません。 必ず実際の画像で、サイズと画質のバランスを確認しながら圧縮率等の設定を行いましょう。 また、**手元にオリジナルの画像がないからといって、圧縮済みのJPEG等からWebPへの再変換を行ってはいけません**。異なる方式で圧縮を繰り返すと、多くのケースで画質だけを大きく損なう結果になります。ロゴやイラストの場合はPNG、写真の場合は高画質のJPEG等、できるだけ元データに近い画像を入手して変換しましょう。

#### C. サーバーでオンデマンドに生成

Bの方法はフロントエンジニアには手軽で確実な方法ですが、あくまでビルド時の変換なので、動的に追加される画像には対応できません。ユーザーがアップロードした画像や、CMSを使って運用時に追加変更される画像もWebPに変換したい場合、サーバーサイドの処理が必要になります。

サーバーサイドの画像変換は[Cloud Functions for Firebase](https://firebase.google.com/docs/functions?hl=ja)や[Lambda@Edge](https://aws.amazon.com/jp/lambda/edge/)を使うことで比較的簡単・安全に実装できます。

以下の例は、Firebaseを使って、Cloud Storageに格納された元画像ファイルをCloud FunctionsでWebPまたはJPEGに変換して返す例です。`openImageWithFormat`の部分を見ると、WebP変換自体はとても簡単に行えることがわかるでしょう。

▼ Firebase（Cloud StorageとCloud Functions）で動的にWebP変換を行う例

```
const firebase = require('./firebase.js');
const sharp = require('sharp');

/**
 * 画像ファイルをCloud Storageから取得してJPEGまたはWebPで返す関数の本体
 */
const convertImage = (req, res) => {
  // リクエストからファイル名とフォーマット（jpegまたはwebp）を取得
  const params = req.path.match(/([-_a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)$/);
  const [fileName, format] = params;
  if (format !== 'jpeg' && format !== 'webp') {
    res.status(404).end();
  }

  // Cloud Storageから元画像のファイルをダウンロード
  const tmpImgFile = await getFileFromStorage(fileName);
  if (!tmpImgFile) {
    res.status(404).end();
  }

  // JPEGまたはWebPで圧縮
  const buffer = await loadImageBuffer(tmpImgFile, format)
  await fs.unlinkSync(tmpImgFile);

  // キャッシュを設定して返す
  // ！注意！： このサンプルはpublicなキャッシュを設定する例です。
  // ユーザーのプライベートなコンテンツやログインユーザー限定の画像にはそのまま適用してはいけません。
  const contentType = `image/${format}`;
  const age = 86400 * 30;
  res.set('Content-Type', contentType);
  res.set('Cache-Control', `public, max-age=${age}, s-maxage=${age}`);
  res.status(200).send(buffer);
}

/**
 * 画像ファイルを開き、指定のフォーマットでエンコード・圧縮します。
 * WebP変換はここで行います。
 * @param {string} imagePath 画像ファイルのパス
 * @param {string} format フォーマット(jpeg | jpg | webp)
 * @return {Promise<Buffer>} 読み込んで変換したJPEGまたはWebPのバッファーデータ
 */
const openImageWithFormat = async (imagePath, format) => {
  const buffer = sharp(imagePath);
  if (format === 'jpeg' || format === 'jpg') {
    buffer.jpeg({
      quality: 80
    });
  }
  if (format === 'webp') {
    buffer.webp({
      quality: 80
    });
  }
  return await buffer.toBuffer();
}

/**
 * Cloud Storageからファイルを取得して、ローカルの一時ファイルに保存します
 * @param {string} imageName 画像のファイル名
 * @return {Promise<string>} 取得した画像を保存した一時ファイルのパス
 */
const getFileFromStorage = async (imageName) => {
  // ...省略： Cloud Storageからbucket.file().downloadでファイルを取得する
}

// 変換関数をCloud Functionsに登録
exports.convertImage = firebase.functions
  .runWith({timeoutSeconds: 20, memory: '512MB'})
  .https
  .onRequest((req, res) => {
    convertImage(req, res)
  });
```

この記事ではFirebaseの機能の詳細は説明しませんが、上記の例で`Cache-Control`ヘッダーをセットしていることに留意してください。画像変換は決して軽い処理ではないので、この変換処理をリクエストのたびに動かすわけにはいきません。この例のようにキャッシュの設定を行って、一度変換した画像はキャッシュから返せるようにする必要があります。

※ Cloud Functions for Firebaseでは`Cache-Control`ヘッダーを設定するだけでCDNによるキャッシュが行えますが、そのほかの環境（とくに自前で構築した）の場合は別途CDNやキャッシュサーバーの追加が必要になる可能性があります。

この方法はサーバーサイドの知識が必要な上、クラウドの利用コストや障害時の対応等、考慮しなくてはいけないことが大きく増えます。その一方で、画像形式の追加や画質の調整等の変更をwebサイトのビルド＆デプロイなしに実施できるメリットもあります。

一般にはwebサイトの規模が大きくなり、動的なコンテンツが増えるほど、サーバーサイドの対応が必要になります。どの時点でこの方法を採用するかは、チームのスキルや運用負荷等も考慮して決めるのが良いでしょう。

### 2\. いつ出し分けるか：WebP画像とその他の形式を切り替えるタイミング

WebPとJPEG/PNGの両方のファイルが用意できても、それらを正しく出し分けることができなくては意味がありません。 出しわけのタイミングと方法は大きく分けて2つです。これも順にみていきましょう。

#### X. フロント（html/js）で切り分け

一番簡単なの切り分けはhtmlの`<picture>`要素を使うことです。

次のように、`<source>`に複数の形式の画像を指定することで、ブラウザに適切な形式（そのブラウザで表示がてきて、もっとも効率が良いと思われるもの）を自動的に選択させることができます。

```
<picture>
  <source srcset="cat.avif" type="image/avif" />
  <source srcset="cat.webp" type="image/webp" />
  <img src="cat.jpg" />
</picture>
```

-   [デモを別画面で表示](https://ics-creative.github.io/201001_webp_avif/picture_sample/index.html#sample2)
-   [サンプルのソースを表示](https://github.com/ics-creative/201001_webp_avif/blob/master/picture_sample/index.html#L121)

一方、CSSの対応は少し困難です。現状CSSでは`<picture>`に相当する画像の自動選択機能がないため、JavaScriptとの組み合わせが必要になります。

この問題には[Modernizr](https://modernizr.com/)を利用するのが簡単です。 Modernizrを`<script>`タグで読み込むだけで`.webp`（WebP対応環境）と`.no-webp`（WebP非対応環境）という2つのCSSセレクターが使えるようになります。

```
<!-- 
  Modernizrを読み込み。予め下記からダウンロード：
  https://modernizr.com/download?webp-setclasses
 -->
<script src="lib/modernizr-custom.js"></script>
<style>
  .modernizr-sample {
    background-size: contain;
    background-repeat: no-repeat;
  }
  /* WebP対応の場合 : html要素に.webpクラスが追加される */
  .webp .modernizr-sample {
    background-image: url(sample.webp);
  }
  /* WebP非対応の場合 : html要素に.no-webpクラスが追加される */
  .no-webp .modernizr-sample {
    background-image: url(sample.jpg);
  }
</style>
```

-   [デモを別画面で表示](https://ics-creative.github.io/201001_webp_avif/picture_sample/index.html#sample3)
-   [サンプルのソースを表示](https://github.com/ics-creative/201001_webp_avif/blob/master/picture_sample/index.html#L136)

WebPが使えるかどうかの判定自体は[DataURI形式のWebP画像を実際に読み込んで判定しているだけ](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp.js#L43)です。必要に応じて同様の処理を直接実装しても構いません。

#### Y. サーバーサイドで切り分け

もうひとつの方法が、クライアント側では画像の形式を考えず、サーバー側で判断する方法です。 この方法を利用すると、単に`background-image: url(/img/sample);`と書くだけで、「WebP対応ブラウザなら`sample.webp`を表示し、非対応なら`sample.jpg`を表示する」といった対応が可能になります。

先ほど紹介した「C. サーバーでオンデマンドに生成」のサンプルを修正し、WebP対応有無の判定も行うようにしたのが次の例です。

▼ Firebaseを使って動的にWebP対応判定とWebP生成を行う例

```
const convertImage = (req, res) => {
  // リクエストからファイル名とフォーマット（jpegまたはwebp）を取得
  const [fileName] = req.path.match(/([-_a-zA-Z0-9]+)$/);
  // ✨ AcceptヘッダーでWebP対応有無を判定
  const acceptHeader = req.get("Accept") || "";
  const isSupportWebp = acceptHeader.includes("image/webp");
  const format = isSupportWebp ? "webp" : "jpeg";

  // Cloud Storageから元画像のファイルをダウンロード
  const tmpImgFile = await getFileFromStorage(fileName);
  if (!tmpImgFile) {
    res.status(404).end();
  }

  // JPEGまたはWebPで圧縮
  const buffer = await loadImageBuffer(tmpImgFile, format)
  await fs.unlinkSync(tmpImgFile);

  // キャッシュを設定して返す
  // ！注意！： このサンプルはpublicなキャッシュを設定する例です。
  // ユーザーのプライベートなコンテンツやログインユーザー限定の画像にはそのまま適用してはいけません。
  const contentType = `image/${format}`;
  const age = 86400 * 30;
  res.set('Content-Type', contentType);
  res.set('Cache-Control', `public, max-age=${age}, s-maxage=${age}`);
  res.set('Vary', 'Accept-Encoding, Accept'); // ✨ Varyヘッダーを追加
  res.status(200).send(buffer);
}
```

WebP対応ブラウザはリクエストの`Accept`ヘッダーで自身がWebPを表示できることを明示しているので、これを読み取ってWebPを返すかJPEGを返すかを切り替えています。

また、レスポンスに`Vary`ヘッダーが追加されている点にも注目してください。 形式をサーバーで判定するということは、同じ`/img/sample`というリクエストに対して、WebPを返すケースとJPEGを返すケースの2通りが存在することになり、単純に「URL = レスポンス」というキャッシュができなくなってしまいます。

`Vary`ヘッダーを追加することで、レスポンスが`Accept`ヘッダーによってかわることを示し、CDN等が適切にキャッシュを返すことができるようになるのです。

この方法は一見すると理想的ですが、デメリットもあります。「C. サーバーでオンデマンドに生成」のデメリットに加え、とくに気をつけるべきなのはキャッシュの問題です。`Accept`ヘッダーは一般にブラウザーやそのバージョンごとに変わるため、「URL = レスポンス」という単純な方法に比べ、キャッシュ効率は下がると考えた方が良いでしょう。

考慮点やデメリットは複数ありますが、画像形式が変わってもクライアント側に一切の修正が必要ないのは大きなメリットです。とくに大規模なサイトでは積極的に採用を考えても良いでしょう。

![複数画像形式の並行サポートのパターン（まとめ）](https://ics.media/entry/201001/images/images/201001_multi_format_pattern.png)

### 次世代画像形式はひとまずWebPで決まり。適切な出しわけでハイパフォーマンスなwebサイトを目指そう

WebPはJPEG/GIF/PNGの良いところをひとつにまとめた理想的な形式である反面、AVIFのように、さらに次世代の画像形式も着々と開発が進んでいます。

WebPのような新しい形式を活用しつつ、今後も安心して稼働するwebサイトを開発するには複数の形式を上手に並行運用する必要があります。

この記事では「画像を作るタイミング3つ」×「画像を出し分けるタイミング2つ」の計6パターンの対応方法を紹介しました。実際のプロジェクトではこれらから適切なパターンを選択・組み合わせて方針を決めると良いでしょう。

綺麗な画像を素早く表示することができれば、それだけでユーザーのweb体験は大きく向上します。 画像を最適化してハイパフォーマンスなweb開発を目指しましょう。