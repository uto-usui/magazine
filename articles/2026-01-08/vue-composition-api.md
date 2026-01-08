---
title: "コンポーネントを小さく・きれいに設計しよう。Vue Composition APIを活用したコンポーネント分割術"
source: "https://ics.media/entry/210929/"
publishedDate: "2021-09-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

Vue.jsを使った開発でよく悩まされるのがコンポーネントの肥大化です。複雑なアプリケーションになると、1つのコンポーネントが`<script>`ブロックだけで数百行…なんてこともめずらしくないでしょう。従来、Vue 2までの標準的な書き方では、UIとしてのコンポーネントの細分化はできてもロジックの分割や整理には限界がありました。しかし、Vue 3のComposition APIを活用すると、はるかに柔軟な整理・分割が可能です。

「Composition APIは難しそうだからまだ使っていない」という方、あるいは「導入はしているけどイマイチメリットがわからない」という方は、この機会にぜひComposition APIを活用したコンポーネントの整理術を試してみてはいかがでしょうか？

### なぜ、Vueのコンポーネントは肥大化するのか？

簡単な例を見てみましょう。下のサンプルはミニマムなアナログ時計のコンポーネントです。1つのコンポーネント・1つのファイルで完結しており、見通しも悪くないように見えます。しかし、このコンポーネントにはすでに肥大化の兆候が見えはじめています。

▼ アナログ時計のコンポーネント（`<style>`ブロックは省略）

```
<template>
  <div class="FatClock">
    <div class="clock">
      <div class="hand hour" :style="{ transform: `rotate(${angles.hour}deg)` }"></div>
      <div class="hand minute" :style="{ transform: `rotate(${angles.minute}deg)` }"></div>
      <div class="hand second" :style="{ transform: `rotate(${angles.second}deg)` }"></div>
      <div class="timeText">{{ timeText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: new Date(),
      timer: 0,
    }
  },
  computed: {
    timeText() {
      const d = this.current
      const [h, m, s] = [d.getHours(), d.getMinutes(), d.getSeconds()]
      return [h, m, s].map((num) => String(num).padStart(2, '0')).join(':')
    },
    angles() {
      const d = this.current
      const [h, m, s] = [d.getHours(), d.getMinutes(), d.getSeconds()]
      return {
        hour: (((h % 12) + m / 60) / 12) * 360 - 90,
        minute: ((m + s / 60) / 60) * 360 - 90,
        second: (s / 60) * 360 - 90,
      }
    },
  },
  methods: {
    updateTime() {
      this.current = new Date()
    },
  },
  mounted() {
    this.timer = window.setInterval(() => this.updateTime(), 100)
  },
  unmounted() {
    window.clearInterval(this.timer)
  },
}
</script>
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/fat)
-   [コードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/01_fatComponent/FatClock.vue)

もしこのアナログ時計にアラームや時報の機能を追加したらどうなるでしょうか？　おそらく`<template>`ブロックはさほど増えませんが、`<script>`ブロックにさまざまな処理が追加されるでしょう。

ウェブページのコンポーネント設計というと、目に見えるUI要素の分割ばかりを考えがちです。しかし、今回のケースではアナログ時計の分針と秒針を別々のコンポーネントに切り出しても、あまり効果はなさそうです。アプリケーションの設計においては、**目に見えるものだけではなく、その裏にある情報や振る舞いにも着目してコンポーネントを整理・分割する必要**があるのです。

![簡潔に見えるコンポーネントにも複数の関心や責務が混在している](https://ics.media/entry/210929/images/210929_fat_component.png)

Vueを使った開発は、見た目を基準にしたコンポーネントの分割がとても簡単です。一方で、ひとたびコンポーネントを作るとその見た目に関連するあらゆる情報やロジックをひとつのコンポーネントに詰め込みがちです。目に見えない部分を意識して整理していかないと、あっという間にコンポーネントが肥大化してしまうのです。

### 1\. コンポーネントの関心ごとに着目してロジックを分割する

ここからは実際に、簡単な例をみながらコンポーネントの整理・分割のポイントを考えていきましょう。以降のサンプルはすべてComposition API + TypeScriptで書いていきます。TypeScriptといっても難しい書き方は出てきません。ほとんどはJavaScriptとして読めるので安心してください。

#### 基本の例：「FizzBuzzコンポーネント」のロジックを分離する

最初のサンプルはFizzBuzzを表示するコンポーネントです。「カウントアップ」ボタンを押すたびにカウントが増え、対応するFizzBuzzの答えが表示されます。

▼ FizzBuzzコンポーネント（`<script>`ブロックのみ・分割前）

```
import { defineComponent, computed, ref } from 'vue'
export default defineComponent({
  setup() {
    const count = ref(1)
    const result = computed(() => {
      if (count.value % 15 === 0) {
        return 'FizzBuzz'
      }
      if (count.value % 5 === 0) {
        return 'Buzz'
      }
      if (count.value % 3 === 0) {
        return 'Fizz'
      }
      return String(count.value)
    })
    const up = () => {
      count.value++
    }
    const reset = () => {
      count.value = 1
    }
    return { count, result, up, reset }
  },
})
```

![FizzBuzz動作イメージ](https://ics.media/entry/210929/images/210929_fizzbuzz.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/fizzbuzz)
-   [コードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/02_fizzBuzz/FizzBuzzViewBefore.vue)

このコンポーネントには大きく分けて次の2種類のロジックが含まれています。

1.  ボタンのイベントハンドリングや結果の表示といった入出力処理
2.  カウントとFizzBuzzの保持と計算

Vueのコンポーネントとしては、1は明らかにコンポーネント自身の責務ですが、2はちょっと微妙です。この部分を分割してみましょう。

単に「FizzBuzzの計算」だけを切り出しても良いのですが、Composition APIであれば値の保持も含めた「FizzBuzzの機能」をまるごと別ファイルに分割できます。

▼ FizzBuzzの機能を「useFizzBuzz」関数として切り出す

```
import { computed, ref } from 'vue'

