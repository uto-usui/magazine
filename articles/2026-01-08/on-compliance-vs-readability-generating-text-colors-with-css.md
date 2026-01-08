---
title: "On compliance vs readability: Generating text colors with CSS"
source: "https://lea.verou.me/blog/2024/contrast-color/"
publishedDate: "2024-05-17"
category: "css"
feedName: "Lea Verou"
---

Can we emulate the upcoming CSS [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color) function via CSS features that have already widely shipped? And if so, what are the tradeoffs involved and how to best balance them?

## [Relative Colors](#relative-colors)

Out of [all the CSS features I have designed](https://lea.verou.me/specs/), [Relative Colors](https://lea.verou.me/specs/#relative-colors) aka _Relative Color Syntax_ (RCS) is definitely among the ones I’m most proud of. In a nutshell, they allow CSS authors to derive a new color from an existing color value by doing arbitrary math on color components in any supported color space:

```
--color-lighter: hsl(from var(--color) h s calc(l * 1.2));
--color-lighterer: oklch(from var(--color) calc(l + 0.2) c h);
--color-alpha-50: oklab(from var(--color) l a b / 50%);
```

The elevator pitch was that by allowing lower level operations they provide authors flexibility on how to derive color variations, giving us more time to figure out what the appropriate higher level primitives should be.

As of May 2024, RCS has [shipped in every browser except Firefox](https://caniuse.com/css-relative-colors). but given that it is an [Interop 2024 focus area](https://web.dev/blog/interop-2024), that [Firefox has expressed a positive standards position](https://mozilla.github.io/standards-positions/#css-relative-color-syntax), and that the [Bugzilla issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1701488) has had some recent activity and has been assigned, I am optimistic it would ship in Firefox soon (edit: **it shipped 5 days after writing these lines, in Firefox 128** 🎉). My guess it that it would become [Baseline](https://web.dev/baseline) by the end of 2024.

Even if my prediction is off, it already is available to **83% of users worldwide**, and if you sort [its caniuse page](https://caniuse.com/css-relative-colors) by usage, you will see the vast majority of the remaining 17% doesn’t come from Firefox, but from older Chrome and Safari versions. I think **its current market share warrants production use today**, as long as we use `@supports` to make sure things _work_ in non-supporting browsers, even if less pretty.

Most [Relative Colors tutorials](https://developer.chrome.com/blog/css-relative-color-syntax) revolve around its primary driving use cases: making tints and shades or other color variations by tweaking a specific color component up or down, and/or overriding a color component with a fixed value, like the example above. While this does address some very common pain points, it is merely scratching the surface of what RCS enables. This article explores a more advanced use case, with the hope that it will spark more creative uses of RCS in the wild.

## [The CSS `contrast-color()` function](#the-css-contrast-color\(\)-function)

One of the big longstanding CSS pain points is that it’s impossible to automatically specify a text color that is guaranteed to be readable on arbitrary backgrounds, e.g. white on darker colors and black on lighter ones.

Why would one need that? The primary use case is _when colors are outside the CSS author’s control_. This includes:

-   **User-defined colors.** An example you’re likely familiar with: GitHub labels. Think of how you select an arbitrary color when creating a label and GitHub automatically picks the text color — often poorly (we’ll see why in a bit)
-   **Colors defined by another developer.** E.g. you’re writing a web component that supports certain CSS variables for styling. You _could_ require separate variables for the text and background, but that reduces the usability of your web component by making it more of a hassle to use. Wouldn’t it be great if it could just use a [sensible default](https://www.nngroup.com/articles/slips/), that you can, but rarely need to override?
-   **Colors defined by an external design system**, like [Open Props](https://open-props.style/), [Material Design](https://material.io/), or even (_gasp_) [Tailwind](https://tailwindcss.com/).

![Screenshot from GitHub issues showing many different labels with different colors](https://lea.verou.me/blog/2024/contrast-color/images/gh-labels.png)

GitHub Labels are an example where colors are user-defined, and the UI needs to pick a text color that works with them. GitHub uses WCAG 2.1 to determine the text color, which is why (as we will see in the next section) the results are often poor.

Even in a codebase where every line of CSS code is controlled by a single author, reducing couplings can improve modularity and facilitate code reuse.

The good news is that this is not going to be a pain point for much longer. The CSS function [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color) was designed to address exactly that. This is not new, you may have heard of it as `color-contrast()` before, an earlier name. I recently [drove consensus to scope it down to an MVP](https://github.com/w3c/csswg-drafts/issues/9166) that addresses the most prominent pain points and can actually ship soonish, as it circumvents some very difficult design decisions that had caused the full-blown feature to stall. I then [added it to the spec](https://github.com/w3c/csswg-drafts/commit/39f469149abb5575505b6d2d54b8bddf119f896d) per WG resolution, though some details still need to be ironed out.

Usage will look like this:

```
background: var(--color);
color: contrast-color(var(--color));
```

_Glorious, isn’t it?_ Of course, soonish in spec years is still, well, years. As a data point, you can see in [my past spec work](https://lea.verou.me/specs/) that with a bit of luck (and browser interest), it can take as little as 2 years to get a feature shipped across all major browsers after it’s been specced. When the standards work is also well-funded, there have even been cases where a feature went **from conception to baseline in 2 years**, with [Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers) being the poster child for this: [proposal by Miriam in Oct 2019](https://github.com/w3c/csswg-drafts/issues/4470), [shipped in every major browser by Mar 2022](https://caniuse.com/css-cascade-layers). But 2 years is still a long time (and there are no guarantees it won’t be longer). What is our recourse until then?

As you may have guessed from the title, the answer is yes. It may not be pretty, but there is a way to emulate `contrast-color()` (or something close to it) using Relative Colors.

## [Using RCS to automatically compute a contrasting text color](#using-rcs-to-automatically-compute-a-contrasting-text-color)

In the following we will use the [OKLCh color space](https://www.w3.org/TR/css-color-4/#ok-lab), which is the most _perceptually uniform_ _polar color space_ that CSS supports.

Let’s assume there is a Lightness value above which black text is guaranteed to be readable regardless of the chroma and hue, and below which white text is guaranteed to be readable. We will validate that assumption later, but for now let’s take it for granted. In the rest of this article, we’ll call that value the **threshold** and represent it as Lthreshold.

We will compute this value more rigously in the next section (and prove that it actually exists!), but for now let’s use `0.7` (70%). We can assign it to a variable to make it easier to tweak:

```
--l-threshold: 0.7;
```

Let’s work backwards from the desired result. We want to come up with an expression that is composed of **widely supported CSS math functions**, and will return 1 if L ≤ Lthreshold and 0 otherwise. If we could write such an expression, we could then use that value as the lightness of a new color:

```
--l: /* ??? */;
color: oklch(var(--l) 0 0);
```

How could we simplify the task? One way is to **relax what our expression needs to return**. We don’t actually need an exact 0 or 1 If we can manage to find an expression that will give us 0 when L > Lthreshold and > 1 when L ≤ Lthreshold, we can just use `clamp(0, /* expression */, 1)` to get the desired result.

One idea would be to use ratios, as they have this nice property where they are > 1 if the numerator is larger than the denominator and ≤ 1 otherwise.

The ratio of LLthreshold is < 1 for L ≤ Lthreshold and > 1 when L > Lthreshold. This means that LLthreshold−1 will be a negative number for L < Lthreshold and a positive one for L > Lthreshold. Then all we need to do is multiply that expression by a huge (in magnitude) negative number so that when it’s negative the result is guaranteed to be over 1.

Putting it all together, it looks like this:

```
--l-threshold: 0.7;
--l: clamp(0, (l / var(--l-threshold) - 1) * -infinity, 1);
color: oklch(from var(--color) var(--l) 0 h);
```

One worry might be that if L gets close enough to the threshold we could get a number between 0 - 1, but in my experiments this never happened, presumably since precision is finite.

### [Fallback for browsers that don’t support RCS](#fallback-for-browsers-that-don%E2%80%99t-support-rcs)

The last piece of the puzzle is to provide a fallback for browsers that don’t support RCS. We can use `@supports` with any color property and any relative color value as the test, e.g.:

```
.contrast-color {
	/* Fallback */
	background: hsl(0 0 0 / 50%);
	color: white;

	@supports (color: oklch(from red l c h)) {
		--l: clamp(0, (l / var(--l-threshold) - 1) * -infinity, 1);
		color: oklch(from var(--color) var(--l) 0 h);
		background: none;
	}
}
```

In the spirit of making sure things work in non-supporting browsers, even if less pretty, some fallback ideas could be:

-   A white or semi-transparent white background with black text or vice versa.
-   `-webkit-text-stroke` with a color opposite to the text color. This works better with bolder text, since half of the outline is inside the letterforms.
-   Many `text-shadow` values with a color opposite to the text color. This works better with thinner text, as it’s drawn behind the text.

## [Does this mythical L threshold actually exist?](#does-this-mythical-l-threshold-actually-exist%3F)

In the previous section we’ve made a pretty big assumption: That there is a Lightness value (Lthreshold) above which black text is guaranteed to be readable regardless of the chroma and hue, and below which white text is guaranteed to be readable regardless of the chroma and hue. But does such a value exist? It is time to put this claim to the test.

When people first hear about perceptually uniform color spaces like [Lab](https://en.wikipedia.org/wiki/CIELAB_color_space), [LCH](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model) or their improved versions, [OkLab](https://bottosson.github.io/posts/oklab/) and [OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab), they imagine that they can infer the contrast between two colors by simply comparing their L(ightness) values. This is unfortunately not true, as contrast depends on more factors than perceptual lightness. However, there is certainly _significant_ correlation between Lightness values and contrast.

At this point, I should point out that while most web designers are aware of the [WCAG 2.1 contrast algorithm](https://www.w3.org/TR/WCAG21/#contrast-minimum), which is part of the [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/) and baked into law in many countries, **it has been known for years that it produces extremely poor results**. So bad in fact that in [some tests](https://www.cedc.tools/article.html) it performs almost as bad as random chance for any color that is not very light or very dark. There is a newer contrast algorithm, [APCA](https://apcacontrast.com/) that produces _far_ better results, but is not yet part of any standard or legislation, and there have previously been some bumps along the way with making it freely available to the public (which seem to be largely resolved).

Some text

Some text

Which of the two seems more readable? You may be surprised to find that the white text version fails WCAG 2.1, while the black text version even passes WCAG AAA!

So where does that leave web authors? In quite a predicament as it turns out. It seems that the best way to create accessible color pairings right now is a two step process:

-   Use APCA to ensure **actual readability**
-   **Compliance failsafe**: Ensure the result does not actively _fail_ WCAG 2.1.

I ran [some quick experiments](https://lea.verou.me/blog/2024/contrast-color/research/) using [Color.js](https://colorjs.io/) where I iterate over the [OKLCh reference range](https://drafts.csswg.org/css-color-4/#prr-oklch) (loosely based on the P3 gamut) in increments of increasing granularity and calculate the lightness ranges for colors where white was the “best” text color (= produced higher contrast than black) and vice versa. I also compute the brackets for each level (fail, AA, AAA, AAA+) for both APCA and WCAG.

I then turned my exploration into an [interactive playground](https://lea.verou.me/blog/2024/contrast-color/research) where you can run the same experiments yourself, potentially with narrower ranges that fit your use case, or with higher granularity.

Calculating lightness ranges and contrast brackets for black and white on different background colors.

This is [the table produced with C ∈ \[0, 0.4\] (step = 0.025) and H ∈ \[0, 360) (step = 1)](https://lea.verou.me/blog/2024/contrast-color/research/?c=0,0.4,0.025&h=0,359,1):

Text color

Level

APCA

WCAG 2.1

Min

Max

Min

Max

white

best

0%

75.2%

0%

61.8%

fail

71.6%

100%

62.4%

100%

AA

62.7%

80.8%

52.3%

72.1%

AAA

52.6%

71.7%

42%

62.3%

AAA+

0%

60.8%

0%

52.7%

black

best

66.1%

100%

52%

100%

fail

0%

68.7%

0%

52.7%

AA

60%

78.7%

42%

61.5%

AAA

69.4%

87.7%

51.4%

72.1%

AAA+

78.2%

100%

62.4%

100%

Note that these are the min and max L values for each level. E.g. the fact that white text _can_ fail WCAG when L ∈ \[62.4%, 100%\] doesn’t mean that _every_ color with L > 62.4% will fail WCAG, just that _some_ do. So, **we can only draw meaningful conclusions by inverting the logic**: Since all white text failures are have an L ∈ \[62.4%, 100%\], it logically follows that if L < 62.4%, white text will pass WCAG regardless of what the color is.

By applying this logic to all ranges, we can draw similar guarantees for many of these brackets:

**0%** to 52.7%

52.7% to 62.4%

62.4% to 66.1%

66.1% to 68.7%

68.7% to 71.6%

71.6% to 75.2%

75.2% to **100%**

Compliance WCAG 2.1

white

✅ AA

✅ AA

black

✅ AA

✅ AAA

✅ AAA

✅ AAA

✅ AAA

✅ AAA+

Readability APCA

white

😍 Best

😍 Best

😍 Best

🙂 OK

🙂 OK

black

🙂 OK

🙂 OK

😍 Best

Contrast guarantees we can infer for black and white text over arbitrary colors. OK = passes but is not necessarily best.

You may have noticed that in general, WCAG has a lot of false negatives around white text, and tends to place the Lightness threshold much lower than APCA. This is a known issue with the WCAG algorithm.

Therefore, **to best balance readability and compliance, we should use the highest threshold we can get away with**. This means:

-   If passing WCAG is a requirement, the highest threshold we can use is **62.3%**.
-   If actual readability is our only concern, we can safely ignore WCAG and pick a threshold somewhere between 68.7% and 71.6%, e.g. **70%**.

Here’s a [demo](#demo) so you can see how they both play out. Edit the color below to see how the two thresholds work in practice, and compare with the actual contrast brackets, shown on the table next to (or below) the color picker.

Your browser does not support Relative Color Syntax, so the demo below will not work. This is what it looks like in a supporting browser: ![Screenshot of demo](https://lea.verou.me/blog/2024/contrast-color/images/demo.png)

Lthreshold = 70%

Lthreshold = %

Lthreshold = 62.3%

Actual contrast ratios

Text color

APCA

WCAG 2.1

White

Black

Avoid colors marked “P3+”, “PP” or “PP+”, as these are almost certainly outside your screen gamut, and [browsers currently do not gamut map properly](https://github.com/w3c/csswg-drafts/issues/9449), so the visual result will be off.

Note that if your actual color is more constrained (e.g. a subset of hues or chromas or a specific gamut), you might be able to balance these tradeoffs better by using a different threshold. Run the experiment yourself with your actual range of colors and find out!

Here are some examples of narrower ranges I have tried and the highest threshold that still passes WCAG 2.1:

Description

Color range

Threshold

Modern low-end screens

[Colors within the sRGB gamut](https://lea.verou.me/blog/2024/contrast-color/research/?gamut=srgb)

65%

Modern high-end screens

[Colors within the P3 gamut](https://lea.verou.me/blog/2024/contrast-color/research/?gamut=p3)

64.5%

Future high-end screens

[Colors within the Rec.2020 gamut](https://lea.verou.me/blog/2024/contrast-color/research/?gamut=rec2020)

63.4%

Neutrals

[C ∈ \[0, 0.03\]](https://lea.verou.me/blog/2024/contrast-color/research/?c=0,0.03,0.01)

67%

Muted colors

[C ∈ \[0, 0.1\]](https://lea.verou.me/blog/2024/contrast-color/research/?c=0,0.1,0.01)

65.6%

Warm colors (reds/oranges/yellows)

[H ∈ \[0, 100\]](https://lea.verou.me/blog/2024/contrast-color/research/?h=0,100,1)

66.8%

Pinks/Purples

[H ∈ \[300, 370\]](https://lea.verou.me/blog/2024/contrast-color/research/?h=300,370,1)

67%

It is particularly interesting that **the threshold is improved to 64.5% by just ignoring colors that are not actually displayable** on modern screens. So, assuming (though sadly this is [not an assumption that currently holds true](https://github.com/w3c/csswg-drafts/issues/9449)) that browsers prioritize preserving lightness when gamut mapping, we _could_ use 64.5% and still guarantee WCAG compliance.

You can even turn this into a utility class that you can combine with different thesholds:

```
.contrast-color {
	--l: clamp(0, (l / var(--l-threshold, 0.623) - 1) * -infinity, 1);
	color: oklch(from var(--color) var(--l) 0 h);
}

.pink {
	--l-threshold: 0.67;
}
```

## [Conclusion & Future work](#conclusion-%26-future-work)

Putting it all together, including a fallback, as well as a “fall forward” that uses `contrast-color()`, the utility class could look like this:

```
.contrast-color {
	/* Fallback for browsers that don't support RCS */
	color: white;
	text-shadow: 0 0 .05em black, 0 0 .05em black, 0 0 .05em black, 0 0 .05em black;

	@supports (color: oklch(from red l c h)) {
		--l: clamp(0, (l / var(--l-threshold, 0.623) - 1) * -infinity, 1);
		color: oklch(from var(--color) var(--l) 0 h);
		text-shadow: none;
	}

	@supports (color: contrast-color(red)) {
		color: contrast-color(var(--color));
		text-shadow: none;
	}
}
```

This is only a start. I can imagine many directions for improvement such as:

-   Since RCS allows us to do math with _any_ of the color components in _any_ color space, I wonder if there is a better formula that still be implemented in CSS and balances readability and compliance even better. E.g. I’ve had some chats with [Andrew Somers](https://github.com/Myndex) (creator of APCA) right before publishing this, which suggest that doing math on luminance (the Y component of XYZ) instead could be a promising direction.
-   We currently only calculate thresholds for white and black text. However, in real designs, we rarely want pure black text, which is why `contrast-color()` only guarantees a _“very light or very dark color”_ unless the `max` keyword is used. How would this extend to darker tints of the background color?

## [Addendum](#addendum)

As often happens, after publishing this blog post, a ton of folks reached out to share all sorts of related work in the space. I thought I’d share some of the most interesting findings here.

### [Using luminance instead of Lightness](#using-luminance-instead-of-lightness)

When colors have sufficiently different lightness values (as happens with white or black text), humans disregard chromatic contrast (the contrast that hue/colorfulness provide) and basically only use lightness contrast to determine readability. This is why L can be such a good predictor of whether white or black text works best.

Another measure, luminance, is basically the color’s Y component in the XYZ color space, and a good threshold for flipping to black text is when Y > 0.36. This gives us another method for computing a text color:

```
--y-threshold: 0.36;
--y: clamp(0, (y / var(--y-threshold) - 1) * -infinity, 1);
color: color(from var(--color) xyz-d65 var(--y) var(--y) var(--y));
```

As you can see in [this demo by Lloyd Kupchanko](https://blackorwhite.lloydk.ca/), using Ythreshold > 36% very closely predicts the best text color as determined by APCA.

In my tests ([codepen](https://codepen.io/leaverou/pen/ExzVOME)) it appeared to work as well as the Lthreshold method, i.e. it was a struggle to find colors where they disagree. However, [after this blog post, Lloyd added](https://twitter.com/lkupchanko/status/1791558925206409553) various Lthreshold boundaries to his demo, and it appears that indeed, Lthreshold has a wider range where it disagrees with APCA than Ythreshold does.

Given this, **my recommendation would be to use the Ythreshold method if you need to flip between black and white text, and the Lthreshold method if you need to customize the text color further** (e.g. have a very dark color instead of black).

### [Browser bug & workarounds](#browser-bug-%26-workarounds)

About a week after publishing this post, I discovered a browser bug with `color-mix()` and RCS, where colors defined via `color-mix()` used in `from` render RCS invalid. You can use [this testcase](https://codepen.io/leaverou/pen/ExzVOME) to see if a given browser is affected. This has been fixed in Chrome 125 and Safari TP release 194, but it certainly throws a spanner in the works since the whole point of using this technique is that we don’t have to care how the color was defined.

There are two ways to work around this:

1.  Adjust the `@supports` condition to use `color-mix()`, like so:

```
@supports (color: oklch(from color-mix(in oklch, red, tan) l c h)) {
	/* ... */
}
```

The downside is that right now, this would restrict the set of browsers this works in to a teeny tiny set. 2. Register the custom property that contains the color:

```
@property --color {
	syntax: "<color>";
	inherits: true;
	initial-value: transparent;
}
```

This completely fixes it, since if the property is registered, by the time the color hits RCS, it’s just a resolved color value. `@property` is currently [supported](https://caniuse.com/mdn-css_at-rules_property) by a much wider set of browsers than RCS, so this workaround doesn’t hurt compatiblity at all.

### [Useful resources](#useful-resources)

Many people have shared useful resources on the topic, such as:

-   [Black or White?](https://blackorwhite.lloydk.ca/): Compare different contrast algorithms for picking between black or white
-   [Dynamic text color contrast based on background lightness with CSS/SVG filters](https://miunau.com/posts/dynamic-text-contrast-in-css/): A different approach to the same problem (requires extra HTML element for the text)

_Thanks to [Chris Lilley](https://svgees.us/), [Andrew Somers](https://github.com/myndex), [Cory LaViska](https://www.abeautifulsite.net/), [Elika Etemad](https://fantasai.inkedblade.net/), and [Tab Atkins-Bittner](https://xanthir.com/) for their feedback on earlier drafts of this article._