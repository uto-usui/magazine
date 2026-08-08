---
title: "Vercel AI Gateway and Vercel Sandbox now available on Hermes Agent"
source: "https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent"
publishedDate: "2026-08-07"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Hermes Agent](https://hermes-agent.nousresearch.com/) can now use [Vercel AI Gateway](https://vercel.com/ai-gateway) as its inference layer and run its agent commands in an isolated [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) microVM. Access 200+ models through AI Gateway at no markup on tokens, and every request appears in your AI Gateway dashboard with the rest of your usage and spend.  

### [Copy link to heading](#setup)Setup

Install Hermes, then pick Vercel AI Gateway in the setup wizard:

```
# Install Hermescurl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash# In the setup wizard: pick Vercel AI Gateway, paste your key# Pick Vercel Sandbox to run each agent command in a microVM# Already have Hermes? Update first, then switch either one:hermes updatehermes setup model      # pick Vercel AI Gatewayhermes setup terminal   # pick Vercel Sandbox# Verifyhermes doctor
```

The picker pulls live model availability and current pricing from AI Gateway. For the full walkthrough, see [Configuring Hermes](https://vercel.com/docs/ai-gateway/coding-agents/hermes#configuring-hermes).

### [Copy link to heading](#running-commands-in-vercel-sandbox)Running commands in Vercel Sandbox

The [Vercel Sandbox](https://vercel.com/docs/sandbox) backend is opt-in. Commands run locally until you set `terminal.backend` to `vercel_sandbox`; with it enabled, agent commands run in a cloud microVM with a workspace root of `/vercel/sandbox` instead of on your machine. The backend supports `node24` (default), `node22`, and `python3.13` runtimes. For [local development](https://vercel.com/docs/sandbox/concepts/authentication), use `VERCEL_OIDC_TOKEN`. Run `vercel link` and `vercel env pull` to get a development token.

To get started, read the [Hermes documentation](https://vercel.com/docs/ai-gateway/coding-agents/hermes) and the [Vercel Sandbox documentation](https://vercel.com/docs/sandbox), or [browse AI Gateway models](https://vercel.com/ai-gateway/models).