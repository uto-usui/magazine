---
title: "Deployment step now 10% faster"
source: "https://vercel.com/changelog/deployment-step-now-10-faster"
publishedDate: "2026-09-08"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

The deployment step is now about 10% faster, saving one second on average. Large applications can save up to 12 seconds.

Previously, Vercel uploaded a separate routing metadata file for each function path. That metadata is now combined into a single manifest and uploaded once.

This improvement applies automatically to all builds. No changes are required. Learn more about [builds](https://vercel.com/docs/builds) in the documentation.