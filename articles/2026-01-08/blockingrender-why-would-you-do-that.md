---
title: "blocking=render: Why would you do that?!"
source: "https://csswizardry.com/2024/08/blocking-render-why-whould-you-do-that/"
publishedDate: "2024-08-14"
category: "css"
feedName: "CSS Wizardry"
---

14 August, 2024

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [What is `blocking=render`?](#what-is-blockingrender)
2.  [Blocking Status](#blocking-status)
    1.  [Blocking Files](#blocking-files)
    2.  [`async`, `defer`, and `type=module`](#async-defer-and-typemodule)
3.  [Blocking Web Fonts](#blocking-web-fonts)
4.  [A/B Testing and Experimentation](#ab-testing-and-experimentation)
5.  [tl;dr](#tldr)

WebKit have recently announced their [intent to implement](https://github.com/WebKit/WebKit/pull/32022) the `blocking=render` attribute for `<script>` and `<style>` elements, bringing them in line with support already available in [Blink](https://issues.chromium.org/issues/40205664) and [generally positive sentiment in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1751383).

The `blocking=render` attribute allows developers to explicitly mark a resource as render blocking, but… why on earth would you want to do that?!

The short answer is: **generally, you wouldn’t**. Unless you _know_ you need this behaviour, you don’t need it.

But how do you know if you do need it? Read on…

## What is `blocking=render`?

The spec says:

> A blocking attribute explicitly indicates that certain operations should be blocked on the fetching of an external resource. The operations that can be blocked are represented by possible blocking tokens, which are strings listed by the following table \[…\]  
> — [2.5.8 Blocking attributes](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#blocking-attributes)

Currently, there is only one token specified: `render`. The spec is extensible so that other values could be added as the need arises—[potential scenarios that have been discussed](https://gist.github.com/xiaochengh/fae2b549b3d37454beeb9028a829f4bd#other-operations-to-blockunblock-on) include `parse`, `load`, and even a negation to encourage the opposite, such as `blocking=!render`.

## Blocking Status

Generally speaking, when loading resources into web pages, there are three possible blocking states:

1.  **Non-blocking:** From a performance perspective, this is the most desirable. The resource is fetched and processed asynchronously while the browser is free to work on whatever other tasks there may be. The two key tasks that are not blocked are _rendering_ and _parsing_.
2.  **Render blocking:** The next-best option for the performance conscious is render blocking. Files that are render blocking prohibit the browser from presenting the page, but do permit the browser to at least construct it.
3.  **Parser blocking:** The worst case scenario is a file that prevents the browser from even building the page. All parsing and rendering is blocked while the resource is fetched. Files that are parser blocking are inherently also render blocking—the browser can’t present a page that it can’t even construct.

Visually, this is how that process looks for each scenario:

![Comparison of non-blocking, render-blocking, and parser-blocking resources in web performance. A visual breakdown of how different loading strategies affect rendering, parsing, and blocking behaviour in the browser.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2024/08/blocking-status.png)

A non-, render-, and parser-blocking file in an HTML document. Imagine the downloading file (pink) is in the `<head>`—even though you can never see `<head>` tags or their children, they still get rendered just like any other HTML, they’re just set to `display: none;`. That said, these diagrams also apply to a downloading file (pink) that is in the middle of the `<body>`. HTML is parsed line-by-line and is very predictable. We ❤️ HTML.

### Blocking Files

The two main file types that impact the blocked status of a web page are stylesheets and scripts. In their default states:

-   `<link rel=stylesheet href=app.css>`: This will block the rendering of subsequent content, but not its parsing. The browser is free to continue parsing the HTML and building out the DOM, but cannot display any of it until `app.css` is fully fetched and parsed. **Stylesheets are render blocking.**
-   `<script src=app.js></script>` This will block parsing (and therefore also rendering) of subsequent content. The browser may not parse or construct any DOM until `app.js` is fully fetched and parsed, at which point it now has two tasks ahead of it: build the DOM and render it. **Scripts are parser blocking.**

All other file types are, by default, non-blocking.

The pedant in me wants to point out that even inline `<script>` and `<style>` are still technically parser blocking. Colloquially, we refer to them as non-blocking, but even for the handful of milliseconds that the browser is parsing either the JS or CSS contained in them, it’s blocked from doing anything else.

### `async`, `defer`, and `type=module`

Without going into too much detail, the presence of any of these attributes on a `<script>` will cause it to fall into the first camp: non-blocking. Therefore, `<script>`s can occupy either extreme: non-blocking, the fastest option; or parser blocking, the slowest option.

**The primary use-case for `blocking=render` is to grant `<script>`s access to the middle option: render- but not parser-blocking.**

Let’s look at two examples of putting `blocking=render` to use.

## Blocking Web Fonts

I wrote this entire section before [Ryan Townsend](https://twnsnd.com/) pointed out that `blocking` specifically for `rel=preload` was [removed from the spec](https://github.com/whatwg/html/issues/7896). I’m keeping the following for posterity, but this does not currently work in any implementation.

This is one of the least compelling examples, in my opinion. Also, for this to work, the `blocking` attribute needs specifying for `<link>` elements, which is currently only possible in Blink. But let’s take a look anyway…

Imagine you’ve built a simple countdown or stopwatch app:

![A digital stopwatch running an HTML file, displaying ‘00:51’ in large green text before unceremoniously changing its typeface and continuing to count down.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2024/08/foft.gif)

The change from fallback font to web font causes a very noticeable change in UI. This might be unacceptable.

Given a UI such as this, even with the best will in the world, the switch from any fallback font to the intended web font is quite a leap. Is it _too much_? If you decide it is, you could block on the `preload` of that font (if you were `preload`ing it in the first place). That would look like this:

```
<link rel=preload
      as=font
      href=font.woff2
      crossorigin
      blocking=render>
```

Typically, I would strongly recommend not blocking rendering on web fonts. Using the relevant `font-display` to ensure that text can render as soon as possible is almost always the correct thing to do: reading something in the ‘wrong’ font is better than reading nothing at all.

However, in scenarios where a flash of fallback font (FOFT) might be particularly jarring—or create severe layout shifts—then perhaps waiting on the web font might (_might_) be the right thing to do. Maybe. I’m not actively recommending it.

Note that almost the exact same behaviour could be achieved by adding `font-display: block;` to the relevant `@font-face` rule, but `blocking=render` provides would have provided two distinct additions:

1.  `font-display: block;` will time out after three seconds, whereas `blocking=render` has no such timeout. In that sense, it’s much more aggressive.
2.  `font-display: block;` will still render the current UI, only without text—a flash of invisible text (FOIT). `blocking=render` won’t render anything at all.

If a web font _is_ your content (which, for 99.999% of you, it isn’t), you might want to maybe use `blocking=render`. But even then, I wouldn’t.

Interestingly, Chrome exhibits `blocking=render`\-style behaviour on web-font `preload`s already. It’s non-standard behaviour, but Chrome [will make font preloads block rendering until they finish or until a timeout](https://chromestatus.com/feature/5087982807154688). This is already happening and you don’t need `blocking=render`.[1](#fn:1)

## A/B Testing and Experimentation

`blocking=render`’s application in client-side A/B testing is, for me, its most compelling use-case.

Client-side A/B testing tools work by altering the DOM and presenting a variant of a component to a user. In order for this to work, the original DOM must already be constructed (you can’t alter a DOM if you don’t have one), so there’s an aspect of doing the work twice. A problem arises if and when a user actually _sees_ that work happening twice. It’s a jarring experience to see one version of a hero change to something completely different in front of your eyes, and it may even influence the outcome of the experiment itself.

To circumvent this, many A/B testing tools implement what is known as an anti-flicker snippet. They deliberately hide the page (visually) until the variants have been constructed, or a timeout is met—whichever happens sooner.

This is the anti-flicker snippet from the [now defunct](https://support.google.com/analytics/answer/12979939?hl=en) Google Optimize.

```
<!-- Anti-Flicker Snippet -->
<style>
  .async-hide { opacity: 0 !important }
</style>

<script>
  (function(a,s,y,n,c,h,i,d,e) {
    s.className+=' '+y;
    h.start=1*new Date;
    h.end=i=function(){
      s.className=s.className.replace(RegExp(' ?'+y),'')
    };
    (a[n]=a[n]||[]).hide=h;
    setTimeout(function(){i();h.end=null},c);
    h.timeout=c;
  });
  (window, document.documentElement, 'async-hide', 'dataLayer', 4000, {'GTM-XXXXXX':true});
</script>
```

This snippet works by applying the class `async-hide` to the `<html>` element (`document.documentElement`). This aggressively sets `opacity: 0;` so that the page is rendered, only invisibly. The class is then removed either when the A/B tool’s work is done, or a `4000`ms timeout is reached—whichever is first.

One immediate failing with this is that an invisible page is still interactive, and users could still click on or interact with elements inadvertently. The page _is_ rendered, but invisibly. `blocking=render` ensures that the page is not rendered at all, and therefore can’t be interacted with.

Another problem is that we’re going through more paint cycles than we need to: paint the page invisibly, modify it, paint it again visibly… It would be nicer to hold off painting anything at all until we have all of the relevant information about what to paint. `blocking=render` gives us this ability.

A further issue is the big-reveal phenomenon: with an anti-flicker snippet, the page is totally invisible until it’s totally visible. Behind the `opacity: 0;`, there may well have been a progressive render of the page—which is a familiar and good user experience—but a user didn’t benefit from it. Anti-flicker snippets eschew this behaviour and take an all-or-nothing approach: nothing, nothing, nothing, _everything_.

![Progressive rendering sequence of a webpage displaying a web performance consultancy service. The timeline from 0.8s to 1.7s shows how content and images load incrementally, highlighting the impact of rendering delays.](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2024/08/anti-flicker.png)

A regular, progressive render (top) versus an anti-flicker big-reveal (bottom). Which do you think is the better experience?

`blocking=render` leaves the browser to its usual rendering process, so we can still get a progressive render of the page, only now we do it in a way more akin to loading a CSS file.

Finally, and this is counter to my own preferences and beliefs as a performance engineer, we still risk leaking the experiment to the user when using an anti-flicker snippet. Knowingly hiding a page for up to four seconds feels like insanity to me, but at least we do have a timeout. The problem with anti-flicker snippets is that if that four-second timeout is reached, we’ll still display the page even if experiments haven’t completed—the `4000`ms is a magic number that we use to hopefully win a race condition.

By using `blocking=render`, that timeout now becomes [governed by the browser’s own heuristics](https://github.com/whatwg/html/issues/7131#footnote2), which is almost definitely going to be longer than four seconds. While that does terrify me, it does guarantee we don’t paint anything _too_ soon. No more race conditions, but a potentially longer render-blocked period.

As I said at the top of the article, most of us won’t need `blocking=render`, and those of us who do will know that we do.

## tl;dr

One handy takeaway is that, at present, `blocking=render` would cause any of the following:

-   `<script src async></script>`
-   `<script src defer></script>`
-   `<script src type=module></script>`
-   `<script type=module>...</script>`

…to behave like this:

-   `<link rel=stylesheet href>`

* * *

1.  [x.com/kurtextrem/status/1823698340388782591](https://x.com/kurtextrem/status/1823698340388782591) [↩](#fnref:1)
    

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