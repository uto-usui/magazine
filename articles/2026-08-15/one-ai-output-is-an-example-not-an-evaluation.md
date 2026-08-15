---
title: "One AI Output Is an Example, Not an Evaluation"
source: "https://www.nngroup.com/articles/eval-ai-output/"
publishedDate: "2026-08-14"
category: "design"
feedName: "Nielsen Norman Group"
author: "Raluca Budiu"
---

Summary:  One output cannot establish how well an AI system performs. Evaluate with multiple representative inputs, repeated runs, and confidence intervals.

Suppose you ask an [AI customer-service](https://www.nngroup.com/articles/dimensions-of-ai-chatbots/) system the same question several times: “Can I return an opened product after 30 days?” One answer may explain the policy accurately. Another may omit an important exception. A third may confidently promise a refund that the customer is not entitled to receive. Which of these answers represents the system? The answer is: all of them, taken together — and none of them, taken in isolation.

Yet teams often evaluate AI systems by running them once, inspecting the result, and drawing conclusions about what AI can do or how it should be used. This is not because they are lazy or careless. It is because decades of deterministic software have taught us that a feature that works once will work the same every time. AI systems offer no such guarantee. **One good output demonstrates that a system can perform a task. It does not show how often or how reliably the system will do so.**

-   [AI Outputs Are Nondeterministic](#toc-ai-outputs-are-nondeterministic-1)
-   [AI Evaluation Should Resemble a Quantitative UX Study](#toc-ai-evaluation-should-resemble-a-quantitative-ux-study-2)
-   [What Would an AI Evaluation Look Like?](#toc-what-would-an-ai-evaluation-look-like-3)
-   [Two Questions an Evaluation Must Answer](#toc-two-questions-an-evaluation-must-answer-4)
-   [The Same Overall Score Can Conceal Different Problems](#toc-the-same-overall-score-can-conceal-different-problems-5)
-   [Rigorous AI Evaluation Is Not New](#toc-rigorous-ai-evaluation-is-not-new-6)
-   [The Purpose of the Evaluation Does Not Change the Method](#toc-the-purpose-of-the-evaluation-does-not-change-the-method-7)

## AI Outputs Are Nondeterministic

> A **nondeterministic system** can produce different outputs when given the same input.

[Language models assign probabilities](https://www.nngroup.com/articles/how-ai-works/) to possible next tokens and select among them as they generate a response. As a result, submitting the same input repeatedly may produce answers that differ in wording and quality.

This variation can be substantial. Research comparing repeated generations from the same language models has found meaningful differences in performance across runs and has shown that evaluation results can depend on how outputs are generated.

**A single output is an example, not an evaluation.**

## AI Evaluation Should Resemble a Quantitative UX Study

Imagine that we want to evaluate the usability of an [ecommerce checkout](https://www.nngroup.com/articles/mobile-checkout-ux/) flow quantitatively, perhaps for a [UX-benchmarking](https://www.nngroup.com/articles/benchmarking-ux/) study. We would not ask one participant to complete one checkout task and conclude that the site has perfect usability simply because that participant succeeded.

Instead, we would define a set of representative checkout tasks that involve different types of items to be purchased. We would then observe many participants as they attempted them and would report averages for metrics such as [task success](https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/) and time on task. We would also report [confidence intervals](https://www.nngroup.com/articles/confidence-interval/) to indicate the uncertainty around those estimates ––– how much those estimates are likely to vary across the broader population of users.

An AI evaluation follows similar logic. Instead of asking people to complete tasks with an interface, we ask an AI system to produce outputs for a set of test inputs.

**What Is Compared?**

**Quantitative UX Study**

**AI Evaluation**

The system being evaluated

The interface or product

The model, prompt, settings, tools, and supporting data

The range of situations tested

Representative user tasks

Representative test inputs

One data point (i.e., observation)

One participant attempting one task

One AI output corresponding to one test input

Measured metrics

Task success, time on task, or error rate

Accuracy, task success, or a quality score

Sources of data variability

Differences across tasks and participants

Differences across test inputs and repeated runs

The analogy is not exact. An AI run is not a human participant. However, both types of evaluation rely on multiple observations to estimate how the system performs.

[Quantitative-UX](https://www.nngroup.com/articles/quantitative-research-study-guide/) researchers summarize results across tasks and participants, rather than relying on one successful attempt.  AI evaluations should do the same: use representative inputs, collect enough observations, and report average performance, together with variability and uncertainty.

![On the left: One example or one input, one run, one output. On the right: An evaluation or, many inputs, many runs, many outputs.](https://media.nngroup.com/media/editor/2026/08/11/1.png)

_A single output shows only that the system can perform a task once. An evaluation submits many representative inputs, runs each of them repeatedly, and summarizes all the resulting outputs as an average with a confidence interval._

 We do not need to invent a new science of AI measurement; we need to remember familiar principles of experimental design and statistics.

## What Would an AI Evaluation Look Like?

Suppose that we want to evaluate an AI system that answers customer-service questions using a company’s policies.

For illustration, we could select 10 representative questions covering different topics, levels of complexity, and types of customer situations. For example, the questions might address returns, cancellations, damaged orders, subscriptions, and warranties. We could then submit each question to the system 5 times, producing 50 answers. (These numbers are not universal recommendations. A real evaluation may require more questions or more runs, depending on the variability of the system and the importance of the decision. [Choosing the number of questions and runs](https://www.nngroup.com/articles/summary-quant-sample-sizes) is a topic that we don’t cover in this article.)

Before conducting the evaluation, we would define what constitutes an acceptable answer. For example, an answer may count as acceptable only if it:

-   Answers the customer’s question correctly
-   Includes all important conditions and exceptions
-   Is consistent with the company’s policies
-   Tells the customer what to do next when appropriate

An answer that fails any of these would be considered unacceptable. (Note that this particular output-quality metric happens to be binary, but more complex metrics could be defined.)

![rid chart titled 'Repeated AI Runs Reveal Inconsistent Performance,' showing results of 5 repeated AI runs for each of 10 questions, marked as acceptable or unacceptable answers. Question 1: 5/5 acceptable. Question 2: 5/5 acceptable. Question 3: 5/5 acceptable. Question 4: 5/5 acceptable. Question 5: 5/5 acceptable. Question 6: 4/5 acceptable (run 4 unacceptable). Question 7: 4/5 acceptable (run 3 unacceptable). Question 8: 4/5 acceptable (run 2 unacceptable). Question 9: 2/5 acceptable (runs 2 and 4 acceptable; runs 1, 3, and 5 unacceptable). Question 10: 1/5 acceptable (only run 3 acceptable). Overall total: 40/50 acceptable answers across all runs.](https://media.nngroup.com/media/editor/2026/08/11/2.png)

_10 customer questions are submitted 5 times. Each square represents one AI output. Reading across the rows shows how consistently the system is answering the same question. Reading down the grid shows performance across different questions._

We could then calculate each question’s percentage of acceptable answers across its repeated runs and then summarize performance across all 10 questions.

At minimum, we would report:

-   The percentage of outputs that were acceptable
-   A confidence interval around that percentage
-   How much performance varies across different questions
-   How consistently the system answers the same question

A [**confidence interval**](https://www.nngroup.com/articles/confidence-interval/) represents a range of plausible values for the system’s average performance. It reminds us that the score obtained in one evaluation is an estimate, not an exact and permanent property of the system.

Again, the purpose of the example is not to prescribe 10 questions and 5 runs as universal numbers. It is to illustrate the basic design: **test multiple representative inputs, run each input repeatedly, and summarize the resulting distribution of scores.**

Note that any evaluation is a snapshot of a particular system at a particular time. Like with [UX-benchmarking studies](https://www.nngroup.com/articles/ux-benchmarking-repository/), you need to carefully document all the details: record the model and version, prompts or instructions, settings, tools, context, and evaluation date. If any of these components change, the evaluation may need to be repeated.

## Two Questions an Evaluation Must Answer

The example above helps us answer two separate questions:

1.  How well does the system perform across the range of questions that users may ask?
2.  How consistently does it answer the same question?

These questions capture two forms of data variability: **test-input variability** and **run-to-run variability**.

Consider the customer-service example. Differences in answer quality across the 10 questions represent **test-input variability**. Differences among the 5 answers generated for the same question represent **run-to-run variability**.

![Grid chart titled 'Same Success Rate, Different Problems,' comparing two AI systems with the same overall success rate but different failure patterns across 5 repeated runs per question.  System A, subtitled 'Always fails the same question': Questions 1 through 8 each score 5/5 acceptable answers across all runs. Questions 9 and 10 each score 0/5, with every run unacceptable. Overall total: 40/50.  System B, subtitled 'Fails unpredictably': Every question, 1 through 10, scores 4/5 acceptable answers, but the single unacceptable run falls in a different position for each question — for example, run 2 fails for Question 1, run 4 fails for Question 2, run 3 fails for Question 3, and so on, with the failing run varying unpredictably across all ten questions. Overall total: 40/50.](https://media.nngroup.com/media/editor/2026/08/11/3.png)

_Test-input variability tells us how well the system performs across the range of questions that users may ask. Run-to-run variability is about how consistently the AI system answers the same question. (This simplified example includes 10 questions and 5 runs per question; the numbers are illustrative, not recommended sample sizes.)_

### Test-Input Variability

A customer-service system may perform well on short, straightforward questions such as “Where is my order?” but poorly on questions involving ambiguous policies or multiple conditions. It may explain the standard return policy correctly but fail when a customer’s situation falls under an exception.

An evaluation containing mostly easy questions will therefore overestimate real-world performance.

> **Test-input variability** represents variation in the outputs that results from the particular inputs included in the evaluation.

Including more questions reduces our dependence on the particular examples selected. However, quantity alone is not enough. A large test set containing only simple questions will produce a precise answer to the wrong questions. The test inputs need to be representative for the inputs that will be used in real life, by actual users.

### Run-to-Run Variability

Because it’s nondeterministic, the system may also give different answers when the exact same question is submitted repeatedly. This is **run-to-run variability**.

> **Run-to-run variability** occurs when the system produces different-quality answers for the same test input.

Repeating an input allows us to determine whether the system handles it consistently. **Without repeated runs, we cannot distinguish a task that the system performs reliably from one that it completes successfully only occasionally**.

### Why You Need Both More Inputs and More Runs

More test inputs and more runs therefore address different questions:

-   More test inputs improve our estimate of performance across the intended range of inputs. For our customer-service example, they tell us how well the system is likely to handle the variety of questions that customers may ask.
-   More runs improve our estimate of consistency for the same input. In our example, they tell us how consistently the system will answer the same question when it is asked by different customers.

Neither substitutes for the other.

## The Same Overall Score Can Conceal Different Problems

Suppose that two customer-service systems are each tested on 10 questions, with 5 runs per question. They both produce acceptable answers on 80% of the 50 runs.

The first system answers 8 of 10 questions correctly on every run and consistently fails on the remaining 2. The second answers each question correctly in 4 out of 5 runs.

Their success rates are identical, but the systems have different problems.

![Grid chart titled 'Test-Input Variability vs. Run-to-Run Variability,' showing the same acceptable/unacceptable answer grid as before across 10 questions and 5 runs (same data as the first image, overall 40/50), with two highlighted regions illustrating two types of variability. A vertical outline around run 3's column, labeled 'Test-input variability,' illustrates variation across different questions for the same run. A horizontal outline around Question 6's row, labeled 'Run-to-run variability,' illustrates variation across repeated runs for the same question.](https://media.nngroup.com/media/editor/2026/08/11/4.png)

_Two systems have the same overall success rate. System A consistently fails on a small set of questions; System B fails occasionally across all questions._

The first system is predictable: it consistently handles some types of questions and consistently fails on others. The organization may be able to identify those unsupported questions and route them to a human agent.

The second system is unpredictable: any customer question may receive an incorrect answer. It may still be useful when its outputs are reviewed before they reach the customer — for example, when the system drafts a response that a human agent checks and corrects.

But the overall score alone does not reveal this distinction. To understand an AI system, we need to know both how well it performs and how its failures are distributed.

## Rigorous AI Evaluation Is Not New

Some established AI evaluations already include repeated attempts and account for variability and uncertainty.

Coding benchmarks, for example, use [**pass@k**](https://huggingface.co/spaces/codeparrot/code-generation-models/blob/main/evaluation/intro.md)  (pronounced “pass at k”) –– a metric that estimates the probability that at least one of _k_ generated attempts succeeds and requires repeated runs. [Chatbot Arena](https://huggingface.co/spaces/lmarena-ai/chatbot-arena) publishes confidence intervals around its model ratings. Anthropic's Evan Miller has also argued that AI evaluations should be analyzed like experiments, using standard errors, paired comparisons, and methods that account for related test questions.

Rigorous methods do exist. In practice, however, they are concentrated in academic-research papers.

Product teams do not necessarily need to adopt the exact metrics used by academic benchmarks. However, they should apply the same underlying principles: collect multiple observations, account for important sources of variation, and communicate the uncertainty around the results. In other words, **they should not treat one output as sufficient evidence.**

## The Purpose of the Evaluation Does Not Change the Method

Teams evaluate AI systems for different reasons: to decide whether an organization should adopt a new system, to assess the performance of a new AI feature, or to check — as part of quality assurance — that a new feature is good enough to release.

These purposes differ in what is evaluated and why. But the method is the same in all cases: representative inputs, repeated runs, and averages with confidence intervals.

Quality assurance deserves special mention because traditional software testing assumes determinism: a test that passes once is expected to pass every time. For a nondeterministic system, a single passing test is a sample, not a proof. A new feature that succeeds in a demo may still fail for 1 customer in 5.  QA for AI systems should therefore track pass rates across repeated runs, not the outcome of one test.

### Are Multiple Runs Worth the Cost?

Repeated runs cost time and money. Not every single interaction with an AI system requires a formal evaluation.

A single run is fine for early exploration or for a basic check that the system runs, but it should not be taken as evidence for a consequential decision.  

When an evaluation will drive a decision — launching a new product feature, choosing a vendor, recommending a new process, or claiming improvement — it should be based on repeated runs with multiple representative inputs. It should report average performance, a confidence interval, and information about the consistency of the results.  If the runs are too expensive to repeat, the honest conclusion is that the evidence is insufficient.

### Conclusion

When evaluating an AI system, do not ask only whether it produced a good output. Ask how often it produces good outputs across the range of inputs that users will submit and across repeated runs of the same input.

A sound AI evaluation should include: (1) multiple, representative inputs, because performance on easy inputs says little about performance on difficult ones; (2) repeated runs on each input, because only repetition can distinguish between a system that performs the task reliably from one that succeeds occasionally; and (3) averages and confidence intervals, to communicate performance and uncertainty.

We do not need new statistical methods for AI evaluations; we can use the same methods that experimental scientists and quantitative UX researchers have used for decades. What we do need is to stop treating one impressive output as evidence.  A single good output is like a participant who completes a task: encouraging, but not an evaluation.

### References

Evan Miller (2024). _Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations._ Anthropic. arXiv:2411.00640

Song, Y., Wang, G., Li, S., & Lin, B. Y. (2025). The Good, the Bad, and the Greedy: Evaluation of LLMs Should Not Ignore Non-Determinism. _Proceedings of NAACL 2025_. arXiv:2407.10457.