---
title: "AI SDK harness layer now supports native subscription authentication"
source: "https://vercel.com/changelog/ai-sdk-harness-native-subscription-authentication"
publishedDate: "2026-09-14"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

The [AI SDK harness layer](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk) now supports authenticating harnesses through their native subscriptions, where the underlying harness supports them. The harness layer runs different coding agents through the same `HarnessAgent` interface, so you can switch agents without changing your application code.

No code changes or new settings are required. The `direct` authentication mode uses explicit provider environment credentials when they are present, and otherwise a native subscription found on the host. The default `auto` mode does the same when no AI Gateway credentials are set. The `ai-gateway` mode never reads native subscriptions.

Native subscription credentials stay on the host. Just like with API keys, credentials are resolved at the host boundary. OAuth access tokens are refreshed there as needed. Where the sandbox supports it, the harness receives placeholder credentials and the real token is injected into outbound requests on the host.

Native subscriptions work across harness adapters wherever the harness itself supports subscription login. These include Claude Code, Cline, Codex, Cursor, fx, GitHub Copilot, Grok Build, OpenCode, and Pi.

Read the [harness documentation](https://ai-sdk.dev/v7/providers/ai-sdk-harnesses) to learn more.