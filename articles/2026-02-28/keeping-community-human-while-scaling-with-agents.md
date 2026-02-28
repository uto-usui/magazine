---
title: "Keeping community human while scaling with agents"
source: "https://vercel.com/blog/keeping-community-human-while-scaling-with-agents"
publishedDate: "2026-02-27"
category: "frontend"
feedName: "Vercel"
author: "Pauline P. Narvas"
---

5 min read

Feb 27, 2026

At Vercel, our developer community is at the heart of everything we do. It's how we stay closest to the people using what we build.

As our community grew, automation helped us scale. But questions still got lost, routing took time, and context switching pulled us away from the work that actually required our expertise. And automation could never help with the things that mattered most, the moments where you really connect with someone and help them. You can't use AI to replicate the feeling of talking to a person who really cares.

So we built agents to take over the routing, triage, and follow-ups that don't need a human. We call this the Community Guardian. Let's talk about what it does, how we built it, and how anyone, including non-engineers, can ship agents too.

## [Link to heading](#the-community-guardian-operations-layer)The Community Guardian operations layer

When a new post comes in, the Guardian analyzes it, checks for duplicates, and assigns it to the team member with the right specialty and bandwidth. Each person handles up to 10 questions before new ones go to someone else, keeping the workload balanced across time zones.

Nothing gets overlooked. If a question goes unanswered for 48 hours, the Guardian reassigns it. It sends reminders when we're waiting for more information and detects when conversations are resolved.

Under the hood, the Guardian uses Claude through [AI Gateway](https://vercel.com/docs/ai-gateway) and runs on [Vercel Workflows](https://vercel.com/docs/workflow), which lets it check in every 10 minutes and sleep between cycles without consuming resources.

That handles the operations side, but our team still needed better context to respond well.

## [Link to heading](#the-intelligence-layer:-c0,-the-research-assistant)The intelligence layer: c0, the research assistant

While the Guardian manages logistics, c0 is the agent that goes deep on research. It lives in Slack, where our team already works.

When a team member needs context on a thread, c0 searches our knowledge base, documentation, GitHub issues, and past discussions to put together a context package. The context package helps our team respond faster and more accurately instead of relying on their own memory.

Beyond individual threads, c0 helps us close the loop with our product teams. It tracks community sentiment and recurring technical hurdles, so rather than someone spending hours auditing a week's worth of posts, we can ask c0 for the "top product feedback" and bring real data to our product conversations.

## [Link to heading](#reclaiming-human-focus)Reclaiming human focus

In its first 23 days, the system helped 281 unique users:

**Metric**

**Outcome**

Initial context gathering

4,716 first responses triaging issues and gathering logs before a team member arrives

Thread revival

1 in 8 "ghosted" threads brought back to life, resulting in 23 confirmed solutions

Operational scale

Over 1,400 agent runs in a recent two-week period, from stale-checks to auto-solving

Duplicate detection

4 duplicate threads detected via vector similarity, with 3 auto-closed at 95%+ confidence

Every substantial answer still comes from our team. Agents handle everything else around those answers. Without the repetitive parts of triage and tracking, our team can spend time on complex pair-debugging and relationship building, creating content for the broader community, or just having fun with the developers they care about.

## [Link to heading](#build-your-own)Build your own

You don't have to be a developer to build something like this. You just need an idea. I'm not an engineer. I manage community and talk to developers. Sure, I understand the problems we're solving, but I'm not writing production code every day.

My idea started at [a talk in Zurich](https://www.youtube.com/watch?v=8VWq6tcvkJA) where I showed how we were automating community workflows. But that was traditional automation, scripts and rules and if-this-then-that logic. It worked, but it was brittle. Every edge case needed a new rule.

I wanted something smarter, so I started experimenting with my coding agent to add a thinking layer, the step between "new post arrives" and "take action." Instead of "if post contains 'billing' then route to billing team," it became "read this post, understand what the person actually needs, then decide."

The thinking layer is like another DX engineer looking at each post who can read between the lines when a user says "it's not working," connect dots to a GitHub issue from three months ago, understand when someone's frustrated vs. just confused, and know when to escalate vs. when to gather more context. Building this way meant I could describe what I wanted in plain English, get working code back, test it against real community threads, and iterate.

I wanted to use different models for different tasks, give our agent access to read our docs and community, and allow it to suspend, resume, and recover if something failed. Instead of building all of that from scratch, I described what I needed to my coding agent and landed on [AI Gateway](https://vercel.com/docs/ai-gateway), [AI SDK](https://vercel.com/docs/ai/ai-sdk), and [Vercel Workflows](https://vercel.com/docs/workflow), which already handle those complexities.

### [Link to heading](#the-prompts-that-built-it)The prompts that built it

The first prompt was the core idea: "Build me an agent that helps me with the community, day-to-day operations like assigning posts and formatting. I don't know which model will work best yet but make it easy to switch without needing new API keys. Use the AI SDK for the agent."

From there, the prompts got more specific as I understood more about what I was building. "And triggers every 10 minutes, I want to check for the latest threads." I'd started with cron jobs, but switched to Vercel Workflows for this. The durable execution meant the agent could suspend between checks and resume exactly where it left off.

"Make sure we're rotating assignments every 4 hours." Every prompt unlocked the next question. I wasn't following a tutorial or docs. I was having a conversation, and the system grew from that conversation.

You don't need to know the right terminology or how to code. You just need to know your problem well enough to describe it and be willing to iterate when something doesn't work the way you expected. The thinking layer turns automation from "follow these exact rules" into "understand the situation and make a judgment call."

## [Link to heading](#build-with-heart)Build with heart

Community is about people, and we want our people to have the time and energy to show up fully, building with and for the developers in our community.

If you want to build something similar, we built c0 with the [Chat SDK](https://github.com/vercel/chat), a unified TypeScript SDK for building agents across Slack, Teams, Discord, and more. The Guardian uses [Vercel Workflows](https://vercel.com/docs/workflow) for durable execution. Come share what you build [in the community](https://community.vercel.com/). We're always happy to talk through what we've learned.