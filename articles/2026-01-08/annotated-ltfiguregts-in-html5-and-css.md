---
title: "Annotated &lt;figure&gt;s in HTML5 and CSS"
source: "https://csswizardry.com/2011/06/annotated-figures-in-html5-and-css/"
publishedDate: "2011-06-04"
category: "css"
feedName: "CSS Wizardry"
---

3 June, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#demo)[Demo](https://dl.dropbox.com/u/2629908/sandbox/annotations/index.html)
2.  [The code](#the-code)
    1.  [The HTML](#the-html)
    2.  [The CSS](#the-css)
    3.  [A couple of things to note](#a-couple-of-things-to-note)

I’ve never really been one for CSS experiments. They’re cool and all, but I prefer solving real problems with good ol’ CSS and markup. This is what this next thing was born from and I’m really pleased with the outcome! It’s [image maps, meet annotations, meet HTML5’s `<figure>` element](https://dl.dropbox.com/u/2629908/sandbox/annotations/index.html).

Basically, we all know HTML5 has given us some pretty awesome new elements to toy with and some of the more humble ones are `<figure>` and `<figcaption>`:

```
<figure>
     <img src="/img.jpg" alt="">
    <figcaption>Caption for above image</figcaption>
</figure>
```

In this post I’ll show you how to turn that into [an image-map style annotated image](https://dl.dropbox.com/u/2629908/sandbox/annotations/index.html) using really really semantic markup.

* * *

## [Demo](https://dl.dropbox.com/u/2629908/sandbox/annotations/index.html)

You’re probably familiar with Flickr’s notes which are shown upon hovering an image. Well functionally this is exactly like that (I’ve never actually looked at their markup but I imagine it’s nigh on identical). Where this differs is that it uses some super-rich and semantic markup and it can be used as a CSS plugin! Simply paste the CSS into your site’s stylesheet and start using HTML5 `<figure>` annotations.

## The code

This technique is a really good example of layers of code. Perfect HTML that works absolutely great on its own, totally semantic and well structured. It doesn’t need the CSS at all to function, the CSS just enhances it.

### The HTML

The HTML is lovely and simple. Before we go any further [go back to the demo page](https://dl.dropbox.com/u/2629908/sandbox/annotations/index.html) and disable styles. Seeing this without styles _should_ show you just how semantic and sensible the markup really is. It’s a perfect HTML layer that doesn’t even _need_ CSS to make sense or work.

I’ve not included the whole page as all we really want to look at is this:

```
<figure class="annotated">

  <img src="img/photo.jpg" alt="Photograph of me on my bike" />
  
  <figcaption>
  
    <b>Things to note:</b>
    
    <ul>
      <!-- Positions of the list-items. These need defining inline. -->
      <li style="top:255px; left:150px;">Helmet.</li>
      <li style="top:420px; left:140px;">Ruptured ligaments in my ankle.</li>
      <li style="top:480px; left:130px;">Low pressures.</li>
      <li style="top:390px; left:325px;">The trailer I just jumped from.</li>
    </ul>
    
    <i><a href="http://www.flickr.com/photos/suzannahaworth/4707464578/">Photo</a> by <a href="http://twitter.com/suzehaworth">@suzehaworth</a>.</i>
    
  </figcaption>
  
</figure>
```

All we have here is a `<figure>` and `<figcaption>` with an image, a title and a list. The image is the subject of our figure and the list makes points about it. To associate these points with the image we simply have a `<b>` which we use to textually make the connection.

### The CSS

```
/*------------------------------------*\
  ANNOTATIONS
\*------------------------------------*/
/*
Apply a class of annotated to any figure you would like, well, annotated!
*/
.annotated{
  position:relative;
  /*display:inline-block; If you do not need to support IE7 and below uncomment this line and remove the inline width and height styles on the <figure> in your markup. */
}
.annotated img{ /* Set this to stop white-space appearing under the image. */
  display:block;
}
.annotated b{ /* Hide the figcaption’s title. */
  position:absolute;
  left:-99999px;
}
.annotated ul{ /* Set up the canvas for the annotations to sit on. */
  list-style:none;
  position:absolute; 
  top:0;
  right:0;
  bottom:0;
  left:0;
}
.annotated li{
  display:block;
  padding:0 5px;
  /* Give them a width and a line-height suitable for your kind of images. I chose 50px. */
  width:40px; /* 40px + 5px padding-right  + 5px padding-left = 50px */
  line-height:50px;
  position:absolute;
  text-indent:-99999px; /* Hide the text off-screen. */
  white-space:nowrap; /* Stop the annotations breaking onto several lines. */
  cursor:default;
}
.annotated:hover li{ /* When we hover the figure show us where the annotations are. */
  border:1px solid #fff;
}
.annotated li:hover { /* Show the text on hover. */
  background:#fff;
  background:rgba(255,255,255,0.75);
  z-index:2; /* Bring current annotation above others. */
  /* Remove the width and text-indent to show us our text! */
  width:auto;
  text-indent:0;
  
  /* A bit o’ progressive enhancement */
  -webkit-box-shadow:0 0 5px rgba(0,0,0,0.25);
     -moz-box-shadow:0 0 5px rgba(0,0,0,0.25);
         box-shadow:0 0 5px rgba(0,0,0,0.25);
}
```

The CSS is fairly well commented but basically what we do is:

-   Hide the `<b>` title.
-   Absolutely position and stretch the `<ul>` over the image.
-   Give the `<li>`s a width and (line-)height and hide the text off-screen.
-   Add borders to the list items when we hover the `<figure>`.
-   Remove the width from and give a border to the `<li>`s on hover, and reveal the text.

### A couple of things to note

Firstly, the list items need positioning with inline styles in the markup. This is far more pragmatic than giving each `<li>` an ID and doing each one through an external CSS file.

Secondly, and more in depth, _how do we get the the `<figure>` to wrap around and hug the image?_ We have four options.

-   Leave it as-is, like I have here. This means that if you hover to the right of the image you are technically still inside the (block-level) `<figure>` and this will display the list item borders when your cursor isn’t actually over the image. This isn’t too bad, but a little unexpected…
-   Float the `<figure>` left, which will force it to hug up to its largest child. The problem here is that you would have to `clear:both;` the subsequent element.
-   Give the `<figure>` `display:inline-block;`, but this won’t work in IE7 and below.
-   The final and, in my opinion, most pragmatic solution would be to simply add an inline width and height to the `<figure>` which is identical to the dimensions of your image, thus: `<figure style="width:427px;height:640px;">`.

Decide which of those will suit your project best and put it to work. Simply pasting the CSS into your stylesheet and obeying the markup structure will allow you to annotate your figures in a much nicer fashion.

I have just put [this on GitHub](https://github.com/csswizardry/annotate) in a CSS plugin type fashion. Please feel free to download and poke through the code.

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