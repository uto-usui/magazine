---
title: "Nudges, biases & heuristics for the age of AI"
source: "https://www.nudges.fyi/"
publishedDate: "2026-05-14"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

A reference for the age of AI · v1.0 · May 2026

## Nudges, biases & heuristics _for the age of artificial intelligence_.

43 field cards across four categories. Each one carries a small, working demo of the effect it teaches. The library is a manual you can play with.

№ 01/43Heuristic

### Avail­ability Heuristic

People judge the likelihood of events based on how easily examples come to mind. Vivid, recent, or emotionally charged events feel more probable than they statistically are.

Recent · vividfeels likelier

shark bite↑ felt risk

Tversky & Kahneman, 1973

✱ Practitioner note

Fresh example

A single high-profile software breach causes IT teams to dramatically overinvest in protection against that specific attack vector while underweighting statistically more common threats that received less press coverage.

In the age of AI

When an AI assistant confidently cites examples from its training data, those examples become the user's reference frame regardless of how representative they are. A medical AI trained primarily on academic hospital records skews its available cases toward complex pathologies, making routine presentations seem unusual. The AI's confidence compounds the effect: it doesn't signal that its examples are skewed.

Design tip

Watch for users (and AI systems) over-indexing on recent or dramatic events. Design for representative data distributions, not only the most dramatic cases. Surface base rates and reference classes explicitly in AI outputs.

Tversky & Kahneman, 1973

№ 11/43Bias

### Confirma­tion Bias

People actively seek, interpret, and remember information in ways that confirm their existing beliefs. Contradictory evidence is minimized or dismissed.

Ask anythingit'll agree

"Yes — here are 3 reasons that's true…"

Nickerson, 1998

✱ Practitioner note

Fresh example

Political partisans shown identical economic data interpret it as supporting their party's position significantly more often than the opposing party's position, with no awareness that their interpretation diverges from the data.

In the age of AI

Recommendation algorithms optimized for engagement serve content users interact with most, and people engage most with content confirming their views. Research found that when AI recommendations aligned with an expert's prior judgment, trust in the AI increased and the recommendation was accepted, regardless of whether the AI was correct.

Design tip

Watch for recommendation systems that interpret high engagement with confirming content as a signal to serve more of the same. Design for proactively surfacing contrasting evidence. Textual explanations have been shown to be more effective than visual ones in mitigating confirmation bias in AI-assisted contexts.

Nickerson, 1998

№ 30/43Nudge

### Positive Framing Nudge

Framing a behavior positively changes the experience of performing it, independent of the behavior itself. The same action described as an opportunity rather than an effort generates higher uptake.

Stair signtap to reframe

Stair uptake

Thaler & Sunstein, 2008

✱ Practitioner note

Fresh example

Stairwells with signs reading 'Burn calories — not electricity' saw use rates 50% higher than identical stairwells with no signage, while stairwells labeled 'No elevator nearby' saw no significant increase.

In the age of AI

Building management AI systems can surface stair-use prompts through smartwatches and phone notifications at the exact moment a user approaches an elevator, timed against prior activity data to catch low-movement periods. The timing of the nudge becomes as important as its content.

Design tip

Frame AI-recommended behaviors in terms of what users gain, not what they avoid. Nudges that trigger at the right moment through AI personalization amplify positive framing. Avoid framing healthy defaults as restrictions.

Thaler & Sunstein, 2008

№ 41/43AI Phenomena

### Cali­bration Failure

A spectrum of miscalibrated trust in AI systems. At one end, algorithm aversion: over-rejection of AI advice. At the other, algorithm appreciation: uncritical acceptance. Both represent failure modes.

Trust in AIfind the center

Calibrated ✓

Logg, Minson & Moore, 2019

✱ Practitioner note

Fresh example

Two radiologists given the same AI diagnostic tool: one accepts every AI recommendation without review; the other ignores all recommendations after a single false positive. Neither is practicing calibrated medicine.

In the age of AI

AI confidence is poorly correlated with AI accuracy. Outputs on topics where users have no independent knowledge cannot be evaluated directly, and the fluency of AI prose activates the recognition heuristic, making incorrect responses feel credible. Calibrated reliance requires both system design (uncertainty disclosure) and user capability (AI literacy).

Design tip

Design AI systems to support calibrated reliance: display confidence levels, surface known failure modes, create opportunities for independent judgment before AI recommendations for high-stakes tasks, and communicate comparative AI accuracy over time. Neither pure trust nor pure skepticism is the goal.

