---
title: "Inside Corentin Bernadou’s Portfolio: Swiss-Inspired Layouts, WebGL Geometry, and Thoughtful Motion"
source: "https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/"
publishedDate: "2026-03-05"
category: "design"
feedName: "Codrops"
author: "Corentin Bernadou"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/CorentinBernadou-Codrops_Cover.webp?x82419)](https://corentinbernadou.com/ "Inside Corentin Bernadou’s Portfolio: Swiss-Inspired Layouts, WebGL Geometry, and Thoughtful Motion Demo")

Building a personal portfolio is one of the most challenging projects for any designer or developer. You’re never fully satisfied with the result. Each iteration raises new questions, and the process can easily turn into an endless cycle of rethinking and rebuilding.

This year marked a new chapter for me as I became a freelance developer, and it felt like the right moment to redesign my portfolio — my first new release in six years. The project gave me the opportunity to explore new ideas, push my technical boundaries, and rethink how I present my work.

In this case study, I’ll share insights into the creative process, design decisions, and technical challenges behind the project.

## A. Concept & Experience

The main goal of this portfolio was to create a space to showcase both my projects and the WebGL experiments I’ve been developing over the past few months. From the beginning, I wanted to integrate WebGL in a subtle way. The idea was to find a balance between a 2D interface that stays clear and readable, and a 3D environment that adds depth and movement.

The project started with simple sketches in my notebook, which helped me quickly define the structure and user flow before moving into the design and development phases.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/notes-800x578.jpg?x82419)

My first sketches for the project / Please don’t judge my drawing skills!

## B. Inspirations & Design

With a background in design, I challenged myself to create the interface on my own. The process was long and sometimes demanding. It involved many iterations and a lot of refinement before I reached a direction I was happy with.

I’ve always been passionate about typography and printed posters. That naturally drew me toward strong graphic systems and expressive typographic compositions. The visual direction draws heavily from the Swiss Style, with a deliberately limited color palette of orange, white, and black.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/moodboard-800x533.jpg?x82419)

Preview of the moodboard for the portfolio

Most of my inspiration came from offline experiences. I spent a lot of time in bookstores, browsing design, painting, and photography books and studying their layouts and typographic systems. I like taking the time to look at grids, margins, and type choices, and then translating those ideas into the web. These references helped shape a clear and consistent visual identity. I also explored references on Pinterest, where I regularly look for inspiration.

At the same time, I wanted to introduce a 3D dimension using WebGL, a field I’ve been exploring for several months. One of the main challenges was to find the right balance between this experimental approach and a more structured, editorial aesthetic.

For the homepage, this translated into an overarching 3D geometry that incorporates previews of all my projects. The process involved many iterations, experimenting with different layouts and interactions before arriving at the final version. Here’s a glimpse of the various iterations I tested:

## C. Development Overview

From the start, I wanted full control over the development process, so I decided to avoid frameworks and build the portfolio using only vanilla JavaScript. This kept the stack lightweight and helped me better understand every part of the codebase. I also implemented a simple PJAX routing system to enable smooth, animated page transitions.

For styling, I relied on SCSS with the BEM methodology, keeping the code modular and maintainable. All page data is stored in JSON, providing flexibility without the need for a CMS or static site generator.

