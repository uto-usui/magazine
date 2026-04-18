---
title: "MCP Apps support on Vercel"
source: "https://vercel.com/changelog/mcp-apps-support-on-vercel"
publishedDate: "2026-03-04"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

1 min read

Mar 4, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2v1FkLEu3Y6IS8hOgWyevM%2F742118ca3ee4c0259ea25d53b2b6887d%2FCleanShot_2026-03-05_at_08.21.53_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4hSUWDGpfT3e9ObljbU3eE%2F5c050cc990f68f80e9b4b8963908d824%2FCleanShot_2026-03-05_at_08.21.53_2x.png&w=1920&q=75)

Teams can now build and deploy MCP Apps on Vercel with full support for Next.js.

MCP Apps are similar to [ChatGPT apps](https://vercel.com/changelog/chatgpt-apps-support-on-vercel), but are a provider-agnostic open standard for embedded UIs. They run inside iframes and communicate with any compatible host, such as Cursor, Claude.ai, and ChatGPT, using a shared bridge.

This architecture uses `ui/*` JSON-RPC over `postMessage`, enabling a single UI to function across any compatible host without platform-specific integrations.

By combining this standard with Next.js on Vercel, developers can leverage Server-Side Rendering (SSR) and React Server Components to build portable, high-performance agent interfaces.

[Deploy the template](https://vercel.com/templates/template/mcp-apps-next-js-starter) or learn more in the [documentation](https://vercel.fyi/mcp-apps-docs).