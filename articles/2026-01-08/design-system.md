---
title: "メルカリの Design System をリニューアルしました"
source: "https://engineering.mercari.com/blog/entry/20250624-the-story-behind-mercari-design-system-rebuild/"
publishedDate: "2025-06-25"
category: "engineering"
feedName: "Mercari Engineering"
---

Design System チームの engineering manager をしている vwxyutarooo です。  
私達はメルカリのアプリ・ウェブ開発に利用している Design System をフルリニューアルしました。  
この記事で Design System に抱えていた問題とそれをどのように解決しようとしているのか、そのコンセプトを紹介していきます。

## 既存の Design System に抱えていた課題

既存の Design System は社内で 3.0 と呼ばれており、[GroundUp](https://engineering.mercari.com/blog/entry/20221213-ground-up-app/) と呼ばれるメルカリのアプリとウェブを刷新するプロジェクトの一部として2020年頃からデザイン・開発が始まりました。  
3.0 と聞くと随分進んでいるように見えますが、様々な開発背景により特定プラットフォームを対象にしたものや、日の目を浴びることのなかった過去のバージョンなどが含まれており、実質 3.0 が全社的に取り組んで開発された最初の Design System v1 となっている背景があります。

おおよそ 5 年の運用期間を経て、3.0 で作られたコンポーネントは当初の利用想定ケースを大きく超える状況に対処する場面が多く見られるようになりました。その結果、多数の新規機能開発で Design System のコンポーネントでは表現できず、シンボルをディタッチして変更を加えたコンポーネントや社内でカスタムコンポーネントと呼んでいる非公式のコンポーネントが多数作成される事態に陥っていました。

なぜこのようなことが起こったかを、ItemObject と呼ばれているコンポーネントの例を用いながら簡単に解説します。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/c5beb314-transition.png)

これは複数のスクリーンで頻繁に使用されるコンポーネントです。3.0開発時は共通と思われるパーツだったため単一のコンポーネントとして切り出され、いくつかのユニークな要素をプロパティによって表示・非表示を切り替えることで対応していました。社内ではこれを polymorphic API と呼んでいます。

しかし 3.0 リリース後の継続した機能開発により必要な要素は増え続け、必要とされる表示パターンは増え続けました。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/138817e2-frame-2607.png)

この方式の難しいところは個別の UI 最適が進むほど考慮すべき組み合わせパターンが倍に増えていく点です。さらに、特定の要素 A が表示されているときに出現する要素 B or C のように構造が深くなっていき、複雑さが増していきます。私達はこの構造をコンポーネントの Polymorphic API と定義し避けるべきコンポーネントデザインと考えています。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/47827abb-frame-2602.png)

この状況を打開するため、コンポーネントの定義を刷新し異なるコンセプトで Design System を4.0として再構築することにしました。

## Atomic Design Methodology

新しいコンポーネントの設計指針として Atomic Design を採用することにしました。古くから存在した概念で、2013年に Brad Frost によってそのアイディアが初めて提唱されたものです。  
[Atomic Design – Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)

Atomic Design は旬をすぎたものとして扱われるようになって久しいですが、これは多くの場面で誤解のもとに運用されたり、拡大解釈されたりすることで、本来意図していない利用をされていることが大きいと考えています。  
[Brad Frost: Is Atomic Design Dead? – Hatch Conference Berlin 2023](https://www.youtube.com/watch?v=PK_PICNTgAg)

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/df433f33-screenshot-2025-06-22-at-16.22.57.png)

よくある誤解として Atomic Design を実装リードで適用しようとしてしまう、或いは実装でのみ実現しようとしてしまう例がよく見られます。  
私達の解釈では、Atomic Design は Design System を開発・運用するデザイナーとエンジニアのためのコンポーネント設計フレームワークであり共通言語です。実装が Atomic Design を強く意識する必要はなく、利用者に強調すべき情報でもありません。

