---
title: "Web-Perf Wednesday 018 – Soft Navigations Lift the CrUX Pass Rate"
source: "https://csswizardry.com/2026/11/web-perf-wednesday-018-soft-navigations-lift-the-crux-pass-rate/"
publishedDate: "2026-11-18"
category: "css"
feedName: "CSS Wizardry"
---

18 November, 2026 in [Web Performance](https://csswizardry.com/blog/category/web-performance/)

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-11-18-web-perf-wednesday-018-soft-navigations-lift-the-crux-pass-rate.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Soft Navigations Lift the CrUX Pass Rate](#soft-navigations-lift-the-crux-pass-rate)
2.  [Firefox Can Name a Failed Navigation’s Destination](#firefox-can-name-a-failed-navigations-destination)
3.  [WPE Android Traces Browser Work Alongside the System](#wpe-android-traces-browser-work-alongside-the-system)
4.  [The EU Proposes New Limits on Personalised Advertising](#the-eu-proposes-new-limits-on-personalised-advertising)
5.  [Need Help Preparing for New Field Data?](#need-help-preparing-for-new-field-data)
    1.  [More Web-Perf Wednesdays](#more-web-perf-wednesdays)

This week has brought one consequential measurement change and three developments worth acting on. The October Chrome UX Report (CrUX) release shows that including soft navigations would raise the share of origins passing all three Core Web Vitals from 56.3% to 60.3%. Firefox is improving navigation failure attribution, WPE Android can expose browser work in Perfetto, and an EU proposal puts fresh scrutiny on personalised advertising. The CrUX change is the one to prepare for now, because a better result can arrive without the site itself becoming faster.

## Soft Navigations Lift the CrUX Pass Rate

The [October 2026 CrUX dataset](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/tjKgLwe7Mos) covers 18,070,207 origins. In the current Core Web Vitals data, 68.8% of origins have good Largest Contentful Paint (LCP), 81.6% have good Cumulative Layout Shift (CLS), 85.2% have good Interaction to Next Paint (INP), and 56.3% pass all three.

When the experimental metrics include Single Page Application (SPA) soft navigations, those figures become 73.6% for LCP, 85.0% for CLS, 87.0% for INP, and 60.3% for all three. The overall pass rate rises by four percentage points, or 7.1% relative to the current figure. That is too large to leave as an unlabelled step in a dashboard.

The result does not mean that SPA sites have just become quicker. As I covered when [CrUX introduced the experimental series](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/), it is counting more of the journey and dividing a long-lived document into the views that users recognise as separate pages. Follow-up views often reuse resources and application state from the initial load; CLS and INP also get assessed within each recognised navigation rather than accumulating across the whole session. The experimental population therefore answers a different question from the hard-navigation-only series.

This month’s release makes that difference easier to diagnose. The [CrUX APIs](https://developer.chrome.com/docs/crux/api) now expose `experimental_first_contentful_paint_with_softnavs` and `experimental_navigation_types_with_softnavs`, while CrUX Vis has added the same views. First Contentful Paint (FCP) gives teams another paint milestone to compare, and the navigation-type breakdown can show how much of the population comes from soft navigations. BigQuery is due to receive these two additions in the next monthly release.

Google currently [aims to graduate the experimental metrics](https://web.dev/blog/crux-experimental-soft-navs/) in May 2027, subject to feedback, after which Search Console is expected to use them. The existing series remains the reported Core Web Vitals data for now, so this is a comparison period rather than a reason to change every target today.

Pull both series for the same URLs and form factors, record the size and direction of the difference, and find the routes that account for it. Then check whether your RUM provider recognises the same navigations. Keep the metric name, population, browser support, and planned change date close to the result; a [field-data review](https://csswizardry.com/consultancy/) can help connect those details to the journeys your business actually cares about. If the number moves in May, everyone can then tell whether the site changed or the measurement did.

## Firefox Can Name a Failed Navigation’s Destination

[Firefox 161’s beta notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/161) add support for `NavigationTransition.to`. Code outside the `navigate` event handler can now inspect the `NavigationDestination` for a transition that is still in progress, including from a `navigateerror` handler.

For SPAs, that makes failed route changes easier to attribute to the URL the user was trying to reach. Record the destination, failure, and relevant timing together, while keeping sensitive URL data out of telemetry. Firefox 161 is scheduled to ship on 24 November, and the notes are still being completed, so test the beta before making this field part of a required reporting path.

## WPE Android Traces Browser Work Alongside the System

The Igalia WebKit team has [added an ATrace backend](https://blogs.igalia.com/webkit/blog/2026/wip-86/) to WPE Android. WebKit trace points and signposts that previously compiled to nothing can now appear in the same Perfetto timeline as SurfaceFlinger, input dispatch, and the Android scheduler; WPE also calculates its compositor FPS counter while tracing is active.

That gives teams building embedded Android web surfaces a much better way to separate browser work from compositor, input, and scheduling delays. The build option is enabled by default for Android, but the useful step is still to capture a slow interaction on representative hardware and follow the work across processes. A [performance audit](https://csswizardry.com/performance-audits/) can then target the component that actually held up the frame.

## The EU Proposes New Limits on Personalised Advertising

The European Commission has proposed a [Digital Fairness Act](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_26_2407/IP_26_2407_EN.pdf) that would restrict unfair personalised adverts and prices aimed at minors or using sensitive data. It would also ban certain manipulative marketing tactics and strengthen enforcement, but it is a proposal: the European Parliament and Council still need to discuss it.

Performance teams should treat this as a prompt to map personalisation code before the legal text settles. List which tags choose adverts or prices, which data they use, when they run, and what they cost in bytes, CPU, and latency. That joint view lets legal, advertising, and engineering teams change or remove a tag deliberately if the eventual rules narrow its permitted use, rather than discovering an undocumented dependency during implementation.

## Need Help Preparing for New Field Data?

If soft navigations change your CrUX results, I can help compare the current and experimental populations, find the routes behind the movement, and check whether your RUM dashboards measure the same journey. We can also annotate the change now, before an apparent improvement reaches a stakeholder report with the wrong explanation.

You don’t need a finished migration plan. One CrUX URL, an unexpected gap between two charts, or a route your current RUM setup can’t explain is enough to begin. If you’d like a second pair of eyes on it, [get in touch](https://csswizardry.com/contact/).

### More Web-Perf Wednesdays

1.  [Web-Perf Wednesday 018 – Soft Navigations Lift the CrUX Pass Rate](https://csswizardry.com/2026/11/web-perf-wednesday-018-soft-navigations-lift-the-crux-pass-rate/)
2.  [Web-Perf Wednesday 017 – Prebid Stops Re-downloading Its Manifest](https://csswizardry.com/2026/11/web-perf-wednesday-017-prebid-stops-redownloading-its-manifest/)
3.  [Web-Perf Wednesday 016 – Lighthouse 13.6 Can Lift Scores Without a Faster Site](https://csswizardry.com/2026/11/web-perf-wednesday-016-lighthouse-13-6-can-lift-scores-without-a-faster-site/)
4.  [Web-Perf Wednesday 015 – Failed Modulepreloads Need to Recover](https://csswizardry.com/2026/10/web-perf-wednesday-015-failed-modulepreloads-need-to-recover/)
5.  [Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst](https://csswizardry.com/2026/10/web-perf-wednesday-014-performance-budgets-need-a-representative-worst/)
6.  [Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals](https://csswizardry.com/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/)
7.  [Web-Perf Wednesday 012 – Return to the Unresolved Trace](https://csswizardry.com/2026/10/web-perf-wednesday-012-return-to-the-unresolved-trace/)
8.  [Web-Perf Wednesday 011 – SpeedCurve’s INP Observer Missed Its Threshold](https://csswizardry.com/2026/09/web-perf-wednesday-011-speedcurves-inp-observer-missed-its-threshold/)
9.  [Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place](https://csswizardry.com/2026/09/web-perf-wednesday-010-safari-keeps-scrolled-content-in-place/)
10.  [Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public](https://csswizardry.com/2026/09/web-perf-wednesday-009-crux-makes-ad-weight-public/)
11.  [Web-Perf Wednesday 008 – Good INP Rates Keep Falling](https://csswizardry.com/2026/09/web-perf-wednesday-008-good-inp-rates-keep-falling/)
12.  [Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable](https://csswizardry.com/2026/09/web-perf-wednesday-007-chrome-makes-busy-workers-measurable/)
13.  [Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population](https://csswizardry.com/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/)
14.  [Web-Perf Wednesday 005 – RUM Needs More Than a Percentile](https://csswizardry.com/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
15.  [Web-Perf Wednesday 004 – A Quiet Week Is Time to Investigate](https://csswizardry.com/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/)
16.  [Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived](https://csswizardry.com/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/)
17.  [Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story](https://csswizardry.com/2026/07/web-perf-wednesday-002-the-metrics-dont-tell-the-whole-story/)
18.  [Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable](https://csswizardry.com/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)

* * *

### This Web Performance post is tagged with: