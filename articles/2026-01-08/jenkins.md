---
title: "サルでもわかるJenkins入門〜自動テスト環境を構築しよう"
source: "https://ics.media/entry/tutorial-jenkins/"
publishedDate: "2018-07-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

Webアプリケーションを開発において、最新ファイルをこまめにテスト環境に反映しなければいけない場面があると思います。しかし、これらの作業を手動で行っていると、ビルド（SassのビルドやFlashコンパイルなど）に時間がかかったり、**ファイルアップ時に反映漏れや誤ったファイルをアップしてしまうなどの人的ミスが発生し**、ムダな時間を費やしてしまった経験のある方もいらっしゃるかと思います。

### Jenkinsの入門チュートリアル

そういった開発チームには、作業の効率化および人的ミスの軽減に役立つCI（継続的インテグレーション）ツールの導入がオススメです。この連載記事では[Jenkins](http://jenkins-ci.org/)と[AWS](http://aws.amazon.com/jp/)、[GitHub](https://github.com/)を使って、コンテンツのビルドからテスト環境へのデプロイまでを行ってくれるCI環境を構築の手順を解説します。

![](https://ics.media/entry/tutorial-jenkins/images/images/eye-catch.png)

1.  [Jenkins環境を構築しよう (Windows編)](https://ics.media/entry/2410/)
2.  [Jenkins環境を構築しよう (Linux編・macOS編)](https://ics.media/entry/14273/)
3.  [JenkinsとGitHubと連携させよう](https://ics.media/entry/2869/)
4.  [JenkinsでGitHubからWebサーバーへデプロイしよう](https://ics.media/entry/3283/)
5.  [JenkinsとAWSとGitHubを使ったHTML5/Flashのデプロイのデモ](https://ics.media/entry/1852/)

### SeleniumでUIテストを自動化しよう

Webアプリケーション開発時には手作業でテストをされている方も多いと思います。機能改修やバグフィクス後に、リグレッションテスト（改修により既存機能への影響がないかを確認する回帰テスト）が必要となりますが、時間が取れずしっかりとテストができていない方も多いのではないでしょうか？

本記事では、これらのテストを自動化することのできる「Selenium」（セレニウム）についてご紹介します。

![](https://ics.media/entry/tutorial-jenkins/images/images/150320_title.jpg)

1.  [Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/)
2.  [JenkinsとSeleniumでWebの自動UIテスト環境を作ろう](https://ics.media/entry/6031/)
3.  [Selenium GridでUI自動テストの並列実行環境を構築](https://ics.media/entry/11141/)
4.  [ブラウザ拡張Selenium IDEでユーザー操作を記録・再現しよう](https://ics.media/entry/17626/)