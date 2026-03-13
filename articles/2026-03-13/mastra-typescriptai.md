---
title: "Mastra入門 - TypeScriptで作るAIエージェント"
source: "https://ics.media/entry/260312/"
publishedDate: "2026-03-11"
category: "frontend"
feedName: "ICS MEDIA"
author: "kitagawa"
---

2022年にChatGPTが登場して以来、AIを活用したツールやアプリが世界的に注目されています。ChatGPTをはじめとしたチャットベースのアプリだけでなく、Claude CodeやGitHub Copilot、Codexなどのコーディングエージェントを活用している方も多いのではないでしょうか？

ChatGPTのおかげですっかり浸透したAIアプリですが、作るためのフレームワークも日々進歩しています。この記事では、**TypeScriptでAIエージェントを作れるフレームワーク「[Mastraマストラ](https://mastra.ai/)」を紹介します。**

MastraにはAIエージェントを作るための便利な機能があります。次の動画のようなAIエージェントが意外と簡単に作れるのでぜひ体験してみてください！

▼Mastraの機能の1つであるMastra Studioの画面です。Mastra自体にはUI構築のための機能はありませんが、開発・テスト用のGUIとしてMastra Studioが提供されています。

### AIエージェントとは何か

まずはAIエージェントについておさらいしましょう。AIエージェントとは、**ユーザーからの入力を受け取って、自律的にタスクを実行するAIシステム**のことです。

AIエージェントの一種であるコーディングエージェントを例に説明します。

コーディングエージェントは、ユーザーから「このページにログインボタンを追加して」といった入力を受け取り、

1.  入力を解釈してタスクに落とし込む
2.  コードベースを調査し、CSSの命名ルールやHTMLの構造などを解析する
3.  命名ルールや構造に沿ったコードを生成する
4.  リンターやテストを実行する
5.  ユーザーに完了した内容をフィードバックする

といった作業を自律的に行います。

### なぜAIエージェントを作るのか？

ChatGPTのような汎用的なチャットAIでもある程度のことは可能です。しかし、そのままでは物足りない場合があります。たとえば**インターネット等に公開されていない特定の知識や、特定のフローにもとづいた**タスクなどをAIエージェントに行わせたい場合です。以下のような問題があります。

#### AIの知らない知識がある

AIはインターネット等で公開されていない知識を知りません。これはAIエージェントを動かすもとになるLLM（大規模言語モデル）の知識の制約によるものです。LLMは大量のデータを学習していますが、公開されているものに限ります。

また、**ナレッジカットオフ**と呼ばれる制約もあります。モデルの学習はある時点で終了するため、そのあとの知識は知らないというものです。[OpenAIの公式サイト](https://developers.openai.com/api/docs/models/compare)によると、GPT-5.4はナレッジカットオフが2025年8月31日とあります（2026年3月12日時点の情報です）。

そのため、AIの学習に含まれない知識は自分であたえなければなりません。

#### AIに判断を任せられない

AIエージェントは自律的にタスクをこなすと説明しました。逆にいえば、AIの判断でよしなにタスクをこなします。

その際、AIの判断に完全に任せられない場合もあります。Aという処理の後に必ず人間の確認をはさみたい、Bという処理の前には別のデータベースを参照したい、処理のログを残したい、などです。その場合はフローを制御する必要があります。AIに判断を任せたままだと、このフローをスキップする可能性があります。

特定のユースケースに合わせた知識をあたえ、フローを制御できるのがAIエージェントを作るメリットです。

### ICSでの活用事例

ICS社内では、**Mastraで作成した「AI編集長」というエージェントを活用しています。** その名の通り、ICS MEDIAの編集長として記事の執筆をサポートしてくれます。

ICSの記事執筆に関するノウハウをAIに学習させ、Slack上で動作するチャットボットとして利用しています。

### Mastraでエージェントを作ってみよう

では、さっそくAIエージェントを作ってみましょう。

MastraはNode.jsで動くフレームワークで、AIエージェントやアプリケーションを作る際に必要な機能がまとまっています。Node.js上で動くため、通常はUIを用意しないと画面での動作確認はできません。しかし、冒頭でも紹介したMastra Studioを起動するとGUIから作成したエージェントをすぐに試せます。

今回の記事でもAIエージェントの動きはMastra Studio上で確認します。

#### 1\. モデルのAPI keyを取得する

AIエージェントを作るには、AIモデルと連携する必要があります。AIモデルにはOpenAIのGPT、AnthropicのClaudeクロード、GoogleのGeminiジェミニなど各社がさまざまなものを公開しています。

Googleが提供しているAPIには無料枠があるので、今回はGoogleのGeminiを使ってみましょう。

1.  [Google AI Studio](https://aistudio.google.com/welcome)にアクセスする
2.  \[Get API key\]ボタンを押す
3.  デフォルトのAPI keyがあるので右側の\[Copy API key\]ボタンを押す
4.  表示されたAPI keyをメモする

**注意: API keyは絶対に公開しないようにしましょう！**

![API key取得手順](https://ics.media/entry/260312/images/260312_api_key.jpg)

#### 2\. Mastraプロジェクトを作る

お好きなディレクトリ上で次のコマンドを実行し、Mastraプロジェクトを作成します。

```
npm create mastra@latest
```

-   ※この記事ではパッケージマネージャーとして`npm`を使用します。お好きなマネージャーを使用して構いません。
-   ※記事公開時点では、最新バージョンは`v1.3.7`です。以降の記載はこのバージョンでの挙動です。

いくつか質問されるので答えていきます。

1.  What do you want to name your project? → 好きな名前でOK
2.  Where should we create the Mastra files? → とくに希望がなければデフォルトの`src/`を指定
3.  Select a default provider: → **1\. でGoogleのAPIを取得したので「Google」を選択**
4.  Enter your Google API key? → **Enter API keyを選択**
5.  Enter your API key: → **1\. でメモしたAPI keyを入力**
6.  Configure Mastra tooling for agents? → とくに希望がなければrecommendedの「Skills」を選択
7.  Select agent(s) to install skills for → お好きなエージェントを選択
8.  Initialize a new git repository? → Gitで管理するなら「Yes」を選択

プロジェクトの作成が完了しました。

プロジェクト内の`.env`ファイルには先ほど入力したAPI keyが含まれています。デフォルトで`.env`は`.gitignore`に記載されているため、とくに変更しなければ公開される心配はありませんが、**API keyが意図せず公開されないように`.env`のあつかいは気をつけましょう！**

#### 3\. すでにある天気エージェントのモデルを変更する

Mastraのプロジェクトにはサンプルの天気エージェントが実装されています。デフォルトではOpenAIのモデルが使われているので、GoogleのGeminiに変更します。

1.  `src/mastra/agents/weather-agent.ts`を開く
2.  modelを`'google/gemini-2.5-flash'`に変更する

▼`weather-agent.ts`

```
model: 'google/gemini-2.5-flash',
```

![モデルの変更](https://ics.media/entry/260312/images/260312_change_model.jpg)

#### 4\. 天気エージェントを動かしてみる

エージェントを動かしてみましょう。次のコマンドを実行します。

```
npm run dev
```

`http://localhost:4111`にアクセスするとMastra Studioが起動します。この画面では作成したエージェントやそのほかの機能をすぐに実行できます。

エージェントを実行するには左のメニューバーから\[Agents\]をクリックし、\[Weather Agent\]（すでにある天気エージェント）を選択します。チャット欄が表示されるので、好きな地名を入力してみましょう。

地名を入力すると天気を取得して回答してくれます。

#### 5\. プロンプトを変更してみる

プロンプトを変更してみましょう。`weather-agent.ts`の`instructions`と書いてあるところに英語でプロンプトが書かれています。

▼`weather-agent.ts`

```
You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.

  Your primary function is to help users get weather details for specific locations. When responding:
  - Always ask for a location if none is provided
  - If the location name isn't in English, please translate it（以下略）

日本語訳:

あなたはお天気アシスタントです。正確な天気の情報に加え、その天気に適したアクティビティを答えます。
ユーザーからの情報がなければ必ず地名を聞くこと
地名が英語でなければ翻訳すること（以下略）
```

ChatGPTなどのように、自然言語で書かれた指示を変更するだけで、自分好みのエージェントにカスタマイズできます。

-   回答は日本語で行うこと
-   その地域の観光名所を3つあげること

を指示に追加してみましょう。

▼`weather-agent.ts`

```
// 省略
- If the user asks for activities, respond in the format they request.
- 回答は必ず日本語で行ってください。 //✨これを追加
- 回答にはその地域の観光名所を3つあげてください。 //✨これを追加

Use the weatherTool to fetch current weather data.
```

Mastra Studioで実行すると、回答が日本語になり、観光名所が追加されました。

Mastraではこのように簡単にAIエージェントを構築できます。

### そのほかMastraでできること

エージェントだけでなく、そのほかにもさまざまなユースケースに対応できるよう機能がそろっています。一部を抜粋して紹介します。

#### Workflow

AIの判断に任せるのではなく、**ステップや条件分岐を定義して、決められた実行フローを制御**できる機能です。

#### RAG（Retrieval-Augmented Generation）

**独自のデータを取り込み・検索し、エージェントの知識を増やせる**機能です。ドキュメントを自然言語で検索するAIエージェントなどに使えます。

#### MCP（Model Context Protocol）

**外部のMCPサーバーを利用したり、自分で作ったアプリをMCPとして公開**できます。

#### Observability

**エージェントがどのように動いたかや、Workflowの実行ステップ**を確認できます。Workflowが失敗した場合に、どこのステップでつまずいたかなどを分析・デバッグできる機能です。

#### Eval

**エージェントの出力をテストケースという形で評価**し、期待するふるまいにどれぐらい近づいているかを確認できます。

### 次のステップ: エージェントをアプリとして公開する

AIエージェントをアプリとして公開するにはもう少し作り込む必要があります。ウェブアプリならウェブのUIを作成する、サーバーにデプロイするなどです。

この記事では詳しく説明しませんが、Mastraの公式サイトは関連ドキュメントが充実しています。既存のフロントエンドフレームワーク（Next.js、React、Nuxtなど）への導入や、サーバー（AWS、Cloudflare、Vercelなど）へのデプロイも記載があります。参考にしてみてください。

-   [Mastra Guides](https://mastra.ai/guides/)

### まとめ

TypeScriptでAIエージェントを作れるMastraを紹介しました。

AIがどんどん進化していく中、Mastraを使ってAIを使ったアプリケーションを開発する場面も増えそうです。実際の業務に使うには細かな調整なども必要ですが、まずは簡単なエージェントを作ってみるのも楽しいと思います。ぜひチャレンジしてみてください！