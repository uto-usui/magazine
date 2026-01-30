---
title: "The no-nonsense approach to AI agent development"
source: "https://vercel.com/blog/the-no-nonsense-approach-to-ai-agent-development"
publishedDate: "2025-06-04"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

3 min read

Jun 4, 2025

AI agents are software systems that take over tasks made up of manual, multi-step processes. These often require context, judgment, and adaptation, making them difficult to automate with simple rule-based code.

While traditional automation is possible, it usually means hardcoding endless edge cases. Agents offer a more flexible approach. They use context to decide what to do next, reducing manual effort on tedious steps while keeping a review process in place for important decisions.

The most effective AI agents are narrow, tightly scoped, and domain-specific.

Here's how to approach building one.

## [Link to heading](#step-1:-prototype-the-agent-by-hand)Step 1: Prototype the agent by hand

Start by simulating the agent manually, before writing any code.

Understand the task the way a person would approach it, step by step. Use real inputs, whether they’re screenshots, API responses, or messy CSV data. Feed those into an LLM manually and guide it through the process with prompts that mirror the actual workflow.

As you go, perform any resulting actions yourself. Pay attention to which parts feel repetitive or mechanical. These are strong candidates for automation later.

Expect early results to be rough. When we started building [v0.dev](https://v0.dev/) in 2023, LLMs struggled to generate reliable HTML. The breakthrough wasn’t from better models, but from narrowing the scope and using structured inputs with Tailwind.

If the model consistently fails to make progress, even with adjustments, the task may not be a good fit for an agent. But if it works, or even comes close, it’s worth continuing.

## [Link to heading](#step-2:-automate-the-loop)Step 2: Automate the loop

Once your manual simulation shows that the task is viable, begin writing code. This is where you build the skeleton of your agent.

Start by automating how it collects inputs. Use APIs, scrapers, screenshots, or anything else that fits the problem, then model the agent’s process as a loop or a simple state machine. Gather input, perform deterministic computation where possible, call the model when logic or judgment is needed, evaluate the result, and decide whether to continue or exit.

LLMs are non-deterministic. If you can write a normal function to handle a step, do it. Use plain code for parsing, calculating, or sorting. Anything that does not require reasoning.

```
import { streamText, tool } from "ai";import { anthropic } from "@ai-sdk/anthropic";import { z } from "zod";async function stockAnalysisAgent(  symbol: string,  startDate: string,  endDate: string) {  return streamText({    model: anthropic("claude-4-sonnet-20250514"),    system: `You are a professional stock analyst AI powered by Claude Sonnet. You MUST perform a comprehensive analysis using BOTH available tools.ANALYSIS STRUCTURE:- Technical Analysis: Use price data, P/E ratio, beta, 52-week range, volume patterns- Fundamental Analysis: Use news sentiment, earnings data, market cap, industry trends- Investment Recommendation: Clear BUY/SELL/HOLD with specific price targets and reasoningIMPORTANT: You MUST use both tools before providing any analysis. Do not wait or ask - call both tools immediately and concurrently.NOTE: The news search uses Finnhub as the primary source (more reliable for stock news) with NewsAPI as fallback.`,    prompt: `Analyze ${symbol.toUpperCase()} stock comprehensively. Use BOTH the getStockData and searchNews tools to gather complete market data, then provide detailed technical and fundamental analysis with a clear investment recommendation.`,    tools: {      getStockData: tool({        description:          "Get real-time stock price, volume, financial metrics, and historical data for a given symbol using Finnhub API",        parameters: z.object({          symbol: z.string().describe("Stock symbol (e.g., NVDA, AAPL, TSLA)"),        }),        execute: async ({ symbol }) => {          return getStockData(symbol, startDate, endDate);        },      }),      searchNews: tool({        description:          "Search for recent news and analysis about a stock or company using Finnhub (primary) and NewsAPI (fallback)",        parameters: z.object({          query: z            .string()            .describe(              'Search query for news (e.g., "NVIDIA", "Apple earnings", "Tesla Model 3")'            ),        }),        execute: async ({ query }) => {          return searchNews(query, startDate, endDate);        },      }),    },    maxSteps: 5,  });}
```

Example of a stock analysis agent

Don't be afraid of plain old programming. Save the LLM for parts that truly need judgment.

Building AI agents might seem like a new thing that calls for new abstractions, but it is just regular programming. Use `if` statements, loops, or switches, whatever fits. Don’t overthink the structure. For common patterns, see [our AI SDK agent docs](https://ai-sdk.dev/docs/foundations/agents).

The agent "works" when it reliably produces acceptable results with little to no intervention.

## [Link to heading](#step-3:-optimize-for-reliability)Step 3: Optimize for reliability

Now that the agent is running end to end, shift your focus to improving quality. This means making the agent perform well on both specific examples and a wide range of real-world inputs.

Start by tightening the loop. Refine your prompts. Make tool calls more precise. Remove unnecessary retries. Replace model calls with plain deterministic functions wherever you can. If the agent produces incomplete results, use a second model to critique the results of the first model and continue the work.

At this stage, intuition and hands-on testing are your best tools. Iterate until the agent feels solid when running against real examples. Once the core loop is stable, [introduce structured evaluations](https://vercel.com/blog/eval-driven-development-build-better-ai-faster) to test performance across a broad range of inputs and edge cases. This helps catch regressions early and ensures quality holds up as the agent evolves.

## [Link to heading](#takeaways)Takeaways

AI agents expand what software can do, but building one doesn't require reinventing how you think about programming. The most reliable agents are built with the same fundamentals: clear logic, good structure, and tight feedback loops.

Before committing to any implementation, test the task manually using real inputs and prompts. If the model can almost get there with help, it’s probably worth building. From there, structure the logic using ordinary code and only rely on the model when necessary. Once the agent is working, focus on making it resilient. Both on individual inputs and across real-world complexity.

To recap, agents are useful when:

-   The task is difficult to automate with traditional code
    
-   Prompting the model manually shows signs of success
    
-   You scope the agent narrowly and build on [solid software practices](https://ai-sdk.dev/docs/foundations/agents)
    
-   You optimize both with hands-on intuition and structured evaluation
    

When built right, AI agents feel like magic. But there’s no sorcery behind it. Just smart systems with reasoning built in.

[

**Ready to build?**

Get started with the AI SDK to build reliable, scoped AI agents using real software patterns.

Try AI SDK



](https://ai-sdk.dev/)