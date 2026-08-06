---
title: "KubeCon + CloudNativeCon Japan 2026 に参加しました"
source: "https://tech.layerx.co.jp/entry/2026/08/06/105240"
publishedDate: "2026-08-06"
category: "engineering"
feedName: "LayerX エンジニアブログ"
author: "joe_yuzupi"
---

こんにちは、Ai Workforce 事業部で Engineering Manager をしている [Joe](https://x.com/joe_yuzupi) です

今回はKubeCon + CloudNativeCon Japan 2026に加え、7月28日に行われたJapan Community Dayにも参加したので、その参加ブログとなります。

KubeCon + CloudNativeCon Japanは、Cloud Native Computing Foundation（CNCF）が主催する、KubernetesをはじめとするCloud Native技術に関する国際カンファレンスです。North America（北米）やEurope（欧州）では毎年開催されており、日本では昨年に続いて2回目の開催となります。

[events.linuxfoundation.org](https://events.linuxfoundation.org/kubecon-cloudnativecon-japan/)

私自身、CNCF のイベントはKubeDay Japan 2022に参加して以来であり、 昨年もタイミングが合わず参加できなかったのですが今回参加できることになりとても楽しみにしていました。今回はご縁があり、7月29〜30日の本会期に加え、7月28日に行われたCo-located Eventsの1つであるJapan Community Dayで登壇させていただくことになり、計3日間の参加となりました。

[events.linuxfoundation.org](https://events.linuxfoundation.org/kubecon-cloudnativecon-japan/co-located-events/japan-community-day-schedule/?id=1278454)

話した内容についての詳細は割愛しますが、OpenTelemetry についての話をさせてもらいました。当日のスライドをこちらに添付します。

[speakerdeck.com](https://speakerdeck.com/yuzujoe/building-ai-agent-observability-with-opentelemetry)

## グローバルで進むKubernetesの活用

Keynoteでは日本企業の事例を含めて多くのトピックが語られていましたが、その中でもKubernetesの普及率の高さは、私にとって大きな関心事となりました。

CNCFの2025年年次調査によると、コンテナ利用者の82%が本番環境でKubernetesを利用しています。また、生成AIモデルをホストしている組織の66%が、推論ワークロードの一部または全部をKubernetesで管理していると報告されています。

[www.cncf.io](https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/)

[https://www.cncf.io/wp-content/uploads/2026/01/CNCF\_Annual\_Survey\_Report\_final.pdf](https://www.cncf.io/wp-content/uploads/2026/01/CNCF_Annual_Survey_Report_final.pdf)

CNCFとSlashDataが発表した「The State of Cloud Native Development in Japan 2026」では、日本の開発者の41%がクラウドネイティブ開発者と推計され、数値上は世界平均の39%をわずかに上回っています。ただし、日本の回答標本は限定的であり、統計的に明確な差を示すものではありませんが、Keynoteの中でも、撮り忘れてしまいましたが日本の活発さを表すスライドが紹介されていました。

[https://www.cncf.io/wp-content/uploads/2026/07/DN31-JAPAN-State-of-Cloud-Native-Development-1.pdf](https://www.cncf.io/wp-content/uploads/2026/07/DN31-JAPAN-State-of-Cloud-Native-Development-1.pdf)

## 面白かった発表

いくつものトラックで多くのセッションがあり、全てを聞くことはできませんでしたが、その中でも私自身が聞いていて面白かったセッションを紹介します。

### **Ground Control to Cloud Native: Safe Deployments for a Growing SAR Satellite Constellation**

宇宙産業における高度に専門化されたシステムのリリースにおける、CIOps から GitOps への適用事例を紹介するセッションを Synspective の方が発表されていました。

普段いつでもリリースできるようなソフトウェアの世界で開発していたり5年ほど前は私自身も 　Argo CD などを使ってリリースフロー基盤を構築していた経験からどうやって使えるのだろうかという興味が非常にありましたが、リリースのタイミングなどが限られているようなかなり制約の強いワークロードの中でも Kubernetes や Argo CD などのエコシステムが使えることが私にとって新鮮なトピックであり、Argo Rolloutsの AnalysisTemplate を使ったリリース判断の事例を聞くのは初めてでありリリースへの工夫が聞けるセッションになっていました。

発表後に登壇者の Arai Masaya さんにもいくつか質問させてもらいましたが、思ったよりも普段私たちが使っているWebの技術は使われているようで私自身宇宙産業についてまったく知らなかったので勉強になりました。

[Ground Control to Cloud Native: Safe Deployments for a Growing SAR Satellite Constellation](https://events.linuxfoundation.org/kubecon-cloudnativecon-japan/program/schedule/?id=1194287:title)

### **From Statsd to OpenTelemetry: Atlassian's Metrics Platform Migration at Scale**

Atlassianのメトリクスプラットフォームを StatsD から OpenTelemetry へと移行していく内容についてのセッションです。

タイトルからはStatsDからOpenTelemetryへの移行が主題に見えますが、扱う規模は非常に大規模です。

セッションで紹介されていた範囲では、1日あたり1.6PBものテレメトリーが生成されているとのことで、Atlassianというプラットフォームの規模の大きさと、移行の難易度の高さを感じながら聞いていました。

この規模でOpenTelemetry Collectorを運用することにも難しさがあり、当初はKubernetesのVertical Pod Autoscaler（VPA）でPodを大きくすることでスケール問題に対応していたものの、ノードサイズの限界に直面したとのことでした。また、実際に想定されるトラフィックを流して負荷試験を行い、移行による影響を計測するなど、実践的な内容の多いセッションでした。

テレメトリーの一部欠損について登壇者に伺ったところ、一定の欠損はトレードオフとして許容しつつ、既存システムのSLOを維持する設計としているとのことでした。世界的な大規模サービス運用の難しさの一端を知ることができるセッションでした。

[From Statsd to OpenTelemetry: Atlassian's Metrics Platform Migration at Scale](https://events.linuxfoundation.org/kubecon-cloudnativecon-japan/program/schedule/?id=1191835)

## ブースで新しく知るソリューション

カンファレンス参加においてはスポンサー様が出展しているブースも楽しみの1つです。

皆さんがよく知っている AWS、Microsoft や Datadog、Grafana などのブースも出展されていました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20260805/20260805213323.jpg)

写真は Grafana Labs のStaff Developer Advocate の山口さんです。ブースの様子を撮影したいとお話したところ、笑顔で撮影に応じて頂きました

初めて知ったものとして、Antithesisというプロダクトが面白く感じられました。ブースで紹介されていた範囲では、Kubernetesなどで構築された環境を再現し、入力値やネットワーク障害、処理の実行順序などを変化させながら、通常のテストでは見つけにくい不具合を探索・再現するテストプラットフォームとのことです。

[antithesis.com](https://antithesis.com/)

さらに、修正後に同じ条件で再びテストすることで、不具合が解消されたことを確認し、回帰テストやCIの品質ゲートとしても利用できるようです。

個人的な感覚として、コーディングエージェントで作りやすくなった反面、既存のテストやQAでは拾えないような潜在的な問題もあるのでオブザーバビリティと組み合わせて使えると品質への貢献という意味で非常に強力なものになる可能性を感じました。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20260805/20260805212459.jpg)

他にも、リモートで開発環境を用意する仕組みへの関心が高まる中、その選択肢の1つとしてCoderが展示されていました。

ブースで紹介されていた範囲では、セルフホストしたKubernetesなどの環境に個別のワークスペースを払い出し、クラスター上でClaude CodeやCodexなどを動かせるソリューションとのことです。PCを閉じた後も、構成によってはリモート環境で処理を継続しやすくなります。私自身もコーディングエージェントが止まらないようにPCを閉じないようにしている時があるので欲しくなるソリューションでした。

[coder.com](https://coder.com/)

ソースコードはCoder公式GitHubリポジトリで公開されています。

[github.com](https://github.com/coder/coder)

![](https://cdn-ak.f.st-hatena.com/images/fotolife/j/joe_yuzupi/20260805/20260805212631.jpg)

## コミュニティの広さ

自分が参加した範囲では、日本の技術コミュニティの活発さを感じ、同時に海外からの参加者もコミュニティ活動に積極的で、コミュニティへの参加を促す場面が見られました。

私個人としては、OpenTelemetryのco-founderであるTedさんや、OpenTelemetryのGovernance CommitteeメンバーであるAlolitaさんとの出会いは、こうしたイベントならではのものだと感じ、特定の技術を通じて世界の人とつながれることは、とても素晴らしい事でコミュニティの重要性を感じています。

なかなか海外のタイムゾーンで動いているので参加が難しいのですが、CNCF の Slack チャンネルでも積極的にディスカッションがされているので参加してみたいと思います。

[cncf-slack.netlify.app](https://cncf-slack.netlify.app/)

## まとめ

私個人としては初めてのKubeCon + CloudNativeConへの参加でしたが、多くの学びや刺激を得られるカンファレンスでした。普段はAI Agentの開発や、自分自身でAIを使うことに没頭していますが、それを支えるプラットフォームやエコシステムの重要性を再認識できる良い機会でした。

来年も開催されたら是非参加したいと思います！

個人的なことになりますが、英語力を高めて話せるようになりたいと痛感して英語学習への意欲が高まりました。

EVENT

### AIカンファレンス「Bet AI Day 2026」開催概要

開催日時

2026年9月3日（木）12:00 開演

開催方法

オンライン配信

参加費用

無料（事前申込制）

[connpass でお申し込み](https://layerx.connpass.com/event/399169/)