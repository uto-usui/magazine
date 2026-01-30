---
title: "How Chatbase scaled rapidly with Vercel's developer experience and AI SDK"
source: "https://vercel.com/blog/how-chatbase-scaled-rapidly-with-vercels-developer-experience-and-ai-sdk"
publishedDate: "2024-10-09"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Oct 9, 2024

With over 500K visitors per month, Chatbase relies on the AI SDK, caching, and streamlined workflows to stay ahead in the competitive AI market.

[Chatbase](https://www.chatbase.co/) helps companies build chat-based AI agents that are trained on their data to chat with users and perform tasks. It handles customer support, sales, lead generation, and more.

From the beginning, they prioritized building a platform that could move fast in the competitive market. To achieve this, they chose Vercel and Next.js as the tech stack for their app and marketing website, along with Vercel's AI SDK, which enabled them to quickly iterate and deliver AI-driven features.

By prioritizing iteration speed, Chatbase grew to 500K monthly visitors and $4M ARR in 1.5 years. Vercel's developer experience (DX) allows the team to focus on innovation, not infrastructure. The AI SDK enables rapid implementation of custom chats and model optimizations.

### [Link to heading](#the-perfect-tech-stack-for-building-ai-apps)The perfect tech stack for building AI apps

-   **AI SDK:** The [AI SDK](https://sdk.vercel.ai/) by Vercel played a critical role in building Chatbase’s AI playground. Each chat instance can be configured with different models and settings, allowing users to experiment with different chatbot configurations. This enabled the launch of their **LLM Compare Mode**, allowing users to compare various LLMs for their RAG chatbots by adjusting parameters such as the model, temperature, and system messages. Thanks to the AI SDK's ability to quickly swap models, Chatbase users can optimize their chatbot configurations for specific use cases.  
    
-   **Rendering flexibility:** Chatbase hosts both its marketing website and app in the same repository, leveraging Vercel to manage both efficiently. Static pages are optimized for speed and SEO, while the app uses a combination of server and client-side rendering to ensure personalization without compromising performance. Finally, [Next.js’s App Router](https://nextjs.org/docs/app) provides intuitive control over static and dynamic rendering components.
    
-   **Vercel Firewall:** Vercel’s security infrastructure, including the [Firewall](https://vercel.com/docs/security/vercel-firewall), provides essential protection for Chatbase’s AI applications, helping [guard against costly DDoS attacks](https://vercel.com/blog/preventing-infrastructure-abuse-with-vercel-firewall) while maintaining reliability.
    
-   **Skew Protection:** Vercel ensures smooth synchronization between server and client code, removing version skew, and improving development workflows. With [Skew Protection](https://vercel.com/docs/deployments/skew-protection#skew-protection), Chatbase can ensure no issues are experienced by end users in production.
    
-   **Next.js support:** With Vercel’s support for Next.js, Chatbase leveraged built-in caching and [streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) capabilities to deliver fast responses to users, both of which are essential for AI-driven applications.
    

### [Link to heading](#current-architecture-and-benefits)Current architecture and benefits

Chatbase follows a trunk-based development approach, where pull requests are continuously merged into the main branch, which is directly linked to production. For new features, developers create separate branches and use [Preview Deployments](https://vercel.com/docs/deployments/preview-deployments) for testing and collaboration.

Their current architecture and rendering strategies offer several advantages. Static content loads quickly, while dynamic sections render smoothly, resulting in a significantly improved user experience.

Vercel’s infrastructure also ensures stability, even during traffic spikes—crucial for an AI startup that often experiences sudden attention from feature launches or social media buzz. Features like [Instant Rollbacks](https://vercel.com/docs/deployments/instant-rollback) and the ability to disable auto-assigning production domains make the deployment process more flexible, reliable, and stress-free for the development team.

Overall, Vercel has been instrumental in helping Chatbase move quickly, innovate, and scale effectively, enabling them in maintaining rapid growth.

[

**Unlock rapid AI development**

Build AI-powered applications with the AI SDK.

Get started with the AI SDK



](https://sdk.vercel.ai/docs/introduction#vercel-ai-sdk)