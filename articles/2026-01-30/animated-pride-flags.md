---
title: "Animated Pride Flags"
source: "https://www.joshwcomeau.com/animation/pride-flags/"
publishedDate: "2023-06-06"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

It's June, which means it's Pride Month! Let's celebrate by building a wavy pixellated pride flag:

Variant:

Rainbow 🏳️‍🌈Trans 🏳️‍⚧️

Number of segments:10

Staggered Delay:50ms

There's a lot of exciting stuff packed into this tutorial. In order to build this flag, we'll need to rely on a handful of tricks I've developed over years of experimentation. You'll learn a ton about keyframe animations, linear gradients, and more. 😄

## [Link to this heading](#show-me-the-code-1)Show me the code!

Let's start by looking at a complete implementation. It doesn't have all of the bells and whistles we'll add later, but it shows the fundamental idea.

Don't worry if you can't make much sense of it yet, we'll dig into it in this blog post!

Code Playground

import React from 'react';
import range from 'lodash.range';

import styles from './PrideFlag.module.css';

function PrideFlag({
  numOfColumns = 10,
  staggeredDelay = 100,
}) {
  return (
    <div className\={styles.flag}\>
      {range(numOfColumns).map((index) \=> (
        <div
          key\={index}
          className\={styles.column}
          style\={{
            animationDelay:
              index \* staggeredDelay + 'ms',
          }}
        />
      ))}
    </div\>
  );
}

export default PrideFlag;

## [Link to this heading](#the-fundamental-strategy-2)The fundamental strategy

**Here's how this effect works:** our flag consists of several equal-width columns. Each column moves up and down, thanks to a CSS keyframe animation:

```
@keyframes oscillate {
  from {
    transform: translateY(8px);
  }
  to {
    transform: translateY(-8px);
  }
}

.column {
  animation: oscillate 500ms infinite;

  /* Ping-pong between “from” and “to”: */
  animation-direction: alternate;

  /* Use a symmetrical timing function: */
  animation-timing-function: ease-in-out;

  /* Avoid an initial flicker: */
  animation-fill-mode: backwards;
}
```

With this CSS in place, we have a bunch of columns moving up and down. The final missing piece is `animation-delay`; each column will receive a slightly-larger value. By staggering the animation, we create the illusion of a rippling flag.

Here's a simplified demo. Drag the “Staggered Delay” slider to see the effect at work:

.wrapper

Staggered Delay:0ms (default)

To do this, we'll apply increasingly-large values for `animation-delay` in an inline style:

```
<div class="flag">
  <div class="column" style="animation-delay: 0ms"></div>
  <div class="column" style="animation-delay: 100ms"></div>
  <div class="column" style="animation-delay: 200ms"></div>
  <div class="column" style="animation-delay: 300ms"></div>
</div>
```

We can also do this dynamically. Here's the approach I took with React, using the array index to calculate the amount of delay:

```
function PrideFlag({
  numOfColumns = 10,
  staggeredDelay = 100,
}) {
  return (
    <div className={styles.flag}>
      {range(numOfColumns).map((index) => (
        <div
          key={index}
          className={styles.column}
          style={{
            animationDelay: index * staggeredDelay + 'ms',
          }}
        />
      ))}
    </div>
  );
}
```

## [Link to this heading](#drawing-flag-bars-3)Drawing flag bars

So, each column is going up and down, but to complete the illusion, they need to have the colored stripes!

My first thought was to create a bunch of divs, one for each color:

.wrapper

Staggered Delay:125ms

This works, but it winds up creating _a lot_ of DOM nodes:

```
<div class="flag">
  <div class="column">
    <div style="background-color: black"></div>
    <div style="background-color: brown"></div>
    <div style="background-color: red"></div>
    <div style="background-color: orange"></div>
    <div style="background-color: yellow"></div>
    <div style="background-color: green"></div>
    <div style="background-color: blue"></div>
    <div style="background-color: violet"></div>
  </div>
  <div class="column">
    <!-- ...all the colors again -->
  </div>
  <!-- ...repeat for every column -->
</div>
```

