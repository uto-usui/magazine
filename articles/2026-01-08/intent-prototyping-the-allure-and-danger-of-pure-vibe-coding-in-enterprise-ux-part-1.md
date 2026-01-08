---
title: "Intent Prototyping: The Allure And Danger Of Pure Vibe Coding In Enterprise UX (Part 1)"
source: "https://smashingmagazine.com/2025/09/intent-prototyping-pure-vibe-coding-enterprise-ux/"
publishedDate: "2025-09-25"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Yegor Gilyov)"
---

-   14 min read
-   [UX](https://smashingmagazine.com/category/ux), [Design](https://smashingmagazine.com/category/design), [Process](https://smashingmagazine.com/category/process), [AI](https://smashingmagazine.com/category/ai)

Yegor Gilyov examines the problem of over-reliance on static high-fidelity mockups, which often leave the conceptual model and user flows dangerously underdeveloped. He then explores whether AI-powered prototyping is the answer, questioning whether the path forward is the popular “vibe coding” approach or a more structured, intent-driven approach.

There is a spectrum of opinions on how dramatically all creative professions will be changed by the coming wave of agentic AI, from the very skeptical to the wildly optimistic and even apocalyptic. I think that even if you are on the “skeptical” end of the spectrum, it makes sense to explore ways this new technology can help with your everyday work. As for my everyday work, I’ve been doing UX and product design for about 25 years now, and I’m always keen to learn new tricks and share them with colleagues. Right now, I’m interested in **AI-assisted prototyping**, and I’m here to share my thoughts on how it can change the process of designing digital products.

To set your expectations up front: this exploration focuses on a specific part of the product design lifecycle. Many people know about the Double Diamond framework, which shows the path from problem to solution. However, I think it’s the [Triple Diamond model](https://uxdesign.cc/why-the-double-diamond-isnt-enough-adaa48a8aec1) that makes an important point for our needs. It explicitly separates the solution space into two phases: Solution Discovery (ideating and validating the right concept) and Solution Delivery (engineering the validated concept into a final product). This article is focused squarely on that middle diamond: **Solution Discovery**.

[![Diagram of the Triple Diamond model: Problem Discovery, Solution Discovery, and Solution Delivery.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/01-diagram-triple-diamond-model.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/01-diagram-triple-diamond-model.png)

The Triple Diamond model and the prototyping sweet spot. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/01-diagram-triple-diamond-model.png))

How AI can help with the preceding (Problem Discovery) and the following (Solution Delivery) stages is out of the scope of this article. Problem Discovery is less about prototyping and more about research, and while I believe AI can revolutionize the research process as well, I’ll leave that to people more knowledgeable in the field. As for Solution Delivery, it is more about engineering optimization. There’s no doubt that software engineering in the AI era is undergoing dramatic changes, but I’m not an engineer — I’m a designer, so let me focus on my “sweet spot”.

And my “sweet spot” has a specific flavor: **designing enterprise applications**. In this world, the main challenge is taming complexity: dealing with complicated data models and guiding users through non-linear workflows. This background has had a big impact on my approach to design, putting a lot of emphasis on the underlying logic and structure. This article explores the potential of AI through this lens.

I’ll start by outlining the typical artifacts designers create during Solution Discovery. Then, I’ll examine the problems with how this part of the process often plays out in practice. Finally, we’ll explore whether AI-powered prototyping can offer a better approach, and if so, whether it aligns with what people call “vibe coding,” or calls for a more deliberate and disciplined way of working.

## What We Create During Solution Discovery

The Solution Discovery phase begins with the key output from the preceding research: **a well-defined problem** and **a core hypothesis for a solution**. This is our starting point. The artifacts we create from here are all aimed at turning that initial hypothesis into a tangible, testable concept.

Traditionally, at this stage, designers can produce artifacts of different kinds, progressively increasing fidelity: from napkin sketches, boxes-and-arrows, and conceptual diagrams to hi-fi mockups, then to interactive prototypes, and in some cases even live prototypes. Artifacts of lower fidelity allow fast iteration and enable the exploration of many alternatives, while artifacts of higher fidelity help to understand, explain, and validate the concept in all its details.

It’s important to **think holistically**, considering different aspects of the solution. I would highlight three dimensions:

1.  **Conceptual model**: Objects, relations, attributes, actions;
2.  **Visualization**: Screens, from rough sketches to hi-fi mockups;
3.  **Flow**: From the very high-level user journeys to more detailed ones.

One can argue that those are layers rather than dimensions, and each of them builds on the previous ones (for example, according to [Semantic IxD](https://www.interaction-design.org/literature/article/the-magic-of-semantic-interaction-design?srsltid=AfmBOoq4-4YG8RR7SDZn7CX1GJ1ZKNdiZx-trER7oKCefud3V2TjeumD) by Daniel Rosenberg), but I see them more as different facets of the same thing, so the design process through them is not necessarily linear: you may need to switch from one perspective to another many times.

This is how different types of design artifacts map to these dimensions:

[![Diagram mapping design artifacts to dimensions of Conceptual Model, Visualization, and Flow.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/02-mapping-design-artifacts.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/02-mapping-design-artifacts.png)

Mapping design artifacts to dimensions of Conceptual Model, Visualization, and Flow. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/02-mapping-design-artifacts.png))

As Solution Discovery progresses, designers move from the left part of this map to the right, from low-fidelity to high-fidelity, from ideating to validating, from diverging to converging.

Note that at the beginning of the process, different dimensions are supported by artifacts of different types (boxes-and-arrows, sketches, class diagrams, etc.), and only closer to the end can you build a live prototype that encompasses all three dimensions: conceptual model, visualization, and flow.

This progression shows a classic trade-off, like the difference between a pencil drawing and an oil painting. The drawing lets you explore ideas in the most flexible way, whereas the painting has a lot of detail and overall looks much more realistic, but is hard to adjust. Similarly, as we go towards artifacts that integrate all three dimensions at higher fidelity, our ability to iterate quickly and explore divergent ideas goes down. This inverse relationship has long been an accepted, almost unchallenged, limitation of the design process.

## The Problem With The Mockup-Centric Approach

Faced with this difficult trade-off, often teams opt for the easiest way out. On the one hand, they need to show that they are making progress and create things that appear detailed. On the other hand, they rarely can afford to build interactive or live prototypes. This leads them to over-invest in one type of artifact that seems to offer the best of both worlds. As a result, the neatly organized “bento box” of design artifacts we saw previously gets shrunk down to just one compartment: creating static high-fidelity mockups.

[![The artifact map diagram, with “Hi-fi Mockup” enlarged to show an over-reliance on it.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/03-artifact-map-diagram.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/03-artifact-map-diagram.png)

The mockup-centric approach. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/03-artifact-map-diagram.png))

This choice is understandable, as several forces push designers in this direction. Stakeholders are always eager to see nice pictures, while artifacts representing user flows and conceptual models receive much less attention and priority. They are too high-level and hardly usable for validation, and usually, not everyone can understand them.

On the other side of the fidelity spectrum, interactive prototypes require too much effort to create and maintain, and creating live prototypes in code used to require special skills (and again, effort). And even when teams make this investment, they do so at the end of Solution Discovery, during the convergence stage, when it is often too late to experiment with fundamentally different ideas. With so much effort already sunk, there is little appetite to go back to the drawing board.

It’s no surprise, then, that many teams default to the perceived safety of **static mockups**, seeing them as a middle ground between the roughness of the sketches and the overwhelming complexity and fragility that prototypes can have.

As a result, validation with users doesn’t provide enough confidence that the solution will actually solve the problem, and teams are forced to make a leap of faith to start building. To make matters worse, they do so without a clear understanding of the conceptual model, the user flows, and the interactions, because from the very beginning, designers’ attention has been heavily skewed toward visualization.

The result is often a design artifact that resembles the famous “horse drawing” meme: beautifully rendered in the parts everyone sees first (the mockups), but dangerously underdeveloped in its underlying structure (the conceptual model and flows).

[![The “horse drawing” meme, where the front is detailed and the back is a simple sketch.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/04-lopsided-horse-problem.jpg)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/04-lopsided-horse-problem.jpg)

The “lopsided horse” problem. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/04-lopsided-horse-problem.jpg))

