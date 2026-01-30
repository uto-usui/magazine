---
title: "Preview links between microfrontends projects now serve all paths"
source: "https://vercel.com/changelog/preview-links-between-microfrontends-projects-now-serve-all-paths"
publishedDate: "2025-10-21"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

1 min read

Oct 21, 2025

Teams using [microfrontends](https://vercel.com/docs/microfrontends) can now visit all routes from any domain in the microfrontends group, enabling teams to test their full site experience without broken links or missing pages.

Previously, the microfrontend group's root domain would be the only one to serve the paths hosted by child microfrontends. Now, preview links between all microfrontends projects automatically serve all routes in the group.

With this new feature:

-   Preview links on child microfrontends now route paths to other microfrontends in the group, eliminating 404s.
    
-   Deployments built from the same commit or branch automatically link to each other, making it easier to test changes in monorepos.
    
-   [Fallback routing](https://vercel.com/docs/microfrontends/managing-microfrontends#fallback-environment) ensures that requests to microfrontends not built on the same branch are still resolved.
    

This feature is enabled by default for all new microfrontends, and will be rolling out slowly for existing teams.

[Learn more](https://vercel.com/docs/microfrontends/path-routing#microfrontends-domain-routing) or [get started with microfrontends](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fmicrofrontends) today.