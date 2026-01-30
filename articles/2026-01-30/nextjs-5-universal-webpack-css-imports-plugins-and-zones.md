---
title: "Next.js 5: Universal Webpack, CSS Imports, Plugins and Zones"
source: "https://vercel.com/blog/next5"
publishedDate: "2018-02-05"
category: "frontend"
feedName: "Vercel"
author: "Tim Neutkens"
---

8 min read

Feb 5, 2018

We are very happy to introduce Next.js 5.0 to the world. It’s available on npm effective immediately.

To upgrade, run:

```
$ npm i next@latest react@latest react-dom@latest
```

In addition to bumping Next.js, we upgrade the peer dependencies \`react\` and \`react-dom\`

Next.js is a toolkit for universal, server-rendered (or [statically pre-rendered](https://vercel.com/blog/next3)) React.js applications. Getting started developing an application of any size is as easy as executing `next`. ([Read more](https://vercel.com/blog/next).)

With every new release we are [committed](https://vercel.com/blog/oss) to retaining backwards compatibility, offering simple upgrade paths and only making API changes when absolutely necessary. Next.js 5.0 is no exception.

Under the hood, however, Next.js has undergone a radical transformation to enable powerful new use cases and extensibility. We started by making Next.js share a universal Webpack pipeline for both server and client code.

## [Link to heading](#universal-webpack-and-next-plugins)Universal Webpack and Next Plugins

Next.js leverages existing powerful tools like Webpack, Babel and Uglify, presented to the end-user as a remarkable simple interface: `next` (to develop), `next build` (to prepare for production) and `next start` (to serve) or `next export` to pre-render to static files.

One of the early decisions we made was to provide very powerful extensibility points for how these tools are configured. We didn't just want ease of use, we wanted to enable flexibility to extend the toolkit however you wanted.

For example, you can [extend the Next.js webpack configuration](https://github.com/zeit/next.js#customizing-webpack-config) by setting up a `webpack` property in your `next.config.js`.

Because webpack executes differently for production and development, we decided at the time to make it a function that decorates our default webpack config:

```
module.exports = {  webpack(config, { dev }) {    // modify it!    return config;  }}
```

An example of the optional \`next.config.js\` file

However, Webpack would only execute on the client (browser) bundles, and you would miss out on the possibility of using this great toolchain for server-rendering.

We are happy to announce that we have extensively refactored our codebase to **make Webpack work universally**.

From your perspective, all that changes is that an additional `isServer` property is passed to the decorator function above. However, the new semantics mean that the broad ecosystem of Webpack loaders are now available for you to use.

### [Link to heading](#css,-less,-sass,-scss-and-css-modules)CSS, LESS, SASS, SCSS and CSS Modules

One of our most highly requested features is the ability to import CSS files and take advantage of Webpack loaders:

```
import './index.css'export default () => (  <div>    <p>I love CSS!</p>  </div>)
```

An example page (\`pages/index.js\`) using CSS imports thanks to Universal Webpack

To make this work, you can bring the loaders you need as peer dependencies:

```
$ npm i --save css-loader style-loader postcss-loader
```

Next.js which gives you the freedom to pick and choose which loaders you need and to upgrade them to different versions at will.

And then extend the config to configure your loaders. In `next.config.js`:

```
module.exports = {  webpack(config, options) {    const { dev, isServer } = options    const extractCSSPlugin = new ExtractTextPlugin({      filename: 'static/style.css',      disable: dev    })    config.module.rules.push({      test: /\.css$/,      use: cssLoaderConfig(extractCSSPlugin, {        cssModules,        dev,        isServer      })    })    return config  }}
```

Extending the raw webpack config gives you great flexibility and control

While our general recommendation is to use component-local styling solutions, like the [included `styled-jsx` babel plugin](https://github.com/zeit/next.js#built-in-css-support), we believe CSS loaders have many important strengths, like making it easy to re-use existing CSS codebases and vastly simplifying migrating old codebases to Next.js.

Instead of enabling every conceivable feature and loader by default, we are introducing [Next.js plugins](https://github.com/zeit/next-plugins), which are _simple functions that decorate your configuration_. Instead of manually extending the configuration to set up the loaders like we did above, you can just do:

```
const withCss = require('next-css');module.exports = withCss({ /* extra optional config */ })
```

All it takes to enable importing \`.css\` files is to bring in \`next-css\`

Read more on [CSS Loaders](https://github.com/zeit/next-plugins/tree/master/packages/next-css) usage with Next.JS, or refer to some of the packages we have already created for you:

Our goal is to empower the community to develop and grow an ecosystem of practical simple extensions. To that end, we are opening the [next-plugins](https://github.com/zeit/next-plugins) monorepo for the Next.js community to maintain. All PRs are welcome!

### [Link to heading](#typescript-support)TypeScript Support

One of the [fastest growing technologies](https://2017.stateofjs.com/2017/flavors/results/) in the JavaScript ecosystem is TypeScript. So much so, that it is becoming [officially supported by Babel 7](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript), which means it will naturally be supported by Next.js by just [customizing your .babelrc](https://github.com/zeit/next.js#customizing-babel-config).

In the mean time, thanks to our new Universal Webpack support, you can already get full TypeScript support _today_!

You can extend your webpack config like this:

```
module.exports = {  webpack(config, options) {    const { dir, defaultLoaders } = options    config.resolve.extensions.push('.ts', '.tsx')    config.module.rules.push({      test: /\.+(ts|tsx)$/,      include: [dir],      exclude: /node_modules/,      use: [        defaultLoaders.babel,        { loader: 'ts-loader', options: { transpileOnly: true } }      ]    })    return config  }}
```

All we have to do is enable the \`ts-loader\`

Like CSS loaders and pre-processors, TypeScript has been one of the most requested features. To make incorporating it into projects just as easily as any other loader, we now have a [`next-typescript` plugin](https://front-git-removed-remaining-local-posts.vercel.vercel.app/) you can include in your `next.config.js` file:

```
const withTs = require('next-typescript');module.exports = withTs({ /* additional config*/ })
```

Plugins can be trivially composed: they are just functions

### [Link to heading](#better-support-for-react-altlibs-&-module-overloading)Better Support for React Altlibs & Module Overloading

Many drop-in replacement implementations of React have emerged over time. Among them, some notable ones are [`preact`](https://preactjs.com/), [`nervjs`](https://github.com/NervJS/nerv) and [`inferno`](https://github.com/infernojs/inferno).

Other libraries focus on replacing the DOM renderer, like [`react-dom-lite`](https://github.com/jquense/react-dom-lite), which is aiming to make a smaller React build by introducing some minor tradeoffs in browser compatibility.

Universal Webpack support makes the process of incorporating these libraries as drop-in replacements even easier. In the same vein as the other plugins, this is all you have to do to use Next.js with preact:

```
$ npm i @zeit/next-preact preact preact-compat
```

We install the preact plugin and necessary peer dependencies

```
const withPreact = require('@zeit/next-preact');module.exports = withPreact();
```

Our new next.config.js ready for preact

Check out the very simple [@zeit/next-preact](https://github.com/zeit/next-plugins/tree/master/packages/next-preact) module or create your own!

### [Link to heading](#optional-external-sourcemaps-in-production)Optional External Sourcemaps in Production

Now that webpack is used by Next.js for both client and server code, enabling source-maps in production builds is just one small adjustment to its configuration.

In development source maps are automatically enabled, so we configure it differently for production:

```
module.exports = {  webpack(config, { dev }) {    if(!dev) {      config.devtool = 'source-map'    }    return config;  }}
```

We simply configure the \`devtool\` option differently when not in development

## [Link to heading](#zones)Zones

One of the [stated goals of Next.js](https://deck.now.sh/) from the very beginning was to bring back and preserve the simplicity of the Web.

Server-rendering, a simple and agnostica approach to data fetching and declarative pages based on the filesystem structure are some of the features we introduced in line with this thinking.

A frequently overlooked aspect of web services and web sites is how _naturally composable and scalable_ they are.

For example, `mydomain.com/settings` and `mydomain.com/` could be two entirely different apps, deployed independently, scaled independently, even running different versions of the same software.

All it takes to _"glue them together"_ into a uniform experience for the end-user is [some simple configuration](https://front-git-removed-remaining-local-posts.vercel.vercel.app/docs/features/path-aliases) of the backend routing layer or load balancers that expose them to the world.

We are very happy to now bring the ability to **compose multiple applications built with Next.js**, connected together using normal `<Link>` components. We call this feature **Zones**.

As an example, consider these two independent Next.js applications [deployed to Vercel](https://front-git-removed-remaining-local-posts.vercel.vercel.app/now):

![Both of our pages have a seamless experience, but they belong to separate apps](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FsqJpBD5w8uw88i6IOqQOt%2F938a92fcf3cb8eed182e6b1ce330e27d%2Fzones.png&w=1920&q=75)

Both of our pages have a seamless experience, but they belong to separate apps

When we [revamped](https://vercel.com/blog/better-documentation) our [docs](https://vercel.com/blog/api-2), we wanted to make accepting a community contribution as easy as possible.

We decided to split out the documentation "mini-website" into its own repository. Additionally, whenever a pull-request is submitted and a change is proposed, we deploy it automatically, in isolation:

![Every time a change happens inside a PR our bot automatically deploys it](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FatG2b3WEtYhbASvJm6hGG%2Fda8bf588311278453594a61778d002f6%2Fgithub.png&w=1920&q=75)

Every time a change happens inside a PR our bot automatically deploys it

What we ended up is _two zones_, that are brought together into the parent domain `https://vercel.com` using our [path alias feature](https://front-git-removed-remaining-local-posts.vercel.vercel.app/docs/features/path-aliases). It looks something like this:

```
{  "rules": [    { "pathname": "/docs", "dest": "our-docs.now.sh" },    { "pathname": "/api", "dest": "our-docs.now.sh" },    { "dest": "my-main-website.now.sh" }  ]}
```

These simple rules allow you to compose microservices and zones together

All that's left is to invoke a `vercel alias` command:

```
$ vercel alias -r rules.json my-domain.com
```

Our mission is to make deployment as universal and open as possible. To aid with local development, we [recently open sourced micro-proxy](https://vercel.com/blog/micro-proxy), a tool that works with the same configuration format seen above.

You are similarly able to join zones together with other solutions like Nginx, HAProxy or API Gateway.

## [Link to heading](#faster-production-build-times)Faster Production Build Times

We think developer experience and user experience go hand in hand. The more efficiently changes can be written, tested and deployed, the faster new features are added, bugs are squashed and overall user experience improves.

Consequently, we remain focused on continuously iterating on the performance profile of the most basic building blocks of the system.

With Next.js 5.0 we had an opportunity to take a look at `next build` again, the command you run prior to deploying to production or exporting your Next.js application [as a static site](https://front-git-removed-remaining-local-posts.vercel.vercel.app/docs/deployment-types/static).

We are happy to report that for vercel.com, a React app made up of thousands of components, we have seen pretty dramatic improvements with Next.js 5.0, to the tune of **23.6% faster production build times**:

![Our main application production build now takes 38 fewer seconds to complete](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ijcWfPD0E2rWquTsoVOQo%2F649cf3477b0a7e64982dd9db0234ef79%2Fbuild.png&w=1920&q=75)

Our main application production build now takes 38 fewer seconds to complete

## [Link to heading](#improved-caching-for-dynamic-imports)Improved Caching for Dynamic Imports

Whenever you use dynamic `import()`, this signals to WebPack that a new code-splitting entry-point exists.

At build time, this means generating a specific bundle for the corresponding subtree of modules.

Prior to Next.js 5.0, the dynamic bundles would receive a URL that resembles the following:

```
/_next/1517592683901/webpack/chun@components_hello1_1345d10fc951cd6717c5676c467579a6.js
```

Now, we have turned dynamic imports into content-addressable hashes of the contents of the subtree:

```
/_next/webpack/chun@components_hello1_1345d10fc951cd6717c5676c467579a6-b7874680a9e21fb6eb89.js
```

This means that across deployments, your users and customers won’t have to needlessly re-download the code they’ve already used.

## [Link to heading](#fragments)Fragments

Next.js build a top-level `<Document>` component that gets server-rendered with each page. [Overloading this component](https://front-git-removed-remaining-local-posts.vercel.vercel.app/) puts you in complete control over your markup, enabling many [advanced use cases](https://github.com/zeit/next.js/tree/canary/examples).

Part of that initial markup is the list of scripts that Next.js needs to evaluate on the client side. A custom `_document` looks like this:

```
import Document, { Head, Main, NextScript } from 'next/document'export default class extends Document {  render() {    return (      <html>        <Head/>        <body>          <Main />          <NextScript />        </body>      </html>   )}
```

\`Document\` allows you to customize the entire server-rendered output of a page

Until recently, we were forced to wrap our scripts inside a `<div>`.

With Next.js 5.0, we now take advantage of the new `Fragment` support, which translates into **more lightweight pages** and complete control over the styling of the page, with no extraneous markup.

## [Link to heading](#more-accurate-errors)More Accurate Errors

Node.js doesn’t support source maps, errors that happen on the server side are accompanied with a stack trace pointing to the compiled code.

With Next 5 we’ve improved source map support on the server side. Errors that happen when server rendering now point to the correct function and line number.

![Errors now show the correct line, file and function name](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FF4jaISzeAbHK1Ki85yDWT%2Fe9bf4fb2fb297e3f34725f2a6dac8a41%2Ferrors.png&w=1920&q=75)

Errors now show the correct line, file and function name

## [Link to heading](#conclusion)Conclusion

Universal Webpack solidifies the foundations of Next.js and makes it even more future proof. By and large, there is no longer an artificial separation of what plugins or loaders are applicable to Next.js and which ones aren’t.

In the spirit of _zero configuration_, we are excited to introduce [Next Plugins](https://github.com/zeit/next-plugins), the community repository for recipes that automatically expand the functionality of Next.js, without having to tweak specific knobs.

With this, we now support the entire spectrum of CSS solutions, compile-to-js languages like TypeScript and React alternatives like [Nerve](https://github.com/NervJS/nerv), by just bringing an additional module and being explicit about its inclusion in `next.config.js`. Simplicity without obscurity.

Zones allow interconnecting Next.js apps that are not rooted in the same repository or even server(s). We consider this a very important milestone in the “team scalability” category of improvements.

Next.js thus becomes a great candidate for large applications maintained by multiple teams. They can now deploy improvements concurrently, reducing error surfaces, increasing iteration speed and even trying out different technologies in addition to our core, like the [many different approaches](https://github.com/zeit/next.js/tree/canary/examples) to state management or data fetching.

We want to take this opportunity to thank Deep Varma and the [Trulia](https://trulia.com/) engineering team for contributing key insights, code and testing that led to the design of this feature.

As always, this release wouldn't have been possible without the many open-source contributors and [our wonderful community](https://front-git-removed-remaining-local-posts.vercel.vercel.app/chat).