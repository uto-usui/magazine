---
title: "Skills Night: 69,000+ ways agents are getting smarter"
source: "https://vercel.com/blog/skills-night-69000-ways-agents-are-getting-smarter"
publishedDate: "2026-02-20"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

5 min read

Feb 20, 2026

The room was full of people who had already used skills.

Tuesday night we hosted Skills Night in San Francisco, an event for developers building on and around [skills.sh](https://skills.sh/), the open skills ecosystem we've been growing since the idea started as a single weekend of writing. What began as Shu Ding sitting down to document everything he knows about React has grown into over 69,000 skills, 2 million skill CLI installs, and a community moving incredibly fast.

[

**Skills Night is heading to New York**

Join us in New York for our next skills.sh event. See from developers how they're using skills to make their agents smarter.

Join us in New York



](https://luma.com/8d50mt8d)

Here is what we learned.

### [Link to heading](#where-this-came-from)Where this came from

The origin story is worth retelling because it shapes how we think about the project.

[Shu Ding](https://x.com/shuding) is one of the most talented web engineers I've ever worked with. He knows things about React and the browser that most people will never discover. Last year, he sat down on a weekend and wrote it all down. A kind of web bible. We wanted to figure out how to ship it. We considered a blog post or documentation that the next generation of models might eventually learn - but we wouldn't see the results until Claude Sonnet 8, or GPT-9. On the other hand, an MCP server felt too heavy for what was essentially a collection of markdown documents.

Skills made sense as the quickest way to deliver on-demand knowledge. While writing the instructions for installing React best practices, I ended up copying and pasting the same installation instructions for getting the skills into Cursor, Claude Code, Codex, and the other 10+ coding agents but with slightly different installation directories.

So I built a CLI to install it into every major coding agent at once. That became `npx skills`. We added telemetry to surface new skills as they got installed, which became the data that powers the leaderboard at [skills.sh](https://skills.sh/). The whole thing went from idea to production on Vercel in days. Malte Ubl, Vercel CTO, framed it perfectly: it's a package manager for agent context.

Now we are tracking 69,000 of them, and making them not just easy to discover but easy to install, with simple commands like just:

```
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices
```

### [Link to heading](#the-security-problem-we-needed-to-solve)The security problem we needed to solve

Growth creates attack surface, and fast growth creates it even faster.

As soon as skills took off, quality variance followed. Ryan from Socket showed us a concrete example: a skill that looked completely clean at the markdown level but included a Python file that opened a remote shell on install. You would never catch that without looking at every file in the directory.

That is why we announced security partnerships with [Gen](https://ai.gendigital.com/), [Socket](https://socket.dev/), and [Snyk](https://snyk.io/) to run audits across all skills and every new one that comes in.

-   Socket is doing cross-ecosystem static analysis combined with LLM-based noise reduction, reporting 95% precision, 98% recall, and 97% F1 across their benchmarks.
    
-   Gen is building a real-time agent trust layer called Sage that monitors every connection in and out of your agents, allowing them to run freely without risk of data exfiltration or prompt injection.
    
-   Snyk is bringing their package security background to the skills context.
    

We are building an Audits leaderboard to provide per-skill assessments and recommendations. The goal is not to lock things down. The goal is to let you go fast with confidence. We're always looking for new security partners who can bring unique perspectives to auditing skills and provide more trust signals for skills.

### [Link to heading](#what-the-demos-showed-us)What the demos showed us

Eight partners showed demos on Tuesday, and a few themes kept coming up.

**Skills close the training cutoff gap.** [Ben Davis](https://x.com/davis7) ran a controlled experiment to demonstrate this.

He tried to get coding agents to implement Svelte remote functions, a relatively new API, four different ways: no context, a skills file with documentation, a skill pointing to the MCP, and a code example in the project.

Every approach with context worked.

The no-context run, which he had to force through a stripped-down model to prevent it from inferring solutions, produced completely wrong output. Models are smart enough to use patterns correctly when you give them the patterns. Without context, they fall back to stale training data.

**The medium matters less than the content.** The interesting takeaway from Ben's experiment was not that skills are the only way. It is that getting the right context in is what matters, and skills are the fastest starting point if you do not already have a baseline. Existing code examples, inline documentation, and MCP hints all work.

Skills are just the easiest way to distribute that context to anyone.

**Agents can now drive the whole stack.** [Evan Bacon](https://x.com/Baconbrix) from Expo showed native iOS feature upgrades driven entirely by Claude Code using Expo skills.

New SwiftUI components, gesture-driven transitions, and tab bar updates were all applied automatically. They are also using LLDB integration in a work-in-progress skill that lets agents read the native iOS view hierarchy and fix notoriously hard keyboard handling bugs automatically.

Their production app, Expo Go, now auto-fixes every crash as it occurs. For anyone who has spent time wrestling with Xcode, that is a significant statement.

**Skills are becoming infrastructure.** [Nick Khami](https://x.com/skeptrune) showed off that Mintlify auto-generates a skill for every documentation site they host, including Claude Code's own docs, Coinbase, Perplexity, and Lovable.

Traffic to these sites is now 50% coding agents, up from 10% a year ago. The skill is not something the docs team writes anymore; it is a byproduct of having well-structured documentation. Sentry's David Cramer built Warden, a harness that runs skills as linters on pull requests via GitHub Actions, treating agents as a static analysis layer.

### [Link to heading](#what-we're-building-toward)What we're building toward

Guillermo Rauch, Vercel CEO, said something Tuesday night that I keep thinking about: agents make mistakes.

They sometimes tell you you are absolutely right and proceed to do the wrong thing. Shipping quality in the AI era means not just celebrating how many tokens you are burning. It means raising the bar on what those tokens actually produce.

Skills are one answer to that problem. They are how we influence what agents create, keep them up to date with framework changes, and make them more token-efficient by giving them a straight path to the right answer instead of letting them stumble around.

Two million installs is real signal. The security partnerships make it something teams can rely on. And the demos showed that the most interesting skills work is not at the CLI level. It is in the agents and tools that are now treating skills as a first-class primitive for distributing knowledge at scale.

We will keep building. Come find us at [skills.sh](https://skills.sh/).

[

**Skills Night is heading to London**

Join us in London for our next skills.sh event. See from developers how they're using skills to make their agents smarter.

Join us in London



](https://luma.com/l4nmctta)