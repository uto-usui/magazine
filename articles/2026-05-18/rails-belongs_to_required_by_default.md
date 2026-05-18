---
title: "大きいRailsアプリケーションで belongs_to_required_by_default を安全に有効化するまでの戦い"
source: "https://tech.smarthr.jp/entry/2026/05/15/100855"
publishedDate: "2026-05-15"
category: "design"
feedName: "SmartHR Tech Blog"
author: "willnet"
---

こんにちは。SmartHRでRails顧問業をしている[willnet](https://github.com/willnet/)です。最近晩ごはんを少しでも早く食べるためにホットクックを導入しました。朝に材料を切ってホットクックに入れておけば、夜の料理時間を短縮できて良い感じです。

さて、以前に「基本機能」と呼ばれるSmartHR 最大の Rails アプリケーションをRuby3.4にアップグレードした時のブログの中で「基本機能」には`config.load_defaults`が設定されていないという話がありました。

[SmartHR最大のRailsアプリケーションをRuby 3.4(+YJIT)にアップデートしました - SmartHR Tech Blog](https://tech.smarthr.jp/entry/2025/08/20/142858)

> `load_defaults` が設定されていなかったのは、プロジェクトの歴史的な経緯によるものです。 私たちの開発チームでは、Rails のアップデートに際して、既存の設定値を維持することで影響範囲を最小限に抑える方針を採っています。 とはいえ、`load_defaults` が設定されていない状態はあまり望ましいものではありません。現在は、設定値をひとつずつ確認しながら、段階的に Rails 7.2 のデフォルト設定に追いついていく方針で移行作業を進めています。

上記記事の公開から9か月ほど経った現在、「基本機能」には`config.load_defaults 5.1`が設定されています。今回は、`config.load_defaults 5.0`への移行に際して特に苦労した設定である`config.active_record.belongs_to_required_by_default = true`を導入した話を書きます。

## `config.active_record.belongs_to_required_by_default = true` の概要

この設定は、`belongs_to`関連を定義したときに関連先の存在を確認するバリデーションを自動で追加するものです([Railsの該当コミット](https://github.com/rails/rails/commit/6576f7354e50afb79881aaf3a6f50f4e81dfab70))。`config.load_defaults 5.0`から有効なので、おそらくこの記事を読んでいるみなさんのRailsアプリケーションはすでに設定済みかと思われます。

具体的にコードで説明すると

belongs\_to :user

と書いた時に

validates\_presence\_of :user, message: :required

を自動的に追記したのと同じ振る舞いをします。

## 既存のアプリケーションを`config.active_record.belongs_to_required_by_default = true`に変更する方針

「基本機能」は長い年月を経て作りあげられた巨大なRailsアプリケーションであり、大量の`belongs_to`が記述されています。素朴に設定を変更すると間違いなく不具合が起きるので、可能な限り既存の振る舞いを変えないように工夫する必要があります。

具体的には`config.active_record.belongs_to_required_by_default = true`とする前に既存の`belongs_to`関連全てに`optional: true`を明示的に追記します。`optional: true`はバリデーションの自動追加をスキップするためのオプションです。このようにすれば既存の振る舞いはそのまま維持し、新規に作る`belongs_to`だけが新しい設定の対象となります。

## 既存の`belongs_to`全てに`optional: true`をつける方法

しかし既存の`belongs_to`関連全てに漏れなく`optional: true`を付与していくのは骨が折れます。Pull Request(以下PRと省略します)を作ってもレビューをしている間に新しい`belongs_to`が追加されたら、それを探す必要があります。仮にAIエージェントに任せたとしても、それで全て対応できるか自信を持てません。

そこで、モデルのコードをパースして`belongs_to`メソッドの呼び出しを見つけたら自動で`optional: true`を付与する[スクリプト](https://github.com/willnet/add_optional_true)を使うことにしました。 以前に別のプロジェクトで同じことをするために作ってMITライセンスで公開していたものです。

しかし、スクリプトで本当に全ての`belongs_to`関連に対応できたかは、どのようにして確認すればいいでしょうか。

## 全ての`belongs_to`に`optional: true`を付与したかを確認する方法

対象となる全ての`belongs_to`に`optional: true`を付与したかは、アプリケーション全体で定義されている`ActiveRecord::Validations::PresenceValidator`インスタンスの数を数えることで判定できます。

`ActiveRecord::Validations::PresenceValidator`インスタンスは、`validates_presence_of`(もしくは`validates :something, presence: true`)を実行したときに作られるオブジェクトです。`config.active_record.belongs_to_required_by_default = true`としたとき、`optional: true`のない`belongs_to`は`validates_presence_of`を実行し`ActiveRecord::Validations::PresenceValidator`インスタンスを作成します。

つまり`config.active_record.belongs_to_required_by_default`が`false`の時と`true`の時で`ActiveRecord::Validations::PresenceValidator`インスタンスの数に変化がなければ全ての`belongs_to`に`optional: true`を付与したと言えます。

開発環境で試すときは、事前に次のように`config/environments/development.rb`の設定を変更して全てのコードをロードするようにしておきます。

config.eager\_load = true

そのうえで`bin/rails c`などを利用して次のコードを実行すると、`ActiveRecord::Validations::PresenceValidator`インスタンスの数が返ってきます。

ActiveRecord::Base.descendants.sum do |model|
  model.\_validators.values.flatten.count do |v|
    v.is\_a? ActiveRecord::Validations::PresenceValidator
  end
end

設定変更の前後で数が一致していない時はgem内で定義されたモデルが存在するか、もしくは動的に`belongs_to`が実行されているはずです。今回のケースでは[activerecord-multi-tenantが動的に`belongs_to`を実行し](https://github.com/citusdata/activerecord-multi-tenant/blob/3b21347810d662d8a9ff3c1d62f9b28f933b97d8/lib/activerecord-multi-tenant/model_extensions.rb#L69-L73)、[Active Storageが定義するモデルでbelongs\_to](https://github.com/rails/rails/blob/0bd4abb696a8517d22a1c7444781134e0f222b6e/activestorage/app/models/active_storage/attachment.rb#L45)が存在していました。

## PRを分割して少しずつ適用する

方針が整ったのでPRを作ります。すると1つのPR中のFiles changedが352になりました。一度にレビューするには差分が大きすぎるし、レビュー中にコンフリクトする変更が入る可能性が高くなるので、複数のPRに分割して少しずつマージしていくことで、最終的に全ての`belongs_to`に`optional: true`をつけることができました。

## 「やったか！？」

全ての`belongs_to`に`optional: true`を付与したら最後に`config.active_record.belongs_to_required_by_default = true`として終わり、と思っていたのですが、CIで大量にテストが失敗しました。

調べてみると[shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)が用意しているRSpec用のマッチャ`belong_to`で失敗しています。アプリケーションの振る舞いは変えていないはずなのになぜだろう？と思いshoulda-matchersの実装を調べてみると、そう簡単にこのタスクが終わらないことがわかってきました。

## shoulda-matchersが提供している`belong_to`の仕様

shoulda-matchersのバージョンは執筆時点における最新の[v7.0.1](https://rubygems.org/gems/shoulda-matchers/versions/7.0.1)です。

[shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers)の`belong_to`マッチャは対象となるモデルに`belongs_to`が定義されているかを確認するマッチャですが、戻り値にメソッドをチェインさせていくことで`belongs_to`に渡しているオプションの確認もできます。関連先の存在を確かめるメソッドもあるので、それにより判定条件がどのように変わるかを調べることにしました。

説明のために次のようなモデルを例にします。

class User < ApplicationRecord
  belongs\_to :company
end

class Company < ApplicationRecord
  has\_many :users
end

### 1： `required` メソッドをチェーンした場合

次のように書いたとします。

it { is\_expected.to belong\_to(:company).required }

このときは

user.company 
user.valid?

としたあとに、`user.errors[:company]`の戻り値となる配列要素のいずれかが`I18n.t('errors.messages.required')`と一致するかどうかをチェックしています。一致していたらテストはパスします。

### 2： `optional` メソッドをチェーンした場合

次のように書いたとします。

it { is\_expected.to belong\_to(:company).optional }

このときは

user.company 
user.valid?

としたあとに、`user.errors[:company]`が存在するかをチェックしています。エラーメッセージは確認していません。

### 3：明示的に`optional`も`required`も指定しない場合

次のように書いたとします。

it { is\_expected.to belong\_to(:company) }

このときは`config.active_record.belongs_to_required_by_default`の値によって振る舞いが変わります。

### 3-a：`config.active_record.belongs_to_required_by_default`が`false`もしくは`nil`の場合

`required`を設定したときの否定が条件になります。つまり

user.company 
user.valid?

としたあとに、`user.errors[:company]`が`I18n.t('errors.messages.required')`の戻り値となる配列要素のいずれかと一致するかどうかをチェックして、一致しなかったらテストはパスします。

これまでの「基本機能」のテストにおける`belong_to`マッチャには`optional`も`required`もチェインされていないので、すべての`belong_to`はこの挙動になっていました。

### 3-b：`config.active_record.belongs_to_required_by_default`が`true`の場合

`required`を明示的に書いたのと同じ振る舞いになります。

### 4：`without_validating_presence`メソッドをチェーンした場合

次のように書いたとします。

it { is\_expected.to belong\_to(:company).without\_validating\_presence }

このとき、`user.company`に関する存在チェックは行いません。例えば次のようなコードのときはshoulda-matcherによる関連先が存在しなかったときのバリデーション確認ができないので`without_validating_presence`を付ける必要があります。

class User < ApplicationRecord
  belongs\_to :company

  before\_validation :autoassign\_company

  def autoassign\_company
    self.company = Company.create!
  end
end

### `belong_to`マッチャの挙動のまとめ

ここまでの挙動を表でまとめると次のようになります。

番号

チェインメソッド

判定条件

1

`required`

`user.errors[:company]`の戻り値に`I18n.t('errors.messages.required')`と一致する要素があるかを確認

2

`optional`

`user.errors[:company]`の有無を確認(メッセージ内容は見ない)

3-a

なし (`belongs_to_required_by_default`が`false`または`nil`)

`required`判定の否定

3-b

なし (`belongs_to_required_by_default`が`true`)

`required`と同じ判定

4

`without_validating_presence`

関連先のpresence確認をスキップ

## つまりどういうことですか？

CIで大量にテストが失敗したのは`config.active_record.belongs_to_required_by_default = true`にしたことで、`belong_to`マッチャの振る舞いが3-aから3-bに変わったことが原因です。 3-bではバリデーションがかかっていないモデルの`belong_to`マッチャによるテストは全て失敗します。

であれば、該当する全ての`belong_to`マッチャに`.optional`をつけて、2の振る舞いをさせれば良さそうです。先ほど`belongs_to`に`optional: true`をつけた時と同じように、`belong_to`に`.optional`をつけていくスクリプトを作って適用させましょう…と思ったのですが、テストやアプリケーションコードを見るとこれまで想定していなかったユースケースが見えてきました。具体的には、バリデーションに対するエラーメッセージの扱いにも大きく手を入れる必要があったのです。

## `validates ... presence: true`と`belongs_to`が追加するバリデーションの違い

これまで書いてきたように「基本機能」では`config.active_record.belongs_to_required_by_default`が設定されていなかったので、`belongs_to`を定義しただけでは関連先の存在チェックは行われません。存在チェックをしたいときは`belongs_to`に`optional: false`オプションを付ければよいのですが、なぜか次のようなコードが多くの箇所で書かれていました。

class User < ApplicationRecord
  belongs\_to :company
  validates :company, presence: true
end

これは次のように書くのと振る舞いとしてはほぼ同じです。

class User < ApplicationRecord
  belongs\_to :company, optional: false
end

`config.active_record.belongs_to_required_by_default = true`にすれば次のようにできます。

class User < ApplicationRecord
  belongs\_to :company
end

こう書けるようにしたい、と思うかもしれません。僕もそうでした。しかしこれもそう簡単にはいきませんでした。そもそもこれらの記述は完全に同じではありません。

異なるのはエラーメッセージの形式です。`belongs_to`が設定するバリデーションエラーメッセージは`validates ... presence: true`デフォルトの[`:blank`ではなく`:required`が設定されています](https://github.com/rails/rails/blob/4a38d3ce6257e828e838bf52477367cd8e02f857/activerecord/lib/active_record/associations/builder/belongs_to.rb#L137)。

「基本機能」のi18n設定では、`:blank`と`:required`の定義が異なっていました。正確には`:blank`だけが明示的にアプリケーション中に定義されており、`:required`はアプリケーション中に使用されている箇所がないため[rails-i18n](https://github.com/svenfuchs/rails-i18n)のデフォルトが定義されている状態でした。

なので`validates :company, presence: true`を削除して`belongs_to :company, optional: false`に一本化するためには、「基本機能」のi18n設定の`:required`を`:blank`と同一にする必要があります。であればすぐにでもi18n設定を変更すればよいと思うでしょうが、そう簡単ではありません。

これまで次のようなテストが通っていました。これが通っているのは`:blank`と`:required`のi18nの設定が異なるからです。

class User < ApplicationRecord
  belongs\_to :company
  validates :company, presence: true
end

it { is\_expected.to belong\_to(:company) }

このテストは先ほどのshoulda-matcherの仕様で説明した3-aの振る舞いをします。つまり

user.company 
user.valid?

としたあとに、`user.errors[:company]`が`I18n.t('errors.messages.required')`と一致しているかをチェックしています。上記のテストでは`user.errors[:company]`は`I18n.t('errors.messages.blank')`を返すためテストが通ります。このとき`:blank`と`:required`のi18nのメッセージを揃えてしまうとこのテストは失敗するようになってしまいます。

## shoulda-matchersの仕様を踏まえた変更計画

ここまでの前提を踏まえて、変更計画を練り直しました。具体的には次の順番で変更を加えていきました。

### 1：`belong_to`マッチャに`optional`をつける

`belong_to`マッチャに明示的に`optional`をつけて問題ないものを全て探し出します。つまりこのような呼び出しを、

it { is\_expected.to belong\_to(:company) }

次のように変更します。

it { is\_expected.to belong\_to(:company).optional }

### 2：`validates`の呼び出しをやめる

次のような形になっているコードをすべて見つけて、

class User < ApplicationRecord
  belongs\_to :company
  validates :company, presence: true
end

it { is\_expected.to belong\_to(:company) }

次のように変更します。

class User < ApplicationRecord
  belongs\_to :company, optional: false
end

it { is\_expected.to belong\_to(:company).required }

バリデーションに条件が追加されている等、単純に置き換えられない場合は`without_validating_presence`を利用します。

この変更も`belongs_to`に`optional: true`を付与したときと同様に、機械的にコードをパースして自動で書き換えるスクリプトがないと難しいと考え、[新しいスクリプト](https://github.com/willnet/optional-to-required)を作って対応しました。スクリプトによる自動修正だけでエッジケースを全て扱うのが費用対効果に見合わなかったので、いくつかのケースは手動でも対応しました。

さらに`I18n.t('errors.messages.required')`の戻り値を`I18n.t('errors.messages.blank')`と同じにします。

この工程は差分がかなり大きくなりました(Files changed 152)が、作業内容的に分割することができないためやむなく1つのPRとしました。

### 3: デフォルトの設定を変更する

`config/application.rb`に対して`config.active_record.belongs_to_required_by_default = true`を追記します。

### 4: 一時的に設定した`optional: true`を削除する

デフォルトの設定を変更したことで`belongs_to`に対して明示的に付与した`optional: true`が不要になったので、`optional: true`を全て削除します。

## 戦い終わって

とにかく大変でしたが、特に不具合等なく設定を変更することができました。

今回の件で、大きいプロジェクトを横断して変更したいときはパーサーを利用した自動置換スクリプトを作るのがとても有効だという知見を得ました。全て手作業でやる方針にしていたらと思うとゾッとします。作業が進むにつれ最初には全く想定していなかった落とし穴が見つかりましたが、内容をきちんと精査して一つずつ着実に取り組んでいけば最終的には不具合なく作業を完了させることができます。

これからもRailsのデフォルト設定を一つずつ適用していき、最終的には最新のRailsの設定と同等にしていくつもりです。おそらく今回より大変な設定はないと信じていますが、またなんらかの知見になりそうな作業をしたらブログエントリにしようと思います。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

大きいアプリケーションを改善していく楽しさを一緒に感じていきましょう。

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)