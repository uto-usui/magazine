---
title: "Animating Underlines"
source: "https://css-irl.info/animating-underlines/"
publishedDate: "2021-03-24"
category: "css"
feedName: "CSS IRL"
---

I recently gave my [personal website](https://michellebarker.co.uk/) a makeover and included a few cool little CSS tricks. Over the next few posts I’ll share some of these. The first one is all about underlines. Hover over any of the links in the body copy on the site and you’ll notice the underline transitions downwards. On the web it’s pretty common to seeing animated underline effects using pseudo-elements and/or borders. Try hovering on the examples in this demo.

See the Pen [Animated with pseudo elements](https://codepen.io/michellebarker/pen/MWJajOb) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

These work great for single, short lines of text (such as navigation links), but not for multi-line text. We can animate an underline on multi-line text with clever use of linear gradients, along with `background-size` and `background-position`. Here’s an example, and [a great article about how to implement this technique](https://nickymeuleman.netlify.app/blog/css-animated-wrapping-underline).

See the Pen [Animated underline with background](https://codepen.io/michellebarker/pen/BapoQNj) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

This approach has its limitations, however: it requires the text to be an inline element, so it works well for anchor links in a paragraph of text, say. But if you wanted an animated underline on a heading element you’d likely need to modify the markup to add a `<span>` inside the element, which is not always an option.

With some of the newer `text-decoration-` properties, we can animate the _actual_ underlines — far superior to just letting our underlines blink in and out of existence on hover. Any by animating real underlines, we can retain the nice feature that most browsers give us, where the underline skips the text’s descenders (the default for the `text-decoration-skip-ink` property).

For the most basic example, we can implement a fade-in effect. We can’t animate the opacity of a text underline, but we _can_ animate it from transparent to our desired colour. Firstly we set the `text-decoration-style` property to `underline`. Here I’m using the shorthand `text-decoration` to specify the `text-decoration-thickness` and `text-decoration-color` at the same time. We can set the colour to a transparent value. Then on hover, we can transition it to an opaque value:

```
a {
  text-decoration: underline 0.15em rgba(0, 0, 0, 0);
  transition: text-decoration-color 300ms;
}

a:hover {
  text-decoration-color: rgba(0, 0, 0, 1);
}
```

See the Pen [Simple fade underline animation](https://codepen.io/michellebarker/pen/VwPvPMp) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

That’s better than the default, but fairly basic. Even better, we can transition the `text-underline-offset` property, which is relatively new but has widespread browser support. Here’s how I’m using it on my own site:

```
a {
  text-decoration: underline 0.15em rgba(0, 0, 0, 1);
  text-underline-offset: 0.2em;
  transition: text-decoration-color 300ms, text-underline-offset 300ms;
}

a:hover {
  text-decoration-color: rgba(0, 0, 255, 1);
  text-underline-offset: 0.4em;
}
```

### Units

As a side note, I like using _em_ units for these values because they are relative to the font size, which means if we have text that is larger or smaller the underline will scale proportionally.

### Browser support

The above works great...in Firefox. Right now, no other browsers appear to support transitioning or animating `text-underline-offset`. (The same applies to `text-decoration-thickness`, which can also allow for some interesting effects.) But luckily, there is an alternative approach to animating these properties...

## Houdini to the rescue

Without getting into the fine technical details, [CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) is a set of low-level APIs that expose parts of the browser’s CSS rendering engine to developers. It allows us to register a custom property and animate it with CSS. Previously developers needed to register the property in Javascript, but now it’s possibly to do it _entirely_ with CSS, using `@property`. Una has a [great article explaining exactly how to use it](https://web.dev/at-property/) and some of the things that are possible.

For our purposes, we can register a property called `--offset`, which we’ll use for the `text-underline-offset` value.

```
@property --offset {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}
```

It’s important to set an initial value, otherwise it won’t work. For some reason ems don’t seem to work as an initial value, although I’m not sure why.

Then, instead of transitioning `text-underline-offset`, we transition the custom property itself:

```
a {
  transition: --offset 300ms, text-decoration-color 300ms;
}

a:hover,
a:focus {
  --offset: 0.4em;
  text-decoration-color: rgba(0, 0, 255, 1);
}
```

## Testing for support

Unfortunately, transitioning custom properties with Houdini is not supported in Firefox or Safari – so we’re back to the previous problem of having a solution with limited browser support! But never fear, we _can_ implement a cross-browser solution — with belt and braces!

We can use a feature query to detect whether a browser does not support Houdini (this query relates to the Paint API). For browsers that don’t support Houdini, we’ll instead transition the `text-underline-offset` property — which, luckily, works in Firefox and Safari!

```
@supports not (background: paint(something)) {
  a {
    transition: text-underline-offset 400ms, text-decoration-color 400ms;
  }

  a:hover,
  a:focus {
    text-underline-offset: 0.4em;
  }
}
```

Here’s the solution in full:

See the Pen [Underlines (Chrome solution with Houdini)](https://codepen.io/michellebarker/pen/mdRyYVP) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).