---
title: "Sanity balances experimentation and performance with Vercel Edge Middleware "
source: "https://vercel.com/blog/sanity-edge-middleware"
publishedDate: "2023-01-13"
category: "frontend"
feedName: "Vercel"
author: "Grace Madlinger"
---

2 min read

Jan 13, 2023

The Sanity Composable Content Cloud enables teams to create better digital experiences—unleashing editor creativity while reducing engineering headaches. When it comes to their own marketing site, Sanity has similarly high standards, which is why they rely on Vercel and Next.js. With [Edge Middleware](https://vercel.com/features/edge-functions) and [Serverless Functions](https://vercel.com/docs/concepts/functions#serverless-functions), Vercel makes it simple for Sanity’s developers to collaborate between teams, create and manage experiments, and empower their users to dream big with [pre-built templates.](https://vercel.com/templates/sanity)  

## [Link to heading](#reducing-overhead-and-complexity)Reducing overhead and complexity

Sanity launched their marketing site in 2017 using a custom Server-Side Rendering (SSR) React Framework, Docker, and Google Cloud Platform, but found the stack required operational overhead. Whenever there were issues, they’d need to involve an already-busy site reliability engineering team. When Sanity decided to rebuild their site in 2018 with Next.js, they felt confident knowing Vercel is the best place to host Next.js apps—and that it “just works.”

> The switch from Google Cloud Platform to Vercel has allowed our engineers to go from spending their time managing and troubleshooting Kubernetes clusters to building more unique features for our customers.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2y1BavRNWNz123e1WdmQtf/4f79b1c9f279f8c1c0b223eb6af3d8d6/knut.png)
> 
> **Knut Melvær Head of Developer Relations,** Sanity.io

The switch was seamless, which the team attributes to Vercel’s backwards compatibility. Even their older configuration files worked. Immediately after switching over, the team was delighted by the out-of-the-box features: all of the tedious but necessary tasks like adding domains, SSL certificates, and getting deployment previews were taken care of, saving them additional setup time and worry. With Vercel they could simply point it to a GitHub repository and get CI/CD out of the box. The ability to seamlessly fetch form data from Marketo’s API was also “unparalleled.” 

"[Vercel Preview Deployments](https://vercel.com/features/previews) make sharing projects and collaboration simple, even for non-technical people who now get to click around and look at pages," says Knut Melvær, Head of Developer Relations. "I feel like this social aspect is also a big part of what makes the result great."

## [Link to heading](#stress-free-experimentation)Stress-free experimentation

One of the team’s favorite Vercel features is Edge Middleware, which allows them to run A/B tests without disrupting the client experience. In fact, they ran over eight tests just this summer, working to improve the onboarding flow for new users and experimenting with different CTA buttons to increase quality leads reaching the sales team. Soon they plan to collaborate with AT&T on personalization with Edge Middleware as well. 

Sanity’s developers also credit Vercel’s ease of integration, relying on Checkly for end-to-end testing that has “saved them several times.” Combined with Vercel’s performance checks, the team has the assurance they need that their sites and experiments will continue to perform well.

For Sanity, it’s not only about how Vercel impacts their developer experience, but how it improves the user experience, too. With a lightning-fast marketing site, users can get the most out of Sanity, while their developers can continue to experiment and innovate.

_Looking to drive experiments and personalization impacting site performance?_ [_Get in touch_](https://vercel.com/contact/sales)_._