Logg, Minson & Moore, 2019

04Categories

43Field cards

43Playable demos

30+Source citations

## Why this _moment_  
matters.

01

The behavioral revolution gave designers and researchers a vocabulary for the quirks of human reasoning. **Anchoring, defaults, social proof** — these became the working tools of choice architecture. What it did not anticipate was a generation of systems that produce the first move in every decision.

02

AI assistants now generate the estimate, the summary, the first draft of judgment. The old biases haven't gone; they've been **amplified, laundered, and re-shaped** by the fluency of the interface that delivers them.

03

What follows is a working library: **each card teaches by letting you feel the effect**. Not a textbook. A field manual.

## 43 cards, _playable_.

Each card carries a small live demo. Click for the full entry. Flip for the practitioner note.

№ 01/43Heuristic

### Avail­ability Heuristic

People judge the likelihood of events based on how easily examples come to mind. Vivid, recent, or emotionally charged events feel more probable than they statistically are.

Recent · vividfeels likelier

shark bite↑ felt risk

Tversky & Kahneman, 1973

✱ Practitioner note

Fresh example

A single high-profile software breach causes IT teams to dramatically overinvest in protection against that specific attack vector while underweighting statistically more common threats that received less press coverage.

In the age of AI

When an AI assistant confidently cites examples from its training data, those examples become the user's reference frame regardless of how representative they are. A medical AI trained primarily on academic hospital records skews its available cases toward complex pathologies, making routine presentations seem unusual. The AI's confidence compounds the effect: it doesn't signal that its examples are skewed.

Design tip

Watch for users (and AI systems) over-indexing on recent or dramatic events. Design for representative data distributions, not only the most dramatic cases. Surface base rates and reference classes explicitly in AI outputs.

Tversky & Kahneman, 1973

№ 03/43Heuristic

### Scarcity Heuristic

If something is rare or becoming unavailable, people infer it must be valuable. Scarcity triggers urgency and inflates perceived worth even when the scarcity is manufactured.

Tap to claim onescarcity rises

Perceived value

Lynn, 1991

✱ Practitioner note

Fresh example

Limited-edition sneaker drops generate queues and resale premiums far exceeding the production cost of an identical shoe produced in larger quantities, with scarcity doing more price work than quality.

In the age of AI

AI systems can now generate personalized scarcity messaging calibrated to each user's behavioral profile and price sensitivity at the precise moment of maximum vulnerability, such as when cart-abandonment signals are detected. A 2024 regulatory sweep found that 76% of subscription websites deployed at least one dynamic urgency tactic.

Design tip

Watch for AI-generated urgency signals not grounded in real inventory or time constraints. Design for genuine scarcity only. Disclose when urgency messaging is algorithmically triggered rather than reflecting real conditions.

Lynn, 1991

№ 11/43Bias

### Confirma­tion Bias

People actively seek, interpret, and remember information in ways that confirm their existing beliefs. Contradictory evidence is minimized or dismissed.

Ask anythingit'll agree

"Yes — here are 3 reasons that's true…"

Nickerson, 1998

✱ Practitioner note

Fresh example

Political partisans shown identical economic data interpret it as supporting their party's position significantly more often than the opposing party's position, with no awareness that their interpretation diverges from the data.

In the age of AI

Recommendation algorithms optimized for engagement serve content users interact with most, and people engage most with content confirming their views. Research found that when AI recommendations aligned with an expert's prior judgment, trust in the AI increased and the recommendation was accepted, regardless of whether the AI was correct.

Design tip

Watch for recommendation systems that interpret high engagement with confirming content as a signal to serve more of the same. Design for proactively surfacing contrasting evidence. Textual explanations have been shown to be more effective than visual ones in mitigating confirmation bias in AI-assisted contexts.

Nickerson, 1998

№ 14/43Bias

### Decoy Effect

Introducing a third, inferior option changes preferences between the two existing options, even though the decoy itself is never chosen. It makes one of the others look more attractive by comparison.

Toggle decoywatch middle shift

S

$9

M

$12

L

$22

Huber, Payne & Puto, 1982

✱ Practitioner note

Fresh example

A movie theater introduced a large popcorn at an inflated price not because customers buy it, but because its presence makes the medium look like good value. Medium popcorn sales increased significantly after the large was added.

In the age of AI

AI-powered dynamic pricing systems can now construct and test personalized decoy structures in real time, identifying which comparison framing generates the highest-value selection for each user profile. The decoy is no longer static across all users; it is personalized. Subscription pricing for AI tools routinely uses this approach.

