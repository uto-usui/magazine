---
title: "KubeCon + CloudNativeCon 2025 Japan 参加レポート（おまけ:Envoy拡張のWasmフィルタのデモ実装）"
source: "https://engineering.mercari.com/blog/entry/20250630-1224ec5881/"
publishedDate: "2025-07-01"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリモバイルのソフトウェアエンジニアの[@keiitaj](https://x.com/keiitaj)です。  
この記事は、[Merpay & Mercoin Tech Openness Month 2025](https://engineering.mercari.com/blog/entry/20250528-merpay-mercoin-tech-openness-month-2025/) の21日目の記事です。

## 概要

本記事は、2025年6月16-17日に日本で初開催されたKubeCon + CloudNativeCon 2025 Japan の参加レポートです。

**この記事の内容：**

-   日本初開催のKubeConイベントレポート
-   注目セッション
-   Envoy拡張用Wasmフィルタのローカル環境上のデモ実装

**執筆者の学び：**  
EnvoyとWebAssemblyを活用したAPI管理手法を実際に実装することで、セッションで得た知識をより深く理解できました。また、参加前は技術的ハードルが高いと感じていましたが、実際は職種やレベルを問わず楽しめるイベントであることを発見しました。

## 目次

1.  [はじめに](#はじめに)
2.  [参加の動機](#参加の動機)
3.  [イベントの規模と熱気](#イベントの規模と熱気)
4.  [注目したKeynote & Session](#注目したkeynote--session)
5.  [参加して感じたこと](#参加して感じたこと)
6.  [おまけ：Envoy + Wasmフィルタのデモ実装](#おまけenvoy--wasmフィルタの実装とローカル環境のデモ)
7.  [まとめ](#まとめ)

## はじめに

私は普段、Platform Engineerではなく、KubernetesやCloud Nativeの技術で構成された基盤の上でサービス開発を行うエンジニアとして、Tekton、Argo、Istio、Envoyなどを使って仕事をしています。

## 参加の動機

### 技術的な興味

業務でKubernetesやCloud Nativeの技術（Tekton、Argo、Istio、Envoy、Spinnakerなど）に日々触れる中で、これらの技術の最新動向やコミュニティの活動に強い興味を持つようになりました。  
また、AI技術の進化により、サービス開発エンジニアがPlatform構築により深く関わる機会が増えていくと感じました。  
そのため、Cloud Nativeエコシステムの全体像を把握しておきたいという思いもありました。

### 日本初開催の歴史的なイベント

CNCF（Cloud Native Computing Foundation）の主要イベントとして世界各地で開催されてきたKubeConが、日本で初めて開催されることも参加の大きな動機となりました。

実は、この日本開催実現までには長い道のりがあったそうです。  
以前、5月に開催されたCloudNative Daysで、Linux FoundationのNoriaki Fukuyasu氏による[KubeConを日本に招致するまでの経緯](https://event.cloudnativedays.jp/cnds2025/talks/2633)についての講演を聞く機会があり、その内容がとても印象的で、今回のKubeCon参加のきっかけの一つにもなりました。

Fukuyasu氏の話によると：

-   2023年以前、日本はクラウドネイティブ技術後進国と言われていた
    -   大企業での採用実績が少ない
    -   アジャイル、マイクロサービス、コンテナを知らない人が多数
-   [Cloud Native Community Japan](https://community.cncf.io/cloud-native-community-japan/)を立ち上げ、月に複数回のmeetupを開催
-   継続的なロビイング活動を通じて、ついに日本への招致に成功

このような背景を知ったことで、日本初開催のKubeConに参加することの意義をより深く感じるようになりました。

## イベントの規模と熱気

### 会場と参加者

会場となったヒルトン東京お台場で開催されたこのイベントは、1,500枚のチケットが完売し、日本のCloud Nativeコミュニティの盛り上がりを肌で感じることができました。

ちなみに、今年ロンドンで開催されたKubeConは12,418人が参加する[大規模なイベント](https://www.cncf.io/wp-content/uploads/2025/06/KubeCon_EU_25_TransparencyReport.pdf)でしたが、日本開催はコンパクトながらも内容の濃いイベントでした。

### イベントの楽しみ方

KubeConの魅力は、単にセッションを聞くだけではありません。初参加で感じた楽しみ方をご紹介します：

1.  **セッション参加**：[スケジュール](https://kccncjpn2025.sched.com/)を見て、興味のあるKeynoteやセッションに参加
2.  **ブース巡り**：セッションの合間に、OSSパビリオンや企業ブースを訪問
    -   OSSプロジェクトの開発者と直接話す貴重な機会
    -   最新プロダクトのデモを体験
    -   各社のノベルティグッズ収集

#### 企業ブースでの発見

各企業ブースを回ることで、最新のプロダクトやサービスの動向を直接確認できました：

-   **PagerDuty** AIエージェントが過去の対応履歴を基に、インシデントの原因分析や重要度判定を支援
    
-   **Splunk** Observability Cloudの新機能を展示、AIチャット機能による差別化を強調
    
-   **Toyota** コネクテッドカーの研究開発でCloud Native技術を活用し、自動車業界でもCloud Nativeが浸透していることを実感
    

## 注目したKeynote & Session

### Opening Keynote： Community Opening Remarks

[Community Opening Remarks](https://www.youtube.com/watch?v=mh7Cmei3pmI) – Chris Aniszczyk氏（CNCF CTO）

[![Community Opening Remarks](https://img.youtube.com/vi/mh7Cmei3pmI/0.jpg)](https://www.youtube.com/watch?v=mh7Cmei3pmI "Community Opening Remarks")

開会の挨拶では、以下の印象的な発表がありました：

-   1,500枚のチケットが完売したことへの感謝
-   CNCF、Kubernetesへのコントリビューションで日本がTOP10入り
-   **2026年も日本でKubeConを開催することが決定！**

日本のCloud Nativeコミュニティの成長が認知されていることを実感しました。

### 技術セッション： Full Lifecycle API Management in Kubernetes With Envoy and WebAssembly

特に印象に残ったのは、[Full Lifecycle API Management in Kubernetes With Envoy and WebAssembly](https://www.youtube.com/watch?v=McMBwWPlYTE)というセッションです。

[![Full Lifecycle API Management in Kubernetes With Envoy and WebAssembly](https://img.youtube.com/vi/McMBwWPlYTE/0.jpg)](https://www.youtube.com/watch?v=McMBwWPlYTE "Full Lifecycle API Management in Kubernetes With Envoy and WebAssembly")

#### セッションの概要

KubernetesにおけるAPI管理の課題に対して、EnvoyとWebAssembly（Wasm）を活用した革新的なアプローチが紹介されました：

1.  **L3/L7プロキシ機能の統合**
    -   JWT認証とルーティングによる高度なAPIトラフィック管理
    -   eBPFとOpenTelemetryを活用したオブザーバビリティの向上
2.  **WebAssemblyフィルタの活用**
    -   複数言語での開発が可能
    -   より高速な配布時間
    -   ランタイムでのセキュリティロジックの実装
3.  **実践的なデモ**
    -   Authorizationヘッダーのチェック機能をWasmで実装
    -   認証なしのトラフィックをブロックする仕組みの構築

#### 技術的な洞察

このセッションで特に興味深かったのは、WebAssemblyの用途が拡大していることです。元々はブラウザ上でのパフォーマンス向上のために開発されたWebAssemblyが、今やサーバーサイドのプラグイン機構として活用され始めています。

## 参加して感じたこと

### 技術トレンドの観察

イベント全体を通じて感じた技術トレンド：

-   **OpenTelemetry + eBPF**：オブザーバビリティ関連のセッションで頻繁に言及
-   **WebAssembly**：サーバーサイドでの活用事例が増加
-   **AI統合**：各種ツールにAI機能が標準装備

### コミュニティの多様性

印象的だったのは、専門的な内容から初心者向けまで幅広いセッションが用意され、ライトニングトークやパネルディスカッションでは専門以外の話題（コミュニティでの友達作りやコントリビューションのモチベーションなど）も語られていたことです。

参加のハードルが高いイメージがありましたが、実際は職種やエンジニアのレベルを問わず、誰でも楽しめるイベントであると感じました。

### 言語の壁と対策

Keynoteやセッションは全て英語で行われるため、英語が苦手な方には少しハードルが高いかもしれません。

私がとった対策は、Google Meetのマイクでスピーカーの音声を拾い、Geminiに議事録を作成してもらって内容を把握することでした。

Google Docsの音声入力は途中で音声が途切れると入力がストップしてしまったり、AppStoreに公開されている幾つかの音声の書き起こしアプリは有料でさらに時間制限があったりしたので、色々試行錯誤した結果、この方法が一番良かったと感じました。

また、参加した仲間とセッションの内容を共有し合うことで、理解を深めていました。

### 効率的な参加のコツ

同一時間帯に複数のセッションが開催されるため、私は興味のあるセッションを絞って参加しましたが、複数人で参加する場合はより効率的な立ち回りができると感じました：

-   手分けして異なるセッションに参加
-   Coffee Breakで情報交換したり、お互いにセッション内容のメモを共有

## おまけ：Envoy + Wasmフィルタの実装とローカル環境のデモ

KubeConで紹介されたEnvoyとWebAssemblyによるAPI管理の技術についてより深く理解するため、実際にEnvoyを拡張するGolang製のWasmフィルタを実装し、ローカル環境上で動作確認を行いました。

実装の詳細やソースコードは、[GitHub](https://github.com/keitaj/envoy-wasm-sample) で公開しています。

### デモの概要

このデモでは、Bearer トークン認証を行うWasmフィルタを実装し、以下の機能を備えています：

-   Bearer トークンによる認証機能
-   `/health` エンドポイントの認証スキップ
-   認証成功時のカスタムヘッダー追加
-   認証失敗時のJSONエラーレスポンス

### 実装のポイント

#### 1\. 使用技術・ツール

-   **Envoy**: v1.34-latest以降
-   **Go**: 1.24以降 (wasip1/wasm target)
-   **proxy-wasm/proxy-wasm-go-sdk**: Wasm plugin development SDK for Envoy

#### 2\. シンプルな認証ロジック

```
package main

import (
    "github.com/proxy-wasm/proxy-wasm-go-sdk/proxywasm"
    "github.com/proxy-wasm/proxy-wasm-go-sdk/proxywasm/types"
)

func main() {}

func init() {
    proxywasm.SetVMContext(&vmContext{})
}

type vmContext struct {
    types.DefaultVMContext
}

func (*vmContext) NewPluginContext(contextID uint32) types.PluginContext {
    return &pluginContext{}
}

type pluginContext struct {
    types.DefaultPluginContext
}

func (p *pluginContext) OnPluginStart(pluginConfigurationSize int) types.OnPluginStartStatus {
    proxywasm.LogInfo("plugin started")
    return types.OnPluginStartStatusOK
}

func (*pluginContext) NewHttpContext(contextID uint32) types.HttpContext {
    return &httpAuthContext{contextID: contextID}
}

type httpAuthContext struct {
    types.DefaultHttpContext
    contextID uint32
}

func (ctx *httpAuthContext) OnHttpRequestHeaders(numHeaders int, endOfStream bool) types.Action {
    // Get path
    path, err := proxywasm.GetHttpRequestHeader(":path")
    if err != nil {
        proxywasm.LogErrorf("failed to get path: %v", err)
        path = "/"
    }

    proxywasm.LogInfof("Processing request to path: %s", path)

    // Skip health check
    if IsHealthCheckPath(path) {
        proxywasm.LogInfo("Health check endpoint, allowing request")
        return types.ActionContinue
    }

    // Get Authorization header
    authHeader, err := proxywasm.GetHttpRequestHeader("authorization")
    if err != nil {
        authHeader = ""
    }

    // Validate token
    authResult := ValidateToken(authHeader)
    if !authResult.IsValid {
        proxywasm.LogWarnf("Authentication failed: %s", authResult.Reason)
        return ctx.denyRequest(authResult.Reason)
    }

    // Add user type header
    proxywasm.LogInfof("Valid %s token", authResult.UserType)
    proxywasm.AddHttpRequestHeader("x-auth-user", authResult.UserType)
    return types.ActionContinue
}

func (ctx *httpAuthContext) OnHttpResponseHeaders(numHeaders int, endOfStream bool) types.Action {
    proxywasm.AddHttpResponseHeader("x-wasm-filter", "go-auth")
    return types.ActionContinue
}

func (ctx *httpAuthContext) denyRequest(reason string) types.Action {
    body := CreateErrorResponse(reason)

    err := proxywasm.SendHttpResponse(401, [][2]string{
        {"content-type", "application/json"},
        {"x-wasm-filter", "go-auth"},
    }, []byte(body), -1)

    if err != nil {
        proxywasm.LogErrorf("failed to send response: %v", err)
    }

    return types.ActionPause
}
```

### ローカル環境でのデモ

Docker Composeを使用してローカル環境で動作確認を行えるようにしました：

```
Client → Envoy Proxy (Wasmフィルタ) → Backend Service
```

以下の3つのシナリオで動作を確認できます：

1.  **認証成功**: 正しいBearerトークンでのリクエスト
2.  **認証失敗**: 無効なトークンでのリクエスト
3.  **認証スキップ**: ヘルスチェックエンドポイントへのアクセス

### 学びと今後の可能性

このデモ実装を通じて、Envoy Wasmフィルタの実用性と多くのメリットを実感できました：

#### Wasmフィルタの主要メリット

**言語の自由度** – Go、Rust、C++など慣れ親しんだ言語で開発でき、既存のツールチェーンを活用可能

**安全性** – Wasmのサンドボックス環境で実行されるため、Envoyプロセスをクラッシュさせるリスクが低く、メモリ安全性も保証

**パフォーマンス** – ネイティブコードに近い実行速度を実現

**配布とバージョニング** – 単一の.wasmファイルとして配布でき、バージョン管理やデプロイメントパイプラインへの組み込みが簡単

特に実際のプロジェクトでは、既存のGo/Rustコードベースがある場合、同じ言語でプロキシレイヤーのロジックを実装できることが大きな価値となります。

認証、ログ処理、メトリクス収集などのビジネスロジックを統一言語で管理でき、JWT検証やレート制限、OpenTelemetry連携など、より高度な機能への拡張も現実的です。

## まとめ

初参加したKubeCon + CloudNativeCon 2025 Japanは、日本のCloud Nativeコミュニティの盛り上がりを実感できる貴重な体験となりました。

技術面では、EnvoyとWebAssemblyを活用したAPI管理手法が特に印象深く、実際にWasmフィルタを実装してローカル環境でデモを動かすことで、セッションで学んだ概念をより深く理解できました。また、OpenTelemetryとeBPFを組み合わせたオブザーバビリティ技術や、WebAssemblyのサーバーサイド活用、AI統合の進展など、Cloud Native技術の進化を直接体感することができました。

また、参加前は技術的なハードルが高いイメージがありましたが、実際は職種やエンジニアレベルを問わず楽しめるイベントであることも発見できました。多様な参加者との交流や企業ブースでの最新技術の体験も、魅力だと感じました。

来年2026年の日本開催も決定しており、Cloud Native技術に興味がある方にはぜひ参加をお勧めします。

* * *

_本記事で紹介したセッションの動画は、[CNCFの公式YouTubeチャンネル](https://www.youtube.com/@cncf)で公開されています。興味のある方はぜひご覧ください。_