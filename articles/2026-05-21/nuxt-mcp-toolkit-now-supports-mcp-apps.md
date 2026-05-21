---
title: "Nuxt MCP Toolkit now supports MCP apps"
source: "https://vercel.com/changelog/nuxt-mcp-toolkit-mcp-apps"
publishedDate: "2026-05-19"
category: "frontend"
feedName: "Vercel"
author: "Hugo Richard"
---

1 min read

May 19, 2026

The [Nuxt MCP Toolkit](https://mcp-toolkit.nuxt.dev/) now supports [MCP apps](https://modelcontextprotocol.io/extensions/apps/overview). Your agent tools can return interactive HTML responses that MCP clients like Claude and ChatGPT render inline, rather than plain-text responses.

Declare a tool with the `defineMcpApp` macro, then read pre-hydrated data, trigger follow-up prompts, or call other tools from inside the UI with the `useMcpApp` composable. The toolkit bundles each Vue SFC into a self-contained HTML file at build time and serves it from your MCP endpoint.

app/mcp/weather.vue

```
<script setup lang="ts">import { z } from 'zod'defineMcpApp({  name: 'weather',  description: 'Show the forecast for a city',  inputSchema: {    city: z.string().describe('City to get the forecast for'),  },  handler: async ({ city }) => ({    structuredContent: await $fetch(`/api/weather?city=${city}`),  }),})const { data, callTool } = useMcpApp<{ city: string, summary: string, tempC: number }>()</script><template>  <article>    <h1>{{ data?.city }}</h1>    <p>{{ data?.summary }}, {{ data?.tempC }}°C</p>    <button @click="callTool('weather', { city: 'London' })">      Check London    </button>  </article></template>
```

A weather tool that renders inline in the host UI and can call itself with a new city

Read the [Nuxt MCP Toolkit documentation](https://mcp-toolkit.nuxt.dev/apps/overview) to get started.