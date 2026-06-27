---
title: "Preserve local environment variables when linking with the Vercel CLI"
source: "https://vercel.com/changelog/preserve-local-environment-variables-when-linking-with-the-vercel-cli"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

The Vercel CLI now preserves your `.env.local` file when running `vercel link`. Previously, linking could overwrite variables already in the file. The CLI now updates `VERCEL_OIDC_TOKEN` if it exists, or appends it if missing, without touching anything else.

Run `pnpm i -g vercel@latest` to update, then run `vercel link` to get started. Learn more in the [vercel link documentation](https://vercel.com/docs/cli/link).