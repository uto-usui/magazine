---
title: "JenkinsとSeleniumを使ってWebコンテンツの自動UIテスト環境を作ろう！"
source: "https://ics.media/entry/6031/"
publishedDate: "2015-04-09"
category: "frontend"
feedName: "ICS MEDIA"
author: "watanabe"
---

2015年4月9日 公開 / [株式会社ICS 渡邊 真耶](https://ics.media/entry/staff/watanabe/)

先日公開した「[UIテストの自動化！Node.jsとSeleniumでWebアプリのUIテスト環境構築](https://ics.media/entry/5759/)」では、手動で行っていたWebアプリのUIテストを[Selenium](http://docs.seleniumhq.org/projects/webdriver/)を使って自動化する手法についてご説明しました。

SeleniumでUIテストを自動化することにより、リグレッションテスト（改修により既存機能への影響がないかを確認する回帰テスト）が簡単にでき、バグの早期発見に繋げることができますが、実際にはこのテストを**運用でしっかりと行っていかないとプロジェクトとしての品質向上にはつながりません。**また、コマンドラインの扱いに慣れていない方は、コマンドラインからのテストの実行に抵抗があり、テスト結果もコンソールに出力されるため見づらいと思う方も多いと思います。

そこで今回はCI（継続的インテグレーション）ツールである**JenkinsとSeleniumを連携することで、定期的にテストを実行し、テスト結果の詳細をブラウザ上から確認できる方法**についてご紹介したいと思います。

### 完成イメージ

[![完成イメージ](https://ics.media/entry/6031/images/0eba6744a4b1ab0d9b633aabe2910703.png)](https://ics.media/entry/6031/images/0eba6744a4b1ab0d9b633aabe2910703.png)

理想としては上記の図のような環境が構築できると良いと考えています。

機能改修・バグフィクスを行ったソースコードをGitHubにPUSHし、PUSHしたことをトリガーにしてJenkinsが最新ファイルを取得しテストを実施します。実施したテスト結果はSeleniumからxUnit形式（\*1）で出力することで、Jenkinsからテスト結果を確認できます。

Jenkinsの導入手順や手順①〜④の流れについては過去の記事にまとめておりますので、本記事では**手順⑤〜⑥の「テスト実行」と「テスト結果出力」の部分について説明します。**

\*1　xUnit形式とは、ユニットテストを行うためのテスティングフレームワークから出力されるテストレポートの出力形式です。

#### 参考：Jenkinsの導入手順とGitHubとの連携について

-   [JenkinsでCI環境構築チュートリアル (Windows編)](https://ics.media/entry/2410/)
-   [JenkinsでCI環境構築チュートリアル ～GitHubとの連携～](https://ics.media/entry/2869/)
-   [JenkinsとAWSとGitHubを使ったHTML5/Flashのデプロイを行うCI環境の構築](https://ics.media/entry/1852/)

### 手順⑤　JenkinsからSeleniumのテストを実施する

ビルドの設定画面でビルド（テスト実施）の設定を行います。\[ビルド手順の追加\]から\[シェルの実行\]を選択し、「シェルの実行」の欄にSeleniumのテストを実行する以下のコマンドを入力してください。

```
mocha tests/formTest.js --timeout 10000 --reporter xunit > xunit.xml
```

テスト実行時のオプションとして「–reporter xunit」を指定しています。このオプションを指定することによりテスト結果を「xUnit形式」で出力できます。また「> xunit.xml」を指定することにより、コンソールに出力されていたテスト結果を指定したテキストファイルに保存できます。

[![](https://ics.media/entry/6031/images/step01.png)](https://ics.media/entry/6031/images/step01.png)

### 手順⑥　Seleniumのテスト結果をJenkinsに読み込む

次に［ビルド後の処理の追加］から［jUnitテスト結果の修正］を選択し、「テスト結果XML」の欄に手順④で出力した「xUnit形式」のファイル名を指定してください。

[![](https://ics.media/entry/6031/images/step02.png)](https://ics.media/entry/6031/images/step02.png)

### テスト結果の確認　〜テスト結果の推移とテスト結果の詳細表示〜

ジョブを実行しテスト結果が蓄積されると、Jenkinsのジョブのトップ画面に「テスト結果の推移」が表示されます。縦軸がテスト項目数、横軸がジョブの実行回数となっており、テストOKが青色、テストNGが赤色で表示されます。以下の画像では、7回目（#7）の改修でエラーが1件発生しており、13回目（#13）の改修では3件に増えていることがわかります。19回目（#19）の改修で無事にすべてのエラーを解消できたようです。

[![](https://ics.media/entry/6031/images/testResult.png)](https://ics.media/entry/6031/images/testResult.png)

また、この「テスト結果の推移」図内の任意の箇所を選択すると、テスト結果の詳細を確認をできます。この画面では、どのテスト項目でエラーが発生していたのかを確認をできます。「失敗」と表示されているものは以前からエラーが発生していた項目で、前回がOKだったものがテストNGになった場合は「リグレッション」と表示されます。また、前回NGだった項目が修正された場合には「修正OK」と表示されます。また、エラーの詳細を確認したい場合は、テスト項目をクリックするとエラーの詳細を確認できます。

[![](https://ics.media/entry/6031/images/TestResultDetail.png)](https://ics.media/entry/6031/images/TestResultDetail.png)

### おわりに

Jenkinsと連携することでテスト実施の手間が軽減されるため、運用の負荷もかからずにUIテストを実施できます。**GitHubにPUSHしたタイミングでテストを実施することにより、どの改修によってバグが発生したのかも確認できるようになるため、バグ発生時の原因調査にかける時間が大幅に短縮されます。**

また、Jenkinsを使うことによりブラウザ上でテスト結果を確認することができるため、**ディレクターなどエンジニアではない方でも確認しやすくなるため、プロジェクトの品質管理もしやすくなります。**みなさまのプロジェクトでも、SeleniumやJenkinsを効果的に活用してみてはいかがでしょうか？