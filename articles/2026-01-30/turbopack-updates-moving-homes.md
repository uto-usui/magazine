---
title: "Turbopack updates: Moving homes"
source: "https://vercel.com/blog/turbopack-moving-homes"
publishedDate: "2024-07-23"
category: "frontend"
feedName: "Vercel"
author: "Benjamin Woodruff"
---

5 min read

Jul 23, 2024

Progress with Turbopack, current priorities, and a move to a different repository.

Turbopack is a new JavaScript/TypeScript bundler we’ve been cooking at Vercel. Building on 10+ years of learnings from webpack, we want to build a bundler that can be used with many frameworks.

We’re moving the Turbopack codebase into the Next.js repository—and wanted to share an update on our progress with Turbopack so far, as well as where we’re headed.

## [Link to heading](#project-updates)Project updates

-   **You can try out Turbopack with Next.js today.** If you're using [the supported webpack loaders](https://nextjs.org/docs/app/api-reference/next-config-js/turbo#webpack-loaders) or have no custom webpack configuration, you can run the Next.js development server with `next dev --turbo` to speed up your development workflow. To get all the latest fixes, we recommend using it with the Next.js Canary channel. We'll have an updated [Next.js 15.0 Release Candidate](https://nextjs.org/blog/next-15-rc) soon with the latest version of Turbopack.
    
-   [**Turbopack is passing 100% of the Next.js development test suite**](https://areweturboyet.com/) and **all** [**Next.js examples**](https://github.com/vercel/next.js/tree/canary/examples) **work with Turbopack**. We’re rapidly working through [our backlog of user-reported issues](https://github.com/vercel/next.js/issues/new/choose) not surfaced by existing tests.
    
-   **We’ve verified the top 300** `**npm**` **packages** used in Next.js applications can compile with Turbopack.
    
-   **We use Turbopack every day to develop vercel.com.** It’s been much faster than webpack for our team, both for initial server startup as well as code updates.
    

We have also begun work on production builds. To follow along with this, visit [https://areweturboyet.com/build](https://areweturboyet.com/build).

## [Link to heading](#moving-homes)Moving homes

In the coming weeks, we will move the source code for the Turbopack bundler out of [the](https://github.com/vercel/turbo/) [`vercel/turbo`](https://github.com/vercel/turbo/) [repository](https://github.com/vercel/turbo/) and into [the](https://github.com/vercel/next.js) [`vercel/next.js`](https://github.com/vercel/next.js) [monorepo](https://github.com/vercel/next.js). We believe that co-locating the source code will enable us to iterate faster and get Turbopack to a stable release with support for production builds sooner, both in Next.js and as a standalone bundler for the rest of the JavaScript ecosystem.

We have not begun moving the code yet, as we felt it was important to inform the community of these changes before they are made.

**There will be no change to** [**the Turborepo build system**](https://turbo.build/repo/docs) **project**, which will remain where it is in the `vercel/turbo` repository. **There will also be no change to how you interact with Turbopack, Turborepo, or Next.js.**

## [Link to heading](#why-are-we-moving)Why are we moving?

Initially, we believed that putting Turbopack (the bundler) and Turborepo (the build system) into the same repository would assist with sharing code between both projects, [especially as Turborepo has recently migrated from Go to Rust](https://vercel.com/blog/turborepo-migration-go-rust).

However, as Next.js is Turbopack’s primary user during this phase of development, we found that internal changes in Turbopack affect Next.js more often than Turborepo. Since Next.js is in a separate repository, we often have to spend time synchronizing dependencies or coordinating changes between these two repositories.

Over time, we developed hacks to work around some of these problems. We created tools to check out both repositories, combine our `Cargo.toml` files (Rust’s equivalent of `package.json`) into a unified workspace, and merge our Cargo lockfiles. Unfortunately, these hacks are fragile partial solutions, and the bespoke nature of our tooling made it harder for us to onboard new engineers. In some cases, [we’ve even had to upstream changes to IDE plugins](https://github.com/mrcjkb/rustaceanvim/pull/402) to fix issues with our workflow.

Moving forward, we will utilize a top-level `Cargo.toml` configuration with [Cargo workspaces](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html), similar to how one might [organize packages in a JavaScript workspace](https://turbo.build/repo/docs/crafting-your-repository/structuring-a-repository).

When creating and maintaining release branches in Next.js, we’ll be able to backport both Next.js and Turbopack hotfixes into the same Git branch, without needing to maintain a separate branch in the `vercel/turbo` repo with it’s own release tags.

## [Link to heading](#does-this-mean-turbopack-will-only-support-next.js)Does this mean Turbopack will only support Next.js?

No. The core of Turbopack remains framework-agnostic. We still want to support other frameworks and standalone bundler usage, but our immediate focus is on Next.js to start. Ensuring this clear focus helps Turbopack users in a few ways:

-   **Helping as many developers as soon as possible.** We're seeing increasingly large applications built with Next.js over time, and we want to make sure Turbopack helps users at scale. By using Next.js as a boundary to our current development scope, we have better clarity on how to help a cohort of millions of developers as soon as we can.
    
-   **Crafting better APIs for Turbopack.** With Turbopack and Next.js in the same monorepo, it will be easier for us to make changes and iterate on our APIs in one pull request, validated against the Next.js test suite in CI.
    

In time, we will reach a stable state for the general-purpose bundler to be used outside of Next.js. At that point, we will move Turbopack to its own separate repository.

## [Link to heading](#how-will-this-migration-be-performed)How will this migration be performed?

We intend to [use `git-subtree`](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) in combination [with `git-filter-branch`](https://git-scm.com/docs/git-filter-branch) to copy over all of the Turbopack source code, along with its commit history. In preparation for the change, we’ll need to make changes to our CI configuration and build scripts to ensure all of our testing infrastructure moves with our source code.

## [Link to heading](#looking-forward:-priorities-for-turbopack)Looking forward: Priorities for Turbopack

We’re close to marking Turbopack as stable for development when used with Next.js. When this happens, Turbopack will initially remain opt-in for existing Next.js projects and we will align any breaking changes to the default bundler with a future major release of Next.js, with continued webpack support after the defaults are changed.

Current priorities for the team are:

-   **Solving remaining user-reported bugs and edge-case performance regressions.** If you run into issues while using Turbopack, [please let us know](https://github.com/vercel/next.js/issues/new/choose)! We are paying close attention to reported issues, and we can only get to Turbopack 1.0 with your help.
    
-   **Reducing memory consumption.** Turbopack uses [fine-grained function-level caching](https://turbo.build/pack/docs/core-concepts) inspired by other tools [like the Rust compiler and rust-analyzer](https://rustc-dev-guide.rust-lang.org/salsa.html). We’re extending our caching framework to improve cache eviction and to avoid caching intermediate results that are unlikely to be reused.
    
-   **Finishing the persistent on-disk cache.** Turbopack’s caching framework supports serialization and deserialization, and we’ve prototyped some on-disk representations for our computation graph, but we need to finish this work and turn it on by default. Surprisingly, even without an on-disk cache, we find that in nearly all cases Turbopack cold starts are still faster than webpack with a warm cache.
    
-   **Finishing support for production builds.** We’re working on bringing the Next.js test suite for production builds [to 100% passing with Turbopack](https://areweturboyet.com/build). Supporting production builds requires implementing optimizations that are relevant for optimized production builds, such as [tree shaking](https://github.com/vercel/turbo/pull/8523). [Tobias Koppers](https://github.com/sokra) recently [gave a talk about the challenges of implementing production builds at JSNation 2024](https://portal.gitnation.org/contents/challenges-for-incremental-production-optimizations).
    

We look forward to continuing our work on Turbopack to help improve the development velocity of your web applications.