While this is a familiar problem across the industry, its severity **depends on the nature of the project**. If your core challenge is to optimize a well-understood, linear flow (like many B2C products), a mockup-centric approach can be perfectly adequate. The risks are contained, and the “lopsided horse” problem is unlikely to be fatal.

However, it’s different for the systems I specialize in: complex applications defined by intricate data models and non-linear, interconnected user flows. Here, the biggest risks are not on the surface but in the underlying structure, and a lack of attention to the latter would be a recipe for disaster.

## Transforming The Design Process

This situation makes me wonder:

> [How might we close the gap between our design intent and a live prototype, so that we can iterate on real functionality from day one?](https://twitter.com/share?text=%0aHow%20might%20we%20close%20the%20gap%20between%20our%20design%20intent%20and%20a%20live%20prototype,%20so%20that%20we%20can%20iterate%20on%20real%20functionality%20from%20day%20one?%0a&url=https://smashingmagazine.com%2f2025%2f09%2fintent-prototyping-pure-vibe-coding-enterprise-ux%2f)
> 
> “

[![Diagram showing bridging the gap between “Design Intent” and “Live Prototype.”](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/05-design-intent-live-prototype.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/05-design-intent-live-prototype.png)

How might we bridge the gap between design intent and a live prototype? ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/05-design-intent-live-prototype.png))

