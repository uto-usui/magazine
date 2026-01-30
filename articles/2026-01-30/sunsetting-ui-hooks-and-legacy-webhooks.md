---
title: "Sunsetting UI-Hooks and Legacy Webhooks"
source: "https://vercel.com/changelog/sunsetting-ui-hooks-and-legacy-webhooks"
publishedDate: "2021-08-20"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

1 min read

Aug 20, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3dOgmnD0ZB7UvSMhpWkpl9%2F5e92141a206a810e68e1d3281713dd05%2FDeprecation_of_UI-Hooks.png&w=1920&q=75)

As [previously mentioned](https://vercel.com/changelog/ui-hooks-for-integrations-will-be-deprecated) (on May 25th, 2021) Vercel will be removing UI Hooks for integrations.

UI Hooks have already become unavailable for newly created Integrations, but they will also be removed from all existing Integrations, meaning that:

-   Integrations with UI Hooks can't be installed anymore.
    
-   Integration UI Hooks will no longer be shown on the Dashboard.
    
-   The respective configuration field will be removed from the Integration Console.
    
-   The API endpoint 
    
    `/v1/integrations/configuration/:id/metadata`
    
     will become unavailable.
    

Furthermore, we also deprecated the manual webhook creation through our API. See our [previous announcement](https://vercel.com/changelog/integration-webhooks-are-now-easier-to-configure) about this change. This means that:

-   The API endpoint
    
    `/v1/integrations/webhooks`
    
    will become unavailable.
    
-   The API endpoint
    
    `/v1/integrations/webhooks/:id`
    
    will become unavailable.
    
-   `DELETE`
    
    requests to the configured generic Webhook URL will be not send anymore.
    

Check the [updated documentation](https://vercel.com/docs/integrations#upgrading-your-integration) to learn more about upgrading your Integration.