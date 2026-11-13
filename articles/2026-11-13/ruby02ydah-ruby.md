---
title: "北陸Ruby会議02にydahが登壇します —— みんなが「発見」したRubyの世界"
source: "https://tech.smarthr.jp/entry/2026/11/12/110000"
publishedDate: "2026-11-12"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://tech.smarthr.jp/entry/2026/11/12/110000)

こんにちは。プロダクト基盤開発本部の[@ydah](https://github.com/ydah)です。2026年11月14日(土)に、[福井県立恐竜博物館](https://www.dinosaur.pref.fukui.jp/)で開催される「[北陸Ruby会議02](https://regional.rubykaigi.org/hokuriku02/)」に登壇します！

## 北陸Ruby会議02とは

北陸Ruby会議02のテーマは、「発見」とのことです。恐竜化石の発掘調査から、恐竜の姿や当時の生態系にまつわるさまざまな発見が生まれてきた福井にちなんで、Rubyにまつわる発見を持ち寄る場として開催されるそうです。

また、会場が恐竜博物館ということもあって、なんと開会前には館内の見学時間も設けられています。一度も行ったことがないので、どんな展示があるのか今から楽しみです。

タイムテーブルも公開されており、MCP（Model Context Protocol）の新たな可能性、API開発やコードレビューを支える工夫、Rubyで挑む低レイヤーの世界、そして通信プロトコルQUICの仕組みまで、さまざまな技術を深く掘り下げることで見えてきた「発見」が紹介されるようで今からとても楽しみですね。

[regional.rubykaigi.org](https://regional.rubykaigi.org/hokuriku02/)

## gem install と require のむこうがわ

私の登壇についてですが、13時10分からの最初のセッションで、「gem install と require のむこうがわ」というタイトルで発表します。

[regional.rubykaigi.org](https://regional.rubykaigi.org/hokuriku02/#SESSION-1)

`Gemfile`に1行足して`bundle install`し、`require`する。この日々の操作の向こう側で、gemが実際に何をしているのかをRubyから確かめる発表です。

[seccomp user notification](https://man7.org/linux/man-pages/man2/seccomp_unotify.2.html)は、プロセスがシステムコールを実行する直前にカーネルが処理を止め、別のプロセスに知らせるLinuxの仕組みです。これを使うと、gemがファイルを開く、どこかへ接続する、コマンドを起動するといった動きを、その場で記録できます。

この仕組みをRubyから扱うために書いたgemの[seccomp-notify](https://github.com/ydah/seccomp-notify)と、そこから育てた調査ツールの[bonebed](https://github.com/ydah/bonebed)を使って調べたgemについて、インストール時と`require`時の挙動を観測した結果を共有します。

Linuxカーネルやseccompの予備知識は必要ありません。聴き終わったあとに少しでも`Gemfile`の1行が違って見えるようになっていればうれしいです。

## 会場でお会いしましょう！

北陸Ruby会議02の参加申込は、すでに始まっています。参加費は無料ですが、会場に入るには福井県立恐竜博物館の観覧券が別途必要です。

[hokurikurb.doorkeeper.jp](https://hokurikurb.doorkeeper.jp/events/199365)

当日お会いできることを楽しみにしています！

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることに情熱を持ったメンバーが集まっています！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)