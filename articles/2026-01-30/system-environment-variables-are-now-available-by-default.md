---
title: "System Environment Variables are now available by default"
source: "https://vercel.com/changelog/system-environment-variables-are-now-available-by-default"
publishedDate: "2020-11-20"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Nov 20, 2020

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1lb7Yo6ZOz5lIOI9x1ZQcf%2Fbd0d2786db9caf5ab73576f4739c85b9%2FSystem_Env_Vars_OG_Image.png&w=1920&q=75)

Previously, consuming values provided by the Vercel platform in your Environment Variables (like the URL of your Deployment) required adding System Environment Variables using the "Environment Variables" page in the Project Settings.

All new Projects created as of today, however, will automatically receive all System Environment Variables by default – without you having to expose them explicitly.

This setting can also be controlled from existing Projects, which means that you can easily opt into the new behavior for those as well.

Furthermore, the available System Environment Variables were revamped to have much more straightforward names and don't differentiate between Git providers anymore. For example, you can now use `VERCEL_GIT_COMMIT_REF` to retrieve the Git commit SHA for GitHub, GitLab and Bitbucket instead of having to use several different System Environment Variables for that.

Check out [the documentation](https://vercel.com/docs/environment-variables#system-environment-variables) as well.