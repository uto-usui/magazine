---
title: "Animating zooming using CSS: transform order is important… sometimes"
source: "https://jakearchibald.com/2025/animating-zooming/"
publishedDate: "2025-06-17"
category: "web-standards"
feedName: "Jake Archibald"
---

I was using Discord the other day. I tapped to zoom into an image, and it animated in an odd way that I'd seen before. Like this:

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

Notice how it kinda 'swoops' into the wildcat's face, rather than zooming straight in? See how the right-hand side of the cat's head goes out-of-frame, and then back in again?

I recognised it immediately because I'd made the same mistake myself on another project.

The CSS is pretty simple:

```
.demo {
  transition: transform 1s ease;
}
.demo.zoom {
  transform: scale(3) translate(-33.1%, 20.2%);
}
```

But watch this… If I change the starting transform from the default (`none`), to `rotate(0)`:

```
.demo {
  transition: transform 1s ease;
  transform: rotate(0);
}
.demo.zoom {
  transform: scale(3) translate(-33.1%, 20.2%);
}
```

The animation changes:

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

Weird, huh? You wouldn't expect something like `rotate(0)`, which is equivalent to `none`, to completely change how the animation works, but this is happening entirely as designed in the CSS spec.

Let's dig into why.

## [What caused the quirky animation?](#what-caused-the-quirky-animation)

Let's remove the `rotate(0)` for now and go back to the original code:

```
.demo {
  transition: transform 1s ease;
}
.demo.zoom {
  transform: scale(3) translate(-33.1%, 20.2%);
}
```

When zooming into part of an element, `scale(n) translate(x, y)` feels like the easiest way to do it. You use the `translate` to get the subject into the centre, then adjust the `scale` to zoom in. Tweaking the values in DevTools is easy, as is calculating the values in code.

However, while this order of values is easy to write, it doesn't produce the most natural animation.

### [How transforms are animated](#how-transforms-are-animated)

