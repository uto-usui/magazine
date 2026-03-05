---
title: "On adding homepage delight"
source: "https://karlkoch.me/writing/on-adding-homepage-delight"
publishedDate: "2026-03-04"
category: "design"
feedName: "Sidebar"
---

Music is personal. When I built the section for my releases on this site, a simple grid of album covers didn’t cut it. I wanted something that evoked flipping through a crate of records like I do at home. That slight lean, the way one sleeve lifts and its neighbours nudge aside. So I built a shelf. This isn’t anything super new, of course, but it’s mine and it feels right.

What emerged was a component with more craft decisions than I’d planned. Springs, deflection physics, velocity gating, layered hover effects. None of it is strictly necessary, but together it makes the interaction feel tangible. Here’s what went into it.

**Springs as material**

The shelf uses a single spring config for every animated property: `{ stiffness: 200, damping: 24, mass: 1 }`. I tried a bunch of values. Stiffer felt snappy but harsh; softer felt mushy. This sits in between, responsive enough that it doesn’t lag behind your cursor, but soft enough that the motion has weight.

Toggle to compare spring tunings — the shelf uses balanced

**Deflection**

When you hover a record, it lifts. Its siblings don’t stay put but deflect away, as if you’d nudged them. The push falls off with distance: records further from the hovered one move less. The formula is simple — `pushAmount = 16 / Math.max(1, Math.abs(distance) * 0.6)` — but the effect is that the whole row breathes with you. Notice, this has no velocity gating so it flickers if you move fast (more on this below).

Hover a square — siblings deflect away like thumbing through records

**Velocity gating**

Fast mouse sweeps across the shelf used to trigger a flicker of hovers (see above). Annoying. I added velocity gating: if your cursor is moving faster than about 0.8 px/ms when it enters a record, we ignore the hover. You have to slow down to select something. It feels right. You’re not supposed to “accidentally” land on a record when you’re just passing through.

Sweep fast across each shelf — ungated deflects violently, gated stays calm. Use a mouse on desktop for best effect.

**The hover stack**

A lifted record isn’t just bigger. It scales up slightly (1.12×), jumps in z-index so it’s on top, gets a subtle glossy sheen overlay, and a gradient from transparent to dark at the bottom with the title and a “Listen” link. Each layer is small. Together they read as a focused card floating above the shelf.

Toggle layers to see each hover effect in isolation

**Progressive enhancement**

Not everyone wants motion. `prefers-reduced-motion` gets a clean grid instead, so no springs, no deflection, just cards with a simple hover overlay. On mobile, the shelf becomes a horizontal scroll with snap points. Same content, different interaction model. The goal isn’t to force the shelf on everyone; it’s to give the right experience for the context.

**Invisible when it works**

If you visit the homepage and the Music section feels natural—a record lifts when you hover, the row adjusts, nothing jitters—the craft is doing its job. The details fade into the background. That’s the point. Much of what makes [fluid UI feel right](https://karlkoch.me/writing/10-principles-for-fluid-ui) is the same: springs, interruptibility, respecting input. The vinyl shelf is one implementation of those ideas, tuned for a specific metaphor. A crate of records, brought a little closer.