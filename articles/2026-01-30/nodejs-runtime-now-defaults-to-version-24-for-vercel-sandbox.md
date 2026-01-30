---
title: "Node.js runtime now defaults to version 24 for Vercel Sandbox"
source: "https://vercel.com/changelog/node-js-runtime-now-defaults-to-version-24-for-vercel-sandbox"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

1 min read

Jan 14, 2026

Vercel Sandbox for Node.js now uses Node.js 24 by default. This keeps the Node.js runtime aligned with the latest Node.js features and performance improvements.

If you don’t explicitly configure a runtime, Sandbox will use Node.js 24 (as shown below).

main.ts

```
import { Sandbox } from "@vercel/sandbox";async function main() {  const sandbox = await Sandbox.create();  const version = await sandbox.runCommand("node", ["-v"]);  console.log(`Node.js version: ${await version.stdout()}`);}main().catch(console.error);
```

Read the [Sandbox documentation](https://vercel.com/docs/vercel-sandbox) to learn more.