---
title: "Designing Ourselves: The New Obys Identity and Website"
source: "https://tympanus.net/codrops/2026/05/14/designing-ourselves-the-new-obys-identity-and-website/"
publishedDate: "2026-05-14"
category: "design"
feedName: "Codrops"
author: "Obys"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_Article_02-scaled-1.webp?x11853)](https://obys.agency/ "Designing Ourselves: The New Obys Identity and Website Demo")

## From Misalignment to Clarity

The previous version of the Obys website was created in 2019. We had plans to update it earlier, but over time it turned into a quieter, ongoing process, understanding who we are today, how we see ourselves, and where we are going.

At some point, it became clear that both the visual identity and the website no longer felt precise. They didn’t reflect the level we operate on, the type of projects we take on, or the clients we collaborate with today. The work had evolved, but the way we presented it had not.

Over the years, we gained experience, worked with clients we once could only imagine, and received recognition from the industry. More importantly, we developed a much clearer understanding of our own approach. The previous version started to feel slightly disconnected from that clarity. What we needed was not just an update, but a more accurate articulation – a visual language that reflects what Obys is now.

## **From Identity to Interaction**

The new Obys is rooted in a more modernist, clean approach – one that reflects both our background in graphic design and our current understanding of what feels right. Interestingly, we didn’t start with the website. We started with the typeface.

We developed our own custom font, OTF Obys NG – a neo-grotesque designed to function both as a text and display typeface. We see it as a living system, something that will evolve over time and define the rhythm, spacing, and hierarchy across the entire identity.

From there, we refined the logo, keeping continuity with the original symbol while developing it further. This led to a central idea: Obys as a “space” – a structure that contains projects, ideas, and different states of the same system. On the website, this idea is translated through motion. The logo becomes a constant element that interacts with content and remains present across different layouts – vertical, horizontal, and grid. It doesn’t just represent the brand; it becomes part of the interface.

One of the key moments happens right at the beginning. You enter through the old logo on a dark background, which gradually transforms into the new one and into a white environment. This transformation continues across the entire site. The logo acts as a stable point within this system. It stays with you as you move between layouts, open projects, or navigate to the About page. It shifts slightly, adapts to context, but remains present, quietly defining the experience.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_Article_04-800x600.jpg?x11853)

## The Hardest Part Wasn’t the Design

Interestingly, the identity itself wasn’t the most iterative part of the process. Nor was the typeface.

The real challenge, however, was defining our own vision. Over several years, we kept questioning the same things: how bold or restrained the result should be, how much motion is enough, what level of expression actually feels right. It wasn’t a single decision, but a gradual alignment – a process of removing uncertainty rather than adding ideas. Many of the constraints in this project were self-defined. We looked closely at who we wanted to work with, what kind of clients we wanted to attract, and what kind of projects we wanted to focus on. Those decisions naturally shaped the boundaries of the system.

For the first time, we developed a self-initiated project in collaboration with an external developer. It was a different process, and a valuable one. The result reflects that. Most of the time went into refining details during development, especially motion and micro-interactions. Achieving a feeling that appears simple and effortless required constant adjustments. Small changes in timing, spacing, and behavior made a significant difference, and those details took the longest to resolve.

## **What We Chose to Leave out**

This version of the website is intentionally a microsite. It works as a focused presentation of our work and as a transition between the previous and the new Obys. Because of that, a lot of things were deliberately left out – awards, archives, extended content, internal details.

We didn’t want to overload it. All of that belongs to a larger version of the website we’re planning for the future. The structure is kept simple. The focus is on projects – a curated selection built around key visuals. There is minimal additional information about the studio. Everything essential is already visible.

## Motion as a Way to Understand

Motion plays a central role. From the very first moment, the user encounters a transformation – from the old logo to the new one, from dark to light. It sets the tone for everything that follows.

From there, motion becomes part of the system. It connects layouts, guides transitions between pages, and supports interaction with content.

It’s not decorative. It helps explain the idea and keeps the experience consistent across the site.

## Built as a System

The website was built from scratch using a custom codebase, without relying on client-side frameworks. It’s powered by Bun.js, used both as an HTTP server and a bundler. React is used purely as a server-side templating layer, keeping the output clean and controlled. All interactions – animations, virtual scroll, SPA routing, and page transitions – are handled in TypeScript.

Motion is driven by an in-house animation system based on `requestAnimationFrame` and the Web Animations API, allowing precise control over timing and behavior. Some visual elements are rendered using native WebGL.

Content is managed through Strapi, while styling is kept minimal and direct with plain CSS.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_Article_06-800x511.jpg?x11853)

This version of the website is not the final form of Obys.

It’s a moment in between – a focused presentation of where we are now and how we see ourselves today. A microsite that captures the shift, rather than trying to explain everything at once.

It allowed us to articulate the updated identity, test ideas, and make the system visible in its most essential form. The rest will follow.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_Article_05-800x600.jpg?x11853)