---
title: "AlloyDBのバックアップを定期的に別リージョンに作成・削除する方法"
source: "https://tech.smarthr.jp/entry/2026/03/10/100310"
publishedDate: "2026-03-10"
category: "design"
feedName: "SmartHR Tech Blog"
author: "kekke-n"
---

SmartHRのSREユニットに所属している、kekkeです。

最近、SRE Kaigi 2026というテックカンファレンスでBCPの取り組みについて登壇させていただきました。こちらもぜひ御覧ください。

※BCPとは、大きな障害が発生しても事業を継続できるように予め準備をしておく計画のことです。

[2026.srekaigi.net](https://2026.srekaigi.net/#timetable?session-rooma-1335)

[speakerdeck.com](https://speakerdeck.com/kekke_n/xiao-sakushi-merubcp-duo-hurotakutohuan-jing-teshi-meruzui-chu-no-bu)

さて、今回の記事は、そのBCPにも関わりがある「AlloyDBのバックアップを定期的に別リージョンに作成・削除する方法」について紹介したいと思います。

## 背景

SmartHRでは、一部のプロダクトでDBにGoogle CloudのAlloyDBを採用しています。 BCPの一環で、DBは大阪リージョンに定期的にバックアップを取得する必要があるのですが、このAlloyDBには別のリージョンに定期的にバックアップを取得する機能がありません。（2026/02/27現在）

参考：[データのバックアップと復元の概要  |  AlloyDB for PostgreSQL  |  Google Cloud Documentation](https://docs.cloud.google.com/alloydb/docs/backup/overview?hl=ja)

幸い、gcloudコマンドやコンソールから手動でバックアップを取得するオンデマンドバックアップは別リージョンへのバックアップを取得することができるため、自前で定期的なバックアップを作成する仕組みを実装することにしました。

## 注意事項

AlloyDBのオンデマンドバックアップはフルバックアップのみ対応しているため、コストが多く発生します。

-   [データのバックアップと復元の概要  |  AlloyDB for PostgreSQL  |  Google Cloud Documentation](https://docs.cloud.google.com/alloydb/docs/backup/overview?hl=ja#on-demand-or)

もし実装をする場合は「バックアップ ストレージ」と「ネットワーキング」（別リージョンへの転送コスト）のコストを見積ることをおすすめします。

-   [AlloyDB の料金 | Google Cloud](https://cloud.google.com/alloydb/pricing?hl=ja)

本記事の内容を参考にされる場合は、フルバックアップによるコスト増加のリスクを十分に理解した上で、ご自身の責任において実装・運用してください。

## アーキテクチャ

以下のGoogle Cloudのサービスを使います。

-   Cloud Scheduler
    -   指定した日時でCloud Buildを実行
-   Cloud Build
    -   バックアップ作成
        -   東京リージョンのAlloyDB クラスターからオンデマンドバックアップ（フルバックアップ）を作成
    -   バックアップ削除
        -   バックアップの保持期間（日数）を指定する
        -   直近の保持期間より古いバックアップを削除する
-   AlloyDB
    -   バックアップ元となるDB

各サービスの関係を図示すると以下のようになります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260310/20260310100311.png)

Cloud Scheduler、Cloud Build、AlloyDB 間の関係を示したアーキテクチャ図

では、各サービスに対してどのような実装を行ったのか説明します。

細かい設定等は Google Cloud のドキュメントに委ねて、本記事では肝となる部分だけを記載します。

## サービスアカウントの作成

サービスアカウントを２つ用意します。

### Cloud Buildトリガーに付与するサービスアカウント

-   バックアップ作成・削除の権限（ `alloydb.backups.create` 、 `alloydb.backups.delete` ）をもつカスタムロールを付与しています
-   Cloud BuildのログをLoggingに出力するために`roles/logging.logWriter` ロール付与しています

### Cloud Scheduler ジョブに付与するサービスアカウント

-   Cloud Build のビルドを実行するAPI（:run）を呼ぶために`roles/cloudbuild.builds.editor` ロールを付与しています
-   Scheduler経由でCloud Buildのトリガー実行をするために、`roles/iam.serviceAccountUser` ロールを付与しています

## Cloud Build トリガー

Cloud Build トリガーは、実際にAlloyDBのバックアップを作成・削除する部分です。

今回は一つのトリガーに「バックアップ作成」と「バックアップ削除」のステップを実装しています。

### サービスアカウントの設定

AlloyDBを操作できるように「Cloud Buildトリガーに付与するサービスアカウント」をCloud Build トリガーに設定します。

参考：[ユーザー指定のサービス アカウントを構成する  |  Cloud Build  |  Google Cloud Documentation](https://docs.cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts?hl=ja#execute_builds_using_triggers)

### バックアップ作成

インラインbashスクリプトでgcloud コマンドを実行します。

参考：[bash スクリプトの実行  |  Cloud Build  |  Google Cloud Documentation](https://docs.cloud.google.com/build/docs/configuring-builds/run-bash-scripts?hl=ja#running_inline_bash_scripts)

以下は東京リージョン(asia-northeast1)にあるAlloyDBのクラスターを大阪リージョン(asia-northeast2)にバックアップ取る時のサンプルコマンドです。

gcloud alloydb backups create \\
    projects/PROJECT\_ID/locations/asia-northeast2/backups/backup-scheduler-$(date +%Y%m%d-%H) \\
    \--cluster\=SOURCE\_CLUSTER\_NAME \\
    \--region\=asia-northeast1 \\
    \--project\=PROJECT\_ID \\
    \--async

参考：[gcloud alloydb backups create  |  Google Cloud SDK  |  Google Cloud Documentation](https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/backups/create)

バックアップ名は `backup-scheduler-YYYYMMDD-HH` の形式にしています。

-   `backup-scheduler-` というプレフィックスをつけることで、今回の仕組みで作成されたバックアップであることを識別できるようにします（後の削除時に検索の条件で使います）
-   同じ名前だとエラーが起きるため、 `-YYYYMMDD-HH` というサフィックスをつけて時間単位で取得できるようにします

非同期（`--async`）のオプションをつけています。

-   バックアップの時間が30分以上かかると以下のエラーがCloud Buildトリガーで発生しました（バックアップは取得できていました）

ERROR: (gcloud.alloydb.backups.create) Operation https://alloydb.googleapis.com/v1/projects/xxxxx has not finished in 1800 seconds.
The operations may still be underway remotely and may still succeed; 
use gcloud list and describe commands or https://console.developers.google.com/ to check resource state.

-   直接的な原因はわからなかったのですが、gcloudコマンドのタイムアウトが30分みたいなので、`--async` オプションをつけました
-   ただ非同期の場合、gcloudコマンドは成功しても、バックアップに失敗した時に検知できないため、定期的にバックアップを取得できているか確認する必要があります

### バックアップ削除

削除もインラインbashスクリプトを使います。

以下は今まで作成された大阪リージョンのバックアップ（ `backup-scheduler-YYYYMMDD-HH` ）に対して、保持期間（7日）の範囲外であるバックアップを削除するサンプルコードです。

delete\_backup\_ids\=($(
    gcloud alloydb backups list \\
        --project\=PROJECT\_ID \\
        --region\="asia-northeast2" \\
        --filter\="
            type='ON\_DEMAND'
            AND clusterName:SOURCE\_CLUSTER\_NAME
            AND name ~ ^projects/PROJECT\_ID/locations/asia-northeast2/backups/backup-scheduler.\*
            AND createTime < -P7D
        " \\
        --format\="value(name.basename())" 
))

if \[ ${#delete\_backup\_ids\[@\]} \-eq 0 \]; then
    echo "削除対象のバックアップが見つかりませんでした。処理を終了します。"
    exit 0
fi

echo "バックアップを削除します..."
for delete\_backup\_id in "${delete\_backup\_ids\[@\]}"; do
    echo "削除中: ${delete\_backup\_id}"
    gcloud alloydb backups delete "${delete\_backup\_id}" \--project\=PROJECT\_ID \--region\="asia-northeast2" \--quiet
done

echo "バックアップの削除が完了しました"

一つずつ解説していきます

#### 削除対象のバックアップIDを取得

保持期間（日数）の範囲外であるバックアップのIDを取得します。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260310/20260310100314.png)

保持期間の条件で抽出されたバックアップ一覧の例

対象のバックアップの抽出は`gcloud alloydb backups list` の `--filter` オプションを使います。

delete\_backup\_ids\=($(
    gcloud alloydb backups list \\
        --project\=PROJECT\_ID \\
        --region\="asia-northeast2" \\
        --filter\="
            type='ON\_DEMAND'
            AND clusterName:SOURCE\_CLUSTER\_NAME
            AND name ~ ^projects/PROJECT\_ID/locations/asia-northeast2/backups/backup-scheduler.\*
            AND createTime < -P7D
        " \\
        --format\="value(name.basename())" 
))

当時、東京リージョンにもバックアップを取得していたため、それらが誤って削除されないようにする必要がありました。そのため、`--region`、`--filter` の条件をできるだけ厳格に指定しました。

-   `--region="asia-northeast2"`
    -   大阪リージョンの指定しています
    -   東京リージョンのバックアップは除外できます
-   `type='ON_DEMAND'`
    -   オンデマンドバックアップが対象になります
    -   オンデマンド以外（自動バックアップ、継続的バックアップ）を除外できます
-   `clusterName:SOURCE_CLUSTER_NAME`
    -   大阪リージョンにバックアップを取得しているAlloyDBのクラスター名を指定します
-   `name ~ ^projects/PROJECT_ID/locations/asia-northeast2/backups/backup-scheduler.*`
    -   今回のバックアップ作成で命名されるバックアップ名の規則で検索します
    -   本来はタグをつけて正確に絞り込みたかったのですが、当時AlloyDBにはタグを設定することができなかったため、断念しました
-   `createTime < -P7D`
    -   現在時刻から7日より前に作成されたバックアップが削除対象となります
    -   参考：[gcloud topic filters  |  Google Cloud SDK  |  Google Cloud Documentation](https://cloud.google.com/sdk/gcloud/reference/topic/filters)

最終的に対象のバックアップIDを知りたかったため、 `--format="value(name.basename())"` を指定することで、 `backup-scheduler-YYYYMMDD-HH` の形式で出力します。

参考：[Google Cloud Platform Japan 公式ブログ: gcloud による出力情報のフィルタと整形](https://cloudplatform-jp.googleblog.com/2016/06/gcloud.html)

#### 削除対象が0件の場合は終了

削除対象がない場合は、後の削除処理が不要のため正常終了させます。

if \[ ${#delete\_backup\_ids\[@\]} \-eq 0 \]; then
    echo "削除対象のバックアップが見つかりませんでした。処理を終了します。"
    exit 0
fi

#### 各バックアップを削除

削除対象のバックアップがある場合は、ループ処理で各バックアップIDに対して `gcloud alloydb backups delete` を実行します。

echo "バックアップを削除します..."
for delete\_backup\_id in "${delete\_backup\_ids\[@\]}"; do
    echo "削除中: ${delete\_backup\_id}"
    gcloud alloydb backups delete "${delete\_backup\_id}" \--project\=PROJECT\_ID \--region\="asia-northeast2" \--quiet
done

echo "バックアップの削除が完了しました"

削除処理は対象が間違っていると取り返しがつかないことになるので、検証時は以下のように削除対象のIDの出力だけして、問題なさそうだったら実際の削除処理を実装する流れをとりました。

for delete\_backup\_id in "${delete\_backup\_ids\[@\]}"; do
    echo "削除中: ${delete\_backup\_id}"
    
    
done

## Cloud Scheduler ジョブ

実装したCloud Buildトリガーをどのタイミング実行するのか、Cloud Scheduler ジョブに設定します。

### 日時の指定

指定の日時は cronの形式で指定します。例えば、日本時間の毎日0時に取得したい場合は `0 0 * * *` になります。

参考：[cron ジョブの形式とタイムゾーン  |  Cloud Scheduler  |  Google Cloud Documentation](https://docs.cloud.google.com/scheduler/docs/configuring/cron-job-schedules?hl=ja)

### ターゲットタイプ

Cloud SchedulerジョブはターゲットタイプとしてHTTPエンドポイントを指定できます。このエンドポイントに先程設定したCloud Buildトリガーのエンドポイントを設定します。

Cloud Buildトリガーを実行するエンドポイントは以下の形式になります。

POST \[https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{triggerId}:run\](https://cloudbuild.googleapis.com/v1/projects/%7BprojectId%7D/triggers/%7BtriggerId%7D:run)

参考：[Method: projects.triggers.run  |  Cloud Build  |  Google Cloud Documentation](https://docs.cloud.google.com/build/docs/api/reference/rest/v1/projects.triggers/run)

また、Cloud Scheduler と HTTP ターゲットの間で認証を行うため、先程作成した「Cloud Schedulerジョブに付与するサービスアカウント」をジョブに設定する必要があります。

参考：[HTTP ターゲットで認証を使用する  |  Cloud Scheduler  |  Google Cloud Documentation](https://docs.cloud.google.com/scheduler/docs/http-target-auth?hl=ja#create-a-cloud-scheduler-job-that-uses-authentication)

## 最後に

今回は、AlloyDBのバックアップを定期的に別リージョンに作成・削除する仕組みについて、自前で実装する方法を紹介しました。

ただし、保守性やコストを考えると、これが最適な方法とは言えません。マネージドな機能が早くリリースされることを願いつつ、利用可能になり次第すぐに移行したいと考えています。

それまで待てず、別リージョンへの定期的なバックアップが必要な場合は、今回の実装を参考にしていただければ幸いです。

## We Are Hiring!

SmartHRではSREメンバーを絶賛募集中です！

プロダクトの成長を支える基盤づくりに興味がある方は、ぜひカジュアル面談でお話ししましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/smarthr/pages/98449)