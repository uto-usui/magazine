---
title: "RubyKaigi 2026にSmartHRから3名が登壇しました"
source: "https://tech.smarthr.jp/entry/2026/06/30/143000"
publishedDate: "2026-06-30"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

こんにちは、SmartHRの [@ydah](https://github.com/ydah)、[@osyoyu](https://github.com/osyoyu)、[@udzura](https://github.com/udzura) です。

2026年4月22日（水）から24日（金）まで、北海道・函館で開催されたRubyKaigi 2026に、SmartHRから3名が登壇しました！ この記事では、登壇した3名それぞれから、セッションの紹介と登壇してみての感想をお届けします。

## RubyKaigi 2026とは

RubyKaigi 2026は、2026年に北海道・函館で開催された、Ruby言語に関する国際カンファレンスです。

[rubykaigi.org](https://rubykaigi.org/2026/)

Ruby言語のコア実装や周辺技術にフォーカスした発表が集まり、Rubyistにとって年に一度の大きなイベントです。2026年は函館アリーナ・函館市民会館を会場に、3日間にわたってRubyの現在地とこれからを感じられるセッションが行われました。

SmartHRはRubyKaigi 2026に「Hangout Sponsor」として協賛し、会場でも多くのRubyistのみなさんと交流することができました。 また、SmartHRからも多くのメンバーが現地に参加し、さまざまなテーマの発表を楽しみました。

![ステージ上に並んで立つ3名の登壇者の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260630/20260630143014.png)

[たまり場「五稜郭」のWednesday Speaker Showdown](https://tech.smarthr.jp/entry/thank_you_hakodate#Wednesday-Speaker-Showdown)で壇上に集まった osyoyu、udzura、ydah の3名

## Liberating Ruby's Parser from Lexer Hacks (@ydah)

プロダクト基盤開発部の @ydah は、Rubyの構文解析器の改善について発表しました。

![スクリーンに投影したスライドを前に発表する ydah の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260630/20260630143009.png)

登壇する ydah

### こんな登壇をしました

Rubyの字句解析器（レキサー）は、同じ記号でも文脈によって意味が変わる言語仕様を扱うため、`lex_state`と呼ばれる状態管理に依存してきました。たとえば`*`は掛け算にもsplatにもなり、`<<`は左シフトにもヒアドキュメントの開始にもなります。この`lex_state`は構文解析器（パーサー）と密結合しており、保守性の低さや意味論の見えにくさという課題を抱えていました。

この発表では、字句解析器と構文解析器の間で情報を双方向にやり取りするPSLR(1)（Pseudo-Scannerless Minimal LR(1)）というアプローチを紹介しました。構文解析器が持つLR状態を字句解析器と共有することで、字句解析器が独自の状態を持たなくても次に来うるトークンを判断できるようになります。

その結果、`lex_state`が混在させていた曖昧性を層ごとに分解し、実装上の問題・字句解析と構文解析の境界の問題・言語設計に由来する問題へと整理できました。最大の成果は`lex_state`を取り除くこと自体ではなく、Rubyの文法的な曖昧性の構造が可視化されたことだと考えています。

### 登壇した感想

CRubyとLramaのコミッターとして、向き合ってきた`lex_state`という難物にひとつの整理をつけられたことを発表できて、とても充実した時間でした。函館の会場で発表を聞いてくださったみなさん、質問やコメントをくださったみなさん、ありがとうございました！

### 登壇資料

[speakerdeck.com](https://speakerdeck.com/ydah/liberating-rubys-parser-from-lexer-hacks)

## ext/profile, or How to Make Profilers Tell the Truth (@osyoyu)

テクノロジーマネジメント本部の @osyoyu は、昨年に引き続きプロファイラに関するセッションに登壇しました。

![スクリーンに投影したスライドを前に発表する osyoyu の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260630/20260630143002.jpg)

登壇する osyoyu

### こんな登壇をしました

プロファイラの実装をGemに置くのではなく、思い切ってCRubyのVMに埋め込んでしまうといいのではないか？ という発表です。しばらく前から温めてたアイデアです。

というのは、プロファイラの実装はどうしても処理系に対して侵襲的になるものだからです。なんの仕掛けもなければ、サンプリングの瞬間の実行状況を外部から取得することはできません。この需要に応えるため、CRubyをはじめとした高度なVMはたいていプロファイリングのために処理系内部の情報を露出するポイントをそなえています。

CRubyでいえば `rb_profile_frames()` がこれにあたりますが、高度化するプロファイラの需要に応え続けようとすると、こういったAPIも無限に拡張しなければなりません。むやみな拡張は、APIを長くメンテナンスする立場では避けたいことのひとつです。

そこで、いっそのことプロファイラ自体を処理系に埋め込んで仕舞えばいいのでは？ という主張を打ってきました。そうすれば情報を外部に露出せずとも、プロファイラは必要な情報を自由に取得できますからね。

### 登壇した感想

まさか人生で「アリーナ」と名のつく場所でステージに立つことになるとは。いやはや、物事は分からないものですね。

### 登壇資料

[https://static.osyoyu.com/talks/rubykaigi2026\_extprofile.pdf](https://static.osyoyu.com/talks/rubykaigi2026_extprofile.pdf)

## Uzumibi: Reinventing mruby for the Edges (@udzura)

人給基幹プロダクト基盤開発本部の @udzura は、RubyにおけるWebAssembly（Wasm）とエッジコンピューティングの可能性について発表しました。

![スクリーンでライブデモをしながら発表する udzura の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260630/20260630143006.jpg)

登壇する udzura

### こんな登壇をしました

RubyのユースケースとしてWasmはホットです。ですが、CRubyをWasmバイナリにして動かす場合、現状それなりのバイナリサイズになってしまいます。

そこで、私はエッジ環境等のより容量が小さい方が喜ばれる場面向けに、mrubyをRustで再実装した[mruby/edge](https://mrubyedge.github.io/mrubyedge/)を開発し、それをWasmバイナリにコンパイルして動かしました。また、そのmruby/edgeを元に[Uzumibi](https://mrubyedge.github.io/uzumibi/)というWebフレームワークも作り、Cloudflare Workersなど向けのアプリをRubyで書けるようにしました。

今回の登壇ではそれらのデモをしてから、内部実装の解説を行い、今後の展望などについて話しました。

### 登壇した感想

まず、究極的には「RustでmrubyのVMを作る」というマニアックなトークだったにも関わらず、かなりの人が集まってくださったので感謝です。出てくるコードも、半分ぐらいRustだったような…。[コード懇親会](https://andpad.connpass.com/event/385946/)でもRustテーブルをファシリテートさせてもらったり、私にとっての今年はRust固めでした。しかし函館でカニは食べませんでした（？）。

また、今年はhadashiAさんの[C#製mruby VM](https://rubykaigi.org/2026/presentations/hadashiA.html)など、mruby VM自作の当たり年で楽しかったですね！

mruby/edge＋Uzumibiも、早速[同僚がブログを作ってくれたり](https://blog.ngt-y.uk/post/built_a_blog_with_uzumibi_and_funicular)、[PRを送ってくれたり](https://github.com/mrubyedge/uzumibi/pull/36)など、いろいろフィードバックがあって嬉しかったです。mruby/edgeとUzumibiは今後もじわじわ機能開発をしていきます。

### 登壇資料

[udzura.jp](https://udzura.jp/slides/2026/rubykaigi/)

## 最後に

RubyKaigi 2026で発表を聞いてくださったみなさん、登壇後に感想や質問をくださったみなさん、ありがとうございました。 また、RubyKaigi 2026を運営してくださったみなさん、スポンサー各社のみなさん、そして函館で一緒にRubyKaigiを過ごして下さったみなさんにも感謝しています。

3名それぞれ、異なるテーマでの登壇でしたが、どの発表もRubyの現在地とこれからの可能性につながる内容でした。 SmartHRはこれからも、Rubyを使ったプロダクト開発と、Rubyコミュニティへの貢献の両方を大切にします。

![会場でカメラに向かって笑顔で並ぶSmartHRメンバーの集合写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260630/20260630143017.png)

RubyKaigi 2026に参加したSmartHRメンバーの集合写真

## We Are Hiring!

SmartHRでは、一緒にSmartHRをつくっていく仲間を募集しています。

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることに取り組んでいます。

Ruby、Rails、プロダクト開発、OSS、開発者体験などに興味がある方は、ぜひカジュアル面談などでお話ししましょう！