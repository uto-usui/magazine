---
title: "グーグルが開発した画像圧縮ツールSquoosh。フロント開発向けにNode.jsで扱う方法まとめ"
source: "https://ics.media/entry/220204/"
publishedDate: "2022-02-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

『[Squooshスクーシュ](https://squoosh.app/)』というGoogleが開発した画像圧縮ウェブアプリがあります。ブラウザで変換結果を見ながら圧縮設定ができるので、画像圧縮の難しい知識を持たない方でも使いやすいことが特徴です。圧縮だけでなく、WebPなどの各種フォーマットへの変換・リサイズといったこともできる便利ツールです。

このSquooshをNode.jsで扱える『libSquoosh』が存在します。libSquooshは大量の画像を一括で圧縮、WebPへの変換、リサイズなどの処理を**これ1つで完結できる**のがポイントです。昨今のウェブはページの読み込み時間が重視される傾向があります。画像のファイルサイズは読み込み時間に大きく影響するため、画像圧縮は重要なテクニックです。libSquooshをwebpack・Viteといったバンドルツールに組み込むのも効果的です。ビルド時に画像を自動圧縮するワークフローとすることで、性能のよいウェブページの制作へと繋がっていくことでしょう。この記事ではlibSquooshの基本的な使い方から、実際の開発で役立つwebpackやViteでの利用例を紹介します。

2023年3月現在、libSquooshは「Project no longer maintained」となっています（[参照](https://www.npmjs.com/package/@squoosh/lib)）。しかし、ウェブアプリ版の[squoosh.app](https://squoosh.app/)は引き続き開発が続けられるようです。

![Squoosh1つでWebP,JPEG,PNG,AVIFに変換できる](https://ics.media/entry/220204/images/220204_format.png)

### libSquooshができること

libSquooshはこれ1つで画像の圧縮、変換、リサイズ、カラーパレットの減色およびディザリングができます。また、リサイズした上で変換といった組み合わせも可能です。出力は以下のフォーマットに対応しています。

-   JPEG
-   PNG
-   WebP
-   AVIF
-   JPEG XL（ベータ版）
-   WebP v2（不安定）

入力には上記のほか、GIF、BMPが利用可能です。本記事では多くのブラウザで利用できるJPEG、PNG、WebPで解説します。

### libSquooshの基本的な使い方

まずは基本的な圧縮のNode.jsスクリプトを作ってlibSquooshの使い方を説明します。サンプルコードのルートディレクトリで`npm install`した後、`basic`ディレクトリ内で`npm run optimise`コマンドを打つと実際に圧縮処理が行われます。

-   [コードを確認する](https://github.com/ics-creative/220204_libSquoosh/blob/main/basic/optimise.mjs)

※注意：Appleシリコン搭載Mac（M1 Mac）ではNode.js 16.5未満のバージョンでWasmに関する不具合があり、処理できない場合があります。Appleシリコン版MacでlibSquooshを利用する際はNode.js 16.5以上のバージョンをインストールしてください。

圧縮、変換、加工のいずれの場合も以下のようなフローです。

1.  `ImagePool`というインスタンスを作成
2.  `ImagePool`内に処理したい画像を格納
3.  リサイズ・減色などの前処理
4.  指定のフォーマットにエンコード
5.  エンコードしたデータをファイルとして書き込む

はじめに、`ImagePool`インスタンスを作成します。

```
import { ImagePool } from "@squoosh/lib";
import { cpus } from "os";
const imagePool = new ImagePool(cpus().length);
```

OSのCPU数を引数に渡していますが、渡さなくても大丈夫です。注意したいのは複数の画像を処理する場合でも`ImagePool`を複数作成しないでください。メモリエラーになる可能性があります。プールの名がイメージする通り、複数画像でもここに格納できます。

```
/**
 * 画像フォルダのパス。今回はこのフォルダ内の画像を対象とする
 */
const IMAGE_DIR = "./images";

// 画像ディレクトリ内のJPGとPNGを抽出
const imageFileList = readdirSync(IMAGE_DIR).filter((file) => {
  const regex = /\.(jpe?g|png)$/i;
  return regex.test(file);
});

// 抽出したファイルをimagePool内にセットし、ファイル名とimagePoolの配列を作成
const imagePoolList = imageFileList.map((fileName) => {
  const imageFile = readFileSync(`${IMAGE_DIR}/${fileName}`);
  const image = imagePool.ingestImage(imageFile);
  return { name: fileName, image };
});
```

今回は`images`ディレクトリを対象にこの中の画像を圧縮します。`fs`モジュールの`readdirSync()`メソッドでディレクトリ内の画像を取得し、`filter()`メソッドでJPEG、PNG画像のみを抽出しています。たとえ画像のみを保存していても、OSによって作られる`.DS_store`や`Thumbs.db`といったファイルを取り込んでしまうので注意が必要です。

画像のみにした後、`readFileSync()`でそれぞれの画像を読み込んでいます。読み込んだバイナリデータをそのまま`imagePool`の`ingestImage()`メソッドで取り込んでいます。出力の際にファイル名を使うので格納したデータとファイル名を対応させたオブジェクト配列として作成しています。

ちなみに今回の設定では`images`直下の画像しか取得していません。複数階層ある場合は別途設定が必要です。

画像ファイルの取得・格納ができたので、つづいてエンコードの設定をします。

```
// JPEGの圧縮オプション
const jpgEncodeOptions = {
  mozjpeg: { quality: 75 },
};

// PNGの圧縮オプション
const pngEncodeOptions = {
  oxipng: {
    effort: 2,
  },
};

// JPEGならMozJPEGに、PNGならOxipngに圧縮する
await Promise.all(
  imagePoolList.map(async (item) => {
    const { image } = item;
    if (/\.(jpe?g)$/i.test(item.name)) {
      await image.encode(jpgEncodeOptions);
    }
    if (/\.(png)$/i.test(item.name)) {
      await image.encode(pngEncodeOptions);
    }
  })
);
```

画像を指定のフォーマットにエンコードするには先ほど格納したデータに対して`encode()`メソッドを実行することでできます。このメソッドは非同期ですのでawaitで待っていますが、`Promise.all()`を使えばそれらを並列で実行できます。

フォーマットの指定は`encode()`メソッドのオプションとして渡します。ここで指定したフォーマットは画像データを受け取るときにも使うので何を指定したか覚えておいてください。エンコードオプションは次のように複数のフォーマットを渡すこともできます。

```
encode({
  mozjpeg: {
    /*省略*/
  },
  oxipng: {
    /*省略*/
  },
  webp: {
    /*省略*/
  },
  avif: {
    /*省略*/
  },
  jxl: {
    /*省略*/
  },
  wp2: {
    /*省略*/
  },
});
```

この場合指定したすべての形式でエンコードしますが、その分時間がかかります。今回、JPEGはMozJEPGで、PNGはOxipngを用いて圧縮します。MozJEPGはJPEGを低劣化で高圧縮ができるエンコード方式で、OxipngはPNGをロスレス圧縮を行うエンコード方式です。ファイル名の拡張子に応じてこれらのエンコードオプションを使い分けています。

この事例では全般的なクオリティしか指定していませんが、各種フォーマットのオプションは細かい設定が可能です。ウェブアプリ版のオプションを見るのもよいでしょう。

![ウェブアプリ版Squooshと同じオプションが使える](https://ics.media/entry/220204/images/220204_options.png)

エンコードが終わったらそのデータを出力します。

```
/**
 * 出力先フォルダ
 */
const OUTPUT_DIR = "./dist";

// 圧縮したデータを出力する
for (const item of imagePoolList) {
  const {
    name,
    image: { encodedWith },
  } = item;

  // 圧縮したデータを格納する変数
  let data;

  // JPGならMozJPEGで圧縮したデータを取得
  if (encodedWith.mozjpeg) {
    data = await encodedWith.mozjpeg;
  }
  // PNGならOxiPNGで圧縮したデータを取得
  if (encodedWith.oxipng) {
    data = await encodedWith.oxipng;
  }
  // 出力先フォルダがなければ作成
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }
  // ファイルを書き込む
  await writeFile(`${OUTPUT_DIR}/optimized_${name}`, data.binary);
}
```

`imagePoolList`配列の`image`オブジェクト内にエンコード結果が格納されているので、`for...of`文を回して実行します。`Promise.all()`を使っての並列に書き込みも考えられますが、万一の事故防止のため、ファイルの書き込みは直列的に行う`for...of`文を利用しました。

エンコードしたデータは`encodedWith`に先ほどエンコードオプションで指定したフォーマットを記述して取り出せます。今回は`mozjpeg`か`oxipng`のどちらかしか存在していないので`if`文を用いてデータを取り出しています。

バイナリデータは`binary`プロパティにあるので`fs`モジュールの`writeFile()`メソッドを使ってファイルを書き込んでいきます。出力用ディレクトリが存在しなければ作成します。

```
// imagePoolを閉じる
await imagePool.close();
```

書き出しが終われば`imagePool`インスタンスを閉じます。これを行わないとNode.jsの処理が終わらないので忘れずに記述しましょう。これで画像の圧縮処理は完了です。

![MozJPEGで圧縮した結果、圧縮前が71KBだったのに対し圧縮後は19KBになった](https://ics.media/entry/220204/images/220204_compress.png)

#### 画像の変換

画像の変換は上記の処理のエンコード部分で変換したいフォーマットを指定するだけです。サンプルコードでは`npm run convert`コマンドで試せます。

-   [コードを確認する](https://github.com/ics-creative/220204_libSquoosh/blob/main/basic/convert.mjs)

変換の場合は最終的に`webp`拡張子に変更するのでファイル名のみ取得します。`path`モジュールを使ってファイル格納の処理部分を少し変更しています。

▼WebPに変換したい場合

```
// 画像フォルダ内のJPGとPNGを抽出
const imageFileList = readdirSync(IMAGE_DIR).filter((file) => {
  const regex = /\.(jpe?g|png)$/i;
  return regex.test(file);
});

// 抽出したファイルをimagePool内にセットし、ファイル名とimagePoolの配列を作成
const imagePoolList = imageFileList.map((file) => {
  const imageFile = readFileSync(`${IMAGE_DIR}/${file}`);
  // ファイル名のみ取得（拡張子は省く）
  const fileName = path.parse(`${IMAGE_DIR}/${file}`).name;
  const image = imagePool.ingestImage(imageFile);
  return { name: fileName, image };
});

// WebPの圧縮オプション
const webpEncodeOptions = {
  webp: {
    quality: 75,
  },
};

// WebPで圧縮する
await Promise.all(
  imagePoolList.map(async (item) => {
    const { image } = item;
    await image.encode(webpEncodeOptions);
  })
);

// 圧縮したデータを出力する
for (const item of imagePoolList) {
  const {
    name,
    image: { encodedWith },
  } = item;

  // WebPで圧縮したデータを取得
  const data = await encodedWith.webp;
  // 出力先フォルダがなければ作成
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }
  // 拡張子をwebpに変換してファイルを書き込む
  await writeFile(`${OUTPUT_DIR}/${name}.webp`, data.binary);
}
```

変換なので書き込む際に拡張子をwebpに変更しています（入力データはJPEG、PNGのみの想定）。

#### リサイズなどの処理

リサイズ・減色などの前処理はエンコード前に行います。こちらは`npm run resize`コマンドで試せます。

-   [コードを確認する](https://github.com/ics-creative/220204_libSquoosh/blob/main/basic/resize.mjs)

```
// 前処理（リサイズなど）のオプション
const preprocessOptions = {
  // リサイズのオプション。heightまたwidthを指定しない場合は比率を維持
  resize: {
    enabled: true,
    // 横
    width: 400,
    // 縦
    height: 300,
  },
};

// 前処理を実行
await Promise.all(
  imagePoolList.map(async (item) => {
    const { image } = item;
    // リサイズなどを処理するためにデコードする
    await image.decoded;
    return await image.preprocess(preprocessOptions);
  })
);

// JPGならMozJPEGをに、PNGならOxiPNGに圧縮する
/* 以下同様なので省略 */
```

一度格納したデータをデコードしたあと`preprocess()`メソッドでリサイズを行います。`preprocess()`メソッドに渡せるオプションは以下のとおりです。

※バグか仕様か不明ですが、`crop`オプションが反映されませんので下記から省いています。

```
const preprocessOptions = {
  // リサイズのオプション。heightまたwidthを指定しない場合は比率を維持
  resize: {
    enabled: true,
    // 横
    width: 400,
    // 縦
    height: 300,
    // 画像サンプリング手法 lanczos3, mitchell, catrom, triangleの4つがある。デフォルトはlanczos3
    method: "mitchell",
  },
  // 減色処理のオプション
  quant: {
    // 色数。最大256
    numColors: 128,
    // ディザ。0〜1で設定
    dither: 0.9,
  },
};
```

前処理を行ったら、あとは圧縮のときと同じようにエンコードしましょう。前処理は文字通りエンコード前の処理だけなので、エンコードと出力をしてください。

![8色にカラーパレットを減色した比較](https://ics.media/entry/220204/images/220204_reduce.png)

このようなスクリプトを作っておけば、コマンド1つで手軽に画像を圧縮・変換のできるツールになります。

### webpackとの連携

コマンド1つで圧縮できるとはいえ、ビルドのたびに実行するのは少し面倒です。webpackでのバンドルのフローに組み込めばビルド時に自動的に圧縮してくれます。

webpackでlibSquooshを利用するには[image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin)がlibSquooshに対応しているので便利です。

-   [コードを確認する](https://github.com/ics-creative/220204_libSquoosh/blob/main/webpack/webpack.config.js)

▼webpack.config.js

```
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          filename: "[name][ext]",
          options: {
            encodeOptions: {
              /* 各種libSquooshのオプション設定 */
              mozjpeg: {
                quality: 70,
              },
            },
          },
        },
      }),
    ],
  },
};
```

サンプルコードはHTMLを読み込んで`<img>`タグの画像を圧縮するwebpack設定です。webpackの`optimization.minimizer`に`image-minimizer-webpack-plugin`プラグインを設定します。圧縮には`minimizer`に各種[オプション](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/#options)設定します。

また、WebPに変換する場合は`generator`設定を使います。

```
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        generator: [
          {
            preset: "webp",
            implementation: ImageMinimizerPlugin.squooshGenerate,
            options: {
              encodeOptions: {
                /* 各種libSquooshのオプション設定 */
                webp: {
                  quality: 70,
                },
              },
            },
          },
        ],
      }),
    ],
  },
};
```

`preset`の設定が必須になります。これは変換したい画像パスの後ろに`?as=プリセット名`（例：`<img src="hoge.jpg?as=webp" />`）とすることでこのクエリが付いているもののみを対象にできます。なお、`minimizer`に`webp`のエンコードオプションを渡しても変換されないので注意してください。

### Viteとの連携

Viteでのバンドル時にもlibSquooshは利用可能です。しかし、webpackのような便利なプラグインはまだなさそうなので、簡易的なプラグインを自作して導入します。プラグインといっても先ほどの圧縮のスクリプトに近いです。

▼squoosh.js

```
// JPGの圧縮オプション
const jpgEncodeOptions = {
  mozjpeg: { quality: 75 },
};

// PNGの圧縮オプション
const pngEncodeOptions = {
  oxipng: {
    effort: 2,
  },
};

export default function squoosh() {
  return {
    name: "squoosh",
    async generateBundle(_options, bundle) {
      // JPGとPNGを抽出
      const imageFileList = Object.keys(bundle).filter((key) => {
        const regex = /\.(jpe?g|png)$/i;
        return regex.test(key);
      });
      const imagePoolList = imageFileList.map((file) => {
        const imageSource = bundle[file].source;
        const image = imagePool.ingestImage(imageSource);
        return { file, image };
      });

      await Promise.all(
        imagePoolList.map(async (item) => {
          const { image, file } = item;
          if (/\.(jpe?g)$/i.test(file)) {
            await image.encode(jpgEncodeOptions);
          }
          if (/\.(png)$/i.test(file)) {
            await image.encode(pngEncodeOptions);
          }
        })
      );

      for (const item of imagePoolList) {
        const { image, file } = item;
        let data;
        if (/\.(jpe?g)$/i.test(file)) {
          data = await image.encodedWith.mozjpeg;
        }
        if (/\.(png)$/i.test(file)) {
          data = await image.encodedWith.oxipng;
        }
        bundle[file].source = data.binary;
      }

      await imagePool.close();
    },
  };
}
```

▼vite.config.js

```
import { defineConfig } from 'vite'
import squoosh from "./plugins/squoosh.js";

export default defineConfig({
  plugins:[squoosh()]
})
```

細かい説明は割愛しますが、Viteのプラグインはオプションとバンドル素材を引数にとる関数を返します。関数内では圧縮スクリプトと同じようにバンドル素材を受け取り、エンコードしたものをバンドル素材に返しています。

### imageminとの比較

Node.jsで使える画像圧縮ツールに[imagemin](https://github.com/imagemin/imagemin)があります。imageminもプラグインを導入することでMozJPEGを用いた圧縮やWebPなどに変換できます。libSquooshをimageminを比較すると以下のような点があります。

-   libSquooshは追加のライブラリの導入なしに、各種フォーマットでの出力やリサイズ・減色が可能
    
-   見た目で比較できるウェブアプリ版があるので、デザイナーやクライアントと圧縮率についての認識共有がしやすい
    
-   処理速度に関してはimageminの方が早い
    

libSquooshのメリットとしてはこれ1つで済ませられるので、ライブラリ依存を減らせる点と、ウェブアプリ版があるので非エンジニアとの圧縮・変換に関してコミュニケーションがとりやすい点です。デザイナーがオプションをウェブアプリ版で結果をみながら圧縮率やオプションを指定できるので、認識の違いを減らせます。

処理速度で比較するとimageminの方が高速です。上記のようなメリットよりも速度を重視する場合はimageminに軍配が上がるでしょう。

![20枚の写真を圧縮した結果、imageminが4.93秒かかったのに対し、libSquooshは10.16秒かかった](https://ics.media/entry/220204/images/220204_time.png)

### まとめ

libSquooshはオールインワンなところが強みです。導入すればこれ1つで圧縮や変換リサイズができるので便利な画像編集ライブラリとなると思います。その反面、処理速度の点では他の専用のツールに分があります。細かいライブラリの吟味などせず手軽に圧縮したい場合はlibSquoosh、もっとパフォーマンスに注力したい場合は個別に検討、といった使い分けがよいでしょう。