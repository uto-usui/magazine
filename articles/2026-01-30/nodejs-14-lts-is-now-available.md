---
title: "Node.js 14 LTS is now available"
source: "https://vercel.com/changelog/node-js-14-lts-is-now-available"
publishedDate: "2021-02-04"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Feb 4, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3m3JEsxL9D8b8psO8bMBEL%2F0285b208ff3e4a224fe5ccdee8d2a235%2Fpreview.png&w=1920&q=75)

As of today, version 14 of Node.js can be selected in the **Node.js Version** section on the General page in the **Project Settings** (newly created Projects will default to the new version).

Among [other features](https://nodejs.medium.com/node-js-version-14-available-now-8170d384567e), the new version introduces [Diagnostic Reports](https://nodejs.org/docs/latest-v14.x/api/report.html), which can be logged to [Log Drains](https://vercel.com/blog/log-drains) (recommended) like so:

```
geo: {    city?: string    country?: string    region?: string}
```

The following features were introduced through [v8](https://v8.dev/):

The exact version used is 14.15.4 ([changelog](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V14.md#14.15.4)), but automatic updates will be applied for new minor and patch releases. Therefore, only the major version (14.x) is guaranteed.

Check out [the documentation](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version) as well.