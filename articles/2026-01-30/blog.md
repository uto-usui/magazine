---
title: "Blog を移転しました"
source: "https://blog.jxck.io/entries/2016-01-27/new-blog-start.html"
publishedDate: "2016-01-27"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

長いこと [はてな blog](https://jxck.hatenablog.com/) をメインにし、他にも [Qiita](https://qiita.com/jxck_) や [Tumblr](http://jxck.tumblr.com/) を使って色々書いて来たが、そろそろ自分のドメインに全部集約していこうかと思う。

## [motivation](#motivation)

最近、メディア系は独自のサイトを持つよりも、Medium などのサービス経由で流入してもらわないと辛いという話をよく聞くので、その意味では完全に逆行しているかもしれない。

しかし、別に PV を稼ぐためにブログを書いているわけでもないので、むしろ技術的にも自分で色々試せる自由な環境を持ち、特定のサービスに依存せずやってみるのも良いと考える。

むしろ、ドメイン自体は結構前に取っていたので、遅すぎるくらいなのだが、やっと重い腰を上げた。

まだ作り途中であり、一気に移行するのは難しいが、徐々に作りながらやっていこうと思う。

## [test section](#test-section)

以降は、本サイトのマークアップやスタイルをテストするためのセクションである。

対応している記法を列挙し、挙動を確認する。

### [heading section 3](#heading-section-3)

ここは `<h3>` セクションである。

#### [heading section 4](#heading-section-4)

ここは `<h4>` セクションである。

### [リストスタイル](#リストスタイル)

リストスタイルは 2 つある

1.  ordered list
2.  un-ordered list

それぞれは使うタグが違う

-   ここはリストスタイルである
-   unordered list は `<ul>` を用いて表現する
-   `<li>` の前には markdown と同じく `-` を表示する
    -   入れ子にも対応している
-   しかし 2 段階以上の深さは使わないようにする
    -   リストの中で引用もできる
    -   > ここは `<blockquote>` です
        

### [定義リスト](#定義リスト)

定義リストは `<dl>` を用いて表現する

定義リスト(description list)

`<dl>` を用いる

定義(description term)

`<dt>` を用いる

説明(description details)

`<dd>` を用いる

## [引用](#引用)

引用は `<blockquote>` を用いて表現する。

> 他のサイトなどから引用する場合は `<blockquote>` を用いて表現する。
> 
> 複数行あると `<p>` に展開される
> 
> 引用元の URL は `<cite>` を用いてマークアップする
> 
> — [example.com](https://example.com/)

## [テーブル](#テーブル)

テーブルは `<table>` タグを用いて表現する。

キャプションは必須

範囲

文字数

基本ラテン文字

94

CJK 記号と句読点

11

ひらがな

81

カタカナ

83

半角形と全角形

0

常用漢字

2136

記号

1

不要文字

\- 23

追加更新

13

合計

2396

半角の例

webp と圧縮率

file type

size

ratio

.webp

9474

100%

.webp.gz

2609

28%

.webp.br

2544

27%

## [Image](#image)

画像は `<picture>` タグを用いて表現する。

  ![jxck](https://blog.jxck.io/entries/2016-01-27/jxck.png?210331_115006 "jxck logo")

必ず `.webp` も提供する必要がある。

webp の推奨は以下

```
$ cwebp -q 40 img.png -o img.webp
```

## [Video](#video)

markdown 上は画像と同じ記法で、拡張子が `mp4` の場合は `<video>` で展開する。

必ず `.mp4`、`.webm` 両方を提供する必要がある。

QuickTime で screen record を取り gif 的に表示するなら推奨は以下。

```
# メタデータを消し、frame rate を 24 にし、Audio を消す
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.webm
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.mp4
```

### [サンプルコード](#サンプルコード)

インラインの場合は `<code>` タグを用いて表現する。

コードブロックの場合は `<pre>` と `<code>` を用いて表現する。

```
# デフォルトリクエスト
GET / HTTP/1.1
Host: example.com
User-Agent: browser
Accept-Encoding: br, gz
Accept-Language: ja-JP
```

```
class Test {
  constructor(arg) {
    this.arg = arg
  }
  print() {
    console.log(this.arg)
  }
}

const test = new Test('hello')
test.print() // hello
```

ファイルからコードを読むこともできる。以下ハイライトテスト用。

```
no tag
```

```
hello world
```

```
class Test {
  constructor(arg) {
    this.arg = arg
  }
  print() {
    console.log(this.arg)
  }
}

const test = new Test('hello')
test.print() // hello
```

```
#!/usr/bin/env ruby
`rm *.gz`
`rm result`
`touch result`
(1..10)
  .map { |i| i * 10 }
  .each { |i| `time -v -a -o result zopfli --i#{i} -c loading-css-over-http2.html > loading-css-over-http2.html.#{i}.gz` }
```

```
const URL = require('url').URL;

const u = new URL('https://jxck.io?log=warn&lang=ja');
const searchParams = u.searchParams;
searchParams.get('log') // "warn"
searchParams.getAll('log') // ["warn"]
searchParams.delete('log') // undefined
searchParams.has('log') // false
searchParams.append('debug', true) // undefined
searchParams.toString() // "lang=ja&debug=true"

for ([k, v] of searchParams) {
  console.log(k, v);
  // lang ja
  // debug true
}
```

```
const URL = require('url').URL;

// 日本語ドメイン
const jp = new URL('https://じゃっく.jp');
console.log(jp);
// URL {
//   href: https://xn--y8jr7a5i.jp/
//   protocol: https:
//   hostname: xn--y8jr7a5i.jp
//   pathname: /
// }

// IPv6
const ipv6 = new URL('https://[::1]/');
console.log(ipv6);
// URL {
//   href: https://[::1]/
//   protocol: https:
//   hostname: [::1]
//   pathname: /
// }

// 日本語
const ja = new URL('https://example.com/ぱす?きー=ばりゅー');
console.log(ja);
// URL {
//   href: https://example.com/%E3%81%B1%E3%81%99?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
//   protocol: https:
//   hostname: example.com
//   pathname: /%E3%81%B1%E3%81%99
//   search: ?%E3%81%8D%E3%83%BC=%E3%81%B0%E3%82%8A%E3%82%85%E3%83%BC
// }
```

```
const URL = require('url').URL;

const u = new URL('https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main');
console.log(u);
// URL {
//   href: https://jxck:password@blog.jxck.io/path/to/entry?log=true&lang=ja#main
//   protocol: https:
//   username: jxck
//   password: --------
//   hostname: blog.jxck.io
//   pathname: /path/to/entry
//   search: ?log=true&lang=ja
//   hash: #main
// }
```

```
self.addEventListener('install', (e) => {
  console.log('install');
  e.registerForeignFetch({
    scopes: ['/random/number'], // or self.registration.scope to handle everything
    origins: ['*'] // or ['https://client1.com'] to limit the remote origins
  });
});

self.addEventListener('activate', (e) => {
  console.log('activate');
});

self.addEventListener('fetch', (e) => {
  console.log('fetch');
});

self.addEventListener('foreignfetch', (e) => {
  console.log('foreignfetch');
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        console.log('online response');
        return {
          response,
          origin: e.origin // Make this a CORS response
        };
      })
      .catch(() => {
        console.log('offline response');
        return {
          response: new Response(Math.floor(Math.random()*100)),
          origin: e.origin // Make this a CORS response
        };
      })
  );
});
```

```
const CACHE = "foreign-fetch"
self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    return cache.addAll([
      '.',
      './index.html',
      './worker.js'
    ])
  })())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.info(e.type, e.request)
  e.respondWith((async () => {
    const cache = await caches.open(CACHE)
    const cached = await cache.match(e.request)
    console.log({cached})
    return cached || fetch(e.request)
  })())
})
```

```
callback = console.log.bind(console)
process.on('foo', callback)
process.emit('foo', 'bar')
// bar
process.removeListener('foo', callback)
```

```
callback = console.log.bind(console)
$div = document.createElement('div')
$div.addEventListener('foo', callback)
$div.dispatchEvent(new CustomEvent('foo', {detail:'bar'}))
// CustomEvent {type: "foo", detail: 'bar'...
$div.removeEventListener('foo', callback)
```

```
EventEmitter = require('events')
class Timer extends EventEmitter {
  constructor(interval) {
    super()
    setInterval(() => {
      this.emit('tick', 'tick')
    }, interval)
  }
}

