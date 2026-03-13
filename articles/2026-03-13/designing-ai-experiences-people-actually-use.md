---
title: "Designing AI experiences people actually use"
source: "https://buzzusborne.com/writing/designing-ai-for-trust/"
publishedDate: "2026-03-12"
category: "design"
feedName: "Sidebar"
---

##### March, 2026

Over the last year, many of your favorite tools have changed their opening move. Instead of asking for structured input — words, data, a photo, a single red square — they begin with a question. Figma asks:

> “What do you want to make?”

Possibly the most stressful question you can ask a designer.

On the surface, this _looks_ like progress. Seemingly overnight our boring, deterministic interfaces became open-ended conversations — promising greater flexibility, intelligence and capability. But it rarely _feels_ that way in practice.

But **why?**

For decades in SAAS, products reduced ambiguity. Users supplied constrained inputs, and the system handled the output. It’s never been Minority Report cinematic, but it was predictable. By providing predictable environments for manipulating data, users learned by moving things, adjusting variables — and the outcome emerged through interaction. I could take a bunch of numbers, throw it into my reporting tool, and through a bit of trial-and-error could produce a nice looking graph for my accountant.

**AI-first interfaces invert that sequence**.

Now, software asks users to declare intent before exploration begins — to articulate the destination before they hit the road. This is the root of the discomfort — AI represents a _redistribution of cognitive labor_.

My reporting tool now says _“Describe the graph you’d like to create”_ — and in doing so transfers the burden of abstraction onto me. A writing tool that opens with _“What article should we write?”_ assumes the sort of clarity that most creative work simply does not start with. Despite designing for over 20 years, I’ve never been able to describe the outcome on day one.

> “Writing is the process by which you realize that you do not understand what you are talking about. Importantly, writing is also the process by which you figure it out.”

