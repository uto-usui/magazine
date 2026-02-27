---
title: "Building Async Page Transitions in Vanilla JavaScript"
source: "https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/"
publishedDate: "2026-02-26"
category: "design"
feedName: "Codrops"
author: "Valentin Mor"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/Group-170.webp?x72865)](https://async-page-transitions.crnacura.workers.dev/ "Building Async Page Transitions in Vanilla JavaScript Demo")

Hey! I’m [Valentin Mor](https://www.valentin-mor.com/), a frontend creative developer based in Paris. In this tutorial, we’ll build a lightweight async page transition system from scratch using vanilla **JavaScript, GSAP**, and **Vite**.

By the end, you’ll have a fully functional SPA router with crossfade transitions between pages — no framework required.

## Introduction

It may sound surprising, but when I think about the hallmarks of creative websites as a developer, the first thing that comes to mind is how routing and page transitions are handled. Sometimes all you need is a simple fade-out/fade-in effect, but adding a touch of depth and motion can significantly improve the user experience.

I spent a lot of time exploring this topic using libraries such as `Barba.js` to understand what happens behind the scenes — especially when the current page and the next page briefly coexist in the DOM.

I can’t go any further without mentioning [Aristide Benoist](https://aristidebenoist.com/) — a true reference when it comes to smooth, cinematic page transitions. The transition we’re building here is inspired by his work on the [Watson website](https://watson.la/). If you’re not familiar with it, I highly encourage you to check it out.

## What We’re Building

A minimal single-page application with:

-   A custom client-side **router** that intercepts link clicks and manages navigation using the History API.
-   An **async transition engine** that animates the current and next pages simultaneously.

**Here’s the key idea:** Instead of instantly swapping the page content, we **clone the page container**, inject the new content into the clone, animate both containers (old out, new in), and then remove the old one. This creates true crossfade transitions, where both pages coexist in the DOM during the animation.

## Project Setup

Open your favorite IDE and run the following command: `npm create vite@latest`

When prompted, select `Vanilla` as the framework and `JavaScript` as the variant.

Clean up the initial files by deleting the `counter.js` file from the `src` folder, and keep only the style import in your `main.js`.

```
yourproject/
├── node_modules/         
├── public/         
├── src/
│   ├── main.js         
│   └── style.css        
├── gitignore
├── index.html
├── package-lock.json
└── package.json
```

## Step 1: The HTML Shell

Our `index.html` file serves as the root layout — the permanent shell that persists across navigations. Only the content inside `data-transition="container"` changes.

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Building Async Page Transitions in Vanilla JavaScript</title>
  </head>
  <body>
    <div data-transition="wrapper">
      <div data-transition="container" data-namespace="home">
        <main id="page_content" class="page_content"></main>
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Three data attributes do the heavy lifting:

-   `data-transition="wrapper"` — The parent element that holds both the current and incoming containers during a transition. Both pages live here simultaneously.
-   `data-transition="container"` — Cloned for each new page. During a transition, the wrapper temporarily contains two of these elements.
-   `data-namespace` — Identifies which page is currently displayed. In this tutorial, it’s mainly useful for debugging, but in more advanced projects, it becomes essential for mapping different transition animations to specific page-to-page routes.

## Step 2: Page Modules

Start by creating a `/pages` folder inside `src`, then add your first two page folders: `/home` and `/alternative-page`.

Each of these folders will contain one HTML file and one JavaScript file.

```
├── pages/
│   ├── home/
│   │   ├── home.html    
│   │   └── home.js     
│   └── alternative-page/
│       ├── alternative-page.html  
│       └── alternative-page.js    
```

Write some minimal HTML with a `<section>` wrapper, an `<h1>`, and a `<nav>` containing links to our two website pages: “`/`” and “`/alternative-page`“.

```
<section class="hero">
  <nav>
    <a href="/alternative-page">Alternative page</a>
  </nav>

  <div class="hero_content">
    <h1>AH.736</h1>
  </div>
</section>
```

Each page is a self-contained module that exports a default function returning HTML.

For the sake of completeness, add an `init()` function for your JavaScript setup (such as event listeners), and an optional `cleanup()` function for teardown.

We’ll only use the default function in the core of this tutorial.

The `?raw` suffix is a Vite feature that imports the HTML file as a raw string. The corresponding template is pure HTML:

```
import template from "./home.html?raw";

export default function HomePage() {
  return template;
}

export function init() {}

export function cleanup() {}
```

For now, add some minimal styling to keep the page content at full-screen height, import your favorite font, and start adding some basic styles of your choice.

```
@font-face {
  font-family: "Neue";
  src: url("/NeueMontreal-Medium.ttf");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

:root {
  font-family: Neue;
  line-height: 1;
  color: rgb(0, 0, 0);
  background-color: #000000;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Neue;
  margin: 0;
  display: flex;
  overflow-x: hidden;
  min-height: 100vh;
}

main {
  width: 100vw;
}

h1 {
  font-size: 28.2vw;
  margin: 0;
  line-height: 80%;
}

a {
  color: black;
  text-decoration: none;
  text-transform: uppercase;
}

.hero {
  background-color: white;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  align-items: center;
}
.hero_content {
  width: 100%;
  padding-top: 8vh;
  text-align: center;
}

[data-transition="container"] {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

_Note: We won’t go into styling or complex enter animations, as this topic is already quite dense. I recommend sticking to the bare minimum for now, and later improving your project with polished styling and animations._

## Step 3: The Router

The router is the brain of our SPA. It intercepts link clicks, manages browser history, dynamically loads page modules, and orchestrates transitions between pages.

Let’s build it piece by piece.

Inside the `src` folder, create a `router.js` file.

### Route Definitions

Each route maps a URL path to two things: a `namespace` — a string identifier that labels each page.

The transition engine will use this to determine which page is entering and which is leaving.

`loader` is an arrow function that wraps a dynamic `import()`.

The module is only fetched from the network when we actually call `loader()`.

On the first call, the browser downloads and parses the module; on subsequent calls, it instantly returns the cached version.

```
const routes = {
  "/": {
    namespace: "home",
    loader: () => import("./pages/home/home.js"),
  },
  "/alternative-page": {
    namespace: "alternative-page",
    loader: () => import("./pages/alternative-page/alternative-page.js"),
  },
};
```

### Class Structure

After defining the routes, let’s create a `Router` class to manage our navigation state. It holds two properties:

-   `currentNamespace` tracks which page is currently displayed, allowing us to skip same-page navigations.
-   `isTransitioning` is a lock that prevents double navigations when users click rapidly.

At the bottom of the file, we export an instance of the class.

```
class Router {
  constructor() {
    this.currentNamespace = null;
    this.isTransitioning = false;
  }

// Write your functions here

}

export const router = new Router();
```

Let’s add the Router’s functions — each function serves a specific purpose.

### loadInitialPage()

This method runs once on boot.

-   Match the current URL to a route.
-   Get the current path.
-   Compare the path with our `routes` array to lazy-load the correct module.
-   Load the module.
-   Inject its HTML into the `#page_content` element that already exists in our HTML shell.
-   Set the `namespace` on the container to track which page is currently displayed.

_No transition animation here — the page simply appears._

```
async loadInitialPage() {
  // Match the current URL to a route
  const path = window.location.pathname;
  const route = routes[path]

  // Dynamically import the page module
  const pageModule = await route.loader();

  // Inject the page's HTML template into the existing DOM shell
  const content = document.getElementById("page_content");

  content.innerHTML = pageModule.default();

  // Tag the container with the current namespace
  const container = document.querySelector('[data-transition="container"]');
  container.setAttribute("data-namespace", route.namespace);

  // Store references 
  this.currentNamespace = route.namespace;
}
```

### navigate()

This function runs when a user clicks a link. At this stage, our `navigate()` method handles the full page swap inline — there’s no transition engine yet.

Let’s walk through what happens when a user clicks a link:

-   Guard clauses check whether we are already transitioning or whether the clicked link points to the current page.
-   We then update the URL.
-   We resolve the route and dynamically import the page module. Then we perform a direct `innerHTML` swap — the same logic as `loadInitialPage()`, but triggered by user navigation instead of the initial load.

```
async navigate(path) {
  // Guard clauses
  if (this.isTransitioning || window.location.pathname === path) return;

  // Update the URL in the address bar without triggering a page reload
  window.history.pushState({}, "", path);

  // Resolve the matching route
  const route = routes[path] 

  // Dynamically import the next page module
  const pageModule = await route.loader();

  // Swap the HTML content directly — no animation yet
  const content = document.getElementById("page_content");
  content.innerHTML = pageModule.default();

  // Update the namespace
  const container = document.querySelector('[data-transition="container"]');
  container.setAttribute("data-namespace", route.namespace);

  // Update internal state for the next navigation cycle
  this.currentNamespace = route.namespace;
}
```

In the next step, we’ll extract this swap logic into a dedicated transition engine and replace the inline swap with an animated `performTransition()` call — but first, we needed to make sure the plumbing was solid.

### init()

`init()` does three things, in order:

-   First, it loads the initial page — whatever URL the user landed on. We `await` this so the first page is fully rendered before we start listening for clicks.
-   Then, it registers a `global click listener` on `document`. Instead of adding event listeners to every `<a>` tag (which would break when new links are injected dynamically during transitions), we use event delegation: every click bubbles up to `document`, and we check whether it originated from an anchor tag using `closest("a")`.
-   We filter out external links by checking `startsWith(window.location.origin)`.
-   We prevent the browser’s default navigation with `e.preventDefault()`, and guard against mid-transition clicks using our `isTransitioning` lock.

```
async init() {
  // Load and render whatever page matches the current URL
  await this.loadInitialPage();

  // Global click listener using event delegation
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    // Ignore clicks that aren't on links, or on external links
    if (!link || !link.href.startsWith(window.location.origin)) return;

    // Stop the browser from doing a full page reload
    e.preventDefault();

    // Block navigation if a transition is already running
    if (this.isTransitioning) return;

    const path = new URL(link.href).pathname;
    this.navigate(path);
  });
}
```

_Note: This is a very minimal setup — we’re not handling `popstate` events yet._

**Alright, let’s check whether our basic routing engine is working correctly.** Go to your `main.js` file, import the router, and call its `init()` function.

```
import "./style.css";
import { router } from "./router.js";
router.init();
```

Run your local server with `npm run dev` and click the top navigation links — you should be able to navigate smoothly between your pages.

**We’re making great progress!**

## Step 4: The Transition Engine

For now, we can leave the router file (we’ll come back to it shortly) and create a `/transitions` folder inside `/src`.

This folder will contain:

-   An `/animations` folder that will include our future animation timeline files for page transitions.
-   A `pageTransition.js` file.

```
├── transitions/
│   ├── animations/
│   │   └── defaultTransition.js     
│   └── pageTransitions.js
```

Before creating our simple transition engine, let’s build the animation timeline for the transition.

We’re going to use `GSAP` for the animations.

Install `GSAP` with the following command: `npm install gsap`

I highly recommend creating a `/lib` folder containing an `index.js` file with all your library imports and exports — this gives you a single entry point for heavy dependencies.

```
import { gsap } from "gsap";

export { gsap };
```

Now let’s write the transition animation itself.

The effect we’re after: the current page translates slightly upward with a subtle fade, while the next page simultaneously reveals from bottom to top using a `clip-path` animation. Both happen at the same time, creating a layered reveal.

**The key trick:** we set the next container to `position: fixed` so it stacks on top of the current page. Combined with the initial `clip-path` state, the next page is fully hidden — then we animate the `clip-path` for a clean reveal.

_For a cool fade-out effect, set the `background-color` of your `body` element to black._

The animation function receives two parameters: `currentContainer` and `nextContainer`, and **returns the animation timeline**.

```
import { gsap } from "../../lib/index.js";

export async function defaultTransition(currentContainer, nextContainer) {
  gsap.set(nextContainer, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
    willChange: "transform, clip-path",
  });

  const tl = gsap.timeline();

  tl.to(
    currentContainer,
    {
      y: "-30vh",
      opacity: 0.6,
      force3D: true,
      duration: 1,
      ease: "power2.inOut",
    },
    0,
  )

    .fromTo(
      nextContainer,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        force3D: true,
        ease: "power2.inOut",
      },
      0,
    );

  return tl;
}
```

## pageTransition()

Let’s go back to our `pageTransition.js` file.

This is the core of the async pattern. The engine creates a second container, injects the next page into it, runs an animation between both containers, and then cleans up.

First, import the `GSAP` instance and our newly created animation function.

The function only receives `nextHTML` — that’s all it needs. Let’s break down the flow:

-   We query the current container and its parent wrapper.
-   Then we call `cloneNode(false)` — the `false` argument means we clone the element itself (same tag, same attributes) but **without** its children.
-   We create a `<main>` element, inject the next page’s HTML into it, and append it to our cloned container. Then we append that container to the wrapper.
-   We pass both containers to `defaultTransition()`, which returns a `GSAP timeline`. The `await timeline.then()` line pauses execution until every tween in the timeline has completed.
-   Finally, we clean up: remove the old container from the DOM and clear all the inline styles GSAP injected during the animation (`position: fixed`, `clip-path`, `opacity`, etc.).

```
import { gsap } from "../lib/index.js";
import { defaultTransition } from "./animations/defaultTransition.js";

export async function executeTransition({ nextHTML }) {
  const currentContainer = document.querySelector(
    '[data-transition="container"]',
  );
  const wrapper = document.querySelector('[data-transition="wrapper"]');

  // Clone the container structure for the next page
  const nextContainer = currentContainer.cloneNode(false);

  const content = document.createElement("main");
  content.id = "page_content";
  content.className = "page_content";
  content.innerHTML = nextHTML;
  nextContainer.appendChild(content);

  // Append next page to DOM — both pages now coexist
  wrapper.appendChild(nextContainer);

  // Run the transition animation
  const timeline = defaultTransition(currentContainer, nextContainer);

  // Wait for animation to complete
  await timeline.then();

  // Cleanup: remove old page, reset transforms
  currentContainer.remove();
  gsap.set(nextContainer, { clearProps: "all" });
  gsap.set(nextContainer, { force3D: true });
}
```

While the transition is running, our DOM will look like this:

```
<div data-transition="wrapper">

  <!-- Current page (animating out) -->
  <div data-transition="container" data-namespace="home">
    <main id="page_content" class="page_content">
      <!-- home HTML -->
    </main>
  </div>

  <!-- Next page (animating in) -->
  <div data-transition="container" data-namespace="about">
    <main id="page_content" class="page_content">
      <!-- about HTML -->
    </main>
  </div>

</div>
```

Now we go back to our `router.js` file and implement the new `pageTransition()` logic.

**Let’s create a dedicated method for this.**

First, import the `executeTransition()` function we just created.

We’ll replace the direct `innerHTML` swap in `navigate()` with a proper `performTransition()` method, and add a `popstate` handler.

### performTransition()

The function takes one parameter: the `path`.

The flow in detail:

-   Block execution if the `isTransitioning` flag is active or if we’re already on the same page.
-   Dynamically import the next page `module`.
-   Run the async transition using `executeTransition()`.
-   Update the current `namespace` and reset the `isTransitioning` flag to `false` once the `executeTransition()` timeline has completed.

```
async performTransition(path) {

  // Block if a transition is already running
  if (this.isTransitioning) return;
  this.isTransitioning = true;

  try {
    // Resolve the matching route
    const route = routes[path];

    if (!route || this.currentNamespace === route.namespace) return;

    // Dynamically import the next page module
    const pageModule = await route.loader();

    // Run the async transition — this is where both pages
    // coexist in the DOM and animate simultaneously
    await executeTransition({
      nextHTML: pageModule.default(),
    });

    // Update internal state for the next navigation cycle
    this.currentNamespace = route.namespace;
  } finally {
    // Release the lock no matter what — even if an error occurs
    this.isTransitioning = false;
  }
}
```

### Update navigate()

`navigate()` now only handles the URL update using `pushState` and delegates everything else to `performTransition()`.

```
 async navigate(path) {

  if (window.location.pathname === path || this.isTransitioning) return;

  window.history.pushState({}, "", path);
  
  await this.performTransition(path);
}
```

## popstate Events

Now we can properly add a `popstate` handler. Since the browser has already updated the URL when the `popstate` event fires, we call `performTransition()` directly — no `pushState` needed:

Inside the `init()` function, add an event listener for `popstate` events.

```
window.addEventListener("popstate", () => {
  if (!this.isTransitioning) {
    this.performTransition(window.location.pathname);
  }
});
```

This is exactly why we separated `navigate()` and `performTransition()`:

`navigate()` is for programmatic navigation (click → `pushState` → transition), while `performTransition()` is used when the URL has already changed (`popstate` → transition only).

_Note: In the click listener, we extract the path from the link’s `href` attribute using `new URL(link.href).pathname`, while in the `popstate` handler, we read it from `window.location.pathname`. Same result, different sources: on click, we know where the user wants to go from the link; on `popstate`, the browser has already updated the URL, so we simply read the current location._

**Congrats — your transition engine works!**

Everything is working great, but let’s add a very basic enter animation to give the motion more depth.

## Step 5: Enter Animations

Create an `/animations` folder inside `src` and add an `enter.js` file.

Let’s animate our `<h1>` from a positive `y` offset back to its original position.

We need to target the correct title, since two `<h1>` elements exist while the transition is running. So the function will take two parameters: `delay` for fine-tuning the animation, and `nextContainer`.

```
import { gsap } from "../lib";

const ENTER = (nextContainer, delay) => {
  const t = nextContainer?.querySelector("h1");

  if (!t) return null;

  gsap.set(t, { y: "100%" });

  const tl = gsap.timeline({
    delay,
  });

  tl.to(
    t,
    {
      y: 0,
      duration: 1.2,
      force3D: true,
      ease: "expo.out",
    },
    0,
  );

  return { timeline: tl };
};

export default ENTER;
```

Call this animation function inside the `init()` function of both page modules.

```
import template from "./about.html?raw";
import ENTER from "../../animations/Enter";
export default function AboutPage() {
  return template;
}

export function init({ container }) {
  ENTER(container, 0.45);
}

export function cleanup() {}
```

Now we need to call `init()` at the same time we call `executeTransition()` inside `performTransition()`.

Update this part:

```
await executeTransition({
    nextHTML: pageModule.default(),
    nextModule: pageModule,
});
```

Now `executeTransition()` receives `nextModule` and calls its `init()` method if it exists:

```
if (nextModule?.init) {
  nextModule.init({ container: nextContainer });
}
```

**That looks much better now!**

## Going Further

What we’ve built is a fully functional yet minimal system. It covers the core mechanics — routing, dual-container DOM management, and animated transitions — but a production-ready implementation would need to address several additional aspects.

-   Page lifecycle hooks.
-   Aborting mid-transition.
-   Prefetching on hover.
-   Updating meta tags.

And the list could go on and on…

The beauty of building this from scratch is that every piece is yours to understand, own, and extend.

With a little fine-tuning and experimentation, you can achieve some really cool results: