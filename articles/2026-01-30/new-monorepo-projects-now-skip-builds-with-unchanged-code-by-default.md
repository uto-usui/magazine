---
title: "New monorepo projects now skip builds with unchanged code by default"
source: "https://vercel.com/changelog/new-monorepo-projects-now-skip-builds-with-unchanged-code-by-default"
publishedDate: "2025-02-24"
category: "frontend"
feedName: "Vercel"
author: "Mitch Vostrez"
---

1 min read

Feb 24, 2025

![Skip deployments when there are no changes to the root directory and its dependencies](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52UObaUMn2IxfSoAcoY1Mt%2F1e5f793f2c51db36d5ffd72ef2ac4dbc%2FRoot_directory_-_Light.png&w=1920&q=75)![Skip deployments when there are no changes to the root directory and its dependencies](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3cL7T4DOJnLlyU7lc1pz5T%2Ffdb77db8fdcc9355a9f1d8117f6b0322%2FRoot_directory_-_Dark.png&w=1920&q=75)

Previously, we added [opt-in support for skipping builds with unchanged code in monorepos](https://vercel.com/changelog/automatically-skip-unnecessary-deployments-in-monorepos) to reduce build queueing.

This behavior is now the default for new projects. To [enable deployment skipping](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23root-directory&title=Disable+unaffected+project+skipping) in an existing project, visit the **Build and Deployment** settings for the project.

Additionally, this setting has been added to the [Vercel provider for Terraform](https://registry.terraform.io/providers/vercel/vercel/latest) in 2.10.0.

Learn more about [skipping deployments](https://vercel.com/docs/monorepos#skipping-unaffected-projects).