If we were able to answer this question, we would:

-   **Learn faster.**  
    By going straight from intent to a testable artifact, we cut the feedback loop from weeks to days.
-   **Gain more confidence.**  
    Users interact with real logic, which gives us more proof that the idea works.
-   **Enforce conceptual clarity.**  
    A live prototype cannot hide a flawed or ambiguous conceptual model.
-   **Establish a clear and lasting source of truth.**  
    A live prototype, combined with a clearly documented design intent, provides the engineering team with an unambiguous specification.

Of course, the desire for such a process is not new. This vision of a truly **prototype-driven workflow** is especially compelling for enterprise applications, where the benefits of faster learning and forced conceptual clarity are the best defense against costly structural flaws. But this ideal was still out of reach because prototyping in code took so much work and specialized talents. Now, the rise of powerful AI coding assistants changes this equation in a big way.

## The Seductive Promise Of “Vibe Coding”

And the answer seems to be obvious: **vibe coding**!

> “Vibe coding is an artificial intelligence-assisted software development style popularized by Andrej Karpathy in early 2025. It describes a fast, improvisational, collaborative approach to creating software where the developer and a large language model (LLM) tuned for coding is acting rather like pair programmers in a conversational loop.”
> 
> — [Wikipedia](https://en.wikipedia.org/wiki/Vibe_coding)

The original tweet by Andrej Karpathy:

[![Screenshot of Andrej Karpathy's tweet defining Vibe Coding.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/06-andrej-karpathy-tweet.png)](https://x.com/karpathy/status/1886192184808149383)

Andrej Karpathy’s tweet that popularized the term “vibe coding”. (Image source: [X](https://x.com/karpathy/status/1886192184808149383)) ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/06-andrej-karpathy-tweet.png))

The allure of this approach is undeniable. If you are not a developer, you are bound to feel awe when you describe a solution in plain language, and moments later, you can interact with it. This seems to be the ultimate fulfillment of our goal: a direct, frictionless path from an idea to a live prototype. But **is this method reliable enough** to build our new design process around it?

### The Trap: A Process Without A Blueprint

Vibe coding mixes up a description of the UI with a description of the system itself, resulting in a **prototype based on changing assumptions rather than a clear, solid model**.

> [The pitfall of vibe coding is that it encourages us to express our intent in the most ambiguous way possible: by having a conversation.](https://twitter.com/share?text=%0aThe%20pitfall%20of%20vibe%20coding%20is%20that%20it%20encourages%20us%20to%20express%20our%20intent%20in%20the%20most%20ambiguous%20way%20possible:%20by%20having%20a%20conversation.%0a&url=https://smashingmagazine.com%2f2025%2f09%2fintent-prototyping-pure-vibe-coding-enterprise-ux%2f)
> 
> “

This is like hiring a builder and telling them what to do one sentence at a time without ever presenting them a blueprint. They could make a wall that looks great, but you can’t be sure that it can hold weight.

I’ll give you one example illustrating problems you may face if you try to jump over the chasm between your idea and a live prototype relying on pure vibe coding in the spirit of Andrej Karpathy’s tweet. Imagine I want to prototype a solution to keep track of tests to validate product ideas. I open my vibe coding tool of choice (I intentionally don’t disclose its name, as I believe they all are awesome yet prone to similar pitfalls) and start with the following prompt:

```
I need an app to track tests. For every test, I need to fill out the following data:
- Hypothesis (we believe that...) 
- Experiment (to verify that, we will...)
- When (a single date, or a period) 
- Status (New/Planned/In Progress/Proven/Disproven)
```

And in a minute or so, I get a working prototype:

[![Screenshot of a simple Test Tracker app.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/7-test-tracker.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/7-test-tracker.png)

The initial prototype. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/7-test-tracker.png))

Inspired by success, I go further:

```
Please add the ability to specify a product idea for every test. Also, I want to filter tests by product ideas and see how many tests each product idea has in each status.
```

And the result is still pretty good:

[![The Test Tracker app screenshot, now with filtering by product ideas.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/8-test-tracker-updated.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/8-test-tracker-updated.png)

The prototype updated to include filtering tests by product ideas. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/8-test-tracker-updated.png))

But then I want to extend the functionality related to product ideas:

```
Okay, one more thing. For every product idea, I want to assess the impact score, the confidence score, and the ease score, and get the overall ICE score. Perhaps I need a separate page focused on the product idea, with all the relevant information and related tests.
```

And from this point on, the results are getting more and more confusing.

The flow of creating tests hasn’t changed much. I can still create a bunch of tests, and they seem to be organized by product ideas. But when I click “Product Ideas” in the top navigation, I see nothing:

[![Screenshot of the app’s blank Product Ideas page.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/9-product-ideas-page.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/9-product-ideas-page.png)

The Product Ideas page is empty. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/9-product-ideas-page.png))

I need to create my ideas from scratch, and they are not connected to the tests I created before:

[![Screenshot of the Product Ideas page with newly created ideas not connected to tests.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/10-product-ideas-disconnected-tests.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/10-product-ideas-disconnected-tests.png)

The newly created product ideas are disconnected from existing tests. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/10-product-ideas-disconnected-tests.png))

Moreover, when I go back to “Tests”, I see that they are all gone. Clearly something went wrong, and my AI assistant confirms that:

> No, this is not expected behavior — it’s a bug! The issue is that tests are being stored in two separate places (local state in the Index page and App state), so tests created on the main page don’t sync with the product ideas page.

Sure, eventually it fixed that bug, but note that we encountered this just on the third step, when we asked to slightly extend the functionality of a very simple app. The more layers of complexity we add, the more roadblocks of this sort we are bound to face.

Also note that this specific problem of a not fully thought-out relationship between two entities (product ideas and tests) is not isolated at the technical level, and therefore, it didn’t go away once the technical bug was fixed. The underlying conceptual model is still broken, and it manifests in the UI as well.

For example, you can still create “orphan” tests that are not connected to any item from the “Product Ideas” page. As a result, you may end up with different numbers of ideas and tests on different pages of the app:

[![Diagram showing conflicting data between the Tests page and the Product Ideas page.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/11-conflicting-data-tests-product-ideas-page.png)](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/11-conflicting-data-tests-product-ideas-page.png)

A poorly defined conceptual model leads to data inconsistencies across the app. ([Large preview](https://files.smashing.media/articles/intent-prototyping-pure-vibe-coding-enterprise-ux/11-conflicting-data-tests-product-ideas-page.png))

Let’s diagnose what really happened here. The AI’s response that this is a “bug” is only half the story. The true root cause is a **conceptual model failure**. My prompts never explicitly defined the relationship between product ideas and tests. The AI was forced to guess, which led to the broken experience. For a simple demo, this might be a fixable annoyance. But for a data-heavy enterprise application, this kind of structural ambiguity is fatal. It demonstrates **the fundamental weakness of building without a blueprint**, which is precisely what vibe coding encourages.

Don’t take this as a criticism of vibe coding tools. They are creating real magic. However, the fundamental truth about “garbage in, garbage out” is still valid. If you don’t express your intent clearly enough, chances are the result won’t fulfill your expectations.

Another problem worth mentioning is that even if you wrestle it into a state that works, **the artifact is a black box** that can hardly serve as reliable specifications for the final product. The initial meaning is lost in the conversation, and all that’s left is the end result. This makes the development team “code archaeologists,” who have to figure out what the designer was thinking by reverse-engineering the AI’s code, which is frequently very complicated. Any speed gained at the start is lost right away because of this friction and uncertainty.

## From Fast Magic To A Solid Foundation

Pure vibe coding, for all its allure, encourages building without a blueprint. As we’ve seen, this results in **structural ambiguity**, which is not acceptable when designing complex applications. We are left with a seemingly quick but fragile process that creates a black box that is difficult to iterate on and even more so to hand off.

This leads us back to our main question: how might we close the gap between our design intent and a live prototype, so that we can iterate on real functionality from day one, without getting caught in the ambiguity trap? The answer lies in a more methodical, disciplined, and therefore trustworthy process.

In [**Part 2**](https://www.smashingmagazine.com/2025/10/intent-prototyping-practical-guide-building-clarity/) of this series, “A Practical Guide to Building with Clarity”, I will outline the entire workflow for **Intent Prototyping.** This method places the explicit _intent_ of the designer at the forefront of the process while embracing the potential of AI-assisted coding.

Thank you for reading, and I look forward to seeing you in [**Part 2**](https://www.smashingmagazine.com/2025/10/intent-prototyping-practical-guide-building-clarity/).

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)