---
title: "Vercel Security Dashboard is now generally available"
source: "https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available"
publishedDate: "2026-08-26"
category: "frontend"
feedName: "Vercel"
author: "Roman Olynyk"
---

The Vercel Security Dashboard is now generally available on all plans, giving you one place to see your security posture across every account and project.

You can access the Security Dashboard in [the UI](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity&) or run `vercel security check` in the Vercel CLI.

![See a complete list of security misconfigurations in your terminal.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ZgDXXhK3FBZcsHMpPyw02%2F84e107e7da59b68207fc439044891682%2FFrame_4.png&w=3840&q=95)![See a complete list of security misconfigurations in your terminal.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F72i2izngfvtCiVjdXtEks4%2Fbe41a86d08d22ea4777283e5ec0b0b6e%2FFrame_3.png&w=3840&q=95)

See a complete list of security misconfigurations in your terminal.

As teams grow and coding agents make it faster to spin up projects, small misconfigurations add up quietly. The Security Dashboard automatically flags issues like:

-   Team members without 2FA
    
-   Long-lived credentials that can be replaced with OIDC
    
-   Public preview deployments
    
-   Non-sensitive and stale environment variables
    

### [Copy link to heading](#the-security-dashboard-ui)The Security Dashboard UI

Misconfigurations are ordered by risk with the most severe first, and each finding links to the settings that fix them.

Findings that are just noise for your team can also be muted, and all results can be exported to a CSV file for triage or reporting.

### [Copy link to heading](#the-security-dashboard-cli)The Security Dashboard CLI

You can also run the same checks in your terminal through the [new Vercel CLI](https://vercel.com/docs/cli/security) `vercel security check` command, allowing your agents to work through the findings for you.

An agent using `vercel security check --findings` can read what failed, apply the fix and re-check to confirm. Fixes an agent can apply include:

-   Turning on Git fork protection
    
-   Marking an environment variable as sensitive
    
-   Replacing a static credential with OIDC federation
    

You can also scope the check to one project with `--project` when you want a narrow change set.

In CI or any other non-interactive environment, the command writes the report to stdout as JSON automatically, giving agents structured output without extra flags.

Get started by running your first scan from the [Security Dashboard](https://vercel.com/~/settings/security), and learn more in the [Security Dashboard documentation](https://vercel.com/docs/security/security-dashboard).