---
title: "Send feedback from the Vercel MCP"
source: "https://vercel.com/changelog/send-feedback-from-vercel-mcp"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "Vercel"
author: "Krish"
---

[Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp) now includes `submit_feedback`, a tool for sending bug reports, friction reports, and feature requests directly to the Vercel team from your agent or harness.

Ask your agent to give feedback in plain language:

> Send Vercel feedback that the deployment error didn't explain which environment variable was missing.

Your assistant can attach structured context that describes the task, the expected behavior, and what went wrong:

```
{  "message": "The deployment error didn't name the missing environment variable",  "context": {    "tool": "deploy_to_vercel",    "task": "Deploy a preview",    "expected": "An error identifying the missing variable",    "actual": "Build failed without naming the variable",    "type": "bug"  }}
```

The tool requires sign-in, and it sends feedback only when you ask your agent to share it.

Connect your agent to Vercel MCP and read the [`submit_feedback documentation`](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation) to get started.