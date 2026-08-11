---
title: "Vercel Sandbox now runs on Vercel Managed Images"
source: "https://vercel.com/changelog/vercel-sandbox-managed-images"
publishedDate: "2026-08-10"
category: "frontend"
feedName: "Vercel"
author: "Andy Waller"
---

Today we are introducing Vercel Managed Images (VMI), a set of versioned, open-source base images you can use as-is or extend. The source for every image lives in the public [vercel/sandbox](https://github.com/vercel/sandbox) repository.

Managed images replace Sandbox runtimes, which are now deprecated. Starting with version 3 of the Sandbox SDK, new sandboxes default to `vercel/sandbox/universal:latest`. It ships with Node.js, Python, common coding agents and standard utilities, so most users never build a custom image or install packages at boot.

The universal image switches our default operating system from Amazon Linux to Ubuntu, a lighter and more widely used system across the industry.

### [Copy link to heading](#secure-by-default)Secure by default

Every managed image gets a nightly release. Rolling tags such as `latest` and the major-version tags pick up operating system and dependency updates automatically, including security patches and new releases of Node.js, Python, and the preinstalled coding agents.

Within each release, dependencies are pinned to specific versions wherever possible, so a given image version stays consistent.

If you need a fully immutable, reproducible environment, pin to an image digest (SHA). Digest-pinned images opt out of automatic updates.

### [Copy link to heading](#choose-a-managed-image-from-the-catalog)Choose a managed image from the catalog

Each managed image targets a different starting point:

-   `vercel/sandbox/universal:latest` is the new default, a rolling release on Ubuntu 26.04 with Node.js 24, Python 3.14 with `uv`, the `opencode`, `claude-code`, `codex`, and `pi` coding agents, and utilities including `git`, `vim`, `nano`, `tmux`, `ripgrep`, `jq`, and `fzf`.
    
-   `vercel/sandbox/node:22`, `node:24`, and `node:26` provide Node.js versions on Ubuntu 26.04.
    
-   `vercel/sandbox/python:3.14` provides Python on Ubuntu 26.04.
    
-   `vercel/sandbox/ubuntu:latest` provides base Ubuntu 26.04 with no extra tooling.
    
-   `vercel/sandbox/arch:latest` provides Arch Linux, regularly updated, with no Node.js or Python preinstalled. Its large package repository makes it useful for agents that install tools on the fly.
    

### [Copy link to heading](#reference-an-image-and-migrate-from-runtimes)Reference an image and migrate from runtimes

Sandboxes can use an image from any repository in your project, a repository which has been [shared with your team](https://vercel.com/changelog/share-vercel-container-registry-repositories-across-teams) or [any public repository](https://vercel.com/changelog/vercel-container-registry-repositories-can-now-be-made-public).

Images are addressed by their full path, `team-slug/project/repo:tag`, for example `vercel/sandbox/universal:latest`. The SDK types the `image` property so built-in images autocomplete while any string is still accepted. The previous `runtime` property is deprecated, not removed, so existing code keeps working.

Amazon Linux runtimes are not part of the managed image catalog, so teams that need AL2023 can stay on `runtime`. Managed images run as the default `ubuntu` or `arch` user with passwordless sudo, rather than the `vercel-sandbox` user.

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  image: 'vercel/sandbox/python:3.14',});
```

Open an issue or a pull request to improve them, and read the [Vercel Sandbox images documentation](https://vercel.com/docs/vercel-sandbox/concepts/images) to get started.