— [FS](https://fs.blog/why-write/)

By placing AI at the front of the experience, many products assume that users know the outcome in advance. But users frequently open tools precisely because they **do not**.

This is where naïve AI feature design has begun to fracture the user experience. Not because AI is inherently bad, but because AI changes who carries the cognitive burden. And when that shift isn’t deliberately designed for, core elements of the experience erode. Treating AI as a feature to bolt on — rather than as a paradigm shift in how work is distributed — had led to these interfaces that ask users questions they cannot reasonably answer.

This tension isn’t anecdotal. Research consistently points to some clear behavioral forces that determine whether AI features survive or fail. Ultimately if we treat AI as a paradigm shift rather than a feature, these forces become useful design constraints which lead to meaningful — and magical — outcomes:

💜 [**Trust**](#trust)  
If users do not trust the AI’s capability — or the company’s stewardship of their data — adoption stalls.

💎 [**Value perception**](#value)  
If users cannot clearly see how the AI’s output improves their outcome better than manual control, motivation disappears.

🧠 [**Effort/Cognitive load**](#value)  
If users must invest additional mental effort to articulate intent, train the system, or verify outputs, the perceived cost of failure increases.

These three forces amplify one another: Low trust increases perceived effort. High effort reduces perceived value. Low value further undermines trust.

![](https://buzzusborne.com/writing/designing-ai-for-trust/img/trust-flywheel.png)

Designing AI into a product isn’t about blindly adding intelligence, it’s about redesigning the human experience around it. If we don’t account for how products can build trust, communicate value, and manage cognitive effort, we won’t create smarter products — we’ll create more stressful ones.

The good news is that solving this problem is far more interesting than bolting a co-pilot onto the interface (which is shockingly difficult to [get right](https://liveblocks.io/ai-agents)).

* * *

## 💜 Trust[Direct link](#trust "Link to this section")

Research consistently shows that when users are required to trust an AI tool before any meaningful interaction, adoption stalls. This is where _“Describe your ideal landing page”_ onboarding experiences fall flat.

Alarmingly, this trust in AI is also declining year over year — both in terms of confidence in output accuracy and in companies’ ethical stewardship of user data. This erosion isn’t limited to consumers, the data shows that its also the case among early adopters and business audiences as well.

DORA’s [Fostering Trust in AI](https://dora.dev/ai/research-insights/trust-in-ai/) report highlights growing skepticism among software engineers, and Salesforce’s [State of the Connected Customer](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/research/State-of-the-Connected-Customer.pdf) report shows that while business users are generally more open to AI than B2C audiences, they also have the lowest tolerance for failure when AI is acting on their behalf.

Users may gladly tolerate AI as a suggestion engine — as a magical addition to an ongoing project — but they are far less tolerant when it becomes an agent. This is because when a product claims it can write, design, code, or decide _for_ the user, the psychological stakes increase.

However, the same research reveals something encouraging. Trust does not always need to precede adoption, it can emerge through usage. Salesforce’s findings show that _“Human validation of outputs is the biggest driver in trusting the outcome, over consistently accurate outputs”_. In other words, users trust systems they can interrogate, shape, and verify. And instead of designing AI products that are **perfect**, we can earn trust by designing experiences that are **controllable**.

As an example, instead of designing a tool that automatically responds to customer support emails, a more trustworthy starting point might look different.

Imagine an AI that drafts a response outline, surfaces relevant customer context, and recommends the most appropriate teammate for follow-up. The human still edits, decides, adds tone and judgment — the AI just accelerates cognition rather than replacing it.

Yes, this type of human-in-the-loop experience is absolutely slower than full automation — but it preserves something more valuable: controllability. As the research shows: Trust forms when users can validate, shape, and override the system while they work. Interaction becomes calibration where confidence builds through use, not through blind trust.

Over time, as that user/AI relationship strengthens, the product may introduce progressively more autonomous options. Delegation becomes possible because it has been earned... you just can’t _start there_.

The key is sequencing. Designing for earned trust through interaction also reduces the need for AI to be perfect. When autonomy is introduced gradually, the cost of failure shrinks. An incorrect suggestion becomes a minor correction _“that’s not how we’d respond”_ is far less costly than an all-out manhunt because an AI replied incorrectly to a high-value customer.

* * *

## 💎 Value perception[Direct link](#value "Link to this section")

If trust determines whether users are willing to invest effort in an AI system, value perception determines whether they engage at all — and whether they return.

The issue is not capability. AI systems are undeniably powerful. The issue is recognizability, and whether the average user can _immediately_ see why an AI feature is worth their time? Importantly, does the perceived effort required to onboard, prompt, validate, and learn the system feel proportionate to the return?

Research consistently shows that perceived _usefulness_ and perceived _ease of use_ are the primary drivers of AI adoption. Notably, perceived ease of use often has a stronger impact than perceived usefulness. In other words, even powerful systems are abandoned if the cost of engaging with them feels ambiguous or high.

This explains why many sophisticated AI tools struggle outside enthusiast circles. It’s also why simpler, more constrained alternatives often proliferate — think MidJourney versus Nano Banana. When effort is unclear, perceived value collapses.

> “We found that perceived ease of use and perceived usefulness were essential determinants for the use of AI technologies, although perceived ease of use had a consistently greater impact on the acceptance of these technologies.”

— [International Journal of Human-Computer Interaction](https://www.researchgate.net/publication/358965857_Trust_in_AI_and_Its_Role_in_the_Acceptance_of_AI_Technologies)

The deeper problem emerges in prompt-first interfaces.

_“Ask us anything about your Inbox.”_ is problematic because the value must be imagined — a cognitively expensive activity that rarely converts. Broad questions require users to simulate a benefit that has not yet been demonstrated.

A more durable approach is to lead with demonstrated value. Instead of asking users what outcome they want, show them a meaningful pattern or insight. Surface a surprising customer trend, highlight a risk or present something concrete and invite exploration from there. Show, don’t tell. Starting with something tangible allows users to form an understanding of a system based on **demonstrated** value, not hypothetical.

From a designer’s perspective, this is where things become interesting. Demonstrating value presents an exciting opportunity to create more responsive interfaces that predict intention before it arrives, and earn trust through interaction. It’s low stakes, high fun — and takes static interfaces into a whole new non-deterministic territory.

* * *

## 🧠 Cognitive effort[Direct link](#effort "Link to this section")

Value is about motivation, effort is about mental energy. Even when users trust an AI system and believe it may be valuable, adoption fails if the mental energy required to shape a desirable outcome is too high. The critical question here is not whether the feature is useful, or even capable — but whether it is cognitively accessible.

Paradoxically, feature complexity isn’t the biggest risk to effort. Tools that require engagement, supplemental documentation, high-touch or integration into existing workflows can be simplified. What cannot be simplified is an empty screen.

Research repeatedly highlights the biggest risk to effort is the blank page. [Nielsen](https://www.nngroup.com/articles/ai-articulation-barrier/) refers to an _"Articulation barrier"_ in unfamiliar, empty interfaces. [Google research](https://pair.withgoogle.com/guidebook/) calls it _“open-intent paralysis.”_ And Microsoft’s UX studies have found that _“unaided, free-form prompting is one of the biggest barriers to mainstream adoption.”_.

The pattern is consistent: ambiguity is expensive.

When the power of a system is hidden behind a blank prompt, effort increases, value perception drops and trust erodes. Users begin to feel that success depends less on the tool and more on their ability to “speak AI.” Most people are not good prompt engineers, so any design that depends on user eloquence is fragile design.

The solution doesn’t require abandoning prompts entirely. Often, it’s as small as structuring them them or sparking excitement and imagination from your users. We’ve seen this evolution in tools like ChatGPT and Gemini — from a blank input field to contextual suggestions, example prompts, and structured starting points.

Compare _“Tell me your credit card categories and I’ll sort your spending.”_ to _“Here are 10 categories people like you typically use. Should I sort your spending into these buckets?”_. The first requires the user to generate structure from scratch, the second proposes structure and invites modification — a subtle shift that dramatically reduces cognitive load.

The same applies to insight notifications and suggestion-driven interfaces. Instead of asking users to imagine what might be valuable — a high cognitive effort activity — our systems can instead optimize for surfacing plausible starting points. Designing interfaces where the user _reacts_ rather than _invents_ doesn’t eliminate work, instead it redistributes cognitive labor. Designing for low effort means absorbing structural thinking into the system rather than demanding it from the user.

* * *

## 💰 Cost of failure[Direct link](#cost-of-failure "Link to this section")

There is an uncomfortable paradox at the heart of powerful AI tooling — even when trust, value perception, and cognitive effort are well balanced.

The first few interactions are often mediocre. Consider your first interactions with a tool like ChatGPT — context is light, and preferences are unclear — so outputs are generic, inconsistent and sometimes wrong. It’s the opposite of the frictionless onboarding growth teams have spent years perfecting. Turns out this distance between mediocrity and magic is a huge barrier for entry for most audiences.

In business tools at some point, it clicks. Context accumulates, patterns emerge and the system improves. With that, trust builds, value becomes obvious and effort feels justified. For users who reach this inflection point, another risk emerges: the **cost of failure**.

Imagine an AI forgetting your name, replying incorrectly to a high-value customer or writing code in the wrong framework — the impact of that mistake depends entirely on how the AI is designed into the product.

As AI becomes more visible and more autonomous, the cost of failure rises. When an AI is acting _for_ a user rather than _with_ them, a single mistake can trigger disproportionate erosion of trust. In high-stakes contexts, failure can cost revenue, reputation, and customer relationships. It’s what makes designing copilots and agents so risky.

By contrast, assistive “background” AI features can carry a much lower cost of failure. An imperfect suggestion can be ignored, inaccuracies can be corrected and misaligned recommendation can become a small calibration, trust-building moment rather than a public error. Users tolerate imperfection when they retain control.

* * *

AI doesn’t simply make products smarter — it redistributes thinking and decision-making between humans and machines. When AI absorbs cognition, it also inherits responsibility. And when it inherits responsibility, the cost of its mistakes rises.

Our job as designers is no longer to blindly add intelligence. It is to design how intelligence behaves. Trust must be earned through interaction. Value must be demonstrated before it is imagined. Effort must be absorbed rather than exported.

* * *

**Sources**  
[How the U.S. Public and AI Experts View Artificial Intelligence](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/04/pi_2025.04.03_us-public-and-ai-experts_report.pdf) _— Pew Research Center (2025)_  
[Trust in AI and Its Role in the Acceptance of AI Technologies](https://www.researchgate.net/publication/358965857_Trust_in_AI_and_Its_Role_in_the_Acceptance_of_AI_Technologies) _— International Journal of Human-Computer Interaction (2022)_  
[Developing trustworthy artificial intelligence: insights from research on interpersonal, human-automation, and human-AI trust](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1382693/full) _— Frontiers in Psychology (2024)_  
[State of the Connected Customer](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/research/State-of-the-Connected-Customer.pdf) _— Salesforce (2024)_  
[The People & AI Guidebook](https://pair.withgoogle.com/guidebook/) _— Google (2026)_  
[State of the Designer 2026](https://www.figma.com/reports/state-of-the-designer-2026/) _— Figma (2026)_

[← All articles](https://buzzusborne.com/writing/)