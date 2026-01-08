---
title: "CSS-only scrollspy effect using scroll-marker-group and :target-current"
source: "https://www.sarasoueidan.com/blog/css-scrollspy/"
publishedDate: "2025-08-18"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [Scrollspy with CSS scroll markers](#scrollspy-with-css-scroll-markers)
2.  [Enriching HTML anchors to become scroll markers](#enriching-html-anchors-to-become-scroll-markers)
    1.  [Using scroll-target-group and :target-current](#using-scroll-target-group-and-%3Atarget-current)
    2.  [Live demo](#live-demo)
        1.  [A note on accessible active anchor styling](#a-note-on-accessible-active-anchor-styling)
3.  [The semantic accessibility of HTML scroll markers](#the-semantic-accessibility-of-html-scroll-markers)

[The _Bootstrap Scrollspy_](https://getbootstrap.com/docs/5.3/components/scrollspy/)—now commonly known as just “Scrollspy”—is a feature that automatically updates navigation links based on the user’s scroll position to indicate which link is currently active in the viewport. It is popular because it aims to enhance the user experience by providing visual cues about which part of the content is currently being viewed.

Sorry, your browser doesn't support embedded videos.

The Scrollspy effect demonstrated in [the Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/scrollspy/#navbar) shows the navbar links are highlighted when their respective target sections are scrolled into view.

By default, in-page navigation links (`<a href="">`) don’t get highlighted when their targets are scrolled into view.

Historically, the Scrollspy effect has required us to use JavaScript to ‘spy’ on sections of content in a page (such as in an article) and then programmatically update the navigation links and indicate which one is “active”. That typically involved adding a CSS class name (e.g. `.active`) or an HTML attribute (e.g. `data-active`) to style the active link.

Today, a new CSS property and pseudo-selector are available that are meant to enable us to create the Scrollspy effect with just two lines of CSS and no JavaScript.

If you’ve read [my previous article discussing the accessibility of CSS-only carousels](https://www.sarasoueidan.com/blog/css-carousels-accessibility/), then you’re already familiar with the [CSS Overflow Module Level 5](https://drafts.csswg.org/css-overflow-5/), and the concept of “scroll markers”.

You will also be familiar with the fact that there are CSS-generated scroll markers (`::scroll-marker`), as well as HTML (and SVG) scroll markers (`<a href="">`).

In the carousels article, I examined a CSS-only [Scrollspy example](https://chrome.dev/carousel/vertical/scroll-spy/) from the ‘CSS Carousels’ gallery.

The Scrollspy example in the Carousels gallery is created using CSS-generated scroll markers.

By default, CSS-generated scroll markers are semantically exposed as tabs, not links, which introduced a bunch of usability issues with that pattern that I outlined in the previous post.

As I noted in that post:

> Instead of using `::scroll-marker`s to implement \[the Scrollspy\] example, I would instead expect to be able to create a semantic table of contents using an HTML list of `<a href="">`, and then use the `:target-current` pseudo-class to apply active styles to a link (the native scroll marker!) when its target is scrolled into view. \[…\] However, that doesn’t seem to work at the moment.
> 
> Unfortunately, even though the specification states that it defines the ability to associate scroll markers with elements in a scroller, **the current implementation of the `:target-current` pseudo-class seems to work only for CSS-generated `::scroll-markers`, but not for native HTML ones.**
> 
> Personally, I think `:target-current` is one of the most useful additions to the specification. It’s unfortunate that its current implementation is limited to the new pseudo-elements.

Since I published that post, a new property [has been proposed](https://github.com/WebKit/standards-positions/issues/514) and added to the specification. This property is named `scroll-target-group` and it “_enriches HTML anchor elements functionality to match the pseudo elements one_”, which makes it possible to use the `:target-current` selector to highlight links when their respective targets are in view. 🙌🏻

This post is about the `scroll-target-group` property and how to use it with the `:target-current` pseudo-selector to create the Scrollspy effect with CSS.

Using the `scroll-target-group` property (we’ll demonstrate how shortly), you can “promote” HTML anchors to become ‘scroll markers’.

When **a group of HTML anchor elements** becomes scroll markers, the browser will run a specific algorithm to determine which anchor in the group is the active anchor, just like it determines the active scroll marker in a group of CSS `::scroll-marker`s.

The active scroll marker then matches the `:target-current` pseudo-class, which you can use to visually highlight the active anchor.

**All this requires no JavaScript on our part**, which is pretty impressive.

Now, in order to use the `scroll-target-group` property, you will want to use it **not to the anchors themselves, but to an element containing the anchors.** Let’s demonstrate how.

### Using scroll-target-group and :target-current

In the CSS Carousels article we talked about how the `scroll-marker-group` property is used to _generate_ a grouping container for a group of `::scroll-marker`s. When you use the `scroll-marker-group` property, both the scroll marker group container and the scroll markers themselves are generated by the browser as CSS pseudo-elements.

On the other hand, the `scroll-target-group` property is meant to be a used on _an HTML element_ which _contains_ the HTML scroll markers (the links / anchors).

For example, say you have a Table of Contents (TOC) on an article page and you want to style the active link within the TOC when its target section is scrolled into view.

To use this property, you’ll want to start by setting up the semantic structure of the links:

```
<nav aria-labelledby="toc-label">	<span id="toc-label" hidden>Table of Contents</span>    <ol role="list">        <li><a href="#one">Section One</a></li>        <li><a href="#two">Section Two</a></li>        <li><a href="#three">Section Three</a></li>        <li><a href="#four">Section Four</a></li>        <li><a href="#five">Section Five</a></li>    </ol></nav>
```

We have a named navigation landmark that contains an ordered list of anchors pointing to sections of content on the page.

These links are, by default, keyboard-operable and they come with default link behavior and accessibility built in.

To make these links behave like scroll markers, you will then use the `scroll-target-group` property on their container—this can be the `<ol>` or the `<nav>` element.

```
nav[aria-labelledby=toc-label] {    scroll-target-group: auto;}
```

The `scroll-target-group` property specifies whether the element it is used on is **a scroll marker group container.** It accepts one of two values: `none` and `auto`.

When the value of `scroll-target-group` is `auto`, the element establishes a scroll marker group container forming a scroll marker group containing all of the scroll marker elements for which this is the nearest ancestor scroll marker group container..

Now as the user scrolls through the sections of content, the browser will determine which link is currently active.

The active link will automatically match the `:target-current` selector, which you can use to highlight the link by giving it distinctive styles within the group:

```
a:target-current {    font-weight: bold;    text-decoration-thickness: 2px;}
```

### Live demo

Here’s a [live example](https://www.sarasoueidan.com/assets/code/css-scrollspy/) of the CSS Scrollspy effect in action:

At the time of writing, you need to use Chrome 140+ to see the HTML scroll markers in action.

And here is [a Codepen](https://codepen.io/SaraSoueidan/pen/ByoJxLZ/659f934f32865dab8a95f4efa46bcffc) for you to tweak at.

Here’s a video recording of the example in action:

Sorry, your browser doesn't support embedded videos.

So, using just a couple of lines of CSS, you can now create a scrollspy effect without needing a single line of JavaScript.

One more thing!

Usually when you load a page that has a fragment identifier in the URL, the browser scrolls the page to the ‘target element of the document’ and you can use the `:target` pseudo-class to apply custom highlight styles to that element.

Until today, there hasn’t been a way to style/highlight the (in-page) _link_ that points to that target element.

Today, if a link is a scroll marker, the `:target-current` styles will be automatically applied to the link when the browser scrolls to the document’s target element. This means that you can now combine `:target` and `:target-current` to style the target element identified in a URL fragment identifier _and_ the link to that element.

HTML anchor elements (`<a href="">`) come with default link accessibility and behavior built into them: they are exposed as `link`s to screen readers, and they come with keyboard interactions built into them by the browser.

But an `<a href="">` element does not come with a built-in way to communicate that it is “active”, or that it is “the current” link within a group of links.

A scroll marker, by definition, has a meaningful purpose: it lets the user know which part of content is currently being viewed.

What this means is that when you visually highlight an active link, you’re communicating meaningful information to the user.

To ensure that you are not excluding any of your users, you want to make sure that this information is communicated to _all_ your users, including screen reader users. **This is a baseline accessibility requirement.**

WCAG Success Criterion [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=131%2C141#info-and-relationships) states that information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

So, how do you communicate that a link is active to screen reader users? How do you provide the same meaningful affordance that you’re creating with CSS to someone who can’t see?

Since there is no native HTML way to indicate that a link within a group is currently “active”, you can use ARIA to communicate this information.

To indicate which anchor is currently active, ARIA provides a conveniently-named attribute: [`aria-current`](https://w3c.github.io/aria/#aria-current).

> \[The `aria-current` state attribute\] indicates the element that represents the current item within a container or set of related elements. … The `aria-current` attribute is used when an element within a set of related elements is visually styled to indicate it is the current item in the set.

Setting `aria-current` to `true` on the “active” anchor ensures that screen reader users get the same information that sighted users get about which part of the content is currently shown.

```
<nav aria-labelledby="toc-label">	<span id="toc-label" hidden>Table of Contents</span>    <ol role="list">        <li><a href="#one">Section One</a></li>        <li><a href="#two" aria-current="true">Section Two</a></li>        <li><a href="#three">Section Three</a></li>        <li><a href="#four">Section Four</a></li>        <li><a href="#five">Section Five</a></li>    </ol></nav>
```

When the user scrolls through the sections of content and the active link is visually highlighted, this link must have `aria-current=true` set on it.

Because the purpose of the `scroll-target-group` property and the `:target-current` selector is to allow us to create JavaScript-_free_ native HTML scroll markers, we should expect the browser to add and manage the necessary ARIA attribute(s) required for scroll markers to be inclusive. (After all, that’s the whole premise of this feature: to write a few lines of CSS and let the browser handle all the behavior for us.)

However, at the time of writing of this post, Chrome (currently the only browser that has implemented this feature) doesn’t add `aria-current=true` to the active anchor yet.

If you inspect the accessibility information of the links in the demo from the previous section you can see that the state of the active anchor is not communicated to assistive technologies when the anchor becomes active (see screenshot below). This is unfortunately akin to some of the accessibility issues with CSS Carousels that I discussed in the previous post.

![Screenshot of the Chrome DevTools open on the Scrollspy example page. The DevTools show that the active link in the table of contents does not have aria-current=true set on it.](https://www.sarasoueidan.com/assets/images/css-scrollspy/scrollspy-a11y-tree.png)

I filed [a Chromium issue](https://issues.chromium.org/u/1/issues/439294790) and I’m hoping this will be resolved soon enough to make this feature usable. I will update this post when the issue is resolved.

If you want to use this feature as a progessive CSS enhancement today, keep in mind that you _will_, for the time being, need to use JavaScript to add `aria-current` to the active anchor when its corresponding target scrolls into view, **otherwise you risk an instant WCAG 1.3.1 violation.**

I’ll personally wait till the issue is resolved and the feature becomes ready for production. When it does, I’ll be among the first to add it as an enhancement in my CSS. ✌🏻

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.