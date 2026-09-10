---
title: "Protect production deployments for free on every plan"
source: "https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan"
publishedDate: "2026-09-09"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

[Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) can now protect all deployments in a project, including production, at no additional cost on every plan. Previously, protecting production domains required the $150-per-month Advanced Deployment Protection add-on.

When enabled, visitors must sign in with a Vercel account that has access to the project. This makes it useful for internal tools, private dashboards, and sites that aren’t yet ready to launch.

From your project, open **Security** in the sidebar, select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection&title=Deployment+Protection), then choose **All Deployments** from the dropdown.

You can also make this the [team default](https://vercel.com/docs/deployment-protection#how-team-default-settings-apply-to-new-projects), so every new project starts with Vercel Authentication enabled for all deployments.

With this change:

-   [Deployment Protection Exceptions](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions) are now free on every plan. Use an exception to make a specific preview domain public while keeping the rest of the project protected.
    
-   Pro teams can now enable [Password Protection](https://vercel.com/changelog/password-protection-now-costs-20-per-project-per-month-on-pro) for individual projects instead of purchasing it for the entire team.
    

Learn more in the [Deployment Protection](https://vercel.com/docs/deployment-protection) documentation.