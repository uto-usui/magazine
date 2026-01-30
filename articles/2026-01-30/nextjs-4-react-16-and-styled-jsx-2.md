---
title: "Next.js 4: React 16 and styled-jsx 2"
source: "https://vercel.com/blog/next4"
publishedDate: "2017-10-09"
category: "frontend"
feedName: "Vercel"
author: "Tim Neutkens"
---

3 min read

Oct 9, 2017

We are happy to introduce **Next.js 4**, which features support for React 16 and introduces a major upgrade for the default styling engine styled-jsx with support for **dynamic styles**.

Major performance improvements are introduced: SSR with Next.js 4 is **2.6x faster** and style initialization is **20% faster**. According to CSS-in-JS benchmarks, Next.js styles [are now the fastest of any library](https://gist.github.com/timneutkens/ab0ac6dd6d235f1bce43d31c924cf75a).

Next.js 4 is the result of the work of [29 contributors](https://github.com/zeit/next.js/releases/tag/4.0.0), the highest of any release yet! Check out the changes below.

## [Link to heading](#react-16)React 16

React 16 introduces numerous improvements, which you can benefit from right away by just bumping your dependencies:

```
npm i next@latest react@latest react-dom@latest
```

With Next.js 3.0 we get about **105 requests per second** on one of our model pages:

![A benchmark of 5000 requests against Next.js 3.0 SSR](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6KsYHAHNc7f3EJ6VatYAGL%2F81188afa1c9e19e05d8f2263eb46ab27%2F1.png&w=1920&q=75)

A benchmark of 5000 requests against Next.js 3.0 SSR

and **272 requests per second** with Next.js 4 and React 16 (a _2.6x improvement_!)

![A benchmark of 5000 requests against Next.js 4 SSR. 2.6x faster!](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F31IafrlkecgSm3vqVPn6Jq%2Fd60168aea10bfa5fd7060e14146c216a%2F2.png&w=1920&q=75)

A benchmark of 5000 requests against Next.js 4 SSR. 2.6x faster!

This brings React to similar levels of server-rendering performance as those we’ve observed when using Next.js in conjunction [with preact](https://github.com/zeit/next.js/tree/master/examples/using-preact).

## [Link to heading](#styled-jsx-2)Styled-jsx 2

[styled-jsx](https://github.com/zeit/styled-jsx) is a babel plugin to add support for styles inside React components. This effectively gives you the ability to have _single file components_ with scoped and isolated CSS:

```
export default () => (    <div>      Hello there <span>my friend</span>      <style jsx>{`        /* this style only applies to the span within lexical scope */        span { color: red; }      `}</style>    </div>  )
```

CSS can be embedded alongside your JSX. It just works!

Until today, there was support for embedding **constants** inside your styles, helpful for all sorts of configuration that applies to your CSS:

```
import { COLOR } from './css-config';export default () => (    <div>      Hello there <span>my friend</span>      <style jsx>{`        /* this style only applies to the span within lexical scope */        span { color: ${COLOR}; }      `}</style>    </div>)
```

In this case, COLOR is a constant, which is supported in 1.x

As of [styled-jsx 2](https://github.com/zeit/styled-jsx/releases/tag/2.0.1), shipping with Next.js 4, you can now embed **variables and expressions from within the scope**, which can come from component props or state.

```
export default ({ color }) => (    <div>      Hello there <span>my friend</span>      <style jsx>{`        /* this style only applies to the span within lexical scope */        span { color: ${color}; }      `}</style>    </div>  )
```

In this case, color is a React prop and can change over time!

This has the effect of reducing the need for inline styles in combination with static styles, which can create some confusion when reading component code. It also improves styled-jsx for use cases like animation and theming.

[styled-jsx 2](https://github.com/zeit/styled-jsx/releases/tag/2.0.1) packs significant [performance improvements](https://gist.github.com/timneutkens/ab0ac6dd6d235f1bce43d31c924cf75a). When used with static styles, it’s **the fastest way to use styles** in your application. When using dynamic styles, it’s among the fastest (and only getting faster in the future!)

## [Link to heading](#full-release-notes)Full Release Notes

**Minor changes**

-   Treat navigation to empty hash as hash navigate: [#2971](https://github.com/zeit/next.js/issues/2971)
    
-   Pass conf to export function: [#2962](https://github.com/zeit/next.js/issues/2962)
    
-   Keep some buffered pages, that won't be disposed. Fix [#1939](https://github.com/zeit/next.js/issues/1939): [#2592](https://github.com/zeit/next.js/issues/2592)
    
-   Add webpack-bundle-size-analyzer example: [#3013](https://github.com/zeit/next.js/issues/3013)
    
-   Add doc to onDemandEntries configuration: [#3030](https://github.com/zeit/next.js/issues/3030)
    
-   Update with-firebase-hosting example: [#3032](https://github.com/zeit/next.js/issues/3032)
    
-   Allow use of filenames in exportPathMap: [#2973](https://github.com/zeit/next.js/issues/2973)
    
-   Configurable opts for babel-preset-env + babel-plugin-transform-runtime: [#2991](https://github.com/zeit/next.js/issues/2991)
    

**Patches**

-   README improvement: [#3038](https://github.com/zeit/next.js/issues/3038)
    
-   Update the hash-statics example to support sub-dirs: [#3015](https://github.com/zeit/next.js/issues/3015)
    
-   Example: Improve ReasonML example: [#3021](https://github.com/zeit/next.js/issues/3021)
    
-   Added Fastify example: [#3034](https://github.com/zeit/next.js/issues/3034)
    
-   More elegant application of antd: [#2840](https://github.com/zeit/next.js/issues/2840)
    
-   Upgrade dependencies: [#2998](https://github.com/zeit/next.js/issues/2998)
    
-   Corrected dependencies for preact and inferno: [#2583](https://github.com/zeit/next.js/issues/2583)
    
-   Fix coding style of snippets: [#2806](https://github.com/zeit/next.js/issues/2806)
    
-   Tie page visibility api to on demand pinger: [#2818](https://github.com/zeit/next.js/issues/2818)
    
-   Only use strict dependencies: [#2929](https://github.com/zeit/next.js/issues/2929)
    
-   Fix error messages in server/export.js: [#2933](https://github.com/zeit/next.js/issues/2933)
    
-   Expose buildId to custom webpack configs: [#3001](https://github.com/zeit/next.js/issues/3001)
    
-   Added PropType: [#3003](https://github.com/zeit/next.js/issues/3003)
    
-   Add "asPath" information to url objects: [#2988](https://github.com/zeit/next.js/issues/2988)
    

## [Link to heading](#conclusion)Conclusion

With nearly **18,000 stars** in the 10 months since the [initial Next.js release](https://vercel.com/next), we are humbled by the amazing growth and reception the Next.js project has seen. Next.js is now being used by companies of all size: from Fortune 50 enterprises, to design studios and startups and individuals all over the world.

Moving forward, we plan on continuing to deliver frequent releases that improve your development experience and ability to extend Next.js to fit an ever-growing range of applications.

Come Join Us!