timer = new Timer(100)
timer.on('tick', console.log.bind(console))
```

```
class Timer extends EventTarget {
  constructor(interval) {
    super()
    setInterval(() => {
      this.dispatchEvent(new CustomEvent('tick'))
    }, interval)
  }
}

timer = new Timer(100)
timer.addEventListener('tick', console.log.bind(console))
```

```
function main() {
  // AbortController class が追加される
  const controller = new AbortController()

  // キャンセルを通知するための siganl が取得できる
  const signal = controller.signal

  startSpinner()

  // signal を第二引数に渡す
  fetch(url, {signal})
    .then((res) => {
      // レスポンスの処理
    })
    .catch((err) => {
      if (err.name == 'AbortError') {
        // 中断の場合の処理
        return
      }
      // 中断以外のエラー処理
      console.error(err)
    })
    .then(() => {
      // finally 相当
      stopSpinner()
    })


  // fetch が 1000ms 超えたらコントローラ経由で中断する
  setTimeout(() => {
    controller.abort()
  }, 1000)
}
```

```
class LongTask extends EventTarget {
  start() {
    //...
  }
  stop() {
    //...
  }
}

function longTaskPromise({signal}) {
  return new Promise((resolve, reject) => {
    // 処理の Promise 化
    let longTask = new LongTask()
    longTask.addEventListener('data', resolve)
    longTask.addEventListener('error', reject)
    longTask.start()

    // abort signal のハンドリング
    signal.addEventListener('abort', () => {
      longTask.stop()
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}


function main() {
  // AbortController class が追加される
  const controller = new AbortController()

  // キャンセルを通知するための siganl が取得できる
  const signal = controller.signal

  startSpinner()

  // signal を第二引数に渡す
  longTaskPromise({signal})
    .then((result) => {
      // 結果の正常処理
    })
    .catch((err) => {
      if (err.name == 'AbortError') {
        // 中断の場合の処理
        return
      }
      // 中断以外のエラー
      console.error(err)
    })
    .then(() => {
      // finally
      stopSpinner()
    })


  // fetch が 1000ms 超えたらコントローラ経由で中断する
  setTimeout(() => {
    controller.abort()
  }, 1000)
}
```

```
const controlle = new AbortController()
const signal = controller.signal

// 同じリソースを複数のミラーに問い合わせて
// 一番早く返ってきたやつだけ使いたい的な例
Promise.race([
  fetch(url, {signal}),
  fetch(mirror1, {signal}),
  fetch(mirror2, {signal}),
  fetch(mirror3, {signal}),
]).then((res) => {
  // 最初のレスポンス
  console.log(res)
  // そのままでは残りの fetch も走るので
  // それらを止める。
  controller.abort()
}).catch((err) => {
  if (err.name == 'AbortError') {
    // ここに来るのは race が終わる前に Abort した場合
    // race が終わった後の abort はここに来ない
    return
  }
  // race の失敗
  console.error(err)
})
```

```
#!/usr/bin/env escript
-module(main).

-mode(compile).
-compile(export_all).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).

-define(RtoM(Name, Record), lists:foldl(fun({I, E}, Acc) -> Acc#{E => element(I, Record) } end, #{}, lists:zip(lists:seq(2, (record_info(size, Name))), (record_info(fields, Name))))).

-record(point, {x, y}).
main(_) ->
    Point = #point{x=10, y=20},
    ?Log(Point),
    ?Log(?RtoM(point, Point)),
    ok.
```

```
#!/usr/bin/env ruby
require "base64"
require "json"
require "net/http"
require "openssl"
require "pp"
require "uri"

# ./ct.rb ct.googleapis.com/pilot ./path-to-letsencrypt-live/fullchain.pem
main(*ARGV)

def get_proof_by_hash(host, cert, tree_size, timestamp)
  der = cert.to_der

  blob = [
    0, # prefix (uint8)
    0, # v1 (uint8)
    0, # timestamped_entry (uint8)
    timestamp, # timestamp (uint32)
    0, # x509_entry (uint16)

    # length in 24bit
    (der.size >> 16) & 255,
    (der.size >>  8) & 255,
    (der.size >>  0) & 255,

    der, # der (binary)

    0, # extension (uint16)
  ].pack("C3Q>nC3a*n")

  sha256 = OpenSSL::Digest::SHA256.digest(blob)
  base64 = Base64.encode64(sha256).chomp
  param = URI.encode_www_form("hash" => base64, "tree_size" => tree_size)

  ## Debug
  # puts "timestamp = #{timestamp}"
  # puts "tree_size = #{tree_size}"
  # puts "sha256 = #{OpenSSL::Digest::SHA256.hexdigest(blob)}"
  # puts "base64 = #{base64}"

  uri = URI.parse("https://#{host}/ct/v1/get-proof-by-hash?#{param}")
  request = Net::HTTP::Get.new(uri)
  response = Net::HTTP.start(uri.hostname, uri.port, {use_ssl: true}) do |http|
    http.request(request)
  end

  puts "\e[0;31m$ curl '#{uri}' | jq .\e[0m"
  pp JSON.parse(response.body)
end

def get_sth(host)
  uri    = URI.parse("https://#{host}/ct/v1/get-sth")
  json   = Net::HTTP.get(uri)
  result = JSON.parse(json)

  puts "\e[0;31m$ curl '#{uri}' | jq .\e[0m"
  pp result
end

def add_chain(host, chain)
  uri = URI.parse("https://#{host}/ct/v1/add-chain")
  request = Net::HTTP::Post.new(uri)
  request.content_type = "application/json"

  str = chain.map{|cert|
    cert
      .to_pem
      .gsub("-----BEGIN CERTIFICATE-----\n", "")
      .gsub("-----END CERTIFICATE-----\n", "")
      .gsub("\n", "")
  }

  request.body = JSON.dump({
    "chain" => str
  })

  response = Net::HTTP.start(uri.hostname, uri.port, {use_ssl: true}) do |http|
    http.request(request)
  end

  puts <<-EOS
\e[0;31m$ curl -H 'Content-Type:application/json' \\
       -d '{ "chain": #{str} }' \\
       #{uri} | jq . \e[0m
EOS

  pp JSON.parse(response.body)
end

def main(host = "ct.googleapis.com/pilot", pemfile)
  puts "host = #{host}"
  puts "pemfile = #{pemfile}"
  chain = File.read(pemfile)
    .split("-----END CERTIFICATE-----\n")
    .map{|str| str + "-----END CERTIFICATE-----\n"}
    .map{|str| OpenSSL::X509::Certificate.new(str) }

  tree_size = get_sth(host)["tree_size"]
  puts ""
  timestamp = add_chain(host, chain)["timestamp"]
  puts ""
  get_proof_by_hash(host, chain[0], tree_size, timestamp)
end
```

```
curl -H 'Content-Type:application/json' \
     -d '{ "chain": ["MIIFvTCCBKWgAwIBAgISA6/EsoaosazyV8VTiLTZMzBzMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xODAzMDYwNjA5MDZaFw0xODA2MDQwNjA5MDZaMBIxEDAOBgNVBAMTB2p4Y2suaW8wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7UnbgMfyQOVAqOp9oNjcoHZ2p0H0sUkFERYzZ2VXXJRkg7QzFrZTAP7jdxw/HEhkMJTMNlX59cvEyxiEbgNqTLYQjwSP1Ibgtkjzq2EPlm2SsFkq6vwbuydZA31HQa2vEYqZzo9RUG69T4URUotmtZBTWqW5w8m9l9xwCuInzOxS8990rVW27FiWtSF+4HI/mBTzHAX/w1dJRaT9ESrWJnmKYcYCBayCswEfp9b6uOgNWASZBd67lKE2AfE0FDdgKclElttBbvK8Kl2TNpCzwRwwzt54Bt9AFt8MZr4p4SKUjuj5GkcFrlnvyESbXJuyZwnnUCNkbxxYP0LfsgfmnAgMBAAGjggLTMIICzzAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFMnlleIsgD60xDmW8Pz/yWKKPjk4MB8GA1UdIwQYMBaAFKhKamMEfd265tE5t6ZFZe/zqOyhMG8GCCsGAQUFBwEBBGMwYTAuBggrBgEFBQcwAYYiaHR0cDovL29jc3AuaW50LXgzLmxldHNlbmNyeXB0Lm9yZzAvBggrBgEFBQcwAoYjaHR0cDovL2NlcnQuaW50LXgzLmxldHNlbmNyeXB0Lm9yZy8wgd0GA1UdEQSB1TCB0oINYWRtaW4uanhjay5pb4ILYXBpLmp4Y2suaW+CDGJsb2cuanhjay5pb4INZmlsZXMuanhjay5pb4IHanhjay5pb4IMbGFiMi5qeGNrLmlvggxsYWJzLmp4Y2suaW+CDGxvZ28uanhjay5pb4INcmFpbHMuanhjay5pb4IScmVwb3J0LXVyaS5qeGNrLmlvggtzZnUuanhjay5pb4INc2xpZGUuanhjay5pb4IMc3BlYy5qeGNrLmlvggp3cy5qeGNrLmlvggt3d3cuanhjay5pbzCB/gYDVR0gBIH2MIHzMAgGBmeBDAECATCB5gYLKwYBBAGC3xMBAQEwgdYwJgYIKwYBBQUHAgEWGmh0dHA6Ly9jcHMubGV0c2VuY3J5cHQub3JnMIGrBggrBgEFBQcCAjCBngyBm1RoaXMgQ2VydGlmaWNhdGUgbWF5IG9ubHkgYmUgcmVsaWVkIHVwb24gYnkgUmVseWluZyBQYXJ0aWVzIGFuZCBvbmx5IGluIGFjY29yZGFuY2Ugd2l0aCB0aGUgQ2VydGlmaWNhdGUgUG9saWN5IGZvdW5kIGF0IGh0dHBzOi8vbGV0c2VuY3J5cHQub3JnL3JlcG9zaXRvcnkvMA0GCSqGSIb3DQEBCwUAA4IBAQA6Tnb6wxUgQE7mnf8N+5PgIzC5ebxjGps/I2ppEqnvuAECdrkWySdqPDG8e7lyuyxzzav6FTFUb3y8EwDrdT+UDquewpv6TxoP1NcnuMRhpjV41Y/otxRW53+Fz+g+Ub4XTnrJmK98aq8vzyMpvkWhHPMfs2xRsIkNH6L/T0h+8AL7MpKLiuqiy9SA4COVjNLX5Z2ZyK/xPaNhfJ1jv7vs/fvIGNLtJ7sCwVa54r8OycNVd1nj9zVFmtJ554S3fRBNFI5vZNJJw4npN1/q1bQ1B7oo8U1pLunDxqhvNHO247WDRVBeCvJLuZGZJc4g35W97iUTVVbwPLVfK4o82MOD", "MIIEkjCCA3qgAwIBAgIQCgFBQgAAAVOFc2oLheynCDANBgkqhkiG9w0BAQsFADA/MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMTDkRTVCBSb290IENBIFgzMB4XDTE2MDMxNzE2NDA0NloXDTIxMDMxNzE2NDA0NlowSjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxIzAhBgNVBAMTGkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnNMM8FrlLke3cl03g7NoYzDq1zUmGSXhvb418XCSL7e4S0EFq6meNQhY7LEqxGiHC6PjdeTm86dicbp5gWAf15Gan/PQeGdxyGkOlZHP/uaZ6WA8SMx+yk13EiSdRxta67nsHjcAHJyse6cF6s5K671B5TaYucv9bTyWaN8jKkKQDIZ0Z8h/pZq4UmEUEz9l6YKHy9v6Dlb2honzhT+Xhq+w3Brvaw2VFn3EK6BlspkENnWAa6xK8xuQSXgvopZPKiAlKQTGdMDQMc2PMTiVFrqoM7hD8bEfwzB/onkxEz0tNvjj/PIzark5McWvxI0NHWQWM6r6hCm21AvA2H3DkwIDAQABo4IBfTCCAXkwEgYDVR0TAQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwfwYIKwYBBQUHAQEEczBxMDIGCCsGAQUFBzABhiZodHRwOi8vaXNyZy50cnVzdGlkLm9jc3AuaWRlbnRydXN0LmNvbTA7BggrBgEFBQcwAoYvaHR0cDovL2FwcHMuaWRlbnRydXN0LmNvbS9yb290cy9kc3Ryb290Y2F4My5wN2MwHwYDVR0jBBgwFoAUxKexpHsscfrb4UuQdf/EFWCFiRAwVAYDVR0gBE0wSzAIBgZngQwBAgEwPwYLKwYBBAGC3xMBAQEwMDAuBggrBgEFBQcCARYiaHR0cDovL2Nwcy5yb290LXgxLmxldHNlbmNyeXB0Lm9yZzA8BgNVHR8ENTAzMDGgL6AthitodHRwOi8vY3JsLmlkZW50cnVzdC5jb20vRFNUUk9PVENBWDNDUkwuY3JsMB0GA1UdDgQWBBSoSmpjBH3duubRObemRWXv86jsoTANBgkqhkiG9w0BAQsFAAOCAQEA3TPXEfNjWDjdGBX7CVW+dla5cEilaUcne8IkCJLxWh9KEik3JHRRHGJouM2VcGfl96S8TihRzZvoroed6ti6WqEBmtzw3Wodatg+VyOeph4EYpr/1wXKtx8/wApIvJSwtmVi4MFU5aMqrSDE6ea73Mj2tcMyo5jMd6jmeWUHK8so/joWUoHOUgwuX4Po1QYz+3dszkDqMp4fklxBwXRsW10KXzPMTZ+sOPAveyxindmjkW8lGy+QsRlGPfZ+G6Z6h7mjem0Y+iWlkYcV4PIWL1iwBi8saCbGS5jN2p8M+X+Q7UNKEkROb3N6KOqkqm57TH2H3eDJAkSnh6/DNFu0Qg=="] }' \
     https://ct.googleapis.com/pilot/ct/v1/add-chain | jq .

curl 'https://ct.googleapis.com/pilot/ct/v1/get-sth' | jq .

curl 'https://ct.googleapis.com/pilot/ct/v1/get-proof-by-hash?hash=odRjuexWzJ36zh8XavhDEZaUhoAv9yxRF4zEyKZiVVg%3D&tree_size=237363285' | jq .
```

```
package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/binary"
	"encoding/pem"
	"io/ioutil"
	"log"
	"os"
)

func init() {
	log.SetFlags(log.Lshortfile)
}

var p = log.Println

func main() {
	// fullchain.pem を読み込む
	path := os.Args[1]
	file, _ := ioutil.ReadFile(path)

	// チェインの各証明書をデコード
	var chain []*pem.Block
	for {
		var block *pem.Block
		block, file = pem.Decode(file)
		if block == nil {
			break
		}
		chain = append(chain, block)
	}

	// enum { v1(0), (255) } Version;
	type Version uint8
	var v1 Version = 0

	// enum { timestamped_entry(0), (255) } MerkleLeafType;
	type MerkleLeafType uint8
	var timestamped_entry MerkleLeafType = 0

	// timestamp
	var timestamp uint64 = 1520467826187

	// enum { x509_entry(0), precert_entry(1), (65535) } LogEntryType;
	type LogEntryType uint16
	var x509_entry LogEntryType = 0

	buf := bytes.NewBuffer([]byte{})

	// prefix
	var prefix uint8 = 0
	binary.Write(buf, binary.BigEndian, prefix)

	// MerkleTreeLeaf
	binary.Write(buf, binary.BigEndian, v1)
	binary.Write(buf, binary.BigEndian, timestamped_entry)

	// TimestampedEntry
	binary.Write(buf, binary.BigEndian, timestamp)
	binary.Write(buf, binary.BigEndian, x509_entry)

	// opaque ASN.1Cert<1..2^24-1>;
	// 24bit length
	var certlen uint32 = uint32(len(chain[0].Bytes))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>16&255))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>8&255))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>0&255))
	// cert
	binary.Write(buf, binary.BigEndian, chain[0].Bytes)

	// opaque CtExtensions<0..2^16-1>;
	var extension uint16 = 0
	binary.Write(buf, binary.BigEndian, extension)
	p(len(buf.Bytes()), buf.Bytes())

	// MTH({d(0)}) = SHA-256(0x00 || d(0)).
	// prefix=0x00 はすでに加えてある
	hash := sha256.Sum256(buf.Bytes())
	log.Printf("%x", hash)

	p(base64.URLEncoding.EncodeToString(hash[:]))

	// この hash をつけてリクエスト
	p("curl 'https://ct.googleapis.com/rocketter/ct/v1/get-proof-by-hash?hash=xxx&tree_size=yyy'")
}
```

```
Content-Security-Policy: default-src 'self' report-uri https://report-uri.example.com
```

```
Content-Security-Policy: default-src 'self' report-to=default-endpoint
Feature-Policy: syncxhr 'none' report-to=default-endpoint
NEL: {"report-to": "default-endpoint", "max-age": 2592000}
Report-To: {
             "group": "default-endpoint",
             "max-age": "36000",
             "endpoints": [
               {"url": "https://report-uri.example.com"},
               {"url": "https://report-uri2.example.com"}
             ]
           }
