---
title: "【Claude Design】デザインシステムを作って資料のデザインの一貫性を保つ。組織利用にあたって実践した流れ"
source: "https://zenn.dev/yoss_k3/articles/a3dbdfbac43b21"
publishedDate: "2026-11-15"
category: "design-systems"
feedName: "Zenn designsystem"
author: "kyoochan"
---

執筆のきっかけ

Claude Designの「デザインシステム」を試しに作成してみたところ使い勝手がよく、そのまま組織利用にも発展させたため。

## 🪄この記事でわかること

-   デザインシステム・Claude Designの「デザインシステム」が何か？その役割
-   チャット画面でスクリーンショットやブランド資料からデザインシステムを作る手順
-   私が組織用デザインシステムを作った際の流れ

## 🫵あなたに読んでほしい

-   生成AIの資料の品質には満足しているが、”デザインが毎回バラバラな点”に困っている方
-   自分のサービスや会社のブランドに沿ったスライドなどをClaudeに作らせたい方
-   Claudeの組織利用する上で、デザイン面などでも何か使えるものがないか探している方

Claude Design「デザインシステム」の概要については以下からどうぞ！

## 🎨そもそもデザインシステムとは

まず、「デザインシステム」自体はClaude Designに限った用語ではありません。

私なら「一製品内で標準/指標とされるべきデザインのベストプラクティス集」などと表現しますが、もうちょっと公的な情報も借りて、、例えばデジタル庁では以下のように表現されています。

