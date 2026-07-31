---
title: "Building an Infinite GSAP Scroll Gallery with Parallax and Flip Transitions"
source: "https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/"
publishedDate: "2026-07-30"
category: "design"
feedName: "Codrops"
author: "Surya Aditya"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/infinitescrollGSAP.png.webp?x48895)](https://tympanus.net/Tutorials/InfiniteScrollGSAPGallery/ "Building an Infinite GSAP Scroll Gallery with Parallax and Flip Transitions Demo")

There are a lot of gallery layouts that keep showing up on websites, from portfolios to agency sites. In this tutorial, I’ll build a scattered image gallery that scrolls infinitely, with each image moving at its own speed to create a subtle floating effect. When you click an item, it scales out of the grid into a full detail view.

I’ll break this tutorial into three sections:

-   **Slider (Scroller):** Infinite scrolling driven by the mouse wheel and touch input, with per-item parallax.
-   **Reveal:** When an item enters the viewport, it fades in to avoid any snapping as images appear.
-   **Transition:** A morphing effect that expands a clicked item into the detail view.

In this tutorial, I only use GSAP and plain JavaScript. We use `Observer` for input, GSAP `Flip` for the transition morph, and `SplitText` for the text reveals.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/image-2026-07-30-at-13.11.49-1200x750.jpg.webp?x48895)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/image-2026-07-30-at-13.11.30-1200x750.jpg.webp?x48895)

## 1\. Templating

### HTML

To start we need to create the gallery:

```
<div class="gallery">
  <figure class="gallery__slide">
    <div class="gallery__img-wrapper">
      <img class="gallery__img" src="..." alt="Cliffs falling into a deep blue cove" />
    </div>
    <figcaption>Above the Cove</figcaption>
  </figure>
  <!-- ...more slides -->
</div>
```

Then the detail view lives in a separate overlay, hidden until something is clicked:

```
<div class="content">
  <div class="content-wrapper">

    <figure class="content__preview-img"><img alt="" /></figure>

    <div class="content__group-list">
      <button class="content__back" type="button">Back (Esc)</button>

      <div class="content__group" data-index="0">
        <div class="content__title">Above the Cove</div>
        <div class="content__description">...</div>
      </div>

      <!-- ...one group per slide -->
    </div>

  </div>
</div>
```

As shown above, there is one content group per slide, matched by its `data-index`. When we click a gallery item, it becomes the active item. The transition never builds any markup; it simply swaps which content group is visible and which image source the preview displays. The `<figure class="content__preview-img">` is the single element that every thumbnail eventually morphs into.

### Styling

Now the CSS, since we are hijacking the scroll we have to kill the native scroll and for sure we have to set up the scattered of each item

```
html, body {
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
}

.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12vh;
  padding-top: 14vh;
}

.gallery__slide {
  transform: translateX(var(--stagger, 0vw));
}

.gallery__slide:nth-child(1) { --stagger: -24vw; --img-w: 190px; }
.gallery__slide:nth-child(2) { --stagger:  14vw; --img-w: 260px; }
/* ...one line per slide */

.gallery__img-wrapper {
  width: var(--img-w, 200px);
  aspect-ratio: 0.8;
  overflow: hidden;
}
```

Each `gallery__slide` will have two custom properties: `--stagger` to which pushes the item from center, and `--img-w` just for the width. I keep it in CSS and not in JavaScript because later we rebuild the loop on resize, and that means wiping every JavaScript transform off these elements.  

## 2\. The Slider

As mentioned, this is the engine that owns the scroll position, and the other two modules react to it.

### Infinite Scroll

The trick is not to use the real browser scroll to manage the scrolling. Instead, I use a paused timeline in which every slide travels one full lap, then treat its playhead as the scroll position.

In the code we have `verticalLoop`, a helper that builds that timeline. It’s based on [GSAP’s `seamlessLoop` helper](https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop/), adapted here for a vertical layout.

