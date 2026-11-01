---
title: "Chromaticのコストを下げたいっ！ —— TurboSnapが効かない原因と、その対策"
source: "https://tech.smarthr.jp/entry/2026/10/29/163317"
publishedDate: "2026-10-29"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは、SmartHRでプロダクトエンジニアをしている[@nabeliwo](https://x.com/nabeliwo)です。

SmartHRでは、多くのプロダクトが[Chromatic](https://www.chromatic.com/)を使ってVRT（Visual Regression Testing）をしています。詳しくは後述しますが、Chromaticは撮影したスナップショットの枚数で課金されるので、気づかないうちにコストが膨らんでいることがあります。私の所属しているチームが開発している給与計算機能でも、約720個あるストーリー（[Storybook](https://storybook.js.org/)で、コンポーネントの表示パターンを1つずつ定義したもの）を、ストーリーの変更とは関係なくすべて撮影し直すビルドが半分近くありました。

調べてみると、原因はテストの範囲が広すぎることではなく、不要な全件撮影と重複した実行でした。給与計算機能では、全件撮影になるビルドの割合が、8月期の43.1%から、2つの対策を入れたあとの9月29日〜10月10日には8.5%に下がりました。あるビルドでは、撮影枚数が720枚から20枚になりました。

この記事では、ChromaticのTurboSnapが効かない原因と、その対策を紹介します。給与計算機能で私が対応したことを中心に、ほかのプロダクトのチームの事例もあわせて紹介します。同じように「なぜか撮影枚数が減らない」と悩んでいる方の参考になれば幸いです。

VRTは、UIのスクリーンショットを前回のものと比べて、見た目の意図しない変化を見つけるテストです。CSSの修正やライブラリのアップデートで、画面の見た目が思わぬ形で崩れていないかを、手作業の確認だけに頼らずに検知できます。

Chromaticは、Storybookのストーリーを撮影して、前回との差分をレビューできるサービスです。Storybookのメンテナーが開発しています。Pull Requestごとに撮影を走らせ、差分があれば画面上で確認して承認する流れで、VRTを運用できます。

SmartHRでのVRTの導入については、過去の記事でも紹介しています。

[tech.smarthr.jp](https://tech.smarthr.jp/entry/2023/09/25/120209)

## TurboSnapで撮影を必要なストーリーに絞る

Chromaticは、ビルドのたびにストーリーを撮影し、祖先にあたるビルドのスナップショットと比べて差分を見つけます。何もしなければ、ビルドのたびに全ストーリーを撮影することになります。

TurboSnapは、この撮影を必要なストーリーだけに絞る、Chromaticの機能です。変更されたファイルからimportの依存をたどり、影響を受けるストーリーだけを撮影します。影響を受けないストーリーは、前のビルドのスナップショットをコピーして使います。

ただし、TurboSnapは条件によっては依存をたどるのをあきらめて、全ストーリーを撮影します。これをBailと呼びます。Bailの理由はいくつかあり、この記事で主に扱うのは次の2つです。

-   changedStorybookFiles
    -   `.storybook/`配下のファイル（`preview.tsx`など）か、その依存に含まれるファイルが変更された
-   changedPackageFiles
    -   `package.json`やlockfileが変更され、依存しているパッケージが変わった可能性がある

ほかにも、比較の基準になる祖先のビルドが見つからない場合などにBailします。

TurboSnapが撮影するストーリーを決める流れをまとめると、次の図のようになります。

\---
title: TurboSnapが撮影するストーリーを決める流れ
---
flowchart TD
    Changed\[変更されたファイル\] --> Trace{importをさかのぼると<br/>どこにたどり着くか}
    Trace -->|ストーリーにたどり着く| Story\[そのストーリーだけを撮影\]
    Trace -->|.storybook/配下にたどり着く| Bail\[Bail：全ストーリーを撮影\]
    Story --> Copy\[影響しないストーリーは<br/>前のビルドからコピー\]

    style Bail fill:#ffcccc

この記事で紹介する対策の多くは、図の中でBailにたどり着く経路を減らすためのものです。

## Chromaticのコストの課題

Chromaticの課金は、スナップショットの枚数で決まります。実際に撮影したスナップショットは1枚として数え、TurboSnapで前のビルドからコピーしたスナップショットは0.2枚として数えます。つまり、TurboSnapがうまく効いていれば、同じストーリー数でもコストを大きく抑えられます。

一方で、TurboSnapを有効にしていても、Bailが多ければ毎回ほぼ全件を撮影することになります。給与計算機能では、8月期（7月11日〜8月10日）の555件のビルドのうち、239件（43.1%）がchangedStorybookFilesでBailしていました。9月期（8月11日〜9月10日）は、600件のうち316件（52.7%）です。ビルドの半分近くが、ストーリーの変更とは関係なく全件撮影になっていました。

![棒グラフ。changedStorybookFilesで全件撮影になったビルドの割合は、8月期が43.1%、9月期が52.7%、10月期が29.9%](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20261026/20261026191054.png)

changedStorybookFilesで全件撮影になったビルドの割合の推移

このあと紹介する対策を入れた10月期（9月11日〜10月10日）には、この割合は29.9%まで下がりました。9月11日にpreviewの依存を減らす対応を、9月28日にfeature flagの対応を入れています。

ここからは、不要な全件撮影を減らす対策、撮影対象の判定を正しくする対策、重複した実行を減らす対策、撮影の粒度の順に紹介します。

## 不要な全件撮影（Bail）を減らす

不要な全件撮影は、TurboSnapがBailすることで起きます。この節では、Bailの理由ごとに、何が起きていてどう直したのかを紹介します。

### previewの依存を小さく、変わりにくくする

給与計算機能で最も多かったのは、changedStorybookFilesによるBailでした。TurboSnapは、変更されたファイルからimportの関係をさかのぼり、`.storybook/`配下のファイルにたどり着いた時点でBailします。つまり、`preview.tsx`が直接または間接的にimportしているファイルは、どれを変更しても全件撮影の原因になります。

`preview.tsx`は、すべてのストーリーに共通する設定を書く、Storybookの設定ファイルです。ここでよく使うのがdecoratorです。decoratorはストーリーを外側から包むコンポーネントで、Providerやレイアウトのように、ストーリーの描画に必要なものを足すのに使います。`preview.tsx`で指定したdecoratorは全ストーリーに適用され、ストーリーのファイルで指定したdecoratorはそのストーリーにだけ適用されます。

給与計算機能の`preview.tsx`は、Headerコンポーネントや、[SmartHR UI](https://github.com/kufu/smarthr-ui)を再exportしているプロダクト内のbarrel（複数のモジュールをまとめて再exportするファイル）をimportしていました。その先をたどると、認証の処理やOpenAPIから生成したAPIクライアントまで、`preview.tsx`の依存に含まれていました。依存は558ファイルあり[1](#fn:1)、そのうち504ファイルが生成したコードでした。APIのスキーマを変更してコードを生成し直すたびに、全件撮影になっていたことになります。

\---
title: 変更前のpreview.tsxの依存（558ファイル）
---
flowchart LR
    Preview\[preview.tsx\] --> Header\[Header\]
    Preview --> RootLayout\[RootLayoutのbarrel\]
    Preview --> Barrel\[SmartHR UIを<br/>再exportするbarrel\]
    Header --> Barrel
    Header --> Deep\[認証やセッションの<br/>処理など\]
    RootLayout --> Deep
    Deep --> Generated\[OpenAPIから生成した<br/>APIクライアント<br/>504ファイル\]

    style Generated fill:#ffcccc

そこで、`preview.tsx`からアプリケーション本体のコードへの依存を、必要最小限まで減らしました。依存を広げていたのは、`preview.tsx`のdecoratorで使っていた3つのコンポーネントです。多言語化のための`IntlProvider`、バリデーションライブラリのZodの設定を行う`ZodCustomizer`、画面上部のHeaderを、それぞれ次のように直しました。

-   `IntlProvider`は、プロダクト内のbarrelではなく、`smarthr-ui`パッケージから直接importする
-   `ZodCustomizer`は、`RootLayout`のbarrel経由ではなく、実体のファイルから直接importする
-   Headerはグローバルなdecoratorから外し、ページ全体を撮影するストーリーにだけ適用する

importの変更は次のようなものです。

import { Header } from '../src/components/domain/Header/Header.presentational'
import { ZodCustomizer } from '../src/components/layout/RootLayout'
import { IntlProvider } from '../src/components/ui/smarthr-ui'

import { IntlProvider } from 'smarthr-ui'

import { ZodCustomizer } from '../src/components/layout/RootLayout/ZodCustomizer'

ここで気をつけたいのは、`preview.tsx`のimport文だけを直しても足りないことです。Headerのコンポーネント自身がbarrelをimportしていたので、`preview.tsx`→Header→barrelという経路で依存が残ってしまいます。Headerを`preview.tsx`から外すことと、セットで対応する必要がありました。

また、Headerを適用するdecoratorは、`.storybook/`ではなく`src/`配下に置きました。`.storybook/`配下のファイルは、変更するだけでBailの原因になるので、共有するコードをそこに置くと同じ問題が再発するためです。

この対応で、`preview.tsx`の依存は558ファイルから14ファイルに減りました。撮影するストーリーは1つも減らしていません。あるビルドでは、それまで全件撮影になっていた変更で、撮影枚数が720枚から20枚になりました。

社内のほかのチームでも、同じような対策をしていました。たとえば、`preview.tsx`でグローバルに登録していたMSW（Mock Service Worker）のハンドラーを外し、必要なストーリーにだけ個別に登録するようにしたチームがあります。

### feature flagの一覧をpreviewに持ち込まない

`preview.tsx`の依存を減らしたあとも、給与計算機能にはBailの原因が残っていました。5月期から8月期にマージされたPull Requestで試算すると、この対応のあとでもBailするものが38件あり、そのうち32件がfeature flagの追加や削除によるものでした。

feature flagは、機能の公開をコードのデプロイと切り離して、フラグの値で出し分ける仕組みです。開発途中の機能をフラグでオフにしたままマージしておき、準備ができたらオンにして公開します。そのため、開発が進むたびに、フラグは増えたり消えたりします。

コンポーネントはフラグの値を見て表示を変えるので、Storybookのストーリーにもフラグの値が必要です。給与計算機能では、すべてのフラグの既定値を並べた一覧をモック用のファイルに用意し、`preview.tsx`でそれを読み込んで、全ストーリーに渡していました。既定値を`preview.tsx`でまとめて渡しておけば、各ストーリーではオンにしたいフラグだけを指定すれば済み、フラグをオンにした状態のストーリーを手軽に書けるからです。

import { defaultFeatureFlags } from '../src/features/featureFlag/featureFlagFetcher.mock'

(Story, context) => (
  FeatureFlagProvider featureFlags\={{ ...defaultFeatureFlags, ...context.parameters.featureFlags }}
    Story 
  FeatureFlagProvider
),

この一覧のファイルは`preview.tsx`の依存に含まれるので、フラグを1つ追加するたびに全件撮影になっていました。

そこで、`preview.tsx`では一覧を持たず、ストーリーが指定しなかったフラグを`false`として扱うようにしました。Proxyを使い、存在しないキーにアクセスされたら`false`を返します。

const withDefaultFeatureFlags = (overrides: Partial<FeatureFlags\> \= {}): FeatureFlags \=>
  new Proxy(overrides as FeatureFlags, {
    
    get: (target, key) \=> (typeof key === 'string' ? (Reflect.get(target, key) ?? false) : Reflect.get(target, key)),
  })



(Story, context) => (
  FeatureFlagProvider featureFlags\={withDefaultFeatureFlags(context.parameters.featureFlags)}
    Story 
  FeatureFlagProvider
),

給与計算機能では、もともとすべてのフラグの既定値が`false`だったので、この変更で描画は変わりません。

ここで、一覧を`preview.tsx`の中にコピーして持つ方法も考えられます。ただ、それではフラグを増やすたびに`.storybook/`配下のファイルを編集することになり、結局Bailしてしまいます。一覧そのものを持たない形にして、はじめて「フラグを増やしても全件撮影にならない」状態になります。

この対応で、`preview.tsx`の依存は14ファイルから9ファイルに減りました。対応を入れる前の9月18日〜27日は、35件のビルドのうち12件（34.3%）がBailしていました。対応を入れた翌日からの9月29日〜10月10日は、129件のうち11件（8.5%）です。対応前の期間はビルド数が少ないので、目安として見てください。「Chromaticのコストの課題」の節で示したグラフの10月期の29.9%より低いのは、10月期にはfeature flagの対応を入れる前のビルドも含まれているためです。

### 依存更新による全件撮影の原因を調べる

ここからは、主に社内のほかのチームの事例を紹介します。どれも私が直接対応したものではありませんが、給与計算機能のコストを下げる方法を調べる中で、ほかのチームも同じ課題に向き合い、さまざまな改善をしていることを知りました。Chromaticを使っている方にはきっと参考になる内容だと思うので、あわせて紹介させてください。

まず、`preview.tsx`の依存を減らしてchangedStorybookFilesのBailはほぼなくなったものの、今度はchangedPackageFilesによるBailが増えていた事例を紹介します。

このリポジトリは、1つのリポジトリに複数の`package.json`があるmonorepo構成です。Storybookも複数のディレクトリにあり、Chromaticのワークフローもそれぞれ分かれています。この事例で問題になったのは、`client/`のStorybookを撮影するワークフローです。一方で、lockfileの`pnpm-lock.yaml`はリポジトリ全体で1つです。

TurboSnapは、`package.json`が変更されると、本来はlockfileを解析して、依存しているパッケージが実際に変わったかを判定します。しかし、lockfileを解析できないと、`package.json`が変更されただけでBailします。

このリポジトリでは、lockfileを解析できず、`package.json`の変更で判定する動きになっていました。そのため、別のStorybookがあるディレクトリなど、`client/`と関係ないディレクトリの`package.json`を変更しただけでも、`client/`のStorybookが全件撮影になっていました。ある3日間のstagingブランチの実行を調べると、150回のうち62回が依存の更新による全件撮影で、そのうち25回は`client/`と関係ない`package.json`の変更によるものでした。

そこで、`client/`の外にある`package.json`だけを、TurboSnapが変更を無視する`untraced`に指定しました。`client/package.json`と`pnpm-lock.yaml`はあえて残しています。これらまで無視すると、SmartHR UIのようなライブラリをアップデートしたときの見た目の変化を見逃してしまうからです。

ここから分かるのは、一度Bailを減らしても、それで終わりではないということです。ある原因を潰すと、別の原因が目立つようになります。Bailの理由ごとに、件数を見続ける必要があります。

## 撮影する変更と範囲を正しく判定する

TurboSnapで必要なストーリーだけを撮影するには、比較するコミットや、変更の影響を判定する設定も重要です。判定が適切でないと、不要な撮影が増えたり、必要な撮影が漏れたりします。

### 撮影するコミットを正しくする

Pull Requestのビルドで、本来の変更よりも広い範囲が撮影されていたリポジトリもありました。

原因は2つありました。1つは、GitHub Actionsでcheckoutするrefを指定しておらず、Pull Requestの一時的なmergeコミットを撮影していたことです。もう1つは、CIの中で`git merge`をしていて、変更されたファイルの集合が広がっていたことです。

対策として、checkoutでPull Requestのheadのコミットを明示し、変更の判定には`git merge`ではなく`git diff origin/<base>...HEAD`を使うようにしました。撮影するコードのコミットと、Chromaticに伝えるコミットの情報がそろっているかは、一度確かめておくとよいと思います。

### untracedとexternalsの設定が効いているかを確かめる

TurboSnapの判定は、`untraced`と`externals`という2つの設定で調整できます。`untraced`は、変更されても無視するファイルの指定です。`externals`は逆に、importの依存をたどれないものの、変更されたら全件撮影すべきファイルの指定です。どちらも、書いただけで安心せず、実際に効いているかを確かめる必要があります。

Pull Requestの一時的なmergeコミットを撮影していたリポジトリでは、`untraced`を書いていたのに効いていませんでした。原因は、次の2つです。

-   `untraced`のパスは、working directoryではなくリポジトリのルートを基準にして書く必要があるのに、`frontend/`が抜けていた
-   ChromaticのGitHub Actionの入力は改行区切りなのに、複数のパスをスペース区切りで書いていた。そのため、スペースを含む1つのglobとして解釈されていた

一方、別のリポジトリでは、撮影されるべき変更が撮影されていなかったこともありました。グローバルなCSSを変更したのに、影響するストーリーが0件と判定され、1,042枚すべてが撮影されなかったのです。このリポジトリでは、グローバルなCSSやTailwind CSSの設定が、ストーリーからたどれるimportの依存に入っていなかったためです。そこで、それらのファイルを`externals`に指定し、変更されたら全件撮影するようにしていました。

どちらの問題も、設定ファイルを読んだだけでは気づきにくいものです。ChromaticのCLIのログには、どのファイルの変更でBailしたかが出力されます。ログを見て、判定が意図どおりかを確かめるのがおすすめです。

## 重複した実行を減らす

全件撮影でなくても、同じ内容を何度も撮影していれば、コストは増えます。この節では、重複した実行を減らすための対策を紹介します。

### 同じコミットを2回撮影しない

同じコミットを2回撮影していたリポジトリもありました。そこでは、stagingからmainへのリリース用のPull Requestが常に開いています。そのため、stagingブランチにマージすると、stagingへのpushと、リリース用のPull Requestの更新の両方でChromaticが走っていました。

対策として、リリース用のPull Requestでの実行をスキップするようにしています。CIのトリガーが増えてくると、役割が重なっている実行に気づきにくくなります。どのイベントでChromaticが走っているかを、一度見直してみるとよいと思います。

### 必要なときだけ実行する

Chromaticを走らせる必要がない変更なら、そもそも実行しないのが一番です。

たとえば、フロントエンドのテストファイルだけを変更したときは、VRTを実行しないようにしているチームがありました。ただし、Storybookが読み込むfixtureやモック、play functionまでテスト扱いで外してしまうと、見た目の変化を見逃すことになります。外すのは、描画に影響しないファイルだけにします。

給与計算機能では、DraftのPull Requestでは、`run-chromatic`というラベルを付けたときだけChromaticを実行する運用にしています。開発の途中でコミットを積むたびに撮影していると、それだけでコストがかかるためです。

ただし、実行をopt-inにすると、Chromaticを走らせないままマージしてしまうおそれがあります。これを防ぐために、ラベルを付けたときにもワークフローが起動するようにし、レビューの前に必ずVRTが走っていることを確かめるようにしたチームもあります。実行を減らすなら、必要なVRTが走らないままマージされない仕組みもセットで用意しておきたいところです。

## 撮影の粒度を設計する

撮影の粒度は、撮影枚数に直接効きます。ストーリーの数や、画面幅などのバリエーションを増やすほど、撮影枚数も増えるからです。

撮影の粒度を見直した例として、ほかのテストで見た目を確認できているストーリーを整理したチームがあります。たとえば、ローカルで動かしている別のVRTですでに比べている状態のストーリーには、`disableSnapshot: true`を付けてChromaticでは撮影しないようにしています。一方で、そのストーリー自体はローカルのVRTが参照しているので、削除はしていません。

ここでは、「どのテストを消すか」ではなく、「どの見た目を、どのテストで守るか」から考えています。撮影を減らす前に、その見た目をほかの方法で守れているかを確かめておくと、安心して減らせます。

## まとめ

Chromaticのコストを下げたいときに、まず減らすべきなのはテストの範囲ではなく、不要な全件撮影と重複した実行です。ただし、減らしすぎると、撮影されるべき変更まで見逃してしまいます。撮影が減ったときは、それが正しいのかもあわせて確かめておきたいところです。

効果を測るときは、月ごとの総量だけでなく、Bailの理由ごとの件数や、1ビルドあたりの課金対象枚数も見るのがおすすめです。給与計算機能では、10月期の課金対象の枚数が8月期より37.2%減りました。ただし、同じ期間にビルド数も555件から328件に減っていて、1ビルドあたりの枚数で見ると343.8枚から365.1枚とむしろ増えています。この期間にはストーリー数も増えており、1ビルドあたりの課金対象枚数を押し上げた要因の1つと考えています。総量の減少がすべて対策の効果とはいえないので、Bailの割合のような、対策と結びつきやすい数字や、撮影対象の規模の変化もあわせて見ています。

TurboSnapについては、Chromaticの公式ドキュメントにもベストプラクティスがまとまっています。今回紹介した対策と重なる部分も多いので、あわせて読んでみてください。

[www.chromatic.com](https://www.chromatic.com/docs/turbosnap-best-practices)

ただ、こうした対策を続けても、コストの問題が根本から解決するわけではありません。給与計算機能のチームを含め、社内の各所でChromaticのコストを下げる取り組みが進んでいます。一方で、SmartHRではプロダクトが増え続けていて、それぞれのプロダクトでも、開発が進むたびにストーリーが増えていきます。撮影枚数で課金される以上、無駄な撮影を減らしても、ストーリーが増えるぶんだけコストは増えていきます。

そこで今は、UIのリグレッションを防ぎつつ、ストーリーが増えてもコストが増えにくい方法を模索しています。たとえば、全ストーリーを撮影する前提からVRTの対象や粒度を見直すことや、OSSを使った自前のVRTの仕組みに移ることも、選択肢の1つです。今回の対策で見えてきた撮影枚数の実測値は、そうした判断の材料にもなると考えています。

## We Are Hiring!

SmartHRでは、一緒にSmartHRをつくっていく仲間を募集しています。

プロダクトの開発だけでなく、今回のようなCIやテストのコストといった開発の足回りの改善にも、チームを越えて取り組んでいます。興味を持っていただけたら、カジュアル面談でお話ししましょう。

[recruit.smarthr.co.jp](https://recruit.smarthr.co.jp/engineer/)

* * *

1.  依存のファイル数は、Storybookをビルドするときにwebpackのstatsを出力し、`preview.tsx`からたどれるモジュールを数えて調べました。[↩](#fnref:1)