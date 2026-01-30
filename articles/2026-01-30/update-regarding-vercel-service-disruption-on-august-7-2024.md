---
title: "Update regarding Vercel service disruption on August 7, 2024"
source: "https://vercel.com/blog/update-regarding-vercel-service-disruption-on-august-7-2024"
publishedDate: "2024-08-09"
category: "frontend"
feedName: "Vercel"
author: "Guillermo Rauch"
---

3 min read

Aug 9, 2024

Understanding the service disruption and Vercel's next steps

On August 7, 2024, Vercel's Edge Middleware and Edge Functions experienced a significant outage affecting many customers. We sincerely apologize for the service disruption.

Vercel’s platform is designed to [minimize the risk of global downtime](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends). As standard practice, we use staggered rollouts for both code and configuration changes. Every aspect of our infrastructure is designed to gracefully fail over to the next available region in the event of an incident, and ensures no single point of failure across infrastructure components. However, on Wednesday, an upstream provider for a subset of our compute infrastructure went into a globally erroneous configuration state.

This event tested our infrastructure's resilience and how we respond to a global provider failure. Let’s break down what happened, how we responded, and the steps we’re taking to eliminate this as a possible failure mode.

### [Link to heading](#what-happened)What happened

The service disruption lasted 26 minutes, from 19:13 UTC to 19:23 UTC and 19:26 UTC to 19:42 UTC. During this time, customers using our Edge Middleware and Edge Functions experienced high error rates. This event affected 61% of all invocations, significantly impacting customers. Impact varied by customer depending on their project’s usage pattern and properties of the client’s user agent.

These edge compute services currently rely on a specialized compute provider, distinct from other services on the Vercel Platform. This is why requests to Serverless Functions, Static Files, and ISR were unaffected when not fronted by Edge Middleware.

Initial findings show this provider erroneously failed to respect our global traffic configurations, causing them to unexpectedly block most Vercel requests.

Vercel’s monitoring systems identified the elevated errors and alerted our team who immediately opened a maximum priority internal investigation. From there:

-   Vercel Engineering completed its run books and concluded no services or configurations were changed in the Vercel environment.
    
-   Vercel Engineering initiated communication with the upstream infrastructure provider to continue triaging the problem.
    
-   At 19:41 UTC Vercel mitigated the issue by initiating a config override that reset the vendor’s system to a state in which it did not block our traffic. This ended the active disruption in our Edge Middleware and Edge Functions services.
    
-   At 19:42 UTC the config override restored the desired state and the upstream provider implemented fail-safes for Vercel traffic that are appropriate for our traffic volume.
    

### [Link to heading](#lessons-learned-and-future-mitigations)Lessons learned and future mitigations

Our infrastructure is designed to avoid single points of failure and ensure automatic failover at every point in our system.

To address this, we are accelerating our ongoing efforts to enhance the resilience of our Edge Middleware and Edge Functions. Here are the key steps we are taking:

1.  **Configuration management:** We are working closely with this compute provider to ensure their fail-safes are correctly configured. The default traffic limits that triggered the service disruption were already adjusted to accommodate our scale.
    
2.  **Additional redundancy:** We are developing a backup option for our Edge Middleware and Edge Function products. This will ensure that even if the primary system fails, we can continue operations with minimal disruption. This initiative has already been in progress, and we will use the lessons from this event to shape that continued effort.
    
3.  **Unified and simplified infrastructure:** Our long-term goal is to unify the compute subsystem used to run functions across Edge Middleware, Edge Functions, and Serverless Functions. This unified and simplified infrastructure will be highly available and resilient, reducing dependency on any single provider.
    

### [Link to heading](#moving-forward)Moving forward

While this event was a severe disruption, it has reinforced our commitment to reliability and resilience. We apologize for the impact this event had on our customers and assure you that we are taking comprehensive steps to prevent similar issues in the future.