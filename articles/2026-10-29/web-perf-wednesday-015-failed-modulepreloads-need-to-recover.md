---
title: "Web-Perf Wednesday 015 – Failed Modulepreloads Need to Recover"
source: "https://csswizardry.com/2026/10/web-perf-wednesday-015-failed-modulepreloads-need-to-recover/"
publishedDate: "2026-10-28"
category: "css"
feedName: "CSS Wizardry"
---

28 October, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-10-28-web-perf-wednesday-015-failed-modulepreloads-need-to-recover.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Failed Modulepreloads Need to Recover](#failed-modulepreloads-need-to-recover)
2.  [Safari Corrects Throttled Response Timings](#safari-corrects-throttled-response-timings)
3.  [Firefox 159 Stops WebDriver Polling Leaks](#firefox-159-stops-webdriver-polling-leaks)
4.  [Firefox Opens PDFs Faster](#firefox-opens-pdfs-faster)
5.  [Need Help Testing Failure and Recovery?](#need-help-testing-failure-and-recovery)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

This week brought one browser fix worth understanding and several smaller tooling improvements, rather than any wholesale change to web performance. WebKit has corrected a failure path where a broken module preload could stop a later import from reaching the network at all. Elsewhere, Safari Technology Preview now reports throttled response timings correctly, Firefox 159 fixes a WebDriver memory leak, and Mozilla says its built-in PDF viewer starts up to 45% faster.

## Failed Modulepreloads Need to Recover

Safari Technology Preview 255 fixes a subtle but nasty problem with failed [`modulepreload`](https://webkit.org/blog/18482/release-notes-for-safari-technology-preview-255/) requests. When the early request failed, WebKit could leave the resource marked as preloaded in its memory cache. A later `import()` of the same URL then reused that failed entry and rejected without making another network request.

This matters because `modulepreload` is meant to do more than download a file. The [HTML standard](https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload) defines it as a specialised preload for module scripts: the browser fetches the module using the correct module semantics and places the result into the document’s module map, ready for later evaluation. It is especially useful for route chunks and features that will eventually be loaded with `import()`.

The failure case turned that optimisation into a trap. A temporary 404, a brief CDN problem, or an interrupted request could fail the preload; once the resource became available again, the application still had no clean way back because WebKit took a cache shortcut before checking the earlier error.

The [WebKit change](https://commits.webkit.org/323305@main) moves that error check ahead of the preload shortcuts. A failed preloaded resource is reloaded, so the next import can make a real request and succeed. The accompanying test deliberately fails the first request and then serves the module successfully, which is exactly the recovery path applications should test themselves.

For now, this is in Safari Technology Preview 255; the release notes do not say that it has reached stable Safari. That makes the fix something to verify, rather than permission to remove existing recovery code.

If your bundler emits module preloads for split chunks, add a failure test to the deployment pipeline. Make the first request for a route chunk fail, restore the resource, and check whether a later import or reload actually sends another request. Capture the import rejection and the network request separately: an error event tells you that loading failed, while the second request proves that recovery was attempted.

This is also worth checking at the CDN and service-worker layers. A browser fix cannot help if an intermediary keeps serving the same bad response, or if the application turns one rejected import into an immediate retry loop. A [performance audit](https://csswizardry.com/performance-audits/) should exercise the unhappy path as well as confirm that preloading improves the successful one.

Hashed chunk names help with deployment mismatches, but they do not solve this case. The URL can be correct and the file can become available moments after a temporary failure; the browser still needs to request that same URL again. Adding a random query string would create a different module-map entry and may appear to fix the symptom, but it also changes the request that the application was meant to recover. Test the original URL, use a bounded retry with a delay, and make sure the interface gives the user a useful way to try again.

## Safari Corrects Throttled Response Timings

The same [Safari Technology Preview release](https://webkit.org/blog/18482/release-notes-for-safari-technology-preview-255/) fixes Web Inspector’s Network tab so that reported response timing now accounts for network throttling. If a throttled request appeared faster than the conditions you had selected, the measurement could send an investigation in the wrong direction even though the page itself had done nothing unusual.

Keep the browser version and throttling profile alongside any lab result, and rerun a suspicious request in Technology Preview before drawing a conclusion from a small timing difference. A [measurement review](https://csswizardry.com/consultancy/) is often as much about checking the instrument as checking the site.

## Firefox 159 Stops WebDriver Polling Leaks

[Firefox 159](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/159) fixes a memory leak in which internal WebDriver polling could continue until shutdown after a command timed out. Mozilla notes that commands including WebDriver BiDi’s `browsingContext.traverseHistory` could be affected.

Long-lived synthetic agents and browser test suites are where this sort of leak becomes expensive and misleading. After updating, compare process memory over several repeated journeys, including one forced timeout. If the browser process keeps growing while the page heap remains steady, investigate the harness before blaming the application. That makes a useful addition to a [team workshop](https://csswizardry.com/workshops/) on repeatable performance testing.

## Firefox Opens PDFs Faster

Mozilla also says Firefox’s built-in PDF viewer now [starts up to 45% faster](https://blog.mozilla.org/en/firefox/firefox-roadmap/) on desktop. It hasn’t published the test conditions in that announcement, so the figure should not be treated as a general browser or page-load improvement.

It is still a useful reminder that browser performance extends beyond HTML pages. For products built around reports, statements, tickets, or technical documents, the time between selecting a PDF and seeing it is part of the user’s journey. Test that journey directly instead of assuming a fast landing page has covered it.

## Need Help Testing Failure and Recovery?

The successful trace is only half the story. I can help work out what happens when a critical chunk, preload, CDN response, service worker, or test command fails once and then recovers, and whether your monitoring can tell a page fault from a browser or tooling fault.

You don’t need a polished reproduction. A rejected import, an odd waterfall, or a test worker whose memory keeps climbing is enough to begin. If you’d like a second pair of eyes on the evidence, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 015 – Failed Modulepreloads Need to Recover](https://csswizardry.com/2026/10/web-perf-wednesday-015-failed-modulepreloads-need-to-recover/)
2.  [Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/)
3.  [Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/)
4.  [Web-Perf Wednesday 012 – Return to the Unresolved Trace](https://csswizardry.com/2026/10/web-perf-wednesday-012-return-to-the-unresolved-trace/)
5.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
6.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
7.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
8.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
9.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
10.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
11.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
12.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
13.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
14.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
15.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: