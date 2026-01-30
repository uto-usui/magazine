---
title: "Node.js 24 LTS is now available on Sandbox"
source: "https://vercel.com/changelog/node-js-24-lts-is-now-available-on-sandbox"
publishedDate: "2025-12-10"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

1 min read

Dec 10, 2025

Vercel Sandbox now supports Node.js version 24.

To run a Sandbox with Node.js 24, upgrade `@vercel/sandbox` to version `1.1.0` or above and set the `runtime` property to `node24`:

main.ts

```
import { Sandbox } from "@vercel/sandbox";async function main() {  const sandbox = await Sandbox.create();  const version = await sandbox.runCommand("node", ["-v"]);  console.log(`Node.js version: ${await version.stdout()}`);}main().catch(console.error);
```

Read our [Sandbox documentation](https://vercel.com/docs/vercel-sandbox) to learn more.