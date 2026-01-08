---
title: "Correctly Configure (Pre) Connections"
source: "https://csswizardry.com/2023/12/correctly-configure-preconnections/"
publishedDate: "2023-12-10"
category: "css"
feedName: "CSS Wizardry"
---

9 December, 2023

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Learn by Example](#learn-by-example)
2.  [Working Out Which Origins to `preconnect`](#working-out-which-origins-to-preconnect)
3.  [Don’t `preconnect` Too Many Origins](#dont-preconnect-too-many-origins)
4.  [When to Use `crossorigin`](#when-to-use-crossorigin)
    1.  [`Sec-*` Request Headers](#sec--request-headers)
5.  [`preconnect` and DNS](#preconnect-and-dns)

A trivial performance optimisation to help speed up third-party or other-origin requests is to `preconnect` them: hint that the browser should preemptively open a full connection (**DNS**, **TCP**, **TLS**) to the origin in question, for example:

```
<link rel=preconnect href=https://fonts.googleapis.com>
```

In the right circumstances, this simple, single line of HTML can make pages [hundreds of milliseconds faster](https://andydavies.me/blog/2019/03/22/improving-perceived-performance-with-a-link-rel-equals-preconnect-http-header/)! But time and again, I see developers misconfiguring even this most basic of features. Because, as is often the case, there’s much more to this ‘basic feature’ than meets the eye. Let’s dive in…

## Learn by Example

At the time of writing, the [BBC News homepage](https://www.bbc.co.uk/news) (in the UK, at least) has these four `preconnect`s defined early in the `<head>`:

```
<link rel=preconnect href=//static.bbc.co.uk crossorigin>
<link rel=preconnect href=//m.files.bbci.co.uk crossorigin>
<link rel=preconnect href=//nav.files.bbci.co.uk crossorigin>
<link rel=preconnect href=//ichef.bbci.co.uk crossorigin>
```

Readers on narrow screens should know that each of these `preconnect`s also carries a `crossorigin` attribute—scroll along to see for yourself!

Note that the BBC use schemeless URLs (i.e. `href=//…`). I would _not_ recommend doing this. Always force HTTPS when it’s available.

Having consulted for the BBC a number of times, I know that they make heavy use of internal subdomains to share resources across teams. While this suits developer ergonomics, it’s not great for performance, particularly in cases where the subdomain in question is on the critical path. Warming up connections to important origins is a must for the BBC.

However, a look at a waterfall tells me that none of these `preconnect`s worked!

![](https://csswizardry.com/wp-content/uploads/2023/12/bbc-news-waterfall-initial.png)

Above, you can see that the browser discovered references to each of these origins in the first chunk of HTML, before the 1-second mark. This is evidenced by the light white bars that denote ‘waiting’ time—the browser knows it needs the files, but is waiting to dispatch the requests. However, we can also see that the browser didn’t begin network negotiation until closer to the 1.5-second mark, when we begin seeing a tiny slither of green—**DNS**—followed by the much more costly **TCP** and **TLS**. What went wrong?!

## Working Out Which Origins to `preconnect`

In the example above, we have five connections to the following four domains (more on that later):

-   **`nav.files.bbci.co.uk`:** On the critical path with render-blocking CSS.
-   **`static.files.bbci.co.uk`:** On the critical path with render-blocking CSS and JS.
-   **`m.files.bbci.co.uk`:** On the critical path with render-blocking CSS.
    -   The screenshot above marks the CSS as non-blocking because of the way it’s fetched—it’s `preload`ed, which _is_ non-blocking, but it’s then conditionally applied to the page using `document.write()` (which is its own [performance faux pas in itself](https://csswizardry.com/2023/01/why-not-document-write/)).
-   **`ichef.bbci.co.uk`:** Not on the critical path, but does host the homepage’s LCP element.

**N.B.** For neatness, I am omitting the `https://` from written prose, but it is vital that you include the relevant scheme in your `href` attribute. All code examples are complete and correct.

Each of these four origins is vital to the page, so all four would be candidates for `preconnect`. However, the BBC aren’t attempting to `preconnect` `static.files.bbci.co.uk` at all; instead, they’re `preconnect`ing `static.bbc.co.uk`, which is also used, but _isn’t_ on the critical path. This feels more like a simple oversight or a typo than anything else.

As a rule, **if the origin is important to the page and is used within the first five seconds of the page-load lifecycle, `preconnect` it**. If the origin is not important, don’t `preconnect` it; if it is important but is used more than five seconds into the page load lifecycle, your priority should be moving it sooner.

Note that important is very subjective. Your analytics isn’t important; your chat client isn’t important. Your consent management platform is important; your [image CDN is important](https://cloudinary.com/).

One easy way to get an overview of early and important origins—and the method I use when advising clients—is to use WebPageTest. Once you’ve run a test, you can head to a [_Connection View_](https://www.webpagetest.org/result/231209_AiDc18_7GP/2/details/#connectionView_fv_1) of the waterfall which shows a diagram comprising entries per origin, not per response:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/12/bbc-news-waterfall-connections.png)

Note that some connections are actually shared across more than one domain: this is [HTTP2’s connection coalescence](https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.1), available when origins share the same IP address and certificates.

As easy as that—that’s your list of potential origins!

## Don’t `preconnect` Too Many Origins

`preconnect` should be used sparingly. Connection overhead isn’t _huge_, but too many `preconnect`s that either a) aren’t critical, or b) don’t get used at all, is definitely wasteful.

Flooding the network with unnecessary `preconnect`s early in the page load lifecycle can steal valuable bandwidth that could have been given to more important resources—the overhead of certificates alone can exceed 3KB. Further, opening and persisting connections has a CPU overhead on both the client and the server. Lastly, Chrome will close a connection if it isn’t used within the first 10 seconds of being opened, so if you act too soon, you might end up doing it all over again anyway.

With `preconnect`, you should strive for **as few as possible but as many as necessary**. In fact, I would consider too many `preconnect`s a code smell, and you probably ought to solve larger issues like [self-hosting your static assets](https://csswizardry.com/2019/05/self-host-your-static-assets/) and reducing reliance on third parties in general.

## When to Use `crossorigin`

Okay. Now it’s time to learn why the BBC’s `preconnect`s weren’t working!

This is the third time I’ve seen this problem this month (and we’re only nine days in…). It stems from a misunderstanding around when to use `crossorigin`. I get the impression that developers think ‘this request is going to another origin, so it must need the `crossorigin` attribute’. But that’s not what the attribute is for—`crossorigin` is used to define the CORS policy for the request. `crossorigin=anonymous` (or a bare `crossorigin` attribute) will never exchange any user credentials (e.g. cookies); `crossorigin=use-credentials` will always exchange credentials. Unless you know that you need it, you almost never need the latter. But when do we use the former?

If the resulting request for a file would be CORS-enabled, you would need `crossorigin` on the corresponding `preconnect`. Unfortunately, CORS isn’t the most straightforward thing in the world. Fortunately, I have a shortcut…

Firstly, identify a file on the origin that you’re considering `preconnect`ing. For example, let’s take a look at the BBC’s `box.css`. In DevTools (or WebPageTest if you already have one available—you don’t need to run one just for this task), look at the resource’s **request** headers:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/12/devtools-request-headers.png)

There it is right there: **`Sec-Fetch-Mode: no-cors`**.

The `preconnect` for `nav.files.bbci.co.uk` doesn’t _currently_ (I’ll come back to that shortly) need a `crossorigin` attribute:

```
<link rel=preconnect href=https://nav.files.bbci.co.uk>
```

Let’s look at another request. `orbit-v5-ltr.min.css` from `static.files.bbci.co.uk` also carries a `Sec-Fetch-Mode: no-cors` request header, so that won’t need `crossorigin` either:

```
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
```

Let’s keep looking.

How about the font `BBCReithSans_W_Rg.woff2` also from `static.files.bbci.co.uk`?

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/12/devtools-request-headers-02.png)

Hmm. This _does_ need `crossorigin` as it’s marked `Sec-Fetch-Mode: cors`. What do we do here?

Simple!

```
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk crossorigin>
```

We just add a second `preconnect` to open an additional CORS-enabled connection to `static.files.bbci.co.uk`. (Remember earlier when the browser had opened five connections to four origins? One of them was CORS-enabled!)

Let’s keep going and see where we end up…

As it stands, the very specific example of the homepage right now, needs the following `preconnect`s. Notice that all origins didn’t need `crossorigin`, except `static.files.bbci.co.uk` which needed both:

```
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk crossorigin>
<link rel=preconnect href=https://m.files.bbci.co.uk>
<link rel=preconnect href=https://ichef.bbci.co.uk>
```

This feels comfortable! The browser naturally opened five connections, so I’m happy to see that we’ve also landed on five `preconnect`s; nothing is unaccounted for.

I’d recommend familiarising yourself with the entire suite of `Sec-*` headers—they’re incredibly useful debugging tools.

## `preconnect` and DNS

Because **DNS** is simply IP resolution, it is unaffected by anything CORS-related. This means that:

1.  **If you have mistakenly configured your `preconnect`s** to use or omit `crossorigin` when you should have actually omitted or used `crossorigin`, the **DNS** step can still be reused—only the **TCP** and **TLS** need discarding and doing again. That said, **DNS** is usually—by far—the fastest part of the process anyway, so speeding it up while missing out on **TCP** and **TLS** isn’t much of an optimisation to celebrate.
2.  **If you have everything configured correctly**, or you aren’t using `preconnect` at all, you’ll actually see the browser reusing the **DNS** resolution for a subsequent request that needs a different CORS mode. If you zoom right in on this abridged waterfall, you’ll see that the second CORS-enabled request to `static.files.bbci.co.uk` doesn’t incur any **DNS** at all: ![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/12/bbc-news-waterfall-dns.png)

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