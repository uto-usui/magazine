---
title: "Lazy Pre-Browsing with Prefetch"
source: "https://csswizardry.com/2019/08/lazy-pre-browsing-with-prefetch/"
publishedDate: "2019-08-15"
category: "css"
feedName: "CSS Wizardry"
---

15 August, 2019

Written by **Harry Roberts** on **CSS Wizardry**.

I’m working with a client at the moment who, unfortunately, has a blocking third party stylesheet that’s needed to successfully render one of their site’s key pages. Until we can design a more long-term solution (and that’s assuming we can at all) that can asynchronously load the file, I wanted to work out a way to minimise its impact.

This is a regular `<link rel="stylesheet">` that is, necessarily, defined in the `<head>`. This means that from a cold-cache, if a user were to land on this page for the first time, they’re absolutely going to take a performance hit—there’s just no way around it. The file needs to make it across the network successfully before the page can even begin to render.

The thing is, although this is a key page, it’s not necessarily the first or only page that a user will visit in a session. In fact, it’s highly likely that they’ll visit a few other types of page before they encounter this one. This means that we can take advantage of the fact that users will most likely visit a different page before this one, and pay the network overhead up-front using `prefetch`. We might not be able to load the file asynchronously, but until then, let’s at least attempt to load it from HTTP cache rather than from the network.

Defined as:

> The prefetch link relation type is used to identify a resource that might be required by the next navigation, and that the user agent SHOULD fetch, such that the user agent can deliver a faster response once the resource is requested in the future.

…this is exactly what `prefetch` is designed for. So nothing groundbreaking here. But what I wanted to do is very tersely ensure that on pages that _do_ require the file, we get a Highest priority CSS request, and on pages that _do not_ need it, we get a Lowest priority request completely off of the Critical Path. This means we never get slower than the baseline, but hopefully will stand to get much faster simply by paying off our network overhead early:

```
<link rel="<?php echo $page == 'home' ? 'stylesheet' : 'prefetch'; ?>"
      href="https://third-party.com/file.css" />
```

Now, the same line of HTML can cover both scenarios without the need for more intricate workflows. This snippet can remain unchanged in the `<head>` of every template.

With this simple addition, I can either take the hit of a fully-blocking, cross-origin resource when I really need to, or I can lazily load the file and have it sat waiting in HTTP cache for use when it ultimately gets called up.

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