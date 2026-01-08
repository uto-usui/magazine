---
title: "CreateJSのための高速なトライアル＆エラー開発環境の作り方ーCreateJS勉強会/野原発表資料"
source: "https://ics.media/entry/13453/"
publishedDate: "2016-10-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

2016年9月30日（金）、[CreateJS勉強会 (第8回）](https://atnd.org/events/81354)がアドビシステムズ（東京）で40人の定員規模で開催されました。勉強会のフォローアップとして、発表資料「CreateJSのための高速なトライアル&エラー開発環境の作り方」のスライドを一部抜粋し記事という形で公開します。

### リッチなコンテンツを効率的に作るための開発環境づくり

今回のCreateJS勉強会では、スペシャルサイトやゲームなどのリッチなコンテンツを作るためにCreateJSを使用している方が多くいらっしゃいました。CreateJSではリッチなコンテンツ表現を作成できますが、その表現を高めるためにはトライアル&エラーを繰り返すことが必要になります。本記事では効率よく開発するための開発環境の作り方を紹介します。

▲ 勉強会でも共有した開発環境の動画です。[TypeScript](https://www.typescriptlang.org/)によって書かれたコードの補完や[Adobe Animate CC](https://www.adobe.com/jp/products/animate.html)から書きだしたアセットの補完がされ、コードとAnimate CCとのスムーズな連携が確認できます。

### Animate CCとコードを組み合わせたワークフローについて

リッチなコンテンツを作る場合は、複数人での開発が欠かせません。そのため、開発中にいかに作業待ちが発生しないワークフローを作る必要があります。

今回提案するワークフローはデザイナーがAnimate CCでデザインや演出を作成しCreateJSファイルへと書き出し、フロントエンジニアはそのファイルとは別ファイルへソースコードを書いていきます。デザイナーとエンジニアが出力したファイルは[Gulp](https://gulpjs.com/)や[npm-scripts](https://ics.media/entry/12226/)などでまとめて、最終的な成果物を出力します。

この時にポイントとなるのは、Animate CCではデザインや演出を独立したJavaScriptファイルへと出力でき、出力したJSをエンジニアが修正する必要がないことです。

![](https://ics.media/entry/13453/images/1601004_createjs_workflow-960x540.png)

デザイナーはフロントエンドエンジニアの実装を待つことなくデザインを作ったり修正でき、フロントエンドエンジニアはデザイナーのデザインや演出を待つことなく実装に集中できます。並行して作業ができるため、効率よく開発ができます。

### 開発手法（TypeScriptのすすめ）

TypeScriptはJavaScriptに型を付けた言語で、コンパイルすることでJavaScriptに出力できます。TypeScriptを採用することで得られるCreateJSの開発効率について、「プログラムの入力補完」、「アセットの入力補完」、「コンパイルエラーでエラーが事前にわかる」という点から紹介します。

#### プログラムの入力補完について

TypeScriptには型があるため、変数名やクラス名などの入力候補がエディター上で表示されます。詳細なAPI名を覚えなくて済むため、APIリファレンスを探しに行く手間がありません。キータイプ時間が短くなり、入力ミスによるバグの回避などにもつながります。

既存のJavaScriptとTypeScriptを合わせて使うには型定義ファイルが必要になります。有名なライブラリーであれば型定義ファイルは公開されていることが多く、多くは「[Typings](https://github.com/typings/typings)」というツールや、「[@types](https://www.npmjs.com/~types)」という名前がついたnpmパッケージ経由で型定義をダウンロードができます（TypeScript 2.0向け）。

▼ Typings経由でCreateJSの型定義ファイルをインストール

Typingsのインストール

```
npm install -g typings
typings init
```

Typings経由で型定義をインストール

```
typings install dt~createjs --save --global
```

▼ @typesでCreateJSの型定義をnpmモジュールとしてインストール (TypeScript 2.0)

```
npm install @types/createjs --save
```

型定義ファイルが公開されていない場合は自分で作る必要がありますが、npmパッケージで公開されているライブラリーであればマイクロソフト社が公開している「[dts-gen](https://github.com/Microsoft/dts-gen)」という型定義ファイルを作るツールを使用すると良いでしょう。

![](https://ics.media/entry/13453/images/161004_createjs_typescript-960x540.png)

▲ [WebStorm(エディター)](https://www.jetbrains.com/webstorm/)でTypeScriptの型定義による入力補完が効いているため、具体的なAPIを覚えていなくても入力できます。

#### アセットの入力補完について

Animate CCから出力されたアセットはJavaScriptのクラスとして定義されているので、プログラムからインスタンスとして生成できます。これらのアセットをTypeScriptから扱うときには、「[createjs-def](https://github.com/elsassph/createjs-def)」というツールを使うと良いでしょう。createjs-defはJSFL（Animate CC用のスクリプト）とnpmパッケージが提供されていて、Animate CCから生成されたJavaScriptファイルアセット専用の型定義ファイルを作れます。アセットのクラス名やインスタンス名の型定義ファイルがあることで、入力補完で素早く入力できますし、インスタンス名の指定ミスにもすぐに気づけるでしょう。

![](https://ics.media/entry/13453/images/1601004_createjs_assets-960x540.png)  
▲ createjs-defを使うと、Animate CCから生成されたJavaScriptファイルからアセット専用の型定義ファイルを作れます。

![](https://ics.media/entry/13453/images/1601004_createjs_assets_2-960x540.png)

▲ Animate CC上で配置したインスタンス名がWebStormのエディター上で補完されています。

#### コンパイルエラーでエラーが事前にわかる

TypeScriptはコンパイルしてJavaScriptになるため、コンパイル時にコードの構文チェックがされます。そのため、ブラウザーなどで実行する前にエラーとなる箇所がわかります。コンパイルをすることで、変数名や関数名の記入ミスで発生するコンテンツの停止を事前に防ぎやすくなります。

### ブラッシュアップ手法について

#### ブラウザーの自動更新を行う

コードやアセットの修正時に自動でブラウザーが更新されるツールを導入すると、手作業でのブラウザー更新の手間がへり、コンテンツをブラッシュアップする際の効率化につながります。[BrowserSync](https://www.browsersync.io/)(※)やWebStormのローカルサーバー機能（※）を使用すると良いでしょう。

※ BrowserSyncは記事「[ブラウザ確認が一瞬！ Grunt・Gulpと始めるBrowserSync入門](https://ics.media/entry/3405/)」を参考ください。  
※ WebStormのローカルサーバー機能は記事「[ウェブ制作にはWebStormがお勧め！ 使いこなせば操作が爆速になる機能のまとめ](https://ics.media/entry/11642/)」を参考ください。

#### エディター上のデバッガーを使う

プログラムのデバッグであればブラウザー付属の開発者ツールではなく、デバッガーが搭載されているエディターを使用すると効率よく開発できます。たとえば、[WebStorm](https://www.jetbrains.com/webstorm/)や[Visual Studio Code](https://code.visualstudio.com/)にはデバッガーが付属しています。[Adobe Brackets](http://brackets.io/)も[Theseus for brackets](https://github.com/adobe-research/theseus)という拡張機能をインストールするとプログラムのデバッグが可能です。

開発者ツールのコードとエディターのコードは同じものですが、デバッグ中に開発者ツールで気になる箇所を見つけてもエディターのコードとは別のソフトウェアのため行き来が必要になります。エディターにデバッガーが搭載されていれば行き来がなくなり、より効率よく開発できるでしょう。

![](https://ics.media/entry/13453/images/1601004_createjs_debugger-960x540.png)

#### タスクランナーで自動化を行う

何度も行うようなクリエイティブではない作業はタスクランナーにまかせて、クリエイティブの為のブラッシュアップを行いましょう。具体的には次の作業を自動化すると良いでしょう。

▼ コンテンツの読み込み時間の短縮のため、データ容量やリクエスト数を減らす（※）

-   JavaScriptやCSSの圧縮・結合
-   画像ファイルの圧縮
-   スプライトシートの作成

▼ その他

-   TypeScriptのコンパイル
-   アセットの型定義ファイルの作成

※ 詳しくは記事「[CreateJSとToolkitで納品レベルまで最適化・高速化する方法](https://ics.media/entry/505/)」を参考ください。

### クリエイティブな作業に集中しよう

ウェブ技術の進化やスマホなどデバイスの多様化により、リッチコンテンツ制作に求められるものが高度化しています。そのため、従来の開発方法では対応しきれないことも増えてきました。開発環境を見直し、クリエイティブな作業に集中できる効率的な開発環境の構築を目指してはいかがでしょうか。

本記事で紹介した開発環境は[GitHubにて公開しています](https://github.com/ics-creative/160930_createjs_startarkit)。興味のある方はぜひご覧ください。

![](https://ics.media/entry/13453/images/1601004_createjs_room.jpg)