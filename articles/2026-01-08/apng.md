---
title: "ウェブ用アニメーションを劣化なく保存できる画像形式APNGの作り方"
source: "https://ics.media/entry/3718/"
publishedDate: "2014-12-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

APNGエーピング(Animated Portable Network Graphics)形式とは、**高画質なアニメーション用の画像形式**です。類似の画像形式としてGIFアニメーション形式が存在しますが、APNGは高画質化が可能であり透過情報の扱いに長けています。詳しい利点は記事「[これからはGIFアニメからAPNGの時代に](https://ics.media/entry/2441/)」で紹介しています。

本記事ではAPNGファイルの作り方を解説します。APNGファイルの作り方はいろいろありますが、「できるだけデータ容量を軽く」というテーマでまとめてました。

※LINEアニメーションスタンプの作り方については、記事「[LINEのアニメーションスタンプはこう作る！ APNGファイルの作り方を徹底解説](https://ics.media/entry/12268/)」で解説してます。

### APNGの作り方の手順

本記事では次の手順で解説します。

1.  Adobe Animateでアニメーションを作成
2.  アニメーションの連番画像を書き出し
3.  連番画像をAPNG AssemblerでAPNGに書き出し

### 1\. アニメーションを作成

アニメーションを作成するソフトウェアも数多くありますが、今回はアニメーションの細部まで調整できて表現力も高くアニメーションの連番画像を書き出し可能な[Adobe Animate](https://www.adobe.com/jp/products/animate.html)(旧Adobe Flash Professional CC)を使用します。Animateの使い方は記事「[Adobe Animate の使い方](https://ics.media/tutorial-createjs/adobe_animate_basic/)」で紹介してますので、あわせてご覧ください。

![Adobe Animate](https://ics.media/entry/3718/images/create_apng_flash.jpg)

本記事ではAnimateにもともと入っているテンプレートのアニメーションを利用します。メニューより\[ファイル\]→\[新規\]→\[テンプレート\]タブ→\[HTML5 Canvas\]カテゴリー→\[サンプルアニメーション\]を選択ください。

![](https://ics.media/entry/3718/images/adobe-animate-cc-sample-animation.png)

### 2\. アニメーションの連番画像をPNG書き出し

Adobe Animateでアニメーションを作成したら、メニューより\[ファイル\]→\[書き出し\]→\[ムービーの書き出し\]を選択します。

![ファイル　＞　書き出し　＞　ムービーの書き出しを選択します](https://ics.media/entry/3718/images/create_png_flash_step1.jpg)

次に、書き出したい画像の名前を入力します。**ここでは`frame.png`としていますが、生成時に`frame0001.png`と自動でフレーム番号を割り振られます。**合わせてファイル形式の\[PNG シーケンス（\*.png）\]を選択し保存ボタンをクリックします。

![ファイル名とファイル形式を選択します](https://ics.media/entry/3718/images/create_png_flash_step2.jpg)

PNG書き出しのオプションウィンドウでは次の通り設定します。

-   \[範囲\]を「イメージサイズ」に選択  
    ※アニメーションに影響のない余白が自動的にトリミングされます
-   \[カラー\]は「32bit」を選択  
    ※透過（アルファチャンネル）を表現したいため

各項目を選択しましたら書き出しボタンをクリックします。

![PNG書き出しの各項目設定](https://ics.media/entry/3718/images/create_png_flash_step3.jpg)

すると、次のように連番画像が書き出されます。これで、APNGの作成に必要な下準備が整いました。

![アニメーションの連番画像が書き出されました](https://ics.media/entry/3718/images/create_png_flash_step4.jpg)

ここまでは、PNG連番画像の作成方法を解説しました。ここからはPNG連番画像からAPNGファイルフォーマットへ変換する手順を「APNG Assembler」というソフトウェアを使って紹介します。

ちなみに、2016年6月に公開された「[アニメ画像に変換する君](https://ics.media/entry/12746/)」というデスクトップアプリケーション（WindowsとmacOSに対応）を利用する方法もあります。手軽にAPNGファイルを作成したい場合は「アニメ画像に変換する君」をご利用ください。APNG Assemblerのほうはかなり細かく設定できるので、「手間がかかっても精密にAPNGを作りたい」という方にはAPNG Assemblerのほうが向いてます。

### 3\. 連番画像をAPNG AssemblerでAPNG書き出し

APNG書き出しにはツール「[APNG Assembler](https://apngasm.sourceforge.net/)」を使用します。WindowsとmacOSでの両方の使い方を説明します。

### Windowsでの書き出し方法

#### 1\. APNG Assembler(GUI)のダウンロード

記事更新時点（2022年2月）での最新バージョンは2.91なので、[APNG Assembler](https://sourceforge.net/projects/apngasm/files/)から「apngasm\_gui-2.91-bin-win32.zip」ファイルをダウンロードします。ダウンロードしたZIPファイルは任意の場所で展開ください。

#### 2\. 連番画像の読み込み

解凍したフォルダー内に入っている「apngasm\_gui.exe」ファイルを起動し、先ほど書き出した連番画像をドラッグ&ドロップします。

![選択した画像をドラッグ&ドロップで読み込むことができます](https://ics.media/entry/3718/images/create_apng_apngasm1.jpg)

#### 3\. ループの設定

\[Playback Settings\]ボタンをクリックしてアニメーションのループ回数を設定します。標準では無限にループする設定になっていますが、再生される回数に制限を設けたい場合、\[Play indefinitely\]のチェックを外し右の入力欄にループ回数を入力します。

![](https://ics.media/entry/3718/images/160603_line_stamp_09.jpg)

#### 4\. フレームレートの設定

\[Delays - All Frames\]ボタンをクリックしフレームレートを設定します。Adobe Animateで作成したアニメーションのフレームレートが「24」でしたので\[1 / 24 seconds\]と入力します。

![フレームレートの設定](https://ics.media/entry/3718/images/create_apng_apngasm2.jpg)

#### 5\. 圧縮形式の設定

詳しくは後ほどご紹介しますが、zlib・7zip・Zopfliの3つの中から選択できます。今回は標準で選択されている7zip方式で書き出します。

![zlib ・ 7zip ・ Zopfliの 3つの圧縮形式から選択できる](https://ics.media/entry/3718/images/create_apng_apngasm3.jpg)

#### 6\. 出力ファイル名・出力先を入力し書き出し

\[Output file\]欄にファイルの出力先を入力し\[Make Animated PNG\]ボタンをクリックします。すると拡張子が`.png`のファイルが作成されます。APNG形式は通常のPNG形式と同じ拡張子になります。これでAPNGの完成です！　保存したAPNGファイルはブラウザーの[Firefox](https://www.mozilla.org/ja/firefox/new/)を使って再生できるか確認するといいでしょう。

![出力先を指定して書き出し！](https://ics.media/entry/3718/images/create_apng_apngasm4.jpg)

### Macでの書き出し方法

macOS向けには「APNGb-v2.0.1.app」が提供されていますが、本記事では「APNG Assembler（バイナリ）」での利用方法を説明します。

#### 1\. APNG Assembler（バイナリ）のダウンロード

[APNG Assembler](https://sourceforge.net/projects/apngasm/files/2.91/)から「apngasm-2.91-bin-macos.zip」ファイルをダウンロードします。ダウンロードしたZIPファイルを展開すると「apngasm」というバイナリファイルが入っています。このファイルを連番画像と同じ場所にコピーします。

##### ![今回は連番画像と同じ場所にコピーしました](https://ics.media/entry/3718/images/create_apng_apngasm5.jpg)

#### 2\. ターミナル.appを起動する

macOSには「ターミナル.app」というソフトウェアがもともとインストールされています。APNGの作成にはこのソフトウェアを使うので、起動しましょう。\[アプリケーション\]フォルダー→\[ユーティリティ\]フォルダーに移動し、\[ターミナル\]を起動します。

![macOSでのターミナルの起動方法](https://ics.media/entry/3718/images/apng_terminal_launch.png)

#### 3\. ターミナルでPNGフォルダーまで移動する

ターミナルを起動したら、PNGファイルが格納されたフォルダー(`apngasm`ファイルがあるフォルダー)をターミナルで開く必要があります。次の手順で移動します。

1.  `cd` と入力します (チェンジ・ディレクトリーの略で、フォルダーの階層を移動するコマンドです。`cd`の後ろに半角スペースを入力ください）
2.  pngが格納されたフォルダーをドラッグ＆ドロップします
3.  \[Enter\]キーを押します
4.  これでターミナルでフォルダーを移動できました

![](https://ics.media/entry/3718/images/apng_terminal_cd.png)

#### 4\. apngasmを実行

コマンドの基本的な指定方法は下記のようになっています。

```
./apngasm 出力ファイル名 連番画像 [オプション]
```

今回は出力ファイル名を`animate.png`、連番画像をファイル名の頭に`frame`と付いているPNGという意味の`frame*.png`、フレームレートを`24`で実行します。ループ回数を設定したい場合は、`-l4`（4回ループ）をオプションに追加します。

```
./apngasm animate.png frame*.png 1 24
```

![APNGのターミナルのコマンド](https://ics.media/entry/3718/images/apng_terminal_command.png)

これでAPNGの完成です！　拡張子が`.png`のファイルが作成されます。APNG形式は通常のPNG形式と同じ拡張子になります。保存したAPNGファイルはブラウザーの[Firefox](https://www.mozilla.org/ja/firefox/new/)を使って再生できるか確認するといいでしょう。

![](https://ics.media/entry/3718/images/apng_terminal_complete.png)

フレームレートはオプションで設定する必要があり、`1 / 24`秒を\[1 24\]として設定しました。他にも圧縮形式などのさまざまなオプションが用意されておりますので、[APNG Assembler](https://sourceforge.net/projects/apngasm/files/2.91/)の「Options」段落をご覧ください。

### 圧縮形式でこんな差が

さきほども触れましたが、[APNG Assembler](https://apngasm.sourceforge.net/)ではzlib・7zip・Zopfliの3つの圧縮形式を選択できます。こちらの各圧縮形式とアニメーションGIFを、連番画像の総データ容量を基準として比較しました。

![APNGの各圧縮形式とアニメーションGIFのデータ容量比較](https://ics.media/entry/3718/images/create_apng_size.jpg)

データ容量で比較すると、アニメーションGIFの`431KB`が圧倒的でZopfliの`681KB`が続きます。データ容量のみで比較するとアニメーションGIFが優勢ですが、アニメーションGIFは上限色数が256色でアルファチャンネル非対応。比べて**Zopfliで圧縮したAPNGはフルカラーでアルファチャンネルも対応しており、連番画像に比べて42%圧縮できるのは魅力的ではないでしょうか。**

### GIFとAPNGの画質を比較しよう

以下にアニメーションGIFとAPNGの品質を見比べられるデモを用意しました。

※APNGをサポートしていない環境でも擬似的に表示できるJSライブラリ「[apng-canvas.js](https://github.com/davidmz/apng-canvas)」を使用しています。

![](https://ics.media/entry/3718/images/create_apng_demo.jpg)

次の画像は実際に書き出した画像です。

※APNGを再生可能なブラウザFirefox、Safari 8+、Chrome 59+での閲覧を推奨します。

▼ アニメーションGIF

![アニメーションGIF](https://ics.media/entry/3718/images/animate.gif)

▼ zlibで書き出したAPNG

![](https://ics.media/entry/3718/images/animate_zlib.png)

▼ 7zipで書き出したAPNG

![](https://ics.media/entry/3718/images/animate_7zip.png)

▼ Zopfliで書き出したAPNG

![](https://ics.media/entry/3718/images/animate_zopfli.png)

以上の画像の画質を見比べると、**zlib・7zip・Zopfliそれぞれで大きな見た目の差はありません**。ではなぜ3つの圧縮形式が用意されているのでしょうか。見た目の大きな差がないなら圧縮率がもっとも高いZopfliのみで問題ないはずです。

それぞれの圧縮形式で大きく違うのは、書き出しにかかる時間です。zlibを選択した場合は数秒で終わる書き出しが、7zipでは数十秒、Zopfliでは場合によって数分かかってしまいました。実案件にAPNGを用いる場合、開発中はzlibで書き出したAPNGで進めデザイン修正にもそれほど時間をかけず対応。そしてリリース前にZopfliで書き出すという流れが良さそうです。

### 最後に

今回はAdobe AnimateとAPNG Assemblerの複数のソフトウェアでの使い方を解説しました。現在はアニメーション制作からファイル作成までひとつのソフトウェアで実現できないので、手間が多いです。[以前の記事](https://ics.media/entry/2441/)でも触れましたが、APNGファイルを再生できるウェブブラウザーが増えているので、今後の動向に注目です。