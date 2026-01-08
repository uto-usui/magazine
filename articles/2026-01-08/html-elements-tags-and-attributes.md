---
title: "HTML elements, tags and attributes"
source: "https://csswizardry.com/2011/01/html-elements-tags-and-attributes/"
publishedDate: "2011-01-12"
category: "css"
feedName: "CSS Wizardry"
---

11 January, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Elements](#elements)
2.  [Tags](#tags)
3.  [Attributes](#attributes)

This article is only a small one, and to the vast majority it won’t be of much use, but I’m still astounded that today, in 2011, professional web designers and developers are still making this fundamental mistake. The difference between HTML elements, tags and attributes.

## Elements

An element is a single ‘chunk’ of code comprising of an opening and closing tag.

```
<code><div>This is a div element</div></code>
```

This is a `div` element. Not a `div` tag.

Some elements have only one, self-closing tag:

```
<code><img /></code>
```

Tags are the bits that make up elements. `<div>` is a tag. An opening and closing tag makes an element:

```
<code><div></code>
```

And:

```
<code></div></code>
```

## Attributes

An attribute is a piece of code attached to a tag which supplies additional information:

```
<code><div <mark>class="some-class"</mark>>This is a div element</div></code>
```

This is an attribute.

So, when people say ‘I’ve used `alt` tags’, they haven’t; they’ve used `alt` _attributes_.

When people say ‘Don’t use tables, use `div` tags.’ they mean use `div` _elements_.

When people say ‘mark important text up in a `strong` tag’ they mean mark important text up in a `strong` _element_ (made up of two `strong` tags).

```
<code>|<--             --element--            -->|
<tag attribute="value">Element content</tag></code>
```

This is probably really very basic for the majority of you, so apologies, but it really winds me up when I see developers making this mistake. Still.

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