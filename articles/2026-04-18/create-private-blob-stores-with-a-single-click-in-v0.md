---
title: "Create private blob stores with a single click in v0"
source: "https://vercel.com/changelog/create-private-blob-stores-with-a-single-click-in-v0"
publishedDate: "2026-03-05"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Mar 5, 2026

Teams can now create private and public blob stores with a single click in v0. When adding Vercel Blob to a chat, a dialog lets you select your preferred region and access type.

Private storage is selected by default and requires authentication to access sensitive files, while public storage allows direct reads for assets like media.

Once connected, the agent automatically understands your store's configuration. It writes the correct implementation for your choice, setting up authenticated delivery routes for private stores or direct URLs for public ones, without requiring you to write any code manually.

Learn more in the [Vercel Blob documentation](https://vercel.com/docs/vercel-blob).