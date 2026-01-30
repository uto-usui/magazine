---
title: "The evolution of the Web: What we learned and where we’re going"
source: "https://vercel.com/blog/how-the-web-evolves"
publishedDate: "2022-02-02"
category: "frontend"
feedName: "Vercel"
author: "Guillermo Rauch"
---

## Featured articles

-   [
    
    Nov 21
    
    ## Self-driving infrastructure
    
    AI has transformed how we write code. The next transformation is how we run it. At Vercel, we’re building self-driving infrastructure that autonomously manages production operations, improves application code using real-world insights, and learns from the unpredictable nature of production itself. Our vision is a world where developers express intent, not infrastructure. Where ops teams set principles, not individual configurations and alerts. Where the cloud doesn’t just host your app, it understands, optimizes, and evolves it.
    
    ](https://vercel.com/blog/self-driving-infrastructure)
    
-   [
    
    Jan 9
    
    ## How to build agents with filesystems and bash
    
    Many of us have built complex tooling to feed our agents the right information. It's brittle because we're guessing what the model needs instead of letting it find what it needs. We've found a simpler approach. We replaced most of the custom tooling in our internal agents with a filesystem tool and a bash tool. Our sales call summarization agent went from ~$1.00 to ~$0.25 per call on Claude Opus 4.5, and the output quality improved. We used the same approach for d0, our text-to-SQL agent. The idea behind this is that LLMs have been trained on massive amounts of code. They've spent countless hours navigating directories, grepping through files, and managing state across complex codebases. If agents excel at filesystem operations for code, they'll excel at filesystem operations for anything. Agents already understand filesystems. Customer support tickets, sales call transcripts, CRM data, conversation history. Structure it as files, give the agent bash, and the model brings the same capabilities it uses for code navigation.
    
    Ashka Stephen
    
    
    
    ](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash)
    
-   [
    
    Jan 14
    
    ## Introducing: React Best Practices
    
    We've encapsulated 10+ years of React and Next.js optimization knowledge into react-best-practices, a structured repository optimized for AI agents and LLMs. React performance work is usually, well, reactive. A release goes out, the app feels slower, and the team starts chasing symptoms. That’s expensive, and it’s easy to optimize the wrong thing. We’ve seen the same root causes across production codebases for more than a decade: Async work that accidentally becomes sequential Large client bundles that grow over time Components that re-render more than they need to The “why” here is simple: these aren’t micro-optimizations. They show up as waiting ti...
    
    Shu and Andrew
    
    
    
    ](https://vercel.com/blog/introducing-react-best-practices)
    

## Latest news.

-   [
    
    Customers
    
    Jan 28
    
    ## How Stripe built a game-changing app in a single flight with v0
    
    What would traditionally require months of product-development coordination and building across multiple teams was achieved by one person in a single flight.
    
    Alli Pope
    
    
    
    ](https://vercel.com/blog/how-stripe-built-a-game-changing-app-in-a-single-flight-with-v0)
    
-   [
    
    Customers
    
    Jan 27
    
    ## How Sensay went from zero to product in six weeks
    
    Sensay went from zero to an MVP launch in six weeks by leaning on Vercel previews, feature flags, and instant rollbacks. The team kept one codebase, moved fast through pivots, and shipped without a DevOps team.
    
    Eric Dodds
    
    
    
    ](https://vercel.com/blog/how-sensay-went-from-zero-to-product-in-six-weeks)
    
-   [
    
    General
    
    Jan 27
    
    ## AGENTS.md outperforms skills in our agent evals
    
    Jude Gao
    
    
    
    ](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
    
-   [
    
    General
    
    Jan 26
    
    ## Agent skills explained: An FAQ
    
    Learn what agents skills are, how to install them, how agents use them, and best practices for implementation.
    
    Eric and Andrew
    
    
    
    ](https://vercel.com/blog/agent-skills-explained-an-faq)
    
-   [
    
    General
    
    Jan 22
    
    ## Testing if "bash is all you need"
    
    Ankur and Andrew
    
    
    
    ](https://vercel.com/blog/testing-if-bash-is-all-you-need)
    
-   [
    
    General
    
    Jan 15
    
    ## AWS databases are now live on the Vercel Marketplace and v0
    
    AWS databases are now available in the Vercel Marketplace and v0.
    
    Tom and Hedi
    
    
    
    ](https://vercel.com/blog/aws-databases-are-now-live-on-the-vercel-marketplace-and-v0)
    
-   [
    
    General
    
    Jan 14
    
    ## Use Perplexity Web Search with Vercel AI Gateway
    
    Models are powerful, but they're limited to their training data and knowledge cutoff date. When users ask about today's news, current prices, or the latest API changes, models can offer outdated information or admit they don't know. Provider-agnostic web search on AI Gateway changes this. With a single line of code, you can give any model the ability to search the web in real-time. It works with OpenAI, Anthropic, Google, and every other provider available through AI Gateway.
    
    Dan and Jerilyn
    
    
    
    ](https://vercel.com/blog/use-perplexity-web-search-with-vercel-ai-gateway)
    
-   [
    
    Engineering
    
    Jan 14
    
    ## Introducing: React Best Practices
    
    We've encapsulated 10+ years of React and Next.js optimization knowledge into react-best-practices, a structured repository optimized for AI agents and LLMs.
    
    Shu and Andrew
    
    
    
    ](https://vercel.com/blog/introducing-react-best-practices)
    
-   [
    
    General
    
    Jan 13
    
    ## Nick Bogaty joins Vercel as Chief Revenue Officer
    
    It's a thrilling time to work in Sales at Vercel. The web is transitioning from pages to agents, and Vercel is building the self-driving infrastructure to power it. We've assembled a Sales organization that equally understands the continually shifting technical landscape and pressing business needs to stay flexible, move fast, and be secure in the AI era. We're rethinking how Sales operates, and we're building the most AI-forward go-to-market organization in the industry. To lead this charge, we're welcoming Nick Bogaty as our Chief Revenue Officer.
    
    Jeanne Grosser
    
    
    
    ](https://vercel.com/blog/nick-bogaty-joins-vercel-as-chief-revenue-officer)
    
-   [
    
    General
    
    Jan 12
    
    ## How Mux shipped durable video workflows with their @mux/ai SDK
    
    We invited Dylan Jhaveri from Mux to share how they shipped durable workflows with their @mux/ai SDK. AI workflows have a frustrating habit of failing halfway through. Your content moderation check passes, you're generating video chapters, and then you hit a network timeout, a rate limit, or a random 500 from a provider having a bad day. Now you're stuck. Do you restart from scratch and pay for that moderation check again? Or do you write a bunch of state management code to remember where you left off? This is where durable execution changes everything. When we set out to build @mux/ai, an open-source SDK to help our customers build AI features on top of Mux's video infrastructure, we faced a fundamental question: how do we ship durable workflows in a way that's easy for developers to adopt, without forcing them into complex infrastructure decisions? The answer was Vercel's Workflow DevKit.
    
    Dylan Jhaveri
    
    
    
    ](https://vercel.com/blog/how-mux-shipped-durable-video-workflows-with-their-mux-ai-sdk)
    
-   [
    
    General
    
    Jan 9
    
    ## How to build agents with filesystems and bash
    
    Many of us have built complex tooling to feed our agents the right information. It's brittle because we're guessing what the model needs instead of letting it find what it needs. We've found a simpler approach. We replaced most of the custom tooling in our internal agents with a filesystem tool and a bash tool. Our sales call summarization agent went from ~$1.00 to ~$0.25 per call on Claude Opus 4.5, and the output quality improved. We used the same approach for d0, our text-to-SQL agent. The idea behind this is that LLMs have been trained on massive amounts of code. They've spent countless hours navigating directories, grepping through files, and managing state across complex codebases. If agents excel at filesystem operations for code, they'll excel at filesystem operations for anything. Agents already understand filesystems. Customer support tickets, sales call transcripts, CRM data, conversation history. Structure it as files, give the agent bash, and the model brings the same capabilities it uses for code navigation.
    
    Ashka Stephen
    
    
    
    ](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash)
    
-   [
    
    General
    
    Jan 7
    
    ## How we made v0 an effective coding agent
    
    Last year we introduced the v0 Composite Model Family, and described how the v0 models operate inside a multi-step agentic pipeline. Three parts of that pipeline have had the greatest impact on reliability. These are the dynamic system prompt, a streaming manipulation layer that we call “LLM Suspense”, and a set of deterministic and model-driven autofixers that run after (or while!) the model finishes streaming its response. What we optimize for The primary metric we optimize for is the percentage of successful generations. A successful generation is one that produces a working website in v0’s preview instead of an error or blank screen. But the problem is that LLMs running in isolation encounter various issues when generating code at scale. In our experience, code generated by LLMs can have errors as often as 10% of the time. Our composite pipeline is able to detect and fix many of these errors in real time as the LLM streams the output. This can lead to a double-digit increase in success rates.
    
    Max Leiter
    
    
    
    ](https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent)