---
title: "Responsive images right now"
source: "https://csswizardry.com/2011/07/responsive-images-right-now/"
publishedDate: "2011-07-16"
category: "css"
feedName: "CSS Wizardry"
---

16 July, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#demo)[Demo](https://dl.dropbox.com/u/2629908/sandbox/responsive-images/index.html)
2.  [Bonus](#bonus)

Responsive design is everywhere; everyone’s at it because, well, it’s a great idea. It isn’t without its problems, however…

One of the more persistent issues is dealing with images. Resizing an image down to fit a smaller screen does work, but it’s a massive performance hit if your user is having to download a 1000px image to display on her 480px screen. Even if they’re on a super-fast WiFi connection, it makes no sense downloading 1000s of pixels if you can only display a fraction of that.

There have been several solutions posted and proposed around the internet but I’ve come up with a pretty humble one that you could use right away.

It’s a little fiddly, you have to hard-code some stuff and also process two images, but it does work and it is simple.

The premise is this; your `<img />` element is the smaller of the two images, the image you want ‘mobile’ users to download. You also have a containing `<div>` to which you apply the large version of the image as a background through CSS.

You then hide the `<img />` from ‘desktop’ users and show them the large, CSS background, and you hide the background image from ‘mobile’ users and just serve them the small inline image.

The benefits here are that you’re still using semantically sound markup; your HTML makes sense because there is an image element in there. The size of this image is irrelevant where semantics are concerned–a machine/browser etc doesn’t need to ‘see’ the image, it just needs to access its data. Further, screen readers can still access this image and its `alt` text, making this method nice and accessible.

So basically you are always serving an `<img />` which is semantically sound, but you alter the cosmetics of that image depending on the size of device the user is using.

Here is some example code:

```
<div class="r-img" style="background:url(link/to/large/version); width:[width-of-image]px; height:[height-of-image]px;">
    <img src="link/to/small/version" alt="">
</div>


.r-img img{
    /* Hide image off-screen on larger devices, but leave it accessible to screen-readers */
    position:absolute;
    left:-9999px;
}

@media(max-width:480px){
    .r-img{
        /* Remove styling from the div */
        background:none!important;
        width:auto!important;
        height:auto!important;
    }
    .r-img img{
        /* Bring smaller image back into view */
        position:static;
        max-width:100%;
    }
}
```

## [Demo](https://dl.dropbox.com/u/2629908/sandbox/responsive-images/index.html)

I’ve made a little demo, try sizing your window down to see the functionality or, even better, visit it on your phone.

Also, open up Firebug’s _Net_ tab and compare HTTP requests between the two versions. The background images, as you’d expect, just don’t get downloaded on the responsive version. Unfortunately, users on larger screens will still download both images…

Now, I did just think of this in the shower and wrote it straight down so please let me know of any potential stumbling blocks etc in the comments. Cheers!

## Bonus

Instead of hiding the image off-screen we can actually set it to `width:100%` and `height:100%;` so it completely covers the background image and then set it to `opacity:0;`. This means that if a user right clicks the background image (to save it etc) they still can because they’re focussed on an invisible image in the page. See [the second demo](https://dl.dropbox.com/u/2629908/sandbox/responsive-images/index2.html).

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