For the WebGL components, I used [Three.js](https://threejs.org/) combined with GLSL, enabling 3D geometries and interactive visualizations. [GSAP](https://gsap.com/) handled all the animations across the portfolio, while [Lenis](https://lenis.darkroom.engineering/) ensured a smooth scrolling experience.

### Project Structure

The portfolio is organized to stay modular and easy to maintain. Page data is stored in JSON, while WebGL components, reusable JavaScript modules, and SCSS styles are clearly separated into dedicated directories. This structure makes it easier to iterate and extend the project over time.

Here’s an overview of the project structure:

```
src/
├── data/                          # JSON data for each page
│   ├── about.json                 
│   ├── archive.json               
│   └── ...                        
├── glsl/                          # GLSL shaders
│   ├── archive/                   
│   │   ├── fragment.glsl          
│   │   └── vertex.glsl            
│   ├── modules/                   # Reusable GLSL modules (noise, utils)
│   ├── work/                      
│   └── ...                        
├── js/                            # Client-side JavaScript
│   ├── index.js                   # Main app entry point
│   ├── animations/                # GSAP page transitions & preloader
│   ├── components/                # Reusable UI components
│   │   ├── Availability.js        # Availability status badge
│   │   ├── Cross.js               # Interactive cross cursor
│   │   ├── Dimensions.js          # Viewport dimensions tracker
│   │   ├── GridHelper.js          # Dev grid overlay
│   │   ├── GridRules.js           # Grid rule lines
│   │   ├── LocaleTime.js          # Local time display
│   │   ├── ScrollIndicator.js     # Scroll progress indicator
│   │   ├── ViewSwitcher.js        # List/Overview view toggle
│   │   └── ...                    
│   ├── pages/                     # Page controllers
│   │   ├── About.js               
│   │   ├── Archive.js             
│   │   └── ...                    
│   ├── utils/                     # Helpers (Lerp, Easings, Routing…)
│   └── webgl/                     # WebGL renders
│       ├── Canvas.js              
│       ├── archive/               
│       ├── index/                 
│       ├── overview/              
│       └── work/                  
└── scss/                          # SCSS styles
```

## D. Animations & Motion

In this section, I’ll walk through some of the motion concepts I used in the project.

### Grid rules

To reinforce the editorial and pixel-perfect aesthetic of the interface, I introduced a small interactive easter egg. When the user clicks the central cross, a set of grid rules dynamically frame the main page title.

Here’s a preview:

The idea is simple: I retrieve the position of elements marked with data-rules using `getBoundingClientRect()`, then dynamically generate four lines, one for each side, positioned with transforms to frame the element.

#### Implementation

The script calculates the element’s bounding box and creates horizontal and vertical guides positioned relative to the viewport.

```
<!-- Main title -->
<h1>A</h1>

<!-- Button -->
<button type="button" aria-label="Toggle grid rules">Toggle</button>

<!-- Rules: 4 rules created in JavaScript -->
<div class="grid-rules"></div>
```

```
class App {
  constructor() {
    // DOM
    this.DOM = {
      button: document.querySelector("button"),
      title: document.querySelector("h1"),
      guidesContainer: document.querySelector(".grid-rules"),
    }

    // States
    this.isActive = false

    // Listeners
    this.createGuides()
  }

  /**
   * Guides
   */

  createGuides() {
    this.DOM.guidesContainer.innerHTML = ""

    const rect = this.DOM.title.getBoundingClientRect()
    const positions = [
      { type: "horizontal", pos: rect.top },
      { type: "horizontal", pos: rect.bottom },
      { type: "vertical", pos: rect.left },
      { type: "vertical", pos: rect.right },
    ]

    positions.forEach(({ type, pos }) => {
      const guide = document.createElement("div")
      guide.className = `grid-rules__guide grid-rules__guide--${type}`

      gsap.set(guide, {
        x: type === "vertical" ? pos : 0,
        y: type === "horizontal" ? pos : 0,
        opacity: this.isActive ? 1 : 0,
      });

      this.DOM.guidesContainer.appendChild(guide)
    })
  }
}
```

Each guide is a `1px` line that spans the full width (horizontal) or height (vertical) of the viewport. The container is fixed to the viewport while guides are absolutely positioned inside it:

```
.grid-rules {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.grid-rules__guide {
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;

  &--horizontal {
    width: 100%;
    height: 1px;
  }

  &--vertical {
    width: 1px;
    height: 100%;
  }
}
```

#### Interaction & Animation

The visibility of the guides is toggled on button click using GSAP, which smoothly fades the lines in and out.

```
addEventListeners() {
  this.DOM.button.addEventListener("click", this.handleClick);
}

handleClick(event) {
  event.preventDefault();

  this.isActive = !this.isActive;

  gsap.to(".grid-rules__guide", {
    opacity: this.isActive ? 1 : 0,
    duration: 0.5,
  });
}
```

This is a simplified version of the system implemented in the final project, which you can explore here:

### Navigation Switcher

Micro-interactions often play a key role in shaping the overall user experience. For the main navigation, I implemented a dynamic mask switcher that follows the cursor and adapts to the width of the hovered link.

When the user hovers a navigation item, the mask smoothly resizes and repositions itself to match the link’s dimensions, creating more responsive and tactile feedback.

Here’s a preview:

#### Concept

The interaction relies on tracking the hovered element’s bounding box and updating the mask’s size and position accordingly. Instead of using static hover states, the mask behaves as a shared visual indicator that transitions between links.

This creates:

-   A stronger visual hierarchy.
-   Smoother navigation feedback.
-   A more dynamic and editorial navigation experience.

#### Implementation

The system listens for hover events on navigation links, retrieves their dimensions using `getBoundingClientRect()`, and updates the mask’s transform and size to match the active element.

The transition between states is interpolated to keep the motion fluid and responsive to cursor movement.

```
<nav class="navigation">
  <ul class="navigation__list">
    <li class="navigation__item">
      <a class="navigation__link" href="#">Home</a>
    </li>
    <li class="navigation__item">
      <a class="navigation__link" href="#">About</a>
    </li>
  </ul>

  <div class="navigation__mask"></div> <!-- We animate this element -->
</nav>
```

```
updateMaskPosition(target, duration = 0) {
  const targetRect = target.getBoundingClientRect()
  const navRect = this.DOM.navigation.getBoundingClientRect()

  const x = targetRect.left - navRect.left
  const y = targetRect.top - navRect.top
  const { width, height } = targetRect

  gsap.to(this.DOM.navigationMask, {
    x,
    y,
    width,
    height,
    duration,
    ease: "power3.out",
  })
}
```

#### Result

This approach creates a continuous motion experience where the navigation feels reactive rather than state-based, reinforcing the overall motion language of the portfolio.

Check out this simplified version I made for my portfolio:

## E. Final Touch

Final touches are often the most challenging part of a project. Even after refining the design, animations, and interactions, I still felt something was missing, something that could help the project stand out from other developer and designer portfolios.

To push the grid rules system further, I introduced an interactive ruler feature inspired by Figma. Users can place their own markers directly on the interface and position them wherever they want. This feature reinforces the overall editorial direction of the website while turning the layout itself into an interactive experience.

To extend this idea even further, I also added the ability to toggle the layout grid used throughout the site with a keyboard shortcut (Option + G), allowing users to reveal the underlying structure of the design. It’s a tool I personally use in every project to ensure alignment and precision, and I thought it would be fun to make it accessible to users as well.

These subtle but playful features helped give the portfolio a stronger identity. They bridge the gap between design tooling and user experience, and highlight how important structure, precision, and experimentation are in this project.

## F. Conclusion & Learnings

This portfolio is an important milestone in my journey as a designer and developer. It gave me the chance to explore new ideas, apply the editorial design approach I’m passionate about, and push my WebGL experiments further.

Along the way, I had to constantly balance experimentation and usability, and think carefully about what makes an interaction feel meaningful rather than just decorative.

Rather than a finished product, this portfolio is an evolving playground, a space for continuous exploration, experimentation, and growth.

I hope you enjoyed this case study. If you have any questions or feedback, feel free to reach out!