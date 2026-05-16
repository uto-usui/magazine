---
title: "The duality of language models in the browser"
source: "https://daverupert.com/2026/05/small-language-models-in-the-browser/"
publishedDate: "2026-05-15"
category: "design"
feedName: "Sidebar"
---

I have complex feelings about Generative AI but one area I find myself weirdly bullish on is small language models (SLMs) in the browser which are available in [Chrome](https://developer.chrome.com/docs/ai/built-in/overview) and [Edge](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/prompt-api) behind an experimental flag.

_I know, I know._  
_I know._

AI in the browser reeks of a product manager trying to hit a KPI to shoehorn AI into everything. I understand if you read the phrase “AI in the browser” and involuntarily threw up on your keyboard, said “Fuck this”, and then closed this tab. I will not hold that against you. For the rest of you, hear me out…

There’s an “Always bet on the Web” quality to the idea of browser-based models that I appreciate. There’s a self-hosted vibe to it. I shouldn’t have to pay a billionaire each month to summarize an email or generate [a picture of myself with ultra-white teeth](https://cdn.daverupert.com/photos/ultrawhite.jpg), doubly-so when they’re selling our regurgitated data back to us. Those gimmicky use-cases or even the more practical-yet-often-[purple-washed](https://www.thedrum.com/industry-insight/avoiding-purple-washing-how-to-be-authentic-about-disability-inclusion) “AI for accessibility” use-cases should fall under the Web’s umbrella of universal access.

I like that nobody expects much from them. To the hyper-scalers SLMs will always be the shittier version of LLMs so they’re basically ignored. They dodge the whole “model get better” hype-chamber because they don’t economically depend on the [hopium](https://www.urbandictionary.com/define.php?term=Hopium) that response quality will get better in the next version. Ironically, there was a breakthrough in small language models last month[1](#fn1), but [it barely got a mention on The Verge](https://www.theverge.com/ai-artificial-intelligence/901313/googles-turboquant-algorithm-aims-to-slash-ai-memory-usage).

While small models will never compare to their larger siblings, what they can do is generate pure and unadulterated slop examples of what the technology can do without a data center’s worth of gigaflorps burning a hole in the sky. Small language models generally…

-   Cost less energy to train and run[2](#fn2)
-   Are local, offline, and private[3](#fn3)
-   Have a higher probability of ethically-sourced content[4](#fn4)
-   Are free to use and don’t charge per-token[5](#fn5)
-   Tend to be open-source/weights.
-   Don’t require a backend server or API keys.

So… _if there’s a there-there_ with AI (interpret that how you wish) an ecosystem of small, private, specialized in-browser models seems beneficial. Ideally small models could cover most use-cases outside of long-running workloads that require extremely large context windows. I think electric cars might be a good analogy here; they solve most daily commuting needs at a fraction of the carbon cost. That seems like a win. It’s hard to know for sure, but I reckon I don’t need a one trillion parameter model to fix some red squiggles in my code editor.

I’ve been exploring the Prompt, Summarizer, and Rewriter APIs in Edge to explore some ideas that fit within the generative space. What I’m learning is that you can make a decent, compelling prototype with an in-browser model for free in a CodePen and that’s kind of neat. It stands to reason that scaling up to a large language model might make that idea even better… or not but it cost me nothing to develop. Doing the inverse is much harder; reducing the cost of million context token required workflows is nigh impossible.

The approachability of the Prompt API is great and it demystifies a bit of how LLMs work under the hood. It’s all client-side, no server involved. You pass a prompt to a `prompt()` method and get a response back. No third-party calls, no API keys, no “Please do not share secrets” in a markdown skill.

That bar lowering is something I’m excited about… but that said…

## The arguments against in-browser AI…

Last week [Mozilla posted their negative standards position](https://github.com/mozilla/standards-positions/issues/1213#issuecomment-4347988313) on in-browser AI after Chrome’s Intent-to-Ship hit the email list. They listed three primary areas of concern:

-   Single model calcification - Website authors fine tuning prompts for Google’s model, a reboot of the Chrome-only websites problem.
-   Model neutrality - Google’s TOS becomes the de-facto TOS for all other user agents.
-   Overstated developer position - An issue with Google citing themselves in their explainer.

Despite my positive sentiment from my little experiments, I agree with Mozilla’s position.

I think the model calcification issue is a real problem to consider. The APIs are generic enough but as Jake mentioned in the issue people will tune prompts to work around model quirks. Given Chrome’s dominance, that’s Google’s model quirks. And Google’s model may change, inheriting new quirks that require we update our [magic words](https://daverupert.com/2026/02/magic-words/). Good standards avoid breaking changes and I don’t see the plans to prevent those in such an evolving landscape.

AI in the browser is essentially a brand new “engine” we’re hot-dropping into in the HTML, CSS, and JavaScript stack; an engine which depending on the model can behave wildly different and give incorrect responses. It’s worth having a big gory discussion on whether it makes sense –at all– to standardize anything around any service/tool that is inherently unpredictable and often flaky. Small language models exacerbate the accuracy problems to the extent that they probably don’t meet the [responsible AI considerations](https://huggingface.co/microsoft/Phi-4-mini-instruct#responsible-ai-considerations) a chatbot needs… which is the core use-case for something like the Prompt API.

I am not a lawyer, but Google’s _[Generative AI Use Policy](https://policies.google.com/terms/generative-ai/use-policy)_ seems weak and is basically “Pweeeze don’t do iwwegal fings.” Unironically, the list of prohibited uses reads like a writeup of areas where AI has been found to be super effective. You could convince me it’s a point-by-point breakdown of xAI’s entire product roadmap for building a Mecha Hitler.

Another issue is that while I said in-browser models tended to be “free and private”, that comes with an enormous caveat. In-Browser AI is a free and private API… if you can afford a decent device with a GPU. Otherwise, it depends on someone-else’s computer. That seems to violate the principle of universal access.

So, yeah. I’m bullish, but also have concerns. If I were to offer an alternate proposal, it would have the following requirements:

-   Ensure private capital spend is not conflated with user demand.
-   Ensure we’re not king-making or entering a model monopoly by preserving model diversity.
-   Require a bring-your-own (ethically-sourced) SLM marketplace solution where consumers have model choice like they do browser choice.
-   Create tooling to build your own ethically-sourced SLM on consumer grade hardware that integrates with the browser APIs.
-   Create access and APIs for in-browser safety classifiers.
-   Create a stronger fallback story for unsupported devices: even smaller models, free cloud servers, or cheap-to-self-host VMs with isomorphic APIs.
-   If model foundries cannot solve accuracy problems or models cannot meet the requirements of a shared responsible AI framework, create clear spec-level guidance on areas where you “[MUST NOT](https://www.rfc-editor.org/rfc/rfc2119)” use this API.
-   If model foundries cannot solve accuracy problems or models cannot meet the requirements of a shared responsible AI framework, consider abandoning the spec entirely until the underlying technology progresses.

These are the improvements I’d like to see. This probably takes the spec beyond the realm of a paper thin JavaScript API for interacting with local models. But as stated above, I think this is more than a small API surface, this is adding a new non-deterministic guess-o-matic in the browser. The field of AI –while popular in private capital markets– is still a bit unproven in its economic viability and its future is far from certain. We should tread lightly here.

1.  In March 2026, Google introduced “[Turboquant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/)”, a data compression method which shrank model size, memory usage, and increased quality. [↩](#fnref1)
    
2.  One post I read said you could train an SLM in hours on a single consumer GPU. The ecological comparison of a couple rounds of Fortnite. That said, the [model card for Phi-4](https://huggingface.co/microsoft/phi-4) (the model used in Edge) says it took 1,920 H100 GPUs a total of 21 days to train the model. That’s faster than a large language model, which can take months, but much more than a couple hours. [↩](#fnref2)
    
3.  They are private in the sense they do not “phone home” to a parent server on every request. I assume apps will store conversations and telemetry. [↩](#fnref3)
    
4.  Apologies for being hand-wavy here. I’m making an assumption SLMs can use “the legal parts” of [Common Crawl](https://commoncrawl.org/) but I’m not an expert here. [↩](#fnref4)
    
5.  Free… except that it does require a decent computer with enough RAM and an on-device GPU. [↩](#fnref5)