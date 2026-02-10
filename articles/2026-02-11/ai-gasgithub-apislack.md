---
title: "AIコーディング時代のレビュー負荷を可視化したい！ —— GASとGitHub APIで「誰がどのくらいレビューしたか」をSlackに通知する仕組み"
source: "https://tech.smarthr.jp/entry/2026/02/10/162401"
publishedDate: "2026-02-10"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。SmartHRでプロダクトエンジニアをしているmatsugenです。

昨今、開発におけるAI活用が随分と進み、開発速度の向上を日々実感しています。一方で、開発速度が上がると Pull Request（以下 PR）の数も増えます。そうなると、レビューの負荷も増大します。

私が所属するチームでは、レビューの負荷を可視化する目的で、スプリント終了時にメンバーごとのレビュー件数がSlackに通知されるようになっています。この記事では、その仕組みをつくるに至った背景と実装のポイントを紹介します。

## 次から次へとやってくるレビュー依頼

私のチームでは、1週間単位のスプリントで開発を進めています。以前は、実装者が2名のレビュアーをランダムに指定し、実装が完了するたびにレビューを依頼するフローを取っていました。

この運用は、AIコーディングツールの普及でPRの数が増えるまでは、十分回っていました。

しかしPRが増えると、レビュー依頼が立て続けに届くようになります。1件レビューを終えてホッとしたのも束の間、次のレビュー依頼が飛んでくる。片付けるとまた次が来る……まるでわんこそばを食べているような気分です。「もう満腹です」と言いたいのにお椀に蓋をする暇がありません。

それまでは1人あたりのレビュー件数は2〜3件でしたが、直近では平均で4〜5件になり、多いときは7件のPRのレビューが1人にアサインされることもありました。

スプリント内で均等にレビュー依頼が来ればよいのですが、前半は実装が中心なので、どうしても後半に依頼が偏ります。その結果、1日の半分近くをレビューに充てることもあります。

さらに、いつどのくらいレビュー依頼がくるかを予測しづらく、個人のタスク計画にも少しずつ影響が出始めていました。

あくまでも今述べたのは極端な例ですが、いずれにせよレビュー負荷が高まっているという点はチーム全体の共通認識でした。

もちろん、本当に手が回らないときはチーム内で声をかけ合って代わってもらえますし、実際そうやってチーム一丸となって乗り切ってきました。

とはいえ、「今誰がどのくらいレビューを抱えているのか」が見えていないと、声をかけ合うタイミングもつかみにくいものです。

## なんとなくレビュー負荷が偏っている気がする

こういった状況を改善するために、現在は各メンバーが任意のタイミングで自らPRを取りに行くスタイルに切り替えました。誰がどのPRにレビュアーとしてアサインされているかはSlackのリスト機能で管理しています。

アサイン漏れを防ぐために毎日朝会でレビュアーが指定されていないPRを確認してアサインする作業はしていますが、基本的にはメンバーの自主性に委ねています。

このスタイルは、都度のアサインと違って各自のタスク状況に応じてレビューするかしないかをある程度自由に選べるので、以前のようなわんこそば状態からは脱却できますし、チームメンバーからも「自分のタスクとレビューのバランスを柔軟に切り替えられるのがよい」という声がありました。

一方で、この方式は誰がどのくらいレビューしたかが見えにくい仕組みでもあります。実際に、特定のメンバーにレビューが集中することがまれに発生していました。

## メンバーごとのレビュー数を可視化したい

もちろん、開発状況によっては、知識や経験が豊富なメンバーにレビュー負荷が偏ることは一定仕方のないことですし、先にも述べたとおり各々のタスク状況によってレビューに割ける時間は変わります。

とはいえ、「なんとなくレビューが多い気がする」とモヤモヤしたまま日々を過ごすのは、健全な状態であるとは言えません。

スクラムの三本柱である「透明性」を担保する意味でも、誰がどのくらいレビューしているのか可視化する必要があると考えました。

現状使っているSlackのリスト機能で、誰がどのくらいレビューをしたか可視化できれば手段としてはベストなのですが、残念ながら今の仕様ではそれを実現することはできません。

何か別の手段でレビュー件数を良い感じに可視化する方法はないかというのが、今回の取り組みの出発点です。

## ミニマムに始める

