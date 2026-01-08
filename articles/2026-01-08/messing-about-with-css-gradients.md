---
title: "Messing About with CSS Gradients"
source: "https://css-irl.info/messing-about-with-css-gradients/"
publishedDate: "2023-11-03"
category: "css"
feedName: "CSS IRL"
---

![A lattice pattern in orange, red and teal](https://css-irl.info/messing-about-with-css-gradients-01_900.webp)

I’m not a person who creates CSS “art” (as in drawings), but I do like messing about with CSS gradients and seeing what comes up. I think the first time I became aware that you could create some pretty cool effects with CSS gradients was Lea Verou’s [CSS3 Patterns Gallery](https://projects.verou.me/css3patterns/).

Gradients are applied with the `background-image` property, or can be combined with other properties in the `background` shorthand:

```
div {
  background-image: linear-gradient(to right, orange, red);
}
```

Layering multiple gradients that include transparency can produce some pretty cool (and surprising effects), as I described in [an earlier post](https://css-irl.info/building-the-zig-zag-gradient-lab/) (and accompanying talk). Playing around with gradients in conjunction with CSS background properties (`background-position`, `background-size`, `background-repeat`) is a great way to get to grips with those properties too.

Sometimes I enjoy spending 20 minutes layering up a few gradients in Codpen, just to scratch a creative itch. Today I made this demo, as I has the idea to create a sort of slightly 3D woven effect:

See the Pen [Lattice gradient](https://codepen.io/michellebarker/pen/bGzwBWE) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

What I love while messing about with various colours and properties is that I often end up with happy accidents that actually add to the image.

## Custom properties

Custom properties are super useful when working with CSS gradients, as there is a lot of repetition involved. Sometimes tweaking a custom property value can produce wildly different effects. Adjusting the angles of the gradients in the above example gives us something completely different (but still quite cool!).

![A pattern of overlapping triangles in orange, red and teal](https://css-irl.info/messing-about-with-css-gradients-02_900.webp)

Custom properties are also animatable in certain browsers (not Firefox yet!) with `@property`, like in this demo.

See the Pen [Rockin rainbows (Chromium only)](https://codepen.io/michellebarker/pen/XWpVOmb) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

## Gradient pixel art

A lot of CSS art is actually made with gradients. You can make pixel art by layering up a bunch of gradients and adjusting the `background-position` values. Here’s a pixel art maker I built a while back. Draw on the canvas and you can see the generated CSS.

![Screenshot of the pixel art generator](https://css-irl.info/messing-about-with-css-gradients-03_900.webp)

[Try the demo](https://codepen.io/michellebarker/pen/WNKbQOO)