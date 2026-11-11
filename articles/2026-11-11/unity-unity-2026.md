---
title: "『Unity パフォーマンスチューニング バイブル』の続編『Unity パフォーマンスチューニング ティップス 2026』を無料公開しました"
source: "https://developers.cyberagent.co.jp/blog/archives/67318/"
publishedDate: "2026-11-11"
category: "frontend"
feedName: "CyberAgent Developers Blog"
author: "キム ミンヒョク"
---

![『Unity パフォーマンスチューニング ティップス 2026』](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/stack_hires.png)

弊社ゲーム・エンターテイメント事業部（SGE）のエンジニアが執筆した書籍『Unity パフォーマンスチューニング ティップス 2026』のWeb版とPDFを無料で公開しました。本書は、2022年に刊行した『Unity パフォーマンスチューニング バイブル』の続編として、Unity 6世代におけるパフォーマンスチューニングの現在地を全21章にまとめたものです。

本記事では、本書を執筆した背景と、入手方法、概要、各部の内容についてご紹介します。

## 執筆の背景と思い

2022年の無料公開以来、多くの反響をいただいた『Unity パフォーマンスチューニング バイブル』では、誰でもゼロからパフォーマンスチューニングを体系的に身につけられるよう、原因を切り分けるワークフローと、その前提となる基礎知識、グラフィックスからスクリプティングまでのチューニング実例を1冊にまとめておりました。

