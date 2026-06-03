---
title: "AIとリファクタして、人間の出番があったところ"
source: "https://tech.smarthr.jp/entry/2026/06/02/191107"
publishedDate: "2026-06-02"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

SmartHRで人事評価のプロダクトを担当しているaaasaです。

AI をリファクタの相棒にしてから、開発の進め方が変わりました。設計、コードのたたき台、テストの観点 ―― 一人で考えていた時間の多くを AI との壁打ちに置き換えています。

ただ、AI の案から「どれを採るか」「チームとどう合意するか」などを決めるのは、今のところ人間の仕事です。実際に進めているリファクタを題材に、その役割分担を書き残します。

なお、この記事は 2026 年 5 月時点のものです。AI の能力は日々変わるので、ここで書く「人間がやっていること」もいずれ変わるかもしれません。

## 題材：似た責務を持つ 2 つのクラスの重複

弊チームに、機能 A・B という似た責務の機能があり、それぞれに `MemberResolver` クラスが存在します。

app/lib/feature\_a/member\_resolver.rb
app/lib/feature\_b/member\_resolver.rb

どちらも「プロジェクトに紐づく従業員情報を外部 API から取得する」という同じ責務で、コードもよく似ていました。イメージとしてはこんな感じです。

class FeatureA::MemberResolver
  def initialize(project)
    @project = project
    @members = nil
  end

  
  def fetch\_members
    member\_ids = @project.project\_members.pluck(:member\_id)
    options = {
      fields: %w(id last\_name first\_name code status grade).join(","),
      as\_of: @project.as\_of,
    }.compact\_blank
    members = External::MemberRepository.new(...).search\_for\_feature(member\_ids, options)
    @members = members.index\_by(&:id)
  end

  def fetched?
    !@members.nil?
  end

  def find(member\_id)
    @members&.\[\](member\_id)
  end
end

class FeatureB::MemberResolver
  def initialize(project, fields:)
    @project = project
    @fields = fields
    @members = nil
  end

  def fetch\_members
    
    member\_ids = @project.project\_members.joins(:targets).distinct.pluck(:member\_id)
    options = {
      fields: @fields.join(","),
      as\_of: @project.as\_of,
      status: %w(active on\_leave).join(","),
    }.compact\_blank
    members = External::MemberRepository.new(...).search\_for\_feature(member\_ids, options)
    @members = members.index\_by(&:id)
  end

  def fetched?
    !@members.nil?
  end

  def find(member\_id)
    @members&.\[\](member\_id)
  end
end

骨格は揃っていて（`initialize` → `fetch_members` → `fetched?` → `find`）、違いは `fetch_members` の中だけでした。機能ごとに取得項目が違ったり、片方にだけ追加の絞り込みが入っていたりします。この重複をどうさばくかがリファクタの出発点でした。

## ステップ 1: AI に最初の案を出してもらう

「機能 A・B を共通化したい」と私から AI に提起し、具体的な設計案を出してもらいました。返ってきたのはこの案です。

> **AI:** 機能 A・B 共通の `MemberResolver` を新設しましょう。メモ化のような便利機能もクラスが吸収するので、呼出側はシンプルになります。

きれいな案で、このまま進んでも良さそうに見えました。

## ステップ 2: AI 案を要素にバラして詰める

ただ実装に進む前に、立ち止まって詰めた論点が 2 つありました。

### 論点 a：その「便利機能(`fetched?`、`find`)」、本当に共通クラスに置くべき？

提案された便利機能を一つずつバラして「誰のための仕組みか」を見ると、あるものは片方の機能でしか効かない仕組み（たとえばメモ化）、あるものは 1 行で書ける処理を 1 段ラップしただけでした。

> **私:** 片方しか使わない機能を、共通クラスに置いていいんだっけ？

「両方が共通で必要だから置く」と「片方の事情を共通クラスに吸収させる」は別の話なので、AI の提案を要素にバラして「誰が必要としているか」を確認する一段が必要でした。

### 論点 b：「シンプルになる」と「挙動が変わらない」は別の話

ある絞り込み処理(`fetch_members`)を Rails 側から外部 API のパラメータ側に動かす案が出ました。コードは短くなります。ただし置き場所を動かすと、評価のタイミングもデータソースも変わります。