```

```
const observer = new ReportingObserver((reports, observer) => {
  const message = JSON.stringify(reports)
  navigator.sendBeacon("https://report-uri.example.com", message)
});

observer.observe();
```

```
Report-To: {
             "max_age": 36000,
             "endpoints": [
               {
                 "url": "https://reports.example.com/default-endpoint"
               }
             ]
           },
           {
             "group": "csp-endpoint",
             "include_subdomains": true,
             "max_age": 36000,
             "endpoints": [
               {
                 "url": "https://reports.example.com/csp-endpoint1",
                 "priority": 1,
                 "weight": 50
               },
               {
                 "url": "https://reports.example.com/csp-endpoint2",
                 "priority": 1,
                 "weight": 50
               },
               {
                 "url": "https://failover.example.com/csp-endpoint",
                 "priority": 2
               }
             ]
           }
```

```
Content-Security-Policy: default-src 'self' report-to=csp-endpoint
Feature-Policy: syncxhr 'none' report-to=default
NEL: {"report-to": "default", "max-age": 2592000}
Report-To: {
             "group": "default",
             "max_age": 36000,
             "endpoints": [{ "url": "https://reports.example.com/default-endpoint" }]
           },
           {
             "group": "csp-endpoint",
             "endpoints": [{ "url": "https://reports.example.com/csp-endpoint" }]
           }
