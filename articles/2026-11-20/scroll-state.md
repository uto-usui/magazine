---
title: "scroll-state()"
source: "https://css-tricks.com/almanac/functions/s/scroll-state/"
publishedDate: "2026-11-19"
category: "css"
feedName: "css-tricks"
author: "John Rhea"
---

The CSS `scroll-state()` query, surprisingly, has nothing to do with whether you’re doom-scrolling in a state of existential dread. It does, however, allow you to change the CSS used based on scrolling behavior. Far from doom, that’s pretty neat-o speedo. (Okay, you’re right, there’s nothing neat-o about a speedo). You can do lots of things that used to require JavaScript, like revealing the navigation when a user scrolls up or animating in a back to top link once the user scrolls down.

While `scroll-state()`, with those slimming parentheses, looks like a function, it’s not technically one. It’s a container query ([`@container`](https://css-tricks.com/almanac/rules/c/container/)) like `style()`. Since `scroll-state()` is a query, the website is basically asking the browser whether a particular feature of a container has a specific value. If it does, the styles within the brackets will apply. If it doesn’t have that feature at all or has the feature, but the value is different, the `@container` query is false and the styles in the brackets will not apply.

In the following demo (which we’ll dissect in a bit), a “Back to Top” link slides in from the bottom as you scroll down the page.

## Syntax

```
@container scroll-state( <scroll-state-feature>: <value> ) {
  /* styles */
}
```

## Values

`scroll-state()` has four possible features and each of those has a variety of possible values.

### `scrolled`

Asks if a container has been scrolled in a given direction:

-   **`none`:** The container has not had a relative scroll.
-   **`top` | `right` | `bottom` | `left`:** The most recent relative scroll was toward the corresponding edge.
-   **`block-start` | `inline-start` | `block-end` | `inline-end`:** The most recent relative scroll was toward the corresponding edge (exact direction determined by `writing-mode`).
-   **`x`:** The most recent relative scroll was in the horizontal direction.
-   **`y`:** The most recent relative scroll was in the vertical direction.
-   **`block`:** The most recent relative scroll was in either block direction (exact direction determined by `writing-mode`).
-   **`inline`:** The most recent relative scroll was in either inline direction (exact direction determined by `writing-mode`).

### `scrollable`

Asks if a container can be scrolled in a given direction:

-   **`none`:** The container has no scrollable overflow.
-   **`top` | `right` | `bottom` | `left`:** The container has scrollable overflow past the corresponding edge.
-   **`block-start` | `inline-start` | `block-end` | `inline-end`:** he container has scrollable overflow past the corresponding edge (exact direction determined by `writing-mode`).
-   **`x`:** The container has horizontal scrollable overflow.
-   **`y`:** The container has vertical scrollable overflow.
-   **`block`:** The container has scrollable overflow in the block direction (exact direction determined by `writing-mode`).
-   **`inline`:** The container has scrollable overflow in the inline direction (exact direction determined by `writing-mode`).

### `stuck`

Asks if a sticky-positioned element is stuck:

-   **`none`:** The sticky-positioned element has not been moved in any direction (also the starting state).
-   **`top` | `right` | `bottom` | `left`:** The sticky-positioned element has been moved and stuck to the corresponding edge.
-   **`block-start` | `inline-start` | `block-end` | `inline-end`:** The sticky-positioned element has been moved and stuck to the corresponding edge (exact direction determined by `writing-mode`).

### `snapped`

Asks if a snap target has been snapped on a particular axis:

-   **`none`:** The element isn’t a snap target.
-   **`x`:** The element is a horizontal snap target.
-   **`y`:** The element is a vertical snap target.
-   **`block`:** The element is a snap target in the block direction (exact direction determined by `writing-mode`).
-   **`inline`:** The element is a snap target in the inline direction (exact direction determined by `writing-mode`).
-   **`both`:** The element is a snap target in both directions.

## Demos

### Scrolled

First let’s look at the `scrolled` feature. This is the demo we saw at the beginning where we animate a back-to-top link when we scroll down:

```
.toplink {
  position: fixed;
  bottom: 0.125em;
  right: 1em;
  translate: 0 200px;
  transition: translate 0.5s;  @container top-revealer scroll-state(scrolled: block-end) {
    translate: 0 0;
    transition: translate 0.5s;
  }
}
```

When the scroll container is scrolled toward the `block-end` (downward in this case) the `translate` applies and the `.toplink` element animates up into the visible area. Because we’re using a `transition`, when we scroll a different direction (up and down/`block-start` and `block-end` are the only options here), it nicely animates out.

### Scrollable

While the scrolling direction in the demo above is pretty clear, what if this page was translated into a different language? Or we had a hero image that covered the entire viewport? One way we could indicate the scroll direction would be to have an arrow or other signifier animating and pointing in the correct direction. (I’m more a believer in constructing your page such that scroll direction is pretty obvious; however, I can foresee situations where an indicator was the best user experience or where translations/writing-mode changes could obscure what scrolling direction was appropriate.)

```
.scrollindicator {
  display: none;  @container top-revealer scroll-state(scrollable: block-end) {
      display: block;
  }
}
```

One nice thing about the `scrollable` feature is that when you scroll to the end of the scrollable area, it shuts off. So when we scroll to the `block-end` of the page (bottom of the page in this instance) `scrollable: block-end` is no longer true and our scroll indicator will revert to its default (in this case, `display: none`).

You could also combine the `scrollable` and `scrolled` features to remove the scroll indicator once the container has been scrolled either in the `block-start` _or_ `block-end` direction. (We need both, because if we’re down in the middle of the page and we scroll up, `scrolled: block-end` will no longer be true and the scroll indicator will appear again.)

```
.scroll-indicator {
  display: none;  @container top-revealer scroll-state(scrollable: block-end) {
    display: block;
  }
  
  @container top-revealer scroll-state(scrolled: block-end) or scroll-state(scrolled: block-start) {
    display: none;
  }
}
```

### Stuck

Another way we could enhance our demo is to have our navigation stick at the top while we’re scrolling down and change the look of the navigation once it’s stuck. The `stuck` feature must be on the element that gets stuck (as opposed to the scroll container, as was the case above). Also, because the container is set on the element that gets stuck, you cannot select the element itself from within the container query. You’ll need to `position: sticky` a wrapper element and “demote” all styles you want to change to the child.

```
.header-wrapper {
  container-type: scroll-state;
  container-name: getting-stuck;
  position: sticky;
  top: 0;
}

header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #40313D;
  padding: 0.5em;
  font-family: Tahoma;
}
```

The work of setting up the `stuck` feature happens in that `.header-wrapper`, but since we can’t apply styles to the container from within the container (not even with [`:has()`](https://css-tricks.com/almanac/pseudo-selectors/h/has/)). We need most of the styling to be in the `<header>` element.

```
@container getting-stuck scroll-state(stuck: top) {
  header {
    padding: 0.25em;
    font-size: 0.8em;
    background-color: #40313D99;
    transition: 1s;
  }

  header .search ::is(input, button) {
    font-size: 0.8em;
  }

  header .logo {
    width: 1.5em;
    rotate: -375deg;
    transition: 1s;
  }
}
```

### Stuck in the Middle

Changing the size of an element in the header that affects the size of the header can lead to conflicting results. i.e. you scroll to a position where the header is stuck, which initiates the size change, but that reduces the size, which pulls it away from the stuck point, which cancels the size change which makes it stuck again, which initiates the size change and round and round we go. Even a small change can make it impossible to even scroll past the stuck point. Adding a transition can help with this and make scrolling work again, but you can still scroll to a place where the resizing happens in a loop. In the following demo, if you scroll down to a pixel or so past where the header touches the top of the viewport, you should see the stutter step.

There is one weird trick to fix this, though. No, really, there is! (_shakes fist at the internet for making “one weird trick” an unbelievable phrase_.) The one weird trick is to set a height on the element that’s getting stuck (`.header-wrapper` in the case above). Ideally, set it smaller than the final size of the header if you’re making the header smaller. This prevents the element from resizing because of a change in its content’s size. This does require the header content to overflow. If that’s a no-go for you, you’ll have to change its size with transformations. The transformed element has a sort of placeholder that stays in the DOM where the transformed element originally lived. This placeholder is what’s used to determine the sticky position and does not change based on what happened in the animation.

### Snapped

We can also add some styles when scroll snapping has been applied and that scroll has snappity-snapped (technical term). Similar to the `stuck` feature, snapped should be defined on the element that is snapped, not on the scroll container. If scroll snapping has not been applied to the element, then the `snapped` feature returns false and the container query does not apply.

First, we set up our scroll snapping in the scrolled container.

**Note:** As with most scrolling CSS (scrolling animations, etc.), if you’re using the document’s default scroll, the `<html>` element is what’s being scrolled, not the `<body>`.

```
html {
  scroll-snap-type: y mandatory;
}
```

The slide `<div>`s are what we’re going to `snap` to the size of the viewport:

```
.slide {
  height: 100vh;  scroll-snap-align: start;
  scroll-snap-stop: always;
  container-type: scroll-state;
  container-name: getting-snappy;
}
```

As said above, the container type and name go on the snapped item. And then we modify descendants of the slide once it snaps:

```
@container getting-snappy scroll-state(snapped: y) {
  img {
    scale: 1.9;
    transition: 1s;
  }
}
```

Again, as with `stuck`, you cannot apply styles directly to the snapped element/the container, but only to the children of that element/container.

## Browser Support