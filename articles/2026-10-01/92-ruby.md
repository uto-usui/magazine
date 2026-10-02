---
title: "第92回 Ruby関西 勉強会レポート"
source: "https://tech.smarthr.jp/entry/2026/09/30/170000"
publishedDate: "2026-09-30"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

こんにちは、[ydah](https://github.com/ydah/)です。普段はSmartHRでプロダクトエンジニアとしてR&Dユニットに所属しています。大阪に住んでいて[Kyobashi.rb](https://kyobashirb.connpass.com/)の主催や[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)のチーフオーガナイザーを務めました。

2026年9月17日（木）に、[第92回 Ruby関西 勉強会](https://rubykansai.doorkeeper.jp/events/199034)が開催されました。SmartHRは本イベントに協賛し、グランフロント大阪タワーAの34階にあるSmartHR大阪オフィスを会場として提供しました。

[rubykansai.doorkeeper.jp](https://rubykansai.doorkeeper.jp/events/199034)

この記事では、当日の様子をお届けします。

![会場前方のスクリーン前で登壇者が話し、着席した参加者がそれを見ている勉強会の会場全景](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170005.jpg)

第92回 Ruby関西 勉強会の会場の様子

## 目次

-   [目次](#目次)
-   [開催概要](#開催概要)
-   [スポンサートーク: Ractor完全理解2026](#スポンサートーク-Ractor完全理解2026)
-   [The Empty Gem](#The-Empty-Gem)
-   [自作LR parserを速くする](#自作LR-parserを速くする)
-   [mrbgem 三角測量 開発](#mrbgem-三角測量-開発)
-   [技術書同人誌を出す - for Those Who Don't Usually Output-](#技術書同人誌を出す---for-Those-Who-Dont-Usually-Output-)
-   [関西Ruby会議09がきっかけで転職しました](#関西Ruby会議09がきっかけで転職しました)
-   [コミュニティとカンファレンスの紹介](#コミュニティとカンファレンスの紹介)
-   [おわりに](#おわりに)
-   [We Are Hiring!](#We-Are-Hiring)

## 開催概要

第92回 Ruby関西 勉強会は、2026年7月18日に開催された関西Ruby会議09の余韻を持ち寄る会です。会場はSmartHR大阪オフィスで、会議で印象に残った発表やできごとを共有するというテーマで開かれ、15名が参加しました。

## スポンサートーク: Ractor完全理解2026

最初は、私のスポンサートーク「Ractor完全理解2026」でした。Ractorを、オブジェクトを共有しない代わりに並列に動く仕組みとして整理し、Ruby 4.0から `Ractor::Port` でメッセージをやりとりするようになった点を紹介しました。また、Erlang/OTPでプロセスの監視と再起動を担うスーパーバイザーを参考に作った[ractor\_shepherd](https://github.com/ydah/ractor_shepherd)というgemを題材に、死んだRactorを自動で再起動する仕組みと、実装の過程でつまずいた点を話しました。

![「Ractor完全理解2026」のタイトルスライドを背景に、マイクを持って話す ydah](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170010.jpg)

「Ractor完全理解2026」を発表する ydah

## The Empty Gem

Sampo Kuokkanenさんによる「The Empty Gem」では、IOの待ち合わせを扱うio-wait gemのJRuby拡張から、メソッド定義を削除した話が紹介されました。JRuby 10.0以降はIOクラスに `wait` や `wait_readable` が組み込まれているため、拡張側で再定義すると古い実装が組み込みの実装を隠すそうです。C拡張と同様に何も定義しないgemにする[修正](https://github.com/ruby/io-wait/pull/76)と、その[リリースをめぐる議論](https://github.com/ruby/io-wait/issues/77)について話されていました。

![「The Empty Gem」のスライドを背景に、マイクを持って話す Sampo Kuokkanen さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170016.jpg)

「The Empty Gem」を発表する Sampo Kuokkanen さん

## 自作LR parserを速くする

しおまちさんによる「[自作LR parserを速くする](https://docs.google.com/presentation/d/1CdXxoKUfFneCjxNJjAiuLKXEUvFyIN6qABqfDd25byY/)」では、C++で自作しているLRパーサーを高速化した話が紹介されました。ある記号列の先頭に現れうる終端記号を集めたFirst集合を、先読み記号を求めるたびに計算するのをやめてメモ化したことや、同じアイテム集合を持つDFA（決定性有限オートマトン）のノードの合流判定をハッシュで行うようにしたことが語られていました。その結果、DFAノード900個程度の生成にかかる時間が、実装当初の1時間から5秒弱まで短縮されたそうです。

![「自作LR parserを速くする」のスライドを背景に、マイクを持って話す しおまち さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170020.jpg)

「自作LR parserを速くする」を発表する しおまち さん

## mrbgem 三角測量 開発

おごもりさんによる「mrbgem 三角測量 開発」では、マイコン向けのRuby実装であるPicoRubyで作ったパルスオキシメータの開発が紹介されました。PicoRubyだけで実装すると値は取れるものの、その値が正しいのか確信が持てないため、MicroPythonとRaspberry Pi Pico、C言語とSpresense、PicoRubyとmrbgemという3つの環境で実装して仕様を洗い出したそうです。成果物として、SpO2（血中酸素飽和度）と脈拍数を計測するセンサーMAX30102用のmrbgemが紹介されていました。

[speakerdeck.com](https://speakerdeck.com/ogom/mrbgem-sankaku-sokuryou-kaihatsu)

![「mrbgem 三角測量 開発」のスライドを背景に、マイクを持って話す おごもり さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170024.jpg)

「mrbgem 三角測量 開発」を発表する おごもり さん

## 技術書同人誌を出す - for Those Who Don't Usually Output-

にっしーさんによる「技術書同人誌を出す - for Those Who Don't Usually Output-」では、アウトプットの手段としての技術書同人誌が紹介されました。Redmineプラグインの解説本を出したご自身の経験をもとに、申し込みから入稿まで約1か月という締切に追われたスケジュールや、即売会当日の様子が語られていました。LT（Lightning Talks）と違って体系的な構成が必要になる点や、ブログと違って締切と対面での交流がある点が、同人誌の特徴として挙げられていました。

[speakerdeck.com](https://speakerdeck.com/nisshy82/gijutsusho-doujinshi-o-dasu-for-those-who-don-t-usually-output-dai-92-kai-ruby-kansai-benkyoukai)

![「技術書同人誌を出す」のスライドを背景に、マイクを持って話す にっしー さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170029.jpg)

「技術書同人誌を出す - for Those Who Don't Usually Output-」を発表する にっしー さん

## 関西Ruby会議09がきっかけで転職しました

かぐ（Kagu3）さんによる「関西Ruby会議09がきっかけで転職しました」では、関西Ruby会議09への参加が転職につながった体験が語られました。普段はRubyを使っていなかったものの、勧められて参加したところ、そこでの出会いから転職が決まったそうです。関西Ruby会議09のチーフオーガナイザーとして、自分の領域外のコミュニティやカンファレンスにも参加すると良いことがあるという話を聴けたのは嬉しい出来事でした。

![「関西Ruby会議09がきっかけで転職しました」のスライドを背景に、マイクを持って話す かぐ（Kagu3） さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170032.jpg)

「関西Ruby会議09がきっかけで転職しました」を発表する かぐ（Kagu3） さん

## コミュニティとカンファレンスの紹介

最後に、告知したい参加者が、それぞれ関わっているコミュニティやカンファレンスを紹介しました。私からは関西Ruby会議10を告知しました。関西Ruby会議10は2027年6月19日（土）に、神戸・三宮の月世界で開催します。会場でお会いしましょう！

[regional.rubykaigi.org](https://regional.rubykaigi.org/kansai10/)

## おわりに

関西Ruby会議09の余韻が残るなか、Ruby関西 勉強会をまたSmartHRの大阪オフィスで開催できて嬉しく思います。 共催として司会を進めてくださったRuby関西のおごもりさん、ご登壇いただいた皆さん、ご参加いただいた皆さん、本当にありがとうございました。

![勉強会の参加者が並び、カメラに向かって写った集合写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930170036.jpg)

第92回 Ruby関西 勉強会の参加者で撮影した集合写真

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることに情熱を持ったメンバーが集まっています！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)