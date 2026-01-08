---
title: "Why We Use Separate Tech Stacks for Personalization and Experimentation"
source: "https://engineering.atspotify.com/2026/1/why-we-use-separate-tech-stacks-for-personalization-and-experimentation/"
publishedDate: "2026-01-07"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

## Introduction

Personalized apps have become essential for improving user experience across diverse user bases. Rather than providing a one-size-fits-all experience for the “average user,” personalization delivers unique experiences tailored to individual preferences. This works by learning relationships between user characteristics (age, past behavior, product preferences) and their preferred experiences.

Modern recommendation systems leverage sophisticated models like deep neural networks and LLMs to process rich feature sets, determining the optimal experience for each user in specific contexts.

Experimentation naturally supports personalization development and evaluation ([Schultzberg and Ottens, 2024](https://arxiv.org/abs/2404.08671)). Teams compare new model versions to iteratively improve personalization systems. Meanwhile, adaptive experimentation tools like multi-armed bandits are gaining popularity, dynamically reallocating traffic from poorly performing treatments to successful ones for faster experimentation.

Contextual bandits represent a more advanced approach, using models and features to predict the best treatment for users based on their characteristics. This sounds remarkably similar to personalization, and that’s because it essentially is. 

This begs the question: What actually distinguishes experimentation from personalization?

At Spotify, we’ve ended up with clear separation between these domains. We build personalization systems using our ML/AI stack and improve them through [our experimentation stack.](https://confidence.spotify.com/) In this post, we’ll share some of the technical and practical reasons we’ve found it helpful to keep these stacks separate.

## What is personalization?

Personalization drives much of the success in modern applications. By recognizing that users differ, products can improve not just on average, but at the individual level.

Spotify’s personalization examples include personal audio recommendations (personalized playlists, weekly discovery, next-song suggestions), personalized search (results tailored to your listening and search history), and personalized home screen (shortcuts to frequently used features for smoother sessions).

The literature on building personalized “recommender systems” is vast and rapidly expanding. Various machine learning models and AI systems serve different personalization needs. Reinforcement learning (RL) has become increasingly central to modern recommendation systems ([Sutton and Barto, 2015](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf)).

RL works by sequentially recommending content based on user characteristics and context, then using responses to improve future recommendations for similar users. Through continuous iteration, the model learns increasingly effective recommendations, reinforcing approaches that work for specific user types.

With sufficiently rich characteristics and context data, plus flexible recommendation models, systems can theoretically learn arbitrarily fine-grained recommendations unique to each user and situation.

## The overlap between personalization and experimentation

![Personalization and experimentation_image 1_final.png](https://images.ctfassets.net/p762jor363g1/5VQnwCleKfgUTbGXkaBYbz/9ff9047d3e6ee5d9ac256a0c2dac9748/Personalization_and_experimentation_image_1_final.png)

Figure 1: The progression from A/B testing to personalized recommendation systems through multi-armed and contextual bandits.

In A/B tests, users are randomized into variants to find the best-performing option on average across all users.

Multi-armed bandits resemble A/B tests but adjust treatment proportions during the experiment based on performance. This adaptive allocation strategy, formalized in bandit theory ([Lattimore and Szepesvári, 2020](https://tor-lattimore.com/downloads/book/book.pdf)), enables efficient exploration by dynamically reallocating traffic based on observed results. Better-performing treatments receive larger user proportions.

Contextual bandits condition on user features when deciding which arm to serve, rather than measuring performance across all users. For example, in a two-arm bandit, arms might perform equally overall, but Arm 1 could excel with younger users while Arm 2 works better for older users.

Moving from multi-armed bandits to contextual bandits fundamentally shifts the goal from finding a single best variant to _personalization_. Non-contextual multi-armed bandits identify the best arm on average, closely resembling A/B tests ([Liang and Bojinov, 2023](https://arxiv.org/abs/2311.05794)). Contextual bandits operate on the premise that no single arm fits everyone’s preferences.

While contextual bandits can estimate average treatment effects (ATEs) since confounders are explicitly known through contextual features ([Bibaut et al., 2021](https://proceedings.neurips.cc/paper_files/paper/2021/hash/eff3058117fd4cf4d4c3af12e273a40f-Abstract.html)), the value of measuring ATEs or conditional average treatment effects (CATEs) becomes questionable when your goal shifts to personalization. For online recommendation systems, the overall value of personalization matters more than an individual arm’s effects. The key question becomes: How much does personalization improve user outcomes compared to simply serving the best average treatment to everyone?

Consider optimizing a checkout flow where you currently show the same Buy Now button to all users. You have several button variants with different colors, text, and layouts. Instead of running a traditional A/B test to find the single best button, you build a contextual bandit that shows different buttons based on user characteristics: their cart contents, age, and location. Now there’s no single “best button,” only a “best system” that personalizes which button each user sees. To evaluate this personalization system, you need to run an experiment comparing it against the original static button or against previous versions of the system. The contextual bandit itself is a feature you’ve built, not an experimental method, so it requires its own experimentation to measure its value.

## Why we separate experimentation and personalization at Spotify

At Spotify, personalization, AI, and recommendations are core product features, while experimentation drives iteration and evaluation across all products. We do use algorithms like [contextual bandits to enhance personalization](https://research.atspotify.com/2025/9/calibrated-recommendations-with-contextual-bandits-on-spotify-homepage), but they live in our ML stack, not our experimentation tools. Here’s how we think about it.

### The technical side of things

We keep our personalization systems in the ML stack due to strict infrastructure and performance requirements. When you’re iterating on recommendation systems, you need access to all kinds of model types (boosting, random forests, neural networks, LLMs, regression, contextual bandits) with rich feature sets. This means you need infrastructure for training and serving models that meet these models’ requirements.

Model inference for user recommendations needs low-latency feature access with real-time data collection and fast recommendation computation at request time. ML stacks are built exactly for this. If you try to integrate this into experimentation tools, you either end up massively expanding what your experimentation stack does, or you limit how good your contextualization can be. As [Sculley et al. (2015)](https://proceedings.neurips.cc/paper_files/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf) show, mixing concerns in ML systems creates hidden technical debt and complexity that gets harder to manage as systems grow.

### Why we still need to evaluate everything

There’s another thing to consider: We still need to evaluate personalization systems through experiments. Even if you use a contextual bandit within experimentation tools, you still need to evaluate that bandit as a system through A/B tests on different bandit versions. When A/B tests and multi-armed bandits live in the same tool, this creates some confusing dependencies between different instances of the tool.

We’ve found that keeping a clean separation of concerns helps us scale efficiently with less friction for product teams. Our ML platform standardizes how to build personalization systems at scale. [Our experimentation platform, Confidence](https://confidence.spotify.com/), makes it effortless to evaluate these systems in parallel with thousands of other experiments.  

### How we make it work together

At Spotify, we treat contextual bandits and any personalization system as treatment variants in A/B tests and rollouts. We make this work through tight integration between our ML platform and experimentation platform.

The approach is pretty straightforward: Each tech stack does what it’s good at. The ML stack serves recommendations; the experimentation stack evaluates recommendation systems.

## The one-dimensional focus of multi-armed bandits

People often praise non-contextual multi-armed bandits for their efficiency at testing many variants while spending less traffic on obvious losers. This is true, but multi-armed bandits have limitations that restrict their practical value. These limitations are so significant that we don’t use multi-armed bandits at Spotify for experimentation.

Multi-armed bandits distribute traffic proportionally to variant performance, making the definition of “performance” critical. Most bandits optimize for a single metric, directing more traffic to variants that excel on that dimension. However, most companies need variants that balance multiple competing objectives.

For example, a recommendation algorithm might boost immediate listening time by only suggesting familiar songs users already love. While this looks great on short-term engagement metrics, it reduces music discovery and ultimately harms long-term satisfaction. Traditional A/B tests address this by monitoring multiple metrics simultaneously, using primary metrics to measure success while employing guardrail metrics to catch harmful trade-offs.

Multi-objective bandits exist but require teams to specify complex policies defining the relative importance of different objectives. This added complexity is more disruptive than you may think. If most teams can’t easily use a tool, its business value remains limited regardless of theoretical advantages. At Spotify, we’ve found that reliable, straightforward A/B testing across 300+ teams running thousands of experiments delivers more value than having theoretically superior but complex tools.

Beyond the multi-objective limitations, there’s a common misunderstanding about bandit speed. People often imagine bandits optimizing immediate outcomes like ad clicks, where variants can be reweighted quickly based on instant feedback. But most meaningful business metrics require patience. At Spotify, we care about retention after several weeks or listening behavior that develops over time. This means we can’t update bandit weights until we’ve observed outcomes for each user cohort, potentially weeks later. Even for immediate outcomes, timing patterns matter: User behavior differs between Monday mornings and Friday evenings, or weekdays versus weekends, affecting which variants appear successful depending on when you run the experiment.

## How we run personalization experiments efficiently

At Spotify, we run thousands of experiments evaluating our recommendation systems and AI. Here’s what we’ve learned.

### Start with separate stacks from day one

When companies start using personalization, it’s tempting to buy tools that promise to handle everything. A simple contextual bandit might look like a great starting point. But given how different the infrastructure needs are between personalization and experimentation, we’ve found it’s worth investing in a proper personalization stack right from the start.

You’ll need data architecture for collecting and using features at scale, where near-real-time features feed into reinforcement learning loops. You’ll also need compute infrastructure that can handle fast inference for your products, even as models get more computationally demanding. This is becoming especially important as AI systems get more adoption.

When you keep ML concerns separate from experimentation, you avoid trade-offs that end up hurting both stacks.

### Build tools that actually scale

Experimentation has been crucial for developing personalization systems that users love. At Spotify, our biggest challenge isn’t making individual experiments more sophisticated, but rather organizing and streamlining tons of simple experiments. We built our platform, Confidence, specifically to solve this problem.

We deliberately kept the experimentation methodology simple and battle tested. This makes it easier for teams to get started and become good at experimentation quickly, so more teams can benefit sooner.

Confidence makes sure that adding more experimenting teams doesn’t make things harder for existing teams. All our personalization and recommendation teams can innovate, iterate, and evaluate at the same time. Last year alone, 58 teams ran 520 experiments just on the mobile app’s home page.

### Make ML and experimentation platform integrations smooth

At Spotify, we keep tight integration between our ML platform and experimentation platform. Because of the way we built Confidence, it’s straightforward to create custom integrations with any system. We have similar integrations with other systems like ads and in-app messages.

When something has a natural home (like personalization living in the ML platform), you want to minimize the extra steps needed to run an experiment.

Sometimes integrations handle all the experiment steps through UIs outside Confidence using API integrations. Other times, the external platform sets up everything beforehand so that when teams open Confidence, all the necessary flags and resources like ML models are already created and ready to go.

## Wrapping up

Both personalization and experimentation are critical for modern digital products, but we’ve found they work better with distinct technological approaches. At Spotify, keeping our personalization and experimentation stacks separate helps us optimize both. This way, we can build personalization systems that users love, using rich feature sets and advanced machine learning, and we can evaluate those systems efficiently through experimentation, maintain infrastructure that handles low-latency features and fast recommendation computation, and let multiple teams experiment at scale without getting in each other’s way.

Our approach comes down to purposeful infrastructure design: Each stack does what it’s best at. The ML stack serves recommendations; the experimentation stack evaluates recommendation systems. This lets us keep improving user experience while staying flexible enough to innovate and adapt.

🧪 Want to experiment like Spotify? [Learn more about Confidence](https://confidence.spotify.com/).