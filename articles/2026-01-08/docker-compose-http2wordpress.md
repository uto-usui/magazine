---
title: "Docker Composeで複数コンテナの管理を簡単に！ HTTP/2に対応したWordPress環境の構築方法"
source: "https://ics.media/entry/15758/"
publishedDate: "2017-06-28"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2017年6月28日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

Docker（ドッカー）とはシンプルで軽量なコンテナー型の仮想化環境です。ウェブ制作者にとっては手軽にサーバー環境を構築できるため注目を集めています。また、「[Docker CE For Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)」と「[Docker CE For Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)」を利用することで、Linux上だけでなく、Windows・macOSでも環境の違いを意識することなく手軽にDockerを導入できることも魅力の1つです。

本連載ではDockerを活用してウェブサーバーなどの環境を構築する手順について解説しています。

前回の記事「[HTTP/2に対応したウェブサーバーを簡単に構築！ Dockerfileでオリジナルの環境を構築する手順について](https://ics.media/entry/15266/)」では、Dockerfileを作成しオリジナルの環境を構築する手順について紹介しました。

本記事では、前回作成したHTTP/2に対応したWebサーバーのコンテナーに、データベースや言語のコンテナーを組み合わせて、1つのサービスを構築していく手順について紹介します。

※後述のサンプルデータ内に、[前回の記事](https://ics.media/entry/15266/)で作成したDockerfileが含まれています。前回記事の手順を行っていない方は、サンプルデータを利用ください。

[![](https://ics.media/entry/15758/images/170628_docker_headline.png)](https://ics.media/entry/15758/images/170628_docker_headline.png)

▲本記事のサンプルのイメージ。Docker Composeを使ってHTTP/2に対応したWordPress環境を構築します

### 完成イメージ　〜HTTP/2に対応したWordPress環境〜

[![](https://ics.media/entry/15758/images/170616_docker_flow.png)](https://ics.media/entry/15758/images/170616_docker_flow.png)

[WordPress](https://ja.wordpress.org/)が動作する環境を整えるため、前回作成したHTTP/2に対応したたウェブサーバー(nginx)に、PHPのコンテナーとデータベース（MySQL）のコンテナーを組み合わせます。WordPressのデータは他のコンテナーに依存しないよう、データボリュームコンテナーとして別のコンテナーを用意します。

1つのコンテナーでまとめて動作させることも可能ですが、**ミドルウェアごとにコンテナーを分け依存関係をなくすことで、PHPやMySQLなどミドルウェアのアップデートを行う際に他のミドルウェアに影響を与えないため、**再ビルドの必要もなく容易に対応できます。

### Docker Composeは複数コンテナーを一元管理できるツール

[Docker Compose](https://docs.docker.com/compose/)とは、複数のDockerコンテナーを組み合わせたサービスを構築する際に、YAML形式のファイルにサービスの構成を定義することで、一元管理できるツールです。従来の方法では、サービスに必要なコンテナーを個別に立ち上げ、コンテナー同士を関連付けをしていく必要があるため、起動順序にも気をつけなければならずとても面倒でした。

Docker Composeを使用すれば、事前にYAMLにサービスの構成を定義しておくことで、これらの事を意識することなくコマンドを1つ実行するだけで環境を構築できます。

### Docker Composeを使ってサービスを立ち上げる

それでは、Docker Composeでサービスを立ち上げるために必要なファイルを次のディレクトリー構成で準備します。サンプルコードはGitHubにアップしてありますので、そのまま利用していただいても問題ありません。

[![](https://ics.media/entry/15758/images/170616_docker_directory.png)](https://ics.media/entry/15758/images/170616_docker_directory.png)

-   [サンプルコードを確認する](https://github.com/ics-creative/170626_docker-compose)

サンプルコードは次の環境で動作することを確認しています。

-   macOS Sierra 10.12.5
-   Docker Community Edition for Mac : Version 17.03.1-ce-mac12

#### docker-compose.ymlの作成

まずは、`docker-compose.yml`という名前のファイルを作成し、次の通りYAML形式でサービスの構成を定義します。YAMLとはインデントを使ってデータの階層構造を表すフォーマットです。

※本記事でversion2の形式で記述します。

```
version: "2"
services:
  web:
    build: ./web
    ports:
      - "80:80"
      - "443:443"
    volumes_from:
      - app
    volumes:
      - ./web/nginx.conf:/etc/nginx/nginx.conf
  php:
    build: ./php
    ports:
      - "9000:9000"
    volumes_from:
      - app
    depends_on:
      - db
  app:
    build: ./app
    volumes:
      - /usr/local/nginx/html
  db:
    image: mysql:5.7.18
    env_file: .env
    ports:
      - "3306:3306"
    volumes:
      - ./db-data:/var/lib/mysql
volumes:
    db-data:
```

前述の通り、ウェブサーバー（web）、PHP（php）、データベース（db）、データボリュームコンテナー（app）の4つのコンテナーを作成し、それぞれのコンテナーを組み合わせ1つのサービスとして構築します。

設定ファイル内では主に次のオプション設定が使用されています。

オプション設定

概要

image

コンテナーを実行時の元となるイメージを指定します。

build

`Dockerfile`が格納されているディレクトリのパスを指定します。

ports

公開するポートを指定します。`ホスト側：コンテナ側`の形式で指定することで、ホストマシン側のポートとコンテナー側のポートをマッピングします。

volumes

`ホスト側：コンテナ側`の形式で指定することで、ホストマシン側の任意のディレクトリーまたはファイルをコンテナー内にマウントします。

volumes\_from

指定した他のサービスやコンテナー上のボリュームをマウントします。

※本オプションはversion3では廃止されます。同様の仕組みを実現する場合は[プラグイン](https://github.com/CWSpear/local-persist)を使用する必要があります。

depends\_on

サービス間の依存関係を指定します。依存関係のある順番にしたがってサービスを起動します。

env\_file

環境変数を外部ファイルを参照し追加します。

#### ウェブサーバーのコンテナーを作成

```
# docker-compose.ymlのwebコンテナ部分を抜粋
web:
  build: ./web
  ports:
    - "80:80"
    - "443:443"
  volumes_from:
    - app
  volumes:
    - ./web/nginx.conf:/etc/nginx/nginx.conf
```

ウェブサーバーは前回の記事で作成した`Dockerfile`を利用します。`web`という名前のフォルダーに`Dockerfile`と`nginx.conf`を格納し、`Dockerfile`を格納したフォルダーのパスを`build`で指定してください。ただし、ウェブサーバーの設定ファイル（nginx.conf）は外部化しておきたいため、`volumes`で`web`フォルダーに格納した`nginx.conf`をコンテナー内（`/etc/nginx/nginx.conf`）にマウントします。

`nginx.conf`には、PHPへのリクエストをPHPコンテナーへプロキシするように設定を記述します。次の通り、**PHPコンテナーのIPアドレスを記載する必要はなく、`docker-compose.yml`に定義したサービス名を指定するだけで接続できます。**

```
# nginx.confの一部をPHPへのリクエストに関する設定部分を抜粋
location ~ \.php$ {
  fastcgi_pass   php:9000;
  fastcgi_index  index.php;
  fastcgi_split_path_info ^(.+\.php)(/.*)$;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  include        fastcgi_params;
}
```

#### PHPのコンテナーを作成

```
# docker-compose.ymlのphpコンテナ部分を抜粋
  php:
    build: ./php
    ports:
      - "9000:9000"
    volumes_from:
      - app
    depends_on:
      - db
```

次に、PHPのコンテナーを作成します。配布されているPHPの公式イメージをそのまま利用したいところですが、**最小限の構成でコンパイルされているため、そのままではMySQLと連携させることができません。**`Dockerfile`を作成し、MySQLと連携できるよう公式イメージをカスタマイズします。

次の内容で`Dockerfile`を作成し、`php`フォルダーに格納してください。`php:7.0-fpm`の公式イメージには`docker-php-ext-install`というスクリプトが用意されており、引数に指定したエクステンションをインストールしPHPをリコンパイルしてくれます。

```
FROM php:7.0-fpm
RUN docker-php-ext-install pdo_mysql mysqli
```

#### データベースのコンテナーを作成

```
# docker-compose.ymlのdbコンテナ部分を抜粋
  db:
    image: mysql:5.7.18
    env_file: .env
    ports:
      - "3306:3306"
    volumes:
      - ./db-data:/var/lib/mysql
```

配布されている`mysql:5.7.18`の公式イメージを利用します。コンテナーが破棄されてもデータが残るよう、`volumes`でホストマシンのディレクトリー（`./db-data`）とdbコンテナーのデータ領域（`/var/lib/mysql`）をマウントしデータの永続化を行います。

MySQLへ接続するためのパスワードは、`docker-compose.yml`に依存しないよう、外部ファイル（`.env`）に定義しておきます。

#### データボリュームコンテナーを作成

```
# docker-compose.ymlのappコンテナ部分を抜粋
  app:
    build: ./app
    volumes:
      - /usr/local/nginx/html
```

**複数のコンテナー間で共有したい永続的なデータを扱う場合、データボリュームコンテナーと呼ばれるコンテナーを作成し、各コンテナーにマウントして利用することが推奨されています。**

次の内容で`Dockerfile`を作成し、`app`フォルダーに格納してください。appコンテナーでは、WordPressの最新データを取得しnginxのドキュメントルートに配置し、所有者権限の変更を行います。

```
FROM debian:jessie

# 必要なツールをインストールする
RUN apt-get update && apt-get -y install wget

# 最新版のWordPressをダウンロードしドキュメントルートに配置、所有者の変更を行う
RUN cd /tmp/ && wget https://ja.wordpress.org/latest-ja.tar.gz && tar -xzvf latest-ja.tar.gz \
&& cd wordpress && mkdir -p /usr/local/nginx/html/ && mv * /usr/local/nginx/html/. \
&& chown -R www-data:www-data /usr/local/nginx/html
```

以上で、設定ファイルの作成は完了です。

#### サービスを起動する

それでは起動コマンドを実行しサービス起動します。Terminalを起動し、`docker-compose.yml`が配置されているフォルダーへ移動し、次のコマンドを実行してください。

```
docker-compose up -d
```

`-d`オプションは、デタッチドモードとしてバックグラウンドでコンテナーを動作させることができるオプションです。初回実行時はイメージファイルの取得などもあるため1〜2分程時間がかかりますが、エラーが発生せず、以下の内容が出力されれば起動完了です。

```
Creating network "xxxxxxx_default" with the default driver
Creating xxxxxxx_app_1
Creating xxxxxxx_db_1
Creating xxxxxxx_web_1
Creating xxxxxxx_php_1
```

起動完了後、`https://localhost/`からWordPressのインストール画面が表示されることが確認できます。自己証明書を使用しているため、アクセス時に証明書のエラーが表示される場合は、詳細情報を表示し、「localhostにアクセスする（安全ではありません）」のリンクからアクセスしてください。

[![](https://ics.media/entry/15758/images/170616_docker_wp-setup.png)](https://ics.media/entry/15758/images/170616_docker_wp-setup.png)

また、本記事の例では、WordPressのデータはデータボリュームコンテナーに格納していますが、次のようにホストマシンのディレクトリーをデータボリュームコンテナー内にマウントすることで、WordPressのテーマ開発やプラグインの開発も可能です。

```
# docker-compose.ymlのappコンテナにホストマシンのディレクトリーをテーマディレクトリーにマウントする場合の例
  app:
    build: ./app
    volumes:
      - /usr/local/nginx/html
      - ./www-data/icsmedia:/usr/local/nginx/html/wp-content/themes/icsmedia
```

[![](https://ics.media/entry/15758/images/170616_docker_icsmedia.png)](https://ics.media/entry/15758/images/170616_docker_icsmedia.png)

### おわりに

Docker Composeを使用することで、コンテナーごとの起動順序を意識すること無く、容易にサービスを立ち上げられることを確認いただけたと思います。本記事では、HTTP/2に対応したWordPress環境の構築手順を紹介しましたが、`docker-compose.yml`を変更するだけで、色々なコンテナーを組み合わせた環境を簡単に作成できます。

本記事を参考に是非プロジェクトにあわせたオリジナルの環境構築にチャレンジしてみてください。