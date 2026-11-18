---
title: "Do AI and Human Moderators Uncover the Same Facts?"
source: "https://measuringu.com/do-ai-and-human-moderators-uncover-the-same-facts/"
publishedDate: "2026-11-17"
category: "ux-research"
feedName: "MeasuringU"
author: "Jeff Sauro, PhD • Lucas Plabst, PhD • Eva Sundberg, MPH • Jim Lewis, PhD"
---

[![Feature image](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMDAgMTY5Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/11/111726-FeatureImage1.jpg)With participant time being so precious, you want to be sure you get the most out of each session.

How do you know if a moderator missed something?

It’s usually hard to know what was missed, which makes measuring the [effectiveness of moderators](https://measuringu.com/what-makes-a-good-ux-research-moderator/) (both human and AI) difficult.

We’ve made a first pass at measuring the effectiveness of AI moderators. We ran a study for a fictitious tech company looking to develop a new sleep technology by interviewing people about their sleep habits.

We compared AI to human moderators in a randomized study of 20 participants. Both human and AI moderators used the same discussion guide to identify pain points. In that study, we found [participants said a lot less to the AI](https://measuringu.com/do-participants-say-less-to-ai-than-to-human-moderators/). AI sessions were 37% shorter, and participants spoke 45% fewer words per minute. When two researchers coded the transcripts for themes, [human sessions averaged 6.9 of eight themes vs. 5.0 for AI sessions](https://measuringu.com/do-participants-provide-the-same-depth-of-insight-to-human-and-ai-moderators).

For themes that the discussion guide asked about, AI sessions trailed human sessions by about 8 points. For the two themes it didn’t ask about, the gaps were about 30 and more than 70 points. The biggest miss was a theme on sleep climate (temperature and noise), which came up in most human sessions but in almost no AI sessions.

But themes themselves aren’t objective. Coders decide what counts as a theme, and agreement among the coders was only fair to moderate. For a harder (and more objective) test, we need external facts we already know about each participant that the moderators don’t know.

Fortunately, we have access to such facts from the screener we used to recruit participants. Before their sessions, every participant completed a short screening survey that asked about their devices, pets, children, sleep aids, what they eat and drink, and where and how they live. We intentionally withheld that information from the human and AI moderators.

In this study, we describe how we used this screener data to see how well AI and human moderators could surface these known but undisclosed self-reported facts (many of which are relevant to the research goals). We cover the following research questions:

-   How many screener facts surfaced in AI vs. human sessions?
-   Which kinds of facts did each moderator miss?
-   Does the gap depend on whether the discussion guide covered the topic?
-   Is the gap simply a byproduct of longer human sessions?
-   Did moderators draw out these facts, or did participants volunteer them?

## Experimental Study Setup

We built our AI moderator with Gemini 3 Flash using photorealistic avatars and voices of two MeasuringU researchers—the same researchers who moderated the human sessions. Twenty Denver-area participants came to our lab and were randomly assigned to an AI or human moderator (ten each). Both AI and human moderators followed the same five-prompt discussion guide for a fictitious company developing a wake-up and sleep product, and both were told to probe beyond the guide whenever it served the research goals. The full guide is in the [appendix of the previous article](https://measuringu.com/do-participants-provide-the-same-depth-of-insight-to-human-and-ai-moderators).

The screener asked participants to check what applied to them in six [select-all-that-apply](https://measuringu.com/sata-vs-yes-no-forced-choice/) questions (consumption in the last two weeks, devices owned, pets, children living at home, use of sleeping aids like drugs or vitamins, and things used before or while sleeping like earplugs or eye masks). Two open-ended questions asked about living situation and, for people who tracked their sleep, the tracking device. That produced 256 known facts: 126 among AI-moderated participants and 130 among human-moderated participants (12.6 vs. 13.0 per person, nearly equal). The counts differ slightly only because participants differed in what they selected.

Neither the human nor the AI moderators saw the screener. Any screener fact that came up in a session had to come from the conversation.

### How We Identified Screener Facts

We counted facts as selectable options for each question in the screener. For example, one screener question asked participants what they use before or while sleeping. Figure 1 shows how one participant (P16) answered it. They checked three items, giving us three facts to look for in their session.

**[![One participant’s (P16’s) answers to a screener question (captured from the MUiQ® platform). Each checked item was a fact we knew about this participant but withheld from the moderators. ](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MjEgNzAwJz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/11/111726-F1.jpg)**

**Figure 1****:** One participant’s (P16’s) answers to a screener question (captured from the [MUiQ® platform](https://measuringu.com/muiq/)). Each checked item was a fact we knew about this participant but withheld from the moderators.

Across all screener questions, this participant had 14 facts to detect, from coffee and soda to an iPhone and a house. A researcher used Claude to search each full transcript for evidence of each of the participant’s screener facts, recording Yes or No with the supporting quote. The researcher then manually verified what Claude identified across a few of the sessions. For this participant, earplugs and the eye mask were hits (“I use a mask. And I also use earplugs.”). Blackout curtains never came up, making it a miss.

Unlike coding themes, this is mostly a mechanical matching exercise: a fact either came up in the session or it didn’t. That said, there is some ambiguity in how we interpret what was mentioned. This participant said “my phone” but never “iPhone,” which we counted as a hit. But because we applied the same standard to AI and human sessions, it seems to be a fair rule for comparing the two despite the ambiguity.

A second Claude-assisted pass rechecked all 256 facts. It found supporting quotes for all 71 hits and flagged 3 misses for a second look, all of which stayed misses. Claude also counted each speaker’s words and classified each hit as moderator-elicited or volunteered. Neither pass was blind to which sessions were AI-moderated, and the second started from the first pass’s codes, so this is verification, not independent coding.

### Detection Rates

A simple place to start to measure the effectiveness of AI vs. human moderators is to add up all facts detected across participants and see who uncovered more. The ten AI-moderated participants had 126 facts, and 26 were discovered, a 21% detection rate. For comparison, the ten human-moderated participants had 130 facts, and 45 were discovered, a 35% detection rate.

But this treats all facts as independent, and they aren’t. Facts from the same participant tend to come up (or not) together, and participants differed in how many boxes they checked (from 6 to 27 facts). Pooling facts also doesn’t support a valid statistical test because testing 256 facts would overstate how precise the comparison is. So, our primary analysis uses each participant’s detection rate (facts surfaced ÷ facts on their screener), compared across the ten AI and ten human participants with [Welch’s _t_\-tests](https://en.wikipedia.org/wiki/Welch%27s_t-test) (which uses fractional degrees of freedom to compensate for group differences in variability).

## Study Results: Human Sessions Surfaced More Screener Facts

The average human-moderated participant revealed 35% of their screener facts during the session vs. 21% for AI-moderated participants (not far off the simple pooling approach). The 16-point difference was statistically significant (_t_(17.1) = 3.51, _p_ = .003; 95% CI: 7 to 27 points). That’s about 4.5 facts per human session vs. 2.6 per AI session (_p_ = .01).

The spread was wide. AI participants ranged from 11% to 43%; human participants from 19% to 53%. Only one AI session (P1, 43%) beat the human average.

Most of what we knew about participants never came up: about two-thirds of screener facts in human sessions and four-fifths in AI sessions remained hidden. That’s not necessarily a failure. The goal of the study, like most research interviews, wasn’t to play screener detective; it was to understand how people sleep and wake up. So, a more useful question would be to ask _which_ facts each moderator missed.

### Where the Gaps Were

The gaps weren’t spread evenly, and not all screener facts matter equally. Some screener facts, such as fast food or a multivitamin, have little to do with designing a better sleep device. Others, such as caffeine or alcohol, can affect sleep but are a step removed from how people wake up. A good moderator (human or AI) would spend less time on these. So, we grouped the screener categories by how relevant they were to the study goal of understanding how people sleep and wake up (Table 1).

Relevance to study (categories)

AI %

Human %

Gap (pts)

Test

High: devices, sleep environment, pets, children

34%

52%

+18

_t_(18) = 2.5, _p_ = .02

Medium: consumption, sleeping aids

 4%

 7%

+ 3

_t_(13.9) = 0.5, _p_ = .54

Low: living situation

20%

90%

+70

_Z_ = 3.1, p = .002

**Table 1:** Mean percentage of each participant’s screener facts surfaced, by relevance to the study goal. We grouped categories after seeing the results, so treat this as exploratory. Sleep-tracking devices are left out because they duplicate device items. The _p_\-value for living situation is from an [_N_−1 two-proportion test](https://measuringu.com/what-is-the-n-1-two-proportion-test/) because each participant had exactly one living-situation fact.

As shown in Table 1, human sessions surfaced significantly more than AI sessions of the facts that matter most (52% vs. 34%). The clearest miss was the sleep environment. Earplugs, eye masks, blackout shades, and fans are things people already use to manage sleep and waking, the very product space the fictitious client was exploring. Human sessions surfaced 6 of 16 of these facts (38%) vs. 2 of 18 for AI sessions (11%; _Z_ = 1.78, _p_ = .07).

Recall the participant selections from Figure 1. The earplugs and mask came up because the human moderator asked, “Is there anything else that you do, to kind of improve your sleep quality?” An AI-moderated participant (P8) checked the same two items. Neither came up (Table 2). The AI never asked what the participant currently does to sleep better. Its closest question was about the ideal room at wake-up (“If you could change one thing about the ‘vibe’ or the environment of your room at 6:00 AM…”), and the participant talked about light.

Screener item

P16 (human moderator)

P8 (AI moderator)

Earplugs

☑ Checked, ✔ came up

☑ Checked, ✘ didn’t come up

Eye mask

☑ Checked, ✔ came up

☑ Checked, ✘ didn’t come up

Blackout curtains

☑ Checked, ✘ didn’t come up

Not checked

**Table 2:** The same screener items in a human-moderated and an AI-moderated session.

This is consistent with the sleep-climate theme from [our previous article](https://measuringu.com/do-participants-provide-the-same-depth-of-insight-to-human-and-ai-moderators). The guide never asked about the sleep environment, and three of the six human mentions came from moderators going off-script to ask (see below).

The biggest gap was in the least relevant fact: where people live. Nine of ten human-moderated participants mentioned their living situation vs. two of ten AI-moderated participants. No moderator asked about it; it came up in passing, such as “I live in an apartment” (Human, P20).

Medium-relevance facts rarely came up with either moderator. Of everything participants consumed in the past two weeks, only coffee and tea were mentioned. Alcohol, soda, fast food, and cigarettes never came up, and sleeping aids (e.g., drugs, vitamins) surfaced only twice, both in human sessions.

As in our previous article, the gap was larger for topics the discussion guide didn’t cover (17 points) than for those it did (12 points), but with ten participants per group, that difference isn’t statistically significant (_p_ = .74).

### Why Did Human Sessions Surface More?

It’s not just session length. Participants said about twice as many words to human moderators in the longer sessions as they did to AI moderators (2,028 vs. 988 per session, _t_(17.9) = 3.8, _p_ = .001). Controlling for each participant’s word count with [analysis of covariance](https://en.wikipedia.org/wiki/Analysis_of_covariance) had little effect on the human advantage, which shifted from 17 points unadjusted to 15 points, still a significant difference (_t_(17) = 2.3, _p_ = .03). This is consistent with the two participants in AI-moderated sessions who talked as much as a typical participant in a human-moderated session but surfaced only 18% and 15% of their available facts, less than half the human moderator average of 37%. And the AI wasn’t quiet: AI moderators asked more questions than the humans (38 vs. 29 question turns per session, _t_(17.9) = 3.6, _p_ = .002). In short, AI asked more and heard less.

Taking advantage of AI’s ability to quickly and accurately scan text, we had Claude review the [MUiQ](https://measuringu.com/muiq/) transcripts. We classified each surfaced fact by its first mention (Table 3). It was _moderator-elicited_ if the moderator asked about that fact or its topic (“What do you use for your alarm?” before “my iPhone”). It was _volunteered_ if it came up while the participant answered something else (“my family moving around in the house” in answer to what would happen if the alarm failed).

Facts per session

AI

Human

Gap (H-A)

Test

Moderator-elicited

1.6

2.0

0.4

_t_(18) = 0.77, _p_ = .45

… from off-guide probes

0.1

0.5

0.4

_t_(11.5) = 1.4, _p_ = .19

Volunteered

1.0

2.5

1.5

_t_(13.1) = 3.1, _p_ = .008

**Table 3:** Screener facts surfaced per session by how they first came up (classified with Claude; not blind to condition).

Both moderators elicited about the same number of facts by following the guide’s wake-up method and sleeping-arrangement prompts (phones, watches, pets). The difference was in what participants mentioned on their own: 2.5 facts per human session vs. 1.0 per AI session. All 11 living-situation mentions were volunteered.

Human moderators did go off script a bit more. In three human sessions, a moderator asked about sleep aids or the sleep environment (“Have you tried blackout curtains? Have you tried white noise?”). That surfaced five facts: smart lights, melatonin, blackout shades, earplugs, and an eye mask. The AI’s single off-guide probe surfaced an Apple Watch.

## Summary and Discussion

In a randomized study of 20 participants assigned to an AI or human moderator using the same discussion guide, we measured how many facts that were captured on a screener (but never shared with the moderators) were detected in the sessions. This allowed us to investigate the similarities and differences in withheld fact discovery by the human and AI moderators.

**Human-moderated sessions had about a 75% higher fact detection rate.** The average human-moderated participant revealed 35% of their screener facts vs. 21% for AI-moderated participants (_p_ = .003), or about 4.5 vs. 2.6 facts per session.

**Human-moderated sessions revealed about 50% more of the most relevant facts.** For facts tied to how people sleep and wake (which are close to primary research questions), human sessions surfaced 52% vs. 34% (_p_ = .02), led by the sleep environment.

**Humans didn’t ask more; participants volunteered more.** Both types of moderators drew out about the same number of facts by asking (2.0 vs. 1.6 per session, _p_ = .45). The gap was in facts participants mentioned on their own (2.5 vs. 1.0, _p_ = .008). Participants said twice as many words to human moderators, but even after controlling for word count with an analysis of covariance, the gap was still statistically significant (15 points, _p_ = .03).

**Human moderators went off script more.** In three human sessions, moderators asked about sleep aids or the sleep environment, topics the guide never covered, surfacing five facts (smart lights, melatonin, blackout shades, earplugs, and an eye mask). The AI went off script once. The difference isn’t statistically significant (_p_ = .19), but it’s consistent with our previous article in this series, where human sessions covered sleep climate issues the guide never asked about.

**Limitations and future research.** This is one study with one guide, two human moderators, and one AI configuration. With ten participants per condition, we can detect only large differences with statistical significance (but some differences were quite large). Facts were identified using AI that was not blind to the conditions, not by independent coders (although human researchers checked the AI’s analysis). The detection percentages of screener facts in the sessions depend on how strictly we coded the transcripts (e.g., iPhone versus phone), but the same standard was applied to both AI and human moderators.

**Bottom Line:** Human moderators surfaced more screener facts, including more of the facts most relevant to the research. Most of that edge came from participants saying more things to humans than to AI (even though the AI asked more questions). Human moderators also went off script more often to probe topics the guide didn’t cover, consistent with the findings reported in our previous article in this series.