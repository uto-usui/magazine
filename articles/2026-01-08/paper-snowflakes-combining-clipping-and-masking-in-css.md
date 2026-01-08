---
title: "Paper Snowflakes: Combining Clipping and Masking in CSS"
source: "https://css-irl.info/paper-snowflakes-combining-clipping-and-masking-in-css/"
publishedDate: "2021-04-07"
category: "css"
feedName: "CSS IRL"
---

![Screenshot of three CSS paper snowflakes on black background](https://css-irl.info/paper-snowflakes-01.jpg)

Just after Christmas I made a fun little [Codepen demo](https://codepen.io/michellebarker/pen/YzGEJoX) recreating realistic-looking paper snowflakes in CSS, inspired by our homemade decorations! Christmas might be a distant memory, but there were plenty of learnings from this process that might be interesting to share.

## Folded paper effects

[Lynn Fisher](https://twitter.com/lynnandtonic) published a great [walkthrough of her wonderful personal site redesign](https://lynnandtonic.com/thoughts/entries/case-study-2020-refresh/), which features some very cool paper-fold effects. (Resize your browser to see them in action!) She’s also built a number of demos that feature variations on those kind of effects, like [this awesome folded poster](https://codepen.io/lynnandtonic/pen/PoZpjOr), where she creates the fold effects using layered background gradients. Lynn’s work was a big inspiration behind using gradients to make my paper snowflakes look like they were cut out of real paper. I used `conic-gradient` and `radial-gradient` backgrounds to attain a subtle light-and-shadow effect. `conic-gradient` has only fairly recently gained widespread browser support, but it’s great fun to play around with, as it allows for some striking and creative effects in CSS.

## Clipped segments

My initial idea was to try to use a single element for each snowflake, which would likely be possible with some _very_ clever use of gradients. But early on I decided a multi-element solution would suit my goals better. I wanted to retain the integrity of the snowflake being clipped from a single folded segment, and what better way to do that than using `clip-path`? Each segment of the snowflake is a single element, clipped identically and absolute-positioned inside a container. The segment has a width and height of 50% (_Fig 01_). I could have used an element of 100% width and height, but this would mean that when clipping (using a percentage-based `clip-path` polygon I would constantly have to remember that my polygon values must not exceed 50%, and I felt like that would be a little irritating.

![A square element absolute positioned in the top right quadrant of a container](https://css-irl.info/paper-snowflakes-02.svg)

_Fig 01_

Let’s look at a single segment as an example. Initially, instead of calculating the exact `clip-path` value, which would require some maths (we’ll come back to that later!), I used custom properties and `mask-image` to snip out a segment. Masking is a little like clipping, but instead of cutting out an element with clean lines we can use images with alpha transparency, or even gradients, to hide or reveal areas. I like to think of `clip-path` as like clipping with scissors, whereas `mask-image` is a bit like rubbing away areas of a charcoal-covered surface with an eraser, to reveal the image underneath. It allows for more subtle gradation.

### Custom properties

First of all, I set a custom property for the number of segments. Then I used that to calculate a second custom property, for the angle of a single segment:

```
.snowflake {
  --totalSegments: 16;
  --segment: calc(360deg / var(--totalSegments));
}
```

I used this segment custom property for the angle of the conic gradient I wanted to use as a mask:

```
.snowflake {
  --totalSegments: 16;
  --segment: calc(360deg / var(--totalSegments));

  --mask: conic-gradient(
    from 0deg at 0 100%,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1) var(--segment),
    rgba(0, 0, 0, 0) var(--segment)
  );
}
```

This gives us a conic gradient radiating from the bottom left of the element, with clean edges, much like using a clip-path — except I’m hardly having to do any maths at all. This is the mask we’ll use on each segment of the snowflake, and results in a triangular shape. (_Fig 02_)

![The triangular element as a result of the applied mask](https://css-irl.info/paper-snowflakes-03.svg)

_Fig 02_

### Applying the mask

I’m setting a custom property for the mask, as the `mask-image` property needs to be prefixed in a number of browsers — so instead of having to duplicate the entire property value we can can simply use it as a variable:

```
.segment {
  --webkit-mask-image: var(--mask);
  mask-image: var(--mask);
}
```

### Clipping a segment

Now we have a segment, which represents a square of paper repeatedly folded diagonally into sixteenths. We can start clipping out sections, as if we’re cutting with scissors, by using `clip-path`. I did this entirely by eye in the original demo, tweaking the values until I was happy with them. I used percentage values for the clip path points because I want the snowflake to be able to scale.

At the end of it I ended up with a polygon where the values on the right hand side were just outside of the mask boundary. (_Fig 03_)

![The clipped element](https://css-irl.info/paper-snowflakes-04.svg)

_Fig 03_

(Pro-tip: If you increase the alpha value of the transparent part of the gradient mask while you’re working on your clip path, you can see exactly where your path falls behind the mask.) It might now be clearer why we’re using a mask – it means we don’t have to worry about being so precise with our polygon points and calculating those with trigonometry. A little later on we’ll look at trigonometry in more detail, and why that might be a better solution.

Our `clip-path` polygon ends up being quite a lot of values to keep track of. We can manage those a bit more easily with custom properties. I used custom properties to effectively keep track of each section I was clipping. So (almost) every custom property has three pairs of values. For example, a triangle clipped from the left side could be represented by these custom properties in the clip-path polygon:

```
.snowflake {
  --l1: 0 80%, 5% 75%, 0 60%;

  /* Triplets of values are used in the clip-path polygon to form "triangles" */
  --path: polygon(
    0 0,
    var(--r1),
    var(--r2),
    100% var(--y),
    var(--center),
    var(--l1),
    var(--l2),
    var(--l3)
  );
}
```

![Three clip-path points highlighted with their corresponding values](https://css-irl.info/paper-snowflakes-04a.svg)

_Fig 04_

That way it’s much clearer which section the values we’re tweaking apply to. This was especially helpful when making subsequent variations of the snowflakes: I only had to tweak the custom properties, rather than the entire clip path.

### Transforms

Now we can position each segment by rotating it around a point. We can set the `transform-origin` value to `bottom left`, or `0 100%`, so it will be rotate from (you guessed it) the bottom left. Again, custom properties can help us here. I’m assigning each segment a custom property that corresponds to its index. I do this for quite a lot of projects with a generative aspect, and I often prefer to do it in the HTML. (It’s especially easy if you use a templating language.) It means that if you add or remove elements, you don’t need to keep updating your CSS file.

```
<div class="snowflake">
  <div class="segment" style="--i: 1"></div>
  <div class="segment" style="--i: 2"></div>
  <div class="segment" style="--i: 3"></div>
  <div class="segment" style="--i: 4"></div>
  <div class="segment" style="--i: 5"></div>
  <div class="segment" style="--i: 6"></div>
  <div class="segment" style="--i: 7"></div>
  <div class="segment" style="--i: 8"></div>
  <div class="segment" style="--i: 9"></div>
  <div class="segment" style="--i: 10"></div>
  <div class="segment" style="--i: 11"></div>
  <div class="segment" style="--i: 12"></div>
  <div class="segment" style="--i: 13"></div>
  <div class="segment" style="--i: 14"></div>
  <div class="segment" style="--i: 15"></div>
  <div class="segment" style="--i: 16"></div>
</div>
```

Now we can transform each segment based on its index, in a single line of code:

```
.segment {
  transform-origin: 0 100%;
  transform: rotate(calc(var(--segment) * var(--i, 1)));
}
```

![Identical segments rotated around a point](https://css-irl.info/paper-snowflakes-05.svg)

_Fig 05_

We’re not quite done however, because every _other_ segment should be fully rotated on the _y_ axis—so it’s a mirror image—just like when you unfold a real paper snowflake:

```
.segment:nth-child(even) {
  transform: rotateY(180deg) rotate(calc(var(--segment) * (var(--i, 1) - 1)));
}
```

![The resulting snowflake shape after rotation applied](https://css-irl.info/paper-snowflakes-06.svg)

_Fig 06_

The conic-gradient background is also applied to each segment, so for the even segments we’ll reverse it. We’re using a conic gradient layered with a radial gradient, so if we set the conic gradient as a custom property we can make our code a little more concise by avoiding duplicating the radial gradient value for the even segments:

```
.snowflake {
  --bg: repeating-conic-gradient(
    from 0deg at 0 100%,
    white,
    rgba(200, 200, 200, 1) var(--segment)
  );
}

.segment {
  background: radial-gradient(
      circle at 0% 100%,
      rgba(200, 200, 200, 1),
      transparent 40%
    ), var(--bg);
}

.snowflake:nth-child(even) {
  --bg: repeating-conic-gradient(
    from 0deg at 0 100%,
    rgba(200, 200, 200, 1),
    white var(--segment)
  );
}
```

## Drop shadow

As a finishing touch, we can add a subtle drop shadow to the entire snowflake to make it look even more realistic, using the `drop-shadow` filter:

```
.snowflake {
  filter: drop-shadow(1rem 1rem 1rem rgba(0, 0, 0, 0.9));
}
```

This is one of the advantages of clipping each segment with `clip-path`, instead of relying on gradient trickery, where “transparent” parts might not really be transparent – our drop shadow behaves like the snowflake really is cut out of paper, including the clipped areas inside.

## A better outcome with trigonometry

Using a gradient mask combined with `clip-path` worked well for this demo, but it felt a little like cheating. Although I am happy with the end result, it means I largely relied on trial-and-error to determine my clip-path polygon points. This didn’t feel 100% satisfactory to me. I knew that trigonometry had to be the solution, so in a subsequent demo I decided to use it to calculate my clip-path co-ordinates precisely.

For my next demo, I made an interactive version of the paper snowflake. Users can drag the handles to alter the clip path, creating a unique snowflake each time. The demo uses Greensock’s [Draggable](https://greensock.com/docs/v3/Plugins/Draggable) plugin. It was my first time playing around with this, and although I’m using it in a fairly basic way, it seems super helpful for building interfaces where users can move things around.

See the Pen [Snowflakes with clip-path trigonometry](https://codepen.io/michellebarker/pen/VwKdONM) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

I won’t dive into a step-by-step walk-through of how I built this, but in a future post I’ll share how trigonometry helped me here, and some different ways to use it in CSS and Javascript.