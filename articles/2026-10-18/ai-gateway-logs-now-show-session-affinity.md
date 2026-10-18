---
title: "AI Gateway logs now show session affinity"
source: "https://vercel.com/changelog/ai-gateway-logs-now-show-session-affinity"
publishedDate: "2026-10-17"
category: "frontend"
feedName: "Vercel"
author: "Sam Chitgopekar"
---

[AI Gateway logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) now have a [Sessions view](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs%3FgroupBy%3Dsessions&title=AI+Gateway+Sessions) that groups requests into sessions and shows how session affinity routed each one. Each row shows the [coding agent](https://vercel.com/docs/ai-gateway/coding-agents) or app that ran the session, such as Claude Code, Codex, or Cursor, along with its cost, models, providers, and how much of its input was cached across every turn.

Open a session to see its cache hit rate, duration, and path. The path lists each turn with its model and timing, and names the provider serving the session along with any earlier ones. [Session affinity](https://vercel.com/docs/ai-gateway/models-and-providers/session-affinity) sends each turn to the provider that served the one before it, so the provider already has most of the prompt in cache. A session that stays on one provider reads more of each prompt from [cache](https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching).

Filter sessions by turns, client, model, provider, authentication, or cost. Single-turn sessions are hidden until you clear the minimum turns filter.

Session affinity runs by default on text and chat requests. To group requests yourself, send the same `sessionId` in `providerOptions.gateway`, or the same `x-session-id` header, on every request in a conversation. Requests without one are grouped by a fingerprint of the conversation's opening and appear as fingerprinted sessions.

Read the [session affinity documentation](https://vercel.com/docs/ai-gateway/models-and-providers/session-affinity) for more information on how AI Gateway identifies sessions.