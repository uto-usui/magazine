---
title: "JSConf JP 2026にプレミアムスポンサーとして参加しました #jsconfjp"
source: "https://tech.layerx.co.jp/entry/jsconf-jp-2026"
publishedDate: "2026-11-24"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "kazu004"
---

みなさん、こんにちは！今年の4月に新卒として入社した[kazu](https://x.com/KazuLayerX)です。ここ1週間で一気に冷え込んできましたがみなさん体調いかがでしょうか？自分は短かった秋が恋しいです。

LayerXは、今年もJSConf JPにプレミアムスポンサーとして協賛しました。

[JSConf JP 2025に引き続き](https://tech.layerx.co.jp/entry/2025/11/07/152140)、3回目の協賛となりました。JavaScriptコミュニティへの感謝と貢献を形にできる機会として非常に楽しみにしていました。

ということで今回は、そんな「JSConf JP 2026」の参加レポートをお届けしていこうと思います。

## 弊社登壇者と登壇内容

弊社からはスポンサーセッションとして2人、応募枠として2人の計4人が登壇しました。

### Math.sumPreciseから学ぶ、ECMAScript仕様の数値の種類

応募枠 LT（10分）・Track C 10:30〜10:40  
[syumai (@\_\_syumai) / X](https://x.com/__syumai)

[speakerdeck.com](https://speakerdeck.com/syumai/slides-303885bd-9a9f-41a1-b9e5-04ac53bb041c)

ES2026 に入った Math.sumPrecise を題材に、ECMAScript 仕様に出てくる4種類の数値（Mathematical values・Extended mathematical values・Number・BigInt）と、language types / specification types の違いを整理した内容になっております。

[syumai](https://x.com/__syumai) が主催するECMAScript 仕様輪読会を隔週火曜に開催しています！ 興味のある方は是非参加してみてください。

[esspec.connpass.com](https://esspec.connpass.com/)

### The Cost of the DOM ― jsdom / happy-dom とVitest Browser Modeの実行時間を分解する

応募枠セッション（30分）・Track C 13:00〜13:30 [ypresto (プレスト) / LayerX (@yuya\_presto) / X](https://x.com/yuya_presto)

[speakerdeck.com](https://speakerdeck.com/ypresto/the-cost-of-the-dom)

弊社のmonorepoでtest数、CIマシンの使用量が急増したのをきっかけに「実ブラウザは jsdom より遅いのか？」という疑問を持ち、実際にMantine（10,191 test）と React Aria（3,391 test）を jsdom・happy-dom・Browser Mode で比較して整理した内容になっております。

弊社のmonorepoについてはこちらの記事に記載があるので、興味のある方はぜひご覧ください！ [tech.layerx.co.jp](https://tech.layerx.co.jp/entry/bakuraku-monorepo-and-frontend-enabling)

### useReducerで実現する、堅牢で拡張可能なスプシ風コンポーネント設計

スポンサーセッション（30分）・Track D 17:30〜18:00 [やた (@0e2b3c) / X](https://x.com/0e2b3c)

[speakerdeck.com](https://speakerdeck.com/arfes0e2b3c/jsconf2026-yata)

「業務アプリのライバルはスプシ（スプレッドシート）では？」という問いかけから始まり、弊社プロダクトの機能の一部である「離職証明書の入力画面」を実現するためにスプシ風コンポーネントを作り、共通コンポーネントとして作り直した内容になっております。

### ariaNotify()で届けるAIチャットの当たり前品質

スポンサー LT（5分）・Track A 18:35〜18:40 [トビ / KazuhiroTobita (@0b1tk) / X](https://x.com/0b1tk)

[kazhiro999.github.io](https://kazhiro999.github.io/jsconf-arianotify/#/1)

AI チャットは回答が少しずつ生成され、実行中・完了・失敗と画面の状態がリアルタイムに変わります。ところがスクリーンリーダーで使うと、応答が始まったのか、終わったのか、失敗したのかが何も読み上げられず、ユーザーが自分で画面を探しに行くしかありませんでした。そこでAIチャットに`ariaNotify()` を用いて「応答が完了しました」のように伝えたい瞬間だけに読み上げの実行が行われるにしたことで、「当たり前品質」を満たすようにしたといった内容になっております。

### スポンサーブース

弊社スポンサーブースでは、[フロントエンドカンファレンス福岡2026](https://tech.layerx.co.jp/entry/2026/09/18/145656)と同じく、社内からヒアリングしたフロントエンドに関連する面白かった・苦労した実装を展示しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kazu004/20261124/20261124174823.jpg)

## 印象的だった内容

### リリースしたで終わらない。 観測できるフロントエンド開発

[yamakenji (@yamakenji24) / X](https://x.com/yamakenji24)

[speakerdeck.com](https://speakerdeck.com/yamakenji24/20261122-jsconf2026-lt-kenji-yamashita)

「リリースした機能、実際どうだったの？」に答えるため、観測を開発サイクルに組み込んだ内容でした。 昨今AIの進化もあり、今まで以上に作るハードルが下がっていると思っています。そんな時代だからこそ作ったあと、リリースしたあとにフォーカスをする。そこに対して取り組んでいくことが非常に大事だと思っています。 改めてエンジニアは作って終わりではなくて、お客様に価値を届けきることが仕事なんだなと意識させられる、素敵な登壇内容でした。

## 最後に

今回、初めて JSConf JP に参加させていただきました。仕様の深いところの話から、テスト基盤やアクセシビリティ、開発プロセスの話まで、JavaScript に関わるテーマの幅広さを改めて感じた一日になりました。

振り返ってみると、[yata](https://x.com/0e2b3c) の「体験を守るのはまだ人間の仕事」と、[yamakenji24](https://x.com/yamakenji24) の「AI で開発が速くなるからこそ、届けた価値を確かめる」が同じ方向を向いていたのが印象に残っています。作ること自体のハードルが下がった今だからこそ、何を守り、何を確かめるかを考え続けていきたいと思います。

また、12/14（月）には Frontend Night を開催します。ブースでお話しできなかった方も、ぜひ遊びに来てください！(こちらは自分も登壇します！）

[layerx.connpass.com](https://layerx.connpass.com/event/412571/)

最後になりましたが、素晴らしいカンファレンスを開催してくださった運営のみなさま、登壇者のみなさま、そして弊社ブースにお立ち寄りいただいたみなさま、本当にありがとうございました！！