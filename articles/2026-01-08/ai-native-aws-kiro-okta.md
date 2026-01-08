---
title: "AI-Native 開発を加速する AWS Kiro の導入と、Okta を活用したアカウント管理の自動化"
source: "https://engineering.mercari.com/blog/entry/20251211-4cfd1db1bf/"
publishedDate: "2025-12-19"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリのバックエンドエンジニアの @amenbo と、プラットフォームチームの @siroken3 です。この記事は、この記事は、[Merpay & Mercoin Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-merpay-mercoin-advent-calendar-2025/) の19日目の記事です。

メルカリでは AI-Native company を目指し、さまざまな AI エージェントの導入や運用改善に取り組んでいます。開発者の生産性向上もその一環であり、コーディング支援ツールの積極的な活用を進めています。そんな中、今年の7月にAWSからPreview公開された「Kiro」の試験導入を進めています。

Kiro は従来の「vibe coding」を超えた、仕様書駆動の開発を実現する IDE です。ただ、新しいツールを組織に導入する際には、技術的な評価だけでなく、アカウント管理や課金管理といった運用面での課題にも向き合う必要があります。

本記事では、メルカリが Kiro をどのように導入し、Okta と AWS IAM Identity Center を連携させたアカウント管理の自動化をどのように実現したかを紹介します。

## Kiro とは

**Kiroの概要**

Kiro は、2025年7月に AWS からパブリックプレビューとしてリリースされ、11月に一般提供（GA）が開始された spec-driven  
development を特徴とする agentic IDE です。VS Code のオープンソース版である Code OSS をベースに開発されています。

従来の AI コーディングアシスタントは、その場その場で「なんとなくいい感じに」コードを生成する「vibe coding」と呼ばれるアプローチが主流でした。一方、Kiro は仕様書を中心に据えた開発フローを実現します。開発者は以下の3つのマークダウンファイルで構成される「Kiro Specs」を作成し、これを基に AI エージェントがコード生成や実装を支援します。

-   `requirements.md`: ユーザーストーリーと受け入れ基準を定義
-   `design.md`: 技術設計とアーキテクチャを記述
-   `tasks.md`: 実装タスクをチェックリスト形式で管理

**Kiroの料金プラン**

Kiro の有償プランを組織で利用するには、AWS の AI コーディングアシスタントサービスである AWS Q Developer の Pro サブスクリプションプランを使用します。具体的には、AWS IAM Identity Center を通じてユーザーを管理し、Q Developer Proのライセンスを割り当てる仕組みになっています。

なお、2025年11月の GA 以降、Kiro は独自のサブスクリプション体系に移行しましたが、引き続き IAM Identity Center によるユーザー管理が必要です。このKiro 独自サブスクリプション体系への移行については、この記事の後半に述べます。

## アカウント管理における課題と解決策

**既存のOkta連携基盤**

組織で Q Developer Pro のライセンス管理を行うには、AWS IAM Identity Center との連携が不可欠です。メルカリでは Kiro の登場以前から、Okta と Identity Center の連携を構築しており、社内のさまざまな AWS リソースへのアクセス管理に活用していました。

この連携では SCIM 2.0（System for Cross-domain Identity Management）プロトコルによる自動プロビジョニングを採用しています。Okta 上でユーザーやグループを追加・変更すると、その情報が自動的に Identity Center へ同期される仕組みです。

Kiro のアカウント管理にもこの仕組みを活用しました。Okta に Kiro 利用者用のグループ（ `AWS_kiro_JP_Users` ）を作成し、そのグループに Q Developer Pro のサブスクリプションを割り当てます。これにより、Okta のグループにユーザーを追加するだけで、そのユーザは Kiro が利用可能になります。

ただし、この時点では Okta へのユーザー追加自体は手動で行っており、利用申請があるたびに AWS 管理担当者がコンソールからユーザーを登録する運用でした。作業自体は数分で終わるものの、担当者の手が空いていなければ対応は後回しになり、申請者を待たせてしまうケースが発生しました。

