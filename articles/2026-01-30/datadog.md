---
title: "「特定のログだけ隠したい」を Datadog で実現する"
source: "https://tech.layerx.co.jp/entry/2025/12/10/110000"
publishedDate: "2025-12-10"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "yuu2634"
---

バクラク事業部 Platform Engineering 部 SRE グループの [uehara](https://x.com/m_on_yu) です。

[LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025) の10日目の記事です。昨日は、upamune さんの「[ローカル開発のシークレット設定を自動化する ── Go × AWS Secrets Manager](https://zenn.dev/layerx/articles/762ecd4494694f)」でした。

弊社ではオブザーバビリティ基盤として Datadog を採用し、各種ログの閲覧やプロダクト健全性の把握など、日々の運用でフル活用しています。

年々増えるプロダクトとともに扱う情報の種類が増え、これまでよりも細かな閲覧制御を必要とする場面が出てきました。 今回は、Datadog Custom Role によるログの閲覧制御について検証した内容をご紹介します。

* * *

**(2025-12-19 追記)**  
本文中で触れている Data Access Control が一般公開され、Restriction Query が Terraform 対応してデフォルトロールにも適用可能になるなど、執筆時点から状況が変動しています。最新情報は Datadog 公式ドキュメント等でご確認ください。

* * *

Datadog にはデフォルトで以下3つのロールが用意されています。

-   Datadog Admin Role: 管理者向け。すべての操作が可能
-   Datadog Standard Role: 一般ユーザ向け。権限変更や請求関連を除くほとんどの操作が可能
-   Datadog Read Only Role: 読み取り専用。変更操作は一切不可

弊社では一部の Datadog 管理者を除き、開発者には Standard Role を付与しています。ログやメトリクス等は制限なく閲覧でき、ダッシュボードやアラートも自由に作成可能です。

デフォルトロールの権限はカスタマイズできないため、特定ログの閲覧制限など細かな制御には Custom Role を使用します。

(参考) 公式ドキュメント: [https://docs.datadoghq.com/account\_management/rbac/permissions/#roles](https://docs.datadoghq.com/account_management/rbac/permissions/#roles)

## Custom Role の作成

Datadog にログインし `Organization Settings` -> `Roles` を開きます。初期状態では Custom Role が無効なため `Enable` ボタンで有効化します。(有償プランのみ利用可)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20251209/20251209185702.png)

`New Role` から新たに `Developer Role` を作成、必要な権限を付与します。この段階では機能単位の権限設定のみで、タグ等を用いた細かな制御はできません。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20251209/20251209181510.png)

## ログの閲覧制限

次にログの閲覧制限です。今回は Go アプリケーションログの閲覧を制限し、それ以外は従来通りに閲覧可能としてみます。実現方法としては以下の2つが候補です。

-   Data Access Control
    -   [https://docs.datadoghq.com/account\_management/rbac/data\_access/](https://docs.datadoghq.com/account_management/rbac/data_access/)
    -   Account Management 内の一機能
    -   事前定義したデータセット (APM, RUM, ログ等) について、指定したロールやチームのみアクセス可能にする
-   Restriction Query
    -   [https://docs.datadoghq.com/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs](https://docs.datadoghq.com/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs)
    -   Log Management 内の一機能
    -   閲覧可能なログをクエリフィルタで制限する (ロール単位の設定)

前者は検証時点で `Data Access Control is in Limited Availability` のステータスであり、弊社環境ではまだ利用できず、後者の Restriction Query を用いました。

他にも、ログのインデックス自体を分ける・Datadog アカウント自体を分けるといった手法がありますが、今回は割愛します。

## Restriction Query 設定

Restriction Query はその名の通りクエリを制限する機能です。「**検索クエリに強制適用される追加フィルタ**」をイメージすると理解しやすいかもしれません。

`Log Configuration` -> `Data Access` から Restriction Query を新規作成します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20251209/20251209194925.png)

Go アプリケーションログを除外するクエリ `-source:go` を指定し、先ほど作成した Custom Role (Developer Role) に紐づけました。この設定により、Developer Role のログクエリには常に `-source:go` の条件が強制適用されます。

## 動作検証

では検証環境で動作を確認してみます。Developer Role のみに属するユーザで Datadog Logs を開き、制限クエリの適用前後で比較しました。

Before: すべてのログ 67,816件 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20251209/20251209194432.png)

After: Go のログが除外され 19,781件 ![](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yuu2634/20251209/20251209194444.png)

Before / After ともにクエリ条件は空ですが、取得結果が変動しました。Restriction Query により `-source:go` の条件が暗黙的に適用されたことを確認できます。

Developer Role からは Go アプリケーションログの存在自体が見えなくなりました。

## 実運用に向けた検討

本記事では検証のため `-source:go` という条件を用いたものの、実際は特定サービスのみ閲覧許可・特定タグを持つログのみ除外、といった用途で活用できそうです。

#### 権限制御の課題

今回は Custom Role + Restriction Query で制限を掛けましたが、「特定ログの閲覧者を絞る」ためにこの手法を取る場合は注意が必要です。いくら Custom Role を作成しても、デフォルトロールを持つユーザからはこれまで通り閲覧が可能なためです。

加えて、ユーザが複数ロールに所属している場合、権限は和集合 (OR 条件) となります。デフォルトロールを持ったままの既存ユーザに、制限付きの Custom Role を追加でアタッチしても制限がかかることはありません。

現実的な運用案としては以下のいずれかが必要になると考えています。

-   除外条件ではなく allow list として Restriction Query を設計する
-   管理者以外はデフォルトロールを使用せず Custom Role 中心で運用する
-   Data Access Control を用いてデータ種別ごとに厳密なアクセス管理を行う

個人的には最後の [Data Access Control](https://docs.datadoghq.com/account_management/rbac/data_access/) で明示的かつ網羅的なコントロールを実現できると考えており、利用可能になり次第検証を行う予定です。

#### Terraform 管理

今回使用した Custom Role は [datadog\_role](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role) で管理可能ですが、Restriction Query は執筆時点で該当する resource がまだありません。[\*1](#f-2f4c2a37 "Feature Request は存在します")

現時点では public beta として公開されている API を用いるのが代替手段となりそうです。[https://docs.datadoghq.com/api/latest/logs-restriction-queries/](https://docs.datadoghq.com/api/latest/logs-restriction-queries/)

## まとめ

Datadog におけるログ閲覧制御の手法として、Custom Role + Restriction Query の事例をご紹介しました。ロールとの組み合わせに注意は必要ですが、比較的シンプルに制御を実現できる便利な機能です。

弊社では、このようなオブザーバビリティ基盤を一緒に育てていける仲間を探しています。少しでもご興味のある方は、ぜひ Open Door でお話させていただけると嬉しいです！

[jobs.layerx.co.jp](https://jobs.layerx.co.jp/opendoor/0cc0b754363d428eaca0f2d9922c941c/)

また、先日バクラク事業部の Engineering Team Deck が公開されました。プロダクト開発・開発組織・会社情報まで盛りだくさんですのでぜひ一度ご覧ください！

[speakerdeck.com](https://speakerdeck.com/layerx/bakuraku-engineering-team-deck)

[LayerX Tech Advent Calendar 2025](https://tech.layerx.co.jp/entry/tech-advent-calendar-2025) はまだまだ続きます。今後もお見逃しなく！