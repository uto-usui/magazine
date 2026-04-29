---
title: "More Than a Portfolio: Building a Scroll-Driven 3D World with Something to Say"
source: "https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/"
publishedDate: "2026-04-28"
category: "design"
feedName: "Codrops"
author: "Joseph Santamaria"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/josephsm_featured.webp?x52581)](https://joseph-san.com/ "More Than a Portfolio: Building a Scroll-Driven 3D World with Something to Say Demo")

## The Brief I Wrote for Myself

For years I have been trying to build something more than a web page. Not a scrolling document. Not a neat stack of cards. Something closer to a place — an environment the visitor actually enters, where every scene is composed with the same care a film sets a frame. That was the brief I wrote for myself at the start of this build: _if someone lands here, they should feel like they arrived somewhere, not just opened a tab._

A scroll-driven 3D environment built from scratch with Three.js, GSAP, WebGL shaders, and Blender. Three months of focused work, three weeks of final polish, and three earlier versions of this same portfolio that never left my machine.

But the real reason I want to walk you through it is not the stack. It is the question the stack was built to answer.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/ccs-img-2-800x450.jpg?x52581)

## Five Years Behind Three Months

This portfolio took three months. It also took five years.

Since 2021, across more than fifty client and personal projects, I have been slowly accumulating the muscles — visual, technical, and stubborn — that this site required. Tutorials were almost never the vehicle. What has always worked for me is reading open-source repositories the way other people read textbooks: clone, break, rebuild, understand. And then build something of my own that forces me past what I already knew.

That is the only way I know how to learn, and it is also why I routinely go days without enough sleep. There is something almost addictive about being able to type code and watch an entire world assemble itself on the other side of the screen. You can shape light. You can choose what gravity does. Every detail bends to your intention if you are patient enough with it.

The question that has kept me going, on every site I have ever built, is the same one: _is this worth sharing?_ Not _is it good enough to ship_. Worth sharing. Those are very different standards.

This portfolio is my honest answer.

## Technical Overview

-   **Three.js + WebGL** for the entire 3D environment
-   **GSAP + ScrollTrigger + Observer + SplitText** for scroll-driven motion and typography
-   **Blender** for modeling, scene composition, and baking
-   **KTX2 / Basis Universal** compressed textures
-   **GPU instancing** for repeated geometry
-   **Low-resolution custom shaders** for mobile performance
-   **Draco compression** for heavier GLTF assets
-   All 3D scenes, environments, media, and core code built from scratch

## A Scroll-Driven World

The hero sets the tone immediately: an architectural 3D environment, lit like an early morning underwater city, with the line _“Architect of immersive dimensions — High-end fullstack development & AI Integrations”_ over it. Scroll a little, and the world shifts. The camera drifts. The line fades to something more personal: _“Creative Software Engineer & UI/UX designer, follower of Jesus Christ †”_.

That second line is not decoration, and it is not there as a statement. It is there because it is the most honest headline I could write about myself, and a portfolio that starts with anything less true than that is already a lie about the person behind it.

The rest of the site is built on the same principle. Each section is its own scene. Each scene is composed so that scroll progression maps to camera movement, object animation, and reveal timing. There are no standard blocks. No traditional grid. What the user is really doing is walking through a space, one beat at a time.

Input handling uses **GSAP’s `Observer`** instead of raw scroll events, which unifies mouse, touch, and trackpad into one consistent experience. Combined with ScrollTrigger, it lets the whole site feel like a single camera take rather than a series of disconnected scrolls.

## What Optimization Actually Taught Me

If one thing stretched me on this build more than anything else, it was performance. When I started, I knew the names of things — KTX2, instancing, LOD, Draco. By the end, I actually understood them.

-   **KTX2 / Basis Universal compression.** Standard PNGs and JPGs are brutal on GPU memory. Moving to KTX2 — decompressed directly on the GPU — was the difference between a scene that crawled on mid-range hardware and one that ran smooth.
-   **GPU instancing.** The floating blocks, the architectural pillars, the debris fields — none of those are individual draw calls. Instancing collapses them into one. That is the difference between 30 FPS and 144.
-   **Low-resolution shaders for mobile.** Not every shader needs to run at full resolution. The atmospheric passes run on a smaller render target and composite back in. The user never notices. The phone does.
-   **Draco compression for GLTF.** Blender exports were enormous before Draco. After Draco, they dropped to a fraction of the size with no visible quality loss.
-   **Dynamic culling instead of static LODs.** Because the site is camera-pathed, I know exactly which objects are on-screen and which are not at any given frame. Rather than building multiple LOD tiers for every asset (which bloats memory), I aggressively cull anything outside the camera frustum and only update what the user can actually see. The result is that the GPU never wastes cycles on geometry the camera is not even looking at.

