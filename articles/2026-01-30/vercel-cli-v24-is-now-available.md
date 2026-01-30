---
title: "Vercel CLI v24 is now available"
source: "https://vercel.com/changelog/vercel-cli-v24"
publishedDate: "2022-02-17"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Feb 17, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3OOhfYvk2lapcLQ894AoXI%2F7a51a256eb195db38fe1a656bf4cf832%2Fvercel-cli-v24.png&w=1920&q=75)

Version 24 of the Vercel CLI has been released, including many improvements and bug fixes, as well as the new `vercel bisect` command:

-   Added new command `vercel bisect`: Inspired by the `git bisect` command, [this new command](https://vercel.com/docs/cli#commands/bisect) helps identify in which Deployment a bug was introduced.
    
-   Added support for the `--project` flag in `vercel link`.
    
-   Removed support for single file deployments.
    
-   `vercel dev` is now stable (no longer in beta).
    
-   Refactored most of the CLI source code to TypeScript.
    

**This is a major version bump and includes some breaking changes**, most of which are the final removal of features that have been deprecated for years. [Read the full changelog](https://github.com/vercel/vercel/releases/tag/vercel%4024.0.0) carefully before updating.