---
title: "More Three.js Speakers, More Ideas from Paris"
source: "https://tympanus.net/codrops/2026/09/03/more-three-js-speakers-more-ideas-from-paris/"
publishedDate: "2026-09-03"
category: "design"
feedName: "Codrops"
author: "Manoela Ilic"
---

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/speakers_threejs_conference.png.webp?x57826)

The first [Three.js Conference](https://threejs.paris/) is getting closer, and there are still more people to meet before everyone heads to Paris.

In our [first look at the lineup](https://tympanus.net/codrops/2026/07/16/meet-the-speakers-of-the-first-three-js-conference/), we asked some of the speakers what they’ve been building, exploring, and excited to bring to the conference. Since then, more answers have come in, giving us another glimpse into the people behind the talks and the ideas they’re bringing with them.

And if you’ve been thinking about joining them in Paris, now’s a pretty good time to make it official. **Codrops readers can get 15% off their tickets with the code** `CODROPS`**.**

Here’s the full lineup, followed by another round of speaker insights.

-   Mr.doob (Three.js developer)
-   Bruno Simon (Three.js Journey)
-   Cassie Evans (GSAP)
-   Edan Kwan (Lusion)
-   Renaud Rohlinger (Utsubo)
-   Célia Lopez (OFF+BRAND)
-   Anderson Mancini (Neotix)
-   Thomas Nattestad & Natalia Markoborodova (Google)
-   Jean Carlo Deconto (a.k.a. sunag, TSL developer)
-   Robin Payot (Zelda TSL)
-   Romain Briaux & Julie Marting (Hervé Studio)
-   Damien Mortini (Shopify)
-   Patrick Heng & Justine Soulié (Ponpon Mania)
-   Vicente Lucendo (Abeto)
-   Kim Lê Boutin (loadmo.re)
-   Daria Nevezhyna (Rive Ambassador)
-   Antoine Ménard (Merci Michel)
-   Dennis Smolek (R3F Core Team)
-   Kris Baumgartner (Poimandres)
-   Lovis Odin (fal.ai)
-   Cassandre Lugay (Interactive Designer, Moment Factory)
-   Misha Kiiatkin (Technical Artist, edclub)
-   Sean Looper (CTO, Miris)

And now, onto the speakers. Here are the latest answers from some of the people getting ready to head to Paris.

## Antoine Ménard

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/merci.png.webp?x57826)

At the moment, a big part of Antoine Ménard’s brain space is taken up by preparing his talk for the Three.js Conference. But interactive storytelling has been a constant obsession for him, especially the question of how new technologies can open up fresh ways to tell stories on the web.

At Merci-Michel, that curiosity often takes the form of real-time 3D games and worlds, combining technical depth and realism with a more artistic, illustrative approach. In Paris, Antoine will take us behind the scenes of that process, sharing a few secrets and a sneak peek at some of the projects the team has coming this fall.

One of those projects is a browser-based F1 game for an iconic brand, which has become an especially fun creative and technical playground. He’s looking forward to showing how it came together during his talk.

And if you want a taste of the team’s work right now, check out [No Mercy Michel](http://no.merci-michel.com/), already featured on the Three.js homepage. You might even meet Antoine’s bot, King Antoine. He talks a big game, but he’s absolutely terrible.

## Lovis Odin

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/lovis.png.webp?x57826)

Lovis Odin’s work sits right at the intersection of 3D and generative models. As a Creative Engineer at fal, he spends his time exploring the wider generative media landscape, building and optimizing ComfyUI pipelines, and helping creative teams bring these tools into production. Lately, he’s been particularly interested in using Three.js scenes and Gaussian splats as training data, giving video models access to real geometry and camera movement instead of having to guess.

For his Paris talk, Lovis wants to show what happens when you treat a Three.js scene as model training data. His process starts with a 3D scene or splat, turns it into a synthetic dataset, and uses that data to train a LoRA that can transform a grey clay render into a photorealistic video while preserving the original camera move.

His latest experiment is a render-to-real LoRA for video, trained from around 2,000 synthetic pairs and curated down to roughly 200 useful examples. Alongside that, he’s been building custom ComfyUI pipelines and model endpoints at fal, experimenting with open-source LoRAs, and working on a holographic trading card generator that turns a photo into a 3D mesh and animated card. He’s also currently looking into 4D Gaussian Splatting datasets to push the 3D-to-video side further.

One of his favourite experiments is his **multi-angle camera control LoRA**, built from 3,000+ Gaussian Splatting renders across 96 camera positions. The whole dataset was generated directly from a Three.js scene, with no manual annotation or scraping. You can [explore the open-source LoRA on Hugging Face](https://huggingface.co/fal/Qwen-Image-Edit-2511-Multiple-Angles-LoRA). The experiment also taught him an unexpected lesson: pretty renders aren’t necessarily better training data. His deliberately ugly, synthetic clay renders actually produced better models.

## Cassandre Leguay

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-1-1200x673.png.webp?x57826)

Lately, Cassandre Leguay has been finding inspiration by stepping away from the screen and spending time outdoors. Trail running has become a way for her to reconnect with her sensitivity and creativity, which she brings back into her work designing immersive experiences.

That shift toward the physical world has also shaped her work since joining Moment Factory. Working on projects inspired by live entertainment has changed how she thinks about user experience across physical and digital spaces. Recently, she and her designer colleagues took that thinking into a vibe coding game jam, creating working prototypes for interactive games in the physical world. The speed and autonomy of the process made it possible to test ideas quickly and see where they could go.

And when Cassandre is designing an interaction for an installation, there’s a good chance she’ll be standing up and moving her hands through the air like a mime, acting out the experience she’s imagining. “Out of context, though… it can look pretty strange.”

## Renaud Rohlinger

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/ren.png.webp?x57826)

