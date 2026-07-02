---
title: "Building Persistent Page Transitions with WebGPU and Vanilla JavaScript"
source: "https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript/"
publishedDate: "2026-06-30"
category: "design"
feedName: "Codrops"
author: "Ben Paine"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/pagetrans_benpaine_cover.png.webp?x68649)](https://page-transitions-with-webgpu-vanilla-js.crnacura.workers.dev/ "Building Persistent Page Transitions with WebGPU and Vanilla JavaScript Demo")

Hi. I’m Ben Paine. I am a creative developer and designer based in San Diego, CA. I am going to demonstrate how to create unique page transitions using WebGPU. I have found that page transitions, when done right, exponentially improves the user experience.

The reason I utilize WebGPU (this works the same with WebGL, I have been using WebGPU as a modern alternative) is to essentially eliminate the perception of the browser ‘popping’ the DOM state. With one continuous scene, we can trick the user experience to seamlessly transition between pages.

For the sake of the tutorial’s focus, I will very briefly be diving into the logic of the WebGPU renderer or the SPA scaffolding, but essentially I am binding the textures to a DOM element and using a basic image texture. All of this can be viewed within the source code.

## 1\. Getting Started

Here I will lay out a bit of the scaffold and a little bit about how the SPA works. It’s important to illustrate this because understanding a client router will help you understand how the transitions work, but I will be very high-level and brief.

There are two layers stacked on top of each other. If you have worked with WebGL/GPU in the past this is familiar. There is a DOM layer with “slots” for the images and a Canvas layer with one single Scene that loads all of the image planes. The image planes persist throughout the whole site and are bound to the DOM slots. The image planes are created once at startup and persist. We are controlling the visibility based on the page and available slots.

Each image plane carries a `bounds = { x, y, w, h, z }` expressed in CSS pixels using `getBoundingClientRect()`. At any moment the plane’s bounds are owned by exactly one of:

-   DOM Tracking: The plane points to a DOM “slot” and is updated every frame.
-   Manual control: `plane.trackedEL` is `null` and the bounds are written directly. This happens during the transition when the DOM is broken down and destroyed and the transition relies on lerped values.

With this in mind, the transition is essentially detaching all planes from DOM tracking -> tween their bounds/opacity/scale freely -> reattach to destination page’s DOM slots and continue DOM tracking.

Let’s dive into some specifics.

### a. Render Loop

Everything starts with a single entrypoint of `src/index.js`. The renderer is made and we have one single `requestAnimationFrame` loop. We build all the image textures for all the pages at startup, so we do not have any latency in loading each page’s textures when routing.

### b. Pages

Each page is just a function that returns a string of HTML for brevity. Here is the “Selected” page:

```
// pages/home.js
export function home() {
  const slots = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<a href="/<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow><mi mathvariant="normal">"</mi><mi>d</mi><mi>a</mi><mi>t</mi><mi>a</mi><mo>−</mo><mi>l</mi><mi>i</mi><mi>n</mi><mi>k</mi><mi>c</mi><mi>l</mi><mi>a</mi><mi>s</mi><mi>s</mi><mo>=</mo><mi mathvariant="normal">"</mi><mi>s</mi><mi>l</mi><mi>o</mi><mi>t</mi><mi>s</mi><mi>l</mi><mi>o</mi><mi>t</mi><mo>−</mo></mrow><annotation encoding="application/x-tex">{i + 1}" data-link class="slot slot-</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span><span class="mord">"</span><span class="mord mathnormal">d</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal" style="margin-right:0.03148em;">ink</span><span class="mord mathnormal">c</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">a</span><span class="mord mathnormal">ss</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord">"</span><span class="mord mathnormal">s</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal">t</span><span class="mord mathnormal">s</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal">t</span><span class="mord">−</span></span></span></span>{i}"><figure></figure></a>`,
    )
    .join('');

  return `
    <section data-page="main" class="page page-main">
      <h1 class="page-title">Selected</h1>
      <div class="carousel">${slots}</div>
    </section>
  `;
}
```

A few things I want to point out:

-   The `<figure>` is empty. There is no `<img>` anywhere on the page. That empty box is a **slot**. It only exists to hold space in the layout so I can measure where the image should be. The actual picture is a WebGPU plane sitting on top, tracking that slot.
-   `data-page` tells the router what kind of page this is (`main`, `inner`, `index`). Every transition keys off that category, not off the URL.
-   `data-link` is the opt-in for the router. Any `<a>` carrying it gets intercepted instead of triggering a full page load.

The inner pages work the exact same way. A function that returns a stack of slots, one hero plus a few supporting images. Same idea, different layout.

The other half of a page is a function that measures those slots. When a transition needs to know where a plane should fly to, it reads the destination’s slots straight from the DOM:

```
// pages/home.js
export function getMainTargets(rootEl) {
  const slots = rootEl.querySelectorAll('.slot');
  return Array.from(slots, (s) => {
    const r = s.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  });
}
```

This is the whole trick to keeping everything in sync: I never hardcode coordinates. CSS lays out the slots, `getBoundingClientRect()` tells me where they landed, and the planes tween to those rects. Change the CSS and the transition still lands in the right place.

### c. The Router

The router is one class called `Controller` and it does two jobs: it intercepts navigation, and it conducts the transition.

Let’s do navigation first.

It starts with a plain route table declaring the routes:

```
const ROUTES = {
  '/':      { page: 'main',  view: home,      image: null },
  '/index': { page: 'index', view: indexPage, image: null },
  '/1':     { page: 'inner', view: inner(0),  image: 0 },
  '/2':     { page: 'inner', view: inner(1),  image: 1 },
  // ...through /5
};
```

Each route is three things: a `page` category, the `view` function that returns the HTML, and the `image` index it foregrounds. Notice `/1` through `/5` all share `page: 'inner'` because the ‘inner’ page is a template. The transitions care about the category, not the exact URL.

To catch clicks, I put a single listener on the document and filter for my links:

```
onClick(e) {
  const a = e.target.closest('a[data-link]');
  if (!a) return;
  e.preventDefault();                    // stop the full page reload
  this.navigate(a.getAttribute('href'));
}

