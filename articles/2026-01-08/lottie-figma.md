---
title: "最新版！ Lottieアニメーションの作り方 - Figma編"
source: "https://ics.media/entry/230913/"
publishedDate: "2023-09-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://airbnb.io/lottie/#/)ロッティー」はAirbnb社が開発した、ベクター画像をアニメーションさせることができる技術・ファイルフォーマットです。

画質の劣化を伴わないLottieによるアニメーションの導入は、UI改善・コンテンツの没入感の形成・リッチな体験を提供する効果が期待できます。

本記事ではLottieの概要から、まずはデザインツール「[Figma](https://www.figma.com/)」を使ってお手軽にLottieを作る方法を紹介します。

▼Lottieの作例

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230821_lottie_part1/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230821_lottie_part1/blob/main/index.html)

### Lottieとは

#### ベクターとラスター

まず、画像形式について少し整理しておきましょう。画像形式はベクターとラスターの2種類に分けられます。ベクターとラスターの違いについては記事『[SVGで始めるマイクロインタラクション入門](https://ics.media/entry/15834/)』で解説していますが、簡単にいうと拡大しても高い解像度を保ちボケないのがベクター画像、ボケるのがラスター画像です。

そして、**Lottieはベクター画像をアニメーションさせることができる技術・ファイルフォーマット**です。

ラスター画像のアニメーション（動画形式・アニメーション画像形式）については、『[ウェブサイトに透過動画を埋め込む方法](https://ics.media/entry/221007/)』にて解説していますのでぜひご覧ください。

#### Lottieのファイルフォーマット

Lottieはベクター画像をアニメーションさせる技術といいましたが、実態は**オブジェクトとアニメーションのデータを保持したテキストファイル**です。とくに、After Effectsのプラグイン「Bodymovin」から出力されるJSON形式のファイル（`.json`拡張子）を指します。

中身はテキストファイルなので、ラスター形式の動画やアニメーション画像と比較すると**容量が軽量である**ことが特長です。レンダリング時にSVGとして描画ができ、アニメーションしている結果が見られます。

※レンダリングの設定で`canvas`要素を指定すれば、ラスター形式で表示させることも可能です。

#### 開発が進む`.lottie`拡張子のLottie

また、後発で`.lottie`拡張子のLottieである「[dotLottie](https://dotlottie.io/)」の開発が進んでいます。`.json`拡張子のLottieよりも**容量の圧縮率が高く軽量**で、**拡張子名からどのようなデータなのか一目瞭然**であることが特長です。

`.json`拡張子のLottieと同じくベクター画像のアニメーションを再生させることができるファイルですが、中身は圧縮データファイルのためJSON形式のように、テキストエディターから中身を確認したり編集できない点は注意しておきましょう。

### 作り方

元々はAfter Effectsの拡張機能「Bodymovin」を使って作ることで開発されたLottieですが、「LottieFiles」プラグインの登場により、Figmaなどのそのほかのクリエイティブ系ツールでもアニメーションをLottieとして書き出すことができるようになりました。

参考：[Lottieの書き出しを行えるツール一覧](https://lottiefiles.com/jp/integrations)

今回は、Figmaのプロトタイプ機能を使ってアニメーションを作成し、LottieFilesから書き出す方法を紹介します。

▼Lottieの作成・書き出し・実装までの一連の流れ ![After EffectsやFigmaなどで作成、BodymovinやLottiFilesから書き出し・プラットフォームやプロジェクトに応じて様々な方法で実装](https://ics.media/entry/230913/images/230913_lottie_flow.png)

Figmaのプロトタイプ機能は、いくつかのフレームを繋げてアニメーションさせるものですが、トランジションの種類を「スマートアニメート」に指定すれば自動的にフレーム間のアニメーションを補完してくれるので、キーフレームアニメーションのようなシームレスなアニメーションが作れます。スマートアニメートの概要や使い方は『[FigmaのSmart Animateを活用したプロトタイプ入門](https://ics.media/entry/210526/)』にて解説していますので、FigmaでLottieを作ってみたい方はご確認ください。

-   [完成品のサンプルを別ウインドウで開く](https://ics-creative.github.io/230821_lottie_part1/demo/present-anim.html)
-   [アニメーションの元データをダウンロードしに行く（githubが開きます）](https://github.com/ics-creative/230821_lottie_part1/blob/main/samples/figma-sample.fig.zip)

#### 1：アニメーションを作成

以下のポイントを押さえてアニメーションを作成します。アニメーションの内容については説明すると長くなるので省略いたします。

-   「トランジション」は「スマートアニメート」を指定します。
-   「インタラクション」はすべて「アフターディレイ」にし、終了フレームと開始フレームを繋げることでループアニメーションが作れます。
-   アニメーションで使える項目は[サポート表](https://lottiefiles.notion.site/Supported-features-fd9655b3289443518b352f45e0913e83)をご確認ください。

#### 2：Figmaの「コミュニティ」から「LottieFiles」を検索し、プラグインを入れる

-   「[LottieFiles](https://www.figma.com/community/plugin/809860933081065308/lottiefiles-create-animations-export-from-figma-to-lottie)」プラグイン
-   プラグインの入れ方は記事『[Figmaを使いこなせ! デザイナー必須のおすすめプラグイン15選](https://ics.media/entry/221117/)』にて解説していますので、わからない場合はご確認ください。
-   ［使ってみる］ボタンの下に「サードパーティ決済」と書かれていますが、無料で使うことができます。参考：[Figma to Lottie – Help Center](https://lottiefiles.notion.site/Figma-to-Lottie-Help-Center-b1ad720543724dcf8b2d5c9b29b4ed9a)

▼Figma |「LottieFiles」プラグイン ![FigmaのLottieFilesプラグイン](https://ics.media/entry/230913/images/230913_lottie_figma_lottiefiles.png)

#### 3：LottieFilesにログイン、またはサインアップします。

-   ［プラグイン］から［LottieFiles］を選択すると、ログインかサインアップを求められるので、アカウントを作成していない場合は[LottieFiles](https://lottiefiles.com/jp/)のアカウントを登録します（Figmaアプリで作業していた場合ブラウザに飛びます）。

▼LottieFiles | アカウント登録画面（登録は無料で行えます） ![LottieFiles登録画面](https://ics.media/entry/230913/images/230913_lottie_figma_signup.png)

#### 4：書き出し

① ［プラグイン］から［LottieFiles］を選択し、［Export to Lottie］タブをクリックします。

② 書き出したいフローを選択し、［Export to Lottie］ボタンをクリック、または［Select prototype flow］から書き出したいフローを選択します。

![Figmaの手順①②](https://ics.media/entry/230913/images/230913_lottie_figma_1.png)

③ ［Save to workspace］をクリックします。

④ アップロード先のフォルダーを選択します。

⑤ ［Save］ボタンを押します（非公開ファイルとしてアップロードされます）。

![Figmaの手順③④⑤](https://ics.media/entry/230913/images/230913_lottie_figma_2.webp)

⑥ ［Open in browser］をクリックしブラウザで確認しましょう。

⑦ LottieFilesからファイル形式を選んでダウンロードすれば書き出し完了です。そのほか配色の変更など簡単なカスタマイズもできます。

![Figmaの手順⑥⑦](https://ics.media/entry/230913/images/230913_lottie_figma_3.png)

### LottieFilesとは

Lottieの作例をアップロードできる・アップロードされている作品を利用できる**コミュニティ**のようなものであり、**Lottieの簡単な編集から書き出し機能やプラグイン、実装時に必要なライブラリを提供しているサービス**です。

#### アップロードされている作品を使う

[LottieFilesコミュニティ](https://lottiefiles.com/featured)にアップロードされている作例は、基本的には無料で編集やダウンロードして使用することが可能です。 ※ダウンロード数の部分に「Premium」と書いている場合は、[IconScout](https://iconscout.com/)というサービスから公開されている作品でIconScoutのサイトに飛びます。IconScoutのプランに応じて利用に制限があるLottieもあります。

#### 作品の公開について

コミュニティに公開申請を行わなければ作品が公開されることはありません。Lottieを公開したい場合は、タグをつけて公開できます。公開申請後、実際に公開されるまで数時間かかりますので気長に待ちましょう。

#### Lottieの表示確認として使う

作品をLottiFilesにアップロードすることで、非公開ファイルでもウェブ上での表示確認や、モバイルアプリでの表示確認を行うことができます。

また、共有するための仕組みが整っているため、閲覧・編集の権限を設定して、限定のリンクやQRコードを発行できたり、メールで限られた人だけを招待し共有することも可能です。

#### 注意点

無料で利用できるスタータープランはアップロード数や使える機能に制限があります。

そのほかの情報について、詳しくは[LottieFiles](https://lottiefiles.com/jp/)をご確認ください。

### まとめ

Lottieの概要からFigmaを使った作成方法、そしてLottieFilesを使った書き出し方法を紹介しました。

今回紹介したFigmaのようにAfter Effects以外のツールでもLottieの作成が可能ですので、取り組んでみるきっかけになれば幸いです。

次の記事『[After Effects編](https://ics.media/entry/230928/)』ではAfter Effectsを使用して、アニメーションの作成から書き出しまでを行う方法の紹介を予定しています。

#### 参考サイト

-   [Lottieアニメーションとは？- LottieFiles](https://lottiefiles.com/jp/what-is-lottie)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)（本記事）
    -   [After Effects編](https://ics.media/entry/230928/)
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)