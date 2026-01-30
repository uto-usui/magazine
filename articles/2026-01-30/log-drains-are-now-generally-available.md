---
title: "Log Drains are now generally available"
source: "https://vercel.com/changelog/log-drains-are-now-generally-available"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

1 min read

May 23, 2024

Vercel Log Drains are now generally available—send runtime and build logs from Vercel to third-party services.

**What’s new?**

Since we introduced Log Drains, you can now filter by different environments, define a sampling rate, transport logs with either the JSON or NDJSON formats, and more.

_New Usage Based Billing_

-   Usage of Log Drains costs $10 per 5GB of data transfer; all logs sent to a third-party accrue Log Drain usage automatically.
    
-   Existing Pro customers have **three additional months free** before billing begins. You can view the exact date based on your billing cycle in the [dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling&title=Go+to+Billing+Settings).
    
-   Log Drains are only available on Pro and Enterprise plans. Existing Hobby customers may continue to use Log Drains as configured, but no further usage or configuration is available.
    

**How can I check my Log Drain usage?**

You can view your existing Log Drain usage on the [Usage page](https://vercel.com/docs/pricing/manage-and-optimize-usage).