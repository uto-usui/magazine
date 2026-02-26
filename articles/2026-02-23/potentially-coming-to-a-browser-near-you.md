---
title: "Potentially Coming to a Browser :near() You"
source: "https://css-tricks.com/potentially-coming-to-a-browser-near-you/"
publishedDate: "2026-02-21"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

Just before we wrapped up 2025, I saw [this proposal for `:near()`](https://github.com/w3c/csswg-drafts/issues/13271), a pseudo-class that would match if the pointer were to go near the element. By how much? Well, that would depend on the value of the `<length>` argument provided. [Thomas Walichiewicz](https://thomas.design/), who proposed `:near()`, suggests that it works like this:

```
button:near(3rem) {
  /* Pointer is within 3rem of the button */
}
```

For those wondering, yes, we can use the Pythagorean theorem to [measure the straight-line distance between two elements using JavaScript](https://www.30secondsofcode.org/js/s/euclidean-distance/) (“Euclidean distance” is the mathematical term), so I imagine that that’s what would be used behind the scenes here. I have some use cases to share with you, but the demos will only be simulating `:near()` since it’s obviously not supported in any web browser. Shall we dig in?

### Visual effects

Without question, `:near()` could be used for a near-infinite (sorry) number of visual effects:

```
div {
  /* Div is wow */

  &:near(3rem) {
    /* Div be wowzer */
  }

  &:near(1rem) {
    /* Div be woahhhh */
  }
}
```

### Dim elements until `:near()`

To reduce visual clutter, you might want to dim certain components until users are near them. `:near()` could be more effective than `:hover` in this scenario because users could have trouble interacting with the components if they have limited visibility, and so being able to trigger them “earlier” could compensate for that to some degree. However, we have to ensure accessible color contrast, so I’m not sure how useful `:near()` can be in this situation.

```
button:not(:near(3rem)) {
  opacity: 70%; /* Or...something */
}
```

### _Hide_ elements until `:near()`

In addition to dimming components, we could also hide components (as long as they’re not important, that is). This, I think, is a better use case for `:near()`, as we wouldn’t have to worry about color contrast, although it does come with a different accessibility challenge.

So, you know when you hover over an image and a share button appears? Makes sense, right? Because we don’t want the image to be obscured, so it’s hidden initially. It’s not optimal in terms of UX, but it’s nonetheless a pattern that people are familiar with, like on Pinterest for example.

And here’s how `:near()` can enhance it. People know or suspect that the button’s there, right? Probably in the bottom-right corner? They know roughly where to click, but don’t know _exactly_ where, as they don’t know the size or offset of the button. Well, showing the button when `:near()` means that they don’t have to hover so accurately to make the button appear. This scenario is pretty similar to the one above, perhaps with different reasons for the reduced visibility.

However, we need this button to be accessible (hoverable, focusable, and find-in-pageable). For that to happen, we can’t use:

-   `display: hidden` (not hoverable, focusable, or find-in-pageable)
-   `visibility: hidden` (also not hoverable, focusable, or find-in-page-able)
-   `opacity: 0` (there’s no way to show it once it’s been found by find-in-page)

That leaves us with `content-visibility: hidden`, but the problem with hiding content using `content-visibility: hidden` (or elements with `display: none`) is that they literally disappear, and you can’t be near what simply isn’t there. This means that we need to reserve space for it, even if we don’t know _how much_ space.

Now, `:near()` isn’t supported in any web browser, so in the demo below, I’ve wrapped the button in a container with `3rem` of `padding`, and while that container is being `:hover`ed, the button is shown. This increases the size of the hoverable region (which I’ve made red, so that you can see it) instead of the actual button. It essentially simulates `button:near(3rem)`.

But how do we hide something while reserving the space?

First, we declare [`contain-intrinsic-size: auto none`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size) on the hidden target. This ensures that it remains a specific size even as something changes (in this case, even as its content is hidden). You can specify a `<length>` for either value, but in this case `auto` means whatever the rendered size was. `none`, which is a required fallback value, can also be a `<length>`, but we don’t need that at all, hence “`none`.”

The problem is, the rendered size “was” nothing, because the button is `content-visibility: hidden`, remember? That means we need to render it if only for a single millisecond, and that’s what this animation does:

```
<div id="image">
  <div id="simulate-near">
    <button hidden="until-found">Share</button>
  </div>
</div>
```

```
@keyframes show-content {
  from {
    content-visibility: visible;
  }
}

button {
  /* Hide it by default */
  &:not([hidden="until-found"]) {
    content-visibility: hidden;
  }

  /* But make it visible for 1ms */
  animation: 1ms show-content;

  /* Save the size while visible */
  contain-intrinsic-size: auto none;
}
```

Note that if the button has the [`hidden=until-found`](https://css-tricks.com/covering-hiddenuntil-found/) attribute-value, which is what makes it focusable and find-in-page-able, `content-visibility: hidden` isn’t declared because [`hidden=until-found`](https://css-tricks.com/covering-hiddenuntil-found/) does that automatically. Either way, the animation declares `content-visibility: visible` for `1ms` while `contain-intrinsic-size: auto none` captures its size and reserves the space, enabling us to hover it even when it’s not visible.

Now that you understand how it works, here’s the full code (again, simulated, because `:near()` isn’t supported yet):

```
<div id="image">
  <div id="simulate-near">
    <button hidden="until-found">Share</button>
  </div>
</div>
```

```
@keyframes show-content {
  from {
    content-visibility: visible;
  }
}

#simulate-near {
  /* Instead of :near(3rem) */
  padding: 3rem;

  button {
    /* Unset any styles */
    border: unset;
    background: unset;

    /* But include size-related styles */
    padding: 1rem;

    /* Hide it by default */
    &:not([hidden="until-found"]) {
      content-visibility: hidden;
    }

    /* But make it visible for 1ms */
    animation: 1ms show-content;

    /* Save the size while visible */
    contain-intrinsic-size: auto none;
  }

  &:where(:hover, :has(:focus-visible)) button {
    color: white;
    background: black;
    content-visibility: visible;
  }
}
```

If you’re wondering why we’re unsetting `border` and `background`, it’s because `content-visibility: hidden` only hides the content, not the element itself, but we’ve included `padding` here because that affects the size that we’re trying to render n’ remember. After that we simply apply those styles as well as `content-visibility: visible` to the button when the the wrapper is `:hover`ed or `:has(:focus-visible)`.

And here’s the same thing but with the unsupported `:near()`:

```
<div id="image">
  <button hidden="until-found">Share</button>
</div>
```

```
@keyframes show-content {
  from {
    content-visibility: visible;
  }
}

button {
  /* Unset any styles */
  border: unset;
  background: unset;

  /* But include size-related styles */
  padding: 1rem;

  /* Hide it by default */
  &:not([hidden="until-found"]) {
    content-visibility: hidden;
  }

  /* But make it visible for 1ms */
  animation: 1ms show-content;

  /* Save the size while visible */
  contain-intrinsic-size: auto none;

  &:where(:near(3rem), :hover, :focus-visible) {
    color: white;
    background: black;
    content-visibility: visible;
  }
}
```

In short, `:near()` enables us to do what the simulated technique does but without the extra markup and creative selectors, and if there are any accessibility needs, we have that `animation`/`contain-intrinsic-size` trick.

### Prefetch/prerender when near

I’m not suggesting that there’s a way to prefetch/prerender using `:near()` or even that the functionality of `:near()` should be extended, but rather that the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) could leverage its underlying functionality. The Speculation Rules API already uses `mousedown`, `touchstart`, pointer direction and velocity, viewport presence, and scroll pauses as signals to begin prefetching/prerendering the linked resource, so why not when near?

In fact, I think “near” as a concept could be utilized for _a lot_ more than `:near()`, and _should_ be considering that custom hit-testing using `pointermove` has a high performance cost and implementation complexity (as Thomas points out). Let’s look at another example.

### Improve interest invoker interactions

When interacting with hover-triggered overlays, there’s risk of accidentally moving the pointer away from the trigger or target. The [Interest Invoker API](https://css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers/), which facilitates hover-triggered interactions, uses the `interest-show-delay` and `interest-hide-delay` CSS properties to prevent accidental activations and deactivations respectively, but from a user experience perspective, anything involving delays and time-sensitivity just isn’t fun.

A couple of examples:

-   The pointer falling into the gap between the interest trigger (e.g., a link or button) and interest target (e.g., a popover)
-   The pointer overshooting the bounds of the interest target when trying to interact with elements near the edge of it

Therefore, instead of (or in addition to) show and hide delays, the Interest Invoker API could leverage the concept of “near” to ensure that overlays don’t disappear due to mis-interaction. This could be configurable with a CSS property (e.g., `near-radius: 3rem` or just `near: 3rem`), which unlike `:near()` would invoke functionality (`interest` and `loseinterest` JavaScript events, in this case).

Another use-case, suggested by Thomas in his proposal: showing a “drag to reorder” hint while hovering near a draggable element. This is a terrific use-case because showing tooltips even just a few milliseconds earlier would likely reduce task time.

Unfortunately, you’d have a hard time (I think?) simulating these ones with valid HTML, mostly because `<a>`s and `<button>`s can only contain certain elements.

### Downsides to `:near()`

A potential downside is that `:near()` could lead to a significant increase in developers lazily hiding things to reduce visual clutter in instances where better UI design would’ve been the right call, or _increasing_ visual clutter (with unnecessary icons, for example) _because_ it can be hidden more conditionally.

Other potential abuses include heatmapping, fingerprinting, and aggressive advertising patterns. It could also be used in ways that would negatively impact performance. [Thomas’s proposal](https://github.com/w3c/csswg-drafts/issues/13271) does a wonderful job of pointing out these abuses and the ways in which `:near()` could be implemented to thwart them.

### `:near()` accessibility concerns

`:near()` shouldn’t imply `:hover` or `:focus`/`:focus-visible`. I think that much is obvious when you really think about it, but I can still see the lines getting crossed. A good question to ask before using `:near()` is: _“Are we being preemptive or presumptive?”_ Preemptive can be good but _presumptive_ would always be bad, as we never want users to think that they’re hovering or focusing on an interactive element when they’re not (or not yet). This is mentioned in various parts of the Web Content Accessibility Guidelines, but most notably in [Success Criterion 2.4.7: Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

Similarly, [Success Criterion 2.5.8: Target Size (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) states that interactive elements smaller than `24ｘ24px` must have extra spacing around them, calculated as `24px - target width`/`24px - target height`, but whether or not the value of `:near()` would factor into that is a bit ambiguous.

### In conclusion

There’s lots to think about here, but ultimately I’d love to see this implemented as Thomas has proposed it. Having said that, the WCAG guidance _must_ be rock-solid before any implementation begins, especially considering that we can already accomplish what `:near()` would do (albeit with more markup and maybe some CSS trickery).

And again, I think we should entertain the idea of “near” as a concept, where the underlying functionality could be leveraged by the Speculation Rules API and Interest Invoker API (the latter with a CSS property like `near-radius`).

Your thoughts, please!