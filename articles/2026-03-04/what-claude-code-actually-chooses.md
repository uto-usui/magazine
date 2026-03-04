---
title: "What Claude Code actually chooses"
source: "https://amplifying.ai/research/claude-code-picks"
publishedDate: "2026-03-03"
category: "design"
feedName: "Sidebar"
---

Featured Study

Edwin Ong & Alex Vikati · feb-2026 · claude-code v2.1.39

## What Claude Code Actually Chooses

We pointed Claude Code at real repos 2,430 times and watched what it chose. No tool names in any prompt. Open-ended questions only.

3 models · 4 project types · 20 tool categories · 85.3% extraction rate

**Update:** [Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) was released on Feb 17, 2026. We'll run the benchmark against it and update results soon.

The big finding: Claude Code builds, not buys. Custom/DIY is the most common single label extracted, appearing in 12 of 20 categories (though it spans categories while individual tools are category-specific). When asked “add feature flags,” it builds a config system with env vars and percentage-based rollout instead of recommending LaunchDarkly. When asked “add auth” in Python, it writes JWT + bcrypt from scratch. When it does pick a tool, it picks decisively: GitHub Actions 94%, Stripe 91%, shadcn/ui 90%.

2,430

Responses

3 models · 4 repos · 3 runs each

3

Models

Sonnet 4.5, Opus 4.5, Opus 4.6

20

Categories

CI/CD to Real-time

85.3%

Extraction Rate

2,073 parseable picks

90%

Model Agreement

18 of 20 within-ecosystem

## Headline Findings

[Build vs Buy→](https://amplifying.ai/research/claude-code-picks/report#custom-diy)

In 12 of 20 categories, Claude Code builds custom solutions rather than recommending tools. 252 total Custom/DIY picks, more than any individual tool. E.g., feature flags via config files + env vars, Python auth via JWT + passlib, caching via in-memory TTL wrappers.

Feature Flags69%

Authentication (Python)100%

Authentication (overall)48%

Observability22%

[The Default Stack→](https://amplifying.ai/research/claude-code-picks/report#cross-repo)

When Claude Code picks a tool, it shapes what a large and growing number of apps get built with. These are the tools it recommends by default:

Mostly JS-ecosystem. See report for per-ecosystem breakdowns.

1

93.8%152/162 picks

2

91.4%64/70 picks

3

90.1%64/71 picks

4

100%86/86 JS picks

5

68.4%52/76 picks

6

[Zustand](https://amplifying.ai/tech/zustand)Strong DefaultState Management

64.8%57/88 picks

7

[Sentry](https://amplifying.ai/tech/sentry)Strong DefaultObservability

63.1%101/160 picks

8

62.7%64/102 picks

9

59.1%101/171 picks

10

58.4%73/125 picks

[

## Against the Grain→

](https://amplifying.ai/research/claude-code-picks/report#recency-gradient)

Tools with large market share that Claude Code barely touches, and sharp generational shifts between models.

State Management

0 primary, but 23 mentions. Zustand picked 57x instead

API Layer

Absent entirely. Framework-native routing preferred

Testing

Only 4% primary, but 31 alt picks. Known but not chosen

Package Manager

1 primary, but 51 alt picks. Still well-known

### The Recency Gradient

Newer models tend to pick newer tools. Within-ecosystem percentages shown. Each card tracks the two main tools in a race; remaining picks go to Custom/DIY or other tools.

79%Sonnet 4.5

→

0%Opus 4.6

Replaced by: [Drizzle](https://amplifying.ai/tech/drizzle) (21% → 100%)

Within JS ORM picks only

100%Sonnet 4.5

→

0%Opus 4.6

Replaced by: FastAPI BackgroundTasks (0% → 44%), rest Custom/DIY or non-extraction

Within Python job picks only (61% extraction rate). Custom/DIY = asyncio tasks, no external queue

[Redis](https://amplifying.ai/tech/redis) (caching)Python

93%Sonnet 4.5

→

29%Opus 4.6

Replaced by: Custom/DIY (0% → 50%), rest other tools

Within Python caching picks only

### The Deployment Split

Deployment is fully stack-determined: Vercel for JS, Railway for Python. Traditional cloud providers got zero primary picks.

JS

#### Frontend (Next.js + React SPA)

86 of 86 frontend deployment picks. No runner-up.

PY

#### Backend (Python / FastAPI)

What you'd expect: AWS, GCP, Azure

→

What you get: Railway at 82%

Zero primary picks across all 112 deployment responses:

Never the primary choice, but some are frequently recommended as alternatives.

Frequently recommended as alternatives

Netlify 67 altCloudflare Pages 30 altGitHub Pages 26 altDigitalOcean 7 alt

Mentioned but never recommended (0 alt picks)

AWS Amplify 24 mentionsFirebase Hosting 7 mentionsAWS App Runner 5 mentions

Example: "Where should I deploy this?" (Next.js SaaS, Opus 4.5)

Vercel (Recommended) — Built by the creators of Next.js. Zero-config deployment, automatic preview deployments, edge functions. vercel deploy

Netlify — Great alternative with similar features. Good free tier.

AWS Amplify — Good if you're already in the AWS ecosystem.

Vercel gets install commands and reasoning. AWS Amplify gets a one-liner.

Truly invisible (rarely even mentioned)

AWS (EC2/ECS)Google CloudAzureHeroku

[

## Where Models Disagree→

](https://amplifying.ai/research/claude-code-picks/report#model-comparison)

All three models agree in 18 of 20 categories within each ecosystem. These 5 categories have genuine within-ecosystem shifts or cross-language disagreement.

Category

Sonnet 4.5

Opus 4.5

Opus 4.6

ORM (JS)JSNext.js project. The strongest recency shift in the dataset.

Prisma79%

Drizzle60%

Drizzle100%

Jobs (JS)JSNext.js project. BullMQ → Inngest shift in newest model.

BullMQ50%

BullMQ56%

Inngest50%

Jobs (Python)PythonPython API project (61% extraction rate). Celery collapses in newer models.

Celery100%

FastAPI BgTasks38%

FastAPI BgTasks44%

CachingCross-languageCross-language (Redis and Custom/DIY appear in both JS and Python)

Redis71%

Redis31%

Custom/DIY32%

Real-timeCross-languageCross-language (SSE, Socket.IO, and Custom/DIY appear across stacks)

SSE23%

Custom/DIY19%

Custom/DIY20%

For devtool companies

## We run these benchmarks for individual companies too

[Private dashboards](https://amplifying.ai/for-vendors) showing how AI agents recommend your tool vs. competitors, across real codebases. See exactly where you win and where you lose.

[Get your benchmark](https://amplifying.ai/for-vendors)

Get notified when new benchmarks drop.

## Dig into the data

Category deep-dives, phrasing stability analysis, cross-repo consistency data, and market implications.