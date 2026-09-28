---
title: "Three.js Conf Paris 2026参加レポート"
source: "https://ics.media/entry/260925/"
publishedDate: "2026-09-24"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2026年9月10日・11日の2日間、パリで「[Three.js Conf Paris 2026](https://threejs.paris/)」が開催されました。JavaScriptの3Dライブラリー「[Three.js](https://threejs.org/)」のはじめてのカンファレンスです。ICSは日本から渡仏し、現地のイベントに参加しました。本記事では、印象に残った発表やイベントの様子をレポートします。

参加して感じたことは、次の3つです。

-   3D表現の**クリエイティブと技術の両方**を学べるイベントだった
-   著名なライブラリー開発者やクリエイターと交流できうれしかった
-   海外カンファレンスならではのパワーとカルチャーが楽しかった

### カンファレンスの概要

会場は、パリ市内の会議施設「[Maison de la Chimieメゾン・ド・ラ・シミー](https://maisondelachimie.com/evenementiel-paris/qui-sommes-nous/)」です。名前はフランス語で「化学会館」を意味し、学術会議やセミナー、展示会などに使われている場所です。今回のカンファレンスに参加したのは550人だったそうです。

▼開場前の参加者の列。参加前はどんな場所で開催されるかわからなかったので、ドキドキしながら向かいました

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_venue-exterior.avif)

▼会場の入口

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_venue-entrance.avif)

▼格式の高そうな講演会場

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_conference-hall.avif)

### 印象に残った発表

