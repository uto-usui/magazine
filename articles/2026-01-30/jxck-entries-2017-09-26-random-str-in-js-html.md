---
title: "ブラウザで適当なランダム文字列"
source: "https://blog.jxck.io/entries/2017-09-26/random-str-in-js.html"
publishedDate: "2017-09-26"
category: "web-standards"
feedName: "blog.jxck.io"
---

## ブラウザで適当なランダム文字列

## [Intro](#intro)

テストや仮実装で、適当なランダム文字列が欲しい場合に便利なスニペット。

## [\[new\] random string with toBase64](#new-random-string-with-tobase64)

```
// Base64 URL without Padding
crypto.getRandomValues(new Uint8Array(16)).toBase64({omitPadding: true, alphabet: "base64url"})
```

## [random string with btoa](#random-string-with-btoa)

[DEMO](https://labs.jxck.io/snippets/random.html)

```
// with random
btoa(Math.random())
// => MC44NzEwODQwMjA1NDA2MTE4

// with crypto
btoa(crypto.getRandomValues(new Uint8Array(16)))
// => MjQ2LDE0NSwxNzAsMjQ0LDY4LDg3LDMzLDE0NiwxNzcsNjAsMTUyLDE3MSwxNTAsMTcsMTA4LDEwNA==

// base64 has `=` remove them
btoa(Math.random()).replace(/=/g, "")
// => MC45NTM0NTM2OTY3MTc5MDY0

// lower case
btoa(Math.random()).toLowerCase()
// => mc43ndy1odizmjg5ndq4otm0

// align length
btoa(Math.random()).substring(0, 10)
// => MC42NjgwND

// letter only
btoa(crypto.getRandomValues(new Uint8Array(16))).replace(/[0-9]/g, "").replace(/=/g, "")
// => MTELDMLDksMTMwLDEMywxMzgsNzUsMjQzLDENCwyMDcsMjALDIMiwxNDEsMjILDYLDIMg

// number only
crypto.getRandomValues(new Uint8Array(16)).join("")
// => 24066186112482432389420313011522520523361145
```