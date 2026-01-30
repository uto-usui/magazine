---
title: "Improved support for pnpm, Corepack, and monorepos"
source: "https://vercel.com/changelog/improved-support-for-pnpm-corepack-and-monorepos"
publishedDate: "2024-10-30"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Oct 30, 2024

We've improved the experience of deploying projects using pnpm, Corepack, and Turborepo together.

Previously, combinations of these tools could result in unexpected behavior or complex build errors. Clear error and warning messages have been added, explaining how to fix problems when incompatibilities exist.

For example, a project with Corepack enabled, specifying `pnpm@9.0.0`, and a lockfile of version `6.0` would previously see the warning: `Ignoring not compatible lockfile`. Now, this is handled with a clearer error message: `Detected lockfile "6.0" which is not compatible with the intended corepack package manager "pnpm@9.0.0". Update your lockfile or change to a compatible corepack version.`

Additionally, each package previously had to define its own `packageManager`. The root `package.json#packageManager` is now detected in monorepo projects with [Corepack enabled](https://vercel.com/docs/deployments/configure-a-build#corepack) and applied to all packages.