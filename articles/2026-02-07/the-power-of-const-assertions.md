---
title: "The power of const assertions"
source: "https://tkdodo.eu/blog/the-power-of-const-assertions"
publishedDate: "2020-10-08"
category: "frontend"
feedName: "TkDodo"
---

![power](https://tkdodo.eu/blog/static/150ce318fef23eadb0b544bd95cd93f5/bbe0c/power.jpg "power")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) were introduced in TypeScript 3.4 (March 2019), so they are not exactly new, yet I have seen that many developers are still unaware of that feature.

Maybe it's the syntax that makes it a bit weird sometimes (writing `const something = ... as const`). It might also be it's the resemblance to type assertions that make people afraid of using them. Or possibly, you just got some weird errors regarding _readonly_, so you decided to not dig deeper.

In this article, I'd like to clear up the confusion and crush all doubts about const assertions.

## const assertions are _not_ type assertions[](#const-assertions-are-not-type-assertions)

Type assertions are, simply put, evil. They are meant to tell the compiler: "I know what I am doing, and I know it better than you".

Frankly, most of the time, developers _do not_ know better than the compiler. So unless there is a really good reason, do not use type assertions.

Here are some examples of what type assertions allow you to do:

type-assertions

```
1type Foo = 'foo'2const foo = 'bar' as Foo3
4type Obj = { foo: Foo }5const obj = {} as Obj
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYg9nKBeKByAZg1BYAUAYzgDsBnYKTRFVAIwEMAnVKOk2BPPUSKAeRoBWyKAG8KCAFztEAXzyFS5OIOEiZLNvwF4gA)

TypeScript is fine with that, because the types sufficiently overlap (string with 'foo' and object with Obj). Of course, that is just false, but by using type assertions, the compiler will yield to you.

This can be troublesome, even in cases where you think you are right. Consider the following example:

strings-inferred

```
1type Variant = 'primary' | 'secondary'2
3type Props = {4  variant: Variant5}6
7const Component = (props: Props) => void 08
9const props = { variant: 'primary' }10
11Component(props)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWACgPRIoAFBOmEpYoAbw5RJUAG6IU6AFyw5aYBwC+HDvVSUMAYToEwDCOhEAKfIMpL+NgJRYAfDLpJGUAAxb2OvVDWQiKiMiqKuPhIRAgkUJqc7IbGpuhWAkIOQA)

Here, the compiler will complain with:

```
1Argument of type '{ variant: string; }' is not assignable to parameter of type 'Props'.2  Types of property 'variant' are incompatible.3    Type 'string' is not assignable to type 'Variant'.(2345)
```

because variant will be inferred to string. TypeScript is doing this because nothing stops you from re-assigning another string to variant:

re-assign-object-properties

```
1type Variant = 'primary' | 'secondary'2
3type Props = {4  variant: Variant5}6
7const Component = (props: Props) => void 08
9const props = { variant: 'primary' }10props.variant = 'somethingElse'11
12Component(props)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWACgPRIoAFBOmEpYoAbw5RJUAG6IU6AFyw5aYBwC+HDvVSUMAYToEwDCOhEAKfIMpL+NgJRYAfDLpJGUAAxb2OvVDWQiKiMiqKuPhIRAgkUJrsQZQAdLLIqiI4lEYQwAAWSKgA5gCiADbUbJzshsam6FYCQg5AA)

Even though we define a _const_, objects in JavaScript are still mutable, so inferring the string literal 'primary' would be wrong. A type assertion would solve this:

type-asserting-props

```
1type Variant = 'primary' | 'secondary'2
3type Props = {4  variant: Variant5}6
7const Component = (props: Props) => void 08
9const props = { variant: 'primary' } as Props10
11Component(props)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWACgPRIoAFBOmEpYoAbw5RJUAG6IU6AFyw5aYBwC+HDvVSUMAYToEwDCOhEAKfIMpL+NgJRYAfDLpJGUAAxb2OvVDWQiKiMiqKuPhIRAgkUOpQcML2Qr6GxqboVgJCDkA)

