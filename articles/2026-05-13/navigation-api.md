---
title: "Navigation APIを使って戻るリンクを作る"
source: "https://tech.smarthr.jp/entry/2026/05/12/153901"
publishedDate: "2026-05-12"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

スキル・資格・研修機能を開発しているプロダクトエンジニアのs.miyoshiです。  
スキル・資格・研修機能では、詳細画面から一覧画面などに戻るためのリンク（[UpwardLink](https://smarthr.design/products/components/text-link/upward-link/)）がいくつかの箇所に存在します。

![UpwardLinkの表示例](https://cdn-ak.f.st-hatena.com/images/fotolife/s/smarthr/20260501/20260501092801.png)

UpwardLinkの戻り先は、例えば従業員一覧画面から従業員詳細画面に遷移している場合は、「従業員一覧画面へ戻る」であって欲しいし、スキルマトリクス画面（縦軸に従業員、横軸にスキルが並んでいる画面）から遷移している場合は「スキルマトリクス画面へ戻る」であって欲しいです。 つまり、戻り先を動的に決めたいのです。

一見単純そうに見える機能ですが、意外とはまりポイントがあったので、今回はこの機能を実装する方法を解説したいと思います。  
なお、この記事では私が実際にトライしていった順に実装方法と問題点を解説していきます。  
「まずちゃんと動く実装を知りたい。」という方は実装4をご確認ください。

**記載しているコードの注意点**

-   エラーハンドリングなどの処理は省いて記載しています。
-   最終的に`getFromPage`関数によって得られるURLに遷移します（各実装によって`getFromPage`関数でどのようにURLを取得するかが違っています）。

## 要件

まず、要件を整理しましょう。  
戻るリンクの満たすべき要件を改めて整理すると、こんな感じです。

-   一覧画面から詳細画面に遷移した場合、詳細画面の「戻るリンク」では一覧画面へ戻る
-   詳細画面には、一覧画面からだけでなく、マトリクス画面など他のパスから遷移されることもある。特に、資格一覧画面→資格詳細画面→従業員詳細画面のように、複数の遷移が連なることがある。この場合の「戻るリンク」は、現在の詳細画面に対応する一覧画面ではなく、直前のページへ戻る
-   Next.jsでも動作する必要がある（スキル・資格・研修機能はNext.jsで作成されているため）

遷移元ページの情報を知りたいと思った場合、真っ先に思いつく手段は[Referer](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Referer)を参照することだと思います。  
しかし、Next.jsでクライアントサイドでルーティングさせている都合上、Refererでページ遷移の履歴を取得できません。

このような場合でも[Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)を使うことで遷移元のページの情報を取得することができます。

Navigation APIを使うとこんな感じで実装することができます。

type FromPage \= {
  name: 'スキルマトリクス' | '従業員一覧'
  url: string
}

const getFromPage = (): FromPage \=> {
  const entries = window.navigation.entries()
  const currentEntry = window.navigation.currentEntry

  const previousUrl = entries\[currentEntry.index - 1\]?.url

  if (previousUrl.includes('/crews')) {
    return { name: '従業員一覧', url: '/crews' }
  }
  if (previousUrl.includes('/skills/matrix')) {
    return { name: 'スキルマトリクス', url: '/skills/matrix' }
  }

  
  return { name: '従業員一覧', url: '/crews' }
}

### コードの解説

`window.navigation.entries()`で履歴を取得し、一つ前のURLのパスを見て状況を返すシンプルな実装です。

### 実装1の問題点

例えば、「①資格一覧」→「②資格詳細」→「③従業員詳細」と遷移したとします。  
③従業員詳細画面からの戻るリンク(UpwardLink)は「②資格詳細へ戻る」となり、問題ありません。  
ここで②資格詳細画面のUpwardLinkは「①資格一覧へ戻る」となっていて欲しいのですが、実際は「③従業員詳細へ戻る」となってしまいます。

これはUpwardLinkで②資格詳細へ戻る際もリンクから遷移して一つの履歴として残るので、直前のページが③従業員詳細となってしまうからです。

## 実装2: 直前のページのURLを考慮する

実装1では直前のリンクが何であれ返してしまい問題が発生したので、直前のページが意図したものであるかチェックする処理を追加してみます。

type PageInfo \= {
  url: string
  name: string
}

const getFromPage = (fallbackUrl: string): PageInfo \=> {
  const toPageInfo = (url: string): PageInfo \=> ({ url, name: getDisplayNameFromUrl(url) }) 

  const entries = window.navigation.entries()
  const currentEntry = window.navigation.currentEntry

  const currentPathname = currentEntry.url ? new URL(currentEntry.url).pathname : ''

  
  for (let i = currentEntry.index - 1; i >= 0; i--) {
    const url = entries\[i\]?.url
    if (!url) continue

    const { pathname, search } = new URL(url)
    if (pathname === currentPathname) continue 
 
    
    
    
    
    const prevUrl = entries\[i - 1\]?.url
    if (prevUrl && new URL(prevUrl).pathname === currentPathname) continue

    
    return toPageInfo(pathname + search)
  }

  return toPageInfo(fallbackUrl)
}

### コードの解説

一つ前のページ(`entries[i-1]`)が現在と一致しているならこのページは「現在ページから遷移して行った先のページ」であるためスキップするという処理を追加しました。  
現在のページが不適切な場合があるため`entries`をループするようにしています。

### 実装2の問題点

この実装では1個前をチェックするという処理が入っています。  
勘のいい皆様ならお気づきかもしれませんが、逆にいうと2個以上前には対応できないのです。

スキル・資格・研修機能の現在の実装には2個以上前をチェックしないと破綻する場所はないのですが、仮にページ①からページ④へ順番に移動してから戻るリンクを使った場合に起こりうる状況を示します。

1.  ① → ② → ③ → ④
2.  ① → ② → ③ → ④ →［戻るリンク］→ ③ （問題なし）
3.  ① → ② → ③ → ④ →［戻るリンク］→ ③ →［戻るリンク］→ ②（実装2で対応できる）
4.  ① → ② → ③ → ④ →［戻るリンク］→ ③ →［戻るリンク］→ ② →［戻るリンク］→ ④（NG）

②から`getFromPage`で取得できるリンクは、③は`prevUrl`なので実装2でスキップされますが、そのさらに前の④は`current`でも`prevUrl`でもないので、そこが遷移先になってしまうわけです。

局所ルール（`prevUrl`だけでの判定）だと、往復が繰り返される履歴に対して安定に“戻り先”を抽出できません。  
つまり「どこまで遡るべきか」を一般的に決められないのです。

## 実装3: スタックの概念を導入する

少し考え方を変えてみました。  
`window.navigation.entries()`から独自のスタックを生成し、スタックの操作によって前のページを辿るという方法です。

type FromPage \= {
  url: string
  name: string
}

type BackTargetCandidate \= FromPage & {
  pathname: string
}

const getFromPage = (fallbackUrl: string): FromPage \=> {
  const entries = window.navigation.entries()
  const currentEntry = window.navigation.currentEntry

  const backTargetStack = buildBackTargetStack(entries, currentEntry.index)
  const fromPage = resolveFromPage(backTargetStack, currentEntry.url)

  return fromPage ?? createFromPage(fallbackUrl)
}

const buildBackTargetStack = (entries: NavigationEntryLike\[\], currentIndex: number): BackTargetCandidate\[\] \=> {
  
  
  const backTargetStack: BackTargetCandidate\[\] = \[\]
  const pathnamesInStack = new Set<string\>()

  for (let i = 0; i <= currentIndex; i++) {
    const url = entries\[i\]?.url

    
    if (!pathnamesInStack.has(url.pathname)) {
      backTargetStack.push(url)
      pathnamesInStack.add(url.pathname)
      continue
    }

    
    
    while (backTargetStack.length > 0) {
      const lastCandidate = backTargetStack.at(-1)
      if (!lastCandidate) break

      if (lastCandidate.pathname === url.pathname) {
        
        backTargetStack\[backTargetStack.length - 1\] = url
        break
      }

      
      const removedCandidate = backTargetStack.pop()
      if (removedCandidate) {
        pathnamesInStack.delete(removedCandidate.pathname)
      }
    }
  }

  return backTargetStack
}

const resolveFromPage = (backTargetStack: BackTargetCandidate\[\], currentUrl: string | undefined ): FromPage | undefined \=> {
  
  const currentPathname = new URL(currentUrl).pathname
  const currentPageExistsInStack = backTargetStack.some(({ pathname }) \=> pathname === currentPathname)
  const backTargetCandidate = currentPageExistsInStack ? backTargetStack.at(-2) : backTargetStack.at(-1)

  return backTargetCandidate ? createFromPage(backTargetCandidate.url) : undefined
}

### コードの解説

まず`buildBackTargetStack`関数によってスタックを作成します。  
スタック生成は、「`pathname`がまだスタックになければpushし、すでにあればその`pathname`より後ろに積まれていた履歴を削除する」といったアルゴリズムで行います。  
例えば、① → ② → ③ → ④ → ③ → ② と移動した場合は次のようになります。

1.  ① → ② → ③ → ④までは、スタックには `[①, ②, ③, ④]` と積まれる
2.  その後、③が再登場したら「④から③に戻ってきた」とみなして、スタックを `[①, ②, ③]` に巻き戻す
3.  続けて②が再登場したら、スタックは `[①, ②]` になる（さらにその後で③へ進んだとすると、スタックは `[①, ②, ③]` になる）

`resolveFromPage`関数では`buildBackTargetStack`関数で作成したスタックを元に、一つ前のURLを返します。  
スタック操作が正しく行えれば、理論上任意のページをチェックできそうです。

### 実装3の問題点

一見問題なさそうですが、以下のようなバグが発生しました。

1.  資格一覧画面 → 資格詳細画面 → 従業員詳細画面 に遷移する
2.  AppNaviから従業員一覧画面に遷移する
3.  1の手順で詳細に遷移した従業員の詳細画面に再度遷移する

このとき、従業員詳細画面の戻るリンクは「従業員一覧画面へ戻る」となるべきですが、実際には「資格詳細画面へ戻る」となってしまいます。

※AppNaviはプロダクト内の主要な機能を切り替えるためのコンポーネントです。  
see: [https://smarthr.design/products/components/app-navi/](https://smarthr.design/products/components/app-navi/)

これは、実装3が以下のように動作してしまうためです。

1.  資格一覧 にいる（`stack = [資格一覧]`）
2.  資格詳細 に遷移する（`stack = [資格一覧, 資格詳細]`）
3.  従業員詳細 に遷移する（`stack = [資格一覧, 資格詳細, 従業員詳細]`）
4.  AppNavi から 従業員一覧 に遷移する（`stack = [資格一覧, 資格詳細, 従業員詳細, 従業員一覧]`）
5.  そこから同じ 従業員詳細 にもう一度遷移すると、実装3は「同じ `pathname` が再登場した ＝ 戻ってきた」と解釈して、従業員一覧 を消す（`stack = [資格一覧, 資格詳細, 従業員詳細]`）

## 実装4: resetを追加したスタックを使う

そもそも一覧画面はAppNaviから直接遷移するトップレベルのページであり、そこからどこかへ戻るということはありません。  
そのためそのタイミングでスタックを空にすれば良いという発想です。

本来は戻るという処理を作るためだけなのですが、一覧ページというドメイン情報を考慮しないといけなくて非常に心苦しい実装です。  
しかし致し方ありません。

type FromPage \= {
  url: string
  name: string
}

type PageKind \= 'list' | 'matrix' | 'detail'

type PageConfig \= {
  matcher: (pathname: string) \=> boolean
  kind: PageKind
  displayName: string
  resetsStack: boolean
}

type BackTargetCandidate \= FromPage & {
  pathname: string
  resetsStack: boolean
}

const PAGE\_CONFIGS: PageConfig\[\] = \[
  
  { matcher: (p) \=> p.startsWith('/crews/'), kind: 'detail', displayName: '従業員詳細', resetsStack: false },
  { matcher: (p) \=> p === '/crews', kind: 'list', displayName: '従業員一覧', resetsStack: true },
  
  { matcher: (p) \=> p.startsWith('/qualifications/matrix'), kind: 'matrix', displayName: '資格マトリクス', resetsStack: true },
  { matcher: (p) \=> p.startsWith('/qualifications/'), kind: 'detail', displayName: '資格詳細', resetsStack: false },
  { matcher: (p) \=> p.startsWith('/qualifications'), kind: 'list', displayName: '資格一覧', resetsStack: true },
  
\]

const findPageConfig = (pathname: string): PageConfig | undefined \=>
  PAGE\_CONFIGS.find((config) \=> config.matcher(pathname))

export const getFromPage = (fallbackUrl: string): FromPage \=> {
  const entries = window.navigation.entries()
  const currentEntry = window.navigation.currentEntry

  const backTargetStack = buildBackTargetStack(entries, currentEntry.index)
  const fromPage = resolveFromPage(backTargetStack, currentEntry.url)

  return fromPage ?? createFromPage(fallbackUrl)
}

const buildBackTargetStack = ( entries: NavigationEntryLike\[\], currentIndex: number ): BackTargetCandidate\[\] \=> {
  
  
  const backTargetStack: BackTargetCandidate\[\] = \[\]
  const pathnamesInStack = new Set<string\>()

  for (let i = 0; i <= currentIndex; i++) {
    const url = entries\[i\]?.url

    if (url.resetsStack) {
      processContextSwitch(backTargetStack, pathnamesInStack, url)
    } else if (!pathnamesInStack.has(url.pathname)) {
      processNewPage(backTargetStack, pathnamesInStack, url)
    } else {
      processBackNavigation(backTargetStack, pathnamesInStack, url)
    }
  }

  return backTargetStack
}

const processContextSwitch = (
  backTargetStack: BackTargetCandidate\[\],
  pathnamesInStack: Set<string\>,
  candidate: BackTargetCandidate,
): void \=> {
  backTargetStack.length = 0
  pathnamesInStack.clear()
  backTargetStack.push(candidate)
  pathnamesInStack.add(candidate.pathname)
}

const processNewPage = (
  backTargetStack: BackTargetCandidate\[\],
  pathnamesInStack: Set<string\>,
  candidate: BackTargetCandidate,
): void \=> {
  backTargetStack.push(candidate)
  pathnamesInStack.add(candidate.pathname)
}

const processBackNavigation = (
  backTargetStack: BackTargetCandidate\[\],
  pathnamesInStack: Set<string\>,
  candidate: BackTargetCandidate,
): void \=> {
  while (backTargetStack.length > 0) {
    const lastCandidate = backTargetStack.at(-1)
    if (!lastCandidate) break

    if (lastCandidate.pathname === candidate.pathname) {
      
      backTargetStack\[backTargetStack.length - 1\] = candidate
      break
    }

    
    const removedCandidate = backTargetStack.pop()
    if (removedCandidate) {
      pathnamesInStack.delete(removedCandidate.pathname)
    }
  }
}

### コードの解説

ほぼ実装3と同じです。  
差分はあらかじめ画面ごとに`resetsStack`という値を定義しておき、`buildBackTargetStack`関数で`resetsStack`が`true`であればスタックを空にするという処理が入っているところです。

## 結論

Navigation APIを使えば直前のページ情報を取得できるため、一見簡単そうに見える機能でしたが、実際に実装してみると「往復する履歴」や「別経路からの再訪問」といった想定外のケースに遭遇しました。  
実装1から実装3まで試行錯誤を重ね、最終的にはページの種類に応じてスタックをリセットすることで、安定した動作を実現できました。

シンプルに見える機能でも、実際のユーザー行動を考慮すると意外な落とし穴があるものです。  
同じような機能を実装する際の参考になれば幸いです。

## (おまけ)リンクによる遷移ではなくブラウザバックと同様の挙動にするのはどうか

やりたいことは一つ前に**“戻る”**ということなのに、リンクによる遷移で実装しようとしていることが複雑さを生み出している根本原因であると言えそうです。  
そのため、戻るなのであれば`router.back`のように単に戻るで実装できないかという案です。

この実装にするとしても、「従業員一覧画面に戻る」というように遷移元の画面の名前が欲しい場合は結局のところ頑張らなければならなさそうです。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

\[[https://hello-world.smarthr.co.jp/:embed:cite](https://hello-world.smarthr.co.jp/:embed:cite)\]