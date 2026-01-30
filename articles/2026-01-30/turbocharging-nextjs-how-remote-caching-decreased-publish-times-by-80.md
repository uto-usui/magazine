---
title: "Turbocharging Next.js: How Remote Caching decreased publish times by 80%"
source: "https://vercel.com/blog/turborepo-remote-cache-nextjs-publish-times-80-percent"
publishedDate: "2022-12-22"
category: "frontend"
feedName: "Vercel"
author: "JJ Kasper"
---

3 min read

Dec 22, 2022

Next.js lets developers iterate on their projects faster—but we want to iterate on **Next.js itself** faster, too_._

This year, Next.js surpassed 4 million npm downloads for the first time. With over 2,400+ contributors, the core team here at Vercel must craft a developer experience to keep up with such a vast community to develop, test, build, and publish Next.js.

Next.js had another first this year: introducing Rust to its core. While adding Rust brings greatly improved performance for developers using Next.js, the tradeoff was an increase in CI time to publish new releases due to the prolonged process of building Rust binaries.

**Until implementing** [**Turborepo Remote Caching**](https://vercel.com/docs/concepts/monorepos/remote-caching) **dropped publish times by 80%.**

![Next.js publishing times falling by 80% using Turborepo Remote Cache on Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5MHUjnVb0LvmT0fmJL7Gud%2F415645f6bb2db52c503eba3bedaa76ec%2FPublish.png&w=1920&q=75)![Next.js publishing times falling by 80% using Turborepo Remote Cache on Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5o4YOIrLOzE3L8tyRC1d6w%2Ffb8c40ac5aa1dd5436524333456a6f6f%2FPublish.png&w=1920&q=75)

Next.js publishing times falling by 80% using Turborepo Remote Cache on Vercel.

## [Link to heading](#caching-swc-binaries-in-ci-wasn’t-enough)Caching SWC binaries in CI wasn’t enough

Turborepo Remote Caching wasn’t the first attempt we made at trying to reduce our time to publish. Before Turborepo existed, we had some existing strategies in place that we tried to leverage first.

SWC, an extensible Rust-based platform for the Web, was the primary driver in inflating build times for the Next.js core because of the lengthy nature of building Rust binaries to support various platforms.

The SWC Rust library is a built-in part of the Next.js package, extending SWC with [additional transforms useful for React projects](https://swc.rs/docs/configuration/compilation#jsctransform). This allows Next.js developers to focus on their application code instead of adding custom configuration and plugins for common transformation tasks.

We were building these binaries for Windows, Mac, and Linux and committing them to the Next.js repository to make testing easier without needing to publish canaries. This worked well enough but the sizes of the binaries were bloating the overall size of the repository, hurting git cloning times.

To work around this, we stopped committing the SWC binaries to the repo in favor of testing Next.js with **development** binaries of SWC (which can be built much quicker). Our development builds got somewhat faster but we still weren’t satisfied.

At this point, we began caching these development builds in our CI, hoping for improved build times. This also gave us only moderately positive results as we noticed high cache miss rates due to CI cache limits causing purging. We also, at worst, saw failing publishes for canary and stable releases due to the slight differences in platform handling for the binaries.

## [Link to heading](#leveraging-vercel-remote-caching)Leveraging Vercel Remote Caching

With all of our smaller, incremental wins, we still found ourselves wanting to explore better solutions. We quickly realized Turborepo would bring us what we needed, solving three key problems.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Kcwbbn9tfY7dGPa0Tvoxs%2F3dbc64609dcce21eef7f6eb6bef4fc75%2FFrame_427319365.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1jsWNt8LqGW9QujGc0XFOS%2F1b8635293433c99603baca7f3c5067b7%2FFrame_427319363__1_.png&w=1920&q=75)

### [Link to heading](#1.-task-management-for-per-platform-binaries)1\. Task management for per-platform binaries

Turborepo can cache virtually any task since caches are isolated using the inputs for the task. Those inputs can include source code, dependencies, environment variables, and [other arguments](https://turbo.build/repo/docs/core-concepts/caching#hashing).

In our case, we were compiling Rust code with a `--target` flag to create binaries for the various platforms that Next.js supports. With Turborepo, this flag ensures that we don’t pick up the wrong caches for our `cargo build` when it comes time to publish canaries.

### [Link to heading](#2.-no-more-cache-purges)2\. No more cache purges

The hashes that Turborepo creates and stores are tiny compared to the actual builds produced, letting us avoid purging the cache altogether. If we have performed one of our SWC builds before, we know that we can restore it from cache for the next time no matter how many other variations of our builds we’ve performed since then.

### [Link to heading](#3.-eagerly-pre-seeding-the-remote-cache)3\. Eagerly pre-seeding the Remote Cache

There’s still one more problem left to solve: When our SWC code _does_ change, we will have a cache miss when we go to publish a canary, resulting in that slow publish again. To avoid this, we set up a GitHub Action to eagerly build the SWC binaries whenever we create a change with its code. We even found that these eager builds have some other great side-effects:

-   They’re non-blocking, allowing us to continue to iterate without having to wait on them while we work towards the next canary.
    
-   When a cache does miss and we see a build failure, we can fix it much earlier than when we are trying to publish a canary.
    

## [Link to heading](#next.js-can-now-iterate-faster-than-ever-before)Next.js can now iterate faster than ever before

  
After creating a few custom scripts for our specific use case (building for FreeBSD, no cache invalidation when only package versions change), we were able to achieve **an 80% drop in publish times with a Turborepo Remote Cache hit**. This quality of life change not only feels great for those of us on the core team but also results in faster iterations for Next.js users so we can add more features and fix more bugs sooner.

Hit a Remote Cache using [the Turborepo and Next.js starter template](https://vercel.com/templates/next.js/turborepo-next-basic) or [visit the Vercel Remote Cache docs](https://vercel.com/docs/concepts/monorepos/remote-caching) to learn more.