最初に検討したのは、GitHub Projectsでレビュー件数を集計する方法です。しかし、GitHub Projectsは現時点では「メンバーごとのレビュー件数を集計する」といったユースケースには対応していないようでした。

とはいえ、毎週GitHubのPull Request一覧画面で `review-requested:メンバー名` のような検索ワードを入力して件数を数えるのは、正直なところ面倒です。しかもこれをメンバー分だけ繰り返すとなると、それなりの作業量になります。

GitHub Actionsを使うことも考えましたが、やりたいことを整理する中で、今回のユースケースにはマッチしなさそうでした。

ひとまずは、スプリントが終了するタイミングで自動で集計してSlackに通知してくれれば、やりたいことは十分に達成できるので、Google Apps Script（以下 GAS）と GitHub GraphQL API、Slack Incoming Webhookを使い、まずは必要最低限の集計・通知フローを構築することにしました。

## 全体の構成

この仕組みの全体像はこんな感じです。

┌──────────────┐     ┌──────────────────┐     ┌───────────┐
│ Google Apps  │────▶│ GitHub GraphQL   │────▶│  Slack    │
│ Script       │     │ API              │     │ (Webhook) │
│ (トリガー)    │     │ (PR検索)          │     │           │
└──────┬───────┘     └──────────────────┘     └───────────┘
       │
       ▼
┌──────────────┐
│ スプレッド     │
│ シート        │
│ (トークン管理) │
└──────────────┘

処理の流れはシンプルです。

1.  GASのトリガーがスプリント終了日に起動する（具体的には、GASエディタの「トリガー」から「時間主導型」→「週タイマー」を選択し、毎週水曜日の13:00に実行するように設定しています）
2.  スプレッドシートからクレデンシャル情報を読み込む
3.  メンバーごとにGitHub GraphQL APIでレビュー依頼されたPRを検索する
4.  検索結果からチームメンバーが作成したPRだけをフィルタリングする
5.  集計結果をSlackに投稿する

## 実装のポイント

実装にあたっていくつか工夫した点を紹介します。

### スプリント期間に合わせた検索範囲の算出

検索対象をスプリント期間内に作成されたPRに絞るために、`created:>YYYY-MM-DD` で期間を指定しています。GAS側で、スプリント開始日に相当する日付を算出し、検索クエリの中に埋め込む仕組みです。

GitHub Search APIの `created:` フィルタは日付の粒度までしかサポートしていないため、取得結果をそのまま使うと、前スプリントに集計済みのPRが今スプリントもカウントされている等のズレが生じます。そのためGitHubからPRを取得したあと、GAS側でスプリント開始日時（水曜 14:00）以降に作成されたPRにフィルタリングしています。

### GitHub GraphQL APIによるPR検索

GitHubのGraphQL APIを使い、対象のPRのタイトル、URL、作成日時、作成者のアカウント名を取得します。 検索クエリのイメージはこんな感じです。

repo:リポジトリ名 is:pr review-requested:メンバー名 created:>=スプリント開始日

初めは1クエリで複数のメンバーのPRの一括取得を試みました。ところが、現状だと一括取得には対応していませんでした。

そこまで頻繁に実行するスクリプトでもないので、人数分クエリを実行しています。

