---
title: "Building sites without using IDs or classes"
source: "https://csswizardry.com/2010/04/building-sites-without-using-ids-or-classes/"
publishedDate: "2010-04-07"
category: "css"
feedName: "CSS Wizardry"
---

7 April, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Using advanced selectors](#using-advanced-selectors)
2.  [Why I think this won’t catch on](#why-i-think-this-wont-catch-on)
    1.  [Advantages:](#advantages)
    2.  [Disadvantages:](#disadvantages)
    3.  [Final word](#final-word)

This morning, for one reason or another, I decided to have a go at coding up a page without using any IDs or classes in my markup, and therefore none in my CSS. I’m not sure why I tried it, I guess I just did… In order to make it a fairly painless job I dove straight into the browser and coded up a simple header, footer, two column layout. [View the demo](https://csswizardry.com/demos/sites-without-ids-classes/) and be sure to view the source.

Using a combination of more advanced selectors such as sibling and `nth-of-type` you can target elements based on their position in the markup rather than a given name. The practical upshot of this is that your markup is much leaner and cleaner, removing class and ID names has a notable impact.

## Using advanced selectors

For a complete list please see [http://www.w3.org/TR/css3-selectors/](http://www.w3.org/TR/css3-selectors/)

The more advanced selectors take information about an element to determine whether it matches a certain criteria, for example `body>div` will target a `div` that is a direct and immediate descendant of the `body`; `p+p` will target a paragraph immediately preceded by a paragraph.

On this basis, you could select (for example) your main content `div` by knowing that it’s the second `div` in your content wrapper: `body>div div:nth-of-type(2)`. Broken down we have:

-   `body`–sets the root
    
-   `>div`–the first `div` inside the body (the wrapper `div`)
    
-   `div:nth-of-type(2)`–the second `div` in the wrapper (just after the header `div`).
    

## Why I think this won’t catch on

For the time being, let’s completely disregard that Internet Explorer completely disregards these selectors…

As you can see from the above example, targeting the single, lone, unique content `div` has taken two advanced selectors and 27 bytes. The selectors are fixed, the content `div` will always have to be the second `div` in the `div` that is an immediate child of the `body`. This is incredibly restrictive. Surely `#content{…}` is far better than `body>div div:nth-of-type(2){…}`…?

For the sake of ease, instead of rambling about pros and cons, I’ve simply drawn up a list of advantages and disadvantages:

### Advantages:

-   Leaner markup.
    
-   Promotes more sensible structuring of code.
    
-   Promotes semantics.
    

### Disadvantages:

-   Difficult syntaxes to remember.
    
-   Extremely restrictive–elements are styled based on their location meaning that any moving/restructuring means all styles tied to an element are lost. This leads me on to…
    
-   The CSS is no longer just describing style, it also describes structure. CSS is a styling language, not a markup one.
    
-   Arbitrary elements such as images and `div`s that change depending on page content (blog posts for example) aren’t fixed enough to be styled based on their structure. This means that any variable content will require IDs and classes anyway, so you might as well us them across the board as opposed to a mix of with and without.
    
-   Difficult to understand. I wrote [the CSS for the demo page](https://csswizardry.com/demos/sites-without-ids-classes/css/style.css) and I’m having a hard enough time doing the calculations to work out what does what. Imagine inheriting that!
    
-   Jenga. As soon as you alter your markup, the structure dependent CSS will come falling down too, what might be the first child might become the second, making the second child the third and so on, creating a domino effect.
    

### Final word

While the more advanced CSS(3) selectors are impressive, and incredibly powerful, they aren’t flexible enough to allow any large dependency upon them. That, and they’re more awkward to understand than the tried and tested ID/class ‘hooks’ we know and use. There are far too many downsides to make cleaner markup a big enough plus-side in my opinion… Oh, and Internet Explorer doesn’t seem to honour any of them, but that can’t have come as much of a surprise.

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