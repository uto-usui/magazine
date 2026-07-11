---
title: "ActiveRecordの複製処理を簡潔に書くgemを作った"
source: "https://tech.smarthr.jp/entry/2026/07/10/105119"
publishedDate: "2026-07-10"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは、SmartHRでDPE（Developer Productivity Engineer）をしている[@alpaca-tc](https://github.com/alpaca-tc)です。

今回は、複製機能をシンプルに実装するために作成した[activerecord-duplicator](https://github.com/kufu/activerecord-duplicator)というgemについて紹介します。

## 複製機能とは

複製機能は、SaaS型プロダクトで一般的に見かける機能です。ユーザーが既存のレコード（テンプレートなど）をコピーして、同じ内容の新しいレコードを作成する機能のことです。

![複製ボタンが表示されているUI](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260708/20260708143712.png)

ユーザーが見る複製機能のUI

複製機能は複数のレコードと関連が絡み合うため、実装が複雑になりやすい特性があります。

ナイーブに実装された複製機能では、以下のような課題が生まれやすいです。

### ネストが深くなる

関連するレコードを複製する際に、多段のネストが生まれることが多いです。

例えば、人事評価システムにおける評価テンプレート(`EvaluationTemplate`)を子・孫レコードを含めて複製する機能を考えてみましょう。従来のアプローチでは、こうなりがちです。

def duplicate\_template(old\_template)
  new\_template = old\_template.dup
  new\_template.save!
  
  
  old\_template.evaluation\_items.each do |old\_item|
    new\_item = old\_item.dup
    new\_item.evaluation\_template\_id = new\_template.id
    new\_item.save!
    
    
    old\_item.evaluation\_scales.each do |old\_scale|
      new\_scale = old\_scale.dup
      new\_scale.evaluation\_item\_id = new\_item.id
      new\_scale.save!
    end
  end
  
  new\_template
end

実際のプロダクトでは、さらに多くの関連を複製することになるでしょう。

### N+1クエリが発生しやすい

ネストで示した通り、ナイーブな実装では各ループで保存処理を呼び出します。ループの数だけクエリが増えます。 これが数千レコードを複製するようなケースになると、パフォーマンスが大きく低下します。

### 複製処理ならではの要件によって実装が複雑になる

複製処理では、単純にレコードをコピーするだけでは済まないことが多々あります。

-   ユニーク制約があるカラムについて、重複を避けるために`(コピー)`のような文言を追加する
-   positionなどの順序を示すカラムをリセットする
-   ActiveStorageのような外部リソースを複製する

これらの処理がネストの各層で必要になると、コードはさらに複雑になります。

## activerecord-duplicatorで簡潔に書く

上記のような課題を解決するため、[activerecord-duplicator](https://github.com/kufu/activerecord-duplicator)というgemを作りました。 このgemを使うと複製処理をシンプルに書けます。

gem "activerecord-duplicator"

### 基本的な使い方

duplicator = ActiveRecord::Duplicator.new

new\_template = duplicator.duplicate(
  old\_template,
  associations: \[:evaluation\_items, evaluation\_items: :evaluation\_scales\],
)

たったこれだけで、複製したいレコードと関連が一緒に複製されます。複製後のidと元のレコードのidの対応は内部で管理されるため、複製後は外部キーが正しく付け替わります。

従来のネストが深く複雑なコードとは異なり、`associations` パラメータに、`includes/preload/eager_load`で指定するような関連のネストをそのまま指定するだけで関連も複製できます。

## 応用的な使い方

基本的な使い方では対応できない、より複雑な複製シナリオに対応する機能を紹介します。

### 複製時に別のレコードに付け替える（store\_duplicate\_id）

複製されたレコードを、別の既存レコードに関連付けたい場合があります。例えば、複製後のレコードをユーザーA→ユーザーBに移したい場合は、外部キーのマッピングを`store_duplicate_id`を使って指定してから複製します。

duplicator = ActiveRecord::Duplicator.new
duplicator.duplicate(user\_a\_template, associations: \[...\]) do |session|
  
  session.store\_duplicate\_id(User, old\_id: user\_a.id, new\_id: user\_b.id)
end

### 複製対象から除外する（no\_duplicate/no\_duplicate\_id/no\_duplicate\_class）

複製時に、特定のレコードを複製対象から除外したい場合があります。 例えば、レコードの所有者を複製対象から除外することで、所有者の外部キーが複製後も同じユーザーを参照するようにできます。 除外対象の指定は、`no_duplicate`/`no_duplicate_id`/`no_duplicate_class`のいずれかで行えます。

duplicator = ActiveRecord::Duplicator.new

duplicator.duplicate(old\_template, associations: \[...\]) do |session|
  session.no\_duplicate(old\_template.user) 
  session.no\_duplicate\_id(User, old\_template.user\_id) 
  session.no\_duplicate\_class(User) 
end

### カスタム複製ロジック（on）

複製処理をモデルごとにカスタマイズすることができます。 ユニーク制約を回避したり、外部リソース(ActiveStorage等)を複製したりといった処理を、モデルごとに定義できます。

例えば、単純にカラムをコピーするのではなくて、ユニーク制約を避けるために名前に「(コピー)」を付けたいような場合に利用します。

duplicator.on(EvaluationItem) do |api, klass, records|
  records.each do |old\_record|
    new\_attrs = old\_record.attributes.except("id", "created\_at", "updated\_at")
    new\_attrs\["evaluation\_template\_id"\] = api.fetch\_duplicate\_id(
      EvaluationTemplate,
      old\_id: old\_record.evaluation\_template\_id,
    )
    new\_attrs\["name"\] = "#{old\_record.name} (コピー)"
    
    new\_record = klass.create!(new\_attrs)
    api.store\_duplicate\_id(klass, old\_id: old\_record.id, new\_id: new\_record.id)
  end
end

カスタム複製ロジックのなかで `api.store_duplicate_id` を呼び出している処理は、複製したレコードの新旧のidの対応を記録するために必要です。これにより、複製後の関連付けが正しく行われます。

## 設計コンセプト

このgemを設計する際のコンセプトを紹介します。

### 関連を辿る処理を分離すると複製処理はシンプルになる

ネストが深くなるのは、関連を辿りながら同時に複製処理を行うためです。

このgemでは、関連を辿る処理を`associations`パラメータで指定するだけで済むようにすることで、関連を辿る処理を分離しています。ネストが深くならず、複製処理はシンプルに書けるようになります。

### `insert_all!`で一括挿入して高速に処理

デフォルトでは、レコードを複製する処理は`insert_all!`で一括挿入されます。これにより、`save!`を何度も呼び出すことを避け、大幅なパフォーマンス向上を実現できます。

複製処理は、基本的に保存済みのデータをコピーするだけのケースが多いため、`insert_all!`で十分なケースが多いです。

ただし、ActiveRecordのバリデーションやコールバックを実行しないので、これはトレードオフがある操作です。 もしActiveRecordのコールバック等を実行したい場合は、`on`句でカスタマイズすれば良いでしょう。

### 共通処理とセッションスコープの処理を別々に書ける

複製ロジックの設定は2つのスコープに分けて定義できるようにしました。

**ActiveRecord::Duplicator#on** は、そのインスタンスを使うすべての複製に適用されます。

duplicator = ActiveRecord::Duplicator.new
duplicator.on(EvaluationItem) do |api, klass, records|
  
end

duplicator.duplicate(template1, associations: \[...\])
duplicator.duplicate(template2, associations: \[...\])

一方、`duplicate`メソッドのブロック内で登録した処理は、その複製実行だけに適用されます。

duplicator.duplicate(template) do |session|
  
  session.on(EvaluationItem) do
    ...
  end
end

このように処理のスコープを分けることで、全複製に共通する静的な複製処理と個別の複製でのみ必要な動的な複製処理を明確に分けて定義できます。 汎用的な複製ロジックは `DUPLICATOR = ActiveRecord::Duplicator.new` として定数化しておいて、個別の複製処理は `DUPLICATOR.duplicate(template) { |session| ... }` のブロック内で定義することで、複製処理の再利用性を高めることを意図しています。

## まとめ

[activerecord-duplicator](https://github.com/kufu/activerecord-duplicator)は、複数の関連をもつレコードの複製処理を、シンプルかつ保守しやすく実装できるgemです。 このアプローチにより、複製機能のコードはシンプルかつ安全に書けるようになるでしょう。

なお、このgemは社内のプロダクトから切り出したgemで、現在開発途上です。STIなどの特定のパターンではまだ動作確認ができていないため、ご利用の際はご注意ください。 品質向上に向けて、引き続き改善していく予定です。

複製機能の実装で複雑さに悩んでいる場合は、ぜひこのgemのアプローチを参考にしてみてください。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)