Atomic Designでは、UIの部品を最小単位の「atoms(原子)」に分解し、それらを組み合わせて「molecule(分子)」のようなより大きな部品を構成します。以前は一つの部品として扱っていたものを、複数の小さな部品に分割して組み立て直す考え方です。  
Atomic design によるコンポーネントの分解・設計手法に関しては Brad Frost 本人を含む多くの解説記事や動画が存在するため詳細は省略しつつ、先程紹介した Item Object を 4.0 の考え方で構築した例で簡単に紹介します。

まずセオリー通り各コンポーネントをその役割の最小単位にまで分割していきます。  
以下の画像の例も、3.0 では1つのコンポーネントとして扱われていましたが、4.0 は 2 つの atoms と呼ばれる最小単位のコンポーネントになります。そしてこれらのパーツを組み合わせてさらにパーツを構成します。この atoms から構成されるコンポーネントを molecule と呼びます。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/c1247611-frame-2610.png)

これを繰り返し、最終的にバラバラのパーツから ItemObject などのよりハイレベルなパーツを構築可能にします。前提として UI をパーツで組み立て可能にするという点を念頭に置きつつ、組み立て後のパーツが汎用的なコンポーネントであるものを molecules や organisms として提供します。

ItemObject のようにユースケースが細かく別れているコンポーネントに関しては使用頻度の高い汎用的なものを優先的に Design System のコンポーネントとして管理しつつ、利用シーンが多くないものや僅かな要素の違いを持つユースケースにはあえて organisms として完成形を提供せず、利用シーンで組み立てるようにしています。  
コンポーネントを利用時に組み立てる、というのも場合によっては利用者の負担になります。そのため、組み立て方法の例をレシピ/設計図として配布し補助的に活用しています。

レシピ/設計図を提供するかどうかは、コンポーネントの利用頻度やコンテンツ/コンテキスト依存度から判断しますが、レシピや設計図 (Blueprint) に関しては Atomic Design とは異なる概念となるため次の節でもう少し詳しく紹介します。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/7847379a-frame-2609.png)

## Component Design Strategy

Atomic design は Design System のコンポーネントの分解・構築のためのフレームワークを提供しますが、なにがコンポーネントであるべきか、どんなコンポーネントが Design System として管理されるべきかその境界を示してはいません。

私のチームでは Design System から内向きのレイヤーを Atomic Design で、外向きのレイヤーを自分たちで独自に設計しました。次の図はそのレイヤーを簡易的に表現したものです。内側に行くほど Design System で、外側に行くほど Design System ではなくなります。厳密に Design System チームの持ち物として責任を追うのは青の領域ですが、現実的にはっきりとした境界線を引けることは稀で、その境界はグラデーションになっていることが多いため、そのグラデーションを意図してこのような図で表現しました。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/61e66f52-frame-2627.png)

1つ1つのレイヤーを順番に解説していきます。

**Snowflakes**

-   ワンオフコンポーネント。コンテンツやコンテキストに依存しているなどの理由から Design System としては考慮されない
-   控えめな使用を推奨  
    **Custom Component**
-   Design System のコンポーネントスペックでは表現できない UI を構成するため、シンボルからディタッチされたり、stroke など Figma 上で制約を設けることができないプロパティをコンポーネントのスペックを超えて改造されたものを指す
-   Design System としては非常に不本意なコンポーネントであるため将来的にそのスペックが Design System でサポートされるか、或いは UI の仕様を調整することで薄くなっていくべきレイヤー  
    **Blueprint**
-   直訳すると青写真という意味になりますが、設計図や完成予想図の意味で使用される
-   Blueprint は、Figma のデザインデータから iOS, Android, Web のソースコードまで包括的にその設計図が提供される
-   主に Design System Component とするにはコンテンツ/コンテキスト依存が強いが頻繁に活用されるもの、或いは snowflakes のようなワンオフに近い用途を持つが、その組み立て方法が複雑なときに活用する  
    **Design Recipes**
