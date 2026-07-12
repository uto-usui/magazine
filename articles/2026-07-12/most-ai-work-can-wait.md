---
title: "Most AI work can wait"
source: "https://tomtunguz.com/ai-execution-routing/"
publishedDate: "2026-07-09"
category: "design"
feedName: "Sidebar"
---

Most teams building agents pick the model first & the architecture second. That is backwards. The model choice is the last decision, not the first.

What matters is the router, a small piece of code that decides which tier of model handles each request. Get the router right & 70-80% of traffic runs on local models that cost nothing per call, or on async models[1](#fn:1) that reduce AI spend by 90%+.

Brian Armstrong made the same point last week about how Coinbase cut AI spend in half while token usage grew[2](#fn:2), paraphrasing :

> How to keep AI spend flat while token usage grows exponentially : not with friction & spend alerts. With better defaults, routing, & caching. Engineers can choose any model they want, but defaults matter.

[![Editorial line illustration of a railway switchyard splitting one incoming track into three diverging tracks past a switch tower](https://res.cloudinary.com/dzawgnnlr/image/upload/w_1512,h_850,c_fill,g_auto,q_auto,f_auto/yosvmwdl3kux5zbw0old)](https://res.cloudinary.com/dzawgnnlr/image/upload/q_auto,f_auto/yosvmwdl3kux5zbw0old)

The routing problem has three layers, and each does a distinct job :

-   **Skill classifier** turns a raw user request into a concrete operation. It answers what the task is. Draft-a-reply, summarize-a-repo, run-a-migration. The classifier is intent recognition.
-   **Router** decides which tier executes the classified operation. It answers which model runs it. The router does not read the prompt. It reads the classifier’s label plus a few features : complexity, context size, historical success rate.
-   **Model selector** picks the cheapest model within a tier that meets a confidence threshold.

[![Agent routing flow diagram : task enters a skill classifier, then a router biased by failure-mode signals fans out to local & async model tiers, with a nightly feedback loop from outcomes back into the router](https://res.cloudinary.com/dzawgnnlr/image/upload/w_1512,h_982,c_fill,g_auto,q_auto,f_auto/zjem5yjwrgocybqwnyui)](https://res.cloudinary.com/dzawgnnlr/image/upload/q_auto,f_auto/zjem5yjwrgocybqwnyui)

Classifier & router are not the same. The classifier is a language problem ; the router is a scheduling problem. Conflating them buries the model choice inside the prompt & kills the ability to A/B different models against the same operation.

Local compute is close to free. Async batch reasoning runs two orders of magnitude cheaper than real-time inference[1](#fn:1). So the real question is narrower : what fraction of work needs real-time answers?

Surprisingly little, once the system can queue work.

Queueing is why this works. A draft reply, a repo summary, a diligence memo, a nightly evaluator run : none of these need to return in a second.

[![Editorial line illustration of a queue of envelopes waiting at a mail slot, with a single orange flag on the front envelope](https://res.cloudinary.com/dzawgnnlr/image/upload/w_1512,h_1512,c_fill,g_auto,q_auto,f_auto/jipgejml7cyos8n7gmm8)](https://res.cloudinary.com/dzawgnnlr/image/upload/q_auto,f_auto/jipgejml7cyos8n7gmm8)

We built the first version of this into our agent runtime. The router already scored tasks on complexity, context size, & local memory retrieval. Two feedback mechanisms now sit on top of the router, & they operate on different time scales :

-   **Synchronous failure-mode signals.** A predictor annotates each incoming route with five features : missing repo context, long dependency chains, risky migrations, security-sensitive prompts, & high-consequence writes.
-   **Nightly closed-loop feedback.** A batch evaluator scores yesterday’s traces overnight & updates the router’s weights, running on [async inference on Sail](https://tomtunguz.com/sail-inference-queue/) to keep the evaluation cost near zero.

The synchronous predictor catches known-hard tasks before they fail. The nightly loop discovers new failure modes the predictor missed.

Once skill distillation flattens the operation set, 70-80% of agent traffic can run on local models[3](#fn:3) for most non-coding work.

The implication : design your system around routing, not around models. Pick your models last.

* * *

1.  [Full Sail on Asynchronous Inference](https://tomtunguz.com/sail-inference-queue/) — the cost delta between real-time & async batch inference. [↩︎](#fnref:1) [↩︎](#fnref1:1)
    
2.  [Brian Armstrong on X](https://x.com/brian_armstrong/status/2070670644577280109) — Coinbase cut AI spend nearly in half while token usage grew, via better defaults, routing, & caching. [↩︎](#fnref:2)
    
3.  [Skill Distillation](https://tomtunguz.com/the-pi-agent-skill-distillation/), [Teaching Local Models to Call Tools Like Claude](https://tomtunguz.com/distilling-claude-into-local-models/), & [The Minimill of AI](https://tomtunguz.com/using-local-ai-to-work-faster/). [↩︎](#fnref:3)