---
title: "Where decisions live"
source: "https://www.antonsten.com/articles/where-decisions-live/"
publishedDate: "2026-10-23"
category: "design"
feedName: "Sidebar"
---

October 16, 2026 · 4 min read

One of the more useful changes I’ve made to how I work has nothing to do with Figma. I’ve become much more deliberate about where different kinds of project information live.

The problem wasn’t that there wasn’t enough documentation. Usually the opposite. There were Slack threads, meeting notes, design comments, tickets, personal notes, and decisions scattered across all of them. Everything existed somewhere, but finding out what had actually been decided was still harder than it should have been.

Agents help with this to some extent. I can ask a question across a lot of context now instead of manually searching every thread. But that only works if the agent has access to the sources, and if those sources contain enough chronology to make sense of what changed when, because a decision without a date can be surprisingly dangerous. Maybe it was made yesterday. Maybe it was made six weeks ago and has since been reversed. Maybe it was a suggestion that everyone discussed but nobody actually agreed to. Search makes information easier to retrieve. It doesn’t automatically make it trustworthy.

So I’ve ended up with a fairly simple model. Slack is for discussion. Meetings are where a lot of things get resolved, and I use Granola heavily because I don’t want to rely on memory for what someone said or why we landed somewhere. Inside each project folder in my private repo, I keep two other files: `running-notes.md` and `decisions.md`.

They sound similar, but they do very different jobs. `running-notes.md` is chronological. It contains observations, questions, things I’ve tried, details that might matter later, and thinking that is still changing. It is allowed to be messy because it reflects the work as it happens. `decisions.md` is much stricter. It’s the record of where things landed, with the newest decisions at the top. Some of those decisions are team decisions. Others are design decisions I’ve made while shaping the experience and may never need a meeting or Slack announcement.

That separation has been a huge unlock. If I want to understand how we got somewhere, I look at the running notes. If I want to know what is currently true, I look at the decisions. An agent can use both, but the distinction matters, because without it every old thought carries roughly the same weight as a current decision. You end up asking an agent a question and getting back a perfectly sourced answer to something nobody believes anymore.

I think this is one of the less discussed parts of making agents genuinely useful in product work. We talk a lot about giving them more context: access to Slack, meeting transcripts, repositories, design files, tickets. More context is good, but context also needs structure. The agent needs some way to distinguish exploration from commitment, old information from current information, and a team decision from one person thinking out loud.

That is partly why timestamps matter so much. A decision log with dates gives you something close to version history for the product’s thinking. If a decision changes, I don’t delete the old one. I add the new decision above it, which lets both me and the agent see that something changed instead of pretending the previous state never existed. The same applies to running notes, where chronology makes it possible to understand whether a question is still open or whether later work resolved it.

I don’t think every team needs my exact setup. The useful principle is that different places should have different jobs. Discussion can be messy. Meetings can be conversational. Notes can capture uncertainty. But decisions need somewhere durable to land, otherwise the team keeps paying for the same decision twice: once when they make it, and again six weeks later when nobody can remember what they decided.

Agents make that problem easier to solve, but they also expose how much discipline the underlying information needs.

A searchable mess is still a mess.

## Join 2,600+ designers and product people.

I write about the messy reality of product design: what works, what doesn't, and what I'm still figuring out after 29 years of working as a designer.