All good - except, it isn't. For the same reasons I mentioned earlier, if we remove primary from our _Variant_ type, we will not get a type error here. This means that, like many solutions, this is something that works now, but is not very future proof.

Making your software resilient to change is, in my opinion, one of the true benefits of using TypeScript. Achieving resilience requires the right mindset, which includes abandoning type assertions.

For this scenario, the easiest solution (assuming that inlining the object is not an option) would be to use an explicit type annotation rather than a type assertion:

annotating-props

```
1type Variant = 'primary' | 'secondary'2
3type Props = {4  variant: Variant5}6
7const Component = (props: Props) => void 08
9const props: Props = { variant: 'primary' }10
11Component(props)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWACgPRIoAFBOmEpYoAbw5RJUAG6IU6AFyw5aYBwC+HDvVSUMAYToEwDCOhEAKfIMpL+NgJRYAfDLpJGUAAxb2OvVDWQnYCQiKiMiqKuPhIRAgkUJqc7IbGpuhWoZQOQA)

This is likely what most of you are doing right now, and it is perfectly fine regarding type safety.

## Using const assertions[](#using-const-assertions)

I still think that fixing the issue with const assertions is the preferred way of doing it:

const-assertions

```
1type Variant = 'primary' | 'secondary'2
3type Props = {4  variant: Variant5}6
7const Component = (props: Props) => void 08
9const props = { variant: 'primary' } as const10
11Component(props)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWACgPRIoAFBOmEpYoAbw5RJUAG6IU6AFyw5aYBwC+HDvVSUMAYToEwDCOhEAKfIMpL+NgJRYAfDLpJGUAAxb2OvVDWQiKiMiqKuPhIRAgkUOpQcML+apzshsam6FYCQg5AA)

This comes in handy if you don't have the type available for annotation, for example, because it has not been exported from a library you are using. The syntax is also more terse, and using const assertions has other benefits as well. Because you are signalling TypeScript that your object is _really_ constant, the compiler can make better assumptions about your intentions:

-   strings and numbers can be inferred as their literal counterparts
-   arrays become tuples with a fixed length
-   everything is readonly, so you cannot accidentally mutate it afterwards (looking at you, _Array.sort_)

This will give you a ton of flexibility when working with that constant on type level.

Consider the following example:

constant-options-array

```
1type Variant = 'primary' | 'secondary'2type Option = { id: Variant; label: string }3
4const options: Array<Option> = [5  {6    id: 'primary',7    label: 'The primary option',8  },9  {10    id: 'secondary',11    label: 'The seondary option',12  },13]
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAaghgJwJZwHbCgXigcjMgW0RBygB9cBnCAYwHtUATYnAWAChRIoB5MYJAyxQA3lCSMAXLEQp0AbigAbOACMIS6ZWDJUAcygBfDh3qptUOv0HnpAQQQI4IADx8BDAHzCA2hygBov6BIRLSeIQsADTBIQEq6pq4ACoAFtD4SEQIIJbWDDgx7CGGRSEisXFhVLQMzDmFlSEJGuFp0NR1xHkeqI3FgaUcALpAA)

So far, so easy. If we want to add another variant, we just have to add it to the Variant type _and_ to the options Array. This is fine as long as the code is co-located, and because we have explicitly annotated the options Array, but it can also become quite boilerplate-y pretty fast. With const assertions, you can just grab the type from the options Array:

extract-it

```
1const options = [2  {3    id: 'primary',4    label: 'The primary option',5  },6  {7    id: 'secondary',8    label: 'The seondary option',9  },10] as const11
12type Variant = typeof options[number]['id']
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCAOUCW4IwLwwNoFgBQMhMA3vkeTEgCYBcMA5PAE5IC2AhkwJ70A0ZFQgBt2AIwCmQuvQAqAC3ExmbTlziIUYPgMIBffgSKlDg6tIjjQYKqu0mKIiVIbzFF8De7rk4O+X34ALow7GhW0Pj4UFzwigBqnEjsYLCY0bEgAGbemhBYYACurBJMgVj01PSBQA)

