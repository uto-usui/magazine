---
title: "JenkinsでCI環境構築チュートリアル （Linux編・macOS編）"
source: "https://ics.media/entry/14273/"
publishedDate: "2016-12-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2016年12月16日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

[Jenkins](https://jenkins.io/)とは、アプリケーション開発におけるテストやビルドなどの作業を自動化する継続的インテグレーション（CI）ツールの1つです。

Jenkinsはクロスプラットフォームに対応しているため、macOS/Windows/LinuxなどのさまざまなOSで利用できます。そのため、**AWSなどのクラウド環境に構築するだけでなく、ローカル環境にインストールしても使用できます。**

本記事では、LinuxとmacOS上でCI環境を構築する手順を紹介します。また、Windowsの手順は別記事「[JenkinsでCI環境構築チュートリアル (Windows編)](https://ics.media/entry/2410/)」で解説しています。

-   [JenkinsでCI環境構築（Linux編）](#jenkins-linux)
-   [JenkinsでCI環境構築（macOS編）](#jenkins-mac)

### JenkinsでCI環境構築（Linux編）

本記事では、CentOS 7をminimalインストール（最小構成でのインストール）した環境にCI環境を構築する手順を紹介します。

※ 本記事はCentOS Linux release 7.3.1611、Java SE Development Kit 8u111とJenkins ver. 2.36で解説しています

#### 1\. Javaのインストール

Jenkinsを動かすためにはJavaがインストールされている必要があります。ターミナルより`java -version`と入力し、Javaがインストールされているかを確認してください。

```
$ java -version
-bash: java: command not found
```

※ 冒頭の「$」を入力する必要はありません。「$」が記載された行はターミナルから入力する文字列を指しています。

上記のようにバージョン番号が表示されていない場合は、Javaがインストールされていません。下記のコマンドを実行し、Javaをインストールしてください。

```
$ sudo yum install -y java-1.8.0-openjdk
```

インストールが完了したら、再度`java -version`と入力してください。バージョン番号が表示されていればインストールが完了です。

```
$ java -version
openjdk version "1.8.0_111"
OpenJDK Runtime Environment (build 1.8.0_111-b15)
OpenJDK 64-Bit Server VM (build 25.111-b15, mixed mode)
```

#### 2\. yumリポジトリ追加

Jenkinsのインストールを行うために、Jenkinsのyumリポジトリを追加します。yum.repos.dフォルダーへ移動後、curlコマンドでyumリポジトリを取得し、RPMパッケージの公開鍵をrpmコマンドでインポートします。

Jenkinsには2つのバージョン「LTS Release」（ロング・タイム・サポート版）と「Weekly Release」（週間リリース版）があります。どちらを利用しても問題ありませんが、LTS版の方がプラグインの対応が安定しているため、はじめての方はLTS版を利用することをオススメします。

▼LTS版を利用する場合

```
$ cd /etc/yum.repos.d
$ sudo curl -O http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
$ sudo rpm --import http://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

▼Weekly Release版を利用する場合

```
$ cd /etc/yum.repos.d
$ sudo curl -O http://pkg.jenkins-ci.org/redhat/jenkins.repo
$ sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
```

#### 3\. Jenkinsのインストール

次のコマンドでインストールします。

```
$ sudo yum install jenkins
```

#### 4\. 自動起動設定

OSを起動した際に自動的にJenkinsを起動させたい場合は、次のコマンドで設定します。

```
$ sudo systemctl enable jenkins.service
```

自動起動をオフにしたい場合は、次のコマンドで解除できます。

```
$ sudo systemctl enable jenkins.service
```

#### 5\. ファイアウォールの設定

Jenkinsはデフォルトの設定では8080ポートを使用して起動します。外部から8080ポートでアクセスできるようにファイアウォールの設定を変更します。

```
$ sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
$ sudo firewall-cmd --reload
```

#### 6\. Jenkinsの起動

次のコマンドでJenkinsを起動します。

```
$ sudo service jenkins start
```

ブラウザから`http://(IPアドレス):8080/`でアクセスし、Jenkinsのトップページにアクセスできることを確認してください。

#### 7\. Jenkinsのセットアップ

トップページへアクセスすると、意図しないユーザーによるアクセスを防ぐためにロックがかかっています。ウェブページ中に記載されているパスにパスワードが記載されたファイルがありますので、確認し「Administrator password」欄に入力してください。

![Jenkinsのロック解除](https://ics.media/entry/14273/images/161215_jenkins_setup_01.png)

パスワードは次のコマンドで確認できます。パスワードを入力後、「Continue」ボタンを押してロックを解除してください。

```
$ sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

次の画面ではJenkinsのカスタマイズをおこないます。よく利用されている推奨のプラグインをインストールするか、自身で選択してインストールするかを選ぶ事ができます。

本記事では、「Install suggested plugins」を選択し、推奨のプラグインをインストールします。各種プラグインのインストールが完了するまで数分程かかります。

![Jenkinsのカスタマイズ](https://ics.media/entry/14273/images/161215_jenkins_setup_02.png)

最後にAdminユーザーの作成をおこないます。必要な情報を入力し「Save and Finish」ボタンを押してください。以上でセットアップは完了です。

![Adminユーザーの作成](https://ics.media/entry/14273/images/161215_jenkins_setup_03.png)

### JenkinsでCI環境構築（macOS編）

macOSでのJenkinsのインストール方法には次の3つがあります。

-   pkgファイルからインストール
-   公式サイトからJava Web Archive (.war)をしてくる
-   homebrewでインストール

本記事では、インストール後もカスタマイズしやすいhomebrewを使ったインストール方法を解説します

※ 本記事はmacOS El Capitan 10.11.6、Java SE Development Kit 8u111とJenkins ver. 2.36で解説しています

#### 1\. Javaのインストール

Jenkinsを動かすためにはJavaがインストールされている必要があります。Javaがインストールされているかを確認するために、\[アプリケーション\]フォルダー→\[ユーティリティ\]フォルダーに移動し、\[ターミナル\]を起動します。

ターミナルより`java -version`と入力し、Javaがインストールされているかを確認してください。

```
$ java -version
-bash: java: command not found
```

上記のようにバージョン番号が表示されていない場合は、Javaがインストールされていません。下記のOracleのサイトからインストーラーをダウンロードし、インストールしてください。  
[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://google.com/)

#### 2\. Homebrewをインストール

Homebrewとは、macOS用パッケージマネージャーです。`brew -v`と入力し、brewがインストールされているかを確認してください。

```
$ brew -v
-bash: brew: command not found
```

上記のようにバージョン番号が表示されていない場合は、Homebrewがインストールされていません。下記のコマンドを実行し、Homebrewをインストールしてください。

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

インストールには数分程度かかります。インストールが完了したら`brew doctor`を実行します。正常にインストールが完了していれば`Your system is ready to brew.`と表示されます。エラーメッセージが表示される場合は、エラーメッセージに従い修正してください。

```
$ brew doctor
Your system is ready to brew.
```

#### 3\. Jenkinsのインストール

次のコマンドでインストールします。

```
$ brew install jenkins
```

#### 4\. Jenkinsの起動

次のコマンドでJenkinsを起動します。

```
brew services start jenkins
```

ブラウザから[http://localhost:8080/](http://localhost:8080/)でアクセスし、Jenkinsのトップページにアクセスできることを確認してください。

#### 5\. Jenkinsのセットアップ

セットアップの手順はLinux編の手順と同様です。Linux編の手順7を参照ください。

### おわりに

本記事では、LinuxとmacOS上でJenkinsをインストールする手順を解説しました。CI環境を使用し、**テストやデプロイなどの作業を自動化することで、開発スピードを格段に向上させることができます。**

はじめての方は、macOSやWindowsのローカル環境にCI環境を構築し、まずは簡単なジョブを実行してみてはいかがでしょうか？

ジョブの作成方法は、記事「[JenkinsでCI環境構築チュートリアル (Windows編)](https://ics.media/entry/2410/)」で解説していますので、あわせてご覧ください。