---
title: "Introducing the Deploy Button"
source: "https://vercel.com/blog/deploy-button"
publishedDate: "2019-11-18"
category: "frontend"
feedName: "Vercel"
author: "Shu Ding"
---

1 min read

Nov 18, 2019

Share your custom templates as one-click deployments.

As the author of an open source project or framework, one of your key focuses is making it as easy as possible for users to get started with your creation.

With the help of today's feature release, you can now reduce this entire process down to the click of a single button: The Vercel Deploy Button.

## [Link to heading](#what's-new)What's new

To offer your users an easy way to deploy your code to production (and keep updating it afterward), you can now [create your own Deploy Button](https://vercel.com/docs/more/deploy-button).

After clicking "Deploy", you will be asked to confirm the destination and project name, under which a [Next.js](https://zeit.co/solutions/nextjs) template from the [Next.js examples list](https://github.com/zeit/next.js/tree/canary/examples/hello-world) will be forked and deployed.

![The interface for selecting the destination of your deployment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6FwBkTJpkOvPLfmcHTNOKK%2F9bceb9f0f365acbbd728c4d7b6954d47%2Fdestination.png&w=1920&q=75)

The interface for selecting the destination of your deployment.

## [Link to heading](#creating-git-repositories)Creating Git repositories

You might also want to create a GitHub or GitLab repository. To accomplish this, you only need to select the "Create Git repository" option on the Deploy button flow.

![The interface for creating a Git repository for your new project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ngQoVYpUnJ5ZnVc7UIhyl%2Fa7e1ba5a6615d0fb094798804b2c5af9%2Fgit.png&w=1920&q=75)

The interface for creating a Git repository for your new project.

We will automatically create the Git repository for you, once you click deploy, and push the source files of your freshly created deployment.

## [Link to heading](#get-your-own)Get your own

Using the button for your own project is as easy as copying our default markdown snippet and replacing the URL of the Git repository:

```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/zeit/now-examples/tree/master/nextjs)
```

A button that deploys the \`nextjs\` directory of the zeit/now-examples repository.

For an example written in HTML, make sure to check out the feature's [documentation](https://zeit.co/docs/v2/more/deploy-button/).

## [Link to heading](#conclusion)Conclusion

Our Deploy Button lets your users easily deploy your code to Vercel.

It is ideal for scenarios where customers have not interacted with our platform before, but works just as well if they already have an account.

With this release, we hope to empower open source maintainers and enable faster deployment workflows for the people enjoying their creations.

[Let us know what you think](mailto:support@vercel.com) about this change!