For each item it creates two tweens: one that carries the item up until it has passed the top edge, and one that immediately re-enters it from the bottom of the gallery.

```
// Two tweens per item: exit top, then re-enter from the bottom
for (let i = 0; i < length; i++) {
  const item = items[i];

  // Current y offset in px
  const curY = (yPercents[i] / 100) * heights[i];

  // Distance to the container's top edge
  const distanceToStart = item.offsetTop + curY - startY;

  // Distance until fully off-screen top
  const distanceToLoop =
    distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");

  // Travel up until fully off-screen
  tl.to(
    item,
    {
      yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
      duration: distanceToLoop / pixelsPerSecond,
    },
    0,
  ).fromTo(
    // Then re-enter from the bottom end of the container
    item,
    {
      yPercent: snap(
        ((curY - distanceToLoop + totalHeight) / heights[i]) * 100,
      ),
    },
    {
      yPercent: yPercents[i],
      duration: (totalHeight - distanceToLoop) / pixelsPerSecond,
      immediateRender: false,
    },
    distanceToLoop / pixelsPerSecond,
  );
}
```

Some of you would probably understand that the positions are animated with `yPercent` and not `y` because it’s relative to the element’s own height, that way the values still hold up even when elements aren’t all the same size. But we use the `y` property for the parallax effect.

There is also `immediateRender: false` on the `fromTo` is to stops GSAP from applying that “start at the bottom” value the moment the tween is created. Without it, every item would jump to the bottom of the gallery on the first frame.

The final line of the helper does the same job for the timeline as a whole:

```
// Pre-render every tween to avoid a first-frame jump
tl.progress(1, true).progress(0, true);
```

Scrubbing to the end and back forces every tween to render once, so no tween is caught initialising on the first real frame.

The duration is derived from distance, so speed stays constant across items of different heights:

```
// Travel speed: speed 1 = 100px per second
const pixelsPerSecond = (config.speed || 1) * 100;
```

So `duration: distanceToLoop / pixelsPerSecond`, confused about this calculation? Our timeline is `paused: true` and we never play it, we only set the playhead by hand. This line gives us an exchange rate: **one second of playhead time equals 100px of movement.** Seconds are just the unit GSAP uses to measure timelines.

The division itself is plain `time = distance / speed`. An item that has to travel 400px gets a duration of `4`, an item that has to travel 800px gets `8`. That is the point of it: every slide moves at the same rate no matter how tall it is. If we picked durations by hand, slides of different sizes would drift apart straight away.

Across twelve slides our gallery is around 5,200px, so `loop.duration()` ends up near `52`. A fifty-two second lap nobody ever waits through.

Why `100` and not another number? Because it makes the gallery follow the wheel one to one. We will see the other half of this in the slider’s `scroll()` method later, where we divide the scrolled pixels by the same `100`. Scroll 300px, the playhead moves `3`, the gallery moves 300px.

Keep in mind those two `100`s are really one number living in two files. `config.speed` looks like a knob you can turn, but if you pass `speed: 2` the gallery becomes 200px per playhead second while `scroll()` still divides by 100, so a 300px scroll would move the gallery 600px. You would have doubled the sensitivity, not the speed.

### Making it endless

The timeline loops, but the playhead can still fall outside `0` to the max. `gsap.utils.wrap` folds any out-of-range value back in:

```
/** Build vertical loop from the gallery slides */
createLoop() {
  const gallery = document.querySelector(".gallery");

  // The gap between slides doubles as the loop's bottom padding
  const gap = parseFloat(getComputedStyle(gallery).rowGap);

  // A paused one lap timeline; its playhead is our scroll position
  this.loop = verticalLoop(".gallery__slide", {
    repeat: -1,
    paused: true,
    paddingBottom: gap,
  });

  // Wrapping the playhead past either end is what makes it endless
  this.wrap = gsap.utils.wrap(0, this.loop.duration());
}
```