We are basically telling the compiler: Walk through every item of options and give me the type of the id. Much terser syntax, the type will still be correctly inferred to `primary | secondary`, and we now have one single source of truth.

Of course, this only works because of the const assertion, and if you remove it or forget it, _Variant_ will just be of type string. This is a problem because it relies on developers not making mistakes, and if we wanted to rely on that, we could also just write JavaScript.

Luckily, we can also tell the compiler to only make this work with readonly Arrays:

ensure-readonly

```
1const options = [2  {3    id: 'primary',4    label: 'The primary option',5  },6  {7    id: 'secondary',8    label: 'The seondary option',9  },10] as const11
12type EnsureReadonlyArray<T> = T extends Array<any>13  ? never14  : T extends ReadonlyArray<any>15  ? T16  : never17export type ExtractValue<18  T extends ReadonlyArray<any>,19  K extends keyof T[number]20> = EnsureReadonlyArray<T>[number][K]21
22type Variant = ExtractValue<typeof options, 'id'>
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCAOUCW4IwLwwNoFgBQMhMA3vkeTEgCYBcMA5PAE5IC2AhkwJ70A0ZFQgBt2AIwCmQuvQAqAC3ExmbTlziIUYPgMIBffgSKlDg6tIjjQYKqu0mKIiVIbzFF8De7rk4O+X34ALow7GhW0Pj4UFzwigCikACuTOIASuLsVOBCXACCTEzsXAA8MgB8GDAyMOIAHlDi1mj5hSXsYFxlOjAA-DBg4gBu4kzddNV1DU0w6ZnZeQVFxe2d3X0yY-1DI-h18CBMsNGxMHH1hcBQAGrsQonixd0T9Y1UaLNZYDktSytlBuQANI1F7TADW4i4IAAZlUsGBEqwJExAvgKpgEhBkmkMp9vosSuV4YjkYEsIDUXgojFFDcWO1YBjzuxLjc7g9juIYd5NBBeAxqPQykA)

This is admittedly a bit hackish, as it relies on the fact that const assertions make everything readonly. But it will make sure that Variant is inferred to _never_ if you forget the const assertion, and that means you won't be able to use it anywhere. I'll take that safety any day (and tuck _ExtractValue_ away in a util).

## Use readonly everywhere[](#use-readonly-everywhere)

Finally, I'd like to point out something that became more apparent to me since I am constantly using const assertions:

> Make everything readonly per default

— TkDodo

The thing is: You _can_ pass a mutable Array or Object into a method that takes a readonly Array or Object, but _not_ the other way around. The reason is quite simple: if my function accepts an _Array_, the function might mutate it, so you cannot pass a _ReadonlyArray_ to it.

prefer-readonly

```
1const getFirst = (param: Array<string>): string => param.sort()[0]2
3const strings = ['foo', 'bar', 'baz'] as const4
5getFirst(strings)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBA5gUygMQJYCdowLwwBQAOAhukQLYBcMAguqQJ4A806qYcAfAJRUttw4OMYqTIA6CCHRQ8XANoAGALoBYAFDrQkWH3YQcMOQHIAZiBBGANDCMAjElZv2AXkaUwi+rdHXrEKDGg8XTgILiA)

Even if you wouldn't sort the Array, it would still error with:

```
1Argument of type 'readonly ["foo", "bar", "baz"]' is not assignable to parameter of type 'string[]'.2  The type 'readonly ["foo", "bar", "baz"]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.(2345)
```

By making the parameter readonly, we just guarantee that we are not mutating it (which is always good - don't mess with function parameters) and we make people's lives easier if they are using const assertions in the process.

If you are a library author, I strongly recommend making all inputs to your functions readonly.

* * *

Do you also prefer const assertions? Leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)