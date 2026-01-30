---
title: "Disable Git Integration comments from the dashboard"
source: "https://vercel.com/changelog/disable-git-integration-comments"
publishedDate: "2023-07-26"
category: "frontend"
feedName: "Vercel"
author: "Max Leiter"
---

1 min read

Jul 26, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4xcbiam6ieJ3C04rAPXt2i%2F4d8781b42e730c46feea831057e4ea97%2FGit_Settings_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4heZcRA2h1lYBeswHlyLEK%2Fa3b2d72d4a6fb3ea77f1a1ece3864111%2FGit_Settings_-_Dark.png&w=1920&q=75)

We've added new options to the "[Connected Git Repository](https://vercel.com/docs/concepts/deployments/git/vercel-for-github#silence-github-comments)" settings in the [Vercel dashboard](https://vercel.com/docs/concepts/dashboard-features). It's now possible to configure whether the Vercel bot comments on:

-   Pull Requests
    
-   Production Commits
    

These settings are available for all connected repositories, not just GitHub repositories.

Previously, there was a `github.silent` setting available in `vercel.json` that didn't allow more granular control over disabling comments. **We will be deprecating that option on Monday, September 25, 2023.** There is no action required at this time to prepare for deprecation. Until that date, if you set that option in your `vercel.json` file we will continue to read it, and update the configuration in the dashboard accordingly.