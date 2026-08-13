---
title: "Building a software factory for AI SDK"
source: "https://vercel.com/blog/building-a-software-factory-for-ai-sdk"
publishedDate: "2026-08-12"
category: "frontend"
feedName: "Vercel"
author: "Lars Grammel"
---

The [AI SDK](http://github.com/vercel/ai) is one of the most popular open-source AI projects in the world. It serves over 20 million npm downloads a week and the repo has over 26,000 stars. Maintaining the codebase means tracking four moving targets at once:

-   Model providers: new providers, new capabilities, and new bugs
    
-   UI frameworks: bindings for React, Next.js, Svelte, Vue, and others
    
-   Sandboxes: the execution environments agents run code in
    
-   Harnesses: adapters for Codex, Claude Code, Pi, and others
    

After multiple years of growth, the repo was getting 100+ new issues every month, and when Anthropic's Opus 4.6 model was released, PRs hit an inflection point. By late June, that compounding had accumulated over 1,000 open issues and almost 800 pull requests.

That backlog is not a discipline problem. No maintainer, however good, can close that gap by working harder, and because generating code is cheap, it will only grow.

Instead of trying to scale ourselves, we built a software factory. Four weeks in, it authors between 25 and 35% of PRs we merge and closes 70-80% of issues.

## [Copy link to heading](#deciding-what-type-of-factory-to-build)Deciding what type of factory to build

Before we built anything, we had to answer three questions:

-   Why our existing approach using agents wasn't enough
    
-   What level of automation fit a project like the AI SDK
    
-   How to align automation and human effort to risk
    

### [Copy link to heading](#why-not-add-more-agents)Why not add more agents?

The best maintainers are already using agents aggressively. Mitchell Hashimoto runs Ghostty with the goal of an agent always working, and encodes every agent failure in AGENTS.md so it never repeats. Simon Willison runs four coding agents in parallel, and review bots like Vercel Agent and CodeRabbit sit on millions of repos. Other maintainers like Daniel Stenberg have opted to block AI-generated submissions to curl.

All of it helps, but none of it solves for the core constraint: every one of these solutions still routes every change through one human's attention. We believe that human accountability is still the [core of trust](https://vercel.com/blog/agent-responsibly) in agentic engineering, so we knew our factory needed to solve for reviewer efficiency as a first principle.

### [Copy link to heading](#what-kind-of-automation-fits-ai-sdk)What kind of automation fits AI SDK?

Software factories sit on a spectrum. At one end is full automation, where agents write, ship, and deploy without a human ever reading the code. In the middle are harnesses like Codex and Claude Code, where a person steers an agent or fleet of agents. At the far end is software you barely want to automate because the risk is too high, like firmware in a pacemaker or self-driving vehicle.

The AI SDK needs to operate closer to the careful end. It is foundational AI infrastructure with millions of applications built on top, so quality and security are non-negotiable, and a human needs to have control over what ships. We needed our factory to heavily automate the lifecycle around the human, without removing them.

### [Copy link to heading](#how-do-we-align-automation-and-effort-to-risk)How do we align automation and effort to risk?

For a given change, the depth of human review needed scales with risk.

Centralized roadmaps with detailed feature specs can define risk up front and directly shape the work going into a software factory. But open-source projects like AI SDK also get issues and pull requests from the community, and there is no guarantee they align with the goals of the project, or that changes are safe to make. Higher risk means human judgment is an even more critical part of the system.

To optimize our factory for that judgment, we knew agents had to go beyond generating code based on a request; they needed to evaluate full units of work in the context of the entire project.

Our goal was for the factory generate a comprehensive assessment of each change for both fit and risk, including a full chain of documented evidence, making it easy for reviewers to apply the right amount of effort:

-   Docs fixes get a quick glance for verification
    
-   Well-defined provider changes get focused validation
    
-   A new public API gets deep review
    

## [Copy link to heading](#what-we-built)What we built

`ai-sdk-factory` is a software factory that autonomously processes incoming issues and pull requests for AI SDK. Agents in the factory perform specific, reviewable tasks, like reproducing bugs, implementing features, and creating backports for older SDK versions. A human stays in control throughout the entire process, including merging every change.

We didn't ship the factory in one swing. We built it incrementally, starting at the beginning of the process with classification of issues as bugs, features, or documentation updates. That first step not only gave us more visibility into the shape backlog, but also passed helpful context to the other specialized agents we built later.

We prototyped multiple ways to build each new type of functionality, and in the process developed a set of guiding principles that shaped the architecture of the factory that went into production.

### [Copy link to heading](#build-one-agent-per-task)Build one agent per task

Once our classification agent reached a high level of accuracy, we focused on automating bug reproduction, fixes, and review of those fixes. We explored building a single agent equipped with skills for each step, but quickly realized that would come with a higher maintenance and troubleshooting burden over time.

Instead, we built a single agent for each specific task, making every new capability easier to reason about, test in isolation, and debug. Each one is scoped to a specific job, with its own prompts, context, and evals.

Today the factory has dedicated agents for every step in the flow:

-   Bug reproduction
    
-   Bug fixes
    
-   PR reviews
    
-   Backports
    
-   Documentation updates
    
-   Feature analysis
    
-   Feature implementation
    

### [Copy link to heading](#secure-everything-from-the-start)Secure everything from the start

We implemented security with the second agent, because bug reproduction was the first step where the factory executed code based on content it didn't control.

A factory operating on a public repository has to assume attacker-controlled input: every issue, pull request, comment, and the links inside them are untrusted. Because successful open-source projects are high-value targets, threats range from malicious code changes and supply chain attacks to resource exhaustion, API key exfiltration, and prompt exfiltration.

Sandboxes are the foundation of our defense. Every agent in `ai-sdk-factory` runs inside an isolated Vercel Sandbox containing its code, its runtime, and only the secrets the agent's specific task needs. With those guardrails, untrusted content can shape what an agent proposes, but the damage any one task can do is contained to the sandbox.

We also built a shielding layer around the sandbox that controls what agents can reach over the network, blocking the paths an attacker would use to pull secrets out of the isolated environment.

The last line of defense is human review: nothing is merged without approval from a human on the AI SDK team.

### [Copy link to heading](#build-value-locally,-then-move-to-the-cloud)Build value locally, then move to the cloud

The first several agents we built for the factory ran through a local CLI. That enabled our team to iterate quickly as we noticed inaccuracies, felt friction, and prototyped different ideas.

Once multiple steps were running reliably through the CLI, we were ready to move the system onto managed infrastructure. `ai-sdk-factory` uses:

-   Vercel Functions for the API, workers, and webhook ingress
    
-   Vercel Queues for task execution
    
-   Vercel Blob for logs
    
-   Vercel Sandbox for the agent workspaces
    
-   Neon Postgres for factory data
    

Today, GitHub webhooks feed the issue queue, and as soon as they arrive workers automatically pull them and kick off agent runs in sandboxes. We also built a monitoring UI that tracks every run in parallel, and visualizes the queue for the team of reviewers.

## [Copy link to heading](#shipping-software-through-our-factory)Shipping software through our factory

On July 24, a community member asked for blocked-domain support in OpenAI web search, and the request became [issue #17898](https://github.com/vercel/ai/issues/17898). The following section explains every step the software factory went through to process the issue, open a pull request with an implementation of the feature, and ultimately backport the merged feature to v5 and v6 of the SDK.

#### [Copy link to heading](#classification)Classification

The first agent that runs in the factory classifies issues and pull requests. In this case, the `ai-sdk-factory` bot [commented](https://github.com/vercel/ai/issues/17898#issuecomment-5101009222) on the issue and applied a label, identifying the type as Feature with high confidence. The agent included its rationale for the classification in the comment.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5c3mfdN8utOhPn8O9QGiH%2F9215c105f937ab339fa5ead6155bb859%2Fcomment-classification.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3T3MiHP00OLPaCoHgYDzIv%2Fc12a22cc8c1182c667d0db3128d74c4c%2Fcomment-classification.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3970b8buakQTfaaduexrJY%2F7b8335333b324cebd6fa41f4f70f279b%2Fcomment-classification.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6zep3AqJSjBcA1oIvkv0Cg%2F16e31cd55a463a31a5d53a565bb9f31a%2Fcomment-classification.png&w=1920&q=75)

#### [Copy link to heading](#analysis)Analysis

After classification, the analysis agent runs. Agents in the factory don't make any assumptions about the technical validity of a feature request or bug, so the analysis agent wrote a probe to confirm the absence of support for blocked domains. `issue-17898-type-probe.ts` was generated and run, and failed with an error when it looked for blocked-domains and didn't find it.

The failing probe proved the feature was missing on `main`, and the agent included it in [the analysis](https://github.com/vercel/ai/issues/17898#issuecomment-5101058789) as evidence.

The analysis agent then used the results of its investigation to build out a spec for the feature: add an optional `blockedDomains` filter to the existing web-search tool and map it to the provider's `blocked_domains` field.

The agent also confirmed the spec fit the SDK's provider-adapter architecture and was backward compatible, and even scoped documentation changes.

#### [Copy link to heading](#implementation)Implementation

Another agent then [implemented the spec](https://github.com/vercel/ai/issues/17898#issuecomment-5101199946) and opened [pull request](https://github.com/vercel/ai/pull/18033). The implementation agent ran a live end-to-end test, executing an OpenAI web search with wikipedia.org blocked and confirming the domain wassn't reachable. The test was included as additional evidence on the pull request.

#### [Copy link to heading](#automated-review)Automated review

Next, a review agent [scored the change](https://github.com/vercel/ai/pull/18033#issuecomment-5101303161), and when it didn't find any concerns, approved it. The agent rated the feature as fully implemented, with:

-   Side-effect risk: low
    
-   Performance risk: none
    
-   Backwards-compatibility risk: low
    

#### [Copy link to heading](#human-review)Human review

Finally, Lars read the chain of evidence from the agents, reviewed the code changes, and merged [PR #18033](https://github.com/vercel/ai/pull/18033) into main.

#### [Copy link to heading](#backporting)Backporting

Once Lars merged the initial PR, `ai-sdk-factory` opened additional PRs for two backports, [#18035](https://github.com/vercel/ai/pull/18035) for v6 and [#18036](https://github.com/vercel/ai/pull/18036) for v5. The v5 backport did not apply cleanly, so the factory agent labeled and committed the conflicted state, identified and validated a fix, and pushed it seventeen minutes later. After review, Lars merged both backport PRs.

## [Copy link to heading](#results)Results

We are just over four weeks into running the software factory in production. Here are the results:

**PRs merged to main**

Between 25-35% of the PRs we merge on a weekly basis are now authored by `ai-sdk-factory` agents.

**Backports**

Factory PRs are above 50% of weekly merges to the v6 release line, and v5 looks similar. Backports used to be work we skipped because dealing with merge conflicts wasn't worth the effort. v5 and v6 get far better support now.

**Issues**

In July, over 75% of closed issues were closed by the factory.

Open issues fell from a peak of 1,022 in late June to 844 by early August, and open bugs are down roughly 25%.

The `ai-sdk-factory` runs in public, so you can see [every pull request](https://github.com/vercel/ai/pulls?q=is%3Apr+author%3Aapp%2Fai-sdk-factory) it has authored on the repo.

## [Copy link to heading](#improving-the-factory-becomes-the-job)Improving the factory becomes the job

The most interesting part of running the factory is what happens when it fails. Every run ends one of four ways: success, flawed, blocked, or manual. Only success ships, so the rest are signal that re-enters the system as feedback.

-   A flawed run means an agent produced the wrong thing, and the fix is better prompts, better context, or a new eval case so the same mistake gets caught automatically next time
    
-   A blocked run means the environment was missing something, like a credential, a service, or a dependency, and the fix is provisioning it
    
-   A manual run marks a boundary we drew on purpose, and forces us to ask whether improvements in the factory justify removing it
    

Each of those fixes expands the automation boundary, and every week the factory can handle work that it couldn't be trusted with before.

Running the factory is the same discipline teams already apply to their test suites and pipelines, but pointed at the system that does the work, instead of the system that checks it. In a world where agents define the SDLC, improving the factory will become the standard engineering job.

[

**Deploy your own software factory in one click**

This software factory ships with 4 agents: Classifier, Analyzer, Implementer, Reviewer. Open-source and built on eve.

Deploy now



](https://vercel.fyi/eve-software-factory)