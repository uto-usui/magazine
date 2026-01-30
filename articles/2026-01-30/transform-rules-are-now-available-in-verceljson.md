---
title: "Transform rules are now available in vercel.json"
source: "https://vercel.com/changelog/transform-rules-are-now-available-in-vercel-json"
publishedDate: "2025-07-22"
category: "frontend"
feedName: "Vercel"
author: "Charlie Meyer"
---

1 min read

Jul 22, 2025

You can now define transform rules in [`vercel.json`](https://vercel.com/docs/project-configuration) to modify HTTP request and response headers or query parameters, without changing application code.

Unlimited transform rules are available for all customers, and let you:

-   Set, append, or delete request headers, response headers, and query parameters
    
-   Use conditional logic to apply changes based on request metadata
    
-   Match by equality, inequality, prefixes, suffixes, inclusion in string arrays, or numeric comparisons for fine-grained control
    

Explore the [interactive transform rules playground](https://transforms-demo.vercel.app/) to see how this feature works.

This expands the flexibility of Vercel's CDN, which already supports routing behavior like redirects and rewrites to external origins.

For example:

vercel.json

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "routes": [    {      "src": "/(.*)",      "dest": "https://my-secure-proxied-dashboard.com/$1"      "transforms": [        {          "type": "request.headers",          "op": "set",          "target": {            "key": "x-using-vercel-cdn"          },          "args": "secret-value"        }      ]    }  ]}
```

Refer to the [transform rules documentation](https://vercel.com/docs/project-configuration#transform-object-definition) for detailed examples.