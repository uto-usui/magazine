---
title: "Block Vercel deployment promotions with Github Actions"
source: "https://vercel.com/changelog/block-vercel-deployment-promotions-with-github-actions"
publishedDate: "2025-10-09"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Oct 9, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2fHXTpLRBF7dNM24rUsLDB%2F31f7a1f60e1ae8fa48654b6b17556aba%2Fdeployment-checks.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3Zfs22vE3vuezhNydVzxfx%2F9e0ca4ae80120b9d3a83dcb52a0d8ee4%2FOG_Card-Dark.jpg&w=1920&q=75)

You can now block a deployment from being promoted to production until selected GitHub Actions complete successfully.

On Vercel, every deployment starts in a preview environment, this feature ensures that only verified builds that pass tests or other automated checks are released to production.

Deployment Checks are available for all projects connected to GitHub repositories.

Configure them in your [project settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment) or learn more in [the docs](https://vercel.com/docs/deployment-checks).