---
title: "Cloudflare Workers Tech Talks in Fukuokaに参加し、登壇しました！"
source: "https://tech.smarthr.jp/entry/2026/09/29/144136"
publishedDate: "2026-09-29"
category: "design"
feedName: "SmartHR Tech Blog"
author: "natty254"
---

こんにちは、SmartHRの [@udzura](https://x.com/udzura) です。福岡で好きなうどんは[萬田うどん](https://tabelog.com/fukuoka/A4001/A400104/40045789/)です。

今回、2026年9月10日（木）に福岡で開催された Cloudflare Workers Tech Talks in Fukuoka #2 に参加し、登壇しました。この記事では、イベントの様子と自分の発表内容、それに他の登壇者の発表から学んだことを紹介します。

![主催のyusukebeさんから開始のご挨拶](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144137.jpg)

主催のyusukebeさんから開始のご挨拶

Cloudflare Workers Tech Talks in Fukuokaは、Cloudflare Workersとその周辺プロダクトで開発している人が集まり、事例や実装の工夫を共有する勉強会です。Cloudflare社のDeveloper Advocateである [yusukebe](https://x.com/yusukebe) さんが主催しています。

[workers-tech.connpass.com](https://workers-tech.connpass.com/event/401855/)

今回は第2回で、福岡市天神にある株式会社Fusicのオープンオフィスを会場に、19時から2時間ほど開催されました。発表は4本で、フレームワークの実装の話から、Cloudflare社内でのAIエージェント活用の話まで、Workersを土台にした幅広いテーマが並びました。

## Uzumibiの紹介: Rubyを書けばCloudflare Workerにそのままデプロイできるってマ！？

筆者は、Rubyで書いたコードをそのままCloudflare Workersにデプロイできるフレームワーク、[Uzumibi](https://mrubyedge.github.io/uzumibi/)の現在と今後の展望について発表しました。

![udzuraによる発表の様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144141.jpg)

udzuraによる発表の様子

名前のとおり、Uzumibiが目指しているのは、Rubyを書くだけでCloudflare Workersにデプロイできる状態です。発表では、そのために現状どういう仕組みで動いているのか、どこまで実現できていて、どこがまだ課題として残っているのかを話しました。

発表後、主催の yusukebe さんから激アツと言ってもらえて、非常にありがたかったです。

> Cloudflare WorkersでSinatraが動く！！！アツすぎる！！！[#workers\_tech](https://x.com/hashtag/workers_tech?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/li08gxR5xE](https://t.co/li08gxR5xE)
> 
> — Yusuke Wada (@yusukebe) [2026年9月10日](https://x.com/yusukebe/status/2097995300338294906?ref_src=twsrc%5Etfw)

[x.com](https://x.com/yusukebe/status/2097995300338294906)

私の資料は以下になります。

[udzura.jp](https://udzura.jp/slides/2026/cloudflare-workers-in-fukuoka-2/)

## Deploying a Full-Stack Bun-Native Framework on Cloudflare Workers

FusicのDaiki Urataさんは、Bun-NativeなフレームワークをどうやってCloudflare Workersで動かすかについて発表されました。

![Urataさんによる発表](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144144.jpg)

Urataさんによる発表

フレームワークの作者本人ならではの、実装の過程で直面した苦労がいくつも語られた発表でした。同じフレームワーク作者としても、非常に勉強になりました。

[speakerdeck.com](https://speakerdeck.com/7nohe/deploying-a-full-stack-bun-native-framework-on-cloudflare-workers)

## Cloudflare OSについて

yusukebe さんは、Cloudflare社内で使われている[Cloudflare OS](https://blog.cloudflare.com/ja-jp/cloudflare-os/)について発表されました。

![yusukebeさんの発表兼ライブデモ](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144147.jpg)

yusukebeさんの発表兼ライブデモ

Cloudflare社におけるAIエージェント活用の最先端の現場を垣間見ることができる、貴重でエキサイティングな発表でした。画面共有まで挟まれ、さらにスライド自体もCloudflare OSで作られていました（！）。ライブ感がすごかったです。AIの分野でもCloudflareの熱さを感じます。

## Dynamic Workersで『コードを書くだけ』の社内自動化基盤を作ってみた（仮）

SansanのYusuke Nakamuraさんは、CloudflareのDynamic Workersを使って、コードを書くだけで動かせる社内自動化基盤を作った事例を発表されました。

![Nakamuraさんの発表の様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144150.jpg)

Nakamuraさんの発表の様子

社内向けの基盤を用意しても、手軽なGAS（Google Apps Script）が使われてしまうという話は、基盤の開発者あるあるかもしれないと思いながら聞いていました。そうした状況のなかで、Cloudflareをベースにした社内基盤をしっかり検証し、運用しているという貴重な話でした。

## 懇親会

発表のあとは、天神近くの魚の美味しい居酒屋で懇親会がありました。CloudflareやWasm、AIの話で大いに交流でき、発表の内容をさらに掘り下げて聞ける楽しい時間になりました。

![博多名物も！](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260929/20260929144153.jpg)

博多名物も！

## We Are Hiring！

今回のCloudflare Workers Tech Talks in Fukuokaは、福岡で技術が好きな人が集まれる貴重な機会となりました。SmartHRでは、こうした技術コミュニティでの発表や交流を歓迎しています。

少しでも興味を持っていただけたら、ぜひ採用情報をご覧ください！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)