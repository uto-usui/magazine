---
title: "Introducing Spend Management"
source: "https://vercel.com/blog/introducing-spend-management-realtime-usage-alerts-sms-notifications"
publishedDate: "2023-10-05"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

3 min read

Oct 5, 2023

Realtime Usage Alerts, SMS Notifications, and Automatic Project Pausing

Serverless infrastructure can instantly and infinitely scale. While powerful, this has had tradeoffs. An unforced error or traffic spike could cause an unexpected bill.

We heard your feedback—you wanted more control over your usage and spend. Today, we're rolling out new controls to help you safely scale your projects and manage spend:

-   **Email / Web / SMS notifications** when your spend passes defined amounts
    
-   **Flexible webhooks** to instantly take action on real-time usage updates
    
-   **Automatic project pausing** when you reach your defined spend amount
    
-   **New APIs** to programmatically pause and resume your projects
    
-   **Safe defaults** for Vercel Functions with higher max durations
    

## [Link to heading](#more-confidence-with-spend-management)More confidence with Spend Management

You can now instantly take action when your usage increases with **Spend Management and SMS notifications**.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NZjFKbMRe4zn0NYmTNesk%2F9a8942557b073f01c53320e8e3d4b290%2FSpend_Management.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yUafg21rTRl51AQwyJQgu%2Fc902bf142a05f57fe5b6a7cff63aaad5%2FSpend_Management__1_.png&w=1920&q=75)

### [Link to heading](#what-is-spend-management)What is Spend Management?

Spend management lets you take action when your usage hits the defined spend amount, either through:

### [Link to heading](#receiving-notifications)**Receiving notifications**

When your spend approaches or exceeds your set amount, you'll receive real-time notifications to help you stay in control. This includes **Web** and **Email** notifications at 50%, 75%, and 100%. Additionally, you can also receive **SMS** notifications when your spending reaches 100%.

Some examples of using Spend Management might look like:

-   After launching your new product, you want to monitor growth and be alerted if things start to go viral. You define a Spend Notification for $200 to get alerted on your usage in real time. Once your spend reaches $200, an email notification is sent immediately.
    
-   You are building a small AI project and are worried about potential malicious usage. Even though you’ve added [rate limiting](https://vercel.com/guides/rate-limiting-edge-middleware-vercel-kv), you want peace of mind knowing it won’t cost you more than $50. You define a Spend Notification for $50 to pause all projects when the spend amount if reached.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3wC1yVrncXCOxSXqXPrsy4%2F79096b2a985507f677f56ad83b13bc84%2FProject_Overview.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4HSESJlRFCCblmelQEy6aD%2Fb16e7d1a33416880d0fe0864e9ccabb1%2FProject_Overview-1.jpg&w=1920&q=75)

Rather than waiting hours (or sometimes days) on other infrastructure, Vercel can measure and report back usage immediately, thanks to our real-time usage data pipeline.

On top of the default usage notifications through email or in-product, the addition of flexible spend notifications and our [Pause API](https://vercel.com/docs/rest-api/endpoints#pause-a-project) allows you to have complete confidence in your Vercel project. You can either automatically pause your projects when the spend amount is reached, our use a webhook to call the API programmatically.

app/api/pause/route.ts

```
export async function POST(request: Request) {  await fetch('https://api.vercel.com/v1/projects/<project-id>/pause?teamId=<team-id>', {    headers: {      Authorization: 'Bearer <your-token>',      'Content-Type': 'application/json'    },    method: 'POST'  });  return new Response('Project paused');}
```

You can programmatically pause Vercel projects using our new REST API endpoint.

## [Link to heading](#updates-to-vercel-functions)Updates to Vercel Functions

Earlier this year, we released automatic recursion protection for Vercel Functions. This has already **prevented thousands of dollars in unintentional costs** for our customers.

This has been an improvement, but your feedback has been you want both lower defaults to prevent unintentional large bills, as well as the ability to have longer running Vercel Functions.

### [Link to heading](#run-functions-for-up-to-five-minutes)Run Functions for up to five minutes

Customers deploying AI workloads with [Vercel Functions](https://vercel.com/docs/functions) have enjoyed streaming responses back with the [AI SDK](https://sdk.vercel.ai/docs), but not all of these workloads were chat or generative based. For some computationally heavy tasks like generating images, customers have wanted longer running Vercel Functions with the full power of Node.js.

**You can can run up to 5 minute functions** on the Pro plan. In additional, there is now a more safe default of 15 seconds ([configurable](https://vercel.com/docs/functions/configuring-functions/duration)) as well. This helps prevent uncontrolled function usage due to abuse and reduces the risk of unexpectedly high bills.

## [Link to heading](#what's-next-for-spend-management)What's next for Spend Management

While we're excited about the new controls for managing your spend and getting alerted on real-time usage changes, there's more we want to do.

Next, we're working on **powerful anomaly detection** for your spend to proactively alert you when spikes happen, rather than manually adding spend amounts. Stay tuned for more product updates to help you scale with confidence on Vercel.

[Check out our documentation on Spend Management](https://vercel.com/docs/accounts/spend-management) and let us know your feedback.