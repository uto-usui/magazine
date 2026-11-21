---
title: "Squircles"
source: "https://jespervos.com/craft/squircles"
publishedDate: "2026-11-19"
category: "design"
feedName: "Sidebar"
---

Since Apple introduced them in iOS 7, we've all been exposed to rectangles with continuous curves instead of a circular arcs. The shape is often called a squircle.

Now squircles are coming to the web, and you should prepare. I'll explain how.

superellipse()

2.00

\-3 · Notch0 · Bevel3 · Square

In August 2025, Chrome introduced support for the CSS `corner-shape` property. Safari Technology Preview followed on August 26, 2026 [ℹ](https://webkit.org/blog/18194/release-notes-for-safari-technology-preview-251/#:~:text=Added%20support%20for%20the%20corner%2Dshape%20property.%20\(319205%40main\)%20\(184950973\)).

Browser support is still limited, but `corner-shape` builds on the familiar `border-radius`. Unsupported browsers simply keep their regular rounded corners, so we can use it as a progressive enhancement.

But there is one catch...

Switching a corner to a squircle changes its curve within the boundaries of the corner radius. This makes a squircle looks noticeably sharper than a regular, circular arc.

-   superellipse(1)
-   superellipse(2.00)

superellipse()

2.00

1 · Round2 · Squircle

Simply adding `corner-shape: squircle` into an existing design makes every corner on the page considerably sharper. We want the same sharpness, but smoother. So we need to compensate for that.

A circular corner and a squircle remove different amounts of the corner area. The circle removes 1−¼π1 - ¼π or about 21% of the square it sits in. A squircle with the same radius removes only 7%, about a third as much. Less is removed, so the corner looks sharper.

-   Circle
-   Squircle · radius ×1.000

-   Circle · 21%
-   Squircle · 7%

Squircle radius

×1.000

1.02.2

The squircle area grows with the square of the radius. To remove 2.94 times as much, we need 2.94\\sqrt{2.94} times the radius which comes down to approximately `1.715`. Multiply the radius by it and the squircle removes as much of the corner as the circle does.

Equal area is not the only way to match two corners. Look at how the curves behave on the diagonal.

At ×1.715 the squircle pokes out past the circle near the middle of the corner, coming closer to the sharp corner than the circle does. Increase the multiplier and the dots will meet on the diagonal where the squircle no longer pokes out. It fits inside the circular corner, and its edges line up with the circle's.

-   Circle

Multiplier

×1.715

1.02.2

To find where the dots meet, we need to measure how far each curve cuts into the corner along the diagonal. Starting at the sharp corner of the square and walking towards the curve. The circle sits 0.292890.29289 of its radius away from that corner on each axis. The squircle sits only 0.159100.15910 of its radius away, because it hugs the corner more tightly.

For the squircle to cut in as deep as the circle, its radius has to be larger by the ratio of those two distances: 0.29289/0.15910≈1.8410.29289 / 0.15910 \\approx 1.841. That is the multiplier where the dots meet.

The multiplier can be computed exactly for each `superellipse(𝐾)` as the circle's distance divided by the curve's:

multiplier\=1−2−121−2−12K\\text{multiplier} = \\frac{1 - 2^{-\\frac{1}{2}}}{1 - 2^{-\\frac{1}{2^K}}}

For the squircle, K\=2K = 2, that is the ×1.841 we have just found.

superellipse(1.50)

superellipse()

1.50

1.02.0

Using this multiplier we keep the squircle inside the circular corner it replaces, so edges stay aligned with the original shape. That is also how Figma's corner smoothing behaves. It works better for nested corners too, as we will see below.

Designers have a rule for nested rounded rectangles: the inner radius is the outer radius minus the padding. With circles this keeps the gap between the two shapes even all the way around.

Squircles break the rule. Same radius, and the gap swells by 19% at the corners.

Circle

Squircle ×1.841

Radius multiplier

×1.841

1.02.2

Compensating the radius brings the gap back. At ×1.715 it is within 3% of the padding. At ×1.841 it is exactly the padding on the diagonal and never wider anywhere.

Now we can write it down. We use `@supports` so that unsupported browsers keep their regular `border-radius`.

`.card {   border-radius: calc(var(--radius, 1rem) * var(--factor, 1)); } @supports (corner-shape: squircle) {   .card {    /* Circle depth divided by curve depth, with n = 2^K. */    --factor: calc(      (1 - pow(2, -0.5)) / (1 - pow(2, -1 / pow(2, var(--shape, 2))))    );    corner-shape: superellipse(var(--shape, 2));  } }`

That's the whole technique:

-   In browsers without support, `--factor` is never set, so it falls back to `1`. The element keeps its original `border-radius`.
-   In browsers with support, the radius grows by the multiplier and the corner becomes a squircle.
-   `--radius` is the radius you would have written anyway. Set `--shape` on an element and both the curve and the compensation follow.

Tailwind's `rounded-*` classes are a natural fit, so I turned the recipe into a plugin: [tailwindcss-squircles](https://github.com/jespervos/tailwindcss-squircles).

`pnpm add tailwindcss-squircles`

`@import "tailwindcss"; @plugin "tailwindcss-squircles";`

Your markup stays as it is. Every `rounded-*` class now draws a compensated squircle in supporting browsers, and a regular rounded corner everywhere else.

`<div class="rounded-xl"></div> <div class="rounded-[20px]"></div> <div class="rounded-es-2xl rounded-t-lg"></div>`

It follows the recipe above. Next to each class, the plugin adds one rule inside `@supports` that multiplies the radius, and one that sets the shape. A few things to know:

-   Theme values, arbitrary values, `(--variables)` and every side, including the logical ones like `rounded-es-*`, are covered. Each side sets the matching `corner-*-shape` property.
-   Compensated radii read `var(--radius-*)`, so overriding a radius token still works.
-   `rounded-full` and percentage radii like `rounded-[50%]` stay round. A pill must stay a pill.
-   Radii with several values, like `rounded-[10px_20px]` or `rounded-[10px_20px/5px]`, are multiplied part by part.
-   Values with nothing to multiply, such as `rounded-[inherit]`, keep Tailwind's own output.

To change the shape of a single element, use the `corner-*` classes:

`<div class="corner-round rounded-lg"></div> <div class="corner-bevel rounded-lg"></div> <div class="corner-superellipse-1.5 rounded-lg"></div>`

Just like `--shape` in the recipe, they change the curve and the compensation together: `corner-round` multiplies the radius by 1, `corner-superellipse-1.5` by the exact multiplier for that curve.