`this.wrap(-3)` on a 52 second loop gives back `49`. So our playhead value can go anywhere, positive or negative or thousands, and we always hand the timeline a legal time.

About the `paddingBottom: gap`, we pass it `rowGap` so it reads `12vh` from the CSS. But inside the helper, `totalHeight` is built from `offsetTop`, which is measured from the page and not from the gallery’s content box. That means the gallery’s own `padding-top: 14vh` is already inside the number before `paddingBottom` gets added.

So the empty space at the seam, where the last slide leaves and the first one comes back around, is that `14vh + 12vh = 26vh`. Everywhere else the slides sit 12vh apart, so that one join is more than twice as roomy.

I left it that way. Scroll a full lap and you can feel it, a slightly longer pause right before the sequence starts over, which is exactly the moment you would otherwise catch it repeating.

### Scrub Proxy

Now the part that gives the gallery its feel. Instead of setting `loop.time()` from the wheel delta directly, we animate a plain object toward the target and let GSAP’s easing smooth it:

```
/** Create the eased playhead that smooths scroll input into loop time */
createScrub() {
  // Proxy object standing in for the scroll position
  this.playhead = { time: 0 };

  // Eases the playhead toward the latest scroll target
  this.scrub = gsap.to(this.playhead, {
    time: 0,
    duration: 0.75,
    ease: "power3.out",
    paused: true,
    onUpdate: () => {
      this.loop.time(this.wrap(this.playhead.time));
      this.applyParallax();
    },
  });
}
```

In this code we get the inertia, interruption handling, and a single render callback without writing a lerp loop or running our own `requestAnimationFrame`.

Driving it is just as small:

```
/** Move the scrub target by the scrolled distance */
scroll({ deltaX, deltaY }) {
  if (!this.enabled()) return;

  // Swipes (x or y) all drive the gallery
  const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

  // Slides travel 100px per playhead second, so px / 100 gives time
  this.scrub.vars.time += delta / 100;
  this.scrub.invalidate().restart();
}
```

A GSAP tween records its start values the first time it renders, and `invalidate()` throws those away so the tween reads `playhead.time` again as its new start. Then `restart()` replays the 0.75s ease from wherever the playhead is now toward the new target. Scroll quickly and every gesture retargets a tween that is already moving, which is exactly the momentum we want.

About the `delta/100`, the gallery covers 100px per playhead second so dividing scrolled pixels by 100 turns them into playhead time, and the gallery moves as far as you scrolled.

### Input via Observer

I use `Observer` because it’s normalises wheel, touch and pointer events into one API:

```
/** Listen for wheel and touch input */
createObserver() {
  this.observer = Observer.create({
    target: window,
    type: "wheel,touch",
    preventDefault: true,
    onChange: (self) => {
      this.scroll(self);
    },
  });
}
```

`preventDefault: true` is what makes the CSS from Part 0 stick. `overflow: hidden` stops the document from scrolling, but the browser still fires wheel and touch events with its own default behavior attached, like pull to refresh, rubber banding or back swipe. Cancelling them here means the gesture reaches our scrub and nothing else.

### Parallax without seams

Each slide gets a speed multiplier, cycled from a small array:

```
/** Give each slide its own travel speed for a sense of depth */
createParallax() {
  // Speed multipliers: > 1 faster, < 1 slower
  const speeds = [1.3, 0.8, 1.15, 0.7, 1.25, 0.85];

  this.parallax = gsap.utils.toArray(".gallery__slide").map((slide, i) => ({
    el: slide,
    factor: speeds[i % speeds.length] - 1,
    offset: 0,
    visible: false,
  }));

  // Scatter the resting positions too
  this.applyParallax();
}
```

I store `speed - 1` instead of `speed` on purpose, that way the factor becomes how much extra to move on top of what the loop already does. A factor of `0` just means it moves exactly with the loop, so the offsets stay small.

