---
title: "Run multiple isolated agents in a single Sandbox"
source: "https://vercel.com/changelog/run-multiple-isolated-agents-in-a-single-sandbox"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

The `@vercel/sandbox` SDK now supports multiple Linux users and groups, so you can run agents side by side in a single Sandbox.

Each agent runs as its own user with a private home directory. A group opens a shared workspace when they need to collaborate. This makes multi-agent systems easier to build.

Call `createUser` for each agent; its commands and file operations run as that user, and users can't read, write, or list each other's files. To set up a shared directory, call `createGroup` and add users to it.

```
const sandbox = await Sandbox.create();const coder = await sandbox.createUser("coder");const reviewer = await sandbox.createUser("reviewer");// Each user is isolated to its own home directoryconst cmd = await coder.runCommand("whoami");console.log(await cmd.output());// Share work through a group directoryawait sandbox.createGroup("project");await coder.addToGroup("project");await reviewer.addToGroup("project");
```

Run multiple isolated agents in a single Sandbox.

Learn more in the Vercel Sandbox [documentation](https://vercel.com/docs/sandbox/multi-agent).