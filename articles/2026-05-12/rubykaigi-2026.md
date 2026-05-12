---
title: "「ルールルルルルRubyKaigi 2026事前勉強会 —— 初参加でもなまら歓迎！」を開催しました"
source: "https://tech.smarthr.jp/entry/2026/05/11/154638"
publishedDate: "2026-05-11"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。SmartHRの課金基盤を開発しているプロダクトエンジニアの[shimoju](https://x.com/shimoju_)です。

2026年4月10日に、「[ルールルルルルRubyKaigi 2026事前勉強会 —— 初参加でもなまら歓迎！](https://smarthr.connpass.com/event/387103/)」を開催しました！ この記事では、イベントの模様と登壇内容についてレポートします。

![事前勉強会の開始前の様子。イベントのアイキャッチが映っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154641.jpg)

## 開催概要

このイベントはSmartHRが主催する、RubyKaigi初参加の方の手引きとなる事前勉強会です。会場は六本木のSmartHR Spaceです。 [2024年](https://tech.smarthr.jp/entry/2024/06/14/104234)、[2025年](https://tech.smarthr.jp/entry/2025/04/07/110322)の事前勉強会が好評だったことを受け、今年も開催する運びとなりました。

今年もたくさんの方からのお申し込みをいただきました。登壇者・参加者のみなさま、ありがとうございました！

[smarthr.connpass.com](https://smarthr.connpass.com/event/387103/)

## オープニング

司会・進行はSmartHRの[16bit\_idol](https://x.com/16bit_idol)さんです。

RubyKaigi 2026の会場は北海道函館市です。北海道といえば、「ルールルルルル……」というあのフレーズで知られる「北の国から」。ということで、SmartHRは「ルールルルルルルビーカイギ」をテーマに、さまざまな企画を行うことを紹介しました。

![司会・進行の16bit_idolさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154646.jpg)

司会・進行の16bit\_idolさん

## ルールルルルルRubyの中身の予備知識 ── RubyKaigiの前に予習しなイカ？

最初の発表は、SmartHRの[ydah](https://x.com/ydah_)さんによる「ルールルルルルRubyの中身の予備知識 ── RubyKaigiの前に予習しなイカ？」でした。

RubyKaigiでは、Rubyの言語実装に関するトークが数多くあります。「Rubyの中身の予備知識」と題して、Rubyが実行されるまでの一連の流れと、RubyにおけるJIT実装（MJIT/YJIT/RJIT/ZJIT）、とくにZJITがどのような課題を解決しようとしているのかを説明していました。 Ruby 4.0の新機能であるRuby::Boxや、JRubyをはじめとするさまざまなRuby実装の紹介もあり、盛りだくさんの発表でした。

![発表するydahさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154651.jpg)

発表するydahさん

[speakerdeck.com](https://speakerdeck.com/ydah/rubykaigi-2026-pre-briefing)

## Into the Arena

次はゲストの[松田明](https://x.com/a_matsuda)さんによる「Into the Arena」でした。

今年のRubyKaigiは函館アリーナ・函館市民会館の2会場を使って開催される、過去最大規模のRubyKaigiでした。 この会場を選定するに至った経緯や、チーフオーガナイザーとしての思いなど、ここでしか聞けないお話をしていただきました。

ちなみに発表タイトルの「Into the Arena」は、楽曲の名前と今年の会場がアリーナであることをかけた命名で、[Puma 8.0.0のコードネーム](https://github.com/puma/puma/releases/tag/v8.0.0)にもなっています。

松田さん、ご登壇いただき本当にありがとうございました！

![発表する松田さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154654.jpg)

発表する松田さん

## ルールルルルル私的函館観光ガイド ── 函館の街はイクラでも楽しめる！

ここからはLTです。 最初のLTは、SmartHRの[nomuson](https://x.com/nomuson)さんによる「ルールルルルル私的函館観光ガイド ── 函館の街はイクラでも楽しめる！」でした。

学生時代に函館に住んでいた経験をもとに、函館の観光名所や飲食店を紹介していました。函館のミスタードーナツが安い（現在は価格高騰により変わっているそうですが）という意外な情報もありました。

![発表するnomusonさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154657.jpg)

発表するnomusonさん

[speakerdeck.com](https://speakerdeck.com/nomuson/rurururururusi-de-han-guan-guan-guang-gaido-han-guan-nojie-haikurademole-simeru)

## YJITとZJITにはイカなる違いがあるのか？

次のLTは、[yamanao](https://x.com/yamanaoRuby)さんによる「YJITとZJITにはイカなる違いがあるのか？」でした。

YJITとZJITの違いについて、テスト勉強のたとえを用いて「過去問を入手して対策するのがYJIT」、「試験範囲の教科書を読むのがZJIT」と説明していました。 2つの設計の違いが直感的にわかる発表でした。

![発表するyamanaoさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154701.jpg)

発表するyamanaoさん

[speakerdeck.com](https://speakerdeck.com/nakiym/yjittozjitnihaikanaruwei-igaarunoka)

3番目のLTは、SmartHRの[sako](https://x.com/sakoy777)さんによる「RubyKaigi参加ルールルルルル策定ガイド ── どんぶり勘定をサケよう！」でした。

社内でRubyKaigi参加予算を策定する立場から、概算費用を算出した上で、どのような基準で参加ルールを作ったかを説明していました。

![発表するsakoさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154703.jpg)

発表するsakoさん

[speakerdeck.com](https://speakerdeck.com/yanyansk/rubykaigican-jia-rurururururuce-ding-gaido-donburikan-ding-wosakeyou)

## RubyKaigiを楽しく休む方法

最後のLTは、[三谷昌平](https://x.com/shohei1913)さんによる「RubyKaigiを楽しく休む方法」でした。

RubyKaigiの会期中は、Drinkupやワークショップ、さらにはランニングやゴルフなど体を動かすものまで、さまざまなイベントが行われます。 これらのイベントを通してリフレッシュする方法を紹介していました。

![発表する三谷さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154707.jpg)

発表する三谷さん

[docs.google.com](https://docs.google.com/presentation/d/1PXiUWdvHsYoD7WjSnGCmv4l-_MO4vU1mQg8qdOs2jjY/edit?usp=sharing)

## 写真撮影

発表終了後、懇親会の前に登壇者と参加者による記念撮影を行いました。

![登壇者と参加者による記念写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260416/20260416171359.jpg)

登壇者と参加者による記念写真

## 懇親会

懇親会では、RubyKaigi 2026に向けて参加者同士が語り合っていたほか、直近で開催される地域Ruby会議である「[関ケ原Ruby会議01](https://regional.rubykaigi.org/sekigahara01/)」と「[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)」の紹介がありました。

![関ケ原Ruby会議01の紹介をするydahさんとosyoyuさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154711.jpg)

関ケ原Ruby会議01の紹介をするydahさんとosyoyuさん

![関西Ruby会議09の紹介をするydahさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154715.jpg)

関西Ruby会議09の紹介をするydahさん

会の締めは、RubyKaigi 2026ローカルオーガナイザーの[いかるが](https://x.com/UVB_76)さんに行っていただきました。 さらに、いかるがさんからは6月に開催される「[東京Ruby会議13](https://regional.rubykaigi.org/tokyo13/)」の紹介もありました。 今年の地域Ruby会議も目白押しですね！

![東京Ruby会議13の紹介をするいかるがさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260511/20260511154719.jpg)

東京Ruby会議13の紹介をするいかるがさん

## おわりに

Rubyが実行されるまでの流れから、RubyKaigiにかける思い、各種イベントや観光情報まで、RubyKaigiを楽しむための知識が広く学べる一日だったのではないでしょうか。

この記事を書き上げる前に、RubyKaigi 2026は盛況のうちに終了しました（本当はRubyKaigi本番の前に公開したかったのですが、遅くなりました……）。日々触っているRubyが、多くのRubyistの情熱によって支えられていることを改めて実感した3日間でした。

私はRubyKaigi 2019が初参加で、今年で通算4回目になります。 最初は何もわからないところからのスタートでしたが、毎年の発表を聞いたり、勉強会に参加したり、『[Rubyのしくみ](https://tatsu-zine.com/books/ruby-under-a-microscope-ja)』を読んだりするうちに、少しずつ内容がわかるようになってきました。 今回が初参加だった方にとっても、この事前勉強会がRubyKaigiを楽しむ手助けになっていれば嬉しいです。

SmartHRは「[ルールルルルルRubyKaigi 2026事後勉強会 ── したっけ、東京で！](https://smarthr.connpass.com/event/390319/)」を2026年5月22日に開催します。 RubyKaigi 2026での出会いや学びを胸に、事後勉強会でまたお会いしましょう！

[smarthr.connpass.com](https://smarthr.connpass.com/event/390319/)

## We Are Hiring!

SmartHRではRubyが大好きなエンジニアから、Rubyを書いたことはないけどRubyに興味があるエンジニアまで幅広く募集しています！ 少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)