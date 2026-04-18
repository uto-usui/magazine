---
title: "How FLORA shipped a creative agent on Vercel's AI stack"
source: "https://vercel.com/blog/how-flora-shipped-a-creative-agent-on-vercels-ai-stack"
publishedDate: "2026-03-31"
category: "frontend"
feedName: "Vercel"
author: "Eric Dodds"
---

3 min read

Mar 31, 2026

### [Link to heading](#flora-on-vercel)FLORA on Vercel

-   2x faster to production with their generation system
    
-   Zero infrastructure debates after migration
    
-   50+ image models orchestrated
    

A seasonal fashion launch is a story, not a single frame.

Crafting that story is a process of exploration: It’s the same piece, worn by different models. The same pose, with different lighting and angles. The same set, with a background that shifts from glossy to gritty.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2zl26hqiehEvhKC1dNFbRV%2Fd0a7117f8fc70162658765543d9e6a40%2FScreenshot_2026-03-30_at_8.02.48%C3%A2__PM.png&w=1920&q=75)

FLORA was built to make that kind of visual iteration available to anyone through a digital canvas. Their new creative agent FAUNA acts like a design partner, turning ideas into a map of creative directions.

## [Link to heading](#from-flora-to-fauna:-a-creative-agent)From FLORA to FAUNA: a creative agent

Flora started as a node-based creative workflow canvas. For advanced users, that canvas is powerful: you can create steps and branches, adding detailed prompts at each stage to hone every detail of the images.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7LdR17ATCRskuJaVhDqGcQ%2Faa5dbba31caf7a389b8c03842e8931a4%2FCleanShot_2026-03-31_at_10.12.04_2x.png&w=1920&q=75)

But the canvas also came with a tradeoff: it asked every creative to think like a workflow designer. You had to configure each state of an exploration with prompts and model choices, interrupting the creative process.

That’s why they built FAUNA.

The agent removes the setup burden, but keeps the full power of AI. Instead of starting with a blank canvas and a pile of example images, designers can start with their ideas. Users tell FAUNA what they want to create, like a campaign visuals, moodboards, or a lookbook direction, and the agent will pull references, choose models, and automatically generate variations to explore and refine.

Under the hood, FAUNA is a long-running, highly parallel agent. Alec Jo, Head of Applied AI at FLORA, leads the effort.

> Unlike agents that assume that there’s one answer, ideating is inherent to the creative process. We built FAUNA to be a creative partner that explores and iterates with you, rather than trying to give you the answer.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/V1c0MQJlSsmjfsthjZ0le/d926f9a9739c2dda06c5ca816761f5ef/alec-jo.jpeg)
> 
> **Alec Jo,** Head of Applied AI @ FLORA

As Alec and his team were building it, they faced the same pain as their early canvas users, spending too much time configuring AI tech instead of iterating on the agent itself. That's when they started exploring Vercel.

## [Link to heading](#infrastructure-makes-the-agent)Infrastructure makes the agent

If you use AI mainly for text-based tasks, it's easy to underestimate the additional demands of visual workflows for professional creatives.

Image and video generations can take minutes, and a single creative session can fan out into many concurrent jobs: different angles, backgrounds, styling directions, model providers, and “what if” branches.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F62icpOL6suSjGM16JCXWJW%2F7a0e02e098b709c7d2bdde394a3214d1%2FScreenshot_2026-03-30_at_8.26.43%C3%A2__PM.png&w=1920&q=75)

Those jobs need to run simultaneously, will finish at different times, and still need to roll up into a coherent exploration path the user can navigate.

Early on, Alec's team used LangChain building blocks for agent primitives and considered Temporal for orchestration. It worked, but it came with a cost: two separate systems to maintain, two sets of abstractions to keep in sync, and too much AI plumbing to keep the product moving.

FLORA migrated to the Vercel AI Stack to simplify building and deploying their agent:

-   [AI SDK](https://ai-sdk.dev/) and its [agent framework](https://ai-sdk.dev/docs/agents) provides out-of-the-box primitives that power FAUNA's behavior (models, tool calling, and the interface layer for agent logic).
    
-   [Workflow SDK’s `DurableAgent`](https://useworkflow.dev/docs/api-reference/workflow-ai/durable-agent) adds durable orchestration to AI SDK's agent framework, so each step in the loop persists, retries on failure, and can run for any length of time without losing state.
    
-   [Fluid compute](https://vercel.com/docs/fluid-compute) runs jobs cost-efficiently as the agent fans out into many concurrent tasks, which is critical for parallel, long-running image generations.
    

> We stopped having infrastructure debates and started having product debates.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/V1c0MQJlSsmjfsthjZ0le/d926f9a9739c2dda06c5ca816761f5ef/alec-jo.jpeg)
> 
> **Alec Jo,** Head of Applied AI @ FLORA

The point wasn’t just swapping tools for simplicity. It was moving to a single, integrated AI stack where the primitives, orchestration, and compute are designed to work as a system, not individual components.

## [Link to heading](#the-process-is-the-product)The process is the product

FLORA's ultimate goal is to support all design work that isn’t UI/UX, and FAUNA is their first step in orchestrating visual ideation end-to-end.

But building FAUNA had an unexpected impact on Alec's team: it helped understand their users on a deeper level. In creative work, the process is the product. And the longer you can maintain a flow state, the better the outcome.

> Questions like "how do we make this durable" or "what if the user disconnects mid-generation" used to eat up design discussions. Now they're just solved, so we have the freedom to ship as quickly as we experiment.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/V1c0MQJlSsmjfsthjZ0le/d926f9a9739c2dda06c5ca816761f5ef/alec-jo.jpeg)
> 
> **Alec Jo,** Head of Applied AI @ FLORA

Just like new visual ideas require new cycles of iteration, new image models and capabilities launch every week, and now FLORA can take advantage of them without plumbing or infrastructure getting in the way.