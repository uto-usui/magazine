---
title: "Introducing the Flags Explorer, first-party integrations, and updates to the Flags SDK "
source: "https://vercel.com/blog/introducing-the-flags-explorer-first-party-integrations-and-updates"
publishedDate: "2025-05-07"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

3 min read

May 7, 2025

Integrating feature flags deeper in your workflow with updates across Vercel

Experimentation, A/B testing, and feature flags serve as essential tools for delivering better user experiences, ensuring smoother rollouts, and empowering teams to iterate quickly with confidence. We're making it easier to bring flags into your workflow with:

-   [Flags Explorer](https://vercel.com/blog/introducing-first-party-integrations-the-flags-explorer-and-improvements-to-5PV9eaYQW7uIQTFdasvP5H#flags-explorer:-manage-your-flags-in-vercel), now generally available, allowing you to manage feature flags directly from the Vercel Toolbar
    
-   New first-party integrations with flag providers on the [Vercel Marketplace](#experimentation-on-the-vercel-marketplace,-featuring-statsig)
    
-   Updates to the [Flags SDK](#flags-sdk:-working-with-flags-in-code) and new adapters
    

## [Link to heading](#flags-explorer:-manage-your-flags-in-vercel)Flags Explorer: Manage your flags in Vercel

The [Flags Explorer](https://vercel.com/docs/feature-flags/using-vercel-toolbar) in the [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar) gives you a clear view of all feature flags and lets you override their values directly from the toolbar, simplifying testing and experimentation. This feature is now generally available for users on all plans.

Flags Explorer lets you override feature flags for your own session, without affecting colleagues, and without signing into your flag provider. This lets you test features in production before they go live for everyone and keeps you in the flow. You can also use the Flags Explorer to demo upcoming features, or share overrides with team members to collect feedback or test and QA.

## [Link to heading](#experimentation-on-the-vercel-marketplace,-featuring-statsig)Experimentation on the Vercel Marketplace, featuring Statsig

The new [Experimentation category](https://vercel.com/marketplace?category=experimentation) on the [Vercel Marketplace](https://vercel.com/marketplace) lets you integrate experimentation and feature flagging tools into your project, deployment workflows, and release processes without needing separate accounts for the provider.

Our launch partner, [Statsig](https://www.statsig.com/blog/statsig-vercel-native-integration), provides a powerful feature flagging and experimentation platform that helps teams test and iterate on new features with confidence.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1T5mwZBqoQigsI2LDVDjLY%2Fd5c7bac00e974a6437d14f787d529460%2FExperimentation_Category_-_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3lZbgJlwdE8v8V6XHaPAw9%2Ffbcb9b2dda7eb235f433d111a6bd0452%2FExperimentation_Category_-_Dark.jpg&w=1920&q=75)

By using [Statsig on the Vercel Marketplace](https://vercel.com/marketplace/statsig), you’ll get:

-   Quick setup: Configure Statsig with just a few clicks
    
-   Managed configuration: Environment variables and API keys are preconfigured
    
-   Consistent deployments**:** Maintain consistent settings and version history across deployments, helping ensure that experiments run reliably across all environments
    
-   Low-latency flag evaluation: Sync feature flags into Vercel's [Edge Config](https://vercel.com/docs/edge-config), reducing network requests and ensuring flags work even if the provider is down
    

[

**Try the template**

Try Statsig's first-party experimentation integration on the Vercel Marketplace.

Get started



](https://vercel.com/templates/next.js/statsig-experimentation-with-flags-sdk)

If you’re building an experimentation platform or feature flags solution and you’re interested in featuring your product in the Vercel Marketplace’s Experimentation category, contact us at [integrations@vercel.com](mailto:integrations@vercel.com) or refer to our [provider documentation](https://vercel.com/marketplace-providers) to get started.

## [Link to heading](#flags-sdk:-working-with-flags-in-code)Flags SDK: Working with flags in code

The [Flags SDK](https://flags-sdk.dev/) is an open-source library that gives developers tools to integrate feature flags in Next.js and SvelteKit applications.

```
npm i flags
```

`flags` works with popular providers like Statsig, other third-party tools, or your own custom solution. Whether you're running A/B tests, rolling out new features gradually, or personalizing user experiences, the SDK provides a flexible way to control features at runtime without redeploying.

```
import { flag } from 'flags/next';export const exampleFlag = flag({  key: 'example-flag',  decide() {    return false;  },});
```

Importing and evaluating flags using the Flags SDK.

The Flags SDK now supports loading feature flags directly from [many providers](https://flags-sdk.dev/providers) through a new adapters architecture, with more providers coming soon. This simplifies connecting your code to a feature flag provider using the Flags SDK. For example, the [`@flags-sdk/statsig`](https://flags-sdk.com/api-reference/provider/statsig) package allows you to manage your Statsig flags directly within Vercel in the Flags Explorer.

## [Link to heading](#get-started-with-flags-on-vercel)Get started with flags on Vercel

By integrating experimentation tools like Statsig directly into your Vercel workflow, you can accelerate iteration velocity, reduce risk, and deliver personalized user experiences. This new category on the Marketplace, combined with Vercel's existing feature flag capabilities, will empower you to build more quickly and confidently.

[

**Check out the documentation**

Dive in and learn how to use feature flags with Vercel's DX platform.

Get started



](https://vercel.com/docs/feature-flags)