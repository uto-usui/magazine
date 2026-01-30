---
title: "Reduced build times for large projects"
source: "https://vercel.com/changelog/reduced-build-times-for-large-projects"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "Vercel"
author: "Janos Szathmary"
---

1 min read

Jan 14, 2026

We shipped build system optimizations that reduce overhead for projects with many input files, large `node_modules`, or large build outputs.

Expensive disk operations (large file detection and folder size calculations) are no longer on the critical path for successful builds. These calculations now only run when a build fails, or when you enable the `VERCEL_BUILD_SYSTEM_REPORT` environment variable.

Builds complete 2.8 seconds faster on average, with larger builds seeing improvements of up to 12 seconds.

See the [builds documentation](https://vercel.com/docs/builds) for details.