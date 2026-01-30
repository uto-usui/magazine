---
title: "Observe your feature flags with the Vercel DX platform"
source: "https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Dominik Ferber"
---

1 min read

May 23, 2024

![Flags are directly integrated with Vercel Web Analytics and Runtime Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NQwfatF42LARaSt5Elkfe%2F56ca1fa70c156c0986cde6522777fbf7%2FFeature_Flags_in_Web_Analytics_-_Light.png&w=1920&q=75)![Flags are directly integrated with Vercel Web Analytics and Runtime Logs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FA0MVPAiZVz1DY8BuGBVNV%2Faa46c9f878c5acb890389494bc7ef727%2FFeature_Flags_in_Web_Analytics_-_Dark.png&w=1920&q=75)

The Vercel DX Platform now has a deep understanding of the feature flags you use and create in third-party providers. This beta integration provides better insights into your applications and streamlines your development workflow.

-   **Web Analytics integration:** Break down page views and custom events by feature flags in Web Analytics, gaining granular insights into user interactions.
    
-   **Enhanced Log visibility:** The platform now displays feature flags in logs, making it easier to understand the conditions under which errors occur.
    
-   `reportValue`: Reports an evaluated feature flag from the server for runtime logs and Custom Analytics Events (server-side).
    
-   `<FlagValues />`: Surfaces a feature flags value on the client for usage in Analytics.
    

These features have universal compatibility with any feature flag provider you're already using, like LaunchDarkly, Statsig, or Split, or custom setups.

This update lets users on all plans leverage existing feature flag workflows within the Vercel platform and ship safely with more confidence.

Check out the [documentation](https://vercel.com/docs/workflow-collaboration/feature-flags/integrate-vercel-platform) to learn more.