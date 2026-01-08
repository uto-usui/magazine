---
title: "Performance and Resilience: Stress-Testing Third Parties"
source: "https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/"
publishedDate: "2017-08-01"
category: "css"
feedName: "CSS Wizardry"
---

31 July, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Bottom-Up Summaries](#bottom-up-summaries)
2.  [Request Blocking](#request-blocking)
    1.  [Use Cases](#use-cases)
3.  [Charles Proxy](#charles-proxy)
    1.  [Use Cases](#use-cases-1)
4.  [Blackhole Servers](#blackhole-servers)
5.  [Update, 2017-09-14](#update-2017-09-14)

When building almost any website of any reasonable size, we’re highly likely to need to call on at least some third party resources: analytics, fonts, CDNs, ad providers, to name just a few.

Unfortunately, this puts a lot of your ability to be fast in someone else’s hands, and the vast majority of performance slowdowns I encounter in my work are, indeed, caused by external resources that we have little-to-no control over. These issues could range from network issues on a CDN leading to slower delivery of assets, to external JavaScript using older APIs like `document.write()`; from third parties not properly compressing or caching their resources, to ad networks not optimising their images; from third party resources living on the Critical Path, to any combination of the above.

The solutions to the above problems will range from trivial to non-existent and will depend a lot on the third party in question, and on your own context. That means that, in this post, I can’t necessarily discuss how to _fix_ these issues, but I will show you a few tools you can use to identify and triage them and learn just how susceptible you might be.

## Bottom-Up Summaries

Rightly or wrongly, a lot of performance optimisation is about playing something of a blame game: what, or _who_, is making us slow? One of my favourite ways of quickly working this out is to make use of DevTools’ _Bottom-Up_ summary of runtime performance.

After you’ve run a Performance profile over your page, you should see a pane with a tab reading _Bottom-Up_. Head over to this view, and select _Group by Domain_ from the available dropdown. Amazing! Now we can see exactly where our overhead is coming from:

![](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-bottom-up.png)

DevTool’s Bottom-Up feature. [View full size/quality (50KB).](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-bottom-up-full.png)

Above, we can see how `twitter.com` contributes a third of the work that happens when loading a page on my website. Using this knowledge, we can more accurately pinpoint problem areas, and begin investigating with a bit of evidence behind us. We can then take that knowledge, and use it with the following…

## Request Blocking

As of [Chrome 59](https://developers.google.com/web/updates/2017/04/devtools-release-notes#block-requests) (and long before that if you have Experiments enabled), we have the option to prevent requests for specific asset URLs—or even assets on entire domains—from going out. Whilst this doesn’t necessarily simulate any realistic network conditions (the key thing to note with this feature is that it blocks outgoing requests; it does not hit the network at all), it is a great way of seeing what the absence of a particular asset would have on the current page.

![](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-request-blocking.png)

The option to block requests from specific domains in DevTools. [View full size/quality (78KB).](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-request-blocking-full.png)

In DevTools’ Network panel, after you’ve run a waterfall chart, you’re now able to to right-click an individual asset and mark it for blocking: you can either block outgoing requests for a single file, or for all files from an entire domain.

### Use Cases

I usually use this feature when I’m running performance audits: when I’m profiling a live website, I might get a hunch that a certain third party is causing slowdowns. Previously, in order to verify this, you’d have to remove the third party asset from the source code, roll a new release to a staging environment, and re-run your tests with the asset removed so as to measure your before and afters.

Now, however, you can simply wonder Hmm… I think this particular third party tag manager is causing us some problems; let me quickly disable it and see what happens. In fact, I did exactly this in front of a client only last week to find that one particular third party JS file was contributing around half a second of slowdown.

In short, this feature is fantastic for profiling live sites and seeing exactly what happens when we remove third party assets from the page load.

## Charles Proxy

[Charles](https://www.charlesproxy.com/) is a great little Swiss Army knife of a tool that I use quite frequently. It allows us to proxy HTTP traffic, observing exchanges between our machine and the network. The bit we’re most interested in right now, though, is its throttling feature. Charles’ throttling capabilities are twofold:

1.  Firstly, we can throttle our entire connection, simulating a poor network. This is perfect for testing performance with empathy, using a forcibly worse connection, and it a little more forensic than the similar feature found in Chrome’s DevTools.
2.  Secondly, and more pertinent to this article, is its ability only to throttle specific hosts.

![](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-charles-throttling.png)

Charles Proxy’s throttling settings. [View full size/quality (103KB).](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-charles-throttling-full.png)

Add a domain to the list, choose or configure a network condition, and begin artificially slowing down traffic only from a specified host.

### Use Cases

It’s hopefully fairly self-explanatory, but this is a great way of assessing what would happen if you weren’t necessarily on a slow connection, but if one of your third parties was suffering a slowdown for whatever reason. What happens if Google Fonts is having issues? What happens if Typekit gets DDoSed? Simulating slowdowns on specific third parties is a good way to see how vulnerable we are.

## Blackhole Servers

The most extreme of scenarios: what happens if a third party has a complete outage? As rare as this may be, it’s prudent to at least know how your site will respond in the case that a third party you use goes completely offline. Best case scenario, you fail gracefully with minimal disruption; worst case scenario, you go down with it.

A blackhole server can be used to route third party traffic through an endpoint that effectively makes requests disappear, recreating the effects of a complete outage (only for yourself, not the entire internet). [WebPagetest](https://www.webpagetest.org/) have made a blackhole server available at `72.66.115.13`. We can point specific domains at this IP address in our `hosts` file, e.g.:

```
72.66.115.13 platform.twitter.com
72.66.115.13 connect.facebook.net
72.66.115.13 fonts.googleapis.com
72.66.115.13 assets.adobedtm.com
72.66.115.13 fast.fonts.net
```

Now—if you’ve cleared your browser’s and machine’s DNS cache—you should find that all requests to assets on those domains will eventually time out. This is where we begin to see interesting, and often much more severe, results.

Let’s say you have a render-blocking asset hosted on an external domain, for example:

-   A `script` that doesn’t have an `async` or `defer` attribute, such as Adobe Tag Manager, or;
-   A CSS file, such as Google Fonts.

Because these types of assets block rendering, the browser will not paint anything to the screen until they have been downloaded (and executed/parsed). If the service that provides the file is offline, then that’s a lot of time that the browser has to spend _trying_ to access the file, and during that period the user is left potentially looking at a blank screen. After a certain period has elapsed, the browser will eventually timeout and display the page without the asset(s) in question. How long is that certain period of time?

It’s **1 minute and 20 seconds.**

If you have any render-blocking, critical, third party assets hosted on an external domain, you run the risk of showing users a blank page for 1.3 minutes.

Below, you’ll see the `DOMContentLoaded` and `Load` events on a site that has a render-blocking script hosted elsewhere. The browser was completely held up for 78 seconds, showing nothing at all until it ended up timing out.

![](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-outage.png)

A 1.3 minute `DOMContentLoaded` and `Load` event when Adobe Tag Manager is offline. [View full size/quality (375KB).](https://csswizardry.com/wp-content/uploads/2017/07/screenshot-outage-full.png)

It’s very important to point out that **this isn’t necessarily the third party’s fault**. The behaviour outlined above is expected: it’s how web pages and browsers work. What we’re doing here is not apportioning blame, but learning about how resilient _we_ are if one of our third parties goes down.

Oftentimes, we don’t consider the implications or ramifications of such scenarios, and we rarely realise just how severe the outcomes can be. I would wholeheartedly recommend identifying and then testing any critical third parties you have hosted on external domains.

In the case of something like a Google Fonts CSS file, we should be using a more robust and failsafe font-loading technique; in the case of JavaScript, we should try utilising `async` or `defer` if possible.

* * *

Like it or not, third party providers are a necessary evil in almost all development projects, and if we’re going to entrust parts of our site or product to others, we ought to have a very good idea of what happens when things go wrong. Stress-testing third parties is a standard part of any of the bits of performance work I undertake, because the ramifications can be huge. And again, this isn’t us blaming the providers: it’s finding out how well we handle failures.

## Update, 2017-09-14

[Ryan Townsend](https://twitter.com/RyanTownsend) wrote something of a follow-up post, [How 3rd Party Scripts can be performant citizens on the web](https://www.twnsnd.com/posts/performant_third_party_scripts.html).

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).