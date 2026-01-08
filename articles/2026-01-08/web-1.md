---
title: "メルカリ ハロ Web フロントエンドの1年間の改善と学び"
source: "https://engineering.mercari.com/blog/entry/20251205-mercari-hallo-frontend-improvements/"
publishedDate: "2025-12-05"
category: "engineering"
feedName: "Mercari Engineering"
---

こんにちは。メルカリのフロントエンドエンジニアの [@mattsuu](https://x.com/ryo_manba) です。  
この記事は、[Mercari Advent Calendar 2025](https://engineering.mercari.com/blog/entry/20251126-mercari-advent-calendar-2025/) の5日目の記事です。

## はじめに

[メルカリ ハロ Webフロントエンドの開発スピードと品質両立の取り組み](https://engineering.mercari.com/blog/entry/20240613-mercari-hallo-web-frontend/) という記事を公開してから約1年が経過しました。 前回の記事では、Next.js、Apollo Client、Tailwind CSS、そして monorepo 構成を採用し、MSW を使用したモック駆動開発などの技術スタックと開発手法について紹介しています。

この1年間、私たちは初回の技術選定を基盤としながら、パッケージ管理、テスト戦略、開発体験の3つの領域に焦点を当てて継続的な改善を進めてきました。 本記事ではそれらの取り組みと効果について紹介します。

## パッケージ管理の改善

monorepo 環境での依存関係管理とセキュリティ対策として、pnpm catalog による一元管理、minimumReleaseAge によるサプライチェーン攻撃対策、Knip による未使用パッケージの検出を導入しました。これらにより、依存関係の更新作業の効率化とセキュリティリスクの低減を実現しています。

### pnpm catalog による一元管理

monorepo 環境では、同じライブラリの異なるバージョンを管理する場合があります。バージョンによって I/F が異なったり、セキュリティ update の対応が複数箇所で必要になるなど、対応コストが発生します。これを防ぐために各ライブラリで単一のバージョンを利用する方針を採用しました。

pnpm の catalog 機能を使うことで、依存関係のバージョンを一箇所で管理することができます。

```
# pnpm-workspace.yaml
catalog:
  '@apollo/client': 3.13.4
  'next': 15.3.2
  'react': 19.0.0
  # ... その他の依存関係
```

`pnpm-workspace.yaml` にカタログを定義し、各パッケージの `package.json` で `catalog:` を参照する運用により、同一ライブラリのバージョン分散を防いでいます。

```
{
  "dependencies": {
    "@apollo/client": "catalog:",
    "next": "catalog:",
    "react": "catalog:"
  }
}
```

この仕組みにより、依存関係のバージョン更新は catalog 側を更新するだけで monorepo 全体へ反映されるため、個別のパッケージに対して複数 PR が発生する問題を解消できました。

導入手順については次の記事を参考にしました。

[monorepo内でのパッケージのバージョンを1つだけに統一するOne Version Ruleをpnpm catalogで実装する](https://tech.newmo.me/entry/one-version-rule-built-on-pnpm-catalog)

### Dependabot の活用

Dependabot を catalog と組み合わせることで、依存関係更新のワークフローが改善しました。Dependabot が catalog のバージョンを更新する PR を作成し、それをマージするだけで monorepo の依存関係を一括更新できます。

運用面では導入して間もなかったこともあり、ナレッジ共有も踏まえて週1で担当をローテーションしていました。CI で自動テストが通り、PR に対して E2E テスト手動でトリガーして通過したらマージするようにしています。major update など破壊的変更があるものは別途チケットを切って対応していました。

また、Dependabot の [cooldown 機能](https://github.blog/changelog/2025-07-01-dependabot-supports-configuration-of-a-minimum-package-age/)を利用して、既存ライブラリの更新に一定の待機期間を設けていました。これにより、公開直後の不具合やセキュリティリスクを回避しやすくなりました。

### minimumReleaseAge によるセキュリティ対策

前述の Dependabot の cooldown 機能は既存のライブラリアップデートに対するセキュリティ対策ですが、手元で新規ライブラリのインストールやアップデートを行う際には pnpm の [`minimumReleaseAge`](https://pnpm.io/settings#minimumreleaseage) が役立ちます。

```
# pnpm-workspace.yaml
minimumReleaseAge: 10080 # 1 week in minutes
minimumReleaseAgeExclude:
  - '@example/*'
```

この設定により、公開されてから一定期間経過していないパッケージはインストールされません。 社内パッケージは `minimumReleaseAgeExclude` で除外し、開発の妨げにならないようにしています。また未導入ではありますが、pnpm の [trustPolicy](https://pnpm.io/settings#trustpolicy) オプションを有効にすると、[サプライチェーン攻撃への対策](https://pnpm.io/supply-chain-security#enforce-trust-with-trustpolicy)をさらに強化できます。

### Knip による未使用パッケージの検出

プロジェクトが成長する中で、使われなくなった依存関係が残り続ける問題がありました。未使用のパッケージはバンドルサイズの増加やセキュリティリスクの原因になります。

[Knip](https://knip.dev/) を導入することで、未使用のパッケージを自動検出できるようになりました。 CI では [knip-reporter](https://github.com/marketplace/actions/knip-reporter) を利用していますが、現在は [builtin の reporter が実装された](https://github.com/webpro-nl/knip/pull/1231)ため、そちらを使うと良いかもしれません。また、Knip は未使用のファイルや、export しているがどこからも import されていない型や関数も検出できるため、コードベースを健全に保つ上で効果的です。

詳しくは次の記事が参考になります。  
[TypeScript/JavaScriptの不要なコードを削除するツール「Knip」の紹介 – ベースマキナ エンジニアブログ](https://tech.basemachina.jp/entry/introduction-knip)

## テスト基盤の整備

テスト戦略として、全画面への Playwright による Integration Test の導入、Component Test の最小化、VRT の活用を進めました。Code Coverage よりも Use Case Coverage を重視し、テストの種類を絞ることでメンテナンスコストを削減しながら、安定したテスト基盤を整えることができました。

### Playwright を用いた Integration Test と VRT の導入

1年前の時点では Integration Test の基盤が十分に整っておらず、軽微な機能改修でも QA エンジニアに詳細な確認を依頼する必要がありました。また、機能自体に問題がなくとも UI のリグレッションが発生した際に気づきにくい体制でした。

この課題を解消するため、画面全体を対象とした Playwright による Integration Test を導入し、UI の差分検出には Playwright の VRT を活用しました。

Integration Test の方針は、メルペイでのテスト自動化方針を参考に次の考えをベースとしています。

> 基本的に、仕様書をベースにアプリケーションの振る舞いが期待通りかをテストします。実装の詳細は考慮しません。インテグレーションテストが仕様書と対応し、テストコードを見るとアプリケーション挙動がわかるように管理されると理想的です。  
> 参考: [メルペイフロントエンドのテスト自動化方針](https://engineering.mercari.com/blog/entry/20211208-test-automation-policy-in-merpay-frontend/#:~:text=%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AB%E3%80%81%E4%BB%95%E6%A7%98%E6%9B%B8%E3%82%92%E3%83%99%E3%83%BC%E3%82%B9%E3%81%AB%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E6%8C%AF%E3%82%8B%E8%88%9E%E3%81%84%E3%81%8C%E6%9C%9F%E5%BE%85%E9%80%9A%E3%82%8A%E3%81%8B%E3%82%92%E3%83%86%E3%82%B9%E3%83%88%E3%81%97%E3%81%BE%E3%81%99%E3%80%82%E5%AE%9F%E8%A3%85%E3%81%AE%E8%A9%B3%E7%B4%B0%E3%81%AF%E8%80%83%E6%85%AE%E3%81%97%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%86%E3%82%B9%E3%83%88%E3%81%8C%E4%BB%95%E6%A7%98%E6%9B%B8%E3%81%A8%E5%AF%BE%E5%BF%9C%E3%81%97%E3%80%81%E3%83%86%E3%82%B9%E3%83%88%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E8%A6%8B%E3%82%8B%E3%81%A8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E6%8C%99%E5%8B%95%E3%81%8C%E3%82%8F%E3%81%8B%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E7%AE%A1%E7%90%86%E3%81%95%E3%82%8C%E3%82%8B%E3%81%A8%E7%90%86%E6%83%B3%E7%9A%84%E3%81%A7%E3%81%99%E3%80%82)

仕様書とテストコードを完全に一致させることは難しいものの、基本方針として Code Coverage よりも Use Case Coverage を重視する姿勢で運用していました。

#### テスト構成

テストコードの大枠とトップレベルの `describe` について次のような構成にしています。

```
/**
 * Specs:
 * https://example.com/specs/feature-abc  // ①
 */
test.beforeEach(async ({ page }) => {
  await mockLogin(page);
  await mockAllGraphQL(page);     // ②
});

// 画面のパス
const url = '/sample-page';

test.describe('Rendering', () => {
  test('renders correctly', async ({ page }) => {
    await mockGraphQL( // ③
      page,
      SampleQueryDocument,
      produce(mockSampleQueryResponse(), (draft) => {
        // ... 必要に応じてレスポンスを調整
      })
    );
    await page.goto(url); // ④
    // ... レンダリング確認
  });
});
test.describe('Validation', () => {});
test.describe('Actions', () => {});
```

① 仕様へのリンクを記述する  
② `mockAllGraphQL` を利用してすべての API リクエストをモックする  
③ 個別ケースは `mockGraphQL` でレスポンスを上書きする

-   トップレベルの `beforeEach` 内で `mockGraphQL` を利用することは避け、対象のテストと近い場所で呼び出す
-   多少冗長でもモック内容とテスト内容の関連が明確になることを優先する

④ モック設定完了後に `page.goto` を実行し、テスト対象の画面に遷移する

トップレベルの `describe` については次の3つに分類しています。

-   **Rendering**: レスポンスに基づいて情報を正しくレンダリングできるか
-   **Validation**: 無効なリクエストが送信されるのを防げるか
-   **Actions**: 利用者の操作に応じて、正しいリクエストを生成し、レスポンスを適切に処理できるか（更新、エラー、ページ遷移を含む）

記述ルールを明確にしたことで一貫した実装が可能になり、monorepo で複数メンバーがそれぞれのアプリケーションや機能を担当する場合でも、テストを書く負荷を減らすことができました。また、これらのルールを Claude.md にまとめておくことで、AI によるセルフレビューやテスト生成の精度も向上し、開発体験の改善につながりました。

### Component Test 最小化戦略

テストの種類とバランスを考えたとき、私たちは次の方針を採用しました。

-   **Integration Test (Playwright)**: ブラウザ上で実際のユースケースを検証し、全画面をカバーする
-   **Component Test (React Testing Library)**: DatePicker など複雑な UI コンポーネントのみに限定する
-   **Unit Test (Jest)**: ロジック部分を対象にカバレッジ 80% 程度を維持する

テストの種類を絞ることで、チームメンバーが学ぶべき範囲を限定し、テストの重複排除などメンテナンスを削減することができました。

Integration Test に寄せた構成では CI のパフォーマンスが気になるところですが、[Playwright の sharding](https://playwright.dev/docs/test-sharding) で4並列にテストを実行させることで実行時間が10分程度に抑えられるようにしています。

また、Playwright にはテスト計画生成・テスト生成・自動修復を行う [Test Agents](https://playwright.dev/docs/test-agents) が用意されており、将来的にテスト運用をより効率化できる可能性があります。QA チームが管理する E2E テストでも Playwright を採用していたため、チーム間でツールが統一されている点もメリットでした。

### VRT (Visual Regression Testing) の活用

モバイル向け Web UI は事業者向け管理画面と比べて画面あたりの情報量が少なく、UI の変化を見つけやすいという特徴があります。また、UI 検知に必要なモックも少なくて済むため、実装やメンテナンスの負担を抑えられます。そのため、モバイル向け UI では Rendering のテストを VRT 中心にし、事業者向け管理画面では text や element の assertion を用いる構成にしていました。VRT には Playwright の [screenshot 機能](https://playwright.dev/docs/screenshots)を利用して全画面実装しました。

```
test('should render page correctly', { tag: '@vrt' }, async ({ page }) => {
  await mockGraphQL(
    page,
    ExampleDocument,
    produce(mockExampleResponse(), (draft) => {
      // UI の確認に使うデータは immer で上書きする
      draft.data.item.name = 'テストアイテム1';
    })
  );

  await page.goto('/example');
  await expect(page).toHaveScreenshot({ fullPage: true });
});
```

これまでは開発環境でデザイナーに UI を直接確認してもらう必要がありましたが、VRT の導入により特定条件の UI を Snapshot で比較・確認できるようになり、確認作業の工数を削減できました。

## 開発体験の向上

開発効率と品質を向上させるため、ESLint カスタムルールによる品質担保、Mock の自動生成、Claude Code Action によるセルフレビュー、Apollo MCP によるテストデータ作成の効率化といった取り組みを行いました。これらにより、レビュー負荷の軽減や開発スピードの向上につながりました。

### ESLint カスタムルールによる品質担保

実装漏れが原因で QA 段階で不具合が見つかった場合には、修正と合わせて ESLint のカスタムルールを追加していました。チーム固有のルールをドキュメントや Claude.md / Agents.md にまとめる方法もありますが、静的解析によってルールを強制するほうがヒューマンエラーを防ぎやすく、品質担保に効果的です。

カスタムルールの追加には、次の記事が参考になります。

-   [no-restricted-syntax でお手軽にカスタムルールを追加する – Zenn](https://zenn.dev/nissy_dev/scraps/ca7137375da3aa)
-   [Ubie における ESLint 活用 – Zenn](https://zenn.dev/ubie_dev/articles/a5c8fb2d219258)

### Mock 自動生成の仕組み

GraphQL スキーマが更新されるたびに手動で Mock データを更新するのは負担が大きいため、[@graphql-tools/mock](https://the-guild.dev/graphql/tools/docs/mocking) を利用した Mock データの自動生成を導入しました。スキーマが更新されたら、pnpm でスクリプトを実行するだけで Mock データを更新できます。

```
# GraphQL スキーマから型と Mock データを生成
pnpm generate:graphql
```

GraphQL Code Generator のカスタムプラグインを作成し、`@graphql-tools/mock` の `addMocksToSchema` を使って Mock データを生成しています。

```
import { addMocksToSchema } from '@graphql-tools/mock';

const mockedSchema = addMocksToSchema({
  schema: graphqlSchema,
  mocks: {
    // 型に応じて初期値を設定
    ID: () => 'mock-id-0001',
    String: () => 'Hello World',
    Int: () => 10,
    Boolean: () => true,
    Time: () => '2021-01-01T00:00:00.000Z',
  },
});

// スキーマに対してクエリを実行し、Mock データを生成
const result = executeSync({
  schema: mockedSchema,
  document: queryDocument,
});
```

この `result` を使って、次のように mock 関数を自動生成します:

```
const mockFn = `
export function mockExampleResponse(): ExecutionResult<ExampleQuery> {
  return ${JSON.stringify(result, null, 2)};
}
`;
```

この仕組みにより、GraphQL スキーマから適切な Mock データが自動生成されるため、手動で値の整合性を確認する手間が大きく削減されました。

また、特定のケースを再現したい場合は、immer を使って必要な部分のみ上書きできます。

```
import { produce } from 'immer';
import { mockExampleResponse } from 'example-mockdata/base/gen/query';

const customMock = produce(mockExampleResponse(), (draft) => {
  // 特定の条件を再現するためにデータを上書き
  draft.data.items[0].status = 'active';
  draft.data.items[0].count = 10;
});
```

このように、意図的に上書きした箇所がそのまま Storybook やテストで確認したい条件として明確に残るため、Mock の管理や UI・テスト確認がシンプルになりました。

### Claude Code Action によるセルフレビュー

[claude-code-action](https://github.com/anthropics/claude-code-action) を導入することで、PR レビューを依頼する前の draft の段階で実装者自身が抜け漏れに気づけるようになりました。レビュワーが指摘する前に基本的なミスを修正できるため、レビュワーの負担削減や品質の向上につながりました。

### Apollo MCP によるテストデータ作成の効率化

ローカルで開発する際は、API が未実装の場合を除き、基本的にバックエンドと実際に疎通しながら進めていました。モックで開発する手もありますが、実際の API と通信するほうが挙動の再現性や信頼性が高いためです。一方で、特定の条件を再現するためのテストデータ作成には課題がありました。開発環境の管理画面を操作したり、場合によっては DB を直接触る必要があり、準備に手間がかかりがちでした。

そこで [Apollo MCP](https://www.apollographql.com/docs/apollo-mcp-server) を導入し、テストデータを口語ベースで簡単に作成できるようにしました。Apollo MCP は GraphQL のスキーマやクエリを操作して実行できるため、次のようなことが可能になります。

-   「今日の18:00 ~ 20:00 で時給1200円の募集を北海道で作って」のような指示をすると、該当する mutation を実行しテストデータを作成
-   GraphQL スキーマを自動で読み取り、どんなクエリや mutation が使えるかをで一覧・検索
-   特定のクエリに必要な引数を口語形式で検索

これにより、ローカルやテスト環境でのデータ準備が大幅に効率化され、手動テストの工数削減や開発スピードの向上につながりました。

## おわりに

この1年間、日々の開発の中で出てきた課題に向き合いながら、少しずつ仕組みを整えてきました。All for One のカルチャーのもと、メンバーがそれぞれの専門性を活かしつつ、知見を共有しながら開発できたことが改善を進める上で良い循環になっていたと思います。本記事で紹介した取り組みが参考になれば幸いです。

明日の記事は sathiya さんです。引き続きお楽しみください。