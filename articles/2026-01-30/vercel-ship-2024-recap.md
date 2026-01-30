---
title: "Vercel Ship 2024 recap"
source: "https://vercel.com/blog/vercel-ship-2024"
publishedDate: "2024-05-24"
category: "frontend"
feedName: "Vercel"
author: "Morgane Palomares"
---

3 min read

May 24, 2024

Nearly 1,000 people gathered in NYC to celebrate our second annual Vercel Ship event.

Vercel Ship 2024 was all about the power of the frontend cloud, highlighting the integrations, ecosystem, and teams building the web's best products.

This year we introduced some powerful features to enhance iteration velocity:

-   Improved platform and Next.js **integrations for feature flags**
    
-   Log, block, and challenge malicious traffic with the **Vercel Firewall**
    
-   New tools to improve iteration velocity in the **Vercel Toolbar**
    
-   React 19 support, improved caching, and more in the **Next.js 15 Release Candidate**
    
-   Further updates and improvements to **v0 and the Vercel AI SDK**
    

[

**See all the Ship 2024 announcements.**

Watch the full Keynote to see live demos of all the new features we announced.

Watch the Keynote



](https://vercel.com/ship)

## [Link to heading](#working-with-feature-flags-on-vercel)Working with feature flags on Vercel

Flags are now integrated into Vercel Web Analytics and logs. You can look at your site's page views or custom analytics events based on which feature flags were active, helping you better understand how your flags impact your users.

![Applying feature flags in Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1fuOUihiGIUXeobJ8gV8ba%2F1b4b135c497a6f715954cbdcccd28d9b%2FFlags_Sharing.jpg&w=1920&q=75)![Applying feature flags in Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F70Q8h51yEOgSDRPijpElMp%2F4922d8b243fa8c0b894590ee32b3a21d%2FFlags_Sharing-1.jpg&w=1920&q=75)

Applying feature flags in Vercel.

Plus, you can now try our new experimental design pattern for working with flags in Next.js (and soon SvelteKit). It encodes our best practices to help avoid the challenges of client-side experimentation and makes server-side experimentation much more approachable.

[

**Start working with flags.**

Seamlessly integrate feature flags created in third-party providers like LaunchDarkly and Statsig into your development workflow in Vercel.

Get Started



](https://vercel.com/blog/feature-flags)

## [Link to heading](#introducing-vercel-firewall)Introducing Vercel Firewall

![The new Vercel Firewall.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RLSBW3B7KIz8zkum2MP7N%2F2d333b901ce8720725c8ad5f95ef77a2%2FFirewall_Blog_-_Hero_-_Light.png&w=1920&q=75)![The new Vercel Firewall.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RshEIkQBqPUQyMBo3BCi1%2F199f985c0a517e51728e9d298e5dcc11%2FFirewall_Blog_-_Hero_-_Dark.png&w=1920&q=75)

The new Vercel Firewall.

Vercel Firewall allows you to create custom rules to log, block, challenge, or rate limit (beta) traffic. This application-aware firewall combines performance with simplified management:

-   Rules can be based on 15+ fields, including request path, user agent, IP address, JA4 fingerprint, geolocation, HTTP headers, and even target path
    
-   Firewall configuration changes propagate within 300ms globally. If you make a mistake, you can instantly rollback to previous rules
    

[

**Be secure by default.**

Take your application security to the next level with Vercel Firewall, offering robust protection against a wide range of web threats.

Read the Announcement



](https://vercel.com/blog/introducing-the-vercel-waf)

## [Link to heading](#vercel-toolbar-improvements)Vercel Toolbar improvements

We upgraded the Vercel Toolbar with new developer tools, including:

-   [Open Graph preview](https://vercel.com/changelog/inspect-open-graph-data-with-the-vercel-toolbar): See exactly how your OG cards will look when shared on Slack or social platforms like X and LinkedIn
    
-   [Accessibility audit](https://vercel.com/changelog/accessibility-tool): Complete accessibility audits on all your deployments where the Vercel Toolbar is enabled. Vercel will automatically check against the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/) Level A and AA rules
    
-   [Interaction timing](https://vercel.com/changelog/interaction-timing-tool): Optimize your website's responsiveness and user experience by measuring and [improving Interaction to Next Paint (INP)](https://vercel.com/blog/how-core-web-vitals-affect-seo)
    
-   [Use the toolbar in production](https://vercel.com/changelog/use-the-vercel-toolbar-in-production): You can now get the toolbar in your production environment without any configuration by installing the [Vercel Chrome Extension](https://chromewebstore.google.com/detail/vercel/lahhiofdgnbcgmemekkmjnpifojdaelb?hl), or by enabling the toolbar for your production domains right in the toolbar menu
    

[

**Explore the Vercel Toolbar.**

See what's possible with the Vercel Toolbar today and experience truly collaborative iteration in your development.

Learn More



](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)

## [Link to heading](#next.js-15-release-candidate)Next.js 15 Release Candidate

The Next.js 15 Release Candidate (RC) is now available for early testing. This version introduces exciting features and improvements:

-   [React feature integration:](https://nextjs.org/blog/next-15-rc#react-19-rc) Support for React 19 RC, React Compiler (Experimental), and hydration error improvements
    
-   [Caching:](https://nextjs.org/blog/next-15-rc#caching-updates) `fetch` requests, `GET` Route Handlers, and client navigations are no longer cached by default
    
-   [Partial Prerendering (Experimental):](https://nextjs.org/blog/next-15-rc#incremental-adoption-of-partial-prerendering-experimental) New Layout and Page config option for incremental adoption
    
-   [`next/after` (Experimental):](https://nextjs.org/blog/next-15-rc#executing-code-after-a-response-with-nextafter-experimental) New API to execute code after a response has finished streaming
    
-   [Updates to `create-next-app`:](https://nextjs.org/blog/next-15-rc#create-next-app-updates) Updated design and a new flag to enable Turbopack in local development
    
-   [Bundling external packages (Stable):](https://nextjs.org/blog/next-15-rc#optimizing-bundling-of-external-packages-stable) New config options for App and Pages Router
    

To install the Next.js 15 RC:

```
npm install next@rc react@rc react-dom@rc
```

Read the [full post on the Next.js blog](https://nextjs.org/blog/next-15-rc) for more information, and stay tuned for the official Next.js 15 GA announcement.

## [Link to heading](#v0)v0

v0 helps you [go from idea to UI in seconds](https://v0.dev/), enabling you to generate React code from simple text prompts and images. We've made v0 even faster, more reliable, and more accessible by enhancing platform reliability and automatically adding ARIA attributes to generated code.

## [Link to heading](#ai-sdk)AI SDK

The Vercel AI SDK is a TypeScript library for building AI-powered applications with React, Next.js, Nuxt, SvelteKit, and more. The SDK is organized into three pillars:

-   [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core): A unified API to work with leading LLMs from providers like OpenAI, Anthropic, Mistral, and Groq
    
-   [AI SDK UI](https://sdk.vercel.ai/docs/ai-sdk-ui): For building streaming chatbots with minimal code
    
-   [AI SDK RSC](https://sdk.vercel.ai/docs/ai-sdk-rsc): Dynamic, component-based "Generative UI" experiences powered by AI
    

With the Vercel AI SDK, developers can easily build the intelligent web applications of the future.

## [Link to heading](#transforming-the-web-together)Transforming the web together

Ship 2024 showcased the power of the web. To catch up on all the announcements, [watch the Keynote](https://vercel.com/ship), and stay tuned for recordings of the customer sessions coming next week.

[

**Learn how Vercel can help your developer and user experience.**

Traditional deployment tools weren’t built for frontend development. Get the DX Platform that has teams shipping 6x faster.

Contact Us



](https://vercel.com/contact/sales)