-   Figma のデザインファイルでのみ設計図が提供されるコンポーネント。ソースコード上では提供されない
-   フレームワークの恩恵を受けるなど実装上コンポーネントとして定義する必要性が低いものに対し、デザイン効率化のため Figma のデザインファイルでのみコンポーネントとして利用 (レイアウト系のコンポーネントに多い)
-   Blueprint がデザイン (Figma) とソースコード両方のレシピを提供するのに対し、Design Component はデザイン (Figma) のレシピのみが提供される  
    **Design System**
-   コンテンツ/コンテキスト非依存で再利用可能な独立したコンポーネント

実はこれらのレイヤーは Brad Frost により提唱されている vocabulary に深く影響を受けているため、彼に詳しい人にとっては既視感のあるものになっています。  
ただこれらには Atomic Design のような明示的な名前はついていないため、単に記事中の表現から component vocabulary と呼ぶことにします。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/5bc44e43-screen-shot-2021-02-03-at-10.48.35-am-1024x833-1.png)  
[Design system components, recipes, and snowflakes](https://bradfrost.com/blog/post/design-system-components-recipes-and-snowflakes/)

すべての UI コンポーネントが Design System で完結するデザイン組織が最も strict なデザイン組織と言えるかもしれません。実現は難しいですが、そのような組織も少なからず存在しているようです。

このモデルは、もう少し合理的な妥協ラインを求めた場合にとてもフィットします。プロダクト開発でどうしても発生するコンテンツ依存なコンポーネントをワンオフとして一定数許容しつつ、そこにボキャブラリーとレイヤーを与えることで管理対象とし、薄く維持するためのマインドセットを生み出すことができます。そして、Design System と Snowflakes の間を埋める再利用可能だが Design System として管理するには十分な動機が (まだ) ないものをレシピとすることで、全体のコンポーネントレイヤーにグラデーションを与え、メンテナンスコストとリターンの最適化を図る意図があります。

## コンポーネント設計・分割指針

次に Design System コンポーネントの設計・分割指針を見ていきます。冒頭で紹介した通り、以前のシステムでは最終的に1つのコンポーネントに振る舞いや variant を持たせ過ぎたことで利便性やメンテナンス性の低下を招きました。  
これらの教訓を踏まえ、新しいシステムではセマンティックでシンプルな分解を重視し、以下の4つをコンポーネント設計の指針としました。

**Semantic**  
“ビジュアル的に近いものをコンポーネントとするのではなく、挙動や意味的な分類によってコンポーネントを定義/分割するし常に一貫した振る舞いを提供します。”

例としてメルカリにはチップと呼ばれているラウンド状のクリッカブルなコンポーネントがあります。  
3.0 では全て1つのコンポーネントとして定義されていましたが、以下のようによく似た見た目を持つコンポーネントに対して大きく異なる振る舞いをすることが分かります。

-   トグル: タップする事にステートの変化
-   リムーバブル: タップすると消える
-   文字入力: タップが別のアクションのトリガーとなる

一見、共通コンポーネントの異なる状態を利用しているだけに見えますが、タップ可能領域やタップ時、およびホバー時 (Web) のスタイルなども違ってきます。1つのコンポーネントで表現するには不要な依存関係を考慮する必要が出てくるため、コンポーネントの分割対象とすることで依存関係がシンプルになりメンテナンス性が向上します。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/412fe869-frame-2616.png)

**Properties**  
“異なる色、角の丸みや角ばっているなどに基づいてわずかな視覚的バリエーションを持つことができます。但しコンポーネントの形や振る舞いを変えることはできません。”

先に紹介したチップコンポーネントでは、ストロークのスタイルを solid/dotted のようなプロパティを持たせています。これは視覚的なバリエーションであり形や振る舞いを変えることはないため、1つ目の Semantic 指針を侵害しません。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/2b9f717c-frame-2617.png)

