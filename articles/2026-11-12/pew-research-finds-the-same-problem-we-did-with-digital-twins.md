---
title: "Pew Research Finds the Same Problem We Did with Digital Twins"
source: "https://measuringu.com/pew-research-finds-the-same-problem-we-did-with-digital-twins/"
publishedDate: "2026-11-10"
category: "ux-research"
feedName: "MeasuringU"
author: "Jeff Sauro, PhD • Jim Lewis, PhD"
---

[![Feature image](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMDAgMTY5Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/11/111026-FeatureImage1-scaled.jpg)The promise of synthetic users is hard to ignore. Participant recruitment is one of the most costly and time-consuming parts of a research budget. If AI can stand in for real people, it could produce results in hours instead of weeks and at a fraction of the cost.

We’ve described synthetic users as [more of a genus than a species](https://measuringu.com/what-are-the-different-types-of-synthetic-users/). The genus includes persona-based, demographic-based, and research-grounded species, but digital twins are widely believed to be the most accurate because, instead of inventing a generic user, a digital twin is built from a real person’s data and then asked to answer questions the way that person would.

Some of the reported results are impressive. In our [review of experiments with synthetic users](https://measuringu.com/review-of-experiments-with-synthetic-users/), one of the most striking claims came from the consulting firm EY. Using Aaru’s proprietary simulation platform, EY replicated a 3,600-person global wealth survey and reported strong agreement with the human results, with high correlations and modest error generated in one day instead of six months. But that result came from a company selling the platform, and critics pointed out that the model may have been trained on data similar to the survey it was “predicting.” To date, much of the evidence in favor of synthetic users comes from people with a financial interest in the answer.

The strongest academic case for digital twins comes from Stanford. [Park et al. (2024)](https://arxiv.org/abs/2411.10109) had an AI interviewer conduct two-hour interviews with 1,052 U.S. adults about their lives, then built a digital twin for each person from their interview transcript. The twins answered the General Social Survey 85% as accurately as the participants who matched their own answers two weeks later (encouraging). But that 85% is relative to human consistency. In raw terms, the twins matched about 69% of answers, compared to 81% for the humans retaking the survey (discouraging). And getting there required two hours of interview data per person, far more data than most research teams have about their users.

That’s why a [new study from Pew Research Center](https://www.pewresearch.org/wp-content/uploads/sites/20/2026/09/pl_2026.09.30_silicon-samples_report.pdf) caught our attention. First, a public service announcement: Pew isn’t named for the smell of its research (pew!). It’s a last name. Pew Research Center is a non-partisan, non-profit subsidiary of the Pew Charitable Trusts, founded in 1948 by the children of Sun Oil founder Joseph N. Pew.

We’ve been critical of some of Pew’s interpretations of their findings (e.g., [select-all-that-apply items](https://measuringu.com/article/comparison-of-sata-items-with-yn-forced-choice-items/), [nonprobability sampling](https://measuringu.com/are-opt-in-online-panels-too-inaccurate/)) due to differences in our research contexts (social/political vs. UX), but Pew is generally rigorous and transparent, publishing its prompts, configurations, and full toplines. And unlike many of the voices promoting synthetic users, Pew isn’t selling synthetic user software. In fact, it states that it has no plans to use AI to generate survey results.

For this research, Pew’s findings look a lot like what we found in our two digital twin studies of the SUS despite the differences in our research contexts. In this article, we summarize what Pew did, compare it to our two studies, and look at what’s the same, what’s different, and why it matters for UX research.

## What Pew Did

Pew built digital twins for thousands of members of its American Trends Panel (ATP), a nationally representative, probability-based panel of U.S. adults. Each twin was given the panelist’s demographic profile (age, education, income, religion, voting history, and more) plus 71 additional attitude variables from Pew’s 2025 political typology survey. Pew also borrowed a technique from the Park et al. study: a second AI model (GPT-5.1) wrote an “expert reflection” on each person, a short synthesis from the perspective of a political scientist meant to surface less obvious patterns in the profile.

The twins then took three real ATP surveys from early 2026, totaling nearly 300 questions on politics, global attitudes, and national problems. They answered one question at a time, in order, with the same programming, randomization, and instructions as their human counterparts.

Pew didn’t just pick a single setup and run it. It tested reasoning levels, amounts of profile information, and three different models in a tournament-style comparison. The winning configuration was Claude Opus 4.6 with the extended profile and expert reflection.

## What Pew Found

Even with that best configuration, the results weren’t close:

-   **The average absolute error was 12 percentage points.** Across nearly 300 questions, the twins’ estimates differed from the humans’ by an average of 12 points, and by more than 15 points on about 28% of questions.
-   **Some misses were enormous.** Only 52% of Americans correctly identified a right guaranteed by the First Amendment, but the twins put it at 98% (a 46-point miss). The twins said 99% knew the central focus of NATO, compared with 56% in reality. They estimated 97% of Hispanic adults were likely to follow the World Cup (actually 43%) and 86% of Democrats thought billionaires were bad for the country (actually 45%). On a 0 to 100 scale, a miss that big is like predicting a product earns [an A+ on the SUS when it really earns a D.](https://measuringu.com/interpret-sus-score/)
-   **The magnitude of the miss was related to the size of the opportunity to miss.** Figure 1 shows the scatterplot of [all the errors reported by Pew](https://www.pewresearch.org/wp-content/uploads/sites/20/2026/09/pl_2026.09.30_silicon-samples_topline.pdf). The figure shows a slightly tilted lozenge highlighting a clear pattern that digital twin errors were greater when human response percentages were in the range of 25–75%.

[![Relationship of magnitudes of human-twin differences and human response percentages. ](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjAwIDc5MCc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/11/111026-Figure1.jpg)

**Figure 1:** Relationship of magnitudes of human-twin differences and human response percentages.

-   **The twins were too sure of themselves.** Humans chose “not sure” about four times as often as the twins, even though, as part of their prompt, the twins were instructed, “Your knowledge of the world should correspond to your role. It is realistic for your role to not know about some topics, or for their knowledge about some topics to be mistaken.”
-   **The twins avoided some answers and piled onto others.** Nearly half the questions had at least one response option that no twin chose, a response pattern that never happened with humans across the original survey waves.
-   **The twins leaned on stereotypes.** As the World Cup and billionaire examples show, they turned opinions that are merely common within a subgroup into near-universal ones.
-   **The model mattered.** On the same survey, Opus 4.6 had an average error of 11.4 points, GPT-5.1 had 13.3, and GPT-5 nano had 17.4. The errors also went in different directions: GPT-5.1 painted the public as more extreme than it is, while Opus 4.6 painted it as more moderate. Both were wrong.

Pew’s conclusion was blunt: AI models are not an adequate replacement for surveying real people.

## Our Two Digital Twin Studies

We ran two digital twin experiments using our own retrospective UX benchmark data. In the [first](https://measuringu.com/how-well-do-synthetic-users-predict-sus-scores/), we built twins for 420 participants who rated ChatGPT, Claude, Gemini, and Grok. In the [second](https://measuringu.com/digital-twins-systematically-overestimated-business-software-sus-scores/), we built twins for 289 participants who rated six business software products, from GitHub (the lowest-scoring product in our 2025 benchmark) to Slack (the highest).

In both studies, Claude Sonnet 5 wrote a persona of up to 700 words for each participant from their survey responses, leaving out their SUS ratings. Summary twins got only the persona. Full twins got the persona plus the participant’s raw survey responses. Each twin then completed the SUS as its human would have.

The twins systematically overestimated SUS scores in both studies:

-   **AI chatbots:** too high by 4.4 points (summary twins) and 6.7 points (full twins)
-   **Business software:** too high by 10.6 and 10.4 points

For business software, that was enough to move products by up to two letter grades on our [curved grading scale for the SUS](https://measuringu.com/interpret-sus-score/). GitHub went from a D to a B, and ZipRecruiter went from a C to an A.

## What’s the Same?

**The size of the error.** Pew’s twins were off by an average of 12 percentage points. Our business software twins were off by about 10.5 SUS points. The metrics aren’t identical (Pew’s is percentage-point error across response options; ours is the difference in SUS means), but both are on a [0 to 100 scale](https://measuringu.com/types-of-100-point-scales/), and both land around 10 points. That’s a lot of error in either context.

**The error was systematic, not random.** Our twins consistently rated products higher than their humans did (76% to 80% of the time). Pew’s twins consistently overstated knowledge and certainty. In both cases, the twins were biased in a predictable direction, so collecting more twins wouldn’t average the error away.

**Errors were systematically higher when human scores were distant from the scale endpoints.** This pattern was evident in both Pew’s and our research. When human scores were very low or very high on their percentage (Pew) or SUS (MeasuringU) scales, digital twins tend to land close to observed human scores, likely due to floor and ceiling effects. When human scores were less extreme, digital twin errors were amplified.

**The twins smoothed over real human variation.** Pew’s twins avoided some response options entirely. Our twins clustered around a few SUS values (especially 95 to 100 for higher-scoring products), with half of the twin scores within five points of their product’s median versus 28% of human scores.

**The results looked plausible.** Neither set of results looked obviously broken. Pew’s twins correctly estimated that a majority of Americans support legal abortion. Our twins got the rank order of products mostly right. The problem is in the levels, which are exactly what decision makers act on.

**The same family of models.** Pew’s best configuration used Claude Opus 4.6, and we built our twins with Claude Sonnet 5. Neither study found a configuration that fixed the problem.

## What’s Different?

Pew Research Center (three surveys)

MeasuringU (two studies)

Context

Public opinion (politics, global attitudes)

User experience (UX)

Participants

Probability-based national panel

Current users of specific products

Number of Twins built

About 15,000 twin–survey pairs across 3 waves

709 (420 + 289)

Data used to build twins

Demographics, 71 attitude variables, expert reflection

Persona from same-survey responses (27 questions for business software; 68 for chatbots, including 34 AI attitude items)

What was predicted

~300 questions on many topics

One standardized 10-item questionnaire (SUS)

Models

Tested GPT-5.1, GPT-5 nano, Claude Opus 4.6

Claude Sonnet 5

Average error

12 percentage points

4 to 7 SUS points for high-scoring chatbots, about 10.5 SUS points for lower-scoring business software

**Table 1:** Comparison of the Pew study and our two digital twin studies.

**Politically charged vs. everyday experiences.** Most of Pew’s questions were about politically charged topics, such as presidential approval, immigration enforcement, and abortion. That’s a context where 5 percentage points can be the difference between a close race and a landslide, so the bar for accuracy is high. It’s also a context where identity, social desirability, and partisan stereotypes shape how people answer, which gives a twin more ways to go wrong. Attitudes about a user experience typically aren’t politically charged, as we describe in [_Surveying the User Experience_](https://measuringu.com/book/surveying-the-user-experience/). How someone rates the usability of GitHub or Slack isn’t tied to their political identity, so there should be fewer reasons for twins to fall back on stereotypes.

**Pew’s task was arguably harder.** Pew asked twins to predict opinions on timely topics, such as data centers, immigration enforcement, and current events, using profile data collected months earlier. Opinions on those topics shift with the news. Our twins predicted a stable, retrospective rating of a product the person had already used, and they were built from that same person’s answers in the same survey, including their likelihood to recommend and what they liked and disliked about the product. That’s about as easy as a prediction task gets. If twins can’t get within a few points of a SUS score under those conditions, it’s hard to see where they would.

**More _relevant_ information may have helped in both studies.** Pew’s error dropped from 16 points with demographics alone to 13.7 when it added 71 attitude variables, and to 13.1 with expert reflection (tested on GPT-5.1). The attitude variables were closely related to what Pew was predicting: political attitudes used to predict political opinions.

We may have seen something similar. The twins in our AI chatbot study were built from 68 survey questions, including 34 items about attitudes toward AI, which are closely related to how someone would rate an AI chatbot. The business software twins were built from just 27 questions, with no attitude items. The chatbot twins’ error was about half as large (4.4 to 6.7 points vs. about 10.5).

But we can’t say the extra information caused the difference. The chatbots also had higher SUS scores (78 to 82), which left less room for the twins to overestimate, and the two studies differed in product category and year. More relevant data and a ceiling effect are confounded, and our design can’t separate them. One way to see the difference would be to rebuild the chatbot twins without the 34 attitude items. If their error climbs toward 10 points, the attitude items were doing the work.

We can say that adding more of the _same_ information didn’t help. Within each study, the full twins (persona plus raw survey responses) were no more accurate than the summary twins (persona only). In the business software study, the two types differed by only 0.1 points.

**Pew tested multiple models; we tested one.** Pew compared three models and found that both the size and the direction of the errors changed with the model. We used only Claude Sonnet 5, so we can’t say whether another model would have overestimated SUS scores by more, by less, or not at all.

**Pew weighted its results; we didn’t need to.** Pew projected its twins onto the U.S. population using survey weights. We compared each twin directly to its human counterpart, isolating the twin’s accuracy from any sampling or weighting issues.

## Summary and Discussion

Pew’s study is the largest and most transparent test of digital twins we’ve seen, and it comes from an organization with no stake in the outcome. Its findings line up closely with our two smaller UX studies:

**Roughly 10 points of error.** Pew’s twins missed by 12 percentage points on average. Ours missed by about 10.5 SUS points for business software. In a UX benchmark, 10 points is the difference between an average product and an excellent one.

**Some misses were far worse than average.** Pew’s twins missed some questions by more than 40 points, the equivalent of calling a D product an A+. Averages hide those extremes, and a researcher using twin data has no way to know which questions are the ones it got badly wrong.

**Easy questions didn’t save the twins.** Our SUS predictions should have been among the easiest a twin could make: a stable, non-political rating of a familiar product, built from the same person’s answers in the same survey. The twins still missed by about 10 points for typical products.

**The errors were systematic.** In both Pew’s study and ours, the twins were wrong in predictable directions: too knowledgeable and too certain in Pew’s study, too positive in ours. Systematic error is the most dangerous kind, because it doesn’t cancel out and it looks consistent.

**Results from one model don’t generalize to another.** Pew found that switching models changed not just how wrong the twins were but in which direction. We identified the same generalizability problem in our [literature review of research on AI moderators](https://measuringu.com/effectiveness-of-ai-moderators-a-literature-review/): findings from one model (or one model version) may not hold for the next. That makes it hard to validate synthetic users once and trust them going forward. Any validation is tied to a specific model, configuration, and context, and models change every few months.

**Relevant data may help, but it’s not a fix.** Pew’s error shrank when it added attitude data related to its questions, and our chatbot twins (built with AI attitude items) had about half the error of our business software twins. But even the best configurations in both studies still missed by more than would be acceptable to stakeholders when making decisions from real data.

**Plausible-looking results can lead to wildly different conclusions.** Twin data that correctly ranks products, or correctly identifies majority opinion, can still be off by two letter grades or a dozen percentage points. For decisions based on absolute levels, like whether a product meets a benchmark, whether it improved, or what share of users struggle, that’s enough to lead teams to the wrong decision.

**AI is better at analyzing real responses than inventing them.** Pew draws a clear line: it won’t use AI to stand in for respondents, but it does use AI to categorize real responses to open-ended questions and to write code for analyzing survey results, and it plans to keep doing so. We’ve reached a similar conclusion in our own [research on coding open-ended comments](https://measuringu.com/chatgpt-vs-humans-for-coding-open-ended-responses-three-years-later/). AI is a useful tool for working with data real people provided. It is, however, not yet an adequate replacement for the people.

**Our samples were smaller, but the errors were too large to be noise.** Pew built about 15,000 twin–survey pairs whereas we built 709 twins across two studies. But our samples were large enough to estimate the twins’ error with meaningful precision for UX research. For business software, the 95% margin of error around the average overestimate was about ±1.4 SUS points, so the true overestimate is very likely between 9 and 12 points. For individual products, the margins were about ±3 to ±4 points, still much smaller than the 10-to-14-point gaps for five of the six products. Other limitations remain: we tested one model, one questionnaire (the SUS), and two product categories.

**Bottom line:** Even the most promising results, like Stanford’s, depend on hours of interview data per person and still fall well short of human consistency. With the data UX teams typically have, three independent studies in two different domains reached the same conclusion: digital twins built from real people’s data aren’t accurate enough to replace those people. For now, the U in UX research stays.