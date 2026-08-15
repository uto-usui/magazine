---
title: "How to move fast toward the right thing"
source: "https://www.figma.com/blog/how-to-move-fast-toward-the-right-thing/"
publishedDate: "2026-08-13"
category: "design"
feedName: "Figma Blog"
---

For most of software history, code was the gate to product building, and developers held the keys. With AI, that gate is gone. Now, people who have never opened an IDE can ship working software. But there’s a cost: When you can build anything, [building the right thing](https://www.figma.com/blog/what-matters-when-anyone-can-build/)

gets harder. Product development teams feel the pressure to keep executing and accelerating, but that speed can cloud our judgment—we can mistake polished outputs for good ones. Here are three things to remember when you’re shipping faster than ever.

## [AI accelerates execution, not clarity](#ai-accelerates-execution-not-clarity)

It’s easy to prompt your way to an output that looks polished and production-ready. We’ve been trained to trust that polish because, in a pre-AI world, it reflected hard-won decisions and thoughtful trade-offs that experts made along the way—like how the system behaves, and which constraints matter. Today we can prompt our way to a prototype quickly, but LLMs fill in the gaps for us to generate something that looks great on the surface, yet falls apart under the hood.

Consideration means friction, and letting AI remove that friction entirely is tempting. There’s a name for it: “[cognitive surrender](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646),” or what happens when we let AI take on the burden of validating an idea or developing a distinct point of view. I catch myself doing it all the time—adopting the LLM’s judgment as my own. Moving fast, and accepting the output on the first go. But you have to start with intent. I call it a consideration imperative: sitting with the problem and getting clear on what’s worth building, instead of shipping the first option that looks reasonable.

![Abstract purple and blue collage with looping lines, dotted patterns, and layered shapes.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EACIQAAICAQMEAwAAAAAAAAAAAAEDAgQABRESBhMhkRRBgf/EABUBAQEAAAAAAAAAAAAAAAAAAAQB/8QAIBEAAgIBAwUAAAAAAAAAAAAAAQIABAMRIXESEyIyof/aAAwDAQACEQMRAD8AUtIT21rXxWnn5Jxk0aleE3l65QhHcM5jbfGurqFana05dZQXBk9pxBJB95R6r0qibtev8aASVAmEfAJ/MY1xO+isviwPyRamStiVS+p3OvMz2knSpVN7dzTw0yJPcrFh94ZJt11VbE014CC4nxEfWGKJY+rEDmPWqrjqJ3M//9k=)![Abstract purple and blue collage with looping lines, dotted patterns, and layered shapes.](https://cdn.sanity.io/images/599r6htc/regionalized/18583a5d64a25c83cf1188991b3582b8be9d8b10-3264x1836.jpg?rect=0,1,3264,1835&w=804&h=452&q=75&fit=max&auto=format)

## [Context has to come first](#context-has-to-come-first)

In their white paper “[The New SDLC With Vibe Coding](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding),” Google leaders Addy Osmani, Shubham Saboo, and Dr. Sokratis Kartakis introduce the idea of **agentic engineering**: shifting the developer role from writing code to expressing intent, and using AI to translate that intent into software.

A recent [white paper from Google on agentic coding](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) describes how low-effort vibe coding leads to tech debt. Developer focus, the paper argues, needs to shift from writing code to building intent with things like:

-   **Deterministic layers**—like tests, type checks, validation—that run the same way every time and catch what the model gets wrong
-   **High-signal context**, including specs and documented components, so the agent works from your intent
-   **Clear interfaces**, so an agent knows how the pieces connect instead of guessing

This type of “agentic engineering” means more work upfront for developers, but ends up paying dividends when they have software that’s a lot easier to maintain. The same is true for design. If you invest the time and care into building a strong design system, you codify decisions that give agents a precise vocabulary and clear guardrails to work with. That precision results in consistent outputs, leaner code, and less tech debt.

## [Good can still be average](#good-can-still-be-average)

Consideration and context help you move faster in the right direction, but you still need to make sure what you’ve built stands out. This is where AI works against you. Models are trained on vast amounts of data. They know every trend, style, and pattern, and pull toward the average in a range of what already exists—in machine learning terms, what’s “in distribution.”

Over time, more and more work is in distribution. Ask AI for a logo, and you’ll get a simple geometric mark with a gradient. Ask for a pitch deck, and you’ll get the sans-serif font everyone else uses. Ask for a React component, and it’s a card with rounded corners everyone’s seen before. None of it is wrong, and most of it is adequate—but that’s the problem. Accept it enough times, and your judgment narrows. You stop asking, “What should this be?” and start asking, “Which of these is least wrong?”

![Colorful abstract collage with glowing hand outlines, dots, and geometric shapes.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHAwX/xAAiEAABAwQCAwEBAAAAAAAAAAACAQMEAAURIQYSBxMUMTL/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EAB4RAAICAgIDAAAAAAAAAAAAAAECABEDMQQhEyJh/9oADAMBAAIRAxEAPwBS47b3+Qe8Hrv8kYGtjILImSpvFPfjy8IUBuw3KB1hRxJPp7dQPC60usLWXCrdDfuRNOx2ybRgSQVTWetdjyPGZDwq0YNoJq6Kdh0v9UZ8JXlKjbBsH6Il+Mj4PIDs0RQruTCRyGJaZ82J7JIoEg1RG8KmM0VPJhksk1UlVc/qrRVAZlrtRDgunrep/9k=)![Colorful abstract collage with glowing hand outlines, dots, and geometric shapes.](https://cdn.sanity.io/images/599r6htc/regionalized/95db07ff96b03a3f861043bdc7be857f45c75752-3264x1836.jpg?rect=0,1,3264,1835&w=804&h=452&q=75&fit=max&auto=format)

As AI improves, people can prompt something better than they could’ve made a year ago—but it’s still unremarkable compared to everything else being generated. That’s what makes it so hard to self-correct: “Good” is a bar that anyone can clear now, and if you don’t have a clear point of view on what you want to make, the model decides for you.

## [The point of view needs to be yours](#the-point-of-view-needs-to-be-yours)

Now, the job is about pairing speed with discernment. Prioritize front-loaded clarity, so you’re moving in the right direction, and don’t trust polish right away. Focus on context layers like design systems, so agents work efficiently. And make consideration a core part of how you work. Together, these three investments help you land on the right thing.

Learn more about how [Code Connect](https://developers.figma.com/docs/code-connect/) and [Figma’s MCP server](https://developers.figma.com/docs/figma-mcp-server/) help you get from design to code faster—with a higher-quality output.