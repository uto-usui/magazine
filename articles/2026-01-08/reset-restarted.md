---
title: "Reset restarted"
source: "https://csswizardry.com/2011/10/reset-restarted/"
publishedDate: "2011-10-19"
category: "css"
feedName: "CSS Wizardry"
---

18 October, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

Everyone knows the trusty CSS reset; that oh-so-useful tool that saves us many a headache. We love it so much in fact that we tend to use it on every project–but therein lies the problem…

When I discovered the CSS reset I almost cried with joy; the sheer amount of headaches, bug fixes–and thus time–it saved me was astounding. I vowed from that day on that I’d always use it, wherever I go. I’ve now realised that was a little silly…

I’ve realised that each time I blindly copy paste my reset, I do so without thinking, I’ve never really stopped to think about what’s in it, or what it all does.

Some time ago I removed the frankly ridiculous lists rest:

```
ul,ol{ list-style:none; }
```

I have no idea how this ever got into a reset. I mean sure, it resets it–and Meyer does tell you to use the reset with care–but to remove the bullets from lists is more than a little daft if you ask me. Lists without bullets are the exception rather than the rule, so remove them _only_ when you don’t want them, otherwise you end up with code like this:

```
ul,ol{ list-style:none; }

.nav li{
    display:inline
}

.plain-old-regular-list{
    list-style:disc outside;
}
```

Whereas this is actually way more sensible:

```
.nav{
    list-style:none;
}
.nav li{
    display:inline
}
```

Anyway, that aside, I’ve recently realised that my reset was getting stupid, and it’s embarrassing to admit that I had stylesheets like this:

```
/* RESET */
h1,h2,h3,h4,h5,h6{
    font-weight:normal;
}
em,strong{
    font-style:normal;
    font-weight:normal;
}

...

/* TYPE */
h1,h2,h3,h4,h5,h6{
    font-weight:bold;
}
em{
    font-style:italic;
}
strong{
    font-weight:bold;
}
```

I know, face palm, right?

So I started to slowly slim my reset down to some sensible defaults and I removed things that I found myself constantly overwriting or deleting and finally, tonight, I skimmed over the HTML spec’s text level elements and I restarted my reset using sensible default styles based on the elements’ semantics.

The reset is below, but **do not treat this one as the final version!**

```
/*------------------------------------*\
    RESET
\*------------------------------------*/
/*
A more considered reset; more of a restart...
*/
html,body,div,span,applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,hr,
a,abbr,address,cite,code,
del,dfn,em,img,ins,kbd,q,s,samp,
small,strong,sub,sup,tt,var,
b,u,i,
dl,dt,dd,ol,ul,li,
fieldset,form,label,legend,
table,caption,tbody,tfoot,thead,tr,th,td,
article,aside,canvas,details,figcaption,figure,
footer,header,hgroup,menu,nav,section,summary,
time,mark,audio,video{
    margin:0;
    padding:0;
}
article,aside,details,figcaption,figure,footer,
header,hgroup,menu,nav,section{
    display:block;
}
h1,h2,h3,h4,h5,h6{
    font-size:100%;
}
table{
    border-collapse:collapse;
    border-spacing:0;
}
strong,b,mark{
    font-weight:bold;
    font-style:inherit;
}
em,i,cite,q,address,dfn,var{
    font-style:italic;
    font-weight:inherit;
}
abbr[title],dfn[title]{
    cursor:help;
    border-bottom:1px dotted;
}
ins{
    border-bottom:1px solid;
}
a,u,ins{
    text-decoration:none;
}
del,s{
    text-decoration:line-through;
}
pre,code,samp,kbd{
    font-family:monospace;
}
small{
    font-size:0.75em;
}
img{
    border:none;
    font-style:italic;
}
input,
select,
textarea{
    font:inherit;
}
```

Find the always-up-to-date reset in [vanilla on GitHub](https://github.com/csswizardry/vanilla).

Things I’ve removed:

-   Deprecated elements like `big`, `center`, `acronym` etc.
-   Aforementioned lists reset.
-   Removal of borders from fieldsets (this needs defining on a per-design basis).
-   Font weights and styles have been redefined rather than removed.
-   Removed the underlines from the redefined `u` element as well as from the `a` by default as per my article [On negative hovers](https://csswizardry.com/2011/05/on-negative-hovers/).

Things I’ve added:

-   Default stylings for text-level elements.
-   Default styles for several new and/or redefined HTML5 elements (e.g. `mark` and `u`).
-   [Text styles on images](https://csswizardry.com/2011/06/styling-alt-text-on-images/)
-   Make form elements inherit type properly.

Even if you don’t choose to use my reset (though it’d be great if you did) the one thing I urge you to take from this article is **think about your reset**. If you find yourself constantly overwriting rules from it then you ought to remove them. And remember; your reset can change per-build! You don’t always have to use the same one, just alter it where necessary for each design.

For example, let’s say that most of the time you opt to not have bordered `fieldset`s; if this is the case then it is safe to keep that section in your reset. But if, for whatever reason, a design _does_ include them then simply _remove_ that part. This makes far more sense than styling a `fieldset` twice; once in your reset to remove a border and once in your CSS to reapply it.

Reconsider your reset; the one I’ve authored is a pretty comprehensive one that will remove all quirky bits and pieces and leave you with nice–rather than stark–defaults. If you opt not to adopt mine then give your own some loving. **Restart your reset!**

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