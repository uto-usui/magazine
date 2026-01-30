---
title: "The art and science of annotations in Dev Mode"
source: "https://www.figma.com/blog/annotations-in-dev-mode/"
publishedDate: "2024-01-31"
category: "design"
feedName: "Figma Blog"
---

I have a love-hate relationship with marking up a Figma file. I take pride in adding the final touches to a design, thoughtfully making sure that all the specs and measurements are represented. Maybe it’s a text note, an arrow, or a quick callout, or maybe it’s extra context that communicates the intent behind a design choice as much as the design detail itself. Marking up a file can feel like a time suck, even though it can make a big difference in the product development process. And as designers spend valuable time writing, drawing, and manually organizing a file to make sure that every design requirement is accurately captured, developers spend an equal amount of time making sense of those designs, capturing context and gathering requirements to bring the concept to life.

Those non-visual requirements are often spread across different files and tools, whether it’s a product requirements doc or a design file. We wanted to build annotations so that context lives in one place—a complete spec [directly in Dev Mode](https://www.figma.com/blog/dev-mode-ga/#save-time-with-annotations-in-dev-mode)—and is purpose built for both designer and developer use cases.

As we scoped the feature, we set about solving a few key problems, with the goal of bridging the gap between design and code: Annotations can be time consuming to create, get outdated quickly, and often add clutter to design files.

## [Solving for designer and developer needs](#solving-for-designer-and-developer-needs)

To guide our work, we took a step back and thought about the role of annotations in the design process—where it is now and how it might evolve—based on what we had heard from designers and developers.

For designers, annotations often address design qualities that can’t be captured in the design itself. Whether it’s accessibility properties or detailed interactive behavior, designers need a place to express these attributes.

For developers, sharing a design is not the same thing as sharing a specific engineering task. One of the core challenges developers face is finding the needle in the haystack; design files often contain so much information, and so much work, that knowing exactly what part to focus on can be tricky. The act of curation is an important part of the design process.

These different needs and challenges informed the exact role of annotations in Dev Mode, which was the subject of much debate internally. Annotations can be used for many different steps in the design process, but bringing designer and developer workflows closer together, while also solving their unique pain points, was top of mind.

We wanted one dedicated space to curate a spec for developers and call out necessary details or areas of confusion, so we ultimately decided that designers should go to Dev Mode to annotate. In doing so, designers would see exactly what their developer counterpart sees while annotating, and they could share a link to Dev Mode when they’re done. Our goal is not for Dev Mode to silo developers once a designer’s work is done—but to engage the broader team in the product development process, with annotations being a first, crucial step.

## [The power of dynamic changes](#the-power-of-dynamic-changes)

With an overall approach sketched out, we turned our attention to other key design decisions. To date, designers have had to create annotations manually, which means that as designs change, annotations lag behind. This process works when a designer is pencils down and simply needs to mark a design as “Ready for dev.” But more often than not, the [always-on nature of product development](https://www.figma.com/blog/welcome-to-the-wip/)

requires constant, clear communication as designers work through multiple iterations, and developers need a simple way to track changes.

In an early design sprint, we wondered: “What if there was a way to connect annotations to properties in a design?” That would reduce the burden on designers to manually replicate design details as they mark up files, while also keeping annotations up to date as designs change. Developers can trust that any annotations they see are up to date with the latest design, even if their design counterpart is actively making edits.

We applied the same idea to measurements—when the design changes (as it inevitably does), why shouldn’t the line you’ve drawn to mark out a dimension also change?

And it’s not just about what’s changed in a design. Plain text notes leave a lot of room for error, but when annotations can reference actual variables and components in a design system, developers can trust that the spec is aligned with the codebase.

## [Our positioning logic](#our-positioning-logic)

We knew from research and our own personal experience that, to date, designers have had the tedious task of shifting frames around to make space for annotations. And as they add more annotations, it’s a constant loop of rearranging frames on the canvas, all in an effort to squeeze in context in the right place. We wondered if there was a way to make annotations visible enough to developers, without actually taking up space on the Figma canvas.

![A Figma canvas that shows manual notes being added to a design.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACOklEQVQokV2TS08TURzF+SQVlEdKKelzXvcxM8WWBhEwPG0CvlqNC4KJMa5UfIYYEzQmRhOIYeWCjWCViBvDV3AjG7vic/zM3KG8Fid3cnPm3HP/85uOIAhoy/d9tNanFO2d1JE/DAjD8ITi/Y52kBACy7IoFApG+XwOTwomp6doNBpGM7OzlMtl8+Kly6PcrN9i6d4Si4uLzF2do1QqRYFxK9txyGSyDKTTJPuT9Pb1ILVk+flTtptNtpvfeLHyirGJcfzAZ35hgbX1dX7v7bGz+5PHz5apDFfihlorbNsmk82RGkjT29dLZ1cnSis+fPrIfqvFfusfaxufmZyZNjeq1+tsNZu0Dg74s/+XN29XGa5WTwdms1lSqRTd3d2cSyTMCB4tP+Hr7g+2fu3w8vUK41cmzJVrtRqr79+x+X2bjc0v3H/4gErlsKFSCsuyyWRyJJMpus5fIJE4R7I/xcjoKDduN7h+9w5TtTnKlYoJrFarzMzOULs2z9R8jZHxsfYMo4Y+tivJFBxSg3n6+gfpSaZJprMUbIHnl/BKZeTQEH4YHhEhlcTxPGwpEL7Gj7+ybx6kDnFlQNHV5GxBzhIUXYWnQlRwEVUqo8Mh4zUlAh+hJLZj47guUitzSMcxWyG+H+BJTcER5G0PT0SmiLkwVpvXSGGApyRFq2jmr5WKOTwGNl6l0liuxHIFQsanBmfgNoFBYBpato3jOAa9GGxjimbSVsRlzObZAKPIczimyCOkQEp59Bf9B8g2mzMNjTvNAAAAAElFTkSuQmCC)![A Figma canvas that shows manual notes being added to a design.](https://cdn.sanity.io/images/599r6htc/regionalized/fd059e26877cf318a6a7f9c62ffaf45b92d3d93e-3619x2029.png?rect=2,0,3617,2029&w=804&h=451&q=75&fit=max&auto=format)

Designing Dev Mode’s VS Code extension and manually adding notes and pointers

One design direction was promising: automatically position and display annotations. While it felt like a big shift compared to how files are annotated today, if we got it right, it would reduce the burden on designers to constantly reshuffle their file, while also decluttering the experience for developers. But getting it right would be a tall order, requiring dozens of prototypes and iterations. There were so many interactions at play. Zooming. Panning. Scaling. Minimizing. Selecting. Hovering.

Our engineering team took the lead on tuning our display logic to make sure that this design idea would actually translate to a great experience. In an early end-to-end demo from Software Engineer Roshan Bhalla, the team really started to see the vision come to life.

Initially, we planned on positioning annotations outside the top-level frame of whatever is being annotated. We learned from beta users that this approach pushed annotations too far away when designers used nested frames. To address that challenge, we made some tweaks:

-   Setting a maximum distance an annotation can be pushed away from what it’s describing
-   Having annotations bump into the edge of your window so they stay visible as you pan

But the explorations didn’t end there. Based on feedback from the beta and internal testing we tested many more approaches, including physics-based positioning:

Testing and iterating on our positioning logic became an adventure on its own. We explored a direction in which annotations hide until you click on a corresponding frame. That felt right in theory, but once we actually tried it, we realized that it was still easy to miss out on important annotations if you were just looking at a frame without actively selecting it.

We then iterated on different versions of automatically expanding annotations based on zoom level and position, and it immediately felt more intuitive. From there, we added a temporary slider to the UI that allowed us to set different zooming parameters to land on the “right” level. Polishing these interactions all played into how the system felt as a whole.

As we optimized for speed and connecting annotations to the design, annotating started to feel empowering in fundamentally new ways. However, we also knew that almost every team we talked to had their own twist on how annotations fit into their workflow, and how they were presented. For some, annotations were tasks or requirements that should be tracked, and connected to task management tools.

Looking ahead, we’re excited to also have taken an extensibility-first approach, enabling teams to build their own workflows around Figma’s annotation feature, using the [plugin API](https://www.figma.com/plugin-docs/). More to come on this.

## [Annotations are one piece of the puzzle](#annotations-are-one-piece-of-the-puzzle)

We’re excited to launch annotations in response to tons of user feedback and make Dev Mode the home of the design spec, where designers can share intent and developers can get the context they need—all in one place.

We hope that annotations in Dev Mode make it easier for designers and developers to better communicate the finer details of their work. We also recognize that annotations aren’t the only solution for improving communication between these critical roles, but rather just one part of the process that we felt was worth simplifying. We are excited to continue chipping away at the rest of the pieces of designer and developer collaboration as we keep building Dev Mode, and look forward to hearing your feedback on what you’d like to see next.

[Learn more](https://www.figma.com/blog/dev-mode-ga/) about everything that’s launching today, and what’s next for Dev Mode.

_Many thanks to the working group at Figma: Product Manager Benson Perry, Engineers Ed Bentley, Roshan Bhalla, Jenny Lea, Karl Jiang, and Sue Hitchins, Engineering Manager Noga Mann, Researcher Molly Jane Nicholas, and Data Scientist Collin Wiles._