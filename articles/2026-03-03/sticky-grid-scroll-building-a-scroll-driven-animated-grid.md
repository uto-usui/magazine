---
title: "Sticky Grid Scroll: Building a Scroll-Driven Animated Grid"
source: "https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/"
publishedDate: "2026-03-02"
category: "design"
feedName: "Codrops"
author: "Theo Plawinski"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/theo-plawinski-sticky-grid-scroll-featured-image.webp?x16146)](https://tympanus.net/Tutorials/StickyGridScroll/ "Sticky Grid Scroll: Building a Scroll-Driven Animated Grid Demo")

This animation was born from a project I worked on for [Max & Tiber](https://maxandtiber.com/). The initial idea was simple: create a living, structured image grid, guided entirely by the scroll.

Rather than piling on effects, the focus was on rhythm, spacing, and progression. A fixed scene. Scroll as the driver. A composition that unfolds gradually, step by step.

But beyond the visual result, this project became an exploration of structure: how scroll can be mapped to time, how animation phases can be orchestrated, and how layout and motion can be designed together as a single system.

Technically, the animation relies on [GSAP](https://gsap.com/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and [Lenis](https://github.com/darkroomengineering/lenis).

In this tutorial, we will break down the animation step by step. From layout structure to timeline orchestration, including how smooth scrolling integrates into the system.

The goal is not to reproduce the effect exactly, but to understand an approach: how to build a structured, readable, and controlled scroll-driven animation.

## What We are Building

We will build a scroll-driven animation based on a minimal structure:

-   A sticky block, used as a fixed scene
-   A 12-image grid, arranged in columns
-   A main timeline, orchestrating several internal timelines

Each part has a clear role:

-   The sticky block defines the visual stage
-   The grid provides the animated material
-   The timeline coordinates how everything evolves

Together, they form a controlled environment where motion can be precisely structured.

## How Scroll Maps to Animation

Before diving into the structure, it is important to understand how the animation relates to scroll.

The sticky section behaves like a fixed stage. Scrolling does not move the scene, it advances time inside it. As the user scrolls, the animation progresses through distinct phases:

```
Scroll progress → Visual state

0% – 45%   Grid enters the scene (column reveal)
45% – 90%  Grid expands and opens space (zoom and offsets)
90% – 95%  Content settles into focus (text and button appear)
95% – 100% Scene stabilizes
```

Each phase corresponds to a segment of the main timeline. Scroll position determines how far that timeline has progressed. Once this model is clear, the animation becomes a composition of states rather than a collection of effects.

Now that the animation logic is defined, we can build the structural foundation that supports it.

## HTML Structure

The animation is built on a deliberately simple HTML structure. Each element has a clear role, making both layout and animation easier to reason about. The main animated block sits between regular content sections, creating a natural scroll flow before and after the sequence.

```
<!-- ... Previous block -->

<section class="block block--main">
  <div class="block__wrapper">
    <div class="content">
      <h2 class="content__title">Sticky Grid Scroll</h2>
      <p class="content__description">...</p>
      <button class="content__button">...</button>
    </div>
    <div class="gallery">
      <ul class="gallery__grid">
        <li class="gallery__item">
          <img class="gallery__image" src="../1.webp" alt="...">
        </li>
        <!-- Repeat to get 12 items -->
      </ul>
    </div>
  </div>
</section>

<!-- ... Next block -->
```

Two distinct zones structure the scene:

-   The text content, centered in the viewport
-   The gallery, which provides the visual material for the animation

The `.block` acts as the scroll container. Its extended height creates the temporal space needed for the animation to unfold.

Inside it, `.block__wrapper` is sticky. This forms the fixed scene where the animation plays out while the user scrolls.

The `.content` is separated from the gallery. This makes it possible to control its position, visibility, and interaction independently from the grid.

Finally, the `.gallery` is built as a list. Each image is an individual item, which makes targeting and animating elements straightforward and predictable.

This simple hierarchy is intentional. It keeps the layout readable, isolates responsibilities, and provides a clean foundation for building the animation timelines.

## CSS Setup

CSS defines the visual space before any animation happens. It establishes proportions, positioning, and structural stability. The goal here is not decorative styling, but preparation, building a solid, predictable environment where motion can later unfold with control.

### 1\. Fluid rem

The layout uses a fluid `rem` system based on the viewport width.

```
html {
  font-size: calc(100vw / 1440);
}

body {
  font-size: 16rem;
}
```

At a width of `1440px`, `1rem` equals `1px`. Above or below that width, the entire interface scales proportionally. This approach provides several benefits:

-   Direct consistency between design and implementation
-   Natural scaling without complex media queries
-   Precise control over spacing and sizes

It is a simple but deliberate strategy. Everything scales together, preserving visual relationships across screen sizes while keeping the layout fully responsive

### 2\. Main Block and Sticky Wrapper

The main block is intentionally very tall. It creates the temporal space required for the animation to unfold.

```
.block.block--main {
  height: 425vh;
}

.block__wrapper {
  position: sticky;
  top: 0;
  padding: 0 24rem;
  overflow: hidden;
}
```

The `height: 425vh` is not arbitrary. It is adjusted to match the number of animation phases and their rhythm. The `.block__wrapper` stays pinned to the top of the viewport, forming the fixed scene where everything happens. `overflow: hidden` ensures visual cleanliness by masking elements as they enter or leave the frame.

### 3\. Centered Content

The text content is centered in the viewport and acts as a visual anchor.

```
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  z-index: 1;
}
```

The `position` and the `z-index` keep it above the grid, ensuring readability even while the gallery moves and transforms behind it. The content remains stable, motion happens around it.

### 4\. The gallery

The gallery is positioned at the center of the scene. It provides the visual material that will later be animated.

```
.gallery {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 736rem;
}
```

The grid itself is structured into three columns.

```
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32rem;
  row-gap: 40rem;
}
```

Each item is perfectly square thanks to `aspect-ratio`.

```
.gallery__item {
  width: 100%;
  aspect-ratio: 1;
}
```

Each image fills its container without distortion.

```
.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

This grid is intentionally regular. It provides a stable, almost neutral base. Movement will later disturb this regularity in a controlled way.

## JavaScript + GSAP + Lenis

This animation is entirely **scroll-driven**. JavaScript is used here to orchestrate movement, not to overwhelm it. The approach relies on three elements:

-   **GSAP**, for precise motion
-   **ScrollTrigger**, to bind animations to scroll
-   **Lenis**, to achieve smooth and stable scrolling

Everything is structured around a single class. One scene. One responsibility. One orchestration layer.

### 1\. Import and Register Plugins

We start by importing the required dependencies.

```
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { preloadImages } from "./utils.js"
```

Then, we register the `ScrollTrigger` plugin.

```
gsap.registerPlugin(ScrollTrigger)
```

### 2\. Initialize Lenis for Smooth Scrolling

Lenis is used to smooth out scrolling. The goal is not to transform the experience, but to make it more stable.

```
// Initialize smooth scrolling using Lenis and synchronize it with GSAP ScrollTrigger
function initSmoothScrolling() {
  // Create a new Lenis instance for smooth scrolling
  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 1.4,
  })
  
  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update)
  
  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000) // Convert time from seconds to milliseconds
  })
  
  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0)
}
```

Scrolling becomes more fluid, without excessive inertia. Each movement stays tightly synchronized with the GSAP timelines. Here, Lenis serves precision. It helps prevent micro stutters and reinforces a sense of continuity.

### 3\. Global Initialization

Before diving into the class itself, we set up the global initialization.

```
// Preload images then initialize everything
preloadImages().then(() => {
  document.body.classList.remove("loading") // Remove loading state from body
  initSmoothScrolling() // Initialize smooth scrolling
  new StickyGridScroll() // Initialize grid animation
})
```

Images are preloaded. Smooth scrolling is initialized. The scene can then be instantiated.

### 4\. Class Structure

The entire animation is encapsulated within a single class: `StickyGridScroll`. This class has one clear purpose: to orchestrate the elements and their animations inside the main block.

```
class StickyGridScroll {
  constructor() {
    this.getElements()
    
    this.initContent()
    this.groupItemsByColumn()
    
    this.addParallaxOnScroll()
    this.animateTitleOnScroll()
    this.animateGridOnScroll()
  }
}
```

The constructor is intentionally readable. Each method maps to a specific responsibility:

-   Retrieving elements
-   Preparing the initial state
-   Organizing the grid
-   Declaring the animations

We will now walk through these steps, one by one.

### 5\. Retrieving Elements

Before any animation takes place, we isolate the elements we need. Nothing is animated “on the fly”. Everything is prepared.

```
/**
 * Select and store the DOM elements needed for the animation
 * @returns {void}
 */
