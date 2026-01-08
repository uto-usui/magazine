---
title: "JenkinsでCI環境構築チュートリアル （Windows編）"
source: "https://ics.media/entry/2410/"
publishedDate: "2014-09-26"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

CI環境のサンプルとして前回、記事「[作業の効率化のためのCI環境構築](https://ics.media/entry/1852/)」を紹介しました。この記事を公開したところ、環境構築の仕方を知りたいとの要望を多数の読者から頂きましたので、複数回の記事に分けて説明したいと思います。

Jenkinsを利用されている方は、LinuxやmacOSで利用されている方が多いと思いますが、本記事ではサーバが苦手な人でも導入できるよう、**「Windows環境を使ったCI環境構築」**をテーマとして手順を説明します。

### 1。ソフトウェアのインストール

環境構築に必要なソフトウェアをインストールしましょう。必要となるソフトウェアは以下になります。

-   Jenkins 2.7.2（[http://jenkins-ci.org/](http://jenkins-ci.org/)）
-   git for windows 2.9.3（[http://msysgit.github.io/](http://msysgit.github.io/)）
-   WinSCP 5.9.1（[http://winscp.net/eng/download.php](http://winscp.net/eng/download.php)）

#### Jenkinsのインストール

Jenkinsには2つのバージョン「LTS Release」（ロング・タイム・サポート版）と「Weekly Release」（週間リリース版）があります。本記事では前者のバージョン2.7.2での手順を解説します。LTS版は長期サポートを目的として提供されているため、安心して導入できます。

![Jenkins ダウンロード](https://ics.media/entry/2410/images/jenkins-win-install-download.png)

Windows版のインストーラー「jenkins-2.7.2.zip」ファイルは[Jenkinsの公式サイト](https://jenkins.io/)から、上図のように「Windows」を選択してダウンロードします。インストーラーをダウロードしたら「jenkins.msi」ファイルをダブルクリックしてインストールしましょう。

![](https://ics.media/entry/2410/images/jenkins-win-installer.png)

インストール先は、デフォルトでは`C:Program Files (x86)Jenkins`等となっていますが、インストールディレクトリ内に作業フォルダーが作成されるため、`C:Jenkins`のようにCドライブ直下にJenkins用のフォルダーを設置し、そこにインストールすることをオススメします。

![](https://ics.media/entry/2410/images/jenkins-win-install-folder.png)

インストールが完了すると、以下のアドレスからJenkinsにアクセスできるようになります。

```
http://localhost:8080/
```

はじめてJenkinsを起動すると、パスワードの入力が求められます。パスワードはJenkinsをインストールしたフォルダー内にテキストファイルとして格納されています。

![](https://ics.media/entry/2410/images/jenkins-win-password-admin.png)

パスワードが記載された「initialAdminPassowrd」ファイルをテキストエディターで開き、上図の「Administrator password」欄に入力しましょう。

![](https://ics.media/entry/2410/images/jenkins-win-install-password-1.png)

プラグインのインストール画面に進みます。本記事ではデフォルトの「Install suggested plugins」を選択します。プラグインのインストールが自動的に始まりますので、完了するまで数分ほど待ちましょう。

![Jenkins プラグインのインストール](https://ics.media/entry/2410/images/jenkins-win-install-plugins.png)

プラグインの完了後に「Create First Admin User」画面になりますが、Jenkinsを利用するユーザーを作成します。

![Jenkinsのアカウント作成](https://ics.media/entry/2410/images/jenkins-win-create-accout.png)

これでJenkinsのインストールが完了です。

![](https://ics.media/entry/2410/images/jenkins-win-create-job.png)

#### git for windowsのインストール

「git for windows」は、Windows環境でgitを利用できるようにするためのソフトウェアです。

公式サイトよりダウンロードしたインストーラーを使ってインストールしていくのですが、「Adjusting your PATH environment」の画面では、必ず「**Use Git from the Windows Command Prompt**」に変更しましょう。ここを変更しないと、Jenkinsやコマンドプロンプト、PowerShellなどから`git`コマンドを利用することができません。

![git for windowsのインストール](https://ics.media/entry/2410/images/jenkins-win-install-git.png)

インストールが完了したら、「PowerShell」または「コマンドプロンプト」で以下のコマンドを実行して、正常にインストールが完了しているか確認します。バージョンが表示されればインストール成功です。

```
git --version
```

![Gitのバージョン表示](https://ics.media/entry/2410/images/jenkins-win-git-version.png)

#### WinSCPのインストール

WinSCPはサーバーへファイルをアップロードするためのソフトウェアで、ウェブ制作の現場ではよく利用されています。このソフトウェアは実は「コンソールモード」を備えており、コマンドラインからも利用できるのですが、このモードを使うことでJenkinsとの連携が可能になります。Windows標準のFTPコマンドでは細かい設定ができませんが、**WinSCPを使うことで複雑な設定もGUI上で簡単に行うことができるため**、本連載ではWinSCPを使ってデプロイ処理を作成します。

WinSCPもインストーラーを使ってインストールしていき、コマンドラインから利用するために、インストールフォルダー（Windows 10だと`C:\Program Files (x86)\WinSCP`）を環境変数に登録してください。環境変数を登録後、「PowerShell」または「コマンドプロンプト」で、以下のコマンドを実行し、正常にインストールされていることを確認します。

コマンドラインで次のコマンドを入力すると

```
winscp -h
```

次のような出力が得られます。

```
WinSCP, バージョン 5.9.1 (ビルド 6885)  
Copyright (c) 2000-2016 Martin Prikryl
```

### ジョブの作成

Jenkinsを使ってジョブを作成していきたいと思います。「ジョブ」とは、**Jenkinsで実行する一連の処理をまとめたもの**です。Jenkinsにジョブとして登録しておくことで、いつでも同じ処理を実行することができるようになります。

まず左側のメニューの「新規ジョブ作成」を選択し、新規ジョブの作成画面を開きます。

![JenkinsでのJob作成](https://ics.media/entry/2410/images/jenkins-win-create-job.png)

ジョブ名を入力し、「フリースタイル・プロジェクトのビルド」を選択します。ジョブ名は日本語でも登録することは可能ですが、入力された名前で作業ディレクトリが作成されるため、日本語は使わない方が良いでしょう。

![Jenkinsのフリースタイル・プロジェクトのビルド](https://ics.media/entry/2410/images/jenkins-win-run-job.png)

次の画面では、実行する一連の処理を登録します。まずはJenkinsが正常に動作するかの確認をしたいため、「HelloWorld」と表示する簡単なジョブを作成していきましょう。「ビルド手順の追加」から「Windowsバッチコマンドの実行」を選択し、コマンド欄に`echo 'HelloWorld'`と入力し、ジョブを保存してください。

![JenkinsのJob作成の詳細](https://ics.media/entry/2410/images/jenkins-win-create-job-detail.png)

ジョブの保存後、左側メニューから［ビルド実行］を選択することで、登録したジョブを実行できます。実行するとビルド履歴の欄に実行結果が表示されます。青丸が表示されていれば成功です！ 赤丸が表示されている場合は、どこか設定が誤っている可能性があります。

![JenkinsのJob履歴](https://ics.media/entry/2410/images/jenkins-win-history.png)

ビルド履歴から実行結果を確認してみましょう。実行したビルドの履歴を選択し、左側メニューの「Console Output」から実行結果を確認できます。コンソール出力に「HelloWorld」が表示されているはずです。

![Jenkinsのコンソール出力](https://ics.media/entry/2410/images/jenkins-win-console.png)

### おわりに

今回は簡単な「HelloWorld」を表示するまでの手順を紹介しましたが、簡単な作業でCI環境の構築ができることがわかったと思います。次回は「[GitHubとの連携](https://ics.media/entry/2869/)」と題してJenkinsのプラグインを利用してGitと連携するジョブの作成方法を紹介します。