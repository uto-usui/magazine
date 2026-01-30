---
title: "Manually create deployments by commit or branch in the dashboard"
source: "https://vercel.com/changelog/manually-create-deployments-by-commit-or-branch-in-the-dashboard"
publishedDate: "2023-12-19"
category: "frontend"
feedName: "Vercel"
author: "Felix Haus"
---

1 min read

Dec 19, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6os2OdlHd16jcRMTXzpQr7%2F1f9c1ef80b84f48395ae105374d11e66%2FCreate_New_Deployment.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5GYZHUQTBWF4IBSqVeSRUE%2Ffd9e7b856f6dafb2337e5c0291e00943%2FCreate_New_Deployment_Dark.png&w=1920&q=75)

You can now initiate new deployments directly from the dashboard using a git reference. This approach is helpful when git providers have service interruptions with webhook delivery.

To create a deployment from a git branch or SHA:

1.  From the dashboard, select the project you'd like to create a deployment for.
    
2.  Select the **Deployments** tab. Once on the Deployments page, select the **Create Deployment** button in the three dots to the right of the **Deployments** header.
    

Depending on how you would like to deploy, enter the following:

1.  **Targeted Deployments:** Provide the unique ID (SHA) of a commit to build a deployment based on that specific commit.
    
2.  **Branch-Based Deployments:** Provide the full name of a branch when you want to build the most recent changes from that specific branch.
    

Finally, select **Create Deployment** and Vercel will build and deploy your commit or branch.

When the same commit appears in multiple branches, Vercel will prompt you to choose the appropriate branch configuration. This choice is crucial as it affects settings like environment variables linked to each branch.

[Learn more](https://vercel.com/docs/deployments/git#creating-a-deployment-from-a-git-reference) in our documentation.