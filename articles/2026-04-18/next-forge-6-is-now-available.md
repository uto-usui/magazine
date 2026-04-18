---
title: "next-forge 6 is now available"
source: "https://vercel.com/changelog/next-forge-6"
publishedDate: "2026-03-13"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Mar 13, 2026

[next-forge](https://www.next-forge.com/) is a production-grade Turborepo template for Next.js apps, designed to be a comprehensive, opinionated starting point for new apps.

This major release comes with a number of DX improvements, an agent skill, and new guides for quickstart, Docker, and migration paths.

**next-forge skill**

You can now install a next-forge skill into your preferred agent, giving it structured knowledge of next-forge architecture, packages, and common tasks.

```
npx skills add vercel/next-forge
```

**Bun by default**

The default package manager is now Bun. The CLI init script detects your current package manager before prompting, and pnpm, npm, and yarn are still supported through the init flow.

**Graceful degradation**

Every optional integration now silently degrades when its environment variables are missing, rather than throwing an error. Stripe, PostHog, BaseHub, and feature flags all return safe defaults. The only required environment variable to boot the project is `DATABASE_URL`.

**New guides**

The [quickstart guide](https://www.next-forge.com/docs/setup/quickstart) gets you to a running dev server in a few minutes with just Clerk and a Postgres database.

There is also a new [Docker deployment guide](https://www.next-forge.com/docs/deployment/docker) and migration guides are available for Appwrite (auth, database, storage), Convex (database), and Novu (notifications).

Read the [documentation](https://www.next-forge.com/docs) to get started.