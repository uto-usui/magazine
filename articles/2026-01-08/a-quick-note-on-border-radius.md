---
title: "A quick note on border radius"
source: "https://csswizardry.com/2010/03/a-quick-note-on-border-radius/"
publishedDate: "2010-03-02"
category: "css"
feedName: "CSS Wizardry"
---

2 March, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Addendum](#addendum)

This is a quick post concerning the `border-radius` CSS3 property, and the syntax behind it. After coming across [this site](http://www.border-radius.com/) earlier today via [Twitter](https://twitter.com/csswizardry) I remembered my initial frustrations with lack of uniformity across user agents and their required syntax in order to create round corners; Firefox requiring a different format to Webkit and the CSS3 spec was pretty annoying.

However, it’s not all that bad. As border-radius.com would have you believe, the syntax to create an element with top-left and bottom-right corners with a 50px round, and top-right and bottom-left corners with 10px rounds would be:

```
<code>-webkit-border-radius: 50px;
-webkit-border-top-right-radius: 10px;
-webkit-border-bottom-left-radius: 10px;
-moz-border-radius: 50px;
-moz-border-radius-topright: 10px;
-moz-border-radius-bottomleft: 10px;
border-radius: 50px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;</code>
```

Wrong, you can actually use the `border-radius` shorthand to nail this in three lines:

```
<code>-moz-border-radius:50px 10px 50px 10px;
-webkit-border-radius:50px 10px 50px 10px;
border-radius:50px 10px 50px 10px;</code>
```

The syntax follows the following rule: `border-radius:top-left top-right bottom-right bottom-left;`. I’ve tested this in Firefox (`-moz-border-radius`), Webkit (`-webkit-border-radius`) and Opera (`border-radius`) and [it works just fine](https://csswizardry.com/demos/border-radius/).

## Addendum

You’d think Webkit would just be Webkit, right? Wrong. This works in Chrome but _not_ Safari. I’ve had reports that Safari 4.0.4 (I guess it’s _not found it_, get it? Oh never mind.) doesn’t work. Useful…

Still, this version will work, and is still considerably shorter:

```
<code>-webkit-border-radius: 50px;
-webkit-border-top-right-radius: 10px;
-webkit-border-bottom-left-radius: 10px;
-moz-border-radius:50px 10px 50px 10px;
border-radius:50px 10px 50px 10px;</code>
```

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