---
title: "Using color-mix() to create opacity variants"
source: "https://una.im/color-mix-opacity/"
publishedDate: "2023-03-31"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/color-mix-alphas/cover.webp)

Published on March 31, 2023 Updated on April 2, 2023

A few weeks ago, [Adam Wathan](https://twitter.com/adamwathan) posted a [tweet](https://twitter.com/adamwathan/status/1633632073012457472?s=20) asking if you could use `color-mix()` to adjust the opacity of a color. I replied that this is what [relative color syntax](https://www.w3.org/TR/css-color-5/#:~:text=The%20new%20relative%20color%20syntax,possibly%20modified%20with%20math%20functions) was essentially created to do, but [Adam Argyle](https://twitter.com/argyleink) [pointed out](https://twitter.com/argyleink/status/1633681345607241730?s=20) that it can indeed be done with `color-mix()` using a clever hack.

## CSS color-mix()

Ok, now that you have my “two Adams walk into a tweet” backstory, let’s rewind ⏪. What is `color-mix()` anyway? [CSS color-mix](https://developer.chrome.com/blog/css-color-mix/) is an experimental [CSS feature](https://caniuse.com/?search=color-mix) that’s currently available in **Chrome 111** Stable, **Safari 16.2**, and **behind a flag in Firefox Nightly** (so hopefully we’ll have this feature stable across all browsers soon!).

**Update 4/2/2023:** Firefox announced an [intent to ship](https://groups.google.com/a/mozilla.org/g/dev-platform/c/edh4kzqMyKw/m/K2J2Q53MAgAJ) `color-mix()` to Stable the day after this post was published. YAY!

`color-mix()` does exactly what it says it does: it mixes two colors together.

```
.left { fill: blue; }
.right { fill: red; }
.center { fill: color-mix(in srgb, blue, red); }
```

In this example above, I’m evenly mixing red and blue in the `srgb` color space. And yes, this color space argument is required for `color-mix()`. There’s a ton of nuance and detail regarding how you mix colors and how different color spaces produce different mix results, so I recommend you check out Adam’s [HD Color Guide](https://developer.chrome.com/articles/high-definition-css-color-guide/) for more information on this.

And to get a feel for how `color-mix()` works yourself, I made a demo inspired by the (currently available) Chrome DevTools for this feature, which show a little venn diagram icon next to the `color-mix()` function. It’s one of those really nice details that just make me smile, so definitely inspect element on the venn diagrams within this page to see it in action.

**Warning:** this demo will only work in Chrome 111+, Safari 16.2, or Firefox Nightly as of this writing.

See the Pen [color-mix venn diagram](https://codepen.io/una/pen/MWqRNya/92bb8f8284d4f0fb0810ac6958acf42e) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

## Mixing Alphas

Now the trick for creating semi-opaque versions of your brand colors is mixing them with the `transparent` color value. It looks a little bit like this:

`.center { fill: color-mix(in srgb, blue, transparent 20%); }`

`.center { fill: color-mix(in srgb, blue, transparent 40%); }`

`.center { fill: color-mix(in srgb, blue, transparent 60%); }`

`.center { fill: color-mix(in srgb, blue, transparent 80%); }`

`.center { fill: color-mix(in srgb, blue, transparent 90%); }`

**💡 Psst:** try swapping the website theme in the nav bar to see the transparency in action against a dark and light background.

By using color-mix in this way, you get to preserve your brand colors while also making value adjustments to them. Again, [relative color syntax](https://www.w3.org/TR/css-color-5/#:~:text=The%20new%20relative%20color%20syntax,possibly%20modified%20with%20math%20functions) is really what’s made for this sort of thing, but it’s pretty neat to see that you can do it with `color-mix` too. With this method you could create systems of colors like this:

```
:root {
  --brandBlue: skyblue;
  --brandBlue-a10: color-mix(in srgb, var(--brandBlue), transparent 90%);
  --brandBlue-a20: color-mix(in srgb, var(--brandBlue), transparent 80%);
  --brandBlue-a30: color-mix(in srgb, var(--brandBlue), transparent 70%);
  --brandBlue-a40: color-mix(in srgb, var(--brandBlue), transparent 60%);
  --brandBlue-a50: color-mix(in srgb, var(--brandBlue), transparent 50%);
  --brandBlue-a60: color-mix(in srgb, var(--brandBlue), transparent 40%);
  --brandBlue-a70: color-mix(in srgb, var(--brandBlue), transparent 30%);
  --brandBlue-a80: color-mix(in srgb, var(--brandBlue), transparent 20%);
  --brandBlue-a90: color-mix(in srgb, var(--brandBlue), transparent 10%);
}
```

## Further reading

I thought this technique was pretty cool and worth capturing, but this post mostly sticks to the `srgb` color space and doesn’t get into the magic of wider color gamuts. For more on that, check out Adam’s [HD Color Guide](https://developer.chrome.com/articles/high-definition-css-color-guide/). And for more on `color-mix()` check out:

-   [color-mix() spec](https://www.w3.org/TR/css-color-5/#funcdef-color-mix)
-   [CSS color-mix](https://developer.chrome.com/blog/css-color-mix/) by Adam Argyle