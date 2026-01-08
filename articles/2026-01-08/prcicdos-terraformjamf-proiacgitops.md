---
title: "PR駆動の変更、CI/CDでOS設定を自動反映 — Terraformで実現するJamf ProのIaC＋GitOps基盤"
source: "https://engineering.mercari.com/blog/entry/20251220-jamf-terraform-gitops/"
publishedDate: "2025-12-20"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリのセキュリティエンジニアの@yuです。  
この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/) の20日目の記事です。

従業員の業務端末(MacBook)に利用しているデバイス管理ツールであるJamf Proの構成管理にTerraformを活用し始めた際の所見について紹介します。

## 概要

Jamf Proの構成変更は、macOS, iOSデバイス管理の改善に欠かせません。一方で、変更が手作業中心だと、レビューが重くなったり、作業ミスの余地が残ったり、変更の根拠や履歴が散らばったりしがちです。特にセキュリティの観点では「何時、誰が、何故、どのようなプロセスで、何を変更できるのか」のような5W1Hを明確にし続けることが重要になります。

そこで本記事では、Open Source Communityが開発・保守しているTerraform provider (※)を用いてJamf ProのリソースをIaC (Infrastructure as Code)化し、さらにGitHub上のPR (Pull request)を起点に`terraform plan`をレビューしてから`terraform apply`を実行する、PR駆動のGitOpsフローへ移行した取り組みを紹介します。

