---
title: "Deploys are now up to 33% faster for apps with many ISR pages"
source: "https://vercel.com/changelog/deploys-are-now-up-to-33-faster-for-apps-with-many-isr-pages"
publishedDate: "2026-08-04"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

Deploys are now up to 33% faster for apps using [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) (ISR). The more prerendered pages you have, the more you're likely to save.

ISR combines the speed of static generation with the flexibility of dynamic rendering, letting sites update content without full rebuilds. Every ISR page has routing metadata that ships alongside it. Previously, when that metadata grew too large, it split into a separate upload, adding work to every deploy. Now it always ships in a single upload. The same holds for other prerendered pages, including [Partial Prerendering](https://vercel.com/docs/partial-prerendering).

This applies automatically to every deploy, with no configuration needed. Learn more about [builds](https://vercel.com/docs/builds) in the documentation.