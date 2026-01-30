---
title: "@vercel/otel 1.3.0"
source: "https://vercel.com/changelog/vercel-otel-1-3-0"
publishedDate: "2024-02-16"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

1 min read

Feb 16, 2024

Vercel and Next.js provide increased observability of your applications through OpenTelemetry.

instrumentation.ts

```
import { registerOTel } from '@vercel/otel';export function register() {  registerOTel({ serviceName: 'acme-co' });}
```

Using the Vercel OTEL package with Next.js.

[v1.3.0](https://www.npmjs.com/package/@vercel/otel) of `@vercel/otel` now providing custom resource and operation names for [Datadog](https://vercel.com/integrations/datadog) to satisfy their cardinality requirements. You can group related URL paths for a given span to reduce cardinality and associated usage.

For example, `/products/hoodie` can be mapped to `/products/[name]`.

Learn more in [our documentation](https://vercel.com/docs/observability/otel-overview) or start using the package with [Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry).