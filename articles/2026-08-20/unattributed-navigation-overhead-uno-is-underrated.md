---
title: "Unattributed Navigation Overhead (UNO) Is Underrated"
source: "https://csswizardry.com/2026/08/uno-is-underrated/"
publishedDate: "2026-08-20"
category: "css"
feedName: "CSS Wizardry"
---

20 August, 2026 • 8 minute read

Written by **Harry Roberts** on **CSS Wizardry**.

[View this page as Markdown.](https://raw.githubusercontent.com/csswizardry/csswizardry.github.com/refs/heads/master/_posts/2026-08-20-uno-is-underrated.md)

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [TTFB’s Missing Time](#ttfbs-missing-time)
2.  [How UNO Works](#how-uno-works)
3.  [The Redirects We Can’t See](#the-redirects-we-cant-see)
4.  [See the Missing Redirect for Yourself](#see-the-missing-redirect-for-yourself)
5.  [Chrome 151 Makes a Welcome Start](#chrome-151-makes-a-welcome-start)
6.  [CrUX Can’t Give Us This](#crux-cant-give-us-this)
7.  [Seven Million Things We Weren’t Measuring](#seven-million-things-we-werent-measuring)
8.  [Start Measuring What Is Missing](#start-measuring-what-is-missing)

I want to open this post by making very very clear that what follows is not my own original work or research. Unattributed Navigation Overhead (UNO) was [coined and brought to wider attention by Tim Vereecke](https://calendar.perfplanet.com/2024/uno/). It’s one of those ideas that feels blindingly obvious once someone has shown it to you: measure the whole journey to the first byte, subtract every phase the browser can name, and keep whatever is left.

I’m honestly amazing how much the web performance community has been sleeping on UNO. Since I began deliberately tracking it for a client, it has changed the way I look at Time to First Byte (TTFB) almost completely. We hadn’t just been missing a little detail around the edges; in one instance, we uncovered roughly **270 ms of navigation time** that had previously gone entirely unexplained.

What is left after the subtraction may be difficult to attribute — the clue is in the name after all — but it is still time that our users paid for. If we aren’t measuring it, we’re trying to explain an incomplete TTFB with an incomplete set of timings.

In keeping with my desire to document [front-end’s missing metrics](https://csswizardry.com/2026/06/front-ends-missing-metric-the-tbt-window/), today is UNO’s turn.

Need Some Help?

I help companies find and fix site-speed issues. **Performance audits**, **training**, **consultancy**, and more.

## TTFB’s Missing Time

I’ve [written before that TTFB is something of a black box](https://csswizardry.com/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/). It is often treated as a synonym for back-end time, but it covers everything from the start of the navigation until the first byte of the final response reaches the browser. Redirects, DNS, connection setup, TLS, network latency, CDN and server work, and browser overhead can all sit inside it.

The [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux/) can tell us that field TTFB is poor, but it can’t decompose that time. It gives us the total and leaves it there.

The [Navigation Timing API](https://w3c.github.io/navigation-timing/), on the other hand, exposes much more of the journey. It gives us timestamps for redirects, DNS lookup, connection setup, the request, and the arrival of the first response byte. In principle, that should allow us to account for TTFB as a set of smaller, more useful phases.

In practice, those phases often don’t add back up to TTFB. There are gaps between the timestamps, and some timings are deliberately hidden. The browser still includes all of that time in TTFB; it just can’t or won’t tell us what the time was.

**UNO is the difference between the TTFB we experienced and the TTFB we can attribute.**

Adding it to charts begins to plug a very obvious gap:

![SpeedCurve TTFB Sub-Parts chart from 6 to 19 August, showing 0.27 seconds of UNO alongside 1.34 seconds of back-end TTFB, 0.61 seconds of redirects, and smaller DNS and connection timings.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/08/uno-ttfb-sub-parts.png)

Adding UNO to the breakdown exposes around 270 ms that was already present in TTFB but had no corresponding line or label.

Note that all of a sudden, starting 6 August, we have a new 270-ish millisecond UNO entry: a quarter of a second previously unexplained. The appearance of this new entry gives us great insight into hitherto unexplained and untracked time.

You’ll also note that, at 610 milliseconds, named redirects actually account for more than double that of UNO — does this mean UNO is still not as big a deal as actual redirects…? No. More on that later.

## How UNO Works

UNO is a residual rather than a browser-provided metric. We calculate it by starting with the full navigation-to-first-byte duration and subtracting the known phases: `UNO = TTFB − redirect − DNS − connection − request-to-response-start`

The connection phase already includes secure connection setup, so you don’t need to subtract TLS a second time. If your tooling splits TCP and TLS for display, those two parts should add back up to the full connection phase used in the calculation.

In JavaScript, this is all we need to get UNO:

```
const navigation = performance.getEntriesByType('navigation')[0];
const span = (end, start) => Math.max(0, end - start);

const uno = Math.max(0, Math.round(
  (navigation.responseStart - navigation.startTime) -
  span(navigation.redirectEnd, navigation.redirectStart) -
  span(navigation.domainLookupEnd, navigation.domainLookupStart) -
  span(navigation.connectEnd, navigation.connectStart) -
  span(navigation.responseStart, navigation.requestStart)
));
```

The result is not a redirect count, but a sum of all the time previously unaccounted for. And in a sense, it’s still unaccounted for, it just now has a name.

Tim’s work and [Akamai’s description of the metric](https://blog.akamai-mpulse.com/blog/2024-02-29-mpulse-feature-release-metrics-2024/) list several things that may fall into UNO: browser initialisation, delays while unloading the previous page, disk or cache access, browser resource contention, and timings hidden by cross-origin restrictions. In other words, UNO is not another name for redirect time.

However, if a redirect is hidden from Navigation Timing, the time it took still has to go somewhere. That somewhere is UNO.

## The Redirects We Can’t See

This is where the metric becomes particularly revealing. If a navigation contains a cross-origin redirect, Navigation Timing traditionally sets `redirectStart`, `redirectEnd`, and `redirectCount` to zero. The overall TTFB still includes the redirect, but the redirect itself effectively disappears from the breakdown.

That includes entirely routine journeys such as:

-   an advert or affiliate link passing through a tracking provider;
-   a shortened URL resolving to its destination;
-   a social network wrapping an outbound link, or;
-   `http://example.com` redirecting to `https://example.com`.
    -   going from `http://` to `https://` is still cross-origin, even if same-site.

The last one is especially easy to underestimate. A change of scheme means a change of origin, even if the hostname remains identical. What looks to us like a harmless first-party canonicalisation can cross the line that causes Navigation Timing to start hiding redirects.

The impact on campaign-heavy sites can be enormous. The people arriving via paid search, affiliates, email, or social media may travel through one or more third parties before they reach the landing page. A typical synthetic test that starts directly at that landing page won’t traverse the chain. CrUX will fold the cost into TTFB. Navigation Timing may report a redirect count of zero.

Our users experienced the redirects, but our tooling failed to capture any of them.

## See the Missing Redirect for Yourself

Here is a tiny demonstration. Open [`https://tinyurl.com/unattributedNavigationOverhead`](https://tinyurl.com/unattributedNavigationOverhead) in a new tab, then open DevTools » _Console_ and paste this snippet:

```
((n) => ({
  redirects: n.redirectCount,
  redirectTime: Math.round(n.redirectEnd - n.redirectStart)
}))(performance.getEntriesByType('navigation')[0])
```

The URL redirected you from TinyURL to this site, but you should see zero redirects and zero redirect time.

Now, in the same Console, paste the UNO equivalent:

```
((n) => Math.max(0, Math.round(
  (n.responseStart - n.startTime) -
  (n.redirectEnd - n.redirectStart) -
  (n.domainLookupEnd - n.domainLookupStart) -
  (n.connectEnd - n.connectStart) -
  (n.responseStart - n.requestStart)
)))(performance.getEntriesByType('navigation')[0])
```

This time you should get a non-negative number. Your result will vary with network, browser, cache, and device conditions, but it captures the part of TTFB that the named phases did not.

The UNO result does not tell you that TinyURL performed one redirect, nor how many hidden redirects a campaign provider might have used. It tells you only that there was elapsed time the visible Navigation Timing phases did not explain. Use this as a clue: use UNO to find a pattern, then use DevTools, controlled reproduction, and campaign or referrer data to identify the cause.

Now contrast that with the following:

Visit `https://www.bbc.com/news/` exactly. You should be redirected — in one hop — to `https://www.bbc.com/news` (note the missing training slash). Paste the two preceding snippets into Console once more.

Provided you followed the steps exactly, you should see a difference: an enumerated redirect and its associated timing, and a much smaller UNO respectively.

## Chrome 151 Makes a Welcome Start

Historically, even a permissive `Timing-Allow-Origin` response header could not make cross-origin navigation redirects visible in the way it can for subresources. The header’s existing semantics did not provide the forward, destination-based opt-in that a navigation chain needs.

[Chrome 151 has begun rolling out a cross-origin redirect timing opt-in](https://developer.chrome.com/release-notes/151/#cross-origin-redirect-timing-opt-in). Redirecting servers can now use `Timing-Allow-Origin` to permit the destination origin to measure redirects that are under their control. This is an excellent change, and one I hope other browsers and redirect providers adopt quickly.

This won’t make UNO obsolete. Every relevant response in a chain needs to opt in, existing shorteners and campaign platforms won’t necessarily all add the header, and browser support will still leave a lot invisible to us. More importantly, cross-origin redirects are only one possible source of UNO. The data is still valuable even as browsers expose more of the navigation’s constituent parts to developers.

## CrUX Can’t Give Us This

CrUX is an extraordinarily useful RUM dataset, but it is not an observability platform for our own site. For this particular job, it stops one level too soon: it can tell us that TTFB is high, but not whether the problem was DNS, connection setup, a visible redirect, server response, or 500 ms that none of those phases account for.

Without the individual parts, there is no meaningful way to calculate the remainder. In CrUX, all of TTFB is effectively unattributed.

That is why UNO is such a compelling argument for a proper real user monitoring (RUM) solution. By ‘proper’, I don’t mean that it has to be expensive or belong to a particular vendor. I mean that it should collect the browser’s detailed navigation timings for our actual users, preserve useful page-view context, and let us query the result rather than reducing everything to one percentile.

At minimum, I want to be able to:

-   chart UNO alongside redirect, DNS, connection, server response, TTFB, and Largest Contentful Paint (LCP);
-   compare its duration and occurrence count rather than looking only at one percentile;
-   break it down by landing page, campaign, referrer, browser, device, and connection type;
-   see whether UNO and TTFB move together, and;
-   isolate representative page views for analysis in DevTools.

This is how an unattributed metric becomes useful. One value can tell us that something is missing; a few million values with the right dimensions can tell us where to investigate.

![SpeedCurve TTFB Sub-Parts per Page table comparing ten paths by page-view share and RUM timing phases. UNO ranges from 0.02 to 0.35 seconds, with the redacted quiz page highest at 0.35 seconds.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/08/uno-ttfb-sub-parts-per-page.png)

Note that `/[redacted]/veiligheid/quiz-voorrangsregels` has a significantly higher UNO than other pages. Something to investigate.

## Seven Million Things We Weren’t Measuring

I recently added UNO to a client’s SpeedCurve RUM setup because their LCP is highly susceptible to TTFB regressions. I already knew their TTFB was difficult; I did not appreciate quite how much of it we had never accounted for.

While this site clearly appeared to suffer redirects (0.3 s) much more than UNO (0.04 s), the sheer amount of UNO they were incurring completely dwarfed the number of redirects:

![SpeedCurve UNO occurrence histogram with the 0 to 0.2-second bucket selected, showing 7,131,737 page views; the remaining buckets taper sharply towards one second.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/08/uno-ttfb-sub-parts-occurrences-uno.png)

The first UNO bucket alone contains 7,131,737 page views, showing that small amounts of unexplained navigation time were pervasive.

Across the same reporting period, we collected **7,131,737 UNO observations** and only **166 detectable redirects**. I’m not claiming that all seven million UNO were hidden redirects — that would be precisely the mistake the word _unattributed_ warns us against — but the disparity shows how little the redirect count alone tells us about real navigations. But the takeaway here is that although named redirects are about 7.5 times slower than UNO, named redirects occurred about **99.997672376% less frequently**.

![SpeedCurve redirect occurrence histogram with the 0 to 0.2-second bucket selected, showing only 166 page views; the summary above reports 0.3 seconds of redirect time.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2026/08/uno-ttfb-sub-parts-occurrences-redirects.png)

The chart reports 0.3 s for redirects versus 0.04 s for UNO, yet only 166 page views recorded a visible redirect.

SpeedCurve happens to be where I’m collecting and charting the data, but the principle is vendor-independent. A commercial platform, an open-source stack, or your own RUM pipeline can all calculate UNO from Navigation Timing. What matters is retaining enough context to segment it.

This is also one of the reasons I recently built [LUX Sidecar](https://csswizardry.com/2026/08/introducing-lux-sidecar/). Sidecar augments SpeedCurve’s LUX beacons with details that I want available during real investigations, including UNO. The [small source and full metric reference](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98) are public if you want to see or adapt the implementation.

Need Some Help?

I help companies find and fix site-speed issues. **Performance audits**, **training**, **consultancy**, and more.

## Start Measuring What Is Missing

I don’t think UNO should remain a niche custom metric. If we monitor TTFB, we should monitor how much of it we can’t explain. Otherwise, we risk sending CDN, platform, database, and application teams after their few visible milliseconds while a campaign redirect, browser delay, or other unknown consumes hundreds more.

UNO won’t always give us the culprit, but it gives us the missing magnitude: proof that the timings in front of us are not always the whole journey. Proper RUM then gives us the volume, context, and segmentation needed to turn that proof into a useful line of enquiry.

Tim was absolutely right to make a song and dance about UNO. I’m just surprised the rest of us haven’t been making much more noise!

* * *

## Frequently Asked Questions

What is Unattributed Navigation Overhead?

Unattributed Navigation Overhead is the part of Time to First Byte left after subtracting the redirect, DNS, connection, and request-to-response phases exposed by Navigation Timing.

Is Unattributed Navigation Overhead the same as redirect time?

No. Hidden cross-origin redirects are a common source of UNO, but it may also contain browser delays, disk or cache access, previous-page unload work, and resource contention.

Why are cross-origin redirects missing from Navigation Timing?

For privacy reasons, Navigation Timing traditionally returns zero for redirect timing and redirect count when any redirect crosses an origin boundary.

Can CrUX report Unattributed Navigation Overhead?

No. CrUX reports field TTFB, but it does not expose the individual Navigation Timing phases needed to calculate UNO.

How can I measure Unattributed Navigation Overhead?

Use a real user monitoring solution to collect Navigation Timing for each page view, subtract the known TTFB phases, and store the remaining time as a first-class metric.