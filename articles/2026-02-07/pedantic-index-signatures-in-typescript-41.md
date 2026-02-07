---
title: "Pedantic index signatures in TypeScript 4.1"
source: "https://tkdodo.eu/blog/pedantic-index-signatures-in-type-script-4-1"
publishedDate: "2020-09-20"
category: "frontend"
feedName: "TkDodo"
---

![books](https://tkdodo.eu/blog/static/5a2ba76c8ef491afb0aa86084b25aec7/7d769/books.png "books")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

TypeScript 4.1 beta was [announced recently](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/), and it introduces many new and exciting features. While I won't pretend to understand (yet) what you will be able to do with [template literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) (people have built a [JSON parser](https://twitter.com/buildsghost/status/1301976526603206657) _on type level_ with this already 🤯) or [recursive conditional types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#recursive-conditional-types), I'm pretty sure I will be using [pedantic index signature checks](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#no-unchecked-indexed-access) whenever I can.

## What is wrong with index signatures[](#what-is-wrong-with-index-signatures)

If you add an _index signature_ to an object, you tell TypeScript that you don't know exactly which keys will be in that object, you only know which _type_ the key will have. This is very useful if you build objects where you really don't know the keys, for example, normalized objects where the keys are ids of database records:

index-signature

```
1type Widget = {2  id: string3  title: string4}5
6type WidgetIndex = Record<string, Widget>7
8// alternate syntax:9type WidgetIndex = {10  [id: string]: Widget11}
```

So naturally, when you try to retrieve a Widget from that index via it's id, the access _should_ yield `Widget | undefined`. But alas, it does not:

unsafe-access

```
1type Widget = {2  id: string3  title: string4}5
6const widgetIndex: Record<string, Widget> = {7  widget1: { id: 'widget1', title: 'Foo' },8  widget2: { id: 'widget2', title: 'Bar' },9}10
11widgetIndex['helloWorld'].title.toUpperCase()
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA6glgEwOYWFAvFA3gKCvqRALigGdgAnOAOyTwODmABsITyracBfHHAYwD21clADuiFMACS1BBAAeJAEoQhFBAB4ONJABpYk1AD4M2evgnJUARhJZCCEgHIrUm84OMWbKM4BigoLOUNx6FuJGwABM9o4ubqjRnlDerC4AQgCGFCFhPHyJMnKKANrOABYQzMyCMIIUzAjOALoAdGkQHYIAqmCQFADCWaQQABQAlEA)

Yes, TypeScript is perfectly fine with that code, even though this will clearly err at runtime. This is _not_ what I expect from a static type checker that aims at giving you safety at runtime, and I was really surprised when I found out that TypeScript behaves like that (and dare I say: a bit disappointed as well).

And it gets worse. Even if you, as a responsible developer, anticipate that the index access might give you _undefined_ at runtime, and thus implement a fallback, TypeScript will completely ignore it and _not_ type check it at all, because on type level, the index access will _always_ return a value:

unsafe-fallback

```
1type Widget = {2  id: string3  title: string4}5
6const widgetIndex: Record<string, Widget> = {7  widget1: { id: 'widget1', title: 'Foo' },8  widget2: { id: 'widget2', title: 'Bar' },9}10
11const title: string = widgetIndex['helloWorld']?.title ?? {12  thisIs: 'completely Untyped',13}
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA6glgEwOYWFAvFA3gKCvqRALigGdgAnOAOyTwODmABsITyracBfHHAYwD21clADuiFMACS1BBAAeJAEoQhFBAB4ONJABpYk1AD4M2evgnJUARhJZCCEgHIrUm84OMWbKM4BigoLOUNx6FuJGwABM9o4ubqjRnlDerC4AQgCGFCFhPHxCImhpvjq0ZokycooA2s4AFhDMzIIwghTMCM4AugD8AHSlUH192KkNcKTSpC5CALZgrMDNIFAAqtSgkN2hQA)

## SafeRecord to the rescue[](#saferecord-to-the-rescue)

Like many others, I believe this to be a big flaw of the language itself. But luckily, you can always implement your own types and use them instead of _Record_:

safe-record

```
1type SafeRecord<Key extends string | number | symbol, Value> = Record<2  Key,3  Value | undefined4>
```

With that type, all values will also include _undefined_, so whenever you retrieve a value from a _SafeRecord_, you have to check for undefined first. This is a fine solution to the problem, but it has some other drawbacks. For example, calling _Object.values_ on a SafeRecord will now give you an `Array<T | undefined>`, even though it's really impossible for the values to actually be undefined. I still advocate for using SafeRecords whenever an index access is involved.

## What about Arrays?[](#what-about-arrays)

Well, Arrays are just as affected. After all, Arrays are (mostly) just objects where the index is a number.

unsafe-arrays

```
1const strings: Array<string> = ['one', 'two', 'three']2
3strings[999].toUpperCase()
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBNBOBLMBzCAuGBBe8CGAngDwLIoB8MAvDANoDk4ApvQDQz1QDuIbHUAC3hMWAXQBQ40qgi0AnAtEA6KCACqABw1N4AYTwQmACgCUQA)

Oh boy, we should just go back to plain ES6 :(

At least, we are not going to directly access index 999 in Arrays that often. In practice, I have found that when an Array has a variable length, we often want to access the first element of that Array. If I find myself needing to access \[1\] or \[2\] a lot, I can usually use [Tuples](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple).

So how can we fix accessing _strings\[0\]_? Yes, we can do a manual length check upfront, but no one will force us to. Having to think about this every single time is quite brittle and error prone, so can we enforce it on type level?

## NonEmptyList[](#nonemptylist)

The concept of a non empty list exists in many programming languages, e.g. [Haskell](http://hackage.haskell.org/package/NonEmptyList) or [Scala](https://typelevel.org/cats/datatypes/nel.html). It basically means: A list with a length of at least one, so accessing the first element of that list will never fail.

TypeScript 4.0 introduced [variadic tuple types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/#variadic-tuple-types), which let us tackle that specific problem:

non-empty-array

```
1type NonEmptyArray<T> = [T, ...Array<T>]2const isNonEmpty = <T extends unknown>(3  array: Array<T>4): array is NonEmptyArray<T> => array.length > 0
```

This basically gives us a variadic tuple type where the first element is always defined, and a [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) that assures an Array is really non-empty. So if you want to force people to give you a non-empty Array so that you can safely access the first value, just type your function with a _NonEmptyArray_:

forced-empty-check

```
1type NonEmptyArray<T> = [T, ...Array<T>]2const isNonEmpty = <T extends unknown>(3  array: Array<T>4): array is NonEmptyArray<T> => array.length > 05
6const strings: Array<string> = ['one', 'two', 'three']7
8const firstToUpper = (list: NonEmptyArray<string>) => list[0].toUpperCase()9
10// this will type-err11firstToUpper(strings)12
13// this is fine14if (isNonEmpty(strings)) {15  firstToUpper(strings)16}
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAcg9gOwKIFsygIICcsEMQA8AKgHxQC8UA2kQDRQB0T2ehpAugFADGiAzsCgBLPvGRpQFKMSgQAHsAgIAJnygBXBAGsEcAO4ISAClw58ALigt8xEgEpLp1sLVjU6ENbZlyZJ-gYAGyUAc2AACygyAAZOHn5BASwhBBC+Sy8CJJSQn2oAckQIfPp84D04Eqgy8KwIYq54hAEoADMhLAEiOABVMEgsKSNAkWBLNwlPM0Js1PsKMhGBKmj2BmBe-ogsAGFcPggjOziAehOoCJEoPSFAwIvwCABabaxOds7gbr6Bo1m046cM4XcJXK7tBAQThCVpQIwiCYeP7AZKpPh2OxQADenCgeLaHS6m1+-3RnAAvkA)

