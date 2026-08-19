---
title: "Vercel for Platforms can now deploy from your users' GitHub repositories"
source: "https://vercel.com/changelog/vercel-for-platforms-can-now-deploy-from-your-users-github-repositories"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Cody Wong"
---

Teams building on [Vercel for Platforms](https://vercel.com/docs/platforms) can now create deployments directly from their users' GitHub repositories, without requiring them to install the Vercel GitHub App. When [creating a deployment](https://vercel.com/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment), pass a `gitAccessToken` alongside `gitSource`. Vercel uses the token to retrieve the source and build the deployment.

Tokens should be read-only, scoped to the requested repository, and valid for 24 hours or less. Vercel temporarily stores the token in encrypted form so source retrieval can complete. The token is never stored on the deployment.

Learn more about [using a GitHub access token](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment#gitAccessToken).