getElements() {
  this.block = document.querySelector(".block--main")
  
  if (this.block) {
    this.wrapper = this.block.querySelector(".block__wrapper")
    this.content = this.block.querySelector(".content")
    this.title = this.block.querySelector(".content__title")
    this.description = this.block.querySelector(".content__description")
    this.button = this.block.querySelector(".content__button")
    this.grid = this.block.querySelector(".gallery__grid")
    this.items = this.block.querySelectorAll(".gallery__item")
  }
}
```

This approach offers several benefits:

-   The code remains readable
-   Animations are easier to maintain
-   DOM references are not recalculated unnecessarily

At this point, all required elements are available. We can now prepare their initial state before introducing motion.

### 6\. Preparing the Content

Before triggering any movement, the content needs to be positioned correctly. The idea is simple: start from a neutral, controlled state.

#### Hiding the Description and Button

The description and the button should not appear immediately. They will be revealed later, once the grid has settled into place. Interactions are also disabled. The content exists in the DOM, but remains silent.

```
/**
 * Initializes the visual state of the content before animations
 * @returns {void}
 */
initContent() {
  if (this.description && this.button) {
    // Hide description and button
    gsap.set([this.description, this.button], { 
	    opacity: 0, 
	    pointerEvents: "none" 
    })
  }
  
  // ...
}
```

#### Dynamically Centering the Title

The title, on the other hand, needs to be visually centered within the viewport. Rather than relying on a fixed value, we calculate its offset dynamically.

```
/**
 * Initializes the visual state of the content before animations
 * @returns {void}
 */
