---
title: "Railsにおける未ログインユーザーのセッション削減方法 ——  セッションストアのストレージを抑制！"
source: "https://tech.smarthr.jp/entry/2026/01/14/191158"
publishedDate: "2026-01-14"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

こんにちは、SmartHRのDPEユニットでエンジニアをしている[@alpaca-tc](https://github.com/alpaca-tc)です。 この記事では、Railsで頻発しているけれども見落とされがちな未ログインユーザーのセッションと、その削減方法について紹介します。

## 目次

-   [目次](#目次)
-   [未ログインユーザーのセッションとは](#未ログインユーザーのセッションとは)
-   [セッション削減の方法](#セッション削減の方法)
-   [なぜミドルウェアを使うのか](#なぜミドルウェアを使うのか)
-   [成果とまとめ](#成果とまとめ)

## 未ログインユーザーのセッションとは

Railsではログイン情報等を管理するためにセッションを利用します。 通常はControllerで `session` にアクセスすることでセッション情報を取得・更新できます。

def create
  session\[:user\_id\] = @user.id
  ...
end

セッションは、CSRF攻撃を防ぐためのトークンを `session[:_csrf_token]` に格納することにも利用されています。

実はセッションは、csrf\_tokenのために未ログインのアクセスに対しても自動的に発行されています。そのため、未対策では気づかぬ間に大量にセッションを発行してストレージを圧迫しています。

経験に基づくと、ログイン必須のサービスであってもセッション全体の8割が未ログインユーザーによって占められます。そうなると、塵も積もれば山となり、セッションストアのメモリ逼迫を引き起こす要因となります。

## セッション削減の方法

ミドルウェアを導入して、未ログインユーザーのセッションの有効期限を短くすることで、セッションの削減が可能です。

class UnauthenticatedSessionExpireAfter
  def initialize(app, expire\_after: 1.hour.freeze)
    @app = app
    @expire\_after = expire\_after
  end

  def call(env)
    @app.call(env)
  ensure
    if env\[Rack::RACK\_SESSION\_OPTIONS\] && !authenticated?(env)
      env\[Rack::RACK\_SESSION\_OPTIONS\]\[:expire\_after\] = @expire\_after
    end
  end

  private

  def authenticated?(env)
    
    env\["rack.session"\] && env\["rack.session"\]\["user\_id"\]

    
    Warden::SessionSerializer.new(env).stored?(:user)
  end
end

上記のコードでは、未ログインのユーザーに対してセッションの有効期限を短時間に設定しています。これにより、未ログインユーザーのセッションが短期間で削除され、セッションストアのストレージ使用量を抑制できます。

なお、ミドルウェアの挿入は以下のように行います。 重要なポイントとして、ミドルウェアはセッションの保存前に有効期限を設定する必要があるため、セッションストアの直後に挿入する必要があります。

ご自身の利用しているセッションストアのミドルウェア名については `./bin/rails middleware` コマンドで確認してください。

config.middleware.insert\_after ActionDispatch::Session::YourSessionStore, UnauthenticatedSessionExpireAfter

## なぜミドルウェアを使うのか

例えば、古いgitlabでは[元々はコントローラーで設定していました](https://gitlab.com/gitlab-org/gitlab-foss/-/merge_requests/20700/)。

class ApplicationController < ActionController::Base
  before\_action :limit\_unauthenticated\_session\_times

  private

  def limit\_unauthenticated\_session\_times
    return if current\_user
    return unless request.env\['rack.session.options'\]

    request.env\['rack.session.options'\]\[:expire\_after\] = 1.hour
  end
end

しかし、[最新のコードベースではミドルウェアで設定するように変更されています。](https://gitlab.com/gitlab-org/gitlab/-/commit/8c85364205ccb)。 コントローラーで設定する方法では、コントローラーに到達せずミドルウェアで処理されるようなリクエストに対してはセッションの有効期限が設定されなかったためです。

多くのRailsアプリケーションでも同じことが言えるため、ミドルウェアで設定する方法を推奨します。

## 成果とまとめ

この変更を導入して既存のセッションにも適用したところ、redisのセッションストアの使用量は大きく削減されました。

-   メモリ 13GB 減 (27%程度削減)
-   キー数 56,410,000 減 (52%程度削減)

その後もキーの増加が抑制されており、セッションストアの逼迫を防止できています。

未ログインユーザーのセッションは見落とされがちですが、多くのRailsアプリケーションは潜在的にこの問題を抱えているはずです。ぜひ参考にしてみてください。