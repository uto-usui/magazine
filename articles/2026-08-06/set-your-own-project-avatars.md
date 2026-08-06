---
title: "Set your own project avatars"
source: "https://vercel.com/changelog/project-avatars"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "z0oks"
---

You can now set a project's avatar from its settings in the Vercel dashboard. Until now, Vercel set it automatically, using the favicon from the project's production deployment. That's still the default if you haven't set one.

The avatar renders across the dashboard and on Vercel bot comments in GitHub. Microfrontend projects that share one favicon can now get distinct avatars, and backend projects with no favicon to detect can set one explicitly.

You can change a project's avatar from its [settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings&title=Go+to+Project+Settings) in the Vercel Dashboard, or upload one with the [REST API](https://vercel.com/docs/rest-api/projects/upload-a-project-avatar).