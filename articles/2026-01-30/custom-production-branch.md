---
title: "Custom production branch"
source: "https://vercel.com/blog/custom-production-branch"
publishedDate: "2020-07-17"
category: "frontend"
feedName: "Vercel"
author: "Shu Ding"
---

2 min read

Jul 17, 2020

Up until now, after [creating a new Project](https://vercel.com/import) from a Git repository or one of our examples, all commits to its _default branch_ were being deployed to Production.

Today we are introducing a new default for newly created Projects, as well as an easy way to customize it from your Project Settings.

## [Link to heading](#new-production-branch-for-new-projects)New production branch for new projects

Instead of the Git repository's _default branch_, new Projects will now issue Production Deployments for the `main` branch.

If it doesn't exist, the `master` branch will be used ([more details](#a-note-on-the-master-branch)). And if that doesn't exist either, the Git repository's _default branch_ will be used.

Existing Projects are unaffected by this change.

## [Link to heading](#new-project-setting)New project setting

On the new **Production Branch** section under **Git Integration** in the Project Settings, you can now also select one of the following options:

-   The `main` branch.
    
-   The Git repository's _default branch_.
    
-   Any other custom branch of your choice.
    

![The default Production Branch configuration in the Project Settings.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FaVQTP69PLcO5Fa39gmbsR%2F1f61f859e59405124cf7395f42499b66%2Fproject-setting.png&w=1920&q=75)

The default Production Branch configuration in the Project Settings.

## [Link to heading](#a-note-on-the-master-branch)A note on the master branch

As you might have noticed, we left out `master` as an option you can select from the dropdown.

This is an intentional decision, in anticipation and agreement with Git providers like [GitHub](https://www.bbc.com/news/technology-53050955) moving away from terms that evoke prejudice and belong to the past.

For reasons of compatibility, creating a new Project from a Git repository that still uses `master` will automatically populate the `Custom` option. If you rename the branch in the future, you can easily change to `main` with just two clicks.

## [Link to heading](#conclusion)Conclusion

With this change, you gain the flexibility to configure your repository's _default branch_ for your Project's ongoing work. When you push to that branch, we will create Preview Deployments, and when you push to `main` we will create Production Deployments.

Furthermore, if you don't want to use `main`, you can now select any branch you want for your Production Deployments.

Check out the [documentation](https://vercel.com/docs/v2/git-integrations#production-branch) for more details and [let us know](https://twitter.com/vercel) what you think about this change.