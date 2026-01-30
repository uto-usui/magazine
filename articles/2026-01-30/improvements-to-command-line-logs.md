---
title: "Improvements to command line logs"
source: "https://vercel.com/changelog/improvements-to-command-line-logs"
publishedDate: "2024-07-24"
category: "frontend"
feedName: "Vercel"
author: "Damien Simonin Feugas"
---

1 min read

Jul 24, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FXNnQJn0m1ZADKC8dpyVUy%2F174aeec88d783d7fde5aa3beb3f5cf9f%2Fvc_logs_improvements_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2pp8fvlFP24ylTZJr9CSe8%2F37e548afacd61632e9af5938cd98e565%2Fvc_logs_improvements_-_Dark.png&w=1920&q=75)

Vercel CLI v35 introduces new commands to access of deployment and runtime logs:

-   `vercel deploy --logs` deploys and shows [build logs](https://vercel.com/docs/cli/deploy)
    
-   `vercel inspect --logs` shows [build logs](https://vercel.com/docs/cli/inspect) for an existing deployment
    
-   `vercel logs` now follows [runtime logs](https://vercel.com/docs/cli/logs) of an existing deployment
    

You can now use the `--json` option to stream logs as JSON. This makes it easier to parse and filter logs using tools like [jq](https://jqlang.github.io/jq/).

```
vercel logs --json | jq 'select(.level == "warning")'
```

Using the Vercel CLI with jq to filter for warning logs

To use these features, update to the latest version of the Vercel CLI:

```
pnpm add -g vercel
```

Install the Vercel CLI globally using the pnpm package manager.