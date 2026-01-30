---
title: "Default Production Domain"
source: "https://vercel.com/blog/default-production-domain"
publishedDate: "2019-10-31"
category: "frontend"
feedName: "Vercel"
author: "Andy Schneider"
---

1 min read

Oct 31, 2019

When creating a new project, it's important that the road to sharing a working production URL of your newly deployed code is as short as possible, with the least amount of friction.

With today's announcement, we're ensuring exactly that.

## [Link to heading](#new-default-domain)New Default Domain

By creating a new project, you will now automatically see a `vercel.app` domain with the name of your project and a random animal appear on your project's Domains tab.

For example, if your project is called **"my-site"**, your default production domain could look like this:

![The default production domain is automatically assigned to your deployments.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ac0Oy2g3KJkVWM6b7LLYT%2F85c7519d6389f5a972bcd21dc0eaf81d%2Fdomain-preview.png&w=1920&q=75)

The default production domain is automatically assigned to your deployments.

## [Link to heading](#deploying-to-production)Deploying to Production

In order to deploy to production, [push to your default branch](https://zeit.co/docs/v2/git-integration) with our Git integration or run `vercel --prod` with our [command-line interface](https://zeit.co/download).

The first deployment in every newly created project is automatically promoted to production.

## [Link to heading](#editing-your-domain)Editing Your Domain

Even if you don't like your default production domain, that's not a problem. Changing your production domain is now as easy as clicking **"Edit"** and entering a new one:

![You can edit the default production domain or add a custom domain.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4S6k9kwzf50uk0zJbjF0q6%2Ff9f657e297ee693735d39b187862fd95%2Fdomain-edit.png&w=1920&q=75)

You can edit the default production domain or add a custom domain.

## [Link to heading](#api-changes)API Changes

The endpoints for [creating a project](https://zeit.co/docs/api#endpoints/projects/create-a-project) and [ensuring a project exists](https://zeit.co/docs/api#endpoints/projects/ensure-a-project-exists) have been adjusted accordingly and will automatically provide you with a production domain.

To opt-in to this feature, you will need to use the latest version of the project endpoints.

## [Link to heading](#conclusion)Conclusion

With default production domains, you can [deploy to production](#deploying-to-production) without having to set up a [custom domain](https://zeit.co/docs/v2/custom-domains/) first.

This drastically decreases the time it takes for you to share a working version of your project.

[Let us know what you think](mailto:support@vercel.com) about this change!