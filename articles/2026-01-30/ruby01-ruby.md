---
title: "北陸Ruby会議01レポート —— みんなとわたしたちのRubyの使い方"
source: "https://tech.smarthr.jp/entry/2026/01/20/130000"
publishedDate: "2026-01-20"
category: "design"
feedName: "SmartHR Tech Blog"
author: "ydah"
---

2025年12月6日(土)に石川県立図書館で開催された「北陸Ruby会議01」に、SmartHRから[@ydah](https://github.com/ydah)と[@pndcat](https://github.com/pndcat)が登壇しました！  
この記事では、イベントの模様と登壇内容についてレポートします。

![図書館の2階からの景色で、たくさんの本棚が写っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260120/20260120130003.jpg)

会場の石川県立図書館

北陸Ruby会議01のテーマは、「みんなの Ruby の使い方」でした。 発表者・参加者のいろいろな Ruby の使い方の事例を紹介しあうことで、北陸における Ruby の活用の幅を広げ、Ruby を利活用する人口を増やしたいという思いで開催されました。

発表内容としては Ruby を使って作ったものや企業での Ruby の利用事例など、幅広い Ruby の使い方が紹介されていて、非常に興味深い内容が多かったです。

[regional.rubykaigi.org](https://regional.rubykaigi.org/hokuriku01/)

## 登壇

SmartHRからは社員が2名登壇しました。各登壇者からコメントをもらいましたので、紹介します。

### 計算機科学をRubyと歩む 〜DFA型正規表現エンジンをつくる～ (@ydah)

SmartHR ESP・情シス開発本部の [@ydah](https://github.com/ydah) です。

[告知ブログ](https://tech.smarthr.jp/entry/2025/11/28/100000)でお話した通り、私は「[計算機科学をRubyと歩む 〜DFA型正規表現エンジンをつくる～](https://regional.rubykaigi.org/hokuriku01/#SESSION-4)」というタイトルで登壇しました。

![スライドが投影されたスクリーンの横でマイクを持って話している](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260120/20260120130012.jpg)

登壇するydahさん

今年のお盆に取り組んでいた、正規表現エンジンの実装を元に、DFA型正規表現エンジンの基礎的な仕組みについて解説しました。テーマである「みんなの Ruby の使い方」に沿って、わたしのRubyの使い方として、「計算機科学の学習にRubyを使う」という視点を紹介しました。

すべてを説明しようとすると、まったく時間が足りないのでどこを説明してどこを省略するかは悩みましたが、正規表現エンジンの仕組みやDFAの基礎的な部分について、お伝えできていたなら幸いです。

スライドも公開していますので、興味がある方はぜひご覧ください。

[speakerdeck.com](https://speakerdeck.com/ydah/build-dfa-regex-engine-in-ruby-b97a5909-5b37-42bc-96ea-83f205303287)

### rack-attack gemによるリクエスト制限の失敗と学び (@pndcat)

SmartHR 労務プロダクト開発本部の [@pndcat](https://github.com/pndcat) です。

「[rack-attack gemによるリクエスト制限の失敗と学び](https://regional.rubykaigi.org/hokuriku01/#LT-13)」というタイトルでLT登壇しました。

![スクリーンの横でマイクをこちらに向けて、笑顔で写っている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260120/20260120130008.jpg)

登壇するpndcatさん

今回の発表では、rack-attack gem を使ったリクエスト制限（レートリミット）を追加する際の実装や、実運用の中で得られた学びを紹介しました。rack-attack は機能が多く柔軟に設定できる一方で、複雑なルールを組み合わせると、後からの拡張や調整が難しくなる点もあります。

発表スライドを準備する中で、5分に収まる内容ではないことに気づき、資料作りには苦労しましたが、リクエスト制限の概要から失敗・学びまでを早口で話しました。「ちょうど困っていたので参考になった」と言ってもらえたこともあり、発表ができてよかったです。

[speakerdeck.com](https://speakerdeck.com/pndcat/rack-attack-rate-limiting-lessons-learned)

## 感想

今回の北陸Ruby会議01では、さまざまな分野でRubyを活用している方々の発表を聞くことができ、どのトークも非常に興味深いものばかりでした。

一般的にRubyといえばWebアプリケーション開発のイメージが強いですが、今回はWebの枠を飛び越えた「外の世界」での活用事例が多く見られたのが印象的でした。 たとえば、物理的な配線管理にデータモデリングを応用する話や、IoTなどのハードウェア制御、さらにはゲーム（Minecraft）の世界に介入するModding/DSLの話など、その守備範囲は驚くほど広大です。こうした多様な発表を通じて、汎用言語としてのRubyが持つ根源的な魅力を再認識できました。

また、「多様性」や「構造」といったキーワードは、コードの中だけでなく、組織運営やコミュニティの在り方にも通底していました。技術としてのRubyだけでなく、それを取り巻くコミュニティや文化を含めた「Rubyっぽさとは何か」を改めて考える、非常に良い機会になったと感じています。

スタッフの方の様子を拝見していると、北陸地域でのRubyコミュニティの活き活きとした雰囲気が伝わってきて、地域Ruby会議ならではの温かさを感じました。 また会場も石川県立図書館という素晴らしいロケーションですし、休憩時間につい色々なところを探索してしまうほど魅力的な場所でした。 そして、地元の美味しい食べ物もたくさん堪能できましたし、参加者同士の交流も深まり、とても充実した一日を過ごすことができました。

スタッフの皆さま、協賛企業の皆さま、登壇者の皆さま、参加者の皆さま、本当にありがとうございました！

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることをミッションとして掲げています。

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)

![図書館の中心で4人がこちらを向いてポーズをしている](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260120/20260120130005.jpg)

異世界転生のような構図になった集合写真