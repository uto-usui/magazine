---
title: "SDP の Unified Plan と Plan B"
source: "https://blog.jxck.io/entries/2018-01-05/sdp-unified-plan.html"
publishedDate: "2018-01-05"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

新年早々、Blink Dev で Unified Plan の Intent to Implement という嬉しい知らせが届いた。

[Intent to Implement: WebRTC Unified Plan SDP](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Qgwfl-nD0Zs/u45qUqRHBwAJ)

SDP の互換性についてインパクトの大きいこの変更について簡単に解説する。

## [Update](#update)

実装が進み `SdpFormat` は `sdpSemantics` に変わったため、記事を修正。

-   [PSA: Unified Plan SDP testing flag is now available on Canary](https://groups.google.com/forum/#!topic/discuss-webrtc/x8lcqHRlWmA)
-   [PSA: RTCRtpTransceiver shipping in M69 behind sdpSemantics:'unified-plan'](https://groups.google.com/forum/#!msg/discuss-webrtc/zMB1aL6eZ1Q/gVVQ_4rSBAAJ)

なお、以下のフラグを付けて起動するとデフォルトで有効にできる。

`--enable-blink-features=RTCUnifiedPlanByDefault`

## [SDP Compatibility](#sdp-compatibility)

SDP は、WebRTC の通信開始前に、シグナリングで交換するデータである。

内容は、これから交換する映像/音声のコーデック他、セッションを確立するための様々な情報が含まれる。

もし WebRTC のセッションにおいて、複数の Audio/Video Stream を交換する場合は、各ストリームの情報を SDP に含める必要がある。

この _複数ストリーム情報の記述形式_ を巡っては、2 つの Plan があった。

それが _Plan A_ と _Plan B_ であり、結論としては _標準は Plan A を採用_ し、それを _Unified Plan_ と呼ぶことにした。

Firefox は Unified Plan に対応しているのだが、Chrome/Safari/Edge は Plan B に対応し今に至る。

つまり、互換性の問題があり、最終的には Plan B は撲滅し、Unified Plan に対応することが望まれていた。

Chrome がそこに対して Intent to Implement を出したことは、業界としては嬉しい知らせである。

## [Plan B](#plan-b)

[Plan B: a proposal for signaling multiple media sources in WebRTC](https://tools.ietf.org/html/draft-uberti-rtcweb-plan-00)

例えば、複数のマイクからの音声を送る場合、"m=" line をマイクごとに記述にする。

しかし、各 "m=" line 対して別トランスポートを割り当てたいとは限らない。

多重化する場合は、トランスポートは 1 つで良い。

そこで、トランスポートに対して "m=" line は 1 つにし、それを "envelope" とする。

その中に、マイクごとの定義を、"a=ssrc" で記述する。

```
m=audio 49170 RTP/AVP 101
a=ssrc:1 msid:left-mic
a=ssrc:2 msid:center-mic
a=ssrc:3 msid:right-mic
```

## [Plan A - Unified Plan](#plan-a---unified-plan)

[A Unified Plan for Using SDP with Large Numbers of Media Flows](https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00)

Plan A は、"m=" line をメディアごとに書くというシンプルな方法である。

もし多重化したい場合は、対象の "m=" line に対して BUNDLE を指定する。

この方式が WebRTC の標準として合意され、現在は Unified Plan として策定が進んでいる。

```
...
a=group:BUNDLE m1 m2 m3
...
m=audio 56600 RTP/SAVPF 0 109
a=msid:left-mic
a=mid:m1
...
m=video 56601 RTP/SAVPF 99 120
a=msid:center-mic
a=mid:m2
...
m=video 56602 RTP/SAVPF 99 120
a=msid:right-mic
a=mid:m3
...
```

## [SdpSemantics](#sdpsemantics)

Chrome は、まず WebRTCUnifiedPlan というフラグを用意するとしている。

このフラグを有効にすると、RTCConfiguration に `"sdpSemantics"` という独自プロパティを定義される。

デフォルトは `"plan-b"` であり、明示的に `"unified-plan"` を指定すれば切り替えられる。

後にデフォルトを "unified-plan" に変更し、`"plan-b"` が十分に減れば値自体が削除される。

```
new RTCPeerConnection({sdpSemantics: "unified-plan"})
```

## [影響](#影響)

今はまだ Intent to Implement なので Ship まで行くのはまだ先だ。

しかし、フラグが無くなり、デフォルトで SDP が Unified Plan になると、古い Chrome のように Unified Plan をパースできないクライアントや、Plan B を前提に作られたシステムでは、シグナリングに失敗しセッションが確立できなくなる。

また、Safari/Edge も明確なサポートプランを出していないため、引き続き Plan 間のすり合わせが何かしら必要になるだろう。

[jitsi/sdp-interop: An npm module that converts a Unified Plan SDP to Plan B and vice versa.](https://github.com/jitsi/sdp-interop)

今後 WebRTC を用いたシステムを作る際は、Unified-Plan を中心としたシステムを作り、他のブラウザとの interop を KITE などで注視しながら、Plan B を補完する構成で作るべきと言えるだろう。