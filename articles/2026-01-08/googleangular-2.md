---
title: "GoogleがAngular 2を正式リリース！ 未来のウェブ標準を意識した新しいフレームワーク"
source: "https://ics.media/entry/13269/"
publishedDate: "2016-09-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2016年9月16日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

グーグルが開発するJavaScriptフレームワークAngularの最新バージョン「[Angular 2アンギュラー・ツー](https://angular.io/)」が本日、正式リリースされました。

![](https://ics.media/entry/13269/images/160915_angular2_official_site.jpg)

Angular 2はSPAエスピーエー（シングル・ページ・アプリケーション）の開発に利用するフレームワーク。[AngularJS](https://angularjs.org/)の後継にあたります（バージョン1.x系ではJSフレームワークとしてAngularJSアンギュラー・ジェイエスという名称でしたが、バージョン2からはJSに限定しないフレームワークとなったためAngularという名称になっています）。

AngularJSはMVWフレームワークとして2010年にグーグルよりリリースされ、多くのウェブサイトで採用されてきました。**新バージョンではアーキテクチャーの一新により、ウェブ標準が意識され、パフォーマンスが向上**。今後はウェブサービスやエンタープライズ、広告系スペシャルサイトでの利用拡大で期待されます。

※SPA（シングル・ページ・アプリケーション）とはフロントエンドのトレンドとして注目を集めているWebアプリケーションのアーキテクチャーです。SPAでは、ウェブページ全体をロードすることがなく、レスポンスが高速でUIが優れているという利点があります。

### Angular 2リリースまでの長い道のり

Angular 2の開発は2014年9月に発表されました。開発は2年もの長期間にわたっており、アルファ版がalpha.55まで（2015年12月まで）、β版がbeta.17まで（3月まで）、RC版がRC7まで（9月まで）リリースされています。

![](https://ics.media/entry/13269/images/160915_angular2_github.png)

▲GitHubのリポジトリのコミットとリリースの数は、長い期間の開発を物語っている

その間、幾度もアーキテクチャーの変更やAPIの破壊的変更（従来とは互換性のない変更）が行われていました。たとえばルーター（ディープリンクを発行する画面遷移機能）は、「New Router」「Component Router」「Router v2」「Router v3」とリリースまでに何度も一新されその度に大きな変更を伴ってきました。**よりよいアーキテクチャーへ取り組むAngularチームの徹底した姿勢が伺えます**。

![](https://ics.media/entry/13269/images/160915_angular2_router.jpg)

▲ディープリンクの発行によって、SPAでも深い画面へのリンクが可能になる

### Angular 2になって何が変わるのか？

AngularJS 1.xリリース当時は最適なソリューションを提供していたものの、時代の流れとともにアプリケーション開発者が直面する課題や、デバイスの高度化などによって求められているものが変化してきました。たとえば、AngularJS 1.xでは動作が重たい、記述ルールが複雑といった課題がありました。

AngularJS 1.xに対する大きな変更点として、[TypeScriptタイプ・スクリプト](https://www.typescriptlang.org/)での開発が推奨されています。TypeScriptはMicrosoftが開発しているプログラミング言語で、JavaScriptよりも多くの機能が搭載されています。たとえばAngular 2の開発ではTypeScriptのデコーレションを使うことでプログラミングの可読性が向上する利点があります。Angular 2の開発効率を最大限引き出すにはTypeScriptの採用が必須となるでしょう。

![](https://ics.media/entry/13269/images/160915_angular2_code.png)

▲Angular 2ではコンポーネントという単位でクラスを作成していく。コンポーネントにはデコレーションを使って振る舞いを定義。なお、TypeScriptのコードは、JavaScriptとして変換される

![](https://ics.media/entry/13269/images/160915_angular2_tutorial.png)  
▲Angular 2の公式チュートリアルはわかりやすく、機能がひととおり学べる

※JavaScriptやDartダート言語でもAngular 2の開発は可能です。ただ、チュートリアルの充実度やコミュニティーの情報量では、TypeScriptのほうが利点が大きいように思います。

Angular 2ではアーキテクチャーの変更に伴い、従来のAngularJS 1.xとはコードの作法や書き方が変わりました。AngularJS 1.5ではAngular 2へアップデートしやすいようにコンポーネントディレクティブが搭載されましたが、所感としてはほとんど別物であるため、基本的にすべて学び直す必要があるでしょう。

![](https://ics.media/entry/13269/images/160915_angular2_features.png)

▲ SPA開発に必要な機能が網羅されている（上図は一部）

### 未来のウェブ標準を意識したAngular 2

Angular 2のアーキテクチャーはウェブ標準に則った方針になっています。たとえば、ECMAScriptエクマ・スクリプト 2015やWeb Components、Web Animations API、Fetch API、Observablesなど、将来のウェブ標準を見据えた機能が搭載されています。今後、**標準となりうる技術を取り込むことによって、Angular 2特有の学習コストを減らせるという利点があるでしょう**。

また利用に際してはTypeScriptやSystem.jsなどもモダンな技術を扱います。HTML5 Experts.jpの記事「[Angular2は「モダンJavaScriptの学習セット」！エキスパートによるディスカッションが熱かった（詳細な注釈付き！）](https://html5experts.jp/shumpei-shiraishi/18659/)」では、**Angular 2を学べばモダンなJavaScriptをひととおり抑えられる**とも言及されています。

### 類似ライブラリ・フレームワークとの違い

有力な類似のフレームワークやライブラリには[React](https://facebook.github.io/react/)や[Polymer](https://www.polymer-project.org/1.0/)、[vue.js](https://ja.vuejs.org/)、[Riot.js](http://riotjs.com/ja/)などがあります。Angular 2は記事「[人気上昇中のJavaScriptライブラリを調べてみた【2016年版】 - Build Insider](https://www.buildinsider.net/web/popularjslib/2016)」によると、この分野でももっとも人気があると紹介されていました。

※検索結果だけで評価するのは安直なので、採用の際はGitHubのFav数やnpmでのダウンロード数なども含めて検討するといいでしょう

![](https://ics.media/entry/13269/images/160915_angular2_trend.png)

▲Google トレンドでの検索数の比較グラフ。青のラインがAngular、赤がReact、黄色がVue.js、緑がRiot.jsを示す

#### Angular 2はフルスタックであることが特徴

他のフレームワークと比較して**Angular 2の特徴としてあげられるのはフルスタックであること**です。たとえば、Reactだと表示を反映する機能しか持たないため、利用用途に応じて複数のライブラリを調査し、組み合わせる必要があります。しかし、**Angular 2ではすべての機能が提供されているため、フレームワーク1つだけで実装できます**。

※たとえば外部JSONファイルを読み込み画面に反映させたい場合、Reactには「読み込む」機能がないので[jQuery](https://jquery.com/)や[superagent](https://github.com/visionmedia/superagent)などを使ってJSONファイルを読み込みます。Angular 2だと内包の[HTTP](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html)モジュールでJSONファイルを読み込みます。

Angular 2の公式サイトの見出しには「One Framework」と謳われていますが、フルスタックなので他のライブラリを入れなくてもいいという意味があるそうです。

![](https://ics.media/entry/13269/images/160915_angular2_official_site.jpg)

※それぞれアーキテクチャーや方向性は異なり一長一短なので、どのフレームワーク、ライブラリを選択するかは、アプリケーションの種類や開発スタッフの状況によって慎重に検討するといいでしょう。

最近はReactの採用が拡大していたので、(必ずしも両者は競合しているとは思いませんが）今後のライブラリ・フレームワークのトレンドの変化は注目したいところです。

### Angular 2のこれから

Angular 2の今後の開発方針について、公式ブログでは次のようにアナウンスされています。

-   バグ修正と、互換性のある機能追加
-   ユースケースに特化した、ドキュメンテーションや作例の追加
-   アニメーションAPIの拡充
-   Angular Material 2（UIフレームワークの拡充）
-   実験機能だったWebWorkersを実装する
-   Angular Universalのための、機能追加と多言語対応
-   スピードの向上と読み込みサイズの改善

また、バージョン番号の更新については[Semantic Versioningセマンティック・バージョニング](http://semver.org/)にしたがって定めていきます。また、最低6ヶ月間は破壊的変更は行わず、メジャーバージョンを維持する計画だそうです。

1.  互換性のないAPIの変更が行われたときにメジャーバージョンがインクリメント
2.  下位互換性の機能が追加されたときにマイナーバージョンがインクリメント
3.  下位互換性のあるバグが修正されたときPATCHのバージョンがインクリメント

### Angular 2を先行導入してどうだったか

弊社でも2016年初頭から数々のプロジェクトで正式リリース前のAngular 2（ベータ版やRC版）を採用してきました。[Google Experimentsに掲載](https://www.chromeexperiments.com/experiment/particle-develop)されたウェブサイト「[Particle Develop](https://ics-creative.github.io/project-particle-develop/)」をはじめ、デスクトップアプリケーションの「[アニメ画像に変換する君](https://ics.media/entry/12746/)」「[WebP画像を作る君](https://ics.media/entry/11711/)」、筆者個人サイト「[ClockMaker Labs](http://clockmaker.jp/labs/)」はすべてAngular 2で開発しています。

![](https://ics.media/entry/13269/images/160822_flexbox_particledevelop.png)

▲「[HTML5製のデザインツール Particle Develop](https://ics-creative.github.io/project-particle-develop/)」の開発では、編集ツールの制御にAngular 2が活躍。作法が統一されるためコードの可読性が高くなり、複数人での共同開発がスムーズだった

![](https://ics.media/entry/13269/images/help-thumb.png)

▲「[アニメ画像に変換する君](https://ics.media/entry/12746/)」の開発では、Electronと連携。他のテクノロジーとの親和性も高いことが確認できた

![ClockMaker Labs](https://ics.media/entry/13269/images/160915_angular2_clockmaker.jpg)

▲「[ClockMaker Labs](http://clockmaker.jp/labs/)」では、クリエイティブなユーザーインターフェイスにAngular 2が利用できるのか検証したく導入した

柔軟な拡張性を持ちつつ機能が豊富でありワークフローが一貫していることから、カンファレンスng-japan 2016に筆者が登壇したときは「**Angular 2の採用は、SPA開発に秩序をもたらす**」と報告しました。

![](https://ics.media/entry/13269/images/160321_angular2-ng_japan.png)  
▲ng-japanでの発表資料「[クリエイティブの視点から探るAngular 2の可能性](http://www.slideshare.net/clockmaker_jp/angular-2-59811274)」。Angular 2採用によるメリットを紹介した

### 最後に

長らく正式リリースに至っていなかったためAngular 2は実案件で採用しにくいイメージがありました。**従来のAngularJS 1.x系のサイトのアップデートなど潜在的な需要もありますし、コンポーネント指向というトレンドもありAngular 2の採用が今後拡大していくことでしょう**。

ICS MEDIAではAngular 2に関するチュートリアルを充実させていく予定です。ぜひ今後ともICS MEDIAをチェックください。