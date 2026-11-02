---
title: "Vercel Connect adds webhook triggers for more providers"
source: "https://vercel.com/changelog/vercel-connect-adds-webhook-triggers-for-more-providers"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Yasoob Rasheed"
---

[Vercel Connect](https://vercel.com/docs/connect) now supports webhook triggers for [Resend](https://vercel.com/connect/resend), [X](https://vercel.com/connect/x), [Twilio](https://vercel.com/connect/twilio), [Notion](https://vercel.com/connect/notion), and [Telegram](https://vercel.com/connect/telegram).

Connect receives webhook events, such as Telegram bot messages or emails received by your Resend domain, and forwards them to an endpoint in your Vercel project. It verifies incoming requests and handles provider heartbeats and verification challenges for you.

To get started:

1.  Open [Vercel Connect](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fconnect&title=Vercel+Connect) in the dashboard. Enable triggers when creating a connector for your provider or in an existing connector’s settings. Connect registers webhooks automatically for Resend and Telegram.
    
2.  For Twilio, Notion, and X, use the webhook URL from Connect and follow its instructions to complete setup in the provider’s settings.
    
3.  Add a trigger destination to choose the project and endpoint that should receive events.
    

You can turn triggers on or off later in the connector’s settings.

In the connector’s [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fconnect%2F%5Bconnector%5D%2Fobservability&title=Connect+Observability) tab, select **Live** to watch incoming trigger events.

![Live trigger logs and request details in Vercel Connect.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1AFpXWKtZ2995gC4RNFRpT%2F5081d88ea901b57ab21bfaadf711d80c%2Fconnect-observability-light.png&w=1920&q=95)![Live trigger logs and request details in Vercel Connect.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ewcZQTWJYoP4qupXqyGx1%2Ffca4038059e936f2095e0e481950baef%2Fconnect-observability-dark.png&w=1920&q=95)

Live trigger logs and request details in Vercel Connect.

These connectors join existing trigger support for Slack, Discord, Microsoft Teams, GitHub, and Linear.

Learn more in the [Connect triggers documentation](https://vercel.com/docs/connect/concepts/triggers).