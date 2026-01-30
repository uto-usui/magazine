---
title: "Transforming customer support with AI: How Vercel decreased tickets by 31%"
source: "https://vercel.com/blog/transforming-customer-support-with-ai-how-vercel-decreased-tickets"
publishedDate: "2024-09-03"
category: "frontend"
feedName: "Vercel"
author: "Alina Weinstein"
---

5 min read

Sep 3, 2024

[McKinsey's](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) latest AI survey shows 65% of organizations now regularly use AI — nearly double from just ten months ago, with many using it to increase efficiency in critical areas like customer support.

At Vercel, we integrated AI into our support workflow. Our AI agent reduced human-handled tickets by 31%, allowing us to maintain high support standards while serving a growing customer base.

### [Link to heading](#the-challenge:-balancing-support-quality-with-growth)**The challenge: balancing support quality with growth**

Customer support teams routinely handle a diverse range of customer inquiries, many of which involve repeatable processes. These can range from simple tasks like guiding customers to specific documentation pages, to helping customers through the process of configuring their domain.

The landscape of customer support is pointing organizations toward building AI-powered chatbots as a critical component of their customer support strategy. According to [Gartner](https://www.gartner.com/en/newsroom/press-releases/2022-07-27-gartner-predicts-chatbots-will-become-a-primary-customer-service-channel-within-five-years), by 2027, chatbots will become the primary customer service channel for roughly a quarter of organizations. Businesses are embracing AI, motivated by several factors: rising customer expectations for instant, 24/7 support; and the need for cost-effective scaling of support operations.

This correlation underscores the potential of AI as a powerful tool for enhancing customer experience while optimizing operational efficiency. The key to realizing these benefits lies in thoughtful implementation, and ensuring that AI solutions complement rather than replace human expertise in customer support. Organizations can find efficiencies with AI, and leave support engineers to handle the complex, context-rich inquiries that require deeper expertise.

### [Link to heading](#the-solution:-a-measured-approach-to-ai-implementation)**The solution: A measured approach to AI implementation**

At Vercel, we developed an AI-powered agent to seamlessly integrate with our existing support workflows. Working with our implementation partner, Markprompt, we replaced our support form with a simple, open-ended question: "How can we help?" Our AI-powered agent, powered by a Large Language Model (LLM), leverages a comprehensive, multi-source knowledge base that includes our website content, documentation, Next.js examples, and help articles. This allows us to provide immediate, accurate responses to a wide range of customer queries.

The AI assistant’s capabilities extend beyond simple question-answering. It can engage in follow-up questions, allowing it to handle increasingly complex queries over time. And, if the AI can't fully resolve an issue, it smoothly transitions to human support by pre-filling a support form, eliminating repetitive data entry for customers.

### [Link to heading](#tips-for-building-a-smarter-support-system)**Tips for building a smarter support system**

Throughout the development process, we prioritized customer experience and choice, guided by these key insights:

**Insight 1**: **Take an iterative approach**

Rather than implementing a solution quickly, we took a measured, iterative approach, prioritizing our customers' experience every step of the way. Our initial AI implementation focused on providing immediate answers to customer queries surfacing objective, foundational answers and then providing more context if needed by the customer.

**Insight 2:** **Test internally first**

As we do with everything from internal tools to the products we offer customers, we used our technology in-house first. By testing the AI assistant internally before rolling it out to customers, we addressed compliance and security concerns head-on, particularly regarding access to sensitive customer data. It also ensured we met our high standards for customer experience.

**Insight 3: Gradual rollout with A/B testing**

We began with a 50% A/B test using [Edge Middleware](https://vercel.com/docs/functions/edge-middleware), allowing us to safely test our hypothesis of improved support through AI in the real-world. The results were overwhelmingly positive: a 16% reduction in support tickets over a period of two weeks, right from the first iteration. This validation gave us the confidence to ramp up to a 100% rollout and evolve the AI-powered agent into a more interactive, conversational interface.

**Insight 4: Prioritize customer experience and brand integrity**

Throughout the process, we remained acutely aware of our responsibility to protect our brand and deliver exceptional service. A key feature of our implementation was the constant presence of a clear "Create Case" option. At every step, customers had the ability to opt out of the AI experience and connect with a human support engineer, ensuring they always felt in control of their support experience. This approach empowered customers, created a valuable feedback loop, and enabled rapid improvements. Instead of deploying a basic AI chatbot quickly, we developed a sophisticated, customer-centric AI solution that respects customer preferences while leveraging advanced technology.

### [Link to heading](#benefits-and-results)**Benefits and results**

This new system offered two key advantages: saving customers time and being language-agnostic, allowing customers to describe their issues in any language. It successfully interpreted, understood, answered, and resolved 31% of incoming tickets, freeing up the CSE team to focus on providing the best possible customer experience.

The benefits extended beyond these initial wins:

-   42% reduction in first response time for customers
    
-   Significantly improved CSE job satisfaction
    
-   Enhanced documentation and product interfaces
    

Vercel's approach wasn't just about answering questions and closing tickets; it was about learning and improving. By analyzing resolved tickets, we identified areas for enhancement in documentation, product interface, and the product itself. We also created a data flywheel, where each interaction improved the AI's performance, leading to better outcomes over time and a virtuous cycle of improvement.

### [Link to heading](#how-to-get-started-at-your-company)**How to get started at your company**

Vercel empowers developers to harness the power of AI, regardless of their team's expertise. Now is the perfect time for your organization to explore AI-driven solutions – here's how you can get started and transform your applications with Vercel's powerful ecosystem:

1.  **Explore AI applications:** Build chatbots, writing tools, generative AI apps, or virtual assistants using tools like [Next.js](https://nextjs.org/) and the [Vercel AI SDK](https://sdk.vercel.ai/docs).
    
2.  **Prototype and collaborate:** Rapidly iterate with our [DX Platform](https://vercel.com/products/previews), featuring powerful tools like feature flags and preview URLs for seamless, low-risk experimentation.
    
3.  [**Quickstart templates**](https://vercel.com/templates?type=ai): Deploy an AI app in seconds with pre-built templates, including a chatbot template to get you started.
    
4.  [**Launch AI projects at scale**](https://vercel.com/blog/how-to-build-scalable-ai-applications)**:** Our fully [managed infrastructure](https://vercel.com/products/rendering) scales effortlessly and delivers ultra-performant experiences for users.
    

Vercel’s story aligns with the broader trends identified in the McKinsey survey, where organizations report both cost reductions and revenue increases in business units deploying gen AI. Our experience demonstrates that when implemented thoughtfully, AI can be a powerful tool for enhancing customer experience while optimizing operational efficiency. Whether you're an AI-first company or looking to enhance existing products, Vercel provides the tools and knowledge to help you revolutionize your customer support and beyond with AI.

[

**Brainstorm with us.**

Whether you've yet to come up with the perfect AI idea or are well into development, our experts can help you optimize your infrastructure for new AI features.

Contact Us



](https://vercel.com/contact/sales)