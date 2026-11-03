---
title: "デザインシステムから作る、Claude Code との個人ブログ改装"
source: "https://zenn.dev/kitchy/articles/4ba04ac981aef7"
publishedDate: "2026-10-24"
category: "design-systems"
feedName: "Zenn designsystem"
author: "kittchy"
---

## はじめに

こんにちは、[kittchy](https://github.com/kittchy) です。

個人ブログの [kittchy-blog](https://kittchy-blog.jp/) を、[Claude Code](https://code.claude.com/docs/en/overview) と一緒に作り直しました。

![改装前のトップページ。白地にテーマ既定のバナー画像が大きく出ている](https://static.zenn.studio/user-upload/deployed-images/1631c7fb27c0e541c6beb695.png?sha=2f972798caa0971f5147bb49d0b4bf06aa790425)  
_改修前: トップページ_

![改装後のトップページ。灰色の地にアバターと自己紹介、その下に最新記事が並ぶ](https://static.zenn.studio/user-upload/deployed-images/09f3229f1a4b2483134a503b.png?sha=b78242cadd2fda14b6bec0b6011b9b910f91e5a9)  
_改修後: トップページ_

これからAIを使って自分のブログを作ってみたい人向けに、Claude Codeでの改修の進め方を書きます。

## ブログについて

## なぜ個人ブログを作ったか

-   ポートフォリオ: 登壇や論文、書いた記事をまとめて見せたい
-   ものづくり: 仕事とは別に、自分で一から作って動かすものがほしい
-   AI駆動開発の実験台: 仕事では試しにくいやり方を気兼ねなく試したい
-   趣味のアウトプット: 旅行や本、音楽の話を書く場所がほしい

## 技術選定

-   生成: 静的サイトジェネレータの [Hugo](https://gohugo.io/)。Markdownの記事からHTMLを一括で作る。ブログは書いたときしか更新されないので、これで足りる
-   テーマ: [Hugoplate](https://github.com/zeon-studio/hugoplate)
-   配信: [Netlify](https://www.netlify.com/)。mainブランチにpushすると自動でビルドして公開される
-   スタイル: [Tailwind CSS](https://tailwindcss.com/) v3とSass。Hugoplateがこの組み合わせで作られている
-   フォント: 英字は [Archivo](https://fonts.google.com/specimen/Archivo)、日本語は [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)。どちらもGoogle Fontsで配信されていて、商用利用できるライセンス（SIL Open Font License）
-   アイコン: 検索やテーマ切り替えなどの画面のアイコンは [Lucide](https://lucide.dev/)。商用利用できるライセンス
-   SNSのロゴ: [Simple Icons](https://simpleicons.org/) から取った。ロゴそのものは各社の商標なので、各社のブランドガイドラインに沿って使う

アイコンやフォントは、商用利用できるものだけを選んでいます。このブログには広告を載せようとしているからです。AIはよく見かけるアイコンや素材をそのまま使おうとしがちですが、商用利用できないものも多いので、ライセンスを確かめさせる必要があります。

また、CMS（WordPressのように、記事をデータベースに保存して管理画面から書く仕組み）は使わず、Markdownを直接書いてビルドする形にしました。データベースや管理画面が無いので、そこを狙った攻撃を気にしなくて済みます。今のご時世、この形にしてよかったと思っています。

Netlifyを選んでよかった点は2つです。

-   個人ブログの規模なら無料でホストできる
-   PR（変更の提案）ごとにプレビュー用のURLを作ってコメントしてくれるので、マージ前にdev環境のように見た目を確かめられる

ほかのサービスは使っていないので比べられませんが、使い心地は今のところ最高です。

## 改修に至った経緯

改修前のサイトは、Hugoplateを土台に、足りないページを自分でコードを書いて足したものでした。デザインの知識が無く、フォントや色を適当に決めていたので、次のような問題がありました。

-   フォント: テーマ既定のSignikaとHeeboのままで、どちらも日本語の文字を持っていない。日本語は端末のフォント任せだった
-   記事ページ: アイキャッチが画面いっぱいに出て、タイトルが下に押し出される

![改装前の記事ページ。アイキャッチ画像が画面の大半を占め、タイトルが下端で切れている](https://static.zenn.studio/user-upload/deployed-images/c1ba94c6d579b56027d61333.png?sha=faa0f1b5e06095e907bef7f5f4457b43784b1b64)  
_改修前: 記事ページ_

-   記事一覧: 2列のカードとカテゴリ・タグ欄で、1画面に記事が2本しか見えない

![改装前の記事一覧。大きな画像付きのカードが2列に並び、右にカテゴリとタグの欄がある](https://static.zenn.studio/user-upload/deployed-images/5717af255465f54e14e62e2e.png?sha=8cc1d46bc2fe573d645acbf6951571061687ec21)  
_改修前: 記事一覧_

-   AboutとPublication: ページごとに作りが違い、同じサイトに見えない

![改装前の About。大きな見出しの帯の下に、プロフィールと経歴のタイムラインが並ぶ](https://static.zenn.studio/user-upload/deployed-images/80a0926fb6fd4164d46286ea.png?sha=d0deab1bf27549376b4dfba05a2aaa9f41d2514b)  
_改修前: About_

![改装前の Publication。太い黒の罫線と、左端に濃い線の入ったカードで論文が並ぶ](https://static.zenn.studio/user-upload/deployed-images/e490a8eca2eaba6baba1dfde.png?sha=6d35206daa7248ff0da3c73529a8f1368a3fa430)  
_改修前: Publication_

見た目がバラバラで古く見えていたので、日本語の長文を読むためのサイトとしてまとめて作り直すことにしました。

## 改修方法

## デザインシステム

最初はClaude Codeに言葉でデザインを相談していましたが、2つの問題がありました。

-   頭の中の見た目を言葉で伝えられない。参考サイトをいくつも見せる必要があった
-   Claudeが自分の好みのデザインに寄せてくる。そのたびに押し戻す必要があった

そこで、実装の前にデザインシステムを作りました。デザインシステムは、色や文字、カードなどの部品の決まりごとを一式まとめたものです。作ったのは [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) で、トップページの案を何パターンも出させ、良いところを組み合わせて仕上げました。

デザインシステムで決めて、サイト全体で揃えたのは次の4つです。

-   色: 地の色・文字色・アクセントの色
-   書体: 英字用と日本語用を1つずつ
-   本文の幅と行間: 日本語の長文が読みやすい値に固定
-   部品: カードやタイムラインをページごとに作らず、共通の部品を使う

これで「このページをデザインシステムどおりに」と頼めば済むようになり、Claudeが好みを差し込む余地も小さくなりました。デザインシステムが、Claudeの出力を決まった範囲に収めるガードレール（道からはみ出さないための柵）の役目を果たしています。

## バイブ開発

### 1\. デザインシステムをリポジトリに取り込む

Claude Codeの `/design-sync` でデザインシステムを取り込み、`.claude/skills/` に置きました。[スキル](https://code.claude.com/docs/en/skills) は、Claude Codeが作業に合わせて自分で読みに行く資料の置き場です。ここに置くと、レイアウトを触るたびにデザインシステムを参照してくれます。

### 2\. 仕様書からタスクに分解する

Claude CodeにWHY（なぜやるか）・WHAT（何を作るか）・HOW（どう作るか）の仕様書を書かせ、それを16タスク・4フェーズに分解させました。

-   フェーズ1（基盤）: デザインの値の取り込み、フォント、ダークモード、本文の幅
-   フェーズ2（共通パーツ）: ヘッダー、フッター
-   フェーズ3（ページ）: 記事、記事一覧、トップ、About、Publicationsなど
-   フェーズ4（新規）: 広告枠、旅行記

読み心地を決める記事ページから着手し、固まってから他のページへ広げました。

### 3\. スレッドごとに PR を出させる

Claude Codeのプロジェクト機能を使うと、作業ごとにスレッドが分かれ、それぞれがPRを出してきます。コードのレビューは基本的にしていません。NetlifyのPRプレビューで変更したページを開き、表示が崩れていなければマージする方針にしました。Hugoは静的サイトなので、ビルドが通れば公開後に壊れることはまずありません。そう割り切れたのも、Hugoにしてよかった点です。

## 困ったことと tips

うまくいかなかったこと:

-   要約だけで実装させた: 一部のタスクを、デザインシステムの元ファイルではなくTODOの要約文だけで実装させたところ、ずれが8件出た。要約の時点で情報が落ちていた。元ファイルと突き合わせさせたら直った
-   トークンが尽きる: Claude Designはトークン（AIの利用量の単位）を多く使うので、試行錯誤の途中で上限に達することがよくあった。セッションをこまめに分けてしのぎ、最後は課金した
-   コンフリクトが起きる: スレッドを並行させると、同じファイルを触るPRどうしがぶつかる（コンフリクト）ことがよくあった。CIが通ったらすぐAIにマージさせ、PRを溜めないようにした
-   正解がわからない: デザインシステムを作っても「これでいいのか」という不安が残った。最後は「まず実装してしまおう」と割り切って進めた

tips:

-   参考を見せる: 今のサイトと参考にしたいサイトのURLを見せる。ただし、あくまで参考で、パクリはダメだと伝える
-   ノウハウも調べさせる: デザインの知識がないことを伝えて、デザインの考え方から調べさせる。注意する点や見るべき観点も教えてくれた
-   案を何パターンも出させる: 1案を直し続けるより、良いところを組み合わせるほうが早い
-   完成形のスクリーンショットも書き出す: 実装の答え合わせに使える
-   崩れはスクリーンショットで伝える: プレビューのスクショを貼って「ここがイメージと違う」と指させば、言葉だけより早く直る
-   要約より元の資料を渡す: Claude Codeに読ませるのは、自分で要約したものより元のファイルのほうが確実

## 最終結果

## Home

自己紹介と最新の記事を並べ、誰のブログかが最初の画面でわかるようにしました。

![改装後のトップページ。灰色の地にアバターと自己紹介、その下に最新記事が並ぶ](https://static.zenn.studio/user-upload/deployed-images/09f3229f1a4b2483134a503b.png?sha=b78242cadd2fda14b6bec0b6011b9b910f91e5a9)  
_改修後: トップページ_

## About

左にプロフィールとスキル、右に経歴のタイムラインです。

![改装後の About。左にプロフィール、右に経歴のタイムライン](https://static.zenn.studio/user-upload/deployed-images/816d3fed3d9b4cba9ae7daa8.png?sha=4411ea43fe6a0a89fb33c2149b9f33f5d3c598c3)  
_改修後: About_

## Notes

記事を年ごとに区切り、1行ずつ縦に並べています。

![改装後の Notes。年ごとに、カバー画像付きの記事が縦に並ぶ](https://static.zenn.studio/user-upload/deployed-images/599cd9e4a991a07282232c07.png?sha=e3c31d78f211f22e23a30beafc66dc68625415c9)  
_改修後: Notes（記事一覧）_

記事ページは本文の幅を絞り、目次を右に置きました。

![改装後の記事ページ。本文が中央の細いカラムに収まり、右に目次が出ている](https://static.zenn.studio/user-upload/deployed-images/e44426be502891c9fcae6480.png?sha=cf5397a51876d7a1f709b035f724184987e92574)  
_改修後: 記事ページ_

## Publications

登壇や論文を年ごとに並べ、種類で絞り込めます。

![改装後の Publications。年ごとに発表が1行ずつ並び、上に絞り込みのボタンがある](https://static.zenn.studio/user-upload/deployed-images/3ccf809b600aa6f6f87694f5.png?sha=fccc9e3e55bb4b798ef7ea628734804e3f02a0c7)  
_改修後: Publications_

## Travels

改修と同時に作った旅行記です。

![旅行記の一覧。少し傾いた写真カードにバンコクの写真が入っている](https://static.zenn.studio/user-upload/deployed-images/385370c2dc744c931a9cbe32.png?sha=3b20c6e12ab6f7d44ab30fe3d964e90e847b7840)  
_改修後: Travels_

## Music

改修のあとで足した、いまSpotifyで聴いている曲とプレイリストのページです。

![Music ページ。上に最近聴いた曲のカード、その下に Spotify のプレイリストが埋め込まれている](https://static.zenn.studio/user-upload/deployed-images/42ef728ccc54cf3d44de254b.png?sha=1b7cbfe0a2740526f6be3d965ca5a786b8a160f5)  
_改修後: Music_

## おわりに

デザインシステムを作り、実装させ、デプロイするところまで、プロダクト開発の一連の流れを個人でもAIと回せるようになりました。面白い時代です。

特に、先にデザインシステムを考えてから作ったことで、サイト全体に統一感が出ました。言葉でデザインを伝える難しさと、Claudeが好みに寄せてくる問題の両方も減りました。