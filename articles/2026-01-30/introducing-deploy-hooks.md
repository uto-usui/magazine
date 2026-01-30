---
title: "Introducing Deploy Hooks"
source: "https://vercel.com/blog/introducing-deploy-hooks"
publishedDate: "2019-07-30"
category: "frontend"
feedName: "Vercel"
author: "Javi Velasco"
---

2 min read

Jul 30, 2019

Trigger new deployments using any external event.

Thanks to our first-class [GitHub](https://zeit.co/github) and [GitLab](https://zeit.co/gitlab) Integrations, you can simply push your code to deploy with [Vercel](https://zeit.co/home). But what if you wanted to create a deployment not based on change of source code, but another external event, such as an update in CMS content?

Starting today, you can **deploy based on** **_any_** **event with Deploy Hooks.**

![An illustration of a Vercel Deploy Hook set on Contentful. The Deploy Hook ensures a build and deployment each time content is updated.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FH1KCy7NQXghHzEU971iL8%2Fba0fa922484b06b27cffcb7f921b0cc1%2Fmagnifying-glass-03.png&w=1920&q=75)

An illustration of a Vercel Deploy Hook set on Contentful. The Deploy Hook ensures a build and deployment each time content is updated.

## [Link to heading](#what-is-a-deploy-hook)What is a Deploy Hook?

A Deploy Hook is a URL that accepts POST requests to trigger deployments with Vercel.

Any platform that can make POST requests can trigger Deploy Hooks — this includes third-party services such as headless CMSes, cron utilities, and even your command line.

## [Link to heading](#static-example:-gatsby-+-contentful)Static Example: Gatsby + Contentful

In order to illustrate Deploy Hooks, we consider the popular pairing of a [Gatsby](https://gatsbyjs.org/)\-powered static site, backed by content on [Contentful](https://contentful.com/). Let's set it up so that the static site automatically builds and deploys each time content is updated.

**1\. Set up Boilerplate**

Luckily for us, the Contentful community already has a [Gatsby + Contentful](https://github.com/contentful-userland/gatsby-contentful-starter) boilerplate available.

```
gatsby new contentful-starter https://github.com/contentful-userland/gatsby-contentful-starter
```

The boilerplate is a beautiful and fast blog demo powered by Gatsby and Contentful.

**2\. Sign up for Contentful and Obtain Tokens**

Once signed up, we run the `setup` script highlighted on [Contentful](https://contentful.com/)'s onboarding page.

![`npm run setup` takes care of setting up the environment variables that Gatsby needs from Contentful.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3OVDMiLqgK4sfQBXz8Zrw8%2F9c98086f2570b2ca14099a38f103fc4e%2Fimage-02.png&w=1920&q=75)

\`npm run setup\` takes care of setting up the environment variables that Gatsby needs from Contentful.

Next, we set the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` [environment variables](https://zeit.co/docs/v2/build-step#using-environment-variables-and-secrets).

**4\. Create Deploy Hook and Specify on Contentful**

We want our Gatsby site to re-build and deploy whenever there is an update in Contentful. Therefore, we create a Deploy Hook pointing to the git `master` branch, and specify the Deploy Hook as a **webhook** within Contentful.

It's easy to create a Deploy Hook for any Vercel project — the [docs](https://zeit.co/docs/v2/advanced/deploy-hooks/) visually explain how.

![Once the webhook is created, our setup is complete.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1WRiPauiTuZDreD0r90BdY%2Fbf0059047bbbd8ca1619277f8c02562d%2Fadd-webhook.png&w=1920&q=75)

Once the webhook is created, our setup is complete.

## [Link to heading](#trying-it-out!)Trying it Out!

When we update content via Contentful, a new static Gatsby build is created. After a brief wait, our site is deployed and the updated content is live for us to see!

## [Link to heading](#reliability-and-robustness)Reliability and Robustness

In order to create a robust system, we have kept several checks in place:

-   **Automatically debounced builds**. You can POST to the Deploy Hook multiple times, and our systems will intelligently discard duplicate deployments.
    

-   **Straightforward revoking**. If you suspect that you may have accidentally leaked your Deploy Hook, you can easily swap the existing hook for a new one within your project settings.
    

-   **Clear timeline of deployment activity**. Under the [Events](https://zeit.co/dashboard/events) tab, you can clearly identify deployments created via hooks.
    

![The Events timeline clearly showcases all the deployments, including their sources.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7swmzM4otSXy0Ymrq5jqfn%2F7a942755f9d15a8062f9f18f3d64ecc5%2Fmagnifying-glass-02.png&w=1920&q=75)

The Events timeline clearly showcases all the deployments, including their sources.

## [Link to heading](#conclusion)Conclusion

With Deploy Hooks, you can now deploy based on _any_ event.

In this post, we explored how Deploy Hooks can help you **automatically re-build and deploy** a static site based on content updates.

How do you intend on using Deploy Hooks? Let us know via [Twitter](https://twitter.com/vercel) or [Chat](https://zeit.co/contact)!