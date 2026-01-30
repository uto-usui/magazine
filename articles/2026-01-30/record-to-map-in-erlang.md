---
title: "record to map in Erlang"
source: "https://blog.jxck.io/entries/2018-01-14/erlang-record-to-map.html"
publishedDate: "2018-01-14"
category: "web-standards"
feedName: "blog.jxck.io"
---

## [Intro](#intro)

Record を Map に変換するだけのマクロ

## [?RtoM](#rtom)

`record_info()` を使ってキーを取るが、指定する record のタイプが動的には取れないので、マクロにして展開する。

```
-define(RtoM(Name, Record), lists:foldl(fun({I, E}, Acc) -> Acc#{E => element(I, Record)} end, #{}, lists:zip(lists:seq(2, (record_info(size, Name))), (record_info(fields, Name))))).
```

使い方

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