export const useFizzBuzz = () => {
  const count = ref(1)
  const result = computed(() => {
    if (count.value % 15 === 0) {
      return 'FizzBuzz'
    }
    if (count.value % 5 === 0) {
      return 'Buzz'
    }
    if (count.value % 3 === 0) {
      return 'Fizz'
    }
    return String(count.value)
  })

  return { count, result }
}
```

▼ コンポーネントから「useFizzBuzz」機能を利用する（`<script>`ブロックのみ）

```
import { defineComponent } from 'vue'
import { useFizzBuzz } from './useFizzBuzz'
export default defineComponent({
  setup() {
    // 🌟 FizzBuzzの機能を利用
    const { count, result } = useFizzBuzz()
    const up = () => {
      count.value++
    }
    const reset = () => {
      count.value = 1
    }
    return { count, result, up, reset }
  },
})
```

-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/02_fizzBuzz/FizzBuzzViewAfter.vue)

「FizzBuzzの機能」を分離したことで、このコンポーネントはもはや「FizzBuzzとは何か」を知る必要がなくなりました。このように分割した処理を**コンポジション関数（Composition Function・Composable Function）と呼びます**。コンポジション関数はどのような形式・名前でも構いませんが、慣例として`useXXX`という関数名で定義されることが多いようです。

名前はちょっと難しそうですが、中身はほとんど元のコンポーネントの一部を切り出しただけです。従来のOptions API記法では`computed`や`data`を書くことのできる場所が決まっていたため、自由にロジックを分割することが困難でした。Composition APIであれば、`computed()`関数や`ref()`関数を使うことで「普通のJavaScriptとして」どこにでも自由に書くことができます。これが、Composition APIを利用する大きなメリットです。

#### 実用的な例：郵便番号検索のコンポーネントを分割する

もう少し実用的な例も見てみましょう。この例では、郵便番号を入力するとウェブ上の公開APIを利用して対応する住所の一覧を表示します。

![郵便番号検索動作イメージ](https://ics.media/entry/210929/images/210929_postal.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/postal)

これも分割の考え方は同じです。郵便番号検索のUIを担うコンポーネントにとって、**郵便番号から住所を得る手続きは本質的な関心ごとではありません**。`usePostalSearch`というコンポジション関数を作ってロジックを分離しましょう。

▼ 郵便番号→住所の変換（検索）機能を`usePostalSearch`関数に切り出す

```
import { computed, ref, watch } from 'vue'
import { postalApi } from './postalApi'

