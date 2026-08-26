---
title: "Chat SDK now supports Slack Enterprise Grid"
source: "https://vercel.com/changelog/chat-sdk-slack-enterprise-grid"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

Chat SDK's Slack adapter now supports [Slack Enterprise Grid](https://slack.com/resources/why-use-slack/slack-enterprise-grid).

Bots installed org-wide work across every workspace, with correct token resolution, tenant-scoped caches, and event retry deduplication.

The adapter now stores org-wide installations by enterprise ID. This matches how tokens are resolved for incoming events, slash commands, and interactive payloads. `SlackInstallation` records the new identity fields:

```
const installation = await slack.handleOAuthCallback(request);installation.teamId; // "E0123456789" (enterprise ID for org-wide installs)installation.enterpriseId; // "E0123456789"installation.isEnterpriseInstall; // true
```

Token resolution behaves the same over HTTP webhooks and Socket Mode. Events route by the installation identity in the envelope's `authorizations` field, which keeps routing correct for Slack Connect shared channels.

The adapter is also hardened for multi-workspace deployments:

-   User profile and mention caches are scoped per installation, so one tenant's data never resolves for another.
    
-   API calls made with an org-wide token pass the event's `team_id` automatically, which Slack requires for workspace-scoped methods.
    
-   Retried event deliveries are deduplicated for 24 hours, covering Slack's Delayed Events redeliveries.
    
-   Outgoing mentions accept W-prefixed Grid user IDs alongside U-prefixed IDs.
    

Single-workspace installations are unaffected, and `getInstallation` and `deleteInstallation` work unchanged for both install types.

Read the [Slack adapter documentation](https://chat-sdk.dev/adapters/official/slack) to get started.