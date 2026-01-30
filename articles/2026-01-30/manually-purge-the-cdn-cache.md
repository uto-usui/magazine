---
title: "Manually purge the CDN cache"
source: "https://vercel.com/changelog/manually-purge-the-cdn-cache"
publishedDate: "2025-06-24"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Jun 24, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F75bIC7tBCqF4Zfx856DcWb%2Fbdd5d844b0f6e4ea55fc6c6e3090632b%2FPurge_CDN_Cache_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2z8opuitbkdPwI3UMq0SbY%2F3228d6cc3a8e3710cf607f8168f1ea99%2FPurge_CDN_Cache_-_Dark.png&w=1920&q=75)

Users with the **Member** role can now purge Vercel’s CDN cache manually, either via the project's [cache settings dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fcaches&title=Go+to+Cache+Settings) or by running `vercel cache purge --type=cdn` in CLI version 44.2.0 or later.

By default, the CDN cache is purged automatically with each new deployment. For cases where you want to refresh cached content instantly (without waiting for a new build), you can now manually purge the global CDN cache in milliseconds.

This is especially useful for persistent cache scenarios, like **Image Optimization**, where paths are cached across deployments. If upstream images have changed, you can now force a refresh instantly.

Learn more in the [documentation](https://vercel.com/docs/edge-cache#manually-purging-edge-cache).