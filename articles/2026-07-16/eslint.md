---
title: "「面倒」を聞き逃さない —— ESLintでチーム間の課題を解決してみた"
source: "https://tech.smarthr.jp/entry/2026/07/15/120839"
publishedDate: "2026-07-15"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。フロントエンドエンジニアの[atsushim](https://github.com/AtsushiM)です。

過去に書いたブログ記事を読み直してみたら、大体ESLintの話をしていました。

「[アクセシビリティを担保するためにESLintの独自ルールを作っている話](https://tech.smarthr.jp/entry/2024/03/19/150235)」  
「[弊社のheading levelがめちゃくちゃだった件と 解決のためにしたことの話](https://tech.smarthr.jp/entry/2025/06/19/094801)」  
「[スプレッド構文と残余引数の安全な使い方 —— ESLintによる品質管理](https://tech.smarthr.jp/entry/2026/01/14/124707)」  

今回もESLintの話ですが、ちょっと方向性を変えて、エンジニア以外のチームとの連携のためにルールを作った話をしたいと思います。

今回は2つの事例を紹介します。  
1つはInternationalization（多言語対応）チームとの連携、もう1つはプロダクトデザイナーとの連携です。  
どちらも「面倒」という声から始まった話なので、順番に見ていきましょう。

## 多言語対応

SmartHRではより多くのユーザーに利用していただけるよう、多言語による翻訳を提供しています。

翻訳で使用する辞書となるデータはオブジェクトとして提供され、多言語間で同一のキーで同じ内容を言語ごとに設定することで翻訳を可能にしています。

export const ja = {
  'greeting': 'こんにちは',
  'farewell': 'さようなら',
} as const

このような辞書を登録する作業は、以下のような開発フローで行っていました。

1.  エンジニアが日本語の翻訳ファイル（ja.ts）を追加・編集し、利用する文言のベースとなるものを設定する
2.  ja.tsの翻訳データのオブジェクトから型を抽出し、他言語（例: en.ts）などで同じ型を保証できる状態にしつつ、翻訳データ自体は未登録のまま（表示時は日本語にフォールバック）とする
3.  翻訳用のデータの変更をInternationalizationチームが監視しており、日本語の翻訳ファイルの変更が起きたらInternationalizationチームが他言語の翻訳を作成

一見問題の無い開発フローに見えます。  
実際私もこのフローに則り普段の開発を進めていましたが、最近Internationalizationチームがこんなことをぼやいていることを聞きました。

Internationalizationチーム 「翻訳ファイルをJSON化してぇ...」  
私 「あ、そうなの？なんで？」  
Internationalizationチーム 「手作業の調整が面倒で...」

詳しくヒアリングしたところ、以下のことがわかりました。

### 多言語翻訳ツールの前提

Internationalizationチームが利用しているツールは、以下のような動作をします。

-   ベースとなる言語の辞書データを他言語に丸ごとコピー
-   その後、文言部分だけを言語ごとに変更

### TypeScriptファイルでの問題

-   ja.tsと他言語でフォーマットが異なる（ja.ts以外は型定義として利用しているため）
-   ツール利用後に手作業での修正が必要

なるほど、なかなか面倒な作業のようです。  
Internationalizationチームはその性質上、1つのチームに直接属しておらず、様々なチームの翻訳作業をしています。  
チームごとに微妙に異なるtsファイルを崩さないように翻訳ファイルを都度調整する必要がある -> JSON化したい！ ということでした。

確かにJSON化すればフォーマットは確実に統一されますし、ツールとの相性も改善されます。

試しにいくつかの開発チームで辞書データをTypeScriptからJSONに変更してみましたが、今度は開発チームに問題が起きました。

SmartHR社全体でよく利用される翻訳時に利用するコンポーネントは以下のようなパターンの実装が多いです。

import { type ComponentProps } from 'react'
import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl'

import type { ja } from './locales'

type Messages \= Record<keyof typeof ja, string\>

type Props<Id extends keyof Messages\> \= {
  id: Id
  defaultText: (typeof ja)\[Id\]
  values?: ComponentProps<typeof ReactIntlFormattedMessage\>\['values'\]
}

const FormattedMessage = ID extends keyof Messages({
  id,
  defaultText,
  values,
}: PropsID) => (
  ReactIntlFormattedMessage
    id\={id}
    defaultMessage\={defaultText}
    values\={values}
  
)

### このカスタマイズされたFormattedMessageの利点

このパターンには以下の利点があります。

-   型安全: 存在しないidやdefaultTextを設定すると型エラー
-   検索性向上: defaultTextが必須のため、画面に表示されている文言で直接コード検索が可能

...

{}
FormattedMessage id\="hoge/fuga/description" defaultText\="HOGE" 

...

JSON化してしまうと型が無くなってしまいます。具体的には：

export const ja = {
  'greeting': 'こんにちは',
  'farewell': 'さようなら',
} as const

type Messages \= typeof ja

import ja from './ja.json'

type Messages \= typeof ja

このため、タイポなどに気づきにくく、実際の画面に表示されている文言と食い違うと調査に時間が取られてしまう可能性があります。

TypeScriptとしてJSONをimportする場合は `as const` を設定するべきでは？という議論もされているようですが長らく進展はなく、導入される可能性は低そうです。  
(参考: [https://github.com/microsoft/TypeScript/issues/32063)](https://github.com/microsoft/TypeScript/issues/32063\))

-   Internationalizationチームとしては辞書をJSONにしてほしい
-   開発者としては型が欲しいのでtsファイルにしたい（JSONからなんとかする方法もあるが煩雑）

という状況で、このままでは話を進められなかったので改めて状況を整理してみました。

-   エンジニアはja.tsしか編集しないため、ja.ts以外はJSON化して問題ない
    -   他の言語ファイルはミスしないようにja.tsと同じ翻訳キーを持つことを保証するため型を設定していたが、実質ja.ts以外のファイルを管理しているのはInternationalizationチームのため型は不要だった
    -   同じ翻訳キーを持つことは利用しているツールの挙動（ベースとなる辞書ファイルをコピーしてから調整する）から担保されている
-   ja.tsからja.jsonを生成できれば解決しそう
    -   エンジニアはja.tsを利用し、型安全な開発を続け、そこからja.jsonを生成し、Internationalizationチームに提供する
-   ja.tsとja.jsonの辞書データが同じことを保証できればより安全

なんとかESLintのルールで実装できそうですね。

### 実装したルール

ja.tsを編集したら自動的にja.jsonを生成し、両者が同期していることをESLintで保証する仕組みです。

実際のファイル: [require-i18n-translation-sync](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/require-i18n-translation-sync)

### このルールで実現できること

このルールによって、以下が保証されます。

-   ja.tsとja.jsonが同じ値であることを保証
-   ja.tsとja.jsonに差がある場合、ja.tsからja.jsonを自動生成してSingle Source of Truth（SSOT）を担保

これにより、安全に作業が可能になりました。  
実際にいくつかのプロダクトで運用開始しており、問題なかったので全社に導入を進めています。

## ガイドライン違反が頻発するコンポーネント

smarthr-uiで提供しているコンポーネントは多岐にわたるため、その利用方法をまとめて[SmartHR Design System](https://smarthr.design/)として公開しています。

これらに関わるルールはこれまでもいくつか公開してきています。

-   [design-system-guideline-bulk-action-row-button](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/design-system-guideline-bulk-action-row-button)
    -   一覧画面の一括操作用の領域では特定のButtonコンポーネントを利用することを強制することで、視覚的なアクセシビリティ（a11y）を向上させるルール
-   [design-system-guideline-prohibit-dialog-button-icon](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/design-system-guideline-prohibit-dialog-button-icon)
    -   Dialogコンポーネント内でのButtonにはIconを設定しないようにすることで、テキストだけで明確に動作を表すことを強制し、視覚的なノイズを減らすルール
-   [design-system-guideline-prohibit-double-icons](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/design-system-guideline-prohibit-double-icons)
    -   Button や TextLink といったコンポーネントでprefix と suffix が同時に設定されている場合、情報過多になるため禁止するルール

これらのチェックは比較的ロジックが簡単なこともあり、エンジニア以外が実装したものが多いのですが、[InformationPanel](https://smarthr.design/products/components/information-panel/)の使い方については少し複雑で、エンジニアに問題が周知されていませんでした。

### 問題の内容

InformationPanelを白背景のコンポーネント（BaseやDialog）内に直接配置すると、InformationPanel自体も白背景のため視覚的に区別がつかない。

[Design Systemのガイドライン](https://smarthr.design/products/components/information-panel/#h3-1)では禁止されているが、実際には違反が多発していました。

当時上記セクションは「[Base](https://smarthr.design/products/components/base/)のなかに直接配置しない」と書かれており、人間やAIが「Base > InformationPanelのように置いたらだめ」と誤認する問題が起きたため、現在は文言をわかりやすく変更し、ついでにeslint ruleも作って防げるようにしよう！という考えでした。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260715/20260715120840.png)

InformationPanelの当時のスクリーンショット

#### 発覚の経緯

とあるプロダクトでこの問題が発生し、チーム内でカスタムlintルールを作ろうとした際に相談を受けたのですが、

プロダクトデザイナー「ガイドライン違反のチェック、手動だと面倒で...」  
私「わかる。いっそ全社導入したほうがよくない？」  
プロダクトデザイナー「良さそう！」  
私「こんな実装でどう？」  
プロダクトデザイナー「実はBaseよりDialogで問題ある使い方されてることが多いんだけど、そっちもチェックできない？」  
私「え、そうなん？」

といったことも判明し、両方に対応するルールにしました。  
（話すのって大事ですね...）

実際のファイルは[design-system-guideline-prohibit-information-panel-in-white-bg](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/design-system-guideline-prohibit-information-panel-in-white-bg)になります。

このルールを利用することでInformationPanelとそれが置かれている背景色が同一でないことが担保され、視覚情報が整理された状態でユーザーに提供できるようになっています。

## おわりに

過去に書いたブログ記事もESLintの話だったので、今回もESLintかよ！と思われるかもしれません。でも今回は少し違うアプローチで、エンジニア以外のチームとの連携にESLintを活用した話でした。

Internationalizationチームの「面倒」という声も、プロダクトデザイナーの「面倒」という声も、単に聞き流していたら解決しなかった問題です。

ESLintはコード品質のためだけのツールではありません。チーム間の課題を技術で解決する、そんな使い方もできます。

皆さんの周りでも「面倒」「やりづらい」という声があれば、ぜひESLintで解決できないか考えてみてください。意外と簡単に実装できて、チーム全体が幸せになれるかもしれません。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)