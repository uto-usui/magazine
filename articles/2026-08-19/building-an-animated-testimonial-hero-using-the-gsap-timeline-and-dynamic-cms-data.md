---
title: "Building an Animated Testimonial Hero Using the GSAP Timeline and Dynamic CMS Data"
source: "https://tympanus.net/codrops/2026/08/18/building-an-animated-testimonial-hero-using-the-gsap-timeline-and-dynamic-cms-data/"
publishedDate: "2026-08-18"
category: "design"
feedName: "Codrops"
author: "Jonas Arleth"
---

![Building an Animated Testimonial Hero in Webflow Using the GSAP Timeline and Dynamic CMS Data](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Animated-Testimonial-teaser.jpg.webp?x57826)

I wanted this section to feel hand-crafted, with a layout that has its own character, even though every part of it is driven by [Webflow](https://university.webflow.com/videos/intro-to-webflow-cms) CMS data.

It combines a slot-machine style counter, a manually arranged collage of member portraits, and a looping animation that continuously introduces new faces. Both the portraits and the counter are driven by CMS data, so the section updates automatically over time.

Getting all of that to work together turned out to be the interesting part. Webflow Collection Lists are designed to repeat the same layout for every item, while this design needs each portrait to have its own size and position.

I wanted to solve that while staying inside the Webflow Designer as much as possible. In this article I’ll walk through the three techniques that made it possible:

-   a configurable slot-machine counter
-   a manually arranged CMS-powered collage
-   a looping GSAP animation built in Webflow’s visual timeline

Final result

## Tech stack

-   **Webflow** for the layout and structure
-   **Webflow CMS** for the member data and counter value
-   **CSS container queries + cqw and em units** to scale the collage
-   **A small JavaScript helper** for the counter animation
-   **GSAP via Webflow’s visual timeline** for the looping animation

## Part 1: The counter

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part1-01-1200x675.jpg.webp?x57826)

The counter is the first thing you see when the section scrolls into view, so it had to feel good: a number that spins up like the reels of a slot machine. The number comes from a live CMS entry that updates every month based on my course sales. And since there’s already a lot going on in the layout, I wanted the counter to play first and everything else to follow, but more on that animation later.

I can’t write JavaScript myself, so for a piece like this I let AI code it for me, and I’ve really come to enjoy working that way. A few years ago I’d have searched for some snippet online and adapted it where I could. Now it’s quick, and exactly how I want it. The only part that was tricky was the easing. I wanted the last digits to slow down and settle really softly at the end, so it would fit the calm feel of the whole page, and that exact feel took a lot of back and forth. That’s why I now handle these things differently: instead of describing tweaks in words, I ask the AI to build me a small configurator. A few sliders I can tune myself, until the easing is right.

