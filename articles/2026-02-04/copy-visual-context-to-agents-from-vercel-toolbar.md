---
title: "Copy visual context to agents from Vercel Toolbar"
source: "https://vercel.com/changelog/copy-visual-context-to-agents"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "George Karagkiaouris"
---

1 min read

Feb 3, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2bLlCJow7FwIsjUHgGGw94%2F2054400164d6e53c992c96dcc6cbad6d%2Fimage__5_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1bkLGKmvI5mihw4m7ZsS5o%2F518e1454cb04e4b484a3adddf275e1ce%2Fimage__4_.png&w=1920&q=75)

Vercel Toolbar now includes "Copy for Agents" functionality that captures complete visual context from comments, providing coding agents with the technical details they need to understand deployment feedback across your application.

When teams copy comments using this feature, agents receive structured context including page URL and viewport dimensions, selected text and node path information, React component tree details, and the original comment text. This helps agents understand exactly where issues occur in your deployed application and what changes are needed.

**Sample context output:**

```
Page URL: /dashboard/projectsViewport: 1920x1080Selected Text: "Deploy your latest changes"Selector: button.deploy-btnComponent Tree: App > Dashboard > ProjectList > DeployButton
```

This structured format eliminates the need to manually explain deployment context to agents, enabling direct copying from the toolbar with complete technical details for component location and implementation.

The feature is available to all Vercel users immediately.

[Learn more about Vercel Toolbar](https://vercel.com/docs/workflow/vercel-toolbar) or [get started with Agents](https://vercel.com/ai).