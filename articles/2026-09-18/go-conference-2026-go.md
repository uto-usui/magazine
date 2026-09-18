---
title: "Go Conference 2026 に Go ルドスポンサーとして参加しました！"
source: "https://tech.layerx.co.jp/entry/2026/09/18/100000"
publishedDate: "2026-09-18"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "yuuis0"
---

こんにちは。LayerX バクラク事業部でエンジニアをしている石黒です。

**2026年9月11日（金）に開催された Go Conference 2026 に、LayerX は Go ルドスポンサーとして参加しました！**

今年はブース出展に加えて、なんと 4 名のメンバーがセッション・ワークショップに登壇しました。この記事では、ブースで紹介した取り組みや、メンバーの発表をご紹介します。

Go Conference は、プログラミング言語 Go に関するセッションやワークショップなどが行われる、Go ユーザーのためのイベントです。 今年は中野セントラルパークカンファレンスで開催されました。

実践的なノウハウから最新の技術動向まで、Go の面白さが詰まったプログラムが並び、会場は活気にあふれていました。

[gocon.jp](https://gocon.jp/2026/)

LayerX は 2022 年から継続して協賛しており、今回で 5 回目となります。

協賛や LayerX と Go の関わりについては、事前の告知記事もぜひご覧ください。

[tech.layerx.co.jp](https://tech.layerx.co.jp/entry/2026/09/07/120044)

## LayerX から 4 名が登壇しました！

今年は、SIMD を使った高速化から、他の言語との連携、HTTP サーバのテスト、標準パッケージの設計まで、幅広いテーマでメンバーが登壇しました。

### Go × SIMD で高速化するベクトル検索 ～ ルーフラインモデルで SIMD が効く境界を探れ！ ～

登壇者: Hiromu Nakamura（[@po3rin](https://twitter.com/po3rin)）

[Go × SIMDで高速化するベクトル検索 ~ ルーフラインモデルでSIMDが効く境界を探れ！ ~ - タイムテーブル | Go Conference 2026](https://gocon.jp/2026/timetable/1264338/)

10 万件のベクトル検索を題材に、Go と SIMD で高速化に挑むワークショップです。

計算を速くしても、次はメモリからのデータ転送が壁になることも。性能の限界を見極める「ルーフラインモデル」を使い、計測結果から次の打ち手を考える面白さを体験できる内容でした。

[speakerdeck.com](https://speakerdeck.com/po3rin/go-x-simd-de-kousokuka-suru-bekutoru-kensaku-de-simd-ga-kiku-kyoukai-o-sagure)

### Go における FFI のこれまでとこれから

登壇者: goccy（[@goccy54](https://twitter.com/goccy54)）

[Go における FFI のこれまでとこれから - タイムテーブル | Go Conference 2026](https://gocon.jp/2026/timetable/1264506/)

C/C++ のライブラリを Go から使うときの、メモリ管理やビルド、性能の難しさを掘り下げる発表です。

cgo から WebAssembly、そして WebAssembly を Go コードとアセンブリに変換する `wasm2go` まで、実際に直面した課題と工夫をたどります。新しい手法にも残る課題を踏まえ、自分の用途に合う FFI を考えるヒントが詰まっています。

[speakerdeck.com](https://speakerdeck.com/goccy/go-niokeru-ffi-no-kore-madeto-korekara)

### synctest 時代の httptest: Go 1.27 で変わる HTTP サーバテストの裏側

登壇者: budougumi0617（[@budougumi0617](https://x.com/budougumi0617)）

[synctest時代のhttptest: Go 1.27で変わるHTTPサーバテストの裏側 - タイムテーブル | Go Conference 2026](https://gocon.jp/2026/timetable/1264549/)

タイムアウトを確かめるために、実際の時間が過ぎるのを待たずに済む HTTP テストへ。Go 1.27 の `httptest.NewTestServer` が、メモリ内の疑似通信によって `synctest` と組み合わせられる仕組みを解説する発表です。

従来の `httptest.Server` を `synctest` と組み合わせると仮想時刻がうまく進まなかった理由から、それを解決する標準ライブラリの内部実装まで掘り下げています。

[speakerdeck.com](https://speakerdeck.com/budougumi0617/go-conference2026-synctest-and-httptest)

### 標準パッケージに uuid が追加された背景から見る Go らしい意思決定

登壇者: convto（[@convto](https://twitter.com/convto)）

[標準パッケージに uuid が追加された背景から見る Go らしい意思決定 - タイムテーブル | Go Conference 2026](https://gocon.jp/2026/timetable/1264524/)

便利な機能でも、標準ライブラリへの追加には、将来にわたって互換性を守る責任が伴います。UUID の利用実績や仕様の成熟が、かつて見送られた提案をどう前進させたのか。UUID の生成を v4 と v7 に絞った判断や、あえて提供しない API の議論を通じて、長く使われるソフトウェアを育てる Go らしい設計判断に触れられる発表です。

[speakerdeck.com](https://speakerdeck.com/convto/go-127-uuid-decision)

## ブースでは、社内 AI エージェント基盤 「haro」を紹介しました

今回の LayerX ブースでは、**社内で開発・利用している AI エージェント基盤「haro」** を展示しました。

コーディングエージェントに開発を任せることが増え、手元の PC を中心とした開発環境では、さまざまな困りが出てきます。

-   PC を閉じるとAI エージェントの作業も止まってしまう
-   ローカルに強い権限や秘密情報が集中し、依存パッケージなどを経由するサプライチェーン攻撃のリスクがある
-   タスクごとに環境を用意して並列に動かすと、手元の CPU やメモリが足りなくなる
-   AI エージェントがすぐに作業を始められ、同じ条件で動作を再現できる環境を毎回用意する必要がある

こうした課題を解決するために社内で開発しているのが haro です。AI エージェントが作業するリモートの開発環境を備え、Web 画面や Slack から作業を依頼できます。

コードの調査・修正からテスト、PR の作成まで任せられ、変更したコードを実際に動かして確かめるためのプレビュー環境も用意されています。

また、社内のデータ基盤ともセキュアに連携しており、社内のデータを活用した複雑な調査も依頼できます。 haro 自身の開発にも haro を使っています。

> — LayerX Tech (@LayerX\_tech) [September 11, 2026](https://x.com/LayerX_tech/status/2098324607250104767?ref_src=twsrc%5Etfw)

haro の背景や仕組みに興味を持っていただいた方は、こちらの公開資料もぜひご覧ください。

[speakerdeck.com](https://speakerdeck.com/layerx/built-our-own-background-agent-at-layerx-number-aidevex-findy)

ブースにお立ち寄りいただいた皆さま、ありがとうございました！

## 最後に

Go Conference 2026 の運営スタッフの皆さん、登壇者・参加者の皆さん、ありがとうございました！

LayerX は、これからも日々の開発で得た知見を発信し、Go コミュニティに貢献していきたいと考えています。次のイベントでも、皆さんとお会いできることを楽しみにしています！

LayerX エンジニアブログには Go に関する記事が下記にまとまっております！こちらもぜひご覧ください！

[Go カテゴリーの記事一覧 - LayerX エンジニアブログ](https://tech.layerx.co.jp/archive/category/Go)