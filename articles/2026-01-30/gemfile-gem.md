---
title: "Gemfileを掃除しよう —— 見知らぬGemが追加された背景を追ってみた"
source: "https://tech.smarthr.jp/entry/2026/01/06/140929"
publishedDate: "2026-01-06"
category: "design"
feedName: "SmartHR Tech Blog"
author: "yuriko1211"
---

こんにちは。課金基盤チームの[yuriko](https://x.com/yuriko12111)です。2026年もやってきました。新年を迎えて心機一転、身の回りを整理整頓・大掃除したくなりますよね？

今回はGemfileにいつの間にか追加されていたGemを「掃除」した話をしたいと思います。

## それはDependabotの作ったPRからはじまった

私の所属している課金基盤チームでは、Ruby on Rails製の社内向けアプリケーションを開発しています。このアプリのリポジトリでは、Dependabotによって定期的にGemアップデートのためのPull Request（以下、PR）が作成されるようになっています。

いつものようにGemアップデートのPRを確認していた私は、見慣れないGemのアップデートPRを目にしました。それは[net-imap](https://github.com/ruby/net-imap)というGemでした。

## net-imapとは

net-imap GemはIMAPのクライアントライブラリです。サーバーで受信したメールを扱うために使われます。

対象のアプリではメール送信を行っているものの、受信したメールを処理することはありません。コードを調べた限り、このGemを使っている処理はなさそうです。

## Gemが追加されたのはRuby 3.1.4へのバージョンアップ時

net-imapが追加されたPRを確認すると、Ruby 3.0.3からRuby 3.1.4へのRubyアップデートのPRでした。このPRではnet-imapの他に[net-pop](https://github.com/ruby/net-pop)、[net-smtp](https://github.com/ruby/net-smtp)というGemがGemfileに追加されています。どれもメールの送受信に関わるGemです。

Ruby3.1.4で何が起きたのでしょうか？

マイナーバージョンである[Ruby 3.1.0のリリースノート](https://www.ruby-lang.org/ja/news/2021/12/25/ruby-3-1-0-released/)を見てみます。

> -   以下のライブラリが新たに bundled gems になりました。Bundler から利用する場合は Gemfile に明示的に指定してください。
>     -   net-ftp 0.1.3
>     -   net-imap 0.2.2
>     -   net-pop 0.1.1
>     -   net-smtp 0.3.1
>     -   matrix 0.4.2
>     -   prime 0.1.2
>     -   debug 1.4.0

これまでdefault gemsとなっていたnet-imap、net-pop、net-smtp がbundled gemsになり、これによってBundlerから利用する場合はGemfileで明示的に指定する必要が生じました。

だから、Ruby 3.1.4へのバージョンアップでGemfileにこれらのGemが追加されていたというわけです。

気になるのはこれらのメール送受信に関わるGemたちがどこで使われているかということです。

Railsでメールといえば[ActionMailer](https://railsguides.jp/action_mailer_basics.html)です。ActionMailerはRailsアプリケーションからメールを送信するためのコンポーネントです。

ちなみにメール関連だとメール受信を処理する[ActionMailbox](https://railsguides.jp/action_mailbox_basics.html)というコンポーネントも存在します。こちらは今回対象となるアプリでは使っていません。

ActionMailerは[mail](https://github.com/mikel/mail) Gemを使っており、さらにこのmail Gemはnet-imap、net-pop、net-smtpといったGemを使っているという依存関係になります。

しかし、私の開発しているアプリではActionMailer（Rails）がインストールされているわけで、直接依存するmail Gemや間接的に依存するnet-imap、net-pop、net-smtpを明示的にGemfileに書く必要はないように思えます。

どうしてRubyアップデートの際にこれらのGemを追加したのでしょうか？

## 原因はRailsのバージョン

調べたところ、[enpayのRubyが3.1.0にアップデートしました🎉](https://blog.enpay.co.jp/enpayruby310)という記事が見つかりました。

> Ruby3.1.0 ではいくつかの Gem が default gem から bundled gem に変更になりました。
> 
> これらのうちメール関連の Gem (net-pop, net-imap, net-smtp)は actionmailer と actionmailbox の依存 Gem (正確には actionmailer と actionmailbox が依存している mail の依存 Gem)のため、Rails のバージョンが 6.1 以下の場合に net-pop や net-imap、net-smtp を読み込もうとした時点で LoadError が発生します。
> 
> この現象は Rails7.0 では [https://github.com/rails/rails/pull/44083](https://github.com/rails/rails/pull/44083) で修正されているのですが、Pull Request の description にある通り Rails6.1 にはバックポートされていないためワークアラウンドな対応として Gemfile に net-pop、net-imap、net-smtp を追加しました。

これでは！？

調べてみると、このRuby 3.1.4へのアップデート時のRailsバージョンは6.1.6.1でした。これだ！

## Gemを追加したり削除したり

引用した記事にも記載の通り、Rails 7.0でnet-pop、net-imap、net-smtpがRails側でインストールされるようになっています。2022年1月のことです。

[github.com](https://github.com/rails/rails/pull/44083)

おそらくmail Gem側の対応が追いついていなかったのでRails側で一旦インストールするようにしたのでしょう。mail Gem側でも数ヶ月遅れて対応されています。

[github.com](https://github.com/mikel/mail/pull/1472)

そして、時は流れて2024年、不要になったnet-pop、net-imap、net-smtpがRails側で削除されています。

[github.com](https://github.com/rails/rails/pull/50668)

## つまりGemfileから消していいわけです

mail Gem側で対応された以上、私たちの開発しているアプリでnet-imapをGemfileで管理する必要はありません。

Gemfileから削除します。バイバイ。ActionMailerとその先のmail Gemで元気にな。

## たまにはGemfileを掃除しよう

というわけで、Gemfileに眠っていた不要なGemの背景を追い、削除した話でした。

今ではGemfileで個別の管理が不要なGem、使っていないGemが意外と眠っているかもしれません。（Rails側でもGemを削除するのに2年かかってますしね）

新年が始まったばかりの今こそGemfileの大掃除をしてみてはいかがでしょうか。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)