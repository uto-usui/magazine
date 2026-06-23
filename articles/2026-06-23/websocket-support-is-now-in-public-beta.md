---
title: "WebSocket support is now in Public Beta"
source: "https://vercel.com/changelog/websocket-support-is-now-in-public-beta"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Matthew Stanciu"
---

Vercel Functions can now serve WebSocket connections, enabling bidirectional communication between clients and server-side code on Vercel.

Use WebSockets for realtime features such as interactive AI streaming, chat, and collaborative apps.

WebSocket connections run [Fluid compute](https://vercel.com/docs/fluid-compute) and follow the same [limits](https://vercel.com/docs/functions/limitations) and [pricing](https://vercel.com/docs/functions/usage-and-pricing) as other Function invocations. With [Active CPU pricing](https://vercel.com/docs/functions/usage-and-pricing), billing only applies to the time your Function spends processing messages, not idle connection time.

You can serve WebSocket connections using standard Node.js libraries, with no additional configuration:

api/ws.ts

```
import express from 'express';import { createServer } from 'http';import { WebSocketServer } from 'ws';const app = express();const server = createServer(app);const wss = new WebSocketServer({ server });wss.on('connection', (ws) => {  ws.on('message', (data) => {    ws.send(data);  });});export default server;
```

Node.js WebSocket server using Express and the ws library, deployed as a Vercel Function

Higher-level libraries like [Socket.IO](http://socket.io/) are also supported.

Read [the documentation](https://vercel.com/docs/functions/websockets) to get started.