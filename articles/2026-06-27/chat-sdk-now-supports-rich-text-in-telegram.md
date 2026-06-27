---
title: "Chat SDK now supports rich text in Telegram"
source: "https://vercel.com/changelog/chat-sdk-now-supports-rich-text-in-telegram"
publishedDate: "2026-06-15"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK now renders explicit `markdown` and `ast` messages as native rich messages on the [Telegram adapter](https://chat-sdk.dev/adapters/official/telegram). Your bots get real headings, lists, tables, task lists, formulas, and separate media blocks instead of flattened text.

lib/bot.ts

```
bot.onNewMention(async (thread) => {  await thread.post({    markdown: [      "## Deployment status",      "",      "| Service | Status |",      "| --- | --- |",      "| API | ✅ Ready |",      "| Web | 🚀 Building |",    ].join("\n"),  });});
```

Post a markdown table and it renders as a native Telegram rich message

What you get:

-   **Native formatting**: headings, lists, tables, task lists, formulas, and media blocks.
    
-   **Streaming**: private chats show live draft previews and persist the final response.
    
-   **Automatic fallback**: plain strings, raw messages, cards, and captions continue to work exactly as before.
    

Read the [Telegram adapter documentation](https://chat-sdk.dev/adapters/official/telegram) to get started.