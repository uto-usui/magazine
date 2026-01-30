---
title: "Instrument and trace applications with the OpenTelemetry collector"
source: "https://vercel.com/changelog/instrument-and-trace-applications-with-the-opentelemetry-collector"
publishedDate: "2024-01-31"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

1 min read

Jan 31, 2024

Vercel and Next.js provide increased observability of your applications through OpenTelemetry.

instrumentation.ts

```
import { registerOTel } from '@vercel/otel';export function register() {  registerOTel({ serviceName: 'acme-co' });}
```

Using the Vercel OTEL package with Next.js.

[v1.0](https://www.npmjs.com/package/@vercel/otel) of `@vercel/otel` now supports:

-   Support for Node.js and Edge runtimes
    
-   Telemetry context propagation, including [W3C Trace Context](https://www.w3.org/TR/trace-context/)
    
-   Fetch API instrumentation with context propagation
    
-   Support and auto-configuration for the [Vercel OTEL collector](https://vercel.com/docs/observability/otel-overview/quickstart)
    
-   Enhanced metadata reporting
    
-   Sampling support
    
-   Custom tracing exporter support
    
-   Batched trace exporting
    

Learn more in [our documentation](https://vercel.com/docs/observability/otel-overview) or start using the package with [Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry).