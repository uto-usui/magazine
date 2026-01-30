---
title: "Node.js Version now customizable in the Project Settings"
source: "https://vercel.com/changelog/node-js-version-now-customizable-in-the-project-settings"
publishedDate: "2021-01-22"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Jan 22, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7GlFpZv5z1ro5foutaj7ku%2F789bf492acf979d9094d77e1be8f5a12%2FNode.js_Version_OG_Image.png&w=1920&q=75)

For easy customization and in preparation for [Node.js 14 LTS](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V14.md) landing in the future, the **General page** in the **Project Settings** now contains a section for defining the Node.js version used in the Build Step and Serverless Functions.

Previously, defining an `engines` property in the `package.json` file was required to customize the Node.js version. However, this property will take precedence over the Project Setting.

Check out [the documentation](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version) as well.