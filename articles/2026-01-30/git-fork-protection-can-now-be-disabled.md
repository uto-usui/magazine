---
title: "Git Fork Protection can now be disabled"
source: "https://vercel.com/changelog/git-fork-protection-can-now-be-disabled"
publishedDate: "2021-04-23"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Apr 23, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1kA24KNwvo4RkKJ5bAviJN%2Ff0653aab3c1018bb9d0ec2ab4a5cb826%2Fimage.png&w=1920&q=75)

If you receive a pull request from a fork of your Git repository that includes a change to the `vercel.json` file or the Project has Environment Variables configured, Vercel will require authorization from you or a member of your Team to deploy the pull request.

This behavior protects you from accidentally leaking sensitive Project information.

If you're certain your Environment Variables do not contain sensitive information, you can now disable **Git Fork Protection** by visiting the Security section of your Project Settings.

Check out [the documentation](https://vercel.com/docs/platform/projects#git-fork-protection) as well.