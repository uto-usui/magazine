---
title: "Workflow SDK now compresses run and step payloads"
source: "https://vercel.com/changelog/workflow-sdk-now-compresses-run-and-step-payloads"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Pranay Prakash"
---

The [Workflow SDK](https://workflow-sdk.dev/) 5 beta now compresses all run, hook, and step inputs and outputs with `zstd`.

Compression kicks in automatically, but only when it helps. Small payloads stay as-is, larger ones get compressed before they're persisted.

Compressed payloads use less storage and are faster to read and write, so your workflows run faster and cost less. The savings are largest for JSON payloads typical of AI conversations, where storage size and cost can drop by up to 85%.

_One typical Workflow, run and stored without compression (52 MB):_

_The same Workflow, run and stored with_ `_zstd_` _compression (10 MB):_

Since [eve](https://eve.dev/docs/introduction) builds durable agents on the Workflow SDK, the same compression now applies to the conversation history and state it persists for every session. That means eve agents store less and run faster, with no code to change.

Update to `workflow@5.0.0-beta.19` or later and learn more in the [documentation](https://workflow-sdk.dev/v5/docs/getting-started).