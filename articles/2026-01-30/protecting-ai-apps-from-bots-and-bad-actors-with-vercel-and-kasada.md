---
title: "Protecting AI apps from bots and bad actors with Vercel and Kasada"
source: "https://vercel.com/blog/protecting-ai-apps-with-vercel-and-kasada"
publishedDate: "2024-03-22"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

3 min read

Mar 22, 2024

Showcasing threat vectors for AI workloads and how we secure the Vercel AI SDK Playground.

The growth in popularity of AI applications, and the relative high cost of the LLMs to power those calls, means AI apps have emerged as an incredibly high-value target for bots and bad actors.

Vercel's industry-leading [DDoS mitigation](https://vercel.com/docs/security/ddos-mitigation), including our recently launched [Attack Challenge Mode](https://vercel.com/docs/security/attack-challenge-mode), provides the first line of defense. With our built-in L3, L4, and L7 protections, [the Vercel Firewall](https://vercel.com/docs/security/vercel-firewall) uses hundreds of signals and detection factors to fingerprint request patterns, determine if they appear to be an attack, and challenge or block requests if they appear illegitimate.

To allow for continued experimentation with AI in our products, it’s essential that compute resources are actively protected against unauthorized use, to protect and secure high-value actions such as AI calls.

A prime example of this is Vercel's AI Playground, which allows users to experiment with dozens of different LLMs in one dashboard. The dashboard sees millions of active generations, and 5x that in blocked bot traffic.

In this post, we'll talk about how we leverage Next.js Middleware and our partner [Kasada](https://www.kasada.io/) to lock down our AI SDK Playground for additional protection.

[

**Protect your AI workloads.**

Learn how Vercel and Kasada work together to prevent abuse in your AI apps.

See the Template



](https://vercel.com/templates/next.js/advanced-ai-bot-protection)

### [Link to heading](#new-risks,-old-attack-vectors)**New risks, old attack vectors**

Due to the nature of AI compute, threat actors are exploiting AI applications by using automation and bots to run up operational costs via two main methods:

1.  **Denial of Wallet Attacks:** Malicious entities deploy bots aiming to inflate the operational costs of AI applications, essentially forcing the target to incur unwarranted financial burdens.
    
2.  **Prompt Injection Attacks:** Attackers abuse AI applications in an attempt to generate unintended responses and extract sensitive data from business logic or queries embedded within; this redirects computational expenses onto the victim, essentially leveraging expensive AI APIs without bearing the cost themselves.
    

These threats are not just hypothetical; they have materialized across various platforms, as evidenced by incidents documented on [GitHub](https://github.com/acheong08/ChatGPT) and [other repositories](https://github.com/reorx/awesome-chatgpt-api), where attackers have sought to bypass payment mechanisms to access AI services.

## [Link to heading](#vercel's-ai-sdk-playground:-a-case-study-in-bot-mitigation)**Vercel's AI SDK Playground: A case study in bot mitigation**

The [Vercel AI SDK Playground](https://sdk.vercel.ai/) presents a compelling case study in addressing these challenges. Designed as a sandbox for exploring a variety of AI models, it implements a tiered access system based on user authentication, from anonymous users to verified customers.

This structure, however, also painted a target on the platform for attackers seeking unauthorized access to AI capabilities.

### [Link to heading](#the-challenge)**The challenge**

Our initial observations were alarming; the platform quickly became a target for abuse, primarily from two groups:

-   Those seeking free access to AI models.
    
-   Individuals circumventing geographical restrictions on certain AI technologies.
    

Despite implementing basic bot protection measures, we realized that the attackers' motivations were strong enough to drive them to find workarounds. It became clear that a more sophisticated solution was necessary.

### [Link to heading](#integrating-kasada:-a-turnkey-solution)**Integrating Kasada: A turnkey solution**

The introduction of Kasada's bot protection technology marked a turning point in our battle against these threats. By integrating Kasada's solution, we observed an immediate cessation of the abusive activities that had plagued our platform.

The implementation of a 1st-party-request-only protocol, enforced through Next.js Middleware, allowed us to intercept and block bot-driven API calls based on Kasada's bot classification.

The results were striking. Upon deploying Kasada, **we saw an immediate drop in bot traffic, from a staggering 84% of our traffic to negligible levels.**

## [Link to heading](#how-it-works)How it works

Kasada provides dynamic defense against automated threats with a platform that is quick to evolve, difficult to evade, and invisible to humans. Protections are immediate and long-lasting without the need for any management and can be easily integrated with their API.

middleware.js

```
import { NextResponse } from 'next/server';import { kasada } from '@lib/kasada-api';export default async function middleware(request) {  const { error, context } = await kasada.classify(request);  // If Kasada was down or another failure occurred, fail open so users aren't impacted  if (error) {    console.error(`Kasada failed open with error: ${error}`);    return NextResponse.next();  }  // If the request is a Bad Bot, block this request and return a customizable response  if (context.response) {    return kasada.prepareResponse(context.response, context);  }  // No Bad bot detected, proceed to the next route handler  return NextResponse.next();}
```

With a tightly integrated, layered defense platform, Kasada applies a combination of robust client-side defenses, AI/ML-based anomaly server-side detection, invisible challenges, and data integrity checks to avoid data tampering and replay attacks.

## [Link to heading](#ongoing-collaboration-to-shield-ai-applications)Ongoing collaboration to shield AI applications

Our collaboration with Kasada exemplifies Vercel's dedication to pioneering secure and scalable web infrastructure solutions. As we continue to navigate the complexities of AI application security, partnerships like these are invaluable.

The journey with Kasada is just the beginning. As AI technologies continue to evolve, so, too, will the strategies to protect them. Through continuous innovation and collaboration, we remain dedicated to offering our users a secure, efficient, and accessible digital experience.

[

**Industry-leading security.**

Learn more about Vercel's robust security and DDoS mitigation for your critical applications.

Talk with an Expert



](https://vercel.com/contact/sales)