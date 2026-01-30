---
title: "Next.js"
source: "https://vercel.com/blog/next"
publishedDate: "2016-10-25"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

6 min read

Oct 25, 2016

We're very proud to open-source [Next.js](https://github.com/vercel/next.js), a small framework for server-rendered universal JavaScript webapps, built on top of React, Webpack and Babel, which powers this very site!

To start using it, run inside a new directory with a `package.json`:

```
$ npm install next --save$ mkdir pages
```

Populate `pages/index.js`:

```
import React from 'react'export default () => <div>Hello world!</div>
```

Add a script to the `package.json` like this:

```
{  "scripts": {    "dev": "next"  }}
```

and run:

```
$ npm run dev
```

This blog post will go into the philosophy and design decisions of the project.

To learn how to use Next.js instead, please refer to the [README](https://github.com/vercel/next.js), where you can learn the entirety of the tool's capabilities in just a few minutes.

First we'll dive into the [background](https://vercel.com/blog/next#background) of the project and then describe 6 basic principles:

1.  [Zero setup. Use the filesystem as an API](#zero-setup.-use-the-filesystem-as-an-api)
    
2.  [Only JavaScript. Everything is a function](#only-javascript.-everything-is-a-function)
    
3.  [Automatic server rendering and code splitting](#automatic-server-rendering-and-code-splitting)
    
4.  [Data fetching is up to the developer](#data-fetching-is-up-to-the-developer)
    
5.  [Anticipation is the key to performance](#anticipation-is-the-key-to-performance)
    
6.  [Simple deployment](#simple-deployment)
    

## [Link to heading](#background)Background

For many years now, we have been pursuing a vision of **universal JavaScript applications**.

Node.js led the way, by enabling code sharing between client and server, broadening the contribution surface for many developers around the world.

Many attempts were made to make it practical to develop apps and websites on Node. Many template languages and frameworks came along... but the technical divide between frontend and backend remained.

If you for example picked Express and Jade, some HTML would be rendered by the server and then a _different codebase_ (powered by jQuery or similar libraries) would take over.

That situation was really no better than, say, PHP's. In many ways, PHP was actually more suited for the "server rendering of HTML" job. Prior to async/await, it was difficult to query data services in JS. Catching and limiting errors to the scope of the request/response was also notoriously difficult.

Since then, however, notable conceptual changes have allowed us to bridge this gap. The most important of which is the introduction of the pure **render function** that returns the representation of the UI based on the available data at that point in time.

This model (popularized by React) is of significant importance, but that alone is not necessarily different from how most template systems work. The other critical concept is the **component lifecycle**.

Lifecycle hooks allow us to handle the _continuation_ of some rendering that originated on the server. You can start with a static representation of data, subscribe to realtime updates from a server, and change it over time, for example. Or perhaps it just remains static.

**Next.js** is our take on how to bring this vision forward.

## [Link to heading](#zero-setup.-use-the-filesystem-as-an-api)Zero setup. Use the filesystem as an API

Tools make certain assumptions about your projects' structure within the filesystem.

For example, we generally start a Node.js project by creating a new directory, placing a `package.json` inside, then installing modules into `./node_modules`.

Next.js extends that structure by introducing a `pages` sub-directory where your top-level components live.

For example, you can populate `pages/index.js` which maps to the route `/` with:

```
import React from 'react'export default () => <marquee>Hello world</marquee>
```

and then `pages/about.js` which maps to `/about` with:

```
import React from 'react'export default () => <h1>About us</h1>
```

We believe this is a great default to get started with and allows for very quick exploration of a project. When more advanced routing is required, we'll allow developers to intercept the request and take control \[[#25](https://github.com/zeit/next.js/issues/25)\].

All that's needed to start working on the project is to run:

```
$ npm run dev
```

No configuration unless it's needed. Automatic hot-code reloading, error reporting, source maps, transpilation for older browsers.

## [Link to heading](#only-javascript.-everything-is-a-function)Only JavaScript. Everything is a function

Every route within Next.js is simply a ES6 module that exports a function or class that extends from `React.Component`.

The advantages of this approach over similar models is that your entire system remains highly composable and testable. For example, a component can be rendered directly, or be imported and rendered by another top-level component.

Components can also introduce changes to the `<head>` of the page:

```
import React from 'react'import Head from 'next/head'export default () => (<div>  <Head>    <meta name="viewport" content="width=device-width, initial-scale=1" />  </Head>  <h1>Hi. I'm mobile-ready!</h1></div>)
```

Furthermore, no wrappers or transformations are needed to make this system fully testable. Your test suite can simply import and shallow-render your routes.

We've also made the decision to embrace CSS-in-JS. We use the excellent [glamor](https://github.com/threepointone/glamor) library which gives us the full unconstrained power of CSS without the need for CSS parsing and compilation:

```
import React from 'react'import css from 'next/css'export default () => <p className={style}>Hi there!</p>const style = css({  color: 'red',  ':hover': {    color: 'blue'  },  '@media (max-width: 500px)': {    color: 'rebeccapurple'  }})
```

We think this model offers superior performance, composability and integration with the server-rendering pipeline.

## [Link to heading](#automatic-server-rendering-and-code-splitting)Automatic server rendering and code splitting

Two tasks have so far been simultaneously very difficult and highly desirable:

-   Server rendering
    
-   Splitting your app's build into smaller bundles
    

With Next.js, every component inside `pages/` gets server-rendered automatically and their scripts inlined.

When a component is loaded dynamically through `<Link prefetch />` or [the router](https://nextjs.org/docs/routing/introduction), we fetch a JSON based representation of the page which likewise contains its scripts.

This means that a certain page could have an extensive list of imports:

```
import React from 'react'import d3 from 'd3'import jQuery from 'jquery'
```

… that don't affect the performance of the rest of the pages.

This detail is particularly powerful for large teams of people that collaborate on components with very different technical and business requirements. The performance penalties incurred in by a team or individual won't affect the rest of the organization's.

## [Link to heading](#data-fetching-is-up-to-the-developer)Data fetching is up to the developer

Server-rendering of static JSX is an important achievement, but real-world applications deal with dynamic data coming from different API calls and network requests.

Next.js makes a very important extension to the React's Component contract: `getInitialProps`.

A page that fetches some data would look as follows:

```
import React from 'react'import 'isomorphic-fetch'export default class extends React.Component {  static async getInitialProps () {    const res = await fetch('https://api.company.com/user/123')    const data = await res.json()    return { username: data.profile.username }  }}
```

Our stance of what features we transpile (like async/await) can be summed up as: we target V8's capabilities. Since our goal is code-sharing between server and client, this gives us great performance when executing the code on Node and developing on Chrome or Brave, for example.

As you can see, the contract is very simple and unopinionated: `getInitialProps` must return a `Promise` that resolves to a \`JavaScript\` object, which then populates the component's `props`.

This makes Next.js play well with REST APIs, GraphQL, and even global-state management libraries Redux, an example of which you can find [on our GitHub](https://github.com/vercel/next.js/tree/canary/examples/with-redux).

The same method allows for different data to be loaded depending on whether the component is server-rendered or dynamically rendered through client-side routing:

```
static async getInitialProps ({ res }) {  return res    ? { userAgent: res.headers['user-agent'] }    : { userAgent: navigator.userAgent }}
```

## [Link to heading](#anticipation-is-the-key-to-performance)Anticipation is the key to performance

We think that the pendulum of "fully server-rendered" swung abruptly to the extreme of "single page app" / "nothing server-rendered" thanks to the ability to [give the user immediate feedback](http://rauchg.com/2014/7-principles-of-rich-web-applications/#act-immediately-on-user-input) despite the network, provided the entire app has been loaded.

For [www.vercel.com](https://vercel.com/) we've implemented a technique on top of Next.js that brings us the best of both worlds: every single `<Link prefetch />` tag pre-fetches the component's JSON representation on the background, via a `ServiceWorker`.

If you navigate around, odds are that by the time you follow a link or trigger a route transition, the component has already been fetched.

Furthermore, since the data is fetched by a dedicated method (`getInitialProps`), we can pre-fetch aggressively without triggering unnecessary server load or data fetching. This is a substantial benefit over naive web 1.0 preload strategies.

## [Link to heading](#simple-deployment)Simple deployment

We created Next.js because we believe universal isomorphic applications are a big part of the future of the web.

Ahead-of-time bundling and compilation (anticipation) is a critical part of effective and performant deployment.

All it takes to deploy a Next.js app is to run `next build` followed by `next start`.

When using [](https://vercel.com/home), your `package.json` looks like this:

```
{  "name": "my-app",  "dependencies": {    "next": "*"  },  "scripts": {    "dev": "next",    "build": "next build",    "start": "next start"  }}
```

Then you can simply invoke `vercel` to deploy.

In closing, this is our contribution to this very interesting problem. We think it strikes a good balance between flexibility and smart defaults, but it's certainly not a solution to every problem.

We look forward to, in the coming weeks, discussing and featuring other great approaches to accomplish this mission, like [Vue.JS](https://github.com/vuejs/vue-hackernews-2.0), [Gatsby](https://github.com/gatsbyjs/gatsby), [Ember+Fastboot](https://ember-fastboot.com/) and many others.

If you're interested in contributing, please check out our issues and explore and debate 🚲 [future directions](https://github.com/zeit/next.js/blob/1.2.3/README.md#future-directions).