参加前はエンジニア向けの技術的なカンファレンスを想像していたのですが、アワード（[FWA](https://thefwa.com/)、[Awwwards](https://www.awwwards.com/websites/sites_of_the_month/)等）で知られるサイトの制作者による登壇も多く、**クリエイティブ系のカンファレンスを思わせる雰囲気**でした。

どの発表も刺激的だったので、とくに注目したセッションを紹介します。

#### Mr.doobさん：制作ツールの変化とAI

Three.jsの作者である[Mr.doobミスタードゥーブさん](https://x.com/mrdoob)は、AIとの向き合い方について語りました。

かつて画像の輪郭を滑らかに見せるアンチエイリアスを、1ピクセルずつ手作業で描いていた経験も紹介されました。そうした作業をツールに任せられるようになった変化を振り返り、AIの登場も制作方法の変遷のなかで捉えていました。

-   時間がかかるために後回しにしていたアイデアを、今はAIで試せるようになった
-   AIが登場して、抽象化のレベルが1つ上がった
-   でもいつでもコードを読んだり書いたり抽象レベルを下げることもできる
-   AI時代も好奇心があれば大丈夫

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_stay-curious.jpg)

**感想**

Three.jsの最新機能を紹介するのかと思いましたが、マインドを伝えるようなセッションでした。ライブラリー作者が到達した世界をのぞき見ることができ、興味深い内容でした。

#### 万博の展示を支える3D最適化

[UTSUBO](https://www.utsubo.com/)の[Renaud Rohlingerルノー・ローリンガーさん](https://x.com/onirenaud)による「Performance and Tricks」では、大阪・関西万博向けの展示「Waves of Connection」の最適化が紹介されました。

葛飾北斎の波をモチーフに、体の動きに応じて粒子の波が変化する作品。[制作元の解説](https://www.utsubo.com/blog/hokusai-interactive-installation)によると、Three.jsと[WebGPU](https://ics.media/entry/230426/)で**最大約100万個の粒子**を動かしています。

描画負荷をミリ秒単位で計測し、ドローコールや深度処理などを段階的に改善していく内容でした。[粒子を1枚の三角形とシェーダーで球に見せる手法](https://threejs-blocks.com/docs/blocks/sphere-impostors)でポリゴン数を減らしても、粒子が重なる部分の計算負荷が課題になったそうです。そこで、方向転換し、各ピクセルに見える粒子のIDと深度を先に記録し、色や陰影を計算する方式へ切り替えた経緯を解説していました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_utsubo-optimization.jpg)

取り組まれた技術手法は『[Three.js BLOCKS](https://threejs-blocks.com/)』でライブラリーとAI用スキルとして公開されており、[デモ](https://threejs-blocks.com/examples)でも確認できます。

RenaudさんのXの投稿で、講演も視聴できます。

**感想**

とてもおもしろい内容だったので、講演のビデオを何度も見返しました。内容は専門的ですが、「**このために、Three.js Confに参加した価値があった**」と感じた神セッションでした。プレゼンも3Dで作られており圧巻です。

#### ウェブ体験をつくる7つの鉄則

Three.jsの学習サイト『[Three.js Journey](https://threejs-journey.com/)』はThree.jsを学ぶ上での必須のオンライン教材。その作者の[Bruno Simonブルーノ・シモンさん](https://x.com/bruno_simon)の発表です。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_bruno-simon.jpg)

「**情報を提供するだけの静的なウェブサイトは、誰の記憶にも残らない**」という強烈な問題提起から切り出し、記憶に残るウェブ体験をつくるための7つの鉄則を紹介されました。

1.  **すべてに動きをつける**
    -   イージングや慣性を活かした「有機的な生命感」をもたせることが重要
    -   クリックやホバー演出は「0.3秒ルール」を徹底し、0.3秒を超える遅延はストレスと没入感の阻害につながると警告
2.  **どの端末でも滑らかに動かす**
    -   30fpsに低下した瞬間、ユーザーの没入体験は台無しになり離脱を引き起こす
    -   AIはフレームレート改善のためのパフォーマンス最適化が苦手
    -   必ずパフォーマンス最適化のための時間を織り込んでおくこと
3.  **独自の特徴をひとつもつ**
    -   そのサイトを象徴する操作や仕掛けを用意する
4.  **素早く試行錯誤する**
    -   画面上で数値を調整し、アイデアをすぐ試せるようにする
5.  **楽しませ続ける**
    -   操作前の障壁を減らし、探索や遊びの余地を残す
6.  **サウンドをおまけではなくコア機能として扱う**
    -   足音・操作音・環境音・音楽も、体験の一部として設計する
7.  **早く種をまき、時間をかけて育てる**
    -   ゲームや映画などから着想をため、作品を育てる
    -   見たものをコピーすることも悪くはなく、やがて独自のアイデアにつながる

#### アニメ風の3D表現

[Vicente Lucendoビセンテ・ルセンドさん](https://x.com/vlucendo)は、日本のアニメを思わせる3D作品『[Messenger](https://messenger.abeto.co/)』の制作過程が紹介しました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_messenger.avif)

1980年代のアジアや日本の映像、アニメ、来日時の写真を参考にしたそうです。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_messenger-inspiration.webp)

海外で言葉がわからない感覚を表すため、漢字やハングルを思わせる独自のフォントも用意していました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_messenger-typography.webp)

サイトの構築にはAIを使わなかったことで、かなり時間がかかったそうです（4〜5か月）。もしAIを使っていたら、逆説的にこんなに時間をかけた壮大なゲームにはならなかったかもしれない、とのこと。

**感想**

フロントエンド開発では「AIを使うことが正義」みたいな時流があるなかで、AIを使わない開発の話をされているのが印象的でした。感性を大事にすることへの言及があり、クリエイティブに必要なことを考えさせられました。

#### 写実的な3D表現と軽量化

ブラジルから来た[Anderson Manciniアンダーソン・マンチーニさん](https://x.com/Andersonmancini)は、WebGPUを使った制作の工夫が紹介しました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_production-webgpu.jpg)

『[Planpoint 3D Archiviz](https://planpoint-webgpu.vercel.app/)』を例に、色収差、被写界深度、レンズフレアといった写実的な仕上げの工夫を解説。光源やポストエフェクトにかかる負荷を見積もり、画づくりと描画速度のバランスを取る考え方も示されました。

最適化の鍵となったのが「[Octahedral impostorsオクタヘドラル・インポスターズ](https://github.com/ektogamat/octahedral-impostor-component)」という手法です。3Dモデルを複数の角度から描画し、その画像を1枚のテクスチャーアトラスにまとめます。見る方向に合わせて画像を選び、平面に表示することで、大量の木などを少ないポリゴンで表現します。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_tree-impostors.jpg)

**感想**

Andersonさんは3Dを学び始めて5年という話をされていて、こんな短期間で3Dのスキルを身につけられるのかと驚きました。1日16時間、取り組んでいたそうです…！

ICS MEDIAの『[簡単で効果大！ Three.jsのポストプロセスで映える3D表現](https://ics.media/entry/251113/)』の冒頭で紹介した『[WindLand](https://windland-neotix.vercel.app/)』を作った方だったと知り、感動しました！

#### 次期バージョン「GSAP 4」の発表

アニメーションライブラリー「[GSAPジーサップ](https://gsap.com/)」のセッションでは、[Cassie Evansキャシー・エヴァンスさん](https://x.com/cassiecodes)が、現行のGSAP 3に続く次期バージョン「GSAP 4」を発表しました。[GSAP 3が公開されたのは2019年11月](https://gsap.com/blog/3-release-notes/)で、約7年ぶりのメジャーバージョンアップに向けた告知です。

カンファレンスの場で新機能が発表されるのはワクワクしました！

#### Anime.jsのアニメーションエディター

ライトニングトークは、1人2分。短い時間で次々と登壇者が入れ替わるプログラムでした。

なかでも目を引いたのが、アニメーションライブラリー「[Anime.jsアニメジェイエス](https://animejs.com/)」の作者、[Julian Garnierジュリアン・ガルニエさん](https://x.com/JulianGarnier)によるエディターのデモです。タイムライン上でアニメーションを編集し、Anime.jsのコードを生成するツールが披露されました。

### 会場の装飾とグッズ

会場の装飾やグッズにも手が込んでいました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_venue-art-direction.webp)

アートディレクションを担当した[Hervé Studio](https://herve.paris/)は、公式サイトからグッズまで約7か月をかけて準備したそうです。初期のコンセプトを見直し、開催前からコミュニティーの盛り上がりを感じられるサイトを目指した、という過程も紹介されました。

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_venue-3d-layout.jpg)

▼ロビーのステージ ![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_panel-discussion.avif)

▼参加証 ![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_badge.avif)

登壇者向けには電子デバイス型の参加証が配られ、今回のイベント専用のデジタルコンテンツが搭載されていました。

まさかの手作りで、動くようになったのは開催の約1か月前だったそうです。

### 船上でのアフターパーティー

2日目の夜には、セーヌ川でアフターパーティーが開催されました。船上パーティーという特別感がすごかったです！

▼イベントの装飾が施された、船内のバーカウンター

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_afterparty-bar.avif)

▼アフターパーティーの会場

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_afterparty-venue.avif)

### 参加者・登壇者との交流

主催者の[David Ronaiデイビッド・ロナイさん](https://x.com/makio64)ともお話ししました。Davidさんは公式サイトの実装も手がけていて、[解説記事](https://tympanus.net/codrops/2026/02/28/when-community-becomes-ui-building-the-website-for-the-first-three-js-conference/)では[圧縮テクスチャー](https://ics.media/entry/17863/)や[オフスクリーンキャンバス](https://ics.media/entry/19043/)などを活用した最適化を紹介しています。また、[HTML-in-Canvas](https://ics.media/entry/260825/)の先行導入など、Three.js関連の技術をフルに活かされています。

旅行中もパソコンでプログラミングに取り組まれていたそうで、このイベント開催のためにかけていたパワーは相当のものだったようです。

会話の途中で私が「clockmaker」だと気づくと、Davidさんは大興奮。「Clockmakerだったなんて！！」「作品からたくさんインスピレーションを受けてとても感謝してる！」と何度も伝えてくれました。Flash時代の作品を知る友人たちにも紹介してくれました🤣

Mr.doobさんやDavidさんとも記念写真を撮りました。

また、多くの方々とも交流しました。

-   GSAPのCassieさん
    -   GSAPのチュートリアルビデオでおなじみ。本人に会えたことでうれしく声をかけました。日本で[GSAPのチュートリアル記事](https://ics.media/entry/220822/)を書いていると自己紹介したら、残り3つだったというGSAPのバッグもいただきました。
-   Anime.jsのJulianさん
    -   会期中に2回も話しかけてくれ、ライブラリーの話や、日本とパリの違いについて、たくさんお話ししました。
-   [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)の開発に携わる[Dennis Smolekデニス・スモレックさん](https://x.com/dennissmolek)
    -   普段は日本に住まれているということで、楽しく話をしました！
-   カナダから参加した[Shopify](https://www.shopify.com/)の方々
    -   スペシャルサイト『[Shopify Live Globe 2025](https://bfcm.shopify.com/2025/)』を制作した方々です。Shopifyでは『[Shopify Editions | 26年冬](https://www.shopify.com/jp/editions/winter2026)』など、ここ数年すごいスペシャルコンテンツが続いています。こうしたサイトは普段から約2か月で制作していて、その間はものすごく忙しいそうです。それにしても、あのコンテンツを2か月で作るのがすごい！
-   [Away3Dアウェイスリーディー](https://github.com/away3d/away3d-core-fp11)の開発者、[Rob Batemanロブ・ベイトマンさん](https://x.com/robnet)
    -   FlashやWebGL向けの[Away3D](https://github.com/awayjs/awayjs-full)の開発者です（[大変お世話になっていました](https://clockmaker.jp/blog/2012/07/away3d-4-gold/)）。会場ではお会いできなかったのですが、参加されていたことをイベント後に知り、Xでメッセージをやり取りしました。

▼セーヌ川での船上パーティーで記念写真

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_afterparty-group.jpg)

#### Flashへの想い

イベントを通して、Flashへの言及が多かったです。

[wonderfl](https://www.kayac.com/service/other/94)などの日本発のFlash投稿サービスや、[Saqooshaさん](https://saqoo.sh/a/)など日本のクリエイターも会話のなかで出てきました。[城戸さん](https://roxik.com/)の2009年のFlashサイト『[全日本バーベイタム選手権](https://www.youtube.com/watch?v=BXVwjs083hI)』もBrunoさんのスライドで一瞬紹介されていました。

Flash時代は日本のクリエイティブなサイトが注目されていたんだなぁと懐かしく思いました。

### ライブ翻訳で海外セッションが身近に

Apple純正の「[翻訳](https://support.apple.com/ja-jp/123185)」アプリとGoogle翻訳アプリには、どちらにもライブ翻訳機能があります（Google翻訳は[2026年3月から搭載](https://blog.google/intl/ja-jp/products/explore-get-answers/live-translate-with-headphones/)）。

今回の聴講では、AirPods Proとライブ翻訳が役立ちました。両アプリを使い比べると、Google翻訳のほうが自然な翻訳で、精度がよいと感じました。

各セッションは英語とフランス語の発表でしたが、いずれも4〜8割は内容を受け取れたように思います。海外カンファレンスのハードルが下がったように感じます。

### おわりに

![](https://ics.media/entry/260925/images/260925_threejs-conf-paris_closing.avif)

参加してよかったと思える2日間でした。ICSではアメリカへのカンファレンス参加は過去に何度もありましたが（[参照](https://ics.media/entry/tag/AdobeMAX/)）、ヨーロッパ方面ははじめて。2026年2月にイベントのことを知り、半年ほどの期間で出張の準備をしました。

円安の影響もあって費用は安くありませんでしたが、それでも「**また参加しなければ！**」と思っています。

日本の技術やクリエイティブに関心を寄せてくれる方もいて、地理的には遠くても、制作に関わる人たちとの距離は近いと感じました。次回の開催を期待しつつ、日本からの参加者も増えるといいなと思っています！