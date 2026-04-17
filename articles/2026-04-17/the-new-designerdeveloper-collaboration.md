---
title: "The new designer/developer collaboration"
source: "https://www.lukew.com/ff/entry.asp?2148"
publishedDate: "2026-04-16"
category: "design"
feedName: "Sidebar"
---

by [Luke Wroblewski](http://www.lukew.com/about/) April 15, 2026

There's lots of ways to build a website. Most of them involve designers working in one tool, developers working in another, and a painful handoff process somewhere in between. We recently used [Intent](https://www.intentapp.dev/) to build and ship a well-crafted [website](https://arianetworks.com/) in about three weeks, and the collaboration model that emerged shined a light on how things could (no, should) be.

## Design First

We started the way most Web projects start these days: in Figma. Visual explorations of what the style, wireframes for the structure, then bringing the two together into full page layouts. Our designer set up the grid, typography scales, color variables, buttons, and reusable components. Your typical design system.

[![Aria Design System in Figma](https://static.lukew.com/ariasite_figma_designsystem.png)](https://static.lukew.com/ariasite_figma_designsystem.png)

This process took about two weeks and was pretty standard. Desktop and mobile comps, a couple rounds of feedback on visuals and copy, iterating until we had a visual style, a rough structure, and directional content. Just a solid Web design process.

[![Aria Web sites page designs in Figma](https://static.lukew.com/ariasite_figma_pages.png)](https://static.lukew.com/ariasite_figma_pages.png)

## Development Foundation

Once the designs were in a good place, our developer jumped in. But not by staring at a Figma file and manually translating pixels into code. Instead, he opened up [Intent](https://www.intentapp.dev/), set up the project scaffolding (Astro, Tailwind), connected to the Figma MCP, and wrote an agents.md file that pointed to all the artboards.

Then he kicked off a series of workspaces. The first one pulled the design tokens into Tailwind. The second started laying out the first page using those tokens. After that, he was able to break off into parallel workspaces, one for each page. Desktop layouts first, then separate passes for mobile.

This whole phase, the front-end infrastructure, took maybe one or two days of actual work. And by the end, every page existed in code, using the design system, at roughly 85% fidelity. Not pixel perfect, but pretty damn close.

## Parallel Work

Once he deployed the site to a staging URL, the three of us started working in [Intent](https://www.intentapp.dev/) simultaneously: our designer, our front-end developer, and me handling product/project management. Though we all were using the same tool, we each worked our own way.

Our designer set up a grid overlay so he could visually verify alignment. He would tell the agent "align to column three" and it would snap things into place (way better than guessing at percentage values). He preffered staying in one workspace to tweak alignment and refine grid positioning across a full page before committing things.

[![Designer Workflow in Intent - setting up a grid](https://static.lukew.com/aria_intent_design1.png)](https://static.lukew.com/aria_intent_design1.png)

Once the pages were structurally solid, he moved on to animations. Entrance effects on homepage elements, scroll-triggered transitions, etc.. Work that normally takes days of back-and-forth between a designer specifying timing curves and a developer implementing them happened in about hours. He still maintained manual control where it mattered, finding the exact easing curve he wanted then telling the agent to use it. The implementation was handled for him so he could focus on how things felt.

[![Designer Workflow in Intent - animation tweaking](https://static.lukew.com/aria_intent_design2.png)](https://static.lukew.com/aria_intent_design2.png)

Meanwhile, I was doing content and product work. Dumping in blog posts from Word docs, adding image assets, making text changes based on feedback from the broader team. My approach was simple: small discrete tasks with a single agent. Fix one thing, commit. Fix another thing, commit. Once I had four or five commits, I'd open a pull request, toss out the workspace, and start a new one. The design tokens and setup our developer created ensured my changes were all inline with our design and development architecture.

[![Working on Aria Web Site in the Intent app](https://static.lukew.com/ariasite_intent_screen.png)](https://static.lukew.com/ariasite_intent_screen.png)

Our developer's job during this phase was partly creative and partly managerial. He handled the templatized pages (news, product detail) where variable content meant design rules mattered more. He also kept an eye on pull requests, merged changes, resolved conflicts, and updated the agents.md file when he noticed patterns emerging in the code that should be standardized.

[![Developer Workflow in Intent](https://static.lukew.com/aria_intent_build4.png)](https://static.lukew.com/aria_intent_build4.png)

For example, when he saw icons being added in a way that wouldn't scale, he set up a better pattern and documented it. The next time anyone needed to add icons, the agent just followed the convention automatically. He used [Intent](https://www.intentapp.dev/) for conflict resolution too, pulling up conflicting branches and having the agent sort them out. Out of maybe 30 or 40 pull requests across the project, only five needed real manual intervention.

[![Developer Workflow in Intent](https://static.lukew.com/aria_intent_build3.png)](https://static.lukew.com/aria_intent_build3.png)

Same tool, three different workflows, nobody waiting on each other.

## Crunch Time

Every web project has a crunch period right before launch and ours was no different. The broader team started paying attention (as they always do at the very end), and feedback flooded in. But because the three of us could all be in Intent making changes at the same time, the crunch was way more manageable than usual.

[![Crunch time for the Aria Web Site in Slack](https://static.lukew.com/ariasite_slack_crunch2.png)](https://static.lukew.com/ariasite_slack_crunch2.png)

The biggest win was that any one of us could contribute meaningfully to the codebase without breaking the design system, code structure, or the site. That's a fundamentally different dynamic than waiting for a developer to make every change.

## A New Way of Working?

It wasn't perfect. CSS layout struggles are still a thing. Git seems to keep finding ways to bite you. And there's still a learning curve for non-developers, even with agents handling the hard parts.

But without the handoff, everyone builds. And that makes all the difference.

What else can I help with?

-   [Designing Perplexity](https://www.lukew.com/ff/entry.asp?2095)
-   [The Evolution of AI Products](https://www.lukew.com/ff/entry.asp?2096)
-   [Background Agents Reduce Context Window Issues](https://www.lukew.com/ff/entry.asp?2102)
-   Tags: [ai](https://www.lukew.com/ff?tag=ai) [ai design](https://www.lukew.com/ff?tag=ai%20design) [ai models](https://www.lukew.com/ff?tag=ai%20models) [agents](https://www.lukew.com/ff?tag=agents) [process](https://www.lukew.com/ff?tag=process)