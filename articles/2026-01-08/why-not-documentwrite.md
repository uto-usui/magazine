---
title: "Why Not document.write()?"
source: "https://csswizardry.com/2023/01/why-not-document-write/"
publishedDate: "2023-01-11"
category: "css"
feedName: "CSS Wizardry"
---

10 January, 2023 (last updated on 1 June, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [What Makes Scripts Slow?](#what-makes-scripts-slow)
2.  [The Preload Scanner](#the-preload-scanner)
3.  [`document.write()` Hides Files From the Preload Scanner](#documentwrite-hides-files-from-the-preload-scanner)
    1.  [What About Async Snippets?](#what-about-async-snippets)
4.  [`document.write()` Executes Synchronously](#documentwrite-executes-synchronously)
5.  [Is It All Bad?](#is-it-all-bad)
    1.  [Early `document.write()`](#early-documentwrite)
    2.  [Late `document.write()`](#late-documentwrite)
6.  [It Gets Worse…](#it-gets-worse)
7.  [Avoid `document.write()`](#avoid-documentwrite)

If you’ve ever run a Lighthouse test before, there’s a high chance you’ve seen the audit [Avoid `document.write()`](https://developer.chrome.com/docs/lighthouse/best-practices/no-document-write/):

![](https://csswizardry.com/wp-content/uploads/2023/01/lighthouse.png)

For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds.

You may have also seen that there’s very little explanation as to _why_ `document.write()` is so harmful. Well, the short answer is:

**From a purely performance-facing point of view, `document.write()` itself isn’t that special or unique.** In fact, all it does is surfaces potential behaviours already present in any synchronous script—the only main difference is that `document.write()` guarantees that these negative behaviours will manifest themselves, whereas other synchronous scripts can make use of alternate optimisations to sidestep them.

**N.B.** Happily, nothing about `document.write()` specifically will impact Interaction to Next Paint. Only if the JavaScript itself is particularly problematic or expensive will you suffer poor INP scores. If you are struggling with INP, let’s organise a [workshop](https://csswizardry.com/workshops/)!

**N.B.** This audit and, accordingly, this article, only deals with script injection using `document.write()`—not its usage in general. [The MDN entry for `document.write()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) does a good job of discouraging its use.

## What Makes Scripts Slow?

There are a number of things that can make regular, synchronous scripts[1](#fn:1) slow:

1.  Synchronous JS **can** block DOM construction while the file is downloading.
    -   The belief that synchronous JS blocks DOM construction is only true in certain scenarios.
2.  Synchronous JS **always** blocks DOM construction while the file is executing.
    -   It runs in-situ at the exact point it’s defined, so anything defined after the script has to wait.
3.  Synchronous JS **never** blocks downloads of subsequent files.
    -   This has been true for [almost 15 years](https://www.stevesouders.com/blog/2008/03/10/ie8-speeds-things-up/) at the time of writing, yet still remains a common misconception among developers. This is closely related to the first point.

The worst case scenario is a script that falls into both (1) and (2), which is more likely to affect scripts defined earlier in your HTML. `document.write()`, however, forces scripts into both (1) and (2) regardless of when they’re defined.

## The Preload Scanner

The reason scripts never block subsequent downloads is because of something called the _Preload Scanner_. The Preload Scanner is a secondary, inert, download-only parser that’s responsible for running down the HTML and asynchronously requesting any available subresources it might find, chiefly anything contained in `src` or `href` attributes, including images, scripts, stylesheets, etc. As a result, files fetched via the Preload Scanner are parallelised, and can be downloaded asynchronously alongside other (potentially synchronous) resources.

The Preload Scanner is decoupled from the primary parser, which is responsible for constructing the DOM, the CSSOM, running scripts, etc. This means that a large majority of files we fetch are done so asynchronously and in a non-blocking manner, including some synchronous scripts. This is why not all blocking scripts block during their download phase—they may have been fetched by the Preload Scanner before they were actually needed, thus in a non-blocking manner.

The Preload Scanner and the primary parser begin processing the HTML at more-or-less the same time, so the Preload Scanner doesn’t really get much of a head start. This is why early scripts are more likely to block DOM construction during their download phase than late scripts: the primary parser is more likely to encounter the relevant `<script src>` element while the file is downloading if the `<script src>` element is early in the HTML. Late (e.g. at-`</body>`) synchronous `<script src>`s are more likely to be fetched by the Preload Scanner while the primary parser is still hung up doing work earlier in the page.

Put simply, scripts defined earlier in the page are more likely to block on their download than later ones; later scripts are more likely to have been fetched preemptively and asynchronously by the Preload Scanner.

## `document.write()` Hides Files From the Preload Scanner

Because the Preload Scanner deals with tokeniseable `src` and `href` attributes, anything buried in JavaScript is invisible to it:

```
<script>
  document.write('<script src=file.js><\/script>')
</script>
```

This is not a reference to a script; this is a string in JS. This means that the browser can’t request this file until it’s actually run the `<script>` block that inserts it, which is very much just-in-time (and too late).

**`document.write()` forces scripts to block DOM construction during their download by hiding them from the Preload Scanner.**

### What About Async Snippets?

Async snippets such as the one below suffer the same fate:

```
<script>
  var script = document.createElement('script');
  script.src = 'file.js';
  document.head.appendChild(script);
</script>
```

Again, `file.js` is not a filepath—it’s a string! It’s not until the browser has run this script that it puts a `src` attribute into the DOM and can then request it. The primary difference here, though, is that scripts injected this way are asynchronous by default. Despite being hidden from the Preload Scanner, the impact is negligible because the file is implicitly asynchronous anyway.

That said, [async snippets are still an anti-pattern](https://csswizardry.com/2022/10/speeding-up-async-snippets/)—don’t use them.

## `document.write()` Executes Synchronously

`document.write()` is almost exclusively used to conditionally load a synchronous script. If you just need **a blocking script**, you’d use a simple `<script src>` element:

```
<script src=file.js></script>
```

If you needed to **conditionally load an asynchronous script**, you’d add some `if`/`else` logic to your async snippet.

```
<script>

  if (condition) {
    var script = document.createElement('script');
    script.src = 'file.js';
    document.head.appendChild(script);
  }

</script>
```

If you need to **conditionally load a synchronous script**, you’re kinda stuck…

Scripts injected with, for example, `appendChild` are, per the spec, asynchronous. If you need to inject a synchronous file, one of the only straightforward options is `document.write()`:

```
<script>

  if (condition) {
    document.write('<script src=file.js><\/script>')
  }

</script>
```

This guarantees a synchronous execution, which is what we want, but it also guarantees a synchronous fetch, because this is hidden from the Preload Scanner, which is what we don’t want.

**`document.write()` forces scripts to block DOM construction during their execution by being synchronous by default.**

## Is It All Bad?

The location of the `document.write()` in question makes a huge difference.

Because the Preload Scanner works most effectively when it’s dealing with subresources later in the page, `document.write()` earlier in the HTML is less harmful.

### Early `document.write()`

```
<head>

  ...

  <script>
    document.write('<script src=https://slowfil.es/file?type=js&delay=1000><\/script>')
  </script>

  <link rel=stylesheet href=https://slowfil.es/file?type=css&delay=1000>

  ...

</head>
```

If you put a `document.write()` as the very first thing in your `<head>`, it’s going to behave the exact same as a regular `<script src>`—the Preload Scanner wouldn’t have had much of a head start anyway, so we’ve already missed out on the chance of an asynchronous fetch:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/01/document.write-early.png)

`document.write()` as the first thing in the `<head>`. [FCP is at 2.778s.](https://www.webpagetest.org/result/230105_BiDcK7_9F1/2/details/)

Above, we see that the browser has managed to parallelise the requests: the primary parser ran and injected the `document.write()`, while the Preload Scanner fetched the CSS.

Owing to CSS’ _Highest_ priority, it will always be requested before _High_ priority JS, regardless of where each is defined.

If we replace the `document.write()` with a simple `<script src>`, we’d see the exact same behaviour, meaning in this specific instance, `document.write()` is no more harmful than a regular, synchronous script:

```
<head>

  ...

  <script src=https://slowfil.es/file?type=js&delay=1000></script>

  <link rel=stylesheet href=https://slowfil.es/file?type=css&delay=1000>

  ...

</head>
```

This yields an identical waterfall:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/01/sync.png)

Using a syncrhonous `<script src>` instead of `document.write()`. [FCP is at 2.797s.](https://www.webpagetest.org/result/230105_BiDcV4_9EY/4/details/)

Because the Preload Scanner was unlikely to find either variant, we don’t notice any real degradation.

### Late `document.write()`

```
<head>

  ...

  <link rel=stylesheet href=https://slowfil.es/file?type=css&delay=1000>

  <script>
    document.write('<script src=https://slowfil.es/file?type=js&delay=1000><\/script>')
  </script>

  ...

</head>
```

Because JS can write/read to/from the CSSOM, all browsers will halt execution of any synchronous JS if there is any preceding, pending CSS. In effect, [CSS blocks JS](https://csswizardry.com/2018/11/css-and-network-performance/#dont-place-link-relstylesheet--before-async-snippets), and in this example, serves to hide the `document.write()` from the Preload Scanner.

Thus, `document.write()` later in the page does become more severe. Hiding a file from the Preload Scanner—and only surfacing it to the browser the exact moment we need it—is going to make its entire fetch a blocking action. And, because the `document.write()` file is now being fetched by the primary parser (i.e. the main thread), the browser can’t complete any other work while the file is on its way. Blocking on top of blocking.

As soon as we hide the script file from the Preload Scanner, we notice drastically different behaviour. By simply swapping the `document.write()` and the `rel=stylesheet` around, we get a much, much slower experience:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/01/document.write.png)

`document.write()` late in the `<head>`. [FCP is at 4.073s.](https://www.webpagetest.org/result/230105_BiDcVM_9EX/5/details/)

Now that we’ve hidden the script from the Preload Scanner, we lose all parallelisation and incur a much larger penalty.

## It Gets Worse…

The whole reason I’m writing this post is that I have a client at the moment who is using `document.write()` late in the `<head>`. As we now know, this pushes both the fetch and the execution on the main thread. Because browsers are single-threaded, this means that not only are we incurring network delays (thanks to a synchronous fetch), we’re also leaving the browser unable to work on anything else for the entire duration of the script’s download!

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/01/cpu.png)

The main thread goes completely silent during the injected file’s fetch. This doesn’t happen when files are fetched from the Preload Scanner.

## Avoid `document.write()`

As well as exhibiting unpredictable and buggy behaviour as keenly stressed in the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) and [Google articles](https://developer.chrome.com/blog/removing-document-write/), `document.write()` is slow. It guarantees both a blocking fetch and a blocking execution, which holds up the parser for far longer than necessary. While it doesn’t introduce any new or unique performance issues per se, it just forces the worst of all worlds.

**Avoid `document.write()` (but at least now you know why).**

* * *

1.  `<script src=></script>` [↩](#fnref:1)
    

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