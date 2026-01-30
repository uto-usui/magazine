---
title: "Improvements and Fixes"
source: "https://vercel.com/changelog/march-2023"
publishedDate: "2023-03-09"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Mar 9, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YHG2hHdsLAiKI3YBIPySB%2F4336bad487699e5dd4e034af5c8d54f3%2Fpapercuts-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Q6iTwx2CBd0pFrD9vzZWK%2Fe537e396e236e5daa54a31ff7056a77d%2Fpapercuts-dark.png&w=1920&q=75)

-   **AWS credentials in Serverless functions:** You can now add environment variables with the `AWS_` prefix like `AWS_ACCESS_KEY_ID` or `AWS_REGION` via the dashboard.
    
-   **Framework specific documentation:** There is a new Vercel docs section dedicated to frameworks such as, [Next](https://vercel.com/docs/frameworks/nextjs), [SvelteKit](https://vercel.com/docs/frameworks/sveltekit), [Astro](https://vercel.com/docs/frameworks/astro), [Create React App](https://vercel.com/docs/frameworks/create-react-app), and [Gatsby](https://vercel.com/docs/frameworks/gatsby).
    
-   **Vercel CLI:** [v28.16.13](https://github.com/vercel/vercel/releases/tag/vercel%4028.16.13) was released with an upgrade to Turbo version 1.8.3, improved Remix support with an upgrade to `@remix-run/dev` version 1.14.0, support for Astro V2, and more.
    
-   **Improved date picker:** The new [date picker](https://vercel.com/changelog/activity-date-filtering-now-available) in the Usage tab includes natural language parsing, presets, and shortcuts.
    
-   **Vercel Cron Jobs:** We now allow framework authors to create [Cron Jobs](https://vercel.com/blog/cron-jobs) via the `crons` property of the Build Output API configuration and creating Cron Jobs via the `crons` property of `vercel.json` for end users.