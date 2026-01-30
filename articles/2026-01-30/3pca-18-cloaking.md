---
title: "3PCA 18 日目: Cloaking"
source: "https://blog.jxck.io/entries/2023-12-18/cloaking.html"
publishedDate: "2023-12-18"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Cloaking](#cloaking)

これが今、トラッカーが最も期待している 3rd Party Cookie の迂回技術だろう。

例えば、広告やアナリティクスなど何らかのトラッカーを 3rd Party として利用している場合は、今後 3rd Party Cookie での連携ができなくなる。

そこで、そのトラッカーサービス自体を自分のサブドメインで運用してしまえば、eTLD+1 が同じになり、1st Party で連携できる。つまり `example.com` に対して `analytics.example.com` にトラッカーをデプロイしてしまえば、両者は SameSite になるといった手法だ。

しかし、自分でトラッカーになるサービスをデプロイ/メンテするのは負荷が高いため、ドメインを業者に預け、そこにデプロイしてもらう方が運用する側は楽だ。

ここで用いられるのが Cloaking だ。方法はいくつかある。

### [CNAME Cloaking](#cname-cloaking)

まず最初に用いられたのは、CNAME を用いる方法だ。

例えば、ads.example が提供しているトラッカーを、`analytics.example.com` にデプロイし、`example.com` と SameSite にしたい場合、DNS を以下のように設定する。

```
analytics.example.com.    IN    CNAME    deadbeef.ads.example.
```

CNAME で事業者のレコードを参照すれば、そのサブドメインを事業者が運用できるのだ。このように CNAME を預ける方法を CNAME Cloaking (コートを預けるクロークのこと)と言う。

これは ITP 迂回の筆頭として問題になったので、Safari ではもちろん対策がされている。CNAME の先を辿って、最終的に 3rd Party だったら付与された Cookie を短命にするといったものだ。

### [IP Cloaking](#ip-cloaking)

CNAME では Safari にバレてしまうため、次にトラッカーが考えたのがこれを IP にしてしまう IP Cloaking だ。

単純に、トラッカーのサービスの IP を設定するというものだ。

```
analytics.example.com.    IN    A    203.0.113.10
```

大手のトラッカーであれば、IP がバレるとトラッカー判定されるかもしれないが、事業者が小さければこの方法は判定が難しい。

しかし、トラッカー側にとっては、IP を変えることができないといった運用上の制限が発生する。

### [NS Cloaking](#ns-cloaking)

そこでさらに考えられるのが NS の Cloaking だ。

これは、例えば `*.analytics.example.com` のサブドメインを、丸ごとトラッカーに移譲してしまうというものだ。

```
analytics.example.com.    IN    NS    dns.ads.example.
```

これで、トラッカーはトラッキングサービスの運用をある程度自由に行うことができる。

この場合、規模の大きいトラッカーの DNS を丸ごとトラッカー判定するといったことは原理上可能と思われるが、実際にそうした対策が行われているかは不明だ。