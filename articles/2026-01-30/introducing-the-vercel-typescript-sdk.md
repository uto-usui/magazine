---
title: "Introducing the Vercel TypeScript SDK"
source: "https://vercel.com/changelog/introducing-the-vercel-typescript-sdk"
publishedDate: "2024-12-09"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

1 min read

Dec 9, 2024

We’ve published a TypeScript-native SDK for working with the Vercel API.

Terminal

```
npm i @vercel/sdk
```

This SDK includes:

-   Full type safety for accessing the Vercel REST API with Zod schemas
    
-   New documentation for every function, argument, and type
    
-   Better tree-shaking support with optional standalone functions
    
-   Intuitive error handling and detailed error messages
    
-   Configurable retry strategies (including backoffs)
    

```
import { Vercel } from '@vercel/sdk';const vercel = new Vercel({  bearerToken: process.env.VERCEL_TOKEN,});const result = await vercel.deployments.getDeployment({  idOrUrl: 'dpl_89qyp1cskzkLrVicDaZoDbjyHuDJ'});
```

This SDK can be used to automate every part of Vercel’s platform including:

-   Deployment automation and management
    
-   Project creation and configuration
    
-   Domain management
    
-   Team and user administration
    
-   Environment variable management
    
-   Logs and monitoring
    
-   Integration configuration
    

[View the docs](https://vercel.com/docs/rest-api/sdk) or [explore the repo](https://github.com/vercel/sdk).