The CSS spec has a [somewhat complex algorithm](https://drafts.csswg.org/css-transforms-1/#interpolation-of-transforms) to decide how to animate transforms. For our values, it takes the `from` and `to` values:

```
@keyframes computed-keyframes {
  from {
    transform: none;
  }
  to {
    transform: scale(3) translate(-33.1%, 20.2%);
  }
}
```

…and begins by padding them out, so they have the same number of components:

```
@keyframes computed-keyframes {
  from {
    transform: none none;
  }
  to {
    transform: scale(3) translate(-33.1%, 20.2%);
  }
}
```

Then, for each `from` and `to` pair of components, it converts them to use a common function that can express both types of value. In this case:

```
@keyframes computed-keyframes {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(3) translate(-33.1%, 20.2%);
  }
}
```

Now that the transforms are in a similar format, it produces an animation that linearly interpolates each component separately. This means that the `scale` is animated linearly from `1` to `3`, and the `translate` is animated linearly from `0, 0` to `-33.1%, 20.2%`.

The animation itself isn't linear, as easing is applied, but linear interpolation is used as a starting point.

The problem is, with `scale` followed by `translate`, the `scale` acts as a multiplier for the `translate` values. Therefore, as the `scale` increases, even though the `translate` values are interpolated linearly, the effect is non-linear:

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

At the start of the animation, a 1px shift in the `translate` value results in a ~1px shift on screen, as the `scale` is ~1. But, towards the end of the animation, a 1px shift in the `translate` value results in a ~3px shift on screen, as the `scale` is ~3. The position appears to change faster towards the end of the animation, which creates the 'swooping' effect.

## [How to fix it](#how-to-fix-it)

To fix this, we need to avoid the `scale` acting as a multiplier for the `translate`, and the way to do this is to put the `translate` first.

We can't just swap the order, since we're relying on the multiplying effect of the `scale` to make the `translate` do the right thing. To achieve the same effect, we need to manually multiply the `translate` values by the `scale` value:

```
.demo.zoom {
  transform: translate(-99.3%, 60.6%) scale(3);
}
```

And that's it!

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

Although the `translate` values are still multiplied, they're multiplied by a constant 3, the end `scale`, rather than a changing `scale` value. The result is a steady move towards the target. Each 1px shift in the `translate` value results in a 1px shift on screen.

Unfortunately, this format is harder to tweak in DevTools, but you can fix that with a bit of `calc`!

```
.demo.zoom {
  --scale: 3;
  --x: -33.1%;
  --y: 20.2%;

  transform: translate(
      calc(var(--x) * var(--scale)),
      calc(var(--y) * var(--scale))
    )
    scale(var(--scale));
}
```

Or even, split the `transform` into two separate properties:

```
.demo.zoom {
  --scale: 3;
  --x: -33.1%;
  --y: 20.2%;

  scale: var(--scale);
  translate: calc(var(--x) * var(--scale)) calc(var(--y) * var(--scale));
}
```

When you use the `scale` and `translate` properties separately, the `translate` is always applied first—which just happens to be the order we want.

Job done!

## [But wait, why did rotate(0) fix it?](#but-wait-why-did-rotate0-fix-it)

Back at the start of the article (remember that?), I mentioned that the animation could be 'fixed' by making the starting transform `rotate(0)`:

```
.demo {
  transition: transform 1s ease;
  transform: rotate(0);
}
.demo.zoom {
  transform: scale(3) translate(-33.1%, 20.2%);
}
```

Even though the `scale` and `translate` are in the wrong order, we get the animation we want. What gives? Well, I don't actually recommend using this 'fix', because it only 'works' by hitting an edge case in the CSS spec.

Let's go through the algorithm again, but this time with the `rotate(0)` transform:

```
@keyframes computed-keyframes {
  from {
    transform: rotate(0);
  }
  to {
    transform: scale(3) translate(-33.1%, 20.2%);
  }
}
```

As before, it pads out the values with `none` so they have the same number of components:

```
@keyframes computed-keyframes {
  from {
    transform: rotate(0) none;
  }
  to {
    transform: scale(3) translate(-33.1%, 20.2%);
  }
}
```

Then, as before, it tries to convert each component pair to use a common function that can express both types of value. However, it can't. `rotate` and `scale` are considered too different to be converted into a common type.

When this happens, it 'recovers' by converting those values, and all following values, to a single matrix:

```
@keyframes computed-keyframes {
  from {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  to {
    transform: matrix(3, 0, 0, 3, -673.75, 231.904);
  }
}
```

And then it animates them as it would two matrices. The 'incorrect' order of the `scale` and `translate` is lost, and the `translate` is already pre-multiplied by the `scale`. By coincidence, it animates exactly the way we want it to.

## [Bonus round: scale vs 3D translate](#bonus-round-scale-vs-3d-translate)

In this article, we've been animating `scale` to achieve the effect of 'zooming in'. But, depending on the effect you want, you could use a 3D translate instead.

When you animate `scale`, the result is that the width and height of the target changes linearly throughout the animation (although, as before, easing can be applied). This feels similar to a camera zoom effect.

However, you may want an effect that's more like the object moving towards the camera, or the camera moving towards the object. To achieve this, you don't want the visual size of the object to change linearly.

This is because, when a far-away object moves by 1 metre, the amount of space it takes up in your field of view doesn't change much. But, when a close-up object moves by 1 metre, the amount of space it takes up in your field of view changes a lot. This is the effect of perspective.

So, instead of using `scale`, let's use the `perspective` property, and a 3D transform:

```
.container {
  perspective: 1000px;
}
.demo.zoom {
  translate: -33.1% 20.2% 666.666px;
}
```

The rather demonic translate-z value was calculated by converting the `scale` to a translate-z value, using the following formula:

```
const scaleToTranslateZ = (scale, perspective) =>
  (perspective * (scale - 1)) / scale;
```

And here's the result:

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

Ok, it's subtle. Here's the `scale` version again for comparison:

  ![A Scottish wildcat](https://jakearchibald.com/c/cat-CxAfxtFW.webp) ![](https://jakearchibald.com/c/cat-zoomed-DQ6ps1TH.webp)

It's mostly noticeable on the zoom-out part of the animation. The 3D version feels like it starts much faster than the `scale` version. Personally, I think the `scale` version feels better, since the intention is more of a 'zoom' than a 'move'. But, it's good to know the differences, so you can choose the right one for your desired effect.

Thanks to [Ana Rodrigues](https://ohhelloana.blog/) for feedback that helped this make a lot more sense.