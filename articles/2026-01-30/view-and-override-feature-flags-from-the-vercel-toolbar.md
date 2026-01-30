---
title: "View and override feature flags from the Vercel Toolbar"
source: "https://vercel.com/changelog/view-and-override-feature-flags-from-the-vercel-toolbar"
publishedDate: "2024-03-06"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

Mar 6, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FNOZCPdL8Dad7M1QygGcDA%2F570261062598261d18cca776562d03ca%2FFeature_Flags.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F47u6wcime7QAGDiNmoVX98%2Fa97489d9e53f196c0a62750a7da7b349%2FFeature_Flags-1.jpg&w=1920&q=75)

You can now view and [override your application's feature flags](https://vercel.com/blog/toolbar-feature-flags) from the Vercel Toolbar.

This means you can override flags provided by LaunchDarkly, Optimizely, Statsig, Hypertune, Split, or your custom setup without leaving your Vercel environment.

Vercel can now query an API Route defined in your application to find out about your feature flags, and will pick up their values by scanning the DOM for script tags. From there you can create overrides from the Vercel Toolbar, per session, for shorter feedback loops and improved QA and testing. Additionally, the overrides will be stored in an optionally encrypted cookie so your application can respect them.

This functionality is currently in beta and available to users on all plans.

[Check out the documentation](https://vercel.com/docs/workflow-collaboration/feature-flags) to learn more.

If you're a feature flag provider and interested in integrating with the Vercel Toolbar, [contact us](https://vercel.com/help).