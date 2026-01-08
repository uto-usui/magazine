---
title: "エラーは出ないけど…何か変？？Vue.jsでやりがちな「サイレント・ミス」（ロジック編）"
source: "https://ics.media/entry/200716/"
publishedDate: "2020-07-16"
category: "frontend"
feedName: "ICS MEDIA"
author: "matsumoto"
---

2020年7月16日 公開 / [株式会社ICS 松本 ゆき](https://ics.media/entry/staff/matsumoto/)

Vue.jsは初学者にもとても手厚いサポートを提供してくれるフレームワークです。 たとえば、以下のコードで「リセット」ボタンを押すと「propsの`count`は子コンポーネントから変更すべきではない」とわかりやすくエラーを表示してくれます。

```
<template>
  <div class="CountViewComponent">  
    カウント={{count}} <button @click="reset">リセット</button>
  </div>
</template>

<script>
export default {
  props: {
    // 表示するカウント値
    count: { type: Number, default: 3 }
  },
  methods: {
    // カウントをリセットします
    reset() {
      this.count = 0
    }
  }
}
</script>
```

![Vueは開発者の間違いを丁寧に警告してくれる](https://ics.media/entry/200716/images/images/200716_vue_error.png)

それでも時として、 **「エラーは出ないけど…何かうまく動いてない気がする」** という場面に遭遇します。Vue.jsはさまざまな書き方ができるので、コードだけを見てそれがバグであると機械的に判定できないことも少なくないのです。

残念なことに、明確なエラーを出さない誤りには致命的でないものも多く、違和感を感じてもつい見過ごされがちです。 この記事では、こうした誤りを「サイレント・ミス」と名付け、筆者のこれまでの経験やICS社内での事例から3つ紹介します。

※ この記事では2020/7/1時点の最新版であるVue2.6.11を使用します。 2020年後半にリリース予定のVue 3でも基本的な考え方は変わりませんが、エラー検出されるケース等の細部はバージョンによって異なる可能性があります。

### 1\. なぜか重いコンポーネント

最初の例はサイレントに性能低下を引き起こす間違いです。

```
<template>
  <div>
    <div class="message" v-show="someHeavyFunc()">
      このメッセージの表示ON/OFFはv-showで設定しています。
    </div>

    <!-- inputの入力をdata.someTextにセット -->
    <input v-model="someText" />
  </div>
</template>
```

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200716_vue_mistakes/#/heavy)
-   [ソースコードを確認する](https://github.com/ics-creative/200716_vue_mistakes/blob/master/src/views/TooHeavyComp.vue)

この画面で`input`に文字を入力するともたつきを感じられると思います（英数字がわかりやすいと思います）。 `input`には`v-model="someText"`で入力を`data.someText`に連動させているだけで、キータイプごとに処理を行うイベントハンドラー等は一切使われていません。

#### テンプレート内に関数呼び出しを見つけたら注意

Vue.jsを使い慣れている方なら、冒頭のコードを見ただけで違和感を見つけられたかもしれません。重さの原因は`v-show`に書かれた`someHeavyFunc()`の呼び出しです。 開発者ツールのログをみると、`input`に何か入力するたびにこの`someHeavyFunc`が実行されていることがわかります。

![キータイプごとにテンプレートな内の関数呼び出しが実行されている](https://ics.media/entry/200716/images/images/200716_heavy.gif)

テンプレートの文法上、この例のようにディレクティブ（`v-show`や`:class`）やMustache（`{{text}}`のような二重中カッコ記法）に関数呼び出しを書くことは禁止されていません。 しかし、**関数呼び出しの形で書かれた値はVue.jsが更新のタイミングを判断することができなくなるため、あらゆるタイミングで再評価される**可能性があります。[公式ガイドでも言及](https://ja.vuejs.org/v2/guide/computed.html#%E7%AE%97%E5%87%BA%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3-vs-%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89)されている通り、このようなケースではcomputedを使うようにしましょう。

例外もありますが、基本的にテンプレートのイベントハンドラー（`v-on:xxx`または`@xxx`）以外の場所で関数呼び出しを見つけたら「間違いかも？」と疑って良いでしょう。

### 2\. なぜか反映されないprops変更

次の例はコンポーネントを使う人と作った人が異なる場合に発生しがちなpropsの問題です。 例としてカラーコードを渡すと色を表示してくれる`ColorView`コンポーネントと郵便番号を渡すと住所を表示してくれる`ZipAddress`コンポーネントを作成しました。

▼ ColorViewコンポーネント

```
<template>
  <div class="ColorView" :style="{backgroundColor: colorCode}">
    <div class="ColorView_Code">{{ colorCode }}</div>
  </div>
</template>

<script>
export default {
  props: {
    code: { type: String }
  },
  data() {
    return {
      // 正規化（全て大文字にして先頭に'#'を追加）したカラーコードをセット
      colorCode: ('#' + this.code).toUpperCase()
    }
  }
}
</script>
```

▼ZipAddressコンポーネント

```
<template>
  <div class="ZipAddress">
    <span class="ZipAddress_Zip">〒{{ zipcode }}</span>
    <span class="ZipAddress_Address">{{ this.address || '取得中...' }}</span>
  </div>
</template>

<script>
import jsonp from 'jsonp'
// 株式会社アイビスの郵便番号検索APIを使用しています：
// http://zipcloud.ibsnet.co.jp/doc/api
const API = 'https://zipcloud.ibsnet.co.jp/api/search'
export default {
  props: {
    zipcode: { type: String }
  },
  data() {
    return {
      address: '' // ここに検索された住所が入ります
    }
  },
  mounted() {
    if (!this.zipcode) {
      return
    }
    // propsで指定された郵便番号を検索
    const url = `${API}?zipcode=${this.zipcode}`
    jsonp(url, {}, (err, data) => {
      if (err) {
        return
      }
      // 結果から住所部分を抜き出してaddressにセット
      const addrObj = data.results[0]
      this.address = addrObj.address1 + addrObj.address2 + addrObj.address3
    })
  }
}
</script>
```

シンプルですがどちらも実用的なコンポーネントです。この2つをページに組み込んで利用してみたものが下の画面です：

![ColorViewとZipAddressコンポーネントを利用している画面例](https://ics.media/entry/200716/images/images/200716_comp_usage.png)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200716_vue_mistakes/#/props)
-   [デモページのソースコードを確認する](https://github.com/ics-creative/200716_vue_mistakes/blob/master/src/views/NotChangedProps.vue)
-   [ColorViewコンポーネントのソースコードを確認する](https://github.com/ics-creative/200716_vue_mistakes/blob/master/src/components/ColorView.vue)
-   [ZipAddressコンポーネントのソースコードを確認する](https://github.com/ics-creative/200716_vue_mistakes/blob/master/src/components/ZipAddress.vue)

どちらも初期表示はうまくいっています。しかし、入力欄のカラーコードや郵便番号を変更しても色や住所が更新されません。コンポーネントを利用するページ側では、以下のように`v-model`を利用して入力値とコンポーネントのpropsをダイレクトに紐づけています。なぜ初期表示はうまくいくのに更新ができないのでしょうか？

```
<section>
  <h2>なぜか変わらないprops-1</h2>
  <label>
    <span>Color Code: #</span>
    <input v-model="colorCode" />
  </label>
  <ColorView :code="colorCode" />
</section>
```

#### dataの初期化でpropsをコピーしていていないかチェック

今回の問題は利用するページ側ではなく、コンポーネントの作りに原因があります。 `ColorView`からみてみましょう。入力されたprops（`this.code`）を表示で使いやすいように整形してdataにセットしています。

```
data() {
  return {
    // 正規化（全て大文字にして先頭に'#'を追加）したカラーコードをセット
    colorCode: ('#' + this.code).toUpperCase()
  }
}
```

このコードはコンポーネントの初期化時には期待通りに動作します。ただし、このコードが実行されるのはあくまでコンポーネントが作られた時の一度だけです。 後からpropsを変更したとしてもこの行は実行されず、`data.colorCode`が更新されることはありません。

Vue.jsに馴染みが薄いと、ついdataにpropsをコピーするようなコードを書きがちです。 しかしこのような書き方をすると、そこでリアクティビティ（入力〜出力までの関連する各変数が変更を検知して連動すること）が失われてしまいます。

![propsのコピーでリアクティビティが失われる](https://ics.media/entry/200716/images/images/200716_reactive_props.png)

特別な理由がない限り、dataへpropsを代入/コピーすべき場面はありません。代わりにcomputedを使うようにしましょう。

```
computed: {
  /** 表示用に正規化したカラーコードです。この文字列はCSSの色属性としても使用できます */
  normalizedCode() {
    return ('#' + this.code).toUpperCase()
  }
}
```

#### ライフサイクルフックでpropsを使っている場合も注意

`ZipAddress`の方もみてみましょう。こちらもコンポーネントの設計に問題があります。郵便番号→住所の変換では、カラーコードの表示とは異なりAPIの呼び出しが必要になります。computedで非同期APIを呼び出すことはできないので、`ZipAddress`コンポーネントでは`mounted`でAPIを呼び出し、完了後に`data.address`を更新しています。

```
mounted() {
  if (!this.zipcode) {
    return
  }
  // propsで指定された郵便番号を検索
  const url = `${API}?zipcode=${this.zipcode}`
  jsonp(url, {}, (err, data) => {
    if (err) {
      return
    }
    // 結果から住所部分を抜き出してaddressにセット
    const addrObj = data.results[0]
    this.address = addrObj.address1 + addrObj.address2 + addrObj.address3
  })
}
```

`ColorView`と同様、この動作も初期化時の一度しか動作しないことは明らかです。このようなケースではwatchを使ってpropsの変更を意識的に監視する必要があります。

```
watch: {
  zipcode() {
    // mountedで行っていた郵便番号検索のコードをここに移動
  }
}
```

#### 「どうせ変更しないから、ヨシ！」は危険

propsの変更に追従する（リアクティビティを保つ）のはそれなりにコストのかかる作業です。 現実的には「このpropsは初期化時の設定だけで変更しないからいいだろう」と今回の例のような実装を行うケースもあるでしょう。

しかし、要件的には変更が不要なpropsでも、実際の実装をしてみると変更が必要になることはよくあります。先の`ZipAddress`の例では、`zipcode`の初期値を"1050011"（芝公園の郵便番号）とハードコードしていましたが、この初期値が実際にはAPI経由でしか取得できない、となったらどうなるでしょうか？

▼ハードコードしていた初期値をAPIから取得するように変更

```
data() {
  return {
    zipCode: '' // 最初は空にしておいてAPIで取得する
  }
},
async mounted() {
  const response = await getInitData() // APIを呼び出してサーバーから初期データを取得
  this.zipCode = response.zipCode
}
```

このように`zipCode`を **非同期処理の結果を待ってpropsを設定する実装は、propsの変更操作に他なりません。** あえてリアクティブでないpropsを作るときには、少なくともドキュメント等で明確にその旨を示しておくようにしたいものです。

### 3\. 微妙に再計算されない/されるcomputed

最後に少し厄介なcomputedのトラブル例を紹介します。スライダーを動かすと、水色のブロックの分割数が変わるデモです。

```
<section>
  <h2>なぜか変わらないcomputed</h2>
  <label>ブロックの数：
    <input type="range" min="1" max="6" v-model.number="blockCount"/>
  </label>
  <div ref="row">
    <div
      class="block"
      v-for="no in blockCount"
      :key="no"
      :style="{ width: blockWidth }"
    >width = {{ blockWidth }}</div>
  </div>
</section>
```

▼ 期待値（正しく動いている状態） ![スライダーに連動してブロックの幅をcomputedで算出する例](https://ics.media/entry/200716/images/images/200716_block_demo.gif)

-   [デモを別ウインドウで再生する](https://ics-creative.github.io/200716_vue_mistakes/#/computed)
-   [デモページのソースコードを確認する](https://github.com/ics-creative/200716_vue_mistakes/blob/master/src/views/NotChangedComputed.vue)

ブロックの幅はcomputedで動的に算出するようにしています。

```
data() {
  return {
    blockCount: 1 // スライダーと連動
  }
},
computed: {
  blockWidth() {
    // 行の幅を取得するために$refsで親の要素を取得
    const rowElement = this.$refs['row']
    // 初回呼び出し時ははまだDOMにアクセスできないので0pxを返す
    if (!rowElement) {
      return '0px'
    }
    // 全体の幅 / ブロック数で1ブロックの幅を決める
    const w = rowElement.offsetWidth / this.blockCount
    return Math.floor(w) + 'px'
  }
}
```

▼ 実際の動作（正しく動いていない） ![スライダーに連動してブロックの幅をcomputedで算出するが正しく動作していない例](https://ics.media/entry/200716/images/images/200716_block_demo_ng.gif)

スライダーを動かすと、ブロックの数は変わりますが、幅が正しく計算されていません。 `blockWidth`をcomputedからmethodsに移動し、テンプレートを`width: blockWidth()`のように関数呼び出しにすれば期待通りに動作します。 しかしこれでは最初の事例で説明した関数呼び出しの問題が発生してしまいます。なぜcomputedではうまく動かないのでしょうか？

#### console.logを入れると動く!?

うまく動かない`blockWidth`ですが、実は下のように1行`console.log`を入れると期待通り動作するようになります。

```
computed: {
 blockWidth() {
   // ↓このlogを入れるとなぜか動く。削除厳禁！！
   console.log("ブロック数=" + this.blockCount) //⭐️追加

   // 行の幅を取得するために$refsで親の要素を取得
   const rowElement = this.$refs['row']
   // 初回呼び出し時ははまだDOMにアクセスできないので0pxを返す
   if (!rowElement) {
     return '0px'
   }
   // 全体の幅 / ブロック数で1ブロックの幅を決める
   const w = rowElement.offsetWidth / this.blockCount
   return Math.floor(w) + 'px'
 }
}
```

動くからといって、もちろんこの例のような回避方法を行うべきではありません。問題はなぜ`console.log`を入れただけで正しく動くようになったのか、です。

#### 依存を検知できなかったcomputedは2度と実行されない

前述したように、Vue.jsのcomputedはメソッド呼び出しとは異なり、必要になった時だけ再計算をしてくれる優れものです。しかしその方法自体は決して魔法ではありません。

Vue.jsが依存を検出する仕組みの考え方はシンプルです。基本的にはcomputedを **実際に呼び出して、その結果アクセスされた変数（dataのプロパティやprops等のリアクティブな変数）をすべて記録しているだけ** です。 一度計算されたcomputedの値はキャッシュされますが、依存しているとマークされた変数が変更されると、そのタイミングでキャッシュも無効化されます。

`blockWidth`の動かない例に戻りましょう。この例では全体の横幅を取得するために`$refs`で`div`要素を取得しています。 この`$refs`は初回実行（マウント前）では`null`を返すため、エラーにならないようにif等で分岐してあげる必要があります（この部分を削除すると実行時エラーになります）。

今回のように、最初の実行で早期returnしてしまうと、Vue.jsはこのcomputedが`this.blockCount`に依存していることを知ることができません。 `this.$refs`はリアクティブな変数ではないため、Vue.jsは「`blockWidth`は何にも依存していない（常に同じ値を返すのだろう）」と認識し、2度と再計算を行うことはないのです。

![条件分岐によって依存検出に失敗するcomputedの説明](https://ics.media/entry/200716/images/images/200716_undetected.png)

ここまで理解できれば、「`console.log`を入れただけで正しく動くようになった」理由も明白です。冒頭で（早期returnする前に）`console.log(blockCount)`を実行することで「このcomputedは`blockCount`に依存しているらしい」とVue.jsが認識できたためですね。

#### リアクティブでない変数を条件分岐に使うのはNG

この問題に関して、[公式ガイドでは$refsの文脈](https://ja.vuejs.org/v2/guide/components-edge-cases.html#%E5%AD%90%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%81%A8%E5%AD%90%E8%A6%81%E7%B4%A0%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)で忠告しています。

> テンプレート内または算出プロパティから$refsにアクセスするのは避けるべきです

しかしここまでの説明で明らかな通り、問題は`$refs`自体にあるわけではありません。 （`$refs`のような）**リアクティブではない変数によって条件分岐するcomputedは正しく実行されない** と説明するほうがより正確でしょう。 （dateやpropsの変数のようなリアクティブな変数で条件分岐するのは、もちろん問題ありません。）

したがって、`$refs`以外にも以下のようなcomputedはすべてNGです。

```
computed: {
  // ①画面サイズで分岐するcomputed
  // 画面をPCサイズからモバイルサイズに小さくしてもメッセージは切り替わりません。
  // その状態でmobileMsgを変更しても再計算は行われません。
  // 一度pcMsgを変更するとmobileMsgの依存が検出され、mobileMsgの変更で再計算が行われるようになります。
  sizeMessage() {
    return window.innerWidth < 768 ? this.mobileMsg : this.pcMsg
  },

  // ②Vue管理外の変数で分岐するcomputed
  // 初回実行時にsomeAPI.dataが未取得だと、サーバへのデータ取得要求は実行されますが
  // 結果がsomeAPI.dataにセットされてもcomputedは'取得中...'のまま変わりません。
  // さらに、dataIndexの値を変更したとしても、再計算は実行されません。
  serverData() {
    // 取得済みのデータがなければサーバにリクエスト
    if (!someAPI.result) {
      someAPI.requestServerData()
      return '取得中...'
    }
    // データ配列からdataIndex番目のデータを返す
    return someAPI.result[this.dataIndex] || 'データが見つかりません'
  },

  // ③乱数で分岐するcomputed
  // currentValueが変わるたびに概ね再計算されますが、
  // 1%の確率で0を返すとそれ以降はcurrentValueが変わっても再計算されず、0のまま動かなくなります。
  randomValue() {
    if (Math.random() < 0.01) return 0
    return this.currentValue
  }
}
```

リアクティブではない変数をcomputedで使いたい時は、すこし面倒ですがcomputed外の適切なタイミングで変数の値を取得し、リアクティブなdataに設定・更新するのが良いでしょう。

```
data() {
 return {
   width: null
 }
},
computed: {
 blockWidth() {
   // 初回呼び出し時ははまだwidthがnullなので0pxを返す
   if (!this.width) {
     return '0px'
   }
   // 全体の幅 / ブロック数で1ブロックの幅を決める
   const w = this.width / this.blockCount
   return Math.floor(w) + 'px'
 }
},
mounted() {
 this.width = this.$refs['row'].offsetWidth
 // 必要であればリサイズイベントを拾ってwidth値を更新する
}
```

### 「エラーじゃないから…」はNG。怪しい挙動はしっかり確認しよう

この記事では慣れないと誰でもうっかりやってしまいそうな、それでいて見つけるのが難しいVue.jsの「サイレント・ミス」を紹介しました。 Vue.jsは深く仕組みを理解しなくても使えてしまう優しいフレームワークですが、それゆえに間違いを放置してしまうと思わぬトラブルにも発展しかねません。 「何かおかしいな」と思ったらこの記事や公式ガイドを参考に、間違った書き方や設計をしていないかチェックしてみてください。