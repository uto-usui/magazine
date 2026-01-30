---
title: "Understanding Vercel Functions"
source: "https://vercel.com/blog/understanding-vercel-functions"
publishedDate: "2024-07-05"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

4 min read

Jul 5, 2024

Vercel Functions run code in response to user traffic without the need to manage your own infrastructure, provision servers, or manage hardware.

This can provide some advantages over traditional infrastructure, including:

-   [Secure and always up-to-date environments](#secure-and-always-up-to-date-environments)
    
-   [Predictable performance](#predictable-performance)
    
-   [High availability](#high-availability)
    
-   [Automatic downscaling and deprovisioning](#automatic-downscaling-and-deprovisioning)
    
-   [Real-time usage and spend controls](#real-time-usage-and-spend-controls)
    
-   [Out-of-the-box observability](#out-of-the-box-observability)
    

## [Link to heading](#secure-and-always-up-to-date-environments)Secure and always up-to-date environments

With traditional infrastructure, you need to ensure your servers are properly configured, patched, and monitored for vulnerabilities. This can be additional maintenance work (especially for small teams or individual developers) or downtime (to install updates and restart the server).

For example, this is similar to running and managing a WordPress instance versus using a fully managed service.

With Vercel Functions, every workload is isolated to minimize the attack surface area of a malicious actor. The underlying infrastructure like the OS, kernel, and [hypervisor](https://aws.amazon.com/what-is/hypervisor) layers are patched automatically. Node.js runtime updates are [released automatically](https://vercel.com/docs/functions/runtimes/node-js#default-and-available-versions), including critical security vulnerability patches.

### [Link to heading](#vulnerability-surface)Vulnerability surface

Vercel ensures your compute is always running on a [secure, up-to-date environment](https://vercel.com/security), [protected against vulnerabilities](https://vercel.com/changelog/vercel-firewall-proactively-protects-against-vulnerability-in-the-clerk-sdk).

Layer

Vercel

Virtual Private Server (VPS)

OS

Vercel Managed

Customer Managed

Runtime

Vercel Managed

Customer Managed

Hypervisor

Vercel Managed

VPS Managed

User Code

Customer Managed

Customer Managed

Learn more about our [shared responsibility model](https://vercel.com/docs/security/shared-responsibility). Enterprise customers can also purchase dedicated, isolated build and compute through [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute).

## [Link to heading](#predictable-performance)Predictable performance

With traditional infrastructure, you are responsible for managing and scaling resources to meet demand. [Vercel Functions](https://vercel.com/docs/functions) scale automatically based on incoming requests and don't compete for resources. This eliminates the risk of queuing on the event loop, which can affect the latency of your application.

While this scalability is beneficial, it must also be paired with [spend controls](#real-time-usage-and-spend-controls) and [observability](#out-of-the-box-observability) into usage.

For optimal performance, Vercel Functions are [powered by Rust](https://vercel.com/blog/vercel-functions-are-now-faster-and-powered-by-rust) and have advanced [bytecode caching](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions). This makes startup times faster and more consistently low-latency.

## [Link to heading](#high-availability)High availability

Vercel Functions provide high availability out of the box.

You don't need to worry about server failures or downtime, as functions scale and failover automatically across availability zones ([and even regions](https://vercel.com/docs/functions/configuring-functions/region#node.js-runtime-failover)). Further, features like [Instant Rollback](https://vercel.com/docs/deployments/instant-rollback) and [Skew Protection](https://vercel.com/docs/deployments/skew-protection) provide more ways to ensure your site is always online.

This level of resilience requires a large investment in infrastructure and monitoring when maintaining your own infrastructure.

## [Link to heading](#automatic-downscaling-and-deprovisioning)Automatic downscaling and deprovisioning

Vercel Function can handle extremely variable traffic patterns, scaling up to 30,000 concurrent requests (or 100,000+ on Enterprise) without any manual intervention. This makes functions a great choice for ecommerce, media sites, or startup launches that are likely to attract lots of attention.

Traditional infrastructure can provide some cost efficiencies, with dedicated servers allowing unlimited data transfer for a fixed price. This does, however, require maintenance and manual management. After reaching the limits of the current infrastructure you have provisioned, you need to purchase (or rent) larger hardware.

Running compute that scales on demand (and back down to zero) allows you to have more granular [control over your spend](https://vercel.com/blog/introducing-spend-management-realtime-usage-alerts-sms-notifications). You only pay for the resources you use during a large traffic event and then return to your baseline spend, without needing to change your underlying hardware setup.

Vercel creates cloud infrastructure [based on your framework code](https://vercel.com/blog/framework-defined-infrastructure). This flexibility, combined with our [infinite preview environments](https://vercel.com/products/previews), means you can quickly and easily spin up new compute infrastructure to test your next big idea.

And when you're done? Don't worry about leaving compute running forever for an experiment. You can rest assured (with your site behind [Deployment Protection](https://vercel.com/docs/security/deployment-protection)) your usage (and cost) scales to zero.

## [Link to heading](#real-time-usage-and-spend-controls)Real-time usage and spend controls

Scalability shouldn't come at the risk of "denial of wallet", which is why we provide [recursion protection](https://vercel.com/changelog/automatic-recursion-protection-for-vercel-serverless-functions), [spend controls](https://vercel.com/blog/introducing-spend-management-realtime-usage-alerts-sms-notifications), and an [advanced Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall).

While servers offer predictable spend, Vercel provides [tools to control costs](https://vercel.com/docs/pricing/spend-management) and avoid unexpected bills, while still enabling your business to handle unexpected traffic surges.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NZjFKbMRe4zn0NYmTNesk%2F9a8942557b073f01c53320e8e3d4b290%2FSpend_Management.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yUafg21rTRl51AQwyJQgu%2Fc902bf142a05f57fe5b6a7cff63aaad5%2FSpend_Management__1_.png&w=1920&q=75)

You can control the [maximum duration functions run](https://vercel.com/docs/functions/configuring-functions/duration), monitor usage in real time, [block traffic patterns](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall), and set both soft and hard limits based on your spend. These alerts can be sent in the Vercel dashboard, through email, or even [SMS](https://vercel.com/docs/pricing/spend-management#sms-notifications). This visibility and control allows you to optimize your usage and keep costs under control.

## [Link to heading](#out-of-the-box-observability)Out-of-the-box observability

Infrastructure platforms usually require you to choose your own tools for observability.

While this allows flexibility, it does require more configuration and potentially vendoring solutions to understand runtime performance, errors, and logs.

Vercel Functions integrate with our observability suite for [build](https://vercel.com/docs/deployments/logs) and [runtime logs](https://vercel.com/docs/observability/runtime-logs), [advanced traffic monitoring](https://vercel.com/docs/observability/monitoring), and the ability to [drain logs](https://vercel.com/docs/observability/log-drains) to external services if you prefer.

![Quickly identify the root cause of persistent errors and customer issues with Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3n28awVposDk7VIJT4Ht5J%2F931c69f5146569c11de3a06913db3166%2Flogs-light.png&w=1920&q=75)![Quickly identify the root cause of persistent errors and customer issues with Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1XrlIDOjR0ineS36kEaZBv%2F1179b66f6cb3e1bbeb3d022918d708be%2Flogs-dark.png&w=1920&q=75)

Quickly identify the root cause of persistent errors and customer issues with Logs.

We have also integrated [support for OpenTelemetry (OTEL)](https://vercel.com/docs/observability/otel-overview) tracing. When viewing runtime logs, you can view the status, duration, URL, and even metrics for outgoing requests.

![Screenshot of new requests metrics, showing 5 outgoing fetch requests with traces on the side](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4mJJIZgCBfoD3ay58XRtzl%2F2198c504ca4873d279f132cdc441a74b%2FRequest_Metrics_Light.png&w=1920&q=75)![Screenshot of new requests metrics, showing 5 outgoing fetch requests with traces on the side](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FXLWguQ7Jq8AQfhTqfho1l%2Fdbc3f1a229fc1f1da8861d3904a5002a%2FRequest_Metrics_Dark.png&w=1920&q=75)

Screenshot of new requests metrics, showing 5 outgoing fetch requests with traces on the side

## [Link to heading](#summary)Summary

With automatic scaling, high availability, cost efficiency, and built-in security, Vercel Functions abstract away many of the operational complexities associated with managing infrastructure.

This allows developers to focus on building great products without worrying about the underlying infrastructure. With Vercel's [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), developers can automatically use our scalable compute as defined by their [frontend framework](https://vercel.com/docs/frameworks) code.

Vercel Functions give you predictable CPU performance, the ability to run dynamic workloads in [multiple regions](https://vercel.com/docs/functions/configuring-functions/region), [automatic SSL and encryption](https://vercel.com/docs/security/encryption), [integrated CI/CD into your Git workflow](https://vercel.com/docs/deployments/git), [preview environments](https://vercel.com/products/dx-platform), [instant rollbacks](https://vercel.com/docs/deployments/instant-rollback), and more—and you can get started for free!

[Learn more about Vercel Functions](https://vercel.com/docs/functions) or get started [building your first site](https://vercel.com/templates).