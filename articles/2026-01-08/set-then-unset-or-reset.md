---
title: "Set then unset (or reset...?)"
source: "https://csswizardry.com/2010/09/set-then-unset/"
publishedDate: "2010-09-06"
category: "css"
feedName: "CSS Wizardry"
---

5 September, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Another example…](#another-example)

There are countless tutorials on the Internet that preach about exactly how you should write your CSS. From trying to enforce single-line syntax, to specifying the number of spaces you should use and where, I wholeheartedly disagree with any articles of this kind. Your CSS can look however you choose, it just has to be readable, sensible and efficient.

A method I’ve recently become fond of requires the mass setting and tactical unsetting of style rules across elements. I’ve been toying with a way of explaining this method for a few days now, but I just can’t think of a way to word it. I’ll have to rely on code examples, instead…

Take the following, long winded way of styling a `<h1>` and a `<h2>`:

```
<code>h1{
  font-family:Helvetica, Arial, sans-serif;
  font-size:2em;
  font-weight:bold;
  margin-bottom:20px;
}
h2{
  font-family:Helvetica, Arial, sans-serif;
  font-size:1.5em;
  font-weight:bold;
  margin-bottom:20px;
}</code>
```

This of course could be written as the much more condensed:

```
<code>h1,h2{
  font-family:Helvetica, Arial, sans-serif;
  font-weight:bold;
  margin-bottom:20px;
}
h1{
  font-size:2em;
}
h2{
  font-size:1.5em;
}</code>
```

However, for all this is more efficient, it can be taken further still:

```
<code>h1,h2{
  font-family:Helvetica, Arial, sans-serif;
  font-size:2em;
  font-weight:bold;
  margin-bottom:20px;
}
h2{
  font-size:1.5em;
}</code>
```

Here we give both the `<h1>` and the `<h2>` the _same_ font size (this being the value we want the `<h1>` to use) and then override/unset this value on the `<h2>`.

## Another example…

```
<code><span class="code-comment">/* OLD */</span>
ol,ul{
  margin-bottom:20px;
  font-style:italic;
}
ol{
  list-style:decimal outside;
}
ul{
  list-style:square outside;
}
<span class="code-comment">/* NEW */</span>
ol,ul{
  margin-bottom:20px;
  font-style:italic;
  list-style:decimal outside;
}
ul{
  list-style:square outside;
}</code>
```

I’m afraid I can’t really offer any more verbal explanation of this technique but the code examples should explain well enough. If you do have any questions though, pop them in the comments.

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