※: [https://registry.terraform.io/providers/deploymenttheory/jamfpro/latest/docs](https://registry.terraform.io/providers/deploymenttheory/jamfpro/latest/docs)

この手法自体は主要なクラウドサービスの構成管理では一般的な手法ではありますが、本件の様なデバイス管理ツール上での適用については例が少ないのが現状です。本記事では、この試みをいかにして実現したのかを紹介します。

この仕組みによって、変更内容はコード差分とplan出力として事前に確認できるようになり、適用は自動化されます。結果として「手順書ベースのレビューや手作業変更」から、「差分とplanを一次情報としてレビューし、承認後に安全に反映する」形へ移行できました。

## 背景：なぜ“セキュアな変更管理”が必要だったのか

もともとJamf Proの変更は、手順書に沿った手作業が中心でした。この方法は丁寧に運用すれば回りますが、変更のたびに設計から実装までのリードタイムが伸びやすく、オペミスの余地も残ります。また、Jamf Proのリソースによっては変更履歴が十分に追えず、申請フローと実際の変更を機械的に突合できない、といった課題もありました。さらに、従来の申請フローでは「何をどう変えるか」が自然言語やスクリーンショットで記述されることが多く、変更内容が曖昧になりやすいという問題もありました。申請者・承認者・作業者の間で解釈が分かれた結果、意図と異なる設定変更やレビュー漏れが起きる余地が残ります。

（こちらの課題の一例については昨年の [mSCPとJamf Pro APIによるmacOSセキュリティ設定の手動IaC化の試行 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/20241220-mscp-jamf-api-macos-security-configs-iac/ "mSCPとJamf Pro APIによるmacOSセキュリティ設定の手動IaC化の試行 | メルカリエンジニアリング") も併せてご参照下さい）

さらに運用が進むにつれて、リソースの所管や背景（なぜこの設定が必要か）が 変更管理ツール、SlackやNotion、Google Docsなどに散在し、後から辿るコストが増えていきます。結果として、定常メンテナンスのために高い操作権限を人に付与し続ける必要が出やすく、攻撃面管理の観点でも悩ましい状態になりがちです。一方で、私たちはお客さま向けのプロダクト環境へ設定しているものと同じ高いセキュリティ及び管理基準を当社のコーポレート環境に対しても適用したいと考えております。

この状況を改善するために、私たちはJamf Proの変更を「コード化」し、「PRとレビューのプロセスに載せる」、そして「承認後に自動適用する」構造へ切り替えました。以降の章では、この GitOpsフローをどう設計し、どのように権限分離・承認・変更範囲のコントロールを実現したかを中心に説明します。

## コードオーナーで「変更範囲」と「承認責務」を結びつける

GitOpsでは、構成変更の入口がPRになります。つまり、レビューと承認の設計が、そのまま変更管理の統制になります。Jamf Proのように、設定変更が端末群に広く影響し得る仕組みでは、誰がどの範囲を見て、どの基準で承認するかを、運用ルールだけでなく “仕組み” に落とすことが重要です。

そこで有効なのが コードオーナー (※)です。コードオーナー を使うと、特定のディレクトリやファイルに変更が入った際に、指定したロール（チーム）がレビューに入ることを、リポジトリのルールとして強制できます。これにより「所管が曖昧」「気づいた人が見る」状態から、「この範囲はこのロールが責任を持つ」状態へ寄せられます。

※: [https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

（掲載例）

```
# CODEOWNERS (example)

# Policies: local admin management
/terraform/sandbox/policies/local-admin/**                        @sec-reviewers

# Application update settings: owned by IT Dept.
/terraform/sandbox/configuration-profiles/update-settings/**          @endpoint-admins

# Production: require multiple approvers
/terraform/prod/**               @sec-reviewers @endpoint-admins

# Workflows
/.github/workflows/**                         @sec-reviewers
```

ここでのポイントは、ディレクトリ構造自体をレビュー境界に合わせることです。

## GitHub Actions workflowの統制：applyの実行条件を絞る

PR駆動のGitOpsでは、`terraform plan`が “事前確認” で、`terraform apply`が “本番反映” です。この2つを分けて考え、applyが実行され得る条件を狭くすることで、変更管理をセキュアにできます。

本件での設計の要点は`terraform plan`と`terraform apply`の実行ワークフローを分離し、承認前に本番反映 (apply)が起きない状態をBranch Protectionで担保することです。

具体的にはPR 作成時にはplanを実行し、レビュワーはコード差分とplan出力を一次情報として確認します。一方でapplyはmainブランチへのマージ後にのみ実行されるようにし、「承認済みの変更だけが反映される」状態をワークフロー条件とします。Branch Protectionに関わるセキュリティ上の論点については、補足として「[GitHubのBranch Protectionの突破方法 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/20241217-github-branch-protection/ "GitHubのBranch Protectionの突破方法 | メルカリエンジニアリング")」も併せて参照ください。

さらに、ワークフロー自体を保護することも重要です。GitOpsにおいてCI/CDは実質的に“実行主体”であり、ここが最重要の保護対象になります。そのため、本件ではplanとapplyのワークフローを分離し、それぞれが参照できるAPI権限も分離します。具体的には、planは読み取りに必要な範囲に限定し、applyは反映に必要な範囲に限定します。加えて、認証情報は特定のワークフローが特定の GitHubイベントで実行された場合にのみ、CI上で一時的に参照できるようアクセス制御を適用し、不要な露出を避けます。

最後に、`.github/workflows/**`配下の変更についても勿論レビューを必須にすることで、CI/CDの改変による統制の迂回を防ぎます。

この設計によって、「強い操作権限を常に人へ配り続け、手動での変更管理」状態から、承認プロセスに通った変更だけが自動で反映される状態への移行準備が整いました。Jamf Proは端末に対して大きな影響を与え得るため、変更管理をこの構造に乗せること自体がリスク低減になります。

## 移行：既存JamfリソースをIaCへ取り込む

### Import block / generate-config-out で「ゼロから書かない」移行にする

Jamf Pro には既に多くの設定が存在しているため、IaC化を “ゼロから書く” 方式で始めると、次の問題が起きがちです。

-   現行設定の再現に時間がかかる
-   再現ミス（設定の抜け漏れ）が起きる
-   結果として、移行プロジェクトが止まりやすい

そのため、本取り組みではTerraformのImport blockと `-generate-config-out`を活用し、既存のJamfリソースを起点にtfファイルを生成し、stateに取り込む流れを中心に据えました。

（コマンド例）

```
terraform plan -parallelism=1 -generate-config-out=<generated>.tf
```

このアプローチの利点は、移行を“正確性”と“スピード”の両立で進めやすい点です。運用移行では、最初から完璧な整理（理想のディレクトリ構成やモジュール化）を目指すより、まず「planが安定して読める状態」まで持っていく方が、その後の GitOps 運用に繋がりやすいと考えています。

なお、メルカリでは100を超えるJamf Proリソースがあるため、手動でimportブロック書くのも一定時間を要する可能性があり、事前に「Jamf Proのリソース情報を取得してimportブロックを自動生成する」プログラムを準備して臨みました。但し、こちらは Terraform provider側で将来`terraform query`へ対応した場合は、該当コマンドへ置き換えが可能となります。

![Jamf terraform plan result](https://storage.googleapis.com/prd-engineering-asset/2025/12/25ea0303-20251220_mercari_engineering_blog_jamf_terraform_gitops-1024x381.png)

### つまずきどころ1：構成プロファイルの差分が毎回出る問題

構成プロファイルでは、初回に`*.mobileconfig`をペイロードとしてJamf Proへ作成した際に、Jamf Pro側で`PayloadIdentifier`などの付加情報が追加されることがあります。結果として、次回の`terraform plan`で差分が必ず出る、という状況が起こり得ます。

例えば、GitHubプロジェクト側のmSCP (macOS Security Compliance Project)側で自動生成されるmobileconfigファイルをそのまま使う場合は本事象が発生します。

この差分は “危険な変更” というより、管理システム側の正規化（自動付加）により起きているため、運用としては次のように整理しておくと混乱が減ります。

-   「差分が出る＝即apply」ではなく、まず差分の性質を分類する。
-   既存リソースは importを起点に扱い、変更時に差分を取り込む方針に寄せる
-   新規登録リソースも既存の正規化（自動付加）をsandbox環境などで検証の上、正規化された状態で本番へ適用。

これにより、GitOpsの価値である「planを一次情報としてレビューする」を維持しつつ、ノイズ由来の差分で運用が疲弊することを避けられます。

### つまずきどころ2：Policy更新時の差分の見え方

Policy 更新時は、plan/applyで例えば Self Serviceに関する属性差分が表示されるなど、UI上の変更と一致していても“コード上の差分”として表現されることがあります。将来的にTerraform provider側の改修に伴い解消する可能性がありますが、それまでは差分が「意図した変更か」を判断するためのチェック観点を押さえ、Terraformを利用する関係者で共有出来る形にすることで、円滑な運用に繋げることが出来ます。

## 運用：属人性を減らすために“プロセスで残す”

### PRが「背景・差分・plan」をまとめた一次情報になる

従来、変更の背景（なぜ必要か）や手順、結果はSlackやGoogle Docs、Notionなどに散らばりがちでした。GitOpsへ寄せると、少なくとも変更の入口がPRに集約されるため、

-   PR記述 (なぜ変えるのか)
-   コード差分 (何を変えるか)
-   plan 出力 (何が起きるか)

が、1つの場所に残ります。これは、コンテキスト散在や所管不明瞭の改善に直結します。

### コードオーナー＋レビューにより「気づいた人」から「責務」へ

コードオーナーは単に“レビューを依頼する仕組み”ではなく、責務境界をコードに埋め込む仕組みとして機能します。結果として、特定のリソースに対して「どのロールが見るべきか」を継続的に維持しやすくなります。

### 変更履歴の可視化（通知）で“あとから追える”を当たり前にする

GitOps では mainブランチが事実上の “唯一の正” になるため、mainの変更履歴を関係者が追える形にするのが重要です。mainの変更履歴をポストするチャンネルを用意してGitHubにアクセスせずともどのような変更が行われているかについてリーチし易い環境を用意しました。

## 導入効果

ここまでの取り組みを経て、私たちの運用が具体的にどのように変わったのかを紹介します。

### 1.ClickOpsからの解放

これまでの変更手順書に対するレビューでは、手順のWeb UIを頭でトレースしてレビューを行っていました。「この操作で意図した設定に変わるのかな？」「前提のステップや併せて変更するべきリソースはどこだろう？」という、ある意味想像力を働かせたレビュー必要でした。仮にsandbox環境でのテストをパスしていたとしても本番環境との僅かな差異によって予期せぬ挙動を招くリスクがあり、手順書作成からテスト、本番実装までのリードタイムも膨らんでいました。また、仮に完璧な手順書があったとしても、手作業中心では最後の最後でのオペミス（クリックやコピペ内容）というヒューマンエラーのリスクを内包していました。

移行後はPRのコード差分とterraform planの出力結果という一次情報が目の前にあるため、レビュー品質とスピードがあがりました。また、変更の反映も手作業では無く「プログラムによる確実な実行」がもたらした安心感はとても良いです。

### 2.監査・トラブルシューティングが容易に

PRそのものが「変更背景・差分・実行結果」をすべて内包するログとなっています。いつ、誰が、何の目的・背景で変更したのかが main ブランチの履歴と紐付いて残るため、監査やトラブルシューティングの際も、迷わず一次情報へ辿り着けるようになりました。

### 3.仕組みで責任と権限の担保

コードオーナーによって、ディレクトリ構造とレビュー（承認）責務が紐付いています。また、「承認された変更のみが自動適用される」フローを構築したことで、将来的に「最小権限の原則」の実現に向けたよい準備となりました。

## 今後の展望

### 1\. 管理対象リソースの拡大

Jamf ProのTerraform providerは有用ですが、開発途上の側面もあり、リソースタイプやリソースの構成によっては”差分ノイズ”と継続的に付き合う可能性があります。ノイズが多いとplanレビューの焦点がぶれ、レビュワーが疲弊する状況になりますので、まずはsandboxでの検証を継続しつつ、本番での管理(import)は段階的に広げる運用を継続予定です。

### 2\. Jamfの機能追加に伴う拡張

将来的には通常のJamf Proリソース管理に加え、Jamf社が公式で開発している別provider (※)で扱える領域 (例: blueprintやcompliance benchmark)を含めて、デバイスの管理運用やセキュリティコントロールを改善できる余地があります。

※: [https://registry.terraform.io/providers/Jamf-Concepts/jamfplatform/latest/docs](https://registry.terraform.io/providers/Jamf-Concepts/jamfplatform/latest/docs)

2025年12月上旬現在、この機能を用いるJamf Platform APIはpublic betaのアナウンス待ちとなり、それまではWeb UIでの変更管理となります。

[https://developer.jamf.com/platform-api/reference/getting-started-with-platform-api](https://developer.jamf.com/platform-api/reference/getting-started-with-platform-api)

### 3\. 運用メンバー向けOnboarding

日常的に開発を行っているメンバーはGitOpsの活用が容易ですが、そうでないメンバーや別チームの関係者に対しても「使ってみようかな」と考えてもらえる仕掛けや、取りかかりし易い環境は大切です。エディタやGitHubの使い方や、Terraform特有の記法のガイドなど、一方的なドキュメントの連携だけで終わらせるのではなく、メンバーからのフィードバックによる改善など、関係者で利用促進のポイントを継続検討予定です。

## まとめ

-   Jamf Proの変更管理を、手順書・手作業中心の運用から、TerraformによるIaC＋PR駆動GitOps (planレビュー→承認→apply) へ移行しました。
-   変更はPRの差分と`terraform plan`出力を一次情報としてレビューできるため、レビューの質と速度を上げつつ、適用は自動化することでオペミスの余地を減らす設計にできました。
-   コードオーナーやワークフローの実行条件で「変更範囲」と「承認責務」を結びつけ、所管の曖昧さやコンテキスト散在に対しても、プロセスと履歴が残る形で改善を狙えるようになりました。
-   一方で、差分ノイズが出やすいリソース（例: 構成プロファイル）などの課題もあるため、importの方針や運用ルールを整備しながら、段階的に改善していきます。

近年、Jamf Proだけでなく法人向け他製品についても前述のようなセキュリティやガバナンス上の利点からGitOpsやIaCに関わる要素技術 (APIやTerraform provider)へ多大な投資が行われています。将来の製品選定基準の一つとして本要素を含めるのも良いかもしれません。

本記事が各組織のmacOS, iOS構成管理の課題検討の一助になれば幸いです。

最後に、メルカリでGitOpsをPolicy as Codeとして活用し、セキュリティとガバナンスを拡張することにご興味がありましたら、セキュリティチームの採用情報について[mercari careers](https://careers.mercari.com/ "mercari careers")をご覧ください。

明日の記事は akkie さんです。引き続きお楽しみください。