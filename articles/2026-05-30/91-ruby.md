---
title: "第91回 Ruby関西 勉強会レポート"
source: "https://tech.smarthr.jp/entry/2026/05/28/100000"
publishedDate: "2026-05-28"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは、[ydah](https://github.com/ydah/)です。普段はSmartHRでプロダクトエンジニアとして外部サービス連携基盤の開発をしています。大阪に住んでいて[Kyobashi.rb](https://kyobashirb.connpass.com/)の主催や[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)のチーフオーガナイザーをしています。

2026年5月22日（金）に、[第91回 Ruby関西 勉強会](https://rubykansai.doorkeeper.jp/events/196870)が開催されました。SmartHRは本イベントに会場提供という形で協賛し、グランフロント大阪タワーAの34階にあるSmartHR大阪オフィスを会場として提供しました。

[rubykansai.doorkeeper.jp](https://rubykansai.doorkeeper.jp/events/196870)

この記事では、当日の様子をお届けします。

![会場前方のスクリーン前で登壇者が話し、丸テーブルを囲んで着席した参加者がそれを見ている勉強会の会場全景](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100005.jpg)

第91回 Ruby関西 勉強会の会場の様子

## 目次

-   [目次](#目次)
-   [開催概要](#開催概要)
-   [スポンサートーク: やっていき2026](#スポンサートーク-やっていき2026)
-   [Rubyの配布パッケージの変遷](#Rubyの配布パッケージの変遷)
-   [BareRuby ～VMの殻を破る～](#BareRuby-VMの殻を破る)
-   [bundler に cooldown 機能ほしい](#bundler-に-cooldown-機能ほしい)
-   [Fiberを理解したい2026春](#Fiberを理解したい2026春)
-   [関西Rubyコミュニティ紹介](#関西Rubyコミュニティ紹介)
-   [関西Ruby会議09 アナウンス](#関西Ruby会議09-アナウンス)
-   [おわりに](#おわりに)
-   [We Are Hiring!](#We-Are-Hiring)

## 開催概要

第91回 Ruby関西 勉強会は、3年ぶりに開催されたRuby関西の勉強会です。Ruby関西代表のおごもりさんとも話していたのですが、ずっと関西Ruby会議や関西のRubyコミュニティで会っていたので全然気づかず、気づけば前回開催から3年が経っていました。時が過ぎるのは早いですね。会場はSmartHR大阪オフィスで、RubyKaigiで学んだことやRubyに関する話題を持ち寄る会として開催されました。

## スポンサートーク: やっていき2026

最初は、私のスポンサートーク「やっていき2026」でした。SmartHR社内でOSS活動や技術イベントへの登壇を後押しする「[OSSやっていきの集い](https://tech.smarthr.jp/entry/2024/07/25/115328)」について、ミートアップやプロポーザル支援の取り組みを紹介しました。

![「やっていき2026」のタイトルスライドを背景に、演台の横でマイクを持って話す ydah](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100008.png)

「やっていき2026」を発表する ydah

[@znz](https://twitter.com/znz)さんによる「Rubyの配布パッケージの変遷」では、Rubyのリリース時に配布されるアーカイブ形式の歴史が紹介されました。最初は `tar.gz` のみだったものが、`tar.bz2` や `zip`、その後 `tar.xz` に対応し、最終的に `tar.bz2` が削除されるまでの流れを、リリース作業や外部ツールへの影響も交えて解説されていました。

![「Rubyの配布パッケージの変遷」のタイトルスライドを背景に、演台の横でマイクを持って話す znz さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100014.jpg)

Rubyの配布パッケージの変遷について話す znz さん

## BareRuby ～VMの殻を破る～

すぎうり（[@uproad3](https://twitter.com/uproad3)）さんによる「BareRuby ～VMの殻を破る～」では、マイコン上でRubyらしい書き心地を保ちながら、より軽量に動かすための構想が紹介されました。PicoRubyで感じたVMの処理時間の課題を出発点に、GCや例外、動的な機能を削り、AOTコンパイルやレジスタアクセスなどマイコン向けの機能を足す「BareRuby」のアイデアが語られていました。

![「BareRuby 〜VMの殻を破る〜」のタイトルスライドを背景に、演台の横でマイクを持って話す すぎうり さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100017.jpg)

BareRubyの構想について語る すぎうり さん

## bundler に cooldown 機能ほしい

[@k-yoshida](https://twitter.com/8maim0)さんによる「bundler に cooldown 機能ほしい」では、公開直後のgem versionをすぐにinstallしないためのBundler plugin、[bundler\_plugin\_cooldown](https://github.com/kysd/bundler_plugin_cooldown) の話が紹介されました。アカウントの乗っ取りなどで悪意あるgemがpublishされた場合に、即時に取り込まれる事故を緩和するため、公開から一定期間が経過していないgemのinstallを止めるPoC実装について話していました。

![自己紹介スライドを背景に、演台の横でマイクを持って話す k-yoshida さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100019.jpg)

Bundlerのcooldown機能について話す k-yoshida さん

## Fiberを理解したい2026春

私は「Fiberを理解したい2026春」という話をしました。Fiberを非同期I/Oの仕組みとしてではなく、1スレッド内で制御フローを手動で切り替えるコルーチンとして整理しました。Fiberの理解を深めるために作った[fibrio](https://github.com/ydah/fibrio)というストリーミングパーサーを題材に、`Fiber#resume` と `Fiber.yield` で1レコードずつ処理を進める実装を紹介しました。

![「Fiberを理解したい 2026春」のタイトルスライドを背景に、演台の横でマイクを持って話す ydah](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100022.png)

「Fiberを理解したい2026春」を発表する ydah

## 関西Rubyコミュニティ紹介

おごもり（[@ogom](https://twitter.com/ogom)）さんによる「関西Rubyコミュニティ紹介」では、関西圏にあるRubyコミュニティがまとめて紹介されました。資料では20のコミュニティのうち、活動中が13箇所、休止中が7箇所と整理されており、Ruby関西をはじめ、AKASHI.rb、Kyobashi.rb、Kyoto.rb、naniwa.rb、Ruby Tuesdayなど、各地域のコミュニティやその特徴が紹介されていました。

![「関西Rubyコミュニティ紹介」のタイトルスライドを背景に、演台の横でマイクを持って話す おごもり さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100027.jpg)

関西のRubyコミュニティを紹介する おごもり さん

## 関西Ruby会議09 アナウンス

最後に、チーフオーガナイザーを務める私から[関西Ruby会議09](https://regional.rubykaigi.org/kansai09/)のアナウンスをしました。2026年7月18日に大津市伝統芸能会館で開催されることや、関西のRubyコミュニティが集まる地域Ruby会議として準備が進んでいることを紹介しました。

[regional.rubykaigi.org](https://regional.rubykaigi.org/kansai09/)

## おわりに

久しぶりのRuby関西勉強会をSmartHRの大阪オフィスで開催できて本当に嬉しく思います。 共催を快諾していただいたRuby関西のおごもりさん、ご登壇いただいた皆さん、ご参加いただいた皆さん本当にありがとうございました。

![勉強会の参加者が2列に並び、カメラに向かって写った集合写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260528/20260528100029.png)

第91回 Ruby関西 勉強会の参加者で撮影した集合写真

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることに情熱を持ったメンバーが集まっています！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)