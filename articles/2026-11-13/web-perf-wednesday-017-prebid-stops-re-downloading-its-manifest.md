---
title: "Web-Perf Wednesday 017 – Prebid Stops Re-downloading Its Manifest"
source: "https://csswizardry.com/2026/11/web-perf-wednesday-017-prebid-stops-redownloading-its-manifest/"
publishedDate: "2026-11-11"
category: "css"
feedName: "CSS Wizardry"
---

11 November, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-11-11-web-perf-wednesday-017-prebid-stops-redownloading-its-manifest.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Prebid Stops Re-downloading Its Manifest](#prebid-stops-re-downloading-its-manifest)
2.  [Prebid Now Clears Out User-Sync Iframes](#prebid-now-clears-out-user-sync-iframes)
3.  [Renderer Failures Become Visible and Retryable](#renderer-failures-become-visible-and-retryable)
4.  [Safari Makes Idle Work Less Likely to Miss a Frame](#safari-makes-idle-work-less-likely-to-miss-a-frame)
5.  [Need Help Finding Third-Party Waste?](#need-help-finding-third-party-waste)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

This has been a busier week for small, practical improvements than for sweeping browser releases. The strongest comes from Prebid.js, where two small-looking loader decisions had made browsers repeat avoidable work on every page view. Version 11.48 fixes both, and the result is a good reminder for any site that depends on advertising code: the machinery around a third party can be substantial in its own right, so it deserves the same scrutiny as the bundle you deliberately shipped.

## Prebid Stops Re-downloading Its Manifest

[Prebid 11.48](https://github.com/prebid/Prebid.js/releases/tag/11.48.0) changes the relatively new jsDelivr web bundler, which lets publishers assemble Prebid in the browser by naming the modules they need in a `bundle.js` URL. The loader fetches a manifest, works out the dependencies, verifies their checksums, and then loads the required files.

Until now, that manifest carried a randomly generated callback name in its query string. Every page view therefore requested a different URL, so the browser could not reuse the response even though jsDelivr served it as immutable with a one-year cache lifetime. For Prebid 11.46, the manifest was 169 KB uncompressed or 67 KB over the wire with Brotli. The [merged change records](https://github.com/prebid/Prebid.js/pull/16115) that a typical module set was 89 KB compressed with gzip, which puts the supposedly supporting file uncomfortably close to the advertising code it described.

Prebid 11.48 removes the changing query string. A repeat view can now reuse `manifest.js` from the browser cache, and the project’s test saw one manifest request across two page loads instead of two. The first visit still downloads the file, and a new pinned Prebid version has a new URL, so this is not 67 KB magically removed from every load. It is repeat work that the browser can finally avoid.

The release also splits out checksums for module disclosure metadata. In 11.46, 747 of the manifest’s 1,642 checksums described `.metadata.js` files used only when the `storageControl` module was requested. Sites that do not use that module no longer receive those checksums; sites that do need them fetch the separate metadata manifest alongside the main one.

This only affects sites using Prebid’s [jsDelivr `bundle.js` loader](https://docs.prebid.org/download.html#option-3-load-from-the-jsdelivr-cdn), introduced in 11.40. A downloaded custom build, an npm bundle, or another integration does not inherit this particular saving. Check the page source or waterfall for `/prebid.js@.../dist/bundle.js`, then compare a first and repeat navigation with DevTools’ _Disable cache_ option left off. After upgrading, `manifest.js` should transfer on the first view and come from cache afterwards.

Advertising code tends to run early, touch many partners, and sit close to revenue, which makes casual upgrades a bad idea. Test bidding and consent behaviour as well as bytes, but do put 11.48 on the upgrade list if this loader is in use. A [third-party performance review](https://csswizardry.com/consultancy/) should account for the bootstrapping code around the auction, not stop at the familiar bidder scripts.

## Prebid Now Clears Out User-Sync Iframes

The preceding [Prebid 11.47 release](https://github.com/prebid/Prebid.js/releases/tag/11.47.0) also removes user-sync iframes automatically, 15 seconds after insertion by default. The change was prompted by one measured sync hub growing into 450–1,000 nested frames from roughly 174 hosts within 25 seconds. Those frames consume memory and main-thread time, and they previously remained in the document.

The delay is configurable, and automatic removal can be disabled, so publishers should test identifier matching and revenue rather than assume the default fits every setup. On long-lived pages, compare frame counts, memory, and CPU after the initial auction; a [performance audit](https://csswizardry.com/performance-audits/) can also show whether the cleanup changes responsiveness after the ads have settled.

## Renderer Failures Become Visible and Retryable

Prebid 11.48 also [stops caching failed renderer-script loads](https://github.com/prebid/Prebid.js/pull/15994), allowing a later attempt to retry instead of inheriting the original failure. It now emits `adRenderFailed` when the script cannot load or its `render()` method throws, and `adRenderSucceeded` when rendering completes.

That is operationally useful. A winning bid followed by a broken renderer is not the same as no demand, yet a dashboard may make both look like an empty ad slot unless the failure is recorded. Feed those events into existing telemetry, separate network and render errors, and watch the rate through the upgrade. [Ongoing technical guidance](https://csswizardry.com/mentoring/) can help turn that signal into an owner, a threshold, and a response rather than one more event nobody checks.

## Safari Makes Idle Work Less Likely to Miss a Frame

[Safari Technology Preview 256](https://webkit.org/blog/18602/release-notes-for-safari-technology-preview-256/) fixes `requestIdleCallback()` scheduling so WebKit uses the actual 60 Hz frame period instead of offering an idle period just before the frame deadline. It also caches `document.querySelector()` results, avoids unnecessary style invalidation when scroll-driven animation timing has not changed, and fixes slow repaints and long hangs involving many CSS Custom Highlights.

These are preview fixes, not a promise about the Safari version your visitors have today. If an editor, search interface, or animation-heavy page exercises the affected code, reproduce it in the preview and keep the trace. A focused [team workshop](https://csswizardry.com/workshops/) can use that comparison to distinguish browser work already fixed upstream from application work the team still owns.

## Need Help Finding Third-Party Waste?

Third-party performance problems often hide in loaders, manifests, sync frames, and failure handling rather than the headline script. I can help map that whole chain, measure its cost on first and repeat visits, and work out which change is safe without accidentally disrupting consent, advertising, or revenue.

You do not need a finished diagnosis. A heavy waterfall, an ad slot that fails intermittently, or a page that gets slower the longer it remains open is enough to begin. If you would like a second pair of eyes on it, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 017 – Prebid Stops Re-downloading Its Manifest](https://csswizardry.com/2026/11/web-perf-wednesday-017-prebid-stops-redownloading-its-manifest/)
2.  [Web-Perf Wednesday 016 – Lighthouse 13.6 Can Lift Scores Without a Faster Site](https://csswizardry.com/2026/11/web-perf-wednesday-016-lighthouse-13-6-can-lift-scores-without-a-faster-site/)
3.  [Web-Perf Wednesday 015 – Failed Modulepreloads Need to Recover](https://csswizardry.com/2026/10/web-perf-wednesday-015-failed-modulepreloads-need-to-recover/)
4.  [Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/)
5.  [Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/)
6.  [Web-Perf Wednesday 012 – Return to the Unresolved Trace](https://csswizardry.com/2026/10/web-perf-wednesday-012-return-to-the-unresolved-trace/)
7.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
8.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
9.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
10.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
11.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
12.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
13.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
14.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
15.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
16.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
17.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: