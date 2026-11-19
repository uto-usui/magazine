---
title: "Odin に賭けたい人向けの Odin 言語入門ガイド"
source: "https://zenn.dev/mizchi/articles/odin-introduction-guide"
publishedDate: "2026-11-18"
category: "testing"
feedName: "mizchi"
author: "mizchi"
---

この記事は自分が Odin 言語を読むためにAIに書かせたものをベースに、おもに所感などを中心に書き換えました。。

-   「Odin について調べて」
-   「bit\_field が面白そう」
-   「エラー処理どう書く？」

自分は、「Odin は知ってたけど、まさか Rex で採用されるなんて」ぐらいの気持ちで調べています。Rex はすでに使っています。

* * *

Mitchell Hashimoto 氏が、Rex の Windows クライアントに Odin を使っていると紹介していました。2026 年 11 月 17 日 UTC の投稿です。[紹介の投稿](https://x.com/mitchellh/status/2122731286175580550)（[投稿本文のミラー](https://teapawt.net/mitchellh/with_replies)）

開発者として挙げられているのは Nick Aversano 氏です。独自の GUI フレームワークと DirectX ベースのレンダラを持つ、らしいです。

これをきっかけに [Odin](https://odin-lang.org/) を調べ直しました。**構文は Go 風で、Go より低レベルのプリミティブな操作を直接書ける言語**、というのが現状の捉え方です。個人的に気に入ったのが `bit_field` と、エラー処理の `or_return` で、あとで紹介します。

Odin は Ginger Bill が開発を始めた汎用の手続き型言語です。「Go 風」はあくまで基本的な機能の紹介を省くためにそう言ってるだけで互換ではありません。

[公式 FAQ](https://odin-lang.org/docs/faq/#what-have-been-the-major-influences-in-the-languages-design)

## 既にどんなものが作られているか

Rex 以外にも、映像制作のツールや開発者向けツールで使われています。[公式 Showcase](https://odin-lang.org/showcase/) には、次のような実例があります。

実例

用途と見どころ

JangaFX の EmberGen、LiquiGen、GeoGen

炎・煙や液体、地形などを扱うリアルタイム制作ツール。数値計算と UI のある商用アプリの例

[Spall](https://gravitymoth.com/spall/)

Web 版とネイティブ版を持つ profiler。性能解析に使う開発者向けツールの例

[OLS](https://github.com/danielgavin/ols)

Odin の language server。補完や定義ジャンプなど、言語開発の道具を Odin 自身で作っている例

## 動かせる OS と生成ターゲット

ホスト環境の一覧。[Getting Started](https://odin-lang.org/docs/install/)

OS

CPU

Windows

x86-64 / AMD64。MSVC ツールチェーンを使う

Linux

x86-64 / AMD64、ARM64

macOS

x86-64 / Intel、ARM64 / Apple Silicon

FreeBSD、NetBSD

x86-64 / AMD64、ARM64

OpenBSD

x86-64 / AMD64

生成先には WebAssembly もあります。ブラウザ用の `js_wasm32`、WASI 環境用の `wasi_wasm32`、ランタイムを自分で用意する `freestanding_wasm32` などを選べます。ブラウザ用には `odin.js` による実行側の準備も必要です。[公式の WebAssembly 説明](https://github.com/odin-lang/Odin/blob/master/core/sys/wasm/README.md)

利用中のコンパイラが認識するターゲットは、次のコマンドで確認。

```
odin build . -target:"?"
```

## Hello Odin

### macOS

Homebrew を使っているなら、Odin の formula があります。Xcode Command Line Tools が未導入なら先に入れます。[Homebrew の Odin formula](https://formulae.brew.sh/formula/odin)

```
xcode-select --install
brew install odin
odin version
```

配布版を直接使いたい場合は、[公式 Releases](https://github.com/odin-lang/Odin/releases) から OS と CPU に合ったものをダウンロードして展開します。

## ファーストインプレッション: かなり Go

まずは固定長配列を slice として渡して、合計を返す例です。

```
package main

import "core:fmt"

sum :: proc(values: []int) -> int {
	result := 0
	for value in values {
		result += value
	}
	return result
}

main :: proc() {
	values := [3]int{2, 4, 8}
	fmt.println(sum(values[:]))
}
```

`package`、`import`、`:=`、`[]int`、複数戻り値、`if`、`for`、`switch` といった要素には見覚えがあります。`while` はなく、条件だけのループも `for` です。関数は `sum :: proc(...)` と宣言し、戻り値の型は `-> int` のように書きます。

`:=` は型を推論した変数宣言、`::` はコンパイル時定数の宣言です。型や procedure に名前を付ける場合にも `::` を使います。[公式 Overview](https://odin-lang.org/docs/overview/#variable-declarations)

`for value, index in values` の順序は値が先なので、Go の `range` から読み替えるときは注意が要ります。

ただし、Go の感覚でそのまま書くと変わるところがあります。

観点

Go から読み替えるポイント

メモリ

GC に任せず、解放する主体と allocator を決める

配列

`[N]T`、`[]T`、`[dynamic]T` を使い分ける

`defer`

現在のブロックの終わりに実行される。式もその時点の値を見る

データと処理

struct と procedure を分けて書く。型にメソッドを定義しない

エラー

複数戻り値で扱う。`or_return` で伝播を書ける

Go でも `unsafe` や外部ライブラリを使えば低レベルの処理を書けますが、Odin は allocator の差し替え、ビット単位のレコード、データの配置、C ABI との接続を言語と同梱ライブラリの機能として扱えます。型付きポインタ `^T`、長さを持たない配列ポインタ `[^]T`、表現を読み替える `transmute` などもあり、メモリ上で何が起きるかを自分で決める範囲が広いです。[公式の型と演算の説明](https://odin-lang.org/docs/overview/#advanced-types)

特にメモリ管理と `defer` は、見た目が近いぶん先に押さえておきたい差です。以下の挙動は [実行可能なサンプル](https://github.com/mizchi/zenn/blob/main/_test/odin-guide/practice/practice_test.odin) でも確認しています。

## bit\_field でビット配置を型に書ける

例えば、16 bit のヘッダを次のように定義できます。`Message_Kind` は `Data = 1`、`Ping = 2` を持つ enum です。

```
Header :: bit_field u16 {
	kind:         Message_Kind | 3,
	compressed:   bool         | 1,
	payload_size: u16          | 12,
}
```

`|` の右側がフィールドのビット幅です。`kind` に 3 bit、`compressed` に 1 bit、`payload_size` に 12 bit を割り当てています。アクセスは `header.payload_size` のように普通の struct と同じです。

手書きのマスクやシフトを、意味のあるフィールド名に置き換えられるのがよいです。宣言の順に下位ビットから配置されるので、この例で `Data`、圧縮あり、サイズ 512 を設定すると、基底整数の値は `0x2009` になります。[公式 Bit fields](https://odin-lang.org/docs/overview/#bit-fields)

```
bit 15                         4   3   2       0
    [      payload_size       ] [C] [  kind  ]
                 512             1      1
```

ここで重要なのは、ビット幅を指定しても値の範囲検証にはならないことです。実行時の値 `4096` を 12 bit の `payload_size` に代入すると、切り詰められて `0` になります。符号付き 5 bit フィールドに実行時の値 `31` を入れた例では、読み出すと符号拡張されて `-1` になりました。

外部入力を扱うなら、狭い型へ変換する前に検証する procedure を用意します。

```
make_header :: proc(kind: Message_Kind, compressed: bool, payload_size: int) -> (h: Header, err: Error) {
	if kind != .Data && kind != .Ping {
		return {}, .Unknown_Kind
	}
	if payload_size < 0 || payload_size > 4095 {
		return {}, .Payload_Too_Large
	}
	h = Header{kind = kind, compressed = compressed, payload_size = u16(payload_size)}
	return
}
```

また、整数の中でのビット配置と、通信上のバイト順は分けて考えます。このサンプルでは little endian を仕様として選び、`0x2009` を `09 20` の 2 byte に変換しています。C の bit-field と同じ ABI だと仮定したり、メモリをそのまま送信したりする前提にはしません。

## bit\_set でフラグを集合として扱う

`bit_set` は、enum などの要素の集合をビットで表す型です。例えば、読み取り・書き込み・実行の権限を、整数の定数と手書きのマスクを用意せずに表現できます。

```
Permission :: enum { Read, Write, Execute }
Permissions :: bit_set[Permission; u8]
```

`; u8` は保存に使う整数型の指定です。省略して、必要な幅をコンパイラに選ばせることもできます。要素の追加と削除、包含判定がそのまま集合の操作になります。

```
granted := Permissions{.Read, .Write}
required := Permissions{.Read}
can_read := .Read in granted
has_all := required <= granted
granted -= {.Write}
granted += {.Execute}
```

`.Read in granted` は一つの権限の確認、`required <= granted` は必要な権限がすべて含まれるかの確認です。`+` が和集合、`-` が差集合、`&` が積集合になります。[公式 Bit sets](https://odin-lang.org/docs/overview/#bit-sets)

どちらもコンパクトな表現ですが、`bit_set` は名前の付いたフラグの集合、`bit_field` は幅の異なる値を持つレコードです。権限や機能の有無には `bit_set`、ヘッダの種別やサイズには `bit_field`、と使い分けられます。

## or\_return でエラー伝播を短く

Go でよく書く「呼び出して、失敗していたら返す」という処理を、Odin では次のように書けます。`parse_count` は `(int, Error)` を返し、成功は `Error.None`、失敗はそれ以外の enum 値です。

```
doubled_count :: proc(text: string) -> (result: int, err: Error) {
	n := parse_count(text) or_return
	return n * 2, .None
}
```

`or_return` は、呼び出し結果の最後の値を検査します。エラー値が `nil` 相当でなければ、呼び出し元の最後の戻り値へ設定して早期 return します。成功した場合は末尾のエラー値を除き、残った値を式の結果として使えます。

この例で `"12"` を渡すと `24, .None`、`"bad"` を渡すと `0, .Invalid_Number` が返ります。失敗時の `result` が `0` なのは、この procedure がまだそこに値を設定していないためです。`or_return` が他の戻り値を毎回リセットするわけではありません。[公式 or\_return](https://odin-lang.org/docs/overview/#or_return-operator)

気を付けたい制約として、**複数の値を返す procedure の中で `or_return` を使うには、戻り値すべてに名前が必要**です。上の `(result: int, err: Error)` がそれです。`(int, Error)` とだけ書いた版はコンパイルで拒否されます。

`(値, ok: bool)` の形にも使え、この場合は `false` が失敗です。`or_else` は map lookup や型アサーションなどに既定値を与え、`or_continue` と `or_break` は失敗時のループ制御に使えます。

### 複数のエラー呼び出しをつなぐ

ヘッダの読み取り、payload の切り出し、payload の検証を別の procedure にすると、次のようにつなげられます。

```
parse_packet :: proc(bytes: []u8) -> (packet: Packet, err: Error) {
	header := decode_header(bytes) or_return
	payload := take_payload(bytes[2:], int(header.payload_size)) or_return
	validate_payload(header, payload) or_return
	return Packet{header, payload}, .None
}
```

3 つの呼び出しは同じ `Error` 型を使い、順番に実行されます。先頭の `decode_header` が成功した後だけ `bytes[2:]` を作るため、入力が 2 byte 未満ならそこで return します。`take_payload` は長さ不足、`validate_payload` は空の Data や未対応の圧縮を拒否します。

最後の呼び出しは値を返さず、`Error` 一つだけを返します。この形にも `or_return` を付けられます。戻り値を受け取る処理と、成功したことだけを確認する処理を、同じ流れに並べられます。

`Packet.payload` は元の入力を借用する slice です。エラー処理を短く書けても、入力バッファの寿命は呼び出し元が管理します。[実装と各段階の失敗テスト](https://github.com/mizchi/zenn/blob/main/_test/odin-guide/practice/pipelines_test.odin)

### ファイル、JSON、設定値の検証をつなぐ

異なるライブラリのエラーは、返す可能性のある型を `union` に列挙すると、元の型を保ったまま伝播できます。この例はスレッド数とタイムアウトを JSON ファイルから読み込みます。

```
Settings :: struct {
	threads: int,
	timeout_ms: int,
}

Settings_Validation_Error :: enum { None, Invalid_Threads, Invalid_Timeout }

Load_Error :: union {
	mem.Allocator_Error,
	os.Error,
	json.Unmarshal_Error,
	Settings_Validation_Error,
}
```

`mem` は `core:mem`、`os` は `core:os`、`json` は `core:encoding/json` です。次の `vmem` は `core:mem/virtual` を import した名前です。

```
load_settings :: proc(path: string) -> (settings: Settings, err: Load_Error) {
	arena: vmem.Arena
	vmem.arena_init_growing(&arena) or_return
	defer vmem.arena_destroy(&arena)
	allocator := vmem.arena_allocator(&arena)

	bytes := os.read_entire_file(path, allocator) or_return
	candidate: Settings
	json.unmarshal(bytes, &candidate, allocator=allocator) or_return
	validate_settings(candidate) or_return
	return Settings{threads=candidate.threads, timeout_ms=candidate.timeout_ms}, nil
}
```

arena の初期化、ファイルの読み取り、JSON の変換、値域検証の 4 か所に `or_return` を付けています。どこで失敗しても、その型のエラーが `Load_Error` に格納されて返ります。ファイルがなければ `os.Error`、JSON が壊れていれば `json.Unmarshal_Error`、スレッド数などが範囲外なら `Settings_Validation_Error` です。[core:os](https://pkg.odin-lang.org/core/os/#read_entire_file)、[core:encoding/json](https://pkg.odin-lang.org/core/encoding/json/#unmarshal)

入力例は `{"threads":4,"timeout_ms":1500}`。スレッド数は 1–256、タイムアウトは 1–60,000 ms を許可します。一時データは arena ごと破棄し、結果は整数フィールドをコピーして返すため、破棄後も利用できます。string や slice を設定に追加する場合は、返すデータの保存先も別に決める必要があります。

### bool を返す処理を組み合わせる

`"1280x720"` を幅と高さに分ける処理なら、区切り文字の確認、2 回の整数変換、範囲確認をつなげられます。

```
parse_dimensions :: proc(text: string) -> (width, height: int, ok: bool) {
	left, right := split_dimensions(text) or_return
	w := strconv.parse_int(left, 10) or_return
	h := strconv.parse_int(right, 10) or_return
	validate_dimensions(w, h) or_return
	return w, h, true
}
```

`split_dimensions` は `(string, string, bool)` を返します。`or_return` で最後の bool を検査した後、先頭の 2 値を受け取っています。整数変換に失敗した場合も、幅や高さが 1–16,384 の範囲外の場合も、最終的に `0, 0, false` を返します。

失敗理由を区別しなくてよい入力確認にはこの形が使えます。ユーザーへ具体的なエラーを表示したい場合は、bool の代わりにエラー型を返す設計にします。

### ループ内の失敗と後始末を組み合わせる

複数の文字列を変換して、成功時に配列を返す例です。`parse_count` の失敗は `or_return` で返し、確保の失敗はこの API の `.Allocation_Failed` へ変換しています。

```
// Success transfers the backing allocation to the caller. Failure returns nil.
parse_counts :: proc(texts: []string, allocator := context.allocator) -> (items: [dynamic]int, err: Error) {
	buffer, alloc_err := make([dynamic]int, 0, len(texts), allocator)
	if alloc_err != nil {
		return nil, .Allocation_Failed
	}
	defer if err != nil {
		delete(buffer)
	}
	for text in texts {
		n := parse_count(text) or_return
		_, append_err := append(&buffer, n)
		if append_err != nil {
			return nil, .Allocation_Failed
		}
	}
	return buffer, .None
}
```

`["3", "4"]` なら呼び出し元が所有する配列が返り、`["3", "bad"]` なら作業用バッファを解放してエラーを返します。成功した呼び出し元には `defer delete(counts)` が必要です。早期 return が複数あっても、失敗時の解放は一か所に置けます。

`or_return` は、エラーに文脈を付けたり原因を別の意味へ変換したりする場所でも自動処理してくれるわけではありません。そこはこの確保エラーのように通常の `if` で分岐します。型を保って上へ返す場所には `or_return`、意味を変える場所には明示的な分岐、という使い分けです。

## defer はブロック単位。値を見る時点も違う

Odin の `defer` は、その `defer` を置いたブロックから出るときに、登録の逆順で実行されます。`defer fmt.println(value)` の `value` も、登録時点でコピーされるのではなく、実行時点の値です。[公式 demo の defer](https://github.com/odin-lang/Odin/blob/master/examples/demo/demo.odin#L323-L360)

`value := 10`、`defer fmt.println(value)`、`value = 30` の順に実行したサンプルは、ブロック終了時に `30` を出力しました。ループ内に資源を閉じる `defer` を置けば、その反復のブロックを出るときに閉じられます。

一方で、戻り値は `defer` より前に確定します。名前付き戻り値へ `defer value = 2` と直接代入する例は、この配布版のコンパイラが拒否しました。Go の「defer で名前付き戻り値を調整する」という書き方には読み替えられません。

失敗時だけメモリを解放したいなら、作業中のバッファと返す値を分けます。[実践例の parse\_counts](https://github.com/mizchi/zenn/blob/main/_test/odin-guide/practice/errors.odin) は、`defer if err != nil` で作業用バッファを解放し、成功した場合だけ呼び出し元へ返します。`or_return` と組み合わせても、所有権の移る場所を一か所にできます。

## 面白ポイント: context で allocator を切り替えられる

Odin の `context` は、allocator や logger などを呼び出し先へ暗黙に渡す仕組みです。Go の `context.Context` と同じ役割を想定すると混乱します。通常の Odin calling convention で動く procedure の実行環境に近いものです。[公式 Context system](https://odin-lang.org/docs/overview/#implicit-context-system)

例えば、スコープ内で `context.allocator` を arena の allocator に変更すると、その呼び出し先の既定の確保先も切り替えられます。ライブラリの関数すべてに独自の allocator 引数を追加しなくても、まとめて確保先を指定できるのが便利です。

ただし、arena の寿命を越えて結果を使うなら、呼び出し元が所有する領域へコピーする必要があります。[サンプルの clone\_via\_scratch](https://github.com/mizchi/zenn/blob/main/_test/odin-guide/practice/memory.odin) は、ローカルの arena で作業した後、明示的に渡した `output_allocator` へ文字列を複製して返します。

ここは Odin を使う上での大きな設計判断になります。処理のまとまりごとに arena を持つのか、長く保持する値を個別に確保するのか。誰が解放するかを API の契約に書いておきたいです。

## データ配置と数値処理にも言語の支援がある

`#soa` は、構造体の配列を Structure of Arrays として持つための機能です。次の `Particle` は `x, y, z: f32` を持つ struct です。

```
particles: #soa[2]Particle
particles[0] = Particle{1, 2, 3}
particles[1] = Particle{4, 5, 6}
particles.x[0] += 10
```

`particles[0].x` という要素ごとの記法を使いつつ、`particles.x` で x 成分だけの列にもアクセスできます。メモリ上でも x 成分同士が連続します。

```
通常の配列  x0 y0 z0 | x1 y1 z1
#soa        x0 x1 | y0 y1 | z0 z1
```

特定の成分だけを走査する処理なら、こうした配置を選ぶ意味があります。どちらが速いかはアクセスの仕方次第で、`#soa` を付ければ必ず高速になる、という話ではありません。[公式 SOA data types](https://odin-lang.org/docs/overview/#soa-data-types)

ほかにも、固定長配列には要素ごとの演算と `swizzle` があり、行列は `matrix[行数, 列数]f32` という組み込み型です。配列同士の `a * b` は要素ごとの積、行列同士の `a * b` は行列積になります。ベクトルや行列の演算を使うコードが読みやすく書けます。

## 型と API で押さえておきたい機能

Odin には `enum`、タグ付き `union`、`distinct`、parametric polymorphism もあります。次のような使いどころがあります。

機能

使いどころ

`union {Resize, Input}`

イベントの種類と、それぞれに必要なデータをまとめる

`User_ID :: distinct u64`

同じ整数表現でも、別用途の ID と取り違えないようにする

`proc(value: $T) -> T`

入力型から型パラメータを推論する procedure を書く

`proc{twice_i32, twice_f32}`

オーバーロードの候補を明示的に列挙する

`when`、`#assert`

コンパイル時の分岐と、サイズ・型などの前提の検査

`foreign import`、`foreign`

外部ライブラリの ABI と接続する

`union` には通常 `nil` の空状態もあります。`distinct` は型エイリアスとは違い、基底型の変数をそのまま代入できません。型で区別しておくと、ローレベルな表現を使いながら API の間違いを減らせます。

実際の開発環境では、同梱される `core` と `vendor` のライブラリコレクションも入口になります。公式のパッケージマネージャはなく、依存を vendoring してバージョンを固定する方針です。[公式 FAQ の依存管理](https://odin-lang.org/docs/faq/#is-there-an-official-odin-package-manager)

## Go より自由で責任が重い。それが嬉しい

メモリを構文で縛るRustと違い、プログラマの自由度と責務が大きいです。パフォーマンスチューニングして Go に限界を感じたら一度手を出してみるのが良さそう、と感じました。

エラー処理が冗長な部分が or\_return でショートハンドできるのが、 ポストRust 時代らしいモダンさも感じます。

Cと同じ表現力を、高水準にやるという点では Zig と似たような印象を受けました。 Mitchel Hashimoto 氏が選ぶ使う言語としては、妙な一貫性があるように感じます