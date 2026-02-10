---
title: "When to use CrUX, RUM, and Synthetic web performance monitoring"
source: "https://www.speedcurve.com/blog/crux-rum-synthetic-web-performance-monitoring"
publishedDate: "2025-07-29"
category: "performance"
feedName: "SpeedCurve Blog"
---

![](https://images.speedcurve.com/team/mark_zeman.png?w=152&h=152&fit=crop&auto=format,compress)

Mark Zeman - Jul 30, 2025

"Should I use synthetic monitoring, real user monitoring, or CrUX?" We hear this question a lot. It's important to know the strengths and limitations of each monitoring tool and what they’re best used for, so we don’t miss out on valuable insights.

![](https://blog-img.speedcurve.com/img/479/crum-rum-syn-hero.png?auto=format,compress&fit=max&w=2000)

This post includes:

-   How synthetic and real user monitoring (RUM) work
-   What is CrUX?
-   Is CrUX a substitute for RUM?
-   When and why to use each tool 
-   An obscure cheese metaphor
-   Plus a quick survey question at the end!

## Synthetic and real user monitoring

For the longest time, there have been two primary forms of front-end web performance data.

-   **Synthetic data (sometimes called lab data)** is performance data collected based on a very specific set of variables. For example, you can choose to test your product page on a 3G network, from Italy, on a Chrome desktop browser.
-   **Real user data (sometimes called field data)** is performance data collected from real users as they browse your site under a wide variety of contexts (different browsers, devices, connection speeds, locations, etc.).

Or to put it simply:

-   Synthetic data helps you understand **your pages**.
-   RUM helps you understand **your users**.

There's never been much merit to the debate of [real user monitoring (RUM) versus synthetic monitoring](https://www.speedcurve.com/web-performance-guide/synthetic-vs-real-user-monitoring/). They both have different uses and most companies should really be using both.

**Because synthetic data is so controllable and repeatable, you have a very clean set of data to look at.** This makes it easy to spot regressions and improvements. You can also capture a _ton_ of detail on each test, empowering your teams to dig deep into understanding exactly what is going on in their pages.

![](https://blog-img.speedcurve.com/img/479/waterfall.png?auto=format,compress&fit=max&w=2000)

And because synthetic lets you test any URL, not just your own pages, you can do things like [benchmark your site against your competitors](https://support.speedcurve.com/docs/competitive-benchmarking).

![](https://blog-img.speedcurve.com/img/479/benchmarks.png?auto=format,compress&fit=max&w=2000)

**Real user data, on the other hand, can be very noisy. But its comprehensiveness is also one of its strengths.** RUM data captures data from every possible scenario, giving you insight into how your site performs in the real world across experiences you may not even have anticipated.

![](https://blog-img.speedcurve.com/img/479/rum-dashboard.png?auto=format,compress&fit=max&w=2000)

RUM data also lets you [correlate performance data to business and user behavior metrics](https://www.speedcurve.com/blog/site-speed-business-correlation/), such as conversion rate and bounce rate. This is absolutely critical to sustaining a long-term focus on performance at any organization.

![](https://blog-img.speedcurve.com/img/479/correlation-chart.png?auto=format,compress&fit=max&w=2000)

Because they play different roles, both synthetic and real user monitoring play a critical role in any company's [performance culture](https://www.speedcurve.com/web-performance-guide/performance-culture-best-practices/).

A few years ago, a third form of front-end performance data was released: the [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux). We often get asked where CrUX fits in the monitoring landscape (and we have a [support article](https://support.speedcurve.com/docs/speedcurve-rum-vs-crux-data) that covers why your RUM and CrUX data may not match), so here's our take.

## First, what is CrUX?

CrUX data is technically field data. It's collected from real users, not from synthetic tests. But CrUX data is definitely not RUM, or if it is, then it's a very limited form of RUM with some heavy caveats:

**CrUX data is collected from Chrome sessions only.** There is no visibility into what is happening in Safari, Firefox, Edge or any other browser used. We often see sites with 70-80% of traffic that is NOT included in CrUX.

**This means your mobile Safari traffic is not measured.** People often forget just how much of their traffic comes from mobile Safari.  

**CrUX data is also only collected for certain _types_ of Chrome users.** Specifically, users who:

-   Enable usage statistic reporting
-   Sync their browser history
-   Don’t have a sync passphrase set
-   Use a [supported platform](https://developer.chrome.com/docs/crux/methodology#user-eligibility) 

**CrUX data also filters out origins or pages** that don't meet specific [eligibility criteria](https://developer.chrome.com/docs/crux/methodology#eligibility) on at least 80% of their traffic.

**There's a limited amount of metrics available.** At the time of writing, [there are only about a dozen performance metrics you can track](https://developer.chrome.com/docs/crux/methodology/metrics).

**You can't correlate CrUX data to your business metrics.** There's no way to flag any conversions or get bounce rate data, for example.

## CrUX is NOT a substitute for RUM

If you were shopping for a RUM provider and a vendor told you that they had the perfect solution except:

-   it only recorded data from a single browser
-   and only a few metrics
-   and only from a very particular subset of your users...

...well, that doesn’t sound particularly robust, does it?

All of that is to say: while CrUX is sometimes referred to as real user monitoring, it's actually something very different than traditional synthetic and RUM tools.

## But CrUX data can serve other purposes

There are a few situations where CrUX can be helpful.

**Google uses CrUX data when it factors performance into its search algorithm.** Search is a very important consideration for most sites, and this alone makes it worth monitoring your CrUX data. For all the reasons above (the heavy subsetting), in addition to the fact that CrUX data is collected in different ways than a traditional RUM beacon, the [data will not line up directly with what you see in other tooling](https://www.speedcurve.com/web-performance-guide/how-to-trust-your-metrics/). But tracking CrUX data for your site may help give you visibility into how well your site is optimized for search.

**CrUX data lets us do competitive benchmarking based on field data.** Competitive benchmarking is a very effective way of helping organizations rally around site speed. Traditionally, benchmarking was only possible with synthetic data. CrUX lets us set up competitive benchmarking using some field data as well, which can be a nice way of augmenting existing synthetic benchmarks.

**Finally, CrUX data can help bridge the gap for companies still working on implementing a full RUM solution.** CrUX falls short of being a full-blown RUM solution, but for companies still working on getting RUM in place, CrUX can be a nice way to at least get some visibility into what is happening in the field. Limited visibility is still better than no visibility.

## Synthetic, RUM, and CrUX data each have their place

It's important to keep in mind the limitations of each monitoring tool and what they're best used for so we don’t make the mistake of overlooking valuable insights.

**Synthetic data** is relatively clean and detailed, but not comprehensive in terms of testing the full spectrum of user experiences. Use it to guide your design and development process, and to help spot potential regressions and improvements. 

**CrUX data** is field data that is important for search, but it is a very specific subset of your traffic from a single browser with no ability to connect business and user metrics. Use it for real-user competitive benchmarking, and to help you keep on top of how Google views your site from a search perspective. 

**Real user data** is comprehensive field data covering the full spectrum of user experiences. As such, it should be your ultimate source of truth in terms of how you're doing. Use it to see how your site performs in the real world and to correlate business and user metrics to performance.

To use a somewhat obscure cheese metaphor, CrUX can give you a good initial sniff at performance issues, but it’s no [Époisses de Bourgogne](https://thecheeseatlas.com/cheese-profiles/epoisses-de-bourgogne/). RUM, on the other hand, gives you the full flavour. 

![](https://blog-img.speedcurve.com/img/479/cheese2.png?auto=format,compress&fit=max&w=2000)

## Does it sound like we're announcing CrUX within SpeedCurve?

Not quite, but we are exploring the idea. What are your thoughts? How would the CrUX dataset complement the data you're already getting from SpeedCurve Synthetic and RUM? Let us know at support@speedcurve.com!

[![](https://blog-img.speedcurve.com/img/479/customer-logos-free-trial-banner.png?auto=format,compress&fit=max&w=2000)](https://www.speedcurve.com/signup/?utm_source=blog&utm_medium=blog&utm_campaign=blog-trials)