---
title: "Stress testing Biome's noFloatingPromises lint rule"
source: "https://vercel.com/blog/stress-testing-biomes-nofloatingpromises-lint-rule"
publishedDate: "2025-09-04"
category: "frontend"
feedName: "Vercel"
author: "Dimitri Mitropoulos"
---

6 min read

Sep 4, 2025

Recently we [partnered](https://biomejs.dev/blog/vercel-partners-biome-type-inference/) with the [Biome](https://biomejs.dev/) team to strengthen their `noFloatingPromises` [lint rule](https://next.biomejs.dev/linter/rules/no-floating-promises/) to catch more subtle edge cases. This rule prevents unhandled Promises, which can cause silent errors and unpredictable behavior. Once Biome had an early version ready, they asked if we could help stress test it with some test cases.

At Vercel, we know good tests require creativity just as much as attention to detail. To ensure strong coverage, we wanted to stretch the rule to its limits and so we thought it would be fun to turn this into a friendly internal competition. Who could come up with the trickiest examples that would still break the updated lint rule?

Part of the fun was learning together, but before we dive into the snippets, let’s revisit what makes a Promise “float”.

## [Link to heading](#what-is-a-floating-promise)What is a floating Promise?

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is “floating” when it’s created in a way that its errors can never be handled or observed. A Promise is not considered floating if it’s awaited, assigned to a variable, returned from an async function, called with the [`void` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void), or has `.then(...).catch(...)` handlers.

This lint rule is important because broken control flow and unhandled errors resulting from floating Promises are notoriously hard to catch. Many engineers have campfire stories of floating Promises taking down production.

With that in mind, let’s look at some of the edge cases our engineers came up with.

## [Link to heading](#array-of-promises)Array of Promises

Let’s kick it off with a great example of “smarter not harder”. This snippet was taken directly from [`typescript-eslint`’s docs](https://typescript-eslint.io/rules/no-floating-promises/#examples) for their floating Promises rule.

```
[1, 2, 3].map(async (x) => x + 1)
```

It might look harmless, but it's tricky because the array of Promises is never stored or awaited, leaving all inner Promises floating.

## [Link to heading](#promise-like-objects)Promise-like objects

Normally, TypeScript knows that if you return a `Promise`, a linter can catch it when it floats:

```
function normalPromise(): Promise<number> {  return new Promise((_, reject) => reject(2))}normalPromise() // linter warns: floating Promise
```

But if you return a `PromiseLike` ([PromiseLike is a TypeScript built-in](https://github.com/microsoft/TypeScript/blob/e635bb97f59c892f62c5061cbfeab5af211d743c/src/lib/es5.d.ts#L1519)), it’s only structurally similar, not the real thing:

```
function promiseLike(): PromiseLike<number> {  return new Promise((_, reject) => reject(2))}promiseLike() // floating Promise
```

Since `PromiseLike` is only a structural match, calling `promiseLike()` and ignoring its rejection leaves an unhandled async result floating in space.

`typescript-eslint` handles this kind of case with a special [configuration option](https://typescript-eslint.io/rules/no-floating-promises/#checkthenables) for “Thenables” (another name for what `PromiseLike` represents)

## [Link to heading](#structural-typing-tricks)Structural typing tricks

By copying [the TypeScript structure for a Promise](https://github.com/microsoft/TypeScript/blob/e635bb97f59c892f62c5061cbfeab5af211d743c/src/lib/es5.d.ts#L1532) under a different name, you can sneak past naïve checks.

```
/** a direct copy of the TypeScript `Promise` type, but with a different name */interface Duck<T> {	then<TResult1 = T, TResult2 = never>(		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null	): Promise<TResult1 | TResult2>	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>}function promise(): Duck<string> {	return new Promise((_, reject) => reject(2))}promise()  // floating Promise (thenable)
```

You’ve made a new type called `Duck` that looks exactly like a `Promise`, just with a different name. Because TypeScript uses [“structural”](https://en.wikipedia.org/wiki/Structural_type_system) typing, `Duck` behaves like a Promise but slips past lint rules that only check names. The name itself is a nod to “duck typing”, referencing the old idiom “if it walks like a duck, and talks like a duck, then it's a duck”.

## [Link to heading](#conditional-type-aliases)Conditional type aliases

Now we’re getting to the fun stuff: type-level trickery. Normally, TypeScript knows when you’re returning a Promise directly:

```
async function promiseLike() {  return new Promise((_, reject) => reject(2))}promiseLike() // linter warns: floating Promise
```

But if you wrap the `Promise` inside a generic alias with a conditional, it doesn’t look like a plain Promise anymore.

```
type Cheating<T extends 1> = T extends 1 ? Promise<string> : Promise<string>async function promiseLike(): Cheating<1> {	return new Promise((_, reject) => reject(2))}promiseLike() // floating Promise
```

Although `Cheating<T>` always resolves to a `Promise<string>`, the conditional type and type parameter make that less obvious at the call site. If the lint rule only checks keys on the literal Promise name (instead of “thenables”), `promiseLike(): Cheating<1>` can slip past. The call to `promiseLike()` still returns a rejecting Promise, which is ignored and still floats.

## [Link to heading](#proxy-based-promises)Proxy-based Promises

The JavaScript [`Proxy` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) is useful to those that absolutely need it and incomprehensibly complex to everyone else. So it’s no wonder that we got one submission that ran with the idea “I bet I can use Proxy objects to break this”. This is perhaps the submission least likely to occur in production, but hey, a type-level hole is a type-level hole.

Normally, if you call methods on a Promise, the linter knows what’s going on:

```
new Promise((_, reject) => reject(2)).then(() => {})
```

But with JavaScript’s `Proxy`, you can intercept property access and sneak in hidden async behavior:

```
function createLazyPromise<	T extends string,	U extends (prop: PropertyKey) => Promise<T>,>(getValue: U) {	let resolve: (value: T) => void	const promise = new Promise<T>((r) => {		resolve = r		return r	})	const proxy = new Proxy(promise as Promise<T>, {		get(target, prop, receiver) {			if (prop in target) {				return Reflect.get(target, prop, receiver)			}			// Access to any other property triggers resolution			getValue(prop).then(resolve) // floating promise			return undefined // Could also return another proxy here		},	})	return proxy as Promise<T>}const lazy = createLazyPromise((prop) =>	Promise.resolve(`You accessed: ${String(prop)}`),)lazy.then((result) => {	console.log(result) // floating Promise})(lazy as any).foo // floating Promise
```

Here, accessing any non-Promise property on `lazy` secretly triggers an async side effect that floats unhandled. Even the `lazy.then(...)` call returns a Promise that goes unhandled, compounding the drift. It’s a contrived example, but it shows how flexible (and fragile) type inference can be.

## [Link to heading](#frozen-promise-objects-)Frozen Promise objects

Freezing a Promise changes its type in ways that complicate detection.

```
Object.freeze(new Promise((_, reject) => reject(2)))
```

The type of this expression is `Readonly<Promise<unknown>>`. That’s because [`Object.freeze()` prevents writing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) on any object you pass it. It’s tricky because you’re wrapping the type with [the `Readonly` utility type](https://github.com/microsoft/TypeScript/blob/3eb7b6a1794a6d2cde7948a3016c57e628b104b9/src/lib/es5.d.ts#L1581) which makes it harder for a linter to catch.

## [Link to heading](#promise-returning-object-members)Promise-returning object members

Finally! A simple one. Wrapping a Promise in an object method hides it behind another layer.

```
const sneakyObject = {	rejectSomething() {		return new Promise((_, reject) => reject(2))	}}sneakyObject.rejectSomething() // floating Promise
```

Instead of relying on some kind of trick, this submission wraps the Promise in a function, `rejectSomething`, that is itself a member of `sneakyObject`.

## [Link to heading](#property-getters)Property getters

JavaScript getters can also hide Promises behind property access.

```
const sneakyObject2 = {	get something() {		return new Promise((_, reject) => reject(2))	},}sneakyObject2.something // floating Promise
```

Similar to the last example, you can use [JavaScript’s `get` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) to hide the floating Promise. At a glance it looks like a simple property, but it’s actually returning an unhandled Promise.

## [Link to heading](#type-remapping-with-getters)Type remapping with getters

Normally, accessing an object property feels safe. But with a mapped type, even a getter can hide a Promise. This snippet disguises an async call as a harmless property getter.

```
interface Things {	Thing: string}type CalculateGetter<T> = {	[K in keyof T as K extends string ? `get${K}` : never]: () => Promise<T[K]>}declare const lazyThings: CalculateGetter<Things>lazyThings.getThing() // floating Promise
```

The mapped type manufactures `get*` methods that return Promises, but calling `lazyThings.getThing()` without `await` (or `.then`) leaves that Promise floating. It looks like a simple field read, yet the generic sleight of hand turns it into an unhandled async operation. Good luck ever catching this in code reviews!

## [Link to heading](#short-circuit-operators)Short-circuit operators

Logical operators return values, not effects, so they can leave Promises dangling.

```
true && new Promise((_, reject) => reject(2)) // floating Promise
```

Classic short-circuit shenanigans: `true && <Promise>` evaluates to the right-hand side, yielding a Promise value in pure expression position. Since nothing `await`s or `.catch`es it, the rejection goes unhandled. It’s a reminder that `&&` doesn’t run effects and wait. It actually returns a value, which here happens to be a volatile Promise.

## [Link to heading](#randomized-expressions)Randomized expressions

What if you only sometimes have a floating Promise? When randomness is involved, sometimes only part of the code returns a Promise.

```
Math.random() > 0.5  ? new Promise((_, reject) => reject(2)) // floating Promise  : null
```

Maybe there’s some value that only exists at runtime, perhaps from user input or some API. In that case, it still should be a lint error. The type of this expression is `Promise<unknown> | null` - and that’s good enough to fit the bill!

## [Link to heading](#optional-chaining-fallbacks)Optional chaining fallbacks

Optional chaining with fallbacks can produce Promises that go unhandled. Similar to the last two, you can trigger the “short circuiting” however you want, and this example uses optional chaining.

```
const optionalObject: Record<string, (() => unknown) | undefined> = {}optionalObject?.nonExistentMethod?.() || new Promise((_, reject) => reject(2))
```

The optional call returns `undefined`, so `||` eagerly evaluates the right-hand side which constructs a rejecting Promise. Because that Promise lives only in expression position (never assigned, awaited, or `.catch`ed), the rejection floats silently behind an innocent-looking fallback.

## [Link to heading](#immediately-invoked-functions)Immediately invoked functions

There was once a time when every JavaScript developer had to be aware of the [immediately invoked function expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IIFE, pronounced “if-y”)

```
(() => new Promise((_, reject) => reject(2)))()
```

Wrapping in a function call doesn’t change the fact that the Promise is unhandled.

## [Link to heading](#the-comma-operator)The comma operator

Last up, we have the obscure [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator). If you’ve ever looked at minified JavaScript you’ve likely seen this in action.

```
let _x = 5_x++, new Promise((_, reject) => reject(2))
```

The result of the expression is the Promise, which is ignored and left floating. It’s a syntactically tight way to discard the left expression and return whatever’s on the right. It once had niche uses, but today it’s mostly syntactic trivia. Still, it’s one more case a linter has to catch.

## [Link to heading](#winner)Winner

After consideration from an esteemed panel of judges, it was decided that the Proxy Promise submission was the winner. It was the least practical, most convoluted, and most obscure example. But that's exactly what we were looking for. The goal was never to find real-world bugs, but to stress test the implementation with any trick we could imagine.

These snippets helped the Biome maintainers quickly fix issues, many of which are now resolved today. Like any software, linters need to prioritize the cases most likely to affect users. If you have an edge case of your own that isn't fixed, consider [sending Biome a PR](https://github.com/biomejs/biome)!

## [Link to heading](#join-us)Join us

This competition was just as much about culture as it was about improving the lint rule. It gave us the chance to collaborate, get creative, support open source, and share in some friendly mischief. That reflects the culture we're building at Vercel: solving hard problems together while having fun along the way.

Our engineers care deeply about improving the developer experience, building fast and reliable systems, and giving back to the open source community. We thrive on curiosity, creativity, and collaboration, whether that’s designing scalable infrastructure, pushing the boundaries of web performance, or inventing new ways to make developers more productive.

If that sounds like you, we’d love to work together. [Explore open roles at Vercel](https://vercel.com/careers).