---
title: "Sync projects with @vercel/related-projects"
source: "https://vercel.com/changelog/sync-projects-with-vercel-related-projects"
publishedDate: "2025-02-20"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Feb 20, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1WOcp76awvTmozJ53n5NvR%2Fbc9972e2de5fc2e33cd42fe557426745%2Fvercel-related-projects-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4HZl3Kx8KdXD90Y9eqkcjp%2F49acd6257a2f621f0c732dfc8ed2367e%2Fvercel-related-projects-dark.png&w=1920&q=75)

The new [`@vercel/related-projects`](https://www.npmjs.com/package/@vercel/related-projects) package helps sync deployment information across separate Vercel projects, ensuring your applications always reference the latest preview or production deployment URLs without manual updates or environment variable changes.

Previously, developers had to manually enter deployment URLs, manage connection strings, or use environment variables to keep the projects communicating effectively. Now, this data is automatically available and updated at both build and runtime.

For example, a monorepo containing:

-   A frontend Next.js project that fetches data from an API
    
-   An backend Express.js API project that serves the data
    

Related Projects can now ensure that each preview deployment of the frontend automatically references the corresponding preview deployment of the backend, avoiding the need for hardcoded values when testing changes that span both projects.

Related Projects are linked using a Vercel project ID. You can [find your project ID](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%23project-id&title=Find+your+Vercel+project+ID) in the project **Settings** page in the Vercel dashboard.

```
- const host =  process.env.API_URL as string+ const host = withRelatedProject({+     projectName: "api-project",+     defaultHost: process.env.API_URL as string,+ });
```

Example of connecting a frontend project to a separate backend API.

Learn more about [linking related projects](https://vercel.com/docs/monorepos#how-to-link-projects-together-in-a-monorepo).