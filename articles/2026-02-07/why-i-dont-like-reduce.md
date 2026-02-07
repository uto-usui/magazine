---
title: "Why I don't like reduce"
source: "https://tkdodo.eu/blog/why-i-dont-like-reduce"
publishedDate: "2020-09-09"
category: "frontend"
feedName: "TkDodo"
---

09.09.2020 — [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script), [Array](https://tkdodo.eu/blog/tags/array), [reduce](https://tkdodo.eu/blog/tags/reduce) — 3 min read

![swiss knife](https://tkdodo.eu/blog/static/1dc1ed7acf79826a20f3449c7b11c88b/4af63/swiss-knife.png "swiss knife")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

The popular [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) recently added a [no-array-reduce](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md) rule, and it is set to _error_ per default. The argument is that Array.reduce will likely result in code that is hard to reason about, and can be replaced with other methods in most cases (Read [this twitter thread](https://twitter.com/jaffathecake/status/1213077702300852224) for a lengthy discussion if you like).

I have to say: I wholeheartedly agree, and I have personally turned on that rule in some projects.

## What is wrong with reduce?[](#what-is-wrong-with-reduce)

For me, there are many reasons why I rarely like to see reduce when reviewing code. First and foremost, it is hard to grasp. I believe one of the reasons for this is that reduce can do _way too much_.

-   Need to sum up values?
-   Need to transform Arrays into Objects?
-   Need to build a string?

Array.reduce can do it all.

While it might sound nice to have such a tool at your disposal, when looking at something implemented with reduce, you don't immediately see what that code is for.

What also adds to the confusion for me is that you cannot read reduce from left to right, top to bottom - at least not in JavaScript. Whenever I see reduce, I usually skim to the very end to get ahold of the _initial value_, because it will tell me what this reduce is trying to do. Then, I can go back to the beginning and try to understand it.

This is not the case in other languages, for example _scala_, where the initial value is the first parameter:

sum-a-list

```
1val numbers = List(1, 2, 3)2
3numbers.fold(0)(_ + _) // 6
```

[Try me in scastie](https://scastie.scala-lang.org/UShgOD5BRd6ymtKr7VliUQ)

Reduce is so mighty, you can implement all the other Array functions you are using on a daily basis with it:

map-with-reduce

```
1const mapWithReduce = (array, callback) =>2  array.reduce((accumulator, currentValue, index) => {3    accumulator[index] = callback(currentValue, index, array)4    return accumulator5  }, [])6
7mapWithReduce([1, 2, 3], (value) => value * 2) // 2, 4, 6
```

I have even seen people re-implement _join_ with reduce:

join-with-reduce

```
1const joinWithReduce = (array, delimiter) =>2  array.reduce(3    (accumulator, currentValue, index) =>4      accumulator +5      currentValue +6      (index === array.length - 1 ? '' : delimiter),7    ''8  )9
10joinWithReduce(['foo', 'bar', 'baz'], ';') //foo;bar;baz
```

The question is: why would you? For almost all cases, there are methods that:

-   are not as powerful, with a limited scope
-   have a clear API
-   have a good name, so you know what it is doing

_Array.join_ is a very good example of such a limited method. Everyone understands what is going on when we read:

`values.join(';')`

Compare that to the above implementation - I think we can agree that the simplicity is preferred.

## When is it okay to reduce?[](#when-is-it-okay-to-reduce)

For me, (mostly) only when implementing reusable util methods. It usually doesn't matter _how_ they are implemented. You give them a good name, a clear purpose, write some tests and that's it.

Most usages of reduce I was reviewing lately fall in one of three categories:

### 1\. Transforming Arrays to Objects[](#1-transforming-arrays-to-objects)

Yes, there is no easy native way to do that, and not even popular util libraries like _lodash_ have no good way of achieving this ([keyBy](https://lodash.com/docs/4.17.15#keyBy) is okay, but doesn't transform values).

In one project, we frequently had the need for such transformations, so we made our own util for it. The implementation is something like this:

to-object

```
1export const toObject = <T, K extends string | number | symbol, V>(2  array: ReadonlyArray<T>,3  iteratee: (element: T, index: number, array: ReadonlyArray<T>) => [K, V]4): Record<K, V> =>5  array.reduce((result, element, index) => {6    const [key, value] = iteratee(element, index, array)7    result[key] = value8    return result9  }, {} as Record<K, V>)10
11toObject(['foo', 'bar', 'baz'], (element) => [12  'key-' + element,13  'value-' + element,14])
```

Good name, strong types, ease of use. The rest is implementation detail (including the type assertion for the initial value).

### 2\. Grouping Arrays[](#2-grouping-arrays)

Again, pick a util library ( [lodash](https://lodash.com/docs/4.17.15#groupBy), [ramda](https://ramdajs.com/docs/#groupBy), [remeda](https://remedajs.com/docs#groupBy), ...) or write your own util. Encapsulate that complex reduce so that you don't have to re-implement it every time you need it.

### 3\. Do many things at once[](#3-do-many-things-at-once)

Iterating over big lists many times _can_ be costly, so people often fallback to reduce because it can do everything in one go.

The truth is: usually, _it doesn't matter_. Even when working with very large lists (tens of thousands of entries), I have made the experience that performance is rarely negatively impacted as long as you keep iterations linear.

If your toObject util does _one_ iteration with a reduce or _two_ iterations with a _map_ followed by _Object.fromEntries_ is irrelevant, _unless_ you have [measured it](https://reacttraining.com/blog/react-inline-functions-and-performance) and found it to be a bottleneck.

## Reduce performance pitfalls[](#reduce-performance-pitfalls)

Talking about performance and linear iterations, I've learned the hard way _not_ to do this when working with reduce:

immutability-🎉

```
1export const toObject = <T, K extends string | number | symbol, V>(2  array: ReadonlyArray<T>,3  iteratee: (element: T, index: number, array: ReadonlyArray<T>) => [K, V]4): Record<K, V> =>5  array.reduce((result, element, index) => {6    const [key, value] = iteratee(element, index, array)7    return {8      ...result,9      [key]: value,10    }11  }, {} as Record<K, V>)
```

Why should I be _dirty_ and mutate the result, when I can be super fancy instead and create a new object every time. 🤔🤦‍

[Here](https://jsbench.me/svkevt492x/1) is a perf analysis how the two compare when run over an Array with 10k entries:

1.700 operations per second vs. 47 operations per second.

Yes, it's _that_ slow, because it has to re-create an ever-growing object with every iteration. It will get exponentially slower the more entries the array has. Mutation is not the root of all evil, it does _not_ have to be avoided at all costs. If the scope is small, and the intent is clear - mutate away. 🚀

But still - avoid reduce

* * *

Do you like reduce or not? Let me know in the comments below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)