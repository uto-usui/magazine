---
title: "No love for boolean parameters"
source: "https://tkdodo.eu/blog/no-love-for-boolean-parameters"
publishedDate: "2021-02-28"
category: "frontend"
feedName: "TkDodo"
---

![boolean](https://tkdodo.eu/blog/static/f3b77119458208462b29c0eebd2ca805/bbe0c/boolean.jpg "boolean")

-   [한국어](https://www.datoybi.com/no-love-for-boolean-parameters)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Ah, booleans. 0 or 1, true or false. Always either one of them, never something in between. So simple and predictable. At the end of the day, all code we write winds up in lots of zeros and ones.

There is nothing wrong with booleans per se. We use them for conditions every day:

boolean-condition

```
1// ✅ boolean condition2if (user.age() < legalAge) {3  return 'Sorry, you are too young to use this service'4}
```

But using them for parameters to a function can be an indication of bad design for various reasons:

## Single responsibility principle[](#single-responsibility-principle)

A function should do one thing, and one thing only. Passing a "flag" to it often indicates that a function does two things at once, thus violating [this principle](https://en.wikipedia.org/wiki/Single-responsibility_principle). For example:

single-responsibility

```
1// 🚨 booleans as a function parameter2function createReport(user: User, sendEmail: boolean) {3  // create the report here4  const reportData = ...5
6  if (sendEmail) {7    sendReport(user.email, reportData)8  }9  return reportData10}
```

There seem to be some cases where we want to send the report as email directly after creating it, and some cases where we don't. But why entangle this in the _createReport_ function? That function should only create the report, and nothing else. The caller can decide what they want to do with it.

## They are confusing[](#they-are-confusing)

Flags can be confusing, especially in languages where you don't have named parameters. Take for example this signature of [equals](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/equals.html) from the Kotlin standard library:

equals-with-ignore-case-flag

```
1fun String?.equals(other: String?, ignoreCase: Boolean): Boolean2
3// Returns true if this string is equal to other, optionally ignoring character case.
```

As opposed to the first example, the function doesn't do two things at once, it does one thing in two different _variations_ - an important difference. This can be highly confusing when you have to read the call-side that looks something like this:

???

```
1"foo".equals("bar", true)2"foo".equals("bar", false)
```

How should we know what `true` means in this context. Even worse, what would `false` mean? Does it maybe negate the equals comparison? _Scala_ has solved this differently with two methods: [equals](https://www.scala-lang.org/api/2.12.3/scala/collection/immutable/StringOps.html#equals\(x$1:Any\):Boolean) and [equalsIgnoreCase](https://www.scala-lang.org/api/2.12.3/scala/collection/immutable/StringOps.html#equalsIgnoreCase\(x$1:String\):Boolean). Each does one only one thing - no guesswork here.

### More guesswork[](#more-guesswork)

Before you look it up [here](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/lang/Iterable.html#sort\(boolean,%20groovy.lang.Closure\)) - what do you think this boolean flag on Groovy's `List.sort` method means:

sort

```
1["hello","hi","hey"].sort(false) { it.length() }
```

In case it isn't obvious to everyone:

-   `mutate` - false will always cause a new list to be created, true will mutate lists in place

Totally logical and intuitive api, not confusing at all 🤷‍♂️

## Impossible states[](#impossible-states)

Booleans make it easy to create impossible states. Suppose you have a _metric_ of some sorts, and you want to format that. It might be a "normal" number, but it might also be a percentage value. So you decide to model the formatting function like this:

format-metric

```
1function formatMetric(value: number, isPercent: boolean): string {2  if (isPercent) {3    return `${value * 100}%`4  }5  return String(metric)6}
```

This is rather rudimentary number formatting function, but apart from that, it doesn't look too bad. Frankly, the first "flag" you add to a function usually looks _very innocent_.

### The second flag[](#the-second-flag)

Requirements change over time (as they tend to do), and now we have to support currencies for some of our metrics as well. Starting from the above formatting function, we are tempted to add _another_ flag, `isCurrency`

🚨-currency-formatting

```
1function formatMetric(2  value: number,3  isPercent: boolean,4  isCurrency: boolean5): string {6  if (isPercent) {7    return `${value * 100}%`8  }9  if (isCurrency) {10    return // imagine some currency formatting is returned here11  }12  return String(metric)13}
```

Our code works, we write tests, add the currency flag if we have a currency metric, and all is well.

Except it isn't.

Adding one boolean doesn't add _one more state_ - the amount of states grow exponentially. Two booleans means four states, three booleans means eight possible states etc. What happens if we call our above function with:

```
1formatMetric(100, true, true)
```

The answer is: you can't know. It's an implementation detail which flag is checked first. It's also an _impossible state_: A metric cannot be _percent_ and _currency_ at the same time. Such impossible states are frequently introduced with boolean parameters. I recently encountered a function with 8 booleans as input - turns out, it only had 3 actual states, the rest were variations thereof.

### Resist the urge[](#resist-the-urge)

To avoid impossible states, resist the urge of adding the _first_ boolean parameter. It is infinitely easier for humans to extend existing patterns instead of recognizing anti-patterns and refactoring them. If there is one boolean, there will be a second. If we start of with an enumeration of possible states, it is much more likely that this will be extended instead:

✅-metric-variant

```
1function formatMetric(value: number, variant?: 'percent'): string {2  if (variant === 'percent') {3    return `${value * 100}%`4  }5  return String(metric)6}
```

Now we can extend the variant to `'percent' | 'currency'`, and only have three states to work with instead of four. Of course, you can also explicitly include the default (_standard_) variant instead of using _undefined_.

### Moar advantages[](#moar-advantages)

Further advantages of a single variant property include:

-   Better type safety  
    We've already covered readability, but it's also very easy to mix flags up, and because they have the same type (boolean), the compiler won't tell you about it. You can work around this by using a single options object, which is quite popular in JavaScript.
    
-   Exhaustive matching  
    I've written about [exhaustive matching in TypeScript](https://tkdodo.eu/blog/exhaustive-matching-in-type-script) before, and it also comes in very handy in this example. The compiler will then tell us where we need to adapt our code when we add a new variant. CDD, compiler-driven-development:
    

exhaustive-variants

```
1type MetricVariant = 'standard' | 'percent' | 'currency'2function formatMetric(3  value: number,4  variant: MetricVariant = 'standard'5): string {6  switch (variant) {7    case 'percent':8      return `${value * 100}%`9    case 'currency':10      return // imagine some currency formatting is returned here11    case 'standard':12      return String(metric)13  }14}
```

We also do the same when creating React components, or have you seen a Button with an _isPrimary_ and _isSecondary_ flag? Of course not - because how can they be both at the same time?

button-variants

```
1// 🚨 Don't do this2<Button isPrimary isSecondary />3
4// ✅ Do this5<Button variant="primary" />
```

## The wrong abstraction[](#the-wrong-abstraction)

Oftentimes, flags are added because we see similarities to existing code, and we don't want to repeat ourselves, keeping everything [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

-   Here is a function that looks almost like what I want, I just need to add this one flag, because it's slightly different.
-   This component looks like I could use it for my case as well, I just need a _withPadding_ property added so that it fits.

There is lots of good literature available on that topic, showing why we shouldn't do this and what we could do instead:

-   [The wet codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase)
-   [Inversion of control](https://kentcdodds.com/blog/inversion-of-control)
-   [AHA programming](https://kentcdodds.com/blog/aha-programming)
-   [The wrong abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

I can recommend them all, and for starters, resist the urge of adding the next boolean parameter to your codebase.

* * *

No matter if you like booleans, or not, or both at the same time, leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)