initContent() {
  // ... 
  
  if (this.content && this.title) {
    // Calculate how many pixels are needed to vertically center the title inside its container
    const dy = (this.content.offsetHeight - this.title.offsetHeight) / 2
    // Convert this pixel offset into a percentage of the container height
    this.titleOffsetY = (dy / this.content.offsetHeight) * 100
    // Apply the vertical positioning using percent-based transform
    gsap.set(this.title, { yPercent: this.titleOffsetY })
  }
}
```

The logic is straightforward:

-   Measure the available space around the title
-   Determine the offset required to center it vertically
-   Convert that offset into a percentage

This choice matters. By using `yPercent` instead of pixels, the positioning stays fluid and resilient.

At this stage, the title is centered, the description and button are hidden. The scene is ready. All that’s left is to organize the visual material: the grid.

### 7\. Grouping Items into Columns

The grid is made up of **12 images**. To create more nuanced and varied animations, we organize them into three columns. This grouping forms the foundation for everything that follows. It prepares the scene for the main timeline, which will orchestrate the reveal, the zoom, and the content toggle.

```
/**
 * Group grid items into a fixed number of columns
 * @returns {void}
 */
groupItemsByColumn() {
  this.numColumns = 3
  // Initialize an array for each column
  this.columns = Array.from({ length: this.numColumns }, () => [])
  // Distribute grid items into column buckets
  this.items.forEach((item, index) => {
      this.columns[index % this.numColumns].push(item)
  })
}
```

### 8\. The Animations

All animations are driven by **GSAP** and **ScrollTrigger**. Scroll becomes a continuous timeline, and each internal timeline contributes to the visual progression.

We will break down each step, starting with the main timeline, which acts as the structural backbone of the entire sequence.

#### Main Timeline (Scroll-Driven)

The main timeline is the heart of the scene. It is responsible for:

-   Orchestrating the grid reveal
-   Driving the zoom
-   Synchronizing the appearance of the text content

```
/**
 * Animate the grid based on scroll position
 * Combines grid reveal, grid zoom, and content toggle in a scroll-driven timeline
 *
 * @returns {void}
 */
