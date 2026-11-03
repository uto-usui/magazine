---
title: "デザイナーのためのshadcn/ui入門"
source: "https://zenn.dev/katsumata/articles/shadcn-ui-for-designers"
publishedDate: "2026-10-30"
category: "design-systems"
feedName: "Zenn designsystem"
author: "Katsumata"
---

## はじめに

shadcn/uiは、Reactで使えるコンポーネントのコードと、そのコードを配布する仕組みを提供するプロジェクトです。  
この記事では、デザインシステムに関わるデザイナーに向けて、shadcn/uiの特徴を紹介します。

従来のUIライブラリとshadcn/uiの大きな違いは、コンポーネントの配布形式です。  
shadcn/uiは、コンポーネントをパッケージとして配布するのではなく、コンポーネントのソースコードをプロジェクトにコピーします。

### 1-1 配布形式の違い

#### 従来のUIライブラリ：パッケージをインストールして使う

MUIなどの従来のUIライブラリは、パッケージとしてインストールし、読み込んで使います。  
コンポーネントのコードはライブラリの中にあり、自分たちが編集するファイルには含まれません。

-   見た目は、ライブラリが用意した設定の範囲で変えます。
-   範囲を超えると、コンポーネントを別のコンポーネントで包む、スタイルを上書きする、といった回避策が必要になります。

#### shadcn/ui：コンポーネントのコードをプロジェクトにコピーする

shadcn/uiでは、コンポーネントをコマンドでプロジェクトに追加します。

```
npx shadcn@latest add button
```

実行すると、Buttonのコードがファイルとしてプロジェクトにコピーされます。  
コピーされたファイルは、自分たちのコードとして扱います。