```

```
POST /default-endpoint HTTP/1.1
Host: reports.example.com
Content-Type: application/reports+json
Content-Length: 999

[
  {
    "type": "csp",
    "url": "https://example.com/csp.html/",
    "body": {...}
  },
  {
    "type": "nel",
    "url": "https://example.com/nel.html/",
    "body": {...}
  },
  {
    "type": "hpkp",
    "url": "https://example.com/hpkp.html/",
    "body": {...}
  },
]
```

```
{
  "type": "deprecation",
    "url": "https://blog.jxck.io/entries/2018-05-15/webauthentication-api.html",
    "body": {
      "id": "ChromeLoadTimesWasAlternateProtocolAvailable",
      "anticipatedRemoval": null,
      "message": "chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
      "sourceFile": "chrome-extension://mpbpobfflnpcgagjijhmgnchggcjblin/content.js",
      "lineNumber": 5,
      "columnNumber": 19
    }
}

{
  "type": "deprecation",
    "age": 27,
    "url": "https://example.com/",
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
    "body": {
      "id": "websql",
      "anticipatedRemoval": "1/1/2020",
      "message": "WebSQL is deprecated and will be removed in Chrome 97 around January 2020",
      "sourceFile": "https://example.com/index.js",
      "lineNumber": 1234,
      "columnNumber": 42
    }
}
```

```
// device_scale_factor = DPR
// source_size = sizes attr value
static ImageCandidate PickBestImageCandidate(float device_scale_factor, float source_size, Vector<ImageCandidate>& image_candidates, Document* document = nullptr) {
  const float kDefaultDensityValue = 1.0;
  bool ignore_src = false;

  // 画像がなければ無視
  if (image_candidates.IsEmpty()) {
    return ImageCandidate();
  }

  // 画像ごとに表示領域に対する密度を計算(1.0 だとフィット)
  // http://picture.responsiveimages.org/#normalize-source-densities
  for (ImageCandidate& image : image_candidates) {
    if (image.GetResourceWidth() > 0) {
      float gensity = (float)image.GetResourceWidth() / source_size;
      image.SetDensity(gensity);
      ignore_src = true;
    } else if (image.Density() < 0) {
      image.SetDensity(kDefaultDensityValue);
    }
  }

  // 密度でソート
  std::stable_sort(image_candidates.begin(), image_candidates.end(), CompareByDensity);

  Vector<ImageCandidate*> de_duped_image_candidates;
  float prev_density = -1.0;

  // 同じ密度を省く?
  for (ImageCandidate& image : image_candidates) {
    if (image.Density() != prev_density && (!ignore_src || !image.SrcOrigin())) {
      de_duped_image_candidates.push_back(&image);
    }
    prev_density = image.Density();
  }

  // SelectionLogic で画像を選択
  // Save Data してる場合は一番小さいの、ここでは無視
  // unsigned winner = blink::WebNetworkStateNotifier::SaveDataEnabled() && base::FeatureList::IsEnabled(blink::features::kSaveDataImgSrcset) ? 0 : SelectionLogic(de_duped_image_candidates, device_scale_factor);
  unsigned winner = SelectionLogic(de_duped_image_candidates, device_scale_factor);
  DCHECK_LT(winner, de_duped_image_candidates.size());
  winner = AvoidDownloadIfHigherDensityResourceIsInCache(de_duped_image_candidates, winner, document);

  float winning_density = de_duped_image_candidates[winner]->Density();
  // 16. If an entry b in candidates has the same associated ... pixel density
  // as an earlier entry a in candidates,
  // then remove entry b
  while ((winner > 0) && (de_duped_image_candidates[winner - 1]->Density() == winning_density))
    --winner;

  return *de_duped_image_candidates[winner];
}
```

```
// device_scale_factor = DPR
static unsigned SelectionLogic(Vector<ImageCandidate*>& image_candidates, float device_scale_factor) {
  unsigned i = 0;

  for (; i < image_candidates.size() - 1; ++i) {
    unsigned next = i + 1;
    float next_density;
    float current_density;
    float geometric_mean;

    next_density = image_candidates[next]->Density();

    // next の密度が DSF より小さいならまだ先をみる必要
    if (next_density < device_scale_factor) {
      continue;
    }

    // next の密度が DSF より大きい、つまり表示に十分だとわかった
    // そこで curr とのどっちを表示するかを考える
    current_density = image_candidates[i]->Density();

    // そのために幾何平均をまず取る
    geometric_mean  = sqrt(current_density * next_density);

    // curr が DPR より低くても、 DPR が 1 なら next を使う
    // もしくは
    // Geo が DSF より小さいなら next
    // (そうでないなら curr)
    if (((current_density < device_scale_factor) && (device_scale_factor <= 1.0)) || (geometric_mean <= device_scale_factor)) {
      return next;
    }
    break;
  }
  return i;
}
```

```
<!DOCTYPE html>
<meta charset=utf-8>
<title>Service Worker</title>

