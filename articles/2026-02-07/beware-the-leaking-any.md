---
title: "Beware the leaking any"
source: "https://tkdodo.eu/blog/beware-the-leaking-any"
publishedDate: "2021-12-04"
category: "frontend"
feedName: "TkDodo"
---

![leaking any](https://tkdodo.eu/blog/static/78c01ff7bc60ab9e07384e22d7193493/bbe0c/leaking-any.jpg "leaking any")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[Any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any) is not among my favourite TypeScript types, but it is the one you will inevitably encounter, if you like it or not. This might not be a problem in some situations, but can be devastating in others. Let's dive into it:

## A short introduction to the type system[](#a-short-introduction-to-the-type-system)

Any is the [top type](https://en.wikipedia.org/wiki/Top_type) in TypeScript's type system (while [never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) would be the bottom type). Think about the types as a big tree, where each child type "extends" its parent, but not the other way around. This is very convenient when you have an object hierarchy, like `Vehicle -> Car`, because every Car is a Vehicle, but not every Vehicle is a Car.

It does however also work on a much simpler level, for example with the string type and a string literal type. Every string literal is a sub-type of the type string:

string-literal-types

```
1let parent: string = 'hello'2let child: 'hello' = 'hello'
```

Here, _child_ would also "extend" _parent_, even though we don't really have a typical inheritance. That's why it's often easier to replace "extends" with "is assignable to" when thinking about types.

> child is assignable to parent, but parent is not assignable to child.

Parent is not assignable to child because it's type is wider. This can be proven by trying to actually assign the variables to each other:

assign-child-to-parent

```
1let parent: string = 'hello'2let child: 'hello' = 'hello'3
4// ✅ ok, as parent is the "wider" type5parent = child6// 🚨 Type 'string' is not assignable to type '"hello"'.(2322)7child = parent
```

We can assign child to parent, because child is assignable to parent, but it doesn't work the other way around.

## So what about any?[](#so-what-about-any)

In any case (pun intended), _any_ would sit at the top of the tree. Everything is assignable to _any_. If we add _any_ to the above example, our tree would be `any -> string -> 'hello'`

any-at-the-top

```
1let top: any = 'hello'2let parent: string = 'hello'3let child: 'hello' = 'hello'4
5// ✅ ok, as parent is the "wider" type6parent = child7// ✅ also fine8top = parent
```

So far so good, and if _any_ sits at the top, it must mean that you cannot assign it to a more narrow type, right? This is where things get weird with _any_:

weird-any

```
1let top: any = 'hello'2let parent: string = 'hello'3let child: 'hello' = 'hello'4
5// 🚨 Type 'string' is not assignable to type '"hello"'.(2322)6child = parent7// 🤯 no type error here8parent = top
```

_Any_ is an exception to this rule, because assignments work both ways, which make _any_ an escape hatch for the compiler. You can literally do _anything_ with it, even things that clearly won't work.

## Unknown to the rescue[](#unknown-to-the-rescue)

In [TypeScript 3.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type), the unknown top type was introduced to fix this. It is like the type-safe big brother to _any_. If we replace _any_ with _unknown_, we get the exact behavior we thought _any_ would give us.

> Anything is assignable to unknown, but unknown isn’t assignable to anything but itself and any

unknown-at-the-top

```
1let top: unknown = 'hello'2let parent: string = 'hello'3let child: 'hello' = 'hello'4
5// ✅ ok, as parent is the "wider" type6parent = child7// ✅ also fine8top = parent9// 🚨 Type 'string' is not assignable to type '"hello"'.(2322)10child = parent11// 🚨 Type 'unknown' is not assignable to type 'string'.(2322)12parent = top
```

This is great, because now we have our real tree structure back with _unknown_ sitting at the top, but it also means it's virtually impossible to do anything meaningful with _unknown_.

But that's okay.

Because we don't know what it is, we have to find that out at runtime first. TypeScript will narrow the type if we perform a type narrowing check:

type-narrowing

```
1let top: unknown = 'hello'2let parent: string = 'hello'3
4if (typeof top === 'string') {5  // ✅ top is of type string now, so it's assignable to parent6  parent = top7}
```

There are many ways to [narrow types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) in Typescript, like using typeof, instanceof, the in operator, checks like Array.isArray or even user defined type guards. Working this way is a much safer approach because it tries to leverage the compiler, not bypass it.

## When any is leaking[](#when-any-is-leaking)

Okay, we've probably all used _any_ from time to time to shut up the compiler, and that's not a problem. There are definitely diminishing returns when trying to go towards 100% type safety, and sometimes, it's just easier for everyone's sanity to disable the compiler via _any_ and write a bunch of unit tests to make sure you don't screw up along the line.

_Any_ becomes problematic when the scope is large, because it will disable the compiler in places you didn't think about. Let's have another look at what the TypeScript docs have to say about _any_:

> When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal.

— [The TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

This basically means if you have an _any_, and you call a function on it, the result will also be _any_. Every property will be _any_. Every function you return it from will then return _any_. If you use the return value of this function in a computation, the result will also be _any_.

All of a sudden, this little _any_ is spreading like wildfire:

leaking-any

```
1const dangerous: any = 52// ✅ inferred to the number literal 53const okay = 54
5// 🚨 result is now `any`6const result = dangerous + okay7
8const dangerous2: any = { title: 'foo' }9const props = { hello: 'world' } as const10
11// 🚨 result2 is now `any` as well12const result2 = {13  ...dangerous2,14  ...props,15} as const
```

Especially the object merging took me by surprise, but it makes sense. You can't build a union type with _any_. Not even the awesome [const assertion](https://tkdodo.eu/blog/the-power-of-const-assertions) will help you here. This is especially dangerous when using it together with React components, as spreading the result of a function that returns _any_ will make all props of that component fall back to _any_:

any-props-spreading

```
1declare function myAnyUtil(input: Record<string, unknown>): any2
3function App(props: Props) {4  // ❗️ no other prop is type checked anymore5  return (6    <button onClick="yes please" {...myAnyUtil(props)}>7      click me8    </button>9  )10}
```

Oops. Because we spread the result of _myAnyUtil_, which returns _any_, onto our _button_, nothing is now type checked (if you are wondering: _onClick_ needs to accept a function, not a string). Remember, jsx is just syntatic sugar for _React.createElement_, so the above code reads:

react-create-element

```
1declare function myAnyUtil(input: Record<string, unknown>): any2
3function App(props: Props) {4  return React.createElement(5    'button',6    { onClick: 'yes please', ...myAnyUtil(props) },7    'click me'8  )9}
```

Now we can clearly see that the _props_ object we pass to our button is widened to _any_, similar to the contrived example above, which is why the _onClick_ prop is also not type-checked.

I believe this to be very dangerous, as its quite hidden. We rely on TypeScript to help us when refactoring, e.g. when altering union types. If I remove the _'secondary'_ variant of my Button component, and TypeScript wouldn't yell at me for all the existing usages, I would be lost in a larger code base.

But with a leaking any on my component, TypeScript would just stay silent. It becomes as useful as a unit test where you forgot to assert anything. It's even worse than plain JavaScript, because you _think_ you're safe - but you're not.

## When can this happen?[](#when-can-this-happen)

I believe it happens more often than you might think, especially if:

-   You're [calling JavaScript from TypeScript](https://tkdodo.eu/blog/calling-java-script-from-type-script) - such functions will very likely just return _any_.
-   You are using a 3rd party library that has weak types ([lodash.get](https://www.npmjs.com/package/lodash.get) for example).
-   You don't annotate your util functions with explicit return values and leak an _any_ from them.

* * *

> With any, you can do anything, but everything is better than any.

— TkDodo

The best advice I can give for situations where you have to use _any_ is to keep it confined to a very small scope to avoid it from leaking. You can also statically analyze your [type-coverage](https://github.com/plantain-00/type-coverage) to get informed about places where _any_ is lurking around. If the coverage decreases on a PR, you might have a problem. Further, avoid 3rd party libraries that are written in JavaScript unless they have very good types. Lastly, ensuring that your own util functions don't leak anything can be achieved by explicitly enforcing return types on them, even though I also like to utilize type inference as much as possible. This is certainly a trade-off you'd need to be willing to make.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)