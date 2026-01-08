---
title: "A Layered Approach to Speculation Rules"
source: "https://csswizardry.com/2024/12/a-layered-approach-to-speculation-rules/"
publishedDate: "2024-12-02"
category: "css"
feedName: "CSS Wizardry"
---

2 December, 2024 (last updated on 5 June, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Speculation Rules](#speculation-rules)
2.  [Speculation Rules on `csswizardry.com`](#speculation-rules-on-csswizardrycom)
3.  [A Multi-Tiered Approach](#a-multi-tiered-approach)
    1.  [Opt-In Strategy](#opt-in-strategy)
    2.  [Opt-Out Strategy](#opt-out-strategy)
    3.  [Layering Up](#layering-up)
4.  [Clearing Speculation Rules’ Cache With `Clear-Site-Data`](#clearing-speculation-rules-cache-with-clear-site-data)

I’ve always loved doing slightly unconventional and crafty things with simple web platform features to get every last drop out of them. From building the [smallest compliant LCP](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/), [lazily prefetching CSS](https://csswizardry.com/2019/08/lazy-pre-browsing-with-prefetch/), or using pixel GIFs to track [non-JS users](https://csswizardry.com/2018/03/measuring-the-hard-to-measure/) and [dead CSS](https://csswizardry.com/2018/01/finding-dead-css/), I find a lot of fun in making useful things out of other useful things.

Recently, I’ve been playing similar games with the [Speculation Rules API](https://developer.chrome.com/docs/web-platform/prerender-pages).

## Speculation Rules

I don’t want to go super in-depth about the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) in this post, but the key thing to know is that it provides two speculative loading types—`prefetch` and `prerender`—which ultimately have the following goals:

-   **`prefetch`** pays the next page’s TTFB costs up-front and ahead of time;
-   **`prerender`** pays the next page’s TTFB, FCP, and LCP up-front.

It’s going to be very helpful to keep those two truisms in mind—**`prefetch` for paying down TTFB; `prerender` for LCP**. This makes `prefetch` the lighter of the two and `prerender` the more resource-intensive.

That’s about all you need to know for the purposes of this article.

## Speculation Rules on `csswizardry.com`

Ever since Speculation Rules became available, I’ve used them in somewhat uninspired ways on this site:

-   to [prerender the latest article](https://github.com/csswizardry/csswizardry.github.com/blob/5d36f24be759165bd9f974af17c9826148be9e29/index.html#L43-L58) from the homepage:
    
    ```
    <script type=speculationrules>
      {
        "prerender": [
          {
            "urls": [ "/2024/12/a-layered-approach-to-speculation-rules/" ]
          }
        ]
      }
    </script>
    ```
    
-   to [prerender the next and previous articles](https://github.com/csswizardry/csswizardry.github.com/blob/5d36f24be759165bd9f974af17c9826148be9e29/_layouts/post.html#L155-L173) from a page such as this one:
    
    ```
    <script type=speculationrules>
      {
        "prerender": [
          {
            "urls": [
                "/2024/12/a-layered-approach-to-speculation-rules/",
                "/2024/11/core-web-vitals-colours/"
            ]
          }
        ]
      }
    </script>
    ```
    

In this scenario, I am explicitly prerendering named and known URLs, with a loose idea of a potential and likely user journey—I’m warming up what I think might be the visitor’s next page.

While these are both functional and beneficial, I wanted to do more. My site, although not very obviously, has two sides to it: the blog, for folk like you, and the commercial aspect, for [potential clients](https://csswizardry.com/services/). While steering people down a fast article-reading path is great, can I do more for visitors looking around other parts of the site?

With this in mind, I recently expanded my Speculation Rules to:

1.  `immediate`ly `prefetch` any internal links on the page, and;
2.  `moderate`ly `prerender` any other internal links on hover.

This fairly indiscriminate approach casts a much wider net than listed URLs, and instead looks out for _any_ internal links on the page:

```
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "immediate"
      }
    ],
    "prerender": [
      {
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

This slightly layered approach allows us to `immediate`ly pay the TTFB cost for all internal links on the page, and pay the LCP cost for any internal link that we hover (`moderate`). These are quite broad rules as they apply to any `href` on the page that matches `/*`—so any root-relative link at all.

This approach works well for me as my site is entirely [statically generated](https://jekyllrb.com/) and served from [Cloudflare](https://www.cloudflare.com/)’s edge. I also don’t get masses of traffic, so the risk of increased server load anywhere is minimal. For sites with lots of traffic and highly dynamic back-ends (database queries, API calls, insufficient caching), this approach might be a little too liberal.

## A Multi-Tiered Approach

On a recent client project, I wanted to take the idea further. They have a large and relatively complex site (many different product lines sitting under one domain) with lots of traffic and a nontrivial back-end infrastructure. Things would have to be a little more considered.

### Opt-In Strategy

They’re a Big Site™ so an opt-in approach was the better way to go. A wildcard-like match would prove far too greedy[1](#fn:1), and as different pages contain vastly different amounts of links, the additional overhead was difficult to predict on a site-wide scale.

Arguably the easiest way to opt into Speculations is with a selector. For example, we could use classes:

```
<a href class=prefetch>Prefetched Link</a>
<a href class=prerender>Prerendered Link</a>
```

And the corresponding Speculation Rules:

```
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": ".prefetch"
        },
        ...
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": ".prerender"
        },
        ...
      }
    ]
  }
</script>
```

**N.B.** As `prerender` already includes the `prefetch` phase, you’d never need both `class="prefetch prerender"`; one or the other is sufficient.

However, I’m very fond of this pattern:

```
<a href data-prefetch>Prefetched Link</a>
<a href data-prefetch=prerender>Prerendered Link</a>
```

And their respective Speculation Rules:

```
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": "[data-prefetch='']"
        },
        ...
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": "[data-prefetch=prerender]"
        },
        ...
      }
    ]
  }
</script>
```

It keeps all logic nicely and neatly contained in a `data-prefetch` attribute.

Note that I’m using `[data-prefetch='']`. This matches `data-prefetch` _exaxtly_. If I were to use `[data-prefetch]`, it would match any and all of the following:

-   `<a href data-prefetch>`
-   `<a href data-prefetch=prerender>`
-   `<a href data-prefetch=foo>`
-   `<a href data-prefetch='baz bar foo'>`
-   `<a href data-prefetch=false>`

The last one is the one I care about the most, and will become very important right about… now.

### Opt-Out Strategy

We’ll probably run into a scenario at some point where we explicitly want to opt out of prefetching or prerendering—for example, a log-out page. In order to be able to achieve that, we’ll need to reserve something like `data-prefetch=false`.

If we’d used `"selector_matches": "[data-prefetch]"` above, that would also match `data-prefetch=false`, which is exactly what we don’t want. That’s why we bound our selector onto `"selector_matches": "[data-prefetch='']"` specifically—only match a `data-prefetch` attribute that has no value.

Now, we have the following three explicit opt-in and -out hooks:

-   **`data-prefetch`:** Only prefetch this link.
-   **`data-prefetch=prerender`:** Make a full prerender for this link.
-   **`data-prefetch=false`:** Do nothing with this link.

```
<a href data-prefetch>Prefetched Link</a>
<a href data-prefetch=prerender>Prerendered Link</a>
<a href data-prefetch=false>Untouched Link</a>
```

Anything else would fail to match any Speculation Rule, and thus would do nothing.

### Layering Up

With these simple opt-in and -out mechanisms in place, I wanted to look at ways to subtly and effectively layer this up to add further disclosed functionality without any additional configuration. What could I do to _really_ maximise the benefit of Speculation Rules with just these two attributes?

My thinking was that if we’re explicitly marking `data-prefetch` and `data-prefetch=prerender`, could we upgrade the former to the later on-demand? When the page loads, the browser immediately fulfils its prefetches and prerenders, but when someone hovers a prefetched link, expand it to a full prerender?

Easy.

And then, for good measure, can we upgrade any other internal link from nothing to prefetch on demand?

Also easy!

Working from most- to least-aggressive, and keeping in mind our two truisms, the best way to think about what we’re achieving is that we:

1.  **immediately pay LCP** costs for any matching link we’ve opted into:
    
    ```
    "prerender": [
      {
        "where": {
          "selector_matches": "[data-prefetch=prerender]"
        },
        "eagerness": "immediate"
      },
      ...
    ]
    ```
    
2.  **immediately pay TTFB** costs for any matching link we’ve opted into:
    
    ```
    "prefetch": [
      {
        "where": {
          "selector_matches": "[data-prefetch='']"
        },
        "eagerness": "immediate"
      },
      ...
    ],
    ```
    
3.  **on demand, pay LCP** costs for any link we’ve already paid TTFB costs for:
    
    ```
    "prerender": [
      ...
      {
        "where": {
          "selector_matches": "[data-prefetch='']"
        },
        "eagerness": "moderate"
      }
    ]
    ```
    
4.  **on demand, pay TTFB** costs for any other internal links:
    
    ```
    "prefetch": [
      ...
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "selector_matches": "[data-prefetch=false]" } }
          ]
        },
        "eagerness": "moderate"
      }
    ],
    ```
    
    Note that here is where we prefetch any internal link _except those explicitly opted out_.
    

Now, the client has the ability to prerender highly likely or encouraged navigations with the `data-prefetch=prerender` attributes (e.g. on their top-level navigation or their homepage calls-to-action).

Things that are less likely but still reasonable candidates for warm-up (e.g. items in the sub-navigation) can simply carry `data-prefetch`.

All other internal links (`"href_matches": "/*"`)—except the already-maxed out `data-prefetch=prerender` or opted-out `data-prefetch=false`—get upgraded to the next category on demand.

Putting them all together in the format and order required, our Speculation Rules look like this:

```
<!--! Content by Harry Roberts, csswizardry.com, available under the MIT license. -->

<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": "[data-prefetch='']"
        },
        "eagerness": "immediate"
      },
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "selector_matches": "[data-prefetch=false]" } }
          ]
        },
        "eagerness": "moderate"
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": "[data-prefetch=prerender]"
        },
        "eagerness": "immediate"
      },
      {
        "where": {
          "selector_matches": "[data-prefetch='']"
        },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

We could apply these against this example page:

```
<ul class=c-nav>

  <li class=c-nav__main>
    <a href=/ data-prefetch=prerender>Home</a>

  <li class=c-nav__main>

    <a href=/about/ data-prefetch=prerender>About</a>

    <ul class=c-nav__sub>
      <li>
        <a href=/about/history/ data-prefetch>Company History</a>
      <li>
        <a href=/about/board/ data-prefetch>Company Directors</a>
    </ul>

  <li class=c-nav__main>

    <a href=/services/ data-prefetch=prerender>Services</a>

    <ul class=c-nav__sub>
      <li>
        <a href=/services/solutions/ data-prefetch>Solutions</a>
      <li>
        <a href=/services/industries/ data-prefetch>Industries</a>
    </ul>


  <li class=c-nav__main>
    <a href=/contact/ data-prefetch=prerender>Contact Us</a>

  <li class=c-nav__main>
    <a href=/log-out/ data-prefetch=false>Log Out</a>

</ul>

...

<a href=/sale/
   class=c-button
   data-prefetch=prerender>Black Friday Savings!</a>

...

<footer>
  <a href=/sitemap/>Sitemap</a>
</footer>
```

-   Top-level navigation items with `data-prefetch=prerender` (e.g. the _About_ page) are immediately prerendered.
-   Sub-level navigation items with `data-prefetch` (e.g. the _Solutions_ page) are immediately prefetched but prerendered on demand.
-   All other links (e.g. the _Sitemap_ page) are dormant until they get prefetched on demand.
-   Any links with `data-prefetch=false` are skipped entirely.

I can’t publish any names or numbers or facts or figures, but we ran an experiment for a week and the outcomes we’re incredibly compelling.

I guess my point after all of this is that I think this is quite an elegant pattern and I’m quite happy with myself. If you’d like to be happy with me, too, I’m taking on [new clients for 2025](https://csswizardry.com/services/).

## Clearing Speculation Rules’ Cache With `Clear-Site-Data`

In the [upcoming Chrome 138 release](https://developer.chrome.com/blog/chrome-138-beta#speculation_rules_add_prefetchcache_and_prerendercache_to_clear-site-data_header), the [`Clear-Site-Data` HTTP response header](https://csswizardry.com/2023/10/clear-cache-on-customer-device/) is being extended to add support for both the `prefetchCache` and `prerenderCache` directives. These can be used by developers to forcibly purge end-users caches in the event you may have incorrectly or misconfigured something in or around your Speculation Rules.

Thanks to [Barry Pollard](https://x.com/tunetheweb) for sense-checks and streamlining.

1.  [Chrome sets sensible limits](https://developer.chrome.com/docs/web-platform/prerender-pages#chrome-limits) to prevent anything seriously bad happening. [↩](#fnref:1)
    

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