The site runs at 144 FPS on capable hardware and holds a steady frame rate even on mid-range mobile. None of that was luck. It was discipline applied to every asset, every draw call, every texture — and a lot of learning along the way.

## Project Transitions: The Tesseract Unfolding

Opening a project on the site is not a click that loads a page. It is a transition. When you click on any project card, a **tesseract unfolds in front of you** — a 4D shape that expands and dissolves, as if peeling reality open to reveal the work underneath. The project does not “appear.” It emerges.

Honestly, the tesseract itself was not the hard part. The hard part was figuring out _what_ each project transition should be in the first place. I did not want every project to open the same way. That is the default in most portfolios — click, fade, next page. Done. But default is exactly what I was trying not to build. So a lot of time went into brainstorming transitions that would feel unique to each piece without spiraling into chaos, and the tesseract was the first one that felt right enough to become the signature.

The other genuinely tricky piece was **snap-scroll behavior with GSAP’s `Observer`**. Because the site navigates by full scenes rather than free scroll, each section needs to lock cleanly at its resting point — but without killing the smoothness of mid-scroll transitions. Getting the snap to feel intentional (not rubber-banded, not sluggish, not too aggressive) took a lot of tuning of thresholds, velocities, and easing curves. It is one of those things nobody notices when it works, and everybody feels when it does not.

## Sound: _Vanity_, by Hevel

The soundtrack is a song I wrote and produced myself, under the name **Hevel**. The track is called **Vanity**, and it is not released anywhere else — this portfolio is its home.

_Hevel_ is a Hebrew word. It is the one Solomon uses throughout Ecclesiastes, usually translated as _“vanity”_ but closer in meaning to _breath_, _vapor_, _mist_. Something that looks solid but slips through your fingers the moment you reach for it. A perfect word, it turns out, for what it feels like to build something beautiful, ship it, and watch the feeling evaporate faster than you expected. Every creative I know has felt some version of that.

The site asks the question quietly. The music carries it without needing to say it out loud.

The audio runs on a user-controlled toggle — nothing auto-plays, because nobody should be ambushed by sound on a website. But if you turn it on, the site feels different, because the score was written for this specific walk.

One small touch I love: when you open a project, the soundtrack does not stop or duck in volume — it gets **muffled**, as if you had stepped through a door into an adjacent room and the music were still playing on the other side of the wall. Technically it is a lowpass filter applied on transition, but perceptually it does something much more important: it reinforces the feeling that projects are _places inside the site_, not pages that replace it. When you close the project, the filter lifts and the full soundtrack returns, like you walked back out into the main space.

## An Astronaut, a Moon, and a Message I Did Not Plan

Something happened a few weeks after this portfolio went live that I still cannot fully explain.

On April 1, 2026, NASA launched **Artemis II** — the first crewed mission to the Moon in more than fifty years. Four astronauts, a ten-day journey, and a new record for the farthest human beings have ever traveled from Earth, surpassing the distance set by Apollo 13 in 1970.

The mission’s pilot was **Victor Glover**. He brought a Bible with him into deep space. And during the mission, from inside the Orion capsule as it arced around the Moon, he used his broadcast time not to talk about engineering or the history being made — but to point to something else.

On Easter Sunday, with the Moon close and the Earth a small blue point behind him, he told viewers back home:

> _“When I read the Bible and I look at all of the amazing things that were done for us, who were created, you have this amazing place, this spaceship.”_
> 
> _“Maybe the distance we are from you makes you think what we’re doing is special, but we’re the same distance from you. And I’m trying to tell you — just trust me — you are special.”_
> 
> _“In all of this emptiness — this is a whole bunch of nothing, this thing we call the universe — you have this oasis, this beautiful place that we get to exist together.”_

