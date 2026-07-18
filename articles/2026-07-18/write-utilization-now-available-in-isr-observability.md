---
title: "Write utilization now available in ISR Observability"
source: "https://vercel.com/changelog/write-utilization-now-available-in-isr-observability"
publishedDate: "2026-07-16"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

The [ISR Observability page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fisr&title=ISR+Observability) now shows [Observability Plus](https://vercel.com/docs/observability/observability-plus) subscribers a write utilization metric, helping identify routes that regenerate often but receive few requests. Write utilization is the ratio of cached requests to ISR writes. For routes with low write utilization, consider increasing the revalidation interval or switching to on-demand revalidation to reduce costs.

![The ISR Observability page showing the new write utilization column.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4oHZeA6afyZZvodzsvbm06%2Fca2331d3bbfa6bd21256a7da16ac0c9e%2FLight__1_.png&w=1920&q=75)![The ISR Observability page showing the new write utilization column.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FnH8L3NXZAhpRho04kD6vJ%2Fcc184545b394540f4e7b62c968e7ec28%2FDark__1_.png&w=1920&q=75)

The ISR Observability page showing the new write utilization column.

You can also compute write utilization using the Vercel CLI, or use agents with the [cdn-caching](https://www.skills.sh/vercel/vercel-plugin/cdn-caching) skill to investigate.

```
# Find the total number of cached requests for each pagevercel metrics vercel.request.count -S <team> -p <project> \  -f "environment eq 'production' and (cache_result eq 'HIT' or cache_result eq 'STALE')" \  --group-by route -a sum --since 24h# Find pages with high ISR writesvercel metrics vercel.isr_operation.write_units -S <team> -p <project> \  -f "environment eq 'production'" --group-by route -a sum --since 24h
```

Fetching the two metrics behind write utilization.

Learn more about [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration) or follow our guide on [how to reduce ISR regenerations and costs](https://vercel.com/kb/guide/how-to-reduce-isr-revalidation-costs).