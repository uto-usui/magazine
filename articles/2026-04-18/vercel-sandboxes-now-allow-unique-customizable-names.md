---
title: "Vercel Sandboxes now allow unique, customizable names"
source: "https://vercel.com/changelog/vercel-sandboxes-now-allow-unique-customizable-names"
publishedDate: "2026-03-26"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

1 min read

Mar 26, 2026

[Vercel Sandboxes](https://vercel.com/docs/vercel-sandbox) created with the latest beta package will now have a unique, customizable name within your project, replacing the previous ID-based identification. Names make sandboxes easy to find and reference:

```
import { Sandbox } from '@vercel/sandbox';// Create a named sandboxconst sandbox = await Sandbox.create({ name: 'user-a-workspace' });await sandbox.runCommand('npm', ['install']);await sandbox.stop();// Later, resume where you left offconst sandbox = await Sandbox.get({ name: 'user-a-workspace' });await sandbox.runCommand('npm', ['run', 'dev']);
```

The beta CLI adds configuration management and session inspection:

```
  # Spin up a sandbox for a user  sandbox create --name user-alice  # User runs commands — if the sandbox timed out, it resumes automatically  sandbox run --name user-alice -- npm test  # Check what happened across sessions  sandbox sessions list user-alice
```

Named sandboxes are the mechanism for identifying [automatic persistence](https://vercel.com/changelog/vercel-sandbox-persistent-sandboxes-beta), which allows your session to be more easily identified for at both time of creation resumption.

Install the beta packages to try named sandboxes today: `pnpm install @vercel/sandbox@beta` for the SDK, and `pnpm install -g sandbox@beta` for the CLI.

Learn more in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/persistent-sandboxes).