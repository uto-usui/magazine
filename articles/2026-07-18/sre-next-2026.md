---
title: "SRE NEXT 2026レポート —— 協賛、参加、登壇"
source: "https://tech.smarthr.jp/entry/2026/07/17/181055"
publishedDate: "2026-07-17"
category: "design"
feedName: "SmartHR Tech Blog"
author: "kekke-n"
---

こんにちは！SmartHRのSREをしてます中間（[@kekke\_n](https://x.com/kekke_n)）です！

SmartHRは2026年7月10日（金）・11日（土）にTOC有明で開催された「SRE NEXT 2026」に参加してきました！また、ランチスポンサーセッションでは私、中間が登壇しました！

この記事では、イベントの模様と登壇内容についてレポートします。

![SRE NEXT 2026 会場で撮影したSmartHR参加メンバーの集合写真](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260717/20260717181055.jpg)

SmartHR参加メンバーの集合写真

SRE NEXTは、信頼性に関するプラクティスに関心を持つエンジニアのためのカンファレンスです。

2026年のテーマは「Inclusive SRE」で、経験豊富な SRE（Site Reliability Engineer：サイト信頼性エンジニア）だけでなく、エンジニアリングマネージャーやプロジェクトマネージャー、これから SRE に取り組み始めるチームなど幅広い層を対象としています。詳細は[公式サイト](https://sre-next.dev/2026/)をご確認ください。

## SmartHRのセッション

SmartHRはランチスポンサーセッションとして、中間が「Terraform共通モジュールをチーム横断で“変えられる”運用へ ― リリースと適用の分離」というタイトルで発表させていただきました。

[speakerdeck.com](https://speakerdeck.com/kekke_n/terraformgong-tong-moziyuruwotimuheng-duan-de-bian-erareru-yun-yong-he-ririsutoshi-yong-nofen-li)

Terraformの共通モジュールの変更しづらさを改善する「バージョニング」の取り組みについて紹介しました。

Ask The Speakerでは、同じ悩みを抱えている方ともお話しでき、少しでも参考になる情報が提供できたかなと思いました。また、懇親会でも各社Terraformの運用状況についても情報交換できて、とても有意義な時間を過ごせました。

![ランチスポンサーセッションで登壇する中間の様子](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260717/20260717181100.jpg)

登壇する中間の様子

## 印象に残ったセッション

どれも素晴らしい発表でしたが、ここでは特に印象に残ったセッションについて紹介します。

### **インフラ寄りSREでも開発に踏み出せる ~境界を越えてユーザー体験に向き合いたい~（Sansan株式会社 上司陽平（じょーし）さん）**

-   **Track B** 7/10 16:10 - 16:40

[speakerdeck.com](https://speakerdeck.com/sansantech/260710)

インフラ寄りのSREであるじょーしさんが、アプリ機能開発へ越境した発表です。開発チームにジョインするにあたってマネージャーの理解を得たうえで、開発領域を地道にキャッチアップし、最終的にはクエリ最適化やエラー対応の高速化など、信頼性向上に貢献されていました。その行動力は大いに見習いたいと感じました。

私ももともと開発側にいた人間なのですが、いつか自分もSREの知見を活かして開発の現場から信頼性に貢献してみたいと強く思いました。

### **「ちゃんとやっている」は独りよがりだった ― 不安に寄り添うインシデント対応へ（株式会社ログラス mekka さん）**

-   **Track C** 7/10 17:40 - 18:10

[speakerdeck.com](https://speakerdeck.com/chmikata/towards-incident-response-that-addresses-anxieties)

ログラスのmekkaさんによるインシデント対応改善の発表です。『うまくいっている』と思っていたインシデント対応プロセスに実は課題があり、顧客目線を取り戻すために関係者と丁寧に対話を重ね、体制を再構築していった点がとても印象的でした。

私はプロダクトチームを横断する形でSREのプラクティスを支援している立場なのですが、独りよがりなことをしていないか今一度振り返り、積極的に対話をしていくことでプロダクトチームの課題をしっかりと理解していきたいと感じました。

### **オブザーバビリティ、本当に活用できてる？―API連携×生成AIで成熟度を自動評価（合同会社DMM.com にわさと さん）**

-   **Track B** 7/11 16:20 - 16:50

[speakerdeck.com](https://speakerdeck.com/dmmsre/obuzababiritei-ben-dang-nihuo-yong-dekiteru-apilian-xi-xsheng-cheng-aidecheng-shou-du-wozi-dong-ping-jia)

DMMのにわさとさんによる、オブザーバビリティ成熟度モデルを使った自動評価の取り組みです。同社ではこのモデルをOSSとして公開しており、それに沿って社内の状況を評価しようとしていました。自己評価は実態と乖離しやすいという課題に対し、AIを活用して客観性と自動化の両方を実現していた点がとても参考になりました。

今後オブザーバビリティを推進するうえで、現在地を把握する指標としてこの成熟度モデルは非常に有用だと感じました。スモールスタートの方法も紹介されていたので、社内でも何かできないか検討したいと思います。

## **運営の方への感謝**

今回初めて登壇をさせていただいたのですが、運営の方の説明や準備がとても丁寧で、本番は落ち着いてお話しできました。また、懇親会など他の方との交流の機会も多く得られたので、とても充実した時間になりました。

改めて、運営に携わった方々に感謝したいと思います。本当にありがとうございました！

## We Are Hiring!

SmartHRでは一緒にSmartHRの信頼性を向上していきたい SREを募集中です！

今後SmartHRではバックオフィスのプラットフォームを目指しており、信頼性への投資はますます必要となっていきます！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/smarthr/pages/98449)