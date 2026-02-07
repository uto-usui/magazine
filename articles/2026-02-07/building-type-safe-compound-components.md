---
title: "Building Type-Safe Compound Components"
source: "https://tkdodo.eu/blog/building-type-safe-compound-components"
publishedDate: "2026-01-02"
category: "frontend"
feedName: "TkDodo"
---

![stack rock on seashore](https://tkdodo.eu/blog/static/461f666f08dea720391579dbc401d126/bbe0c/stack.jpg "stack rock on seashore")

-   [#1: Designing Design Systems](https://tkdodo.eu/blog/designing-design-systems)
-   [#2: Tooltip Components Should Not Exist](https://tkdodo.eu/blog/tooltip-components-should-not-exist)
-   **#3: Building Type-Safe Compound Components**

-   [한국어](https://rosetta.page/post/%EB%B2%88%EC%97%AD-%ED%83%80%EC%9E%85-%EC%84%B8%EC%9D%B4%ED%94%84%ED%95%9C-%ED%95%A9%EC%84%B1-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

I think compound components are a really good design-pattern when building component libraries. They give consumers flexibility in how components are composed, without forcing every variation into a single, prop-heavy API. Additionally, they make relationships between components explicit in the markup.

This doesn't mean that compound components are _always_ a good fit. Sometimes, using `props` is just better.

## A Bad Example[](#a-bad-example)

A common example we'll see regarding compound components is a `Select` with `Options`, likely because that's also how it works in HTML.

Compound-Select

```
1import { Select, Option } from '@/components/select'2
3function ThemeSwitcher({ value, onChange }) {4  return (5    <Select value={value} onChange={onChange}>6      <Option value="system">🤖</Option>7      <Option value="light">☀️</Option>8      <Option value="dark">🌑</Option>9    </Select>10  )11}
```

There are a couple of reasons why I think this example is not ideal at showing what compound components are good for.

### 1\. Fixed Layout[](#1-fixed-layout)

Compound components excel at allowing users to layout `children` however they want. For `Selects`, we likely don't need that. The `options` go into a menu, and we want to show each option one after the other. This is exactly why lots of people want to [limit what you can pass](https://github.com/microsoft/TypeScript/issues/21699) into `children` on type-level - like only allowing `Option` to be passed into `Select`.

This is not only [impossible](https://www.totaltypescript.com/type-safe-children-in-react-and-typescript) as of now (the issue is open since 2018), it's also undesirable. I know you were hoping that I would tell you how to make compound components type-safe in this article, and I will - it's just not about `children` at all. My take is that if you want to limit `children` to a specific type, compound components are the wrong abstraction.

### 2\. Dynamic Content[](#2-dynamic-content)

Compound components are really good when your content is mostly static. The above example has three hardcoded options, so it qualifies, right?

In reality, we likely won't have `Selects` with just three options, as the content will mostly likely come from an API call with a dynamic resultset. Also, most design guides will tell us that we [shouldn't use a Select for less than five options](https://baymard.com/blog/drop-down-usability), as hiding a small number of choices in a dropdown adds unnecessary clicks and cognitive load.

In fact, at Adverity, we started out with a compound component `Select` and then had to write this mapping code for most of our usages:

Select-Usage

```
1import { Select, Option } from '@/components/select'2
3function UserSelect({ value, onChange }) {4  const userQuery = useSuspenseQuery(userOptions)5
6  return (7    <Select value={value} onChange={onChange}>8      {userQuery.data.map((option) => (9        <Option value={option.value}>{option.label}</Option>10      ))}11    </Select>12  )13}
```

At that point, we just switched to exposing a `Select` that used `props` instead of `children`:

Select-With-Options

```
1import { Select } from '@/components/select'2
3function UserSelect({ value, onChange }) {4  const userQuery = useSuspenseQuery(userOptions)5
6  return (7    <Select8      value={value}9      onChange={onChange}10      options={userQuery.data}11    />12  )13}
```

This not only allowed us to get rid of the tedious mapping we had to do everywhere, it also gave us the type safety we wanted, as there were no `children` that we needed to restrict. Also, `Select` can easily be made generic to make sure `value`, `onChange` and `options` all get the same type:

SelectProps

```
1type SelectValue = string | number2type SelectOption<T> = { value: T; label: string }3type SelectProps<T extends SelectValue> = {4  value: T5  onChange: (value: T) => void6  options: ReadonlyArray<SelectOption<T>>7}
```

## Slots[](#slots)

A `ModalDialog` component is another example where we'd rather not give our users the full power of compound components. I mean, it doesn't make sense to render the `DialogFooter` above the `DialogHeader`. We also don't want anyone to accidentally leave out the `DialogBackdrop` or create different spacings between `DialogBody` and `DialogFooter`. In cases where consistency and order is important, slots are usually a better abstraction:

ModalDialog

```
1function ModalDialog({ header, body, footer }) {2  return (3    <DialogRoot>4      <DialogBackdrop />5      <DialogContent>6        <DialogHeader>{header}</DialogHeader>7        <DialogBody>{body}</DialogBody>8        <DialogFooter>{footer}</DialogFooter>9      </DialogContent>10    </DialogRoot>11  )12}13
14// usage:15
16<ModalDialog header="Hello" body="World" />
```

They still allow some form of flexibility by injecting arbitrary React components into specific positions while making sure no one has to copy-paste that boilerplate everywhere. It is of course great to have these `Dialog` primitives inside a design-system, I would just not expose them for consumers.

* * *

So those are two indicators - fixed layout and mostly dynamic content - that make me question if we really want a compound component. So when is it a really good fit then? And what does it have to do with type safety?

## A Better Example[](#a-better-example)

A good use-case that would likely benefit from dynamically layouted children with mostly fixed elements is a `<ButtonGroup>`, a `<TabBar>` or a `<RadioGroup>`:

RadioGroup

```
1import { RadioGroup, RadioGroupItem } from '@/components/radio'2import { Flex } from '@/components/layout'3
4function ThemeSwitcher({ value, onChange }) {5  return (6    <RadioGroup value={value} onChange={onChange}>7      <Flex direction={['row', 'column']} gap="sm">8        <RadioGroupItem value="system">🤖</RadioGroupItem>9        <RadioGroupItem value="light">☀️</RadioGroupItem>10        <RadioGroupItem value="dark">🌑</RadioGroupItem>11      </Flex>12    </RadioGroup>13  )14}
```

The main difference to `Select` is that we explicitly want to have `children` that aren't of type `RadioGroupItem`. Being able to layout them how we want, maybe even with additional help texts, is essential. Sure, we might have some instances where our `RadioGroup` needs dynamic options as well, but in that case, creating a loop like I've shown before isn't the end of the world.

That still leaves the problem of type safety, as `value` passed to `ThemeSwitcher` hopefully isn't just a string - it's likely a string literal:

ThemeValue

```
1type ThemeValue = 'system' | 'light' | 'dark'
```

The `value` and `onChange` props can be tied to `ThemeValue` simply by making `RadioGroup` generic like I've shown before, but what about `RadioGroupItem` ? How do we make sure that the `value` passed to each one of them can be statically analyzed?

## Type Safety[](#type-safety)

We can of course also make `RadioGroupItem` generic. The problem with that approach is that types from the `RadioGroup` wouldn't be automatically available to the items, because JSX children don't "inherit" type parameters from the parent component. So even if `RadioGroup` is perfectly typed and infers `<ThemeValue>`, we would still need to parameterize each `RadioGroupItem`:

Generic-RadioGroupItem

```
1import { RadioGroup, RadioGroupItem } from '@/components/radio'2import { Flex } from '@/components/layout'3
4type ThemeValue = 'system' | 'light' | 'dark'5
6type ThemeSwitcherProps = {7  value: ThemeValue8  onChange: (value: ThemeValue) => void9}10
11function ThemeSwitcher({ value, onChange }) {12  return (13    <RadioGroup value={value} onChange={onChange}>14      <Flex direction={['row', 'column']} gap="sm">15        <RadioGroupItem<ThemeValue> value="system">🤖</RadioGroupItem>16        <RadioGroupItem<ThemeValue> value="light">☀️</RadioGroupItem>17        <RadioGroupItem<ThemeValue> value="dark">🌑</RadioGroupItem>18      </Flex>19    </RadioGroup>20  )21}
```

That's not a great API, because every manual type annotation is easily forgotten. If you know me, you know that I like my types fully inferred whenever possible. The best way to do this for compound components is by _not_ exposing those components directly, but by only giving your users a method to invoke.

### Component Factory Pattern[](#component-factory-pattern)

Not sure if this is the correct name for this pattern, but I think it's good enough to get the concept across. Basically, we can't fully get rid of the manual type annotation, but we can try to hide it and make it explicit. Instead of exposing `RadioGroup` and `RadioGroupItem`, we only export a function called `createRadioGroup` that should be called once with a type parameter. This function will then return the statically typed `RadioGroup` and its `RadioGroupItem` with types that are tied together:

createRadioGroup

```
1import { RadioGroup, RadioGroupItem } from './internal/radio'2
3export const createRadioGroup = <T extends GroupValue = never>(): {4  RadioGroup: (props: RadioGroupProps<T>) => JSX.Element5  RadioGroupItem: (props: Item<T>) => JSX.Element6} => ({ RadioGroup, RadioGroupItem })
```

This doesn't do anything at runtime, except wrapping our internal `RadioGroup` and `RadioGroupItem` into an object. But on type-level, it ties the type parameters together. And the fact that we default our generic to `never` means users will have to pass it in order to be able to do anything meaningful with the result, allowing us to use it like this:

Typed-RadioGroup

```
1import { createRadioGroup } from '@/components/radio'2import { Flex } from '@/components/layout'3
4type ThemeValue = 'system' | 'light' | 'dark'5
6type ThemeSwitcherProps = {7  value: ThemeValue8  onChange: (value: ThemeValue) => void9}10
11const Theme = createRadioGroup<ThemeValue>()12
13function ThemeSwitcher({ value, onChange }) {14  return (15    <Theme.RadioGroup value={value} onChange={onChange}>16      <Flex direction={['row', 'column']} gap="sm">17        <Theme.RadioGroupItem value="system">🤖</Theme.RadioGroupItem>18        <Theme.RadioGroupItem value="light">☀️</Theme.RadioGroupItem>19        <Theme.RadioGroupItem value="dark">🌑</Theme.RadioGroupItem>20      </Flex>21    </Theme.RadioGroup>22  )23}
```

Of course, this version isn't bullet proof. We can still create a differently typed `RadioGroup` and pass those items to our `Theme.RadioGroup`, but this is far less likely to happen by accident.

All in all, this approach preserves the flexibility that makes compound components great while adding strong type guarantees. The only real cost is that consumers don't import the components directly, but instead create a typed instance of the component family via a function call. I think that's a worthwhile tradeoff and the best way to make a compound component as type-safe as possible for the users of your design-system.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)