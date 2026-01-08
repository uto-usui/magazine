---
title: "数値や日付をさまざまな形式の文字列に！ toLocaleString()を使ってスマートに変換しよう"
source: "https://ics.media/entry/240529/"
publishedDate: "2024-05-29"
category: "frontend"
feedName: "ICS MEDIA"
author: "nishihara"
---

ウェブアプリケーションなどでは外部のAPIからデータを取得して表示することがあるでしょう。しかしながら、APIの値を必ずしもそのまま表示せず、ユーザーにとって分かりやすい文字列に加工することもあります。たとえば、数値をカンマ区切りにしたり、日付データを特定のフォーマットに変換したりといったことはみなさんも経験があるのではないでしょうか？

そのような数字や日付を変換するのに便利なのが、JavaScriptの`toLocaleString()`メソッドです。このメソッドを使うことで、数値や日付をさまざまな形式に変換できます。この記事では、`toLocaleString()`メソッドの使い方と、その応用例を紹介します。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/240529_toLocaleString/)
-   [コードを確認する](https://github.com/ics-creative/240529_toLocaleString/tree/main/src/converter)

![入力した数値がカンマ区切りへ変換される様子](https://ics.media/entry/240529/images/240529_sample.gif)

### `toLocaleString()`メソッドとは

JavaScriptの`toLocaleString()`は数値や`Date`オブジェクトを特定の言語地域環境（ロケール）に基づいた**文字列フォーマット**へ変換するメソッドです。

`toLocaleString()`メソッドは、第一引数にロケールを、第二引数に各種オプションを指定します。引数なしでも利用できますが、その場合はブラウザのデフォルトの言語設定とデフォルトオプションが適用されます。とくに第一引数の言語情報はブラウザ、つまりユーザーの環境に依存するため、**ユーザー環境によっては違う表示になる**こともあります。特定フォーマットへの変換を意図する場合は**ロケールを常に指定する**とよいでしょう。

![toLocaleStringメソッドの引数は、第一引数にロケール情報を、第二引数にさまざまな変換オプションを渡す](https://ics.media/entry/240529/images/240529_method.png)

▼toLocaleString()の一例

```
const someNumber = 1234567.89;
console.log(someNumber.toLocaleString("ja-JP"));
// "1,234,567.89"

const someDate = new Date(2024, 0, 1);
console.log(someDate.toLocaleString("ja-JP"));
// "2024/1/1 0:00:00"
```

第二引数のオプションはさまざまなものがありますが、主なものを簡単に紹介します。数値を変換する場合と日付を変換する場合でオプションが異なります。

**数値**

-   `style`：表示スタイルを指定します。数値を表す`"decimal"`（デフォルト）のほか、パーセントに直す`"percent"`、通貨用に整形する`"currency"`、単位を追加する`"unit"`があります。
-   `maximumFractionDigits`：小数点以下を表示する最大桁数を指定します。このほかに、最小桁数を指定する`minimumFractionDigits`、整数部分の最大桁数を指定する`maximumIntegerDigits`、整数部分の最小桁数を指定する`minimumIntegerDigits`があります。
-   `currency`: 通貨の種類を指定します。`style`の値が`"currency"`の場合に有効です。通貨の種類はISOの通貨コードに基づいて指定します。たとえば、日本円は`"JPY"`、米ドルは`"USD"`などです。
-   `unit`：単位を指定します。`style`の値が`"unit"`の場合に有効です。単位は`"celsius"`（℃）、`"kilogram"`（キログラム）などがあります。

このほか、位取りに関するオプションなどもあります。

**日付**

-   `year`：年を表示するかどうかを指定します。`numeric`（4桁）、`2-digit`（下二桁）、があります。
-   `month`：月を表示するかどうかを指定します。`numeric`（数字）、`2-digit`（ゼロパディングした月）、`long`（月名）、`short`（月名の省略形）があります。日本語の月名に省略形はないので、`"short"`は`"long"`と同じ表示になりますが、英語では`March`の標準形に対して`Mar`の省略形があります。
-   `day`：日を表示するかどうかを指定します。`numeric`（数字）、`2-digit`（ゼロパディングした日）、があります。
-   `hour12`：12時間制か24時間制かを指定します。`true`（12時間制）、`false`（24時間制）があります。すこしややこしいのが、未指定の場合の挙動です。12時間制もしくは24時間制のどちらを採用するかはそのロケールで一般的なものになります。日本のロケールでは24時間制が採用されます。

このほかにも時分秒や曜日などのオプションがあります。

```
const someNumber = 1234567.89;
console.log(
  someNumber.toLocaleString("ja-JP", {
    maximumFractionDigits: 0,
  }),
);
// "1,234,568"

const someDate = new Date(2024, 0, 1, 13);
console.log(
  someDate.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: false,
  }),
);
// "2024年1月1日 13時"
```

文字列へと変換されるので、計算などを終えた最終段階で利用するのが良いです。

少し留意しておきたいことがあります。`toLocaleString()`メソッドの戻り値について、JavaScriptの標準仕様であるECMAScriptは**実装依存**としています。ブラウザによって異なる値を返す可能性があるため、`toLocaleString()`メソッドの戻り値をある文字列と比較するのはオススメできません。とはいえ、今回紹介する作例では2024年5月現在の主要ブラウザであるChrome、Edge、Safari、Firefoxで1点をのぞき同じ値を返しています。唯一異なるのは、Safariのみ通貨単位への変換時に円記号が半角で表示される点です。

結果が閲覧環境に依存することは不安な面もありますが、裏返しとして、多言語対応も含めたユーザーの環境に合わせた表示ができるという利点でもあります。返ってくる文字列がブラウザ間で完全に一致している保証はできませんが、文字列の意味に違いはありません。`toLocaleString()`メソッドが目指すところは表示される文字列ではなく、表示される意味です。多少の表記の違いを許容でき、表示される意味が重要な場面で活躍するでしょう。

### 数値のフォーマット変換

オプションを指定することでさまざまなフォーマットに変換できます。なかでも実際の現場で使えそうな例を紹介します。ここでの例はサンプルでも確認できます。

#### カンマ区切り

数値をカンマ区切りにするには`style`を`"decimal"`に`useGrouping`オプションを`true`にします。ただし、いずれもデフォルトの値なので、`number.toLocaleString("ja-JP")`でも同様の挙動になります。ここでは`localeString()`メソッドを分かりやすくするために、明示的にオプションを指定しています。

![入力した数値「123456」がカンマ区切りへの「123,456」に変換されている](https://ics.media/entry/240529/images/240529_comma.png)

```
/**
 * 数値をカンマ区切りに変換する
 * @param {number} number カンマ区切りにしたい数値
 * @returns {string}
 */
const separateComma = (number) => {
  return number.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
};

// separateComma(12345678) => "12,345,678"
```

#### 小数点を丸める

小数点以下を丸めるには`maximumFractionDigits`オプションを指定します。このオプションは小数点以下の最大桁数を指定します。たとえば、`maximumFractionDigits: 0`とすると小数点以下を表示しません。

![入力した数値「123.456」が小数点第2位で丸められて「123.46」に変換されている](https://ics.media/entry/240529/images/240529_round.png)

```
/**
 * 小数を丸めます
 * @param {number} number 丸めたい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string}
 */
const roundDecimals = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};


// roundDecimals(1.2345678, 3) => "1.235"
```

#### 小数桁を揃える

小数点以下を丸めるのとは逆に、小数点以下の桁数を固定するには先ほどの`maximumFractionDigits`と`minimumFractionDigits`を指定します。足りない桁数をゼロで埋めます。

![入力した数値「123.4」が小数点以下3桁まで表示する「123.400」に変換されている](https://ics.media/entry/240529/images/240529_fix.png)

```
/**
 * 数値を指定した桁数で固定します
 * @param {number} number 小数点固定したい数値
 * @param {number} digit 固定したい桁数
 * @returns {string}
 */
const fixDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};

// fixDigits(1.23, 4) => "1.2300"
// fixDigits(1.2345678, 3) => "1.235"
```

#### 〜万、〜億表記にする

`40000`を4万、`400000000`を4億と表記するには、`notation`オプションを指定します。`"compact"`を指定することで、数値を〜万、〜億表記に変換できます。`compactDisplay`オプションには`"short"`（デフォルト）と`"long"`がありますが、日本語では違いがありません。英語環境で`"short"`は〜K、〜M表記になり、`"long"`は〜Thousand、〜Million表記になります。

![入力した数値「123456」が漢数字有りの「12万」という文字に変換されている](https://ics.media/entry/240529/images/240529_notation1.png)

```
/**
 * 〜万、〜億表記の数値に変換します
 * @param {number} number 変換したい数値
 * @returns {string}
 */
const toKanjiNumber = (number) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
  });
};

// toKanjiNumber(40000) => "4万"
```

ただし、変換されるのは最上位の位のみで、それ以下の位は丸められてしまいます。たとえば`123456`の場合は12万と表示され、千以下の数字は丸められてしまいます。小数点以下を固定するオプションを指定することで12.3万のような小数点ありの表記にできます。

![入力した数値「123456」が漢数字と小数点有りの「12.35万」という文字に変換されている](https://ics.media/entry/240529/images/240529_notation2.png)

```
/**
 * 〜万、〜億表記の数値に変換します（小数点表記）
 * @param {number} number 変換したい数値
 * @param {number} digit 小数点以下の最大表示桁数
 * @returns {string}
 */
const toKanjiNumberWithDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};

// toKanjiNumberWithDigits(123456, 2) => "12.35万"
```

#### パーセント表記にする

数値をパーセント表記にするには`style`を`"percent"`にします。`maximumFractionDigits`オプションで小数点以下の桁数を指定します。この変換には小数の数値からの変換を含むので自分で100倍する必要はありません。

![入力した数値「0.12345」が「12.35%」に変換されている](https://ics.media/entry/240529/images/240529_percent.png)

```
/**
 * 数値を%に変換します
 * @param {number} number %に変換したい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string}
 */
const toPercentage = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    style: "percent",
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};

// toPercentage(0.12, 0) => "12%"
```

#### 通貨表記にする

数値を通貨表記にするには`style`を`"currency"`にします。`currency`オプションで通貨の種類を指定します。通貨の種類はISOの通貨コードに基づいて指定します。たとえば、日本円は`"JPY"`、米ドルは`"USD"`などです。

当然ながら、為替レートなどは計算されません。あくまで表示上の変換です。

![入力した数値「123.45」が表記方式に記号が、変換通貨にドルが指定されて「$123.45」に変換されている](https://ics.media/entry/240529/images/240529_currency.png)

```
/**
 * 数値を通貨単位に変換します
 * @param {number} number
 * @param {string} currencyCode
 * @param {"symbol" | "narrowSymbol" | "code" | "name"} currencyDisplay 通貨の表示形式
 * @returns {string}
 */
const toCurrency = (number, currencyCode, currencyDisplay) => {
  return number.toLocaleString("ja-JP", {
    style: "currency",
    currency: currencyCode, // ISO通貨コードを指定する
    currencyDisplay: currencyDisplay, // 通貨表示形式を指定する。symbol, narrowSymbol, code, nameのいずれか
  });
};

// toCurrency(123.456, "JPY", "symbol") => "¥123"
// toCurrency(123.456, "USD", "symbol") => "$123.46"
```

小数点以下の数値も指定できますが、日本語の場合は小数点の円表示は一般的でないので四捨五入して表示されます。USドルなどは小数点以下2桁で表示されます。

#### 単位を追加する

数値に単位を追加するには`style`を`"unit"`にします。`unit`オプションで追加する単位を指定します。単位は`"celsius"`（℃）、`"kilometer"`（キロメートル）などがあります。

ここでロケールの問題が少し出てきます。`"kilometer"`の単位を指定した場合、日本語環境では「キロメートル」と表示されます。実際には「km」のような表記を使いたいことも多いでしょう。その場合はロケールを`"en-US"`などに変更するとよいです。下記コードではキロメートル、キログラム、リットルを`"en-US"`の表記である「km」「kg」「L」で表示するようロケールを変更しています。

![入力した数値「12345」が付与単位に「kg」が指定されて「12,345kg」に変換されている](https://ics.media/entry/240529/images/240529_unit.png)

```
/**
 * 単位を付与します
 * @param {number} number 単位を付与したい数値
 * @param {string} unit 単位
 * @returns {string}
 */
const addUnit = (number, unit) => {
  const locale = adjustLocale(unit);
  return number.toLocaleString(locale, {
    style: "unit",
    unit: unit,
    compactDisplay: "short",
  });
};

/**
 * 単位に応じてロケールを調整します
 * たとえばkmの場合、ja-JPだと「キロメートル」と返されてしまいますが、en-USだと「km」と返されます
 * そのため、キロメートル、キログラム、リットルのみen-USに変更します。それ以外は日本語にします
 * @param {string} unit 単位
 */
const adjustLocale = (unit) => {
  switch (unit) {
    case "kilometer":
      return "en-US";
    case "kilogram":
      return "en-US";
    case "litter":
      return "en-US";
    default:
      return "ja-JP";
  }
};
```

なお利用できる単位は[TC39 1.5.2 IsSanctionedSimpleUnitIdentifier (unitIdentifier)](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier)に記載されています。

### 日付のフォーマット変換

数値の変換についてはさまざまなオプションがありましたが、日付の変換についても色々あります。ここからは日付の変換について紹介します。日付の変換には`new Date()`で取得するような**`Date`オブジェクト**を利用します。

#### YYYY/MM/DD表記にする

日付をYYYY/MM/DD表記、「2024/01/01/」のような表記にするには`year`、`month`、`day`オプションを指定します。`year`には`"numeric"`、月と日には2桁表示にする`"2-digit"`を指定します。

![入力した日付「2024年5月29日」が「2024/05/29」に変換されている](https://ics.media/entry/240529/images/240529_yyyymmdd.png)

```
/**
 * 日付オブジェクトをYYYY/MM/DD形式の文字列に変換します
 * @param {Date} date YYYY/MM/DD形式に変換したい日付オブジェクト
 * @returns {string}
 */
const toYYYYMMDD = (date) => {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// toYYYYMMDD(new Date(2024, 0, 1)) => "2024/01/01"
```

#### 和暦に変換する

行政機関などは西暦ではなく和暦を使うことがあります。とはいえ、内部のデータとしては西暦で扱っていることが多いでしょう。次のコードを使えば、西暦を和暦に変換できます。

![入力した日付「2024年5月29日」が「令和6年5月29日」に変換されている](https://ics.media/entry/240529/images/240529_calendar.png)

```
/**
 * 日付オブジェクトを和暦表示に変換します
 * @param {Date} date 和暦表示に変換したい日付オブジェクト
 * @returns {string}
 */
const toJapaneseCalendar = (date) => {
  return date.toLocaleString("ja-JP-u-ca-japanese", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// toJapaneseCalendar(new Date(2024, 0, 1)) => "令和6年1月1日"
```

ここでちょっと不思議なロケール、`ja-JP-u-ca-japanese`があります。`Date`オブジェクトに対するロケール指定の場合、言語情報の他、暦情報も指定できます。言語ロケールの後の`u`で拡張を意味し、`ca`は暦、それに続く`japanese`で和暦を指定しています。ほかにもさまざまな暦が利用でき、たとえば`buddhist`で仏暦、`islamic`でイスラム暦などもあります。

なお、過去の年号も取得できますが、古い年号の正確性には難があります。歴史的には西暦の1872年12月31日に明治改暦が行われ、1873年1月1日以降は西暦と和暦の月日が一致するようになりました。ただし、それ以前はいわゆる旧暦を使用していたので、年月日の変換が正確でない可能性があります。他にも西暦におけるユリウス暦とグレゴリオ暦の改暦の影響などもあり、古い年号には怪しい部分があります。1872年以前の年号で正確性を求める場合には`toLocaleString()`メソッドを使うのは避けるべきでしょう。古い年号の挙動については[『Intl.DateTimeFormat による明治以前の和暦の扱い #JavaScript - Qiita』](https://qiita.com/nue_of_k/items/ea3dae4a1be9ad6ac953)にて詳しく解説されています。

#### ロケールに適した時間表記にする

12時間制のオプションのところでも少し書きましたが、12時間制の表記が一般的か24時間制の表記が一般的かは各地によって違います。たとえば、日本では24時間制も一般的に使われていますが、アメリカでは12時間制が一般的です。

多言語対応を考えるとき、時間表記が24時間制で固定されていると、24時間制になじみのないユーザーにとっては使いにくいかもしれません。そのため、ユーザーのロケールに合わせて時間表記を変えたほうがよいでしょう。今までは表示を統一するためにロケール指定を固定してきましたが、`navigator.language`を使ってユーザーのロケールを取得、指定することでユーザーの環境に合わせた表示ができます。

![日本語のロケールに合わせて24時間制の表記になっている時刻](https://ics.media/entry/240529/images/240529_locale_time.png)

```
/**
 * ロケールに合わせて時刻表示を調整します
 * @param date
 * @returns {string}
 */
const adjustHourDisplay = (date) => {
  const locale = navigator.language; // ユーザーの言語ロケールを取得
  return date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
```

とくに英語でも「アメリカ英語（`en-US`）」と「イギリス英語（`en-GB`）」で時間表記が異なります。`toLocaleString()`が言語だけでなく、地域も考慮された形で変換されることが分かります。

![入力した数値がカンマ区切りへ変換される様子](https://ics.media/entry/240529/images/240529_locale_en.png)

この場合、環境によって表示文字数が異なるため、表示領域の設定には注意が必要です。

### まとめ

`toLocaleString()`メソッドを使うことで、数値や日付をさまざまな形式に変換できます。数値の場合はカンマ区切りや小数点以下の桁数を指定でき、日付の場合は和暦や時間表記を指定できます。これにより、自分で文字を区切って挿入したり、あるいは`getFullYear()`や`getMonth()`、`getDate()`で取得してから文字列に変換する必要がなくなります。ここで紹介した例は一部ですが、オプションの組み合わせ次第ではもっと多くの表記が可能です。`toLocaleString()`メソッドが対応している形式なら、このメソッドを活用してスマートに表示変換してみてください。

#### 参考

`toLocaleString()`メソッドは内部的には`Intl.NumberFormat`と`Intl.DateTimeFormat`を使っています。下記ページにはオプションの詳細などが記載されています。

-   [Intl.NumberFormat() コンストラクター - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
-   [Intl.DateTimeFormat() コンストラクター - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)