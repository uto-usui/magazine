---
title: "コンポーネントを公開している海外テック企業のデザインシステムを55個集めた"
source: "https://zenn.dev/bigtree/articles/design-system-components-list"
publishedDate: "2026-10-06"
category: "design-systems"
feedName: "Zenn designsystem"
author: "bigtree"
---

バイブコーディングでUIを作っていると、できあがった画面のAI感が強くて、なんだか違うと感じることがあります。そういうときに、企業のデザインシステムを使ってみたくなります。

いちばんよく見かけるのは、Vercelのv0でも使われているshadcn/uiだと思います。では、ほかにどんなものがあるのか。そんな興味から調べてみました。

公開されているデザインシステムの一覧としては [awesome-design-systems](https://github.com/alexpate/awesome-design-systems) がよく知られていて、GitHubのスターは2.6万あります。

ただ、中身を一つずつ確認してみると、古くなっている箇所がいくつかありました。Cloudflareのリンク先は、2019年から更新が止まってアーカイブされたリポジトリです。MongoDBのリンクは404でした。

反対に、活発に開発されているのに載っていないものもあります。ByteDanceのArco Design、TencentのTDesign、Red HatのPatternFlyなどです。

そこで、コンポーネントのソースが公開されているものだけに絞って、リストを作り直しました。

## 載せる基準

載せる条件は次の4つです。

-   テック企業が作って保守している
-   コンポーネントのソースが公開されている
-   ブラウザで実際に触れる
-   リポジトリがアーカイブも非推奨もされていない

AppleのHuman Interface Guidelinesのように、ガイドラインだけのものは対象外にしました。一方で、更新が少し止まっているだけのものは外していません。完成して安定したのか、放置されたのかは、外からは見分けられないからです。

基準を満たさなかった有名どころは、READMEの「Not listed」に理由と一緒に載せました。たとえばPinterestのGestaltは、READMEで「end of life」と宣言されています。ShopifyのPolarisは、React版がアーカイブされていました。

## 気になった10個

55個の中から、特徴がはっきりしていて気になったものを10個紹介します。

### AWS: Cloudscape

READMEによると、AWSの製品やサービスのために2016年に作られたデザインシステムです。テーブルやフィルター、ウィザードなど、管理画面でよく使う部品が揃っています。各コンポーネントのページにはPlaygroundタブがあり、その場でpropsを変えて動きを確かめられます。

### AWS: Amplify UI

AWSのもう1つのUIライブラリです。ボタンなどの基本的な部品のほかに、「クラウドにつながったコンポーネント」を持っています。代表例のAuthenticatorは、ログイン画面をまるごと提供するものです。

同じAWSでも、管理画面の部品を揃えたCloudscapeとは役割がかなり違います。対応しているのはReact、React Native、Vue、Angularです。

### Adobe: React Spectrum

Adobeのアプリ全体で使われているデザインシステム、SpectrumのReact実装です。土台には、見た目を持たないReact Ariaがあります。React Ariaは単体でも使えるので、アクセシブルな部品を自分のデザインで作りたいときの選択肢になります。

### Uber: Base Web

UberのReactコンポーネントライブラリです。決済カードや電話番号、ピンコードの入力欄など、Uberのサービスで使いそうな部品が入っています。

見た目の細かい部分は「Overrides」という仕組みで差し替えます。ほかのライブラリとカスタマイズの考え方を比べてみると面白いです。

### Atlassian: Atlassian Design System

JiraやConfluenceのUIです。各コンポーネントのUsageページには、Do/Don'tの例つきで具体的なガイドがあります。

ボタンのページなら、アクションにはボタンを、画面遷移にはリンクを使うように書かれています。無効化したボタンにツールチップを付けない、ラベルはsentence caseにする、といった細かい決まりもあります。

55個の中で、ソースをGitHubではなくBitbucketで公開しているのはAtlassianだけでした。

### ByteDance: Semi Design

抖音（中国版TikTok）のフロントエンドチームが作っているデザインシステムです。READMEによると、デザイントークンは3000個以上あります。

FigmaのデザインをコードにするD2C（Design to Code）のプラグインも用意されています。デザインとコードをつなぐ部分に力を入れているようです。

### ByteDance: Arco Design

ByteDanceのもう1つのデザインシステムで、ライセンスの著作権表記はByteDance本体です。React版のほかに [Vue 3版](https://github.com/arco-design/arco-design-vue) もあります。

AWSのように役割の違う2つを持つ会社はほかにもあります。ただ、SemiとArcoはどちらも汎用的なReactのライブラリで、役割がよく似ています。同じ会社の別チームが、似たものをそれぞれ公開しているのは珍しいと思います。

### Tencent: TDesign

対応している環境の広さが目立ちます。React版のほかに、[Vue 3版](https://github.com/Tencent/tdesign-vue-next)、[WeChatミニプログラム版](https://github.com/Tencent/tdesign-miniprogram)、[Flutter版](https://github.com/Tencent/tdesign-flutter) がそれぞれ別のリポジトリで公開されています。ミニプログラム版があるのは、WeChatを持つTencentならではです。

### Coinbase: CDS

Web、React Native、Android、iOSを1つのリポジトリで開発しています。リポジトリには `mcp-server` というパッケージもあります。

READMEによると、MCPサーバーの中身はドキュメントサイトから作られます。そのドキュメントは、パッケージのソースコードから作られています。ソースコードを書き換えれば、AIエージェントが参照する情報まで一続きで更新される仕組みです。

### Cloudflare: Kumo

Cloudflareのコンポーネントライブラリです。awesome-design-systemsに載っているのは更新の止まった旧版で、Kumoはまだ載っていません。

READMEによると、KumoはBase UIの上に作られています。キーボード操作やフォーカス管理、ARIA属性の扱いはライブラリ側が引き受けてくれます。Base UIの部品も、そのまま再エクスポートされています。

## おわりに

調べていて懐かしくなったのがAWSです。以前AWSとAmplifyを使っていたので、Amplify UIのAuthenticatorを見て「認証画面はこんな感じだったな」と思い出しました。

普段使っているサービスのUIが出てくるのも楽しいところです。Atlassianは仕事で使っているので、ドキュメントを見ているだけでテンションが上がりました。Base Webは、Uber Eatsを使っているときの感覚が残っていて面白かったです。たとえばButton Timedは、数秒たつと自動で次に進むボタンです。Uber Eatsで注文したあとの画面は、まさにこれだなと思いました。

見た目でいちばん好みだったのはByteDanceの2つで、自分でも試してみたいと思いました。Kumoは少し立体感のあるデザインで、ほかとは雰囲気が違います。こちらも使ってみたいです。

同じボタンでも、各社がどんな画面を想定しているかで、ドキュメントの書き方がかなり違います。気になったものがあれば、デモページで実際に触ってみてください。リストに足りないものがあれば、リポジトリへのPRも歓迎です。