---
title: "The Ultimate Low-Quality Image Placeholder Technique"
source: "https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/"
publishedDate: "2023-09-29"
category: "css"
feedName: "CSS Wizardry"
---

28 September, 2023 (last updated on 5 September, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Low-Quality Image Placeholders](#low-quality-image-placeholders)
2.  [Core Web Vitals and Largest Contentful Paint](#core-web-vitals-and-largest-contentful-paint)
3.  [Largest Contentful Paint Caveats](#largest-contentful-paint-caveats)
4.  [Don’t Upscale Your LQIP](#dont-upscale-your-lqip)
    1.  [Calculating the Upscaling Penalty](#calculating-the-upscaling-penalty)
5.  [Aim for a Minimum of 0.05BPP](#aim-for-a-minimum-of-005bpp)
6.  [LQIP and BPP Calculator](#lqip-and-bpp-calculator)
7.  [Implementing Low-Quality Image Placeholders](#implementing-low-quality-image-placeholders)
    1.  [Use an Image Transformation Service](#use-an-image-transformation-service)
    2.  [Use Your Judgement](#use-your-judgement)
8.  [Verifying It Works](#verifying-it-works)
9.  [Summary](#summary)

At the time of writing, [99.9%](https://almanac.httparchive.org/en/2022/media#images) of pages on the web include at least one image. The median image-weight per page landed at [881KB in 2022](https://almanac.httparchive.org/en/2022/page-weight#fig-13), which is more than HTML, CSS, JS, and fonts combined! And while images do not block rendering (unless you do [something silly](https://csswizardry.com/2017/02/base64-encoding-and-performance/)), it’s important to consider how we offer a reasonably pleasant experience while users are waiting for images to load. One solution to that problem is _Low-Quality Image Placeholders_.

## Low-Quality Image Placeholders

Low-Quality Image Placeholders are nothing new. [Guy Podjarny](https://twitter.com/guypod) is responsible, I _think_, for [coining the term over a decade ago](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)! And before that, we even had the `lowsrc` attribute for `<img>` elements:

```
<img lowsrc=lo-res.jpg src=hi-res.jpg alt>
```

I wish we’d never [deprecated `lowsrc`](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features)—it would have saved us so much hassle in the long run.

The technique is simple: as images are typically heavier and slower resources, and they don’t block rendering, we should attempt to give users something to look at while they wait for the image to arrive. The solution? Show them a low-quality image placeholder, or _LQIP_.

The upshot is that the user knows that _something_ is happening, and, ideally, they should have roughly some idea _what_ is happening—after all, we want our LQIP to somewhat resemble the final image.

## Core Web Vitals and Largest Contentful Paint

While LQIP isn’t a new subject at all, [Core Web Vitals](https://csswizardry.com/2023/07/core-web-vitals-for-search-engine-optimisation/) and [Largest Contentful Paint](https://csswizardry.com/2022/03/optimising-largest-contentful-paint/) are, and unfortunately, they don’t necessarily get along so well…

If your LCP candidate is an image (whether that’s a `background-image` or an `<img>` element), it’s going to be somewhat slower than if your LCP candidate was a text node, and while [making image-based LCPs fast](https://csswizardry.com/2022/03/optimising-largest-contentful-paint/) isn’t impossible, it is harder.

Using an LQIP while we wait for our full-res LCP candidate certainly fills a user-experience gap, but, owing to certain rules and restrictions with LCP as a spec (more on that later), it’s unlikely to help our LCP scores.

When the full resolution image eventually arrives, it’s likely that that image will be counted as your LCP, and not your LQIP:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/separate-events.png)

It would be nice to have a scenario whereby your LQIP _does_ meet requirements for consideration as LCP, leading to sub-2.5s scores, but also load in a high resolution soon after, thus improving the user experience. The best of both worlds:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/same-event.png)

Is that even possible? Let’s find out…

## Largest Contentful Paint Caveats

There is some important nuance that we should be aware of before we go any further. There are quite a few moving parts when it comes to how and when your LCP candidates are captured, when they’re updated, and which candidate is ultimately used.

Chrome keeps taking new LCP candidates right up until a user interacts with the page. This means that if an `<h1>` is visible immediately, a user scrolls, then a larger `<img>` arrives moments after, the `<h1>` is your LCP element for that page. If a user doesn’t interact in that short window, a new entry is captured, and now the `<img>` is your LCP element. Notice below how our `<h1>` is momentarily considered our LCP candidate at **1.0s**, before ultimately being replaced by the `<img>` at **2.5s**:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-h1.png)

Blue shading shows an LCP candidate; green shading and/or a red border shows the actual LCP element and event. [(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-h1.png)

The key takeaway here is that **Chrome keeps looking for new LCP candidates**, and the moment it finds anything larger, it uses that.

What if Chrome finds a later element of the _same_ size? Thankfully, Chrome will not consider new elements of the same size as the previously reported LCP candidate. That protects us in situations like this:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-grid.png)

Things like image grids are measured on their first image, not their last. This is great news. [(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-grid.png)

Note that at **1.4s** we get our LCP event in full. When the other eight images arrive at **2.0s**, they make no difference to our score.

This all seems straightforward enough—Chrome keeps on looking for the largest element and then uses that, right? And it doesn’t necessarily spell bad news for our LQIP either. As long as our final image is the same dimensions as the LQIP was…?

Not quite. There’s some subtle complexity designed to prevent people gaming the system, which is exactly what we’re trying to do.

**Warning:** It is imperative that you still provide a great user experience. Passing LCP for metrics’ sake is unwise and against the spirit of web performance. Ensure that your LQIP is still of sufficient quality to be useful, and follow it up immediately with your full-quality image. Poor quality images, particularly where ecommerce is concerned, are [especially harmful](https://www.businesswire.com/news/home/20230517005168/en/Cloudinary-Global-E-Commerce-Survey-Reveals-Visual-Content-Can-Help-Reduce-Returns-by-One-Third).

## Don’t Upscale Your LQIP

Each image in the tests so far has been a 200×200px `<img>` displayed at 200×200px:

```
<img src=https://dummyimage.com/200/000/fff.png?2&text=200@200
     width=200 height=200 alt>
```

Which is this, coming at 2KB:

![](https://dummyimage.com/200/000/fff.png?2&text=200@200)

What if we change the `<img>` to 100×100px displayed at 200×200px, or _upscaled_?

```
<img src=https://dummyimage.com/100/000/fff.png?4&text=100@200
     width=200 height=200 alt>
```

Which comes in at 1.4KB:

![](https://dummyimage.com/100/000/fff.png?4&text=100@200)

Already, you can see the loss in quality associated with upscaling this image.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-upscaled.png)

Upscaled images will be discounted against higher-resolution ones. [(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-upscaled.png)

Above, we see that we log a candidate at **1.5s**, but the second image at **2.0s** becomes our LCP despite being rendered at the exact same size!

And there is the nuance. Chrome doesn’t want to reward a poor experience, so simply serving a tiny image and displaying it much larger will not help your LCP scores if a denser image turns up later on. And I agree with this decision, for the most part.

The first takeaway is: **don’t upscale your LQIP**.

### Calculating the Upscaling Penalty

Let’s get a bit more detailed about upscaling and penalties. Some [close reading of the spec](https://www.w3.org/TR/largest-contentful-paint/#sec-add-lcp-entry) tells us exactly how this works. It’s not the easiest thing to digest, but I’ll do my best to distil it for you here. The reported `area` of your LCP element is calculated as:

**`area = size × penaltyFactor`**

Where:

-   **`size`** is the area of the LCP candidate currently in the viewport and not cropped or off-screen.
-   **`penaltyFactor`** is the factor by which upscaling will count against us, given by `min(displaySize, naturalSize) / displaySize`, where:
    -   **`naturalSize`** is the pixel area of the image file in question.
    -   **`displaySize`** is the pixel area that the image will be rendered, regardless of how much of it is currently on-screen.

In full:

`area = size × min(displaySize, naturalSize) / displaySize`

Imagine we took a large landscape image, downscaled it to a predetermined height, and then displayed it, cropped, as a square:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-spec.png)

In the above diagram, _a_ is `naturalSize`, _b_ is `displaySize`, and _c_ is `size`.

For the sake of ease, let’s assume your LCP candidate is always fully on-screen, in-viewport, and not cropped (if you have known and predictable cropping or off-screen image data, you can adjust your maths accordingly). This means that `size` and `displaySize` are now synonymous.

Let’s say we have a 400×400px image that is **downscaled** to 200×200px. Its area would be calculated as:

`200 × 200 × min(200 × 200, 400 × 400) / (200 × 200) =` **`40,000`**

Thus the LCP’s reported size would be 40,000px2:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-devtools-upscaled-01.png)

[(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-devtools-upscaled-01.png)

If we were to use a 100×100px image and **upscale** it to 200×200px, our equation looks a little different:

`200 × 200 × min(200 × 200, 100 × 100) / (200 × 200) =` **`10,000`**

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-devtools-upscaled-02.png)

[(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lcp-devtools-upscaled-02.png)

This image’s reported area is significantly smaller, despite being rendered at the exact same size! This means that any subsequent images of a higher quality may well steal our LCP score away from this one and to a much later time.

Even if we used a 199×199px LQIP, we’d still register a new LCP the moment our full quality image arrives:

`200 × 200 × min(200 × 200, 199 × 199) / (200 × 200) =` **`39,601`**

That all got pretty academic, but my advice is basically: **if you want your LQIP to be considered as your LCP, do not upscale it.** If you do upscale it, your reported area will come back smaller than you might expect, and thus the later, high resolution image is likely to ‘steal’ the LCP score.

**N.B.** Thankfully, none of the specs take device pixels or pixel densities into account. It’s CSS pixels all the way down.

## Aim for a Minimum of 0.05BPP

The second restriction we need to get around is the [recently announced](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md) bits per pixel (BPP) threshold. Again, to stop people gaming the system, Chrome decided that only images of a certain quality (or _entropy_) will be considered as your LCP element. This prevents people using incredibly low quality images in order to register a fast LCP time:

> That heuristic discounts paints which are not contentful, but just serve as backgrounds or placeholders for other content.
> 
> This change extends that heuristic to other images as well, when those images have very little content, when compared to the size at which they are displayed.  
> — [Largest Contentful Paint change in Chrome 112 to ignore low-entropy images](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md)

This one is much simpler to make sense of. In order for an image to be counted as an LCP candidate, it needs to contain at least 0.05 bits of data per pixel displayed.

Note that this applies to the image’s displayed size and not its natural size:

> Controls whether LCP calculations should exclude low-entropy images. If enabled, then the associated parameter sets the cutoff, expressed as the minimum number of bits of encoded image data used to encode each rendered pixel. **Note that this is not just pixels of decoded image data; the rendered size includes any scaling applied by the rendering engine to display the content.**  
> — [features.cc](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/features.cc;l=749)

A 200×200px image has 40,000 pixels. If we need 0.05 bits of data for each pixel, the image needs to be at least 2,000 bits in size. To get that figure in Kilobytes, we simply need to divide it by 8,000: 0.25KB. That’s tiny!

A 1024×768px image?

`(1024 × 768 × 0.05) / 8000 =` **`4.9152KB`**

720×360px?

`(720 × 360 × 0.05) / 8000 =` **`1.62KB`**

That was much less academic, but my advice is basically: **if you want your LQIP to ever be considered as your LCP, make sure it contains enough data**.

To err on the side of caution, I go by a BPP figure of 0.055. Honestly, the filesizes you’re aiming for are so small at this point that you’ll probably struggle to get as low as 0.055BPP anyway, but it just seems wise to build in 10% of buffer in case any intermediaries attempt to compress your images further. (This should actually be impossible because you’re serving your images over HTTPS, right?)

## LQIP and BPP Calculator

That’s a lot of specs and numbers. Let’s try make it all a little easier. I’ve built this simplified calculator to help you work out the mathematically smallest possible LCP candidate. It is this image that becomes your LQIP.

Your LQIP should be **1,440**×**810**px (**1,166,400px2**), and should have a filesize no smaller than **8.019KB**.

Using the exact same calculator you’re playing with right now, I plugged in [my homepage’s](https://csswizardry.com/) numbers and rebuilt my LCP. I managed to get my LQIP–LCP down to just **1.1s** on a 3G connection.

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/csswizardry.com-lcp.jpg)

Note that my `<h1>` and a `<p>` are initially flagged as candidates before Chrome finally settles on the image. [(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/csswizardry.com-lcp.jpg)

And from a cold cache, over train wifi as I was writing this post, I got a 2.1s LCP score on desktop!

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/train-lcp.png)

[(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/train-lcp.png)

## Implementing Low-Quality Image Placeholders

My implementation becomes incredibly simple as I’m using a background image. This means I can simply layer up the progressively higher-resolution files using CSS’ multiple backgrounds:

```
<head>

  ...

  <link rel=preload as=image href=lo-res.jpg fetchpriority=high>

  ...

</head>
<body>

  <header style="background-image: url(hi-res.jpg),
                                   url(lo-res.jpg)">
    ...
  </header>

</body>
```

1.  As `background-image` is [hidden from the preload scanner](https://csswizardry.com/2022/03/optimising-largest-contentful-paint/#background-image-url), I’m `preload`ing the LQIP (`lo-res.jpg`) so that it’s already on its way before the parser encounters the `<header>`.
    -   Note that I’m not `preload`ing `hi-res.jpg`—we don’t want the two images to race each other, we want them to arrive one after the other.
2.  Once the parser reaches the `<header>`, the request for `hi-res.jpg` is dispatched.
    -   At this point, if it’s fully fetched, we can render `lo-res.jpg` as the `<header>`’s background.
    -   If `lo-res.jpg` isn’t ready yet, we’d fall back to a `background-color` or similar while we wait.
3.  As `lo-res.jpg` is guaranteed to arrive first (it was requested much earlier and is much smaller in file-size), it gets displayed first.
4.  Once `hi-res.jpg` arrives, whenever that may be, it takes the place of `lo-res.jpg`, switching out automatically.

[My _very specific_ implementation](https://github.com/csswizardry/csswizardry.github.com/blob/5f0174b35bbb4cb7761d783291f0fdda3323521b/css/isolated/components.page-head--masthead.scss) is more complex and nuanced than that (it’s responsive and I also use a super low-resolution Base64 placeholder that’s far too small to be considered an LCP candidate), but that’s the main technique in a few lines. My layers look like this:

![](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lqip-lcp.gif)

[(View full size)](https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2023/09/lqip-lcp.gif)

1.  The very first frame is **810 bytes** of 16×11px Base64 image, _far_ too small to qualify for LCP, and _massively_ upscaled: ![](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAAsAEAMBEQACEQEDEQH/xACAAAEBAQAAAAAAAAAAAAAAAAAICQoQAAAEBAUEAQUAAAAAAAAAAAMEBQYBAhMUBxIVFhcACAkkERgjJTdDAQADAQAAAAAAAAAAAAAAAAAHCAkGEQAABAUCAwcEAwAAAAAAAAABAgMEBhESExQFBwAVIwgWFyEiJDMxMkJDNEFR/9oADAMBAAIRAxEAPwDP12CsRLfmKpRpN7FZ6ok7kxPHIoiWbLlCyQvgFTI6tKWeSihwEUEcgspheMBBwYyyZBBYhTS5YRg6O3m4ei7fQrF0dEjLWmLNukNo7Vgmcz1c4uBQTTIqIpkdCc5VyFUOBDAcxREtEzV42T1KEND2/ibX1ojiNJu11ZyKTZqk2kc1XoUXE5TmKLg4lIAmEqQmrAhpgPD872MFxcADY5d2dyb4TRXcArubaCHq72buHpsQ7EQ5hxOvmicTyhscsfKlJRjMJBjAEwU88YzRm6KPZ47TCMd7RpljeO3ejbg6UgRu+W1Fskcj1e2UwvG+EmQBQVERLScEzFUAwGD7RMUtrtf0OM4AePIiiGLmcSaaUCulk0UnKKhlCVFVTstxEqJhAxSgsKavp8wH68Sm8SV79RRyjy/bUGpqHF+gafa7sb37YvvyvE1fLqume5b/AD/Kp0kz3H8MH9/Bu5xrWfexrmMr8Nnp8wpnh5ntsi3+yniWGx9zO1WjK/qdmij8v5df6p/FR536fxnwpPK9pXJTiteXaO9X9a095fFfOk1dp6x715Wz67eetmt6f2qXWm7OuD4R6lLkWdlpzxMvvHO0pbyp+0xaZ4tHTtXMnq08HN7id2HV3m96+aXLsnMnSaU7fSs/5X6JVVefH//Z)
2.  The second frame is a [**24KB** image](https://csswizardry.com/img/css/masthead-large-lqip.jpg) that is both my LQIP _and_ my LCP.
3.  The third and final frame is the full-resolution, [**160KB** image](https://csswizardry.com/img/css/masthead-large.jpg).

The `background-image` method only works if images are decorational. If your image _is_ content (e.g. it’s a product image), then semantically, a `background-image` won’t be good enough. In this case, you’ll probably end up absolutely positioning some `<img>` elements, but it’s also worth noting that you can apply `background-image`s to `<img>`s, so the technique I use will be more or less identical. Something like this:

```
<head>

  ...

  <link rel=preload as=image href=lo-res.jpg fetchpriority=high>

  ...

</head>
<body>

  <img src=hi-res.jpg
       alt="Appropriate alternate text"
       width=360
       height=360
       style="background-image: url(lo-res.jpg)">

</body>
```

In fact, I do exactly that with [the photo of me in the sidebar](#section:sub-content).

### Use an Image Transformation Service

Being so tightly bound to these figures isn’t very redesign-friendly—you’d have to reprocess your entire image library if you made your LCP candidate any bigger. With this in mind, I wouldn’t recommend attempting this manually, or batch-processing your entire back catalogue.

Instead, use a service like [Cloudinary](https://cloudinary.com/) to size and compress images on the fly. This way, you only need to redesign a handful of components and let Cloudinary do the rest on demand. They make available [a quality parameter](https://cloudinary.com/documentation/image_optimization#set_the_quality_when_delivering_an_image) that takes a number which is a value between 1 (smallest file size possible) and 100 (best visual quality). E.g. `q_80`. Note that this number is not a percentage.

To get your BPP down to roughly 0.05, you’re going to want to experiment with a _really_ small number. Play around with numerous different images from your site to ensure whatever quality setting you choose doesn’t ever take you _below_ 0.05BPP.

### Use Your Judgement

If you do manage to get your image all the way down to your target filesize, there’s every chance it will be _too_ low quality to be visually acceptable, even if it does satisfy LCP’s technical requirements.

Here’s a current client’s product image compressed down to 4KB (their target was actually 3.015KB, but even the most aggressive settings couldn’t get me all the way):

![](https://csswizardry.com/wp-content/uploads/2023/09/too-far.jpg)

This is visually unacceptable as an LCP candidate, even though it ticks every box in the spec. My advice here—and it’s very subjective—is that you shouldn’t accept an LQIP–LCP that you wouldn’t be happy for a user to look at for any period of time.

In this particular instance, I bumped the quality up to 10, which came in at 12KB, was still super fast, but was visually much more acceptable.

![](https://csswizardry.com/wp-content/uploads/2023/09/just-right.jpg)

## Verifying It Works

You can use the [Element Timing API](https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/) to verify that your LQIP image(s) are being loaded and rendered in the intended order:

```

<header elementtiming=masthead>
  […]
</header>

<script>
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(entry);
    });
  });
  observer.observe({ type: "element", buffered: true });
</script>
```

This should show you n separate entries for your LQIPs and your full image:

![](https://csswizardry.com/wp-content/uploads/2023/09/lqip-verify.png)

Three separate entries for my Base64 placeholder, my LQIP, and my final LCP image. [View full size (89KB)](https://csswizardry.com/wp-content/uploads/2023/09/lqip-verify.png)

## Summary

In their attempts to prevent people gaming the system, spec writers have had to define exactly what that system is. Ironically, codifying these constraints makes gaming the system so much easier, as long as you can be bothered to read the specifications (which, luckily for you, I have).

Largest Contentful Paint candidates are penalised for upscaling and also for low entropy. By understanding how the upscaling algorithm works, and how to calculate target filesizes from input dimensions, we can generate the smallest possible legitimate LCP image which can be used as a low-quality placeholder while we wait for our full-resolution image to arrive. The best of both worlds.

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