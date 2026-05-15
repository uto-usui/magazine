---
title: "Human creativity benchmark"
source: "https://contralabs.com/research/human-creativity-benchmark"
publishedDate: "2026-05-14"
category: "design"
feedName: "Sidebar"
---

## 1.0Introduction

When professional creatives evaluate AI-generated work, their judgments produce two distinct signals. The first is convergence: evaluators agree on what works, revealing shared best practices like readable typography, functional layout, and strong visual hierarchy. The second is divergence: evaluators disagree, and that disagreement reflects genuine differences in taste, aesthetic direction, and creative intent. Most AI benchmarks treat the second signal as noise to be resolved. The Human Creativity Benchmark separates the two, distinguishing where a model needs to be correct from where it needs to be steerable toward taste, and finds that no current model is reliably both.

This distinction matters because creative work has no ground truth. The dimensions on which experts disagree — aesthetic direction, mood, conceptual risk — are not reducible to miscalibration or error \[1\]\[2\]. Standard evaluation approaches, including majority voting, adjudication, and gold-standard reconciliation, treat evaluator disagreement as something to resolve \[3\]\[4\]. These methods work where labels have objective answers. In creative domains, they would smooth out the information most worth preserving. Work in annotation science has recognized that disagreement can carry signal \[5\], and frameworks like CrowdTruth have formalized this for labeling tasks \[4\]. The Human Creativity Benchmark applies that insight to creative evaluation, where the standard resolution strategies are structurally wrong because taste is legitimately distributed across professionals. Flattening it into a single quality score artificially homogenizes an otherwise diverse workflow and creative process, and produces exactly the generic output that professionals already find unusable.

That homogeneity is already a practical problem. Generative models tend toward mode collapse \[6\]\[7\]: when multiple models are given the same creative brief, they converge on safe, averaged aesthetics rather than distinctive directions. Creative professionals depend on differentiated output. They use AI for trend awareness, style inspiration, and rapid exploration — deciding "what to build?" and validating "is it good?" \[8\]\[9\]. Both require a range of possible directions, and the creative process extends well past first draft \[10\]. Designers iterate fluidly, revisit stages, and make hundreds of small judgment calls where the distance between "good enough" and "right" is entirely a matter of taste \[2\]. A model that converges on a single safe default fails this workflow even when the output is technically competent.

The HCB proposes that creative quality is measured along evaluation axes that fall on a spectrum from objectively verifiable to inherently subjective. Prompt adherence sits at the clear end: did the model follow the instructions? Visual appeal sits at the taste end: does this feel right? Usability falls in the middle, where shared conventions exist but leave room for interpretive difference. Convergence and divergence are properties of these dimensions themselves. Verifiable axes produce agreement because the criteria are shared and checkable. Taste-driven axes produce disagreement because the criteria are personal. The separation of these observations, not just the observation that they exist, is what makes this framework useful.

![](https://framerusercontent.com/images/6yCTOhQDHcdFvgZJ5aaD3I3a44.png?width=1200&height=553)

Convergence and divergence as two interacting signals in creative evaluation. Convergence rises as work approaches production; divergence remains structurally present where the question shifts to taste.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image1 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image1 "Share on LinkedIn — tag @Contra in your post")

![](https://framerusercontent.com/images/pvbLAfW8AdntxEGrkXbOVRBh98.png?width=6843&height=4413)

Convergence by scalar question and domain. Prompt adherence and usability produce higher agreement than visual appeal; Desktop Apps and Landing Page converge most, while Ad Video and Brand Assets remain the most divergent.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image73 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image73 "Share on LinkedIn — tag @Contra in your post")

Convergence captures best practices: shared standards like composition (visual hierarchy, balance), clarity (legibility, information architecture), and technical correctness (rendering, proper alignment, absence of artifacts) that are stable, repeatable, and critical for training models to produce reliable outputs. Divergence captures taste: variation in aesthetic judgment, interpretation, and creative intent that defines what makes creative work distinctive and is essential for steerability, personalization, and creative control. These signals are not always cleanly separated. Best practices may conflict depending on the objective, and apparent agreement may result from limited model expressivity, where outputs are too similar to elicit meaningful differences in judgment and convergence reflects a lack of variation rather than strong alignment.

The benchmark measures both signals through three complementary methods. Pairwise forced-ranking surfaces relative preference. Scalar ratings on three dimensions surface where agreement concentrates. Open-ended qualitative follow-ups surface the reasoning behind each judgment. Together, they produce data that distinguishes convergence-driven dimensions from divergence-driven ones. Collapsing them into a single quality score discards the most actionable information: where a model needs to be correct versus where it needs to be steerable.

