---
title: "Chat SDK now supports callback URLs on buttons and modals"
source: "https://vercel.com/changelog/chat-sdk-now-supports-callback-urls-on-buttons-and-modals"
publishedDate: "2026-05-20"
category: "frontend"
feedName: "Vercel"
author: "Ben Sabic"
---

1 min read

May 20, 2026

You can now pause a [Workflow](https://workflow-sdk.dev/) run on a Chat SDK card and resume it when someone clicks a button. The same flow works for form submissions. Buttons and modals accept a new `callbackUrl` prop, and the event payload is sent to that endpoint.

![Example of a Slack approval card that requests your permission to send a status report](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FyR2hs3RcSmHYTCaQU3s2c%2F6a502b7f73440345845f2b0e2e4e1a66%2Fimage__10_.png&w=1920&q=75)![Example of a Slack approval card that requests your permission to send a status report](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yzbHtgCUoSaXMxRCv2JNo%2F570c70d465c1dfe394ec48b91a06ef2c%2Fimage__11_.png&w=1920&q=75)

Slack approval card for a status report request

To build a card like this, create a [workflow webhook](https://workflow-sdk.dev/docs/api-reference/workflow/create-webhook) and pass its URL to each button's `callbackUrl` prop inside your `<Card>` component:

lib/bot.ts

```
import { createWebhook } from "workflow";import { Card, CardText, Actions, Button } from "chat";export async function statusReport(  thread,  content: { title: string; message: string },) {  "use workflow";  using hook = createWebhook<{ action: "approve" | "approve-and-send" | "deny" }>();  await thread.post(    <Card title="Status Report Communications">      <CardText>Title: {content.title}</CardText>      <CardText>Message: {content.message}</CardText>      <Actions>        <Button callbackUrl={hook.url} id="approve" style="primary">          Approve        </Button>        <Button callbackUrl={hook.url} id="approve-and-send" style="primary">          Approve & Send        </Button>        <Button callbackUrl={hook.url} id="deny" style="danger">          Cancel        </Button>      </Actions>    </Card>  );  const { action } = await hook;  if (action === "approve" || action === "approve-and-send") {    await sendReport(content);  }}
```

Create an approval card to approve or deny a deployment

For the `<Modal>` component, the form data is in the payload. `callbackUrl` works for buttons on most platforms with an [official adapter](https://chat-sdk.dev/adapters), and for modals on Slack and Teams.

Read the [documentation](https://chat-sdk.dev/docs/actions#callback-urls) or [walkthrough guide](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk) to start building.

[

**The Complete Guide to Chat SDK**

Learn how Chat SDK works end-to-end: from core concepts to building your first bot to deploying it across Slack, Teams, and more.

Read the guide



](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk)