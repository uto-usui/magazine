---
title: "Zero Config Deployments"
source: "https://vercel.com/blog/zero-config"
publishedDate: "2019-08-07"
category: "frontend"
feedName: "Vercel"
author: "Leo Lamprecht"
---

2 min read

Aug 7, 2019

Few weeks ago, we introduced Vercel as the most powerful and scalable platform for **static websites** and **serverless functions** powered by _any language_ or _framework._

This came at the expense of writing `vercel.json` files. Today, we are introducing **Zero Config**, a conventional and completely backwards-compatible approach to deployment.

## [Link to heading](#getting-started)Getting Started

To start, create a new project using a **frontend stack of your choice**. For this example, we'll create a vanilla [Next.js](https://nextjs.org/) project:

```
npm create next-app
```

Then, from within the project, with no additional configuration, run the following command (requires [Vercel CLI](https://vercel.com/download) or our integration for [GitHub](https://vercel.com/github)/[GitLab](https://vercel.com/gitlab)):

```
vercel
```

That's it. **It works for any framework or tool you can think of.**

No matter if you're using [Gatsby](https://github.com/vercel/vercel/tree/master/examples/gatsby), [Vue](https://github.com/vercel/vercel/tree/master/examples/vue), [Ember](https://github.com/vercel/vercel/tree/master/examples/ember), [Svelte](https://github.com/vercel/vercel/tree/master/examples/svelte) or any other `package.json` project with a [build script](https://docs.npmjs.com/misc/scripts), you always get fully static or hybrid rendering out of the box.

## [Link to heading](#from-frontend-to-backend)From Frontend to Backend

Upon deployment, we optimize your frontend seamlessly and deploy it to our built-in [Smart CDN](https://vercel.com/smart-cdn). Fast to develop, build, and serve.

Now, how about adding the power of **serverless functions** to our site?

Let's use [Gatsby](https://www.gatsbyjs.org/) for the frontend, combined with [Go](https://golang.org/) for the backend. For this, we'll start by creating a new Gatsby project:

```
gatsby new gatsby-site
```

This can already be deployed, zero config. To add functions, create an `api` directory:

Then, with no additional configuration, run the following command (requires [Vercel CLI](https://vercel.com/download) or our integration for [GitHub](https://vercel.com/github)/[GitLab](https://vercel.com/gitlab)):

```
vercel
```

Your function will now be accessible at `/api/my-function`.

All our [existing languages](https://vercel.com/docs/serverless-functions/supported-languages) are supported and mapped by file extension. You can even use `[brackets].js` to define dynamic routes. To learn more, check out [our docs](https://vercel.com/docs).

## [Link to heading](#summary)Summary

Vercel is fast, efficient, scalable, and now even easier to use.

-   If you are using **ZEIT Now 1.0** or a third-party provider, check out our [migration guide](https://vercel.com/guides/migrate-to-zeit-now/).
    
-   If you are using Vercel, your projects will continue to work as they are. If you want to go zero-config, check out [this guide](https://vercel.com/docs/cli/deploying-from-cli).
    
-   If you are using **Next.js 9** or newer, our integration supports [API routes](https://nextjs.org/blog/next-9#api-routes), so absolutely nothing new to learn. Just deploy it, no config needed.
    
-   Our [development toolchain](https://vercel.com/blog/now-dev) vercel dev just works, zero-config.
    
-   Our integrations for [GitHub](https://vercel.com/github) and [GitLab](https://vercel.com/gitlab) no longer require a `vercel.json` either. We've added a simple flow to [import your projects from the web UI](https://vercel.com/new) to complement it.
    

_Special thanks to_ [_Evil Rabbit,_](https://twitter.com/evilrabbit_) [_Paco Coursey_](https://twitter.com/pacocoursey)_,_ [_Luc Leray_](https://twitter.com/lucleray)_,_ [_Shu Ding_](https://twitter.com/shuding_)_,_ [_Matthew Sweeney_](https://twitter.com/msweeneydev)_,_ [_Timothy Lorimer_](https://twitter.com/timothyis_) _and_ [_Christopher Skillicorn_](https://twitter.com/skllcrn) _for helping with making this release a reality._