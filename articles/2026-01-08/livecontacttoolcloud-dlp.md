---
title: "LiveContactToolにおける機微情報の取り扱い~Cloud DLPを使ったマスキング"
source: "https://engineering.mercari.com/blog/entry/20251208-b7adaa9b98/"
publishedDate: "2025-12-10"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリでソフトウェアエンジニアをやっている[@sters](https://twitter.com/sters9)です。

この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/) の10日目の記事です。

## LiveContactTool

LiveContactToolとは、カスタマーサービスのオペレーターがチャット応対に使用するシステムです。 “Effortless Customer Experience Project” というプロジェクトで、“世界中のメルカリのお客さまのお困りごとを 5 分で解決する” というゴールへ向かうために開発しているシステムです。

先日行われた、Mercari Gears 2025 でも関連するセッションがありました。こちらもぜひご覧ください！

[https://speakerdeck.com/mercari/mercari-gears-2025-transforming-customer-engagement-with-google-customer-engagement-suite](https://speakerdeck.com/mercari/mercari-gears-2025-transforming-customer-engagement-with-google-customer-engagement-suite)

## 機微情報

機微情報とは「個人情報のうち、特に取り扱いに注意すべき情報」として取り扱いが定められている情報です。「[金融分野における個人情報保護に関するガイドライン](https://www.ppc.go.jp/personalinfo/legal/kinyubunya_GL/#a5)」では次のように書かれています。

> 法第２条第３項に定める要配慮個人情報並びに労働組合への加盟、門地、本籍地、保健医療及び性生活（これらのうち要配慮個人情報に該当するものを除く。）に関する情報（本人、国の機関、地方公共団体、学術研究機関等、法第57条第１項各号に掲げる者若しくは施行規則第６条各号に掲げる者により公開されているもの、又は、本人を目視し、若しくは撮影することにより取得するその外形上明らかなものを除く。

LiveContactTool以前のお問い合わせ応対の中でも、そういった情報が添付された場合には、該当の情報を削除できるような仕組み・フローが整備されています。ただしオペレーターによる手動での対応がメインのため、オペレーターの作業工数もかかっていました。

## Cloud DLP

Cloud DLPとは、GCPのプロダクトのひとつで、Data Loss Prevention (DLP)を行うためのソリューションです。

DLP とは 機密データを監視、保護をして、流出や悪用されることから守りましょう、というツール、プロセス、あるいは総称のソリューションです。保護の方法として、マスキング、難読化、匿名化をしてリスクの軽減を行うことができます。

Cloud DLPはGCPの様々なプロダクトと連携して、自動的にDLPの処理を行うことができます。

詳しくは公式のドキュメントを読んでいただくとよいでしょう。

[https://cloud.google.com/security/products/dlp?hl=ja](https://cloud.google.com/security/products/dlp?hl=ja)

LiveContactTool上での機微情報の取り扱いにおいて、このCloud DLPを含めて様々な方法を検討しました。

前提として、手動での機微情報削除はオペレータの工数を取ってしまうため、リアルタイムなオペレーションが必要なチャット応対ではあまりやりたくありませんでした。また、手動での機微情報削除のためのリッチなシステムを構築する必要があることも採用しにくい理由でした。

結果として、Cloud DLPを自動化された機微情報削除のシステムとして採用することにしました。この理由はいくつかあります。

-   LiveContactTool上だけでなく、チャット応対として利用するCCaaSやConversational AgentsともCloud DLPと連携できる
-   様々な情報がデフォルトでサポートされている
    -   国ごとに固有の情報もサポートされている
    -   辞書や正規表現でカスタマイズ可能
-   “マイナンバー” が前後10文字以内にあること、のようなホットワードを設定できる
-   画像ファイルのDLPを行うことができる
-   APIでの即時実行と、ジョブによる非同期実行がサポートされる
    -   ジョブトリガーを設定して永続的に実行しつづけることも可能
-   マネージドサービスのため、コンピューティングに関する管理が不要
-   PoCしたところ、マスキングの精度が期待を満たしていた

## LiveContactToolでCloud DLPをどのように使うか

簡略化したものですが、Cloud DLPまわりの全体像がこちらです。

[![](https://storage.googleapis.com/prd-engineering-asset/2025/12/54125b1c-image-1024x698.png)](https://storage.googleapis.com/prd-engineering-asset/2025/12/54125b1c-image.png)

現状では、チャットが終わり次第DLPを実施するようにしています。

## テキストのマスキング

テキストデータを送るとDLP処理をしたテキストデータを返すAPIがあります。これをつかってチャットメッセージをマスキングしています。

[https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.content/deidentify](https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.content/deidentify)

1つのチャットメッセージは1つのSpanner上のレコードで管理しています。1つのセッションで複数のチャットメッセージが入ります。これをそのままCloud DLPのAPIで1つメッセージずつ処理しようとした場合、Cloud DLPのAPI呼び出しクオータの制限に引っかかってしまいます。

そこでチャットメッセージを結合し、一定の長さの文字列にまとめてCloud DLPのAPIを呼び出すようにしています。実際にはctxや、API呼び出しのエラーハンドリング等諸々がありますが、やっていることはこんな感じです。

```
type deidentifyTarget struct {
    index   int
    content string
}

func deidentifyMessages(messages []string) []string {
    result := make([]string, len(messages))
    copy(result, messages)

    separator := generateSeparator()

    var batches [][]deidentifyTarget
    var currentBatch []deidentifyTarget
    var currentSize int

    // バッチ処理のために文字列長を計算してまとめる
    for i, content := range messages {
        size := len(content)
        if len(currentBatch) > 0 {
            size += len(separator)
        }
        if currentSize+size > maxBatchSizeBytes && len(currentBatch) > 0 {
            batches = append(batches, currentBatch)
            currentBatch = nil
            currentSize = 0
        }
        currentBatch = append(currentBatch, deidentifyTarget{index: i, content: content})
        currentSize += size
    }
    if len(currentBatch) > 0 {
        batches = append(batches, currentBatch)
    }

    // 各バッチについてCloudDLPのAPIを呼び出す
    for _, batch := range batches {
        var parts []string
        for _, t := range batch {
            parts = append(parts, t.content)
        }
        combined := strings.Join(parts, separator)

        apiResult := callCloudDLP(combined)
        deidentified := strings.Split(apiResult, separator)
        for j, t := range batch {
            result[t.index] = deidentified[j]
        }
    }

    return result
}
```

## 画像のマスキング

画像のバイナリを送るとDLP処理をしたバイナリを返すAPIがあります。

[https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.image/redact](https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.image/redact)

しかし、アプリケーションのメモリやネットワーク帯域を使うことになります。またCloud DLP側のファイルサイズの制限もあり、4MBとなっています（[参考](https://docs.cloud.google.com/sensitive-data-protection/limits)）。この都合のためにジョブを使うようにしています。実装としては、アプリケーションはCloud DLPのジョブを作成するAPIを呼び出しています。

[https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.dlpJobs/create](https://docs.cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.locations.dlpJobs/create)

ジョブを使うことで非同期にCloud DLP内で処理を行います。ファイルサイズや画像の量にも依存すると思いますが、今のところ、数秒〜30秒くらいで処理が終わっているようで、そこまで大きな遅延や問題は起きていません。

Cloud DLP終了時のイベントをアプリケーション側で受け取れるので、それを利用してSpanner上のデータを更新しています。

## Cloud DLPの設定管理

DLP処理を実施するAPIでは、どのように検査やマスキングを行うかを直接指定することができます。しかし、これでは設定がアプリケーションに閉じてしまい、他のアプリケーションやシステム全体から利用することが困難になります。

そこでTerraformを使い、CustomInfoType、InspectTemplate、DeidentifyTemplateを定義するようにしました。このようなterraformを書いてリソースを作成しています。

```
resource "google_data_loss_prevention_stored_info_type" "custom_regexp_infotype" {
  parent = "projects/gcp-project-id-production/locations/us"

  stored_info_type_id = "CUSTOM_REGEXP_INFOTYPE"
  display_name        = "CUSTOM_REGEXP_INFOTYPE"
  description         = "Custom InfoType using regexp"

  regex {
    pattern = "(?:${join("|", local.dlp_phrases.phrases)})"
  }
}

resource "google_data_loss_prevention_inspect_template" "dlp_inspect_template_for_text_content" {
  parent = "projects/gcp-project-id-production/locations/us"

  template_id  = "inspect_template_for_text"
  display_name = "Inspect template for text"
  description  = "DLP Inspect Template for text content with built-in and custom InfoTypes"

  depends_on = [
    google_data_loss_prevention_stored_info_type.custom_regexp_infotype,
  ]

  inspect_config {
    min_likelihood = "UNLIKELY"
    info_types {
      name = "LOCATION"
    }
    info_types {
      name = "CUSTOM_REGXP_INFOTYPE"
    }
  }
}

resource "google_data_loss_prevention_deidentify_template" "replace_with_detected_infotype_for_text" {
  parent = "projects/gcp-project-id-production/locations/us"

  template_id  = "replace_with_detected_infotype_for_text"
  display_name = "Mercari Contact Replace with detected InfoType for text"
  description  = "Deidentify template that mask data with detected InfoType for text"

  deidentify_config {
    info_type_transformations {
      transformations {
        primitive_transformation {
          replace_with_info_type_config = true
        }
      }
    }
  }
}
```

terraformで作ったリソースを、APIの呼び出し時のパラメータに指定することができます。これで、terraformで管理するDLP設定を使った、検査・マスキングを行います。

```
func (c *client) DeidentifyStringWithTemplate(
    ctx context.Context,
    input string,
    inspectTemplateName string,
    deidentifyTemplateName string,
) (string, error) {
    req := &dlppb.DeidentifyContentRequest{
        Parent:                 c.parentResource,
        InspectTemplateName:    inspectTemplateName,
        DeidentifyTemplateName: deidentifyTemplateName,
        Item: &dlppb.ContentItem{
            DataItem: &dlppb.ContentItem_Value{
                Value: input,
            },
        },
    }

    res, err := c.dlpClient.DeidentifyContent(traceCtx, req)
    if err != nil {
        return "", err
    }

    return res.GetItem().GetValue(), nil
}
```

## 精度をあげるために

組み込みのInfoTypeではうまく判定されないものがあったり、正規表現や辞書での定義をすり抜けたり、あるいは間違ってマスキングされたり、といったことが起こります。そういったものをチャット応対のオペレーション中に見つけた場合、即時に対応する方針はありますが、それだけでは不十分です。

そこで定期的に内容をサンプリングし、おかしなものが無いかをチェックすることにしました。

-   ランダムにチャットメッセージを抽出し、マスキング漏れがないかを確認
-   ランダムにマスキングされたチャットメッセージを抽出し、過剰なマスキングがないかを確認

先日のサンプリング調査では、配送番号がクレジットカードやマイナンバーとして判定されてしまい、マスキングされるケースが見つかりました。配送番号がわからなくなってしまうとオペレーションに不都合が出てしまうため、このマスキングはされないように調整することが必要です。これについては、Cloud DLPのテンプレート、InfoTypeの辞書や正規表現、ホットワードを見直すことで改善をしました。

また、検討レベルの段階ですが、システム面でモニタリングの実現可能性も探っています。Cloud DLPでは様々なメトリクスを取ることができ、何をどのくらいの一致の可能性で検出したのか、結局マスキングをしたのかしてないのか、といった情報がわかります。これらを使ったとしても、マスキング漏れや過剰なマスキングがなされていないか？を正確に知ることは難しいと思いますが、全体の傾向はわかるはずです。機微情報のモニタリングをするという点で、有用な情報になりそうだと思っています。

## おわりに

LiveContactToolではCloud DLPを使って機微情報をマスキングしています、という説明をしました。

Cloud DLPを使うことは初めてだったのですが、技術的な設計・実装以上に「機微情報をシステムとしてどう定義し、運用していくか」に難しさを感じました。これにはエンジニアメンバーだけではなく、関連するチームも巻き込んで、モニタリングしていく体制もセットで整備が必要でしょう。

このように書くと大変そうではありますが、Cloud DLPはAPIやデータ構造の仕組みが使いやすく、様々なGCPプロダクトと連携できるのが魅力的です。フルマネージドサービスのため、細かいメンテナンスが不要なのも大きなメリットだと思います。このようにシステム面から、機微情報の取り扱いを簡単にできるようにしてくれるプロダクトだと思います。機会があればぜひ使ってみてください。

そして明日12/11の記事は @kgoro です。引き続きお楽しみください。