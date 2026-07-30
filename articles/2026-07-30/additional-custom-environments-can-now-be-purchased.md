---
title: "Additional custom environments can now be purchased"
source: "https://vercel.com/changelog/additional-custom-environments-can-now-be-purchased"
publishedDate: "2026-07-29"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

Pro and Enterprise teams can now purchase additional custom environment capacity without contacting sales.

Custom environments let you model your team's release process on Vercel. You can add `staging`, `qa`, or any named stage between `preview` and `production`, and each environment gets its own branch tracking, environment variables, and domains.

You can purchase or adjust capacity from the dashboard, API, or CLI.

**Dashboard  
**Project → Settings → Environments → Custom Environments

**API  
**`POST /v1/projects/custom-environments/settings`

**CLI  
**`vercel buy addon customEnvironment <packs>`

Capacity is sold in packs of 5 environments. You can also reduce capacity as long as the project isn’t using more environments than the new limit allows. Billing updates when you confirm a change.

### [Copy link to heading](#pricing-and-limits)Pricing and limits

Custom environments are available on Pro and Enterprise plans. Additional capacity can be purchased for $50/month per pack of 5 environments.

**Plan**

**Limits**

Pro

1 custom environment included per project (up to 16 total per project)

**Enterprise**

12 custom environments included per project (up to 22 total per project)

Purchases require an active Pro or Enterprise plan, billing permissions, and a valid payment method. Capacity is configured per project, and your team subscription reflects the total number purchased environments across projects.  
  
[Learn More](https://vercel.com/docs/deployments/environments#custom-environments)