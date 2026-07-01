---
title: "Splitting atoms & splitting hairs"
source: "https://renderghost.leaflet.pub/3mnxjmjjyyc2y"
publishedDate: "2026-06-29"
category: "design"
feedName: "Sidebar"
---

![](https://renderghost.leaflet.pub/api/atproto_images?did=did:plc:s2rczyxit2v5vzedxqs326ri&cid=bafkreig22d5mentqgubrpno4kd4nyzmgiu3mzqnabxazdgdrt2xuapdroq&v=1)

Credit: [Bob Waugh](https://www.phase-trans.msm.cam.ac.uk/2018/A/index.html)

Atomic design is nearly ten years old. Brad Frost's atoms, molecules, organisms hierarchy did something genuinely useful when it arrived: it gave teams a shared language for the idea that components are made of other components, all the way down. For a lot of people, including me, that was the conceptual unlock they needed to start building modular reusable front ends instead of pasting the same button in seventeen places. It worked. The industry absorbed it wholesale.

But I think we can probably retire the metaphor now.

—

The problem I keep running into with teams over the years isn't that they don't understand atomic design. It's that they've understood it too literally. They've set up their Figma and Storybook libraries with Atoms, Molecules, and Organisms sections. They've had the naming convention conversations. And then, reliably, they get stuck arguing about whether a card with an avatar and a label is a molecule or an organism. That conversation is a tax. It doesn't produce better components. It produces friction, disagreements, and the occasional afternoon lost to taxonomy instead of building.

—

The underlying idea was never really about atoms and molecules. It was about composition. Almost everything in an interface is composed from smaller reusable things. That's it. That's the whole insight. The metaphor was a pedagogical device to make the concept stick for people encountering it for the first time, and it served that purpose incredibly well.

But once you've internalised composition as a principle, the metaphor can start doing more harm than good. It creates a false hierarchy with named layers that teams feel obliged to maintain, when what actually matters is whether your smallest reusable elements are well-defined enough to be combined reliably and repeatedly.

—

I'm not arguing against atomic design as an on-ramp. If someone on your team is new to component-based thinking, the atoms/molecules/organisms scaffold is still a powerful and reasonable way to introduce it. Use it. Just don't park there. The abstraction to keep is composability. Components compose up from smaller components. There are no real required levels between the smallest useful unit and a whole page or view. Whether an intermediate component is a molecule or an organism is a naming problem, not a design problem. We can stop solving it now.

The real test of a design system isn't whether every component sits neatly in the correct layer of a hierarchy. It's whether people can understand it, trust it, use it, and extend it without breaking it.

Nobody ships a better product because they correctly identified a component as an organism instead of a molecule. Atomic design succeeded because it taught people to think in terms of composition. Components built from components. Small pieces combined into larger ones. Clear contracts. Predictable behaviour.

Everything else is bookkeeping.

—

[

Atomic Design by Brad Frost

Learn how to create and maintain digital design systems, allowing your team to roll out higher quality, more consistent UIs faster than ever before.

https://atomicdesign.bradfrost.com/



](https://atomicdesign.bradfrost.com/)[

BookHive | Atomic Design

See Atomic Design by Brad Frost on BookHive, a Goodreads alternative built on Blue Sky

https://bookhive.buzz/books/bk\_7a6aEdIwcXxhAHc8YrKG



](https://bookhive.buzz/books/bk_7a6aEdIwcXxhAHc8YrKG)