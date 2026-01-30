---
title: "Protect your Edge Config with a JSON schema"
source: "https://vercel.com/changelog/protect-your-edge-config-with-a-json-schema"
publishedDate: "2024-01-22"
category: "frontend"
feedName: "Vercel"
author: "Aaron Morris"
---

1 min read

Jan 22, 2024

![An Edge Config with a JSON schema attached, and the editor displaying a validation error.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F55azvl94SI9KfhUs3GmkP3%2F40eeac4b470b53fd5dc2396e5065d1a8%2FSchema_Protection_Light.png&w=1920&q=75)![An Edge Config with a JSON schema attached, and the editor displaying a validation error.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FBnBrhOW17TbeLJ53qc2mU%2Fcc8b755366b9a60cdb16068932c198f9%2FSchema_Protection_Dark.png&w=1920&q=75)

You can now protect your [Edge Config](https://vercel.com/docs/storage/edge-config) with a [JSON schema](https://json-schema.org/). Use schema protection to prevent unexpected updates that may cause bugs or downtime.

Edge Config is a low latency data store accessed from [Vercel Functions](https://vercel.com/docs/concepts/functions/serverless-functions) or [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware). It is ideal for storing experimentation data like feature flags and A/B testing cohorts, as well as configuration data for Middleware routing rules like redirects or blocklists.

To protect an Edge Config with a schema:

-   Select the **Storage** tab in the dashboard and then create or select your Edge Config
    
-   Toggle the **Schema** button to open the schema editing tab. Enter your JSON schema into the editor, and Vercel will use the schema to validate your data in real-time
    
-   Click **Save**. This will save changes to both the schema and data
    

Check out [the documentation](https://vercel.com/docs/storage/edge-config/edge-config-dashboard#schema-validation) to learn more.