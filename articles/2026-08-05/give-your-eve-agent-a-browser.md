---
title: "Give your eve agent a browser"
source: "https://vercel.com/changelog/give-your-eve-agent-a-browser"
publishedDate: "2026-08-04"
category: "frontend"
feedName: "Vercel"
author: "Chris Tate"
---

Your eve agent can now navigate the web like a human with [agent-browser](https://eve.dev/integrations/agent-browser).

The `@agent-browser/eve` extension gives any [eve](https://eve.dev/) agent a full set of browser tools: navigate pages, read content, click, fill forms, take screenshots, and inspect console and network activity. Everything runs inside the agent's sandbox.

Install the extension:

```
pnpm add @agent-browser/eve
```

Then mount it under `agent/extensions/`:

agent/extensions/browser.ts

```
import browser from "@agent-browser/eve";export default browser({  allowedDomains: ["example.com", "*.example.com"],  maxOutputChars: 50000,});
```

Your agent gets namespaced tools like `browser__navigate`, `browser__snapshot`, `browser__click`, `browser__fill`, and `browser__screenshot`. Snapshot refs such as `[ref=e12]` become `@e12` selectors, so the agent can inspect a page, then act on exactly what it saw.

The extension includes:

-   **Sandbox isolation:** Chromium and agent-browser run in the eve sandbox, not your app. Pre-install them in your sandbox template so sessions start warm, or let the extension install them on first use.
    
-   **Domain allowlist:** Restrict navigation and subresources with `allowedDomains`, and control output size, screenshot handling, proxy use, and session naming through extension options.
    
-   **Credential protection:** Cookie, storage, and saved-auth-state commands are never exposed to the model. Use eve extension overrides to disable tools, require approvals, or add app-specific guarded tools.
    

See a complete Next.js eve app with the extension mounted in the [example](https://github.com/vercel-labs/agent-browser/tree/main/examples/eve), or read the [documentation](https://agent-browser.dev/eve) to get started.

[

**Start an eve agent from a template**

Pick a template, deploy in minutes, and debug every agent session in the Vercel dashboard from the first run.

Build your agent



](https://eve.dev/templates)