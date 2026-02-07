---
title: "Responsive accessibility using visibility hidden"
source: "https://scottohara.me/blog/2022/11/07/responsive-accessibility.html"
publishedDate: "2022-11-07"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

Like it or not, even though content can be made to adapt to different viewport sizes and zoom levels by use of CSS media queries, sometimes the end result can be a bit awkward without further adjustments that go beyond visual presentation.

Without getting too into it, sometimes content that may appear in the normal flow of a web page may need to instead be rendered as a dialog on smaller viewports. Or, UI which shows/hides may make sense on smaller viewports but does not need to be treated this way when a larger viewport is available.

While HTML provides features, such as the `source` element’s `media` attribute, where the `source` for a `picture` element will be determined based on a media query breakpoint, this capability doesn’t extend to other HTML elements.

Maybe something like it should?

I have a few use cases for this, but let’s just look at one for now.

Imagine you have an FAQ page where on large screen all the commonly asked questions which unfortunately are not obvious enough to figure out are fully displayed with their answers for people to read. On small screen, however, in an effort to help someone be able to find the question they want answered with a reduced amount of scrolling, all the answers have been collapsed by default.

So on large screen we have a web page that is a series of headings followed by their answers, which would have a markup pattern like so:

```
<h#>
  Frequently asked question
</h#>
<div>Answer goes here!</div>
```

But on small screen, a pattern like the following would be expected:

```
<h#>
  <button aria-expanded="...">Frequently asked question</button>
</h#>
<div>Answer goes here!</div>
```

Now, we don’t want to have to redo the DOM depending on the viewport size. That’d be annoying. We also can’t just style away the visual presentation of the button on larger screens, because the underlying implicit and explicit ARIA semantics would still be exposed to people using assistive technology. And, the button functionality and focusability would still remain, regardless of styling.

Again, one might think to use JavaScript to potentially add/remove the button based on viewport size. Or, maybe because that’s super annoying, one could add remove ARIA and HTML attributes to the button(s) to suppress the semantics and behaviors. But that too would be annoying and you’d end up with some garbage markup at large screen that resembled the following:

```
<h#>
  <button aria-expanded="..."
  	disabled
  	role="none"
  	>Frequently asked question</button>
</h#>
<div>Answer goes here!</div>
```

Where the `disabled` attribute would need to be applied to completely suppress the `button` element’s focusability (`tabindex=-1` would only remove it from the focus order of the page, but would still mean it was focusable, after all). Styling would need to be done to make the now `disabled` button not _look_ disabled. The `role=none` would then need to be applied to the button so that its implicit button role and disabled state were no longer communicated.

That’s annoying and even though it’s not adding and removing a `button` element, it is potentially a lot of DOM manipulation.

### Using CSS and `visibility`

Instead of modifying the DOM, we could instead write the some CSS to show/hide the `button` element based on the necessary media query breakpoints.

Consider the following:

```
<h3>
  <button aria-expanded=...>
    <span>My text</span>
  </button>
</h3>
<div class=content>
  the content that toggles depending on breakpoint.
</div>
```

Not too different than the small screen markup needed for setting up the disclosure widgets, but here there’s a new `span` element that contains the `button` element’s content. Why?

Well, this is where [CSS’s `visibility` property](https://developer.mozilla.org/en-US/docs/web/css/visibility) comes into play.

The `visibility` property is an interesting one. When applied to an element with the `hidden` value, it will result in the element and its contents being visually hidden, though it still takes up the “space” that it would in the rendered web page. It’s just like one big visual hole and is similar to if you had applied `opacity: 0` to that same content. However, unlike with `opacity`, `visibility: hidden` will result in that content **not** being exposed by the browser’s accessibility API (i.e., it won’t show up in the a11y tree). This is similar behavior to `display: none` which also hides content from the a11y tree.

What makes `visibility` even more different, and _useful_ here, is that you can make parts of a `visibility: hidden` subtree visible again.

Let’s now look at this in context of the markup pattern for the FAQ show/hide buttons.

At large screen viewports the `button` element needs to be hidden. But, the text within needs to be visible at all viewports. So if we were do to the following:

```
@media screen and ( min-width: 600px ) {
  button[aria-expanded] {
    visibility: hidden;
  }
}


button[aria-expanded] span {
  visibility: visible;
}
```

The first ruleset within the media query will ensure that the `button` elements with the `aria-expanded` attribute will be hidden at viewport sizes larger than 600px. Ensuring that the `button` element will not be exposed.

The second ruleset will ensure that the subtree of the button, contained within the `span` element, will always be shown regardless of the `button` element being set to `visibility: hidden` or not.

With some additional styles and JavaScript to properly setup the disclosure widget (hey, [I wrote something about that](https://www.scottohara.me/blog/2022/09/12/details-summary.html#creating-an-aria-disclosure-widget)), you can get the following:

See the Pen [responsive toggle button](https://codepen.io/scottohara/pen/abKBvMP) by Scott ([@scottohara](https://codepen.io/scottohara)) on [CodePen](https://codepen.io/).

## Isn’t this a little hacky / confusing though?

It sure is. But right now we don’t have a particularly good solution to do this without leaning too heavily on JavaScript or potentially even CSS to do things that really probably belong as a native HTML feature so that stuff like this can even work if JavaScript or CSS are not available. E.g., when these extra resources are blocked or fail to load for some reason or another. Whether that be through a problem with the server, or someone purposefully turning on reader mode for their browser and all author defined CSS and JS are kicked to the curb.

Extra effort would need to be taken (likely with JavaScript) to make this behave in a nice progressively enhanced sort of way. But, I’m content with just being clever today. Maybe I, or someone else, can figure out how to make this a smart idea some other time.