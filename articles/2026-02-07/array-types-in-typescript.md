---
title: "Array Types in TypeScript"
source: "https://tkdodo.eu/blog/array-types-in-type-script"
publishedDate: "2023-08-19"
category: "frontend"
feedName: "TkDodo"
---

![two fighting polar bears](https://tkdodo.eu/blog/static/d5b8293d785b84d4d6c160d0195ccc4b/bbe0c/array-vs-generic.jpg "two fighting polar bears")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Earlier this year, [Matt Pocock](https://twitter.com/mattpocockuk) ran a poll about the usage of `Array<string>` (generic syntax) vs `string[]` (array syntax), and the result of that poll was quite baffling to me:

[

![Avatar for mattpocockuk](https://tkdodo.eu/blog/static/0cf5945993cc665dd78ff20bd9b582eb/2f83b/mattpocockuk.jpg)

Matt Pocock

@

mattpocockuk

What do you use more often in TS?

Array<string>14.7%**string\[\]**78.7%🍿6.6%3,179 votes · Final results

\-

Jul 5, 2022



](https://x.com/mattpocockuk/status/1544083145833717767)

To be clear, there is absolutely no functional difference between the two notations. It seems that its just personal preference about which one to choose. Whatever you do, please make sure to turn on the [array - type](https://typescript-eslint.io/rules/array-type/) eslint rule to use either one of the notations consistently.

That said - more than 78 % of people on Twitter are just flat out wrong. I don't usually deal with absolutes like that, because there's always nuance and tradeoffs involved. In this case, I'm quite sure the generic notation is a lot better, if not to say strictly better.

Whenever this question comes up and someone prefers the array notation, I show the arguments and cases where it falls short, and they are pretty much instantly convinced. But before that, let's look at the one argument that always comes up and that's likely the only one in favor of the array notation:

## It's shorter[](#its-shorter)

That's it. That's the advantage. Fewer characters to write. As if keeping code short was ever a good indicator for maintainability. `let` has fewer characters than `const` - does that mean we use `let` everywhere? Okay, I'm aware of _that_ debate as well, but let's not go there too. 😂

But seriously - `i` is shorter than `index`, `d` is shorter than `dashboard` and so on. Something being short does not make it better. We know that we read code way more often than we write it, so we shouldn't focus on making it easy to write - it should be easy to read, which brings me right to the first advantage of the generic notation:

## Readability[](#readability)

We usually read from left to right, so the things that are more important should come first. We say: "this is an array of strings", or "this is an array of strings or numbers".

left-to-right

```
1// ✅ reads nice from left to right2function add(items: Array<string>, newItem: string)3
4// ❌ looks very similar to just "string"5function add(items: string[], newItem: string)
```

This is especially important if the type in our array is rather long, e.g. because it was inferred from somewhere. IDEs usually show array types with the array notation, so sometimes, when I hover over an array of objects, I get this:

options-array

```
1const options: {2  [key: string]: unknown3}[]
```

To me, this reads like `options` is an object, and only at the very end, I can see that it's actually an array. It gets worse if the object has lots of properties, because that will make the content longer and will give the popover a scrollbar - making it nigh impossible to see the `[]` at the end. Granted, this might be a tooling problem, but one that wouldn't exist if we'd show this as what it is: An array of objects. It's not even that much longer when it's spread over multiple lines:

array-of-options

```
1const options: Array<{2  [key: string]: unknown3}>
```

Anyway, moving on, because this is not the only advantage of the array notation

## Readonly Arrays[](#readonly-arrays)

Let's face it - most arrays that we take as input to our functions should be `readonly` to avoid accidental mutation. I'm also touching that topic [in a separate article](https://tkdodo.eu/blog/the-power-of-const-assertions#use-readonly-everywhere). If you use the generic notation, you can just replace `Array` with `ReadonlyArray` and move on. If you use the array notation, you have to split it up into two parts:

readonly-arrays

```
1// ✅ prefer readonly so that you don't accidentally mutate items2function add(items: ReadonlyArray<string>, newItem: string)3
4// ❌ "readonly" and "Array" are now separated5function add(items: readonly string[], newItem: string)
```

This is not such a big deal, but `readonly` being a reserved word that only works on arrays and tuples is weird to begin with when we have a [built - in utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) that does the same thing. And splitting up `readonly` and `[]` really hurts the flow when reading.

* * *

Those issues were just the warm - up, let's get to the really annoying things:

## Union types[](#union-types)

What happens if we widen our `add` function to also accept numbers - so we'd want an Array of strings or numbers. Not a problem with the generic notation:

array-of-unions

```
1// ✅ works exactly the same as before2function add(items: Array<string | number>, newItem: string | number)
```

With the array notation however, things start to get weird

string-or-number-array

```
1// ❌ looks okay, but isn't2function add(items: string | number[], newItem: string | number)
```

If you can't spot the error immediately - that's part of the problem. It's so hidden that it takes some time to see. Let's help out by actually implementing that function and look at the error we're getting:

not-assignable

```
1// ❌ why doesn't this work 😭2function add(items: string | number[], newItem: string | number) {3  return items.concat(newItem)4}
```

shows the following error:

Type 'string' is not assignable to type 'ConcatArray<number> & string' (2769)

[TypeScript playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBQygUwLYDOAXIgVAE4xgDmiAPomCHgEY7kDaAugDSM4B3AJK48JMpRr1GzNuQCUiAN4BYAFCJE2fAQB0EBBGRQMYQSPzz1AX3VA)

This doesn't mean _anything_ to me, at all. To solve the puzzle: it's about operator precedence. The `[]` binds stronger than the `|` operator, so now we've made `items` to be of type `string` OR `number[]`.

What we want is: `(string | number)[]`, with parentheses, to make our code work. The generic version doesn't have this problem because it separates `Array` from its content with the angle brackets anyway.

Still not convinced that the generic syntax is better? I got one last argument:

## keyof[](#keyof)

Let's look at a fairly common example where we have a function that takes an object, and we also want to pass an Array of possible keys of this object to the same function. We would need this if we'd want to implement a function like `pick` or `omit`:

pick

```
1const myObject = {2  foo: true,3  bar: 1,4  baz: 'hello world',5}6
7pick(myObject, ['foo', 'bar'])
```

We would only want to allow existing keys to be passed as the second argument, so how could we do that? With the [keyof type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html):

pick-generic-notation

```
1function pick<TObject extends Record<string, unknown>>(2  object: TObject,3  keys: Array<keyof TObject>4)
```

Of course, all works well when we use the generic syntax for our Array. But what happens if we change it to the array syntax?

pick-array-notation

```
1function pick<TObject extends Record<string, unknown>>(2  object: TObject,3  keys: keyof TObject[]4)
```

Surprisingly, there is no error, so this should be good. No error is even worse, because there is an error here - it just doesn't show up at the function declaration - it shows up when we try to invoke it:

```
1pick(myObject, ['foo', 'bar'])
```

now yields:

Argument of type 'string\[\]' is not assignable to parameter of type 'keyof TObject\[\]'.(2345)

[TypeScript playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABxhA1gHgCoHkBGAVgKbSLEAeUxYAJgM6IBKpcATrZvVGzGAOYAaROHRg4AdzAA+aQAo4RUlABciPEujD0xAJ701O3XGDqCJaAG0AugEpEAbwC+AWABQ7iAm6IAtrvNlRABeR3dERGA4ODUeEGJBcMR8AEM2NQBGRLcI1IAvNQByAAtiABsyuEQJdjLaQuzXDzdUDDl-QK1ES0KouAbEQtS2QutEW3cgA)

What, why? That message makes even less sense than the one from before. When I first got this error in a real codebase, I stared at it for a good 5 minutes. Why wouldn't my keys be strings?

I tried changing stuff left and right, extracting types to type aliases to maybe get better errors, but with no success. And then it hit me: It's another issue with parentheses, isn't it?

Yes, it is. And that's sad. Because why do I even care about that? To this day, I don't know what would be a legal input for `keyof TObject[]`. I couldn't figure it out. I just know that the correct way to define what we want is: `(keyof TObject)[]`

fixed-array-notation

```
1function pick<TObject extends Record<string, unknown>>(2  object: TObject,3  keys: (keyof TObject)[]4)
```

Thanks for nothing, stupid syntax.

* * *

So, I think these were all the issues I ran into when working with the array notation. I think it's sad that it's the default setting in the aforementioned eslint rule, and that most people are still preferring it - probably because of that.

It's also sad that IDEs and the TypeScript Playground show types in that notation, even if they are clearly defined differently:

![type ArrayOfObject = Array<typeof myObject> is shown as type ArrayOfObject = { foo: boolean; bar: number; baz: string; }[]](https://tkdodo.eu/blog/static/2ab4d2ccc691ed15af71f247c756d5a9/1995d/array-of-object.png "type ArrayOfObject = Array<typeof myObject> is shown as type ArrayOfObject = { foo: boolean; bar: number; baz: string; }[]")

Maybe this article can help to convince the community that the generic notation is better, and maybe there is a way to collectively move to it as the default we're using and that we want to see. Then maybe, just maybe, tools will follow.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)