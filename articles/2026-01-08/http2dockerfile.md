---
title: "HTTP/2に対応したウェブサーバーを簡単に構築！Dockerfileでオリジナルの環境を構築する手順について"
source: "https://ics.media/entry/15266/"
publishedDate: "2017-04-07"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

前回の記事「[試して理解する話題の仮想化技術、ウェブ制作者のためのDocker入門](https://ics.media/entry/15009/)」では、配布されているDockerイメージを取得して、環境を構築する手順について紹介しました。

[DockerHub](https://hub.docker.com/) にはさまざまなDockerイメージが配布されていますが、当てはまる環境がなければ、Dockerイメージをカスタマイズしたり、新規に作成することで、オリジナルの環境を構築できます。

本記事では、Dockerfile使ってオリジナルの環境を構築する手順を説明しつつ、**HTTP/2に対応したWebサーバーを構築します。**

HTTP/2とは、Webサイトの通信を高速化するための仕組み（通信プロトコル）です。これまでの主流であったHTTP/1.1は、同時には6つのファイルのリクエストしか送れないため、CSSスプライトを使って画像を1つにまとめてファイル数を減らすなどして表示の高速化を図っていました。**HTTP/2では100個以上のリクエストを同時に送れるようになるため、Webサイトの表示を高速化できます。**

※HTTP/2について詳しく知りたい方はCodeZineの記事「[「HTTP/2」がついに登場！ 開発者が知っておきたい通信の仕組み・新機能・導入方法](https://codezine.jp/article/detail/8663)」がわかりやすいでしょう

次の動画は、DockerfileをビルドしてDockerイメージを作成し、HTTP/2環境のWebサーバーを立ち上げるまでの手順を撮影したものです。Dockerfileがあれば少ない手順で環境が構築できることが確認できます。  

### Dockerfileとはインフラ環境をコード化したファイル

Dockerは、Dockerイメージからのコンテナー環境の構築のほか、Dockerfileと呼ばれるインフラ環境をコード化したファイルを元に、環境を自動生成できます。Dockerfileのよう**にインフラ環境の構成をコード化することを「Infrastructure as Code」（インフラ環境のコード化）**と呼ばれています。

これまでインフラ環境を構築する際は、手順書などのドキュメントを作成し管理されていましたが、再度同じ環境を構築する際には、手作業で実施するため人為的なミスも多く手間がかかっていました。コード化することにより、誰が実行してもミス無く同じ環境が作ることができ、複数のマシンをセットアップする場合にも短時間で構築できます。

### Dockerfileを作成する

任意のフォルダーに、以下の内容を記載した`Dockerfile`という名前の拡張子なしのファイルを作成します。

```
# FROM nginx:1.9.6
FROM ehekatl/docker-nginx-http2

# 作成者名を記載
MAINTAINER Watanabe

# 自己証明書を発行
RUN openssl genrsa 2048 > server.key \
&& openssl req -new -key server.key -subj "/C=JP/ST=Tokyo-to/L=Minato-ku/O=ICS inc./OU=/CN=ics.media" > server.csr \
&& openssl x509 -days 3650 -req -signkey server.key < server.csr > server.crt \
&& cp server.key /etc/nginx/server.key \
&& cp server.crt /etc/nginx/server.crt

# 設定ファイルをコンテナ内に配置
COPY nginx.conf /etc/nginx/nginx.conf
```

上記の`Dockerfile`のコードの内容について解説します。まず`FROM`命令でベースとなるDockerイメージの指定を行います。1から環境を構築していきたい場合は、ubuntuやdebian、CentOSなどのDockerイメージをベースに必要なアプリケーションを追加していく事になりますが、今回はHTTP/2環境の構築に必要なnginx 1.9.6とOpenSSL 1.0.2がすでにインストールされている[ehekatl/docker-nginx-http2](https://hub.docker.com/r/ehekatl/docker-nginx-http2/)のイメージを使用します。

公式に配布されているnginxのDockerイメージにもOpenSSLはインストールされていますが、バージョンが1.0.1のため、Google ChromeでHTTP/2が有効になりません。**Google ChromeでもHTTP/2を有効になるよう、OpenSSL1.0.2以降のバージョンがインストールされているDockerイメージを使用します。**

次に、HTTP/2通信にはSSLが必須であるため、証明書のインストールを行います。公開環境であれば[Let’s Encrypt](https://letsencrypt.org/)を使用してSSL証明書を取得できますが、今回はローカル環境で構築しているため、自己証明書を使ってSSLを有効にします。

`RUN`命令では、環境構築をするためのコマンドを指定できます。`openssl`コマンドを使って自己証明書を発行しますが、ここで注意が必要なのは、対話形式のコマンドはエラーになってしまうため、**オプションで必要な情報をセットし、対話形式にならないように配慮します。**

上記の例では、有効期限を10年に設定した自己証明書を発行し、発行された自己証明書をnginxのディレクトリにコピーしています。これらのコマンドは1つずつ`RUN`命令で書くこともできますが、ビルドする際に`RUN`命令を実行する履歴として保存されるため、生成されるDockerイメージの容量が肥大化してしまいます。そのため、`&&`で**コマンドを繋げることで1つのコマンドとして実行されるように記述しています。**

最後に`COPY`命令を使ってローカル環境にあるnginxの設定ファイルをコンテナー内に配置します。nginxの設定ファイルはDockerfileと同じディレクトリに`nginx.conf`という名前で作成し、発行した自己証明書を設定します。

```
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  server {
    listen       80;
    listen       443 ssl http2;

    server_name  localhost;

    ssl_certificate      /etc/nginx/server.crt;
    ssl_certificate_key  /etc/nginx/server.key;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;

    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    root  /usr/local/nginx/html;
    index index.html index.htm;
  }
}
```

この他にも以下のようなDockerfileで使用できる命令は色々と準備されています。詳しく知りたい方は[公式マニュアル](http://docs.docker.jp/engine/reference/builder.html)をご参照ください

命令

概要

FROM

ベースにするDockerイメージを指定します。

MAINTAINER

生成するイメージの作成者情報を指定します。

RUN

環境構築のために実行するコマンドを指定します。

COPY

ローカルにあるファイルやディレクトリをコンテナー内に配置します。

CMD

コンテナー起動時に実行するコマンドを指定します。

EXPOSE

開放するポート番号を指定します。

### DockerfileをビルドしてDockerイメージを作成する

Dockerfileとnginx.confの準備ができたら、Dockerfileのあるフォルダーに移動し`docker build`コマンドでイメージの作成を行います。

```
docker build -t icsmedia/nginx-http2 .
```

`-t`オプションでは、生成するDockerイメージの名前を指定します。設定しない場合は、自動的に適当な名前で生成されます。`.`の箇所にはDockerfileが配置されているディレクトリを指定します。Dockerfileの配置されているフォルダーにいる場合は`.`と指定します。

実行すると数秒ほどでDockerイメージの作成が完了します。`docker images`コマンドを使って以下の通りDockerイメージが作成されていることを確認します。

```
$ docker images
REPOSITORY              TAG      IMAGE ID        CREATED             SIZE
icsmedia/nginx-http2    latest   823fb32de4dd    About an hour ago   478 MB
```

### 作成したDockerイメージからコンテナーを起動する

それでは、作成したDockerイメージからコンテナーを起動してみましょう。`docker run`コマンドを実行しコンテナーを起動します。

```
docker run -p 80:80 -p 443:443 -d icsmedia/nginx-http2
```

コンテナーが起動したらブラウザから`https://localhost/`にアクセスし、HTTP/2に対応しているか確認します。今回は自己証明書を使用しているため、アクセス時に証明書のエラーが表示されますが、詳細情報を表示し、「localhostにアクセスする（安全ではありません）」のリンクから強制的にアクセスしてください。

![](https://ics.media/entry/15266/images/170405_dockerfile_error.jpg)

nginxの初期画面が表示されるため、Google Chromeのデベロッパーツールを使ってHTTP/2で通信されているか確認してみましょう。デベロッパーツールはWindowsの場合はF12キー、macOSの場合はCommand＋Option＋Iキーで起動できます。次に\[Network\]タブを開き表の見出し部分を右クリックして表示されるメニューから\[Protocol\]を選択しチェックをいれます。

![](https://ics.media/entry/15266/images/170405_dockerfile_http2check.png)

ここまでの設定ができたら、ブラウザをリロードするとデベロッパーツールに通信内容が表示されます。**表示されているプロトコル欄に「h2」と表示されていれば、HTTP/2で通信できています**。また、Google Chromeの拡張機能である「[HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin?hl=ja)」をインストールしておくと、HTTP/2の通信が行われているページでは青色で表示されるため、ひと目で対応していることの確認ができます。

![](https://ics.media/entry/15266/images/170405_dockerfile_http2.png)

以上で環境構築は完了です。Webサーバーに任意のファイルをアップしたい場合は、コンテナー起動時に次のコマンドを実行してください。ホスト（起動元）のディレクトリーをコンテナー内のnginxのドキュメントルートにマウントすることで、該当のディレクトリーに配置したファイルがWebサーバーに反映されます。

```
docker run -p 80:80 -p 443:443 -d icsmedia/nginx-http2 -v /Users/xxxx/nginx/www:/usr/local/nginx/html
```

※既にコンテナーを起動済みの場合は、コンテナーを終了後に上記のコマンドを実行してください。  
※`/Users/xxxx/nginx/www`の部分はホスト（起動元）の任意のディレクトリーを指定してください。

### おわりに

HTTP/2に対応した環境を準備するには色々と手間がかかりますが、Dockerを使うことでローカル環境に簡単に構築できました。Dockerfile自体は軽量なテキストファイルなので、このファイルを共有することで、他の開発メンバーのパソコンでも同じ環境のサーバーが簡単に構築できます。

次回の記事では、[DockerCompose](https://docs.docker.com/compose/)を使用して、今回作成したDockerイメージと他のDockerイメージを組み合わせた環境を構築する手順について紹介したいと思います。