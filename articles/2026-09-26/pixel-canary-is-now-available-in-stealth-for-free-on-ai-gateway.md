---
title: "Pixel Canary is now available in stealth for free on AI Gateway"
source: "https://vercel.com/changelog/pixel-canary-is-now-available-in-stealth-for-free-on-ai-gateway"
publishedDate: "2026-09-25"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Pixel Canary](https://vercel.com/ai-gateway/models/pixel-canary) is now available on [AI Gateway](https://vercel.com/ai-gateway) as `stealth/pixel-canary`. It's free for a limited time while in stealth.

Pixel Canary is strong at coding, including building applications and refactoring existing code. It is well suited to frontend development and mobile app design, from responsive layouts and app screens to navigation and interactive components.

On [Next.js evals](https://nextjs.org/evals), Pixel Canary ties [GPT 6 Astra (high)](https://vercel.com/ai-gateway/models/gpt-6-astra) at a 90.3% baseline success rate, passing 28 of 31 tasks. With Next.js documentation supplied through `AGENTS.md`, it passes 30 of 31 tasks (96.8%), tying the leaderboard's top score in that setting.

It passes tasks covering App Router migrations, data fetching, image and font optimization, caching, and view transitions, demonstrating its ability to implement and update the code behind web interfaces. Scores use pass@4: a task passes if any of up to four attempts succeeds.

ZDR is not available for this model, and prompts and responses sent through it may be used for training and model improvement.

To get started, set `model` to `stealth/pixel-canary`:

To use Pixel Canary in your [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run the setup command with the [Vercel CLI](https://vercel.com/docs/cli/ai-gateway):

```
npm i -g vercel@latestvercel ai-gateway setup
```

The command detects installed agents, provisions or reuses an AI Gateway API key, and configures their connection to the gateway. Then select `stealth/pixel-canary` in your agent's model configuration.

AI Gateway provides a unified API for calling models, with built-in [usage and cost tracking](https://vercel.com/docs/ai-gateway/observability-and-spend), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), and [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules).

Try Pixel Canary in the [model playground](https://vercel.com/ai-gateway/models/pixel-canary).