---
title: "ライブラリ更新から始まるOSS貢献 —— AIで下がった貢献ハードル"
source: "https://tech.smarthr.jp/entry/2026/02/16/111820"
publishedDate: "2026-02-16"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr"
---

![ライブラリ更新から始まるOSS貢献 —— AIで下がったハードル](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260215/20260215073935.png)

こんにちは、プロダクトエンジニアの[a2c](https://x.com/a2c_dev)です！本記事では、日常のライブラリ更新作業の延長線上で、自然にOSS（Open Source Software）へ貢献する機会が生まれた経験について紹介します。

具体的には、テストデータ生成ライブラリである [Faker](https://github.com/faker-js/faker) の日本語 locale にデータを追加し、Pull Request を出すまでに考えていたことや判断基準を共有します。  
「OSS貢献に興味はあるけれど、なかなか最初の一歩が踏み出せない」という方に少しでも参考になれば嬉しいです！

本題に入る前に、今回扱ったFakerについて簡単に紹介します。

## Faker とは

Faker はテストデータ生成ライブラリで、人名や住所、会社名などのダミーデータを生成できます。70以上のlocale（言語・地域設定）に対応しており、日本語を含む各言語に適したリアルなデータを生成できます。Faker の locale 定義は単純なデータ配列なので、日本語の値を追加するだけで機能するようになります。

私は、OSSへの貢献機会が見つかれば積極的にPull Requestを出していく（いきたい🔥）タイプのエンジニアですが、これまで決してOSSの経験が豊富だったわけではありません。大体ですが年に1〜2件PRを出すか出さないか、という程度でした。

これまでOSSに向き合う中で、主に次の2つを課題として感じていました。

-   コードの理解や実装のハードル
-   貢献チャンスの発見

特に後者の「どこに貢献できるのかを見つけること」は非常に難しく、Issueを探しても `good first issue`（初心者向けのタスク）はすでに誰かが着手していることが多く、なかなか行動につながらない状況でした。

## AIによって下がったOSS貢献のハードル

一方で近年、AIの進化によってOSS貢献を取り巻く環境は大きく変わってきたと私は感じています。

-   初見のコードベースでも全体像を把握しやすくなった
-   実装方針の壁打ちができる
-   英語でのIssueやレビューコメントへの心理的ハードルが下がった

「コードを読む・書く」という観点では、以前よりも明らかに行動しやすくなりました。私はCursorのPlanモードを積極的に使って、実装前に方針を確認することで、初見のコードベースでも安心して作業を進められています。 その結果として、残るハードルは「取り組む課題(issue)をいかに見つけるか？」という点に集約されてきたように思います。

## 更新作業で見つけた貢献チャンス

私はライブラリをアップデートする際に、CHANGELOGやリリースノートを確認し、影響範囲を調査するようにしています。今回SmartHRのプロダクトでFakerを更新しているときに、ふとGitHubで[`src/locales/ja`](https://github.com/faker-js/faker/tree/main/src/locales/ja)ディレクトリを開いて、英語locale（`en`）と比較してみました。すると、`person/suffix.ts`（敬称）や`person/job_title.ts`（職業）、`food`モジュール、`color`モジュールなど、多くの項目が空配列のまま未定義になっていることに気づきました。

正直なところ、業務上すぐに困っていたわけではありません。ただ、差分が小さく、影響範囲も明確で、レビュワーにとっても確認しやすい状態だったのでFakerへの初めてのPRとして最適な課題だと判断し、Pull Requestを出すことにしました。

[CONTRIBUTING.md](https://github.com/faker-js/faker/blob/next/CONTRIBUTING.md)を確認すると「localeのデータを追加するだけならIssueを立てなくても良い」と記載されていたことも後押しになりました。ちなみに、SmartHRでは、業務で利用している依存ライブラリの改善に貢献することについて、特別な承認プロセスは必要ありません。長期的に見て、プロダクト開発にもプラスになる活動だと考えられています。

## 実際に出したPull Request

今回作成したPull Requestは以下の通りです。最初のPRを出すときは「海外のメンテナーにちゃんと伝わるかな…」と少し緊張しましたが、どれも日本語のデータを追加するだけのシンプルなものなのですが、言語によっては出力される形式が異なるため、その部分の修正が必要かどうかは個別に判断する必要がありました。勢い余って短期間にたくさんのPRを出してしまいましたが、レビュワーの負担をできる限り下げるために、小さい単位でPRを出すようにしています。

-   [feat(locale): add Japanese suffix definitions for person module](https://github.com/faker-js/faker/pull/3704)
-   [feat(locale): add Japanese job definitions for person module](https://github.com/faker-js/faker/pull/3705)
-   [feat(locale): add Japanese food module](https://github.com/faker-js/faker/pull/3706)
-   [feat(locale): add Japanese color definitions](https://github.com/faker-js/faker/pull/3707)
-   [feat(locale): add Japanese internet definitions](https://github.com/faker-js/faker/pull/3708)

## 世界中のエンジニアとのやり取りもOSSの醍醐味

OSSの面白さの一つは、世界中のエンジニアとやり取りできる点だと思います。今回、レビュワーから「PRの粒度が適切で、レビューしやすい」「コミットメッセージが明確で意図が伝わりやすい」といったフィードバックをもらうことができました。SmartHRで日頃から意識している開発の考え方やプラクティスが、そのままOSSの世界でも通用したように感じられて、素直に嬉しかったです。

![May i just say this is a great example of a pull request!  Does one thing Carefully explained, why you made certain choices, Passes all tests](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260215/20260215072933.png)

良いPRの例だとホメをいただきました

## SmartHRでの開発文化

SmartHRでは、業務で利用しているOSSに問題や改善余地を見つけた場合、Pull Requestを出すことが自然に推奨される文化があるように感じます。社内では「OSSやっていきの会」といったイベントや、OSS Gateをアレンジしたワークショップも開催されており、OSSへの貢献を後押しする仕組みが存在しています。また、[ガイドライン](https://github.com/kufu/smarthr-oss-guideline/blob/main/GUIDELINE.jp.md)も整備されています。こうした環境があることで、日常業務の延長としてOSSへの還元が自然に行えていると思います。

参考記事：

-   [SmartHRのOSSガイドラインを公開しました - SmartHR Tech Blog](https://tech.smarthr.jp/entry/2022/12/14/121323)
-   [SmartHRのOSS活動、登壇活動を盛り上げるべく、「OSSやっていきの集い」が立ち上がりました - SmartHR Tech Blog](https://tech.smarthr.jp/entry/2024/07/25/115328)
-   [OSSと仲良くなるために、OSS Gateをアレンジして社内開催しました - SmartHR Tech Blog](https://tech.smarthr.jp/entry/2025/01/21/150850)

## まとめ

今回の経験で一番強く感じたのは、「OSS貢献のチャンスは意外と身近にある」ということでした。特別なIssueを探し回らなくても、日々のライブラリ更新作業の中に貢献の種は転がっています。 そして、AIツールの進化は本当に心強い味方です。初見のコードベースを読むときの「どこから手をつければ…」という不安が、大幅に軽減されました。完璧を目指さず、まずは小さな一歩を踏み出してみる。それがまた次の貢献につながると実感しています。

今後は大きな機能追加やバグ修正をやってみたい気持ちがありますが、決してそれだけがOSS貢献ではないと思います。どんな改善でも、多くの開発者が気づいたことややったほうがいいよねと思えることを行えば、OSSのエコシステム全体が良くなり、間接的には世の中を少しずつ良くしていくことができると思います。 次にライブラリを更新するとき、少しだけいつもよりも深くコードを覗いてみると、思わぬ貢献チャンスが見つかるかもしれません。

## We are hiring!

SmartHRでは、こうしたOSS貢献を楽しみながら働きたいエンジニアを募集しています。ご興味のある方は以下のリンクをご覧ください！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)