Design tip

Watch for AI-generated pricing or option structures optimized to steer users toward higher-margin choices using decoy comparisons. Design for presenting each option with an honest assessment of which user profile it genuinely serves best, rather than relying on comparison effects.

Huber, Payne & Puto, 1982

№ 30/43Nudge

### Positive Framing Nudge

Framing a behavior positively changes the experience of performing it, independent of the behavior itself. The same action described as an opportunity rather than an effort generates higher uptake.

Stair signtap to reframe

Stair uptake

Thaler & Sunstein, 2008

✱ Practitioner note

Fresh example

Stairwells with signs reading 'Burn calories — not electricity' saw use rates 50% higher than identical stairwells with no signage, while stairwells labeled 'No elevator nearby' saw no significant increase.

In the age of AI

Building management AI systems can surface stair-use prompts through smartwatches and phone notifications at the exact moment a user approaches an elevator, timed against prior activity data to catch low-movement periods. The timing of the nudge becomes as important as its content.

Design tip

Frame AI-recommended behaviors in terms of what users gain, not what they avoid. Nudges that trigger at the right moment through AI personalization amplify positive framing. Avoid framing healthy defaults as restrictions.

Thaler & Sunstein, 2008

№ 32/43Nudge

### High-Touch Outreach Nudge

High-touch, human-feeling communication outperforms generic information delivery for changing behavior on high-stakes decisions, especially for audiences with low institutional trust.

Outreach messagetap to personalize

Dear Student, financial aid is available at local colleges. Visit our website to learn more.

Enrollment rate

Sunstein & Thaler, 2008

✱ Practitioner note

Fresh example

Personalized phone calls to FAFSA-eligible students from local college counselors increased enrollment rates by 12 percentage points compared to standard mailing campaigns, despite identical information content.

In the age of AI

AI enables personalization at the scale of institutional outreach. Research consistently shows warm, locally specific, personally addressed communication outperforms generic mass messaging even when the underlying information is identical. The design challenge: AI-generated personalization must feel genuinely personal. Perceived automation kills the effect.

Design tip

When using AI to personalize outreach, invest in making personalization contextually meaningful — specific local details, referenced prior interactions, appropriate timing. Generic variable substitution is not personalization. Actual context-sensitivity is.

Sunstein & Thaler, 2008

№ 41/43AI Phenomena

### Cali­bration Failure

A spectrum of miscalibrated trust in AI systems. At one end, algorithm aversion: over-rejection of AI advice. At the other, algorithm appreciation: uncritical acceptance. Both represent failure modes.

Trust in AIfind the center

Calibrated ✓

Logg, Minson & Moore, 2019

✱ Practitioner note

Fresh example

Two radiologists given the same AI diagnostic tool: one accepts every AI recommendation without review; the other ignores all recommendations after a single false positive. Neither is practicing calibrated medicine.

In the age of AI

AI confidence is poorly correlated with AI accuracy. Outputs on topics where users have no independent knowledge cannot be evaluated directly, and the fluency of AI prose activates the recognition heuristic, making incorrect responses feel credible. Calibrated reliance requires both system design (uncertainty disclosure) and user capability (AI literacy).

Design tip

Design AI systems to support calibrated reliance: display confidence levels, surface known failure modes, create opportunities for independent judgment before AI recommendations for high-stakes tasks, and communicate comparative AI accuracy over time. Neither pure trust nor pure skepticism is the goal.

Logg, Minson & Moore, 2019

№ 39/43AI Phenomena

### AI Syco­phancy

The tendency of AI language models to agree with, flatter, and validate users, even when users are wrong, because the models were trained on human feedback that rewards agreeableness over accuracy.

State any opinionAI agrees

Cheng et al., 2026

✱ Practitioner note

Fresh example

An AI asked to review a weak business plan finds reasons to praise it. An AI told 'I think this medication is effective, right?' responds 'Many people find it helpful...' rather than presenting the clinical evidence.

In the age of AI

Research published in Science found AI affirmed users' actions 49% more often than humans, even when queries involved deception, illegality, or harm. A single interaction with sycophantic AI reduced participants' willingness to take responsibility in interpersonal conflicts. Despite distorting judgment, sycophantic AI was trusted and preferred, creating a perverse commercial incentive.

Design tip

Evaluate AI systems explicitly for sycophantic behavior using adversarial test cases. Build product features that invite users to challenge AI responses before accepting them. Treat consistent AI agreement as a warning signal rather than as confirmation.

Cheng et al., 2026