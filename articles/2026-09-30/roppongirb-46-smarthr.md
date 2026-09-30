---
title: "Roppongi.rb #46 がSmartHRで開催されました"
source: "https://tech.smarthr.jp/entry/2026/09/30/132755"
publishedDate: "2026-09-30"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

こんにちは！SmartHRでプロダクトエンジニアをしているmatsugenです。

2026年9月10日（木）、SmartHRのオフィスで「Roppongi.rb #46」が開催されました。この記事では、当日の様子や登壇内容をレポートします。

まだまだ暑さの残る9月の夜、平日の仕事終わりにもかかわらず、多くのRubyistの皆さんにお集まりいただきました。

[roppongirb.connpass.com](https://roppongirb.connpass.com/event/404876/)

## 目次

-   [目次](#目次)
-   [Roppongi.rbとは](#Roppongirbとは)
-   [参加人数](#参加人数)
-   [開幕](#開幕)
    -   [スポンサーLT](#スポンサーLT)
-   [参加者LT](#参加者LT)
    -   [created\_atがレコード作成日時じゃなかった件：国枝桂亮さん](#created_atがレコード作成日時じゃなかった件国枝桂亮さん)
    -   [MIDoRI開発進捗報告 9月号：Toshio Makiさん](#MIDoRI開発進捗報告-9月号Toshio-Makiさん)
-   [懇親会](#懇親会)
-   [最後に](#最後に)
-   [We Are Hiring!](#We-Are-Hiring)

## Roppongi.rbとは

Roppongi.rbは、六本木周辺のRubyistが中心となり、Rubyistのためのミートアップを企画するRubyコミュニティです。

[Roppongi.rb](https://roppongirb.connpass.com/)

SmartHRでの開催は今回で7回目となります。

## 参加人数

当日の参加者は12名でした。

Roppongi.rb常連の方から、今回が初参加の方まで幅広く参加いただき、Rubyの話で和気あいあいと盛り上がりました。

## 開幕

イベントは、オーガナイザーの[ryosk7](https://x.com/ryosk7)さんによる開会の挨拶から始まりました。

![開会宣言をするryosk7さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132756.jpg)

開会宣言をするryosk7さん

### スポンサーLT

続いて、会場提供とドリンクスポンサーを務めたSmartHRからスポンサーセッションを行いました。 今回はプロダクトエンジニアの[itojum](https://x.com/itojum1230)さんが「従業員データ基盤でのパターンマッチをご紹介」というタイトルで登壇しました。

![従業員データ基盤でのパターンマッチについて話すitojumさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132801.jpg)

従業員データ基盤でのパターンマッチについて話すitojumさん

続いて、フードスポンサーを担っていただいたBecLabさんのスポンサーLTとして、横山さんが次世代型ローカルデスクトップAI「Olares One」の紹介で登壇されました。

![Olares Oneについて話す横山さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132806.jpg)

Olares Oneについて話す横山さん

その後はRoppongi.rb恒例の参加者全員による自己紹介タイムです。

![恒例の自己紹介タイム](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132809.jpg)

恒例の自己紹介タイム

![一人ずつマイクが渡っていきます](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132812.jpg)

一人ずつマイクが渡っていきます

## 参加者LT

続いてメインコンテンツである参加者LTが始まります。

今回は事前に登壇を申し込みのあった4名に加え、SmartHRのitojumさん（スポンサーLTに続き、なんとこの日2回目のLT！）が飛び入りで登壇し、計5名となりました。

その中から2つのLTを紹介します。

### `created_at`がレコード作成日時じゃなかった件：国枝桂亮さん

![created_atがレコード作成日時じゃなかった件について話す国枝さん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132815.jpg)

created\_atがレコード作成日時じゃなかった件について話す国枝さん

外部APIから返却された `executed_at` を自分たちのサービス側の `created_at` / `executed_at` に保存していたことで、結果的に作成日時としての役割を `updated_at` が担うことになり、後から扱いづらくなった話が印象的でした。

日時系のカラムは普段あまり意識せず使いがちですが、名前から想像できる意味と実際の役割がズレると、後から実装する人の認知負荷が一気に上がりますよね。

`created_at` や `updated_at` のような基本的なカラムほど、直感的に意味が伝わる状態を保つことが大事だなと改めて思いました。

### MIDoRI開発進捗報告 9月号：[Toshio Maki](https://x.com/Kirika_K2)さん

Roppongi.rbではすっかりおなじみになってきたMIDoRIについて、直近の開発内容とこれからの展望を紹介していただきました。

![MIDoRIの開発進捗報告をするMakiさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132819.jpg)

MIDoRIの開発進捗報告をするMakiさん

MakiさんのLTといえば、スライドだけでなくその場で動くものを見せてくれるデモが毎回印象的ですが、今回も実機を持ち込んでのデモがあり、MIDoRIが実際に少しずつ進化している様子を間近で見ることができました。

![デモの様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132824.jpg)

デモの様子

継続して発表を聴いていると、単なる開発事例というより、一つのプロダクトが育っていく過程を追いかけているような感覚があって、だんだんMIDoRIそのものにも愛着が湧いてきます。

10月号も予定されているとのことで、次はどんな進化が見られるのかが楽しみです！

今回紹介できなかった発表も、どれもユニークで面白いものばかりでした。

## 懇親会

LTが終わったあとは、そのまま会場で懇親会を行いました。

フードスポンサー企業であるBecLabさんに、素敵なお食事をご提供いただきました！

![素敵なお食事](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132827.jpg)

素敵なお食事

![懇親会のフードといえばやっぱり🍕](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132830.jpg)

懇親会のフードといえばやっぱり🍕

Rubyの話はもちろん、普段の開発やお互いの近況まで、話題は尽きることなく盛り上がっていました。

![みんなで乾杯](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132837.jpg)

みんなで乾杯

![Ruby談義で盛り上がりました](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260930/20260930132834.jpg)

Ruby談義で盛り上がりました

## 最後に

今回のRoppongi.rbでも、さまざまなテーマの発表を通して、新しい知見や視点に触れることができました。

発表をきっかけにその場で質問や会話が広がっていくのも、コミュニティイベントならではの魅力だと感じます。

今回も、登壇者それぞれの取り組みや工夫に触れ、参加者同士で学びを持ち寄ることのできる、とても刺激的な時間でした。

登壇者の皆様、そしてご参加いただいた皆様、ありがとうございました！

## We Are Hiring!

SmartHRでは、一緒にSmartHRを作りあげていく仲間を募集中です！

日々のプロダクト開発の傍ら、希望があればこういった技術イベントへの参加・企画にも携わることができます。

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)