---
title: "AI for American-Produced Cement and Concrete"
source: "https://engineering.fb.com/2026/03/30/data-center-engineering/ai-for-american-produced-cement-and-concrete/"
publishedDate: "2026-03-30"
category: "engineering"
feedName: "Meta Engineering"
---

-   Meta is continuing its long-term roadmap to help the construction industry leverage AI to produce high-quality and more sustainable concrete mixes, as well as those exclusively produced in the United States. 
-   Concurrent with the 2026 American Concrete Institute (ACI) Spring Convention, Meta is releasing a new AI model for designing concrete mixes – [Bayesian Optimization for Concrete (BOxCrete)](https://github.com/facebookresearch/SustainableConcrete?ref=engineeringatmeta), as well as the foundational data used to develop award-winning concrete mixes.
-   Meta’s [open source model for sustainable concrete](https://github.com/facebookresearch/SustainableConcrete?ref=engineeringatmeta) is available today on GitHub.

Every year, the United States pours roughly 400 million cubic yards of concrete, enough concrete to pave a two-lane highway that circles the Earth multiple times. It’s the backbone of our bridges, data centers, highways, and homes. However, while we produce most of our ready-mix concrete domestically, we [import nearly a quarter of the cement that makes it](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-cement.pdf?ref=engineeringatmeta). Meta’s AI is helping change that. 

Concrete consists of a mix of cement and cementitious materials, aggregates, water, and chemical admixtures. Concrete suppliers have to design concrete mixes to meet competing requirements: strength, speed, ease of handling, cost, and sustainability. Traditional concrete mix design relies heavily on trial-and-error in the lab, engineer intuition, and decades of accumulated knowledge—a workflow that is slow and expensive to adapt.  

Cement is a key element of concrete, thus imported cement can have a significant impact on U.S. suppliers, stifling U.S. manufacturing, jobs and investments. While ready-mix concrete is typically produced domestically, the cement required for it is heavily imported, with [roughly 20-25% of U.S. cement consumption met by imports](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-cement.pdf?ref=engineeringatmeta). Additionally, cement made in the U.S. complies with U.S. performance and environmental standards that are [not consistent internationally](https://www.cement.org/cement-concrete/cement-concrete-faq/?ref=engineeringatmeta). 

At the same time, ensuring products are produced domestically—a process often called [reshoring](https://www.americancentury.com/insights/reborn-in-the-usa/) — generally increases manufacturing jobs in the United States. Reshoring and related foreign direct investment (FDI) have brought over 1.1 million jobs back to the U.S. since 2020, and manufacturing has one of the highest economic multipliers; with every $1.00 spent in manufacturing adding $2.69 to the U.S. economy. The cement and concrete sector alone contributes more than [$130 billion annually and supports roughly 600,000 jobs — yet imports still supply about 23% of total domestic demand](https://www.enr.com/articles/61955-amrize-bets-on-made-in-america-label-touting-domestic-material-procurement?ref=engineeringatmeta). To capture more of that value at home, U.S.-based concrete producers want to incorporate more U.S.-made materials in their mixes.

Different cements have different chemistries, and a mix that works perfectly with one cement might fail entirely with another. As a result, producers need a way to rapidly explore and validate new formulations without spending months in the lab.

## Real-World Impact Across the U.S.

Meta and its partners have already received a number of awards for these innovations in concrete design, including a [2025 Building Innovation Award for Best Partnership](https://buildinginnovationawards.co.uk/2025-winners/?ref=engineeringatmeta) (shared with [Amrize](https://www.amrize.com/us/en/amrize-homepage.html?ref=engineeringatmeta)) and a [Slag Cement Award in 2025 for Sustainable Concrete Project of the Year](https://www.slagcement.org/awards?ref=engineeringatmeta) (shared with Amrize and the University of Illinois at Urbana-Champaign). But the impact of this model is also being felt through on-the-ground collaborations in several states through partnerships with large-scale concrete manufacturers and software companies.

### Illinois

Meta has been partnering closely with the University of Illinois at Urbana-Champaign and Amrize, the largest cement and concrete manufacturer in North America, headquartered in Chicago, IL., on [the implementation of AI for sustainable and domestically-produced concrete](https://engineering.fb.com/2025/07/16/data-center-engineering/ai-make-lower-carbon-faster-curing-concrete/?ref=engineeringatmeta). Amrize operates 18 cement plants, 141 cement terminals and 269 ready-mix concrete sites  across North America. Their scale makes them an ideal partner for demonstrating how AI can transform mix design at industrial volumes. Amrize recently [launched a Made in America cement label](https://www.amrize.com/us/en/our-company/we-build-america/american-made-cement.html?ref=engineeringatmeta), which guarantees the cement meets rigorous U.S. standards and was manufactured in the U.S. by a domestic workforce with American materials. The company also recently announced close to $1 billion of capital investments in 2026 in part to increase domestic cement production.  

Meta and Amrize will be presenting at the American Concrete Institute (ACI) Spring Convention, along with researchers from the University of Illinois Urbana-Champaign to further showcase our partnership [leveraging AI for lower-emission, domestically-produced concrete](https://engineering.fb.com/2025/07/16/data-center-engineering/ai-make-lower-carbon-faster-curing-concrete/?ref=engineeringatmeta).

Alongside the event, Meta is releasing a new AI model for designing concrete mixes, Bayesian Optimization for Concrete (BOxCrete). BOxCrete improves over Meta’s previous models with more robustness to noisy data as well as new features including the ability to predict concrete slump (an important indicator of concrete workability).

Coupled with BOxCrete, Meta is releasing the foundational data used to develop [the novel concrete mix](https://www.facebook.com/sustainability/posts/meta-is-honored-to-receive-a-2023-slag-cement-in-sustainable-concrete-project-of/6753760594639139/?ref=engineeringatmeta) used in our [Rosemount, MN data center](https://www.facebook.com/RosemountDataCenter/?ref=engineeringatmeta). This foundational data is the [best systematic foundational data](https://arxiv.org/abs/2603.21525) for concrete mix performance compared to other open-sourced, published datasets. 

Meta’s researchers have submitted [a paper on BOxCrete for publication](https://arxiv.org/abs/2603.21525?ref=engineeringatmeta) that outlines the new model, data, and the associated methodology.

### Minnesota

In partnership with [Amrize](https://www.amrize.com/us/en/newsroom/concrete--now-with-ai--see-how-at-the-new-meta-data-center.html?ref=engineeringatmeta), Mortenson and the University of Illinois at Urbana-Champaign, BOxCrete was used to generate a stronger, faster-curing concrete mix that was used [at scale in a site support section in one of our data center building slabs in Rosemount, MN](https://engineering.fb.com/2025/07/16/data-center-engineering/ai-make-lower-carbon-faster-curing-concrete/?ref=engineeringatmeta). 

The AI-optimized mix was designed for one of the most demanding parts of the build: the massive concrete foundation that supports the weight of thousands of servers and cooling systems. Using domestically sourced materials, the mix reached full structural strength 43% faster than the original formula, while also reducing cracking risk by nearly 10% — proving that AI can help American producers rapidly reformulate around U.S.-made materials without sacrificing quality. With the data confirming it meets all structural requirements, the mix is now qualified for use in additional areas of the data center.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Meta-Rosemount-Data-Center.png)

Meta’s data center in Rosemount, MN.

### Pennsylvania

In 2023, Meta released its [concrete optimization AI framework as open-source software](https://github.com/facebookresearch/SustainableConcrete/?ref=engineeringatmeta) under the MIT license, enabling broad adoption from academia to commercial software providers.

In an effort that reflects how AI-driven mix design is becoming part of the standard infrastructure of concrete production, Pennsylvania-based [Quadrel](https://www.iquadrel.com/?ref=engineeringatmeta), a leading enterprise SaaS platform serving the ready-mix industry, has adapted Meta’s AI framework in its software. Quadrel has applied it to real-world use cases including data preprocessing, batch and test normalization, feature engineering, and customer-specific model training. The models, which continuously improve over time as field test results are incorporated, have been embedded into daily mix design and quality control workflows, informing day-to-day decisions in quality control and operations.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Meta-AI-for-American-Concrete-2.png)

Meta’s [open-source AI model for sustainable concrete](https://github.com/facebookresearch/SustainableConcrete/?ref=engineeringatmeta) is provided under MIT license, allowing for commercial use with minimum restrictions while benefiting from open-source AI advances and investments.

## How Meta Leverages AI for Concrete Mixtures

[Meta’s AI for concrete model](https://engineering.fb.com/2025/07/16/data-center-engineering/ai-make-lower-carbon-faster-curing-concrete/https://www.iquadrel.com/?ref=engineeringatmeta) can help suppliers more quickly incorporate U.S. materials into their mixes through an approach called adaptive experimentation. 

Here’s how it works: 

Meta’s [**Adaptive Experimentation (Ax) platform**](https://engineering.fb.com/2025/11/18/open-source/efficient-optimization-ax-open-platform-adaptive-experimentation/https://www.iquadrel.com/?ref=engineeringatmeta) uses Bayesian optimization to intelligently navigate the vast space of possible concrete formulations. Instead of testing mixes randomly or relying solely on human intuition, the AI: 

1.  **Learns from existing data**: Historical mix designs, lab results, and performance metrics train the model on what works
2.  **Proposes high-potential candidates**: The AI suggests new mixes most likely to meet target specifications and can compare performance between U.S.-made and foreign materials
3.  **Incorporates constraints upfront**: Users specify technical requirements and the ingredients to be used.
4.  **Refines with each test**: Every lab result improves the model’s predictions, giving rise to an automatic improvement loop. 

While the inclusion of AI and adaptive experimentation does not change the process of lab validation, field trials, engineering sign-off, and code compliance, it greatly improves the speed of discovery, helping engineers find better starting points with fewer tests.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Meta-AI-for-American-Concrete-1.png)

## Building an AI-Assisted Future for Concrete 

Meta’s AI for concrete is part of a broader commitment to applying machine learning where it can drive measurable, real-world impact. While the work with Amrize, the University of Illinois, and industry software providers like Quadrel represents the first wave of adoption, the goal is an industry-wide shift in how American producers approach mix design.

Over the next few years, Meta is planning to further collaborate with the construction industry to develop new AI tools. As more platforms like Quadrel build on BOxCrete, AI-optimized mix design becomes accessible to producers without requiring them to change their existing workflows. The team is also planning on continued academic collaboration with the University of Illinois Urbana-Champaign to explore how AI can address not just domestic material substitution, but broader challenges in concrete sustainability and performance.

By reducing the barriers to domestic material adoption, Meta is helping American producers compete on cost, reduce emissions, and build supply chain resilience, one mix at a time.

## Get Involved

Explore Meta’s open-source [BOxCrete for Sustainable Concrete on GitHub](https://github.com/facebookresearch/SustainableConcrete?ref=engineeringatmeta).

Read our pre-print: “[BOxCrete: A Bayesian Optimization Open-Source AI Model for Concrete Strength Forecasting and Mix Optimization](https://arxiv.org/abs/2603.21525?ref=engineeringatmeta).”