An 8-color flag with 16 columns produces 128 DOM nodes. For reference, Google recommends that the _entire page_ should contain 1500 or fewer nodes. It feels pretty indulgent to use almost 10% of our total DOM node allotment on this flag animation!To be clear, this allotment is a _recommendation,_ not a hard limit. I blow past this number regularly in my own work, without any apparent negative consequences.

But yeah, it's still a good idea to avoid polluting the DOM with unnecessary nodes!

Fortunately, I have another trick up my sleeve: _linear gradients_.

I always forget that this is an option, because it feels so counter-intuitive. Gradients are used to smoothly fade from one color to another, not to create solid bars!

For example, suppose we're building the super-pretty pansexual flag:

If we plop the colors into a gradient, we get something like this:

Code Playground

.flag {
  width: 200px;
  aspect-ratio: 3 / 2;
  background: linear-gradient(
    to bottom,
    hsl(331deg 100% 55%), 
    hsl(50deg 100% 50%),  
    hsl(200deg 100% 55%)  
  );
}

As expected, the colors bleed into each other, creating a smooth fade. Doesn't look much like our pan pride flag!

**But check out what happens when we duplicate the colors, and position them strategically using color stops:**

Gradient Style:

smoothbars

Each of the 3 colors is duplicated, and then positioned right up against each other. The pink color spans the first 1/3rd, and then we transition _immediately_ to yellow. Essentially, the pink-to-yellow fade happens over 0px, and therefore, we get solid bars of color.

Here's what this looks like in CSS:

```
.flag {
  background: linear-gradient(
    to bottom,
    hsl(331deg 100% 55%) 0%,      /* pink */
    hsl(331deg 100% 55%) 33.3%,   /* pink */
    hsl(50deg 100% 50%)  33.3%,   /* yellow */
    hsl(50deg 100% 50%)  66.7%,   /* yellow */
    hsl(200deg 100% 55%) 66.7%,   /* blue */
    hsl(200deg 100% 55%) 100%     /* blue */
  );
}
```

With that done, I think we've covered all of the fundamentals! Once again, here's the result:

Variant:

Rainbow 🏳️‍🌈Trans 🏳️‍⚧️

Number of segments:10

Staggered Delay:50ms

## [Link to this heading](#nice-to-haves-4)Nice-to-haves

So, that's the “Minimum Viable Product version” of our flag animation. We're generating a bunch of super-narrow flags using a linear-gradient, and moving them up and down using a CSS keyframe animation.

That said, I have a few more tips and tricks we can use to make this animation even better!

### [Link to this heading](#controlling-the-amount-of-billow-5)Controlling the amount of billow

So, here's something that had befuddled me for a long time.

The actual CSS transform is currently hardcoded within our keyframe animation:

```
@keyframes oscillate {
  from {
    /* Hardcoded value: */
    transform: translateY(8px);
  }
  to {
    /* Hardcoded value: */
    transform: translateY(-8px);
  }
}
```

**What if we wanted this number to be dynamic?** For example, wouldn't it be cool if each column had a slightly different billow amount? Like a real flag attached to a flagpole?

It turns out, we can do this with

Here's the end result: a new “billow” parameter that affects how billowy the flag is:

Variant:

Rainbow 🏳️‍🌈Trans 🏳️‍⚧️

Billow:1.5px

To set this up, we'll need to replace our hardcoded value with a CSS variable, `--billow`:

```
@keyframes oscillate {
  from {
    transform: translateY(var(--billow));
  }
  to {
    transform: translateY(calc(var(--billow) * -1));
  }
}
```

Next, we'll define the `--billow` property in our markup, picking an increasingly-large number for each one:

```
<div class="flag">
  <div class="column" style="--billow: 0px"></div>
  <div class="column" style="--billow: 2px"></div>
  <div class="column" style="--billow: 4px"></div>
  <div class="column" style="--billow: 8px"></div>
</div>
```

In React, we can calculate this dynamically, much like we calculate the `animationDelay`:

```
function PrideFlag({
  numOfColumns,
  staggeredDelay = 100,
  billow = 2,
}) {
  return (
    <div className={styles.flag}>
      {range(numOfColumns).map((index) => (
        <div
          key={index}
          className={styles.column}
          style={{
            '--billow': index * billow + 'px',
            animationDelay: index * staggeredDelay + 'ms',
          }}
        />
      ))}
    </div>
  );
}
```

