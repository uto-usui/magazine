---
title: "Automatic persistence now in beta on Vercel Sandbox"
source: "https://vercel.com/changelog/vercel-sandbox-persistent-sandboxes-beta"
publishedDate: "2026-03-26"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

2 min read

Mar 26, 2026

[Vercel Sandboxes](https://vercel.com/docs/vercel-sandbox) can now automatically save their filesystem state when stopped and restore it when resumed. This removes the need for manual snapshots, making it easier to run long-running, durable sandboxes that continue where you left off.

### [Link to heading](#how-it-works)How it works

A **sandbox** is the durable identity, now identified [by a name](https://vercel.com/changelog/vercel-sandboxes-now-allow-unique-customizable-names), its filesystem state, and configuration options. A **session** is the compute tied to that state, invoked as needed.

**Automatic persistence** introduces orchestration that separates storage from compute, reducing the need for manual snapshotting, so:

-   when you stop a sandbox, the session shuts down but the filesystem is automatically snapshotted.
    
-   when you resume, a new session boots from that snapshot. This state storage is not charged, so you pay when your setting is active.
    

```
import { Sandbox } from '@vercel/sandbox';// Create a named sandboxconst sandbox = await Sandbox.create({ name: 'user-a-workspace' });await sandbox.runCommand('npm', ['install']);await sandbox.stop();// Later, resume where you left offconst sandbox = await Sandbox.get({ name: 'user-a-workspace' });await sandbox.runCommand('npm', ['run', 'dev']);
```

Persistence is enabled by default in the beta SDK, can be disabled between sessions with `persistent: false`. When disabled, the sandbox still exists after being stopped and can be resumed by its name, but each session starts with a clean filesystem.

If a sandbox is stopped and you run a command, the SDK will transparently create a new session, so you don't need to check state or manually restart

```
const sandbox = await Sandbox.create({ name: "long-lived-sandbox" });await sandbox.writeFiles([{  path: "run.sh",  content: Buffer.from('#!/bin/bash\necho "Hello!"'),  mode: 0o755,}]);// Days laterconst resumedSandbox = await Sandbox.get({ name: "long-lived-sandbox" });console.log(resumedSandbox.status); // stopped automaticallyawait resumedSandbox.runCommand("./run.sh"); // logs "Hello!"console.log(resumedSandbox.status); // running
```

The beta SDK adds methods for managing sandboxes over their lifetime:

```
const sandbox = await Sandbox.get({ name: 'user-alice' });// Scale up resources on a running sandboxawait sandbox.update({ resources: { vcpus: 4 } });// Inspect session history and snapshotsconst { sessions } = await sandbox.listSessions();const { snapshots } = await sandbox.listSnapshots();// Search across sandboxesconst { sandboxes } = await Sandbox.list({  namePrefix: 'user-',  sortBy: 'name',});// Permanently remove a sandbox and all its dataawait sandbox.delete();
```

The beta CLI adds configuration management and session inspection:

```
  # Spin up a sandbox for a user  sandbox create --name user-alice  # User runs commands — if the sandbox timed out, it resumes automatically  sandbox run --name user-alice -- npm test  # Check what happened across sessions  sandbox sessions list user-alice  # Tune resources without recreating  sandbox config vcpus user-alice 4  sandbox config timeout user-alice 5h
```

This feature is in beta and requires upgrading to the beta [SDK](https://www.npmjs.com/package/@vercel/sandbox) and [CLI](https://www.npmjs.com/package/sandbox) packages.

Install the beta packages to try persistent sandboxes today: `pnpm install @vercel/sandbox@beta` for the SDK, and `pnpm install -g sandbox@beta` for the CLI.

Persistent sandboxes are available in beta on all plans.

Learn more in the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/persistent-sandboxes).