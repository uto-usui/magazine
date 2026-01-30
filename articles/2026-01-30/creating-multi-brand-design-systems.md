---
title: "Creating multi-brand design systems"
source: "https://www.figma.com/blog/creating-multi-brand-design-systems/"
publishedDate: "2020-09-02"
category: "design"
feedName: "Figma Blog"
---

_A few months back, leaders from Shopify, Condé Nast, and Harry’s [shared their experiences](https://youtu.be/tuKjwceTvDM?t=4) creating multi-brand design systems. When done well, design systems enable consistency and efficiency; as so many of us continue to work remotely, it’s more important than ever to get everyone on the same page. We've curated some of the highlights from the livestream that apply to remote work and beyond. Check out the video:_

Design systems have come a long way from pattern libraries and sticker sheets. Now, they're living systems with code counterparts, and they’ve really changed how we do our work for the better. Beyond providing consistency by creating a set of standard designs and components, they empower teams to move faster and more efficiently.

## [Flexibility, not rigidity](#flexibility-not-rigidity)

Since design systems can be a single source of truth for your team, it can be tempting to come up with a set of hard and fast rules around not only what goes into your design system, but also how to use it. While it’s important to provide a solid structure, being too prescriptive can impede creativity, and ultimately might make designers feel like they need to go outside of the system.

For [Mae Capozzi](https://twitter.com/MCapoz), a former Senior Software Engineer at Harry’s, it's about [trading complexity for flexibility](https://www.youtube.com/watch?v=tuKjwceTvDM&feature=youtu.be&t=3080). The team at Harry’s does that by building in layers, which are architected from least complex and least flexible (e.g. base components) to most complex and most flexible (e.g. starter kit), allowing designers to build something more standard or to explore a new approach. While the simple layers suffice for most projects, others will require something more custom, which the design system can flex to support. By defaulting to simple while allowing for more complicated builds, the system optimizes for efficiency and ensures that designers don’t feel the need to leave the system.

Since Condé Nast oversee publications like _Vogue_, _The New Yorker_, and _Bon Appétit_, it’s crucial that their design system can flex to the needs of different brands. [Mason Wendell](https://twitter.com/codingdesigner?lang=en), frontend developer at Condé Nast says the team does this by building [modular, adaptable components](https://www.youtube.com/watch?v=tuKjwceTvDM&feature=youtu.be&t=1570) through a token system. A single token can hold a different value for each brand, allowing the system to scale across brands easily. For example, the token “prominent text” refers to a different font for each brand.

## [Always evolving](#always-evolving)

The work doesn’t stop once you’ve built a design system that fits your team’s needs. Once you implement a system, you’ll learn what’s working and what’s not, identify what needs to evolve, and [better understand usage](https://www.figma.com/blog/introducing-design-system-analytics/)

. The best design systems are easy to change and experiment with, and the companies that can evolve the fastest will be the ones who have the best results.

For the team at Shopify, it’s about providing a foundation that will “bend but not break.” As UX Manager [Ricardo Vazquez](https://twitter.com/iamrvazquez?lang=en) shares, the problem is when teams make “[museum quality](https://www.youtube.com/watch?v=tuKjwceTvDM&feature=youtu.be&t=817)” systems that are treated as artifacts, and they’re afraid to make changes as their use cases and needs evolve.

“It’s imperative for us to observe,” Ricardo says. Not just designers, but also end users—in Shopify’s case, merchants. “[Watch how it breaks](https://youtu.be/tuKjwceTvDM?t=755) in order to reinvent it.”

## [Connection to code](#connection-to-code)

While components are rooted in design, finding ways to translate those components to code will enable you to move much faster and more efficiently.

Condé Nast’s site is run in javascript, enabling them to use a token system that is defined in JSON. The team has built a custom plugin that allows for importing and exporting changes to token values in JSON format. Mason says that this token system allows the team to “[stand up a new market quickly](https://www.youtube.com/watch?v=tuKjwceTvDM&feature=youtu.be&t=2316),” and ensures a smooth handoff between designers and engineers.

But it doesn’t have to be complex. Mason says that if you [don’t have multiple brands](https://youtu.be/tuKjwceTvDM?t=2733), you can at least start by associating “a purpose with a value.” Whether it’s colors or typography, doing so will give you a sense of how complex your system is. “By settling on names and values, that gives you some perspective on how complex—or overly-complex—your design system might currently be.”

Above all, it’s important to build a system and processes that work best for your team’s size, structure, and priorities. As Mae reminds us, “I really don’t think that there is a [one-size-fits-all solution](https://youtu.be/tuKjwceTvDM?t=2931).”

_For all the learnings and best practices, [watch the full livestream](https://youtu.be/tuKjwceTvDM?t=4). At Config Europe, Figma’s virtual user conference, we have an entire content track dedicated to design systems. You can [learn more and register here](https://config.figma.com/)._