The `.column` class is the one that applies the `oscillate` keyframe animation, and so when the animation runs, it'll read the `--billow` value from that same DOM node. Because each `<div>` sets a different value for `--billow`, we wind up with this beautiful billowy effect!

Thanks to Jez McKean for the suggestion!

CSS variables are _incredible_. Unlike the variables built into CSS preprocessors (like Sass or Less), CSS variables don't compile away, and can be dynamically modified using JS. This “One Neat Trick” allows us to pass data from JavaScript/React into our CSS keyframe animation. ✨

### [Link to this heading](#generating-the-gradient-6)Generating the gradient

In the example above, I manually wrote out the `linear-gradient` for the pansexual flag:

```
.flag {
  background: linear-gradient(
    to bottom,
    hsl(331deg 100% 55%) 0%    33.3%,
    hsl(50deg 100% 50%)  33.3% 66.7%,
    hsl(200deg 100% 55%) 66.7% 100%
  );
}
```

This works, but it's a bit tedious to calculate it by hand. Ideally, our `<PrideFlag>` component should be able to generate this gradient dynamically, based on the supplied colors!

Here's a JavaScript function that will do this for us:

```
function generateGradientString(colors) {
  const numOfColors = colors.length;
  const segmentHeight = 100 / numOfColors;

  const gradientStops = colors.map((color, index) => {
    const start = index * segmentHeight;
    const end = (index + 1) * segmentHeight;

    return `${color} ${start}% ${end}%`;
  });

  return `linear-gradient(to bottom, ${gradientStops.join(', ')})`;
}

generateGradientString(['black', 'white']);
// -> "linear-gradient(to bottom, black 0% 50%, white 50% 100%)"
```

### [Link to this heading](#rounded-corners-7)Rounded corners

I think our flag will appear much friendlier if it has slightly rounded corners.

There’s a slight complication here, because our flag is actually built out of several identical columns. It'll look really funky if we round the corners of all columns!

I hate this so much!

Instead, we want to selectively apply specific rounding to specific columns. Here's the CSS:

```
.column:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.column:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
```

Using the `:first-child` and `:last-child` pseudo-classes, we can select the first/last columns in the group, and round the appropriate corners.

### [Link to this heading](#hiding-the-initial-setup-8)Hiding the initial setup

You may have noticed, in our MVP, that the first second or so is a bit awkward:

Each subsequent column has an increasingly large `animation-delay`. The final column just sits there for a full second, before the time elapses and it starts oscillating.

In some cases, this won't matter. If the flag is below the fold, for example, the animation should be running smoothly by the time the user scrolls to it. But what if it's above the fold, immediately visible?

It turns out, **we can use a negative value** for `animation-delay`!

For example, if we set `animation-delay: -200ms`, the animation will run immediately, but it will act as though it has _already_ been running for 200ms.

Imagine a car race, except every car has its own starting line staggered along the track. The moment the race starts, each car will be at a different point in the track.

Here's how we should structure things:

```
<div class="flag">
  <div class="column" style="animation-delay: -300ms"></div>
  <div class="column" style="animation-delay: -200ms"></div>
  <div class="column" style="animation-delay: -100ms"></div>
  <div class="column" style="animation-delay: 0ms"></div>
</div>
```

There's still a 100ms difference between each column's `animation-delay`, but they're all less than or equal to zero, so that when the animation starts, each column is at a different point in the oscillation.

In React, we need to calculate these numbers dynamically. Here's the code I used:

```
// The very first column is the one with the largest offset,
// the furthest from 0ms. Calculate that first:
const firstColumnDelay = numOfColumns * staggeredDelay * -1;

range(numOfColumns).map((index) => (
  <div
    key={index}
    className={styles.column}
    style={{
      // Then, add 100ms to each subsequent column:
      animationDelay:
        firstColumnDelay + index * staggeredDelay + 'ms',
    }}
  />
))
```

