---
title: "vlt is now available in builds via zero configuration"
source: "https://vercel.com/changelog/vlt-is-now-available-in-builds-via-zero-configuration"
publishedDate: "2025-08-08"
category: "frontend"
feedName: "Vercel"
author: "Luke Phillips-Sheard"
---

1 min read

Aug 8, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1bVWPGrnJnJFXhWA3MfCZ1%2F15c3f81493e9fc97e7227d80e3bf7652%2FLight.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7h0O8UGPG8Z0eyn2UX9XW3%2F3161be555d550d26dc6e525832a28429%2FDark.png&w=1920&q=75)

Vercel now supports the `vlt` package manager for builds with zero configuration in builds.

Starting today, Projects that contain a `vlt-lock.json` file will automatically run `vlt install` as the default [Install Command](https://vercel.com/docs/concepts/deployments/build-step#install-command) using `vlt`.

`vlt` requires node `20.x` to run and is only available in the modern [build image](https://vercel.com/docs/builds/build-image).

Learn more about [package manager support on Vercel](https://vercel.com/docs/package-managers#supported-package-managers).