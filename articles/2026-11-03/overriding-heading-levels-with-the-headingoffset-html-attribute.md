---
title: "Overriding Heading Levels With the headingoffset HTML Attribute"
source: "https://blog.master.dev/overriding-heading-levels-with-the-headingoffset-html-attribute/"
publishedDate: "2026-11-02"
category: "css"
feedName: "Frontend Masters Blog"
author: "Daniel Schwarz"
---

There are a few scenarios where we might need to change the level of a heading (`<h1>`–`<h6>`). As an example, we create a component with a `<h1>`, but then we use the component in a different context where it needs to be a `<h2>`. I know, I know, that’s what _component props_ are for, but the `headingoffset` HTML attribute is another option.

Another example: the heading hierarchy is wrong, but we don’t have full control over the HTML. `headingoffset` might be able to fix that too, depending on the HTML that we _do_ have access to.

Firefox Nightly 153 shipped `headingoffset` behind the `dom.headingoffset.enabled` flag, so we’re a way off, and it isn’t really usable until all web browsers support it, but it’s well worth a look now.

## `headingoffset` examples

Kinda simple, really:

`<h1 headingoffset="2">1 + 2 = Heading 3</h1>`Code language: HTML, XML (xml)

And it trickles down too:

`<div headingoffset="3">   <h1>3 + 1 = Heading 4</h1>   <h2>3 + 2 = Heading 5</h2> </div>`Code language: HTML, XML (xml)

Soooo, _math_?

That’s right! We simply add the `headingoffset` value to the level of the heading, even if the heading is nested within multiple containers with `headingoffset` values, and even if the heading itself has a `headingoffset` value:

`<div headingoffset="2">   <div headingoffset="3">     <h1>2 + 3 + 1 = Heading 6</h1>     <h2>2 + 3 + 2 = Heading 7</h2>     <h3 headingoffset="1">2 + 3 + 3 + 1 = Heading 9</h3>   </div> </div>`Code language: HTML, XML (xml)

Wait, 7? Heading _7_? And heading _9_? That’s right!

In fact, `headingoffset` accepts an integer from `0` to `8`. However, the heading levels are capped at 9, so if we were to attach `headingoffset=8` to a `<h6>`, it wouldn’t result in a heading 14, and I can’t imagine why we’d need that anyway.

`<!-- Heading level capped at 9 --> <h6 headingoffset="8">Heading 9</h6>`Code language: HTML, XML (xml)

Skeptical? We can (and should) verify using DevTools:

![The Accessibility panel in Firefox DevTools with a heading selected. The tree shows it as heading (level 9) named Heading 9, and the properties pane shows its DOM node is an h6.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/headingoffset-devtools.png?resize=1024%2C304&quality=80&ssl=1)

## Styling `headingoffset` headings

To style headings influenced by `headingoffset` so that they visually match their new semantic meaning, we’d need to replace element selectors (`<h1>`–`<h6>`) with the [`:heading()`](https://css-tricks.com/almanac/functions/h/heading/) pseudo-class function (which selects headings with the specified computed heading level regardless of what the element actually is).

`<div headingoffset="2">   <h1>2 + 1 = Heading 3</h1> </div>`Code language: HTML, XML (xml)

`h3 {   /* Doesn’t select the heading because it’s a <h1> */ }  :heading(3) {   /* Selects the heading because it computes to a heading 3 */ }`Code language: CSS (css)

## `headingreset`

The `headingreset` attribute does exactly what you might think it does. It removes the influence of `headingoffset` so that the heading element (`<h1>`–`<h6>`) determines the heading level. It’s basically `headingoffset`’s kryptonite.

An appropriate use case for this is to ensure that `headingoffset`s don’t influence headings that are outside of the main document (for example, those within `<aside>` and modal `<dialog>`s):

`<div headingoffset="2">   <h1>2 + 1 = Heading 3</h1>    <dialog headingreset>     <h1>Heading 1</h1>   </dialog> </div>`Code language: HTML, XML (xml)

But what if an element uses `headingreset` _and_ `headingoffset`? In that case, `headingreset` cuts off any outside influence; however, the `headingoffset` applied to the same element will remain in effect. In the following example, the outer `headingoffset=2` is cancelled by `headingreset` while the `headingoffset=3` adds to the `<h1>`, resulting in a heading 4:

`<div headingoffset="2"><!-- Cancelled -->   <h1 headingoffset="3" headingreset>1 + 3 = Heading 4</h1> </div>`Code language: HTML, XML (xml)

## How does `aria-level` fit into all of this?

The `aria-level` attribute overrides the heading level of headings whether they’re influenced by `headingoffset` or not. Like `headingoffset`, `aria-level` also caps out at `9`.

In addition, `aria-level` can be used on non-headings too, to turn them _into_ headings. I can’t think of a real reason to do this, but that’d look something like this:

`<div role="heading" aria-level="1">Heading 1</div>`Code language: HTML, XML (xml)

Ultimately, `headingoffset`s are accumulative whereas `aria-level` is definitive and applied to headings directly.

## Using `headingoffset`

I sometimes struggle to keep track of the heading hierarchy, especially on large webpages and even more so when said webpages are made up of several file includes. I suppose that’s why we have accessibility features in DevTools, right? Still, using too many `headingoffset`s, using them across different files, and/or using them further up in the DOM tree (further away from the headings that they influence) will make it harder to keep track of the hierarchy. Personally, I’d use `headingoffset` and `headingreset` sparingly, but HTML comments can provide a bit of clarity:

`<!-- Main document -->  {% include "component.html" %}  <div headingoffset="1">   {% include "component.html" %} </div>`Code language: HTML, XML (xml)

`<!-- component.html -->  <div>   <!-- headingoffset may influence this heading -->   <h1>Heading</h1> </div>`Code language: HTML, XML (xml)

_Or…_

A wild idea that came to me was to replicate the [document outline algorithm](https://www.smashingmagazine.com/2011/08/html5-and-the-document-outlining-algorithm/) (that never was), which would’ve made all heading elements equal. Instead, the heading level of headings would’ve been determined by how deeply nested they were within sectioning elements such as `<section>`. I can’t recall why it wasn’t implemented, but I do think that `headingoffset` could be used to achieve that same cumulative effect:

`<h1>Heading 1</h1> <div headingoffset="1">   <h1>Heading 2</h1>   <div headingoffset="1">     <h1>Heading 3</h1>     <div headingoffset="1">       <h1>Heading 4</h1>       <div headingoffset="1">         <h1>Heading 5</h1>         <div headingoffset="1">           <h1>Heading 6</h1>         </div>       </div>     </div>   </div> </div>`Code language: HTML, XML (xml)

Thoughts welcome!