## \--noUncheckedIndexedAccess[](#--nouncheckedindexedaccess)

What does all of this have to do with TypeScript 4.1 you might ask? Well, as this has been a feature request of many developers over the course of the years, but the change is also quite breaking for many existing apps, the TypeScript team has decided to introduce a new compiler flag with version 4.1. The flag is called [noUncheckedIndexedAccess](https://github.com/microsoft/TypeScript/pull/39560) and it is going to solve the problem for Objects and Arrays alike by making sure that an index access will always return a possibly undefined value. Mapping over an Array or using _Object.values_ will still be safe, so this doesn't suffer from the same drawbacks as the _SafeRecord_ type.

Here is a [link](https://www.typescriptlang.org/play?noUncheckedIndexedAccess=true&ts=4.1.0-dev.20200920#code/PTACDsHsFVwYwBYFM4GskBMCS4NIB6YCCccSAzuQFBVyTjkAuABEwE4CW4A5uQFzMibNgEMAngB52XbgD5mAXmYBtAOT0kqgDTNVjAO6RtuxgjZJNAXRrSe5ZQE4nlgHSMYABw9I2AYRHkSAAUAJRAA) to the latest TypeScript playground beta with that flag enabled so you can play around if you want.

It will still take about two months until that version is released, but I am _really_ looking forward to it. 🎉

* * *

Let me know how you like the new TypeScript beta in the comments below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)