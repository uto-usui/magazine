---
title: "Multi-Column Different-Speed Scrolling"
source: "https://blog.master.dev/multi-column-different-speed-scrolling/"
publishedDate: "2026-11-03"
category: "css"
feedName: "Frontend Masters Blog"
author: "Chris Coyier"
---

I got this idea stuck in my head that if you’re scrolling through a “gallery”, it sorta doesn’t matter _how_ the things scroll past you. It could scroll horizontally; things could scroll at different rates; it could scroll backward somehow — whatever. It doesn’t matter because you’re just _exploring_. Scrolling is just the mechanism for seeing new stuff. There should still be a scrollbar, so the affordance of “how much is there left” is still there, but otherwise fairly free rein?

## Different “Rates” of Scrolling

My first idea was to make two columns of photos scroll at different rates. The first column would scroll at the regular rate. The page moves down as you scroll, revealing new photos as it goes. The 2nd column moves _faster._

We’re not going to mess with scrolling directly; it’s just going to be an illusion. The trick is to apply a directional `transform` that changes in value as we scroll.

### Two Columns

First we’ll need some columns to apply things to, so let’s set up a quick 2-column grid:

`.photo-gallery {   display: grid;   grid-template-columns: repeat(2, minmax(150px, 1fr));   align-items: start;   gap: 1.5rem; }`Code language: CSS (css)

Now we can set two columns in there:

`<div class="photo-gallery">   <div class="photo-column-left">     <img ... />     <img ... />     ...   </div>   <div class="photo-column-right">     <img ... />     <img ... />     ...   </div> </div>`Code language: HTML, XML (xml)

We can always abort on the two-column layout at a breakpoint like:

`.photo-gallery {     ...    @media (--small) {     grid-template-columns: 1fr;     gap: 16px;   } }`Code language: CSS (css)

Wait, is that a custom property as a media query!? Heck yeah. LightningCSS can process that down as “future CSS”. We set it with `@custom-media` like the [cool future](https://blog.master.dev/useful-custom-media-presets/):

`@custom-media --small (width <= 500px);`Code language: CSS (css)

### Scrolling The Right Extra Fast

As I mentioned, we’re going to scroll one of the columns (let’s make it the right one) at a different rate than the other (let’s make it faster). The trick is the directional transform we apply as we scroll, so we’re going to take advantage of Scroll-Driven Animations here, of the `scroll()` variety (we’ll play with `view()` style later). The `scroll()` variety of Scroll-Driven Animations is the more basic kind where we essentially get a number we can use to determine how far the element is currently scrolled.

`.photo-column-right {   /* a little offset just for funzies */   padding-top: 80px;    @supports (animation-timeline: scroll()) {     @media (not (--small)) {       animation-name: drift-up;       animation-timing-function: linear;       animation-fill-mode: both;       animation-timeline: scroll(root block); /* the whole page */       animation-range: 0% 100%;     }   } }`Code language: CSS (css)

Note the `@supports` query there. Not all browsers support Scroll-Driven Animations. Which is fine anyway, this is just a bit of progressive-enhancement fun, not crucial functionality.

Now we’ve got a `@keyframes` animation being called which we can define like this to make the magic happen:

`@keyframes drift-up {   from {     transform: translateY(12vh);   }   to {     transform: translateY(-20vh);   } }`Code language: CSS (css)

Those are a bit magic-numbery: just kinda arbitrary numbers that feel right for the situation. Depending on how much extra movement there is, you might consider a `prefers-reduced-motion` query as well.

### Bonus Zoomies

Just for poops and giggles, we can use a `view()` style Scroll-Driven Animation on each photo. So during any individual photo’s journey across the page, it’s zooming and moving a bit (but keeping its original shape.

`.photo {   overflow: clip;    & > img {     display: block;     width: 100%;     height: auto;     object-fit: cover;   }    @supports (animation-timeline: view()) {     & > img {       animation-name: image-drift;       animation-timing-function: linear;       animation-fill-mode: both;       animation-timeline: view(block);       animation-range: cover 0% cover 100%;     }   } }`Code language: CSS (css)

Now we have this `image-drift` keyframes animation; we can do whatever we want in.

`@keyframes image-drift {   from {     scale: 1.5;     translate: 0 -60px;   }   to {     scale: 1;     translate: 0 0;   } }`Code language: CSS (css)

### Demo

Which gives us this!

Feels satisfying to pull off exactly what I had in mind. And no JavaScript to boot.

Annnnd the photos can open up as a `popover` because why not, that’s yet another cool feature of the web platform these days.

## Reverse Scrolling

Another idea I wanted to see is if we could literally _reverse_ the scrolling of the right columns instead of just making it scroll faster. Essentially, the photos would extend upward (but stay hidden) and then come down, even as the scroll direction is down. Kinda weird, but whatever.

Of course, as I write this and play with ideas, I notice [Codrops did something just like it](https://tympanus.net/Development/ColumnScroll/) 5 years ago. Whattyagonnado? Theirs is JavaScript-based though, so this is a different breed.

### Approach

The basic core is the same, we animate a `translateY` property on the column as the page scrolls. But just to get it feeling right, it’s a little more tricky. Like we wanna pull up that right column, but not so far that you can’t see any photos to begin with, so it’s pulled up only as far as it needs to be so that the “last” image is touching the bottom at any height viewport, then animated from there.

The whole column then gets sticky positioning to make sure it scrolls evenly even with the arbitrary header above it. That then kinda screws with the `view()` animations, so the “image drifting” is restored by using the scroll position and calculating each images scale and transforms individually. It’s _way_ more finicky, but it was fun to do.

### Demo

## Other Fun Ones!

I just randomly saw on CodePen a couple of other photo gallery implementations with scrolling that are much fancier still!