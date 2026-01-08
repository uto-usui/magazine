---
title: "State, Logic, And Native Power: CSS Wrapped 2025"
source: "https://smashingmagazine.com/2025/12/state-logic-native-power-css-wrapped-2025/"
publishedDate: "2025-12-09"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Brecht De Ruyte)"
---

-   10 min read
-   [CSS](https://smashingmagazine.com/category/css), [Tools](https://smashingmagazine.com/category/tools), [Techniques](https://smashingmagazine.com/category/techniques), [Design](https://smashingmagazine.com/category/design)

CSS Wrapped 2025 is out! We’re entering a world where CSS can increasingly handle logic, state, and complex interactions once reserved for JavaScript. It’s no longer just about styling documents, but about crafting dynamic, ergonomic, and robust applications with a native toolkit more powerful than ever. Here’s an unpacking of the highlights and how they connect to the broader evolution of modern CSS.

If I were to divide CSS evolutions into categories, we have moved far beyond the days when we simply asked for `border-radius` to feel like we were living in the future. We are currently living in a moment where the platform is handing us tools that don’t just tweak the visual layer, but fundamentally redefine how we architect interfaces. I thought the number of features announced in 2024 couldn’t be topped. I’ve never been so happily wrong.

The Chrome team’s “[**CSS Wrapped 2025**](https://chrome.dev/css-wrapped-2025/)” is not just a list of features; it is a manifesto for a dynamic, native web. As someone who has spent a couple of years documenting these evolutions — from [defining “CSS5” eras](https://www.smashingmagazine.com/2024/08/css5-era-evolution/) to the intricacies of [modern layout utilities](https://www.smashingmagazine.com/2024/05/modern-css-layouts-no-framework/) — I find myself looking at this year’s wrap-up with a huge sense of excitement. We are seeing a shift towards “Optimized Ergonomics” and “Next-gen interactions” that allow us to stop fighting the code and start sculpting interfaces in their natural state.

In this article, you can find **a comprehensive look at the standout features from Chrome’s report**, viewed through the lens of my recent experiments and hopes for the future of the platform.

## The Component Revolution: Finally, A Native Customizable Select

For years, we have relied on heavy JavaScript libraries to style dropdowns, a “decades-old problem” that the platform has finally solved. As I detailed in [my deep dive into the history of the customizable select](https://utilitybend.com/blog/the-customizable-select-part-one-history-trickery-and-styling-the-select-with-css) (and related articles), this has been a long road involving [Open UI](https://open-ui.org/), bikeshedding names like `<selectmenu>` and `<selectlist>`, and finally landing on a solution that re-uses the existing `<select>` element.

The introduction of `appearance: base-select` is a strong foundation. It allows us to fully customize the `<select>` element — including the button and the dropdown list (via `::picker(select)`) — using standard CSS. Crucially, this is built with progressive enhancement in mind. By wrapping our styles in a feature query, we ensure a seamless experience across all browsers.

We can opt in to this new behavior without breaking older browsers:

```
select {
  /* Opt-in for the new customizable select */
  @supports (appearance: base-select) {
    &, &::picker(select) {
      appearance: base-select;
    }
  }
}
```

The fantastic addition to allow rich content inside options, such as images or flags, is a lot of fun. We can create all sorts of selects nowadays:

-   **Demo:** I created a [Poké-adventure demo](https://codepen.io/utilitybend/pen/ByawgNN) showing how the new `<selectedcontent>` element can clone rich content (like a Pokéball icon) from an option directly into the button.

See the Pen \[A customizable select with images inside of the options and the selectedcontent \[forked\]\](https://codepen.io/smashingmag/pen/JoXwwoZ) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [A customizable select with images inside of the options and the selectedcontent \[forked\]](https://codepen.io/smashingmag/pen/JoXwwoZ) by [utilitybend](https://codepen.io/utilitybend).

-   **Demo:** A comprehensive look at [styling the select with only pseudo-elements](https://codepen.io/utilitybend/pen/GgRrLWb).

See the Pen \[A customizable select with only pseudo-elements \[forked\]\](https://codepen.io/smashingmag/pen/pvyqqJR) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [A customizable select with only pseudo-elements \[forked\]](https://codepen.io/smashingmag/pen/pvyqqJR) by [utilitybend](https://codepen.io/utilitybend).

-   **Demo:** Or you can kick it up a notch with this [Menu selection demo using optgroups](https://codepen.io/utilitybend/pen/ByoBMBm).

See the Pen \[An actual Select Menu with optgroups \[forked\]\](https://codepen.io/smashingmag/pen/myPaaJZ) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [An actual Select Menu with optgroups \[forked\]](https://codepen.io/smashingmag/pen/myPaaJZ) by [utilitybend](https://codepen.io/utilitybend).

This feature alone signals a massive shift in how we will build forms, reducing dependencies and technical debt.

Creating carousels has historically been a friction point between developers and clients. Clients love them, developers dread the JavaScript required to make them accessible and performant. The arrival of `::scroll-marker` and `::scroll-button()` pseudo-elements changes this dynamic entirely.

These features allow us to create navigation dots and scroll buttons purely with CSS, linked natively to the scroll container. As I wrote on my blog, this was [Love at first slide](https://utilitybend.com/blog/love-at-first-slide-creating-a-carousel-purely-out-of-css). The ability to create a fully functional, accessible slider without a single line of JavaScript is not just convenient; it is a triumph for performance. There are some accessibility concerns around this feature, and even though these are valid, there might be a way for us developers to make it work. The good thing is, all these UI changes are making it a lot easier than custom DOM manipulation and dragging around aria tags, but I digress…

We can now group markers automatically using `scroll-marker-group` and style the buttons using anchor positioning to place them exactly where we want.

```
.carousel {
  overflow-x: auto;
  scroll-marker-group: after; /* Creates the container for dots */

  /* Create the buttons */
  &::scroll-button(inline-end),
  &::scroll-button(inline-start) {
    content: " ";
    position: absolute;
    /* Use anchor positioning to center them */
    position-anchor: --carousel;
    top: anchor(center);
  }

  /* Create the markers on the children */
  div {
    &::scroll-marker {
      content: " ";
      width: 24px;
      border-radius: 50%;
      cursor: pointer;
    }
    /* Highlight the active marker */
    &::scroll-marker:target-current {
      background: white;
    }
  }
}
```

-   **Demo:** My experiment creating a [carousel purely out of HTML and CSS](https://codepen.io/utilitybend/pen/vEBQxNb), using anchor positioning to place the buttons.

See the Pen \[Carousel Pure HTML and CSS \[forked\]\](https://codepen.io/smashingmag/pen/ogxJJjQ) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [Carousel Pure HTML and CSS \[forked\]](https://codepen.io/smashingmag/pen/ogxJJjQ) by [utilitybend](https://codepen.io/utilitybend).

-   **Demo:** A [Webshop slick slider remake](https://codepen.io/utilitybend/pen/bNbXZWb) using `attr()` to pull background images dynamically into the markers.

See the Pen \[Webshop slick slider remake in CSS \[forked\]\](https://codepen.io/smashingmag/pen/gbrZZPY) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [Webshop slick slider remake in CSS \[forked\]](https://codepen.io/smashingmag/pen/gbrZZPY) by [utilitybend](https://codepen.io/utilitybend).

## State Queries: Sticky Thing Stuck? Snappy Thing Snapped?

For a long time, we have lacked the ability to know if a [“sticky thing is stuck” or if a “snappy item is snapped”](https://utilitybend.com/blog/is-the-sticky-thing-stuck-is-the-snappy-item-snapped-a-look-at-state-queries-in-css) without relying on IntersectionObserver hacks. Chrome 133 introduced scroll-state queries, allowing us to query these states declaratively.

By setting `container-type: scroll-state`, we can now style children based on whether they are stuck, snapped, or overflowing. This is a massive “quality of life” improvement that I have been eagerly waiting for since CSS Day 2023. It has even evolved a lot since we can also see the direction of the scroll, lovely!

For a simple example: we can finally apply a shadow to a header _only_ when it is actually sticking to the top of the viewport:

```
.header-container {
  container-type: scroll-state;
  position: sticky;
  top: 0;

  header {
    transition: box-shadow 0.5s ease-out;
    /* The query checks the state of the container */
    @container scroll-state(stuck: top) {
      box-shadow: rgba(0, 0, 0, 0.6) 0px 12px 28px 0px;
    }
  }
}
```

-   **Demo:** A [sticky header](https://codepen.io/utilitybend/pen/XWLQPOe) that only applies a shadow when it is actually stuck.

See the Pen \[Sticky headers with scroll-state query, checking if the sticky element is stuck \[forked\]\](https://codepen.io/smashingmag/pen/raeooxY) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [Sticky headers with scroll-state query, checking if the sticky element is stuck \[forked\]](https://codepen.io/smashingmag/pen/raeooxY) by [utilitybend](https://codepen.io/utilitybend).

-   **Demo:** A [Pokémon-themed list](https://codepen.io/utilitybend/pen/MWMZoqp) that uses scroll-state queries combined with anchor positioning to move a frame over the currently snapped character.

See the Pen \[Scroll-state query to check which item is snapped with CSS, Pokemon version \[forked\]\](https://codepen.io/smashingmag/pen/vEGvvLM) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [Scroll-state query to check which item is snapped with CSS, Pokemon version \[forked\]](https://codepen.io/smashingmag/pen/vEGvvLM) by [utilitybend](https://codepen.io/utilitybend).

## Optimized Ergonomics: Logic In CSS

The “Optimized Ergonomics” section of CSS Wrapped highlights features that make our workflows more intuitive. Three features stand out as transformative for how we write logic:

1.  **`if()` Statements**  
    We are finally getting conditionals in CSS. The `if()` function acts like a ternary operator for stylesheets, allowing us to apply values based on media, support, or style queries inline. This reduces the need for verbose `@media` blocks for single property changes.
2.  **`@function` functions**  
    We can finally move some logic to a different place, resulting in some cleaner files, a real quality of life feature.
3.  **`sibling-index()` and `sibling-count()`**  
    These tree-counting functions solve the issue of staggering animations or styling items based on list size. As I explored in [Styling siblings with CSS has never been easier](https://utilitybend.com/blog/styling-siblings-with-css-has-never-been-easier-experimenting-with-sibling-count-and-sibling-index), this eliminates the need to hard-code custom properties (like `--index: 1`) in our HTML.

### Example: Calculating Layouts

We can now write concise mathematical formulas. For example, staggering an animation for cards entering the screen becomes trivial:

```
.card-container > * {
  animation: reveal 0.6s ease-out forwards;
  /* No more manual --index variables! */
  animation-delay: calc(sibling-index() * 0.1s);
}
```

I even experimented with using these functions along with trigonometry to place items in a perfect circle without any JavaScript.

-   **Demo:** [Staggering card animations dynamically](https://codepen.io/utilitybend/pen/wBKQPLr).

See the Pen \[Stagger cards using sibling-index() \[forked\]\](https://codepen.io/smashingmag/pen/RNaEERz) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [Stagger cards using sibling-index() \[forked\]](https://codepen.io/smashingmag/pen/RNaEERz) by [utilitybend](https://codepen.io/utilitybend).

-   **Demo:** Placing items in a [perfect circle](https://codepen.io/utilitybend/pen/VYvVXLN) using `sibling-index`, `sibling-count`, and the new CSS `@function` feature.  
    

See the Pen \[The circle using sibling-index, sibling-count and functions \[forked\]\](https://codepen.io/smashingmag/pen/XJdoojZ) by [utilitybend](https://codepen.io/utilitybend).

See the Pen [The circle using sibling-index, sibling-count and functions \[forked\]](https://codepen.io/smashingmag/pen/XJdoojZ) by [utilitybend](https://codepen.io/utilitybend).

## My CSS To-Do List: Features I Can’t Wait To Try

While I have been busy sculpting selects and transitions, the “CSS Wrapped 2025” report is packed with other goodies that I haven’t had the chance to fire up in CodePen yet. These are high on my list for my next experiments:

### Anchored Container Queries

I used CSS Anchor Positioning for the buttons in my carousel demo, but “CSS Wrapped” highlights an evolution of this: **Anchored Container Queries**. This solves a problem we’ve all had with tooltips: if the browser flips the tooltip from top to bottom because of space constraints, the “arrow” often stays pointing the wrong way. With anchored container queries (`@container anchored(fallback: flip-block)`), we can style the element based on which fallback position the browser actually chose.

### Nested View Transition Groups

View Transitions have been a revolution, but they came with a specific trade-off: they flattened the element tree, which often broke 3D transforms or overflow: clip. I always had a feeling that it was missing something, and this might just be the answer. By using `view-transition-group: nearest`, we can finally nest transition groups within each other.

This allows us to maintain clipping effects or 3D rotations during a transition — something that was previously impossible because the elements were hoisted up to the top level.

```
.card img {
  view-transition-name: photo;
  view-transition-group: nearest; /* Keep it nested! */
}
```

### Typography and Shapes

Finally, the ergonomist in me is itching to try **Text Box Trim**, which promises to remove that annoying extra whitespace above and below text content (the leading) to finally achieve perfect vertical alignment. And for the creative side, `corner-shape` and the `shape()` function are opening up non-rectangular layouts, allowing for “squaricles” and complex paths that respond to CSS variables. That being said, I can’t wait to have a design full of squircles!

## A Hopeful Future

We are witnessing a world where **CSS is becoming capable of handling logic, state, and complex interactions that previously belonged to JavaScript**. Features like `moveBefore` (preserving DOM state for iframes/videos) and `attr()` (using types beyond strings for colors and grids) further cement this reality.

While some of these features are currently experimental or specific to Chrome, the momentum is undeniable. We must hope for continued support across all browsers through initiatives like Interop to ensure these capabilities become the baseline. That being said, having browser engines is just as important as having all these awesome features in “Chrome first”. These new features need to be discussed, tinkered with, and tested before ever landing in browsers.

> [It is a fantastic moment to get into CSS. We are no longer just styling documents; we are crafting dynamic, ergonomic, and robust applications with a native toolkit that is more powerful than ever.](https://twitter.com/share?text=%0aIt%20is%20a%20fantastic%20moment%20to%20get%20into%20CSS.%20We%20are%20no%20longer%20just%20styling%20documents;%20we%20are%20crafting%20dynamic,%20ergonomic,%20and%20robust%20applications%20with%20a%20native%20toolkit%20that%20is%20more%20powerful%20than%20ever.%0a&url=https://smashingmagazine.com%2f2025%2f12%2fstate-logic-native-power-css-wrapped-2025%2f)
> 
> “

Let’s get going with this new era and spread the word.

This is [CSS Wrapped](https://chrome.dev/css-wrapped-2025/)!

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)