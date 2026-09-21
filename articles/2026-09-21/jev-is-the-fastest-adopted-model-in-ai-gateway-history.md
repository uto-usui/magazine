---
title: "Jev is the fastest-adopted model in AI Gateway history"
source: "https://vercel.com/blog/ai-gateway-jev-model-launch"
publishedDate: "2026-09-18"
category: "frontend"
feedName: "Vercel"
author: "Amelia Charles"
---

Within 24 hours of launching on AI Gateway, [Jev from TypeSafe AI](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway) reached more than twice as many paid teams as any previous model launch, making it the fastest-adopted model in gateway history.

[Jev](https://vercel.com/i/what-is-jev) passed every other comparison model in its first twelve hours and continued to widen its lead for the rest of the day. By hour 24, nearly 13% of paid teams were using it. That's 2x the GPT-5.6 family and more than 6x Fable 5.1's share.

Jev’s launch shows how quickly a specialized model can find a place in production. Its first-day adoption was unmatched among recent launches; the next test is whether that early adoption lasts.

### [Copy link to heading](#about-jev)About Jev

Jev was introduced on September 15 as a probabilistic decision model designed to support structured decision-making within software. An application sends it context and a set of questions. Jev evaluates those questions in parallel and returns typed choices, scores, or true-or-false answers, along with probabilities.

Unlike the text produced by a general-purpose language model, Jev’s answers come in a format the code can use directly. Developers can use it to:

-   choose an agent’s next tool or subagent
    
-   decide whether a workflow should continue, retry, ask the user, or stop
    
-   score urgency or risk before taking an action
    
-   verify model outputs, enforce guardrails, or send uncertain cases for human review
    

In its own workflow evaluations, TypeSafe AI reports that Jev was up to 194 times faster and 445 times cheaper than language models.

See the [September AI Gateway Production Index](https://vercel.com/blog/ai-gateway-production-index-september-2026) for more model usage data, or [try Jev](https://vercel.com/ai-gateway/models/jev) through AI Gateway and build with the [AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk).