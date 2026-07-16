---
title: "JavaScriptの日付処理が変わる！ DateからTemporalへ"
source: "https://ics.media/entry/260715/"
publishedDate: "2026-07-15"
category: "frontend"
feedName: "ICS MEDIA"
author: "narayama"
---

JavaScriptで日付を扱ったことのある方なら、「3月のつもりで`new Date(2026, 3, 15)`と書いたら4月になっていた」という経験が一度はあるのではないでしょうか。月だけが0始まりであることは`Date`クラスの仕様の一例ですが、そのほかにも、日付の計算やフォーマット、タイムゾーンの処理には手間がかかります。そうした扱いづらさを補うために、長らく[date-fns](https://date-fns.org/)や[Day.js](https://day.js.org/)といったライブラリが利用されてきました。

その状況を変えるのが、`Date`クラスを置き換えるために一から設計された新しい標準API「Temporalテンポラル」です。2017年ごろから議論が始まった提案で、仕様はすでに固まり、ECMAScript 2027に採用される予定です。ライブラリの使い方と違って、標準APIの知識は一度覚えれば長く使えます。`Date`の課題を振り返ったうえで、Temporalの使い方と、予約システムを題材にした実装例を紹介します。

### なぜDateクラスではダメだったのか

`Date`クラスの扱いにくさは数多くありますが、現場でつまずきやすいのは次の3つです。

#### 月が0始まり

まず、冒頭でも触れた月の0始まり問題です。日は1始まりなのに、月だけが0始まりになっています。

```
// 2026年3月15日のつもりが、4月15日になる
const date = new Date(2026, 3, 15);
```

この0始まりは、書くときだけでなく読み取るときにも影響します。月を数値で取り出して表示するときは`getMonth()`に1を足す必要があります。ISO 8601形式の文字列（`2026-03`は3月）やデータベースでは月を1始まりの数字で表すため、0始まりの`getMonth()`との間で変換のズレが起きやすくなります。

```
const date = new Date(2026, 2, 15); // 2026年3月15日（月は0始まりなので2）
console.log(date.getMonth()); // 2 ← そのまま表示すると「2月」に見える
console.log(date.getMonth() + 1); // 3 ← 表示にはこの+1が欠かせない
```

筆者も、この`+1`を書き忘れて表示が1か月ずれるミスを何度もやりました。

0始まりには利点もあります。月名を並べた配列を`getMonth()`の戻り値でそのまま引けるので、配列のインデックスに合わせたと考えれば筋は通っています。困るのは、日は1始まりなのに月だけ0始まりという、`Date`クラスの中での不ぞろいです。月を扱うたびに0始まりと1始まりを変換する必要があり、ミスを招きやすくなります。

#### オブジェクトが変更可能

次に、オブジェクトがミュータブル（変更可能）である点です。`setDate()`などのメソッドを呼び出すと、元の`Date`オブジェクト自体が書き換わります。そのため、同じオブジェクトを複数の箇所で共有していると、予期しない変更につながります。

```
const a = new Date(2026, 0, 1);
const b = a; // 参照の共有
b.setDate(15);
console.log(a.getDate()); // 15 ← aまで変わってしまう
```

#### 任意のタイムゾーンの処理がない

そして最大の問題が、タイムゾーンです。`Date`オブジェクトが保持するのは時系列上の一点で、`Asia/Tokyo`のようなタイムゾーンIDは持てません。読み書きできるのは「実行環境のローカル時刻」と「UTC（協定世界時）」の2通りの解釈だけで、任意のタイムゾーンを指定して計算する手段がありません。前述の日時ライブラリはこの機能を備えているため、タイムゾーンを扱うにはライブラリに頼るしかありませんでした。

UTCは世界の時刻の基準で、日本標準時（JST）はここから9時間進んでいます。

```
// 14:00がどのタイムゾーンの14時かは実行環境しだい
// サーバーがUTCなら14:00 UTC、東京なら14:00 JSTと、別の瞬間になる
const d = new Date(2026, 6, 10, 14, 0);

// 表示を他のタイムゾーンへ変えることはできるが…
console.log(d.toLocaleString("ja-JP", { timeZone: "America/New_York" }));
// 「ニューヨークの14:00」を作って計算する標準的な手段はない
```

### Temporalの基本的な使い方

基本は`Temporal.PlainDate`です。タイムゾーンを持たない日付なので、ローカル時刻やUTCを気にせず、カレンダー上の日付を扱えます。

日付を作るには、文字列を渡す`from()`か、今日の日付を返す`Temporal.Now.plainDateISO()`を使います。

```
const date = Temporal.PlainDate.from("2026-07-10");
const today = Temporal.Now.plainDateISO();
```

年・月・日はプロパティで取り出せます。月は1始まりで、7月なら`7`が返ります。

```
date.year; // 2026
date.month; // 7（1始まり）
date.day; // 10
date.dayOfWeek; // 5（月曜が1、日曜が7）
```

加算や比較は、専用のメソッドで書けます。`add()`は「3日後」のような加算に、`with()`は「日を1日に置き換えて月初を求める」といった部分的な差し替えに使います。比較には、前後を返す静的メソッドの`compare()`と、一致を調べる`equals()`があります。

```
const deadline = date.add({ days: 3 }); // 3日後
const firstDay = date.with({ day: 1 }); // その月の1日

Temporal.PlainDate.compare(date, deadline); // -1（dateのほうが前）
date.equals(deadline); // false
```

`toLocaleString()`にロケールを渡すと、その地域の慣習に沿った表記になります。

```
date.toLocaleString("ja-JP"); // "2026/7/10"
date.toLocaleString("en-US"); // "7/10/2026"
```

こうした操作でも、`date`自身は書き換わりません。`Date`で悩まされた月0始まりとミュータブルの問題は、Temporalでは起こりません。

### つまずきやすい日付計算

`Date`でとくにはまりやすかった場面も見ておきましょう。

#### 月をまたぐ計算

月をまたぐ計算も、挙動が予測しやすくなります。`Date`クラスで「1か月後」を求めると、カレンダーの繰り上がりで日付が想定とズレることがありました。

```
const d = new Date(2026, 0, 31); // 1月31日
d.setMonth(d.getMonth() + 1); // 「1か月後」のつもり
// → 2月31日はないので3月3日になる
```

Temporalの`add({ months: 1 })`は、計算先の月に同じ日がない場合、その月の最終日に調整されます。

```
const endDate = Temporal.PlainDate.from("2026-01-31").add({ months: 1 });
console.log(endDate.toString()); // "2026-02-28"（2月に31日はないので末日）
```

月ではなく日数で加算したいときは、`add({ days: 30 })`のように単位を変えれば「30日後」として計算できます。

#### Dateクラスとの相互変換

既存の`Date`クラスとも相互に変換できるので、コードベースを一度に書き換える必要はありません。新しく書く箇所から少しずつ移行できます。

```
const legacy = new Date();
const instant2 = legacy.toTemporalInstant(); // Date → Temporal
const back = new Date(instant2.epochMilliseconds); // Temporal → Date
```

### Temporalの考え方、「表示上の値」と「時系列の一点」

ここまで使ってきた`PlainDate`は、タイムゾーンを持たない「表示上の値」で、Temporalのクラスは大きく、この「表示上の値」と、世界共通の「時系列の一点」の2つに分かれます。

たとえば、東京店とロンドン店が「どちらも朝9時に開店する」と言うときの9時は、タイムゾーンを持たない表示上の値です。時計の表示は同じでも、東京の朝9時とロンドンの朝9時は、数時間ずれた別々の瞬間です。日付・時刻・タイムゾーンがそろうと、世界共通の時系列の一点になります。

![Temporalのクラスマップ。タイムゾーンを持たない「表示上の値」（PlainDateなど）と、世界共通の「時系列の一点」（Instant・ZonedDateTime）に分かれる](https://ics.media/entry/260715/images/classmap.png)

`Plain`と名前に付くクラス群は、壁の時計に表示された時刻のように、それ単体ではどの地域の時刻かは決まりません。`Temporal.PlainDate`クラスは「2026年7月10日」という日付、`Temporal.PlainTime`クラスは「14時30分」という時刻を表します。

一方、`Temporal.Instant`クラスと`Temporal.ZonedDateTime`クラスは、世界共通の「時系列の一点」を表します。タイムゾーンがわかっているなら、日時とタイムゾーンをまとめて持つ`Temporal.ZonedDateTime`クラスを使うのが公式の推奨です。従来の`Date`クラスに概念上もっとも近いのは、時系列の一点だけを表す`Temporal.Instant`クラスです。

コードで確かめてみましょう。下の世界時計デモも、同じ一点を都市ごとの時刻で表示しています。

```
// いまこの瞬間 = 時系列の一点
const now = Temporal.Now.instant();

// 地域を指定すると、同じ一点が現地の時計の時刻になる（デモは全都市で繰り返す）
console.log(now.toZonedDateTimeISO("Asia/Tokyo").toString());
// 例: "2026-07-10T14:30:00+09:00[Asia/Tokyo]"
console.log(now.toZonedDateTimeISO("America/New_York").toString());
// 例: "2026-07-10T01:30:00-04:00[America/New_York]"
```

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260715_temporal/02_clock-instant/)
-   [コードを確認する](https://github.com/ics-creative/260715_temporal/blob/main/docs/02_clock-instant/index.html)

### （デモ）予約システムの日時処理を書き直す

簡単な予約システムを題材に、Temporalで書いてみます。まず下のデモを触ってみてください。店舗を切り替えると、同じ予約時刻が各タイムゾーンでどう表示されるかを確認できます。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260715_temporal/01_reservation/)
-   [コードを確認する](https://github.com/ics-creative/260715_temporal/blob/main/docs/01_reservation/index.html)

このデモを、Temporalでどう書くかを見ていきます。予約では「予約日」「開始時刻」「利用時間（90分）」という異なる概念を扱い、最後に店舗のタイムゾーンで一点に確定します。ところが`Date`クラスには、日付だけ・時刻だけを表す型がありません。どの概念も1つの`Date`で代用するしかなく、これまでは次のような工夫が必要でした。

```
// 予約日と開始時刻。日付と時刻を分けられないので1つのDateにまとめる
const start = new Date(2026, 6, 10, 14, 30); // 2026年7月10日 14:30（月は0始まり）
// 利用時間90分後の終了時刻。分の加算はミリ秒に直す
const end = new Date(start.getTime() + 90 * 60 * 1000);
// 「東京店の14:30」を作る手段はなく、実行環境のローカル時刻になってしまう
```

Temporalなら、日付は`PlainDate`、時刻は`PlainTime`と、概念ごとに専用の型で表せます。まずは予約日と開始時刻を、それぞれの型で組み立てます。

```
const day = Temporal.PlainDate.from("2026-07-10"); // 予約日
const start = Temporal.PlainTime.from("14:30"); // 開始時刻
const end = start.add({ minutes: 90 }); // 90分後の終了時刻
console.log(`${start} – ${end}`); // "14:30:00 – 16:00:00"
```

利用時間の90分も`add()`で足すだけで、ミリ秒への変換は要りません。日付と時刻がそれぞれ別の型なので、1つの値にまとめずに扱えます。

次に、この予約日時へ店舗のタイムゾーンを与えて、世界共通の一点（`ZonedDateTime`）に確定します。`toZonedDateTime`は日付・時刻・タイムゾーンを合成し、`withTimeZone`はその一点を別のタイムゾーンの表示に変えます。

```
// 予約日と開始時刻に店舗のタイムゾーンを合成して「時系列の一点」にする
const reserved = day.toZonedDateTime({ timeZone: "Asia/Tokyo", plainTime: start });

// 海外のユーザーには、その一点を現地のタイムゾーンで表示する
console.log(reserved.withTimeZone("America/New_York").toString());
```

こうして同じ一点を、利用者ごとに現地の時刻で見せられます。

### （デモ）サマータイムを含む時差の計算

サマータイム（DST）による時差の変化にも、`ZonedDateTime`クラスで対応できます。下のデモで2つの都市と日付を選ぶと、その日の時差が出ます。日付を2月1日と7月1日で切り替えると、サマータイムのぶん時差が1時間変わります。

-   [サンプルを別ウインドウで開く](https://ics-creative.github.io/260715_temporal/03_dst/)
-   [コードを確認する](https://github.com/ics-creative/260715_temporal/blob/main/docs/03_dst/index.html)

サマータイムは、春から秋にかけて時計を1時間進める制度です。適用期間は国や地域で異なりますが、その期間は他地域との時差が1時間変わります。たとえば東京とロンドンの時差は、ロンドンがサマータイムの期間は8時間、それ以外は9時間です。

時差計算デモの`diffHours`関数を抜粋します。ある日付の「都市Aの正午」を基準の一点にし、同じ瞬間を都市Bで見て、オフセットの差から時差を求めています。

```
// 時差計算デモ（docs/03_dst/）の diffHours() より抜粋
function diffHours(dateStr, tzA, tzB) {
  const atA = Temporal.PlainDate.from(dateStr).toZonedDateTime({
    timeZone: tzA,
    plainTime: Temporal.PlainTime.from("12:00"),
  });
  const atB = atA.withTimeZone(tzB);
  return (atA.offsetNanoseconds - atB.offsetNanoseconds) / 3_600_000_000_000;
}

// 同じ東京-ロンドンでも、サマータイムの有無で時差が変わる
diffHours("2026-07-10", "Asia/Tokyo", "Europe/London"); // 8時間（サマータイム中）
diffHours("2026-01-10", "Asia/Tokyo", "Europe/London"); // 9時間（通常）
```

`Date`クラスでも、`Intl.DateTimeFormat`クラスにタイムゾーンを指定すれば、サマータイムを反映した表示は得られます。ただ、時差そのものを数値で求めるとなると、オフセットを取り出す標準的な手段がなく、自分で計算する必要がありました。

Temporalは、タイムゾーンIDと日時を一体で保持し、オフセットを`offset`（`+09:00`のような文字列）や`offsetNanoseconds`プロパティから直接扱えます。日付を渡すだけで、その日の正しい時差が得られます。

### 対応ブラウザと実行環境

標準API「Temporal」は、Chrome・Edge 144（2026年1月）、Firefox 139（2025年5月）以上で利用可能です。Safariも実装が進められており、今後の対応が見込まれます。

ブラウザだけでなく、サーバーサイドでも使えます。Node.js 26（2026年5月）からは、フラグなしでTemporalが有効です。日付処理はサーバーサイドで実装することも多いため、フロントエンドとバックエンドで同じAPIを使えるのは利点です。

参照：[Can I use…](https://caniuse.com/temporal)

### まとめ

長年変わらなかったJavaScriptの日付処理が、標準APIとしてようやく新しくなります。長く付き合ってきただけに、感慨深いものがあります。

多くのクラスは、表示上の値（Plain系）か、世界共通の時系列の一点（`Instant`・`ZonedDateTime`）のどちらかです。この見分けがつけば、クラス選びで迷うことは少なくなるはず。日付処理は面倒なものだと身構えてきた方こそ、一度触ってみてください。

日付の表示フォーマットについては[『数値や日付をさまざまな形式の文字列に！ toLocaleString()を使ってスマートに変換しよう』](https://ics.media/entry/240529/)も参考になります。あわせてご覧ください。