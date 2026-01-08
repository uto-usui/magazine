---
title: "How do you mark up an accordion?"
source: "https://www.sarasoueidan.com/blog/accordion-markup/"
publishedDate: "2018-09-03"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [No JavaScript](#no-javascript)
2.  [A series of questions and answers: hx + div](#a-series-of-questions-and-answers%3A-hx-%2B-div)
3.  [A list of questions with answers: ul or dl](#a-list-of-questions-with-answers%3A-ul-or-dl)
    1.  [An unordered list of questions with answers: ul li + hx div](#an-unordered-list-of-questions-with-answers%3A-ul-li-%2B-hx-div)
    2.  [A definition list](#a-definition-list)
4.  [The native HTML accordion: details + summary](#the-native-html-accordion%3A-details-%2B-summary)
5.  [So, why does this all even matter?](#so%2C-why-does-this-all-even-matter%3F)
6.  [Further Resources](#further-resources)

I made [a poll on Twitter](https://twitter.com/SaraSoueidan/status/1035476406334054400) the other day asking the #lazyweb how they would mark up an FAQ section — or a list of questions and their corresponding answers. I specifically asked for _markup_ suggestions. Turns out, people mark questions and answers up differently. I got some interesting insight from the responses I got that partly changed the way I would approach building an FAQ section, and some validation for the way I always have built them. The discussion was too interesting to not summarize in an article. The different possible markup approaches as well as useful resources are discussed below.

### No JavaScript

The requirement for answering this question was to think of the answer in a no-JavaScript case.

> Hey [#lazyweb](https://twitter.com/hashtag/lazyweb?src=hash&ref_src=twsrc%5Etfw), I got a small Friday poll for you:
> 
> How do you mark up a list of questions and answers? (Think: FAQ)
> 
> I’m talking about semantic markup, so forget about accordions for a second and assume there is no JS for that.
> 
> Would you use:
> 
> — Sara Soueidan (@SaraSoueidan) [August 31, 2018](https://twitter.com/SaraSoueidan/status/1035476406334054400?ref_src=twsrc%5Etfw)

Why?

Usually, FAQs are eventually turned into an accordion. Accordions require JavaScript to work (with the exception of the native `<details>` element which I’ll talk about shortly), and that JavaScript, if designed well, can be applied to almost any kind of proper markup — regardless of what elements are used to mark the questions and answers up. That’s why I specifically asked people to think about HTML semantics, not interactive behavior; otherwise, the one answer I would have probably gotten would have been “accordion”.

I believe that it is imperative to think about how a component would render if no JavaScript behavior was available if you want that component to be truly accessible. Semantic HTML is the foundation of truly inclusive content. Start with the bare bones — the markup, and think about how it would render if no CSS or JS were enabled. _Then_, enhance the component by adding interactive behavior to it using JavaScript, making sure that you don’t sacrifice the accessibility of it in the process. This usually means applying and using proper ARIA roles and attributes, [progressively applied](https://developer.paciellogroup.com/blog/2018/06/short-note-on-progressive-aria/), via Javascript.

An FAQ can be thought of as a _list_ of questions with answers, or a _series_ of questions and answers.

### A series of questions and answers: hx + div

A series of questions and answers can be marked up by using a series of headings for the questions, and paragraphs (probably wrapped in a `<div>`) for each answer. This is one of the most commonly used code patterns.

```
<h3>How would you mark up a series of questions and answers?</h3><div>	I would probably use headings, each followed by an answers most likely wrapped in a semantic-less wrapper.</div><h3>How would you mark up a series of questions and answers?</h3><div>	I would probably use headings, each followed by an answers most likely wrapped in a semantic-less wrapper.</div><h3>How would you mark up a series of questions and answers?</h3><div>	I would probably use headings, each followed by an answers most likely wrapped in a semantic-less wrapper.</div>
```

The whole series of questions and answers would then also be wrapped in a container, or each pair of question and answer can be wrapped in an `<article>`, and they can easily be scripted to add accordion behavior by potentially replacing the heading text content with a toggle `<button>` which controls the expanded/collapsed answer “panel”. ARIA attributes would be used to establish the relationship between the question’s toggle button and the associated answer, and icons can also be added to the button inline using JavaScript as well.

The enhancement of the markup to an interactive accordion is outside the scope of this article. Refer to the Further Resources section below for links to learn more about adding accordion interactivity to basic markup.

```
<h3>	<button aria-controls="myID-1" aria-expanded="false">		<span>How would you mark up a series of questions and answers?</span>		<!-- svg icon here, styled and positioned using CSS -->	</button></h3><div id="myID-1" hidden >	I would probably use headings, each followed by an answers most likely wrapped in a semantic-less wrapper.</div>	
```

The way you might approach turning it into an accordion might be slightly different, but the requirements for making an accordion accessible should still be applied, so, in essence, the final result wouldn’t be too different.

**Advantages of this approach:**

-   The markup is simple and can be easily converted into an interactive accordion. ✔
-   Assistive technology users are able to navigate the FAQ using the headings. ✔

### A list of questions with answers: ul or dl

If you think about FAQs as _a list of questions with answers_, you’ll probably want to use HTML lists to mark them up.

I’d probably not use an ordered list (`<ol>`) because the order of the questions is usually irrelevant. That leaves us with unordered lists (`<ul>`) and definition lists (`<dl>`).

What both lists have in common is the semantics of a list — meaning that the questions and answers would be conveyed to assistive technologies as a list of items.

#### An unordered list of questions with answers: ul li + hx div

If you use an unordered list, each list item would contain both the question and the question’s corresponding answer.

The semantics of an unordered list item `<li>` would not be enough to represent and distinguish the question and/from the answer. So I’d consider wrapping the question in a heading. This does feel odd, as I’ve never thought that an `<li>` as a container to a heading, but this code has some important benefits.

I’d next wrap the content of the answer in a `<div>` so that I can easily toggle it when I want to add accordion functionality to the FAQ.

```
<ul>	<li>		<h3>What is a bird’s favorite sleeping spot?</h3>		<div>			<p>Their owner’s shoulders and foreheads. They like to get warmth from a hooman’s neck and face.</p>			<p> They also like always reminding you that they’re the boss.</p>		</div>	</li></ul>
```

**Advantages of this approach:**

-   Assistive technologies (ATs) will announce the number of items, so their users will get an overview of how many questions there are. ✔
-   AT users will be able to navigate the FAQ list using the headings. ✔
-   It is also fairly easy to turn into an accordion using JavaScript and ARIA, similar to what we saw in the previous section. ✔

#### A definition list

A definition list is similar to ordered and unordered lists. What distinguishes it from other lists is that it is made up of key/value pairs.

> The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
> 
> —MDN

I have always used definition lists (`<dl>`) to mark up FAQs. I like the fact that a `<dl>` has a series of terms (`<dt>`) and descriptions (`<dd>`). A question would be a term. The answer would be its description.

This approach got the most votes in my poll. This may partially be due to the fact that [the specification mentions](http://w3c.github.io/html/grouping-content.html#the-dl-element) questions and answers as an example usage for definition lists:

> Term-description groups may be names and definitions, **questions and answers**, categories and topics, or any other groups of term-description pairs.

_(Emphasis mine)_:

Markup for a `<dl>`\-based FAQ would look like so:

```
<dl>	<dt>Your question here?</dt>	<dd>		<p>You answer here. It can be anything and as long as you want, and contain any type of content.</p>	</dd>	<dt>Your question here?</dt>	<dd>		<p>You answer here. It can be anything and as long as you want, and contain any type of content.</p>	</dd></dl>
```

Converted to an interactive accordion, and similar to what we’ve seen before, it would look like this:

```
<dl>	<dt><button aria-controls="myID-1" aria-expanded="false">Your question here?</button></dt>	<dd id="myId-1" hidden >		<p>You answer here. It can be anything and as long as you want, and contain any type of content.</p>	</dd>	<dt><button aria-controls="myID-2" aria-expanded="false">Your question here?</button></dt>	<dd id="myId-2" hidden >		<p>You answer here. It can be anything and as long as you want, and contain any type of content.</p>	</dd></dl>
```

I’ve never hit any road blocks styling definition lists, but that’s probably because none of my projects required any styles that were not possible using the default markup. But many developers have, as the Twitter thread shows.

Most styling limitations were due to the fact that it was invalid HTML to have a `<div>` as a child of the `<dl>`. This, in turn, meant that it would be difficult to group and style pairs of terms and descriptions.

Today, it is perfectly [valid](http://w3c.github.io/html/grouping-content.html#the-dl-element) to add a `<div>` as a child to a `<dl>`. That said, [Steve Faulkner](https://twitter.com/stevefaulkner) points out that “this can cause issues for screen readers as the pattern changes the way the semantics are represented in some browsers.” Check out [his test cases and results](https://s.codepen.io/stevef/debug/GxwaoP) for more context and details.

**Notes about this approach:**

-   _Some_ assistive technologies (ATs) will announce the number of items, so users of those technologies get an overview of how many questions there are. This, however, is unfortunately [not consistent across all tech](https://codepen.io/aardrian/full/NzGaKP/).
-   AT users will _not_ be able to navigate the questions like they could with headings.
-   It is fairly easy to turn into an accordion using JavaScript and ARIA. ✔

Even though I will not be using them for marking up FAQs from now on after the discussions I had as a result of this poll, I would still use definition lists for other, more proper use cases. For example, I’ve used them before within articles where I list a set of available attributes or properties and then elaborate on each one and describe what it does.

![Screenshot of an example usage of a definition list from one of my articles.](https://www.sarasoueidan.com/assets/images/dl-example.png)

My [SVG Coordinate Systems guide](https://www.sarasoueidan.com/blog/svg-coordinate-systems) contains a perfect use case for definition lists.

### The native HTML accordion: details + summary

> The `<details>` element represents a disclosure widget from which the user can obtain additional information or controls.
> 
> – [W3C HTML specification](https://www.w3.org/TR/html51/interactive-elements.html#the-details-element)

Inside `<details>`, we can put any sort of content we want.

`<details>` has a friend called `<summary>`. When present inside `<details>`, the first `<summary>` element child represents the summary or legend of the `<details>`.

Essentially, we can use `<details>` to create an accordion-like widget that the user can toggle open and closed. The `<summary>` element, when present, acts as the content of the toggle for the accordion.

Before doing the Twitter poll, I’d never considered using `<details>` and `<summary>` to mark up FAQs. I’ve always thought of the semantics of these elements too literally: a summary is, well, a summary of the content of the details. Since the summary of an answer is derived from that answer itself then it is also an answer; and then a question could not be a

because the question is not an answer. Confused yet?

I had a discussion about this with my friend [Scott O’Hara](https://twitter.com/scottohara) after tweeting the poll. We both made valid points, but the main reason we were confused and were disagreeing is that I was talking about `<summary>` as a “summary” whereas Scott was referring to the `<summary>` element as, well, a generic “toggle” element.

Turns out, and I‘ve finally made my peace with the fact, that `<details`\> and `<summary>` don’t literally represent content and summary of that content. The spec editors settled for these names out of a bunch of other options they had. Because naming things is hard.

> Because expressing perfect meaning in a single small, easy-to-spell word is hard, so we approximate.
> 
> I remember there being a lot of possibilities when naming that -
> 
> was my favorite. 😀
> 
> — 🌺Taudry Hepburn🌺 (@tabatkins) [August 31, 2018](https://twitter.com/tabatkins/status/1035560054768857089?ref_src=twsrc%5Etfw)

I would have preferred `<toggle>` and `<panel>` as truly generic names. But if `<details>` and `<summary>` are just meant to be generic names, then using them to mark up FAQs starts to make a tiny bit more sense.

> I think of it as: the "summary" is a short description of what you will see if you expand the details. A question in a FAQ is a summary of what the answer will cover.
> 
> But yeah, I like toggle/panel more. Someone should have got you on the committee. But it's too late now.
> 
> — Amelia Bellamy-Royds (@AmeliasBrain) [August 31, 2018](https://twitter.com/AmeliasBrain/status/1035584167327621120?ref_src=twsrc%5Etfw)

So, marking an FAQ up using `<details>` and `<summary>` is pretty simple:

```
<details>	<summary>Why is naming things so hard?</summary>	<p>Because it just is.</></details><details>	<summary>Why is naming things so hard?</summary>	<p>Because it just is.</></details>
```

… and it comes with **some nice advantages, and some limitations:**

-   You get the accordion behavior (collapsible panels) baked in by default. ✔
-   The accordion is mostly fully accessible (ATs and keyboard) by default. Scott O’Hara wrote and shared [the results of his tests](https://www.scottohara.me/blog/2018/09/03/details-and-summary.html) with popular screen readers. Make sure to read his post before deciding to use `<details>` as an accordion, as there are some things you’ll need to be aware of:

> For general use within the context of a larger section of content, details and summary are well supported. However, if you want to treat them as a more complex accordion component, or need to support Internet Explorer and Edge, you’re going to need some JavaScript (and ARIA attributes for IE/Edge).

-   The `<details>` element and its `<summary>` are fairly easily styled. (Some specific browser handling is required but nothing too complex.) ✔
-   You _can’t_ currently animate the opening and closing of the details panel. But you can [work around](https://codepen.io/brianhaferkamp/pen/jywbVZ) it by animating the content inside the `details`.
-   Opera Mini, IE and Edge currently don’t [support](https://caniuse.com/#feat=details) `<details>` and `<summary>`. But,
-   `<details>` and `<summary>` degrade gracefully to show their content by default, without the interactive behavior, which, in my opinion, is a perfectly acceptable fallback experience.

### So, why does this all even matter?

Because [semantic HTML matters](https://twitter.com/Mandy_Kerr/status/1027561153138896897) and [is essential for creating truly inclusive and functional Web sites](https://medium.com/@mandy.michael/building-websites-for-safari-reader-mode-and-other-reading-apps-1562913c86c9) that work across the widest range of apps possible.

Sure, there are different ways for doing one thing, but as long as all these different ways offer true accessibility, then we have the freedom to choose whichever technique we like.

It’s always necessary, in my opinion, to consider what content would render and look like in foreign environments, or in environments that are not controlled by our own styles and scripts. Writing semantic HTML is the first step in achieving truly resilient Web sites and applications.

### Further Resources

If you need to learn more about creating accordions that are accessible, I recommend checking these resources out:

-   [Accessible ARIA Accordions](https://www.scottohara.me/blog/2017/10/25/accordion-release.html) by Scott O’Hara.
-   [Collapsible Sections](https://inclusive-components.design/tabbed-interfaces/) by Heydon Pickering.
-   [Accordion](https://davatron5000.github.io/a11y-nutrition-cards/components/accordion) accessibility expectations by Dave RUpert.
-   [Accordion WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion)

Thank you for reading.

—Sara

Huge thanks to everyone who contributed to the Twitter thread with insightful content, as well as to my friend Scott O’Hara, who has taught me, and still teaches me, so much about accessibility.

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.