export const usePostalSearch = () => {
  // 入力：郵便番号
  const postalCode = ref('')
  // 出力：住所一覧
  const addresses = ref<string[]>([])
  // 受信待ちのリクエスト数
  const waitingCount = ref(0)
  // 受信待ち状態かどうか？
  const isWaiting = computed(() => waitingCount.value > 0)

  // 入力の変更を監視する
  watch(postalCode, async () => {
    waitingCount.value++
    // 結果をクリアして検索APIを実行
    addresses.value.length = 0
    addresses.value.push(...(await postalApi(postalCode.value)))
    waitingCount.value--
  })

  return { postalCode, addresses, isWaiting }
}
```

基本的な構造は`useFizzBuzz`コンポジション関数と同じです。郵便番号検索の場合、FizzBuzzと異なり非同期のリクエスト処理が入るため、`watch`を使用しています。

利用するコンポーネント側は`usePostalSearch`コンポジション関数を呼び足すだけです。コンポーネントに残っているロジックは状態を元に表示用メッセージを生成する処理だけになりました。

▼ `usePostalSearch`コンポジション関数を利用する（`<script>`ブロックのみ）

```
import { computed, defineComponent } from 'vue'
import { usePostalSearch } from './usePostalSearch'
export default defineComponent({
  setup() {
    // 🌟 「郵便番号→住所の検索」コンポジション関数を使う
    const { postalCode, addresses, isWaiting } = usePostalSearch()

    // 状態を元にメッセージを生成
    const resultMessage = computed(() => {/* 省略 */})

    return {
      postalCode, // 郵便番号入力欄にv-modelでバインドする
      addresses,
      isWaiting,
      resultMessage,
    }
  },
})
```

-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/03_postalSearch/PostalSearch.vue)

### 2\. 本質的ではない定型処理や面倒な手続きを分割する

上記のFizzBuzzや郵便番号検索で切り出したコンポジション関数は、UI表示のコンポーネントにとっては本質的な関心ごとではありませんが、アプリケーションとしてはむしろ重要で本質的な機能でした。

しかし、コンポーネントを肥大化させるコードには**そもそもアプリケーションの本質的な関心ごとではない処理**も多く存在します。本質的ではない定型処理や、面倒で忘れやすい手続きをコンポジション関数に切り出す例を見てみましょう。

#### 基本の例：タイマーやイベントハンドラーのクリア処理

次のサンプルはごくシンプルな時刻表示を行うコンポーネントです。時刻を更新するために`setInterval`関数でタイマーをセットしています。

▼ 時刻表示コンポーネント（`<script>`ブロックのみ・分割前）

```
export default defineComponent({
  setup() {
    /** 現在時刻 */
    const date = ref(new Date())

    /** 現在時刻の文字列表現（表示用） */
    const timeText = computed(() => {/* 省略 */})
    /** 現在時刻を更新する */
    const updateDate = () => {
      date.value = new Date()
    }

    // 更新用タイマーをセット
    let timer = window.setInterval(updateDate, 100)
    // 更新用タイマーを解除
    onBeforeUnmount(() => {
      window.clearInterval(timer)
    })

    return { timeText }
  },
})
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/time)
-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/04_time/TimeViewBefore.vue)

忘れがちですが、一度セットしたタイマーはコンポーネントを破棄する際に`onBeforeUnmount`などのライフサイクルフックで解除する必要があります。タイマー以外にも、`window.addEventListener`関数でイベントハンドラーをセットした場合も同様です。

この`onBeforeUnmount`の処理は「手続き上やらなくてはいけないのでやっている」だけで、本質的な関心ごとからはかなり遠い存在です。こうした定型的な手続きを切り出すのにも、コンポジション関数は有効です。分割したコードを見てみましょう。

▼ `useInterval`コンポジション関数

```
import { onBeforeUnmount } from 'vue'

export const useInterval = (f: () => void, ms: number) => {
  /** タイマーID */
  const timer = window.setInterval(f, ms)

  /** 解除処理 */
  const clear = () => {
    window.clearInterval(timer)
  }

  // コンポーネント破棄時に解除
  onBeforeUnmount(clear)

  // 任意のタイミングで止められるように、clear関数を返却
  return { clear }
}
```

タイマーIDの保持やコンポーネント破棄時のクリア処理といった形式的な手続きをコンポジション関数に追い出しました。利用するコンポーネント側は定期的に行う処理の中身だけを考えれば良くなります。

▼ `useInterval`を利用するコンポーネント（`<script>`ブロックのみ）

```
import { computed, defineComponent, ref } from 'vue'
import { useInterval } from './useInterval'
export default defineComponent({
  setup() {
    /** 現在時刻 */
    const date = ref(new Date())

    /** 現在時刻の文字列表現（表示用） */
    const timeText = computed(() => {/* 省略 */})

    /** 🌟 定期的に現在時刻を更新する */
    useInterval(() => {
      date.value = new Date()
    }, 100)

    return { timeText }
  },
})
```

