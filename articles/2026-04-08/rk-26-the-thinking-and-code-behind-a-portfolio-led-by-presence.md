---
title: "R—K ’26: The Thinking and Code Behind a Portfolio Led by Presence"
source: "https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/"
publishedDate: "2026-04-07"
category: "design"
feedName: "Codrops"
author: "Ravi Klaassens"
---

[![Ravi Klaassens Homepage visual](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/rk-thumb.webp?x34745)](https://www.raviklaassens.com/ "R—K ’26: The Thinking and Code Behind a Portfolio Led by Presence Demo")

More than a year of rebuilding, refining, and rethinking to get it just right. What went live on March 23, 2026 was not one clean idea from start to finish, but the result of pushing the work until the visual direction, motion, structure, and identity finally clicked. Built around the idea that doubt is expensive, the portfolio was shaped to make the standard obvious early, so the conversation can move straight to fit, scope, and execution.

## A lot of late nights for something that had to feel right

I started designing young and went through more names than I’d like to admit. Falconcept, Paramor, and a lot of other directions all got close in their own way, but none of them fully carried the presence I was after. They either felt too safe, too detached, or too much like I was hiding behind something that didn’t really fit my brand.

R—K was the first direction that felt fully personal while still carrying enough weight to speak to both brands and agencies. Getting there was messy. A lot of late nights, juggling other work, reworking layouts, typography, pacing, and brand language over and over, and plenty of moments of thinking \*\*\*\* this, this still isn’t it. But that was the process. I kept pushing until it stopped feeling like separate ideas and finally started to feel like one thing.

This is one of two files, and this one takes up the entirety of the file from top left to bottom right

Somewhere in all that reworking, R—K stopped feeling like another direction and started feeling like the direction. The identity got sharper, the layouts more deliberate, and the whole thing finally began to carry the presence I had been after for a long time. It started to feel more resonant, more refined, less bound by what a portfolio is supposed to look like, and much closer to the kind of clarity that only comes from really understanding what the work needs to be. That first impression mattered a lot, which is exactly what shaped the hero.

### Technical Overview

-   **[Webflow](https://webflow.com/)** for the site structure and CMS
-   **[GSAP](https://gsap.com/)** for animation
-   **[Barba.js](https://barba.js.org/)** for page transitions
-   **[Slater](https://slater.app/)** for code hosting
-   **[Unicorn Studio](https://www.unicorn.studio/)** for the WebGL hero
-   **[Bunny.net](https://bunny.net/)** for image and video delivery
-   **[Howler.js](https://howlerjs.com/)** for sound
-   **[Umami](https://umami.is/)** for privacy-respecting analytics
-   [**Osmo**](https://www.osmo.supply/) for niche features, scaling system & barba boilerplate

Underneath that sits my own framework, evolved from native Client-First by Finsweet. I also used Osmo Supply’s scaling system and Barba boilerplate as a base, then folded both into my own setup so I can keep building on it in future projects.

The site is very visual, but the thing that keeps it manageable is structure. I use attributes for basically everything. Every JavaScript file starts with notes explaining exactly which attributes it relies on, so I always know what talks to what. That matters when you work in Webflow and keep touching HTML/CSS. I never want some random visual edit to quietly break logic somewhere else.

Here is a good example of that, the structure and options are defined directly in the HTML, while the code reads them and wires up the behaviour:

```
const MENU = {
  wrap: "[data-menu-wrap]",
  toggle: "[data-menu-toggle]",
  panel: "[data-menu-panel]",
  items: "[data-mi]"
}

const wrap = document.querySelector(MENU.wrap)
const toggle = document.querySelector(MENU.toggle)
const panel = document.querySelector(MENU.panel)
const items = panel?.querySelectorAll(MENU.items)

const config = {
  openDuration: wrap?.getAttribute("data-menu-open-duration") || "0.7",
  closeDuration: wrap?.getAttribute("data-menu-close-duration") || "0.55",
  dock: wrap?.getAttribute("data-menu-dock") || "bottom",
  outsideClose: wrap?.getAttribute("data-menu-outside-close") || "true"
}
```

## Building the center stage of the website, the Unicorn Studio visual

The hero had to do a lot, fast. It had to pull people in before the site really explains anything. The distorted portrait, the typography, the pacing, and the WebGL background all had to work together without any one of them overpowering the rest.

For the background, I used Unicorn Studio, a tool to create WebGL motion and interaction in minutes, without any code. The goal was to get the right visual weight and atmosphere without making the build more complex than it needed to be. I self-host the Unicorn project file and mount it into the page using bunny.net

```
const SELECTOR = "[data-us-project], [data-us-project-src]";
const KEY_ATTR = "data-us-key";

async function createSceneForElement(el, key) {
  ensureElementId(el, key);

  const cfg = buildSceneConfigFromElement(el);
  const scene = await window.UnicornStudio.addScene(cfg);

  sceneMap.set(key, scene);
  mountedElementMap.set(key, el);

  requestAnimationFrame(() => {
    if (scene && typeof scene.resize === "function") scene.resize();
  });

  return scene;
}
```

That alone is not what makes the hero work, though. What makes it work is how it sits inside everything else. It is not some loose visual at the top of the page. It is part of the site’s rhythm from the first second on.

## What keeps it all controlled

A lot of the site comes down to grid. I use a 12-column layout throughout, which gives me enough structure to push compositions around while keeping everything controlled. For most full-screen sections, I usually think in six rows on a 100vh section, which helps place things with intention without making the layouts feel stiff.

That carries across the whole site. The homepage stays clear while still feeling authored, the project pages lean into presentation, and the insight pages feel more editorial, closer to spreads than standard blog posts. The goal was to make each page feel related, but not repetitive.

To keep the hero stable on mobile, I added a viewport-height helper. Mobile browsers constantly change the visible viewport while you scroll, which can make 100vh-based layouts resize unexpectedly. The helper writes a steadier value to –vh which I then use in CSS for screen-based sizing.

```
function setVh() {
  const h = window.visualViewport?.height ?? window.innerHeight
  const px = h * 0.01

  if (minVhPx === null) minVhPx = px
  minVhPx = Math.min(minVhPx, px)

  document.documentElement.style.setProperty("--vh", `${minVhPx}px`)
}
```

In practice, that means I can define screen-based sizing in CSS like this:

```
--vh: 1vh;
--near-screen-height: calc(var(--vh) * 80);
--full-screen-height: calc(var(--vh) * 100);
--overflow-screen-height: calc(var(--vh) * 120);
--double-screen-height: calc(var(--vh) * 200);
```

## Sound, but only if you want it

Sound was something I wanted in the site fairly early, because it adds a bit more weight to transitions, hover states, and menu interactions. At the same time, I know how annoying it is when a site just starts playing music at you for no reason, so I kept it fully optional. Nothing starts on first click. You have to enable it yourself.

That gave me the best of both worlds: an extra layer for people who want it, without forcing it into the experience for everyone else.

```
function bindSoundTargets(root = document) {
  root.querySelectorAll("[data-sound-hover]").forEach(bindHoverElement);
  root.querySelectorAll("[data-sound-click]").forEach(bindClickElement);
  root.querySelectorAll('[data-sound="mute"]').forEach(bindMuteElement);
}

function bindHoverElement(el) {
  if (!el || el._rkHoverBound) return;
  if (!el.hasAttribute("data-sound-hover")) return;

  el.addEventListener("pointerenter", () => startHoverTimer(el));
  el.addEventListener("pointerleave", () => clearHoverTimer(el));
  el._rkHoverBound = true;
}

function bindClickElement(el) {
  if (!el || el._rkClickBound) return;
  if (!el.hasAttribute("data-sound-click")) return;

  el.addEventListener("click", () => {
    const soundName = el.getAttribute("data-sound-click");
    playNamedSound(el, soundName);
  });

  el._rkClickBound = true;
}
```

Then the mute logic makes sure the whole thing stays user-controlled rather than automatic:

```
function toggleMute() {
  const wasUnlocked = audioUnlocked

  if (!audioUnlocked) {
    unlockAudio()
  }

  if (!wasUnlocked && audioUnlocked) {
    isMuted = false
    Howler.mute(false)
    playBGM({ fromStart: !bgmEverStarted })
    syncMuteUI(document)
    emitState()
    return
  }

  isMuted = !isMuted
  Howler.mute(isMuted)

  if (isMuted) pauseBGM()
  else playBGM({ fromStart: false })

  syncMuteUI(document)
  emitState()
}
```

## Preloader to set the stage

I did not want the preloader to feel separate from the site. It had to already feel like part of the experience. Instead of just covering the page while things load, it uses an SVG clip path with an even-odd cutout, which lets me carve a hole out of a full-screen layer and expand that opening over time. That cutout becomes the reveal itself.

The timing is split into distinct phases. First, the logo masks reveal in with a parallax ease. From there, the cutout timeline takes over, regrouping the logo, resizing the wrappers, and then starting the actual cutout sequence. The cutout begins as a small square in the centre, expands into a wider rectangle, and then settles into a full-screen opening. Those steps are timed at 0.3s, 1.1s, and 0.8s, all using the same parallax ease, with a slight overlap between the rectangle and full-screen phase so the motion never feels too segmented.

At the same time, the Unicorn scene is triggered just after the initial logo reveal, so it has enough time to wake up underneath the mask before the opening fully clears. That combination is what makes the preloader feel less like a loading state and more like part of the hero itself.

```
function buildEvenOddPath(w, h, holeW, holeH) {
  const outer = `M0 0H${w}V${h}H0Z`;

  if (!(holeW > 0 && holeH > 0)) return outer;

  const x = (w - holeW) * 0.5;
  const y = (h - holeH) * 0.5;
  const inner = `M${x} ${y}H${x + holeW}V${y + holeH}H${x}Z`;

  return `${outer}${inner}`;
}
```

This results in:

```
+----------------------+
|                      |
|      +--------+      |
|      |  hole  |      |
|      +--------+      |
|                      |
+----------------------+
```

## Barba page transitions that tie it all together

The transitions took a stupid amount of iteration. At one point, I had a much heavier WebGL version where the page almost peeled up and rotated away. It sounded great in theory, but in practice it was too much — too heavy, too awkward, and too easy to overdo.

I eventually moved to a clip-path based transition instead. It still gave me the feeling I wanted, but it was cleaner, easier to tune, and much easier to sync with everything else happening on the page.

That shift mattered, because the transitions in R—K are not just there to decorate navigation. They carry rhythm through the site. They make the whole thing feel like one continuous world instead of a stack of disconnected screens. The text reveals, masks, and enter animations all had to land at the right moment — not just vaguely after the new page appeared.

```
const CLIP_1 = "polygon(0% 100%, 100% 40%, 100% 100%, 0% 100%)"
const CLIP_2 = "polygon(0% 60%, 100% 0%, 100% 100%, 0% 100%)"
const CLIP_3 = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"

tl.set(next, { clipPath: CLIP_1, webkitClipPath: CLIP_1 }, "startEnter")

tl.to(next, {
  clipPath: CLIP_2,
  webkitClipPath: CLIP_2,
  duration: 0.22,
  ease: "parallax"
}, "startEnter")

tl.to(next, {
  clipPath: CLIP_3,
  webkitClipPath: CLIP_3,
  duration: 0.76,
  ease: "parallax"
}, "startEnter+=0.22")
```

## Insights that feel like real magazine spreads

This did not require much code. It was more about playing with layout, composition, and pacing, but I wanted the Insights to feel like actual magazine spreads rather than standard articles. The goal was to make each one feel like a designed editorial page, as if you were moving from spread to spread, not just scrolling through content.

## **Smaller details matter**

A lot of what makes R—K feel like R—K lives in smaller decisions. The dock instead of a standard navbar. The way it disappears around the hero and footer. The way the footer still feels alive instead of simply becoming the end of the page. The way attributes keep everything structured underneath, so I can keep pushing the visuals without the whole thing becoming fragile.

One of my favourite smaller touches is the animated swords in the footer. Not because they are some huge technical flex, but because they say a lot about how I think about finishing a site. The footer should still feel authored.

```
gsap.set(L, { transformOrigin: "0% 100%" })
gsap.set(R, { transformOrigin: "100% 100%" })

fight.to(R, { x: 1.05, y: 0.1, rotation: 4.5, duration: 0.4 }, 0)
fight.to(L, { x: 0.15, y: -0.05, rotation: 1.2, duration: 0.4 }, 0)

fight.to(R, { x: -1.85, y: -0.55, rotation: -8, duration: 0.34 }, ">-0.05")
fight.to(L, { x: -0.55, y: 0.2, rotation: 7, duration: 0.34 }, "<")
```

It is a small thing, but it gives the footer a bit of life instead of making it feel like the effort stopped there.

## Closing thoughts

None of these pieces carry the site on their own. Not the WebGL. Not the transitions. Not the preloader. Not the sound. Not the smaller details. The work was in getting them to support each other without letting the whole thing collapse into noise.

R—K was never built to prove how many effects I could fit into a portfolio. It was built to feel considered from the first frame to the last — sharp, memorable, and clear enough to set the standard immediately.

Built for presence. Not volume.