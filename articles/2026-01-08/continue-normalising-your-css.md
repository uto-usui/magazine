---
title: "Continue Normalising Your CSS"
source: "https://csswizardry.com/2016/10/continue-normalising-your-css/"
publishedDate: "2016-10-19"
category: "css"
feedName: "CSS Wizardry"
---

19 October, 2016

Written by **Harry Roberts** on **CSS Wizardry**.

Shaun Rashid’s 2015 article [Normalize (CSS) No More](http://shaunrashid.com/2015/09/15/normalize-css-no-more/) has been making its way round the Twittersphere again recently, and it’s brought a few questions to my mind. This post isn’t a direct rebuttal or criticism of Shaun’s article, but rather my own take on things in the form of a response.

In Shaun’s article, the argument is made that normalising CSS (specifically via [Normalize.css](http://necolas.github.io/normalize.css/), but presumably the argument extends to anything of its ilk, like a more traditional reset) goes against the philosophy that [websites do not need to look the same in every browser](http://dowebsitesneedtolookexactlythesameineverybrowser.com/): a stance we fought very very hard to achieve. Whilst I absolutely agree that websites do not need to look the same in every browser—doing so is very time consuming, usually very frustrating, and seldom worth the time or effort—this argument is made on a false assumption: that Normalize.css exists to make websites look the same in every browser.

**When we talk about making websites look the same in every browser**, we’re usually discussing the fact that it’s okay for round corners to be absent in browsers that don’t support `border-radius`, or that we can live with subtle layout shifts from one browser to another, or that we can progressively enhance visual features where possible. This is something I agree with wholeheartedly.

**When we talk about Normalize.css**, we’re not talking about making websites look the same in every browser, we’re talking about providing a consistent and bug-free baseline. We’re talking about making a consistent baseline to make development easier. Normalize.css isn’t for our users or our clients, it’s for us as developers. We should always put the user first, but developer convenience is still a thing.

From Nicolas’ [article in which he introduces Normalize.css](http://nicolasgallagher.com/about-normalize-css/):

> Resets impose a homogeneous visual style by flattening the default styles for almost all elements. In contrast, \[N\]ormalize.css retains many useful default browser styles.

So please, do keep using Normalize.css. It makes your life easier, and with an absolute minimal overhead: v5.0.0 is a mere 984 bytes after gzip. For context, that represents [less than 1.3% of the average CSS project](http://httparchive.org/interesting.php#bytesperpage).

Or, at the very least, try not to dismiss it based on an incorrect understanding.

![Screenshot showing filesizes of compressed and uncompressed versions of Normalize.css](https://csswizardry.com/wp-content/uploads/2016/10/screenshot-normalize-filesize.png)

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