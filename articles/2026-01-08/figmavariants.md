---
title: "FigmaのVariants入門 - さらにコンポーネントを使いこなそう"
source: "https://ics.media/entry/220413/"
publishedDate: "2022-04-13"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作の現場で定番となってきたデザインツール「Figma」。前回の記事『[デザインの管理と効率化が行える FigmaのComponents入門](https://ics.media/entry/220217/)』では、デザインパーツの管理や柔軟な変更が可能になる「Components」機能を紹介しました。

本記事では**Componentsをまとめ、検索性を保ちつつ、さらに柔軟な変更と管理が行える**「Variantsバリアンツ」を紹介します。

Variantsを使うと、複雑なコンポーネントの切り替えや管理が行いやすくなり、**堅牢なデザインファイルが作成できます**。また、**コーディング時に近い思想でデザインを組める**ので、実装時に破綻が起こりにくくなります。

**Variantsは規模感に関わらず小さな単位でも活用できます**。 「使いこなせていない」、「自分の制作の規模感では不要」と考えているデザイナーにも、手軽に導入できメリットを実感できるはずです。本記事で使い方を説明するので、今日からVariantsを使ってみましょう。

### Variantsとは

状態や用途によって類似したコンポーネントが複数必要になる場面が多くあると思います。「Variants」を利用すると、そのような**コンポーネントを1つのグループとして管理**できます。Adobe XDを利用している方であれば以下の記事で紹介した、「ステート」機能をイメージして頂ければわかりやすいかと思います。

-   [Adobe XDステート機能を使いこなそう！ ホバー、カルーセル、ハンバーガーメニューの効率的な作り方](https://ics.media/entry/200305/)

大量のコンポーネントの中から利用したいデザイン・状態のコンポーネントを探すのは骨が折れる作業です。

「Variants」を使用すると、以下のように**類似のコンポーネントの管理や切り替えが容易**になります。コンポーネントをひとまとめにし、パネルからプロパティを選択することで任意のボタンを呼び出していることを確認できます。

![Variantsのデモ](https://ics.media/entry/220413/images/220413-figma-variants-demo.gif)

Figma公式の「Variants」のチュートリアル用デザインファイル「[Figma Variants Playground](https://www.figma.com/community/file/903303571898472063/figma-variants-playground)」 （[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja)）が翻訳された日本語版ファイルがありますので、以下からご確認ください。

-   [Figma Variants Playground (Japanese 日本語)](https://www.figma.com/community/file/918027651143349634/Figma-Variants-Playground-\(Japanese-%E6%97%A5%E6%9C%AC%E8%AA%9E\))

すでにFigmaのアカウントにログインしている状態であれば、「Duplicate」をクリックすると、ご自身のアカウントの「Drafts」に追加され、自由に編集が可能となりますので触りながら読み進めてみてください。

![Duplicateの手順](https://ics.media/entry/220413/images/220413-figma-variants-duplicate.png)

「Variants」の基本的な使い方からはじめ、プロパティの追加や削除、実際の使用例なども紹介してきます。

### Variantsの使い方

**Variantsを扱うには、まずコンポーネント化する必要があります**。コンポーネント化する方法は[前回の記事](https://ics.media/entry/220217/)で紹介していますので、参考にしてください。

3種類の状態をもつタブコンポーネントを例に解説します。「左が選択された状態」「中央が選択された状態」「右が選択された状態」のすべてをコンポーネントとして用意しました。

![タブコンポーネント](https://ics.media/entry/220413/images/220413-figma-variants-tab.png)

左から順に`tab-bar/home`,`tab-bar/search`,`tab-bar/play`という命名を行っています。すべてのコンポーネントを選択し、「**Combine as Variants**」をクリックしましょう。

![タブコンポーネントを「Combine as Variants」する](https://ics.media/entry/220413/images/220413-figma-variants-tab-combine.png)

すると、選択したコンポーネントが`tab-bar`というグループにまとめられました。これを「**コンポーネントセット**」と呼びます。また、レイヤーパネルを確認すると、命名が自動的に`home`,`search`,`play`に変わっていることも確認できます。

![タブコンポーネントを「Combine as Variants」する](https://ics.media/entry/220413/images/220413-figma-variants-tab-variants.png)

その後、アセットパネルからドラッグ&ドロップし利用できます。プロパティパネルを確認すると、「home」「search」「play」の3パターンがプルダウン表示されます。使いたいコンポーネントを選択しましょう。

![タブコンポーネントのデモ](https://ics.media/entry/220413/images/220413-figma-variants-tab-demo.gif)

このように、**本来複数に分かれているコンポーネントを1つのセットとして扱える上に、必要なプロパティを選択し呼び出せる**のがVariants機能の特徴です。

### コンポーネント命名とVariantsの関係

次に、少し複雑なボタンを例にコンポーネント命名とVariantsの関係を深掘りしていきましょう。

![ボタンコンポーネント](https://ics.media/entry/220413/images/220413-figma-variants-button.png)

このボタンには2つの色（Primaryカラー、Secondaryカラー）、アイコンの有無、4つの状態（デフォルト、ホバー、フォーカス、無効）があり合計16個のコンポーネントが用意されています。

それぞれ`Button/Primary/Default/Without Icon`のように、`コンポーネント名/プロパティ1の値/プロパティ2の値/プロパティ3の値`という規則に基づき命名を行なっています。すべてのボタンを選択し、「Combine as Variants」をクリックしましょう。

すると「Button」というコンポーネントセットが作成され、3つのプロパティが「Property 1」「Property 2」「Property 3」と設定されていることが確認できます。プロパティパネルに「プロパティ」と「値」があり、「値」にはコンポーネント時の命名が使われます。

![ボタンコンポーネントのプロパティパネルの見方](https://ics.media/entry/220413/images/220413-figma-variants-panel.png)

このままだとプロパティ名がわかりにくいので、変更しましょう。プロパティパネルからプロパティ名をクリックと編集可能になります。それぞれ、「Type」「State」「Icon」としました。

![プロパティ名の変更手順](https://ics.media/entry/220413/images/220413-figma-variants-property-rename.png)

またプロパティと同様に、値を変更することも可能です。その際、ブール値 (`True/False`または`On/Off`)を指定することで、呼び出し時のプロパティパネルにトグルスイッチが表示されるようになります。

![トグルスイッチの表示方法](https://ics.media/entry/220413/images/220413-figma-variants-property-toggle.png)

コンポーネントセット内のコンポーネントのひとつを選択し、レイヤー名を確認しましょう。`Primary, Default, Icon=False`と表示されているレイヤー名を編集状態にすると、`Type=Primary, State=Default, Icon=False`とリネームされていることが確認できます。

![レイヤー名に夜プロパティの管理](https://ics.media/entry/220413/images/220413-figma-variants-layer-naming.png)

元々の`Button/Primary/Default/Without Icon`という命名によって、プロパティの値が指定でき、それらはレイヤー名で管理されています。**コンポーネントの命名段階で同じプロパティは同じレベルで命名を行いましょう**。

![コンポーネントの命名とプロパティの対応](https://ics.media/entry/220413/images/220413-figma-variants-property-naming.png)

### コンポーネントセットを追加する方法

ここまではVariants機能で管理するコンポーネントをすべて用意してから、コンポーネントセットにするという流れでした。**コンポーネントを1つ用意し、後から追加する方法をアラートを例に紹介します**。

このアラートには「Error」「Info」「Success」という3つの状態があると想定しています。現在は「Error」状態のみです。まずはコンポーネント化を行いましょう。`banner/error`というコンポーネント名にしました。

![アラートバナーコンポーネント](https://ics.media/entry/220413/images/220413-figma-variants-alert.png)

プロパティパネルから「Variants」セクションから「+」をクリックします。すると、Variants化されると共に2つ目のコンポーネントが追加されます。次に、コンポーネントセットの右下の「+」をクリックすると、3つ目のコンポーネントが追加されます。

![アラートへのvariant追加](https://ics.media/entry/220413/images/220413-figma-variants-alert-add-variant.png)

上記以外にも、「Variants」セクションのメニューから「Add new variant」をクリックし追加する方法。ショートカットキーCommand+D (macOS) / Control+D (Windows)を入力する方法。既存のコンポーネントをドラッグアンドドロップし追加する方法もあります。

![variant追加のその他の方法](https://ics.media/entry/220413/images/220413-figma-variants-add-variant.png)

それぞれのデザインを変更し、プロパティと値の命名もわかりやすく変えましょう。ここではプロパティを「Type」、値を「Error」「Info」「Success」に変更しました。

![アラートのデザイン変更とプロパティリネーム](https://ics.media/entry/220413/images/220413-figma-variants-add-alert.png)

また、「Add new property」をクリックとプロパティの追加が行えます。今回はモバイルを想定し、「Device」というプロパティを追加します。「Device」の値「Default」は「Desktop」に変更しました。

![アラートへのプロパティ追加](https://ics.media/entry/220413/images/220413-figma-variants-add-property.png)

次にモバイル用のアラートを追加したいので、コンポーネントセットの右下の「+」をクリックしましょう。「Device」のプルダウンから「Add new…」をクリックし、新しい値を追加します。ここでは「Mobile」としました。その後、デザインを調整します。

![アラートへの値の追加](https://ics.media/entry/220413/images/220413-figma-variants-add-value.png)

「Info」「Success」も同じようにコンポーネントの追加し、デザインの調整を繰り返していきましょう。今回の場合、最終的に6つのコンポーネントが並び、次のような見た目になれば完成です。

![アラートへの値の追加](https://ics.media/entry/220413/images/220413-figma-variants-add-value-complete.png)

このような手順で、コンポーネント1つからでもVariants機能を活用できます。

![アラートバナーのデモ](https://ics.media/entry/220413/images/220413-figma-variants-alert-demo.gif)

### Variantsの解除/削除方法

間違ってVariants機能を使ってしまった場合や、後からコンポーネントセットを減らしたいといった際に**Variantsを解除、削除する方法を紹介します**。

アラートを「Combine as Variants」する際に、誤ってボタンも含んでしまいました。意図しないプロパティもたくさん生えてしまっています。

![誤ってVariants機能を使ってしまった例](https://ics.media/entry/220413/images/220413-figma-variants-mistake.png)

このような時には、不要なコンポーネントをコンポーネントセットの外に出しましょう。コンポーネントをドラッグアンドドロップするか、レイヤーパネルから操作します。

![コンポーネントセットから1つのコンポーネントを除外](https://ics.media/entry/220413/images/220413-figma-variants-remove.gif)

これで移動したコンポーネントはVariantsが解除され、不要なプロパティも自動的に消えます。レイヤー名が自動的にリネームされている場合があるので注意しましょう。

特定のコンポーネントを削除するのではなく、誤って作成してしまったコンポーネントセットを丸ごと消したいこともあります。そんな時には、中身のコンポーネントをすべて外に出しましょう。アセットパネルを確認すると、コンポーネントセットが削除できていることを確認できます。

![コンポーネントセットからすべてのコンポーネントを除外](https://ics.media/entry/220413/images/220413-figma-variants-remove-all.gif)

### 小さくはじめるVariants

Components機能のみでボタンを管理している場合、次のようにすべての状態が乱立してしまいます。**Variants機能はデザインシステムや大規模なサイトで役に立つと思われがちですが、コンポーネント管理の観点から小規模であれ使うべきです**。

![Components機能のみでの管理](https://ics.media/entry/220413/images/220413-figma-variants-components.gif)

具体的には、前述の通り「状態」「アイコンの有無」「対象デバイス」はもちろん「ナイトモード」「OSに合わせたデザイン」などの管理も行えます。

![Variants機能の作例](https://ics.media/entry/220413/images/220413-figma-variants-example.png)

このように小さくはじめられる箇所から、ぜひVariants機能を使いはじめましょう。

### まとめ

Variants機能によって、プロパティによるコンポーネントの選択が行え、管理や柔軟な変更がしやすくなることを理解して頂けたかと思います。

Variants機能を使いこなすことによって、担当デザイナー以外がデータを触る場合でも、必要なものを簡単に見つけやすくなります。そしてコンポーネント管理が堅牢になり、**長年利用しても破綻しにくいデザインファイルが制作できます**。

エンジニア視点では、**ボタンなどの各状態のデザインが一覧で見やすくなり、考慮漏れが起こりにくくなるでしょう**。また、Inspectパネルからプロパティをまとめたコードをコピーできます。VueやReactを利用している場合などに便利な機能です。

![Inspectパネルでのコードコピー](https://ics.media/entry/220413/images/220413-figma-inspect.png)

実際に触ってみることが理解への第一歩です。冒頭で紹介したデザインファイルから、実際に触ってみることをオススメします。

-   [Figma Variants Playground (Japanese 日本語)](https://www.figma.com/community/file/918027651143349634/Figma-Variants-Playground-\(Japanese-%E6%97%A5%E6%9C%AC%E8%AA%9E\))