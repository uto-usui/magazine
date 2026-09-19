---
title: "Run Terminal-Bench and other Harbor evals on Vercel Sandbox"
source: "https://vercel.com/changelog/run-terminal-bench-and-other-harbor-evals-on-vercel-sandbox"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

You can now run Harbor evals on Vercel Sandbox.

[Harbor](https://harborframework.com/) is the open-source harness behind [Terminal-Bench](https://www.tbench.ai/), whose registry includes many other benchmarks such as SWE-bench, tau3-bench and OSWorld. Pass `--env vercel` to `harbor run` and each trial executes in its own isolated Firecracker microVM, so you can parallelize far beyond what your local machine is capable of.

A task's network policy is enforced at the sandbox firewall, outside the VM. Optional credential injection attaches secrets to matching outbound requests at that firewall, so they never enter the sandbox.

Paired with [AI Gateway](https://vercel.com/docs/ai-gateway), one `AI_GATEWAY_API_KEY` reaches hundreds of models from multiple providers, and benchmarking another model is the same command with a different `--model`:

```
uv tool install 'harbor[vercel]'export VERCEL_TOKEN="<your-token>"export AI_GATEWAY_API_KEY="<your-key>"harbor run -d terminal-bench/terminal-bench-2-1 \  --agent fx \  --model vercel_ai_gateway/anthropic/claude-fable-5 \  --env vercel \  --n-concurrent 8
```

Swap `--model` to `vercel_ai_gateway/openai/gpt-5.6-luna` to run the same benchmark against an OpenAI model.

Requires Harbor `0.22.0` or later. Follow the [step-by-step guide](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox) for setup, configuration, and troubleshooting. Learn more in the [Sandbox documentation](https://vercel.com/docs/sandbox/ecosystem/harbor).