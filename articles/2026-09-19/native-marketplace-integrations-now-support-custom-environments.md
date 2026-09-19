---
title: "Native Marketplace integrations now support custom environments"
source: "https://vercel.com/changelog/custom-environments-support-for-marketplace-integrations"
publishedDate: "2026-09-17"
category: "frontend"
feedName: "Vercel"
author: "Tony Pan"
---

You can now connect native Marketplace resources to [custom environments](https://vercel.com/docs/deployments/environments#custom-environments). Previously, resource connections could only target production, preview, and development environments.

Choose custom environments when connecting a resource from the Vercel dashboard, Vercel CLI, or REST API. Vercel scopes the environment variables created by the connection to the selected environments.

For example, from the CLI:

```
vercel integration add neon --environment staging
```

Existing deployments do not change. Create a new deployment after connecting a resource or changing its environment scope.

Custom environments are available on Pro and Enterprise plans.

Read the [docs](https://vercel.com/docs/marketplace-storage#use-a-marketplace-resource-in-a-custom-environment) for connecting from the [dashboard](https://vercel.com/docs/integrations/install-an-integration/product-integration#projects), the [CLI](https://vercel.com/docs/cli/integration#vercel-integration-resource-connect) `--environment` flag, and the [REST API](https://vercel.com/docs/integrations/create-integration/marketplace-api#custom-environment-connections) `envVarEnvironments` field.