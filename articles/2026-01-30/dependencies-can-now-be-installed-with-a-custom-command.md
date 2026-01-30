---
title: "Dependencies can now be installed with a custom command"
source: "https://vercel.com/changelog/dependencies-can-now-be-installed-with-a-custom-command"
publishedDate: "2020-11-11"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Nov 11, 2020

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7qluqExfOBnToKmNnD6IQp%2Fb6d6d1652db17049bdf04b9fe836dd1b%2FInstall_Command_OG_Image.png&w=1920&q=75)

By default, Vercel automatically determines the right command for installing your project's code dependencies in the [Build Step](https://vercel.com/docs/build-step) based on the [Framework Preset](https://vercel.com/docs/build-step#framework-preset) configured for your project and the presence of certain files (like `package-lock.json`) in your source code.

As of today, you can customize the command that Vercel will run within the Build Step for installing your code dependencies.

In the new **Install Command** section within the Project Settings, you can now enter any command of your choice that will be run instead of having Vercel automatically determine the right one for you.

Check out [the documentation](https://vercel.com/docs/build-step#install-command) as well.