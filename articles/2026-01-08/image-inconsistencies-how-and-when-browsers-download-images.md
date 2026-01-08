---
title: "Image Inconsistencies: How and When Browsers Download Images"
source: "https://csswizardry.com/2018/06/image-inconsistencies-how-and-when-browsers-download-images/"
publishedDate: "2018-06-12"
category: "css"
feedName: "CSS Wizardry"
---

11 June, 2018

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Background](#background)
2.  [`background-image`](#background-image)
    1.  [What I Would Expect](#what-i-would-expect)
    2.  [What Actually Happens](#what-actually-happens)
    3.  [Summary](#summary)
    4.  [Verdict](#verdict)
3.  [`<img />`](#img-)
    1.  [What I Would Expect](#what-i-would-expect-1)
    2.  [What Actually Happens](#what-actually-happens-1)
    3.  [Summary](#summary-1)
    4.  [Verdict](#verdict-1)
4.  [Key Takeaways](#key-takeaways)
    1.  [The Facts](#the-facts)
    2.  [How Might this Affect You?](#how-might-this-affect-you)

This year, I’ve been working closely with the wonderful [Coingaming](http://coingaming.io/) team out in beautiful [Tallinn](https://www.google.co.uk/search?q=tallinn&safe=off&tbm=isch). We’ve been working pretty hard on making their suite of online products [much faster](https://twitter.com/csswizardry/status/1003881067189800962), and I’ve been the technical consultant leading the project. It’s been an incredibly fun and rewarding engagement, and we’ve made some real business- and customer-facing improvements. One of the key reasons I’ve found the project so fun is that it’s given me a real chance to get very forensic. Naturally, a team should always tackle the low-hanging fruit first, but once that’s done, you get to delve much deeper into the weeds. This blog post comes from there.

## Background

In order to get better control over how a series of thumbnail images are displayed on the homepage of one of their products, the team opted to build them not as `<img />` elements, but as CSS `background-image`s: this allowed them to better size and position the images in their container, and, putting aside any semantic concerns, it made sense from a styling point of view. My only reservation was knowing that, because the images are defined in CSS rather than HTML, their outgoing requests won’t start until the browser has created the Render Tree: it’s not until all the CSS has been downloaded, parsed, and the CSSOM constructed that the browser actually knows This `div` with this class is currently visible on the page and its background is set to be this image: I’d better download it!.

The waterfall below shows the browser waiting for CSSOM completion before it dispatches any requests for any images—you can clearly see that the CSS needs to finish before any images start. This is down to the simple fact that the browser doesn’t know which (if any) images it will need until the CSSOM has been built:

![](https://csswizardry.com/wp-content/uploads/2018/06/waterfall-bg.png)

Waterfall showing that background images cannot be downloaded until CSSOM has completed.

This is too late for such important content of theirs—users want to see the thumbnails as soon as possible.

By moving the images to `<img />` elements (which is also semantically more appropriate), the browser can discover them far sooner—as they become exposed to the browser’s preload scanner—and dispatch their requests before (or in parallel to) CSSOM completion:

![](https://csswizardry.com/wp-content/uploads/2018/06/waterfall-img.png)

Waterfall showing how regular image elements can be downloaded independently of CSSOM construction.

This is stuff we already knew:

1.  Browsers can’t possibly download `background-image`s until they’ve built the CSSOM.
2.  Browsers shouldn’t base—thus delay—the downloading of `<img />`s on CSSOM completion. More on this later…

Where it gets interesting is when I started to wonder how different browsers handle different types of image when they’re visible or not: an `<img />` element with `display: none;` applied to it ideally wouldn’t get downloaded, but the only way the browser would know that the image is indeed hidden is if it waits for CSSOM completion, thus slowing down the default behavior of the `<img />`: what’s going to happen?

* * *

## `background-image`

I will start with `background-image` as that’s what my client’s initial use case was. I feel like the behaviour for `background-image` should be the most predictable as there are certain impossibilities at play (e.g. we can’t download a `background-image` until we’ve built the CSSOM).

### What I Would Expect

I have a couple of expectations (or hopes) that I predict:

1.  Browsers do not (can not) trigger a download for a `background-image` until it knows it needs it (i.e. until the CSSOM has been constructed).
2.  Browsers would not download `background-image` that is applied to an element that is hidden from view (e.g. `display: none;`).

### What Actually Happens

#### Chrome (v67.0.3396.79)

#### Safari (v11.1 (13605.1.33.1.4))

#### Firefox (v60.0.1)

#### Opera (v53.0.2907.68)

#### Edge (v17.17134)

### Summary

**N.B.** _Yes_ or _No_ represents factual information. _✓_ and _✗_ represent what I would consider good/expected and bad/unexpected behaviour, respectively.

 

Chrome

Safari

Firefox

Opera

Edge

**Block on CSSOM**

Yes ✓

Yes ✓

Yes ✓

Yes ✓

Yes ✓

**Download if Invisible**

Yes ✗

No ✓

No ✓

Yes ✗

Yes ✗

### Verdict

**Firefox** and **Safari** seem to have the most preferred behaviour here: they won’t download `background-image`s that they know they won’t need.

**Chrome**, **Opera**, and **Edge** will all download `background-image`s that are applied to invisible elements. This feels wasteful, but I suspect it is a preemptive optimisation to ensure that the image is on the client before the potential event that the element becomes visible. I feel that—if this is the case—this is an optimisation that should be left to the developer.

* * *

## `<img />`

Next, let’s take a look at how browsers handle `<img />`s.

### What I Would Expect

1.  **Browsers will download `<img />` completely independently of CSSOM construction.** Blocking `<img />` on CSSOM construction seems very inefficient, and would lead to delays in downloading content.
2.  **Accordingly, browsers will download `<img />` that end up being hidden from view**, i.e. `display: none;`. If the browser starts downloading `<img />` before CSSOM construction (as I expect) then it has no way of knowing _yet_ whether that image is needed or not.

### What Actually Happens

#### Chrome

#### Safari

#### Firefox

#### Opera

#### Edge

### Summary

**N.B.** _Yes_ or _No_ represents factual information. _✓_ and _✗_ represent what I would consider good/expected and bad/unexpected behaviour, respectively.

 

Chrome

Safari

Firefox

Opera

Edge

**Block on CSSOM**

No ✓

No ✓

Yes ✗

No ✓

No ✓

**Download if Invisible**

Yes ✓

Yes ✓

Yes ✗

Yes ✓

Yes ✓

### Verdict

**Firefox** appears to block `<img />` on CSSOM construction. This seems like a bad idea—no `<img />`s will begin downloading until Firefox has downloaded, parsed, and applied the CSS. This means that if you have blocking stylesheets, they’re blocking your `<img />`. This would be particularly troublesome if `<img />` are key content (think Imgur, Flickr, etc.).

**Firefox** gets weirder still! It waits until it’s constructed the CSSOM before it fires off any `<img />` requests, which means it knows if the `<img />` will be visible or not, but if the `<img />` is invisible, it will download it anyway. This is a double-hit: Firefox blocks `<img />` on CSSOM construction yet still downloads `<img />` that aren’t visible.

* * *

## Key Takeaways

### The Facts

-   **Chrome**, **Opera**, and **Edge** will download `background-image`s that aren’t required for first render. This means that hidden DOM nodes that have a `background-image` applied to them will still have that `background-image` downloaded. **Beware unexpected downloads.**
-   **Firefox** will block `<img />` downloads on CSSOM construction, meaning later-than-expected downloads. **Beware delays.**
-   Further, **Firefox** will still download the `<img />` even if it wasn’t needed. **Beware unexpected downloads.**

### How Might this Affect You?

If you’re a product that relies heavily on content imagery (e.g. Flickr, online publication, photographer) then Firefox will not download any of those images until it’s dealt with your CSS. You should look into preloading any key image content.

If you’re making heavy use of background images and, for whatever reason, are not showing all of them for first render, beware that some browsers will go ahead and download them anyway: you might want to look into better strategies for hidden content (e.g. removal from the DOM rather than `display: none;`).

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