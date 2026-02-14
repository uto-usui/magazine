---
title: "SRE Kaigi 2026 参加レポート —— 登壇、ブース出展、そしてSREとエンジニアの人数比調査の結果は！？"
source: "https://tech.smarthr.jp/entry/2026/02/13/194118"
publishedDate: "2026-02-13"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。SREチームなどのマネジメントをしている @sugamasao([id:seiunsky](http://blog.hatena.ne.jp/seiunsky/)) です。

2026年1月31日に、東京都中野区の中野セントラルパーク カンファレンスで開催された「[SRE Kaigi 2026](https://2026.srekaigi.net/)」にゴールドスポンサーとして参加しました。本記事では、SmartHRからの登壇やブース出展の様子を中心に、イベントをレポートします。

SRE Kaigi 2026は、Site Reliability Engineering（SRE）の知見の共有と参加者との交流を楽しむ技術カンファレンスです。

[2026.srekaigi.net](https://2026.srekaigi.net/)

SmartHRは今回、ゴールドスポンサーとしてブースを出展し、2名のSREメンバーが登壇しました。

## 登壇セッション

### 小さく始めるBCP ― 多プロダクト環境で始める最初の一歩

中間 啓介（[@kekke\_n](https://x.com/kekke_n)）が、SmartHRでのBCP（事業継続計画）とDR（ディザスタリカバリ）への取り組みについて発表しました。

[speakerdeck.com](https://speakerdeck.com/kekke_n/xiao-sakushi-merubcp-duo-hurotakutohuan-jing-teshi-meruzui-chu-no-bu)

![画面中央にスライドが投影されており、右手に登壇する仲間さんが写っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194124.jpg)

中間さんの登壇写真

### 認知負荷を最小化するオブザーバビリティとSLOの導入 ―4名のSREが200名のプロダクトエンジニアを支援

樋口 貴志（[@super\_takashi\_o](https://x.com/super_takashi_o)）が、少人数のSREが約200名のエンジニアにオブザーバビリティ、SLI／SLOを導入した事例を紹介しました。

[speakerdeck.com](https://speakerdeck.com/higuchi_takashi/sre-kaigi-2026-ren-zhi-fu-he-wozui-xiao-hua-suruobuzababiriteitoslonodao-ru-4ming-srega200ming-nokodoenziniawozhi-yuan)

![画面中央にスライドが投影されており、右手に登壇する樋口さんが写っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194121.jpg)

樋口さんの登壇写真

## SmartHRのブース出展

ブースでは、「SREと開発チームのエンジニア比率」をテーマにしたシール投票企画を実施しました。来場者の皆さんにご自身の組織の比率を投票いただき、SRE組織の傾向を可視化する試みです。

当日は多くの方にご参加いただき、投票結果は以下のような分布となりました。

![SREとエンジニアの人数比を投票するパネルに投票シールが貼られている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194126.png)

投票パネルと投票結果

SREの適切な人数比は諸説あると思いますが、こちらのドキュメントでは[SREの人数はエンジニアの人数に対して一桁少ない人数](https://itrevolution.com/articles/how-google-sre-and-developers-collaborate/)と述べられているため、投票結果に、SREとエンジニア比率1:10を目安にざっくり補助線を引いた図が以下です。

![投票シールの貼られたパネルに補助線が引かれている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194130.png)

投票パネルに人数比の補助線を追加

今回の投票結果を見ると、SRE組織設計を考える際にはおおよそ1:10くらいの比率を目安と考えても良さそうです。また、SREの人数としてはある程度のエンジニア数になるまでは1チームで動きやすい規模で運営されていそうな雰囲気もありますね。

SmartHRにおけるSREとエンジニアの人数比は4:200くらいなので、この投票結果から見ても人数が少ない傾向にあるといえそうですね……!!

![投票パネルの中で、SmartHRのSREとエンジニアの人数比を表している部分に矢印がついている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194135.png)

SmartHRのSREとエンジニアの人数比

この企画では、参加者の方から「他社の比率を知れて参考になった」といった声をいただきました。組織規模や事業フェーズによって最適な比率は異なると思いますが、こうしたデータがSRE組織づくりの一助になれば幸いです。

多くの方にご参加いただき、ありがとうございました！

## イベント全体を通しての感想

SRE Kaigiのテーマである「"Challenge" SRE !」の通り、現実世界でSite Reliability Engineeringをどう実践していくか？というお話を各社の状況を踏まえて聞くことができました。

"SRE"といっても各社の状況やフェーズにより期待する成果や実践方法は異なる部分もあると思いますが、それぞれの組織の課題をどのように解決していくか？という考え方は参考になる部分も多かったです。

ブースに立ち寄ってくださった皆様、セッションを聴講してくださった皆様、本当にありがとうございました！

![ブースの机の前後にSREチームなどブースを担当した人物が集合している](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260213/20260213194119.jpg)

SREチームをはじめとする、ブースを担当した皆さん

## We Are Hiring!

ブースでの投票結果からも伝わるかもしれませんが、SmartHRのSREメンバーはまだまだ少ない状態でして、SREメンバーを絶賛募集中です！ プロダクトの成長を支える基盤づくりに興味がある方は、ぜひカジュアル面談でお話ししましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/smarthr/pages/98449)