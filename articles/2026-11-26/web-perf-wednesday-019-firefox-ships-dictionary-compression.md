---
title: "Web-Perf Wednesday 019 – Firefox Ships Dictionary Compression"
source: "https://csswizardry.com/2026/11/web-perf-wednesday-019-firefox-ships-dictionary-compression/"
publishedDate: "2026-11-25"
category: "css"
feedName: "CSS Wizardry"
---

25 November, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-11-25-web-perf-wednesday-019-firefox-ships-dictionary-compression.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Firefox Ships Compression Dictionary Transport](#firefox-ships-compression-dictionary-transport)
2.  [Prebid Corrects DOM Viewability Measurements](#prebid-corrects-dom-viewability-measurements)
3.  [WebKit Caps Memory for Huge `will-change` Layers](#webkit-caps-memory-for-huge-will-change-layers)
4.  [WPE Starts Throttling Hidden Views](#wpe-starts-throttling-hidden-views)
5.  [Need Help Testing Dictionary Compression?](#need-help-testing-dictionary-compression)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

Plenty has changed since last week, with one browser capability worth putting through a controlled trial. Firefox 161 now supports Compression Dictionary Transport, which can make repeat downloads far smaller when one version of a resource closely resembles the next. Prebid has corrected its DOM viewability fallback, WebKit is capping memory used by enormous `will-change` layers, and WPE has enabled hidden-view throttling. Dictionary compression is the lead because it can reduce both transfer time and bandwidth, but only if the whole delivery chain agrees on how to serve it.

## Firefox Ships Compression Dictionary Transport

[Firefox 161 was released on 24 November](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/161) with support for Compression Dictionary Transport. The idea is wonderfully practical: if a browser already has one version of a JavaScript, CSS, WebAssembly, or HTML resource, the server can use that resource as a dictionary and send mainly what changed in the next version.

The first response declares itself usable as a dictionary with `Use-As-Dictionary`. When the browser later requests a matching resource, it sends the dictionary’s hash in `Available-Dictionary` and advertises `dcb` (Brotli) or `dcz` (Zstandard). The server can then return a response compressed against the bytes the browser already holds. If no suitable dictionary exists, ordinary Brotli, Zstandard, or gzip still works as before.

The potential saving is large because bundles often change much less than their filenames suggest. In the project’s [published example tests](https://github.com/WICG/compression-dictionary-transport/blob/main/examples.md), a week-over-week YouTube player bundle was 90% smaller than the same file compressed with Brotli alone; an older CNN React bundle was 63% smaller. Those tests used specific historical resources, so they are a reason to measure your own releases rather than a forecast for every bundle.

The best candidates are therefore not every asset. Look for large files with frequent releases, high repeat traffic, and a small change set between versions. A one-off campaign bundle or a file rebuilt from scratch each time gives the browser much less to reuse. The deployment cadence and cache lifetime also need to overlap long enough for yesterday’s bytes to remain useful.

This only helps visitors who already have a useful dictionary. It also asks more of the delivery setup than switching on another content encoding. The [IETF standard](https://www.rfc-editor.org/rfc/rfc9842) requires secure contexts, and the browser’s dictionary is tied to the response’s cache freshness. MDN’s [implementation guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression_dictionary_transport) notes that `no-store`, `no-cache`, and `max-age=0, must-revalidate` prevent a response from being used as a dictionary. Cacheable responses must also vary on `Accept-Encoding` and `Available-Dictionary`, while cross-origin resources need the appropriate CORS response.

Browser support is still limited, and MDN labels the feature experimental, so this is a progressive enhancement rather than a new dependency. Start with one large, frequently updated, same-origin asset whose consecutive versions retain plenty of identical code. Generate dictionary-compressed variants during the build, preserve the normal compressed response, and confirm that your CDN keys and forwards the new request headers correctly. Then compare repeat-view transfer sizes and timings on a representative connection. A [delivery and cache review](https://csswizardry.com/consultancy/) can help work out whether it still saves enough bytes once the build system, CDN, browser cache, and release cadence all have their say.

## Prebid Corrects DOM Viewability Measurements

[Prebid 11.53.0](https://github.com/prebid/Prebid.js/releases/tag/11.53.0) fixes its DOM-based viewability fallback. The previous code could reject a visible descendant, mishandle clipping on one axis, or miss clipping and opacity across shadow roots. It could also treat an element detached from the document as though it sat at the top-left of the viewport.

The [fix and its regression cases](https://github.com/prebid/Prebid.js/pull/16278) are a useful warning for publishers comparing viewability around an upgrade: a change in the number may come from corrected geometry rather than a different advert or layout. Test representative placements with overflow, shadow DOM, collapsed slots, and hidden ancestors before using the new result in a commercial report.

## WebKit Caps Memory for Huge `will-change` Layers

[Safari Technology Preview 257](https://webkit.org/blog/18652/release-notes-for-safari-technology-preview-257/) limits the compositing layers created for elements with `will-change` that cover a very large area, fixing high memory use. The release also fixes stuttering scrolling on 60 Hz Mac displays and slow rendering on gradient-heavy pages affected by Adaptive Dark Mode filters.

This is preview software, but it gives teams a good regression target now. Capture memory and scrolling on pages with full-viewport or long-lived `will-change` declarations, then remove declarations that no longer precede an actual animation. A [performance audit](https://csswizardry.com/performance-audits/) should still find the source of excess layers; the browser’s new limit is a safety net, and it doesn’t make unnecessary layer promotion free.

WebKit’s WPE port now [suspends CSS animations and throttles DOM timers](https://blogs.igalia.com/webkit/blog/2026/wip-87/) when a view is hidden, matching the behaviour already enabled for GTK and Cocoa. WPEPlatform already knows whether a view is mapped, so the [underlying change](https://commits.webkit.org/327010@main) uses that state to stop hidden content running at full pace.

For embedded products with several web views, that should reduce wasted CPU when only one view is visible. Test the transition in both directions: hide a view, watch its timers and animations slow or stop, then reveal it and confirm that time-sensitive state recovers correctly. The change is in WebKit’s main branch, so embedders should check the version they actually ship before relying on it.

## Need Help Testing Dictionary Compression?

Compression Dictionary Transport is most promising where large resources change often but keep most of their contents. I can help identify those assets, check the cache headers and CDN behaviour around them, and design a pilot that compares ordinary compression with `dcb` or `dcz` on repeat visits. We can also make sure unsupported browsers continue receiving the normal compressed response.

You don’t need to redesign the whole asset pipeline to find out whether this is worth pursuing. One versioned bundle, two representative releases, and a CDN configuration are enough to begin. If you’d like a second pair of eyes on the opportunity, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 019 – Firefox Ships Dictionary Compression](https://csswizardry.com/2026/11/web-perf-wednesday-019-firefox-ships-dictionary-compression/)
2.  [Web-Perf Wednesday 018 – Soft Navigations Lift the CrUX Pass Rate](https://csswizardry.com/2026/11/web-perf-wednesday-018-soft-navigations-lift-the-crux-pass-rate/)
3.  [Web-Perf Wednesday 017 – Prebid Stops Re-downloading Its Manifest](https://csswizardry.com/2026/11/web-perf-wednesday-017-prebid-stops-redownloading-its-manifest/)
4.  [Web-Perf Wednesday 016 – Lighthouse 13.6 Can Lift Scores Without a Faster Site](https://csswizardry.com/2026/11/web-perf-wednesday-016-lighthouse-13-6-can-lift-scores-without-a-faster-site/)
5.  [Web-Perf Wednesday 015 – Failed Modulepreloads Need to Recover](https://csswizardry.com/2026/10/web-perf-wednesday-015-failed-modulepreloads-need-to-recover/)
6.  [Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/)
7.  [Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/)
8.  [Web-Perf Wednesday 012 – Return to the Unresolved Trace](https://csswizardry.com/2026/10/web-perf-wednesday-012-return-to-the-unresolved-trace/)
9.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
10.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
11.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
12.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
13.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
14.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
15.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
16.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
17.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
18.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
19.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: