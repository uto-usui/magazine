---
title: "DeepSeek V4 Flash Vision Experimental now available on AI Gateway"
source: "https://vercel.com/changelog/deepseek-v4-flash-with-vision-now-available-on-ai-gateway"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Kevin Dawkins"
---

[DeepSeek V4 Flash with vision](https://vercel.com/ai-gateway/models/deepseek-v4-flash-vision-exp) is now available on AI Gateway.

This model is an experimental version that accepts images alongside text. You can ask it to describe a picture, read text out of a screenshot, or work through a chart in the same request as your prompt. DeepSeek V4 Flash Vision Experimental now available on AI Gateway. Tool use, reasoning, and caching all work the same as before.

Use `deepseek/deepseek-v4-flash-vision-exp` to get started:

```
import { generateText } from 'ai';import fs from 'node:fs';const { text } = await generateText({  model: 'deepseek/deepseek-v4-flash-vision-exp',  messages: [    {      role: 'user',      content: [        { type: 'text', text: 'What is in this screenshot?' },        {          type: 'file',          mediaType: 'image/png',          data: fs.readFileSync('./example.png'),        },      ],    },  ],});
```

Images can be JPEG, PNG, GIF, or WebP. The format is read from the file's own bytes rather than its name or the `mediaType` you declare, so a mislabeled file still goes through.

The `-exp` in the model ID marks this as an experimental release. Expect behavior to change, and keep a fallback model configured if it's on a production path.

To use it in a [coding agent](https://vercel.com/docs/ai-gateway/coding-agents), run `vercel ai-gateway coding-agents setup` to connect agents like Claude Code, Codex, OpenCode, Cursor, and Pi, then select `deepseek/deepseek-v4-flash-vision-exp` inside the agent.

Try Deepseek V4 Flash Vision Experimental in the [model playground](https://vercel.com/ai-gateway/models/deepseek-v4-flash-vision-exp).

AI Gateway reflects provider pricing with no markup and does not charge a platform fee on inference, including BYOK requests. [View all language models](https://vercel.com/ai-gateway/models?type=text) on AI Gateway to see more.