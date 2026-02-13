---
title: "You might not need role=\"presentation\""
source: "https://piccalil.li/blog/you-might-not-need-rolepresentation/?ref=main-rss-feed"
publishedDate: "2026-02-12"
category: "css"
feedName: "Piccalilli"
author: "Steve Frenzel"
---

For a brief moment in time, my main job was to assess the compliance of a selection of websites and document this in a report that was handed over to the customer. I carried out this assessment using the so-called [BIK BITV test](https://bitvtest.de/en/tests-und-beratung/bik-bitv-test-web) and, in test step [9.4.1.2 Name, Role, Value](https://bitvtest.de/pruefschritt/bitv-20-plus-web/bitv-20-plus-web-9-4-1-2-name-rolle-wert-verfuegbar), I noticed time and again that `role="presentation"` was used in a way that was either technically questionable or even degraded accessibility.

Because I have seen this pattern so often, I’m going to to use a couple of real-life examples to find out why this is the case. The examples have been edited and shortened to make them easier to understand.

I will use the code to assess what the intention for using `role="presentation"` might have been and what could have been done differently. In my experience, there’s only a few real use cases for this attribute value, which we will get to later in the article.

## [What you might read about this attribute](#what-you-might-read-about-this-attribute)

We will use the specifications to take a closer look at what `role="presentation"` does, how it is used in the wild, and what it should actually be used for.

## [The official specs](#the-official-specs)

If you take a look at the specification, you will immediately notice the prominent note right at the beginning (emphasis ours):

> In ARIA 1.1, the working group introduced none as a synonym to the presentation role, due to author confusion surrounding the intended meaning of the word “presentation” or “presentational.” Many individuals erroneously consider `role="presentation"` to be synonymous with `aria-hidden="true"`, and we believe `role="none"` conveys the actual meaning more unambiguously.

This gives us an initial indication of why this attribute might be used incorrectly.

Authors seem to understand “presentational” as “only to be seen”; not heard. This is the behaviour of `aria-hidden`, which hides an element in the accessibility tree so that it is no longer announced when assistive technology is used. `role="presentation"` only affects the role, but not an element and its content.

> The intended use is when an element is used to change the look of the page but does not have all the functional, interactive, or structural relevance implied by the element type, or may be used to provide for an accessible fallback in older browsers that do not support WAI-ARIA.

Spoiler: they’re describing layout tables here, which we’ll get into later in the article.

> An element whose content is completely presentational (like a spacer image, decorative graphic, or clearing element);

The first two examples sound like image elements. If it is a decorative `svg` element, `aria-hidden="true"` would make more sense. Whereas for an `img` element `alt=""` would be more appropriate for hiding it, as this makes the intention much more obvious and it comes for free with the `img` element.

“Clearing element” might refer to using an element to clear float behaviour, where you would use `clear: both;` after using `float: left;` or `float: right;`, so it wouldn’t get dragged up the flow and break the layout.

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=in-article-ad)

> An image that is in a container with the `img` role and where the full text alternative is available and is marked up with `aria-labelledby` and (if needed) `aria-describedby`;

To be completely honest, I have never seen the following example in the wild, and it is much easier to implement — and for users to read — if you use the `alt` attribute for alternative text in an image.

In the following example, the `hidden` attribute is used to hide the `<span>` element visually. However, it’s still available in the DOM, so it can be referenced using `aria-labelledby` , up there in the sibling `<div>` element, for example.

`<div role="img" aria-labelledby="image-title">   <img src="example-image.jpg" role="presentation">   <span id="image-title" hidden>A beautiful sunset over the ocean</span> </div>`

