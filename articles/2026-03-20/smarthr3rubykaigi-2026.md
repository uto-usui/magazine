---
title: "SmartHRから3名がRubyKaigi 2026に登壇！ —— 函館でイカしたトークをお届けします"
source: "https://tech.smarthr.jp/entry/2026/03/18/120000"
publishedDate: "2026-03-18"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

RubyKaigi 2026に、SmartHRからプロダクトエンジニア3名が登壇します！ 登壇者からのコメントとともに紹介します。

SmartHRは、RubyKaigi 2026に「Hangout Sponsor」として協賛します。

## RubyKaigi 2026とは

RubyKaigi 2026は、2026年に北海道・函館で開催される、Ruby言語に関する国際カンファレンスです。Ruby言語のコア実装や周辺技術にフォーカスした発表が集まる、Rubyistにとって年に一度の大イベントです。

[rubykaigi.org](https://rubykaigi.org/2026/)

## 登壇内容

それでは、今回登壇する3名のセッション概要と、本人の意気込みコメントをご紹介します。

### ext/profile, or How to Make Profilers Tell the Truth (@osyoyu)

テクノロジーマネジメント本部の[@osyoyu](https://github.com/osyoyu)は、昨年に引き続きプロファイラに関するセッションに登壇します。

#### セッション概要

プログラムが遅くて困っているとき、ホットスポットを特定してくれ頼りになるツールがプロファイラです。が、プロファイラは「真実」を語るわけではなく、何かの魔法でもなく、実行情報をかき集めてそれらしく表示しているプログラムにすぎません。 収集できない実行情報——たとえばYARVによって最適化される`String#+`や`Hash#[]`が消費した時間や、スレッド間での処理の帰属——は決してプロファイル上に現れることがありません。 既存のプロファイラはさまざまな工夫でこれを乗り越えてきましたが、RactorやM:Nスレッディング、またはJITによる最適化といった近年のCRubyの進化により、CRuby外部のgemとして実装するアプローチの限界が見え始めています。

本トークでは、osyoyu自身が開発したプロファイラ[Pf2](https://github.com/osyoyu/pf2)での知見をもとに、正確な結果を得るためのプロファイラ実装技法を紹介します。 そして、外部ライブラリでの実装による根本的な限界を突破するためのアプローチとして、プロファイラをCRuby本体に埋め込む`ext/profile`の提案についても解説する予定です。

#### 登壇者からのコメント

今回もプロファイラの話をします。Ruby 4.0にはZJITやRactorの改善がどんどん取り込まれ、パフォーマンス特性が変わっているわけですから、速いプログラムの書き方というのも変わっているのかもしれません。「ほんとにぃ？」と思ったみなさんを導くためのしかけをRubyに組み込みたいな、という話をする予定です。

### Liberating Ruby's Parser from Lexer Hacks (@ydah)

プロダクト基盤開発部の[@ydah](https://github.com/ydah)は、Rubyの構文解析器の改善について発表します。

#### セッション概要

従来のLR構文解析では、文脈に依存した正しいトークン解釈を知っているのは構文解析器側なのに、字句解析器が先にトークンを決めなければなりません。Rubyはこのギャップを`lex_state`という手書きのハックで補ってきましたが、言語ルールが実装の隅々に散在し、バグの再現が難しく、構文の変更のたびに細心の注意が必要になるという問題を抱えています。

PSLR(1)（Pseudo-Scannerless Minimal LR(1)）は、この関係を逆転させるアプローチです。 構文解析器が各時点でどのトークンが有効かを字句解析器に伝えることで、字句解析器は構文解析器の文脈を参照しながらトークンを認識できるようになります。

本トークでは、ydahが[Lrama](https://github.com/ruby/lrama)にPSLR(1)を実装した取り組みを紹介します。 新しいディレクティブの設計、構文解析器の状態から有効なトークンを導出するしくみ、そしてこの技術がRubyの`lex_state`管理をどう変えうるのかを、理論と実装の両面から解説します。

#### 登壇者からのコメント

parse.yをもっと読みやすく、理解しやすくしたい！という取り組みをCRubyとLramaのコミッターとして改善を続けてきた中で、`lex_state`の複雑さはずっと課題でした。PSLR(1)をプログラミング言語の構文解析器に実用的に実装した例はRubyの規模では他にないと思っており、この成果をぜひRubyKaigiでお伝えしたいと思っています。このアプローチで果たして`lex_state`を倒せるのかどうか、ぜひ会場で見届けてください！

### Uzumibi: Reinventing the wheels that run on the edge (@udzura)

人給基幹プロダクト基盤開発本部の[@udzura](https://github.com/udzura)は、RubyにおけるWebAssembly（Wasm）とエッジコンピューティングの可能性について発表します。

#### セッション概要

Cloudflare WorkersやFastly Compute、Spinのようなエッジコンピューティング環境で、Rubyを実用的に動かすことは可能でしょうか？ [Hono](https://hono.dev/)に代表されるエッジ向けフレームワークが「軽量・高速・シュッとデプロイ」という開発スタイルを普及させた一方、Rubyがこの波に乗れているかというと、多くの課題があります。

[mruby/edge](https://mrubyedge.github.io/) はudzuraがPure Rustでゼロから実装したmruby互換VMで、依存のない真にポータブルなWasmバイナリを生成できます。 バイナリサイズは非常に小さく収まり、最小構成では400KB以下になります[\*1](#f-a30d6167 "お陰でスプレッドシート上でもGAS経由で動く……だと？")。 現実的な各種機能を含めた状態でCloudflare Workers向けのアーティファクトを作成した検証では、容量は1200KB程度（gzip後350KB程度）でした。 圧縮後は余裕で3MB以下であり、[Free tierの制限サイズ](https://developers.cloudflare.com/workers/platform/limits/#worker-size)に収まります。

また、エッジに似た環境としてCloud Runでの動作も確認されており、起動レイテンシ50ms以下・メモリ30MB前後を計測しています。 これはCRuby + Sinatraの起動時間約1,500ms・メモリ約60MBと比べてかなり有利な数値です。 さらに、Web Workerベースの「純粋にブラウザだけで完結するAPI開発」という構想についても紹介する予定です。

[RubyKaigi 2024での発表](https://udzura.jp/slides/2024/rubykaigi/)以来、OOP機能・例外処理・クロージャ・複雑な制御構造・各種mgemの実装など、Rubyとしての表現力が着実に積み上げられてきました。その上に構築した軽量WebフレームワークUzumibiを使えば、複数のプラットフォームで同じRubyコードが動きます。 本トークでは、mruby/edgeが既存のWasm向けRuby実装の課題をどう解決したのか、VMをゼロから実装する過程で直面した「Ruby性」の再現という難題、そして今後の展望について解説します。

#### 登壇者からのコメント

RubyKaigi 2024に続いてのmruby/edgeと、その上のフレームワークUzumibiの進捗をお伝えします。個人的には、mruby/edgeとUzumibiは明日にでも使いたいおもしろOSSに成長した感があります。新しいキラーアプリかも？ぜひ聴きに来て、感想・フィードバックを！

## 最後に

3名それぞれ異なるテーマで、Rubyのおもしろさと可能性を存分にお届けします。函館でお会いできることを楽しみにしています！

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

SmartHRではRubyを使って、労働にまつわる社会課題をなくし、誰もがその人らしく働ける社会をつくることに情熱を持ったメンバーが集まっています！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)

[\*1](#fn-a30d6167):お陰でスプレッドシート上でもGAS経由で動く……だと？