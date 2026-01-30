---
title: "Native support for SvelteKit's new OpenTelemetry spans"
source: "https://vercel.com/changelog/native-support-for-sveltekits-new-opentelemetry-spans"
publishedDate: "2025-08-18"
category: "frontend"
feedName: "Vercel"
author: "Elliott Johnson"
---

1 min read

Aug 18, 2025

Vercel now directly integrates with [SvelteKit](https://svelte.dev/docs/kit)'s new server-side OpenTelemetry spans.

To get started, activate experimental tracing in SvelteKit:

svelte.config.js

```
/** @type {import('@sveltejs/kit').Config} */const config = {	kit: { 		experimental: {			tracing: {				server: true,			},			instrumentation: {				server: true,			}		}	}};export default config;
```

And create the tracing instrumentation file with the Vercel OpenTelemetry collector:

src/instrumentation.server.ts

```
import { registerOTel } from '@vercel/otel';registerOTel({	serviceName: 'my-sveltekit-app'});
```

Traces generated during [tracing sessions](https://vercel.com/docs/session-tracing) will now include the built-in SvelteKit spans. You can also [configure other collectors](https://vercel.com/docs/otel). See the [SvelteKit observability docs](https://svelte.dev/docs/kit/observability) for more information.

![SvelteKit integrated spans (in green) shown beneath Vercel infrastructure spans. Delays added for illustration.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Ayq1L8CwzDDc4yvGdqEht%2F27f24327b0b11cd325c752ef3eda4a19%2FCleanShot_2025-08-14_at_10.54.23.png&w=1920&q=75)

SvelteKit integrated spans (in green) shown beneath Vercel infrastructure spans. Delays added for illustration.