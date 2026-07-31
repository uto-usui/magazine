---
title: "Project-scoped Tokens"
source: "https://vercel.com/changelog/project-scoped-tokens"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Dominic Sciascia"
---

You can now create [Vercel Access Tokens](https://vercel.com/docs/rest-api#authentication) that are limited to a project to authenticate and use the [Vercel API](https://vercel.com/docs/api).

A project-scoped token can only read and write resources belonging to a project that the token is scoped to. Requests to any other project, a user-level resource, or a team-level resource will be denied. This ensures jobs, tools, or workflows only ever access the projects they are scoped to.

### [Copy link to heading](#creating-a-project-scoped-token)Creating a project-scoped token

Navigate to the [Account Tokens page](https://vercel.com/account/tokens), found under the **Settings** area of your Account.

1.  Enter a descriptive token name
    
2.  **Open the Scope** **dropdown** and select the team that owns the project, then click the team to drill into its list of projects
    
3.  **Select the project** you want the token to be limited to
    
4.  **Choose an expiration** and **click Create**
    
5.  Make a note of the token created as it will not be shown again