The values alternate fast and slow instead of ramping up, so no two slides next to each other drift in sync. One thing worth knowing: `i % speeds.length` repeats every six slides, so slide 1 and slide 7 end up moving identically. That’s fine here since they sit about 2,500px apart and are never on screen at the same time, but it would show up if your slides got smaller or your viewport got taller. If you want zero repeats in one lap, just make the array as long as your slide count.

Now the part that took me a few tries. The obvious approach, offsetting each slide by `progress * factor`, gives you a visible jump every time a slide wraps, because the offset is largest right when the item teleports from top to bottom. So whatever we do, the offset has to be zero at the exact moment a slide wraps:

```
/** Offset each slide by its speed factor, report viewport enters/leaves */
applyParallax(immediate = false) {
  const changes = [];

  this.parallax.forEach((item) => {
    const rect = item.el.getBoundingClientRect();

    // The slide's position without our offset
    const loopTop = rect.top - item.offset;

    // Offset by the speed factor; zero at the wrap point
    item.offset = item.factor * (loopTop + rect.height);
    gsap.set(item.el, { y: item.offset });

    // Check visibility from the final position
    const top = loopTop + item.offset;
    const visible = top < window.innerHeight && top + rect.height > 0;

    // Collect the slides that entered or left
    if (visible !== item.visible) {
      item.visible = visible;
      changes.push({ el: item.el, visible, top });
    }
  });

  if (changes.length) this.onToggle?.(changes, immediate);
}
```

`loopTop + rect.height` is the distance from the top of the viewport down to the bottom edge of the slide. That value hits zero exactly when the slide has cleared the top of the screen, which is where the loop wraps it. Multiply by the factor and the extra offset fades to nothing right at the seam, so the wrap becomes invisible.

Subtracting the previous frame’s `item.offset` from `rect.top` is what keeps this stable. `getBoundingClientRect()` reports the position including the offset we set last frame, so we undo it to get back the pure loop position before working out the new one. Without that, the offset compounds and the slides fly off screen in about a second. Then the loop writes `yPercent`, the parallax writes `y`, and GSAP composes both into the same transform.

The second half of the method is a free ride. We are already measuring every rectangle each frame, so detecting viewport entries and exits costs two comparisons. Note that it tests `top`, the position after the parallax offset, which is where the slide really is on screen.

Instead of acting on that itself, the slider just reports it: `this.onToggle?.(changes, immediate)` is the whole interface between the slider and the reveal. One callback, one array of `{ el, visible, top }`. The optional chaining means the slider still works fine with no reveal attached.

## 3\. Reveal

The reveal is pretty simple. When a slide enters the viewport, fade it in. When it leaves, reset it so the animation can play again next time. On an infinite loop, “next time” happens a lot, so resetting properly is not optional.

```
constructor() {
  // Reveal targets per slide
  this.items = new Map();

  gsap.utils.toArray(".gallery__slide").forEach((slide) => {
    const wrapper = slide.querySelector(".gallery__img-wrapper");

    // Split the caption into characters
    const chars = new SplitText(slide.querySelector("span"), {
      type: "chars",
    }).chars;

    // Resting state: image and caption invisible
    gsap.set(wrapper, { autoAlpha: 0 });
    gsap.set(chars, { autoAlpha: 0 });

    this.items.set(slide, { wrapper, chars });
  });
}
```

A `Map` keyed by the slide element gives us O(1) lookup later without storing state on the DOM node.

Oh, `autoAlpha` is GSAP shorthand for opacity plus visibility. It tweens opacity and sets `visibility: hidden` the moment opacity reaches zero, then back to `inherit` as soon as it leaves. One property doing the work of two, and the browser skips painting anything fully transparent, which on an infinite loop is most of the gallery most of the time.

Handling a batch of changes is where the choreography lives:

