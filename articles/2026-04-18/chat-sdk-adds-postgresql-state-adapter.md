---
title: "Chat SDK adds PostgreSQL state adapter"
source: "https://vercel.com/changelog/chat-sdk-adds-postgresql-state-adapter"
publishedDate: "2026-03-10"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Mar 10, 2026

Chat SDK now supports PostgreSQL as a state backend, joining Redis and ioredis as a production-ready option with the new [PostgreSQL adapter](https://chat-sdk.dev/adapters/postgres).

Teams that already run PostgreSQL can persist subscriptions, distributed locks, and key-value cache state without adding Redis to their infrastructure.

**Try the PostgreSQL state adapter today:**

```
import { Chat } from "chat";import { createPostgresState } from "@chat-adapter/state-pg";const bot = new Chat({  userName: "mybot",  adapters: {    /* ... */  },  state: createPostgresState(),});
```

The adapter uses [pg](https://www.npmjs.com/package/pg) (node-postgres) with raw SQL queries and automatically creates the required tables on first connect. It supports TTL-based caching, distributed locking across multiple instances, and namespaced state via a configurable key prefix.

Read the [documentation](https://chat-sdk.dev/adapters/postgres) to get started or browse the [adapters directory](https://chat-sdk.dev/adapters).

_Special thanks to_ [_@bai_](https://github.com/bai)_, whose community contribution in_ [_PR #154_](https://github.com/vercel/chat/pull/154) _laid the groundwork for this adapter._