---
title: "Branch Domains"
source: "https://vercel.com/blog/branch-domains"
publishedDate: "2019-12-20"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Dec 20, 2019

Assign a stable domain to your Vercel branch deployments.

After editing your project, previewing your changes with Vercel is only a matter of pushing a Git commit using our [Git Integration](https://zeit.co/docs/v2/git-integration/), or by running a single command using our [command-line interface](https://zeit.co/download).

Every Deployment created in either way receives a unique URL, yet you still might want to apply a **Custom Domain for your Preview Deployments**. Today, we are making this possible with **Branch Domains.**

## [Link to heading](#a-new-domain-setting)A new domain setting

To apply a domain to a Git Branch of your choice, you first need to ensure that your project is linked to a Git repository on the project's overview page:

![Connect your project to a Git repository.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Np7PLqyWgZqnsfygh48NT%2Ff6a886a134ea28aa7cddf231c68c8fac%2Flinking-repositories.png&w=1920&q=75)

Connect your project to a Git repository.

Next, add a new domain and select a **Git Branch**:

![Select a Git Branch that you want to assign your Domain to.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6y0vZzfU2NOwi09j2R8G9M%2F87437ba56927dc507d9ea3cc99584e25%2Fdomain-git-branch-setting.png&w=1920&q=75)

Select a Git Branch that you want to assign your Domain to.

To complete the setup, save and push a new commit to the selected Git Branch.

Once you've done that, your domain will automatically point to the **most recent Deployment** created on that Git Branch. Congratulations!

Next time you push a new commit, your domain will be updated to reflect it.

## [Link to heading](#conclusion)Conclusion

By configuring a Custom Domain for your Preview Deployments through the **Git Branch** setting, you can now retain your preferred domain (and therefore your branding), even when sharing Preview Deployments with customers or colleagues.

Check out [our documentation](https://vercel.com/docs/v2/custom-domains/) to learn more about this feature.

All our work is inspired by feedback from people like yourself. For feature requests, or to suggest ideas to make our platform and your experience better, please reach out to us [via email](mailto:support@vercel.com) or on [Twitter](https://twitter.com/vercel).