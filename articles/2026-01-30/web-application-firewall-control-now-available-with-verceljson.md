---
title: "Web Application Firewall control now available with vercel.json"
source: "https://vercel.com/changelog/web-application-firewall-control-now-available-with-vercel-json"
publishedDate: "2025-07-09"
category: "frontend"
feedName: "Vercel"
author: "Charlie Meyer"
---

1 min read

Jul 9, 2025

You can now control Vercel’s Web Application Firewall (WAF) actions directly in [`vercel.json`](https://vercel.com/docs/project-configuration), alongside existing support in the dashboard, API, and terraform.

This approach provides a structured way for both developers and agents to declaratively define and push rules to projects. Agents can use code-generating prompts to author new rules that are easily injected into the project’s `vercel.json.`

The `has` and `missing` matchers have also [been enhanced](https://vercel.com/docs/project-configuration#route-has-and-missing-object-definition) to support more expressive conditions across headers, rewrites, redirects, and routes. Matching options include:

-   String equality and inequality
    
-   Regular expressions
    
-   Prefixes and suffixes
    
-   Inclusion and exclusion from string arrays
    
-   Numeric comparisons
    

The following example shows how to deny a request that is prefixed by a specific header:

```
{  "$schema": "https://openapi.vercel.sh/vercel.json",  "routes": [    {      "src": "/(.*)",      "has": [        {          "type": "header",          "key": {            "pre": "x-bad-header-"          }        }      ],      "mitigate": {        "action": "deny"      }    }  ]}
```

Read more about [Vercel's WAF](https://vercel.com/docs/vercel-firewall/vercel-waf) and [configuring WAF rules in `vercel.json`](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules#configuration-in-vercel.json).