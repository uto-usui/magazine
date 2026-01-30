---
title: "Use skills in your AI SDK agents via bash-tool"
source: "https://vercel.com/changelog/use-skills-in-your-ai-sdk-agents-via-bash-tool"
publishedDate: "2026-01-21"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

1 min read

Jan 21, 2026

Skills support is now available in [`bash-tool`](https://www.npmjs.com/package/bash-tool), so your AI SDK agents can use the skills pattern with filesystem context, Bash execution, and sandboxed runtime access.

This gives your agent a consistent way to pull in the right context for a task, using the same isolated execution model that powers filesystem-based context retrieval.

This allows giving your agent access to the [wide variety of publicly available skills](https://skills.sh/), or for you to write your own proprietary skills and privately use them in your agent.

```
import {  experimental_createSkillTool as createSkillTool,  createBashTool,} from "bash-tool";import { ToolLoopAgent } from "ai";// Discover skills and get files to uploadconst { skill, files, instructions } = await createSkillTool({  skillsDirectory: "./skills",});// Create bash tool with skill filesconst { tools } = await createBashTool({  files,  extraInstructions: instructions,});// Use both tools with an agentconst agent = new ToolLoopAgent({  model,  tools: { skill, ...tools },});
```

Example of using skills with bash-tool in an AI SDK ToolLoopAgent

Read the [`bash-tool` changelog](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval) for background and check out [createSkillTool documentation.](https://github.com/vercel-labs/bash-tool?tab=readme-ov-file#skills-experimental)