---
title: "Serverless Functions can now run up to 5 minutes"
source: "https://vercel.com/changelog/serverless-functions-can-now-run-up-to-5-minutes"
publishedDate: "2023-09-20"
category: "frontend"
feedName: "Vercel"
author: "Edward Thomson"
---

1 min read

Sep 20, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7HAU4KbzzUnaMubH1qzU31%2F4763c97af909ef691a3c1b73b704e2f0%2FmaxDuration_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1aUNq3AOU7lcCeYYXFH58R%2F79b006f281e1a97dda2b4b62ff7dda87%2FmaxDuration_-_Dark__1_.png&w=1920&q=75)

Based on your feedback, we’re improving Serverless Functions as follows:

-   Pro customers can now run longer functions for **up to 5 minutes.**
    
-   Pro customers default function timeout will be reduced to 15 seconds on **October 1st.**
    

These changes help prevent unintentional function usage, unless [explicitly opted into](https://vercel.com/docs/functions/serverless-functions/runtimes#max-execution-duration) the longer function duration.

Beginning **October 1st**, all new projects will receive a default timeout of 15 seconds. In addition, any projects that have not had functions run for more than 15 seconds will have their default timeouts reduced to 15 seconds.

To avoid unexpected timeouts, any projects that have had functions running for longer than 15 seconds (less than 1% of traffic) **will not** have their defaults changed.

Existing defaults still apply for Hobby and Enterprise customers.

[Check out our documentation](https://vercel.com/docs/functions/serverless-functions/runtimes) to learn more.