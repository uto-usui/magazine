---
title: "Digital Twins Systematically Overestimated Business Software SUS Scores"
source: "https://measuringu.com/digital-twins-systematically-overestimated-business-software-sus-scores/"
publishedDate: "2026-10-20"
category: "ux-research"
feedName: "MeasuringU"
author: "Lucas Plabst, PhD • Jeff Sauro, PhD • Jim Lewis, PhD"
---

[![Feature image showing an AI robot and text "SUS" that creates a big shadow](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMDAgMTY5Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/102026-FeatureImage2.jpg)For some, synthetic users seem like a solution looking for a problem. Why take the U out of UX? We understand why there’s a need. If we’re accelerating software development with AI, why not also consider accelerating UX research with AI?

And one of the biggest delays in UX research is the U. Recruiting and running participants takes a lot of time. It also represents a high cost. Participant recruiting costs and honorariums are big budget items for research teams. We spend millions of dollars a year recruiting participants for our clients, so we get it.

But having a real need is different from having a real solution you can trust. If we’re going to simulate user attitudes and behavior, we need to compare AI predictions to actual human attitudes and behaviors in realistic contexts.

If designers, developers, and even researchers are going to replace or supplement participants with AI, it’s worth testing the type of synthetic user with the best shot at getting it right. We’ve described synthetic users as more of a [genus than a species](https://measuringu.com/what-are-the-different-types-of-synthetic-users/), covering digital twins, persona-based, and demographic-based approaches. Digital twins, built from real participants’ own data, are widely believed to be the most accurate, though that’s still an open research question. So that’s where we started.

In our [previous article](https://measuringu.com/how-well-do-synthetic-users-predict-sus-scores/), we built two types of digital twins (summary and full) from 420 participants in our 2026 retrospective benchmark of AI-based chat products (ChatGPT, Claude, Gemini, and Grok) and had the twins predict each person’s held-out SUS score. The twins came reasonably close (within 4.4 points on average for summary twins and 6.7 points for full twins), but they were systematically too high, inflating SUS scores enough to bump each product by a half to full letter grade.

That study left us with several open research questions:

1.  **Would accuracy hold up for products with lower SUS scores?** All four chatbots scored high (78 to 82), so a ceiling effect may have kept the twins artificially close to the human scores.
2.  **Does giving twins more information help or hurt?** Last time, the full twins (which had more information) were _less_ accurate than the summary twins.
3.  **Are digital twin data still less variable than human data?**
4.  **How well do individual twin predictions track individual humans?**

To get answers, we repeated the experiment using a new dataset with a much wider range of SUS scores.

## The Original Study

From January through February of 2025, we collected data from 980 participants on 23 business software products as part of our [business software UX and NPS benchmark](https://measuringu.com/business-software-ux-2025/). Participants reflected on their most recent experiences with the software and completed the SUS, UX-Lite®, NPS, and TAC-10™, along with demographic, usage, and open-ended questions. The average SUS across the 23 products was 70.5.

For this replication, we intentionally selected six products at the low, medium, and high points of the SUS range, including the lowest-scoring (GitHub, 61.3) and highest-scoring (Slack, 81.5) products in the benchmark. The products and sample sizes were:

-   GitHub: 50
-   AutoCAD: 36
-   WordPress: 52
-   ZipRecruiter: 50
-   SurveyMonkey: 51
-   Slack: 50

This gave us 289 participants, who provided SUS means spanning about 20 points (from a D to an A on the Sauro–Lewis curved grading scale), compared to the narrow 78 to 82 range for the products in the chatbot study. The distributions of participants’ gender and age were consistent across studies.

## Replication with Digital Twins

We created the digital twins with the same method described in our [earlier article](https://measuringu.com/how-well-do-synthetic-users-predict-sus-scores/). For each participant, we used Claude Sonnet 5 to construct a first-person persona (700 words max) from their survey responses, **leaving out their SUS ratings**. We then built two types of digital twins:

-   **Summary twins** were given only the persona.
-   **Full twins** were given the persona plus all the participants’ original survey responses (except the SUS ratings).

Each twin was prompted to role-play as its participant and respond to the SUS as its human would have. We then matched each twin with its human counterpart and analyzed the differences in SUS scores.

## Results

### Digital twin means were higher than human means, about twice as much error as before

Both types of twins produced statistically significantly higher SUS means than humans for all six products (all _p_ < .01). Averaged across products, the summary twins were 10.6 points and the full twins 10.4 points higher (Table 1). That is roughly twice the error we saw in the chatbot study (4.4 and 6.7 points, about 2.4 times as large for summary twins and 1.6 times as large for full twins).

Product

Human Mean

Summary Twin Mean

Full Twin Mean

Summary—Human

Full—Human

Full—Summary

GitHub

61.3

74.9

72.9

13.7\*\*\*

11.6\*\*\*

 −2.1\*

AutoCAD

64.0

69.4

69.9

5.3\*\*

5.9\*\*

 0.6

WordPress

66.4

77.6

77.3

11.3\*\*\*

10.9\*\*\*

−0.4

ZipRecruiter

67.6

79.5

80.9

12.0\*\*\*

13.3\*\*\*

  1.3\*

SurveyMonkey

75.6

85.9

86.5

10.2\*\*\*

10.8\*\*\*

 0.6

Slack

81.5

92.5

91.6

11.1\*\*\*

10.1\*\*\*

−1.0

Average

69.4

80.0

79.8

10.6\*\*\*

10.4\*\*\*

−0.2

**Table 1:** Comparison of product SUS means and mean differences (_t_\-tests: \* = _p_ < .05, \*\* = _p_ < .01, \*\*\* = _p_ < .001).

The overestimation was also pervasive at the individual level. Summary twins predicted a higher SUS score than their human counterpart 76% of the time, and full twins did so 80% of the time.

Figure 1 shows the results by product for both studies. The chatbot gaps were 3 to 8 points; most business software **gaps were 10 to 14 points**. AutoCAD was the exception, with 5.3- and 5.9-point gaps, similar to the chatbots.

[![Human, summary twin, and full twin SUS means for the AI chatbot study and the business software study, with differences from the human means shown on the right. Bands below the axis show the Sauro–Lewis curved grading scale, acceptability ranges, and adjective ratings.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNTYwIDE4MjYnPjwvc3ZnPg==)](https://measuringu.com/wp-content/uploads/2026/10/SUS-DigitalTwins-scaled.png)

**Figure 1:** Human, summary twin, and full twin SUS means for the AI chatbot study and the business software study, with differences from the human means shown on the right. Bands below the axis show the [Sauro–Lewis curved grading scale, acceptability ranges, and adjective ratings](https://measuringu.com/interpret-sus-score/).

### Summary and full twins were nearly indistinguishable

Unlike in the chatbot study, giving twins more information didn’t make their predictions worse, but it also didn’t make them better. At the product level, two differences were statistically significant, but in opposite directions: summary twins were slightly higher for GitHub (2.1 points, _t_(49) = 2.4, _p_ = .02), and full twins were slightly higher for ZipRecruiter (1.3 points, _t_(49) = 2.4, _p_ = .02). Overall, the full and summary twin means differed by only 0.2 points (not statistically significant, _t_(288) = .735, _p_ = .46) and were highly correlated (_r_(287) = .98, _p_ < .0001), making them essentially interchangeable.

### The inflation changed the interpretation of every product

Because the twins overestimated by about 10 points on average, the grade shifts shown in Table 2 were much larger than in the chatbot study. In the chatbot study, the twins were off by half to a full letter grade. In this study, two products were off by about two full letter grades: GitHub went from D to B, and ZipRecruiter went from C to A. A stakeholder looking at the twin data would conclude that WordPress and ZipRecruiter offer good to excellent experiences, but the human data indicates they are no better than average.

Product

Human

Summary Twin

Full Twin

GitHub

D

B

B−

AutoCAD

C−

C

C

WordPress

C

B+

B+

ZipRecruiter

C

A−

A

SurveyMonkey

B

A+

A+

Slack

A

A+

A+

**Table 2:** SUS grades (from the [Sauro–Lewis curved grading scale](https://measuringu.com/interpret-sus-score/)).

### The twins got the rank order mostly right

Despite the inflated levels, the twins largely preserved the rank order of the products. At the product level, the correlation of human means with summary twins was .94 and with full twins was .95. Humans and twins agreed on the rank order for the top four products but differed on the positions of the bottom two products (humans ranked AutoCAD fifth and GitHub sixth).

### An artificial acquiescence pattern drove the inflation

At the item level, we saw the same pattern we found in the first study. The synthetic twins agreed more with the positive-tone items and disagreed more with the negative-tone items (both of which increased SUS scores). On average, item means were off by about 0.43 points on the five-point scale (which corresponds to 10.8 points on a 0–100-point scale). The magnitudes of human–AI discrepancies ranged from 0.13 (Q5: “I found the various functions in this system were well integrated”) to −0.72 (Q10: “I needed to learn a lot of things before I could get going with this system”). Because the distortion was systematically acquiescent rather than random, it added up across the ten items instead of canceling out.

### The error was largest in the middle of the scale

To look at the ceiling question directly, we graphed the AI errors against the human SUS scores (Figure 2) and grouped participants by their actual SUS score (Table 3). The twins were most accurate for participants who gave very high scores (85 and above), where they were overestimated by less than 3 points, likely because there wasn’t much room above those scores. Error peaked when human SUS scores were between 50 and 70, where the maximum possible positive error ranged from 50 to 30. In that range, the twins overestimated human SUS scores by about 16 points, taking advantage of the room for positive errors. When there was less room for positive errors at higher SUS scores, the twins were forced closer to the human scores.

[![Scatterplot of human SUS scores with digital twin errors (both twin methods overlaid) illustrating how the ceiling effect attenuates maximum possible positive error. For SUS scores below 50 there are few maximum possible errors. From about 70 and higher, the maximum possible errors fall in a straight line (e.g., at a SUS of 70 the maximum possible error on the high side is 30; at a SUS of 80 the maximum possible error is 20). Before 70, the correlation of SUS with AI errors was .18 (points more randomly scattered); from 70-100 the correlation was −.47. Once the human SUS scores rose above average, a clear ceiling effect emerged.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjAwIDQzNyc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/102026-f2.jpg)

**Figure 2:** Scatterplot of human SUS scores with digital twin errors (both twin methods overlaid) illustrating how the ceiling effect attenuates maximum possible positive error. For SUS scores below 50, there are few maximum possible errors. From about 70 and higher, the maximum possible errors fall in a straight line (e.g., at a SUS of 70 the maximum possible error on the high side is 30; at a SUS of 80 the maximum possible error is 20). Before 70, the correlation of SUS with AI errors was .18 (points more randomly scattered); from 70-100 the correlation was −.47. Once the human SUS scores rose above average, a clear ceiling effect emerged.

Human SUS Range

_n_

Summary—Human

Full—Human

Below 50

43

13.8

12.9

50–69.9

82

16.1

15.7

70–84.9

86

11.8

11.9

85–100

78

2.6

2.7

**Table 3:** Mean differences between twin and human SUS scores.

#### Correlations with human scores were much higher

The individual-level correlations between human and twin SUS scores were substantially higher than in the chatbot study: .79 for summary twins and .81 for full twins (compared to .56 and .59 from the first study). Within products, the correlations ranged from .57 (Slack) to .87 (SurveyMonkey). The lower correlations in the first study were likely due to [range restriction](https://www.statisticshowto.com/restricted-range/).

### Unexpectedly, humans and AI had the same variability—but that’s not the whole distributional story

In a departure from the first study, the standard deviations of twin and human scores were nearly identical (19.0 for humans, 19.2 for summary twins, and 19.0 for full twins), and the differences weren’t statistically significant. Only Slack, the highest-scoring product, showed significant compression (SD of 13.6 for humans versus 7.8 and 8.4 for twins), likely driven by a ceiling effect.

Figure 3 reveals an interesting distributional pattern. The twin responses tended to pile up at a few values, especially 95 to 100 for SurveyMonkey and Slack. Half of the twin scores fell within five points of their product’s median, compared to 28% of the human scores. Meanwhile, a handful of twins gave extremely low scores (as low as 2.5 for SurveyMonkey). In other words, the twins were less varied in the middle and more extreme in the tails. Twins gave a perfect score of 100 almost four times as often as humans (13% vs. 3.5%).

[![Distributions of SUS scores by product for Human, Summary Twin, and Full Twin (dots were spread horizontally to separate ties). Products are ordered by human mean, lowest to highest. ](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjAwIDUxOSc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/102026-f3.png)

**Figure 3:** Distributions of SUS scores by product for Human, Summary Twin, and Full Twin (dots were spread horizontally to separate ties). Products are ordered by human mean, lowest to highest.

To quantitatively assess the distributional differences, we need to investigate other, less well-known, measures of shape: [skewness and kurtosis](https://www.datacamp.com/tutorial/understanding-skewness-and-kurtosis). Skewness measures how much a distribution leans to the left or right (asymmetry), while kurtosis measures how much data is concentrated in the peak and the tails of the distribution. The skewness and kurtosis for the total human scores were, respectively, −0.60 and 0.03 (moderately left-skewed with a normal peak and tail thickness). For the summary twin, the values were −1.36 for skewness and 1.98 for kurtosis; for full twins, the respective values were −1.30 and 1.64.

These measurements quantify what we see in Figure 3. The twins’ data are markedly more left-skewed than the human data (about twice as much). The kurtosis, on the other hand, is dramatically elevated (about 65 to 80 times higher), driven by the artificial concentration of scores at the ceiling rather than the distributed variation present in the human scores.

## What Explains the Drop in Accuracy?

So why was the error in prediction twice as high in this study compared to the previous one? In addition to the distributional differences, another contributor may be the types of question that were included in the survey when the digital twins were constructed. Figure 4 shows the differences between the two surveys. The AI chatbot survey had more questions (68 vs. 27). In particular, the 34 items measuring attitudes toward AI may have given the LLM in our previous study not only more but more relevant information.

[![Differences between the two surveys used to construct digital twins. ](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjAwIDU2NCc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/102026-f4.png)

**Figure 4:** Differences between the two surveys used to construct digital twins.

## Summary and Discussion

We replicated our digital twin experiment using 289 participants from our 2025 business software benchmark study, intentionally selecting six products with low, medium, and high SUS scores. Here are the answers to the research questions:

**Accuracy got worse with a wider range of scores.** The twins overestimated SUS scores by about 10.5 points on average, roughly twice the error we saw with the high-scoring chatbots (4.4 and 6.7 points). That is about 89% to 90% accuracy instead of 93% to 96%. Our speculation about the first study appeared to be correct: the high scores in the chatbot data forced the twins closer to the human scores. When human scores are near the top of the scale, an upwardly biased predictor has nowhere to go. When there is room, the bias shows up in full, as it did here both by product and by individual.

**Having the survey responses didn’t matter.** The full twins’ extra access to the raw survey responses made essentially no difference. The two types of twins differed by 0.2 points and correlated .98. Combined with the first study, this suggests the **persona summary carries nearly everything the model uses to make its predictions**. Adding more raw data doesn’t fix the systematic bias.

**Inflated scores could stop real research before it starts.** A 10-point shift is enough to move products by two full letter grades. Twin data would lead a stakeholder to see a D product (GitHub) as a B and a C product (ZipRecruiter) as an A. For decisions that depend on absolute levels, such as benchmarking against a target, comparing to an industry average, or reporting a grade, twin data would be seriously misleading. One case we’ve heard for synthetic users is to use them as a pretest before going to real users. But that’s where we’re most concerned. A pretest that looks convincingly like real data but is off by two letter grades could lead stakeholders to conclude the experience is already good enough and skip the real study altogether.

**Relative comparisons held up better than absolute levels.** The rank order of products was largely preserved (_r_ = .94 to .95), and individual-level correlations rose to about .80. The higher correlations likely reflect the wider spread of scores in this dataset (the narrow range in the chatbot study would have suppressed them). Practically, the twins could roughly tell better products from worse ones and more satisfied users from less satisfied ones, but they consistently produced inflated ratings. Keep in mind that when building the twins, the LLM didn’t have access to all products at the same time, only each individual product.

**Standard deviations alone missed the compression.** The reduced variability we saw in our first study (and that has been widely reported in the literature) didn’t show up in the overall standard deviations. But the distributions show that twins clustered around a typical response for each product, with a few extreme outliers. Looking only at standard deviations would lead you to conclude the twins captured human variability when they didn’t. These large distributional differences are captured in measures of skewness (about twice as much for twins) and kurtosis (65 to 85 times as much for twins) due to clustering of twin data at the ceiling.

**Bottom line:** Across two datasets and ten products, digital twins consistently overestimated SUS scores, and the amount depended on how much room there was above the human scores. For high-scoring products, the error was modest (about 3 to 8 points). For average and below-average products (often the ones UX research is trying to improve), the error roughly doubled to 10 to 14 points. Twins did a reasonable job of ranking products (slightly better for summary twins), but they shouldn’t be trusted to use SUS to assess levels of product usability. In our upcoming articles, we plan to examine whether calibration or different ways of constructing twins can reduce this systematic bias and to investigate how different survey questions affect performance when constructing twins.