---
title: "16x larger Environment Variable storage up to 64KB"
source: "https://vercel.com/changelog/16x-larger-environment-variable-storage-up-to-64kb"
publishedDate: "2022-08-04"
category: "frontend"
feedName: "Vercel"
author: "Craig Andrews"
---

1 min read

Aug 4, 2022

![Two bars. One small one represents the 4KB limit of env vars when using a Lambda function, and another bigger bar represents the new 64KB limit of env vars when using Lambda functions in Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F120iB9w1A0XFtZQnKQzoQ9%2Fe6131135df232cb74ca952a84b1610ce%2FIncrease_the_4KB_limit_for_env_vars_-_Light__2_.png&w=1920&q=75)![Two bars. One small one represents the 4KB limit of env vars when using a Lambda function, and another bigger bar represents the new 64KB limit of env vars when using Lambda functions in Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5xiLMgqAOj9xbrvYuN9P3s%2Fde2feeb575e7246bce2833393ac95a3a%2FIncrease_the_4KB_limit_for_env_vars_-_Dark__1_.png&w=1920&q=75)

You can now use a total of 64KB in Environments Variables for each of your Deployments on Vercel. This change means you can add large values for authentication tokens, JWTs, or certificates, without worrying about storage size.

Deployments using Node.js, Python, and Ruby can support the larger 64KB environment.

Check out [the documentation](https://vercel.com/docs/concepts/projects/environment-variables#environment-variable-size) as well.