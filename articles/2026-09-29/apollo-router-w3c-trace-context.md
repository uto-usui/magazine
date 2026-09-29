---
title: "Apollo Routerで途切れた分散トレースをつなぐ —— W3C Trace Contextとカスタムヘッダーを両立するまで"
source: "https://tech.smarthr.jp/entry/2026/09/28/103804"
publishedDate: "2026-09-28"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。今年の7月、SmartHRにプロダクトエンジニアとして入社したmaminoです。  
SmartHRでは、プロダクト開発基盤本部の業務連携基盤ユニットでEDP(Employee Data Platform)を主に担当しています。

2026年5月に公開した[「「磨き上げる」ことから始まる基盤開発 —— マルチプロダクト戦略を支える従業員データ基盤」](https://tech.smarthr.jp/entry/2026/05/21/142645)では、EDPの現在とこれからについてご紹介しました。

今回の記事では、EDPチームにおけるオブザーバビリティ向上の取り組みについてご紹介します。  
具体的には、EDPで途切れていた分散トレースをつなぐために何をしたのか、という話です。

## そもそもEDPとは？

EDPとは、各プロダクトが持っている従業員データを横断的に取得し、他のプロダクトでも活用できるようにする「従業員データ基盤」です。  
EDPにデータを取得しにくるプロダクト(クライアント側)も、EDPがデータを取得しにいくプロダクト(データソース側)もたくさんいます。  
EDPの技術的な柱は、複数のGraphQL APIを統合して単一のインターフェイスとして実行・管理するApollo Routerと、横断検索を可能にする分散SQLクエリエンジンのTrinoです。  
クライアントがGraphQLのリクエストをEDPのApollo Router(EDP Router)に送り、EDP Routerは各データソースからデータを取得、レスポンスを合成してクライアントに返却する流れです。

\---
title: EDPが各プロダクトの従業員データを取得する流れ
---
flowchart TB
    subgraph Clients\[クライアントプロダクト\]
        C1\[プロダクト\]
    end

    subgraph EDP\[EDP\]
        Router\[Apollo Router\]
        Trino\[Trino\]
    end

    subgraph Sources\[データソースプロダクト\]
        S1\[プロダクトA<br/>GraphQL API\]
        S2\[プロダクトB<br/>GraphQL API\]
        S3\[プロダクトC<br/>GraphQL API\]
        DB1\[プロダクトA<br/>DB\]
        DB2\[プロダクトB<br/>DB\]
        DB3\[プロダクトC<br/>DB\]
    end

    C1 --> Router

    Router --> S1
    Router --> S2
    Router --> S3
    Router --> Trino
    
    S1 --> DB1
    S2 --> DB2
    S3 --> DB3
    Trino -.-> DB1
    Trino -.-> DB2
    Trino -.-> DB3

詳しくは前述の [「「磨き上げる」ことから始まる基盤開発 —— マルチプロダクト戦略を支える従業員データ基盤」](https://tech.smarthr.jp/entry/2026/05/21/142645) をご参照ください。

## EDPにおけるオブザーバビリティの課題

EDPでは分散トレーシングを利用しています。

分散トレーシングとは、1つのリクエストが複数のサービス(プロダクト)を通過して処理される様子を、システム全体にわたって追跡・可視化する仕組みです。  
各プロダクトが個別の処理の情報(スパン)を送り、オブザーバビリティプラットフォーム上(New Relicなど)で、リクエストの開始から完了までの全体を表す、複数のスパンがまとまった情報(トレース)として表示されます。  
各処理が同じトレースに属しているという情報を、ヘッダーを用いてプロダクト間で引き継ぐ「コンテキスト伝搬」という仕組みで実現されています。  
[W3C Trace Context](https://www.w3.org/TR/trace-context/)形式のヘッダーがデファクトスタンダードで、よく使われます。

EDPでは、EDP Routerがトレースの始点になっていて、クライアント-EDP Router-データソースのうち、クライアント-EDP Router間のトレースが途切れていました。  
そのため、エラーや性能問題がどこで発生しているのかが、クライアントからもEDPからも分かりにくい状態でした。  
クライアント側だけではEDP Router以降の詳細を確認できないため、EDP側に原因が疑われる場合には、EDPチームと連携して調査する必要がありました。  
一方、EDPチーム側でも、クライアント側を含むE2Eのレスポンスタイムとその内訳を、1つのトレースからすぐに把握することが困難でした。  
これが今回解決したい課題です。

## クライアント-EDP Router間が途切れているのはなぜ？

初めにクライアント-EDP Router間のトレースが途切れている原因について調査しました。  
その結果、以下のことが分かりました。  
まず、クライアント側では分散トレーシングが有効化されていませんでした。  
そして、クライアントの多くはNew Relic Ruby Agent(今回検証したのは`v10.7.0`)を使っていました。  
New Relic Ruby Agentでは、`config/newrelic.yml`で以下のように設定することで、[分散トレーシングが有効化され、W3C Trace Context形式のヘッダーが差し込まれます](https://docs.newrelic.com/docs/distributed-tracing/concepts/how-new-relic-distributed-tracing-works/)。

common:
  distributed\_tracing:
    enabled: true

また、EDP Routerでも[Apollo Routerの仕様でW3C Trace Context形式のヘッダーを自動で受け取ることができます](https://www.apollographql.com/docs/graphos/routing/observability/router-telemetry-otel)。

この調査結果から、クライアント側で分散トレーシングを有効化すれば、クライアント-EDP Routerのトレースもつなげて見ることができそうです。  
まず手元でEDP Routerを立ち上げ、Apollo GraphQL ExplorerのUIからリクエストを送ってみます。  
UI上でW3C Trace Context形式のヘッダー([traceparentヘッダー](https://www.w3.org/TR/trace-context/#traceparent-header))を付与し、リクエストします。  
New Relic UIで確認すると、トレースIDがtraceparentヘッダーで指定したものになっているはず...と思いきや、全く違うIDが表示されています。  
さらに調査が必要そうです...。

調査したところ、EDP Router-データソース間のコンテキスト伝搬で使っている、Routerのカスタムヘッダーの設定が原因でした。  
過去の経緯をたどると、データソース側でカスタムヘッダーの値をログに出力し、EDPのリクエストをデータソース横断でログ上から追跡できるようにしているようでした。

カスタムヘッダーとは、Apollo RouterがトレースIDをサブグラフ(EDP Routerにおけるデータソース側)へ引き継ぐために任意に指定できるHTTPヘッダーです。  
EDP Routerの設定(config)で以下のように設定できます。(参考: [公式ドキュメント Tracing#propagationの項](https://www.apollographql.com/docs/graphos/routing/observability/router-telemetry-otel/telemetry-pipelines/trace-exporters/overview#propagation))

telemetry:
  exporters:
    tracing:
      propagation:
        request:
          header\_name: <custom-header-name>

指定したカスタムヘッダーがクライアント側から送られてこない場合には、Router内部でトレースIDが生成され、カスタムヘッダーに詰められてデータソースに伝搬されます。  
この時、traceparentヘッダーにも同一のトレースIDがセットされ、データソースに伝搬されます。

このカスタムヘッダーの設定が原因で、クライアントからのリクエストにtraceparentヘッダーの指定があっても、カスタムヘッダーの指定がないとトレースの情報が初期化されるようになっていました。  
Apollo Routerの実装だと[この辺り](https://github.com/apollographql/router/blob/c68f255cab723c27a156b73070a25f753a529bb1/apollo-router/src/plugins/telemetry/mod.rs#L2067)です。

\---
title: クライアント-EDP-データソース間のコンテキスト伝搬状況
---
sequenceDiagram
    participant C as クライアント
    participant R as EDP Router
    participant D as データソース
    participant NR as New Relic

    C-->>NR: Trace ID = A なトレースとして送信
    C->>R: リクエスト<br/>Trace ID = A をセットした traceparentヘッダーあり<br/>カスタムヘッダーなし
    Note over R: カスタムヘッダーの設定があるため<br/>traceparentヘッダーの情報が引き継がれない
    R-->>NR: Trace ID = B なトレースとして送信
    R->>D: リクエスト<br/>Trace ID = B をセットしたカスタムヘッダーで伝搬
    D-->>NR: Trace ID = B なトレースとして送信

EDP Router-データソース間でもtraceparentヘッダーを使うようにすれば良いですが、既に10以上のデータソースがカスタムヘッダーに依存しており、全プロダクトの同時変更は現実的ではありませんでした。

## 現状を破壊しない形でワークアラウンドする

EDP Router-データソース間は既存のカスタムヘッダーでのやり取りを維持しつつ、クライアント-EDP Router間はtraceparentヘッダーでやり取りするようにしたいです。  
Apollo Routerでは、[Rhaiスクリプトを用いて、Routerのリクエスト処理の各ステージをフックに、リクエストやレスポンスの内容を参照・変更できる](https://www.apollographql.com/docs/graphos/routing/customization/rhai)ので、その機能が使えそうです。  
クライアントからカスタムヘッダーは送られていなかったため、以下のようにワークアラウンドし、実現しました。

-   EDP Routerのconfigからカスタムヘッダーの設定を削除
    -   `telemetry.exporters.propagation.request.header_name`の削除
-   Rhaiスクリプトでデータソースへのリクエスト時にカスタムヘッダーを設定する

fn subgraph\_service(service, subgraph) {
    let f = |request| {
        try {
            request.subgraph.headers\["<custom-header-name>"\] = traceid().to\_string();
        }
        catch(err) {
            print(err);
        }
    };
    service.map\_request(f);
}

-   EDP Routerの設定(config)で用意したRhaiスクリプトを読み込むようにする

rhai:
  scripts: "./rhai"
  main: main.rhai

## より望ましい仕様になるようOSSにもPRを出す

ワークアラウンド実装はしましたが、カスタムヘッダー設定がある場合の望ましい仕様とは何でしょうか。  
カスタムヘッダーはないがtraceparentヘッダーがある場合に、traceparentヘッダー由来の情報が失われない、というのが望ましい挙動だと私は考えました。  
例えば、コンテキスト伝搬に用いるヘッダーの切り替え作業を行いたい場合、この挙動の方が都合が良いです。  
そこで、カスタムヘッダー不在時に、traceparentヘッダー由来の情報を引き継ぐようにするPRをApollo Routerに出してみました。

-   [fix(telemetry): preserve existing trace context when custom header is absent or invalid](https://github.com/apollographql/router/pull/9971)

結局このPRはマージされませんでしたが、同様のPRをcommitterが出してくれ、そちらはマージされました。

-   [fix(telemetry): preserve valid W3C trace context when custom trace-id header is absent](https://github.com/apollographql/router/pull/9984)

上記のリリース後にワークアラウンド実装は削除できそうです。

## ついにクライアント-EDP Router間のトレースがつながって見えました！

クライアントに分散トレーシングを有効化してもらい、ついにクライアント-EDP Router-データソースのトレースがつながって見えるようになりました！  
EDPからはもちろん、クライアントからも1つのリクエストを受け取ってから返すまで一貫して見えるようになり、エラーや性能問題の調査が捗りそうです。

## 最後に

今回の対応では、複数のプロダクトや過去の経緯をたどりながら、既存の仕組みを壊さない改善方法を検討しました。  
入社して間もないこともあり、プロダクトを横断して全体像をつかむ難しさはありましたが、その過程で各プロダクトの仕組みや基盤開発ならではの面白さを知ることができました。  
また、これまで本格的に扱ったことのなかったNew Relicや分散トレーシングへの理解も深まり、学びの多い取り組みになりました。  
今回つながったトレースを今後のエラー調査や性能改善に活用し、EDPをより良いものにしていければと思います。

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

オブザーバビリティ向上を通じてプロダクト品質を向上させたい方、プロダクトを良くするためにOSSへのコミットをやっていくぞ！という気概がある方、大歓迎です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)