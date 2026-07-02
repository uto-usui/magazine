---
title: "Introducing VCR: Vercel Container Registry"
source: "https://vercel.com/changelog/introducing-vcr-vercel-container-registry"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

You can now push, pull, and manage container images directly on Vercel.

Vercel Container Registry is an OCI-compliant image registry hosted on Vercel infrastructure. It works with standard workflows like `docker push`, `docker pull`, and `docker tag`, so there's nothing new to learn or tooling to migrate.

```
docker buildx build --push -t vcr.vercel.com/team/project/repository:tag .
```

A Vercel project can have unlimited repositories. You can create and manage them through the Vercel dashboard, or push directly to VCR, which creates the repository for you on the fly.

Operations use the same authorization controls as the rest of Vercel. You can authenticate with OIDC or an access token, provided the token has access to the project scope.

### [Link to heading](#optimized-for-fluid-compute)Optimized for Fluid Compute

When you push an image, VCR automatically optimizes it in the background for use in Sandboxes and Functions. VCR stores a precompiled snapshot and serves that snapshot when the image is requested. These snapshots use the same format as Sandbox Snapshots, which are [optimized to run on Fluid Compute](https://vercel.com/blog/optimizing-vercel-sandbox-snapshots).

### [Link to heading](#build-and-deploy-on-vercel)Build and deploy on Vercel

The Vercel build environment is automatically set up with authentication for the current project, so you can build and store images as part of the build and deploy process. You can also bring your Dockerfile to Vercel directly and host it with [Vercel Functions](https://vercel.com/changelog/bring-your-dockerfile-to-vercel-functions) or [Vercel Sandboxes](https://vercel.com/changelog/vercel-sandbox-now-support-custom-images).

Read more about VCR in the [documentation](https://vercel.com/docs/container-registry).