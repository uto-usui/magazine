---
title: "The software factory forgot about design"
source: "https://atifaz.am/writing/the-software-factory-forgot-about-design"
publishedDate: "2026-10-29"
category: "design"
feedName: "Sidebar"
---

Two years ago I left Coinbase to build on my own. Since then I've built and shipped almost a dozen products. Some completely abandoned, others dead upon arrival and a couple that are steadily growing and generating revenue.

The way I build has changed a lot over that time. What I use now didn't come from a plan. It came from a lot of iteration, and from a few products that taught me what not to do.

There is a lot of talk right now about the "software factory." You write an issue, an agent picks it up and a pull request comes out the other end. Repeat until you have a product.

I like the idea, and it's close to how I work. But almost every version of it I see skips the same step, which is design.

Usually design shows up as a few inspirational screenshots pasted into a ticket to direct the agent on how to design. Or it doesn't show up at all and the agent is left to decide what the thing should look and feel like. And it will decide, pretty confidently.

Code is cheap now. What's still expensive is deciding what to build and how it should feel. I think that's the part the factory is missing.

So here is the workflow I've landed on. It has four stations.

![A flow diagram. Manual and automated inputs feed into Linear, then Paper, then Codex, then a review by me, with a line looping back to the start. Paper is highlighted in blue.](https://atifaz.am/writing/images/design-station-workflow-v2.jpg)

Every task with a design side goes through Paper before it gets built.

The first is [Linear](https://linear.app/). That's where intent lives, and it gets there one of two ways.

The manual way is me. Sometimes I write the issue myself, and sometimes I work through an idea with an agent until it's clear enough to become a ticket. The automated way doesn't need me at all. Agents file issues on their own, like a support agent turning a bug report into a ticket or a DevOps agent spotting something that's breaking.

Either way every issue has to say two things: why we're doing it and what done looks like. If it can't say that in a few sentences it isn't ready to be built.

The second is [Paper](https://www.paper.design/). Anything with a design, frontend or experience side to it goes through here before it gets built. The agent works in Paper directly through MCP, so it can put together a first pass on the canvas, look at what already exists and pull from the design system.

But I always review the designs myself. A lot of the time I end up polishing them by hand, nudging spacing, rewriting copy and fixing whatever feels off. Other times I leave comments on the canvas and have the agent address them.

This is where the real decisions get made about layout and how the thing should feel. And because Paper designs are real HTML and CSS under the hood, nothing gets lost when it moves to code.

The third is the coding agent. I mostly use Codex, but Claude Code or any other coding agent works here too. It gets the issue and the design and builds against both. This is the part everyone talks about, and honestly it's the part I think about the least now.

The fourth is me again, reviewing what was built against what I meant. When the build doesn't match the design I don't treat it as a bug right away. Sometimes the agent got it wrong. Sometimes it found something better and the design gets updated.

Then it loops.

Now this all works pretty well. But there is one place where it still breaks down for me.

It's easy to give an agent context in the moment. You hand it the issue, point it at the design and tell it what you want, and it does a good job with that.

What it doesn't have is everything that came before. Why a flow was tried and then pulled. What the analytics said the last time a page changed. The earlier versions of a screen and why each one got thrown out. The design system and the reasons behind it, not just the components.

![Two sides. On the left, faded chips for past decisions, earlier designs, analytics and the design system. On the right, a new Codex session that only has the issue and the design, plus a dashed placeholder for everything before. A red cross sits between them.](https://atifaz.am/writing/images/design-station-memory-gap-v2.jpg)

Each session gets context in the moment. None of them get what came before.

A designer who has been on a product for a while carries all of that around with them. It's a big part of what makes their judgment worth anything. Every new agent session starts without it.

This is the one gap I still haven't closed. I think we need some kind of persistent memory for product decisions, past designs and what the numbers said, and I don't think anyone has solved that well yet. It's the part I'm still working on, and probably the subject of another post.

Even with that gap, this workflow has changed how I build more than any single tool has. Putting design back into the loop made the biggest difference, and it doesn't take much to set up.

I wanted to share it in case it's useful to anyone working through the same problems. If you have questions or want help setting up something similar, [DM me on X](https://x.com/heyatif). I'm always happy to talk about this stuff.