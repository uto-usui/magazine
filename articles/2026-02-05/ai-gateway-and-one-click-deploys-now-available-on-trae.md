---
title: "AI Gateway and one-click deploys now available on TRAE"
source: "https://vercel.com/changelog/ai-gateway-and-one-click-deploys-now-available-on-trae"
publishedDate: "2026-02-03"
category: "frontend"
feedName: "Vercel"
author: "Walter Korman "
---

2 min read

Feb 3, 2026

ByteDance's coding agent [TRAE](https://www.trae.ai/) now integrates both [AI Gateway](https://vercel.com/ai-gateway) and direct Vercel deployments, bringing unified AI access and instant production shipping to over 1.6 million monthly active developers. Teams can now access hundreds of models through a single API key and deploy applications directly to Vercel from the TRAE interface.

AI Gateway provides unified access to models from Anthropic, OpenAI, Google, xAI, DeepSeek, Z.AI, MiniMax, Moonshot AI, and more without managing multiple provider accounts.

The integration includes automatic failover that routes around provider outages, zero markup on AI tokens, and unified observability to monitor both deployments and AI usage. Meanwhile, the Vercel deployment integration handles authorization automatically and returns live URLs immediately after clicking Deploy.

## [Link to heading](#solo-mode)SOLO Mode

**Setting up Vercel deployment**

In SOLO mode, click the **+** tab and choose **Integrations** to connect your Vercel account. When your project is ready, click **Deploy** in the chat panel to ship directly to production.

Once linked, all projects can immediately deploy to Vercel and are also visible in your Vercel dashboard.

**Setting up AI Gateway**

In **Integrations**, choose Vercel AI Gateway as your AI Service and add your API key from the Vercel AI Gateway dashboard. Select any model and start coding with automatic failover, low latency, and full observability.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2DTuwDP5oPLgB9gJgczVTu%2F2ba012f1729e4d544751855b71ec241a%2Fbettershot_1770170078306.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6yJ1U7ki8AwA29XJMcrqpJ%2F385f0a91c04daf17db083627859236d1%2Fbettershot_1770170014335.png&w=1920&q=75)

## [Link to heading](#ide-mode)IDE Mode

TRAE's IDE mode supports AI Gateway as a model provider with access to the full range of available models alongside direct deployment capabilities.

**Configuration**

```
// Click the model list dropdown in Builder chat and select Add Model// Choose Vercel AI Gateway for Provider// Select your model or choose Other Models and enter the creator/model slug// Add your API key
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2qKg0JoAjuh0TD8wyL2kvI%2F00f57b4420223b539ee0ddbe637fc6c4%2Fbettershot_1770169814297.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1R9rWyRKUOtR7Jr3ey3ufS%2Fc0cf433568259dc8185a1bd31fc08c16%2Fbettershot_1770169857151.png&w=1920&q=75)

You can switch models with a single configuration change while maintaining unified billing through Vercel. This creates a complete development experience where teams write code with any AI model, then ship to production with one click from the same interface.

Get started with [AI Gateway](https://vercel.com/ai-gateway) or explore the [documentation](https://vercel.com/docs/ai-gateway) to learn more.