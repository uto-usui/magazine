---
title: "How Conductor moved parallel coding agents from the laptop to the cloud with Vercel Sandbox"
source: "https://vercel.com/blog/how-conductor-moved-parallel-coding-agents-from-the-laptop-to-the-cloud-with-vercel-sandbox"
publishedDate: "2026-05-27"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

3 min read

May 27, 2026

### [Link to heading](#conductor-on-vercel)Conductor on Vercel

-   Multiple parallel coding agents running at scale in the cloud
    
-   Model-agnostic, works with Claude Code, Codex, and other coding agents
    
-   Used by engineering teams at Notion, Linear, Ramp, and Life360
    

Interacting with a single coding agent feels natural, and Conductor makes directing a fleet of agents just as intuitive.

It's a GUI for spinning up multiple coding agents in parallel, each working on an isolated branch of your codebase at once. You review their work, merge what works, and redirect the agents that need to keep iterating.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4a7bfvZxXdBDbOdAImZZFT%2Fca5c0addb2ca1463a6e9f7e50454f6fb%2FCleanShot_2026-05-29_at_09.52.22.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2m459rN0OXNVsWesfBnJCo%2Fc922d2402c744425af8849b3b48be93c%2FCleanShot_2026-05-29_at_09.52.37.png&w=1920&q=75)

Engineering teams loved it, but hardware was a real limitiation. Every agent ran on your machine, so the fan climbed, the CPU ran hot, and if you closed your laptop, the agents stopped.

Charlie Holtz, co-founder and CEO of Conductor, spent time at Vercel before starting the company. He understands what developers lose when their environment imposes rules on how they can work. Cloud Workspaces, Conductor's remote execution layer built on Vercel Sandboxes, removes the local hardware constraint. Developers can now spawn multiple agents and close the lid without interrupting work.

## [Link to heading](#the-journey-from-local-to-cloud)The journey from local to cloud

Developers who adopted Conductor early felt the power. Notion's engineering team said, "It makes you feel like an octopus, where each one of your arms is working on something separately."

The demand for remote execution came quickly. Developers wanted more agents running longer, and local hardware was the ceiling. For a six-person startup, going from local to cloud is a huge leap, and when the developers using Conductor work at companies like Linear and Ramp, the choice of provider isn't just a technical decision. It's a trust conversation with the people running their code on infrastructure they don't own.

The team evaluated several sandbox providers, weighing fast spin-up and snapshot support alongside longevity and the depth of the support relationship.

> There are so many sandbox providers now, and we needed to know that ours were going to be fast and reliable, and that we would get great support. Vercel checked all of those boxes, and they have incredible DX for our engineering team.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6iiBOHTHlMFYBm1UXX98gb/231d252866701fcf000d0ea52feeb6a7/charlie-holtz-headshot.jpeg)
> 
> **— Charlie Holtz,** Co-founder & CEO @ Conductor

## [Link to heading](#running-parallel-agents-in-the-cloud)Running parallel agents in the cloud

Conductor built Cloud Workspaces on Vercel Sandboxes. When a developer opens a new workspace, agents spin up on a remote server instead of their local machine. The interface doesn't change.

Holtz describes the result: "To our users it feels just like the local version of Conductor. They don't know the difference, which is amazing, and that's because Vercel Sandboxes are super fast."

> Our users can't tell the difference between local and cloud because Vercel Sandboxes are super fast.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/6iiBOHTHlMFYBm1UXX98gb/231d252866701fcf000d0ea52feeb6a7/charlie-holtz-headshot.jpeg)
> 
> **— Charlie Holtz,** Co-founder & CEO @ Conductor

Conductor already supports Claude Code, Codex and other coding agents, but they are model agnostic. That means that no matter how often labs release updates, or what the next popular harness is, they can keep the same cloud layer underneath. As Holtz puts it: "The vibes shift every 3 months. Right now GPT-5.5 has the vibes on its side, but that's going change in another few months. Being agnostic to the providers is the key, and we get that with Vercel."

## [Link to heading](#one-interface,-whatever-the-frontier-looks-like-next)One interface, whatever the frontier looks like next

Conductor's bet is on the interface: the one place to direct your agents, review their work, and decide what to merge. With Vercel Sandbox, that interface goes wherever developers go.

**About Conductor**: [Conductor](https://conductor.build/) is a multi-agent IDE for running coding agents in parallel, each on isolated branches of your codebase. Model-agnostic by design, it works with Claude Code, Codex, and other coding agents.