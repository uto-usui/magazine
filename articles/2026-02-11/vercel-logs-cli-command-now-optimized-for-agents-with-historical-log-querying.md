---
title: "vercel logs CLI command now optimized for agents with historical log querying"
source: "https://vercel.com/changelog/vercel-logs-cli-command-now-optimized-for-agents-with-historical-log"
publishedDate: "2026-02-10"
category: "frontend"
feedName: "Vercel"
author: "Adrian Cooney"
---

1 min read

Feb 10, 2026

The `vercel logs` command has been rebuilt with more powerful querying capabilities, designed with agent workflows in mind. You can now query historical logs across your projects and filter by specific criteria, such as project, deploymentID, requestID, and arbitrary strings, to find exactly what you need.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4MwwE3Y4Q2Kq1favPcgTUF%2F3db1f259eb2515b439a5fdcdc6f36d4c%2Ftermsnap-light__4_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4U5vM5kRRWw8bD19hfI2ip%2F7ed3188f4f9490fc21065874e8d93641%2Ftermsnap-dark__3_.png&w=1920&q=75)

The updated command uses git context by default, automatically scoping logs to your current repository when run from a project directory. This makes it easy to debug issues during development without manually specifying project details.

Whether you're debugging a production issue or building automated monitoring workflows, the enhanced filtering gives you precise control over log retrieval across your Vercel projects.

[Learn about Vercel CLI and `vercel logs` command](https://vercel.com/docs/cli/logs).