---
title: "Run Paseo agents on Vercel Sandbox"
source: "https://vercel.com/changelog/run-paseo-agents-on-vercel-sandbox"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

Paseo now supports running fx, Codex, Claude Code, OpenCode, and Pi in the cloud with the [Vercel Sandbox plugin](https://github.com/vercel-labs/paseo-vercel-sandbox).

You can now start an agent in Vercel Sandbox from Paseo on your laptop, then connect from your phone to control the same session, even when your laptop is closed. Stopping a sandbox saves your files and conversation history so you can pick up where you left off. Active processes stop with the sandbox.

Enter your Vercel AI Gateway key once during setup. The plugin reuses it for model requests across your sessions, keeping the key outside the sandbox.

To get started, enable plugins in Settings → Plugins in Paseo. Then install the plugin:

```
paseo plugin add vercel-labs/paseo-vercel-sandbox
```

Learn more in the [Sandbox documentation](https://vercel.com/docs/sandbox/ecosystem), [Paseo plugin listing](https://paseo.sh/plugins/vercel-labs/vercel-sandbox), and the Paseo [related projects documentation](https://paseo.sh/docs/community).