---
title: "CASTLE: training natural language search before the first real query"
source: "https://medium.com/airbnb-engineering/castle-training-natural-language-search-before-the-first-real-query-3818ef8b4828"
publishedDate: "2026-10-13"
category: "engineering"
feedName: "Airbnb Engineering"
author: "Wendy Ran Wei"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://medium.com/airbnb-engineering/castle-training-natural-language-search-before-the-first-real-query-3818ef8b4828)

#### _How we addressed the cold-start problem for Airbnb’s natural language search by jointly generating synthetic training data — queries and relevance labels — from de-identified booking and search signals._

![View across the lake in St. James’s Park, London, framed by golden autumn willow trees, with the ornate towers and domes of Horse Guards building visible in the background and swans and waterfowl swimming on the water with a fountain spraying in the center.](https://cdn-images-1.medium.com/max/1024/1*EsZaupfNPaIk04Xh5whb5A.jpeg)

**By**: [Wendy Ran Wei](https://www.linkedin.com/in/wendyranwei/), [Hao Li](https://www.linkedin.com/in/haoli-cs/), [Weiwei Guo](https://www.linkedin.com/in/weiwei-guo/), [Xiaowei Liu](https://www.linkedin.com/in/xiaowei-liu-60415841/), [Xueyin Chen](https://www.linkedin.com/in/xueyinsherry/), [Chun How Tan](https://www.linkedin.com/in/chunhowt/), [Malay Haldar](https://www.linkedin.com/in/malayhaldar/), [Soumyadip Banerjee](https://www.linkedin.com/in/soumyadip-banerjee-75991b42/), [Kedar Bellare](https://www.linkedin.com/in/kedar-bellare-3048128a/), [Huiji Gao](https://www.linkedin.com/in/huiji-gao/), [Sanjeev Katariya](https://www.linkedin.com/in/sanjeevkatariya/), and [Stephanie Moyerman](https://www.linkedin.com/in/stephanie-moyerman/)

### Introduction

Natural language search lets guests express intent in their own words, such as “romantic cabin near skiing” or “pet-friendly beach house that sleeps eight,” rather than navigating filters and categories. We needed to introduce this kind of search for Airbnb, and to have it work well from the start. However, this required training the model before we had actual user queries to train the model on, and a reasonable set of relevance labels (inferred from the queries) to map queries to matching listings. Without prior traffic, both must be synthesized from scratch. This is the cold-start problem for natural-language search.

Other organizations have faced similar challenges and have created methods to address them. However, prior approaches address the need for a body of queries and the need for relevance labels separately. Passage-based methods such as InPars \[1\] prompt a large language model (LLM) to generate queries conditioned on a single document, then rely on additional LLM judgments to assign relevance labels, introducing a second source of error. Promptagator \[2\] improves query diversity using few-shot examples, but is still limited by the gap between its generation distribution and real user behavior.

In this post, we describe Contrastive And Seed-guided Training for natural Language sEarch (CASTLE), our framework for jointly generating queries and producing relevance labels from Airbnb’s own de-identified booking data. Our paper describing CASTLE was accepted as a full research paper at the 35th ACM International Conference on Information and Knowledge Management, more widely known as CIKM 2026 \[3\].

### Challenges

Generating useful synthetic training data for search requires more than producing grammatically plausible queries. The distribution of synthetic queries must match how real guests actually search; their preferred phrasing, query length, and attributes they tend to mention. If queries fail to match real-world search patterns, the model trained on them will generalize poorly.

We measured this mismatch using Kullback–Leibler (KL) divergence (a measure of how much one probability distribution differs from a reference distribution) between synthetic and real query distributions — both over surface-level query statistics and over attribute types (property type, amenity, location, and so on). Prior approaches scored between 9.33 and 26.2 on the KL divergence metric: far from the real-user distribution. Beyond distributional alignment, we also needed relevance labels. Generating a query is only half the problem; knowing which listings are relevant to it is the other half.

### Solution

CASTLE addresses both challenges through a single mechanism: contrastive listing pairs derived from de-identified booking sessions, selected in accordance with user privacy permissions. When a guest books a specific listing after viewing several possible alternatives, that event implicitly encodes preference: the booked listing was selected over the others. We use these (positive, negative) pairs of listings — where the negative is randomly sampled from the other viewed-but-not-booked alternatives — as the structured input for query generation. Listing features include amenities, property details, and a one sentence summary of recent public guest reviews, with personal identifying information removed. Because we instruct the LLM to generate a query that is satisfied by the positive listing but not the negative, the relevance label is correct by construction; no post-hoc judgment is required. Crucially, what is “positive” and “negative” is determined by actual, previous user booking behavior, not by the LLM itself, so there is no circularity in the subsequent generation of relevance labels.

![Diagram showing a pipeline where search session and listing feature data are filtered and paired, then processed through an LLM with prompting strategies to generate queries from seed data.](https://cdn-images-1.medium.com/max/1024/1*SnUKzKBbuTC2iWIJHS-6fg.png)

_CASTLE architecture overview — contrastive listing pairs feeding into seed-guided query generation_

**Query generation.** We combine three prompt variants to maximize coverage and realism. Template-based prompts ensure structural diversity across common query patterns. Few-shot prompts use approximately 500 seed queries collected from targeted user research as linguistic exemplars, grounding generated queries in authentic guest language. Attribute-grounded prompts focus the query on specific distinguishing attributes between the two listings, such as a fireplace or proximity to a ski resort. An explicit variety mechanism encourages the model to vary query length and phrasing across samples, preventing “query collapse,” where an unconditioned LLM converges on the same short phrase repeatedly.

Together, these variants produce a word-count distribution with standard deviation σ = 2.48, closely matching real users (σ = 2.49), compared to σ = 0.99 from baselines (InPars and Promptagator) without the seed-guided mechanism. It is worth noting that real Airbnb guests tend to search with concise, intent-focused phrases, typically four to eight words, rather than long natural-language sentences. CASTLE is designed to match this real-world distribution, not to generate artificially verbose queries.

![Stacked bar chart comparing query length distributions (1–2, 3–8, and 9+ words) across seven query datasets, with word-count standard deviation labeled above each bar. Real Users and Survey Seed show the most length variation, while InPars and Promptagator are almost uniformly short (3–8 words).](https://cdn-images-1.medium.com/max/1024/1*k9_WSHcM1dv4bxXAgtMuqQ.png)

_Query length distribution comparison — CASTLE vs. baselines vs. real users_

**Flexible input design.** For listing pairs where contrastive grounding is not available, such as newly listed properties with no booking history, we supplement with a Virtual Judge (VJ), an LLM evaluator that assigns relevance labels to additional query–listing pairs. This extends coverage to long-tail intents without sacrificing the quality guarantees of the contrastive construction for the core training set. We also introduce a real-query seed variant, CASTLE-R, designed for production settings where some real traffic has begun to accumulate.

### Results

We evaluate CASTLE against two previous approaches, InPars-style generation and Promptagator, on two axes: query distributional alignment and label quality.

On KL divergence against real user queries, CASTLE achieves **1.01** — a **9.2× improvement** over the best baseline (Promptagator at 9.33). The improvement holds at the attribute-type level as well: CASTLE’s attribute-type KL of **0.08** is lower than even our hand-curated survey seed queries (0.09), meaning the generated queries capture the diversity of real guest intents more faithfully than the seeds themselves.

![Three bar charts comparing KL divergence from real user queries across five datasets by word count, attribute count, and attribute type, with 95% bootstrap confidence intervals. CASTLE and CASTLE-R consistently show the lowest divergence, while Contrastive-Only, InPars, and Promptagator show substantially higher divergence, especially in word count and attribute count.](https://cdn-images-1.medium.com/max/1024/1*z27vgN4i_HHtAB_tiY-_ng.png)

_KL divergence comparison across methods — CASTLE vs. baselines vs. real user distribution_

To validate label quality, we conducted a human evaluation with three independent subject matter experts reviewing 200 sampled triplets. Annotators agreed with CASTLE’s relevance assignments at **91–93%** across all three raters, confirming that the contrastive construction produces high-quality relevance labels without any human annotation in the loop.

Beyond cold-start, CASTLE’s synthetic data continues to provide value once real traffic accumulates. Because generation is conditioned on specific listing characteristics, it naturally oversamples long-tail intents that appear rarely in organic traffic, such as property types or amenity combinations that guests only search for occasionally, but that have high importance when they do appear.

### Conclusion

The key insight in CASTLE is that authentic booking behavior and LLM generation are complementary, not competing. Contrastive listing pairs from booking sessions ground query generation in real platform behavior and provide relevance labels by construction, while LLM prompting provides the query diversity and linguistic variety that behavioral data alone cannot supply. Together, they close the gap between synthetic and real user distributions in a way that neither approach achieves independently.

Looking ahead, we are exploring multi-turn conversational search, where a guest might begin with “cabin near skiing” and refine to “one that allows dogs” — a setting in which cold-start data generation is an even harder problem, and where the contrastive grounding approach may generalize further. For the full technical treatment, see our CIKM 2026 paper at [arxiv.org/abs/2605.21812](https://arxiv.org/abs/2605.21812) (DOI: 10.1145/3799682.3841071).

Interested in tackling these kinds of challenges? Browse our [previous publications](https://sites.google.com/view/airbnb-relevance-publications/home) or explore our [open roles](https://careers.airbnb.com/).

### Acknowledgments

We would like to thank our collaborators across the AI Platform — Relevance & Personalization team for their support throughout this project.

### References

\[1\] Jeronymo, Vitor, et al. “InPars-v2: Large Language Models as Efficient Dataset Generators for Information Retrieval.” arXiv:2301.01820, 2023.

\[2\] Dai, Zhuyun, et al. “Promptagator: Few-shot Dense Retrieval From 8 Examples.” ICLR, 2023.

\[3\] Wei, Wendy Ran, et al. “CASTLE: Contrastive and Seed-Guided Training for Cold-Start Natural Language Search.” ACM International Conference on Information and Knowledge Management (CIKM), 2026. DOI: 10.1145/3799682.3841071.

_All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this post are for identification purposes only._

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=3818ef8b4828)

* * *

[CASTLE: training natural language search before the first real query](https://medium.com/airbnb-engineering/castle-training-natural-language-search-before-the-first-real-query-3818ef8b4828) was originally published in [The Airbnb Tech Blog](https://medium.com/airbnb-engineering) on Medium, where people are continuing the conversation by highlighting and responding to this story.