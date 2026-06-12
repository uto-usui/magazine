---
title: "Building Horeca: Advanced Motion Design in Webflow Without the Performance Trade-Offs"
source: "https://tympanus.net/codrops/2026/06/10/building-horeca-advanced-motion-design-in-webflow-without-the-performance-trade-offs/"
publishedDate: "2026-06-10"
category: "design"
feedName: "Codrops"
author: "upgreight"
---

[![Homepage of a social media agency featuring an aerial view of a pool by the ocean, with two people and the headline “Let’s Go Viral.”](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/horeca-img.jpg.webp?x42294)](https://www.horeca-social.com/en "Building Horeca: Advanced Motion Design in Webflow Without the Performance Trade-Offs Demo")

Horeca started as a simple landing page, but quickly evolved into something far more ambitious. Text that scales up to fill the viewport and stays pivoted on one specific character. Accordion headers that stick to the bottom of the viewport instead of the top. A feed section where cards come out from deep z-depth toward the camera. A stack of cards, a hover mega menu, and all of it needed to work on mobile without breaking. At the time, achieving this level of motion design required a combination of [Webflow](https://webflow.com/) and custom GSAP, which eventually grew into around 2,000 lines of animation code.

The part most case studies skip is the editing side. It’s easy to build a heavy animation site if you don’t care what happens when the client opens the Designer to change a headline. Stack some absolute positioned divs, bury elements 10 layers deep, hardcode pixel values, done. Looks great in the case study, but it’s a nightmare in production. So Webflow gave us the CMS and the builder, Lumos gave us the class system and fluid units so responsiveness stayed inline as we built, and GSAP extended what was possible beyond Webflow’s interaction capabilities at the time.

In this case study I want to walk through the parts that took longest and broke the most. The scaling text pivot math, the bottom-sticky accordion, the feed depth animation, the Lenis on mobile disaster, and the in app browser hell. Today, many of these interactions can be built directly in Webflow using visual GSAP timelines, significantly reducing the amount of custom code required.

## Tech Stack

-   **Webflow** as the CMS and visual builder
-   **Lumos framework** for the class system, fluid units, and component structure
-   **GSAP** as the animation core
-   **ScrollTrigger** for everything scroll-bound
-   **SplitText** for line, word, and character splits
-   **Lenis** for smooth scroll on desktop only (more on why “desktop only” later)
-   Custom CSS variables for all theming, spacing, and the accordion math

No build step. No bundler. Everything ships as inline custom code inside Webflow’s project settings and embeds. That constraint shapes a lot of the decisions below.

## Two Scroll Tips That Saved This Project

### Tip 1: Just disable Lenis on mobile

Lenis is great on desktop. On mobile it was a disaster — glitchy scroll, jittery sticky sections, pinned elements desyncing from their triggers.

I spent way too long trying to patch it. Tweaked configs, chased edge cases, overcomplicated the whole detection layer. None of it worked. The actual fix was the boring one: don’t run Lenis on mobile at all.

```
window.isMobile = function () {
  if (navigator.userAgentData && navigator.userAgentData.mobile !== undefined) {
    return navigator.userAgentData.mobile;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

if (!isMobile()) {
  lenis = new Lenis({ /* ...config */ });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
}
```

Lesson: if the library is fighting the platform, stop patching and just turn it off where it doesn’t belong.

### Tip 2: Use a custom scroller div instead of the body (for iOS)

On iOS, the address bar collapsing and expanding on scroll resizes the viewport. Every time that happens, ScrollTrigger recalculates and your carefully timed timelines reset or drift. You see this on most animation-heavy sites, the scroll feels wrong and animations re-trigger out of nowhere.

The fix is to take scrolling away from the body and give it to a fixed-height container instead. The body gets `overflow: hidden`, and a `.page_wrap` div becomes the actual scroll region. No address bar interaction = no viewport jitter = stable triggers.

```
const MOBILE_SCROLLER = ".page_wrap";

function getScrollContainer() {
  return isMobile()
    ? document.querySelector(MOBILE_SCROLLER) || window
    : window;
}

ScrollTrigger.defaults({ scroller: getScrollContainer() });
```

**Caveats if you do this:**

-   You’re now managing scroll yourself. Anything that expected `window` as the scroller needs to be pointed at your container.
-   Anchor links (`href="#section"`) stop working out of the box. You have to intercept those clicks and run your own scroll-to logic against the custom container.
-   Anything that reads `window.scrollY` needs to read from your container’s `scrollTop` instead.

It’s more wiring, but the payoff is rock-solid ScrollTrigger timelines on iOS.

## The Scaling Text Sections

The design called for a text block where one part of the line scales massively while the surrounding text moves away vertically, and the scaling word stays pivoted on a specific character. Two instances of this on the page.

The naive approach is to scale the whole text element. That works visually for a half second and then the entire page reflows because a `transform: scale(50)` on a text element drags the document height into the stratosphere if the parent isn’t constrained. Performance dies, ScrollTrigger recalculates, and the page jitters.

The actual approach: scale via `transform` only, pin the section with CSS sticky, control progress via a single ScrollTrigger, and pre-measure the pivot offset so we can translate the scaled element back to keep the pivot character at viewport center.

```
function initializeLongScrollAnimation(longScrollSection, index) {
  const stickyContent = longScrollSection.querySelector(
    "[data-gsap-state='pinned']"
  );
  const textTop = longScrollSection.querySelector("[data-gsap-text='top']");
  const textMiddle = longScrollSection.querySelector(
    "[data-gsap-text='middle']"
  );
  const textBottom = longScrollSection.querySelector(
    "[data-gsap-text='bottom']"
  );
  const pivotElement = textMiddle?.querySelector(
    "[data-gsap-pivot='pivot']"
  );

  let pivotOffsetX = 0;

  if (textMiddle && pivotElement) {
    const textMiddleRect = textMiddle.getBoundingClientRect();
    const pivotRect = pivotElement.getBoundingClientRect();

    const textMiddleCenterX =
      textMiddleRect.left + textMiddleRect.width / 2;
    const pivotCenterX =
      pivotRect.left + pivotRect.width / 2 + pivotRect.width * 0.1;

    pivotOffsetX = pivotCenterX - textMiddleCenterX;

    gsap.set(textMiddle, {
      scale: 0,
      transformOrigin: "50% 50%",
    });
  }

  ScrollTrigger.create({
    trigger: longScrollSection,
    start: "top top",
    end: "bottom bottom",
    scrub: !isMobile() ? true : 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const progress1 = Math.min(progress / 0.6, 1);
      const progress2 = !isMobile()
        ? progress >= 0.3
          ? (progress - 0.3) / 0.55
          : 0
        : progress >= 0.45
        ? (progress - 0.45) / 0.2
        : 0;

      if (textTop) {
        gsap.set(textTop, { y: `${progress1 * -100}%` });
      }

      if (textBottom) {
        gsap.set(textBottom, { y: `${progress1 * 100}%` });
      }

      if (textMiddle && pivotElement) {
        const currentScale = !isMobile()
          ? Math.max(0, progress1 * 2.25)
          : Math.max(0, progress1 * 2.95);

        const scaledPivotOffset = pivotOffsetX * currentScale;
        const targetTranslateX = -scaledPivotOffset;

        const middleOpacity = Math.min(
          Math.max((progress1 - 0) / 0.33, 0),
          1
        );

        gsap.set(textMiddle, {
          scale: currentScale,
          x: targetTranslateX,
          transformOrigin: "50% 50%",
          opacity: middleOpacity,
        });
      }
    },
  });
}
```

Three things matter in that code:

1.  **One ScrollTrigger, multiple progress derivations.** Instead of stacking three or four ScrollTriggers with overlapping start/end values, we have a single trigger that drives the whole section and computes `progress1`, `progress2`, and `progress3` as derived ranges. This is way cheaper than letting ScrollTrigger calculate three separate positions every frame.
2.  **Pre-measured pivot offset.** We measure where the pivot character sits relative to the scaling element’s center exactly once, at setup. Then on every scroll update we multiply that offset by the current scale and translate the element by the negative, which keeps the pivot character pinned to viewport center as the rest of the text grows around it.
3.  **`gsap.set` instead of `gsap.to` inside `onUpdate`.** This is non-obvious but important. Inside a scrubbed ScrollTrigger, you’re firing on every scroll event. `gsap.to` creates a tween instance every frame; `gsap.set` writes directly to the element. For scroll-driven animations the difference adds up fast.

The mobile variant scales harder (2.95x vs 2.25x) because the viewport is narrower and the scaling word needs to feel just as dominant.

## The Stack of Cards (Sticky Slides)

The design had a stack of large cards that pin one after another at the top of the viewport, with the active card scaling and rotating slightly as the next one comes in. Cards then fade out as you scroll past, like they’re being shuffled to the bottom of a deck.

The instinct here is to use GSAP `pin` for each card. We tried that. It worked, but every pin adds a ScrollTrigger pin-spacer to the DOM, the layout math gets complicated on resize, and on mobile the pinning would desync when the address bar collapsed.

We replaced GSAP pinning with CSS `position: sticky` on each `.slide-wrapper`, then used GSAP only for the rotation, scale, and fade animations:

```
const cardsWrappers = gsap.utils.toArray(".slide-wrapper").slice(0, -1);
const cards = gsap.utils.toArray(".card_stack_component");

cardsWrappers.forEach((wrapper, i) => {
  const card = cards[i];
  gsap.to(card, {
    rotationZ: (Math.random() - 0.5) * 10,
    scale: 0.7,
    rotationX: 40,
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: "bottom center",
      endTrigger: ".g_component_layout",
      scrub: !isMobile() ? true : 1,
    },
  });

  gsap.to(card, {
    autoAlpha: 0,
    ease: "power1.in",
    scrollTrigger: {
      trigger: card,
      start: "top -80%",
      end: "+=" + 0.2 * window.innerHeight,
      scrub: !isMobile() ? true : 1,
    },
  });
});
```

The CSS sticky does all the pinning work. GSAP just handles the visual transform. Performance jumped dramatically once we moved away from `pin: true` here.

## The Accordion That Sticks to the Bottom

This was the trickiest layout puzzle on the project, and it has the simplest solution.

The design called for an accordion where each header, as you scroll, snaps to the bottom of the viewport instead of the top. So as you scroll down, accordion items stack from the bottom up. Most sticky implementations stick to the top because that’s what `position: sticky; top: 0` does. There’s no equivalent `bottom: 0` behavior that plays nicely inside a scrolling parent, especially when items are stacked vertically.

The trick was to position the headers absolutely after the first render and use CSS custom properties to calculate where each one should land:

```
const accordionContainer = document.querySelector('[data-gsap="inview"]');
const accordionHeaders = document.querySelectorAll(".accordion_header");
const accordionWrapper = document.querySelector(
  '[data-gsap="accordion-wrapper"]'
);

let headerHeight = "8rem";

if (accordionContainer && accordionHeaders.length > 0 && accordionWrapper) {
  const totalItemsCount = accordionHeaders.length;
  const sectionHeight = accordionContainer.getBoundingClientRect().height;
  const wrapperHeight = accordionWrapper.offsetHeight;
  const headerHeightPx = !isMobile()
    ? `${wrapperHeight / totalItemsCount}px`
    : headerHeight;
  const sectionHeightPx = `${sectionHeight}px`;

  document.documentElement.style.setProperty(
    "--total-items",
    totalItemsCount
  );
  document.documentElement.style.setProperty(
    "--section-height",
    sectionHeightPx
  );
  document.documentElement.style.setProperty(
    "--header-height",
    headerHeightPx
  );

  accordionHeaders.forEach((header, index) => {
    const itemPosition = index + 1;
    header.style.setProperty("--item-position", itemPosition);
    if (!isMobile()) {
      setTimeout(() => {
        header.style.position = "absolute";
      }, 1000);
    }
  });
}
```

The JS does almost nothing. It writes four CSS variables to `:root` and one variable per header (`--item-position`). The actual stickiness happens in the stylesheet using calculations against those variables. On desktop, the headers go to `position: absolute` once the math has been written, and CSS handles the layered bottom-stacking from there.

The whole effect runs on a single ScrollTrigger that just toggles an `.inview` class:

```
ScrollTrigger.create({
  trigger: accordionWrapper,
  start: `top bottom-=${wrapperHeight}`,
  onEnter: () => {
    accordionContainers.forEach((container) => {
      container.classList.add("inview");
    });
    if (!isMobile()) {
      refreshScrollTriggers();
    }
  },
  onLeaveBack: () => {
    accordionContainers.forEach((container) => {
      container.classList.remove("inview");
    });
  },
});
```

The lesson: every time we reached for JavaScript animation on this project, we asked first whether CSS could do it cheaper. Most of the time, it could.

## The Feed Reveal (Cards Emerging from the Void)

This section was part of the original build but was later removed at the client’s request. Keeping the breakdown here because it was one of the trickier performance problems on the project.

The footer section had a stack of feed items that revealed as you scrolled, coming from deep z-depth toward the camera. The closest item to z=1 became the “active” one and triggered a corresponding background image to fade in.

This was the most performance-sensitive animation on the page because it ran on every scroll frame and touched every card simultaneously. Early versions used `gsap.to` inside the update loop, which created hundreds of micro-tweens per second. The fix was disciplined use of `gsap.set` and caching every queried element.

```
class FeedItemsAnimation {
  constructor(container) {
    this.container = container;
    this.feedItems = [...container.querySelectorAll(".feed_cms_item")];

    if (this.feedItems.length === 0) {
      console.warn("No feed items found - skipping feed animation");
      return;
    }

    this.feedScrollWrapper = container.querySelector(".feed_scroll_wrapper");
    this.feedList = container.querySelector(".feed_cms_list");

    // Cache feed images once instead of querying every frame
    this.feedImages = this.feedItems.map((item) =>
      item.querySelector(".feed_img")
    );

    this.bgItems = [...container.querySelectorAll(".feed_bg-content-item")];
    this.bgContainer = container.querySelector(".feed_bg-content");

    this.isMobile = isMobile();
    this.scrollerHeight = this.isMobile
      ? currentScroller && currentScroller !== window
        ? currentScroller.clientHeight
        : window.innerHeight
      : window.innerHeight;

    this.targetZValue = 1;
    this.numItems = this.feedItems.length;

    this.zDepthConfig = {
      desktop: { initialSpacing: -1800, totalRange: 3000, maxOffset: 1800 * this.numItems },
      mobile: { initialSpacing: -900, totalRange: 1500, maxOffset: 900 * this.numItems },
    };

    this.currentConfig = this.isMobile
      ? this.zDepthConfig.mobile
      : this.zDepthConfig.desktop;

    this.init();
  }

  getProgress = () => {
    this.resetClosestItem();

    this.feedItems.forEach((item, index) => {
      const z = gsap.getProperty(item, "z");
      const normalizedZ = gsap.utils.normalize(
        -this.currentConfig.totalRange,
        0,
        z
      );

      item.dataset.z = normalizedZ;

      // gsap.set instead of gsap.to - no tween creation per frame
      gsap.set(item, { opacity: normalizedZ + 0.2 });

      const itemImage = this.feedImages[index];
      if (itemImage) {
        const scaleMultiplier = this.isMobile ? 0.6 : 0.5;
        const baseScale = this.isMobile ? 0.8 : 0.75;

        gsap.set(itemImage, {
          scale: normalizedZ * scaleMultiplier + baseScale,
        });
      }

      const zDifference = Math.abs(normalizedZ - this.targetZValue);
      if (zDifference < this.closestZDifference) {
        this.closestZDifference = zDifference;
        this.closestItem = item;
      }
    });

    const newIndex = this.feedItems.indexOf(this.closestItem);
    if (newIndex !== this.currIndex) {
      this.handleBackgroundTransition(newIndex);
      this.currIndex = newIndex;
    }
  };
}
```

Four optimizations made this performant:

1.  **Cache `.feed_img` references at construction.** The earlier version queried every card’s image every frame.
2.  **`gsap.set` for per-frame updates, `gsap.to` only for the one-off background fade.** The background swap happens once per “active card” change, not every frame, so `to` is fine there.
3.  **Scrub 0.3, not 0.1.** Lower scrub values feel responsive but they fire more frequently and burn CPU. 0.3 looks identical to the eye and costs noticeably less.
4.  **CSS `position: sticky` again instead of GSAP `pin`.** Same reasoning as the card stack.

Mobile uses tighter z-spacing (-900 vs -1800) because the smaller viewport means cards visually fill the screen faster, so they don’t need as much depth range to feel like they’re “emerging from the void.”

## The Mega Menu

The navigation has a hover-expanded mega menu. The trigger button morphs into a multi-link panel: trigger text staggers out character-by-character, the trigger collapses, and link words stagger in from below. Reverse on mouseleave.

The challenge wasn’t the animation itself. It was state management. Hover-driven timelines get into trouble fast if you don’t kill the previous timeline before starting a new one. Quick mouseenter/mouseleave/mouseenter sequences cause overlapping tweens, and characters end up stuck in mid-animation.

```
let hoverInTl = null;
let hoverOutTl = null;
let isOpen = false;

function openMenu() {
  if (isOpen) return;
  isOpen = true;

  if (hoverInTl) hoverInTl.kill();
  if (hoverOutTl) hoverOutTl.kill();

  hoverInTl = gsap.timeline({
    onComplete: () => { hoverInTl = null; },
  });

  hoverInTl
    .to(triggerSplit.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.35,
      ease: "Quart.easeIn",
      stagger: 0.05,
    }, 0)
    .to(triggerIcon, {
      x: 100,
      opacity: 0,
      duration: 0.35,
      ease: "Quart.easeIn",
    }, 0);

  hoverInTl
    .set(navMenuTrigger, { position: "absolute" }, 0)
    .set(navMenuMask, { position: "relative", display: "flex" }, 0);

  hoverInTl.to(navMenuMask, {
    width: "auto",
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.5,
    ease: "Quart.easeInOut",
  }, 0.15);

  linkSplits.forEach((splitData, index) => {
    hoverInTl.to(splitData.split.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.35,
      ease: "Back.easeOut",
      stagger: -0.03,
    }, 0.25 + index * 0.05);
  });
}
```

The pattern: an `isOpen` flag prevents redundant calls, the open and close timelines kill each other on entry, and the timeline holds its own reference until completion at which point it nulls itself. This is the cleanest way to handle hover-driven state-machines in GSAP without leaking timelines.

The negative stagger on `linkSplits` (`stagger: -0.03`) is worth noting too: GSAP supports negative stagger values that run animations in reverse order across the array, which gives a nicer reading flow when words appear from a specific side.

## In-App Browser Hell

Worth flagging because it cost us two days near the end of the build.

When someone opens a Webflow site inside the LinkedIn or Instagram in-app browser, you’re not in Safari or Chrome. You’re in a stripped-down WebView that lags behind the latest CSS spec by months or years. Properties like `aspect-ratio`, certain `clip-path` values, and some `backdrop-filter` behaviors silently fail. The animation system mostly survived, but layouts broke.

The fix was tedious rather than clever: feature-detect, provide CSS fallbacks for every property the in-app browsers didn’t support, and accept that the site would look 95% as polished in those environments rather than 100%. The alternative was to detect in-app browsers and surface a “tap to open in browser” prompt, which we considered but rejected because it adds friction.

If we did this project again, we’d build the in-app browser fallback layer first, not last.

## Reflections

A few things I’d change on a second pass.

**Build the mobile architecture first, not last.** The Lenis-vs-native-scroll decision came late, and retrofitting it touched almost every animation on the page. If we’d designed the scroll system around the mobile constraint from day one, the desktop layer would have been a straightforward enhancement instead of a default that had to be torn back out.

**Lean even harder on CSS.** Every time we replaced a GSAP pin with `position: sticky`, the page got faster and the code got smaller. We could have made that swap earlier and more aggressively. The accordion section is the cleanest example: almost all of its behavior lives in two CSS variables and a class toggle.

**Webflow’s interactions have caught up since.** When we started, delivering this level of motion design relied heavily on custom code alongside Webflow. Today, you could do roughly 75% of what we shipped here directly inside the Webflow Designer using the new visual GSAP timelines, no JS file, no embed, just keyframes on the canvas. The depth-and-scale feed, the bottom-sticky accordion, and the pivot-locked scaling text would still need real code, but most of the rest wouldn’t. The right way to think about Webflow now is: build everything you can on the visual timelines, then layer custom GSAP only where it genuinely can’t reach. Don’t reach for code on reflex.

**Performance is mostly about not animating things.** The biggest wins on this project came from removing animations: replacing pins with sticky, replacing `to` with `set`, caching DOM references, and accepting that scrub 0.3 looks the same as scrub 0.1. Nothing about adding new animation libraries or new optimization tricks. Just doing less work per frame.

Webflow can carry production sites with this level of motion design. It just requires deliberately stepping outside the visual builder for the animation layer and treating the custom JS like real software rather than a script snippet you paste at the bottom of the page.

## Live Site

Visit the [live site](https://www.horeca-social.com/en).

## Credits

-   Studio: [upgreight](https://www.upgreight.com/)
-   Webflow Development & Animation: [Kamran Imtiaz](https://www.linkedin.com/in/kamranimtiaz/)
-   Additional Webflow Development: [Lukas Schorn](https://www.lukasschorn.com/)
-   Design: [Anna Prozhyzhko](https://www.linkedin.com/in/anna-prozhyzhko-0a127b14b)
-   Project Lead & Quality Assurance: [Julian Ortler](https://www.linkedin.com/in/julian-ortler/)
-   Case Study Showreel: [Tobias Graves Morris](https://www.instagram.com/tobiasgravesmorris/)