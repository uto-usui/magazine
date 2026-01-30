---
title: "Claim Deployments now available for fast and secure deployment transfers"
source: "https://vercel.com/changelog/claim-deployments"
publishedDate: "2025-01-20"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

1 min read

Jan 20, 2025

![Claim Deployment - Dark](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FcvU5zFyZtV1U3r1VqT6ib%2F5e4827c6a26931ad83eaf840662dc48d%2FClaim_Deployment_-_Light__1_.jpg&w=1920&q=75)![Claim Deployment - Dark](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6KZTt7ixpSLMzVTh5dduiV%2F99834f3f9245d62ce332d6a1567446ff%2FClaim_Deployment_-_Dark__3_.jpg&w=1920&q=75)

[Multi-tenant platforms](https://vercel.com/solutions/multi-tenant-saas), like AI agents and visual building apps, can now easily transfer deployment ownership directly to users or teams.

**How it works:**

-   **Deployment creation:** Any third-party can create a new deployment [using the Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) or using the Vercel API: [POST /files](https://vercel.com/docs/rest-api/endpoints/deployments#upload-deployment-files) and [POST /deployments](https://vercel.com/docs/rest-api/endpoints/deployments#create-a-new-deployment)
    
-   **Initiate transfer:** The Vercel API endpoint is then used to generate a `claim-deployment` URL for that deployment.
    
-   **User confirms their team:** The user selects their Vercel team and completes the transfer.
    

[Check out our documentation](https://vercel.com/docs/deployments/claim-deployments) to learn more.