---
title: "Towards Next.js 5: Introducing Canary Updates"
source: "https://vercel.com/blog/next-canary"
publishedDate: "2017-11-15"
category: "frontend"
feedName: "Vercel"
author: "Tim Neutkens"
---

3 min read

Nov 15, 2017

On the heels of the announcements of canary releases for [Hyper](https://hyper.is/), [Now CLI](https://vercel.com/download#command-line), and [Now Desktop](https://vercel.com/download), we are glad to announce the immediate availability of a canary channel for Next.js.

In addition, we are excited to share some of the goals we are currently working on towards the release of Next.js 5!

## [Link to heading](#next.js-5:-bigger-scale)Next.js 5: Bigger Scale

Next.js is designed to present the developer the smallest possible API surface on top of React to make app and website development productive.

Therefore, instead of writing new features or expanding that API, we are focusing on scalability.

We have therefore divided the Next.js 5 roadmap into two broad categories:

1.  Making Next.js perform better with large codebases (single repository)
    
2.  Making Next.js work better for larger teams (across multiple repositories)
    

## [Link to heading](#the-roadmap)The Roadmap

1.  **Improved Compilation Speed**
    
    -   Better startup performance (first time you run `next`)
        
    -   Better lazy page building performance
        
2.  **Improved Sourcemaps**
    
    -   Accurate sourcemaps for all categories of errors
        
    -   Support for external sourcemaps
        
3.  **Multiple Next.js apps on the same domain**
    
    -   Ability to designate a prefix to mount an app on
        
    -   Interoperability for `<Link>` across app realms
        
4.  **Simpler sharing of components on npm**
    
    -   No need to transpile before publishing
        
    -   Easier importing of Next.js components from the registry
        

The first two items will make you more productive in the local scope of a project. Larger codebases stand to see the most benefits (complex component hierarchies).

The last two will make Next.js more productive across your entire organization, by allowing you to split more and share. Larger companies with many teams will see many workflow improvements.

Finally, we're adding some highly requested examples (like user authentication), improved documentation for Next.js internals and smaller features and bugfixes.

## [Link to heading](#working-on-the-cutting-edge)Working on the Cutting Edge

All ongoing development will be based out of the new [canary](https://github.com/zeit/next.js) branch on Github.

This branch will be released much more often than the _master_ branch. This will ensure that _canary_ is _always latest_ and _master_ is _always stable_.

The best part? As soon as a git tag is made, a release is automatically published to [npm](https://www.npmjs.com/package/next) using Travis CI.

### [Link to heading](#how-to-start-using-canary)How to Start Using Canary

We have added a new distribution tag named "canary" in our [npm package](https://www.npmjs.com/package/next). To install Next.js canary, you simply run one command:

```
npm install --save next@canary react react-dom
```

Obviously, there's a caveat: Some of the changes we introduce will be _experimental_. If you encounter issues, [let us know](https://github.com/zeit/next.js/issues) or just switch back to the stable channel!

That said, a priority of our team is to make canary releases that are drop-in, backwards compatible and as stable as possible.

## [Link to heading](#our-first-canary-release)Our First Canary Release

I'm happy to share that the first canary release is already available! [4.2.0-canary.1](https://github.com/zeit/next.js/releases/tag/4.2.0-canary.1) brings substantial improvements and brings us closer to some of the goals stated above.

**Minor Changes**

-   Combine source maps: [#3178](https://github.com/zeit/next.js/issues/3178)
    
-   Expose mechanism to monitor render events: [#2655](https://github.com/zeit/next.js/issues/2655)
    
-   Support de-deduping head tags by setting key: [#3170](https://github.com/zeit/next.js/issues/3170)
    
-   Use fs.realpath to get actual project directory: [#3243](https://github.com/zeit/next.js/issues/3243)
    
-   Allow overriding Content-Type: [#3242](https://github.com/zeit/next.js/issues/3242)
    
-   Make pages glob pattern overridable: [#3195](https://github.com/zeit/next.js/issues/3195)
    
-   Use uglify-es for minification: [#3150](https://github.com/zeit/next.js/issues/3150)
    
-   Make sure NODE\_ENV is production for react-dom to optimize: [152c2c2](https://github.com/zeit/next.js/commit/152c2c2)
    

**Patches**

-   Add note about NODE\_ENV being set automatically: [72827d2](https://github.com/zeit/next.js/commit/72827d2)
    
-   Output webpack build stats as webpack-stats.json: [#2828](https://github.com/zeit/next.js/issues/2828)
    
-   Upgrade styled-jsx to version 2.1.2: [#3231](https://github.com/zeit/next.js/issues/3231)
    
-   Messages are available within initialProps: [#3252](https://github.com/zeit/next.js/issues/3252)
    
-   Set Cache-Control max-age to a year: [#3247](https://github.com/zeit/next.js/issues/3247)
    
-   Document router events the way they are used: [#3268](https://github.com/zeit/next.js/issues/3268)
    
-   Update withData.js - support withRouter HOC: [#3286](https://github.com/zeit/next.js/issues/3286)
    

**Examples**

-   With-apollo example using Apollo 2: [#3180](https://github.com/zeit/next.js/issues/3180)
    
-   Change \_error.js example to use err prop: [#3197](https://github.com/zeit/next.js/issues/3197)
    
-   Create example of activeClassLink using withRouter: [#3188](https://github.com/zeit/next.js/issues/3188)
    
-   Added Sentry example: [#3215](https://github.com/zeit/next.js/issues/3215)
    
-   Dropped isomorphic-fetch in examples in favor of isomorphic-unfetch: [#3230](https://github.com/zeit/next.js/issues/3230)
    
-   Only-client-render-external-dependencies example: [#3229](https://github.com/zeit/next.js/issues/3229)
    
-   Add kea example: [#3262](https://github.com/zeit/next.js/issues/3262)
    
-   Example with-redux-observable: [#3272](https://github.com/zeit/next.js/issues/3272)
    
-   Update the custom-server-express with an req.params example: [#3258](https://github.com/zeit/next.js/issues/3258)
    
-   Update README.md for with-shallow-routing example: [#3285](https://github.com/zeit/next.js/issues/3285)
    

## [Link to heading](#want-to-contribute)Want to Contribute?

If you are looking to start contributing to Next.js, we have recently introduced a [good first issue label](https://github.com/zeit/next.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). These are small –yet very impactful– issues that are ideal for beginners to our codebase.

If you have any questions or want some guidance on how to get started, feel free to join our public chat and ask around!