Renaud Rohlinger has been thinking about what happens when performance, Gaussian Splatting, and WebGPU all collide. With WebGPU moving more of the heavy lifting off the CPU, splatting makes for a particularly good stress test, with hundreds of thousands of primitives needing to be sorted every frame. Much of his time goes into figuring out where the frame time is actually going, which, as he puts it, is “never where I assumed.”

He’s also been experimenting with Gaussian Splatting and TSL precompilation, exploring how Three.js’ Node Material System can skip the usual `build`/`buildAsync` step.

As for his Paris teaser? **“How to improve your performance in Three.js in a non-trivial powerpoint/keynote format!”** We’ll let him explain that one.

And after watching an AI go completely off the rails for hours, Renaud has developed a simple debugging ritual: **“What is the before/after status?”**

## Kim Lê Boutin

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/kim.png.webp?x57826)

Kim Lê Boutin’s attention is currently on New Ways of Seeing, the festival she founded in Paris in 2025. Inspired by John Berger’s 1972 book and its questions around how technology shapes the way we look at images, the festival brings artists, designers, researchers, and creative technologists into the same conversation. After its first edition during Paris Art Week, Kim is now deep into shaping the second. [Visit New Ways of Seeing →](https://newwaysofseeing.com/)

Her Three.js story goes back to 2012, when she came to the technology from fashion art direction, at a time when the immersive website was still something of an anomaly. Since then, immersion has become the norm, from AR and VR to mixed reality and smart glasses. That shift led her to develop her idea of “Positive Friction” and launch loadmo.re, a curated index of non-standard mobile interfaces. Her talk in Paris will trace that journey, from experiments at KENZO to loadmo.re and New Ways of Seeing, asking where designers can still introduce friction now that seamlessness has become the default.

She’s also been deep in a research rabbit hole for a talk commissioned by production company DIVISION, tracing the history of AI from the Dartmouth Summer Research Project in 1956 to today and looking at the cultural narratives that shaped the field along the way. She’s now turning that research into an essay.

For something a little more visual, Kim points to _La Voie des Fleurs_, an installation built in Three.js by makio68 and shown at the Expanded Media Art Biennale in Budapest. Visitors create a digital floral arrangement inspired by ikebana, but only after sitting through a guided meditation. The pause is part of the work: by the time visitors are allowed to touch anything, they’ve already approached the experience differently.

## Misha Kiiatkin

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/mish.png.webp?x57826)

