---
title: "Base64 Encoding & Performance, Part 2: Gathering Data"
source: "https://csswizardry.com/2017/02/base64-encoding-and-performance-part-2/"
publishedDate: "2017-02-13"
category: "css"
feedName: "CSS Wizardry"
---

12 February, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [The Test, and Making It Fair](#the-test-and-making-it-fair)
    1.  [Testing Mobile](#testing-mobile)
2.  [Some Insights](#some-insights)
3.  [A Third Approach](#a-third-approach)
4.  [Some Interesting Things I Learned](#some-interesting-things-i-learned)
5.  [Improving the Tests](#improving-the-tests)

**This is the second in a two-part post. [Read Part 1](https://csswizardry.com/2017/02/base64-encoding-and-performance/).**

Hopefully you made it here after reading [part 1](https://csswizardry.com/2017/02/base64-encoding-and-performance/) of this post. If not, I’d encourage you to start there for some context.

* * *

After writing a somewhat insistent piece on the pitfalls of using Base64 encoding to inline assets (predominantly images) into stylesheets, I decided to actually gather some data. I set about a simple test in which I would measure some milestone and runtime timings across ‘traditionally’ loaded assets, and again over assets who’ve been inlined using Base64.

## The Test, and Making It Fair

I started out by creating two simple HTML files that have a full-cover background image. The first was loaded normally, the second with Base64:

-   [Normal](https://csswizardry.net/demos/base64/)
-   [Base64](https://csswizardry.net/demos/base64/base64.html)

The [source image](https://www.flickr.com/photos/rockersdelight/26842162186/) was taken by my friend [Ashley](https://twitter.com/iamashley). I resized it down to 1440×900px, saved it out as a progressive JPEG, ran it through JPEGMini and ImageOptim, and only then did I take a Base64 encoded version:

```
harryroberts in ~/Sites/csswizardry.net/demos/base64 on (gh-pages)
» base64 -i masthead.jpg -o masthead.txt
```

This was so that the image was appropriately optimised, and that the Base64 version was as similar as we can possibly get.

I then created two stylesheets:

```
* {
  margin:  0;
  padding: 0;
  box-sizing: border-box;
}

.masthead {
  height: 100vh;
  background-image: url("[masthead.jpg|<data URI>]");
  background-size: cover;
}
```

Once I had the demo files ready, I hosted them on a live URL so that that we’d be getting realistic latency and bandwidth to measure.

I opened a performance-testing-specific profile in Chrome, closed every single other tab I had open, and I was ready to begin.

I then fired open Chrome’s Timeline and began taking measurements. The process was a little like:

1.  Disable caching.
2.  Clear out leftover Timeline information.
3.  Refresh the page and record Network and Timeline activity.
4.  Completely discard any results that incurred DNS or TCP connections (I didn’t want any timings affected by unrelated network activity).
5.  Take a measurement of **DOMContentLoaded**, **Load**, **First Paint**, **Parse Stylesheet**, and **Image Decode**.
6.  Repeat until I got 5 sets of clean data.
7.  Isolate the median of each measurement (the median is the [correct average to take](https://csswizardry.com/2017/01/choosing-the-correct-average/)).
8.  Do the same again for the Base64 version.
9.  Do it all again for Mobile (ultimately I’m collecting four sets of data: Base64 and not-Base64 on Desktop and on Mobile[1](#fn:1)).

Point 4 was an important one: any connection activity would have skewed any results, and in an inconsistent way: I only kept results if there was absolutely zero connection overhead.

### Testing Mobile

I then emulated a mid-range mobile device by throttling my CPU by 3×, and throttled the network to Regular 2G and did the whole lot again for Mobile.

You can [see all the data](https://docs.google.com/spreadsheets/d/1P720QU6CQ7pZUgCLtkOdUmwpwp_8nEyTMBN2zq5Ajmc/edit?usp=sharing) that I collected on Google Sheets (all numbers are in milliseconds). One thing that struck me was the quality and consistency of the data: very few statistical outliers.

Ignore the _Preloaded Image_ data for now (we’ll come back to that [later](#a-third-approach)). Desktop and Mobile data are in different sheets (see the tabs toward the bottom of the screen).

## Some Insights

The data was very easy to make sense of, and it confirmed a lot of my suspicions. Feel free to look through it in more detail yourself, but I’ve extracted the most pertinent and meaningful information below:

-   Expectedly, the **DOMContentLoaded event remains largely unchanged** between the two methods on both Desktop and Mobile. There is no ‘better option’ here.
-   The **Load event** across both methods is similar on Mobile, but **on Desktop Base64 is 2.02× slower** (Regular: 236ms, Base64: 476ms). Base64 is slower.
-   Expectedly, **parsing stylesheets** is dramatically slower if they’re full of Base64 encoded assets. On Desktop, parsing was **over 10× slower**. On **Mobile, parsing was over 32× slower**. Base64 is eye-wateringly slower.
-   On Desktop, Base64 images **decoded 1.23× faster than regular images**. Base64 is faster.
-   …but on mobile, **regular images decoded 2.05× faster** than Base64 ones. Base64 is slower.
-   **First Paint** is a great metric for measuring perceived performance: it tells us when the users first starts seeing something. On Desktop, regular images’ First Paint happened at 280ms, but Base64 happened at 629ms: **Base64 was 2.25× slower**.
-   On **Mobile, First Paint** occurred at 774ms for regular images and at 7950ms for Base64. That’s a **10.27× slowdown for Base64**. Put another way, regular images begin painting in under 1s, whereas Base64 doesn’t start painting until almost 8s. Staggering. Base64 is drastically slower.

It’s quite clear to see that across all of these metrics, we have an outright winner: nearly everything—and on both platforms—is faster if we stay away from Base64. We need to put particular focus on lower powered devices with higher latency and restricted processing power and bandwidth, because the penalties here are substantially worse: **32× slower stylesheet parsing and 10.27× slower first paint**.

## A Third Approach

One problem with loading images the regular way is the waterfall effect it has on downloads: we have to download HTML which then asks for CSS which then asks for an image, which is a very synchronous process. Base64 has the theoretical advantage in that loads the CSS and the image at the same time (in practice there is no advantage because although they both show up together, they both arrive late), which gives us a more concurrent approach to downloading assets.

Luckily, there is a way we can achieve this parallelisation without having to cram all of our images into our stylesheets. Instead of leaving the image to be a late-requested resource, we can preload it, like so:

```
<link rel="preload" href="masthead.jpg" as="image" />
```

I made another demo page:

-   [Preloaded Image](https://csswizardry.net/demos/base64/preload.html)

By placing this tag in the `head` of our HTML, we can actually tell the HTML to download the image instead of leaving the CSS to ask for it later. This means that instead of having a request chain like this:

```
                                               |
|-- HTML --|                                   |
           |- CSS -|                           |
                   |---------- IMAGE ----------|
                                               |
```

We have one like this:

```
                                       |
|-- HTML --|                           |
           |---------- IMAGE ----------|
           |- CSS -|                   |
                                       |
```

Notice a) how much quicker we get everything completed, and b) how the image is now starting to download before the CSS file. Preloading allows us to manually promote requests for assets who normally wouldn’t get requested until some time later in the rendering of our page.

I decided to make a page that utilised a regular image, but instead of the CSS requesting it, I was going to preload it:

```
<link rel="preload" href="masthead.jpg" as="image" />

<title>Preloaded Image</title>

<link rel="stylesheet" href="image.css" />
```

I didn’t notice any drastic improvements on this reduced test case because preload isn’t really useful here: I already have such a short request chain that we don’t get any real gains from reordering it. However, if we had a page with many assets, preload can certainly begin to give us some great boosts. I actually use it [on my homepage](https://csswizardry.com/) to [preload the masthead](https://github.com/csswizardry/csswizardry.github.com/blob/21044ecec9e11998d7a1e12e9f96be2aa990c652/_includes/head.html#L5-L15): this is above the fold content that is normally quite late requested, so promoting it this way does yield some significant change in perceived performance.

One very interesting thing I did notice, however, was the decode time. On Mobile, the image decoded in 25ms as opposed to Desktop’s 36.57ms.

-   Preloaded images on Mobile decoded **1.46× faster than preloaded images did on Desktop**.
-   Preloaded images on Mobile **decoded 3.53× faster that non-preloaded images** did on Mobile.

I’m not sure why this is happening, but if I were to make a wild guess: I would imagine images don’t get decoded until they’re actually needed, so maybe if we already have a bunch of its bytes on the device before we actually have to decode it, the process works more quickly…? Anyone reading who knows the answer to this, please tell me!

## Some Interesting Things I Learned

-   **Progressive JPEGs decode slower than Baseline ones.** I guess this is to be expected given how progressive JPEGs are put together, but progressive JPEGs _are_ better for perceived performance. Still, it is the case that decoding a progressive JPEG takes about 3.3× as long as a baseline one. (I would still absolutely recommend using progressive, because they feel a lot faster than their baseline counterparts.)
-   **Base64 images decode in one event,** whereas regular images decode across several. I’m assuming this is because a data URI can’t be decoded unless it’s complete, whereas partial JPEG data can be…?

## Improving the Tests

Although I did make sure my tests were as fair and uninfluenced as possible, there are a few things I could do even better given the time (it’s the weekend, come on…):

-   **Test on an actual device.** I throttled my CPU and connection using DevTools, but running these tests on an actual device would have no doubt been better.
-   **Use a more suitable image on Mobile.** Because I was keeping as many variables as possible the same across tests, I used the exact same image for Desktop and Mobile. In fact, Mobile was only really simulating lowered device and network power, and was not run with smaller screens or assets. Hopefully in the real world we’d be serving a much smaller image (in terms of both dimensions and filesize) to smaller devices. I was not. I was loading the exact same files on the exact same viewport, only with hobbled connection and CPU.
-   **Test a more realistic project.** Again, these were very much laboratory conditions. As I noted with preloading, this isn’t the kind of environment in which it would shine. To the same extent, expect results to be different when profiling a non-test-conditions example.

* * *

And that concludes my two-part post on the performance impact of using Base64. It kinda just feels like confirming what we already know, but it’s good to have some numbers to look at, and it’s especially important to take note of lower powered connections and devices. Base64 still feels like a huge anti-pattern.

* * *

1.  Excuse the semantics here: I’m basically testing on my laptop and an emulated mobile device, but I’m not talking about screensizes. [↩](#fnref:1)
    

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