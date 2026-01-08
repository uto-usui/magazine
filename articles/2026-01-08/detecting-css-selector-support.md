---
title: "Detecting CSS Selector Support"
source: "https://css-irl.info/detecting-css-selector-support/"
publishedDate: "2022-09-13"
category: "css"
feedName: "CSS IRL"
---

You might already be aware of how we can use [feature detection](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) in CSS to check whether a particular property and value combination is supported. This is a pretty smart way to go about writing robust CSS that caters for users with a whole range of browsers and devices with different capabilities, and is infinitely preferable to [user agent sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent). We can check whether a browser supports `aspect-ratio`, say, and provide a fallback in cases where lack of support would hamper the user experience.

```
.some-element {
  max-height: 200px;
}

@supports (aspect-ratio: 1) {
  .some-element {
    aspect-ratio: 1;
    max-height: none;
  }
}
```

This particular block of code sets a max-height on an element, except when `aspect-ratio` is supported, when we’ll use that instead.

We could make this a bit more concise by using the `not` keyword, which essentially reverses the above: We’ll only set a max-hight when `aspect-ratio` is **not** supported.

```
.some-element {
  aspect-ratio: 1;
}

@supports not (aspect-ratio: 1) {
  .some-element {
    max-height: 200px;
  }
}
```

The only problem here is that very old browsers that **don’t** support feature queries (as well as not supporting `aspect-ratio`) won’t get the fallback. This is much less of a problem than it used to be, given that feature queries have been well-supported for some time, but worth bearing in mind nonetheless, especially if a lot of your users might be using older devices.

It might sound obvious, but it’s worth noting: For `@supports` to evaluate true, both the property name **and** the value must be supported. Neither of the expressions inside the parentheses here are valid, meaning that any styles inside the `@supports` statements will never be applied:

```
/* Invalid value for aspect-ratio */
@supports (aspect-ratio: red) {
}

/* Missing value */
@supports (aspect-ratio) {
}
```

We can also combine conditions using the `and` and `or` operators, much the same as we might write a media query. The following will apply an aspect ratio only when the browser supports both `aspect-ratio` and `rotate` (one of the [new CSS transform properties](https://web.dev/css-individual-transform-properties/)):

```
@supports (aspect-ratio: 1) and (rotate: 30deg) {
  .some-element {
    aspect-ratio: 1;
  }
}
```

CSS has given us some pretty cool selectors recently in the form of pseudo-elements and pseudo-classes. For example, `:focus-visible` allows us to style an element when it’s [focused with a keyboard](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible). Support for `:has()` has recently landed in Chrome and Safari, which allows us to apply styles to an element as a result of its children.

Happily, we can detect support for these selectors using `@supports`, by prefixing the parentheses with `selector`. We might want to change the focus style of button when it receives focus from a mouse, but keep the default focus ring when focused with a keyboard, and if the browser does not support `:focus-visible`.

```
@supports selector(:focus-visible) {
  button:focus:not(:focus-visible) {
    outline: 2px solid limegreen;
  }
}
```

(This complex selector doesn’t seem to work in Safari for some reason, despite Safari supporting both `@supports selector()` **and** `:focus-visible`.)

There appears to be a slight discrepancy between browser implementations when using more complex pseudo-classes such as `:has()`: Currently Safari requires `:has()` to include some other selector, but Chrome does not.

```
/* This works in Chrome but not Safari */
@supports selector(:has()) {
}

/* This works everywhere */
@supports selector(:has(.some-element)) {
}
```

## Browser support

`@supports selector()` is supported in all modern browsers, but only in the past year or so. As ever, it’s worth considering users of older browsers, and using it with care as part of your progressive enhancement strategy.