const gql \= \`
  query($q: String!, $after: String) {
    search(type: ISSUE, query: $q, first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        ... on PullRequest {
          title
          url
          createdAt
          author { login }
        }
      }
    }
  }
\`;

また、今回はあくまでもチーム内におけるレビュー数を集計したいため、検索結果から、author（PR作成者）がチームメンバーであるものだけを残します。

### Slackへの投稿

最終的に出来上がったコードが以下です。

const REPO = { owner: "owner\_name", name: "repository\_name" };
const MEMBERS = \["member1", "member2", "member3", "member4"\];

const SPREADSHEET\_ID = "sheet\_id";
const SHEET\_NAME = "sheet\_name";
const SPRINT\_BORDER\_DAY\_OF\_NUMBER = 3; // 水曜日
const SPRINT\_START\_HOUR = 14; // 14:00

/\*\*
 \* スプレッドシートから設定値を読む
 \*/
function loadSecretsFromSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET\_ID);
  const sheet = ss.getSheetByName(SHEET\_NAME);
  if (!sheet) throw new Error(\`Sheet not found: ${SHEET\_NAME}\`);

  const lastRow = sheet.getLastRow();
  if (lastRow < 1) throw new Error("Sheet is empty");

  const values = sheet.getRange(1, 1, lastRow, 2).getValues();
  const map = {};

  for (const \[kRaw, vRaw\] of values) {
    const k = String(kRaw || "").trim();
    const v = String(vRaw || "").trim();
    if (!k) continue;
    map\[k\] = v;
  }

  if (!map.GITHUB\_TOKEN) throw new Error("GITHUB\_TOKEN is missing in sheet");
  if (!map.SLACK\_WEBHOOK\_URL) throw new Error("SLACK\_WEBHOOK\_URL is missing in sheet");

  return {
    githubToken: map.GITHUB\_TOKEN,
    slackWebhookUrl: map.SLACK\_WEBHOOK\_URL,
  };
}

function buildSearchQuery(reviewer, createdBeforeDate /\* YYYY-MM-DD \*/) {
  return \[
    \`repo:${REPO.owner}/${REPO.name}\`,
    "is:pr",
    \`review-requested:${reviewer}\`,
    \`created:>=${createdBeforeDate}\`,
  \].join(" ");
}

function fmtDateYYYYMMDD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return \`${y}-${m}-${day}\`;
}

function githubGraphql(githubToken, query, variables) {
  const res = UrlFetchApp.fetch("https://api.github.com/graphql", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: \`Bearer ${githubToken}\` },
    payload: JSON.stringify({ query, variables }),
    muteHttpExceptions: true,
  });

  const code = res.getResponseCode();
  const body = res.getContentText();
  if (code < 200 || code >= 300) throw new Error(\`GitHub GraphQL error: ${code} ${body}\`);

  const json = JSON.parse(body);
  if (json.errors) throw new Error(\`GitHub GraphQL errors: ${JSON.stringify(json.errors)}\`);

  return json.data;
}

/\*\*
 \* reviewer ごとに PR 候補を検索して返す
 \* 返却: \[{title, url, authorLogin}\]
 \*/
function fetchPRsForReviewer(githubToken, reviewer, createdBeforeDate) {
  const q = buildSearchQuery(reviewer, createdBeforeDate);
  console.log(q);

  const gql = \`
    query($q: String!, $after: String) {
      search(type: ISSUE, query: $q, first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          ... on PullRequest {
            title
            url
            createdAt
            author { login }
          }
        }
      }
    }
  \`;

  let after = null;
  const results = \[\];

  while (true) {
    const data = githubGraphql(githubToken, gql, { q, after });
    const search = data.search;
    const nodes = search.nodes || \[\];

    for (const pr of nodes) {
      // author が null のケース（削除ユーザー等）もあるのでガード
      const authorLogin = pr?.author?.login || null;

      results.push({
        title: pr.title,
        url: pr.url,
        createdAt: new Date(pr.createdAt), // 日本時間に変換する
        authorLogin
      });
    }

    if (!search.pageInfo.hasNextPage) break;
    after = search.pageInfo.endCursor;
  }

  return results;
}

/\*\*
 \* reviewerごとに、authorがチームメンバー（MEMBERS）のPRだけ残してSlack通知用テキストを構築
 \*/
function buildSlackText(byReviewer) {
  const lines = \["🐓今スプリントの各メンバーのレビュー数を集計したのでお知らせします🐓\\n"\];

  for (const reviewer of MEMBERS) {
    const prs = byReviewer\[reviewer\] || \[\];
    lines.push(\`【${reviewer}】 ${prs.length} 件\`);
    for (const pr of prs) {
      lines.push(\`・${pr.title} ${pr.url}\`);
    }
    lines.push(""); // ブロック間の空行
  }

  lines.push("\\n一週間お疲れ様でした🍵")

  return lines.join("\\n").trim();
}

function postToSlack(slackWebhookUrl, text) {
  const res = UrlFetchApp.fetch(slackWebhookUrl, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ text }),
    muteHttpExceptions: true,
  });

  const code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error(\`Slack webhook failed: ${code} ${res.getContentText()}\`);
  }
}

/\*\*
 \* トリガーから呼ぶメイン関数
 \*/
function weeklyReviewReport() {
  const { githubToken, slackWebhookUrl } = loadSecretsFromSheet();
  // スプリント開始日を設定
  const date = new Date();
  date.setHours(SPRINT\_START\_HOUR, 0, 0);
  const diff = (date.getDay() - SPRINT\_BORDER\_DAY\_OF\_NUMBER + 7) % 7;
  if (diff == 0) {
    sprintStartedAt = new Date(date.setDate(date.getDate() - 7)); // 開始曜日の場合は一週間前の日付に戻す
  } else {
    sprintStartedAt = new Date(date.setDate(date.getDate() - diff)); // 直近のスプリント開始曜日へ戻す。
  }
  const membersSet = new Set(MEMBERS);
  const byReviewer = {};

  for (const reviewer of MEMBERS) byReviewer\[reviewer\] = \[\];

  for (const reviewer of MEMBERS) {
    const prs = fetchPRsForReviewer(githubToken, reviewer, fmtDateYYYYMMDD(sprintStartedAt));

    // 取得したPRのうち author が MEMBERS のもので、スプリント開始時間（水曜日14:00）以降に作成されたPRだけ抽出
    const filtered = prs.filter((pr) => pr.authorLogin && membersSet.has(pr.authorLogin) && pr.createdAt >= sprintStartedAt);

    // 必要なら重複除去（同じPRが紛れ込むケース対策）
    const seen = new Set();
    byReviewer\[reviewer\] = filtered.filter((pr) => {
      if (seen.has(pr.url)) return false;
      seen.add(pr.url);
      return true;
    });
  }

  const text = buildSlackText(byReviewer);
  postToSlack(slackWebhookUrl, text);
  console.log(text);
}

これが毎スプリント終わりに実行されると、メンバーごとのレビュー件数とPR一覧をテキストにまとめて、Webhook経由でSlackに投稿します。

投稿されるテキストのイメージはこんな感じです。

🐓今スプリントの各メンバーのレビュー数を集計したのでお知らせします🐓

佐藤さん 3 件
・機能Aのリファクタリング https://github.com/repository/name/pull/123
・バリデーション追加 https://github.com/repository/name/pull/456
・テスト修正 https://github.com/repository/name/pull/789

田中さん 1 件
・ログ出力の改善 https://github.com/repository/name/pull/234

鈴木さん 2 件
・...

今スプリントもおつかれさまでした🍵

これでスプリントの振り返りの時に「おっ、今週は偏ってるな」であったり、「均等に取れてるね」といった会話がしやすくなります。

## 実際に運用してわかったこと

この仕組みを導入してから、スプリントの振り返りでレビューの話題が自然に出るようになりました。以前は「なんとなく偏ってるかも…」で止まっていたのが、具体的な数字として見えるようになったことで、チーム内で調整しやすくなった実感があります。

たとえば「今週は自分のタスクが重くてあまり取れなかった」「来週は意識的に取りに行こう」といった話が出るようになり、数字があることで話題に上がる機会が自ずと増えたように思います。

## 今後の展望

今回作ったのはあくまで必要最低限の仕組みです。今後は以下のような方向で拡張を考えています。

### Jiraと連携して重みを可視化する

現在は件数だけを見ていますが、Jira（Atlassian社製の課題管理ツール）のチケットに紐づくストーリーポイントも加味することで、より精密に負荷を可視化したいと考えています。

### PRのコメント数で活動量を可視化する

レビューの「量」だけでなく「質」に近い情報も見られると面白そうです。もちろん、一概にコメント数でレビューの質を測ることはできませんが、ただPRを承認しただけなのか、しっかり読み込んでフィードバックしたのか、といった活動の濃淡や傾向が見えてくるかもしれません。

### 加工したデータをNotionに連携し、スプリントごとの推移を見る

単発の通知だけでなく、スプリントをまたいだ推移を見られるようにすることで、どう変化しているかを追えるようにもしたいです。例えば Notionのデータベースに蓄積してグラフ化できると、より有意義な議論の種になりそうです。

## おわりに

AIコーディングツールの普及によるPR数の増加やレビュー負荷の偏りは、多くのチームで起こりうる問題だと思います。

今回の仕組みはGASとGitHub API、Slack Incoming Webhookという比較的慣れ親しんだ技術の組み合わせでつくれるもので、特別なセットアップは不要です。

同じような課題を感じているチームの参考になれば幸いです。

## We Are Hiring!

SmartHRでは一緒にSmartHRを作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[open.talentio.com](https://open.talentio.com/r/1/c/smarthr/pages/103872)