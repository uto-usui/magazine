---
title: "Use zero-width spaces to stop annoying Twitter users"
source: "https://csswizardry.com/2014/01/use-zero-width-spaces-to-stop-annoying-twitter-users/"
publishedDate: "2014-01-21"
category: "css"
feedName: "CSS Wizardry"
---

21 January, 2014

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

Being the typically-polite Brit that I am, I often find myself feeling sympathetic when I see people tweet things like I used Sass’ @extend, and that _@extend_ mentions a Twitter user who doesn’t want to see that tweet at all. This doesn’t just apply to _@extend_, either; what about _@media_, or _@import_, or anyone who has a Twitter handle that’s also a CSS at-rule?

This morning, I had an idea that might ease their suffering: use zero-width spaces to avoid mentioning people when you don’t mean to. Instead of writing _@import_, you’d write _@\[zero-width-space-here\]import_.

The only problem with this is that, on a Mac, at least, there is no shortcut for a zero-width spaces. Copying and pasting it—which, as you can imagine, is quite difficult—from Wikipedia is too much effort to even bother…

I’ve [long been a fan](https://twitter.com/csswizardry/status/413660033688567808) of iOS’ (and now Mavericks’) keyboard shortcut mappings, so I decided to make use of these again. I’ve mapped the following pairs:

```
!@import    @​import
!@media     @​media
!@extend    @​extend
```

The reason for the exclamation mark is so that I can still actually write `@import` when I need it in my CSS/Sass; the _!@import_ version is just for use on Twitter.

To add these shortcuts on your Mac:

1.  System Preferences
2.  Keyboard
3.  Text

On your iPhone:

1.  Settings
2.  General
3.  Keyboard
4.  Shortcuts

Copy/paste the above rules into their respective boxes, and done. Add any more that you think might be useful.

I just used this for the first time, [it worked a treat](https://twitter.com/csswizardry/status/425567689684566016).

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