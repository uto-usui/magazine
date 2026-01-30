---
title: "Sensitive environment variables are now available"
source: "https://vercel.com/changelog/sensitive-environment-variables-are-now-available"
publishedDate: "2024-02-01"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

1 min read

Feb 1, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5eikAvz4BHZqskv0HLJOE1%2F654ea48f9241c21a86b93397f71cd682%2FSensitive_Environment_Variables_1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4WChpRjEaUl2mgRyNL2zBj%2Fec887ee98d898a3a20bbb81d4056bff5%2FSensitive_Environment_Variables-1_1.png&w=1920&q=75)

You can now add sensitive Environment Variables to your projects for added security of secret values like API keys.

While all Environment Variables are encrypted, **sensitive values can** **only be decrypted during builds**. This replaces our legacy secrets implementation [which is being sunset](https://vercel.com/changelog/legacy-environment-variable-secrets-are-being-sunset).

Get started using [Sensitive Environment Variables](https://vercel.com/docs/projects/environment-variables/sensitive-environment-variables) through the dashboard or with Vercel CLI `33.4`.