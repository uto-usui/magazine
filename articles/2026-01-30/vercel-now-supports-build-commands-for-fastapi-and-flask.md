---
title: "Vercel now supports Build Commands for FastAPI and Flask"
source: "https://vercel.com/changelog/vercel-now-supports-build-commands-for-fastapi-and-flask"
publishedDate: "2025-11-17"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Nov 17, 2025

You can now can easily deploy FastAPI and Flask with custom Build Commands, expanding support for Python projects on Vercel.

In addition to defining a [Build Command](https://vercel.com/docs/builds/configure-a-build#build-command) in the project Settings dashboard, you can also define a `build` script in`[tool.vercel.scripts]`inside your `pyproject.toml`.

This script will run after dependencies are installed, but before your application is deployed.

pyproject.toml

```
[tool.vercel.scripts] build = "python build.py"
```

Learn more about the [Build Command](https://vercel.com/docs/frameworks/backend/fastapi#build-command) for Python projects.