---
title: "My HTML/CSS coding style"
source: "https://csswizardry.com/2012/04/my-html-css-coding-style/"
publishedDate: "2012-04-21"
category: "css"
feedName: "CSS Wizardry"
---

20 April, 2012

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [HTML](#html)
    1.  [Unquoted attributes](#unquoted-attributes)
    2.  [No self closing tags](#no-self-closing-tags)
    3.  [Optional closing tags](#optional-closing-tags)
    4.  [Whitespace](#whitespace)
    5.  [Comments on closing tags](#comments-on-closing-tags)
    6.  [Namespaced fragment identifiers](#namespaced-fragment-identifiers)
2.  [CSS](#css)
    1.  [No IDs](#no-ids)
    2.  [Table of contents](#table-of-contents)
    3.  [Section titles](#section-titles)
    4.  [The shared section](#the-shared-section)
    5.  [Formatting](#formatting)
    6.  [Vendor prefixes](#vendor-prefixes)
    7.  [Indenting rulesets](#indenting-rulesets)
    8.  [HTML in CSS](#html-in-css)
3.  [Final word](#final-word)

**N.B.** This post is almost completely out of date now; please refer to my [CSS Guidelines](http://cssguidelin.es/) for more up-to-date information.

Whenever I post jsFiddles, tutorials, articles or do some work here at Sky, I’m very particular about my coding style and am often asked questions about it. A lot of people say ‘code is art’; to me that sentence is a little pretentious but what I _do_ think is that code can be a little more quirky and original than most people write it. It can be interesting. [Mathias Bynens](https://twitter.com/mathias) is constantly tweeting crazy little snippets of quirky, valid JS; he’s also made [some great little tools](http://mothereff.in/) to help you explore the different avenues available to you when writing awesome, expressive and ‘different’ code.

When I write HTML and CSS I have a certain set of rules and guidelines I stick to with regards syntax and formatting. I‘ve decided to write them up here **not** to preach or tell you how to do things, but simply to share how _I_ like to work. If you hate the things I do that’s cool, these are not recommendations. If you like anything I do then great; you can have it. What I _would_ love to see is other people doing the same; please consider writing up your coding styles, nuances and preferences and share them about!

* * *

## HTML

With HTML5 we have a lot looser syntax which means more scope for experimentation than we were typically used to with XHTML. With things like `<li>`s not requiring closing, some attributes not requiring quotes, tags not needing to be lowercase and elements like `<hr />`s not needing to be self-closing, there’s a lot to play with! Here’s what I do with my HTML…

### Unquoted attributes

Where I don’t need to, I don’t quote attributes. Where I would have had `class="wrapper"` I now have `class=wrapper`. Why? Because I can and I like the look of it!

Obviously, sometimes you do need to quote attributes. If you have multiple classes like `class=wrapper header-wrapper` then you _need_ quotes. Without quotes the browser sees this as: `class="wrapper" header-wrapper=""`.

To know when you can and when you can’t use quotes then have a tinker with Mathias’ [Mothereffing unquoted attribute value validator](http://mothereff.in/unquoted-attributes).

There are instances where you _could_ use unquoted attributes but I choose not to. It’s hard to summarise this in a quick rule so I’ll give an example:

```
<input type=submit class=btn value=Login>
```

This is perfectly valid usage of unquoted attributes, however, imagine the client calls up the agency and (very rightly) says Hey, the word _Login_ needs to be _Log in_, can we change that please? The project manager knows the designer is totally flat out busy and doesn’t have the time for smaller amends at the moment. Because project managers are awesome lovely people (right? Right?!), they decide that they can make this simple change themselves to save the designer a job. They open up the relevant file, see `value=Login` and simply change it to `value=Log in`, assuming that’s all there is to it. Now, the PM is likely not a technical person so they won’t necessarily know that this will now need quoting; the designer would have.

So, anywhere where the content of the attribute is subject to arbitrary change, I like to quote the attributes as a backup. Also, any time an attribute is populated dynamically (for example, through a CMS) it is best to quote it just in case; if you aren’t manually and consciously altering the attribute, play it safe and pop some quotes round it…

Now, I know what you’re thinking: If you sometimes have to use quotes then why not always use quotes? It’s more consistent. Well, you’re half right. It is more consistent on the whole, but by introducing rules I make my own consistency; if you can get away with not using quotes, then do so.

### No self closing tags

With HTML5 we can write things like `<hr />` as `<hr>`, `<img />` as `<img>` and so on. I choose to omit the `/>`, so in my HTML you’ll see things like:

```
<meta name=viewport content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
<link rel=stylesheet href=css/style.css>
```

Unquoted attributes where I can, and no self closing tags.

### Optional closing tags

In HTML5 (or non-XHTML syntax) you can omit actual, full closing tags from [certain elements](http://meiert.com/en/blog/20080601/optional-tags-in-html-4/)! This means that the following is totally valid:

```
<ul>
    <li>Lorem
    <li>Ipsum
    <li>Dolor
    <li>Sit
    <li>Amet
</ul>
```

I _don’t_ write my HTML like this as I’m just not too keen on the look of it… If you want to though, you certainly can.

### Whitespace

This one is hard to quantify, but I like to use whitespace to loosely reflect the separation of elements that you might see once rendered. I group and space elements with whitespace as you would expect them to be grouped visually in the rendered page, for example:

```
<dl>

    <dt>Lorem</dt>
    <dd>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</dt>

    <dt>Ipsum</dt>
    <dd>Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</dt>

    <dt>Dolor</dt>
    <dd>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra.</dt>

</dl>
 
 
<div class=promo>

    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas.</p>    
    <a href=# class=btn>Lorem</a>

</div>
```

A mixture of no, single and double lines of whitespace help to separate elements, or show their visual relationship to one another. For example, the `<dt>`s and `<dd>`s belong with each other, but are separate from other groupings.

After every major chunk of HTML, for example, the end of a carousel, or the end of the content `<div>`, I place a closing-comment, for example:

```
<div class=content>

    ...

    <div class=carousel>
    ...
    </div><!-- /carousel -->

    ...

</div><!-- /content -->
```

This is certainly not uncommon practice, but because all closing tags look the same as each other (they can’t carry the classes that the opening tags do) it’s often nice to leave a comment so you know what element you’re dealing with.

### Namespaced fragment identifiers

I came up with [this idea to namespace fragment identifiers](https://csswizardry.com/2011/06/namespacing-fragment-identifiers/) last year. It’s basically, I think, a nice way to add a little more meaning to your fragment identifiers and give a little bit more of a clue as to what they actually link to.

```
<a href=#section:fragment-identifiers>Fragment identifiers</a>

...

<div id=section:fragment-identifiers>...</div>
```

* * *

## CSS

So far I’ve dealt with how I write HTML, but what about CSS? My CSS is a lot less ‘different’, it’s mainly only formatting and syntax rules here.

### No IDs

This is more a technical thing, but I have [a blanket-ban on IDs in CSS](https://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/). There is literally no point in them, and they only ever cause harm. Everything that needs styling is done so without using IDs.

### Table of contents

At the top of my CSS files I have a table of contents that maps to the section titles in the document, it looks a little like:

```
/*------------------------------------*\
    CONTENTS
\*------------------------------------*/
/*
NOTES
RESET
SHARED     Share anything we can across elements.
MAIN       HTML, BODY, etc.
*/
```

### Section titles

I denote each section (layout, type, tables etc) of my CSS thus:

```
/*------------------------------------*\
    $MAIN
\*------------------------------------*/
```

This section heading is also prepended with a `$`. This is so that–when I do a find for a section–I actually do a find for `$MAIN` and not `MAIN`. This means that I’m only ever searching within section headings. A search for `$MAIN` will only ever find me a section with that name whereas a search for `MAIN` could find me something like:

```
.s{
    background-image:url(/img/css/sprites/main.png);
}
```

Being able to search just in the scope of headings is very, very useful.

I also leave five carriage returns between each section, for example:

```
/*------------------------------------*\
    $MAIN
\*------------------------------------*/
    
    
    
    
    
/*------------------------------------*\
    $TYPE
\*------------------------------------*/
```

This means that when scrolling quickly through my stylesheet I know that any gaps in the code are likely to be new sections.

### The shared section

I wrote about the shared section briefly on Smashing Magazine in my article [Writing CSS for others](http://coding.smashingmagazine.com/2011/08/26/writing-css-for-others/). This is basically a section in a stylesheet where, instead of declaring one rule over and over, we define it once and attach selectors to it, for example:

```
a,.brand,h1,h2,h3,h4,h5,h6{
    color:#BADA55;
}

h1,h2,h3,h4,h5,h6,
ul,ol,dl,
p,
table,
form,
pre,
hr{
    margin-bottom:24px;
    margin-bottom:1.5rem;
}
```

Doing this means that things I want to use over and over are only written once, and I can update all instances in one place. It’s kinda like variables in vanilla CSS…

### Formatting

I write multiline CSS with a distinct lack of whitespace that most people seem to hate:

```
.wrapper{
    margin:0 auto;
    max-width:940px;
    padding:10px;
}
```

No spaces before braces or after colons.

### Vendor prefixes

I write vendor prefixes so that the values all line up vertically; this means I can scan them quicker (to check they’re all identical) and I can alter them all in one go if my editor supports typing in columns:

```
.island{
    padding:1.5em;
    margin-bottom:1.5em;
    -webkit-border-radius:4px;
       -moz-border-radius:4px;
            border-radius:4px;
}
```

### Indenting rulesets

One thing I do like to do is indent my rulesets to mirror the nesting of their corresponding HTML. For example, take this carousel HTML:

```
<div class=carousel>

    <ul class=panes>

        <li class=pane>

            <h2 class=pane-title>Lorem</h2>

        </li><!-- /pane -->

        <li class=pane>

            <h2 class=pane-title>Ipsum</h2>

        </li><!-- /pane -->

        <li class=pane>

            <h2 class=pane-title>Dolor</h2>

        </li><!-- /pane -->

    </ul><!-- /panes -->

</div><!-- /carousel -->
```

My CSS for this would be formatted:

```
/*------------------------------------*\
    $CAROUSEL
\*------------------------------------*/
.carousel{
    [styles]
}

    .panes{
        [styles]
    }

        .pane{
            [styles]
        }

            .pane-title{
                [styles]
            }
```

By doing this, I can see from the CSS roughly how the HTML should look; I don’t need the HTML in front of me in order to work out what lives in what.

### HTML in CSS

In situations where it _would_ be useful for a developer to know exactly how a chunk of CSS applies to some HTML, I often include a snippet of HTML in a CSS comment, for example:

```
/*------------------------------------*\
    $TOOLTIPS
\*------------------------------------*/
/*
<small class=tooltip><span>Lorem ipsum dolor</span></small>
*/
.tooltip{
    [styles]
}
    .tooltip > span{
        [styles]
    }
```

* * *

## Final word

For a loose example of the above, poke through [vanilla](https://github.com/csswizardry/vanilla) or the [hry.rbrts.me](http://hry.rbrts.me/) source [on GitHub](https://github.com/csswizardry/hry.rbrts.me).

Just to reiterate, this is my coding _style_; I’m not making suggestions or laying down rules here. If you like anything then feel free to adopt it yourself, if you hate it then that’s cool (just hope you don’t inherit one of my projects!)

I’d really love if people wrote up and shared their own; there are loads of different ways of writing code and I’d be really interested to see what other people do. There’s a really good opportunity for learning some really neat tips!

If you do write your own, please tweet it at me **with the hashtag [#codestyle](https://twitter.com/#!/search/realtime/%23codestyle)**, that way everyone can easily keep track of any posts.

**Unquoted attributes, no self-closing tags, loads of whitespace, weird CSS indenting and a lot of comments; what’s yours?**

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