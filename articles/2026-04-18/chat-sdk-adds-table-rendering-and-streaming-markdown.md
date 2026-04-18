---
title: "Chat SDK adds table rendering and streaming markdown"
source: "https://vercel.com/changelog/chat-sdk-adds-table-rendering-and-streaming-markdown"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

2 min read

Mar 6, 2026

Chat SDK now renders tables natively across all platform adapters and converts markdown to each platform's native format during streaming.

The `Table()` component is a new card element in [Chat SDK](https://chat-sdk.dev/) that gives you a clean, composable API for rendering tables across every platform adapter. Pass in headers and rows, and Chat SDK handles the rest.

```
import { Table } from "chat";await thread.post(  Table({    headers: ["Model", "Latency", "Cost"],    rows: [      ["claude-4.6-sonnet", "1.2s", "$0.003"],      ["gpt-4.1", "0.9s", "$0.005"],    ],  }));
```

The adapter layer converts the table to the best format each platform supports.

Slack renders Block Kit table blocks, Teams and Discord use GFM markdown tables, Google Chat uses monospace text widgets, and Telegram converts tables to code blocks. GitHub and Linear already supported tables through their markdown pipelines and continue to work as before. Plain markdown tables (without `Table()`) are also converted through the same pipeline.

Streaming markdown has also improved across the board. Slack's native streaming path now renders bold, italic, lists, and other formatting in real time as the response arrives, rather than resolving when the message is complete. All other platforms use the fallback streaming path, so streamed text now passes through each adapter's markdown-to-native conversion pipeline at each intermediate edit. Previously, these adapters received raw markdown strings, so users saw literal `**bold**` syntax until the final message.

Adapters without platform-specific rendering now include improved defaults, so new formatting capabilities work across all platforms without requiring adapter-by-adapter updates.

Update to the latest Chat SDK to get started, and view the [documentation](https://chat-sdk.dev/docs).