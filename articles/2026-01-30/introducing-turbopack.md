---
title: "Introducing Turbopack"
source: "https://vercel.com/blog/turbopack"
publishedDate: "2022-10-25"
category: "frontend"
feedName: "Vercel"
author: "Tobias Koppers"
---

2 min read

Oct 25, 2022

Vercel's mission is to provide the speed and reliability innovators need to create at the moment of inspiration. Last year, we focused on speeding up the way Next.js bundles your apps.

Each time we moved from a JavaScript-based tool to a Rust-based one, we saw enormous improvements. We migrated away from Babel, which resulted in **17x faster transpilation**. We replaced Terser, which resulted in **6x faster minification** to reduce load times and bandwidth usage.

There was one hurdle left: webpack. Webpack has been downloaded over **3 billion times**. It’s become an integral part of building the web, but it's time to go faster.

Today, we’re launching [**Turbopack**](https://turbo.build/)**:** a high-performance bundler for React Server Components and TypeScript codebases.

![Introducing Turbopack, the Rust-based successor to Webpack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5xISJZLpC7OKEDNRII3r8T%2Fc2b8017bcae0f1ebd5ce448dfcbf7a18%2FTurbopack_Blog_-_light.png&w=1920&q=75)![Introducing Turbopack, the Rust-based successor to Webpack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2oCT6ewHNjBJPSmNHajtP7%2Fdac2d3fa9860c392af967821db25024e%2FTurbopack_Blog_-_dark.png&w=1920&q=75)

Introducing Turbopack, the Rust-based successor to Webpack.

Led by the creator of Webpack, Tobias Koppers, Turbopack is our next-generation bundler.

Try out the alpha of Turbopack in Next.js 13 today with [`next dev --turbo`](https://turbo.build/pack/docs).

## [Link to heading](#how-fast-is-turbopack)How fast is Turbopack?

Turbopack is built on a new incremental architecture for the fastest possible development experience. On large applications, it **shows updates 700x faster than Webpack**.

Turbopack only bundles the minimum assets required in development, so **startup time is extremely fast**. On an application with 5,000 modules, Turbopack takes 4 seconds to boot up, while Vite (with SWC) takes 16.6 seconds.

To learn more, read the [docs](https://turbo.build/pack/docs/core-concepts) on how Turbopack bundles and view the benchmarks.

## [Link to heading](#why-is-turbopack-so-fast)Why is Turbopack so fast?

Turbopack’s architecture takes the lessons learned from tools like [Turborepo](https://turborepo.org/) and Google’s Bazel, both of which focus on using caches to **never do the same work twice**.

Turbopack is built on Turbo: an open-source, incremental memoization framework for Rust. Turbo can cache the result of any function in the program. When the program is run again, functions won't re-run unless their inputs have changed. This granular architecture enables your program to skip large amounts of work, at the level of the function.

An incremental reactive system with the speed of Rust? Turbopack is unstoppable.

To learn more, check out our [explainer on Turbo](https://turbo.build/pack/docs/core-concepts).

[

**Ready to give Turbopack a try?**

See how fast Turbopack really is—try the Web's next-generation bundler today.

Contact sales



](https://vercel.com/contact/turborepo)

## [Link to heading](#the-future-of-turbo)The future of Turbo

To start, Turbopack will be used for the [Next.js 13](https://beta.nextjs.org/docs) development server. It will power lightning-fast HMR, and it will **support React Server Components natively**, as well as TypeScript, JSX, CSS, and more.

Turbopack will eventually also power Next.js production builds, both locally and in the cloud. We’ll be able to **share Turbo's cache across your entire team,** using [Vercel Remote Caching](https://vercel.com/docs/concepts/monorepos/remote-caching).

Webpack users can also expect **an incremental migration path** into the Rust-based future with Turbopack.

We couldn’t be more excited about the future of the Turbo ecosystem, as we push to help you iterate faster and create at the moment of inspiration.

![Turbopack provides a fast and flexible development experience for apps of any size.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3mSoM7xsAnePFDUofV79ZZ%2Fc1b9ac23b3d1f69539c9e1e43d8a62f3%2FTurbopack_-_light.png&w=1920&q=75)![Turbopack provides a fast and flexible development experience for apps of any size.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F0DTHYlZSTTaj1omw7USLQ%2Fb5c314161ee52c76f2e7d0dc81dc8309%2FTurbopack_-_dark.png&w=1920&q=75)

Turbopack provides a fast and flexible development experience for apps of any size.

Explore the [Turbopack alpha](https://turbo.build/pack) in Next.js 13 today.