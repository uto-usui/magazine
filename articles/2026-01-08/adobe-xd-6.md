---
title: "誤字検知に役立つ！ Adobe XDのプラグイン「テキスト校正くん」を公開"
source: "https://ics.media/entry/19346/"
publishedDate: "2018-10-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

Adobe XDで**文章校正を支援するプラグイン「テキスト校正くん（英名：Japanese Proofreading）」**を弊社からリリースしました。無料で利用できます。

-   [テキスト校正くん for XD](https://xd.adobe.com/landing/plugin-download/en/index.html?pluginId=4e1c7ed1)

本プラグインを利用することで、**画面内の文章を手軽に校正でき**、テキストの品質を高めることができます。

![実行中のデモ](https://ics.media/entry/19346/images/220324_xd_plugin_demo.gif)

「テキスト校正くん」はテキストエディターの「VS Code」（[参考](https://ics.media/entry/18859/)）を以前から公開しており、約4万インストールと数多くの方に利用いただいています。また「テキスト校正くん」の校正機能をさまざまなツールで利用できるよう、デザインツールのAdobe XD（本記事）や「Figma」向けの拡張機能（[参考](https://ics.media/entry/220309/)）も開発し公開しています。

### 「テキスト校正くん」でできること

XDのアートボード内の選択中のテキストに対して、文章校正を行います。チェック性能はVS Codeの拡張機能と同じく、一般的な文章のルールに沿って、主に以下のようなチェックを行います。

-   「ですます」調と「である」調の混在
-   ら抜き言葉
-   二重否定
-   同じ助詞の連続使用
-   同じ接続詞の連続使用
-   逆接の接続助詞「が」の連続使用
-   全角と半角アルファベットの混在
-   弱い日本語表現の利用（〜かもしれない）
-   読点の数（1文に3つまで）
-   ウェブの用語や名称の表記統一（Javascript → JavaScript、Gitghub → GitHub等）
-   漢字の閉じ方、開き方（下さい → ください、出来る → できる等）

### インストール方法

1\. 次のリンクをクリックしてください。プラグインダウンロード用のページが開きます。

-   [テキスト校正くん for XD](https://xd.adobe.com/landing/plugin-download/en/index.html?pluginId=4e1c7ed1)

2\. ページを開くと、Adobe XDを開く許可を求められますので「Adobe XD.appを開く」をクリックしてください。

![STEP2.プラグインのインストール](https://ics.media/entry/19346/images/181026_xd_plugin_install_step02.png)

3\. Adobe XDのプラグインページが開かれますので、「インストール」ボタンをクリックしてください。

![STEP3.プラグインのインストール確認](https://ics.media/entry/19346/images/181026_xd_plugin_install_step03.png)

4\. 「インストール」ボタンが、「インストール済み」に変化すればインストール成功です。

![STEP4.プラグインのインストール完了](https://ics.media/entry/19346/images/181026_xd_plugin_install_step04.png)

### 利用方法

1\. アートボードから文章校正を行いたいテキストを選択します。複数のテキストを選択した状態でも利用できます。

2\. プラグインパネルから\[テキスト校正くん\]を選択します。

![テキスト校正くんの使い方](https://ics.media/entry/19346/images/220324_xd_plugin_usage01.png)

3\. 文章校正が完了すると、校正結果がダイアログで表示されます。

![テキスト校正くんの使い方](https://ics.media/entry/19346/images/220324_xd_plugin_usage02.png)

テキスト校正くんはテキストの複数選択に対応している他、グループやアートボード内のテキストも校正対象となります。一度に多くのテキストを校正したい時には、対象のテキストすべて選択した後にプラグインを実行してください。

![テキスト校正くんの使い方](https://ics.media/entry/19346/images/220324_xd_plugin_demo_multiple.gif)

### おわりに

目視のチェックでは、画面数が増えてくるとチェックに時間がかかり、見落とす可能性も高くなってしまいます。**「テキスト校正くん」を使って文章校正の手間を軽減し、デザイン制作に注力してみてはいかがでしょうか？**

また、文章校正力をスキルとして根本的に身につけるのも有効な手段です。記事「[いますぐ使える文章校正テクニック](https://ics.media/entry/19096/)」で紹介してますので、あわせてご覧ください。

### VS Code版もどうぞ

テキストエディターの「Visual Studio Code」向けの拡張機能もあります。「[VS Codeの拡張機能、テキスト校正くん](https://ics.media/entry/18859/)」もあわせてご利用ください。

![](https://ics.media/entry/19346/images/180811_textlint_demo.gif)

▲テキストエディターで文章校正ができるため便利です