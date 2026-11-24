---
title: "YAPC::Tokyo 2026の「踊り場」にSmartHRから2名がオーナーとして参加し、「Perl Hackers Hub」と「Parser蠱毒」を実施します！"
source: "https://tech.smarthr.jp/entry/2026/11/24/160000"
publishedDate: "2026-11-24"
category: "design"
feedName: "SmartHR Tech Blog"
author: "ydah"
---

こんにちは！ SmartHRのプロダクト基盤開発本部でプロダクトエンジニアをしている[@ydah](https://github.com/ydah)です。

2026年11月28日（土）・29日（日）に東京ビッグサイトで開催されるYAPC::Tokyo 2026で、SmartHRのメンバー2名が「踊り場」の企画オーナーを務めます。

[yapcjapan.org](https://yapcjapan.org/2026tokyo/)

SmartHRがYAPC::Tokyo 2026で行う協賛、登壇、ランチセッション、事後勉強会は、別の記事で紹介しています。

[tech.smarthr.jp](https://tech.smarthr.jp/entry/2026/11/19/132918)

Day 1は[@inao](https://x.com/inao)による「Perl Hackers Hub」、Day 2は私@ydahによる「Parser蠱毒」という企画を開催します！ 今回は、YAPCにおける「踊り場」とは一体どんな場なのかということと、それぞれの企画についてご紹介します。

## 踊り場とは

[YAPC::Fukuoka 2025での公式の紹介記事](https://blog.yapcjapan.org/entry/2025/11/14/110000)では、踊り場は、トークの前後に参加者同士が廊下などで雑談する「廊下」体験を広げるための場として説明されています。

踊り場は、テーマごとに集まった人たちが、発表を聴いて気になったことを質問したり、自分の経験を話したり、そこから話題を広げたりして楽しむ場です。オーナーが会話のきっかけを作り、参加者のみなさんと一緒にその場を盛り上げていきます。

YAPC::Fukuoka 2025では、inaoがホストを務めた踊り場企画「ゲストゲストトーク」を開催しました。その様子は、次のレポートで紹介しています。

[tech.smarthr.jp](https://tech.smarthr.jp/entry/2025/11/25/134453)

## 開催する企画

今回、SmartHRのメンバーがオーナーを務めるのは、次の2つの企画です。

日程

時間

企画

オーナー

Day 1・11月28日（土）

14:20〜15:00

Perl Hackers Hub

@inao

Day 2・11月29日（日）

11:00〜12:00

Parser蠱毒

@ydah

なお、上記日時は変更になる可能性があります。 正確な実施時間は、[タイムテーブル](https://fortee.jp/yapc-tokyo-2026/timetable/)をご確認ください。

### Perl Hackers Hub

こんにちは、ここだけinaoが執筆します。

[YAPC::Japanの最後の開催](https://blog.perlassociation.org/entry/2026/08/26/100000)となる今回は、たくさんのPerlハッカーが一堂に会する特別な機会になるはずです。 この踊り場企画では、Perlハッカーたちに次々とマイクをパスし、リレー形式でYAPCやPerlコミュニティの思い出、エピソード、感謝を語っていただきます。

企画タイトルは、「[WEB+DB PRESS](https://gihyo.jp/magazine/wdpress)」で2010年から2023年の休刊まで80回続いた人気連載「[Perl Hackers Hub](https://gihyo.jp/list/group/Perl-Hackers-Hub)」に由来します。 この連載は、第一線のPerlハッカーたちが回替わりで執筆するリレー形式の企画でした。 そのあり方は、PerlのモットーであるTMTOWTDI（There's more than one way to do it、やり方は一つだけじゃない）や、YAPC::Tokyo 2026のテーマである「パッチワーク」に通じるものがあります。

最後のYAPC::Japanで、さまざまなPerlハッカーの声を少しずつ重ねることで、コミュニティそのものを一つのパッチワークとして浮かび上がらせたいと考えています。

リレートークのホストは、連載「Perl Hackers Hub」の監修者だった[lestrrat](https://x.com/lestrrat)さん、[Yappo](https://x.com/Yappo)さん、[songmu](https://x.com/songmu)さん、[papix](https://x.com/__papix__)さんと、担当編集者だったinaoが務めます。

話すのは、Perlハッカーのあなたです！

なお、ホスト陣は登壇する人も多いので、ぜひそちらもご覧ください。

-   lestrratさんのキーノート
    -   「[キャリアについてひとつだけ伝えるなら（仮）](https://fortee.jp/yapc-tokyo-2026/proposal/be20e703-ab4b-42a4-9065-b8b17e4dcdf3)」
-   Yappoさんのトーク
    -   「[Yet Another Perl Computer は誰が作ってもよい ~ Z80 CPU で動く Perl VM を作る話](https://fortee.jp/yapc-tokyo-2026/proposal/71ae6e0f-377e-4a64-8675-f980ccedb326)」
-   songmuさんのLT
    -   「[CPANへ信頼性高くリリースする現代的なサプライチェーンの実現](https://fortee.jp/yapc-tokyo-2026/proposal/1561d4bf-2e10-4b86-855e-1ed526a7809d)」

### Parser蠱毒

「Parser蠱毒」では、プログラミング言語の構文や文法、構文解析、字句解析などに興味のある方が集まって、言語の垣根を越えて話せる場を作りたいと思っています。（パーサーバトルではありません）

Ruby界隈では、Ruby 3.4でPrismがCRubyのデフォルトのパーサーになり、従来のparse.yと2つのパーサーが併存するようになったこともあって、この分野に関心を持つ方が増えていると感じています。ほかの言語にも、同じように構文やパーサーについて話したい方はきっといるはずです。（もちろんいますよね？）そうした方々が集まって、それぞれの実装や気になっていることを話せたら面白そうだなと思い、この企画を考えました。

私自身、本編では[Perl・Ruby・PHPの文法ファイルを読み比べる発表](https://tech.smarthr.jp/entry/2026/10/07/090000)をする予定です。その発表ではパーサージェネレーターを使った構文解析を扱いますが、踊り場では手書きのパーサーの話も、PEGパーサーの話ももちろん歓迎です。「自分は手書きのパーサーのここが好き」「このパーサージェネレーターが便利」といった話や、自分で作った構文解析器の紹介など、いろいろな話を聞いてみたいです。

当日は、お話しいただく方の話をきっかけに議論したり、会場から出てきた質問をその場で一緒に考えたりできればと思っています。「この構文はどうやって解析しているんだろう」という疑問や、実装するときに工夫したことなど、気になっている話題を持ち寄ってもらえるとうれしいです。

お話しいただく方は現在調整中です。「こんな話をしてみたい！」という方も、ぜひ私（[ydah](https://x.com/ydah_)）にお声がけください！

もちろん、話を聞いてみたい方の参加も歓迎です。普段からパーサーを作ったり読んだりしている方も、「ちょっと面白そう」「自分が使っている言語の仕組みが気になる」と思った方も、ぜひ気軽にお立ち寄りください。本編の発表を聞いて興味を持ってくださった方とも、その続きをお話しできると楽しそうです。

## 「踊り場」でもお会いしましょう

Perl Hackers Hubではさまざまな世代や立場のPerlハッカーが、Parser蠱毒では普段使っている言語の違う人たちが、それぞれ1つの場に集まります。今回の「踊り場」が、普段はなかなか交わらない人同士が言語やコミュニティを越えて話し、お互いの興味を広げるきっかけになればうれしいです。

それでは、YAPC::Tokyo 2026の「踊り場」でお会いできることを楽しみにしています！

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

Rubyを使った開発や、私たちの取り組みに興味を持っていただけたら、「踊り場」で握手した人もそうでない人も、ぜひ採用サイトをご覧ください！

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)