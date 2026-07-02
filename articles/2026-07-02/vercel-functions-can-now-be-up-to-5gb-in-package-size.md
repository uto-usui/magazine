---
title: "Vercel Functions can now be up to 5GB in package size"
source: "https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size"
publishedDate: "2026-06-29"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

[Vercel Functions](https://vercel.com/docs/functions) now support Node.js and Python deployments up to 5GB in package size on [Fluid compute](https://vercel.com/docs/fluid-compute), a 20x increase over the previous 250MB limit. Large Functions support is in [public beta](https://vercel.com/docs/release-phases#beta).

This makes Vercel compatible with backend workloads that do not fit within the 250MB limit, such as Python data and AI libraries, large generated clients, browser automation dependencies, image and video processing packages, and routes with substantial shared application code.

New projects are automatically enrolled in the beta. Existing projects can opt in by adding `VERCEL_SUPPORT_LARGE_FUNCTIONS=1` as an [Environment Variable](https://vercel.com/docs/environment-variables/managing-environment-variables), then redeploying, or you'll be asked to opt in if a Function ever crosses the 250MB limit. You can scope the variable to preview deployments first to test before enabling it in production.

Vercel still keeps Functions under 250MB in package size on the standard path. In eligible projects, only Functions that exceed the standard 250MB limit use the beta; other Functions in the same deployment are unchanged. The dashboard surfaces when a deployment is using Large Functions, so you always know exactly what's running.

Learn more in the [Vercel Functions limits documentation](https://vercel.com/docs/functions/limitations#large-functions-beta).

Large Functions require Fluid compute and are not currently supported with [Secure Compute](https://vercel.com/docs/networking/secure-compute) or [Static IPs](https://vercel.com/docs/networking/static-ips). Support for 10GB and larger Functions is coming soon.