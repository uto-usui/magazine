---
title: "Mo’ robust paragraph indenting"
source: "https://csswizardry.com/2010/12/mo-robust-paragraph-indenting/"
publishedDate: "2010-12-22"
category: "css"
feedName: "CSS Wizardry"
---

21 December, 2010

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [](#spaced-and-indented--allegedly-wrong)[Spaced and indented](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced-indented) – allegedly wrong
2.  [](#spaced-only--looks-and-works-fine)[Spaced only](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced) – looks and works fine
3.  [](#indented-only--doesnt-work)[Indented only](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#indented) – doesn’t work
4.  [](#spaced-and-indented-fixed--perfect)[Spaced and indented fixed](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#indented-fixed) – perfect

I read somewhere once that to space _and_ indent paragraphs of text is not a good idea and that you should pick one _or_ the other. Either indent or space, but never both. I can’t remember where I read this, all I know is that it was in some type book in [Magma, Manchester](http://www.magmabooks.com/content/service/shops.asp) and that I _personally_ agree with it. I don’t know what the type big-wigs think, but for me, I find both indenting and spacing of paragraphs somewhat unsightly.

## [Spaced and indented](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced-indented) – allegedly wrong

[A spaced and indented paragraph](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced-indented) would use the following CSS:

```
p{
  margin-bottom:20px;
}
p+p{
  text-indent:2em;
}
```

## [Spaced only](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced) – looks and works fine

If you just want [a spaced paragraph](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#spaced) it’s just as simple as `p{ margin-bottom:20px; }`. Job done. If you want spaced paragraphs then that’s all you need:

```
p{
  margin-bottom:20px;
}
```

## [Indented only](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#indented) – doesn’t work

If you want [an indented paragraph](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#indented), simply:

```
p{
  margin:0;
}
p+p{
  text-indent:2em;
}
```

However, as you can see, the problem here is that anything following a paragraph with `margin:0;` will be butted up against that paragraph. There will be no space between _any_ element following a paragraph.

## [Spaced and indented fixed](https://csswizardry.com/demos/mo-robust-paragraph-indenting/#indented-fixed) – perfect

To fix this, give those paragraphs their `margin-bottom:20px;` back, meaning you have the spaced and indented look once again, but then on the `p+p` apply a negative `margin-top` equal to that of the regular `margin-bottom`:

```
p{
  margin-bottom:20px;
}
p+p{
  text-indent:2em;
  margin-top:-20px;
}
```

Here we have the ideal, every paragraph after the first (in a block) is indented and unspaced. The last in a block _is_ spaced meaning a gap between a paragraph and its following element. Easy.

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