**AI エージェントによるアカウント発行の自動化**

Okta との連携をさらに一歩進め、すでに Okta と連携している社内の AI エージェントを Kiro のグループを扱えるように設定し、申請プロセスそのものも自動化しました。

ユーザーは Slack から「I want kiro」のように AI エージェントに伝えるだけで、以下のフローが自動的に実行されます。

1.  AI エージェントがリクエストを受け取る
2.  AI エージェントが Okta の API を呼び出し、ユーザーを Kiro グループ（ `AWS_kiro_JP_Users` ）に登録
3.  Okta が SCIM プロトコルで Identity Center にユーザー情報を同期
4.  Identity Center で Q Developer Pro アカウントが有効になる
5.  ユーザーが Kiro を使い始めた瞬間から従量制課金が開始される

![▲kiro アカウント申請の仕組み](https://storage.googleapis.com/prd-engineering-asset/2025/12/c839d6e7-system_overview.png) ▲kiro アカウント申請の仕組み

![▲AIエージェントを用いたアカウント申請](https://storage.googleapis.com/prd-engineering-asset/2025/12/ad65329b-agent.png) ▲AIエージェントを用いたアカウント申請

この仕組みにより、AWS 管理担当者の手を一切煩わせることなく、ユーザーが自律的に Kiro を利用開始できるようになりました。

## Q Developer Pro から Kiro への移行

**2025年11月のアップデートと移行の必要性**

2025年11月、Kiro は大幅なアップデートを経て一般提供（GA）が開始されました。このアップデートにより、Kiro は Amazon Q Developer から独立した製品となり、独自のサブスクリプション体系が導入されました。

先ほど説明した仕組みは GA 以前に実施したものであったため、既存の Q Developer Pro サブスクリプションを Kiro プランに移行する必要がありました。移行しない場合でも Q Developer Pro のサブスクリプションは引き続き有効ですが、Kiro 専用の新機能（Property-based Testing、Checkpointing など）は利用できない可能性があります。

移行手順自体は非常に簡単で、AWS Management Console から対象グループ（今回の例では `AWS_kiro_JP_Users` ）を選択し、希望の Kiro プランを指定するだけです。グループ単位またはユーザー単位で柔軟に移行でき、段階的な移行も可能です。

なお、一度 Kiro サブスクリプションにアップグレードすると、Q Developer Pro には戻せません。

## まとめ

本記事では、メルカリにおける AWS Kiro の導入と、Okta、AWS IAM Identity Center、AI エージェントを組み合わせたアカウント管理の自動化について紹介しました。

手動運用から始まった Kiro のアカウント管理は、既存の Okta と Identity Center の SCIM 連携を活用し、さらに AI エージェントと組み合わせることで、完全に自動化されました。この取り組みにより、以下を実現できました。

-   **管理負荷の大幅な削減**: AWS 管理担当者の手作業がゼロに
-   **スケーラブルな運用**: ユーザー数が増えても運用コストが増加しない
-   **セキュアなアクセス管理**: Okta を中心とした統一された ID 管理とアクセス制御

また、2025年11月の Kiro GA に伴う Q Developer Pro からの移行もスムーズに完了し、新しい課金体系のもとで運用を継続しています。

今後、AI ツールの導入はさらに加速していくと考えられます。その際、技術的な評価だけでなく、運用面での自動化をどう実現するかが重要になってきます。本記事で紹介した Okta と Identity Center の連携パターンは、他の AI ツール導入においても参考になる取り組みではないでしょうか。

メルカリは引き続き AI-Native company としての歩みを進めていきます。今後も、開発者の生産性向上とスケーラブルな運用を両立させる取り組みを続けていきたいと思います。

明日の記事は @Yu Sasaki さんです。引き続きお楽しみください。