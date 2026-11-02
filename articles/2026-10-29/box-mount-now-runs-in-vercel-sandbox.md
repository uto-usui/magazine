---
title: "Box Mount now runs in Vercel Sandbox"
source: "https://vercel.com/changelog/box-mount-now-runs-in-vercel-sandbox"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Vercel"
author: "Elisabeth Rülke"
---

Box Mount lets agents running in Vercel Sandbox read and write Box files through standard filesystem operations. It syncs a Box folder with a directory inside the sandbox. Unmount before you stop the sandbox, and everything the agent wrote is in Box after the sandbox is deleted.

The contract-review example uses AI Gateway to review a synthetic contract in Vercel Sandbox and save the review back to Box. The sync process and agent run as separate sandbox users, keeping the Box credentials separate from the agent's workspace.

Box Mount is in private preview. Request access from Box, then follow the [Box Mount documentation](https://vercel.com/docs/sandbox/ecosystem/box-mount) to set it up in Vercel Sandbox.