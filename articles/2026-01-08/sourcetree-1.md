---
title: "SourceTreeの使い方 | コミット間の差分ファイルの抽出 （カスタム操作を使う方法）"
source: "https://ics.media/entry/4475/"
publishedDate: "2015-01-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

今回はGitクライアントソフトの[SourceTree](https://www.atlassian.com/ja/software/sourcetree/overview)から\[カスタム操作\]という機能を利用して「**コミットの差分ファイルをzipファイルとして書き出す**」ことを行います。この処理は納品で前回のリリースとの差分のファイルが必要なときに使用すると便利です。

### カスタム操作のデモ動画

![カスタム操作の実行](https://ics.media/entry/4475/images/150113_customactions.gif)

カスタム操作としてバッチ・スクリプト・exeを登録すると、上図のようにメニューから実行できるようになります

### Gitをインストールする

※Gitをすでにインストールされている方はこの作業は不要です。SourceTreeの内蔵Gitを使用しているかたはgitコマンドが環境設定に登録されておらず、これから紹介するバッチが実行できない可能性があります。

インストールされているかチェックするためには、Windowsなら「コマンドプロンプト」、Macなら「ターミナル」上で下記コマンドを実行して確認します。

```
git --version
```

「git version 〇〇」と表示されたら問題ありません。もし「‘git’ は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません」等が表示されたら、[http://git-scm.com/](http://git-scm.com/) などからインストールすれば設定されるかと思います。

### バッチファイルの作成

適当なディレクトリに下記を記述したファイルを用意します。WindowsとmacOSだと同じバッチファイルで動くことが出来なかったので、別々で作成しています。

#### Windowsでの設定方法

export\_diff\_zip.bat

```
if "%2" EQU "" (
  set PARAM1=HEAD
  set PARAM2=%1
) else (
  set PARAM1=%1
  set PARAM2=%2
)

setlocal enabledelayedexpansion
set RET_DIR=
for /F "usebackq" %%i in (`git diff --name-only %PARAM1% %PARAM2%`) do (
  set RET_DIR=!RET_DIR! "%%i"
)

git archive --format=zip --prefix=archive/ %PARAM1% %RET_DIR% -o archive.zip
```

#### macOSでの設定方法

export\_diff\_zip.sh

```
#!/bin/sh
if [ "$2" = "" ]; then
    git archive --format=zip --prefix=archive/ HEAD `git diff --name-only HEAD $1` -o archive.zip
else
    git archive --format=zip --prefix=archive/ $1 `git diff --name-only $1 $2` -o archive.zip
fi
```

Macの場合ターミナルを開いて、作成したシェルスクリプトに実行権限を追加する必要があります。実行権限の付加が足りないと、「launch path not accessible」とエラーが発生します。

```
chmod +x export_diff_zip.sh
```

#### バッチの内容について

※バッチの内容について簡単に説明すると「git diff --name-only commitA commitB」でcommitAとcommitBのコミットで差分のあったファイルのリストを取得し、`git archive --format=zip --prefix=archive/ commitA commiAとcommitBの差分ファイル -o archive.zip`でcommitA時点のcommitAとcomitBの差分ファイルを`archive.zip`で書きだしています。引数が1つの場合はHEADと選択したコミットとの差分になります。

### バッチファイルを登録する

#### オプションウィンドウ

![カスタム操作](https://ics.media/entry/4475/images/1ae008546339f1b2df5dea6c50020e961.png)  
先ほど作成したバッチファイルをカスタム操作として登録します。

-   Windowsの場合メニューから「ツール」→「オプション」→「カスタム操作」タブ→「追加」ボタンをクリック
-   Macの場合メニューから「SourceTree」→「環境設定」→「カスタムアクション」タブ→「追加」ボタンをクリック

#### カスタム操作を編集ウィンドウ

![カスタム操作を編集](https://ics.media/entry/4475/images/d909f5e6bc61937afb928a06bad167431.png)

1.  「メニュー表示名」: メニューに表示したい名前を設定します。今回は「指定された差分をzipで書き出す」と指定します。
2.  「実行するスクリプト」: 実行するスクリプトファイルのパスを指定します。「1.バッチファイルの作成」で用意したバッチファイルを指定します。
3.  「パラメーター」: 実行するスクリプトに送る引数を決めます。今回は「$SHA」のみを使用するので「$SHA」を記入します。

上記3箇所の設定を記入したら、「OK」ボタンを押してカスタム操作の編集ウィンドウを閉じ、オプションウィンドウも「OK」ボタンを押して閉じます。

※スクリーンショットはWindows版（※2015年1月9日時点最新のSourceTree 1.6.12）です。

### カスタム操作を実行する

![ツリービュー](https://ics.media/entry/4475/images/247d1413a005fed1784f0e962a0e081f.png)

1.  1つコミットを左クリックで選択する
2.  Ctrl( MacはCommand )キーを押しながら左クリックでもう1箇所（計2箇所）コミットを選択する
3.  2箇所コミットを選択したまま右クリックをする
4.  出てくるメニュー一番下の「カスタム操作」から「指定された差分をzipで書き出す」を選ぶ

すると、archive.zipというファイルがリポジトリのルートディレクトリに配置されます。

### おわりに

カスタム操作を登録しておくとGUI上で簡単に差分zipファイルを作成できるようになったかと思います。ターミナル操作が不安な人には、オススメの機能なので知らない人がいたら是非ご紹介ください。また、複雑なコマンドを覚えておきたくない時にはオリジナルなカスタム操作を作ってみてはいかがでしょうか。私は今回紹介したカスタム操作以外に[今日のコミットログを表示する「日報」の表示](https://gist.github.com/ics-nohara/81edd8c8adbd8b15a12e)などを登録しています。