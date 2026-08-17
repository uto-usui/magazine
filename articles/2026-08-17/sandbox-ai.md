---
title: "Sandboxテスト 〜フロントエンドとAI時代の変化の激しさへの挑戦〜"
source: "https://tech.smarthr.jp/entry/2026/08/17/080914"
publishedDate: "2026-08-16"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは。[AIアシスタント](https://smarthr.jp/employee-portal/function/ai-assistant/)の開発をしている[nukosuke](https://x.com/nuko_suke_dev)です。最近は競馬の機械学習モデル作りにハマっています。回収率はなんとマイナスです。

今回はフロントエンドのテストとして、AIアシスタントで新しく構築した「Sandboxテスト」の仕組みと構築過程を、具体的なコード例や課題も含めてご紹介します。

Sandboxテストはフロントエンドに閉じた結合テスト、とAIアシスタントチームでは定義しています(後述しますが、一般的な名称ではありません)。 具体的には、バックエンド（Rails）を起動せず、[Prism](https://github.com/stoplightio/prism)によるOpenAPIモックサーバーのみで動かすPlaywrightテストです。

OpenAPIのスキーマに定義された`examples`をモックレスポンスとして返すことで、APIレスポンスのパターンを固定し、特定のUI状態（空・成功・エラー・各ステータスなど）を再現します。表示内容の検証に加え、VRT（Visual Regression Test）スナップショットの比較も行います。

さらに、Prismはモックレスポンスを返すだけでなく、パラメータ・リクエストボディなど受け取ったリクエストをOpenAPIのスキーマに照らして検証します。スキーマに違反したリクエストにはステータスコード422などPrismがバリデーションエラーを返すため、Sandboxテストはフロントエンドが送信するリクエストがOpenAPIスキーマに準拠していることの検証も兼ねます。これにより、レスポンスの表示だけでなく「フロントエンドがスキーマに沿ったリクエストを送れているか」も同時に担保できます。

つまり、ある操作でちゃんとしたUIが表示され、ちゃんとしたリクエストがバックエンドに送信できているかの一連の流れを、フロントエンドに閉じて検証します。

なお、Sandboxテストというのは一般的な呼称ではありません。既存のE2Eテスト(バックエンドのサーバーも立てるE2Eテスト)と区別するために便宜上呼んでいます。 「モックE2Eテスト」や「フロントエンド統合テスト」、「ネットワークインターセプトテスト」とも言い換えられるかもしれません。

## AIアシスタントの技術スタック

さらにSandboxテストの詳細をお話する前に、AIアシスタントの技術スタックを簡単に紹介します。今回の話に関連するのは次のキーワードです。

-   Next.js 16(App Router)
-   Rails
-   OpenAPI

また、テストにはPlaywright 1.59と、後述するOpenAPIモックサーバーのPrism 5.14を使用しています。

フロントエンドはNext.jsのApp Routerで、Server FunctionやReact Server Component(RSC)を使った実装をしています。 バックエンドはRailsを使っていますが、フロントエンドとのAPIインターフェースはOpenAPIに則ってyamlで定義しています。 さらに言えば、[openapi-generator-cli](https://github.com/openapitools/openapi-generator-cli)で自動生成したクライアントコードをNext.js側は利用して、RailsのAPIにアクセスするような構造です。 このような背景もあり、OpenAPIのスキーマに沿ってモックサーバーを立ててくれる[Prism](https://github.com/stoplightio/prism)を採用しているわけです。 ここまでの関係を図にすると次のようになります。

\---
title: AIアシスタントの技術スタックとOpenAPIの関係
---
flowchart LR
    accTitle: AIアシスタントの技術スタックとOpenAPIの関係
    accDescr: Next.jsはOpenAPIスキーマから自動生成したクライアントコードを通じてRails APIへリクエストする。同じOpenAPIスキーマを読み込んでPrismモックサーバーも起動する。
    subgraph Frontend\[フロントエンド\]
        Next\["Next.js (App Router)<br/>Server Function / RSC"\]
        Client\[自動生成クライアントコード\]
    end
    OpenAPI\[OpenAPIスキーマ\]
    Rails\[Rails API\]
    Prism\[Prismモックサーバー\]

    Next --> Client
    Client -->|APIリクエスト| Rails
    OpenAPI -.->|openapi-generator-cliで生成| Client
    OpenAPI -.->|スキーマを読み込んで起動| Prism

なお、Prismでは`Prefer: example=...`というヘッダーを付与することで、OpenAPIスキーマの`examples`からどのレスポンスを返却してほしいかを指定することができます。 Prismの動きを理解するために、具体的なスキーマ例を見てみましょう。例えば、以下のスキーマでは、`Prefer: example=empty`を指定することで、空を想定したレスポンスも返却できます。

paths:
  /v1/biz\_establishments:
    get:
      operationId: getBizEstablishments
      summary: 事業所一覧を返却する
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "schemas/BizEstablishment.yml#/components/schemas/BizEstablishment"
              examples:
                default:
                  summary: 事業所一覧
                  value:
                    biz\_establishments:
                      \- id: "1"
                        name: "東京本社"
                      \- id: "2"
                        name: "大阪支社"
                empty:
                  summary: 空
                  value:
                    biz\_establishments: \[\]

## なぜSandboxテストをするのか

SmartHRではStorybookのようなツールを使ったコンポーネントレベルの結合テストが多いですが、画面レベルでの結合的なSandboxテストを採用したのは2点理由があります。

-   ポータビリティが高い
-   そもそもRSCを前提としたエコシステムの未成熟

特に重要だと考えたのは、ポータビリティの高さです。エコシステムの未成熟は現時点の制約による消去法的な理由ですが、ポータビリティの高さは今後のフロントエンド開発の前提に関わるためです。

### ポータビリティが高い

フロントエンドの世界の変化の激しさやコーディングエージェントの台頭を鑑みると、よりポータビリティの高いテストが重要だと考えました。 ポータビリティの高いテストというのは、特定のフレームワークや設計などにできるだけ依存せず、アプリケーションの振る舞いに焦点を当てて品質を担保できるテストです。 では、フロントエンドの世界の変化の激しさとコーディングエージェントの台頭というのはどういうことでしょうか？

まず、「フロントエンドの変化の激しさ」の例を挙げると3つの観点があります。

1.  フロントエンドそのものの特性としての変更の激しさ
2.  フレームワークレベルでの変更の激しさ
3.  コンポーネントレベルの変更の激しさ

1つ目のフロントエンドそのものの特性で言うと、何と言ってもUIでしょう。 DBのスキーマの変更よりも、UIの変更の方がスピードが速く、コンポーネントの実装や設計もバックエンドと比較して速いです。

2つ目のフレームワークレベルでの変更も激しいです。 jQueryでDOMを直接操作していた時代からBackbone.jsやAngularJS、そしてReactやVue.jsへと、フロントエンドの主流は10年余りで何度も入れ替わってきました。 今はNext.js/Reactの世界でコードを書いていますが、将来的には別のフレームワークの世界でコードを書いている可能性もあります。

3つ目のコンポーネントレベルの変更で言うと、コンポーネントの分割が頻繁に変わります。 例えばRSCであれば「このコンポーネントのこの部分はサーバー側で切り出せるので、サーバーコンポーネントとして分割する」ようなことがありますし、RSCでなくとも、下層にステートを閉じ込めるためにコンポーネントを分割するようなケースもあります。

このようにフロントエンドの変化はダイナミックであり、詳細レベルのテスト(例えばコンポーネント単位)はなかなか難しいところもあります。

この変化の激しさをさらに加速させているのが、コーディングエージェントの台頭です。 CursorやClaude Code、Codexなど、実用的なコーディングエージェントが日常的な実装に使われるようになり、ドラスティックな変更が短時間でできるようになりました。 例えば[Bunは11日でRustにコードを書き換え](https://bun.com/blog/bun-in-rust)、[Stripeは1日で5,000万行のRubyのコードの移行](https://www.anthropic.com/news/claude-fable-5-mythos-5)しました。 このようなAIによるドラスティックな変更でもデグレが起きないような、抽象度の高いテストが効果的だと考えています。

もちろん、詳細なテストも必要ですが、AIアシスタントの開発では、まず全体的な振る舞いを担保する戦略を取りました。

### そもそもRSCを前提としたエコシステムの未成熟

消去法ではあるのですが、そもそもRSCを前提としたエコシステムが未成熟というのもありました。 Storybookを使ってPlayFunctionで操作し、期待するリクエストが投げられるか、レスポンス結果を元に描画できるか、というようなコンポーネント単位での結合テストが理想ではありつつも、検証時点では難しいのが実情でした。 RSCは本来サーバー側でレンダリングされるべきものですが、クライアントサイドでレンダリングされたり、Server Actionはモックしないといけない、というような制約がStorybookにはありました。

## Sandboxテストの仕組み

まず、全体のフローを図で示します。

\---
title: Sandboxテストの全体フロー
---
sequenceDiagram
    accTitle: Sandboxテストの全体フロー
    accDescr: PlaywrightがmockクッキーをセットしてページへアクセスするとNext.jsがfetchをインターセプトし、設定にマッチしたリクエストへPreferヘッダーを付与してPrismに転送する。PrismはOpenAPIスキーマで検証し、モックレスポンスまたはバリデーションエラーを返す。
    autonumber
    participant PW as Playwright
    participant Browser as ブラウザ (page)
    participant Next as Next.js
    participant Prism as Prism

    Note over PW,Prism: 事前準備（playwright.config.ts の webServer）<br/>Next.jsとPrismを自動起動

    PW->>Browser: test.use({ mockFile }) で<br/>\`mock\` クッキー（モック設定JSONの絶対パス）をセット
    PW->>Browser: page.goto('<対象パス>')
    Browser->>Next: ページ/操作のリクエスト（クッキー同送）

    Note over Next: Server Function が<br/>バックエンド宛に fetch
    Next->>Next: globalThis.fetch をインターセプト
    Next->>Next: \`mock\` クッキーから設定JSONを読み込み<br/>urlPattern（正規表現）でマッチ

    alt urlPattern にマッチ
        Next->>Prism: Prefer: example=<example> を付与して転送
    else マッチしない / クッキーなし
        Next->>Prism: ヘッダー付与せず転送（Prismデフォルト）
    end

    Note over Prism: リクエストをOpenAPIスキーマで検証
    alt スキーマ準拠
        Prism-->>Next: 指定 example のモックレスポンス（200系）
    else スキーマ違反
        Prism-->>Next: バリデーションエラー（422 など）
    end

    Next-->>Browser: レンダリング結果
    Browser-->>PW: DOM / 画面状態
    PW->>PW: UI 検証（getByRole 等）・VRT スナップショット比較

Playwrightのテスト実行時に[webServer](https://playwright.dev/docs/test-webserver)を使って自動でNext.js、Prismサーバーを起動します。 各テストは次のようなイメージになります。

import { expect, test } from "./fixtures";

test.describe("<画面/機能名>", () \=> {
  test.beforeEach(async ({ page }) \=> {
    await page.goto("<対象パス>");
  });

  test.describe("<シナリオ名>", () \=> {
    test.use({ mockFile: "xxx.json" });

    test("<検証内容>", async ({ page }) \=> {
      await expect(page.getByRole()).toBeVisible();
    });
  });
});

肝となってくるのが`test.use({ mockFile: "xxx.json" });`の部分です。 `test.use`で「どのURLにリクエストの時、OpenAPIスキーマのどの`examples`を返却したいか」を設定ファイルで指定します。 設定ファイルはこのようなJSONです。

\[{ "urlPattern": "/biz\_establishments$", "example": "default" }\]

`test`はカスタムな[fixture](https://playwright.dev/docs/test-fixtures)で、内部的にはCookieにファイルのパスをセットします。 fixtureの実装を簡略化すると次のようなコードです。

export const test = base.extend<{ mockFile: string | undefined }\>({
  mockFile: \[undefined, { option: true }\],
  page: async ({ page, mockFile }, use, testInfo) \=> {
    if (mockFile) {
      
      const baseDir = path.join(path.dirname(testInfo.file), "\_\_mocks\_\_");
      await page.context().addCookies(\[
        {
          name: "mock",
          value: \`${baseDir}/${mockFile}\`,
          domain: "<テスト対象のドメイン>",
          path: "/",
        },
      \]);
    }
    await use(page);
  },
});

一方、Next.js側ではページアクセス時やフォーム送信時などでServer Functionを通じてバックエンドに対してリクエストが走ります。 この時、Cookieから設定ファイルを読み込み、「このリクエストにマッチしたら`Prefer: example=...`ヘッダーを付与する」というようなハンドリングをします。`globalThis.fetch`に当てるパッチを簡略化すると次のようなコードです。

export async function setupFetchMock() {
  const { cookies } = await import("next/headers");
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (input, init) \=> {
    const url = toUrlString(input);

    if (url.includes("<バックエンドのURL>")) {
      
      const mockFilePath = (await cookies()).get("mock")?.value;
      if (mockFilePath) {
        const mockConfigs = await loadMockConfigs(mockFilePath);
        const matchedConfig = mockConfigs.find(({ urlPattern }) \=>
          new RegExp(urlPattern).test(url),
        );
        if (matchedConfig) {
          const headers = new Headers(init?.headers);
          headers.set("Prefer", \`example=${matchedConfig.example}\`);
          return originalFetch(url, { ...init, headers });
        }
      }
    }

    return originalFetch(input, init);
  };
}

このようにすることで、テストが要求するレスポンスを返し、エラーなどのUIの状態の再現やスナップショットの比較ができるわけです。 また、Prism側でリクエストのスキーマに問題があればエラーも返却され、リクエストも検証ができます。

## Sandboxテスト構築で難しかったところ

Sandboxテストの構築にあたって色々と難しいところはありましたが、大きいところで2つ挙げます。

1.  ネットワークインターセプトが難しい
2.  環境変数の扱いが難しい

### 1\. ネットワークインターセプトが難しい

Sandboxテストではテストケース毎で要求する、OpenAPIスキーマの`examples`をNext.js(Node.js)サーバーへ伝え、しかるべきリクエストの場合はNext.jsから`Prefer`ヘッダーをセットしてPrismに送信する必要があります。 しかしながら、Sandboxテストには以下のような様々なコンテキストと考慮事項があります。

-   PlaywrightとNext.jsという別プロセス
    -   プロセス間を跨いで、Playwrightテストが要求するOpenAPIスキーマの`examples`を伝える必要がある。
-   Next.jsの中でもフロントとバックエンドの存在(ブラウザとNode.js)
    -   どこでfetchをインターセプトして `examples` を伝えるのか。
-   Playwright内の個々のテスト
    -   個々のテストで設定がバッティングしないようにしないといけない。
-   画面アクセス時における複数バックエンドへのリクエスト
    -   特にブラウザからサーバーへのネットワーク通信はServer Functionによってエンドポイントが1つにまとめられるため、リクエストの区別ができない。

このように考慮事項も多く、既存のライブラリで解決できないかと調査しましたが、残念ながら要件に合うものは見つかりませんでした。 例えば以下を検討しましたが、使うのは難しいと判断しました。

-   Playwrightの`page.route`
    -   ブラウザからのリクエストをインターセプトするAPI。
    -   ブラウザはServer Functionによってエンドポイントがページごとで1つにまとめられ、かつその実装も隠蔽されているので、Next.js(Node.js)側へ`examples`を伝える手段がない。
-   `msw`
    -   ブラウザやサーバーでネットワークをインターセプトしモックを返す定番ライブラリ。
    -   モックのレスポンスを返すといった簡単な用途なら問題ないが、今回のような複雑にネットワークをインターセプトする用途は難しい。
-   `@mswjs/interceptors`
    -   `msw`が内部的に使っている低レイヤーのネットワークインターセプトのライブラリ。
    -   Playwrightプロセス側からNext.jsプロセス側という、Remote環境へのインターセプトを伝えるのが難しい。複雑なプロセス間通信になる。

結局、シンプルなファイルによるプロセス間のコミュニケーションを取ることにしました。具体的には以下の通りです。

-   Playwrightプロセス側は「このファイル読んでね」と指定し、Next.jsプロセス側でそのファイルを購読する。
-   Playwright側はCookieでファイル指定することで、Next.jsのNode.jsサーバー側までデータ送信。
-   Cookieからファイルを購読するように`globalThis.fetch`にパッチを当てる(もちろんSandboxテスト環境のみ)。

### 2\. 環境変数の扱いが難しい

そもそもPlaywrightとNext.jsは別プロセスですが、できるだけ読み込む環境変数も合わせる必要がありました。 また、ローカルで開発しながらテストもするので、`.env.development`ファイルのような開発用の環境変数を読み込む必要があります。

Next.jsは`@next/env`という独自の環境変数を読み込む機構があります。 これが一癖ありまして、環境変数の読み込み優先度やキャッシング、読み込まれるenvファイルの制約(例えば独自の`.env.sandbox`のようなenvファイルは定義できない)など、色々な問題に悩まされました。 結局、できるだけNext.jsの環境変数読み込みに合わせるような、環境変数の読み込みロジックを実装する必要がありました。 実装を簡略化すると次のようなコードで、`@next/env`内部のパーサーを再利用しつつ、読み込み順を自前で制御しています。

import { processEnv } from "@next/env";

export const updateEnvForSandbox = () \=> {
  const cwd = process.cwd();

  for (const envPath of \[".env.sandbox", ".env.test", ".env.development"\]) {
    const contents = readEnvFileIfExists(path.join(cwd, envPath));
    if (!contents) continue;

    const \[, parsed\] = processEnv(
      \[{ path: envPath, contents, env: {} }\],
      cwd,
      console,
      true,
    );
    Object.assign(process.env, parsed);
  }
};

このように、別プロセスの環境変数読み込み、かつフレームワーク側で環境変数読み込み機能を持っているならではの難しさがありました。

## Sandboxテストの課題

現在は複数の画面を対象に数十件のテストを運用しています。運用を開始したばかりですが、すでに次のような課題があります。

1.  `next dev`がメモリを食いすぎてCI環境でFlakyになる
2.  ストリーミングのレスポンスの検証ができない
3.  送信するデータの中身の検証ができない

特に2と3についてはSandbox導入前から把握済でしたが、1は想定外で、運用を開始してから気づきました。

### 1\. `next dev`がメモリを食いすぎてCI環境でFlakyになる

`next dev`の内部で動いているTurbopackは、インクリメンタルなビルド(必要に応じて、必要な分だけビルドしてキャッシュする)で、動作は速いのですが、いかんせんインメモリにキャッシュを蓄積していきます。 そのため、テストの実行時間が伸びるにつれ徐々にメモリを食っていき、特にCI環境でFlakyになる問題が出ています。

`next build && next start`のようなサーバー起動も考えられますが、都度フルビルドを走らせるのも現実的ではありません。

しかし、[Next.jsのv16.3でメモリの大幅な改善](https://nextjs.org/blog/next-16-3#less-memory-usage-in-dev)がされているので、アップデートすれば改善される見込みです。

### 2\. ストリーミングのレスポンスの検証ができない

AIアシスタントではAIの回答をストリーミングで返していますが、Prismはストリーミングに対応していません。 今回`globalThis.fetch`をパッチしていますが、例えばストリーミングに対応する場合はさらに自前でパッチを当てる必要があります。

### 3\. 送信するデータの中身の検証ができない

Prismで送信するデータのスキーマの検証(必須項目が抜け落ちていないか等)はできますが、しかるべきデータが送信されているかの検証まではできません。 フォームのようなUIではユーザーの入力値に基づき、サーバー側にしかるべきデータが送信されているかをチェックしたいですが、そこまではできないわけです。 こちらも対応する場合は、例えば`globalThis.fetch`のパッチをさらに拡張する必要があります。

## 最後に

AIアシスタントではフロントエンドやAI時代の変化の激しさを見据えたSandboxテストを導入しました。 もしフロントエンドのテストの構築を考えていたら参考になれば幸いです！

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)