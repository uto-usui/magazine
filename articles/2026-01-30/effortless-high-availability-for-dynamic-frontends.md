---
title: "Effortless high availability for dynamic frontends"
source: "https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends"
publishedDate: "2024-02-21"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

2 min read

Feb 21, 2024

Vercel's multi-layered approach to frontend resiliency.

Vercel’s Frontend Cloud is designed for high availability from the ground up, with robustness against large-scale regional cloud outages at every layer of our architecture.

This includes making it extraordinarily easy for our customers to run the compute they deploy to Vercel in the same highly resilient architecture. Concretely speaking, this can make the difference between downtime or smooth operation during major sales events such as Black Friday.

## [Link to heading](#initiating-at-edge:-optimized-global-routing)Initiating at edge: Optimized global routing

Every user request on a Vercel-backed site initiates with our global anycast routing system, instantly connecting users to the nearest network edge. This ensures that traffic is efficiently directed to any of Vercel’s strategically located primary regions.

Both of these layers are designed for robustness and high availability. Even if certain network components are temporarily offline, our system seamlessly reroutes users to the nearest operational region, maintaining consistent service without disruption.

For example, in the unlikely case that the data center in Frankfurt is separated from the internet through a fiber cut, traffic is redirected to Paris. And if Paris also has an issue, then traffic moves to London—[and so on.](https://vercel.com/docs/edge-network/regions#outage-resiliency)

## [Link to heading](#highly-available-compute-resources)Highly available compute resources

While Vercel supports globally distributed [edge compute](https://vercel.com/docs/functions/edge-functions), it is common for Vercel customers to run their primary compute via [Vercel Functions](https://vercel.com/docs/functions/serverless-functions) in a single or a small number of regions. This makes a lot of sense when the backend such as a database, an API gateway, or a headless e-commerce platform uses that region as its primary location.

## [Link to heading](#multi-az-and-multi-region-redundancy)Multi-AZ and Multi-Region redundancy

By default, Vercel Functions are deployed across multiple availability zones (AZs) within any given region, enhancing their availability. However, cross-AZ full-region outages can and [do very occasionally happen](https://www.thousandeyes.com/blog/aws-outage-analysis-june-13-2023). By activating [Function Failover](https://vercel.com/docs/functions/configuring-functions/region#automatic-failover) in the Vercel dashboard, customers can provision functions to be automatically deployed in a backup region. This active-passive setup ensures that function invocations are instantly redirected to the backup region during an incident, offering robust protection against full regional downtimes.

Additionally, Vercel supports advanced configuration of multiple failover regions. This may be helpful if:

-   Multiple primary regions are used
    
-   You desire precise control over the backup region.
    

Precise backup region control could be required if:

-   Your backend has a backup region, and you want to pair the frontend compute with that specific region.
    
-   To ensure compliance with data residency laws (e.g., ensure that both primary and backup regions are in the European Union).
    

## [Link to heading](#simplified-backend-failover-protection-with-edge-config)Simplified backend failover protection with Edge Config

The final key technology for highly available frontends is [Vercel’s Edge Config](https://vercel.com/docs/storage/edge-config). Edge Config allows pushing configuration updates to your global compute fleet with minimal latency and, importantly, without requiring redeployment. It’s the ideal primitive to failover your application to a backup system.

For example, if your primary database has an outage and you are failing over to a read replica, you can use Edge Config to quickly re-route your compute to use the new database address. Similarly, if your headless e-commerce or CMS vendor has a regional outage, you can re-route your compute to its backup location.

[

**Learn about security at scale.**

We'll discuss the most secure way to deploy your application.

Contact Sales



](https://vercel.com/contact/sales/security)

Highly available multi-region cloud infrastructure can be difficult to set up and expensive to maintain. With Vercel, this resiliency comes without additional configuration or maintenance overhead.