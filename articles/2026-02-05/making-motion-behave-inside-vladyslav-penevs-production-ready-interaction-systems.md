---
title: "Making Motion Behave: Inside Vladyslav Penev’s Production-Ready Interaction Systems"
source: "https://tympanus.net/codrops/2026/02/04/making-motion-behave-inside-vladyslav-penevs-production-ready-interaction-systems/"
publishedDate: "2026-02-04"
category: "design"
feedName: "Codrops"
author: "Vladislav Penev"
---

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/penev.webp?x99210)

Hey — I’m Vladyslav from Zaporizhzhia, Ukraine. I build high-performance interactive web experiences and I’m the author of the [StringTune](https://string-tune.fiddle.digital/) library. Codrops was always my go-to place to find “artifacts” to dissect and learn from, so being featured here is special.

I didn’t start with the web. I spent years on C++ and C# dreaming of GameDev. In university, I teamed up with a friend to build a custom game engine for our coursework project. During our final presentation, a senior faculty member asked a question that stuck with me: “Why build this, if there are already ready-made solutions?“ I froze — but our mentor, Serhiy Shakun, answered for us: “Because someone has to build the ready-made solutions.”

That perspective changed everything. I stopped seeing tools as magic boxes and realized that everything we use was engineered by someone. That drive to build tools for others is what led to StringTune. Today, I want to share a few projects built with it in collaboration with Fiddle.Digital.

## [Fiddle.Digital Design Agency](https://fiddle.digital/)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/b3dbae38-59da-4cc9-b14d-3ea1655e4064-1751897403310-800x600.jpg?x99210)

Fiddle.Digital is an agency site, so the interaction layer had to feel premium and stay reliable in production. Dmytro Troshchylo led the design and most of the layout, and I handled the motion layer — built as interface behavior, not decoration.

We shipped it in waves: each iteration hit real constraints (timing, responsiveness, edge cases) until it felt dependable.

**Recognition:** Awwwards SOTD • FWA SOTD • Webby (2025).  
**Stack:** Nuxt • StringTune • Strapi • Web Audio API

We needed a tiny bit of depth: the block should “float” with the cursor, but softly — no wobble circus. I used SVG instead of the usual canvas setup — it stayed lightweight and stable, and it matched the soft, controlled depth the design needed.

We wanted a living icon wake behind the cursor. I didn’t want a hundred DOM nodes chasing the pointer, so I encoded the trail into a noise texture: pixel brightness = icon ID. The shader reads that texture and draws the trail on the GPU — so the effect scales without DOM spam.

The brief was simple: turn the cursor into a preview window. It kept showing up as a recurring UI pattern, so I packaged it into a reusable piece (StringCursor) instead of hardcoding it into one page. A few HTML attributes define the states, and the behavior plugs in cleanly.

## [Kaleida](https://www.wearekaleida.com/)

Kaleida is a global experiential studio focused on holographic and immersive work — and this site was a reliability/performance project first. It’s media-heavy and scene-heavy, with basically zero tolerance for “it’s fine on my machine.”

Dmytro Troshchylo led the design and most of the layout, and I built the parts that move and hold up: scroll behavior, WebGL moments, and the performance work you only notice when it’s missing.

The media load forced me to take delivery seriously. I rebuilt the lazy-loading layer under real content pressure, then went deep on video: I implemented HLS and wrote a small Node.js pipeline that converts videos uploaded to Strapi into HLS variants — so playback streams smoothly instead of choking.

**Recognition:** Awwwards SOTD • FWA SOTD • CSS Design Awards SOTD  
**Stack:** Nuxt • StringTune • Strapi • Node.js • HLS • WebGL

I mapped each city label’s position in the viewport to a 0→1 progress value (StringProgress) and used that number to drive the highlight — basically a small script that updates a CSS variable, and the text color/opacity responds to it.

We tried masks + images first, and on real devices it turned into a slideshow. I moved the transition into WebGL: a slice-based reveal with small overlaps for clean timing, working with both PNG and SVG assets, and I wired it into the loading pipeline so assets only start decoding when they’re actually needed — the page doesn’t try to render every heavy piece upfront.

That “takeoff gauge” is intentionally minimal: WebGL draws the lines, and the motion is driven by two signals — scroll progress as the anchor and inertia as the lag. Progress follows scroll immediately; inertia trails behind it, which is why it feels weighted instead of rigid. StringTune handles the progress + inertia plumbing; WebGL just renders a single strip of lines driven by a small per-line data buffer.

## [StringTune](https://string-tune.fiddle.digital/)

StringTune started as a “clean promo site” — a page where each section would showcase a single idea. That plan lasted about five minutes. It turned into an interactive, slightly game-ish site where the library isn’t explained — it’s the thing running the whole experience.

This is also where the library matured under real pressure: a few interactions started as one-off experiments, then proved reusable, so I turned them into proper modules. And because typography is the centerpiece here, I had to make the text system behave like real type — kerning included. Fake spacing becomes painfully obvious when the headline is the hero.

**Recognition:** Awwwards SOTD • CSS Design Awards WOTD • Orpetron SOTY  
**Stack:** Nuxt • StringTune • Three.js

The sword had to be controllable from three directions at once: scripted poses, scroll-driven transitions, and cursor parallax. I split control into three layers and blended them additively into one final pose. Otherwise you get the usual “who wins this frame?” mess — inputs fight, the model jitters, and nothing reads as intentional. This way the sword stays coherent no matter what’s driving it.

We didn’t want pixelation to feel like a filter taped on top of the scene. So instead of one global overlay, I made the cursor spawn short-lived hotspots that flare up and decay. Flat effects look glued-on because they have no local cause. Hotspots make it feel like the surface reacts — and then heals.

These buttons had to react like material under a moving light, not like generic hover CSS. I built it with StringSpotlight: cursor motion is tracked globally, and each button computes its own angle/distance locally to shape the highlight — so the lighting stays consistent without every component reinventing the math.

The text here doesn’t “reveal nicely” — it bends, and it bends for a reason. I tied the deformation to scroll inertia, so speed becomes the signal: scroll harder and the twist gets stronger, scroll gently and it stays subtle. Position alone always looks decorative. Inertia makes it feel like the page has weight.

SkillHub couldn’t be a “page of links,” because people needed to actually use the demos — not just stare at thumbnails. So I built it as an interactive catalog where you can launch an effect in a sandbox or grab the raw HTML instantly, depending on what you came for.

## [StringTune-3D](https://github.com/penev-palemiya/StringTune-3D)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/ST3D-1-800x600.jpg?x99210)

When I started building StringTune-3D, I kept tripping over the same UI problem: adding Three.js pushed everything into an “engine mindset”. The DOM turned into a passive reference, and I’d end up writing glue code just to keep 3D aligned with layout, scroll, and responsive states. I wanted to keep working the way the web already works — where HTML and CSS stay the source of truth.

So I built the foundation around “layout as truth”: 3D objects are anchored to real DOM elements and keep tracking their position and size through scroll and resize, so the scene behaves like a disciplined UI layer instead of a separate world. That’s what powers the model catalog demo — the layout drives where each preview lives, and CSS drives how it feels. Post-processing is authored the same way: a single –filter value is parsed into an effect chain, mapped to shader uniforms, and applied during render, so hover states and transitions can animate bloom/blur/pixel the same way they animate any other CSS state. Custom filters plug into the same pipeline through a registry, which makes “design-system effects” possible without hardcoding one-off shader logic per page.

For particles, I wanted transitions that feel like UI state changes, not hand-scripted simulations. In instanced mode, switching the source (a model-driven distribution or a procedural shape) triggers a morph of instance positions: the system captures the current point set, builds the target set, and interpolates between them with the timing and easing you’d expect from CSS transitions — and it doesn’t start the morph until the new geometry is actually ready. It’s a small detail, but it’s the difference between “nice demo” and “usable in production,” because it turns a heavy visual change into a predictable state transition.

And because typography is where fake systems get exposed fast, I made 3D text a first-class citizen instead of a separate pipeline. The text comes from the DOM, gets converted into extruded geometry with bevel, and then behaves like any other object in the scene — meaning it can be lit, shaded, filtered, and animated through the same CSS-first control surface. The point across all three examples is consistent: I’m not trying to hide Three.js — I’m trying to make 3D obey the same rules as the rest of the web, so interaction stays declarative and layout-driven.

## About

I’ve been building for the web since 2014, shifting fully into creative development in 2022. While I specialize in motion and WebGL, I maintain a full-stack approach. I believe that to build a truly seamless experience, you need control over every layer—from the backend logic to the final pixel.

I’m part of Palemiya — what started as a chaotic student crew (no Git, no safety nets) evolved into a shared philosophy: ship real things, stress-test them, and raise the bar until “good enough” stops being acceptable. I bring this same mindset to my ongoing collaboration with Fiddle.Digital, focusing on high-performance motion and interaction systems (StringTune).

## Philosophy

I don’t trust ideas until they survive the browser. I start with the smallest version that proves the “read” in motion — because the perfect thing in your head often turns into jitter, layout fights, or a dead interaction. Once the core works, I abstract aggressively: not for complexity, but because clean structure makes iteration cheap. If a pattern repeats, it becomes a module — and it has to stay honest under real constraints.

## Tools & Workflow

My core stack is Nuxt/Vue/TypeScript with Strapi and Node.js, plus WebGL/Three.js when the UI needs a real rendering layer. I try to keep motion systems boring in the best way: a few normalized inputs (scroll, cursor, velocity) feed predictable state (often via CSS variables), and everything else reacts locally — so performance doesn’t collapse the moment real content shows up.

## Next experiments

I’m exploring Rust/WASM and WebGPU for the same reason: more headroom for effects that don’t fit comfortably into “just JS” (heavier simulation, signal processing, bigger scenes). I’m also curious about CSS Houdini — mostly because it’s still one of the few places where CSS can surprise you in a useful way.

## One last thing

That question from university still sticks with me: “Why build this if there are already ready-made solutions?” The answer is simple: Because someone has to build the ready-made solutions.

If you’re reading this and sitting on a “weird idea” — ship a small version and make it real. The web is still one of the best places to turn curiosity into a working artifact.

**Connect with me:** [GitHub](https://github.com/penev-palemiya) • [LinkedIn](https://www.linkedin.com/in/penev-tech/) • [X (Twitter)](https://x.com/penev_tech)