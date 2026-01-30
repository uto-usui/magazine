---
title: "Node.js 10 is Now Available"
source: "https://vercel.com/blog/node-10"
publishedDate: "2019-06-25"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

2 min read

Jun 25, 2019

## [Link to heading](#how-to-upgrade)How to Upgrade

In order to have your code invoked with **Node.js 10**, you need only to add an `engines` field to your `package.json` file as follows:

```
{  "name": "my-app",  "engines": {    "node": "10.x"  }}
```

As you can see, we have configured `10.x` as the version, instead of the exact one.

This is possible because the `engines` property (as per the [documentation](https://docs.npmjs.com/files/package.json#engines)) supports [semantic version](https://semver.org/) ranges in its syntax.

At the moment of writing, **this will result in Node.js 10.15.3 being used**.

**NOTE:** The range `10.x` will allow new deployments to take advantage of security updates and features released to [Node.js 10 LTS](https://github.com/nodejs/Release). It is not possible to pin a specific version at this time.

### [Link to heading](#supported-builders)Supported Builders

If your deployment uses one of the following [Builders](https://zeit.co/docs/v2/deployments/builders/overview/), you can opt into **Node.js 10**:

-   [@vercel/node](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/) (buildtime and runtime)
    
-   [@vercel/next](https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next/) (buildtime and runtime)
    
-   [@vercel/static-build](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/) (buildtime)
    

## [Link to heading](#what-has-changed)What Has Changed

Node.js 10 includes several new features, such as [a stable API for native addons](https://nodejs.org/api/n-api.html#n_api_n_api), [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), [a better way of creating Buffers](https://nodejs.org/api/buffer.html#buffer_buffer_from_buffer_alloc_and_buffer_allocunsafe), and [version 6.0 of npm](https://medium.com/npm-inc/announcing-npm-6-5d0b1799a905).

On your serverless function, however, the most noticeable improvement will be in performance (from Node.js 10 including [V8 6.6](https://v8.dev/blog/v8-release-66)).

As an example, `Array.reduce` is now much faster for [holey double arrays](https://v8.dev/blog/elements-kinds):

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7niftW4ko6JIVa0r4YkCg8%2Fd7f46e19ee472f1dc4e1c2376b7d331d%2Farray-reduce-big.png&w=1920&q=75)

Even a regular `Promise` will now be faster:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6PojEy5fSSXYVdQ0sFa07y%2Fd32a8fd26875d5aca6e80a421cf4678f%2Fpromise-big.png&w=1920&q=75)

The performance metrics were retrieved from the [v8 release post](https://v8.dev/blog/v8-release-66). For a full list of all changes, take a look at [Auth0's release summary](https://auth0.com/blog/nodejs-10-new-changes-deprecations).

## [Link to heading](#conclusion)Conclusion

Our team is working hard to ensure that – every time a new [Node.js release](https://github.com/nodejs/Release) occurs – we provide you with the respective runtime for your serverless functions.

Make sure to **update your existing deployments to Node.js 10** (as described above) and keep your eyes open for future Node.js updates via our [Twitter page](https://twitter.com/vercel).

Should you have any questions, please [let us know](mailto:support@vercel.com).