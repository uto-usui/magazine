---
title: "AWS マルチアカウント環境からの Google Cloud フェデレーション設計 — AI時代に合わせた社内認証基盤づくり"
source: "https://tech.layerx.co.jp/entry/2026/01/30/152136"
publishedDate: "2026-01-30"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "pirox07"
---

## はじめに

LayerX Fintech 事業部から、三井物産デジタル・アセットマネジメント(以下、MDM) に出向している [piroshi](https://x.com/pirox_07) です。

AI 活用や業務自動化が当たり前になってきた今、データや処理はプラットフォームをまたいで動くことが増えています。特に「システム基盤はAWSで動かしつつ、社内業務は Google Workspace 前提」といった構成では、AWS 上のワークロードから Google Cloud(以下、GCP) や Google Workspace の API へ安全にアクセスしたい場面が自然に出てきます。

MDM でもそのニーズが顕在化しました。具体的には、共有ドライブの構成情報を定期的に取得して監査(権限・設定の棚卸し)を自動化したい、という要件があります。加えて、別のチームでは Google Drive 上のリソースにアクセスする業務ツール開発も並行して進んでいました。ここでチームごとに認証方式が増えていくと、長期鍵の配布・権限の肥大化・監査のしづらさといった問題が起きやすくなります。そこで、個別最適に寄せるのではなく、**安全で監査可能な共通のアクセス方式を用意する**ことを目標に設計を検討しました。

サービスアカウントキーを発行して AWS 側に置けば動きますが、長期鍵の配布・ローテーション・棚卸しは運用負荷が高く、漏えい時の影響も大きくなります。今回は [Workload Identity Federation(WIF)](https://docs.cloud.google.com/iam/docs/workload-identity-federation?hl=ja) を使い、静的キーを持たずに短命トークンでアクセスする構成を設計しました。

WIF を使った実装の情報は多く見つかりましたが、**AWS がマルチアカウント構成の場合にどう設計すべきか**について触れているものがなかなか見つからず、さらに、GCP のベストプラクティスに沿って**「WIF を専用プロジェクトに集約する」**構成を採ると、具体的にどう設計・運用が変わるのかイメージが湧きにくかったです。

この記事では、「AWS Organizations を使ったマルチアカウント環境」で、「GCP 側へ出ていく認証経路(入口)を運用・統制の都合で Security アカウントに集約」しつつ、「ワークロード単位で識別して最小権限を保つ」ためにどう設計したかをまとめます。検証時にハマったポイントとあわせて共有できればと思います。

なお、記事では AWS→GCP へのフェデレーションに焦点を当てています。Google Workspace API を操作する場合の Domain-Wide Delegation(DWD)設定については、ここでは扱いません。

### 前提となる制約(再掲)

-   AWS Organizations を使った**マルチアカウント戦略**を採用している
-   Google 側へ出ていく認証経路(入口)を、運用・統制の都合で **Security アカウントに集約**したい
-   そのうえで、**「ワークロード単位で識別して最小権限を付与」**を維持する

## 結論: 「入口」と「権限」を分けた 2 段階のアクセス制御

採用した構成は以下です。まず認証フローの概要を示します。

flowchart LR
    subgraph AWS\_Org\[AWS Organizations\]
        subgraph Workloads\[Workload Accounts\]
            WL\_A\[Workload Account A\]
            WL\_B\[Workload Account B\]
        end
        Security\[Security Account\]
    end

    subgraph GCP\_Org\[GCP Organization\]
        subgraph WIF\_Proj\[WIF 専用プロジェクト\]
            WIF\[WIF Pool/Provider\]
        end
        subgraph Service\_Projs\[サービスプロジェクト群\]
            SA\_A\[SA / Resources A\]
            SA\_B\[SA / Resources B\]
        end
    end

    WL\_A -->|1. Cross-Account AssumeRole| Security
    WL\_B -->|1. Cross-Account AssumeRole| Security
    Security -->|2. Token Exchange| WIF
    WIF -->|3. Impersonate| SA\_A
    WIF -->|3. Impersonate| SA\_B

Service Account(SA)の権限で GCP リソースにアクセスします。Google Workspace API を使う場合は、SA に Domain-Wide Delegation(DWD)を付与してユーザーとして操作する構成になります。

### 監査ログの取得ポイント

この構成では、認証フローの各ステップでログが取得できます。

ステップ

ログ

確認できること

AWS: AssumeRole

CloudTrail

どのロールがどのロールを AssumeRole したか

GCP: Token exchange

Cloud Audit Logs(WIF プロジェクト)

attribute\_condition の成否、どのフェデレーション ID がトークン交換したか

GCP: SA impersonation

Cloud Audit Logs(SA のプロジェクト)

どのフェデレーション ID がどの SA を impersonate したか

Workspace API

OAuth ログ、各サービス監査ログ(Drive 等)

Google Workspace へのアクセス状況

WIF 専用プロジェクトと SA のプロジェクトが分かれていても、それぞれのプロジェクトで Cloud Audit Logs が記録されるため、追跡が可能です。

### 設計思想: 2段階のアクセス制御

レイヤー

制御内容

役割

第1段階: Provider

`attribute_condition` で「受け入れる AWS 側の IAM ロール」を絞る

想定外のアカウント/ロールを入口で落とす

第2段階: Service Account

`principalSet` による IAM Binding で「どのロールがどの SA を impersonate できるか」を制御

ワークロード単位の権限分離(最小権限)

**principalSet とは**: WIF のフェデレーション ID(federated identity)を指定するための識別子です。属性に基づいて「どのフェデレーション ID に権限を付与するか」を定義します。

形式: `principalSet://iam.googleapis.com/projects/{PROJECT_NUMBER}/locations/global/workloadIdentityPools/{POOL_ID}/attribute.{ATTRIBUTE_NAME}/{ATTRIBUTE_VALUE}`

例: `principalSet://iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/aws-workload-id/attribute.aws_role/arn:aws:sts::111111111111:assumed-role/gcp-wif-workload-a-role`

この例では、`aws_role` 属性が `arn:aws:sts::111111111111:assumed-role/gcp-wif-workload-a-role`(= AWS の該当 IAM Role の ARN)に一致するフェデレーション ID に対して権限を付与します。

Pool に到達できても、SA への IAM Binding がなければフェデレーション ID は impersonate できません。

## 認証フローの概要

1.  Workload Account の実行ロール(IAM Role)から、Security Account 上の GCP Federation 用ロール(IAM Role)にクロスアカウント AssumeRole
2.  そのロールの AWS 認証情報で、WIF が必要とする署名付き GetCallerIdentity 相当の情報を作り、Google STS へトークン交換
3.  Provider の `attribute_condition` が true の場合のみ、トークン交換が成立
4.  SA に対する `roles/iam.workloadIdentityUser` の IAM Binding(`principalSet` でフェデレーション ID を指定)により、対象 SA を impersonate
5.  SA の権限で GCP リソース (必要なら DWD で Workspace API) にアクセス

**補足: WIF が識別する「AWS 側の ID」とは**

WIF が AWS 側の ID を識別する際に使うのは、STS の `GetCallerIdentity` が返す ARN です。assumed-role の場合、`arn:aws:sts::{ACCOUNT_ID}:assumed-role/{ROLE_NAME}/{SESSION_NAME}` の形式になります。

セッション名は実行ごとに変わるため、WIF の Pool 側の設定(`attribute_mapping`) でセッション名を除去した ARN(`arn:aws:sts::{ACCOUNT_ID}:assumed-role/{ROLE_NAME}`)を属性として使用します。

ARN のうち、ユーザー側でコントロールできるのは **IAM Role の名前**です。そのため、命名規則を統一することで `attribute_condition` や `principalSet` での制御がしやすくなります。

## 設計で検討した 5 つのポイント

### 1\. GCP プロジェクト構成: 既存のプロジェクトを利用 vs 専用プロジェクトを新設

選択肢

評価

既存プロジェクトに WIF リソースを追加

❌ 却下

**WIF 専用プロジェクトを新規作成**

✅ 採用

-   [GCP のベストプラクティス](https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation?hl=ja)で「専用のプロジェクトを使用して Workload Identity プールとプロバイダを管理する」ことが推奨されている
-   セキュリティ境界の明確化(他リソースと分離)
-   WIF の管理権限(誰が Pool/Provider を触れるか)を分離・集中管理できる
-   一貫した attribute\_mapping や attribute\_condition を適用できる
-   外部からのフェデレーション経路を一箇所に集約することで、監視・監査すべきポイントが明確になり、セキュリティ上の攻撃対象領域を限定できる

WIF を専用プロジェクトに集約し、実際のアクセス先となる SA が別のプロジェクトにあってもアクセスできるのかが懸念でしたが、SA に対して `roles/iam.workloadIdentityUser` を付与する IAM Binding でクロスプロジェクトの impersonation が可能でした。

`common-wif` のような命名で、一元管理用の専用プロジェクトを用意しました。

### 2\. AWS IAM Role 構成: 単一共有 vs ワークロード別分離

この設計では、AWS 側に 2 種類の IAM Role が登場します。

ロールの種類

配置先

役割

**実行ロール**

Workload Account

Lambda や ECS タスクなど、ワークロードが実行時に使用するロール。ワークロードごとに異なる。

**GCP Federation 用ロール**

Security Account

GCP への認証(WIF)に使用するロール。実行ロールから AssumeRole される。

ここで検討するのは、**Security Account の GCP Federation 用ロールを、全ワークロードで共有するか、ワークロードごとに分けるか**です。

選択肢

評価

全ワークロードで共有する単一の GCP Federation 用ロール

❌ 却下

**ワークロードごとに個別の GCP Federation 用ロールを作成**

✅ 採用

前提として、各ワークロードが必要とする権限(AWS 側のアクセス先リソースや、GCP 側で取得したい SA の権限)が異なる場合、実行ロールをワークロードごとに分けるのが自然です。

しかし、入口を Security Account に集約する設計では、GCP から見えるのは Security Account 側の「GCP Federation 用ロール」です(厳密には、識別できるのは STS ARN で、そのなかに IAM Role Name が含まれます)。GCP 側で利用できる属性は GetCallerIdentity 由来の情報(`account/arn/userid` など)で、実質「最後に AssumeRole した AWS 側のロール」を元に制御することになります。

よって、**ワークロード単位の分離を GCP 側で実現するには、GCP Federation 用ロールもワークロードごとに分ける必要があります**。

#### AWS(Security Account): GCP Federation 用ロール(例: workload-a)

resource "aws\_iam\_role" "gcp\_wif\_workload\_a" {
  name               = "gcp-wif-workload-a-role"
  assume\_role\_policy = data.aws\_iam\_policy\_document.trust\_from\_workload\_a\_exec.json
}

data "aws\_iam\_policy\_document" "trust\_from\_workload\_a\_exec" {
  statement {
    effect  = "Allow"
    actions = \["sts:AssumeRole"\]

    principals {
      type        = "AWS"
      identifiers = \[
        "arn:aws:iam::222222222222:role/workload-a-exec-role"
      \]
    }
  }
}

#### AWS(Workload Account A): 実行ロールに AssumeRole 権限を付与

data "aws\_iam\_policy\_document" "allow\_assume\_gcp\_wif" {
  statement {
    effect    = "Allow"
    actions   = \["sts:AssumeRole"\]
    resources = \["arn:aws:iam::111111111111:role/gcp-wif-workload-a-role"\]
  }
}

resource "aws\_iam\_role\_policy" "workload\_a\_exec\_assume\_gcp\_wif" {
  name   = "assume-gcp-wif"
  role   = aws\_iam\_role.workload\_a\_exec.name
  policy = data.aws\_iam\_policy\_document.allow\_assume\_gcp\_wif.json
}

### 3\. attribute\_condition: 完全一致 vs パターンマッチ

まず、`attribute_condition` と `attribute_mapping` の役割を整理します。

`attribute_condition` は **WIF Provider に設定する CEL(Common Expression Language)式**で、「この Pool にアクセスできるフェデレーション ID」をフィルタリングします。条件に合致しないフェデレーション ID はトークン交換を拒否されます。

条件式の中では `attribute_mapping` で定義した属性を参照できます。`attribute_mapping` は外部 IdP(AWS)から受け取る情報(assertion)を GCP 側の属性にマッピングする設定で、Provider に定義します([公式ドキュメント](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds?hl=ja#mappings-and-conditions)の例を参考にしています)。

例えば、AWS から受け取る `assertion.arn` が以下の値だった場合:

arn:aws:sts::111111111111:assumed-role/gcp-wif-workload-a-role/session123

`attribute_mapping` でセッション名(`session123`)を除去し、`attribute.aws_role` には以下が格納されます:

arn:aws:sts::111111111111:assumed-role/gcp-wif-workload-a-role

これにより、実行ごとに変わるセッション名に依存せず、IAM Role 単位での制御が可能になります。

では、`attribute_condition` でどのように AWS 側のロールをフィルタするかを検討します。

選択肢

例

評価

Role ARN を完全一致で列挙

\`== "{workload-a の ARN}"

| == "{workload-b の ARN}"\` | ❌ 却下

**prefix でパターンマッチ**

`startsWith("...assumed-role/gcp-wif-")`

✅ 採用

完全一致で列挙する方法では、ワークロード追加のたびに Provider の `attribute_condition` を更新する必要があります。`gcp-wif-` という prefix でのパターンマッチなら、命名規則に従う限り `attribute_condition` の変更は不要です。

採用した `attribute_condition` の例：

attribute.aws\_role.startsWith('arn:aws:sts::111111111111:assumed-role/gcp-wif-')

### 4\. principalSet: Pool 全体許可 vs 個別 Role 指定

`principalSet` は **Service Account に対して `roles/iam.workloadIdentityUser` を付与する IAM Binding の `member` として指定する、フェデレーション ID の識別子**に該当します。「どのフェデレーション ID がこの SA を impersonate(権限借用)できるか」を制御します。

指定方法には粒度の違いがあり、Pool 全体を許可するか、特定の属性値(assumed-role ARN)で絞り込むかを選べます。

選択肢

評価

`principalSet://.../{pool}/*`(Pool 全体許可)

❌ 却下

**`principalSet://.../attribute.aws_role/{assumed-role ARN}`(個別指定)**

✅ 採用

Pool 全体許可では、Workload A 用の GCP Federation ロールが Workload B の SA を impersonate できてしまい、ワークロード間の分離が壊れます。個別指定なら「この AWS ロールはこの SA だけ」という 1:1 の対応を強制できます。

## GCP 側 Terraform(Pool / Provider / IAM Binding)

### Workload Identity Pool / Provider

resource "google\_iam\_workload\_identity\_pool" "aws\_pool" {
  project                   = "my-wif-project"
  workload\_identity\_pool\_id = "aws-workload-id"
  display\_name              = "AWS Workload Identity Pool"
  description               = "Federation from AWS Security Account"
}

resource "google\_iam\_workload\_identity\_pool\_provider" "aws\_provider" {
  project                            = "my-wif-project"
  workload\_identity\_pool\_id          = google\_iam\_workload\_identity\_pool.aws\_pool.workload\_identity\_pool\_id
  workload\_identity\_pool\_provider\_id = "security-account"
  display\_name                       = "AWS Security Account Provider"

  aws {
    account\_id = "111111111111"  
  }

  attribute\_mapping = {
    "google.subject" = "assertion.arn"
    
    "attribute.aws\_role" = "assertion.arn.contains('assumed-role') ? assertion.arn.extract('{account\_arn}assumed-role/') + 'assumed-role/' + assertion.arn.extract('assumed-role/{role\_name}/') : assertion.arn"
  }

  
  attribute\_condition = "attribute.aws\_role.startsWith('arn:aws:sts::111111111111:assumed-role/gcp-wif-')"
}

### Service Account と IAM Binding(workload-a 例)

resource "google\_service\_account" "workload\_a" {
  project      = "my-service-project"
  account\_id   = "workload-a"
  display\_name = "Service Account for workload-a"
}

resource "google\_service\_account\_iam\_binding" "workload\_a\_wif\_user" {
  service\_account\_id = google\_service\_account.workload\_a.name
  role               = "roles/iam.workloadIdentityUser"

  members = \[
    "principalSet://iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/aws-workload-id/attribute.aws\_role/arn:aws:sts::111111111111:assumed-role/gcp-wif-workload-a-role"
  \]
}

## 運用への考慮

### 新ワークロード追加時の担当タスク

-   管理者:
    
    -   AWS(Security): GCP Federation 用 IAM Role を追加
    -   GCP: ワークロード専用 SA を作成し、必要最小限の権限を付与
    -   GCP: SA に `roles/iam.workloadIdentityUser` の IAM Binding(`principalSet` で Federation 用ロールを指定)
-   開発者:
    
    -   AWS(Workload): 実行ロールに GCP Federation 用ロールへの AssumeRole 権限を付与

管理者側の GCP 作業(SA 作成 + IAM Binding)は以下のような Terraform で管理できます：

resource "google\_service\_account" "workload\_a" {
  project      = "my-wif-project"
  account\_id   = "workload-a"
  display\_name = "Service Account for workload-a"
}

resource "google\_service\_account\_iam\_binding" "workload\_a\_wif\_user" {
  service\_account\_id = google\_service\_account.workload\_a.name
  role               = "roles/iam.workloadIdentityUser"

  members = \[
    
    "principalSet://iam.googleapis.com/${google\_iam\_workload\_identity\_pool.aws\_pool.name}/attribute.aws\_role/arn:aws:sts::${data.aws\_caller\_identity.security.account\_id}:assumed-role/${aws\_iam\_role.gcp\_wif\_workload\_a.name}"
  \]
}

命名規則に従う限り、Provider の `attribute_condition` は基本的に触りません。

### 補足: 管理権限もセットで設計する

WIF の設計とあわせて、以下のようなガードレールも検討しておくと安心です。

-   [サービスアカウントキー作成禁止(組織ポリシー)](https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts)を有効化して、長期鍵が増えないようにする
-   WIF の Pool/Provider を勝手に作られないように、権限や[組織ポリシー(カスタム制約)](https://cloud.google.com/iam/docs/workload-identity-federation-custom-constraints)で縛る

## ハマりポイント・学び

この設計を検証する中で苦労した点を紹介します。

### 1) コンポーネントが多く、トラブルシューティングが難しい

WIF は AWS と GCP を跨ぎ、IAM Role, STS, Provider, Pool, SA など関連するコンポーネントが多いです。問題が発生した場合は、推測ではなくログをもとに原因を切り分けていくのが確実です。

コンポーネント

ログ

見えるもの

AWS: AssumeRole

CloudTrail

どのロールがどのロールを AssumeRole したか

GCP: Token exchange

Cloud Audit Logs(iam.googleapis.com)

attribute\_condition の成否など

GCP: SA impersonation

Cloud Audit Logs(iam.googleapis.com)

どのフェデレーション ID がどの SA を impersonate したか

Workspace API

管理コンソール監査ログ

DWD など Workspace 側の監査

### 2) AssumeRole 時の環境変数の扱いに注意(Lambda など)

例えば Lambda で Google Cloud クライアントライブラリ(Python の `google-auth`、Node.js の `google-auth-library` など)を使用する場合、ライブラリは AWS 認証情報を環境変数(`AWS_ACCESS_KEY_ID` など)から取得します。

Lambda では起動時に実行ロールの認証情報が環境変数にセットされています。AssumeRole 後の認証情報で環境変数を上書きすると、以降の AWS SDK 呼び出しも AssumeRole 後の認証情報で動作してしまいます。つまり、元の実行ロールに付与していた権限が使えなくなります。

今回は `try-finally` で環境変数を書き戻すことで対処しました。(これがベストかは悩ましいところです。)

const prev = { accessKeyId: process.env.AWS\_ACCESS\_KEY\_ID,  };
try {
  process.env.AWS\_ACCESS\_KEY\_ID = assumedCreds.AccessKeyId;
  
} finally {
  process.env.AWS\_ACCESS\_KEY\_ID = prev.accessKeyId; 
}

## まとめ

-   入口(Security Account)と権限(GCP 側の SA)を分け、WIF を専用プロジェクトに集約すると、マルチアカウントでも運用しやすい
-   Provider は「受け入れ条件」、IAM Binding は「実際の権限」と役割分担すると設計が整理できる
-   `attribute_mapping` と `principalSet` でワークロードを識別し、最小権限の原則を守れる
-   ログ(CloudTrail / Cloud Audit Logs / Workspace 監査ログ)を前提に、切り分け可能な形にしておく

## 参考資料

-   [Workload Identity Federation | Google Cloud](https://cloud.google.com/iam/docs/workload-identity-federation)
-   [Configure Workload Identity Federation with AWS or Azure | Google Cloud](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-clouds?hl=ja#mappings-and-conditions)
-   [Download credential configuration and grant access | Google Cloud](https://cloud.google.com/iam/docs/workload-download-cred-and-grant-access)(principalSet の形式と使用方法)
-   [Domain-Wide Delegation | Google Workspace Admin Help](https://support.google.com/a/answer/162106)
-   [Restricting service account usage | Google Cloud](https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts)
-   [Custom organization policies for WIF | Google Cloud](https://cloud.google.com/iam/docs/workload-identity-federation-custom-constraints)
-   [サービス アカウント認証用のロール | Google Cloud](https://cloud.google.com/iam/docs/service-account-permissions?hl=ja)(`roles/iam.workloadIdentityUser` の説明)
-   [許可ポリシーについて | Google Cloud](https://cloud.google.com/iam/docs/policies?hl=ja)(IAM Binding の説明)

## おわりに

今回は、マルチアカウントな AWS 環境から GCP/Google Workspace に安全にアクセスするために、Workload Identity Federation をどう設計したかをまとめました。運用はこれからですが、実際に回し始めると設計時点では見えなかった運用上の課題やメリット、勘所も出てくるはずです。このあたりは、運用で得た知見として別途まとめて記事にしたいと思います。

MDM のコーポレートシステム部では、こうした認証・認可や監査性を仕組みで支えつつ、社内の開発や業務が安心して速く回る土台を作っています。  
このあたりの領域に興味がある方、ぜひ一緒にやりましょう!!

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/87524)

[open.talentio.com](https://open.talentio.com/r/1/c/layerx/pages/98655)