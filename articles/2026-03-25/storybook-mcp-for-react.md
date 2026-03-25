---
title: "Storybook MCP for React"
source: "https://storybook.js.org/blog/storybook-mcp-for-react/"
publishedDate: "2026-03-23"
category: "design-systems"
feedName: "Storybook Blog"
author: "Kyle Gach"
---

Agents don’t know anything about your components so they make up slop that doesn’t match your coding standards. [Storybook MCP](https://storybook.js.org/ai?ref=storybookblog.ghost.io) gives agents intelligence and test guardrails to keep on track:

1.  Context about your existing components to reuse
2.  Instructions to write stories and preview their work
3.  Ability to run tests and fix their own issues

0:00

/0:19

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/media/2026/03/Storybook-MCP-Hero_thumb.jpg)

💁

****“But what about skills?”****  
We’re investing in both. Skills are a helpful way to teach agents how to accomplish tasks. But MCP is required for back-and-forth communication with agents to power self-healing testing.

### Force agents to use your components

Storybook MCP equips agents with component metadata like stories, API, and docs. This allows agents to reuse existing components instead of inventing new patterns. It does this faster and with fewer tokens compared to not using MCP.

![All numbers compare Baseline vs. MCP Docs. Quality: 12.8% improved code usage. Speed: 2.76x faster duration. Cost: 27% fewer tokens used.](https://storybookblog.ghost.io/content/images/2026/03/image-3.png)

Benchmarks from generating UI with the [Reshaped](https://reshaped.so/?ref=storybookblog.ghost.io) component library, with and without Storybook MCP

Teams often split their app and design system into separate Storybooks. To generate UI with components from more than one Storybook, you can use the MCP server together with [composition](https://storybook.js.org/docs/sharing/storybook-composition?ref=storybookblog.ghost.io).

![Design system components, Application components, and Third-party components are all composed into input for the MCP Server which communicates with the Agents](https://storybookblog.ghost.io/content/images/2026/03/Storybook-MCP-for-React--3-.png)

Agents can read data from composition without needing to connect with multiple endpoints.

**Publish remote MCP**  
Publish your Storybook MCP server to share component context with your team without running Storybook locally. Teammates can add the published MCP to their agent, even if their project doesn’t use Storybook.

Chromatic supports [publishing Storybook MCP](https://www.chromatic.com/ai?ref=storybookblog.ghost.io) out of the box for free. It also comes with quality checks, versioning, and secure authorization built-in.

### Review agent work with story previews

When an agent is finished, it summarizes its work. Instead of a wall of text, Storybook MCP embeds live stories directly inside the chat UI. You can verify the look and feel of the generated UI, including interactions like hover states, without leaving the client.

![GitHub Copilot agent presenting live story previews after completing its work.](https://storybookblog.ghost.io/content/images/2026/03/Snapshots-denied-3.png)

The live story is embedded directly in the agent chat interface via [MCP Apps](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/?ref=storybookblog.ghost.io). A link to that story is also included for deeper inspection.

### Agents self-verify with tests

The MCP server gives your agent tools to run component and accessibility tests. It only tests what it deems relevant, making the feedback loop fast and focused. When the agent kicks off a test run, you see the results stream into Storybook's UI.

If there are errors, the agent applies fixes itself or alerts the developer when human judgement is needed.

0:00

/0:10

The agent kicks off a test run, and you can see results appear in realtime in Storybook's UI

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/media/2026/03/Code-1_thumb.jpg)

## Get started

Storybook MCP is available now in Storybook 10.3 for React projects. Try it now below or read the full [installation docs](https://storybook.js.org/docs/ai/mcp/overview?ref=storybookblog.ghost.io). MCP support for other frameworks coming later this year.

Upgrade to version 10.3+:

```
npx storybook@latest upgrade
```

Install and register the addon:

```
npx storybook add @storybook/addon-mcp
```

Add the MCP server to your client:

```
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```