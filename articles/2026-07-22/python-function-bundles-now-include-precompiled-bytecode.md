---
title: "Python function bundles now include precompiled bytecode"
source: "https://vercel.com/changelog/python-function-bundles-now-include-precompiled-bytecode"
publishedDate: "2026-07-21"
category: "frontend"
feedName: "Vercel"
author: "Greg Schofield"
---

Vercel now compiles Python functions to bytecode at build time. In our benchmarks, cold starts for the median-sized function dropped from **2.8s to 1.3s**.

When Python imports a module without cached bytecode, it parses and compiles the source before executing it. That compilation step adds startup time for functions with large dependency trees.

Vercel now compiles both application code and dependencies and includes the resulting `.pyc` files in the function bundle, so the interpreter skips compilation at startup.

Vercel automatically adds as much precompiled bytecode as fits in the function bundle. Functions near the size limit have little room left, so they see smaller gains. No code changes are required.

See the [Python documentation](https://vercel.com/docs/functions/runtimes/python) to learn more about Python support on Vercel.