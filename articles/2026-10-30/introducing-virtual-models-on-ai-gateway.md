---
title: "Introducing Virtual Models on AI Gateway"
source: "https://vercel.com/blog/ai-gateway-virtual-models"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

Today, we are introducing [Virtual Models](https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models) on [AI Gateway](https://vercel.com/docs/ai-gateway).

Virtual Models are an abstraction of the model string and configurations your apps and developers use. With a single virtual model ID, you can change and update models, configure fallbacks and priority, and enforce Zero Data Retention centrally. The virtual model configuration applies wherever the ID is used.

Assign a virtual model ID to an agent task, and pass it as the model string wherever that task is called. You can then change the model and settings behind the virtual model ID in AI Gateway, and your apps and agents will pick up the new configuration automatically, without code changes or redeploys.

## [Copy link to heading](#new-models-use-the-same-virtual-model-id)New models use the same virtual model ID

In the last 90 days, 125 new models from more than 10 labs became available on AI Gateway. That adds up to about 10 a week. AI Gateway already makes switching a one-line change. You call any of those models by ID, and AI Gateway routes each request to a healthy provider and can fall back to others when one fails.

That one line still lives in your code, so switching usually means a redeploy.

Virtual Models move model selection and configuration to AI Gateway. You create an ID for a task, like `vmc/coding-agent`, and then configure the model and the settings it should use:

```
vercel ai-gateway virtual-models create coding-agent \  --model anthropic/claude-opus-5.5 \  --config '{"speed":"fast","zeroDataRetention":true}'
```

You can then use that virtual model ID as the model string wherever the task runs:

```
import { streamText } from 'ai';const result = streamText({  model: 'vmc/coding-agent',  prompt: 'Remove the deprecated API calls from this module.',});
```

For [coding agents](https://vercel.com/docs/ai-gateway/coding-agents) like [Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code), [Codex](https://vercel.com/docs/ai-gateway/coding-agents/openai-codex), and others, connect them with `vercel ai-gateway setup`, then select your virtual model in each harness's model picker or configuration.

When a different model is available, including one from another provider, [edit the virtual model](https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models#managing-virtual-models). Every app and agent that calls `vmc/coding-agent` picks it up within a few minutes, with no code change or deployment needed:

```
vercel ai-gateway virtual-models edit coding-agent --model openai/gpt-6.1-sol
```

## [Copy link to heading](#give-each-task-its-own-model)Give each task its own model

An agent task like support ticket triage can run hundreds of times an hour and needs to be cheap. Other tasks, like legal contract review, may only run a few times a day, but require a high level of reasoning.

You can now give each task a purpose-built virtual model and easily evolve that model and configuration over time:

Settings such as fallbacks, Zero Data Retention, and tags stay with the virtual model when you switch models. Provider options apply per provider, so an Anthropic-specific setting stops applying when you point the virtual model at an OpenAI model. Review your provider options whenever you switch providers.

Before you switch a virtual model that serves production traffic, point a second one, like `vmc/coding-agent-candidate`, at the new model and run your evals against it. If quality drops after the switch, point the original back at the previous model.

## [Copy link to heading](#govern-which-models-your-team-uses-and-how)Govern which models your team uses and how

Anyone on your team can call a virtual model, and team roles control who can make changes to it. Platform and security teams can centrally govern and test models and settings, while still easily giving teams access to new models as they are released.

Settings on a virtual model win over the same settings in a request, so callers can't override the provider order, fallbacks, or service tier you chose. For example, you can configure the fallback models for `vmc/storefront-assistant` centrally, and every app using that virtual model ID will use the same failover configuration, even if a request specifies different fallbacks.

If a virtual model requires Zero Data Retention or providers that don't train on request data, those configurations are enforced even if a request explicitly sets `zeroDataRetention` or `disallowPromptTraining` to false.

Tags on a virtual model replace any tags sent with the request, so spend lands on the task no matter how each app tags its calls. The [Virtual Models page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fvirtual-models&title=AI+Gateway+Virtual+Models) shows requests, spend, and success rate for each task.

## [Copy link to heading](#get-started)Get started

Create a virtual model from your [team dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fvirtual-models&title=AI+Gateway+Virtual+Models) or with the [Vercel CLI](https://vercel.com/docs/cli/ai-gateway#virtual-models).

## [Copy link to heading](#about-ai-gateway)About AI Gateway

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries, failover, and performance optimizations for higher-than-provider uptime. It includes built-in [custom reporting](https://vercel.com/changelog/custom-reporting-ai-gateway), [Zero Data Retention support](https://vercel.com/blog/zdr-on-ai-gateway), [budgets for API keys](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys), [routing rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules), and more.

AI Gateway reflects provider pricing with no markup and doesn't charge a platform fee on inference, including on [Bring Your Own Key](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok) (BYOK) requests.

Virtual Models work with every model type on AI Gateway, including image, video, speech, embedding, and realtime models, and with the AI SDK and the OpenAI- and Anthropic-compatible APIs. See the [Virtual Models documentation](https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models) for every setting.