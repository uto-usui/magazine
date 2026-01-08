---
title: "Your logo is still an image… and so is mine!"
source: "https://csswizardry.com/2013/01/your-logo-is-still-an-image-and-so-is-mine/"
publishedDate: "2013-01-24"
category: "css"
feedName: "CSS Wizardry"
---

23 January, 2013 (last updated on 10 June, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Eww, what?!](#eww-what)
2.  [People and machines](#people-and-machines)
    1.  [Featured case study: NHS](#)
    2.  [Semantics is for machines](#semantics-is-for-machines)
    3.  [Images are for people](#images-are-for-people)
3.  [But, why?!](#but-why)

Almost two years ago I wrote [an article about image semantics](https://csswizardry.com/2010/10/your-logo-is-an-image-not-a-h1/) which covered the appropriate markup for your site’s logo. In short, it stated that logos are content and should therefore be marked up as `img` elements, **not** `h1`s, as is a very common practice.

The `h1` method is used for two _main_ reasons:

1.  It allows you to sprite up your logo.
2.  The misconception that a logo is somehow a heading.

My article – which I still stand by – debunked the second, but the former is a point of interest…

I received [an issue](https://github.com/csswizardry/csswizardry.github.com/issues/18) on [the CSS Wizardry repo](https://github.com/csswizardry/csswizardry.github.com/) asking me to go into more detail about how I handle things here:

> I was recently re-reading your [logo is an image](https://csswizardry.com/2010/10/your-logo-is-an-image-not-a-h1/) article and I noticed you’ve taken a different approach on your new site. I was wondering if you could walk us through this.

**tl;dr** To balance the correct semantics with better performance.

* * *

So, I previously wrote that you should not use an `h1` for your logo, but you should use an `img`. Here’s the markup that I use on CSS Wizardry right now (January, 2013):

```
<a href="/" class="site-logo">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="CSS Wizardry" class="s  s--csswizardry-logo">
</a>
```

You should notice that my `src` attribute doesn’t point to `logo.png` or similar, but to a Base64 encoded 1×1px transparent gif.

## Eww, what?!

What I am doing here is pointing my `img` at a small transparent gif, and then using CSS to apply an SVG sprite as a background image. Here I am using an `img` which is semantically correct, but I am also being a little crafty and using CSS to apply the image that people actually see. Here is the (S)CSS:

```
.s{
    background-image:url(/img/css/sprites/main.svg);
}
.s--csswizardry-logo{
    width:64px;
    height:64px;
    background-position:-5px -5px;
    @include vendor(background-size, 250px 250px);

    @include media-query(desk){
        @include vendor(background-size, 500px 500px);
        width:128px;
        height:128px;
        background-position:-10px -10px;
    }
}
```

All I am doing here is defining a spriting object (`.s`) and then extending that class with `.s--csswizardry-logo` (with some responsive bits added in).

It is important to remember here that – even though it is only a 1×1px transparent gif – my logo _is still an image_.

Before I can get to _why_ I am doing this, we need establish some groundwork…

## People and machines

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

It is a gross oversimplification, but an important distinction we need to make when it comes to HTML and CSS is the one between people – our users – and machines. We typically (for the _vast_ majority of cases) have two things accessing our sites; machines, like screenreaders and search bots; and people, who can see and interact with our website.

With this in mind, we typically build our sites considering those two scenarios. That’s the whole reason we build websites accessibly and care about code, but we still want the site to look pretty, so we design it up as well. This is us catering to both machines and users.

**N.B.** A visually impaired user visiting a website via a screenreader counts as a machine as it is the screenreader which deals with the code and then passes it along, rather than the user processing the site directly. I realise how offensive this may seem, calling visually impaired users machines, but it’s the only way I can word the fact that in _this_ scenario it is a machine accessing the website – albeit controlled by a person – but not a person directly.

### Semantics is for machines

Knowing this, we can begin to understand that only machines care about `img` elements. From a user’s perspective it makes no difference whether we use an `img`, a Flash object, a background image on a `div`, anything! The `img` is only useful for machines (screenreaders, search bots etc). This is why we have semantics.

Machines also utilise `alt` text; `alt` text isn’t for users to access, it is for machines to access and then pass to the user if necessary.

So, semantically speaking, all a correct implementation of an image needs to be is an `img` element with some `alt` text, as this is what machines require; machines (where we as front-end developers are concerned) have no idea, nor do they even care, as to what the actual pixel content of an image is. If you have an `img` element with an empty gif as its `src` and ‘CSS Wizardry’ as its `alt` text then all the machine knows is that this is an image with that alternate text; it has no idea as to the content of the image file.

### Images are for people

The actual pixel content of an image _does_ matter to people, the code does not. With this in mind, it doesn’t matter _how_ we apply the styling to the machine’s `img` element, because users don’t care (though we’d obviously use CSS).

This is the important distinction; `img`s serve _two_ purposes:

1.  To tell a machine there’s an image, and some `alt` text if applicable.
2.  To display a graphic to a user.

By splitting these requirements right down the middle, we now understand how we can serve a 1×1px transparent gif as a semantically valid image, and validly apply the visual image via CSS.

## But, why?!

It’s taken me a while, but here we are, _why_ am I doing this?

The short answer is performance.

Anyone following CSS Wizardry’s posts, or me on Twitter, over these last couple of years will know that I have been getting more and more heavily involved in much larger projects where architecture and performance are paramount, and I love it!

One of my favourite things about this side of web development is how it fuses really impressive, interesting performance ‘hacks’ with ‘ugly’ markup. Two years ago I strove for semantic perfection and ‘hand-crafted’ my code; now I see code as an awesome powertool for creating big, fast websites. Spriting up empty elements is all part of this fun!

Spriting images is performance basics, we all know why we need it, but it’s important to keep the correct semantics wherever possible, hence me spriting up an `img` element.

If, semantically, a logo _has_ to be an image, and you want to sprite this image up, then the best way to achieve this is to have the `img` itself being see-through. By using a 1×1px transparent gif then you get this see-through behaviour attached to a tiny image.

Now, this image _is_ initially an extra HTTP request, [a performance no-no](https://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/#section:http-requests-and-dns-lookups), **but**:

-   **It’s only a few bytes in size** so it’ll be over the wire in no time.
-   **Any subsequent usage is free** because the browser won’t re-request it.
-   **You can cache it forever** because a 1×1px transparent gif will never need updating.

You would be forgiven for thinking you could just point your `src` at a nonexistent image, which would result in a 404 and not having to transfer _any_ image back over the wire. The problem with this however is that – with there being no asset downloaded – there is nothing for the browser to cache. This means that if you had five sprited `img`s on your page you’d also have five 404ing HTTP requests, and nothing getting cached for reuse. The initial overhead of one more HTTP request for `dot.gif` can _soon_ pay off because that little image can be cached indefinitely and reused again and again. This isn’t even to mention the fact that the only reason you’re doing this to be able to sprite images, which is saving you loads of requests anyway!

It is important to note that spriting images won’t always be necessary and/or possible. I’m not saying you should do it all the time, and I am saying you quite often can’t (fluid images, for example). It’s just another possible tool to put in your toolbox.

So there we have it; spriting an `img` allows us to use the correct semantics and also take even more advantage of sprites! A machine sees an `img` labelled ‘CSS Wizardry’ (perfect) and a user sees my logo (awesome)! Everyone is happy, everything is correct.

**Edit:** As many people have suggested, you could use a [Base64 data](https://csswizardry.com/2017/02/base64-encoding-and-performance/)\-URI instead of a gif and save the additional HTTP request. This obviously isn’t cachable in the same way as an image is, and also does bring certain other downsides you ought to be aware of!

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