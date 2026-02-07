---
title: "Please Stop Using Barrel Files"
source: "https://tkdodo.eu/blog/please-stop-using-barrel-files"
publishedDate: "2024-07-26"
category: "frontend"
feedName: "TkDodo"
---

![a row of wine barrels in a dark room](https://tkdodo.eu/blog/static/35a28c87a3a5ce76828da417b1d2ea04/bbe0c/barrel.jpg "a row of wine barrels in a dark room")

-   [Français](https://developpeur-web.tech/posts/arreter-d-utiliser-des-barel-files)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

How to organize your files "correctly" is a hot, controversial topic among frontend developers. [Move files around until it feels right](https://react-file-structure.surge.sh/) is a common meme, but it's also not a joke according to author [Dan Abramov](https://bsky.app/profile/danabra.mov). This is probably fine if you're working alone, but in teams, different things will likely feel right for different persons. So the advice is pretty subjective, and thus not really helpful in a professional environment.

As far as I've experienced, most developers are happy to adjust to whatever structure a project is already using. Having a homogenous code base that's straightforward to grasp - even if you personally disagree with a structure - is a lot better than everybody just doing what they prefer.

I have my preferences, and (probably) so do you. I'm team consistency, and I'd want to statically enforce as much as possible to avoid bike-shedding discussions. The [unicorn/filename-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md) rule is a very good example for that. Choose one casing, apply it everywhere, be done with it.

That said, there is one thing that I've put a lot of emphasis on lately, and that is avoiding barrel files at all costs.

## What are barrel files?[](#what-are-barrel-files)

A barrel is a file that does nothing but re-export things from other files. Usually, those are named `index.js` or `index.ts`. It's meant to hide the "internal" structure of a directory to its consumers. As an example, consider the following directory in your repository:

```
1- tab2  - tab-list.tsx3  - tab-panel.tsx
```

Now let's assume each file exports a single component. That means we can import those modules individually like so:

my-page.tsx

```
1import { TabList } from '@/tab/tab-list'2import { TabPanel } from '@/tab/tab-panel'
```

Oftentimes, developers want to improve the code organization by providing a single interface to import everything tab related from. We would usually do that with a barrel file that re-exports those:

tab/index.ts

```
1export { TabList } from './tab-list'2export { TabPanel } from './tab-panel'
```

Because the file is named `index`, which can be omitted when importing, we get a seemingly cleared up usage site:

my-page.tsx

```
1import { TabList, TabPanel } from '@/tab'
```

This not only seems a lot cleaner, it also means we can shift internal files around without having to update all consumer sides. So where's the catch?

## Circular imports[](#circular-imports)

Having a barrel file in a directory changes how we import depending on our current location. Let's extend our example by adding a `use-tab-state.ts` util. It's a custom hook that we're going to use inside our `TabPanel` component. Additionally, we want to export it for everyone to use, which is why we add it to our barrel file:

tab/index.ts

```
1export { TabList } from './tab-list'2export { TabPanel } from './tab-panel'3export { useTabState } from './use-tab-state'
```

So far, so good - consumers can import `useTabState` directly from the barrel file. However, what happens if we are inside `TabPanel` and we import `useTabState`? It depends on how we write our import statement:

tab/tab-panel.ts

```
1// ✅ good: imports from use-tab-state module2import { useTabState } from './use-tab-state'3
4// ❌ bad: these both import from the barrel file5import { useTabState } from '@/tab'6import { useTabState } from './'
```

If we do what we always do - importing from the barrel file - we will create a circular import, where `tab-panel.ts` will import `index.ts`, which imports `tab-panel.ts` (because it re-exports it).

Now JavaScript is quite tolerant when it comes to circular imports, but I've seen bundlers crash with the weirdest of error messages because of it. Those imports can also happen accidentally, because let's face it: most of the time, we just auto import and leave it at whatever our editor (or copilot) decides. At least I haven't written a manual import statement in a long time.

The lint rule [import/no-cycle](https://github.com/import-js/eslint-plugin-import/blob/09476d7dac1ab36668283f9626f85e2223652b37/docs/rules/no-cycle.md) can catch a lot of these circles, so I can recommend turning that on.

## Development speed[](#development-speed)

The second issue with barrels shows up when we think about what happens under the hood when a barrel file is imported. If we `import { useTabState } from '@/tab'`, JavaScript will traverse the `index.ts` file and load every module inside of it, synchronously. This probably doesn't matter much if our barrel only has three files, but it can get out of hand pretty quickly, for example, if one of our other imports that we don't need import from another barrel, or from a 3rd party lib that again imports many many modules.

In our NextJs project, I have seen pages that were loading over 11k modules, which took 5-10 seconds to start-up the page. After we started to get rid of most of our internal barrel files, we got that down to about 3.5k modules - a reduction of 68%. Turns out it's not so good if you have a shared package that exports a ton of things via a barrel and you only need a single module from it. 😅

The NextJs team has also realized that barrel file are a real problem in development mode and have started to ship the `optimizePackageImports` feature to automatically transform imports from barrel files into their real module paths. The blog post [How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js) by [Shu Ding](https://x.com/shuding_) explains in detail how this works. What's most interesting is that those optimizations can only be applied if the barrel is a "real" barrel - which means it does nothing but export other things. As soon as you add one line that isn't a re-export, like:

tab/index.ts

```
1export { TabList } from './tab-list'2export { TabPanel } from './tab-panel'3export { useTabState } from './use-tab-state'4
5// ❌ bad: this makes the whole file non-optimizable6export const foo = 5
```

it can't be optimized because of potential side effects. So again, the best thing is to just avoid barrel files.

## What barrels are good for[](#what-barrels-are-good-for)

In my opinion, barrels aren't made to group content of directories in your product application. Unless you add even stricter lint rules, there isn't anything that would force other developers to only import from the barrels, so you can't make certain modules "private" with them.

Where barrels are necessary is when you are writing a library. Libraries like `@tanstack/react-query` need a single entry point file that we can put into the `main` field of `package.json`. This is the public interface of what consumers can use. To me, this is the only place where a barrel makes sense. But if you are writing app code, you're just making your life harder by putting `index.ts` files into arbitrary directories. So please stop using barrel files.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)