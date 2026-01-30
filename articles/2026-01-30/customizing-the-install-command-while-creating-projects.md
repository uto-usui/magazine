---
title: "Customizing the Install Command while creating Projects"
source: "https://vercel.com/changelog/customizing-the-install-command-while-creating-projects"
publishedDate: "2021-08-06"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

1 min read

Aug 6, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5qzkVn943Ut98wglTGXbZS%2Ffe11beb2cae2962bd5e69585a528792f%2Fpreview.png&w=1920&q=75)

When [importing a Git repository](https://vercel.com/new) into Vercel, your Project's dependencies used to automatically be installed using either [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/), depending on your code. Selecting a different package manager such as [pnpm](https://pnpm.io/) was only possible after the Project was already deployed.

As of today, however, you can configure your custom Install Command even before the first Deployment for your new Project is created.

This also comes in handy for passing custom options to the `yarn` or `npm install` commands, since you can simply place the command of your choice in the "Install Command" field.

Check out [the documentation](https://vercel.com/docs/build-step#install-command) as well.