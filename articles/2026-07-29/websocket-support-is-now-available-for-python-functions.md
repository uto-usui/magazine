---
title: "WebSocket support is now available for Python Functions"
source: "https://vercel.com/changelog/websocket-support-is-now-available-for-python-functions"
publishedDate: "2026-07-23"
category: "frontend"
feedName: "Vercel"
author: "Fantix King"
---

Vercel now supports WebSocket connections for Python applications.

WebSockets enable bidirectional communication between client- and server-side code, powering real-time features like interactive AI streaming, real-time chat, and multiplayer live collaboration. Both ASGI and WSGI applications are supported, including frameworks like FastAPI, Django, and Flask.

app.py

```
import fastapiapp = fastapi.FastAPI()@app.websocket("/api/ws")async def websocket_endpoint(websocket: fastapi.WebSocket):    await websocket.accept()    try:        while True:            message = await websocket.receive_text()            await websocket.send_text(message)    except fastapi.WebSocketDisconnect:        pass
```

Python WebSocket server using FastAPI, deployed as a Vercel Function

Explore the [FastAPI AI Chat](https://github.com/vercel/examples/tree/main/websockets/fastapi-ai-chat) and [Flask AI Chat](https://github.com/vercel/examples/tree/main/websockets/flask-ai-chat) examples, or [read the WebSockets documentation](https://vercel.com/docs/functions/websockets#python-frameworks) to get started.