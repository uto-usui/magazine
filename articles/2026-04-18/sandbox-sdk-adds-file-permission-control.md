---
title: "Sandbox SDK adds file permission control"
source: "https://vercel.com/changelog/sandbox-sdk-file-permissions"
publishedDate: "2026-03-20"
category: "frontend"
feedName: "Vercel"
author: "Luke Phillips-Sheard"
---

1 min read

Mar 20, 2026

[Vercel Sandbox SDK](https://www.npmjs.com/package/@vercel/sandbox) `1.9.0` now supports setting file permissions directly when writing files.

By passing a `mode` property to the `writeFiles` API, you can define permissions in a single operation.

This eliminates the need for an additional `chmod` execution round-trip when creating executable scripts or managing access rights inside the sandbox.

```
sandbox.writeFiles([{  path: 'run.sh',  content: '#!/bin/bash\necho "ready"',  mode: 0o755}]);
```

See the [documentation](https://vercel.com/docs/vercel-sandbox/sdk-reference) to learn more.