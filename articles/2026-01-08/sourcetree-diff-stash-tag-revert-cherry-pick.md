---
title: "SourceTreeの使い方 - 初心者が習得すべき基本操作(diff, stash, tag, revert, cherry-pick)"
source: "https://ics.media/entry/1365/"
publishedDate: "2014-05-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "nohara"
---

GitクライアントのSourceTreeソースツリーは無料で使えるGitアプリケーションとして人気があります。「SourceTreeの基本的な使い方はバッチリ！　**だけど、まだまだ使っていない機能があるなぁ**」なんて人も多いのではないでしょうか？　そんな人へオススメの知っておくと便利な機能を5つ紹介します。

※本記事は2024年4月現在のmacOS 14.4.1、SourceTree 4.2.7で解説しています。Windows版のSourceTreeでも同じ手順で利用できます。

### はじめに - SourceTreeとは？

[SourceTree](https://www.atlassian.com/ja/software/sourcetree)はGit / MercurialのGUIクライアントで、[Atlassian社](https://www.atlassian.com/ja/)から無償で提供されています。WindowsとmacOSで使用でき、グラフィカルでシンプルなUI（ユーザーインターフェイス）のためGit初心者でも容易に操作することが可能です。

### 1\. diff - 差分を見る

diffを行うことで、ある時点のコミットと、別のコミットとの差分を見ることができます。

![Gitの「Diff」の概念図](https://ics.media/entry/1365/images/git-diff.png)

差分を見たいコミットの片方を左クリックで選択しておきます。

![SourceTreeの「diff」の使い方(操作1ステップ目)](https://ics.media/entry/1365/images/240412_sourcetree_commit.png)

差分を見たいコミットのもう片方を、commandキー（Windowsの場合はCtrlキー）を押しながら左クリックします。

![SourceTreeの「diff」の使い方(操作2ステップ目)](https://ics.media/entry/1365/images/240412_sourcetree_commit_diff.png)

差分が表示されました。簡単に見られて便利ですね。

もちろん、ブランチをまたがっていても差分を見ることができるので、ブランチをマージする前に見ておくとコンフリクトするかの確認などできて良いかもしれません。

### 2\. stash - 一時的に作業状態を保管しておく

現在の作業をいったん置いておいて、別のブランチでの作業を行いたいことはよくあると思います。 ですが、コミットするにはちょっと作業が中途半端なことはありますよね。そんな時はstashを使用すると便利です。

![gitのstashの概念図](https://ics.media/entry/1365/images/git-stash.png)

\[スタッシュ\]アイコンをクリックします。

![SourceTreeの「stash」の使い方(スタッシュボタン)](https://ics.media/entry/1365/images/240412_sourcetree_stash_1.png)

適切なメッセージを入れOKを押します

![SourceTreeの「stash」の使い方(変更メッセージ入力ダイアログ)](https://ics.media/entry/1365/images/240412_sourcetree_stash_2.png)

※「ステージされた変更を残す」にチェックを入れると作業状態は残ったままになりつつさらに保管されます。

左側メニューの\[スタッシュ\]へ作業状態が保管されます。

![SourceTreeの「stash」の使い方(画面左側のスタッフ)](https://ics.media/entry/1365/images/240412_sourcetree_stash_3.png)

作業を元に戻したくなったら、左側メニューの\[スタッシュ\]から元に戻したい作業を選択して右クリックして「退避した変更を適用」を選びます。

![SourceTreeの「stash」の使い方(stashを戻すとき)](https://ics.media/entry/1365/images/240412_sourcetree_stash_4.png)

※「適用後に削除」にチェックマークを入れると、スタッシュされていた変更は削除されます。

![SourceTreeの「stash」の使い方(一時退避を適用しますか)](https://ics.media/entry/1365/images/240412_sourcetree_stash_5.png)

### 3\. tag - コミットにタグをつける

Gitの履歴が長期間に及ぶと、Gitのログは膨大になって行きます。**リリースなど重要なタイミングでのコミットにタグをつけることで後ほどの参照が簡単になります**。また、GitHubなどへタグをプッシュしておくと他のメンバーとの共有が可能です。

![Gitのtagの概念図](https://ics.media/entry/1365/images/tag.png)

タグを作成したいコミットを履歴上から右クリックし、\[タグ\]を選びます。

![SourceTreeでタグを使う方法](https://ics.media/entry/1365/images/240412_sourcetree_tag_1.png)

タグの設定を行います。下記の設定を行ってから\[タグを追加\]ボタンを押下します。

1.  \[タグ名\]の部分に設定したいタグ名を指定します。「/」（スラッシュ）で区切ると、SourceTreeでツリー状でのタグの管理が可能になります。
2.  \[メッセージ\]の部分にはタグ名だけで分からない内容などを補います。
3.  \[コミット\]の部分には指定のコミットを選んでおきます (この時作業コピーの親を選ぶと、右クリックで指定した箇所とは違う位置へタグが付く可能性もあるので要注意です）

![SourceTreeのタグの追加画面](https://ics.media/entry/1365/images/240412_sourcetree_tag_2.png)

左側メニューと履歴上にタグ表示が出ます。左側メニューのタグ名をクリックすると、タグをつけたコミットを表示するよう画面がスクロールします。さらに、タグ名を右クリックすると、\[詳細\]からタグの作成者などの詳細情報が閲覧できます。\[現在のファイルとの差分をとる\]を選択して、差分を表示することもできます。

![SourceTreeの左メニューのタグについて](https://ics.media/entry/1365/images/240412_sourcetree_tag_3.png)

### 4\. cherry-pick - 別ブランチのコミットを取得する

Gitではマージやリベースなどで別ブランチの状態を取り込むことができますが、**取り込む単位をコミット単位で可能なのがcherry-pickです**。

![Gitのcherry-pickの概念図](https://ics.media/entry/1365/images/cherry-pick.png)

取得したいコミットを選んで右クリックし、\[チェリーピック\]を選びます。

![SourceTreeでは右クリックメニューからチェリーピックを選択して利用する](https://ics.media/entry/1365/images/240412_sourcetree_cherry_pick_1.png)

表示されたダイアログで\[続行\]ボタンを選びます

![SourceTreeの「チェリーピックの確認」ダイアログ](https://ics.media/entry/1365/images/240412_sourcetree_cherry_pick_2.png)

同じコミットが、現在のブランチへコミットされました。

![SourceTreeのチェリーピックの結果。選択したコミットと同じコミットが作成されました](https://ics.media/entry/1365/images/240412_sourcetree_cherry_pick_3.png)

### 5\. revert - コミットした内容を打ち消すコミットを作成する

**revertはあるコミットを打ち消すコミットを簡単に作成できます**（SVNのrevertとは別の機能です） 。

![GitのRevertの概念図](https://ics.media/entry/1365/images/revert.png)

打ち消しを行いたいコミットを右クリックし、\[コミットを適用前に戻す\]を選択します。

![SourceTreeのコミットの打ち消しは左メニューから操作する](https://ics.media/entry/1365/images/240412_sourcetree_revert_1.png)

表示されたダイアログで\[OK\]を選びます

![SourceTreeのコミットの打ち消し確認ダイアログ](https://ics.media/entry/1365/images/240412_sourcetree_revert_2.png)

打ち消すコミットが作成されました。

![SourceTreeでのRevertの結果](https://ics.media/entry/1365/images/240412_sourcetree_revert_3.png)

### おわりに

SourceTreeは多くのメニューやオプションがあり、黒い画面を使わずとも簡単にGitを使うことができて便利です。今回紹介した機能以外もたくさん機能があるので、習得すると仕事がはかどります。

ICSではGitを活用し効率的な開発/運用ワークフローに日々取り組んでいます。以下の記事もぜひご覧ください。

-   [SourceTreeの使い方 - GitHubとの連携方法](https://ics.media/entry/15195/)
-   [GitHubでのプルリクエスト活用方法まとめ](https://ics.media/entry/14449/)

※この記事が公開されたのは**11年前**ですが、**1年前の2024年4月**に内容をメンテナンスしています。