A day later, just before the spacecraft lost contact during the far-side lunar blackout, he went further. From nearly 253,000 miles away, he said:

> _“As we continue to unlock the mysteries of the cosmos, I would like to remind you of one of the most important mysteries there on Earth, and that’s love. Christ said, in response to what was the greatest command, that it was to love God with all that you are.”_

**Glover** has been open about his faith for years. He once said, plainly: _**“We need Jesus — whether here on earth or orbiting the moon. Jesus is that bridge that spans sin and gives us a chance of going to heaven.”**_

Now here is what stops me. 😳

Months before any of this — **before Artemis II launched**, before Glover’s broadcast, before the blackout, before the Pacific splashdown — I had already placed **a small astronaut** at the center of the most important scene in my portfolio. A tiny figure, alone in a vast space, standing in the middle of a message about a Creator who loves us and a Savior who came for us. I did not know what Victor Glover was about to say from 253,000 miles away. I just knew I wanted an astronaut there.

And then, weeks later, a real astronaut said — from deep space, on live broadcast, to the entire world — the exact thing my fictional one was pointing toward.

**I could not have scripted that.** I do not think I was supposed to. It is the kind of thing that, when you notice it, you start to wonder **if maybe the story is being written by someone bigger than any of us.**

## The Scene That Is Not Like the Others

About halfway through the site, the environment changes. The palette shifts to deep red. Rose petals drift through fog. A small astronaut figure stands in the middle of a field of roses. Then the scene breaks — fractured statues, cracks of lava, the astronaut now drifting through the debris.

Technically, this was the most demanding sequence in the entire site. A few of the pieces that made it hard:

-   **Modeling a breaking floor in Blender.** The transition from the rose field to the lava scene is literally the ground cracking open beneath the astronaut. Sculpting that fracture pattern so it reads correctly from multiple camera angles, then setting up the mesh so it could collapse on cue, was one of the longest Blender sessions of the whole project. Every rock, every edge, every shard had to feel earned — not randomly generated.
-   **Two completely different particle systems.** The rose field runs a particle system of drifting petals, tuned for softness and slow vertical motion. The lava scene runs a second, totally separate particle system for rising embers and sparks — faster, hotter, with different emission patterns and shader behavior. Getting both to sit inside the same performance budget without one starving the other took real tuning.
-   **Switching scroll modes mid-site.** The rest of the portfolio uses a free, continuous scroll feel. But this sequence needs something different — **snap-block scrolling**, where each of the four moments locks into place and the user advances beat by beat, like turning the pages of a small book. Implementing that without it feeling jarring (and without breaking the free-scroll behavior in adjacent sections) meant writing logic that swaps scroll modes dynamically based on which scene the user is in. GSAP’s `Observer` handles the input unification, but the mode-switching state machine on top of it was its own rabbit hole.
-   **Cross-fading animation states on the astronaut character.** This was probably the hardest part. The astronaut has four distinct animation states across the four moments of the sequence — **falling, walking forward, walking backward (when turning away and returning), and idling.** Transitioning between them without visible pops or awkward interpolation is not trivial. Each state had to blend smoothly into the next, timed to the exact beat of the snap scroll, which meant custom transition curves for every crossfade.

Every other scene in the portfolio serves this one. I built it this way on purpose. Because the text that appears here is the most important text in the entire site, and I wanted the medium to match the weight of the message.

The sequence is a short, honest walkthrough of the news I most want to share with anyone who reaches this part of the site:

> _You were made on purpose, by a Creator who loves you and has good plans for you — “plans to prosper you and not to harm you, plans to give you hope and a future” (Jeremiah 29:11)._

Something in humanity has broken that connection, and all of us feel it at some level — even in the middle of our best work. Jesus is how it gets repaired. Not as a religion. Not as a rulebook. As a Person who closed a distance none of us could close ourselves.

The one verse I want to leave with you, because it is the one that has held me together more than any other, is this:

> _“I am the way, the truth, and the life. No one comes to the Father except through me.”  
> — Jesus (John 14:6)_

That is not an arrogant sentence if it is true. It is the most generous sentence ever spoken, because it means there is a way home, and He has told us where it is.

