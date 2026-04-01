---
title: "福岡Rubyist会議05レポート —— ブースとスポンサーセッションを提供"
source: "https://tech.smarthr.jp/entry/2026/03/30/134907"
publishedDate: "2026-03-30"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

プロダクトエンジニアの [@udzura](https://x.com/udzura) です。

SmartHRは、2026年2月28日に福岡で開催された「[福岡Rubyist会議05](https://regional.rubykaigi.org/fukuoka05/)」に協賛してブースを出し、スポンサートークを行いました。私もスタッフ（福岡Rubyist会議のスタッフと、SmartHRのスタッフを兼任です！）として参加してきました。この記事では、当日聴講したセッションの内容をレポートします。

-   [福岡Rubyist会議05とは](#福岡Rubyist会議05とは)
-   [ブースについて](#ブースについて)
-   [スポンサーセッションについて](#スポンサーセッションについて)
-   [本編セッションのレポート](#本編セッションのレポート)
    -   [Keynote：SQLQL とは何だったのか（yancyaさん）](#KeynoteSQLQL-とは何だったのかyancyaさん)
    -   [Panel Discussion：「コミュニティの垣根を越えよう」（asumikamさん、freddiさん、akaseさん）](#Panel-Discussionコミュニティの垣根を越えようasumikamさんfreddiさんakaseさん)
    -   [Keynote：mruby in the 8 bit world: mruby VM on Zilog Z80（Yuji Yokooさん）](#Keynotemruby-in-the-8-bit-world-mruby-VM-on-Zilog-Z80Yuji-Yokooさん)
-   [おわりに](#おわりに)
-   [We are hiring!!](#We-are-hiring)

福岡Rubyist会議は、福岡の地域Rubyコミュニティ「Fukuoka.rb」メンバーを中心として開催した、Rubyistのためのカンファレンスです。今回で、「福岡Ruby会議」時代と通算で5回目の開催となりました。

[regional.rubykaigi.org](https://regional.rubykaigi.org/fukuoka05/)

## ブースについて

SmartHRは会場内にスポンサーブースを出展しました。今回のイベントテーマ「最近、何してる？」に合わせて、参加者が付箋に「最近やっていること」を書いて貼るボードを用意しました。付箋を貼ってくれた方にはお菓子をプレゼント。会場では八女茶が振る舞われていたので、それに合わせて福岡の銘菓を複数用意しました。

![ブース対応をするSmartHRメンバー](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134910.jpg)

ブース対応をするSmartHRメンバー

![用意した福岡銘菓の様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134913.jpg)

福岡銘菓もこの通りご用意しました！

会の最後には、福岡Rubyist会議05のデザイナーの方と、パネルディスカッションで話したfreddiさんにイラストを描いていただきました。ありがとうございました！

![freddiさんがイラストを描いてくれている様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134924.jpg)

freddiさんがイラストを描いてくれている様子

![最終的なボードの様子。8割型埋まった＋イラストを描いていただいた](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134928.jpg)

最終的なボードの様子です！

## スポンサーセッションについて

スポンサートークでは、私 udzura が『したっけ、RubyKaigiでもSmartHRをよろしく！』というタイトルで登壇しました。2026年のRubyKaigiにSmartHRのプロダクトエンジニア3名が登壇予定であることを紹介しつつ、各メンバーの「最近の取り組み」を宣伝させていただきました。

資料は以下をご覧ください。

[udzura.jp](https://udzura.jp/slides/2026/fukuokark05-smarthr-lt)

![udzura の登壇の様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134922.jpg)

udzura の登壇の様子

## 本編セッションのレポート

今回も非常に素敵な発表ばかりでしたが、あまりに長くなってしまうため、涙を飲んでキーノート2つとパネルディスカッションの内容のみレポートします。

### Keynote：SQLQL とは何だったのか（yancyaさん）

まず、[キーノートの概要](https://regional.rubykaigi.org/fukuoka05/timetable.html#:~:text=SQLQL%20%E3%81%A8%E3%81%84%E3%81%86%E3%81%AE%E3%81%AF%202017%20%E5%B9%B4%E9%A0%83%E3%81%AB%20yancya%20%E3%81%8C%E6%8F%90%E5%94%B1%E3%81%97%E5%A7%8B%E3%82%81%E3%81%9F%20API%20%E3%81%AE%E4%BB%95%E6%A7%98%E3%81%AE%E3%82%B3%E3%83%B3%E3%82%BB%E3%83%97%E3%83%88%E3%81%A7%E3%81%99%E3%80%82%0ASQLQL%20%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E8%BB%BD%E3%81%8F%E3%81%8A%E3%81%95%E3%82%89%E3%81%84%E3%81%97%E3%81%A4%E3%81%A4%E3%80%81%E7%8F%BE%E4%BB%A3%E7%9A%84%E3%81%AA%E5%AE%9F%E8%A3%85%E4%BE%8B%E3%82%92%E7%A4%BA%E3%81%97%E3%81%A4%E3%81%A4%E3%80%81SQLQL%20%E3%81%8C%20yancya%20%E3%81%AB%E3%81%A8%E3%81%A3%E3%81%A6%E4%BD%95%E3%81%A0%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%99%BA%E8%A1%A8%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)を引用します。

> SQLQL というのは 2017 年頃に yancya が提唱し始めた API の仕様のコンセプトです。  
> SQLQL について軽くおさらいしつつ、現代的な実装例を示しつつ、SQLQL が yancya にとって何だったのかについて発表します。

当日の発表は、yancyaさんの技術的興味を高い純度で浴びることができる、とても印象的なキーノートでした。

SQLというと単に「道具」として捉える向きも多いですし、Railsの文脈ではActive Recordで隠蔽して直接書かないことも多いです。しかし、SQLQLはSQLそのものを「目的」として据えるコンセプトです。目的として向き合い始めると途端にSQLの世界は深く、面白くなる――そんなことを感じさせてくれる発表でした。

「なんだかよくわかんないけど手段と目的が逆転してる？」というやんちゃイズムの一端が垣間見え、yancyaさんらしいキーノートだったと思います。

![yancya登壇](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134915.jpg)

yancyaさんのご登壇

### Panel Discussion：「コミュニティの垣根を越えよう」（asumikamさん、freddiさん、akaseさん）

asumikamさん、freddi（Yuki Aki）さん、akaseさんの3名によるパネルディスカッションでした。

個人的に、akaseさんとはおそらく10年近い付き合いになりますし、freddiさんとの出会いもかなり前に遡ります。asumiさんにも福岡でのPHPカンファレンス等でお世話になっています。そんな顔なじみの皆さんが「コミュニティの垣根を越える」というテーマで語り合う姿はとても興味深かったです。

私自身、[個人のPHPカンファレンスレポート](https://udzura.hatenablog.jp/entry/2025/12/24/115818)でも書いた通り「越境」を重視しているので、議論の内容はとても刺さりました。特に印象に残ったのは、「初学者でも入りやすいコミュニティであるべき」という観点です。長く一つのコミュニティにいると見逃しがちなポイントかもしれないと思いました。

Rubyコミュニティでもこうしたある種メタ的な議論――コミュニティそのもののあり方を考える風潮――が広がっているのだとしたら、それはとても嬉しいことだと感じます。

![パネルディスカッション前の一幕。freddiさんとasumikamさん](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134919.jpg)

パネルディスカッション前の一幕。freddiさんとasumikamさん

### Keynote：mruby in the 8 bit world: mruby VM on Zilog Z80（Yuji Yokooさん）

こちらも[キーノートの概要](https://regional.rubykaigi.org/fukuoka05/timetable.html#:~:text=Zilog%20Z80%20%E7%94%A8%E3%81%AE%20mruby%20VM%20%E3%82%92%E5%AE%9F%E8%A3%85%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82Z80%20%E3%81%AF%E4%B8%BB%E3%81%AB%2080%20%E5%B9%B4%E4%BB%A3%E3%81%AB%E6%A7%98%E3%80%85%E3%81%AA%E7%92%B0%E5%A2%83%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%95%E3%82%8C%E3%81%9F%20CPU%20%E3%81%A7%E3%81%99%E3%80%82%0A8%20%E3%83%93%E3%83%83%E3%83%88%E3%81%AE%E5%88%B6%E9%99%90%E3%81%AE%E4%B8%8A%E3%81%AB%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%82%82%E9%99%90%E3%82%89%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%81%8C%E3%80%81%E5%AE%9F%E7%94%A8%E3%81%AB%E8%80%90%E3%81%88%E3%81%86%E3%82%8B%E3%82%88%E3%81%86%E3%81%AA%E5%AE%9F%E8%A3%85%E3%82%92%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)を引用します。

> Zilog Z80 用の mruby VM を実装しています。Z80 は主に 80 年代に様々な環境で使用された CPU です。  
> 8 ビットの制限の上に開発環境も限られていますが、実用に耐えうるような実装をしています。

Yokooさんのキーノートは、まさに福岡Rubyist会議の締めにふさわしい内容だと感じました。

こちらの発表は、スライド自体が、Z80互換機の上で動作するmrubyのアプリケーションとして実装され、発表がそのままライブデモになっていました。

![Yokooさんのご登壇。スライドがハードウェアの上で動いている！](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134934.jpg)

Yokooさんのご登壇。スライドがハードウェアの上で動いている！（写真提供: Fukuoka.rb nagachikaさん）

![発表用の機材](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134936.jpg)

発表用の機材（写真提供: Fukuoka.rb jinroqさん）

実際にハードウェア上で動いているところを間近に見ることができたため、Yokooさんの技術的挑戦をライブで感じ取ることができました。

また、何より印象的だったのは、「VMを作れば、そこはRubyが動くプラットフォームになる」という発想です。8ビットCPUという制約の厳しい環境であっても、VMを作って載せることでRubyの世界が広がる。まさに現実歪曲フィールド的な発想であり、非常に共感を覚えました。また、個人的にも[VMを作っている](https://mrubyedge.github.io/)こともあり、mruby互換VM実装者あるある（？）の話も聞けて嬉しかったです。

こうした純粋な技術への情熱と挑戦が詰まった発表からしか得られない栄養をたくさんいただけました。

## おわりに

福岡Rubyist会議05は、福岡らしさを感じつつ、バラエティに富んだセッションを楽しめるカンファレンスでした。

![当日は懇親会もありました。「博多手一本」を頑張るudzuraの様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260330/20260330134931.jpg)

当日は懇親会もありました。「博多手一本」を頑張るudzuraの様子です

今後も機会があれば福岡のイベントに参加していきたいです！

## We are hiring!!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！ 福岡をはじめとした遠隔地でフルリモートで働くプロダクトエンジニアも多く在籍しています。

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)