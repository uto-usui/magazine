---
title: "SnowflakeのRow Access Policyをdbtで漏れなく適用する"
source: "https://tech.layerx.co.jp/entry/dbt-snowflake-rap-enforcement"
publishedDate: "2026-08-14"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "civitaspo"
---

こんにちは。バクラク事業部 BizOps部 データグループの[@civitaspo](https://x.com/civitaspo)です。

この記事では、Snowflake の Row Access Policy を dbt の実行フローの中で適用し続けるために作った dbt package、[dbt-snowflake-rap-enforcement](https://github.com/civitaspo/dbt-snowflake-rap-enforcement) を紹介します。

[github.com](https://github.com/civitaspo/dbt-snowflake-rap-enforcement)

以前紹介した [dbt-authorized-models](https://tech.layerx.co.jp/entry/dbt-authorized-models) が dbt モデル間の参照可否を検査する package だった[1](#fn:1)のに対し、今回は Snowflake の行レベルアクセス制御を dbt モデルの定義どおりに維持するための package です。

## はじめに

Row Access Policy（以下、RAP）は Snowflake の行レベルアクセス制御機能です。テーブルやビューにポリシーを付与すると、クエリ実行時にポリシー本体の条件式が行ごとに評価され、条件を満たす行だけが返されます。マルチテナントのデータ基盤であれば、「同じテーブルでも、参照者が属するテナントの行しか見せない」という制御を実装できます。 [docs.snowflake.com](https://docs.snowflake.com/en/user-guide/security-row-intro)

dbt-snowflake には `row_access_policy` config があり、モデルに書いておくとテーブル作成時に `CREATE TABLE ... WITH ROW ACCESS POLICY` の形でポリシーが付与されます。しかし、この built-in の仕組みだけでは「dbt で定義した RAP が Snowflake 上で常に適用されている」という状態を維持できませんでした。 [docs.getdbt.com](https://docs.getdbt.com/reference/resource-configs/snowflake-configs?version=2.0#setting-row-access-policies)

本記事では、まず built-in の仕組みで維持できないケースを3つに分けて説明し、その後に dbt-snowflake-rap-enforcement の使い方を説明します。なお、RAP のポリシー本体（条件式）の設計や、ポリシーオブジェクト自体の作成・管理は本記事では扱いません。

## built-in の row\_access\_policy config だけでは維持できない3つのケース

### ① テーブルを作り直さない materialization には適用されない

built-in の `row_access_policy` config がポリシーを付与するのは、`CREATE` またはテーブル置換のタイミングだけです。テーブルの作り直しが発生しない実行では何も起きません。

典型例は incremental モデルです。2回目以降の実行は既存テーブルへの `INSERT` / `MERGE` になるため、途中から config を追加しても full-refresh するまでポリシーは付与されません。また、すでに存在するテーブルに後から RAP を定義した場合や、運用作業で一時的にポリシーを外してそのまま戻し忘れた場合も、dbt を何回実行しても定義と実態はズレたままになります。

この挙動は実装側でも明言されており、仕様です。`row_access_policy` config の元になった feature request（[dbt-labs/dbt-adapters#697](https://github.com/dbt-labs/dbt-adapters/issues/697)）で、メンテナが「DDL の一部として付与されるため、incremental テーブルでは作成時または `--full-refresh` 時にのみ追加される」と回答しています。

[github.com](https://github.com/dbt-labs/dbt-adapters/issues/697)

### ② 定義を変更しても、Snowflake 側の付与は追従しない

`row_access_policy` config を別のポリシーに変更しても、既存テーブルに付いている古いポリシーは剥がれません。config を削除した場合も同様に、Snowflake 側の付与は残り続けます。

これは1つ目のケースと同じ仕様に起因します。built-in の config はポリシーを `CREATE OR REPLACE` の DDL に `WITH ROW ACCESS POLICY` として組み込む形でしか扱わないため、テーブルを作り直さない限り、変更も削除も反映されません。付け替えや削除に必要な `ALTER TABLE ... DROP ROW ACCESS POLICY ...` を発行する仕組み、つまり定義と実態の差分を検出して収束させる仕組みは存在しません。

### ③ RAP 付きモデルの下流に、RAP の適用を強制できない

dbt でモデルを `ref()` して新しいモデルを作ると、そのモデルに上流の RAP は継承されません。RAP は付与されたテーブルやビューを守る機能であり、そこから派生したモデルまでは守らないためです。

つまり、例えばテナント分離されたテーブルの下流に RAP を定義していないテーブルを作ると、上流のテーブルでは保護されていた行が保護なしで複製されます。dbt にも Snowflake にも「このモデルの下流には RAP を必ず定義せよ」を強制する機能はないため、コードレビューでの目視に頼ることになります。これは dbt-authorized-models のときと同じ構図で、データ基盤の利用者や開発者が増えるほど、人間の注意だけで守り続けるのは難しくなります。

## dbt-snowflake-rap-enforcement で定義と実態を一致させる

[github.com](https://github.com/civitaspo/dbt-snowflake-rap-enforcement)

dbt-snowflake-rap-enforcement は、この3つの課題に対応する dbt package です。2つの hook で構成されます。

-   apply（`on-run-end`）: 実行対象のモデル・スナップショットについて Snowflake 上の付与状態を取得し、`row_access_policy` の定義と一致するように `ALTER` を発行します。定義を削除したモデルに付与が残っていれば `DROP` します
-   check（`on-run-start`）: dbt の graph 全体を検査し、RAP 定義モデルの下流が要求を満たさない場合に実行を失敗させます

この package は RAP のポリシーオブジェクト自体は作りません。ポリシー付与状態の管理と、依存関係の検査だけを担当します。ポリシー本体は dbt 外の管理に置いたまま使えます。

## 使い方

### package を追加して hook を設定する

まず `packages.yml` に package を追加します。

packages:
  \- git: "https://github.com/civitaspo/dbt-snowflake-rap-enforcement.git"
    revision: v0.4.2

次に、root project の `dbt_project.yml` に hook と設定を追加します。

on-run-start:
  \- "{{ dbt\_snowflake\_rap\_enforcement.check\_downstream\_row\_access\_policies() }}"

on-run-end:
  \- "{{ dbt\_snowflake\_rap\_enforcement.apply\_row\_access\_policies() }}"

vars:
  dbt\_snowflake\_rap\_enforcement:
   
    passthrough\_materializations: \["view", "ephemeral"\]
    exclude\_resource\_types: \["test", "analysis"\]
   
    apply\_authoritatively: true

保護したいモデルには、dbt-snowflake の `row_access_policy` config をそのまま書きます。下流への強制ルールは `meta.row_access_policy_enforcement` に書きます。

{{
  config(
    materialized='incremental',
    row\_access\_policy='governance.row\_access\_policies.tenant\_policy on (tenant\_id)',
    meta={
      'row\_access\_policy\_enforcement': {
        'enforce\_policy': 'inherit',
        'allow\_without\_row\_access\_policy': \[
          'mart\_public\_counts'
        \]
      }
    }
  )
}}

select ...

### apply: 定義と付与状態の差分を検出し、 ALTER する

apply（`on-run-end`）は次の順で動きます。

1.  実行対象（`run` / `build` / `snapshot` / `retry` では現在の selection、`run-operation` では project graph 全体）のモデル・スナップショットを対象にする。`apply_authoritatively: true` のときは、`row_access_policy` の定義を削除したモデルも DROP の判定対象に含まれる
2.  `information_schema.tables` で対象リレーションの存在を確認する
3.  存在するリレーションについて `POLICY_REFERENCES` で、現在付与されているポリシーと対象カラムを取得する
4.  定義と付与状態の差分に応じて `ALTER` を発行する

差分と発行される DDL の対応は次のとおりです。

付与状態

発行される DDL

何も付与されていない

`ADD ROW ACCESS POLICY`

定義と同じポリシー・同じカラム

なし（no-op）

定義と異なるポリシーが付与されている

`DROP ROW ACCESS POLICY ..., ADD ROW ACCESS POLICY ...`

複数のポリシー付与が検出された

`DROP ALL ROW ACCESS POLICIES` の後に `ADD`

定義を削除したのにポリシーが付与されたまま

`DROP ROW ACCESS POLICY`

この reconcile は実行のたびに走るため、incremental のようにテーブルを作り直さない materialization でも、定義どおりの付与が維持されます。運用作業でポリシーが外れた場合も、モデルから定義を削除した場合も、次の `dbt run` で定義どおりの状態に収束します。

`apply_authoritatively: false` にすると、何も付与されていない場合の `ADD` だけを行い、定義と異なる付与や定義を削除したモデルの付与は警告ログに残して変更しません。既存環境への導入初期に、意図しない `DROP` を避けたい場合はこちらから始めて、警告の内容を確認してから `true` に切り替えるのが安全です。

### check: 下流の定義漏れを検出し、実行を止める

check（`on-run-start`）は dbt の graph を走査し、RAP を定義したモデルから到達できる下流の terminal（実体テーブルを作るモデル・スナップショット）が、上流の要求を満たしているかを検査します。違反があると、違反ごとに参照元・参照先・理由がログ出力され、hook を実行するコマンド（`dbt run` / `build` / `compile` など）が失敗します。

上流側の要求は `enforce_policy` で指定します。

値

下流 terminal への要求

`inherit`（デフォルト）

上流と同じポリシー FQN を定義していること

`any`

いずれかの RAP を定義していること

`explicit`

`required_policy` に指定したポリシー FQN を定義していること

graph の走査は2つの設定で調整できます。

-   `passthrough_materializations`: 走査を通過させる materialization を指定します（デフォルトは `view` と `ephemeral`）。ここには、上流の RAP が透過的に適用される materialization を指定します。
    -   view や ephemeral などの materialization は行データを保持せず、クエリ実行時に上流のテーブルを参照するため、上流の RAP による行フィルタがそのまま適用されます。そのため、これらでは RAP を定義しなくても保護が切れず、走査は通過してさらに下流の終端まで進みます。
    -   ただし、passthrough なモデル自身が RAP を定義している場合は、そこが新たな境界になります
-   `allow_without_row_access_policy`: 上流モデル側で、「RAP 定義なし」を許可する下流を指定します。モデル名・正規表現・`'*'` が使えます。集計により行レベルの保護が不要になる公開用モデルなどを例外にするための設定です

### 導入時の注意点

-   Snowflake の制約として、1つのリレーションに付与できる RAP は1つだけです。複数の制御ルールが必要な場合は、ポリシー本体の条件式の中で合成してください
-   apply を実行する dbt role には、対象オブジェクトの ownership（または schema レベルの `APPLY ROW ACCESS POLICY` 権限）と、ポリシーへの `APPLY` 権限が必要です。ポリシーオブジェクトは事前に存在している必要があります
-   `POLICY_REFERENCES` の可視性は `ALTER` より厳しく、権限が足りないとエラーになるか結果が空になります。結果が空の場合、planner は付与なしと判断して `ADD` を試みます
-   対象の識別子は unquoted な Snowflake identifier（大文字小文字を区別しない）のみサポートします。`quote_identifiers` を使った大文字小文字を区別するリレーションには使えません

## おわりに

dbt-snowflake の `row_access_policy` config はテーブル作成時にしかポリシーを付与しないため、incremental モデルや既存テーブルでは定義と実態がズレたままになり、ポリシーの付け替えや削除にも追従できませんでした。また、RAP 付きモデルの下流に RAP の定義を強制する仕組みは dbt にも Snowflake にもありませんでした。

dbt-snowflake-rap-enforcement は、`on-run-end` の reconcile で定義と付与状態を一致させ、`on-run-start` の graph 検査で下流の定義漏れを実行エラーとして検出します。RAP を使った行レベルの保護を、一度きりの DDL ではなく、通常の `dbt run` / `dbt build` の一部として維持し続けるための package です。

[dbt-authorized-models](https://tech.layerx.co.jp/entry/dbt-authorized-models) による参照可否の検査と組み合わせることで、「どのモデルを参照してよいか」と「保護されたデータが下流でも保護され続けるか」の両方を、コードと CI で守れるようになります。

## 補足: tag-based な RAP 管理が public preview になりました

2026年7月21日に、tag-based なデータ保護ポリシーが public preview になりました。

[docs.snowflake.com](https://docs.snowflake.com/en/release-notes/2026/other/2026-07-21-tag-based-policies-preview)

RAP を含む4種類のポリシー（aggregation / row access / projection / join）を tag に割り当てておくと、その tag が付与されたオブジェクトに自動でポリシーが適用されます。

この方式では、ポリシーの付与管理を Snowflake 側の tag に寄せられます。dbt 側は [dbt-tags](https://github.com/infinitelambda/dbt-tags) package などで tag の付与だけを管理すれば、本記事で説明した RAP の apply を使わなくても運用できるようになります。

[github.com](https://github.com/infinitelambda/dbt-tags)

ただし、tag が付いていないオブジェクトは保護されないため、下流に複製されたテーブルへの tag の付け忘れを検知する仕組み、つまり本記事の3つ目の課題に相当する検査は引き続き必要です[2](#fn:2)。public preview の動向を追いつつ、安定したら移行を検討する予定です。

## We are hiring 🔥

LayerX では、Snowflake や dbt を活用しながら、事業と AI/ML 活用を支えるデータ基盤をつくっています。Production-Ready な AI 開発をサポートするためのデータ基盤開発、時系列データ処理、リアルタイムデータパイプラインの構築などに興味がある方、そして、データ基盤を事業成長のドライバーだと信じて止まない方は、ぜひ一緒にチャレンジしましょう!

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/61470) [open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/77873)

また、2026/09/03（木）に「Bet AI Day 2026」を開催します！ LayerXの各領域からエキスパートが登壇し、私たちが日々の試行錯誤から得た「AIエージェント前提の業務設計」のリアルな知見や実践、精度高く積み上げた課題を持ち寄り、AIエージェントの実践知を共有するカンファレンスとなっております。今年度はオンラインでも開催します。以下リンクから参加登録をお待ちしております！

[layerx.connpass.com](https://layerx.connpass.com/event/399169/)

* * *

1.  [https://tech.layerx.co.jp/entry/dbt-authorized-models](https://tech.layerx.co.jp/entry/dbt-authorized-models)[↩](#fnref:1)
2.  tag propagation の仕組みはありますが、柔軟な制御が難しい。[↩](#fnref:2)