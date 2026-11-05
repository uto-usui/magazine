---
title: "Design Feedback for AI Agents"
source: "https://www.lukew.com/ff/2170/design-feedback-for-ai-agents"
publishedDate: "2026-11-03"
category: "design"
feedName: "LukeW"
author: "info@lukew.com (Luke Wroblewski)"
---

No plan survives contact with the battlefield and no design system survives contact with the product. Products are full of variants and combinations most design systems don't account for. So when AI agents [are the ones](https://www.lukew.com/ff/2164/design-systems-for-ai-agents) applying design systems to production code, how does this real world battle hardening happen?

In [Design systems for AI agents](https://www.lukew.com/ff/2164/design-systems-for-ai-agents), I outlined the techniques we use to ensure coding agents make use of design specifications and components each time they make changes or create new features. This has the advantage of continually steering software towards a cohesive product design and brand. But no matter how robust a design system is, it can't take into account all the potential combinations of layout and functionality a software application needs to work.

[![design system for Intent, example of colors and components](https://static.lukew.com/intent_designsystem_agents.png)](https://static.lukew.com/intent_designsystem_agents.png)

Nor should it. Over [the years](https://www.lukew.com/ff/347/design-patterns-introduction) we've intentionally scaled back the amount of content in our design systems so they can stay relevant and manageable. Without significant restraint, design system systems have a tendency to spiral out of control in both resource requirements (an ever increasing design system team) and complexity (more components, more states, more documentation).

But if design systems for AI agents are not enough, how do you close the gap on coherent, integrated products? In our recent projects, we've relied on a rapid and lightweight design feedback loop. The first pass of a feature or change is driven by the design system and agent instructions, which gets us 90% of the way there. (it's worth noting earlier AI model capabilities could only get us 50 to 60% of the way.)

[![design feedback for the Intent iOS app as comments inside of Figma](https://static.lukew.com/agent_designfeedback_screens2.png)](https://static.lukew.com/agent_designfeedback_screens2.png)

We then use a process of visually showing agents where things don't lineup or work and having them correct each one until all the variants and composite layout issues are taken care of. We've tried a number of ways to provide this feedback including marking it up inside Figma with comments, annotating screenshots, and just plain old typing each change into a chat box.

[![design feedback for the Intent iOS app up close, comment](https://static.lukew.com/agent_designfeedback_comment3.png)](https://static.lukew.com/agent_designfeedback_comment3.png)

These experiments led to a more a tightly integrated feature in [Intent](https://intentapp.dev/) for providing visual feedback to AI agents. In the [latest release](https://intentapp.dev/), the notch on macOS devices provides a way to use your entire screen as feedback. Not only can you type or speak instructions but you can also annotate anything on your screen, take screenshots, make videos, or any combination of these to provide last mile feedback on user interface issues.

This approach streamlines bridging the gap between a high-level component and design system and its real world application in a variety of screens, edge cases, and features. The logical next step would be using all this feedback to further improve the design system. After all... intelligent systems should learn right?

Alas today's current AI models still lack the judgment needed to know what to integrate and how. If given free license today's models will err on the side of over documentation instead of the pattern simplification and cohesion needed in an effective design system. So for now, a designers judgment still matters a lot.