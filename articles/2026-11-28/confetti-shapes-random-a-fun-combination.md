---
title: "Confetti + Shapes + random(): A Fun Combination!"
source: "https://blog.master.dev/confetti-shapes-random-a-fun-combination/"
publishedDate: "2026-11-27"
category: "css"
feedName: "Frontend Masters Blog"
author: "Temani Afif"
---

We all like confetti, right? So let’s create some fun demos with a confetti explosion. Hover over the shapes in the demo below and see the magic effect!

Cool, right? As stated in the title, it’s a combination of the new `random()` function, shape creation, and a few other modern features.

**Note:** The animation doesn’t work properly in Firefox due to [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=2087038).

## The Main Configuration

Confetti means a lot of elements, so don’t be surprised if the HTML looks like this:

`<div class="shape">   <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>   <!-- You can add as many elements as you want --> </div>`Code language: HTML, XML (xml)

The good news is that we don’t need to know the exact number of elements. The code works with 10, 50, 100, or even 1000! But don’t go wild with the number; otherwise, your browser performance will suffer.

Then we consider the following CSS:

`@property --i {syntax: "<integer>";initial-value: 0;inherits: true} @property --n {syntax: "<integer>";initial-value: 0;inherits: true}  .shape {   --d: 18px;   --s: ... ; /* the shape */    position: relative; } .shape i {   --i: sibling-index();   --n: sibling-count(); } .shape i:before, .shape i:after {   content: "";   position: absolute;   height: 5px; /* this controls the thickness */   aspect-ratio: 1.75;   background: color-mix(in hsl,#ef476f random(0%,100%),#ade8f4);   offset: var(--s) calc(var(--i)*100%/var(--n));   translate: random(-1*var(--d),var(--d)) random(-1*var(--d),var(--d)); }`Code language: CSS (css)

First of all, I am going to rely on the pseudo-elements to have more visual elements. In other words, each `<i>` will produce two confetti instead of one. It allows me to rely on fewer HTML elements, but we can also do the following if we want one confetti per element:

`.shape {   --d: 18px;   --s: ... ; /* the shape */    position: relative; } .shape i {   --i: sibling-index();   --n: sibling-count();   position: absolute;   height: 5px; /* this controls the thickness */   aspect-ratio: 1.75;   background: color-mix(in hsl,#ef476f random(0%,100%),#ade8f4);   offset: var(--s) calc(var(--i)*100%/var(--n));   translate: random(-1*var(--d),var(--d)) random(-1*var(--d),var(--d)); }`Code language: CSS (css)