### [Link to this heading](#pixel-rounding-quirk-9)Pixel-rounding quirk

Depending on your browser and monitor, you might've noticed a thin gap between columns:

This happens because of a pixel-rounding issue.

In this example, the flag has a width of 200px, and it has 12 columns. When we do the math, we discover that each column is 16.666px wide.

Chrome handles this gracefully, but Firefox and Safari occasionally struggle to fit the columns together seamlessly. As a result, we get a single-pixel gap between certain columns.

**How do we fix it?** I think the cleanest approach is to tweak the flag's width so that there are no fractional columns. Instead of having 16.666px for each column, what if we round up to 17px? This means our flag will be 204px wide, rather than 200px.

Here's a little JS snippet we can use to calculate this width automatically:

```
const numOfColumns = 12;
const desiredWidth = 200;

const friendlyWidth =
  Math.round(desiredWidth / numOfColumns) * numOfColumns;

console.log(friendlyWidth); // 204
```

This will pick the closest value to the desired width, for the specified number of columns.

## [Link to this heading](#putting-it-all-together-10)Putting it all together

Here's the final implementation, using the techniques we've discussed:

Code Playground

import React from 'react';
import range from 'lodash.range';

import styles from './PrideFlag.module.css';
import { COLORS } from './constants';

function PrideFlag({
  variant = 'rainbow', 
  width = 200,
  numOfColumns = 10,
  staggeredDelay = 100,
  billow = 2,
}) {
  const colors = COLORS\[variant\];

  const friendlyWidth =
    Math.round(width / numOfColumns) \* numOfColumns;

  const firstColumnDelay = numOfColumns \* staggeredDelay \* -1;

  return (
    <div className\={styles.flag} style\={{ width: friendlyWidth }}\>
      {range(numOfColumns).map((index) \=> (
        <div
          key\={index}
          className\={styles.column}
          style\={{
            '--billow': index \* billow + 'px',
            background: generateGradientString(colors),
            animationDelay:
              firstColumnDelay + index \* staggeredDelay + 'ms',
          }}
        />
      ))}
    </div\>
  );
}

function generateGradientString(colors) {
  const numOfColors = colors.length;
  const segmentHeight = 100 / numOfColors;

  const gradientStops = colors.map((color, index) \=> {
    const from = index \* segmentHeight;
    const to = (index + 1) \* segmentHeight;

    return \`${color} ${from}% ${to}%\`;
  });

  return \`linear-gradient(to bottom, ${gradientStops.join(', ')})\`;
}

export default PrideFlag;

## [Link to this heading](#happy-pride-month-11)Happy Pride Month!

I'm so thrilled to get this blog post out — I've had this idea for _years_, but I wanted to ship it during Pride Month, and I kept remembering too late. 😅

I'm a cis gay man in my 30s, and I've gotten to see so many countries around the world become more accepting of who I am. Canada is one of [over 30 countries(opens in new tab)](https://www.pewresearch.org/religion/fact-sheet/gay-marriage-around-the-world/) to have legalized same-sex marriage. 25 years ago, it was illegal everywhere in the world!

It's been wonderful to see my sexual orientation become a normal part of society. At the same time, though, progress has been much slower for trans folks. It seems like a lot of hate has shifted from sexual orientation to gender identity.

Halli summarizes this well:

![](https://www.joshwcomeau.com/avatars/halli.jpeg)

Halli

@

iamharaldur

When gay men were fighting for their rights, one of the main talking points from bigots was that they were pedophiles looking for young boys. The same arguments are being dragged up now against trans people. It wasn’t true then and it isn’t true now.

10:04 PM · Jun 3, 2023

Trans folks are just trying to live their lives, and it's outrageous that they've become the new queer bogeyman. 😬

If you have any trans friends or family members, I hope you'll offer your unconditional support to them. I also hope you'll consider donating to queer charities (my go-to charity is [The Trevor Project(opens in new tab)](https://www.thetrevorproject.org/), a group that provides free 24/7 access to crisis counselors for LGBTQIA+ youth).

Thanks for reading! I hope you have an excellent Pride Month. 🏳️‍🌈🏳️‍⚧️

### Last updated on

May 6th, 2025