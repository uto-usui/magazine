---
title: "RubyKaigi 2026 follow upレポート —— SmartHRから3名が登壇し、ブースも出展！"
source: "https://tech.smarthr.jp/entry/2026/10/01/140512"
publishedDate: "2026-10-01"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは！プロダクトエンジニアの[itojum](https://x.com/itojum1230)です。 SmartHRは、2026年9月5日に東京都港区三田の株式会社IVRyで開催された[RubyKaigi 2026 follow up](https://rhc.connpass.com/event/392503/)に協賛し、SmartHRの[RubyKaigi 2026](https://rubykaigi.org/2026/)登壇者による発表のその後を報告し、スポンサーLT・ブース出展を行いました！

この記事では、イベントの模様と登壇内容をレポートします。

## RubyKaigi 2026 follow upとは

RubyKaigi 2026 follow upは、RubyKaigi 2026で「今後はこうしていこうと思っています」と言っていた人に、その「今後」を伺うイベントです。登壇では、RubyKaigi 2026から今までの進捗や今後の話を共有していただきました。

![着席した参加者で埋まった会場を後方から写した写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261001/20261001150723.jpg)

会場の様子

## 「net/http and friends」（@osyoyu）

こんにちは、osyoyuです。

RubyKaigiでは「[ext/profile, or How to Make Profilers Tell the Truth](https://rubykaigi.org/2026/presentations/osyoyu.html)」と題してプロファイラについて話したのですが、今回はそれとはまったく関係のないnet/httpの話をしました。

スライドは以下からどうぞ。 [https://static.osyoyu.com/talks/rubykaigi2026followup.pdf](https://static.osyoyu.com/talks/rubykaigi2026followup.pdf)

Rubyの標準添付ライブラリであるnet/httpのAPIが少しばかり年季が入ってきていて、このように近代化できたらうれしいな、という内容です。たとえば、何も意識せずともコネクションが再利用されるようになるとパフォーマンス面での恩恵が大きそうだなと思っています。

しかし、新しいライブラリを作ったり、ライブラリに機能を足したとしても、AI（LLM）がそれを認知するまでは使われない時代に入っている感がありますね。そのリードタイムをどう早めるか、という点も議論しがいがありそうですね。

## その後の報告「PSLR(1)」（@ydah）

プロダクトエンジニアの[ydah](https://github.com/ydah/)です。普段はSmartHRのプロダクト基盤を開発しており、趣味としてRubyコミッター、[Lrama](https://github.com/ruby/lrama)のコミッターとしてRubyの構文解析器の改善に取り組んでいます。

私はRubyKaigi 2026での発表「[Liberating Ruby's Parser from Lexer Hacks](https://rubykaigi.org/2026/presentations/ydah_.html)」のその後を、「PSLR(1)」というタイトルで報告しました。 はじめにおことわりですが、今回の発表資料は公開していません。すみません。

発表の主題は、Rubyの`parse.y`に大量にある`lex_state`による手書きの字句文脈管理を、PSLR(1)（Pseudo-Scannerless Minimal LR(1)）によって構文解析器の生成側へ移すことです。 `1 / 2`の`/`は割り算ですが、`puts /foo/`の`/`は正規表現リテラルの開始です。このように構文上の文脈を知らないと、字句解析器は正しくトークンに分けられません。 PSLR(1)では、構文解析器が次のトークンを要求するときに現在のLR状態番号も渡します。これによって、その位置で許されるトークンを、字句解析器が自分で状態を持たずに判断できるようになります。

今回の発表では、字句競合を宣言的に解決する`%lex-prec`や、状態の併合が字句解析の結果を変えないようにIELR(1)の併合条件を拡張した話など、Lramaでの実装の進捗を報告しました。詳しくは解説記事を後日公開しようと思っているので、興味のある方はぜひチェックしてください。

## スポンサーLT「新卒エンジニアのKaigiEffect」（@itojum1230）

私はスポンサーLTで「新卒エンジニアのKaigiEffect」という発表を行いました。 SmartHRに新卒社員として入社してすぐのRubyKaigi 2026で刺激をうけて、半年間どのような活動をしてきたのかを語りました。

イベントへの参加、オープンソースソフトウェア（OSS）への貢献、プロポーザル提出と、それらをサポートするSmartHRの魅力についてお話ししました。

![スクリーンの前でマイクを持ち発表するitojumと、それを見る参加者の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261001/20261001150720.jpg)

スポンサーLTをするitojumと会場の様子

[speakerdeck.com](https://speakerdeck.com/itojum/rubykaigi-2026-follow-up-smarthr-suponsa-lt)

## SmartHRのブース

今回のイベントでSmartHRはブースを出展しました。SmartHRからの登壇者であるosyoyuさんとydahさんからのお土産を配りました。osyoyuさんからは塩バニラフィナンシェや鳩サブレーなど横浜のお土産、ydahさんからは聖護院八ッ橋や大津絵煎餅など関西のお土産を提供しました！

![お土産のお菓子が並べられたSmartHRのブースの写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261001/20261001150726.jpg)

SmartHRのブースの様子

![塩バニラフィナンシェや鳩サブレーなど、osyoyuさんが提供した横浜のお土産の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261001/20261001150730.jpg)

osyoyuさんのお土産

![聖護院八ッ橋や大津絵煎餅など、ydahさんが提供した関西のお土産の写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261001/20261001150733.jpg)

ydahさんのお土産

## We Are Hiring!

SmartHRでは、一緒にプロダクトを作りあげていく仲間を募集中です！

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)