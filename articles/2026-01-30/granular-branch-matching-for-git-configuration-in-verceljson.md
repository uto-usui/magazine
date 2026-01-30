---
title: "Granular branch matching for Git configuration in vercel.json"
source: "https://vercel.com/changelog/granular-branch-matching-for-git-configuration-in-vercel-json"
publishedDate: "2025-02-25"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Feb 25, 2025

Vercel now supports glob patterns (like `testing-*`) in the `git.deploymentEnabled` field, giving you more control over branch deployments.

Previously, you could disable deployments for specific branches by explicitly naming them. Now, you can use patterns to match multiple branches at once.

For example, the configuration below prevents deployments on Vercel if the branch begins with `internal-`.

vercel.json

```
{  "git": {    "deploymentEnabled": {      "internal-*": false     }   }}
```

Learn more about [Git configuration](https://vercel.com/docs/projects/project-configuration/git-configuration#git-configuration).