In the accessibility tree, in that context, the image is displayed correctly with the corresponding alternative text, but not the source URL. If you use [axe-linter](https://www.deque.com/axe/devtools/linter/) in development, removing `role="presentation"` will trigger an alarm that images need alternative text.

> An element used as an additional markup “hook” for CSS \[…\]

This means that in CSS, you use this attribute to target an element with `role="presentation"`, for example like this:

`table[role=presentation] {   /* Do something */ }`

> A layout table and/or any of its associated rows, cells, etc.

Again, we’ll get into this pattern later on.

The specification contains many more explanations and examples, which you are welcome to look at yourself. One of the most important sentences for me is this one: _“\[…\] the presentation role causes a given element to be treated as having no role or to be removed from the accessibility tree, but does not cause the content contained within the element to be removed from the accessibility tree.”_

The following example is not intended for use in production, but is only meant to illustrate that when using `role="presentation"`, the element itself and the elements within it lose their semantic meaning, but the content is still available:

`<!-- Output: One generic element containing  two generic elements with content. --> <ul role="presentation">   <li> Sample Content </li>   <li> More Sample Content </li> </ul>  <!-- Output: Unordered list element containing two list items. --> <ul>   <li> Sample Content </li>   <li> More Sample Content </li> </ul>`

The semantic HTML is still displayed in the source code, however, if you look at them in the accessibility tree, they are displayed as generic elements, so they could just as well be `<div>` or `<span>` elements.

Enough theory, let’s have a look at some real world examples!

## [Questionable examples](#questionable-examples)

Some of these examples won’t create any real barriers for users and I consider them not nice, but more _harmless_. Others will cause problems, because `role="presentation"` has removed important semantic meaning, which can cause more issues because of nested elements.

You will quickly learn that I removed this attribute in _all_ of my suggested fixes, as it’s just **not necessary**. It was also sometimes impossible for me to guess why developers used `role="presentation"` in the first place.

### The “invisible” `iframe` element

`<iframe src="..." title role="presentation" loading="eager" style="width: 0px; height: 0px; border: 0px; display: none;">   <!-- More code  --> </iframe>`

This `iframe` element contains a single `<script>` element for cookie logic. The intention here was most likely to hide it from assistive technology, as the CSS code suggests.

However, the content is still available because only the semantic meaning was removed from the `iframe` element. In addition, a `title` attribute without content was used here, which is incorrect.

Instead, the desired output could be implemented as follows:

`<iframe aria-hidden="true" src="..." loading="eager">   <!-- More code  --> </iframe>`

### The list with no items

`<nav> 	<ul> 	  <li role="presentation"> 	  	<a href="/">To homepage</a> 	  </li> 	  <!-- More code  --> 	</ul> </nav>`

Why `role="presentation"` is applied to a list element here is beyond me. Especially since this is a navigation element and the semantics here have to be on point. Fortunately, it can be easily fixed by removing the attribute and using `aria-current="page"` for the current page.

### The “hidden” image

`<a href="/shop" aria-label="Shop">   <svg role="presentation">     <title>Shopping cart</title>     <!-- More code  -->   </svg> </a>`

As we learned from the [specification](https://www.w3.org/TR/wai-aria-1.1/#presentation), `role="presentation"` only removes the semantics of an element, but not its content, so the content of the `<title>` element should still be available, right? As `aria-label` is present, an accessible name is provided by this attribute, but _not_ the `<title>` element itself.

If you would remove `aria-label`, it would have no accessible name at all, meaning `role="presentation"` has completely purged the `<title>` element from the accessibility tree! 🤯

The goal here was probably to hide the alternative text of the `<svg>` element, which worked. However, there are several ways to solve this use case more cleanly, and I would do it this way:

`<a href="/shop">   <svg>     <title>Shop</title>     <!-- More code  -->   </svg> </a>`

In this case, we do not need `aria-label`, as the alternative text of the image is used as the accessible name.

### Make it semantic, then undo it

`<a href="/retail">   <p role="presentation">Search store</p> </a>`

This is an awkward solution, but it does not present any real barriers for users, as the link text is still available. The developers probably wanted to hide the `<p>` element semantically, which is exactly what happens here. However, it could also have been done like this:

`<a href="/retail">   Search store </a>`

### Technically meh, but still working

`<div role="presentation">   <section role="presentation" aria-label="Header">     <!-- More code  -->   </section> </div>`

This is a very interesting case! First of all, I don’t understand why you would remove the semantic meaning but still use a semantic element.

In theory, `<section>` would be a generic element with an aria-label, which is prohibited according to the [specification](https://www.w3.org/TR/wai-aria-1.2/#generic), which would result in a failure of test step [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value).

But because `aria-label` is present, this is ignored by the browser and the element is displayed correctly in the accessibility tree. Amazing! A technically clean solution would look like this:

`<div>   <section aria-label="Header">     <!-- More code  -->   </section> </div>`

### Adding an accessible name and then removing it

`<a href="/profile">   <div>     <div>       <img alt="Go to profile" role="presentation" src="...">     </div>   </div> </a>`

The intention is not clear to me here either, because there are some problems due to `role="presentation"`.

The `<a>` element needs an accessible name, which is not available because the `<img>` element has no semantic meaning and the `alt` attribute cannot be applied to a generic element.

Fortunately, these problems can be solved by removing `role="presentation"`! I also removed the `<div>` elements because personally, I don’t like the taste of [div soup](https://cdn.matthewjamestaylor.com/img/gmail-div-soup.png).

`<a href="/profile">   <img alt="Go to profile" src="..."> </a>`

The alternative text is now linked to the image, and the accessible name of the link is provided by the alternative text. This one is similar to the “hidden” image example from earlier.

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)

## [The few good use cases of this attribute](#the-few-good-use-cases-of-this-attribute)

There are a couple of suggestions in the specs when you _could_ use `role="presentation"`, but I think only a few use cases could apply: [Tabbed interfaces](https://inclusive-components.design/tabbed-interfaces/), [menu pattern](https://www.stevefrenzel.dev/posts/menu-and-navigation-the-difference/#menu-example) and a layout table. Let’s have a closer look at a layout table, which is using a `<table>` element for page layout.

Thanks to [modern CSS](https://nerdy.dev/cascading-secret-sauce), there’s no real need to use layout tables for websites anymore! We can produce [flexible and robust designs by using flexbox and / or grid](https://every-layout.dev/). The one use case where `role="presentation"` might come in handy _could_ be email templates though.

If you are forced to use layout tables for your emails, Harvard University has a great article for you on [creating accessible emails](https://accessibility.huit.harvard.edu/creating-accessible-emails). The most relevant part for this article is the following sentence (emphasis ours):

> If you must use tables for layout, add the attribute `role="presentation"` on every table element to ensure screen readers won’t treat them as data tables.

In the [W3C Tips and Tricks section for tables](https://www.w3.org/WAI/tutorials/tables/tips/), they’re also _very_ clear on the usage of layout tables (emphasis ours):

> Tables should not be used for layout purposes. Use Cascading Style Sheets (CSS) for layout. If there are already layout tables present, don’t use structural elements (like `<th>` or `<caption>`) \[…\], and do add `role="presentation"` to the `<table>` element.

The [University of Michigan](https://accessibility.umich.edu/basics/concepts-principles/tables) keeps it more brief but same advice:

> Only use tables to present tabular data, not to create a visual layout. Use CSS or styling options to handle layout.

In [Screen reader heuristics for presentational tables](https://brothercake.com/Ref/presentational-tables.html), you’ll find some examples on how to use `role="presentation"` in the context of a layout table.

## [Wrapping up](#wrapping-up)

Thanks to a detailed analysis of the specifications, we have learned what `role="presentation"` does and how few use cases there actually are for this attribute. We have also seen from real-life examples how misunderstood the functionality of this attribute is among developers.

The only real use cases would be tabbed interfaces, the menu pattern and email templates, but even here, one could (if possible) switch to plain text emails and avoid using `role="presentation"`.

* * *

Many thanks to [Heydon Pickering](https://heydonworks.com/) for their help checking over this article and lending us their endless accessibility wisdom.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=in-article-ad)