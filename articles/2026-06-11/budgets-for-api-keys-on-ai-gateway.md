---
title: "Budgets for API keys on AI Gateway"
source: "https://vercel.com/changelog/budgets-for-api-keys-on-ai-gateway"
publishedDate: "2026-06-09"
category: "frontend"
feedName: "Vercel"
author: "Mark Roberts"
---

2 min read

Jun 9, 2026

AI costs are getting harder to forecast. As teams lean more on coding agents and other token-heavy workflows, a key can burn cost faster than anyone notices:

-   Autonomous workflows that can loop or fan out without supervision
    
-   Demos and prototypes that could catch unexpected traffic if shared or shipped
    
-   Developers exploring or experimenting without a sense of per-model cost
    

Set a spend cap on any key, and [AI Gateway](https://vercel.com/ai-gateway) rejects further requests on that key once the limit is exceeded, until the budget resets or you raise it. The cap applies to all AI Gateway providers and models running through the key, making it easier to consolidate and govern AI costs.

### [Link to heading](#api-key-budgets-in-the-vercel-dashboard)API key budgets in the Vercel Dashboard

On the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys&title=AI+Gateway+API+Keys), click **Create Key**, enable the **Spend Quota** option, enter a limit in dollars, and choose a refresh period.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3U04IHbBLkYtm0R5UEgbaS%2F31c8b86982886a713b60b7005526df1e%2FCleanShot_2026-06-05_at_18.03.28_2x.png&w=1080&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FvlWZLTOqpjM9fjsZtbjiR%2Fd03c7fd99aa830a669dfe6ef2f716947%2FCleanShot_2026-06-05_at_18.02.03_2x.png&w=1080&q=75)

You can also edit existing keys and add, change, or remove budgets by clicking the right hand side ... menu and **Edit Key**.

### [Link to heading](#api-key-budgets-in-the-vercel-cli)API key budgets in the Vercel CLI

Create a budgeted API key programmatically via the Vercel CLI. The format is:

```
vercel ai-gateway api-keys create --name <NAME> --budget <DOLLARS> --refresh-period <PERIOD>
```

Pair a key with an optional refresh period (`daily`, `weekly`, `monthly`, or `none`) to scope the limit to a window. Each period resets at the start of its window in UTC.

Keys created programmatically will also appear in your team [AI Gateway API Keys view](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys&title=AI+Gateway+API+Keys), so you can see all keys in one place.

Read the [API keys documentation](https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys) for more information about setting and using budgets for API keys.