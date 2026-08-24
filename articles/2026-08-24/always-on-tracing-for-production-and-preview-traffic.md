---
title: "Always-on tracing for production and preview traffic"
source: "https://vercel.com/changelog/always-on-tracing-for-production-and-preview-traffic"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Darpan Kakadia"
---

With always-on tracing, you can now debug your real user requests without reproducing them.

Always-on tracing continuously collects traces from your production and preview traffic. Unlike [session tracing](https://vercel.com/docs/tracing/session-tracing), which only captures requests from your own browser, it samples your live traffic.

You control what's collected with sampling rules. Each rule sets a trace rate for an environment (All, Production, or Preview), optionally scoped to a path prefix like `/checkout`. Nothing is collected until you add a rule, so you pay only for what you choose to trace.

![Configuring sampling rules for a project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7iL9TQPotI39W02ICK9mpz%2F9b68e1ba87c770308631e37976e75cee%2FCleanShot_2026-07-22_at_11.08.59_2x.png&w=1920&q=75)![Configuring sampling rules for a project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3rQPevGfGwCQkphxEbKIQK%2F52f24ec693caa7ab0c87861b8f5d711c%2FCleanShot_2026-07-22_at_11.12.43_2x.png&w=1920&q=75)

Configuring sampling rules for a project.

Infrastructure and outbound fetch spans are captured automatically. To add framework and custom spans, instrument your app with `@vercel/otel`.

To view a trace, open the Logs or run `vercel traces get <request-id>`.

Always-on tracing is is now in beta and available to teams on all plans. Tracing is priced at $0.50 per 1M span units. Traces follow your runtime log retention: 1 hour on Hobby, 1 day on Pro and 3 days on Enterprise.

Get started by adding a rule in [Settings → Tracing](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing) or from the settings icon in [Logs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Flogs). Learn more in the [documentation](https://vercel.com/docs/tracing/always-on-tracing).