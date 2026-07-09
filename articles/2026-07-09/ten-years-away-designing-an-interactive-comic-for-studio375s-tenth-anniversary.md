---
title: "Ten Years Away: Designing an Interactive Comic for Studio375’s Tenth Anniversary"
source: "https://tympanus.net/codrops/2026/07/08/ten-years-away-designing-an-interactive-comic-for-studio375s-tenth-anniversary/"
publishedDate: "2026-07-08"
category: "design"
feedName: "Codrops"
author: "Daniel Bassan"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/cover_tya_tympanus.jpg.webp?x68649)](https://ten.375.studio/en "Ten Years Away: Designing an Interactive Comic for Studio375’s Tenth Anniversary Demo")

Ten years is a strange thing to hold. You’ve been going, head down, client after client, deadline after deadline, and then one morning someone says it’s been ten years, and you don’t quite have the words for what that means.

We didn’t want to mark it with a new portfolio site. The usual kind: a refined grid of case studies, a clean about page, a nice animation on the hero. That felt like putting a bow on a filing cabinet. A portfolio says: here is what we have made. But an anniversary is something different. An anniversary has characters. It has chapters. It has people who arrived and changed things and eventually moved on, and a shape that only becomes visible once enough time has passed.

So we made a comic.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/media-01-tya-636x900.webp?x68649)

Ten chapters, one per year, illustrated by Davide Grazi, a local illustrator we know and love, who spent months working with us to give every year its own visual character. From the start, we knew we didn’t want a retrospective that felt like a press kit. Davide’s work is what made that possible. He drew the people. The actual people who showed up, who left their mark, who made each year what it was. Each chapter captures what happened: who joined the studio, who left, what the work felt like, what the vibe was like during those months.

The tone is funny and a little hyperbolic. Ten years of real people, with all the warmth and awkwardness that comes with that.

We also wanted it to exist as a physical object. Before a single line of WebGL was written, there was a printed version: designed, laid out, and actually printed on paper. Something about this story felt like it needed weight, not the kind that lives in a browser tab and disappears the moment you close it, but the kind that sits on a desk or in a drawer.

The interactive experience came after, as a way of sharing the same story with the rest of the world.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/photo-studio.webp?x68649)

## One Year Later

There’s a line on the site: one year later…

It’s not decorative.

The project started in 2025. We had early scroll tests, our first WebGL experiments, preliminary panel layouts. And then, as tends to happen, client work piled up, priorities shifted, and the whole thing went into a drawer.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/media-02-1200x621.webp?x68649)

2025 preliminary drafts

We picked it back up in 2026. Starting again after a year is uncomfortable in a specific way: you can’t pretend the choices you made the first time were inevitable. You see them as choices. You stop justifying the early decisions and start asking whether they were actually right, and sometimes the answer is no.

So we put it in the copy. “One year later” is on the site because it happened, because better late than never, and because keeping a promise to yourself still counts even when it takes a year longer than planned.

## How the Experience Works

The site is a scroll-driven horizontal comic. As you scroll, the camera drifts through the panels of each chapter, following your progress through the year. Everything visual runs inside a fixed WebGL canvas built with _React Three Fiber_. Lenis handles the smooth scroll, feeding real-time position data into the scene. GSAP drives the animations, along with the layer that sits above the canvas: captions, chapter titles, and the other text elements living outside it.

Content comes from a headless WordPress backend, where each year is its own custom post type. On the Three.js side, frame positions and camera targets are hard coded per year in a data file. That was partly to give us precise spatial control over how each chapter reads as a composition, and partly because we never built the scenes in Blender first. Everything was placed directly in Three.js, by feel, iterating in the browser. Hard coding the coordinates was less a design decision than a natural consequence of how we worked.

The background is a GLSL shader plane that responds to scroll velocity. The shadows themselves are generated in the fragment shader using fBm noise, layered octaves of Perlin noise that give the patches their organic, irregular quality.

At rest, or while scrolling slowly, they spread across the plane in loose clusters, like smoke. Scroll faster, and they stretch into thin, directional, elongated streaks that blur the sense of place and push the feeling toward speed, toward time passing. It’s subtle, but it earns its place.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/media-04-1200x675.webp?x68649)

What we saw in our minds 🙂

