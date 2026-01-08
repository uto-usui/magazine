---
title: "SourceTreeの使い方 - GitHubとの連携方法"
source: "https://ics.media/entry/15195/"
publishedDate: "2017-03-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

**ソースコードのバージョン管理にGitを使うのはもはや当たり前**・・・というのは言い過ぎではないはず。プログラマーやコーダーだけでなく、デザイナーやプランナーにもGitに興味を思っている方が増えているのではないでしょうか。

[SourceTreeソースツリー](https://ja.atlassian.com/software/sourcetree)はGitの操作ができる無料のデスクトップアプリケーションです。WindowsとmacOSのどちらでも使用でき日本語に対応しています。本記事では**SourceTreeでGitHubにファイルをアップロードするまでの流れを紹介します**。

※ 本記事はSourceTree 3を対象に解説しています

### GitとGitHub、SourceTreeとは？

**「Git」は複数人でプログラムのソースコードなどの変更履歴を記録・追跡するためのバージョン管理システム**です。バージョン管理を行うとファイルを簡単に昔の状態に戻すことができるため、どのタイミングでバグが発生したかといった調査を行いやすいメリットがあります。また特定のバージョンから複数のバージョンに分岐して、あとからまとめるといったことが可能です。

![](https://ics.media/entry/15195/images/170228_sourcetree_versions.png)

#### Gitの考え方

Gitでは「リポジトリー」という場所にデータを保存しています。リポジトリーは各開発者のマシンにある「ローカルリポジトリー」とGitHubなどのサーバーに配置されている「リモートリポジトリー」の2種類があります。ローカルリポジトリーは開発者の作業用のリポジトリーで、リモートリポジトリーは複数人が共有するリポジトリーです。

開発者はまずはローカルリポジトリーを編集し、リモートリポジトリーに「プッシュ」しデータを反映します。リモートリポジトリーに上がったファイルは「プル」することで、ローカルリポジトリーに反映できます。

#### GitHubはGitのウェブサービス

**GitのリモートリポジトリーはWebサービスを利用して管理するのが簡単**です。Gitを扱うWebサービスには「[GitHub](https://github.com/)」、「[GitLab](https://gitlab.com/)」、「[Bitbucket](https://bitbucket.org/)」などがありますが、一番有名なのがGitHubです。

![](https://ics.media/entry/15195/images/170228_sourcetree_git.png)

### SourceTreeのインストール

SouceTreeは[Atlassian社](https://ja.atlassian.com/)が開発するソフトウェアです。[SourceTree公式サイト](https://ja.atlassian.com/software/sourcetree)からインストーラーをダウンロードしましょう。

インストーラーを実行するとAtlassianのアカウントへのログインが求められるので、アカウントを持っていない場合は作成してください。ログインに成功するとインストールの次の手順へ進みます。インストールの途中でGitHubやBitbucketの設定画面が表示されますが、インストール後にも設定できるのでスキップして問題ありません。

![](https://ics.media/entry/15195/images/170228_sourcetree_install01.png)

### SourceTreeでGitHubのリポジトリーをクローン

リモートリポジトリーを手元のマシンへローカルリポジトリーとしてコピーするには「クローン」を行います。クローンする方法にはSSHとHTTPSの2つがありますが、今回はセットアップが簡単なHTTPSでのクローンについて紹介します（SSHの場合は認証のための鍵ファイルを自分で作成する必要がありますが、HTTPSであればその必要はありません）。

まずは、任意のGitHubのプロジェクトページに行きます。\[Clone or download\]ボタンを押し、リポジトリーのURLを取得します。表示されたボックスのタイトルが\[Clone with HTTPS\]となっていなければ、\[Use HTTPS\]ボタンを押し、HTTPSでのダウンロードに切り替えます。コピーボタンを押すと、クリップボードにリポジトリーのURLがコピーされます。

![](https://ics.media/entry/15195/images/200310_sourcetree_github_clone.png)

SourceTreeでクローンする方法ですが、WindowsとmacOSで若干手順が変わります。

-   Windowsであれば、左上にある\[新規/クローンを作成する\]ボタンを押します。
    
    ![](https://ics.media/entry/15195/images/170228_sourcetree_clone.png)
    
-   macOS  
    macOSであれば、\[+新規リポジトリ\]→\[URLからクローン\]メニューを選択します。![](https://ics.media/entry/15195/images/200310_sourcetree_clone_mac.png)
    

\[ソース URL\]（Windowsなら\[元のパス/URL:\]）に先ほどGitHubからコピーしたリポジトリーのURLを、\[保存先のパス：\]にローカルリポジトリーを管理するパスを指定します。記入が終わったら\[クローン\]ボタンを押して、クローンを行います。

![](https://ics.media/entry/15195/images/200310_sourcetree_clone2_mac.png)

#### SourceTreeからGitHubにファイルの変更を反映する

手元のファイルを編集したあと、リモートリポジトリーに変更を反映するには、ファイルの\[ステージング\]、そして\[コミット\]と\[プッシュ\]を行います。

![](https://ics.media/entry/15195/images/170228_sourcetree_staging.png)

コミットを行うには、\[コミット\]ボタンを押し、コミットするファイルを選択する画面に移動します。

![](https://ics.media/entry/15195/images/200310_sourcetree_commit.png)

上図のチェックマークを押すと、ファイルがインデックスに追加されます。その後、コミットメッセージを記入し、\[コミット\]ボタンを押すと、ファイルをコミットができます。

![](https://ics.media/entry/15195/images/200310_sourcetree_push.png)

ファイルをプッシュするときは、\[プッシュ\]ボタンを押します。

![](https://ics.media/entry/15195/images/200310_sourcetree_push2.png)

はじめてプッシュを行うときは、GitHubへのログインを求められるので、ログインを行ってください。

#### プッシュ後のGitHubでのコミット内容の表示のされ方

プッシュに成功すると、GitHubのサイト上にもコミット内容が表示されます。GitHubのリポジトリーへブラウザでアクセスしてみてください。最新のコミットはリポジトリートップに表示されており、詳細のリンクからファイルの修正内容を確認できます。

▼ \[リポジトリートップ\]ではファイル一覧が表示されます。ここで、最新のコミット内容が確認できます。

![](https://ics.media/entry/15195/images/200310_sourcetree_pushedgithub1.png)

▼ \[コミット履歴\]画面では、今までコミットプッシュしたログが見れます。ここから、コミット詳細画面へ行けます。

![](https://ics.media/entry/15195/images/200310_sourcetree_pushedgithub2.png)

▼ \[コミット詳細\]画面からファイルの追加・修正内容が見れます。追加された行は薄緑色、削除された行は薄桃色で表示されます。

![](https://ics.media/entry/15195/images/200310_sourcetree_pushedgithub3.png)

### SourceTreeを使って簡単にGitHubと連携をしよう！

SourceTreeを使うと難しいコマンド入力をすることなく、簡単にGitの操作が行えます。今回は初心者向けとしてGitHubへプッシュするまでの手順を説明しました。ICS MEDIAではさらに使いこなす方法を続編記事でも紹介していますので、ぜひご覧ください。

-   [初心者が習得するべき基本操作(diff, stash, tag, revert, cherry-pick)](https://ics.media/entry/1365/)
-   [GitHubでのプルリクエスト活用方法まとめ](https://ics.media/entry/14449/)