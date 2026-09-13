---
title: "Yestalgia: Bringing Decathlon’s ’90s Spirit to Life Through a Playful Digital Experience"
source: "https://tympanus.net/codrops/2026/09/12/yestalgia-bringing-decathlons-90s-spirit-to-life-through-a-playful-digital-experience/"
publishedDate: "2026-09-12"
category: "design"
feedName: "Codrops"
author: "Quentin Hocdé and Jonathan Da Costa"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/yestalgia.jpg.webp?x57826)](https://decathlonyestalgia.com/ "Yestalgia: Bringing Decathlon’s ’90s Spirit to Life Through a Playful Digital Experience Demo")

For the launch of Yestalgia, Decathlon’s exclusive capsule collection, our mission was to design and develop a dedicated digital experience celebrating the brand’s reinterpretation of the 1990s.

Built around a curated selection of archival pieces reimagined through a contemporary lens, the collection embraces the optimistic spirit, bold colors, and playful aesthetics of the decade while remaining unmistakably modern.

## Design

The visual identity, created in collaboration with [Dalkhafine](https://www.instagram.com/dalkhafine), combines vibrant illustrations, expressive typography, and nostalgic references to immerse visitors in a world where outdoor heritage meets pop culture.

Our challenge was to translate this rich creative direction into an engaging, high-performance web experience that could support the product launch while preserving the personality and energy of the campaign.

### A Product-First Editorial Approach

The layout combines highly editorial sequences where imagery and products take center stage. Large-scale visuals, generous compositions and minimal interface elements allow each piece to be discovered almost instantly, creating a browsing experience that feels closer to flipping through a campaign than navigating a traditional product catalogue.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-17-1200x675.png.webp?x57826)

### Bringing the Campaign into the Interface

To connect these product-focused moments with the wider campaign identity, we introduced purely graphic sections where typography, shapes and movement take over. These sequences act as visual interludes throughout the experience, shifting the rhythm and bringing the playful energy of Yestalgia directly into the interface.

Rather than treating the campaign assets as decoration, we used them as part of the site’s visual language, creating a constant dialogue between product, typography, illustration and interaction.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-18-1200x675.png.webp?x57826)

### The Walkman

One of the experience’s most distinctive elements is the navigation itself.

Inspired by the collection’s 90s references, the menu becomes a cassette player, with each tape representing a different destination within the website. Selecting a cassette transforms a familiar navigation pattern into a playful interaction, turning something purely functional into a small piece of storytelling.

It became a way to make the nostalgic concept tangible without compromising the simplicity of the experience.

### A 90’ Graphic Thread

Shapes and lines run throughout the website as a recurring graphic thread, connecting its different components and sections.

Subtle micro-interactions bring these elements to life: lines extend, shapes shift and graphic details react as users move through the experience. Rather than relying on large effects, motion is embedded into the visual system itself, creating continuity between typography, imagery, illustration and interface.

Together, these details give the website its rhythm and make the campaign feel alive beyond its static visual identity.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-19-1200x675.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-20-1200x675.png.webp?x57826)

### Animation

Building on the artist’s illustrations, we created a series of looping animations that bring the graphic universe to life. Used throughout the experience, these subtle sequences add rhythm, depth and a sense of continuous movement to the website.

## Development

### The real challenge: a creative site the client can actually update

Yestalgia is a WordPress site on a fully custom theme, shipped in **7 languages**. The animations are the visible part, but the harder constraint was invisible: a heavily art-directed site still has to be genuinely easy to update.

So every section of the site is a **Blockstudio** block: a `json` schema and a `twig` template. The page is assembled from those blocks, which means the client can reorder, recompose and swap content without touching code and without breaking the art direction.

On the front-end, the whole site runs on **piecesjs**, a tiny framework built on native web components, offering a suite of tools and utilities tailored for creative websites, where each `Piece` is an autonomous element that lazy-imports only its own JS and CSS. On top of it we carry a library of utilities from project to project, and the one that matters most here is our `Scroll` Piece. It plugs **Lenis** into **GSAP ScrollTrigger** and centralises everything scroll-related behind data attributes, so interactivity is wired straight in the markup.

### The menu: a walkman you can load 📼

This was the biggest challenge of the project and the part I enjoyed most. A Walkman rises into frame, the cassettes slide out, and when you pick one you genuinely feel it snap back into the deck before the whole device drops away to reveal your chosen section.

