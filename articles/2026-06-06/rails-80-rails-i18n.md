---
title: "Rails 8.0アップグレードの落とし穴 —— rails-i18nによる金額表記の不具合と対策"
source: "https://tech.smarthr.jp/entry/2026/06/05/104421"
publishedDate: "2026-06-05"
category: "design"
feedName: "SmartHR Tech Blog"
author: "willnet"
---

こんにちは。SmartHRでRails顧問業をしている[@willnet](https://github.com/willnet/)です。

最近は暑い日が多いですね。まだなんとかジョギングできるレベルなので、今のうちにできるだけ毎日走って体力を向上させたい、そして体重を落としたいという気持ちで毎日を過ごしています🏃💨。

今日はRails 8.0アップグレードの話をしようと思います。

先日、SmartHRで「基本機能」と呼ばれている大きなRailsアプリケーションをRails 8.0にアップグレードしました。しかし大きいアプリケーションのRailsアップグレード作業はすんなりといきません。2回のリバートの末に何とか完了しました。現在では安定して運用できています。

このブログエントリでは、SmartHRにおいてRails 8.0へのアップグレード後、最初にリバートされることになった落とし穴の原因と対策について解説します。おそらくこれからRails 8.0にアップグレードするときに同じ問題に遭遇する人がいると思うので、注意喚起を兼ねてブログの形でまとめようと思った次第です。

## rails-i18n gemとは

[rails-i18n](https://github.com/svenfuchs/rails-i18n)というgemがあります。これはRailsが利用するi18n(internationalization、国際化)用の辞書定義が集まったものです。rails-i18nをインストールするだけで様々な言語の定義を利用できるようになります。「基本機能」アプリケーションでは長らくrails-i18nを利用してきました。

rails-i18nのバージョン指定はRailsのバージョンに合わせた形式になっています。具体的にはRails7系に対応するrails-i18nのバージョンは7.0系であり、Rails 8.0に対応するrails-i18nのバージョンは8.0系です。バージョンの依存関係は明示的に定義されているので、Rails 8.0のアップグレードとrails-i18nのアップグレードは同時に行う必要があります。

## デプロイ後に気づいた不具合

最初のRails 8.0アップグレード後、金額を表示するフォーマットがおかしくなっていることがわかりました。「-100円」と表示されるべきところが「-円100」となっています。

リバート後に原因を調査したところ、rails-i18nのv8.0.2に入った日本語の辞書定義にバグがあることがわかりました。`ja.number.currency.format.negative_format`という定義が新しく追加されましたが、数値と円表記の順番が逆になっています。

`ja.number.currency.format.negative_format`は[number\_to\_currency](https://api.rubyonrails.org/v8.0.5/classes/ActiveSupport/NumberHelper.html#method-i-number_to_currency)メソッドの引数が負の値の時に利用されます。[`number.currency.format.negative_format`の定義がないときは`number.currency.format.format`の先頭に`-`をつけた文字列が返る](https://github.com/rails/rails/blob/985e510db4331798e5bf43b892cef9ede7dca43f/activesupport/lib/active_support/number_helper/number_to_currency_converter.rb#L41)ため、これまでは特に問題なく利用できていました。しかしrails-i18nのv8.0.2を利用すると明示的に間違ったフォーマットが指定されるため表示がおかしくなってしまいます。

## 不具合対応と今後の検討事項

取り急ぎrails-i18nに[修正のプルリクエストを投げました](https://github.com/svenfuchs/rails-i18n/pull/1166)。マージはされましたがすぐにはリリースされないので、手動でi18n定義を追加することでrails-i18nの定義を上書きして対応しました。下記は上書きをするyamlの例です。

ja:
  number:
    currency:
      format:
        negative\_format: '-%n%u'

これで今のところ問題なく運用できていますが、多言語対応をきちんとするのであれば自前で全てのi18n辞書を管理するべきでは？という意見もあり、今後どうするかは検討事項です。rails-i18nを利用することでi18nの定義を省力化できますが、ある程度育ったプロダクトであれば自分たちで管理する方がメリットが大きいようにも思えます。

## まとめ

Rails 8.0アップグレード時にハマった落とし穴について共有しました。テストカバレッジが十分あっても、全てのケースをカバーできるわけではありません。この情報が皆さんのRails 8.0アップグレードに役立つようであれば幸いです。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

みんなで楽しくRailsのバージョンを上げていきましょう！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)