---
title: "Spiral Scrollytelling in CSS With sibling-index()"
source: "https://css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index/"
publishedDate: "2026-02-18"
category: "css"
feedName: "css-tricks"
author: "Lee Meyer"
---

Confession time: I’ve read about the [performance benefits](https://developer.chrome.com/blog/scroll-animation-performance-case-study) of `[scroll-timeline()](https://css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines/)`, but when I see [an impressive JavaScript scrollytelling site like this one](https://spark.thedigitalpanda.com/), it makes me question if the performance of old-school, main-thread scrollytelling is all that bad. The other shoe drops when the [creators of that site admit](https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/) they “ran into real limits,” and “mobile technically works, but it loses parallax and chops compositions,” to the extent that they “chose to gate phones to protect the first impression.” Put another way: they couldn’t get it working on mobile, and it sounds like JavaScript performance may have been one of the culprits.

The creator of [another of my favorite scrolling experiments](https://modem.io/blog/blog-monetization/) — which also uses JavaScript and also works best on desktop — [called out that his text vortex section](https://modem.io/blog/blog-monetization-making-of/) “would look better if it were applied for each _character_ rather than each word, but that’s incredibly difficult to pull off using this same technique without incurring an astronomical performance impact.”

Challenge accepted.

He may have inadvertently created a realistic benchmark test for smoothly animating hundreds of divs based on scrolling.

That’s our cue to see if we can make a lookalike effect using modern CSS features to smoothly spiral every character in a string of text as the user scrolls down. To give the original text vortex some CSS sibling rivalry, let’s give the new [`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) function a whirl, although it is [still waiting on Firefox support at the time of writing](https://caniuse.com/mdn-css_types_sibling-index). Therefore, as a fallback for the CodePen below, you can also watch the video of the screen recording.

### Confession #2: This uses some script

The only JavaScript is to split the text into a `<div>` for each character, but the animation is pure CSS. I could have hardcoded all the markup instead, but that would make the HTML annoying to read and maintain. The following script makes it easy for you to experiment with the pen by tweaking the text content.

```
const el = document.querySelector(".vortex");
el.innerHTML = el.innerHTML.replaceAll(/\s/g, '⠀');
new SplitText(".title", { type: "chars", charsClass: "char" });
```

The [`SplitText` plugin](https://gsap.com/docs/v3/Plugins/SplitText/) referenced here is from the freely available [GSAP library](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/). The plugin is designed to be usable standalone outside GSAP, which is what’s happening here. It is nice and simple to use, and it even populates `aria-label` so screen readers can see our text, regardless of the way we tokenize it. The one complication was that I wanted every space character to be in its own `<div>` that I could position. The simplest way I could find was to replace the spaces with a [special space character](https://www.compart.com/en/unicode/U+2800), which `SplitText` will put into its own `<div>`. If anyone knows a better way, I’d love to hear about it in the comments.

Now that we have each character living in its own `<div>`, we can implement the CSS to handle the spiral animation.

```
.vortex {
  position: fixed;
  left: 50%;
  height: 100vh;
  animation-name: vortex;
  animation-duration: 20s;
  animation-fill-mode: forwards;
  animation-timeline: scroll();

  .char {
    --radius: calc(10vh - (7vh/sibling-count() * sibling-index()));
    --rotation: calc((360deg * 3/sibling-count()) * sibling-index());

    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: rotate(var(--rotation))
      translateY(calc(-2.9 * var(--radius)))
      scale(calc(.4 - (.25/(sibling-count()) * sibling-index())));
    animation-name: fade-in;
    animation-ranger-start: calc(90%/var(sibling-count()) * var(--sibling-index()));
    animation-fill-mode: forwards;
    animation-timeline: scroll();
  }
}
```

### Spiral and fade the elements using `sibling-index()` and `sibling-count()`

We use the `sibling-count` and `sibling-index` functions together to calculate a gradual decrease for several properties of the characters when the `sibling-index` increases, using a formula like this:

```
propertyValue = startValue - ((reductionValue/totalCharacters) * characterIndex)
```

The first character starts near the maximum value. Each subsequent character subtracts a slightly larger fraction, so properties gradually dwindle to a chosen target value as the characters spiral inward. This technique is used to drive scale, rotation, and distance from the center.

If the goal had been to arrange the characters in a circle instead of a spiral, I would have used [CSS trigonometric functions](https://web.dev/articles/css-trig-functions) as [demonstrated here](https://web.dev/articles/css-trig-functions). However, the spiral seemed simpler to calculate without trig. Evidently, the original JavaScript version that inspired my CSS text spiral didn’t use trig either. The scroll animation is relatively simple as it’s just scaling and rotating the entire parent element to give the illusion that the viewer is being sucked into the vortex.

The only animation applied to individual characters is `fade-in` which is delayed increasingly for each character in the string, using another variation on the usage of the ratio of `sibling-index()` to [`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/). In this case, we increment [`animation-range-start`](https://css-tricks.com/almanac/properties/a/animation-range/) to stagger the delay before characters fade in as the user scrolls. It’s reminiscent of the [infamous scroll-to-fade](https://dbushell.com/2026/01/09/death-to-scroll-fade/) effect, and it makes me realize how often we reach for JavaScript just because it allows us to base styling on element indexes. Therefore, many JavaScript effects can likely be replaced with CSS once `sibling-index()` goes Baseline. Please do let me know in the comments if you can think of other examples of JavaScript effects we could recreate in CSS using `sibling-index()`.