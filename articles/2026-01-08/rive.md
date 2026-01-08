---
title: "インタラクションに特化したアニメーションツールRiveの魅力"
source: "https://ics.media/entry/241206/"
publishedDate: "2024-12-06"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2024年12月6日 公開 / [株式会社ICS 北川 杏子](https://ics.media/entry/staff/kitagawa/)

ウェブサイトやアプリなどでアニメーションするイラストを目にすることがよくあります。クリックしたらアニメーションする「いいね」アイコン、ローディング画面など、最近はインタラクティブでリッチなアニメーションを取り入れたものが多いです。

このようなアニメーションを作るツールとして[Lottie](https://lottiefiles.com/jp/)が有名ですが、[Rive](https://rive.app/)というツールがあるのをご存知でしょうか？

Lottieもとても便利なツールですが、RiveにはLottieにはない魅力があります。今回はこのRiveのメリットやデメリット、実際にRiveで作ったデモをご紹介します！

![Rive公式ページの画像](https://ics.media/entry/241206/images/241206_rive_editor_hero.jpg)

### Riveとは？

Riveはアニメーションを作成できるデザインツールと、それを多様なプラットフォームで実行できるランタイムです。最大の特徴は**インタラクションをツール上で作れる**ことです。オンラインエディター、または[ダウンロードページ](https://rive.app/downloads)からダウンロードしたデスクトップアプリがあります。

#### 1つのツール上で完結できる

Riveでは、イラスト、アニメーション、インタラクションの作成を1つのツール上で完結できます。

同様のツールのLottieでは、Adobe Illustratorでイラストを作成し、After Effectsでアニメーションを追加、最終的にLottieに変換という順序で作成する場合が多いです。この際、Illustratorで使えたエフェクトがAfter Effectsでは使えない、After Effectsで作ったアニメーションがLottieでは再生できない、など制約がある場合があります。

Riveは1つのツール内で完結できるのでこういった制約を気にせず、複数のツールを行ったり来たりする手間も省けます。

#### インタラクションアニメーションをGUI上で作れる

クリックやマウスのホバーなどがきっかけでアニメーションするボタンなどは、通常はJavaScriptなどのソースコードを書くことで実現します。ウェブサイトやアプリを制作する工程では、デザイナーが言葉でイメージを伝えたり、FigmaやAdobe XDなどのプロトタイピングツールで簡易的なアニメーションを作成し、エンジニアが意図をくみ取って実装します。ここでデザイナーと実装者の認識が違えば修正、実装を繰り返すことになります。

RiveではJavaScriptなどの**プログラミング言語の知識がなくても画面上でクリックやホバーを契機にしたアニメーションを作成できます。**また、作ったアニメーションやインタラクションをツール上ですぐに確認できるので、ウェブブラウザに表示させる手間がありません。

▼Riveのツール上でアニメーションを実行している様子

「isHovered（ホバーしたか）」などの状態が画面左下、それによって動いているアニメーションが画面中央下で視覚的に確認できます。複数のアニメーションや状態を線や矢印などで組み合わせながらアニメーションを作成します。

![RiveのGUIでアニメーションが作れる](https://ics.media/entry/241206/images/241206_gui.gif)

#### ファイルサイズが小さい・高パフォーマンス

Riveから出力したファイルは`.riv`という独自のフォーマットになっています。`.riv`はバイナリファイルで軽量です。Riveのランタイムでの読み込み、表示を高速に行うために最適化されています。

※`.riv`ファイルはランタイムで利用するためのフォーマットです。Riveツールへインポートするためには`.rev`というフォーマットを使用します。`.rev`をランタイムで読み込むことはできません。

またRiveのウェブ用のランタイムではWASM(WebAssembly)が使われています。ブラウザ上での画像の処理など重い処理をWASMで高速化することで高パフォーマンスを実現しています。

RiveとLottieを比較した[Riveの公式ブログ](https://rive.app/blog/rive-as-a-lottie-alternative)では、同じアニメーションをRiveとLottieの両方で作成し、そのファイルサイズとパフォーマンスを比較しています。

![RiveとLottieのパフォーマンス比較](https://ics.media/entry/241206/images/241206_performance.jpg)

#### 多様なプラットフォームで使える

Riveのランタイムはウェブ、iOS、Android、Unityなどさまざまなプラットフォームで使えます。[Riveのドキュメント](https://rive.app/community/section/runtimes/sgb3FvY28XNu)では対応しているプラットフォームでの使い方を一つひとつ確認できます。

### Riveのデメリット

ここまでRiveの魅力を紹介してきましたが、もちろんデメリットもあります。

#### 無料版だと機能に制限がある

Riveは無料版と有料版があります。有料版はおもにチームで使うためのもので、他のメンバーとの同時編集が可能になります。その他にも機能面で細かな違いはありますが、個人で使う分には無料版で十分です。無料版でも商用利用が可能です。

詳しくは[Pricingページ](https://rive.app/pricing)をご確認ください。

### Riveで作ったデモを紹介

ここからはRiveで実際に作ったデモを紹介します。いずれもインタラクションはツール上で作り、JavaScriptではファイルを読み込んだだけです。

![JavaScriptのコード](https://ics.media/entry/241206/images/241206_javascript.jpg)

#### デモ1:クリックとホバーでアニメーションする星

![アニメーションする星](https://ics.media/entry/241206/images/241206_star.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241206_rive/)
-   [ソースコードを確認する](https://github.com/ics-creative/241206_rive/tree/main/src)

#### デモ2:マウスについてくる魚

![マウスについてくる魚](https://ics.media/entry/241206/images/241206_fish.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/241206_rive/)
-   [ソースコードを確認する](https://github.com/ics-creative/241206_rive/tree/main/src)

Riveでは[Community Files](https://rive.app/community/files/)で世界中の人が作った作例が公開されています。アイコンからゲーム画面のようなものまで、とてもクオリティの高い作例がたくさんあるのでこちらもぜひ見てみてください。

またCommunity Filesのファイルは[クリエイティブ・コモンズ・ライセンス](https://creativecommons.jp/licenses/)として公開されていて、ライセンス条件の範囲内で再配布やリミックスが可能です。

### まとめ

ここまでRiveを紹介しました。これまでインタラクションの作成はエンジニアの領域でしたが、Riveを使えばプログラミング言語に詳しくない方でもデザインができる画期的なツールです。

インターフェイスもAdobe IllustratorやAfter Effectsのようなツールに近いので、使い慣れた方にとってはなじみやすいツールです。LottieだけではなくRiveも今後のウェブサイトでは使われていくかもしれません。

### 参考サイト

-   [アニメーションツールのRiveを触ってみた【前編】 | iret.media](https://iret.media/71860)
-   [WebアニメーションはRiveが便利！](https://zenn.dev/shota1995m/articles/shota1995m-rive-app)