-   [Unityのパフォーマンスチューニングを体系的に学べる書籍『Unity Performance Tuning Bible』刊行による社内技術力強化施策の紹介](https://developers.cyberagent.co.jp/blog/archives/36847/)
-   [【無料公開】社内研修書籍『Unity パフォーマンスチューニングバイブル』のPDF公開&オープンソース化しました！](https://developers.cyberagent.co.jp/blog/archives/37085/)

Unity パフォーマンスチューニング バイブルで述べた内容は、2026年の今もそのまま参考になる部分が多くありますが、刊行から4年が経ち、さまざまな変化がありました。

UnityではURPにRenderGraphが入り、CoreCLRの導入やC#14への対応も控えています。ハイエンド端末のGPU性能はiPhoneで約3倍、Androidで4倍以上に伸び、開発の現場ではAIコーディングエージェントが実装やレビューに加わるようになりました。

ただし、向き合っている問題そのものは前作の頃とほとんど変わっていません。モバイルGPUのメモリ帯域、大量のオブジェクトを描くときのCPU負荷、シェーダーコンパイルによるスパイク、アセットの解放漏れ、端末ごとのメモリ上限など。新しい機能は、以前からの問題に対する新しい選択肢です。選択肢が増えたぶん、どれを選ぶかの判断が問われます。

AIコーディングエージェントが開発の一部を担うようになった今、エージェントに計測や修正を任せられる範囲は今後も広がっていくはずですが、何をもって良しとするかを決めるのは、依然として私たち自身です。品質を保証できたと言える線は、プロジェクトごとに異なり、運用を続けるなかで見直されていきます。

そこで一度立ち止まり、パフォーマンスチューニングの現在地を確かめるべく、社内の有識者を集めて本書をまとめました。執筆には、ゲーム・エンターテイメント事業部に所属するエンジニア16名が参加し、それぞれが現場で向き合ってきた課題と、その検証結果を持ち寄っています。

## Web版・PDFの入手方法

Web版は以下のURLから閲覧できます。

[https://cyberagentgameentertainment.github.io/UnityPerformanceTuningTips2026/](https://cyberagentgameentertainment.github.io/UnityPerformanceTuningTips2026/)

PDFは以下のGitHubリポジトリからダウンロードできます。Releasesの最新版を開き、AssetsからPDFを取得してください。

[https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningTips2026](https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningTips2026)

## 製本版の配布について

本書の製本版は、今後さまざまなイベントで配布していく予定です。

その一つとして、12月2日（水）にAbema Towersで開催する技術交流イベント「Game Tech Night by CyberAgent #1（パフォーマンス・チューニング）」にて、参加者の皆さまに製本版を配布します。イベントでは、本書の執筆者によるLTのほか、パフォーマンスチューニングをテーマにしたラウンドテーブルも行います。参加は無料で、お申し込みは11月24日（火）までです。

-   イベント詳細：[【参加者募集】パフォーマンス・チューニング、どうしてる？ 技術交流イベント『Game Tech Night by CyberAgent #1』開催！](https://creator.game.cyberagent.co.jp/archives/11886)
-   お申し込み（connpass）：[https://cyberagent.connpass.com/event/411998/](https://cyberagent.connpass.com/event/411998/)

## 本書の概要

本書では、Render Graph、GraphicsStateCollection、Android向けのLink Time OptimizationといったUnity 6で新しく選べるようになった機能から、キャラクターアニメーションの負荷対策、シェーダーの超越関数の近似、AssetBundleの寿命管理、iOSのメモリ上限の引き上げなど、それより前のバージョンのプロジェクトにも持ち込める実践的なトピックまでを、実測値とともに取り上げています。

巻頭の「課題別の逆引きガイド」では、容量・メモリ・CPU・GPUといった症状から、まず見るべき値と該当する章を引けるようにしました。

![課題別の逆引きガイドの誌面。容量・メモリ・CPU・GPUの症状から、見るべき値と該当する章をたどるフローチャート](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/reader_guide_flow.png)

## 第1部 グラフィックス最適化

第1部では、Render Graphでのパスの組み方とタイルメモリの扱いから、シェーダー演算の軽量化、マテリアルを増やさずにオブジェクトごとの値を渡す方法、シェーダーのウォームアップまで、描画まわりを取り上げています。

![第1部の誌面例。Render Graph ViewerでMemorylessになったアタッチメントを確認する図](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/part1_pdf.png)

## 第2部 スクリプティング・アニメーション最適化

第2部では、キャラクターアニメーションやパーティクルの負荷対策を中心に、非同期処理のライフタイム管理やUIシステムの選び方まで、CPU負荷とメモリに直結するトピックを取り上げています。

![第2部の誌面例。VATで再生したアニメーションの比較図（左：剛体、右：ソフトボディ）](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/part2_pdf.png)

## 第3部 アセット・設定・ビルド最適化

第3部では、運用とともに膨らむアセットの管理から、端末別の描画設定、コードストリッピングやLTOといったビルド設定、iOSのメモリ上限まで、コードを書き換えずに容量・メモリ・速度のバランスを動かせる領域を取り上げています。

![第3部の誌面例。Project AuditorのAsset Issuesビューでアセットの問題を一覧する図](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/part3_pdf.png)

## 第4部 計測と自動化

第4部では、チューニングの前提である計測を、どう手軽に、どう継続的に行うかを取り上げます。iOS標準の計測機能の活用から、デイリービルドの実機プロファイリングの自動化、本書と前作の知見をAIコーディングエージェントのスキルにする試みまでを紹介しています。

![第4部の誌面例。デイリービルドの実機計測パイプラインの段階を示す図](https://developers.cyberagent.co.jp/blog/wp-content/uploads/2026/11/part4_pdf.png)

## さいごに

本書が、Unityでゲームを開発する皆さんにとって、その判断の基準を自分たちで持つための手がかりになれば幸いです。前作『Unity パフォーマンスチューニング バイブル』とあわせてご活用ください。

本記事の拡散、GitHubリポジトリのStar、書評の投稿などいただけますと、執筆メンバー一同とても嬉しく思います。

-   Web版：[https://cyberagentgameentertainment.github.io/UnityPerformanceTuningTips2026](https://cyberagentgameentertainment.github.io/UnityPerformanceTuningTips2026/ja/index.html)
-   GitHub（PDFのダウンロード）：[https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningTips2026](https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningTips2026)
-   前作『Unity パフォーマンスチューニング バイブル』：[https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningBible](https://github.com/CyberAgentGameEntertainment/UnityPerformanceTuningBible)