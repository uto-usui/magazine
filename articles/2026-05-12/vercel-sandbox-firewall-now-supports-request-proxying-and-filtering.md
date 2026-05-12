---
title: "Vercel Sandbox firewall now supports request proxying and filtering"
source: "https://vercel.com/changelog/vercel-sandbox-firewall-now-supports-request-proxying-and-filtering"
publishedDate: "2026-05-11"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

May 11, 2026

The [Vercel Sandbox firewall](https://vercel.com/docs/vercel-sandbox/concepts/firewall) now supports forwarding specific HTTP requests to a proxy you control. You can also use matchers to filter forwarding and credentials brokering to only the requests that need it.

### [Link to heading](#requests-proxying)Requests proxying

You can now route outbound sandbox traffic through your own proxy for logging, debugging, or transforming requests and responses. Set a `forwardURL` on any allowed domain, and the firewall will forward matching HTTPS requests to your server.

The proxy receives the original request along with additional headers to identify the source:

-   `vercel-forwarded-host`: The original request's SNI
    
-   `vercel-forwarded-scheme`: The original request's scheme
    
-   `vercel-forwarded-port`: The original request's port
    
-   `vercel-sandbox-oidc-token`: A Vercel-issued OIDC token that the proxy can use to authenticate the request and identity the source team / project / sandbox. Learn more about it in the [docs](https://vercel.com/docs/vercel-sandbox/concepts/firewall#requests-proxying)
    

```
import { Sandbox } from '@vercel/sandbox';// Sandbox has access to everything, with a proxy for requests towards github.comconst sandbox = await Sandbox.create({  networkPolicy: {    allow: {      "github.com": [{        forwardURL: "https://my-custom-proxy.vercel.app/api/proxy"      }],      // Allow traffic to all other domains. If unset only defined ones are reachable.      "*": []    }  }});
```

### [Link to heading](#filtering)Filtering

Additionally, you can now use matchers to filter request forwarding or [credentials brokering](https://vercel.com/docs/vercel-sandbox/concepts/firewall#credentials-brokering) to requests matching a specific path, method, query string, or headers. This gives you fine-grained control over which requests get transformed; for example, only forwarding `POST` requests to a specific API path while allowing all other traffic through untouched.

```
import { Sandbox } from '@vercel/sandbox';// Sandbox has access to everything, with a proxy for requests towards POST github.com/api/*// Other requests to github.com are allowed and not proxiedconst sandbox = await Sandbox.create({  networkPolicy: {    allow: {      "api.github.com": [{        match: {          path: { startsWith: "/v1" },          method: ["POST"]        },        forwardURL: "https://my-custom-proxy.vercel.app/api/proxy"      }],      // Allow traffic to all other domains. If unset only defined ones are reachable.      "*": []    }  }});
```

These features are available in beta for Pro and Enterprise plans. Get started by installing the `@vercel/sandbox@beta` SDK, and learn more in the docs about [requests proxying](https://vercel.com/docs/vercel-sandbox/concepts/firewall#requests-proxying) and [matchers](https://vercel.com/docs/vercel-sandbox/concepts/firewall#matchers).