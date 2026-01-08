---
title: "ウェブの新機能はいつまで待てば実践投入できるか"
source: "https://ics.media/entry/250422/"
publishedDate: "2025-04-22"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

2025年4月22日 公開 / [株式会社ICS 西原 翼](https://ics.media/entry/staff/nishihara/)

ウェブ開発に関するHTML、CSS、JavaScriptの新機能は次々と登場します。このような新機能を紹介したブログ記事やSNSを見たことがあるかもしれません。新機能は、開発コストやユーザーエクスペリエンスを向上させるために重要ですが、ブラウザ側の対応状況により、すぐには導入できない場合もあります。本記事では、ウェブの新機能を実践投入するまでのプロセスとそのタイムラインについて考察します。

### 結論：新機能を取り入れる際の対応ブラウザの指針

まずは結論として、新機能を導入する際は次の3つの指針で判断していくと良いと考えます。

-   最新機能を取り入れつつメジャーなゾーンをカバーする：Chrome・Edgeの最新3バージョン、Safariの最新2世代のメジャーバージョン
-   最新機能を取り入れつつも、より幅広い対応を考える：上記に加えFirefoxの最新3バージョンとSafariの最新3世代のメジャーバージョン
-   多くのブラウザでの対応を考える：直近2年半にリリースされたモダンブラウザ

![](https://ics.media/entry/250422/images/images/250423_conclusion.png)

この結論に至った視点や観点を解説します。

### ブラウザ互換性情報

実践投入可能かの判断に一番大事なのはブラウザの互換性です。その機能がどのブラウザで使えるかを確認するブラウザ互換性情報は [Can I use…](https://caniuse.com/)と[MDN Web Docs](https://developer.mozilla.org/ja/)の2つが有名です。

![](https://ics.media/entry/250422/images/images/250423_caniuse.jpg) [Can I use…](https://caniuse.com/)

![](https://ics.media/entry/250422/images/images/250423_mdn.jpg) [MDN Web Docs](https://developer.mozilla.org/ja/)

ブラウザ互換性情報に関してはこの2サイトが支えているといっても過言ではありません。いずれのサイトも有志による情報提供で成り立っています。これらのサイトで使いたい機能がどのブラウザで対応しているのかを確認できます。とくにCan I use…は「Date relative」表示にすると時間軸で対応状況を確認できるので、一番最後のブラウザが対応してからどれくらい経過したかなども確認できます。

![対応状況をブラウザのバージョンと時系列で表している](https://ics.media/entry/250422/images/images/250423_date.jpg)

### Baselineという指標

互換性情報の指標の1つに「Baseline」という指標があります。これは、ある機能がChrome、Edge、Safari、Firefoxで対応が始まってから**どの程度経過しているか**を示す指標です。対応状況についてはさきほどのMDNにある互換性情報を元に作られています。Baselineには以下の3つの指標があります。

-   Widely available
-   Newly available
-   Limited availability

![](https://ics.media/entry/250422/images/images/250423_baseline.png)

Widely availableは広く利用可能であることを表しています。具体的には一番最後にサポートしたブラウザのリリースから30か月（2年半）以上経過していることを示しています。

Newly availableは新しいブラウザなら利用可能であることを表しています。こちらはすべてのブラウザで対応してからまだ30か月経過していないことを示しています。つまり全ブラウザが対応してからまだ1か月しか経っていないものもあれば、2年以上経っているものもあります。また「Newly available 2025」というように年がついた表記もあります。これは2025年にリリースされたブラウザで利用可能になったことを示しています。

Limited availabilityは最新のブラウザでも利用可能なブラウザが限られていることを表しています。

これらの指標は新機能導入の大きな手がかりとなるでしょう。たとえば、「Widely available」となった機能を採用する、といったアプローチもとれます。しかし、Widely availableは2年半もの猶予期間があるので少し保守的な姿勢にも思えます。新しい機能の中には開発コストを下げるものもあるので、できるだけ早く導入したいというニーズもあるでしょう。そういった場合はもう少し詳しく見ていく必要があります。

### 各ブラウザのシェア率から考える

ブラウザのシェア率についても大事です。ある機能が特定のブラウザで使えなかったとしても、そのブラウザのシェア率が十分低ければ影響は小さいでしょう。国内におけるブラウザのシェア率はStatCounterのデータが参考になります。

-   [StatCounter Global Stats](https://gs.statcounter.com/)

![](https://ics.media/entry/250422/images/images/250423_statcounter.jpg)

以下のグラフはStatCounterのデータから作成した国内のブラウザ別のシェア率です。2025年3月時点ではChrome・Safari・Edgeで9割以上のシェアを占めています。

![2024年3月〜2025年3月のブラウザ別のシェア率。2025年3月時点ではChromeが57.39%、Safariが25%、Edgeが10.23%、Firefoxが3.44％となっている](https://ics.media/entry/250422/images/images/250423_share.png)

[出典：Browser Market Share Japan Mar 2024 - Mar 2025より作成](https://gs.statcounter.com/browser-market-share/all/japan/#monthly-202403-202503)

なお、ChromeとEdgeは同じChromiumをベースとしているためサポートしている機能状況はほぼ同じです。そのため、ChromeとSafariを考慮すれば国内ユーザーの9割以上に対応できると考えられます。この割合を十分とみるか不十分とみるかはサイトの性質や目的、ビジネス要件などと相談が必要です。

また、自サイトのアクセス解析を確認することで、実際に自サイトに訪問しているユーザーのブラウザシェア率を確認することもできます。Google Analyticsをはじめとしたツールを使うことで、ユーザーのブラウザ情報を確認できます。サイトの特性により一般的なシェア率から乖離がある場合はそちらのデータを参考にするのも良いでしょう。

### ブラウザのバージョンから考える

StatCounterはブラウザ種別だけでなく、バージョン別にも見られるので**どの程度の時間で最新版へと推移していくか**も確認できます。

![2024年3月〜2025年3月のブラウザのバージョン別のシェア率推移。いずれのブラウザもブラウザごとにギザギザのグラフになっている。](https://ics.media/entry/250422/images/images/250423_version_share.png)

[出典：Browser Version Market Share Japan Mar 2024 - Mar 2025より作成](https://gs.statcounter.com/browser-version-market-share/all/japan/#monthly-202403-202503)

リリースサイクルの早いChromeやEdge、Firefoxは新しいバージョンの増加とともに古いバージョンのシェア率が減少していくギザギザの線グラフを描いています。これは新しいバージョンがリリースされると、古いバージョンのユーザーが新しいバージョンに移行していくことを示しています。リリースからおよそ3か月経つとシェア率がかなり減ります。このことから、ChromeとEdge、Firefoxについては最新3バージョンを対象とすればほぼ網羅できると言えるでしょう。

SafariはChromeに比べるとリリースサイクルは遅いですが、こちらもギザギザの線グラフを描いています。しかし、山が少しなだらかであり、移行に時間がかかっているのがわかります。SafariはOSのバージョンに依存しているため、OSのバージョンアップが行われない限り古いバージョンのSafariは残り続けます。

また、興味深いのは2025年3月末時点で最新から2バージョン前のSafari 16系のシェアも全体からみると少ないですが一定数あることです。この要因のひとつに古いiOS端末は最新のOSにアップデートできないことが挙げられます。たとえば2017年に発売されたiPhone XはiOS 17にアップデートできません。そのためSafari 16系のシェアがアップデートの山とは関係なく一定数表れてきます。

Safariに関しては最新メジャーバージョンに加えもう1つ前のメジャーバージョンも考慮する必要があるでしょう。より幅広く対応するなら2つ前のメジャーバージョンまで考慮しても良いかもしれません。

Safariは毎年秋のOSのメジャーバージョンの更新と、マイナーバージョンの更新の2種類があります。とくに春のはマイナーバージョンにもかかわらず、大量の機能のリリースが恒例となっています。そのため同一メジャーバージョンの中でも初期と後期では対応している機能が大きく違うこともあります。冒頭の結論ではOSに基づくメジャーバージョンによる区切りでしたが、より詳細に定める場合にはマイナーバージョンまで考慮する必要があるでしょう。

### 大手サイトの対応状況

大手サイトが推奨する閲覧環境も参考になります。たとえば、「誰一人取り残されない、人に優しいデジタル化」を目指すデジタル庁はChrome、Edge、Safari、Firefoxの最新バージョンを推奨しています。

[サイトポリシー | デジタル庁](https://www.digital.go.jp/site-policy)

ほかにも以下のサイトが最新のバージョンのブラウザを推奨閲覧環境としています。

-   [東京都](https://www.metro.tokyo.lg.jp/policy)
-   [横浜市](https://www.city.yokohama.lg.jp/aboutweb/usage/kankyo.html)
-   [Yahoo! JAPAN](https://support.yahoo-net.jp/PccYjcommon/s/article/H000011350)
-   [Amazon](https://www.amazon.co.jp/gp/help/customer/display.html?nodeId=TRnKWyzLgfCaEbYfuv)
-   [YouTube](https://support.google.com/youtube/answer/78358?hl=ja)

銀行のオンラインバンキング推奨環境を見てみると、デスクトップ環境とモバイル環境で分けて記載しています。デスクトップに関しては最新バージョンのブラウザとしていますが、モバイルに関してはOS別の記載があります。対応OSは2〜3世代前のものまで対応しています。

-   [三菱ＵＦＪ銀行](https://direct.bk.mufg.jp/dousa/)
-   [みずほ銀行](https://www.mizuhobank.co.jp/direct/environment.html)

Internet Explorerは2022年に公式のサポートが切れているため対応しているところはありません。またEdgeのIEモードも新規のウェブサイトでは対応する必要はありません。サービス側が推奨するものとしてはセキュリティが担保されている最新バージョンのブラウザであることが妥当でしょう。

#### コラム：Firefoxを対応するか？

Chrome・Safari・Edgeについでシェア率が高いのはFirefoxです。しかしそのシェア率は多くても5%程度です。シェア率が低いこともあり、サービスの完全性を保証するコストを考えると悩ましいところでもあります。実際に以下のサイトではFirefoxのサポートを対象外としています。

-   [NHK](https://www.nhk.or.jp/rules/requirements/)
-   [PASMO](https://www.pasmo.co.jp/term/)
-   [PayPay銀行](https://www.paypay-bank.co.jp/spec/index.html)
-   [e-Tax 国税電子申告・納税システム](https://www.e-tax.nta.go.jp/e-taxsoftweb/e-taxsoftweb1.htm)

Firefoxのいちユーザーである筆者としては悲しいところもありますが、Chromeなどの代替手段を用意できることを考えると仕方ない気もします。また、Firefoxに対応していないことで問題や騒ぎになっていないのをみると、社会的にも許容範囲といえるのかもしれません。

その一方でFirefoxに限らず、自身の望むブラウザや環境でウェブを閲覧できるというのはアクセシビリティの観点からも大事なことです。マイナーブラウザへの対応もアクセシビリティという観点から考えてみるのも良いかもしれません。

### 結論

以上を踏まえ、以下の結論に至りました。

-   最新機能を取り入れつつメジャーなゾーンをカバーする：Chrome・Edgeの最新3バージョン、Safariの最新2世代のメジャーバージョン
-   最新機能を取り入れつつも、より幅広い対応を考える：上記に加えFirefoxの最新3バージョンとSafariの最新3世代のメジャーバージョン
-   多くのブラウザでの対応を考える：BaselineのWidely availableな技術を基本とした直近2年半にリリースされたモダンブラウザ

![](https://ics.media/entry/250422/images/images/250423_conclusion.png) （冒頭のものを再掲）

### 将来の互換性とInterop

ここまでは現在の互換性について考えてきました。ここからは将来の互換性について考えてみます。1ブラウザのみが対応している機能もやがて時間とともに他のブラウザで利用可能になります。しかし対応までの時間にはバラつきがあります。そこで参考になるのがInteropという取り組みです。

[Interop](https://wpt.fyi/interop-2025)

![Interop 2025のダッシュボード。各ブラウザでの対応度の進捗率や表が載っている。](https://ics.media/entry/250422/images/images/250423_interop.jpg)

Interopはウェブ機能の相互互換性を高め、ユーザーと開発者にとっての利便性を向上させる取り組みです。Interopが取り上げた機能は、主要なブラウザベンダーが優先的に実装を進めていきます。つまりInteropに採用された機能は年内にも利用できる可能性があります。Interopのダッシュボードには現時点での各ブラウザの対応度の進捗率が掲載されています。

たとえばInterop2025ではCSS Anchor positioningやView Transition APIが重点対象として採択されています。2025年3月末時点ではCSS Anchor positioningはChrome、Edgeでのみ、View Transition APIはChrome、Edge、Safariで対応しています。これらの機能もそう遠くないうちに全ブラウザで対応することでしょう。

新機能採用のために特定のブラウザを切り捨てたとしても、Interopに採用された機能であれば比較的早期にカバーできます。柔軟なブラウザ対応の考え方のためにもInteropのような将来の互換性について着目してもよいでしょう。

### 将来の仕様

Interopは既存の仕様を対象とした取り組みですので、新しい仕様を決めるものではありません。新しい仕様はHTMLならWHATWG、CSSはW3C、JavaScriptはECMA Internationalという各種標準化団体によって決まります。今後策定される仕様などは以下のサイトで確認できます。

-   HTML: [HTML Standard, Edition for Web Developers](https://html.spec.whatwg.org/dev/)
-   CSS: [CSS current work & how to participate](https://www.w3.org/Style/CSS/current-work)
-   JavaScript: [TC39 - Specifying JavaScript.](https://tc39.es/)

ここで議論されているような機能はまだブラウザで実装すらされていないものもありますが、未来の機能の先取りとして考えるのも良いでしょう。

### まとめ

ウェブの新機能を実践投入するまでのプロセスは、ブラウザの互換性情報やシェア率、バージョンなどを考慮することで判断できます。どこまでカバーするかはサイトの性質や目的、ビジネス要件、コストなどと相談が必要ですが、先の3つの指針は1つの指標になるかと思います。

また、Interopのような取り組みを参考にすることで、将来の互換性を考慮した技術選定も可能になります。新しい機能はウェブサイトのユーザービリティの向上や開発コストの削減につながるので、ぜひ実践投入するときの参考にしてみてください。