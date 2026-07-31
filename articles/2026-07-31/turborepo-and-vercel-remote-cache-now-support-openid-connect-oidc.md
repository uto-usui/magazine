---
title: "Turborepo and Vercel Remote Cache now support OpenID Connect (OIDC)"
source: "https://vercel.com/changelog/turborepo-and-remote-cache-now-support-openid-connect-oidc"
publishedDate: "2026-07-30"
category: "frontend"
feedName: "Vercel"
author: "Mark Roberts"
---

You can now exchange OIDC tokens from CI/CD workflows, including [GitHub workflows](https://github.com/vercel/setup-turborepo-remote-cache-action), for short-lived [Turborepo](https://turborepo.dev/) access tokens.

These tokens grant access to [Vercel's Remote Cache](https://vercel.com/docs/monorepos/remote-caching), and are a more secure alternative to long-lived Personal Access Tokens (PATs). OIDC tokens are short-lived, only grant access to Vercel Remote Cache, and are associated with your Vercel team, rather than a specific team member.

We recommend all customers migrate their CI/CD workflows from PATs to OIDC.

Get started by adding a [Turborepo OIDC policy](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%3FaddOidcPolicy%3Dturborepo-cli&title=Add+a+Turborepo+CLI+OIDC+Policy) under Settings → Build and Deployment → [OIDC Policies for CLI Access](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%23oidc-cli-policies&title=OIDC+Policies+for+CLI+Access) and learn more in the [documentation](https://vercel.com/docs/monorepos/remote-caching/external-ci-cd#openid-connect-oidc).