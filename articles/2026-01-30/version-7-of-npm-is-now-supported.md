---
title: "Version 7 of npm is now supported"
source: "https://vercel.com/changelog/version-7-of-npm-is-now-supported"
publishedDate: "2021-08-06"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Aug 6, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1mK0a3f9zQZedeoBmmtvoH%2F1f73b11e5019475677ab6d70522283c5%2Fpreview.png&w=1920&q=75)

Vercel will now automatically detect whether your Project's dependencies were added with version 7 of the npm CLI, based on the presence of [the latest lockfile format](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json#lockfileversion).

If detected, Vercel will automatically switch to using npm v7 to install your Project's dependencies within the [Build Step](https://vercel.com/docs/build-step).

This means that, among many bug fixes in the latest version of npm, your Deployments can now make use of the following new features:

Check out the [full release notes](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/) and the [documentation](https://vercel.com/docs/build-step#install-command) as well.