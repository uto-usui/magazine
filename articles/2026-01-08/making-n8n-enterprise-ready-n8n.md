---
title: "Making n8n Enterprise-Ready: 企業向けn8nの導入と運用の取り組み"
source: "https://engineering.mercari.com/blog/entry/20251211-6fe0bc0838/"
publishedDate: "2025-12-12"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。JB SREの @T です。  
この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の12日目の記事です。

弊社ではAI Workflow Platformとして[n8n](https://n8n.io/)を導入しました。  
概要や背景についての詳細は、前日のISSAさんによる「[理想の Workflow Platform という“聖杯”に、n8n でついに手が届くかもしれない](https://engineering.mercari.com/blog/entry/20251211-cf3b67a5a7/ "理想の Workflow Platform という“聖杯”に、n8n でついに手が届くかもしれない")」の記事で紹介されていますので、そちらもご覧ください。  
本記事では、n8n Enterprise Edition を社内導入するにあたり、システム面で対応した内容について、いくつかご紹介します。

## n8nを弊社基準のSecurity、ガバナンスに適合させるための挑戦

チームで、あるいは全社規模で自動化ツールを展開しようとするとき、ScalabilityやSecurity、ガバナンスといった壁に突き当たった経験はありませんか？  
n8nは非常に柔軟で強力なAI Workflow Engineですが、それを数百人規模の組織で安全かつ安定して運用するためには、デフォルトの状態から一歩進んだ設計と工夫が必要です。  
本記事では、私たちがn8nを単なる便利ツールから、信頼性の高い「AI Workflow Platform」へと進化させるために実施した具体的な取り組みをご紹介します。 もしかすると、「n8nはここまで拡張・カスタマイズできるのか」という、Enterprise利用における柔軟性の高さを再発見していただけるかもしれません。

## なぜEnterprise Editionだったのか？

まず、私たちが直面した最初の選択は「[Community Edition（CE）](https://docs.n8n.io/hosting/community-edition-features/)か、[Enterprise Edition](https://n8n.io/enterprise/)か」でした。  
「Workflow Engine自体は同じコードベースなのだから、無償のCEで十分ではないか？」 そう考える方も多いでしょう。実際、私たちも最初はそう考えました。しかし、組織で利用するPlatformとしてn8nを捉え直したとき、Enterprise Editionを選択する必然性が見えてきました。 CEとEnterprise Editionの決定的な違いは、Workflow機能そのものではなく、**Team collaboration**、**Security**、**Scalability**といった「周辺機能」にあります。

-   **Team collaboration**: CEではWorkflowはOwner1人が属人的に運用し、個々のユーザーが限られた権限の中、パーソナルな空間で使用する設計思想が感じ取れます。一方、Enterpriseでは[Projects](https://docs.n8n.io/user-management/rbac/projects/)機能により、チーム単位でのWorkflow共有や、[RBAC (Role-Based Access Control)](https://docs.n8n.io/user-management/rbac/role-types/) によるきめ細かな権限管理が可能になります
-   **Security**: 企業導入の必須要件となりがちな[SSO](https://docs.n8n.io/hosting/securing/set-up-sso/) (SAML/OIDC)や、HashiCorp Vaultなどの外部Secret store連携はEnterpriseのみの機能です
-   **Scalability**: 大規模なトラフィックを捌くための[Multi-main mode](https://docs.n8n.io/hosting/scaling/queue-mode/#configuring-multi-main-setup)や、Databaseを肥大化させないための[Binary data](https://docs.n8n.io/data/binary-data/)の外部ストレージ保存（S3等）もEnterpriseがサポートしています

単にWorkflowを動かすだけならCEで十分です。しかし、私たちが目指したのは、属人化を防ぎ、監査可能性を担保し、全社規模で安心して利用できる「基盤」でした。その実現には、Enterprise Editionが提供する、特にSecurityとガバナンスに関わる機能群が不可欠だったのです

## Enterprise導入を支えるn8nのシステム構成

私たちはn8nをGoogle Cloud上にSelf-hostingしています。 Enterprise水準のScalabilityとSecurityを確保するために、以下のような構成を採用しました。

![Google Cloud architecture diagram for n8n enterprise](https://storage.googleapis.com/prd-engineering-asset/2025/12/c9b5160a-image4.png)

### ComputeとNetwork

-   **Compute**: **Cloud Run**を採用し、Serverlessならではの運用負荷の低さとScalabilityを享受しています
-   **Network**: [**Direct VPC Egress**](https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc)と[**Serverless NEG**](https://docs.cloud.google.com/load-balancing/docs/https/setting-up-https-serverless)を利用し、private IPのみを持つセキュアな構成を実現しています

### データ永続化とGCSの活用

Cloud Runの一時ディスクはインスタンス再起動で消えてしまうため、GCS (Google Cloud Storage) をマウントし、以下のデータを永続化しています。

-   [**Binary data**](https://docs.n8n.io/data/binary-data/): n8nの[`external-storage`](https://docs.n8n.io/hosting/scaling/external-storage/)機能を使い、Workflowで扱うファイルの実体をDBではなくGCSに保存しています
-   [**Community node**](https://docs.n8n.io/integrations/community-nodes/installation/manual-install/): 通常、n8nのCommunity nodeはGUIから簡単にインストールできますが、Cloud Run環境では永続化のためにマウントしたGCSへインストールする必要があります。 しかし、GUI上で直接インストールを試みると、GCSのマウントに使用しているgcsfuseの制約により、下記のエラーが発生し、正常に完了しませんでした。
    
    ```
    writes will fall back to staged writes due to err: cant allocate any block as global max blocks limit is reached
    ```
    
    本来であれば [`--write-global-max-blocks`](https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/cli-options#write-global-max-blocks) optionでブロック制限を緩和すべきところですが、[Cloud Runのvolume mount](https://docs.cloud.google.com/run/docs/configuring/services/cloud-storage-volume-mounts)ではこのoptionがサポートされていませんでした。 そこで回避策として、GitHub Actions上で`npm install`を実行し、生成されたfile群をGCSにsyncさせ、n8n起動時にそれを読み込ませるという運用フローを採用しています  
    ![How to install Community node to n8n enterprise](https://storage.googleapis.com/prd-engineering-asset/2025/12/223888df-image3.png)
    
-   [**External Hook**](https://docs.n8n.io/embed/configuration/#backend-hooks): 後述するガバナンス用のスクリプトもGCSに配置しています

### [Cloud Run External Metrics Autoscaling (CREMA)](https://github.com/GoogleCloudPlatform/cloud-run-external-metrics-autoscaling) によるWorkerのAutoscale

特筆すべき工夫として、[Worker pools](https://docs.cloud.google.com/run/docs/deploy-worker-pools)のScalability確保があります。  
「Cloud RunのAutoscale」といえば、CPU使用率やリクエスト数を基準にするのが一般的でしょう。しかし、n8nのWorkerのような非同期jobを処理するworkloadにおいては、それらの指標だけでは負荷（jobの滞留状況）を正確に反映できない場合があります。

![Cloud Run External Metrics Autoscaling(CREMA)](https://storage.googleapis.com/prd-engineering-asset/2025/12/1a8cc820-image1.png)

そこで私たちは、[**Cloud Run External Metrics Autoscaling (CREMA)**](https://github.com/GoogleCloudPlatform/cloud-run-external-metrics-autoscaling) の導入を検討しています。これは[KEDA](https://keda.sh/)を利用してDataDogなどの外部metricsを元にCloud Runをスケールさせる仕組みです。 これにより、n8nのQueueの深さなど、アプリケーション固有のmetricsに基づいた最適なAutoscalingを実現しようとしています。

## n8nを統制のとれたPlatformへ昇華させる機能群

システム構成に加え、n8nの機能をフル活用して、ガバナンスと利便性を両立させています。

### 1\. TerraformによるProject機能のコード管理

みなさんの組織では、誰がどのWorkflowをメンテナンスしているか、一目で追えているでしょうか？ 複数人での利用において、Personal spaceの共有機能はSecurity的な懸念（誰にでも全権限で共有されてしまう等）がありました。 解決策として**Projects機能**を採用しましたが、GUI操作での管理は属人化の温床です。 そこで私たちは、**n8n Terraform provider**を内製化し、Projectの作成からメンバーのアサインまでをすべてTerraformでコード管理しています。Terraform providerを内製化した理由は、公式でのTerraform providerの提供がなかったのと、OSSで開発されているTerraform providerがProjects機能に対応していなかったためです。

```
resource "n8n_project" "sre_team" {
  name = "SRE Team"
}

resource "n8n_project_member" "sato" {
  project_id = n8n_project.sre_team.id
  user_id    = data.n8n_user.sato.id
  role       = "project:editor"
}
```

_e.g.: ProjectのTerraform resource設定_

これにより、権限設定の変更履歴がGitに残り、レビュープロセスを通すことが可能になりました。

### 2\. Oktaを活用したSSOとUser-Provisioning

認証は全社標準のOktaとSAML連携し、SSOを実現しています。 さらに、v1.122.2から導入された[SAML経由でのrole-provisioning](https://docs.n8n.io/release-notes/#n8n11220)を活用予定です。これは、Okta側のuser属性（`n8n_instance_role`, `n8n_projects`）に応じて、n8nログイン時に自動的にロールや所属Projectを割り当てる機能です。 これにより、入退社や異動に伴う権限変更をOkta側で一元管理でき、n8n側の運用負荷を大幅に削減できます。

### 3\. Audit Logの監査とプロアクティブな自動化

監査ログの取得は必須要件ですが、私たちは[Log Streaming](https://docs.n8n.io/log-streaming/)機能を使い、ログを単なる記録以上のものとして活用しています。 以前は「監査ログは何かあった時に後から見るもの」という受け身の運用でしたが、現在ではログを起点に次のアクションを自動化する運用へと変化しています。  
n8nから出力されるeventログ(user登録、Workflow保存など)をトリガーに、Cloud RunのSidecarを利用し、以下のような自動化を行っています。

このように、ログを単なる記録として扱うだけでなく、次のアクションを自動実行するトリガーとして活用することで、プロアクティブなガバナンスを実現しています。

### 4\. External Hookによる徹底したガバナンス

n8nの自由度は魅力ですが、統制の観点からはリスクにもなり得ます。 私たちは[External Hook](https://docs.n8n.io/embed/configuration/#backend-hooks)機能を活用し、Workflowが保存(`workflow.update`, `workflow.create`)される直前に独自のバリデーション処理を挟み込んでいます。

![External Hook Sequence Diagram](https://storage.googleapis.com/prd-engineering-asset/2025/12/c64aa6c2-image7.png)

-   **機密情報のチェック**: Workflow内にAPI keyやパスワードなどが直書きされていないか確認し、検出された場合はWorkflowの保存をブロックして修正を促します
-   **通信先の制限**: n8nのHTTP Request nodeで、localhostや社内ネットワークの特定セグメントなど、アクセスしてほしくない宛先が設定されていないか検証します
-   **承認フローの強制**: WorkflowをActiveにする際、所定の承認プロセスを経ていない場合は有効化できないように制御します。これにより、管理されていない野良Workflowの乱立や、意図しないデータ漏洩を防いでいます

これらのExternal Hook処理により、n8nは「自由なツール」から「ガードレールの効いたWorkflow Platform」へと変化しました。

### 5\. Code node実行環境の分離と堅牢化

n8nのCode nodeは、ユーザーがJavaScriptコードを実行できる非常に強力な機能ですが、複数人が利用する環境においては、その実行環境の管理が課題となります。 そこで私たちは、コード実行を安全に行うための[Task runners](https://docs.n8n.io/hosting/configuration/task-runners/)という仕組みを使用しました。  
Task runnersには2つの動作モードがあります。デフォルトの`Internal`モードはn8nのメインプロセス内でコードを実行しますが、私たちはより堅牢性を高めるため、`External`モードを採用しました。

![Task runners external mode Diagram](https://storage.googleapis.com/prd-engineering-asset/2025/12/539d2ac3-image9.png)  
_Source: [n8n Docs – Task runners External mode](https://docs.n8n.io/hosting/configuration/task-runners/#external-mode)_

これは、コードの実行環境をn8n本体から切り離された独立したプロセス（CloudRun Sidecarコンテナ）で動作させるモードです。この構成により、万が一Code node内で意図しない挙動のスクリプトが実行されたとしても、その影響範囲をコンテナ内に封じ込め、n8n本体の安定性を維持することができます。 さらに、私たちは以下の環境変数を設定し、セキュリティの強化を図っています。

-   **Pythonの無効化**: [N8N\_PYTHON\_ENABLED](https://docs.n8n.io/hosting/configuration/environment-variables/nodes/)環境変数をfalseに設定し、Pythonの実行を無効化しました。これは、PythonのTask runnerがまだBeta版である点を考慮したためです
-   **一部Nodeの無効化**: [NODES\_EXCLUDE](https://docs.n8n.io/embed/configuration/#environment-variables)環境変数を利用し、[Execute Command Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand)と[Read/Write Files from Disk Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile)を無効化しました。これらのNodeは、envコマンドによる環境変数の閲覧や、サーバー上のファイルへの意図しないアクセスを許容してしまう可能性があるため、リスクを未然に防ぐ目的で利用を制限しています

これらの設定を通じて、Code nodeの自由度を活かしつつも、より安心して利用できる環境を目指しました。

## まとめ

n8n Enterprise Editionが提供するProjects、SSO、Log Streaming、External Hookといった機能群は、私たちが求めるセキュリティとガバナンス要件を満たす上で非常に大きな助けとなりました。 単にツールを導入するだけでなく、これらの機能を組み合わせ、自社の運用に合わせてカスタマイズすることで、n8nは真に「Enterprise-Ready」な基盤となり得ます。 私たちがここまでSecurityやガバナンスの強化にこだわった理由は、**エンジニアの皆さんもエンジニア以外の皆さんも、誰もが安心して使える環境を作りたかったから**です。  
エンジニア以外の皆さんは、[AI Workflow Builder](https://docs.n8n.io/advanced-ai/ai-workflow-builder/)のようなChat-baseの機能を活用することで、Non-Programmingで容易にAI-Agentを作成し、業務を効率化でき、「プログラミングができないと自動化は難しい」というこれまでの考えは、AIの力によって覆されつつあります。

![AI workflow Builder for n8n](https://storage.googleapis.com/prd-engineering-asset/2025/12/1b34a0d6-image8.png)  
_Source: [n8n Docs – AI Workflow Builder](https://docs.n8n.io/advanced-ai/ai-workflow-builder/)_

一方でエンジニアの皆さんは、n8nを使用してプロトタイプを爆速で作成・検証し、高速なPDCAサイクルを回すことが可能になるでしょう。 更には人間が作成したWorkflowをAIが深く理解し、より堅牢でスケーラブルなアプリケーションとして自動で実装してくれる日がくるかもしれません。  
n8nはほぼ週次でマイナーリリースが行われるなど開発スピードが非常に速く、日々新しい機能が追加され、直近だと[v2.0へのメジャーアップデート](https://docs.n8n.io/2-0-breaking-changes/)も控えています。 n8nの進化と、私たちが取り組んできたSecurityやガバナンスの強化が組み合わさることで、社内の「AI-Native」な活動を少しでも後押しできるような環境になれれば幸いです。

明日の記事は mewutoさんによる、「n8nの静的解析CLIツールをOSS化 – JSON解析とDAGで実現するセキュリティチェックの自動化」についてです。n8nの承認フローの詳細が伺えるかと思います。引き続きお楽しみください。

_n8n.io logo source: [https://n8n.io/brandguidelines/](https://n8n.io/brandguidelines/)_