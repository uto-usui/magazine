---
title: "Masking One Element With Another"
source: "https://css-irl.info/masking-one-element-with-another/"
publishedDate: "2021-08-10"
category: "css"
feedName: "CSS IRL"
---

Somehow it escaped my knowledge until recently that the CSS `element()` function is supported in Firefox. In fact, it has been for [a good while](https://caniuse.com/?search=element\(\)) (although it still needs a prefix). “What is the element() function?”, I hear you cry. It’s a way to render a HTML element as an image value for use in our CSS. The example given on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/element\(\)) is using an image rendered on a `<canvas>` as a background image. That’s a pretty cool use case, although the CSS Paint API already allows us to create a paint worklet and use it in our CSS – check out [this tutorial](https://css-tricks.com/exploring-the-css-paint-api-image-fragmentation-effect/) by [Temani Afif](https://www.temani-afif.com/). Perhaps that’s one reason why browser support seems to have stalled?

## element() as mask

What I’m interested in is being able to use _any_ element, particularly as a mask for another. An example is a text element, such as a heading. We can apply the element as a mask by referencing its ID:

```
img {
  mask-image: -moz-element(#mask);
}
```

What’s cool about masking is it behaves in much the same way as a background. We can apply properties such as `mask-size`, `mask-repeat`, etc. to get the effect we want.

In this demo I’m using a heading (with a gradient applied) as an image mask.

See the Pen [Masking one element with another](https://codepen.io/michellebarker/pen/QWvzzVM) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

## Accessibility

There are some obvious issues here, not least around accessibility. What’s the best experience for someone using a screenreader? If the text mask is repeated several times, would it be better to have multiple elements? Or preferable to use `aria-hidden` to hide the element from a screenreader entirely, and describe the resulting effect in some other way (`aria-label` or `aria-labelledby`, for instance). An `<h1>` might not be the right choice here, anyway. The answers to these questions will invariably depend on context, differing from project to project.

The other issue is visually hiding the original element. As we’re using it as a mask, we might not want the original on display. You might be accustomed to using a utility class to visually hide elements, while ensuring they can still be read by screenreader software:

```
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

(Scott O'Hara has some [more information](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html) on this, and other methods for hiding content.)

This won’t work for this case, as it’ll render the element — and therefore our mask — invisible! In the demo, I’ve plumped for hiding it offscreen:

```
h1 {
  position: absolute;
  left: -100%;
}
```

## Animation

Another interesting use case could be using an animated element as a mask. However, the performance is pretty poor, as we can see from [this demo](https://codepen.io/michellebarker/pen/ZEKwzQm). But it’s much better when used as a transition:

See the Pen [Masking an element with an animated element](https://codepen.io/michellebarker/pen/xxdMKRK) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

## Do we need element()?

It’s worth pointing out that we can achieve a lot of these effects currently with SVG. But as someone who enjoys nothing better than tinkering with CSS, I’d love to see widespread support for `element()`, for creative coding if nothing else, and there are no doubt plenty of use cases I haven’t yet considered.

Vincent De Oliveira has an [excellent write-up](https://iamvdo.me/en/blog/css-element-function) from a while back, including some creative examples. Some of the demos appear to be broken in modern browsers, but there are videos, and it’s great to get some inspiration for what could be possible.

There are currently several issues noted in the [specification](https://www.w3.org/TR/css-images-4/#element-notation), but it would be great to see some of these get resolved and the spec move forward.