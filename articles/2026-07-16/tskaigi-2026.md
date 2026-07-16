---
title: "「TSKaigi 2026事後勉強会」を開催しました"
source: "https://tech.smarthr.jp/entry/2026/07/15/142756"
publishedDate: "2026-07-15"
category: "design"
feedName: "SmartHR Tech Blog"
author: "tokky0425"
---

こんにちは！ SmartHRでプロダクトエンジニアをしている [tokky](https://x.com/Tokky0425) です。

この記事では、先日開催した「[TSKaigi 2026事後勉強会](https://smarthr.connpass.com/event/392342/)」の様子をお届けします。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142759.jpg)

TSKaigi 2026事後勉強会アイキャッチ

## 目次

-   [目次](#目次)
-   [開催概要](#開催概要)
-   [オープニング](#オープニング)
-   [TSKaigiへの参加が初めてだった方のLT](#TSKaigiへの参加が初めてだった方のLT)
    -   [Vite+を爆速で社内デザインシステムに導入してみた](#Viteを爆速で社内デザインシステムに導入してみた)
    -   [なぜ型を書くのか？ TSKaigi2026で改めて考える](#なぜ型を書くのか-TSKaigi2026で改めて考える)
    -   [共通化で考えるべきは、実装より公開する型だった](#共通化で考えるべきは実装より公開する型だった)
-   [TSKaigiへの参加が2回目以上だった方のLT](#TSKaigiへの参加が2回目以上だった方のLT)
    -   [a11yのルール違反をコンパイルタイムで明確にしてみた話〜LSP〜](#a11yのルール違反をコンパイルタイムで明確にしてみた話LSP)
    -   [UIパーツの設計を「型」から読み解く](#UIパーツの設計を型から読み解く)
    -   [「いつテストを書くか？」から考えるTDDの未来と不安](#いつテストを書くかから考えるTDDの未来と不安)
-   [TSKaigi 2026スピーカーによるLT](#TSKaigi-2026スピーカーによるLT)
    -   [なぜ俺の Array#includes は string を受け取れないのか](#なぜ俺の-Arrayincludes-は-string-を受け取れないのか)
    -   [Valibotを5分で\*\*Vali\*\*推してみる](#Valibotを5分でVali推してみる)
    -   [本当にTypeScriptのclassを使わずにシステムを運用できるの？](#本当にTypeScriptのclassを使わずにシステムを運用できるの)
    -   [「いつテストを書くのか？」で話せなかったこと](#いつテストを書くのかで話せなかったこと)
-   [TSKaigi 2026スタッフによるLT](#TSKaigi-2026スタッフによるLT)
    -   [TSの"暗黙的リターン"と向き合ってみた](#TSの暗黙的リターンと向き合ってみた)
    -   [Oxlint eslint-plugin rule implementation](#Oxlint-eslint-plugin-rule-implementation)
-   [写真撮影](#写真撮影)
-   [懇親会](#懇親会)
-   [さいごに](#さいごに)
-   [We Are Hiring!](#We-Are-Hiring)

## 開催概要

[TSKaigi 2026](https://2026.tskaigi.org/)のサイドイベントとして、6月25日にSmartHRで「TSKaigi 2026事後勉強会」を開催しました。

当日は、60分間で12本の5分間トークをお届けするLightning Talksを実施しました。TSKaigi 2026を通じて得た知見や気づき、TypeScriptについて共有したいことなどをお話しいただきました。

## オープニング

司会は、SmartHRの[kazuemon](https://x.com/kazuemon_0602)さんです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142802.jpg)

司会のkazuemonさんがオープニングで話している様子

ここからは、LT本編の紹介です。最初のブロックは、TSKaigiに初参加した方々によるLTです。

### Vite+を爆速で社内デザインシステムに導入してみた

1人目は、ぶりおさんによる「Vite+を爆速で社内デザインシステムに導入してみた」でした。

Vite+ を実プロジェクトに採用して感じたメリットと、運用で直面した辛みをふりかえる内容でした。Vite・Vitest・Oxlint・Oxfmtをすでに使っているなら、設定ファイルを `vite.config.ts` 一つに集約でき、バンドルサイズやキャッシュの面でも恩恵が大きいとのことでした。これからの移行を検討しているチームにとって参考になりそうです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142805.jpg)

ご登壇中のぶりおさん

[Vite+を爆速で社内デザインシステムに導入してみた | TSKaigi 2026事後勉強会](https://slide.burio16.com/vite-plus-retro)

### なぜ型を書くのか？ TSKaigi2026で改めて考える

次は、梶川琢馬さんによる「なぜ型を書くのか？ TSKaigi2026で改めて考える」でした。

TSKaigi 2026の内容を踏まえて、「なぜ型を書くのか」というテーマを改めて考える内容でした。型を書くことは「取りうる値の範囲を絞る」行為であり、ありえない状態を最初から表現できなくするという説明がとても腑に落ちました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142808.jpg)

ご登壇中の梶川さん

[speakerdeck.com](https://speakerdeck.com/kajitack/tskaigimeetup-why-write-types)

### 共通化で考えるべきは、実装より公開する型だった

次は、65bansekiさんによる「共通化で考えるべきは、実装より公開する型だった」でした。

共通化を考える際に、実装そのものよりも公開する型のほうが重要だったという気づきについてのお話でした。共通化の判断基準は処理の類似性ではなく「同じアクターの関心から変わるか」にあり、公開する型にアクターが2つ以上現れたら要注意、という切り口が印象的でした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142811.jpg)

ご登壇中の65bansekiさん

[speakerdeck.com](https://speakerdeck.com/codeegg/gong-tong-hua-dekao-erubekiha-shi-zhuang-yorigong-kai-suruxing-datuta)

## TSKaigiへの参加が2回目以上だった方のLT

次のブロックは、TSKaigiへの参加が2回目以上だった方によるLTです。

### a11yのルール違反をコンパイルタイムで明確にしてみた話〜LSP〜

次は、SmartHRのkesteerさんによる「a11yのルール違反をコンパイルタイムで明確にしてみた話〜LSP〜」でした。

TypeScriptのLSPを活用して、アクセシビリティルールの違反をエディタ上で検証する取り組みについてのお話でした。LSPの活用方法の好事例かと思いきや、実はあまり相性は良くなかったという結論も意外で興味深かったです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142815.jpg)

ご登壇中のkesteerさん

### UIパーツの設計を「型」から読み解く

次は、0yuさんによる「UIパーツの設計を『型』から読み解く」でした。

TSKaigiのセッションから得た学びをもとに、UIパーツの設計を「型」の視点から読み解く内容でした。トグルと非トグルの責務が混ざったアイコンコンポーネントを、Discriminated Unionで不可能な状態を排除しながら再設計する事例が分かりやすかったです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142818.jpg)

ご登壇中の0yuさん

[speakerdeck.com](https://speakerdeck.com/yud0uhu/uipatunoshe-ji-wo-xing-karadu-mijie-ku-tskaiginosetusiyonkarade-taxue-bi)

### 「いつテストを書くか？」から考えるTDDの未来と不安

次は、TDD野郎さんによる「『いつテストを書くか？』から考えるTDDの未来と不安」でした。

「いつテストを書くか？」という問いを起点に、TDDの未来と不安について考える内容でした。AIにTDDを任せるのが当たり前になる中で、エンジニアが「不安を検知する力」を失いかねないという問題提起が新鮮でした。また、仏教の三慧になぞらえた「聞・思・修」のフレームワークで学びを循環させるという提案が印象に残りました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142821.jpg)

ご登壇中のTDD野郎さん

[speakerdeck.com](https://speakerdeck.com/letsdotdd/itutesutowoshu-kuka-karakao-erutddnowei-lai-tobu-an-e5f13920-1c84-48e6-9e23-f6d9634ee28a)

## TSKaigi 2026スピーカーによるLT

次のブロックは、TSKaigi 2026スピーカーによるLTです。

### なぜ俺の Array#includes は string を受け取れないのか

次は、SmartHRのnabeliwoさんによる「なぜ俺の Array#includes は string を受け取れないのか」でした。

`as const` した配列に対する `Array#includes` に `string` を渡せない問題を入り口に、TypeScriptのissueを掘り下げ、現時点で他に提案されている構文を学んだお話でした。身近な型エラーからここまで掘り下げていく過程がおもしろかったです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142824.jpg)

ご登壇中のnabeliwoさん

[nabeliwo.github.io](https://nabeliwo.github.io/slides/talks/20260625_tskaigi-2026-smarthr_typescript-array-includes)

### Valibotを5分で\*\*Vali\*\*推してみる

次は、Kanonさんによる「Valibotを5分で\*\*Vali\*\*推してみる」でした。

バリデーションライブラリのValibotについて、その魅力を5分で紹介する内容でした。Zod v4比で初期化が16倍高速、必要な分だけ読み込むモジュラー設計といった公式が推している強みに加え、公式サポートツールの守備範囲が広がっている点を特に推されていました。FormischやJSON Schemaへの変換ツールなど公式ツールが揃いつつある点も、ライブラリ選定の判断材料として参考になりました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142852.jpg)

ご登壇中のKanonさん

[blog.inorinrinrin.com](https://blog.inorinrinrin.com/entry/2026/06/25/135305)

### 本当にTypeScriptのclassを使わずにシステムを運用できるの？

次は、kosuiさんによる「本当にTypeScriptのclassを使わずにシステムを運用できるの？」でした。

TSKaigi本編では、部分的構造型やthisの曖昧さなど、classを使うことによる不安定さを指摘されていましたが、それの続きといった形のLTでした。実際にclassを使わずに運用されているプロダクトでの取り組みを元にシステム構築のポイントが具体的に紹介されていて、説得力のある内容でした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142827.jpg)

ご登壇中のkosuiさん

[kosui.me](https://kosui.me/talks/2026/tskaigi-afterparty)

### 「いつテストを書くのか？」で話せなかったこと

次は、lacolacoさんによる『「いつテストを書くのか？」で話せなかったこと』でした。

TSKaigi本編での「いつテストを書くのか？」というテーマに関連して、話せなかったことを補足する内容でした。テスト駆動開発で駆動するものは何か？といった見落としがちな問いや、変更容易性に対する痛覚を持ち続けるのが人間の役割なのではないかという考察が印象的でした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142830.jpg)

ご登壇中のlacolacoさん

## TSKaigi 2026スタッフによるLT

次のブロックは、TSKaigi 2026スタッフによるLTです。

### TSの"暗黙的リターン"と向き合ってみた

次は、tsuyuniさんによる「TSの"暗黙的リターン"と向き合ってみた」でした。

TypeScriptにおける暗黙的なreturn（implicit returns）についてのお話でした。TypeScriptの挙動で疑問に思ったことを紐解いていくためにECMA-262を参照されていて、言語仕様の理解を深めるためのアプローチが参考になりました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142833.jpg)

ご登壇中のtsuyuniさん

### Oxlint eslint-plugin rule implementation

最後は、fujitani soraさんによる「Oxlint eslint-plugin rule implementation」でした。

OxlintにおけるESLintプラグインの実装についてのお話でした。ルールの追加が、ルール本体だけでなく実行経路への登録・スキーマ定義・テスト検証まで一連の作業で成り立っていることが具体的に理解できました。`node/prefer-global-console` の実装例を通して、リンター開発の裏側を覗ける貴重な内容でした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142836.jpg)

ご登壇中のfujitani soraさん

## 写真撮影

LT終了後、記念撮影をしました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142839.jpg)

「TypeScriptのT」ポーズで集合写真

## 懇親会

そして、最後に懇親会です。TypeScriptにまつわる話題で交流・情報交換を楽しみました！

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142843.jpg)

乾杯をするnabeliwoさん

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715142846.jpg)

懇親会の様子

締めの挨拶は、TSKaigiスタッフのike\_keichanさんに行っていただきました！

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260716/20260716103530.jpg)

締めの挨拶をするike\_keichanさん

## さいごに

以上、TSKaigi 2026事後勉強会の開催レポートでした。

イベント当日は40名以上の方々にご参加いただき、TSKaigi 2026のサイドイベントを締めくくることができました 👏  
アンケートでは、短時間でいろいろな視点の話が聞けて良かったという声をいただくことができました。また、フィードバックもいただいているので、今後参考にさせていただきたいと思います。

ご登壇・ご参加いただいた皆様、本当にありがとうございました！

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)