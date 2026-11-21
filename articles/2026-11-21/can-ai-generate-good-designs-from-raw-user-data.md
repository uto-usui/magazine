---
title: "Can AI Generate Good Designs from Raw User Data?"
source: "https://www.nngroup.com/articles/raw-data-vs-synthesized-data/"
publishedDate: "2026-11-20"
category: "design"
feedName: "Nielsen Norman Group"
author: "Megan Chan, Rachel Banawa"
---

Summary:  In our study, AI-generated designs were better when the AI received synthesized findings and recommendations instead of raw user comments alone.

AI can now analyze user data, provide design recommendations, and generate interfaces all in one go. So, is it still worth synthesizing research and developing recommendations first, or can teams hand AI the raw data and let it decide which user problems matter and how to solve them? The answer matters more and more as AI-generated prototypes become part of everyday design work.

To find out, we asked an AI model to generate interfaces from different types of research context. Across two design tasks, **it produced better designs from synthesized findings and recommendations** than from raw user comments.

-   [About the Study](#toc-about-the-study-1)
-   [Synthesized Findings and Recommendations Led to Better Designs](#toc-synthesized-findings-and-recommendations-led-to-better-designs-2)
-   [Why Might Synthesized Research Improve AI-Generated Designs?](#toc-why-might-synthesized-research-improve-ai-generated-designs-3)
-   [Implications for Product Teams](#toc-implications-for-product-teams-4)
-   [Ongoing Research](#toc-ongoing-research-5)

## About the Study

We gave an AI model two design tasks: designing a one-page form for rebooking a canceled flight and designing a multistep checkout flow for an online store. In each task, the prompt and the design-system information remained the same, while the type of research context we provided to the model changed.

While the actual study design was more complicated, in this article we will focus on two types of context that the AI model received:

1.  **Raw user comments**, which included approximately 100 comments for each design task
2.  **Synthesized findings and recommendations** based on the same raw user comments (A researcher analyzed the comments with an AI tool and made the final decisions on which findings to include and what to recommend). 

Since [AI tools are nondeterministic](https://www.nngroup.com/articles/eval-ai-output/), we generated 8 designs per task and context condition. Then, a human grader and an LLM judge blindly scored each design against a predefined scorecard. The score of the design was the percentage of scorecard criteria it met (e.g., “every checkout step shows the items being bought”).

We used the human grader's scores in the results. The LLM judge scored every design independently as a check, and after calibration, the 2 graders agreed on about 96% of scoring decisions in both tasks.

Details on the study methodology are available in the [accompanying sidebar](https://www.nngroup.com/articles/context-study-methodology/). 

## Synthesized Findings and Recommendations Led to Better Designs

Across both design tasks, **the AI-generated designs based on synthesized findings and recommendations met more scorecard criteria than designs based on raw user comments**. The average difference was 8.4 percentage points and was statistically significant (p < 0.001).

![](https://media.nngroup.com/media/editor/2026/11/20/bar-chart.png)

_Across both design tasks, designs generated from synthesized findings and recommendations met 77.9% of scorecard criteria on average, compared with 69.5% for designs generated from raw user comments: a difference of 8.4 percentage points (p < 0.001). Error bars reflect 95% confidence intervals._​​

The improvement was larger for the flight-rebooking task (11.4 percentage points compared to 5.5 percentage points for the checkout flow), but both tasks benefited. The finding suggests that **design generation with AI can benefit from the work of synthesizing research data into findings and recommendations**.

The flight-rebooking task shows what this difference looked like in practice. A few raw comments complained about loyalty miles, yet none of the designs generated from raw comments included information on whether the cancellation would affect passengers’ miles. In contrast, every design generated from synthesized research included that information.

The online-checkout task showed a smaller gain for the synthesized research but the same pattern. Several user comments complained that items disappeared from the cart during checkout, yet fewer than half of the designs based on raw data kept the items and total visible on every checkout step. Nearly all the designs made from synthesized research did. The smaller gain may be due to the task prompt, which was the same in both conditions and already pointed to some of the issues raised in the comments: It described a first-time shopper with a discount code who needed a gift within 2 days. Because the prompt itself flagged concerns such as applying a discount and receiving the order on time, even the designs made from raw comments tended to address them, leaving less room for synthesized research to make a difference.

The 8.4-percentage-point advantage of synthesized findings and recommendations may underestimate their benefit in more complex situations. First, our data was likely cleaner than typical user feedback. Although cleanliness is hard to measure, more than half of the comments in each task supported a finding, whereas [research on app-store reviews](https://dl.acm.org/doi/10.1145/2568225.2568263) found that only about a third of reviews contained information useful to product teams. Second, the dataset was small, about 100 short comments per task. Third, both tasks (designing a form and a checkout flow) are common patterns that AI models have likely seen many times. **We expect the advantage of synthesized research to grow with larger, messier datasets and less familiar design problems**, and we plan to study this hypothesis in the future.

## Why Might Synthesized Research Improve AI-Generated Designs?

### Raw Data Contains Observations Only

Raw user data describes problems, such as what frustrated users and what they wished worked differently, but it rarely says what to build in response. For example, a comment such as "Items disappeared from my cart" names a problem but does not mention a solution. Even when users suggest a fix, the suggestion isn’t a reliable guide. Users are good at describing their problems, but they’re [](https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/)[poor at predicting what they would actually use](https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/), and [](https://www.nngroup.com/articles/attitudinal-behavioral/)[what they say doesn’t always match what they do](https://www.nngroup.com/articles/attitudinal-behavioral/). Raw data also tends to be messy. It can include comments unrelated to the design, and different user comments may contradict each other.

### Synthesized Findings and Recommendations Add a Layer of Interpretation

When working only with raw data, the AI needs to decide which data points matter and what changes to make. Those decisions are difficult because user feedback is only one input. In real life, designers weigh user feedback against business needs, technical constraints, product goals, and what the team has already tried. [](https://www.nngroup.com/articles/ai-prototyping/)[AI tools struggle with those tradeoffs](https://www.nngroup.com/articles/ai-prototyping/) without human guidance.

Through findings and recommendations, researchers apply their judgment to turn raw data into design decisions. They add a layer of interpretation that can help the AI generate the right design. Without them, you leave those decisions to the AI.

![](https://media.nngroup.com/media/editor/2026/11/20/synthesized-findings-and-recommendations-add-a-layer-of-interpretation.png)

_With raw data alone, the AI tool has to guess what to build. With synthesized findings and recommendations, it builds on decisions your team has already made._​​​​

Findings and recommendations play different roles, though. Findings interpret the data, while recommendations turn that interpretation into design decisions. Because our analysis compared raw user comments with synthesized findings and recommendations, we don’t know at this point whether the improvements were caused by the findings or by the recommendations. We are working on determining the effect of each in a separate study.

## Implications for Product Teams

Research artifacts now have two audiences: your teammates and the AI tools used in the design process. Along with artifacts created for people, [we also must create artifacts that guide AI tools](https://www.nngroup.com/articles/ux-context-design/).

### Don’t Assume Raw Research Data Is Sufficient Context

AI tools can process substantial amounts of user-research data, but that doesn't mean they will automatically identify the most important information and use it appropriately in a design. Consider what interpretation and guidance the AI tool needs rather than assuming access to the underlying data will be sufficient.

### UX-Context Design: Think About What UX Knowledge AI Needs

As AI becomes more involved in generating interfaces, we will increasingly need to figure out what guidance and knowledge to provide to these tools. The context that you give an AI tool shapes what it creates. [](https://www.nngroup.com/articles/ux-context-design/)[UX-context design](https://www.nngroup.com/articles/ux-context-design/) is the practice of selecting, organizing, and maintaining the UX knowledge that guides AI-generated design. This study offers evidence that the content of this context can affect design quality.

## Ongoing Research

This study raised several questions that we’re still exploring.

-   Do synthesized research and recommendations improve design quality only on the specific issues addressed by the findings and recommendations, or in other respects too?
-   Do the results hold for other types and larger volumes of raw data than short customer comments, such as interview transcripts, [usability-test](https://www.nngroup.com/articles/usability-testing-101/) notes, or survey responses?
-   Would other AI models produce the same results?
-   How much of the benefit comes from the synthesis of the findings versus from including explicit design recommendations?
-   Does the format of the file (e.g., Markdown, PNG, PDF) in which the context is provided make a difference?

We’ll keep studying how teams can give AI better UX context, so look out for future articles on these topics. To start applying these ideas now, see our [Context Engineering: Shaping AI-Generated Designs course.](https://www.nngroup.com/courses/context-engineering-ai/)

### Conclusion

As AI takes on more of the design work, steering what it produces matters more. Our findings suggest that not all context is equally useful. Providing AI with synthesized research findings and recommendations leads to better designs than providing it with raw user comments alone. At a time when AI is raising questions about the future of UX, this finding is important. Generating an interface is just one part of design. Understanding which user problems matter for your product and translating that understanding into design recommendations remain an essential contribution of UX professionals, whether the designs are created by humans or AI.

### References

Ning Chen, Jialiu Lin, Steven C. H. Hoi, Xiaokui Xiao, and Boshen Zhang. 2014. AR-miner: Mining informative reviews for developers from mobile app marketplace. In _Proceedings of the 36th International Conference on Software Engineering (ICSE 2014)_, 767–778. [https://doi.org/10.1145/2568225.2568263](https://doi.org/10.1145/2568225.2568263)