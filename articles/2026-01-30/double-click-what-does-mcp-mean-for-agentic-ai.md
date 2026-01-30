---
title: "Double click: What does MCP mean for agentic AI?"
source: "https://www.figma.com/blog/double-click-what-does-mcp-mean-for-agentic-ai/"
publishedDate: "2025-06-05"
category: "design"
feedName: "Figma Blog"
---

Anthropic introduced the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) back in November, but it was only after OpenAI [announced its support](https://x.com/sama/status/1904957253456941061) for MCP earlier this year that it hit peak virality. In a nutshell, MCP creates a common protocol for how AI assistants like Claude, Copilot, or Cursor communicate with external tools and data sources, so developers don’t have to create custom integrations for each one. You’ve probably heard it being compared to a USB-C port for AI applications, or as **Microsoft Chief Technology Officer Kevin Scott** [put it at this year’s Microsoft Build conference](https://www.youtube.com/watch?v=sOmGNB-xflw), “akin to HTTP for the internet, where it allows you to do sophisticated things because the protocol itself doesn’t have much of an opinion about the payload that it carries.”

By giving large language models (LLMs) a way to connect to tools and data sources in real time, MCP holds huge promise for [agentic AI](https://www.figma.com/blog/double-click-human-takes-on-agentic-ai/)

and its ability to act on our behalf. Since it hit the scene, the [list of available servers](https://github.com/modelcontextprotocol/servers) grows daily. In fact, we’ve built our own

[MCP server

### Introducing our MCP server: Bringing Figma into your workflow

Today we’re announcing the beta release of the Figma MCP server, which brings Figma directly into the developer workflow to help LLMs achieve design-informed code generation.



](https://www.figma.com/blog/introducing-figma-mcp-server/)

to bring Figma into developer workflows and help LLMs generate design-informed code. So what does this new standard say about where we’re headed?

## [MCP is an accelerant](#mcp-is-an-accelerant)

You might be wondering, “How is using an MCP server to generate code with an LLM better than using one that connects to an API?” You’re not alone: **Pat Walls, Founder at Starter Story**, [posed this question on X](https://x.com/thepatwalls/status/1897766405962883439). “With MCP, LLMs are aware of various ‘tools’ and will interact with them mid-conversation to expand their capabilities,” [answered](https://x.com/LostAndFounding/status/1897768836792713362) user **@LostandFounding**. “In your example, the LLM would have to generate the code and then run the code every time you want to interact with a tool—would be really impractical and inefficient.” With MCP, you get speed and scalability, which means that now more than ever, [you can just do things](https://www.figma.com/blog/double-click-you-can-just-do-things/)

.

**Shubham Saboo, Head of Developer Relations at Tenstorrent,** built the “[automated AI travel agency](https://x.com/Saboo_Shubham_/status/1919942105553895737)” many of us have envisioned with four agents working across Google Maps, Airbnb, Google Calendar, and Weather. **Siddarth Ahuja, Co-founder of Prophecy,** created a Blender MCP server to create a 3D scene of a “[low-poly dragon guarding treasure](https://x.com/sidahuj/status/1899460492999184534)” with just a few sentences. And recently, **Y Combinator** hosted “[the world’s biggest MCP hackathon](https://x.com/gustaf/status/1923927705994805708)” with the winners **Rajmeet Singh, Rishabh Chanana, and Chris Hailey** [taking first place](https://x.com/RajmeetChandok/status/1923988460559532473) with Observee, an observability platform for MCP calls.

## [Quality in, quality out](#quality-in-quality-out)

It’s not just about doing things, though—it’s about doing them well. **John Kutay, Director of Engineering at Rippling**, [wrote on X](https://x.com/JohnKutay/status/1914035314785747369) that the protocol can help enrich AI: “MCP, when implemented well, delivers the determinism AI needs for business apps…it can use AI in clever ways rather than being a slop machine.”

> MCP, when implemented well, delivers the determinism AI needs for business apps…it can use AI in clever ways rather than being a slop machine.

John Kutay, Director of Engineering, Rippling

**Jake Albaugh, Developer Advocate at Figma**, underscores the importance of precise contexts: “On their own, MCP servers extend access to context, but determining the best context to provide through those new channels is still very much where expertise lies.” As he explains with the beta release of [Figma’s MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

, the better alignment there is between design and code, the better the results of the server. “The MCP server is a multiplier—not a replacement—for alignment,” he says.

As we’ve heard, [efficiency doesn’t mean we leave craft behind](https://www.figma.com/blog/double-click-does-efficiency-kill-love/)

. Quite the opposite: It means we become more discerning and precise when it comes to our process and output.

## [A foundation for future growth](#a-foundation-for-future-growth)

At Microsoft Build, **Microsoft CTO Kevin Scott** emphasized the need to align on a standard to fulfill the potential of MCP. “MCP is filling an incredibly important niche in the open agentic web ecosystem,” he [said in the keynote](https://www.youtube.com/watch?v=sOmGNB-xflw). “When you think about the utility of a protocol at this layer of the stack, the most important thing is ubiquity. We can get into all sorts of arguments as engineers where we’ve got sharp opinions about pieces of technology—you know, ‘this thing’s a bit better than that thing’—but what’s better than all of that is just getting something standard that we can all use and build on top of.”

**McKay Wrigley, Founder of Takeoff,** also sees potential in the lightweight, unopinionated nature of MCP. “The standard is as useful as the size of the community that adopts it because you can build once, and use anywhere,” he [said in a lightning talk on X](https://x.com/mckaywrigley/status/1898109392341385509). With a protocol in place, says **Anna Marie Clifton, Director of Product, AI, and Agents at Zapier,** we can build toward more sophisticated systems. “I think to be an agent, you have to be able to operate autonomously, which means that you need some sort of triggering mechanism that you’re monitoring the environment for,” she [posted on X](https://x.com/TweetAnnaMarie/status/1923180284226277463). “ There’s going to be new types of triggering architecture and systems that we haven’t invented yet.”

## [The TLDR](#the-tldr)

MCP does what hasn’t been possible before—give LLMs a standardized way to communicate and interact with external tools. All signs show that as enthusiasm builds for the agentic web, we’re focused on raising the bar for what good looks like.