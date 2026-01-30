---
title: "Refined Logging"
source: "https://vercel.com/blog/refined-logging"
publishedDate: "2020-03-11"
category: "frontend"
feedName: "Vercel"
author: "Christopher Skillicorn"
---

1 min read

Mar 11, 2020

With the launch of [Log Drains](https://zeit.co/blog/log-drains), we made it easy to pipe the invocation logs of your Serverless Functions or Static Files to a log inspection tool like [LogDNA](https://zeit.co/integrations/logdna) or [Datadog](https://zeit.co/integrations/datadog-logs).

Handing off this piece of your production workflow to a service dedicated to this purpose allowed us to tighten our focus around what we do best: Plug-and-play realtime logs.

## [Link to heading](#better-build-logs)Better Build Logs

When creating a new Deployment, you are always presented with detailed logs showcasing how your source code is getting built. Today, we are introducing a new look for them:

![Inspecting the Build Logs of a Deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F205psBluCRHqxAqHomxUdA%2F74893129081ee274a54b2d3bf77fdbc8%2Fbuilding.png&w=1920&q=75)

Inspecting the Build Logs of a Deployment.

## [Link to heading](#better-serverless-function-logs)Better Serverless Function Logs

If you want to inspect the logs of your Serverless Functions in a detailed manner, we recommend installing one of our [Log Drain integrations](https://zeit.co/integrations?category=logging).

Should you only want to take a quick glance at your Real-time Requests, the refined "Functions" tab will make that process very pleasant:

![Inspecting the Realtime Requests of a Deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fm6Mzuqejdv9zmmBb1eKHh%2F22d0528aa782b355e504479edb945ed1%2Frealtime-requests.png&w=1920&q=75)

Inspecting the Realtime Requests of a Deployment.

The same also goes for errors, which are especially important:

![Inspecting the Errors of a Deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4GG0axcKveJrIMFYBiAAPR%2F3355fe2873f6ee965398e38275ba7c2c%2Ferrors.png&w=1920&q=75)

Inspecting the Errors of a Deployment.

## [Link to heading](#conclusion)Conclusion

With the help of the refined Build and Serverless Functions Logs, understanding how your Deployment behaves while building or in production is now possible at a glance.

For more complex needs, such as storing logs, we recommend installing a [Log Drain integration](https://zeit.co/integrations?category=logging).

[Let us know what you think](https://zeit.co/contact) about this change.