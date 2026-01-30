---
title: "Vercel collaborates with Google for Gemini 3 Pro Preview launch"
source: "https://vercel.com/blog/vercel-collaborates-with-google-for-gemini-3-pro-launch"
publishedDate: "2025-11-18"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

2 min read

Nov 18, 2025

The Gemini 3 Pro Preview model, released today, is now available through the [Vercel AI Gateway](https://vercel.com/ai-gateway) and on [v0.app](https://v0.dev/). Thanks to Google, Vercel has been testing Gemini 3 Pro Preview across v0, Next.js, AI SDK, and Vercel Sandbox over the past several weeks.

We've noticed the model has an increased focus on coding, multimodal reasoning, and tool use, though it's seen improvements across the board.

From our testing, Gemini 3 Pro Preview delivers substantial improvements in instruction following and response consistency. It shows almost a 17% increase in correctness over its predecessor on our [Next.js evals](https://nextjs.org/evals), putting in the top 2 models on the leaderboard.

### [Link to heading](#how-we're-using-gemini-3-pro-preview-at-vercel)How we're using Gemini 3 Pro Preview at Vercel

In Vercel’s Next.js evals, Gemini 3 Pro Preview, tied with `openai/gpt-5-codex` at a 42% success rate, surpassing `anthropic/claude-opus-4.1`, `zai/glm-4.6`, `moonshotai/kimi-k2-turbo`, and others in consistency and reasoning quality.

Model

Total Evals

Success Rate

Avg Duration

Total Tokens

`openai/gpt-5-codex`

50

42%

42.80s

186,082

`**google/gemini-3-pro-preview**`

50

**42%**

**44.85s**

**309,263**

`zai/glm-4.6`

50

40%

20.36s

106,177

`anthropic/claude-opus-4.1`

50

40%

29.47s

165,810

`moonshotai/kimi-k2-turbo`

50

38%

4.13s

82,567

Gemini 3 Pro Preview stands out in frontend generation and multi-turn agent flows. It follows developer-level prompts with high precision, producing stable, well-structured UI components. The 1M context window helped it maintain fidelity across long generation chains. In our tests with v0, we’ve seen improved generation speed and quality.

### [Link to heading](#see-for-yourself)See for yourself

You can now try Gemini 3 Pro Preview in several places, instantly:

Try Gemini 3 Pro Preview on [AI Gateway Playground](https://vercel.com/ai-gateway/models/gemini-3-pro-preview) instantly, no setup required. This model, and every model available through Gateway, can be tested instantly with a simple chat interface.

From there, copy the model string, paste it into AI SDK, and start building with the same high-performance infrastructure that powers production apps like v0.

You can also try it out in the [AI SDK playground](https://ai-sdk.dev/playground) to compare outputs against other models.

Gemini 3 Pro Preview is available today on [AI Gateway](https://vercel.com/ai-gateway), with support for both Google AI Studio and Google Vertex AI. Developers can compare it alongside other models on Gateway with no code changes.

```
import { streamText } from 'ai'const result = streamText({  model: "google/gemini-3-pro-preview",  prompt: "Create a neural fluid engine simulation in a self-contained HTML"});
```

Gemini 3 Pro Preview is also available in [v0’s model selector](https://v0.app/). It’s noticeably faster and more detail-oriented than the original models, making it ideal for frontend and multi-step AI agents.

### [Link to heading](#use-ai-sdk-and-ai-gateway-to-build-your-own)Use AI SDK and AI Gateway to build your own

You can also build your own custom interface using your framework of choice, [AI SDK](https://ai-sdk.dev/), and [AI Gateway](https://vercel.com/ai-gateway) with the same deployment-aware infrastructure and security stack that powers apps running on Vercel today.

[Vercel AI Cloud](https://vercel.com/ai) is built for developers shaping how software is created, including building with the technology that's at the forefront of AI like the latest models.