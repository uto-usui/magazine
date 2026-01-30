---
title: "Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance"
source: "https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure"
publishedDate: "2023-01-27"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

7 min read

Jan 27, 2023

Learn how Vercel builds and deploys serverless applications.

Vercel's platform provides speed, reliability, and the convenience of not having to worry about setting up and maintaining your own infrastructure. But what exactly goes on behind the scenes when we deploy our projects to Vercel, and what happens when you make a request to a site on the platform?

This post will go behind the scenes, explaining how Vercel builds and deploys serverless applications for maximum scalability, performance, and fast iterations.

## [Link to heading](#building-and-deploying-any-framework)Building and deploying any framework

Deployments start with code written in one of the over 35 frameworks supported by Vercel, or by using the [Build Output API](https://vercel.com/blog/build-output-api). Deployments can be created through the Vercel CLI or by pushing code to your git repository. The [Vercel Git integration](https://vercel.com/docs/concepts/git) automatically listens for your commit and triggers a new deployment.

A deployment process triggered from the CLI starts with two API requests:

### [Link to heading](#1.-uploading-project-files-)1\. Uploading project files

A `POST` request is made containing the project’s files to be uploaded to a scalable, secure, and highly durable data storage service¹.

### [Link to heading](#2.-creating-the-deployment)2\. Creating the deployment

Once the files have been uploaded successfully to the storage service, another `POST` request is made to start the build and deployment process.

Before the deployment can be created, Vercel first authenticates the user and inspects the request to confirm its authenticity and the user's permission to create the deployment to protect against unauthorized access and loss of integrity. It also validates the Vercel configuration in the `vercel.json` file.

If everything checks out, the deployment gets scheduled for building². Vercel's build container³ is able to start the build process immediately, provided there is sufficient build concurrency available based on the project's [billing plan](https://vercel.com/docs/concepts/deployments/concurrent-builds#). Hobby teams have 1 concurrent build, Pro teams can purchase up to 12, and Enterprise teams can purchase a custom amount of build slots for maximum concurrency.

The build step transforms the project into a Vercel deployment by executing a "builder" on the source code. The builder can be an internal one provided by Vercel, or a custom builder that requires installation from an npm registry. Vercel's build system is configured to automatically detect over 35 frontend frameworks or to recognize a prebuilt project that adheres to the [Build Output API](https://vercel.com/docs/build-output-api/v3)'s spec. This API allows you to create a build output that is compatible with Vercel's deployment platform and enables you to utilize all of the platform's features.

While the build container is processing the files, it pings an API endpoint that keeps track of the deployment’s status. The CLI and dashboard use this endpoint to display the correct status to the user.

The build container creates a build output that runs on one of Vercel's [supported runtimes](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes#), and provisions resources such as:

-   [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) for handling API routes and server-side rendered pages
    
-   [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions) for Middleware and other functions using the **`edge`** runtime
    
-   [Optimized Images](https://vercel.com/docs/concepts/image-optimization)
    
-   Static output
    

Once the necessary resources have been provisioned, a Deployment database document is created and the deployment metadata is uploaded to static storage¹. This metadata is later used during the request phase to route the user to the correct location and invoke the appropriate resource based on the incoming request path.

The newly created deployment is now ready to be served via the Vercel CDN. What happens when a user requests a website hosted on Vercel is part of the **request phase**.

## [Link to heading](#request-phase)Request phase

Before a browser can display the website of the deployment's URL, it first has to perform a DNS lookup to find the IP address. For websites hosted on Vercel, this step always resolves with an anycast IP address owned by Vercel and the `cname.vercel-dns-0.com` CNAME record.

Whereas [GeoDNS](https://en.wikipedia.org/wiki/GeoDNS) routes users to unique endpoints based on their location, Vercel uses a networking service⁴ that uses anycast routing to route traffic to the [optimal data center](https://vercel.com/docs/concepts/edge-network/regions) determined by the number of hops, round-trip time, and amount of available bandwidth. This can improve the performance of the network by routing traffic to the destination that is closest to the source, ensuring that users globally can benefit from low-latency connections.

Besides the benefits of anycast routing, the networking service⁴ also allows applications hosted on Vercel to benefit from automatic failover and DDoS protection, and provides performance-enhancing features that are designed to improve resiliency and reduce the impact of attacks.

Vercel's IP address connects the user to the nearest edge location, which acts as a gateway to the network infrastructure⁵.

This is where the request enters Vercel's Kubernetes cluster. The request is first inspected and filtered for malicious users, then routed to a virtual machine⁶ serving as a reverse proxy. This gateway is responsible for rewriting and proxying requests.

First, it determines which version of a deployment should be served to a user based on data such as the hostname of the incoming request, and fetches the deployment’s metadata. Depending on whether the request path matches a route specified in the deployment’s metadata, the request either resolves with a status code `404`, or continues to produce a response.

Before continuing to the response phase, the request might get modified if [Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) is enabled, in which case the request is first forwarded to a platform responsible for executing edge functions.

The response phase is different for different types of resources.

-   For **static resources** - such as static pages, fonts, and unoptimized images - the gateway downloads the resource from static storage¹.
    
-   For **Vercel Serverless Functions** - such as server-rendered pages or API routes - the gateway triggers a Serverless Function⁷ execution in the region to which this function was deployed.
    
-   For **Edge Functions** - such as a server-rendered page or API Route using the `edge`
    
    runtime - the gateway formats the request to invoke an Edge Function execution at the edge.
    
-   For pages using **Incremental Static Regeneration**, the gateway first checks whether this page has been rendered before, which would make its static output available in static storage¹. If that’s not the case, the gateway invokes a Serverless Function execution⁷ to dynamically (re)generate the content. Invoking this function also happens in the case of stale content, which happens when the static resource was cached previously but its time-to-live (TTL) has passed. In that case, the stale content gets served to the user while the function gets invoked in the background to regenerate the content.
    
-   For **optimized images**, the request gets forwarded to a dedicated service to optimize the image on-the-fly and cached at the edge for subsequent requests, reducing the file size and using modern formats supported by the requesting client's browser. The optimized image will be served until it expires, at which point a stale version of the image will be served while the image is re-optimized in the background. The image's expiration time is determined by either a [configuration setting](https://nextjs.org/docs/api-reference/next/image#minimum-cache-ttl) or the upstream image's `Cache-Control` header.
    

The responses of all the above-mentioned steps get cached based on the [caching headers](https://vercel.com/docs/concepts/edge-network/caching) to speed up future lookups. The response phase indicates the end of the request lifecycle on Vercel.

## [Link to heading](#conclusion)Conclusion

Setting up and maintaining your own infrastructure can be tedious, and requires selecting and configuring the appropriate server hardware and operating system, setting up and configuring network infrastructure, configuring and maintaining the necessary software stack, and more.

Ensuring that your infrastructure is secure and scalable requires continuous monitoring, maintenance, and updating. This includes implementing security protocols and solutions to protect against threats and vulnerabilities, as well as ensuring that your infrastructure can handle a spike in traffic efficiently. All these tasks are time-consuming, complex, and require a dedicated team of experienced engineers to handle at scale.

By deploying to Vercel,  you can streamline and simplify your deployment process without having to worry about setting up and maintaining your own infrastructure. The platform's deployment process is designed to be scalable and secure, allowing you to focus entirely on developing your project at all times. Vercel optimizes your deployments for global performance and accessibility, ensuring the best user experience no matter where they are located.

Vercel also significantly improves the developer experience and iteration speed of your product. The automatic [Git integration](https://vercel.com/docs/concepts/git) creates preview deployments for every commit; as soon as a change is made and committed, a preview of the updated product is immediately available for review. This feature allows for faster development cycles and more efficient team collaboration.

To improve the collaboration and development process even further, Vercel also offers [comments on Preview Deployments](https://vercel.com/docs/concepts/deployments/comments), allowing team members to provide feedback and suggestions on every change with a dedicated environment.

[Try out Vercel today](https://vercel.com/product-tour) and experience the ease, security, and performance benefits for yourself.