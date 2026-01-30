---
title: "Node.js 24 LTS is now generally available for builds and functions"
source: "https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions"
publishedDate: "2025-11-25"
category: "frontend"
feedName: "Vercel"
author: "Felix Haus"
---

1 min read

Nov 25, 2025

Node.js version 24 is now available as a runtime for [builds](https://vercel.com/docs/builds) and [functions](https://vercel.com/docs/functions) using Node.

To use version 24, go to **Project Settings -> Build and Deployment -> Node.js Version** and select 24.x. This is also the default version for new projects.

This new version's highlights:

-   [**V8 Engine Upgrade**](https://nodejs.org/en/blog/release/v24.0.0#v8-136)**:** Node.js 24 ships with the V8 JavaScript engine version 13.6, bringing performance enhancements and new JavaScript features such as `Float16Array` and `Error.isError`
    
-   [**Global URLPattern API**](https://nodejs.org/en/blog/release/v24.0.0#urlpattern-as-a-global)**:** Simpler URL routing and matching without the need for external libraries or complex regular expressions
    
-   [**Undici v7**](https://nodejs.org/en/blog/release/v24.0.0#undici-7): The built-in `fetch` API benefits from faster HTTP performance, improved HTTP/2 & HTTP/3 support, and more efficient connection handling
    
-   [**npm v11**](https://nodejs.org/en/blog/release/v24.0.0#npm-11): It comes with an updated version of npm, improving the compatibility with modern JavaScript packages
    

The current version used is [24.11.0](https://github.com/nodejs/node/releases/tag/v24.11.0) and will be automatically updated, with only the major version version (`24.x`) being guaranteed.

Read our [Node.js runtime documentation](https://vercel.com/docs/functions/runtimes/node-js) to learn more.