---
title: "PicoRubyKaigi 2026 Assembleレポート —— 展示、登壇、運営"
source: "https://tech.smarthr.jp/entry/2026/11/13/102559"
publishedDate: "2026-11-13"
category: "design"
feedName: "SmartHR Tech Blog"
author: "n-inao"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://tech.smarthr.jp/entry/2026/11/13/102559)

SmartHRは、2026年10月31日（土）に東京・[浅草橋ヒューリックホール＆カンファレンス](https://hulic-hall.com/)で開催された「[PicoRubyKaigi 2026 Assemble](https://picorubykaigi.org/)」に協賛してブースを出展し、7名が参加しました。また、プロダクトエンジニアのydahが登壇し、オーガナイザーも務めました。この記事では、その模様をお届けします。

## 目次

-   [目次](#目次)
-   [PicoRubyKaigi 2026 Assembleとは](#PicoRubyKaigi-2026-Assembleとは)
-   [展示](#展示)
    -   [FemtoRubyで3Dアニメーション（ydah）](#FemtoRubyで3Dアニメーションydah)
    -   [PicoRubyで作ったFIDO2セキュリティキー（nori）](#PicoRubyで作ったFIDO2セキュリティキーnori)
    -   [PicoRubyのサイクルコンピュータとFemtoRubyのライフゲーム（kinoppyd）](#PicoRubyのサイクルコンピュータとFemtoRubyのライフゲームkinoppyd)
    -   [PicoRubyで書いたゲームが動く自作ゲーム機（NGT）](#PicoRubyで書いたゲームが動く自作ゲーム機NGT)
-   [登壇](#登壇)
    -   [「$ brew update」（ydah）](#-brew-updateydah)
-   [運営](#運営)
    -   [オーガナイザー（ydah）](#オーガナイザーydah)
-   [まとめ](#まとめ)
-   [We Are Hiring!](#We-Are-Hiring)

## PicoRubyKaigi 2026 Assembleとは

PicoRubyKaigi 2026 Assembleは、マイコンで動く軽量なRuby実装「[PicoRuby](https://picoruby.org/)」をテーマにしたカンファレンスです。キーノートには、PicoRubyの作者の[hasumikin](https://github.com/hasumikin)さんと、mrubyの作者の[まつもとゆきひろ](https://github.com/matz)さんが登壇しました。トークのほかに、展示された作品を見ながら作者と話せるショーケースセッションもあり、当日は約100名が参加しました。

SmartHRは、Picoスポンサーとして[協賛](https://picorubykaigi.org/sponsors/)し、ブースを出展しました。

[picorubykaigi.org](https://picorubykaigi.org/)

## 展示

SmartHRのブースでは、メンバーがPicoRubyやFemtoRubyで自作した作品を展示し、来場した方に作品を手に取って試してもらいました。

![SmartHRのブースの机の向こうで、白いSmartHRのパーカーを着た3人が、机に並んだ作品を両手で指し示している](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201538.jpg)

SmartHRブースの様子

![SmartHRのロゴ柄のテーブルクロスの上に、白いホイール、ゲーム機の基板、液晶をつないだブレッドボード、ノートPCが並び、それぞれに手描きのPOPが添えてある](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201546.jpg)

展示した作品と手描きのPOP

![帽子をかぶったNGTが自作ゲーム機を手に持って説明し、来場した方たちがのぞき込んでいる。奥にはnoriが立っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201554.jpg)

来場した方に自作ゲーム機を紹介するNGT（右手前）

以降では、展示した作品を作者が紹介していきます。

### FemtoRubyで3Dアニメーション（ydah）

こんにちは。SmartHRでプロダクトエンジニアをしている[ydah（わいだー）](https://github.com/ydah)です。

私が展示した作品は、小さな液晶ディスプレイで立方体や赤い宝石がくるくる回る3Dアニメーションです。 3Dの座標計算から液晶への描画まで、[FemtoRuby](https://github.com/picoruby/picoruby#femtoruby)で実装し、Raspberry Pi Pico 2 Wで動かしました。

立体は、頂点の3次元座標と、どの頂点を結んで面を作るかを配列で定義しています。各フレームで頂点を回転させ、奥にあるものほど小さく見えるように、画面上の2次元座標へ変換します。 さらに、視点と反対側を向いた面は描かず、光に対する面の向きで色の明るさを変えて、立体感を出しています。回転に使う三角関数の値はあらかじめ表にしておき、回転や座標変換の計算は整数演算で行っています。

液晶への描画では、画像を保持するためのメモリを抑える工夫をしました。画面全体の画像をメモリに持つ代わりに、横1行分の画素データを作っては液晶に送っています。前のフレームと次のフレームが収まる長方形の範囲だけを描き直し、前のフレームを消しながら次のフレームを表示しています。

![ブレッドボードのマイコンにつないだ小さな液晶ディスプレイに、青い立方体が表示されている。手前に「FemtoRubyで3Dアニメーション！」と書いたPOPがある](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201611.jpg)

FemtoRubyで3Dアニメーション

### PicoRubyで作ったFIDO2セキュリティキー（nori）

SmartHRでIdP（Identity Provider）を作っている[nori](https://x.com/se4weed_dev)です。最近はPicoRubyでハードウェアトークンを作るのにハマっています。

展示したのは、PicoRubyで作ったFIDO2セキュリティキーです。RP2350を載せたボードがハードウェアトークンとして振る舞い、ブースでは、ノートPCのブラウザからSmartHRにパスキーでログインするデモをしました。実装は[picoruby-fido2](https://github.com/se4weed/picoruby-fido2)で公開しています。

現状は、RP2350が備えるSecure BootやTrustZoneといったセキュリティ機能も、鍵を安全に保管する外部チップ（Secure Element）も使っていないので、耐タンパー性（物理的な攻撃や改ざんへの強さ）はありません。今後は、このハードウェアトークンに耐タンパー性を持たせることに取り組みます。また、picoruby-fido2を、[pico-fido](https://github.com/polhenarejos/pico-fido)のようにさまざまなFIDO2の機能を備えた、PicoRubyでFIDO2デバイスを作るための汎用的なライブラリに育てていきたいです。

PicoRubyKaigi 2026 Assembleは、自作カーネルやNode-RED、ビール醸造、AIまで、トークの話題が幅広く、いくつものカンファレンスに出たような満足感がありました。めちゃくちゃ楽しかったので、来年も参加したいです！

![ノートPCの手前に、マイコンボードを載せたブレッドボードと、「PicoRubyでログイン！（パスキー）」と書いたPOPが置いてある](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201619.jpg)

PicoRubyで作ったFIDO2セキュリティキー

### PicoRubyのサイクルコンピュータとFemtoRubyのライフゲーム（kinoppyd）

SmartHRでプラットフォームエンジニア（自称）をやっています[kinoppyd](https://twitter.com/GhostBrain)です。PicoRubyがめっちゃ好きなので参加しましたが、めっちゃ楽しかったです。

私が展示したのは、[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)での私の登壇テーマである、「[チャリンコオブザーバビリティ](https://www.docswell.com/s/kinoppyd/5Q2EG3-charinko-observability)」で実際に作成したPicoRuby製のサイクルコンピュータです。スペース的な理由で自転車を持ち込むわけには行かなかったので、車輪を模したよくわからない回転する塔みたいなものを3Dプリンタで作成し、それにセンサを付けてぶん回してスピードメーターが変化する様子などをデモしていました。

他にも、子どものために作ったひたすらライフゲームが表示され続けるFemtoRuby製のライフゲームディスプレイも展示しました。RP2040だと200x200のライフゲームを毎フレーム計算するのもけっこう大変なんですよね……。Codexにめっちゃ最適化してもらいました。

PicoRubyは、皆さんおっしゃっているとおり、普段は画面の向こうで完結するプログラミング言語を現実の世界とリンクさせる最高のツールです。その最高がたくさん展示されたりトークされたりする会議は、本当に最高です。たくさんの「うわ、マジかよ、すげえ」に物理的に出会える最高の会議でした。来年も楽しみ。

![白いホイールを載せた台の手前に、丸い液晶が2つ付いた基板と、小さな液晶に点が散らばって表示されたブレッドボードが並び、「サイクルコンピュータとLifeGame」と書いたPOPが添えてある](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201627.jpg)

サイクルコンピュータとライフゲーム

### PicoRubyで書いたゲームが動く自作ゲーム機（NGT）

こんにちは！ SmartHRで労務基本機能の開発をしている[NGT（ながた）](https://x.com/pyayy)です。

私が展示した「PicoRubitto」は、PicoRubyで書いたゲームを実機とブラウザの両方で動かせるゲーム開発プラットフォームです。当日は自作のゲーム機を持ち込み、カードを入れ替えながら、野球、イカ釣りゲーム「[IKATSURUBY](https://tech.smarthr.jp/entry/2026/04/17/173335)」、3D空戦ゲーム、サンドボックスゲームなどを遊んでもらいました。

来場した方には、3D空戦ゲームで3Dがちゃんと動くところをほめてもらえました。6時間はんだ付けした甲斐がありました！ 次は基板の作り方も覚えたいです。

![ボタンと小さなカラー液晶を付けた緑の基板に、ブロックを置いて遊ぶゲームの画面が映っている。奥に「自作ゲーム機 PicoRubyで書いたゲームが動きます」と書いたPOPがある](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201635.jpg)

PicoRubyで書いたゲームが動く自作ゲーム機

## 登壇

SmartHRからは、ydahが「$ brew update」というタイトルで登壇しました。

### 「[$ brew update](https://picorubykaigi.org/schedule/ydah/)」（ydah）

展示に続いてydahです。

「$ brew update」では、ビール醸造の記録をPicoRubyで残す取り組みを紹介しました。 なお、注意点として醸造では、アルコール度数を1%未満になるように調整しています。 日本では、アルコール度数1%以上の飲料は酒税法上の酒類に当たり、製造には酒類製造免許が必要です（[国税庁「自家醸造」](https://www.nta.go.jp/taxes/sake/qa/06/34.htm)）。

私が記録したいのは、材料や分量をまとめたレシピだけではわからない、醸造中の変化です。 PicoRubyを使って温湿度センサーで容器の表面温度や室温を記録し、ボタンを押すと作業のタイミングだったり、醗酵の様子を記録できる仕組みを作りました。 発表では、何を測っているのか、どうすれば欲しいデータを得られるのか、試行錯誤しているところもお話ししました。

今年ずっと取り組んできた、自分にとってライフワークのような活動をお話しできたのが、まず何よりうれしかったです。 今回はエコシステムに関する発表が多かった印象ですが、その中で「PicoRubyを使うと、こんなアプリケーションも作れるんだ」という具体例を紹介できたのも良かったです。

発表後には多くの方に声をかけていただき、どうすればうまく測定できるか、どんな方法が考えられるかを一緒に議論できたのが本当に楽しかったです。 自分の取り組みを話したところから新しいアイデアが生まれ、ここで発表できて良かったなと感じています。

![会場の前方で、ydahが演台に立って話している。スクリーンには「$ brew update」と書かれたスライドが映り、手前に聴講者が並んでいる](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201650.jpg)

「$ brew update」を発表するydah

![ydahが演台でマイクを持ち、片手を上げて話している](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201658.jpg)

登壇するydah

## 運営

SmartHRからは、ydahがPicoRubyKaigi 2026 Assembleのオーガナイザーを務めました。

### オーガナイザー（ydah）

引き続きydahです。 私はオーガナイザーとして、広報やスポンサー対応、会計周りを中心に担当しました。

チーフオーガナイザーのmakicamelさんにずっとPicoRubyKaigiやりましょうよと声をかけ続けていたので、今回の開催に至ったのは感慨深いです。随所にPicoRubyKaigiらしさがあって、素敵なカイギになったなと感じています。

来年はPicoRubyKaigi 2027 Binaryということで楽しさもワクワクも倍なり〜ということで、皆様とまたお会いできるのを楽しみにしています。

![PicoRubyKaigi 2026 Assembleのオーガナイザーが、ロゴやピクセルアートのアイコンをあしらった大きな布を広げて、会場の前方に並んでいる](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201706.jpg)

オーガナイザーとして前方に並んだydah（中央）

## まとめ

さて、PicoRubyKaigi 2026 Assembleも無事に終了し、展示や登壇、運営を通じて多くの学びや交流がありました。運営の皆様、他社のスポンサーの皆様、登壇者の皆様、参加者の皆様に心から感謝申し上げます。 来年のPicoRubyKaigi 2027 Binaryもとっても楽しみです。皆様とまたお会いできるのを心待ちにしています。

## We Are Hiring!

SmartHRでは、PicoRuby好きな仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)

![PicoRubyKaigi 2026 Assembleの看板を囲んで、SmartHRのメンバー7人が、親指を立てたりピースをしたりして写っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261104/20261104201643.jpg)

みんなで記念撮影

撮影：inao