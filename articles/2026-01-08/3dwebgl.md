---
title: "3Dコンテンツの最適化に。圧縮テクスチャーをWebGLで扱う方法と利点"
source: "https://ics.media/entry/17863/"
publishedDate: "2018-05-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "kawakatsu"
---

GPUの最適化手法として「圧縮テクスチャー」という画像を扱うための技術があります。画像ファイルと言えばJPGやPNGなどを思い浮かべる開発者が多いと思いますが、圧縮テクスチャーはGPUに最適化された画像形式です。圧縮テクスチャーは主にコンシューマーゲームやUnityなどで使用されていますが、ウェブコンテンツにおいてもWebGL開発で圧縮テクスチャーが役立ちます。

本記事ではWebGLを使った圧縮テクスチャーの使用方法と、Adobeが開発した圧縮テクスチャーフォーマットであるATF（エーティーエフ）テクスチャーについてそれぞれ解説します。まずはデモをご覧ください。

[![](https://ics.media/entry/17863/images/180502_webgl_compressedtexture_atf_demo.png)](https://ics-creative.github.io/180502_webgl_compressedtexture_atf/dist/)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/180502_webgl_compressedtexture_atf/dist/)
-   [ソースコードを確認する](https://github.com/ics-creative/180502_webgl_compressedtexture_atf)

▲圧縮テクスチャーを表示するデモ。ATFファイルを読み込むことで、OS環境に応じて最適な圧縮テクスチャーを表示している

### 圧縮テクスチャーとは

通常、WebGLにおいてテクスチャー画像にはJPGやPNGが多く使われますが、**実はGPU自体はこれらの画像フォーマットをデコードできません。**そのため、WebGLでは`texImage2D()`命令で画像をGPUに転送する時、内部的にRGB（RGBA）形式にCPUでデコードしてからGPUに転送されます。

たとえば、1024px \* 1024pxのJPGファイルをテクスチャーとして使用する場合、一律で`1024 * 1024 * 3（ピクセルあたりのバイト数） = 3MB`の情報にデコードされ、GPUに転送されます。いかに圧縮率の高いJPGでファイルシステム上のサイズを小さくしても、GPUに展開されると画像サイズに比例した大きな容量となります。

これは、GPUへ転送する際にCPUでのデコード処理と転送コストが高くなることと、**VRAM（GPU上のメモリ）を多く使用すること**を意味します。とくに使用できるVRAMの少ないモバイル環境では、テクスチャーの使用メモリの増大はコンテンツを作る上で枷かせとなります。

#### メリット

そこで対策として出てくるのが圧縮テクスチャーです。圧縮テクスチャーは**GPUがデコードできるフォーマットです。**圧縮されたデータはそのままGPUへ転送され、VRAMに配置されます。そして、シェーダーからのテクスチャーフェッチ（読み込み）時にはじめてデコードされます。

GPUでテクスチャーフェッチ時にデコードされると聞くと遅くなるイメージがあるかもしれませんが、**テクスチャーキャッシュを効率よく利用でき、VRAMへのメモリアクセスが削減できるため、むしろ非圧縮の形式より高速になるようです。**

#### デメリット

圧縮テクスチャーにはいいことばかりではなく、大きな問題がふたつあります。ひとつは**フォーマットが非可逆圧縮であり、画質劣化やノイズ発生の可能性**があります。これについては画像の作成時に工夫することで改善できます。下記の記事に役立つ資料が公開されているので参考ください。

-   [CEDEC2013『工程の手戻りを最小限に 圧縮テクスチャ(PVRTC・DXTC・ETC)における傾向と対策』発表資料 | OPTPiX Labs Blog](http://www.webtech.co.jp/blog/optpix_labs/format/5857/)

もうひとつの問題は、**GPUごとに対応する圧縮フォーマットが異なり、環境によって使えるフォーマット/使えないフォーマットがバラバラなことです。**

下記に代表的な圧縮テクスチャーフォーマットを挙げます。

#### DXT1/DXT5

DXTC（DirectX Texture Compression）ないしS3TC（S3 Texture Compression）は、S3 Graphicsの開発した圧縮テクスチャー形式で、主にWindowsとmacOSで使用できます。DXT1はアルファチャンネルに対応していませんが、DXT5は対応しています。

#### PVRTC

PVRTC（PowerVR Texture Compression）は、Imagination Technologiesの開発した圧縮テクスチャー形式で、主にiOSで使用できます。アルファチャンネルに対応しています。  
※ iPhone 8/8 Plus/Xに搭載されているA11 Bionicチップには、Imagination Technologies社製でなく、Apple自社製のGPU（iOS GPU family 4）が採用されていますが、PVRTCはサポートされています。

-   [Metal Feature Set Tables](https://developer.apple.com/metal/Metal-Feature-Set-Tables.pdf)

#### ETC1

ETC（Ericsson Texture Compression）は、Ericsson Researchの開発した圧縮テクスチャー形式で、主にAndroidで使用できます。アルファチャンネルには対応していません。

#### ETC2

ETC2は、ETC1を拡張した圧縮テクスチャー形式で、主にOpenGL ES 3.0以上のiOSとAndroidで使用できます。アルファチャンネルに対応しています。OpenGL ES 3.0では必須の圧縮テクスチャー形式ですが、多くのデスクトップ向けGPUでハードウェアサポートされていないことから、派生規格であるWebGL 2.0では拡張機能になりました。

-   [WebGL 2.0 Specification](https://www.khronos.org/registry/webgl/specs/latest/2.0/#5.37)

他にも圧縮テクスチャー形式はありますが、今回関係するのはこの4つです。WebGL 2.0の機能であるETC2を除くと、WebGLでの対応はおおまかに以下のように考えて良いでしょう。

プラットフォーム

圧縮テクスチャー形式

Windows/macOS

DXT1/DXT5

iOS

PVRTC

Android

ETC1

### WebGLでの利用方法

#### 拡張機能の取得

WebGLでは圧縮テクスチャーの扱いは拡張機能として提供されているため、使用するには`WebGLRenderingContext.getExtension()`で拡張機能を有効にします。たとえばPVRTCの圧縮テクスチャーは`WEBGL_compressed_texture_pvrtc`拡張ですが、ブラウザによってはベンダープレフィックスをつける必要があります。例として、2018年5月時点のiOS Safariでは`WEBKIT_WEBGL_compressed_texture_pvrtc`でないと取得できません。

```
// PVRTC圧縮テクスチャーの拡張機能を取得（有効化）する
const extPVRTC =
  context.getExtension("WEBGL_compressed_texture_pvrtc") ||
  context.getExtension(
    "WEBKIT_WEBGL_compressed_texture_pvrtc"
  );
```

拡張機能がサポートされている環境では`getExtension()`で拡張機能オブジェクトが返り、それ以降は機能が有効になります。サポートされていない場合は`null`が返ります。

拡張機能がサポートされている場合でも、デバイスが本当に対象の圧縮テクスチャーフォーマットをサポートしているかを確認する必要があります。**拡張機能を有効にした後に**`WebGLRenderingContext.getParameter(WebGLRenderingContext.COMPRESSED_TEXTURE_FORMATS)`を呼んで、サポートしている圧縮テクスチャーフォーマットのリストを取得します。リスト内にその時点で有効な圧縮テクスチャーフォーマットの種類の値が入っているので、使用するフォーマットが該当するか確認します。

たとえば、アルファチャンネルなしPVRTCの場合使用するフォーマットは`COMPRESSED_RGB_PVRTC_4BPPV1_IMG`ですので、前述の拡張機能オブジェクトから値を取得してリスト内にあるかチェックします。

```
// サポートされている圧縮テクスチャー形式のリストを取得する
const supportedCompressedTextureFormat = context.getParameter(
  context.COMPRESSED_TEXTURE_FORMATS
);

// PVRTC形式がサポートされているかを確認する
const supportsPVRTC = supportedCompressedTextureFormat.includes(
  extPVRTC.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
);
```

下記は圧縮テクスチャーのフォーマットと拡張機能およびWebGLのフォーマット（internalformat）の対応です。

圧縮テクスチャーのフォーマット

拡張機能

WebGLのフォーマット（internalformat）

DXT1

WEBGL\_compressed\_texture\_s3tc

COMPRESSED\_RGB\_S3TC\_DXT1\_EXT

DXT5

WEBGL\_compressed\_texture\_s3tc

COMPRESSED\_RGBA\_S3TC\_DXT5\_EXT

PVRTC（アルファチャンネルなし）

WEBGL\_compressed\_texture\_pvrtc

COMPRESSED\_RGB\_PVRTC\_4BPPV1\_IMG

PVRTC（アルファチャンネルあり）

WEBGL\_compressed\_texture\_pvrtc

COMPRESSED\_RGBA\_PVRTC\_4BPPV1\_IMG

ETC1

WEBGL\_compressed\_texture\_etc1

COMPRESSED\_RGB\_ETC1\_WEBGL

#### テクスチャーの作成

テクスチャーオブジェクトの観点で見ると、WebGLでは圧縮テクスチャーの扱いは非圧縮テクスチャーとほぼ同じです。唯一違う点はGPUにテクスチャーを転送するときに非圧縮テクスチャーでは`WebGLRenderingContext.texImage2D()`を使っていましたが、圧縮テクスチャーでは`WebGLRenderingContext.compressedTexImage2D()`を使うことです。

```
// テクスチャーオブジェクトを作成する
const compressedTexture = context.createTexture();

// 作成したテクスチャーオブジェクトをバインドし、操作対象にする
context.bindTexture(context.TEXTURE_2D, compressedTexture);

// 圧縮テクスチャーをGPUへ転送する
context.compressedTexImage2D(
  context.TEXTURE_2D,
  0,
  extPVRTC.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
  512,
  512,
  0,
  pvrtcImageRawData
);
```

`WebGLRenderingContext.compressedTexImage2D()`の引数は、それぞれ下記の通りです。

1.  target: テクスチャーの種類。通常のテクスチャーの場合はTEXTURE\_2Dを指定
2.  level: ミップマップレベル。ベースのテクスチャーの場合は0を指定
3.  internalformat: 圧縮テクスチャーのフォーマット。前述の通り拡張機能オブジェクトから取得した値
4.  width: テクスチャーの幅
5.  height: テクスチャーの高さ
6.  border: 0固定
7.  pixels: 圧縮テクスチャーのRAW data

いくつか注意があります。まず、**自動でミップマップを作ってくれる機能`WebGLRenderingContext.generateMipmap()`は圧縮テクスチャーには使えません。**ミップマップを使いたい場合は自前でミップマップ画像を用意し、その数だけ`compressedTexImage2D`を第二引数の`level`を指定して転送します。ミップマップを転送しない場合、当たり前ですが`WebGLRenderingContext.texParameteri()`の`TEXTURE_MIN_FILTER`に`LINEAR_MIPMAP_LINEAR`などのミップマップ系フィルターは使えません。

次に、第七引数`pixels`に指定するのはあくまで圧縮テクスチャーのRAW dataということです。**ファイルのヘッダーなど余計な情報がついていると転送できません。**たとえば、DXTCの圧縮テクスチャーは一般的にDDSというファイル形式で扱われますが、このDDSにはRAW dataの他にフォーマットやファイルサイズなどのデータが含まれています。WebGLで自前でDDSファイルをテクスチャーとして扱うためには、ヘッダー部を読み捨ててRAW dataのみ取り出す必要があります。

-   [DDS ファイル リファレンス](https://msdn.microsoft.com/ja-jp/library/cc372287.aspx)

これで圧縮テクスチャーを使えるようになりました。一度データを転送さえしてしまえば、描画命令時のバインド処理やシェーダー内での扱いは非圧縮テクスチャーとまったく同じです。

#### アルファチャンネルの対応

DXTCとPVRTCはそれぞれアルファチャンネルに対応していますが、ETC1にはアルファチャンネルはありません。ETC1でアルファつきテクスチャーを使いたい場合は、RGB用のETC1圧縮テクスチャーとアルファチャンネル用のETC1圧縮テクスチャーの2枚を作成して、シェーダー内でRGBとAlphaとして使用します。

```
precision mediump float;

uniform sampler2D texture;
uniform sampler2D alphaTexture;
varying vec2 vUV;

void main(void)
{
  // RGB要素をtextureから読み込む
  vec4 rgb = texture2D(texture, vUV);

  // Alpha要素をalphaTextureから読み込む
  vec4 alpha = texture2D(alphaTexture, vUV);

  // RGB要素とAlpha要素を統合して出力する
  gl_FragColor = vec4(rgb.rgb, alpha.r);
}
```

### ATFの特徴

ATF（Adobe Texture Format）はAdobeが作成した圧縮テクスチャーのフォーマットです。もともとはStage3Dという、Adobe Flash Player上からGPUを使用して描画できる機能のために作成されたフォーマットですが、ファイルの中身は通常の圧縮テクスチャーが格納されているためFlashでなくとも利用できます。

前述の通りプラットフォームごとに対応する形式が異なるため、マルチプラットフォームで取り回しにくい圧縮テクスチャーですが、Adobeはなんと**これらを1つのファイルにまとめました。**ATFを使えば複数の圧縮テクスチャーを1つのファイルで扱えるため、**プラットフォームを意識することなく開発できる**メリットがあります。もともと、Adobe Flash PlayerやAdobe AIRはプラットフォームの差を吸収し、開発者に意識させないつくりのため、圧縮テクスチャーに関してもその考えを踏襲しています。

DXT1/DXT5、PVRTC、ETC1、ETC2のすべてのテクスチャーを1つのATFファイルに含められますが、**「モバイルのみの対応でいいためDXT1/DXT5は省きたい」といったケースにも柔軟に対応できます。**詳しくは下記の資料を参照ください。

-   [ATF SDKを使った圧縮テクスチャの使い方入門 | ADC - Adobe Developer Connection](https://www.adobe.com/jp/devnet/socialgaming/articles/introducing-compressed-textures.html)

※該当記事は古いバージョンのATFの説明のため、ETC2についての記載がありません。最新の情報については英語記事 [「Introducing compressed textures with the ATF SDK | Adobe Developer Connection」](https://www.adobe.com/devnet/archive/flashruntimes/articles/introducing-compressed-textures.html) を参照ください。

#### ATFファイルの作成方法

ATFファイルを作成するにはATFツールを使用します。ATFツールは最新の[Adobe AIR SDK](https://www.adobe.com/devnet/air/air-sdk-download.html)に含まれています。ダウンロードしたAIR SDK直下の`atftools`フォルダーにいくつかのツールが提供されていますが、主に使用するのは以下の2つです。

①png2atf  
png2atfは、PNG画像からATF圧縮テクスチャーを作成するコマンドラインツールです。**変換するPNG画像を用意するだけで簡単にATFファイルを作成できます。**基本的な使い方は`-c`オプションをつけて実行します。入力するPNG画像のサイズは、各辺がPOT（Power of two、2のべき乗）となっている必要があるので注意してください。

```
png2atf -c -i inputFileName.png -o outputFileName.atf
```

iOS向けにPVRTC形式のみ含めたい場合は`-c`オプションの引数に`p`を指定します。

```
png2atf -c p -i inputFileName.png -o outputFileName.atf
```

`-c`オプションの引数は、`,（カンマ）`で区切ることでATFファイルに含める形式を任意の組み合わせで指定できます。たとえば、モバイル（iOS、Android）向けにPVRTC形式とETC1のみ含めたい場合は`-c`オプションに`p,e`を指定します。

```
png2atf -c p,e -i inputFileName.png -o outputFileName.atf
```

②ATFViewer  
ATFViewerは、ATFファイルを読み込んで中に含められた各形式のテクスチャー画像やミップマップを表示するGUIツールです。圧縮テクスチャーの画質の確認に使います。`atftools\docs\Readme.txt`にある通り、起動するには別途QT SDKのインストールが必要です。

ATFツールの詳しい使い方は下記の資料を参照ください。

-   [Adobe Texture Format（ATF）ツールの使い方 | ADC - Adobe Developer Connection](https://www.adobe.com/jp/devnet/socialgaming/articles/atf-users-guide.html)

※該当記事は古いバージョンのATFの説明のため、ETC2についての記載がありません。最新の情報については英語記事 [「ATF SDK user’s guide | Adobe Developer Connection」](https://www.adobe.com/devnet/archive/flashruntimes/articles/atf-users-guide.html) を参照ください。

#### WebGLでの使用

WebGLでATFファイルを使用する場合、まずはファイルをUint8Arrayのバイト列として読み込みます。

```
fetch(filePath)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    const data = new Uint8Array(arrayBuffer);
    // 以下パース処理
  });
```

次に読み込んだデータをパースします。ATFファイルのバイナリフォーマットは下記を参照します。

-   [ATF File Format | Adobe Developer Connection](https://www.adobe.com/devnet/archive/flashruntimes/articles/atf-file-format.html)

ATFファイルは、おおまかにテクスチャーの情報が格納された**ヘッダー部**と実際のテクスチャーデータが格納された**データ部**に別れます。  
①ヘッダー部

Field

Type

Comment

Signature

U8\[3\]

'ATF’固定

Reserved

U32

1バイト目：0x00固定  
2バイト目：0x00固定  
3バイト目：下位1bitは`-e`オプションの使用有無、  
残り7bitは`-n`オプションで  
ミップマップを指定した場合のミップマップ数  
4バイト目：0xFF固定

Version

U8

ATFファイルフォーマットのバージョン  
※ 2018年5月現在のバージョンは3

Length

U32

Field～Lengthまでを除いたこのATFファイルのバイト数

Cubemap

UB\[1\]

cubeテクスチャーであるかの指定

Format

UB\[7\]

データ部のフォーマット

Log2Width

U8

テクスチャーの高さのlog2（最大12）  
ATFテクスチャーの各辺はPOTである必要があるため、  
実質幅の定義に等しい

Log2Height

U8

テクスチャーの幅のlog2（最大12）

Count

U8

テクスチャー1枚毎のミップマップ数（最大13）

②データ部  
データ部は、複数の形式のテクスチャーが\[バイト数,データ\]の順に格納されたブロックがミップマップ数（ヘッダー部のCount）分繰り返されます。さらにcubeテクスチャーの場合、上記が\[Left, Right, Bottom, Top, Back, Front\]の順に6面分繰り返されます。

ブロックの定義はヘッダー部のFormatによって異なり、たとえばFormat=3（RAW Compressed）の場合は下記の仕様となります。

Field

Type

Comment

DXT1ImageDataLength

U32

DXT1データのバイト数

DXT1ImageData

U8\[DXT1ImageDataLength\]

DXT1データ

PVRTCImageDataLength

U32

PVRTCデータのバイト数

PVRTCImageData

U8\[PVRTCImageDataLength\]

PVRTCデータ

ETC1ImageDataLength

U32

ETC1データのバイト数

ETC1ImageData

U8\[ETC1ImageDataLength\]

ETC1データ

ETC2RgbImageDataLength

U32

ETC2データのバイト数

ETC2RgbImageData

U8\[ETC2RgbImageDataLength\]

ETC2データ

※ETC2データに関しては今回使用していません。

バイナリフォーマットにしたがって順にデータを読んでいき、実際のテクスチャーデータ（RAW data）をUint8Arrayの配列として取得します。配列の切り出しには`Uint8Array.subarray()`を使えばムダなメモリのコピーがされません。

```
// PVRTCImageData U8[PVRTCImageDataLength]
// RAW PVRTC data

// startByteからpvrtcImageDataLength分の長さのデータをUint8Arrayとして切り出す
const pvrtcImageRawData = data.subarray(
  startByte,
  startByte + pvrtcImageDataLength
);
```

ATFファイルから取得したRAW dataは、前述の`WebGLRenderingContext.compressedTexImage2D()`の第七引数としてそのまま使用できます。

### 最後に

WebGLにおいて圧縮テクスチャーの使用はメモリ容量、速度の両面で有効な手段です。画像によっては画質の劣化に気をつける必要がありますが、**使いこなせればとくにリソースの少ないモバイル対応で力を発揮**します。プラットフォームごとに異なる形式のテクスチャーを用意して使用する手間も、ATFを使えば解決するのでぜひ試してみてください。