---
title: "When Can LLMs Replace Humans in A/B Tests?"
source: "https://engineering.atspotify.com/2026/8/when-can-llms-replace-humans-in-a-b-tests/"
publishedDate: "2026-08-13"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

**TL;DR:** LLM predictions can stand in for human outcomes in A/B tests, but only by assumption, not by design. In an application to the Upworthy dataset with thousands of A/B tests, calibrating LLM outputs against human data recovered the treatment effect, but only using a specific set of methods. The conditions that make this work cannot be verified for new treatments, and they become less plausible the further the new treatment is from past experiments. The promise is least justified precisely when it offers the most benefit.

The promise is straightforward: run the experiment on a model instead of on users, get results in hours instead of weeks, and skip the traffic allocation entirely. But most proposals for replacing humans with LLM in A/B tests skip the statistical question that makes experiments valid in the first place: under what conditions does the experiment identify the treatment effect of interest?

Randomized experiments are considered the gold-standard because they causally identify the treatment effect by design. Replacing real user responses with LLM-generated predictions removes that guarantee. Identification then holds only by assumption. We wrote [a paper](https://arxiv.org/abs/2606.17165) that formalizes what those assumptions are, using surrogate endpoint theory from biostatistics. Our idea is simple: If a surrogate outcome captures everything about a treatment that matters for the outcome, then, clearly, the surrogate is a valid proxy and experimenting on it will give the correct result. In clinical trials, biomarkers from labs are commonly used as fast and cheap surrogates for the clinical result. For A/B tests in digital environments, LLM predictions have become attractive candidates as surrogates for user responses. The promise is that LLM predictions sidesteps the effort, time, and opportunity costs of A/B testing.

## Raw LLM predictions are biased, not just noisy

We empirically evaluated the promise of LLM-based A/B testing using the [Upworthy Research Archive](https://www.nature.com/articles/s41597-021-00934-7), the largest open-access dataset on A/B tests currently available. The dataset contains click-through rates for variants of news headlines across thousands of A/B tests. We prompted gpt-4o-mini to predict the click-through rate of a typical user for each headline, separately for the treatment and control variants. Using those raw predictions in a standard experimental analysis recovered only 39% of the observed human treatment effect. If you used those predictions as if they were human data, you would conclude that treatments are less than half as effective as they actually are.

This is not just random noise. The bias is systematic and directional: LLM outcomes attenuate treatment effects toward zero, making treatments look less effective than they are. A/B tests are used to learn what users value for making better product decisions. If LLM-based experiments are used across many features and product areas, that attenuation causes the organization to underestimate the value they bring to users, and potentially make incorrect shipping decisions.

## Two conditions make LLM outputs valid surrogates 

Our paper formalizes two conditions under which LLM predictions can be used to identify a human average treatment effect.

**Surrogacy**. This assumption requires that the LLM output fully mediates the treatment effect on the human outcome. After accounting for the LLM's prediction and any covariates capturing baseline characteristics independent of treatment, the assignment of a user to the treatment or control condition tells you nothing additional about what the user would do. In plain language: the LLM captures everything about the treatment that matters for the human response. This assumption is often implicitly assumed but rarely spelled out in LLM-based A/B testing, nor is it commonly validated.

![Surrogacy ](https://images.ctfassets.net/p762jor363g1/31kcUgW7lu0pgDVP6zqWqu/28471e2de440a46aa523496abf84f8ab/image3.png)

Fig 1. The surrogacy assumption. LLM predictions fully mediate the treatment effect on humans given covariates.

**Comparability**. This assumption requires that the relationship between LLM predictions and human outcomes, the **calibration function**, remains the same in the new experiment as in the historical data used to estimate it. If the way LLM predictions map to human behavior shifts when the treatment changes, the calibration breaks. This assumption can be generalized to require that the full distribution over pre-treatment characteristics and LLM predictions is stable across experiments. If satisfied, this allows for identifying not just the average treatment effect but other quantities of the effect distribution.

![Comparability](https://images.ctfassets.net/p762jor363g1/mXtMHBekmUncT0ItFxLUE/8b66d20547a20c664b7e0eaf26d61f55/image4.png)

Fig 2. The comparability assumption. The distribution of human outcomes given covariates and the LLM predictions is stable across the human and LLM sample.

When both conditions hold, you can calibrate LLM outputs on A/B test data on users to recover the human treatment effect. When either fails, the estimate will be biased. This bias is not because of a lack of data, but because the procedure identifies something else. Thus, even if you generated an infinite number of LLM predictions, the effect on users would not be recovered, but just the effect on the LLM. Unlike random assignment in a user experiment, neither assumption is guaranteed by design.

## Calibration recovers the effect, but only with the right method

Not all calibration methods work equally well. We tested two on the Upworthy data. Linear calibration using ordinary least squares (OLS) failed the falsification test: a statistical test that checks whether the calibrated effects measured on the LLM responses are different from the human effects on experiments that were held out from training. If the null hypothesis of no difference is rejected, we conclude that the calibrated estimator is unreliable for past data and should not be trusted on new data either. In this case, we found that linear calibration fitted with OLS was too rigid to capture how LLM predictions map to human behavior, landing _3.8 standard errors_ from the human benchmark.

Machine learning models (random forest and gradient-boosted trees) worked better. For these methods, the calibrated estimate fell within the sampling error of the human effect and was thus not statistically significant. These machine learning models were therefore flexible enough to learn the nonlinear relationship between LLM predictions and human outcomes, thereby calibrating the LLM predictions appropriately.

A separate problem is that a single LLM prediction is noisy because of sampling temperature (the randomness in token generation). Unless accounted for, this randomness inherent to LLMs will tend to bias the effect estimate to zero and increase its variance. In our paper, we draw upon measurement error theory and show that simply drawing several outputs from the LLM per experimental unit and using the average as the new LLM prediction mitigates this problem. Intuitively, this stems from the noise component in the LLM predictions is then averaged out, leaving what's left to be closer to the true signal. 

## The real limitation is about future interventions

The surrogacy and comparability conditions can be partially assessed on historical data. They can never be proved to hold for a treatment you have never tested before.

This is a central constraint. The further a new treatment departs from what you have tested before, the weaker the basis for trusting the LLM output as a valid stand-in for human responses. For genuinely new interventions, such as a different UI paradigm, a new pricing model, a feature unlike anything you have shipped, the assumptions are inherently untestable. That is, the setting in which LLMs offer the most benefit for A/B testing is precisely where they are least likely to work. Human experiments therefore remain indispensable for true product innovation.

Against this background, it should be noted that the Upworthy dataset is a near-ideal test case for LLM surrogacy. The outcome is binary (click or not), the treatments are text-based and linguistically similar (headline variants), and LLMs are trained on vast amounts of text about what makes headlines engaging. For treatments that change layouts, algorithms, or pricing, the necessary conditions for LLM-based A/B testing are harder to justify. There is no empirical evidence that the conditions hold in general, for instance, across a company's portfolio of innovations, as would be required to use it at scale.

## Calibration needs the data you are trying to avoid collecting

Our work shows that LLM-based A/B testing can, in theory, work, but requires strong assumptions to hold, careful and context-dependent application of methods, and thorough validation. The Upworthy dataset includes thousands of past experiments of a single type. Most product teams instead have a diverse collection of experiments from different surfaces and product areas, which may even come with different logging. The framework does not eliminate the need for user experiments; it shows that you can only reduce how many user experiments you need when the new experiments resemble ones already run, by letting extrapolation fill in the gap. The upfront investment in collecting _actual_ user responses is not optional, but is what makes LLM-based A/B testing trustworthy.

Changes in LLMs add further complications. Any calibration function is fit to a specific model at a specific point in time. Providers of LLMs update and replace models. A calibration function learned today may not be valid six months from now, even for the same model. Moreover, any new calibration function should ideally be fitted on new user experiments, as otherwise it may be temporally biased. Even if surrogacy and comparability can be made more realistic over time, for instance through better LLMs, prompting or fine-tuning, one still needs to run user experiments to calibrate the LLM outputs, or check that they indeed do map to user outcomes. Advances in LLM predictions is not a way out of human validation. 

## Final words: User experiments work by design, LLM-based experiments by assumption

The surrogacy framework considers when an LLM prediction is a valid [proxy metric](https://confidence.spotify.com/blog/proxy-metrics) for human behavior. Like all proxy metrics, LLM surrogates work until the relationship between proxy and outcome shifts. The framework makes that relationship explicit, testable, and highlights its consequences when it fails. It cannot guarantee the relationship holds for the experiment you care about most: the one testing something new.

That said, LLM predictions can make human experiments better. They can be used to filter out weak ideas before they consume an experiment slot, or serve as [covariates for variance reduction](https://arxiv.org/abs/2606.08853). They thereby offer improvements to experimental selection and efficiency when you have strong historical data and the new treatment resembles past ones. Substituting them for human outcomes is a different move. It trades identification by design for identification by assumption. Do not give that up.