---
title: "Improving Perceived Performance with Multiple Background Images"
source: "https://csswizardry.com/2016/10/improving-perceived-performance-with-multiple-background-images/"
publishedDate: "2016-10-24"
category: "css"
feedName: "CSS Wizardry"
---

23 October, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [CSS Gradients and Multiple Backgrounds](#css-gradients-and-multiple-backgrounds)
2.  [Making the Approximation](#making-the-approximation)
3.  [Practicality](#practicality)
4.  [Update 2016-11-11](#update-2016-11-11)

I’m on a train right now, which means the wifi is awful. A lot of sites are refusing to load at all, and those that do have lots of images missing, leaving big blank holes in their web pages. Most of the images, thankfully, aren’t critical to understanding the content I’m looking for, but their absence does remind me that I’m waiting for something else to arrive, and in many cases it is perceived performance that is more important than the actual performance itself. This gave me a little idea.

A while back, I was consulting on a very high profile and very highly trafficked campaign website for a client that I’m, unfortunately, not allowed to name. I was brought in mid way through development to help make things _fast_.

The site featured a very large masthead image that, even when optimised, took a little while to load. I did a bunch of stuff in order to prefetch the image, fire off its request earlier, etc., but one of the simplest techniques I employed was to apply the image’s average colour as a `background-color`, so that the user wasn’t looking at a huge white space whilst the image loaded. This improved perceived performance dramatically, and was and incredibly low-effort implementation:

1.  Open the image in Photoshop
2.  Filter » Blur » Average
3.  Use the Eyedropper to sample the block of colour that is left
4.  Apply that colour as a `background-color`:
    
    ```
    .masthead {
      background-image: url(/img/masthead.jpg);
      background-color: #3d332b;
    }
    ```
    

This is a technique that I also use on this site’s homepage, on my very own masthead: if the image is taking too long to load, show the user a solid colour. However, just now on the train, I visited my own site and saw this:

![](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-missing-image.png)

[View full size/quality (104KB)](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-missing-image-full.png)

The image isn’t actually content-critical, so it doesn’t matter that it hasn’t loaded, but—whilst probably better looking than my face—it’s still pretty jarring: it’s just a big, flat, soulless lump of colour. How can we improve it?

## CSS Gradients and Multiple Backgrounds

Very simply put, I wanted to make a rough approximation of the photograph in a CSS gradient. I can’t stress the words _rough approximation_ enough here: we’re literally talking about a few blobs of similar average colours. I was then going to apply this as a `background-image` on the image itself, only: oh no! This image already _is_ a background image. Not to worry, we’ve been able to define multiple backgrounds on the same element [since IE9](http://caniuse.com/#feat=multibackgrounds). We can define the actual image and its gradient approximation in one go, in one declaration.

This means that, if the browser has the CSS,

1.  it can paint the CSS approximation;
2.  it can make the request for the actual image, which can make its way over the network in its own time.

Read more about [multiple backgrounds on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Using_CSS_multiple_backgrounds).

## Making the Approximation

To get my CSS-blob version of my masthead, I opened it up in Photoshop and divided it up into regions of colour. Because most of the objects in this image run top to bottom, I made vertical slices. Very conveniently for me, those regions all occurred at 25% intervals:

![](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-slices-before.jpg)

[View full size/quality (140KB)](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-slices-before-full.jpg)

I then selected each section individually and ran Filter » Blur » Average, which left me with this:

![](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-slices-after.png)

[View full size/quality (2KB)](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-slices-after-full.png)

The next step was to sample each colour and plug them into a CSS gradient:

```
linear-gradient(to right, #807363 0%, #251d16 50%, #3f302b 75%, #100b09 100%)
```

That looks like this:

All I need to do now is apply this as a second value of my `background-image` property:

```
.page-head--masthead {
  background-image: url(/img/css/masthead-large.jpg),
                    linear-gradient(to right, #807363 0%, #251d16 50%, #3f302b 75%, #100b09 100%);
}
```

The stacking order of multiple backgrounds is such that the first value (in this case, an actual image) is the topmost image, then the next sits underneath that, and so on.

This means that, if this image ever fails to load again, we see this:

![](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-missing-image-after.png)

[View full size/quality (144KB)](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-missing-image-after-full.png)

Not a huge difference, but certainly less blunt than a completely flat image: it’s enough to add a little bit of texture and hint at the general composition of the missing images.

## Practicality

There is, as you can see, quite a lot of manual work involved in implementing this technique. Unless/until there’s a way to reliably automate this, I think it’s a technique best used in use cases just like mine: a very specific image with a very low rate of change.

The next level down from this would be just taking the average colour of the image and applying that as a `background-color`. There’s no need for gradients and multiple backgrounds with that, but it does still require per-image intervention.

However, I’m actually really happy with this as a way to provide something a little more substantial to users on poor network conditions. If your site has similar static images, I’d recommend experimenting with this technique yourself.

## Update 2016-11-11

Since publishing this post, a couple of people have produced ways of (semi) automating this process.

[Louis Bourque](https://twitter.com/louisbourque) has a [Color Extractor tool](http://www.louisbourque.ca/Color-Extractor/) which will give you back the relevant gradient without having to fire up Photoshop.

[Ben Briggs](https://twitter.com/ben_eb) built [postcss-resemble-image](https://github.com/ben-eb/postcss-resemble-image) which will: Provide a gradient fallback for an image that loosely resembles the original.

Pretty neat! Thanks, gentlemen.

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