```
/** Show slides that entered, top to bottom, reset the ones that left */
toggle(changes, immediate = false) {
  changes
    .filter((change) => change.visible)
    .sort((a, b) => a.top - b.top)
    .forEach((change, i) => this.show(change.el, i * 0.12, immediate));

  changes
    .filter((change) => !change.visible)
    .forEach((change) => this.hide(change.el));
}
```

Sorting by `top` before staggering is the small detail that makes this feel deliberate. The slider reports changes in DOM order, but on an infinite loop, DOM order has nothing to do with screen order. The slide at the top of the viewport might be the ninth in the markup. Sorting by real screen position means the stagger always cascades downward, whichever way you scroll.

The reveal itself is two tweens, the image and then the caption a beat behind:

```
/** Fade the image in, then fade the caption in character by character */
show(slide, delay, immediate = false) {
  const { wrapper, chars } = this.items.get(slide);

  // The viewport moved around the slide, so there is no entrance to play
  if (immediate) {
    gsap.set([wrapper, ...chars], { autoAlpha: 1, overwrite: true });
    return;
  }

  gsap.to(wrapper, {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out",
    delay,
    overwrite: true,
  });

  gsap.to(chars, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "none",
    stagger: 0.025,
    delay: delay + 0.2,
    overwrite: true,
  });
}
```

Scroll fast and a slide can leave and come back before its fade-in finishes, stacking competing tweens on the same target and causing flicker. `overwrite: true` kills every other tween on the same targets the moment a new one starts, regardless of which properties they touch. That’s stronger than the usual `"auto"`, which only overwrites tweens touching the same properties. It’s fine here, since these are the only tweens that ever touch these elements.

Hiding is instant, for the same reason:

```
/** Reset instantly so the reveal replays on the next entry */
hide(slide) {
  const { wrapper, chars } = this.items.get(slide);

  gsap.set(wrapper, { autoAlpha: 0, overwrite: true });
  gsap.set(chars, { autoAlpha: 0, overwrite: true });
}
```

Off-screen elements don’t need an exit animation, because nobody can see them anyway. They just need to be reset cleanly and immediately so the next entry starts from a known state.

## 4\. Transition

The idea behind the transition is to have it morph into the position and size of the popup without looking like a transition. It records the current state, and even when we change the DOM or CSS, GSAP’s `Flip` handles it, animating from the recorded state to the new one by comparing the two snapshots and generating the transforms automatically.

But there’s a tricky part here. The thing being animated is not the thing we recorded. The thumbnail stays in the gallery, and a separate full-screen `figure` is what ends up visible. `Flip` handles that with matching IDs:

```
// The preview's Flip identity
this.preview.dataset.flipId = "preview";
```

```
wrapper.dataset.flipId = "preview";

// Capture the thumbnail's bounds before the layout changes
const state = Flip.getState(wrapper);
```

Two different elements sharing one `data-flip-id`. Flip sees the ID move from one element to another and animates the second one out of the first one’s recorded bounds.

This only works because exactly one thumbnail claims the ID at a time. That’s why we assign it on open and delete it on reset instead of putting it in the markup, twelve thumbnails all carrying `flipId: "preview"` would leave Flip no way to know which one we meant.

### Opening

```
/** Animate to preview */
async open(slide, index) {
  if (this.state !== "closed") return;
  this.state = "opening";
  this.activeSlide = slide;

  await this.fillContent(slide, index);

  // A close() landing while the preview decoded has already reset us
  if (this.state !== "opening") return;

  const { wrapper, caption, others } = this.parts();
  wrapper.dataset.flipId = "preview";

  // Capture the thumbnail's bounds before the layout changes
  const state = Flip.getState(wrapper);

  // Show the detail layout and hide the thumbnail, killing its reveal tween
  gsap.set(this.content, { display: "block" });
  gsap.killTweensOf(wrapper);
  gsap.set(wrapper, { autoAlpha: 0 });
  // ...
}
```

There are two ordering rules hiding in those lines.

