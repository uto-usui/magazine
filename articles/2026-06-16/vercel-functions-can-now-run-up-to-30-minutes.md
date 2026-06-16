---
title: "Vercel Functions can now run up to 30 minutes"
source: "https://vercel.com/changelog/vercel-functions-can-now-run-up-to-30-minutes"
publishedDate: "2026-06-15"
category: "frontend"
feedName: "Vercel"
author: "Florentin Eckl"
---

1 min read

15 Jun 2026

Vercel Functions using the Node.js and Python runtimes now support execution durations up to 30 minutes for Pro and Enterprise teams, more than 2x the previous 800 second limit. Support for additional runtimes is coming soon.

Use longer-running Functions for work that needs more time to finish, including:

-   Long LLM reasoning and tool calls
    
-   AI responses that stream for several minutes
    
-   Document and media processing
    
-   OCR and extraction
    
-   Web scraping and browser automation
    
-   Complex [Workflow](https://vercel.com/docs/workflows) steps or [Queue](https://vercel.com/docs/queues) handlers
    

Fluid Compute keeps long-running work cost-efficient. Active CPU billing only applies while your code is executing, and pauses while your Function is waiting on I/O such as AI model calls, database queries, and third-party APIs.

Set `maxDuration` to opt in. For Next.js App Router, configure it in the route file:

app/api/long-task/route.ts

```
export const maxDuration = 1800; // 30 minutesexport async function POST(request: Request) {  return Response.json({ ok: true });}
```

For other runtimes and frameworks, configure `maxDuration` for a specific function path in `vercel.json`:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "functions": {    "api/long-task.py": {      "maxDuration": 1800    }  }}
```

Durations above 800 seconds are in beta and require Fluid Compute. Learn more about configuring max duration for Vercel Functions [in the documentation](https://vercel.com/docs/functions/configuring-functions/duration).