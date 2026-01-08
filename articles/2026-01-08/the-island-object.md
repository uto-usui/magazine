---
title: "The ‘island’ object"
source: "https://csswizardry.com/2011/10/the-island-object/"
publishedDate: "2011-10-16"
category: "css"
feedName: "CSS Wizardry"
---

16 October, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

One thing I’ve been doing a lot of lately, since starting at [Sky](http://sky.com/), is writing abstractions. [OOCSS](http://www.oocss.org/) is nothing new, but its basic premise is that you can build really simple objects using a base class and then extend that object with more classes to add more styling to make a simple construct progressively more complex and specific.

One abstraction I love is by [Nicole Sullivan](https://twitter.com/stubbornella) (one of the best front-end devs in the world ever); the [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). Another I wrote is the more simple [nav abstraction](https://csswizardry.com/2011/09/the-nav-abstraction/).

Today I’m going to share one that’s simpler still; the _island object_…

This super simple object is basically a single class used to box off content, leaving it closed on all sides like, well, an island.

Often you’d find yourself with markup and CSS a little like this:

```
<div class=content>

  <div class=promo>
      ...
  </div>

</div>

<div class=sub-content>
  
  <div class=twitter>
    ...
  </div>
  
</div>

.content{
  width:460px;
  float:left;
  padding:20px;
  margin-bottom:20px;
  background-color:#fff;
}
.sub-content{
  width:160px;
  float:left;
  padding:20px;
  margin-bottom:20px;
  background-color:#333;
  color:#fff;
}
.promo{
  padding:20px;
  margin-bottom:20px;
  border:1px solid #ff8;
  background-color:#ffc;
  color:#333;
}
.twitter{
  padding:20px;
  margin-bottom:20px;
  color:#fff;
  background-color:#00a0d1;
}
```

Here we see that these are all standalone blocks of boxed off content, but they all share certain things in common. These are essentially all islands of content that are individually adapted to look different.

Instead of repeating these declarations over and over we can make an abstraction to create padded, boxed off areas.

Now, we could use `.box` as a class but this implies square; we could have a redesign where we use rounded corners or even wacky, wavy background images which, although _are_ boxed off, aren’t presentationally boxes. We don’t like presentational classes if we can help it.

Enter the `.island` class. Now our markup and CSS would be:

```
<div class="island content">

  <div class="island promo">
      ...
  </div>

</div>

<div class="island sub-content">
  
  <div class="island twitter">
    ...
  </div>
  
</div>

.island{
  padding:20px;
  margin-bottom:20px;
}
  .island > :last-child{
    margin-bottom:0; /* Remove the margin from the last child of a boxed off area so that we don’t end up with compounded margin/padding spacings. */
  }

.content{
  width:460px;
  float:left;
  background-color:#fff;
}
.sub-content{
  width:160px;
  float:left;
  background-color:#333;
  color:#fff;
}
.promo{
  border:1px solid #ff8;
  background-color:#ffc;
  color:#333;
}
.twitter{
  color:#fff;
  background-color:#00a0d1;
}
```

This does make the HTML a tad larger, but the `.island` class is a powerful one that can quickly and rapidly create new areas of content without having to redeclare styles over and over.

Extending the island object with more specific styles means that you can have components that look vastly different but that are built upon the same basic construct. This also means that if you decide you design needs a little more white-space you can up the `.island` padding to, say, 24px in one go and all content blocks will inherit this new style.

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