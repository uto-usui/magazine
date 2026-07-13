---
title: "Traces now support Tree and Waterfall views"
source: "https://vercel.com/changelog/traces-now-support-tree-and-waterfall-views"
publishedDate: "2026-07-10"
category: "frontend"
feedName: "Vercel"
author: "z0oks"
---

[Traces in Vercel Logs](https://vercel.com/docs/tracing) now support Tree and Waterfall views. See span hierarchy, critical path, and timing without leaving the log entry.

The Tree view groups spans by parent and child. On load, spans are sorted by duration so the slowest appear first.

![View a trace as a Tree](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6RCEpEhUBdZpgAU67ALBRt%2Fdd784888a9c35d78d4d994b1e3eca331%2Fvercel.com_uncurated-tests_firewall-playground_logs_hasTraces_true_selectedLogId_kvxcn-1782401816695-20c7e7581c14_panelState.png&w=1920&q=75)![View a trace as a Tree](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FmnVvcmdnrFdgrCOlnJen1%2Fd6d542c475f720637d15d7782c2b2077%2Fvercel.com_uncurated-tests_firewall-playground_logs_hasTraces_true_selectedLogId_kvxcn-1782401816695-20c7e7581c14_panelState.png&w=1920&q=75)

View a trace as a Tree

The Waterfall view places every span on one chronological axis, showing what ran in parallel and where time was lost.

![View a trace as a Waterfall](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2OOFxHl4GuFLA0cNw758hJ%2F6b53f5315b4e1414eff9faf946918361%2Fvercel.com_uncurated-tests_firewall-playground_logs_hasTraces_true_selectedLogId_kvxcn-1782401816695-20c7e7581c14_panelState.png&w=1920&q=75)![View a trace as a Waterfall](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4gIqd3Qwewguz3jWqnONKf%2Ffaf877b5429e49e05845b5672c3df5f4%2Fvercel.com_uncurated-tests_firewall-playground_logs_hasTraces_true_selectedLogId_kvxcn-1782401816695-20c7e7581c14_panelState.png&w=1920&q=75)

View a trace as a Waterfall

Read the [Tracing documentation](https://vercel.com/docs/tracing) to learn more.