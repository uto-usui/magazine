---
title: "Correcting Request URLs with Python Serverless Functions"
source: "https://vercel.com/changelog/correcting-request-urls-with-python-serverless-functions"
publishedDate: "2021-02-02"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Feb 2, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F62uDdbwvJ3u2oLJU7eNVAN%2F317e2b1a352caf3f3410a920e73214de%2Fog-image.png&w=1920&q=75)

At the moment, the URLs of incoming requests to Python Serverless Functions deployed on Vercel are decoded automatically.

Because this behavior is not consistent with a "standalone" Python server, Vercel will stop decoding them for newly created Serverless Functions starting **March 2nd, 2021**. Existing Deployments will not be affected.

As an example, take a look at the Python Serverless Function code shown above and imagine that the URL of the incoming request ends in `/hi%21`:

-   With the incorrect behavior, `self.path` will be set to `/hi!`.
    
-   With the updated correct behavior, `self.path` will be set to `/hi%21`, which matches the behavior of the built-in `HTTPServer` class in Python.
    

To try out this change, define a `FORCE_RUNTIME_TAG` Environment Variable for your project, set it to `canary` and create a new Deployment.