Getting that loop to feel physical came out of a back-and-forth between development and motion design. I built a first working version straight from the design, knowing the intent was for the cassettes to come out of the Walkman and slide back in on click. Michal, the motion designer, then took that base and reworked it, pushing the easings, delays and durations much further than I had, which is what makes it live as a real object rather than a set of tweens. I ported those settings back into the code to fine-tune the interaction.

A small detail on close, the walkman dips and snaps back over two very short tweens. That bounce is like the “click” of a cassette seating in the slot. Around that: hovering a menu item swaps the background color and its matching sunset layer and mobile gets a haptic pulse.

One small detail you may have missed

### Big title reveals

These are the large scroll-triggered headlines, and their signature detail is a fake-3D extruded thickness. There is no 3D anywhere: each character (each word on mobile) is doubled with a duplicate that rides slightly behind it, faking an embossed depth on the type as the letters slide into place.

The animation is driven by two offsets. A stagger between each letter walks the reveal across the line, and a delay between a letter and its duplicate is what creates the depth. To keep the effect lively, the fade-in runs much faster than the translate.

On mobile we split by words instead of characters to improve performances. A reduced-motion is also set: every duration, stagger and delay drops to zero, so the headline still assembles itself, it just does it instantly.

### Rive for the vector animations

Every Rive loop is gated by an intersection observer: animations start when they enter the viewport and pause the moment they leave, so we never burn GPU on motion nobody can see.

The reduced-motion is also set up here. Rather than skipping the animation, we scrub it straight to its last frame, the composition still reads exactly as designed, it just doesn’t move.

### Motion declared in markup

Two small primitives cover most of the decorative motion on the site, and neither of them needs new JavaScript to be reused.

```
<c-timeline
    cid='TimelineUID'
    class='c-timeline'
    data-scroll-item
    data-timeline-from='{"x":"50%","y":"150%", "rotate":"-45deg"}'
    data-timeline-to='{"x":"-50%","y":"-150%", "rotate":"45deg"}'
    data-scroll-progress-call='progress,Timeline'>
    <!-- My element -->
</c-timeline>
```

The first is a generic scroll-driven timeline component whose entire definition lives in the HTML: a from state, a to state, an optional easing and duration, plus a variant for portrait screens. The markup can also declare, optionally, where in the viewport the animation should start playing and where it should stop, so the same component can be tuned per section without a line of new code. The component parses those values, builds a GSAP timeline, and the `Scroll Piece` drives its progress as the element crosses the viewport. Dozens of animations across the site are built this way, declared entirely in the markup.

The second is the satellite, the small decorative elements that rotate endlessly. Each one picks a random starting angle and direction so no two are in sync, and the rotation runs on **Tempus**, a single shared animation loop for the whole page, normalized against delta time so the speed is identical at 60 or 120fps. Satellites subscribe when they enter the viewport and unsubscribe when they leave, so one that’s off screen costs nothing at all.

### The infinite draggable carousel

The fullscreen infinite carousel is built on GSAP’s seamless-loop technique: a master timeline choreographs each card’s position, scale and tilt. Every other card tilts the opposite way, which gives a fun rhythm. The carousel magnets onto the nearest slide, and the newly active card triggers its own title reveal with a synchronization between slides and titles managed by piecesjs.

### The footer lookbook

Another fun challenge on this project. Only one image is ever open at a time, and the section had to keep exactly the same total height throughout, so browsing the lookbook never makes the rest of the page jump under you.

The tricky part was timing. Each image has to start opening at the right moment relative to its title, while the surrounding content is already being pushed around by whichever image opened above or below it. Getting that to feel seamless came down to a lot of small adjustments.

### Tech stack

**For the back-end:** WordPress with a custom theme based on **Timber**, **Blockstudio** for a visual block editor, **Polylang** for the 7 languages.

**For the front-end**:

-   **piecesjs** to drive the front-end with native web components ([the Codrops intro](https://tympanus.net/codrops/2024/10/21/getting-started-with-piecesjs-building-native-web-components-with-a-lightweight-framework/))
-   **Tailwind v4** and PostCSS
-   **GSAP** for motion (with ScrollTrigger, Draggable and SplitText)
-   **Lenis** for smooth scroll
-   **Rive** for the vector animations
-   **Tempus** as the single shared animation loop
-   **web-haptics** for mobile feedback
-   Built with vite