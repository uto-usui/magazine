---
title: "The AI steering layer"
source: "https://www.lukew.com/ff/entry.asp?2155"
publishedDate: "2026-06-25"
category: "design"
feedName: "Sidebar"
---

by [Luke Wroblewski](http://www.lukew.com/about/) June 24, 2026

Large scale AI models can produce an innumerable variety of output (text, images, code). In most applications, though, teams want very specific output aligned with brand, design, and coding guidelines. An intentional steering layer can not only help but is increasingly needed in software today.

When building, and even more-so maintaining, websites and software applications, cohesion matters. A consistent brand enforced by intentional use of visuals, colors, fonts, etc. Coding standards, libraries and frameworks, a common development process, etc. Today's AI models can handle all that and more but how do teams make sure they handle it all the way they'd like? And do so repeatedly.

The answer boils down to context: prompting models with clear, comprehensive and relevant instructions. Better context, better results. So how can we encode context into our applications so not only every update to a Website or application stays aligned but every person on a team does too? In our recent projects we've relied on a steering layer.

[![Steering Layer diagram](https://static.lukew.com/steeringlayer1.png)](https://static.lukew.com/steeringlayer1.png)

So what's a steering layer? Put simply, it's how context gets enforced across a project, a team, and even, a company. Every Website or application at its core has a codebase and a set of tools for people to modify that codebase. That's how features ship, performance improves, and ideally software companies make money. A steering layer (conceptually) sits in between the tools and the codebase.

Examples, please. Let's start with a really simple one. My [LukeW Character Maker](https://lukew.com/maker/) is a small application that allows anyone to make on-brand (for LukeW) image assets. It consists of a tool that allows people to create, review, save, and share assets. A steering layer composed of guidelines, reference images, and prompt rewriting. And the code that runs everything.

[![Steering Layer for the LukeW Character Maker](https://static.lukew.com/steeringlayer_lukewcharacter.png)](https://static.lukew.com/steeringlayer_lukewcharacter.png)

The steering layer is responsible for enforcing an AI image model's output aligns with the LukeW character's style, colors, appropriate use guidelines, and more. The [LukeW Character Maker](https://lukew.com/maker/) tool allows anyone to easily stay on brand when making a LukeW brand asset. And the codebase makes it all happen.

At this point, it's worth noting that the steering layer often lives in the codebase. When it's just text files, reference images, etc. It makes perfect sense to leverage the version control, review process, and team collaboration native to code. But not everyone on a team is comfortable, nor should have to be, working as a developer. For the cases where designers, copywriters, PMs, and others should contribute to and maintain the steering layer, a UI for doing so separate from the codebase makes sense.

[![Steering Layer in a codebase](https://static.lukew.com/steeringlayer2.png)](https://static.lukew.com/steeringlayer2.png)

As another example, we recently launched a Website for our Agentic HR company, [Sol](https://www.meetsol.com/). The steering layer for the website consists of a set of design tokens, development instructions in an agents.md file, and some agent skills. These live in the codebase with everything else. But anyone using AI agents to update the site (with a tool like [Intent](https://www.intentapp.dev/)) is "snapped to" the design and development guidelines in the steering layer. This allows everyone on the team to make Website fixes and add new content without diverging from the [design](https://www.meetsol.com/design) and development guidelines.

[![Steering Layer for the Meet Sol website](https://static.lukew.com/steeringlayer_meetsol.png)](https://static.lukew.com/steeringlayer_meetsol.png)

It's also worth noting that a steering layer isn't limited to a few text or image files. In the case of the Ask LukeW feature on this Website, the steering layer is composed of not only instructions and examples, but multiple [retrieval systems](https://lukew.com/ff/entry.asp?2086) I've iterated on for the past few years as well. Their job is to find the right context for any given question and dynamically apply them to steer results. There's also a whole set of admin tools for managing what's in the context they pull from but that's a whole other topic.

With each new project, we're looking at better ways to make the steering layer visible (and for some, editable) to teams. We're also building steering layer powered tools that enable more people in an organization to contribute to projects without sacrificing cohesion. So... more to come.

Got a question about this article or anything else?

-   [AI Has Flipped Software Development](https://www.lukew.com/ff/entry.asp?2112)
-   [The New Designer/Developer Collaboration](https://www.lukew.com/ff/entry.asp?2148)
-   [Generative Agents](https://www.lukew.com/ff/entry.asp?2030)
-   Tags: [ai design](https://www.lukew.com/ff?tag=ai%20design) [ai model](https://www.lukew.com/ff?tag=ai%20model) [process](https://www.lukew.com/ff?tag=process) [agents](https://www.lukew.com/ff?tag=agents) [steering](https://www.lukew.com/ff?tag=steering)