The first one is strict: `wrapper.dataset.flipId = "preview"` has to be set **before** `Flip.getState(wrapper)`. The state object records each element’s Flip ID at capture time, and Flip auto-generates one for any element that doesn’t have it yet. Set the ID after and your snapshot carries a generated ID that matches nothing, `Flip.from` finds no partner, and you get a silent no-op. Nothing errors, the animation just doesn’t happen, which is the hardest kind of Flip bug to find.

The second is the general Flip rule: snapshot first, mutate second, animate third. In this demo the two `gsap.set` calls after it are harmless because `.content` is `position: fixed`, so showing it can’t move the gallery. But keeping the capture at the top is still the right habit.

`gsap.killTweensOf(wrapper)` handles a real edge case. You can click a slide while its own reveal fade is still running. Without killing that tween first it keeps animating `autoAlpha` back to 1 on an element we just hid, and the thumbnail ghosts through under the preview.

Then the timeline:

```
this.tl = gsap
  .timeline({
    onComplete: () => (this.state = "open"),

    // Fires when a cancelled open finishes rewinding
    onReverseComplete: () => this.reset(),
  })

  // Fade out the other slides and the caption
  .to(others, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0)
  .to(caption, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 0)

  // Morph the selected image
  .add(
    Flip.from(state, {
      targets: this.preview,
      duration: 1.2,
      ease: "power4.inOut",
      absolute: true,
    }),
    0,
  )
  .to(
    this.previewImg,
    { scale: 1, duration: 1.2, ease: "power4.inOut" },
    0,
  );
```

Every tween sits at position `0` so the whole thing reads as one gesture instead of a sequence of steps. `power4.inOut` gives the morph a heavy curve that suits an image the size of the viewport, and the fades use a gentler `power2.out` so they don’t pull attention away from it.

`absolute: true` tells Flip to position the element absolutely while it animates. Without it, a morph that changes an element’s layout position can push its siblings around mid-flight.

That last tween does more than it looks. Both the thumbnail image and the preview image sit at `transform: scale(1.2)` inside an `overflow: hidden` wrapper, so a sixth of each dimension is always cropped away. Animating the inner image to `scale: 1` while the wrapper grows means the frame and its contents move at different rates, and the image looks like it settles back into itself as the frame expands. It’s the same idea as the parallax, just inside one element.

### The text

The detail text fades in per character, per line:

```
// Split the text into lines and characters
this.split = new SplitText(".content__back, .content__group.active > *", {
  type: "lines,chars",
  charsClass: "char",
});

// ...the timeline shown above...

// Fade the text in character by character, one line after another
this.split.lines.forEach((line, i) => {
  this.tl.fromTo(
    line.querySelectorAll(".char"),
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.01,
    },
    // Preview delay + line index * stagger delay
    0.8 + i * 0.06,
  );
});
```

Splitting into `lines,chars` gives two levels to work with. The characters get a tight 0.01s stagger so a line appears almost as one piece, and the lines are offset by 0.06s so the paragraph builds downward.

The `0.8` start puts the text about two thirds through the 1.2s morph. Start at zero and the screen feels busy, wait for the morph to finish and the whole thing feels slow. Overlapping is what makes it read as one continuous move.

Creating the split after `display: block` matters, SplitText needs the element rendered to know where lines actually break.

### Closing

Closing is not just the opening timeline reversed, because what we need is different. The preview is already a positioned element with known bounds, so there is nothing to record, and `Flip.fit()` takes element A and animates it into element B’s current position:

```
this.tl = gsap
  .timeline({ onComplete: () => this.reset() })
  // Fade the text out line by line
  .to(
    this.split.lines,
    { autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: "power1.out" },
    0,
  )

  // Morph the preview back into the thumbnail's bounds
  .add(
    Flip.fit(this.preview, wrapper, {
      duration: 1,
      ease: "power3.inOut",
      absolute: true,
    }),
    0,
  )
  .to(this.previewImg, { scale: 1.2, duration: 1, ease: "power3.inOut" }, 0)

  // Fade the other slides and caption back in
  .to(others, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.5)
  .to(caption, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0.6);
```

