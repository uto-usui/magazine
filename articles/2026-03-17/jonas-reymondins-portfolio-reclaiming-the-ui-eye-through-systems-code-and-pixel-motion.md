---
title: "Jonas Reymondin’s Portfolio: Reclaiming the UI Eye Through Systems, Code, and Pixel Motion"
source: "https://tympanus.net/codrops/2026/03/16/jonas-reymondins-portfolio-reclaiming-the-ui-eye-through-systems-code-and-pixel-motion/"
publishedDate: "2026-03-16"
category: "design"
feedName: "Codrops"
author: "Jonas Reymondin"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Jonas_CaseStudy.webp?x21512)](https://jonasreymondin.com/ "Jonas Reymondin’s Portfolio: Reclaiming the UI Eye Through Systems, Code, and Pixel Motion Demo")

## When Opportunity Finds You

Freelancing often means juggling client work while trying to invest in your own growth and future prospects. Choosing to dedicate time to work on yourself isn’t an easy decision because it can quickly feel like you’re “losing” money. But as a French expression goes, _“Le hasard fait bien les choses”,_ which can be translated to _“As luck would have it”_.

One month, I suddenly found myself without any projects or income. Rather than seeing it as a setback, I chose to treat it as an opportunity: a rare chance to be proactive and turn this quiet period to my advantage by completely rethinking my portfolio.

## Defining Purpose

With the fifth iteration of my portfolio, I already had a solid foundation, so starting from scratch wasn’t necessary. The structure was simple and clear, I refined it into three pages:

-   **Home**: introduces the essentials, previews projects, and guides visitors to explore my profile or dive into the work.
-   **Work**: showcases each project with fullscreen parallax imagery, essential info, and color-driven animations. Multiple navigation paths ensure the content flows naturally and every project gets noticed.
-   **About**: presents my background, approach, services, and contact information.

The real challenge wasn’t the structure though, it was the relationship between form and content which still didn’t feel fully aligned. That’s why I revisited every word and rethought every sentence, making sure the portfolio didn’t just showcase my work, but also truly reflected who I am and what matters most to me as an independent.

With that foundation clarified, it was time to define the purpose behind it. With a background in design, and having grown into a frontend developer over time, I wanted my portfolio to finally convey the duality that defines my work. That’s how the intention and guiding vision of my new portfolio took shape:

_Reclaiming my UI eye while asserting technical expertise._  

## Layout & Identity

Having grown up in the birthplace of the Swiss Style (known in graphic design for its modular grids, sans-serif typography, and minimalist graphic elements) and having studied architecture for a year, my approach is naturally rooted in systems, precision, and symmetry. The goal was to create a refined identity, carefully integrated and brought to life through unique animations.

### Fonts & Colors

With simplicity in mind, I chose a single modern and versatile typeface: **Neue Montreal** from _[Pangram Pangram Foundry](https://pangrampangram.com/products/neue-montreal)_. An intentional nod to the three years I spent in Canada.

The color palette is also deliberately restrained: shades of black and white, with a touch of orange on the About page to add a more personal feel. On the other pages, the main colors of each project guide the visual direction, letting the work itself take center stage.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-colors-1.png?x21512)

### Strict Grid System

The portfolio also relies on a single strict grid, with elements stretched across the screen and positioned to make the most of the space. This disciplined layout gives every page a sense of balance, rhythm and consistency

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-mobile.jpg?x21512)

Responsive layout system (mobile preview)

## Development Overview

For every project, I try to set myself a technical challenge or learn something new. For this one, it was building a backend with **Sanity**. It ensures longevity and efficiency, combined with my usual tech stack that I always strive to keep as modern and up-to-date as possible.

### Tech & Tools

