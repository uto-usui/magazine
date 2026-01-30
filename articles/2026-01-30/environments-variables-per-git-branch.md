---
title: "Environments Variables per Git branch"
source: "https://vercel.com/changelog/environments-variables-per-git-branch"
publishedDate: "2021-04-21"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Apr 21, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3zWnrS9pAzgm0cZJyMGW2s%2F11a23a644d6568b3525c722d2d380d02%2Fimage.png&w=1920&q=75)

You can now add Environment Variables to a specific **Git branch** in the Preview Environment.

When you push to a branch, a combination of Preview Environment Variables and branch-specific variables will be used. Branch-specific variables will override other variables with the same name. This means you don't need to replicate all your existing Preview Environment Variables for each branch – you only need to add the values you wish to override.

Also, you no longer need to specify the type of Environment Variable (_Plaintext_, _Secret_, _Provided by System_) because **all values are now encrypted**. The new design is optimized for both security and convenience, ensuring you can easily view the value later by editing in the UI or running `vercel env pull` to fetch Development Environment Variables locally.

We previously introduced the _Provided by System_ option as some frameworks need to map system variables like `VERCEL_URL` to framework prefixed variables like `NEXT_PUBLIC_VERCEL_URL`. You no longer need to configure this mapping because the **prefixed variables are added automatically** based on your Framework Preset.

Check out [the documentation](https://vercel.com/docs/environment-variables) as well.