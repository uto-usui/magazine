---
title: "Introducing Skew Protection"
source: "https://vercel.com/blog/version-skew-protection"
publishedDate: "2023-06-21"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

3 min read

Jun 21, 2023

A novel, more reliable mechanism for application deployment.

Have you ever seen a 404 for requests from old clients after a deployment? Or gotten a 500 error because the client didn’t know that a new server deployment changed an API? We're introducing a generic fix for this problem space.

Vercel customers are deploying over 6 million times per month, making their businesses more successful one commit at a time. But since the dawn of the distributed computing age, each system deployment has introduced the risk of breakage: When client and server deployments aren’t perfectly in sync, and they won’t be, then calls between them can lead to unexpected behavior.

We call this issue **version skew**. In the worst case, version skew can break your app, and in the best case, it leads to substantial extra engineering effort as software changes crossing system boundaries must be backward and forward-compatible.

Today, we're introducing [Skew Protection](https://vercel.com/docs/concepts/deployments/skew-protection) for deployments, a novel mechanism to eliminate version skew between web clients and servers. This technology will substantially reduce errors users observe as new deployments are rolled out. Additionally, it will increase developer productivity as you no longer need to worry about backward and forward compatibility of your API changes. Available today for everyone in [Next.js and SvelteKit with Nuxt and Astro coming soon](https://vercel.com/docs/deployments/skew-protection#supported-frameworks).  

## [Link to heading](#version-skew-explained)Version skew explained

Version skew happens whenever two components of a software system communicate, but they aren’t running at exactly the same version. Often this is benign, but it can lead to hard to predict and debug problems.

form.tsx

```
< <input type="email" name="emal" />---> <input type="email" name="email" />
```

Imagine, for example, that your app has a form. One day you realize you misspelled the name of the email field. It’s not a huge deal because the code on the backend that reads the field has the same misspelling. But still, you decide to fix the spelling on both backend and frontend. Now we have potential version skew: If a user loaded the form before the change, but submits after the deployment happened, then they will get an error because the email field won’t be recognized (the backend expects the new spelling and the frontend sends the old name).

With Vercel’s Skew Protection this problem goes away by ensuring that clients that loaded the form with the old field name talk to servers with the exact same version which respectively know how to handle that field name.

For more info on version skew and potential skew management strategies check out the deep dive [here](https://www.industrialempathy.com/posts/version-skew/).

## [Link to heading](#how-skew-protection-works)How Skew Protection works

For opted-in deployments, applications are bound to the version that originally generated them every time a user initially navigates to the app. Subsequent requests from this instance of the app are then automatically routed to be served from that same version.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5rlKh0tEJlvZ4scz5rNV6f%2F97d42711d821fa9c0bbe6fe2f228673d%2Fnested-layouts-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2PYUu1oPnccCqaqEYBsrcw%2Fd5094d6674346614753e2ab6a8077271%2Fnested-layouts-dark.png&w=1920&q=75)

To opt in to this experimental feature, add the following configuration to your next.config.js—supported in Next.js 13.4.7 or newer. The Next.js feature tags requests with the desired deployment ID. Vercel then uses that information to implement the Skew Protection feature.

```
/** @type {import('next').NextConfig} */const nextConfig = {  experimental: {    useDeploymentId: true,    // If use with serverActions is desired    serverActions: true,    useDeploymentIdServerActions: true,  },};module.exports = nextConfig;
```

We're planning to support automatic Skew Protection for additional request-types in the future. You can experiment with per-request opt-in today by reading the deployment id from `process.env.VERCEL_DEPLOYMENT_ID` and passing it down in `fetch` requests via the `X-Deployment-Id` header:

```
const r = await fetch("/get", {  headers: {    // Ensures the request will be handled by the expected    // deployment.    "X-Deployment-Id": deploymentId,  },});
```

## [Link to heading](#the-mechanism-explained)The mechanism explained

Skew Protection is taking advantage of Vercel’s immutable deployments as the enabling primitive. While production deployments change the primary deployment a given domain is aliased to, Vercel retains the capability to serve previous deployments. If you’ve used Vercel’s [Instant Rollback](https://vercel.com/docs/concepts/deployments/instant-rollback) feature before–it is based on the same underlying mechanism.

Our serverless technology paired with powerful edge application routing makes this efficient and cost-effective without requiring the provisioning of physical infrastructure for each version that runs concurrently.

With Skew Protection, whenever a user does a so-called “hard navigation”, the deployment ID that this navigation was served from is encoded in the response HTML. Subsequent requests are then tagged with that deployment ID and when they enter Vercel’s platform our global edge infrastructure automatically routes those requests to the respective deployment.

## [Link to heading](#trade-offs-and-security-considerations)Trade-offs and security considerations

While Skew Protection eliminates the hardest to manage skew boundary, between the user’s client and the servers, it does not eliminate version skew per-se. Services behind the frontend server must continue to be robust to being called from older clients.

Developers can choose the maximum age for deployments to be eligible for skew protection (up to 7 days for Enterprise customers). Given the trade-off mentioned above, one needs to consider client-convenience and backend-service backward compatibility requirements.

The mechanism does introduce the risk of downgrade attacks. We mitigate the risk by not supporting deployment-binding on browser navigations (requests serving the primary HTML) and by limiting the feature to same-origin requests. Still, you may want to [block deployments from serving](https://vercel.com/docs/deployments/skew-protection#configure-skew-protection) after security fixes or particularly important changes.

## [Link to heading](#deploy-with-confidence)Deploy with confidence

Deploying with confidence means shipping even faster. We’re excited to start this journey to a more reliable way of web application deployment with all of you. Give [Skew Protection](https://vercel.com/docs/concepts/deployments/skew-protection) a try and let us know what you think.