-   **Nuxt 4**: flexible frontend framework
-   **Sanity CMS**: headless content management
-   **TypeScript & SCSS**: modular and reusable code
-   **Pinia**: to manage global state and data
-   **[Lenis](https://lenis.darkroom.engineering/)**: smooth scrolling
-   **[GSAP](https://gsap.com/)**: scroll and text animations
-   **[Swiper](https://swiperjs.com/)**: touch-friendly sliders
-   **WebGL**: pixel trail effect
-   **Vite & Nitro**: server-side optimization
-   **[Infomaniak](https://www.infomaniak.com/en)**: eco-friendly hosting

### Backend Structure Overview

```
studio/                              # Sanity CMS — Back-office content management
├── schemaTypes/                     # Content type definitions
├── structure.ts                     # Studio sidebar structure
├── sanity.config.ts                  # Sanity project configuration
└── sanity.cli.ts                    # CLI configuration
```

### Frontend Structure Overview

```
web/                                 # Nuxt 4 Application — Front-end
├── app.vue                          # Root component, layout & transitions
├── nuxt.config.ts                    # Nuxt configuration
├── pages/                           # File-based routing
│   ├── index.vue                    # Home page
│   └── [...uri].vue                 # Dynamic catch-all (CMS-driven pages)
├── components/                     
│   ├── blocks/                      # CMS-driven content sections
│   ├── nav/                         # Navigation components
│   ├── shared/                      # Reusable UI components
│   ├── icons/                       # SVG icon
│   ├── system/                      # Dev / debug utilities only
│   └── templates/                   # Page-level templates
│       ├── About.vue                
│       ├── Error.vue             
│       └── Projects.vue   
├── composables/                     # Reusable Vue logic
├── stores/                          # Pinia global state 
│   ├── content.ts                   # CMS content store
│   └── ui.ts                        # UI state (navigation, loader…)
├── plugins/                         # Nuxt plugins (app initialization)
├── directives/                      # Custom Vue directives
│   ├── textAnim.ts                  # v-text-anim directive
│   └── scrollReveal.ts              # v-scroll-reveal directive
├── middleware/                      # Route middleware and redirections
├── server/                          # Nitro server
│   └── api/sanity/[query].ts        # Sanity API proxy endpoint
├── utils/                           # Helper functions
│   └── sanityQueries.ts             # GROQ query definitions
└── assets/                          # Global stylesheets & fonts
```

Content is fetched from Sanity once at load via a server-side plugin, cached in Pinia stores to avoid redundant API calls, then a single catch-all route `[...uri].vue` matches any URL, looks up the corresponding data in the store, and dynamically renders the right page template with its components.

Each component is self-contained with its own scoped SCSS and logic, while sharing SCSS utilities (mixins, easings, media queries) and composables (scroll animations, text reveals) are imported on demand and globally accessible.

## Responsive System

To ensure pixel-perfect implementation of the design and keep layouts consistent across all screens, I rely on two custom-built elements that together form an easy to implement responsive system.

### Grid Overlay

The first element, inspired by Figma’s Layout Guides (⇧ + G on Mac), is a component that displays the grid as an overlay and used in development environment. It can be fully configured to match the design grid exactly.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-grid.gif?x21512)

Custom layout guide overlay

### Fluid Sizing

Then, a custom SCSS function allows all sizes (font sizes, spacing, padding) to scale fluidly with the viewport instead of jumping at fixed breakpoints. The result is a smoother experience and a more controlled layout across all screen sizes.

The function, `fluid-px()`, generates a `clamp()` value based on three reference breakpoints:

-   **480px**: minimum viewport, where the value reaches its smallest size
-   **1440px**: design artboard, matching the exact value defined in Figma
-   **2560px**: maximum viewport, where the value reaches its cap

Example usage:

```
font-size: fluid-px(24); // → 21.6px at 480px, 24px at 1440px, 36px at 2560px
font-size: fluid-px(24, 16, 32); // → 16px at 480px, 24px at 1440px, 32px at 2560px
```

By default, the minimum and maximum values are calculated automatically (×0.9 and ×1.5 of the input value), but they can also be overridden manually. This produces a single responsive value with no media queries required.

#### SCSS configuration

```
// Breakpoints
$fluid-min-viewport: 480 !default;
$fluid-artboard-size: 1440 !default;
$fluid-max-viewport: 2560 !default;

// PX → REM
@function fluid-px-to-rem($px, $root: 16) {
  @return calc($px / $root * 1rem);
}

@function fluid-px($value, $min: null, $max: null) {
  $min-vw: $fluid-min-viewport;
  $pref-vw: $fluid-artboard-size;
  $max-vw: $fluid-max-viewport;

  @if $min == null { $min: $value * 0.9; }
  @if $max == null { $max: $value * 1.5; }

  $min-rem: fluid-px-to-rem($min);
  $value-rem: fluid-px-to-rem($value);
  $max-rem: fluid-px-to-rem($max);

  $slope-1: (#{$value - $min}) / (#{$pref-vw - $min-vw});

  @return clamp(
    #{$min-rem},
    calc(#{$min-rem} + #{$slope-1} * (100vw - #{$min-vw}px)),
    #{$max-rem}
  );
}
```

#### Example

```
p {
  width: fluid-px(340);
  font-size: fluid-px(24);
  margin-top: fluid-px(100, 60, 120);
  margin-bottom: fluid-px(100, 60, 120);
}
```

By scaling every dimension together, the container and the text shrink at the same rate. The number of words per line remains consistent, preventing unexpected wrapping or layout shifts. The same paragraph simply adapts smoothly to any screen size.

## Modular and Contextual Navigation

An easily accessible and context-aware navigation bar that breaks the rigid layout to bring some flexibility and movement. Sitting at the bottom center of the screen, it is an entirely modular component that invites the user to play and interact with.

One component, three different behaviors driven by the page state:

-   **Home**: pages links and a project carrousel allowing to quickly access a particular content
-   **Work**: thumbnail of current project with multiple actions buttons around it, one of them triggering a full projects list aiming to again simplify navigation in the page
-   **About**: current visible section and arrow to navigate into page with social links appearing on hover

To reinforce the accessibility intention, the module responds to keyboard input: _arrow keys_ to navigate and _Escape_ to go home, allowing the user to visit the entire site using only one component.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-nav.jpg?x21512)

Modular navigation bar

## Tailored Animations

All animations are triggered either on scroll or on mouse interaction. They aim to create a kind of geeky feeling, highlighting my dev-side throughout the site. To keep them easy to use and consistent, the pixel-based one are reusable components with parameters while the others are centralized into two systems: `useScrollProgress`, a Lenis-driven composable for scroll-based animations, and `v-text-anim`, a custom Vue directive powered by GSAP SplitText that handles all text effects with a single attribute.

-   **Pixel Transition**: On arrival, the screen loader disappears in a grid of solid white pixels, revealing the page underneath.
-   **Pixel Trail**: In the same vibe, a WebGL canvas renders colored pixels sampled directly from the underlying images. Each pixel has a randomized lifetime and fades out independently, creating an organic, scattered trail that reflects the actual content beneath the cursor.
-   **Terminal reveal**: Text types out character by character with a blinking block cursor moving along as if it was printed in real time by a command line. Once complete, the cursor disappears.
-   **Glitch reveal**: randomizes through glitch characters (`@#$%&*`, digits, uppercase letters) before resolving to the real text. It feels like the text is being decoded or descrambled.
-   **Parallax**: As the user scrolls, the fullscreen images and the footer translate with strong negative values to gives the feeling of inertia and depth.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-pixel-transition-2.gif?x21512)

Pixel reveal transition on load

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/Codrops_article-pixel-and-list.gif?x21512)

Pixel trail on mouse move and scroll-based text reveal animation

## Conclusion & Thoughts

This latest version of my portfolio is an important milestone. For the first time, I set a clear deadline to complete a full identity redesign with a purpose. The result is a site that reflects my strengths: rigorous, yet creative, and has given me credibility and visibility I never could have imagined. Of course, this site will continue to evolve, but the key lesson is clear: even for personal projects, a structured approach and methodology lead to the best results.

I hope this case study inspires your own creative journey. Thanks for sticking around and don’t hesitate to reach out!