> **私:** コードがシンプルになるのはわかるけど、挙動は本当に同じになるんだっけ？

「挙動が変わらない」と言い切るために何を検証するかは、このリファクタの安全を担保する上で人間が詰める論点として残っています。

## ステップ 3: そもそも「その新クラスは要るのか」を問い直す

論点 a / b を詰めるうちに、既存コードの構造にも目が戻りました。

外部 API を呼ぶ責務はもともと `External::MemberRepository` にあり、これは「外部 API への薄いラッパー」として用途別の便利メソッドを足していくスタイルで育ってきたクラスです（以降では「Repository」と呼びます）。一方、機能 A・B の `MemberResolver` は、この Repository をさらに機能ごとにラップしたものなので、外部 API ラッパーの上に薄い抽象がもう一階乗っている状態でした。

> **私:** そもそも `MemberResolver` を作る必要はあるのか？ Repository でなんとかできないのか？

論点 a で見た「便利機能」の多くは別の場所に置ける性質のものです。それなら Repository に用途別メソッドを 1 つ足すほうが、Repository の役割とも揃います。AI に「Repository に寄せる案」を出させるとこちらもきれいに成立し、チームに相談する選択肢が揃いました。

## ステップ 4: 2 案 + 現状維持を並べてチームに問う

個人で決めず、チームに選択肢を並べて示しました。

-   **A. 現状維持**：触りません。
-   **B. `External::MemberRepository` に便利メソッドを追加**：既存 Repository に用途別メソッドを生やします。
-   **C. 共通 `MemberResolver` クラスを新設**：AI が最初に提案した案です。

上記の比較を Slack に投稿して意見を募りました。個人推しは B 案、つまり「既存と揃う」「新規クラス不要」でした。

## ステップ 5: チームの結論 ― C 案に落ち着いた

結論は **C 案**でした。個人推しとは違いました。C 案が選ばれた理由は次のようなものです。

-   機能 A・B の責務「従業員情報を取る」は Repository の他メソッドより特化した文脈を持ち、Repository に置くと用途特化メソッドが増えていきます。
-   チームに「クラスを分けるほうが責務が明確」という共通認識がありました。

個人で B 案に進めずに先にチームに相談してよかった、と思える結論でした。

## AI に任せきれず、私が引き取っていた 5 つの責務

振り返ると、AI に任せきれず私が関わった場面がいくつかあります。

### ① 「片方しか使わない機能」が共通クラスに紛れていないか見極める

AI は便利機能をまとめて提案してくるので、そのまま受け取らず、一つずつバラして「これは両方から本当に必要とされているのか、片方の事情を共通クラスに吸収しているだけなのか」を確認するのは人間の仕事でした。

### ② AI の「シンプルになる」案で、挙動が本当に同じかを聞き直す

シンプルになる案で、「挙動は本当に同じになるのか」を AI に聞き直すのは人間の仕事でした。

### ③ 「そもそも」の問い直し

「重複を消したい」と伝えれば重複を消す案が出ましたが、そもそもこの問題設定で良いのかを問い直すのは人間の仕事でした。

### ④ 既存コードの責務を AI に教える

「Repository は外部 API への薄いラッパーで、用途別の便利メソッドを並べていくクラス」という役割は、AI には伝わっていませんでした。今回はその役割を知っている人間が AI に教えたうえで、「Repository に寄せる案」を出してもらえる状態になりました。既存の役割に寄せるか / 新しい役割を持ち込むかの判断も、コードの歴史を知る人間が担いました。

### ⑤ チームへの合意形成

個人推しは B 案、チームの結論は C 案。個人の最適解とチームの最適解は別物で、その差を埋めるのは人間の仕事でした。

## おわりに

ここに書いた「私が引き取った責務」は、AI の能力が上がればいくつか移っていくかもしれません。コードベース全体の文脈を読ませる仕組みが整えば④はなくなるだろうし、長い思考が安定すれば①や③も任せられるかもしれません。 引き続きAIを活用しながらリファクタを進めていこうと思います。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

リファクタにせよ新規開発にせよ、AI を活用しながら設計判断にこだわって進めたい方、お待ちしています。

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)