Misha Kiiatkin has just finished a run of projects built with native Three.js and R3F and is ready to dive into TSL and WebGPU. He’s excited by how close the visual possibilities are getting to the kind of performance associated with engines like Unreal or Unity. He’s also been spending time on 3D animation, exploring how to make movement feel more natural and convincing. For Misha, that’s a big part of what makes a game feel alive.

At edclub, experiments with hand-painted models grew into an entirely new game built around hand-painted assets. It’s a style he rarely sees in Three.js games, and one that comes with plenty of practical questions around time, visual results, and performance. His talk in Paris will reveal the pipeline behind the project, combining common approaches to creating and delivering hand-painted assets with their Three.js-specific insights.

He’s also been working on “threepack”, a small library built around a portable format for moving Three.js objects between completely different projects. What started as a personal tool for reusing assets has grown into a way to exchange complex objects and full scenes without adapting them to a new code structure, while keeping materials, animations, shaders, and more intact.

One project in particular holds a special place for him. For the Three.js Journey Challenge, Misha prepared his models before leaving for two weeks in Japan, then spent the entire trip painting the scene on an iPad with Procreate. When he returned and added the textures, he realized the project had become more than a visual exercise. He could see a story and emotions in every part of it. “I actually had a feeling that I’ve built my own house.” [See the project →](https://x.com/mesqme/status/1988539139063459871?s=20)

## Damien Mortini

Damien Mortini is looking ahead to a world where AR glasses could finally be good enough to replace our phones and laptops. He’s excited by the idea of creating away from the computer, standing, moving around, talking, and seeing ideas come to life around him in real time. He also believes the web will have a major role to play in this next shift.

That curiosity has been driving Damien’s experiments with new ways to create and code for years. From adaptive nodes and natural language to mobile interfaces and coding by voice with just a pair of earphones, he’s been exploring how far these approaches can go with AI, Three.js, and TSL. And when he takes the stage in Paris, he’ll ask a simple question: “The tools we use, and especially Three.js, are fantastic. But is this really only about tech?”

His approach to building also comes back to keeping things small and efficient. He shared this tiny `Signal` class as a good example:

```
class Signal extends Set {
  dispatch(value) {
    for (const callback of this) callback(value);
  }
}
```

For Damien, most of the time we don’t need a 14 kB library for something that can be built in a few lines. And with AI making it easier to dissect a library, understand how it works, learn to build it yourself, and tailor it to your needs, he sees an opportunity for our next projects to be lighter and faster.

## Dennis Smolek

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/dennis.png.webp?x57826)

Dennis Smolek has been focused on bringing the kind of tools and frameworks usually associated with native development to the web. Lately, that has meant working with FSR upscalers, OIDN denoisers, Unreal Sky, and more, alongside updates to the org’s libraries.

He’s also spent much of the past year improving the developer experience around R3F v10, which he describes as a highly capable platform for building real applications and projects. At the conference, he’ll talk about that work, as well as the organization and where he sees it heading next.

Pipelines have been another big focus lately. Dennis has been experimenting with technologies like FSR3 and different approaches to global illumination, with the goal of bringing increasingly ambitious viewers and tools to the browser. His aim is simple: to see what’s possible when web-based experiences start getting closer to what native applications can do.

## See You in Paris

That’s another look at the people behind the lineup, and there’s still plenty more waiting in Paris. From new ways of building with Three.js to experiments that push what’s possible in the browser, this first conference is bringing together a community with a lot to share.

If you’ve been thinking about joining, this is a pretty good time to make it official. Codrops readers can get 15% off tickets with the code `CODROPS`.

[Get your ticket →](https://threejs.paris/tickets)