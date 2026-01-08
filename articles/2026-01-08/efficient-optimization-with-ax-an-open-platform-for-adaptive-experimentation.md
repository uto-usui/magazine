---
title: "Efficient Optimization With Ax, an Open Platform for Adaptive Experimentation"
source: "https://engineering.fb.com/2025/11/18/open-source/efficient-optimization-ax-open-platform-adaptive-experimentation/"
publishedDate: "2025-11-19"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’ve released **Ax 1.0**, an open-source platform that uses machine learning to automatically guide complex, resource-intensive experimentation.
-   Ax is used at scale across Meta to improve AI models, tune production infrastructure, and accelerate advances in ML and even hardware design.
-   Our accompanying paper, “[Ax: A Platform for Adaptive Experimentation](https://openreview.net/forum?id=U1f6wHtG1g&ref=engineeringatmeta)” explains Ax’s architecture, methodology, and how it compares to other state-of-the-art black-box optimization libraries.

How can researchers effectively understand and optimize AI models or systems that have a vast number of possible configurations? This is a challenge that is particularly prevalent in domains characterized by complex, interacting systems, such as modern AI development and deployment. Optimizing under these settings demands experimentation, and efficiency is of the utmost importance when evaluating a single configuration is extremely resource- and/or time-intensive.

Adaptive experimentation offers a solution to this problem by actively proposing new configurations for sequential evaluation, leveraging insights gained from previous evaluations

This year, we released version 1.0 of Ax, an open source adaptive experimentation platform that leverages machine learning to guide and automate the experimentation process. Ax employs Bayesian optimization to enable researchers and developers to conduct efficient experiments, identifying optimal configurations to optimize their systems and processes.

In conjunction with this major release, we published a paper titled, “[Ax: A Platform for Adaptive Experimentation](https://openreview.net/forum?id=U1f6wHtG1g&ref=engineeringatmeta)” that explores Ax’s core architecture, provides a deeper explanation of the methodology powering the optimization, and compares Ax’s performance against other black-box optimization libraries.

Ax has been successfully applied across various disciplines at Meta, including:

-   Traditional machine learning tasks, such as hyperparameter optimization and architecture search.
-   Addressing key challenges in GenAI, including discovering optimal data mixtures for training AI models.
-   Tuning infrastructure or compiler flags in production settings.
-   Optimizing design parameters in physical engineering tasks, such as designing AR/VR devices.

By utilizing Ax, developers can employ state-of-the-art methodology to conduct complex experiments, ultimately gaining a deeper understanding and optimizing their underlying systems.

## How to Get Started With Ax

To start using Ax to efficiently tune parameters in complex systems install the latest version of the library via \`pip install ax-platform\` and visit [the Ax website](https://ax.dev/) for a quickstart guide, tutorials, and deep dives on the methods that Ax uses under the hood.

## Ax Is for Real World Experimentation

Adaptive experiments are incredibly useful, but can be challenging to run. Not only do these experiments require the use of sophisticated machine learning methods to drive the optimization, they also demand specialized infrastructure for managing experiment state, automating orchestration, providing useful analysis and diagnostics, and more. Additionally, the goals of any given experiment are often more complex than simply improving a single metric. In practice experimentation is usually a careful balance between multiple objective metrics subject to multiple constraints and guardrails.

We built Ax to empower users to easily configure and run these dynamic experiments using state-of-the-art techniques, and to provide a robust and mature platform for researchers to integrate cutting-edge methods directly into production systems.

## Ax for Understanding

In addition to finding optimal configurations efficiently, Ax is a powerful tool for understanding the underlying system being optimized. Ax provides a suite of analyses (plots, tables, etc) which helps its users understand how the optimization is progressing over time, tradeoffs between different metrics via a [Pareto frontier](https://en.wikipedia.org/wiki/Pareto_front), visualize the effect of one or two parameters across the input space, and explain how much each input parameter contributes to the results (via sensitivity analysis). 

These tools allow experimenters to walk away with both an optimal configuration to deploy to production and a deeper understanding of their system, which can inform decisions moving forward.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image1.png) ![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image-2.png) ![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image-3.png) ![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image-4.png)

## How Ax Works

By default Ax uses Bayesian optimization, an effective adaptive experimentation method that excels at balancing **exploration** – learning how new configurations  perform, and **exploitation** – refining configurations previously observed to be good. Ax relies on [BoTorch](https://botorch.org/) for its implementation of Bayesian optimization components.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image-5.png)

Bayesian optimization is an iterative approach to solving the global optimization problem ![argmax_{x \in X} f(x)](https://s0.wp.com/latex.php?latex=argmax_%7Bx+%5Cin+X%7D+f%28x%29&bg=ffffff&fg=000&s=0&c=20201002) which does not assume any information about the form of the function f. In practice, this means optimizing systems by evaluating some candidate configurations ![x \ in X](https://s0.wp.com/latex.php?latex=x+%5C+in+X&bg=ffffff&fg=000&s=0&c=20201002) (i.e., trying some configurations out and measuring their effect), building a surrogate model using this data, using that surrogate to identify the most promising configuration to evaluate next, and repeating until an optimal solution has been found or the experimental budget is exhausted.

Under typical settings Ax uses a Gaussian process (GP) as the  surrogate model during the Bayesian optimization loop, a flexible model which can make predictions while quantifying uncertainty and is especially effective with very few data points. Ax then uses an acquisition function from a family called expected improvement (EI) to suggest the next candidate configurations to evaluate by capturing the expected value of any new configuration compared to the best previously evaluated configuration.

The following animation shows this loop with a GP modeling the goal metric plotted above in blue and EI plotted below in black; the highest value of EI informs the next value of x to evaluate. Once the new value of x has been evaluated, the GP is re-fit with the new data point and we calculate the next EI value.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Adaptive-Experimentation-Ax-image-6.gif?w=916)

This 1-dimensional example can be expanded for many input and output dimensions, allowing Ax to optimize problems with many (potentially hundreds) of tunable parameters and outcomes. In fact, higher-dimensional settings, in which covering the search space becomes exponentially more costly, is where the surrogate-based approach really shines compared to other approaches.

You can read more about Bayesian optimization on Ax website’s [Introduction to Bayesian Optimization page](https://ax.dev/docs/next/intro-to-bo).

## How We Use Ax at Meta

Ax has been deployed at scale at Meta to solve some of the company’s most challenging optimization problems. Thousands of developers at Meta use Ax for tasks like hyperparameter optimization and architecture search for AI models, tuning parameters for online recommender and ranking models, infrastructure optimizations, and simulation optimization for AR and VR hardware design.

These experiments optimize nuanced goals and leverage sophisticated algorithms. For instance, we’ve used multi-objective optimization to simultaneously improve a machine learning model’s accuracy while minimizing its resource usage. When researchers were tasked with shrinking natural language models to fit on the first generation of  Ray-Ban Stories [they used Ax](https://research.facebook.com/blog/2021/7/optimizing-model-accuracy-and-latency-using-bayesian-multi-objective-neural-architecture-search/) to search for models that optimally traded off size and performance. Additionally, Meta engineers use constrained optimization techniques for [tuning recommender systems](https://engineering.fb.com/2023/08/09/ml-applications/scaling-instagram-explore-recommendations-system/) to optimize key metrics while avoiding regressions in others.

Recently, Ax was used to design [new faster curing, low carbon concrete mixes](https://engineering.fb.com/2025/07/16/data-center-engineering/ai-make-lower-carbon-faster-curing-concrete/) that were deployed at one of our data center construction sites. These new mixes are playing an important role in advancing our [goal of net zero emissions in 2030](https://sustainability.fb.com/wp-content/uploads/2023/07/Meta-2023-Path-to-Net-Zero.pdf).

We see problems across every domain where the ultimate quality of a system is affected by parameters whose interactions are complex to reason about without experimentation and where experimentation has a meaningful cost: Ax addresses these challenges by employing a data-driven approach to adapt experiments as they unfold, enabling us to solve these problems efficiently and effectively.

## The Future of Ax

We are always working to improve Ax by building new features for representing innovative experiment designs, exciting new optimization methods, or integrations for using Ax with external platforms. [Ax is proud to be open source](https://github.com/facebook/Ax/) (MIT license), and we invite both the practitioner and research communities to contribute to the project whether that be through improved surrogate models or acquisition  functions,  extensions used for individual research applications that may benefit the larger community, or simply bug fixes or improvements to the core capabilities. Please reach out to the team via [Github Issues](https://github.com/facebook/Ax/issues).

## Read the Paper

[Ax: A Platform for Adaptive Experimentation](https://openreview.net/forum?id=U1f6wHtG1g&ref=engineeringatmeta)

To learn more about Meta Open Source, visit our [website](https://opensource.fb.com/), subscribe to our [YouTube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ), or follow us on [Facebook](https://www.facebook.com/MetaOpenSource), [Threads](https://www.threads.net/@metaopensource), [X](https://x.com/MetaOpenSource), [Bluesky](https://bsky.app/profile/metaopensource.bsky.social) and [LinkedIn](https://www.linkedin.com/showcase/meta-open-source?fbclid=IwZXh0bgNhZW0CMTEAAR2fEOJNb7zOi8rJeRvQry5sRxARpdL3OpS4sYLdC1_npkEy60gBS1ynXwQ_aem_mJUK6jEUApFTW75Emhtpqw).

## Acknowledgements

_Ax was created by Meta’s Adaptive Experimentation team: Sebastian Ament, Eytan Bakshy, Max Balandat, Bernie Beckerman, Sait Cakmak, Cesar Cardoso, Ethan Che, Sam Daulton, David Eriksson, Mia Garrard, Matthew Grange, Carl Hvarfner, Paschal Igusti, Lena Kashtelyan, Cristian Lara, Ben Letham, Andy Lin, Jerry Lin, Jihao Andreas Lin, Samuel Müller, Miles Olson, Eric Onofrey, Shruti Patel, Elizabeth Santorella, Sunny Shen, Louis Tiao, and Kaiwen Wu._