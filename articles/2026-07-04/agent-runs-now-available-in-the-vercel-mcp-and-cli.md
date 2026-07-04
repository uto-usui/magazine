---
title: "Agent Runs now available in the Vercel MCP and CLI"
source: "https://vercel.com/changelog/agent-runs-vercel-mcp-cli"
publishedDate: "2026-07-03"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

Your agent can now inspect [Agent Runs](https://vercel.com/docs/eve/observability#agent-runs) via the Vercel MCP and CLI for [eve](https://eve.dev/), the open-source agent framework.

eve traces are automatically ingested when deployed to Vercel and available as Agent Runs. The new [Vercel MCP tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools#agent-runs-observability-tools) and [Vercel CLI commands](https://vercel.com/docs/cli) let you find projects with runs, list recent runs, and retrieve full traces, including reasoning, tool calls, and token usage.

**Vercel MCP tools:**

-   `list_agent_run_projects`: Find projects in a team with Agent Runs activity.
    
-   `list_agent_runs`: List recent runs for a project.
    
-   `get_agent_run`: Inspect metadata, lifecycle events, usage, and subagent data.
    
-   `get_agent_run_trace`: Retrieve trace data for a run, including turns, messages, reasoning, tool calls, token usage, and tool input/output.
    

**Vercel CLI commands:**

-   `vercel agent-runs projects`
    
-   `vercel agent-runs list`
    
-   `vercel agent-runs inspect <runId>`
    
-   `vercel agent-runs trace <runId>`
    

Every CLI subcommand supports `--json` for machine-readable output, and traces render as markdown when piped, so coding agents without MCP access can call the CLI directly to debug their own runs.

Ask your coding agent questions like "Show me the latest production Agent Runs for my project" or "Update skills based on recent runs".

**Get started by installing the Vercel MCP:**

```
npx add-mcp https://mcp.vercel.com
```

**Or upgrade to the latest version of the Vercel CLI:**

```
npm i -g vercel@latest
```