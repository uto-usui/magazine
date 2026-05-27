---
title: "The impact of AI-generated text on the Internet"
source: "https://ai-on-the-internet.github.io/"
publishedDate: "2026-05-26"
category: "design"
feedName: "Sidebar"
---

## **The Impact of AI-Generated  
Text on the Internet**

[Jonas Dolezal](https://www.jonasdolezal.com/) 1, [Sawood Alam](https://scholar.google.com/citations?hl=en&user=zXdbEQgAAAAJ) 2, [Mark Graham](https://www.linkedin.com/in/markjohngraham/) 2, [Maty Bohacek](https://www.matybohacek.com/) 3\*

1 Imperial College London    2 Internet Archive    3 Stanford University

The proliferation of AI-generated and AI-assisted text on the internet is feared to contribute to a degradation in semantic and stylistic diversity, factual accuracy, and other negative developments. We find that by mid-2025, roughly 35% of newly published websites were classified as AI-generated or AI-assisted, up from zero before ChatGPT's launch in late 2022. We also find evidence suggesting that increases in AI-generated text on the internet bring about a decrease in semantic diversity and an increase in positive sentiment. We do not, however, find statistically significant evidence supporting the hypothesis that an increased rate of AI-generated text on the internet decreases factual accuracy or stylistic diversity. Notably, our findings diverge from public perception of AI's impact on the internet.

As Featured On

 [![Fast Company](https://ai-on-the-internet.github.io/assets/img/featured/fast-company.jpg)](https://www.fastcompany.com/91535495/dead-internet-theory-coming-true-new-research-stanford-calculates-where-we-are)[![404 Media](https://ai-on-the-internet.github.io/assets/img/featured/404-media.png) ](https://www.404media.co/study-finds-a-third-of-new-websites-are-ai-generated/)[![WIRED](https://ai-on-the-internet.github.io/assets/img/featured/wired.svg)](https://www.wired.com/story/ai-slop-is-changing-the-internet-just-not-how-you-might-think/)

AI has been moving at an unprecedented speed, changing the way people write, communicate, and work. Existing research has pointed to AI's tendency to [hallucinate](https://arxiv.org/abs/2309.01219), [exhibit sycophancy](https://arxiv.org/abs/2310.13548), and other [undesirable behaviors](https://arxiv.org/abs/2406.10162) on the level of individual generations. However, no research has so far studied the impact of this technology on online discourse as a whole.

To address this, we collected a representative sample of websites published between 2022 and 2025 through the Internet Archive's [Wayback Machine](https://web.archive.org/) to study these phenomena and answer the following questions: (1) How much new text on the internet is AI-generated? (2) What is the public's perception of AI's impact on the internet? and (3) How does AI-generated text actually impact online discourse?

## How much new text on the internet is AI-generated?

Answering this question is harder than it might seem. Constructing a statistically representative sample of the internet is difficult, as there is no central index, popular domains are vastly over-represented in most crawls, and archival coverage has shifted considerably over time. To work around this, we draw on the Internet Archive's Wayback Machine and apply a multi-dimensional stratified sampling approach, approximating a uniform random draw from publicly accessible web pages published between 2022 and 2025 (see Section 3.1 in our paper).

On top of this sample, we need a reliable way to tell AI-generated and AI-assisted text apart from human-written text. AI-generated text detection is itself an open problem, so rather than committing to a single detector, we experiment with four prominent methods selected based on their performance on the [RAID benchmark](https://arxiv.org/abs/2405.07940): [Binoculars](https://arxiv.org/abs/2401.12070), [Desklib](https://huggingface.co/desklib/ai-text-detector-v1.01), [DivEye](https://arxiv.org/abs/2509.18880), and [Pangram v3](https://pangram.com/). We then run our own robustness checks across text length, HTML versus plain text, model family, model version, and language, and choose the detector that comes out the strongest overall — [Pangram v3](https://pangram.com/) (see Appendix A in our paper).

**AI-Generated Text on the Internet from Mid-2022 to Mid-2025.** The proportion of websites classified as fully AI-generated (red) and AI-generated or AI-assisted (purple) based on Pangram v3 detection applied to representative samples obtained from the Internet Archive. The dashed line marks ChatGPT's public launch in November 2022.

## What is the public's perception of AI's impact on the internet?

In a stratified sample of the US population, we surveyed 853 adults about their AI usage habits, their general view of AI's impact on society, and their beliefs about six specific hypothesized negative impacts of AI-generated text on the internet. Below, we present overall trends in usage frequency and view of AI impact. We then present a breakdown of belief in each of the scrutinized hypotheses based on these usage habits.

**AI Usage Frequency.** Distribution of respondents by how often they use AI tools.

**View of AI Impact.** Distribution of respondents by their general view of AI's impact on society.

## How does AI-generated text actually impact online discourse?

For each hypothesis, we show (a) the correlation between the measured signal and AI prevalence across monthly samples, (b) the overall distribution of participant survey responses, (c) responses broken down by AI usage frequency, and (d) responses by general view of AI's impact on society.

* * *

## Hypothesis 1: Semantic Contraction Confirmed • ρ = 0.47, p = 0.004

"As AI text becomes more common on the internet, the range of unique ideas and diverse viewpoints shrinks."

**(a) Quantitative Analysis.** _Left:_ Average pairwise cosine similarity of semantic embeddings plotted against AI Likelihood score (ρ = 0.47, p = 0.004). _Right:_ Both signals over time, showing parallel trends that confirm the hypothesis. AI-generated websites had 33% higher semantic similarity than non-AI websites (0.0701 vs. 0.0526).

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Hypothesis 2: Truth Decay Not Confirmed • ρ = −0.19, p = 0.27

"As AI content becomes more common on the internet, I am encountering factually incorrect information and hallucinations more frequently."

**(a) Quantitative Analysis.** _Left:_ Factual error rate plotted against AI Likelihood score (ρ = −0.19, p = 0.27). _Right:_ Both signals over time. No statistically significant correlation was found, despite 75.1% of survey respondents believing in this hypothesis.

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Hypothesis 3: Positivity Shift Confirmed • ρ = 0.56, p = 0.0003

"As AI content becomes more common on the internet, online writing feels increasingly sanitized and artificially cheerful."

**(a) Quantitative Analysis.** _Left:_ Rate of positive documents plotted against AI Likelihood score (ρ = 0.56, p = 0.0003). _Right:_ Both signals over time, showing parallel trends that confirm the hypothesis. AI-generated websites had 107% higher positive sentiment scores than non-AI websites (0.7042 vs. 0.3400).

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Hypothesis 4: Epistemic Islands Not Confirmed • ρ = −0.12, p = 0.48

"As AI content becomes more common on the internet, articles are increasingly providing answers without including links to external sources."

**(a) Quantitative Analysis.** _Left:_ Outbound link density plotted against AI Likelihood score (ρ = −0.12, p = 0.48). _Right:_ Both signals over time. No statistically significant inverse correlation was found.

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Hypothesis 5: Entropy Dilution Not Confirmed • ρ = −0.02, p = 0.89

"As AI content becomes more common on the internet, content is becoming significantly longer in word count while having lower semantic density."

**(a) Quantitative Analysis.** _Left:_ Gzip compression ratio plotted against AI Likelihood score (ρ = −0.02, p = 0.89). _Right:_ Both signals over time. No statistically significant correlation was found.

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Hypothesis 6: Stylistic Monoculture Not Confirmed • ρ = 0.24, p = 0.17

"As AI content becomes more common on the internet, distinct individual writing styles are disappearing in favor of a generic, uniform voice."

**(a) Quantitative Analysis.** _Left:_ Average pairwise character 3-gram Jaccard similarity plotted against AI Likelihood score (ρ = 0.24, p = 0.17). _Right:_ Both signals over time. Despite 83.0% of respondents believing in this hypothesis, no statistically significant correlation was found.

**(b) Overall survey responses**

**(c) By AI usage frequency**

**(d) By view of AI impact**

* * *

## Evidence vs. Public Belief

While the majority of US adults believe in all six tested negative impacts of AI-generated text on the internet, our quantitative analysis only confirms two. Below, we compare the statistical evidence (correlation between each signal and AI prevalence) with the rate of public agreement from our participant survey.

**Statistical Evidence vs. Public Belief for Six Hypotheses.** Left: Pearson correlation coefficient (ρ) between the hypothesis signal and AI prevalence. Green bars indicate statistically significant correlations (p < 0.05). Right: percentage of US adult survey respondents who lean towards agreement with each hypothesis. The public believes in all six negative impacts, but only two are supported by the data.

* * *

## Citation

```
@article{dolezal2026impact,
    title={The Impact of AI-Generated Text on the Internet},
    author={Dolezal, Jonas and Alam, Sawood and Graham, Mark and Bohacek, Maty},
    year={2026}
}
```

* * *

## Acknowledgements

The authors thank the Internet Archive for providing the Wayback Machine data and their extraordinary support throughout this project, and Pangram for providing a research grant supporting the use of their API. We also thank Liam Dugan, Hany Farid, Daphne Ippolito, Shayne Longpre, and Alexander Wang for helpful discussions (listed in alphabetical order).