---
title: "NEW! A trickle of updates to your waterfall charts"
source: "https://www.speedcurve.com/blog/waterfall-updates"
publishedDate: "2025-12-14"
category: "performance"
feedName: "SpeedCurve Blog"
---

![](https://images.speedcurve.com/team/mark_zeman.png?w=152&h=152&fit=crop&auto=format,compress)

Mark Zeman - Dec 15, 2025

Waterfall charts are the workhorse of any web performance enthusiast. SpeedCurve's interactive waterfall is one of the first components I designed and built more than a decade ago. I've just given our much-loved waterfall chart some team-inspired updates that you may find helpful in understanding how page construction affects important user experience metrics.

![Waterfall Chart](https://blog-img.speedcurve.com/img/558/waterfall.png?auto=format,compress&fit=max&w=2000)

At SpeedCurve, we love incremental updates based on both external and internal user feedback. We dogfood our own products, and while consulting with customers, our in-house performance expert [Andy Davies](https://www.linkedin.com/in/andydavies/) is often confronted by the gulf between a customers questions and how he might answer those questions using the data we collect and the visulizations we wrap around it.

It's not always easy. Making data visible doesn't automatically mean it's useful in answering questions about the intersection of web performance and user behaviour.

Three years ago Andy asked me for a feature in the waterfall chart. I added it straight away, and to this day Andy has never discovered or used the feature!

> "Wait, you can do that?" ~ Andy

If Andy uses SpeedCurve everyday, knows it inside out, and still can't stumble across a three-year-old feature, _that's not Andy's problem_. That's a problem with complexity in the user interface and feature discoverability. It's a common problem as software matures and features get layered on top of each other. What started out simple and easy to explore becomes complex and hidden behind a myriad of options.

Today I'm taking a crack at removing some options in the waterfall to reduce complexity and choice while exposing better defaults.

I'm hoping Andy sees the changes this time around and it helps answer more of his questions...

## Trim waterfall to timeline events

![Waterfall trim](https://blog-img.speedcurve.com/img/558/waterfall-trim.png?auto=format,compress&fit=max&w=2000)

You'd be horrified by how many requests we see in some web pages. Thousands! A waterfall that big can be unwieldy to navigate.

When you want to focus in on the critical rendering path and see what might be delaying an event like First Contentful Paint or Largest Contentful Paint, we now let you trim the waterfall to different timeline events. After the waterfall is trimmed, any requests that extend beyond the viewable timeline fade out to the right.

This feature was inspired by the many talks Tammy Everts has given on [focusing on what matters](https://www.youtube.com/watch?v=L6gZp3-7w8c).

## Connection phases & LCP badge

![Waterfall connection phases](https://blog-img.speedcurve.com/img/558/waterfall-lcp.png?auto=format,compress&fit=max&w=2000)

This one is all yours, Andy! For three years, you could toggle the request bars between content type or connection phase in the waterfall options. Now we've collapsed those options into the same view, taking inspiration from Pat Meenan's legendary WebPageTest.

The starting skinny bars shows the connection states of DNS, Connect, and SSL. The fat bar's colour shows the content type with the lighter shade at the beginning indicating time to first byte.

We also badge the request related to Largest Contentful Paint, making it easier to spot a late loading image in the waterfall. If LCP is a text node then the main HTML request will be badged.

## Request headers & server timing

![Waterfall headers](https://blog-img.speedcurve.com/img/558/waterfall-request.png?auto=format,compress&fit=max&w=2000)

Cliff Crocker has been asking for this feature for years. When expanding a waterfall request, we now include tabs showing the raw headers. If you have any [server timing headers](https://www.speedcurve.com/blog/server-timing-time-to-first-byte), we yank them out into their own tab, making them easier to scan. You can really get deep into each request and diagnose exactly what the root cause of a performance issue is. No excuses.

## What's missing for you?

The interactive waterfall is one of the first components I designed and built over a decade ago (don't look at the source, it's embarrassing) and it's surprising how long it can take to cycle back around and iterate on designs. To be honest, it still needs a full redesign and rebuild in something like [WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu). But small improvements add up and the waterfall chart has always been the workhorse of any web performance enthusiast. It deserves more attention. 

What small tweaks would make SpeedCurve more delightful and useful for you? [Let us know.](mailto:support@speedcurve.com)

[![](https://blog-img.speedcurve.com/img/558/customer-logos-free-trial-banner.png?auto=format,compress&fit=max&w=2000)](https://www.speedcurve.com/signup/?utm_source=blog&utm_medium=blog&utm_campaign=blog-trials)