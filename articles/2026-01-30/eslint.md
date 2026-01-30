---
title: "スプレッド構文と残余引数の安全な使い方 —— ESLintによる品質管理"
source: "https://tech.smarthr.jp/entry/2026/01/14/124707"
publishedDate: "2026-01-14"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。フロントエンドエンジニアの[atsushim](https://github.com/AtsushiM) です。

過去に書いたブログ記事を読み直してみたら、大体ESLintの話をしていました。

-   「[アクセシビリティを担保するためにESLintの独自ルールを作っている話](https://tech.smarthr.jp/entry/2024/03/19/150235)」
-   「[弊社のheading levelがめちゃくちゃだった件と 解決のためにしたことの話](https://tech.smarthr.jp/entry/2025/06/19/094801)」

たまには違う話をしようかな、とも思いましたが今回も最終的にESLintの話です。

## そもそもスプレッド構文と残余引数って何？

スプレッド構文と残余引数の詳しい説明はMDNの [スプレッド構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)、[残余引数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters) を参照していただくとして簡単に説明すると、 `...hoge` のように記述することで複数の値・属性をまとめて扱える便利な記法です。

const AnyComponent = ({
  a,
  b,
  
  ...c
}) \=> {
  const d = {
    
    ...c,
    hoge: 'fuga',
  }

  

  return (
    OtherComponent
      
      {...d}
     
  )
}

ある程度JavaScriptに携わっていれば全く書いたことがない！という方はいないのではないか、というくらいよく使われる便利な記法ですね。  
私も大好きです。もはやなかった時代には戻れない……。

## バグの原因になりやすい使い方

そんな便利なスプレッド構文・残余引数ですが、使い方を気をつけないとバグの原因になりやすい場合があります。  
例えば以下の様な場合です。

import { Props } from './types'

const CrewDetail: FC<Props\> = ({ name, empCode, ...props }) \=> (
  section id\="crew-detail" {...props}
    h2{empCode}: {name}h2
    {}
    {props.deletable && (
      button削除button
    )}
  section
)

このコード、動作としては問題ないかもしれませんが、改善の余地がありそうです。

## 残余引数の使い方の改善点

### 残余引数の命名

**残余引数の名称がpropsになっており、かつCrewDetailコンポーネントに設定できる型もProps**になっています。

一般的な型のあるプログラム言語のコーディング慣習として、型名をキャメルケースに変換した名称の変数は、名称の元となった型の値である場合がほとんどです。  
今回のコード例を一見すると、**props変数はProps型だから……と勘違いする可能性があります。**  
実際にはpropsの型は `Omit<Props, 'name' | 'empCode'>` であり、Props型とは一致しません。

「ちゃんと型と比較すればわかるやんけ」と思われるかもしれませんが、そのひと手間を命名規則だけで不要にできるなら……  

余談ですが、JavaScriptフレームワークなどでは残余引数の英名(rest parameters)から`rest`という命名がされる場合がよくあります。  
実際にSmartHR社内のいくつかのプロダクトで残余引数の命名をrest/xxxRestというフォーマットに変更してみたところ、以下のようなメリットがありました。

-   残余引数であることがわかりやすくなる
    -   `rest`という単語は残余引数以外で利用される機会が少なく見分けやすい
    -   つまり現在見ているスコープ内で関心が低い（値を直接使う可能性が低い）ということもわかりやすいことになる
-   検索結果が型と混ざらず見やすい
    -   大文字と小文字を区別せず検索する場合などで地味に便利

変数名をちょっと気にするだけ、というコストの低さのわりにリターンはなかなか大きいです。

### 残余引数の属性をスコープ内で参照している

残余引数の命名を修正し、これで万事OK！とはいきません。

import { Props } from './types'

const CrewDetail: FC<Props\> = ({ name, empCode, ...rest }) \=> (
  section id\="crew-detail" {...rest}
    h2{empCode}: {name}h2
    {}
    {rest.deletable && (
      button削除button
    )}
  section
)

名称変更でわかりやすくなりましたが**残余引数であるrestからdeletable属性を参照している**箇所がありますね。  
この記述は動作上の問題はありませんが、**スコープ内で関心が低い変数をまとめるという目的で残余引数を使っている場合、避けるべき記述**です。  
特に今回の`rest.deletable`は削除ボタンの表示分岐でしか利用されておらず、section要素にスプレッド属性で渡す必要もない値のため、CrewDetailコンポーネントに指定された属性を展開するタイミングで同様に展開しておくほうが良いでしょう。

今回の例は`rest.deletable`のように属性参照しているものでしたが、他にも避けたいパターンとして**残余引数の構造分解**があります。

const { creatable, updatable, ...otherRest } = rest

これらも実質残余引数の属性参照になるため、可能な限り、最初の構造分解の段階で展開しておくことをおすすめします。  
(残余引数の残余引数の……といった記述は混乱しますしね……)

## スプレッド構文(属性)の使い方の改善点

ここまでの修正を反映するとこんなコードになります。

import { Props } from './types'

const CrewDetail: FC<Props\> = ({ name, empCode, deletable, ...rest }) \=> (
  section id\="crew-detail" {...rest}
    h2{empCode}: {name}h2
    {}
    {deletable && (
      button削除button
    )}
  section
)

いよいよスプレッド構文まで来ましたが、まだ改善の余地があります。  
例えばProps型が以下のような場合、**id属性に指定している`"crew-detail"`という値が`rest.id`で上書きされてしまう可能性があります。**

export type Props \= {
  id?: string
  name: string
  empCode: string
  creatable?: boolean
  updatable?: boolean
  deletable?: boolean
}

もちろん **`"crew-detail"`をデフォルト値に、`rest.id`が存在すればそちらを優先する** というロジックで今回の様な記述を使う場合はありますし、便利です。  
ただ今回の例のコンポーネントのコードだけを見た場合、

-   型を確認しない限り、id属性が上書きされる可能性があるのか・ないのかがわからない
-   id属性が上書きされる可能性がある場合、上書きされることを期待したコードなのか、意図せず上書きされる状態(バグ)なのかがわからない

という問題があります。  
「しっかりコメントを書けばいいのでは？」という意見もあると思いますが、その場合でもquery stringのオブジェクトのように**どんな値が設定されているかわからないオブジェクト**をスプレッド構文で使う場合、**前方に記述されているすべての属性は上書きされる危険性**があります。  
そのため意図した属性以外が上書きされる可能性はないか？などを考慮し、慎重に利用するべきです。

type Props \= { \[key: string\]: any }

他にも記述したタイミングでは問題なくても後ほどの改修で上書きされるようになってしまった……といった問題も発生しうるため、スプレッド構文は可能な限り先頭に記述したほうが無難です。

import { Props } from './types'

const CrewDetail: FC<Props\> = ({ id, name, empCode, deletable, ...rest }) \=> (
  section {...rest} id\={id || 'crew-detail'}
    h2{empCode}: {name}h2
    {}
    {deletable && (
      button削除button
    )}
  section
)

スプレッド構文を先頭に記述することで**CrewDetailにid属性が渡される場合があること**、**id属性がfalsyな場合、デフォルト値として`"crew-detail"`を指定すること** が明確になります。  
上記例はJSXでしたが、同様の問題はObjectに対するスプレッド構文でも発生しうるので注意が必要です。

const hoge = {
  fuga: 'piyo',
  ...abc, 
}

const hoge = {
  ...abc, 
  fuga: 'fuga' in abc ? abc.fuga : 'piyo', 
}

改善前のコードも状況次第ではとても便利ですし、むしろ実行速度などを考えると改善前のコードのほうが適切な場合もあります。  
しかし複数人で開発が行われるような場合、コードのコンテキストを詳しく知らない場合などに「このコード大丈夫かな？」といった疑念が発生しやすく、確認作業が必要になってしまいがちです。  
最悪の場合バグを起こしかねないため、避けられる状況なら避けたほうが良いでしょう。

そこで（いつもの通り）eslint-plugin-smarthrのruleとして定義しました。

-   [best-practice-for-spread-syntax](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/best-practice-for-spread-syntax)
    -   スプレッド構文(属性)を記述可能な範囲で先頭に移動するように促すルール
-   [best-practice-for-rest-parameters](https://github.com/kufu/tamatebako/tree/master/packages/eslint-plugin-smarthr/rules/best-practice-for-rest-parameters)
    -   残余引数をrest/xxxRestというフォーマットで命名するよう促すルール
    -   同時に、残余引数の属性を参照・もしくは構造分解しようとするとあらかじめ展開するように促す

これで自動的に問題が発生する可能性に気づけますし、あえて無視したいかどうかを検討するきっかけにもなります。

この記事で挙げた以外にもぜひ似たような問題がないか、検討してみましょう！

## We Are Hiring!

SmartHR では、一緒にプロダクトを作ったり、アジャイルやっていきなメンバーを絶賛募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)