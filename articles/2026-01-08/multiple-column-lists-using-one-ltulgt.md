---
title: "Multiple column lists using one &lt;ul&gt;"
source: "https://csswizardry.com/2010/02/mutiple-column-lists-using-one-ul/"
publishedDate: "2010-02-12"
category: "css"
feedName: "CSS Wizardry"
---

11 February, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#view-demo)[View demo](https://csswizardry.com/demos/multiple-column-lists/)
2.  [The code](#the-code)
    1.  [The markup](#the-markup)
3.  [When to use this](#when-to-use-this)

This is a quick, simple tutorial on how to create multiple column lists by only using one `ul`. Often is the case when you’d want multiple lists side-by-side, but you end up using markup like `<ul class="col">` in order to get several lists sat next to each other. However, by simply floating `li`s left and setting their width to the correct percentage (two columns = `li{width:50%;}` and so on), you can attain a multiple column list pretty easily.

## [View demo](https://csswizardry.com/demos/multiple-column-lists/)

The trick here is to force the list to break at the right point. If you want two columns, you need to float the list items left and set them at 50% width, therefore the list items will only ever fit two side-by-side, then begin again on the row beneath. By that token, three columns would require a width of 33% and floated left, four would be 25% and so on.

## The code

Both the markup and CSS for this is incredibly simple, nothing fancy, no CSS3, nothing progressive, just basic styling applied to lean markup.

### The markup

The markup for this is just a simple `ul`, thus:

```
<code><ul id="double"> <span class="code-comment"><!-- Alter ID accordingly --></span>
  <li>CSS</li>
  <li>XHTML</li>
  <li>Semantics</li>
  <li>Accessibility</li>
  <li>Usability</li>
  <li>Web Standards</li>
  <li>PHP</li>
  <li>Typography</li>
  <li>Grids</li>
  <li>CSS3</li>
  <li>HTML5</li>
  <li>UI</li>
</ul></code>
```

And to make this into a multiple column list:

```
<code>ul{
  width:760px;
  margin-bottom:20px;
  overflow:hidden;
  border-top:1px solid #ccc;
}
li{
  line-height:1.5em;
  border-bottom:1px solid #ccc;
  float:left;
  display:inline;
}
#double li  { width:50%;} <span class="code-comment">/* 2 col */</span>
#triple li  { width:33.333%; } <span class="code-comment">/* 3 col */</span>
#quad li    { width:25%; } <span class="code-comment">/* 4 col */</span>
#six li     { width:16.666%; } <span class="code-comment">/* 6 col */</span></code>
```

## When to use this

Use this wisely… It displays content in an ambiguous manner and should not be used where order of reading is imperative.

This method should only be used if the lists content doesn’t require any specific ordering as the markup is written linearly and the list is displayed in a matrix. As you can see, the way the content is displayed means it can be read across»down»across or down»up»down. This means that the way you write your content is not necessarily the way it will be read. In [my example](https://csswizardry.com/demos/multiple-column-lists/) this isn’t an issue, as the content can safely be read in any order.

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