---
title: "Reshaping Telha Clarke’s Digital Home from Wordmark to Motion System"
source: "https://tympanus.net/codrops/2026/02/25/reshaping-telha-clarkes-digital-home-from-wordmark-to-motion-system/"
publishedDate: "2026-02-25"
category: "design"
feedName: "Codrops"
author: "Grégory Lallé"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/TC-Codrops-Thumbnail-x2.webp?x78435)](https://telhaclarke.com.au/ "Reshaping Telha Clarke’s Digital Home from Wordmark to Motion System Demo")

## **Laying the Foundations of a New Identity**

Telha Clarke is a Melbourne-based Architecture & Interior Design studio. They work across various project typologies, from residential to commercial. Each project is unique, responding to multiple factors, so the outcome is never a single vision.

We first started the project by working closely with [Nicolas Garcia (Studio Paack)](https://studiopaack.fr/), whom we chose to help us with our client’s new brand identity. The goal was simple: refine their identity with a new wordmark, introducing more modern typography and a new color palette.

We worked hand in hand to translate this new identity as effectively as possible into its application on the future website, as well as across other materials, including communications, down to the smallest details. We even brought the rebranding and website launch to life through custom 3D scenographies inspired by our client’s own work.

## Layout & Design Direction

Obviously, we had to stay somewhat in a classic, clean black-and-white aesthetic/feel that works for most architecture studios, but we wanted to push the layout with a strong motion system, and smart transitions between sections.

Our main objective was to blend the elegance and minimalism of Telha Clarke’s projects with the depth of expertise and technical rigor that define their practice. This balance takes shape through structured layouts and editorial sections, enhanced with subtle elements that reflect the precision and discipline inherent to architecture.

This attention to precision also extends to the calls to action (CTA). A single floating widget serves as the primary interactive element throughout the navigation, dynamically adapting to the content to deliver context-specific actions. It creates a balance between visual refinement and clarity of the message that evolves with the user’s journey.

## Designing with Purpose

The layout was designed with a clear intention: highlight the projects without letting the interface take over. Telha Clarke’s work relies heavily on strong imagery and careful composition, so the website needed to act as a supporting structure rather than a visual statement in itself.

Layouts are built around large visuals, generous spacing, and a restrained typographic system. Every element is positioned to reinforce the content hierarchy, allowing images to remain the primary point of focus while text and navigation quietly provide context.

As mentioned in the previous section, to avoid overwhelming the site with repeated calls to action, we introduced a smart CTA widget system. Each page features a single, persistent CTA that adapts dynamically to the section currently visible on screen. As the user scrolls, the CTA updates its content and intent, staying contextually relevant without multiplying visual anchors across the page. This system keeps the interface quiet and intentional, while still guiding users through the site in a meaningful way.

We also adapted the same widget for multiple purposes: serving as a filter dropdown on the Works page for mobile, or transforming into a ‘Next Project’ button that automatically expands when reaching the bottom of a project page, inviting users to explore further.

## A Motion System that Reflects Craft

The motion system was crafted to feel refined, yet always intentional. The animations had to reflect the precision and calm inherent in Telha Clarke’s architectural work, never flashy, always considered. Every interaction, every hover, every scroll effect was calibrated to be smooth, elegant, and intentional.

The site opens with a loader that reveals the new wordmark in two steps, subtly referencing the duality of the two founders, Tim Clarke and Stuart Telha. The loader’s deliberate pace reflects the care and craftsmanship behind the studio’s work, creating an immediate link between the digital experience and their architectural approach.

## Seamless Connections between Sections

We introduced subtle scrollytelling sections throughout the site, particularly on the homepage and About page. The goal was to connect sections smoothly, almost imperceptibly, creating a narrative flow that enhances both storytelling and the overall scroll experience.

This approach also solved a key challenge: how to showcase Telha Clarke’s work without overwhelming the user, highlighting only the three or four projects the studio wanted to feature. On the homepage, for example, the “highlighted works” section flows into a deeper exploration of their vision through a contextual grid of images. The grid provides additional glimpses of the studio’s broader work, using subtle parallax and depth to enrich the visual experience. One key image then expands and scales, leading into the “Our Vision” section. Each animation and transition is carefully designed to connect sections seamlessly, keeping the user immersed while gently guiding them through the story of the studio. The result is a smooth, elegant narrative that balances focus, context, and motion.

On the About page, the image in the “Values” section is used to create a seamless transition into the next section. The effect relies on a clip-path combined with a translateX animation for optimal performance. Using [GSAP](https://gsap.com/) and the powerful [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) plugin, this results in a smooth, high-performance scroll-linked animation.

```
const animation = gsap.timeline()

const valuesRect = this.$values.getBoundingClientRect()
const imageRect = this.$vision.getBoundingClientRect()

const top = imageRect.top - valuesRect.top
const bottom = valuesRect.bottom - imageRect.bottom
const left = imageRect.left - valuesRect.left
const right = valuesRect.right - imageRect.right

animation
  .to(this.$image, {
    clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`
  })
  .to(this.$innerImage, {
    x: imageRect.left + imageRect.width / 2 - store.w.w / 2,
    scale: 1
  }, 0)
```

```
const animation = gsap.timeline()

const valuesRect = this.$values.getBoundingClientRect()
const imageRect = this.$vision.getBoundingClientRect()

const top = imageRect.top - valuesRect.top
const bottom = valuesRect.bottom - imageRect.bottom
const left = imageRect.left - valuesRect.left
const right = valuesRect.right - imageRect.right

animation
  .to(this.$image, {
    clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`
  })
  .to(this.$innerImage, {
    x: imageRect.left + imageRect.width / 2 - store.w.w / 2,
    scale: 1
  }, 0)
```

## Leverage the Power of GSAP’s `registerEffect`

GSAP’s **registerEffect** is a powerful method that allows you to create reusable animations across your entire website, whether used as standalone animations or inside a timeline.

In this project, since the website is relatively simple, we mainly use it for the title reveal animation. It’s combined with [piecesjs](https://github.com/piecesjs/piecesjs), a lightweight framework based on native components that lets us create a JavaScript class associated with a DOM element. This class is automatically instantiated each time the element appears in the DOM.

### Creating the Effect

This effect is fairly simple, but it enables us to reuse the exact same animation throughout the website, maintaining consistent easing, duration, and stagger values. This helps ensure a cohesive and consistent motion system across the entire experience.

```
gsap.registerEffect({
  name: 'revealTitle',
  extendTimeline: true,
  defaults: {
    ease: 'expo.out',
    duration: 1.2,
    stagger: 0.1
  },
  effect: (targets, vars) => {
    const tl = gsap.timeline({ defaults: vars })

    tl.to(targets, { yPercent: 0 })

    return tl
  }
})
```

### Using the Effect in a Component

We used piecesjs to easily reuse this title animation throughout the website. However, since it’s registered as a GSAP effect, we can also use it anywhere inside specific timelines when needed.

```
import { Piece } from 'piecesjs'
import gsap from 'gsap'

class Title extends Piece {
  mount() {
    this.split()
    this.initTrigger()
  }

  unmount() {
    this.trigger?.kill()
  }
  
  split() {
    ...
  }

  initTrigger() {
    this.trigger = store.scrollTrigger.create({
      trigger: this,
      start: 'top 90%',
      once: true,
      animation: gsap.effects.revealTitle(this.splittedTitle.instance.lines)
    })
  }
}

customElements.define('c-title', Title)
```

Then you simply need to call the component directly in the HTML:

```
<c-title>Telha Clarke is a Melbourne based architecture & interior design studio.</c-title>
```

This illustrates a fairly simple use case, but the same approach can absolutely be applied to more complex animations and components.

## Tech Stack

-   **Frontend:** Templating handled with Blade (PHP), complemented by Tailwind CSS for styling.
-   **GSAP:** Our go-to for complex and high-performance animations, combined with ScrollTrigger for scroll-based effects.
-   **Lenis:** For smooth scroll, by [Darkroom Engineering](https://darkroom.engineering/).
-   **Taxi:** For powerful JavaScript page transitions, by [Unseen](https://unseen.co/).
-   **piecesjs:** JavaScript framework built on native web components, by [Quentin Hocdé](https://quentinhocde.com/).
-   **Back-end:** WordPress as a CMS, enabling flexible and custom content editing for the client, powered by ACF.
-   **Figma:** Our main design tool for web layouts.
-   **Jitter:** For all our website motion exploration.

## Final Thoughts

The key to this project was creating a cohesive new identity for Telha Clarke, from the brand itself to the website, while staying true to the clean, minimal world of architecture. The goal was to give full space to the studio’s content, while bringing our creative perspective to solve challenges through motion and smart, approachable UI systems. This project is the result of a close collaboration from the very first branding discussions through to the development of the site, ensuring a consistent narrative throughout.

Thank you to [Nicolas Garcia (Studio Paack)](https://studiopaack.fr/) for his support on the brand identity, and to [Emeric Desgranges](https://emericdesgranges.com/) for crafting a fully custom 3D scene for the website’s social media communication.

A special thanks to Tim and Stuart for trusting us throughout the process and giving us the freedom to refresh the studio’s identity while staying true to the essence of their work.