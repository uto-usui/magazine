---
title: "Introducing Vercel Agent: Your new Vercel teammate"
source: "https://vercel.com/blog/introducing-vercel-agent"
publishedDate: "2025-10-23"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

3 min read

Oct 23, 2025

We're launching Vercel Agent, an AI teammate for your development workflow. Vercel Agent uses AI, deep platform expertise, your application code, and telemetry data from across Vercel to help you ship faster with higher quality.

Starting today, Vercel Agent is available in Public Beta with two core skills: Code Review and Investigations.

## [Link to heading](#what-is-vercel-agent)What is Vercel Agent

[Vercel Agent](https://vercel.com/agent) is a multi-purpose agent with skills that grow and expand over time. Every suggestion and investigation from Agent is validated end-to-end, grounded in a deep understanding of your project's code, framework, and infrastructure. Agent delivers tested, actionable improvements rather than speculative output.

## [Link to heading](#code-review:-ai-powered-pull-request-reviews)Code Review: AI-powered pull request reviews

Vercel Agent’s Code Review skill operates directly within your GitHub workflow to elevate both speed and quality. It reviews code with the depth of a teammate who understands your entire stack, running simulated builds inside a Vercel Sandbox to verify recommendations before you see them. You are not getting untested guesses; every suggestion is backed by validation.

Agent orchestrates a multi-step reasoning process that analyzes diffs, dependencies, and framework patterns across your project. It references lint and test results, runs targeted verifications, and generates pull request feedback that passes framework-level checks automatically. The result is a review that is contextual and deeply aware of how your application actually runs in production.

In practice, this means faster merges without compromise. Agent identifies regressions before they land, flags performance issues that linters miss, and suggests secure, production-ready fixes. For developers, it feels like having a reviewer who never misses context and always tests what it recommends.

![Pull request feedback that’s high-signal, not high-volume. Every suggestion from Vercel Agent is verified in context and tested in a Sandbox.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F42fuVDBg68hS7dP2NecEhL%2Fd875205dd56473ff71beec29e51992be%2FFrame_100.png&w=1920&q=75)![Pull request feedback that’s high-signal, not high-volume. Every suggestion from Vercel Agent is verified in context and tested in a Sandbox.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2es1YAYT3Llih2rL7evNuZ%2F4707016b9b3958e9e70575f2f70292fa%2FFrame_104.png&w=1920&q=75)

Pull request feedback that’s high-signal, not high-volume. Every suggestion from Vercel Agent is verified in context and tested in a Sandbox.

## [Link to heading](#investigations:-ai-powered-debugging-for-production-issues)Investigations: AI-powered debugging for production issues

Announced today, Investigations extends that same reasoning to your application's runtime.

Triggered by unusual application activity, Agent analyzes real-time and historical data to uncover why an event occurred. Powered by Framework-defined infrastructure, Agent has deep context about your application, allowing it to interpret the full underlying data and identify why something spiked, slowed, failed, or changed unexpectedly.

Investigations will explore questions like why a deployment slowed down, which function is throwing errors in production, and what changed between any two builds to quickly understand the root cause and provide actionable next steps when available.

Each investigation is grounded in the actual state of your app. Not guesses, but validated analysis.

For engineering teams, Investigations turn what used to be hours of debugging into a few seconds of reasoning. It transforms observability from a maze of dashboards into a simple conversation, helping you fix problems faster and understand your system more deeply.

![When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5twyhBv04WDyJeQMFWyfxE%2Fd091541c6d385b91a5858fb8bee81770%2FGroup_43.png&w=1920&q=75)![When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F65130bkvGHNdaVtzeZ2xrK%2F6ef9621bfda07b3f36c0182d36bb232b%2FGroup_44.png&w=1920&q=75)

When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps.

## [Link to heading](#what’s-next)**What’s next**

Vercel Agent represents our first product in a new category: Agent-as-a-Service. Just as Software-as-a-Service abstracted the complexity of infrastructure, Agent-as-a-Service means you can rely on a production-grade agent that runs securely on your behalf. You don't need to build or host it yourself. It works for you, seamlessly integrated into your workflow. We're making it even easier to get started with our [agentic marketplace](https://vercel.com/marketplace/category/agents), also available today.

With Code Review and Investigations available today, Vercel Agent is already changing how teams ship. But this is just the beginning. Soon, Agent will go beyond identifying and diagnosing issues. It will create pull requests, propose fixes, and automate the workflow from detection to deployment.

Vercel Agent is not just another AI tool. It is a teammate that understands your stack, your context, and your goals. It's built on the same infrastructure that powers Vercel itself, giving you the confidence to move fast without cutting corners.

The future of building is not just faster. It is smarter.

[

**Start using Vercel Agent today**

See how it feels to work with AI that truly ships with you.

Try Vercel Agent



](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent)