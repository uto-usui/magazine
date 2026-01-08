---
title: "JenkinsでCI環境構築チュートリアル ～GitHubからWebサーバーへのデプロイ～"
source: "https://ics.media/entry/3283/"
publishedDate: "2014-11-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2014年11月14日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

前回の記事「[JenkinsでCI環境構築チュートリアル ～GitHubとの連携～](https://ics.media/entry/2869/)」では、GitHubから最新ファイルを取得する方法をご説明しました。今回はGitHubから取得した最新ファイルをWebサーバーにデプロイする手順についてご説明したいと思います。

### 完成イメージ　～JenkinsからWebサーバーへのデプロイ～

![](https://ics.media/entry/3283/images/github_to_webserver-flow1.png)

上記の図の手順⑤にあたる「Webサーバーへデプロイ（ファイルアップ）」する仕組みを構築します。デプロイの仕方は色々あり、Jenkinsを構築したサーバーのOSによっても異なります。本記事ではmacOS（Linuxも同様）とWindowsでのそれぞれのデプロイ方法をご説明します。

※手順①〜手順④については、前回の記事「[JenkinsでCI環境構築チュートリアル ～GitHubとの連携～](https://ics.media/entry/2869/)」をご参照ください。

### ジョブの設定

前回作成した「GitHubから最新ファイルを取得するジョブ」にデプロイ用の設定を加えていきます。ジョブの設定画面の下部にある\[ビルド\]の\[ビルド手順の追加\]からmacOSまたはLinux環境の方は\[シェルの実行\]、Windows環境の方は\[Windowsバッチコマンドの実行\]を選択してください。選択すると入力欄が表示されますので、そこにデプロイを行うコマンドを入力します。

![](https://ics.media/entry/3283/images/SettingBuild.png)

#### macOSまたはLinuxのデプロイ方法

macOSとLinuxには「rsync」という便利な同期コマンドが準備されています。こちらのコマンドを使うことで**差分のあるファイルだけを同期することができるため、最小限の負荷で同期を行う**ことができます。

「シェルスクリプト」欄に、以下の通りデプロイ用のコマンドを入力してください。

\[shell\]rsync -av --delete /User/Jenkins/jobs/AutoBuild-test/workspace/bin-debug username@host:/jenkins\[/shell\]  
【画面イメージ】  
![](https://ics.media/entry/3283/images/buildCommandForLinux.png)

同じサーバー内であればパスワードは不要ですが、別サーバーにSSHでアクセスするにはパスワードが必要となるため、事前にパスワードなしでWebサーバーにアクセスできるよう「公開鍵認証」の設定をしておく必要があります。

※「公開鍵認証」の設定の手順は、こちらのサイトが参考になります。  
[http://d.hatena.ne.jp/tageo/20120905/1346830627](http://d.hatena.ne.jp/tageo/20120905/1346830627)

※rsyncコマンドのオプションについては、こちらのサイトが参考になります。  
[http://webkaru.net/linux/rsync-command/](http://webkaru.net/linux/rsync-command/)

#### Winodwsのデプロイ方法

Windowsには残念ながら「rsync」コマンドは準備されていません。Windows Vista／Windows Server 2008以降であれば「robocopy」というコマンドがOSの標準コマンドとして用意されているので、こちらを利用して実装することも可能ですが、**コマンドラインが苦手な方でも簡単に導入できるよう、「[WinSCP](http://winscp.net/eng/docs/lang:jp)」というソフトを使って実装する**方法をご紹介します。

WinSCPはGUIで利用されていることが多いと思いますが、実は「コンソールモード」を備えており、コマンドラインからも利用できます。**WinSCPを使うことで複雑な設定もGUI上で簡単に行うことができる**ため、とてもオススメの方法です。GUI上でデプロイするWebサーバーへ接続できるように設定しておけば、**公開鍵認証の設定を別途行う必要はありません。**

「コマンド」欄に、以下の通りデプロイ用のコマンドを入力してください。アップロード用スクリプトは下記の内容でテキストファイルとして作成し、任意の場所に保存しておきます。

\[shell\]winscp xxxxxxxxxxxxxxxxxxx /script=C:Jenkinsbatchupload.script\[/shell\]  
【画面イメージ】  
![](https://ics.media/entry/3283/images/buildCommandForWindows.png)

【アップロード用スクリプト】

```
# 確認ダイアログを表示しないようにする
option confirm off

# リモート環境と同期を行う
synchronize remote -delete -mirror "C:JenkinsjobsAutoBuild-testworkspacebin-debug" "/jenkins"

# セッションを閉じて終了する
exit
```

5行目の「synchronize」コマンドがファイルの同期を行うコマンドになります。オプションを指定することで、削除差分を含めてリモートに反映し、ミラーリングするようにしています。オプションの詳細については下記のサイトをご覧ください。

[http://sourceforge.jp/projects/winscp/wiki/script\_commands#synchronize](http://sourceforge.jp/projects/winscp/wiki/script_commands#synchronize)

### デプロイ処理の実行

設定は以上で完了となります。デプロイの動作を確認するために、ジョブを実行してみましょう。設定に問題がなければ、GitHubから取得した最新ファイルがWebサーバーにデプロイされているはずです。

ジョブの実行後、Jenkinsの左メニューから\[ビルド履歴\]を選択し、実行したジョブの履歴を確認してみましょう。問題なく動作していれば以下のキャプチャ画像のように実行したジョブの左側に青い丸が表示されているはずです。赤い丸が表示されている場合はどこか設定が間違っている可能性がありますので、設定を見直してみましょう。

![](https://ics.media/entry/3283/images/history.png)

### おわりに

これでGitHubから最新ファイルを取得し、Webサーバーにデプロイするまでの一連の処理を構築することができました。ここまでできれば、あとはプロジェクトに応じてカスタマイズしていくだけです。デプロイの前にビルド処理を追加したり、リソースのMinifyやテストツールの実行など、色々とカスタマイズできます。

WinSCPを使うことでWindows環境でも簡単にデプロイ処理を実現できるため、ぜひ試してみてください。