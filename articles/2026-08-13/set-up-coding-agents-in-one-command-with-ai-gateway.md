---
title: "Set up coding agents in one command with AI Gateway"
source: "https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway"
publishedDate: "2026-08-12"
category: "frontend"
feedName: "Vercel"
author: "Sam Chitgopekar"
---

Using coding agents means setting up multiple accounts, provisioning API keys, and scattering observability and billing. Now, you can route them through [AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) to centralize all of this and add controls, with set up in one command:

-   **Any of** [**200+ models**](https://vercel.com/ai-gateway/models) **in any agent**, including models the agent has no native support for. The gateway routes the request to whichever model you picked, with automatic fallbacks.
    
-   [**One dashboard**](https://vercel.com/docs/ai-gateway/observability-and-spend/observability) **for agent traffic**: spend, performance, tokens and more, across the models your agents used.
    
-   [**Budgets**](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)**, resets, and expiry on the** [**keys**](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) agents use to control spend.
    
-   **Team-wide policy your agents can't route around**: turn on [Zero Data Retention](https://vercel.com/docs/ai-gateway/security-and-compliance/zdr) or restrict [which providers](https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist) may serve requests, and it holds for every agent request without editing an agent's config.
    
-   [**Request traces**](https://vercel.com/docs/ai-gateway/observability-and-spend/logs), with the cost, tokens, and model behind each request.
    

To start:

```
# Upgrade to the latest version of the Vercel CLIpnpm i -g vercel@latest# Run coding agents setup commandvercel ai-gateway coding-agents setup
```

`vercel ai-gateway coding-agents setup` connects Claude Code, Codex, OpenCode, and more in one command. It finds the agents on your machine, creates the API key, and writes the gateway URL and your credentials into each agent's own config format.

Agent

Selecting a model

Claude Code, CLI and desktop

`/model` or `/model <slug>`, as in `/model anthropic/claude-opus-5`

Codex, CLI and desktop

`/model` or `codex --model <slug>`

OpenCode

`/models`, then pick `vercel/<creator>/<model>`

Pi

`/model`, or `pi --list-models`

Cline

`cline auth -p vercel-ai-gateway -m <slug>`, or switch in session

Cursor

Add gateway slugs under Settings, then Models

Hermes

`/model custom:vercel-ai-gateway:<slug>`

Kilo Code

`/models`, then pick `openai-compatible/<creator>/<model>`

OpenClaw

Add slugs to the starter list in `openclaw.json`

Files are edited in place with their formatting preserved, and setup does not pin to a model. This command supports 9 coding agents to utilize the models in AI Gateway. You can also use the `/model` in-line command for a selector with all models: refer to the [models list](https://vercel.com/ai-gateway/models) for the full catalog.

Pass `--yes` to take the defaults, or set the key up front:

```
vercel ai-gateway coding-agents setup \  --agent claude-code --agent codex \  --budget 500 --refresh-period monthly --yes
```