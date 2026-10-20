---
title: "Personal agents are getting their own computers"
source: "https://marcabraham.com/2026/10/15/personal-agents-are-getting-their-own-computers/"
publishedDate: "2026-10-19"
category: "design"
feedName: "Sidebar"
---

A few weeks ago I wrote about [Grok Bot](https://marcabraham.com/2026/08/16/grok-bot-product-review/), sharing what I learned from using it to manage my calendar and handle tasks. Since then, personal agents have moved on quickly. The question is no longer whether an agent can answer my questions. It’s whether I’m willing to let it act on my behalf.

**Agents that do the work**

A few weeks ago I wrote about GrokBot, sharing my first learnings from using this personal agent

[![](https://marcabraham.com/wp-content/uploads/2026/10/img_3843.png?w=472)](https://marcabraham.com/wp-content/uploads/2026/10/img_3843.png)

**Image Credit:** screeenshot

I’ve been using [Instinct](https://instinct.co/) alongside Grok Bot. It’s a WhatsApp-based personal assistant from the San Francisco startup of the same name. I like that I don’t have to learn a new way of communicating, and it’s useful that it flags things I’d otherwise miss, such as calendar changes or potential security issues. The moment that stuck with me was when it spotted an email where I’d quoted a meeting date that didn’t match the calendar invite, then asked which date I meant.

[![](https://marcabraham.com/wp-content/uploads/2026/10/meta-muse-the-ai-assistant-zuckerberg-has-described-for-v0-v7tx4z8fasoh1.webp?w=1024)](https://marcabraham.com/wp-content/uploads/2026/10/meta-muse-the-ai-assistant-zuckerberg-has-described-for-v0-v7tx4z8fasoh1.webp)

**Image Credit:** [r/MetaAI on Reddit](https://www.reddit.com/r/MetaAI/comments/1wd0kod/meta_muse_the_ai_assistant_zuckerberg_has/)

Meta’s [Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/), announced last month, takes a different approach. Meta positions it as an agent that does the work rather than simply answers questions. It runs on what Meta calls a Muse Secure VM, a dedicated virtual machine with its own browser, where the agent lives and where your data and the credentials for connected services are stored. You can message it in the Muse app or in WhatsApp, so there’s no new interface to learn.

The real shift is that Muse keeps working after you close the app. It comes back when something changes, or when it needs your approval, such as before it sends an email or makes a purchase. Instead of waiting for a prompt, the agent works in the background and only interrupts you when it has to.

**Once it can act, it needs to pay**

Muse checks out using [Link,](https://docs.stripe.com/agentic-commerce/agents/link-agent-wallet) Stripe’s wallet for agents. Link generates a one-time-use card so your real card details stay hidden, and Meta says Muse is the first AI agent covered by Link’s purchase protections. Other launches, including OpenAI’s [Dots](https://openai.com/index/introducing-dots/) and Manus [Cue](https://manus.im/blog/introducing-manus-2-0), are heading in a similar direction, but I’d check the detail of each before relying on it.

[![](https://marcabraham.com/wp-content/uploads/2026/10/screenshot-2026-10-07-at-07.40.10.png?w=1024)](https://marcabraham.com/wp-content/uploads/2026/10/screenshot-2026-10-07-at-07.40.10.png)

**Image Credit:** [OpenAI](https://openai.com/index/introducing-dots/)

Handing an agent your money and your inbox is a big ask, so trust has to be designed in. Meta says a separate agent it calls Sentinel runs on the same machine, and nothing Muse sends to the internet goes out unless Sentinel approves it. Muse also says it can’t see your passwords or payment methods, and that you decide how much access it gets. For email, you choose whether it can read your mail or also send on your behalf.

Memory cuts both ways. Muse remembers what matters to you, and you can ask it to forget specific things. Amazon’s About You page, which shows shoppers what it has inferred about them, has shown how unsettling a profile can feel when you can add or delete entries but can’t switch the feature off.

**Agents on the other side of the counter**

Whether a business welcomes an agent often comes down to how it earns money. Pure e-commerce sites mainly want the customer’s payment, so they’re likely to be more receptive. Advertising-funded businesses such as publishers, social platforms and search engines are more wary, because agents can bypass the attention their ads depend on. Amazon sits in between: it’s a retailer, but it earns heavily from the ads its sellers buy.

Commerce platforms are building agents too, but mostly for the seller’s side. TikTok has announced [Shopping Assistant,](https://newsroom.tiktok.com/tiktok-unveils-ai-powered-updates-for-advertisers-driving-discovery-action-and-measurable-business-outcom) which answers product questions and completes the order in the same chat, and Buy Direct, a checkout built into the For You feed. These are agents that sell to you, not agents that work for you. That difference is exactly why businesses need a way to recognise the agent on the other end.

[![](https://marcabraham.com/wp-content/uploads/2026/10/screenshot-2026-10-10-at-06.26.50.png?w=1024)](https://marcabraham.com/wp-content/uploads/2026/10/screenshot-2026-10-10-at-06.26.50.png)

**Image Credit:** [Sierra](https://sierra.ai/blog/introducing-personal-agent-protocol)

That’s the job of the [Personal Agent Protocol](https://sierra.ai/blog/introducing-personal-agent-protocol), an open standard introduced by Sierra and Meta. Launch partners include Walmart, Shopify and Stripe. Sierra’s co-founder [Bret Taylor](https://www.linkedin.com/in/brettaylor/) compares it to signing into websites with your Google or Facebook account. Three things stand out:

-   **Guest first, signed in when needed:** An agent can start as a guest to check stock or read a return policy, then sign in for account tasks such as changing an order or booking an appointment. The company always knows it’s an agent.
-   **Access chosen by the customer, rules set by the business:** You choose read-only or write access. The business decides which actions an agent can take and where it can enter, whether that’s its website, its APIs or its own customer service agent. The agent can use the website with permissions applied, connect to APIs via OpenAPI or MCP, or go straight to the company’s own agent.
-   **One continuous session:** The visit stays linked as the agent moves from guest to signed-in customer and across channels, so the business sees a real customer rather than a string of anonymous bot requests. The same token works on the website, the APIs and the company’s own agent, so everything before and after sign-in counts as one visit.

Interestingly, payments aren’t part of the protocol yet. Buying without an agent handling card numbers is listed as a future extension.

**What this means for product managers**

For those of us building products, permissions are becoming part of the product itself. The question isn’t just “can the agent do this?” It’s “how much should a user trust it to do this, and what happens when it gets it wrong?” Approval steps, access levels and audit trails are design decisions, and so is what a business allows an agent to do on its site.

I see a business question underneath that too. When you design for an agent-driven world, one of the first things to ask is how the sites your users rely on make their money, because that tells you how likely they are to welcome the agents acting for your customers. For example, I’ll often ask the question “If an agent completed this journey for a customer, what would we lose and what would we gain?”

**Main learning point:** Personal agents are shifting from answering questions to doing the work for us, which moves the product challenge from capability to trust. The teams that win will be the ones that design clear permissions, approvals, guardrails and audit trails from the start.

**Related links for further learning:**

1.  [https://sierra.ai/blog/poppy](https://sierra.ai/blog/poppy)
2.  [https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact](https://decagon.ai/blog/introducing-the-personal-agent-consent-trust-protocol-pact)
3.  [https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
4.  [https://maarket.ai/blogs/best-personal-ai-agents](https://maarket.ai/blogs/best-personal-ai-agents)