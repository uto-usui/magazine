---
title: "Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold"
source: "https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/"
publishedDate: "2026-09-30"
category: "css"
feedName: "CSS Wizardry"
---

30 September, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-09-30-web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [SpeedCurve’s INP Observer Missed Its Threshold](#speedcurves-inp-observer-missed-its-threshold)
2.  [lux.js 4.5.3 Contains the Fix](#luxjs-453-contains-the-fix)
3.  [Safari Adds Network Throttling and Performance Fixes](#safari-adds-network-throttling-and-performance-fixes)
4.  [Firefox Cuts WebGPU Attachment Overhead](#firefox-cuts-webgpu-attachment-overhead)
5.  [Need Help Checking Your SpeedCurve Data?](#need-help-checking-your-speedcurve-data)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

This week has been quieter than [last Wednesday](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/), but the lead is exactly the sort of measurement bug worth stopping for. I found that SpeedCurve’s public lux.js code wasn’t passing all of its `PerformanceObserver` options to the browser correctly, which left Event Timing using its default 104 ms threshold. The fix was merged quickly and now appears in an open-source release. Safari Technology Preview and Firefox also shipped smaller changes worth testing. Together, they’re a reminder to test the measurement system as carefully as the site.

## SpeedCurve’s INP Observer Missed Its Threshold

While investigating an odd distribution in SpeedCurve RUM data, I found and [reported a bug in lux.js](https://github.com/SpeedCurve-Metrics/lux.js/issues/85). The library has a small wrapper around `PerformanceObserver` that accepts an entry type, a callback, and any extra observer options. The wrapper was putting those extra options inside a nested `options` property instead of passing them at the top level of the object sent to the browser.

That sounds like a minor object-shape error, but it changes what the browser records. lux.js asks for Event Timing entries with `durationThreshold: 0`; the browser never received that property where it expected it, so it fell back to the [`PerformanceObserver.observe()` default of 104 ms](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observe). Interactions below that threshold weren’t delivered through the ordinary Event Timing observer, which could change the INP value and attribution that SpeedCurve calculated for a page view.

The faulty option forwarding had been there for some time. The wrapper began with the correct spread syntax in March 2023, then [an unrelated change in May 2023](https://github.com/SpeedCurve-Metrics/lux.js/commit/b5adb3e966cf699df5dc2a92c2422cc54be5dcfc) introduced the nested object. lux.js began explicitly requesting a zero threshold for INP in May 2024, but the wrapper still prevented that value from reaching the browser. By the time I reported it, the bad forwarding code had been present for more than three years.

SpeedCurve’s Joseph Wynn opened a patch a little over an hour after the report, and [the fix was merged on 24 September](https://github.com/SpeedCurve-Metrics/lux.js/pull/86). It removes the extra object wrapper so that `durationThreshold`, and any future `PerformanceObserverInit` option, is passed through at the correct level. The patch also adds a browser integration test that checks interactions below 104 ms, which is the right place to catch a Web API wiring problem like this.

For SpeedCurve users, the immediate task is to preserve context. Record the lux.js version alongside the relevant RUM period, annotate the eventual rollout, and compare the shape and attribution of INP before and after it. You can see how I’m recording the lux.js version in [this recent commit](https://github.com/csswizardry/csswizardry.github.com/commit/8181b4d7da105702c8924e13379c93b84edc3341). A change in the distribution may come from the observer seeing interactions that were previously absent rather than from an application deployment. A careful [RUM measurement review](https://csswizardry.com/consultancy/) should establish what the collector could see before anyone uses the graph to judge a release, set a target, or explain a commercial result.

## lux.js 4.5.3 Contains the Fix

[lux.js 4.5.3](https://github.com/SpeedCurve-Metrics/lux.js/releases/tag/v4.5.3) was published early on 30 September, and its tag contains the merged fix. The public release note describes an INP correction that mostly affected soft navigations. That establishes the fix in a published open-source version rather than only on the repository’s main branch.

SpeedCurve’s [public product changelog](https://support.speedcurve.com/changelog) hadn’t officially announced a `4.5.3` rollout at the time of writing, but lists the `4.5.3` release as having addressed the INP bug, and I have successfully observed `4.5.3` being served to my and my client’s audiences, so it looks like it’s on its way out. If you’re planning a before-and-after comparison, confirm the deployed version first and keep the rollout time with the data.

## Safari Adds Network Throttling and Performance Fixes

[Safari Technology Preview 253](https://webkit.org/blog/18357/release-notes-for-safari-technology-preview-253/) adds network throttling to Web Inspector and fixes several browser-side performance problems. WebKit lists excessive CPU and power use from pages with many `IntersectionObserver` targets, multi-second main-thread blocking around shared `scroll-timeline` names, redundant parsing of very long URLs, and unnecessary full-layer repaints among the resolved issues.

These fixes are in Technology Preview, so they don’t describe current stable Safari for every user. They do give teams useful test cases: repeat an expensive Safari journey in 253, use the new network controls to make the conditions reproducible, and check whether the application or the browser owns the work. A [journey-level performance test](https://csswizardry.com/performance-audits/) is far more useful when it records both sides of that comparison.

## Firefox Cuts WebGPU Attachment Overhead

[Firefox 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157) shipped on 29 September with support for WebGPU’s `TRANSIENT_ATTACHMENT` texture usage. It allows render-pass attachments to remain in tile memory, avoiding VRAM traffic and potentially avoiding a VRAM allocation for textures whose contents aren’t needed afterwards.

This is a specialised improvement, but it can be useful for graphics-heavy applications on tile-based GPUs. Teams using WebGPU can now test the transient path in stable Firefox, compare memory and frame behaviour on representative hardware, and keep the existing path until those results justify a change. The release note says the flag _can_ avoid traffic and allocation, so measure the effect on the actual workload rather than treating it as a guaranteed saving.

## Need Help Checking Your SpeedCurve Data?

Once the fixed collector goes live for customers, I’d be very happy to provide a second pair of eyes on an existing SpeedCurve instance. You might want to check whether an INP distribution moved, whether attribution now points somewhere different, or simply whether the data still supports the conclusion the team had already reached.

This invitation is open to any SpeedCurve user, whether we already work together or you’re completely new to me. You don’t need a finished diagnosis; a dashboard, an odd pattern, or a loose question is plenty to begin with. If you’d like me to take a look once the fix reaches the customer SDK, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
2.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
3.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
4.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
5.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
6.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
7.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
8.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
9.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
10.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
11.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: