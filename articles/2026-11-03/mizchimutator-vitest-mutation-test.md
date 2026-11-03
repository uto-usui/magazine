---
title: "@mizchi/mutator で vitest の mutation test をする"
source: "https://zenn.dev/mizchi/articles/introduce-mutator"
publishedDate: "2026-10-27"
category: "testing"
feedName: "mizchi"
author: "mizchi"
---

(この記事は自分が実装したツールをAIに紹介させ、それを自分が手で書き直したものです。)

Vitest を第一に置いた mutation testing ツール、`@mizchi/mutator` を作ったので紹介します

[mizchi/mutator](https://github.com/mizchi/mutator)

AIでカバレッジを増やすためだけのテストを書き散らすようになりました。じゃあ、そのテストコードの品質はどう検査すべきでしょうか。

そうですね、ミューテーションテストですね。

mutation test は実行時間が問題になるので、差分に対して実行できるようにチューニングしました。変更のたびに、その変更をテストが検査できているか確認するためのツールです。

## ミューテーションテスト: 実装ではなくテストコードの品質を測る

ミューテーションテストは、実装に意図的な変更を加え、それをテストコードが検出できるか調べる手法です。実装のテストではなく、テストの品質を測ります。

前提として、実装をどんなに書き換えても落ちないテストは、おそらく意味のないテストです。意図的にバグを仕込んだ際に落ちるのが良いテストだと言えます。

ミューテーションテストは、わざと実装を少しだけ壊して、テストが落ちるかを確かめます。この、変更を加えた実装を mutant と呼びます。

例えば、次のようなコードです。

src/is-adult.ts

```
export function isAdult(age: number): boolean {
  return age >= 18;
}
```

テスト

src/is-adult.test.ts

```
import { expect, test } from 'vitest';
import { isAdult } from './is-adult';

test('18歳未満は成人ではない', () => {
  expect(isAdult(17)).toBe(false);
});

test('18歳を超えていれば成人', () => {
  expect(isAdult(19)).toBe(true);
});
```

このテストは通りますし、関数の return も実行されています。しかし、実装をこう壊してもテストが通ってしまいます。

```
-  return age >= 18;
+  return age > 18;
```

18 歳ちょうどのケースが抜けています。

コードカバレッジでわかるのは、どこを実行したかです。mutation test を使うと、実装のどんな変更をテストが見逃すかまで調べられます。実行していることと、結果を検査できていることには差があります。

## mutator quick start

```
pnpm add -D @mizchi/mutator
pnpm exec mutator
```

既存の Vitest 設定を読み込みます。デフォルトでは `src/` 以下の JavaScript / TypeScript を対象にし、結果は `.mutator/snapshot.json` に保存します。

先ほどのコードとテストで実行すると、次の mutant が残ります。出力の抜粋です。

```
Killed 6 · Survived 1 (1 not infected)

not infected - tests run it, but never with a value it changes:
  src/is-adult.ts:2:10  Survived   age >= 18 -> age > 18
```

`Killed` は変更をテストで検出できたもの、`Survived` は検出できなかったものです。今回は `>=` を `>` に変えても、17 と 19 では結果が変わらないので `not infected` に分類されています。

境界値のテストを追加します。

```
test('18歳ちょうどは成人', () => {
  expect(isAdult(18)).toBe(true);
});
```

もう一度 `pnpm exec mutator` を実行すると、この例では 7 件すべてが `Killed` になります。追加したテストで、先ほどの境界値の変更を検出できるようになりました。

## インクリメンタルな実行

mutation test は、mutant の数だけテストを繰り返すので重いです。対象が増えるほど、全体を毎回実行するのがつらくなります。

普段の開発では、変更箇所に絞って実行します。

```
# 最後のコミットからの作業中の変更
pnpm exec mutator --since HEAD

# main ブランチからの変更
pnpm exec mutator --since main
```

`--since main` は、main と HEAD の共通祖先から現在の作業ツリーまでの差分を使います。コミット済みのブランチ差分に加えて、作業中の変更も対象になります。

デフォルトでは、変更箇所と重なるノードの mutant を選びます。変更した関数全体まで対象を広げるなら、`--scope scope` を指定します。

```
pnpm exec mutator --since main --scope scope
```

差分実行では、結果の表示とスコア、失敗判定も変更箇所に絞ります。既存コード全体に残っている mutant の調査を、今回の変更の確認と一緒に引き受ける必要がありません。

PR で変更箇所の検出漏れをチェックするなら、こうなります。`origin/main` がローカルに取得済みであることが前提です。

```
pnpm exec mutator --since origin/main --fail-on-survived
```

差分内に `Survived` の mutant が残ると、終了コード 2 で失敗します。

差分実行で調べる範囲は限定されています。例えば、テストのアサーションだけを弱めた変更で、差分外の実装にある mutant が生き残るようになっても、通常の差分実行では拾いません。以前 mutant を検出していたテストが削除された場合などは例外的に再確認しますが、定期的な全体実行も組み合わせる想定です。

## ベンチマーク

リポジトリには、Vitest を使う TypeScript ライブラリ 5 件で StrykerJS 10 と比較した結果を置いています。  
手元の M5 の Node.js 24 で計測した、各 2 回の平均実行時間(秒)です。

プロジェクト

mutator 初回

StrykerJS 初回

mutator 変更後 `--since`

StrykerJS 変更後 `--incremental`

defu

2.0

7.3

0.63

2.5

scule

2.9

6.5

0.68

2.1

cookie-es

12.2

16.7

0.71

2.6

pathe

16.8

15.2

1.0

4.3

ufo

23.6

25.9

1.1

3.5

この計測では、1 箇所の編集後に mutator を差分実行すると、おおむね 1 秒前後で返ってきます。初回実行は pathe で StrykerJS の方が速く、特に差が出ているのは変更後の待ち時間です。

ただし、これは同じ範囲を同じ条件で実行した比較ではありません。`--since` は結果の対象を差分に限定し、StrykerJS の `--incremental` は全体の結果を持ちながら再実行を減らします。生成する mutant の集合も異なります。

## 見つかった穴を埋める

レポートでは、検出できなかった mutant を 3 種類に分けています。

分類

状態

確認すること

not reached

テストがその箇所を実行していない

テストケースを追加する

not infected

実行しているが、変更前後で値が変わる入力がない

境界値などの入力を追加する

not detected

変更後の実装を実行してもテストが落ちない

アサーションや仕様を確認する

HTML や JSON のレポートも出せます。

```
pnpm exec mutator --since main --reporter text --reporter html --reporter json
```

デフォルトの出力先は `.mutator/report/` です。JSON / HTML は mutation-testing-elements の形式に合わせています。

AI エージェントにテストの補強を任せる場合は、`--reporter agent` で、未検出の mutant と所属する関数、関連テスト、穴の種類を JSON で渡せます。テストを追加したあと、`--only` で個別の mutant だけ再確認することもできます。

```
pnpm exec mutator --since main --reporter agent
```

生き残った mutant がすべてテスト不足とは限りません。どんな入力でも振る舞いが変わらない equivalent mutant もあります。その場合は理由付きで `mutator accept` に記録できます。スコアを上げるためだけのテストを足すより、変更が仕様上観測できるかを確認する方が先です。

自分がやりたかったのは、コードを変更したときに「この変更を見逃すテストの穴はあるか」を、その場で確認することです。まずは `pnpm exec mutator --since main` で、いま作業している差分に対して試してみてください。

## 補足: 作った経緯

最初は StrykerJS にパッチを送って改善しようとしていました。実装を追う中で、Vitest 上のモジュールをメモリ上で変換する実行モデルを自分で試したくなり、パフォーマンスチューニングも兼ねて独立したツールにしました。mutant の生成から実行まで、StrykerJS に依存せず実装しています。

StrykerJS にも Vitest 連携や incremental 実行があります。自分の用途では、Vitest を第一に置き、変更のたびに差分へ実行する使い方を詰めたかった、というのが mutator を作った理由です。