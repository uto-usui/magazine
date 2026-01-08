---
title: "ウェブ制作にはWebStormがお勧め！ 使いこなせば操作が爆速になる機能のまとめ"
source: "https://ics.media/entry/11642/"
publishedDate: "2016-04-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

みなさんはウェブサイト制作で、どのテキストエディターを使用していますか？　弊社ではHTMLやCSS、JavaScriptを扱うウェブ制作ソフトとして「[WebStorm](https://www.jetbrains.com/webstorm/)（ウェブストーム）」を全スタッフが利用しています。WebStormは有料のソフトウェアですが、日本語に対応しており、ウェブ制作に役立つ機能が豊富に搭載されていて**値段以上の価値があります**。

今回はWebStormの魅力について、「**WebStormの概要**」、「**ウェブ制作に便利な使い方**」、「**コードリーディングに重宝する機能**」、「**コーディングの助けになる機能**」の4点から紹介します。

※本記事はWebStormの内容ですが、開発元の[JetBrains](https://www.jetbrains.com/)社が提供している[IntelliJ IDEA](https://www.jetbrains.com/idea/?fromMenu)や[PhpStorm](https://www.jetbrains.com/phpstorm/)、その他のIDE（統合開発ソフト）で同様のショートカットや機能を使用できます。

本記事は初心者向けの内容ですが、続編記事「[使用歴5年目のエンジニアが送るWebStormの厳選神業集](https://ics.media/entry/16760/)」では中上級者向けの便利機能を紹介しています。WebStorm経験者は本記事とあわせて続編記事もあわせてご覧ください。

### WebStormの概要

![WebStormの操作画面](https://ics.media/entry/11642/images/160404_webstorm_js_screenshot.png)

WebStormとはJetBrains（ジェット・ブレインズ）社が提供しているHTML、CSS、JavaScriptの制作ソフトです。**HTMLやCSSやJavaScriptの強力なコード補完や、リアルタイムでのJSエラーの検知、デッドコードの検出、リファクタリングが可能です**。

フロントエンドエンジニアに役立つ機能も充実しています。Node.js（npm script）やタスクランナーのGulpの実行もWebStormから実行可能です。WebStorm内にコマンドライン機能が入っているため、「ターミナル.app」や「コマンドプロンプト」を起動する必要がなく、**ウェブ制作のほとんどの作業がWebStorm内で完結します**。

WebStormはフロントエンド制作に必要な技術として、Node.js、TypeScript、JSX、Sass、React、Vue.js、Gitなどとスムーズに連携できるようになっています。

### 基本操作の便利な使い方を覚えよう！

#### ドラッグ＆ドロップでプロジェクトを開く

WebStormのプロジェクトはフォルダー単位で管理されます。WebStormを起動してからプロジェクトを開けますが、次のようにフォルダーをドラッグ＆ドロップすると、素早くプロジェクトへアクセス可能です。

▼ Windows：WebStormのショートカットに向かってフォルダーをドラッグ＆ドロップ

![WebStormでプロジェクトを開く（Windowsにて）](https://ics.media/entry/11642/images/160404_webstorm_js_open_project_win.gif)

▼ macOS：DockにWebStormを配置してフォルダーをドラッグ＆ドロップ

![WebStormでプロジェクトを開く（macOSにて）](https://ics.media/entry/11642/images/160404_webstorm_js_open_project_mac.gif)

#### ファイルごとの編集履歴が簡単に確認できる

WebStorm内ではコードの編集履歴が保存されています。たまたまGitでコミットせず古い状態に戻したくなった場合でも、すぐに戻せて便利です。

日本語の場合

1.  ［プロジェクト］パネル内のファイルを選択し、右クリックメニューから［ローカル履歴］→［履歴の表示…］を選択
2.  戻したいファイルを選んで右クリック後［保存した状態に戻す］を選択

英語の場合

1.  ［Project］パネル内のファイルを選択し、右クリックメニューから［Local History］→［Show History…］を選択
2.  戻したいファイルを選んで右クリック後［Revert］を選択

![](https://ics.media/entry/11642/images/160729_webstorm_history.png)

▲ ファイルごとの更新履歴が残っているので便利。DIFF（更新差分）で編集した箇所もわかりやすい

### コードリーディングに重宝する機能を覚えよう！

#### CSSのクラス定義やJSの変数・関数の宣言元へコードジャンプ

CSSのクラス定義や、JavaScriptの変数や関数の宣言へ移動する機能があります。たとえば、HTMLで`class`のCSSを編集するときに、さくっと移動できるので便利です。次のショートカットで移動できるため、コードを探す手間が激減します。

-   Windows： Ctrl + Bキー、もしくはCtrl + クリック
-   macOS： Command + Bキー、もしくはCommand + クリック

![WebStormの検索窓が出てきて様々な検索ができる](https://ics.media/entry/11642/images/160404_webstorm_js_codejump.gif)

※宣言の場所でもう一度ショートカットキーを実行することで、使用している変数・関数へジャンプできます。

#### 変数・関数の使用箇所を検索

変数・関数の使用箇所を一覧で見たい場合には［Find］パネルを開くと便利です。ここでの検索は**単純な文字列での検索ではなく、WebStorm内のコード解析機能によって調査された使用箇所が表示されます**。

-   Windows： 変数（関数）を選んだ状態でAlt+F7キー
-   macOS： 変数（関数）を選んだ状態でOption+F7キー
-   （日本語の場合）メニューから［編集］→［使用箇所の検索］→［使用箇所の検索］
-   （英語の場合）メニューから［Edit］→［Find Usages］→［Find Usages］

![WebStormのFindパネル](https://ics.media/entry/11642/images/160404_webstorm_js_find.png)

#### ショートカットでファイルを開く

ファイルを開くときわざわざファイルツリーから目的のファイルを探すのは手間です。WebStormではショートカットを打つだけで目的のファイルを検索して開けます。検索時に入力する文字列は「部分一致検索」といって、ファイル名の先頭からの入力だけでなくファイル名の途中部分からの検索に対応しています。

-   Windows： Ctrl + Shift + Nキー
-   macOS： Command + Shift + Oキー

![ファイルの検索](https://ics.media/entry/11642/images/160404_webstorm_js_search_file.gif)

※「piyo」を検索する場合、「iy」としても部分一致で検索が可能です。

#### 変数名・関数名・クラス名を検索

シンボル検索という機能ですが、ショートカットでシンボル名（変数名、関数名、クラス名）を検索できます。［ファイルの検索］と同様に「部分一致検索」に対応しています。

-   Windows： Ctrl + Alt+Shift + Nキー
-   macOS： Command + Option + Oキー

#### なんでも検索

［Search Everywhere］機能を使うとプロジェクト内のテキストを検索できます。「Shiftキーを2回押す」だけで探せるので、**このショートカットを覚えておくだけでも充分に便利です。イチバンのオススメです**。

-   Windows： Shiftキーを2回連続で押す
-   macOS： Shiftキーを2回連続で押す

![WebStormの検索窓が出てきて様々な検索ができる](https://ics.media/entry/11642/images/160404_webstorm_js_searcheveryone.gif)

▲ 検索窓が表示され、さまざまな検索が可能

#### 「あとで作る」の一覧を表示

`TODO`というフォーマットでテキストを残しておくことで、［TODO］パネルに一覧として表示できます。「あとで作る」箇所のメモとして`TODO`をコメントとして残しておくと便利です。

```
// TODO
```

操作方法は、メニューから［View］→［Tool Windows］→［TODO］で［TODO］パネルを表示します。

![WebStormのTODOリストの表示](https://ics.media/entry/11642/images/160404_webstorm_js_todopanel.png)

▲［TODO］パネル内にプロジェクト内のTODOが表示されている

#### ソースコードとプロジェクトパネルの連携

［プロジェクト］パネルの［開いているファイルを常に選択］（英語の場合は［Always Select Opened File］）という設定をオンにすると、現在選択しているソースコードに追従して［プロジェクト］パネル内がスクロールされます。

![WebStormのAutoscroll from Sourceの設定](https://ics.media/entry/11642/images/160404_webstorm_js_autoscroll_settings.png)

▲［プロジェクト］パネルの、［歯車］アイコン→［開いているファイルを常に選択］をクリックし、チェックマークを入れます。

![WebStormのパネル内が自動スクロールされ、選択されているファイルの位置に移動する（macOS）](https://ics.media/entry/11642/images/160404_webstorm_js_autoscroll.gif)

▲［プロジェクト］パネル内が自動スクロールされ、選択されているファイルの位置に移動する

### コーディングの助けになる機能を覚えよう！

#### コードを自動整形して読みやすくしよう

コードフォーマットを使うと、インデントや空白のそろえ方、その他の記述揺れを修正し、コードを読みやすく整形できます。HTMLやCSS、JavaScriptなどなんでもコードを読みやすくできるので、重宝します。**自分が読みやすいコードは、誰が見ても読みやすい**。ぜひとも利用するとよいでしょう。

-   Windows： Ctrl + Alt + Lキー
-   macOS：Command + Option + Lキー
-   （日本語の場合）メニューの［コード］→［コードの整形］
-   （英語の場合）メニューの［Code］→［Reformat Code］

![](https://ics.media/entry/11642/images/160404_webstorm_js_formatcode.gif)

フォーマット内容の変更は、以下の設定で変更できます。

-   Windowsならメニューの［File］→［Settings］で開き、［Editor］→［Code Style］→［JavaScript］
-   macOSなら［WebStorm］→［Preference］で開き、［Editor］→［Code Style］→［JavaScript］

#### 最後に編集した行に移動

コーディング最中、別のファイルを見に行ったあと、元の編集位置に戻りたいことはよくあります。そんなときは次のショートカットを使うと便利です。

-   Windows ：Ctrl + Shift + Backspaceキー
-   macOS： Command + Shift + Deleteキー
-   （日本語の場合）メニューから［移動］→［最後の編集箇所］
-   （英語の場合）メニューから［Navigate］→［Last Edit Location］

#### コメント文の切り替え

ショートカットキーで特定の行をコメントにでき、再度の実行でコメントを取り消せます。

-   Windows： Ctrl + /キー
-   macOS： Command + /キー

![コメント分の挿入](https://ics.media/entry/11642/images/160404_webstorm_js_commentcode.gif)

#### 文字列をコピーした履歴からペーストする

WebStorm内でコピーの履歴から選んでペーストができます。

-   Windows： Ctrl + Shift + Vキー
-   macOS： Command + Shift + Vキー
-   （日本語の場合）メニューから［編集］→［貼り付け］→［履歴から貼り付け…］
-   （英語の場合）メニューから［Edit］→［Paste］→［Paste from History…］

![クリップボードの履歴から選択できる](https://ics.media/entry/11642/images/160404_webstorm_js_somepaste.png)

▲ 上記のショートカットを入力した時に表示されるコピー履歴選択ウインドウ

#### リファクタリング - リネーム

リファクタリングのリネーム機能を使うことで、CSSのクラス名やJSの変数名や関数名、その他の名前の変更が一括でできます。複数ファイルをまたいでいても問題ありません。

-   Windows： Shift + F6 キー
-   macOS： Shift + F6 キー
-   （日本語の場合）右クリックメニューから［リファクタリング］→［名前の変更…］
-   （英語の場合）右クリックメニューから［Refactor］→［Rename…］

#### 変数を自動作成

JavaScriptの`var`や`=`を自分で入力せずにショートカットで変数を作成できます。

-   Windows： Ctrl + Alt + Vキー
-   macOS： Command + Option + Vキー

![WebStormの変数の作成](https://ics.media/entry/11642/images/160404_webstorm_js_generatevariable.gif)

#### ローカルサーバーでの実行

JavaScriptでの開発で、ブラウザーによってはローカルファイルへのアクセスが禁止されているため、表示できないことがあります。そういった際には「ローカルサーバー」を立てて実行するのが一般的です。

WebStormではローカルサーバーを手軽に使えます。HTMLファイルを選択して、右上に表示されるブラウザーのアイコンをクリックすると`http://localhost:63342/{ルートのフォルダー名}/{HTMLファイル名}`というURLで開かれます。

![WebStormでローカルサーバーを起動する方法](https://ics.media/entry/11642/images/160404_webstorm_js_localserver.png)

#### Chromeとデバッガーの連携

Chromeのデベロッパーツールを使わずに、WebStormから直接デバッグが可能です。WebStormからデバッグできることで、コードと実行の結果が結びつきやすくなり、デバッグがよりしやすくなります。拡張機能をインストールすることなく、利用可能です。

Chromeとのデバッガー連携の手順は次になります。

1.  メニューから［Run］→［Debug ‘{HTMLのファイル名}’］を選択する

![WebStormのデバッガー](https://ics.media/entry/11642/images/160404_webstorm_js_debugger.gif)

### ウェブ制作ならWebStormを使おう！

WebStormは日本語化されていないため不便だと思うこともありますが、それ以上にウェブ制作に便利な機能がそろっているため使用するメリットが大きいです。WebStorm自体の開発スピードがとても早く、TypeScriptやReact(JSX)、Vue.jsなどライブラリー独自記法への対応が早いため、モダンなコーディングを取り入れやすいです。有償のツールですが一定期間は無料で試せるので、まずは気軽に試してみてはいかがでしょうか？

本記事は初心者向けの内容でしたが、続編記事「[ウェブ制作にはWebStormがお勧め！ 使いこなせば操作が爆速になる機能のまとめ](https://ics.media/entry/16760/)」ではJavaScript開発に役立つ機能を紹介しています。ぜひ続編記事もあわせてご覧ください。

※ 本記事の機能はWebStorm 2016.1、**Windows 10**および**macOS El Capitan**にて記載したものですが、WebStorm 2023.1.2でも同様に動作することを確認しています。