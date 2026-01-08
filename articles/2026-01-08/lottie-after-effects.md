---
title: "最新版！ Lottieアニメーションの作り方 - After Effects編"
source: "https://ics.media/entry/230928/"
publishedDate: "2023-10-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

「[Lottie](https://airbnb.io/lottie/#/)ロッティー」はAirbnb社が開発した、ベクター画像をアニメーションさせることができる技術・ファイルフォーマットです。

[前回の記事](https://ics.media/entry/230913/)では、Lottieの概要から、Figmaを使った作り方、LottieFilesを用いた書き出し方法を紹介しました。

本記事では[Adobe After Effects](https://www.adobe.com/jp/products/aftereffects.html)を使ったLottieの作成方法から書き出し方、表示確認までを紹介します。

▼Lottieの作例

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230821_lottie_part1/index.html)
-   [ソースコードを確認する](https://github.com/ics-creative/230821_lottie_part1/blob/main/index.html)

### 作り方 - Bodymovinで書き出し

After Effectsでアニメーションを作成し、After Effectsの拡張機能「Bodymovin」を使って書き出す方法と、「LottieFiles」で書き出す2種類の方法を紹介します。

▼Lottieの作成・書き出し・実装までの一連の流れ ![After EffectsやFigmaなどで作成、BodymovinやLottiFilesから書き出し・プラットフォームやプロジェクトに応じて様々な方法で実装](https://ics.media/entry/230928/images/230928_lottie_flow.png)

-   [完成品のサンプルを別ウインドウで開く](https://ics-creative.github.io/230821_lottie_part1/demo/search-anim.html)
-   [アニメーションの元データをダウンロードしに行く（githubが開きます）](https://github.com/ics-creative/230821_lottie_part1/blob/main/samples/ae-sample.aep)

#### 1：アニメーションさせるSVG形式の素材を用意し、After Effectsでアニメーションを作成

After Effectsと同じAdobe製品である[Adobe Illustrator](https://www.adobe.com/jp/products/illustrator.html)で素材を作り、After Effectsに読み込んでアニメーションをつける方法が多いかと思うので、この方法を紹介します。

① Illustrator: 動かしたい部分をレイヤーを分けてSVGを作ります。

-   Lottieに書き出した時に表示できないトラブルを防ぐため、**レイヤー名は英語にしておくことをオススメ**します。
-   イラストにグラデーションを指定したい場合は、注意点がありますので後述の「ファイルがうまく表示されない時は…」の項をご覧ください。

▼Illustratorの画面（アニメーション作成時用の一部の補助パーツは非表示にしています） ![イラレ画面](https://ics.media/entry/230928/images/230928_lottie_illustrator.png)

② After Effectsに作成した素材をインポートします。

-   ［ファイル］→［読み込み］→［ファイル…］→作成したIllustratorのファイルを選択します。

③ 読み込みの種類: ［コンポジション］に変更し［開く］をクリックします。

後からコンポジションの設定などは変えることができますので、どの種類で読み込んでも大丈夫です。

![After Effectsの手順②③](https://ics.media/entry/230928/images/230928_lottie_ae_1_flow23.png)

※後述の「ファイルがうまく表示されない時は…」の不具合に遭遇したことがあるため、英語にて起動しています。

④ すべてのレイヤーを選んで、右クリック→［作成］→［ベクトルレイヤーからシェイプを作成］

⑤ aiファイルのレイヤーは不要になるので削除してOKです。

![After Effectsの手順④⑤](https://ics.media/entry/230928/images/230928_lottie_ae_1_flow45.png)

⑥ アニメーションを作成します（詳しい解説は長くなるので省略いたします）。

-   After Effectsではいろんなアニメーションを作成できますが、Lottieで再現できるのものに限りがあります。詳しくは[サポート表](https://airbnb.io/lottie/#/supported-features)の通りです。

余談ですが、Lottieでサポートされている項目を筆者はすべて把握しておらず、パペットツールを使いアニメーションを作成したら、表示確認の際に動かず作り直す羽目になったことがあります。みなさんも重々お気をつけください。サポートしているプロパティをしっかり確認しておくことや、後述の表示確認を適度に行うことが重要です。

#### 2：After Effectsの拡張機能「Bodymovin」をインストール

続いて、書き出しに必要な拡張機能をインストールしましょう。[公式が紹介しているいくつかある導入方法](https://github.com/airbnb/lottie-web#plugin-installation)のうち、一番簡単だと思われる方法を紹介します。

Adobe Creative Cloudアプリから、［Stockとマーケットプレイス］→［プラグイン］→「Bodymovin」を検索し［インストール］をクリックすればインストール完了です。

もしくは、[ブラウザ版のページ](https://exchange.adobe.com/apps/cc/12557)からでも同様にインストール可能です。

▼Adobe Creative Cloud |「Bodymovin」プラグイン ![Bodymovinプラグインインストール画面](https://ics.media/entry/230928/images/230928_lottie_ae_2.png)

#### 3：After Effects拡張機能を使えるようにしておく

メニュータブから、［After Effects］→［設定…］→［スクリプトとエクスプレッション］→「スクリプトによるファイルへの書き込みとネットワークへのアクセスを許可」にチェックします。

▼After Effects画面 ![After Effects拡張機能を使えるようにしておく手順](https://ics.media/entry/230928/images/230928_lottie_ae_3.png)

#### 4：書き出し

4-1: インストールしたBodymovinプラグインを使い書き出しを行います。

［ウィンドウ］→［エクステンション］→［Bodymovin］を選びます。

![Bodymovinで書き出し](https://ics.media/entry/230928/images/230928_lottie_ae_4_1.png)

4-2: Bodymovinのパネルが開きます。

① 「Selected」列の丸ポチをクリックし、アクティブにします。

② 「…/Destination Folder」列の［…］をクリックし、書き出し先を選びます。

③ ［Render］ボタンをクリックし、書き出し完了です。

![Bodymovinで書き出し](https://ics.media/entry/230928/images/230928_lottie_ae_4_2.png)

#### 5：表示確認 - Bodymovinの書き出しで、デモHTMLファイルを一緒に書き出す

［Settings］→「Export Modes」→［Demo］をアクティブにし書き出しを行うと、Lottieを埋め込んだHTMLファイルが書き出されます。

Lottieが埋め込まれたHTMLファイルは、ローカルファイルとして共有しやすく便利ですが、あくまで表示確認用でありJSON形式やdotLottie形式のように実装に組み込むことができない点は注意しておきましょう。

▼After Effects | Bodymovinのパネル ![Bodymovinのsettings画面](https://ics.media/entry/230928/images/images/230928_lottie_bodymovin_settings.png)

▼書き出されたデモファイル

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/230821_lottie_part1/demo/search-anim-bodymovin-demo.html)
-   [書き出されたHTMLファイルのソースコードを確認する](https://github.com/ics-creative/230821_lottie_part1/blob/main/demo/search-anim-bodymovin-demo.html)

### LottieFilesを使って書き出し

書き出しと表示確認を行うもうひとつの方法に、「LottieFiles」を使用した方法があります。LottieFilesについては、前回記事『[最新版！ Lottieアニメーションの作り方 - Figma編](https://ics.media/entry/230913/)』にて解説していますので、概要を把握してから作業いただくことをオススメします。

#### 1：拡張機能「LottieFiles for After Effects」をインストール

Adobe Creative Cloudのプラグインで「LottieFiles for After Effects」を検索し、インストールしておきます。

プラグインは、[ブラウザ版のページ](https://exchange.adobe.com/apps/cc/103642/lottiefiles-for-after-effects)からでもインストール可能です。

▼Adobe Creative Cloud |「LottieFiles for After Effects」プラグイン ![LottieFiles for After Effects](https://ics.media/entry/230928/images/230928_lottie_lottiefiles_ae.png)

#### 2：書き出し

① LottieFilesプラグインのパネルを開く

After EffectsからLottieFilesを用いて書き出すには、［ウィンドウ］→［エクステンション］→［LottieFiles］を選択します。するとLottieFilesプラグインのパネルが開きます。

ログインを求められるので、［Login via browser］をクリックしブラウザからログインします。アカウントを作成していない場合は[LottieFiles](https://lottiefiles.com/jp/)のアカウントを登録しておきましょう。

② ワークスペースにアップロードし、書き出し

書き出したいコンポジションを選択し、［Save to workspace］を押下すると、非公開ファイルとしてLottieFilesのワークスペースにアップロードされます。アップロード後、`.json`拡張子や`.lottie`拡張子でダウンロードすることができるようになったり、LottieFilesサービス上で確認できるようになります。

![LottieFilesから書き出し](https://ics.media/entry/230928/images/230928_lottie_lottiefiles_export.png)

### ファイルがうまく表示されない時は…

#### Illustrator → After Effectsの時点：グラデーション

Illustratorでグラデーションを含んだ元のベクターイラストを作成し、After Effectsにインポートするとグラデーションがなくなります。残念ながらAdobe製品側で最適化してくれることはありません。After Effectsでグラデーションを再指定するか、[有料の転送プラグイン](https://flashbackj.com/product/overlord)を導入する方法が解決策として挙げられます。

また、Illustratorのデータでグラデーションを含んでいると、After Effectsのシェイプレイヤーへの変換時に不要な複合パスが作成され、パスの外側に塗りが適用される場合があります。作成されてしまった不要なパスは削除しておきましょう。

#### ブラウザで確認したら何か変？

レイヤー名やプロパティ名などが日本語だとうまく表示されないことがあります。各レイヤーなどを英語にリネームすることや、After Effectsを英語で起動する方法などが解決策として挙げられます。

そのほかの問題は[公式のトラブルシューティング](https://airbnb.io/lottie/#/web?id=troubleshooting)が参考になるかもしれません。

### まとめ

After Effectsを用いたLottieアニメーションの作成、書き出し、表示確認を行う方法を紹介しました。

個人的にAfter Effectsは機能が多く操作が難しい印象だったのですが、Lottieでサポートされているプロパティが制限されている分、難しいことをせずアニメーションを作成することができたように思います。

次に予定している実装編では、シンプルにブラウザに表示する方法から、簡単なイベントに応じてアニメーションを操作する方法を紹介します。

#### 参考サイト

-   [Lottieを使ったアニメーションの実装 − デザイナーが気をつけた4つのポイント](https://blog.recruit-productdesign.jp/n/n2ed54d64bac9)
-   [Lottieでグラデーションが白黒になってしまった時の小技](https://techblog.ldi.co.jp/entry/2023/02/20/173010)
-   [【2023最新】After Effectsの英語版⇔日本語版を簡単に切り替える方法【AE】](https://yesmanblog.com/after-effects-english-ver)

### 連載一覧

-   アニメーション
    -   [Figma編](https://ics.media/entry/230913/)
    -   [After Effects編](https://ics.media/entry/230928/)（本記事）
-   実装
    -   [HTMLでLottieを配置する方法](https://ics.media/entry/240403/)
    -   [JSでLottieを配置する方法](https://ics.media/entry/240625/)