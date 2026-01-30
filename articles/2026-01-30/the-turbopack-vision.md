---
title: "The Turbopack vision"
source: "https://vercel.com/blog/the-turbopack-vision"
publishedDate: "2023-01-11"
category: "frontend"
feedName: "Vercel"
author: "Tobias Koppers"
---

3 min read

Jan 11, 2023

Tobias Koppers speaks on moving on from webpack.

The Turbopack team and I were excited to [announce Turbopack's alpha release at Next.js Conf](https://vercel.com/blog/turbopack) and we've been even more energized by the progress we've made since then.

Last month, I had the opportunity to take the stage at React Day Berlin to share more about the future plans for Turbopack.

## [Link to heading](#moving-beyond-webpack)Moving beyond webpack

Webpack has been downloaded over three billion times and changed the way we build for the Web. However, webpack was built 10 years ago—with the needs of 10 years ago in mind. Since then, web development has evolved in new ways such that webpack’s architecture can't easily accommodate web engineers' needs today.

Some big changes are needed but it’s hard to make such large shifts while keeping backwards compatibility. With so many teams using and depending on webpack's core functionality today, the webpack team must be sensitive to the fact that we can't rewrite all of webpack from scratch.

## [Link to heading](#building-something-new)Building something new

Today’s web developers need a tool with an architecture that will be flexible, extensible, and **fast** for the next 10 years.

Through recent work on Next.js, we realized that webpack could learn a lot from the optimization work going on in the Next.js ecosystem. Originally using Javascript-based tooling, Next.js developers saw dramatically reduced compile and bundle times when Rust-based SWC was [added to Next.js 12](https://nextjs.org/docs/advanced-features/compiler?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_pack_vision).

Writing in Rust, we are currently working on creating two layers of interoperability:

-   **Turbo engine:** A core engine for common tasks like caching, invalidation, and incremental builds
    
-   **Turbopack:** A bundler handling CSS, static assets, Wasm, images, fonts, and more leveraging SWC
    

![Combining the learnings of Turborepo and Webpack for Turbopack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3bv4AkqB2DhmZqzSzTc2qt%2F6938f9b22f8cc7f0c90a3df2a0ebc574%2FFrame_427319362.png&w=1920&q=75)![Combining the learnings of Turborepo and Webpack for Turbopack.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6bCTjcUkPRAojNkOjCl283%2F3e72ec15aa0b74488ae8d590585c17da%2FFrame_1.png&w=1920&q=75)

Combining the learnings of Turborepo and Webpack for Turbopack.

We can already hot reload common code update patterns in milliseconds independent from the size of your codebase. And, through [Turborepo-like Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_pack_vision), we believe we can rebuild some of the largest sites in the world for production in **seconds** for minor changes.

For more on how the Turbo engine can cache your code all the way down to the function level, [visit the Turbopack Core Concepts documentation](https://turbo.build/pack/docs/core-concepts?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_pack_vision).

## [Link to heading](#shipping-new-alpha-features)Shipping new alpha features

When I gave this talk last month, we had already received plenty of great user feedback. After hearing from many of our alpha testers, we've shipped some [new features as a part of the Next.js 13.1](https://nextjs.org/blog/next-13-1#turbopack-improvements) release including support for:

-   PostCSS, including Tailwind CSS
    
-   next/image
    
-   next/font
    
-   next.config.js
    
-   and more
    

To try out some of these features today, create a new Next.js 13 project using:

```
npx create-next-app --example with-turbopack
```

## [Link to heading](#future-of-the-turboverse)Future of the Turboverse

Turbopack's alpha is purpose-built with improving the developer experience for `next dev`. Once we've reached feature parity with the Next.js 13 dev server, we'll use `next build` to work on building for production.

In the future, we will support other frameworks so developers everywhere can enjoy the Turboverse using a plug-in architecture. Improving developer insights are also on the roadmap for Turbo, allowing you to create statistical summaries about your build, lint to point you to build optimization opportunities, and analyzers to give you deeper insights.

If you'd like to learn more about our future plans, [visit the Turbopack Roadmap](https://turbo.build/pack/docs/roadmap?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_pack_vision). We're excited to continuing expanding the Turboverse and building the Web faster.