onPopState() {
  this.navigate(window.location.pathname, 'back');  // back/forward button
}
```

-   One listener on `document`, not one per link. Pages I inject later are covered automatically so there is nothing to rebind.
-   `preventDefault()` is the line that turns a real link into an SPA navigation. The `<a href>` stays a real, shareable, right-clickable URL; I just hijack the left-click.
-   `popstate` handles the browser’s back and forward buttons. I pass a `'back'` flag so `navigate` knows not to push another history entry.

That’s the routing half. `navigate()` itself runs the transition, so I’ll cover it in the next section because in this project, navigation and the transition are the same method.

## 2\. Page Transitions

This is the meat of the tutorial. Everything above was scaffolding so this section makes sense.

### Keep, remove, add

Going back to the mental model, the planes are never created or destroyed. So a transition is never “build the new images, tear down the old ones.” Every plane on screen is doing exactly one of three things:

-   **Keep**: the image exists on both pages, so I morph it: tween its bounds from the old rect to the new rect. This is the seamless fly-and-scale.
-   **Remove**: the image is leaving. I fade its opacity to 0. The plane stays alive; it just goes invisible and gets reused later.
-   **Add**: the image is new to the destination. I stamp it at its target rect (set bounds instantly, no tween) and fade opacity from 0 to 1, so it materializes in place instead of flying in from nowhere.

```
// transitions/constants.js
export function tweenBounds(plane, target, opts = {}) {
  return gsap.to(plane.bounds, { x: target.x, y: target.y, w: target.w, h: target.h, /* ... */ });
}

export function tweenOpacity(plane, to, opts = {}) {
  return gsap.to(plane, { opacity: to, /* ... */ });
}
```

`tweenBounds` is “keep and move.” `tweenOpacity` is “remove or add.” Every transition in the project is built from just those two.

### A transition consists of `out()` + `in()`

Each transition is a small class with two async methods:

```
class SomeTransition {
  async out(fromEl, toEl, ctx) { /* the planes that exist on the FROM page */ }
  async in(fromEl, toEl, ctx)  { /* the planes that are new to the TO page */ }
}
```

By convention `out` handles the planes leaving (morph the shared one, fade the rest out), and `in` handles the planes arriving (stamp them, fade them up). The controller fires both at once and waits for them together, so the two halves overlap and old and new are in motion at the same time. That overlap is what makes it read as one continuous move instead of “old leaves, then new arrives.”

Here is the `main → inner` transition. You’re on Selected, you click image #2. Its hero should fly and grow into the inner page’s lead slot, the other four fade out, and #2’s supporting images appear below:

```
// transitions/mainToInner.js
export class MainToInnerTransition {
  async out(_from, toEl, ctx) {
    const { gpu, toImage } = ctx;
    const innerRects = getInnerTargets(toEl);   // measure the destination slots
    const target = innerRects[0];               // slot 0 = the hero position
    const tweens = [];
    for (let i = 0; i < MAIN_COUNT; i++) {
      const plane = gpu.planes[mainIdx(i)];
      if (i === toImage) {
        tweens.push(tweenBounds(plane, target));  // KEEP: fly the hero into place
      } else {
        tweens.push(tweenOpacity(plane, 0));      // REMOVE: fade the others out
      }
    }
    await Promise.all(tweens);
  }