<h1>Service Worker</h1>

<a href=test>test</a>

<input id=test type=button value=test>

<script src=master.js></script>
```

```
<!DOCTYPE html>
<meta charset=utf-8>
<title>Service Worker Push Demo | labs.jxck.io</title>

<link rel=manifest href=manifest.json>

<script src=master.js></script>

<h1>Push DEMO</h1>
```

```
// master.js
navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  // register sync
  document.getElementById('button').addEventListener('click', () => {
    registration.sync.register('sync-data').then(() => {
      console.log('sync registered');
    }).catch(console.error.bind(console));
  });
}).catch(console.error.bind(console));
```

```
// worker.js
self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (e) => {
  console.log('sync', e);
});
```

```
console.log('master');

document.getElementById('button').addEventListener('click', () => {
  fetch('/test');
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
});
```

```
console.info('worker');

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.log(path);
  if (path === '/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

```
console.log('master');

let controllerChange = new Promise((resolve, reject) => {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    resolve(navigator.serviceWorker.controller);
  });
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then(() => {
  if (navigator.serviceWorker.controller) {
    return navigator.serviceWorker.controller;
  }
  return controllerChange;
}).then((controller) => {
  console.log(controller);
  fetch('/test');
});
```

```
console.info('worker');

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path === '/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

```
'use strict';
let p = console.log.bind(console);

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true });
}).then((subscription) => {
  console.log(subscription);

  const endpoint = subscription.endpoint;
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
  const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

  // send to server
  const body = {endpoint, userAuth, userPublicKey};

  console.log(body);

}).catch(console.error.bind(console));
```

```
self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (e) => {
  console.info('push', e);
  const message = e.data.text();

  e.waitUntil(self.registration.showNotification('title', {
    body: message,
    icon: '/service-worker/push/jxck.png',
    tag:  'push-demo',
  }));
});

