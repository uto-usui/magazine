---
title: "Flags SDK now supports OpenFeature"
source: "https://vercel.com/changelog/flags-sdk-now-supports-openfeature"
publishedDate: "2025-03-21"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Mar 21, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3ct3t5QfoUD6Rd2cItBgc7%2F62bb79042a1d580bd7254be55dd6e597%2FFlags___OpenFeature_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F462o64eVjwakhYyKR3rUru%2F3f5f1d940fbf4b3dce8c97288f62deb7%2FFlags___OpenFeature_-_Dark.png&w=1920&q=75)

The [Flags SDK adapter for OpenFeature](https://flags-sdk.dev/providers/openfeature) allows using any Node.js OpenFeature provider with the Flags SDK. Pick from a wide range of flag providers, while benefiting from the Flag SDK's tight integration into Next.js and SvelteKit.

flags.ts

```
import { createOpenFeatureAdapter } from "@flags-sdk/openfeature";import type { EvaluationContext } from "@openfeature/server-sdk";OpenFeature.setProvider(new YourProviderOfChoice());const openFeatureAdapter = createOpenFeatureAdapter(OpenFeature.getClient());export const exampleFlag = flag<boolean, EvaluationContext>({  key: "example-flag",  adapter: openFeatureAdapter.booleanValue(),});
```

Declare a feature flag using the Flags SDK and OpenFeature adapter

[OpenFeature](https://openfeature.dev/) is an open specification that provides a vendor-agnostic, community-driven API for feature flagging that works with your favorite feature flag management tool or in-house solution. OpenFeature exposes various providers through a unified API.

The [Flags SDK](https://flags-sdk.dev/) sits between your application and the source of your flags, helping you follow best practices and keep your website fast. Use the Flags SDK OpenFeature adapter in your application to load feature flags from all compatible Node.js OpenFeature providers, including:

-   AB Tasty
    
-   Bucket
    
-   Cloudbees
    
-   Confidence by Spotify
    
-   ConfigCat
    
-   DevCycle
    
-   Environment Variables Provider
    
-   FeatBit
    
-   flagd
    
-   Flipt
    
-   GO Feature Flag
    
-   GrowthBook
    
-   Hypertune
    
-   Kameleoon
    
-   LaunchDarkly
    
-   PostHog
    
-   Split
    

View the [OpenFeature adapter](https://flags-sdk.dev/providers/openfeature) or [clone the template](https://vercel.com/templates/next.js/flags-sdk-openfeature) to get started.