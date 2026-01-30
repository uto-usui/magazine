---
title: "Deploy Summary Integration"
source: "https://vercel.com/blog/deploy-summary"
publishedDate: "2019-09-03"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

2 min read

Sep 3, 2019

Deeply integrate your

Today, we're introducing [**Deploy Summary**](https://vercel.com/integrations/deploy-summary), a Vercel integration to augment your workflow with our [GitHub](https://vercel.com/github) and [GitLab](https://vercel.com/gitlab) integrations even further.

**Deploy Summary** analyzes your pull requests and merge requests, detects changed pages, and provides a detailed preview right next to your commits:

![An example of a preview added by Deploy Summary on a pull request.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FKNaoljkJ6SmFBnlXf9lJf%2F2a4bbcce6af2293783ef0a719176ef75%2Fdeploy-summary-example.png&w=1920&q=75)

An example of a preview added by Deploy Summary on a pull request.

These previews include:

-   **Screenshots** of the changed pages, to quickly take a glance at the contents of the PR.
    
-   **Direct links** to the changed pages, for a finer grained review.
    
-   The **URL** of the deployment.
    
-   The **commit SHA** of the deployed commit.
    

### [Link to heading](#persistent-urls)Persistent URLs

Since the **URL does not change if a new commit is pushed**, you only need to share it once with your team – they will see all future commits appear there.

This is especially useful if your project has a login system. In that case, you only need to log in once, because the domain (and therefore the session cookie) stay the same.

## [Link to heading](#get-started)Get started

To start using **Deploy Summary**, visit the [integration's page](https://vercel.com/integrations/deploy-summary) and click "Add":

![After clicking "Add", choose the account or the team where you would like to install Deploy Summary.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2e9Nogs1UMJDxUJwogAz7A%2Fd1c1127f5be80418172f61bef9d9b560%2Fadd-deploy-summary.png&w=1920&q=75)

After clicking "Add", choose the account or the team where you would like to install Deploy Summary.

Once the integration is installed on your personal account or one of your teams, if you have not already done so, you will be invited to connect your GitHub or GitLab account:

![If you haven't yet connected your GitHub/GitLab account, you will be asked to do so.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F25EOFT6mpx6y5ndMz4zqPf%2F4b457ac90a273b5266b4256969631f02%2Fconfigure-deploy-summary.png&w=1920&q=75)

If you haven't yet connected your GitHub/GitLab account, you will be asked to do so.

Next, create a new pull request ([GitHub](https://vercel.com/github)) or merge request ([GitLab](https://vercel.com/gitlab)) for your frontend (find the full list of supported frameworks [here](https://vercel.com/integrations/deploy-summary)).

Once your branch is deployed, the deployment will be analyzed and page changes will be detected. If one of your pages has changed, a preview show up:

![An example pull request with a preview provided by the Deploy Summary integration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F25QpreBW3XP7xySSzb4sy8%2Ffae1b3fa7af37c070740cb572b504fd1%2Fpr-deploy-summary.png&w=1920&q=75)

An example pull request with a preview provided by the Deploy Summary integration.

## [Link to heading](#conclusion)Conclusion

With [Deploy Summary](https://vercel.com/integrations/deploy-summary), you can now review pull or merge requests in a much faster way.

Aside from supporting [more frameworks](https://vercel.com/integrations/deploy-summary), we will also explore enhancing workflows even further: Imagine seeing Diff screenshots, lighthouse scores, or bundle sizes right on your pull or merge requests.

Anything unclear? [Drop us a message](https://twitter.com/vercel)[!](mailto:support@zeit.co)