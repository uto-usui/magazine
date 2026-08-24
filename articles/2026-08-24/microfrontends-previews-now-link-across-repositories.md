---
title: "Microfrontends previews now link across repositories"
source: "https://vercel.com/changelog/microfrontends-previews-now-link-across-repositories"
publishedDate: "2026-05-21"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

Microfrontends can now link Preview Deployments across repositories when their Git branch names match exactly.

In a monorepo, projects share the same Git repository, commits, and branches, so Vercel can automatically link their previews. Cross-repository projects have separate commit histories and branches in separate repositories. With this update, Vercel matches Git-connected projects by branch name and links their corresponding previews.

For example, when you preview the `new-checkout` branch of one project, requests to other projects in the Microfrontends group will use their `new-checkout` previews when available. This makes it easier to review coordinated changes across repositories in one preview experience.

This feature is enabled by default for new Microfrontends groups. You can manage it in your Microfrontends settings. Learn more about [how deployment routing works](https://vercel.com/docs/microfrontends/routing#how-deployment-routing-works) for Microfrontends.