---
title: "Vercel Connect now supports Custom Environments"
source: "https://vercel.com/changelog/vercel-connect-now-supports-custom-environments"
publishedDate: "2026-07-28"
category: "frontend"
feedName: "Vercel"
author: "Tony Pan"
---

[Vercel Connect](https://vercel.com/docs/connect) now lets you link a connector to a [Custom Environment](https://vercel.com/docs/deployments/environments#custom-environments) so deployments there can request provider tokens and receive forwarded webhooks.

Custom Environments appear alongside Production, Preview, and Development when you add or edit a project on a connector in the dashboard.

From the CLI, pass the environment's slug to `--environment`:

```
vercel connect attach slack/acme-slack --environment qa
```

Attach the Slack connector in only the qa environment.

Passing `--environment` replaces the default environments.

Once linked, a deployment in that environment can request tokens with `getToken` as usual. If the calling environment isn't on the project link, the request fails with `ClientNotEnabledForEnvironmentError`.

Trigger destinations can also target a Custom Environment:

```
vercel connect attach slack/acme-slack --environment qa --triggers \  --trigger-environment qa --trigger-path /api/slack-events
```

Forward verified webhooks to the qa environment.

Before targeting a Custom Environment with triggers, deploy to it and assign it a verified domain. Vercel Connect forwards events through that domain.

Project links control which deployments can request tokens, and they do not restrict a provider token after it is issued. When environments need provider-level isolation, create a separate connector for each environment and request only the scopes it needs.

Vercel Connect is in beta on all plans. Custom Environments are available on Pro and Enterprise plans. Get started with the [Vercel Connect quickstart](https://vercel.com/docs/connect/quickstart) or read the [step-by-step guides](https://vercel.com/kb/vercel-connect).