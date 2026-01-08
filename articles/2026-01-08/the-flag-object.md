---
title: "The flag object"
source: "https://csswizardry.com/2013/05/the-flag-object/"
publishedDate: "2013-05-09"
category: "css"
feedName: "CSS Wizardry"
---

8 May, 2013

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Featured case study: NHS](#)
2.  [Differences to the media object](#differences-to-the-media-object)

It all started with [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). That one snippet of CSS, by [Nicole](https://twitter.com/stubbornella), got me fully sold and hooked on OOCSS.

This article will only really make sense if you, too, are familiar with the media object; if you aren’t then you should totally [go and check it out!](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

For me, the media object is more than just a layout construct; for me, the media object is the poster-child of everything OOCSS stands for. The media object is so glaringly simple that, when I first read about it, I laughed out loud. The idea of taking such a common design pattern and distilling it into a tiny, robust, reusable abstraction was so clever yet so _simple_ that I fell in love straight away. It also made me realise that, for too long, CSS had been left to people with a designer’s mind; any code needs the mind of a developer applied to it, someone who gets DRYness, abstraction, efficiency, etc.

The media object’s job is simply to display an image with some text content beside it, both aligned to the tops of each other, with a little gap between. It also has the option have the image on either the left- or right-hand side of the text. This is [the SRP](https://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/) to a tee.

```
+---------+ ~~~~~~~~~~ ~~~~~
|         | ~~~~~ ~~~~~ ~~~~
|         | ~~~~~~~~~ ~~~~~~
|         |
+---------+
```

However, as awesome as the media object is, there is one thing it can’t (and was probably never designed to) do well; vertical alignment. Oftentimes it’s desirable to have the image content and text content aligned to their vertical middles, like so:

```
+---------+
|         | ~~~~ ~~~~~~~~~~~
|         | ~~~~~~~ ~~~~~ ~~
|         | ~~~~~~~~~~~~
+---------+
```

It’s been something that’s been asked about a lot at work because, on the face of it, it looks like a really simple construct. However, looks can be deceiving… The only way to achieve this kind of thing with the media object would be by using margins and paddings and magic numbers, and we all know [what bad news that is](https://csswizardry.com/2012/11/code-smells-in-css/). I often had to tell bewildered looking product owners and designers that it’s not as simple as that. Never a good feeling, especially when you’re meant to be good at CSS.

### Featured case study: NHS

How I helped the NHS rapidly build a brand new product.

[Read case study…](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/)

## [The flag object](http://jsfiddle.net/csswizardry/hErrh/)

Today, on my lunch break, I decided enough was enough. I fired up [jsFiddle](http://jsfiddle.net/) and got tinkering; a few minutes later and I had the flag object: [jsfiddle.net/csswizardry/hErrh](http://jsfiddle.net/csswizardry/hErrh/)

The flag object shares a lot of common traits with the media object; its sole purpose is displaying image- and text-like content side-by-side. Where the flag object differs, however, is its ability to vertically align the image and text to the tops, middles or bottoms of each other.

## The code

```
.flag {
    display: table;
    width: 100%;
}

    .flag__image,
    .flag__body {
        display: table-cell;
        vertical-align: middle;

        .flag--top & {
            vertical-align: top;
        }

        .flag--bottom & {
            vertical-align: bottom;
        }

    }

    .flag__image {
        padding-right: 10px;

        > img {
            display: block;
            max-width: none;
        }

        .flag--rev & {
            padding-right: 0;
            padding-left: 10px;
        }

    }

    .flag__body {
        width: 100%;
    }
```

The CSS/Sass is pretty self explanatory; we’re making use of `display:table[-cell];` which gives us the ability to use `vertical-align`ment. We have a series of modifiers to quickly swap between aligning the content to the top or bottom of the object, and we also have a reversal modifier, for having the image-like content on the right.

The `width:100%` on the `.flag__body{}` is an odd hack of sorts; this forces the text content to take up all of the space that the `.flag__image{}` does not.

### Differences to the media object

Aside from the visual difference of vertical alignment, there isn’t too much difference between the two objects’ code. One thing to note is that the flag object is slightly more verbose in its implementation; the media object can have its classes applied directly to its content whereas the flag object needs its classes applied to wrappers _around_ its content. For example, compare the following snippets for the media and flag objects respectively:

```
<div class="media">
    <img src="" alt="" class="media__image">
    <p class="media__body"></p>
</div>

<div class="flag">
    <div class="flag__image">
        <img src="" alt="">
    </div>
    <div class="flag__body">
        <p></p>
    </div>
</div>
```

The flag object _needs_ its structural stuff on a higher element, abstracted away from the actual content. This, however, is a small price to pay for the ability to vertically align content.

Also, the media object is a lot more tried and tested; it works back as far as, I believe, IE6. The flag object plain will-not-work in IE7 and below. It’s been tested in IE8+ and it works a treat.

In a word, no.

I see these two objects/abstractions coexisting. They do _similar_ things, yes, but:

1.  The media object is good enough for 90% of cases, namely where vertical alignment isn’t required, so use that wherever possible.
2.  The flag object is not backwards compatible with the media object, so you can’t just replace all existing instances of one with the other.
3.  Until the flag object has any quirks/bugs ironed out, I think it safer to only use it where really necessary.

So, there we have it; I finally got round to writing a solid abstraction to this super-simple design pattern. Let’s see how it serves me!

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