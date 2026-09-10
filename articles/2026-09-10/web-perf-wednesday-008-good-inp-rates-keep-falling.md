---
title: "Web-Perf Wednesday 008 – Good INP Rates Keep Falling"
source: "https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/"
publishedDate: "2026-09-09"
category: "css"
feedName: "CSS Wizardry"
---

9 September, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-09-09-web-perf-wednesday-008-good-inp-rates-keep-falling.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Good INP Rates Keep Falling](#good-inp-rates-keep-falling)
2.  [Chrome Can Explain Gaps Between JavaScript Stacks](#chrome-can-explain-gaps-between-javascript-stacks)
3.  [Safari Rebuilt Its Module Loader](#safari-rebuilt-its-module-loader)
4.  [Chrome’s Two-Week Cycle Is Now Live](#chromes-two-week-cycle-is-now-live)
5.  [Need Help Explaining an INP Regression?](#need-help-explaining-an-inp-regression)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

There’s been plenty of movement since last week, although the most useful news is a result without a tidy explanation. The latest Chrome UX Report (CrUX) shows another fall in the share of origins with good Interaction to Next Paint (INP), and Chrome itself says the continuing regression is cause for concern. Chrome has also refined its JavaScript Self-Profiling trial, Safari has rebuilt its module loader, and Chrome’s fortnightly releases are now live. Teams should explain their own INP before treating the wider trend as the cause.

## Good INP Rates Keep Falling

The [August 2026 CrUX release](https://developer.chrome.com/docs/crux/release-notes/) puts the share of origins with good INP at 85.3%, down from 85.7% in July. Good Largest Contentful Paint (LCP) fell from 68.3% to 68.1%, Cumulative Layout Shift (CLS) was effectively flat at 81.5%, and the proportion of origins passing all three Core Web Vitals edged down from 55.7% to 55.6%.

The INP movement is the important one. The published good-INP figure has fallen with every monthly dataset since March, from 87.2% then to 85.3% now. Chrome’s release note calls the continued regression concerning and, usefully, says there isn’t yet a definitive reason for it. That uncertainty should set the tone for how teams read their own charts.

CrUX measures a broad population; it doesn’t diagnose any one website. Its [API reports a rolling 28-day average of aggregated metrics](https://developer.chrome.com/docs/crux/api/), while the monthly BigQuery release combines eligible experiences across millions of origins. The latest dataset also contains 1.3% more origins than July. A global decline can reflect changes in sites, browsers, devices, traffic, eligibility, or some mixture of them; it doesn’t tell us which of those moved a particular product.

If your own INP worsened during August, start with the evidence closest to the user. Compare route, interaction, device class, browser version, application release, tag-manager change, and consent state. Check sample and completion counts before trusting a thin segment, and compare distributions as well as the p75. A [RUM strategy](https://csswizardry.com/consultancy/) should preserve enough of that context to separate a broadly shared change from a slow interaction introduced by one journey or release.

CrUX and RUM also answer different questions. CrUX is valuable for confirming that eligible Chrome users experienced a problem at an origin or URL; your own instrumentation can name the interaction, route, component, and code involved. The `web-vitals` attribution build and Long Animation Frames data can help [identify slow interactions in the field](https://web.dev/articles/find-slow-interactions-in-the-field), including whether input delay, event processing, or presentation delay dominated the result and which scripts contributed.

Treat the new CrUX figure as a reason to investigate, and as useful context when several sites move together. It doesn’t establish a cause. The most useful analysis will show whether your regression follows the wider pattern, where it diverges, and which evidence would change the next decision.

## Chrome Can Explain Gaps Between JavaScript Stacks

[Chrome 153 adds markers to the JavaScript Self-Profiling API’s origin trial](https://developer.chrome.com/release-notes/153). Each captured sample can now identify browser activity such as script, garbage collection, style, layout, or paint. That makes gaps between JavaScript stacks less mysterious: time without an application frame may still be expensive browser work.

This is an experimental, opt-in signal, so it belongs in a focused [performance investigation](https://csswizardry.com/performance-audits/) before it belongs on a shared KPI dashboard. Use it on an interaction whose delay is already visible, then compare the samples with a trace. The marker narrows the search; it doesn’t identify the responsible component or make a causal claim by itself.

## Safari Rebuilt Its Module Loader

WebKit has [rewritten Safari’s module loader](https://webkit.org/blog/18227/fixing-top-level-await-in-safari/) to fix longstanding top-level `await` ordering and initialisation errors. The old loader was a self-hosted JavaScript built-in based on an abandoned loader proposal; the replacement follows the current ECMAScript algorithms in native C++, which WebKit says also makes startup performance more stable and predictable.

The implementation is available for testing in Safari Technology Preview 251 and Safari 27 beta; Safari 27 is not yet stable. Applications with async module graphs should test repeated dynamic imports, failed loads, and dependency ordering now. The main benefit is correctness, while removing runtime compilation from a cold module path is a worthwhile performance detail to watch in representative journeys.

## Chrome’s Two-Week Cycle Is Now Live

The release change covered in [edition 006](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/) has now taken effect. [Chrome 153 began rolling out on 8 September](https://developer.chrome.com/blog/chrome-two-week-start), starting Chrome’s two-week Stable cycle on desktop, Android, and iOS; Chrome 154 is already in Beta and is scheduled for Stable on 22 September.

Teams now need to operationalise the release annotations, Beta checks, and browser-version segments they planned. Confirm that dashboards can distinguish regular and Extended Stable populations, and give the [team testing the real journeys](https://csswizardry.com/workshops/) enough lead time to find instrumentation changes before each Stable rollout reaches field data.

## Need Help Explaining an INP Regression?

If INP has moved and the obvious explanations don’t survive contact with the data, I can help connect CrUX, RUM, traces, releases, and third-party changes into one investigation. We can identify the interactions and populations that actually changed, add the attribution your current instrumentation is missing, and decide whether the result needs an engineering fix, a measurement fix, or more evidence.

You don’t need to arrive with a complete diagnosis. A CrUX dip, an awkward RUM distribution, or a trace that doesn’t quite explain the user’s wait is enough to begin. If you’d like a second pair of eyes on it, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
2.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
3.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
4.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
5.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
6.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
7.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
8.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

## Tagged With…