**Optional Elements**  
“コンポーネントはオプショナルな要素を持つことができる (オプションのアイコンやテキストなど)”

ボタンの prefix/suffix アイコンのような子要素を持たせることができます。  
次の4つ目の指針で紹介する No polymorpihc API と相反することがないよう注意する必要があります。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/995a589d-frame-2618.png)

**No polymorphic API**  
“一貫したAPIを持つべきである (必須となるプロパティが別のプロパティの存在の有無に基づいて変更されるべきではない)”

画像とコードの例を用いて解説します。次の画像は、3.0の古い Design System で定義されていた ItemThumbnail というコンポーネントで、3.0 では Large size のみに割引や値段の要素が許可されていましたが、これは polymorphic API とみなし、新しい指針では避ける設計としています。  
“特定の条件の時に発生するネストされた条件”には、最終的に冒頭で紹介したような管理の複雑性を生じます。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/3c5df672-frame-2620.png)

Polymorphic API を含むコード例:

```
ItemThumbnail(
    size = Medium
)

ItemThumbnail(
    size = Large(
        discountPrice = 900¥,
        price = 1,000¥
    )
)
```

4.0 ではコンポーネントの分解と再構築により、これらの問題を回避しています。ItemTile という Organism コンポーネントを用意し、構成要素として ItemThumbnail を含む Atoms, Molecules を持たせています。

![](https://storage.googleapis.com/prd-engineering-asset/2025/06/267374d3-screenshot-2025-03-13-at-17.02.16.png)

Polymorphic API を含まないコード例:

```
ItemThumbnail(
    leftBottomContentSlot = <other atoms/molecules/organism>
)
```

**結果**  
Atomic Design を採用した私達の Design System は、最終的に150弱の数のコンポーネントに再分解され、以下のようなコンポーネント分布の構成になりました。これが適切なのか過不足あるのかは現時点で判断することはできませんが、今後の運用で明らかになっていくはずです。  
Atoms: 50  
Molecules: 60  
Organisms: 40

また、冒頭でから例として上げている ItemObject はそのレイアウトだけを提供する ObjectLayout と、パーツを組み上げる blueprint に分かれて提供する方法に着地しました。  
**ObjectLayout:**  
![](https://storage.googleapis.com/prd-engineering-asset/2025/06/3d3ca79a-screenshot-2025-06-13-at-17.51.17.png)  
**ItemObject (blueprint):**  
![](https://storage.googleapis.com/prd-engineering-asset/2025/06/0a38c1e3-screenshot-2025-06-13-at-17.57.56.png)

条件分岐などで膨れ上がったコードも、iOS (Swift) で700行あったものが30行弱にまで削減されました。実際組立時に発生するコードもあるため純粋な削減とはなりませんが、コンポーネントの抽象化や汎用化に失敗していた部分が単純化できたと考えられます。

## まとめ

今回の Design System 4.0 刷新プロジェクトを通じて、私達は過去の課題と向き合い、より柔軟かつ持続可能なシステムへと進化させるための重要な学びを得ました。

コンポーネントの過度な汎用化が複雑性を生み、メンテナンス性を著しく低下させる教訓から、Atomic Design の原則に立ち返り、コンポーネントを最小単位に分割し、再利用性を高める設計へと移行しました。これにより、各コンポーネントが単一の責任を持つようになり、変更やテストが容易になりました。  
同時にコンポーネントがどうあるべきかを考え直しゼロから組み直すことで 3.0 で得た知識と経験を新しいシステムに反映することができました。

今後 Figma AI や Figma MCP をはじめとするデザイン及びコーディングの自動化において、ブランディングコンセプトを反映し、かつセマンティックな意味を持つ Design System コンポーネントはハブとしての役割や、AI に対してのコンテキスト提供者としてその重要性を増していくと考えています。

また続報があればお伝えしていきます。  
最後まで読んでいただきありがとうございました。