self.addEventListener('notificationclick', (e) => {
  console.info('notificationclick', e.notification.tag);
  e.notification.close();
  const URL = 'https://labs.jxck.io/service-worker/push/';
  e.waitUntil(clients.matchAll({
      type: 'window'
    }).then((windowClients) => {
      let target = windowClients.filter((client) => {
        return client.url === URL;
      });
      console.log(target, target.length);
      if (target.length > 0) {
        // タブが開いているので、最初のものにフォーカスする
        return target[0].focus();
      }
      // タブが開いてないので開く
      return clients.openWindow(URL);
  }));
});
```

```
'use strict';

let push = require('web-push');

const GCM_API_KEY = '*******';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
  "endpoint": "********",
  "userAuth": "********",
  "userPublicKey": "******"
}

push.sendNotification(data.endpoint, {
  payload:       'push test for service worker',
  userAuth:      data.userAuth,
  userPublicKey: data.userPublicKey,
})
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.error('fail', err);
});
```

```
console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });

  return navigator.serviceWorker.ready;
}).then((registration) => {
  setInterval(() => {
    console.log('update()');
    registration.update();
  }, 1000);
});
```

```
console.info('worker');

const ver = 1;

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path.indexOf('test') > -1) {
    e.respondWith(new Response('test'));
  }
  return;
});

self.addEventListener('push', () => {
  self.registration.update();
});
```

```
console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });
  return navigator.serviceWorker.ready;
});
```

```
console.info('worker');

const ver = 1;

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path === '/service-worker/updatefound/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

          `.token.atrule                .token.attr-name             .token.attr-value            .token.bold                  .token.boolean               .token.builtin               .token.cdata                 .token.char                  .token.class-name            .token.comment               .token.constant              .token.deleted               .token.doctype               .token.entity                .token.entity                .token.function              .token.important             .token.important             .token.inserted              .token.italic                .token.keyword               .token.namespace             .token.number                .token.operator              .token.parameter             .token.prolog                .token.property              .token.punctuation           .token.regex                 .token.selector              .token.string                .token.symbol                .token.tag                   .token.url                   .token.variable`