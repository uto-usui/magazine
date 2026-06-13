---
title: "Build Chat SDK web UIs in Vue or Svelte"
source: "https://vercel.com/changelog/build-chat-sdk-web-uis-in-vue-or-svelte"
publishedDate: "2026-06-02"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

1 min read

Jun 2, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5uMjNoAU7yQvQe0AhUzKJS%2Fedd9a75764b5b0570a254eae664d0674%2FChat_SDK_-_Web.png&w=1920&q=75)

The Chat SDK [web adapter](https://chat-sdk.dev/adapters/official/web) now has first-class support for Vue and Svelte, joining the existing React integration. Because the adapter speaks the [AI SDK UI message stream protocol](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol), the same server route works. Each framework ships its own `useChat`, built on the matching AI SDK package for React, Vue, or Svelte.

lib/bot.ts

```
// Vue / Nuxtimport { useChat } from "@chat-adapter/web/vue";// Svelte / SvelteKitimport { useChat } from "@chat-adapter/web/svelte";const chat = useChat({ api: "/api/chat" });
```

Framework-specific useChat imports for Vue and Svelte

The Vue and Svelte helpers return a reactive `Chat` instance, so read `chat.messages` and `chat.status` directly in your template rather than destructuring. The `api` and `threadId` options match the React wrapper, and your server setup remains the same.

Read the [documentation](https://chat-sdk.dev/adapters/official/web) to get started or browse the [adapters directory](https://chat-sdk.dev/adapters).