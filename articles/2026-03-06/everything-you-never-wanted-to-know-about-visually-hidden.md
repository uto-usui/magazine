---
title: "Everything you never wanted to know about visually-hidden"
source: "https://dbushell.com/2026/02/20/visually-hidden/"
publishedDate: "2026-03-05"
category: "design"
feedName: "Sidebar"
---

![No AI - Made by Human](https://dbushell.com/assets/images/ai-policy.svg) Friday 20 Feb 2026

Nobody asked for it but nevertheless, I present to you my definitive _“it depends”_ tome on visually-hidden web content. I’ll probably make an amendment before you’ve finished reading. If you enjoy more questions than answers, buckle up! I’ll start with the original premise, even though I stray off-topic on tangents and never recover.

## The question

I was [nerd-sniped](https://xkcd.com/356/) on Bluesky. [Ana Tudor asked](https://bsky.app/profile/anatudor.bsky.social/post/3mdze454wyc25):

> Is there still any point to most styles in visually hidden classes in ’26?
> 
> Any point to shrinking dimensions to `1px` and setting `overflow: hidden` when `clip-path` to nothing via `inset(50%)`/ `circle(0)` reduces clickable area to nothing? And then no `1px` dimensions = no need for `white-space`.
> 
> [@anatudor.bsky.social](https://bsky.app/profile/anatudor.bsky.social/post/3mdze454wyc25)

Ana proposed the following:

```
.visually-hidden { /* shouldn't this be enough in 2026? */
  position: absolute; /* take out of document flow */
  clip-path: circle(0); /* reduce clickable area to nothing */
}
```

Is this enough in 2026?

As an occasional purveyor of the `visually-hidden` class myself, the question wriggled its way into my brain. I felt compelled to investigate the whole ordeal. Spoiler: I do not have a satisfactory yes-or-no answer, but I do have a wall of text!

## Table of contents

I went so deep down the rabbit hole I must start with a table of contents:

-   [Accessibility notice](#accessibility-notice)
-   [Class walkthrough](#class-walkthrough)
-   [Where it all began](#where-it-all-began)
-   [Further adaptations](#further-adaptations)
-   [Minimum viable technique](#minimum-viable-technique)
-   [Native visually-hidden](#native-visually-hidden)

## Accessibility notice

I’m writing this based on the assumption that a `visually-hidden` class is considered **acceptable for specific use cases**. My final section on [native visually-hidden](#native-visually-hidden) addresses the bigger accessibility concerns. It’s not easy to say where this technique is appropriate. It is generally agreed to be OK but a symptom of — and not a fix for — other design issues.

Appropriate use cases for `visually-hidden` are far fewer than you think.

## Class walkthrough

Skip to [the history lesson](#where-it-all-began) if you’re familiar.

`visually-hidden`, `sr-only` — there have been many variations on the class name. I’ve looked at popular implementations and compiled the kitchen sink version below.

```
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

**Please don’t copy this as a golden sample.** It merely encompasses all I’ve seen.

There are variations on the selector using pseudo-classes that allow for focus. Think _“skip to main content”_ links, for example.

What is the purpose of the `visually-hidden` class? The idea is to hide an element visually, but allow it to be discovered by assistive technology. Screen readers being the primary example. The element must be removed from layout flow. It should leave no render artefacts and have no side effects. It does this whilst trying to avoid the bugs and quirks of web browsers.

If this sounds and looks just a bit hacky to you, you have a high tolerance for hacks! It’s a massive hack! How was this normalised? We’ll find out later.

I’ll whittle down the `visually-hidden` properties for those unfamiliar.

```
.visually-hidden {
  position: absolute;
}
```

Absolute positioning is vital to remove the element from layout flow. Otherwise the position of surrounding elements will be affected by its presence.

```
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
```

This crops the visible area to nothing. `clip` remains as a fallback but has long been deprecated and is obsolete. All modern browsers support `clip-path`.

```
.visually-hidden {
  border: 0;
  padding: 0;
}
```

These two properties remove styles that may add layout dimensions.

```
.visually-hidden {
  height: 1px;
  margin: -1px;
  width: 1px;
}
```

This group effectively gives the element zero dimensions. There are reasons for `1px` instead of `0px` and negative margin that I’ll cover later.

```
.visually-hidden {
  overflow: hidden;
}
```

Another property to ensure no visible pixels are drawn. I’ve seen the newer `clip` value used but what difference that makes if any is unclear.

```
.visually-hidden {
  white-space: nowrap;
}
```

This was added to address text wrapping inside the `1px` square (I’ll explain later).

So basically we have `position: absolute` and a load of properties that attempted to make the element invisible. We cannot use `display: none` or `visibility: hidden` or `content-visibility: hidden` because those remove elements from the accessibility tree.

So the big question remains: why must we still ‘zero’ the dimensions? Why is `clip-path` not sufficient? To make sense of this mystery I went back to the beginning.

!['Impossible. Perhaps the archives are incomplete.' says a perplexed Obi-Wan Kenobi, who searches the Jedi archives for a mysterious planet (from Star Wars: Episode II)](https://dbushell.com/images/blog/2026/obiwan-archives.avif)

'Impossible. Perhaps the archives are incomplete.' says a perplexed Obi-Wan Kenobi, who searches the Jedi archives for a mysterious planet (from Star Wars: Episode II)

## Where it all began

It was tricky to research this topic because older articles have been corrected with modern information. I recovered many details from [the archives](https://web.archive.org/) and mailing lists with the help of those involved. They’re cited along the way.

Our journey begins November 2004.

A draft document titled _“CSS Techniques for WCAG 2.0”_ edited by **Wendy Chisholm** and **Becky Gibson** includes a technique for invisible labels.

> While it is usually best to include visual labels for all form controls, there are situations where a visual label is not needed due to the surrounding textual description of the control and/or the content the control contains. Users of screen readers, however, need each form control to be explicitly labeled so the intent of the control is well understood when navigated to directly.
> 
> [Creating Invisible labels for form elements](https://www.w3.org/TR/2004/WD-WCAG20-CSS-TECHS-20041119/#creating-invisible-labels) ([history](https://www.w3.org/WAI/GL/WCAG20/css-tech-change-history.html))

The following CSS was provided:

```
.nosize {
  position: absolute;
  width: 0px;
  height: 0px;
  overflow: hidden;
}
```

Could this be the original `visually-hidden` class?

My research jumped through decades but eventually I found an email thread [“CSS and invisible labels for forms”](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/0529.html) on the W3C WAI mailing list. This was a month prior, preluding the WCAG draft. A different technique from **Bob Easton** was noted:

```
.off-left {
  position: absolute;
  left: -999px;
  width: 990px;
}
```

> The beauty of this technique is that it enables using as much text as we feel appropriate, and the elements we feel appropriate. Imagine placing instructive text about the accessibility features of the page off left (as well as on the site’s accessibility statement). Imagine interspersing “start of…” landmarks through a page with heading tags. Or, imagine parking full lists off left, lists of access keys, for example. Screen readers can easily collect all headings and read complete lists. Now, we have a made for screen reader technique that really works!
> 
> [Screenreader Visibility](https://web.archive.org/web/20031008102214/http://css-discuss.incutio.com/?page=ScreenreaderVisibility) - Bob Easton (2003)

Easton attributed both [Choan Gálvez](https://www.choan.es/en/) and [Dave Shea](https://daveshea.com/) for their contributions.

In same the thread, **Gez Lemon** [proposed `overflow`](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/0530.html) to ensure that text doesn’t bleed into the display area. Following up, Becky Gibson shared a [test case](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/att-0546/labels.html) covering the ideas.

```
.offscreen {
  position: absolute;
  width: 0px;
  overflow:hidden;
}

.offscreen2 {
  position: absolute;
  left: -200em;
}
```

Lemon later published an article [“Invisible Form Prompts”](https://juicystudio.com/article/invisible-form-prompts.php) about the WCAG plans which attracted plenty of commenters including Bob Easton.

The resulting WCAG draft guideline discussed both the `nosize` and `offscreen` ideas.

> Note that instead of using the nosize style described above, you could instead use postion:absolute; and left:-200px; to position the label “offscreen”. This technique works with the screen readers as well. Only position elements offscreen in the top or left direction, if you put an item off to the right or the bottom, many browsers will add scroll bars to allow the user to reach the content.
> 
> [Creating Invisible labels for form elements](https://www.w3.org/TR/2004/WD-WCAG20-CSS-TECHS-20041119/#creating-invisible-labels)

Two options were known and considered towards the end of 2004.

1.  Zero dimensions
2.  Position off-screen

Why not both? Indeed, it appears **Paul Bohman** on the [WebAIM mailing list](https://webaim.org/discussion/mail_thread?thread=1781) suggested such a combination in February 2004.

```
.hidden {
  position: absolute;
  left: 0px
  top: -100px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

Bohman even discovered possibly the first zero width bug.

> I originally recommended setting the height and width to 0 pixels. This works with JAWS and Home Page Reader. However, this does not work with Window Eyes. If you set the height and width to 1 pixel, then the technique works with all browsers and all three of the screen readers I tested.
> 
> [Re: Hiding text using CSS](https://webaim.org/discussion/mail_thread?thread=1781#post2) - Paul Bohman

Later in May 2004, Bohman along with _Shane Anderson_ [published a paper](https://dl.acm.org/doi/abs/10.1145/990657.990664) on this technique. Citations within included _Bob Easton_ and _Tom Gilder_.

**Aside note:** other zero width bugs have been discovered since. Manuel Matuzović noted in 2023 that [links in Safari were not focusable](https://www.matuzo.at/blog/2023/zero-width-height-skip/).

The zero width story continues as recently as February 2026 (last week).

> In browse mode in web browsers, NVDA no longer treats controls with 0 width or height as invisible. This may make it possible to access previously inaccessible “screen reader only” content on some websites.
> 
> [NVDA 2026.1 Beta TWO now available](https://www.nvaccess.org/post/in-process-10th-february/) - NV Access News

Digger further into WebAIM’s email archive uncovered a [2003 thread](https://webaim.org/discussion/mail_thread?thread=1425&id=3281) in which **Tom Gilder** shared a class for [skip navigation links](https://webaim.org/techniques/skipnav/).

```
a.skip {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
}
```

I found Gilder’s blog in the web archives introducing this technique.

> I thought I’d put down my “skip navigation” link method down in proper writing as people [seem to like it](https://web.archive.org/web/20031212060317/http://www.mezzoblue.com/archives/2003/09/12/accessibilit/) (and it gives me something to write about!). Try moving through the links on this page using the keyboard - the first link should magically appear from thin air and allow you to quickly jump to the blog tools, which modern/visual/graphical/CSS-enabled browsers (someone really needs to come up with an acronym for that) should display to the left of the content.
> 
> [Skip-a-dee-doo-dah](https://web.archive.org/web/20031008092721/http://blog.tom.me.uk/2003/09/13/skipadeedoodah.php) - Tom Gilder

Gilder’s post links to a _Dave Shea_ post which in turn mentions the 2002 book _“Building Accessible Websites”_ by _Joe Clark_. Chapter eight discusses the necessity of a “skip navigation” link due to [table-based layout](https://thehistoryoftheweb.com/tables-layout-absurd/) but advises:

> Keep them visible!
> 
> Well-intentioned developers who already use page anchors to skip navigation will go to the trouble to set the anchor text in the tiniest possible font in the same colour as the background, rendering it invisible to graphical browsers (unless you happen to pass the mouse over it and notice the cursor shape change).
> 
> [Building Accessible Websites - 08. Navigation](https://joeclark.org/book/sashay/serialization/Chapter08.html#h4-2020) - Joe Clark

Clark expressed frustration over common tricks like the invisible pixel.

```
<a href="#skip">
  <img src="/media/core/1x1clear.gif"
    alt="[skip navigation links]"
    width="1"
    height="1"
  />
</a>
```

It’s clear no `visually-hidden` class existed when this was written.

[Choan Gálvez](https://www.choan.es/en/) informed me that [Eric Meyer](https://meyerweb.com/eric/thoughts/2002/08/12/css-tantalizing-public-archive-announced/) would have the css-discuss mailing list. Eric kindly searched the backups but didn’t find any earlier discussion. However, Eric did find a [thread on the W3C mailing list](https://lists.w3.org/Archives/Public/w3c-wai-gl/1999JulSep/0053.html) from 1999 in which Ian Jacobs (IBM) discusses the accessibility of “skip navigation” links.

The desire to visually hide “skip navigation” links was likely the main precursor to the early `visually-hidden` techniques. In fact, Bob Easton said as much:

> As we move from tag soup to CSS governed design, we throw out the layout tables and we throw out the spacer images. Great! It feels wonderful to do that kind of house cleaning. So, what do we do with those “skip navigation” links that used to be attached to the invisible spacer images?
> 
> [Screenreader Visibility](https://web.archive.org/web/20031008102214/http://css-discuss.incutio.com/?page=ScreenreaderVisibility) - Bob Easton (2003)

I had originally missed that in my excitement seeing the `off-left` class.

* * *

I reckon we’ve reached the source of the `visually-hidden` class. At least conceptually. Technically, the class emerged from several ideas, rather than a “eureka” moment. Perhaps more can be gleaned from other CSS techniques such a the desire to improve accessibility of [CSS image replacement](https://en.wikipedia.org/wiki/CSS_image_replacement).

Bob Easton retired in 2008 after a 40 year career at IBM. I reached out to Bob who was surprised to learn this technique was still a topic today†. Bob emphasised the fact that it was always a clumsy workaround and something CSS probably wasn’t intended to accommodate. I’ll share more of Bob’s thoughts later.

† I might have overdone the enthusiasm

Let’s take an intermission!

[My contact page](https://dbushell.com/contact/) is where you can send corrections by the way :)

* * *

## Further adaptations

The `visually-hidden` class stabilised for a period. Visit 2006 in the _Wayback Machine_ to see [WebAIM’s guide to invisible content](https://web.archive.org/web/20060615003534/http://webaim.org/techniques/css/invisiblecontent/) — Paul Bohman’s version is still recommended.

Moving forward to 2011, I found [Jonathan Snook](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility) discussing the “clip method”. Snook leads us to Drupal developer **Jeff Burnz** the previous year.

> \[…\] we still have the big problem of the page “jump” issue if this is applied to a focusable element, such as a link, like skip navigation links. WebAim and a few others endorse using the LEFT property instead of TOP, but this no go for Drupal because of major pain-in-the-butt issues with RTL.
> 
> In early May 2010 I was getting pretty frustrated with this issue so I pulled out a big HTML reference and started scanning through it for any, and I mean ANY property I might have overlooked that could possible be used to solve this thorny issue. It was then I recalled using clip on a recent project so I looked up its values and yes, it can have 0 as a value.
> 
> [Using CSS clip as an Accessible Method of Hiding Content](https://web.archive.org/web/20100621141418/https://adaptivethemes.com/using-css-clip-as-an-accessible-method-of-hiding-content) - Jeff Burnz

It would seem Burnz discovered the `clip` technique independently and was probably the first to write about it. Burnz also notes a right-to-left (RTL) issue. This could explain why pushing content off-screen fell out of fashion.

2010 also saw the arrival of [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/wiki/history) along with [issue #194](https://github.com/h5bp/html5-boilerplate/issues/194) in which _Jonathan Neal_ plays a key role in the discussion and comments:

> If we want to correct for every seemingly-reasonable possibility of overflow in every browser then we may want to consider \[code below\]

```
.visuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}
```

This was their final decision. I’ve removed `!important` for clarity. This is very close to what we have now, no surprise since HTML5 Boilterplate was extremely popular. I’m leaning to conclude that the additional properties are really just there for the “possibility” of pixels escaping containment as much as fixing any identified problem.

**Thierry Koblentz** covered the state of affairs in 2012 noting that: Webkit, Opera and to some extent IE do not play ball with \[clip\]. Koblentz prophesies:

> I wrote the declarations in the previous rule in a particular order because if one day clip works as everyone would expect, then we could drop all declarations after clip, and go back to the original
> 
> [Clip your hidden content for better accessibility](https://web.archive.org/web/20110312112631/https://yaccessibilityblog.com/library/css-clip-hidden-content.html) - Thierry Koblentz

Sound familiar? With those browsers obsolete, and if `clip-path` behaves itself, can the other properties be removed? Well we have 14 years of new bugs features to consider first.

In 2016, **J. Renée Beach** published: [Beware smushed off-screen accessible text](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe#.2tyafsugc). This appears to be the origin of `nowrap` (as [demonstrated by Vispero](https://vispero.com/resources/the-anatomy-of-visually-hidden/#text-wrapping).)

> Over a few sessions, Matt mentioned that the string of text “Show more reactions” was being smushed together and read as “Showmorereactions”.

Beach’s class did not include the kitchen sink.

```
.accessible_elem {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

The addition of `nowrap` became standard alongside everything else.

**Aside note:** the origin of `margin: -1px` remains elusive. One [Bootstrap issue](https://github.com/twbs/bootstrap/issues/25686) shows it was rediscovered in 2018 to fix a browser bug. However, another [HTML5 Boilterplate issue](https://github.com/h5bp/main.css/issues/12) dated 2017 suggests negative margin broke reading order. _Josh Comeau_ shared a `<VisuallyHidden>` [React component](https://www.joshwcomeau.com/snippets/react-components/visually-hidden/#the-css-2) in 2024 without margin. One of many examples showing that it has come in and out of fashion.

We started with WCAG so let’s end there. The latest WCAG technique for [“Using CSS to hide a portion of the link text”](https://www.w3.org/WAI/WCAG22/Techniques/css/C7) provides the following code.

```
.visually-hidden {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

Circa 2020 the `clip-path` property was added as browser support increased and `clip` became deprecated. An obvious change I not sure warrants investigation (although someone had to be first!) That brings us back to what we have today.

Are you still with me?

## Minimum viable technique

As we’ve seen, many of the properties were thrown in for good measure. They exist to ensure absolutely no pixels are painted. They were adapted over the years to avoid various bugs, quirks, and edge cases. How many such decisions are now irrelevant?

This is a classic [Chesterton’s Fence](https://fs.blog/chestertons-fence/) scenario.

> Do not remove a fence until you know why it was put up in the first place.

Well we kinda know why but the specifics are practically folklore at this point. Despite all that research, can we say for sure if any “why” is still relevant?

Back to Ana Tudor’s suggestion.

```
.visually-hidden {
  position: absolute;
  clip-path: circle(0);
}
```

How do we know for sure? The only way is _extensive testing._ Unfortunately, I have neither the time nor skill to perform that adequately here. There is at least one concern with the code above, [Curtis Wilcox noted](https://c.im/@cwilcox808/116055733807371406) that in Safari the focus ring behaves differently.

Other minimum viable ideas have been presented before.

**Scott O’Hara** proposed a different two-liner using `transform`.

```
.vs-hidden {
  position: absolute;
  transform: scale(0);
}
```

> JAWS, Narrator, NVDA with Edge all seem to behave just fine. As do Firefox with JAWS and NVDA, and Safari on macOS with VoiceOver. Seems also fine with iOS VO+Safari and Android TalkBack with Firefox or Chrome.
> 
> In none of these cases do we get the odd focus rings that have occurred with other visually hidden styles, as the content is scaled down to zero. Also because not hacked into a 1px by 1px box, there’s no text wrapping occurring, so no need to fix that issue.
> 
> [transform scale(0) to visually hide content](https://codepen.io/scottohara/pen/QWVOqNY) - Scott O’Hara

Sounds promising!

It turns out **Katrin Kampfrath** had explored both minimum viable classes a couple of years ago, testing them against the traditional `visually-hidden` class.

> I am missing the experience and moreover actual user feedback, however, i prefer the screen reader read cursor to stay roughly in the document flow. There are screen reader users who can see. I suppose, a jumping read cursor is a bit like a shifting layout.
> 
> [Exploring the visually-hidden css](https://frontend.die-katrin.eu/blog/2024/exploring-the-visuallyhidden-css/) - Katrin Kampfrath

Kampfrath’s limited testing found the read cursor size differs for each class. The `clip-path` technique was favoured but caution is given.

A few more years ago, **Kitty Giraudel** tested several ideas concluding that `sr-only` was still the most accessible for specific text use.

> This technique should only be used to mask text. In other words, there shouldn’t be any focusable element inside the hidden element. This could lead to annoying behaviours, like scrolling to an invisible element.
> 
> [Hiding content responsibly](https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/) - Kitty Giraudel

**Zell Liew** proposed a different idea in 2019.

```
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
  pointer-events: none;
}
```

> Many developers voiced their opinions, concerns, and experiments over at Twitter. I wanted to share with you what I consolidated and learned.
> 
> [A new (and easy) way to hide content accessibly](https://zellwk.com/blog/hide-content-accessibly/) - Zell Liew

Liew’s idea was unfortunately torn asunder. Although there are cases like [inclusively hiding checkboxes](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/) where near-zero opacity is more accessible.

I’ve started to go back in time again!

I’m also starting to question whether this class is a good idea. Unless we are capable and prepared to thoroughly test across every combination of browser and assistive technology — and keep that information updated — it’s impossible to recommend anything.

This is impossible for developers! Why can’t browser vendors solve this natively?

!['Help me, web standards working groups. You're my only hope.' caption superimposed over Princess Leia, originally asked Obi-Wan for help (from Star Wars: Episode IV)](https://dbushell.com/images/blog/2026/leia-only-hope.avif)

'Help me, web standards working groups. You're my only hope.' caption superimposed over Princess Leia, originally asked Obi-Wan for help (from Star Wars: Episode IV)

Once you’ve written 3000 words on a twenty year old CSS hack you start to question why it hasn’t been baked into web standards by now.

**Ben Myers** wrote [“The Web Needs a Native .visually-hidden”](https://benmyers.dev/blog/native-visually-hidden/) proposing ideas from HTML attributes to CSS properties. Scott O’Hara responded noting larger accessibility issues that are not so easily handled. O’Hara concludes:

> Introducing a native mechanism to save developers the trouble of having to use a wildly available CSS ruleset doesn’t solve any of those underlying issues. It just further pushes them under the rug.
> 
> [Visually hidden content is a hack that needs to be resolved, not enshrined](https://www.scottohara.me/blog/2023/03/21/visually-hidden-hack.html) - Scott O’Hara

**Sara Soueidan** had [floated the topic](https://github.com/w3c/csswg-drafts/issues/560) to the CSS working group back in 2016. Soueidan closed the issue in 2025, coming to a similar conclusion.

> I’ve been teaching accessibility for a little less than a decade now and if there’s one thing I learned is that developers will resort to using `visually-hidden` utility to do things that are more often than not just bad design decisions.
> 
> Yes, there are valid and important use cases. But I agree with all of @scottaohara’s points, and most importantly I agree that we need to fix the underlying issues instead of standardizing a technique that is _guaranteed_ to be overused and misused even more once it gets easier to use.
> 
> [csswg-drafts comment](https://github.com/w3c/csswg-drafts/issues/560#issuecomment-2810348644) - Sara Soueidan

**Adrian Roselli** has a blog post listing priorities for assigning an accessible name to a control. Like O’Hara and Soueidan, Roselli recognises there is no silver bullet.

> Hidden text is also used too casually to provide information for just screen reader users, creating [overly-verbose content](https://adrianroselli.com/2019/10/stop-giving-control-hints-to-screen-readers.html). For [sighted screen reader users](https://adrianroselli.com/2017/02/not-all-screen-reader-users-are-blind.html), it can be a frustrating experience to not be able to find what the screen reader is speaking, potentially causing the user to get lost on the page while visually hunting for it.
> 
> [My Priority of Methods for Labeling a Control](https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html) - Adrian Roselli

In short, many believe that a native visually-hidden would do more harm than good. The use-cases are far more nuanced and context sensitive than developers realise. It’s often a half-fix for a problem that can be avoided with better design.

I’m torn on whether I agree that it’s ultimately a bad idea. A native version would give software an opportunity to understand the developer’s intent and define how “visually hidden” works in practice. It would be a pragmatic addition.

The `visually-hidden` technique has persisted for over two decades and is still mentioned by WCAG. Yet it remains hacks upon hacks! How has it survived for so long? Is that a failure of developers, or a failure of the web platform?

The web is overrun with inaccessible [div soup](https://jsx.lol/). That is inexcusable. For the rest of us who care about accessibility — who try our best — I can’t help but feel the web platform has let us down. We shouldn’t be perilously navigating code hacks, conflicting advice, and half-supported standards. We need more energy money dedicated to accessibility. Not all problems can be solved with money. But what of the thousands of unpaid hours, whether volunteered or solicited, from those seeking to improve the web? I risk spiralling into a [rant](https://dbushell.com/2025/09/08/trillion-dollar-elephants/) about browser vendors’ financial incentives, so let’s wrap up!

I’ll end by quoting **Bob Easton** from our email conversation:

> From my early days in web development, I came to the belief that semantic HTML, combined with faultless keyboard navigation were the essentials for blind users. Experience with screen reader users bears that out. Where they might occasionally get tripped up is due to developers who are more interested in appearance than good structural practices.
> 
> The use cases for hidden content are very few, such as hidden information about where a search field is, when an appearance-centric developer decided to present a search field with no visual label, just a cute unlabeled image of a magnifying glass.
> 
> \[…\] The people promoting hidden information are either deficient in using good structural practices, or not experienced with tools used by people they want to help.

Bob ended with:

> You can’t go wrong with well crafted, semantically accurate structure.

Ain’t that the truth.