---
title: "Experimental native binaries for Vercel CLI"
source: "https://vercel.com/changelog/experimental-native-binaries-for-vercel-cli"
publishedDate: "2026-05-27"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

1 min read

May 27, 2026

The [Vercel CLI](https://vercel.com/docs/cli) now ships an optional experimental native binary that starts faster, is even more secure, and requires no Node.js runtime dependency.

Binaries are code-signed, allowing your OS to verify that they came from Vercel and haven't been modified. Additionally, on macOS, credentials are stored in the system Keychain scoped to the binary, so other processes cannot access them without explicit permission.

You can opt in by installing the experimental package:

```
pnpm i -g @vercel/vc-native -f
```

The `-f` flag is required because `@vercel/vc-native` installs the same global `vercel` and `vc` bin names as the standard CLI. Once installed, `vercel` and `vc` run the native binary across macOS, Linux, and Windows on x64 and arm64.

Let us know what you think on [GitHub](https://github.com/vercel/vercel/issues).