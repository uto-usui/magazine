---
title: "Deployment integration actions for Marketplace integrations"
source: "https://vercel.com/changelog/deployment-integration-actions-for-marketplace-integrations"
publishedDate: "2025-02-19"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

1 min read

Feb 19, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56jr8V5AhkjYJPOgnYfSvp%2F0deae561f23f654054856934caf7f022%2FDeployment_Provisioning_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2horJW6n31lhVe7WqrtZWR%2Fcb3e251818e88657479a8bcd1c1ff342%2FDeployment_Provisioning_Dark.png&w=1920&q=75)

[Marketplace](https://vercel.com/marketplace) integration providers can now register integration actions for deployments, allowing for automated resource-side tasks such as database branching, environment variable overrides, and readiness checks.

When a user deploys a project that has connected Marketplace integration with configured actions, the deployment will pause and wait for all integration actions to complete successfully. This ensures that the deployed resources are properly set up before the deployment proceeds. Users will also receive helpful suggestions within the integration about which actions are available and should be executed.

Learn more about [integration actions](https://vercel.com/docs/integrations/create-integration/deployment-integration-action).