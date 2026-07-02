---
title: "Bring your Dockerfile to Vercel Functions"
source: "https://vercel.com/changelog/bring-your-dockerfile-to-vercel-functions"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Gal Schlezinger"
---

[Vercel Functions](https://vercel.com/docs/functions) now support deploying HTTP servers from a `Dockerfile` or `Containerfile`, using Open Container Initiative (OCI) compatible images on Fluid compute.

This makes it easier to bring existing applications written in any language to Vercel while keeping the preview deployments, logs, routing, and autoscaling benefits of using Vercel Functions and Fluid compute.

To use container images with your functions, create a project with a `Dockerfile.vercel` (or `Containerfile.vercel`) file that starts an HTTP server listening on `$PORT`:

Dockerfile.vercel

```
FROM golang:1.24-alpine AS buildWORKDIR /srcCOPY . .RUN go build -o /server main.goFROM alpine:3.20COPY --from=build /server /serverCMD ["/server"]
```

Build a container image on Vercel

This image will be built, pushed, and deployed on every commit to [Vercel Container Registry](https://vercel.com/docs/container-registry).

Learn more about using container images in the [docs](https://vercel.com/docs/functions/container-images).