Those settings were my feedback to the AI: they told it exactly how to generate the JS. And since I need count-up animations like this in client projects all the time, I turned it into a free tool you can open and use yourself: configure it, export the JS, and set one attribute on a text element, the script finds the number automatically. [**Counter-Up Animation Generator →**](https://www.formburg.com/en/tools/counter-up-animation-generator)

### How the script works

I can read the code enough to follow it, but I can’t really tell whether the way it’s built is standard or whether there’s something clever worth sharing. So I asked the AI to point out what actually makes this script interesting, so I could pass the key ideas on to you. Here’s the short version.

**The core idea: don’t count, slide.** Instead of animating a value from 0 to its target, the script builds a vertical strip of digits for each place in the number:

-   each digit sits in a cell with `overflow: hidden`, exactly one line tall
-   inside the cell is a strip of stacked numbers (0, 1, 2 … 9, 0, 1 …), as many as the digit needs to spin, with the target digit at the very end
-   the strip slides up with `transform: translateY`, and since the cell crops everything but one digit, you see the numbers spin past until the target lands

No counting logic, just a cropped, moving strip:

```
const e = 1 - Math.pow(1 - p, easePow); // ease-out: the part that took the most tuning
c.strip.style.transform =
  'translateY(' + -(e * c.steps * dh.unit) + dh.css + ')';
```

Three smaller details are what actually made it feel right:

**Count the revolutions from the right, not spread across the number.** I wanted the left digit to lock in first and the right one to spin longest. If you spread the spins across the whole number, the jump from 952 to 1,000 re-sorts every place and the feel shifts. Counted from the right, the ones place always behaves the same, no matter how long the number gets:

```
const right = chars.slice(idx + 1).filter((c) => /\d/.test(c)).length;
const dist  = total - 1 - right;
const f     = dist / maxDist;
const revs  = Math.max(1, Math.round(revLeft + (revRight - revLeft) * f));
```

**Separate “how many spins” from “how long it takes.”** A pure ease-out starts at full speed, which feels hectic. Splitting the two (revolutions vs. duration) is what gave real control over the feel, and it’s the pair of sliders I spent the most time on:

```
const steps = revs * 10 + final;                                    // how far the digit travels
const myDur = Math.max(0.3, durRight - (maxDist - dist) * stagger); // how long it takes
```

**Read the real line-height, don’t hard-code `1em`.** My heading uses a tight `line-height: 0.9`, so a `1em` cell would be too tall and break the spacing below. The script reads the actual line height with `getComputedStyle` and moves the strip in that same unit:

```
const cs = getComputedStyle(el);
const lh = cs.lineHeight;
const px = lh === 'normal' ? parseFloat(cs.fontSize) * 1.2 : parseFloat(lh);
```

And finally the CMS binding: a tiny second script in the footer reads the real number and exposes it globally. The counter waits for that signal and for an `IntersectionObserver` to confirm it’s in view, so it runs exactly once, with the real number, at the right moment, which is what you see in the preview above.

## Part 2: An individual Webflow CMS collage grid

**The target layout**

![The finished collage: four portraits at four different sizes, offset around the counter, with the gradient shape behind them.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part2-01-1200x675.jpg.webp?x57826)

This is the part most people assume only works with custom code or some workaround, and it turned out to be a fun little challenge to solve.

Here’s where Webflow gets in the way. I have four portraits, at four different sizes, arranged like a collage, but they come from a CMS Collection List. Normally, if you want a manually-arranged grid, you would drop items into a CSS grid and give each one its own size and position. That works beautifully, but only outside of a collection list. A Webflow CMS Collection List currently doesn’t let you set items to individual positions.

By default, Webflow just outputs every item the same way: same size, same order, same repeated text underneath. But the design needs each portrait at its own size and position, and that’s the challenge.

![The default Webflow output: all four Collection List items the same size in a plain row, with the repeated label under every one.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part2-02-1200x675.jpg.webp?x57826)

The key realization was that I don’t need to reorder the items at all, I just need to **style each position**. In plain CSS you can target basically any item you want, which is really useful. Webflow only gives you four of these options directly in the Designer dropdown:

-   first child
-   last child
-   odd items
-   even items

I wanted to see how far I could get with just those four, without writing any custom CSS. It turned out to be enough.

![The Webflow style-selector dropdown open on the "Structure" section, with the four position options highlighted: First Item, Last Item, Odd Items, Even Items ("First Item" marked)](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part2-03-1200x675.jpg.webp?x57826)

So each position gets its own width, plus a vertical shift on two of them so the tiles don’t sit in a straight row:

```
/* base width for every item, then override per position, all in em */
.user_grid-item { width: 10em; }
.user_grid-item:first-child { width: 5em; margin-top: 10em; }
.user_grid-item:nth-child(even) { width: 8em; margin-top: 10em; }
.user_grid-item:last-child { width: 6em; }
```

![The finished collage with each portrait labelled by its selector](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part2-04-1200x675.jpg.webp?x57826)

You might have noticed in the default output earlier that Webflow adds the same name and role label under _every_ item, since the CMS repeats the content for each one. The same child selectors handle this too: with a small CSS embed I hide all the labels by default and only show one per collage, the third item’s label in the top collage and the second item’s label in the bottom one.

```
.user_grid-item-name { display: none; }
.user_grid-list .w-dyn-item:nth-child(3) .user_grid-item-name { display: block; }
```

### Working with em units to scale the layout

A lot of people who follow my tutorials notice that I work with `em` here and there, but haven’t really brought it into their own workflow yet. This layout is a great example of why it’s worth it.

The principle: if you keep every value inside the `user_grid-wrapper` in `em`, you can scale the whole layout up or down with just the wrapper’s font-size. Every item resizes with it, no extra work.

Here’s how it’s set up:

-   the wrapper gets `container-type: inline-size`, which you add as a custom property in Webflow, since it isn’t in the style panel to pick from. That makes the wrapper’s own width the reference for the `em` values inside it
-   its `font-size` is set to `1cqw`, one percent of that width
-   because `em` is relative to the font-size, `1em` now equals one percent of the wrapper width, so a 10em item is 10% of it, a 5em item is 5%, and so on
-   the `user_grid-wrapper` itself sits inside my page container, which has a max-width

```
.user_grid-wrapper {
  container-type: inline-size;
  font-size: 1cqw; /* 1% of the container width */
}
/* items in em then scale with the container automatically */
.user_grid-item { width: 10em; } /* = 10% of the container width */
```

All four CMS Collection items scale proportionally with it, together with the gradient shape behind them, which is exactly what you want for a graphic like this. Change the base font-size and the whole collage grows or shrinks as one piece.

This makes resizing the layout, especially for responsiveness, incredibly simple and fast. On mobile and tablet breakpoint I swap the `cqw` base for `vw`, and since the page container is already full width there, one `vw` behaves like one `cqw`. I set the collage to `2vw` so it was bigger right away, and the layout still worked out nicely.

## Part 3: A looping GSAP animation, built in Webflow’s timeline

For this animation I used Webflow’s new visual timeline. It lets you build real GSAP animations right in the Designer, without writing any of the GSAP code yourself.

Before animating anything, I think about the order things should come in. It’s a section in the middle of the page, so the animation needs an initial spark to catch the visitor’s attention, but it also shouldn’t happen all at once, because the layout has a lot of small details and most of them get lost if everything moves at the same time. So the counter spins up first, and as it slows down the rest follows. A big part of the work was finding the sweet spot in the timing: how long the counter runs and when the collage items start swapping, so the gaps don’t feel too long and the animation keeps the viewer’s attention. All the elements in this section fade in slightly staggered.

The mask shape gradients also scale in a little, which gives them some extra movement.

One thing worth doing: I play the timeline on enter, pause on leave, and resume on scroll back, so it isn’t running in the background the whole time and weighing on performance.

![The trigger settings in the Webflow GSAP timeline, where you set play on enter / pause on leave / resume on scroll back.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-01-1200x675.jpg.webp?x57826)

### The 3D member loop effect

The member loop is really the highlight of the whole animation. Since the section keeps filling with real new members over time, I wanted the faces to swap instead of just showing up once. And because they swap, I needed an animation both ways, one to bring a set in and one to send it out, which looks especially nice on the text as it staggers back out. The setup is simple: each Collection List sits in the section twice, and the second one is placed `position: absolute` right on top of the first. It skips ahead in the collection (skip four, skip eight) so it shows different faces, and then one list animates out while the other animates in.

The detail that makes it look premium is the 3D effect. A plain `rotateX` on its own looks flat: the card just tilts, but there’s no real depth to it. The fix is perspective, and the handy part is that you can set **perspective and origin directly in the GSAP action-step UI**, without setting up a 3D transform in the Webflow Designer first.

The settings I used for the incoming images:

-   **Rotate X**: -90° to 0°, the actual 3D flip
-   **Y**: 50% to 0%, so they move up into place
-   **Scale**: 0.7 to 1, growing to full size
-   **Opacity**: 0 to 100, fading in
-   **Perspective**: 1000, which is what gives the rotation real depth
-   **Stagger**: 0.08s offset, starting from item 4
-   **Ease**: Elastic (Out), for the bounce

The ease is a big part of the character here. I wanted a little bounce-back at the end, the kind of springy motion you see a lot in Apple’s iOS UI. It gives the swap a playful touch, and it works well with the calm gradients that just fade in softly. It’s something I plan to reuse across the page, and this section was a good place to see it work. The nice thing about Webflow’s GSAP timeline is that you pick the curve visually, with a built-in preview, so you can shape the elastic exactly how you want it.

![The ease picker in the Webflow GSAP timeline: Elastic selected, with the curve visualizer and the amplitude and period settings.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-09-1200x675.jpg.webp?x57826)

The text uses its own effect, split line by line so it staggers in and out:

-   **Move Y**: 110%, the lines slide up
-   **Opacity**: fading in
-   **Split text**: by line, with a line mask
-   **Stagger**: 0.035s offset, from the edges
-   **Ease**: Elastic (Out)

![The action-step UI for the text effect, with the split-text and mask settings, and the timeline below showing the parallel in/out tracks for images and names.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-05-1200x675.jpg.webp?x57826)

### Two more details from this stage:

**The set action.** Since the two Collection Lists sit on top of each other, I keep the second one at `opacity: 0` by default in the Webflow Designer, so both aren’t visible at once while I’m working and it stays out of my way. In the animation I then use a _set_ action to switch it to full opacity in an instant, right at the moment before it animates in, while the other one is out. It’s not a tween, just an immediate state change at the exact right time.

![The set action step in the timeline (target member_grid-2, opacity to 100), sitting right between the out and in tracks.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-06-1200x675.jpg.webp?x57826)

**Stagger from the outside in.** The whole layout is built around the center, with the collage spread out toward the edges, so the swap looks best when it runs from the outer edges inward rather than left to right. Because each list has exactly four items, I start the stagger from item four, so the images swap from the outside toward the counter in the middle.

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-07-1200x675.jpg.webp?x57826)](https://tympanus.net/codrops/codrops-part3-07/)

For the loop, my first instinct was to set the whole timeline to repeat infinitely, but that also reloops the one-time entrance fade-in, which I definitely didn’t want. The clean fix is to split it into two separate interactions: `user-hero-beginning` handles the entrance and plays once, and `user-hero-collection-loop` handles only the face-swap and repeats infinitely. The timing needs a hold between swaps, roughly four seconds, so the loop is really swap-out, swap-in, pause, repeat.

## Accessibility

For reduced motion, the 3D swap loop is too much, but the gentle fade-in when the section scrolls into view is fine. This is where splitting the animation into two paid off again: with the intro fade and the loop as separate interactions, I could keep the fade for everyone and turn off just the loop. Webflow’s conditional playback handles it, so visitors who prefer reduced motion see the section fade in once and then stay still, without the faces swapping.

![The interaction settings: Repeat set to Infinite for the loop, and the conditional playback rule that switches to "No animation" when a visitor prefers reduced motion.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/codrops-part3-08-1200x675.jpg.webp?x57826)

## See it live

The section is live [on my FORMBURG course page](https://www.formburg.com/en/product/webflow-gsap-masterclass).

## Credits

-   **Webflow build & animation:** [Jonas Arleth](https://www.youtube.com/@formburg), founder of FORMBURG
-   **Design:** [Oliver Gareis](https://www.olivergareis.com/)
-   **Tools:** Webflow, GSAP