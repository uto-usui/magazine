---
title: "Simplified file retrieval from Vercel Sandbox environments"
source: "https://vercel.com/changelog/simplified-file-retrieval-from-vercel-sandbox-environments"
publishedDate: "2026-02-06"
category: "frontend"
feedName: "Vercel"
author: "Laurens Duijvesteijn"
---

1 min read

Feb 6, 2026

The [Vercel Sandbox SDK](https://www.npmjs.com/package/@vercel/sandbox) now includes two new methods that make file retrieval simple.

When you run code in a [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox), that code can generate files like a CSV report, a processed image, or a PDF invoice. These files are created inside isolated VMs, so they need to be retrieved across a network boundary. Until now, this required manual stream handling with custom piping.

### [Link to heading](#download-a-file)Download a file

If you want to download a generated report from your sandbox to your local machine, you can use `downloadFile()` to seamlessly stream the contents.

```
const dstPath = await sandbox.downloadFile(  { path: 'generated-file.csv', cwd: '/vercel/sandbox' },  { path: 'generated-file.csv', cwd: '/tmp' });
```

### [Link to heading](#read-file-contents-to-buffer)Read file contents to buffer

Both methods handle the underlying stream operations automatically. For example, if your sandbox runs a script that generates a chart as a PNG, you can pull it out with a single call to `readFileToBuffer()`, no manual stream wiring needed.

```
​const buffer = await sandbox.readFileToBuffer({ path: 'chart.png' });​
```

Learn more about the [Sandbox SDK](https://www.npmjs.com/package/@vercel/sandbox) or explore the updated [documentation](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox.downloadfile).