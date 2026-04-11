---
title: "The Exat Microsite: Pushing a Typography Showcase to New Creative Extremes"
source: "https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/"
publishedDate: "2026-04-10"
category: "design"
feedName: "Codrops"
author: "Studio Size"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/exat_cover_codrops.jpg?x34745)](https://exat.hottype.co/ "The Exat Microsite: Pushing a Typography Showcase to New Creative Extremes Demo")

When [Hot Type](https://hottype.co/) approached us to build the promotional site for Exat, their most ambitious typeface release yet, we knew a static specimen page wouldn’t be sufficient.

Exat is a 21-style, 1,715-glyph typographic system inspired by Croatian modernism and the EXAT 51 art collective. The site needed to reflect the logic, structure, and energy of that context.

The result is a scroll-driven experience where typography reacts, shifts, and transforms through interaction. This case study focuses on the design intent behind those decisions and how motion and interaction were used to communicate the type system.

## Design Task

The core task was to present Exat as a system rather than a collection of styles. The typeface carries historical and cultural references, but it is also a contemporary variable font built for flexible use.

**The microsite needed to:**

-   Show the full range of the typeface without overwhelming the viewer
-   Make variation legible through interaction, not explanation
-   Balance expressive moments with clarity and restraint
-   Work as both a promotional site and a functional specimen

Rather than separating “content” and “interaction,” we treated typography itself as the primary interface element.

## Structure and Flow

The site is structured as a continuous vertical experience. Each section introduces one aspect of the type system, then moves on before it becomes repetitive.

Calmer sections focused on reading and comparison are followed by denser, more expressive ones. This pacing was important to prevent visual fatigue while still demonstrating the font’s range.

Scroll is used as a structural tool rather than a trigger. Progress through the site is directly tied to movement, allowing the experience to feel controlled and predictable, even when the visuals become more complex.

## The Glyph Grid

The opening glyph grid introduces Exat through proximity-based interaction. A field of lowercase characters responds to cursor position, shifting weight and color based on distance.

This interaction was designed to communicate several things at once:

-   The continuity of the variable weight axis
-   The precision of interpolation between extremes
-   The character of the typeface under stress

There are no instructions. The behavior is immediate and readable. On touch devices, where this interaction would lose clarity, the grid is replaced with a static fallback to avoid forced or ambiguous behavior.

**How It Works**

We calculate the Euclidean distance from the cursor to each letter’s center, then apply styles based on distance thresholds:

```
const frames = el.querySelectorAll(".frame");
const radius = remToPx(6); // Base influence radius
const distances = new Array(frames.length).fill(0);

// Define concentric "rings" of influence
const rules = {
    ring1: { distance: radius * 1.00, weight: 200, color: "#0000cb" },
    ring2: { distance: radius * 0.75, weight: 300, color: "#2546FF" },
    ring3: { distance: radius * 0.55, weight: 400, color: "#5C92FF" },
    ring4: { distance: radius * 0.45, weight: 500, color: "#FFCE2E" },
    ring5: { distance: radius * 0.35, weight: 700, color: "#FFAE00" },
    ring6: { distance: radius * 0.25, weight: 800, color: "#FF6200" },
    ring7: { distance: radius * 0.125, weight: 900, color: "#FF0B00" },
};
```

On every mouse movement, we recalculate distances:

```
function processMouseMove(e) {
    for (let i = 0; i < frames.length; i++) {
        const rect = frames[i].getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        distances[i] = Math.sqrt(
            (e.clientX - centerX) ** 2 + 
            (e.clientY - centerY) ** 2
        );
    }
}
```

The animation loop applies styles via CSS custom properties:

```
function animate() {
    for (let i = 0; i < frames.length; i++) {
        const dist = distances[i] / modifier.val;
        const fr = frames[i];
        
        // Find which ring this letter falls into
        if (dist > rules.ring1.distance) {
            fr.style.setProperty("--fw", 200);
            fr.style.setProperty("--color", "#0000cb");
            // Fade out letters far from cursor
            const opacity = normalize(dist, rules.ring1.distance * 2.5, rules.ring1.distance);
            fr.style.setProperty("--opacity", isHovering ? opacity : 1);
        } 
        else if (dist < rules.ring7.distance) {
            fr.style.setProperty("--fw", 900);
            fr.style.setProperty("--color", "#FF0B00");
        }
        // ... check other rings
    }
    
    if (isReady) requestAnimationFrame(animate);
}
```

## Subtle Motion as Context

Not all motion is meant to be noticed. In several sections, large numerals move in slow sine-wave patterns that react to scroll speed.

These movements do not carry information on their own. Their purpose is to add temporal depth and prevent the page from feeling static during pauses. When scrolling stops, the motion settles. When scrolling accelerates, so does the oscillation.

This approach keeps the page active without competing with the typography.

## **Variable Font Exploration**

The Design Space section focuses on controlled comparison. Hovering over style names morphs the specimen text between weights and widths in real time.

Transitions are smooth and continuous, avoiding hard jumps between styles. This allows users to understand the relationship between extremes rather than treating styles as isolated presets.

The interaction is intentionally limited in scope. One text block, one axis at a time. The goal was clarity, not abundance.

## Scroll-Driven Panels

To present font weights and key characteristics, we used stacked panels within a pinned scroll section. As the user scrolls, panels replace each other vertically, creating a clear sense of progression.

Each panel triggers its own internal text animations only when it becomes visible. This keeps attention focused and prevents multiple elements from competing for emphasis.

Scroll direction is fully reversible. Moving backward restores previous states, reinforcing the idea that scroll position equals state, not sequence.

## **Expressive Typography Moments**

Certain statements are treated differently. Large typographic lines rotate in three-dimensional space as they enter the viewport, using a full X-axis rotation before settling into place.

These moments are used sparingly. Their role is to punctuate the experience and reference the experimental spirit of the source material without turning the entire site into a display of effects.

## Collaboration and Constraints

The project was developed in close collaboration with [RISE2 Studio](https://rise2.studio/), with design and development evolving in parallel. Performance considerations informed design decisions early, particularly in sections with many simultaneous animations.

The Tech Stack:

-   **WordPress** with a custom theme and ACF for content management
-   **GSAP + ScrollTrigger + SplitText** for all animations
-   **Lenis** for buttery-smooth scrolling
-   **Splide.js** for infinite marquees
-   **Variable fonts** for real-time weight/width morphing

Motion loops and interactions pause when off-screen, and smooth scrolling is applied selectively. On mobile devices, interactions are simplified rather than replicated.

Performance was treated as part of the design system, not a technical afterthought.

## **Outcome**

**[The Exat microsite](https://exat.hottype.co/)** presents typography as an active system rather than a static artifact. Interaction is used to reveal structure, range, and behavior, not to decorate the page.

The result is a specimen that communicates how the typeface works by letting users experience it directly.