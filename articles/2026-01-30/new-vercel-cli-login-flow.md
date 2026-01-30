---
title: "New Vercel CLI login flow"
source: "https://vercel.com/changelog/new-vercel-cli-login-flow"
publishedDate: "2025-09-12"
category: "frontend"
feedName: "Vercel"
author: "Balázs Orbán"
---

1 min read

Sep 12, 2025

![Authorize Device Flow](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2yi28cjh2W0z67BIffKPLP%2F86a840a259a8a6604c0497c8c5cfe683%2Fimage__6_.png&w=1920&q=75)![Authorize Device Flow](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6ia35kSpbnQDXfxISMife4%2Facb06818a6c766f52f390e802c928a4a%2Fimage__5_.png&w=1920&q=75)

The `vercel login` command now uses the industry-standard [OAuth 2.0 Device Flow](https://datatracker.ietf.org/doc/html/rfc8628), making authentication more secure and intuitive. You can sign in from any browser-capable device.

When approving a login, be sure to verify the location, IP, and request time before granting access to your Vercel account.

Email-based login (`vercel login your@email.com`) and flags such as `--github`, `--gitlab`, `--bitbucket`, `--oob`, and `team` are deprecated. Beginning **February 1, 2026**, these methods will no longer be supported.

Upgrade today with `npm i vercel@latest`

Learn more in the [docs](https://vercel.com/docs/cli/login).