If you are reading this and none of it lands, that is okay. You did not skip it, which is already more than I could ask. And if any part of it stays with you after you close this tab, that is not me — that is Someone who has been drawing you for longer than you realize.

## The Contact Menu — and a Small Trick I Loved

The site has no navbar. The only CTA is a single _“CLICK TO CONTACT”_ in the top-right corner. But clicking it is not a dropdown.

The menu opens with a **WebGL shader transition** I call **Ink Bleed** — a burning-paper / ink-spreading effect, as if the page were being consumed and something new were coming through from underneath. A normal dropdown would have worked fine. It also would have betrayed everything else. If every pixel elsewhere was crafted, the menu could not be a compromise.

Inside: socials, WhatsApp, Gmail, and the ways to reach me. Clean, immediate, in the same design language as the rest.

### The NDC Trick

There is one small thing in this shader I want to call out, because it is the kind of detail that only matters if you have tried to build something like it and hit the usual wall.

The site lives inside a Three.js scene, which means every mesh normally gets projected through the camera. For a full-screen 2D overlay like this one, that is a waste — you are fighting the 3D pipeline to do a 2D thing. The cleanest solution is to skip the projection entirely and write directly into normalized device coordinates.

The vertex shader does exactly that:

```
varying vec2 vUv;
void main() {
    vUv = uv;
    // ✨ NDC MAGIC: Ignore projectionMatrix and modelViewMatrix.
    // Position the vertices directly on the 2D screen.
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
```

By assigning `gl_Position` straight from `position.xy`, the quad is pinned to the screen regardless of what the camera is doing. No projection, no transforms, no surprises when the hero scene moves around underneath. The overlay is _of_ the site but _outside_ the 3D space, which is exactly what you want a contact menu to be.

### The Fragment: Ink That Behaves Like Ink

The expansion itself is driven by fractal Brownian motion (fBM) over simplex noise, with two inputs shaping the feel: `uHover` for idle breathing and `uClick` for the actual opening.

```
float noise = fbm(vUv * 4.0 - uTime * 0.4);

float radius = (uHover * 0.45) + (uClick * 4.5);

// ✨ ORGANIC MAGIC:
// As you click, noise affects the edges more strongly,
// simulating ink "splashing" as it expands quickly.
float dynamicNoise = noise * (0.8 + uClick * 1.5);
float edge = dist + dynamicNoise;

// ✨ DYNAMIC SOFTENING:
// At rest (hover), the edge is more defined.
// While traveling across the screen, the edge gets softer and blurrier.
float softness = 1.2 + (uClick * 1.0);

float alpha = 1.0 - smoothstep(radius - softness, radius, edge);
```

Two decisions here that I think make the effect feel alive:

1.  **Dynamic noise amplitude.** At rest, the noise is subtle — the ink “breathes” quietly around the button. On click, the noise amplitude scales up with `uClick`, which makes the edges splash outward rather than expand cleanly. Ink in the real world does not advance in a perfect circle. This shader does not either.
2.  **Dynamic softness.** The edge is crisp when the menu is idle and softer when it is actively spreading. That matches how your eye reads motion: fast-moving things blur, still things sharpen. The shader bakes that physical intuition directly into the `smoothstep` range.

None of this is technically difficult. It is a small shader. But the reason I am showing it is that these are the kinds of details that separate an effect that looks _generated_ from one that looks _crafted_. A contact button could have been a dropdown. Instead, it became one of my favorite ten seconds in the whole site.

## Closing Thoughts

Somewhere between month one and month three of this build, I stopped thinking about the site as a portfolio at all. It became a small world I was tending, adding rooms to, cleaning up, walking through to see if it still felt honest. The code was the tool. The world was the point. And the world existed to carry something I actually wanted to give away.

If you walk away from this article with one thing, I hope it is this: your creativity comes from somewhere. In my life, I believe it comes from a Creator who has been patient with me, who has good plans for me even in the seasons I walked away from Him, and who has always been there when I came back. Anything worth anything in what you just read came from Him, not from me.

Thank you for reading. Thank you to Manoela and the Codrops team for giving this work a place to land. And to every developer and designer out there still fighting for craft — keep going. Build something you actually want to share. The work will be better, and so will you.

> “I will praise you, Lord, with all my heart; I will tell of all the marvelous things you have done.”  
> — Psalm 9:1