---
title: "Next.js 3.0"
source: "https://vercel.com/blog/next3"
publishedDate: "2017-08-08"
category: "frontend"
feedName: "Vercel"
author: "Arunoda Susiripala"
---

3 min read

Aug 8, 2017

We are very excited excited to announce the stable release of Next.js 3.0. Ever since our [beta announcement](https://vercel.com/blog/next3-preview), we have been using it to power [vercel.com](https://vercel.com/) and have received lots of feedback and contributions from our [community](https://zeit.chat/).

Let’s walk through what’s been improved and what’s altogether new, or fetch the latest version from [npm](https://www.npmjs.com/package/next)!

_New to Next.js?_ Next.js is a zero-configuration, single-command toolchain for React apps, with built-in server-rendering, code-splitting and more. Check out [Learn Next.js](https://learnnextjs.com/) to get started!

## [Link to heading](#static-export-support)Static Export Support

This was the [most request feature](https://github.com/zeit/next.js/issues/604) by the community on GitHub. And we have delivered!

All it takes to export your project to a directory with plain **.html** and **.css** files is to [configure your project](https://github.com/zeit/next.js#static-html-export) and run:

```
next export
```

The bonus? You can deploy statically to [now.sh](https://vercel.com/home) as many times as you want, for free!

The prolific Next.js community has already come up with some static blog generators for you to check out:

## [Link to heading](#dynamic-import-support)Dynamic Import Support

Next.js now fully supports [TC39 dynamic import](https://github.com/tc39/proposal-dynamic-import).

With dynamic imports, our codebase gets split into a set of chunks that can later be loaded dynamically. The developer gets full control to load code over time, depending on user interaction or the data itself.

It's pretty easy to use. Just import your module as a promise as shown below:

```
const moment = import('moment')setTimeout(function() {  moment.then(moment => {  // Do something with moment  })}, 15000)
```

The module will be downloaded when we starting to use it. In the above example, the `moment` module will be downloaded when the `setTimeout` callback runs (~15 secs after the page load.) This speeds up our main JavaScript bundle by loading code only when we need it.

### [Link to heading](#dynamic-react-components)Dynamic React Components

Additionally, Next.js comes with a powerful opt-in utility called [`next/dynamic`](https://github.com/zeit/next.js#dynamic-import) which helps you to create dynamically loaded React Components easily.

Dynamic components _can_ load React code on-demand, but the most interesting feature is that if they are included in the initial rendering, server-rendering still works!

Let's look at some examples!

```
import dynamic from 'next/dynamic'const DynamicComponent = dynamic(import('@components/hello'))export default () => (  <div>    <Header />    <DynamicComponent />    <p>HOME PAGE is here!</p>  </div>)
```

Loading a single component, dynamically.

```
import dynamic from 'next/dynamic'const HelloBundle = dynamic({  modules: (props) => {    const components = {      Hello1: import('@components/hello1'),      Hello2: import('@components/hello2')    }    // you can add / remove components based on props    return components  },  render: (props, { Hello1, Hello2 }) => (    <div>      <h1>{props.title}</h1>      <Hello1 />      <Hello2 />    </div>  )})export default () => (  <HelloBundle title="Dynamic Bundle" />)
```

Loading different components based on dynamic properties!

Until today, code splitting was based on routes, or the **section** of the application the user had loaded. Moving forward, you'll be able to load **code as a function of the data** the user is presented with.

We are excited about the apps people will create with this new paradigm.

## [Link to heading](#more-beautiful-errors)More Beautiful Errors

Thanks to [Krisztian Puska](https://github.com/zeit/next.js/issues/2182), we’ve updated our error color theme to be easier on the eyes and more accessible.

![The gif shows a syntax error being hot reloaded with the new¬ colors.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7MmPurGozwMRIqaKgRZWXB%2F2160ce103c418638deb792c511bfeb76%2F1.gif&w=1920&q=75)

The gif shows a syntax error being hot reloaded with the new¬ colors.

## [Link to heading](#improved-hot-module-replacement)Improved Hot Module Replacement

We have addressed a variety of scenarios that would render **HMR (****_hot module replacement_****)** ineffective before, in particular around error recovery.

Moving forward, when an error of any kind occurs, you will be able to make changes to your code, save and see the error change, be substituted by another error or go away altogether!

### [Link to heading](#hmr:-node.js-8.0-support)HMR: Node.js 8.0 Support

We have solved `ERR_INCOMPLETE_CHUNK_ENCODING` errors in the dev tools showing up when using Next.js with the new Node.js 8.x release line.

![You won’t be seeing this one again!](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F34HWUBpBKRV9SWSZIXrffM%2Fcf2c26af3fd84e9f644ea5ea71e88150%2Fhmr-error.png&w=1920&q=75)

You won’t be seeing this one again!

### [Link to heading](#hmr:-navigating-to-errors)HMR: Navigating to Errors

If you navigate to a page that had any kind of error, it’ll be handled appropriately now, rendering the error message and giving you the ability to correct it in realtime.

![We navigate to the index page with errors, fix them and watch¬ the page recover.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FemtewrCTmmquDMCArpZ3b%2F50f3e1a9c16cd32676872538b88ff60c%2F2.gif&w=1920&q=75)

We navigate to the index page with errors, fix them and watch¬ the page recover.

### [Link to heading](#hmr:-404-to-error-to-success)HMR: 404 to Error to Success

We have addressed a bug where you navigate to a missing page (correctly rendered as **404**), but you make a mistake when populating it.

![After we create the page, we introduce an error and then¬ promptly fix it.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3NZdRVTJtLi1ForXSx70Xk%2Fe8f7c3ac7b285be8810277592dfc97b7%2F3.gif&w=1920&q=75)

After we create the page, we introduce an error and then¬ promptly fix it.

### [Link to heading](#hmr:-better-bad-returns)HMR: Better Bad Returns

If you happen to return the wrong type, we now handle that situation smoothly.

![After the right type is returned, the page recovers¬ successfully.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7kN46ISv9HPQT7WQmqFRIA%2F7e46420de71a40c193206fc8713acb2a%2F4.gif&w=1920&q=75)

After the right type is returned, the page recovers¬ successfully.

### [Link to heading](#hmr:-undefined-can-be-a-function)HMR: Undefined Can Be a Function

Any type of runtime error when evaluating the module is now correctly caught. Realtime debugging of `undefined is not a function` is right around the corner.

![We first make a syntax error, which recovers to a runtime error,¬ which recovers to the page.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2y9lLUif5mMnhtsKEyk9uS%2Faeae21161de351d342cb415a8d608e07%2F5.gif&w=1920&q=75)

We first make a syntax error, which recovers to a runtime error,¬ which recovers to the page.

## [Link to heading](#faster:-serverless-ready)Faster: Serverless Ready

Bootup time for a baseline Next.js app is now **5 times faster**, down to [about 200ms from 1000ms](https://github.com/zeit/next.js/pull/2566). Stay tuned for some exciting announcements about serverless Next.js with Now!

## [Link to heading](#smaller:-optimized-core-bundles)Smaller: Optimized Core Bundles

We have optimized the core Next.js bundle even further and it's now [10% leaner](https://github.com/zeit/next.js/pull/2422)! Only the most crucial production code is included in your final bundles.

## [Link to heading](#4.0-and-beyond)4.0 and Beyond

As we have done after other major releases, we will soon be publicly sharing our roadmap for **Next.js 4.0**.

The focus will be on an even leaner core, faster bootup time and rendering, integration with React 16 and better use of caching during development to avoid re-compilation.

As always, we recommend you join our [Slack community](https://zeit.chat/) and [follow us on Twitter](https://twitter.com/zeithq).