animateGridOnScroll() {
  // Create a scroll-driven timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: this.block,
      start: "top 25%", // Start when top of block hits 25% of viewport
      end: "bottom bottom", // End when bottom of block hits bottom of viewport
      scrub: true, // Smooth animation based on scroll position
    },
  })
  
  timeline
    // Add grid reveal animation
    .add(this.gridRevealTimeline())
    // Add grid zoom animation, overlapping previous animation by 0.6 seconds
    .add(this.gridZoomTimeline(), "-=0.6")
    // Toggle content visibility based on scroll direction, overlapping previous animation by 0.32 seconds
    .add(() => this.toggleContent(timeline.scrollTrigger.direction === 1), "-=0.32")
}
```

#### Why This Timeline Matters?

-   It centralizes all animations
-   It defines the duration and rhythm of the scroll
-   It creates carefully timed overlaps, keeping motion natural
-   Internal timelines (reveal, zoom, toggle) become modular building blocks.

This is the main score.

#### Grid Reveal Timeline

Each column of the grid is revealed from the top or bottom, with a subtle stagger.

-   Even columns animate from the top
-   Odd columns animate from the bottom
-   The distance is calculated dynamically based on the viewport height

This step creates the first noticeable movement, as the grid unfolds smoothly into the scene.

```
/**
 * Create a GSAP timeline to reveal the grid items with vertical animation
 * Each column moves from top or bottom, with staggered timing
 *
 * @param {Array} columns - Array of columns, each containing DOM elements of the grid
 * @returns {gsap.core.Timeline} - The timeline for the grid reveal animation
 */
gridRevealTimeline(columns = this.columns) {
  // Create a timeline
  const timeline = gsap.timeline()
  const wh = window.innerHeight
  // Calculate the distance to start grid fully outside the viewport (above or below)
  const dy = wh - (wh - this.grid.offsetHeight) / 2
  
  columns.forEach((column, colIndex) => {
    // Determine the direction: columns with even index move from top, odd from bottom
    const fromTop = colIndex % 2 === 0
    
    // Animate all items in the column
    timeline.from(column, {
	  y: dy * (fromTop ? -1 : 1), // Start above or below the viewport based on column index
	  stagger: {
        each: 0.06, // Stagger the animation within the column: 60ms between each item's animation
        from: fromTop ? "end" : "start", // Animate from bottom if moving down, top if moving up
	  },
	  ease: "power1.inOut",
    }, "grid-reveal") // Label to synchronize animations across columns
  })
  
  return timeline
}
```

#### Grid Zoom Timeline

The zoom enhances the visual dynamics:

-   The entire grid is slightly enlarged (`scale: 2.05`)
-   The side columns move horizontally outward
-   Items in the central column shift vertically

This opening effect adds depth to the scene and allows the content to breathe.

```
/**
 * Create a GSAP timeline to zoom the grid
 * Lateral columns move horizontally, central column items move vertically
 *
 * @param {Array} columns - Array of columns, each containing DOM elements of the grid
 * @returns {gsap.core.Timeline} - The timeline for the grid zoom animation
 */
