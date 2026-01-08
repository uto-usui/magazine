---
title: "広がる拡張性と利便性、Animate CCの「メタデータAPI」の紹介"
source: "https://ics.media/entry/693/"
publishedDate: "2013-08-02"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

Adobe Animate CC（旧Flash Professional CC）の「メタデータAPI」機能について紹介します。メタデータAPIとはAnimate CCの新しいコンポーネントの仕組みのようなものです。従来のFlashコンポーネントを自作しようと思うと、手順が煩雑で作るのも使うのも面倒な部分がありましたが、メタデータAPIを使えばもっとスマートにコンポーネントのように`MovieClip`や`TextField`インスタンスを扱うことができます。

### メタデータAPIとは

![メタデータイメージ](https://ics.media/entry/693/images/c1aca8b33c0a5615f0e0d4ec27f41afc.png)

-   Animate CC上からJSFLのAPI経由させることで、Animate CC上で作成したインスタンスに自分で指定した独自データを埋め込み可能
-   ステージに置かれたインスタンスのみデータは埋め込みが可能
-   埋め込めるデータのタイプは `string`、`integer`、`double`の3種類

▼書き出しパターン

![](https://ics.media/entry/693/images/MetaDataImage.png)

-   **SWFへのデータ埋め込みはFlash Player 11.6以上が対象**
-   メタデータはSWFに直接埋め込まずにXMLやJSONとして書き出すことで、Flashを使用しないプロジェクトでも使用可能。  
    ※たとえばHTML5やUnityなど
-   現状メタデータをswcファイルに埋め込むことはできない

### メタデータAPIの使用例

#### レイアウトの設定関連のパラメーターを設定する

今回のツールづくりに参考にした[Adobeチームのブログ記事](http://blogs.adobe.com/flashpro/2013/07/15/flashpro-cc-publish-persistent-metadata/)もレイアウトを行うツールですが、これはとても便利そうです。この他にも動的に読み込んだ画像を格子状に並べるなど、幅や隙間の数値を設定するためのSWFPanelを作成することによって、プログラム上でマジックナンバーを作らなくても済むようになりそうです。

#### インスタンスに補足情報をつける

`.fla`ファイルを共有しながら複数人で開発する場合に`MovieCip`などのインスタンスの用途や説明文をメタデータに残しておくことで、開発を円滑にするといった使い道もできそうです。こういったテキストはSWFに直接埋め込む必要がないので、埋め込みフラグをオフにすることも可能です。

### ツールの紹介

今のところメタデータを埋め込むには、JSFLを使用して独自のツール（コマンドかSWFPanelなど）を作成する必要があります。そこで今回はお試しとしてデータをお手軽に設定と確認できるという最低限の機能があるツールを作成してみました。

-   [ツールとサンプルをダウンロードする (必要環境：Flash Pro CC)](https://ics-creative.github.io/data-demos/130731_embedmetadata/MetaDataSample.zip)

#### サンプルの使い方

1.  `EmbedMetaData.zxp`ファイルを**Adobe Extension Manager CC**（Adobe Application Managerからインストールしてください）からインストールします
2.  `Sample.fla`を開いて、［ウィンドウ］→［エクステンション］→［EmbedMetaData］にチェックを入れてEmbedMetaDataパネルを開きます。パネルを開いた状態のままで数字付きの四角いインスタンスをクリックすると、パネル上のテキストが変更されるかと思います。**それが、現在設定してあるメタデータとなります。**そして、**インスタンスを選択した状態でテキストを変更するとメタデータも修正**されます。
3.  EmbedMetaDataパネルのSettingsのEmbedSWFのチェックを入れておいて`Sample.fla`ファイルをプレビューすると、現在設定してあるメタデータの情報が四角いインスタンスの下にあるテキストフィールドに表示されます。 また、EmbedSWFのチェックををオフにした状態でプレビューを行うと、メタデータがないものとして表示されます。
4.  `EmbedMetaData.zxp`インストール先の`Configuration/WindowSWF/EmbedMetaData/metadata_variables.txt`ファイルを編集すると、**データ名を手軽に追加変更できるのでお試しください。** ※ConfigrationディレクトリはOSごとに異なります

▼Windows 7、8

```
¥Users¥{ユーザー名}¥AppData¥LocalAdobe¥{Animate CCの名称}¥language¥Configuration¥
```

▼macOS

```
/Users/{ユーザー名}/Library/Application Support/Adobe/{Animate CCの名称}/ja_JP/Configuration
```

### サンプルの実装処理についての説明

▼JSFL側のスクリプト処理

```
//※setPublishDocumentDataの'_EMBED_SWF_'をtrueにするとSWFにデータが埋め込まれます。
fl.getDocumentDOM().setPublishDocumentData(
  "_EMBED_SWF_",
  true
);
```

```
// setPublishPersistentDataの2つの変数を_EMBED_SWF_と指定し、3番目をtrueにすることによって、データ名別にSWFに埋め込むかそうでないかが設定出来ます。
// 例えばFlash Pro上で確認したいだけであったり、JSONとして書きだすときなど、SWFに埋め込まなくても良い時などはfalseにします。
elem.setPublishPersistentData("id", "_EMBED_SWF_", true);

//実際にデータを設定します。
//※2番目の引数のデータタイプを数値('integer'もしくは'double')にしたい場合は3番目の引数に(ダブル)クォーテーションを付けないようにします。
elem.setPersistentData("データ名", "string", "value");
```

#### AS3の処理

AS3からメタデータにアクセスする方法は簡単です。ムービークリップ等のインスタンスには`.metaData`プロパティが存在するので、そこからメタデータにアクセスします。

```
//メタデータが埋め込まれているかチェックしてからアクセスする
if( instance.metaData != null ) {
    trace( instance.metaData.データ名 );
}
```

### まとめ

いままでFlashで定義されていないデータをAnimate CC上で編集するには、ActionScriptのコードをタイムラインに記述したり、Flashコンポーネントを作成する必要がありました。メタデータAPIを使用することでAnimate CC上でデータを容易に埋め込みができるようになり、オーサリングとコードの記述が分業しやすくなり、より柔軟な作りがしやすくなるかと思います。 今後のツールづくりの課題としては、手軽に`JSON`ファイルを書き出すような仕組みを作ることや、データが埋め込まれているインスタンスを探しやすくするためにSWFPanel上で検索できるように作りたいと思います。

### 参考記事

-   [Adobe Flash Professional Team Blog / Flash Professional CC | Publish Persistent Metadata](http://blogs.adobe.com/flashpro/2013/07/15/flashpro-cc-publish-persistent-metadata/ "Adobe Flash Professional Team Blog / Flash Professional CC | Publish Persistent Metadata") [Extending Flash Professional](http://help.adobe.com/en_US/flash/cs/extend/index.html)