To test this framework, Contra Labs ran a study drawing from its network of over 1.5 million independent professional creatives, who have earned over $250M. A select group of evaluators across five creative domains (landing pages, desktop apps, ad images, brand images, and product videos) assessed AI-generated outputs across three phases of the creative process (ideation, mockup, refinement) using all three methods, producing roughly 15,000 individual judgments that reveal where evaluation is objective and where it is irreducibly a matter of professional but interpretative judgement.

## 2.0Methodology

### Creative Process

The study structures the creative workflow into three phases, validated against a separate survey of working creatives:

1. Ideation: Discovery, exploration, and directional potential. At this stage, the creative is not looking for final production quality, but rather for exciting creative direction that is strategically appropriate and worth developing.

![](https://framerusercontent.com/images/y21s72K78wcbrf8ne30oHw4EbH8.png?width=6000&height=3448)

A sculptural luxury leather handbag by Mata Forma, crafted from vegetable-tanned Brazilian leather with architectural brass hardware, positioned as a symbol of modern strength rooted in biodiversity and craftsmanship, designed for confident women who value structure, heritage materials, and quiet authority, (a minimal studio environment inspired by the tones of Amazonian earth and raw clay rather than literal forest scenery), subtle references to Brazilian nature translated into form through curved silhouettes inspired by tree trunks and organic growth rings, refined tailoring details, and natural tonal layering in wardrobe styling, (soft directional lighting creating sculptural shadow play and depth, evoking the feeling of strength emerging from the earth without overt wilderness imagery), (editorial hero composition where the handbag feels like a design object and extension of the wearer's posture, balanced negative space, premium fashion campaign aesthetic expandable into a full luxury accessories series).

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image2 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image2 "Share on LinkedIn — tag @Contra in your post")

2. Mockup: Creative direction has been decided; now it is time to make the vision come to life. The creative is actualizing the project's creative direction, creating product shots, stitching together scenes, incorporating brand identity, and bringing the campaign to life.

![](https://framerusercontent.com/images/klFlnfrPf2TMBUIvH5w9kmoEP0.png?width=6000&height=3448)

A high-resolution luxury fashion product portrait of the Mata Forma structured leather handbag in warm terracotta vegetable-tanned leather with visible natural grain and subtle tonal variation, featuring a brushed architectural brass flap with clean geometric curvature and precision edge finishing, (a refined neutral studio backdrop in soft clay beige with gentle gradient depth and matte surface texture), styled with a tailored taupe blazer and fluid silk skirt in muted earth tones to complement the bag without overpowering it, minimal gold jewelry accents and natural makeup to reinforce understated luxury, (controlled studio lighting with a soft key light from upper left, subtle fill to preserve leather depth, crisp but controlled reflections on brass hardware, realistic shadow grounding beneath the bag), (three-quarter seated editorial composition, eye-level camera angle, shallow depth of field, handbag as clear focal point positioned at the center of visual hierarchy, premium contemporary fashion campaign aesthetic).

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image3 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image3 "Share on LinkedIn — tag @Contra in your post")

3. Refinement: Designs are near production-ready. Slight tweaks are all it will take to cross the finish line. Certain aspects that are meant to be kept consistent with others are targeted for adjustments.

![](https://framerusercontent.com/images/no2ocgq0O4ADRqiwj199s9dZ9o4.png?width=6000&height=3448)

Refine the image to include ad design text for meta ads. The headline should read "Crafted in Brazil. Carried Everywhere." The CTA should be "Shop now". Use an all caps serif font. Sharp corner outline button.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image4 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image4 "Share on LinkedIn — tag @Contra in your post")

Prompts built upon the previous phase, using input images for Mockup and Refinement to simulate a real designer's workflow. Ideation prompts created new design directions, Mockup prompts used that vision and prompted for a more stable direction, and Refinement prompts used that direction and prompted for specific edits.

### Participants and input data

Participants were drawn from Contra's network, a global platform where independent creatives have earned over $250 million across design, video, development, and content projects. We chose these five domains because they reflect the most common professional deliverables on the platform. We selected participants based on skillset and the generative model category most relevant to their workflow, then presented with guidelines contextualizing each phase of the creative process and outlining grading criteria for rubric alignment.

Creative professionals from the Contra network also generated the prompts and input media. Designers were given high-level product and industry information and advised to design output appropriate for their use case. The prompt generation task guided creatives through each phase with baseline structural requirements covering prompt length, camera angles, color palettes, and other domain-relevant attributes. Prompts were reviewed by Contra's research team for clarity and alignment with real-world project briefs, then normalized for consistency. Prompts containing negative sentiment were removed to mitigate potential confounds.

Creative Professional

Output Type

Model Type

Brand Design

Brand Image Assets

Text to image, image to image

Video Editors

Ad Video

Image to video

Product Designers

Desktop Applications

Text to code, code to code

Web Designers

Landing Pages

Text to code, code to code

Content Designers

Ad Images

Text to image, image to image

Domains and creative roles evaluated.

These domains were selected because they represent meaningfully different evaluation conditions. Ad images produce a single static composition with defined elements like a headline, call to action, and product image, whereas a landing page is structurally more complex, with layout, visual hierarchy, and design system fidelity all competing for attention. These differences shape how evaluator agreement behaves across phases and why convergence patterns vary by domain.

### Evaluation design

Five evaluators per domain completed six tasks per phase (called tournaments), with each tournament comprising two tasks centered on one prompt. Model ordering was randomized and identity anonymized throughout.

Task 1: Pairwise comparison. Raters were presented with two outputs side-by-side across all possible pairings, producing six pairwise judgments per prompt. Rather than scoring against a predefined rubric, raters selected the output they preferred, isolating the subjective judgment a creative professional would actually apply in practice. After each selection, raters described the rationale in their choice. Pairwise results were aggregated using a Bradley-Terry model to produce ELO ratings for each model.

Task 2: Scalar ratings. Three Likert-scale subtasks, intentionally broad to surface what matters most to creatives across different contexts:

-   Prompt Adherence: How faithful is this output to the given prompt? The least subjective of the three scales, grounded in whether a model did what was asked.
-   Usability: How well does this output function in the context of the prompt and campaign? This measures whether an output could realistically be used in a professional context.
-   Visual Appeal: How visually interesting, cohesive, and polished is this output? This dimension targets taste: the aesthetic judgment that distinguishes work a creative would choose rather than merely accept.

After each scalar rating, raters provided free-write feedback describing the strengths and weaknesses of each output.

### Analysis

Pairwise preference data was aggregated using a Bradley-Terry model to produce ELO ratings by domain and phase. Scalar ratings were analyzed across all three dimensions, with Kendall's W quantifying evaluator agreement at each phase. Qualitative feedback was analyzed using a two-stage thematic coding pipeline: all feedback was stripped of personally identifiable information and model identities were blinded, then processed through a deductive coding pass using GPT-4o with a predefined codebook, returning assigned themes, per-theme sentiment, and key quotes. Raw outputs were parsed and normalized into structured data frames for cross-domain and cross-phase analysis.

## 3.0What we found

![](https://framerusercontent.com/images/AiVL8ATiwSIuz2CcN5lyaHHnaZs.png?width=8900&height=4726)

Pairwise preference rank vs. mean scalar rating across all evaluations. Where evaluators converge on quality, points cluster tight; where taste takes over, the spread widens.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image5 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image5 "Share on LinkedIn — tag @Contra in your post")

Not everything evaluators agree on is a matter of taste, and not everything they disagree on is a matter of error. Design judgment operates on two registers simultaneously: shared professional standards that produce convergence, and individual creative perspective that produces divergence. When work has clear functional failures, unreadable text, broken hierarchy, visible artifacts, evaluators converge. The criteria are verifiable and the problems are obvious.

![](https://framerusercontent.com/images/TRswiXJcbCsDe0mxaOPkbOE1pc.png?width=6000&height=3448)

Convergence at work: a technically clean product shot that earns broad agreement on craft, framing, and usability.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image6 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image6 "Share on LinkedIn — tag @Contra in your post")

When work clears that threshold, something shifts. Once every output is good enough, designers stop evaluating against standards and start evaluating against taste. They diverge not because of disagreements on quality, but because quality is no longer the question.

![](https://framerusercontent.com/images/5zHYSGJLP30zYKphLqWAejSA68.png?width=6000&height=3448)

Divergence at work: a campaign-ready ad where craft is satisfied and rationales fan out across taste, brand fit, and personal preference.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image71 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image71 "Share on LinkedIn — tag @Contra in your post")

Kendall's W captures this pattern across domains. Ad image agreement rises consistently (0.345 to 0.436 to 0.549), the clearest convergence arc in the dataset, because refinement in ad design involves assessing typography, CTA placement, and contrast, all themes evaluators independently landed on. Product video follows the same direction (0.402 to 0.472 to 0.493). Landing pages run counter (0.484 to 0.293 to 0.333): Claude Opus 4.6's ideation dominance creates a clear standout that produces agreement, but once design system constraints come into play and all outputs become acceptable, personal judgment takes over.

The same separation appears across evaluation dimensions. Visual appeal produces more evaluator disagreement than prompt adherence, and that gap is informative. High agreement on prompt adherence tells us the criteria are shared and checkable. Low agreement on visual appeal tells us the criteria are personal and legitimately distributed. These dimensions sit at different points on the objectivity spectrum, and the variation in Kendall's W across them is evidence that the benchmark's two-signal separation is working as designed.

> “I was judging based off of personal opinion and taste of what looks the best in my eyes.Evaluator · Desktop App Mockup

> “Honestly, I feel like all four images could be used as brand visuals. What made me choose some over others was the sense of life: some felt more dynamic, realistic, and human.Evaluator · Brand Design Ideation

### Model and domain insights

No model leads all three phases in any domain. The reason is that the expectations of a designer from a model change as their work progresses.

1.  Ideation specialists. Claude Opus 4.6 and Veo 3.1 generate strong first drafts but struggle when asked to iterate, leading ideation and falling behind by refinement.
2.  Refinement climbers. GPT 5.3 Codex, Grok Imagine Video, Seedream 4.5, and Qwen 3.5 start weak in ideation but improve as tasks become more constrained and specific, with GPT 5.3 Codex and Grok Imagine Video each reaching first place in refinement despite starting last or third.
3.  Mockup specialists. Gemini 3.1 Pro Preview and Gemini 3 Pro Image excel at introducing design system elements like color palette, grid, and typography, but struggle once iteration takes over.

![](https://framerusercontent.com/images/Y0acY7MZiFH6lwHGO9PzOpKeaE0.png?width=6535&height=4134)

Average pairwise win rates across phases by model. Three different models lead each phase: Claude Opus 4.6 in ideation, Gemini 3 Pro Image in mockup, and Grok Imagine Video in refinement.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image72 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image72 "Share on LinkedIn — tag @Contra in your post")

#### Landing Pages

![](https://framerusercontent.com/images/BadrlMjtcxgrKgg12kVx5JoauIM.png?width=6000&height=3448)

Landing Pages: cross-phase win rates. Claude leads Ideation; Gemini takes Mockup; Claude reclaims Refinement.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image11 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image11 "Share on LinkedIn — tag @Contra in your post")

Landing Pages shows the clearest phase-by-phase handoff. Claude Opus 4.6 leads in Ideation, when evaluators are exploring directions, and Claude Opus 4.6 produces outputs with strong visual hierarchy and layout coherence that feel intentional at first pass.

![](https://framerusercontent.com/images/MNZ97sPdAIYCBAxfOUAxKXDAlBI.png?width=3000&height=1422)

Landing Pages: Mockup-phase scalar ratings. Gemini 3.1 Pro Preview leads on Usability and Prompt Adherence as design-system constraints come into play.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image12 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image12 "Share on LinkedIn — tag @Contra in your post")

When a design system is introduced, however, Gemini 3.1 Pro Preview takes over (68.9%), dominating all pairwise matchups (63.3% to 76.7%) with the highest Usability scalar in the phase (4.03). Evaluators at this phase often mention prompt adherence, grid structure, color consistency, and typographic pairing, all of which Gemini 3.1 Pro Preview executes better. This advantage is lost by Refinement, when the task becomes incremental editing where Gemini 3.1 Pro Preview returns to second (52.2%) and Claude Opus 4.6 reclaims the lead (60.0%).

By Refinement, all four models cluster between 3.9 and 4.4 across all scalar dimensions. The field compresses as every model approaches a production-ready threshold, and preference comes back down to taste.

![](https://framerusercontent.com/images/F6N4e5ny4wNFNulqaeYoF6z3Wkg.png?width=8345&height=3530)

Landing Pages: Refinement-phase scalar comparison. The field compresses as every model approaches a production-ready threshold.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image13 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image13 "Share on LinkedIn — tag @Contra in your post")

GPT 5.3 Codex shows the most consistent improvement of any model (25.0% to 37.1% to 40.0%) with Qwen 3.5 improving steadily, without leading any phase (37.7% to 44.4% to 47.8%).

![](https://framerusercontent.com/images/U2lNF4qJS9EhfAha2h24UScI1d0.png?width=8343&height=3530)

Desktop Apps: scalar performance ribbons (Prompt Adherence, Usability, Visual Appeal) across phases. All four models climb from Ideation to Refinement, converging in the 3.6–4.0 range.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image14 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image14 "Share on LinkedIn — tag @Contra in your post")

#### Product Videos

Product Videos: phase-by-phase win rates. Veo 3.1 leads Ideation; Kling 3.0 Pro leads Mockup; Grok Imagine Video leads Refinement.

No model leads more than one phase in Product Videos, producing a three-phase handoff. Veo 3.1 leads Ideation (61.1%), Kling 3.0 Pro leads Mockup (61.1%), Grok Imagine Video leads Refinement (56.5%). Kling 3.0 Pro is the most consistent performer across all three (51.4% to 61.1% to 51.9%), and the only model meaningfully competitive in every phase.

![](https://framerusercontent.com/images/c0wQaDokLRgNxb31yKNFLO6xWlo.png?width=8344&height=3853)

Product Videos: scalar ratings by phase. Veo 3.1 degrades on every measured dimension as the task shifts from generation to iteration.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image16 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image16 "Share on LinkedIn — tag @Contra in your post")

Veo 3.1 is the only model that degrades across all three phases on every measured dimension. In the Ideation phase, when evaluators are generating concepts from scratch, Veo 3.1 dominates the task. But when the work shifts to iterating on existing content, evaluators raise negative sentiments around unwanted transitions and visual distractions. The sentiment indicated that it introduces new elements rather than applying targeted edits. Mentions of realism track this directly with Veo 3.1's net ratio moving from +6 in Ideation to −3 in Refinement, while Grok Imagine Video improves from −15 to +20 and Kling 3.0 Pro from −7 to +8. What makes Veo 3.1 excellent at generation, its creativity, is also what makes it unreliable for refinement.

Epistemic network analysis reveals a structural split: Veo 3.1's evaluation profile clusters around generation quality themes like Motion & Blur and Usability, while Grok Imagine's clusters around production fidelity themes like Realism and Scene Coherence, mapping directly onto the phase handoff between them. Scene Coherence is net negative across all four models, suggesting temporal consistency remains the most persistent challenge in AI video generation.

Seedance 1.5 Pro improves from weakest in Ideation (41.7%) to competitive in Refinement (52.8%). Prompt Adherence also correlates independently with Usability (0.64) and Visual Appeal (0.58); a video can look and feel right while still missing what the brief asked for.

Outputs across three workflow phases being analyzed by an evaluator. In Ideation, evaluators prioritize prompt interpretation and realism. By Mockup, motion and spatial logic come under scrutiny. In Refinement, the bar shifts to production readiness: every element present, no artifacts, seamless transitions.

#### Ad Design

![](https://framerusercontent.com/images/JNmLb4ayChtSeceQ2FSQdggU6xY.png?width=6000&height=3448)

Ad Design: annotated evaluator feedback across the three workflow phases.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image17 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image17 "Share on LinkedIn — tag @Contra in your post")

Ad Images has the most reliable convergence arc of any domain, with evaluator agreement rising at every phase transition (0.345 → 0.436 → 0.549) as the evaluation criteria become progressively more verifiable.

![](https://framerusercontent.com/images/yngVyhPUMVDq6rkHD5Fk07a6FE.png?width=989&height=590)

Ad Images: Kendall's W rises sharply across phases as criteria shift to verifiable typography, CTA placement, and contrast.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image18 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image18 "Share on LinkedIn — tag @Contra in your post")

Analysis suggests evaluators follow a strict decision hierarchy rather than making holistic judgments, with usability acting as a hard gate: outputs scoring 1 on usability reach the top two positions only 10% of the time, rising to 22% at a score of 2 and 36% at a score of 3, regardless of visual quality. Among outputs that clear this threshold, prompt adherence serves as the primary ordering criterion. Visual appeal resolves close contests as a tiebreaker, but high visual appeal cannot rescue low prompt adherence, as evaluators are assessing whether the typography is legible, the CTA is placed correctly, and the contrast holds. These have close to objective answers, and evaluators reach them without coordination.

GPT Image 1.5 leads ideation and mockup but drops to third by refinement as tasks shift to targeted iteration, with Seedream 4.5 following the opposite trajectory: starting third in ideation and climbing to first by refinement. Flux 2 Pro mirrors a similar arc, climbing from last in ideation to second by refinement. Gemini 3 Pro holds steady through the first two phases but finishes last in refinement, consistent with the pattern seen in landing pages.

![](https://framerusercontent.com/images/iIR3H5cH12cvDD2Ak7z5G0fvw.png?width=8344&height=3849)

Ad Images: model trajectories across phases, showing GPT Image 1.5's drop and Seedream 4.5's climb.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image19 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image19 "Share on LinkedIn — tag @Contra in your post")

GPT Image 1.5 early dominance does not transfer to Brand Design, where evaluation norms shift after Ideation enough that the model's strength does not transfer. Gemini 3 Pro Image follows the same arc in Brand Design as it does in Landing Pages.

Seedream 4.5's climb from third to first tracks a sharp improvement in sentiment across composition, usability, and typography by refinement, themes where it was weak or negative in earlier phases. GPT Image 1.5 maintains positive sentiment across all phases but its margins compress by refinement, where Seedream and Flux 2 Pro close the gap on the criteria evaluators prioritize. Gemini 3 Pro is strong in mockup, with high sentiment in composition, lighting, and product accuracy, but collapses in refinement as typography and product accuracy turn negative.

![](https://framerusercontent.com/images/3JeYTSM8DiyWfSU76ilVcoaQmI.png?width=3000&height=1636)

Evaluator feedback across three workflow phases for FLUX 2 Pro (Ad Images). In Ideation, the evaluators speak of composition, lighting, and palette. By Mockup, attention shifts to material fidelity and integration. In Refinement, critique changes to a distracting text container, insufficient CTA sizing, and layout choices.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image8 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image8 "Share on LinkedIn — tag @Contra in your post")

#### Desktop Apps

![](https://framerusercontent.com/images/jsw0qfGsCmpAzfqZ4v1khS2MI.png?width=3010&height=1650)

Desktop Apps: scalar ratings and win rates across phases.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image20 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image20 "Share on LinkedIn — tag @Contra in your post")

Desktop Apps evaluation surfaces fifteen core themes spanning prompt adherence, usability, layout quality, visual hierarchy, readability, and design conversion efficiency. This breadth reflects the complexity of the task and how evaluators assess them on dimensions that span structure, interaction, and visual craft simultaneously.

The Mockup phase has evaluator feedback on prompt adherence and usability, which transitions into head-to-head output comparisons by Refinement. There is an increase in prompt adherence mentions for Rank 2 outputs, coupled with a significant increase in usability and design consistency mentions for Rank 4, suggesting that the flaws become more apparent in lower-ranked outputs rather than surfacing evenly across the field. GPT 5.3 Codex has the highest volume of evaluator mentions across models, maintaining a strong positive association with usability.

![](https://framerusercontent.com/images/Zd2V63uHLquFBkMHTfj2srSCg.png?width=3000&height=1540)

Outputs of a journaling app across three workflow phases. In Ideation, evaluators weigh usability choices, hierarchy, and the value the interface provides to the user. By Mockup, the focus narrows to prompt adherence: visibility of key text, clarity of the CTA, and whether components like the mood selector feel refined. In Refinement, evaluators assess structural consistency, noting where AI fails to maintain contrast and coherence across repeated design elements.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image9 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image9 "Share on LinkedIn — tag @Contra in your post")

Epistemic network analysis reveals distinct model signatures. Claude Opus 4.6's usability is tightly bound to prompt adherence: when Claude Opus 4.6 follows the brief, evaluators perceive the output as usable almost immediately. For Gemini 3.1 Pro, that coupling is weaker. Though usability and prompt adherence co-occur, without the same consistency, evaluators occasionally note usable outputs that deviate from the brief or adherent outputs that still feel unusable. Qwen 3.5 stood out as strong on usability, layout, and visual hierarchy, but detail execution themes like typography, whitespace and spacing, and component design form a negative sub-network, suggesting Qwen 3.5 struggles with granular design elements.

![](https://framerusercontent.com/images/50hAj0dXMq02K9ER85HmqKvmV4.png?width=10350&height=6524)

Desktop Apps: epistemic network analysis showing how usability, prompt adherence, and detail-execution themes cluster differently across models.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image21 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image21 "Share on LinkedIn — tag @Contra in your post")

Evaluator attention shifts from Layout in Ideation to Visual Hierarchy by Refinement, mirroring standard human-centered design lifecycles where broad architectural concerns precede granular fidelity. AI models currently struggle most at this final stage. While they handle ideation and structural layout well, Refinement shifts evaluator attention to granular design details like interaction patterns, icon quality, and accessibility, areas where sentiment turns negative and current models consistently underperform.

### Phase Insights

Each phase of the creative process places different demands on the designer and the models being evaluated. Those demands shift evaluation criteria, theme frequencies, scalar distributions, and evaluator agreement in consistent and predictable ways.

#### Ideation

In Ideation, designers are exploring. No direction has been chosen yet, and the goal is to find one. Evaluators are asking whether the work communicates something coherent, and structure becomes the deciding factor.

In Landing Pages, Layout (159 mentions), Visual Hierarchy (103), and Usability (101) dominate feedback as evaluators assess whether the page architecture makes sense before any other details matter.

![](https://framerusercontent.com/images/Aw7mrrQgX2xoK5ClvQmMJtXbxO8.png?width=989&height=590)

Landing Page theme frequency, Ideation phase. Layout, Visual Hierarchy, and Usability dominate.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image22 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image22 "Share on LinkedIn — tag @Contra in your post")

In Product Video, Motion & Blur (139 mentions, 24% of total) dominates: when generating concepts from scratch, the first thing evaluators notice is the smoothness of motion. Scalar ratings are at their lowest across all domains where outputs are rough, and evaluators judge accordingly.

![](https://framerusercontent.com/images/GRGhKwfQGzbziOuPp1SNCDAO00A.png?width=990&height=590)

Product Video theme frequency, Ideation phase. Motion & Blur dominates concept-from-scratch generation.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image23 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image23 "Share on LinkedIn — tag @Contra in your post")

When the task is open-ended, evaluation criteria are too. Evaluator agreement is moderate across all domains (Landing Page W = 0.484, Product Video W = 0.402, Ad Image W = 0.345), reflecting the range of valid directions a creative could pursue before a reference is established.

#### Mockup

In Mockup, a direction has been chosen and a reference introduced. Designers are no longer exploring; they're checking for coherence, and adherence. The question shifts from "does this communicate?" to "does this match what we decided?".

In Landing Pages, Color & Theme replaces Layout as the top evaluation theme (86 mentions), reflecting that evaluators are now testing design system fidelity, focussing on the correct palette, typography, and visual language from the brief.

![](https://framerusercontent.com/images/qpSS8s4WVWVC9WO0SP3cUSQuLo.png?width=6000&height=3448)

Evaluator comments on a Qwen 3.5 landing page output in the Mockup phase.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image24 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image24 "Share on LinkedIn — tag @Contra in your post")

The Prompt Adherence to Usability correlation strengthens to r = 0.65. When a specification is explicit, following it closely produces a more usable output almost automatically. In Product Video, Motion & Blur drops sharply as evaluators move past artifact concerns toward assessing quality of motion.

#### Refinement

In Refinement, designers are pushing toward shipping. In practice, this is where work is near-final, and small decisions carry outsized consequences. In this study, the refinement phase simulates that stage, where prompts are most constrained, references are established, and evaluators are assessing outputs through a production-ready lens.

Evaluators shift from evaluating structure and prompt adherence to evaluating production readiness, and the threshold rises.

In Landing Pages, usability becomes the top theme (~16%), and typography nearly triples in frequency (~3% to ~7%). Once layout and color are resolved, evaluators zoom in on whether the type is set correctly, the CTAs are clear, and the spacing is consistent.

In ad images, this shift is even more pronounced. Typography explodes from 3% of mentions in earlier phases to ~34% in refinement, by far the dominant concern. Evaluator agreement reaches its peak across the entire study (W = 0.549) as criteria narrow to typography legibility, CTA placement, and contrast: criteria with close to objective answers that evaluators reach without coordination.

![](https://framerusercontent.com/images/n6AvGXMwSF49v1CPrwZosnlAoQ.png?width=7146&height=4141)

How evaluator attention shifts across workflow phases. Early-stage feedback spreads across many dimensions; by Refinement it narrows to a few client-ready themes.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image25 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image25 "Share on LinkedIn — tag @Contra in your post")

Usability functions as the single strongest predictor of competitive success: images scoring 5 on usability finish in the top 2 ranks 84% of the time, compared to just 10% for score-1 images. The Usability to Visual Appeal correlation reaches 0.818, the highest in the Landing Page domain, confirming that at this stage, evaluators are looking for an output that both looks and feels right.

In product video, the shift is from motion artifacts to physical believability. Realism sentiment tracks this directly, and models that introduce new elements rather than applying targeted edits lose ground, while models that maintain visual consistency gain it. Evaluator agreement rises to 0.493, and feedback narrows to whether the video feels grounded and production-ready rather than generated.

## 4.0Limitations

This study was conducted with a select group of evaluators assessing 93 prompts across 80 sessions, yielding 5,940 pairwise judgments, 5,940 scalar ratings, and 3,675 qualitative responses. While this dataset provides a substantive basis for analysis, it represents a starting point. Future research will expand the evaluator pool to capture a broader range of aesthetic preferences and design sensibilities across regions, industries, and experience levels.

The prompts were authored by industry professionals and reviewed by Contra's internal team for consistency and clarity, with a normalization process applied and negative-sentiment prompts removed. However, the prompt set was not subjected to external validation or independent expert review, and the possibility of latent bias in prompt construction cannot be excluded.

This study, although framed around the creative process, does not fully represent how creative work unfolds in practice. The process is rarely this linear. Designers iterate fluidly, move between tools, revisit stages, and often work across modalities within a single project. Future research will explore longer, less constrained creative arcs to better understand how these evaluation dynamics play out in practice.

The study does not control for differences in general model capability. Phase-level performance shifts may partially reflect how varying constraint levels expose or compress baseline capability differences rather than creative workflow fit. However, the consistency of evaluator agreement patterns across dimensions, where the same model produces high convergence on verifiable axes and high divergence on taste-driven axes, suggests that the structural separation between convergence and divergence holds independently of overall model capability.

## 5.0Implications

### For Model Developers

Best-practice adherence and taste flexibility are potentially orthogonal axes. A model can be high on both, low on both, or high on one and low on the other. Where a model lands is a product decision, not a technical one.

Training heavily on convergence data pushes a model toward strong best-practice defaults: outputs that reliably follow briefs, use correct typography, and place CTAs where they belong. Building steerability pushes a model toward taste flexibility: outputs that respond to individual creative direction and vary meaningfully across prompts without collapsing to a single house style.

![](https://framerusercontent.com/images/pLSWmPIi8ZilRWltVIOlidWLuY.png?width=1639&height=960)

Best-practice fit and steerability as orthogonal axes. Models cluster by where they earn their advantage: strong defaults, strong steerability, or one without the other.

Share

[](https://twitter.com/intent/tweet?text=The%20Human%20Creativity%20Benchmark%20by%20%40contralabs_ai&url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image10 "Share on X — mentions @contralabs_ai")[](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcontralabs.com%2Fresearch%2Fhuman-creativity-benchmark%23fig-image10 "Share on LinkedIn — tag @Contra in your post")

The ideal is both: strong defaults and steerable away from them. But most models today sit in only one quadrant. Claude at Ideation, for example, shows high creative latitude but weaker spec compliance, positioning it as a "creative partner" that generates divergent options but may not nail the brief on first pass. Gemini at Mockup shows the inverse: strong spec compliance with less creative range, an "opinionated engine" that delivers reliable defaults but resists being steered away from them. The HCB framework gives developers the data they need by keeping these axes separate.

A model developer building a production-ready design tool may want strong best-practice defaults, optimizing on convergence so that outputs are usable out of the box. A developer building a creative exploration tool may want maximum steerability, preserving divergence so that the model can match a wide range of creative intents without flattening them.

### For Tool Builders

No model in this study led all three creative phases in any domain. This is not a flaw in any one model. It reflects a fundamental mismatch between what each phase demands and what each model does well. Creative workflows are not single-model problems. UX needs to account for phase transitions and surface the right model at the right moment. This does not necessarily mean asking the user to choose manually. It means designing systems that understand where a creative is in their process and adjust accordingly.

### For Creatives

This research provides language for something many creative professionals already feel: the frustration with AI tools is not that they produce bad work, but that they produce undifferentiated work. Understanding which models excel at exploration versus execution, and where in the process agreement breaks down into personal preference, gives creatives a basis for choosing tools deliberately rather than defaulting to one.

### For the Industry

The current default question, "is this output good?", is incomplete. This study suggests the question should be: good for whom, at what stage, and toward what end? Separating convergence from divergence makes it possible to measure whether a model meets professional standards and whether it supports individual creative intent. These are not the same capability, and optimizing for one does not guarantee the other. A model can be technically excellent and creatively flat. The opportunity is to build evaluation systems, and ultimately models, that treat both signals as first-class metrics.

Several directions emerge from this work. Future studies will explore less constrained workflows, including recursive feedback loops, cross-tool iteration, and multi-session creative arcs. The finding that no model led all phases in any domain suggests studying how professionals combine models across phases and whether deliberate model switching improves outcomes. And the dual-signal framework points toward training approaches that build models meeting professional standards while preserving the capacity for individual creative intent.

## 6.0Future research

This study is the first in an ongoing research program at Contra Labs. The convergence-divergence framework and the evaluation methodology are designed to be extended, and several directions follow directly from the findings and limitations of this work.

The most significant limitation is scope. The HCB structures the creative process as three discrete phases, each evaluated independently. Professional creative work is less contained. Designers move fluidly between tools, revisit earlier stages, and iterate across modalities within a single project. The phased structure was necessary to isolate variables in a first study, but it compresses the dynamics that matter most in practice: how creative judgment shifts over the course of a full project, how feedback loops between phases reshape evaluation criteria, and how multi-model workflows perform when professionals combine tools deliberately rather than defaulting to one. Future studies will extend the evaluation window to capture these longer, less constrained creative arcs.

The finding that no model led all three phases in any domain raises a practical question worth studying directly: does deliberate model switching improve outcomes, and can tools surface the right model at the right moment without adding friction? Separately, the dual-signal framework points toward training applications. Convergence data identifies best practices that models can and should learn. Divergence data identifies where models need to be steerable rather than optimized toward a single target. Formalizing these signals into training frameworks is a natural next step.

Contra Labs has the infrastructure to pursue this work: access to a global network of over 1.5 million independent professional creatives, direct visibility into how professional work is generated, evaluated, and chosen, and an evaluation platform built to capture both signals at scale. The aim is to close the gap between how AI systems measure creative quality and how the people who make creative work judge it.