---
title: "Speculation Rules APIでウェブサイトのページ遷移を速くする - クリック前にプリレンダリングする実装手法"
source: "https://ics.media/entry/260415/?utm_source=atom&utm_medium=referral&utm_campaign=feed"
publishedDate: "2026-04-14"
category: "frontend"
feedName: "ICS MEDIA"
author: "narayama"
---

通常のウェブページでは、リンクをクリックしてから次のページの読み込みが始まります。もしクリックする前にブラウザーが次のページを裏側で準備していたら、クリック直後にページが表示され、待ち時間をほとんど感じません。この「先読み」をブラウザーの機能として実現するのが「Speculation Rulesスペキュレーションルールズ API」です。リンクをたどるたびに感じていた読み込みの間が少なくなり、ページ間の移動がスムーズに感じられるようになります。

たとえばユーザーがリンクにマウスカーソルを乗せたタイミングで、ブラウザーがそのリンク先のページをバックグラウンドで先読みします。リンクをクリックした時点ですでにページの準備が終わっているため、瞬時にページが切り替わります。先読みの開始タイミングは`eagerness`で調整でき、ホバーやクリック直前の操作など、ユーザーの行動に応じてブラウザーが発動します。

本記事ではSpeculation Rules APIの仕組みから実装方法、注意点までをデモを交えて解説します。

後述するデモの動きをDevToolsで確認し、どのような動きになっているかを記録した動画です。 リンクにマウスカーソルを乗せたタイミングで、ページの先読みが行われていることがわかります。

### なぜSpeculation Rulesなのか

ページの先読み自体は新しい概念ではありません。`<link rel="prefetch">`や`<link rel="prerender">`といった仕組みは以前から存在していました。しかし、これらにはいくつかの制約がありました。

-   `<link rel="prefetch">`: レスポンスをキャッシュするのみで、レンダリングまでは行わない
-   `<link rel="prerender">`：W3Cの『Resource Hints』で定義されていたが、実際にプリレンダリングを実装したのはChromeのみで、後に非推奨化。内部的にはNo-State Prefetchに変更され、実際にはプリレンダリングを行っていなかった

Speculation Rules APIはこれらの課題を解決する仕様です。WHATWG HTMLに組み込まれた標準仕様として、次のような特徴があります。

-   **宣言的なJSON構文**：`<script type="speculationrules">`タグ内にJSONでルールを記述する
-   **ドキュメントルール**：URLパターンやCSSセレクターでリンクを自動マッチングでき、手動でURLを列挙する必要がない
-   **eagernessの制御**：先読みの開始タイミングを4段階で調整できる
-   **本物のプリレンダリング**：バックグラウンドでJavaScript実行を含む完全なレンダリングを行う

Speculation Rules API自体はChrome・Edge 109（2023年1月）から利用可能でしたが、ドキュメントルールや`eagerness`の追加（Chrome・Edge 121〜122、2024年前半）によって実用的な構成が組めるようになりました。加えて、導入事例やパフォーマンスデータが蓄積されてきたことで、実践投入を勧められる段階に入りました。

### どの画面で体験がよくなるのか

Speculation Rules APIは、遷移先がある程度予測できる画面でとくに効果を発揮します。

-   **ECサイトの商品一覧から商品詳細への遷移**：ユーザーが一覧から気になる商品にホバーしたタイミングで、詳細ページをプリレンダリングできる
-   **ニュース・ブログの記事一覧から記事ページへの遷移**：見出しや画像にホバーした時点で、記事本文をバックグラウンドで準備できる
-   **ランディングページからコンバージョンページへの遷移**：「お申し込みはこちら」のようなボタンのリンク先は1ページに決まっていることが多く、`eagerness: immediate`でプリレンダリングする戦略が有効

SPA（シングルページアプリケーション）のようにクライアントサイドルーティングで先読みを内蔵している構成では、同等の仕組みをフレームワーク側で用意できる場合があります。一方、ページ単位で再読み込みが発生しやすいMPA（マルチページアプリケーション＝複数のHTMLページがあるウェブサイト）では、Speculation Rules APIを追加するだけで「クリック前の準備」を実現しやすく、体感速度の改善を得やすいです。

実際の導入効果として、web.devで公開されているケーススタディでは次のような成果が報告されています。

-   **Ray-Ban**（アイウェアブランド）：モバイルのLCPが4.69秒から2.66秒へ改善（約43%の短縮）
-   **Monrif**（イタリアの出版グループ）：デスクトップのLCPが17.9%改善、エンゲージメントが8.9%向上

参考：

