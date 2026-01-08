---
title: "Create a centred horizontal navigation"
source: "https://csswizardry.com/2011/01/create-a-centred-horizontal-navigation/"
publishedDate: "2011-01-30"
category: "css"
feedName: "CSS Wizardry"
---

29 January, 2011 (last updated on 4 June, 2025)

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#demo)[Demo](https://csswizardry.com/demos/centred-nav/)

Since originally penning this article in 2011, I have fully transitioned myself away from CSS and heavily into [web performance consultancy](https://csswizardry.com/consultancy/). You can [hire me](https://csswizardry.com/contact/) for that now!

This article was originally written in 2011 and used `text-align`ment and `display: inline;` to manipulate lists as text-level, inline elements. However, in 2025, I completely rewrote it to utilise Flexbox: the much more suitable approach for the times.

It massively simplified the amount of CSS needed to build a horizontally centred nav, so while this post may now seem a little underwhelming, it does serve as a great example of just how powerful CSS has gotten in the last decade.

```
<ul class=c-nav>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Home</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>About</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Work</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Clients</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Content</a>
  </li>

</ul>
```

Need Some Help?

I help companies find and fix site-speed issues. **Performance audits**, **training**, **consultancy**, and more.

Pretty standard, an unordered list of menu items. The CSS is where it’s at:

```
.c-nav {
  border: 1px solid #ccc;
  border-width: 1px 0;
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  gap: 10px;
}

  .c-nav__item { }

    .c-nav__link {
      display: block;
    }
```

The workhorses here are simply `display: flex;` and `justify-content: center;`. This creates a Flex context and forces items to pack from the centre outward.

`gap` optionally spaces the items by `10px`, which creates an un-clickable ‘dead’ zone between each link. Whether you want this or not is entirely up to you, so feel free to modify or exclude to suit your needs.

## [Demo](https://csswizardry.com/demos/centred-nav/)

[Here’s a quick demo](https://csswizardry.com/demos/centred-nav/)! It works in all major current browsers.

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