---
title: "ファイル名正規化とZIPファイルのMIMEタイプの判定 —— ファイルアップロードの実装で遭遇したOS固有の罠"
source: "https://tech.smarthr.jp/entry/2026/03/13/095222"
publishedDate: "2026-03-13"
category: "design"
feedName: "SmartHR Tech Blog"
author: "smarthr_dev"
---

こんにちは、SmartHRのプロダクトエンジニアのksaitoです。今回はファイルアップロードの実装で遭遇した2つの罠について共有します。

1つ目はmacOSのUnicode正規化によるファイル名の不一致、2つ目はWindowsのZIPファイルのMIMEタイプの違いです。

## 🔍 罠1: ファイル名が一致しない!?

[特別徴収税額通知管理機能](https://smarthr.jp/release/20251223_tokubetsuchousyuu)の開発でフォルダアップロードの機能を実装しており、フォルダ名が命名規則に沿っているか検証していました。

このフォルダ名には「パスワード取得用URLファイル」という文字が必ず含まれる想定でした。

以下は実際のプロダクトコードではありませんが、それに近い実装例です。[1](#fn:1)

valid\_files = \[\]

params\[:files\].each\_with\_index do |file, index|
  
  file\_path = params\[:paths\]\[index\]

  if file\_path.include?("パスワード取得用URLファイル")
    valid\_files << file
  end
end

しかし、このコードではmacOSで特定の操作をしたフォルダをアップロードすると、フォルダ名が一致しているように見えるのにアップロードできないという問題が起きました。

### 「パ」と「パ」は違う文字!?

フォルダ名の一致判定が期待した通りに機能しないので、irbで検証しました。[2](#fn:2)

検証結果は以下の通りで一致判定されるケースとそうではないケースがあることがわかります。

"パ" == "パ"
=> true

"パ" == "パ"
=> false

正直、最初は何が起きているのか全く分かりませんでした。しかし、一つずつ検証していくと、意外な事実が見えてきました。

見た目で違いを判別するのが困難なので、文字の内部表現を確認します。

なお、Rubyでは`==`はメソッドとして実装されており、`"パ" == "パ"`は`"パ".==("パ")`と同義です。左辺の`"パ"`がメソッドの呼び出し元（レシーバー）、右辺の`"パ"`がメソッドに渡す値（引数）にあたります。

"パ" == "パ"
=> false

# レシーバーの「パ」
"パ".length
=> 1
"パ".bytesize
=> 3
"パ".codepoints.map { "u%04x" % \_1 }
=> \["u30d1"\]

# 引数の「パ」
"パ".length
=> 2
"パ".bytesize
=> 6
"パ".codepoints.map { "u%04x" % \_1 }
=> \["u30cf", "u309a"\]

見た目は同じ「パ」ですが、文字数やバイト数、コードポイント(Unicodeで各文字に割り当てられた一意の番号)が異なることがわかります。

では、これらのコードポイントが何を表しているのかUnicode文字一覧表で確認します。 `u30d1`は「パ」という文字で、`u30cf`は「ハ」を表します。そして`u309a`は「゚」という文字です。 `u30cf`の「ハ」に`u309a`が結合して「パ」として表示されていることがわかりました。

puts "\\u30d1"
パ
puts "\\u30cf"
ハ
puts " " + "\\u309A"
 ゚
puts "\\u30cf" + "\\u309A"
パ

これまでの検証で、同じ見た目でも文字を構成するコードポイントが異なることがわかりました。

そしてRubyの`String#==`はバイト数で比較するため、コードポイントが異なるとバイト数も異なり、falseとなります。

`String#==`の詳細が気になる方へ

`==`は、[rb\_str\_equal](https://github.com/ruby/ruby/blob/v4.0.0/string.c#L4267-L4277)という関数で定義されており、 文字列の比較は[rb\_str\_eql\_internal](https://github.com/ruby/ruby/blob/v4.0.0/internal/string.h#L183-L195)に実装があります。

以下に抜粋したコードと今回の挙動をコメントで補足しました。

rb\_str\_eql\_internal(const VALUE str1, const VALUE str2)
{
  const long len = RSTRING\_LEN(str1);
  const char \*ptr1, \*ptr2;

  
  if (len != RSTRING\_LEN(str2)) return Qfalse;
  
}

では、なぜ別のコードポイントになって、バイト数が変わるようなことが起きてしまうのでしょうか？

### macOS Finderはファイル名を分解する

ここで[Unicode ConsortiumのFAQ](https://www.unicode.org/faq/normalization.html#4)を確認して、ヒントを探してみると、以下の記載がありました。[3](#fn:3)

> Apple’s old HFS+ file system stores file names in a variant of NFD (the newer APFS doesn’t enforce that anymore), and the macOS Finder still decomposes file names.
> 
> (AIによる日本語訳) Appleの旧ファイルシステムである**HFS+は、ファイル名をNFD（正規化形式D）**の変種で保存します（新しいAPFSでは、もはやそれが強制されなくなりました）。また、macOSのFinderは、現在もファイル名を分解して処理します。

**ファイル名を分解**とは、Unicode正規化における文字の分解を指します。 Unicode正規化には2つの主要な形式があります。NFDは「パ」を「ハ」+「゚」のように分解する形式。NFCはその逆で、分解された文字を「パ」という1文字に再合成する形式です。同じ見た目でも、内部では全く違う表現になるわけです。

macOSのFinderはNFDの変種を使用しており、濁点・半濁点を含む文字（U+3040〜U+30FF 付近）はNFD形式に分解されます。[4](#fn:4)

各OSでのUnicode正規化の形式は以下のようになっています。

OS

正規化形式

Windows

NFC

Linux

NFC

macOS(旧ファイルシステムとFinder)

NFD(変種)

ここまでの情報を整理すると、macOSのFinderはファイル名をNFDの変種で分解して処理することがわかりました。

では、Unicode正規化がコードポイントに影響するのか、NFDとNFCで正規化された「パ」を確認してみましょう。

"パ".unicode\_normalize(:nfd).codepoints.map { "u%04x" % \_1 }
=> \["u30cf", "u309a"\]

"パ".unicode\_normalize(:nfc).codepoints.map { "u%04x" % \_1 }
=> \["u30d1"\]

冒頭の検証結果と同じコードポイントになりました。つまりこの事象の原因は、NFC正規化された文字とNFD正規化された文字を比較していたことにあると結論付けられます。

### Unicode正規化の考慮漏れ

このように、macOSのFinderはファイル名をNFDの変種で分解して処理するため、Unicode正規化を考慮せずに文字列の一致判定を行うと、見た目は同じでもコードポイントが異なるため、一致しないという問題が発生します。

私自身も実装する際に、Finderからファイル名編集でフォルダ名をコピー&ペーストして実装しました。この時にフォルダ名がNFD正規化されたものをコピーしたと考えられます。[5](#fn:5)

この問題を回避するには、Unicode正規化を行い、環境依存をなくしてから比較する必要があります。 幸い、これらの処理を簡単に行えるメソッドがRubyやJavaScriptには用意されています。

-   Ruby: [String#unicode\_normalize](https://docs.ruby-lang.org/ja/latest/method/String/i/unicode_normalize.html)
-   JavaScript: [String.prototype.normalize](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)

これは余談ですが、[Unicode ConsortiumのFAQ](https://www.unicode.org/faq/normalization#4b)には、以下の記載もありました。

> All user-level comparison should behave as if it normalizes the input to NFC. Most binary character matching that affects users should also behave as if it normalizes the input to NFC. Because it is rare to have non-NFC text, an optimized implementation can do such comparison very quickly.
> 
> (AIによる日本語訳）ユーザーレベルの比較はすべて、入力を NFC に正規化したかのように振る舞うべきです。ユーザーに影響を与えるバイナリレベルの文字照合の大部分も、同様に入力を NFC へ正規化したかのように動作させる必要があります。非 NFC 形式のテキストが含まれることは稀であるため、最適化された実装を用いれば、こうした比較処理を非常に高速に行うことが可能です。

Unicode正規化を考慮した実装をする際は、NFCで正規化することが推奨されていることも覚えておくと良いでしょう。

### 改善例

最後に冒頭の実装で示したコードの改善例を示します。 ここでは日本語の濁点・半濁点を含む文字を扱うため、NFC正規化することにします。

valid\_files = \[\]

params\[:files\].each\_with\_index do |file, index|
  
  
  file\_path = params\[:paths\]\[index\].unicode\_normalize(:nfc)

  if file\_path.include?("パスワード取得用URLファイル")
    valid\_files << file
  end
end

フォルダのアップロード機能を実装していると、ZIPファイルがアップロードできないという問題に遭遇しました。

以下は実際のプロダクトコードではありませんが、ライブラリを使用してこれに近い実装をしていました。

const isValidZip = async (file) \=> {
  
  const allowedMimeTypes = \['application/zip'\];
  if (!allowedMimeTypes.includes(file.type)) {
    console.warn(\`MIMEタイプ不一致: ${file.type}\`);
    return false;
  }

  
  const ZIP\_SIGNATURE = \[0x50, 0x4B, 0x03, 0x04\];
  try {
    const buffer = await file.slice(0, 4).arrayBuffer();
    const header = new Uint8Array(buffer);
    
    return header.every((byte, i) \=> byte === ZIP\_SIGNATURE\[i\]);
  } catch (e) {
    return false;
  }
};

このコードだとWindowsのブラウザでMIMEタイプが許可されたものと判定されないため、アップロードできない問題が発生しました。

### WindowsブラウザでZIPファイルのMIMEタイプは`application/zip`ではない

Windows 11のブラウザでZIPファイルのMIMEタイプを確認したところ、`application/x-zip-compressed`になりました。[6](#fn:6)

このため、`application/zip`のみを許可するコードだと、WindowsのブラウザでZIPファイルがアップロードできない問題が発生します。

`application/x-zip-compressed`は、[IANAで登録されている公式のMIMEタイプ](https://www.iana.org/assignments/media-types/media-types.xhtml)ではないのですが、歴史的な経緯によってWindowsでは採用されているため、Windowsもサポートするアプリケーションの場合は許可する必要があります。

### OSごとのZIPファイルのMIMEタイプ

念の為、[SmartHRがサポートしているOSとブラウザ](https://support.smarthr.jp/ja/help/articles/360035170054/)でZIPファイルのMIMEタイプを確認したところ、以下のような結果になりました。

OS

ブラウザ(バージョン)

ZIPファイルのMIMEタイプ

macOS

Google Chrome 145.0.7632.117

application/zip

macOS

Microsoft Edge 145.0.3800.82

application/zip

Windows

Google Chrome 145.0.7632.76

application/x-zip-compressed

Windows

Microsoft Edge 142.0.3595.80

application/x-zip-compressed

予想どおり、macOSでは`application/zip`、Windowsでは`application/x-zip-compressed`という結果になりました。

### 改善例

こちらも実装の改善例を示します。

const isValidZip = async (file) \=> {
  
  const allowedMimeTypes = \['application/zip', 'application/x-zip-compressed'\];
  if (!allowedMimeTypes.includes(file.type)) {
    console.warn(\`MIMEタイプ不一致: ${file.type}\`);
    return false;
  }

  
  const ZIP\_SIGNATURE = \[0x50, 0x4B, 0x03, 0x04\];
  try {
    const buffer = await file.slice(0, 4).arrayBuffer();
    const header = new Uint8Array(buffer);
    
    return header.every((byte, i) \=> byte === ZIP\_SIGNATURE\[i\]);
  } catch (e) {
    return false;
  }
};

## まとめ

今回の開発で最も痛感したのは、「macOSで完璧に動いていたから大丈夫」という油断でした。 幸いこれらの事象は実装段階のマニュアルテストで発見できましたが、サポートしているOSやブラウザでのマニュアルテストの重要性を再認識しました。

またUnicode正規化の件は、濁点や半濁点文字を扱う言語圏でユーザー入力を扱う際には、注意を払う必要があることもわかりました。

## We Are Hiring!

SmartHR では一緒に SmartHR を作りあげていく仲間を募集中です！

少しでも興味を持っていただけたら、カジュアル面談でざっくばらんにお話ししましょう！

[hello-world.smarthr.co.jp](https://hello-world.smarthr.co.jp/)

* * *

1.  実際には複数のファイルをRailsアプリケーションで受け取るのは難しいため、ファイル数の上限を設定しています。[↩](#fnref:1)
2.  `String#include?`も内部的に`String#==`を使用しているため、説明を簡潔にするため`==`で検証します。[↩](#fnref:2)
3.  AIにUnicode正規化やmacOSのファイル名の扱いについて質問してUnicode ConsortiumのFAQにたどり着きました。[↩](#fnref:3)
4.  [https://developer.apple.com/library/archive/qa/qa1173/\_index.html](https://developer.apple.com/library/archive/qa/qa1173/_index.html)[↩](#fnref:4)
5.  macOS Tahoe 26.1においても同様の挙動が確認できました。[↩](#fnref:5)
6.  Parallels Desktop上のWindows 11で確認しました。[↩](#fnref:6)