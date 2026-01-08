---
title: "JenkinsでCI環境構築チュートリアル ～GitHubとの連携～"
source: "https://ics.media/entry/2869/"
publishedDate: "2014-10-08"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

先日公開した記事「[JenkinsでCI環境構築チュートリアル(Windows編)](https://ics.media/entry/2410/)」では、Jenkinsのインストールとジョブの作成方法についてご説明しました。今回は特定のブランチにPUSHされたタイミングでGitHubと連携して最新ファイルを取得する方法をご説明します。

### 完成イメージ　～JenkinsとGitHubの連携～

![JenkinsとGitHubの連携の完成イメージ](https://ics.media/entry/2869/images/flow.png)

実際の開発シーンを想定して上記の図のようなフローを構築したいと思います。開発者が変更したソースコードをGitHubにPUSHしたことをトリガーにJenkinsにその旨を通知します。Jenkinsはその通知を受けて、最新ファイルをGitHubから取得してくる仕組みとなります。

処理の流れとは逆になりますが、まずはJenkins側で「GitHubから通知を受け取る設定」と「ジョブの作成」から行っていきます。

### Jenkinsの設定　～GitHubからの通知を受け取る設定～

本チュートリアルでは、特定のブランチにPUSHされた際にのみ動作する仕組みを構築していきたいのですが、GitHubは特定のブランチへの変更に限らず、すべてのブランチの変更を通知する仕様となっております。しかし、GitHubには変更があった旨を通知する際にJSONファイルを合わせて送信する仕組みがあり、Jenkins側でその**ファイルを解析することでどのブランチに変更があったのかを判断できます。**

※JSONファイルの内容は[デベロッパーサイト](https://developer.github.com/v3/repos/hooks/)に詳しく記載されています。

#### Jenkinsプラグインのインストール

色々と難しいことを書いてしまいましたが、**Jenkinsのプラグインを使うことで、これらの仕組みを簡単に実現**できます。「Jenkinsの管理」->「プラグインの管理」->「利用可能」から、以下のプラグインをインストールしてください。

※Jenkinsのプラグインには**依存関係のあるプラグイン（そのプラグインを利用するために必要なプラグイン）がある場合があります**。プラグインのWikiページには必要なプラグインが記載されている場合がありますので、こちらを確認することをオススメします。以下は依存関係のあるプラグインを含めたものになっております。

-   [Git Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin)
-   [GitHub Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Github+Plugin)
-   [GitHub API Plugin](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+API+Plugin)
-   [Git Client Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Git+Client+Plugin)
-   [Run Condition Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Run+Condition+Plugin)
-   [Run Condition Extras Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Run+Condition+Extras+Plugin)
-   [Build Keeper Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Build+Keeper+Plugin)
-   [Conditional BuildStep Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Conditional+BuildStep+Plugin)
-   [Flexible Publish Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Flexible+Publish+Plugin)

![Jenkins のプラグインマネージャーの画面](https://ics.media/entry/2869/images/plugin.png)

プラグインをインストールしたら、「GitHubから通知を受け取るジョブ」と「GitHubから最新ファイルを取得するジョブ」の2つのジョブを作成します。1つのジョブですべての処理を書くことも可能ですが、モジュールとして役割ごとに分けて作成することで、**修正がしやすくなり、また別のジョブで使いまわすこともできるためとても便利に扱うことができます**。

#### GitHubから最新ファイルを取得するジョブを作成

「フリースタイル・プロジェクトのビルド」で新しいジョブを作成し、「ソースコード管理」から「Git」にチェックを入れてください。ソースコードを取得するリポジトリのアドレスとアカウント情報を設定し、「Branches to build」欄にはソースコードを取得する対象のブランチ名を記述します。キャプチャ画像ではdevelopブランチを対象として設定しています。

![GitHubと連携するためのJenkinsプラグインのインストール](https://ics.media/entry/2869/images/setting-git1.png)

#### 通知を受け取るジョブを作成

「フリースタイル・プロジェクトのビルド」で新しいジョブを作成し、GitHubからパラメーターを受け取れるようにするため「ビルドのパラメーター化」にチェックを入れてください。GitHubからは**「payload」というパラメーターでJSON形式のコミット情報が送られてくる**ため、文字列の名前を「payload」と設定し、デフォルト値には「none」を設定しておきます。

![Jenkins設定のパラメーター](https://ics.media/entry/2869/images/setting-param1.png)

次に受け取ったJSONファイルをチェックし、該当のブランチであれば次の処理に進むよう設定します。developブランチでの変更を対象としたいため、それぞれ以下の通り設定します。

-   Run：Regular expression match
-   Expression：.\*refs/heads/develop.\*
-   Label：${ENV,var=“payload”}
-   Builder：Trigger/call builds on other projects
-   Projects to build：（さきほど作成した「GitHubから最新ファイルを取得するジョブ」のジョブ名称）

![GitHubのブランチの作成](https://ics.media/entry/2869/images/setting-branche.png)

### GitHubの設定　～GitHubからJenkinsへの通知～

GitHubからJenkinsへの通知は、GitHubのWebhooksという機能を利用して行います。Webhooksとは**GitHubのリポジトリに変化があった際に任意のURLを叩いてくれる機能**です。この機能を使うことでリポジトリにPUSHしたタイミングでJenkinsにその旨を通知することができるようになります。

#### Webhooksの設定方法

GitHubの設定を行うリポジトリのページに移動し、「Settings」>「Webhooks & Services」を選びます。「Services」欄の「Add Services」から「Jenkins (GitHub plugin)」を選択し設定画面へ遷移します。

![](https://ics.media/entry/2869/images/webhooks1.png)

設定画面では、Jenkinsで作成したWebhooks用のジョブの実行URLを指定します。実行URLは以下の形式で指定します。ジョブの名前の後ろに「buildWithParameters」と必ず記載してください。

http://\[Jenkinsの動作するドメイン\]/job/\[ジョブの名前\]/buildWithParameters

![](https://ics.media/entry/2869/images/setting.png)

### ジョブの実行

これで設定はすべて完了となります。設定が問題なく完了していれば、GitHubの特定ブランチにPUSHすることで自動的にジョブが起動し、最新ファイルの取得まで行われるはずです。

ジョブの実行後、Jenkinsの左メニューから「ビルド履歴」を選択し、実行したジョブの履歴を確認してみましょう。問題なく動作していれば以下のキャプチャ画像のように実行したジョブの左側に青い丸が表示されているはずです。赤い丸が表示されている場合はどこか設定が間違っている可能性がありますので、設定を見直してみましょう。

![Jenkinsのビルド履歴](https://ics.media/entry/2869/images/history.png)

### おわりに

Jenkinsのプラグインを使うことで、GitHubと連携し最新ファイルを取得する仕組みを簡単に構築することができたと思います。

ここまで環境が構築できれば、あとはコンテンツのビルドを行ったり、テスト処理を実行したりと、コンテンツにあわせて処理を追加していけば良いだけです。次回は「[JenkinsでCI環境構築チュートリアル ～GitHubからWebサーバーへのデプロイ～](https://ics.media/entry/3283/)」と題して、Jenkinsを使ってテストサーバにデプロイする手順をご紹介していきたいと思います。