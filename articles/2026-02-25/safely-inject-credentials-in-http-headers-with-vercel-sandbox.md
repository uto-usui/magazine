---
title: "Safely inject credentials in HTTP headers with Vercel Sandbox"
source: "https://vercel.com/changelog/safely-inject-credentials-in-http-headers-with-vercel-sandbox"
publishedDate: "2026-02-23"
category: "frontend"
feedName: "Vercel"
author: "Valerian Roche"
---

2 min read

Feb 23, 2026

[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) can now automatically inject HTTP headers into outbound requests from sandboxed code. This keeps API keys and tokens safely outside the sandbox VM boundary, so apps running inside the sandbox can call authenticated services without ever accessing the credentials.  
  
Header injection is configured as part of the network policy using `transform`. When the sandbox makes an HTTPS request to a matching domain, the firewall adds or replaces the specified headers before forwarding the request.

```
const sandbox = await Sandbox.create({  timeout: 300_000,  networkPolicy: {    allow: {      "ai-gateway.vercel.sh": [{        transform: [{          headers: {            authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`          }        }],      }],    },  },});// Code inside the sandbox calls AI Gateway without knowing the API keyconst result = await sandbox.runCommand('curl',  ['-s', 'https://ai-gateway.vercel.sh/v1/models']);
```

This is designed for AI agent workflows where prompt injection is a real threat. Even if an agent is compromised, there's nothing to exfiltrate, as the credentials only exist in a layer outside the VM.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4SUlBNFbOPd6Fg4yYjtvTX%2F169053bc60352e177aa9fec0d03f864c%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6rhEaA1lT65wgF1P1crsAm%2Fecb4eff1b77b9aee499263fc953cad16%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6qn1lYXklMrnreEFoMkasA%2Fc0f208cb79529a0ef0f95ba8479cf8f6%2Fimage.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1eL59XrKWSQGhGg94tTZ1N%2Fa9fdc32cf9e4517f81f79eecec86edc3%2Fimage.png&w=1920&q=75)

Injection rules work with all egress network policy configurations, including open internet access. To allow general traffic while injecting credentials for specific services:

```
const sandbox = await Sandbox.create({  networkPolicy: {    allow: {      "ai-gateway.vercel.sh": [{        transform: [{          headers: {            Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`           }        }],      }],      "*.github.com": [{        transform: [{          headers: {            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`          }        }],      }],      // Allow traffic to all other domains.      "*": []    }  }});
```

### [Link to heading](#live-updates)Live updates

Like all network policy settings, injection rules can be updated on a running sandbox without restarting it. This enables multi-phase workflows, inject credentials during setup, then remove them before running untrusted code:

```
// Phase 1: Clone repos with credentialsawait sandbox.updateNetworkPolicy({  allow: {    "api.github.com": [{      transform: [{        headers: {          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`        }        }],    }],  }});// ... clone repos, download data ...// Phase 2: Lock down before running untrusted codeawait sandbox.updateNetworkPolicy('deny-all');
```

### [Link to heading](#key-highlights)Key highlights

-   Header overwrite: Injection applies to HTTP headers on outbound requests.
    
-   Full replacement: Injected headers overwrite any existing headers with the same name set by sandbox code, preventing the sandbox from substituting its own credentials.
    
-   Domain matching: Supports exact domains and wildcards (e.g., \*.github.com). Injection only triggers when the outbound request matches.
    
-   Works with all policies: Combine injection rules with `allow-all`, or domain-specific allow lists.  
    

Available to all Pro and Enterprise customers. Learn more in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/firewall#credentials-brokering).