gridZoomTimeline(columns = this.columns) {
  // Create a timeline with default duration and easing for all tweens
  const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } })
  
  // Zoom the entire grid
  timeline.to(this.grid, { scale: 2.05 })
  
  // Move lateral columns horizontally
  timeline.to(columns[0], { xPercent: -40 }, "<") // Left column moves left
  timeline.to(columns[2], { xPercent: 40 }, "<") // Right column moves right
  
  // Animate central column vertically
  timeline.to(columns[1], {
	// Items above the midpoint move up, below move down
	yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
	duration: 0.5,
	ease: "power1.inOut",
  }, "-=0.5") // Start slightly before previous animation ends for overlap
  
  return timeline
}
```

#### Toggle Content

The main timeline determines when the text content appears:

-   The title slides into its final position
-   The description and button become visible and interactive
-   The animation is subtle, deliberate, and smooth

Content does not appear arbitrarily, it emerges when space has been created for it.

```
/**
 * Toggle the visibility of content elements (title, description, button) with animations
 *
 * @param {boolean} isVisible - Whether the content should be visible
 * @returns {void}
 */
toggleContent(isVisible = true) {
  if (!this.title || !this.description || !this.button) {
    return
  }
  
  // Create a timeline
  gsap.timeline({ defaults: { overwrite: true } })
    // Animate the title's vertical position
    .to(this.title, {
      yPercent: isVisible ? 0 : this.titleOffsetY, // Slide up or return to initial offset
      duration: 0.7,
      ease: "power2.inOut",
    })
    // Animate description and button opacity and pointer events
    .to([this.description, this.button], {
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: `power1.${isVisible ? "inOut" : "out"}`,
      pointerEvents: isVisible ? "all" : "none",
    }, isVisible ? "-=90%" : "<") // Overlap with previous tween when showing
}
```

#### Add Parallax On Scroll

The wrapper undergoes a slight vertical shift, creating the illusion of fixed content.

```
/**
 * Apply a parallax effect to the wrapper when scrolling
 * @returns {void}
 */
addParallaxOnScroll() {
  if (!this.block || !this.wrapper) {
    return
  }
  
  // Create a scroll-driven timeline
  // Animate the wrapper vertically based on scroll position
  gsap.from(this.wrapper, {
    yPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: this.block,
      start: "top bottom", // Start when top of block hits bottom of viewport
      end: "top top", // End when top of block hits top of viewport
      scrub: true, // Smooth animation based on scroll position
    },
  })
}
```

#### Animate Title On Scroll

Finally, the title receives a subtle fade-in:

-   It becomes visible at the key moment in the timeline
-   The reader’s gaze is naturally guided to the content
-   The sequence feels complete and coherent

```
/**
 * Animate the title element when the block scrolls into view
 * @returns {void}
 */
animateTitleOnScroll() {
  if (!this.block || !this.title) {
    return
  }
  
  // Create a scroll-driven timeline
  // Animate the title's opacity when the block reaches 57% of the viewport height
  gsap.from(this.title, {
    opacity: 0,
    duration: 0.7,
    ease: "power1.out",
    scrollTrigger: {
      trigger: this.block,
      start: "top 57%", // Start when top of block hits 57% of viewport
      toggleActions: "play none none reset", // Play on enter, reset on leave back
    },
  })
}
```

Now, all animations are orchestrated. Scroll becomes the driver, and the scene unfolds in a fluid, controlled, and elegant manner.

## And That’s It

This animation demonstrates how **scroll can become a tool for visual storytelling**. Every movement and transition is designed to be clear, fluid, and structured.

Behind the effect lies a simple but powerful approach: a minimal HTML structure, a stable CSS layout, and a main timeline orchestrating motion with precision. Each animation acts as a building block, assembled into a coherent progression.

More importantly, this system is designed to scale. You can adjust the rhythm, replace the layout, introduce new animation phases, or reorganize the timeline entirely, while keeping the same underlying logic.

Now, it is your turn. Experiment, vary the rhythms, enrich the composition. Always keep in mind precision, readability, and elegance.

I sincerely hope you will enjoy this effect and find it inspiring. Thank you for taking the time to read this tutorial. I would be delighted to hear your feedback. You can reach me out via [Instagram](https://instagram.com/theoplawinski), [LinkedIn](https://linkedin.com/in/theoplawinski), or [email](mailto:contact@theoplawinski.com).