![配布形式の比較 · コンポーネントのコードがどこにあるか](https://static.zenn.studio/user-upload/deployed-images/ecb825c8eb880816ab805aa4.png?sha=7696e55432e78d707acda57c766336b1fb7e5d57)  
_配布形式の比較 · コンポーネントのコードがどこにあるか_

#### プロジェクトに置くメリット

コンポーネントを上書きしたり、包んだ別のコンポーネントを作ったりせずに、追加したコンポーネントの構造を直接編集できます。

#### 引き受けること

プロジェクト内のコードは、自分たちで管理します。  
shadcn/uiがコンポーネントを更新しても、自動では反映されません。  
shadcn/ui側の更新を反映するときは、差分を確認して手作業でコードを書き換えます。  
自分たちがカスタマイズしたコンポーネントほど、反映に手間がかかります。

### 1-2 設計思想：5つの原則

shadcn/uiのドキュメントは、その設計思想を5つの原則で説明しています。

原則

意味

Open Code

コンポーネントのコードがプロジェクト内にあり、自由に編集できる

Composition

どのコンポーネントも同じ組み立て方をするので、使い方を予測できる

Distribution

決まった形式のファイルとCLI（コマンドで操作するツール）で、コンポーネントを配布できる

Beautiful Defaults

何もしなくても整った見た目になり、コンポーネントどうしがそろう

AI-Ready

コードが公開されているので、AIが読み、理解し、編集できる

### 1-3 Registry：ソースコードを配布する仕組み

#### Registryとは

Registryは、コンポーネントのソースコードを配布する仕組みです。  
配布する側がコードをJSONファイルにまとめて公開し、利用する側がCLIで自分たちのプロジェクトに追加します。

仕組みの詳しい説明は、[shadcn/uiのRegistryのドキュメント](https://ui.shadcn.com/docs/registry)にあります。

#### npmパッケージとの関係

Registryは、npmパッケージの代わりになるものではありません。  
コンポーネントが使うヘッドレスUIなどのライブラリは、これまでどおりnpmパッケージとしてインストールされます。  
Registryで配布するのは、それらのライブラリを使って作った、自分たちで編集できるコンポーネントのコードです。

#### Registryでできること

-   **コンポーネント以外も配布できる**  
    Blocks（画面のひな形）、ページ、フォント、設定ファイル、AI向けのルールなども配布できます。  
    デザインシステム一式を、1つの項目として配布することもできます。
-   **デザインの値も一緒に配布できる**  
    CSS変数を含められるので、色・角丸・フォントなどの値を、コンポーネントと一緒に配布できます。  
    テーマだけを1つの項目として配布することもできます。
-   **依存関係をまとめて追加できる**  
    ファイルには、一緒に必要なコンポーネントとnpmパッケージの名前が書かれています。  
    CLIはその名前をたどって、必要なものをまとめて追加します。  
    たとえばログインフォームのBlockを指定すると、中で使っているButtonやInputも一緒に追加されます。
-   **利用する側の設定に合わせて追加される**  
    CLIは、利用する側の設定ファイル（`components.json`）を読み、置き場所とほかのファイルの読み込み方を合わせて書き込みます。  
    フォルダの構成が違うプロジェクトにも、同じRegistryから追加できます。
-   **複数のRegistryを組み合わせられる**  
    1つのプロジェクトで、複数のRegistryからコンポーネントを追加できます。  
    `@acme/button`のように、名前の前に配布元を表す名前（namespace）を付けて区別します。
-   **公開する範囲を選べる**  
    誰でも利用できる形でも、認証（利用できる人を限る仕組み）を付けた非公開の形でも公開できます。  
    GitHubのリポジトリを、そのままRegistryにすることもできます（2026年6月に公開リポジトリ、8月に非公開リポジトリに対応）。
-   **追加する前にコードを確認できる**  
    CLIで、書き込む前に、変更されるファイルとその内容を確認できます。  
    プロジェクト内で編集したコンポーネントと、Registryにある最新のコードとの違いも見られます。
-   **AIからも使える**  
    4-2のMCPを使うと、AIがRegistryからコンポーネントを検索し、プロジェクトに追加できます。

### 1-4 Blocks：画面単位のひな形

#### Blocksとは

Blocksは、コンポーネントを組み合わせた画面のひな形です。  
ダッシュボード、サイドバー、ログイン、サインアップなどがあります。  
コンポーネントと同じようにコマンドで追加でき、コードがプロジェクトにコピーされます。

![ダッシュボードのBlock（dashboard-01）](https://static.zenn.studio/user-upload/deployed-images/3d428eaa561ec0a020b8f29e.jpg?sha=f58e093af3b578c88123058ee753060954234ec6)

![ログイン画面のBlock（login-03）](https://static.zenn.studio/user-upload/deployed-images/cc90e0374e9bd30b36a9e28f.jpg?sha=0d95febe7fed3912ed7052a19bd6d603da7817e7)

画像は、shadcn/uiの[Blocks](https://ui.shadcn.com/blocks)にあるdashboard-01とlogin-03です。

#### 使いどころ

-   画面を一から組まずに、近いBlockを追加してから編集できます。
-   コンポーネントの並べ方や余白の取り方の見本になります。

#### 自分たちのBlocksも配布できる

Registryを使えば、自分たちのオリジナルの画面のひな形も配布できます。

## 2\. ヘッドレスUI：振る舞いを受け持つ

shadcn/uiを理解するうえで欠かせないのが、ヘッドレスUIとTailwind CSSです。  
この章では、振る舞いを受け持つヘッドレスUIを説明します。

### 2-1 ヘッドレスUIとは

ヘッドレスUIは、見た目を持たず、振る舞いだけを持つコンポーネントの土台です。  
受け持つのは、たとえば次のような振る舞いです。

-   キーボード操作
-   フォーカスの移動と、ダイアログの中にフォーカスを閉じ込めること
-   読み上げへの対応（ARIA：スクリーンリーダーにコンポーネントの役割や状態を伝える仕組み）
-   開閉と、外側のクリックやEscキーで閉じること
-   画面の端で表示の向きを変える位置合わせ

shadcn/uiのコンポーネントは、キーボード操作や開閉など、複雑な振る舞いが必要な部分だけをヘッドレスUIに任せています。

![shadcn/uiが作る部分と、ライブラリに任せる部分](https://static.zenn.studio/user-upload/deployed-images/4777babdc2bccd422f977377.png?sha=8e8b2c0a813246f45ac5dc32efe79bad99d95f2f)  
_shadcn/uiが作る部分と、ライブラリに任せる部分_

### 2-2 shadcn/uiで選べるヘッドレスUI

shadcn/uiでは、土台にするヘッドレスUIを、[Base UI](https://base-ui.com/)・[Radix UI](https://www.radix-ui.com/primitives)・[React Aria](https://react-aria.adobe.com/)の3つから選べます。  
shadcn/uiがライブラリごとにコンポーネントを作り直しているので、どれを選んでもコンポーネントの名前・構造・見た目は同じです。  
選ぶのはプロジェクトを作るときで、2026年7月からshadcn/uiはBase UIを標準指定としています。

## 3\. Tailwind CSS：クラスで見た目を組み立てる

shadcn/uiの見た目は、Tailwind CSS、Theme、CVAの3つで決まります。  
Tailwind CSSは、クラスで見た目を指定する仕組みです。  
Themeは、クラスが参照する色や角丸の値を、名前を付けて定義します。  
CVAは、クラスの組み合わせに名前を付けて、コンポーネントの選択肢にします。

![Tailwind CSS・Theme・CVAの関係](https://static.zenn.studio/user-upload/deployed-images/8fc17217197390043bb974a2.png?sha=35c06f8032b77b8d736de2970e25212dadbfbb3a)  
_Tailwind CSS・Theme・CVAの関係_

### 3-1 Tailwind CSSとは

#### Reactの開発で標準的に使われている

Tailwind CSSは、CSSを書くためのフレームワークです。  
Reactの開発では、ほぼ標準の選択肢になっています。

-   Next.js（Reactでサイトやアプリを作るためのフレームワーク）で新しいプロジェクトを作ると、最初からTailwind CSSが使える状態になります。
-   npmでの週間ダウンロード数は約1.4億回で、React（約2億回）に近い数です（2026年10月時点）。
-   v0などのAIの画面生成ツールも、Tailwind CSSのコードを出力します。

Reactに限らず、HTMLを書く環境ならどこでも使えます。

#### ユーティリティクラス

Tailwind CSSでは、1つのクラスが1つの見た目を指定します。  
HTMLにクラスを並べて見た目を作るので、別のCSSファイルを行き来しません。  
次は、shadcn/uiのButtonのクラスの一部です。

```
<button class="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80">保存</button>
```

![Buttonのクラスと寸法 · 3倍に拡大](https://static.zenn.studio/user-upload/deployed-images/647cf5350599691448976266.png?sha=50b7cff811804f5092f936d2d9b5ac5d207f89cf)  
_Buttonのクラスと寸法 · 3倍に拡大_

クラス

意味

`inline-flex items-center`

中身を横に並べ、縦の中央にそろえる

`gap-1.5`

アイコンと文字の間を6pxあける

`h-8`

高さを32pxにする

`px-2.5`

左右の余白を10pxにする

`rounded-lg`

角丸をテーマの基準の値にする

`text-sm`

文字の大きさを14pxにする

`font-medium`

文字の太さを中くらいにする

`bg-primary`

背景をテーマの`primary`の色にする

`text-primary-foreground`

文字色を、`primary`の背景に合わせた文字色にする

`hover:bg-primary/80`

ホバー中は背景を`primary`の80%の濃さにする

#### 1つの色から、用途ごとのクラスがそろう

Tailwind CSSでは、色を1つ定義すると、背景・文字・線などのクラスが自動でそろいます。  
たとえば標準の色`blue-500`なら、次のクラスが使えます。

クラス

使う場所

`bg-blue-500`

背景

`text-blue-500`

文字

`border-blue-500`

線

`ring-blue-500`

フォーカスの輪

`fill-blue-500`

アイコンの塗り

![1つの色からそろうクラス · blue-500の例](https://static.zenn.studio/user-upload/deployed-images/63e972afea25d1feffc428b3.png?sha=75b2fffb0eed00c9cfe0f4dfdc33142866f7abac)  
_1つの色からそろうクラス · blue-500の例_

どこに使うかはクラスの頭（`bg-`・`text-`・`border-`）が決め、何色かは色の名前が決めます。  
ただし、shadcn/uiのコンポーネントは、`blue-500`のような標準の色をそのまま使いません。  
理由は3-2で説明します。

#### 決まった目盛りから選ぶ

-   余白と大きさは4px刻みの目盛りで、`p-1`は4px、`p-4`は16pxです。
-   文字の大きさ、角丸、影も、名前の付いた段階から選びます。
-   目盛りにない値も`w-[123px]`のように`[]`で書けますが、値がばらつく原因になります。

![余白の目盛り · 4px刻み](https://static.zenn.studio/user-upload/deployed-images/9755355c063d8362ec20cc66.png?sha=8bc18518b1fa4119bc35ca6ed9626a2832bb5cbe)  
_余白の目盛り · 4px刻み_

#### 状態と条件はクラスの前に付ける

クラスの前に条件を付けると、その条件のときだけ見た目が変わります。  
たとえば`dark:text-white`は、ダークモードのときだけ文字を白にします。

前に付けるもの

条件

`hover:`・`focus-visible:`・`disabled:`

操作による状態

`dark:`

ダークモード

`md:`・`lg:`

画面の幅

`data-open:`など

ヘッドレスUIが出す状態

![Buttonの状態 · 2倍に拡大](https://static.zenn.studio/user-upload/deployed-images/38929696abd87a2387339115.png?sha=7a491aae5ac35d5b3af570744488803a558f13f6)  
_Buttonの状態 · 2倍に拡大_

#### デザイナーにとっての意味

-   クラスを読めば、どの値を使っているかが分かります。
-   目盛りの名前が、コードとFigmaの共通の言葉になります。
-   色や角丸の名前はCSSの中で定義し、その定義をまとめたものがテーマです（3-2）。

### 3-2 Theme：用途の名前で色をそろえる

#### 標準の色ではなく、用途の名前の色を使う

Tailwind CSSの標準の色（`blue-500`・`neutral-200`など）は、色そのものに付けた名前です。  
shadcn/uiでは、テーマで用途の名前の色を決め、コンポーネントはその色だけを使います。  
たとえば`bg-background`、`text-foreground`、`border-border`、`ring-ring`です。  
3-1の仕組みはそのまま働くので、用途の名前の色にも`bg-`・`text-`・`border-`のクラスがそろいます。

shadcn/uiの標準のテーマの色は、Tailwind CSSの標準の色と同じ値です。  
そのため、同じ見た目を2通りで書き比べられます。

用途

標準の色で書く

テーマの名前で書く

ページの背景

`bg-white dark:bg-neutral-950`

`bg-background`

カード

`bg-white dark:bg-neutral-900`

`bg-card`

本文の文字

`text-neutral-950 dark:text-neutral-50`

`text-foreground`

補足の文字

`text-neutral-500 dark:text-neutral-400`

`text-muted-foreground`

区切り線

`border-neutral-200 dark:border-white/10`

`border-border`

フォーカスの輪

`ring-neutral-400 dark:ring-neutral-500`

`ring-ring`

![用途の名前のクラス · ライトとダーク](https://static.zenn.studio/user-upload/deployed-images/0820125a137523c2a2d66427.png?sha=8ca5a28cf101df6bb0c72b9c37ea5019b21dde00)  
_用途の名前のクラス · ライトとダーク_

#### 用途の名前を使う理由：見た目の一貫性を保つため

用途の名前を使うのは、見た目の一貫性を保つためです。

-   **同じ用途には、いつも同じ色が使われる**
    -   線はすべて`border-border`です。
    -   人やAIが、場面ごとに`neutral-200`にするか`neutral-300`にするかを選ばないので、ばらつきません。
-   **ライトとダークを、コンポーネントごとに書き分けなくてよい**
    -   上の表の「標準の色で書く」列のような`dark:`の指定を、毎回そろえる必要がありません。
    -   ダークではカードと背景の色が違う、といった決まりも、テーマが持ちます。
-   **変更は1か所で済む**
    -   テーマの値を変えれば、すべてのコンポーネントに反映されます。
    -   標準の色を直接指定していると、使っている箇所をすべて探して書き換える必要があります。
-   **読めば意図が分かる**
    -   `text-muted-foreground`なら、補足の文字だと分かります。
    -   `text-neutral-500`では、なぜその色なのかが分かりません。
-   **選べる色が用途の名前に絞られる**
    -   決まった名前の中から選ぶので、迷いません。
    -   AIも同じ決まりで書けます。

#### 用途の名前の一覧

種類

名前

使う場所

面と文字

`background` / `foreground`

ページの背景と本文

面と文字

`card` / `card-foreground`

カード

面と文字

`popover` / `popover-foreground`

メニューやポップオーバー

役割の色

`primary` / `primary-foreground`

主な操作

役割の色

`secondary` / `secondary-foreground`

補助の操作

役割の色

`muted` / `muted-foreground`

控えめな背景と、補足の文字

役割の色

`accent` / `accent-foreground`

ホバー中の項目などの背景

役割の色

`destructive`

削除やエラー

線と輪

`border`・`input`・`ring`

区切り線、入力欄の枠、フォーカスの輪

その他

`chart-1`〜`chart-5`・`sidebar-*`

グラフ、サイドバー

`border-border`や`ring-ring`は、名前が重なって見えます。  
前半は使う場所、後半は色の名前を表しています。  
値は、CSS変数（値に名前を付けて1か所で持つ仕組み）で持ちます。

#### 背景と文字はペアで決める

`primary`の背景に重ねる文字の色を、`primary-foreground`としてセットで定義します。  
ペアで決めるので、コントラストもペアごとに確かめられます。  
コンポーネントの中でも、`bg-primary`には`text-primary-foreground`を組み合わせます。

#### 透過で薄い色を作る：明度違いの色を用意しなくてよい

よくあるデザインシステムでは、`primary-light`・`primary-dark`や`primary-100`〜`900`のように、明度ごとの色を別に用意する必要がありました。  
Tailwind CSSでは、色の名前のあとに`/数字`を付けると、その色の透明度を変えた版になります。  
たとえば`bg-primary/10`は、`primary`を10%の濃さにした背景です。  
明度違いの色を定義しなくても、薄い背景やホバーの色を作れます。

Tailwind CSSの標準の色には、`blue-50`〜`950`のような明度の段階があります。  
一方、shadcn/uiのテーマは用途の名前だけを持ち、段階は持ちません。  
薄い色は、透過で作ります。

![透過で作る薄い色 · 明度ごとに定義する方式との比較](https://static.zenn.studio/user-upload/deployed-images/8535040f5b03b95eac95ebcc.png?sha=e343782af0e2e40d1b4dade7d4a21c6f949f9df5)  
_透過で作る薄い色 · 明度ごとに定義する方式との比較_

shadcn/uiのコンポーネントでも、この書き方が使われています。

使う場所

クラス

ボタンのホバー

`hover:bg-primary/80`

削除ボタンの薄い背景

`bg-destructive/10`

フォーカスの輪

`ring-ring/50`

透過なので、下にある面の色によって見え方が変わります。  
ダークモードでも、同じクラスのまま暗い面になじみます。  
面が重なるところでは、見え方を確かめる必要があります。

#### ライトとダーク

テーマは、ライト用とダーク用の2組の値を持ちます。  
クラスは同じまま、値だけが切り替わります。  
背景・カード・ポップオーバー・サイドバーのように重なる面も、それぞれの名前で色を持ちます。  
コンポーネントごとに`dark:`を書く必要は、ほとんどありません。

#### 角丸もテーマで決める

角丸は、基準の値を1つ決めると、`rounded-sm`から`rounded-4xl`までの各段階がその値をもとに決まります。  
基準を変えれば、すべてのコンポーネントの角丸がそろって変わります。

![角丸の段階 · 基準の値から決まる](https://static.zenn.studio/user-upload/deployed-images/3e1fca841171596d0bb77421.png?sha=e60632dd3616e5f0b9f67d24d4ea909f002fb8fd)  
_角丸の段階 · 基準の値から決まる_

#### テーマを変える・追加する

-   値を変えると、その色を使うすべてのコンポーネントの見た目が変わります。
-   `success`のような新しい色も、テーマに追加できます。
-   追加した色は、`bg-success`、`text-success`、`bg-success/10`のように、ほかの色と同じクラスの書き方で使えます。
-   shadcn/uiの作成画面（[shadcn/create](https://ui.shadcn.com/create)）では、ベースの色、テーマの色、フォント、角丸、アイコンなどを選んで、プロジェクトの設定を作れます。

![primaryを変えた前後 · Button・Badge・Switch・Checkbox](https://static.zenn.studio/user-upload/deployed-images/9f6bfde9773d9ebbc6bf0263.png?sha=4331c96dd3d66f07e2e394edba6eaf020bfb7da0)  
_primaryを変えた前後 · Button・Badge・Switch・Checkbox_

#### Figmaとの対応

-   Variablesの名前を、テーマの用途の名前にそろえます。
-   ライトとダークは、Variablesのモードで持ちます。
-   Figmaで`blue/500`のような標準の色の変数も持つ場合は、コンポーネントに結び付けるのを用途の名前の変数だけにします。

### 3-3 CVA：クラスの組み合わせにVariantの名前を付ける

#### CVAとは

CVA（class-variance-authority）は、クラスの組み合わせに名前を付けて、選択肢として持つための小さなライブラリです。  
コンポーネントごとに、「基本のクラス」と「variantやsizeごとのクラス」を分けて書きます。  
何も指定しないときの選択肢（既定値）も決めます。  
使う側は、`variant="outline"`のように名前を選ぶだけで、対応するクラスの組み合わせが当たります。

#### Buttonで見る

Buttonには、見た目を選ぶvariantが6つあります。

variant

見た目

使う場面

`default`

`primary`の塗り

画面でいちばん主な操作

`outline`

枠線と背景色

主ではない操作

`secondary`

`secondary`の塗り

補助の操作

`ghost`

背景なしで、ホバー中だけ背景が付く

ツールバーなどの控えめな操作

`destructive`

`destructive`の薄い背景と文字色

削除などの取り消せない操作

`link`

`primary`の文字で、ホバー中に下線が付く

文中での移動

大きさを選ぶsizeは、文字ありの4段階と、アイコンだけの4段階です。

size

高さ

アイコンだけのsize

`xs`

24px

`icon-xs`

`sm`

28px

`icon-sm`

`default`

32px

`icon`

`lg`

36px

`icon-lg`

![Buttonのvariantとsize · 6種×4段階](https://static.zenn.studio/user-upload/deployed-images/c0cf7cb09a2d2e1c86bf7244.png?sha=87c735c80d84645460e2f5d07324455efe16ddf7)  
_Buttonのvariantとsize · 6種×4段階_

#### FigmaのVariantとの対応

-   Figmaのプロパティ名と選択肢の名前をCVAにそろえると、1対1で対応します。
-   hover・focus・disabledなどの状態は、CVAのvariantではなく、Tailwind CSSの状態の指定で書きます。
-   Figmaで状態をVariantとして持つ場合、コードとは軸が違うことに注意が必要です。
-   特定の組み合わせだけに当てるクラスも書けます（compoundVariants）。

![Figmaとコードの軸 · 状態はCVAの外](https://static.zenn.studio/user-upload/deployed-images/59869002269c49467c6be8dd.png?sha=c312b93664175593136509950c052dada9314a00)  
_Figmaとコードの軸 · 状態はCVAの外_

#### スタイル：コンポーネントごとのクラスの決め方一式

shadcn/uiには、Nova・Vega・Maia・Lyra・Mira・Luma・Rhea・Seraの8つのスタイルがあります。  
同じコンポーネントでも、スタイルによって余白・角丸・詰まり具合が違います。  
スタイルを選ぶことは、CVAで定義するクラスの組み合わせを選ぶことです。

### 3-4 見た目を変えるときの順番

見た目を変えるときは、次の順に検討します。

1.  Theme：値を変えるだけで、すべてのコンポーネントの見た目がそろって変わります。
2.  CVA：そのコンポーネントの選択肢として追加します。
3.  コンポーネントの組み合わせ：既存のコンポーネントで表せないときだけ、新しいコンポーネントを作ります。

前の方法で済むなら、あとの方法は使いません。  
そうすると、コンポーネントごとの見た目のばらつきを抑えられます。

## 4\. AIと組み合わせる：shadcn/uiのエコシステムを使う

shadcn/uiには、AIと組み合わせるためのツールがそろっています。  
自分たちのデザインシステムをこの仕組みに合わせて作れば、AI向けの仕組みを一から作らずに済みます。

### 4-1 エコシステムの全体像

shadcn/uiは、5つの原則の1つにAI-Readyを挙げています。  
コードがプロジェクト内にあり、どのコンポーネントも同じ書き方なので、AIがコードを読み、編集し、新しく作れます。  
多くのプロジェクトが同じ書き方をしているので、AIにとっても見慣れた形です。

shadcn/uiは、AIと組み合わせるために次のツールを用意しています。

ツール

役割

Registry

コンポーネントの配布元

CLI

コンポーネントをプロジェクトに追加するツール

MCP

AIがRegistryを検索・利用するための仕組み

Skills

AIが読み込む、shadcn/uiの使い方の知識

![エコシステムの分担 · AI・MCP・Skills・Registry・CLI](https://static.zenn.studio/user-upload/deployed-images/ace310092909c5cea13f99d1.png?sha=8673863b3c57b04cda29dc9e0baab730c8f88ede)  
_エコシステムの分担 · AI・MCP・Skills・Registry・CLI_

shadcn/uiのドキュメントには、AI向けの目次（[llms.txt](https://ui.shadcn.com/llms.txt)）も用意されています。

### 4-2 shadcn MCP

#### MCPとは

MCPは、AIが外部のデータやツールに接続するための共通の規格です。  
shadcn MCPを使うと、AIがRegistryの中身を直接扱えます（[MCPのドキュメント](https://ui.shadcn.com/docs/mcp)）。

#### できること

-   Registryにあるコンポーネント、Blocks、ひな形を一覧できます。
-   複数のRegistryをまたいで、名前や機能で探せます。
-   「ログインフォームを作って」のように言葉で頼むと、コンポーネントをプロジェクトに追加します。

#### 自分たちのRegistryにも使える

-   プロジェクトに登録したRegistryは、非公開のものも含めて、そのまま探せます。
-   自分たちのコンポーネントをAIに探させるために、別の仕組みを作らなくて済みます。

#### 使えるAIツール

Claude Code、Cursor、VS Code、Codex、OpenCodeなどで使えます。

### 4-3 shadcn Skills

#### Skillsとは

Skillsは、特定の作業の知識と手順をまとめたものです。  
AIは、必要なときにそれを読み込んで作業します。  
shadcn/uiのSkillは、コマンド1行でプロジェクトにインストールできます（[Skillsのドキュメント](https://ui.shadcn.com/docs/skills)）。

#### AIが読み込む知識

shadcn/uiのSkillには、AIが読み込む次の知識が含まれています。

-   プロジェクトの設定（フレームワーク、Tailwind CSSのバージョン、ヘッドレスUIの種類、アイコン、追加済みのコンポーネントなど）
-   CLIの使い方
-   テーマとカスタマイズ（色、ダークモード、角丸、variant）
-   Registryの作り方
-   MCPの使い方

プロジェクトの設定は、作業のたびに読み取ります。

#### AIに守らせる決まり

-   `bg-blue-500`ではなく`bg-primary`のように、用途の名前の色を使います（3-2）。
-   フォームや選択肢は、決まったコンポーネントの組み合わせで組み立てます。
-   選んだヘッドレスUIに合った書き方をします。

#### 例：ヘッドレスUIの移行

RadixからBase UIへの移行も、shadcn/uiのSkillを使ってAIがコンポーネントごとに進めます。  
コンポーネントごとに、変えたところ、変えなかったところ、手で確かめることの報告が残ります。

### 4-4 エコシステムを使うメリット

-   AI向けの仕組み（コンポーネントの検索、使い方の説明、守らせる決まり）を、自分たちで作らなくて済みます。
-   自分たちのデザインシステムをRegistryの形式で配布すれば、MCPとSkillsがそのまま使えます。
-   shadcn/uiがCLI・MCP・Skillを改善すると、自分たちもその改善を使えます。

## 5\. まとめ：AI駆動の開発でshadcn/uiを土台にするメリット

AIが画面を作る場面が増えるほど、デザインシステムには「AIが読めて、同じ決まりで使えること」が求められます。  
shadcn/uiの特徴は、そのままこの条件に当てはまります。

shadcn/uiの特徴

AI駆動の開発でのメリット

コードがプロジェクト内にある

AIがデザインシステムのコードを読んで、編集できる

どのコンポーネントも同じ書き方

AIが毎回同じ形で作るので、コンポーネントごとに違う使い方を覚えさせなくてよい

見た目の決まりがテーマとクラスの名前になっている

AIが`bg-primary`のような意味のある名前で書け、Figmaとも名前で対応が取れる

振る舞いはヘッドレスUIが持つ

AIが作った画面でも、操作とアクセシビリティの水準が保たれる

配布・検索のツールがすでにある

Registry・MCP・Skillsを使えば、AIが自分たちのコンポーネントを検索して使える

デザイナーの役割は、テーマの名前、variantの名前、状態の名前を、コードとそろえて決めることです。  
名前がそろっていれば、人もAIも同じ決まりでコンポーネントを使えます。  
それが、AIが扱えるデザインシステムの土台になります。

![名前が共通の言葉になる · Figma・コード・AI](https://static.zenn.studio/user-upload/deployed-images/a9e69a1872183bdb4bc17a76.png?sha=d83ebd2bfb4a3496df19834cde57f9df42053365)  
_名前が共通の言葉になる · Figma・コード・AI_

## 参考

-   [shadcn/ui ドキュメント](https://ui.shadcn.com/docs)
-   [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog)
-   [shadcn/ui Registry](https://ui.shadcn.com/docs/registry)
-   [shadcn/ui MCP Server](https://ui.shadcn.com/docs/mcp)
-   [shadcn/ui Skills](https://ui.shadcn.com/docs/skills)
-   [Tailwind CSS Colors](https://tailwindcss.com/docs/colors)
-   [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)
-   [tailwindcss（npm）](https://www.npmjs.com/package/tailwindcss)