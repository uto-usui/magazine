---
title: "Run Docker containers inside Vercel Sandbox"
source: "https://vercel.com/changelog/run-docker-containers-inside-vercel-sandbox"
publishedDate: "2026-05-29"
category: "frontend"
feedName: "Vercel"
author: "Brandon Tuttle"
---

1 min read

May 29, 2026

[Vercel Sandbox](https://vercel.com/docs/sandbox) now supports installing and running Docker inside a sandbox. An agent can build containers, install system packages, and modify files without touching your host system.

Install Docker, start the daemon, and serve a containerized application:

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create();await sandbox.runCommand({  sudo: true,    cmd: "dnf",    args: ["install", "-y", "docker"]});// Start docker daemon and wait for it to be readyawait sandbox.runCommand({ sudo: true, cmd: "dockerd", detached: true });await sandbox.runCommand({  cmd: "sh",   args: [ "-lc",  "until sudo docker info >/dev/null 2>&1; do sleep 1; done"] });await sandbox.runCommand({  cmd: "docker",    args: [    "run", "--rm", "-d",    "--name", "redis",    "redis:alpine"    ]});await sandbox.runCommand({  cmd: "docker",    args: ["exec", "redis", "redis-cli", "PING" ]});
```

Docker in a Sandbox is useful for running containerized services like Redis or Postgres as test dependencies, validating container images before deploying, or previewing applications served from a container. Combined with [persistent sandboxes](https://vercel.com/changelog/sandbox-persistence-is-now-ga), the Docker installation and pulled images carry over between sessions.

As well as adding support for Docker, sandboxes now support FUSE filesystem drivers and VPN clients, unlocking unlimited capabilities to what can be built.

Learn more about these new system specifications in the [documentation](https://vercel.com/docs/sandbox/system-specifications#system-privileged-processes).