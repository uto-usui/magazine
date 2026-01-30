---
title: "Sandbox now supports sudo and installing RPM packages"
source: "https://vercel.com/changelog/sandbox-now-supports-sudo-and-installing-rpm-packages"
publishedDate: "2025-07-04"
category: "frontend"
feedName: "Vercel"
author: "Laurens Duijvesteijn"
---

1 min read

Jul 4, 2025

You can now run commands with `sudo` inside [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox), giving you full control over runtime environment setup, just like on a traditional Linux system.

This makes it possible to install system dependencies at runtime, like Go, Python packages, or custom binaries, before executing your code.

`sudo` is available via the `runCommand` method:

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create();await sandbox.runCommand({  cmd: "dnf",  args: ["install", "-y", "golang"],  sudo: true,});
```

The sandbox `sudo` configuration is designed to be easy to use:

-   `PATH` is preserved
    
-   `HOME` is set to /root
    
-   Custom environment variables like `env: { FOO: "bar" }` are passed through
    

With `sudo` on Sandbox it's easier to run untrusted code in isolated environments with the right permissions, with no workarounds required.

Learn more about [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) and [sudo in the documentation](https://vercel.com/docs/vercel-sandbox#sudo-config).