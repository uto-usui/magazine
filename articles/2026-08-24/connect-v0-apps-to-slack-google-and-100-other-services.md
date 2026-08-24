---
title: "Connect v0 apps to Slack, Google, and 100+ other services"
source: "https://vercel.com/changelog/connect-v0-apps-to-slack-google-and-100-other-services"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "Vishal Yathish"
---

Apps and agents built in v0 can now securely connect to [100+ third-party services](https://vercel.com/connect/browse), including Slack, Google, Notion, GitHub, and Salesforce, through [Vercel Connect](https://vercel.com/connect).

Prompt v0 to connect your app to a service, and it walks you through setting up a connector for it.

![Setting up a Slack connector for a personal task dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5CGDV3suBMLpD4EfFd5Qy9%2F027ff5cb3e562044ca94db186909bb52%2Fimage__4_.png&w=1920&q=75)![Setting up a Slack connector for a personal task dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F71LqYd46k60f3pfLems483%2F6283d8978d658e0a9004c2f6577d3fad%2Fimage__5_.png&w=1920&q=75)

Setting up a Slack connector for a personal task dashboard.

Connectors belong to your team, so you set one up once and reuse it across apps.

For some connectors like Slack and GitHub, Vercel handles the app registration, so there's nothing to set up on the provider's side. For other services you can supply your own credentials. Either way, each connection mints a short-lived token, so there's no long-lived secret to store or rotate.

With v0 and Vercel Connect, Danny from the KERNEL team built a [voice-driven browser agent](https://x.com/DanielPrevoznik/status/2088598328007078174) that drives a real browser with Playwright code it generates on the fly. We built a personal dashboard, with Slack messages, Gmail inbox, and Linear issues in one view, and a digest of what needs attention.

![Personal task dashboard built in v0.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1YeOwNvHMYbSQXrtWjq5oC%2F8017e9195f3ac505ca69f326c965a09e%2F0866abf5-d8a7-45d6-a63d-f6e604f72fe1.png&w=1920&q=75)![Personal task dashboard built in v0.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1xfVtpdUjZ5OudaLR7R4QI%2F38219f45a0e1dfa26091653760832458%2F0a43d05b-a7a8-4806-be54-66992b4df255.png&w=1920&q=75)

Personal task dashboard built in v0.

Try it yourself in [v0](https://v0.app/):

Read the [documentation](https://v0.app/docs/vercel-connect) to learn more.