---
title: "Gamma builds design-first agents with Vercel"
source: "https://vercel.com/blog/gamma-builds-design-first-agents-with-vercel"
publishedDate: "2026-02-28"
category: "frontend"
feedName: "Vercel"
author: "Madison McIlwain"
---

5 min read

Feb 28, 2026

Gamma set out to make bad-looking slides impossible.

Gamma began with a simple idea: what if your presentation could design itself?

With a single sentence, users can generate a complete presentation that respects layout, spacing, and hierarchy. Columns reflow automatically. Diagrams adjust when new layers are added. The product handles the formatting so teams can stay focused on the ideas.

That philosophy reflects the company's DNA. Of Gamma's first ten hires, three were designers. "The attention to detail and value placed on design has been baked into the culture from the very, very beginning," says Sherwin Yu, Head of AI and Product Engineering. "Our designers at Gamma are fantastic. They ship code, they're technical. They'll push to production."

"There's a lot of discussion about how do we, whenever possible, elevate the user experience," Sherwin says.

As adoption grew, the team realized generation was only the beginning. Real presentation work happens in iteration. Teams outline, restructure, refine tone, and polish visuals. In October 2025, Gamma launched Gamma Agent, a conversational editing that shifted the AI capabilities dramatically.

## [Link to heading](#evolving-complex-agent-architectures-with-ai-sdk)Evolving complex agent architectures with AI SDK

The first version of Gamma generated decks from a prompt. Gamma Agent introduced dialogue, and with it, a new relationship between the user and the product.

As the team started prototyping more powerful agents, that simplicity broke down. They needed finer control and more persistence over conversation state. They needed the ability to pass context from one agent to another, manage message history across sessions, and orchestrate more complex multi-step interactions than a simple request-response loop.

The decisions a user made early in a workflow, the reasoning behind the structure, the tone they'd settled on… all of that was valuable context that couldn't just live in a disposable chat window.

By building on the AI SDK rather than custom orchestration code, Gamma can evolve agent behavior without re-architecting its backend.

Gamma's investment in composable, model-agnostic architecture extends beyond text. The company's image pipeline, which has generated more than 1.5 billion images across 60 models and 20 providers, has gone through its own architectural reckoning.

### [Link to heading](#image-generation)Image generation

Staying on the frontier of image generation means integrating new models fast… sometimes within days of launch. When the Vercel AI SDK introduced ImageModelV3, a standard interface for image generation with a composable middleware layer, Gamma's team saw it as yet another opportunity.

Today, adding a new image model to Gamma is about 30 lines of code: just a model ID, cost formula, supported sizes, and capability flags. Tracing, cost tracking, and image preprocessing are handled automatically by shared middleware that wraps every model. Engineers never think about that plumbing; they just declare what a model can do. This pays off in the product.

### [Link to heading](#infographics)Infographics

When the team shipped AI infographics, Gemini needed multimodal style references (actual images showing the target aesthetic), while Flux worked best with concise, text-only prompts. Because the model layer is just configuration, those per-model strategies live in the feature code, not buried in infrastructure. New model, new capability, new feature—each independent.

The result: Gamma ships new models in hours, not weeks, and every model automatically gets production-grade observability from its first request.

## [Link to heading](#shipping-continuously-with-preview-deployments)Shipping continuously with preview deployments

Gamma applies the same philosophy to its deployment workflow: pick stable foundations, then move fast on top of them. Instead of building its own release system, the team relies on Vercel's Preview Deployments, production deployments, and Instant Rollbacks.

> "We try not to reinvent infrastructure we don't have to," Sherwin says. "We'd rather spend that engineering energy on the product."

Despite Gamma’s team of just 20 or so engineers, Gamma averages more than 250 deployments per day across preview and production. Deploys complete in just over 7 minutes at median, with a 99 percent success rate.

Preview deployments make it safe to experiment with agent behavior on every pull request. Instant Rollbacks provide confidence when shipping changes that affect model logic or orchestration.

## [Link to heading](#scaling-the-ai-content-pipeline-on-vercel)Scaling the AI content pipeline on Vercel

Gamma's AI outputs raw HTML, but a presentation is more than markup, it's a structured document with layout rules, resolved images, live charts, and editable diagrams. Every generated card passes through a conversion layer that bridges that gap in real time.

Gamma runs this critical translation layer as Vercel Functions. Every AI-generated card passes through a serverless endpoint that instantiates the complete Tiptap editor schema inside JSDOM, parses the LLM's HTML output into structured editor content, and resolves async assets.

Other serverless functions handle the reverse direction (serializing editor content into AI-readable HTML) and generating theme preview images on the fly.

All together, Gamma’s use of serverless functions ensures presentations load quickly and AI-powered editing stays responsive for users worldwide.

## [Link to heading](#designing-for-what’s-next)Designing for what’s next

As agents across the industry get more capable, the limiting factor shifts from intelligence to information.

"An agent that knows your brand guidelines, your previous presentations, and your company's tone of voice is infinitely more valuable than a generic model," Sherwin says. "Right now, context is what separates a useful agent from a generic chat bot."

He sees context operating at three levels: the immediate session, the user's history across projects, and the organizational layer (meaning things like brand assets, templates, knowledge base). Getting all three into the model's window, efficiently and at the right moment, is the architectural challenge every company building agents is wrestling with.

It's the same vision Gamma has been building toward from day one, making it effortless to turn ideas into polished, compelling communication. First through intelligent layout and design. Then through conversational editing. And now, through a context layer that understands what you're building and why.

What hasn't changed is how Gamma builds: pick the right abstractions, stay model-agnostic, keep enough flexibility to rebuild when the landscape moves, and ship before the window closes.

In a space that reinvents itself every six months, that adaptability is the real moat.