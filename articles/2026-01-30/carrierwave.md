---
title: "歴史あるファイルアップロード機構との向き合い方 —— CarrierWaveの課題にどう対処するか"
source: "https://tech.smarthr.jp/entry/2025/12/03/105532"
publishedDate: "2025-12-03"
category: "design"
feedName: "SmartHR Tech Blog"
author: "udzura"
---

この記事は、SmartHR Advent Calendar 2025の3日目の記事です。

[qiita.com](https://qiita.com/advent-calendar/2025/smarthr)

## はじめに

SmartHRのプロダクトエンジニア [@udzura](https://x.com/udzura) です。労務基本機能のパフォーマンスやインフラの課題を日々解決する仕事をしています。また、[福岡Rubyist会議05](https://regional.rubykaigi.org/fukuoka05/)という地域Ruby会議の運営にも関わっています。来年2月の開催に向けて、福岡呑み屋マップとコーヒーマップを整備せねば……。

さて、皆さんは、[CarrierWave](https://github.com/carrierwaveuploader/carrierwave)というgemについてご存知ですか？ Ruby on Railsでファイルアップロード機能を実装する際、多くの開発者が選択するのがCarrierWaveです。

このgemはRuby on Railsのエコシステムの中で、非常に初期から存在しています。[rubygems.orgの履歴](https://rubygems.org/gems/carrierwave/versions)によると、最初のバージョンは2009年（！）にはリリースされており、1.0は2016年のクリスマスイブ、2.0は2019年8月、3.0は2023年7月にリリースされました。記事執筆時点の最新バージョンは3.1.2です。

SmartHRのRailsアプリケーションでも、開発の初期からCarrierWaveを利用してファイルアップロード機能を実装しています。一方で、CarrierWaveには独特の設計思想や注意点があり、特に長期運用しているとさまざまな罠を踏みがちです。この記事では、実際の開発で直面しやすい問題点と、今の段階で検討している対応策について紹介します。

-   [はじめに](#はじめに)
-   [CarrierWaveとは](#CarrierWaveとは)
-   [CarrierWaveの要注意ポイント](#CarrierWaveの要注意ポイント)
    -   [assignで副作用が起こる](#assignで副作用が起こる)
        -   [問題となるケース](#問題となるケース)
        -   [課題への対策](#課題への対策)
    -   [ファイルパスの設計が難しい](#ファイルパスの設計が難しい)
        -   [問題となるケース](#問題となるケース-1)
        -   [retrieveを意識する必要性](#retrieveを意識する必要性)
        -   [課題への対策](#課題への対策-1)
    -   [複雑なライフサイクル・フックを把握しづらい](#複雑なライフサイクルフックを把握しづらい)
        -   [ライフサイクルの全体像](#ライフサイクルの全体像)
        -   [プラグイン併用の問題](#プラグイン併用の問題)
        -   [課題への対策](#課題への対策-2)
-   [将来について: 結局別のライブラリに移行すべきなの？](#将来について-結局別のライブラリに移行すべきなの)
    -   [Active Storage](#Active-Storage)
    -   [Shrine](#Shrine)
    -   [Paperclip （非推奨）](#Paperclip-非推奨)
-   [まとめ](#まとめ)
-   [We Are Hiring!](#We-Are-Hiring)

CarrierWaveの特徴を整理します。CarrierWaveは、Ruby/Railsアプリケーションでファイルアップロードを簡単かつ柔軟に実装するためのgemです。主要な機能は以下のようになります。

-   ActiveRecordとのシームレスな統合
-   画像のリサイズ・変換などの処理機能
-   ローカルストレージ、S3、GCS（Google Cloud Storage）など複数のストレージバックエンドに対応
-   バリデーション機能（ファイルタイプ、サイズなど）

基本的な利用方法は次のとおりです。

class AvatarUploader < CarrierWave::Uploader::Base
  storage :file

  def store\_dir
    "uploads/#{model.class.to\_s.underscore}/#{mounted\_as}/#{model.id}"
  end
end

class User < ApplicationRecord
  mount\_uploader :avatar, AvatarUploader
end

user = User.new
user.avatar = params\[:file\]
user.save!

user.avatar.url          
user.avatar.current\_path 
user.avatar\_identifier   

具体的なRails上での使われ方についてはこの記事では省略します。[公式のREADME](https://github.com/carrierwaveuploader/carrierwave?tab=readme-ov-file#carrierwave)等を参照してください。

## CarrierWaveの要注意ポイント

CarrierWaveを運用するにあたり、注意すべき点を紹介します。

### assignで副作用が起こる

重要な注意点の一つは、**ファイルの代入（assign）で副作用が発生する**ことです。

たとえば、 `mount_uploader :avatar, AvatarUploader` をモデルで宣言すると、 `avatar=` メソッドが動的に再定義されます。実装箇所である [`lib/carrierwave/mount.rb`](https://github.com/carrierwaveuploader/carrierwave/blob/b53a72588ef2656940b940808b9f23ceb7992ba8/lib/carrierwave/mount.rb) の `mount_uploader` メソッドの一部を抜粋します。

def mount\_uploader(column, uploader=nil, options={}, &block)
  
  mod = Module.new
  include mod
  mod.class\_eval <<-RUBY, \_\_FILE\_\_, \_\_LINE\_\_+1
    def #{column}
      \_mounter(:#{column}).uploaders\[0\] ||= \_mounter(:#{column}).blank\_uploader
    end

    def #{column}\=(new\_file)
      \_mounter(:#{column}).cache(\[new\_file\])
    end
    # ... 他のメソッドも同様に定義される
  RUBY
end

今回は具体的には以下のようなメソッドが自動定義されるイメージです。

def avatar=(new\_file)
  \_mounter(:avatar).cache(\[new\_file\])
end

この定義の通り、アサインするだけで `Mounter#cache` を呼び出し、ファイルアップロードが行われます。CarrierWaveは **DBに永続化する前にキャッシュファイルを事前にアップロードする** という設計思想を採用しているためです。

#### 問題となるケース

具体的には、保存前のバリデーションエラーやトランザクションのロールバック時に、キャッシュファイルが残ってしまうことが挙げられるでしょう。以下は、バリデーションエラー時にフォームを再表示する、よくあるコードかと思います。

@user = User.new
@user.avatar = user\_params\[:avatar\] 
if @user.invalid?
  render :new
  return
end

仮に再度ポストする際にファイルが変わらない場合、 `cache_name` という値が保持されているので、それを渡すことで前回アップロードしたファイルを使いまわすように実装できます。この処理は**retrieve**と呼ばれます。この処理は後の節で再度紹介します。

一方で、再度ポストする際に別のファイルのアップロードが行われたら、以前アップされたファイルは**そのまま残ってしまいます**し、Railsからアクセスする方法もなくなります。

#### 課題への対策

キャッシュファイルはそのフォームの提出中にだけ存在すればいいので、一定期間以上残留させる必要はありません。したがって、CarrierWaveにはキャッシュクリーンアップ用のRakeタスクが用意されているため、定期的に実行することが推奨されています。

また、[オブジェクトストレージのライフサイクルルール（GCSの例）](https://cloud.google.com/storage/docs/lifecycle)を設定して自動削除する方法もあります。

### ファイルパスの設計が難しい

CarrierWaveでは `cache_dir` や `store_dir` メソッドを上書きすることでファイルの保存先を制御しますが、これが意外と難しいポイントです。

前提として、ファイルをアップロードする際、そのファイパスは以下のような性質を持っていることが望ましいと考えられます。

-   一意であること
    -   同じパスに異なるファイルが保存されない（＝衝突しない）
-   推測不可能であること
    -   他人が容易に推測できたり、攻撃されない

#### 問題となるケース

では、モデルの特定の属性を含むパス設計を考えましょう。たとえば以下のような定義はどうでしょう。

class AvatarUploader < CarrierWave::Uploader::Base
  def store\_dir
    "uploads/#{model.class.to\_s.underscore}/#{mounted\_as}/#{model.updated\_at.to\_i}/#{model.id}"
  end
end

モデルの `updated_at` 属性を含めることで、ファイルの更新のたびにパスが変わり、衝突を避けられそうです。

しかし、ここでファイルを更新していないけれど、別の属性を更新して、結果的に `updated_at` が更新された場合はどうなるでしょう？ `store_dir` の導出結果が変わってしまい、結果的に本来アップロードされたファイルパスを二度と参照できなくなるという事態になります。

このように、 `store_dir` や `full_filename` 、 `cache_dir` の値がどの属性に依存して決定するかは慎重に検討する必要があります。これらの値がUploaderごとに定義できるのはCarrierWaveの強力な特徴ですが、同時に設計の難しさにもつながります。

#### retrieveを意識する必要性

CarrierWaveは**識別子**という属性を持っており、これを使ってファイルを取得します。通常は `mount_uploader :FOOBAR` と宣言したら、 `FOOBAR` というカラムに識別子が保存されます。この仕組みを理解した上での設計が重要です。

また、前の節で紹介したキャッシュファイルについても、 `cache_name` というキャッシュ用の識別子で管理されていることを理解しておく必要があります。 `cache_name` はキャッシュアップロードのタイミングで決定される値で、その値はDBには通常保持せず、コントローラーの処理の中でユーザー側のフォームに返却することを想定しています。

これらの、識別子から保存したファイルを復元する処理や、 `cache_name` からキャッシュファイルを復元する処理は、**retrieve**と呼ばれています[\*1](#f-94f591b6 "前者は retrieve_from_store! 、後者は retrieve_from_cache! というメソッドで実行されます。")。

#### 課題への対策

原則として、 `store_dir` や `full_filename` などの値は、そもそもの識別子から一意に導出できるようなロジックを考える必要があります。

ただ、それだと「一意である」「推測されない」といった要件を満たしづらい場合もあるでしょう。その場合も、ランダム性を含んだ属性は別途カラムに保持し、容易に変更されない状態を保つことが重要です。たとえば、元のファイル名からsalt付きで計算したハッシュ値を別途カラムに保存し、それを `store_dir` や `filename` の導出に使う方法などが考えられます。

また、既存の実装があり、すでに不安定なルールで永続化されたファイルが存在する場合もあるかも知れません。その場合は仕方ないので、以下のような移行手順を取ることになるでしょう。

-   ファイルのフルパスのスナップショットを格納するためのカラムを用意する
-   既存のファイルについて、フルパスのスナップショットを算出してカラムを埋める
-   そのカラムが埋まっている場合は、それを優先的に使う
-   そうでない場合は、新しい運用可能なルールで導出する

この移行作業はタフになるかとは思いますが……。

### 複雑なライフサイクル・フックを把握しづらい

CarrierWaveにおけるファイルのライフサイクルを理解することは、正しく使いこなす上で非常に重要です。一方で、やっていることの多さゆえに全貌を掴むのには苦労します。その概要を説明します。

#### ライフサイクルの全体像

まず、CarrierWaveでは、必ず意識しないといけないフックが4つあります。

-   `cache!`
    -   ファイルがアップロードされ、モデルにassignされた時に発火する
-   `retrieve_from_cache!`
    -   アップロードの再開時、キャッシュファイルをretrieveする時に発火する
-   `store!`
    -   キャッシュ後のファイルを永続化する時に発火する
-   `retrieve_from_store!`
    -   永続化したファイルを参照するため、取得する時に発火する

このフックのタイミング・関係性を理解しやすいように、以前社内勉強会で作成した画像を引用します。

![CarrierWaveのフック同士のライフサイクルの図。4つのフックが絡み合うことを留意する](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20251203/20251203105535.png)

CarrierWaveのフック同士のライフサイクルの図

なんとなくの処理の流れが掴めるかと思います。フックの詳細なところは本記事では省略しますが、cache/storeとretrieveを軸にライフサイクルがあることは意識する必要があります。

さらに、特殊なフックの存在があります。具体的には `process` と `version` と呼ばれるフックで、 `process` は画像の回転など画像自体の加工処理を登録するために、 `version` はサムネイルなどの派生画像を生成するために使われます。

`version` はそれなりに厄介です。画像の生成は基本的に同期的に行われるからです。したがって例えば大量の派生画像を `version` で定義しているとパフォーマンス上の課題が生まれやすいです。また、キャッシュの段階で画像を生成するので、assignをするだけで何個も画像がアップロードされる罠を踏むこともあります。

#### プラグイン併用の問題

この項目では別のActiveRecordのプラグインと併用することでの問題に焦点を当てます。

SmartHRの場合は、[Bi-Temporalデータモデル](https://speakerdeck.com/hypermkt/history-on-rails-with-bitemporal-data-model)を導入するためのgem、[activerecord-bitemporal](https://github.com/kufu/activerecord-bitemporal)とCarrierWaveを組み合わせて使っています。activerecord-bitemporalは、その機能上、内部で自動的にレコードを作成する挙動をします。その際にファイル属性のassignが走ることがあり、意図しない箇所でのアップロードが発生しうる、という問題が起こっています。

また、Bi-Temporalデータモデルの特性上、削除したファイルであっても過去の履歴として残さないといけないという要件があります。このために、CarrierWaveのファイル削除フックを条件により無効化する等の対応が必要です。

#### 課題への対策

現在、ここまで述べたようなフックの定義や利用箇所を整理して、不要なアップロードや、潜在的な不具合を洗い出す作業を実施しています。

さらに、フック内での不要なファイル生成・アップロード処理を抑止できないかの検討もしています。フックの中の挙動をコントロールするのはなかなか離れ技なのですが、 `ActiveSupport::CurrentAttributes` などのような仕組みを使えばアップロード時のコンテクストを持ち回せると考えています。実際、処理上不要なversionのファイルアップロードを抑制できないかについて検証をし、一部の処理で展開しています。

以下は、ブロック内でのversionファイル生成・アップロードを抑止する疑似コードです。

ApplicationUploader.suppress\_version\_upload do
  crew.save!
end

## 将来について: 結局別のライブラリに移行すべきなの？

ここまで見てきた通り、CarrierWaveにまつわる技術的課題は、そもそもの設計思想に根ざしている部分が多い印象です[\*2](#f-6c1e9094 "良い悪い、というより、作ろうとしているシステムとの相性だとは思いますが。")。運用でカバーする以上に、別のファイルアップロードライブラリへの移行も根本的な解決策として検討すべきかもしれません。

Ruby/Railsエコシステムには、CarrierWave以外にもファイルアップロードを実現する選択肢があります。理解の参考までに幾つかを紹介します。

### [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html)

Rails 5.2以降に標準搭載されているファイルアップロードフレームワークです。Railsに標準で含まれるため、追加のgemが不要です。Railsの標準に沿いたい場合に適しているでしょう。

### [Shrine](https://shrinerb.com/)

CarrierWaveの後継として設計された、モダンなファイルアップロードgemです。実装のコア部分を小さく保つ設計思想で、プラグインベースのアーキテクチャで必要な機能だけを組み込めるようになっています。

### [Paperclip](https://github.com/thoughtbot/paperclip) （非推奨）

かつて人気だったgemですが、[2018年に非推奨](https://robots.thoughtbot.com/closing-the-trombone)となり、現在はActive Storageへの移行が推奨されています。新規プロジェクトでの採用は避けるべきかと思います。

また、SmartHRの画像の問題はBi-Temporalデータモデルとの相性が非常に大きいこともあり、ライブラリ自作も選択肢のうちに入るかと思います。

いざ移行するとなった場合は、基本的には[Double Write](https://soudai.hatenablog.com/entry/database-refactoring-double-write#%E3%83%AA%E3%83%95%E3%82%A1%E3%82%AF%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%92%E5%AE%9F%E6%96%BD%E3%81%99%E3%82%8B)（参照先はDBでの例ですが、ファイルアップロードでも有効な手法だと思います）の仕組みを取り入れつつ、必要に応じ裏側でのデータ変換も実施し、顧客への影響がないように進めることになるでしょう。

## まとめ

SmartHRにおけるCarrierWaveの運用上の注意点と技術的課題について紹介しました。CarrierWaveは非常に便利なgemですが、設計思想に起因する課題も多く、見直しのポイントに来ているのかなと思います。

移行も含めあらゆる選択肢を検討していますが、移行するにしても、自作するにしても、顧客への影響度や今後の運用性を考慮した更なる検証が必要になりそうです。

正直どういう形がベストかはわからないところも多く、引き続きチームで議論しつつ手を動かしたいと思っています。

本記事ではあえて「生煮え」の技術的課題を掲載しています。このような生煮えの技術的課題をなんとかしてみたい方は、ぜひ[SmartHRの採用ページ](https://hello-world.smarthr.co.jp/)からご応募ください！

## We Are Hiring!

ということでSmartHRでは一緒にSmartHRをより良くしていく仲間を募集中です！

SmartHRの改善を通して、SmartHRのエンジニア全体の生産性、ひいては日本全体の生産性を向上させることに興味がある方、ぜひお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)

[\*1](#fn-94f591b6):前者は retrieve\_from\_store! 、後者は retrieve\_from\_cache! というメソッドで実行されます。

[\*2](#fn-6c1e9094):良い悪い、というより、作ろうとしているシステムとの相性だとは思いますが。