> デザインシステムとは、ブランドやコミュニケーションの価値観定義を指針化したデザインプリンシプル、情報アーキテクチャとインタラクションデザインに基づいたコンポーネント定義、アクセシビリティを含んだ規範となるデザインガイドラインといった、デザインアセットの集合体です。[\[1\]](#fn-5282-1)

![](https://static.zenn.studio/user-upload/f9b440b263ac-20261107.png)  
_デジタル庁デザインシステム「デザインシステムについて」をもとに作成_

### Claude Designにおけるデザインシステム

そして、Claude Designにおけるデザインシステムでも内容は同じ。

「Claudeに渡すブランドのデザイン設計図」として次の項目＋αで構成されるArtifactsとなっています。

![](https://static.zenn.studio/user-upload/8578b2306cbf-20261108.png)  
_デザインシステム Artifactsの含む主要項目_

## ⚒️デザインシステムの作り方

執筆時点でデザインシステムの作り方は公式に3つ紹介されています。

1.  チャットで作る
2.  Claude Codeで作る
3.  スタンドアロン版（claude.ai/design）から移行して作る

今回は「1:チャット」にて作りました。

### Step 1：素材を用意する

素材は多いほどClaudeが拾える情報が増えます。今回使ったのはこのあたり。

![](https://static.zenn.studio/user-upload/4285b9b125bb-20261108.png)  
_用意した素材_

### Step 2：資料を参照させて、デザインシステムを生成させる

素材の用意が出来たら後はチャットで依頼するだけ。

チャット画面/Claude Cowork(`ChatとCoworkが統合されました`)にて素材を参照させて、以下のようなプロンプトを送信します。

```
添付したスクリーンショットとロゴ・ブランド資料から資料の特徴を抽出し、
「サンプルデザイン1」としてこのサービスのデザインシステムを作ってください。
```

デスクトップ版であればフォルダを追加して参照させられるので、沢山の資料を添付するような手間が省けます！

* * *

完成するとArtifactsとして開くことができます。  
![](https://static.zenn.studio/user-upload/4370456009af-20261108.png)  
_参考を基に生成されたデザインシステムのArtifacts_

## 🖼️私が組織用デザインシステムを作った際の流れ

作り方の基本は先ほど紹介した通りですが、組織で使うものを作るなら1人の意見だけでなく複数メンバーの視点を取り入れることが大切です。

![](https://static.zenn.studio/user-upload/8f2a147933c8-20261108.png)

私は次の流れで、4つ→2つ→1つと絞り込んでいきました。

1.  素材を変えて、サンプルのデザインシステムを4つ作る
2.  4つそれぞれで、同じ内容のスライド（pptx）を生成する
3.  他のメンバーにレビューを依頼する
4.  フィードバックをもとに、4つの良いところを組み合わせて2つに絞り込む
5.  再度レビューを依頼する
6.  フィードバックをもとに、最終的な1つを作る

![](https://static.zenn.studio/user-upload/128acb3e0800-20261108.png)  
_私が実践した流れ_

## 👆組織での共有は数クリックで簡単！

1.  Artifactsで対象のデザインシステムを開く
    
2.  右上の「🔒共有 > 一般アクセス」で「あなたのみ」となっている部分をクリックして、「組織の全員」を選択する  
    ![](https://static.zenn.studio/user-upload/e1570abcb34f-20261108.png)
    
3.  確認のダイアログが出るので、「共有」ボタンを押す  
    ![](https://static.zenn.studio/user-upload/313d27134a55-20261108.png)
    

### 生成されたデザインシステムを実際に使うには？

チャット画面にて使用する際は、ファイルアップロードなどができる「＋」ボタンから「デザインシステム > 自分のデザインシステム」で選択して使用できます。

![](https://static.zenn.studio/user-upload/28dcba1d6882-20261108.png)  
_デザインシステムを有効にする場所_

## 🎯うまくいった点/詰まった点

### うまくいった点

-   4つ→2つ→1つと絞り込む流れは自己流だったが、段階ごとにうまく磨き込めて、メンバーの反応もだんだん良くなった
-   以前作成した資料ファイル約80点を素材にしたので、最初から完成度の高いデザインシステムができた  
    ![](https://static.zenn.studio/user-upload/5997834d49e4-20261108.png)

### 詰まった点

-   デザインのルールをまとめたスライド（「見出しは◯pt」「テーマカラーは◯◯」など）を素材にしたところ、書かれたルールではなく、そのスライド自体の見た目がデザインシステムに取り込まれてしまった  
    ![](https://static.zenn.studio/user-upload/94fdba6c01ac-20261108.png)

対処：デザインのルールはチャットで文章として伝え直した

## まとめ

-   Claude Designのデザインシステムがあれば、毎回の生成のブレを減らせてかつ、そのブランドや製品の色を生成物に反映させられる
-   チャット・Claude Code・スタンドアロン版から移行して作る3種類の方法がある
-   私の場合4つ→2つ→1つと絞るように、「サンプルの作成」と「他メンバーのレビュー」のサイクルを繰り返してうまくいった

## 参考

-   [デザインシステムとは｜デジタル庁デザインシステムβ版](https://design.digital.go.jp/dads/guidance/design-system/)
-   [デザインシステムとは | デザインシステムの基本 | Figma Blog](https://www.figma.com/ja-jp/blog/design-systems-101-what-is-a-design-system/)
-   [Claude Design 管理ガイド（Team および Enterprise プラン向け） | Anthropicヘルプセンター](https://support.claude.com/ja/articles/14604406-claude-design-%E7%AE%A1%E7%90%86%E3%82%AC%E3%82%A4%E3%83%89-team-%E3%81%8A%E3%82%88%E3%81%B3-enterprise-%E3%83%97%E3%83%A9%E3%83%B3%E5%90%91%E3%81%91)
-   [Claude Design admin guide for Team and Enterprise plans | Claude Help Center](https://support.claude.com/en/articles/14604406-claude-design-admin-guide-for-team-and-enterprise-plans)
-   [What are artifacts and how do I use them? | Claude Help Center](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)
-   [Claude Designでデザインシステムをセットアップする | Anthropicヘルプセンター](https://support.claude.com/ja/articles/14604397-claude-design%E3%81%A7%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%82%92%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%81%99%E3%82%8B)

## 関連記事の紹介

-   Claude(Desktop/ブラウザ)のTeamプランで【購入する】方法を知りたい方へ

-   Claude(Desktop/ブラウザ)のTeamプランへ【メンバーとして参加する】方法を知りたい方

脚注

1.  [デザインシステムとは｜デジタル庁デザインシステムβ版](https://design.digital.go.jp/dads/guidance/design-system/) より直接引用 [↩︎](#fnref-5282-1)
    
2.  [Claude Design 管理ガイド（Team および Enterprise プラン向け） | Anthropicヘルプセンター](https://support.claude.com/ja/articles/14604406-claude-design-%E7%AE%A1%E7%90%86%E3%82%AC%E3%82%A4%E3%83%89-team-%E3%81%8A%E3%82%88%E3%81%B3-enterprise-%E3%83%97%E3%83%A9%E3%83%B3%E5%90%91%E3%81%91) より直接引用 [↩︎](#fnref-5282-2)