  async in(_from, toEl, ctx) {
    const { gpu, toImage } = ctx;
    const innerRects = getInnerTargets(toEl);
    const fades = [];
    for (let j = 0; j < SATELLITES_PER_IMAGE; j++) {
      const sat = gpu.planes[satIdx(toImage, j)];
      sat.bounds = { ...innerRects[j + 1] };      // ADD: stamp at its target
      sat.opacity = 0;
      fades.push(tweenOpacity(sat, 1, { delay: 0.25 + j * 0.08 }));  // ...then fade in, staggered
    }
    await Promise.all(fades);
  }
}
```

Read it against the three roles: one plane is kept and morphed, four are removed, four are added. Nothing gets built, nothing gets destroyed.

### The one trick that makes it work

There is a catch, and it’s the most important detail in the whole thing.

Normally a plane tracks its slot on every frame, the render loop copies the slot’s `getBoundingClientRect()` into the plane’s bounds. That’s exactly what I want while you’re sitting on a page. But during a transition I’m trying to tween those same bounds myself. If the plane were still tracking a slot, the render loop would overwrite my tween 60 times a second and the morph would be invisible.

So the first thing the controller does on the way out is detach every plane from the DOM and unfreeze the bounds:

```
_leavePage(state) {
  // ...stop the carousel, clear tilt, etc...
  for (const plane of this.gpu.planes) {
    plane.trackedEl = null;   // ★ hand the bounds over to the tweens
  }
}
```

With `trackedEl` cleared, nothing is fighting the tween and GSAP owns every plane’s bounds until the transition finishes. Once it’s done, I reattach the destination’s planes to their slots and tracking resumes. The seam is invisible because the tween already ended exactly on the new slot’s rect. I tweened to `getInnerTargets(toEl)`, which is that rect.

### Putting it together: `navigate()`

Now `navigate()` reads top to bottom (trimmed slightly for clarity):

```
async navigate(path, target = null) {
  if (this.mutating) return;                  // 1. ignore clicks mid-transition
  if (path === this.current?.path) return;
  const next = this.routes[path];
  if (!next) return;

  const fromState = this.current;
  const toState = { path, ...next };
  const transition = this._resolveTransition(fromState.page, next.page);

  this.mutating = true;                        // 2. lock
  if (target !== 'back') history.pushState({ path }, '', path);  // 3. update the URL

  animateTitleOut(this.app.children[0]);       // 4. animate the old page's text out

  this._leavePage(fromState);                  // 5. detach ALL planes from the DOM

  this.app.insertAdjacentHTML('beforeend', next.view());  // 6. inject dest. both pages coexist now
  const fromEl = this.app.children[0];
  const toEl = this.app.lastElementChild;

  // 7. prepare the destination's layout engine (carousel / index) so its target rects exist
  // 8. animate the new page's text in

  const ctx = { gpu: this.gpu, fromImage: fromState.image, toImage: next.image, indexFloat: this.indexFloat };
  const txOut = transition.out(fromEl, toEl, ctx);   // 9. fire both halves at once
  const txIn  = transition.in(fromEl, toEl, ctx);

  await Promise.all([/* text tweens, */ txOut, txIn]);  // 10. wait for everything

  fromEl.remove();                             // 11. drop the old page
  this.current = toState;
  this._snapLayout(toState);                   // lock the exact final opacities
  this._enterPage(toState);                    // reattach tracking + start behaviors
  this.mutating = false;                       // 12. unlock
}
```

Plainly:

> lock → update history → detach all planes → inject the new page (both briefly on screen) → fire `out()` and `in()` together → await everything → remove the old page → reattach tracking → unlock.

A few decisions worth pointing at:

-   **The `mutating` lock** makes the whole thing atomic. Mash the navigation links and the second click is ignored until the first transition lands. Otherwise two transitions would fight over the same shared planes.
-   **Both pages coexist** for the duration. The old page stays in the DOM (just un-clickable) so its text can animate out and the layout doesn’t collapse while the planes are still flying. It’s removed only after the `await`.
-   **The planes are detached the entire time**. From step 5 to step 11 nothing is tracking the DOM, so the tweens own every bounds value uncontested. The instant the transition resolves, `_enterPage` reattaches and live tracking picks up right where the tween left off.

## 5\. Going Further

That’s the core of it. A fixed pool of planes, a router that swaps the scaffolding, and transitions that keep/remove/add by tweening bounds and opacity. Once that clicks, everything else in the source is a variation on the same idea:

-   The **carousel** on Selected doesn’t move planes at all. It moves the DOM slots and lets the planes track them, so the GPU side needs zero carousel-specific code.
-   The **index** page drives bounds a different way: it projects the planes in 3D and writes the result straight into `bounds`, but the transition still just `tweenBounds` into those rects.
-   The **text** (titles, facts, captions) animates in and out with GSAP SplitText alongside the planes, awaited together so everything lands at once.

Add your own page category, write a `view` + a `getTargets` measurer, register a transition built from those same two verbs, and it drops right in. With a little tuning on the eases and timings, you can take this a long way.

You can dig through the full source for the carousel, the index projection, the custom cursor, and the shader that draws the rounded corners.

Please share what you think and follow me on [Twitter](https://x.com/bnpne_) and [Instagram](https://www.instagram.com/bnpne).