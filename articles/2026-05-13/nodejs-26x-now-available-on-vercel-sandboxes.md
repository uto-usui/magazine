---
title: "Node.js 26.x now available on Vercel Sandboxes"
source: "https://vercel.com/changelog/node-js-26-x-now-available-on-vercel-sandboxes"
publishedDate: "2026-05-12"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

1 min read

May 12, 2026

Vercel Sandbox now supports Node.js version 26.

To run a Sandbox with Node.js 26, upgrade `@vercel/sandbox` to `1.10.2` or later, or to `2.0.0-beta.19` or later if you're using v2 and set the `runtime` property to `node26`:

main.ts

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({ runtime: "node26" });const version = await sandbox.runCommand("node", ["-v"]);console.log(`Node.js version: ${await version.stdout()}`);
```

Get started today and learn more in the [documentation](https://vercel.com/docs/vercel-sandbox/sdk-reference).