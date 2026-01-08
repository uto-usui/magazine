---
title: "Improving CSS tooltips"
source: "https://csswizardry.com/2010/11/improving-css-tooltips/"
publishedDate: "2010-12-01"
category: "css"
feedName: "CSS Wizardry"
---

30 November, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

But only very slightly… [Jack Osborne](https://twitter.com/jackosborne), whom I have followed on Twitter for a while now, posted some time ago [a tooltip tutorial](http://jackosborne.co.uk/articles/css-tooltips-with-the-pseudo-element/) whereby you utilise the `:after` CSS pseudo-element and the `attr()` function to populate it. His method works by giving an element a `title=""` attribute and a class of `tooltip`, and placing the content of the title attribute after the content, all through CSS.

The only _technical_ downside I can see here is the necessity for that class. Using a simple attribute selector we can ditch that and basically say ‘if any element has a title, put that title after it in CSS’. By simply using `[title]` over `.tooltip` we can automate the process and trim some bytes, thus:

```
<code><a href="http://twitter.com/jackosborne" title="Follow Jack Osborne on Twitter">Jack Osborne</a>


[title]{
	position:relative;
}
[title]:after{
	content:attr(title);
	color:#fff;
	background:#333;
	background:rgba(51,51,51,0.75);
	padding:5px;
	position:absolute;
	left:-9999px;
	opacity:0;
	bottom:100%;
	white-space:nowrap;
	-webkit-transition:0.25s linear opacity;
}
[title]:hover:after{
	left:5px;
	opacity:1;
}</code>
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