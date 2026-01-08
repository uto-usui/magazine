---
title: "メルペイの数百画面をSwiftUI/Jetpack Composeに移行するプロジェクトを推進する"
source: "https://engineering.mercari.com/blog/entry/20241221-leading-a-project-to-migrate-hundreds-of-screens-to-swiftui-jetpack-compose-from-uikit-androidview-in-merpay/"
publishedDate: "2024-12-24"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルペイ Engineering Managerの[@masamichi](https://x.com/masamichiueta)です。  
この記事は、[Merpay & Mercoin Advent Calendar 2024](https://engineering.mercari.com/blog/entry/20241125-merpay-mercoin-advent-calendar-2024/) の記事です。

メルペイのモバイルチームでは現在、メルカリアプリ内に存在するメルペイの数百画面をSwiftUI/Jetpack Composeに移行するプロジェクトを推進しています。  
この記事では、プロジェクトの経緯とその進め方について紹介します。

## メルペイのリリース

メルペイが搭載されたメルカリアプリがリリースされたのは2019年2月です。初期の開発は主に2018年に進めていましたが、当時はSwiftUIやJetpackComposeは発表されておらず、メルペイを含むメルカリアプリはUIKit/Android Viewで開発していました。  
その後、2019年内にiOS/Android共に宣言的UIフレームワークであるSwiftUI/Jetpack Composeが発表されました。

## GroundUP Appプロジェクト

一方2020年ごろから、母体となるメルカリアプリは長年の開発で積み重なってきた課題を解決するために コードベースを刷新するGroundUP Appプロジェクトが立ち上がりました。  
GroundUP AppプロジェクトではSwiftUI/Jetpack Composeが全面採用され、2022年にリリースすることができました。

プロジェクトの詳細についてはコアメンバーの記事を参照ください。

-   [メルカリの事業とエコシステムをいかにサステナブルなものにするか？かつてない大型プロジェクト「GroundUp App」の道程](https://careers.mercari.com/mercan/articles/35887/)
-   [これからメルカリのエンジニアリングはもっと面白くなる──iOS＆Androidのテックリードが振り返る、すべてがGo Boldだった「GroundUp App」](https://careers.mercari.com/mercan/articles/36183/)

メルペイの各種機能はモジュール化してある程度疎結合な状態でメルカリアプリに組み込んでいたため、新しいアプリにも組み込まれた状態を実現し、GroundUP Appプロジェクトと並行しながら新機能の開発を続けていきました。

メルペイの移行についてはこちらの記事を参照ください。

-   [メルカリアプリのコードベースを置き換える GroundUP App プロジェクトの話](https://engineering.mercari.com/blog/entry/20221213-ground-up-app/)
-   [【書き起こし】Merpay iOSのGroundUP Appへの移行 – kenmaz【Merpay & Mercoin Tech Fest 2023】](https://engineering.mercari.com/blog/entry/20231023-mmtf2023-day1-4/)

## DesignSystem

メルカリではDesignSystemを定義し画面デザインおよび開発を行っています。メルカリでは2019年ごろから段階的にアプリへの導入を進めてきました。

特にGroundUPプロジェクト後の新しいアプリではSwiftUI/Jetpack ComposeのUIコンポーネントに刷新され、DesignSystemの全面的な採用によって画面のUI/UXの統一、ダークモード対応やアクセシビリティの向上が実現しました。

一方で、メルペイは前述の通り初期から開発してきたモジュールをそのまま新しいアプリに統合しました。それらの画面はUIKit/Android Viewで作られており、DesignSystemについてもUIKit/Android Viewの旧バージョンの実装となっていました。それによって、UI/UXの差分、ダークモード非対応、UIフレームワークが違うことによるアーキテクチャの差分といった課題がありました。  
GroundUPプロジェクトで得た効果を最大限活用するため、2023年よりメルペイの既存画面のマイグレーションを進めるプロジェクトを開始しました。

## Engineering ProjectsとGolden Path

メルペイの数百画面をマイグレーションしていくには、長期的な取り組みが必要となります。メルペイではこういった長期的なエンジニアリングへの投資を推進するためにEngineering Projectsという枠組みを構築してきました。  
Engineering Projectsの詳細については、VP of Engineeringの@keigowさんの記事をご覧ください。

-   [メルペイのエンジニアリングへの投資を推進する仕組み](https://engineering.mercari.com/blog/entry/20241204-merpay-engineering-investment/)

また、現在メルカリグループ全体で標準的な技術スタックをGolden Pathとして定義し、開発効率の向上や技術資産の再利用を目指しています。DesignSystemで採用されているSwiftUI/Jetpack ComposeはGolden Pathとして定義されており、メルペイのマイグレーションプロジェクトは社内ではわかりやすくDesignSystemマイグレーションプロジェクトと呼んでいます。

-   [グローバル展開を推進する開発組織をつくる——Meet Mercari’s Leaders：木村俊也（CTO）](https://careers.mercari.com/mercan/articles/40891/)

実際にマイグレーションを実施していくには工数が必要であり、優先度の議論も必要となります。本プロジェクトを立ち上げるにあたってプロジェクト計画書を作成し、背景やアクション、体制やマイルストーンを明確にしました。Golden Pathのような会社の長期的な方針やEngineering Projectsの取り組みもあり、本プロジェクトをEngineering Projectsの1つとして推進しています。

## プロジェクト体制と進め方

## 体制

メルペイでは、プログラムという大きなドメイン毎にプロダクトマネージャーやエンジニアを含めたクロスファンクショナルなチーム体制で事業を推進しています。  
Design System マイグレーションを進めるには全プログラムのモバイルチーム、デザイナーとの連携が必要不可欠です。モバイルチームのリーダーとデザイナーで隔週の定例ミーティングをセットし、進捗やブロッカーの共有、マイルストーンの設定を定期的に行っています。  
プロジェクトの立ち上げ期は週次で集まって進め方の型を作っていくのが良いと思いますが、ある程度固まってくると隔週がちょうどいいと感じています。

プロジェクトの情報を全て集めたページを社内のConfluenceに作っています。ここでプロジェクト計画書や体制図、機能ごとのSlackのコミュニケーションチャンネル、デザインや開発のノウハウ、QAのテストケース、機能のリリース状況、定例のミーティング議事録などプロジェクトに必要な情報を俯瞰して見ることができるようにしています。

![tableofcontents](https://storage.googleapis.com/prd-engineering-asset/2024/12/034b65f3-tableofcontents.png)  
_Table of Contentsの一部抜粋_

マイグレーションを進めるには工数とタイミングが重要です。プロダクトの新規施策を導入するタイミングで同時にマイグレーションできれば、効率的に進めることができます。一方、それだけでは変化の少ない機能のマイグレーションが進められません。また、緊急度の高い開発に関してはスピードを優先して一旦既存の画面への開発を行うケースもあります。既存の機能をそのまま移行するケース、プロダクトの新規施策を導入するタイミングで同時に移行するケース、どちらもバランスよく進められるように、各プログラムのデザイナーおよびモバイルチームリーダーと密に連携をとりながら進めています。

## Screen Listと進捗の追跡

画面のマイグレーションをしていくにも、まずどれくらいの機能および画面があるのかをできるだけ正確に把握する必要があります。 メルペイではプロジェクトを立ち上げる際に全ての画面一覧をスプレッドシートにまとめたスクリーンリストを作成しました。これによって画面数や画面パターンを正確に把握したり、機能のオーナーシップを持つチームや開発・デザイン担当者を一元化して把握することができるようになりました。全ての画面にIDを振ってチーム内で対象とする画面の認識齟齬がないようにもしています。

各画面には以下のような進捗ステータスも付けてグラフにすることで、全体の進捗を視覚的に追跡できるようにしています。

-   TODO
-   Design In Progress
-   Design In Review
-   Design Done
-   Dev in Progress
-   In QA
-   Done

隔週の定例ミーティングでマイグレーションに取り組んでいる機能の進捗状況を更新しています。

各画面の状況を正確に把握することで、Engineering Projectsの定例ミーティングでもCTO, VPoEに対して透明性高く正確な情報をレポートすることができています。

![screen list](https://storage.googleapis.com/prd-engineering-asset/2024/12/da9b8b04-screenlist.png)  
_Screen Listのシート一部抜粋_

## Strategy Sharing

メルペイでは四半期の後半に一度Strategy Sharingという、次の四半期の施策の優先順位の決定や戦略・ロードマップのレビューを行い全社的に共有するタイミングを設けています。その中で、Engineering Projectsとしても次の四半期にターゲットとする機能と進捗率を定義し、全社的にプロジェクトのマイルストーンを共有しています。これによってエンジニアリング部門以外の方々でも進捗を把握することができ、全社的な認知を得ることができています。

## 現在の進捗状況

これまで2023年から2024年にかけて約2年間プロジェクトを推進してきましたが、2024年12月現在、Androidは約65%、iOSが約60%のマイグレーションを完了してリリースできています。開発中のものも含めると70% ~ 80%のマイグレーションが進んでいます。

![Android](https://storage.googleapis.com/prd-engineering-asset/2024/12/9543c8b4-android.png)  
_Android Progress_

![iOS](https://storage.googleapis.com/prd-engineering-asset/2024/12/9f6b7bb3-ios.png)  
_iOS Progress_

今後もメルペイのモバイルエンジニアリングをアップデートすべく、チーム一丸となって100%を目指してプロジェクトを推進していきます。

## 終わりに

この記事では、メルカリアプリ内に存在するメルペイの数百画面をSwiftUI/Jetpack Composeに移行するプロジェクトプロジェクトの経緯とその進め方について紹介しました。  
プロジェクト規模も大きく長期的な取り組みで困難なことも多いですが、テックカンパニーとしてこのような取り組みに挑戦できていることはメルカリグループのエンジニアリング組織としての強みだと思います。  
SwiftUI/Jetpack Composeへ移行を検討しているチーム、移行を進めているチームの皆さまの参考になれば幸いです。

次の記事は @kimuras さんです。引き続きお楽しみください。