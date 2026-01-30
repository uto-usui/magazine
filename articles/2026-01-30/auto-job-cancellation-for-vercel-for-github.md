---
title: "Auto Job Cancellation for Vercel for GitHub"
source: "https://vercel.com/blog/auto-job-cancellation-for-vercel-github"
publishedDate: "2018-11-15"
category: "frontend"
feedName: "Vercel"
author: "Arunoda Susiripala"
---

1 min read

Nov 15, 2018

When you connect your GitHub organization to Vercel, with [Vercel for GitHub](https://vercel.com/github), we build and deploy your app for each every Git push. We call such an event a `job`.

For a given branch, we process each job in a queue. If multiple jobs are waiting, we pick the latest one to build. Vercel for GitHub will always give you the deployment URL for the most recent commit.

## [Link to heading](#introducing-auto-job-cancellation)Introducing Auto Job Cancellation

As projects grow in size, builds tend to take longer. If you have regular commits coming in for these projects, one after another, the build time will add up and delay the deployment of the latest commit.

**From today, Vercel will always build the latest commit immediately.**

![Auto canceled job on the `master` Git Branch.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7K5qVrQMAWCFj8FFU0C8MQ%2Fc6223d1823c7bff95ef91383c8c2c0e1%2Fcommits.png&w=1920&q=75)

Auto canceled job on the \`master\` Git Branch.

While waiting for build job to complete, if Vercel receives a new job from the most recent commit, we cancel the current job and start building the latest job.

With this new behavior, you can always get the deployment URL for the latest changes right away.

![Auto canceled job on a Pull Request.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4pxOU9SXMyPo22LLkmM5PE%2F4372d32eea31b9996dea3b97894e620d%2Fpr.png&w=1920&q=75)

Auto canceled job on a Pull Request.

## [Link to heading](#opt-out-support)Opt-out support

We think auto job cancelation is a tremendous new default behavior **that will save you both time and money**.

However, if you want every push to build in sequence, Vercel provides an option to be added in a [`vercel.json` configuration file](https://zeit.co/docs/v2/deployments/configuration#github-autojobcancelation).

```
{  "github": {    "autoJobCancelation": false  }}
```

## [Link to heading](#conclusion)Conclusion

Our goal for Vercel is always to provide deployments for any project as quickly as possible. We believe that this new Vercel for GitHub behavior that extends a great method to receive deployments from your most recent changes is a great benefit to this goal.

If you have any questions or feedback, we would love to hear from you. Feel free to always [reach out to us](https://zeit.co/chat).