The close is faster than the open, 1s against 1.2s, and it fades whole lines instead of individual characters. Getting out of the way should always be quicker than arriving. The other slides come back at `0.5`, halfway through the morph, because bringing them in at `0` makes the screen crowded while the preview is still big.

### Four states, one guard

People click things twice. They hit Escape mid-animation. They click a second slide while the first is still opening. A boolean can’t describe any of that, so the transition tracks four states:

```
// Transition state = closed | opening | open | closing
this.state = "closed";
```

`open()` refuses to start unless the state is `closed`, and `close()` reads the state and picks a strategy:

```
/** Animate the preview back into its slide */
close() {
  // Close mid-animation
  if (this.state === "opening") {
    this.state = "closing";
    // Still waiting on the decode, so there is no timeline to rewind
    if (!this.tl) {
      this.reset();
      return;
    }

    this.tl.reverse();
    return;
  }

  if (this.state !== "open") return;
  this.state = "closing";

  // ...build the close timeline
}
```

Pressing Escape mid-open rewinds the opening timeline instead of building a close timeline against bounds that are still moving. That’s why the open timeline carries `onReverseComplete: () => this.reset()`, a cancelled open has to clean up exactly like a finished close.

`reset()` puts the DOM back:

```
/** Restore the DOM */
reset() {
  const { wrapper } = this.parts();

  // The thumbnail only carries the Flip id while its slide is expanded
  delete wrapper.dataset.flipId;

  // Revert split
  this.split?.revert();
  this.split = null;

  // Hide the overlay and clear style the animations left
  gsap.set(this.content, { display: "none" });
  gsap.set(this.preview, { clearProps: "all" });
  gsap.set(this.previewImg, { clearProps: "all" });
  gsap.set(wrapper, { clearProps: "all" });

  this.activeSlide = null;
  this.tl = null;
  this.state = "closed";

  this.onClose?.();
}
```

`split.revert()` restores the original text nodes, which matters both for the next open and for screen readers and text selection, neither of which enjoys a paragraph shredded into one `<div>` per character. `clearProps: "all"` removes every inline style the animations wrote, so the next open starts from CSS and not from leftovers.

## How it works

The three modules talk to each other through two small contracts in `index.js`:

```
// Infinite scroll-driven slider; reports viewport enters/leaves to the reveal
const slider = new Slider({
  enabled: () => transition.state === "closed",
  onToggle: (changes, immediate) => reveal.toggle(changes, immediate),
});

// ...

slides.forEach((slide, index) => {
  // Only give up the gallery if the transition is going to hand it back
  const open = () => {
    if (transition.state !== "closed") return;

    slider.stop();
    transition.open(slide, index);
  };

  slide.addEventListener("click", open);
});
```

`enabled` is a function and not a boolean, so it gets evaluated on every scroll event and always reflects the current state. Scrolling while the preview is open does nothing.

`slider.stop()` does two things, and it is worth seeing them apart:

```
/** Freeze the inertia in place so a transition can take over */
freeze() {
  this.scrub.pause();

  // Sync the target to where we stopped, so the next scroll ramps from here
  this.scrub.vars.time = this.playhead.time;
  this.scrub.invalidate();
}

/** Hand the gallery over to a transition */
stop() {
  this.observer.disable();

  this.freeze();
}

/** Take the gallery back once a transition has finished with it */
start() {
  this.observer.enable();
}
```

Pausing on its own would leave the scrub’s target somewhere ahead of where the gallery actually stopped, and the next scroll after closing the preview would jump forward to catch up with it. Syncing the target to the real position means scrolling picks up exactly where it left off.

