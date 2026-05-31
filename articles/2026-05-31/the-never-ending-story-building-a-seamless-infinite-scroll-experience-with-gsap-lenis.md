---
title: "The Never Ending Story: Building a Seamless Infinite Scroll Experience with GSAP & Lenis"
source: "https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/"
publishedDate: "2026-05-28"
category: "design"
feedName: "Codrops"
author: "Joe Ben Taylor"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/InfiniteScrollParallax.webp?x42294)](https://tympanus.net/Tutorials/InfiniteScrollParallax/ "The Never Ending Story: Building a Seamless Infinite Scroll Experience with GSAP & Lenis Demo")

**Most digital experiences end when you stop scrolling.  
This one rewards you for not stopping.**

In this tutorial, we’re breaking down a small but mighty scroll interaction built around infinite looping, parallax depth, and snap-based control. Not from a “look at this cool effect” angle, but from the decisions that make it feel smooth, intentional, and strangely addictive.

The original version was created for a client project for Jillian Phyllis. The brief was simple: create something lightweight, fast, and MVP-friendly.

Which, as we all know, is usually where the danger starts.

Simple can easily become empty. Minimal can easily become forgettable. So the goal wasn’t to add more, it was to make less feel like more.

**The answer was motion.**

A seamless loop removes the hard stop at the bottom of the page. Parallax introduces depth between sections. Snap control gives the experience rhythm, so the user isn’t just flinging through content like a shopping trolley with one broken wheel.

Under the hood, everything is powered by Lenis and GSAP. The original project used Next.js, TypeScript, and Styled Components, but for this tutorial we’re stripping it back to plain HTML, CSS, and JavaScript.

**No framework dependency.**  
**No unnecessary ceremony.**  
_**Just the interaction, the architecture, and the logic behind it.**_

For this build, three things matter:

1.  True infinite looping without visible seams
2.  Parallax motion that adds depth, not decoration
3.  Snap-based scroll control that feels deliberate

From this point on, we’ll walk through the implementation step by step.

Clear code. Small snippets. No magic tricks.

Well, maybe one or two.

## Architecture Overview

Before writing any animation code, it helps to understand the shape of the system.

We are creating a continuous scroll experience, but the trick is that the page itself should never feel like it resets. _The loop needs to happen invisibly._

The core idea is simple:

-   Create fullscreen sections
-   Duplicate the first section at the end
-   Enable infinite scrolling in Lenis
-   Snap to each section
-   Animate the media inside each section with GSAP ScrollTrigger

That gives us the foundation: the user sees a smooth, continuous page.

The browser sees a carefully staged loop wearing a very good disguise.

## Initial Setup

When I first built this for [LinkedIn](https://www.linkedin.com/posts/joebentaylor_nextjs-gsap-react-ugcPost-7417380512228343808-RyHU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAyOJowBnnumcTo7JLAWVBOsY1ThBpTD9H0), I used my usual stack: Next.js, TypeScript, and Styled Components.

For this tutorial, we’re doing the complete opposite.

For this tutorial, we’re stripping it back to plain HTML, CSS, and JavaScript and powering it with Lenis and GSAP.

**Your tools, your rules. I’ll guide the structure.**

### HTML

We start with a few fullscreen sections. Three is the sweet spot:

-   2 feels empty
-   3+ feels intentional

Each section contains media. Images, video, canvas, WebGL, take your pick.

The important part is this:

**We duplicate the first section and place it at the end.**

This is what allows Lenis to loop seamlessly. Without it, you’ll feel the reset. With it, the loop disappears.

We also hide this duplicate from assistive tech using `aria-hidden` so screen readers don’t read it twice.

```
<head>
    <!-- CSS Reset -->
    <link rel="stylesheet" href="./assets/reset.css">

    <!-- Lenis -->
    <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <section class="hero">
        <picture class="hero-image">
            <img src="..." alt="Image 1" />
        </picture>
    </section>

    <section class="hero">
        <picture class="hero-image">
            <img src="..." alt="Image 2" />
        </picture>
    </section>

    <section class="hero">
        <picture class="hero-image">
            <img src="..." alt="Image 3" />
        </picture>
    </section>

    <!-- Duplicate -->
    <section class="hero" aria-hidden="true">
        <picture class="hero-image" aria-hidden="true">
            <img src="..." alt="" aria-hidden="true" />
        </picture>
    </section>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js"></script>
    <script src="https://unpkg.com/lenis@1.3.23/dist/lenis-snap.min.js"></script>
    <script src="./scripts.js"></script>
</body>
```

### CSS

Each section fills the viewport.

We use `100svh` instead of `100vh` to avoid mobile Safari toolbar issues.

Structure-wise:

Section: Fullscreen → Media Container: Fill Container → Media: Fill Container.

```
.hero {
    position: relative;
    overflow: clip;

    display: grid;
    place-items: center;

    width: 100%;
    height: 100svh;

    & picture, & img {
        display: block;
    }

    & picture {
        position: absolute;
        inset: 0;
        z-index: -1;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
```

### JavaScript

We split the logic into two parts:

1.  Scroll system
2.  Parallax animation

#### Lenis Setup

This is where the loop happens.

```
gsap.registerPlugin(ScrollTrigger);

const setupLenis = () => {
    const lenis = new Lenis({
        infinite: true,
    });

    const snap = new Snap(lenis, {
        type: 'mandatory',
        debounce: 500,
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    const sections = document.querySelectorAll('section');

    snap.addElements(sections, {
        align: 'start',
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
};
```

One line does most of the magic:

```
infinite: true
```

Everything else is control and polish.

#### Parallax

This is where it goes from “works” to “feels good”.

```
const sectionAnimation = () => {
    const heros = document.querySelectorAll('.hero');

    heros.forEach((hero) => {
        const media = hero.querySelector('picture');

        gsap.set(media, { yPercent: -50 });

        gsap.fromTo(
            media,
            { yPercent: -50 },
            {
                yPercent: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );
    });
};
```

We move from `-50%` to `50%`.

That’s it.

That slight delay between scroll and media creates depth. Layers start interacting. The page stops feeling flat.

You can view a minimal reproduction of this over on Codepen here:

Here’s a video of the effect:

## Advanced Integrations

Once the core is working, you can start adding finesse.

For this project, I layered in a curved marquee using an [OSMO](https://www.osmo.supply/) component (Curved Marquee). I heavily customised it to fit my specific needs, but didn’t reinvent the wheel.

Sometimes the smartest move is knowing when not to write more code.

Two marquees, different speeds, subtle scaling using ScrollTrigger.

Small detail. Big payoff.

## Final Polish (iOS Fix)

Everything works… until you open Safari on iOS.

Then the toolbar ruins your day.

As it expands and collapses, it exposes the loop seam. The illusion breaks.

So we fix it properly.

### Nested Lenis Setup

We define our own scroll container:

#### HTML

```
<div class="wrapper">
    <div class="content">
        <!-- sections -->
    </div>
</div>
```

#### CSS

```
.wrapper {
    position: relative;
    height: 100svh;
    overflow: hidden;
}
```

#### JS Integration

We tell Lenis and GSAP to use this container:

```
const wrapper = document.querySelector('.wrapper');
const content = document.querySelector('.content');

const lenis = new Lenis({
    infinite: true,
    wrapper: wrapper,
    content: content,
});

ScrollTrigger.scrollerProxy(wrapper, {
    scrollTop(value) {
        if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
        } else {
            return lenis.scroll;
        }
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: wrapper.clientWidth,
            height: wrapper.clientHeight,
        };
    },
    pinType: 'transform',
});
```

And update the ScrollTrigger animations:

```
scroller: wrapper
```

Now the loop is actually seamless.

**No flicker.  
No jump.  
No Safari chaos.**

## Wrap-up

And that’s the full system: a seamless infinite scroll layered with parallax depth that shifts the experience from something you simply navigate to something you actually feel. There’s no heavy architecture or over-engineering behind it, just a handful of well-considered ideas working together in the right way.

That’s the real takeaway here. It’s rarely about adding more, it’s about understanding what matters and executing it with intent. Take this, adapt it, push it further, and build something people genuinely want to keep scrolling.