---
title: "Shipping safer and smarter: Integrating feature flags deeper in the Vercel workflow"
source: "https://vercel.com/blog/feature-flags"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

4 min read

May 23, 2024

Introducing a platform-wide understanding of feature flags and an experimental Next.js design pattern.

Feature flags help teams to release with confidence, safely roll out changes, and test efficiently, improving collaboration and accelerating development cycles. If you use tools like [LaunchDarkly](https://launchdarkly.com/), [Statsig](https://www.statsig.com/), [Split](https://www.split.io/), or [Optimizely](https://www.optimizely.com/) to create feature flags, we're making integrating them into your Vercel workflows as easy as possible.

We started with [Edge Config](https://vercel.com/docs/storage/edge-config), allowing you to bring your own flags and enjoy faster load times. By bootstrapping flags directly from Edge Config, without going over the network, you can achieve speeds at least twice as fast as loading them directly from providers.

To further enhance the developer experience, we tackled the inconvenient process of working with feature flags. Instead of requiring you to sign in to external dashboards for even minor, temporary adjustments, we introduced the ability to [override feature flags directly from the Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/feature-flags/using-vercel-toolbar). This eliminates the need to switch tabs to log in to your external flag provider and is already improving workflows for companies like Notion and Leonardo.Ai.

Today, we're excited to announce a deeper integration with our Developer Experience Platform, along with an experimental Next.js design pattern, to take your feature flag experience to the next level.

## [Link to heading](#override-your-flags-from-the-vercel-toolbar)Override your flags from the Vercel Toolbar

Vercel can query an API Route defined in your application to find out about your feature flags and pick up their values by scanning the DOM for script tags. From there, you can override them from the Vercel Toolbar, per session, for shorter feedback loops and improved QA and testing. Additionally, the overrides will be stored in an optionally encrypted cookie so your application can respect them.

Teams like Notion have already started improving their feature flag workflows on Vercel, with the ability to override their flags from the Vercel Toolbar. Notion's recent homepage redesign rollout was powered by this functionality.

> Working with our feature flags in Vercel boosts our ability to quickly and safely iterate on experiments and features in development. The best part? It just works. It feels so magical during our development process.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5gA5TNcCzVfYxXh29SlPuX/1b19ac6de53ddb9a346917c79f623b92/image.png)
> 
> **Tanner Godarzi,** Frontend Engineer at Notion

Since this initial release, we have also added the ability to [recommend branch-based feature flag overrides](https://vercel.com/changelog/recommend-branch-based-feature-flag-overrides) in order to equip your team and quickly share work in development. The toolbar will suggest flag overrides to team members working on the branch locally or when visiting a branch Preview Deployment.

As part of that change, we’ve also improved the onboarding for setting up and integrating feature flags into the toolbar.

## [Link to heading](#integration-with-the-dx-platform)**Integration with the DX Platform**

Now in beta, your flags are integrated with Vercel [Web Analytics](https://vercel.com/docs/analytics) and [Runtime Logs](https://vercel.com/docs/observability/runtime-logs).

You can filter and break down your site's page views and custom analytics events by feature flags, helping you gain a deeper understanding of how your flags will impact your users. This granular level of analysis in Web Analytics empowers data-driven decisions, allowing you to optimize your experiments for maximum impact, regardless of your chosen flags provider.

![Flags are directly integrated with Vercel Web Analytics and Runtime Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6JRSekYaInUsObArjQ1f5%2F57971d6b36a67dbf521c1cb3104a9b8d%2Fimage__8_.png&w=1920&q=75)![Flags are directly integrated with Vercel Web Analytics and Runtime Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNz8lNeFq82YLIwDMRgS6b%2Ffa38896b7d0605f57c8d89c273428eb6%2Fimage__9_.png&w=1920&q=75)

Flags are directly integrated with Vercel Web Analytics and Runtime Logs.

`@vercel/flags` lets you integrate with the toolbar and platform. Check out the [example repository](https://github.com/vercel/shirt-shop).

```
import { reportValue } from "@vercel/flags"reportValue("summer-sale", true)
```

Integrating with Runtime Logs.

By surfacing this information directly in your logs, you're provided with invaluable context for debugging and troubleshooting. By understanding the precise conditions under which an error occurs, you can resolve issues faster and ensure a seamless user experience.

```
import { FlagValues } from '@vercel/flags/react';<FlagValues values={{ "summer-sale": true }} />
```

Integrating with Web Analytics.

Soon, you’ll also be able to change a flag in production and instantly see how it affects your Web Vitals in real-time in your Speed Insights.

## [Link to heading](#feature-flags-as-code)Feature flags as code

Traditional client-side feature flag implementations often lead to performance issues like loading spinners, flashing the wrong experiment, and layout shifts. This is called [jank](https://developer.mozilla.org/en-US/docs/Glossary/Jank), and it negatively impacts your user experience and SEO.

We believe server-side experimentation is the better method. Companies want to do server-side experimentation but don't have the right tools today to make this easy, fast, and maintainable, which is why we’re working on a new design pattern. We've implemented this approach of working with feature flags in code for Next.js in our `@vercel/flags/next` package, and we're working on a SvelteKit implementation as well.

Your feature flag providers give you flag values, but they don't have opinions about usage. This design pattern encodes our best practices, which avoid all those pitfalls and makes it way more approachable.

-   `@vercel/flags/react`: Helper functions to integrate with the toolbar and platform
    
-   `@vercel/flags/next`: Implements our flags patterns for Next.js
    

```
import { unstable_flag as flag } from "@vercel/flags/next"export const showSummerSale = flag({​​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍​‍‌‍​‌‌​​‌‍‍‌​‍‌‍​‍‌‍​‌‍‌‍‌​‍‌‍‌‌‌‍‌​‌‍‍‌‌‌​​‌‍‌‌​‌​‌‌‌‌‌‍​‌​‌‍‌​​‌​‌‌‍‌‍‍​​‌​​​‌​‌​‌‍‌‍‍​​​​​​‍‌‍‍‍‌‍‍‌‌‍‌‌‌‌‍‌​‌​‌‌‍‍​​​‍‌‍‌‌​​‌‌‍‌‌​‍​‍‌‌  key: 'summer-sale',​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍​‍‌‍​‌‌​​‌‍‍‌​‍‌‍​‍‌‍​‌‍‌‍‌​‍‌‍‌‌‌‍‌​‌‍‍‌‌‌​​‌‍‌‌​‌​‌‌‌‌‌‍​‌​‌‍‌​​‌​‌‌‍‌‍‍​​‌​​​‌​‌​‌‍‌‍‍​​​​​​‍‌‍‍‍‌‍‍‌‌‍‌‌‌‌‍‌​‌​‌‌‍‍​​​‍‌‍‌‌​​‌‌‍‌‌​‍​‍‌‌  async decide() {​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍​‍‌‍​‌‌​​‌‍‍‌​‍‌‍​‍‌‍​‌‍‌‍‌​‍‌‍‌‌‌‍‌​‌‍‍‌‌‌​​‌‍‌‌​‌​‌‌‌‌‌‍​‌​‌‍‌​​‌​‌‌‍‌‍‍​​‌​​​‌​‌​‌‍‌‍‍​​​​​​‍‌‍‍‍‌‍‍‌‌‍‌‌‌‌‍‌​‌​‌‌‍‍​​​‍‌‍‌‌​​‌‌‍‌‌​‍​‍‌‌    return false;​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍​‍‌‍​‌‌​​‌‍‍‌​‍‌‍​‍‌‍​‌‍‌‍‌​‍‌‍‌‌‌‍‌​‌‍‍‌‌‌​​‌‍‌‌​‌​‌‌‌‌‌‍​‌​‌‍‌​​‌​‌‌‍‌‍‍​​‌​​​‌​‌​‌‍‌‍‍​​​​​​‍‌‍‍‍‌‍‍‌‌‍‌‌‌‌‍‌​‌​‌‌‍‍​​​‍‌‍‌‌​​‌‌‍‌‌​‍​‍‌‌  },​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍​‍‌‍​‌‌​​‌‍‍‌​‍‌‍​‍‌‍​‌‍‌‍‌​‍‌‍‌‌‌‍‌​‌‍‍‌‌‌​​‌‍‌‌​‌​‌‌‌‌‌‍​‌​‌‍‌​​‌​‌‌‍‌‍‍​​‌​​​‌​‌​‌‍‌‍‍​​​​​​‍‌‍‍‍‌‍‍‌‌‍‌‌‌‌‍‌​‌​‌‌‍‍​​​‍‌‍‌‌​​‌‌‍‌‌​‍​‍‌‌});‍​​​​
```

Declaring your own feature flag.

```
import { showSummerSale } from "@/flags"  export async function Banner() {  const summerSale = await showSummerSale()  return summerSale ? <SummerSaleBanner /> : <RegularBanner />;}
```

Using a feature flag.

In addition, we also established a new pattern that allows Middleware to decide which prerendered version of a page to show. This means you can eliminate layout shifts and jank typically caused by client-side experimentation. We refer to this approach of predetermining the feature flags' values and making routing decisions in Middleware as _precomputing flags_.

This experimental pattern enables server-side experimentation, routing users to statically generated pages tailored to their specific experiment group. This approach works even when multiple feature flags and experiments are present on the same page and delivers better performance, eliminates layout shifts, and ensures accurate experimentation results. We're sharing our approach to working with flags in code early, and we look forward to your feedback.

[

**Check out the SDK**

Start experimenting server-side, with better performance and less jank.

View the docs



](https://flags-sdk.dev/)

We're excited to equip developers with these powerful new tools for working with feature flags. By seamlessly integrating with your existing workflows and providing deeper insights into user behavior, Vercel enables you to ship safely, experiment smarter, and build truly exceptional web experiences.

[

**Start interacting with your application’s feature flags.**

Unlock the new workflow today: Use the Vercel Toolbar to read and set feature flag overrides for your application.

Get started



](https://vercel.com/docs/workflow-collaboration/feature-flags/using-vercel-toolbar)