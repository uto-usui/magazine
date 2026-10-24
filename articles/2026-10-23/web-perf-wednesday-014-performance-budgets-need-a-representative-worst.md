---
title: "Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst"
source: "https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/"
publishedDate: "2026-10-21"
category: "css"
feedName: "CSS Wizardry"
---

21 October, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-10-21-web-perf-wednesday-014-performance-budgets-need-a-representative-worst.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Performance Budgets Need a Representative Worst](#performance-budgets-need-a-representative-worst)
2.  [Safari Blocks Identity-Resolution Infrastructure](#safari-blocks-identity-resolution-infrastructure)
3.  [Chrome 156 Lets Failed Modules Retry](#chrome-156-lets-failed-modules-retry)
4.  [DevTools Finds Retained Closure Variables](#devtools-finds-retained-closure-variables)
5.  [Need Help Setting Better Performance Budgets?](#need-help-setting-better-performance-budgets)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

Plenty has changed since last week, although the most useful development is a correction to some of my own long-standing advice. A single anomalous result can make a performance budget so generous that a serious regression still passes, so the better starting point is a representative worst such as P90 or P95. Elsewhere, Safari is blocking identity-resolution infrastructure, Chrome 156 can retry failed module loads, and DevTools can point directly to unused closure variables that are retaining memory.

## Performance Budgets Need a Representative Worst

I’ve made a substantial update to [Web Performance Budgets, Pragmatically](https://csswizardry.com/2020/01/performance-budgets-pragmatically/). The original advice was to take the worst result from a recent period and make that the initial budget. It was simple, defensible, and much easier than inventing a target with no idea whether a team could meet it.

Olga Loboda spotted the problem: the single worst result may be an outlier. If Largest Contentful Paint (LCP) usually sits around 2.2 seconds but reaches 7.1 seconds once, a 7.1-second budget would allow the site to become dramatically slower without failing. The threshold would be technically attainable and practically useless.

The revised approach uses a **representative worst**, perhaps the 90th or 95th percentile of the recent time series. For a dashboard that records daily P75 LCP, that could mean calculating P90 across those daily P75 values. This isn’t changing the percentile used to assess Core Web Vitals; it is choosing a robust point from the sequence of measurements used to set the budget.

I’ve also published [a simple Google Sheet template](https://docs.google.com/spreadsheets/d/1cxLuF1TKxPd_32xbF4IUfmMUDytOFcLYInxr-kCE7b8/edit?usp=sharing) that calculates the mean, median, P75, P90, P95, and P99, and suggests P90 as a starting point. The recommendation still needs judgement. Use enough data to cover the ordinary variation in releases, traffic, and test conditions, and keep unlike populations separate. A synthetic mobile test, desktop RUM, and a third-party request count shouldn’t be combined merely because they share a dashboard.

The wider principle remains the same: a performance budget is a safeguard. It records how bad we’re currently prepared to let a chosen metric become; as the site improves, the budget can come down with it. If the metric regresses, the budget stays put while the team investigates. Increasing the threshold simply to make the check pass removes the protection it was meant to provide.

The source data should also match the place where the budget will be enforced. If a CI check runs one fixed synthetic profile, establish its threshold from that profile’s history. If a product team acts on field data, define the device, geography, page type, and percentile that the alert represents. A plausible number from the wrong population will produce plausible-looking false alarms.

Teams should recalculate the candidate value on a regular cadence, but changes should still be reviewed rather than applied automatically. Check whether a new value comes from an improvement, a population change, missing data, or a different test setup. A [performance-budget review](https://csswizardry.com/consultancy/) can then turn that evidence into thresholds that are strict enough to catch regressions and stable enough that people don’t learn to ignore them.

## Safari Blocks Identity-Resolution Infrastructure

[WebKit now says](https://webkit.org/blog/18438/blocking-identity-resolution-infrastructure/) that Safari in iOS, iPadOS, macOS, and visionOS 27 blocks network access to identity-resolution infrastructure at the domain level. These services can send an email address to a third party and return an opaque identifier that is later used for matching and targeting across sites and devices.

For teams using this class of service, Safari can now change attribution, audience matching, and the shape of a network waterfall without any site release. Identify the affected vendors and requests, then compare Safari with other browsers before explaining a fall in matches or bytes as a product or performance change. A [third-party performance audit](https://csswizardry.com/performance-audits/) should account for blocked work as well as work the page still executes.

## Chrome 156 Lets Failed Modules Retry

[Chrome 156 reached the stable channel](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html) on 20 October. Its [module-loading change](https://chromestatus.com/release-notes/156) stops caching failed module loads, so calling `import()` again can make a genuine retry instead of immediately returning the earlier failure.

This gives applications a better recovery path on unreliable connections, particularly when a route or feature is loaded on demand. Retrying still needs to be bounded: record the first failure, wait before trying again, and report whether recovery succeeded. A tight retry loop can replace one failed request with repeated network and main-thread work. It is worth adding the failure and recovery path to a [team workshop](https://csswizardry.com/workshops/), rather than testing only the successful load.

## DevTools Finds Retained Closure Variables

The latest [Chrome DevTools update](https://developer.chrome.com/blog/new-in-devtools-november-2026/) can detect unused closure variables retained in shared V8 execution contexts. The Memory panel correlates closures with their `Context` objects, highlights fields that no live closure accesses, and sorts them by memory impact.

That makes a common heap-snapshot problem much easier to investigate. A value can be unreachable from the code path you care about yet remain in memory because a long-lived sibling closure retains the shared context. In an SPA, repeat the same route or interaction before taking the snapshot; the retained fields that grow with each pass are far more useful than a large heap viewed in isolation. DevTools now provides a much better place to start that comparison.

## Need Help Setting Better Performance Budgets?

If one outlier determines your current budget, or every alert prompts an argument about whether the threshold was sensible, I can help choose a representative period, separate incompatible populations, and turn the result into a safeguard your team will trust. We can also connect the budget to the trace, RUM segment, or release evidence needed to investigate a failure.

You don’t need a finished measurement strategy. A chart export, a handful of recent results, or one alert that keeps firing without leading anywhere is enough to begin. If you’d like a second pair of eyes on it, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/)
2.  [Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/)
3.  [Web-Perf Wednesday 012 – Return to the Unresolved Trace](https://csswizardry.com/2026/10/web-perf-wednesday-012-return-to-the-unresolved-trace/)
4.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
5.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
6.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
7.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
8.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
9.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
10.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
11.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
12.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
13.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
14.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: