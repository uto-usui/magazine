---
title: "Protecting your app (and wallet) against malicious traffic"
source: "https://vercel.com/blog/protecting-your-app-and-wallet-against-malicious-traffic"
publishedDate: "2024-08-02"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

4 min read

Aug 2, 2024

Let's explore how to block traffic with the Firewall, set up soft and hard spend limits, apply code-level optimizations, and more to protect your app against bad actors.

_If you’re on our free tier, you don’t need to worry. When your app passes the included free usage, it is automatically paused and never charged._

## [Link to heading](#configurable-firewall-rules)Configurable Firewall rules

You can create [custom Firewall rules](https://vercel.com/docs/security/vercel-waf) to log, block, or challenge traffic to your app. Custom rules are available on all plans for no additional charge.

Rules can be based on 15+ fields including request path, user agent, IP address, JA4 fingerprint, geolocation, HTTP headers, and even target path.

### [Link to heading](#blocking-traffic-based-on-ip-address)Blocking traffic based on IP address

For example, let’s say you notice some strange traffic from a single IP:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F69UripybaiWPQ6o0uZSHfV%2F94c612664ecd0a2ee61f1d8c105b98f4%2F1920w_x_vh__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NcqvIxnVxDHakdwh1QG2f%2F01c88f422591eac187e2202191c19bed%2F1920w_x_vh.png&w=1920&q=75)

You can create a custom rule to deny traffic from this IP address:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Npw3AZBnsRZ3kAzBQdyXb%2F3f67bfc806e853c9d2763eedad9bf18a%2F1920w_x_vh__4_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3M9WUjX2bAa9m9G1tf2nN8%2F26c7c6f3e12df99304b4a9fbed0e1a3b%2F1920w_x_vh__5_.png&w=1920&q=75)

### [Link to heading](#blocking-traffic-based-on-ja4-fingerprints)Blocking traffic based on JA4 fingerprints

What if you notice an unfamiliar traffic pattern from multiple IP addresses?

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6jiKM1URcnYWu0T7vZ9YMk%2F5fdc0ff58d858db3f9e38322140e1951%2F1920w_x_vh__6_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7dsHCDw0NrAxNgO7mNc47m%2F7677ba9c203f418accaaa0b92b92c1dd%2F1920w_x_vh__7_.png&w=1920&q=75)

Filtering the Firewall data by JA4 allows you to see fingerprints of traffic data. This is more advanced than looking at just the IP address, user agent, or geolocation. Instead, we can compute a unique fingerprint for traffic that is difficult to circumvent.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fhvg39IoHvZJUx52bp6lWq%2F61936782f5760adeb6467a18a7a7ee2f%2F1920w_x_vh__8_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1NOpb9UH5mFCTM0iCRuoSD%2F6e58cb9dff9af577d150966b9db9d935%2F1920w_x_vh__9_.png&w=1920&q=75)

