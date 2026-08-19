---
title: "iMessage support for eve agents"
source: "https://vercel.com/changelog/imessage-support-for-eve-agents"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Owen Kephart"
---

[eve](https://eve.dev/) agents can now connect to iMessage through the new [Photon channel](https://eve.dev/docs/channels/photon).

The channel keeps each iMessage conversation in one eve session, verifies incoming webhooks, and marks accepted messages as read.

If more messages arrive while the agent is replying, they steer the in-progress reply instead of each getting a separate answer. The `onMessage` hook filters which messages the agent handles and adds context to a turn.

Run `eve add channel/photon-imessage` to add the channel. iMessage delivery runs through [Photon](https://photon.codes/), so the command sets up a Photon project, registers your phone number, and scaffolds the channel:

agent/channels/photon.ts

```
import { connectPhotonCredentials } from "@vercel/connect/eve";import { photonIMessageChannel } from "eve/channels/photon";export default photonIMessageChannel({  credentials: connectPhotonCredentials("photon/my-agent"),});
```

Registers the Photon channel with Connect-backed credentials

eve uses [Vercel Connect](https://vercel.com/connect) to create the connector and configure Photon's webhook. On hosts without Connect support, choose **Use portable credentials** during setup and the channel reads its credentials from environment variables instead.

Read the [Photon channel](https://eve.dev/docs/channels/photon) docs to get started, or deploy an agent from a [template](https://eve.dev/templates).

[

**Start an eve agent from a template**

Pick a template, deploy in minutes, and debug every agent session in the Vercel dashboard from the first run.

Build your agent



](https://eve.dev/templates)