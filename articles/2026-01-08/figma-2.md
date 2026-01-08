---
title: "Figmaの作業を効率化！ 知らないと損するショートカット集"
source: "https://ics.media/entry/230303/"
publishedDate: "2023-03-03"
category: "frontend"
feedName: "ICS MEDIA"
author: "ics"
---

ウェブ制作における定番になりつつあるデザインツール「[Figma](https://www.figma.com/)」。本記事では、Figmaの知らないと損するショートカットキーを紹介します。

**よく使う便利な機能を呼び出すショートカットキーを覚えておくことで、作業効率が上がる**のでしっかり覚えていきましょう。

本記事では基本機能のショートカットキーだけでなくマニアックなものまで紹介します。初心者はもちろん普段からFigmaを利用している方にも役立つ内容をまとめています。

### ショートカットキー一覧の呼び出し（control+shift+?）

Figmaでは、**見やすいショートカットキー一覧をいつでも表示できます**。ショートカットキーを忘れてしまった場合には、control+shift+?(macOS) /control+shift+?(Windows)を押しましょう。

![ショートカットキー一覧の表示](https://ics.media/entry/230303/images/230303_figma_shortcut_summary.png)

画面下部にショートカット一覧が表示されます。**使ったことのあるショートカットは色が付き、使ったことがないものは色が付いていません**。まずは、すべてのショートカットキーを試して色を付けることを目指してみましょう。

一覧の呼び出しショートカットキーを忘れてしまった場合は右下の「?」アイコン、もしくはメニューバーの［ヘルプとアカウント］→［キーボードショートカット］をクリックします。

![ショートカットキー一覧の呼び出し](https://ics.media/entry/230303/images/230303_figma_shortcut_summary_button.png)

また、**［レイアウト］タブからキーボードレイアウトを設定できます**。本記事では日本語レイアウトを前提に解説します。記事を読み進めて行く前に、意図せず利用しているキーボードと違う配列になっていないかご確認ください。

![ショートカットキーのレイアウト設定](https://ics.media/entry/230303/images/230303_figma_shortcut_layout.png)

### 均等配置（control+option+T）

複数のレイヤーを選択状態にした上で、control+option+T(macOS) /alt+shift+T(Windows)を押すと均等配置が行えます。

![均等配置のデモ](https://ics.media/entry/230303/images/230303_figma_shortcut_smartSelection.gif)

**均等配置されたオブジェクト間の余白はハンドル操作や数値入力で一括編集が可能**になります。また、オブジェクトの中心に表示される丸印をドラッグアンドドロップすると余白を維持したまま、オブジェクトの入れ替えが行えます。

![均等配置並べ替え](https://ics.media/entry/230303/images/230303_figma_shortcut_smartSelection_align.gif)

### レイヤーの複製コマンド（command+D）

レイヤーを選択した状態で、command+D(macOS) /control+D(Windows)でレイヤーの複製が行えます。

![レイヤーの複製のデモ](https://ics.media/entry/230303/images/230303_figma_shortcut_duplication.gif)

また、このコマンドは直前の動作も含めて複製してくれるので下方向への複製も行えます。これによって**素早く、等間隔の繰り返しのレイアウトを実装できる**でしょう。

次の例では以下の手順を行なっています。

-   コピーしたいレイヤーを選択
-   option(macOS) /alt(Windows)を押しながら下方向へコピー
-   command+D(macOS) /control+D(Windows)でレイヤーを複製

![前の操作を含めて複製が行える](https://ics.media/entry/230303/images/230303_figma_shortcut_duplication_vertical.gif)

### オブジェクトをリサイズ（command+矢印キー）

オブジェクトを選択し、command+矢印キー(macOS) /control+矢印キー(Windows)を押すとリサイズが行えます。shiftキーを組み合わせると`10px`単位でのリサイズとなります。

![オブジェクトをリサイズのデモ](https://ics.media/entry/230303/images/230303_figma_shortcut_resize.gif)

とくに**細かい調整を行いたい時などはマウスで操作するよりも、キーボードで入力する方が確実**です。矢印キー、矢印キー+shiftを押した際のピクセル数を設定から変更できます。

［Figma］→［基本設定］→［ナッジ］から設定を行います。「小さな調整」には矢印キーの値を「大きな調整」には矢印キー+shiftの値を指定します。

![ナッジの設定画面](https://ics.media/entry/230303/images/230303_figma_shortcut_nudge.png)

### ペーストして置き換え（command+shift+R）

レイヤーをコピーした後に、置き換えたいレイヤーを選択した上で、command+shift+R(macOS) /control+shift+R(Windows)でペーストして置き換えが行えます。

![ペーストして置き換えのデモ](https://ics.media/entry/230303/images/230303_figma_shortcut_paste_icon.gif)

この機能は**オートレイアウトの中身を入れ替えたいときに便利です**。オブジェクトを消したり、並び替えを行うという手順が不要になります。

![ペーストして置き換えをオートレイアウトと組み合わせた例](https://ics.media/entry/230303/images/230303_figma_shortcut_paste_replace.gif)

オートレイアウトをまだ使ったことがないという方には、以下の記事がオススメです。

-   [FigmaのAutoLayout入門 - エンジニアに伝わるデザインを作ろう](https://ics.media/entry/211015/)

### PNGとしてコピー（command+shift+C）

レイヤーを選択し、command+shift+C(macOS) /control+shift+C(Windows)または、右クリックで開かれるメニューからPNGとしてコピーが行えます。

![PNGとしてコピーのショートカットとメニュー](https://ics.media/entry/230303/images/230303_figma_shortcut_png.png)

この状態で**Slackなどのチャットツールに画像をペーストできる**ので、書き出しの手間なくデザインの共有が行えます。素早く中間成果物の確認を行いたい時などに活躍するでしょう。

また、右クリックから［CSSとしてコピー］や［SVGとしてコピー］も選択できます。**［SVGとしてコピー］でコピーしたものはレイヤー情報も保持するので、別デザインツールに移植したいという場合に便利**です。

![SVGとしてコピーを行いAdobe XDにペーストした様子](https://ics.media/entry/230303/images/230303_figma_shortcut_copy_svg.gif)

Adobe XDへのコピーを行いましたが、ご覧の通りマスク情報など正しく移植できない箇所も多いので注意は必要です。

### レイヤーの階層順序を操作（command+\]または\[）

ここからはレイヤーパネルでの便利なショートカットを紹介します。

レイヤーを選択し、command+\]または\[(macOS) /control+\]または\[(Windows)でレイヤーの階層順序を上下に操作できます。

![レイヤーの順序を入れ替える](https://ics.media/entry/230303/images/230303_figma_shortcut_layer_move.gif)

合わせてレイヤー順を最前面（\]）、最背面（\[）に移動させるコマンドも覚えておきましょう。

![レイヤーの順序を最前面、最背面へ移動](https://ics.media/entry/230303/images/230303_figma_shortcut_layer_foremost.gif)

### レイヤーの子階層を選択（enter）、兄弟階層を選択（tab）

レイヤー階層を示す時、隣あったレイヤーを「兄弟レイヤー」、グループ化やフレームなどにより入れ子構造になっているレイヤーを「親レイヤー」「子レイヤー」と呼びます。

![レイヤー階層の呼び方](https://ics.media/entry/230303/images/230303_figma_shortcut_layer_hierarchy.png)

キーボードでレイヤーを選択する際には以下の4つを覚えましょう。

-   次の兄弟の選択 tab
-   前の兄弟の選択 shift+tab
-   子の選択 enter
-   親の選択 shift+enter

![レイヤー階層の呼び方](https://ics.media/entry/230303/images/230303_figma_shortcut_layer_hierarchy_demo.gif)

### レイヤーの検索、置き換え（command+F）

command+F(macOS) /control+F(Windows)で**レイヤー名やテキストレイヤーの文字を検索**できます。この時、レイヤーの種類による絞り込みも可能です。

![レイヤーの検索](https://ics.media/entry/230303/images/230303_figma_shortcut_search.png)

レイヤーパネルから［置換］を選択すると、検索だけでなく置き換えもできます。**置き換えが可能なのはテキストレイヤー内のテキストのみ**で、レイヤー名を置き換えることはできませんので注意しましょう。

![レイヤーの検索と置き換え](https://ics.media/entry/230303/images/230303_figma_shortcut_rename.png)

### クイック操作（command+/）

command+/(macOS) /control+/(Windows)でクイック操作が行えます。検索バーが表示されるので、Figmaで行いたいことを入力しましょう。

![クイック操作の呼び方](https://ics.media/entry/230303/images/230303_figma_shortcut_quick.gif)

レイヤーに対して行える操作を確認したり、ナッジの設定を簡単に開いたり、ショートカット一覧を呼び出すなど、**Figmaでできることはすべてクイック操作から実行できる**と言っても過言ではありません。

Figmaの機能を検索し実行することはもちろん、プラグインの実行も行えます。困ったらこのコマンドを押すと覚えておきましょう。

### まとめ

以上が、Figmaの知らないと損するショートカット操作でした。機能を知ることはもちろんですが、作業を効率化する上でショートカットを覚えることも重要になります。

もちろんここで紹介したショートカットキー以外にも多くの種類があります。また、**プラグインによっては実行用のショートカットが設定されているものもあります**ので、さらに数が増えていきます。

これらすべてを一度に覚えるのは難しいので、自分がよく使う機能から少しずつショートカットキーを覚えていき、日々の制作を効率的にこなしていきましょう。