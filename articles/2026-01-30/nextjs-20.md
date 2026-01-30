---
title: "Next.js 2.0"
source: "https://vercel.com/blog/next2"
publishedDate: "2017-03-27"
category: "frontend"
feedName: "Vercel"
author: "Arunoda Susiripala"
---

6 min read

Mar 27, 2017

More than **3.1 million developers** read our [announcement post](https://vercel.com/blog/next) of [Next.js](https://github.com/zeit/next.js). More than **110 contributors** have submitted patches, examples or improved our documentation. Over **10,000 developers** have starred us on [GitHub](https://github.com/zeit/next.js).

Today, we are proud to introduce **Next 2.0** to the world. What follows is a quick summary of every new feature and improvement we have made.

## [Link to heading](#react-made-easy-and-simple)React Made Easy and Simple

Next.js is a very slim yet powerful framework. Place React components in a `pages` directory and running `next`, and you'll get automatic code splitting, routing, hot code reloading and universal (server-side and client-side) rendering.

It's **easy** because it's one command for development (`next`), and two others (`next build` and `next start`) for a production-ready app.

It's **simple** because it composes really well. It plays well with the rest of the React and JavaScript (npm) ecosystems.  
It's also very **small**. Check out the [README](https://github.com/zeit/next.js): the entire framework's documentation is a 5 minute read.

**NEW!** Want to learn step-by-step, by example? Check out the [Learn Next.js](https://nextjs.org/learn) tutorial!

## [Link to heading](#programmatic-api)Programmatic API

When we launched Next.js, there was no way to do dynamic routing or load your custom server code. We did this because we believe in shipping early and often.

Now, you can run `node index.js` to boot up your own custom server and take full control of the routing and rendering pipeline. This enables powerful features like [fancy URLs](https://github.com/zeit/next.js/tree/master/examples/custom-server-express) or [custom caching schemes](https://github.com/zeit/next.js/tree/master/examples/ssr-caching).

```
const express = require('express')const next = require('next')const dev = process.env.NODE_ENV !== 'production'const app = next({ dev })const handle = app.getRequestHandler()app.prepare().then(() => {  const server = express()  server.get('/r/:subreddit', (req, res) => {    return app.render(req, res, '/b', {      ...req.query,      subreddit: req.params.subreddit    })  })  server.get('*', (req, res) => {    handle(req, res)  })  server.listen(3000)})
```

Implementing Reddit-style fancy URLs with Express and Next.js

## [Link to heading](#bring-your-own-react)Bring Your Own React

To start a project, you now need to bring in `next` and two extra deps: `react` and `react-dom`.

```
npm install --save next react react-dom
```

This has tremendous benefits, at the tiny cost of two extra parameters in the initial \`install\` to set up your project:

-   You can pin React to the version that you know works well on your project
    
-   It makes Next.js codebase clean and pluggable
    
-   You can update React independently of us. e.g: no waiting for a Next.js release after React gets updated
    
-   You can experiment with alternative implementations of the React API. We have examples for [Inferno](https://github.com/zeit/next.js/tree/master/examples/using-inferno) and [Preact](https://github.com/zeit/next.js/tree/master/examples/using-preact)!
    

## [Link to heading](#component-css-support)Component CSS Support

Our mission is to make Next.js as familiar as possible to developers on the Web Platform. To that end, `next/css` is now deprecated in favor of `styled-jsx`, a Babel transformation that gives us scoped (isolated) full CSS support.

This is what a component with CSS that's local, conflict-free, server-rendered and injected once per instance looks like:

```
export default () => (  <div>    <p>hi there</p>    <style jsx>{`      p {        color: red;      }    `}</style>  </div>)
```

The styles for \`p\` only apply to the JSX tags defined statically within the scope

You can read more about `styled-jsx` on its [GitHub](https://github.com/zeit/styled-jsx) repository.

## [Link to heading](#pre-fetching)Pre-fetching

We implemented the `prefetch` attribute for the `<Link>` component.

```
export default () => (  <div>    <Link href="/next-page" prefetch>Go to the next page</Link>  </div>)
```

And just like that, you get the performance of a "SPA", without the initial download and expensive bootup penalty of big bundles. Combined with server rendering, this typically means extraordinary performance with very little effort.

## [Link to heading](#next-news)Next News

We think a better "Hello World" app than TodoMVC is actually… Hacker News!

Our implementation, Next News, is fully server-rendered, queries the data over Firebase and updates in realtime as new votes come in. Check out the demo at [next-news.vercel.app](https://next-news.vercel.app/).

![Navigating around Next News is snappy!](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3FLNRSkvYVoLgSno9KdIYQ%2F05085ec704b9f68cb7b91d4dcfd06502%2Fhn.gif&w=1920&q=75)

Navigating around Next News is snappy!

To show off our ability to both partially or fully server render, while having the freedom to execute arbitrary codepaths on the client (upon `componentDidMount`), notice that we show a "Loading…" message when loading an item on the client, but not when we server-render. This makes us a less strict _clone_, but it's for a good cause.

We also went as far as replicating the style-less HN login page. Each top-level component (page) in Next.js defines the _entirety of the document_. There's no notion of global layouts or configuration, only composition via React's component system, which gives you great flexibility.

## [Link to heading](#more-examples)More Examples

We're very thankful to our community for having submitted so many examples of backends (Express, HAPI, Koa…), styling systems (cxs, glamor, styled-components…), testing systems (jest), type systems (TypeScript and Flow), data fetching (Apollo) and many others.

You can find them all [in our GitHub repository](https://github.com/vercel/next.js/tree/master/examples).

## [Link to heading](#scalable-hmr-\(hot-module-replacement\))Scalable HMR (Hot Module Replacement)

Out of the box, Webpack watches and recompiles your entire project upon any change. We found that HMR was therefore not scaling well as our projects grew in number of code-splitting entry points and components.

We deployed a new lazy compilation mechanism that only subscribes to the pages that you're actually working on (i.e.: all the component trees currently rendered).

In our tests, this has made compilation 10 to 20 times faster for large projects.

## [Link to heading](#a-smaller-build)A Smaller Build

We've made some important improvements to how builds work:

-   We set up Webpack common chunks to avoid shipping repeated code across components
    
-   We use hashes to make the initial bundle files be cached permanently on clients, making page loads faster
    
-   We added provisions to make sure an app works correctly
    

The best part? Every Next.js app is now smaller and more efficient.

![Data for a basic site with the Next.js and React bundled](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6OXO5Fh38zIZAAMOp4YHyk%2Fd952d8514f6d4adf132137c16248cbcf%2Fsmaller-build.png&w=1920&q=75)

Data for a basic site with the Next.js and React bundled

We are working on making Next.js much smaller and we have identified many opportunities for optimization already.

The React team is also working on size optimizations for React Fiber, which we will begin testing soon.

## [Link to heading](#fully-extensible)Fully Extensible

Many of the examples above introduce new features to the code or the build process. This is possible because Next.js gives you complete control over Babel's and Webpack's configuration.

To extend Babel, we let you apply Next.js' settings as a preset.

```
{  "name': "my-next-app",  […]  "babel": {    "presets": ["next/babel"],    "plugins": [[      "transform-define",      "./env-config.js"    ]]  }}
```

\`babel-plugin-transform-define\` will let you to replace any JS expression mapped in \`env-config.js\` at compile time

To extend webpack or tweak other settings, you can define a `next.config.js` file. Check out the [README](https://github.com/zeit/next.js#custom-configuration) for the complete documentation.

## [Link to heading](#featured-at-reactconf)Featured at ReactConf

Our CEO [Guillermo Rauch](https://twitter.com/rauchg) presented Next.js at ReactConf in Santa Clara a few weeks ago. Check it out!

## [Link to heading](#the-road-to-3.0)The Road to 3.0

We attribute our success with this release to having released early, iterated frequently and listened to our community. But something extremely important as well was making our roadmap and priorities **clear and public**.

Here are some of the goals for the coming releases on our way to 3.0:

### [Link to heading](#improved-hmr)Improved HMR

We are still working on a few improvements to hot module replacement. Some errors don't have accurate locations and there are a few issues with recovering from errors in certain scenarios.

### [Link to heading](#faster-dev-compilation)Faster Dev Compilation

We are investigating ways to continue to optimize the development experience. Since both Node.js and modern browsers that developers use iterate so quickly, we can skip large portions of the compilation step for really fast reloads.

### [Link to heading](#seamless-support-for-lazy-import\(\))Seamless Support for Lazy `import()`

This will allow for server-rendered pages that expose different JS components according to the data they used, for example. In addition, once the component mounts on the client, you can load any component you want, lazily.

_Note:_ this already partially works, but we will continue to refine it an document it.

### [Link to heading](#react-fiber)React Fiber

We are looking forward to testing and ensuring Next.js works perfectly with the upcoming React engine: Fiber. This will potentially introduce new opportunities, like the ability to _stream HTML from the server_ as it is generated.

### [Link to heading](#static-exports)Static Exports

You should be able to _server-render to files_ via a `next export` command. In other words, you'll be able to statically export your application to HTML files.

## [Link to heading](#ready-for-production)Ready for Production

Aside from this very website, we are very happy many others in the industry have adopted Next.js. Here are some that have [let us know](https://github.com/zeit/next.js/issues/1458).

If you have shipped Next.js to production or are planning to, please let us know. We are always hanging out on the `#next` channel in our Public Slack community.

We are bringing together the Next.js community at our one-day conference ZEIT Day on April 29th in San Francisco. It's a unique opportunity to meet other users and learn more about it from its creators!