-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/04_time/TimeViewAfter.vue)

このような定型処理は再利用性も高いので、積極的に分割していくと良いでしょう。

#### 応用例： Intersection Observerを使う

もう少し複雑で実践的な例も見てみましょう。次の例は要素の重なりを検知するIntersection Observerを使い、スクロールにあわせて背景色を変えるサンプルです。

![スクロール動作イメージ](https://ics.media/entry/210929/images/210929_scroll.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/scroll)

Intersection ObserverはInternet Explorer以外の主要ブラウザーで利用できるJavaScriptのAPIです。具体的な使い方は以前の記事[『JSでのスクロール連動エフェクトにはIntersection Observerが便利』](https://ics.media/entry/190902/)で紹介していますが、便利で強力な反面使い方は少々複雑です。

こうした複雑なAPIも、コンポジション関数を使うことで綺麗に分割ができます。今回のサンプルの場合、**アプリケーションとしての関心ごとは「今表示領域に入っている要素はどれか？」ということだけ**です。

交差の検出と、交差状態にある要素を保持する処理を`useIntersection`コンポジション関数に分割したものが以下の例です。複雑な実装を隠蔽したことでさきほどの`useInterval`と同じくらい簡単に利用できていることがわかります。

▼ `useIntersection`を利用するコンポーネント（`<script>`ブロックのみ）

```
import { computed, defineComponent, ref } from 'vue'
import { useIntersection } from './useIntersection'
export default defineComponent({
  setup() {
    /** 交差を検出する領域の要素 */
    const outerRef = ref<HTMLElement>()
    /** 交差を検出する子要素1 */
    const targetRef1 = ref<HTMLElement>()
    /** 交差を検出する子要素2 */
    const targetRef2 = ref<HTMLElement>()

    // 🌟 交差している要素をリアクティブに取得
    const { intersected } = useIntersection(outerRef, [targetRef1, targetRef2])
    /** 現在の色： 「交差している要素」があれば、その背景色を「現在の色」にする */
    const currentColor = computed(() => intersected.value?.style.backgroundColor ?? '')

    return { currentColor, outerRef, targetRef1, targetRef2 }
  },
})
```

-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/05_scroll/ScrollView.vue)
-   [useIntersectionコンポジション関数のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/05_scroll/useIntersection.ts)

#### 注意：過度の汎用化には要注意！　必要に応じて専用ライブラリも使おう

この章で紹介した`useInterval`のように、コンポジション関数は上手に作ると再利用性が高く汎用的な部品を作れます。しかし、過度の汎用化や抽象化は危険です。

Intersection Observerを直接使ったことのある方であれば、2つ目の例として紹介した`useIntersection`コンポジション関数は、本来のAPIの機能のごく一部しか利用できていないことに気づくかもしれません。どのようなケースでも汎用的に利用できる`useIntersection`を作ることも可能ですが、コードが複雑になり使い方も煩雑になるでしょう。

汎用的で再利用性の高いロジックは魅力的に見えますが、やりすぎるとかえって複雑でバグの多いプログラムを生み出してしまいます。**開発しているアプリケーションの目的や関心ごとにあわせて、必要な範囲での汎用化に留める**ことが大切です。

また、本当に有用で汎用的な処理であれば、すでに誰かが同じものを作っているはずです。メジャーなライブラリとしては、[VueUse](https://vueuse.org/)をチェックするのが良いでしょう。VueUseでは、この記事で紹介している`useInterval`や`useIntersection`をより汎用化したコンポジション関数も提供されています。本当に汎用的な部品が必要なのであれば、こうしたライブラリの導入を検討しても良いでしょう。

### 3\. Vuexの複雑な処理をまとめる

Vuexを使った複雑なアプリケーションでは、コンポーネントのロジックの大部分がストアから読み出した値の変換や表示、あるいはアクションをディスパッチするための手続きで占められることがよくあります。

次のサンプルは`length`と`angle`という2つの`state`をもつストアに対して、複数のコンポーネントで読み書きを行う例です。あるひとつのテキストボックスの値を変更すると、他の単位のテキストボックスも連動して値が変わります。

![ストア操作の動作イメージ](https://ics.media/entry/210929/images/210929_store.gif)

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/210929_vue_composition/#/store)

ストアの構造は以下のようにしました。`mutations`に加えて`actions`も用意していますが、中身は`state`の値を書き換えることだけです。

```
export const store = createStore<State>({
  state: {
    length: 300,
    angle: 60,
  },
  mutations: {
    setLength(state, value: number) {/*略*/},
    setAngle(state, value: number) {/*略*/},
  },
  actions: {
    changeLength({ commit, state }, value: number) {/*略*/},
    changeAngle({ commit, state }, value: number) {/*略*/},
  },
})
```

-   [ストア全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/store.ts)

では、このストアに対して複数の単位で読み書きを行うにはどうするのが良いでしょうか？　Vuexの基本的なアプローチでは以下のどちらかになることが多いでしょう。

1.  ストアを拡張して、単位ごとの`getter`や単位変換機能をもった`action`を実装する
2.  コンポーネント側で`computed`や`method`を使ってストアの入出力前後で単位変換を行う

1のアプローチならコンポーネント側は綺麗に保てますが、ストアに保持する値や表示のバリエーションが増えるたびにストア側のコードが肥大化します。2の場合は逆です。上記のどちらのアプローチも避けたい場合、Composition APIを使ってストアとの入出力をコンポジション関数に追い出すアプローチが良いかもしれません。コードを見てみましょう。

▼ ストアの`length`を指定した単位で読み書きするコンポジション関数

```

import { computed, Ref } from 'vue'
import { useStore } from 'vuex'
import { State } from '../../store'

/** Px/Inchの値。この例では72dpi固定とします */
const DPI = 72
/** Inch→mmの換算値 */
const INCH2MM = 25.4

export const useStoreLength = (unit: Ref<'px' | 'inch' | 'mm'>) => {
  // ストアを利用する（useStoreはVuexが提供しているコンポジション関数）
  const store = useStore<State>()

  // ストアとの入出力をcomputedで実装
  const length = computed({
    // ストアの値をpxから指定された単位に変換・四捨五入してして返す
    get() {
      const px = store.state.length
      if (unit.value === 'inch') return Math.round((px / DPI) * 10) / 10
      if (unit.value === 'mm') return Math.round((px / DPI) * INCH2MM)
      return Number.isFinite(px) ? Math.round(px) : 0
    },
    // 値の変更を指定された単位からpxに変換して、ストアの更新アクションをディスパッチ
    set(v: number) {
      let px = v
      if (unit.value === 'inch') px = v * DPI
      if (unit.value === 'mm') px = (v / INCH2MM) * DPI
      store.dispatch('changeLength', px)
    },
  })

  // 利用側コンポーネントにはただのcomputed変数として見せる
  return length
}
```

このコンポジション関数を使って、`mm`単位で`length`を読み書きするコンポーネントは以下のようになるでしょう。

▼ ストアの`length`を`mm`単位で読み書きする例

```
<template>
  <div class="storeLengthView">
    <input type="text" v-model.number="length" />mm
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStoreLength } from './useStoreLength'

export default defineComponent({
  setup() {
    const unit = ref('mm')
    const length = useStoreLength(unit)
    return { length }
  },
})
</script>
```

-   [コンポーネント全体のコードを確認する](https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/06_store/StoreLength.vue) ※ サンプルでは単位をpropsで受け取れるようにしています

コンポジション関数を経由したストアの読み書きは、コンポーネントが依存している状態（`state`）を明示するのにも有効です。コンポーネントで直接`useStore()`を使うと、そのコンポーネント内ではストアのあらゆる値を利用できてしまいます。これは便利な反面、どのコンポーネントがストアのどの変数に依存しているか管理するのが難しくなることを意味します。

ストアに直接アクセスせず`useStoreLength`コンポジション関数を使っていれば、このコンポーネントは`length`だけに関心があることを明示できます。プロジェクトの開発スタイルやルールによっても変わりますが、上手に使えばVuexで起こりがちな混乱を避けるのに有効でしょう。

### コンポーネントを小さく・きれいに保って、開発速度をキープしよう

この記事では、①情報や振る舞いの関心ごとに着目したロジックの分割、②定型処理や手順が複雑なロジックの分離と再利用、③Vuexストアの入出力処理の分割、の3つの観点で肥大化しがちなVueコンポーネントを分割・整理する方法を紹介しました。

コンポーネントやアプリケーションの設計論にはさまざまな理論があり、唯一の正解はありません。しかし、**巨大で見通しの悪いコンポーネントは間違いなく悪です**。まずはコンポーネント小さく維持し、開発の速度も保った上でより良い設計について考えてみると良いでしょう。