---
title: "The last product design tool"
source: "https://writing.mariusz.cc/ultimate-product-design-tool/"
publishedDate: "2026-08-06"
category: "design"
feedName: "Sidebar"
---

[ai](https://writing.mariusz.cc/tag/ai/) Featured

Once you have an established design system in code, the interface already inherits a set of visual rules. This creates a world in which an AI coding tool can read a sketch and build out a passable interface from it using those rules.

-   [![Mariusz Cieśla](https://writing.mariusz.cc/content/images/size/w100/2026/01/_av-2013-03.jpg)](https://writing.mariusz.cc/author/mariusz/)

![The last product design tool](https://images.unsplash.com/photo-1561123760-0b8467594a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHNrZXRjaHxlbnwwfHx8fDE3ODU3OTI3NTJ8MA&ixlib=rb-4.1.0&q=80&w=2000)

Photo by [Danae Paparis](https://unsplash.com/@danaepaparis?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

_TL;DR:_ Recently, I went from "Who even needs wireframes?" to [tldraw](https://tldraw.com/?ref=writing.mariusz.cc) becoming my preferred tool for interface design. In fact, I might be using tldraw more than Figma or Paper, depending on the stage of the work.

That might sound like a hot take if you define a product design tool as a place for polished screens, high-polish typography and lovingly adjusted spacing. tldraw gives you rectangles, arrows, scribbles and text, and that's a feature.

Once you have an established design system in code, the interface already inherits a set of visual rules. Buttons have sizes, states, prominence. Dialogs and modals have structure. Component contracts and slots define the available properties and valid ways to combine them.

This creates a world in which an AI coding tool can read a sketch and _build out an interface from it using the design system_. I saw this idea brought to life for the first time by [Jem Gold](https://www.jem.computer/?ref=writing.mariusz.cc) ages ago at Airbnb, back when the models were much less advanced than they are today.

This was the Xerox moment for AI for me. I knew eventually I want to be able to replicate that.

## The rectangle with a job

The design system has already made all the visual decisions for me. When I use a rectangle that says "Dialog", I know how my particular shade of dialog looks and works. All I am deciding is whether a dialog belongs at this point in the overall flow.

An AI coding tool of choice maps the wireframe to real components, and those components bring their actual spacing, typography and behavior with them.

The polished version appears in the browser, where it belongs, and where it's much easier to judge and experiment with the final interface people will use.

## A smaller job

Most of the time you don't want an AI agent inventing an interface from a screenshot or a prompt. but translating between two layers of abstraction with their own vocabularies.

On one side, a whiteboard with screens, labels, relationships and notes. On the other, a codebase with named components and explicit contracts.

The agent's job is just mapping one to the other.

Clear contracts make that job simpler. The agent has fewer ways to be wrong, and I spend less time correcting plausible nonsense.

## Fast enough to throw away

An idea should not require sitting at the correct desk with the correct file open. An infinite canvas whiteboard available on any device you own is much more efficient.

Draw four screens, connect them, cross one out, redo the whole thing in minutes. There is very little ceremony between thinking and seeing the thought on a canvas. It's the closest experience to pen and paper that you're going to get. Heck, you might even be able to have the agent read pen and paper off of your webcam (this is what Jem's original project did), but I haven't felt the need to get that far (yet?).

## The browser as the source of truth

I sketch the flow. AI translates it into existing components and layouts. I review. Work moves into shaping and reviewing actual, working software. Outside of design system work, this is where I should be spending my time.

## What I mean by "last"

I use "last" in a bit of a tongue-in-cheek, but practical sense here: wireframing in tldraw is currently the cheapest, the fastest and the most efficient method I found for this particular loop. It's also extremely intuitive once you get some work done up front on the design system.

The final interface lives in the code, which is where it should live – we are software designers, after all. The first idea remains a messy rectangle with an arrow attached to it. A tool like tldraw gets that thought into the loop faster than anything else.

That is the only job I need a design tool for.