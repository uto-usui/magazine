---
title: "関西Ruby会議09レポート —— 前夜祭、本編、Official Party"
source: "https://tech.smarthr.jp/entry/2026/07/30/120000"
publishedDate: "2026-07-30"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

SmartHRは、2026年7月18日に滋賀県・大津市伝統芸能会館で開催された[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)にSilver Sponsorとして協賛し、13名が参加、2名が登壇、1名が運営に携わりました。

この記事では、前後イベントも含め、その模様を[motty](https://x.com/8tako8tako8)と[udzura](https://github.com/udzura)で手分けしてお届けします！

![会場の大津市伝統芸能会館](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120021.png)

会場の大津市伝統芸能会館

## 前夜祭

関西Ruby会議09では、前夜祭は2箇所で開催され、好きな方に参加可能な形でした。

[kyotorb.connpass.com](https://kyotorb.connpass.com/event/388788/)

[kyobashirb.connpass.com](https://kyobashirb.connpass.com/event/396176/)

udzuraは日本酒に釣られて[下田屋](https://kyotorb.connpass.com/event/388788/)さんで開催された前夜祭に参加しました。滋賀は日本酒が本当に有名で、琵琶湖を取り囲むように酒蔵があるそうです。

地元の方や、久しぶりに会うRubyistの方などと語り合い、親睦を深めることができました。

## 本編

続いては、「関西Ruby会議09」の運営、SmartHRからの登壇、聴講したセッションの感想です。

### 運営

SmartHRの[ydah](https://github.com/ydah/)さんがチーフオーガナイザーを務めました。

ydahさんは関西Ruby会議08からチーフオーガナイザーを務めており、タイムテーブルの構成、前後イベントの企画まで、カンファレンス全体を牽引していました。

チーフオーガナイザーの視点からタイムテーブルを解説するインタビュー記事も公開しています。

[tech.smarthr.jp](https://tech.smarthr.jp/entry/2026/07/10/170000)

![関西Ruby会議09のオープニングで話すydahさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120056.jpg)

関西Ruby会議09のオープニングで話すydahさん

### 登壇

SmartHRからは2名がセッションに登壇しました。

#### [torikago - Ruby::Boxで照らすモジュラモノリスの実行境界](https://regional.rubykaigi.org/kansai09/presentations/se4weed) @nori

[speakerdeck.com](https://speakerdeck.com/se4weed/torikago-ruby-boxdezhao-rasumoziyuramonorisunoshi-xing-jing-jie)

[nori](https://github.com/se4weed)さんは、Railsのモジュラモノリスにおける実行時の境界について発表しました。

PackwerkやRails::Engineを使えば、モジュール間の構造上の境界は作れます。一方で実行時には同じRuby VMを共有するため、定数参照やmonkey patchの影響がモジュールをまたいで及びうる、というズレがあります。

noriさんは、このズレを前提に「モジュラモノリスのまま実行時の境界を作れないか」という問いを掲げました。Ruby 4.0の実験的機能であるRuby::Boxと、Railsのモジュラモノリス向けgem [torikago](https://github.com/se4weed/torikago)を紹介する内容でした。

Ruby::Box有効時の起動時間・スループットへの影響など、現時点では実用に向けた課題も率直に共有されていました。構造上の境界と実行時の境界のズレに光を当てた、SmartHRの大規模Rails開発の文脈にもつながる発表でした。

![登壇するnoriさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120036.png)

登壇するnoriさん

#### [チャリンコ・オブザーバビリティ](https://regional.rubykaigi.org/kansai09/presentations/kinoppyd) @kinoppyd

[www.docswell.com](https://www.docswell.com/s/kinoppyd/5Q2EG3-charinko-observability)

[kinoppyd](https://github.com/kinoppyd)さんは、ロードバイクにオブザーバビリティの考え方を持ち込んだ[チャリンコ・オブザーバビリティ](https://regional.rubykaigi.org/kansai09/presentations/kinoppyd)を発表しました。

Webアプリケーションがメトリクスで状態を可視化するように、ロードバイクにも速度、ケイデンス、心拍数、ギア位置、ブレーキ量など、さまざまなメトリクスがありました。自転車の各パーツがどのような情報を持っているかを整理し、既存のBLEプロファイルだけでは記録したいメトリクスが足りないため、PicoRubyとRaspberry Pi Pico 2 Wを使った自作センサが紹介されました。

前日に琵琶湖を走って当日データを持ち込む構想もあったようですが、35度を超える気温のため断念したとのことでした（笑）。

![登壇するkinoppydさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120046.png)

登壇するkinoppydさん

### 印象に残ったセッション

さまざまなセッションを聴講する中で特に印象に残ったものをいくつか紹介します。

#### [令和のnet/http](https://regional.rubykaigi.org/kansai09/presentations/nurse) @nurse

オープニングキーノートは、Rubyコミッターでリリースマネージャーの成瀬ゆい（@nurse）さんによる[令和のnet/http](https://regional.rubykaigi.org/kansai09/presentations/nurse)でした。

HTTPの歴史から話が始まり、HTTP/2における多重化やIPv6の普及といった、いまの通信環境の変化が整理されていました。プロトコルやネットワークが複雑化するなかで、HTTPクライアント実装がどのような課題に直面しているかが見えてくる構成でした。

とくに印象に残ったのは、Happy Eyeballs Version 3の話です。IPv4とIPv6の両方を持つホストへ、どう接続を試みるかという、普段Net::HTTPを使うだけでは意識しないレイヤの話でした。

#### [「照らす技術」をRubyで照らす](https://regional.rubykaigi.org/kansai09/presentations/harukasan) @harukasan

[harukasan.dev](https://harukasan.dev/posts/diary/20260720-illuminating-the-technology-of-illumination-using-ruby)

[harukasan](https://github.com/harukasan)さんは、[「照らす技術」をRubyで照らす](https://regional.rubykaigi.org/kansai09/presentations/harukasan)を発表しました。

ステージ照明を制御するDMX512という通信プロトコルをPicoRubyから扱う内容でした。普段のWebアプリケーション開発では触れない低レイヤの話を解説されていました。

本編のハイライトは、能舞台に持ち込んだムービングライトをRubyからリアルタイムに動かすデモで、桃井はるこさんの「ルミカ」に合わせて照明が変化する演出でした。会場全体を巻き込む迫力があり、テーマ「照」を体現したセッションだと感じました。

![Rubyからリアルタイムでムービングライトを操作するデモ](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120102.gif)

Rubyからリアルタイムでムービングライトを操作するデモ

#### [Can you see? I'm GC](https://regional.rubykaigi.org/kansai09/presentations/yhara) @yhara

[docs.google.com](https://docs.google.com/presentation/d/1BGr4KyT6_dThL6mADHRIh4GgVplvQ2XicVu1mJMANdA/mobilepresent)

[yhara](https://github.com/yhara)さんは、[Can you see? I'm GC](https://regional.rubykaigi.org/kansai09/presentations/yhara)を発表しました。

Rubyを書いていると、メモリ管理の多くはGC（ガベージコレクション）に任せがちです。発表では、そうした当たり前の裏側に光を当て、Ruby 3.4から実験的に導入されたModular GCを使ってカスタムGCを作った話でした。

GCがオブジェクトをどう辿り、メモリを回収しているかを可視化して追える構成で、GCの苦労が伝わってきました。

大津でプログラミングを学んだyharaさんが、同じ土地で登壇されていたのも、聴いていて感慨深かったです。

#### [Ruby を余すところなく愛する人のための「オートマトンと形式言語理論」入門](https://regional.rubykaigi.org/kansai09/presentations/hsjoihs) @hsjoihs

[docs.google.com](https://docs.google.com/presentation/d/1ZfueAQyVJsC2pmUYgIGdb_fmnFExYaCRnr9vcCf5uNk/mobilepresent)

[hsjoihs](https://github.com/hsjoihs)さんは、クロージングキーノート[Ruby を余すところなく愛する人のための「オートマトンと形式言語理論」入門](https://regional.rubykaigi.org/kansai09/presentations/hsjoihs)を発表しました。

オートマトンや形式言語理論の話を、Rubyを愛する人向けに展開する内容でした。

学生のころ学んだオートマトンの記憶が蘇りました。とくに「皆さんも regexエンジンを自作しましょう」「皆さんパーサーしてますか？」といったパワーワードが印象的でした。

非常に高濃度のスライドで、理解しきれない部分も残りました。ですが、発表を聞いてから、日頃、Rubyのさまざまな仕様・複雑な文法や、動的な要素などに関して、「これはRubyらしさだから」と思ってある意味で思考停止していたところがあるのかもな、と思い至りました。このキーノートで、「どうしてRubyはこういう設計を採用しているのか」という点についてまた違った観点を得られたように思います。あとから考えさせられるキーノートでした。

本編の後はお楽しみの[Official Party](https://rubykansai.doorkeeper.jp/events/196021)がありました。乾杯の音頭のあとで、チーフオーガナイザーのydahさんからご挨拶がありました。

![Official Partyで挨拶をするチーフオーガナイザーのydahさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120113.jpg)

Official Partyで挨拶をするチーフオーガナイザーのydahさん

Official Partyでは料理に加えて厳選された滋賀のクラフトビールが提供され、また、記念品にもなる可愛いデザインのカップも提供されました。

![Official Party参加者に配られた記念のカップ](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120109.jpg)

Official Party参加者に配られた記念のカップ

お酒と料理の美味しさの力で、いつも以上に話が弾んだように思います。

## 来年は三ノ宮で開催！

関西Ruby会議09は非常に濃厚な（これが「こてこて」？）地域Ruby会議で、とても満足感がありました。来年は兵庫県神戸市の三ノ宮での開催ということで、ぜひまた参加したいと思います！

## We Are Hiring!

SmartHRでは、一緒にプロダクトを作っていく仲間を募集しています。関西に住んでいるエンジニアも多数在籍しています。 少しでも興味を持っていただけたら、ぜひカジュアル面談でお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)

![みんなで記念撮影](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260730/20260730120012.png)

みんなで記念撮影