When you move from one year to the next, the background’s soft shadows dissolve first. Then the individual panels of the new chapter appear separately, scattered, not yet in place, and slide into alignment before merging into the full page. The year assembles itself in front of you.

It’s meant to feel less like a page load and more like something arriving.

## The Book Navigation

This page shows a different experience: a 3D flipbook, rendered entirely in Three.js. Each sheet of the book is a BoxGeometry. Drag left, and the page turns forward; drag right, and it turns back. Gesture handling runs through `@use-gesture/react`, while GSAP drives the actual flip animations. Page turns are accompanied by sound. The book slides in from off-screen on entry, rotates into place, and exits the same way when you navigate to a different year.

## Mouse Trail

We kept asking ourselves: how do you make a webpage feel like a comic without leaning on illustration alone?

When you move the mouse, it leaves a trail. Under the hood, it’s a two-pass WebGL effect: the first pass accumulates the movement into a render texture that slowly fades, and the second converts it into a halftone dot pattern. But the reason we built it isn’t technical. It’s that the benday dot, the grid of tiny circles that gives offset printing its texture, is one of the most recognizable marks of the medium.

We wanted that reference to live in the interaction itself, not just in the illustrations. The dots follow you across the page, bleed onto the panels, and shrink quietly when you hover over something clickable. A small thing, but it mattered to us that the comic logic ran all the way through, not just in the artwork, but in how you move through the experience.

## Optimizations

For the panel textures, we used KTX2 compression via useKTX2 from React Three Fiber’s drei library. The format is interesting because it skips CPU decoding before upload entirely: the GPU reads it directly, in its native compressed format. We’d seen it used on projects we admired and wanted to understand how it worked in practice.

We put real thought into keeping things light. All the comic panels share a single PlaneGeometry instance rather than allocating new geometry per mesh. We capped the device pixel ratio at 1.5 and disabled WebGL features the scene doesn’t use, like the stencil buffer and shadow maps. AdaptiveDpr drops the resolution further if the framerate falls. Materials and GSAP timelines are explicitly disposed of on unmount, so nothing accumulates across navigation. And textures for the next chapter are preloaded during the page transition, so the wait when moving between years is as short as possible.

Is it perfect? No, there are things we’d do differently.

But it’s ours, and that counts for something.

## Sound as a Chapter

Each year has its own audio track, chosen to match the mood of that chapter’s narrative, not to fill silence. It’s a small editorial decision that ends up mattering more than you’d expect: the right piece of music changes how you read a page.

Under the hood, audio is managed via Howler.js. Tracks crossfade as you move between years. On desktop, scroll velocity nudges the playback rate slightly: scroll faster, and the music accelerates with you.

We also skip audio entirely on slow connections. Before anything plays, we check the Network Information API for saveData, 2G, or 3G signals. If the connection looks slow, the music simply doesn’t start. It’s not a dramatic optimization, but it felt like the right call: audio was the heaviest asset on mobile, and forcing it on a weak connection would have been worse than silence.

## What Building for Yourself Feels Like

This is the part that surprised us most.

We build things for clients all the time. There’s always a brief. There’s always someone else’s judgment to factor in, someone to push back if you’re going wrong. Building something to celebrate yourself, with no client in the picture, is a different kind of pressure. The only person who can tell you whether it’s good enough is you, and it turns out that’s not as freeing as it sounds.

What we didn’t expect was how much we’d learn about what the studio actually is by trying to tell its story. You spend ten years inside something and you don’t always see it clearly. Making a comic about those years forces a kind of reckoning: really thinking about each one, choosing what to show and what to leave out, figuring out who the characters actually are. It’s worth it.

For a small studio, getting to ten years isn’t nothing.

We’ve made it with a lot of help from a lot of people, and this project was our attempt to say that out loud instead of just feeling it privately.

## Thank you

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/year2025_07-1200x596.webp?x68649)

This wouldn’t exist without our team, and without everyone, no exceptions, who has passed through Studio375 at any point over the past ten years.

We’re still going.

If you found this useful, or just enjoyed the read, you can follow our work here: [Instagram](https://www.instagram.com/studio375_/), [LinkedIn](https://www.linkedin.com/company/studio375/), [375.studio](https://375.studio/en)