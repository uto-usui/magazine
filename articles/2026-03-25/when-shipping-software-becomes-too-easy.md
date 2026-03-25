---
title: "When shipping software becomes too easy"
source: "https://blog.mozilla.ai/when-shipping-becomes-too-easy/"
publishedDate: "2026-03-23"
category: "design"
feedName: "Sidebar"
---

AI is changing product development. When building becomes effortless, the real constraint is no longer code. It’s clarity, product judgment, and knowing when the right decision is not to ship yet.

[![Julie Belião](https://blog.mozilla.ai/content/images/size/w160/2024/07/jb.jpeg)](https://blog.mozilla.ai/author/julie/)

![When Shipping Becomes Too Easy](https://blog.mozilla.ai/content/images/size/w1200/2026/03/Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg)

Landscape with the Fall of Icarus, attributed to Pieter Bruegel the Elder (c. 1555). Source: [Bridgeman Art Library](https://commons.wikimedia.org/w/index.php?curid=11974918): Object 3675, Public Domain

### _When the hardest part of building shifts, so does leadership_

We have gotten very good at building software. We have not gotten equally good at deciding what to build, or whether to build it at all. That gap is the most underrated product risk of this moment. A few days ago, my colleague Alejandro explored one side of this in his essay [_Owning Code in the Age of AI_](https://blog.mozilla.ai/owning-code-in-the-age-of-ai/). His core observation is simple but important: code is no longer scarce.

AI systems can generate in minutes what once took days or weeks of engineering work. The constraint is no longer writing code. The constraint is understanding and operating the systems we create. Alejandro argues that engineering ownership is shifting from authorship to stewardship. Engineers may no longer write every line, but they remain responsible for how the system behaves. This perspective echoes ideas long discussed in the Site Reliability Engineering community, where reliability is treated as a property of systems rather than of individual lines of code.

Reading his piece, I kept thinking about the same shift from a product perspective. If code is becoming abundant, shipping is becoming almost effortless. And that changes product management as much as it changes engineering.

Over the past few months, I have noticed something new emerging in many teams: the _high on velocity._ With AI-assisted development and increasingly powerful tooling, features can appear at a pace that would have seemed unrealistic not long ago. Shipping software feels good. It creates momentum and a sense of progress. But speed has a psychological effect: it becomes addictive. The faster a team can ship, the more tempting it becomes to ship again. Over time, velocity gradually becomes the one metric, even when nobody explicitly says it is. And then it becomes self-justifying. Features ship, metrics look good, and the structural problems accumulate little by little, until they don't. The churn that follows is not random. It is the predictable output of a system optimised for the appearance of speed.

The subtle danger is that the ability to produce software faster starts shaping what we choose to build. 

Not necessarily because the ideas are better, but because they are easier to ship. Anyone who has worked in product long enough has seen features shipped quickly and confidently, only for it to become clear weeks later that they were not the right thing to build. As our ability to ship accelerates, the risk is that we multiply these mistakes faster than we multiply good decisions.

There is a narrative emerging that AI will reduce the need for product management. If engineers can prototype quickly and test ideas directly, perhaps the discipline becomes lighter. I increasingly believe the opposite. When the cost of building collapses, the cost of building the wrong thing increases dramatically. If shipping becomes frictionless, the real scarcity moves elsewhere: clarity of intent, product judgment, and long-term coherence. Product management becomes less about leading and coordinating work and more about protecting direction.

There is a question nobody asks out loud enough: who actually has the standing to slow things down? In teams where pressure runs toward shipping, where velocity is visible and quality is diffuse, the answer is often nobody, not because people do not care, but because the incentive structure has no mechanism for the kind of sustained, unglamorous resistance that good product work requires. AI does not create that dysfunction. It removes one of its natural governors: the fact that writing software used to take time. Naming that is a leadership responsibility. It does not fix itself.

One of the tensions I am noticing is that the ability to ship quickly does not reduce the rest of the product work. If anything, it makes it easier to overlook it. Product management is often mistakenly equated with the ability to move features forward and get them released. But much of the work happens elsewhere: making sure users understand what has changed, that support teams are prepared, that pricing and positioning make sense, that the product remains coherent, and ultimately that users trust what has been built. When shipping accelerates, these responsibilities do not disappear. And the risk is not just that users are confused or under-supported. It is that they absorb the cost of your speed, through broken workflows, lost trust, or data they did not expect to expose. That is not a product quality problem. It is an ethical one. 

My friend and former colleague Davide has a name for this dynamic. In a recent [essay](https://blog.datachef.co/product-management-engineering-yes?ref=blog.mozilla.ai), he describes what he calls “product management engineering”: the gradual convergence between product and engineering responsibilities. Product managers increasingly need to understand the systems they guide, while engineers increasingly participate in shaping product decisions. The acceleration brought by AI reinforces this dynamic. If engineers are becoming stewards of system behavior rather than authors of code, product leaders are becoming stewards of the coherence of the systems we build over time. The tools are accelerating. The thinking remains human.

What worries me most about the current moment is not the technology itself, but the culture that may emerge around it. The same velocity that excites product teams also creates pressure to move before we fully understand the consequences of what we are building.

This concern becomes particularly serious when we look beyond consumer software. Over the past months, debates about the integration of AI systems into military infrastructures have intensified, while conflicts around the world continue to escalate. But we do not need to go as far as defense to feel the weight of this. Regulators across every major jurisdiction are already drawing lines, and the contrast between their approaches is instructive.

The [EU AI Act](https://artificialintelligenceact.eu/ai-act-explorer/?ref=blog.mozilla.ai) defines categories of high-risk systems with strict pre-market obligations. In the United States, the absence of a comprehensive federal law has produced a growing patchwork of state requirements, for instance California, Texas, Illinois and others enacted significant AI legislation taking effect in 2026, with over 1,000 AI-related bills introduced across states in 2025 alone. The federal government, meanwhile, is pulling in the opposite direction: Executive Order 14179, issued in January 2025, reoriented U.S. AI policy toward promoting innovation and revoked portions of the Biden administration order that emphasized safety testing and reporting requirements. The result is not deregulation. It is legal uncertainty, which, for a product team, is arguably worse.

Then there is China, which tends to be dismissed in these conversations. It should not be. China recently launched a public consultation on a proposed law on [AI anthropomorphism](https://www.luizasnewsletter.com/p/chinas-approach-to-ai-anthropomorphism?ref=blog.mozilla.ai) that, whatever its political context, is strikingly specific: it defines the risks of emotional dependency, establishes concrete design obligations for providers, mandates mental health protections, and holds providers responsible for the security of their systems across the entire product lifecycle. Whether you agree with the framework or not, it offers something most Western regulation does not yet: clarity about what "responsible by design" actually means in practice.

The question for any product team shipping fast is not which regulatory regime applies to you today. It is whether the decisions you are making now will hold up when the rules catch up. Speed does not suspend legal exposure. In many cases, it increases it. The idea that we can simply "ship fast and iterate" is not just strategically risky. In certain domains, it is no longer defensible, legally or otherwise.

One underrated antidote is simpler than any process: as much as possible, use what you ship. Not as a ritual, but as an operating constraint. If your team cannot or does not use the product they are building in their real work, they have lost something important: the lived experience of what their decisions actually produce. That friction is not a bug. It is a signal. Dogfooding does not slow teams down. It makes the right things visible before users do.

Alejandro concludes that in a world of abundant code, the scarce resource becomes understanding and reliability. I think the same applies to product management. When software becomes easy to build and easy to ship, the scarce resource becomes judgment: the discipline to ask the right questions, to understand the systems we are creating, and sometimes to decide that the most responsible product decision is not to ship something yet. 

Technology is not waiting for us to get comfortable with it. That is not a product management problem. It is a leadership one.