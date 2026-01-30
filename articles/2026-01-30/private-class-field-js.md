---
title: "Private Class Field の導入に伴う JS の構文拡張"
source: "https://blog.jxck.io/entries/2019-03-14/private-class-field.html"
publishedDate: "2019-03-14"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

ECMAScript の Private Class Field の仕様策定と各ブラウザの実装が進んでいる。

これにより、従来の JS にはなかった Class の Private フィールドが使えるようになる。

提案されている構文や、挙動について解説する。

## [Class Field Declaration](#class-field-declaration)

まず前提として、現状の Class の フィールドはコンストラクタで定義する必要がある。

例えば count フィールドを持つ Counter クラスを定義した場合、以下のようになる。

```
class Counter {
  constructor() {
    this.count = 0
  }
  increment() {
    this.count ++
  }
  display() {
    console.log(this.count)
  }
}

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display() // 3
console.log(c.count) // 3
```

ここでコンストラクタを介さず、フィールドを定義し初期化する構文が提案されている。

[tc39/proposal-class-fields](https://github.com/tc39/proposal-class-fields)

これが実装されると、以下のように書くことができる。

```
class Counter {
  count = 0
  increment() {
    this.count ++
  }
  display() {
    console.log(this.count)
  }
}
```

ここまでを前提として話を進める。

## [Private Field](#private-field)

JavaScript に Class 構文が導入されたのはかなり最近のことだ。

しかし、初期の提案に全てを詰め込むことはせず、いくつかの機能(前述の class field/static/private etc)は、Future Work になっていた。

中でも Private フィールドについては、他のクラスベースオブジェクト指向の言語では標準であることが多く、これを入れるために議論が行われた。

現在は、先の class-fields の仕様にマージされ、先に結論を言うと、現状の仕様は以下のようになり、ブラウザの実装が進みつつある。

[tc39/proposal-class-fields: Orthogonally-informed combination of public and private fields proposals](https://github.com/tc39/proposal-class-fields)

```
class Counter {
  // private field
  #count = 0
  increment() {
    this.#count ++
  }
  display() {
    console.log(this.#count)
  }
  equals(other) {
    return this.#count === other.#count
  }
}

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display() // 3
c.equals(new Counter()) // false
console.log(c.#count) // SyntaxError
```

挙動としては見ての通りだ。

-   Private フィールドには `#` が接頭辞として付く
-   クラス外からはアクセスできない
-   同じクラス内からはアクセスできる

## [なぜこの構文になったのか](#なぜこの構文になったのか)

かなり珍しい構文に落ち着いたこともあり、どうして `#` なのかは FAQ であり、本家のリポジトリにおおよそ書かれている。

[proposal-class-fields/PRIVATE\_SYNTAX\_FAQ.md](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md)

ここでは、JS における Private がどう挙動すべきかを含めた議論の過程を見ていく。

## [なぜ Private にするのか](#なぜ-private-にするのか)

Private なフィールドを持つ理由は、意図しないものを外部に公開しないというモチベーションがまずある。

例えば、これまで Class には Private がなかったため、公開を意図しないフィールドには `_` をつけるなどの運用でカバーされてきた。

```
class Counter {
  constructor() {
    this._count = 0
  }
  increment() {
    this._count ++
  }
  display() {
    console.log(this._count)
  }
}
const c = new Counter()
```

あくまで意図を示しているだけで、実際にはアクセスできてしまう。

```
console.log(c._count)
```

結果、例えばライブラリの中の意図しない部分が開発者によってアクセスされ、実装を変更すると互換性が壊れるといった問題がしばしば起こっていた。

しかし、別の実装方法を用いると、Private に近いことは実現が可能だ。

## [Symbol を用いた Soft Private](#symbol-を用いた-soft-private)

Symbol を用いると以下のように書くこともできる。

```
const Counter = (function() {
  const count = Symbol("count");
  return class {
    constructor() {
      this[count] = 0;
    }
    increment() {
      this[count] ++
    }
    display() {
      console.log(this[count])
    }
  }
})()
const c = new Counter()
```

この場合は、シンボルを保持していなければアクセスできない。

しかし、このシンボル自体は `Object.getOwnPropertySymbols()` で取ることができる。

```
console.log(c[Object.getOwnPropertySymbols(c).pop()])
```

これは、通常の(パブリックな)プロパティと同等のアクセス手段は絶っただけで、そうしたプロパティが存在することを知ることが可能であり、かつアクセスする方法も残されている。

手段は違えど、Reflection などで Private にアクセスできる言語は他にもあり、それと似ている。

このような挙動を _Soft Private_ と呼ぶ。

## [WeakMap を用いた Hard Private](#weakmap-を用いた-hard-private)

WeakMap を用いれば、アクセス方法を断つことも可能だ。

```
const Counter = (function() {
  const privates = new WeakMap();
  return class {
    constructor() {
      const count = 0
      privates.set(this, {count})
    }
    increment() {
      const count = privates.get(this).count ++
      privates.set(this, {count})
    }
    display() {
      console.log(privates.get(this).count)
    }
  }
})()

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display()
console.log(c.count) // undefined
```

この場合、WeakMap はクロージャの中にあるため、スコープの外からはアクセスできない。

また、外からは Counter オブジェクトが内部でどのような Private フィールドを持っているかを知ることができない。

WeakMap は内部的には、[オブジェクトそのものに値を紐づけるような実装が可能](https://mozaic.fm/episodes/19/es7-sideshow.html) であるため、まさしくこの用途にあっている。

このような挙動を _Hard Private_ と呼ぶ。

## [Soft or Hard Private](#soft-or-hard-private)

ECMAScript が Private フィールドを定義する上で、目指すのは Soft/Hard Private どちらであるかが議論となった。

[Hard-private vs soft-private #33](https://github.com/tc39/proposal-private-fields/issues/33)

例えばライブラリにおいて、作者が意図しないアクセスを完全に断つためには Hard Private が必要になる。

一方、テストなどの用途に限ってアクセスする余地を残すために、Soft Private を支持する意見もあった。

もし Soft Private で良いのであれば、Symbol や [Decorator](https://github.com/tc39/proposal-private-fields/blob/master/DECORATORS.md) などである程度実現可能であり、構文を拡張してまでやる必要があまりない。

結果としては、WeakMap で実現したような挙動を、構文レベルでサポートすることにより、より手軽に Hard Private を実現することがこの仕様のゴールとなった。

具体的に求められる挙動は [以下](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md#what-do-you-mean-by-encapsulation--hard-private) のようになる。

1.  Private フィールドにアクセスする方法が一切ない
    1.  Reflection など、迂回する方法も提供しない
    2.  それがテストであっても例外は無し
2.  Private フィールドがあることが外からわからない
    1.  getOwnPropertyNames などで取得する方法も提供しない
    2.  Private フィールドと同じ Public フィールドが定義できる、これをエラーにすると存在がわかる
    3.  継承した子クラスや親クラスからもアクセスできない
    4.  ただし同じクラスの別のインスタンスではアクセスが可能
3.  以上を一定のパフォーマンスで実装できる
    1.  Private へのアクセスが遅くない
    2.  Public なアクセスや Object の生成など既存の挙動に影響が極力無い

これを満たす構文を定義することになる。

## [構文と動的言語](#構文と動的言語)

まず思いつくのが、JS がこの時のために予約しており、多くの言語が採用している `private` キーワードである。

```
class Counter {
  private count = 0
}
```

これで良ければ何の問題もなかったが、これではいくつか問題がある。

まず、以下のようなコードを考える。

もし other も Counter であれば、その Private フィールドを返す必要があるが、もし other が別のクラスだったら、単に public なフィールドを返す必要がある。

```
class Counter {
  private count = 0
  equals(other) {
    // if (other の型が Counter か) {
    //   private count を返す
    // } else {
    //   public count を返す
    // }
    return this.count === other.count
  }
}
```

これは、other がどの型であっても、必ず一度は確認処理が入ることを意味する。

すると、Private を使ってない既存のコードを含めて、全体的にオーバーヘッドが増えそうなことが、想像に難くないだろう。

また、以下のように Private と同じ名前の public なフィールドが定義できてしまうことは、コード自体の誤認をおこしやすい。

```
class Counter {
  private count = 0
  increment() {
    this.count += 1
  }
}
c = new Counter()
c.count = 10 // 実際には public
```

Java などの言語では、コンパイルの段階で型が何であるかといった判別がなされるため、実行する前にエラーにするといった処理ができる。

しかし JS はコンパイルが無く、動的に任意のプロパティが定義できる。

したがって、仮に定義の段階で `private` というキーワードが使えたとしても、アクセスする部分で毎回判定が必要になってしまい、実装が複雑になってしまう。

残念ながら、将来のために残されていた `private` という予約語は、今後も予約されたまま使われることはなさそうだ。

仕様は 3~4 年議論されており、おおよそ出尽くしたので、この記法を覆す提案を出すのは難しいだろう。

## [Syntax の導入](#syntax-の導入)

Private フィールドを導入しつつ、既存のコードに影響を与えないパフォーマンスやセマンティクスを実現する方法として、構文の拡張が考えられる。

そこで、結果として `#` を prefix としたこの構文になった。

```
class Counter {
  #count = 0
  increment() {
    this.#count ++
  }
  display() {
    console.log(this.#count)
  }
  equals(other) {
    console.log(other.#count)
    return this.#count == other.#count
  }
}

const c = new Counter()
c.increment()
c.display() // 1
console.log(c.equals(new Counter())) // false
console.log(c.#count) // syntax error
```

この構文の特徴は、JS では最後の `c.#count` という記法が許可されず Syntax Error になるということだ。

これは、外から Private フィールドにアクセスする方法が構文レベルでエラーになるため、絶対にできないということを意味する。

そして、クラス内部では `#count` と、必ず `#` をつけてフィールドを定義させることにより、Public なフィールドと名前がかぶることがないため、`c.count` が定義されてもなんの問題もなくなる。

結果として、外から Private フィールドがあるかどうかを知ることは、ソースを構文解析でもしない限りできなくなる。

また `this.#count` でアクセスすれば、少なくとも Private フィールドにアクセスしようとしていること自体は自明なため、オーバーヘッドも減らせる。

まとめると、_従来エラーだった構文を導入して Private の定義およびアクセスが自明になるように拡張した_ 結果できたのがこの構文ということになる。

## [記号の選定](#記号の選定)

実際には、上述の条件が満たせれば、記号自体はなんでもよい。

しかし、UTF8 で任意の文字を許容するといったことをしなければ、ASCII で残っている文字は少ない。

すでに使われている演算子を除いた候補の議論も FAQ にまとまっている。

[Why was the sigil # chosen, among all the Unicode code points?](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md#why-was-the-sigil--chosen-among-all-the-unicode-code-points)

-   `@`: 一番良さそうだが Decorator が既に利用している。Decorator との入れ替えも検討したが、トランスパイラで先走って使っているユーザも多く諦めた。
-   `_`: 既に変数に付けられているコードが多い。
-   `%`: 使えそうで使えない。

`%` は、中置演算子としては使われるが接頭辞には使われてないので、使えそうではあった。

しかし、以下のようなコードを考える。

```
class Counter {
  %x;
  method() {
    calculate().my().value()
    %x.print()
  }
}
```

JS エンジンはセミコロンが省略された場合、それを補ってコードを解釈をする。これを ASI(Auto Semicolon Insertion) という。

上の例は、セミコロンが `value()` の後ろに補われるように見えて、実際は `print()` の後だけに補われ、`%x` の `%` は前の行との mod 演算と解釈される。

今更セミコロンを必須にすることはできないので、この目的で `%` を使うことはできない。こうした問題を ASI Hazard と言う。

結果として、残っている記号が `#` しかなかった。それ以外選択肢が無かったため、これが採用されたのだ。

## [Short Hand](#short-hand)

現在、以下のコードで `this.#count` の `this.` を省略することはできない。

```
class Counter {
  #count = 0
  increment() {
    this.#count ++
  }
}
```

将来的にはこれは省略するショートハンドを定義する余地は残っている。

実現すればこう書けるだろう。

```
class Counter {
  #count = 0
  increment() {
    #count ++
  }
}
```

ちなみに、この余地を残すために却下された提案として、`#` の前にドットを置かない記法もあった。

[Why not use obj#prop instead obj.#prop ? #39](https://github.com/tc39/proposal-private-fields/issues/39)

これがあれば `this#count` や `c#count` と書ける。

```
class X {
  #y
  z() {
    w()
    this#y()
  }
}
```

しかし、これを許すと、ショートハンドが入った際に問題が出る。

```
class X {
  #y
  z() {
    w()
    #y()
  }
}
```

もともと `w();this#y()` だったものが `w()#y()` になり、`w()` の結果への Private Access になってしまい、これも ASI Hazard となる。

## [Dynamic Access](#dynamic-access)

`this.#x` を `this.["#x"]` と書くことはできない。

まず、動的なアクセスの場合は `["#x"]` は今の JS でも valid だ。

```
o = {}
o["#x"] = 10
o // {"#x": 10}
```

これは既存のコードでもあり得るが、アクセス方法も `o["#x"]` しかなく、`.#x` でアクセスするコードは既存にはないので両方を許さなければ競合はしない。

また、動的に Private にアクセスできるとうことは、以下のようなことができてしまうことを意味する。

```
class Dict {
  #secret = 'secret values'
  add(key, value) {
    this[key] = value;
  }
  get(key) {
    return this[key];
  }
}

const dict = new Dict()
dict.get('#secret'); // secret values
```

これでは意味がない。

## [継承時の挙動](#継承時の挙動)

Hard Private なので親クラス、子クラスからもアクセスできない。

例えば `super.#x` といったアクセスはできないため、以下の Point3D の `equals()` は前半を親に移譲することになる。

```
class Point2D {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  equals(other) {
    return this.#x === other.#x && this.#y === other.#y;
  }
}

class Point3D extends Point2D {
  #z;
  constructor(x, y, z) {
    super(x, y)
    this.#z = z
  }

  equals(other) {
    // return  this.#x === other.#x &&  this.#y === other.#y && this.#z === other.#z; // SyntaxError
    // return super.#x === other.#x && super.#y === other.#y && this.#z === other.#z; // SyntaxError
    return super.equals(other) && this.#z === other.#z;
  }
}

const p1 = new Point2D(10, 20, 30)
const p2 = new Point3D(10, 20, 30)
console.log(p1.equals(p2))
console.log(p1.display())
```

## [今後の構文拡張](#今後の構文拡張)

ここまでの議論からもわかるように、JavaScript を構文的に拡張する上で使える「記号」はほぼ枯渇している。

Pipeline Operator のように複数の記号を組み合わせていくか、Unicode 全体まで範囲を広げるといった方向しかない。

そこで、今後の拡張は Decorator ベースでやっていくのが良いのではないかと言う提案が出ている。

[littledan/proposal-reserved-decorator-like-syntax: Reserved decorator-like syntax as an extension point for future JavaScript syntax](https://github.com/littledan/proposal-reserved-decorator-like-syntax)

具体的には、以下のように今は書けない `[decorator]` とカッコを用いた構文を今のうちに予約しておくというものだ。

```
@[typed]
class Point {
  @[type(float64)]
  #x;
  @[type(float64)]
  #y;
}
```

構文拡張をベースとした ES の進化もそろそろ終焉を迎え、今後は Decorator まみれな JS になっていく可能性がありそうだ。

## [DEMO](#demo)

動作するデモを以下に用意した。

-   [https://labs.jxck.io/private-class-field/](https://labs.jxck.io/private-class-field/)