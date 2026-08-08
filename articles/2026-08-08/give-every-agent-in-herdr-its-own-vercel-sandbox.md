---
title: "Give every agent in Herdr its own Vercel Sandbox"
source: "https://vercel.com/changelog/give-every-agent-in-herdr-its-own-vercel-sandbox"
publishedDate: "2026-08-06"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

Terminal coding agents like Claude Code, Codex, and OpenCode can now each run in their own isolated [Vercel Sandbox](https://vercel.com/sandbox), orchestrated from [Herdr](https://herdr.dev/), a tmux-style manager that runs them side by side in panes. Nothing an agent runs or edits touches your machine.

When you start an agent, the plugin uploads your project files into a new Sandbox, installs the agent there, and opens a pane connected to it.

The pane works like a local terminal; you type to the agent and watch it work. But it lives in the Sandbox, not on your machine, so you can run several agents at once without slowing anything down.

Everything the plugin does is machine-readable. Each action returns its results as JSON, so whatever you can do from a pane, like starting an agent, checking its state, or applying its changes, a script or another agent can do too.

A few safeguards are built in. The plugin shows every file before the first upload, returns remote changes as a Git patch you apply only when you choose, and requires a human to type `DELETE` to permanently remove a Sandbox.

Claude Code (2.1.220), Codex (0.146.0), and OpenCode (1.18.9) are all verified and available by default.

To get started, install the [plugin](https://github.com/vercel-labs/herdr-vercel-sandbox-plugin):

```
herdr plugin install vercel-labs/herdr-vercel-sandbox-plugin
```

Run `vercel link` in the repository you want the agent to work on, then start an agent from Herdr's action menu.

Starting takes two invocations. The first is a dry run: it lists every file it would upload and creates nothing. Run it again, and the plugin creates the Sandbox and opens the agent in a pane. To pull the agent's work back to your machine, run the apply action and its changes arrive as a Git patch.

Usage is billed at [standard Sandbox rates](https://vercel.com/docs/sandbox/pricing). Learn more in the [documentation](https://vercel.com/docs/sandbox/ecosystem/herdr).