The main difference between the two snippets is that the pseudo-elements need to inherit `sibling-index()` and `sibling-count()` from the `<i>`, and to do that, I am required to register the variables using `@property`. Jake Archibald [has a good write-up explaining this little quirk](https://jakearchibald.com/2026/css-custom-property-compute-time/).

Then, we make them `position: absolute`, define their size, and randomly place them within a specific shape.

`offset: var(--s) calc(var(--i)*100%/var(--n)); translate: random(-1*var(--d),var(--d)) random(-1*var(--d),var(--d));`Code language: CSS (css)

The above two lines are the ones relevant to the trick. Let’s consider a simple shape (a circle, for example) and dissect the `offset` property:

`offset: circle(50%) calc(var(--i)*100%/var(--n));`Code language: CSS (css)

It’s the same as:

`offset-path: circle(50%); offset-distance: calc(var(--i)*100%/var(--n));`Code language: CSS (css)

If, for example, we have 50 elements, then each pseudo-element will have the following value for `offset-distance` depending on its parent’s index:

`2%, 4%, 6%, 8%, ..., 100%`Code language: plaintext (plaintext)

We are placing all the elements around the circle following a uniform step.

Here is a demo with different numbers of items to better understand the trick:

By adding more elements, we make the step smaller until they overlap, creating the illusion of a continuous shape!

Then, we add the `random()` part using `translate`:

`translate: random(-1*var(--d),var(--d)) random(-1*var(--d),var(--d));`Code language: CSS (css)

All the elements are now scrambled:

We `random()`\-ize the color as well, and we get our multi-color confetti!

`background: color-mix(in hsl,#ef476f random(0%,100%),#ade8f4);`Code language: CSS (css)

To get the hover effect, we make the translate distance equal to `0px` initially, and all the elements should start with the same color:

`.shape:not(:hover) {   --d: 0px; } .shape:not(:hover) i:before, .shape:not(:hover) i:after {   background: #ef476f; }`Code language: CSS (css)

Now pick your favorite shape instead of the circle, and you get a nice confetti shape explosion.

Do you have an SVG shape you want to use? No problem! Use [my SVG-to-CSS converter](https://css-generators.com/svg-to-css/) to get a `shape()` value, and you are done:

We can see some weird artifacts, but the effect is still pretty cool and easy to implement.

## Partial Explosion

A full-shape explosion is fun, but what about a partial explosion? Well, I like to challenge myself with tricky effects, so let’s do it.

In the demo below, the shapes are partially exploded, and if you hover over them, you get a nice animation effect.

Instead of applying the same translation to all the elements, we are going to control how far each element can translate by introducing two new variables.

In the main technique, we used `offset-distance: calc(var(--i)*100%/var(--n))` to place the elements on the shape. The values are within the range `[0% 100%]`. If we omit the `100%` from the formula, we get the range `[0 1]`.

To better understand, let’s consider a straight line as our shape.

![A red horizontal line running from 0 on the left to 1 on the right. A dashed marker labeled P sits right of center, with two vertical bars on either side of it marking a range; an arrow labeled R spans from the left bar to P.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/confetti-partial-range.png?resize=1035%2C247&quality=80&ssl=1)

The red line illustrates our shape, and the placement of each element on that shape depends on the value of `i/n`. We go from left (`0`) to right (`1`). `p` and `r` are the new variables that define a new range within `[0 1]`: `[p - r p + r]`. `p` is the center of the range, and `r` defines its size.

Elements outside that range get no translation, and elements inside that range get a translation. Here is the same figure with the translation.

![The same 0-to-1 line with the P marker and R range. Outside the range the line stays solid, but inside it the line breaks into scattered confetti pieces, scattered most near P and less toward the range edges.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/confetti-partial-range-translated.png?resize=1086%2C287&quality=80&ssl=1)

See that? We don’t simply apply a translation within that range. We apply it progressively from the extremities to the center, creating a continuous effect instead of an abrupt one. Then, all we have to do is adjust the new variables. `r` controls the size of the range (how many elements), and `p` controls the position of the range (where the partial explosion is happening).

We translate this logic into CSS:

`.shape {   --d: 25px; /* control the explosion distance */   --s: ...; /* the shape */   /* control the explosion range */   --p: 0.5;   --r: .2; } .shape i {   --i: sibling-index();   --n: sibling-count(); } .shape i:before, .shape i:after {   content: "";   position: absolute;   height: 5px; /* this controls the thickness */   aspect-ratio: 1.75;   --_p: max(0,min(abs(var(--i)/var(--n) - mod(var(--p),1)),1 - abs(var(--i)/var(--n) - mod(var(--p),1)))/(-1*var(--r)) + 1);   background: color-mix(in hsl,#ade8f4 calc(random(0%,100%)*var(--_p)),#ef476f);   translate:       random(-1*var(--_p)*var(--d),var(--_p)*var(--d))       random(-1*var(--_p)*var(--d),var(--_p)*var(--d));   offset: var(--s) calc(var(--i)*100%/var(--n)); }`Code language: CSS (css)

I will skip the boring math explanation, but the main idea is to end up with an internal variable, `--_p`, that has a value in the range `[0 1]`. And as you can see, that variable is a multiplier of the translate value as well as the `random()` inside the `color-mix()`.

Then we animate the `--p` variable to create the hover effect:

`.shape:hover {   --p: 1.5; }`Code language: CSS (css)

But why is `--p` outside the range `[0 1]`?

In the formula, you will notice the use of `mod(var(--p),1)`, which means that whatever value you use, it always wraps back into the range `[0 1]`. So `1.5` is the same as `0.5`, which lets me get a full rotation of the effect. It’s like rotating from `45deg` to `405deg`: two different values for the same position.

## Conclusion

That’s it! A fun CSS experiment using the new `random()` function and another opportunity to remind you about the modern features that let us create these effects easily. If you have a cool CSS-only confetti effect based on my technique or another one, share it in the comments.

I will end with some fancy confetti buttons: