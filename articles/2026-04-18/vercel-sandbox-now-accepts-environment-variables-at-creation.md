---
title: "Vercel Sandbox now accepts environment variables at creation"
source: "https://vercel.com/changelog/vercel-sandbox-now-accepts-environment-variables-at-creation"
publishedDate: "2026-03-03"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

1 min read

Mar 3, 2026

The Vercel Sandbox [SDK](https://www.npmjs.com/package/@vercel/sandbox) and [CLI](https://www.npmjs.com/package/sandbox) now support setting environment variables at sandbox creation that are automatically available to every command.

When running multi-step processes in a [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) like installing dependencies, building a project or starting a dev server, each step often needs the same environment variables. Now, these are available with every `runCommand` call.

```
await using sandbox = await Sandbox.create({  env: { HELLO: "world", DEBUG: "true" },});// Prints "world" (inherited from Sandbox.create)await sandbox.runCommand({ cmd: "node", args: ["-p", "process.env.HELLO"] });// Prints "false" (overrides the DEBUG value)await sandbox.runCommand({ cmd: "node", args: ["-p", "process.env.DEBUG"], env: { DEBUG: "false" } });
```

Environment variables passed to `Sandbox.create()` are inherited by all commands automatically. Per-command env in `runCommand` can still override individual values when needed.

Update to the latest Sandbox CLI and SDK, run `npm i @vercel/sandbox` to get started.