Using [JA4 fingerprints](https://vercel.com/docs/security/tls-fingerprints#ja4) means a higher probability of detecting (and blocking) bad actors. This advanced fingerprinting is available on all Vercel plans for free.

### [Link to heading](#challenging-suspicious-traffic-with-attack-challenge-mode)Challenging suspicious traffic with Attack Challenge Mode

Let’s say you get a usage notification from Vercel that your application is seeing more traffic than normal. It might not be obvious at first what the issue is, and you want to ensure only real customers are allowed into your app.

With the Firewall, you can turn on [Attack Challenge Mode](https://vercel.com/docs/security/attack-challenge-mode).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F64v4yOWr6VUxaAoUImq7qQ%2Fdda7aa28498b72c54b61c1b44581714e%2Fchallenge-light.avif&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7AV2sBQu1t7kaxzq0eqJbR%2F7726f391560280a9dfa372a77ae1d470%2Fchallenge-dark.avif&w=1920&q=75)

This serves up a “challenge” screen to all visitors temporarily while you investigate the rise in usage. Real visitors will automatically complete a browser challenge in the background before proceeding to the app. Malicious traffic likely will not pass the challenge.

You can also define custom rules to challenge traffic at a more granular level.

## [Link to heading](#real-time-usage-and-spend-controls)Real-time usage and spend controls

Serverless shouldn’t mean unlimited usage. Only you know what’s right for your application and your business. To help avoid unexpected bills, you can define a spend limit to get alerted, or automatically pause your app when that amount is reached.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NZjFKbMRe4zn0NYmTNesk%2F9a8942557b073f01c53320e8e3d4b290%2FSpend_Management.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yUafg21rTRl51AQwyJQgu%2Fc902bf142a05f57fe5b6a7cff63aaad5%2FSpend_Management__1_.png&w=1920&q=75)

To quickly take action on traffic patterns, you need to understand your usage in real-time. That’s why we provide a powerful usage page to help you understand your traffic at a glance, as well as a more powerful query engine for advanced usage investigation with [Monitoring](https://vercel.com/docs/observability/monitoring).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F618yw7VTAME3QALL4reSOK%2F6002d0c5ea71f311d5793dad044a6af6%2F1920w_x_vh.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5G3VOsOXhJDx9VE43P6czw%2F3763de9a69b1bda06e58e1aa91ff0c04%2F1920w_x_vh__1_.png&w=1920&q=75)

## [Link to heading](#code-optimizations)Code optimizations

You can also proactively configure your application to [optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage). For example, the following areas for optimization are places we commonly see customers reference.

### [Link to heading](#enable-fluid-compute)Enable Fluid compute

We strongly recommend enabling Fluid compute, which is a more cost-effective model for Vercel Functions. This can **save up to 85% of your function usage** for applications with many concurrent requests.

[Learn more about Fluid](https://vercel.com/blog/introducing-fluid-compute) and how to enable in your project.

### [Link to heading](#enable-transformation-based-image-optimization)Enable transformation based Image Optimization

Vercel’s infrastructure has the ability to optimized images on-demand. This works with [frameworks](https://vercel.com/docs/frameworks#frameworks-infrastructure-support-matrix) like Next.js, SvelteKit, Nuxt, Astro, and Gatsby.

The value you pass to the `src` of your image will produce _multiple_ optimized images based on the viewport and device of the visitor. Previously, Vercel's Image Optimization was billed based on the number of unique source images.

Based on your feedback, we recently changed that to [bill on the number of transformations](https://vercel.com/changelog/faster-transformations-and-reduced-pricing-for-image-optimization), which a lowered price. We recommend enabling this new option. Learn more about [managing costs](https://vercel.com/docs/image-optimization/managing-image-optimization-costs).

This service is optional — you can also optimize your images before uploading them to your CMS or database, and then use the `unoptimized` prop when using frameworks like Next.js (as the source is already compressed).

### [Link to heading](#move-large-media-files-\(like-images-or-videos\)-to-blob-storage)Move large media files (like images or videos) to Blob storage

When investigating your usage, if you see that your top sources of Fast Data Transfer are large image or video files, you might consider moving these assets to blob storage. [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) is a cost-effective object storage service for these static assets.

You can also investigate your usage with [Vercel Observability](https://vercel.com/docs/observability) to better understand the source.

## [Link to heading](#protecting-your-deployments-from-unauthorized-traffic)Protecting your deployments from unauthorized traffic

Vercel creates a unique deployment for every commit you push to your repository.

This makes it easy to preview and test changes, as well as instantly rollback to older versions if something goes wrong.

For most of your applications, you likely only want your current production deployment to be publicly accessible. In November 2023, we updated the defaults for deployment protection to be [turned on by default](https://vercel.com/changelog/deployment-protection-is-now-enabled-by-default-for-new-projects). If you joined Vercel after this time, congratulations, your work here is done.

For those of you who have been on Vercel for longer, it might be worth revisiting your deployment protection settings to ensure access to your deployments are locked down to those on your Vercel team. We’re soon shipping an improvement to highlight this in the Vercel dashboard.

## [Link to heading](#secure-by-default)Secure by default

Our goal is to make applications on Vercel [secure by default](https://vercel.com/resources/iterating-towards-secure-by-default). The only traffic that makes it to your app (and to your bill) is traffic you’re excited to welcome.

Vercel keeps you protected from large attacks on your apps automatically. We block an average of 1 billion suspicious connections per week. This malicious traffic never makes it past our Firewall to your wallet.

While we continuously strengthen our defense against bad actors, your applications have different levels of tolerance for traffic patterns. A spike of ten thousand new requests might be a normal day for you, or it might be something wrong.

That’s why we also provide configurable Firewall rules, usage notifications, SMS notifications, spend limits, and more. Hopefully you now have a better understanding of how to keep your application protected on Vercel and prevent unwanted usage.