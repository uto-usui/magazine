---
title: "Anchor Positioning and the Popover API for a JS-Free Site Menu"
source: "https://css-irl.info/anchor-positioning-and-the-popover-api/"
publishedDate: "2024-05-14"
category: "css"
feedName: "CSS IRL"
---

[Anchor positioning](https://www.w3.org/TR/css-anchor-position-1/) in CSS enables us to position an element relative to an anchor element anywhere on the page. Prior to this we could only position an element relative to its closest positioned ancestor, which sometimes meant doing some HTML and CSS gymnastics or, more often than not, resorting to Javascript for positioning elements like tooltips or nested submenus.

## Popovers

Anchor positioning becomes even more powerful when combined with the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). When building components where content needs to become visible upon user interaction, it can be a challenge to ensure they are fully accessible to users of assistive technologies, and often require additional JS to get this right. Using web platform features like the Popover API can help us build more accessible websites, as much of the necessary functionality comes already baked in.

The simplest way to create a popover is to apply the `popover` attribute to the desired popover content, then use the `popovertarget` attribute to target the popover’s ID.

```
<button popovertarget="popover_1">Open popover</button>
<p popover id="popover_1">I am the popover!</p>
```

See the Pen [popover](https://codepen.io/michellebarker/pen/MWdwbGK) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

We can also trigger popovers with JS, but that’s for another day.

## Anchoring

If we want to position the popover relative to an element, we need to designate that element as an anchor with the `anchor-name` property. In this example, the anchor is the button that triggers the popover. The value must be a [dashed ident](https://developer.mozilla.org/en-US/docs/Web/CSS/dashed-ident).

```
#anchor_1 {
  anchor-name: --anchor_1;
}
```

On the popover we’ll specify the anchor we’re using (with the `position-anchor` property). Then we’ll use the `anchor()` function to control the actual positioning. Here we’re specifying that we want the top left of the popover to be positioned at the bottom right of the anchor element.

```
#popover_1 {
  position-anchor: --anchor_1;
  top: anchor(--anchor_1 bottom);
  left: anchor(--anchor_1 right);
}
```

Alternatively we could use the [logical property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) equivalents:

```
#popover_1 {
  position-anchor: --anchor_1;
  inset-block-start: anchor(--anchor_1 bottom);
  inset-inline-start: anchor(--anchor_1 right);
}
```

We’ll also need to reset some of the default styles on the popover element.

```
p,
[popover] {
  margin: 0;
  padding: 0;
  border: 0;
}
```

See the Pen [Popover with anchor positioning](https://codepen.io/michellebarker/pen/VwOLmdX) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

We can also position our anchored element with the `position-area`, property instead of the `anchor()` function. This is more limited, as it only permits positioning on one axis, with only a single keyword of `top`, `right`, `bottom` or `left` (or logical property equivalents: `block-start`, `inline-end`, `block-end`, `inline-start`). We can however use transforms to move our element around if we so choose.

```
#popover_1 {
  position-anchor: --anchor_1;
  position-area: bottom;
  transform: translateX(50%);
}
```

See the Pen [Popover with anchor positioning (inset area)](https://codepen.io/michellebarker/pen/NWVqjwm) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

The following demo takes advantage of the Popover API and anchor positioning to build a navigation menu with interactive, nested submenus that doesn’t require any JS. Pretty cool!

See the Pen [Anchor position menu](https://codepen.io/michellebarker/pen/qBGEVov) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

Rather than the button that triggers the popover, we’re using the paren `<menu>` element.

## Animating popovers

Additionally, we’re animating the transition between open and closed states. That’s thanks to yet another new feature, which allows us to [transition discrete properties](https://developer.chrome.com/blog/entry-exit-animations), such as the `display` property.

Previously, if we wanted to transition an element that wasn’t there before to a visible state, we would have to first change the `display` property from `display: none` to `display: block` or some other value, give it an opacity of 0 (making it invisible), then perform the transition. We’s generally need some JS for that. But now we can transition the `display` value too, with the `transition-behavior` property.

```
[popover] {
  transition: display 300ms;
  transition-behavior: allow-discrete;
}
```

Alternatively it can be included with the shorthand `transition` property.

```
[popover] {
  transition: display 300ms allow-discrete;
}
```

We’ll need to explicitly set `display: none` on the popover, then transition it when open:

```
[popover] {
  display: none;
  transition: display 300ms allow-discrete;

  &:popover-open {
    display: block;
  }
}
```

This won’t do much at the moment. We actually want to transition the opacity, so we need to include this too.

We should also transition the [`overlay`](https://developer.mozilla.org/en-US/docs/Web/CSS/overlay) property. This is a property set by the browser, which specifies whether a popover or `<dialog>` element is rendered in the top layer. Adding it to the transition list causes the removal of the element from the top layer to be deferred, so that it can be animated.

```
[popover] {
  display: none;
  opacity: 0;
  transition:
    opacity 300ms,
    display 300ms allow-discrete,
    overlay 500ms allow-discrete;

  &:popover-open {
    display: block;
    opacity: 1;
  }
}
```

If we test this we can see that the element transitions out smoothly when we hide it, but it still appear instantly when we click the button.

See the Pen [Popover with anchor positioning](https://codepen.io/michellebarker/pen/LYoVLVr) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

To transition smoothly _in_, we need `@starting-style`. We’ll apply this at-rule to the `:popover-open` pseudo-class on our popover, to tell the browser what style to begin the transition from. (I’m nesting the styles here, because why use just one newly supported CSS feature when you can use them all?).

```
[popover] {
  display: none;
  opacity: 0;
  transition:
    opacity 500ms,
    display 500ms allow-discrete,
    overlay 500ms allow-discrete;

  &:popover-open {
    display: block;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }
}
```

Una has a great rundown of these new transition features over on the [Chrome blog](https://developer.chrome.com/blog/entry-exit-animations), so be sure to check it out.

See the Pen [Transition and starting-style with popover](https://codepen.io/michellebarker/pen/jOoPwWq/b54f7d864f0d0f921c0332e1c3ab3304) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

## Recommended resources

If you want to know more about popovers, I highly recommend [this talk from Hidde de Vries](https://www.youtube.com/watch?v=XaO2mZnIOzs) from CSS Day 2023.

There’s also loads more to learn about anchor positioning than I’m covered here! Once again, Una has an [in-depth guide](https://developer.chrome.com/blog/anchor-positioning-api).