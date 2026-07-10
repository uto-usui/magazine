---
title: "The Pulse: What can we learn from Bun’s rapid Rust rewrite with AI?"
source: "https://newsletter.pragmaticengineer.com/p/the-pulse-what-can-we-learn-from"
publishedDate: "2026-07-09"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_The Pulse is a series covering events, insights, and trends within Big Tech and startups. Notice an interesting event or trend? Hit reply and share it with me._

Today, we cover:

1.  **Bun’s Rust rewrite with Fable: what can we learn?** To a sceptic, spending $165K to migrate Bun from Zig to Rust sounds very expensive. But to a realist, shortening a 1-2 year migration down to 11 days opens amazing new opportunities for devs. However, a thoroughly-tested project is required to pull it off.
    
2.  **Anthropic’s Fable, OpenAI’s GPT-5.6 Sol, Cursor’s Grok 4.5, Meta’s Muse.** Coding LLM wars heat up: Fable is back, OpenAI releases a comparable GPT-5.6 Sol, Cursor offers cheap & very capable Grok 4.5, and Meta is back with its first truly competitive coding model since Llama 3. But how did Gemini slip out of the top-ranked AI coding models?
    
3.  **North Korean hackers keep trying to infiltrate full-remote companies.** The founder of a Canadian digital consultancy caught a North Korean dev red-handed, using an AI filter. These events are now so common that it’s hard to trust remote interviewees are who they claim.
    
4.  **Industry Pulse.** Meta’s key logging exposed sensitive data, massive cuts at Xbox, Meta could not buy enough AI capacity from Google, Qualcomm acquires Modular, and memory price hikes hit Apple products.
    

Last week in San Francisco, I met Jarred Sumner, creator of JavaScript runtime, Bun, and was keen to learn more about the rewrite of Bun from Zig to Rust. But at the time, Jarred didn’t want to say too much, as the tool used for the migration, Fable, was out of action due to the US government imposing export controls.

[

![](https://substackcdn.com/image/fetch/$s_!QJQi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5ab56f7-62fb-45ea-a522-4617130a3f61_2048x1379.png)

](https://substackcdn.com/image/fetch/$s_!QJQi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5ab56f7-62fb-45ea-a522-4617130a3f61_2048x1379.png)

_Jarrod and I at Anthropic’s HQ, last week_

Fortunately, the situation is now resolved and Fable is available globally, and Jarred has published a detailed [post about the project.](https://bun.com/blog/bun-in-rust) Before we get into the migration, some context: