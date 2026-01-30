---
title: "More flexible Environment Variables in Edge Functions and Middleware"
source: "https://vercel.com/changelog/more-flexible-environment-variables-in-edge-functions-and-middleware"
publishedDate: "2023-05-24"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

1 min read

May 24, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7GtVafdpAtp8o9DQ1YZ3g8%2F7a80cdef13db0ee2f011b2de86874c6e%2Fenv_vars_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F42nzntoEWvpXx9RNOcaB46%2Fe48099813fbd7f73f4ed5af914b8836a%2Fenv_vars_-_Dark.png&w=1920&q=75)

You now have more flexible access and improved limits for environment variables from [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions) and [Middleware](https://vercel.com/docs/concepts/functions/edge-middleware):

-   The max environment variable size is now 64KB instead of 5KB, [same as Serverless Functions](https://vercel.com/docs/concepts/limits/overview#functions-comparison).
    
-   Other than the [reserved names](https://vercel.com/docs/concepts/projects/environment-variables/reserved-environment-variables), there are no additional restrictions to name environment variables.
    
-   Accessing `process.env` is no longer restricted to be statically analyzable. This means that, for example, you can now compute variable names such as ``process.env[`${PREFIX}_SECRET`]``.
    

[Check out the documentation](https://vercel.com/docs/concepts/projects/environment-variables) to learn more.