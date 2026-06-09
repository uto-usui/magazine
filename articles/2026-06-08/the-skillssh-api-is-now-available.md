---
title: "The skills.sh API is now available"
source: "https://vercel.com/changelog/the-skills-sh-api-is-now-available"
publishedDate: "2026-06-05"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

1 min read

Jun 5, 2026

The [skills.sh](https://skills.sh/) API is now available. Authenticate with your project's [Vercel OIDC token](https://vercel.com/docs/oidc) and start querying more than 600,000 skills from across the open-source ecosystem.

Search for skills, pull detailed info on any one, check its security audit, and more.

Vercel issues a short-lived token scoped to your team and project, rotated automatically, so there's no long-lived secret to leak or rotate. On each request, skills.sh verifies the token and applies a rate limit of 600 requests per minute per team and project.

fetch-skills.ts

```
import { getVercelOidcToken } from '@vercel/oidc';const token = await getVercelOidcToken();const res = await fetch('https://skills.sh/api/v1/skills?per_page=10', {  headers: { Authorization: `Bearer ${token}` },});
```

Fetch skills with your project's Vercel OIDC token

Read the [skills.sh API documentation](https://skills.sh/docs/api) to get started.