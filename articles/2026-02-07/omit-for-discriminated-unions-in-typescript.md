---
title: "Omit for Discriminated Unions in TypeScript"
source: "https://tkdodo.eu/blog/omit-for-discriminated-unions-in-type-script"
publishedDate: "2025-11-24"
category: "frontend"
feedName: "TkDodo"
---

![Guitar picks with different color backgrounds yellow and blue](https://tkdodo.eu/blog/static/42d99fd1f7278466344bef51104cb1cf/18e3b/omit.jpg "Guitar picks with different color backgrounds yellow and blue")

-   [한국어](https://velog.io/@samiehomie/%EB%B2%88%EC%97%AD-TypeScript%EC%9D%98-Discriminated-Union%EC%97%90%EC%84%9C-Omit-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
-   [Français](https://developpeur-web.tech/posts/omit-pour-les-unions-discrimines-en-typescript)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

You're probably aware that TypeScript has built-in utility types to help with common type transformation on objects, like [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) and [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys).

When building React components that are specific wrappers over lower-level primitives, `Omit` can be helpful when typing `Props`, as it can tie your implementation to the underlying one.

SelectProps

```
1type SelectProps = {2  onChange: (value: string) => void3  options: ReadonlyArray<SelectOption>4  value: string | null5}6
7type UserSelectProps = Omit<SelectProps, 'options'>
```

It basically says: I want all the props of the component I'm depending upon, _except_ this one thing (or multiple things). We can then build our `UserSelect` component by spreading props and setting the missing things ourselves:

UserSelect

```
1function UserSelect(props: UserSelectProps) {2  const users = useSuspenseQuery(usersQueryOptions)3
4  return <Select {...props} options={users.data} />5}
```

This has two advantages: It means we don't have to re-declare (and thus copy) all the fields of `SelectProps` when building wrapper components around it, and they're automatically in-sync with each other, too. The dependency is on purpose: since we're spreading `{...props}` onto a `Select`, the types also already declare that, and if we add a field to `Select`, `UserSelect` will profit from that, too.

There are also disadvantages: It can become harder to see which props a component actually receives when these types stack across multiple layers. I'd avoid going beyond one layer, but generally, this is a nice pattern - until `SelectProps` become too smart.

## Discriminated Union Types[](#discriminated-union-types)

Let's add a new feature to `Select`: a `clearable` prop, which allows users to unselect the current value. If that happens, we'd want to trigger `onChange` with `null`. A first draft for types might look like this:

clearable

```
1type SelectProps = {2  onChange: (value: string | null) => void3  options: ReadonlyArray<SelectOption>4  value: string | null5  clearable?: boolean6}
```

That works, but it introduces a new problem: all existing `Select` usages now error because their `onChange` handlers don't handle `null`. That's not great because they will never receive `null` at runtime, as they clearly aren't `clearable`.

We'd really want to tell the type-checker: "If we pass `clearable`, `onChange` might get `null`, otherwise, it won't". [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) can help us with that:

Discriminated-Union-Type

```
1type BaseSelectProps = {2  options: ReadonlyArray<SelectOption>3  value: string | null4}5
6type ClearableSelectProps = BaseSelectProps & {7  clearable: true8  onChange: (value: string | null) => void9}10
11type UnclearableSelectProps = BaseSelectProps & {12  onChange: (value: string) => void13  clearable?: false14}15
16type SelectProps = ClearableSelectProps | UnclearableSelectProps
```

This looks more complicated than before, but it's worth the troubles for us. Now, TypeScript can discriminate the union on the `clearable` flag: If it's passed as `true`, `onChange` will get a different structure than when it's passed as `false` or not passed at all. The extraction to `BaseSelectProps` was just done to avoid repeating the types that are the same in both parts of the union.

Now our new `clearable` feature becomes backwards compatible on type-level too, so we should be good to ship it. Except that, to our surprise, we find an error in CI on our `UserSelect` component. Something like:

Types of property 'clearable' are incompatible.  
  Type 'boolean | undefined' is not assignable to type 'false | undefined'.  
    Type 'true' is not assignable to type 'false'.(2345)

That made little sense to me when I read it the first time - after all, I'm just composing types with `Omit`, and it worked before. 🤔 So what's changed?

It started to make more sense once I inspected what my `UserSelectProps` now expands to:

Expanded-UserSelectProps

```
1type UserSelectProps = {2  onChange:3    | ((value: string | null) => void)4    | ((value: string) => void)5  value: string | null6  clearable?: boolean | undefined7}
```

The union type that discriminates over `clearable` is gone - adding the `Omit` basically "expanded" everything. Surely that's a bug in `Omit`, but no, it [works as intended](https://github.com/microsoft/TypeScript/issues/31501).

`Omit` doesn't look at each union individually (it's not distributive), it treats the union as a whole and just maps over all members one by one. As [Ryan Cavanaugh](https://github.com/RyanCavanaugh) says in [one of the issue comments](https://github.com/microsoft/TypeScript/issues/31501#issuecomment-501534342), all possible definitions of `Omit` have certain trade-offs, and they've chosen one they think is the best general fit.

If you can run [Doom in TypeScript Types](https://www.youtube.com/watch?v=0mCsluv5FXA), it should be possible to write an `Omit` helper that doesn't destroy our unions, and luckily, we have to look no further than towards Distributive Conditional Types.

## Distributive Conditional Types[](#distributive-conditional-types)

As the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) put it: "When conditional types act on a generic type, they become distributive when given a union type." In other words, the conditional runs on each member of the union individually, which is exactly what we'd want. However, we don't have a conditional type, and we don't really want one. So where is this going?

## Distributive Omit[](#distributive-omit)

Have you ever seen a type say `T extends any ? ... : never` and wondered: Why would you do that? Obviously, everything extends `any` - it's TypeScript's top type.

Yes - it is, and that's exactly the point. It's a fake conditional type that will always match the true branch of the condition. This _should_ be equivalent to just using whatever is inside the true branch, except that it now becomes distributive.

With that, we can create an `Omit` helper type that works better with our unions, simply by calling `Omit` in the true branch of such a fake conditional type:

DistributiveOmit

```
1type DistributiveOmit<T, K extends keyof T> = T extends any2  ? Omit<T, K>3  : never
```

Have a look at what happens if we apply this to our `UserSelectProps`:

New-UserSelectProps

```
1type UserSelectProps = DistributiveOmit<SelectProps, 'options'>
```

If we hover this type, it will expand to:

New-Expanded-UserSelectProps

```
1type UserSelectProps =2  | Omit<ClearableSelectProps, 'options'>3  | Omit<UnclearableSelectProps, 'options'>
```

which clearly shows that it works as expected: `Omit` is applied to each part of our union type, and our `UserSelect` will now also implicitly benefit from the `clearable` feature.🎉

Here's a [TypeScript Playground](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAyhA2EDGwDyZgEsD2A7KAvFAN4BuAhvAK4QBcUAzsAE6a4DmANFPOQEYJ6TVhwC+AKHGhIUAELkGEOIhQAFZtjANCJcVCgVqdRizbsoAHyi4q8eHqiaseBvQBKEcgBM88EAEFmZnIQAB5lZDQMHFwAPnEJKXBoAGFEcmC+RAi1DS0deUUc4HVNbQAyXX0kdMzEehYaBzwUgAtyDmMACkMaIVMOS2tbeABKQliDbEwvBMlpaABVXBrPOqUESNL8okKNlRK8iqqoVYz+RAB+egAzSkVm3DaO9m7e42EzcYJJ0mnZxILWCbXJlHRpNYXfZbI5DZZndbFbYMSQ3KgrZz4YpdMBHehIo7jYiJNEYmJQRaKZjFACiQWwzBxeKgqAAtphgOEQYcytwAOROGIMPmxIkOZgQYBUZhY7ldYgAOiVuN5jmiLnoAG0ALqiUZzcQAekNUBumAAHhAvAYIMwGDFaPNklAACKYT58KhYUgQNkc0IAFW4AGkoBBzcAILgvNoANYQEDYG5QAOTIgBsMRqMxqAdEBQS4s9mcoNQYOTei4CA+5gAbiSMkptoJYKIbo9XswPr9nJbWn5gpcIqNJv0AD1Lqj0ShyU3qdzUMGmWV6HO+wwxfoJVKZcCDvKlQqVf21ZjXFAdXqEkA) if you want to play around with that solution, and note that you can apply the same trick to other helper types like `Pick`, too.

Additionally, there's one more benefit we've coded into our `DistributiveOmit` solution that the regular `Omit` doesn't have:

## Limited Keys[](#limited-keys)

If we look at the type signature of `Omit`:

Omit

```
1type Omit<T, K extends keyof any> = {2  [P in Exclude<keyof T, K>]: T[P]3}
```

we can see that it doesn't have any upper bound on the `K` type parameter (`keyof any` just expands to `string | number | symbol`). This means you can pass keys that don't actually exist on the object. That's harmless in practice, as omitting something that isn't there doesn't change anything, but it did surprise me. When I switched to `DistributiveOmit` (which uses `K extends keyof T`), TypeScript suddenly flagged places where we were omitting five keys even though two of them no longer existed.

They likely existed at some point and were just left behind during a cleanup. And if you know me, you know I'm not a fan of dead code, so this turned into a nice little opportunity to tidy things up. ✂️

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)