-   [web.dev - Speculation Rules APIを使用した事前レンダリングによって、Ray-Banがコンバージョン率を2倍にし、離脱率を13%削減した方法](https://web.dev/case-studies/rayban-speculation-rules)
-   [web.dev - MonrifがSpeculation Rulesのプリレンダリングとバックフォワード キャッシュでエンゲージメントを8.9%向上させ、LCPを17.9%削減した方法](https://web.dev/case-studies/monrif-cwv)

### 何が起きているか

通常のページ遷移と、Speculation Rulesを使った場合の違いを比較します。

#### 通常のページ遷移

1.  ユーザーがリンクをクリック
2.  ブラウザーがHTTPリクエストを送信
3.  HTMLレスポンスを受信
4.  サブリソース（CSS・画像・JSなど）を取得
5.  レンダリング完了後にページを表示

#### Speculation Rulesを使った場合（`eagerness: moderate`の例）

1.  ユーザーがリンクにホバー（デスクトップでは200ミリ秒の滞在、またはpointerdown）
2.  ブラウザーがバックグラウンドでページのプリレンダリングを開始
3.  HTML取得 → サブリソース取得 → レンダリングが裏側で完了
4.  ユーザーがクリック
5.  プリレンダリング済みのページが表示

![](https://ics.media/entry/260415/images/images/260415_speculation_rules_timeline.png)

ポイントは、クリックした時点ですでにページのレンダリングが完了している点です。通常であればクリック後に発生するネットワーク通信やレンダリングの待ち時間がなくなり、体感としては「瞬時に切り替わった」ように感じられます。

### DevToolsでの確認方法

Speculation Rules ONではクリック後の遷移待ちがほぼ消えます。ここからは、その動作の詳細をChrome DevToolsで確認します。

#### Applicationパネル

Chrome DevToolsの［Application］パネルを開き、左メニューから［Background services］→［Speculative loads］を選択します。ここでは次の情報を確認できます。

-   ［Rules］：適用されているルールセットの詳細
-   ［Speculations］：現在のページで検出されたSpeculation Rulesの一覧と、各先読みの状態（Ready・Runningなど）

**※注意：DevToolsを開いた状態でページを再読み込みしてください。** DevToolsを開く前に発生した先読みは記録されません。

なお、DevToolsではこの先読みの仕組みを「Speculative loads（投機的読み込み）」と表記しています。

![](https://ics.media/entry/260415/images/images/260415_speculation_rules_devtools_speculative_loads.jpg)

#### Networkパネル

prefetchのリクエストは現在のページのNetworkパネルに表示されます。リクエストヘッダーに`Sec-Purpose: prefetch`が付与されるため、通常のリクエストと区別できます。

prerenderは別のレンダラーで実行されるため、現在のページのNetworkパネルには表示されません。DevTools上部のドロップダウンからプリレンダリング中のページに切り替えると、そのページのネットワークリクエストを確認できます。こちらのヘッダーは`Sec-Purpose: prefetch;prerender`です。

### 基本的な実装

Speculation Rules APIの実装はとてもシンプルです。HTMLの`<head>`タグ内か`<body>`タグ内に、次の`<script>`タグを追加するだけです。

```
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

この記述だけで、デスクトップではユーザーがページ内のリンクに200ミリ秒ホバーすると、ブラウザーがそのリンク先をバックグラウンドでプリレンダリングします。

コードの構造を整理します。

-   `"prerender"`: アクションの種類。`"prefetch"`（HTMLのみ取得）と`"prerender"`（完全なレンダリング）の2種類がある
-   `"where"`: ドキュメントルール。ページ内のリンクをURLパターンやCSSセレクターでマッチングする
-   `"href_matches"`：URLのパターン。`"/*"`は同一オリジン内のすべてのパスにマッチする
-   `"eagerness"`: 先読みの積極度。`"moderate"`はデスクトップでは200ミリ秒のホバーをきっかけに発動する

特定のURLのみを対象にしたい場合は、`where`の代わりに`urls`を使ったリストルールも利用できます。

```
<script type="speculationrules">
{
  "prerender": [{
    "urls": ["/products/", "/about/"]
  }]
}
</script>
```

実装したら、前述のDevToolsのApplication → Speculative loadsで動作を確認しましょう。

### デモ：View Transitions APIとの併用

一覧ページから詳細ページへの遷移デモです。View Transitions APIとSpeculation Rulesを組み合わせることで、MPAでもスムーズなページ遷移アニメーションと表示を両立できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260415_speculation_rules/02/)
-   [コードを確認する](https://github.com/ics-creative/260415_speculation_rules/tree/main/02)

View Transitions APIの詳細については、記事『[View Transitions API入門](https://ics.media/entry/230510/)』をあわせてご覧ください。

### eagernessの選び方

`eagerness`プロパティは、先読みを開始するタイミングを制御します。4つの値が用意されており、先読みを始めるタイミングはブラウザーがユーザーの操作を見て判断します。

設定

タイミング

用途

`immediate`

ルール検出直後

遷移先がほぼ決まっているページ（LPの申し込みボタンなど）

`eager`

比較的早い段階で発動

`prefetch`向き

`moderate`

200ミリ秒のホバー、またはpointerdown

`prerender`の推奨設定

`conservative`

pointerdownやタップ直前の操作

副作用リスクがある場合

次のデモは、Ray-Banの事例を踏襲したECサイトの商品一覧→商品詳細の遷移デモです。デスクトップでは商品タイルへのホバーで`moderate`のプリレンダリングが発動し、モバイルではホバーが使えないため最初の4商品を`immediate`でプリレンダリングします。商品詳細ページは画像が多く、Speculation Rules ON/OFFの体感差がはっきり出ます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260415_speculation_rules/03/)
-   [コードを確認する](https://github.com/ics-creative/260415_speculation_rules/tree/main/03)

実用上の推奨パターンは、`prefetch`と`prerender`を組み合わせる方法です。

```
<script type="speculationrules">
{
  "prefetch": [{
    "where": { "href_matches": "/*" },
    "eagerness": "eager"
  }],
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

`prefetch`を`eager`で広く先読みしつつ、`prerender`は`moderate`でユーザーの明確な操作があったリンクに絞って実行します。通信帯域とメモリの消費を抑えながら、表示直前のページを高速に開けます。

#### Chromium系ブラウザーの同時先読み数の上限

Chrome・Edgeはリソース保護のため、同時に保持できる先読み数に上限を設けています。

`eagerness`

Prefetch

Prerender

`immediate`

50

10

`eager` / `moderate` / `conservative`

2（FIFO）

2（FIFO）

`eager`/`moderate`/`conservative`はFIFO（先入れ先出し）方式です。上限の2件に達した状態で新しいリンクにホバーすると、もっとも古い先読みが自動的にキャンセルされます。キャンセルされた先読みはリンクに再度ホバーすれば再トリガーされます。

`immediate`の上限は動的に管理されます。`<script type="speculationrules">`要素をDOMから削除するとスロットが解放され、新しい先読みを追加できます。前述のデモのON/OFFトグルはこの仕組みを利用しています。

なお、次の条件ではChrome・Edgeが先読み自体を無効化します。

-   **HTTPの`Save-Data`ヘッダーが有効（データ節約状態）**
-   **Chromeの省エネモードが有効で、かつバッテリー残量が少ない**
-   ユーザーが設定で**ページのプリロードを無効**にしている
-   デバイスの**メモリが逼迫**している

前述の`prefetch`（eager）と`prerender`（moderate）の組み合わせは、この上限を踏まえた実用的なパターンです。

### 落とし穴と対処

Speculation Rules APIを導入する際に注意すべき点を3つ紹介します。

#### 1\. 副作用のあるURLを除外する

ログアウトURLやカートへの追加URLなど、GETリクエストで副作用が発生するURLは先読みの対象から除外する必要があります。`where`条件に`not`を使います。

```
<script type="speculationrules">
{
  "prerender": [{
    "where": {
      "and": [
        { "href_matches": "/*" },
        { "not": { "href_matches": "/logout" } },
        { "not": { "href_matches": "/cart/add/*" } },
        { "not": { "selector_matches": "[data-no-prerender]" } }
      ]
    },
    "eagerness": "moderate"
  }]
}
</script>
```

`selector_matches`を使えば、HTML属性で個別に除外対象を指定することもできます。

#### 2\. アナリティクスの二重計測を防ぐ

プリレンダリング中はJavaScriptが実行されるため、アナリティクスのページビューが二重にカウントされる可能性があります。`document.prerendering`プロパティと`prerenderingchange`イベントでガードしましょう。

```
if (document.prerendering) {
  document.addEventListener("prerenderingchange", () => {
    // ユーザーが実際にページを表示したタイミングでアナリティクスを初期化
    initAnalytics();
  }, { once: true });
} else {
  initAnalytics();
}
```

Google AnalyticsやGoogle Publisher Tagはすでにプリレンダリングを考慮した実装になっています。サードパーティのツールを使用している場合は個別に対応が必要です。

#### 3\. ブラウザー拡張機能による無効化

uBlock Originなどの広告ブロッカーは、プリフェッチやプリレンダリングを無効化することがあります。これはユーザーのプライバシー保護のための意図的な動作です。

Speculation Rules APIはあくまで**プログレッシブエンハンスメント**として扱いましょう。無効化されてもページの基本的な遷移には影響しません。

### 対応ブラウザー

Speculation Rules API（`<script type="speculationrules">`）のベース機能は、Chrome・Edge 109（2023年1月）以上で利用可能です。

ただし、本記事で多用しているドキュメントルール（`where`）と`eagerness`を前提にした実装は、Chrome・Edge 121以降（2024年前半、実運用目線では122以降）を対象に考えるのが安全です。Firefoxは未対応で、Safariは現時点では標準利用できません。

参照：[Can I use…](https://caniuse.com/mdn-html_elements_script_type_speculationrules)

### まとめ

本文で紹介したように、Speculation Rules APIを使うとMPAのページ遷移待ちを短縮できます。NuxtやNext.jsではクライアントサイドルーティングによる先読みが使える一方で、静的サイトやWordPressのようなMPAでは、Speculation Rules APIを導入する価値がとくに大きいです。

現時点での対応はChromium系ブラウザーに限られますが、非対応ブラウザーでは単に無視されるため、既存サイトに導入しても問題ありません。

ウェブサイトの表示速度改善については記事『[画像読込を高速化するために取り組んでいること](https://ics.media/entry/221223/)』もあわせてご覧ください。