A note on the `immediate` flag threading through `applyParallax`, `toggle` and `show`. On a resize the loop gets rebuilt and every slide is re-measured, so slides that were already on screen come back reported as fresh entries and the reveal replays its whole fade-in. The flag says: nothing entered the viewport, the viewport moved around it, so snap to the end state instead of animating.

Same story with `freeze()` and `stop()`. Both pause the scrub, but `stop()` also disables the Observer and `start()` turns it back on when the transition resets. I only found that one by breaking it: with the Observer still listening during the preview, `preventDefault: true` keeps swallowing wheel events even though `enabled()` makes `scroll()` return early, so the detail view could not scroll either.

The guard in the click handler came out of the same hunt. `slider.stop()` used to run before `transition.open()` had decided whether it would accept, and `open()` bails if the state is not closed. Click a second slide mid-animation and the Observer went off with nothing left to turn it back on, so the gallery just died. Checking the state first means we only hand over when something is there to hand back.

And `open()` is async now because the preview image has never held that src, so it has no decoded frame and paints blank for the first frames of the morph. Awaiting `previewImg.decode()` fixes that, but it opens a window where a close can land before the timeline exists, which is what the extra guards in `open()` and `close()` are for.

## Refinements

Two things that apply to all three modules rather than any one of them.

**Performance.** The per-frame work is one `getBoundingClientRect()` and one `gsap.set()` per slide. `applyParallax` interleaves those reads and writes, which is the classic layout thrashing pattern, so twelve slides means twelve forced reflows a frame. Fine at this size, not fine at eighty. If you scale it up, measure everything into an array first, then write from that array.

Otherwise the gallery only animates `transform` and `opacity`. The one exception is the Flip morph, which animates width and height because `scale: false` is the default. That does trigger layout, but it keeps the image crisp instead of stretching a bitmap, and it runs for 1.2 seconds on a single element. Worth it.

**Structure.** Each module owns one thing. The slider exposes `stop()`, `start()` and `freeze()`, the reveal exposes `toggle()`, the transition exposes `open()`, `close()` and a readable `state`. None of them import each other, all the wiring is in `index.js`. Delete the transition and you still have an infinite parallax gallery. Delete the reveal and the slider never notices.

## Accessibility

A gallery that hijacks the wheel needs care here, so let me be straight about what the demo does and where it stops.

Every slide gets `tabindex="0"` and `role="button"` in `index.js`, and listens for Enter and Space as well as click, because native buttons respond to both. Escape closes the preview, and the button is labelled “Back (Esc)” so the shortcut is discoverable. Every gallery image has a real alt, and `fillContent()` copies it onto the preview so the description follows the photo into the detail view.

Two things it does not do. There is no keyboard scrolling, because Observer only listens for wheel and touch and there is no native scroll to fall back on, so arrow keys do nothing and tabbing to a slide further down focuses something you cannot see. And there is no reduced motion handling, which a 1.2 second full-screen morph and a gallery with momentum both deserve.

Neither is hard. Route key events into the same `scroll()` method the Observer feeds, and use `gsap.matchMedia()` to shorten the scrub, flatten the parallax factors and compress the timeline with `timeScale`. I left them out so every line here is code you can actually read in the repo, but I would add both before shipping this.

## Wrap-Up

Three effects, three modules, and most of the interesting work sitting in the seams between them. The slider turns a paused timeline into a scroll position and anchors its parallax to the wrap point so the seam stays invisible. The reveal orders entries by screen position, and because the slider reports its first batch during setup, the intro and the scroll reveal are the same code. The transition moves a photo between a thumbnail and a full-screen preview with `Flip.from` and `Flip.fit`, guarded by four states so impatient clicking cannot break it.

The smallest knobs are the most fun to turn. Change the `speeds` array and the whole sense of depth changes. Swap `power4.inOut` for `expo.inOut` and the morph goes from deliberate to sudden. Move the `0.8` text offset by a tenth of a second and watch how differently the detail view lands.