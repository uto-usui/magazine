---
title: "JaSST'26 Niigata 参加レポート：基調講演・事例発表でLayerXメンバー4名がお話ししました #JaSST"
source: "https://tech.layerx.co.jp/entry/2026/10/02/110935"
publishedDate: "2026-10-02"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "matsu802"
---

こんにちは！LayerX バクラク事業部 QAマネージャーの松山（matsu）です。

2026年9月18日（金）に開催された「JaSST'26 Niigata（ソフトウェアテストシンポジウム 2026 新潟）」で、LayerXのメンバー4名が登壇しました。

今回は実行委員会からお声がけいただき、基調講演と事例発表をすべてLayerXのメンバーで担当させていただきました。また、ゴールドスポンサーとしても協賛し、当日はブースを出展しました。この記事では、当日の登壇資料と会場の様子、参加した感想をまとめます。

協賛の告知記事はこちらです。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2026/09/15/180022)

## JaSST'26 Niigata とは

JaSST（Japan Symposium on Software Testing）は、NPO法人ソフトウェアテスト技術振興協会（ASTER）が主催するソフトウェアテストのシンポジウムです。全国各地で開催されていて、新潟での開催は今回で16回目でした。

-   **テーマ**：AI時代のQA Re-Engineering —— 思考の純度を高め、品質の壁を突破する
-   **日時**：2026年9月18日（金）
-   **会場**：NINNO（ニーノ）とオンラインのハイブリッド開催
-   **URL**：[https://jasst.jp/niigata/26-about/](https://jasst.jp/niigata/26-about/)

AIの活用が当たり前になった今、品質保証をどう捉え、人間にしかできない思考をどう深めるか。今年はこうした問いをテーマに議論する回でした。

## 登壇資料まとめ

### 基調講演：AIに任せた品質は、誰が見立てるのか ── AI時代のテストマネジメント

**登壇者**：中野 直樹（[@TestingGolem](https://x.com/TestingGolem)）

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930171329.jpg)

AIはテストの作業をこなせても、品質に責任を持つことはできない。人が責任を持つための技術がテストマネジメントである、という講演です。テスト計画から精度改善までの各工程で、AIに渡すべき入力と人が担う判断を整理し、最後の判断と責任は人に残ると結論づけました。

[speakerdeck.com](https://speakerdeck.com/nakanao/ai-ni-makaseta-hinshitsu-ha-dare-ga-mitateru-no-ka-ai-jidai-no-tesuto-manejimento)

### 事例発表：プログラミング未経験者を含むQA組織で、コードベースE2E自動テストをどう始め、どう続けるか

**登壇者**：山口 鉄平（[@teyamagu](https://x.com/teyamagu)）

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930171417.jpg)

以前の職場では「みんなで自動テストを書こう」という呼びかけだけでは、自動テストは組織に定着しませんでした。発表では、まず推進役が自動テスト作成ガイド、コーディングルール、サンプルコードからなる「型」を整備し、その後に段階的にメンバーを巻き込んでいった進め方を紹介しました。あわせて、初期段階ではレビューを推進役に集約して書き方のばらつきを抑え、指摘がなくなった段階で推進役のレビューを終える運用についてもお話ししました。

[speakerdeck.com](https://speakerdeck.com/teyamagu/starting-and-sustaining-code-based-e2e-testing-for-non-coding-qa-teams)

### 事例発表：確率と戦うAIプロダクト 〜「守り」と「攻め」を分ける2層テストアーキテクチャ〜

**登壇者**：松山 晃大（[@matsu\_qa](https://x.com/matsu_qa)）

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930171613.jpg)

題材は、AIプロダクトの品質保証です。同じ入力でも出力が確率的に揺らぐAIプロダクトに対して、精度の高めるテストと精度を下げないテストの2層に分けて運用しています。発表では、スコアの差分を使った自動判定や、ユーザーフィードバックを起点にテストケースを増やしていく運用についてもお話ししました。

[speakerdeck.com](https://speakerdeck.com/matsu802/jasst-26-niigata-kakuritsu-to-tatakau-ai-purodakuto)

### 事例発表：QAエンジニアの暗黙知を可視化する：自動テスト戦略とAIの差分から見えたもの

**登壇者**：髙橋 諒（[@hashi\_qae](https://x.com/hashi_qae)）

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930171704.jpg)

QAエンジニアの品質基準を言語化し、AIコーディングアシスタントに組み込んだ取り組みの発表です。バクラク給与の給与計算機能を題材に、AIが提案する自動テストと、人間がリスクベースで設計したテストを比較しました。その差分から、QAエンジニアが普段は意識せずに使っている判断基準を浮かび上がらせています。

[speakerdeck.com](https://speakerdeck.com/ryotakahashi/qa-enjinia-no-anmoku-chi-o-kashika-suru-jidou-tesuto-senryaku-to-ai-no-sabun-kara-mieta-mono)

## ブース出展：QAエンジニアゲーム「QA戦記」

LayerXのブースでは、本イベントのために制作したゲーム「QA戦記」を遊べるようにしました。QAエンジニアとしてさまざまな判断を重ね、最終的なランクを目指すゲームです。プレイしていただいたほとんどの方はランクA以上で、皆さんのQA力の高さを改めて実感しました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930172850.jpg)

## 当日の様子

今回のJaSST'26 Niigataは、新潟のNINNO（ニーノ）さんで開催されました！当日は快晴で、9月にしては少し暑いくらいでした。 登壇者と参加者の距離が近く、発表中もうなずきながら聴いてくださる方が多かったのが印象的でした。オンラインからいただいた質問も含めて全体的に和やかな雰囲気で、登壇者としてもとても話しやすかったです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930173554.jpg)

情報交換会（懇親会）では、登壇内容への質問をいただいたり、各社のQAの取り組みを伺ったりと、たくさんの方とお話しできました。料理には新潟名物の半身揚げやへぎそばが並び、どれもおいしくいただきました！

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/matsu802/20260930/20260930174032.jpg)

## 参加してみての感想

まず何より、JaSSTという場で基調講演から事例発表までをLayerXのメンバーで担当させていただけたことは、チームとして大きな経験になりました。同じ組織のメンバーがそれぞれの切り口でAI時代のQAを語ることで、LayerXのQA組織がどんなことを考え、どう取り組んでいるのかを、まとまった形でお伝えできたと思います。

また、現地参加して社外のQAエンジニアやソフトウェアエンジニアの方と直接お話ができ、各社が抱えている課題や工夫をリアルな温度感で聞けたのは、現地ならではの貴重な機会でした。

自分自身にとっても、JaSSTという場で発表できたのは貴重な経験でした。また機会があれば、ぜひ登壇に挑戦したいと思います！

## さいごに

JaSST'26 Niigata 実行委員会の皆さま、素敵な場をご用意いただきありがとうございました。ご参加いただいた皆さま、LayerXのセッションを聴いてくださった皆さまにも、心より感謝申し上げます。

### QAエンジニア募集中です！

LayerXでは、AI時代の品質保証に一緒に向き合ってくれるQAエンジニアを募集しています。今回の登壇内容に少しでも興味を持っていただけた方は、ぜひお気軽にカジュアル面談でお話ししましょう！

-   [QAエンジニアの求人](https://open.talentio.com/r/1/c/layerx/pages/52742)
-   [カジュアル面談（Open Door）](https://jobs.layerx.co.jp/opendoor/563522ad6de940f09d4e5f45b5716569/)