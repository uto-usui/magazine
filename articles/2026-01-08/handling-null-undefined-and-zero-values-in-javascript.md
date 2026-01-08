---
title: "Handling Null, Undefined and Zero Values in JavaScript"
source: "https://css-irl.info/handling-null-undefined-and-zero-values-in-javascript/"
publishedDate: "2023-11-08"
category: "css"
feedName: "CSS IRL"
---

In JS, it’s easy to get caught out when determining if a variable is null, undefined, or has a value of zero. I do a lot of data visualisation, and quite often I’ll need to filter out null values from an array of data.

```
data.filter((value) => !!value)
```

The problem is, this is also going to filter out values of `0` too, because is tests whether the value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). (Other falsy values include empty strings, and `NaN`.)

A better way might for this particular case might be to filter out non-numerical values instead:

```
data.filter((value) => typeof value === 'number')
```

Logical operators can be handy for providing default values. Using the `||` (**or**) operator, the `message` text will read “Unknown days since last post” if the `daysSinceLastPost` value doesn’t exist.

```
const message = `${daysSinceLastPost || 'Unknown'} days since last post`
```

The issue here is that if `daysSinceLastPost` is `0`, the text will read “Unknown days since last post” too! Instead, we could use the `??` operator, otherwise known as the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

```
const message = `${daysSinceLastPost ?? 'Unknown'} days since last post`
```

That way, `daysSinceLastPost` will be used, even if the value is `0`, while our fallback will be used if it is `null` or `undefined`.

Put even more simply: In the following example, `test1` will evaluate to `'Test 1'`, while `test2` will evaluate to`0`. Nice!

```
const test1 = 0 || 'Test 1'
const test2 = 0 ?? 'Test 2'

console.log(test1) // 'Test 1'
console.log(test2) // 0
```