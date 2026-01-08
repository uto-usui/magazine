---
title: "JavaScriptのプログラミングはこれだけ効率化できる！ 使用歴5年目のエンジニアが送るWebStormの厳選神業集"
source: "https://ics.media/entry/16760/"
publishedDate: "2017-12-01"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

JavaScript（ES2015+）、TypeScriptの需要は高まる一方ですが、プログラミングの効率化をどれくらい意識していますか？ **プログラミングが効率化されれば、作業時間の短縮、ケアレスミスの軽減、プロダクトの品質の向上、そしてストレスの軽減に繋がります**。

筆者が5年間使用している「[WebStorm（ウェブストーム）](https://www.jetbrains.com/webstorm/)」は、**JavaScriptのプログラミングをする上での面倒な処理をほとんど自動化するための機能が揃っていて、ロジックの検討や表現の作り込みに時間を割けるようになります**。

本記事では、多くの機能の中からとくに便利だと感じるものをピックアップして紹介します。WebStormを使ったことがない方も、「この作業はツールで自動化できるのか」という知識を得て、自身のツールでのプログラミング効率化に役立てていただければ幸いです。

### for文の自動生成

まずは簡単な機能から。JavaScriptのコーディング中に頻出する`for..in`や`for..of`文は、「[Live Templates](https://www.jetbrains.com/resharper/features/code_templates.html)」機能を使えば少量のコードで出力可能です。

![](https://ics.media/entry/16760/images/171118_webstorm_for.gif)

macOS、Windows共に次のショートカットキーを用います。

-   `for ... in` :「itar」と入力後、tabキー
-   `for ... of` :「iter」と入力後、tabキー

また、出力するコードをカスタマイズしたり、オリジナルのテンプレートの作成も可能です。

### モジュールの自動importと整理

ES Moduleでは`import()`を使ってモジュールをimportしますが、わざわざ長い構文を書くのは面倒です。

「[Creating Imports](https://www.jetbrains.com/help/webstorm/creating-imports.html)」や「[Auto Import](https://www.jetbrains.com/help/webstorm/auto-import.html)」機能を使えば、自動でモジュールがimportされます。TypeScriptやBabelでモジュールを扱う際も問題なく動作します。

不要になったモジュールはショートカットで一括削除できます（[Optimizing Imports](https://www.jetbrains.com/help/webstorm/optimizing-imports.html)）。

Optimizing Imports

-   macOS: control + alt + Oキー
-   Windows: Ctrl + Alt + Oキー

また、ペースト時にモジュールを自動でimportする機能もあります。

### メソッドの切り出し

選択範囲をメソッドとして切り出す機能です。処理の増大とともにネストが増えたコードも、「[Extract Method Dialog](https://www.jetbrains.com/help/webstorm/extract-method-dialog.html)」を使えば瞬時にメソッドとして切り出せます。引数は自動で補完されるため、手動で記述する必要はありません。

-   macOS: 範囲を選択後、command + alt + Mキー
-   Windows: 範囲選択後、Ctrl + Alt + Mキー

### getter/setterの自動生成

手動で書くと手間な`getter` / `setter`を自動生成する機能です。

![](https://ics.media/entry/16760/images/171118_-gettersetter.gif)

-   macOS: command + Nキー
-   Windows: Alt + Insertキー

### 変数や関数を前後で使っている箇所への移動

処理が複雑なJavaScriptファイルで重宝する機能。変数や関数を前後で使っている箇所の移動が可能です。

次の箇所へ移動

-   macOS: command + Gキー
-   Windows: F3キー

前の箇所へ移動

-   macOS: command + shift + Gキー
-   Windows: Shift + F3キー

### パラメーターの種類や型を素早く調べる

コーディング中、メソッドのパラメーターの種類や型を素早く調べる「[Method Parameter Information](https://www.jetbrains.com/help/webstorm/viewing-method-parameter-information.html)」という機能です。

-   macOS: command + Pキー
-   Windows: Ctrl + Pキー

### 構文の逐次チェック

WebStormでは[JSLint](https://www.jslint.com/)や[TSLint](https://palantir.github.io/tslint/)による構文の逐次チェックが可能。Lintに沿っていないコードを素早く発見できます。

![](https://ics.media/entry/16760/images/171118_webstorm_lint.png)

ESLintであれば、次のように設定します（TSLintもほぼ同じ手順です）。

(1)［Preferences］→［Languages and Frameworks］→［JavaScript］→［Code Quality Tools］→［ESLint］を開く  
(2)［Enable］にチェック  
(3) ESlintのパス指定（もし存在しなければコマンドラインより`npm i -D eslint`を実行してインストールしてください）  
(4)［Automatic search］にチェック

![](https://ics.media/entry/16760/images/171118_webstorm_eslint.png)

設定ファイルを`.eslintrc`ファイルとして作成し、プロジェクト直下に配置すれば、ESLintが有効になります。設定ファイルは「[ESLint Demo - ESLint](https://eslint.org/play/)」より作成すると便利です。

-   [WebStormでのESLint設定方法](https://www.jetbrains.com/help/webstorm/eslint.html)
-   [WebStormでのTSLintの設定方法](https://www.jetbrains.com/help/webstorm/tslint.html)

### 別言語のコード補完

文字列として埋め込んだコードに対してコード補完やシンタックスハイライトを有効にする「[Language Injections](https://www.jetbrains.com/help/webstorm/using-language-injections.html)」という機能です。コード内で次のように記述します。

```
// language=言語名
```

たとえば、TypeScriptに埋め込んだSassのコードに対してコード補完やシンタックスハイライトが有効です。CSS in JSのテンプレート文字列に対するシンタックスハイライトや、WebGLでのGLSL（シェーダー言語）のハイライトにも有効です（要プラグイン）。

### GitHub上のパーマリンクを作成

GitHubを用いて複数メンバーで開発している時、「この箇所を修正してください」「この箇所を確認していただけますか？」とコードをシェアしたいケースは多いもの。WebStormを使えば、GitHub上で操作することなく該当箇所のパーマリンクを作成できます。

![](https://ics.media/entry/16760/images/171118_webstorm_github.gif)

こちらの機能は、初期設定でショートカットが割り当てられていませんので、次のように設定します。

(1) ［Preferences］→［Keymap］を開く  
(2) 検索ボックスで［open on GitHub］と入力  
(3) ヒットした設定項目をダブルクリック  
(4) ［Add Keyboard Shortcut］より、任意のショートカットを設定

![](https://ics.media/entry/16760/images/171118_webstorm_github_setting.png)

### UI上からnpm scriptsやGulpタスクを実行

昨今のウェブ開発ではnpm script、webpack、Gulpなどを使ったタスク管理が必須。コマンドラインを触ることなく、WebStorm上から各種タスクを実行可能。npmもYarnも使えます（参考「[npm and Yarn - Help | WebStorm](https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html)」）。

### TypeScriptをプログラミングする時に便利な機能

JavaScriptのスーパーセットである[TypeScript](https://www.typescriptlang.org/)をプログラミングする際にもWebStormは便利。いくつかピックアップして紹介します。

#### クラスメソッドの引数をメンバー変数として展開

クラスメソッドの引数をメンバー変数として展開する際に使えるテクニックです。引数にカーソルを押した状態でalt + Enterキー(macOS / Windows)を押すと、引数がローカル変数に展開されます。続けてEnterキーを押すことで、メンバー変数として展開されます。

#### インターフェイスやType Aliasの自動生成

オブジェクト型リテラルから[インターフェイス](https://www.typescriptlang.org/docs/handbook/2/objects.html)やType Aliasを自動生成する機能。オブジェクト型リテラルで手早く定義していた型を、後ほどインターフェイスに変換したいときに重宝します。

![](https://ics.media/entry/16760/images/171118_webstorm_interface.gif)

-   macOS: control + Tキー →［8. Interface］
-   Windows: Ctrl + Shift + Alt + Tキー → 8. Interface］

#### アクセス修飾子の変更

プロジェクトの開発を進めていると、`private`なメンバーを`public`に変更したり、その逆を行いたいなど、アクセス修飾子を切り替えたいケースがあります。わざわざコードを打ち替える必要はなく、ショートカット1つでアクセス修飾子を切り替えられる機能です。

![](https://ics.media/entry/16760/images/171118_webstorm_access.gif)

-   macOS: alt + Enterキー → ［Make ‘private’］
-   Windows: Alt + Enterキー → ［Make ‘private’］

#### メソッドの引数名を表示

メソッドが大量の引数を受け取る時、「何番目の引数が何なのか？」がわかりにくくなります。「[Parameter hints](https://blog.jetbrains.com/webstorm/2017/05/webstorm-2017-2-eap/#param-hints)」機能をONにすると、メソッド使用時に引数名が表示されるため、引数の性質がひと目でわかります。

![](https://ics.media/entry/16760/images/171118_webstorm_parameter_hint.png)

設定を有効にするには、［Preferences］→［Editor］→［General］→［Code Completion］より、［Show parameter name hints.］をONにします。

### WebStormでJavaScriptプログラミングは変わる

筆者は主にTypeScriptやAngularのプログラミングのためにWebStormを数年使用してきましたが、**ウェブテクノロジーの変化や進化に追従して次々にアップデートされていて、年々プログラミング作業が便利になっていくのを感じています**。有償ではあるものの、業務が効率化されるため投資以上の結果を得られるツールです。

試用版として30日間無料で使えるので、まずは試してみてその便利さを体験してみてはいかがでしょうか？

-   [WebStorm: The Smartest JavaScript IDE by JetBrains](https://www.jetbrains.com/webstorm/)

また、基本的な使い方については記事「[ウェブ制作にはWebStormがお勧め！ 使いこなせば操作が爆速になる機能のまとめ](https://ics.media/entry/11642/)」でも解説していますので、あわせて参照ください。