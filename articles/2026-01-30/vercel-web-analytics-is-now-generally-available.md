---
title: "Vercel Web Analytics is now generally available"
source: "https://vercel.com/blog/vercel-web-analytics-is-now-generally-available"
publishedDate: "2023-04-19"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

2 min read

Apr 19, 2023

Get detailed, first-party page views, traffic analytics, and custom events with Vercel Web Analytics.

Vercel Web Analytics is generally available for insights on your top pages, top referrers, and user demographics such as countries, operating systems, browser information, and more. We're also excited to announce new functionality, [filtering](https://vercel.com/changelog/filter-analytics-traffic-data) and [custom events](https://vercel.com/docs/concepts/analytics/custom-events).

[Web Analytics](https://vercel.com/docs/concepts/analytics/limits-and-pricing) is available on all plans and custom events are available for Pro and Enterprise users.

### [Link to heading](#first-party-analytics-for-privacy-friendly-tracking-and-less-js-)First-party Analytics for privacy-friendly tracking and less JS

Instead of relying on cookies, first-party Vercel Web Analytics can identify a user by a hash created from the incoming request. Using a generated hash provides a privacy-friendly experience for your visitors and means they can't be tracked across different websites or applications, and data is discarded after 24 hours. Using Vercel Web Analytics removes the need for cookie tracking and third-party scripts.

In just three steps you can set up Web Analytics on your projects to get access to traffic insights—without any compromise on your page loading speed. Vercel Web Analytics is **44x smaller than Google Analytics** so you'll maintain great site performance.

> Analytics unlocks a treasure trove of application data faster than it would take to write the JIRA ticket to set it up.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1XR6dZM8NyXfs700MZQy0k/4cb155aab61bf3c9d9540042b4de5329/image.png)
> 
> **Michelle Bakels,** Co-organizer of React Miami

### [Link to heading](#framework-defined-analytics-ingestion-and-reporting)Framework-defined analytics ingestion and reporting

The `Analytics` component is a wrapper around the tracking script, offering more seamless integration with Next.js and other frameworks:

```
import type { AppProps } from 'next/app';import { Analytics } from '@vercel/analytics/react';function MyApp({ Component, pageProps }: AppProps) {  return (    <>      <Component {...pageProps} />      <Analytics />    </>  );}export default MyApp;
```

If you are using the pages directory, add this component to your main app file.

### [Link to heading](#now-with-custom-event-tracking)Now with Custom Event Tracking

Vercel Web Analytics also gives Pro and Enterprise users the ability to track custom events. With custom events, you can track things like newsletter signups or what CTAs your customers are clicking the most to dive deeper into understanding your user's journey.

```
import va from '@vercel/analytics';function SignupButton() {  return (    <button       onClick={() => {        va.track('Signup', {          location: 'US'        });      };    >      Sign Up    </button>  );};
```

This will track an event named Signup.

Understanding users is crucial to building a great product. With Vercel's Web Analytics feature, you can quickly and easily gain insights into your audiences to ensure you're building the best experiences for them. [Get started today](https://vercel.com/docs/concepts/analytics).