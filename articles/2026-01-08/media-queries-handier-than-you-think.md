---
title: "Media queries, handier than you think"
source: "https://csswizardry.com/2010/12/media-queries-handier-than-you-think/"
publishedDate: "2010-12-22"
category: "css"
feedName: "CSS Wizardry"
---

21 December, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

A lot of people are using media-queries of late to do full site changes to rework an entire page – or set of pages – based on a screen-size; from mobile through iPad, to 800x600, up to more ‘modern’ sizes. They can however have much more humble (but equally, if not more, nifty) applications. Here I’ll share with you just two such applications I used recently on a real site.

To begin, head to [suzannahaworth.com](http://suzannahaworth.com/).

First off, have your browser (if possible) at a resolution of 1024x768px. You should see the main content (`<body>`) is centered in a [960GS](http://960.gs/) layout. I support 1024x768 as the smallest desktop screen-size. The code is simply:

```
body{
	width:940px;
	padding:0 10px;
	margin:100px auto 0 auto;
	...
}
```

Now size your browser up to 1280x1024px if you are able to. You should see that the main content (`<body>`) is 150px from the top of the screen and 100px from the left. I chose the arbitrary values to give the page a non-centered layout which was my ideal look. The code for this:

```
/*------------------------------------*\
	WIDE VERSION
\*------------------------------------*/
@media (min-width: 1100px){
    body{
        margin:150px 0 0 100px;
    }
}
```

As simple as that.

The other thing, and the one I like most, is the sidebar. With a resolution 1024x768px or above, visit the site and scroll the page. The sidebar is fixed, right? Now make that something more like 1024x500px and scroll, the sidebar scrolls too!

I’m quite fond of this effect but unfortunately at certain screen sizes (such as my netbook) the sidebar runs off the page and can’t be viewed because it won’t scroll. This has always stopped me using fixed positioning much, until I had the idea to use CSS to say ‘if the screen is big enough, give it position fixed, otherwise let it scroll!’

The default code is:

```
#sub-content div{
	position:fixed;
	width:220px;
}
```

Which is overwritten (if applicable) by this:

```
/*------------------------------------*\
	SHORT VERSION
\*------------------------------------*/
@media (max-height: 540px){
    #sub-content div{
        position:static;
    }
}
```

It really is that simple!

So there you have it, media queries aren’t just for major grunt and massive amounts of donkey work; small snippets can adapt the tiniest bits of your site to add changes where necessary, meaning you can preserve the features you want whilst not sacrificing the experience in situations where those features won’t work!

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