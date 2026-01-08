---
title: "【速報】アドビ、iPad版Illustratorの開発を発表。Adobe Senseiがシェイプ構造を解析する新時代のイラストツール"
source: "https://ics.media/entry/191104/"
publishedDate: "2019-11-05"
category: "frontend"
feedName: "ICS MEDIA"
author: "ikeda"
---

2019年11月5日 公開 / [株式会社ICS 池田 泰延](https://ics.media/entry/staff/ikeda/)

米ロサンゼルスで開催中のAdobe MAX 2019で、_iPad版Illustrator_の開発が表明されました。[11月2日に公開されたiPad版Photoshop](https://mobile.twitter.com/clockmaker/status/1191150473631322112)に続き、AdobeによるプロユースのiPad版アプリは2弾目となります。

iPad版Illustratorの発表の様子を、現地のイベントに参加したスタッフ（[池田](https://x.com/clockmaker)）がレポートします。

### 性能が良い

iPad版Illustratorはタッチ操作のインタフェースであり、Apple Pencilにも対応しています。

iPad版Illustratorは性能がとてもよく、1万ほどのオブジェクトを含むファイルを1秒未満で開くことができます。複雑なシェイプをもったアートボードもなめらかに拡大・縮小が可能。

開発チームは「動作性能」をファーストクラスの優先度として取り組んで開発しているとのこと。

### 新時代のベジェ曲線の編集

タップやApple Pencilでベジェ曲線を描くわけですが、自然な曲線を作ることができます。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_05.jpg)

ベジェ曲線の見た目は変えずにアンカーポイントだけを消すことが可能。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_10.gif)

パスの曲線に沿ってアンカーポイントを再設定できます（左右にアンカーポイントを移動させています）。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_11.gif)

細かい調整ができるよう、アンカーポイントはピクセルレベル（小数点含む）でXY座標を設定できます。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_12.png)

### 17000種類のフォントを利用できる

テキスト編集としては、字間の調整も可能。フォントの変更は即座にプレビュー反映できています。17,000種類あるAdobe Fontsと連携できるそうです。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_13.gif)

### 人工知能がシェイプの意図を認識

ここからはデスクトップ版のIllustratorに存在しない機能のオンパレードです。手描きのイラストをベクターシェイプ変換する際に、人工知能Adobe Senseiがシェイプの形状を判別します。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_20.gif)

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_21.png)

▲元の手描きのイラスト

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_22.png)

▲Adobe Senseiによって変換されたベクトルシェイプ

人工知能のAdobe Senseiがシェイプの形状を理解し、適切なベクトルシェイプへ変換します。図形の形状や意図を認識しているので、再編集の可能性が広がっているのが特徴です。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_24.png)

▲元の手書きのイラスト

### 左右対称の編集

シンメトリーなイラストを作成するにあたり、左右対称のミラー編集をサポートしています。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_34.jpg)

グラフィックは斜めに傾けた状態でも、左右対称の状態を保ったまま、そのまま編集できます。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_35.gif)

### 円周上のリピート機能

ラジアルリピート機能を使うと、円周配置のグラフィックを簡単に描けます。手作業で円周配置をしようとすると大変な作業ですが、iPad版Illustratorはボタンひとつで実現できます。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_40.gif)

円周の半径や、間隔など簡単に調整可能。リアルタイムでリピートしたグラフィックにも反映されるため、最終的なイメージを確認しながらグラフィックを描けます。

### 平面上のリピート機能

Adobe XDのリピートグリッドに似た、パターングリッドという機能を搭載。左右方向へ伸ばすことができたり、間隔を調整できます。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_50.gif)

XDと異なる点として、リピートしたシェイプの配置をカスタマイズすることが可能。

![](https://ics.media/entry/191104/images/191104_ipad_illustrator_51.gif)

1つのインスタンスを編集すると、リピートしたインスタンスへ反映されます。リアルタイムに反映されており、性能の良さがアピールされていました。

### リリース目標は2020年

iPad版Illustratorは現在ベータ版で、2020年にリリースを目指していると基調講演で紹介されていました。

また、アドビはCreative Cloud全般において動作性能とクラッシュ率の低下をここ1年で進めてきたと言及。先日公開されたiPad版Photoshopも動作性能が非常によかったのですが、ユーザーの求めるものをアドビは以前よりも認識してきている印象を持ちました。

iPad版Photoshopは記事『[実演されたiPad版Photoshop CC。軽快に動作](https://ics.media/entry/19208/)』でも紹介しているように、2018年の開発発表で翌年正式リリースとなっています。

同じように、開発発表したiPad版Illustratorは来年のAdobe MAX 2020で正式リリースとなるでしょうか。楽しみですね！