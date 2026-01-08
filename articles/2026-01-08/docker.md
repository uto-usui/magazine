---
title: "試して理解する話題の仮想化技術、ウェブ制作者のためのDocker入門"
source: "https://ics.media/entry/15009/"
publishedDate: "2017-02-23"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2017年2月23日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

[Docker](https://www.docker.com/)（ドッカー）とは、シンプルで軽量なコンテナー型の仮想化環境です。コンテナー技術の採用により、仮想化ソフトウェア（たとえば[VMware Player](http://www.vmware.com/jp/products/workstation.html)、[VirtualBox](https://www.virtualbox.org/)、[Paralles Desktop](http://www.parallels.com/jp/)等）と比べて起動も速く高速に動作します。

※コンテナー型の仮想化環境については、@ITの記事「[アプリ開発者もインフラ管理者も知っておきたいDockerの基礎知識](http://www.atmarkit.co.jp/ait/articles/1405/16/news032.html)」がわかりやすいでしょう

2016年7月に「[Docker For Windows](https://www.docker.com/products/docker#/windows)」と「[Docker For Mac](https://www.docker.com/products/docker#/mac)」が正式リリースされたことで、Windows・macOSでも環境の違いを意識することなくDockerを導入できるようになりました。

Dockerは、サーバーサイドエンジニアやインフラエンジニアだけでなく、Webのフロントエンドエンジニアにも非常に有用なツールです。本記事では、フロントエンドエンジニアが**Dockerを利用することで得られるメリットや基本的な使い方について**紹介します。

### Dockerとは軽量で使いやすい仮想化技術

Dockerでは、OSとアプリケーションがパッケージ化されたDockerイメージと呼ばれるファイルを使って、仮想環境を構築します。[DockerHub](https://hub.docker.com/)と呼ばれるサイトには10万以上のDockerイメージが提供されており、こちらを利用することでOSやミドルウェア、アプリケーションのインストールや初期設定などの手間のかかる作業を行う必要なく、すぐに動作する環境を手に入れることができます。

DockerHubには、WordPressやJenkins、nginxなどさまざまなイメージが準備されています。「official」と記載されているDocker社が公式に提供しているイメージの他、一般ユーザーが提供しているイメージも多数公開されています。

![](https://ics.media/entry/15009/images/170216_docker_dockerhub.png)  
▲ DockerHubのリポジトリー一覧

取得したイメージを起動するとコンテナー（仮想環境）が生成されます。コンテナーは複数起動できるため、Webサーバー、DB、CIツールなど複数のコンテナーを起動し連携することも可能です。また、取得したイメージをベースにカスタマイズした環境を再度イメージ化することもできます。

![](https://ics.media/entry/15009/images/170216_docker_figure.png)  
▲ Dockerの利用イメージ

### Dockerを利用することで得られるメリット

フロントエンドエンジニアにとっての大きなメリットは、Dockerイメージを共有することで、開発メンバー内で**同一の開発環境を簡単に構築できることです**。開発環境のDockerイメージまたはDockerfileと呼ばれる仮想環境をコード化したファイルを開発メンバーに共有することで、同一の開発環境を構築できます。そのため、新規に開発メンバーが参加した場合にも簡単に同一環境の構築ができますし、環境の差異がでないため「◯◯さんの環境でのみエラーが発生する…」というようなことも無くなります。

サーバーサイドエンジニアやインフラエンジニアによって開発環境が更新された場合でも、最新のDockerイメージを共有することで、常に最新の開発環境を利用できます。サーバーサイドエンジニアに環境構築や更新手順を教えてもらう必要もなくなるため、ムダなやり取りが無くなり効率的に開発が進められます。

また、複雑な環境でなければサーバーやインフラの知識があまり無くても、基本的なDockerの操作を覚えれば環境を構築できることもメリットとして挙げられます。

### Dockerで仮想化環境を構築

DockerはWindowsやmacOS、Linuxなど色々なOSに対応しています。[公式サイト](https://www.docker.com/products/overview)より該当OSのパッケージをダウンロードし、インストーラーにしたがってインストールを進めてください。

環境構築は[Kitematic](https://docs.docker.com/kitematic/userguide/)（カイトマティック）というツールを使用するとGUI操作で環境を構築できますが、本記事ではCUIのコマンドラインを利用して環境を構築します。

#### Webサーバーを構築する

それではDockerHubで公開されているnginxの公式イメージを使用してWebサーバーを構築してみます。次の動画は、実際にWebサーバーを構築する手順を撮影したものです。コマンドを1つ実行するだけで簡単にWebサーバーが構築できる様子が確認できます。

DockerHubの[各イメージのページ](https://hub.docker.com/_/nginx/)には使用方法が記載されています。こちらの仕様に沿って環境を構築します。

nginxのコンテナーを起動するため、コマンドラインから（Windowsではコマンドプロンプト、macOSではターミナル。appを立ち上げ）、次のコマンドを実行します。

```
$ docker run --name webserver -d -p 8090:80 -v /Users/xxxx/nginx/www:/usr/share/nginx/html nginx:latest
```

`/Users/xxxx/nginx/www`の部分は、ホスト（起動元のPC）の任意のディレクトリーパス（コンテンツが配置されているディレクトリー）を指定します。Windows環境をご利用の方は`C:¥Users¥xxxx¥nginx¥www`のようにドライブ名を含んだ絶対パスを指定します。

コマンドを実行後、`http://localhost:8090/` または`http://(ホストのIPアドレス):8090/`にアクセスするとWebサーバーが起動していることが確認できます。オプションで指定した`/Users/xxxx/nginx/www`のディレクトリーにindex.htmlなどを作成し、ブラウザーからアクセスしてみてください。

このコマンドでは次の通りオプションを設定しています。

```
$ docker run --name [コンテナ名] -d -p [ホストのポート]:[コンテナのポート] -v [ホストのディレクトリーパス]:[マウント先のパス] [イメージ名]
```

`docker run`はDockerイメージを元にコンテナーを生成するコマンドです。このコマンドでは`nginx`というDockerイメージの最新バージョン（`latest`）でコンテナーを生成しています。ローカルにイメージがない場合はDockerHubから自動的に取得してくれます。

`--name`オプションではコンテナーに任意の名前を指定できます。省略した場合はランダムで名前が指定されますが、複数コンテナーを立ち上げた場合に管理しづらくなるため、適当な名前を指定しておきます。

`-d`はデタッチドモードとしてバックグラウンドで動作させることができるオプションです。また`-p`オプションを指定することで、ホスト（起動元のPC）の8090ポートとコンテナーの80ポートの対応付けが行われ、コンテナーにポートフォワーディングでアクセスできるようになります。

`-v`オプションは、ホスト（起動元のPC）のディレクトリーをコンテナーにマウントします。この設定を行うことで`/Users/xxxx/nginx/www`のディレクトリーがWebサーバーのサイトルートになりますので、このディレクトリにコンテンツを格納すれば、デプロイをおこなわずとも最新のコンテンツがWebサーバーに反映されます。

また、起動したコンテナーは、次のコマンドを実行することで起動・停止が行えます。コンテナー名・コンテナーIDは`docker ps`コマンドで確認できます。

コンテナーを起動する

```
$ docker start [コンテナ名 or コンテナID]
```

コンテナーを停止する

```
$ docker stop [コンテナ名 or コンテナID]
```

コンテナーを削除する

```
$ docker rm [コンテナ名 or コンテナID]
```

起動中のコンテナー一覧を表示

```
$ docker ps
```

停止中のコンテナーも含めたすべてのコンテナー一覧を表示

```
$ docker ps -a
```

#### WordPressを構築する

次にWordPress環境を構築してみたいと思います。WordPressは記事の情報を保存するデーターベースが必要であるため、WordPressのコンテナーとは別にデータベース（MySQL）のコンテナーを起動し、コンテナー間で連携する必要があります。

まずはMySQLの公式のDockerイメージを使って、データベースのコンテナーを作成します。`docker run`コマンドでMySQLを起動します。`-e`オプションでは環境変数を指定できますので、`MYSQL_ROOT_PASSWORD`に任意のパスワードを設定し起動します。

```
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=hogehoge -d mysql
```

次にWordPressのコンテナーを作成します。こちらもWordPressの公式のDockerイメージが公開されているので、さきほどと同様にオプションを指定し起動します。ただし、WordPressのコンテナーとMySQLのコンテナーを連携させたいため、`--link [コンテナ名 or コンテナID]:[エイリアス名]`を忘れずに指定してください。

```
$ docker run --link mysql:mysql -d -p 8091:80 --name wordpress wordpress
```

コマンドを実行後`http://localhost:8091/`または`http://(ホストのIPアドレス):8091/`にアクセスするとWordPressが起動していることが確認できます。

### おわりに

簡単なコマンドを実行するだけで簡単に環境を構築できたと思います。本記事では基本的な利用方法のみの紹介でしたが、複数のコンテナーを利用する場合は[DockerCompose](https://docs.docker.com/compose/)というツールを使用することで、複雑な環境も管理しやすくなります。

まだDockerを利用したことのない方は、まずはWebサーバーの構築から試してみてはいかがでしょうか。次回の記事では、より実践的な環境構築の仕方をご紹介したいと思います。