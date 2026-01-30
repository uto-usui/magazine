---
title: "Lockfile-aware deployment skipping for monorepos"
source: "https://vercel.com/changelog/lockfile-aware-deployment-skipping-for-monorepos"
publishedDate: "2025-03-20"
category: "frontend"
feedName: "Vercel"
author: "Dimitri Mitropoulos"
---

1 min read

Mar 20, 2025

![Skip deployments when there are no changes to the root directory and its dependencies](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52UObaUMn2IxfSoAcoY1Mt%2F1e5f793f2c51db36d5ffd72ef2ac4dbc%2FRoot_directory_-_Light.png&w=1920&q=75)![Skip deployments when there are no changes to the root directory and its dependencies](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3cL7T4DOJnLlyU7lc1pz5T%2Ffdb77db8fdcc9355a9f1d8117f6b0322%2FRoot_directory_-_Dark.png&w=1920&q=75)

Vercel now maps dependencies in your package manager’s lockfile to applications in your monorepo. Deployments only occur for applications using updated dependencies.

This feature is based on Turborepo's lockfile analysis, supporting the package managers listed as stable in [Turborepo's Support Policy](https://turbo.build/repo/docs/getting-started/support-policy#package-managers).

Previously, any change to the lockfile would redeploy all applications in the monorepo since it was treated as a shared input. Now, Vercel inspects the lockfile’s contents to determine which applications have dependency changes, further reducing potential queue times.

Learn more about [skipping unaffected projects in monorepos](https://vercel.com/docs/monorepos#skipping-unaffected-projects).