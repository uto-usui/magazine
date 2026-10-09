---
title: "Many agents, many views"
source: "https://www.lukew.com/ff/2165/many-agents-many-views"
publishedDate: "2026-10-06"
category: "design"
feedName: "Sidebar"
---

In today's [AI-powered software](https://www.lukew.com/ff/2096/the-evolution-of-ai-products), you manage agents, they manage more agents, and those agents manage even more agents. Chat threads break with that scale. We need to know what agents are planning, what they've already done, and how best to steer them. In other words we need different ways of seeing things.

When most people think about staying on top of agent activity, they jump to management views: an inbox like those found in Slack and email; a dashboard like those found in monitoring apps. Effectively these answer the question "what are my agents doing right now?"

I took a look at inboxes, Kanban boards, task lists, dashboards, and calendars in a post last year about [agent management interface patterns](https://www.lukew.com/ff/2106/agent-management-interface-patterns). But while these kinds of agent views currently get all the attention, more specific and dynamic views may actually be more useful.

[![agent management interface patterns, like inbox, calendar task, list, dashboard](https://static.lukew.com/agent_management_patterns.png)](https://static.lukew.com/agent_management_patterns.png)

That's why in [Intent](https://intentapp.dev/), our large scale agent coordination tool for developers, we've built in multiple ways to see what's going on. Intent lets you create any number of documents (we call them notes) when working on a task, so you can have the specific views you need when you need them. A few examples:

Agents can draw architecture maps, flowcharts, sequence diagrams, and state machines inside notes and chats so you know what they are planning to do, and how, before spending the tokens.

[![diagram views of agent plans in Intent](https://static.lukew.com/intent-views-diagrams.png)](https://static.lukew.com/intent-views-diagrams.png)

Stepped walk-throughs move you through a diagram one stage at a time, each with a short explanation and the relevant parts highlighted. This not only makes plans easier to follow but also helps you quickly understand the current state of things. Boxes that reference files or notes open them when you click so can go deeper if needed.

[![step by step diagram views of agent plans in Intent](https://static.lukew.com/intent-views-diagramsteps.png)](https://static.lukew.com/intent-views-diagramsteps.png)

Agents can take before and after screenshots of their UI changes and place them side by side in a note letting you judge results without reading any code. These notes can update with each change or stick around as a historical record. Agents in Intent can also pin a screenshot to show progress at a glance.

[![Visual reviews of ancient changes in Intent](https://static.lukew.com/intent-views-visualreviews.png)](https://static.lukew.com/intent-views-visualreviews.png)

A app or website's design system can also be viewed as a note: colors, type styles, spacing, corner rounding, animation timings, and components with their variants, all in one place. Keeping a view like this open while you work makes "which padding?" one glance away. Agents read the same notes, so their UI work lines up with your references.

[![dynamic design system views in Intent](https://static.lukew.com/intent-views-designsystem.png)](https://static.lukew.com/intent-views-designsystem.png)

Of course, lots of views aren't much help if you can't set them up in a way that's useful. Every panel in [Intent](https://intentapp.dev/) can hold a stack of agents, notes, files, terminals, and browser tabs. Drag things between panels, drop one on an edge to split off a new panel, and zoom any panel to full screen if you need focus.

Yes, chat still has a place for kicking off, moving along, and redirecting work. But as agents keep multiplying, a configurable workspace of useful views goes a long way toward steerings thing toward the outcomes you want.