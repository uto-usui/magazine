---
title: "Port 8080 is now available in Vercel Sandboxes"
source: "https://vercel.com/changelog/port-8080-is-now-available-in-vercel-sandboxes"
publishedDate: "2026-05-29"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

This port was used as a controller port, and that has now moved to port 23456.

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({  ports: [8080],});await sandbox.runCommand({  cmd: "python3",  args: ["-m", "http.server", "8080", "--bind", "0.0.0.0"],  detached: true,});console.log(`url: ${sandbox.domain(8080)}`);
```

Create a sandbox with port 8080 open