---
title: "Dashboard redesign"
source: "https://vercel.com/blog/dashboard-redesign"
publishedDate: "2019-11-20"
category: "frontend"
feedName: "Vercel"
author: "Evil Rabbit"
---

3 min read

Nov 20, 2019

With the launch of [Zero Config Deployments](https://zeit.co/blog/zero-config), Vercel made it easier than ever to deploy websites and applications. Now, we're bringing the simplicity of our developer experience to our web dashboard.

Creating new projects, importing existing code, managing domains, setting up redirects, inspecting deployments and functions, and managing teams has never been easier.

We are unveiling the next evolution of the **Vercel Dashboard**.

![The new Vercel Dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1yEIHWymDtJ3dhUOGi89nL%2Fd82fe683bdb0e8531aecc0145d98fd9b%2Fdashboard-4_1.png&w=1920&q=75)

The new Vercel Dashboard.

## [Link to heading](#dashboard-overview)Dashboard Overview

This dashboard redesign is guided by invaluable feedback from our active customers. We want to make the most crucial project elements easily accessible to you:

-   Production and latest deployment status.
    
-   Project-level git repository connection.
    
-   Links to production deployments.
    

## [Link to heading](#easily-import-code)Easily Import Code

With our [GitHub](https://zeit.co/github) and [GitLab](https://zeit.co/gitlab) integrations, we now offer a streamlined approach to import and deploy projects with Vercel, directly from your dashboard. Once imported, your repository will be configured automatically so that you can push to deploy.

![Automatically deploy a template or repository to Vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1tcCsVeO0rwDL25hgrFr3Y%2Fc98771d60e74467839cc138a62abdf9c%2Fdropdown.gif&w=1920&q=75)

Automatically deploy a template or repository to Vercel

## [Link to heading](#projects)Projects

For a quick glimpse of your projects, we now provide screenshots of your latest production deployments.

![An overview of all your Vercel projects, accompanied with screenshots](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4BvkLIPzWFgSIAbnuSgdFA%2F7484e0bb14b9e56f13316849cc7a655b%2Fprojects-4_1.png&w=1920&q=75)

An overview of all your Vercel projects, accompanied with screenshots

## [Link to heading](#project-overview)Project Overview

We now highlight the two most important aspects of your projects: production deployment and preview deployments. Stay informed about your live production deployment, and see what your teammates are working on with a preview deployments list filtered by each member.

![An overview of your live production deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1SjAlpc3Hh8Fh83VKAWXCP%2F5c3e57083e44e5c8a9e2105b54b798d0%2Fproduction-3_1.png&w=1920&q=75)

An overview of your live production deployment.

![Preview Deployments from Git branches or deployed with Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6U4ovKBmAPLstQVI8Wq8rX%2F00fa95bfa90366d61ed1711adb6cb728%2Fpreview-4_1.png&w=1920&q=75)

Preview Deployments from Git branches or deployed with Vercel.

## [Link to heading](#deployment-overview)Deployment Overview

To help debug your projects, logs are now incorporated into the deployment overview. Logs can now be filtered by a specific serverless function or build output and copied to your clipboard in a single click.

If the deployment is made with our [GitHub](https://zeit.co/github) or [GitLab](https://zeit.co/gitlab) integrations, you will find relevant information about the git commit, author, branch, and repository.

![The overview provides meaningful information about an individual deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7x6D5sf0OlgYyDYfUYBNMD%2F27f11c2bd217c298fbff9977f3c381db%2Fdeployment-3_1.png&w=1920&q=75)

The overview provides meaningful information about an individual deployment.

## [Link to heading](#browser-tab-improvements)Browser Tab Improvements

Like us, you probably have a lot of tabs open while you work. For a quicker overview of your projects, the tab icons and titles of our dashboard pages now contain more useful information.

On the deployment inspector, the status of your deployment is now reflected in the tab icon as queued, building, error, or ready.

## [Link to heading](#git-integration-for-projects)Git Integration for Projects

It's now easier than ever to link a code repository to your Vercel projects. Once linked, you can enjoy automatic deployments with shareable URLs every time you push a commit or open a pull request.

![Select a repository from the project page to automatically deploy on every commit.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Mb09Mkd6HUhEmEm060Nbw%2F4cf3abaea31c9e39c35c0958c0a11977%2Fgit-3_1.png&w=1920&q=75)

Select a repository from the project page to automatically deploy on every commit.

## [Link to heading](#production-domains)Production Domains

As part of [Zero Config Deployments](https://zeit.co/blog/zero-config), you can now associate production domains with each of your projects in place of the `alias` field of `vercel.json`. This includes `.vercel.app` domains and any custom domains bought through [Vercel](https://zeit.co/domains) or external services.

![The interface guides you in setting up production domains for your project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1HbbIQqCopkxoM6XfgIols%2F9165f43d38dce25600140117c18ea112%2Fdomain-warning-3_1.png&w=1920&q=75)

The interface guides you in setting up production domains for your project.

![A valid production domain](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6UDe2ViTD374Ev8yiUBba1%2Fd021461eca36d0eb14ee9883f5d838ad%2Fdomain-ready-3_1.png&w=1920&q=75)

A valid production domain

## [Link to heading](#mobile)Mobile

With improvements to our development tooling and design system, we're ensuring that every part of our dashboard works well on both desktop and mobile so you can manage your deployments on the go.

![The Vercel Dashboard on mobile.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F25tkaF5qgg3yBUu4hz6m4z%2F1427d529ab3fd29454d76d158e0e2fe7%2Fmobile-3_1.png&w=1920&q=75)

The Vercel Dashboard on mobile.

## [Link to heading](#performance)Performance

We understand very well that any great user experience demands great performance.

For this redesign, we didn't just stop with UI improvements. We also invested heavily in enhancing the dashboard performance — decreasing the time to First Meaningful Paint by over 1.2s.

Here are a few steps we've taken to improve the performance of the Vercel Dashboard

-   [Preconnect](https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect) to our API, Assets, and Avatar origins.
    
-   Assign critical API calls higher [browser priority](https://developers.google.com/web/fundamentals/performance/resource-prioritization) to avoid blocking requests.
    
-   Memoize in our React components with the `useMemo` and `useCallback` hooks.
    
-   Adopt `ReactDOM.unstable_batchedUpdates` to reduce unnecessary re-renders by 20%.
    
-   Implement [SWR](https://github.com/zeit/swr) to efficiently update dashboard data in realtime.
    

## [Link to heading](#conclusion)Conclusion

With a focus on providing better interactions with your projects and deployments, our new dashboard delivers improved speed, better performance, and more useful features. This redesign includes:

-   Dashboard overview.
    
-   Project-level repository connection.
    
-   Code import from source control.
    
-   Production domains process.
    
-   Performance enhancements.
    

We would love to hear your thoughts on our new dashboard! If you'd like to share feedback, ask questions, or just say hi, you can reach out to us over [Twitter](https://twitter.com/vercel) or [Chat](https://zeit.co/chat).

A special thank you to [Ana Trajkovska](https://twitter.com/AnaTrajkovska_), [Arunoda Susiripala](https://twitter.com/arunoda), [Leo Lamprecht](https://twitter.com/notquiteleo), and [Timothy Lorimer](https://twitter.com/timothyis_) for helping with making this release a reality.